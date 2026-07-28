#!/usr/bin/env node
'use strict';

/**
 * generate-map.js — CSS var ↔ Figma variable path matcher.
 *
 * Usage:
 *   node sweden/engine/generate-map.js              print to stdout
 *   node sweden/engine/generate-map.js --write      overwrite brand/token-map.js
 *   node sweden/engine/generate-map.js --verify     compare against existing token-map.js
 *
 * Output format:
 *   { css: '--color-navy', figma: 'Primitives/Navy/Default', confidence: 0.97 }
 *
 * Confidence < 0.80 → flagged with LOW CONFIDENCE comment.
 */

const fs   = require('fs');
const path = require('path');

const ROOT      = path.join(__dirname, '..', '..');
const CSS_DIR   = path.join(ROOT, 'brand', 'tokens', 'output', 'web');
const BRAND_MD  = path.join(ROOT, 'brand', 'BRAND.md');
const TOKEN_MAP = path.join(ROOT, 'brand', 'token-map.js');

// ── CLI args ──────────────────────────────────────────────────────────────────

const args       = process.argv.slice(2);
const doWrite    = args.includes('--write');
const doVerify   = args.includes('--verify');

if (args.includes('--help')) {
  console.log([
    'Usage: node sweden/engine/generate-map.js [--write] [--verify]',
    '',
    '  (no flag)   Print generated token-map to stdout',
    '  --write     Overwrite brand/token-map.js with generated output',
    '  --verify    Compare generated map against existing brand/token-map.js',
  ].join('\n'));
  process.exit(0);
}

// ── Extract CSS custom properties ─────────────────────────────────────────────

function extractCssVars(dir) {
  const vars = [];
  if (!fs.existsSync(dir)) return vars;
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.css'));
  for (const filename of files) {
    const content = fs.readFileSync(path.join(dir, filename), 'utf8');
    const re = /--([a-z][a-z0-9-]+)\s*:/g;
    let m;
    while ((m = re.exec(content)) !== null) {
      const name = '--' + m[1];
      if (!vars.includes(name)) vars.push(name);
    }
  }
  return vars;
}

// ── Parse Figma collection paths from BRAND.md ───────────────────────────────

function parseFigmaCollections(brandMd) {
  const collections = {};
  if (!fs.existsSync(brandMd)) return collections;
  const content = fs.readFileSync(brandMd, 'utf8');

  // Look for Variable Collections section
  const collectionRe = /##?\s*Variable Collections?\s*\n([\s\S]*?)(?:\n##|$)/i;
  const match = collectionRe.exec(content);
  if (!match) return collections;

  const section = match[1];
  // Extract lines like: | Collection | ID |   or   | Name | Purpose |
  const rowRe = /\|\s*([^|]+)\s*\|\s*([^|]+)\s*\|/g;
  let m;
  while ((m = rowRe.exec(section)) !== null) {
    const name = m[1].trim();
    const val  = m[2].trim();
    if (name && val && name !== 'Collection' && name !== 'Name' && !name.startsWith('-')) {
      collections[name] = val;
    }
  }
  return collections;
}

// ── Semantic matcher ──────────────────────────────────────────────────────────

// Known collection name mappings
const COLLECTION_HINTS = {
  'color':    'Primitives',
  'fg':       'Semantic/Foreground',
  'bg':       'Semantic/Background',
  'border':   'Semantic/Border',
  'btn':      'Semantic/Button',
  'font':     'Typography',
  'fw':       'Typography/Font Weight',
  'fs':       'Typography/Font Size',
  'lh':       'Typography/Line Height',
  'ls':       'Typography/Letter Spacing',
  'space':    'Spacing',
  'radius':   'Spacing/Radius',
  'shadow':   'Spacing/Shadow',
  'container':'Spacing/Layout',
  'icon':     'Spacing/Icon',
  'ease':     'Motion/Easing',
  'dur':      'Motion/Duration',
};

function inferFigmaPath(cssVar) {
  // Remove -- prefix
  const name = cssVar.replace(/^--/, '');
  const segments = name.split('-');

  // Match leading segment to a collection hint
  for (const [prefix, collection] of Object.entries(COLLECTION_HINTS)) {
    const prefixSegs = prefix.split('-');
    const matches = prefixSegs.every((p, i) => segments[i] === p);
    if (matches) {
      const remainder = segments.slice(prefixSegs.length);

      // Build a Figma path from the remainder
      if (remainder.length === 0) {
        return { path: collection + '/Default', confidence: 0.85 };
      }

      // Capitalize each remainder segment for Figma path style
      const sub = remainder.map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('/');
      return { path: collection + '/' + sub, confidence: 0.90 };
    }
  }

  // Fallback: use the full name as Figma path with low confidence
  const fallback = segments
    .map(s => s.charAt(0).toUpperCase() + s.slice(1))
    .join('/');
  return { path: 'Unknown/' + fallback, confidence: 0.20 };
}

