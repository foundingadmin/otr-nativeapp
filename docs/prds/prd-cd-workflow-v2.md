# PRD · The three-surface operating model, v2

Status: proposal, session 4. Owner: Titus. Supersedes the narrower first
draft of this doc. Written after the CPC v2 print, with all three surfaces
live and the escalation gap diagnosed.

## 0. The one-sentence system

**CD is rapid quantity, Figma is single quality, and the repo (CC) is the
ledger that decides which of the two you listen to.**

```
        briefs (handback/)                    prints (two-pass)
   ┌───────────────────────►  CD  ──────────────────────────┐
   │                        quantity        packages         │
   │                                       (intake/)         ▼
  REPO (CC) ◄────────────────────────────────────────────  FIGMA
  ledger · validators · binding index · decision records   quality
   ▲                                                         │
   └────────────── read-back before every session ───────────┘
                                        dev pulls from Figma "Ready for dev" ONLY
```

## 1. The four global questions

### What happens on each surface

| Surface | Happens here |
|---|---|
| CD | Divergence. Many options fast, at high fidelity. Explorations, variant sweeps, state coverage, product-logic reasoning. Ends in decisions. |
| Figma | Convergence. One ratified version of every component and screen, variable-bound to the Guidelines library, human-polished, stamped for dev. |
| Repo (CC) | Memory and enforcement. Decision ledger, binding index, print log, node registries, validators, and the transforms in both directions. |

### What does NOT happen on each surface

| Surface | Never happens here |
|---|---|
| CD | Truth-keeping. Nothing in CD is final, ever. Dev never reads CD. CD files are never hand-groomed for posterity. |
| Figma | Divergence. No seven-variant sweeps on the canon page. Explorations that need canvas review land on the Explorations page and die there or get promoted. |
| Repo | Design. No brand or aesthetic decisions are made in the repo. It records verdicts; it does not issue them. |

### With multiple surfaces, which one do we listen to?

One rule, split by the kind of question:

- **"What should it do?"** (product logic, states, coverage): listen to the
  newest **adopted decision in the ledger**, which points at the CD
  exploration that won. Not to any root HTML by default.
- **"What should it look like?"** (brand, craft, geometry): listen to
  **Figma canon**, because human polish lands there and never flows back
  to CD automatically.
- **"What is current / what was decided?"**: listen to the **repo ledger**
  (`canon/decisions.json` + print log). If two surfaces disagree and the
  ledger cannot resolve it, that is a side-by-side print and a human stamp,
  never a silent merge.

The failure we just lived through (stale CPC print) happened because rule
one pointed at root HTMLs instead of the ledger. Both proposals below fix
that structurally.

### Why these surfaces at all

- CD because nothing else produces high-fidelity divergence at that speed.
- Figma because it is the only surface the OTR dev team and the design
  team share, with a real DS library and human craft tools.
- The repo because two disconnected surfaces need one memory, and because
  agents need a place where enforcement is mechanical (validators, git
  history, read-back manifests) rather than social.

## 2. Proposal 1 · Thin CD (keep a persistent CD project, cut it to the bone)

The current CD scaffold's per-component sub-workflows
(`component-case_preview_cards/` with its own explorations and archive)
are the layer that killed escalation: decisions landed in a component
folder and never reached the workflow's atomic DS. Proposal 1 deletes that
layer.

```
cd-otr/                          ← ONE project, one level of workflows
├── cases/
│   ├── CANON.html               ← the demo: atomic DS + assembled screens,
│   │                              THE only file the pipeline reads
│   ├── explorations/
│   │   ├── 01-chat-surfaces/    ← flat, numbered, disposable
│   │   └── 02-status-sweep/
│   └── DECISIONS.md             ← append-only, per workflow
├── homescreen/  (same shape)
├── registry/                    ← status-registry.json, case-model.json, fixtures.json
└── tokens.css                   ← names mirror the live Guidelines library
```

Contract:

