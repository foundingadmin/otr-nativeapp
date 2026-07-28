# RUNDOC — Sync Performance and Correctness Enhancements

**Scope:** engine
**Version:** 3.3.4
**Date:** 2026-05-23
**GitHub Issue:** #63
**ROADMAP Entry:** Feature 010

---

## Overview

Four classes of issues surfaced during May 2026 sync sessions: unnecessary round-trip cost (all Figma variables fetched on every run even when nothing changed), false adapter git noise (all output files rewritten even for a single token change), a symmetric comparator bug (the two sync directions compared different value representations, causing phantom diffs on motion easing tokens), and alias warning noise (38 expected FIGMA_MISSING warnings on every clean run). Enhancement 6 (alias warning suppression) shipped in v3.3.2 and is recorded here as Phase 04 Complete.

---

## Status

| Phase | Name | Status |
|---|---|---|
| 01 | Single REST API fetch | ✅ Complete (v3.3.4) |
| 02 | Local Figma state cache | ✅ Complete (v3.3.4) |
| 03 | Adapter diff-awareness | ✅ Complete (v3.3.4) |
| 04 | Alias warning suppression | ✅ Complete (v3.3.2) |

---

## Phase 01 — Single REST API fetch

### Context

Both `sync-figma-to-repo.js` and `sync-repo-to-figma.js` currently fetch Figma variables in multiple calls — one per collection or per variable group. The Figma REST API endpoint `GET /v1/files/:file_key/variables/local` returns all collections, modes, and values in a single payload. Switching to this single call eliminates per-collection round-trip overhead. File key lives in `brand/BRAND.md`; the `figmaVars` consumer shape passed to `diffAndPatchJson()` and `diffAndBuildUpdates()` must stay stable.

### Constraints

- Response shape of the REST endpoint differs from current MCP tool response — map to existing `figmaVars` shape before passing downstream.
- File key: read from `brand/BRAND.md`, never hardcode.
- `TOKEN_MAP` and `figmaModes` shapes are frozen — no changes permitted.

### Prompts

```
Refactor sync-figma-to-repo.js and sync-repo-to-figma.js to fetch all
Figma variables in a single REST call to GET /v1/files/:fileKey/variables/local.

Steps:
1. Read FIGMA_FILE_KEY from brand/BRAND.md.
2. Replace any multi-call variable iteration with a single fetch.
3. Map the REST response shape to the existing figmaVars object shape
   that diffAndPatchJson() and diffAndBuildUpdates() expect.
4. Verify: run node sweden/engine/sync-figma-to-repo.js --dry-run and
   confirm output is identical to the multi-call version.
5. Update sweden/engine/SYNC-MASTER.md data shapes section to document
   the REST response structure.
```

### Completion criteria

- [x] Both sync scripts use a single Figma API call for variable fetch
- [x] `--dry-run` CLI flag support added to `sync-figma-to-repo.js`
- [x] `SYNC-MASTER.md` documents the REST response shape

---

## Phase 02 — Local Figma state cache

### Context

The nightly GitHub Action runs `sync-figma-to-repo.js` at 2:00 AM UTC regardless of whether Figma has changed. On a calm day this wastes CI minutes and generates noise. Caching the last-known Figma variable state in `brand/.figma-cache.json` and exiting early when nothing has changed solves this without any Figma API changes. The cache is gitignored and keyed on file key plus mode IDs.

### Constraints

- Cache file: `brand/.figma-cache.json` — must be gitignored; never commit.
- Cache is keyed on `fileKey` + mode IDs. Invalidate on either changing.
- Cache miss (file absent or key mismatch) → fall through to full sync, write cache on completion.
- Cache hit (all values match) → exit 0 with `✓ No changes since last sync (cache hit)`.
- Only a Figma-variable change invalidates the cache — adapter rewrites do not.

### Prompts

