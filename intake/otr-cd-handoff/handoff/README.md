# OTR Canon Pack

Everything Claude Code needs to print the Off The Record Cases design into Figma with OTR Figma DS variables bound, and to keep three surfaces in sync month over month.

**Three surfaces, one canon.**

| Surface | What happens there | Who owns it |
| --- | --- | --- |
| Claude design project (CD) | Fast exploration, divergence, decision records. Boards on a pan/zoom canvas. | Design |
| This repo (CC) | Canon. Reads CD, prints Figma, reads Figma back, holds the source of truth. | Claude Code |
| Figma | Human polish, brand craft, live decisions with the CEO, the final dev handoff frame. | Design + CEO |

CD works in a vacuum. Figma works in a vacuum. CC is the glue that keeps them honest.

Read `PROTOCOL.md` before doing anything. It is the operating contract.

---

## Read order

1. `PROTOCOL.md` • the pipeline, the directions of flow, the preflight every sprint starts with.
2. `ASSESSMENT.md` • the honest state of the design work you are about to print, including what is not decided.
3. `FIGMA-PRINT-GUIDE.md` • how to print: components area first, screens second, variables always.
4. `ARCHITECTURE.md` • repo shape, the IR node schema, what each file in `spec/` is.
5. `PORT-MAP.md` • which file is canon, what each kit becomes in Figma, the known conflicts.
6. `VARIABLE-GAPS.md` • the values that have no honest Figma variable. Print these as diffs, do not invent bindings.
7. `Workflow.html` • the one-page picture of the whole loop. Built for the CEO. Open it in a browser.

## What is in here

```
spec/
  status-registry.json      15 status keys: badge form, weight, tone, primary action, severity, open decisions
  case-model.json           18 cases, preview and detail surfaces joined on caseId
  tokens/
    figma-variable-map.json every design value, its Figma variable candidates, and the binding action
    binding-report.json     the same data split by action, for triage
  ir/
    _index.json             every board, every artboard, node and paint-decision counts
    <board>.json            the Figma-ready IR: layout, paints, strokes, radii, effects, text
pipeline/
  ir-extract.js             DOM to IR walker. Runs inside a board page.
  token-resolve.js          value to Figma variable decision. Shared by the extractor and the plugin.
  Canon Export.html         the export station. Regenerates all IR.
  figma-plugin/             starter plugin: reads the IR, prints frames, binds variables, prints diffs
reference/
  png/                      one PNG per canon artboard. The fidelity reference for the second pass.
  Native PRD.md, screenshots, source uploads
design/                     the CD board system, verbatim. Boards, kits, explorations, archive.
docs/                       PRDs, all decision records, ledgers, roadmap, lessons, handoff plan
assets/                     images unpacked out of source
```

## Quickstart for Claude Code

```
1. Read PROTOCOL.md and ASSESSMENT.md.
2. Open spec/ir/_index.json. Canon boards are stage:"canon". Start there, ignore archive.
3. Load spec/tokens/figma-variable-map.json through pipeline/token-resolve.js.
4. Print the component area first (FIGMA-PRINT-GUIDE.md section 3), then the screens.
5. Every paint carries a bind action. Honour it. Never invent a variable.
6. Print a diff frame for every DS_REQUEST value. That frame is the design team's to-do list.
7. Write back what you did into canon/ (PROTOCOL.md section 6) so the next sprint starts informed.
```

## Non-negotiables

- **Nothing is deleted.** Retired work is archived with a ledger entry naming the decision that closed it.
- **No em dashes** in any copy you write, in docs or in product microcopy. Commas, periods, semicolons, or `•`.
- **Sentence case** everywhere. Headings, buttons, labels.
- **A human stamps the frame.** Agent output is a first pass. Nothing reaches dev until a designer has polished it in Figma and marked it Ready for dev.
