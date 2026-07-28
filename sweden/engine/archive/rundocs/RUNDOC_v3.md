# RUNDOC v3 — Sweden Platform Sprint

**Scope:** engine
**Version:** 3.3.2
**Date:** 2026-05-23
**Status:** Phases 1–6 complete ✅ — deployment live on Vercel | Adapters + showcase architecture fixed | v3.3.0: sync engine rebased on W3C source JSON

---

## Sprint Overview

RUNDOC v3 is the restructure + multi-surface + User Manual sprint.

Prompts 1–6 of this sprint are now complete. This document records what was built,
the current state of each phase, and the planned scope for Phase 6 (governance tooling).

---

## Status Table

| Phase | Name | Status |
|---|---|---|
| 1 | Repo restructure + W3C JSON token source + INSTALL.md | ✅ Complete |
| 2 | V1 adapters: web-css, pptx-json, gslides-json + run-adapters.js | ✅ Complete |
| 3 | GitHub Actions: nightly sync, on-merge sync, token lint + lint-tokens.js | ✅ Complete |
| 4 | HTML-to-Astro translator | ✅ Complete — `sweden/translators/html-to-astro/index.js` |
| 5 | Sweden User Manual in Astro | ✅ Complete (foundations + components) — template detail pages queued |
| 6 | Governance tooling: audit.js, generate-map.js, create-sweden-ds CLI spec | ✅ Complete (audit.js + generate-map.js shipped; create-sweden-ds CLI on future backlog) |
| 7 | Sync engine rebase — source JSON as single source of truth (v3.3.0) | ✅ Complete — PR #56 merged 2026-05-23 |

---

## Phase 1 — Repo Restructure ✅

### What shipped

- **Repo restructure** (`git mv` — history preserved):
  - `sync/` → `sweden/engine/` (scripts + docs)
  - `tokens/` → `brand/tokens/`
  - `fonts/` → `brand/fonts/`
  - `assets/` → `brand/assets/`
  - `sync/BRAND.md`, `sync/token-map.js`, `sync/component-map.js` → `brand/`
  - `index.html`, `preview/`, `styles/` → `showcase/`
  - `uploads/` deleted
  - Scaffold dirs created: `sweden/adapters/` (5 surface adapters), `sweden/translators/` (2 translators)

- **Path fixes**: all JS `require()` + CSS `@import` + HTML `href` paths updated after restructure

- **GitHub Pages**: root `index.html` is now a meta-refresh redirect to `showcase/index.html`

- **W3C Design Token source layer** (`brand/tokens/source/`):
  - `color-primitives.tokens.json` — 55 color tokens
  - `color-semantic.tokens.json` — 39 semantic aliases + dark mode extensions
  - `typography.tokens.json` — families, weights, sizes, line-heights, letter-spacing
  - `spacing.tokens.json` — space scale, radii, shadows, layout, icon strokes
  - `motion.tokens.json` — easing curves, duration tiers

- **`sweden/engine/build-tokens.js`** — thin CLI wrapper around the web-css adapter. Reads JSON source, writes byte-for-byte matching CSS to `brand/tokens/output/web/`. All 5 diffs clean.

- **`sweden/INSTALL.md`** — brand contract, three installation tiers, token naming audit, first sync verification, GitHub Secrets section

- **CLAUDE.md** — fully updated to v3 paths

### Verification

```bash
node sweden/engine/build-tokens.js
diff brand/tokens/color-primitives.css brand/tokens/output/web/color-primitives.css  # → empty
diff brand/tokens/color-semantic.css   brand/tokens/output/web/color-semantic.css    # → empty
diff brand/tokens/typography.css       brand/tokens/output/web/typography.css        # → empty
diff brand/tokens/spacing.css          brand/tokens/output/web/spacing.css           # → empty
diff brand/tokens/motion.css           brand/tokens/output/web/motion.css            # → empty
```

---

## Phase 2 — Adapters ✅

### What shipped

Three V1 surface adapters in `sweden/adapters/`:

