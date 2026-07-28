// hero-studies.jsx. Two exploration rows for the Case Details hero.
// Row 1: how we surface the ticket in the hero (uploaded photo vs the ticket
//        UI component). Row 2: how the attorney card integrates into the hero,
//        each option carried across the full lifecycle of attorney states.
/* __IIFE__ */ ;(function(){
const { DCSection, DCArtboard } = window;
const { DScreen, TicketHero, Identity, AttPhoto } = window;
const { StatusBadge, badgeStatus, Stars, Ticket } = window;
const { FeatureIcon: FI } = window.OffTheRecordDesignSystem_6eff96;

// one shared case for the hero rows
const ATT = { name:'Helen Vance', firm:'Park & Vance', rating:4.9 };
const CASE = {
  caseId:'OTR-48144', status:'active', cls:'Misdemeanor', photo:'tall',
  place:'Glendale, CA', issued:'Mar 11, 2026', attorney:ATT,
  violations:[
    { label:'Reckless driving', code:'VC 23103', note:'Willful disregard for safety' },
    { label:'Speeding', code:'VC 22349', note:'Over the posted limit' },
  ],
  court:{ name:'Los Angeles Superior, North', addr:'600 E Broadway, Glendale, CA 91206', date:'May 20, 2026', days:70 },
  balance:0, documents:[], payments:[],
};

// ── Row 1 · Option B: a hero that leads with the ticket UI component ─────────
// (scalloped edges, state color) instead of an uploaded photo.
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

function TicketHeroStudies(){
  return (
    <DCSection id="hero-ticket" title="Ticket display in the hero" eyebrow="Exploration"
      updated="Started today • Tue Jul 7, 2026"
      subtitle="How we surface the ticket at the top of the case details page. A leads with a photo of the uploaded citation, the way we had it before. B leads with the ticket UI component built in this workstream, with its scalloped edge and state color, so the citation reads as a structured record rather than a snapshot.">
      <DCArtboard id="ticket-photo" label="A · Photo of the uploaded ticket" width={392} height={382}>
        <DScreen rec={CASE}>
          <TicketHero rec={CASE} />
          <Identity rec={CASE} />
        </DScreen>
      </DCArtboard>
      <DCArtboard id="ticket-component" label="B · Ticket UI component (scalloped, state color)" width={392} height={560}>
        <DScreen rec={CASE}>
          <TicketComponentHero rec={CASE} />
          <Identity rec={CASE} />
        </DScreen>
      </DCArtboard>
    </DCSection>
  );
}

// ── Row 2 · attorney card integration into the hero ─────────────────────────
// The full range of states the attorney block passes through in a case.
const STATES = [
  { key:'incomplete',  label:'Not booked · no attorney yet',
    rec:{ status:'incomplete', attorney:null } },
  { key:'analyzing',   label:'SmartMatching · finding the attorney',
    rec:{ status:'analyzing', attorney:null } },
  { key:'smartmatchd', label:'SmartMatch’d · pre-acceptance (blurred)',
    rec:{ status:'smartmatchd', attorney:{ ...ATT, blurred:true } } },
  { key:'active',      label:'Active · attorney revealed',
    rec:{ status:'active', attorney:ATT } },
  { key:'remarketing', label:'Re-SmartMatching · firm unavailable',
    rec:{ status:'remarketing', attorney:null,
      reassure:{ t:'Finding you a new law firm', b:'Your initial firm was unavailable.', ic:'triangle-arrow-synchronize-1' } } },
];

// the attorney block inner content, shared by both integrations
function attInner(rec){
  if (rec.status === 'analyzing') return (
    <>
      <div className="sk" style={{ width:44, height:44, borderRadius:12, flex:'none' }} />
      <div style={{ flex:1, minWidth:0 }}>
        <div className="sk" style={{ width:'58%', height:12, borderRadius:6 }} />
        <div className="sk" style={{ width:'34%', height:10, borderRadius:6, marginTop:8 }} />
      </div>
    </>
  );
  if (rec.status === 'incomplete') return (
    <>
      <div className="mh-att-ic"><FI name="user-square-single" size={20} color="#aeb6c6" /></div>
      <div style={{ flex:1, minWidth:0 }}>
        <div className="mh-att-t">Your SmartMatch’d attorney</div>
        <div className="mh-att-s">Appears here once you book.</div>
      </div>
    </>
  );
  if (!rec.attorney && rec.reassure) return (
    <>
      <div className="mh-att-ic" style={{ background:'#efeafe' }}><FI name={rec.reassure.ic} size={20} color="#6a5bd0" /></div>
      <div style={{ flex:1, minWidth:0 }}>
        <div className="mh-att-t">{rec.reassure.t}</div>
        <div className="mh-att-s">{rec.reassure.b}</div>
      </div>
    </>
  );
  const a = rec.attorney;
  return (
    <>
      <AttPhoto rec={rec} size={44} />
      <div style={{ flex:1, minWidth:0 }}>
        <div className="mh-att-t">{a.blurred ? 'Your matched attorney' : a.name}</div>
        <div className="mh-att-firm">{a.rating && !a.blurred && <Stars rating={a.rating} size={11} />}<span className="fn">{a.blurred ? 'Revealed when you accept' : a.firm}</span></div>
      </div>
    </>
  );
}

function MiniHero({ rec, integration }){
  return (
    <div className="mh">
      <div className="mh-hero">
        <div className="mh-scrim" />
        <div className="mh-top">
          <span className="mh-cls">Misdemeanor</span>
          <StatusBadge status={badgeStatus(rec.status)} size="sm" />
        </div>
        <div className="mh-loc">Glendale, CA</div>
      </div>
      <div className={`mh-att ${integration}`}>{attInner(rec)}</div>
    </div>
  );
}

function AttorneyOption({ integration }){
  return (
    <div className="attopt">
      {STATES.map(s => (
        <div className="attopt-cell" key={s.key}>
          <div className="attopt-label">{s.label}</div>
          <MiniHero rec={s.rec} integration={integration} />
        </div>
      ))}
    </div>
  );
}

function AttorneyHeroStudies(){
  return (
    <DCSection id="hero-attorney" title="Attorney card in the hero" eyebrow="Exploration"
      subtitle="How the attorney card integrates with the hero itself, shown across the full range of states a case moves through. A lifts the card up over the base of the hero (the current pattern). B sits it as a full-width band directly below the hero. Each option is carried through every state so the design holds from an empty slot to a revealed attorney.">
      <DCArtboard id="att-overlap" label="A · Card overlapping the hero" width={392} height={1088}>
        <AttorneyOption integration="overlap" />
      </DCArtboard>
      <DCArtboard id="att-inline" label="B · Inline band below the hero" width={392} height={1132}>
        <AttorneyOption integration="inline" />
      </DCArtboard>
    </DCSection>
  );
}

// CSS
if (typeof document !== 'undefined' && !document.getElementById('hero-studies-css')) {
  const s = document.createElement('style');
  s.id = 'hero-studies-css';
  s.textContent = `
  /* Row 1 · ticket-component hero */
  .thero-b{ background:#f4f6fa; border-bottom:1px solid var(--wf-line2); padding:14px 16px 30px; flex:none; }
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

  /* Row 2 · attorney integration */
  .attopt{ display:flex; flex-direction:column; gap:16px; }
  .attopt-label{ font-size:10px; font-weight:800; letter-spacing:.8px; text-transform:uppercase; color:var(--wf-faint); margin-bottom:6px; }
  .mh{ border-radius:16px; overflow:hidden; border:1px solid var(--wf-line); box-shadow:0 2px 8px rgba(16,24,40,.06); background:#fff; }
  .mh-hero{ position:relative; height:104px; background:repeating-linear-gradient(135deg,#cdd6e6 0 9px,#c2cce0 9px 18px); }
  .mh-scrim{ position:absolute; inset:0; background:linear-gradient(to top, rgba(12,16,26,.72), rgba(12,16,26,.05) 70%); }
  .mh-top{ position:absolute; top:10px; left:10px; right:10px; display:flex; align-items:flex-start; justify-content:space-between; gap:8px; }
  .mh-cls{ font-size:9.5px; font-weight:700; letter-spacing:.4px; text-transform:uppercase; color:#fff;
    background:rgba(16,20,30,.5); -webkit-backdrop-filter:blur(6px); backdrop-filter:blur(6px);
    border:1px solid rgba(255,255,255,.18); border-radius:6px; padding:3px 7px; }
  .mh-loc{ position:absolute; left:12px; bottom:10px; font-size:16px; font-weight:800; letter-spacing:-.3px;
    color:#fff; text-shadow:0 1px 6px rgba(0,0,0,.4); }
  .mh-att{ display:flex; align-items:center; gap:11px; background:#fff; }
  .mh-att.overlap{ margin:-20px 12px 12px; position:relative; z-index:2; border:1px solid var(--wf-line);
    border-radius:14px; padding:11px 12px; box-shadow:0 6px 18px rgba(16,24,40,.08); }
  .mh-att.inline{ padding:12px 14px; border-top:1px solid var(--wf-line2); }
  .mh-att-ic{ width:44px; height:44px; flex:none; border-radius:12px; background:var(--wf-fill);
    display:flex; align-items:center; justify-content:center; }
  .mh-att-t{ font-size:13.5px; font-weight:800; color:var(--wf-ink); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
  .mh-att-s{ font-size:11px; color:var(--wf-muted); margin-top:2px; line-height:1.35; }
  .mh-att-firm{ display:flex; align-items:center; gap:6px; margin-top:3px; font-size:12px; color:var(--wf-muted); min-width:0; }
  .mh-att-firm .fn{ overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
  `;
  document.head.appendChild(s);
}

window.TicketHeroStudies = TicketHeroStudies;
window.AttorneyHeroStudies = AttorneyHeroStudies;
})();
