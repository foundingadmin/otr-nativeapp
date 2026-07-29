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
| Agent sections | ① Components ② Screens ③ Proposed ④ Diffs on the `↪ Cases` page (IDs in `figma-state.json`) |
| Exploration prints | `↪ Explorations` page `11337:2087` (sub-page of Cases, created session 4, empty scaffold) |
| Proto tools | `↪ Proto` page `11382:38949`, section ① Tools `11414:1529`: stretchy OTR/Mock/Chrome + two resize-anywhere Rigs (`11410:4926` apple, `11410:5405` android) |
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

## Open items (next session picks these up)

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
