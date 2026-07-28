# Assessment • the state of the work being handed over

Written at pack build time. Read this before you trust anything in `spec/`.

## 1. What is genuinely solid

- **The status system.** 15 status keys with ratified badge form, weight, tone, primary action and severity, plus a signal precedence rule that resolves conflicts (money outranks everything but a legal gate). Extracted to `spec/status-registry.json`. This is real product logic, worked out and approved, and it is the highest value artifact in the pack.
- **The decision trail.** 8 decision records, per workstream ledgers rolling into a master ledger, append only archive with provenance. Most design projects arrive with nothing like this.
- **The governance shape.** Workflow to workstream to board, with a closed category set (`screen`, `component`, `system`). It maps onto a repo hierarchy without translation.
- **The design language.** Four zone CPC anatomy, the two layer badge model, severity ordering in the action hub, and the SmartMatch sub brand treatment are all documented on boards and now in the IR.

## 2. What blocks a clean Figma print, and what this pack does about it

| Blocker | Reality | What the pack does |
| --- | --- | --- |
| Boards are Babel in the browser | Claude Code cannot execute them | `spec/ir/*.json` carries the rendered result: 147 artboards, 16,500 nodes, with computed layout, paints, type |
| Nothing binds to Figma variables | 119 distinct colour values in the canon kits; only 5 are an exact match to a Figma variable | `spec/tokens/figma-variable-map.json` gives every value an action: bind, bind nearest, bind nearest and flag, or DS request |
| The local palette is deliberately off system | `core-kit.jsx` says the hues are "tuned to the CEO approved badge board (friendlier than raw DS tokens)" | The 15 local semantic tokens are reconciled one by one in the variable map's `localPalette`. Two, `--money` and `--otr-grad`, have no honest match |
| Two forked case datasets | `CASES` (18 preview states) and `DETAIL` (8 full records) shared no schema and no ids | Joined on `caseId` in `spec/case-model.json`. All 8 detail records matched a preview case |
| Snapshot duplication | `design-canvas.jsx` exists in 15 places, `core-kit.jsx` in 11 across 3 divergent lengths | `PORT-MAP.md` names canon per file and records the conflicts. Nothing was deleted |
| Assets inlined as base64 | 33 KB PNG inside `core-kit.jsx`, 343 KB more in a sidecar txt | Unpacked to `assets/firm-team.png` |
| Board scaffolding mixed with product UI | `DScreen`, `ZLabel`, `Spec`, explore pins and the tweaks panel sit beside the CPC | The IR marks scaffolding paints `RAW_OK`; `FIGMA-PRINT-GUIDE.md` section 6 lists the classes to skip |

## 3. Findings you would not have guessed

**a. The nine full case detail screens were mounted by nothing.** `cases/screen-single_case_details/kits/detail-screens.jsx` declares two sections and nine artboards of the real product screen. The canonical board `Single Case Details.html` mounts `CaseStatusReps` only, one artboard. The nine screens rendered nowhere, so they would have been invisible to any port. The pack adds `pipeline/mounts/detail-screens.html`, a mount that exists purely so those screens reach the IR and the PNG set. Nothing else was changed. Treat this as the canonical detail screen set.

**b. Two canon copies of `status-doc.jsx` have diverged.** `component-case_preview_cards/kits/status-doc.jsx` is 477 lines; `system-case_status_and_action/kits/status-doc.jsx` is 468. Each board loads its own fork. See PORT-CONFLICT-001 in `PORT-MAP.md`.

**c. The badge board has already retired the solid badge.** The registry in `core-kit.jsx` still carries `fill:'solid'` for several statuses, and the ratified board reads "No more solid badges. Five light lifecycle states." The solid forms are the pre collapse granular vocabulary. On product surfaces, print the five light lifecycle badges plus the two transient SmartMatch states. `spec/status-registry.json` carries both the raw registry and the collapse map.

**d. Four archive boards predate the canvas** and have no artboards to walk. They are listed in `spec/ir/_index.json` under `notExtracted`. Their source travels in `design/` regardless.

**e. Detail record coverage is thin.** 9 of the 15 statuses have no detail record fixture. Those detail frames need content decisions, not just layout. Listed in `spec/status-registry.json` under `openQuestions`.

## 4. Open decisions that travel to Figma

Per the operating agreement, decisions land in CD when they are ready and in Figma when they are not. These are not ready:

1. **Counter offer, Re-SmartMatching, Cancelled badges.** Form, weight and tone are provisional. Print them with an OPEN marker so the call can be made live on canvas.
2. **Detail records for the 9 uncovered statuses.** Content, not layout.
3. **The 29 DS request colour values.** Each one is either a brand decision the DS should absorb or a drift to correct. `VARIABLE-GAPS.md` has the list.

## 5. Numbers

```
boards extracted        16 of 20, plus 1 pipeline mount
canon artboards         30   (2 + 5 + 4 + 1 + 9 specimen + 9 detail screens)
all artboards           147
nodes in the IR         16,522
IR size                 12.5 MB
colour values audited   119
  exact variable match      5
  perceptually identical   35
  visible drift            40   bind nearest, print a diff note
  no honest match          29   DS request, print a diff swatch
  board scaffolding        10   raw hex is fine, never ships
status keys              15   (12 ratified, 3 open)
cases in the model       18   (8 with both preview and detail surfaces)
decision records          8
```
