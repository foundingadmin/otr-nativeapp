// status-reps.jsx — ONE consistent case (Glendale reckless-driving ticket,
// attorney Helen Vance / Park & Vance, case OTR-48144) shown through every
// lifecycle status. Reuses the locked-in detail pattern (window.FullDetail):
// status badge = lifecycle · action item = the lift · promoted timeline ·
// tabbed record (Overview / Documents / Payments).
/* __IIFE__ */ ;(function(){
const { DCSection, DCArtboard, DCPostIt, FullDetail, CPCConsistent } = window;

const v = (label, code, note) => ({ label, code, note });
const ATT = { name:'Helen Vance', firm:'Park & Vance', rating:4.9 };
const VIOLS = [
  v('Reckless driving','VC 23103','Willful disregard for safety'),
  v('Speeding','VC 22349','Over the posted limit'),
];
const court = (date, days, past) => ({ name:'Los Angeles Superior — North',
  addr:'600 E Broadway, Glendale, CA 91206', date, days, past });
const CITE = { n:'Citation #G-1183', t:'On file', d:'Mar 11, 2026', ic:'file-document-info-quick-reference' };
const LOE_SIGNED = { n:'Letter of engagement', t:'Signed', d:'Mar 16, 2026', ic:'file-check' };

// shared identity for the one case
const BASE = {
  caseId:'OTR-48144', cls:'Misdemeanor', photo:'tall',
  place:'Glendale, CA', issued:'Mar 11, 2026', title:'Ticket issued in Glendale — Mar 2026',
  violations:VIOLS, court:court('May 20, 2026', 70), balance:0, documents:[CITE], payments:[],
};

// timeline milestones reused across post-active states
const ML = {
  assigned: { t:'Attorney assigned', b:'Helen Vance · Park & Vance', d:'Mar 14', ic:'user-square-single', done:true },
  signed:   { t:'Engagement signed', b:'You accepted representation', d:'Mar 16', ic:'file-check', done:true },
  filed:    { t:'Case filed with court', b:'LA Superior — North', d:'Mar 22', ic:'building-1', done:true },
};

const REPS = [
  // ── pre-representation ──────────────────────────────────────────────────
  { key:'incomplete', label:'Incomplete • not booked', sub:'Details missing — drive completion + booking. No attorney yet.',
    rec:{ ...BASE, status:'incomplete', cls:null, attorney:null, court:null, violations:[], booking:true, documents:[CITE],
      reassure:{ t:'Book now to be SmartMatch’d with an attorney', ic:'user-square-single', cta:'Get instant quote',
        b:'Add a few details and get an instant quote — we’ll SmartMatch you with a local traffic attorney who can fight this ticket.' },
      timeline:[
        { t:'Ticket added', b:'You uploaded your citation', d:'Mar 11', ic:'open-folder', current:true },
        { t:'Get SmartMatch’d', b:'Book to be SmartMatch’d with an attorney', d:'—', ic:'user-square-single', future:true },
      ] } },

  { key:'analyzing', label:'SmartMatching', sub:'Booked — finding the best-fit local attorney. No attorney revealed.',
    rec:{ ...BASE, status:'analyzing', attorney:null, documents:[CITE],
      payments:[{ l:'Legal fee', a:0, d:'Quoted', s:'Due on SmartMatch', q:299 }],
      reassure:{ t:'Finding your best-fit attorney', ic:'triangle-arrow-synchronize-1',
        b:'We’re SmartMatching you with a local traffic attorney who handles cases like yours. This usually takes a moment.' },
      timeline:[
        { t:'Case submitted', b:'Citation uploaded · details confirmed', d:'Mar 12', ic:'open-folder', done:true },
        { t:'Finding your attorney', b:'SmartMatching you with a local pro', d:'Now', ic:'triangle-arrow-synchronize-1', current:true },
        { t:'Attorney assigned', b:'We’ll introduce you', d:'—', ic:'user-square-single', future:true },
      ] } },

  { key:'smartmatchd', label:'SmartMatch’d • quote ready', sub:'Helen SmartMatch’d (pre-acceptance, blurred) — review the instant quote.',
    rec:{ ...BASE, status:'smartmatchd', attorney:{ ...ATT, blurred:true }, documents:[CITE],
      payments:[{ l:'Instant quote', a:0, d:'Ready', s:'Due on acceptance', q:299 }],
      actions:[{ sev:'info', kind:'quote', when:'Quote ready', title:'Review your instant quote',
        body:'A top-rated local attorney is ready to take your case for $299. Accept to reveal your attorney and begin.' }],
      timeline:[
        { t:'Case submitted', b:'Citation uploaded', d:'Mar 12', ic:'open-folder', done:true },
        { t:'Attorney SmartMatch’d', b:'Quote ready — your review needed', d:'Now', ic:'check-thick', current:true, tone:'info' },
        { t:'Representation begins', b:'Accept to reveal & start', d:'—', ic:'open-folder', future:true },
      ] } },

  { key:'counter', label:'Counter offer', sub:'Active case — Helen proposed adjusted terms. Badge stays Active; the action does the lift.',
    rec:{ ...BASE, status:'counter', attorney:ATT,
      documents:[{ n:'Counter offer terms', t:'New', d:'Mar 18, 2026', ic:'file-report', pending:true }, CITE],
      payments:[{ l:'Original quote', a:299, d:'Mar 14, 2026', s:'Superseded' }],
      actions:[{ sev:'warning', kind:'counter', when:'Expires in 2 days', title:'Review your counter offer',
        body:'Helen proposed $349 (was $299). See what changed before you accept or decline.' }],
      timeline:[
        ML.assigned,
        { t:'Counter offer received', b:'Adjusted terms proposed — your review needed', d:'Mar 18', ic:'scale-balanced', current:true, tone:'warning' },
        { t:'Court date', b:'Helen appears on your behalf', d:'May 20', ic:'gavel', future:true },
      ] } },

  { key:'loe', label:'Needs signature', sub:'Active case — sign the letter of engagement to begin.',
    rec:{ ...BASE, status:'active-action', attorney:ATT,
      documents:[{ n:'Letter of engagement', t:'Awaiting signature', d:'Mar 14, 2026', ic:'file-edit', pending:true }, CITE],
      payments:[{ l:'Legal fee', a:0, d:'Quoted', s:'Due on signing', q:299 }],
      actions:[{ sev:'warning', kind:'loe', title:'Accept representation to proceed',
        body:'Sign your letter of engagement so Helen can act on your behalf.' }],
      timeline:[
        { t:'Attorney proposed', b:'Helen Vance · Park & Vance', d:'Mar 14', ic:'user-square-single', done:true },
        { t:'Awaiting your signature', b:'Accept the letter of engagement', d:'Now', ic:'file-edit', current:true, tone:'warning' },
        { t:'Case becomes active', b:'Helen files & prepares your defense', d:'—', ic:'open-folder', future:true },
      ] } },

  // ── representation (Helen on the case) ──────────────────────────────────
  { key:'active', label:'Active', sub:'The calm baseline — Helen is preparing your defense. No action needed.',
    rec:{ ...BASE, status:'active', attorney:ATT,
      documents:[LOE_SIGNED, CITE], payments:[{ l:'Legal fee', a:299, d:'Mar 16, 2026', s:'Paid' }],
      timeline:[
        ML.assigned, ML.signed, ML.filed,
        { t:'Court date', b:'Helen appears for you — you don’t attend', d:'May 20', ic:'gavel', future:true },
      ] } },

  { key:'unread', label:'Active • unread update', sub:'A new message from Helen — surfaced as a calm info action.',
    rec:{ ...BASE, status:'active', attorney:ATT, unread:2,
      documents:[LOE_SIGNED, CITE], payments:[{ l:'Legal fee', a:299, d:'Mar 16, 2026', s:'Paid' }],
      actions:[{ sev:'info', kind:'update', when:'2 new', title:'New updates from Helen',
        body:'You have 2 unread messages about your case.' }],
      timeline:[
        ML.assigned, ML.signed, ML.filed,
        { t:'Court date', b:'Helen appears for you — you don’t attend', d:'May 20', ic:'gavel', future:true },
      ] } },

  { key:'deadline', label:'Court date imminent', sub:'Active — hearing in days. The attorney appears for you; a calm prep nudge.',
    rec:{ ...BASE, status:'active', attorney:ATT, court:court('Apr 02, 2026', 6),
      documents:[LOE_SIGNED, CITE], payments:[{ l:'Legal fee', a:299, d:'Mar 16, 2026', s:'Paid' }],
      actions:[{ sev:'info', kind:'prep', when:'Court in 6 days', title:'Your court date is almost here',
        body:'Helen appears for you on Apr 2 — you don’t need to attend. Review what to expect.' }],
      timeline:[
        ML.assigned, ML.signed, ML.filed,
        { t:'Court date', b:'Helen appears for you on Apr 2', d:'Apr 02', ic:'gavel', current:true, tone:'info' },
      ] } },

  { key:'overdue', label:'Past due payment', sub:'Active — payment overdue; case at risk. Account rail + critical action.',
    rec:{ ...BASE, status:'active', attorney:ATT, balance:109,
      accountRail:{ sev:'critical', text:'A payment of $109 is past due on this case.', cta:'Pay now' },
      documents:[LOE_SIGNED, { n:'Invoice #4421', t:'Past due', d:'Apr 02, 2026', ic:'bill-dollar-2', pending:true }],
      payments:[{ l:'Retainer', a:150, d:'Mar 16, 2026', s:'Paid' }, { l:'Court filing fee', a:109, d:'Apr 02, 2026', s:'Past due', overdue:true }],
      actions:[{ sev:'critical', kind:'pay', when:'5 days overdue', title:'Make a payment to avoid cancellation',
        body:'Balance of $109 is past due. Pay now to keep Helen on your case.', amount:109 }],
      timeline:[
        ML.assigned,
        { t:'Payment past due', b:'Invoice #4421 · $109', d:'Apr 02', ic:'bill-dollar-2', current:true, sev:'critical' },
        { t:'Court date', b:'At risk if balance not cleared', d:'May 20', ic:'gavel', future:true },
      ] } },

  { key:'disputed', label:'Payment disputed', sub:'Active — a chargeback is open; routed to OTR support, not the attorney.',
    rec:{ ...BASE, status:'active', attorney:ATT,
      accountRail:{ sev:'critical', text:'A payment dispute is open on this case.', cta:'Start a live chat' },
      documents:[LOE_SIGNED, { n:'Receipt #8841', t:'Disputed', d:'Mar 16, 2026', ic:'bill-dollar-2', pending:true }],
      payments:[{ l:'Legal fee', a:299, d:'Mar 16, 2026', s:'Disputed', overdue:true }],
      actions:[{ sev:'critical', kind:'dispute', title:'Resolve the payment dispute',
        body:'A dispute was opened on your $299 payment. Start a live chat with OTR support to resolve it.' }],
      timeline:[
        ML.assigned, ML.signed,
        { t:'Payment disputed', b:'Chargeback opened · $299', d:'Apr 01', ic:'warning-octagon', current:true, sev:'critical' },
      ] } },

  // ── terminal ────────────────────────────────────────────────────────────
  { key:'dismissed', label:'Resolved • dismissed', sub:'The win — charge thrown out. Celebration + review.',
    rec:{ ...BASE, status:'dismissed', attorney:ATT, court:court('May 20, 2026', null, true),
      celebrate:{ t:'🎉 Your ticket was dismissed', s:'No points, no fine. Helen got the charge thrown out.' }, review:true,
      documents:[{ n:'Dismissal confirmation', t:'Final', d:'May 21, 2026', ic:'file-check' }, LOE_SIGNED, { n:'Receipt #8841', t:'Paid', d:'Mar 16, 2026', ic:'bill-dollar-2' }],
      payments:[{ l:'Legal fee', a:299, d:'Mar 16, 2026', s:'Paid' }], outcome:{ saved:480, points:2 },
      timeline:[
        ML.assigned,
        { t:'Appeared in court', b:'Helen represented you', d:'May 20', ic:'gavel', done:true },
        { t:'Charge dismissed', b:'No points, no fine', d:'May 21', ic:'folder-star-favorite', done:true, sev:'success' },
      ] } },

  { key:'resolved', label:'Resolved • reduced', sub:'Neutral close — charge reduced, no celebration. Routed to a review.',
    rec:{ ...BASE, status:'resolved', attorney:ATT, court:court('May 20, 2026', null, true),
      documents:[{ n:'Court outcome', t:'Final', d:'May 21, 2026', ic:'file-check' }, LOE_SIGNED, { n:'Receipt #8841', t:'Paid', d:'Mar 16, 2026', ic:'bill-dollar-2' }],
      payments:[{ l:'Legal fee', a:299, d:'Mar 16, 2026', s:'Paid' }], outcome:{ result:'Reduced to non-moving', saved:240, points:1 },
      actions:[{ sev:'success', kind:'review', title:'How was working with Helen?',
        body:'Your case is closed. A quick review helps the next driver find the right attorney.' }],
      timeline:[
        ML.assigned,
        { t:'Appeared in court', b:'Helen represented you', d:'May 20', ic:'gavel', done:true },
        { t:'Charge reduced', b:'Reduced to a non-moving violation', d:'May 21', ic:'folder-check', done:true, tone:'success' },
      ] } },

  { key:'cancelled', label:'Cancelled', sub:'Case closed — read-only archive; records remain available.',
    rec:{ ...BASE, status:'cancelled', attorney:null, documents:[CITE], payments:[],
      reassure:{ t:'This case was cancelled', ic:'folder-remove',
        b:'Your case is no longer active. Your records remain available below if you need them.' },
      timeline:[
        { t:'Case submitted', b:'Citation uploaded', d:'Mar 12', ic:'open-folder', done:true },
        { t:'Case cancelled', b:'This case was closed', d:'Apr 03', ic:'folder-remove', done:true },
      ] } },
];

// heights measured to the Overview (tallest) tab — timeline zone parked (DR-CD-003)
const SH = {
  incomplete:941, analyzing:1111, smartmatchd:1382, counter:1382, loe:1500, active:1188,
  unread:1365, deadline:1382, overdue:1477, disputed:1382, dismissed:1317, resolved:1373, cancelled:1116,
};

// Build the matching Case Preview Card for a status rep — the SAME Glendale
// case (OTR-48144 · Helen Vance), shaped to the canonical CPC fixture model
// (CASES shape) and rendered through the locked-in window.CPCConsistent
// component (card-kit.jsx) so the preview card stays in lock-step with the
// rest of the project — any future component-level update flows through here.
function repToCpc(r){
  const rec = r.rec;
  const att = rec.attorney;
  const c = {
    city:'Glendale', mon:'Mar', year:'2026', caseId:'OTR-48144',
    cls: rec.cls || 'Misdemeanor', violation:'Reckless driving · VC 23103', more:1,
    firm: att ? att.firm : '—', courtCity:'LA Superior — North',
    courtDate: (rec.court && rec.court.date) ? rec.court.date : 'Unknown',
    status: rec.status,
    attorney: att ? { name:att.name, rating:att.rating, blurred:att.blurred } : null,
  };
  switch (r.key){
    case 'incomplete':  Object.assign(c, { cls:'—', violation:'Not provided', more:0, firm:'—', complete:40, courtDate:'Unknown' }); break;
    case 'analyzing':   c.firm='—'; break;
    case 'smartmatchd': c.quote={ amount:299, expires:'23m 50s' }; break;
    case 'counter':     c.counter={ from:299, to:349 }; break;
    case 'loe':         c.action='loe'; break;
    case 'unread':      c.unread=2; break;
    case 'deadline':    c.courtSoon=6; break;
    case 'overdue':     c.balance={ amount:109, overdue:true }; break;
    case 'disputed':    c.disputed=true; break;
    case 'dismissed':   c.outcome={ result:'Charge dismissed', saved:480, points:2 }; break;
    case 'resolved':    c.outcome={ result:'Reduced to non-moving', saved:240, points:1 }; break;
    default: break; // active, cancelled use the defaults
  }
  return c;
}
const CPC_PAD = 372; // extra artboard height for the stacked preview card + arrow + gaps

if (typeof document !== 'undefined' && !document.getElementById('status-reps-css')) {
  const s = document.createElement('style');
  s.id = 'status-reps-css';
  s.textContent = `
  .cpc-stack{ display:flex; flex-direction:column; align-items:center; gap:18px; }
  .cpc-stack > .cpc{ width:390px; }
  /* connector: signals tapping the card lands on the detail page below */
  .cpc-arrow{ display:flex; flex-direction:column; align-items:center; gap:0; }
  .cpc-arrow .stem{ width:2px; height:18px; background:var(--wf-line); border-radius:2px; }
  .cpc-arrow .head{ width:10px; height:10px; border-right:2.5px solid var(--wf-faint);
    border-bottom:2.5px solid var(--wf-faint); transform:rotate(45deg); margin-top:-6px; }
  `;
  document.head.appendChild(s);
}

function StatusCoverage(){
  return (
      <DCSection id="case-statuses" title="Status coverage · one case, every status" eyebrow="Exploration" updated="Updated • Fri Jul 10, 2026"
        subtitle="The same case shown through every lifecycle status, from pre representation to active, the interrupts, and the terminal states. Each preview card sits above the detail screen it opens. The attorney stays hidden until representation is real, then Helen is consistent throughout.">
        {REPS.map(r => (
          <DCArtboard key={r.key} id={r.key} label={r.label} width={390} height={(SH[r.key] || 1600) + CPC_PAD}>
            <div className="cpc-stack">
              <CPCConsistent c={repToCpc(r)} />
              <div className="cpc-arrow"><span className="stem" /><span className="head" /></div>
              <FullDetail rec={r.rec} height={SH[r.key] || 1600} />
            </div>
          </DCArtboard>
        ))}
      </DCSection>
  );
}

window.StatusCoverage = StatusCoverage;
window.STATUS_REPS = REPS;
window.STATUS_H = SH;
})();
