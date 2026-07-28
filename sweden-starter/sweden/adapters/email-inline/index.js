'use strict';

/**
 * sweden/adapters/email-inline/index.js
 * Token output adapter — pre-resolved CSS for email templates.
 *
 * Reads brand/tokens/source/*.tokens.json and writes
 * brand/tokens/output/email/inline.css.
 *
 * All {alias} references are resolved to raw primitive values.
 * Email clients do not support CSS custom properties — this file is a
 * reference sheet for developers building HTML email templates.
 */

const fs   = require('fs');
const path = require('path');

const { resolveAllToCssMap } = require('../../engine/token-json-utils.js');

/**
 * @param {string} sourceDir  Absolute path to brand/tokens/source/
 * @param {string} outputDir  Absolute path to brand/tokens/output/email/
 * @returns {{ file: string, tokenCount: number }}
 */
function run(sourceDir, outputDir) {
  const cssMap = resolveAllToCssMap(sourceDir);

  const lines = [
    '/* =================================================================',
    '   Email Token Reference (generated — do not edit)',
    '   All {alias} references resolved to raw primitive values.',
    '   Use these values as inline style attributes in HTML email templates.',
    '   Regenerate: node sweden/engine/run-adapters.js',
    '   ================================================================= */',
    '',
    ':root {',
  ];

  for (const [key, value] of Object.entries(cssMap)) {
    lines.push(`  ${key}: ${value};`);
  }

  lines.push('}');

  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
  const dest     = path.join(outputDir, 'inline.css');
  const content  = lines.join('\n') + '\n';
  const existing = fs.existsSync(dest) ? fs.readFileSync(dest, 'utf8') : null;
  const written  = existing === content ? 0 : 1;
  const skipped  = written === 0 ? 1 : 0;
  if (written) fs.writeFileSync(dest, content, 'utf8');

  return { written, skipped, files: [{ file: dest }], tokenCount: Object.keys(cssMap).length };
}

module.exports = { run };
