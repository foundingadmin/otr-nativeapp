# ACTIVATE.md — Sweden One-Prompt Activation

This file is the single point of activation for a new Sweden deployment.
The operator says: **"Read ACTIVATE.md and activate Sweden for [Brand Name]."**
Claude Code (CC) then runs everything below, one step at a time, confirming
each before moving on.

Sweden connects five surfaces: **Claude Design (CD)** and **Figma** (the two
design surfaces), **this GitHub repo** (the canon), **CC** (the glue), and the
**terminal** (upload/print commands). See `docs/OPERATING-MODEL.md` for the
full model. When the workflow flowchart lands in `docs/flowchart/`, treat it
as the visual companion to this file.

---

## Step 0 — Fill the identity

If the installer script already replaced `{{BRAND_NAME}}` everywhere, confirm
and continue. If any `{{BRAND_NAME}}` placeholder remains in the repo
(grep for it), ask for the brand name and casing, then replace all occurrences
(`CLAUDE.md`, `docs/OPERATING-MODEL.md`, `brand/BRAND.md`, `brand/*.js`,
`README.md`).

## Step 1 — Entry-state interview

Ask these two questions, one at a time:

1. **"Do you have a Claude Design (CD) package for this client?"**
   (a zip/folder of HTML, JSX, CSS, tokens, docs exported from CD)
2. **"Does the client have an existing Figma design system or design file?"**
   If yes: get the file key from the URL (`figma.com/design/[FILE-KEY]/...`)
   and whether variables are local or from a team library.

Route by the answers:

| CD package | Figma exists | Path |
|---|---|---|
| Yes | No | **A — CD-first** |
| No | Yes | **B — Figma-first** |
| Yes | Yes | **C — Reconcile** |
| No | No | **D — Net-new** |

## Path A — CD-first

1. Have the operator upload the CD package into `intake/<package-name>/`
   (give them the terminal one-liner from the "Terminal recipes" section below).
2. Run the intake pipeline in `intake/README.md`: audit → tokenize into
   `brand/tokens/source/*.tokens.json` → fill `brand/token-map.js` +
   `brand/BRAND.md` → componentize into `brand/components/html/`.
3. Ask for the target Figma file (or create one from `sweden-starter.fig` if
   none). Record the file key in `brand/BRAND.md`.
4. Bootstrap variables: `node sweden/engine/init-figma.js`, then print
   components per `sweden/engine/FIGMA-PLUGIN.md` (two-pass protocol in
   `docs/OPERATING-MODEL.md`).

## Path B — Figma-first

1. Confirm the Figma MCP is connected; record the file key in `brand/BRAND.md`.
2. Run the read-back pipeline: fetch all variables and styles, snapshot to
   `brand/figma-state/`, then translate into `brand/tokens/source/*.tokens.json`
   and `brand/token-map.js` (best-guess naming; flag low-confidence matches
   for review — see `sweden/INSTALL.md` §C).
3. Translate priority components Figma → HTML into `brand/components/html/`
   per `sweden/engine/FIGMA-PLUGIN.md` (Component Sync).
4. **Generate the CD seed:** fill `cd-kit/seed/` from canon (tokens CSS,
   component HTML, condensed brand rules — see `cd-kit/seed/README.md`).
   The operator uploads `cd-kit/CD-PROJECT-BRIEF.md` + the seed into a new
   CD project so CD starts from the dictated scaffold with real brand values.
5. Canon is now live. Future CD work flows through Path A's intake pipeline.

## Path C — Reconcile (both exist)

1. Run Path B first (Figma is the client's current source of truth).
2. Then run Path A's intake, **diffing CD values against the Figma-derived
   canon**. Auto-apply exact matches; present every conflict to the operator
   as a decision (log in `docs/decisions.md`).
3. Print reconciled components back to Figma; annotate unresolved conflicts
   on canvas as decision frames.

## Path D — Net-new

1. Interview for brand basics, one at a time: primary dark color, primary
   accent, white/neutrals; font family (and where the files live); logo assets;
   spacing grid preference (default 4px); motion feel (default 120/200/320ms).
2. Scaffold `brand/tokens/source/*.tokens.json` from the answers with sensible
   defaults per `sweden/INSTALL.md` §A. Run `node sweden/engine/run-adapters.js`.
3. Create the Figma file (from `sweden-starter.fig` when available, else blank),
   record the key, run `node sweden/engine/init-figma.js`, verify collections.
4. First components arrive later via CD packages (Path A) or get designed
   directly in Figma (picked up by read-back).

## Step 2 — Wire the surfaces

- **Figma:** confirm the Figma MCP connection and file key in `brand/BRAND.md`.
- **GitHub:** repo should already be pushed by the installer. If CI sync is
  wanted, set `FIGMA_API_TOKEN` per `sweden/INSTALL.md` §E (service account).
- **CD:** nothing to wire — CD output arrives as packages into `intake/`.
- **Docs:** update `CLAUDE.md` "Current version" to v0.1.0 and commit.

## Step 3 — Close activation

1. Verify: `node --check` passes on engine scripts you touched; token JSON
   lints (`node sweden/engine/lint-tokens.js`) if tokens exist.
2. Commit everything: `feat: Sweden v1 brand install — [Brand Name]`.
3. Tell the operator what exists now, and what the standing loop is:
   *CD package → intake → canon → print to Figma; Figma-first work → read-back
   → canon. Canon first, always, both directions.*

---

## Terminal recipes (give these to the operator when needed)

Upload/replace a CD package (macOS; swap paths/names as needed):

```bash
cd ~/Desktop && rm -rf sweden-work && git clone [REPO-URL] sweden-work && rm -rf "sweden-work/intake/[PACKAGE-NAME]" && unzip -oq "[/path/to/package.zip]" -d "sweden-work/intake/[PACKAGE-NAME]" && cd sweden-work && git add -A && git commit -m "intake: add [PACKAGE-NAME] CD package" && git push origin main
```

Rules for all recipes: always chain with `&&`, always operate in a fresh
clone (`sweden-work`), never run git commands in the user's home directory.
