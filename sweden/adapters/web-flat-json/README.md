# Adapter: web-flat-json

**Status: 🟢 ACTIVE** — Implemented. Output: `brand/tokens/output/web-flat/tokens.json`

Outputs a flat `{ "--css-var-name": "resolved-value" }` JSON for any web consumer that needs token values without a CSS pipeline (e.g. CMS generators, DOCX tooling, data exports).

Reads `brand/tokens/*.css` directly (same source the sync engine patches), so this output stays in sync automatically after every `sync-figma-to-repo` run. All `var()` aliases resolved to raw primitives.

Enable in `brand/BRAND.md`:
```
| web-flat-json | enabled |
```

Regenerate: `node sweden/engine/build-tokens.js`