1. One workflow = one CANON.html. No component-level canon files. The
   atomic DS section inside CANON.html is where component decisions land.
2. Closing an exploration and updating CANON.html are the same act, same
   session. An adopt entry in DECISIONS.md must name the new
   `canon-version` stamp it produced in CANON.html.
3. The intake validator fails any package whose DECISIONS.md contains an
   adopt newer than the CANON.html stamp. Stale canon becomes a build
   error, not a design regression.
4. The handoff exports `*/CANON.html`, `registry/`, `tokens.css`,
   `DECISIONS.md` only. No archives, no mounts, no exploration bodies.

## 3. Proposal 2 · Ephemeral CD (recommended)

Stop maintaining a persistent CD project at all. CD becomes what it is
best at: a session tool. The repo becomes the only scaffold.

- **Every CD session starts from a brief that CC generates**
  (`handback/<date>-<topic>/`): current Figma canon screenshots + node
  registry, live token names, open decisions, fixtures, and the specific
  question to diverge on. You never resume old CD state, so "is this
  surface current?" is answered by construction: it was current when CC
  cut the brief, minutes ago.
- **Every CD session ends with an export of only what won**: the adopted
  artboards as one mini-package in `intake/`, plus verdicts. Rejected
  divergences simply do not ship; CD's own history is disposable.
- The repo keeps the only durable copies: ledger entry, IR of adopted
  boards, print log, and the Figma print itself.

Why this answers the anxiety list directly: there is nothing in CD to
drift, nothing to groom, nothing to wonder about. Quantity surfaces are
cattle; quality surfaces are pets.

Cost: you lose in-CD browsing of past explorations (history lives in the
repo and on the Figma Explorations/Archive pages instead), and CC must be
disciplined about cutting briefs. Given the escalation gap just cost a
full reprint, that trade looks good.

**Recommendation: Proposal 2**, with Proposal 1 as the fallback if working
from briefs proves too heavy in practice. The current CD project should be
closed either way; Figma is now the most current surface for Cases, so
the next brief seeds from Figma read-back, not from the old scaffold.

## 4. The Figma scaffold

Per app area, one page family under Design Process (client convention,
already live for Cases):

```
↪ <Area>              canon: ① Components ② Screens ③ Proposed ④ Diffs
     ↪ Explorations   agent prints awaiting a verdict; nothing binds dev
     ↪ UX             human working surface (unchanged)
     ↪ Archive        retired frames; nothing is ever deleted
⑤ Ready for dev       human-stamped copies only; the ONLY dev surface
```

Rules: agents write to ①-④ and Explorations; only a designer moves work to
Ready for dev; retired frames move to Archive. When the canon page gets
heavy (the "one massive collection" worry), the split is by section, in
place: ① Components and ② Screens become their own sub-pages under the
area. Same IDs, same gates, one more page. That is the whole growth plan;
nothing else changes.

## 5. The repo (CC) scaffold, including bi-directional intake

```
intake/      packages FROM CD (exists today)
handback/    briefs TO CD, generated from Figma read-back (new)
canon/       ledger, registries, binding index, print log, figma-state
brand/       BRAND.md registries, tokens scaffold
sweden/      engine (validators live here)
docs/        operating model, PRDs, decision digests
```

**"Can I drop a Figma file in intake to inform a CD session?"** Not a
.fig file, but yes in the way that matters: you say "cut a brief for
<topic>", CC reads Figma back (components, variants, bindings, screenshots,
open diffs) and writes `handback/<date>-<topic>/` with a BRIEF.md on top.
That folder is what you hand a CD session. The reverse pipe becomes a
first-class artifact instead of you re-describing state to CD from memory.

## 6. Per-surface contracts (the six questions)

### CD

1. **Trigger**: an open product question in the ledger, or a new area
   kickoff. Concretely: a `handback/` brief exists naming the question.
