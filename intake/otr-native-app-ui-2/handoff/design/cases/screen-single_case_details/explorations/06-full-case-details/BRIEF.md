# 06 · Full case details

**Status: exploring.** The full Case Details screen on the static-versus-dynamic split confirmed in the last CEO sync. Closes with DR-CD-005.

## The split
The ticket a user submits comes from a permanent external document, the citation. It does not change while the case moves. The case is the live set of data around it. That difference is now the top-level navigation: **Ticket** and **Case**, with **Overview**, **Documents** and **Payments** as sub-tabs inside Case. Case Overview opens first, because a user checking in wants the update, not the citation they already know.

## What's on the board
1. **The screen, every tab filled.** One Active case. New hero direction, no ticket-photo hero: a white identity block with the issued eyebrow, the location headline, the lifecycle badge, and the court date as a calm reference line. Ticket data moved down into the Ticket tab. The action toast sits above the tab group so it holds its place on every tab.
2. **Getting into case chat.** Decided Aug 14, 2026, DR-CD-006: the legal team card is the door. The whole card opens the chat and the unread message shows inline. The counted app bar icon and the both version stay on the board as the alternatives that were weighed.
4. **Payments divergences.** A the full ledger as built, B balance first with the ledger folded behind two rows, D the balance card with the full ledger under it. The one decision left before handoff. The segmented Receipt against Transactions version was retired, a segmented control inside a sub-tab is a third stacked level of navigation. It stays in `payments-lab.jsx` for the record.
5. **Payments deeper states.** A transaction opens its own receipt as a pushed screen. The plan also has a late-installment state and a paid-in-full state.
6. **Ticket tab with no photo.** A user can book without ever photographing the ticket, so the coded ticket stands in for the artifact and the add-photo prompt sits under it. The field set below is the same either way.

## Decisions carried in from the sync
- The hero is not the ticket photo. Ticket data lives further down the screen.
- Action needed stays visible wherever the user is, so it lives above the tabs.
- Non critical actions that the case can proceed without use brand blue, not amber.
- Payments separates line items, what you are billed, from transactions, how you paid, with the payment plan schedule between them.
- Documents shared in case chat stay in chat until the user copies one to the case file.

## Decided on this board
- **DR-CD-006, chat entry: the legal team card is the door.** Aug 14, 2026. No chat icon in the app bar.
- The segmented Receipt against Transactions version of Payments was retired, it stacks a third level of navigation inside a sub-tab. Kept in source.
- Payments copy tightened for a legal context: Statement of charges and Payment history, not what you are billed and how you paid. Progress reads as installments, 2/3, never a percentage. The plan action clears the balance due, it is not a pay-ahead.
- No count badge on the Payments sub-tab. A number there implies a list waiting at the top of the tab.
- The fixed-record explainer above the Ticket tab was cut. The tab opens on the artifact.
- The status explainer card was cut from Case Overview. The badge and the action toast already carry the state.

## Open in this pass
- **Payments sub-tab, A against B against D.** The last open decision. Handoff waits on it.
- **Sub-tab naming.** Overview inside Case is a placeholder. Updates, Status and Case facts are all candidates.
- **Ticket redundancy.** In the no-photo state the coded ticket repeats three fields that the field list below also carries. Worth ruling on whether the artifact carries data or is purely a stand-in.
- **Participants.** Placed on Case Overview. Who can add a participant is still pending Alex.
- **Firm stats.** Only the rating shows on the card. The fuller firm profile still waits on Alex's screenshot.

## Renders through
Kits copied into this folder per the copy-the-kits convention: `design-canvas`, `core-kit`, `cpc`, `card-kit`, `detail-kit`, `detail-record`. Local kits: `case-shell.jsx` (app bar, hero, legal team card, action toast, the two-level tab group), `case-record.jsx` (Ticket, Overview, Documents, Payments content) and `payments-lab.jsx` (the Payments divergences, the transaction receipt, the late and settled plan states).
