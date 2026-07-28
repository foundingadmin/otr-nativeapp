# CLAUDE.md — Metanoia Design System

## Repo structure

```
/
├── vercel.json                  ← Vercel deploy config (build: showcase/, output: showcase/dist/)
├── colors_and_type.css          ← Barrel file: @imports brand/tokens/output/web/* + showcase/styles/*
├── ROADMAP.md                   ← Repo-wide feature roadmap (all scopes)
├── RUNDOC_[slug].md             ← Active sprint plan (one per in-progress feature, at root)
├── .gitignore                   ← Root gitignore
├── sweden/                      ← Sweden sync engine (no brand values)
│   ├── engine/                  ← JS scripts + engine docs
│   │   ├── sync-figma-to-repo.js   ← Visual → Code diff + PR
│   │   ├── sync-repo-to-figma.js   ← Code → Visual diff + apply
│   │   ├── init-figma.js           ← One-time visual tool variable bootstrap
│   │   ├── build-tokens.js         ← W3C JSON → CSS adapter (web-css)
│   │   ├── audit.js                ← Token audit CLI (--css / --figma / --json)
│   │   ├── generate-map.js         ← CSS var ↔ Figma path matcher
│   │   ├── SYNC-MASTER.md          ← Sweden architecture overview + routing table
│   │   ├── FIGMA-PLUGIN.md         ← Figma Plugin API reference: patterns, gotchas, build reference
│   │   ├── CONTRIBUTING.md         ← Engine contribution rules, anti-patterns, installability
│   │   └── archive/
│   │       └── rundocs/            ← Archived engine RUNDOCs
│   │           ├── RUNDOC_v2.md    ← Archived sprint (Phases 0–5, complete)
│   │           └── RUNDOC_v3.md    ← Archived sprint (Phases 1–7, complete)
│   ├── adapters/                ← Token output adapters (scaffold only, v3.0.0)
│   │   ├── web-css/             ← CSS custom properties (default, always on)
│   │   ├── web-flat-json/       ← Flat key:value JSON
│   │   ├── email-inline/        ← Pre-flattened inline email CSS
│   │   ├── pptx-json/           ← python-pptx values
│   │   └── gslides-json/        ← Google Slides API values
│   ├── translators/             ← Component format translators (v3.1.0)
│   │   ├── html-to-astro/       ← HTML → Astro components (index.js implemented)
│   │   ├── html-to-react/       ← HTML → React components (scaffold only)
│   │   └── archive/
│   │       └── rundocs/         ← Archived translator RUNDOCs
│   └── INSTALL.md               ← Brand contract + onboarding guide
├── brand/                       ← Brand-specific config + assets (replace per deployment)
│   ├── BRAND.md                 ← Instance config: all brand-specific values
│   ├── token-map.js             ← CSS ↔ visual tool variable mapping (by collection)
│   ├── component-map.js         ← Component sync + Code Connect registry
│   ├── tokens/                  ← Token files
│   │   ├── source/              ← W3C Design Tokens JSON (canonical source)
│   │   │   ├── color-primitives.tokens.json
│   │   │   ├── color-semantic.tokens.json
│   │   │   ├── typography.tokens.json
│   │   │   ├── spacing.tokens.json
│   │   │   └── motion.tokens.json
│   │   ├── output/web/          ← Generated CSS (never hand-edit — run build-tokens.js)
│   │   │   ├── color-primitives.css
│   │   │   ├── color-semantic.css
│   │   │   ├── typography.css
│   │   │   ├── spacing.css
│   │   │   └── motion.css
│   │   ├── color-primitives.css ← Authoritative CSS (source until W3C JSON fully adopted)
│   │   ├── color-semantic.css
│   │   ├── typography.css
│   │   ├── spacing.css
│   │   └── motion.css
│   ├── fonts/                   ← Figtree variable + italic TTFs
│   ├── assets/                  ← Logos (SVG), identity guide PDF, type guide JPG
│   └── archive/
│       └── rundocs/             ← Archived brand RUNDOCs
├── showcase/                    ← Astro user manual (deployed to Vercel)
│   ├── astro.config.mjs         ← Astro config (output: static)
│   ├── src/
│   │   ├── layouts/Base.astro   ← Shell layout with sidebar nav
│   │   ├── components/Sidebar.astro
│   │   ├── pages/               ← All manual pages (foundations/, components/)
│   │   └── styles/tokens.css    ← @imports brand token CSS for Astro pipeline
│   ├── public/                  ← Verbatim-copied to dist root (not processed by Astro)
│   │   ├── colors_and_type.css  ← Flattened barrel (all tokens + utilities inlined)
│   │   ├── fonts/               ← Figtree TTFs (served from /fonts/)
│   │   ├── styles/              ← Legacy utility CSS (served at /styles/)
│   │   └── lab/                 ← Playground pages (link ../colors_and_type.css — relative path only)
│   ├── archive/
│   │   └── rundocs/             ← Archived showcase RUNDOCs
│   └── styles/                  ← Source utility CSS — not sync-eligible
│       ├── typography-utilities.css ← @font-face + .t-* classes (not synced with Figma)
│       ├── icon-utilities.css       ← .ds-icon component class (Lucide, 2px stroke)
│       ├── layout-utilities.css     ← .container + .section shells
│       └── components.css           ← .btn CSS component classes
├── README.md                    ← Brand guidelines, voice, visual foundations
└── SKILL.md                     ← Claude Code skill manifest
```

