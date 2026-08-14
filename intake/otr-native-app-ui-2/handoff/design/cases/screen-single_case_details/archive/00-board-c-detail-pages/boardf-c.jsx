// boardf-c.jsx — BOARD C (F-direction) · Case detail pages
// The detail record re-cut in Board F's language: the citation is a rough
// ticket (evidence in hand), the solution UI stays clean, the blurred match is
// the AttLockup, SmartMatch'd is the GradWord, and every primary action is one
// blue button — overdue urgency moves to a red alert row, never the button.
/* __IIFE__ */ ;(function(){
const { DCSection, DCArtboard, CASES, title, primaryAction, StatusBadge, Confetti,
  Spec, OTR_STATUS, Ticket, GradWord, AttLockup, BlueCTA, FScreen, Stars } = window;
const { FeatureIcon: FI } = window.OffTheRecordDesignSystem_6eff96;

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
    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'2px 18px 10px' }}>
      <FI name="chevron-left" size={16} color="var(--wf-strong)" />
      <span style={{ fontSize:14, fontWeight:700, color:'var(--wf-ink)' }}>Case details</span>
      <FI name="cog" size={16} color="var(--wf-strong)" />
    </div>
  );
}
function Sticky({ a }){
  if (!a) return null;
  return (
    <div style={{ position:'sticky', bottom:0, padding:'12px 16px 16px', background:'linear-gradient(transparent,var(--wf-bg) 26%)' }}>
      <BlueCTA a={a} height={46} fontSize={15} style={{ marginTop:0 }} />
    </div>
  );
}
// header strip: title + badge + classification (clean solution chrome)
function Head({ c }){
  return (
    <div style={{ margin:'0 16px 12px' }}>
      <div style={{ display:'flex', justifyContent:'space-between', gap:8, alignItems:'flex-start' }}>
        <window.TitleBlock c={c} lg />
        <StatusBadge status={c.status} unread={!!c.unread} note={c.daysToCourt?`${c.daysToCourt} days`:null} />
      </div>
      <div style={{ display:'flex', gap:7, marginTop:6 }}>
        <span className="classif"><FI name="tag" size={10} color="var(--wf-muted)" />{c.cls}</span>
        <span style={{ fontSize:11.5, color:'var(--wf-faint)' }}>{c.caseId} · {c.courtCity||'—'}</span>
      </div>
    </div>
  );
}

