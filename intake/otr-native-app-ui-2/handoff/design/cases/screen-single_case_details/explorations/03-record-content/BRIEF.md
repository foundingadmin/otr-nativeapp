# 03 · Record content

**Status: exploring.** Case Details record content model from the Jul 7, 2026 sync (punch list item C). Closes with DR-CD-002.

## What's on the board
1. **Field set + Show more.** The confirmed record fields, collapsed and expanded. Always on: Case ID, Law firm, Issued on, Court of record, Court date when available, Violations. Issue date leads; the booked date is de-prioritized down with the receipt. Show more reveals refund eligibility, reference number, fine, points, and accidents. Order is open, expect to re-sequence.
2. **Law firm data block.** Renamed from Attorney: the block is the firm name, sometimes a solo practitioner's own name. The Law firm field taps into a profile holding reviews, clients booked, and success rate, revealed selectively per OTR's rules. Net-new, pre-Figma.
3. **Two money modules.** Receipt is the balance (legal fee, service fee, total; payment-plan schedule with pay-ahead and the overdue installment surfaced at top). Transactions is how you paid (statement-level charges, each tapping into its own invoice; future installments as inactive upcoming rows).
4. **Participants.** Net-new. The booker plus any added defendant or others, with an add-participant affordance.

## Blocked / pending (do not treat values as final)
- **Law firm stats (F-2).** The exact field set is the source of truth in Alex's screenshot, which is blocked. The stats shown (reviews, clients booked, success rate, years with OTR) are placeholder structure.
- **Add-participant permission (F-3).** The affordance is placed but who can add is pending Alex's confirmation, so it is not yet wired.

## Renders through
Kits copied into this folder (copy-the-kits convention): `design-canvas`, `core-kit`, `cpc`, `card-kit`, `detail-kit`, `detail-record`. Reuses the canonical `DScreen`, `Fact`, `Attorney`, `Stars`, and the `.facts` / `.frow` record styling. Local kit: `record-content.jsx`.

## Related change already applied to the canonical board
The Attorney field on the canonical `detail-record` was renamed to Law firm (firm name primary, contact name secondary). The rest of item C lives here as an exploration until DR-CD-002 closes.
