# Brand Config — Off The Record Design System

This file is the **instance configuration** for running Sweden in this repo.
It contains every value that is specific to the Off The Record brand.

Status: **SCAFFOLD — values below marked TBD are filled during the first
Claude Design package intake and the first Figma print session.**

---

## Identity

| Key | Value |
|---|---|
| Brand name | Off The Record |
| Wordmark casing | TBD (confirm from CD package) |
| Visual tool file key | TBD (from the Figma file URL: figma.com/design/[FILE-KEY]/...) |
| Target file | "The Native App / Design" |
| Variables source | **Guidelines library** (team library, not local to the target file) |

**Library caveat:** the target file consumes variables from the Guidelines
library. Library variables cannot be created from the consuming file — new
variables require a DS update request to the design team (see the variable
binding policy in `docs/OPERATING-MODEL.md`). Binding uses
`figma.variables.importVariableByKeyAsync(key)` with keys recorded in the
Semantic Variable Reference below after the first DS assessment.

---

## Font

Family: **TBD** (extract from the first CD package)

```js
// Load in every use_figma session that touches text nodes.
// Fill in real family + styles once known:
// await Promise.all([
//   figma.loadFontAsync({ family: 'TBD', style: 'Regular' }),
//   figma.loadFontAsync({ family: 'TBD', style: 'SemiBold' }),
//   figma.loadFontAsync({ family: 'TBD', style: 'Bold' }),
// ]);
```

---

## Visual Tool Collections

Standard Sweden collections — created by `init-figma.js` on first sync:

Primitive collections (raw hex values): TBD after token extraction
Semantic collections (role aliases): `Background` | `Foreground` | `Border`
Other collections: `Font Size` | `Font Weight` | `Line Height` | `Letter Spacing` | `Spacing` | `Radius` | `Shadow` | `Layout` | `Motion`

---

## Visual Tool Page Names

| Purpose | Page name (case-insensitive match) |
|---|---|
| Design system foundations | `ds` |
| Components | `components` |

---

## Text Style Reference

TBD — populated after the first print session creates text styles in Figma.

| Style | Size | Weight | Use for | Import key |
|---|---|---|---|---|
| — | — | — | — | — |

---

## Line Height Reference

Set directly on text styles — NOT bound to variables (see Line Height Gotcha
in `sweden/engine/FIGMA-PLUGIN.md`).

| Style | PERCENT value |
|---|---|
| — | — |

---

## Component Node ID Reference

TBD — recorded as `use_figma` build sessions create components.

## Component Set Registry

See `brand/component-map.js`. Empty until first print session.

## Semantic Variable Reference

TBD — SHA import keys recorded after `init-figma.js` bootstraps collections.

## Variable Collection IDs

TBD — confirmed at runtime, never guessed.

---

## Design Rules

TBD — extracted from the first CD package (spacing grid, icon style, motion
tiers, casing rules).

## Copy and Voice

TBD.
