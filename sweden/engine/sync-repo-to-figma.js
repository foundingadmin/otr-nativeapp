#!/usr/bin/env node
/**
 * sync-repo-to-figma.js
 * Metanoia Design System — JSON → Figma sync
 *
 * Reads all token files from brand/tokens/source/, resolves alias chains,
 * diffs against live Figma variables, and returns Figma plugin JS for
 * Claude Code to execute via the Figma MCP.
 *
 * No git/PR step — changes go directly to the Figma file.
 * Always dry-runs first; asks for confirmation before writing.
 *
 * Usage: trigger by saying "sync repo → Figma" or "run repo-to-figma sync"
 *
 * Token source (single source of truth):
 *   brand/tokens/source/*.tokens.json
 */

'use strict';

const path = require('path');

const { resolveAllToCssMap } = require('./token-json-utils.js');
const { parseFigmaFileKey, fetchFigmaVariables } = require('./figma-rest.js');

// ── Config ────────────────────────────────────────────────────────────────────

const SOURCE_DIR = path.resolve(__dirname, '../../brand/tokens/source');
const BRAND_MD   = path.resolve(__dirname, '../../brand/BRAND.md');

// ── Color conversion ──────────────────────────────────────────────────────────

function cssColorToFigma(val) {
  val = val.trim();
  const hex = val.match(/^#([0-9a-f]{6})$/i);
  if (hex) {
    const n = parseInt(hex[1], 16);
    return { r: ((n >> 16) & 0xff) / 255, g: ((n >> 8) & 0xff) / 255, b: (n & 0xff) / 255, a: 1 };
  }
  const rgba = val.match(/^rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)$/);
  if (rgba) {
    return {
      r: parseInt(rgba[1]) / 255,
      g: parseInt(rgba[2]) / 255,
      b: parseInt(rgba[3]) / 255,
      a: parseFloat(rgba[4]),
    };
  }
  return null;
}

function pxToNum(val) { return parseFloat(val); }

// ── Diff logic ────────────────────────────────────────────────────────────────

/**
 * figmaVars:   [{ name, resolvedType, value }]
 * tokenMap:    from brand/token-map.js
 * resolvedMap: { '--css-var': 'css-value' } from resolveAllToCssMap()
 *
 * Returns { updates, unchanged, warnings }
 */
function diffAndBuildUpdates(figmaVars, tokenMap, resolvedMap) {
  const figmaByName = {};
  for (const v of figmaVars) figmaByName[v.name] = v;

  const updates   = [];
  const unchanged = [];
  const warnings  = [];

  for (const mapping of tokenMap) {
    const cssVal = resolvedMap[mapping.css];
    if (cssVal === undefined) {
      warnings.push({ status: 'CSS_MISSING', ...mapping });
      continue;
    }

    const figmaVar = figmaByName[mapping.figma];
    if (!figmaVar) {
      warnings.push({ status: 'FIGMA_MISSING', ...mapping });
      continue;
    }

    const type = mapping.type ?? (figmaVar.resolvedType === 'FLOAT' ? 'FLOAT' : 'COLOR');

    if (type === 'COLOR') {
      const cssColor = cssColorToFigma(cssVal);
      if (!cssColor) {
        warnings.push({ status: 'NOT_A_COLOR', css: mapping.css, rawValue: cssVal });
        continue;
      }
      const fv = figmaVar.value;
      const rDiff = Math.abs((fv.r ?? 0) - cssColor.r);
      const gDiff = Math.abs((fv.g ?? 0) - cssColor.g);
      const bDiff = Math.abs((fv.b ?? 0) - cssColor.b);
      const aDiff = Math.abs((fv.a ?? 1) - cssColor.a);

      if (rDiff > 0.004 || gDiff > 0.004 || bDiff > 0.004 || aDiff > 0.004) {
        updates.push({ figmaName: mapping.figma, resolvedType: 'COLOR', from: fv, to: cssColor, cssVar: mapping.css, cssValue: cssVal });
      } else {
        unchanged.push(mapping.figma);
      }

    } else if (type === 'FLOAT') {
      const transform = mapping.transform ?? pxToNum;
      const cssNum    = transform(cssVal);
      if (Math.abs(cssNum - figmaVar.value) > 0.01) {
        updates.push({ figmaName: mapping.figma, resolvedType: 'FLOAT', from: figmaVar.value, to: cssNum, cssVar: mapping.css, cssValue: cssVal });
      } else {
        unchanged.push(mapping.figma);
      }

    } else if (type === 'STRING') {
      const cssStr   = cssVal.trim();
      const figmaStr = String(figmaVar.value).trim();
      if (cssStr !== figmaStr) {
        updates.push({ figmaName: mapping.figma, resolvedType: 'STRING', from: figmaStr, to: cssStr, cssVar: mapping.css, cssValue: cssVal });
      } else {
        unchanged.push(mapping.figma);
      }
    }
  }

  return { updates, unchanged, warnings };
}

// ── Figma plugin code generator ───────────────────────────────────────────────

