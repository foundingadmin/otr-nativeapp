// board-b.jsx — BOARD B · Feed variants (the hero deliverable)
// 7 full Cases-tab feeds, each committing to ONE §8.3 recipe. Anchor tier
// (status badge · case identity · primary action) held fixed; everything else
// remixed. Priority-of-attention sort (§11.4) so solid/titled badges rise.
/* __IIFE__ */ ;(function(){
const { DCSection, DCArtboard, CASES, title, primaryAction, badgeNote, StatusBadge,
  Thumb, Attorney, Stars, Confetti, Frame, Spec, HardestCall, OTR_STATUS, OTR_TONE,
  AttorneyRow, ActBtn, OverduePill, CPCRef } = window;
const { FeatureIcon: FI } = window.OffTheRecordDesignSystem_6eff96;

// priority-sorted spread (action → active → win → passive)
const FEED = ['almost','smart','overdue','loe','unread','dismiss','incomp'];

function senti(c){
  const tone = OTR_STATUS[c.status].tone;
  if (tone === 'grad') return { bg:'#efeaff', fg:'#6a4bd6' };
  const t = OTR_TONE[tone];
  return { bg:t.light[0], fg:t.light[1] };
}
// compact "key record" line per state (kind 'money' tints red)
function keyLine(c){
  if (c.balance && c.balance.overdue) return ['bill-dollar-2', `Payment overdue · $${c.balance.amount}`, 'money'];
  switch (c.status){
    case 'smartmatchd':   return ['countdown-timer', `Quote $${c.quote.amount} · expires ${c.quote.expires}`];
    case 'almostgone':    return ['countdown-timer', `$${c.quote.amount} · ${c.quote.expires} left`, 'money'];
    case 'expired':       return ['time-history-off', 'Quote lapsed · reinitiate'];
    case 'active-action': return ['file-edit', 'Sign letter of engagement'];
    case 'active':        return c.unread ? ['bell-notification', `${c.unread} new updates`] : ['location-pin', `Court ${c.courtDate||'TBD'}`];
    case 'resolved':      return ['chart-circle-up-growth', c.outcome.result];
    case 'dismissed':     return ['chart-circle-up-growth', `${c.outcome.result} · saved $${c.outcome.saved}`];
    case 'incomplete':    return ['image-photo-add', 'Ticket photo not provided'];
    case 'deadline':      return ['countdown-timer', `${c.daysToCourt} days to court`, 'money'];
    case 'analyzing':     return ['triangle-arrow-synchronize-1', 'Finding your attorney…'];
    default:              return ['files-and-folders', c.caseId];
  }
}
const stageOf = (c) => ['incomplete','deadline','analyzing'].includes(c.status) ? 0
  : ['smartmatchd','almostgone','expired'].includes(c.status) ? 1
  : (c.status === 'resolved' || c.status === 'dismissed') ? 3 : 2;

// ── V2 · Minimal, badge-led, zoneless ─────────────────────────────────────
function CardMinimal({ c }){
  const [ic, txt, kind] = keyLine(c);
  return (
    <div className="cpc tap flat" style={{ borderRadius:14, padding:'12px 14px' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', gap:8 }}>
        <StatusBadge status={c.status} unread={!!c.unread} note={badgeNote(c)} size="sm" />
      </div>
      <p className="ttl" style={{ fontSize:14.5, marginTop:8, paddingRight:14 }}>{title(c)}</p>
      <div style={{ display:'flex', alignItems:'center', gap:6, marginTop:3, fontSize:12.5, fontWeight:600,
        color: kind==='money' ? 'var(--money)' : 'var(--wf-muted)' }}>
        <FI name={ic} size={12} color={kind==='money'?'var(--money)':'var(--wf-faint)'} />{txt}</div>
    </div>
  );
}
// ── V3 · Rich, attorney-prominent, badge + progress ───────────────────────
function CardRich({ c }){
  const a = primaryAction(c); const stage = stageOf(c); const steps = ['Booked','Matched','Active','Resolved'];
  const showA = !!c.attorney;
  return (
    <div className="cpc">
      {c.status==='dismissed' && <Confetti />}
      <div style={{ display:'flex', gap:12 }}>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ display:'flex', justifyContent:'space-between', gap:8, alignItems:'flex-start' }}>
            <p className="ttl">{title(c)}</p>
            <StatusBadge status={c.status} unread={!!c.unread} note={badgeNote(c)} />
          </div>
          <div style={{ display:'flex', gap:8, marginTop:5 }}>
            <span className="classif"><FI name="tag" size={10} color="var(--wf-muted)" />{c.cls}</span>
            <span style={{ fontSize:11.5, color:'var(--wf-faint)' }}>{c.caseId}</span></div>
        </div>
      </div>
      <div style={{ marginTop:12 }}>
        <div style={{ display:'flex', gap:5 }}>{steps.map((s,i)=>(
          <div key={i} className="meter" style={{ flex:1 }}><i style={{ width:i<=stage?'100%':'0%', background:i<=stage?'var(--otr-blue)':'transparent' }} /></div>))}</div>
        <div style={{ display:'flex', justifyContent:'space-between', marginTop:5 }}>{steps.map((s,i)=>(
          <span key={i} style={{ fontSize:9, fontWeight:800, letterSpacing:.3, textTransform:'uppercase', color:i===stage?'var(--otr-blue)':'var(--wf-faint)' }}>{s}</span>))}</div>
      </div>
      {showA && <div className="divider" />}
      {showA && <AttorneyRow c={c} quote={c.status==='smartmatchd'||c.status==='almostgone'} />}
      {c.balance && c.balance.overdue && <OverduePill c={c} />}
      <ActBtn a={a} />
    </div>
  );
}
// ── V4 · Color-field status manifestation ─────────────────────────────────
function CardField({ c }){
  const { bg, fg } = senti(c); const a = primaryAction(c); const [ic, txt, kind] = keyLine(c);
  const accent = kind==='money' ? 'var(--money)' : fg;
  return (
    <div className="cpc flat" style={{ padding:0, overflow:'hidden' }}>
      <div style={{ display:'flex' }}>
        <div style={{ width:6, background:fg, flex:'none' }} />
        <div style={{ flex:1, padding:'13px 14px', background:bg }}>
          <div style={{ display:'flex', justifyContent:'space-between', gap:8, alignItems:'flex-start' }}>
            <p className="ttl" style={{ fontSize:14.5 }}>{title(c)}</p>
            <StatusBadge status={c.status} unread={!!c.unread} note={badgeNote(c)} size="sm" />
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:6, marginTop:6, fontSize:12.5, fontWeight:700, color:accent }}>
            <FI name={ic} size={13} color={accent} />{txt}</div>
          {a && <div style={{ marginTop:9, display:'flex', justifyContent:'flex-end' }}>
            <span style={{ fontSize:12.5, fontWeight:800, color:accent, display:'inline-flex', alignItems:'center', gap:4 }}>{a.label}<FI name="chevron-right" size={12} color={accent} /></span></div>}
        </div>
      </div>
    </div>
  );
}
// ── V5 · Action-first reading order ───────────────────────────────────────
function CardActionFirst({ c }){
  const a = primaryAction(c); const [ic, txt, kind] = keyLine(c);
  const cls = a ? (a.kind==='money'?'money':a.kind==='grad'?'grad':a.kind==='ghost'?'ghost':'primary') : 'ghost';
  return (
    <div className="cpc">
      {c.status==='dismissed' && <Confetti />}
      {a
        ? <div className={`act ${cls} full`}>{a.icon && <FI name={a.icon} size={15} color={cls==='ghost'?'var(--wf-ink)':'#fff'} />}{a.label}</div>
        : <div className="act ghost full" style={{ opacity:.55 }}>No action needed — we'll keep you posted</div>}
      <p className="ttl" style={{ marginTop:11 }}>{title(c)}</p>
      <div style={{ display:'flex', alignItems:'center', gap:6, marginTop:3, fontSize:12.5,
        color:kind==='money'?'var(--money)':'var(--wf-muted)' }}>
        <FI name={ic} size={12} color={kind==='money'?'var(--money)':'var(--wf-faint)'} />{txt}</div>
      <div style={{ display:'flex', justifyContent:'flex-end', marginTop:8 }}>
        <StatusBadge status={c.status} unread={!!c.unread} note={badgeNote(c)} size="sm" /></div>
    </div>
  );
}
// ── V6 · Identity-led, attorney absent ────────────────────────────────────
function CardNoAttorney({ c }){
  const a = primaryAction(c); const [ic, txt, kind] = keyLine(c);
  return (
    <div className="cpc">
      {c.status==='dismissed' && <Confetti />}
      <div style={{ minWidth:0 }}>
          <p className="ttl" style={{ fontSize:15.5 }}>{title(c)}</p>
          <div style={{ display:'flex', alignItems:'center', gap:6, marginTop:4, fontSize:12.5, fontWeight:600,
            color:kind==='money'?'var(--money)':'var(--wf-muted)' }}>
            <FI name={ic} size={12} color={kind==='money'?'var(--money)':'var(--wf-faint)'} />{txt}</div>
          <div style={{ marginTop:7 }}><StatusBadge status={c.status} unread={!!c.unread} note={badgeNote(c)} size="sm" /></div>
      </div>
      <ActBtn a={a} />
    </div>
  );
}
// ── V7 · Dense list, 2-zone ───────────────────────────────────────────────
function CardDense({ c }){
  const a = primaryAction(c); const [ic, txt, kind] = keyLine(c);
  return (
    <div style={{ display:'flex', alignItems:'center', gap:11, padding:'11px 2px', borderBottom:'1px solid var(--wf-line2)' }}>
      <div style={{ flex:1, minWidth:0 }}>
        <StatusBadge status={c.status} unread={!!c.unread} note={badgeNote(c)} size="sm" />
        <p className="ttl" style={{ fontSize:13.5, marginTop:5, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{title(c)}</p>
        <div style={{ fontSize:11.5, color:kind==='money'?'var(--money)':'var(--wf-faint)', fontWeight:600, marginTop:1, display:'flex', alignItems:'center', gap:5 }}>
          <FI name={ic} size={11} color={kind==='money'?'var(--money)':'var(--wf-faint)'} />{txt}</div>
      </div>
      <FI name="chevron-right" size={15} color={a ? (kind==='money'?'var(--money)':'var(--wf-faint)') : 'var(--wf-line)'} />
    </div>
  );
}

// ── variant registry ──────────────────────────────────────────────────────
const VARIANTS = [
  { id:'b1', label:"Variant 1 · Baseline 4-zone (the §8.4 hypothesis)", h:2064,
    vk:'Recipe · the baseline to remix against',
    vt:'Four-zone baseline',
    tags:[['identity','title'],['density','standard'],['zones','4'],['order','status-first'],['attorney','prominent'],['status','badge'],['action','full CTA']],
    Card:CPCRef,
    hard:'Held the title + classification + Case ID as the identity block (no thumbnail — it tested as low-signal and unbalanced the card). Classification + ID still crowd the title everywhere past Incomplete; flagged as the next cut in V2.' },
  { id:'b2', label:'Variant 2 · Minimal, badge-led, zoneless', h:1156,
    vk:'Recipe · strip to the spine',
    vt:'Minimal / zoneless',
    tags:[['identity','title'],['density','minimal'],['zones','zoneless'],['order','status-first'],['attorney','absent'],['status','badge'],['action','tap-card']],
    Card:CardMinimal,
    hard:'Cut the classification + Case ID and the attorney avatar/stars. At SmartMatch\'d the "a real attorney is on it" trust signal is gone — the badge + one line carry everything. Does the feed feel thinner or calmer?' },
  { id:'b3', label:'Variant 3 · Rich, attorney-prominent + progress', h:2204,
    vk:'Recipe · maximal reassurance',
    vt:'Rich / badge + progress',
    tags:[['identity','title'],['density','rich'],['zones','4'],['order','status-first'],['attorney','prominent'],['status','badge + progress'],['action','full CTA']],
    Card:CardRich,
    hard:'Added a Booked→Resolved progress track. On passive Active it reassures, but it competes with the badge for "where does this stand?" and risks implying motion on cases that are just waiting. Muted the fill to keep the badge primary.' },
  { id:'b4', label:'Variant 4 · Color-field status manifestation', h:1264,
    vk:'Recipe · status as a field, not just a chip',
    vt:'Color-field',
    tags:[['identity','title'],['density','standard'],['zones','3'],['order','status-first'],['attorney','minimal'],['status','color-field'],['action','inline']],
    Card:CardField,
    hard:'Tinting the whole card by sentiment double-encodes status with the badge. In a scroll the fields blur the triage the badge weight is supposed to do — I shrank the badge so the field leads, betting the color does the at-a-glance work.' },
  { id:'b5', label:'Variant 5 · Action-first reading order', h:1520,
    vk:'Recipe · lead with the one thing to do',
    vt:'Action-first',
    tags:[['identity','title'],['density','standard'],['zones','3'],['order','action-first'],['attorney','absent'],['status','badge'],['action','full CTA (top)']],
    Card:CardActionFirst,
    hard:'Putting the CTA above identity demotes the status badge to a footer. Action is unmissable, but you read "what to do" before "which case" — orientation now depends on the title line under the button.' },
  { id:'b6', label:'Variant 6 · Identity-led, attorney absent', h:1532,
    vk:'Recipe · test what the attorney earns',
    vt:'Identity-led / no attorney',
    tags:[['identity','title'],['density','standard'],['zones','2'],['order','identity-first'],['attorney','absent'],['status','badge'],['action','full CTA']],
    Card:CardNoAttorney,
    hard:'Removed the attorney entirely, even at SmartMatch\'d & Active. The title + status lead. This is the cleanest layout but drops the marketplace-trust cue the product is built on — the direct counter-test to V3.' },
  { id:'b7', label:'Variant 7 · Dense list, 2-zone', h:992,
    vk:'Recipe · how many cases fit at once',
    vt:'Dense list',
    tags:[['identity','title'],['density','minimal'],['zones','2'],['order','status-first'],['attorney','absent'],['status','badge'],['action','chevron']],
    Card:CardDense,
    hard:'Collapsed quote + countdown into one muted line, so Series 2 loses its urgent "$129 · 4:52" typography. Seven cases fit on screen at once — but the loud moments no longer shout. Density vs. urgency, traded head-on.' },
];

function FeedFrame({ v }){
  const dense = v.id === 'b7';
  return (
    <div className="otr" style={{ padding:'4px 0 2px' }}>
      <Spec vk={v.vk} title={v.vt} tags={v.tags} />
      <Frame screen>
        <div className="otr-feed" style={dense ? { gap:0, padding:'2px 16px 18px' } : {}}>
          {FEED.map((k) => { const C = v.Card; return <C key={k} c={CASES[k]} />; })}
        </div>
      </Frame>
      <HardestCall>{v.hard}</HardestCall>
    </div>
  );
}

function BoardB(){
  return (
    <DCSection id="board-b" title="Board B · Feed variants — the hero deliverable"
      subtitle="7 full Cases-tab feeds, each a distinct recipe across the §8.3 axes. Anchor tier (badge · identity · primary action) is fixed; everything else remixes. Priority-of-attention sort (§11.4).">
      {VARIANTS.map((v) => (
        <DCArtboard key={v.id} id={v.id} label={v.label} width={390} height={v.h} style={{ background:'#eef2fc' }}>
          <FeedFrame v={v} />
        </DCArtboard>
      ))}
    </DCSection>
  );
}
window.BoardB = BoardB;
})();
