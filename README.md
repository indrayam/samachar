# The Daily Diff

A static newspaper of papers and threads worth Anand Sharma's time. Emma blog chrome (title, portrait, Home | Archives | Daily Diff | About Me, copyright footer) sits on the dash field; The Daily Diff — True Signals in a sea of Noise — lives inside the boxed newspaper sheet.

**Live:** https://dailydiff.indrayam.com

## Files

| File | Role |
| --- | --- |
| `index.html` | Newspaper shell. Fetches `./edition.json` and provides loading placeholders for the dynamic edition metadata. |
| `styles.css` | Newspaper layout with Emma tokens: Lora display, PT Serif body, orange bars, `#900` links, dash-tiled page, white sheet. |
| `app.js` | Theme toggle (`localStorage` key `theme`), filters, and story render. |
| `edition.json` | This edition's copy. |
| `images/blue-dash.gif` | Emma page-background tile (in-repo; do not hotlink). |
| `images/me.gif` | Emma header portrait (in-repo). |

No bundler, no framework. Serve the directory with any static file server, then open the local URL in a browser. Direct `file://` opening is not supported because the app loads `edition.json` with `fetch`.

Canonical host is Vercel (Git-connected). GitHub Pages is off.
