# 04 · Case chat

**Status: exploring.** Net-new surface from the Jul 7, 2026 sync (punch list item E). The case chat is part of the case details experience, reached from the Single Case Details screen. It is an audit log that is also a chat: a permanent record of what happened, with conversation interleaved.

## Decided going in
- **Display pattern.** An action toast (Case accepted, Counter offer sent) renders as a system entry; the firm's required human message renders as a normal chat bubble directly beneath it, tied by adjacency (same sender, same time). The offer / detail block stays attached to the toast; the message renders as itself, never encapsulated inside the toast.
- **Item G firewall.** Timestamped log entries are permanent and never mutate. No state-changing CTA lives inside a historical action entry (resolving it would rewrite chat history). The resolving CTA lives on a persistent surface pinned above the log.
- **One component.** The legacy client-side, firm-side, and system action cards unify into a single ActionEntry, retoned per kind.

## Sections on the board
1. **Surface approaches.** Five full-screen takes: A unified thread, B log-led with day dividers, C split pinned-plus-log, D compact system chips, E compact chips with a pinned toast for the single most actionable item. The earlier adjacency-clusters take was retired Jul 10 (kept in source for the trail); the left-aligned toast axis now ties toast and message across every approach, which subsumed it.
2. **The case-action variant set.** One component through every kind: case accepted, declined, cancelled, counter offer sent, counter offer accepted, counter offer declined, counter offer withdrawn, case resolved, and an automated payment failed. Plus a note / attachment / actor optionality study. Built for future additions.
3. **Persistent resolving surface (item G).** A counter offer resolved from a pinned bar over an inert log entry; an automated failed-payment entry with a persistent pay bar.

> The standalone “decided pattern · toast plus real message” section was retired Jul 8, 2026 (kept in source): the pattern is demonstrated inline across the surface approaches, so a dedicated section was redundant.

## Renders through
Kits copied into this folder (copy-the-kits convention): `design-canvas`, `core-kit`. Local kit: `case-chat-kit.jsx` (ChatScreen, ActionEntry, Message, SystemChip, DayDivider, PinnedActionBar). Uses the DS bundle for FeatureIcon and the core-kit `Attorney` firm avatar.

## Open questions
- Which surface approach anchors the build (A through E).
- Whether the offer / detail block ever collapses to a chip (approach E) or always stays attached to the toast.
- Actor-label wording for system actions (OTR vs OTR automated).
- The full future action set beyond the nine variants shown.
