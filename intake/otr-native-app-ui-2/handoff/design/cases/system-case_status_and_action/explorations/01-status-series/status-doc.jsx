// status-doc.jsx — Status Handling page · case status badges (lifecycle + action-signal)
// Source of truth = the assembled Cases screen (otr-kit lifeStatus + StatusBadge,
// feed-kit + feed-assembled). Three documentation zones:
//   1) System doc  — the two-layer model, the five lifecycle badges, the
//      collapse map, and the six-tone action-signal system.
//   2) Color pairings — for each lifecycle badge, the SAME status×action-signal
//      pairings shown as a compact list (the collapsed form) AND as a card/tile.
//   3) Use-case cards — the real scenario cards, grouped into series rows.
// NOTE: this page does NOT load feed-kit.jsx, so feed-kit classes (.crow, .seg…)
// are unavailable here — compact rows are built self-contained with inline styles.
/* __IIFE__ */ ;(function(){
const { DCSection, DCArtboard, CASES, StatusBadge, CPCConsistent, CPCHeader,
  GroupedAlert, ALERT_TONE } = window;
const { FeatureIcon: FIa } = window.OffTheRecordDesignSystem_6eff96;

function Iso({ c }){
  return <div className="otr" style={{ padding:'18px 16px', height:'100%' }}><CPCConsistent c={c} /></div>;
}

// ── shared chrome ──────────────────────────────────────────────────────────
function Panel({ children }){
  return <div className="otr" style={{ padding:'34px 32px 38px', height:'100%', background:'#fff' }}>{children}</div>;
}
function Eyebrow({ children }){
  return <div style={{ fontSize:11, fontWeight:800, letterSpacing:1, textTransform:'uppercase', color:'var(--wf-faint)' }}>{children}</div>;
}
function H2({ children }){
  return <h2 style={{ margin:'3px 0 2px', fontSize:23, fontWeight:800, letterSpacing:-.5 }}>{children}</h2>;
}
function Lead({ children }){
  return <p style={{ margin:0, fontSize:13, color:'var(--wf-muted)', maxWidth:560, lineHeight:1.5 }}>{children}</p>;
}
function SectTitle({ k, name, sub }){
  return (
    <div style={{ display:'flex', alignItems:'baseline', gap:8, marginBottom:14, flexWrap:'wrap' }}>
      <span style={{ fontSize:11, fontWeight:800, letterSpacing:.8, textTransform:'uppercase', color:'var(--otr-blue)' }}>{k}</span>
      <span style={{ fontSize:13.5, fontWeight:800, color:'var(--wf-ink)', letterSpacing:-.2 }}>{name}</span>
      {sub && <span style={{ fontSize:11.5, color:'var(--wf-faint)' }}>{sub}</span>}
    </div>
  );
}
function ColHead({ children }){
  return <span style={{ fontSize:10, fontWeight:800, letterSpacing:.7, textTransform:'uppercase', color:'var(--wf-faint)' }}>{children}</span>;
}

// Self-contained compact row (the collapsed card). badge + colored dot + text.
function MiniRow({ badge, tone, text, last }){
  const t = tone ? ALERT_TONE[tone] : null;
  return (
    <div style={{ display:'flex', alignItems:'center', gap:12, padding:'12px 4px',
      borderBottom: last ? 'none' : '1px solid var(--wf-line2)' }}>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ fontSize:13.5, fontWeight:700, color:'var(--wf-ink)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>
          San Diego, CA<span style={{ color:'var(--wf-faint)', fontWeight:600 }}> · Mar 2026</span>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:7, marginTop:4 }}>
          <StatusBadge status={badge} size="sm" noIcon />
          {t && <i style={{ width:7, height:7, borderRadius:'50%', background:t.icon, flex:'none' }} />}
          <span style={{ fontSize:11.5, color: tone ? 'var(--wf-muted)' : 'var(--wf-faint)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{text}</span>
        </div>
      </div>
      <FIa name="chevron-right" size={13} color="var(--wf-faint)" style={{ flex:'none' }} />
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════
// ZONE 1 · SYSTEM DOC
// ════════════════════════════════════════════════════════════════════════

// ── Artboard: the two-layer model + the five lifecycle badges ─────────────
function LifeCell({ status, name, caption }){
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:7, alignItems:'flex-start', width:166 }}>
      <StatusBadge status={status} />
      <div>
        <div style={{ fontSize:12, fontWeight:700, color:'var(--wf-ink)' }}>{name}</div>
        <div style={{ fontSize:11, color:'var(--wf-faint)', fontWeight:600, lineHeight:1.4, marginTop:1 }}>{caption}</div>
      </div>
    </div>
  );
}
function TwoLayer(){
  const Layer = ({ tag, color, title, body }) => (
    <div style={{ flex:1, border:'1px solid var(--wf-line)', borderRadius:14, padding:'15px 16px 16px', background:'#fff' }}>
      <div style={{ display:'flex', alignItems:'center', gap:7, marginBottom:7 }}>
        <span style={{ width:8, height:8, borderRadius:'50%', background:color, flex:'none' }} />
        <span style={{ fontSize:10.5, fontWeight:800, letterSpacing:.7, textTransform:'uppercase', color }}>{tag}</span>
      </div>
      <div style={{ fontSize:14, fontWeight:800, color:'var(--wf-ink)', letterSpacing:-.2, marginBottom:5 }}>{title}</div>
      <div style={{ fontSize:11.5, color:'var(--wf-muted)', lineHeight:1.5 }}>{body}</div>
    </div>
  );
  return (
    <div style={{ display:'flex', gap:14, marginTop:18 }}>
      <Layer tag="Layer 1 • the badge" color="var(--otr-blue)" title="Where the case is"
        body={<>A calm lifecycle marker, one of five long lived states, always light. It changes only a handful of times across a whole case.</>} />
      <Layer tag="Layer 2 • the action signal" color="var(--money)" title="What to do right now"
        body={<>The action signal. All urgency color lives here, not on the badge. It is a six tone block that owns its resolving button.</>} />
    </div>
  );
}
function LifecycleBoard(){
  return (
    <Panel>
      <Eyebrow>The badge rule</Eyebrow>
      <H2>A calm lifecycle badge, a separate action signal</H2>
      <Lead>The badge answers where the case is. A separate action signal answers what to do now. Granular states no longer each own a badge. They collapse into five long lived lifecycle states, and every badge stays light.</Lead>
      <TwoLayer />

      <div style={{ marginTop:30, paddingTop:26, borderTop:'1px solid var(--wf-line2)' }}>
        <SectTitle k="Layer 1" name="The five lifecycle badges" sub="all light • the whole badge vocabulary" />
        <div style={{ display:'flex', flexWrap:'wrap', gap:'22px 0' }}>
          <LifeCell status="incomplete" name="Incomplete" caption="Booking not finished" />
          <LifeCell status="active" name="Active" caption="Matched and in progress, the big tent" />
          <LifeCell status="resolved" name="Resolved" caption="Closed • reduced outcome" />
          <LifeCell status="dismissed" name="Dismissed!" caption="The win, with confetti" />
          <LifeCell status="cancelled" name="Cancelled" caption="Terminal • no blame" />
        </div>
      </div>

      <div style={{ marginTop:24, padding:'15px 16px', borderRadius:14, background:'#faf9ff', border:'1px solid #ece8fb' }}>
        <div style={{ display:'flex', alignItems:'center', gap:9, marginBottom:9, flexWrap:'wrap' }}>
          <StatusBadge status="analyzing" />
          <StatusBadge status="smartmatchd" />
        </div>
        <div style={{ fontSize:11.5, color:'var(--wf-muted)', lineHeight:1.5 }}>
          <span style={{ color:'#5b4bb8' }}>Two short lived SmartMatch badges sit beside the five lifecycle states.</span> While a case is matching it shows SmartMatch'n, and the moment a quote lands it shows SmartMatch'd. Both are brief. The case settles to Active once the quote is accepted. <span style={{ color:'var(--wf-faint)' }}>SmartMatch'd stays a protected sub brand mark.</span>
        </div>
      </div>

      <div style={{ marginTop:24, paddingTop:24, borderTop:'1px solid var(--wf-line)' }}>
        <SectTitle k="What changed" name="No more solid badges" />
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0 30px' }}>
          <div>
            <div style={{ fontSize:11, fontWeight:700, color:'var(--wf-faint)', marginBottom:9 }}>Before • urgency baked into the badge</div>
            <div style={{ display:'flex', flexWrap:'wrap', gap:8, opacity:.5 }}>
              <span className="sbadge solid" style={{ background:'#ef4338', color:'#fff', textDecoration:'line-through' }}>Deadline</span>
              <span className="sbadge solid" style={{ background:'#c2680a', color:'#fff', textDecoration:'line-through' }}>Counter</span>
              <span className="sbadge solid" style={{ background:'#19a558', color:'#fff', textDecoration:'line-through' }}>Dismissed!</span>
            </div>
            <div style={{ fontSize:11, color:'var(--wf-faint)', marginTop:9, lineHeight:1.45 }}>A badge for every micro state, with solid fill for act now. Color competed with the button.</div>
          </div>
          <div>
            <div style={{ fontSize:11, fontWeight:700, color:'var(--otr-blue)', marginBottom:9 }}>Now • the badge stays calm</div>
            <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
              <StatusBadge status="incomplete" size="sm" />
              <StatusBadge status="active" size="sm" />
              <StatusBadge status="dismissed" size="sm" />
            </div>
            <div style={{ fontSize:11, color:'var(--wf-muted)', marginTop:9, lineHeight:1.45 }}>Five light states. Urgency moves to the action signal, so the badge never shouts and the button stays one blue.</div>
          </div>
        </div>
      </div>
    </Panel>
  );
}

// ── Artboard: the collapse map ────────────────────────────────────────────
// Secondary action signal renders as JUST a colored dot — never a pill/badge.
function ToneDot({ tone }){
  const bg = tone ? ALERT_TONE[tone].icon : 'var(--wf-line)';
  return <span style={{ width:8, height:8, borderRadius:'50%', background:bg, flex:'none' }} />;
}
const COLLAPSE = [
  { grp:'Booking', rows:[
    { state:'Incomplete booking',          life:'incomplete', tone:null,      sig:'Progress meter in the card' },
    { state:'Deadline · court near',       life:'incomplete', tone:'error',   sig:'Only N days left to book' },
  ]},
  { grp:'Matching & quote · transient SmartMatch badges', rows:[
    { state:'Matching…',                  life:'analyzing',   tone:null,      sig:'Skeleton loader in card body' },
    { state:"SmartMatch'd · quote ready",  life:'smartmatchd', tone:'match',   sig:'Purple quote block · accept or deny' },
    { state:'Last chance · ~5 min',        life:'active', tone:'error',   sig:'Quote expiring · countdown' },
    { state:'Counter offer',               life:'active', tone:'warning', sig:'Attorney sent a counter · $X' },
    { state:'Quote expired',               life:'active', tone:'inactive',sig:'Your quote has expired' },
    { state:'Re-matching · declined',      life:'active', tone:'match',   sig:'Last quote was declined' },
  ]},
  { grp:'In progress → Active', rows:[
    { state:'Needs LOE',                   life:'active', tone:'warning', sig:'Sign your letter of engagement' },
    { state:'Court date imminent',         life:'active', tone:'warning', sig:"Court in N days — let's prep" },
    { state:'Unread updates',              life:'active', tone:'info',    sig:'N unread messages' },
    { state:'Payment overdue',             life:'active', tone:'error',   sig:'Payment overdue · $X (outranks all)' },
    { state:'Refund issued',               life:'active', tone:'success', sig:'Money-back issued · $X' },
    { state:'Reassigned attorney',         life:'active', tone:'match',   sig:'Re-confirm your new match' },
  ]},
  { grp:'Concluded', rows:[
    { state:'Resolved · reduced',          life:'resolved',  tone:null,      sig:'Forward-looking record CTA' },
    { state:'Dismissed! · the win',        life:'dismissed', tone:'success', sig:'Review your attorney · confetti' },
    { state:'Cancelled',                   life:'cancelled', tone:null,      sig:'No-blame · start fresh' },
    { state:'Court missed',                life:'cancelled', tone:'error',   sig:'Potential active warrant risk' },
  ]},
];
const CCOL = '168px 116px 1fr';
function CollapseRow({ r }){
  return (
    <div style={{ display:'grid', gridTemplateColumns:CCOL, gap:14, alignItems:'center', padding:'10px 0', borderBottom:'1px solid var(--wf-line2)' }}>
      <div style={{ fontSize:12.5, fontWeight:700, color:'var(--wf-ink)', lineHeight:1.3 }}>{r.state}</div>
      <div><StatusBadge status={r.life} size="sm" /></div>
      <div style={{ display:'flex', alignItems:'center', gap:10 }}>
        <ToneDot tone={r.tone} />
        <span style={{ fontSize:12, color: r.tone ? 'var(--wf-muted)' : 'var(--wf-faint)', lineHeight:1.3 }}>{r.sig}</span>
      </div>
    </div>
  );
}
function CollapseBoard(){
  return (
    <Panel>
      <Eyebrow>The collapse map</Eyebrow>
      <H2>Every §6.0 state → one badge + one toast</H2>
      <Lead>How the old granular states are expressed now. The left column is the moment; the badge is what shows top-right; the toast is the colored action signal in the card body.</Lead>
      <div style={{ display:'grid', gridTemplateColumns:CCOL, gap:14, marginTop:18, paddingBottom:8, borderBottom:'1px solid var(--wf-line)' }}>
        <ColHead>Case moment</ColHead><ColHead>Badge shown</ColHead><ColHead>Action signal (toast)</ColHead>
      </div>
      {COLLAPSE.map(g => (
        <div key={g.grp} style={{ marginTop:14 }}>
          <div style={{ fontSize:10.5, fontWeight:800, letterSpacing:.6, textTransform:'uppercase', color:'var(--otr-blue)', marginBottom:2 }}>{g.grp}</div>
          {g.rows.map(r => <CollapseRow key={r.state} r={r} />)}
        </div>
      ))}
    </Panel>
  );
}

// ── Artboard: the action-signal tone system + where it surfaces ───────────
const TONES = [
  { tone:'error',    name:'Error • red',     use:'A money problem, like a payment overdue or failed',
    al:{ tone:'error', faIcon:'fa-circle-exclamation', text:'Payment overdue', value:'$109', cta:'Make a payment' } },
  { tone:'warning',  name:'Warning • amber',  use:'Something needs you, sign the letter of engagement, a court date, or a counter offer',
    al:{ tone:'warning', faIcon:'fa-file-signature', text:'Sign your letter of engagement', cta:'Sign & continue' } },
  { tone:'info',     name:'Info • blue',      use:'New information to read, like unread updates',
    al:{ tone:'info', faIcon:'fa-comment-dots', text:'2 unread messages', cta:'View updates' } },
  { tone:'success',  name:'Success • green',  use:'Good news, a refund issued or a review prompt',
    al:{ tone:'success', faIcon:'fa-circle-check', text:'Money-back issued', value:'$149', cta:'View refund' } },
  { tone:'match',    name:'Match • purple',   use:'A SmartMatch moment, a new quote, a rematch, or a reassignment',
    al:{ tone:'match', faIcon:'fa-wand-magic-sparkles', text:'A new attorney is ready for you', cta:'Review new match' } },
  { tone:'inactive', name:'Inactive • gray',  use:'Lapsed, like an expired quote with nothing to act on',
    al:{ tone:'inactive', faIcon:'fa-hourglass-end', text:'Your quote has expired', cta:"Get SmartMatch'd again" } },
];
// One surface = a left descriptor column + its demo, stacked as a row.
function SurfaceRow({ n, title, desc, children, last }){
  return (
    <div style={{ display:'grid', gridTemplateColumns:'186px 1fr', gap:22, alignItems:'flex-start',
      padding:'16px 0', borderBottom: last ? 'none' : '1px solid var(--wf-line2)' }}>
      <div>
        <div style={{ fontSize:12.5, fontWeight:800, color:'var(--wf-ink)' }}>{n} · {title}</div>
        <div style={{ fontSize:11, color:'var(--wf-faint)', marginTop:4, lineHeight:1.45 }}>{desc}</div>
      </div>
      <div style={{ minWidth:0 }}>{children}</div>
    </div>
  );
}
function AlertSystem(){
  return (
    <Panel>
      <Eyebrow>Layer 2 • the action signal</Eyebrow>
      <H2>One action signal, six system tones</H2>
      <Lead>Every card alert uses the same grouped block. The alert and the button that resolves it share one tinted container, so the alert owns its button. Each tone has a fixed meaning, never a one off.</Lead>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'22px 24px', marginTop:22 }}>
        {TONES.map(d => (
          <div key={d.tone}>
            <div style={{ fontSize:13, fontWeight:800, color:'var(--wf-ink)', marginBottom:3 }}>{d.name}</div>
            <p style={{ margin:'0 0 9px', fontSize:11.5, color:'var(--wf-faint)', lineHeight:1.45, minHeight:32 }}>{d.use}</p>
            <GroupedAlert al={d.al} />
          </div>
        ))}
      </div>

      <div style={{ marginTop:30, paddingTop:26, borderTop:'1px solid var(--wf-line)' }}>
        <SectTitle k="Three surfaces" name="Where the action color appears" sub="badge stays light • the signal carries the tone" />
        <SurfaceRow n="1" title="Card signal" desc="The full grouped alert and its resolving button, at the foot of the card.">
          <GroupedAlert al={{ tone:'warning', faIcon:'fa-file-signature', text:'Sign your letter of engagement', cta:'Sign & continue' }} />
        </SurfaceRow>
        <SurfaceRow n="2" title="Dense row dot" desc="In the compact list the tone collapses to a single colored dot before the meta line.">
          <div style={{ border:'1px solid var(--wf-line)', borderRadius:12, padding:'4px 14px' }}>
            <MiniRow badge="active" tone="info" text="2 unread messages" />
            <MiniRow badge="active" tone="error" text="Payment overdue · $109" />
            <MiniRow badge="resolved" tone={null} text="Reduced to non-moving" last />
          </div>
        </SurfaceRow>
        <SurfaceRow n="3" title="Filter chip dot" desc="A filter lights up with the highest-priority tone inside it, so attention is visible before you tap in." last>
          <div style={{ display:'flex', flexWrap:'wrap', gap:7 }}>
            {[['All',null,17],['Incomplete','error',1],['Active','warning',5],['Resolved',null,8],['Cancelled',null,2]].map(([lb,t,n],i) => (
              <span key={lb} className={`otr-chip${i===2?' on':''}${t?' has-alert':''}`} style={{ display:'inline-flex', alignItems:'center', gap:6 }}>
                {t && <i className="chip-alert" style={{ background: ALERT_TONE[t].icon }} />}
                {lb}<i className="chip-num">{n}</i>
              </span>
            ))}
          </div>
        </SurfaceRow>
      </div>
    </Panel>
  );
}

