/**
 * sweden/adapters/web-css/index.js
 * Token output adapter — CSS custom properties.
 *
 * Reads brand/tokens/source/*.tokens.json and writes CSS files to
 * brand/tokens/output/web/. Output is byte-for-byte identical to the
 * hand-authored CSS in brand/tokens/.
 *
 * run(sourceDir, outputDir, options?)
 *   options.file  — only build this one file (e.g. 'color-primitives')
 */

'use strict';

const fs   = require('fs');
const path = require('path');

// ── Value formatters ──────────────────────────────────────────────────────────

const GENERIC_FONT_KEYWORDS = new Set([
  'ui-sans-serif','system-ui','-apple-system','ui-monospace',
  'sans-serif','serif','monospace','cursive','fantasy','math',
]);

function formatValue(token, primitives) {
  const { $value, $type } = token;

  if ($type === 'fontFamily') {
    if (typeof $value === 'string' && $value.startsWith('{')) {
      return `var(--${$value.match(/^\{(.+)\}$/)[1]})`;
    }
    return $value.map(f => {
      if (GENERIC_FONT_KEYWORDS.has(f)) return f;
      if (f.includes(' ')) return `"${f}"`;
      return f;
    }).join(', ');
  }

  if ($type === 'cubicBezier') {
    if (typeof $value === 'string') return $value;
    const [x1, y1, x2, y2] = $value;
    return `cubic-bezier(${x1}, ${y1}, ${x2}, ${y2})`;
  }

  if ($type === 'color') {
    if (typeof $value === 'string' && $value.startsWith('{')) {
      return `var(--${$value.slice(1, -1)})`;
    }
    return $value;
  }

  if ($type === 'duration') return $value;
  if ($type === 'dimension') return $value === 0 ? '0' : String($value);
  if ($type === 'fontWeight') return String($value);
  if ($type === 'number') return String($value);
  if ($type === 'shadow') return $value;

  return String($value);
}

function formatDark(darkVal) {
  if (typeof darkVal === 'string' && darkVal.startsWith('{')) {
    return `var(--${darkVal.slice(1, -1)})`;
  }
  return darkVal;
}

// ── Per-file builders ─────────────────────────────────────────────────────────

function buildColorPrimitives(src) {
  const tokens = JSON.parse(fs.readFileSync(path.join(src, 'color-primitives.tokens.json'), 'utf8'));

  const padMain = (n) => `--${n}:`.padEnd(21);
  const padSW   = (n) => `--${n}:`.padEnd(22);
  const padErr  = (n) => `--${n}:`.padEnd(20);
  const padInfo = (n) => `--${n}:`.padEnd(19);
  const v       = (n) => tokens[n].$value;

  const brand      = ['color-navy','color-aqua','color-light-aqua','color-white','color-black','color-grey','color-dark-grey'];
  const navy       = ['color-navy-900','color-navy-700','color-navy-500','color-navy-100'];
  const aqua       = ['color-aqua-700','color-aqua-500','color-aqua-300','color-aqua-200','color-aqua-50'];
  const grey       = ['color-grey-900','color-grey-800','color-grey-700','color-grey-600','color-grey-500','color-grey-400','color-grey-300','color-grey-200','color-grey-100','color-grey-50'];
  const statusBase = ['color-success','color-warning','color-error','color-info'];
  const success    = ['color-success-200','color-success-400','color-success-600','color-success-800','color-success-1000'];
  const warning    = ['color-warning-200','color-warning-400','color-warning-600','color-warning-800','color-warning-1000'];
  const error      = ['color-error-50','color-error-200','color-error-400','color-error-600','color-error-700','color-error-800','color-error-1000'];
  const info       = ['color-info-200','color-info-400','color-info-600','color-info-800','color-info-1000'];

  return join([
    '/* ============================================================',
    '   Color Primitives',
    '   Raw palette values only. No var() references.',
    '   Source of truth: brand identity guide (see brand/BRAND.md).',
    '   Use semantic aliases (color-semantic.css) in components.',
    '   ============================================================ */',
    '',
    ':root {',
    '  /* ── Brand ──────────────────────────────────────────────── */',
    ...brand.map(n => `  ${padMain(n)}${v(n)};`),
    '',
    '  /* ── Navy scale ─────────────────────────────────────────── */',
    ...navy.map(n => `  ${padMain(n)}${v(n)};`),
    '',
    '  /* ── Aqua scale ─────────────────────────────────────────── */',
    ...aqua.map(n => `  ${padMain(n)}${v(n)};`),
    '',
    '  /* ── Grey scale (cool, ~210° hue) ───────────────────────── */',
    ...grey.map(n => `  ${padMain(n)}${v(n)};`),
    '',
    '  /* ── Status — base ──────────────────────────────────────── */',
    ...statusBase.map(n => `  ${padMain(n)}${v(n)};`),
    '',
    '  /* ── Success scale ──────────────────────────────────────── */',
    ...success.map(n => `  ${padSW(n)}${v(n)};`),
    '',
    '  /* ── Warning scale ──────────────────────────────────────── */',
    ...warning.map(n => `  ${padSW(n)}${v(n)};`),
    '',
    '  /* ── Error scale ────────────────────────────────────────── */',
    ...error.map(n => `  ${padErr(n)}${v(n)};`),
    '',
    '  /* ── Info scale ─────────────────────────────────────────── */',
    ...info.map(n => `  ${padInfo(n)}${v(n)};`),
    '}',
    '',
  ]);
}

