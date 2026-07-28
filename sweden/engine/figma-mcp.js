#!/usr/bin/env node
/**
 * sweden/engine/figma-mcp.js
 * Figma Plugin API script for fetching variable data via MCP (use_figma).
 *
 * Usage pattern (in Claude's sync-figma skill):
 *   1. Claude reads FETCH_VARS_SCRIPT from this module
 *   2. Claude calls use_figma with that script → returns { figmaVars, figmaModes }
 *   3. Claude writes the result to brand/.figma-vars-tmp.json via saveVarsFile()
 *   4. sync scripts read it via --vars-file=brand/.figma-vars-tmp.json
 *
 * The returned shape is identical to what figma-rest.js returns, so all
 * sync script logic (diffAndPatchJson, buildFigmaScript, etc.) works unchanged.
 */

'use strict';

const fs   = require('fs');
const path = require('path');

/**
 * Figma Plugin API script — run via use_figma to fetch all local variables.
 * Returns { figmaVars, figmaModes } in the same shape as figma-rest.js.
 *
 * valuesByMode values for each resolvedType:
 *   COLOR          → { r, g, b, a }  (floats 0–1)
 *   FLOAT          → number
 *   STRING         → string
 *   VARIABLE_ALIAS → { type: 'VARIABLE_ALIAS', id: string }
 */
const FETCH_VARS_SCRIPT = `
(async () => {
  const collections = await figma.variables.getLocalVariableCollectionsAsync();
  const variables   = await figma.variables.getLocalVariablesAsync();

  const figmaModes = collections.map(coll => ({
    collectionName: coll.name,
    modes: coll.modes.map(m => ({ modeId: m.modeId, name: m.name })),
  }));

  const figmaVars = variables.map(v => {
    const modeIds = Object.keys(v.valuesByMode);
    return {
      id:           v.id,
      name:         v.name,
      resolvedType: v.resolvedType,
      value:        modeIds.length > 0 ? v.valuesByMode[modeIds[0]] : null,
      valuesByMode: v.valuesByMode,
    };
  });

  return { figmaVars, figmaModes };
})();
`.trim();

const DEFAULT_TMP_PATH = path.resolve(__dirname, '../../brand/.figma-vars-tmp.json');

/**
 * Save a use_figma result to a temp file. Returns the path written.
 * @param {{ figmaVars: Array, figmaModes: Array }} data
 * @param {string} [outPath]
 */
function saveVarsFile(data, outPath) {
  const dest = outPath ?? DEFAULT_TMP_PATH;
  fs.writeFileSync(dest, JSON.stringify(data, null, 2), 'utf8');
  return dest;
}

/**
 * Load a vars file written by saveVarsFile (or by Claude).
 * @param {string} [filePath]
 */
function loadVarsFile(filePath) {
  return JSON.parse(fs.readFileSync(filePath ?? DEFAULT_TMP_PATH, 'utf8'));
}

module.exports = { FETCH_VARS_SCRIPT, saveVarsFile, loadVarsFile, DEFAULT_TMP_PATH };
