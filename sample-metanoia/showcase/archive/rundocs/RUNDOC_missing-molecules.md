# RUNDOC — Feature 022: Missing Molecules — Alert, Tabs, Nav, Modal, Table, Hero, Empty State

**Scope:** `showcase`
**Issue:** [#110](https://github.com/foundingadmin/metanoia-designsys/issues/110)
**Branch:** `claude/amazing-ptolemy-lviwv`
**Version:** v3.6.0
**Date:** 2026-05-29
**Status:** ✅ Complete

---

## Goal

Add all nine audit-confirmed molecule/organism component gaps to the showcase, split across two pages:
- **Molecules A:** Alert, Breadcrumb, Pagination, Tabs → `showcase/src/pages/components/molecules.astro`
- **Molecules B:** Top nav, Hero, Modal, Data table, Empty state → `showcase/src/pages/components/organisms.astro`

---

## What shipped

| Component | Page | Status |
|---|---|---|
| Alert (4 variants + dismiss) | molecules.astro | ✅ |
| Breadcrumb | molecules.astro | ✅ |
| Pagination | molecules.astro | ✅ |
| Tabs (ARIA + JS) | molecules.astro | ✅ |
| Top nav bar | organisms.astro | ✅ |
| Hero | organisms.astro | ✅ |
| Modal (open state) | organisms.astro | ✅ |
| Data table | organisms.astro | ✅ |
| Empty state | organisms.astro | ✅ |

## Implementation notes

- All CSS uses semantic tokens — no hardcoded hex or px font sizes
- Dark mode: alerts and badges use rgba overlays (same pattern as labels page)
- Tabs: real JS toggle with `aria-selected` + `hidden` attribute on panels
- Modal: static open-state display in a contained demo block (no backdrop toggle)
- Data table: zebra striping via `:nth-child(even)`, accessible `scope="col"` on all headers
- Nav: contained preview block — does not conflict with showcase sidebar
- Hero: token-correct typography stack (`--fs-32`, `--lh-tight`, `--ls-tight`)
- Sidebar VERSION bumped to v3.6.0, Molecules nav group added

## Phase Checklist

| Phase | Task | Status |
|---|---|---|
| 0 | Create RUNDOC | ✅ |
| 1 | Create molecules.astro (Alert, Breadcrumb, Pagination, Tabs) | ✅ |
| 2 | Create organisms.astro (Nav, Hero, Modal, Data Table, Empty State) | ✅ |
| 3 | Add Molecules nav group to Sidebar.astro | ✅ |
| 4 | Version bump to v3.6.0 (Sidebar, changelog, CLAUDE.md) | ✅ |
| 5 | Build passes 0 errors (19 pages) | ✅ |
| 6 | Commit + push | ✅ |
| 7 | Archive RUNDOC | ✅ |

## Verification

- `/components/molecules` — Alert, Breadcrumb, Pagination, Tabs sections present
- `/components/organisms` — Nav, Hero, Modal, Data table, Empty state sections present
- Sidebar — "Molecules" group with Molecules + Organisms links
- Build: 19 pages, 0 errors
