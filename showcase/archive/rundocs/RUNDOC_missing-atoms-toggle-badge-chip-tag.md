# RUNDOC — Feature 021: Missing Atoms — Toggle + Badge/Chip/Tag System

**Scope:** `showcase`
**Issue:** [#109](https://github.com/foundingadmin/metanoia-designsys/issues/109)
**Branch:** `claude/amazing-ptolemy-lviwv`
**Version:** v3.5.0
**Date:** 2026-05-29
**Status:** ✅ Complete

---

## Goal

Add four missing Atom components to the showcase: Form/Toggle (switch input), Form/Badge
(status labels), Form/Chip (selectable filter chips), and Form/Tags + Form/Tag Icon (tagging UI).

---

## What shipped

| Component | Location | Status |
|---|---|---|
| Toggle | `showcase/src/pages/components/forms.astro` | ✅ Added as new section |
| Badge | `showcase/src/pages/components/labels.astro` | ✅ New page |
| Chip | `showcase/src/pages/components/labels.astro` | ✅ New page |
| Tag + Tag Icon | `showcase/src/pages/components/labels.astro` | ✅ New page |

## Implementation notes

- **Toggle:** CSS-only `input[type=checkbox]` styled as a switch. No JS. Accessible via
  native checkbox semantics. States: on, off, disabled.
- **Badge:** Five semantic variants (default, success, warning, error, info) + dot indicator
  modifier. Dark mode handled via `[data-theme="dark"]` overrides using rgba values.
- **Chip:** Filter chip with `aria-pressed` attribute, selected/unselected/disabled states,
  icon variant. No JS needed for showcase demo (static states shown).
- **Tag:** Plain, dismissible (with X button + `aria-label`), icon variant, combined icon+dismiss.
- All styles use `var(--token-name)` — no hardcoded hex.
- Sidebar VERSION bumped to v3.5.0. Labels page added to Atoms nav group.

## Phase Checklist

| Phase | Task | Status |
|---|---|---|
| 0 | Create RUNDOC | ✅ |
| 0 | Update ROADMAP to In Progress | ✅ |
| 1 | Add Toggle to forms.astro | ✅ |
| 2 | Create labels.astro (Badge, Chip, Tag) | ✅ |
| 3 | Add Labels to Sidebar.astro nav | ✅ |
| 4 | Version bump to v3.5.0 (Sidebar, changelog, CLAUDE.md) | ✅ |
| 5 | Build passes 0 errors | ✅ |
| 6 | Commit + push | ✅ |
| 7 | Archive RUNDOC | ✅ |

## Verification

- `/components/forms` — Toggle section visible with on/off/disabled states
- `/components/labels` — Badge, Chip, Tag sections present with all variants
- Sidebar — "Labels" link appears under Atoms
- Dark mode — badge variants use rgba overlays, all other components inherit semantic tokens
- Build: 17 pages, 0 errors