// ── detail bodies ─────────────────────────────────────────────────────────
function DetailSmart(){
  const c = CASES.smart; const a = primaryAction(c);
  return (
    <FScreen style={{ paddingBottom:2 }}>
      <DetailBar />
      <Head c={c} />
      <div style={{ padding:'0 16px' }}>
        <Ticket variant="cream" cap="TRAFFIC CITATION · CA"
          fields={[['Defendant:','Joshua Titus'],['Issue date:','Mar 04, 2026'],['Court:','LA Metropolitan…']]}
          violations={[{ v:'Speeding · VC 22349(a)', note:'66 in a 55' }]} />
      </div>
      <div style={{ margin:'18px 16px 12px', padding:'13px', background:'linear-gradient(135deg,#f3efff,#fdf0ff)', borderRadius:16, border:'1px solid #e9e2fb' }}>
        <div style={{ display:'flex', gap:14, alignItems:'flex-start' }}>
          <AttLockup size={96} rating={4.9} />
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ fontSize:15, fontWeight:800, letterSpacing:-.3, lineHeight:1.15 }}>Your <GradWord>SmartMatch'd</GradWord></div>
            <p style={{ margin:'3px 0 0', fontSize:12, color:'var(--wf-muted)', lineHeight:1.4 }} className="balance">A real, local attorney — revealed the moment you accept.</p>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginTop:10 }}>
              <span style={{ fontSize:13, fontWeight:800 }}>Legal fee</span>
              <div style={{ textAlign:'right' }}><span className="quote" style={{ fontSize:20 }}>${c.quote.amount}</span><div className="timer"><FI name="countdown-timer" size={11} color="var(--money)" />{c.quote.expires}</div></div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ padding:'0 16px' }}>
        <Section icon="user-square-single" title="Representation" accent="var(--otr-blue)">
          <Row tier="cpc" label="Firm" value={c.firm} strong />
          <Row tier="cpc" label="Attorney" value="Blurred until accept" />
          <Row tier="cpc" label="Rating" value="★ 4.9" />
          <Row tier="det" label="Letter of engagement" value="Prepared — signs after accept" />
        </Section>
        <Section icon="file-report" title="Violation & legal">
          <Row tier="cpc" label="Primary violation" value="Speeding · VC 22349(a)" strong />
          <Row tier="cpc" label="More" value={`+${c.more} more`} />
          <Row tier="det" label="Severity" value="Infraction" />
        </Section>
        <Section icon="bill-dollar-2" title="Billing">
          <Row tier="cpc" label="Quoted" value={`$${c.quote.amount}`} strong />
          <Row tier="det" label="Charged" value="Not until you accept" />
        </Section>
      </div>
      <Sticky a={a} />
    </FScreen>
  );
}
function DetailActive(){
  const c = CASES.active; const a = { label:'Message your attorney', kind:'ghost', icon:'chat-bubble-oval-smiley-1' };
  return (
    <FScreen style={{ paddingBottom:2 }}>
      <DetailBar />
      <Head c={c} />
      <div style={{ margin:'0 16px 12px', padding:'13px', background:'#fff', borderRadius:16, border:'1px solid var(--wf-line)' }}>
        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
          <AttLockup size={64} rating={c.attorney.rating} reveal />
          <div style={{ flex:1 }}>
            <div style={{ fontSize:14.5, fontWeight:800 }}>{c.attorney.name}</div>
            <div style={{ display:'flex', alignItems:'center', gap:7, marginTop:3 }}><Stars rating={c.attorney.rating} size={11} /><span style={{ fontSize:11.5, color:'var(--wf-faint)' }}>{c.firm}</span></div>
          </div>
          <FI name="chat-bubble-oval-smiley-1" size={20} color="var(--otr-blue)" />
        </div>
        <div style={{ display:'flex', gap:6, marginTop:11, fontSize:11, color:'var(--wf-faint)', fontWeight:600 }}>
          <FI name="circle-clock" size={12} color="var(--wf-faint)" />Updated 2 days ago · next update expected by Apr 10
        </div>
      </div>
      <div style={{ padding:'0 16px' }}>
        <Section icon="line-arrow-synchronize-1" title="Status timeline">
          <div style={{ display:'flex', gap:5, margin:'4px 0 6px' }}>{['Booked','Matched','Active','Resolved'].map((s,i)=>(
            <div key={i} className="meter" style={{ flex:1 }}><i style={{ width:i<=2?'100%':'0%', background:i<=2?'var(--otr-blue)':'transparent' }} /></div>))}</div>
          <div style={{ display:'flex', justifyContent:'space-between' }}>{['Booked','Matched','Active','Resolved'].map((s,i)=>(
            <span key={i} style={{ fontSize:9, fontWeight:800, textTransform:'uppercase', letterSpacing:.3, color:i===2?'var(--otr-blue)':'var(--wf-faint)' }}>{s}</span>))}</div>
        </Section>
        <Section icon="location-pin" title="Court">
          <Row tier="cpc" label="Court of record" value={c.courtCity} strong />
          <Row tier="cpc" label="Court date" value={c.courtDate} strong />
          <Row tier="det" label="Appear-by" value="Attorney appears for you" />
        </Section>
        <Section icon="bill-dollar-2" title="Billing">
          <Row tier="cpc" label="Balance" value="$0 · paid" strong />
          <Row tier="det" label="Method" value="Visa ···· 4242" />
        </Section>
      </div>
      <Sticky a={a} />
    </FScreen>
  );
}
function DetailOverdue(){
  const c = CASES.overdue; const a = primaryAction(c);
  return (
    <FScreen style={{ paddingBottom:2 }}>
      <DetailBar />
      <Head c={c} />
      <div style={{ margin:'0 16px 12px', display:'flex', alignItems:'center', gap:9, padding:'10px 13px', borderRadius:12,
        background:'var(--money-bg)', border:'1px solid var(--money-line)' }}>
        <FI name="bill-dollar-2" size={17} color="var(--money)" />
        <span style={{ flex:1, fontSize:13, fontWeight:700, color:'var(--money)' }}>Payment overdue</span>
        <span style={{ fontSize:14, fontWeight:800, color:'var(--money)' }}>${c.balance.amount}</span>
      </div>
      <div style={{ margin:'0 16px 12px', padding:'13px', background:'#fff', borderRadius:16, border:'1px solid var(--wf-line)' }}>
        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
          <AttLockup size={56} rating={c.attorney.rating} reveal />
          <div style={{ flex:1 }}>
            <div style={{ fontSize:14, fontWeight:800 }}>{c.attorney.name}</div>
            <div style={{ display:'flex', alignItems:'center', gap:7, marginTop:2 }}><Stars rating={c.attorney.rating} size={11} /><span style={{ fontSize:11.5, color:'var(--wf-faint)' }}>{c.firm}</span></div>
          </div>
        </div>
      </div>
      <div style={{ padding:'0 16px' }}>
        <Section icon="bill-dollar-2" title="Billing" accent="var(--money)">
          <Row tier="cpc" label="Balance due" value={`$${c.balance.amount}`} money strong />
          <Row tier="det" label="Status" value="Overdue" money />
          <Row tier="det" label="Method" value="Add a payment method" />
        </Section>
        <Section icon="location-pin" title="Court">
          <Row tier="cpc" label="Court of record" value={c.courtCity} strong />
          <Row tier="cpc" label="Court date" value={c.courtDate} strong />
        </Section>
      </div>
      <Sticky a={a} />
    </FScreen>
  );
}
function DetailDismissed(){
  const c = CASES.dismiss; const a = primaryAction(c);
  return (
    <FScreen style={{ paddingBottom:2 }}>
      <Confetti />
      <DetailBar />
      <Head c={c} />
      <div style={{ margin:'0 16px 12px', padding:'14px', background:'#eafaf0', borderRadius:16, border:'1px solid #cdeed8', position:'relative' }}>
        <div style={{ fontSize:13.5, fontWeight:800, color:'var(--green-700,#087443)' }}>{c.outcome.result}</div>
        <div style={{ display:'flex', gap:22, marginTop:10 }}>
          <div><div style={{ fontSize:22, fontWeight:800 }}><GradWord>${c.outcome.saved}</GradWord></div><div className="micro">saved</div></div>
          <div><div style={{ fontSize:22, fontWeight:800, color:'#179a55' }}>{c.outcome.points}</div><div className="micro">points avoided</div></div>
        </div>
      </div>
      <div style={{ padding:'0 16px' }}>
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
        <Section icon="bill-dollar-2" title="Billing">
          <Row tier="cpc" label="Balance" value="$0 · paid" strong />
        </Section>
      </div>
      <Sticky a={a} />
    </FScreen>
  );
}
function DetailIncomplete(){
  const c = CASES.incomp; const a = primaryAction(c);
  return (
    <FScreen style={{ paddingBottom:2 }}>
      <DetailBar />
      <Head c={c} />
      <p style={{ margin:'-4px 16px 12px', fontSize:13, color:'var(--wf-muted)', lineHeight:1.45 }} className="balance">Add the missing pieces and we'll match you with a local attorney.</p>
      <div style={{ padding:'0 16px' }}>
        <Ticket variant="cream" cap="TRAFFIC CITATION · DRAFT"
          fields={[['Defendant:','Not provided'],['Issue date:','Not provided'],['Court:','Not provided']]}
          violations={[{ v:'Violation — not provided', note:'add your ticket to continue' }]} />
        <div style={{ display:'flex', alignItems:'center', gap:10, margin:'18px 2px 4px' }}>
          <span className="micro" style={{ flex:'none' }}>40% complete</span>
          <div className="meter" style={{ flex:1 }}><i style={{ width:'40%' }} /></div>
        </div>
      </div>
      <div style={{ padding:'14px 16px 0' }}>
        <Section icon="file-document-info-quick-reference" title="What's missing">
          <Row tier="cpc" label="Ticket photo" value="Not provided" money />
          <Row tier="det" label="Citation no." value="Not provided" money />
          <Row tier="cpc" label="Court date" value="Not provided" money />
          <Row tier="cpc" label="Violation" value="Not provided" money />
        </Section>
      </div>
      <Sticky a={a} />
    </FScreen>
  );
}

