# CLAUDE.md — Off The Record Design System

This repo is the **Sweden engine deployed for Off The Record (OTR)**, the brand
behind the OTR native app. Its primary job right now: receive Claude Design (CD)
packages in `intake/`, tokenize and componentize them into `brand/`, and **print
the UI into a Figma file** via the Figma MCP.

## Repo structure

```
/
├── sweden/                  ← Sync engine (brand-agnostic — never put brand values here)
│   ├── engine/              ← Sync scripts + engine docs
│   │   ├── SYNC-MASTER.md   ← Architecture overview + routing table (start here)
│   │   ├── FIGMA-PLUGIN.md  ← Figma Plugin API reference (component printing)
│   │   └── CONTRIBUTING.md  ← Engine contribution rules
│   ├── adapters/            ← Token output adapters (web-css default)
│   ├── translators/         ← HTML → Astro / React translators
│   └── INSTALL.md           ← Brand contract + onboarding guide
├── brand/                   ← Off The Record brand layer (all OTR-specific values)
│   ├── BRAND.md             ← Instance config: file key, styles, node IDs (TBDs until first print)
│   ├── token-map.js         ← CSS var ↔ Figma variable mapping (empty scaffold)
│   ├── component-map.js     ← Component sync registry (empty scaffold)
│   ├── tokens/source/       ← W3C Design Tokens JSON — the ONLY hand-editable token files
│   ├── tokens/output/       ← Generated adapter outputs (never hand-edit)
│   ├── components/html/     ← Normalized component HTML (print source for Figma)
│   ├── fonts/               ← Brand font files
│   └── assets/              ← Logos, identity guides
├── canon/                   ← Session memory: INDEX.md (read first), figma-state, decisions, print-log
├── intake/                  ← CD package drop zone (see intake/README.md)
├── docs/                    ← Canon docs: OPERATING-MODEL.md, decisions.md, prds/
└── sweden-starter/          ← Whitelabel install kit for future client deployments
```

**Read `docs/OPERATING-MODEL.md` first.** It defines the whole workflow: CC is
the canon between two disconnected design surfaces (Claude Design and Figma),
with a forward print pipeline (two-pass: JSON build → PNG fidelity check),
a backward read-back pipeline (Figma state → repo before every session), a
variable-binding policy (best-guess bind; no match → raw value + on-canvas diff
annotation), and decision frames for open questions.

## The core workflow — CD package → Figma

| Step | What happens | Doc |
|---|---|---|
| 1. Intake | CD package lands in `intake/<name>/` | `intake/README.md` |
| 2. Tokenize | Extract tokens → `brand/tokens/source/*.tokens.json`, fill `brand/token-map.js` + `BRAND.md` | `sweden/INSTALL.md` §A |
| 3. Bootstrap Figma | `node sweden/engine/init-figma.js` creates variable collections in the target file | `sweden/engine/SYNC-MASTER.md` |
| 4. Componentize | Normalize UI into `brand/components/html/*.html` using `var(--token)` only | `sweden/engine/FIGMA-PLUGIN.md` |
| 5. Print | Generate + run `use_figma` plugin scripts to draw components with variable bindings | `sweden/engine/FIGMA-PLUGIN.md` |

Before any print session: read `brand/BRAND.md` (needs the Figma file key) and
`sweden/engine/FIGMA-PLUGIN.md`. After any `use_figma` call: run the Build
Quality Check in FIGMA-PLUGIN.md.

## Routing

| What you say | Read this doc |
|---|---|
| "print this design into Figma", "push component to Figma" | `sweden/engine/FIGMA-PLUGIN.md` |
| "process this CD package", "tokenize the intake" | `intake/README.md`, then `sweden/INSTALL.md` §A |
| "sync figma → repo" / "sync repo → figma" (tokens) | `sweden/engine/SYNC-MASTER.md` |
| "add a new token" | `sweden/engine/SYNC-MASTER.md` |
| "new brand setup" | `sweden/INSTALL.md` |

## Rules

- `brand/tokens/source/*.tokens.json` is the **only hand-editable token layer**.
  Regenerate outputs with `node sweden/engine/run-adapters.js`.
- Component printing is always AI-mediated and human-triggered — never automatic.
- All Figma fills/strokes/text in generated scripts use **variable bindings**,
  never hardcoded values.
- Record every new Figma node ID, variable key, and style key in `brand/BRAND.md`
  before the session ends. BRAND.md is the persistent memory between sessions.
- Engine code in `sweden/` stays brand-agnostic. Dark-mode token extension
  namespace: `com.sweden.modes`. Known engine debt: the `web-css` adapter
  hardcodes the previous deployment's palette grouping (navy/aqua/grey token-name
  arrays) and `pptx-json` special-cases old palette names — both must be
  genericized or rewritten against real OTR token names during the first intake.

**Preflight for every session: read `canon/INDEX.md` first.** It carries the
standing policies (DS-first reuse, numeric snapping, Native type binding,
layout QA) and the open items. Note: this deployment binds directly against
the **Customer side / Guidelines** team library (variables, text styles,
components) rather than generating local tokens — `brand/tokens/` remains an
empty scaffold until a token-generation need appears.

Current version: **v0.2.0** (first full print + binding integrity + ratified
Native type collection; sample-metanoia removed)
