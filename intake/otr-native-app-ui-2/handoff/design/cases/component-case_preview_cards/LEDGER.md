# cases/component-case_preview_cards — Ledger

**Workstream:** The Case Preview Card (CPC) component — its per-state specifications and card-level treatment divergences. PRD §9. Consumes the status language from `system-case_status_and_action`; feeds the assembled feed in `screen-all_cases_feed`.

## Canonical (current)

- `Case Preview Cards.html` — CPC per-state specifications across all Series (PRD §9). The proposed card for each lifecycle badge, shown compact + expanded.
- The identity zone (`CPCHeader`, shared in `_ds-cases/kits/card-kit.jsx`) reflects **DR-CPC-001** below — every CPC surface across the app inherits it.

## Explorations

- _None open._ (`02-alert-cta-sizing` closed by DR-CPC-002; archived below.)

## Decisions

- **DR-CPC-002 · Alert action pattern (the toast).** Take the whole-block tap from `archive/02-alert-cta-sizing/` (V4). A card's grouped alert no longer carries a separate CTA button: the tinted block itself is the tap target, with a trailing edge chevron, and the message resolves it. Two forms: **headline only** (V4, e.g. unread messages) for signals that read fine unaided, and **headline + one-line descriptor** (V4b/c/d) for money / legal-gate / high-stakes items that need the who / why / stakes spelled out (payment overdue, sign LOE, counter offer, booking deadline, warrant risk). A card with **no** action signal shows no toast and no button at all (V0): the whole card is the tap target with a single edge chevron kept clear of the top-right badge. Elevated into the shared `_ds-cases/kits/` (`card-kit.jsx`: `GroupedAlert` now button-less with optional `al.sub`; `cardAlert` carries descriptors; `CPCConsistent` baseline drops the fallback button and taps whole-card), so it propagates to every CPC consumer. The root `Case Preview Cards.html` (pairing boards, via `kits/status-doc.jsx`) applies it across all action-signal potentialities. Numbering: next is **DR-CPC-003**.

- **DR-CPC-001 · Header / identity-zone treatment.** Take D2 from `archive/01-header-divergences/` (severity-tinted pills, refined through review). The eyebrow reads "Issued · month year" over the location headline; the filled classification tag and the separate "Court date · …" line are replaced by one hollow violation pill (charge name + overflow count, e.g. "Reckless driving +2"). Also decided in the same pass: the attorney row shows the **law firm name**, never an individual attorney's name; the avatar is the firm's team photo, not a person silhouette; star-rating icons are ink, not gold. Integrated into the shared `_ds-cases/kits/` (`cpc.jsx`, `card-kit.jsx`, `core-kit.jsx`), so it propagates to every CPC consumer (`screen-all_cases_feed`, `screen-single_case_details`, `system-case_status_and_action`). Numbering: **DR-CPC-###**.

## Known gaps

- CPC anchor-tier validation — test Candidate-to-cut fields against real 6+ card feeds (PRD §8.5, ROADMAP Next #3).