function buildColorSemantic(src) {
  const tokens     = JSON.parse(fs.readFileSync(path.join(src, 'color-semantic.tokens.json'), 'utf8'));
  const primitives = JSON.parse(fs.readFileSync(path.join(src, 'color-primitives.tokens.json'), 'utf8'));

  const cssVal  = (n) => formatValue(tokens[n], primitives);
  const darkVal = (n) => {
    const ext = tokens[n].$extensions?.['com.sweden.modes']?.dark;
    return ext ? formatDark(ext) : cssVal(n);
  };

  const padSurf = (n) => `--${n}:`.padEnd(18);
  const padFg   = (n) => `--${n}:`.padEnd(17);
  const padBdr  = (n) => `--${n}:`.padEnd(18);
  const padLogo = (n) => `--${n}:`.padEnd(18);
  const padBtnP = (n) => `--${n}:`.padEnd(28);
  const padBtnS = (n) => `--${n}:`.padEnd(33);
  const padBtnG = (n) => `--${n}:`.padEnd(29);

  const surfaces     = ['bg-canvas','bg-subtle','bg-muted','bg-accent-soft','bg-accent'];
  const fg           = ['fg-1','fg-2','fg-3','fg-4','fg-link','fg-link-hover','fg-accent'];
  const borders      = ['border-subtle','border-default','border-strong','border-accent'];
  const logo         = ['logo-accent','logo-mark','logo-wordmark'];
  const btnPrimary   = ['btn-primary-bg','btn-primary-bg-hover','btn-primary-bg-active','btn-primary-bg-disabled','btn-primary-text','btn-primary-text-disabled'];
  const btnSecondary = ['btn-secondary-bg','btn-secondary-bg-hover','btn-secondary-bg-active','btn-secondary-bg-disabled','btn-secondary-text','btn-secondary-text-disabled','btn-secondary-border','btn-secondary-border-hover','btn-secondary-border-active','btn-secondary-border-disabled'];
  const btnGhost     = ['btn-ghost-bg-hover','btn-ghost-bg-active','btn-ghost-text','btn-ghost-text-disabled','btn-ghost-border','btn-ghost-border-disabled'];

  function block(valFn, indent, comments = true) {
    const sp = ' '.repeat(indent);
    if (comments) {
      return [
        `${sp}/* ── Surfaces ───────────────────────────────────────────── */`,
        ...surfaces.map(n => `${sp}${padSurf(n)}${valFn(n)};`),
        '',
        `${sp}/* ── Foreground / text ──────────────────────────────────── */`,
        ...fg.map(n => `${sp}${padFg(n)}${valFn(n)};`),
        '',
        `${sp}/* ── Borders ────────────────────────────────────────────── */`,
        ...borders.map(n => `${sp}${padBdr(n)}${valFn(n)};`),
        '',
        `${sp}/* ── Logo ───────────────────────────────────────────────── */`,
        ...logo.map(n => `${sp}${padLogo(n)}${valFn(n)};`),
        '',
        `${sp}/* ── Button — Primary ───────────────────────────────────── */`,
        ...btnPrimary.map(n => `${sp}${padBtnP(n)}${valFn(n)};`),
        '',
        `${sp}/* ── Button — Secondary ─────────────────────────────────── */`,
        ...btnSecondary.map(n => `${sp}${padBtnS(n)}${valFn(n)};`),
        '',
        `${sp}/* ── Button — Ghost ─────────────────────────────────────── */`,
        ...btnGhost.map(n => `${sp}${padBtnG(n)}${valFn(n)};`),
      ];
    }
    return [
      ...surfaces.map(n => `${sp}${padSurf(n)}${valFn(n)};`),
      ...fg.map(n => `${sp}${padFg(n)}${valFn(n)};`),
      ...borders.map(n => `${sp}${padBdr(n)}${valFn(n)};`),
      ...logo.map(n => `${sp}${padLogo(n)}${valFn(n)};`),
      ...btnPrimary.map(n => `${sp}${padBtnP(n)}${valFn(n)};`),
      ...btnSecondary.map(n => `${sp}${padBtnS(n)}${valFn(n)};`),
      ...btnGhost.map(n => `${sp}${padBtnG(n)}${valFn(n)};`),
    ];
  }

  return join([
    '/* ============================================================',
    '   Color Semantic Aliases',
    '   Role-based tokens that reference color-primitives.css.',
    '   Always use these in components — never primitives directly.',
    '   Dark mode: apply [data-theme="dark"] to <html>.',
    '   ============================================================ */',
    '',
    ':root {',
    ...block(cssVal, 2),
    '}',
    '',
    '[data-theme="dark"] {',
    ...block(darkVal, 2),
    '}',
    '',
    '@media (prefers-color-scheme: dark) {',
    '  :root:not([data-theme="light"]) {',
    ...block(darkVal, 4, false),
    '  }',
    '}',
    '',
  ]);
}

