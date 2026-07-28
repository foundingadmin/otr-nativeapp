# Sweden — Installation Guide

Sweden is a bi-directional design system sync engine. It connects a Figma DS file to a code repository — token changes flow in either direction automatically.

This document is for operators installing Sweden in a brand repo. It covers what every brand must provide, how to run the install, and how to verify the first sync.

**Architecture overview:** `sweden/engine/SYNC-MASTER.md`

---

## A. The Brand Contract

Every Sweden deployment requires a `brand/` directory at the repo root. This is the only layer that differs between brand deployments. The `sweden/` engine is identical across all brands.

### Required directory structure

```
brand/
├── BRAND.md           ← instance config (required)
├── token-map.js       ← CSS ↔ Figma variable mapping (required)
├── component-map.js   ← component sync + Code Connect registry (required)
├── tokens/            ← token CSS files (required)
│   ├── color-primitives.css
│   ├── color-semantic.css
│   ├── typography.css
│   ├── spacing.css
│   └── motion.css
├── fonts/             ← brand font files
└── assets/            ← logos, identity PDFs, type specimens
```

### Required BRAND.md sections

Every `brand/BRAND.md` must contain these sections with real values (not placeholders):

| Section | What it contains |
|---|---|
| **Identity** | Brand name (display and wordmark forms), Figma file key |
| **Font** | Font family name, `figma.loadFontAsync` calls for all weights used |
| **Visual Tool Collections** | Names of all Figma variable collections (Primitives, Semantic, Typography, Spacing, Motion, and any brand-specific collections like Button) |
| **Visual Tool Page Names** | Page name patterns for the `ds` page and any `components` page |
| **Text Style Reference** | All text style names and their SHA import keys (`figma.importStyleByKeyAsync`) |
| **Line Height Reference** | Explicit PERCENT values per text style (not variable-bound — see Line Height Gotcha in `sweden/engine/FIGMA-PLUGIN.md`) |
| **Component Node ID Reference** | Node IDs for atoms used as slots in larger components (buttons, icons, tags) |
| **Component Set Registry** | One row per component set: figmaName, componentSetNodeId, cssClass, previewFile |
| **Semantic Variable Reference** | SHA import keys for all semantic variables used by components |
| **Variable Collection IDs** | Runtime IDs for `setExplicitVariableModeForCollection` (confirmed at runtime, not guessed) |
| **Design Rules** | Brand-specific constraints (wordmark casing, icon style, spacing grid, motion tiers) |
| **Copy and Voice** | Writing rules that apply to all brand copy in the DS |

### Five required token files

Token files go in `brand/tokens/`. Each file has a specific responsibility:

| File | Contains | Rule |
|---|---|---|
| `color-primitives.css` | Raw hex values only | Never use `var()` references here — primitives are the reference layer |
| `color-semantic.css` | Role aliases via `var()` | References primitives only; includes `:root` (light) and `[data-theme="dark"]` blocks |
| `typography.css` | Font family, size scale, weight, line-height, letter-spacing | Use unitless values for line-height; `rem` or `px` for sizes |
| `spacing.css` | Space scale, radii, shadow definitions, layout container widths | 4px base grid |
| `motion.css` | Easing curves (`cubic-bezier()`), duration tiers | No bounces or spring overshoots |

The primitive/semantic split is non-negotiable. It enables dark mode via CSS-only overrides without touching component code.

### Adapter configuration

Enable output adapters in `brand/BRAND.md` by adding an `adapters` block:

```yaml
adapters:
  enabled:
    - web-css       # always on — CSS custom properties
    - pptx-json     # python-pptx token values
    - gslides-json  # Google Slides API values
    - email-inline  # pre-flattened inline email CSS
```

Only enabled adapters run on each sync. Unused adapters consume no computation. The `web-css` adapter is the default and is always active.

AI auto-detects likely adapters during intake based on submitted brand files ("you submitted a PowerPoint file — enabling pptx-json adapter").

Available adapters: see `sweden/adapters/` for the current list. Each adapter directory contains a README describing its output format and enable/disable syntax.

### sweden-starter.fig

`sweden-starter.fig` is a neutral Figma template included with the Sweden engine. It contains:

- Five empty variable collections with correct naming: Primitives, Semantic, Typography, Spacing, Motion
- Instructional annotations for each collection
- A `DS` page (foundations + components)
- A `DS Status` page with a RunDoc frame (updated by `init-figma.js`)
- No brand values

**When to use it:**

