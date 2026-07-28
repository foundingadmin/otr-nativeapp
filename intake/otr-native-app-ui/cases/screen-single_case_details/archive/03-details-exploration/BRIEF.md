# 01 · Details exploration

**Status: exploring.** Studies for the Case Details page: how we surface the ticket, how the attorney card sits in the hero, and how the record zone is laid out.

> Rebuilt Jul 7, 2026 after the folder was deleted in error. The earlier truncation, missing-field, and tab-structure studies were not recoverable; this rebuild follows the current direction and does not reproduce them.

## Rows on the board
1. **Ticket display in the hero.** A leads with a photo of the uploaded citation (the previous approach). B leads with the ticket UI component built in this workstream, with its scalloped edge and state color, so the citation reads as a structured record.
2. **Attorney card in the hero.** How the attorney block integrates with the hero, carried across the full range of states (not booked, SmartMatching, SmartMatch'd pre-acceptance, active revealed, re-SmartMatching). A lifts the card up over the base of the hero (current pattern). B sits it as a full-width band directly below the hero.
3. **Overview, documents, and payments.** A stacks all three as always-open cards in one scroll, no tap needed. B keeps them behind tabs that reveal one section at a time.

## Renders through
Kits copied into this folder (self-contained, per the copy-the-kits convention): `design-canvas`, `core-kit`, `cpc`, `card-kit`, `detail-kit`, `detail-record`. Reuses the canonical `DScreen`, `TicketHero`, `Identity`, `AttPhoto`, `Ticket`, `CaseFacts`, `DocList`, `PaymentHistory`, and `DetailTabs`.

## Open questions
- Ticket display: photo vs component.
- Attorney integration: overlapping card vs inline band.
- Record layout: stacked scroll vs tabs.
