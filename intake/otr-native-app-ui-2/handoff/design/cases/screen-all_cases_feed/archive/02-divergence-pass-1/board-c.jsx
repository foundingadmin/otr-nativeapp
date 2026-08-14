// board-c.jsx — BOARD C · Case detail page variants
// Highest-signal states: SmartMatch'd · Active · Dismissed! · Incomplete.
// §10 data model; every field tagged ▸ CPC-tier or ◦ detail-only.
/* __IIFE__ */ ;(function(){
const { DCSection, DCArtboard, CASES, title, primaryAction, StatusBadge, SmartMatchMark,
  Thumb, Attorney, Stars, Confetti, Spec, OTR_STATUS } = window;
const { FeatureIcon: FI } = window.OffTheRecordDesignSystem_6eff96;

// tier marker — ▸ also on CPC · ◦ detail-only
function T({ t }){
  return t === 'cpc'
    ? <span title="Also on the CPC" style={{ color:'var(--otr-blue)', fontWeight:900, fontSize:12, width:12, display:'inline-block', flex:'none' }}>▸</span>
    : <span title="Detail-only" style={{ color:'var(--wf-faint)', fontWeight:900, fontSize:12, width:12, display:'inline-block', flex:'none' }}>◦</span>;
}
function Row({ tier='det', label, value, strong, money }){
  return (
    <div style={{ display:'flex', alignItems:'flex-start', gap:7, padding:'7px 0', borderBottom:'1px solid var(--wf-line2)' }}>
      <T t={tier} />
      <span style={{ fontSize:12.5, color:'var(--wf-muted)', flex:'none', width:118 }}>{label}</span>
      <span style={{ fontSize:12.5, fontWeight:strong?700:600, color: money?'var(--money)':(strong?'var(--wf-ink)':'var(--wf-strong)'), flex:1, textAlign:'right' }}>{value}</span>
    </div>
  );
}
function Section({ icon, title, children, accent }){
  return (
    <div style={{ background:'#fff', border:'1px solid var(--wf-line)', borderRadius:14, padding:'12px 14px', marginBottom:11 }}>
      <div style={{ display:'flex', alignItems:'center', gap:7, marginBottom:4 }}>
        <FI name={icon} size={14} color={accent||'var(--wf-faint)'} />
        <span style={{ fontSize:11, fontWeight:800, letterSpacing:.7, textTransform:'uppercase', color:'var(--wf-strong)' }}>{title}</span>
      </div>
      {children}
    </div>
  );
}
function DetailBar(){
  return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'2px 18px 12px' }}>
      <FI name="tag-chevron" size={16} color="var(--wf-strong)" style={{ transform:'rotate(180deg)' }} />
      <span style={{ fontSize:14, fontWeight:700, color:'var(--wf-ink)' }}>Case details</span>
      <FI name="cog" size={16} color="var(--wf-strong)" />
    </div>
  );
}
function StickyAction({ a }){
  if (!a) return null;
  const cls = a.kind==='money'?'money':a.kind==='grad'?'grad':a.kind==='ghost'?'ghost':'primary';
  return (
    <div style={{ position:'sticky', bottom:0, padding:'12px 16px 16px', background:'linear-gradient(transparent,var(--wf-bg) 26%)' }}>
      <div className={`act ${cls} full`} style={{ height:46, fontSize:15 }}>
        {a.icon && <FI name={a.icon} size={16} color={cls==='ghost'?'var(--wf-ink)':'#fff'} />}{a.label}</div>
    </div>
  );
}
// hero — §11.3 de-escalation: rough at Incomplete, calm as the case advances
function Hero({ c, bg, children }){
  return (
    <div style={{ position:'relative', margin:'0 16px 12px', borderRadius:16, padding:'14px', background:bg, overflow:'hidden',
      border: OTR_STATUS[c.status].series===1 ? '1.6px dashed #c9b6f2' : '1px solid var(--wf-line)' }}>
      {c.status==='dismissed' && <Confetti />}
      <div style={{ display:'flex', justifyContent:'space-between', gap:8, alignItems:'flex-start' }}>
        <p className="ttl" style={{ fontSize:17, lineHeight:1.25 }}>{title(c)}</p>
        <StatusBadge status={c.status} unread={!!c.unread} note={c.daysToCourt?`${c.daysToCourt} days`:null} />
      </div>
      <div style={{ display:'flex', gap:7, marginTop:6 }}>
        <span className="classif"><FI name="tag" size={10} color="var(--wf-muted)" />{c.cls}</span>
        <span style={{ fontSize:11.5, color:'var(--wf-faint)' }}>{c.caseId} · {c.courtCity||'—'}</span>
      </div>
      {children}
    </div>
  );
}

