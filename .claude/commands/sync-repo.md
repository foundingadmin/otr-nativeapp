Push token changes from the repo's source JSON into the Figma file. Always dry-runs first and shows a full diff before asking permission to write.

## Step 1 — Fetch current Figma state via MCP & diff

Read `sweden/engine/figma-mcp.js` to get the `FETCH_VARS_SCRIPT` string.

Call `use_figma` with that script (targeting file key from `brand/BRAND.md`: `c3ayt4AFrNKOmSkGBIyFi4`). The script returns `{ figmaVars, figmaModes }` — the current live state of all variables in Figma.

Write the result JSON to `brand/.figma-vars-tmp.json`.

Then run the dry-run diff:

```
node sweden/engine/sync-repo-to-figma.js --vars-file=brand/.figma-vars-tmp.json
```

Parse the output and present a clear diff table to the user:

| Variable (Figma name) | Current value in Figma | New value from JSON |
|---|---|---|
| … | … | … |

Also list any warnings (FIGMA_MISSING, unmapped tokens, etc.) separately.

If there are **no diffs**, report "Figma is already in sync with the repo. Nothing to apply." and stop.

## Step 2 — Checkpoint: user review

After showing the diff table, pause and ask:

> **Ready to apply these [N] change(s) to Figma?**
> - Type **yes** to push all changes
> - Type **no** to cancel
> - Type **skip [variable name]** to exclude a specific variable before pushing

Wait for the user's response before proceeding. Do not apply anything until confirmed.

## Step 3 — Apply

If the user confirms, apply the changes to Figma via MCP (`use_figma`) using the plugin script returned by `sync-repo-to-figma.js`. Report each variable updated as it's applied. Delete `brand/.figma-vars-tmp.json` when done.

## Step 4 — Result summary

Print a final summary:

> ✓ Applied N change(s) to Figma file [file key]
> Skipped: [any skipped variables]
> Warnings: [any unresolved warnings]

Remind the user that these changes are now live in Figma — no PR needed for this direction.
