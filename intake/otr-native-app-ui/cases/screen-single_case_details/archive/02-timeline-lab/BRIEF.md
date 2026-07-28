# 02 · Timeline Lab

**Status: exploring.** Workshop for the Case Details **timeline element** (zone 4).

## Why
The production timeline (`window.Timeline` in `../../kits/detail-record.jsx`) is rendered
per-status from short *slices* defined in `../../kits/status-reps.jsx`. There was no single
place showing the **full lifecycle** — so the canonical default items had never been
confirmed end-to-end. This lab builds the master set so we can lock it.

## What's on the board
1. **Timeline · default steps** — three models for what the default steps should be, same
   case & moment, hidden title bars so the comparison is purely about the steps:
   **A · Full event log** (every milestone) · **B · Key milestones** (the shared beats,
   matching+accept+sign collapsed to "Attorney retained") · **C · Phase tracker** (five
   fixed stages, identical for every case). Pick the model → status-reps slices follow it.
2. **States & tones** — the dot vocabulary (done / current / future + severity tones).
3. **Branch variants** — how the spine reshapes per interrupt / terminal state
   (counter, message, overdue, disputed, re-match, dismissed, reduced, cancelled).

## Decided
- **Dot treatment → generic (as-built).** DR-CD-001 in the workstream LEDGER. The
  iconographic-dots A/B was retired; the spine keeps generic state dots.

## Hard constraint
PRD **§9.8 firewall** — the timeline is fed by **system events only**. It may say a message
*exists* ("New message received") and route into the sealed thread; it may **never** name
what the message was about. Firewall items are lock-marked on the board.

## Open questions to resolve
- **Which step model** — A (full log) vs B (milestones) vs C (phase tracker).
- **Naming** — reconcile "Attorney SmartMatch'd" (match phase) with "Attorney assigned"
  / "Attorney retained" (post-active). Pick one canonical wording.
- Confirm the final default set → feed back into `status-reps.jsx` slices.

## Renders through
Canonical kits, referenced (not copied): `_ds-cases/design-canvas` + `core-kit`,
`../../kits/detail-kit` (SEVERITY + `.tline` CSS), `../../kits/detail-record` (Timeline CSS).
Lab-local renderer `LabTimeline` mirrors the production `.tline` classes so the A/B and
inline phase dividers stay on the real styling.
