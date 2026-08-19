# Viraj's Personal Website

A custom-built Jekyll theme (no Bootstrap, no CSS or JS framework, no fancy things). Something I hope will be easier to maintain in the long run.

## Running it

Everything runs through Docker; no local Ruby needed. The image is built on first use.

```bash
./.docker/run.sh            # serve with live reload → http://localhost:8080

PORT=4000 ./.docker/run.sh          # different port
RUBY_VERSION=3.4 ./.docker/run.sh rebuild   # different Ruby
```

Run `./.docker/run.sh rebuild` after editing the `Gemfile` — gems are baked into the image, not installed into the working tree.

`Gemfile` at image-build time and points `BUNDLE_GEMFILE` at a copy outside the bind mount, so a stray host lockfile can't shadow the image's gems.

## Layout

| Path | What's in it |
|---|---|
| `_config.yml` | Site metadata and the nav (`nav_primary`, `nav_more`) |
| `_data/` | `publications.yml`, `news.yml`, `cv.yml`, `socials.yml` — all hand-maintained |
| `_projects/` | One markdown file per project; `importance` sets the order |
| `_pages/` | Top-level pages |
| `_layouts/`, `_includes/` | Liquid templates; `_includes/js/` holds the JS sources |
| `_sass/` | `_tokens` → `_base` → `_layout` → `_nav` → `_components`, in that order |
| `assets/js/site.js` | Concatenates `_includes/js/*` into the single JS request |

## Conventions worth knowing

- **Colours, fonts and sizes live only in `_sass/_tokens.scss`.** Re-theme from there.
- **Only `.container` sets a `max-width`.** Every other element fills 100% of its parent — don't reintroduce per-element width caps.
- **Liquid `assign` cannot evaluate a comparison.** `assign x = a == b` yields something always-truthy, not a boolean. Use a real `if`/`elsif` block (see `_includes/nav-link.liquid`).
- **Publication filters** derive from each entry's `type`: `workshop` → Workshop, `poster`/`abstract` → Abstract, everything else → Conference. Set `category:` on an entry to override.
- **Project cards** with no `img:` get a CSS-generated monogram cover; add `monogram:` to override the initials. This is something I dislike and will be removed in future builds.
