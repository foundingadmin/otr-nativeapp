# Off The Record — Design System

Design system repo for **Off The Record (OTR)** and its native app, powered by
[Sweden](sweden/INSTALL.md) — a bi-directional sync engine between code and Figma.

## What this repo does

Claude Design (CD) packages dropped into `intake/` get tokenized into
`brand/tokens/source/` (W3C Design Tokens JSON), componentized into
`brand/components/html/`, and printed into a Figma file with full variable
bindings via the Figma MCP.

## Layout

- `sweden/` — the engine (brand-agnostic): token sync scripts, adapters, translators
- `brand/` — everything Off The Record: config, tokens, components, fonts, assets
- `intake/` — drop zone for incoming CD packages
- `sweden-starter/` — whitelabel install kit for future client deployments

## Docs

Start with `CLAUDE.md` (workflow + routing), then `sweden/engine/SYNC-MASTER.md`
(architecture) and `sweden/engine/FIGMA-PLUGIN.md` (Figma printing).
