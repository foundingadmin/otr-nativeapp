// board-e.jsx — BOARD E · Unbadged-branch proposals (open questions §6.2 / §15)
// Three lifecycle branches with NO approved badge. Two treatments each —
// every frame marked "PROPOSAL — needs decision".
/* __IIFE__ */ ;(function(){
const { DCSection, DCArtboard, StatusBadge, Attorney, Stars, Spec } = window;
const { FeatureIcon: FI } = window.OffTheRecordDesignSystem_6eff96;

// proposed (un-approved) badge — rendered as it would look, card marks it a proposal
function PBadge({ label, icon, bg, fg, solid }){
  return (
    <span className="sbadge" style={{ background:bg, color:fg, boxShadow: solid?'0 1px 2px rgba(16,24,40,.18)':'none' }}>
      <FI name={icon} size={13} color={fg} />{label}
      <span style={{ fontWeight:900, opacity:.7, marginLeft:1 }}>*</span>
    </span>
  );
}
function PropTag(){
  return (
    <div style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'4px 9px', borderRadius:7,
      background:'#f4ecff', border:'1px dashed #c9a8f5', marginBottom:9 }}>
      <FI name="help-question-1" size={12} color="#7c4dd6" />
      <span style={{ fontSize:10.5, fontWeight:800, letterSpacing:.5, textTransform:'uppercase', color:'#7c4dd6' }}>Proposal — needs decision</span>
    </div>
  );
}
function Identity({ city, mon, year, caseId }){
  return (
    <div style={{ minWidth:0 }}>
      <p className="ttl" style={{ fontSize:14.5 }}>Ticket issued in {city} – {mon} {year}</p>
      <span style={{ fontSize:11.5, color:'var(--wf-faint)' }}>{caseId}</span>
    </div>
  );
}
function Att({ name, rating, firm, blurred }){
  return (
    <div style={{ display:'flex', alignItems:'center', gap:10, marginTop:11 }}>
      <Attorney size={38} blurred={blurred} />
      <div style={{ flex:1 }}>
        <div style={{ fontSize:13, fontWeight:700 }}>{blurred?'Best-fit attorney':name}</div>
        <div style={{ display:'flex', alignItems:'center', gap:7, marginTop:1 }}><Stars rating={rating} size={11} /><span style={{ fontSize:11, color:'var(--wf-faint)' }}>{firm}</span></div>
      </div>
    </div>
  );
}
function Callout({ icon, tone, children }){
  const map = { amber:['#fff7ed','#fce3c0','#8a5206'], blue:['#eef5ff','#d4e4ff','#1543c0'], gray:['#f4f4f6','#e4e6ea','#4b515b'] };
  const [bg,bd,fg] = map[tone]||map.gray;
  return (
    <div style={{ display:'flex', gap:8, alignItems:'flex-start', padding:'10px 11px', borderRadius:11, background:bg, border:`1px solid ${bd}`, marginTop:11 }}>
      <FI name={icon} size={16} color={fg} style={{ flex:'none', marginTop:1 }} />
      <span style={{ fontSize:11.5, color:fg, fontWeight:600, lineHeight:1.4 }}>{children}</span>
    </div>
  );
}
function Act({ kind='primary', icon, children }){
  return <div className={`act ${kind} full`} style={{ marginTop:12 }}>{icon && <FI name={icon} size={15} color={kind==='ghost'?'var(--wf-ink)':'#fff'} />}{children}</div>;
}
function PNote({ children }){
  return (
    <div className="otr note" style={{ width:'auto', background:'#faf5ff', borderColor:'#e4d3fb', color:'#6a4bb0' }}>
      <b style={{ color:'#7c4dd6' }}>Trade-off —</b> {children}</div>
  );
}
function PCard({ children }){
  return <div className="cpc" style={{ border:'1.6px dashed #cdb2f2' }}>{children}</div>;
}

