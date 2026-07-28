# Figma print guide

How to turn `spec/ir/*.json` into Figma frames with OTR DS variables bound. Read `PROTOCOL.md` section 4 first; never print without reading back.

Target file: **Native App / Design**, consuming variables from the **Customer side / Guidelines** library.

---

## 1. Page structure to create

```
① Components (agent)     component sets built from the IR. The print's own workshop.
② Screens (agent)        assembled screens, instances of ① wherever possible
③ Proposed              anything carrying an open decision, marked OPEN
④ Diffs                 variable diff swatches and drift notes. The design team's to-do list.
⑤ Ready for dev         human only. A designer moves frames here and stamps them.
```

Agents write to ①②③④ only. ⑤ is a human page. If a frame on ⑤ conflicts with a print, the frame wins and the conflict goes to `canon/drift.json`.

## 2. Order of work

Components before screens, always. A screen printed before its components exist is a pile of rectangles that nobody can maintain.

```
1. Read back            what already exists on ①②③④, so you update instead of duplicating
2. Resolve variables    build the live variable name index once, at the start
3. Print components     page ①, in dependency order: atoms, then molecules, then organisms
4. Print screens        page ②, composing instances of ①
5. Print open decisions page ③, with an OPEN marker
6. Print diffs          page ④, one swatch per DS_REQUEST value
7. Write canon          print-log.json, figma-state.json, variable-requests.md
8. Hand off             tell the human what to look at first and what you were unsure about
```

## 3. The component set to build, in order

Dependency order matters. Source of truth for every prop and state is `spec/status-registry.json`.

| Order | Component | Variants | Source |
| --- | --- | --- | --- |
| 1 | StatusBadge | 15 status keys × form light/solid × size sm/md, plus `unread` dot and `note` slot | registry `statuses`, `badgeAnatomy` |
| 2 | ActionButton | kind: money / grad / primary / ghost / blue × size sm/md × full width | registry `signalPrecedence.actionKinds` |
| 3 | Chip | filter chip: on/off, with count, with alert dot | IR `otr-chip` in the feed boards |
| 4 | ClassifTag | classification pill and hollow charge pill | IR `classif`, `pill-outline` |
| 5 | AttorneyLockup | revealed / blurred, with and without quote, size 38 and 52 | IR `AttorneyRow` |
| 6 | Meter | completion meter, 0 to 100 | IR `meter` |
| 7 | OverduePill | the money overlay | IR `overlay-pay` |
| 8 | Ticket | variants cream / pink / blue / green / slate, plus photo | IR `tkt` |
| 9 | CasePreviewCard | one variant per status (15), plus `unfinished`, `analyzing-brand`, `tap` modifiers | IR `component-case_preview_cards`, `cpc` |
| 10 | Detail zones | AccountRail, TicketHero, Identity, StatusZone, ActionHub, ActionItem, CaseFacts, ExpandedRecord, HelpZone | IR `mount-detail-screens` |

Then screens: 4 feed states (`screen-all_cases_feed`), 9 detail states (`mount-detail-screens`).

Build the component in the ① workshop, check it against its reference PNG, then instance it into the screens. Do not draw the same card twice.

## 4. Variable binding rules

For every paint, stroke and effect colour, the IR carries `bind`. Honour it exactly.

| action | What to do |
| --- | --- |
| `BIND` | An exact variable exists. Bind it. |
| `BIND_NEAREST` | Perceptually identical, deltaE under 2. Bind the nearest and move on silently. |
| `BIND_NEAREST_AND_FLAG` | Visible drift. Bind the nearest **and** add the value to the diff page with the deltaE. |
| `DS_REQUEST` | No honest match. Use the raw hex, and print a diff swatch on page ④. Never invent a variable. |
| `RAW_OK` | Board scaffolding. Raw hex, or skip the node entirely. |

Resolving a candidate to a live variable:

```js
const live = await figma.variables.getLocalVariablesAsync();          // plus library variables
const names = live.map(v => v.name);
const hit = OTRTokens.matchVariable(decision.figma[0].figmaCandidate, names);
// matchVariable normalises both sides: lowercase, strip / - _ . and spaces,
// then tries exact, then suffix. Returns null if there is no honest match.
```

If `matchVariable` returns null even for a `BIND` action, treat it as `DS_REQUEST`: the CSS dump and the live library have gone out of step, which is itself worth reporting.

Numbers: `token-resolve.js` `resolveNumber(px, 'spacing' | 'radius')` returns candidates. Bind where a token exists. Radius 999 is the pill; bind it to the full radius token, not a literal.

Type: the brand font is **Figtree**. The boards render in the system UI stack because they are wireframe grade, so **do not copy `fontFamily` from the IR for product text**. Print product type as Figtree at the IR's size, weight, line height and letter spacing. Board scaffolding text can stay system.

## 5. Printing diffs, which is the point

The diff page is not a failure log, it is the mechanism that lets an agent be honest instead of confidently wrong. One frame per DS_REQUEST value:

```
┌───────────────────────────────────────────────┐
│  #e5463a                          DS REQUEST  │
│  ███  design value        ███  colors/error/500│
│                                deltaE 5.6      │
│  used for  money and overdue accent, 5 places  │
│  seen in   core-kit.jsx --money                │
│  ask       adopt as a semantic money token,    │
│            or correct the design to error/500? │
└───────────────────────────────────────────────┘
```

Group them: brand accents, sentiment, neutrals, scaffolding. `VARIABLE-GAPS.md` already groups them; keep that order so the design team reads the same list twice.

## 6. What not to print

Board scaffolding. These are annotation and review chrome, not product UI:

```
.spec  .note  .zlabel  .zn  .dc-*  [data-omelette-chrome]  .tweaks*  #__boardPath
explore pins, "Hardest call" notes, section eyebrows, zone number badges
```

The IR already marks their paints `RAW_OK`. If a whole node's name matches the list, skip it, or print it on a separate annotations page if the annotation itself is useful to a reviewer.

## 7. Naming in Figma

Predictable names are what make read back possible.

```
Components   OTR/Cases/StatusBadge
             OTR/Cases/CasePreviewCard
Variants     status=active, form=light, size=md, unread=false
Screens      Cases / Feed / heavy · 5 active
             Cases / Detail / overdue · past due
Open         OPEN · Counter offer badge
Diffs        DIFF · #e5463a · money accent
```

Keep the artboard `id` from the IR in the frame description. That is the join key on read back.

## 8. Plugin notes

`pipeline/figma-plugin/` is a starter, not a finished tool. It does the mechanical parts: load an IR bundle, build the variable index, walk nodes, create frames with auto layout, bind paints, print diffs. Expect to extend it. Two constraints worth knowing up front:

- Fonts must be loaded before setting text: `await figma.loadFontAsync({ family: 'Figtree', style: 'Bold' })`. Map CSS weights to Figtree style names (400 Regular, 600 SemiBold, 700 Bold, 800 ExtraBold).
- Variable binding is per field: `node.setBoundVariableForPaint(paint, 'color', variable)` for fills, `setBoundVariable('topLeftRadius', v)` for radii. Bind, then never overwrite the hex afterwards.

## 9. Expectation setting

The first print of any surface is a structural pass. It will be right about hierarchy, states, copy, spacing intent and variable coverage, and it will be wrong about optical balance, type rhythm and the small decisions that make OTR look like OTR. That is the design of the process, not a defect in it. Print, compare against `reference/png/`, do a second pass on the geometry you can measure, then stop and hand it to a human. The human's polish is the deliverable; your speed is what buys them the time to do it.
