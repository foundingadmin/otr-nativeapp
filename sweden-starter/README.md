# Sweden Starter — Whitelabel Design System Install

One package that stands up a complete Sweden deployment for a new client:
**CD → CC → GitHub → Figma**, interconnected in about two minutes.

Sweden is a bi-directional design system engine. Claude Design (CD) packages
get tokenized and printed into Figma; Figma-first work gets read back into the
repo. The repo — run by Claude Code (CC) — is the canon both humans and agents
pull from before any design work.

## Install (pick one)

**1. Double-click install (fastest)**
Double-click `install-sweden.command`. It asks for the client name and repo
slug, creates the private GitHub repo, pushes this payload, and hands off to
Claude Code with the activation prompt. ~2 minutes.

**2. GitHub template repo**
Host this directory as a template repository → "Use this template" for each
new client → open Claude Code on the new repo → say:
*"Read ACTIVATE.md and activate Sweden for [Brand Name]."*

**3. Manual**
Copy this directory's contents (including hidden `.claude/` and `.gitignore`)
into a blank repo, push, open Claude Code, say the activation prompt above.

## What activation handles

`ACTIVATE.md` routes by entry state — net-new client, client with a CD
package, client with an existing Figma DS, or both — and ends with tokens in
`brand/tokens/source/`, a configured `brand/BRAND.md`, Figma variable
collections bootstrapped, and the standing print/read-back loop documented.

## Layout

- `ACTIVATE.md` — one-prompt activation playbook (the brain of the install)
- `install-sweden.command` — double-click installer (macOS)
- `cd-kit/` — Claude Design startup install: dictated project scaffold brief
  + canon seed, so CD never starts from a blank slate
- `sweden/` — the engine (brand-agnostic)
- `brand/` — blank brand layer, filled during activation
- `intake/` — CD package drop zone
- `docs/` — operating model, decision log, PRDs, flowchart
- `.claude/commands/` — `/sync-figma`, `/sync-repo`, `/rebuild-adapters`

## Keeping the starter current

When an engine improvement ships in a client deployment, port it back:
`rsync -a --delete <client-repo>/sweden/ sweden-starter/sweden/` — the engine
must stay identical across deployments and contain zero brand values.