### Token file responsibilities

**Single source of truth: `brand/tokens/source/*.tokens.json`**
This is the only place tokens are ever hand-edited. All CSS and other format outputs
are generated artifacts — never patch them directly. Regenerate: `node sweden/engine/run-adapters.js`

| File | What it contains | Edit? |
|---|---|---|
| `brand/tokens/source/color-primitives.tokens.json` | Raw palette hex values. No aliases. | ✅ Hand-edit here |
| `brand/tokens/source/color-semantic.tokens.json` | Role aliases (`{color-white}` syntax) | ✅ Hand-edit here |
| `brand/tokens/source/typography.tokens.json` | Font family, size, weight, line-height, letter-spacing | ✅ Hand-edit here |
| `brand/tokens/source/spacing.tokens.json` | Space scale, radii, shadows, container widths | ✅ Hand-edit here |
| `brand/tokens/source/motion.tokens.json` | Easing curves, duration tiers | ✅ Hand-edit here |
| `brand/tokens/output/web/*.css` | Generated CSS custom properties | ❌ Generated |
| `brand/tokens/output/web-flat/tokens.json` | Resolved flat JSON for web | ❌ Generated |
| `brand/tokens/output/email/inline.css` | Resolved flat CSS for email (no var()) | ❌ Generated |
| `brand/tokens/output/pptx/tokens.json` | Resolved values for python-pptx | ❌ Generated |
| `brand/tokens/output/gslides/tokens.json` | Resolved values for Google Slides API | ❌ Generated |
| `showcase/styles/typography-utilities.css` | `@font-face` + `.t-*` classes | **Not synced** |
| `showcase/styles/icon-utilities.css` | `.ds-icon` component class | **Not synced** |
| `showcase/styles/layout-utilities.css` | `.container` + `.section` shells | **Not synced** |
| `showcase/styles/components.css` | `.btn` CSS component classes | **Not synced** |

## Versioning rules

This system uses **Semantic Versioning**: `MAJOR.MINOR.PATCH`

| Bump | When |
|---|---|
| **MAJOR** | Breaking token renames (require find-and-replace in consuming code), component removal, or changes that break existing usage |
| **MINOR** | New components, new token categories, new variants on existing components, significant visual updates |
| **PATCH** | Copy/typo fixes, minor visual tweaks (spacing ≤4px, color shift ≤5%), doc-only updates, new examples within an existing card |

### How to update the version

1. Update the active RUNDOC at root (header version + date).
2. Update "Current version" line in this file (CLAUDE.md).
3. Commit: `chore: bump to vX.Y.Z — <one-line summary>`

Current version: **v3.8.1**

## Adding a new component to the showcase

New DS components go into the Astro pipeline directly:

