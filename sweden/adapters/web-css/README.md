# Adapter: web-css

**Status: 🟢 ACTIVE** — Implemented. Output: `brand/tokens/output/web/`

Outputs CSS custom properties from the W3C JSON token source (`brand/tokens/source/*.tokens.json`). Default adapter — always enabled.

| Source | Output |
|---|---|
| `color-primitives.tokens.json` | `output/web/color-primitives.css` |
| `color-semantic.tokens.json`   | `output/web/color-semantic.css`   |
| `typography.tokens.json`       | `output/web/typography.css`       |
| `spacing.tokens.json`          | `output/web/spacing.css`          |
| `motion.tokens.json`           | `output/web/motion.css`           |

Imported by the Astro user manual via `showcase/src/styles/tokens.css`.

Regenerate: `node sweden/engine/build-tokens.js`
