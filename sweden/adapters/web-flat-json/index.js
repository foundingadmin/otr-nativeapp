'use strict';

/**
 * sweden/adapters/web-flat-json/index.js
 * Token output adapter — flat JSON for any web consumer.
 *
 * Reads brand/tokens/source/*.tokens.json and writes
 * brand/tokens/output/web-flat/tokens.json.
 *
 * Key format:  CSS custom property name including "--" prefix
 *   { "--color-navy": "#094B77", "--bg-canvas": "#FFFFFF", "--fw-bold": "700" }
 *
 * Dark mode: tokens with $extensions.com.metanoia.modes.dark also get a
 * "--token-name--dark" key with the resolved dark value.
 *   { "--bg-canvas": "#FFFFFF", "--bg-canvas--dark": "#131A21" }
 *
 * Value format: all {alias} references resolved to their raw primitive values.
 */

const fs   = require('fs');
const path = require('path');

const {
  loadAllSourceTokens,
  resolveTokenAlias,
  tokenValueToCss,
  tokenKeyToCssVar,
} = require('../../engine/token-json-utils.js');

/**
 * @param {string} sourceDir  Absolute path to brand/tokens/source/
 * @param {string} outputDir  Absolute path to brand/tokens/output/web-flat/
 * @returns {{ file: string, tokenCount: number }}
 */
function run(sourceDir, outputDir) {
  const { allTokens } = loadAllSourceTokens(sourceDir);
  const output = {};

  for (const [key, token] of Object.entries(allTokens)) {
    // Light mode value (from $value, with alias resolution)
    const resolved = resolveTokenAlias(key, allTokens);
    if (resolved !== undefined) {
      output[tokenKeyToCssVar(key)] = tokenValueToCss(token.$type, resolved);
    }

    // Dark mode value (from $extensions.com.metanoia.modes.dark)
    const darkVal = token.$extensions?.['com.metanoia.modes']?.dark;
    if (darkVal !== undefined) {
      let resolvedDark;
      if (typeof darkVal === 'string' && darkVal.startsWith('{')) {
        // Dark value is an alias — resolve it
        const ref = darkVal.slice(1, -1);
        resolvedDark = resolveTokenAlias(ref, allTokens);
      } else {
        resolvedDark = darkVal;
      }
      if (resolvedDark !== undefined) {
        output[tokenKeyToCssVar(key) + '--dark'] = tokenValueToCss(token.$type, resolvedDark);
      }
    }
  }

  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
  const dest     = path.join(outputDir, 'tokens.json');
  const content  = JSON.stringify(output, null, 2) + '\n';
  const existing = fs.existsSync(dest) ? fs.readFileSync(dest, 'utf8') : null;
  const written  = existing === content ? 0 : 1;
  const skipped  = written === 0 ? 1 : 0;
  if (written) fs.writeFileSync(dest, content, 'utf8');

  return { written, skipped, files: [{ file: dest }], tokenCount: Object.keys(output).length };
}

module.exports = { run };