1. Create `showcase/src/pages/components/<name>.astro` using existing pages as a template.
2. Add it to the sidebar nav in `showcase/src/components/Sidebar.astro`.
3. Use `var(--token-name)` throughout — never hardcode hex or px font sizes.
4. For complex demo HTML that starts as a standalone file, run the translator first:
   `node sweden/translators/html-to-astro/index.js <input.html> --out showcase/src/components/`
5. Bump version (MINOR if new component, PATCH if new variant on existing).

## Design rules (quick ref)

- **Font:** Figtree variable (300–900). Always `var(--font-sans)` — never hardcode.
- **Colors:** `var(--color-navy)` `var(--color-aqua)` `var(--color-light-aqua)` + token scale.
- **Wordmark:** always lowercase `metanoia`. Never `Metanoia` or `METANOIA` inside a logo context.
- **Icons:** Lucide only, 2px stroke, 16/20/24px, `currentColor`, never filled.
- **Spacing:** 4px grid. Use `var(--space-*)` tokens.
- **No emoji, no exclamation marks, no decorative gradients, no textures.**
- **Motion:** 120–200–320ms tiers, `var(--ease-standard)`. No bounces or spring overshoots.

## Deployment — Vercel

Primary URL: **`https://metanoia-designsys.vercel.app`**
CNAME alias: `metanoia.foundingcreative.com` (will move to a Metanoia company subdomain in the future)

`vercel.json` is at the repo root. Build command: `cd showcase && npm install && npm run build`. Output: `showcase/dist/`.

Lab experiment pages live at `/lab/` via `showcase/public/lab/`. Always use `../colors_and_type.css` (relative path) — never the absolute production URL.

**GitHub Pages:** retired — the repo is private, so Pages is inactive.

# Sweden Sync

Sweden is the bi-directional translation layer between the visual world and the code world.
See `sweden/engine/SYNC-MASTER.md` for the full architecture overview and direction map.

**Brand config (file key, tokens, component IDs, style keys):** `brand/BRAND.md`

## Routing

| What you say | Read this doc |
|---|---|
| "sync visual → code", "sync Figma → repo", "fig2repo" (tokens) | `sweden/engine/SYNC-MASTER.md` |
| "sync code → visual", "sync repo → Figma", "repo2fig" (tokens) | `sweden/engine/SYNC-MASTER.md` |
| "translate Figma component to HTML", "sync component Figma → code" | `sweden/engine/FIGMA-PLUGIN.md` (Component Sync section) |
| "push HTML component to Figma", "sync component code → Figma" | `sweden/engine/FIGMA-PLUGIN.md` (Component Sync section) |
| "build in Figma", "generate component", "push component to Figma" | `sweden/engine/FIGMA-PLUGIN.md` |
| "add a new token" | `sweden/engine/SYNC-MASTER.md` |
| "continue the DS build", "next phase", "run the build plan" | Active RUNDOC at root (`RUNDOC_[slug].md`) |
| "what features are planned", "sync engine backlog", "what's on the roadmap" | `ROADMAP.md` (repo root) |
| "new brand setup", "install Sweden in a new repo" | `sweden/INSTALL.md` |
| "start a sprint for [feature]", "build a rundoc for [feature]" | Read `ROADMAP.md` at root, find feature entry, create `RUNDOC_[slug].md` at root (slug = feature title in kebab-case), create GitHub Issue, cull ROADMAP entry to one paragraph |
| "archive this rundoc", "feature complete", "close this sprint" | Move RUNDOC to scope-matched archive (`sweden/engine/archive/rundocs/` for engine, `showcase/archive/rundocs/` for showcase, `brand/archive/rundocs/` for brand, `sweden/translators/archive/rundocs/` for translator), update ROADMAP entry to Complete + add Shipped version, close GitHub Issue |

After any `use_figma` call → Build Quality Check in `sweden/engine/FIGMA-PLUGIN.md`.
Before editing any `sweden/engine/` doc → read `sweden/engine/CONTRIBUTING.md`.

## Sync rules

**Token sync** — automated, mechanical, driven by sync scripts.
**Component sync** — always AI-mediated, always human-triggered. Never automatic.

