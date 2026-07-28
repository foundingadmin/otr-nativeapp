'use strict';

/**
 * sweden/engine/token-json-utils.js
 * Shared utility — W3C Design Token JSON loading, alias resolution, value formatting.
 *
 * Used by:
 *   sync-figma-to-repo.js  — read source JSON for diffing, serialize changes back
 *   sync-repo-to-figma.js  — resolve tokens before pushing to Figma
 *   adapters/web-flat-json — produce resolved flat JSON (with dark mode variants)
 *   adapters/email-inline  — produce resolved flat CSS
 */

const fs   = require('fs');
const path = require('path');

const SOURCE_FILES = [
  'color-primitives',
  'color-semantic',
  'typography',
  'spacing',
  'motion',
];

const GENERIC_FONT_KEYWORDS = new Set([
  'ui-sans-serif', 'system-ui', '-apple-system', 'ui-monospace',
  'sans-serif', 'serif', 'monospace', 'cursive', 'fantasy', 'math',
]);

// ── Internal helpers ──────────────────────────────────────────────────────────

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Matches any JSON scalar value: quoted string, number, or simple flat array.
// Used by serializeTokenFile for targeted in-place replacement.
const JSON_VALUE_PATTERN = '(?:"(?:[^"\\\\]|\\\\.)*"|[-\\d.]+|\\[[^\\]]*\\])';

// ── Loaders ───────────────────────────────────────────────────────────────────

/**
 * Load all 5 source token files from sourceDir.
 *
 * Returns:
 *   allTokens — flat map { tokenName: { $value, $type, ...rest } } across all files
 *   byFile    — ordered array [{ name, filePath, data, keys: Set<string> }]
 *               data is the parsed JSON object (mutate it for in-place JSON diff)
 *
 * Each data object has three non-enumerable metadata properties attached:
 *   _rawContent    — original file content string (for serializeTokenFile)
 *   _valueChanges  — Map<tokenKey, newValue> for $value replacements
 *   _darkChanges   — Map<tokenKey, newDarkValue> for dark-mode extension replacements
 * Non-enumerable means invisible to JSON.stringify, Object.keys, and for...in.
 */
function loadAllSourceTokens(sourceDir) {
  const allTokens = {};
  const byFile    = [];

  for (const name of SOURCE_FILES) {
    const filePath   = path.join(sourceDir, `${name}.tokens.json`);
    const rawContent = fs.readFileSync(filePath, 'utf8');
    const data       = JSON.parse(rawContent);
    const keys       = new Set();

    for (const [k, v] of Object.entries(data)) {
      if (k.startsWith('$')) continue;
      allTokens[k] = v;
      keys.add(k);
    }

    Object.defineProperty(data, '_rawContent',   { value: rawContent, enumerable: false, writable: false });
    Object.defineProperty(data, '_valueChanges', { value: new Map(),  enumerable: false, writable: false });
    Object.defineProperty(data, '_darkChanges',  { value: new Map(),  enumerable: false, writable: false });

    byFile.push({ name, filePath, data, keys });
  }

  return { allTokens, byFile };
}

// ── Alias resolution ──────────────────────────────────────────────────────────

/**
 * Resolve a W3C {alias} reference chain to its raw primitive $value.
 * Operates on a flat allTokens map from loadAllSourceTokens().
 * Returns the resolved $value (string, number, or array).
 *
 * Warns to console if the chain exceeds depth 3 — a design signal that
 * the token architecture may have unnecessary indirection.
 */
function resolveTokenAlias(key, allTokens, depth) {
  if (depth === undefined) depth = 0;
  if (depth > 10) return undefined;
  if (depth > 3) {
    console.warn(`[token-json-utils] Deep alias chain (depth ${depth}) for token "${key}" — check token architecture`);
  }

  const token = allTokens[key];
  if (!token) return undefined;

  const val = token.$value;
  if (typeof val === 'string' && val.startsWith('{') && val.endsWith('}')) {
    const ref = val.slice(1, -1);
    return resolveTokenAlias(ref, allTokens, depth + 1);
  }
  return val;
}

// ── CSS var name helpers ──────────────────────────────────────────────────────

/** '--color-navy' → 'color-navy' */
function cssVarToTokenKey(cssVar) {
  return cssVar.slice(2);
}

/** 'color-navy' → '--color-navy' */
function tokenKeyToCssVar(key) {
  return '--' + key;
}

// ── Value → CSS string ────────────────────────────────────────────────────────

/**
 * Convert a resolved (non-alias) token value to its CSS representation.
 * Mirrors web-css/index.js formatValue() for all non-alias cases.
 *
 * @param {string} type          — token $type
 * @param {*}      resolvedValue — raw resolved $value (string, number, or array)
 * @returns {string}
 */
