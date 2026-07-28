/**
 * sweden/adapters/gslides-json/index.js
 * Token output adapter — flat JSON for Google Slides API.
 *
 * Reads brand/tokens/source/*.tokens.json and writes
 * brand/tokens/output/gslides/tokens.json.
 *
 * Keys mirror pptx-json exactly (dot-notation semantic grouping).
 *
 * Colors are formatted as Google Slides API RgbColor objects:
 *   "#094B77" → { red: 0.035, green: 0.294, blue: 0.467 }
 *   rgba(...) → { red: r, green: g, blue: b, alpha: a }  (if alpha < 1)
 *
 * All other values are identical to pptx-json.
 */

'use strict';

const fs   = require('fs');
const path = require('path');

// Re-use key mapping from pptx-json (keys are identical)
const { toKey } = require('../pptx-json/index.js');

// ── Color conversion ──────────────────────────────────────────────────────────

function round3(n) { return Math.round(n * 1000) / 1000; }

function toRgbColor(color) {
  if (typeof color !== 'string') return color;

  // rgba(r, g, b, a)
  const rgba = color.match(/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*([\d.]+))?\s*\)$/);
  if (rgba) {
    const obj = {
      red:   round3(parseInt(rgba[1], 10) / 255),
      green: round3(parseInt(rgba[2], 10) / 255),
      blue:  round3(parseInt(rgba[3], 10) / 255),
    };
    if (rgba[4] !== undefined && parseFloat(rgba[4]) < 1) obj.alpha = parseFloat(rgba[4]);
    return obj;
  }

  // #RRGGBB
  if (/^#[0-9A-Fa-f]{6}$/.test(color)) {
    return {
      red:   round3(parseInt(color.slice(1, 3), 16) / 255),
      green: round3(parseInt(color.slice(3, 5), 16) / 255),
      blue:  round3(parseInt(color.slice(5, 7), 16) / 255),
    };
  }

  return color; // fallback: not a color we can convert
}

// ── Value resolution (mirrors pptx-json, overrides color format) ──────────────

function parseDimension(val) {
  if (val === '0' || val === 0) return 0;
  if (typeof val === 'string') {
    if (val.endsWith('px'))  return parseFloat(val);
    if (val.endsWith('rem')) return Math.round(parseFloat(val) * 16 * 100) / 100;
  }
  return val;
}

function resolveValue(token, name, primitiveIndex) {
  const { $value, $type } = token;

  if (typeof $value === 'string' && $value.startsWith('{')) {
    const ref = $value.slice(1, -1);
    const prim = primitiveIndex[ref];
    if (prim) return resolveValue(prim, ref, primitiveIndex);
    return $value;
  }

  switch ($type) {
    case 'color':       return toRgbColor($value);
    case 'dimension':   return parseDimension($value);
    case 'fontFamily':  return Array.isArray($value) ? $value[0] : $value;
    case 'fontWeight':  return $value;
    case 'number':      return $value;
    case 'duration':    return typeof $value === 'string' && $value.endsWith('ms')
                          ? parseInt($value, 10)
                          : $value;
    case 'cubicBezier': return $value;
    case 'shadow':      return $value;
    default:            return $value;
  }
}

// ── Sources ───────────────────────────────────────────────────────────────────

const SOURCE_FILES = [
  'color-primitives',
  'color-semantic',
  'typography',
  'spacing',
  'motion',
];

// ── Public interface ──────────────────────────────────────────────────────────

/**
 * @param {string} sourceDir  Absolute path to brand/tokens/source/
 * @param {string} outputDir  Absolute path to brand/tokens/output/gslides/
 * @returns {{ file: string, tokenCount: number }}
 */
function run(sourceDir, outputDir) {
  // Build primitive index for alias resolution
  const primitiveIndex = {};
  const primRaw = JSON.parse(fs.readFileSync(path.join(sourceDir, 'color-primitives.tokens.json'), 'utf8'));
  for (const [k, v] of Object.entries(primRaw)) {
    if (!k.startsWith('$')) primitiveIndex[k] = v;
  }
  const typoRaw = JSON.parse(fs.readFileSync(path.join(sourceDir, 'typography.tokens.json'), 'utf8'));
  for (const [k, v] of Object.entries(typoRaw)) {
    if (!k.startsWith('$')) primitiveIndex[k] = v;
  }

  const output = {};

  for (const source of SOURCE_FILES) {
    const raw = JSON.parse(fs.readFileSync(path.join(sourceDir, `${source}.tokens.json`), 'utf8'));
    for (const [name, token] of Object.entries(raw)) {
      if (name.startsWith('$')) continue;
      const key = toKey(source, name);
      output[key] = resolveValue(token, name, primitiveIndex);
    }
  }

  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
  const dest     = path.join(outputDir, 'tokens.json');
  const content  = JSON.stringify(output, null, 2);
  const existing = fs.existsSync(dest) ? fs.readFileSync(dest, 'utf8') : null;
  const written  = existing === content ? 0 : 1;
  const skipped  = written === 0 ? 1 : 0;
  if (written) fs.writeFileSync(dest, content, 'utf8');

  return { written, skipped, files: [{ file: dest }], tokenCount: Object.keys(output).length };
}

module.exports = { run };
