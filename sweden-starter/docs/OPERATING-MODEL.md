# Operating Model — CC as the Canon

{{BRAND_NAME}} UI design happens on two disconnected surfaces. This repo — run
by Claude Code (CC) — is the glue and the single source of truth ("canon").

```
Claude Design (CD)          Figma (design team + CEO)
   designs in a vacuum         designs in a vacuum
        │                            ▲ │
        ▼                            │ ▼
   intake/ ──► CC compiles canon ──► print into Figma
                     │      ▲
                     │      └── read-back: assess Figma-first work
                     ▼
              brand/ + docs/ = canon
        (humans and agents pull this FIRST, always)
```

## The two pipelines

### 1. Forward — CD package → Figma ("print")

1. CD package lands in `intake/<name>/` (JSON specs + PNG references + docs).
2. CC tokenizes and componentizes into `brand/` (see `intake/README.md`).
3. CC assesses the target Figma file's existing DS **before building** —
   variables may come from a team library; bind, never hardcode.
4. **Two-pass build protocol** (every print, no exceptions):
   - **Pass 1 — JSON build:** generate `use_figma` scripts from the JSON spec.
     Build component sets (with variants) in the **staging area** of the canvas,
     never directly into screen frames.
   - **Pass 2 — PNG fidelity:** screenshot the build, compare against the CD
     package's PNG reference, re-engineer on canvas until visually faithful.
     Visual fidelity matters as much as DS-binding thoroughness.
   - Present the result for human review. Only after approval do staged
     components get integrated into the assembled screen frames.
5. **Variable binding policy:** always map to existing Figma variables using
   best-guess matching. If no credible match exists, use the raw value AND
   print a visible diff annotation onto the canvas next to the element so a
   human can assess and file a DS update request with the design team.

### 2. Backward — Figma → repo ("read-back")

Design decisions also happen Figma-first (e.g. live CEO reviews on canvas).
Before ANY new design session (CD or CC):

1. CC reads the current state of the target Figma file.
2. Diffs it against canon in `brand/` — components, tokens, decisions.
3. Updates canon with anything decided outside CD; snapshots live in
   `brand/figma-state/`.
4. Only then does new design work begin — so no session ever starts from a
   stale picture.

## Open decisions

Unresolved design questions ride along rather than block the pipeline:

- CD packages may ship with open decisions → CC prints them into Figma as
  **decision frames** (clearly-marked frames near the relevant screens) so
  they can be resolved manually in live meetings.
- Resolved decisions flow back via the read-back pipeline into canon.
- Tracked in `docs/decisions.md` (one line per decision: status, where it
  lives, where it was resolved).

## Canon contents

| What | Where |
|---|---|
| Design tokens (source of truth) | `brand/tokens/source/` |
| Component HTML (print source) | `brand/components/html/` |
| Component registry + Figma node IDs | `brand/component-map.js` + `brand/BRAND.md` |
| Figma state snapshots (read-back) | `brand/figma-state/` |
| PRDs and product docs | `docs/prds/` |
| Open/resolved decisions | `docs/decisions.md` |

## Cadence

Weekly design work on both surfaces for the next several months. Every session
— human or agent, CD-side or Figma-side — begins by pulling canon from this
repo, and ends by writing back what changed. CC enforces both halves.