// ════════════════════════════════════════════════════════════════════════
// ZONE 2 · COLOR PAIRINGS — compact list (collapsed) ↔ card/tile
// ════════════════════════════════════════════════════════════════════════
const PAIRINGS = {
  incomplete: { name:'Incomplete', note:'A red lifecycle badge with, at most, a red urgency toast.', rows:[
    { tone:null,    text:'Finish your booking',           al:null },
    { tone:'error', text:'Only 9 days left to book',      al:{ tone:'error', faIcon:'fa-triangle-exclamation', text:'Only 9 days left to book', cta:'Complete booking' } },
    { tone:'error', text:'Potential active warrant risk', al:{ tone:'error', faIcon:'fa-triangle-exclamation', text:'Potential risk for active warrant', cta:'Contact us now' } },
  ]},
  active: { name:'Active', note:'The big tent. A calm blue badge that pairs with the full tone range.', rows:[
    { tone:null,      text:'In progress',                    al:null },
    { tone:'info',    text:'2 unread messages',              al:{ tone:'info', faIcon:'fa-comment-dots', text:'2 unread messages', cta:'View updates' } },
    { tone:'warning', text:'Sign your letter of engagement', al:{ tone:'warning', faIcon:'fa-file-signature', text:'Sign your letter of engagement', cta:'Sign & continue' } },
    { tone:'warning', text:'Counter offer · $189',           al:{ tone:'warning', faIcon:'fa-scale-balanced', text:'Your attorney sent a counter offer', value:'$189', cta:'Review counter offer' } },
    { tone:'match',   text:'Re-matching attorney',           al:{ tone:'match', faIcon:'fa-wand-magic-sparkles', text:'A new attorney is ready for you', cta:'Review new match' } },
    { tone:'error',   text:'Payment overdue · $109',         al:{ tone:'error', faIcon:'fa-circle-exclamation', text:'Payment overdue', value:'$109', cta:'Make a payment' } },
    { tone:'success', text:'Money-back issued · $240',       al:{ tone:'success', faIcon:'fa-circle-check', text:'Money-back issued', value:'$240', cta:'View refund' } },
  ]},
  resolved: { name:'Resolved', note:'A green badge with positive and informational tones, plus an overdue balance.', rows:[
    { tone:null,      text:'Reduced to non-moving',     al:null },
    { tone:'info',    text:'2 unread messages',         al:{ tone:'info', faIcon:'fa-comment-dots', text:'2 unread messages', cta:'View updates' } },
    { tone:'error',   text:'Payment overdue · $109',    al:{ tone:'error', faIcon:'fa-circle-exclamation', text:'Payment overdue', value:'$109', cta:'Make a payment' } },
    { tone:'success', text:'Money-back issued · $240',  al:{ tone:'success', faIcon:'fa-circle-check', text:'Money-back issued', value:'$240', cta:'View refund' } },
  ]},
  dismissed: { name:'Dismissed!', note:'The win, a green badge with confetti, usually a review prompt.', rows:[
    { tone:null,      text:'Charge dismissed',        al:null },
    { tone:'success', text:'Review your attorney',    al:{ tone:'success', faIcon:'fa-star', text:'Review your attorney', cta:'Leave a review' } },
    { tone:'info',    text:'2 unread messages',       al:{ tone:'info', faIcon:'fa-comment-dots', text:'2 unread messages', cta:'View updates' } },
    { tone:'error',   text:'Payment overdue · $89',   al:{ tone:'error', faIcon:'fa-circle-exclamation', text:'Payment overdue', value:'$89', cta:'Make a payment' } },
  ]},
  cancelled: { name:'Cancelled', note:'A gray terminal badge, at most a warrant risk red or an info note.', rows:[
    { tone:null,   text:'Case cancelled',                al:null },
    { tone:'error',text:'Potential active warrant risk', al:{ tone:'error', faIcon:'fa-triangle-exclamation', text:'Potential risk for active warrant', cta:'Contact us now' } },
    { tone:'info', text:'2 unread messages',             al:{ tone:'info', faIcon:'fa-comment-dots', text:'2 unread messages', cta:'View updates' } },
  ]},
};
function PairTile({ badge, al }){
  // Wired through the locked-in CPCHeader (card-kit): a synthetic fixture drives
  // the same identity zone every CPC uses, so the eyebrow/title/badge/classification
  // + court-date treatment here stays in lock-step with the real card. The toast
  // is the wired GroupedAlert. The matrix only supplies the badge + which signal.
  // Court date is unknown until a court of record exists (Incomplete) or the case
  // never reached one (Cancelled); classification is unknown pre-booking too.
  const COURT_BY_BADGE = { incomplete:'Unknown', active:'Mar 30, 2026', resolved:'Nov 12, 2025', dismissed:'Oct 09, 2025', cancelled:'Unknown' };
  const c = { status:badge, city:'San Diego', mon:'Mar', year:'2026',
    cls: badge==='incomplete' ? '—' : 'Infraction', courtDate: COURT_BY_BADGE[badge] || 'Unknown' };
  return (
    <div className="cpc" style={{ padding:13 }}>
      <CPCHeader c={c} />
      {al
        ? <GroupedAlert al={al} />
        : <div className="act ghost full" style={{ marginTop:12, height:44, borderRadius:999 }}>View case</div>}
    </div>
  );
}
const PCOL = '296px 1fr';
function PairingBoard({ badge }){
  const cfg = PAIRINGS[badge];
  return (
    <Panel>
      <Eyebrow>Color pairing</Eyebrow>
      <H2>{cfg.name} with every action signal</H2>
      <Lead>The compact row is the collapsed form of the card. Same lifecycle badge, same action color, at two densities. {cfg.note}</Lead>
      <div style={{ display:'grid', gridTemplateColumns:PCOL, gap:24, marginTop:20, paddingBottom:8, borderBottom:'1px solid var(--wf-line)' }}>
        <ColHead>Compact row • collapsed</ColHead><ColHead>Card • expanded</ColHead>
      </div>
      {cfg.rows.map((p,i) => (
        <div key={i} style={{ display:'grid', gridTemplateColumns:PCOL, gap:24, alignItems:'flex-start',
          padding:'16px 0', borderBottom: i < cfg.rows.length-1 ? '1px solid var(--wf-line2)' : 'none' }}>
          <div><MiniRow badge={badge} tone={p.tone} text={p.text} last /></div>
          <PairTile badge={badge} al={p.al} />
        </div>
      ))}
    </Panel>
  );
}

