// detail-disclosure.jsx — BOARD: disclosure model for the expanded record
// (PRD open decision #1). Same Active case, two ways to present zone 6 — a
// single long scroll (keeps an anxious user oriented) vs tabs (compact, but
// hides things they may not know to look for). Both interactive.
/* __IIFE__ */ ;(function(){
const { useState } = React;
const { DCSection, DCArtboard, DCPostIt, DETAIL, DScreen, TicketHero, Identity,
  StatusZone, ViolationList, CourtInfo, DocList, PaymentHistory, Timeline, HelpZone } = window;
const { FeatureIcon: FI } = window.OffTheRecordDesignSystem_6eff96;

if (typeof document !== 'undefined' && !document.getElementById('detail-disc-css')) {
  const s = document.createElement('style');
  s.id = 'detail-disc-css';
  s.textContent = `
  .disc-h{ display:flex; align-items:center; gap:8px; padding:16px 16px 4px; font-size:11px; font-weight:800;
    letter-spacing:.7px; text-transform:uppercase; color:var(--wf-faint); }
  /* single-scroll section */
  .ss-sec{ padding:14px 16px 2px; }
  .ss-sec-h{ display:flex; align-items:center; gap:9px; padding-bottom:6px; }
  .ss-sec-h .ssh-t{ font-size:13.5px; font-weight:800; color:var(--wf-ink); }
  .ss-sec-h .ssh-n{ font-size:11px; font-weight:800; color:var(--wf-muted); background:var(--wf-fill); min-width:19px;
    height:19px; padding:0 5px; border-radius:999px; display:inline-flex; align-items:center; justify-content:center; }
  .ss-sec + .ss-sec{ border-top:1px solid var(--wf-line2); }
  /* tab bar */
  .dtabs{ display:flex; gap:4px; padding:10px 12px 8px; position:sticky; top:0; background:var(--wf-bg);
    border-bottom:1px solid var(--wf-line2); overflow-x:auto; scrollbar-width:none; }
  .dtabs::-webkit-scrollbar{ display:none; }
  .dtab{ flex:none; display:flex; align-items:center; gap:6px; height:34px; padding:0 13px; border-radius:999px;
    font-size:12.5px; font-weight:700; color:var(--wf-muted); background:transparent; border:1px solid transparent;
    cursor:pointer; white-space:nowrap; }
  .dtab.on{ background:var(--wf-ink); color:#fff; }
  .dtab .dt-n{ font-size:10px; font-weight:800; min-width:16px; height:16px; padding:0 4px; border-radius:999px;
    display:inline-flex; align-items:center; justify-content:center; background:var(--wf-line2); color:var(--wf-muted); }
  .dtab.on .dt-n{ background:rgba(255,255,255,.24); color:#fff; }
  .dtab-body{ padding:6px 16px 14px; }
  .dtab-body.fade{ animation:dt-fade .2s ease; }
  @keyframes dt-fade{ from{ opacity:0; transform:translateY(4px); } to{ opacity:1; transform:none; } }
  @media (prefers-reduced-motion: reduce){ .dtab-body.fade{ animation:none; } }
  `;
  document.head.appendChild(s);
}

function CondensedHead({ rec }){
  return (<><TicketHero rec={rec} /><Identity rec={rec} /><StatusZone rec={rec} /></>);
}

// C1 · single long scroll — every section expanded inline
function ScrollDisclosure({ height }){
  const rec = DETAIL.active;
  const Sec = ({ ic, t, n, children }) => (
    <div className="ss-sec">
      <div className="ss-sec-h"><FI name={ic} size={15} color="var(--wf-muted)" />
        <span className="ssh-t">{t}</span>{n!=null && <span className="ssh-n">{n}</span>}</div>
      {children}
    </div>
  );
  return (
    <DScreen rec={rec} height={height}>
      <CondensedHead rec={rec} />
      <div className="disc-h">Full record</div>
      <Sec ic="warning-triangle" t="Violations" n={rec.violations.length}><ViolationList rec={rec} /></Sec>
      <Sec ic="building-1" t="Court & directions"><CourtInfo rec={rec} /></Sec>
      <Sec ic="files-and-folders" t="Documents" n={rec.documents.length}><DocList rec={rec} /></Sec>
      <Sec ic="bill-dollar-2" t="Payments" n={rec.payments.length}><PaymentHistory rec={rec} /></Sec>
      <Sec ic="history-backup-folder" t="Timeline"><Timeline rec={rec} /></Sec>
      <HelpZone />
    </DScreen>
  );
}

// C2 · tabs — Overview / Documents / Payments / Timeline
function TabsDisclosure({ height }){
  const rec = DETAIL.active;
  const [tab, setTab] = useState('overview');
  const tabs = [
    { id:'overview', label:'Overview' },
    { id:'docs', label:'Documents', n:rec.documents.length },
    { id:'pay', label:'Payments', n:rec.payments.length },
    { id:'time', label:'Timeline' },
  ];
  return (
    <DScreen rec={rec} height={height}>
      <CondensedHead rec={rec} />
      <div className="dtabs">
        {tabs.map(t=>(
          <div key={t.id} className={`dtab${tab===t.id?' on':''}`} onClick={()=>setTab(t.id)}>
            {t.label}{t.n!=null && <span className="dt-n">{t.n}</span>}
          </div>
        ))}
      </div>
      <div className="dtab-body fade" key={tab}>
        {tab==='overview' && <>
          <div className="ss-sec" style={{ padding:'10px 0 2px' }}>
            <div className="ss-sec-h"><FI name="warning-triangle" size={15} color="var(--wf-muted)" /><span className="ssh-t">Violations</span><span className="ssh-n">{rec.violations.length}</span></div>
            <ViolationList rec={rec} /></div>
          <div className="ss-sec"><div className="ss-sec-h"><FI name="building-1" size={15} color="var(--wf-muted)" /><span className="ssh-t">Court & directions</span></div><CourtInfo rec={rec} /></div>
        </>}
        {tab==='docs' && <DocList rec={rec} />}
        {tab==='pay' && <PaymentHistory rec={rec} />}
        {tab==='time' && <Timeline rec={rec} />}
      </div>
      <HelpZone />
    </DScreen>
  );
}

const DH = { scroll:1616, tabs:1082 };

function DetailDisclosure(){
  return (
    <DCSection id="detail-disclosure" title="Disclosure model · scroll vs tabs"
      subtitle="Open decision #1 — how the expanded record (violations · court · documents · payments · timeline) is presented. Same Active case, both interactive. Scroll keeps you oriented; tabs hide what you may not know to look for.">
      <DCArtboard id="scroll" label="Single long scroll" width={390} height={DH.scroll}><ScrollDisclosure height={DH.scroll} /></DCArtboard>
      <DCArtboard id="tabs" label="Tabbed — tap to switch" width={390} height={DH.tabs}><TabsDisclosure height={DH.tabs} /></DCArtboard>
      <DCPostIt top={-8} right={-188} width={172} rotate={2}>
        Recommendation in the PRD leans scroll for an anxious, infrequent user — but both are here to decide from.
      </DCPostIt>
    </DCSection>
  );
}
window.DetailDisclosure = DetailDisclosure;
window.DISC_H = DH;
})();
