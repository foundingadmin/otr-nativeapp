# Brand Config — {{BRAND_NAME}} Design System

Instance configuration for running Sweden in this repo. Every brand-specific
value lives here. Filled during activation (`ACTIVATE.md`) and kept current by
every session (Living Doc Rule).

---

## Identity

| Key | Value |
|---|---|
| Brand name | {{BRAND_NAME}} |
| Wordmark casing | TBD |
| Visual tool file key | TBD (from the Figma file URL: figma.com/design/[FILE-KEY]/...) |
| Target file | TBD |
| Variables source | TBD — local to the file, or a team library |

**Library caveat:** if the target file consumes variables from a team library,
new variables cannot be created from the consuming file — they require a DS
update request to the file's owners. Binding uses
`figma.variables.importVariableByKeyAsync(key)` with keys recorded below.

---

## Font

Family: **TBD**

```js
// Load in every use_figma session that touches text nodes:
// await Promise.all([
//   figma.loadFontAsync({ family: 'TBD', style: 'Regular' }),
//   figma.loadFontAsync({ family: 'TBD', style: 'SemiBold' }),
// ]);
```

## Visual Tool Collections

TBD — standard Sweden set created by `init-figma.js`: Primitives, Semantic,
Typography, Spacing, Motion (plus brand-specific collections as needed).

## Visual Tool Page Names

| Purpose | Page name (case-insensitive match) |
|---|---|
| Design system foundations | `ds` |
| Components | `components` |

## Text Style Reference

TBD — populated after the first print session creates text styles.

| Style | Size | Weight | Use for | Import key |
|---|---|---|---|---|
| — | — | — | — | — |

## Line Height Reference

Set directly on text styles — NOT variable-bound (see Line Height Gotcha in
`sweden/engine/FIGMA-PLUGIN.md`).

| Style | PERCENT value |
|---|---|
| — | — |

## Component Node ID Reference

TBD — recorded as `use_figma` build sessions create components.

## Component Set Registry

See `brand/component-map.js`. Empty until first print session.

## Semantic Variable Reference

TBD — SHA import keys recorded after first DS assessment.

## Variable Collection IDs

TBD — confirmed at runtime, never guessed.

## Design Rules

TBD — spacing grid, icon style, motion tiers, casing rules.

## Copy and Voice

TBD.
