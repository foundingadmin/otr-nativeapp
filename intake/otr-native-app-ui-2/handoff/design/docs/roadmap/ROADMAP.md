# Roadmap — OTR Native App UI

**Canonical truth.** Stakeholder-friendly render: `Roadmap.html` (same folder). Keep the two in sync.

Ordered horizon line across all workstreams. Source: PRD v1.4 §15/§17 + open explorations. Update when a DR lands or a new initiative opens.

## Now — open explorations

1. **cases/screen-all_cases_feed / 01-feed-exploration** — feed layouts, filters, action treatments. Status: exploring.
2. **cases/component-case_preview_cards / 01-header-divergences** — CPC header / identity-zone treatments. Status: in review.
3. **cases/screen-single_case_details / 01-details-exploration** — detail tabs + zone structure. Status: exploring.

## Next — decided by PRD, not yet designed

1. **Gap-state badges** — Counter offer, Remarketing, Cancelled have no approved badge (PRD §6.2/§15). *Highest-priority gap before build.* → new exploration in `cases/system-case_status_and_action/`.
2. **LOE required-action UI** — surface the state-gated LOE as a titled needs-attention action on Active (CPC + detail), incl. the one-tap re-sign moment (DR-X-007 integration).
3. **CPC anchor-tier validation** — test Candidate-to-cut fields against real 6+ card feeds (PRD §8.5).
4. **Unread-dot clearing behavior** — clears on case open vs. notification open (PRD §15).
5. **Dismissed! under overdue balance** — demote vs. gate the celebration (PRD §15).
6. **Archived badge** — real use case or drop (PRD §15).

## Later — horizon

- **Homescreen propagation** — homescreen inherits the case-status badge system (DR-X-008; this workflow leads, homescreen follows).
- **Onboarding** — first-run experience (new workstream).
- **Booking / instant-quote surfaces** — out of scope for Cases PRD, on the app-redesign line.
- **Lifecycle communications layer** · **attorney messaging depth** · **multi-case bulk actions** (PRD §17).

## Done

- Case status badge registry (Series 1–3) — DR-X-001, integrated.
- SmartMatch'd pattern + sub-logo — DR-X-002, integrated.
- Status language rationalization (Resolved/Dismissed!, no Settled/hard-stop) — DR-X-003/004, integrated.
- Badge weight + form as governing DS rule — DR-X-006, integrated.
