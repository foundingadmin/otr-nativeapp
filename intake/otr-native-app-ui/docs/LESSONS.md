# LESSONS — standards we keep

A living capture of the conventions this project runs on. Not exhaustive, just the guidelines we've agreed on so they don't get re-litigated every sprint. Add to it as new standards land. When a rule here changes, update it in place.

---

## Vocabulary

- **Workflow** — a whole product area a user experiences end to end (e.g. `cases/`). Ships its own docs, its DS delta, and its workstreams.
- **Workstream** — one design track inside a workflow, folder-named `<category>-<task_name>`. Category is a closed set: `screen`, `component`, `system`. Adding a category is a decision record.
- **Board** — one `.html` canvas. The canonical board sits at a workstream root. Explorations sit in `explorations/`.
- **Exploration** — a self-contained sandbox of options that closes with a decision record. We call these explorations. We do not call them studies.

## Directory shape

- A workflow folder holds its workstreams plus underscore-prefixed support folders: `_docs-<workflow>/` (PRD + decisions) and `_ds-<workflow>/` (the DS delta).
- A workstream folder has a standard shape: canonical board at the root, then `kits/`, `explorations/`, `archive/`, and a `LEDGER.md`.
- Explorations copy the kits they need; they never import shared kits directly. Integration merges a winning pattern back into a frozen kit.

## Naming

- **Canonical root board** keeps a human name that matches its H1, which is the workstream name (e.g. `All Cases Feed.html`).
- **Exploration board** is named after its parent folder, e.g. `01-details-exploration/01-details-exploration.html`. If a folder still carries the word "studies", rename it to an exploration name.
- **PRD** is one living file at the root of `_docs-<workflow>/` (e.g. `cases/_docs-cases/Cases Tab PRD.md`). Version bumps overwrite it. The changelog inside the file is the track log. We do not keep separate per-version PRD files.

## Board copy

The presentation copy that frames a board: the header, the section titles, the eyebrows, the H2s, and the short body descriptions. This is distinct from the product microcopy inside a mockup, which follows the OTR product voice and its own `·` separator.

**Root board header**

- An eyebrow shows the category: Component, Screen, or System.
- The H1 matches the workstream name (and the filename).
- A short body gives quick context on what the board holds.
- A trailing timestamp on the H1 records the last update, e.g. `Updated • Tue Jul 7, 2026`.

**Exploration board header**

- The eyebrow reads Exploration.
- Everything else follows the same shape.

**Inside a board**

- Simple board titles. Pragmatic H2s. Short body descriptions. The annotated pattern overview on the Single Case Details root board is a good model to reuse.

**Language rules**

- Use `•` as the delimiter in titles at any level.
- No em dashes. Use commas, periods, or `•`.
- No bold inside body copy.
- Keep colons, semicolons, and quotation marks to a minimum.
- No `/` used to give one thing two names (write "Cards", not "Card / tile").
- Plain, laymen language. Avoid jargon and internal shorthand.
- Never use "proposed" on a front end. A board at a workstream root is current by virtue of where it lives.
- "Exploration" only appears on boards inside `explorations/`, never on a root board.
- Avoid over-strict language like "locked-in" on root boards. The root board just is what it is.
- No sticky-note elements on boards. They distract more than they help.

## Hygiene between sprints

- **Exploration files and boards are never deleted.** When an exploration is retired, move it into the workstream's `archive/` folder and add a `LEDGER.md` entry. Deleting design work is not allowed; archiving preserves the decision trail. "Remove this" in a comment means the specific element referenced, not a whole file or folder.
- Bump each root board's `Updated` timestamp when its content changes.
- Keep the `BRIEF.md` status line and the File Navigator badges in sync; they are the only two places status lives.
- Archive is append-only and every archive move gets a `LEDGER.md` entry naming the decision that closed it.
- When an exploration closes, its winning pattern merges into the workstream `kits/` and the decision record flips to integrated.
