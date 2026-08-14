/* OTR Canon Print • starter plugin
   Reads an IR bundle from spec/ir/, prints artboards as Figma frames, binds every
   paint to a DS variable where an honest one exists, and prints a diff swatch where
   none does. This is a starter: the mechanical parts are done, component set
   creation and screen composition are the extension points.

   Read handoff/FIGMA-PRINT-GUIDE.md before extending it. */

const PAGES = {
  components: '① Components (agent)',
  screens: '② Screens (agent)',
  proposed: '③ Proposed',
  diffs: '④ Diffs',
  ready: '⑤ Ready for dev'
};
const FONT = 'Figtree';
const WEIGHT_STYLE = { '400': 'Regular', '500': 'Medium', '600': 'SemiBold', '700': 'Bold', '800': 'ExtraBold', '900': 'Black',
  normal: 'Regular', bold: 'Bold' };
const SKIP_NAME = /^(spec|note|zlabel|zn|dc-|tweaks)/i;

let VARS = [];          // { name, id, variable, collection }
let VAR_NAMES = [];
let LOG = [];
const log = (m) => { LOG.push(m); figma.ui.postMessage({ type: 'log', message: m }); };

figma.showUI(__html__, { width: 420, height: 560 });

/* ── variables ───────────────────────────────────────────────── */
async function buildVariableIndex() {
  VARS = [];
  const local = await figma.variables.getLocalVariablesAsync();
  local.forEach(v => VARS.push({ name: v.name, id: v.id, variable: v, source: 'local' }));
  try {
    const cols = await figma.teamLibrary.getAvailableLibraryVariableCollectionsAsync();
    for (const c of cols) {
      const items = await figma.teamLibrary.getVariablesInLibraryCollectionAsync(c.key);
      for (const it of items) {
        if (it.resolvedType !== 'COLOR' && it.resolvedType !== 'FLOAT') continue;
        VARS.push({ name: it.name, key: it.key, collection: c.name, source: 'library', imported: null });
      }
    }
  } catch (e) { log('library variables unavailable: ' + e.message); }
  VAR_NAMES = VARS.map(v => v.name);
  log('variable index: ' + VARS.length + ' variables (' + VARS.filter(v => v.source === 'library').length + ' from libraries)');
}
const norm = (s) => String(s || '').toLowerCase().replace(/^--/, '').replace(/[\/\-_\s.]+/g, '');
function findVariable(candidate) {
  if (!candidate) return null;
  const want = norm(candidate);
  let hit = VARS.find(v => norm(v.name) === want);
  if (!hit) hit = VARS.find(v => norm(v.name).endsWith(want));
  return hit || null;
}
async function resolveVariable(entry) {
  if (!entry) return null;
  if (entry.variable) return entry.variable;
  if (entry.key) {
    try { entry.variable = await figma.variables.importVariableByKeyAsync(entry.key); return entry.variable; }
    catch (e) { log('import failed for ' + entry.name + ': ' + e.message); return null; }
  }
  return null;
}

/* ── paints ──────────────────────────────────────────────────── */
const rgb = (hex) => ({ r: parseInt(hex.slice(1, 3), 16) / 255, g: parseInt(hex.slice(3, 5), 16) / 255, b: parseInt(hex.slice(5, 7), 16) / 255 });
const DIFFS = new Map();   // hex -> decision, collected while printing

