# The Daily Diff — Anand's Edition

A static newspaper of papers and threads worth Anand Sharma's time. Layout follows the Daily Diff sheet (masthead, lead, featured, three-column well); the paint is Emma — Anand's old blog theme: orange top bar, blue-dash field, boxed white panel, oxblood links.

**Live:** https://www.anandsharma.me

## Edition

Thursday, 27 August 2026. Twenty stories: one lead, two featured, then a three-column well. Source chips (All / X / HN / GitHub) and interest chips (All / AI / Tesla / Space / Systems) hide unmatched cards.

## Files

| File | Role |
| --- | --- |
| `index.html` | Newspaper shell. Fetches `./edition.json`, and embeds the same JSON in `#edition-fallback` so `file://` still works. |
| `styles.css` | Newspaper layout with Emma tokens: Lora display, PT Serif body, orange bars, `#900` links, dash-tiled page, white sheet. |
| `app.js` | Theme toggle (`localStorage` key `theme`), filters, and story render. |
| `edition.json` | This edition's copy. |
| `images/blue-dash.gif` | Emma page-background tile (in-repo; do not hotlink). |

No bundler, no framework. Open `index.html` locally, or serve the directory with any static file server.

Canonical host is Vercel (Git-connected). GitHub Pages is off.

## Theme

The moon/sun control in the masthead switches day and night editions. Day borrows Emma (orange top bar, dash-tiled field, white sheet, `#900` links). Night keeps the orange accent on a dark ink field. The choice is stored as `theme` in `localStorage` (`light` or `dark`).
