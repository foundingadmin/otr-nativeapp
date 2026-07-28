// review-explorations.jsx — STAKEHOLDER REVIEW SCAFFOLD.
// Pastes the live exploration options (kept canonical in /explorations) to the
// right of the annotated Single Case Details screen, grouped by zone so a
// reviewer can compare A vs B against the real screen in one view.
// Self-contained: reuses the window components this page already loads and
// re-declares only the option-local pieces that the exploration files kept private.
/* __IIFE__ */ ;(function(){
const { DScreen, TicketHero, Identity, CaseFacts, TabCard, DocList, PaymentHistory, DetailTabs } = window;
const { StatusBadge, badgeStatus, Ticket } = window;
const { FeatureIcon: FI } = window.OffTheRecordDesignSystem_6eff96;

// ── shared fixture (the same Glendale case OTR-48144) ───────────────────────
const ATT = { name:'Helen Vance', firm:'Park & Vance', rating:4.9 };
const CASE = {
  caseId:'OTR-48144', status:'active', cls:'Misdemeanor', photo:'tall',
  place:'Glendale, CA', issued:'Mar 11, 2026', attorney:ATT,
  violations:[
    { label:'Reckless driving', code:'VC 23103', note:'Willful disregard for safety' },
    { label:'Speeding', code:'VC 22349', note:'Over the posted limit' },
  ],
  court:{ name:'Los Angeles Superior, North', addr:'600 E Broadway, Glendale, CA 91206', date:'May 20, 2026', days:70 },
  balance:0,
  documents:[
    { n:'Letter of engagement', t:'Signed', d:'Mar 16, 2026', ic:'file-check' },
    { n:'Citation #G-1183', t:'On file', d:'Mar 11, 2026', ic:'file-document-info-quick-reference' },
  ],
  payments:[{ l:'Legal fee', a:299, d:'Mar 16, 2026', s:'Paid' }],
};

// ── Ticket hero · Option B (ticket UI component) — from hero-studies.jsx ─────
function TicketComponentHero({ rec }){
  return (
    <div className="thero-b">
      <div className="thb-top">
        <span className="thb-cls"><FI name="tag" size={11} color="var(--wf-muted)" />{rec.cls}</span>
        <StatusBadge status={badgeStatus(rec.status)} />
      </div>
      <div className="thb-title">
        <div className="thb-date">Mar 2026</div>
        <div className="thb-loc">{rec.place}</div>
        <div className="thb-court"><FI name="countdown-timer" size={13} color="var(--wf-muted)" />Court date · {rec.court.date}<span className="cd">in {rec.court.days} days</span></div>
      </div>
      <div className="thb-ticket">
        <Ticket variant="slate" cap="TRAFFIC CITATION"
          fields={[['Issued','Mar 11, 2026'],['Location','Glendale, CA'],['Citation','#G-1183']]}
          violations={[{ v:'Reckless driving', note:'VC 23103' },{ v:'Speeding', note:'VC 22349' }]}
          flags={['2 counts']} />
      </div>
    </div>
  );
}

// ── Case record · Option A (stacked cards) — from record-studies.jsx ────────
function StackedRecord({ rec }){
  return (
    <div style={{ paddingBottom:14 }}>
      <CaseFacts rec={rec} completionPrompts={false} />
      <TabCard ic="files-and-folders" title="Documents"><DocList rec={rec} /></TabCard>
      <TabCard ic="bill-dollar-2" title="Payments"><PaymentHistory rec={rec} /></TabCard>
    </div>
  );
}

// ── Timeline options — from timeline-lab.jsx ────────────────────────────────
const TL_TONE = {
  info:    { bg:'var(--blue-50)',  line:'var(--blue-200)',  ic:'var(--blue-600)' },
  neutral: { bg:'#eef0f4',         line:'#dfe3ea',          ic:'#7b8595' },
};
const toneOf = (e) => TL_TONE[e.tone] || TL_TONE.neutral;

function LabTimeline({ items }){
  const rows = items.filter(x => !x.phaseHead);
  let ri = -1;
  return (
    <div className="tline tll-tline">
      {items.map((e,i) => {
        if (e.phaseHead) return (
          <div key={'ph'+i} className="tll-phase"><span>{e.phaseHead}</span></div>
        );
        ri++;
        const last = ri === rows.length - 1;
        const state = e.future ? 'future' : e.current ? 'current' : 'done';
        const tn = toneOf(e);
        const dot = state === 'future' ? { background:'#fff', borderColor:'#cfd6e2', borderStyle:'dashed' } :
          state === 'done' ? { background:'#f1f3f7', borderColor:'#e4e8ee' } :
          { background:tn.bg, borderColor:tn.line };
        return (
          <div key={i} className={`tl-row ${state}`}>
            <div className="tl-spine">
              <div className="tl-dot" style={dot}>
                {state==='done' && <FI name="check-thick" size={12} color="#aab2bf" />}
                {state==='current' && <span className="tl-pulse" style={{ background:tn.ic }} />}
              </div>
              {!last && <div className="tl-line" />}
            </div>
            <div className="tl-main">
              <div className="tl-t">{e.t}</div>
              <div className="tl-b">{e.b}</div>
            </div>
            <div className="tl-d">{e.d}</div>
          </div>
        );
      })}
    </div>
  );
}

function TLSurface({ children }){
  return <div className="tll-surface"><div className="tlbare">{children}</div></div>;
}

const STAGES = [
  { t:'Intake',         b:'Ticket submitted',                       d:'Done' },
  { t:'Matching',       b:'Attorney SmartMatch’d',                  d:'Done' },
  { t:'Representation', b:'Engagement signed and filed',            d:'Done' },
  { t:'Court',          b:'Hearing May 20; Helen appears for you',  d:'Active', current:true, tone:'info' },
  { t:'Outcome',        b:'Result pending',                         d:'TBD', future:true },
];
const EV = {
  added:     { t:'Ticket added',           b:'You uploaded your citation' },
  submitted: { t:'Case submitted',         b:'Citation and details confirmed' },
  matched:   { t:'Attorney SmartMatch’d',  b:'Quote ready for your review' },
  accepted:  { t:'Representation accepted', b:'You accepted the quote, attorney revealed' },
  signed:    { t:'Engagement signed',      b:'You accepted representation' },
  filed:     { t:'Case filed with court',  b:'LA Superior, North' },
  courtDate: { t:'Court date',             b:'Helen appears for you; you don’t attend' },
};
const ev = (k, over) => ({ ...EV[k], ...(over||{}) });
const GRANULAR = [
  { phaseHead:'Intake' },
  ev('added',     { d:'Mar 11' }),
  ev('submitted', { d:'Mar 12' }),
  { phaseHead:'Matching' },
  ev('matched',   { d:'Mar 13' }),
  { phaseHead:'Representation' },
  ev('accepted',  { d:'Mar 14' }),
  ev('signed',    { d:'Mar 16' }),
  ev('filed',     { d:'Mar 22' }),
  { phaseHead:'Court' },
  ev('courtDate', { d:'May 20', current:true, tone:'info' }),
  { phaseHead:'Outcome' },
  { t:'Case outcome', b:'Your result will appear here', d:'TBD', future:true },
];

// ── option card + group scaffolding ─────────────────────────────────────────
function Opt({ label, flush=false, children }){
  return (
    <div className="exp-col">
      <div className="exp-opt-label">{label}</div>
      <div className={`exp-card${flush ? ' flush' : ''}`}>{children}</div>
    </div>
  );
}
function Group({ title, children }){
  return (
    <div className="exp-group">
      <div className="exp-group-title">{title}</div>
      <div className="exp-cols">{children}</div>
    </div>
  );
}

function ExplorationReviewPanel(){
  return (
    <div className="exp-panel">
      <Group title="Ticket hero exploration">
        <Opt label="Option A" flush>
          <TicketHero rec={CASE} /><Identity rec={CASE} />
        </Opt>
        <Opt label="Option B" flush>
          <TicketComponentHero rec={CASE} /><Identity rec={CASE} />
        </Opt>
      </Group>

      <Group title="Case record exploration">
        <Opt label="Option A · stacked cards">
          <StackedRecord rec={CASE} />
        </Opt>
        <Opt label="Option B · tabbed sections" flush>
          <DetailTabs rec={CASE} />
        </Opt>
      </Group>
    </div>
  );
}

// ── CSS ─────────────────────────────────────────────────────────────────────
if (typeof document !== 'undefined' && !document.getElementById('review-explorations-css')) {
  const s = document.createElement('style');
  s.id = 'review-explorations-css';
  s.textContent = `
  .exp-panel{ display:flex; flex-direction:column; gap:40px; width:812px; flex:none;
    font-family:'Figtree',var(--font-sans),sans-serif; }
  .exp-group-title{ font-size:26px; font-weight:800; letter-spacing:-.3px; color:#ff2d78;
    text-shadow:-1.5px -1.5px 0 #fff,1.5px -1.5px 0 #fff,-1.5px 1.5px 0 #fff,1.5px 1.5px 0 #fff,0 2px 5px rgba(0,0,0,.12);
    margin-bottom:14px; }
  .exp-cols{ display:flex; gap:32px; align-items:flex-start; }
  .exp-col{ flex:1; min-width:0; }
  .exp-opt-label{ font-size:15px; font-weight:800; color:#ff2d78;
    text-shadow:-1px -1px 0 #fff,1px -1px 0 #fff,-1px 1px 0 #fff,1px 1px 0 #fff; margin-bottom:9px; }
  .exp-card{ background:var(--wf-bg); border:1px solid var(--wf-line); border-radius:18px;
    box-shadow:0 2px 10px rgba(16,24,40,.06); overflow:hidden; }
  .exp-card.flush{ padding:0; }
  .exp-card:not(.flush){ padding:14px; }

  /* Ticket hero · Option B (ticket-component hero) */
  .thero-b{ background:#f4f6fa; border-bottom:1px solid var(--wf-line2); padding:14px 16px 30px; }
  .thero-b .thb-top{ display:flex; align-items:center; justify-content:space-between; gap:8px; }
  .thero-b .thb-cls{ display:inline-flex; align-items:center; gap:4px; font-size:10.5px; font-weight:700;
    letter-spacing:.4px; text-transform:uppercase; color:var(--wf-muted); background:#fff;
    border:1px solid var(--wf-line2); border-radius:6px; padding:3px 8px; }
  .thero-b .thb-title{ margin-top:12px; }
  .thero-b .thb-date{ font-size:12px; font-weight:700; letter-spacing:.3px; color:var(--wf-faint); }
  .thero-b .thb-loc{ font-size:21px; font-weight:800; letter-spacing:-.4px; color:var(--wf-ink); line-height:1.15; margin-top:2px; }
  .thero-b .thb-court{ display:flex; align-items:center; gap:7px; margin-top:6px; font-size:12px; font-weight:600; color:var(--wf-muted); }
  .thero-b .thb-court .cd{ font-weight:700; color:var(--wf-strong); background:var(--wf-fill); border-radius:999px; padding:1px 8px; font-size:11px; }
  .thero-b .thb-ticket{ margin-top:18px; display:flex; justify-content:center; padding:0 4px; }
  .thero-b .thb-ticket .tkt{ width:100%; max-width:300px; }

  /* Timeline surface (mirrors the timeline lab) */
  .tll-surface{ background:#fff; border:1px solid var(--wf-line); border-radius:16px; overflow:hidden; }
  .tll-surface .tlbare{ margin:0; padding:16px 18px; }
  .tll-surface .tll-tline{ padding:0; }
  .tll-phase{ display:flex; align-items:center; gap:9px; margin:2px 0 8px; padding-left:36px; }
  .tll-phase:first-child{ margin-top:0; }
  .tll-phase span{ font-size:9.5px; font-weight:800; letter-spacing:1.2px; text-transform:uppercase; color:var(--wf-faint); }
  .tll-phase::after{ content:''; flex:1; height:1px; background:var(--wf-line2); }
  `;
  document.head.appendChild(s);
}

window.ExplorationReviewPanel = ExplorationReviewPanel;
})();
