/* token-resolve.js, the one place a raw design value becomes a Figma variable decision.
   Shared by the IR extractor (annotates the spec) and the Figma plugin (binds the node).
   Loads spec/tokens/figma-variable-map.json. No dependencies. Browser + Figma sandbox safe. */
(function (root) {
  var MAP = null;
  var byHex = {};          // "#rrggbb" -> value row
  var figByHex = {};       // "#rrggbb" -> [ {css, figmaCandidate} ]

  function normName(s) {
    return String(s || '').toLowerCase().replace(/^--/, '').replace(/[\/\-_\s.]+/g, '');
  }
  function normHex(h) {
    if (!h) return null;
    h = String(h).trim().toLowerCase();
    if (h[0] !== '#') return null;
    if (h.length === 4) h = '#' + h[1] + h[1] + h[2] + h[2] + h[3] + h[3];
    else if (h.length === 5) h = '#' + h[1] + h[1] + h[2] + h[2] + h[3] + h[3] + h[4] + h[4];
    return (h.length === 7 || h.length === 9) ? h : null;
  }
  function cssColorToHex(c) {
    if (!c) return null;
    c = String(c).trim();
    if (c[0] === '#') return normHex(c);
    var m = c.match(/^rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)\s*(?:[,\/]\s*([\d.%]+))?\s*\)$/i);
    if (!m) return null;
    var h = function (n) { return Math.round(parseFloat(n)).toString(16).padStart(2, '0'); };
    var a = '';
    if (m[4] !== undefined) {
      var av = /%$/.test(m[4]) ? parseFloat(m[4]) / 100 : parseFloat(m[4]);
      if (av < 0.999) a = Math.round(av * 255).toString(16).padStart(2, '0');
    }
    return '#' + h(m[1]) + h(m[2]) + h(m[3]) + a;
  }
  function alphaOf(hex) { return hex && hex.length === 9 ? parseInt(hex.slice(7, 9), 16) / 255 : 1; }
  function rgb01(hex) {
    return { r: parseInt(hex.slice(1, 3), 16) / 255, g: parseInt(hex.slice(3, 5), 16) / 255, b: parseInt(hex.slice(5, 7), 16) / 255 };
  }
  function lab(hex) {
    var v = [1, 3, 5].map(function (i) {
      var c = parseInt(hex.slice(i, i + 2), 16) / 255;
      return c > 0.04045 ? Math.pow((c + 0.055) / 1.055, 2.4) : c / 12.92;
    });
    var X = (v[0] * 0.4124 + v[1] * 0.3576 + v[2] * 0.1805) / 0.95047;
    var Y = v[0] * 0.2126 + v[1] * 0.7152 + v[2] * 0.0722;
    var Z = (v[0] * 0.0193 + v[1] * 0.1192 + v[2] * 0.9505) / 1.08883;
    var f = function (t) { return t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116; };
    return [116 * f(Y) - 16, 500 * (f(X) - f(Y)), 200 * (f(Y) - f(Z))];
  }
  function deltaE(a, b) {
    var A = lab(a), B = lab(b);
    return Math.sqrt(Math.pow(A[0] - B[0], 2) + Math.pow(A[1] - B[1], 2) + Math.pow(A[2] - B[2], 2));
  }

  function load(map) {
    MAP = map;
    byHex = {}; figByHex = {};
    (map.values || []).forEach(function (v) { byHex[v.hex] = v; });
    (map.dsPalette || []).forEach(function (p) {
      var h = normHex(p.hex); if (!h) return;
      (p.figmaMatches || []).forEach(function (path) {
        (figByHex[h] = figByHex[h] || []).push({ css: '--' + path.replace(/\//g, '-'), figmaCandidate: path });
      });
    });
    return API;
  }

  /* resolveColor(cssColor) -> binding decision for one paint.
     { hex, opacity, action, confidence, figma:[{css,figmaCandidate}], nearest:[...], note } */
  function resolveColor(cssColor) {
    var hex = cssColorToHex(cssColor);
    if (!hex) return null;
    var base = hex.slice(0, 7), op = alphaOf(hex);
    var row = byHex[hex] || byHex[base];
    if (row) {
      return {
        hex: hex, base: base, opacity: op, action: row.action, confidence: row.binding,
        figma: row.figmaExact || [], nearest: row.nearest || null, dsToken: row.dsToken || [],
        note: row.binding === 'divergent'
          ? 'No honest variable. Use the raw hex and print a diff swatch for review.'
          : (row.binding === 'drift' ? 'Visible drift from the nearest variable. Bind nearest, print a diff note.' : null)
      };
    }
    // value not in the audited set (new design work since the last map regen)
    var pool = (MAP && MAP.dsPalette) || [];
    var best = null;
    pool.forEach(function (p) {
      var h = normHex(p.hex); if (!h || h.length !== 7 || !p.figmaMatches || !p.figmaMatches.length) return;
      var d = deltaE(base, h);
      if (!best || d < best.deltaE) best = { css: p.css, hex: h, deltaE: +d.toFixed(2), figmaCandidate: p.figmaMatches[0] };
    });
    var exact = figByHex[base] || [];
    return {
      hex: hex, base: base, opacity: op,
      action: exact.length ? 'BIND' : (best && best.deltaE < 2 ? 'BIND_NEAREST' : 'DS_REQUEST'),
      confidence: exact.length ? 'exact' : (best && best.deltaE < 2 ? 'near' : 'unmapped'),
      figma: exact, nearest: best ? [best] : null, dsToken: [],
      note: 'Not in the audited value set. Regenerate the variable map after this print.'
    };
  }

  /* resolveNumber(px, kind) -> candidate spacing / radius variable. kind: 'spacing' | 'radius' */
  function resolveNumber(value, kind) {
    if (MAP == null || value == null) return null;
    var n = parseFloat(value); if (isNaN(n)) return null;
    var pool = (MAP.numbers && MAP.numbers[kind]) || [];
    var hit = pool.filter(function (t) { return parseFloat(t.value) === n; });
    var floats = (MAP.figmaFloatTokens || []).filter(function (t) { return parseFloat(t.value) === n; });
    return { value: n, dsToken: hit.map(function (t) { return t.css; }),
      figma: floats.map(function (t) { return { css: t.css, figmaCandidate: t.figmaCandidate }; }),
      action: floats.length ? 'BIND' : 'RAW_OK' };
  }

  /* matchVariable(candidatePath, liveVariableNames) -> best live name, or null.
     fig-tokens.css flattens Figma's "/" into "-", so compare normalized. */
  function matchVariable(candidate, liveNames) {
    if (!candidate || !liveNames) return null;
    var want = normName(candidate);
    for (var i = 0; i < liveNames.length; i++) if (normName(liveNames[i]) === want) return liveNames[i];
    // suffix match: "colors/brand/600" vs a collection-prefixed live name
    for (var j = 0; j < liveNames.length; j++) if (normName(liveNames[j]).endsWith(want)) return liveNames[j];
    return null;
  }

  var API = { load: load, resolveColor: resolveColor, resolveNumber: resolveNumber,
    matchVariable: matchVariable, normName: normName, normHex: normHex,
    cssColorToHex: cssColorToHex, rgb01: rgb01, alphaOf: alphaOf, deltaE: deltaE,
    get map() { return MAP; } };

  if (typeof module !== 'undefined' && module.exports) module.exports = API;
  root.OTRTokens = API;
})(typeof window !== 'undefined' ? window : this);
