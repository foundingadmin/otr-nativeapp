// feed-filters.jsx — BOARD: filter & sort mechanics (interactive drill-downs).
// Each artboard isolates one pattern so the interaction can be felt on its own.
/* __IIFE__ */ ;(function(){
const { useState } = React;
const { DCSection, DCArtboard, CASES, FEED_KEYS, feedGroup, GROUP_META, sortFeed,
  matchText, tState, FeedCard, CompactRow, Device, BottomNav, Seg, Sheet, Ico } = window;

const ALL = FEED_KEYS;
const GROUPS = ['action','active','resolved'];
const LOCS = ['CA','TX','NY'];
const cnt = (g) => ALL.filter(k => feedGroup(CASES[k]) === g).length;

// ── M1 · Search bar + filter combo ─────────────────────────────────────────
function SearchFilterScreen(){
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const [inc, setInc] = useState({ action:true, active:true, resolved:true });
  const excluded = GROUPS.filter(g => !inc[g]).length;
  const list = ALL.filter(k => matchText(CASES[k], q) && inc[feedGroup(CASES[k])]);
  return (
    <Device>
      <div className="feed-head">
        <div className="feed-appbar"><h1>Cases</h1><div className="feed-avatar" /></div>
        <div className="feed-tools">
          <div className="search">
            <Ico name="magnifying-glass" size={15} color="var(--wf-faint)" />
            <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search city, violation, attorney…" />
            {q && <span className="clr" onClick={()=>setQ('')}><Ico name="circle-xmark" size={16} color="var(--wf-faint)" /></span>}
          </div>
          <button className={`toolbtn${excluded?' active':''}`} onClick={()=>setOpen(true)}>
            <Ico name="sliders" size={14} />Filter{excluded>0 && <span className="pip">{excluded}</span>}
          </button>
        </div>
      </div>
      <div className="feed-scroll">
        <div className="otr-feed fade" key={q+excluded}>
          {list.length ? list.map(k => <FeedCard key={k} c={CASES[k]} />)
            : <div style={{ textAlign:'center', padding:'46px 20px', color:'var(--wf-muted)' }}>
                <Ico name="magnifying-glass" size={30} color="var(--wf-line)" />
                <div style={{ fontSize:13.5, fontWeight:700, marginTop:10 }}>No matches</div>
                <div style={{ fontSize:12, marginTop:3, color:'var(--wf-faint)' }}>for “{q}”</div>
              </div>}
        </div>
      </div>
      <BottomNav />
      <Sheet open={open} onClose={()=>setOpen(false)} title="Filter">
        <div style={{ fontSize:11, fontWeight:800, letterSpacing:.6, textTransform:'uppercase', color:'var(--wf-faint)', margin:'6px 0 2px' }}>Status</div>
        {GROUPS.map(g => (
          <div key={g} className={`optrow${inc[g]?' on':''}`} onClick={()=>setInc(s=>({ ...s, [g]:!s[g] }))}>
            <span className="ox">{inc[g] && <Ico name="check" size={13} color="#fff" />}</span>
            <span className="ol">{GROUP_META[g].label}</span><span className="ocnt">{cnt(g)}</span>
          </div>
        ))}
        <div style={{ display:'flex', gap:10, marginTop:16 }}>
          <button className="act ghost full" style={{ height:46 }} onClick={()=>setInc({ action:true, active:true, resolved:true })}>Clear</button>
          <button className="act blue full" style={{ height:46 }} onClick={()=>setOpen(false)}>Show {list.length} cases</button>
        </div>
      </Sheet>
    </Device>
  );
}

// ── M2 · Filter bottom sheet (multi-select, multi-section) ──────────────────
function FilterSheetScreen(){
  const [open, setOpen] = useState(true);
  const [inc, setInc] = useState({ action:true, active:true, resolved:true });
  const [loc, setLoc] = useState({ CA:true, TX:true, NY:true });
  const applied = GROUPS.filter(g=>!inc[g]).length + LOCS.filter(l=>!loc[l]).length;
  const list = ALL.filter(k => inc[feedGroup(CASES[k])] && loc[tState(CASES[k])]);
  const Row = ({ on, label, sub, onClick }) => (
    <div className={`optrow${on?' on':''}`} onClick={onClick}>
      <span className="ox">{on && <Ico name="check" size={13} color="#fff" />}</span>
      <span className="ol">{label}</span>{sub!=null && <span className="ocnt">{sub}</span>}
    </div>
  );
  return (
    <Device>
      <div className="feed-head">
        <div className="feed-appbar"><h1>Cases</h1><div className="feed-avatar" /></div>
        <div className="feed-tools">
          <button className={`toolbtn${applied?' active':''}`} onClick={()=>setOpen(true)}>
            <Ico name="filter" size={14} />Filter{applied>0 && <span className="pip">{applied}</span>}
          </button>
          <div style={{ flex:1 }} />
          <span style={{ fontSize:12, fontWeight:700, color:'var(--wf-faint)' }}>{list.length} cases</span>
        </div>
      </div>
      <div className="feed-scroll">
        <div className="otr-feed">{list.map(k => <FeedCard key={k} c={CASES[k]} />)}</div>
      </div>
      <BottomNav />
      <Sheet open={open} onClose={()=>setOpen(false)} title="Filter cases">
        <div style={{ fontSize:11, fontWeight:800, letterSpacing:.6, textTransform:'uppercase', color:'var(--wf-faint)', margin:'4px 0 0' }}>Status</div>
        {GROUPS.map(g => <Row key={g} on={inc[g]} label={GROUP_META[g].label} sub={cnt(g)} onClick={()=>setInc(s=>({ ...s, [g]:!s[g] }))} />)}
        <div style={{ fontSize:11, fontWeight:800, letterSpacing:.6, textTransform:'uppercase', color:'var(--wf-faint)', margin:'16px 0 0' }}>Location</div>
        {LOCS.map(l => <Row key={l} on={loc[l]} label={l} sub={ALL.filter(k=>tState(CASES[k])===l).length} onClick={()=>setLoc(s=>({ ...s, [l]:!s[l] }))} />)}
        <div style={{ display:'flex', gap:10, marginTop:18 }}>
          <button className="act ghost full" style={{ height:46 }} onClick={()=>{ setInc({ action:true, active:true, resolved:true }); setLoc({ CA:true, TX:true, NY:true }); }}>Clear all</button>
          <button className="act blue full" style={{ height:46 }} onClick={()=>setOpen(false)}>Show {list.length} cases</button>
        </div>
      </Sheet>
    </Device>
  );
}

// ── M3 · Segmented control (fixed states) ──────────────────────────────────
function SegmentedScreen(){
  const [val, setVal] = useState('all');
  let list = ALL.slice();
  if (val === 'action') list = list.filter(k => feedGroup(CASES[k]) === 'action');
  else if (val === 'active') list = list.filter(k => feedGroup(CASES[k]) === 'active');
  else if (val === 'resolved') list = list.filter(k => feedGroup(CASES[k]) === 'resolved');
  return (
    <Device>
      <div className="feed-head">
        <div className="feed-appbar"><h1>Cases</h1><div className="feed-avatar" /></div>
        <div style={{ padding:'0 20px 12px' }}>
          <Seg value={val} onChange={setVal} options={[
            { id:'all', label:'All' }, { id:'action', label:'Action' },
            { id:'active', label:'Active' }, { id:'resolved', label:'Done' },
          ]} />
        </div>
      </div>
      <div className="feed-scroll">
        <div className="otr-feed fade" key={val}>{list.map(k => <FeedCard key={k} c={CASES[k]} />)}</div>
      </div>
      <BottomNav />
    </Device>
  );
}

// ── M4 · Inline sort toggle (next to filters) ──────────────────────────────
function InlineSortScreen(){
  const [chip, setChip] = useState('all');
  const [sort, setSort] = useState('date'); // date | urgency
  let list = ALL.slice();
  if (chip === 'action') list = list.filter(k => feedGroup(CASES[k]) === 'action');
  else if (chip === 'active') list = list.filter(k => feedGroup(CASES[k]) === 'active');
  else if (chip === 'resolved') list = list.filter(k => feedGroup(CASES[k]) === 'resolved');
  list = sortFeed(list, sort);
  return (
    <Device>
      <div className="feed-head">
        <div className="feed-appbar"><h1>Cases</h1><div className="feed-avatar" /></div>
        <div className="feed-tools">
          <div className="grow">
            {[['all','All'],['action','Action'],['resolved','Resolved']].map(([id,lb]) => (
              <span key={id} className={`otr-chip${chip===id?' on':''}`} onClick={()=>setChip(id)}>{lb}</span>
            ))}
          </div>
          <div className="seg" style={{ flex:'none', width:158 }}>
            <button className={sort==='date'?'on':''} onClick={()=>setSort('date')} style={{ fontSize:12 }}>
              <Ico name="clock" size={12} />Newest</button>
            <button className={sort==='urgency'?'on':''} onClick={()=>setSort('urgency')} style={{ fontSize:12 }}>
              <Ico name="bolt" size={12} />Urgent</button>
          </div>
        </div>
      </div>
      <div className="feed-scroll">
        <div style={{ padding:'2px 18px 18px' }} className="fade" key={chip+sort}>
          {list.map(k => <CompactRow key={k} c={CASES[k]} />)}
        </div>
      </div>
      <BottomNav />
    </Device>
  );
}

// ── M5 · Sort menu (dropdown) ──────────────────────────────────────────────
function SortMenuScreen(){
  const [menu, setMenu] = useState(false);
  const [sort, setSort] = useState('urgency');
  const labels = { date:'Date added', urgency:'Most urgent', status:'Status' };
  const icons = { date:'clock', urgency:'bolt', status:'layer-group' };
  const list = sortFeed(ALL.slice(), sort);
  return (
    <Device>
      <div className="feed-head">
        <div className="feed-appbar"><h1>Cases</h1><div className="feed-avatar" /></div>
        <div className="feed-tools">
          <span style={{ fontSize:12.5, fontWeight:700, color:'var(--wf-faint)', flex:1 }}>{ALL.length} cases</span>
          <div style={{ position:'relative' }}>
            <button className={`toolbtn${menu?' active':''}`} onClick={()=>setMenu(v=>!v)}>
              <Ico name="arrow-down-wide-short" size={14} />{labels[sort]}
              <Ico name="chevron-down" size={11} style={{ marginLeft:2 }} />
            </button>
            {menu && <div className="dropmenu" style={{ top:'calc(100% + 6px)', right:0 }} onClick={e=>e.stopPropagation()}>
              {Object.keys(labels).map(k => (
                <button key={k} className={sort===k?'on':''} onClick={()=>{ setSort(k); setMenu(false); }}>
                  <Ico name={icons[k]} size={14} color={sort===k?'var(--otr-blue)':'var(--wf-muted)'} />
                  {labels[k]}
                  <span className="dm-chk"><Ico name="check" size={14} color="var(--otr-blue)" /></span>
                </button>
              ))}
            </div>}
          </div>
        </div>
      </div>
      {menu && <div style={{ position:'absolute', inset:0, zIndex:5 }} onClick={()=>setMenu(false)} />}
      <div className="feed-scroll">
        <div style={{ padding:'2px 18px 18px' }} className="fade" key={sort}>
          {list.map(k => <CompactRow key={k} c={CASES[k]} />)}
        </div>
      </div>
      <BottomNav />
    </Device>
  );
}

function FeedMechanics(){
  return (
    <DCSection id="feed-mechanics" title="Filter and sort mechanics"
      subtitle="Each pattern on its own so the interaction can be felt. Type in the search, open the sheets, flip the toggles, and pick a sort. The feed reacts live.">
      <DCArtboard id="m-searchfilter" label="Filter • search bar and filter" width={390} height={844}>
        <SearchFilterScreen />
      </DCArtboard>
      <DCArtboard id="m-filtersheet" label="Filter • bottom sheet, status and location" width={390} height={844}>
        <FilterSheetScreen />
      </DCArtboard>
      <DCArtboard id="m-segmented" label="Filter • segmented control" width={390} height={844}>
        <SegmentedScreen />
      </DCArtboard>
      <DCArtboard id="m-inlinesort" label="Sort • inline toggle" width={390} height={844}>
        <InlineSortScreen />
      </DCArtboard>
      <DCArtboard id="m-sortmenu" label="Sort • dropdown menu" width={390} height={844}>
        <SortMenuScreen />
      </DCArtboard>
    </DCSection>
  );
}
window.FeedMechanics = FeedMechanics;
})();