const DETAILS = [
  { id:'fc-smart', label:"Detail · SmartMatch'd (ticket + AttLockup + blue CTA)", h:1196, C:DetailSmart,
    vk:'Detail · the decision moment', vt:"SmartMatch'd",
    tags:[['ticket','rough · evidence'],['match','AttLockup blurred'],['wordmark','GradWord'],['CTA','one blue']] },
  { id:'fc-active', label:'Detail · Active (revealed AttLockup + timeline)', h:946, C:DetailActive,
    vk:'Detail · quiet confidence', vt:'Active',
    tags:[['match','revealed'],['timeline','4-step'],['CTA','ghost message']] },
  { id:'fc-overdue', label:'Detail · Overdue (red alert, blue button)', h:850, C:DetailOverdue,
    vk:'Detail · money urgency, off the button', vt:'Overdue',
    tags:[['alert','red row'],['button','still blue'],['§7.2','precedence kept']] },
  { id:'fc-dismissed', label:'Detail · Dismissed! (the win + GradWord)', h:902, C:DetailDismissed,
    vk:'Detail · earned celebration', vt:'Dismissed!',
    tags:[['hero','confetti + outcome'],['$saved','GradWord'],['CTA','review (ghost)']] },
  { id:'fc-incomplete', label:'Detail · Incomplete (draft ticket as evidence)', h:856, C:DetailIncomplete,
    vk:'Detail · low-friction nudge', vt:'Incomplete',
    tags:[['ticket','draft · "Not provided"'],['meter','40%'],['CTA','one blue']] },
];

function BoardC(){
  return (
    <DCSection id="boardf-c" title="Board C · Case detail pages (F-direction)"
      subtitle="The full record re-cut in Board F's language: the citation is a rough ticket, the match is the blurred AttLockup, SmartMatch'd is the GradWord, and every primary action is one blue button.">
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
window.BoardFC = BoardC;
})();
