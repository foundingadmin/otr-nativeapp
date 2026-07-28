# RUNDOC — Feature 012: Retire Legacy Token CSS Files

**Scope:** `brand`
**Issue:** [#84](https://github.com/foundingadmin/metanoia-designsys/issues/84)
**Branch:** `feat/retire-legacy-tokens`
**Version:** v3.3.5
**Date:** 2026-05-28
**Status:** 🔄 In Progress

---

## Goal

Remove the five inert `brand/tokens/*.css` files that became obsolete after the v3.3.0 adapter pipeline shipped. Update the root barrel (`colors_and_type.css`) to `@import` from `brand/tokens/output/web/` instead of `brand/tokens/`. Delete the five legacy files, clean references in CLAUDE.md and SYNC-MASTER.md, and confirm the showcase build passes clean. Patch bump — no token values change, only import paths and file structure.

---

## Background

The v3.3.0 adapter pipeline introduced `brand/tokens/output/web/` as the generated CSS output for all token categories, replacing direct edits to `brand/tokens/*.css`. Since then, two separate CSS surfaces have emerged:

| Surface | Imports from | State |
|---|---|---|
| Root barrel (`colors_and_type.css`) | `brand/tokens/*.css` (legacy) | **Stale** |
| Flat barrel (`showcase/public/colors_and_type.css`) | `brand/tokens/output/web/` via `build-tokens.js` | Correct |
| Astro pipeline (`showcase/src/styles/tokens.css`) | `brand/tokens/output/web/` | Correct |

Divergences detected between legacy and generated files:
- `spacing.css`: legacy is missing 4 border-width tokens (`--border-thin`, `--border-regular`, `--border-thick`, `--border-bar`) present in the generated output
- `color-semantic.css`: `--fg-accent` maps to `var(--color-aqua-700)` in legacy, `var(--color-error-600)` in generated — the generated output matches the canonical source JSON

**Note:** `--fg-accent: var(--color-error-600)` is what the source JSON specifies. After this feature ships, preview cards will see the corrected value (red/error) rather than the stale legacy value (aqua). The token assignment itself (`fg-accent → error`) is a separate semantic question to revisit in a future sprint.

---

## Phase Checklist

| Phase | Task | Status |
|---|---|---|
| 0 | Create GitHub Issue #84 | ✅ |
| 0 | Create RUNDOC | ✅ |
| 0 | Update ROADMAP to In Progress | ✅ |
| 1 | Branch `feat/retire-legacy-tokens` from main | ✅ |
| 2 | Update root `colors_and_type.css` imports | ✅ |
| 2 | Delete 5 legacy `brand/tokens/*.css` files | ✅ |
| 2 | Update CLAUDE.md — remove legacy file table row | ✅ |
| 2 | Update SYNC-MASTER.md — remove legacy line | ✅ |
| 3 | Showcase build passes clean | ✅ |
| 3 | Preview cards confirmed in dist | ✅ |
| 4 | Version bumped to v3.3.5 | ✅ |
| 4 | Commit and push PR | ✅ |

---

## Verification Checklist

- [x] `brand/tokens/color-primitives.css` deleted
- [x] `brand/tokens/color-semantic.css` deleted
- [x] `brand/tokens/typography.css` deleted
- [x] `brand/tokens/spacing.css` deleted
- [x] `brand/tokens/motion.css` deleted
- [x] Root `colors_and_type.css` imports from `output/web/`
- [x] Showcase build: 0 errors, all pages generated
- [ ] `/preview/` cards load correctly via root barrel (verify in Vercel preview)
- [x] No references to `brand/tokens/*.css` remain in engine docs