function buildTypography(src) {
  const tokens = JSON.parse(fs.readFileSync(path.join(src, 'typography.tokens.json'), 'utf8'));

  const padFam = (n) => `--${n}:`.padEnd(14);
  const padWt  = (n) => `--${n}:`.padEnd(15);
  const padSz  = (n) => `--${n}:`.padEnd(10);
  const padLH  = (n) => `--${n}:`.padEnd(14);
  const padLS  = (n) => `--${n}:`.padEnd(14);

  const families = ['font-sans','font-mono','font-brand'];
  const weights  = ['fw-light','fw-regular','fw-medium','fw-semibold','fw-bold'];
  const sizes    = ['fs-12','fs-13','fs-14','fs-15','fs-16','fs-18','fs-20','fs-22','fs-24','fs-28','fs-32','fs-36','fs-44','fs-56','fs-72','fs-96','fs-120'];
  const lineH    = ['lh-display','lh-tight','lh-snug','lh-normal','lh-relaxed'];
  const letterS  = ['ls-display','ls-tight','ls-snug','ls-normal','ls-loose','ls-wide'];

  const sizeComments = {
    'fs-12': '/* 12 — micro */',
    'fs-13': '/* 13 — caption */',
    'fs-14': '/* 14 — small */',
    'fs-16': '/* 16 — body */',
    'fs-18': '/* 18 — body large / subheading */',
    'fs-24': '/* 24 — h4 */',
    'fs-28': '/* 28 — h3 */',
    'fs-36': '/* 36 — h2 */',
    'fs-56': '/* 56 — h1 */',
    'fs-72': '/* 72 — display */',
    'fs-96': '/* 96 — hero display */',
    'fs-120': '/* 120 — display XL */',
  };

  const lines = [
    '/* ============================================================',
    '   Typography Tokens',
    '   Families, weights, size scale, line-heights, letter-spacing.',
    '   Utility classes live in styles/typography-utilities.css.',
    '   ============================================================ */',
    '',
    ':root {',
    '  /* ── Families ────────────────────────────────────────────── */',
    ...families.map(n => `  ${padFam(n)}${formatValue(tokens[n], {})};`),
    '',
    '  /* ── Weights (Figtree variable 300–900) ─────────────────── */',
    ...weights.map(n => `  ${padWt(n)}${formatValue(tokens[n], {})};`),
    '',
    '  /* ── Size scale (1.250 major-third, UI-first) ───────────── */',
  ];

  for (const n of sizes) {
    const v   = formatValue(tokens[n], {});
    const cmt = sizeComments[n];
    if (cmt) {
      const pad = ' '.repeat(Math.max(1, 13 - (v + ';').length));
      lines.push(`  ${padSz(n)}${v};${pad}${cmt}`);
    } else {
      lines.push(`  ${padSz(n)}${v};`);
    }
  }

  lines.push('', '  /* ── Line heights ────────────────────────────────────────── */');
  for (const n of lineH) lines.push(`  ${padLH(n)}${formatValue(tokens[n], {})};`);

  lines.push('', '  /* ── Letter spacing ──────────────────────────────────────── */');
  for (const n of letterS) lines.push(`  ${padLS(n)}${formatValue(tokens[n], {})};`);

  lines.push('}', '');
  return lines.join('\n');
}