// ── detail bodies per state ───────────────────────────────────────────────
function DetailSmart(){
  const c = CASES.smart; const a = primaryAction(c);
  return (
    <Frame390>
      <DetailBar />
      <Hero c={c} bg="linear-gradient(135deg,#f3efff,#fdf0ff)">
        <div style={{ display:'flex', alignItems:'center', gap:11, marginTop:12, padding:'11px', background:'#fff', borderRadius:12, border:'1px solid #e9e2fb' }}>
          <Attorney size={46} blurred />
          <div style={{ flex:1 }}>
            <div style={{ fontSize:13.5, fontWeight:700 }}>Best-fit attorney matched</div>
            <div style={{ display:'flex', alignItems:'center', gap:7, marginTop:2 }}><Stars rating={4.9} size={11} /><span style={{ fontSize:11.5, color:'var(--wf-faint)' }}>revealed on accept</span></div>
          </div>
          <div style={{ textAlign:'right' }}>
            <div className="quote" style={{ fontSize:20 }}>${c.quote.amount}</div>
            <div className="timer"><FI name="countdown-timer" size={12} color="var(--money)" />{c.quote.expires}</div>
          </div>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:6, marginTop:10 }}>
          <SmartMatchMark size={18} /><span style={{ fontSize:11.5, color:'#6a4bd6', fontWeight:700 }}>SmartMatch'd — a real, local attorney. Not AI.</span>
        </div>
      </Hero>
      <Section icon="user-square-single" title="Representation" accent="var(--otr-blue)">
        <Row tier="cpc" label="Firm" value={c.firm} strong />
        <Row tier="cpc" label="Attorney" value="Blurred until accept" />
        <Row tier="cpc" label="Rating" value="★ 4.9" />
        <Row tier="det" label="Quote context" value="SmartMatch'd · best-fit" />
        <Row tier="det" label="Letter of engagement" value="Prepared — signs after accept" />
      </Section>
      <Section icon="file-report" title="Violation & legal">
        <Row tier="cpc" label="Primary violation" value={c.violation} strong />
        <Row tier="cpc" label="More" value={`+${c.more} more`} />
        <Row tier="det" label="Severity" value="Infraction" />
      </Section>
      <Section icon="location-pin" title="Court">
        <Row tier="cpc" label="Court of record" value={`${c.courtCity} · LA`} strong />
        <Row tier="det" label="Court date" value="Not yet set" />
      </Section>
      <Section icon="bill-dollar-2" title="Billing">
        <Row tier="cpc" label="Quoted" value={`$${c.quote.amount}`} strong />
        <Row tier="det" label="Charged" value="Not until you accept" />
      </Section>
      <StickyAction a={a} />
    </Frame390>
  );
}
function DetailActive(){
  const c = CASES.active; const a = { label:'Message your attorney', kind:'ghost', icon:'chat-bubble-oval-smiley-1' };
  return (
    <Frame390>
      <DetailBar />
      <Hero c={c} bg="#fff">
        <div style={{ display:'flex', alignItems:'center', gap:11, marginTop:12 }}>
          <Attorney size={46} />
          <div style={{ flex:1 }}>
            <div style={{ fontSize:14, fontWeight:700 }}>{c.attorney.name}</div>
            <div style={{ display:'flex', alignItems:'center', gap:7, marginTop:2 }}><Stars rating={c.attorney.rating} size={11} /><span style={{ fontSize:11.5, color:'var(--wf-faint)' }}>{c.firm}</span></div>
          </div>
          <FI name="chat-bubble-oval-smiley-1" size={20} color="var(--otr-blue)" />
        </div>
        <div style={{ display:'flex', gap:6, marginTop:11, fontSize:11, color:'var(--wf-faint)', fontWeight:600 }}>
          <FI name="circle-clock" size={12} color="var(--wf-faint)" />Updated 2 days ago · next update expected by Apr 10
        </div>
      </Hero>
      <Section icon="line-arrow-synchronize-1" title="Status timeline">
        <div style={{ display:'flex', gap:5, margin:'4px 0 6px' }}>{['Booked','Matched','Active','Resolved'].map((s,i)=>(
          <div key={i} className="meter" style={{ flex:1 }}><i style={{ width:i<=2?'100%':'0%', background:i<=2?'var(--otr-blue)':'transparent' }} /></div>))}</div>
        <div style={{ display:'flex', justifyContent:'space-between' }}>{['Booked','Matched','Active','Resolved'].map((s,i)=>(
          <span key={i} style={{ fontSize:9, fontWeight:800, textTransform:'uppercase', letterSpacing:.3, color:i===2?'var(--otr-blue)':'var(--wf-faint)' }}>{s}</span>))}</div>
      </Section>
      <Section icon="user-square-single" title="Representation" accent="var(--otr-blue)">
        <Row tier="cpc" label="Firm" value={c.firm} strong />
        <Row tier="cpc" label="Attorney" value={`${c.attorney.name} · ★ ${c.attorney.rating}`} />
        <Row tier="det" label="Letter of engagement" value="Signed · Jan 14, 2026" />
        <Row tier="det" label="Contact thread" value="3 messages" />
      </Section>
      <Section icon="location-pin" title="Court">
        <Row tier="cpc" label="Court of record" value={`${c.courtCity}`} strong />
        <Row tier="cpc" label="Court date" value={c.courtDate} strong />
        <Row tier="det" label="Appear-by" value="Attorney appears for you" />
      </Section>
      <Section icon="bill-dollar-2" title="Billing">
        <Row tier="cpc" label="Balance" value="$0 · paid" strong />
        <Row tier="det" label="Method" value="Visa ···· 4242" />
      </Section>
      <StickyAction a={a} />
    </Frame390>
  );
}
function DetailDismissed(){
  const c = CASES.dismiss; const a = primaryAction(c);
  return (
    <Frame390>
      <DetailBar />
      <Hero c={c} bg="#eafaf0">
        <div style={{ marginTop:12, padding:'12px', background:'#fff', borderRadius:12, border:'1px solid #cdeed8' }}>
          <div style={{ fontSize:13.5, fontWeight:800, color:'var(--green-700,#087443)' }}>{c.outcome.result}</div>
          <div style={{ display:'flex', gap:18, marginTop:8 }}>
            <div><div style={{ fontSize:19, fontWeight:800, color:'#179a55' }}>${c.outcome.saved}</div><div className="micro">saved</div></div>
            <div><div style={{ fontSize:19, fontWeight:800, color:'#179a55' }}>{c.outcome.points}</div><div className="micro">points avoided</div></div>
          </div>
        </div>
      </Hero>
      <Section icon="chart-circle-up-growth" title="Outcome" accent="#179a55">
        <Row tier="cpc" label="Result" value={c.outcome.result} strong />
        <Row tier="det" label="Saved" value={`$${c.outcome.saved}`} />
        <Row tier="det" label="Points avoided" value={c.outcome.points} />
        <Row tier="det" label="Review" value="Not yet submitted" />
      </Section>
      <Section icon="user-square-single" title="Representation" accent="var(--otr-blue)">
        <Row tier="cpc" label="Firm" value={c.firm} strong />
        <Row tier="cpc" label="Attorney" value={`${c.attorney.name} · ★ ${c.attorney.rating}`} />
      </Section>
      <Section icon="location-pin" title="Court">
        <Row tier="cpc" label="Court of record" value={c.courtCity} strong />
        <Row tier="det" label="Disposition" value="Dismissed" />
      </Section>
      <Section icon="bill-dollar-2" title="Billing">
        <Row tier="cpc" label="Balance" value="$0 · paid" strong />
      </Section>
      <StickyAction a={a} />
    </Frame390>
  );
}
function DetailIncomplete(){
  const c = CASES.incomp; const a = primaryAction(c);
  return (
    <Frame390>
      <DetailBar />
      <Hero c={c} bg="#f6f7f9">
        <div style={{ display:'flex', gap:12, marginTop:12 }}>
          <Thumb w={72} h={72} label="Add photo" />
          <div style={{ flex:1 }}>
            <div style={{ fontSize:12.5, fontWeight:700, color:'var(--wf-strong)' }}>40% complete</div>
            <div className="meter" style={{ marginTop:6 }}><i style={{ width:'40%' }} /></div>
            <div style={{ fontSize:11.5, color:'var(--wf-muted)', marginTop:7, lineHeight:1.4 }}>Add the missing pieces and we'll get you matched with a local attorney.</div>
          </div>
        </div>
      </Hero>
      <Section icon="file-document-info-quick-reference" title="What's missing">
        <Row tier="cpc" label="Ticket photo" value="Not provided" money />
        <Row tier="det" label="Citation no." value="Not provided" money />
        <Row tier="det" label="Issuing agency" value="Not provided" money />
        <Row tier="cpc" label="Court date" value="Not provided" money />
        <Row tier="cpc" label="Violation" value="Not provided" money />
      </Section>
      <Section icon="information-circle" title="Identity & classification">
        <Row tier="cpc" label="Case ID" value={c.caseId} />
        <Row tier="cpc" label="Classification" value="Pending photo" />
        <Row tier="det" label="Jurisdiction" value="Not provided" />
      </Section>
      <StickyAction a={a} />
    </Frame390>
  );
}
function Frame390({ children }){
  return (
    <div className="otr otr-frame screen" style={{ paddingBottom:2 }}>
      <div className="otr-statusbar"><span>9:41</span><span className="dots"><i /><i /><i style={{ width:18 }} /></span></div>
      {children}
    </div>
  );
}

