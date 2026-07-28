// timeline-lab.jsx. WORKSHOP: the case-details timeline element.
// Goal: land ONE default timeline system that applies to any and all cases.
// The timeline is a high-level tracker, not a granular event log. It shows
// system events only (PRD 9.8): case-state changes, never chat content.
//
// Two models on the board:
//   A. Five-stage tracker  (the recommended default for every case)
//   B. Granular expansion   (the same five stages, opened up event by event)
// Renders on the production .tline CSS (detail-record) via a lab-local
// renderer so the phase groupings read cleanly.
/* __IIFE__ */ ;(function(){
const { DCSection, DCArtboard } = window;
const { FeatureIcon: FI } = window.OffTheRecordDesignSystem_6eff96;

// tone maps (mirror the production Timeline)
const TL_TONE = {
  warning: { bg:'var(--amber-50)', line:'var(--amber-200)', ic:'var(--amber-500)', name:'Warning' },
  error:   { bg:'var(--red-50)',   line:'var(--red-200)',   ic:'var(--red-600)',   name:'Critical' },
  success: { bg:'var(--green-50)', line:'var(--green-200)', ic:'var(--green-600)', name:'Success' },
  info:    { bg:'var(--blue-50)',  line:'var(--blue-200)',  ic:'var(--blue-600)',  name:'Info' },
  neutral: { bg:'#eef0f4',         line:'#dfe3ea',          ic:'#7b8595',          name:'Neutral' },
};
const TL_SEV = { critical:'error', success:'success', warning:'warning', info:'info' };
const toneOf = (e) => TL_TONE[e.tone || TL_SEV[e.sev] || 'neutral'] || TL_TONE.neutral;

// the granular events, keyed. Only the fields the timeline shows.
const EV = {
  added:     { t:'Ticket added',           b:'You uploaded your citation',                ic:'open-folder' },
  submitted: { t:'Case submitted',         b:'Citation and details confirmed',            ic:'check-thick' },
  matched:   { t:'Attorney SmartMatch’d',  b:'Quote ready for your review',               ic:'user-square-single' },
  accepted:  { t:'Representation accepted', b:'You accepted the quote, attorney revealed', ic:'check-thick' },
  signed:    { t:'Engagement signed',      b:'You accepted representation',               ic:'file-check' },
  filed:     { t:'Case filed with court',  b:'LA Superior, North',                        ic:'building-1' },
  courtDate: { t:'Court date',             b:'Helen appears for you; you don’t attend',   ic:'gavel' },
};
const ev = (key, over) => ({ ...EV[key], ...(over||{}) });

// lab timeline renderer. Generic state dots (DR-CD-001): done = muted check,
// current = tone pulse, future = dashed hollow. Supports inline phase heads.
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

// surface wrapper: a bare timeline on the primary surface, as it rides in prod
function Surface({ children }){
  return (
    <div className="tll-surface">
      <div className="tlbare">{children}</div>
    </div>
  );
}

// Option A. The five fixed stages, identical for every case. Not dated events
// but stages; the date column reads as a status word.
const STAGES = [
  { t:'Intake',         b:'Ticket submitted',                       ic:'open-folder',        d:'Done' },
  { t:'Matching',       b:'Attorney SmartMatch’d',                  ic:'user-square-single', d:'Done' },
  { t:'Representation', b:'Engagement signed and filed',            ic:'file-check',         d:'Done' },
  { t:'Court',          b:'Hearing May 20; Helen appears for you',  ic:'gavel',              d:'Active', current:true, tone:'info' },
  { t:'Outcome',        b:'Result pending',                         ic:'folder-check',       d:'TBD', future:true },
];

// Option B. The same five stages opened up event by event (granular). Same
// case and moment as A: everything up to filing done, court date live.
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
  { t:'Case outcome', b:'Your result will appear here', ic:'folder-check', d:'TBD', future:true },
];

// states and tones legend
function Legend(){
  const states = [
    { s:'done',    label:'Done',    desc:'A settled stage. Muted, generic check.' },
    { s:'current', label:'Current', desc:'The live stage. Pulses in its tone.' },
    { s:'future',  label:'Future',  desc:'Not yet reached. Dashed, hollow.' },
  ];
  const tones = ['neutral','info','warning','error','success'];
  return (
    <div className="tll-legend">
      <div className="tll-leg-sec">
        <div className="tll-leg-h">States</div>
        {states.map(x => {
          const tn = TL_TONE.info;
          const dot = x.s==='future' ? { background:'#fff', borderColor:'#cfd6e2', borderStyle:'dashed' } :
            x.s==='done' ? { background:'#f1f3f7', borderColor:'#e4e8ee' } : { background:tn.bg, borderColor:tn.line };
          return (
            <div key={x.s} className="tll-leg-row">
              <div className="tl-dot" style={{ ...dot, borderWidth:2, borderStyle:dot.borderStyle||'solid' }}>
                {x.s==='done' && <FI name="check-thick" size={12} color="#aab2bf" />}
                {x.s==='current' && <span className="tl-pulse" style={{ background:tn.ic }} />}
              </div>
              <div><div className="tll-leg-t">{x.label}</div><div className="tll-leg-d">{x.desc}</div></div>
            </div>
          );
        })}
      </div>
      <div className="tll-leg-sec">
        <div className="tll-leg-h">Tones (severity)</div>
        <div className="tll-swatches">
          {tones.map(t => {
            const tn = TL_TONE[t];
            return (
              <div key={t} className="tll-sw">
                <div className="tll-sw-dot" style={{ background:tn.bg, borderColor:tn.line }}><span style={{ width:8, height:8, borderRadius:'50%', background:tn.ic }} /></div>
                <span className="tll-sw-l">{tn.name}</span>
              </div>
            );
          })}
        </div>
        <div className="tll-firewall">
          <FI name="lock-1" size={13} color="#6b7688" />
          <div><b>System events only (PRD 9.8).</b> The tracker reflects case-state changes. It may note that a message exists and route into the sealed thread, but it never shows what a message was about.</div>
        </div>
      </div>
    </div>
  );
}

// CSS
if (typeof document !== 'undefined' && !document.getElementById('timeline-lab-css')) {
  const s = document.createElement('style');
  s.id = 'timeline-lab-css';
  s.textContent = `
  .tll-surface{ background:#fff; border:1px solid var(--wf-line); border-radius:20px; overflow:hidden;
    font-family:'Figtree',var(--font-sans),sans-serif; }
  .tll-surface .tlbare{ margin:0; padding:16px 18px 16px; }
  .tll-surface .tll-tline{ padding:0; }

  /* inline phase divider inside the spine */
  .tll-phase{ display:flex; align-items:center; gap:9px; margin:2px 0 8px; padding-left:36px; }
  .tll-phase:first-child{ margin-top:0; }
  .tll-phase span{ font-size:9.5px; font-weight:800; letter-spacing:1.2px; text-transform:uppercase; color:var(--wf-faint); }
  .tll-phase::after{ content:''; flex:1; height:1px; background:var(--wf-line2); }

  /* legend */
  .tll-legend{ display:flex; gap:26px; font-family:'Figtree',var(--font-sans),sans-serif; }
  .tll-leg-sec{ flex:1; min-width:0; }
  .tll-leg-h{ font-size:11px; font-weight:800; letter-spacing:1px; text-transform:uppercase; color:var(--wf-faint); margin-bottom:12px; }
  .tll-leg-row{ display:flex; align-items:center; gap:12px; margin-bottom:14px; }
  .tll-leg-row .tl-dot{ width:24px; height:24px; border-radius:50%; border:2px solid; display:flex; align-items:center; justify-content:center; flex:none; }
  .tll-leg-t{ font-size:13px; font-weight:800; color:var(--wf-ink); }
  .tll-leg-d{ font-size:11.5px; color:var(--wf-muted); margin-top:1px; }
  .tll-swatches{ display:flex; flex-wrap:wrap; gap:10px 16px; margin-bottom:16px; }
  .tll-sw{ display:flex; align-items:center; gap:7px; }
  .tll-sw-dot{ width:22px; height:22px; border-radius:50%; border:2px solid; display:flex; align-items:center; justify-content:center; }
  .tll-sw-l{ font-size:12px; font-weight:700; color:var(--wf-strong); }
  .tll-firewall{ display:flex; gap:9px; align-items:flex-start; font-size:11.5px; line-height:1.45; color:var(--wf-muted);
    background:#f6f7f9; border:1px solid var(--wf-line2); border-radius:11px; padding:11px 12px; }
  .tll-firewall b{ color:var(--wf-ink); }
  `;
  document.head.appendChild(s);
}

// the board
function TimelineLab(){
  return (
    <>
      <DCSection id="tl-default" title="Timeline · the default tracker" eyebrow="Exploration"
        updated="Updated • Tue Jul 7, 2026"
        subtitle="One default timeline for any and all cases. It is a high-level tracker, not a granular log. Option A is the five fixed stages every case shares; Option B opens those same stages up event by event, to gauge how much detail is worth showing. Same case, same moment (mid-representation, court date live).">
        <DCArtboard id="opt-stages" label="A · Five-stage tracker (recommended)" width={392} height={356}>
          <Surface>
            <LabTimeline items={STAGES} />
          </Surface>
        </DCArtboard>
        <DCArtboard id="opt-granular" label="B · Granular expansion within the stages" width={392} height={688}>
          <Surface>
            <LabTimeline items={GRANULAR} />
          </Surface>
        </DCArtboard>
      </DCSection>

      <DCSection id="tl-legend" title="States & tones"
        subtitle="The dot vocabulary the tracker uses: the three stage states, and the severity tones a live stage can carry.">
        <DCArtboard id="legend" label="States & tones" width={520} height={300}>
          <Legend />
        </DCArtboard>
      </DCSection>
    </>
  );
}

window.TimelineLab = TimelineLab;
})();
