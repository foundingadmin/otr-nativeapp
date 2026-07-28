#!/usr/bin/env node
/**
 * sweden/engine/run-adapters.js
 * Reads brand/BRAND.md for the enabled adapters list, then runs each one.
 *
 * Usage:
 *   node sweden/engine/run-adapters.js
 *   node sweden/engine/run-adapters.js --adapter web-css
 *
 * Each adapter must export a run(sourceDir, outputDir) function.
 * Output directories are created automatically.
 */

'use strict';

const fs   = require('fs');
const path = require('path');

const REPO_ROOT  = path.resolve(__dirname, '../..');
const SOURCE_DIR = path.join(REPO_ROOT, 'brand/tokens/source');
const OUTPUT_ROOT = path.join(REPO_ROOT, 'brand/tokens/output');

// ── Adapter registry ──────────────────────────────────────────────────────────

const ADAPTERS = {
  'web-css':      { module: '../adapters/web-css/index.js',      outDir: 'web'     },
  'pptx-json':    { module: '../adapters/pptx-json/index.js',    outDir: 'pptx'    },
  'gslides-json': { module: '../adapters/gslides-json/index.js', outDir: 'gslides' },
  'web-flat-json':{ module: '../adapters/web-flat-json/index.js',outDir: 'web-flat'},
  'email-inline': { module: '../adapters/email-inline/index.js', outDir: 'email'   },
};

// ── BRAND.md parser ───────────────────────────────────────────────────────────

function parseEnabledAdapters(brandMd) {
  // Find the ## Adapters section and extract enabled rows
  const section = brandMd.match(/## Adapters\s*\n([\s\S]*?)(?=\n## |\n---)/)?.[1] || '';
  const enabled = [];
  for (const line of section.split('\n')) {
    // Match table rows: | adapter-name | enabled |
    const m = line.match(/^\|\s*([\w-]+)\s*\|\s*enabled\s*\|/);
    if (m) enabled.push(m[1]);
  }
  return enabled;
}

// ── Runner ────────────────────────────────────────────────────────────────────

function main() {
  const brandMdPath = path.join(REPO_ROOT, 'brand/BRAND.md');
  const brandMd     = fs.readFileSync(brandMdPath, 'utf8');

  // --adapter flag overrides BRAND.md
  const flagIdx  = process.argv.indexOf('--adapter');
  const flagList = flagIdx !== -1 ? [process.argv[flagIdx + 1]] : null;

  const enabled  = flagList ?? parseEnabledAdapters(brandMd);

  if (enabled.length === 0) {
    console.error('No enabled adapters found in brand/BRAND.md (## Adapters section).');
    process.exit(1);
  }

  console.log(`Running ${enabled.length} adapter(s): ${enabled.join(', ')}\n`);

  let ok = 0;
  for (const name of enabled) {
    const entry = ADAPTERS[name];
    if (!entry) {
      console.warn(`  ⚠  Unknown adapter "${name}" — skipping`);
      continue;
    }

    const modulePath = path.resolve(__dirname, entry.module);
    if (!fs.existsSync(modulePath)) {
      console.warn(`  ⚠  Adapter "${name}" has no index.js yet (${entry.module}) — skipping`);
      continue;
    }

    const adapter  = require(modulePath);
    const outputDir = path.join(OUTPUT_ROOT, entry.outDir);

    process.stdout.write(`  ${name} → brand/tokens/output/${entry.outDir}/ ... `);
    try {
      const result = adapter.run(SOURCE_DIR, outputDir);
      const files  = result.files ?? (Array.isArray(result) ? result : (result.file ? [result] : []));
      const w      = result.written ?? files.length;
      const s      = result.skipped ?? 0;
      const tc     = result.tokenCount != null ? ` · ${result.tokenCount} tokens` : '';
      console.log(`${w} written, ${s} unchanged${tc}`);
      for (const f of files) {
        const label = w > 0 && s === 0 ? '✓' : (f.file && fs.existsSync(f.file) ? '–' : '✓');
        console.log(`    ${label} ${path.relative(REPO_ROOT, f.file)}`);
      }
      ok++;
    } catch (err) {
      console.log('FAILED');
      console.error(`    ✗ ${err.message}`);
    }
  }

  console.log(`\n${ok}/${enabled.length} adapter(s) succeeded.`);
  if (ok < enabled.length) process.exit(1);

  // Always rebuild the public CSS barrel so lab files stay in sync
  const { buildPublicCss } = require('./build-tokens.js');
  buildPublicCss();
  console.log('  ✓ showcase/public/colors_and_type.css rebuilt');
}

main();
