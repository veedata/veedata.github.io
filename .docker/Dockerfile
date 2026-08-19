# Dev image for the hand-built Jekyll theme.
#
# Build context is the REPO ROOT, not this directory:
#   docker build -f .docker/Dockerfile -t veesite .
# Easier: just use ./.docker/run.sh, which handles all of it.
#
# Gemfile.lock is intentionally not committed and not copied in — the image
# resolves gems fresh from the Gemfile, so `docker build` is the single source
# of truth for what's installed. Re-run it after editing the Gemfile.

ARG RUBY_VERSION=4.0
FROM ruby:${RUBY_VERSION}-slim

ENV DEBIAN_FRONTEND=noninteractive \
    LANG=C.UTF-8 \
    JEKYLL_ENV=development \
    BUNDLE_PATH=/usr/local/bundle \
    HOME=/tmp
# HOME=/tmp because the container runs as the host's uid, which has no passwd
# entry inside the image; without it bundler warns that `/` is not writable.

# build-essential + zlib are needed to compile the few native gems (ffi, etc.).
RUN apt-get update -y \
    && apt-get install -y --no-install-recommends build-essential zlib1g-dev \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# The Gemfile lives OUTSIDE the bind-mount target and BUNDLE_GEMFILE points at
# it. Without this, mounting the repo over /srv/jekyll would shadow the image's
# resolved Gemfile.lock with whatever stale one happens to be on the host, and
# bundler fails with "Could not find <gem> in locally installed gems".
COPY Gemfile /srv/bundle/Gemfile
ENV BUNDLE_GEMFILE=/srv/bundle/Gemfile
RUN bundle install \
    && chmod -R a+rX,a+w /usr/local/bundle /srv/bundle

WORKDIR /srv/jekyll

EXPOSE 8080

# --force_polling: inotify does not fire reliably across a bind mount.
CMD ["bundle", "exec", "jekyll", "serve", \
     "--host", "0.0.0.0", "--port", "8080", \
     "--watch", "--livereload", "--force_polling"]