// ════════════════════════════════════════════════════════════════════════
// ZONE 3 · USE-CASE CARDS — grouped into series rows
// ════════════════════════════════════════════════════════════════════════
const SERIES = [
  { id:'s1', title:'Series 1 • Unfinished business',
    subtitle:'Booking not finished. A gentle nudge on a dotted card.', bg:'#eef2fc',
    cards:[
      ['fa-incomplete','Incomplete • booking unfinished','incomp',300],
      ['fa-deadline','Deadline • booking almost due','deadline',302],
      ['fa-missed','Court missed • warrant risk','missed',288],
    ]},
  { id:'s2', title:'Series 2 • Matching and quote',
    subtitle:'The two short lived SmartMatch badges plus the active quote states. The quote and loader live inside the card.', bg:'#eef2fc',
    cards:[
      ['fa-analyzing','Matching • finding an attorney','analyze',236],
      ['fa-smart',"SmartMatch'd • quote ready",'smart',320],
      ['fa-almost','Last chance • quote expiring','almost',320],
      ['fa-counter','Counter offer','counter',356],
      ['fa-expired','Quote expired','expired',300],
      ['fa-remarket','Rematching attorney','remarket',296],
    ]},
  { id:'s3', title:'Series 3 • Active management',
    subtitle:'Live cases. The badge stays a calm Active and the action signal carries the ask.', bg:'#eef2fc',
    cards:[
      ['fa-active','Active • all on track','active',276],
      ['fa-unread','Unread updates','unread',356],
      ['fa-loe','Needs signature','loe',356],
      ['fa-overdue','Payment overdue','overdue',392],
      ['fa-reassign','Attorney reassigned','reassign',360],
    ]},
  { id:'s4', title:'Series 4 • Concluded',
    subtitle:'Terminal states, calm and forward looking.', bg:'#eef0f3',
    cards:[
      ['fa-resolved','Resolved • charge reduced','resolved',360],
      ['fa-dismissed','Dismissed • the win','dismiss',344],
      ['fa-dismisspay','Dismissed • balance still due','dismissPay',372],
      ['fa-cancelled','Cancelled • no blame','cancelled',300],
    ]},
];

