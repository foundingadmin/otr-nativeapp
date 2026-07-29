# PRD · The three-surface operating model, v3

Status: revised per Titus's review, Jul 29. Supersedes v2 in this file's
git history. The v2 draft made one wrong assumption that v3 corrects
everywhere: it treated CD as a place where decisions could close. It is
not. CD is hard-isolated; no stakeholder ever sees it.

## 0. The one-sentence system

**CD produces candidates, Figma is where humans decide, and the repo is
the permanent memory that seeds every disposable CD session.**

The two strategic words: **disposable** and **permanent**.

| Disposable | Permanent |
|---|---|
| CD projects and sessions | The repo: ledger, registries, IRs, briefs |
| Exploration bodies in CD | Figma canon (① Components, ② Screens) |
| Candidate prints awaiting a verdict | Verdict records and the diff/request trail |
| Sprint sections after promotion | Ready for dev stamps |

```
   seed (repo: canon IR, tokens, ledger, past sprints)
  ┌─────────────────────────────►  CD session (isolated, disposable)
  │                                   │  candidate package
 REPO (CC) ◄──────────────────────────┘
  │   prints candidates
  ▼
 FIGMA ↪ Explorations  ──  humans review DIVERGENCE here, verdict on canvas
  │   verdict recorded in ledger (CC)
  ▼
 FIGMA canon (① ② on ↪ Cases)  ──  winner converges: DS-bound, polished, stamped
  │
  ▼
 ⑤ Ready for dev  ──  the only surface dev reads
```

## 1. The correction: review happens in Figma, at divergence time

CD cannot host feedback, so waiting for convergence before printing wastes
the exact moment feedback matters most. Therefore:

- **Divergence prints.** A CD session's candidates land side by side on
  the area's `↪ Explorations` page, lightly printed (raw values allowed,
  no full binding pass). Cheap on purpose: most candidates die.
- **Stakeholders verdict on canvas** (adopt / iterate / park per
  candidate), on the sprint section's verdict card. CC records verdicts in
  the ledger; that record is the moment something stops being disposable.
- **Only winners converge.** Full DS binding, Native type, polish, and a
  canon print happen once, for the adopted candidate only.
- **Iterate loops back through the repo.** An "iterate" verdict becomes
  the seed for the next CD session; CC cuts the brief from the verdict
  plus the candidate's IR. CD never needs to be told twice.

### Language discipline

- CD sessions end in **candidates** (designer picks, "ready for review").
  The word "decision" is reserved for verdicts stamped in Figma by a
  human and recorded in the ledger. The repo's decision records carry a
  `decidedOn: figma` field from now on; anything sourced only from CD is
  a candidate, never a decision.

## 2. CD: fresh projects seeded by the repo (Proposal 2, hardened)

Titus's key realization closes the cold-start worry: **CD can read the
repo.** The repo carries canon IRs, the token map, registries, fixtures,
past sprint records, and the PRDs. So:

- Start a **fresh CD project whenever convenient**. Prompt pattern:
  "This is for the otr-nativeapp repo. Read canon. I need six divergence
  candidates for an upload modal inside the case chat we built."
  CD acquaints itself from the repo (the chat canon, the DS tokens, the
  card system) and diverges immediately.
- **Session end = candidate package** into `intake/`, handed to CC:
  "pop this into Figma for review." CC prints it to `↪ Explorations` as a
  dated sprint section.
- **Nothing is lost when a CD project dies**, because candidates only ever
  reach Figma through CC, and CC files every package (winners and losers)
  in the repo on the way through. Past explorations are queryable forever
  without keeping any CD project alive.
- Optional warm variant: keep one CD project per hot workstream ("Cases")
  while it is active, and gut it at workstream close, leaving one
  lightweight demo. Same rules apply; the repo is still the only memory
  that counts. Use this only if fresh-seeding proves slower in practice —
  measure the first few sprints before adding the maintenance burden.

### What the repo must do well (this makes CC load-bearing)

1. **Seedability**: `canon/` + `brand/` + `intake/` history must let a
   cold CD session reconstruct any surface. The IR extracts and BRAND.md
   already do this; every sprint adds its package.
2. **Sprint filing**: every candidate package is committed with its sprint
   id, verdicts get appended to the same record. One folder = one sprint =
   one Figma section = one ledger entry.
3. **Brief cutting**: `handback/<sprint-id>/BRIEF.md` generated from
   Figma read-back + the verdict being iterated on.
4. **Validation**: intake staleness checks (v2 §3 rules) still apply to
   whatever CD exports.

## 3. Figma scaffold: divergence and canon are different pages

Per area (live for Cases now):

```
↪ Cases                canon plates: ① Components ② Screens ③ Proposed ④ Diffs
     ↪ Explorations    DIVERGENCE REVIEW. Dated sprint sections, verdict cards.
     ↪ UX              human working surface
     ↪ Archive         everything retired, never deleted
⑤ Ready for dev        stamped copies only
```

### Keeping ↪ Explorations sane at scale (standing practice, scaffolded on the page)

- **One sprint = one section**, named `YYYY-MM-DD · <question> (STATUS)`,
  STATUS ∈ OPEN → REVIEWED. Candidates sit side by side inside; the
  verdict card is part of the section.
- **Only OPEN sprints live on the page.** The moment verdicts are recorded
  and the winner is promoted, CC moves the whole sprint section to
  `↪ Archive`. The page is a review queue, not a museum.
- Candidate prints are deliberately light: raw values allowed, no diff
  cards, no registry entries. Binding integrity money is spent on winners.
- A permanent header on the page documents these rules (printed Jul 29,
  with a TEMPLATE sprint section to copy).

### Canon page legibility (v3 pass, done Jul 29)

Color now encodes surface type at the plate level: ① Components on a blue
plate, ② Screens neutral, ③ Proposed violet, ④ Diffs amber, each with a
solid 140px header band and 64px title readable from full zoom-out. Nested
sections are white cards on the plates; component sets are white with a
hairline border and DS-bound `radius/4XL` corners; annotations use the
`Canvas/Title` / `Canvas/Note` styles. Rule of thumb: **hue = what kind of
surface am I on; white = a thing you can pick up.**

## 4. Per-surface contracts, v3 corrections only

**CD** (was v2 §6.1): #5 changes: a session ends when the designer picks
the candidate set worth reviewing, exports the package, and hands it to
CC. It never ends in a decision. There is no review step in CD, ever;
stakeholder review is the Explorations page. #3 changes: confidence comes
from the repo seed (canon IR + ledger + brief), not from CD project
history.

**Figma**: gains the divergence-review responsibility: sprint sections,
on-canvas verdicts, promotion of winners into canon after (and only
after) a recorded verdict. Everything else stands.

**Repo/CC**: gains sprint filing and verdict recording as first-class
operations; remains the only bridge in both directions.

## 5. Next steps

1. Ratify v3 (this doc). D-record it with `decidedOn: figma` discipline
   starting now.
2. CC builds: sprint filing convention (`intake/sprints/<id>/`), verdict
   recorder (ledger append + section move to Archive), brief cutter.
3. First live sprint to prove the loop end to end: the upload-modal
   example, or the feed-screen fixture repopulation.
4. Retire the old CD project after its Cases knowledge is confirmed
   fully represented in the repo (IR extracts already exist; verify, then
   close it).