2. **Why here**: you need volume, speed, or state coverage. If the change
   is craft on a ratified design, it belongs in Figma instead. If it is
   copy or token bookkeeping, repo.
3. **Start**: open the brief. The brief IS the confidence mechanism: it
   carries current canon, tokens, fixtures, and open decisions, cut by CC
   from live read-back. If there is no brief, do not start; ask CC for one.
4. **Work**: diverge in numbered explorations against shared fixtures.
   Demo = the exploration board itself; that is what CD is good at.
   Nothing needs archiving mid-flight because nothing here persists.
5. **End**: a decision session. Verdict per exploration (adopt, reject,
   park), export adopted boards as the intake package. Stakeholder review
   happens on Figma (Explorations page) when it needs canvas polish
   context, or straight on the CD board for logic-only calls. A decision
   elsewhere that invalidates CD work = the next brief says so; you never
   patch old CD sessions.
6. **Cleanup**: none. The session is disposable once the package is cut.
   (Proposal 1 variant: update CANON.html + DECISIONS.md, then delete
   nothing but export nothing extra either.)

### Figma

1. **Trigger**: an intake package passed validation (print), or a design
   verdict on ③/④ (rebind, polish), or dev pull scheduling (stamping).
2. **Why here**: it is the truth surface. Variable binding, brand polish,
   stakeholder review, and the dev gate only exist here.
3. **Start**: CC runs read-back first, every session, no exceptions. The
   canon page + BRAND.md registries are current by contract; if read-back
   disagrees with the registry, that is fixed before any print.
4. **Work**: two-pass prints (build, then fidelity check), Build Quality
   Check after every script, layout QA on shared sections. Humans polish
   canon directly; their edits win on craft and are captured by the next
   read-back. Agent divergence lands on Explorations, never on canon.
5. **End**: verdicts on ③ Proposed / ④ Diffs cards; promotion = the agent
   reprints onto canon or the human drags the stamped copy to Ready for
   dev. Review happens HERE, this is the review surface for anything
   visual. A CD decision that changes a printed component = new print
   over the same component set (as CPC v2 just did), old look goes to
   Archive implicitly via git + variant history.
6. **Cleanup**: retired frames to the area Archive page; never delete.
   Diff cards close with a verdict noted on the card and in the ledger.

### Repo / CC

1. **Trigger**: everything passes through here; work begins on any intake,
   any print request, any brief request, any sync.
2. **Why here**: memory, validation, transforms, and anything mechanical
   at scale (binding resolution, IR extraction, registries).
3. **Start**: preflight is codified (canon/INDEX.md first, read-back
   before print). Confidence = the validators pass.
4. **Work**: tokenize, print, read back, log. Every action leaves a commit
   plus a canon entry.
5. **End**: commit + push + PR; ledger updated in the same change. Review
   of repo work = PR review, but design stakeholders never need to look
   here; the ledger digests decisions for them.
6. **Cleanup**: git is the archive. Nothing else needed.

## 7. What closes the muddiness, concretely

- "Is this right / current?" → validators + briefs. Stale state fails
  loudly on both pipes instead of printing quietly.
- "Where does this live?" → quantity in CD (disposable), quality in Figma
  (permanent), memory in the repo. If it is not clear which, it is memory.
- "Will anyone see this?" → review surfaces are fixed: visual review on
  Figma, logic review on the CD decision session, process review on the PR.
- "Has this been solved already?" → the brief answers it before the
  session starts; the ledger answers it any other time.

## 8. Next steps if adopted

1. Ratify Proposal 1 or 2 (this doc, decision record in the ledger).
2. CC builds the `handback/` brief generator (read-back → BRIEF.md +
   assets) in the sweden engine.
3. CC adds the intake staleness validator (ledger vs canon stamps).
4. Close the current CD project; cut the first brief from Figma read-back
   for the next Cases question (feed screen migration review is a natural
   first one).
5. Migrate the remaining unprinted canon boards only after each passes a
   recency check against its explorations.
