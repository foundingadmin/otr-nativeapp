# Pipeline

Four moving parts. Two run in a browser against the design boards, two run inside Figma.

| File | Runs where | Does |
| --- | --- | --- |
| `ir-extract.js` | inside a board page | Walks the rendered artboards and emits the IR |
| `token-resolve.js` | board page and Figma plugin | Turns a raw value into a variable binding decision |
| `Canon Export.html` | design project, served | The export station. Runs the extractor over every board |
| `figma-plugin/` | Figma | Reads an IR bundle, prints frames, binds variables, prints diffs, reads back |

## Regenerating the IR

```
1. Serve the design project and open Canon Export.html.
2. Extract canon, or extract everything (20 boards, about three minutes).
3. Each board writes .ir-<id>.state.json beside the page.
   The host bridge only permits *.state.json paths, which is why the names look odd.
4. Move them into spec/ir/<id>.json and rebuild spec/ir/_index.json.
```

`mounts/detail-screens.html` exists because `DetailScreens` (the nine full case detail screens) is mounted by no canonical board. Without the mount those screens render nowhere and never reach Figma. See `PORT-MAP.md` finding A.

## Installing the plugin

```
Figma desktop → Plugins → Development → Import plugin from manifest…
pick pipeline/figma-plugin/manifest.json
```

Then: open the target file, run the plugin, **Read back first**, pick a bundle from `spec/ir/`, choose a page, print.

The plugin skips any frame whose `irId` plugin data already exists, so a second print updates nothing by default. That is deliberate: overwriting a frame a human has polished is the one unrecoverable mistake in this pipeline. To reprint intentionally, delete the frame yourself or extend the plugin with an explicit replace mode that archives the old frame first.

## Extension points, in the order they will be wanted

1. **Component sets.** The plugin prints flat frames. Build the StatusBadge and CasePreviewCard variant sets with `figma.combineAsVariants`, then instance them into screens. Order and props are in `FIGMA-PRINT-GUIDE.md` section 3.
2. **Icon instances.** Icon nodes arrive as `VECTOR` with SVG markup. Swap them for instances from the OTR icon library, matched by the Streamline name.
3. **Read back to canon.** The `readback` message returns a `figma-state.json`. Wire it to write into `canon/` instead of the plugin log.
4. **Replace mode.** Archive the existing frame to an Archive page, then print fresh. Never a silent overwrite.