async function solidPaint(color, bindings) {
  if (!color) return null;
  let paint = { type: 'SOLID', color: rgb(color.hex.slice(0, 7)), opacity: color.opacity == null ? 1 : color.opacity };
  const d = bindings[color.hex] || {};
  const action = color.bind || d.action || 'RAW_OK';
  if (action === 'BIND' || action === 'BIND_NEAREST' || action === 'BIND_NEAREST_AND_FLAG') {
    const cand = (d.figma && d.figma[0] && d.figma[0].figmaCandidate) || (d.nearest && d.nearest[0] && d.nearest[0].figmaCandidate);
    const entry = findVariable(cand);
    const variable = await resolveVariable(entry);
    if (variable) {
      paint = figma.variables.setBoundVariableForPaint(paint, 'color', variable);
      if (action === 'BIND_NEAREST_AND_FLAG') DIFFS.set(color.hex, Object.assign({ hex: color.hex, bound: entry.name }, d));
    } else {
      DIFFS.set(color.hex, Object.assign({ hex: color.hex, bound: null, reason: 'candidate not found in this file: ' + cand }, d));
    }
  } else if (action === 'DS_REQUEST') {
    DIFFS.set(color.hex, Object.assign({ hex: color.hex, bound: null }, d));
  }
  return paint;
}
async function fillsFor(node, bindings) {
  const out = [];
  for (const f of node.fills || []) {
    if (f.type === 'SOLID') { const p = await solidPaint(f.color, bindings); if (p) out.push(p); }
    else if (f.type && f.type.indexOf('GRADIENT') === 0) {
      const stops = [];
      (f.stops || []).forEach((s, i, arr) => {
        if (!s.color) return;
        stops.push({ position: s.position == null ? i / Math.max(1, arr.length - 1) : s.position,
          color: Object.assign({ a: s.color.opacity == null ? 1 : s.color.opacity }, rgb(s.color.hex.slice(0, 7))) });
      });
      if (stops.length > 1) {
        const a = ((f.angle == null ? 180 : f.angle) - 90) * Math.PI / 180;
        out.push({ type: 'GRADIENT_LINEAR', gradientStops: stops,
          gradientTransform: [[Math.cos(a), Math.sin(a), 0], [-Math.sin(a), Math.cos(a), 0.5]] });
        DIFFS.set('gradient:' + (f.css || ''), { hex: 'gradient', action: 'DS_REQUEST',
          note: 'Gradients cannot bind to a variable. Make it a shared gradient style: ' + f.css });
      }
    }
  }
  return out;
}