**`web-css/index.js`**
- Full CSS generation pipeline (migrated from old `build-tokens.js`)
- Per-group column alignment via `padEnd(N)` — 5 token files, correct alignment in all groups
- Dark mode: `:root {}` + `[data-theme="dark"] {}` + `@media (prefers-color-scheme: dark) {}`
- Returns `[{ key, file }, ...]` — one entry per CSS file written
- Handles `--file=name` flag (single-file mode)

**`pptx-json/index.js`**
- Output: flat JSON for python-pptx theme injection
- Key format: dot-notation (`color.navy.700`, `typography.size.16`, `spacing.4`)
- Values: resolved hex strings, px numbers, fontFamily strings, `[x1, y1, x2, y2]` for cubicBezier
- Exports `toKey(source, name)` — shared by gslides adapter
- 165 tokens → `brand/tokens/output/pptx/tokens.json`

**`gslides-json/index.js`**
- Output: flat JSON with RgbColor objects for Google Slides API
- Key format: identical to pptx-json (imports `toKey` from pptx adapter)
- Color format: `{ red: 0.035, green: 0.294, blue: 0.467 }` (0–1 floats, 3 decimal places)
- 165 tokens → `brand/tokens/output/gslides/tokens.json`

**`sweden/engine/run-adapters.js`**
- Reads `brand/BRAND.md` `## Adapters` table for enabled adapters
- `--adapter name` flag overrides BRAND.md
- Graceful skip for adapters without `index.js` yet (web-flat-json, email-inline)
- Returns success/fail count, exits 1 if any enabled adapter fails

**`brand/BRAND.md`** — added `## Adapters` table:
- web-css: enabled
- pptx-json: enabled
- gslides-json: enabled
- web-flat-json: disabled
- email-inline: disabled

### Verification

```bash
node sweden/engine/run-adapters.js
# → 3 adapter(s) succeeded
ls brand/tokens/output/web/    # 5 CSS files
ls brand/tokens/output/pptx/   # tokens.json (165 tokens)
ls brand/tokens/output/gslides/ # tokens.json (165 tokens)
```

---

## Phase 3 — GitHub Actions + Token Lint ✅

### What shipped

**`sweden/engine/lint-tokens.js`**
Five validation checks, human-readable + `--json` mode, exits 0/1:
1. All 5 required source files present + valid JSON
2. No duplicate token keys across all source files (global index)
3. All `{alias}` references resolve — including `$extensions.com.metanoia.modes.dark`
4. No orphaned `brand/token-map.js` entries (every `css: '--name'` must exist in source)
5. Each source file has at least one non-`$` token

Current run: 5/5 checks pass, 165 tokens, clean.

**`.github/workflows/token-lint.yml`**
- Trigger: PR touching `brand/tokens/source/**` or `brand/token-map.js`
- Runs `lint-tokens.js --json` + `lint-tokens.js` (human output)
- On failure: posts error summary as PR comment via `gh pr comment`

**`.github/workflows/sync-on-merge.yml`**
- Trigger: push to `main`, paths `brand/**` or `sweden/engine/**`
- Runs all enabled adapters via `run-adapters.js`
- Commits changed `brand/tokens/output/` with `[skip ci]`

**`.github/workflows/sync-nightly.yml`**
- Schedule: 2:00 AM UTC daily + manual trigger
- Dry-run `sync-figma-to-repo.js --dry-run` first
- If diffs detected: applies sync, runs adapters, opens draft PR with diff summary
- Requires `FIGMA_API_TOKEN` secret

### Verification

```bash
node sweden/engine/lint-tokens.js
# Sweden token lint
# ─────────────────────────────────────────
#   Source files : 5 / 5
#   Token count  : 165
#   ✓  All checks passed (clean)
```

---

## Phase 5 — Sweden User Manual ✅ (skeleton)

### What shipped

Astro static site initialized in `showcase/`:

