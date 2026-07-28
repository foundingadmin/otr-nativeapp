# cases/screen-single_case_details — Ledger

**Workstream:** Case detail page — the full record for a single case. PRD §10.

## Canonical (current)

- `Single Case Details.html` — the canonical Active case detail screen only (kits: `detail-kit`, `detail-record`, `detail-screens`, `status-reps` + _ds-cases kits). Per the Jul 10, 2026 call, nothing but the current canon screen lives on the root board; lifecycle coverage moved to `explorations/05-status-coverage/`.

## Explorations

- `explorations/03-record-content/` — record content model per the Jul 7 punch list (item C): the confirmed field set with a Show more disclosure, the law-firm data block (net-new, field source pending Alex’s screenshot), the two money modules (Receipt vs Transactions), and the net-new Participants module. **Status: exploring.** Closes with DR-CD-002.
- `explorations/04-case-chat/` — net-new case chat surface (punch list item E): the audit-log-that-is-also-a-chat. Full-screen surface approaches, the decided action-toast-plus-message adjacency pattern, the unified case-action variant gallery, and the persistent resolving-action surface (item G constraint). **Status: exploring.** Note (Jul 10, 2026): the adjacency-clusters surface approach was retired (kept in source) once the left-aligned toast axis tied toast and message across every approach; a compact-chips-plus-pinned-toast approach was added in its place. Remaining approaches renumbered to stay sequential.
- `explorations/05-status-coverage/` — the lifecycle-coverage board moved off the root (Jul 10, 2026): one case shown through every status, each preview card above the detail screen it opens. **Status: exploring.**

## Archive

- `archive/00-board-c-detail-pages/` — Board C, early detail-page divergence. ⚠️ **Source-only:** depends on deleted `otr-kit`/`otr-cpc`/`otr-f-kit` — no longer renders. Kept for record.
- `archive/01-board-d-flow-moments/` — Board D, flow-moment studies. ⚠️ **Source-only:** same deleted-kit dependency.
- `archive/02-timeline-lab/` — timeline workshop, **parked** per DR-CD-003 (Jul 10, 2026). The standalone lifecycle timeline is a dead feature; kept for the decision trail. ⚠️ May reference canonical kits by relative path from its old location.
- `archive/03-details-exploration/` — the former `01-details-exploration` (ticket hero, attorney card, record layout), **archived** Jul 10, 2026 per DR-CD-004. Still renders from the archive. Kept for the decision trail.
- `archive/90-orphaned-modules/` — JSX modules whose host boards were deleted pre-migration (`court-row-divergence`, `detail-actions`, `detail-disclosure`, `timeline-titled-card`). Kept as source reference.

## Decisions

- **DR-CD-001, timeline dot treatment: generic (as-built).** Confirmed during the timeline-lab workshop (Jul 7, 2026). The timeline spine uses generic state dots (done is a muted check, current is a tone pulse, future is a dashed hollow), not per-event iconographic dots. The iconographic A/B was retired from the lab. *(Historical: the timeline itself is now parked, DR-CD-003.)*
- **DR-CD-003, standalone lifecycle timeline: parked.** Confirmed in the Jul 7, 2026 sync (item D). There is no single case lifecycle, so a standalone timeline (and the 5-stage macro tracker) loses signal value. The timeline zone is removed from every Case Details screen and the timeline lab is archived. The **case chat audit log** (item E, `explorations/04-case-chat/`) is the canonical lifecycle surface. DR-CD-001 stays valid for any residual timeline styling.

- **DR-CD-004, case record layout: tabbed Overview / Documents / Payments (as built).** Confirmed Jul 10, 2026. The tabbed record is the one record-layout decision moving forward; it is already the canonical pattern on the root board. The `01-details-exploration` (ticket hero, attorney card, stacked-vs-tabbed record) is archived, and the root board's exploration review panel was removed so the root holds only the canonical Active screen. Lifecycle coverage moved to `explorations/05-status-coverage/`.

Numbering: **DR-CD-###**. Pending integration affecting this surface: DR-X-007 (LOE action UI + re-sign moment); DR-CD-002 (record content model, open in `explorations/03-record-content/`).
