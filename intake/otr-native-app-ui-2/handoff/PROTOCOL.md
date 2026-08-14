# Protocol • the canon pipeline

The operating contract between the three surfaces. Claude Code reads this first, every time.

---

## 1. The problem this solves

Design gets made in two places that cannot see each other. An agent can produce a screen in minutes but cannot make it feel like OTR. A designer in Figma can make it feel like OTR but cannot cover 18 states in an afternoon. Left alone, the two surfaces drift, and nobody can answer "which version is real."

Claude Code is the answer. It holds canon, prints into Figma, reads Figma back, and never lets either surface become the only truth.

## 2. Roles

| Player | Does | Does not |
| --- | --- | --- |
| Design in CD | Explores fast, diverges, writes decision records, ratifies what it can | Polish to brand grade; own final geometry |
| Claude Code | Extracts, binds variables, prints frames, reads Figma back, compiles canon, reports drift | Make design decisions; stamp work as ready |
| Designer in Figma | Polishes, corrects craft, applies real brand judgement, stamps Ready for dev | Invent product logic that contradicts a decision record |
| CEO | Reviews on the Figma canvas, gives verdicts, decides what CD could not | Review in CD; chase files |
| Dev | Consumes only frames stamped Ready for dev | Read CD boards or this repo |

## 3. Flow, in order

```
        ┌──────────────┐   1. extract        ┌──────────────┐   2. print         ┌──────────────┐
        │      CD      │ ──────────────────▶ │      CC      │ ──────────────────▶ │    FIGMA     │
        │  exploration │                     │    canon     │                     │   polish     │
        │   decisions  │ ◀────────────────── │  source of   │ ◀────────────────── │   review     │
        └──────────────┘   5. inform next    │    truth     │   3. read back      └──────────────┘
                           design session    └──────────────┘                            │
                                                    ▲                                    │ 4. stamp
                                                    │  6. record                         ▼
                                                    └────────────────────────────  READY FOR DEV
```

**1 • Extract (CD to CC).** A design session ends. Run `Canon Export.html` in the design project. It walks every board and writes IR plus a variable map. That output, with the docs and the design tree, is the pack you are holding.

**2 • Print (CC to Figma).** Claude Code prints the components area first, then assembled screens, binding every paint to a Figma variable where an honest one exists and printing a diff swatch where none does. Speed lives here. Expect the first print of any new surface to be structurally right and aesthetically 70 percent there.

**3 • Read back (Figma to CC).** Before any new print, Claude Code reads the current state of the target Figma pages: what a human moved, renamed, restyled, or decided. That read becomes `canon/figma-state.json`. Human edits win. Always.

**4 • Stamp (human).** A designer polishes the printed frames in Figma: real spacing rhythm, real type craft, real brand feel, correct component structure. When a frame is right, it moves to the Ready for dev page and gets the stamp. Only stamped frames are dev input. This is the gate that keeps agent output from reaching engineering raw.

**5 • Inform the next session (CC to CD).** Before a new CD design session starts, Claude Code publishes a short digest of what changed in Figma and what the CEO decided. Design starts from reality instead of from the last thing it remembers.

**6 • Record.** Every print, read back and stamp is a commit plus a canon entry. "Which version did he see" is answered by a link, never by memory.

## 4. Preflight • the first action of any sprint

Nobody, human or agent, starts UI work without this. It takes minutes and it is what prevents drift.

```
1. Read canon/INDEX.md            what exists, what stage it is at, what is stamped
2. Read canon/figma-state.json    the last read of the Figma canvas
3. Read canon/decisions.json      every ratified decision, CD and Figma alike
4. Diff                           does CD disagree with Figma anywhere?
5. If yes                         resolve before designing. Human edits win.
6. Announce the target            which artboards this sprint touches, so two surfaces
                                  do not edit the same frame in parallel
```

## 5. Directions of change, and who wins

| Situation | Resolution |
| --- | --- |
| CD changed, Figma untouched | Print. Straightforward. |
| Figma changed, CD untouched | Read back. Update canon. Tell CD before it designs on stale ground. |
| Both changed the same frame | Human wins on craft, geometry, type and colour. CD wins on product logic and state coverage. Claude Code prints a side by side and asks. Never silently merges. |
| Figma decided something CD had marked open | Canon records the decision, CD closes the exploration with a decision record pointing at the Figma frame. |
| CD ratified something Figma has not seen | Print it into the Proposed page, not into a stamped frame. |

## 6. What Claude Code writes back

Kept in the repo at `canon/`, rewritten every run, committed with the print.

```
canon/
  INDEX.md              human readable: every surface, its stage, its Figma link, its stamp date
  figma-state.json      last read of the target pages: frames, names, sizes, variable bindings, stamps
  decisions.json        every decision, from CD decision records and from Figma review sessions
  print-log.json        every print: what, when, from which IR, into which page, at which commit
  drift.json            where CD and Figma disagree right now, and which side is authoritative
  variable-requests.md  the running DS request list, generated from the print, owned by design
```

## 7. Cadence

- **Weekly print.** One scheduled print per week keeps the delta small. Small deltas are cheap to polish.
- **Read back before every print.** No exceptions. A print that has not read back can overwrite human polish.
- **CEO review on the Figma canvas.** Comments land on frames. Open decisions are printed as marked frames so a call can be made in the room.
- **Stamp on the way out.** Dev pulls from the Ready for dev page and nothing else.

## 8. Why this is faster, in one paragraph

Coverage is the expensive part of this product, not craft. 18 states across a feed and a detail screen is many days of drawing rectangles. Agents do that in minutes and never get bored on state 14. What agents cannot do is make it feel like OTR. So the machine does breadth and the human does taste, and the pipeline exists so that trade never turns into two divergent files. The CEO gets more surface to react to, sooner, on a canvas he already uses, and dev still receives exactly what it receives today: a stamped Figma frame drawn by a person who cared.