```
Add a local Figma state cache to sync-figma-to-repo.js.
Cache file: brand/.figma-cache.json (gitignored).
Shape: { fileKey, fetchedAt, variables: { ...same shape as figmaVars } }

Logic:
1. After fetching Figma variables, load cache if it exists.
2. If cache.fileKey === current fileKey AND deep-equal(cache.variables, figmaVars):
   print "✓ No changes since last sync (cache hit)" and exit 0.
3. On any diff or cache miss: proceed with full sync, then write cache.
4. Add brand/.figma-cache.json to .gitignore if not already present.

Verify: run sync twice with no Figma changes — second run must exit 0
with cache hit message and make zero additional Figma API calls.
```

### Completion criteria

- [x] `brand/.figma-cache.json` listed in `.gitignore`
- [x] Second `fetchAndRun()` with no Figma changes exits 0 with cache hit message
- [x] Cache keyed on `fileKey` + variable values — invalidates on either changing
- [x] Nightly CI Action: run `node sweden/engine/sync-figma-to-repo.js` (no args) to get cache behavior

---

## Phase 03 — Adapter diff-awareness

### Context

All five adapters (`web-css`, `web-flat-json`, `email-inline`, `pptx-json`, `gslides-json`) rewrite their output files completely on every run, even when only one token value changed. This generates false git diff noise — every adapter file appears modified in `git status` after a run that touched a single token. The fix is to compare new content against existing file content before writing and skip the write if identical.

### Constraints

- Content comparison must be byte-for-byte identical, not semantic.
- Each adapter's `run()` return value gains `{ written, skipped }` counts alongside the existing file list.
- `run-adapters.js` logs `N file(s) written, M unchanged` per adapter.
- Output format and target file paths are frozen — no changes.

### Prompts

```
Add diff-awareness to all five Sweden adapters:
  sweden/adapters/web-css/index.js
  sweden/adapters/web-flat-json/index.js
  sweden/adapters/email-inline/index.js
  sweden/adapters/pptx-json/index.js
  sweden/adapters/gslides-json/index.js

For each file an adapter would write:
1. If the file exists, read current content.
2. Compare byte-for-byte with the new content.
3. If identical: skip write, increment skipped counter.
4. If different or file absent: write, increment written counter.

Update each adapter's return value to include { written, skipped, files }.
Update run-adapters.js to log per-adapter "N written, M unchanged" summary.

Verify: run node sweden/engine/run-adapters.js twice in a row with no
token changes — second run must show "0 written, N unchanged" for all adapters.
```

### Completion criteria

- [x] All five adapters skip writes for unchanged files
- [x] `run-adapters.js` logs per-adapter "N written, M unchanged" summary
- [x] Second run with no token changes: all adapters show 0 written
- [x] `git status` clean after second run (no false diffs — verified locally)

---

## Phase 04 — Alias warning suppression ✅ Complete (v3.3.2)

### What shipped

In `diffAndPatchJson()`, FIGMA_MISSING entries are now flagged `isAlias: true` when `token.$value` starts with `{`. In `run()`, individual alias warnings are suppressed and replaced with a single summary line: `N alias token(s) excluded from fetch (expected — alias chains are maintained by hand)`. Previously, 38 such warnings appeared inline with real warnings on every clean sync run, training users to ignore all warnings.

---

## When this RUNDOC is complete

1. Run final verification sequence for Phases 01–03
2. Merge the PR
3. Move this file to `sweden/engine/archive/rundocs/RUNDOC_sync-performance.md`
4. Update `ROADMAP.md` Feature 010:
   - Status → Complete
   - Shipped → [version]
   - RUNDOC path → `sweden/engine/archive/rundocs/RUNDOC_sync-performance.md`
5. Close GitHub Issue:
   `gh issue close [number] --comment "Shipped in [version]"`
6. Confirm: ROADMAP entry is one paragraph, status Complete, Issue closed, RUNDOC archived.
