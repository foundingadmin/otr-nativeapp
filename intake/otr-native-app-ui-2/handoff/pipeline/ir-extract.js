/* ir-extract.js, DOM to Figma-ready IR.
   Walks a rendered artboard and emits a node tree carrying layout, paints, strokes,
   radii, effects and text, with every colour already annotated with its Figma
   variable decision (via token-resolve.js). This is the contract between the
   design surface (Claude boards) and the Figma print (plugin).
   Requires: window.OTRTokens loaded and .load(map) called. */
(function (root) {
  var CHROME = '[data-omelette-chrome],.dc-header,.dc-menu,.dc-btns,.dc-grip,#__boardPath,#__om-edit-overrides,script,style,link,template,noscript';
  var px = function (v) { var n = parseFloat(v); return isNaN(n) ? 0 : Math.round(n * 100) / 100; };
  var T = function () { return root.OTRTokens; };
  var REG = {};   // hex -> full binding decision, emitted once per bundle

  /* Paints carry a compact ref; the decision lives once in bundle.bindings. */
  function bindColor(c) {
    var t = T(); if (!t) return null;
    var r = t.resolveColor(c);
    if (!r || r.opacity === 0) return null;
    if (!REG[r.hex]) REG[r.hex] = { action: r.action, confidence: r.confidence, figma: r.figma, nearest: r.nearest, dsToken: r.dsToken, note: r.note };
    return { hex: r.hex, opacity: r.opacity, bind: r.action };
  }
  function parseShadows(str) {
    if (!str || str === 'none') return [];
    var parts = [], depth = 0, cur = '';
    for (var i = 0; i < str.length; i++) {
      var ch = str[i];
      if (ch === '(') depth++; if (ch === ')') depth--;
      if (ch === ',' && depth === 0) { parts.push(cur); cur = ''; } else cur += ch;
    }
    if (cur.trim()) parts.push(cur);
    return parts.map(function (p) {
      p = p.trim();
      var inset = /(^|\s)inset(\s|$)/.test(p);
      p = p.replace(/(^|\s)inset(\s|$)/, ' ');
      var col = p.match(/(rgba?\([^)]+\)|#[0-9a-f]{3,8})/i);
      var nums = p.replace(col ? col[0] : '', '').trim().split(/\s+/).map(px);
      return { type: inset ? 'INNER_SHADOW' : 'DROP_SHADOW',
        x: nums[0] || 0, y: nums[1] || 0, blur: nums[2] || 0, spread: nums[3] || 0,
        color: bindColor(col ? col[0] : null) };
    }).filter(function (s) { return s.color; });
  }
  function parseGradient(bg) {
    if (!bg || bg.indexOf('gradient') < 0) return null;
    var kind = /radial-gradient/.test(bg) ? 'GRADIENT_RADIAL' : 'GRADIENT_LINEAR';
    var inner = bg.slice(bg.indexOf('(') + 1, bg.lastIndexOf(')'));
    var parts = [], depth = 0, cur = '';
    for (var i = 0; i < inner.length; i++) {
      var ch = inner[i];
      if (ch === '(') depth++; if (ch === ')') depth--;
      if (ch === ',' && depth === 0) { parts.push(cur.trim()); cur = ''; } else cur += ch;
    }
    if (cur.trim()) parts.push(cur.trim());
    var angle = null, stops = [];
    parts.forEach(function (p, idx) {
      var a = p.match(/^([-\d.]+)deg$/); if (a && idx === 0) { angle = parseFloat(a[1]); return; }
      if (idx === 0 && /^(to |circle|ellipse|at )/.test(p)) { angle = p; return; }
      var col = p.match(/(rgba?\([^)]+\)|#[0-9a-f]{3,8})/i);
      var pos = p.match(/([\d.]+)%/);
      if (col) stops.push({ position: pos ? parseFloat(pos[1]) / 100 : null, color: bindColor(col[0]) });
    });
    return { type: kind, css: bg, angle: angle, stops: stops };
  }
  function layoutOf(cs) {
    var d = cs.display;
    if (d.indexOf('flex') < 0) return d.indexOf('grid') >= 0 ? { mode: 'GRID_CSS', note: 'CSS grid. Print children with absolute positions or rebuild as nested auto-layout.' } : null;
    var col = /column/.test(cs.flexDirection);
    var jmap = { 'flex-start': 'MIN', 'start': 'MIN', 'center': 'CENTER', 'flex-end': 'MAX', 'end': 'MAX', 'space-between': 'SPACE_BETWEEN' };
    var amap = { 'flex-start': 'MIN', 'start': 'MIN', 'center': 'CENTER', 'flex-end': 'MAX', 'end': 'MAX', 'baseline': 'BASELINE', 'stretch': 'STRETCH' };
    var gapRow = px(cs.rowGap === 'normal' ? 0 : cs.rowGap), gapCol = px(cs.columnGap === 'normal' ? 0 : cs.columnGap);
    return {
      mode: col ? 'VERTICAL' : 'HORIZONTAL',
      gap: col ? gapRow : gapCol,
      crossGap: col ? gapCol : gapRow,
      padding: { t: px(cs.paddingTop), r: px(cs.paddingRight), b: px(cs.paddingBottom), l: px(cs.paddingLeft) },
      primaryAxisAlign: jmap[cs.justifyContent] || 'MIN',
      counterAxisAlign: amap[cs.alignItems] || 'MIN',
      wrap: cs.flexWrap === 'wrap'
    };
  }
  function sizingOf(el, cs, parentCs) {
    var s = { h: 'FIXED', v: 'FIXED' };
    var grows = parseFloat(cs.flexGrow) > 0;
    var inlineW = el.style && el.style.width, inlineH = el.style && el.style.height;
    var horiz = parentCs && parentCs.display.indexOf('flex') >= 0 && !/column/.test(parentCs.flexDirection);
    if (grows) { if (horiz) s.h = 'FILL'; else s.v = 'FILL'; }
    if (cs.width === '100%' || (inlineW && inlineW.indexOf('%') > 0)) s.h = 'FILL';
    if (!inlineW && cs.display.indexOf('inline') >= 0) s.h = 'HUG';
    if (!inlineH && !/^\d/.test(cs.height || '')) s.v = 'HUG';
    if (cs.display.indexOf('flex') >= 0 && !inlineH) s.v = 'HUG';
    return s;
  }
  function directText(el) {
    var out = '';
    for (var i = 0; i < el.childNodes.length; i++) {
      var n = el.childNodes[i];
      if (n.nodeType === 3) out += n.nodeValue;
    }
    return out.replace(/\s+/g, ' ').trim();
  }
  function nameOf(el, txt) {
    if (el.getAttribute && el.getAttribute('data-ir-name')) return el.getAttribute('data-ir-name');
    var cls = (el.getAttribute && el.getAttribute('class') || '').split(/\s+/).filter(Boolean)
      .filter(function (c) { return !/^(otr|dc-)/.test(c) || /^otr-/.test(c); });
    if (cls.length) return cls.join('.');
    if (txt) return txt.slice(0, 28);
    return el.tagName.toLowerCase();
  }
  function pseudoNode(el, which, box) {
    var cs = getComputedStyle(el, '::' + which);
    if (!cs || cs.content === 'none' || cs.content === 'normal') return null;
    var w = px(cs.width), h = px(cs.height);
    var bg = bindColor(cs.backgroundColor), grad = parseGradient(cs.backgroundImage);
    if (!bg && !grad && cs.borderTopWidth === '0px' && !/["']/.test(cs.content)) return null;
    var lit = (cs.content.match(/^["'](.*)["']$/) || [])[1];
    return {
      name: nameOf(el, '') + '::' + which, type: lit ? 'TEXT' : 'FRAME', pseudo: which,
      box: { x: null, y: null, w: w || null, h: h || null },
      note: 'CSS pseudo-element. Position is not resolvable from the DOM; place by eye against the reference PNG.',
      fills: grad ? [grad] : (bg ? [{ type: 'SOLID', color: bg }] : []),
      radius: [px(cs.borderTopLeftRadius), px(cs.borderTopRightRadius), px(cs.borderBottomRightRadius), px(cs.borderBottomLeftRadius)],
      strokes: strokeOf(cs), text: lit ? { characters: lit, fontSize: px(cs.fontSize), color: bindColor(cs.color) } : null,
      children: []
    };
  }
  function strokeOf(cs) {
    var w = px(cs.borderTopWidth);
    var sides = [px(cs.borderTopWidth), px(cs.borderRightWidth), px(cs.borderBottomWidth), px(cs.borderLeftWidth)];
    var uniform = sides.every(function (s) { return s === sides[0]; });
    if (!sides.some(function (s) { return s > 0; })) return null;
    var col = bindColor(uniform ? cs.borderTopColor : (sides[0] ? cs.borderTopColor : sides[2] ? cs.borderBottomColor : cs.borderLeftColor));
    if (!col) return null;
    return { weight: uniform ? w : null, sides: uniform ? null : { t: sides[0], r: sides[1], b: sides[2], l: sides[3] },
      style: cs.borderTopStyle, align: 'INSIDE', color: col };
  }

  function walk(el, parentRect, parentCs, depth) {
    if (el.nodeType !== 1) return null;
    if (el.matches && el.matches(CHROME)) return null;
    var cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden') return null;
    var r = el.getBoundingClientRect();
    if (r.width < 0.5 && r.height < 0.5 && !directText(el)) return null;

    var txt = directText(el);
    var isSvg = el.tagName.toLowerCase() === 'svg';
    var isImg = el.tagName.toLowerCase() === 'img';
    var grad = parseGradient(cs.backgroundImage);
    var bgCol = bindColor(cs.backgroundColor);
    var kids = [];
    if (!isSvg) {
      for (var i = 0; i < el.children.length; i++) {
        var k = walk(el.children[i], r, cs, depth + 1);
        if (k) kids.push(k);
      }
      ['before', 'after'].forEach(function (w) { var p = pseudoNode(el, w, r); if (p) kids.push(p); });
    }
    var hasOwnText = txt && kids.length === 0;
    var node = {
      name: nameOf(el, txt),
      type: isSvg ? 'VECTOR' : isImg ? 'IMAGE' : hasOwnText ? 'TEXT' : 'FRAME',
      source: { tag: el.tagName.toLowerCase(), class: el.getAttribute('class') || null },
      box: { x: px(r.left - (parentRect ? parentRect.left : r.left)), y: px(r.top - (parentRect ? parentRect.top : r.top)), w: px(r.width), h: px(r.height) },
      layout: layoutOf(cs),
      sizing: sizingOf(el, cs, parentCs),
      fills: grad ? [grad] : (bgCol ? [{ type: 'SOLID', color: bgCol }] : []),
      strokes: strokeOf(cs),
      radius: [px(cs.borderTopLeftRadius), px(cs.borderTopRightRadius), px(cs.borderBottomRightRadius), px(cs.borderBottomLeftRadius)],
      effects: parseShadows(cs.boxShadow),
      opacity: parseFloat(cs.opacity),
      clip: cs.overflow !== 'visible',
      text: null, image: null, svg: null,
      children: kids
    };
    if (cs.backdropFilter && cs.backdropFilter !== 'none') node.backdropBlur = cs.backdropFilter;
    if (cs.filter && cs.filter !== 'none') node.filter = cs.filter;
    if (cs.transform && cs.transform !== 'none') node.transform = cs.transform;
    if (hasOwnText || (txt && kids.length)) {
      node.text = {
        characters: txt,
        fontFamily: cs.fontFamily.split(',')[0].replace(/["']/g, '').trim(),
        fontWeight: cs.fontWeight, fontSize: px(cs.fontSize),
        lineHeight: cs.lineHeight === 'normal' ? 'AUTO' : px(cs.lineHeight),
        letterSpacing: cs.letterSpacing === 'normal' ? 0 : px(cs.letterSpacing),
        align: cs.textAlign, transform: cs.textTransform, color: bindColor(cs.color),
        whiteSpace: cs.whiteSpace
      };
      if (txt && kids.length) node.text.note = 'Mixed content: this element holds text AND child elements. Split into a text node plus siblings.';
    }
    if (isImg) node.image = { src: el.getAttribute('src'), alt: el.getAttribute('alt') || null, fit: cs.objectFit };
    if (isSvg) node.svg = { markup: el.outerHTML.length < 2600 ? el.outerHTML : '[oversized, read from the kit source]', viewBox: el.getAttribute('viewBox') };
    if (el.getAttribute('data-comment-anchor')) node.commentAnchor = el.getAttribute('data-comment-anchor');
    return node;
  }

  /* extractArtboard(slotEl) -> one frame */
  function extractArtboard(slot) {
    var card = slot.querySelector('.dc-card') || slot;
    var labelEl = slot.querySelector('.dc-labeltext .dc-editable, .dc-labeltext');
    var r = card.getBoundingClientRect();
    var scale = r.width / (card.offsetWidth || r.width) || 1;
    var tree = walk(card, null, null, 0);
    if (tree) {
      // undo canvas zoom so boxes are 1:1 design px
      (function unscale(n) {
        ['x', 'y', 'w', 'h'].forEach(function (k) { if (typeof n.box[k] === 'number') n.box[k] = Math.round(n.box[k] / scale * 100) / 100; });
        n.children.forEach(unscale);
      })(tree);
    }
    return {
      id: slot.getAttribute('data-dc-slot'),
      label: labelEl ? labelEl.textContent.trim() : slot.getAttribute('data-dc-slot'),
      width: card.offsetWidth, height: card.offsetHeight,
      root: tree
    };
  }

  /* extractBoard(doc, meta) -> { board, sections:[{id,title,artboards:[...]}] } */
  function extractBoard(doc, meta) {
    REG = {};
    var out = { board: meta || {}, extractedAt: new Date().toISOString(), sections: [] };
    var sections = doc.querySelectorAll('[data-dc-section]');
    sections.forEach(function (sec) {
      var head = sec.querySelector('.dc-sectionhead');
      var titleEl = head && head.querySelector('.dc-editable');
      var arts = [];
      sec.querySelectorAll('[data-dc-slot]').forEach(function (slot) {
        try { arts.push(extractArtboard(slot)); }
        catch (e) { arts.push({ id: slot.getAttribute('data-dc-slot'), error: String(e) }); }
      });
      out.sections.push({
        id: sec.getAttribute('data-dc-section'),
        title: titleEl ? titleEl.textContent.trim() : sec.getAttribute('data-dc-section'),
        artboards: arts
      });
    });
    out.bindings = REG;
    return out;
  }

  function stats(bundle) {
    var n = 0, texts = 0, binds = { BIND: 0, BIND_NEAREST: 0, BIND_NEAREST_AND_FLAG: 0, DS_REQUEST: 0, RAW_OK: 0 };
    function visit(node) {
      n++;
      if (node.text) { texts++; tally(node.text.color); }
      (node.fills || []).forEach(function (f) { if (f.color) tally(f.color); (f.stops || []).forEach(function (s) { tally(s.color); }); });
      if (node.strokes) tally(node.strokes.color);
      (node.effects || []).forEach(function (e) { tally(e.color); });
      (node.children || []).forEach(visit);
    }
    function tally(c) { if (c && binds[c.bind] !== undefined) binds[c.bind]++; }
    bundle.sections.forEach(function (s) { s.artboards.forEach(function (a) { if (a.root) visit(a.root); }); });
    return { nodes: n, textNodes: texts, paintDecisions: binds,
      artboards: bundle.sections.reduce(function (t, s) { return t + s.artboards.length; }, 0) };
  }

  root.OTR_IR = { extractBoard: extractBoard, extractArtboard: extractArtboard, stats: stats, walk: walk };
})(typeof window !== 'undefined' ? window : this);
