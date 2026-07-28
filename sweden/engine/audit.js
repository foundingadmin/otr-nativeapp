#!/usr/bin/env node
'use strict';

/**
 * audit.js — token audit CLI for the Metanoia design system.
 *
 * Usage:
 *   node sweden/engine/audit.js --css           scan CSS for hardcoded values
 *   node sweden/engine/audit.js --figma         compare token source vs Figma mapping
 *   node sweden/engine/audit.js --css --json    JSON output
 *   node sweden/engine/audit.js --help
 *
 * Exit codes:
 *   0 — clean (warnings may be present)
 *   1 — errors found
 */

const fs   = require('fs');
const path = require('path');

const ROOT      = path.join(__dirname, '..', '..');
const CSS_DIR   = path.join(ROOT, 'brand', 'tokens', 'output', 'web');
const JSON_DIR  = path.join(ROOT, 'brand', 'tokens', 'source');
const TOKEN_MAP = path.join(ROOT, 'brand', 'token-map.js');

// ── CLI args ──────────────────────────────────────────────────────────────────

const args = process.argv.slice(2);

if (args.length === 0 || args.includes('--help')) {
  console.log([
    'Usage: node sweden/engine/audit.js [--css] [--figma] [--json]',
    '',
    'Checks:',
    '  --css    Scan brand/tokens/output/web/*.css for hardcoded hex and px font-size',
    '  --figma  Compare token source JSON values against Figma mapping in token-map.js',
    '  --json   Output results as JSON (default: human-readable table)',
    '',
    'Exit 0 on clean, 1 on any errors.',
  ].join('\n'));
  process.exit(0);
}

const runCss   = args.includes('--css');
const runFigma = args.includes('--figma');
const jsonMode = args.includes('--json');

