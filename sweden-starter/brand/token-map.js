/**
 * token-map.js
 * {{BRAND_NAME}} Design System — Figma ↔ CSS Token Bridge
 *
 * Each entry maps one CSS custom property to its Figma variable.
 * Figma variable names use "Collection/Name" path format.
 *
 * type field:
 *   COLOR  — compared as {r,g,b,a}; transforms not needed
 *   FLOAT  — compared as number; supply a transform to convert the CSS string
 *   STRING — compared as trimmed string; no transform needed
 *
 * SCAFFOLD: the map is empty until tokens are extracted from the first
 * Claude Design package into brand/tokens/source/*.tokens.json.
 * Entry shape: { css: '--color-x', figma: 'Collection/Name', type: 'COLOR' }
 */

// ── Transform helpers ──────────────────────────────────────────────────────────
function remToPx(val)  { return parseFloat(val) * 16; }  // '1.5rem' → 24
function pxToNum(val)  { return parseFloat(val); }        // '8px'   → 8
function emToNum(val)  { return parseFloat(val); }        // '-0.02em' → -0.02
function msToNum(val)  { return parseFloat(val); }        // '120ms' → 120

// ── Token map ──────────────────────────────────────────────────────────────────
const TOKEN_MAP = [];

module.exports = { TOKEN_MAP, remToPx, pxToNum, emToNum, msToNum };
