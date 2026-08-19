#!/usr/bin/env bash
#
# Run the site in Docker. No local Ruby needed.
#
#   ./.docker/run.sh            # serve with live reload at http://localhost:8080
#   ./.docker/run.sh build      # build once into ./_site
#   ./.docker/run.sh shell      # drop into a shell in the container
#   ./.docker/run.sh rebuild    # force-rebuild the image, then serve
#
#   PORT=4000 ./.docker/run.sh  # serve on a different port
#
# The container always runs as the invoking user, so _site/ and .jekyll-cache/
# are written back owned by you rather than by root.

set -euo pipefail

IMAGE=${IMAGE:-veesite}
PORT=${PORT:-8080}
REPO_ROOT=$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)
DOCKERFILE="$REPO_ROOT/.docker/Dockerfile"

cd "$REPO_ROOT"

build_image() {
  echo "==> Building image '$IMAGE' (ruby:${RUBY_VERSION:-4.0}-slim)"
  docker build \
    ${RUBY_VERSION:+--build-arg RUBY_VERSION="$RUBY_VERSION"} \
    -f "$DOCKERFILE" -t "$IMAGE" .
}

ensure_image() {
  if ! docker image inspect "$IMAGE" >/dev/null 2>&1; then
    build_image
  fi
}

# Reclaim anything a previous root-run container left behind, otherwise Jekyll
# dies with "Permission denied" the moment it touches .jekyll-cache/.
fix_ownership() {
  if [ -e _site ] || [ -e .jekyll-cache ]; then
    if [ ! -O _site ] 2>/dev/null || [ ! -O .jekyll-cache ] 2>/dev/null; then
      echo "==> Reclaiming root-owned build artifacts"
      docker run --rm -v "$REPO_ROOT":/w -w /w "$IMAGE" \
        chown -R "$(id -u):$(id -g)" _site .jekyll-cache 2>/dev/null || true
    fi
  fi
}

# Only request a TTY when there actually is one, so the script still works when
# piped, run from CI, or backgrounded.
tty_flags() {
  if [ -t 0 ] && [ -t 1 ]; then printf -- '-it'; else printf -- '-i'; fi
}

run() {
  docker run --rm "$(tty_flags)" "$@" \
    -u "$(id -u):$(id -g)" \
    -v "$REPO_ROOT":/srv/jekyll \
    "$IMAGE" "${CMD[@]}"
}

case "${1:-serve}" in
  rebuild)
    build_image
    set -- serve
    ;&
  serve)
    ensure_image; fix_ownership
    CMD=(bundle exec jekyll serve --host 0.0.0.0 --port 8080 \
         --watch --livereload --force_polling)
    echo "==> Serving on http://localhost:$PORT  (Ctrl-C to stop)"
    run -p "$PORT:8080" -p 35729:35729
    ;;
  build)
    ensure_image; fix_ownership
    CMD=(bundle exec jekyll build --trace)
    echo "==> Building into ./_site"
    run
    ;;
  shell)
    ensure_image; fix_ownership
    CMD=(bash)
    run
    ;;
  *)
    echo "usage: $0 [serve|build|shell|rebuild]" >&2
    exit 2
    ;;
esac
