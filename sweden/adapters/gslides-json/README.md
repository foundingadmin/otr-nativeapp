# Adapter: gslides-json

**Status: 🟢 ACTIVE** — Implemented. Output: `brand/tokens/output/gslides/tokens.json`

Outputs flat JSON values for the Google Slides API. Enables brand-accurate Google Slides generation from token values.

Reads W3C JSON source (`brand/tokens/source/*.tokens.json`). Key format matches Google Slides API field names. All semantic aliases resolved to raw primitives.

Enable in `brand/BRAND.md`:
```
| gslides-json | enabled |
```

Regenerate: `node sweden/engine/run-adapters.js --adapter gslides-json`
