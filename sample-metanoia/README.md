# Sweden Design System Engine

Sweden is a neutral, bi-directional translation layer between design tools and code. It lets
designers and engineers work in their home tools — Figma and a code editor — while keeping
design tokens and components in sync automatically.

**This repo is the Sweden engine configured for Metanoia.** Brand-specific values (colors,
typography, spacing, Figma file key, component IDs) live in `brand/BRAND.md` and
`brand/tokens/`. The engine itself (`sweden/`) has no brand dependency.

---

## What Sweden does

- **Token sync — Visual → Code:** reads Figma variables, diffs against source JSON, writes
  changed values, regenerates all CSS and adapter outputs, opens a PR.
- **Token sync — Code → Visual:** reads source JSON, resolves alias chains, patches Figma
  variables via MCP — no manual Figma editing required.
- **Component sync:** AI-mediated translation in both directions. Figma components → HTML/CSS;
  HTML/CSS components → Figma component sets with variable bindings.
- **Multi-surface output:** one sync run regenerates tokens for web CSS, flat JSON, email
  inline CSS, PowerPoint (python-pptx), and Google Slides — simultaneously.

---

## Repo layout

```
/
├── brand/                    ← Brand config + assets (replace per deployment)
│   ├── BRAND.md              ← All brand-specific values: file key, token names, component IDs
│   ├── token-map.js          ← CSS var ↔ Figma variable mapping
│   ├── component-map.js      ← Component sync + Code Connect registry
│   └── tokens/
│       ├── source/           ← W3C Design Tokens JSON — the only hand-editable token files
│       └── output/           ← Generated CSS + adapter outputs (never hand-edit)
├── sweden/                   ← The engine (no brand values)
│   ├── engine/               ← Sync scripts + engine docs
│   │   ├── sync-figma-to-repo.js
│   │   ├── sync-repo-to-figma.js
│   │   ├── init-figma.js
│   │   ├── build-tokens.js
│   │   ├── audit.js
│   │   ├── generate-map.js
│   │   ├── SYNC-MASTER.md    ← Architecture overview + routing table (start here)
│   │   ├── FIGMA-PLUGIN.md   ← Figma Plugin API reference
│   │   ├── CONTRIBUTING.md   ← Engine contribution rules
│   │   ├── ROADMAP.md        ← Feature backlog
│   │   └── archive/          ← Completed sprint plans
│   ├── adapters/             ← Token output adapters
│   ├── translators/          ← Component format translators (HTML → Astro, React)
│   └── INSTALL.md            ← Brand contract + onboarding guide
├── showcase/                 ← Astro user manual (deployed to Vercel)
├── CLAUDE.md                 ← Technical guide for Claude Code sessions
└── RUNDOC_v3.md              ← Active sprint plan
```

---

## Getting started

See `sweden/INSTALL.md` for the full brand contract and step-by-step onboarding guide.

Quick start for a new brand:
1. Copy `sweden/` into the target repo
2. Create `brand/BRAND.md` with your brand's values (template in `sweden/INSTALL.md`)
3. Run `node sweden/engine/init-figma.js` to bootstrap Figma variable collections
4. Run `node sweden/engine/run-adapters.js` to generate all token output formats

---

## Token sync

```bash
# Figma → repo (reads live Figma variables, opens a PR if diffs found)
node sweden/engine/sync-figma-to-repo.js

# Repo → Figma (pushes source JSON values back to Figma variables)
node sweden/engine/sync-repo-to-figma.js

# Regenerate all adapter outputs after editing source JSON
node sweden/engine/run-adapters.js
```

The **only file you ever hand-edit** is `brand/tokens/source/*.tokens.json`.
All CSS and other adapter outputs are generated artifacts.

---

## Documentation

| Doc | Purpose |
|---|---|
| `sweden/engine/SYNC-MASTER.md` | Architecture overview, routing table, sync flows — start here |
| `sweden/engine/FIGMA-PLUGIN.md` | Figma Plugin API patterns, build order, variable binding |
| `sweden/engine/CONTRIBUTING.md` | Rules for editing engine docs, sprint lifecycle |
| `sweden/engine/ROADMAP.md` | Feature backlog |
| `sweden/INSTALL.md` | Brand contract, onboarding guide |
| `brand/BRAND.md` | All instance-specific values for this deployment |
| `CLAUDE.md` | Technical guide for Claude Code sessions |

---

## This instance — Metanoia

This repo deploys Sweden for **Metanoia**, the asset-information software and services company.

- **Live showcase:** [metanoia-designsys.vercel.app](https://metanoia-designsys.vercel.app)
- **Brand:** Navy `#094B77` + Aqua `#32CBED`, Figtree variable font (300–900)
- **Figma file:** key in `brand/BRAND.md`
- **Tokens:** 5 W3C JSON source files in `brand/tokens/source/`

Brand-specific values, component node IDs, style keys, and Figma variable IDs are all
documented in `brand/BRAND.md`. The engine docs in `sweden/engine/` contain no brand values.
