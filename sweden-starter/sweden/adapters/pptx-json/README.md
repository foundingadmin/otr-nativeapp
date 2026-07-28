# Adapter: pptx-json

**Status: 🟢 ACTIVE** — Implemented. Output: `brand/tokens/output/pptx/tokens.json`

Outputs flat JSON values for python-pptx consumption. Enables brand-accurate PowerPoint generation from token values.

Reads W3C JSON source (`brand/tokens/source/*.tokens.json`). Key format uses dot-notation:
- `--color-navy` → `"color.navy"`
- `--fs-16` → `"typography.size.16"`
- `--space-4` → `"spacing.4"`
- `--ease-standard` → `"motion.ease.standard"`

All semantic aliases resolved to raw primitives — no `{reference}` values in output.

Enable in `brand/BRAND.md`:
```
| pptx-json | enabled |
```

Regenerate: `node sweden/engine/run-adapters.js --adapter pptx-json`
