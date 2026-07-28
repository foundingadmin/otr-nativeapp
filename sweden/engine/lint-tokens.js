#!/usr/bin/env node
/**
 * sweden/engine/lint-tokens.js
 * Token source validation. Exits 0 on pass, 1 on any failure.
 *
 * Checks:
 *   1. All 5 required source files present and valid JSON
 *   2. No duplicate token keys across the 5 source files
 *   3. All {alias} references resolve to a known token
 *   4. No orphaned entries in brand/token-map.js
 *      (every css: '--name' must exist in a source file)
 *   5. Each source file contains at least one token (non-empty)
 *
 * Usage:
 *   node sweden/engine/lint-tokens.js
 *   node sweden/engine/lint-tokens.js --json   # machine-readable output
 */

'use strict';

const fs   = require('fs');
const path = require('path');

const REPO_ROOT  = path.resolve(__dirname, '../..');
const SOURCE_DIR = path.join(REPO_ROOT, 'brand/tokens/source');
const MAP_PATH   = path.join(REPO_ROOT, 'brand/token-map.js');

const JSON_MODE = process.argv.includes('--json');

// ── Required files ────────────────────────────────────────────────────────────

const REQUIRED_FILES = [
  'color-primitives.tokens.json',
  'color-semantic.tokens.json',
  'typography.tokens.json',
  'spacing.tokens.json',
  'motion.tokens.json',
];

// ── Reporting helpers ─────────────────────────────────────────────────────────

const errors   = [];
const warnings = [];

function err(check, message, detail = null) {
  errors.push({ check, message, ...(detail ? { detail } : {}) });
}
function warn(check, message) {
  warnings.push({ check, message });
}

// ── Check 1: files present + valid JSON ──────────────────────────────────────

const sources = {};

for (const filename of REQUIRED_FILES) {
  const filepath = path.join(SOURCE_DIR, filename);
  const key      = filename.replace('.tokens.json', '');

  if (!fs.existsSync(filepath)) {
    err('required-files', `Missing source file: ${filename}`, { filepath });
    continue;
  }

  let parsed;
  try {
    parsed = JSON.parse(fs.readFileSync(filepath, 'utf8'));
  } catch (e) {
    err('valid-json', `Invalid JSON in ${filename}: ${e.message}`, { filepath });
    continue;
  }

  sources[key] = parsed;
}

// ── Build global token index ──────────────────────────────────────────────────
// Maps token name → { source, $value, $type }

const globalIndex  = {};  // name → { source, token }
const cssVarSet    = new Set(); // '--token-name' for each token

for (const [source, tokens] of Object.entries(sources)) {
  for (const [name, token] of Object.entries(tokens)) {
    if (name.startsWith('$')) continue; // skip $description etc.

    // ── Check 2: duplicates ───────────────────────────────────────
    if (globalIndex[name]) {
      err('no-duplicates',
        `Duplicate token key "${name}" found in both "${globalIndex[name].source}" and "${source}"`,
        { name, sources: [globalIndex[name].source, source] }
      );
    } else {
      globalIndex[name] = { source, token };
      cssVarSet.add(`--${name}`);
    }
  }
}

// ── Check 3: alias resolution ─────────────────────────────────────────────────
// Every {ref} must point to an existing token in the global index.

const ALIAS_RE = /^\{(.+)\}$/;

for (const [name, { source, token }] of Object.entries(globalIndex)) {
  const { $value, $type } = token;

  if (typeof $value === 'string' && ALIAS_RE.test($value)) {
    const ref = $value.match(ALIAS_RE)[1];
    if (!globalIndex[ref]) {
      err('alias-resolve',
        `"${name}" (${source}) references unknown token "{${ref}}"`,
        { name, source, ref }
      );
    }
  }

  // Check dark-mode extension aliases
  const darkVal = token.$extensions?.['com.metanoia.modes']?.dark;
  if (darkVal && typeof darkVal === 'string' && ALIAS_RE.test(darkVal)) {
    const ref = darkVal.match(ALIAS_RE)[1];
    if (!globalIndex[ref]) {
      err('alias-resolve',
        `"${name}" dark-mode extension references unknown token "{${ref}}"`,
        { name, source, ref }
      );
    }
  }
}

// ── Check 4: orphaned token-map entries ───────────────────────────────────────

if (!fs.existsSync(MAP_PATH)) {
  warn('token-map', 'brand/token-map.js not found — skipping orphan check');
} else {
  let tokenMap;
  try {
    ({ TOKEN_MAP: tokenMap } = require(MAP_PATH));
  } catch (e) {
    warn('token-map', `Could not load brand/token-map.js: ${e.message}`);
    tokenMap = null;
  }

  if (tokenMap) {
    for (const entry of tokenMap) {
      if (!entry.css) continue;
      if (!cssVarSet.has(entry.css)) {
        err('no-orphans',
          `token-map.js entry "${entry.css}" has no matching token in any source file`,
          { css: entry.css, figma: entry.figma }
        );
      }
    }
  }
}

// ── Check 5: non-empty source files ──────────────────────────────────────────

for (const [key, tokens] of Object.entries(sources)) {
  const tokenKeys = Object.keys(tokens).filter(k => !k.startsWith('$'));
  if (tokenKeys.length === 0) {
    err('non-empty', `Source file "${key}.tokens.json" contains no tokens`, { key });
  }
}

// ── Output ────────────────────────────────────────────────────────────────────

const pass     = errors.length === 0;
const summary  = {
  pass,
  tokenCount:   Object.keys(globalIndex).length,
  sourceCount:  Object.keys(sources).length,
  errorCount:   errors.length,
  warningCount: warnings.length,
  errors,
  warnings,
};

if (JSON_MODE) {
  console.log(JSON.stringify(summary, null, 2));
} else {
  const CHECK_LABELS = {
    'required-files': 'Required files',
    'valid-json':     'Valid JSON',
    'no-duplicates':  'No duplicates',
    'alias-resolve':  'Alias resolution',
    'no-orphans':     'No orphaned map entries',
    'non-empty':      'Non-empty source files',
  };

  console.log('');
  console.log('Sweden token lint');
  console.log('─────────────────────────────────────────');
  console.log(`  Source files : ${summary.sourceCount} / ${REQUIRED_FILES.length}`);
  console.log(`  Token count  : ${summary.tokenCount}`);
  console.log('');

  if (warnings.length > 0) {
    for (const w of warnings) {
      console.warn(`  ⚠  [${CHECK_LABELS[w.check] ?? w.check}] ${w.message}`);
    }
    console.log('');
  }

  if (errors.length > 0) {
    for (const e of errors) {
      console.error(`  ✗  [${CHECK_LABELS[e.check] ?? e.check}] ${e.message}`);
    }
    console.log('');
    console.error(`FAIL — ${errors.length} error(s) found\n`);
  } else {
    console.log(`  ✓  All checks passed (${warnings.length > 0 ? warnings.length + ' warning(s)' : 'clean'})\n`);
  }
}

process.exit(pass ? 0 : 1);
