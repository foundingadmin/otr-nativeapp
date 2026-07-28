// feed-assembled.jsx — BOARD: "best of all parts" assembled Cases screen.
// One screen pulling together: card-density toggle (layout #4), segmented
// Active/Resolved tabs + sub-chips (layout #1), inline search (mechanics #1),
// sort presented in a bottom sheet (sort #5 × filter sheet #2), the floating
// "New ticket" FAB (screen actions), and a paired empty state that travels
// with every variation. Three layout divergences, same feature set.
/* __IIFE__ */ ;(function(){
const { useState } = React;
const { DCSection, DCArtboard, DCPostIt, CASES, FEED_KEYS, feedGroup, matchText, sortFeed,
  urgency, dateVal, cardAlert, StatusBadge, ALERT_TONE, OTR_STATUS,
  FeedCard, CPCConsistent, CompactRow, Device, BottomNav, Seg, Sheet, Ico } = window;
const { useTweaks, TweaksPanel, TweakSection, TweakToggle } = window;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "showFab": false,
  "showNav": true,
  "showFrame": true
}/*EDITMODE-END*/;

// ── feed slicing ───────────────────────────────────────────────────────────
const activeKeys   = () => FEED_KEYS.filter(k => feedGroup(CASES[k]) !== 'resolved');
const resolvedKeys = () => FEED_KEYS.filter(k => feedGroup(CASES[k]) === 'resolved');
const actionCount  = () => FEED_KEYS.filter(k => feedGroup(CASES[k]) === 'action').length;

const SUBCHIPS = {
  active:   [['all','All'],['action','Action needed'],['progress','In progress']],
  resolved: [['all','All'],['won','Won'],['closed','Closed']],
};

function buildList({ tab, chip, q, sort }){
  let keys = tab === 'active' ? activeKeys() : resolvedKeys();
  if (tab === 'active'){
    if (chip === 'action')   keys = keys.filter(k => feedGroup(CASES[k]) === 'action');
    if (chip === 'progress') keys = keys.filter(k => feedGroup(CASES[k]) === 'active');
  } else {
    if (chip === 'won')    keys = keys.filter(k => ['dismissed','resolved'].includes(CASES[k].status));
    if (chip === 'closed') keys = keys.filter(k => ['cancelled','missed'].includes(CASES[k].status));
  }
  keys = keys.filter(k => matchText(CASES[k], q));
  return sortFeed(keys, sort);
}

const SORTS = [
  ['urgency','Most urgent','bolt'],
  ['date','Date added','clock'],
  ['status','Status','layer-group'],
];
const SORT_LABEL = { urgency:'Most urgent', date:'Date added', status:'Status' };

const segOptions = () => ([
  { id:'active',   label:'Active',   count:activeKeys().length,   alert:actionCount()>0 },
  { id:'resolved', label:'Resolved', count:resolvedKeys().length },
]);

// ── shared feed state ──────────────────────────────────────────────────────
function useFeed(initialDensity){
  const [tab, setTab]         = useState('active');
  const [chip, setChip]       = useState('all');
  const [q, setQ]             = useState('');
  const [sort, setSort]       = useState('urgency');
  const [density, setDensity] = useState(initialDensity || 'comfortable');
  const [sortOpen, setSortOpen] = useState(false);
  const [addOpen, setAddOpen]   = useState(false);
  const switchTab = (t) => { setTab(t); setChip('all'); };
  const keys = buildList({ tab, chip, q, sort });
  return { tab, switchTab, chip, setChip, q, setQ, sort, setSort, density, setDensity,
    sortOpen, setSortOpen, addOpen, setAddOpen, keys };
}

// ── small pieces ───────────────────────────────────────────────────────────
function SearchField({ q, setQ, style }){
  return (
    <div className="search" style={style}>
      <Ico name="magnifying-glass" size={15} color="var(--wf-faint)" />
      <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search cases" />
      {q && <span className="clr" onClick={()=>setQ('')}><Ico name="circle-xmark" size={16} color="var(--wf-faint)" /></span>}
    </div>
  );
}

function DensityToggle({ density, setDensity }){
  return (
    <div className="density-pill">
      <button className={density==='comfortable'?'on':''} onClick={()=>setDensity('comfortable')} title="Cards">
        <Ico name="table-cells-large" size={14} /></button>
      <button className={density==='compact'?'on':''} onClick={()=>setDensity('compact')} title="Compact list">
        <Ico name="list" size={14} /></button>
    </div>
  );
}

function SubChips({ tab, chip, setChip, style }){
  return (
    <div className="otr-filters" style={{ padding:'0 20px 12px', ...style }}>
      {SUBCHIPS[tab].map(([id,lb]) => (
        <span key={id} className={`otr-chip${chip===id?' on':''}`} onClick={()=>setChip(id)}>{lb}</span>
      ))}
    </div>
  );
}

function MiniEmpty({ q }){
  return (
    <div style={{ textAlign:'center', padding:'46px 20px', color:'var(--wf-muted)' }}>
      <Ico name="magnifying-glass" size={30} color="var(--wf-line)" />
      <div style={{ fontSize:13.5, fontWeight:700, marginTop:10 }}>No matches</div>
      <div style={{ fontSize:12, marginTop:3, color:'var(--wf-faint)' }}>{q ? `for “${q}”` : 'Try a different filter.'}</div>
    </div>
  );
}

function FeedBody({ cases, density, q }){
  if (!cases.length) return <MiniEmpty q={q} />;
  if (density === 'compact')
    return <div style={{ padding:'2px 18px 92px' }} className="fade">{cases.map((c,i) => <CompactRow key={c.caseId+'-'+i} c={c} />)}</div>;
  return <div className="otr-feed fade" style={{ paddingBottom:92 }}>{cases.map((c,i) => <CPCConsistent key={c.caseId+'-'+i} c={c} />)}</div>;
}

// ── sort sheet (sort #5 options, presented in filter sheet #2's bottom sheet) ─
function SortSheet({ open, onClose, sort, setSort }){
  return (
    <Sheet open={open} onClose={onClose} title="Sort by">
      {SORTS.map(([id,label,icon]) => (
        <div key={id} className={`optrow${sort===id?' on':''}`} onClick={()=>setSort(id)}>
          <span className="ox radio">{sort===id && <Ico name="check" size={13} color="#fff" />}</span>
          <span style={{ width:24, display:'flex', flex:'none' }}>
            <Ico name={icon} size={16} color={sort===id?'var(--otr-blue)':'var(--wf-muted)'} /></span>
          <span className="ol">{label}</span>
        </div>
      ))}
      <button className="act blue full" style={{ height:46, marginTop:16 }} onClick={onClose}>Done</button>
    </Sheet>
  );
}

// ── add-a-ticket sheet (FAB target) ─────────────────────────────────────────
function AddSheet({ open, onClose }){
  const opt = (icon, label, sub) => (
    <div className="optrow" style={{ alignItems:'flex-start' }} onClick={onClose}>
      <span style={{ width:42, height:42, borderRadius:12, background:'var(--wf-fill)', flex:'none',
        display:'flex', alignItems:'center', justifyContent:'center' }}>
        <Ico name={icon} size={18} color="var(--otr-blue)" /></span>
      <span style={{ flex:1 }}>
        <span style={{ display:'block', fontSize:15, fontWeight:700, color:'var(--wf-ink)' }}>{label}</span>
        <span style={{ display:'block', fontSize:12.5, color:'var(--wf-muted)', marginTop:1 }}>{sub}</span>
      </span>
      <Ico name="chevron-right" size={14} color="var(--wf-faint)" style={{ marginTop:13 }} />
    </div>
  );
  return (
    <Sheet open={open} onClose={onClose} title="Add a ticket">
      <p style={{ margin:'0 0 8px', fontSize:13, color:'var(--wf-muted)', lineHeight:1.45 }}>
        We'll pull the details and match you with a local attorney.</p>
      {opt('camera', 'Take a photo', 'Snap the citation — we read it for you')}
      {opt('image', 'Upload from library', 'Choose an existing photo or PDF')}
      {opt('keyboard', 'Enter manually', 'Type the citation number and details')}
    </Sheet>
  );
}

function Fab({ onClick }){
  return (
    <button className="fab labeled" onClick={onClick}>
      <Ico name="plus" size={18} color="#fff" />New ticket</button>
  );
}

// ── empty state (separate screen, paired with each variation) ───────────────
function EmptyState({ showNav = true, showFrame = true }){
  return (
    <Device frame={showFrame}>
      <div className="feed-head">
        <div className="feed-appbar"><h1>Cases</h1></div>
      </div>
      <div className="feed-scroll">
        <div style={{ height:'100%', display:'flex', flexDirection:'column', alignItems:'center',
          justifyContent:'center', textAlign:'center', padding:'0 38px 40px' }}>
          <div style={{ width:96, height:96, borderRadius:28, background:'#eef2fc',
            display:'flex', alignItems:'center', justifyContent:'center', marginBottom:22 }}>
            <Ico name="folder-open" size={42} color="var(--otr-blue)" />
          </div>
          <h2 style={{ margin:0, fontSize:21, fontWeight:800, letterSpacing:-.4, color:'var(--wf-ink)' }}>No cases yet</h2>
          <p style={{ margin:'8px 0 0', fontSize:14, color:'var(--wf-muted)', lineHeight:1.5 }} className="balance">
            Add your traffic ticket and we'll match you with a local attorney who can fight it — no court, no points.</p>
          <button className="act blue full" style={{ height:50, fontSize:16, marginTop:24 }}>
            <Ico name="plus" size={17} color="#fff" />Add your ticket</button>
          <button className="act ghost full" style={{ height:46, marginTop:11 }}>How it works</button>
          <div style={{ display:'flex', alignItems:'center', gap:7, marginTop:20, fontSize:12, color:'var(--wf-faint)', fontWeight:600 }}>
            <Ico name="shield-halved" size={13} color="var(--wf-faint)" />Money-back guarantee
          </div>
        </div>
      </div>
      {showNav && <BottomNav />}
    </Device>
  );
}

// ── filter model: All · Incomplete · Active · Resolved · Cancelled ──────────
const NEW_CHIPS = [['all','All'],['incomplete','Incomplete'],['active','Active'],['resolved','Resolved'],['cancelled','Cancelled']];
function filterOf(c){
  if (c.status === 'incomplete') return 'incomplete';
  if (c.status === 'cancelled' || c.status === 'missed') return 'cancelled';
  if (c.status === 'resolved' || c.status === 'dismissed') return 'resolved';
  return 'active';
}
const inChip = (c, chip) => chip === 'all' ? true : filterOf(c) === chip;

// attention: a filter lights up when any card inside it carries an internal toast
const TONE_RANK  = { error:5, warning:4, info:3, match:2, success:1, inactive:0 };
const TONE_COLOR = { error:'var(--red-600)', warning:'var(--amber-500)', info:'var(--blue-600)',
  match:'#6a5bd0', success:'var(--green-600)', inactive:'var(--wf-faint)' };
function chipTone(cases, chip){
  let best = null, rank = -1;
  cases.forEach(c => {
    if (!inChip(c, chip)) return;
    const al = cardAlert(c);
    if (al && TONE_RANK[al.tone] > rank){ rank = TONE_RANK[al.tone]; best = al.tone; }
  });
  return best;
}
function sortCases(cases, mode){
  const arr = cases.slice();
  if (mode === 'date') arr.sort((a,b)=> dateVal(b) - dateVal(a));
  else arr.sort((a,b)=> urgency(b) - urgency(a));
  return arr;
}

// ── personas: same screen, three different case loads ──────────────────────
const clone = (c, over) => ({ ...c, ...over });
const PERSONA_SOLO = [ CASES.loe ];
const PERSONA_LIGHT = [ CASES.unread, CASES.resolved, CASES.dismiss, CASES.dismissPay ];
const PERSONA_HEAVY = [
  CASES.loe, CASES.overdue, CASES.unread, CASES.active, CASES.counter,            // 5 active
  CASES.incomp,                                                                   // 1 incomplete
  CASES.resolved, CASES.dismiss, CASES.dismissPay,                                // 3 resolved
  clone(CASES.resolved, { caseId:'OTR-44871', city:'Fresno',    mon:'Aug', year:'2025' }),
  clone(CASES.dismiss,  { caseId:'OTR-44520', city:'San Diego', mon:'Jul', year:'2025' }),
  clone(CASES.resolved, { caseId:'OTR-44103', city:'Anaheim',   mon:'Jun', year:'2025' }),
  clone(CASES.dismiss,  { caseId:'OTR-43777', city:'Glendale',  mon:'May', year:'2025' }),
  clone(CASES.resolved, { caseId:'OTR-43210', city:'Modesto',   mon:'Apr', year:'2025' }),  // → 8 resolved
  CASES.cancelled, CASES.missed,                                                  // 2 cancelled
];

function PersonaScreen({ cases, showFab = true, showNav = true, showFrame = true, expand = false }){
  const [chip, setChip]         = useState('all');
  const [q, setQ]               = useState('');
  const [sort, setSort]         = useState('urgency');
  const [density, setDensity]   = useState('comfortable');
  const [sortOpen, setSortOpen] = useState(false);
  const [addOpen, setAddOpen]   = useState(false);

  const chipScrollRef = React.useRef(null);
  const dragRef       = React.useRef({ down:false, moved:false, startX:0, startScroll:0 });

  const onChipDown = (e)=>{
    const el = chipScrollRef.current; if(!el) return;
    dragRef.current = { down:true, moved:false, startX:e.clientX, startScroll:el.scrollLeft, pid:e.pointerId };
  };
  const onChipMove = (e)=>{
    const d = dragRef.current; if(!d.down) return;
    const dx = e.clientX - d.startX;
    if(!d.moved && Math.abs(dx) > 6){
      d.moved = true;
      chipScrollRef.current?.setPointerCapture?.(d.pid);
    }
    if(d.moved && chipScrollRef.current) chipScrollRef.current.scrollLeft = d.startScroll - dx;
  };
  const onChipUp = (e)=>{
    const el = chipScrollRef.current;
    if(dragRef.current.moved) el?.releasePointerCapture?.(e.pointerId);
    dragRef.current.down = false;
  };
  const onChipClick = (id)=>{ if(!dragRef.current.moved) setChip(id); };

  const visible  = sortCases(cases.filter(c => inChip(c, chip) && matchText(c, q)), sort);
  const countOf  = (id) => id === 'all' ? cases.length : cases.filter(c => filterOf(c) === id).length;

  const chipRow = (
    <div ref={chipScrollRef} className="otr-filters no-sb"
      style={{ padding:'0 20px 12px', overflowX:'auto', cursor:'grab', touchAction:'pan-y', userSelect:'none' }}
      onPointerDown={onChipDown} onPointerMove={onChipMove} onPointerUp={onChipUp} onPointerCancel={onChipUp}
      onWheel={(e)=>{ if(Math.abs(e.deltaY) > Math.abs(e.deltaX)){ e.currentTarget.scrollLeft += e.deltaY; } }}>
      {NEW_CHIPS.map(([id,lb]) => {
        const n = countOf(id);
        const tone = id === 'all' ? null : chipTone(cases, id);
        return (
          <span key={id} className={`otr-chip${chip===id?' on':''}${tone?' has-alert':''}`} onClick={()=>onChipClick(id)}
            style={{ display:'inline-flex', alignItems:'center', gap:6 }}
            title={tone ? 'Needs attention' : undefined}>
            {tone && <i className="chip-alert" style={{ background: TONE_COLOR[tone] }} />}
            {lb}<i className="chip-num">{n}</i>
          </span>
        );
      })}
    </div>
  );
  const body = <div key={chip+sort+density}><FeedBody cases={visible} density={density} q={q} /></div>;

  // frame-free, no fixed height — the whole feed is visible without scrolling
  if (expand){
    return (
      <div className="otr feed-device" style={{ width:390, minHeight:844, background:'var(--wf-bg)',
        overflow:'hidden', position:'relative' }}>
        <div className="feed-head" style={{ paddingTop:8 }}>
          <div className="feed-appbar"><h1>Cases</h1></div>
          <div className="feed-tools" style={{ paddingTop:0, paddingBottom:10 }}>
            <SearchField q={q} setQ={setQ} />
            <DensityToggle density={density} setDensity={setDensity} />
          </div>
          {chipRow}
        </div>
        {body}
      </div>
    );
  }

  return (
    <Device frame={showFrame}>
      <div className="feed-head">
        <div className="feed-appbar"><h1>Cases</h1></div>
        <div className="feed-tools" style={{ paddingTop:0, paddingBottom:10 }}>
          <SearchField q={q} setQ={setQ} />
          <DensityToggle density={density} setDensity={setDensity} />
          <button className="toolbtn" style={{ padding:'0 11px' }} onClick={()=>setSortOpen(true)} title={`Sort · ${SORT_LABEL[sort]}`}>
            <Ico name="arrow-down-wide-short" size={15} /></button>
        </div>
        {chipRow}
      </div>
      <div className="feed-scroll">
        {body}
      </div>
      {showFab && <Fab onClick={()=>setAddOpen(true)} />}
      {showNav && <BottomNav />}
      <SortSheet open={sortOpen} onClose={()=>setSortOpen(false)} sort={sort} setSort={setSort} />
      <AddSheet open={addOpen} onClose={()=>setAddOpen(false)} />
    </Device>
  );
}

// ── color-system review moved to "Board A - Badge Library.html" (the badge page),
// where it's reframed as the compact-list ↔ card color-pairing documentation.

function FeedAssembled(){
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const P = { showFab:t.showFab, showNav:t.showNav, showFrame:t.showFrame };
  return (
    <>
    <DCSection id="feed-assembled" title="All Cases Feed" eyebrow="Screen" updated="Updated • Tue Jul 7, 2026"
      subtitle="The Cases tab feed under three case loads. Each filter shows a count and lights up when a case inside it needs attention. Tap the filters, search, sort, and density to try it.">
      <DCArtboard id="p-solo"  label="Single case • one active matter" width={390} height={884}><PersonaScreen cases={PERSONA_SOLO} expand /></DCArtboard>
      <DCArtboard id="p-light" label="1 active • 3 resolved" width={390} height={1620}><PersonaScreen cases={PERSONA_LIGHT} expand /></DCArtboard>
      <DCArtboard id="p-heavy" label="5 active • 1 incomplete • 8 resolved • 2 cancelled" width={390} height={4740}><PersonaScreen cases={PERSONA_HEAVY} expand /></DCArtboard>
      <DCArtboard id="v-empty" label="Empty state • no cases yet" width={390} height={844}><EmptyState showNav={false} showFrame={t.showFrame} /></DCArtboard>
    </DCSection>
    <TweaksPanel>
      <TweakSection label="Screen actions" />
      <TweakToggle label="New ticket button" value={t.showFab} onChange={(v)=>setTweak('showFab', v)} />
      <TweakToggle label="Bottom nav" value={t.showNav} onChange={(v)=>setTweak('showNav', v)} />
      <TweakToggle label="Device frame" value={t.showFrame} onChange={(v)=>setTweak('showFrame', v)} />
    </TweaksPanel>
    </>
  );
}
window.FeedAssembled = FeedAssembled;
})();