| Entry point | Figma approach |
|---|---|
| Net new brand, no DS | `sweden-starter.fig` is the starting point; `init-figma.js` populates it |
| Existing brand, no DS | Operator creates new canonical file from `sweden-starter.fig` |
| Existing Figma DS | Their existing file is used; starter not needed |
| Engineering-led | Starter used if no Figma file exists yet |

**Status:** Planned — not yet published. A future release will include `sweden-starter.fig` in this directory.

---

## B. Installation Paths

Three ways to install Sweden, depending on the operator's technical comfort level.

### Tier 1 — Guided CLI

For technical users. One terminal command installs Sweden and runs the first sync.

```shell
npx create-sweden-ds my-brand-ds
```

The CLI:
1. Prompts for: brand name, Figma file key (or "create new" to scaffold from `sweden-starter.fig`), Claude API key, Figma personal access token
2. Scaffolds the repo: clones the Sweden engine into `sweden/`, creates `brand/` with a `BRAND.md` template
3. Runs `sweden audit-figma` and `sweden audit-css` to extract existing variables
4. Runs `sweden generate-map` to produce an initial `brand/token-map.js` (AI-assisted, flags low-confidence matches)
5. Runs `node sweden/engine/init-figma.js` to bootstrap the Figma variable collections
6. Runs `node sweden/engine/sync-repo-to-figma.js` for the first sync
7. Opens the showcase in a browser to confirm everything resolved

**Status:** Specified — CLI not yet implemented. Operators currently use Tier 2.

---

### Tier 2 — Claude Code Onboarding Prompt

For semi-technical users comfortable with Claude Code but not necessarily with Node or Git. Paste this prompt verbatim into a Claude Code session in the brand's repo.

---

**Paste the following into Claude Code:**

```
You are helping me install Sweden, a bi-directional design system sync engine, into this repository.

Sweden has two layers:
  sweden/    — the engine (never changes per brand)
  brand/     — brand config + token files (unique per deployment)

Here is what I need you to do, step by step. Do not proceed to the next step until the current one is confirmed.

STEP 1 — Read the engine
Read these files before doing anything else:
  sweden/engine/SYNC-MASTER.md
  sweden/engine/CONTRIBUTING.md
  sweden/INSTALL.md

Tell me: do you understand the engine/instance split (sweden/ vs brand/)?

STEP 2 — Gather brand inputs
Ask me the following questions one at a time:
  a. What is the brand name? (This will be used for the wordmark — give me the exact casing you want.)
  b. Do you have an existing Figma DS file? If yes, what is the file key? (It's in the URL: figma.com/design/[FILE-KEY]/...)
  c. What is the primary font family? (e.g. "Inter", "Figtree", "Helvetica Now")
  d. What hex values should I use for the primary brand colors? Give me at minimum: a primary dark color, a primary accent color, and white.
  e. Which output adapters do you need? Options: web-css (always on), pptx-json, gslides-json, email-inline. Describe what you'll be building.

STEP 3 — Create brand/BRAND.md
Using my answers, create brand/BRAND.md. Copy the section structure from an existing Sweden deployment (if one exists in this repo) or generate it from sweden/INSTALL.md Section A.

Tell me what you created.

STEP 4 — Create token files
Create these five files in brand/tokens/ using the brand colors and font I provided:
  color-primitives.css   — raw hex values only (no var() references)
  color-semantic.css     — role aliases via var(), with :root and [data-theme="dark"] blocks
  typography.css         — font family, size scale (12px → 120px), weights, line-heights, letter-spacing
  spacing.css            — 4px base scale (0–128px), radii, shadow definitions, layout widths
  motion.css             — easing curves and duration tiers (120ms, 200ms, 320ms)

For any values I didn't specify, use sensible defaults following the patterns in sweden/engine/FIGMA-PLUGIN.md.

STEP 5 — Create brand/token-map.js
Read the token-map.js from an existing Sweden deployment (if present) as a reference.
Create brand/token-map.js mapping each CSS custom property to its Figma variable path and type.

STEP 6 — Confirm the barrel file
Check that colors_and_type.css at the repo root correctly @imports all five token files from brand/tokens/ and all utility CSS from showcase/styles/. If it doesn't exist or is wrong, fix it.

STEP 7 — First sync verification
Run: node sweden/engine/sync-repo-to-figma.js

Tell me the output. If there are errors, diagnose and fix them. Common issues:
  CSS_MISSING: a token is in the map but not in the CSS — add it to the correct token file
  FIGMA_MISSING: a token is in the map but not in Figma — run init-figma.js first
  NOT_A_COLOR: a CSS value isn't a parseable color — check for var() alias chains in the primitives file

STEP 8 — Commit
Commit all new files with message: "feat: Sweden v1 brand install — [brand name]"

Tell me when each step is done before moving to the next.
```