**Structure**
```
showcase/
├── astro.config.mjs     output: static, base: /manual
├── package.json         astro ^6.3.7
├── src/
│   ├── layouts/
│   │   └── Base.astro         sidebar + token CSS imports + responsive layout
│   ├── components/
│   │   └── Sidebar.astro      nav, hamburger/close, mobile drawer, backdrop
│   ├── styles/
│   │   └── tokens.css         @imports 4 token CSS files, base reset
│   └── pages/
│       ├── index.astro                  Welcome + 3 quick-start paths + context block
│       ├── foundations/
│       │   └── colors.astro             Swatch grid + click-to-copy + light/dark toggle
│       ├── templates/
│       │   └── index.astro              4 template cards + copy-ready AI prompts
│       └── ai-guide/
│           ├── generate.astro           4-step generate workflow + vocab + example prompts
│           └── update.astro             4-step update workflow + 3 worked examples + anti-patterns
```

**Token wiring**
All pages use `var(--token-name)` from `brand/tokens/output/web/`:
- `--fg-1/2/3/4` — text hierarchy
- `--bg-canvas/subtle/muted/accent-soft` — surfaces
- `--border-subtle/default/strong` — borders
- `--btn-primary-*` — action buttons
- `--space-*`, `--fs-*`, `--fw-*`, `--lh-*`, `--ls-*`, `--radius-*` — layout/type

**Build**
```bash
cd showcase && npm run build
# 5 page(s) built in 1.22s — no errors
```

### Still needed (Phase 5 continuation)

- Foundation pages: typography, spacing, motion, assets
- Component pages: buttons, cards, forms, icons
- Template detail pages (one per template)
- Font delivery: verify `@font-face` in `typography-utilities.css` works from Vercel (see Housekeeping)

---

## Deployment & Hosting

### Vercel setup (one-time)

1. Go to **vercel.com/new** → Import Git Repository → `foundingadmin/metanoia-designsys`
2. Vercel reads `vercel.json` automatically — no manual overrides needed in the UI
3. Set **Production Branch** to `main`
4. No environment variables needed for the User Manual (token CSS is bundled at build time by Vite)
5. Optional: add a custom domain in Vercel dashboard → Project → Settings → Domains
6. Deploy — first build runs `cd showcase && npm install && npm run build`

> `FIGMA_API_TOKEN` is a **GitHub Secret** (for the nightly sync workflow), not a Vercel env var. Do not add it to Vercel.

### Astro deploy workflow (ongoing)

- Every push to `main` triggers an automatic Vercel **production deploy**
- Every PR gets an automatic Vercel **preview URL** — no config needed, Vercel creates it
- To test a build locally before pushing:
  ```bash
  cd showcase && npm run build && npm run preview
  # Opens at http://localhost:4321/manual/
  ```
- The Astro `base: '/manual'` path is set in `showcase/astro.config.mjs`
- The `vercel.json` redirect (`/` → `/manual/`) handles the root URL

### Deployment verification checklist

Run after each Vercel deploy (production or preview):

- [ ] Root URL (`/`) redirects to `/manual/`
- [ ] `/manual/` — Welcome page loads; 3 path cards (Generate, Customize, Update) visible
- [ ] `/manual/foundations/colors` — swatch grid renders; click any swatch → token name copies to clipboard
- [ ] `/manual/templates/` — 4 template cards visible; "Copy AI prompt" copies full prompt text
- [ ] `/manual/ai-guide/generate` — 4 steps visible; copy buttons functional
- [ ] `/manual/ai-guide/update` — 3 worked examples and anti-pattern cards visible
- [ ] **Mobile** (< 768px): hamburger button appears; tap → sidebar slides in; tap backdrop or ✕ → closes; Escape key closes
- [ ] Colors page **dark mode toggle**: clicking "Dark" applies `[data-theme="dark"]` to the swatch surface; colors flip correctly
- [ ] No hardcoded values in rendered CSS: open browser DevTools → inspect any element → confirm all colors/sizes show as `var(--token-name)` in the Styles panel (not resolved hex or px)
- [ ] `cd showcase && npm run build` locally — must show **5 page(s) built**, 0 errors

---