function tokenValueToCss(type, resolvedValue) {
  if (type === 'color') {
    return String(resolvedValue);
  }

  if (type === 'fontFamily') {
    if (Array.isArray(resolvedValue)) {
      return resolvedValue.map(f => {
        if (GENERIC_FONT_KEYWORDS.has(f)) return f;
        if (f.includes(' ') || f === 'Figtree') return `"${f}"`;
        return f;
      }).join(', ');
    }
    return String(resolvedValue);
  }

  if (type === 'cubicBezier') {
    const [x1, y1, x2, y2] = resolvedValue;
    return `cubic-bezier(${x1}, ${y1}, ${x2}, ${y2})`;
  }

  if (type === 'duration') return String(resolvedValue);
  if (type === 'dimension') return resolvedValue === 0 ? '0' : String(resolvedValue);
  if (type === 'fontWeight') return String(resolvedValue);
  if (type === 'number') return String(resolvedValue);
  if (type === 'shadow') return String(resolvedValue);

  return String(resolvedValue);
}

// ── Serializer — targeted in-place replacement ────────────────────────────────

/**
 * Serialize a token file back to its original format, replacing only changed values.
 *
 * Takes the mutated data object (from diffAndPatchJson) and reads:
 *   data._rawContent   — original file content (set by loadAllSourceTokens)
 *   data._valueChanges — Map<tokenKey, newValue> for $value replacements
 *   data._darkChanges  — Map<tokenKey, newDarkValue> for $extensions dark replacements
 *
 * Works line-by-line on the original string so all existing formatting —
 * column alignment, blank lines between groups, comments — is preserved exactly.
 * Each changed token produces exactly one changed line in the git diff.
 *
 * Integrity test: for a file with zero changes, serializeTokenFile(data)
 * must return rawContent byte-for-byte. If it doesn't, the serializer is broken.
 */
function serializeTokenFile(data) {
  const rawContent   = data._rawContent;
  const valueChanges = data._valueChanges;
  const darkChanges  = data._darkChanges;

  if (valueChanges.size === 0 && darkChanges.size === 0) {
    return rawContent;
  }

  const lines = rawContent.split('\n');

  for (const [key, newValue] of valueChanges) {
    const keyJson      = JSON.stringify(key);
    const newValueJson = JSON.stringify(newValue);
    for (let i = 0; i < lines.length; i++) {
      if (!lines[i].includes(keyJson)) continue;
      const re = new RegExp(
        `(${escapeRegex(keyJson)}\\s*:\\s*\\{\\s*"\\$value"\\s*:\\s*)${JSON_VALUE_PATTERN}`,
        'g'
      );
      const updated = lines[i].replace(re, (_, prefix) => prefix + newValueJson);
      if (updated !== lines[i]) { lines[i] = updated; break; }
    }
  }

  for (const [key, newDark] of darkChanges) {
    const keyJson     = JSON.stringify(key);
    const newDarkJson = JSON.stringify(newDark);
    for (let i = 0; i < lines.length; i++) {
      if (!lines[i].includes(keyJson)) continue;
      // Replace the "dark": value within $extensions on the same line as the token key.
      // [^\n]* stops at newline so this never crosses into adjacent tokens.
      const re = new RegExp(
        `(${escapeRegex(keyJson)}[^\\n]*?"dark"\\s*:\\s*)${JSON_VALUE_PATTERN}`,
        'g'
      );
      const updated = lines[i].replace(re, (_, prefix) => prefix + newDarkJson);
      if (updated !== lines[i]) { lines[i] = updated; break; }
    }
  }

  return lines.join('\n');
}

// ── Convenience: full resolved CSS map ───────────────────────────────────────

/**
 * Load all source tokens, resolve every alias chain, return a flat map:
 *   { '--token-name': 'css-value-string' }
 *
 * Suitable for email-inline and sync-repo-to-figma.
 * For web-flat-json, use loadAllSourceTokens directly (needs dark mode access).
 */
function resolveAllToCssMap(sourceDir) {
  const { allTokens } = loadAllSourceTokens(sourceDir);
  const out = {};

  for (const [key, token] of Object.entries(allTokens)) {
    const resolved = resolveTokenAlias(key, allTokens);
    if (resolved === undefined) continue;
    out[tokenKeyToCssVar(key)] = tokenValueToCss(token.$type, resolved);
  }

  return out;
}

module.exports = {
  loadAllSourceTokens,
  resolveTokenAlias,
  tokenValueToCss,
  resolveAllToCssMap,
  cssVarToTokenKey,
  tokenKeyToCssVar,
  serializeTokenFile,
  SOURCE_FILES,
};
