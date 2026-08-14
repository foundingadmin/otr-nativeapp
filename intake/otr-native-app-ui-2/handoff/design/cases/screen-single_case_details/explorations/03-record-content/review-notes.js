/* review-notes.js — private annotation layer for boards.
   Notes are not comments: they live in .review-notes.state.json beside the page,
   never enter the comment queue, and are marked as chrome so the Figma print
   pipeline skips them.

   Pins render in a fixed overlay above everything, so no ancestor overflow can
   clip them, and they clamp to the viewport edge instead of disappearing.

   Bar          Add note · count (opens the list) · Send to CD · Hide
   Add          click "Add note", click any element, type, Enter
   List         click a note to fly to it. Resolve archives it. Delete is forever.
   Send to CD   builds a work prompt from the open notes and copies it
   Keys         N toggles pins, L toggles the list, Esc cancels
*/
(function () {
  const FILE = '.review-notes.state.json';
  const VIS = 'otr-notes-visible';
  const STORE = 'otr-notes:' + location.pathname;
  let notes = [];
  let visible = localStorage.getItem(VIS) !== '0';
  let adding = false, panelOpen = false, tab = 'open';
  let overlay = null, barEl = null, panelEl = null, toastT = 0;

  /* ── styles ─────────────────────────────────────────────────── */
  const style = document.createElement('style');
  style.textContent = `
  .rn-overlay{position:fixed;inset:0;z-index:2147481000;pointer-events:none}
  .rn-pin{position:absolute;width:22px;height:22px;border-radius:999px;background:#F79009;color:#fff;
    font:800 11px/22px 'Figtree',system-ui,sans-serif;text-align:center;cursor:pointer;pointer-events:auto;
    box-shadow:0 1px 5px rgba(16,24,40,.4),0 0 0 2px #fff;transition:background .12s}
  .rn-pin:hover{background:#DC6803}
  .rn-pin.rn-edge{opacity:.55;box-shadow:0 1px 5px rgba(16,24,40,.3),0 0 0 2px #fff}
  .rn-pin.rn-sel{background:#B54708}
  .rn-bubble{position:absolute;width:250px;background:#1F242F;color:#fff;border-radius:12px;padding:12px 13px;
    font:400 12.5px/1.5 'Figtree',system-ui,sans-serif;box-shadow:0 10px 34px rgba(12,17,29,.4);pointer-events:auto}
  .rn-bubble b{display:block;font-size:10px;font-weight:800;letter-spacing:.6px;text-transform:uppercase;color:rgba(255,255,255,.5);margin-bottom:6px}
  .rn-bubble .rn-acts{display:flex;gap:14px;margin-top:11px;font-size:11.5px;font-weight:700}
  .rn-bubble .rn-acts span{cursor:pointer}
  .rn-bubble .rn-res{color:#75E0A7}.rn-bubble .rn-del{color:#FDA29B}.rn-bubble .rn-snd{color:#84ADFF}
  .rn-input{position:absolute;width:250px;pointer-events:auto;z-index:2147481500}
  .rn-input textarea{width:100%;height:70px;resize:none;border-radius:12px;border:1.5px solid #F79009;padding:9px 10px;
    font:400 12.5px/1.45 'Figtree',system-ui,sans-serif;outline:none;box-shadow:0 10px 30px rgba(12,17,29,.28)}
  .rn-bar{position:fixed;right:18px;bottom:18px;z-index:2147482000;display:flex;align-items:center;gap:6px;background:#fff;
    border:1px solid #ECECED;border-radius:999px;padding:6px 8px 6px 15px;box-shadow:0 6px 24px rgba(16,24,40,.16);
    font:700 12.5px 'Figtree',system-ui,sans-serif;color:#1F242F}
  .rn-bar .rn-count{color:#B54708;background:#FFFAEB;border:1px solid #FEDF89;border-radius:999px;padding:3px 9px;font-size:11px;font-weight:800;cursor:pointer}
  .rn-bar .rn-count:hover{background:#FEF0C7}
  .rn-bar button{font:700 12px 'Figtree',system-ui,sans-serif;border:1px solid #ECECED;background:#fff;color:#1F242F;
    border-radius:999px;padding:6px 11px;cursor:pointer}
  .rn-bar button:hover{background:#F9FAFB}
  .rn-bar button.on{background:#F79009;border-color:#F79009;color:#fff}
  .rn-bar button.send{background:#EFF4FF;border-color:#B2CCFF;color:#00359E}
  .rn-bar button.send:hover{background:#D1E0FF}
  .rn-panel{position:fixed;top:0;right:0;bottom:0;width:376px;background:#fff;border-left:1px solid #ECECED;
    box-shadow:-12px 0 40px rgba(16,24,40,.1);z-index:2147481800;display:flex;flex-direction:column;
    transform:translateX(100%);transition:transform .22s cubic-bezier(.2,.7,.3,1);font-family:'Figtree',system-ui,sans-serif}
  .rn-panel.open{transform:none}
  .rn-head{padding:18px 20px 0}
  .rn-head h3{margin:0;font-size:17px;font-weight:800;letter-spacing:-.3px;display:flex;align-items:center;gap:8px}
  .rn-head h3 .x{margin-left:auto;font-size:20px;font-weight:400;color:#85888E;cursor:pointer;line-height:1}
  .rn-tabs{display:flex;gap:18px;margin-top:14px;border-bottom:1px solid #ECECED}
  .rn-tabs div{font-size:12.5px;font-weight:800;color:#85888E;padding-bottom:10px;cursor:pointer;border-bottom:2px solid transparent;margin-bottom:-1px}
  .rn-tabs div.on{color:#1F242F;border-bottom-color:#F79009}
  .rn-list{flex:1;overflow:auto;padding:8px 12px 16px}
  .rn-item{border:1px solid #ECECED;border-radius:12px;padding:12px 13px;margin-top:8px;cursor:pointer;background:#fff}
  .rn-item:hover{border-color:#CECFD2;background:#FCFCFD}
  .rn-item .top{display:flex;align-items:center;gap:8px;margin-bottom:6px}
  .rn-item .num{width:19px;height:19px;border-radius:999px;background:#F79009;color:#fff;font-size:10.5px;font-weight:800;
    display:flex;align-items:center;justify-content:center;flex:none}
  .rn-item.done .num{background:#17B26A}
  .rn-item .where{font-size:10.5px;font-weight:800;letter-spacing:.5px;text-transform:uppercase;color:#85888E;
    overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .rn-item p{margin:0;font-size:13.5px;line-height:1.5;color:#333741}
  .rn-item .row{display:flex;gap:12px;margin-top:10px;font-size:11.5px;font-weight:700}
  .rn-item .row span{cursor:pointer}
  .rn-item .res{color:#067647}.rn-item .del{color:#D92D20}.rn-item .snd{color:#004EEB}.rn-item .undo{color:#85888E}
  .rn-item .sent{margin-top:8px;font-size:10.5px;font-weight:800;letter-spacing:.5px;text-transform:uppercase;color:#004EEB}
  .rn-empty{padding:26px 8px;font-size:13.5px;color:#85888E;line-height:1.55}
  .rn-foot{border-top:1px solid #ECECED;padding:14px 16px;display:flex;gap:8px}
  .rn-foot button{flex:1;font:700 12.5px 'Figtree',system-ui,sans-serif;border-radius:999px;padding:9px;cursor:pointer;border:1px solid #ECECED;background:#fff;white-space:nowrap}
  .rn-foot button.p{background:#155EEF;border-color:#155EEF;color:#fff}
  .rn-toast{position:fixed;bottom:74px;right:18px;z-index:2147482100;background:#1F242F;color:#fff;border-radius:10px;
    padding:11px 14px;font:700 12.5px 'Figtree',system-ui,sans-serif;box-shadow:0 8px 28px rgba(12,17,29,.34)}
  .rn-adding .dc-card *{cursor:crosshair!important}
  .rn-hit{outline:2px solid #F79009!important;outline-offset:1px}
  @keyframes rn-flash{0%,100%{box-shadow:0 0 0 0 rgba(247,144,9,0)}
    18%{box-shadow:0 0 0 5px rgba(247,144,9,.55)}60%{box-shadow:0 0 0 5px rgba(247,144,9,.35)}}
  .rn-flash{animation:rn-flash 1.5s ease-out 1;border-radius:4px}
  `;
  document.head.appendChild(style);

  /* ── locating elements ──────────────────────────────────────── */
  function pathOf(el) {
    const card = el.closest('.dc-card');
    if (!card) return null;
    const slot = el.closest('[data-dc-slot]');
    const parts = [];
    let n = el;
    while (n && n !== card) {
      const p = n.parentElement; if (!p) break;
      parts.unshift(Array.prototype.indexOf.call(p.children, n));
      n = p;
    }
    return { slot: slot ? slot.getAttribute('data-dc-slot') : null, path: parts.join('.'),
      label: labelOf(slot) };
  }
  function labelOf(slot) {
    if (!slot) return '';
    const l = slot.querySelector('.dc-labeltext');
    return l ? l.textContent.trim() : (slot.getAttribute('data-dc-slot') || '');
  }
  function resolve(note) {
    const slot = note.slot ? document.querySelector('[data-dc-slot="' + note.slot + '"]') : null;
    const card = slot ? slot.querySelector('.dc-card') : document.querySelector('.dc-card');
    if (!card) return null;
    let n = card;
    for (const i of String(note.path).split('.').filter(s => s !== '')) {
      n = n.children[+i]; if (!n) return null;
    }
    return n;
  }

  /* ── persistence ────────────────────────────────────────────── */
  async function load() {
    let fromFile = [];
    try { const r = await fetch(FILE, { cache: 'no-store' });
      if (r.ok) { const j = await r.json(); fromFile = j.notes || []; } } catch (e) {}
    let local = [];
    try { local = JSON.parse(localStorage.getItem(STORE) || '[]'); } catch (e) {}
    // local is the live layer and wins; the sidecar is the committed baseline
    const byId = {};
    fromFile.forEach(n => { byId[n.id] = n; });
    local.forEach(n => { byId[n.id] = n; });
    notes = Object.keys(byId).map(k => byId[k]).sort((a, b) => (a.created || '').localeCompare(b.created || ''));
    if (local.length) notes = local.slice();
  }
  let saveT;
  function save() {
    try { localStorage.setItem(STORE, JSON.stringify(notes)); } catch (e) {}
    clearTimeout(saveT);
    saveT = setTimeout(() => {
      // opportunistic: only boards at the project root can write their sidecar
      if (window.omelette && window.omelette.writeFile)
        window.omelette.writeFile(FILE, JSON.stringify({ notes: notes }, null, 1)).catch(() => {});
    }, 200);
  }
  const openNotes = () => notes.filter(n => !n.resolved);
  const doneNotes = () => notes.filter(n => n.resolved);

  /* ── pins in a fixed overlay ────────────────────────────────── */
  function ensureOverlay() {
    if (overlay) return overlay;
    overlay = document.createElement('div');
    overlay.className = 'rn-overlay';
    overlay.setAttribute('data-omelette-chrome', '');
    document.body.appendChild(overlay);
    return overlay;
  }
  function renderPins() {
    ensureOverlay();
    overlay.querySelectorAll('.rn-pin').forEach(p => p.remove());
    if (!visible) return;
    openNotes().forEach((note, i) => {
      const pin = document.createElement('div');
      pin.className = 'rn-pin';
      pin.dataset.id = note.id;
      pin.textContent = i + 1;
      pin.title = note.text;
      pin.onclick = (e) => { e.stopPropagation(); bubble(note, i + 1); };
      overlay.appendChild(pin);
    });
    position();
  }
  function position() {
    if (!overlay) return;
    const vw = window.innerWidth, vh = window.innerHeight;
    const right = panelOpen ? vw - 376 : vw;
    overlay.querySelectorAll('.rn-pin').forEach(pin => {
      const note = notes.find(n => n.id === pin.dataset.id);
      const el = note && resolve(note);
      if (!el) { pin.style.display = 'none'; return; }
      const r = el.getBoundingClientRect();
      let x = r.right - 11, y = r.top - 11;
      const off = r.right < 4 || r.left > right - 4 || r.bottom < 4 || r.top > vh - 4;
      x = Math.max(6, Math.min(x, right - 28));
      y = Math.max(6, Math.min(y, vh - 28));
      pin.style.display = '';
      pin.style.transform = 'translate(' + Math.round(x) + 'px,' + Math.round(y) + 'px)';
      pin.classList.toggle('rn-edge', off);
    });
    const b = overlay.querySelector('.rn-bubble');
    if (b && b.dataset.id) {
      const note = notes.find(n => n.id === b.dataset.id);
      const el = note && resolve(note);
      if (el) {
        const r = el.getBoundingClientRect();
        const x = Math.max(8, Math.min(r.right - 11, right - 262));
        const y = Math.max(8, Math.min(r.top + 16, vh - 150));
        b.style.transform = 'translate(' + Math.round(x) + 'px,' + Math.round(y) + 'px)';
      }
    }
  }
  let sig = '';
  function tick() {
    const w = document.querySelector('.design-canvas [style*="translate3d"]') ||
      document.querySelector('[style*="translate3d"]');
    const s = (w ? w.style.transform : '') + '|' + window.innerWidth + 'x' + window.innerHeight +
      '|' + window.scrollY + '|' + panelOpen + '|' + notes.length;
    if (s !== sig) { sig = s; position(); }
    requestAnimationFrame(tick);
  }

  function bubble(note, n) {
    ensureOverlay();
    overlay.querySelectorAll('.rn-bubble').forEach(x => x.remove());
    const b = document.createElement('div');
    b.className = 'rn-bubble';
    b.dataset.id = note.id;
    b.innerHTML = '<b>Note ' + n + ' • ' + (note.label || 'artboard') + '</b>';
    b.appendChild(document.createTextNode(note.text));
    const acts = document.createElement('div');
    acts.className = 'rn-acts';
    acts.innerHTML = '<span class="rn-snd">Send to CD</span><span class="rn-res">Resolve</span><span class="rn-del">Delete</span>';
    acts.querySelector('.rn-snd').onclick = (e) => { e.stopPropagation(); sendToCD([note]); };
    acts.querySelector('.rn-res').onclick = (e) => { e.stopPropagation(); resolveNote(note.id, true); b.remove(); };
    acts.querySelector('.rn-del').onclick = (e) => { e.stopPropagation(); del(note.id); b.remove(); };
    b.appendChild(acts);
    overlay.appendChild(b);
    position();
    const off = (e) => { if (!b.contains(e.target)) { b.remove(); document.removeEventListener('pointerdown', off, true); } };
    setTimeout(() => document.addEventListener('pointerdown', off, true), 0);
  }

  /* ── add mode ───────────────────────────────────────────────── */
  let hovered = null;
  function onMove(e) {
    if (!adding) return;
    const t = document.elementFromPoint(e.clientX, e.clientY);
    const el = t && t.closest ? t.closest('.dc-card *') : null;
    if (hovered && hovered !== el) hovered.classList.remove('rn-hit');
    hovered = el;
    if (hovered) hovered.classList.add('rn-hit');
  }
  function onPick(e) {
    if (!adding) return;
    const t = document.elementFromPoint(e.clientX, e.clientY);
    const el = t && t.closest ? t.closest('.dc-card *') : null;
    if (!el) return;
    e.preventDefault(); e.stopPropagation();
    setAdding(false);
    const loc = pathOf(el); if (!loc) return;
    const r = el.getBoundingClientRect();
    const wrap = document.createElement('div');
    wrap.className = 'rn-input';
    wrap.setAttribute('data-omelette-chrome', '');
    wrap.style.left = Math.max(8, Math.min(r.right - 11, window.innerWidth - 262)) + 'px';
    wrap.style.top = Math.max(8, Math.min(r.top + 16, window.innerHeight - 120)) + 'px';
    const ta = document.createElement('textarea');
    ta.placeholder = 'Note to self. Enter to save, Esc to cancel.';
    wrap.appendChild(ta);
    document.body.appendChild(wrap);
    ta.focus();
    ta.onkeydown = (ev) => {
      if (ev.key === 'Escape') { wrap.remove(); }
      if (ev.key === 'Enter' && !ev.shiftKey) {
        ev.preventDefault();
        const text = ta.value.trim(); wrap.remove();
        if (text) {
          notes.push({ id: 'n' + Date.now(), slot: loc.slot, path: loc.path, label: loc.label,
            text: text, created: new Date().toISOString() });
          save(); renderPins(); renderPanel();
        }
      }
    };
  }
  function setAdding(v) {
    adding = v;
    document.body.classList.toggle('rn-adding', v);
    if (!v && hovered) { hovered.classList.remove('rn-hit'); hovered = null; }
    renderBar();
  }

  /* ── fly to a note ──────────────────────────────────────────── */
  function panBy(dx, dy, done) {
    const vp = document.querySelector('.design-canvas') || document.body;
    const capture = Element.prototype.setPointerCapture, release = Element.prototype.releasePointerCapture;
    Element.prototype.setPointerCapture = function () {};
    Element.prototype.releasePointerCapture = function () {};
    const restore = () => { Element.prototype.setPointerCapture = capture; Element.prototype.releasePointerCapture = release; };
    const opt = (x, y, extra) => Object.assign({ bubbles: true, cancelable: true, composed: true,
      pointerId: 4242, pointerType: 'mouse', isPrimary: true, clientX: x, clientY: y, button: 1, buttons: 4 }, extra);
    const x0 = Math.round(window.innerWidth / 2), y0 = Math.round(window.innerHeight / 2);
    try { vp.dispatchEvent(new PointerEvent('pointerdown', opt(x0, y0))); } catch (e) { restore(); return done && done(); }
    const steps = 14; let i = 0;
    (function step() {
      i++;
      const t = i / steps, e = 1 - Math.pow(1 - t, 3);
      const x = Math.round(x0 + dx * e), y = Math.round(y0 + dy * e);
      vp.dispatchEvent(new PointerEvent('pointermove', opt(x, y)));
      if (i < steps) return requestAnimationFrame(step);
      vp.dispatchEvent(new PointerEvent('pointerup', opt(x, y, { button: 1, buttons: 0 })));
      restore();
      done && done();
    })();
  }
  function goTo(note) {
    const el = resolve(note);
    if (!el) { toast('That element is no longer on the board'); return; }
    const r = el.getBoundingClientRect();
    const right = panelOpen ? window.innerWidth - 376 : window.innerWidth;
    const dx = Math.round(right / 2 - (r.left + r.width / 2));
    const dy = Math.round(window.innerHeight / 2 - (r.top + r.height / 2));
    const flash = () => {
      const t = resolve(note); if (!t) return;
      t.classList.remove('rn-flash');
      void t.offsetWidth;
      t.classList.add('rn-flash');
      setTimeout(() => t.classList.remove('rn-flash'), 1600);
      position();
    };
    if (Math.abs(dx) < 6 && Math.abs(dy) < 6) flash();
    else panBy(dx, dy, flash);
  }

  /* ── actions ────────────────────────────────────────────────── */
  function resolveNote(id, v) {
    const n = notes.find(x => x.id === id); if (!n) return;
    n.resolved = v ? new Date().toISOString() : null;
    if (!v) delete n.resolved;
    save(); renderPins(); renderPanel();
  }
  const pendingDel = {};
  function del(id) {
    notes = notes.filter(n => n.id !== id);
    save(); renderPins(); renderPanel();
    toast('Note deleted');
  }
  function boardPath() {
    const p = decodeURIComponent(location.pathname).split('/serve/');
    return p.length > 1 ? p[1] : (location.pathname.split('/').pop() || '');
  }
  function promptFor(list) {
    const lines = ['Work request from a board review.', '', 'Board: ' + boardPath(), ''];
    list.forEach((n, i) => {
      lines.push((i + 1) + '. ' + n.text);
      lines.push('   artboard: ' + (n.label || n.slot || 'unknown'));
      lines.push('   element:  .dc-card child path ' + n.path);
      lines.push('');
    });
    lines.push('For each item, make the change on this board only, then tell me what you changed.');
    return lines.join('\n');
  }
  function copy(text, msg) {
    const done = () => toast(msg);
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, fb);
    else fb();
    function fb() {
      const ta = document.createElement('textarea');
      ta.value = text; ta.style.cssText = 'position:fixed;left:-9999px';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); } catch (e) {}
      ta.remove(); done();
    }
  }
  function sendToCD(list) {
    if (!list.length) { toast('No notes to send'); return; }
    const now = new Date().toISOString();
    list.forEach(n => { const x = notes.find(y => y.id === n.id); if (x) x.sent = now; });
    save(); renderPanel();
    copy(promptFor(list), list.length === 1 ? 'Prompt copied. Paste it into CD.'
      : list.length + ' notes copied as a prompt. Paste into CD.');
  }
  function toast(msg) {
    clearTimeout(toastT);
    document.querySelectorAll('.rn-toast').forEach(t => t.remove());
    const t = document.createElement('div');
    t.className = 'rn-toast';
    t.setAttribute('data-omelette-chrome', '');
    t.textContent = msg;
    document.body.appendChild(t);
    toastT = setTimeout(() => t.remove(), 2600);
  }

  /* ── bar ────────────────────────────────────────────────────── */
  function renderBar() {
    if (!barEl) {
      barEl = document.createElement('div');
      barEl.className = 'rn-bar';
      barEl.setAttribute('data-omelette-chrome', '');
      document.body.appendChild(barEl);
    }
    barEl.innerHTML = '';
    const label = document.createElement('span');
    label.textContent = 'Review notes';
    const count = document.createElement('span');
    count.className = 'rn-count';
    count.textContent = openNotes().length;
    count.title = 'Open the list';
    count.onclick = () => setPanel(!panelOpen);
    const add = document.createElement('button');
    add.textContent = adding ? 'Click an element' : 'Add note';
    add.className = adding ? 'on' : '';
    add.onclick = () => setAdding(!adding);
    const send = document.createElement('button');
    send.className = 'send';
    send.textContent = 'Send to CD';
    send.title = 'Copy every open note as a work prompt';
    send.onclick = () => sendToCD(openNotes());
    const eye = document.createElement('button');
    eye.textContent = visible ? 'Hide' : 'Show';
    eye.onclick = () => { visible = !visible; localStorage.setItem(VIS, visible ? '1' : '0'); renderPins(); };
    barEl.append(label, count, add, send, eye);
  }

  /* ── panel ──────────────────────────────────────────────────── */
  function setPanel(v) { panelOpen = v; renderPanel(); position(); }
  function renderPanel() {
    if (!panelEl) {
      panelEl = document.createElement('div');
      panelEl.className = 'rn-panel';
      panelEl.setAttribute('data-omelette-chrome', '');
      document.body.appendChild(panelEl);
    }
    panelEl.classList.toggle('open', panelOpen);
    renderBar();
    const list = tab === 'open' ? openNotes() : doneNotes();
    panelEl.innerHTML = '';
    const head = document.createElement('div');
    head.className = 'rn-head';
    head.innerHTML = '<h3>Review notes<span class="x">×</span></h3>' +
      '<div class="rn-tabs"><div class="' + (tab === 'open' ? 'on' : '') + '" data-t="open">Open ' + openNotes().length +
      '</div><div class="' + (tab === 'done' ? 'on' : '') + '" data-t="done">Archive ' + doneNotes().length + '</div></div>';
    head.querySelector('.x').onclick = () => setPanel(false);
    head.querySelectorAll('[data-t]').forEach(d => d.onclick = () => { tab = d.getAttribute('data-t'); renderPanel(); });
    panelEl.appendChild(head);

    const box = document.createElement('div');
    box.className = 'rn-list';
    if (!list.length) {
      const e = document.createElement('div');
      e.className = 'rn-empty';
      e.textContent = tab === 'open'
        ? 'No open notes. Click "Add note", then click any element on the board.'
        : 'Nothing archived yet. Resolving a note moves it here; it stays retrievable.';
      box.appendChild(e);
    }
    list.forEach((note, i) => {
      const it = document.createElement('div');
      it.className = 'rn-item' + (note.resolved ? ' done' : '');
      const top = document.createElement('div');
      top.className = 'top';
      top.innerHTML = '<span class="num">' + (note.resolved ? '✓' : i + 1) + '</span><span class="where">' +
        (note.label || note.slot || 'artboard') + '</span>';
      const p = document.createElement('p');
      p.textContent = note.text;
      it.append(top, p);
      if (note.sent) {
        const s = document.createElement('div');
        s.className = 'sent';
        s.textContent = 'sent to CD ' + note.sent.slice(5, 10);
        it.appendChild(s);
      }
      const row = document.createElement('div');
      row.className = 'row';
      if (note.resolved) {
        row.innerHTML = '<span class="undo">Reopen</span><span class="del">Delete forever</span>';
        row.querySelector('.undo').onclick = (e) => { e.stopPropagation(); resolveNote(note.id, false); };
      } else {
        row.innerHTML = '<span class="snd">Send to CD</span><span class="res">Resolve</span><span class="del">Delete</span>';
        row.querySelector('.snd').onclick = (e) => { e.stopPropagation(); sendToCD([note]); };
        row.querySelector('.res').onclick = (e) => { e.stopPropagation(); resolveNote(note.id, true); };
      }
      const delBtn = row.querySelector('.del');
      delBtn.onclick = (e) => {
        e.stopPropagation();
        if (pendingDel[note.id]) { del(note.id); return; }
        pendingDel[note.id] = 1;
        delBtn.textContent = 'Click again, gone forever';
        setTimeout(() => { delete pendingDel[note.id]; renderPanel(); }, 3000);
      };
      it.appendChild(row);
      it.onclick = () => goTo(note);
      box.appendChild(it);
    });
    panelEl.appendChild(box);

    const foot = document.createElement('div');
    foot.className = 'rn-foot';
    const sendAll = document.createElement('button');
    sendAll.className = 'p';
    sendAll.textContent = 'Send ' + openNotes().length + ' to CD';
    sendAll.onclick = () => sendToCD(openNotes());
    const addBtn = document.createElement('button');
    addBtn.textContent = 'Add note';
    addBtn.onclick = () => { setPanel(false); setAdding(true); };
    const exp = document.createElement('button');
    exp.textContent = 'Export';
    exp.title = 'Copy all notes as JSON, to commit into the board folder';
    exp.onclick = () => copy(JSON.stringify({ notes: notes }, null, 1), 'Notes JSON copied');
    foot.append(sendAll, addBtn, exp);
    panelEl.appendChild(foot);
  }

  /* ── boot ───────────────────────────────────────────────────── */
  document.addEventListener('keydown', (e) => {
    if (e.target.matches('input,textarea,[contenteditable]')) return;
    if (e.key === 'n' || e.key === 'N') { visible = !visible; localStorage.setItem(VIS, visible ? '1' : '0'); renderPins(); }
    if (e.key === 'l' || e.key === 'L') setPanel(!panelOpen);
    if (e.key === 'Escape') { if (adding) setAdding(false); else if (panelOpen) setPanel(false); }
  });
  document.addEventListener('pointermove', onMove, true);
  document.addEventListener('pointerdown', onPick, true);

  (async function boot() {
    await load();
    const t0 = Date.now();
    (function wait() {
      if (document.querySelector('.dc-card') || Date.now() - t0 > 20000) {
        renderPins(); renderPanel(); requestAnimationFrame(tick); return;
      }
      setTimeout(wait, 250);
    })();
  })();
})();
