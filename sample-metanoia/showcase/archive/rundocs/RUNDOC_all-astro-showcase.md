# RUNDOC — All-Astro Showcase: Kill Legacy, CI Automation, FE Polish

**Scope:** `showcase` · `translator` · `engine`
**Features:** 011 (close), 019, 020 + CI barrel fix + legacy/preview deletion
**Issue:** [#103](https://github.com/foundingadmin/metanoia-designsys/issues/103)
**Branch:** `feat/all-astro-showcase`
**Version target:** v3.4.0 (MINOR — sidebar restructure, dark mode, structural cleanup)
**Date:** 2026-05-29
**Status:** ✅ Complete — pending archive

---

## Goal

Consolidate the showcase into a single, fully Astro pipeline. Delete dead weight (legacy single-page showcase + orphaned preview iframe cards). Fix the CI automation gap so barrel rebuilds fire automatically on every merge. Deliver the Feature 020 FE polish on the clean foundation. Close Feature 011 and deliver Feature 019 as a tooling convention (not a mass migration — the Astro pages are already hand-coded and better than a mechanical translation).

---

## Context

**Key finding:** `showcase/public/preview/*.html` cards are consumed exclusively by `showcase/public/legacy/index.html`. The Astro showcase already has its own inline demos — no iframes. Killing legacy orphans all 27 preview cards; both can be deleted together.

**Key finding:** `sync-on-merge.yml` CI workflow runs `run-adapters.js` on push to main but only stages `brand/tokens/output/`. `showcase/public/colors_and_type.css` (the flat barrel for lab files) is never committed by CI — fixed in this sprint.

**Feature 019 reframing:** The Astro showcase is already "all Astro." The translator's value here is as the canonical workflow for *future* component additions: DS component HTML → translator → Astro page. We validate it on one card as proof-of-concept and document the convention. No mass migration needed.

---

## Phase Checklist

| Phase | Task | Status |
|---|---|---|
| 0 | Write RUNDOC | ✅ |
| 0 | Create GitHub issue | ⬜ |
| 0 | Update ROADMAP (011→In Progress close, 019→In Progress, 020→In Progress) | ⬜ |
| 1 | Fix `sync-on-merge.yml` — stage `showcase/public/colors_and_type.css` in CI commit | ⬜ |
| 2 | Delete `showcase/public/legacy/` | ⬜ |
| 3 | Delete `showcase/public/preview/` | ⬜ |
| 4 | Update any remaining references to legacy or preview in Astro pages / CLAUDE.md / README | ⬜ |
| 5 | Feature 019 — run translator on one card as PoC, document workflow in `sweden/translators/html-to-astro/` | ⬜ |
| 5 | Feature 011 — close (remaining blocked item superseded; preview verification moot) | ⬜ |
| 6A | Feature 020 Phase A — Layout & Responsiveness (hamburger fix, desktop width, breakpoint audit) | ✅ |
| 6B | Feature 020 Phase B — Dark / Light Mode (prefers-color-scheme + UI toggle + Colors page fix) | ✅ |
| 6C | Feature 020 Phase C — Sidebar (atomic labels, visual hierarchy) | ✅ |
| 6D | Feature 020 Phase D — Version Display & Changelog page | ✅ |
| 6E | Feature 020 Phase E — Asset Downloads | ✅ |
| 6F | Feature 020 Phase F — Adapters Copy (W3C JSON → run-adapters flow) | ✅ |
| 6G | Feature 020 Phase G — AI Guide (prereq callout, path fix, plain-language vocab, example scaffold) | ✅ |
| 7 | Astro build passes clean — 0 errors | ✅ |
| 7 | Version bumped to v3.4.0 in CLAUDE.md + Sidebar | ✅ |
| 7 | Archive 020 RUNDOC, close 019 issue, close 011 issue | ⬜ |

---

## File map

| File | Phase | Change |
|---|---|---|
| `.github/workflows/sync-on-merge.yml` | 1 | Add `showcase/public/colors_and_type.css` to `git add` |
| `showcase/public/legacy/` | 2 | Delete entire directory |
| `showcase/public/preview/` | 3 | Delete entire directory |
| `CLAUDE.md` | 4 | Remove preview card authoring instructions |
| `sweden/translators/html-to-astro/README.md` | 5 | Document the convention: new components → HTML → translator → Astro |
| `showcase/src/layouts/Base.astro` | 6A, 6B, 6C, 6D | Layout, dark mode toggle, sidebar |
| `showcase/src/components/Sidebar.astro` | 6C, 6D | Atomic labels, version badge |
| `showcase/src/pages/foundations/colors.astro` | 6B | Dark mode layout shift fix |
| `showcase/src/pages/foundations/assets.astro` | 6E | Download links |
| `showcase/src/pages/foundations/adapters.astro` | 6F | W3C JSON flow copy |
| `showcase/src/pages/ai-guide/generate.astro` | 6G | Prereq callout, path fix, vocab |
| `showcase/src/pages/ai-guide/update.astro` | 6G | Prereq callout |
| `showcase/src/pages/changelog.astro` | 6D | New page |
| `CLAUDE.md` | 7 | Version → v3.4.0 |

---

## Verification checklist

- [ ] `cd showcase && npm install && npm run build` — 0 errors, 0 warnings
- [ ] `/legacy/` returns 404 on preview deploy
- [ ] `/preview/` returns 404 on preview deploy  
- [ ] Lab pages still load correctly (use relative barrel path)
- [ ] OS dark mode → semantic tokens switch; Colors page no layout shift
- [ ] Dark/light toggle in sidebar → switches theme; persists in localStorage
- [ ] Mobile (~375px) hamburger opens sidebar with no content bleed
- [ ] Desktop 1440px — content area is not cramped
- [ ] Sidebar groups: Tokens → Atoms → Molecules → Templates → AI guide (in that order)
- [ ] Sidebar section labels visually distinct from nav links
- [ ] Version badge in sidebar footer; links to `/changelog`
- [ ] `/changelog` page exists and lists recent versions
- [ ] Assets page: Download link triggers browser file download
- [ ] Adapters page: sync steps accurately describe W3C JSON → run-adapters.js → outputs
- [ ] AI guide: prerequisite callout visible; email prompt path points to `output/web/`
- [ ] CI: push a token change to main → adapter run commits updated barrel
