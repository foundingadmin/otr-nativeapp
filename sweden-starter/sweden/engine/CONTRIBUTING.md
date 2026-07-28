# Contributing to the Sweden Engine

This file governs the documentation scaffold for the Sweden sync engine.
Read it before editing any file in `sweden/engine/`.

---

## The Engine / Instance Rule

**If a value would be different in a "Sweden for Acme Corp" deployment → it belongs in `brand/BRAND.md`.**
**If an instruction would be identical across all brands → it belongs in an engine doc.**

| Type | File |
|---|---|
| Visual tool file key | `brand/BRAND.md` |
| Font family name | `brand/BRAND.md` |
| Token names / collection names | `brand/BRAND.md` |
| Text style SHA keys | `brand/BRAND.md` |
| Component node IDs | `brand/BRAND.md` |
| Semantic variable SHA keys | `brand/BRAND.md` |
| Color / spacing / radius values | `brand/BRAND.md` |
| How to fetch variables | `sweden/engine/SYNC-MASTER.md` |
| How to bind a variable to a fill | `sweden/engine/FIGMA-PLUGIN.md` |
| Plugin API patterns and gotchas | `sweden/engine/FIGMA-PLUGIN.md` |
| Sync warnings and their meaning | `sweden/engine/SYNC-MASTER.md` |
| Architecture overview | `sweden/engine/SYNC-MASTER.md` |

---

## Update Routing

If you learn something new during a session, append it to the correct doc before closing.

| Lesson type | Update this doc |
|---|---|
| New Plugin API gotcha | `sweden/engine/FIGMA-PLUGIN.md` |
| New visual tool error and fix | `sweden/engine/FIGMA-PLUGIN.md` |
| New sync pipeline pattern | `sweden/engine/SYNC-MASTER.md` |
| Visual → Code edge case | `sweden/engine/SYNC-MASTER.md` |
| New brand token, SHA key, or component ID | `brand/BRAND.md` |
| Deprecated token / component removed | `brand/BRAND.md` |
| New backlog feature idea | `sweden/engine/ROADMAP.md` |
| New sprint plan | New `RUNDOC_v[N+1].md` at repo root |

---

## Anti-Patterns

These are explicitly prohibited for future sessions:

1. **Never hardcode a brand-specific value in an engine doc.** Font names, file keys, token names, hex values, SHA keys — these belong only in `brand/BRAND.md`. Add a pointer comment instead.

2. **Never paste step-by-step sync instructions into `CLAUDE.md` at the root.** The root is a router, not a content host. Procedures live in the directional docs.

3. **Never duplicate content across two docs.** The only permitted exception is the Build Quality Check, which appears in both `sweden/engine/FIGMA-PLUGIN.md` (authoritative) and `sweden/engine/SYNC-MASTER.md` (summary pointer). This exception is explicitly intentional. All other content: one owner only.

4. **Never add a new `sweden/engine/` doc without also updating both:**
   - `sweden/engine/SYNC-MASTER.md` trigger phrase routing table
   - `CLAUDE.md` root "Sweden Sync" routing section
   ...in the same commit.

5. **Never skip the Build Quality Check after a `use_figma` session.** The full checklist is in `sweden/engine/FIGMA-PLUGIN.md`. Every `use_figma` session ends with a screenshot pass.

---

## Sprint Lifecycle

### When a RUNDOC sprint is complete

Archive by moving it into `sweden/engine/archive/`:
```bash
git mv RUNDOC_v[N].md sweden/engine/archive/RUNDOC_v[N].md
```

Then:
- Create `RUNDOC_v[N+1].md` at repo root for the next sprint
- Update the "Active sprint" pointer in `sweden/engine/SYNC-MASTER.md`
- Commit: `docs: archive RUNDOC_v[N] — sprint complete`

Active sprint docs live at repo root. Completed sprints move to `sweden/engine/archive/`.

---

## Installing Sweden in a New Brand Repo

See `sweden/INSTALL.md` for the full brand contract and onboarding guide.

Quick reference:
1. Copy the `sweden/` directory into the target repo
2. Create `brand/` with a new `BRAND.md` (all sections documented in that file)
3. Add `brand/tokens/`, `brand/fonts/`, `brand/assets/`
4. Update `CLAUDE.md` root "Sweden Sync" routing section (brand pointer)
5. Keep all engine docs unchanged: `FIGMA-PLUGIN.md`, `SYNC-MASTER.md`, `CONTRIBUTING.md`, `ROADMAP.md`
6. Create a new `RUNDOC_v1.md` at repo root with the brand's build plan
7. Update `brand/token-map.js` with the new brand's CSS → visual tool variable mappings

Engine docs require zero edits across brand deployments. Only `brand/BRAND.md`, `brand/token-map.js`, and the sprint RUNDOC change.

---

## Compound Learning

After any session that surfaces a new lesson (API gotcha, sync edge case, component pattern):

1. Identify which doc owns that type of content (see Update Routing above)
2. Append the lesson to that doc before closing the session
3. Do not rely on chat history — once the session ends, the lesson is lost unless written down

This is how the engine improves over time without growing bloated.

---

## Build Quality Check — Duplication Exception

The Build Quality Check appears in both `sweden/engine/FIGMA-PLUGIN.md` (authoritative, full checklist)
and `sweden/engine/SYNC-MASTER.md` (summary with pointer). This is intentional — the checklist must be
visible in context during any `use_figma` session, and `SYNC-MASTER.md` is often the entry point.

**Rule:** If the checklist is updated, both copies must be updated in the same commit.
