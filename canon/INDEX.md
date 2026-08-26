# Canon index — read this first, every session

Preflight for any UI work in this repo (see `intake/otr-cd-handoff/handoff/PROTOCOL.md` §4):

1. Read this file, then `lessons.md`, `figma-state.json`, and `decisions.json`.
2. Read Figma back before printing. Never print without read-back.
3. `brand/BRAND.md` carries the full registries: file key, section and node
   IDs, variable import keys, the ratified Native text styles, icon sourcing.

## Where things live

| Surface | Location |
|---|---|
| Figma file | `Native App / Design`, key `JcqKNz1pMrEvxwExhb296r` |
| Exploration prints | `↪ Explore` page `11337:2087` (renamed from `↪ Explorations` by the team, Aug 11) |
| Record content board (OPEN) | plate `11570:797` on ↪ Explore; 9 masters + 9 artboards + OPEN/diff shelves, session 7 |
| Full case details board (OPEN) | plate `11586:1537` on ↪ Explore; 8 masters + 14 artboards + OPEN/diff shelves, session 8 |
| Case chat divergences (OPEN) | plate `11640:1405` on ↪ Explore; the linked A artboard reprinted as reference plus D1 to D5, session 9 |
| Icon library | `Icon / Streamline Flex` frame `11530:6368` on the new `↪ Icons` page `11530:6367`; 180 fill-based 24px components. OTR/Icons frame archived. Instance these, never draw. |
| RESTRUCTURE (Aug 11) | The team reorganized the file between sessions: ① Components section dissolved (shelves moved to ↪ Explore as bare frames), ④ Diffs + Proposed + Lexicon + Tools content moved to the Cases `↪ Archive` page, Case Chat board moved to the `↪ Cases` page (actively worked), Proto/Proposed pages gone, new Home/Onboard/Flows/PARKED pages. Full map: `figma-state.json` → `restructureAug11`. Diff swatches and OPEN markers now print on the exploration board itself. |
| Node/style/variable registries | `brand/BRAND.md` |
| Print history + policies | `print-log.json` (sessions 1–3, `buildChecks`) |
| Open DS asks | `variable-requests.md` + the cards on ④ Diffs |
| Decision records | `decisions.json` |
| CD source of truth | `intake/otr-cd-handoff/handoff/` (spec/ generated, design/ mirror — never hand-edit) |

## Standing policies (user-ratified)

- **Leverage the DS first.** Audit the Guidelines library (variables, text
  styles, components) before printing anything new. The DS Button replaced
  our ActionButton; Chip/White pills, Link text, Inputs audits still pending.
- **No raw numerics.** Snap radii/spacing to the nearest DS token (ties round
  down). Sole exception: the Ticket's protected paper radii.
- **Type binds the Native collection** (13 styles, integer ladder
  25/20/16/14/13/12/11/10) or an exact published Product style. No raw
  fontName/fontSize on product text.
- **Layout QA.** After any print into a shared section, screenshot and
  re-read the whole section; place cards by relaying out the grid.
- **Copy**: no em dashes anywhere; sentence case; no emoji in UI.
- Honest-match thresholds for color: ΔE < 2 silent bind, 2–5 bind + flag,
  > 5 raw + DS request (CIEDE2000, live library values only — the CSS-dump
  candidate names are stale).

## Standing caution (session 4)

- **CD escalation gap.** Exploration decisions in CD were not promoted to
  root HTMLs, so canon-stage boards can trail ratified design (that is how
  the first CPC print went stale). Before printing any board, cross-check
  recency against explorations and confirm with the user. Proposal for a
  restructured CD project: `docs/prds/prd-cd-workflow-v2.md`.

## Standing policy added session 5

- **Bind semantic ramps, not fruit primitives.** The Guidelines library ships
  `Color function & themes` with full `brand/error/warning/success/neutral/
  accent/accent2/highlight/highlight2` ramps at 25→950. Any tinted product
  surface binds a ramp rung, which states the role and survives a palette
  change. Ratified ladder: surface 25, border 100, icon 700, secondary text
  800, title 900. Uniform across tones, chosen so every rung clears its
  contrast bar in every ramp. Full keys in `brand/BRAND.md`.

## Standing policy added session 6

- **Shelves run on two fixed rails.** Index rail 400, stage rail fixed to
  the widest content on that surface (① Components: 2396), pad 40, gap 48,
  shelf hugs both axes — so every shelf on a surface lands on one width
  (① Components: 2924). Narrower shelves keep the whitespace. Component
  sets inside are a matrix, not a flow: rows one axis, columns the cross
  product of the rest, uniform column pitch, deprecated variants parked in
  the last rows. Full template in `figma-state.json` → `canvasSystem`,
  traps in `lessons.md` 6e/6f/8b/8c.

## Open items (next session picks these up)

- **Verdict needed: case chat, five divergences** (plate `11640:1405` on
  ↪ Explore, printed session 9 from the artboard the user linked,
  `11533:4405` on the Cases ↪ Archive page). One question in five answers:
  how much room does the case record get inside a conversation. D1 shrinks
  an action to a line and collapses the offer to a chip; D2 gives actions
  the speaker's side and an avatar gutter; D3 lifts the one live action
  into the PinnedBar and quiets the history behind it; D4 filters the same
  surface into All and Updates with a TabsPrimary instance; D5 rolls a busy
  day into one Case activity card. Fixtures are held constant except where
  the caption says otherwise (D2 adds one customer-side action, D5 gives
  Mar 18 three). This board feeds, and does not replace, the standing
  A-through-E question below. Two sub-questions ride on it: the compact
  ActionEntry density axis (D1 would add it, doubling the set to 18
  variants) and whether the pinned CTA keeps DS brand blue or takes the bar
  tone (D3). Note for the next read-back: the artboard the user linked is
  archived, while the team's live chat board is `11500:409` on ↪ Cases and
  has moved on to three demos; confirm which surface a verdict applies to.

