# Architecture

## 1. Repo shape Claude Code should stand up

```
otr-canon/
  canon/                  the source of truth CC maintains (PROTOCOL.md section 6)
  spec/                   generated, from this pack. Never hand edited.
    status-registry.json
    case-model.json
    tokens/
    ir/
  pipeline/
    ir-extract.js         DOM to IR walker, runs inside a board page
    token-resolve.js      value to variable decision, shared by extractor and plugin
    figma-plugin/         the print plugin
    mounts/               pages that mount otherwise unmounted board components
    Canon Export.html     the export station
  design/                 the CD board system, verbatim. Read only from CC's point of view.
  docs/                   PRDs, decision records, ledgers, roadmap, lessons
  reference/              PNGs and source materials
  assets/                 unpacked images
```

Two rules about the trees. `design/` is a studio and is never refactored by CC; it is CD's working surface, mirrored. `spec/` is generated and is never hand edited; if it is wrong, fix the extractor and regenerate.

## 2. The IR node schema

`spec/ir/<board>.json` is the contract. One file per board.

```jsonc
{
  "board":   { "id", "title", "path", "stage", "workstream", "note?" },
  "extractedAt": "ISO",
  "sections": [{
    "id", "title",
    "artboards": [{
      "id", "label",
      "width", "height",          // design px, canvas zoom already removed
      "root": Node
    }]
  }],
  "bindings": { "#rrggbb": BindingDecision },   // emitted once, referenced by every paint
  "stats":    { "nodes", "textNodes", "artboards", "paintDecisions": {...} }
}
```

### Node

```jsonc
{
  "name":   "cpc.unfinished",            // data-ir-name, else class list, else text, else tag
  "type":   "FRAME" | "TEXT" | "IMAGE" | "VECTOR",
  "source": { "tag", "class" },
  "box":    { "x", "y", "w", "h" },      // x and y are relative to the parent node
  "layout": null | {                      // present when the element is CSS flex
    "mode": "HORIZONTAL" | "VERTICAL" | "GRID_CSS",
    "gap", "crossGap",
    "padding": { "t", "r", "b", "l" },
    "primaryAxisAlign": "MIN|CENTER|MAX|SPACE_BETWEEN",
    "counterAxisAlign": "MIN|CENTER|MAX|BASELINE|STRETCH",
    "wrap": bool
  },
  "sizing": { "h": "FIXED|FILL|HUG", "v": "FIXED|FILL|HUG" },
  "fills":  [ Paint ],
  "strokes": null | { "weight", "sides?", "style", "align", "color": Paint },
  "radius": [ tl, tr, br, bl ],
  "effects": [ { "type": "DROP_SHADOW|INNER_SHADOW", "x", "y", "blur", "spread", "color": Paint } ],
  "opacity": 1,
  "clip":   bool,
  "text":   null | {
    "characters", "fontFamily", "fontWeight", "fontSize",
    "lineHeight": number | "AUTO", "letterSpacing",
    "align", "transform", "whiteSpace", "color": Paint,
    "note?": "mixed content warning"
  },
  "image":  null | { "src", "alt", "fit" },
  "svg":    null | { "markup", "viewBox" },
  "pseudo": "before" | "after" | undefined,
  "transform?", "filter?", "backdropBlur?",
  "commentAnchor?": "…",                 // a stakeholder comment was pinned here
  "children": [ Node ]
}
```

### Paint

Compact by design. The decision lives once per bundle in `bindings`.

```jsonc
{ "type": "SOLID", "color": { "hex": "#155eef", "opacity": 1, "bind": "BIND" } }
{ "type": "GRADIENT_LINEAR", "css": "linear-gradient(102deg,#5b63ff 6%,#8b5cf6 96%)",
  "angle": 102, "stops": [ { "position": 0.06, "color": {…} } ] }
```

### BindingDecision

```jsonc
{
  "action":     "BIND" | "BIND_NEAREST" | "BIND_NEAREST_AND_FLAG" | "DS_REQUEST" | "RAW_OK",
  "confidence": "exact" | "near" | "drift" | "divergent" | "scaffolding",
  "figma":      [ { "css": "--colors-brand-600", "figmaCandidate": "colors/brand/600" } ],
  "nearest":    [ { "css", "figmaCandidate", "hex", "deltaE" } ],
  "dsToken":    [ "--blue-600" ],
  "note":       "…"
}
```

## 3. Reading the schema correctly

- **`figmaCandidate` is a guess.** `fig-tokens.css` was generated from Figma variables and flattens `/` to `-`, so `colors/background/bg-brand-solid` and `colors-background-bg-brand-solid` are indistinguishable from the CSS name alone. Resolve by **normalised match** against the live collections: lowercase, strip `/ - _ . space`. `token-resolve.js` exports `matchVariable(candidate, liveNames)` for exactly this.
- **Pseudo element nodes have no position.** CSS `::before` and `::after` are captured because several signature treatments live there (the SmartMatch gradient border sweep, the tap chevron, the confetti). Their `box.x` and `box.y` are null. Place them against the reference PNG.
- **`GRID_CSS` is not auto layout.** Print those children with absolute positions, or rebuild the grid as nested auto layout by hand.
- **Mixed content nodes** carry a `text.note`. An element holding both text and children must become a text node plus siblings in Figma.
- **`RAW_OK` means board scaffolding.** Spec captions, zone labels, explore pins, the annotation chrome. It never ships. Skip it or print it on a separate annotations page.

## 4. Regenerating the IR

The extractor runs in the browser, inside a live board page, because the only honest source of computed layout is the rendered DOM.

```
1. Open Canon Export.html in the design project (it must be served, not opened from disk).
2. Extract canon, or extract everything.
3. Each board writes .ir-<id>.state.json beside the page (the host bridge only permits *.state.json).
4. Move those into spec/ir/<id>.json and rebuild _index.json.
```

If a board fails with a timeout it has no `[data-dc-slot]` artboards, which means it predates the canvas shell. Four archive boards are in that state and are listed in `_index.json` under `notExtracted`.

## 5. Regenerating the variable map

Inputs: `design/_ds/.../tokens/fig-tokens.css` (the Figma variable dump), `tokens/colors.css` (the OTR palette), and every canon kit. Output: `spec/tokens/figma-variable-map.json` plus `binding-report.json`.

Regenerate whenever the design system publishes new variables or a design session introduces new values. The map is the only place a raw value becomes a binding decision, so a stale map silently degrades every print after it.
