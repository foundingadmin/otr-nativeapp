// feed-actions.jsx — BOARD: screen-level actions (interactive).
// Add-a-ticket (FAB + sheet), empty state, and a dedicated search screen.
/* __IIFE__ */ ;(function(){
const { useState } = React;
const { DCSection, DCArtboard, CASES, FEED_KEYS, feedGroup, matchText,
  FeedCard, CompactRow, Device, BottomNav, Sheet, Ico } = window;

// ── A1 · Add a ticket (FAB → action sheet) ─────────────────────────────────
function AddTicketScreen(){
  const [open, setOpen] = useState(false);
  const list = FEED_KEYS.filter(k => feedGroup(CASES[k]) !== 'resolved').slice(0, 4);
  const opt = (icon, label, sub) => (
    <div className="optrow" style={{ alignItems:'flex-start' }} onClick={()=>setOpen(false)}>
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
    <Device>
      <div className="feed-head">
        <div className="feed-appbar"><h1>Cases</h1><div className="feed-avatar" /></div>
      </div>
      <div className="feed-scroll">
        <div className="otr-feed">{list.map(k => <FeedCard key={k} c={CASES[k]} />)}<div style={{ height:80 }} /></div>
      </div>
      <button className="fab labeled" onClick={()=>setOpen(true)}>
        <Ico name="plus" size={18} color="#fff" />New ticket</button>
      <BottomNav />
      <Sheet open={open} onClose={()=>setOpen(false)} title="Add a ticket">
        <p style={{ margin:'0 0 8px', fontSize:13, color:'var(--wf-muted)', lineHeight:1.45 }}>
          We'll pull the details and match you with a local attorney.</p>
        {opt('camera', 'Take a photo', 'Snap the citation — we read it for you')}
        {opt('image', 'Upload from library', 'Choose an existing photo or PDF')}
        {opt('keyboard', 'Enter manually', 'Type the citation number and details')}
      </Sheet>
    </Device>
  );
}

// ── A2 · Empty state (no cases yet) ────────────────────────────────────────
function EmptyScreen(){
  return (
    <Device>
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
      <BottomNav />
    </Device>
  );
}

// ── A3 · Dedicated search screen ───────────────────────────────────────────
const RECENTS = ['Speeding', 'Los Angeles', 'Dana Whitfield'];
function SearchScreen(){
  const [q, setQ] = useState('');
  const results = q ? FEED_KEYS.filter(k => matchText(CASES[k], q)) : [];
  return (
    <Device>
      <div className="feed-head">
        <div className="feed-tools" style={{ padding:'8px 16px 12px' }}>
          <div className="feed-iconbtn ghost" style={{ width:30 }} onClick={()=>setQ('')}>
            <Ico name="arrow-left" size={17} color="var(--wf-strong)" /></div>
          <div className="search" style={{ height:44 }}>
            <Ico name="magnifying-glass" size={15} color="var(--wf-faint)" />
            <input autoFocus value={q} onChange={e=>setQ(e.target.value)} placeholder="Search your cases" />
            {q && <span className="clr" onClick={()=>setQ('')}><Ico name="circle-xmark" size={16} color="var(--wf-faint)" /></span>}
          </div>
        </div>
      </div>
      <div className="feed-scroll">
        {!q && (
          <div style={{ padding:'6px 20px 18px' }}>
            <div style={{ fontSize:11, fontWeight:800, letterSpacing:.6, textTransform:'uppercase', color:'var(--wf-faint)', margin:'4px 0 10px' }}>Recent</div>
            <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
              {RECENTS.map(r => (
                <span key={r} className="otr-chip" onClick={()=>setQ(r)} style={{ cursor:'pointer' }}>
                  <Ico name="clock-rotate-left" size={11} color="var(--wf-muted)" style={{ marginRight:5 }} />{r}</span>
              ))}
            </div>
            <div style={{ fontSize:11, fontWeight:800, letterSpacing:.6, textTransform:'uppercase', color:'var(--wf-faint)', margin:'22px 0 4px' }}>Browse</div>
            {[['bolt','Action needed'],['folder-open','Active cases'],['circle-check','Resolved']].map(([ic,lb]) => (
              <div key={lb} className="optrow" onClick={()=>setQ(lb)}>
                <Ico name={ic} size={16} color="var(--wf-muted)" />
                <span className="ol" style={{ fontWeight:600 }}>{lb}</span>
                <Ico name="chevron-right" size={13} color="var(--wf-faint)" />
              </div>
            ))}
          </div>
        )}
        {q && (
          <div style={{ padding:'2px 18px 18px' }} className="fade" key={q}>
            <div style={{ fontSize:12, color:'var(--wf-faint)', fontWeight:700, padding:'8px 4px 4px' }}>
              {results.length} result{results.length===1?'':'s'} for “{q}”</div>
            {results.length ? results.map(k => <CompactRow key={k} c={CASES[k]} />)
              : <div style={{ textAlign:'center', padding:'40px 20px', color:'var(--wf-muted)' }}>
                  <Ico name="magnifying-glass" size={28} color="var(--wf-line)" />
                  <div style={{ fontSize:13.5, fontWeight:700, marginTop:9 }}>No cases match</div>
                </div>}
          </div>
        )}
      </div>
      <BottomNav />
    </Device>
  );
}

function FeedActions(){
  return (
    <DCSection id="feed-actions" title="Screen actions"
      subtitle="Key actions around the feed, adding a case, the first run empty state, and a dedicated search. All interactive.">
      <DCArtboard id="a-add" label="Add a ticket • action sheet" width={390} height={844}>
        <AddTicketScreen />
      </DCArtboard>
      <DCArtboard id="a-empty" label="Empty state • no cases yet" width={390} height={844}>
        <EmptyScreen />
      </DCArtboard>
      <DCArtboard id="a-search" label="Search • dedicated screen" width={390} height={844}>
        <SearchScreen />
      </DCArtboard>
    </DCSection>
  );
}
window.FeedActions = FeedActions;
})();
