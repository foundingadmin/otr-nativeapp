# Sweden Sync — Master Reference

Sweden is a neutral, bi-directional translation layer that lets designers and engineers
work on the same product without leaving their home tools. It translates changes from
the visual world into code, and from code into visual elements — silently, without
the traditional handoff throwing files over a wall.

**Active brand config:** `brand/BRAND.md`
**Before editing any sweden/engine/ doc:** read `sweden/engine/CONTRIBUTING.md`

---

## Single Source of Truth

```
brand/tokens/source/*.tokens.json   ← THE source of truth in both directions
brand/tokens/output/                ← Generated artifacts — never patch directly
```

After any edit to source JSON, regenerate all adapter outputs:
```
node sweden/engine/run-adapters.js
```

---

## Token Sync vs Component Sync

These are different workflows. Never conflate them.

| | Token sync | Component sync |
|---|---|---|
| **Mechanism** | Automated, mechanical | AI-mediated, interpretive |
| **Trigger** | Human runs sync script | Human triggers Claude |
| **Speed** | Fast — all tokens in one pass | Slow — one component at a time |
| **Review** | Diff of JSON values | Claude + human review of rendered output |
| **Direction** | Both, independently | Both, independently |

---

## Two Directions — Tokens

| Direction | Script | What it does |
|---|---|---|
| Visual → Code | `sync-figma-to-repo.js` | Reads Figma variables, diffs against source JSON, writes changed `$value`s to `brand/tokens/source/`, triggers `run-adapters.js` to regenerate all outputs, opens a PR |
| Code → Visual | `sync-repo-to-figma.js` | Reads source JSON, resolves all `{alias}` chains, diffs against live Figma variables, generates and applies a plugin script via MCP |

**Figma → repo flow:**
1. Claude calls `use_figma` with `FETCH_VARS_SCRIPT` from `sweden/engine/figma-mcp.js` → Figma Plugin API returns all local variables in native format
2. Result saved to `brand/.figma-vars-tmp.json`
3. `sync-figma-to-repo.js --vars-file=brand/.figma-vars-tmp.json` diffs against `brand/tokens/source/*.tokens.json`
4. For primitive (raw value) tokens: compare values directly; write changes to source JSON
5. For semantic (alias) tokens: resolve the Figma `VARIABLE_ALIAS` target → compare alias chain against JSON `{token-key}`; write changes if the alias target changed
6. Trigger `run-adapters.js` → all adapter outputs regenerate from fresh source JSON
7. `buildPublicCss()` regenerates `showcase/public/colors_and_type.css`
8. Commit: source JSON + all adapter outputs together in one PR

**Primary fetch method: Figma MCP (`use_figma` Plugin API).** The legacy REST path (`FIGMA_API_TOKEN` + `figma-rest.js`) is retained as a fallback for automated CI contexts but is not the default — the variables REST endpoint requires elevated token permissions not available in this repo's setup.

**Multi-mode sync:** `sync-figma-to-repo.js` captures all variable modes when `figmaModes` is
passed to `run()`. Light mode → `$value`. Additional modes → `$extensions.com.sweden.modes.[modeName]`.
Both raw-value and alias-value tokens are diffed in every mode.

**ALIAS_BROKEN warning:** If Figma has a raw color where JSON expects an alias (or vice versa),
the sync emits a warning and does not auto-apply the change — resolving or introducing an alias
chain is a structural decision that requires manual review.

**Repo → Figma flow:**
1. Human or AI edits `brand/tokens/source/*.tokens.json` only
2. Run `run-adapters.js` to regenerate all output formats
3. Claude calls `use_figma` with `FETCH_VARS_SCRIPT` → saves current Figma state to `brand/.figma-vars-tmp.json`
4. `sync-repo-to-figma.js --vars-file=brand/.figma-vars-tmp.json` reads source JSON, resolves `{alias}` chains, diffs against live Figma values
5. Translates changed values to Figma variable format
6. Claude applies the generated plugin script to Figma via `use_figma`

---

## Two Directions — Components

Components cannot sync mechanically — they require AI interpretation in both directions.

**Figma → Code:**
- Trigger: designer builds or updates a component in the Figma DS file
- Claude reads the Figma node structure, variant properties, and variable bindings via MCP
- Claude interprets the structure and translates it to HTML/CSS constrained by source tokens
- Variable bindings become `var(--token-name)` references — never hardcoded values
- Output: `brand/components/html/[component-name].html`

**Code → Figma:**
- Trigger: developer or AI builds a component in `brand/components/html/`
- Claude reads the component file and resolves its token references against source JSON
- Claude generates a Figma plugin script that draws the component on the DS canvas page
- Variable bindings use Figma variable IDs from `brand/BRAND.md`
- Always human-triggered. Always Claude-mediated. Never automatic.