// ── proposals ─────────────────────────────────────────────────────────────
// Counter offer
function CounterBadge(){
  return (
    <PCard>
      <PropTag />
      <div style={{ display:'flex', justifyContent:'space-between', gap:8, alignItems:'flex-start' }}>
        <Identity city="Brooklyn" mon="Feb" year="2026" caseId="OTR-47980" />
        <PBadge label="Counter offer" icon="bag-dollar" bg="#6e3be0" fg="#fff" solid />
      </div>
      <Att name="D. Okonkwo" rating={4.8} firm="Okonkwo Legal" />
      <Callout icon="bag-dollar" tone="amber">Attorney proposed <b>$179</b> (quote was $129). Accept, counter, or decline.</Callout>
      <Act kind="primary" icon="bag-dollar">Review counter offer</Act>
    </PCard>
  );
}
function CounterCallout(){
  return (
    <PCard>
      <PropTag />
      <div style={{ display:'flex', justifyContent:'space-between', gap:8, alignItems:'flex-start' }}>
        <Identity city="Brooklyn" mon="Feb" year="2026" caseId="OTR-47980" />
        <StatusBadge status="smartmatchd" />
      </div>
      <Att blurred rating={4.8} firm="Okonkwo Legal" />
      <Callout icon="chat-bubble-square-check" tone="blue">Counter offer — attorney proposed <b>$179</b>. Review terms before the quote expires.</Callout>
      <Act kind="grad" icon="bag-dollar">Review counter offer</Act>
    </PCard>
  );
}
// Remarketing
function RemarketReuse(){
  return (
    <PCard>
      <PropTag />
      <div style={{ display:'flex', justifyContent:'space-between', gap:8, alignItems:'flex-start' }}>
        <Identity city="Sacramento" mon="Jan" year="2026" caseId="OTR-47551" />
        <StatusBadge status="analyzing" />
      </div>
      <Callout icon="triangle-arrow-synchronize-1" tone="gray">Re-matching you with a new best-fit attorney after the last quote was declined.</Callout>
      <PNote>Reuses <b>Analyzing…</b> (the §6.2 closest analog). Honest about "we're working" but hides that the user already declined once — may feel like a loop.</PNote>
    </PCard>
  );
}
function RemarketNew(){
  return (
    <PCard>
      <PropTag />
      <div style={{ display:'flex', justifyContent:'space-between', gap:8, alignItems:'flex-start' }}>
        <Identity city="Sacramento" mon="Jan" year="2026" caseId="OTR-47551" />
        <PBadge label="Rematching" icon="folder-search" bg="#eef0f4" fg="#67707e" />
      </div>
      <Callout icon="triangle-arrow-synchronize-1" tone="gray">Finding a new attorney after you declined the first quote. No action needed.</Callout>
      <PNote>A new light/ambient badge, distinct from Analyzing. More honest, but adds a word to the registry the team wanted to keep to one-per-state.</PNote>
    </PCard>
  );
}
// Cancelled
function CancelBadge(){
  return (
    <PCard>
      <PropTag />
      <div style={{ display:'flex', justifyContent:'space-between', gap:8, alignItems:'flex-start' }}>
        <Identity city="Austin" mon="Mar" year="2026" caseId="OTR-48090" />
        <PBadge label="Cancelled" icon="folder-block" bg="#eef0f4" fg="#67707e" />
      </div>
      <Callout icon="folder-block" tone="gray">Representation ended (post-LOE). Your case is no longer active.</Callout>
      <Act kind="primary" icon="triangle-arrow-synchronize-1">Find a new attorney</Act>
    </PCard>
  );
}
function CancelSilent(){
  return (
    <PCard>
      <PropTag />
      <div style={{ display:'flex', justifyContent:'space-between', gap:8, alignItems:'flex-start' }}>
        <Identity city="Austin" mon="Mar" year="2026" caseId="OTR-48090" />
        <StatusBadge status="incomplete" />
      </div>
      <Callout icon="line-arrow-synchronize-1" tone="blue">Representation ended — we've moved your case back to ready-to-match so you never hit a dead end.</Callout>
      <Act kind="primary">Reinitiate SmartMatch</Act>
      <PNote>No terminal "Cancelled" badge — silently routes back to an actionable state (Incomplete → re-match). Calmest, but loses an honest record that a cancellation happened.</PNote>
    </PCard>
  );
}

const PROPS = [
  { id:'e-counter-1', label:'Counter offer · P1 — New badge', h:388, C:CounterBadge,
    vk:'No approved badge · §6.2/§15', vt:'Counter offer', tags:[['treatment','new solid badge'],['precedence','legal gate']] },
  { id:'e-counter-2', label:'Counter offer · P2 — Action-callout (no new badge)', h:388, C:CounterCallout,
    vk:'No approved badge · §6.2/§15', vt:'Counter offer', tags:[['treatment','callout on SmartMatch\u2019d'],['badge','unchanged']] },
  { id:'e-remarket-1', label:'Remarketing · P1 — Reuse Analyzing… (silent)', h:368, C:RemarketReuse,
    vk:'No approved badge · §6.2/§15', vt:'Remarketing', tags:[['treatment','reuse Analyzing\u2026'],['registry','+0 words']] },
  { id:'e-remarket-2', label:'Remarketing · P2 — New "Rematching" badge', h:368, C:RemarketNew,
    vk:'No approved badge · §6.2/§15', vt:'Remarketing', tags:[['treatment','new light badge'],['registry','+1 word']] },
  { id:'e-cancel-1', label:'Cancelled · P1 — New terminal badge', h:338, C:CancelBadge,
    vk:'No approved badge · §6.2/§15', vt:'Cancelled', tags:[['treatment','new neutral badge'],['arc','terminal']] },
  { id:'e-cancel-2', label:'Cancelled · P2 — Silent transition (no badge)', h:448, C:CancelSilent,
    vk:'No approved badge · §6.2/§15', vt:'Cancelled', tags:[['treatment','route to actionable'],['badge','none']] },
];

function BoardE(){
  return (
    <DCSection id="board-e" title="Board E · Unbadged-branch proposals (open questions)"
      subtitle="The three lifecycle branches the PRD flags with no approved badge (§6.2/§15): Counter offer · Remarketing · Cancelled. Two treatments each — every frame is a PROPOSAL.">
      {PROPS.map((p) => (
        <DCArtboard key={p.id} id={p.id} label={p.label} width={390} height={p.h} style={{ background:'#eef2fc' }}>
          <div className="otr" style={{ padding:'4px 0 0' }}>
            <Spec vk={p.vk} title={p.vt} tags={p.tags} />
            <div style={{ padding:'0 16px' }}><p.C /></div>
          </div>
        </DCArtboard>
      ))}
    </DCSection>
  );
}
window.BoardE = BoardE;
})();
