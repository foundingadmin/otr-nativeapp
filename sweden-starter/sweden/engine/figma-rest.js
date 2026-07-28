#!/usr/bin/env node
/**
 * sweden/engine/figma-rest.js
 * Single-call Figma REST API fetch for the token sync pipeline.
 *
 * Endpoint: GET /v1/files/:fileKey/variables/local
 * Auth: FIGMA_API_TOKEN env var (X-Figma-Token header)
 *
 * Returns variables in the same shape the sync scripts expect:
 *   figmaVars:  [{ name, resolvedType, value, valuesByMode }]
 *   figmaModes: [{ collectionName, modes: [{ modeId, name }] }]
 */

'use strict';

const fs   = require('fs');
const path = require('path');

const BRAND_MD_PATH = path.resolve(__dirname, '../../brand/BRAND.md');

/**
 * Read the Figma file key from brand/BRAND.md.
 * Looks for the "Visual tool file key" row in the Identity table.
 */
function parseFigmaFileKey(brandMdPath) {
  const text = fs.readFileSync(brandMdPath || BRAND_MD_PATH, 'utf8');
  const m    = text.match(/Visual tool file key\s*\|\s*`([^`]+)`/);
  if (!m) throw new Error('figma-rest: could not find "Visual tool file key" entry in BRAND.md');
  return m[1];
}

/**
 * Fetch all Figma variables from a file in a single REST call.
 *
 * @param {string} fileKey   Figma file key
 * @param {string} apiToken  Value of FIGMA_API_TOKEN env var
 * @returns {Promise<{ figmaVars: Array, figmaModes: Array }>}
 */
async function fetchFigmaVariables(fileKey, apiToken) {
  if (!apiToken) throw new Error('figma-rest: FIGMA_API_TOKEN is not set');

  const url = `https://api.figma.com/v1/files/${fileKey}/variables/local`;
  const res  = await fetch(url, { headers: { 'X-Figma-Token': apiToken } });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`figma-rest: Figma API responded ${res.status} — ${body.slice(0, 300)}`);
  }

  const json = await res.json();
  if (json.error) {
    throw new Error(`figma-rest: Figma API error — ${json.message ?? JSON.stringify(json).slice(0, 200)}`);
  }

  const { variables = {}, variableCollections = {} } = json.meta ?? {};

  // One figmaModes entry per collection
  const figmaModes = Object.values(variableCollections).map(coll => ({
    collectionName: coll.name,
    modes: (coll.modes ?? []).map(m => ({ modeId: m.modeId, name: m.name })),
  }));

  // One figmaVars entry per variable.
  // value = first mode's raw value (sync scripts use lightModeId to pick the
  // correct mode; value is only the fallback for single-mode collections).
  const figmaVars = Object.values(variables).map(v => {
    const vbm     = v.valuesByMode ?? {};
    const modeIds = Object.keys(vbm);
    return {
      id:           v.id,
      name:         v.name,
      resolvedType: v.resolvedType,
      value:        modeIds.length > 0 ? vbm[modeIds[0]] : null,
      valuesByMode: vbm,
    };
  });

  return { figmaVars, figmaModes };
}

module.exports = { parseFigmaFileKey, fetchFigmaVariables };
