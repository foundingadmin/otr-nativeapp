#!/usr/bin/env node
/**
 * sync-figma-to-repo.js
 * Metanoia Design System — Figma → JSON sync
 *
 * Reads live variable values from the Figma file via MCP, diffs them against
 * the W3C source token files in brand/tokens/source/, writes changes to JSON,
 * then triggers run-adapters.js so all output formats regenerate from the
 * updated source.
 *
 * Usage: trigger by saying "sync Figma → repo" or "run figma-to-repo sync"
 *
 * Primary write target (single source of truth):
 *   brand/tokens/source/color-primitives.tokens.json
 *   brand/tokens/source/color-semantic.tokens.json
 *   brand/tokens/source/typography.tokens.json
 *   brand/tokens/source/spacing.tokens.json
 *   brand/tokens/source/motion.tokens.json
 *
 * Adapter outputs are regenerated automatically via run-adapters.js.
 * brand/tokens/*.css (legacy) are never patched by this script.
 */

'use strict';

const fs   = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const { loadAllSourceTokens, serializeTokenFile, cssVarToTokenKey } = require('./token-json-utils.js');
const { parseFigmaFileKey, fetchFigmaVariables } = require('./figma-rest.js');

// ── Config ────────────────────────────────────────────────────────────────────

const SOURCE_DIR    = path.resolve(__dirname, '../../brand/tokens/source');
const BRAND_MD      = path.resolve(__dirname, '../../brand/BRAND.md');
const CACHE_FILE    = path.resolve(__dirname, '../../brand/.figma-cache.json');
const BRANCH_PREFIX = 'sync/figma-to-json';

// ── Figma state cache (Phase 02) ──────────────────────────────────────────────

function loadCache() {
  try {
    if (!fs.existsSync(CACHE_FILE)) return null;
    return JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'));
  } catch {
    return null;
  }
}

function writeCache(fileKey, figmaVars) {
  const payload = { fileKey, fetchedAt: new Date().toISOString(), variables: figmaVars };
  fs.writeFileSync(CACHE_FILE, JSON.stringify(payload, null, 2), 'utf8');
}

function cacheHit(cache, fileKey, figmaVars) {
  if (!cache || cache.fileKey !== fileKey) return false;
  try {
    return JSON.stringify(cache.variables) === JSON.stringify(figmaVars);
  } catch {
    return false;
  }
}

// ── Utilities ─────────────────────────────────────────────────────────────────

function figmaColorToCss(color) {
  const r = Math.round(color.r * 255);
  const g = Math.round(color.g * 255);
  const b = Math.round(color.b * 255);
  const a = color.a ?? 1;
  if (Math.abs(a - 1) < 0.005) {
    return `#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`.toUpperCase();
  }
  return `rgba(${r},${g},${b},${parseFloat(a.toFixed(2))})`;
}

