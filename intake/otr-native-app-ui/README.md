# OTR • Native App UI — Project Guide

**Product:** Off The Record native app redesign. Current focus: the Cases experience (feed, case detail, status system).
**Start here:** open `File Navigator.html` (a 1:1 searchable mirror of the project directory) or `docs/review-hub/Review Hub.html` (what's open for review right now).

---

## How this project is organized

The hierarchy: **product → workflow → workstream**. Workflows (`cases/`, later `home/`, `booking/`) live at the root; workstreams live inside them. Every workstream folder has the **same internal shape**, so navigation is muscle memory:

```
<workstream>/
  <Canonical Board>.html   ← THE current proposal. Always current, always at the top.
  kits/                    ← frozen JSX the canonical board loads. Nothing else touches these.
  explorations/NN-name/    ← self-contained sandboxes. Each has a BRIEF.md (question + status).
  archive/NN-name/         ← closed explorations, moved whole. DR number in the ledger.
  LEDGER.md                ← index: every exploration → its decision → integrated? ✅/⏳
```

### Root map

- `cases/` — THE Cases workflow: `_docs-cases/` (PRD + decisions), `_ds-cases/` (its DS delta), `system-case_status_and_action/`, `component-case_preview_cards/`, `screen-all_cases_feed/`, `screen-single_case_details/`. Future workflows — home, onboarding, booking — land as siblings.
- `cases/_ds-cases/` — the DS delta the Cases workflow produced on top of ds-global: the `Atomic System.html` specimen + frozen `kits/` (see its `MANIFEST.md`)
- `_ds/` — **ds-global**: the baseline OTR design system every workflow extends — tokens + components. Atoms. Never edited here. (The physical folder name `_ds/` is fixed by how every page links to it; "ds-global" is its presented name.)
- `docs/` — the master `LEDGER.md` (decision roll-up across every workflow) + source for the root hub pages. Workflow-local docs live inside each workflow (`cases/_docs-cases/`).
- `reference/` — source materials (screenshots, original PRD uploads)
- `docs/roadmap/` — the ordered horizon line across all workstreams (`ROADMAP.md` canonical + `Roadmap.html` render)

## Naming standard

- **Workstream folders:** `<category>-<task_name>` — category is a closed set: `screen` (assembled surfaces, predominantly static), `component` (pieces consumed across screens), `system` (languages and rules). Adding a category is a DR. The parent workflow folder carries the workflow name.
- **Non-design folders** float with an underscore and carry the workflow suffix: `_docs-cases/`, `_ds-cases/`.
- **The workflow demo** (e.g. `Cases Demo.html`) is the only root-level HTML in a workflow folder: the interactive assembly of decided work, wired from frozen kits only. Demo tweaks are user-state cohorts, never design divergences.
- **Boards** (the .html canvases inside a workstream: the canonical at its root, explorations in `explorations/`). The canonical root board keeps a human name that matches its H1 (the workstream name). An **exploration board is named after its parent folder** (e.g. `01-details-exploration/01-details-exploration.html`). We don't use the word "studies" — they're explorations.
- **Workflow docs:** each workflow keeps one living PRD at the root of its `_docs-<workflow>/` folder (e.g. `cases/_docs-cases/Cases Tab PRD.md`). Version bumps overwrite that one file; the changelog inside it is the track log. No separate per-version files.
- **Language + board copy standards** live in `docs/LESSONS.md`. Read it before naming or writing board copy.

## The five operating rules

1. **Explorations copy, integration merges.** Exploration folders never import `kits/` or `cases/_ds-cases/kits/` directly — they carry their own copies (snapshot isolation). Only an *adopt* decision merges a winning pattern back into a frozen kit; the DR then flips to *integrated*.
2. **Every exploration closes with a decision record (DR).** Verdict ∈ adopt / reject / park. The DR links the boards, the feedback that shaped it, and integration status. DRs live in the owning workflow: `<workflow>/docs/decisions/` (e.g. `cases/_docs-cases/decisions/DR-X-###`). The root `docs/LEDGER.md` is the master overview.
3. **Archive is append-only, with provenance.** Nothing is deleted; nothing is archived without a ledger entry naming the decision that closed it.
4. **Status lives in exactly two places:** the exploration's `BRIEF.md` status line (source of truth) and the File Navigator's badges (rendered view). No third copy to drift.
5. **Every workflow ships its DS delta.** `ds-global` (physical `_ds/`) is the baseline; each workflow keeps the DS pieces it produces in its own `_ds-<workflow>/` folder, named after the workflow folder exactly (`cases/_ds-cases/`, later `home/_ds-home/`). At handoff, the workflow folder travels with both its UI and its clean, integration-ready DS delta (see the Integration contract in its MANIFEST).

## Status vocabulary

`exploring` → `in review` → `decided (adopt / reject / park)` → `integrated` or `archived`. Anything stale or broken is flagged in the owning `LEDGER.md`.

## Atomic delineation

tokens (`_ds/tokens/`) → DS components (`_ds` bundle) → **molecules** (`cases/_ds-cases/kits/core-kit.jsx`) → **organisms** (`cases/_ds-cases/kits/cpc.jsx`, `card-kit.jsx`) → **screen kits** (`<workstream>/kits/`) → **boards** (canonical HTML). Full mapping with consumers: `cases/_ds-cases/MANIFEST.md`.

## Stakeholders

Share the project (view/comment). Land on `docs/review-hub/Review Hub.html`, open a board, and drop comments pinned to elements. Comments are triaged into DRs, then resolved — resolved threads stay retrievable for provenance.