const DETAILS = [
  { id:'c-smart', label:"Detail · SmartMatch'd (quote + blurred attorney)", h:1132, C:DetailSmart,
    vk:'Detail variant · the decision moment', vt:"SmartMatch'd",
    tags:[['hero','gradient lockup'],['attorney','blurred'],['quote','+ countdown'],['action','accept / deny']] },
  { id:'c-active', label:'Detail · Active (reassurance + timeline)', h:1024, C:DetailActive,
    vk:'Detail variant · quiet confidence', vt:'Active',
    tags:[['hero','calm white'],['attorney','revealed'],['timeline','4-step'],['action','secondary only']] },
  { id:'c-dismissed', label:'Detail · Dismissed! (the win, de-escalated)', h:1004, C:DetailDismissed,
    vk:'Detail variant · earned celebration', vt:'Dismissed!',
    tags:[['hero','confetti + outcome'],['§11.3','de-escalated'],['action','review (secondary)']] },
  { id:'c-incomplete', label:'Detail · Incomplete (completeness + missing fields)', h:836, C:DetailIncomplete,
    vk:'Detail variant · low-friction nudge', vt:'Incomplete',
    tags:[['hero','rough · dotted'],['meter','40%'],['fields','"Not provided"'],['action','finish & match']] },
];

function BoardC(){
  return (
    <DCSection id="board-c" title="Board C · Case detail page variants"
      subtitle="Full record for the highest-signal states (§10 data model). Every field tagged ▸ CPC-tier (also on the card) or ◦ detail-only.">
      {DETAILS.map((d) => (
        <DCArtboard key={d.id} id={d.id} label={d.label} width={390} height={d.h} style={{ background:'#eef2fc' }}>
          <div className="otr" style={{ padding:'4px 0 0' }}>
            <Spec vk={d.vk} title={d.vt} tags={d.tags} />
            <d.C />
          </div>
        </DCArtboard>
      ))}
    </DCSection>
  );
}
window.BoardC = BoardC;
})();