// ── Score against known token-map (for verify mode) ──────────────────────────

function loadExistingMap() {
  if (!fs.existsSync(TOKEN_MAP)) return [];
  try {
    const src = fs.readFileSync(TOKEN_MAP, 'utf8');
    const cleaned = src
      .replace(/^module\.exports\s*=\s*/m, '')
      .replace(/^export\s+default\s+/m, '')
      .trim()
      .replace(/;$/, '');
    const map = Function('"use strict"; return (' + cleaned + ')')();
    return Array.isArray(map) ? map : Object.values(map);
  } catch {
    return [];
  }
}

// ── Build map ─────────────────────────────────────────────────────────────────

const cssVars     = extractCssVars(CSS_DIR);
const collections = parseFigmaCollections(BRAND_MD);
const existingMap = doVerify ? loadExistingMap() : [];

const existingByVar = {};
for (const e of existingMap) {
  if (e.css) existingByVar[e.css] = e;
}

const entries = cssVars.map(cssVar => {
  const { path: figmaPath, confidence } = inferFigmaPath(cssVar);

  // If existing map has this var, use its figma path and boost confidence
  let finalPath = figmaPath;
  let finalConf = confidence;
  if (existingByVar[cssVar]) {
    finalPath = existingByVar[cssVar].figma;
    finalConf = Math.max(confidence, 0.92); // existing entries get boosted score
  }

  return { css: cssVar, figma: finalPath, confidence: parseFloat(finalConf.toFixed(2)) };
});

// Sort by confidence descending
entries.sort((a, b) => b.confidence - a.confidence);

// ── Format output ─────────────────────────────────────────────────────────────

function formatEntry(e) {
  const comment = e.confidence < 0.80 ? ' // LOW CONFIDENCE' : '';
  const cssCol   = JSON.stringify(e.css).padEnd(34);
  const figmaCol = JSON.stringify(e.figma).padEnd(50);
  return `  { css: ${cssCol} figma: ${figmaCol} confidence: ${e.confidence} },${comment}`;
}

const header = [
  '// token-map.js — CSS var ↔ Figma variable path mapping',
  '// Generated by sweden/engine/generate-map.js',
  '// Entries with confidence < 0.80 are flagged LOW CONFIDENCE — verify manually.',
  '//',
  '// Confidence scores:',
  '//   ≥ 0.90 — matched from existing map or strong semantic match',
  '//   0.80–0.89 — heuristic match — spot-check recommended',
  '//   < 0.80 — weak match — manual verification required',
  '',
  'module.exports = [',
].join('\n');

const footer = '];';

const body = entries.map(formatEntry).join('\n');
const output = header + '\n' + body + '\n' + footer + '\n';

// ── Execute ───────────────────────────────────────────────────────────────────

if (doVerify) {
  const missing   = entries.filter(e => !existingByVar[e.css]).map(e => e.css);
  const orphaned  = Object.keys(existingByVar).filter(v => !entries.find(e => e.css === v));
  const lowConf   = entries.filter(e => !existingByVar[e.css] && e.confidence < 0.80);

  console.log('generate-map verify');
  console.log('─'.repeat(50));
  console.log(`  CSS vars found:      ${cssVars.length}`);
  console.log(`  Existing map entries:${existingMap.length}`);
  console.log(`  New vars (not in map):${missing.length}`);
  console.log(`  Orphaned (map only): ${orphaned.length}`);
  console.log(`  Low confidence new:  ${lowConf.length}`);

  if (missing.length) {
    console.log('\nNew CSS vars not yet in token-map.js:');
    missing.forEach(v => console.log(`  ${v}`));
  }
  if (orphaned.length) {
    console.log('\nOrphaned entries in token-map.js (var no longer in CSS):');
    orphaned.forEach(v => console.log(`  ${v}`));
  }
  if (lowConf.length) {
    console.log('\nLow-confidence new entries (verify Figma path manually):');
    lowConf.forEach(e => console.log(`  ${e.css} → ${e.figma} (${e.confidence})`));
  }

  process.exit(orphaned.length > 0 || lowConf.length > 0 ? 1 : 0);
} else if (doWrite) {
  fs.writeFileSync(TOKEN_MAP, output, 'utf8');
  console.log(`generate-map: wrote ${entries.length} entries to brand/token-map.js`);
  const lowConf = entries.filter(e => e.confidence < 0.80);
  if (lowConf.length) {
    console.warn(`  ${lowConf.length} LOW CONFIDENCE entries — verify Figma paths manually`);
  }
} else {
  process.stdout.write(output);
}
