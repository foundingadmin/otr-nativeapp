# Adapter: email-inline

**Status: 🟢 ACTIVE** — Implemented. Output: `brand/tokens/output/email/inline.css`

Outputs pre-resolved CSS where every custom property value is a raw primitive — no `var()` references anywhere. Email clients do not support CSS custom properties; this file is a reference sheet for building HTML email templates.

Reads `brand/tokens/*.css` directly (same source the sync engine patches), so this output stays in sync automatically after every `sync-figma-to-repo` run.

Enable in `brand/BRAND.md`:
```
| email-inline | enabled |
```

Regenerate: `node sweden/engine/build-tokens.js`
