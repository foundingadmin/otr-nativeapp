#!/usr/bin/env node
'use strict';

/**
 * html-to-astro — translates showcase/preview/*.html component cards to .astro files.
 *
 * Usage:
 *   node sweden/translators/html-to-astro/index.js <input.html> [--out <dir>]
 *
 * Default output dir: brand/components/astro/
 *
 * Rules:
 *   - Preserve all var(--token-name) references — never resolve hardcoded values
 *   - Extract <style> block → scoped Astro <style>
 *   - Extract <script> block(s) → Astro <script>
 *   - Convert data-* attributes to Astro props in frontmatter
 *   - Warn (do not fail) if hardcoded hex or px font-size found in output
 */

const fs   = require('fs');
const path = require('path');

// ── CLI args ──────────────────────────────────────────────────────────────────

const args = process.argv.slice(2);

if (args.length === 0 || args[0] === '--help') {
  console.log([
    'Usage: node sweden/translators/html-to-astro/index.js <input.html> [--out <dir>]',
    '',
    'Options:',
    '  --out <dir>   Output directory (default: brand/components/astro/)',
    '  --help        Show this message',
  ].join('\n'));
  process.exit(0);
}

const inputFile = args[0];
let outDir = path.join(__dirname, '..', '..', '..', 'brand', 'components', 'astro');

const outIdx = args.indexOf('--out');
if (outIdx !== -1 && args[outIdx + 1]) {
  outDir = path.resolve(args[outIdx + 1]);
}

// ── Read input ────────────────────────────────────────────────────────────────

if (!fs.existsSync(inputFile)) {
  console.error(`Error: file not found: ${inputFile}`);
  process.exit(1);
}

const html = fs.readFileSync(inputFile, 'utf8');
const basename = path.basename(inputFile, path.extname(inputFile));

// ── Extract blocks ────────────────────────────────────────────────────────────

function extractBlock(src, tagName) {
  const openRe  = new RegExp(`<${tagName}[^>]*>`, 'i');
  const closeRe = new RegExp(`</${tagName}>`, 'i');
  const openMatch = openRe.exec(src);
  if (!openMatch) return { inner: '', attrs: '', rest: src };

  const start     = openMatch.index;
  const afterOpen = start + openMatch[0].length;
  const closeIdx  = src.search(closeRe);
  if (closeIdx === -1) return { inner: '', attrs: '', rest: src };

  const inner = src.slice(afterOpen, closeIdx);
  const rest  = src.slice(0, start) + src.slice(closeIdx + `</${tagName}>`.length);
  const attrMatch = /<[^>]+>/.exec(openMatch[0]);
  const attrs = attrMatch ? attrMatch[0] : '';
  return { inner, attrs, rest };
}

function extractAllBlocks(src, tagName) {
  const blocks = [];
  let remaining = src;
  let safety = 20;
  while (safety-- > 0) {
    const { inner, rest } = extractBlock(remaining, tagName);
    if (!inner && rest === remaining) break;
    if (inner) blocks.push(inner);
    remaining = rest;
  }
  return { blocks, rest: remaining };
}

// Extract <style>
const { inner: styleContent, rest: afterStyle } = extractBlock(html, 'style');

// Extract all <script> blocks
const { blocks: scriptBlocks, rest: afterScripts } = extractAllBlocks(afterStyle, 'script');

// Everything left is the template body
let templateBody = afterScripts;

// ── Extract data-* props from root element ────────────────────────────────────

function extractDataProps(src) {
  const props = {};
  const rootTagMatch = src.match(/<([a-z][a-z0-9-]*)([^>]*)>/i);
  if (!rootTagMatch) return props;
  const attrString = rootTagMatch[2];
  const dataRe = /data-([a-z][a-z0-9-]*)="([^"]*)"/g;
  let m;
  while ((m = dataRe.exec(attrString)) !== null) {
    const key = m[1].replace(/-([a-z])/g, (_, c) => c.toUpperCase()); // camelCase
    props[key] = m[2];
  }
  return props;
}

const dataProps = extractDataProps(templateBody);

// ── Strip <html>, <head>, <body> wrappers if present ─────────────────────────

function stripWrapper(src, tag) {
  return src
    .replace(new RegExp(`<${tag}[^>]*>`, 'i'), '')
    .replace(new RegExp(`</${tag}>`, 'i'), '');
}

for (const wrapper of ['html', 'head', 'body']) {
  templateBody = stripWrapper(templateBody, wrapper);
}

// Remove DOCTYPE
templateBody = templateBody.replace(/<!DOCTYPE[^>]*>/i, '');

// Remove <link> tags (token CSS is bundled by Astro)
templateBody = templateBody.replace(/<link[^>]*>/gi, '');

// Remove <title> tags
templateBody = templateBody.replace(/<title>[^<]*<\/title>/gi, '');

// Clean up excessive blank lines
templateBody = templateBody.replace(/\n{3,}/g, '\n\n').trim();

// ── Build frontmatter ─────────────────────────────────────────────────────────

const propNames = Object.keys(dataProps);
let frontmatter = '---\n';
if (propNames.length > 0) {
  const propTypes = propNames.map(k => `${k}?: string`).join('; ');
  frontmatter += `interface Props { ${propTypes} }\n`;
  frontmatter += `const { ${propNames.join(', ')} } = Astro.props;\n`;
  const defaults = propNames
    .map(k => `// Default: ${k} = "${dataProps[k]}"`)
    .join('\n');
  frontmatter += defaults + '\n';
}
frontmatter += '---\n';

// ── Detect hardcoded values (warnings) ────────────────────────────────────────

const warnings = [];

const hexRe = /#[0-9a-fA-F]{3,8}\b/g;
const pxFontRe = /font-size\s*:\s*\d+px/g;

for (const [label, content] of [
  ['<style>', styleContent],
  ['template', templateBody],
]) {
  const hexMatches = [...(content.matchAll(hexRe))].map(m => m[0]);
  const fontMatches = [...(content.matchAll(pxFontRe))].map(m => m[0]);
  if (hexMatches.length) warnings.push(`  ${label}: hardcoded hex: ${[...new Set(hexMatches)].join(', ')}`);
  if (fontMatches.length) warnings.push(`  ${label}: hardcoded font-size: ${[...new Set(fontMatches)].join(', ')}`);
}

// ── Compose output ────────────────────────────────────────────────────────────

const parts = [frontmatter, templateBody];

if (styleContent.trim()) {
  parts.push('\n<style>\n' + styleContent + '\n</style>');
}

for (const script of scriptBlocks) {
  if (script.trim()) {
    parts.push('\n<script>\n' + script + '\n</script>');
  }
}

const output = parts.join('\n');

// ── Write output ──────────────────────────────────────────────────────────────

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const outFile = path.join(outDir, basename + '.astro');
fs.writeFileSync(outFile, output, 'utf8');

console.log(`html-to-astro`);
console.log(`  input:  ${inputFile}`);
console.log(`  output: ${outFile}`);

if (warnings.length > 0) {
  console.warn('\nWarnings — hardcoded values detected (replace with var(--token-name)):');
  warnings.forEach(w => console.warn(w));
} else {
  console.log('  tokens: clean — no hardcoded hex or px font-size found');
}