## Legacy Showcase Migration

The existing `showcase/index.html` (54 KB — the full design system preview with component cards and token preview iframes) is **not** part of the Astro build. It is not in `showcase/dist/` and is currently only served via GitHub Pages.

### Option A — Migrate to Vercel (recommended next step)

Move the legacy showcase into Astro's `public/` directory so it's copied into `dist/` as-is:

1. Create `showcase/public/` directory
2. `git mv showcase/index.html showcase/public/index.html`
3. `git mv showcase/preview/ showcase/public/preview/`
4. `git mv showcase/styles/ showcase/public/styles/`
5. Create `showcase/public/colors_and_type.css` — a **flattened** version of the barrel file with all token `@import`s inlined (no relative paths; just the CSS custom property declarations directly). Astro copies `public/` verbatim — it does not process `@import` chains in static files.
6. Also copy brand fonts: `cp -r brand/fonts/ showcase/public/fonts/` — needed so `@font-face` in `typography-utilities.css` resolves from the Vercel-served URL
7. Update `showcase/public/index.html`: `href="../colors_and_type.css"` → `href="colors_and_type.css"`
8. Update all `showcase/public/preview/*.html`: `href="../../colors_and_type.css"` → `href="../colors_and_type.css"`
9. Remove the Vercel redirect in `vercel.json` (`/` → `/manual/`) — the legacy showcase now lives at `/` and the manual at `/manual/`

> **Font note:** `showcase/styles/typography-utilities.css` currently has `src: url('../../brand/fonts/...')`. After migration to `public/`, this becomes `src: url('../fonts/...')`. Update during step 6.

### Option B — Retire (later)

Once the Astro manual has full foundation + component + template pages, retire `showcase/index.html` entirely. The manual becomes the single source of truth. Delete `showcase/index.html`, `showcase/preview/`, and `showcase/styles/` from the repo. Remove the `base: '/manual'` path from `astro.config.mjs` so pages serve from root.

### GitHub Pages sunset

After Option A or B is live on Vercel:

