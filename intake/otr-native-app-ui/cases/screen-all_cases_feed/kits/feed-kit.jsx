// feed-kit.jsx — Cases-tab FEED-SCREEN kit (the scaffolding AROUND the cards).
// Builds on otr-kit + otr-cpc. Card styling follows the Board F direction:
// one blue CTA everywhere, color stays on badges + the red overdue alert.
// Everything here is interactive: tabs/filters/sort visibly change the feed,
// sheets + menus open/close. Light-fidelity per the brief.
/* __IIFE__ */ ;(function(){
const { CASES, title, primaryAction, badgeNote, StatusBadge, OTR_STATUS, OTR_TONE,
  AttorneyRow, MetaLine, OverduePill, Confetti } = window;
const { FeatureIcon: FI } = window.OffTheRecordDesignSystem_6eff96;

// FA-fallback icon helper (chrome glyphs not in the Streamline registry)
function Ico({ name, size = 16, color = 'currentColor', style }){
  return <FI name={name} size={size} color={color} style={style} />;
}

// ── one-time CSS (feed chrome) ─────────────────────────────────────────────
if (typeof document !== 'undefined' && !document.getElementById('feed-kit')) {
  const s = document.createElement('style');
  s.id = 'feed-kit';
  s.textContent = `
  .feed-device{ display:flex; flex-direction:column; }
  .feed-device .otr-feed{ padding:4px 16px 18px; }
  .feed-scroll{ flex:1 1 auto; overflow-y:auto; overflow-x:hidden; min-height:0;
    scrollbar-width:none; }
  .feed-scroll::-webkit-scrollbar{ display:none; }
  .feed-head{ flex:none; background:var(--wf-bg); }
  .feed-appbar{ padding:4px 20px 10px; display:flex; align-items:center; justify-content:space-between; gap:10px; }
  .feed-appbar h1{ margin:0; font-size:25px; font-weight:800; letter-spacing:-.5px; color:var(--wf-ink); }
  .feed-iconbtn{ width:38px; height:38px; border-radius:50%; background:#fff; border:1px solid var(--wf-line);
    display:flex; align-items:center; justify-content:center; cursor:pointer; color:var(--wf-strong); flex:none; }
  .feed-iconbtn.ghost{ background:transparent; border-color:transparent; }
  .feed-avatar{ width:34px; height:34px; border-radius:50%; flex:none;
    background:linear-gradient(160deg,#e2e6ec,#ccd1da); border:1px solid var(--wf-line); }

  /* segmented control (Active vs Resolved · fixed states) */
  .seg{ display:flex; background:var(--wf-fill); border-radius:999px; padding:3px; gap:2px; }
  .seg button{ flex:1; border:none; background:transparent; height:34px; border-radius:999px; font:inherit;
    font-size:13.5px; font-weight:700; color:var(--wf-muted); cursor:pointer; display:flex;
    align-items:center; justify-content:center; gap:7px; transition:background .15s,color .15s,box-shadow .15s; }
  .seg button.on{ background:#fff; color:var(--wf-ink); box-shadow:0 1px 3px rgba(16,24,40,.14); }
  .seg .cnt{ font-size:11px; font-weight:800; min-width:18px; height:18px; padding:0 5px; border-radius:999px;
    display:inline-flex; align-items:center; justify-content:center; background:var(--wf-line2); color:var(--wf-muted); }
  .seg button.on .cnt{ background:var(--otr-blue); color:#fff; }
  .seg button.on .cnt.alert{ background:var(--money); }

  /* filter / sort toolbar */
  .feed-tools{ display:flex; align-items:center; gap:8px; padding:10px 20px 12px; }
  .feed-tools .grow{ flex:1; min-width:0; display:flex; gap:7px; overflow:hidden; }
  .toolbtn{ display:inline-flex; align-items:center; gap:6px; height:34px; padding:0 13px; border-radius:999px;
    border:1px solid var(--wf-line); background:#fff; font:inherit; font-size:12.5px; font-weight:700;
    color:var(--wf-strong); cursor:pointer; white-space:nowrap; flex:none; transition:background .12s,border-color .12s; }
  .toolbtn:hover{ background:var(--wf-fill); }
  .toolbtn.active{ border-color:var(--otr-blue); color:var(--otr-blue); }
  .toolbtn .pip{ min-width:16px; height:16px; padding:0 4px; border-radius:999px; background:var(--otr-blue); color:#fff;
    font-size:10px; font-weight:800; display:inline-flex; align-items:center; justify-content:center; }

  /* search field */
  .search{ display:flex; align-items:center; gap:9px; background:var(--wf-fill); border-radius:12px;
    padding:0 12px; height:42px; flex:1; min-width:0; }
  .search input{ border:none; background:transparent; outline:none; font:inherit; font-size:14px; flex:1;
    min-width:0; color:var(--wf-ink); }
  .search input::placeholder{ color:var(--wf-faint); }
  .search .clr{ cursor:pointer; color:var(--wf-faint); display:flex; }

  /* group header (collapsible) */
  .ghead{ display:flex; align-items:center; gap:8px; padding:16px 4px 8px; cursor:pointer; user-select:none; }
  .ghead .gh-chev{ transition:transform .18s; color:var(--wf-faint); display:flex; }
  .ghead.collapsed .gh-chev{ transform:rotate(-90deg); }
  .ghead .gh-t{ font-size:12px; font-weight:800; letter-spacing:.6px; text-transform:uppercase; color:var(--wf-strong); }
  .ghead .gh-c{ font-size:11px; font-weight:800; min-width:18px; height:18px; padding:0 5px; border-radius:999px;
    display:inline-flex; align-items:center; justify-content:center; background:var(--wf-line2); color:var(--wf-muted); }
  .ghead.action .gh-t{ color:var(--money); }
  .ghead.action .gh-c{ background:var(--money-bg); color:var(--money); }
  .ghead .gh-rule{ flex:1; height:1px; background:var(--wf-line2); }

  /* attention banner (triage) */
  .att-banner{ display:flex; align-items:center; gap:11px; margin:2px 16px 4px; padding:12px 14px; border-radius:14px;
    background:var(--money-bg); border:1px solid var(--money-line); }
  .att-banner .ab-ic{ width:34px; height:34px; border-radius:10px; background:#fff; display:flex;
    align-items:center; justify-content:center; flex:none; box-shadow:0 1px 3px rgba(16,24,40,.08); }
  .att-banner .ab-t{ font-size:13.5px; font-weight:800; color:var(--money); }
  .att-banner .ab-s{ font-size:11.5px; color:#a23; opacity:.85; }

  /* compact / dense row */
  .crow{ display:flex; align-items:center; gap:12px; padding:13px 4px; border-bottom:1px solid var(--wf-line2);
    cursor:pointer; transition:background .12s; }
  .crow:hover{ background:var(--wf-bg); }
  .crow .cr-dot{ width:9px; height:9px; border-radius:50%; flex:none; }
  .crow .cr-main{ flex:1; min-width:0; }
  .crow .cr-t{ font-size:13.5px; font-weight:700; color:var(--wf-ink); white-space:nowrap;
    overflow:hidden; text-overflow:ellipsis; }
  .crow .cr-s{ display:flex; align-items:center; gap:7px; margin-top:3px; }
  .crow .cr-meta{ font-size:11.5px; color:var(--wf-muted); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
  .crow .cr-chev{ color:var(--wf-faint); flex:none; display:flex; }

  /* bottom nav */
  .bnav{ flex:none; display:flex; align-items:flex-end; padding:7px 6px 6px; background:#fff;
    border-top:1px solid var(--wf-line); }
  .bnav .bn{ flex:1; display:flex; flex-direction:column; align-items:center; gap:3px; padding:4px 0;
    color:var(--wf-faint); cursor:pointer; }
  .bnav .bn .bl{ font-size:10.5px; font-weight:700; letter-spacing:.2px; }
  .bnav .bn.on{ color:var(--otr-blue); }
  .bnav-home{ height:5px; width:128px; border-radius:3px; background:var(--wf-ink); opacity:.85;
    margin:6px auto 4px; }

  /* FAB */
  .fab{ position:absolute; right:18px; bottom:86px; width:56px; height:56px; border-radius:50%;
    background:var(--otr-blue); color:#fff; display:flex; align-items:center; justify-content:center;
    box-shadow:0 10px 24px rgba(46,107,255,.42); z-index:15; cursor:pointer; border:none;
    transition:transform .14s,box-shadow .14s; }
  .fab:hover{ transform:translateY(-1px); box-shadow:0 14px 28px rgba(46,107,255,.5); }
  .fab.labeled{ width:auto; border-radius:999px; padding:0 20px 0 18px; gap:9px; font:inherit;
    font-size:14.5px; font-weight:800; }

  /* bottom sheet + dropdown menu */
  .sheet-back{ position:absolute; inset:0; background:rgba(12,17,29,.5); z-index:20; opacity:0;
    pointer-events:none; transition:opacity .22s; }
  .sheet-back.open{ opacity:1; pointer-events:auto; }
  .sheet{ position:absolute; left:0; right:0; bottom:0; z-index:21; background:#fff; border-radius:22px 22px 0 0;
    transform:translateY(100%); transition:transform .28s cubic-bezier(.3,.85,.3,1);
    box-shadow:0 -10px 34px rgba(16,24,40,.2); max-height:86%; display:flex; flex-direction:column; }
  .sheet.open{ transform:translateY(0); }
  .sheet .grab{ width:38px; height:4px; border-radius:2px; background:var(--wf-line); margin:9px auto 4px; flex:none; }
  .sheet-h{ display:flex; align-items:center; justify-content:space-between; padding:8px 18px 6px; flex:none; }
  .sheet-h .st{ font-size:17px; font-weight:800; letter-spacing:-.3px; }
  .sheet-x{ width:30px; height:30px; border-radius:50%; background:var(--wf-fill); border:none; cursor:pointer;
    display:flex; align-items:center; justify-content:center; color:var(--wf-strong); }
  .sheet-body{ padding:6px 18px 22px; overflow-y:auto; scrollbar-width:none; }
  .sheet-body::-webkit-scrollbar{ display:none; }

  /* checkbox / radio rows in sheets + menus */
  .optrow{ display:flex; align-items:center; gap:12px; padding:13px 4px; border-bottom:1px solid var(--wf-line2);
    cursor:pointer; }
  .optrow:last-child{ border-bottom:none; }
  .optrow .ox{ width:22px; height:22px; border-radius:7px; border:2px solid var(--wf-line); flex:none;
    display:flex; align-items:center; justify-content:center; transition:all .12s; }
  .optrow.on .ox{ background:var(--otr-blue); border-color:var(--otr-blue); }
  .optrow .ox.radio{ border-radius:50%; }
  .optrow .ol{ flex:1; font-size:14.5px; font-weight:600; color:var(--wf-ink); }
  .optrow .ocnt{ font-size:12px; font-weight:700; color:var(--wf-faint); }

  .dropmenu{ position:absolute; z-index:25; background:#fff; border-radius:14px; padding:6px;
    box-shadow:0 12px 34px rgba(16,24,40,.18),0 0 0 1px rgba(16,24,40,.05); min-width:188px; }
  .dropmenu button{ display:flex; align-items:center; gap:10px; width:100%; border:none; background:transparent;
    padding:10px 11px; border-radius:9px; font:inherit; font-size:13.5px; font-weight:600; color:var(--wf-ink);
    cursor:pointer; text-align:left; }
  .dropmenu button:hover{ background:var(--wf-fill); }
  .dropmenu button .dm-chk{ margin-left:auto; color:var(--otr-blue); display:flex; opacity:0; }
  .dropmenu button.on .dm-chk{ opacity:1; }
  .dropmenu button.on{ color:var(--otr-blue); }

  .density-pill{ display:flex; background:var(--wf-fill); border-radius:999px; padding:2px; }
  .density-pill button{ border:none; background:transparent; width:32px; height:28px; border-radius:999px;
    display:flex; align-items:center; justify-content:center; cursor:pointer; color:var(--wf-faint); }
  .density-pill button.on{ background:#fff; color:var(--wf-ink); box-shadow:0 1px 2px rgba(16,24,40,.12); }

  .fade{ animation:feed-fade .22s ease; }
  @keyframes feed-fade{ from{ opacity:0; transform:translateY(4px); } to{ opacity:1; transform:none; } }
  @media (prefers-reduced-motion: reduce){ .fade{ animation:none; } }
  `;
  document.head.appendChild(s);
}

// ── curated feed + classification ──────────────────────────────────────────
// One realistic mailbox spanning the status spectrum.
const FEED_KEYS = ['almost','smart','overdue','loe','counter','incomp','unread','active','analyze','dismiss','resolved','cancelled'];

// group buckets for the feed scaffolding
function feedGroup(c){
  const s = c.status;
  if (c.balance && c.balance.overdue) return 'action';
  if (['smartmatchd','almostgone','counter','expired','incomplete','deadline','active-action'].includes(s)) return 'action';
  if (s === 'active' && c.unread) return 'action';
  if (['resolved','dismissed','cancelled','missed'].includes(s)) return 'resolved';
  return 'active';
}
const GROUP_META = {
  action:   { label:'Action needed', icon:'bolt' },
  active:   { label:'Active',        icon:'folder-open' },
  resolved: { label:'Resolved',      icon:'circle-check' },
};

// urgency score (triage + "most urgent" sort) — mirrors §7.2 precedence
function urgency(c){
  if (c.balance && c.balance.overdue) return 100;
  const s = c.status;
  const rank = { almostgone:95, deadline:90, smartmatchd:85, counter:80, 'active-action':75,
    incomplete:70, missed:66, expired:30, remarketing:28, analyzing:48, reassigned:42 };
  if (s === 'active') return c.unread ? 60 : 40;
  if (s === 'resolved' || s === 'dismissed') return 20;
  if (s === 'cancelled') return 10;
  return rank[s] != null ? rank[s] : 35;
}
const MON = { Jan:1,Feb:2,Mar:3,Apr:4,May:5,Jun:6,Jul:7,Aug:8,Sep:9,Oct:10,Nov:11,Dec:12 };
function dateVal(c){ return (parseInt(c.year,10) || 0) * 100 + (MON[c.mon] || 0); }

// sort comparators
function sortFeed(keys, mode){
  const arr = keys.slice();
  if (mode === 'urgency') arr.sort((a,b)=> urgency(CASES[b]) - urgency(CASES[a]));
  else if (mode === 'date') arr.sort((a,b)=> dateVal(CASES[b]) - dateVal(CASES[a]));
  else if (mode === 'status') arr.sort((a,b)=> (OTR_STATUS[CASES[a].status].series) - (OTR_STATUS[CASES[b].status].series));
  return arr;
}

// text search over title + violation + caseId
function matchText(c, q){
  if (!q) return true;
  const hay = `${title(c)} ${c.violation} ${c.caseId} ${c.firm||''} ${c.attorney?c.attorney.name:''}`.toLowerCase();
  return q.toLowerCase().split(/\s+/).every(t => hay.includes(t));
}

// ── key line (the one meta row per card · Board F) ─────────────────────────
function keyLine(c){
  if (c.balance && c.balance.overdue) return null; // shown via red alert
  switch (c.status){
    case 'smartmatchd':   return ['countdown-timer', `Quote $${c.quote.amount} · expires ${c.quote.expires}`];
    case 'almostgone':    return ['countdown-timer', `$${c.quote.amount} · ${c.quote.expires} left`];
    case 'counter':       return ['tag-empty', `Counter offer · $${c.counter.to}`];
    case 'active-action': return ['file-edit', 'Sign your letter of engagement'];
    case 'incomplete':    return ['image-photo-add', 'Ticket photo not provided'];
    case 'analyzing':     return ['triangle-arrow-synchronize-1', 'Finding your best-fit attorney'];
    case 'active':        return c.unread ? ['bell-notification', `${c.unread} new updates from ${c.attorney.name}`] : ['location-pin', `Court ${c.courtDate}`];
    case 'resolved':
    case 'dismissed':     return ['chart-circle-up-growth', c.outcome.result];
    case 'cancelled':     return ['folder-remove', 'Case cancelled'];
    default:              return null;
  }
}

// ── the consistent-CTA card (Board F direction) ────────────────────────────
function FeedCard({ c, onTap }){
  const a = primaryAction(c);
  const cls = a ? (a.kind === 'ghost' ? 'ghost' : 'blue') : null;
  const showQ = c.status === 'smartmatchd' || c.status === 'almostgone';
  const showA = c.attorney && !showQ;
  const kl = keyLine(c);
  return (
    <div className="cpc" onClick={onTap} style={onTap ? { cursor:'pointer' } : null}>
      {c.status === 'dismissed' && <Confetti />}
      <div style={{ display:'flex', gap:11, alignItems:'flex-start' }}>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ display:'flex', justifyContent:'space-between', gap:8, alignItems:'flex-start' }}>
            <p className="ttl">{title(c)}</p>
            <StatusBadge status={c.status} unread={!!c.unread} note={badgeNote(c)} />
          </div>
          <div style={{ display:'flex', gap:8, marginTop:4 }}>
            <span className="classif"><Ico name="tag" size={10} color="var(--wf-muted)" />{c.cls}</span>
            <span style={{ fontSize:11.5, color:'var(--wf-faint)' }}>{c.caseId}</span>
          </div>
        </div>
      </div>
      <div style={{ marginTop:11, display:'flex', flexDirection:'column', gap:8 }}>
        {showQ && <AttorneyRow c={c} quote />}
        {showA && <AttorneyRow c={c} />}
        {kl && <MetaLine icon={kl[0]} strong={c.status === 'active' && !!c.unread}>{kl[1]}</MetaLine>}
        {c.balance && c.balance.overdue && <OverduePill c={c} />}
      </div>
      {a && <div className={`act ${cls} full`} style={{ marginTop:12 }} onClick={(e)=>e.stopPropagation()}>
        {a.icon && <Ico name={a.icon} size={15} color={cls === 'ghost' ? 'var(--wf-ink)' : '#fff'} />}
        {a.label}</div>}
    </div>
  );
}