function normaliseHex(hex) {
  return hex.toUpperCase().replace(/^#/, '');
}

// ── Main diff function ────────────────────────────────────────────────────────

/**
 * figmaVars:  [{ name, resolvedType: 'COLOR'|'FLOAT'|'STRING', value, valuesByMode? }]
 *               valuesByMode is optional: { [modeId]: value } — present when figmaModes supplied
 * tokenMap:   from brand/token-map.js (TOKEN_MAP array)
 * figmaModes: optional [{ collectionName, modes: [{ modeId, name }] }]
 *               When provided, syncs all modes. Light = $value. Dark = $extensions.com.metanoia.modes.dark.
 *
 * Returns { changes, warnings, updatedFiles }
 *   changes:      [{ key, figma, mode?, status:'CHANGED', from, to }]
 *   warnings:     [{ key, figma, status:'JSON_MISSING'|'FIGMA_MISSING' }]
 *   updatedFiles: [{ name, filePath, data, changed: bool }]
 */
function diffAndPatchJson(figmaVars, tokenMap, jsonData, figmaModes) {
  const { allTokens, byFile } = jsonData;

  const figmaByName = {};
  for (const v of figmaVars) figmaByName[v.name] = v;

  // Build ID → name lookup for resolving VARIABLE_ALIAS targets
  const figmaVarById = new Map();
  for (const v of figmaVars) {
    if (v.id) figmaVarById.set(v.id, v.name);
  }

  // Build reverse lookup: Figma variable name → token key (for alias comparison)
  const figmaNameToTokenKey = new Map();
  for (const m of tokenMap) {
    figmaNameToTokenKey.set(m.figma, cssVarToTokenKey(m.css));
  }

  // Build per-collection mode ID lookups from figmaModes (if provided).
  // Each collection can have its own Light/Dark mode IDs (e.g. Semantic uses 84:0/84:1,
  // Button uses 239:0/239:1). We store them keyed by collectionName so the per-variable
  // lookup below can find the right pair for each variable.
  const collectionModes = new Map(); // collectionName → { lightModeId, darkModeId }
  // Also build a modeId → collectionName map so we can find which collection a variable
  // belongs to by inspecting its valuesByMode keys.
  const modeIdToCollection = new Map(); // modeId → collectionName

  if (figmaModes && figmaModes.length > 0) {
    for (const coll of figmaModes) {
      let lightModeId = null;
      let darkModeId  = null;
      for (const mode of coll.modes) {
        const lower = mode.name.toLowerCase();
        modeIdToCollection.set(mode.modeId, coll.collectionName);
        if (!lightModeId && (lower === 'light' || lower === 'default' || lower === 'light mode')) {
          lightModeId = mode.modeId;
        } else if (!darkModeId && (lower === 'dark' || lower === 'dark mode')) {
          darkModeId = mode.modeId;
        }
      }
      collectionModes.set(coll.collectionName, { lightModeId, darkModeId });
    }
  }

  // Helper: given a figmaVar, return the { lightModeId, darkModeId } for its collection.
  function modesForVar(figmaVar) {
    if (!figmaVar.valuesByMode) return { lightModeId: null, darkModeId: null };
    const modeIds = Object.keys(figmaVar.valuesByMode);
    for (const mid of modeIds) {
      const collName = modeIdToCollection.get(mid);
      if (collName && collectionModes.has(collName)) return collectionModes.get(collName);
    }
    return { lightModeId: null, darkModeId: null };
  }

  // Keep a single fallback pair for callers that still use the old scalar vars.
  let lightModeId = null;
  let darkModeId  = null;
  for (const { lightModeId: l, darkModeId: d } of collectionModes.values()) {
    if (!lightModeId && l) lightModeId = l;
    if (!darkModeId  && d) darkModeId  = d;
  }

  const changes  = [];
  const warnings = [];

  for (const mapping of tokenMap) {
    const figmaVar = figmaByName[mapping.figma];
    const tokenKey = cssVarToTokenKey(mapping.css);
    const token    = allTokens[tokenKey];

    if (!figmaVar) {
      warnings.push({ key: mapping.css, figma: mapping.figma, status: 'FIGMA_MISSING', isAlias: false });
      continue;
    }

    if (!token) {
      warnings.push({ key: mapping.css, figma: mapping.figma, status: 'JSON_MISSING' });
      continue;
    }

    // Find which file owns this token key
    const fileEntry = byFile.find(f => f.keys.has(tokenKey));
    if (!fileEntry) continue;

    const type = mapping.type ?? (figmaVar.resolvedType === 'FLOAT' ? 'FLOAT' : 'COLOR');

    // ── Light mode ($value) ───────────────────────────────────────────────────
    const rawValue = token.$value;
    const isJsonAlias = typeof rawValue === 'string' && rawValue.startsWith('{');

    // Resolve which Figma value to use for the light/default mode.
    // Use the per-variable collection lookup so Button/Ghost/etc. use their own mode IDs.
    const varModes = modesForVar(figmaVar);
    const varLightId = varModes.lightModeId;
    const varDarkId  = varModes.darkModeId;
    const lightFigmaValue = (varLightId && figmaVar.valuesByMode && figmaVar.valuesByMode[varLightId])
      ? figmaVar.valuesByMode[varLightId]
      : figmaVar.value;
    const isFigmaAlias = lightFigmaValue && typeof lightFigmaValue === 'object' && lightFigmaValue.type === 'VARIABLE_ALIAS';

    if (isJsonAlias && type === 'COLOR') {
      // ── Alias comparison ──────────────────────────────────────────────────
      if (isFigmaAlias) {
        // Both alias — compare targets
        const targetFigmaName = figmaVarById.get(lightFigmaValue.id);
        if (targetFigmaName) {
          const targetTokenKey = figmaNameToTokenKey.get(targetFigmaName);
          if (targetTokenKey) {
            const jsonAliasTarget = rawValue.slice(1, -1);
            if (targetTokenKey !== jsonAliasTarget) {
              const newAlias = `{${targetTokenKey}}`;
              changes.push({ key: tokenKey, figma: mapping.figma, status: 'CHANGED', from: rawValue, to: newAlias, isAlias: true });
              fileEntry.data[tokenKey] = { ...token, $value: newAlias };
              fileEntry.data._valueChanges.set(tokenKey, newAlias);
              fileEntry.changed = true;
            }
          } else {
            warnings.push({ key: mapping.css, figma: mapping.figma, status: 'NOT_IN_MAP',
              note: `Figma alias target "${targetFigmaName}" has no token-map entry` });
          }
        }
      } else if (lightFigmaValue && !isFigmaAlias) {
        // Figma has a raw value but JSON has an alias — alias was resolved/removed in Figma
        const figmaHex = figmaColorToCss(lightFigmaValue);
        warnings.push({ key: mapping.css, figma: mapping.figma, status: 'ALIAS_BROKEN',
          note: `Figma resolved to raw ${figmaHex}; JSON has alias ${rawValue} — review and update manually` });
      }

    } else if (!isJsonAlias) {
      // ── Raw value comparison (existing logic) ─────────────────────────────
      if (type === 'COLOR') {
        const figmaHex    = figmaColorToCss(lightFigmaValue);
        const figmaIsRgba = figmaHex.startsWith('rgba');
        const jsonIsRgba  = typeof rawValue === 'string' && rawValue.startsWith('rgba');

        let isDifferent = false;
        if (!figmaIsRgba && !jsonIsRgba) {
          isDifferent = normaliseHex(figmaHex) !== normaliseHex(String(rawValue));
        } else {
          isDifferent = figmaHex.replace(/\s/g, '') !== String(rawValue).replace(/\s/g, '');
        }

        if (isDifferent) {
          changes.push({ key: tokenKey, figma: mapping.figma, status: 'CHANGED', from: rawValue, to: figmaHex });
          fileEntry.data[tokenKey] = { ...token, $value: figmaHex };
          fileEntry.data._valueChanges.set(tokenKey, figmaHex);
          fileEntry.changed = true;
        }

      } else if (type === 'FLOAT') {
        const transform = mapping.transform ?? (v => parseFloat(v));
        const jsonNum   = transform(String(rawValue));
        const figmaNum  = (typeof lightFigmaValue === 'number') ? lightFigmaValue : figmaVar.value;

        if (Math.abs(jsonNum - figmaNum) > 0.01) {
          const rawStr = String(rawValue);
          let newVal;
          if (rawStr.includes('rem'))      newVal = `${(figmaNum / 16).toFixed(4).replace(/\.?0+$/, '')}rem`;
          else if (rawStr.includes('px'))  newVal = `${figmaNum}px`;
          else if (rawStr.includes('ms'))  newVal = `${figmaNum}ms`;
          else if (rawStr.includes('em'))  newVal = `${figmaNum}em`;
          else                             newVal = figmaNum;

          changes.push({ key: tokenKey, figma: mapping.figma, status: 'CHANGED', from: rawValue, to: newVal });
          fileEntry.data[tokenKey] = { ...token, $value: newVal };
          fileEntry.data._valueChanges.set(tokenKey, newVal);
          fileEntry.changed = true;
        }

      } else if (type === 'STRING') {
        const jsonStr  = String(rawValue).trim();
        const figmaStr = String(figmaVar.value).trim();

        if (figmaStr !== jsonStr) {
          changes.push({ key: tokenKey, figma: mapping.figma, status: 'CHANGED', from: rawValue, to: figmaStr });
          fileEntry.data[tokenKey] = { ...token, $value: figmaStr };
          fileEntry.data._valueChanges.set(tokenKey, figmaStr);
          fileEntry.changed = true;
        }
      }
    }

    // ── Dark mode ($extensions.com.metanoia.modes.dark) ──────────────────────
    // Only when figmaModes is provided and a dark mode ID is known for this variable's collection.
    if (varDarkId && figmaVar.valuesByMode && figmaVar.valuesByMode[varDarkId] && type === 'COLOR') {
      const darkFigmaRaw  = figmaVar.valuesByMode[varDarkId];
      const isDarkFigmaAlias = darkFigmaRaw && typeof darkFigmaRaw === 'object' && darkFigmaRaw.type === 'VARIABLE_ALIAS';
      const currentDark   = token.$extensions?.['com.metanoia.modes']?.dark;

      if (currentDark !== undefined) {
        const isDarkJsonAlias = typeof currentDark === 'string' && currentDark.startsWith('{');

        if (isDarkJsonAlias && isDarkFigmaAlias) {
          // Both aliases — compare targets
          const targetFigmaName = figmaVarById.get(darkFigmaRaw.id);
          if (targetFigmaName) {
            const targetTokenKey = figmaNameToTokenKey.get(targetFigmaName);
            if (targetTokenKey) {
              const jsonDarkTarget = currentDark.slice(1, -1);
              if (targetTokenKey !== jsonDarkTarget) {
                const newAlias = `{${targetTokenKey}}`;
                changes.push({ key: tokenKey, figma: mapping.figma, mode: 'Dark', status: 'CHANGED', from: currentDark, to: newAlias, isAlias: true });
                const existing = fileEntry.data[tokenKey];
                fileEntry.data[tokenKey] = {
                  ...existing,
                  $extensions: {
                    ...existing.$extensions,
                    'com.metanoia.modes': { ...existing.$extensions?.['com.metanoia.modes'], dark: newAlias },
                  },
                };
                fileEntry.data._darkChanges.set(tokenKey, newAlias);
                fileEntry.changed = true;
              }
            }
          }

        } else if (!isDarkJsonAlias && !isDarkFigmaAlias) {
          // Both raw — compare hex values
          const darkFigmaHex = figmaColorToCss(darkFigmaRaw);
          const darkIsRgba   = darkFigmaHex.startsWith('rgba');
          const currIsRgba   = typeof currentDark === 'string' && currentDark.startsWith('rgba');

          let darkDifferent = false;
          if (!darkIsRgba && !currIsRgba) {
            darkDifferent = normaliseHex(darkFigmaHex) !== normaliseHex(String(currentDark));
          } else {
            darkDifferent = darkFigmaHex.replace(/\s/g, '') !== String(currentDark).replace(/\s/g, '');
          }

          if (darkDifferent) {
            changes.push({ key: tokenKey, figma: mapping.figma, mode: 'Dark', status: 'CHANGED', from: currentDark, to: darkFigmaHex });
            const existing = fileEntry.data[tokenKey];
            fileEntry.data[tokenKey] = {
              ...existing,
              $extensions: {
                ...existing.$extensions,
                'com.metanoia.modes': { ...existing.$extensions?.['com.metanoia.modes'], dark: darkFigmaHex },
              },
            };
            fileEntry.data._darkChanges.set(tokenKey, darkFigmaHex);
            fileEntry.changed = true;
          }

        } else if (isDarkJsonAlias && !isDarkFigmaAlias) {
          // Alias in JSON, raw in Figma — alias was resolved in Figma
          const darkFigmaHex = figmaColorToCss(darkFigmaRaw);
          warnings.push({ key: mapping.css, figma: mapping.figma, mode: 'Dark', status: 'ALIAS_BROKEN',
            note: `Figma dark resolved to raw ${darkFigmaHex}; JSON has alias ${currentDark} — review and update manually` });
        }
      }
    }
  }

  return { changes, warnings, updatedFiles: byFile };
}

// ── Version bump ──────────────────────────────────────────────────────────────

function bumpType(changes) {
  const hasRename = changes.some(c => c.status === 'JSON_MISSING' || c.status === 'FIGMA_MISSING');
  return hasRename ? 'MAJOR' : 'PATCH';
}

// ── Entry point ───────────────────────────────────────────────────────────────

/**
 * @param {Array}  figmaVars  — [{ name, resolvedType, value, valuesByMode? }]
 * @param {Array}  tokenMap   — TOKEN_MAP from brand/token-map.js
 * @param {Array}  [figmaModes] — optional [{ collectionName, modes: [{ modeId, name }] }]
 *                               When provided, syncs all modes. Omit for single-mode behavior.
 */
async function run(figmaVars, tokenMap, figmaModes, opts = {}) {
  const jsonData = loadAllSourceTokens(SOURCE_DIR);

  for (const f of jsonData.byFile) f.changed = false;

  const { changes, warnings, updatedFiles } = diffAndPatchJson(figmaVars, tokenMap, jsonData, figmaModes);
  const realChanges = changes.filter(c => c.status === 'CHANGED');

  console.log('\n── Metanoia DS: Figma → JSON Sync ─────────────────────────────');

  if (realChanges.length === 0) {
    console.log('✓ No token differences found. Source JSON is in sync with Figma.');
    if (warnings.length) {
      console.log('\nWarnings:');
      warnings.forEach(w => {
        const note = w.note ? ` — ${w.note}` : '';
        console.log(`  ${w.status}: ${w.key} ↔ ${w.figma}${note}`);
      });
    }
    return;
  }

  // Group changes by token key so light + dark show together
  const byKey = new Map();
  for (const c of realChanges) {
    if (!byKey.has(c.key)) byKey.set(c.key, { key: c.key, figma: c.figma, modes: [] });
    byKey.get(c.key).modes.push(c);
  }

  console.log(`\n${byKey.size} token(s) changed:\n`);
  for (const group of byKey.values()) {
    console.log(`  ${group.key}`);
    console.log(`    Figma: ${group.figma}`);
    for (const c of group.modes) {
      const label = c.mode ? ` (${c.mode})` : ' (Light)';
      console.log(`   ${label}: ${c.from}  →  ${c.to}`);
    }
    console.log('');
  }

  if (warnings.length) {
    console.log(`\n${warnings.length} warning(s):`);
    warnings.forEach(w => {
      const note = w.note ? ` — ${w.note}` : '';
      console.log(`  ${w.status}: ${w.key} ↔ ${w.figma}${note}`);
    });
  }

  // Write only files that changed, using the targeted serializer
  let filesWritten = 0;
  if (!opts.dryRun) {
    for (const fileEntry of updatedFiles) {
      if (!fileEntry.changed) continue;
      fs.writeFileSync(fileEntry.filePath, serializeTokenFile(fileEntry.data), 'utf8');
      console.log(`✓ Updated: brand/tokens/source/${fileEntry.name}.tokens.json`);
      filesWritten++;
    }
    console.log(`\n✓ ${filesWritten} source file(s) updated.`);
  } else {
    filesWritten = updatedFiles.filter(f => f.changed).length;
    console.log(`\n(dry-run) ${filesWritten} source file(s) would be updated.`);
  }

  // Regenerate all adapter outputs. run-adapters.js reads BRAND.md to determine
  // which adapters are enabled — BRAND.md remains authoritative.
  if (!opts.dryRun && filesWritten > 0) {
    console.log('\nRegenerating adapter outputs…');
    execSync(`node ${path.resolve(__dirname, 'run-adapters.js')}`, { stdio: 'inherit' });
    const { buildPublicCss } = require('./build-tokens.js');
    buildPublicCss();
  }

  const date    = new Date().toISOString().slice(0, 10);
  const branch  = `${BRANCH_PREFIX}-${date}`;
  const bump    = bumpType(realChanges);
  const summary = realChanges.length === 1
    ? `update ${realChanges[0].key}`
    : `update ${realChanges.length} tokens`;

  const figmaFileKey = (() => { try { return parseFigmaFileKey(BRAND_MD); } catch { return 'unknown'; } })();
  const prBody = [
    '## Figma → JSON Token Sync',
    '',
    `Automated sync from Figma design system (file \`${figmaFileKey}\`).`,
    '',
    '### Changed tokens',
    ...realChanges.map(c => `- \`${c.key}\`: \`${c.from}\` → \`${c.to}\``),
    '',
    warnings.length
      ? `### Mapping warnings\n${warnings.map(w => `- ${w.status}: \`${w.key}\` ↔ \`${w.figma}\``).join('\n')}`
      : '',
    '',
    '---',
    '_Generated by Claude Code · Metanoia DS sync script_',
  ].join('\n');

  const commitMsg = `${bump === 'MAJOR' ? 'feat' : 'fix'}: figma→json sync — ${summary}`;

  const cmds = [
    `git checkout -b ${branch}`,
    `git add brand/tokens/source/ brand/tokens/output/`,
    `git commit -m "${commitMsg}"`,
    `git push -u origin ${branch}`,
    `gh pr create --title "DS Sync: ${summary}" --body '${prBody.replace(/'/g, "\\'")}' --base main --head ${branch}`,
  ];

  console.log('\n── Git commands to run ─────────────────────────────────────────');
  cmds.forEach(cmd => console.log(`  $ ${cmd}`));

  return { branch, commitMsg, prBody, changes: realChanges, warnings, bump };
}