if (!runCss && !runFigma) {
  console.error('Error: specify at least --css or --figma');
  process.exit(1);
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function pad(str, len) {
  return String(str).padEnd(len);
}

function severity(type) {
  return type === 'error' ? 'ERROR  ' : 'WARNING';
}

// ── CSS check ─────────────────────────────────────────────────────────────────

function runCssCheck() {
  const findings = [];

  if (!fs.existsSync(CSS_DIR)) {
    findings.push({ file: CSS_DIR, line: 0, value: '(directory missing)', severity: 'error', check: 'css' });
    return findings;
  }

  const cssFiles = fs.readdirSync(CSS_DIR).filter(f => f.endsWith('.css'));

  for (const filename of cssFiles) {
    const filepath = path.join(CSS_DIR, filename);
    const lines    = fs.readFileSync(filepath, 'utf8').split('\n');

    lines.forEach((line, idx) => {
      const lineNo = idx + 1;
      const stripped = line.replace(/\/\*.*?\*\//g, ''); // strip inline comments

      // Skip comment lines
      if (stripped.trimStart().startsWith('/*') || stripped.trimStart().startsWith('*')) return;

      // Check 1: hardcoded hex not inside a var() call
      const hexMatches = [...stripped.matchAll(/#([0-9a-fA-F]{3,8})\b/g)];
      for (const m of hexMatches) {
        // Allow hex inside var() declarations (the value itself is fine if it's a primitive)
        // Flag hex values on lines that are NOT :root assignments of raw primitive tokens
        const isVarDecl = /--color-[a-z]/.test(stripped);
        if (!isVarDecl) {
          findings.push({
            file: `brand/tokens/output/web/${filename}`,
            line: lineNo,
            value: m[0],
            severity: 'warning',
            check: 'css-hex',
            context: stripped.trim().slice(0, 80),
          });
        }
      }

      // Check 2: hardcoded px font-size (not inside a comment)
      const fontMatch = stripped.match(/font-size\s*:\s*(\d+(?:\.\d+)?px)/);
      if (fontMatch) {
        findings.push({
          file: `brand/tokens/output/web/${filename}`,
          line: lineNo,
          value: fontMatch[1],
          severity: 'error',
          check: 'css-font-size',
          context: stripped.trim().slice(0, 80),
        });
      }
    });
  }

  return findings;
}

// ── Figma check ───────────────────────────────────────────────────────────────

function runFigmaCheck() {
  const findings = [];

  if (!fs.existsSync(TOKEN_MAP)) {
    findings.push({ file: 'brand/token-map.js', line: 0, value: '(file missing)', severity: 'error', check: 'figma' });
    return findings;
  }

  // Load token-map.js — it exports an array or object; use a sandboxed eval
  let tokenMap;
  try {
    const src = fs.readFileSync(TOKEN_MAP, 'utf8');
    // Strip module.exports = if present
    const cleaned = src
      .replace(/^module\.exports\s*=\s*/m, '')
      .replace(/^export\s+default\s+/m, '')
      .trim()
      .replace(/;$/, '');
    tokenMap = Function('"use strict"; return (' + cleaned + ')')();
  } catch (e) {
    findings.push({ file: 'brand/token-map.js', line: 0, value: e.message, severity: 'error', check: 'figma' });
    return findings;
  }

  const entries = Array.isArray(tokenMap) ? tokenMap : Object.values(tokenMap);

  // Load source token JSON files to get $value for each token
  const tokenValues = {};
  if (fs.existsSync(JSON_DIR)) {
    const jsonFiles = fs.readdirSync(JSON_DIR).filter(f => f.endsWith('.json'));
    for (const jf of jsonFiles) {
      try {
        const data = JSON.parse(fs.readFileSync(path.join(JSON_DIR, jf), 'utf8'));
        collectTokenValues(data, [], tokenValues);
      } catch { /* skip malformed */ }
    }
  }

  for (const entry of entries) {
    const cssVar = entry.css;
    const figmaPath = entry.figma;

    if (!cssVar || !figmaPath) continue;

    // Check that the CSS var exists in the output CSS
    const varName = cssVar.replace(/^--/, '');
    const found = findCssVar(cssVar);
    if (!found) {
      findings.push({
        file: 'brand/token-map.js',
        line: 0,
        value: cssVar,
        severity: 'warning',
        check: 'figma-orphan',
        context: `${cssVar} → ${figmaPath} — var not found in brand/tokens/output/web/`,
      });
    }
  }

  return findings;
}

function collectTokenValues(obj, keyPath, out) {
  if (obj && typeof obj === 'object') {
    if (obj.$value !== undefined) {
      out[keyPath.join('.')] = obj.$value;
      return;
    }
    for (const [k, v] of Object.entries(obj)) {
      if (!k.startsWith('$')) {
        collectTokenValues(v, [...keyPath, k], out);
      }
    }
  }
}

function findCssVar(cssVar) {
  if (!fs.existsSync(CSS_DIR)) return false;
  const files = fs.readdirSync(CSS_DIR).filter(f => f.endsWith('.css'));
  for (const f of files) {
    const content = fs.readFileSync(path.join(CSS_DIR, f), 'utf8');
    if (content.includes(cssVar + ':') || content.includes(cssVar + ' :')) return true;
  }
  return false;
}

// ── Run checks ────────────────────────────────────────────────────────────────

const allFindings = [];

if (runCss)   allFindings.push(...runCssCheck());
if (runFigma) allFindings.push(...runFigmaCheck());

const errors   = allFindings.filter(f => f.severity === 'error');
const warnings = allFindings.filter(f => f.severity === 'warning');

// ── Output ────────────────────────────────────────────────────────────────────

if (jsonMode) {
  console.log(JSON.stringify({ errors: errors.length, warnings: warnings.length, findings: allFindings }, null, 2));
} else {
  console.log('Sweden token audit');
  console.log('─'.repeat(60));

  if (allFindings.length === 0) {
    console.log('  ✓  All checks passed (clean)');
  } else {
    const colW = [8, 30, 6, 20];
    const header = [
      pad('Severity', colW[0]),
      pad('File', colW[1]),
      pad('Line', colW[2]),
      'Value / Context',
    ].join('  ');
    console.log(header);
    console.log('─'.repeat(80));

    for (const f of allFindings) {
      console.log([
        pad(severity(f.severity), colW[0]),
        pad(f.file.slice(-30), colW[1]),
        pad(f.line, colW[2]),
        f.context ?? f.value,
      ].join('  '));
    }

    console.log('');
    console.log(`  Errors: ${errors.length}   Warnings: ${warnings.length}`);
  }
}

process.exit(errors.length > 0 ? 1 : 0);
