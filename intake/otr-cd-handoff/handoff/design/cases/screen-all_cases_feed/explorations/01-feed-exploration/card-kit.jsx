// card-kit.jsx — the consistent-CTA case card + the alert-toast system.
// The four signatures established in Board F:
//   1) ONE blue CTA everywhere — sentiment color stays on badges (and the red
//      overdue alert), never on the button.
//   2) The rough "ticket = bad" paper (cream/pink, monospace, perforated)
//      against clean "solution = good" UI.
//   3) The blurred-attorney AttLockup (rounded photo · gradient check · rating chip).
//   4) GradWord — the gradient-text SmartMatch'd wordmark.
/* __IIFE__ */ ;(function(){
const { CASES, title, primaryAction, badgeNote, StatusBadge, Confetti, Ticket,
  AttorneyRow, MetaLine, OverduePill, OTR_STATUS } = window;
const { FeatureIcon: FI } = window.OffTheRecordDesignSystem_6eff96;

// gradient-text wordmark (SmartMatch'd, "$480 saved", etc.)
function GradWord({ children }){
  return <span style={{ background:'var(--otr-grad)', WebkitBackgroundClip:'text', backgroundClip:'text', color:'transparent', fontWeight:800 }}>{children}</span>;
}

// blurred attorney lockup — rounded photo, gradient check, rating chip (§7.6 reveal)
function AttLockup({ size = 124, rating = 4.7, reveal = false }){
  return (
    <div style={{ position:'relative', width:size, flex:'none', transform:'rotate(-2deg)' }}>
      <div style={{ width:size, height:size, borderRadius:Math.round(size*0.16), overflow:'hidden', boxShadow:'0 5px 16px rgba(20,30,60,.2)' }}>
        <div className={`wf-portrait${reveal?'':' blur'}`} style={{ width:'100%', height:'100%' }} />
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

// EXPERIMENT: no blue case-card CTAs — every card action renders as a ghost
// button. (fClass previously promoted the §7.2 primary to one blue.)
function fClass(a){ return a ? 'ghost' : null; }
function fLabel(a){ return a && a.kind === 'grad' ? 'Review quote' : (a ? a.label : ''); }

function BlueCTA({ a, height = 44, fontSize = 15, style = {} }){
  if (!a) return null;
  const cls = fClass(a);
  return (
    <div className={`act ${cls} full`} style={{ marginTop:12, height, fontSize, borderRadius:999, ...style }}>
      {a.icon && <FI name={a.icon} size={fontSize+1} color={cls==='ghost'?'var(--wf-ink)':'#fff'} />}{fLabel(a)}
    </div>
  );
}

// one-line state summary used in the consistent-CTA feed cards.
// zone tags whether the line is case/ticket-level ('case' — sits with the
// ticket identity, above the attorney) or attorney-level ('attorney' — sits
// with the lawyer block). A court date is ticket data, so it groups upward.
function keyLineF(c){
  if (c.balance && c.balance.overdue) return null; // shown via red alert
  switch (c.status){
    case 'smartmatchd':   return null; // quote + red countdown already shown in the attorney row
    case 'almostgone':    return null; // quote + red countdown already shown in the attorney row
    case 'active-action': return null; // surfaced as the red-dot notification row instead
    case 'active':        return null; // court date has its own persistent row; unread → notif row
    case 'deadline':      return null; // countdown now lives in the red grouped toast
    case 'expired':       return null; // moved into a grouped toast
    case 'analyzing':     return null; // skeleton loader stands in for the attorney/quote
    case 'resolved':      return ['chart-circle-up-growth', c.outcome.result, 'case'];
    case 'dismissed':     return ['chart-circle-up-growth', c.outcome.result, 'case'];
    case 'incomplete':    return null; // ticket-photo row removed; court date (unknown) carries the row
    default:              return null;
  }
}

// ── internal card alert system ─────────────────────────────────────────────
// The chosen pattern (Option D): an alert and the button that resolves it share
// ONE tinted block at the foot of the card — the alert literally owns its CTA.
// Tone is a design-system Banner tone, mapped to a fixed meaning so the color
// is a system signal, never a one-off:
//   error   (red)   → money problem: payment overdue / failed
//   warning (amber) → action required by the user: sign LOE, court date imminent
//   info    (blue)  → new information to read: unread messages from the attorney
//   success (green) → resolved-positive edge: refund issued / guarantee paid
const ALERT_TONE = {
  error:   { bg:'var(--red-50)',   line:'var(--red-200)',   ink:'var(--red-900)',   icon:'var(--red-600)' },
  warning: { bg:'var(--amber-50)', line:'var(--amber-200)', ink:'var(--amber-900)', icon:'var(--amber-500)' },
  info:    { bg:'var(--blue-50)',  line:'var(--blue-200)',  ink:'var(--blue-900)',  icon:'var(--blue-600)' },
  success: { bg:'var(--green-50)', line:'var(--green-200)', ink:'var(--green-900)', icon:'var(--green-600)' },
  match:   { bg:'#f1eeff',         line:'#dcd6f5',          ink:'#5b4bb8',          icon:'#6a5bd0' },
  inactive:{ bg:'#f3f4f6',         line:'#e4e6ea',          ink:'#3b3e46',          icon:'#98a1ae' },
};
// Returns the ONE primary alert for a card (or null). Each carries its resolving
// CTA label so the grouped block stays self-contained.
function cardAlert(c){
  if (c.balance && c.balance.overdue)
    return { tone:'error', faIcon:'fa-circle-exclamation', text:'Payment overdue', value:`$${c.balance.amount}`, cta:'Make a payment' };
  if (c.status === 'active' && c.disputed)
    return { tone:'error', faIcon:'fa-circle-exclamation', text:'Payment dispute open', cta:'Start a live chat' };
  if (c.status === 'expired')
    return { tone:'inactive', faIcon:'fa-hourglass-end', text:'Your quote has expired', cta:`Get SmartMatch'd again` };
  if (c.status === 'deadline')
    return { tone:'error', faIcon:'fa-triangle-exclamation', text:`Only ${c.daysToCourt} days left to book`, cta:'Complete booking' };
  if (c.status === 'missed')
    return { tone:'error', faIcon:'fa-triangle-exclamation', text:'Potential risk for active warrant', cta:'Contact us now' };
  if (c.status === 'counter')
    return { tone:'warning', faIcon:'fa-scale-balanced', text:'Your attorney sent a counter offer', value:`$${c.counter.to}`, cta:'Review counter offer' };
  if (c.status === 'remarketing')
    return { tone:'match', faIcon:'fa-circle-info', text:`Your last quote was declined`, cta:'View case', ctaKind:'ghost' };
  if (c.status === 'active-action')
    return { tone:'warning', faIcon:'fa-file-signature', text:'Sign your letter of engagement', cta:'Sign & continue' };
  if (c.status === 'active' && c.courtSoon)
    return { tone:'warning', faIcon:'fa-gavel', text:`Court date in ${c.courtSoon} days — let's prep`, cta:'Review checklist' };
  if (c.status === 'active' && c.refundReady)
    return { tone:'success', faIcon:'fa-circle-check', text:'Money-back issued', value:`$${c.refundReady}`, cta:'View refund' };
  if (c.status === 'active' && c.unread > 0)
    return { tone:'info', faIcon:'fa-comment-dots', text:`${c.unread} unread messages`, cta:'View updates' };
  if (c.status === 'dismissed')
    return { tone:'success', faIcon:'fa-star', text:'Review your attorney', cta:'Leave a review' };
  return null;
}
// Quote + attorney row wrapped in a tinted grouped block (matches the toast
// container): purple 'match' tone at SmartMatch'd, red 'error' tone at Last Chance.
function QuoteWrap({ c }){
  const t = ALERT_TONE[c.status==='almostgone' ? 'error' : 'match'];
  return (
    <div style={{ background:t.bg, border:`1px solid ${t.line}`, borderRadius:14, padding:'11px 12px 12px' }}>
      <AttorneyRow c={c} quote tint={{ primary:t.ink, secondary:t.icon }} />
      <BlueCTA a={primaryAction(c)} />
    </div>
  );
}
// Reassignment (§7.7) re-uses the SmartMatch'd quote-wrap layout: the new
// attorney sits in a purple 'match' block tagged "Re-matched", one-tap re-confirm.
function ReassignWrap({ c }){
  const t = ALERT_TONE['match'];
  return (
    <div style={{ marginTop:14, background:t.bg, border:`1px solid ${t.line}`, borderRadius:14, padding:'11px 12px 12px' }}>
      <AttorneyRow c={c} tint={{ primary:t.ink, secondary:t.icon }}
        right={<span style={{ background:t.icon, color:'#fff', fontSize:9.5, fontWeight:800, letterSpacing:.4, textTransform:'uppercase', padding:'3px 8px', borderRadius:999, lineHeight:1, flex:'none' }}>Re-matched</span>} />
      <BlueCTA a={{ label:'Review new match', kind:'primary' }} />
    </div>
  );
}
// The grouped alert+action block — the persistent home for every card toast.
function GroupedAlert({ al }){
  const t = ALERT_TONE[al.tone];
  return (
    <div style={{ marginTop:12, background:t.bg, border:`1px solid ${t.line}`, borderRadius:14, padding:'11px 12px 12px' }}>
      <div style={{ display:'flex', alignItems:'flex-start', gap:10, marginBottom:10 }}>
        <span style={{ color:t.icon, fontSize:16, flex:'none', width:18, textAlign:'center', lineHeight:'19px' }}><i className={`fa-solid ${al.faIcon}`} /></span>
        <span style={{ flex:1, fontSize:13, fontWeight:700, color:t.ink, lineHeight:1.35, textWrap:'pretty' }}>{al.text}</span>
        {al.value && <span style={{ fontWeight:800, fontSize:14, color:t.ink, flex:'none', lineHeight:'19px' }}>{al.value}</span>}
      </div>
      <div className={`act ghost full`} style={{ marginTop:0, height:44, borderRadius:999, borderColor:t.line }}>{al.cta}</div>
    </div>
  );
}

// Two-line case title (the chosen treatment): line 1 = month year (a quiet
// eyebrow), line 2 = location (the headline). No "Ticket issued" — the
// classification badge already signals the type. Lean on tDate/tPlace helpers.
function TitleBlock({ c, lg = false }){
  return (
    <div style={{ minWidth:0 }}>
      <div style={{ fontSize: lg ? 12.5 : 11.5, fontWeight:600, color:'var(--wf-faint)', letterSpacing:.2 }}>{window.tDate(c)}</div>
      <p className="ttl" style={{ marginTop:1, ...((c.status==='analyzing'||c.status==='remarketing'||c.status==='cancelled') ? { color:'var(--wf-faint)' } : {}), ...(lg ? { fontSize:17, lineHeight:1.25 } : {}) }}>{window.tPlace(c)}</p>
    </div>
  );
}

// Concluded-state footers (both decided in the Board-A study):
//  · Dismissed! (a win) → wrap the attorney profile + a review CTA into one
//    blue block; no "how was…" title, no star row.
//  · Resolved (a reduced outcome) → never ask for a review; surface a
//    forward-looking record-monitoring CTA instead (helps customer + company).
function ReviewWrap({ c }){
  const a = c.attorney;
  return (
    <div style={{ marginTop:12, background:'var(--green-25)', border:'1px solid var(--green-100)', borderRadius:14, padding:12 }}>
      <div style={{ display:'flex', alignItems:'center', gap:10 }}>
        <window.Attorney size={38} />
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ fontSize:13.5, fontWeight:700, color:'var(--green-900)' }}>{a.name}</div>
          <div style={{ display:'flex', alignItems:'center', gap:8, marginTop:1 }}>
            <window.Stars rating={a.rating} size={11} />
            <span style={{ fontSize:11.5, color:'var(--green-700,#087443)' }}>{c.firm}</span>
          </div>
        </div>
      </div>
      <div className="act ghost full" style={{ marginTop:11, height:44, borderRadius:999, borderColor:'var(--green-200)' }}><FI name="star-1" size={15} color="var(--wf-ink)" />Write a review</div>
    </div>
  );
}
function MonitorWrap(){
  return (
    <div style={{ marginTop:12, background:'#f7f8fa', border:'1px solid var(--wf-line)', borderRadius:14, padding:'12px 13px 13px' }}>
      <div style={{ fontSize:12.5, color:'var(--wf-muted)', lineHeight:1.5, marginBottom:11 }}>
        <span style={{ fontWeight:800, color:'var(--wf-strong)' }}>Win more of your next ones.</span> Fastlane members get priority matching, faster quotes, and stronger odds on future cases — <span style={{ color:'var(--otr-blue)', fontWeight:700, textDecoration:'underline', cursor:'pointer' }}>explore Fastlane</span>.
      </div>
      <div className="act ghost full" style={{ marginTop:0, height:44, borderRadius:999 }}>View case</div>
    </div>
  );
}
// Cancelled (§6.2 gap state) — terminal, no-blame, always offers a next step (§12).
function CancelledWrap(){
  return (
    <div style={{ marginTop:12, background:'#f7f8fa', border:'1px solid var(--wf-line)', borderRadius:14, padding:'12px 13px 13px' }}>
      <div style={{ fontSize:12.5, color:'var(--wf-muted)', lineHeight:1.5, marginBottom:11 }}>
        <span style={{ fontWeight:800, color:'var(--wf-strong)' }}>This case was cancelled.</span> Nothing was charged. Whenever you're ready, start a fresh SmartMatch and we'll find you an attorney.
      </div>
      <div className="act ghost full" style={{ marginTop:0, height:44, borderRadius:999 }}>Start a new case</div>
    </div>
  );
}

// Loading skeleton mirroring the SmartMatch'd card's attorney + quote layout —
// a SmartMatch-branded gradient sweeps through the grey blocks while matching.
function SkeletonMatch(){
  return (
    <div style={{ display:'flex', alignItems:'center', gap:10 }}>
      <div className="sk" style={{ width:38, height:38, flex:'none', borderRadius:11 }} />
      <div style={{ flex:1, minWidth:0, display:'flex', flexDirection:'column', gap:7 }}>
        <div className="sk" style={{ width:'60%', height:12 }} />
        <div className="sk" style={{ width:'42%', height:10 }} />
      </div>
      <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end', gap:7 }}>
        <div className="sk" style={{ width:52, height:17 }} />
        <div className="sk" style={{ width:38, height:10 }} />
      </div>
    </div>
  );
}

// The locked-in CPC header (identity zone): the two-line title block, the
// lifecycle/transient badge, and the classification + court-date meta row.
// CPCConsistent and every compact tile elsewhere render through THIS, so a
// change to the eyebrow, the badge mapping, or the missing-data signals
// (clsLabel / courtLabel) propagates to every CPC surface at once.
function CPCHeader({ c }){
  return (
    <>
      <div style={{ display:'flex', justifyContent:'space-between', gap:8, alignItems:'flex-start' }}>
        <TitleBlock c={c} />
        <StatusBadge status={window.badgeStatus(c.status)} note={null} />
      </div>
      <div style={{ display:'flex', gap:8, marginTop:9, alignItems:'center' }}>
        <span className="classif"><FI name="tag" size={10} color="var(--wf-muted)" />{window.clsLabel(c)}</span>
        <span style={{ fontSize:11.5, color: (c.status==='deadline'||c.status==='missed') ? 'var(--money)' : 'var(--wf-faint)', fontWeight:600 }}>Court date · {window.courtLabel(c)}</span>
      </div>
    </>
  );
}

// THE Board-F consistent-CTA case card. Color lives on the badge; the button is
// always one blue. A card alert (if any) takes the foot of the card as a grouped
// alert+action block; otherwise the plain blue CTA sits there.
function CPCConsistent({ c }){
  let a = primaryAction(c);
  if (c.status === 'expired' && a) a = { ...a, kind: 'ghost' }; // dead state → low-emphasis ghost CTA
  const showQ = c.status==='smartmatchd' || c.status==='almostgone';
  const showA = c.attorney && !showQ && c.status!=='dismissed' && c.status!=='reassigned'; // dismissed shows the attorney inside the review wrap; reassigned uses its own wrap
  const kl = keyLineF(c);
  const unfinished = OTR_STATUS[c.status].series === 1;
  const concluded = c.status==='resolved' || c.status==='dismissed' || c.status==='cancelled'; // terminal → archived/inactive surface
  const loadingState = c.status==='analyzing' || c.status==='remarketing';
  const al = cardAlert(c);
  return (
    <div className={`cpc${unfinished ? ' unfinished' : ''}${concluded ? ' concluded' : ''}`}>
      {c.status==='dismissed' && <Confetti />}
      <CPCHeader c={c} />
      {(loadingState || (kl && kl[2]==='case' && !concluded) || showQ || showA || (kl && kl[2]!=='case')) &&
      <div style={{ marginTop:16, display:'flex', flexDirection:'column', gap:8 }}>
        {loadingState ? <SkeletonMatch /> : <>
        {kl && kl[2]==='case' && !concluded && <MetaLine icon={kl[0]}>{kl[1]}</MetaLine>}
        {showQ && <QuoteWrap c={c} />}
        {showA && <AttorneyRow c={c} />}
        {kl && kl[2]!=='case' && <MetaLine icon={kl[0]}>{kl[1]}</MetaLine>}
        </>}
      </div>}
      {(c.balance && c.balance.overdue) ? <GroupedAlert al={al} />
        : c.status==='dismissed' ? <ReviewWrap c={c} />
        : c.status==='resolved' ? <MonitorWrap />
        : c.status==='cancelled' ? <CancelledWrap />
        : c.status==='reassigned' ? <ReassignWrap c={c} />
        : showQ ? null
        : al ? <GroupedAlert al={al} />
        : <BlueCTA a={a || { label:'View case', kind:'ghost' }} />}
    </div>
  );
}

// plain phone frame — status bar only (the F "screen", no app bar / filters)
function FScreen({ children, style = {} }){
  return (
    <div className="otr otr-frame screen" style={style}>
      <div className="otr-statusbar"><span>9:41</span><span className="dots"><i /><i /><i style={{ width:18 }} /></span></div>
      {children}
    </div>
  );
}

Object.assign(window, { GradWord, AttLockup, BlueCTA, fClass, fLabel, keyLineF, CPCConsistent, CPCHeader, FScreen,
  ALERT_TONE, cardAlert, GroupedAlert, TitleBlock });
})();
