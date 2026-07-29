# PRD · CD workflow v2, a simpler project built for the full pipeline

Status: proposal, drafted session 4. Owner: Titus. Audience: the CD project
(Claude Design side), plus this repo's intake validator.

## The problem we just lived through

The first full print (sessions 1 to 3) faithfully reproduced the CD
package's canon-stage boards. It was still wrong, because decisions made in
CD explorations were never escalated back into the root HTMLs the printer
consumes. The July 7 Case Preview Cards board carried the ratified design;
the feed and detail boards the printer used did not. Nothing in the package
marks which root is current, so the pipeline cannot tell fresh canon from
stale canon.

Secondary costs of the current shape, measured from this intake: 17 boards,
147 artboards, 16,522 nodes, 12.5 MB, four archive stages, a parallel
`pipeline/mounts/` surface that duplicates screen content, and per-board
divergent fixtures. Most of that volume exists to serve CD's internal
process, not the print pipeline.

## Principle

**One canon surface per component or screen, and a decision is not done
until that surface absorbs it.** Escalation is part of closing an
exploration, not a follow-up task. Anything the printer reads is either
current or fails loudly.

## Proposed CD project shape

```
cd-otr/
├── canon/                      ← the ONLY surfaces the pipeline reads
│   └── cases/
│       ├── case-preview-card.html    (one file per component)
│       ├── all-cases-feed.html       (one file per screen)
│       └── single-case-detail.html
├── explorations/               ← numbered, disposable, never printed
│   └── 2026-07-panel-chat/…
├── decisions.md                ← append-only ledger
├── registry/                   ← machine specs (keep: these were good)
│   ├── status-registry.json
│   └── case-model.json
└── tokens.css                  ← one sheet, names mirror the live
                                  Guidelines library (fruit ramp), no
                                  invented candidate names
```

Rules that make it work:

1. **Canon files carry a version stamp.** Each canon HTML starts with
   `<!-- canon-version: N · YYYY-MM-DD · absorbed: <decision ids> -->`.
   The extractor writes this into the IR.
2. **Every exploration ends in a ledger entry** with a verdict (adopt,
   reject, park) and, for adopt, the canon file plus new canon-version that
   absorbed it, updated in the same working session.
3. **Staleness is machine-checkable.** The intake validator (sweden engine
   side) fails the package when `decisions.md` contains an adopt entry
   newer than the canon file it names, or a canon file's stamp does not
   match the ledger. A failed check blocks printing, the same way a failed
   read-back does.
4. **No mounts, no archive in the package.** CD keeps its history in its
   own repo; the handoff exports `canon/`, `registry/`, `tokens.css`, and
   `decisions.md` only. Target well under 2 MB.
5. **Fixtures are shared.** One fixture set (case ids, firms, ratings,
   amounts) defined in `registry/`, referenced by every board, so variants
   differ only where the design differs.
6. **Token names mirror the live library.** The stale
   `colors/error/500`-style candidate names cost a full re-resolution pass;
   v2 authors against the fruit-ramp and semantic names that actually
   exist, with raw values only where a DS request is open.

## Migration path

Figma is now the most current surface for Cases components (CPC v2 printed
from the July 7 board plus ratified deltas). Seed the new CD project by
reading the printed state back out of Figma as canon baselines, then close
the old CD project. Explorations resume on top of honest roots.

## What this buys

- The printer can trust `canon/` again; the escalation gap becomes a
  build error instead of a silent design regression.
- Intake shrinks by roughly 80 percent, tokenize passes stop re-resolving
  stale names, and per-board fixture drift disappears.
- The Figma pages sidebar and the CD project become mirror images:
  canon page ↔ canon file, Explorations page ↔ explorations/, Archive
  page ↔ CD-internal history.
