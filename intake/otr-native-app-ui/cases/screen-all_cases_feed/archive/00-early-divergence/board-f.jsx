// board-f.jsx — BOARD F · Consistent-CTA + ticket-aesthetic direction
// Solves the varying-CTA-color confusion: every primary action is ONE blue;
// sentiment color is retained on status badges (and the red overdue ALERT),
// never on the button. Plus the rough "ticket = bad" paper vs clean
// "solution = good" UI, per the CEO reference.
/* __IIFE__ */ ;(function(){
const { DCSection, DCArtboard, CASES, title, primaryAction, badgeNote, StatusBadge,
  SmartMatchMark, Thumb, Attorney, Stars, Confetti, Frame, Spec, HardestCall, Ticket,
  AttorneyRow, MetaLine, OverduePill, OTR_STATUS } = window;
const { FeatureIcon: FI } = window.OffTheRecordDesignSystem_6eff96;

const FEED = ['almost','smart','overdue','loe','unread','dismiss','incomp'];

function GradWord({ children }){
  return <span style={{ background:'var(--otr-grad)', WebkitBackgroundClip:'text', backgroundClip:'text', color:'transparent', fontWeight:800 }}>{children}</span>;
}
// blurred attorney lockup — rounded photo, gradient check, rating chip (the §7.6 reveal pattern)
function AttLockup({ size = 124, rating = 4.7, reveal = false }){
  return (
    <div style={{ position:'relative', width:size, flex:'none', transform:'rotate(-2deg)' }}>
      <div style={{ width:size, height:size, borderRadius:15, overflow:'hidden', boxShadow:'0 5px 16px rgba(20,30,60,.2)' }}>
        <div className="wf-photo" style={{ width:'100%', height:'100%', borderRadius:0, filter: reveal?'none':'blur(3px)' }}><span>{reveal?'Attorney':''}</span></div>
      </div>
      <div style={{ position:'absolute', top:-9, right:-9, width:38, height:38, borderRadius:'50%', background:'var(--otr-grad)',
        display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 3px 9px rgba(102,47,229,.4)', border:'2.5px solid #fff' }}>
        <FI name="check-thick" size={17} color="#fff" /></div>
      <div style={{ position:'absolute', left:8, bottom:8, background:'#fff', borderRadius:999, padding:'3px 9px',
        display:'inline-flex', alignItems:'center', gap:4, boxShadow:'0 2px 7px rgba(20,30,60,.18)' }}>
        <span style={{ fontSize:12.5, fontWeight:800 }}>{rating}</span><FI name="star-1" size={13} color="var(--amber-400,#fdb022)" /></div>
    </div>
  );
}

// ── F1 · hero quote screen (the CEO reference, in our system) ──────────────
function QuoteScreen(){
  const c = CASES.smart;
  return (
    <div className="otr otr-frame screen">
      <div className="otr-statusbar"><span>9:41</span><span className="dots"><i /><i /><i style={{ width:18 }} /></span></div>
      <div style={{ padding:'8px 20px 20px' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:10 }}>
          <h2 style={{ margin:0, fontSize:23, fontWeight:800, letterSpacing:-.5, lineHeight:1.1, maxWidth:200 }} className="balance">Your instant quote</h2>
          <StatusBadge status="smartmatchd" />
        </div>
        <Ticket variant="cream" cap="TRAFFIC CITATION · CA"
          fields={[['Defendant:','Joshua Titus'],['Issue date:','May 25, 2026'],['Court:','Denver County Munici…']]}
          violations={[{ v:'Speeding 1–5 mph over the limit', note:'speed limit over 40mph' },{ v:'Driving without a license', note:'no license on person' }]}
          style={{ margin:'16px 2px 4px' }} />
        <div style={{ display:'flex', gap:16, marginTop:22, alignItems:'flex-start' }}>
          <AttLockup size={118} rating={4.7} />
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ fontSize:19, fontWeight:800, letterSpacing:-.3, lineHeight:1.15 }}>Your <GradWord>SmartMatch'd</GradWord><span style={{ fontSize:11, verticalAlign:'super', color:'#8b5cf6' }}>™</span></div>
            <p style={{ margin:'4px 0 0', fontSize:13.5, color:'var(--wf-muted)', lineHeight:1.4 }} className="balance">Qualified local professional ready to take the case and fight</p>
            <div style={{ height:1, background:'var(--wf-line)', margin:'12px 0' }} />
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline' }}>
              <span style={{ fontSize:15, fontWeight:800 }}>Legal fee</span>
              <span style={{ fontSize:24, fontWeight:800, letterSpacing:-.5 }}>$149</span>
            </div>
          </div>
        </div>
        <div className="act blue full" style={{ marginTop:20, height:50, fontSize:16, borderRadius:999 }}>Review &amp; accept</div>
        <div style={{ textAlign:'center', marginTop:14, fontSize:13, color:'#5b6da8', fontWeight:600 }}>This quote will expire in <b style={{ color:'#2e3f7a' }}>24 minutes</b></div>
      </div>
    </div>
  );
}

// ── F2 · ticket pattern library ───────────────────────────────────────────
function TicketLib(){
  const item = (label, node, note) => (
    <div style={{ marginBottom:18 }}>
      <div style={{ fontSize:11.5, fontWeight:800, color:'var(--wf-strong)', marginBottom:9 }}>{label}</div>
      <div style={{ padding:'0 6px' }}>{node}</div>
      <div style={{ fontSize:11.5, color:'var(--wf-muted)', marginTop:11, lineHeight:1.4 }} className="balance">{note}</div>
    </div>
  );
  return (
    <div className="otr" style={{ padding:'22px 24px', background:'#fff', height:'100%' }}>
      <div style={{ fontSize:11, fontWeight:800, letterSpacing:1, textTransform:'uppercase', color:'var(--wf-faint)' }}>Ticket = bad · the rough paper pattern</div>
      <h2 style={{ margin:'3px 0 4px', fontSize:21, fontWeight:800, letterSpacing:-.4 }} className="balance">Represents the citation in hand</h2>
      <p style={{ margin:'0 0 18px', fontSize:13, color:'var(--wf-muted)', lineHeight:1.45 }} className="balance">Titled, imperfect, monospace, perforated — it associates the "ticket experience" with bad. Everything else (the solution) stays clean &amp; friendly.</p>
      {item('Default · cream', <Ticket variant="cream" cap="TRAFFIC CITATION · TX"
        fields={[['Defendant:','M. Brail'],['Issue date:','Dec 02, 2025'],['Court:','Harris County…']]}
        violations={[{ v:'No proof of insurance', note:'TC 601.191' }]} />,
        'Rendered from structured data — works whether or not the user uploaded a photo.')}
      {item('California · pink', <Ticket variant="pink" cap="NOTICE TO APPEAR · CA"
        fields={[['Defendant:','L. Park'],['Issue date:','Feb 11, 2026'],['Court:','San Diego Sup…']]}
        violations={[{ v:'Speeding · VC 22349(a)', note:'66 in a 55' }]} />,
        'A state variation — California issues pink citations. Same pattern, different paper.')}
      {item('Photo uploaded', <Ticket photo />,
        'When a photo exists, it inherits the same torn/titled treatment so the rough aesthetic holds.')}
    </div>
  );
}

// ── F3 · consistent-CTA feed (blue button everywhere) ─────────────────────
function keyLineF(c){
  if (c.balance && c.balance.overdue) return null; // shown via red alert
  switch (c.status){
    case 'smartmatchd':   return ['countdown-timer', `Quote $${c.quote.amount} · expires ${c.quote.expires}`];
    case 'almostgone':    return ['countdown-timer', `$${c.quote.amount} · ${c.quote.expires} left`];
    case 'active-action': return ['file-edit', 'Sign your letter of engagement'];
    case 'active':        return c.unread ? ['bell-notification', `${c.unread} new updates from ${c.attorney.name}`] : ['location-pin', `Court ${c.courtDate}`];
    case 'dismissed':     return ['chart-circle-up-growth', `${c.outcome.result} · saved $${c.outcome.saved}`];
    case 'incomplete':    return ['image-photo-add', 'Ticket photo not provided'];
    default:              return null;
  }
}
function CardConsistent({ c }){
  const a = primaryAction(c);
  const cls = a ? (a.kind === 'ghost' ? 'ghost' : 'blue') : null;
  const showQ = c.status==='smartmatchd' || c.status==='almostgone';
  const showA = c.attorney && !showQ;
  const kl = keyLineF(c);
  return (
    <div className="cpc">
      {c.status==='dismissed' && <Confetti />}
      <div style={{ display:'flex', gap:11, alignItems:'flex-start' }}>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ display:'flex', justifyContent:'space-between', gap:8, alignItems:'flex-start' }}>
            <p className="ttl">{title(c)}</p>
            <StatusBadge status={c.status} unread={!!c.unread} note={badgeNote(c)} />
          </div>
          <div style={{ display:'flex', gap:8, marginTop:4 }}>
            <span className="classif"><FI name="tag" size={10} color="var(--wf-muted)" />{c.cls}</span>
            <span style={{ fontSize:11.5, color:'var(--wf-faint)' }}>{c.caseId}</span></div>
        </div>
      </div>
      <div style={{ marginTop:11, display:'flex', flexDirection:'column', gap:8 }}>
        {showQ && <AttorneyRow c={c} quote />}
        {showA && <AttorneyRow c={c} />}
        {kl && <MetaLine icon={kl[0]} strong={c.status==='active'&&!!c.unread}>{kl[1]}</MetaLine>}
        {c.balance && c.balance.overdue && <OverduePill c={c} />}
      </div>
      {a && <div className={`act ${cls} full`} style={{ marginTop:12 }}>
        {a.icon && <FI name={a.icon} size={15} color={cls==='ghost'?'var(--wf-ink)':'#fff'} />}
        {a.kind==='grad' ? 'Accept or deny quote' : a.label}</div>}
    </div>
  );
}
function ConsistentFeed(){
  return (
    <Frame screen>
      <div className="otr-feed">{FEED.map((k) => <CardConsistent key={k} c={CASES[k]} />)}</div>
    </Frame>
  );
}