// ════════════════════════════════════════════════════════════════════════
// Split into three independently-mountable boards (one per page):
//   BadgeActionSystem → 01.1 · the two-layer model + tone system
//   ProposedCPC       → 01   · the color pairings (the proposed cards)
//   StatusSeries      → 01.2 · the use-case scenario cards
// ════════════════════════════════════════════════════════════════════════
function BadgeActionSystem(){
  return (
    <DCSection id="ba-system" title="Case Status and Action" eyebrow="System" updated="Updated • Tue Jul 7, 2026"
      subtitle="How every case shows where it is and what to do next. A calm lifecycle badge carries the state and a separate action signal carries the urgency.">
      <DCArtboard id="fa-lifecycle" label="The badge rule" width={620} height={1000} style={{ background:'#fff' }}>
        <LifecycleBoard />
      </DCArtboard>
      <DCArtboard id="fa-alertsys" label="Action signals" width={620} height={1520} style={{ background:'#fff' }}>
        <AlertSystem />
      </DCArtboard>
    </DCSection>
  );
}

function ProposedCPC(){
  return (
    <DCSection id="ba-pairing" title="Case Preview Cards" eyebrow="Component" updated="Updated • Tue Jul 7, 2026"
      subtitle="The case preview card for every lifecycle badge, shown two ways. The compact row is the collapsed form and the card beside it is the expanded form. Same badge, same action color, at two densities.">
      <DCArtboard id="pair-incomplete" label="Incomplete" width={720} height={840} style={{ background:'#fff' }}><PairingBoard badge="incomplete" /></DCArtboard>
      <DCArtboard id="pair-active" label="Active" width={720} height={1840} style={{ background:'#fff' }}><PairingBoard badge="active" /></DCArtboard>
      <DCArtboard id="pair-resolved" label="Resolved" width={720} height={1100} style={{ background:'#fff' }}><PairingBoard badge="resolved" /></DCArtboard>
      <DCArtboard id="pair-dismissed" label="Dismissed" width={720} height={1090} style={{ background:'#fff' }}><PairingBoard badge="dismissed" /></DCArtboard>
      <DCArtboard id="pair-cancelled" label="Cancelled" width={720} height={870} style={{ background:'#fff' }}><PairingBoard badge="cancelled" /></DCArtboard>
    </DCSection>
  );
}

function StatusSeries(){
  return (
    <>
    {SERIES.map((s, i) => (
      <DCSection key={s.id} id={`ba-${s.id}`} title={s.title} subtitle={s.subtitle} eyebrow={i === 0 ? 'Exploration' : undefined} updated={i === 0 ? 'Updated • Tue Jul 7, 2026' : undefined}>
        {s.cards.map(([aid,label,ck,h]) => (
          <DCArtboard key={aid} id={aid} label={label} width={390} height={h} style={{ background:s.bg }}>
            <Iso c={CASES[ck]} />
          </DCArtboard>
        ))}
      </DCSection>
    ))}
    </>
  );
}

Object.assign(window, { BadgeActionSystem, ProposedCPC, StatusSeries });
// Back-compat: StatusDoc still renders the full document.
window.StatusDoc = function(){ return (<><BadgeActionSystem /><ProposedCPC /><StatusSeries /></>); };
})();