/* ── nodes ───────────────────────────────────────────────────── */
async function loadFonts() {
  const styles = ['Regular', 'Medium', 'SemiBold', 'Bold', 'ExtraBold'];
  for (const style of styles) {
    try { await figma.loadFontAsync({ family: FONT, style: style }); }
    catch (e) { log('font missing: ' + FONT + ' ' + style + ' (falling back to Inter)'); }
  }
  await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
}
function fontFor(text) {
  const style = WEIGHT_STYLE[String(text.fontWeight)] || 'Regular';
  return { family: FONT, style: style };
}
async function build(node, bindings, depth) {
  if (!node) return null;
  if (SKIP_NAME.test(node.name || '')) return null;

  if (node.type === 'TEXT' && node.text) {
    const t = figma.createText();
    t.name = node.name;
    try { t.fontName = fontFor(node.text); } catch (e) { t.fontName = { family: 'Inter', style: 'Regular' }; }
    t.characters = node.text.characters || '';
    t.fontSize = Math.max(1, node.text.fontSize || 14);
    if (node.text.lineHeight !== 'AUTO' && node.text.lineHeight) t.lineHeight = { value: node.text.lineHeight, unit: 'PIXELS' };
    if (node.text.letterSpacing) t.letterSpacing = { value: node.text.letterSpacing, unit: 'PIXELS' };
    t.textAlignHorizontal = (node.text.align || 'left').toUpperCase() === 'CENTER' ? 'CENTER'
      : (node.text.align || '').toUpperCase() === 'RIGHT' ? 'RIGHT' : 'LEFT';
    if (node.text.transform === 'uppercase') t.textCase = 'UPPER';
    const p = await solidPaint(node.text.color, bindings);
    if (p) t.fills = [p];
    t.textAutoResize = node.text.whiteSpace === 'nowrap' ? 'WIDTH_AND_HEIGHT' : 'HEIGHT';
    if (node.text.whiteSpace !== 'nowrap' && node.box.w) t.resize(Math.max(1, node.box.w), t.height);
    return t;
  }

  const f = figma.createFrame();
  f.name = node.name;
  f.resize(Math.max(1, node.box.w || 1), Math.max(1, node.box.h || 1));
  f.fills = await fillsFor(node, bindings);
  f.clipsContent = !!node.clip;
  if (node.opacity != null && node.opacity < 1) f.opacity = node.opacity;

  const r = node.radius || [0, 0, 0, 0];
  f.topLeftRadius = r[0]; f.topRightRadius = r[1]; f.bottomRightRadius = r[2]; f.bottomLeftRadius = r[3];

  if (node.strokes && node.strokes.color) {
    const sp = await solidPaint(node.strokes.color, bindings);
    if (sp) { f.strokes = [sp]; f.strokeWeight = node.strokes.weight || 1; f.strokeAlign = 'INSIDE';
      if (node.strokes.style === 'dashed') f.dashPattern = [4, 3]; }
  }
  if (node.effects && node.effects.length) {
    const fx = [];
    for (const e of node.effects) {
      const p = await solidPaint(e.color, bindings);
      if (!p || p.type !== 'SOLID') continue;
      fx.push({ type: e.type, color: Object.assign({ a: p.opacity == null ? 1 : p.opacity }, p.color),
        offset: { x: e.x, y: e.y }, radius: e.blur, spread: e.spread || 0, visible: true, blendMode: 'NORMAL' });
    }
    if (fx.length) f.effects = fx;
  }

  const L = node.layout;
  const auto = L && (L.mode === 'HORIZONTAL' || L.mode === 'VERTICAL');
  if (auto) {
    f.layoutMode = L.mode;
    f.itemSpacing = L.gap || 0;
    f.paddingTop = L.padding.t; f.paddingRight = L.padding.r; f.paddingBottom = L.padding.b; f.paddingLeft = L.padding.l;
    f.primaryAxisAlignItems = L.primaryAxisAlign === 'SPACE_BETWEEN' ? 'SPACE_BETWEEN'
      : L.primaryAxisAlign === 'CENTER' ? 'CENTER' : L.primaryAxisAlign === 'MAX' ? 'MAX' : 'MIN';
    f.counterAxisAlignItems = ['CENTER', 'MAX', 'BASELINE'].indexOf(L.counterAxisAlign) >= 0 ? L.counterAxisAlign : 'MIN';
    if (L.wrap) f.layoutWrap = 'WRAP';
    f.primaryAxisSizingMode = 'FIXED';
    f.counterAxisSizingMode = 'FIXED';
  }

  for (const child of node.children || []) {
    const c = await build(child, bindings, depth + 1);
    if (!c) continue;
    f.appendChild(c);
    if (!auto) { c.x = child.box.x || 0; c.y = child.box.y || 0; }
    if (child.pseudo) c.name = c.name + ' (pseudo, position by eye)';
  }
  return f;
}

/* ── pages ───────────────────────────────────────────────────── */
async function ensurePage(name) {
  await figma.loadAllPagesAsync();
  let p = figma.root.children.find(c => c.name === name);
  if (!p) { p = figma.createPage(); p.name = name; }
  return p;
}

async function printBundle(bundle, target) {
  const bindings = bundle.bindings || {};
  const page = await ensurePage(PAGES[target] || PAGES.screens);
  let x = 0;
  const existing = page.children.map(c => c.name);
  for (const section of bundle.sections) {
    let maxH = 0;
    for (const art of section.artboards) {
      if (!art.root) continue;
      const label = bundle.board.title + ' / ' + section.title + ' / ' + art.label;
      const already = page.children.find(c => c.getPluginData && c.getPluginData('irId') === bundle.board.id + ':' + art.id);
      if (already) { log('exists, skipped (read back first): ' + label); continue; }
      const frame = await build(art.root, bindings, 0);
      if (!frame) continue;
      frame.name = label;
      frame.setPluginData('irId', bundle.board.id + ':' + art.id);
      frame.setPluginData('irBoard', bundle.board.id);
      frame.setPluginData('artboardId', art.id);
      page.appendChild(frame);
      frame.x = x; frame.y = 0;
      x += (art.width || frame.width) + 120;
      maxH = Math.max(maxH, art.height || frame.height);
      log('printed ' + label);
    }
  }
  return page;
}