// ── F4 · Incomplete with full ticket as evidence ──────────────────────────
function TicketIncompleteScreen(){
  const c = CASES.incomp;
  return (
    <div className="otr otr-frame screen">
      <div className="otr-statusbar"><span>9:41</span><span className="dots"><i /><i /><i style={{ width:18 }} /></span></div>
      <div style={{ padding:'8px 20px 20px' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:10 }}>
          <h2 style={{ margin:0, fontSize:22, fontWeight:800, letterSpacing:-.5, lineHeight:1.15, maxWidth:210 }} className="balance">Finish your case</h2>
          <StatusBadge status="incomplete" />
        </div>
        <p style={{ margin:'6px 0 0', fontSize:13.5, color:'var(--wf-muted)', lineHeight:1.45 }} className="balance">Add the missing pieces and we'll match you with a local attorney.</p>
        <Ticket variant="cream" cap="TRAFFIC CITATION · DRAFT"
          fields={[['Defendant:','Not provided'],['Issue date:','Not provided'],['Court:','Not provided']]}
          violations={[{ v:'Violation — not provided', note:'add your ticket to continue' }]}
          style={{ margin:'16px 2px 4px' }} />
        <div style={{ display:'flex', alignItems:'center', gap:10, marginTop:18 }}>
          <span className="micro" style={{ flex:'none' }}>40% complete</span>
          <div className="meter" style={{ flex:1 }}><i style={{ width:'40%' }} /></div>
        </div>
        <div className="act blue full" style={{ marginTop:18, height:50, fontSize:16, borderRadius:999 }}>
          <FI name="image-photo-add" size={17} color="#fff" />Finish &amp; get matched</div>
      </div>
    </div>
  );
}