- **Verdict needed: 06 Full case details board** (plate `11586:1537` on ↪ Explore,
  printed session 8 from the Aug 14 CD package). Closes with DR-CD-005, the
  Ticket/Case tab architecture, which every one of the fourteen artboards
  depends on. The live sub-decision is the **Payments layout, A against B
  against D**: handoff waits on that pick and the CEO has seen all three.
  Four more OPEN cards ride on the board: sub-tab naming (Overview is a
  placeholder), whether the coded ticket artifact carries data or is a
  stand-in, and F-2/F-3 carried over from the record content board.
  DR-CD-006 is already decided in the CD ledger, so the firm card is the door
  into case chat and the app bar chat icon is printed only as the road not
  taken. Three DS asks came out of it: a **Native/Title/Display rung** (D-014,
  three separate 32 to 38px asks in one board), a **camera glyph**, and a
  **sort glyph pair**. The 8 masters on the board's `The parts` shelf promote
  to the components surface on adopt.

- **Verdict needed: 03 Record content board** (plate `11570:797` on ↪ Explore,
  printed session 7 from the Aug 11 CD package). Closes with DR-CD-002. Four
  OPEN cards ride on the board: field order, F-2 firm stats, F-3 participant
  permissions, the decision record itself. The `OTR/Cases/CaseFacts` set on the
  board deliberately does NOT replace `OTR/Cases/Detail/CaseFacts`; on adopt it
  folds in and the detail screens migrate. Two DS asks on the board: the
  paid-tag emerald pair vs the lime success ramp, and five missing Streamline
  Flex glyphs (hashtag, car, receipt, credit-card, bolt).
- **Ask the user about the `Add participant` section** (`11555:9503` on
  ↪ Explore): a large human-pasted screenshot set (Mobile + Desktop) that looks
  like Alex's screenshots. If so it unblocks F-2/F-3 and the firm-stat set and
  participant permissions can be ratified next session.
- **Verdict needed: `OTR/Cases/ActionEntry`** (`11477:16`, board `11480:117`
  on ↪ Explorations). Nine kinds, four optionality switches, zero raw values.
  On adopt it promotes to ① Components and the feed/detail screens can drop
  their bespoke action cards. Open questions carried from the CD brief: the
  actor-label wording for automated actions (`OTR · automated`), and whether
  the offer block ever collapses to a chip.
- **Verdict needed: which case chat approach anchors the build** (A through E,
  board `11500:409` on ↪ Explorations). All five instance the same ActionEntry,
  so the choice is about surface, not parts. Two sub-questions ride on it:
  whether the pinned CTA keeps DS brand blue or takes the bar tone (the
  standing one-blue-CTA question), and whether ActionEntry needs a compact
  density axis, which CD approach B assumes and the set does not yet have.
- **Explorations page furniture is missing.** The page header texts
  (`11354:169`, `11354:170`) and the TEMPLATE section (`11354:171`) were read
  back at the start of session 5 and were gone later in the same session; the
  agent ran no delete against them. Confirm with the user whether they were
  removed deliberately before rebuilding the scaffold.

- **Dark-mode migration candidate.** DS modes are live (user-confirmed
  Jul 29): `global/foreground|background/*` flip on mode switch. Product
  screens bind `colors/ink/*` primitives (mode-locked). Candidate: rebind
  product text to the semantic foreground ramp for free dark mode; needs
  a verdict plus a background-variable audit.

- **① Components is still storage-as-display.** Session 6 tidied the shelves
  and the variant grids, but the shelves still present the component SETS
  themselves. Lesson 4 calls for frames of instances with the masters parked
  in a compact strip (Buttons specimen `11355:19505`). Decide before the next
  components print whether to convert.
- **Feed/detail screen migration to CPC v2.** ② Screens still instance the
  pre-v2 card anatomy (buttons, court lines). Swap to the new form=card
  variants and relayout.
- StatusBadge asks: vocabulary shrink to 5 lifecycle + 2 SmartMatch badges
  per the badge-rule board (solid forms become legacy), icon-in-badge axis
  (Jul 7 board), compact 22px size (printed sm=21), unread axis.
- Quote-family CTA verdict: SmartMatch set + Incomplete draft keep DS
  Buttons; decide one-blue-CTA vs signal-owned resolution.
- Compact forms for matching-family statuses need CD coverage (pairing
  board only covers the 5 lifecycle badges).
- Design-team verdicts on ④ Diffs: SmartMatch gradient + Solid-neutral
  Button types (or ratify all-blue), alert-orange token, amber-ink token,
  rematch violet accent (#6a5bd0/#5b4bb8, new), screen-tint tokens, ticket
  palette ratification, mono face.
- Publish the Native text collection to the Guidelines library (currently
  local to the Native App file).
- Component-reuse audits: Chip vs White pills, tap rows vs Link text,
  search field vs Inputs, portraits vs placeholder avatar.
- OPEN cards on ③: badge forms (counter/remarketing/cancelled), detail
  fixtures for 9 statuses, AccountRail missing from IR, Courier New.
- StatusBadge unread axis; confetti; per-fixture attorney names (pass 2 polish).
