// board-d.jsx — BOARD D · Flow-moment variants (high-friction / high-value)
// Static before→after pairs: (1) quote accept (blurred→revealed), (2) LOE
// one-tap e-sign + re-sign-on-reassignment (§7.7), (3) Dismissed! vs Resolved.
/* __IIFE__ */ ;(function(){
const { DCSection, DCArtboard, CASES, title, StatusBadge, SmartMatchMark, Attorney, Stars, Confetti, Spec, HardestCall } = window;
const { FeatureIcon: FI } = window.OffTheRecordDesignSystem_6eff96;

const CW = 312;
function Card({ children, tint }){
  return (
    <div className="otr" style={{ width:CW, flex:'none' }}>
      <div className="otr-frame screen" style={{ width:CW, padding:'14px 14px 16px', minHeight:300, background: tint||'var(--wf-bg)' }}>
        {children}
      </div>
    </div>
  );
}
function Head({ c, status, note }){
  return (
    <div style={{ display:'flex', justifyContent:'space-between', gap:8, alignItems:'flex-start', marginBottom:12 }}>
      <div style={{ minWidth:0 }}>
        <p className="ttl" style={{ fontSize:14.5 }}>{title(c)}</p>
        <span style={{ fontSize:11.5, color:'var(--wf-faint)' }}>{c.caseId}</span>
      </div>
      <StatusBadge status={status} note={note} />
    </div>
  );
}
function Arrow({ label }){
  return (
    <div style={{ flex:'none', width:74, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:6, alignSelf:'center' }}>
      <div style={{ width:36, height:36, borderRadius:18, background:'#fff', border:'1px solid var(--wf-line)', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 2px 8px rgba(20,30,60,.1)' }}>
        <FI name="tag-chevron" size={16} color="var(--otr-blue)" />
      </div>
      <span style={{ fontSize:10, fontWeight:800, letterSpacing:.3, textTransform:'uppercase', color:'var(--wf-muted)', textAlign:'center', lineHeight:1.2, width:72 }}>{label}</span>
    </div>
  );
}
function VS(){
  return (
    <div style={{ flex:'none', width:48, alignSelf:'center', display:'flex', flexDirection:'column', alignItems:'center', gap:6 }}>
      <div style={{ width:1, height:40, background:'var(--wf-line)' }} />
      <span style={{ fontSize:12, fontWeight:800, color:'var(--wf-faint)' }}>vs</span>
      <div style={{ width:1, height:40, background:'var(--wf-line)' }} />
    </div>
  );
}
function AttRow({ name, rating, firm, blurred, reveal }){
  return (
    <div style={{ display:'flex', alignItems:'center', gap:10, padding:'10px', borderRadius:11,
      background: reveal?'#eef5ff':'#faf7ff', border:`1px solid ${reveal?'#d4e4ff':'#ece4fb'}` }}>
      <Attorney size={42} blurred={blurred} />
      <div style={{ flex:1 }}>
        <div style={{ fontSize:13.5, fontWeight:700 }}>{blurred?'Best-fit attorney matched':name}</div>
        <div style={{ display:'flex', alignItems:'center', gap:7, marginTop:2 }}><Stars rating={rating} size={11} /><span style={{ fontSize:11.5, color:'var(--wf-faint)' }}>{blurred?'revealed on accept':firm}</span></div>
      </div>
      {reveal && <FI name="check-thick" size={18} color="#179a55" />}
    </div>
  );
}
function Btn({ kind='primary', icon, children }){
  return <div className={`act ${kind} full`} style={{ marginTop:12 }}>{icon && <FI name={icon} size={15} color={kind==='ghost'?'var(--wf-ink)':'#fff'} />}{children}</div>;
}
function ESign({ label, checked }){
  return (
    <div style={{ display:'flex', gap:9, alignItems:'flex-start', padding:'11px', borderRadius:11, background:'#fff', border:`1.4px solid ${checked?'#bfe6cd':'var(--wf-line)'}`, marginTop:11 }}>
      <div style={{ width:20, height:20, borderRadius:6, flex:'none', display:'flex', alignItems:'center', justifyContent:'center',
        background:checked?'#179a55':'#fff', border:`1.6px solid ${checked?'#179a55':'var(--wf-faint)'}` }}>
        {checked && <FI name="check-thick" size={12} color="#fff" />}</div>
      <span style={{ fontSize:11.5, color:'var(--wf-strong)', lineHeight:1.4 }}>{label}</span>
    </div>
  );
}
const Note = ({ icon, children, c='var(--wf-muted)' }) => (
  <div style={{ display:'flex', alignItems:'flex-start', gap:7, fontSize:12, color:c, fontWeight:600, marginTop:10, lineHeight:1.4 }}>
    <FI name={icon} size={13} color={c} style={{ marginTop:1, flex:'none' }} />{children}</div>
);

// ── moments ───────────────────────────────────────────────────────────────
function MQuote(){
  const c = CASES.smart;
  return (<>
    <Card tint="linear-gradient(160deg,#f7f3ff,#fdfbff)">
      <Head c={c} status="smartmatchd" />
      <AttRow blurred rating={4.9} />
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:11, padding:'0 2px' }}>
        <div style={{ display:'flex', alignItems:'center', gap:6 }}><SmartMatchMark size={17} /><span style={{ fontSize:12, color:'#6a4bd6', fontWeight:700 }}>Legal fee quote</span></div>
        <div style={{ textAlign:'right' }}><span className="quote" style={{ fontSize:21 }}>${c.quote.amount}</span><div className="timer"><FI name="countdown-timer" size={11} color="var(--money)" />{c.quote.expires}</div></div>
      </div>
      <Btn kind="grad">Accept or deny quote</Btn>
    </Card>
    <Arrow label="Accept quote" />
    <Card>
      <Head c={c} status="active" />
      <AttRow name="Sofia Mendez" rating={4.9} firm="Mendez & Cole" reveal />
      <Note icon="check-thick" c="#179a55">Quote accepted — your attorney is revealed and on the case. The fee leaves the hierarchy.</Note>
      <Note icon="location-pin">Next: court date confirmation</Note>
    </Card>
  </>);
}
function MLoe(){
  const c = CASES.loe;
  return (<>
    <Card>
      <Head c={c} status="active-action" />
      <Note icon="file-edit" c="var(--otr-blue)"><b>One step left.</b> Sign your letter of engagement to formalize representation.</Note>
      <ESign label="Checking this box constitutes an electronic signature authorizing Whitfield &amp; Reyes to represent you." />
      <Btn kind="primary" icon="file-edit">Sign &amp; continue</Btn>
    </Card>
    <Arrow label="One-tap e-sign" />
    <Card>
      <Head c={c} status="active" />
      <ESign label="Electronic signature recorded · Mar 18, 2026, 4:21 PM" checked />
      <Note icon="check-thick" c="#179a55"><b>You're all set.</b> Engagement signed — we'll take it from here. The titled badge clears back to a calm Active.</Note>
    </Card>
  </>);
}
function MResign(){
  const c = CASES.loe;
  return (<>
    <Card>
      <Head c={c} status="active-action" />
      <div style={{ display:'flex', alignItems:'center', gap:8, padding:'10px 11px', borderRadius:11, background:'#fff7ed', border:'1px solid #fce3c0' }}>
        <FI name="line-arrow-synchronize-1" size={16} color="#b96a06" />
        <span style={{ fontSize:11.5, color:'#8a5206', fontWeight:600, lineHeight:1.35 }}>Your case was reassigned. Only the attorney changed — your case continues.</span>
      </div>
      <div style={{ display:'flex', alignItems:'center', gap:8, marginTop:11 }}>
        <div style={{ flex:1, padding:'8px', borderRadius:9, background:'#f4f4f6', textAlign:'center', opacity:.6 }}><div style={{ fontSize:11.5, fontWeight:700, textDecoration:'line-through' }}>R. Mason</div><div className="micro">previous</div></div>
        <FI name="tag-chevron" size={14} color="var(--wf-faint)" />
        <div style={{ flex:1, padding:'8px', borderRadius:9, background:'#eef5ff', textAlign:'center', border:'1px solid #d4e4ff' }}><div style={{ fontSize:11.5, fontWeight:800, color:'var(--otr-blue)' }}>Dana Whitfield</div><div className="micro">new attorney</div></div>
      </div>
      <ESign label="Re-confirm engagement with your new attorney — one tap. Not a fresh start." />
      <Btn kind="primary" icon="check-thick">Re-confirm (1 tap)</Btn>
    </Card>
    <Arrow label="Re-confirm, not restart" />
    <Card>
      <Head c={c} status="active" />
      <AttRow name="Dana Whitfield" rating={4.9} firm="Whitfield &amp; Reyes" reveal />
      <Note icon="check-thick" c="#179a55"><b>Re-confirmed.</b> Dana Whitfield is on it. No re-booking, no lost progress.</Note>
    </Card>
  </>);
}
function MEnd(){
  const d = CASES.dismiss; const r = CASES.resolved;
  return (<>
    <Card tint="#eafaf0">
      <Confetti />
      <Head c={d} status="dismissed" />
      <div style={{ fontSize:13.5, fontWeight:800, color:'var(--green-700,#087443)' }}>{d.outcome.result}</div>
      <div style={{ display:'flex', gap:18, marginTop:8 }}>
        <div><div style={{ fontSize:19, fontWeight:800, color:'#179a55' }}>${d.outcome.saved}</div><div className="micro">saved</div></div>
        <div><div style={{ fontSize:19, fontWeight:800, color:'#179a55' }}>{d.outcome.points}</div><div className="micro">points avoided</div></div>
      </div>
      <Note icon="happy-face" c="#179a55">Relief &amp; delight — the earned celebration. Confetti elaborates the win.</Note>
      <Btn kind="ghost">Review your attorney</Btn>
    </Card>
    <VS />
    <Card>
      <Head c={r} status="resolved" />
      <div style={{ fontSize:13.5, fontWeight:700, color:'var(--wf-ink)' }}>{r.outcome.result}</div>
      <div style={{ display:'flex', gap:18, marginTop:8 }}>
        <div><div style={{ fontSize:19, fontWeight:800, color:'var(--wf-strong)' }}>${r.outcome.saved}</div><div className="micro">saved</div></div>
        <div><div style={{ fontSize:19, fontWeight:800, color:'var(--wf-strong)' }}>{r.outcome.points}</div><div className="micro">point avoided</div></div>
      </div>
      <Note icon="straight-face">Recovery — honest result, no false celebration. Routed to value: a review.</Note>
      <Btn kind="ghost">Review your attorney</Btn>
    </Card>
  </>);
}

const MOMENTS = [
  { id:'d-quote', label:"Moment · SmartMatch'd quote accept (blurred → revealed)", w:736, h:476, M:MQuote,
    vk:'Flow moment · the conversion', vt:'Quote accept',
    tags:[['before','blurred + quote'],['after','revealed + fee gone']],
    hard:'After accept, the fee must visibly leave the hierarchy — but the attorney reveal has to feel like a payoff, not just a state flip. Kept the gradient lockup on the "before" only.' },
  { id:'d-loe', label:'Moment · LOE one-tap e-sign', w:736, h:476, M:MLoe,
    vk:'Flow moment · the legal gate (§7.7)', vt:'LOE e-sign',
    tags:[['before','titled + checkbox'],['after','signed · calm Active']],
    hard:'The LOE is a legal step but must read as a confirmation, not a contract wall. One checkbox = the e-signature; the titled badge is the only thing that flagged it.' },
  { id:'d-resign', label:'Moment · Re-sign on reassignment (re-confirm, not restart)', w:736, h:550, M:MResign,
    vk:'Flow moment · the friction cliff (§7.7)', vt:'Re-sign',
    tags:[['before','delta-only diff'],['after','re-confirmed']],
    hard:'The rare double-event (state requires LOE × case reassigned). Showing only the delta (old→new attorney) is what keeps it a re-confirm; surfacing the full LOE again would re-trigger restart anxiety.' },
  { id:'d-end', label:'Moment · Dismissed! celebration vs Resolved recovery', w:736, h:476, M:MEnd,
    vk:'Flow moment · two honest endings', vt:'Win vs recovery',
    tags:[['left','Dismissed! + confetti'],['right','Resolved · honest']],
    hard:'Same layout, opposite emotional register. Resolved must not borrow any of the win\'s celebration language or color weight — green stays light, copy stays honest.' },
];

function BoardD(){
  return (
    <DCSection id="board-d" title="Board D · Flow-moment variants"
      subtitle="The make-or-break moments, as static before→after pairs. High-friction / high-value transitions where the system earns (or loses) trust.">
      {MOMENTS.map((m) => (
        <DCArtboard key={m.id} id={m.id} label={m.label} width={m.w} height={m.h} style={{ background:'#eef2fc' }}>
          <div className="otr" style={{ padding:'6px 16px 0' }}>
            <Spec vk={m.vk} title={m.vt} tags={m.tags} />
            <div style={{ display:'flex', alignItems:'flex-start', gap:0 }}><m.M /></div>
            <HardestCall>{m.hard}</HardestCall>
          </div>
        </DCArtboard>
      ))}
    </DCSection>
  );
}
window.BoardD = BoardD;
})();
