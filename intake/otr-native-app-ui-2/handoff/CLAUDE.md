# Project rules (persistent)

Rules for this repo. They carry over from the CD design project and they apply to every conversation, human or agent.

## Never delete design work

- **Never delete boards, explorations, or printed frames.** Retire by archiving: move the folder into the workstream's `archive/` directory and add a ledger entry naming the decision that closed it.
- The same applies in Figma. Retired frames move to an Archive page. They do not get deleted.
- "Remove this" in a comment means remove the element referenced, never a file, folder, or frame.

## Canon comes first

- **Preflight before any UI work.** Read `canon/INDEX.md`, `canon/figma-state.json`, `canon/decisions.json`. See `PROTOCOL.md` section 4. This is not optional and it is not slow.
- **Read Figma back before printing.** A print that has not read back can overwrite human polish.
- **Human edits win** on craft, geometry, type and colour. CD wins on product logic and state coverage. Never silently merge a conflict; print a side by side and ask.
- **`spec/` is generated.** Never hand edit it. If it is wrong, fix the extractor and regenerate.
- **`design/` is a mirror.** Never refactor it from this repo. It is CD's working surface.

## Never invent a variable binding

- If no honest Figma variable exists for a value, use the raw value **and** print a diff swatch on the diff page. A visible gap is correct; a confident wrong binding is not.
- Never rename or edit a DS variable. Requests go to the design team through `canon/variable-requests.md`.

## Copy

- **No em dashes anywhere.** Not in docs, not in commit messages, not in product microcopy. Use commas, periods, semicolons, or `•`.
- **Sentence case** everywhere: headings, buttons, labels. Not Title Case.
- Second person, active voice. "Your instant quote", "Find your attorney".
- No emoji in product UI. Status is a badge, not an emoji.
- Trust language is load bearing near decisions: money back guarantee, secure checkout, no court, no points, cancel anytime.

## The gate

Nothing reaches dev that a human has not stamped. Agents write to the Components, Screens, Proposed and Diffs pages. Only a designer moves a frame to Ready for dev. Dev reads that page and nothing else.

## Every change leaves a record

- Every print, read back and stamp is a commit plus a `canon/` entry.
- Every closed exploration ends in a decision record with a verdict: adopt, reject, or park.
- Decision records name the commit and the Figma link they were decided on, so "which version did he see" is answered by a link.
