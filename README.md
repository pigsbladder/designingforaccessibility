# Designing for Accessibility

Source for https://designingforaccessibility.com

Hosted with Cloudflare Pages. Plain HTML, CSS and JS with no build step.

## Updating

1. Edit in VS Code
2. Commit
3. Sync
4. Cloudflare automatically deploys

To preview locally, run `python -m http.server 8080` in this folder and open http://localhost:8080.

## Structure

| Path | What it is |
|---|---|
| `index.html` | Home: search hero, learning paths, VPAT criteria lookup |
| `articles/` | The guides. `index.html` lists them by topic; `ux-perspectives.html` lists the UX pieces |
| `about.html`, `contact.html`, `glossary.html`, `privacy.html`, `accessibility-statement.html`, `404.html` | Other pages |
| `css/tokens.css` | Design tokens (colours, fonts, spacing). Change the look here first |
| `css/base.css`, `nav.css`, `footer.css` | Shared on every page |
| `css/home.css`, `article.css`, `listing.css`, `about.css`, `contact.css`, `glossary.css` | Per-page styles |
| `css/fonts.css`, `fonts/` | Self-hosted Newsreader and Geist (no requests to Google) |
| `js/guides.js` | **Guides and learning paths.** Edit this to change the paths on Home or what search finds |
| `js/criteria.js` | WCAG success criteria for the lookup and search |
| `js/home.js`, `article.js`, `nav.js` | Page behaviour |
| `_redirects` | Cloudflare Pages redirects for old URLs (`.htaccess` is not used by Cloudflare) |

## Adding an article

1. Copy an existing file in `articles/` and edit it. The header (topic, title, summary, date and read time) and the "On this page" list are plain HTML.
2. Add it to `js/guides.js` (`GUIDES`) so it appears in search, and to the right section of `articles/index.html`.
3. Add it to `sitemap.xml`.

## Learning paths

Paths are defined in `js/guides.js` (`PATHS`) and also written out by hand in the "Start with a path" section of `index.html`. If you change one, change both. A link to an article with `?path=<slug>` shows the "Your first ACR · 1 / 5" bar and a "Next in path" link.
