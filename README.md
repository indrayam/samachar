# The Daily Diff — Anand's Edition

A static, cream-newsprint newspaper of papers and threads worth Anand Sharma's time. Look-and-feel clone of [tdd.cat](https://tdd.cat/), published from this repository.

**Live:** https://indrayam.github.io/samachar/

## Edition

Thursday, 27 August 2026. Twenty stories: one lead, two featured, then a three-column well. Source chips (All / X / HN / GitHub) and interest chips (All / AI / Tesla / Space / Systems) hide unmatched cards.

## Files

| File | Role |
| --- | --- |
| `index.html` | Newspaper shell. Fetches `./edition.json`, and embeds the same JSON in `#edition-fallback` so `file://` still works. |
| `styles.css` | Newsprint layout: Lora display, PT Serif body, oxblood on cream, gold on the night edition. |
| `app.js` | Theme toggle (`localStorage` key `theme`), filters, and story render. |
| `edition.json` | This edition's copy. |
| `.nojekyll` | Skip Jekyll on GitHub Pages. |
| `.github/workflows/pages.yml` | Deploy the repo root on every push to `main`. |

No bundler, no framework. Open `index.html` locally, or serve the directory with any static file server.

## Theme

The moon/sun control in the masthead switches day and night editions. The choice is stored as `theme` in `localStorage` (`light` or `dark`).