---

## Trigger Phrase Routing

| What the user says | Read this doc |
|---|---|
| "sync visual → code", "sync Figma → repo", "fig2repo" (tokens) | `sweden/engine/SYNC-MASTER.md` (Two Directions — Tokens section) |
| "sync code → visual", "sync repo → Figma", "repo2fig" (tokens) | `sweden/engine/SYNC-MASTER.md` (Two Directions — Tokens section) |
| "translate Figma component to HTML" | `sweden/engine/FIGMA-PLUGIN.md` (Component Sync section) |
| "push HTML component to Figma" | `sweden/engine/FIGMA-PLUGIN.md` (Component Sync section) |
| "show me the diff" | Ask which direction, then open the corresponding doc |
| "build in Figma", "generate component", "push component to Figma" | `sweden/engine/FIGMA-PLUGIN.md` |
| "add a new token" | `sweden/engine/SYNC-MASTER.md` |
| "continue the DS build", "next phase", "run the build plan" | `RUNDOC_v3.md` |
| "what features are planned", "sync engine backlog" | `sweden/engine/ROADMAP.md` |
| "install Sweden in a new repo", "new brand setup" | `sweden/INSTALL.md` |

---

## Data Shapes

### Figma REST API — `GET /v1/files/:fileKey/variables/local`

Used by `sweden/engine/figma-rest.js` (single call replaces all per-collection fetches).
Auth: `X-Figma-Token: <FIGMA_API_TOKEN>` header.

```json
{
  "meta": {
    "variables": {
      "VariableID:1:2": {
        "id": "VariableID:1:2",
        "name": "Colors/Navy",
        "resolvedType": "COLOR",
        "variableCollectionId": "VariableCollectionId:12",
        "valuesByMode": {
          "12:0": { "r": 0.035, "g": 0.294, "b": 0.467, "a": 1 },
          "12:1": { "r": 0.08, "g": 0.12, "b": 0.18, "a": 1 }
        }
      }
    },
    "variableCollections": {
      "VariableCollectionId:12": {
        "id": "VariableCollectionId:12",
        "name": "Brand Colors",
        "modes": [
          { "modeId": "12:0", "name": "Light" },
          { "modeId": "12:1", "name": "Dark" }
        ]
      }
    }
  }
}
```

**Mapped to sync-script shapes by `figma-rest.js`:**

```js
// figmaVars — one entry per variable
// value = first mode's raw value (fallback); sync scripts use lightModeId to pick the correct mode
[{ name: 'Colors/Navy', resolvedType: 'COLOR', value: { r, g, b, a }, valuesByMode: { [modeId]: value } }]

// figmaModes — one entry per collection
[{ collectionName: 'Brand Colors', modes: [{ modeId: '12:0', name: 'Light' }, { modeId: '12:1', name: 'Dark' }] }]
```

**Variable alias values** (`{ type: 'VARIABLE_ALIAS', id: '...' }`) may appear in `valuesByMode` when
one variable references another. These pass through as-is — the sync scripts skip alias tokens via the
JSON `$value.startsWith('{')` check before reaching the Figma value comparison step.

---

## Warnings

| Warning | Meaning | Action |
|---|---|---|
| `JSON_MISSING` | Token in map but not in source JSON | Add to source JSON or remove from map |
| `FIGMA_MISSING` | Token in map but not in visual tool | Create variable or remove from map |
| `NOT_A_COLOR` | Resolved value isn't a parseable color | Check alias chain or token type |
| `NOT_IN_MAP` | Figma alias target has no token-map entry | Add the target variable to token-map.js |
| `ALIAS_BROKEN` | Figma has a raw value but JSON has an alias (or vice versa) | Review manually — resolving/introducing an alias is a structural change |

---

## Build Quality Check

After **any** `use_figma` session that creates or modifies components, frames, or variables,
run a visual QA pass before reporting the work as done. Full checklist: `sweden/engine/FIGMA-PLUGIN.md`.

Summary (all six must pass):
- [ ] Component sets are not flat/collapsed — every variant is visible
- [ ] Every state (Default / Hover / Active / Disabled) is visually distinct at a glance
- [ ] Semantic variable tokens applied — no hardcoded hex fills
- [ ] Badge / count chips are legible against their parent background
- [ ] Text nodes use the correct DS text style (not raw font overrides)
- [ ] Bar compositions: tab labels show real strings; Active instance shows correct state

---

## Active Sprint

Current sprint: `RUNDOC_v3.md` — Sweden restructure + multi-surface

Completed sprints: `sweden/engine/archive/RUNDOC_v2.md` (archived — Phases 0–5 complete)
