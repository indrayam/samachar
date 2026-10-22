# Working in this repository

## Before editing

- Check the current branch and working-tree status before changing files. Preserve existing user or contributor changes.
- Read the relevant files and keep changes limited to the requested work.
- This is a standalone repository within the wider `indrayam.com` site. Follow the parent `../AGENTS.md` when work crosses repository boundaries or affects the shared site experience.

## Daily Diff content and site behavior

- Treat `edition.json` as the current edition's content and data contract with `app.js`. Preserve the fields and types the renderer uses, and keep the JSON valid when editing it.
- When changing edition content, verify factual claims against the linked sources. Preserve the publication's editorial voice and do not invent sources, quotes, or claims.
- Preserve the existing newspaper design, responsive behavior, accessibility, working links, and shared site chrome unless the request explicitly calls for a change. Keep the site visually aligned with the related `indrayam.com` sites.
- Keep the site static and dependency-free unless the user asks for a specific architectural change. Avoid unrelated tooling or redesigns.
- `app.js` loads `edition.json` with `fetch`; use a local static server for browser inspection. Direct `file://` opening is unsupported.
- Vercel is the canonical host. Inspect the deployment workflow before changing deployment configuration or claiming a deployment.

## Verification

- For edition content changes, review the rendered story fields and the links they expose.
- For layout, styling, or interaction changes, inspect the affected page at desktop and mobile sizes. Do not claim visual verification based only on source inspection.
- No general build or test command is documented. Identify the relevant check before regenerating deliverables, and report what you actually inspected or rendered.