function buildFigmaScript(updates) {
  if (updates.length === 0) return null;

  const lines = [
    `const vars = figma.variables.getLocalVariables();`,
    `function getVar(name) { return vars.find(v => v.name === name); }`,
    `let updated = 0;`,
  ];

  for (const u of updates) {
    if (u.resolvedType === 'COLOR') {
      const { r, g, b, a } = u.to;
      lines.push(
        `{ const v = getVar(${JSON.stringify(u.figmaName)});`,
        `  if (v) { v.setValueForMode(Object.keys(v.valuesByMode)[0], { r: ${r.toFixed(4)}, g: ${g.toFixed(4)}, b: ${b.toFixed(4)}, a: ${a.toFixed(4)} }); updated++; } }`
      );
    } else if (u.resolvedType === 'FLOAT') {
      lines.push(
        `{ const v = getVar(${JSON.stringify(u.figmaName)});`,
        `  if (v) { v.setValueForMode(Object.keys(v.valuesByMode)[0], ${u.to}); updated++; } }`
      );
    } else if (u.resolvedType === 'STRING') {
      lines.push(
        `{ const v = getVar(${JSON.stringify(u.figmaName)});`,
        `  if (v) { v.setValueForMode(Object.keys(v.valuesByMode)[0], ${JSON.stringify(u.to)}); updated++; } }`
      );
    }
  }

  lines.push(`figma.notify(\`✓ Synced \${updated}/${updates.length} variables from source JSON\`);`);
  return lines.join('\n');
}

// ── Entry point ───────────────────────────────────────────────────────────────

function run(figmaVars, tokenMap) {
  const resolvedMap = resolveAllToCssMap(SOURCE_DIR);
  const { updates, unchanged, warnings } = diffAndBuildUpdates(figmaVars, tokenMap, resolvedMap);

  console.log('\n── Metanoia DS: JSON → Figma Sync ─────────────────────────────');

  if (updates.length === 0) {
    console.log('✓ No differences found. Figma variables are in sync with source JSON.');
    if (warnings.length) {
      console.log('\nWarnings:');
      warnings.forEach(w => console.log(`  ${w.status}: ${w.css ?? ''} ↔ ${w.figma ?? w.rawValue ?? ''}`));
    }
    return { updates: [], script: null };
  }

  console.log(`\n${updates.length} variable(s) to update in Figma:\n`);
  updates.forEach(u => {
    if (u.resolvedType === 'COLOR') {
      const fromHex = u.from
        ? `rgba(${Math.round(u.from.r*255)},${Math.round(u.from.g*255)},${Math.round(u.from.b*255)},${(u.from.a??1).toFixed(2)})`
        : '?';
      console.log(`  ${u.figmaName}`);
      console.log(`    JSON: ${u.cssVar} = ${u.cssValue}`);
      console.log(`    ${fromHex}  →  ${u.cssValue}\n`);
    } else {
      console.log(`  ${u.figmaName}: ${u.from} → ${u.to}  (${u.cssVar})\n`);
    }
  });

  if (warnings.length) {
    console.log(`${warnings.length} warning(s):`);
    warnings.forEach(w => console.log(`  ${w.status}: ${w.css ?? ''} ↔ ${w.figma ?? w.rawValue ?? ''}`));
  }

  const script = buildFigmaScript(updates);
  console.log('\n── Figma plugin script ready. Claude Code will apply via MCP. ──');

  return { updates, script, warnings };
}

// ── CLI / automated path (Phase 01) ──────────────────────────────────────────

/**
 * Fetch current Figma variable values via a single REST call, then run the diff.
 *
 * @param {Array} tokenMap  — TOKEN_MAP from brand/token-map.js
 */
async function fetchAndRun(tokenMap) {
  const apiToken = process.env.FIGMA_API_TOKEN;
  const fileKey  = parseFigmaFileKey(BRAND_MD);

  console.log('\n── Metanoia DS: JSON → Figma Sync (REST fetch) ─────────────────');
  console.log(`  File: ${fileKey}`);

  const { figmaVars } = await fetchFigmaVariables(fileKey, apiToken);
  console.log(`  Variables fetched: ${figmaVars.length}`);

  return run(figmaVars, tokenMap);
}

// ── CLI entry point ───────────────────────────────────────────────────────────

if (require.main === module) {
  const varsArg  = process.argv.find(a => a.startsWith('--vars-file='));
  const tokenMap = require('../../brand/token-map.js').TOKEN_MAP;

  if (varsArg) {
    // MCP-first path: current Figma state pre-fetched via use_figma
    const { loadVarsFile } = require('./figma-mcp.js');
    const { figmaVars } = loadVarsFile(varsArg.split('=')[1]);
    console.log('\n── Metanoia DS: JSON → Figma Sync (MCP vars) ──────────────────');
    console.log(`  Variables loaded: ${figmaVars.length}`);
    run(figmaVars, tokenMap).catch(err => {
      console.error(`\n✗ ${err.message}`);
      process.exit(1);
    });
  } else {
    // Legacy REST path (requires FIGMA_API_TOKEN)
    fetchAndRun(tokenMap).catch(err => {
      console.error(`\n✗ ${err.message}`);
      process.exit(1);
    });
  }
}

module.exports = { run, fetchAndRun, diffAndBuildUpdates, buildFigmaScript, cssColorToFigma, resolveAllToCssMap, parseFigmaFileKey };