---

### Tier 3 — Embassy GUI

A lightweight web interface where brand operators paste their API keys, connect their Figma account via OAuth, and Sweden runs entirely in the background. No Git, no terminal, no repo management visible to the user.

This is the right activation path for non-technical brand teams (especially Entry E — AI creative teams generating assets at volume). It unlocks Sweden for users who will never open a terminal.

**Status:** Future roadmap. Requires a hosting layer Sweden does not yet have. Near-term workaround for non-technical users: Tier 2 with a simplified onboarding prompt.

---

## C. Token Naming Audit

For brands with existing token systems that don't match Sweden's naming conventions (Entry C: existing Figma DS, Entry D: engineering-led). Sweden does not require you to rename your tokens — it requires a mapping.

### Running the audit

```shell
sweden audit-figma    # reads all Figma variables → outputs figma-variables.json
sweden audit-css      # scans all CSS files in the repo → outputs css-variables.json
sweden generate-map   # AI reads both outputs and produces brand/token-map.js
                      # flags low-confidence matches for human review
```

**Status:** These CLI commands are specified but not yet implemented. The scripts `sweden/engine/audit.js` and `sweden/engine/generate-map.js` are on the v3 roadmap. Until then, create `brand/token-map.js` manually by following an existing Sweden deployment as a reference.

### What the output looks like

`generate-map` produces a `brand/token-map.js` with entries like:

```js
// HIGH CONFIDENCE — exact hex match
{ css: '--primary-blue',   figma: 'Brand/Primary',   type: 'COLOR' },

// MEDIUM CONFIDENCE — value match, naming pattern mismatch
// REVIEW: --spacing-4 vs Spacing/Base — same value (16px), different names
{ css: '--spacing-4',      figma: 'Spacing/Base',     type: 'FLOAT' },

// LOW CONFIDENCE — name similarity only, values differ
// REVIEW: --grey-300 vs Neutral/Muted — hex values are different; verify intent
{ css: '--grey-300',       figma: 'Neutral/Muted',    type: 'COLOR' },
```

### Handling flagged items

For each `REVIEW` comment:
1. Open the Figma file and look at the variable's actual use in components
2. Open your CSS and look at where the custom property is used
3. If they represent the same semantic role, confirm the mapping and remove the `REVIEW` comment
4. If they're genuinely different tokens, either split them into two map entries or remove one

The map is permanent. It never regenerates unless you rename tokens. When a rename happens, CI flags the orphan and the unmatched new variable — update the map entry manually.

---

## D. First Sync Verification

### Running the first sync

```shell
node sweden/engine/sync-repo-to-figma.js
```

The script:
1. Reads all five token files from `brand/tokens/`
2. Resolves `var()` alias chains
3. Fetches current variable values from the Figma file via the Figma MCP
4. Diffs code values against Figma values
5. Prints the diff and asks for confirmation before writing

### What a successful sync looks like

On a fresh install where `init-figma.js` has already bootstrapped the Figma collections:

```
Sweden — CSS → Figma sync

  Comparing 142 tokens...

  0 changes detected.
  Figma variables match CSS token values.

  ✓ Sync complete — no updates needed.
```

On a brand where the CSS has been updated since the last sync:

```
Sweden — CSS → Figma sync

  Comparing 142 tokens...

  3 changes detected:

  [COLOR] --color-navy-700
    CSS:   #094B77
    Figma: #083F65
    → will update Figma

  [COLOR] --color-aqua-300
    CSS:   #8CE4F3
    Figma: (missing — will create)

  [FLOAT] --space-6
    CSS:   24px
    Figma: 24 ✓ (matches)

  Proceed? (y/n)
```

Type `y` to apply. The script generates Figma plugin JS and provides instructions to run it via the Figma MCP.

### Common failure modes

