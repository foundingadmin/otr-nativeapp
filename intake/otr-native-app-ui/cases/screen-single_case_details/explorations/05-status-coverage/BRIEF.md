# 05 · Status coverage

**Status: exploring.** Moved off the workstream root Jul 10, 2026 (per the call to keep nothing but the current canon screen on the root board). Lifecycle coverage lives here now.

## What's on the board
One section, one artboard per status, all the same case (Glendale, Park & Vance, OTR-48144): incomplete, SmartMatching, SmartMatch'd, counter offer, needs signature, active, active + unread, court imminent, past due, disputed, dismissed, resolved, cancelled. Each preview card sits above the detail screen it opens, so the card-to-detail relationship reads at a glance. The attorney stays hidden until representation is real, then Helen is consistent throughout.

## Renders through
Kits copied into this folder (copy-the-kits convention): `design-canvas`, `core-kit`, `cpc`, `card-kit`, `detail-kit`, `detail-record`, `detail-screens`. Board: `status-coverage.jsx` (the former root `status-reps` board, trimmed to the coverage section and renamed).

## Related decision
DR-CD-004 (Jul 10, 2026): the root board holds only the canonical Active screen; this coverage board was split out here.
