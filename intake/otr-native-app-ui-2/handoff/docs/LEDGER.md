# Master Ledger — all workflows

The cross-workflow overview. One row per workflow; the detail lives in that workflow's own `docs/decisions/LEDGER.md`.

- **cases** — 8 decisions (6 integrated, 2 pending integration) · detail: `cases/_docs-cases/decisions/LEDGER.md` · PRD: `cases/_docs-cases/Cases Tab PRD.md`
- *(future)* **home**, **onboarding**, **booking** — each arrives with its own `docs/` and lands here as one row.

## Integration debt across workflows

- cases / DR-X-007 — LOE required-action UI (queued, ROADMAP Next)
- cases / DR-X-008 — homescreen badge propagation (opens the home workflow)

## Open findings from the Figma handoff pass (Jul 28, 2026)

Surfaced while building the canon pack (`handoff/`). Each needs a CD decision; nothing was deleted or relocated.

- **`DetailScreens` is mounted by no board.** `cases/screen-single_case_details/kits/detail-screens.jsx` declares 9 full detail-screen artboards; `Single Case Details.html` mounts `CaseStatusReps` only. A pipeline mount (`pipeline/mounts/detail-screens.html`) now renders them so they reach Figma. Decide whether the canonical board should mount them.
- **PORT-CONFLICT-001 · `status-doc.jsx` forked across two canon copies** (477ln in `component-case_preview_cards/kits/`, 468ln in `system-case_status_and_action/kits/`). Merge, or rename so the fork is explicit.
- **9 of 15 statuses have no detail-record fixture.** Content decisions, not layout.
- **29 colour values have no honest Figma variable**, incl. `--money` and the SmartMatch gradient. See `handoff/VARIABLE-GAPS.md`; these are printed into Figma as diffs for a DS decision.
- **`record-content.jsx` is orphaned at the project root.** Its owning exploration carries its own copy. Archive or keep.