| Error | Cause | Fix |
|---|---|---|
| `CSS_MISSING` | Token listed in `brand/token-map.js` but not found in any CSS file | Add the token to the correct `brand/tokens/*.css` file, or remove it from the map |
| `FIGMA_MISSING` | Token in map and CSS but the Figma variable collection doesn't exist yet | Run `node sweden/engine/init-figma.js` first to bootstrap the collections |
| `NOT_A_COLOR` | CSS value for a COLOR-type token isn't a parseable hex/rgb/hsl | The value is probably a `var()` reference — check that the alias resolves to a raw hex in `color-primitives.css` |
| `require()` error on startup | Path to `brand/token-map.js` is wrong | Verify `brand/token-map.js` exists and the require path in `sweden/engine/init-figma.js` points to `../../brand/token-map.js` |
| No Figma API response | Figma MCP not connected or file key is wrong | Confirm the Figma MCP server is running and the file key in `brand/BRAND.md` is correct |

### Confirming the Figma side

After a successful sync, open the Figma file and check:

1. Open the Variables panel — all five collections should be present (Primitives, Semantic, Typography, Spacing, Motion)
2. In Primitives, spot-check three color values against `brand/tokens/output/web/color-primitives.css`
3. In Semantic, switch between Light and Dark modes — `Background/Canvas` should flip between white and near-black
4. In Typography, confirm `Font Size/16 Body` = 16 (FLOAT) and `Font Weight/600 Semibold` = 600 (FLOAT)

If variables are missing: run `node sweden/engine/init-figma.js` and follow the three-script output to bootstrap the collections via the Figma plugin runner.

---

## E. GitHub Secrets

The Sweden workflows require two repository secrets. Set them in **Settings → Secrets and variables → Actions → New repository secret**.

### Required secrets

| Secret | Used by | Description |
|---|---|---|
| `FIGMA_API_TOKEN` | `sync-nightly.yml`, `sync-on-merge.yml` | Personal access token from a Figma service account (not your personal login). File content scope only. |
| `CLAUDE_API_KEY` | Reserved for component sync (not yet active) | Anthropic API key for AI-assisted component description generation. Not required for token-only deployments. |

### How to create a Figma personal access token

**Use a service account, not your personal Figma login.** Attaching the token to a personal account creates a hard dependency on that individual — if they leave, lose access, or rotate their credentials, CI breaks. A service account scopes the blast radius to one identity with no billing or personal data attached.

**Step 1 — Create the service account**

Create a Figma account using an alias you control (e.g. `sweden-bot@yourdomain.com` via a Google Group). Invite it to the brand Figma file as a **Viewer** — the nightly sync only reads from Figma; it does not need UI editor access. The `sync-repo-to-figma.js` script writes via the Figma Plugin API, which runs under the operator's own session, not the CI token.

**Step 2 — Generate the token**

From the service account:
1. Open **Account Settings** (bottom-left avatar menu)
2. Scroll to **Personal access tokens** → **Generate new token**
3. Label it `sweden-ci-prod`
4. Set expiry to **1 year** (Figma's maximum). Put a calendar reminder two weeks before expiry.
5. Scopes: enable **File content** only. Do not enable Write, Comments, or Webhooks unless a specific script requires them.
6. Copy the token immediately (only shown once)
7. Paste it as the `FIGMA_API_TOKEN` secret in GitHub

A leaked read-only, file-scoped token on a service account is low-stakes: an attacker can read Figma variable values. They cannot modify the file, access billing, or reach other files.

**Step 3 — Local development**

For local runs of `sync-figma-to-repo.js` and `sync-repo-to-figma.js`, store the token in a `.env` file at the repo root:

```
FIGMA_API_TOKEN=figd_xxxx...
```

Confirm `.env` is in `.gitignore` before adding the token. The engine scripts read `process.env.FIGMA_API_TOKEN` — the GitHub Actions runner injects the secret automatically; local runs pick it up from `.env`.

### Workflow inventory

| File | Trigger | What it does |
|---|---|---|
| `.github/workflows/sync-nightly.yml` | Schedule: 2:00 AM UTC | Dry-run Figma → repo sync; opens a draft PR if diffs are found |
| `.github/workflows/sync-on-merge.yml` | Push to `main` touching `brand/**` or `sweden/engine/**` | Re-runs all enabled adapters; commits updated output with `[skip ci]` |
| `.github/workflows/token-lint.yml` | PR touching `brand/tokens/source/**` or `brand/token-map.js` | Runs `lint-tokens.js`; posts failure summary as PR comment |

### Minimum secret configuration

- **Token-only deployments** (no component sync): only `FIGMA_API_TOKEN` is required.
- **Full deployments**: both secrets required once component sync ships.

The `GITHUB_TOKEN` secret is automatically provided by Actions — no manual setup needed.
