// feed-assembled.jsx — BOARD: "best of all parts" assembled Cases screen.
// One screen pulling together: card-density toggle (layout #4), segmented
// Active/Resolved tabs + sub-chips (layout #1), inline search (mechanics #1),
// sort presented in a bottom sheet (sort #5 × filter sheet #2), the floating
// "New ticket" FAB (screen actions), and a paired empty state that travels
// with every variation. Three layout divergences, same feature set.
/* __IIFE__ */ ;(function(){
const { useState } = React;
const { DCSection, DCArtboard, DCPostIt, CASES, FEED_KEYS, feedGroup, matchText, sortFeed,
  FeedCard, CPCConsistent, CompactRow, Device, BottomNav, Seg, Sheet, Ico } = window;
const { useTweaks, TweaksPanel, TweakSection, TweakToggle } = window;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "showFab": true,
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

function FeedBody({ keys, density, q }){
  if (!keys.length) return <MiniEmpty q={q} />;
  if (density === 'compact')
    return <div style={{ padding:'2px 18px 92px' }} className="fade">{keys.map(k => <CompactRow key={k} c={CASES[k]} />)}</div>;
  return <div className="otr-feed fade" style={{ paddingBottom:92 }}>{keys.map(k => <CPCConsistent key={k} c={CASES[k]} />)}</div>;
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
        <div className="feed-appbar"><h1>Cases</h1><div className="feed-avatar" /></div>
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

// ── A · Stacked toolbar — every control on its own line, max discoverability ─
function VariantA({ showFab = true, showNav = true, showFrame = true }){
  const f = useFeed('comfortable');
  return (
    <Device frame={showFrame}>
      <div className="feed-head">
        <div className="feed-appbar"><h1>Cases</h1><div className="feed-avatar" /></div>
        <div style={{ padding:'0 20px 11px' }}>
          <Seg value={f.tab} onChange={f.switchTab} options={segOptions()} />
        </div>
        <div className="feed-tools" style={{ paddingTop:0, paddingBottom:10 }}>
          <SearchField q={f.q} setQ={f.setQ} />
          <button className="toolbtn" onClick={()=>f.setSortOpen(true)}>
            <Ico name="arrow-down-wide-short" size={14} />{SORT_LABEL[f.sort]}</button>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:10, padding:'0 20px 12px' }}>
          <div className="otr-filters" style={{ padding:0, flex:1, overflow:'hidden' }}>
            {SUBCHIPS[f.tab].map(([id,lb]) => (
              <span key={id} className={`otr-chip${f.chip===id?' on':''}`} onClick={()=>f.setChip(id)}>{lb}</span>
            ))}
          </div>
          <DensityToggle density={f.density} setDensity={f.setDensity} />
        </div>
      </div>
      <div className="feed-scroll">
        <div key={f.tab+f.chip+f.sort+f.density}><FeedBody keys={f.keys} density={f.density} q={f.q} /></div>
      </div>
      {showFab && <Fab onClick={()=>f.setAddOpen(true)} />}
      {showNav && <BottomNav />}
      <SortSheet open={f.sortOpen} onClose={()=>f.setSortOpen(false)} sort={f.sort} setSort={f.setSort} />
      <AddSheet open={f.addOpen} onClose={()=>f.setAddOpen(false)} />
    </Device>
  );
}

// ── B · Condensed bar — search collapses to an icon, feed gets the room ──────
function VariantB({ showFab = true, showNav = true, showFrame = true }){
  const f = useFeed('compact');
  const [searchOpen, setSearchOpen] = useState(false);
  return (
    <Device frame={showFrame}>
      <div className="feed-head">
        <div className="feed-appbar">
          <h1>Cases</h1>
          <DensityToggle density={f.density} setDensity={f.setDensity} />
        </div>
        <div style={{ padding:'0 20px 10px' }}>
          <Seg value={f.tab} onChange={f.switchTab} options={segOptions()} />
        </div>
        <div className="feed-tools" style={{ paddingTop:0, paddingBottom:12 }}>
          {searchOpen ? (
            <>
              <SearchField q={f.q} setQ={f.setQ} style={{ flex:1 }} />
              <button className="toolbtn" onClick={()=>{ setSearchOpen(false); f.setQ(''); }}>Cancel</button>
            </>
          ) : (
            <>
              <button className="feed-iconbtn" style={{ width:38, height:34, borderRadius:999 }} onClick={()=>setSearchOpen(true)} title="Search">
                <Ico name="magnifying-glass" size={15} color="var(--wf-strong)" /></button>
              <div className="grow">
                {SUBCHIPS[f.tab].map(([id,lb]) => (
                  <span key={id} className={`otr-chip${f.chip===id?' on':''}`} onClick={()=>f.setChip(id)}>{lb}</span>
                ))}
              </div>
              <button className="toolbtn" onClick={()=>f.setSortOpen(true)} title="Sort">
                <Ico name="arrow-down-wide-short" size={14} />Sort</button>
            </>
          )}
        </div>
      </div>
      <div className="feed-scroll">
        <div key={f.tab+f.chip+f.sort+f.density+searchOpen}><FeedBody keys={f.keys} density={f.density} q={f.q} /></div>
      </div>
      {showFab && <Fab onClick={()=>f.setAddOpen(true)} />}
      {showNav && <BottomNav />}
      <SortSheet open={f.sortOpen} onClose={()=>f.setSortOpen(false)} sort={f.sort} setSort={f.setSort} />
      <AddSheet open={f.addOpen} onClose={()=>f.setAddOpen(false)} />
    </Device>
  );
}

// ── C · Search-led — search is the hero up top, controls clustered right ─────
function VariantC({ showFab = true, showNav = true, showFrame = true }){
  const f = useFeed('comfortable');
  return (
    <Device frame={showFrame}>
      <div className="feed-head">
        <div className="feed-appbar"><h1>Cases</h1><div className="feed-avatar" /></div>
        <div style={{ padding:'0 20px 10px' }}>
          <SearchField q={f.q} setQ={f.setQ} style={{ height:44 }} />
        </div>
        <div className="feed-tools" style={{ paddingTop:0, paddingBottom:6 }}>
          <div style={{ flex:1, minWidth:0 }}>
            <Seg value={f.tab} onChange={f.switchTab} options={segOptions()} />
          </div>
          <button className="toolbtn" style={{ padding:'0 11px' }} onClick={()=>f.setSortOpen(true)} title={`Sort · ${SORT_LABEL[f.sort]}`}>
            <Ico name="arrow-down-wide-short" size={15} /></button>
          <DensityToggle density={f.density} setDensity={f.setDensity} />
        </div>
        <SubChips tab={f.tab} chip={f.chip} setChip={f.setChip} style={{ paddingTop:8 }} />
      </div>
      <div className="feed-scroll">
        <div key={f.tab+f.chip+f.sort+f.density}><FeedBody keys={f.keys} density={f.density} q={f.q} /></div>
      </div>
      {showFab && <Fab onClick={()=>f.setAddOpen(true)} />}
      {showNav && <BottomNav />}
      <SortSheet open={f.sortOpen} onClose={()=>f.setSortOpen(false)} sort={f.sort} setSort={f.setSort} />
      <AddSheet open={f.addOpen} onClose={()=>f.setAddOpen(false)} />
    </Device>
  );
}

// ── D · Search + view bar — search rides up top beside the feed-view toggle ──
function VariantD({ showFab = true, showNav = true, showFrame = true }){
  const f = useFeed('comfortable');
  return (
    <Device frame={showFrame}>
      <div className="feed-head">
        <div className="feed-appbar"><h1>Cases</h1><div className="feed-avatar" /></div>
        <div className="feed-tools" style={{ paddingTop:0, paddingBottom:10 }}>
          <SearchField q={f.q} setQ={f.setQ} />
          <button className="toolbtn" style={{ padding:'0 11px' }} onClick={()=>f.setSortOpen(true)} title={`Sort · ${SORT_LABEL[f.sort]}`}>
            <Ico name="arrow-down-wide-short" size={15} /></button>
          <DensityToggle density={f.density} setDensity={f.setDensity} />
        </div>
        <div style={{ padding:'0 20px 10px' }}>
          <Seg value={f.tab} onChange={f.switchTab} options={segOptions()} />
        </div>
        <SubChips tab={f.tab} chip={f.chip} setChip={f.setChip} />
      </div>
      <div className="feed-scroll">
        <div key={f.tab+f.chip+f.sort+f.density}><FeedBody keys={f.keys} density={f.density} q={f.q} /></div>
      </div>
      {showFab && <Fab onClick={()=>f.setAddOpen(true)} />}
      {showNav && <BottomNav />}
      <SortSheet open={f.sortOpen} onClose={()=>f.setSortOpen(false)} sort={f.sort} setSort={f.setSort} />
      <AddSheet open={f.addOpen} onClose={()=>f.setAddOpen(false)} />
    </Device>
  );
}

// ── E · No top tier — single chip row carries all filtering (adds Incomplete) ─
const E_CHIPS = [['all','All'],['action','Action needed'],['progress','In progress'],['incomplete','Incomplete']];

function useFeedE(){
  const [chip, setChip]       = useState('all');
  const [q, setQ]             = useState('');
  const [sort, setSort]       = useState('urgency');
  const [density, setDensity] = useState('comfortable');
  const [sortOpen, setSortOpen] = useState(false);
  const [addOpen, setAddOpen]   = useState(false);
  let keys = activeKeys();
  if (chip === 'action')     keys = keys.filter(k => feedGroup(CASES[k]) === 'action');
  if (chip === 'progress')   keys = keys.filter(k => feedGroup(CASES[k]) === 'active');
  if (chip === 'incomplete') keys = keys.filter(k => CASES[k].status === 'incomplete');
  keys = sortFeed(keys.filter(k => matchText(CASES[k], q)), sort);
  return { chip, setChip, q, setQ, sort, setSort, density, setDensity,
    sortOpen, setSortOpen, addOpen, setAddOpen, keys };
}

function VariantE({ showFab = true, showNav = true, showFrame = true }){
  const f = useFeedE();
  const chipCount = (id) => {
    if (id === 'all')        return activeKeys().length;
    if (id === 'action')     return activeKeys().filter(k => feedGroup(CASES[k]) === 'action').length;
    if (id === 'progress')   return activeKeys().filter(k => feedGroup(CASES[k]) === 'active').length;
    if (id === 'incomplete') return activeKeys().filter(k => CASES[k].status === 'incomplete').length;
    return 0;
  };
  return (
    <Device frame={showFrame}>
      <div className="feed-head">
        <div className="feed-appbar">
          <h1>Cases</h1>
          <DensityToggle density={f.density} setDensity={f.setDensity} />
        </div>
        <div className="feed-tools" style={{ paddingTop:0, paddingBottom:10 }}>
          <SearchField q={f.q} setQ={f.setQ} />
          <button className="toolbtn" style={{ padding:'0 11px' }} onClick={()=>f.setSortOpen(true)} title={`Sort · ${SORT_LABEL[f.sort]}`}>
            <Ico name="arrow-down-wide-short" size={15} /></button>
        </div>
        <div className="otr-filters" style={{ padding:'0 20px 12px' }}>
          {E_CHIPS.map(([id,lb]) => {
            const n = chipCount(id);
            return (
              <span key={id} className={`otr-chip${f.chip===id?' on':''}`} onClick={()=>f.setChip(id)}
                style={{ display:'inline-flex', alignItems:'center', gap:6 }}>
                {lb}<i className="chip-num">{n}</i>
              </span>
            );
          })}
        </div>
      </div>
      <div className="feed-scroll">
        <div key={f.chip+f.sort+f.density}><FeedBody keys={f.keys} density={f.density} q={f.q} /></div>
      </div>
      {showFab && <Fab onClick={()=>f.setAddOpen(true)} />}
      {showNav && <BottomNav />}
      <SortSheet open={f.sortOpen} onClose={()=>f.setSortOpen(false)} sort={f.sort} setSort={f.setSort} />
      <AddSheet open={f.addOpen} onClose={()=>f.setAddOpen(false)} />
    </Device>
  );
}

function FeedAssembledAD(){
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  return (
    <>
    <DCSection id="feed-assembled" title="Archived · divergences A–D"
      subtitle="Every requested part on one screen — density toggle, Active/Resolved tabs + sub-chips, inline search, sort-in-a-sheet, the New-ticket FAB — across three layout divergences. One shared empty state. All interactive: tap tabs, chips, search, sort, density, the FAB.">
      <DCArtboard id="va-feed"  label="A · Stacked toolbar — every control visible" width={390} height={844}><VariantA showFab={t.showFab} showNav={t.showNav} showFrame={t.showFrame} /></DCArtboard>
      <DCArtboard id="vb-feed"  label="B · Condensed bar — search collapses, feed-first" width={390} height={844}><VariantB showFab={t.showFab} showNav={t.showNav} showFrame={t.showFrame} /></DCArtboard>
      <DCArtboard id="vc-feed"  label="C · Search-led — search hero, controls clustered" width={390} height={844}><VariantC showFab={t.showFab} showNav={t.showNav} showFrame={t.showFrame} /></DCArtboard>
      <DCArtboard id="vd-feed"  label="D · Search + view bar — search up top by the toggle" width={390} height={844}><VariantD showFab={t.showFab} showNav={t.showNav} showFrame={t.showFrame} /></DCArtboard>
      <DCArtboard id="v-empty" label="Empty state · no cases yet" width={390} height={844}><EmptyState showNav={t.showNav} showFrame={t.showFrame} /></DCArtboard>
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
window.FeedAssembledAD = FeedAssembledAD;
})();