async function printDiffs() {
  if (!DIFFS.size) { log('no diffs to print'); return; }
  const page = await ensurePage(PAGES.diffs);
  await figma.loadFontAsync({ family: FONT, style: 'Bold' }).catch(() => {});
  let y = 0;
  for (const [hex, d] of DIFFS) {
    const card = figma.createFrame();
    card.name = 'DIFF · ' + hex;
    card.layoutMode = 'VERTICAL'; card.itemSpacing = 8;
    card.paddingTop = 16; card.paddingBottom = 16; card.paddingLeft = 16; card.paddingRight = 16;
    card.resize(420, 160);
    card.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
    card.cornerRadius = 12;
    card.strokes = [{ type: 'SOLID', color: { r: 0.92, g: 0.92, b: 0.93 } }];
    const title = figma.createText();
    try { title.fontName = { family: FONT, style: 'Bold' }; } catch (e) {}
    title.characters = hex + '   ' + (d.action || 'DS_REQUEST');
    title.fontSize = 14;
    card.appendChild(title);
    const body = figma.createText();
    try { body.fontName = { family: FONT, style: 'Regular' }; } catch (e) {}
    const near = d.nearest && d.nearest[0];
    body.characters = [
      d.bound ? 'bound to ' + d.bound : 'not bound',
      near ? 'nearest ' + near.figmaCandidate + ' (' + near.hex + ') deltaE ' + near.deltaE : 'no candidate',
      d.note || '', d.reason || ''
    ].filter(Boolean).join('\n');
    body.fontSize = 12;
    card.appendChild(body);
    page.appendChild(card);
    card.x = 0; card.y = y; y += 180;
  }
  log('printed ' + DIFFS.size + ' diff cards');
}

/* ── messages ────────────────────────────────────────────────── */
figma.ui.onmessage = async (msg) => {
  try {
    if (msg.type === 'init') { await buildVariableIndex(); figma.ui.postMessage({ type: 'ready', variables: VARS.length }); return; }
    if (msg.type === 'print') {
      LOG = []; DIFFS.clear();
      await loadFonts();
      if (!VARS.length) await buildVariableIndex();
      const bundle = JSON.parse(msg.json);
      log('bundle: ' + bundle.board.title + ' · ' + bundle.stats.artboards + ' artboards · ' + bundle.stats.nodes + ' nodes');
      const page = await printBundle(bundle, msg.target);
      await printDiffs();
      await figma.setCurrentPageAsync(page);
      figma.ui.postMessage({ type: 'done', log: LOG, diffs: DIFFS.size });
      figma.notify('Printed ' + bundle.board.title + '. ' + DIFFS.size + ' diffs.');
      return;
    }
    if (msg.type === 'readback') {
      await figma.loadAllPagesAsync();
      const state = { readAt: new Date().toISOString(), pages: [] };
      for (const p of figma.root.children) {
        state.pages.push({ name: p.name, frames: p.children.map(c => ({
          id: c.id, name: c.name, w: Math.round(c.width), h: Math.round(c.height),
          irId: c.getPluginData ? c.getPluginData('irId') : '', type: c.type })) });
      }
      figma.ui.postMessage({ type: 'state', state: JSON.stringify(state, null, 1) });
      return;
    }
  } catch (e) {
    log('ERROR ' + e.message);
    figma.ui.postMessage({ type: 'done', log: LOG, error: e.message });
  }
};
