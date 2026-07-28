# CLAUDE.md — {{BRAND_NAME}} Design System

This repo is the **Sweden engine deployed for {{BRAND_NAME}}**. Its job:
receive Claude Design (CD) packages in `intake/`, tokenize and componentize
them into `brand/`, print the UI into Figma, and read Figma-first work back —
so this repo is always the canon both humans and agents pull first.

**Not activated yet?** Read `ACTIVATE.md` and run the activation.
**Read `docs/OPERATING-MODEL.md`** for the full workflow model.

## Repo structure

```
/
├── ACTIVATE.md              ← One-prompt activation playbook (first run only)
├── sweden/                  ← Sync engine (brand-agnostic — never put brand values here)
│   ├── engine/              ← Sync scripts + engine docs (SYNC-MASTER.md, FIGMA-PLUGIN.md)
│   ├── adapters/            ← Token output adapters (web-css default)
│   ├── translators/         ← HTML → Astro / React translators
│   └── INSTALL.md           ← Brand contract + onboarding guide
├── brand/                   ← {{BRAND_NAME}} brand layer (all brand-specific values)
│   ├── BRAND.md             ← Instance config: file key, styles, node IDs
│   ├── token-map.js         ← CSS var ↔ Figma variable mapping
│   ├── component-map.js     ← Component sync registry
│   ├── tokens/source/       ← W3C Design Tokens JSON — the ONLY hand-editable token files
│   ├── tokens/output/       ← Generated adapter outputs (never hand-edit)
│   ├── components/html/     ← Normalized component HTML (print source for Figma)
│   ├── figma-state/         ← Read-back snapshots of Figma-first work
│   ├── fonts/  assets/      ← Brand files
├── intake/                  ← CD package drop zone (see intake/README.md)
└── docs/                    ← OPERATING-MODEL.md, decisions.md, prds/, flowchart/
```

## The core loop

| Direction | Pipeline |
|---|---|
| CD → Figma ("print") | intake → tokenize → componentize → two-pass print (JSON build → PNG fidelity) |
| Figma → repo ("read-back") | fetch state → snapshot → diff canon → absorb decisions |

Before any print session: read `brand/BRAND.md` and `sweden/engine/FIGMA-PLUGIN.md`.
Before any design session at all: run read-back so canon is current.

## Routing

| What you say | Read this doc |
|---|---|
| "activate", "set up this client" | `ACTIVATE.md` |
| "print this design into Figma", "push component to Figma" | `sweden/engine/FIGMA-PLUGIN.md` |
| "process this CD package", "tokenize the intake" | `intake/README.md`, then `sweden/INSTALL.md` §A |
| "sync figma → repo" / "sync repo → figma" (tokens) | `sweden/engine/SYNC-MASTER.md` |
| "new brand setup" | `sweden/INSTALL.md` |

## Rules

- `brand/tokens/source/*.tokens.json` is the **only hand-editable token layer**.
  Regenerate outputs with `node sweden/engine/run-adapters.js`.
- Component printing is always AI-mediated and human-triggered — never automatic.
- All Figma fills/strokes/text in generated scripts use **variable bindings**,
  never hardcoded values. No credible variable match → raw value + on-canvas
  diff annotation (see `docs/OPERATING-MODEL.md`).
- Record every new Figma node ID, variable key, and style key in `brand/BRAND.md`
  before the session ends. BRAND.md is the persistent memory between sessions.
- Engine code in `sweden/` stays brand-agnostic. Dark-mode token extension
  namespace: `com.sweden.modes`.

Current version: **v0.0.0** (starter — not yet activated)