- `brand/tokens/source/*.tokens.json` is the **only hand-editable token file**.
- All CSS and other adapter outputs are generated artifacts — never patch directly.
- Sync scripts compare both raw-value and alias tokens. Alias-to-alias changes (e.g. `Background/Canvas` now points to a different primitive) are auto-applied. An `ALIAS_BROKEN` warning is raised when Figma and JSON disagree on whether a token should be an alias or a raw value — resolve those manually.
- To regenerate all adapter outputs after editing source JSON: `node sweden/engine/run-adapters.js`

## Living Doc Rule

**Every session that ships anything must update plan docs before it ends.** The RUNDOC, ROADMAP, and BRAND.md are the only persistent memory between sessions. Stale docs break the next session.

Minimum required at end of each session:
1. Update the active RUNDOC at root — header version + date; update "Current version" in CLAUDE.md
2. Mark any completed phase/sub-phase ✅ in the RUNDOC status table
3. Record all new Figma node IDs, variable keys, and style keys in `brand/BRAND.md`
4. Tick off RUNDOC verification checklist items that are confirmed done
5. Resolve any TBDs that are now known — never leave a TBD that can be looked up

**User manual coverage rule:** Any session that adds a new token category (spacing, color, typography, motion, or any new group) or a new component to the DS must also update the corresponding foundations or components page in `showcase/src/pages/`. If no page exists for the new category, create one and add it to the sidebar nav in `showcase/src/components/Sidebar.astro`. The manual must stay current with the token source — a token that exists in `brand/tokens/source/` but has no coverage in the manual is a doc gap that must be resolved before the session closes.

**ROADMAP is at repo root and covers the entire repo.** It is a history of intent and outcome — one paragraph per feature, no implementation detail. Active RUNDOCs live at root. Archived RUNDOCs live in scope-matched archive directories. Every feature with a RUNDOC has a GitHub Issue.

**ROADMAP entry format** — every entry must follow this layout exactly:

```markdown
### Feature NNN — Title

`scope` · Issue [#N](url) [· extra metadata if needed]

One paragraph. No bullet points, no sub-headings, no implementation detail.
```

Metadata line rules:
- Scope is always a bare inline code tag: `` `engine` ``, `` `showcase` ``, `` `brand` ``, `` `translator` ``
- Issue link is always linked: `Issue [#N](full-github-url)`
- For active sprints add: `· RUNDOC active`
- For complete entries add: `· Shipped vX.Y.Z · [RUNDOC](archive/path)`
- For blocked/dependent features add: `· Depends on Feature NNN`

**At a Glance table** — the summary table at the top of ROADMAP.md must be kept in sync with all entries. Status emoji: 🔄 In Progress · 📅 Scheduled · 💡 Idea · ✅ Complete. Features are ordered numerically within each status group. When changing a feature's status, update both the table row AND move the entry to the correct status section (`🔄 In Progress`, `📅 Scheduled`, `✅ Complete`).

**RUNDOC lifecycle:**
- Active: `RUNDOC_[slug].md` at repo root (slug = feature title in kebab-case, lowercase)
- Archive paths by scope:
  - `engine` → `sweden/engine/archive/rundocs/`
  - `showcase` → `showcase/archive/rundocs/`
  - `brand` → `brand/archive/rundocs/`
  - `translator` → `sweden/translators/archive/rundocs/`

**Starting a new sprint:**
1. Find the feature in `ROADMAP.md`
2. Create `RUNDOC_[slug].md` at repo root with `Scope:` header
3. Create a GitHub Issue: `gh issue create --title "[Feature NNN] — [Title]" --body "[paragraph]" --label "[scope],[type]"`
4. Add the Issue number to the ROADMAP entry and RUNDOC header
5. Cull the ROADMAP entry to one paragraph — move detail into the RUNDOC

**Closing a sprint:**
1. Run final verification
2. Merge the PR
3. Move RUNDOC to scope-matched archive
4. Update ROADMAP: Status → Complete, add Shipped version and archived RUNDOC path
5. Close GitHub Issue: `gh issue close [number] --comment "Shipped in [version]"`