// ── CLI / automated path (Phase 01 + 02) ─────────────────────────────────────

/**
 * Fetch Figma variables via a single REST call, check the local state cache,
 * then run the full sync if anything changed.
 *
 * @param {Array}  tokenMap  — TOKEN_MAP from brand/token-map.js
 * @param {object} [opts]
 * @param {boolean} [opts.dryRun]  — print diff but do not write any files
 */
async function fetchAndRun(tokenMap, opts = {}) {
  const apiToken  = process.env.FIGMA_API_TOKEN;
  const fileKey   = parseFigmaFileKey(BRAND_MD);

  console.log('\n── Metanoia DS: Figma → JSON Sync (REST fetch) ─────────────────');
  console.log(`  File: ${fileKey}`);
  if (opts.dryRun) console.log('  Mode: dry-run (no files written)');

  const { figmaVars, figmaModes } = await fetchFigmaVariables(fileKey, apiToken);
  console.log(`  Variables fetched: ${figmaVars.length}`);

  // Phase 02 — cache check
  const cache = loadCache();
  if (!opts.dryRun && cacheHit(cache, fileKey, figmaVars)) {
    console.log('\n✓ No changes since last sync (cache hit)');
    return { cacheHit: true };
  }

  const result = run(figmaVars, tokenMap, figmaModes);

  // Write cache after a successful non-dry run
  if (!opts.dryRun) {
    writeCache(fileKey, figmaVars);
  }

  return result;
}