function buildSpacing(src) {
  const tokens = JSON.parse(fs.readFileSync(path.join(src, 'spacing.tokens.json'), 'utf8'));

  const padSp   = (n) => `--${n}:`.padEnd(12);
  const padRad  = (n) => `--${n}:`.padEnd(15);
  const padShad = (n) => `--${n}:`.padEnd(16);
  const padLay  = (n) => `--${n}:`.padEnd(21);
  const padIcon = (n) => `--${n}:`.padEnd(18);

  const space      = ['space-0','space-1','space-2','space-3','space-4','space-5','space-6','space-8','space-10','space-12','space-16','space-20','space-24','space-32'];
  const radii      = ['radius-xs','radius-sm','radius-md','radius-lg','radius-xl','radius-2xl','radius-pill'];
  const shadows    = ['shadow-xs','shadow-sm','shadow-md','shadow-lg','shadow-xl','shadow-focus'];
  const layout     = ['container-narrow','container-default','container-wide'];
  const iconStroke   = ['icon-stroke-sm','icon-stroke-md','icon-stroke-lg'];
  const borderWidths = ['border-thin','border-regular','border-thick','border-bar'];
  const padBorder    = (n) => `--${n}:`.padEnd(18);
  const v = (n) => formatValue(tokens[n], {});

  return join([
    '/* ============================================================',
    '   Spacing, Shape & Shadow Tokens',
    '   4px space scale, border radii, elevation shadows,',
    '   and layout container widths.',
    '   ============================================================ */',
    '',
    ':root {',
    '  /* ── Space scale (4px base) ─────────────────────────────── */',
    ...space.map(n => `  ${padSp(n)}${v(n)};`),
    '',
    '  /* ── Radii ───────────────────────────────────────────────── */',
    ...radii.map(n => `  ${padRad(n)}${v(n)};`),
    '',
    '  /* ── Shadows ─────────────────────────────────────────────── */',
    ...shadows.map(n => `  ${padShad(n)}${v(n)};`),
    '',
    '  /* ── Layout ──────────────────────────────────────────────── */',
    ...layout.map(n => `  ${padLay(n)}${v(n)};`),
    '',
    '  /* ── Icon stroke weight (unitless — SVG stroke-width) ────── */',
    ...iconStroke.map(n => `  ${padIcon(n)}${v(n)};`),
    '',
    '  /* ── Border widths ───────────────────────────────────────── */',
    ...borderWidths.map(n => `  ${padBorder(n)}${v(n)};`),
    '}',
    '',
  ]);
}

function buildMotion(src) {
  const tokens = JSON.parse(fs.readFileSync(path.join(src, 'motion.tokens.json'), 'utf8'));
  const padE = (n) => `--${n}:`.padEnd(n === 'ease-emphasized' ? 19 : 18);
  const padD = (n) => `--${n}:`.padEnd(12);
  const v    = (n) => formatValue(tokens[n], {});

  return join([
    '/* ============================================================',
    '   Motion Tokens',
    '   Easing curves and duration tiers.',
    '   120–200–320ms; no bounces or spring overshoots.',
    '   ============================================================ */',
    '',
    ':root {',
    '  /* ── Easing ──────────────────────────────────────────────── */',
    ...['ease-standard','ease-emphasized','ease-out'].map(n => `  ${padE(n)}${v(n)};`),
    '',
    '  /* ── Duration ────────────────────────────────────────────── */',
    ...['dur-fast','dur-base','dur-slow'].map(n => `  ${padD(n)}${v(n)};`),
    '}',
    '',
  ]);
}

function join(lines) { return lines.join('\n'); }

// ── Public interface ──────────────────────────────────────────────────────────

const BUILDERS = {
  'color-primitives': { build: buildColorPrimitives, out: 'color-primitives.css' },
  'color-semantic':   { build: buildColorSemantic,   out: 'color-semantic.css'   },
  'typography':       { build: buildTypography,       out: 'typography.css'       },
  'spacing':          { build: buildSpacing,          out: 'spacing.css'          },
  'motion':           { build: buildMotion,           out: 'motion.css'           },
};

/**
 * @param {string} sourceDir  Absolute path to brand/tokens/source/
 * @param {string} outputDir  Absolute path to brand/tokens/output/web/
 * @param {{ file?: string }} [opts]
 * @returns {{ key: string, file: string }[]}
 */
function run(sourceDir, outputDir, opts = {}) {
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  const targets = opts.file ? [opts.file] : Object.keys(BUILDERS);
  const files   = [];
  let written   = 0;
  let skipped   = 0;

  for (const key of targets) {
    const b = BUILDERS[key];
    if (!b) throw new Error(`web-css: unknown token file "${key}". Options: ${Object.keys(BUILDERS).join(', ')}`);
    const css  = b.build(sourceDir);
    const dest = path.join(outputDir, b.out);
    const existing = fs.existsSync(dest) ? fs.readFileSync(dest, 'utf8') : null;
    if (existing === css) {
      skipped++;
    } else {
      fs.writeFileSync(dest, css, 'utf8');
      written++;
    }
    files.push({ key, file: dest });
  }

  return { written, skipped, files };
}

module.exports = { run, BUILDERS };
