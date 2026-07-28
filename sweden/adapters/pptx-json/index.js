/**
 * sweden/adapters/pptx-json/index.js
 * Token output adapter — flat JSON for python-pptx.
 *
 * Reads brand/tokens/source/*.tokens.json and writes
 * brand/tokens/output/pptx/tokens.json.
 *
 * Key format: dot-notation semantic grouping
 *   color-navy-700         → color.navy.700
 *   bg-canvas              → color.bg.canvas
 *   fs-16                  → typography.size.16
 *   typography.weight.bold → typography.weight.bold
 *   space-4                → spacing.4
 *
 * Value format: resolved primitives — no var() references
 *   color     → "#094B77" hex string
 *   dimension → px number (rem converted at 16px base)
 *   fontFamily → first font name string
 *   fontWeight → number
 *   number    → number
 *   duration  → ms as number
 *   cubicBezier → [x1, y1, x2, y2] array
 *   shadow    → string passthrough
 */

'use strict';

const fs   = require('fs');
const path = require('path');

// ── Key mapping ───────────────────────────────────────────────────────────────

function toKey(source, name) {
  switch (source) {
    case 'color-primitives': return primitiveKey(name);
    case 'color-semantic':   return `color.${name.replace(/-/g, '.')}`;
    case 'typography':       return typographyKey(name);
    case 'spacing':          return spacingKey(name);
    case 'motion':           return motionKey(name);
    default: return name.replace(/-/g, '.');
  }
}

function primitiveKey(n) {
  if (n === 'color-light-aqua') return 'color.aqua.light';
  if (n === 'color-dark-grey')  return 'color.grey.dark';
  const parts = n.replace(/^color-/, '').split('-');
  const STATUS = new Set(['success','warning','error','info']);
  if (STATUS.has(parts[0])) return `color.status.${parts.join('.')}`;
  return `color.${parts.join('.')}`;
}

function typographyKey(n) {
  if (n.startsWith('font-'))  return `typography.font.${n.slice(5)}`;
  if (n.startsWith('fw-'))    return `typography.weight.${n.slice(3)}`;
  if (n.startsWith('fs-'))    return `typography.size.${n.slice(3)}`;
  if (n.startsWith('lh-'))    return `typography.lineHeight.${n.slice(3)}`;
  if (n.startsWith('ls-'))    return `typography.letterSpacing.${n.slice(3)}`;
  return `typography.${n.replace(/-/g, '.')}`;
}

function spacingKey(n) {
  if (n.startsWith('space-'))     return `spacing.${n.slice(6)}`;
  if (n.startsWith('radius-'))    return `radius.${n.slice(7)}`;
  if (n.startsWith('shadow-'))    return `shadow.${n.slice(7)}`;
  if (n.startsWith('container-')) return `layout.container.${n.slice(10)}`;
  if (n.startsWith('icon-stroke-')) return `icon.stroke.${n.slice(12)}`;
  return n.replace(/-/g, '.');
}

function motionKey(n) {
  if (n.startsWith('ease-')) return `motion.ease.${n.slice(5)}`;
  if (n.startsWith('dur-'))  return `motion.duration.${n.slice(4)}`;
  return `motion.${n.replace(/-/g, '.')}`;
}

// ── Value resolution ──────────────────────────────────────────────────────────

function parseDimension(val) {
  if (val === '0' || val === 0) return 0;
  if (typeof val === 'string') {
    if (val.endsWith('px'))  return parseFloat(val);
    if (val.endsWith('rem')) return Math.round(parseFloat(val) * 16 * 100) / 100;
    // em values (letter-spacing etc.) — keep as string
  }
  return val;
}

function resolveValue(token, name, primitiveIndex) {
  const { $value, $type } = token;

  // Resolve alias
  if (typeof $value === 'string' && $value.startsWith('{')) {
    const ref = $value.slice(1, -1);
    const prim = primitiveIndex[ref];
    if (prim) return resolveValue(prim, ref, primitiveIndex);
    return $value; // unresolved — pass through
  }

  switch ($type) {
    case 'color':       return $value;
    case 'dimension':   return parseDimension($value);
    case 'fontFamily':  return Array.isArray($value) ? $value[0] : $value;
    case 'fontWeight':  return $value;
    case 'number':      return $value;
    case 'duration':    return typeof $value === 'string' && $value.endsWith('ms')
                          ? parseInt($value, 10)
                          : $value;
    case 'cubicBezier': return $value; // [x1, y1, x2, y2]
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
 * @param {string} outputDir  Absolute path to brand/tokens/output/pptx/
 * @returns {{ file: string, tokenCount: number }}
 */
function run(sourceDir, outputDir) {
  // Build primitive index for alias resolution
  const primitiveIndex = {};
  const primRaw = JSON.parse(fs.readFileSync(path.join(sourceDir, 'color-primitives.tokens.json'), 'utf8'));
  for (const [k, v] of Object.entries(primRaw)) {
    if (!k.startsWith('$')) primitiveIndex[k] = v;
  }
  // Also index typography for font-brand alias
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

module.exports = { run, toKey };
