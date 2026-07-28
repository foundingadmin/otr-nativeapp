# Metanoia Design System — Roadmap

Running backlog of planned and in-progress features across the entire repo —
engine, showcase, brand, and translators. One entry per feature, one paragraph max.
Detailed implementation scope lives in the feature's RUNDOC, not here.

**Status flow:** Idea → Scheduled → In Progress → Complete

---

## At a Glance

| # | Feature | Scope | Status |
|---|---|---|---|
| [001](#feature-001--figma-first-component-sync) | Figma-First Component Sync | engine | 🔄 In Progress |
| [002](#feature-002--code-connect-via-mcp) | Code Connect via MCP | engine | 📅 Scheduled |
| [010](#feature-010--sync-performance-and-correctness-enhancements) | Sync Performance Enhancements | engine | ✅ Complete |
| [011](#feature-011--user-manual-completeness--living-doc-rule) | User Manual Completeness | showcase | ✅ Complete |
| [012](#feature-012--retire-legacy-token-css-files) | Retire Legacy Token CSS Files | brand | ✅ Complete |
| [013](#feature-013--sweden-multi-repo-installability--credential-portability) | Multi-Repo Installability & Credential Portability | engine | 💡 Idea |
| [014](#feature-014--engine-whitelabel-comment-scrub) | Engine Whitelabel Comment Scrub | engine | 💡 Idea |
| [015](#feature-015--github-nightly-cron-sync-reliability) | GitHub Nightly Cron Sync Reliability | engine | 💡 Idea |
| [016](#feature-016--sweden-embassies-native-tool-embedded-uis) | Sweden Embassies — Native Tool-Embedded UIs | engine | 💡 Idea |
| [017](#feature-017--deprecation--deletion-lifecycle) | Deprecation & Deletion Lifecycle | engine | 💡 Idea |
| [018](#feature-018--visual-diff-review-ui-for-token-sync) | Visual Diff Review UI for Token Sync | engine | 💡 Idea |
| [019](#feature-019--html-to-astro-translator-integration) | html-to-astro Translator Integration | translator | ✅ Complete |
| [021](#feature-021--missing-atoms-toggle--badgechiptag-system) | Missing Atoms — Toggle + Badge/Chip/Tag | showcase | ✅ Complete |
| [022](#feature-022--missing-molecules--alert-tabs-nav-modal-table-etc) | Missing Molecules — Alert, Tabs, Nav, Modal, Table, etc. | showcase | ✅ Complete |
| [023](#feature-023--ai-guide-copy-refresh) | AI Guide Copy Refresh | showcase | ✅ Complete |
| [020](#feature-020--user-manual-fe-polish) | User Manual FE Polish | showcase | ✅ Complete |

---

## 🔄 In Progress

### Feature 001 — Figma-First Component Sync

`engine` · Issue [#65](https://github.com/foundingadmin/metanoia-designsys/issues/65) · RUNDOC active

Extend the existing token sync engine to also sync Figma component sets into repo HTML preview cards, completing a true bi-directional design ↔ code pipeline. `sync-figma-to-repo.js` adds a second pass reading component structure from Figma, diffing against existing preview HTML, and opening a PR when variants change. `brand/component-map.js` is the registry, bootstrapped with Icon, Button, and Form/Tags entries as of May 2026.

---

## 📅 Scheduled

### Feature 002 — Code Connect via MCP

`engine` · Issue [#66](https://github.com/foundingadmin/metanoia-designsys/issues/66) · Depends on Feature 001

Publish real HTML class snippets to Figma Dev Mode so inspecting engineers see `<button class="btn btn--primary">` rather than auto-generated CSS. The standard CLI path (`@figma/code-connect`) requires an Enterprise Figma plan; if that is unavailable, the existing Figma MCP server exposes equivalent tools (`send_code_connect_mappings`, `add_code_connect_map`, `get_code_connect_suggestions`) that authenticate the same way as all other sync calls and require no npm or package.json changes. If neither path is accessible, a custom export layer that writes snippet data to a static JSON endpoint and surfaces it via the showcase may serve as a fallback. This is far-future work — it cannot begin until Feature 001 is complete and all Phase 3–5 component builds are done, because `send_code_connect_mappings` requires Figma component node IDs that only exist after those builds ship. During every Phase 3–5 `use_figma` session, each new component's node ID and variant structure should be staged to a `Component Map Staging` table in `brand/BRAND.md` so that when Phase 6 eventually starts, the registry is already populated rather than requiring a retroactive Figma audit.

---

## 💡 Ideas

### Feature 023 — AI Guide Copy Refresh

`showcase` · Shipped v3.7.0 · [RUNDOC](showcase/archive/rundocs/RUNDOC_brandforge-showcase-copy.md)

Full copy overhaul of the showcase AI guide and welcome pages under the Brandforge rename. Rewrote Welcome, Generate on-brand, and Update an existing asset pages from scratch per sprint brief. Renamed all "Sweden" and "design system" category references to "Brandforge" across ten showcase files. Updated sidebar header to Metanoia / Brandforge two-line lockup, footer to "Brandforge by Founding Creative", and Base layout meta title template. Introduced session warning block on Generate page, Read command four-step walkthrough on Update page, and four surface cards with push rows. All save/commit language replaced with push throughout.

---

### Feature 013 — Sweden Multi-Repo Installability & Credential Portability

`engine`

The destination: a new operator runs `npx create-sweden-ds`, is prompted for two things — the Figma file key for their master DS and a service-account PAT — and has a working bi-directional sync pipeline within minutes. The Figma file key is the central config value: it tells every sync script and MCP call which file is authoritative, and today it lives as a single value in `brand/BRAND.md` that must be hand-edited before anything works. The CLI's job is to generate a complete, valid `brand/` directory from those prompts — including `BRAND.md`, `token-map.js`, and `component-map.js` scaffolds — so operators never hand-edit engine files or guess config shape. Supporting pieces: credential model is already directionally correct (PAT stored in GitHub Secrets as `FIGMA_API_TOKEN`, read from `process.env`), but needs a token rotation checklist in `INSTALL.md` (1-year expiry, calendar reminder, scoped to File content only) and a CI check warning when the PAT is within 30 days of expiry. Until the CLI ships, operators follow the Tier 2 onboarding prompt in `sweden/INSTALL.md`. The design principle is that all differences between brand deployments — file key, credentials, brand name — live in `brand/BRAND.md` and GitHub Secrets; the `sweden/` engine directory is identical across every deployment and must never contain a hardcoded value.

---

### Feature 014 — Engine Whitelabel Comment Scrub

`engine`

The `sweden/engine/` scripts contain residual hardcoded references to "Metanoia" and project-specific names in comments and log strings — left over from before the brand-agnostic installability goal was formalised. A grep-and-replace pass across all engine JS files and markdown docs should remove or genericise every instance, replacing brand mentions with generic placeholders (`<brand-name>`, `your brand`, etc.) or deleting them where the comment adds no value. The fix is a one-session cleanup with no functional changes — pure PATCH bump once done.

---

### Feature 015 — GitHub Nightly Cron Sync Reliability

`engine` · Depends on Feature 013

The nightly cron action that triggers the Figma → repo token sync is failing consistently — errors on every run, no successful syncs firing. Root cause is not yet diagnosed but likely involves stale or missing `FIGMA_API_TOKEN` secrets, workflow YAML misconfiguration, or a permissions/runner issue introduced after the v3.3.x adapter changes. Investigation scope: audit the `.github/workflows/` cron definition, confirm secrets are present and non-expired in the repo settings, check Actions logs for the specific error, and verify the sync script entry point is still correct. Fix should be preceded by Feature 013's credential portability work to ensure token rotation and expiry handling are in place before re-enabling automated runs.

---

### Feature 016 — Sweden Embassies — Native Tool-Embedded UIs

`engine`

Rather than routing designers and developers through a standalone web dashboard, the Sweden intermediary layer should surface entirely through native "Embassy" UIs embedded in each discipline's existing tools. The Visual Embassy is a Figma plugin panel: it surfaces incoming code-side change notifications, provides a conversational interface for prompting the visual agent to draft new components directly on canvas, and exposes a single "Push to Sweden" button that handles all data routing without requiring the designer to touch a terminal or JSON file. The Code Embassy is a VS Code/Cursor extension (and optional CLI): it presents incoming visual-side changes as a developer-friendly token diff — showing exactly which CSS custom properties are changing and nothing else — and lets the developer accept, reject, or selectively merge without leaving their editor. The architecture is unchanged; only the surfaces change. Nobody leaves home to communicate. The headless Sweden core remains the neutral intermediary; the Embassies are just the consulate windows into it from each side of the wall. This is an extremely far-horizon item requiring Feature 013 (multi-repo installability) and Feature 002 (Code Connect) to be complete and stable first.

---

### Feature 017 — Deprecation & Deletion Lifecycle

`engine`

Establish a graceful, non-destructive deprecation pipeline that prevents zombie components and broken historical mockups. Visual-first deletion: designers move an obsolete component to a dedicated `_Archive` Figma page; the sync engine detects the node migration and records the deprecation state in `brand.md`. Code-first deletion: removing a component file flags it obsolete in `brand.md`, leaves the Figma node intact, and injects a visual override via MCP renaming the library element to `[OBSOLETE - DO NOT USE]` with a red-slash overlay to warn future designers. Full retirement from the system requires both sides to have acknowledged the change — a two-key treaty ensuring no component is hard-deleted until a replacement is safely in place on both the visual and code sides.

---

### Feature 018 — Visual Diff Review UI for Token Sync

`engine`

When a Figma → repo sync detects changed tokens, the current flow presents raw key/value diffs (e.g. `Icon Stroke/SM: 1.5 → 2`) with no visual context, and auto-proceeds on confirmation without per-token approval — making silent overwrite of visual decisions a real risk for non-technical reviewers. This feature adds a lightweight review interface (web view, Figma plugin panel, or Claude-generated HTML preview) that presents each changed token in plain-English brand language alongside a before/after specimen — color swatch, size strip, stroke weight example — and requires per-token accept/reject before any file is written. Rejected tokens are held at their current value in source JSON. The MVP is a standalone HTML preview Claude generates and opens during the sync session; the full version embeds the same interface in the Embassy Figma plugin panel, triggers automatically on sync detection, and gates PR creation on reviewer approval. This is the feature that makes the token sync safe for brand managers who don't read CSS.

---

## ✅ Complete

### Feature 010 — Sync Performance and Correctness Enhancements

`engine` · Issue [#63](https://github.com/foundingadmin/metanoia-designsys/issues/63) · Shipped v3.3.4 · [RUNDOC](sweden/engine/archive/rundocs/RUNDOC_sync-performance.md)

Four targeted improvements shipped across v3.3.2–v3.3.4: alias warning suppression (v3.3.2), single-call Figma REST variable fetch via `figma-rest.js`, local Figma state cache for early-exit on unchanged nightly runs, and adapter diff-awareness eliminating false git noise when no token values changed.

---

### Feature 012 — Retire Legacy Token CSS Files

`brand` · Issue [#84](https://github.com/foundingadmin/metanoia-designsys/issues/84) · Shipped v3.3.5 · [RUNDOC](brand/archive/rundocs/RUNDOC_retire-legacy-token-css-files.md)

Removed the five inert `brand/tokens/*.css` files that became obsolete after the v3.3.0 adapter pipeline shipped. Updated the root barrel (`colors_and_type.css`) to `@import` from `brand/tokens/output/web/` instead of `brand/tokens/`. Updated `CLAUDE.md`, `SYNC-MASTER.md`, `sweden/INSTALL.md`, and two showcase pages to reflect the new paths. Patch bump — no token values changed, only import paths and file structure.

---

### Feature 011 — User Manual Completeness & Living Doc Rule

`showcase` · Issue [#64](https://github.com/foundingadmin/metanoia-designsys/issues/64) · Shipped v3.4.0 · [RUNDOC](showcase/archive/rundocs/RUNDOC_all-astro-showcase.md)

Brought the Astro user manual up to date with all current DS tokens and components, and established the living-doc rule enforcing manual updates whenever new token categories or components are added. Preview card verification became moot once the legacy showcase and all 27 preview cards were deleted as part of the all-Astro sprint; the manual now has inline demos throughout.

---

### Feature 019 — html-to-astro Translator Integration

`translator` · Issue [#103](https://github.com/foundingadmin/metanoia-designsys/issues/103) · Shipped v3.4.0 · [RUNDOC](showcase/archive/rundocs/RUNDOC_all-astro-showcase.md)

Delivered the translator as a validated convention rather than a mass migration. The Astro showcase pages were hand-coded and already superior to a mechanical translation. The workflow is now documented in `sweden/translators/html-to-astro/README.md` as the canonical path for future component additions: DS component HTML → translator → Astro page.

---

### Feature 022 — Missing Molecules — Alert, Tabs, Nav, Modal, Table, Hero, Empty State

`showcase` · Issue [#110](https://github.com/foundingadmin/metanoia-designsys/issues/110) · Shipped v3.6.0 · [RUNDOC](showcase/archive/rundocs/RUNDOC_missing-molecules.md)

Delivered all nine audit-confirmed component gaps in two new showcase pages: Molecules (Alert with 4 semantic variants + dismiss, Breadcrumb with ARIA wayfinding, Pagination, accessible Tabs with JS toggle) and Organisms (Top nav bar, Hero, Modal shown in open state, Data table with zebra-striping, Empty state). All CSS uses semantic tokens with dark mode coverage. A new "Molecules" sidebar group links to both pages.

---

### Feature 021 — Missing Atoms — Toggle + Badge/Chip/Tag System

`showcase` · Issue [#109](https://github.com/foundingadmin/metanoia-designsys/issues/109) · Shipped v3.5.0 · [RUNDOC](showcase/archive/rundocs/RUNDOC_missing-atoms-toggle-badge-chip-tag.md)

Added four missing Atom components to the showcase: Toggle (switch input added to Forms page), Badge (five semantic variants + dot indicator), Chip (filter chip with selected/disabled states), and Tag (plain, dismissible, and icon variants). All on a new `/components/labels` page. No hardcoded values — all CSS uses semantic tokens with dark mode coverage.

---

### Feature 020 — User Manual FE Polish

`showcase` · Issue [#103](https://github.com/foundingadmin/metanoia-designsys/issues/103) · Shipped v3.4.0 · [RUNDOC](showcase/archive/rundocs/RUNDOC_all-astro-showcase.md)

Systematic UI/UX polish across the Astro user manual: 1280px+ desktop breakpoint, dark/light mode toggle with localStorage persistence and OS `prefers-color-scheme` support, Colors page dark mode sync fix, sidebar restructured (Foundations → Tokens, Components → Atoms), version badge linking to new `/changelog` page, asset download links, adapters copy rewritten to accurately describe the W3C JSON → `run-adapters.js` pipeline, and AI guide prerequisite callouts with corrected token path references.