function BoardF(){
  return (
    <DCSection id="board-f" title="Board F · Consistent CTA + ticket aesthetic (new direction)"
      subtitle="One blue CTA everywhere — color stays on badges, never the button. Plus the rough 'ticket = bad' paper against clean 'solution = good' UI (per the reviewed reference).">
      <DCArtboard id="f-quote" label="SmartMatch'd quote — ticket + clean solution + one blue CTA" width={390} height={696} style={{ background:'#eef2fc' }}>
        <div className="otr" style={{ padding:'4px 0 0' }}>
          <Spec vk="New direction · the reference, in our system" title="Quote screen"
            tags={[['ticket','rough · monospace'],['solution','clean'],['CTA','one blue'],['badge','SmartMatch\u2019d']]} />
          <QuoteScreen />
        </div>
      </DCArtboard>

      <DCArtboard id="f-tickets" label="Ticket pattern library (cream · California pink · photo)" width={430} height={884} style={{ background:'#fff' }}>
        <TicketLib />
      </DCArtboard>

      <DCArtboard id="f-feed" label="Consistent-CTA feed — every primary action is one blue" width={390} height={2046} style={{ background:'#eef2fc' }}>
        <div className="otr" style={{ padding:'4px 0 0' }}>
          <Spec vk="Fix · CTA color confusion solved" title="Consistent blue CTA"
            tags={[['CTA','always blue'],['money','red alert, blue button'],['badge','keeps all color'],['gradient','badge only']]} />
          <ConsistentFeed />
          <HardestCall>Money no longer recolors the button — overdue urgency moves to the red alert row above a still-blue "Make a payment." Keeps one action color while preserving signal precedence (§7.2).</HardestCall>
        </div>
      </DCArtboard>

      <DCArtboard id="f-incomplete" label="Incomplete — full ticket as evidence + blue CTA" width={390} height={524} style={{ background:'#eef2fc' }}>
        <div className="otr" style={{ padding:'4px 0 0' }}>
          <Spec vk="New direction · ticket in a real state" title="Incomplete + ticket"
            tags={[['ticket','draft · "Not provided"'],['CTA','one blue'],['meter','40%']]} />
          <TicketIncompleteScreen />
        </div>
      </DCArtboard>
    </DCSection>
  );
}
window.BoardF = BoardF;
})();
