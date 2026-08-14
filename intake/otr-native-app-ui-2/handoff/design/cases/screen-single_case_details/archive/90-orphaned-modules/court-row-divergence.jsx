// court-row-divergence.jsx — BOARD: 5 structural treatments of the single
// "Court date" fact row, so the row layout can be decided in isolation.
// V1 is the current live structure; V2–V5 are alternatives.
/* __IIFE__ */ ;(function(){
const { DCSection, DCArtboard, DCPostIt } = window;
const { FeatureIcon: FI } = window.OffTheRecordDesignSystem_6eff96;

const DATE = 'May 20, 2026';
const CUE  = 'in 70 days';

// shared frame: the row inside a fact card, exactly as it sits on the page
function Frame({ children }){
  return (
    <div className="cd-card">
      <div className="frow">
        <div className="f-ic"><FI name="countdown-timer" size={15} color="var(--wf-faint)" /></div>
        <div className="f-main">
          <div className="f-k">Court date</div>
          {children}
        </div>
      </div>
    </div>
  );
}

// V1 · CURRENT — inline; badge hugs date, text action hugs right
function V1(){
  return (
    <Frame>
      <div className="f-v">
        <div className="f-court-row">
          <span>{DATE}</span>
          <span className="f-rel">{CUE}</span>
          <div className="xr-act xr-act-inline"><FI name="calendar-check" size={14} color="var(--wf-strong)" />Add to calendar</div>
        </div>
      </div>
    </Frame>
  );
}

// V2 · icon-only action — minimal; calendar glyph button on the right
function V2(){
  return (
    <Frame>
      <div className="f-v">
        <div className="f-court-row">
          <span>{DATE}</span>
          <span className="f-rel">{CUE}</span>
          <button className="cd-iconbtn" aria-label="Add to calendar"><FI name="calendar-check" size={16} color="var(--wf-strong)" /></button>
        </div>
      </div>
    </Frame>
  );
}

// V3 · countdown as sub-line — date primary, action pill vertically centered
function V3(){
  return (
    <Frame>
      <div className="f-v">
        <div className="cd-rowact">
          <div>
            <div>{DATE}</div>
            <div className="f-sub">{CUE}</div>
          </div>
          <div className="xr-act xr-act-inline cd-push"><FI name="calendar-check" size={14} color="var(--wf-strong)" />Add to calendar</div>
        </div>
      </div>
    </Frame>
  );
}

// V4 · stacked, full-width action — date + badge, then a wide button below
function V4(){
  return (
    <Frame>
      <div className="f-v">
        <div className="f-court-row">
          <span>{DATE}</span>
          <span className="f-rel">{CUE}</span>
        </div>
        <button className="cd-fullbtn"><FI name="calendar-check" size={14} color="var(--wf-strong)" />Add to calendar</button>
      </div>
    </Frame>
  );
}

// V5 · countdown emphasized right, action as a quiet text link below
function V5(){
  return (
    <Frame>
      <div className="f-v">
        <div className="f-court-row">
          <span>{DATE}</span>
          <span className="f-rel cd-push">{CUE}</span>
        </div>
        <div className="cd-link"><FI name="add-circle" size={13} color="var(--otr-blue)" />Add to calendar</div>
      </div>
    </Frame>
  );
}

if (typeof document !== 'undefined' && !document.getElementById('court-row-div-css')) {
  const s = document.createElement('style');
  s.id = 'court-row-div-css';
  s.textContent = `
  .cd-card{ width:360px; background:#fff; border:1px solid var(--wf-line); border-radius:16px; overflow:hidden; padding:3px 0; }
  .cd-rowact{ display:flex; align-items:center; gap:8px; }
  .cd-push{ margin-left:auto; }
  .cd-iconbtn{ margin-left:auto; width:34px; height:34px; flex:none; border-radius:10px; border:1px solid var(--wf-line);
    background:#fff; display:inline-flex; align-items:center; justify-content:center; cursor:pointer; padding:0; }
  .cd-fullbtn{ width:100%; display:flex; align-items:center; justify-content:center; gap:6px; height:36px; border-radius:10px;
    border:1px solid var(--wf-line); background:#fff; font-size:12px; font-weight:800; color:var(--wf-strong); margin-top:10px; cursor:pointer; }
  .cd-link{ display:inline-flex; align-items:center; gap:5px; font-size:12px; font-weight:800; color:var(--otr-blue); margin-top:7px; cursor:pointer; }
  `;
  document.head.appendChild(s);
}

function CourtRowDivergence(){
  return (
    <DCSection id="court-row-divergence" title="Court date row · 5 divergences"
      subtitle="One row, five structures. V1 is what’s live now. Pick the balance of date prominence, countdown placement, and how loud the “Add to calendar” action should be.">
      <DCArtboard id="cdr-v1" label="V1 · current — inline, text action right" width={360} height={132}><V1 /></DCArtboard>
      <DCArtboard id="cdr-v2" label="V2 · icon-only action" width={360} height={132}><V2 /></DCArtboard>
      <DCArtboard id="cdr-v3" label="V3 · countdown as sub-line, pill right" width={360} height={140}><V3 /></DCArtboard>
      <DCArtboard id="cdr-v4" label="V4 · stacked, full-width action" width={360} height={172}><V4 /></DCArtboard>
      <DCArtboard id="cdr-v5" label="V5 · countdown emphasized, quiet link" width={360} height={150}><V5 /></DCArtboard>
      <DCPostIt top={-8} left={-188} width={168} rotate={-3}>
        The action is secondary — most users never attend. Lean quiet (V2 / V5) unless the date is imminent.
      </DCPostIt>
    </DCSection>
  );
}
window.CourtRowDivergence = CourtRowDivergence;
})();