// ── compact / dense row ────────────────────────────────────────────────────
function dotColor(c){
  const cfg = OTR_STATUS[c.status];
  if (c.balance && c.balance.overdue) return 'var(--money)';
  if (cfg.tone === 'grad') return '#7b5cf0';
  const t = OTR_TONE[cfg.tone];
  return t ? t.light[1] : 'var(--wf-faint)';
}
function CompactRow({ c, onTap }){
  const kl = keyLine(c);
  const al = window.cardAlert ? window.cardAlert(c) : null;
  const secondary = al ? (al.value ? `${al.text} · ${al.value}` : al.text) : (kl ? kl[1] : null);
  const toneColor = al && window.ALERT_TONE && window.ALERT_TONE[al.tone] ? window.ALERT_TONE[al.tone].icon : null;
  return (
    <div className="crow" onClick={onTap}>
      <div className="cr-main">
        <div className="cr-t">{window.tPlace(c)}<span style={{ color:'var(--wf-faint)', fontWeight:600 }}> · {window.tDate(c)}</span></div>
        <div className="cr-s">
          <StatusBadge status={window.lifeStatus(c.status)} size="sm" noIcon />
          {secondary && <>
            {toneColor && <i className="chip-alert" style={{ background: toneColor }} />}
            <span className="cr-meta">{secondary}</span>
          </>}
        </div>
      </div>
      <Ico name="chevron-right" size={14} color="var(--wf-faint)" style={{ flex:'none' }} />
    </div>
  );
}

