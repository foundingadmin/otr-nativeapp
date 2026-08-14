// detail-actions.jsx — BOARD: the attention & action system (PRD §6).
// Formalizes the severity hierarchy, the single prioritized "Action needed"
// hub, the concurrency decision (stack vs hub), and account-vs-case de-dup.
/* __IIFE__ */ ;(function(){
const { DCSection, DCArtboard, DCPostIt, SEVERITY, DETAIL, ActionHub, AccountRail } = window;
const { FeatureIcon: FI } = window.OffTheRecordDesignSystem_6eff96;

if (typeof document !== 'undefined' && !document.getElementById('detail-actions-css')) {
  const s = document.createElement('style');
  s.id = 'detail-actions-css';
  s.textContent = `
  .stud{ width:390px; background:var(--wf-bg); border-radius:18px; border:1px solid #dfe4ef;
    box-shadow:0 8px 26px rgba(20,30,60,.1); padding:16px; }
  .stud-h{ font-size:12px; font-weight:800; letter-spacing:.5px; text-transform:uppercase; color:var(--wf-faint);
    margin-bottom:12px; display:flex; align-items:center; gap:7px; }
  /* severity hierarchy rows */
  .sev-row{ display:flex; align-items:center; gap:12px; padding:12px; border-radius:13px; margin-bottom:9px;
    border:1px solid; }
  .sev-rank{ width:26px; height:26px; border-radius:8px; flex:none; display:flex; align-items:center;
    justify-content:center; font-size:13px; font-weight:800; color:#fff; }
  .sev-main{ flex:1; min-width:0; }
  .sev-name{ font-size:13.5px; font-weight:800; }
  .sev-mean{ font-size:11.5px; margin-top:1px; opacity:.85; }
  .sev-chip{ font-size:9px; font-weight:800; letter-spacing:.5px; text-transform:uppercase; padding:3px 7px;
    border-radius:5px; flex:none; }
  .sev-rule{ display:flex; gap:8px; align-items:flex-start; margin-top:4px; padding:10px 12px; border-radius:11px;
    background:#fff; border:1px solid var(--wf-line); font-size:11.5px; color:var(--wf-muted); line-height:1.45; }
  .sev-rule b{ color:var(--wf-strong); font-weight:800; }
  /* anti-pattern banners (the rejected stack) */
  .abn{ display:flex; align-items:center; gap:10px; padding:11px 12px; border-radius:12px; margin-bottom:8px;
    border:1px solid; }
  .abn .abn-t{ font-size:12.5px; font-weight:800; flex:1; }
  .abn .abn-cta{ font-size:11px; font-weight:800; padding:5px 11px; border-radius:999px; background:#fff; flex:none; }
  .stud-note{ font-size:11px; color:var(--wf-muted); line-height:1.45; margin-top:10px; display:flex; gap:7px;
    align-items:flex-start; }
  .stud-note.bad{ color:#b3392e; } .stud-note.good{ color:#127a43; }
  .verdict{ display:inline-flex; align-items:center; gap:5px; font-size:10px; font-weight:800; letter-spacing:.5px;
    text-transform:uppercase; padding:3px 8px; border-radius:5px; }
  .verdict.bad{ background:var(--money-bg); color:var(--money); }
  .verdict.good{ background:#e4f7ec; color:#127a43; }
  `;
  document.head.appendChild(s);
}

// B1 · severity hierarchy
function SeverityStudy(){
  const order = ['critical','warning','info','success'];
  const mean = { critical:'Money or representation at risk', warning:'Your move — time matters, not yet dangerous',
    info:'Good to know — no action required', success:'A positive terminal outcome' };
  return (
    <div className="stud">
      <div className="stud-h"><FI name="warning-octagon" size={14} color="var(--wf-faint)" />Severity hierarchy</div>
      {order.map(k=>{ const sv=SEVERITY[k]; return (
        <div key={k} className="sev-row" style={{ background: sv.bg, borderColor: sv.line, color: sv.ink }}>
          <div className="sev-rank" style={{ background: sv.dot }}>{sv.rank}</div>
          <div className="sev-main">
            <div className="sev-name">{sv.label}</div>
            <div className="sev-mean">{mean[k]}</div>
          </div>
          <span className="sev-chip" style={{ background:'#fff', color: sv.ink }}>{k==='critical'?'red':k==='warning'?'amber':k==='info'?'blue':'green'}</span>
        </div>
      ); })}
      <div className="sev-rule"><FI name="information-circle" size={14} color="var(--wf-faint)" style={{ flex:'none', marginTop:1 }} />
        <span><b>Rule:</b> a higher rank always wins both position and visual weight. A past-due <b>critical</b> never sits below an amber <b>counter-offer</b> warning.</span></div>
    </div>
  );
}

// B2 · the prioritized hub (the chosen pattern), standalone
function HubStudy(){
  return (
    <div className="stud">
      <div className="stud-h"><FI name="warning-triangle" size={14} color="var(--wf-faint)" />Action-needed hub<span className="verdict good" style={{ marginLeft:'auto' }}>Chosen</span></div>
      <div style={{ margin:'0 -2px' }}><ActionHub rec={DETAIL.concurrent} /></div>
      <div className="stud-note good"><FI name="check-thick" size={13} color="#19a558" style={{ flex:'none', marginTop:1 }} />
        One group, one count, ordered severity → deadline → dependency. The dependency note gates the offer behind the signature.</div>
    </div>
  );
}

// B3 · concurrency — the rejected stack
function Banner({ sev, title }){
  const sv = SEVERITY[sev];
  return (
    <div className="abn" style={{ background: sv.bg, borderColor: sv.line, color: sv.ink }}>
      <FI name={sv.icon} size={16} color={sv.ic} />
      <span className="abn-t">{title}</span>
      <span className="abn-cta" style={{ color: sv.ink }}>Act</span>
    </div>
  );
}
function StackStudy(){
  return (
    <div className="stud">
      <div className="stud-h"><FI name="files-and-folders" size={14} color="var(--wf-faint)" />Stacked banners<span className="verdict bad" style={{ marginLeft:'auto' }}>Rejected</span></div>
      <Banner sev="warning" title="You received a counter offer" />
      <Banner sev="critical" title="Payment past due — case at risk" />
      <Banner sev="warning" title="Accept representation to proceed" />
      <Banner sev="info" title="New update on your case" />
      <div className="stud-note bad"><FI name="warning-circle" size={13} color="var(--money)" style={{ flex:'none', marginTop:1 }} />
        A wall of banners with no order — critical sits below warning, and the page becomes noise. This is what the hub replaces.</div>
    </div>
  );
}

// B4 · account rail vs case banner de-dup
function DedupStudy(){
  return (
    <div className="stud" style={{ padding:0, overflow:'hidden' }}>
      <div className="stud-h" style={{ padding:'16px 16px 12px', marginBottom:0 }}><FI name="link-share-2" size={14} color="var(--wf-faint)" />Account rail vs case banner</div>
      <div style={{ borderRadius:0 }}><AccountRail rail={DETAIL.overdue.accountRail} /></div>
      <div style={{ padding:16 }}>
        <div style={{ margin:'0 -2px' }}><ActionHub rec={DETAIL.overdue} /></div>
        <div className="stud-note good"><FI name="check-thick" size={13} color="#19a558" style={{ flex:'none', marginTop:1 }} />
          The rail <b style={{ color:'inherit' }}>&nbsp;summarizes &amp; links</b> (account-wide); the in-case item is the <b style={{ color:'inherit' }}>&nbsp;actionable, specific instance</b>. Same issue, two jobs — never the same message twice in two voices.</div>
      </div>
    </div>
  );
}

const AH = { sev:500, hub:693, stack:372, dedup:457 };

function DetailActions(){
  return (
    <DCSection id="detail-actions" title="Attention & action system · §6"
      subtitle="The highest-leverage, least-solved area. Formalize severity, collapse concurrent actions into one prioritized hub, and de-duplicate account- vs case-level alerts.">
      <DCArtboard id="severity" label="a · Severity hierarchy" width={390} height={AH.sev}><SeverityStudy /></DCArtboard>
      <DCArtboard id="hub" label="b · The prioritized hub" width={390} height={AH.hub}><HubStudy /></DCArtboard>
      <DCArtboard id="stack" label="b · Stacked banners (rejected)" width={390} height={AH.stack}><StackStudy /></DCArtboard>
    </DCSection>
  );
}
window.DetailActions = DetailActions;
})();
