# Anand's Daily Diff

A static newspaper of papers and threads worth Anand Sharma's time. Emma blog chrome (title, portrait, Home | Archives | About Me, copyright footer) sits on the dash field; Anand's Daily Diff — True Signals in a sea of Noise — lives inside the boxed newspaper sheet.

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
| `images/me.gif` | Emma header portrait (in-repo). |

No bundler, no framework. Open `index.html` locally, or serve the directory with any static file server.

Canonical host is Vercel (Git-connected). GitHub Pages is off.

## Theme

The moon/sun control in the newspaper masthead switches day and night editions of the sheet. Blog chrome stays Emma either way (orange bar, dash field, `#900` nav). Night inverts only the newspaper panel. The choice is stored as `theme` in `localStorage` (`light` or `dark`).