1. Delete root `index.html` (the meta-refresh redirect stub)
2. In GitHub repo **Settings → Pages → Source**: set to "None" to stop serving (or leave — it's harmless once Vercel is canonical)
3. Update `CLAUDE.md` — GitHub Pages section → note Vercel as primary hosting, Pages as inactive
4. Add `vercel.json` to the repo structure table in `CLAUDE.md`
5. Tick off the "Astro site deployment" TBD below

---

## Repo Housekeeping

### Root `.gitignore` (missing — add now)

The repo has no `.gitignore` at root. Create one:

```
# OS
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*

# Env
.env
.env.local
.env*.local
```

Commit as: `chore: add root .gitignore`

### Confirmed-clean items (no action needed)

- `showcase/node_modules/` — correctly covered by `showcase/.gitignore`; not tracked in git
- `brand/tokens/output/` — intentionally tracked; Vercel's Vite build reads these files at CSS bundle time and the pptx/gslides JSONs are consumed directly by external tools
- `colors_and_type.css` at root — keep; it's the barrel import for local dev and any consuming project that clones the repo
- `uploads/`, `sync/`, `preview/` at root — all deleted or moved in Phase 1; confirmed absent

### Font delivery (open question)

`showcase/styles/typography-utilities.css` has:
```css
src: url('../../brand/fonts/Figtree-VariableFont_wght.ttf') format('truetype');
```
From `showcase/dist/`, this path resolves two levels up — outside the build output — and will **404 on Vercel**. This breaks `@font-face`. Fix as part of Option A above (copy fonts into `showcase/public/fonts/` and update the path to `../fonts/`). Until then, the manual falls back to the system font stack.

### Make repo private

**Prerequisite:** Vercel is live and confirmed working. Do not go private before that — once private, GitHub Pages stops serving the public showcase immediately.

**Pre-flight checks (do before changing visibility):**

1. **Vercel GitHub App access** — In Vercel dashboard → Settings → Git → confirm the GitHub App is set to "All repositories" (not "Selected repositories"). If it's set to selected, add `metanoia-designsys` explicitly. Private repos require the Vercel app to have explicit access or it loses the webhook connection.
2. **GitHub Actions** — Workflows continue to work on private repos. Note: on GitHub Free, private repo Actions use paid minutes (public repos are free). Check your plan before going private if the nightly sync runs frequently.
3. **Collaborators** — Anyone who had public read access loses it. Go to **Settings → Collaborators** and invite anyone who needs continued access.
4. **External links** — Any raw.githubusercontent.com URLs pointing into this repo will 404 after going private. Search docs and READMEs for `raw.githubusercontent.com/foundingadmin/metanoia-designsys`.

**Steps:**

1. GitHub repo → **Settings** → scroll to **Danger Zone** → **Change repository visibility** → Private
2. Type the repo name to confirm → **I understand, change repository visibility**
3. Immediately verify Vercel still deploys: go to Vercel dashboard → check that the project still shows the connected repo and the last deploy is recent. If the webhook broke, disconnect and reconnect the Git integration in Vercel → Settings → Git.
4. Verify GitHub Actions still run: push a trivial commit (e.g. add a blank line to RUNDOC_v3.md) and confirm the `sync-on-merge` workflow triggers in Actions tab.
5. GitHub Pages will stop serving publicly — this is expected and fine if Vercel is live.
6. Update CLAUDE.md: note the repo is private; remove the GitHub Pages URL reference.

### Backlog checklist

- [x] Add root `.gitignore` (`.DS_Store`, `*.log`, `.env`)
- [x] Migrate legacy showcase to `showcase/public/legacy/` (Option A) — served at `/legacy/`
- [x] `@font-face` path fixed — fonts copied to `showcase/public/fonts/`, flat CSS in `showcase/public/colors_and_type.css`
- [x] Sunset GitHub Pages — repo is private, Pages inactive
- [x] Make repo private
- [x] Update `CLAUDE.md` repo structure table to include `vercel.json`
- [x] Update `CLAUDE.md` GitHub Pages section to reference Vercel
- [x] Resolve "Astro site deployment" TBD in table below

---

## Phase 7 — Sync Engine Rebase ✅ (v3.3.0)

### What shipped

**`sweden/engine/token-json-utils.js`** (new shared utility)
- `loadAllSourceTokens(sourceDir)` — reads all 5 `*.tokens.json` files; attaches non-enumerable `_rawContent`, `_valueChanges`, `_darkChanges` metadata to each parsed data object
- `resolveTokenAlias(key, allTokens, depth)` — recursive `{alias}` resolution, warns to console at depth > 3
- `tokenValueToCss(type, resolvedValue)` — converts resolved raw value to its CSS string representation
- `resolveAllToCssMap(sourceDir)` — convenience: all tokens resolved to `{ '--var': 'css-value' }` flat map
- `cssVarToTokenKey(cssVar)` / `tokenKeyToCssVar(key)` — CSS var ↔ token key name helpers
- `serializeTokenFile(data)` — targeted in-place string replacement on `_rawContent`; preserves column alignment, blank lines, and all formatting exactly; zero diff on round-trip for unchanged tokens
- Exports: `SOURCE_FILES` constant for other consumers

**`sweden/engine/sync-figma-to-repo.js`** (major refactor)
- Rewired from CSS regex-patch to W3C JSON diff/write
- `BRANCH_PREFIX` → `'sync/figma-to-json'`; commit message references JSON not CSS
- `diffAndPatchJson(figmaVars, tokenMap, jsonData, figmaModes)` — new signature with multi-mode support
- Builds `lightModeId` / `darkModeId` from `figmaModes` (case-insensitive mode name matching)
- Light mode diffs against `$value`; dark mode diffs against `$extensions.com.metanoia.modes.dark`
- Skips alias tokens in both light and dark positions — `{alias}` chains are never overwritten
- Tracks changes via `_valueChanges` / `_darkChanges` Maps; writes with `serializeTokenFile`
- `run(figmaVars, tokenMap, figmaModes?)` — third arg optional; omit for single-mode behavior
- Diff display groups light + dark changes by token key with `(Light)` / `(Dark)` labels
- Post-write: runs `run-adapters.js` (BRAND.md remains authoritative) + `buildPublicCss()`
- git staging: `brand/tokens/source/ brand/tokens/output/`

**`sweden/engine/sync-repo-to-figma.js`** (refactored)
- Removed all CSS parsing; now imports `resolveAllToCssMap` from `token-json-utils.js`
- `diffAndBuildUpdates(figmaVars, tokenMap, resolvedMap)` takes pre-built resolved map directly

**`sweden/adapters/web-flat-json/index.js`** (refactored + dark mode)
- Now reads source JSON via `loadAllSourceTokens`; removed all CSS reading
- Outputs `--token--dark` keys for any token with `$extensions.com.metanoia.modes.dark`
- Token count: 165 → 203 (38 dark-mode entries added)

**`sweden/adapters/email-inline/index.js`** (refactored)
- Now reads source JSON via `resolveAllToCssMap`; removed all CSS reading

**`sweden/engine/build-tokens.js`**
- `buildPublicCss()` TOKEN_FILES: `brand/tokens/*.css` → `brand/tokens/output/web/*.css`

**`sweden/engine/VISUAL-TO-CODE.md`** (full rewrite)
- Step 1 Figma plugin JS now reads all modes from all collections; builds `figmaModes` shape
- Documents exact `figmaVars` and `figmaModes` data shapes with annotated examples
- Step 2 shows correct `run(figmaVars, TOKEN_MAP, figmaModes)` three-argument call
- Step 4 git commands updated to `brand/tokens/source/ brand/tokens/output/`

**`sweden/engine/SYNC-MASTER.md`** + **`CLAUDE.md`** (updated)
- Source of truth section: `brand/tokens/source/*.tokens.json` is canonical; `brand/tokens/*.css` inert
- Token vs component sync distinction documented
- Multi-mode sync calling pattern documented

### Verification

```bash
# Token resolution (expect ~165 base tokens)
node -e "const u = require('./sweden/engine/token-json-utils.js'); const m = u.resolveAllToCssMap('./brand/tokens/source'); console.log(Object.keys(m).length + ' tokens resolved');"

# web-flat-json now includes dark mode keys (expect 203 tokens)
node -e "const a = require('./sweden/adapters/web-flat-json/index.js'); const r = a.run('./brand/tokens/source', '/tmp/wf'); console.log(r.tokenCount + ' tokens');"

# No var() in email adapter output
node -e "require('./sweden/adapters/email-inline/index.js').run('./brand/tokens/source', '/tmp/ei');" && grep 'var(' /tmp/ei/inline.css | wc -l  # → 0

# All adapters succeed
node sweden/engine/run-adapters.js  # → 5/5 succeeded

# Public barrel regenerates from output/web/
node sweden/engine/build-tokens.js  # → ✓ Wrote showcase/public/colors_and_type.css
```

---

## Phase 4 — HTML-to-Astro Translator ⬜ (next sprint)

Build `sweden/translators/html-to-astro/index.js`:

```
Input:  showcase/preview/*.html  (component preview cards)
Output: .astro component files

Rules:
- Preserve all var(--token-name) references — no hardcoded values
- Extract <style> block into scoped Astro <style>
- Extract <script> into Astro <script>
- Convert data- attributes to Astro props where idiomatic
```

```js
// Prompt (for next session):
// Build sweden/translators/html-to-astro/index.js
// Input: path to an HTML file
// Output: .astro file with frontmatter, template, scoped styles, scripts
// Test against showcase/preview/colors-primitives.html
// Verify output is valid Astro + still uses CSS custom properties only
```

---

## Phase 6 — Governance Tooling ⬜ (queued)

### Scope

**`sweden/engine/audit.js`** — token audit CLI
- `node sweden/engine/audit.js --css` — check all CSS files for hardcoded values (hex, px font-size)
- `node sweden/engine/audit.js --figma` — compare Figma variable values against token source JSON
- Output: table of mismatches with severity (warning / error)

**`sweden/engine/generate-map.js`** — token-map generator
- Reads CSS custom property names from `brand/tokens/output/web/*.css`
- Reads Figma variable paths from `brand/BRAND.md` (Variable Collection IDs section)
- Produces confidence-scored CSS var ↔ Figma variable path pairs
- Low-confidence pairs flagged for manual review in `brand/token-map.js`
- Output format:
  ```js
  { css: '--color-navy',  figma: 'Primitives/Navy/Default', confidence: 0.97 },
  { css: '--bg-canvas',   figma: 'Semantic/Background/Canvas', confidence: 0.91 },
  ```

**`create-sweden-ds` CLI spec** — documented in `sweden/INSTALL.md` Tier 1
- Prompts: brand name, font family, Figma file key
- Clones `sweden/` engine, creates `brand/` scaffold, runs audit
- Status: spec-level — not yet published as npm package

### Prompt for next session

```
Build sweden/engine/audit.js:

Checks:
1. --css: scan all brand/tokens/output/web/*.css for hardcoded hex values
   (#RRGGBB, rgb(), rgba() not inside a var() call) and hardcoded px font-size
   values (font-size: Npx without var()). Report file, line, and value.
2. --figma: load brand/tokens/source/*.tokens.json, compare $value for each
   token against the corresponding Figma variable (via brand/token-map.js).
   Report mismatches with token name, source value, and Figma value.

Output: human-readable table (default) or --json flag.
Exit 0 on clean, 1 on any error.
```

```
Build sweden/engine/generate-map.js:

Input: brand/tokens/output/web/*.css (CSS var names)
       brand/BRAND.md (Variable Collection IDs section, Figma path patterns)

Process:
1. Extract all --custom-property names from CSS files
2. For each name, infer likely Figma path using semantic matching:
   --color-navy → Primitives/Navy/Default
   --bg-canvas  → Semantic/Background/Canvas
   --fs-16      → Typography/Font Size/16
3. Score confidence based on exact-match vs heuristic-match
4. Output token-map.js format, sorted by confidence descending
5. Flag entries with confidence < 0.80 with a // LOW CONFIDENCE comment

Verify against existing brand/token-map.js — all existing entries should
appear with confidence > 0.90.
```

---

## Second Brand Test (Phase 6 extension)

After governance tooling ships, test Sweden on a second brand repo.

**Test plan:**
1. Clone `sweden/` engine into a new repo (or branch)
2. Create a fresh `brand/` directory with a different color palette
3. Run the Tier 2 Claude Code prompt from `sweden/INSTALL.md`
4. Verify:
   - Figma bootstraps correctly (no init-figma.js errors)
   - `node sweden/engine/build-tokens.js` produces valid CSS
   - `node sweden/engine/run-adapters.js` writes all adapter outputs
   - `showcase/` builds without errors
5. Document friction: any missing scaffolding, unclear error messages, or brittle path assumptions

---

## Decisions Log

| Date | Decision | Rationale |
|---|---|---|
| 2026-05-22 | CDN URL strategy: DS deploys to Vercel; all consuming repos link to the Vercel project URL permanently. Custom subdomain (e.g. ds.metanoia.com) is a future alias for human users — no repo changes required when added. GitHub Pages sunset after Vercel confirmed live. | Vercel provides preview URLs per PR, production URL per branch, and zero-config SSL. GitHub Pages is a fallback-only while Vercel is being connected. |
| 2026-05-22 | Use `$extensions.com.metanoia.modes` for dark mode | W3C tokens has no official multi-mode spec; `$extensions` namespace is the community convention |
| 2026-05-22 | gslides adapter imports `toKey` from pptx adapter | Avoids duplication; keys are identical across both formats |
| 2026-05-22 | Astro site lives in `showcase/` not `sweden/docs/` | Keeps brand showcase and user manual co-located; can split later if needed |
| 2026-05-22 | Manual base path `/manual` | Avoids conflict with existing `showcase/index.html` (design system preview) |
| 2026-05-22 | Font quoting: only quote names with spaces or `Figtree` | `SFMono-Regular`, `Menlo`, `Consolas` must not be quoted in CSS |
| 2026-05-22 | `run-adapters.js` reads `## Adapters` table from BRAND.md | BRAND.md is the single source of enabled surface config; avoids separate config file |
| 2026-05-23 | Source JSON as single source of truth — `brand/tokens/*.css` inert after v3.3.0 | CSS files went stale on every Figma sync because sync scripts patched CSS, not JSON. Reversing the direction: all scripts read/write JSON; CSS and other adapter outputs are generated artifacts only. |
| 2026-05-23 | `serializeTokenFile` uses targeted in-place string replacement, not JSON.stringify | Source files have per-group column alignment that JSON.parse loses. Storing `_rawContent` as a non-enumerable property on the parsed data object allows line-by-line regex replacement that preserves exact formatting. Round-trip produces zero diff. |
| 2026-05-23 | `web-flat-json` outputs `--token--dark` keys for dark mode variants | Flat JSON consumers (non-browser tools) need dark mode values accessible without CSS media queries. `--dark` suffix is the convention; only tokens with explicit `$extensions.com.metanoia.modes.dark` entries get the extra key. |
| 2026-05-23 | `figmaModes` is an optional third argument to `run()` | Omitting it gives single-mode behavior (backward-compatible). Passing it enables full light+dark sync. Mode name matching is case-insensitive; any mode containing "light"/"default" maps to `$value`, "dark" maps to `$extensions.com.metanoia.modes.dark`. |

---

## TBDs

| Item | Status |
|---|---|
| `sweden-starter.fig` Figma starter template | Planned — not yet built |
| `create-sweden-ds` npx CLI | Spec in INSTALL.md — not yet published |
| Embassy GUI (Tier 3 onboarding) | Roadmap — requires hosting layer |
| User Manual: template detail pages | Phase 5 continuation — next sprint |
| Astro site live on Vercel | ✅ Live — `metanoia-designsys.vercel.app` (CNAME: `metanoia.foundingcreative.com`) |
| Legacy showcase migration to `showcase/public/` | ✅ Done — served at `/legacy/` on Vercel |
| `@font-face` path fix in `typography-utilities.css` | ✅ Done — fonts in `showcase/public/fonts/`, flat CSS barrel at `/colors_and_type.css` |
| Root `.gitignore` | ✅ Done — `.DS_Store`, `*.log`, `.env`, `node_modules/`, `showcase/dist/` |
| GitHub Pages sunset | ✅ Done — repo is private, Pages inactive |
| Make repo private | ✅ Done — repo is private |
| `CLAUDE.md` update: Vercel + `vercel.json` in structure table | ✅ Done |
| HTML-to-Astro translator | ✅ Phase 4 — built this sprint |
| Phase 6 governance tooling | ✅ audit.js + generate-map.js — built this sprint |
| Sync engine rebase (v3.3.0) | ✅ Done — source JSON is single source of truth; `brand/tokens/*.css` inert; all adapters + sync scripts read from JSON; PR #56 merged |
| `token-json-utils.js` shared utility | ✅ Done — alias resolution, CSS map, serializer, CSS var helpers all centralized |
| VISUAL-TO-CODE.md figmaModes documentation | ✅ Done — Figma plugin JS, data shapes, and `run()` calling pattern documented |
| Second brand test | Future backlog — do not build yet |
| CDN URL strategy | ✅ Resolved — see Decisions Log 2026-05-22 |

---

## Living Doc Rules

1. Mark phases ✅ when complete — update status table above
2. Record all new Figma node IDs in `brand/BRAND.md`
3. `sweden/engine/RUNDOC_v2.md` is archived — do not modify
4. Version bump guide: update RUNDOC header + CLAUDE.md "Current version" line
5. After every session that ships anything: update status table, resolve TBDs, add decisions