// ── device shell (status bar + flex column; caller fills head/scroll/nav) ───
function Device({ children, height = 844, bg = 'var(--wf-bg)', style, frame = true }){
  return (
    <div className={`otr otr-frame${frame ? ' screen' : ''} feed-device`} style={{ height, background:bg, ...style }}>
      {frame && <div className="otr-statusbar"><span>9:41</span><span className="dots"><i /><i /><i style={{ width:18 }} /></span></div>}
      {children}
    </div>
  );
}

// ── bottom tab bar (Cases active) ──────────────────────────────────────────
function BottomNav(){
  const items = [['magnifying-glass','Find',false],['folder','Cases',true],['user','Account',false]];
  return (
    <div className="bnav-wrap" style={{ flex:'none' }}>
      <div className="bnav">
        {items.map(([ic,lb,on]) => (
          <div key={lb} className={`bn${on ? ' on' : ''}`}>
            <Ico name={ic} size={19} color={on ? 'var(--otr-blue)' : 'var(--wf-faint)'} />
            <span className="bl">{lb}</span>
          </div>
        ))}
      </div>
      <div style={{ background:'#fff' }}><div className="bnav-home" /></div>
    </div>
  );
}

// ── segmented control ──────────────────────────────────────────────────────
function Seg({ options, value, onChange }){
  return (
    <div className="seg">
      {options.map(o => (
        <button key={o.id} className={value === o.id ? 'on' : ''} onClick={()=>onChange(o.id)}>
          {o.label}
          {o.count != null && <span className={`cnt${o.alert ? ' alert' : ''}`}>{o.count}</span>}
        </button>
      ))}
    </div>
  );
}

// ── bottom sheet ───────────────────────────────────────────────────────────
function Sheet({ open, onClose, title:t, children }){
  return (
    <>
      <div className={`sheet-back${open ? ' open' : ''}`} onClick={onClose} />
      <div className={`sheet${open ? ' open' : ''}`}>
        <div className="grab" />
        {t && <div className="sheet-h"><span className="st">{t}</span>
          <button className="sheet-x" onClick={onClose}><Ico name="xmark" size={15} color="var(--wf-strong)" /></button></div>}
        <div className="sheet-body">{children}</div>
      </div>
    </>
  );
}

Object.assign(window, {
  Ico, FEED_KEYS, feedGroup, GROUP_META, urgency, dateVal, sortFeed, matchText,
  keyLine, FeedCard, CompactRow, dotColor, Device, BottomNav, Seg, Sheet,
});

})();
