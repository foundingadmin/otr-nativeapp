Pull token changes from the Figma file into the repo's source JSON. Always dry-runs first and shows a full diff before asking permission to write.

## Step 1 — Fetch variables via Figma MCP

Read `sweden/engine/figma-mcp.js` to get the `FETCH_VARS_SCRIPT` string.

Call `use_figma` with that script (targeting file key from `brand/BRAND.md`). The script runs `figma.variables.getLocalVariablesAsync()` and `figma.variables.getLocalVariableCollectionsAsync()` and returns `{ figmaVars, figmaModes }`.

Write the result JSON to `brand/.figma-vars-tmp.json`.

Then run the dry-run diff with the pre-fetched data:

```
node sweden/engine/sync-figma-to-repo.js --dry-run --vars-file=brand/.figma-vars-tmp.json
```

Parse the output and present a clear diff table to the user:

| Token (CSS var) | Current value in JSON | New value from Figma |
|---|---|---|
| … | … | … |

Also list any warnings (FIGMA_MISSING, ALIAS_BROKEN, unmapped tokens) separately.

If there are **no diffs**, report "Repo is already in sync with Figma. Nothing to apply." and stop.

## Step 2 — Checkpoint: user review

After showing the diff table, pause and ask:

> **Ready to apply these [N] change(s) to the repo?**
> - Type **yes** to apply all and open a draft PR
> - Type **no** to cancel
> - Type **skip [token name]** to exclude a specific token before applying

Wait for the user's response before proceeding. Do not write any files until confirmed.

## Step 3 — Apply

If the user confirms:
1. Run `node sweden/engine/sync-figma-to-repo.js --vars-file=brand/.figma-vars-tmp.json` to write updated source JSON (adapters regenerate automatically)
2. Delete `brand/.figma-vars-tmp.json`
3. Open a draft PR with a summary table of what changed

## Step 4 — Result summary

Print a final summary:

> ✓ Applied N change(s) — draft PR opened: [url]
> Skipped: [any skipped tokens]
> Warnings: [any unresolved warnings]