// ── CLI entry point ───────────────────────────────────────────────────────────

if (require.main === module) {
  const dryRun   = process.argv.includes('--dry-run');
  const varsArg  = process.argv.find(a => a.startsWith('--vars-file='));
  const tokenMap = require('../../brand/token-map.js').TOKEN_MAP;

  if (varsArg) {
    // MCP-first path: variables pre-fetched via use_figma (no FIGMA_API_TOKEN needed)
    const { loadVarsFile } = require('./figma-mcp.js');
    const { figmaVars, figmaModes } = loadVarsFile(varsArg.split('=')[1]);
    console.log('\n── Metanoia DS: Figma → JSON Sync (MCP vars) ──────────────────');
    console.log(`  Variables loaded: ${figmaVars.length}`);
    if (dryRun) console.log('  Mode: dry-run (no files written)');
    run(figmaVars, tokenMap, figmaModes, { dryRun }).catch(err => {
      console.error(`\n✗ ${err.message}`);
      process.exit(1);
    });
  } else {
    // Legacy REST path (requires FIGMA_API_TOKEN)
    fetchAndRun(tokenMap, { dryRun }).catch(err => {
      console.error(`\n✗ ${err.message}`);
      process.exit(1);
    });
  }
}

module.exports = { run, fetchAndRun, diffAndPatchJson, figmaColorToCss, loadSourceJson: loadAllSourceTokens, bumpType, cssVarToTokenKey, parseFigmaFileKey };
