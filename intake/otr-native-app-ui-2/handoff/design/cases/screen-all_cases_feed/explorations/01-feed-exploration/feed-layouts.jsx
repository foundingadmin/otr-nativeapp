// feed-layouts.jsx — BOARD: holistic feed-screen layouts (interactive).
// Four complete Cases-tab screens, each bundling its own layout + filter +
// sort + screen actions so the whole UX can be felt. Board F card styling.
/* __IIFE__ */ ;(function(){
const { useState } = React;
const { DCSection, DCArtboard, DCPostIt, CASES, title,
  FEED_KEYS, feedGroup, GROUP_META, sortFeed, FeedCard, CompactRow,
  Device, BottomNav, Seg, Ico } = window;

const grpKeys = (g) => FEED_KEYS.filter(k => feedGroup(CASES[k]) === g);

function MiniEmpty({ label }){
  return (
    <div style={{ textAlign:'center', padding:'48px 20px', color:'var(--wf-faint)' }}>
      <Ico name="folder-open" size={34} color="var(--wf-line)" />
      <div style={{ fontSize:13.5, fontWeight:700, marginTop:10, color:'var(--wf-muted)' }}>Nothing here</div>
      <div style={{ fontSize:12, marginTop:3 }}>{label}</div>
    </div>
  );
}

// ── 1 · Top-level segmented tabs (Active vs Resolved) ──────────────────────
function SegTabsScreen(){
  const [tab, setTab] = useState('active');
  const [chip, setChip] = useState('all');
  const active = FEED_KEYS.filter(k => feedGroup(CASES[k]) !== 'resolved');
  const resolved = grpKeys('resolved');
  const actionN = grpKeys('action').length;

  const chips = tab === 'active'
    ? [['all','All'],['action','Action needed'],['progress','In progress']]
    : [['all','All'],['won','Won'],['closed','Closed']];

  let list = tab === 'active' ? active : resolved;
  if (tab === 'active'){
    if (chip === 'action') list = list.filter(k => feedGroup(CASES[k]) === 'action');
    if (chip === 'progress') list = list.filter(k => feedGroup(CASES[k]) === 'active');
  } else {
    if (chip === 'won') list = list.filter(k => ['dismissed','resolved'].includes(CASES[k].status));
    if (chip === 'closed') list = list.filter(k => ['cancelled','missed'].includes(CASES[k].status));
  }

  const switchTab = (t) => { setTab(t); setChip('all'); };

  return (
    <Device>
      <div className="feed-head">
        <div className="feed-appbar"><h1>Cases</h1><div className="feed-avatar" /></div>
        <div style={{ padding:'0 20px 11px' }}>
          <Seg value={tab} onChange={switchTab} options={[
            { id:'active', label:'Active', count:active.length, alert:actionN>0 },
            { id:'resolved', label:'Resolved', count:resolved.length },
          ]} />
        </div>
        <div className="otr-filters" style={{ padding:'0 20px 12px' }}>
          {chips.map(([id,lb]) => (
            <span key={id} className={`otr-chip${chip===id?' on':''}`} onClick={()=>setChip(id)}>{lb}</span>
          ))}
        </div>
      </div>
      <div className="feed-scroll">
        <div className="otr-feed fade" key={tab+chip}>
          {list.length ? list.map(k => <FeedCard key={k} c={CASES[k]} />)
            : <MiniEmpty label="Try a different filter." />}
        </div>
      </div>
      <BottomNav />
    </Device>
  );
}

// ── 2 · Priority triage (urgent pinned, rest below) ────────────────────────
function TriageScreen(){
  const [showResolved, setShowResolved] = useState(false);
  const action = sortFeed(grpKeys('action'), 'urgency');
  const active = grpKeys('active');
  const resolved = grpKeys('resolved');
  const [hero, ...rest] = action;

  return (
    <Device>
      <div className="feed-head">
        <div className="feed-appbar"><h1>Cases</h1><div className="feed-avatar" /></div>
      </div>
      <div className="feed-scroll">
        <div className="att-banner" style={{ marginTop:2 }}>
          <div className="ab-ic"><Ico name="bolt" size={17} color="var(--money)" /></div>
          <div style={{ flex:1 }}>
            <div className="ab-t">{action.length} cases need your attention</div>
            <div className="ab-s">Sorted by urgency · most pressing first</div>
          </div>
        </div>
        <div className="otr-feed" style={{ paddingTop:8 }}>
          {hero && <div>
            <div style={{ display:'flex', alignItems:'center', gap:6, margin:'4px 2px 7px',
              fontSize:11, fontWeight:800, letterSpacing:.6, textTransform:'uppercase', color:'var(--money)' }}>
              <Ico name="circle-exclamation" size={12} color="var(--money)" />Most urgent
            </div>
            <div style={{ borderRadius:18, boxShadow:'0 0 0 2px var(--money), 0 8px 22px rgba(229,70,58,.16)' }}>
              <FeedCard c={CASES[hero]} />
            </div>
          </div>}
          {rest.map(k => <FeedCard key={k} c={CASES[k]} />)}

          <div className="ghead"><Ico name="folder-open" size={14} color="var(--wf-faint)" className="gh-chev" />
            <span className="gh-t">Active</span><span className="gh-c">{active.length}</span><span className="gh-rule" /></div>
          {active.map(k => <CompactRow key={k} c={CASES[k]} />)}

          <div className={`ghead${showResolved?'':' collapsed'}`} onClick={()=>setShowResolved(v=>!v)}>
            <Ico name="chevron-down" size={13} color="var(--wf-faint)" style={{ transition:'transform .18s', transform: showResolved?'none':'rotate(-90deg)' }} />
            <span className="gh-t">Resolved</span><span className="gh-c">{resolved.length}</span><span className="gh-rule" /></div>
          {showResolved && <div className="fade">{resolved.map(k => <CompactRow key={k} c={CASES[k]} />)}</div>}
          <div style={{ height:78 }} />
        </div>
      </div>
      <button className="fab" title="Add a ticket"><Ico name="plus" size={22} color="#fff" /></button>
      <BottomNav />
    </Device>
  );
}

// ── 3 · Grouped by status (collapsible sections) ───────────────────────────
function GroupedScreen(){
  const [open, setOpen] = useState({ action:true, active:true, resolved:false });
  const toggle = (g) => setOpen(o => ({ ...o, [g]:!o[g] }));
  const sections = [
    ['action', grpKeys('action'), 'full'],
    ['active', grpKeys('active'), 'full'],
    ['resolved', grpKeys('resolved'), 'compact'],
  ];
  return (
    <Device>
      <div className="feed-head">
        <div className="feed-appbar"><h1>Cases</h1><div className="feed-avatar" /></div>
        <div className="otr-filters" style={{ padding:'0 20px 12px' }}>
          <span className="otr-chip on">All</span>
          <span className="otr-chip">California</span>
          <span className="otr-chip">Texas</span>
          <span className="otr-chip">New York</span>
        </div>
      </div>
      <div className="feed-scroll">
        <div className="otr-feed" style={{ paddingTop:0 }}>
          {sections.map(([g, keys, mode]) => {
            const meta = GROUP_META[g];
            const isOpen = open[g];
            return (
              <div key={g}>
                <div className={`ghead${g==='action'?' action':''}${isOpen?'':' collapsed'}`} onClick={()=>toggle(g)}>
                  <Ico name="chevron-down" size={13} className="gh-chev"
                    color={g==='action'?'var(--money)':'var(--wf-faint)'} />
                  <span className="gh-t">{meta.label}</span>
                  <span className="gh-c">{keys.length}</span>
                  <span className="gh-rule" />
                </div>
                {isOpen && <div className="fade" style={{ display:'flex', flexDirection:'column', gap: mode==='full'?11:0, paddingTop: mode==='full'?4:0 }}>
                  {keys.map(k => mode==='full'
                    ? <FeedCard key={k} c={CASES[k]} />
                    : <CompactRow key={k} c={CASES[k]} />)}
                </div>}
              </div>
            );
          })}
          <div style={{ height:14 }} />
        </div>
      </div>
      <BottomNav />
    </Device>
  );
}

// ── 4 · Dense / compact list (with density toggle) ─────────────────────────
function DenseScreen(){
  const [density, setDensity] = useState('compact');
  const [chip, setChip] = useState('all');
  let list = FEED_KEYS.slice();
  if (chip === 'action') list = list.filter(k => feedGroup(CASES[k]) === 'action');
  else if (chip === 'active') list = list.filter(k => feedGroup(CASES[k]) === 'active');
  else if (chip === 'resolved') list = list.filter(k => feedGroup(CASES[k]) === 'resolved');

  return (
    <Device>
      <div className="feed-head">
        <div className="feed-appbar">
          <h1>Cases</h1>
          <div className="density-pill">
            <button className={density==='compact'?'on':''} onClick={()=>setDensity('compact')} title="Compact">
              <Ico name="list" size={14} /></button>
            <button className={density==='comfortable'?'on':''} onClick={()=>setDensity('comfortable')} title="Comfortable">
              <Ico name="table-cells-large" size={14} /></button>
          </div>
        </div>
        <div className="otr-filters" style={{ padding:'0 20px 12px' }}>
          {[['all','All'],['action','Action'],['active','Active'],['resolved','Resolved']].map(([id,lb]) => (
            <span key={id} className={`otr-chip${chip===id?' on':''}`} onClick={()=>setChip(id)}>{lb}</span>
          ))}
        </div>
      </div>
      <div className="feed-scroll">
        {density === 'compact'
          ? <div style={{ padding:'2px 18px 18px' }} className="fade" key={'c'+chip}>
              {list.length ? list.map(k => <CompactRow key={k} c={CASES[k]} />) : <MiniEmpty label="Try a different filter." />}
            </div>
          : <div className="otr-feed fade" key={'f'+chip}>
              {list.length ? list.map(k => <FeedCard key={k} c={CASES[k]} />) : <MiniEmpty label="Try a different filter." />}
            </div>}
      </div>
      <BottomNav />
    </Device>
  );
}

function FeedLayouts(){
  return (
    <DCSection id="feed-layouts" title="Feed layouts" eyebrow="Exploration" updated="Updated • Tue Jul 7, 2026"
      subtitle="Complete Cases tab screens, each with its own layout, filters, and actions. Tap the tabs, filters, sections, and toggles. The feed responds live.">
      <DCArtboard id="seg-tabs" label="1 • Segmented tabs" width={390} height={844}>
        <SegTabsScreen />
      </DCArtboard>
      <DCArtboard id="triage" label="2 • Priority triage" width={390} height={844}>
        <TriageScreen />
      </DCArtboard>
      <DCArtboard id="grouped" label="3 • Grouped by status" width={390} height={844}>
        <GroupedScreen />
      </DCArtboard>
      <DCArtboard id="dense" label="4 • Dense list" width={390} height={844}>
        <DenseScreen />
      </DCArtboard>
    </DCSection>
  );
}
window.FeedLayouts = FeedLayouts;
})();
