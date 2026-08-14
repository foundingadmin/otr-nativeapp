// detail-record.jsx — zones 5–7: case facts (with truncation + completion
// prompts), the expanded record (violations · court+directions · documents ·
// payments), the system-events-only timeline, and the help/escalation zone.
/* __IIFE__ */;(function () {
  const { useState } = React;
  const { SEVERITY } = window;
  const { FeatureIcon: FI } = window.OffTheRecordDesignSystem_6eff96;

  // relative court-date cue
  function relCue(days) {
    if (days == null) return null;
    if (days <= 0) return { t: 'Today', soon: true };
    if (days <= 14) return { t: `in ${days} days`, soon: true };
    return { t: `in ${days} days`, soon: false };
  }

  // ── 5 · case facts ────────────────────────────────────────────────────────
  // inlineViolations = how many violation rows show before "+N more" (PRD §4).
  function CaseFacts({ rec, inlineViolations = 1, completionPrompts = true }) {
    const viols = rec.violations || [];
    const shown = viols.slice(0, inlineViolations);
    const moreN = viols.length - shown.length;
    const cue = rec.court ? relCue(rec.court.days) : null;
    const userSource = !!rec.booking; // pre-booking, the user supplies missing facts

    return (
      <div className="facts">
      <div className="facts-h"><FI name="open-folder" size={15} color="var(--wf-muted)" />Case overview</div>

      <Fact ic="location-pin" k="Ticket issued">
        {rec.place ?
          <div className="f-v">{rec.place}<div className="f-sub">{rec.issued}</div></div> :
          <div className="f-v">{rec.issued}<div className="f-sub">Location not on citation</div></div>}
      </Fact>

      <Fact ic="warning-triangle" k="Violations">
        {viols.length === 0 ?
          completionPrompts && userSource ?
          <span className="f-complete"><FI name="add-circle" size={14} color="var(--otr-blue)" />Add your violation</span> :
          <span className="f-v"><span className="muted">Not provided</span></span> :
          <>
              {shown.map((v, i) =>
            <div key={i} className="f-v" style={{ marginTop: i ? 6 : 0 }}>
                  <span className="trunc">{v.label}{v.code ? ` · ${v.code}` : ''}</span>
                  {v.note && <div className="f-sub">{v.note}</div>}
                </div>
            )}
              {moreN > 0 && <div className="vmore">+{moreN} more violation{moreN > 1 ? 's' : ''}<FI name="chevron-right" size={9} color="var(--otr-blue)" /></div>}
            </>}
      </Fact>

      {rec.attorney &&
        <Fact ic="building-1" k="Law firm">
          <div className="f-v"><span className="trunc">{rec.attorney.firm}</span>
            <div className="f-sub trunc">{rec.attorney.name}</div></div>
        </Fact>
        }

      <Fact ic="building-1" k="Court of record">
        {rec.court ?
          <div className="f-v"><span className="trunc">{rec.court.name}</span>
              <div className="f-sub trunc">{rec.court.addr}</div>
              <div className="xr-map"><div className="xr-map-pin"><FI name="location-pin" size={18} color="var(--otr-blue)" /></div><div className="xr-map-grid" /></div>
              <div className="xr-note"><FI name="information-circle" size={12} color="var(--wf-faint)" />Your attorney appears for you — you don’t need to attend unless told otherwise.</div>
            </div> :
          completionPrompts && userSource ?
          <span className="f-await"><FI name="hourglass" size={13} color="var(--wf-faint)" />Assigned after you book</span> :
          <span className="f-v"><span className="muted">Not provided</span></span>}
      </Fact>

      <Fact ic="countdown-timer" k="Court date">
        {rec.court && rec.court.date ?
          <div className="f-v">
              <div className="f-court-row">
                <span>{rec.court.date}</span>
                {cue && <span className={`f-rel${cue.soon ? ' soon' : ''}`}>{cue.t}</span>}
              </div>
              {rec.court.past ?
            <div className="f-sub">Appearance complete</div> :
            <div className="cd-cal"><FI name="add-circle" size={13} color="var(--otr-blue)" />Add to calendar</div>}</div> :
          completionPrompts ?
          <span className="f-complete"><FI name="add-circle" size={14} color="var(--otr-blue)" />Add your court date</span> :
          <span className="f-v"><span className="muted">Not provided</span></span>}
      </Fact>

      {rec.balance > 0 &&
        <Fact ic="bill-dollar-2" k="Balance due">
          <div className="f-v" style={{ color: 'var(--money)' }}>${rec.balance}
            <div className="f-sub" style={{ color: 'var(--money)', opacity: .85 }}>Past due</div></div>
        </Fact>
        }
    </div>);

  }
  function Fact({ ic, k, children }) {
    return (
      <div className="frow">
      <div className="f-ic"><FI name={ic} size={15} color="var(--wf-faint)" /></div>
      <div className="f-main"><div className="f-k">{k}</div>{children}</div>
    </div>);

  }

  // ── 6 · expanded record — collapsible section card ────────────────────────
  function XCard({ ic, title, count, defaultOpen = false, children }) {
    const [open, setOpen] = useState(defaultOpen);
    return (
      <div className="xcard">
      <div className={`xcard-h${open ? '' : ' collapsed'}`} onClick={() => setOpen((o) => !o)}>
        <span className="xh-ic"><FI name={ic} size={16} color="var(--wf-muted)" /></span>
        <span className="xh-t">{title}</span>
        {count != null && <span className="xh-n">{count}</span>}
        <span className="xh-chev"><FI name="chevron-down" size={12} color="var(--wf-faint)" style={{ transform: open ? 'none' : 'rotate(-90deg)', transition: 'transform .15s ease' }} /></span>
      </div>
      {open && <div className="xcard-b">{children}</div>}
    </div>);

  }

  // full violations breakdown
  function ViolationList({ rec }) {
    const viols = rec.violations || [];
    if (!viols.length) return <div className="xr-empty">No violations on record yet.</div>;
    return (
      <div className="xr-list">
      {viols.map((v, i) =>
        <div key={i} className="xr-row">
          <div className="xr-num">{viols.length > 1 ? `${i + 1}` : ''}</div>
          <div className="xr-main">
            <div className="xr-t">{v.label}</div>
            <div className="xr-s">{v.code}{v.note ? ` · ${v.note}` : ''}</div>
          </div>
        </div>
        )}
    </div>);

  }

  // court info + directions
  function CourtInfo({ rec }) {
    if (!rec.court) return <div className="xr-empty">Court is assigned after your case is booked.</div>;
    return (
      <div style={{ padding: '4px 0 10px' }}>
      <div className="xr-row">
        <div className="xr-ic"><FI name="building-1" size={15} color="var(--wf-muted)" /></div>
        <div className="xr-main"><div className="xr-t">{rec.court.name}</div><div className="xr-s">{rec.court.addr}</div></div>
      </div>
      <div className="xr-map"><div className="xr-map-pin"><FI name="location-pin" size={18} color="var(--otr-blue)" /></div>
        <div className="xr-map-grid" /></div>
      <div className="xr-actions">
        <div className="xr-act"><FI name="location-compass-1" size={14} color="var(--wf-strong)" />Directions</div>
        <div className="xr-act"><FI name="calendar-check" size={14} color="var(--wf-strong)" />Add to calendar</div>
      </div>
      <div className="xr-note"><FI name="information-circle" size={12} color="var(--wf-faint)" />Your attorney appears for you — you don’t need to attend unless told otherwise.</div>
    </div>);

  }

  // documents
  function DocList({ rec }) {
    const docs = rec.documents || [];
    if (!docs.length) return <div className="xr-empty">Documents appear here once your case is underway.</div>;
    return (
      <div className="xr-list">
      {docs.map((d, i) =>
        <div key={i} className="xr-doc">
          <div className="xr-doc-ic" style={d.pending ? { background: '#fff4e3' } : null}>
            <FI name={d.ic} size={16} color={d.pending ? '#c2680a' : 'var(--wf-muted)'} /></div>
          <div className="xr-main"><div className="xr-t">{d.n}</div>
            <div className="xr-s"><span className={`xr-tag${d.pending ? ' pend' : ''}`}>{d.t}</span> · {d.d}</div></div>
          <div className="xr-doc-dl"><FI name={d.pending ? 'chevron-right' : 'download-tray'} size={15} color="var(--wf-faint)" /></div>
        </div>
        )}
    </div>);

  }

  // persistent document-upload affordance (foot of the Documents tab)
  function UploadDocs() {
    return (
      <div className="docup">
        <div className="docup-drop">
          <div className="docup-ic"><FI name="cloud-upload" size={19} color="var(--otr-blue)" /></div>
          <div className="docup-main">
            <div className="docup-t">Upload a document</div>
            <div className="docup-s">Citation, court notice, or correspondence — PDF, JPG or PNG</div>
          </div>
        </div>
        <div className="docup-row">
          <button className="docup-btn"><FI name="files-and-folders" size={14} color="var(--wf-strong)" />Choose file</button>
          <button className="docup-btn"><FI name="camera-1" size={14} color="var(--wf-strong)" />Take photo</button>
        </div>
      </div>);

  }

  // payment history (+ surface current quote)
  function PaymentHistory({ rec }) {
    const pays = rec.payments || [];
    const quote = pays.find((p) => p.q);
    if (!pays.length) return <div className="xr-empty">No transactions yet.</div>;
    return (
      <div className="xr-list">
      {pays.map((p, i) =>
        <div key={i} className="xr-pay">
          <div className="xr-main"><div className="xr-t">{p.l}</div><div className="xr-s">{p.d}</div></div>
          <div className="xr-pay-amt">
            <div className={`xr-amt${p.overdue ? ' over' : ''}`}>{p.q ? `$${p.q}` : `$${p.a}`}</div>
            <div className={`xr-pstatus${p.overdue ? ' over' : ''}${p.s === 'Paid' ? ' paid' : ''}`}>{p.s}</div>
          </div>
        </div>
        )}
      {quote &&
        <div className="xr-quote">
          <div className="xr-main"><div className="xr-t">Complete this payment to activate your case</div>
            <div className="xr-s">Due when you accept representation</div></div>
          <div className="act blue" style={{ height: 34, fontSize: 13, padding: '0 14px' }}>Pay ${quote.q}</div>
        </div>
        }
    </div>);

  }

  // ── timeline — system events only (§9.8: never fed by chat content) ───────
  const TL_TONE = {
    warning: { bg: 'var(--amber-50)', line: 'var(--amber-200)', ic: 'var(--amber-500)' },
    error: { bg: 'var(--red-50)', line: 'var(--red-200)', ic: 'var(--red-600)' },
    success: { bg: 'var(--green-50)', line: 'var(--green-200)', ic: 'var(--green-600)' },
    active: { bg: 'var(--blue-50)', line: 'var(--blue-200)', ic: 'var(--blue-600)' },
    info: { bg: 'var(--blue-50)', line: 'var(--blue-200)', ic: 'var(--blue-600)' },
    neutral: { bg: '#eef0f4', line: '#dfe3ea', ic: '#7b8595' }
  };
  const TL_SEV = { critical: 'error', success: 'success', warning: 'warning', info: 'info' };
  function Timeline({ rec }) {
    const ev = rec.timeline || [];
    if (!ev.length) return null;
    return (
      <div className="tline">
      {ev.map((e, i) => {
          const state = e.future ? 'future' : e.current ? 'current' : 'done';
          const tn = TL_TONE[e.tone || TL_SEV[e.sev] || 'neutral'] || TL_TONE.neutral;
          const dot = state === 'future' ? { background: '#fff', borderColor: '#cfd6e2', borderStyle: 'dashed' } :
          state === 'done' ? { background: '#f1f3f7', borderColor: '#e4e8ee' } :
          { background: tn.bg, borderColor: tn.line };
          return (
            <div key={i} className={`tl-row ${state}`}>
            <div className="tl-spine">
              <div className="tl-dot" style={dot}>
                {state === 'done' && <FI name="check-thick" size={12} color="#aab2bf" />}
                {state === 'current' && <span className="tl-pulse" style={{ background: tn.ic }} />}
              </div>
              {i < ev.length - 1 && <div className="tl-line" />}
            </div>
            <div className="tl-main">
              <div className="tl-t">{e.t}</div>
              <div className="tl-b">{e.b}</div>
            </div>
            <div className="tl-d">{e.d}</div>
          </div>);

        })}
    </div>);

  }

  // ── timeline zone (promoted) — the reassurance anchor, high on the page.
  // "What's happened / what's next" for an anxious user; system events only.
  function TimelineZone({ rec }) {
    // WIP: the timeline is being re-decided in the timeline lab exploration.
    // Reduced to an outlined placeholder on the root board; links out to the lab.
    return (
      <div className="zone-ph">
      <a className="explore-pin" href="explorations/02-timeline-lab/Timeline%20Lab.html"><FI name="triangle-arrow-expand-window-1" size={10} color="#fff" />Timeline lab</a>
      <div className="zph-t">Timeline</div>
      <div className="zph-s">This zone is being reworked. See the timeline lab for the default tracker.</div>
    </div>);

  }

  // ── 7 · help / escalation (OTR support — distinct from the attorney) ──────
  function HelpZone({ dispute = false }) {
    return (
      <div className="helpz">
      <div className="hz-ic"><FI name="chat-bubble-info-help" size={17} color="var(--wf-muted)" /></div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="hz-t">{dispute ? 'Need help with this dispute?' : 'Questions about your case?'}</div>
        <div className="hz-s">OTR support — billing, account & app help</div>
      </div>
      <div className="hz-cta">Start a live chat</div>
    </div>);

  }

  // ── tabbed record (Overview · Documents · Payments) — the locked-in pattern.
  // Overview holds the Case-facts card + court/directions; the other tabs carry
  // the document and payment records. (Timeline stays its own promoted zone.)
  function TabCard({ ic, title, children }) {
    return (
      <div className="tcard">
      {title && <div className="tcard-h"><FI name={ic} size={15} color="var(--wf-muted)" />{title}</div>}
      <div className="tcard-b">{children}</div>
    </div>);

  }
  function DetailTabs({ rec }) {
    const [tab, setTab] = useState('overview');
    const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'docs', label: 'Documents', n: (rec.documents || []).length || null },
    { id: 'pay', label: 'Payments', n: (rec.payments || []).length || null }];

    return (
      <div className="rtabs-zone">
      <a className="explore-pin" href="explorations/01-details-exploration/01-details-exploration.html"><FI name="triangle-arrow-expand-window-1" size={10} color="#fff" />Case details exploration</a>
      <div className="dtabs">
        {tabs.map((t) =>
          <div key={t.id} className={`dtab${tab === t.id ? ' on' : ''}`} onClick={() => setTab(t.id)}>
            {t.label}{t.n != null && <span className="dt-n">{t.n}</span>}
          </div>
          )}
      </div>
      <div className="rtab-body fade" key={tab}>
        {tab === 'overview' && <CaseFacts rec={rec} completionPrompts />}
        {tab === 'docs' && <TabCard ic="files-and-folders" title="Documents"><DocList rec={rec} /><UploadDocs /></TabCard>}
        {tab === 'pay' && <TabCard ic="bill-dollar-2" title="Payments"><PaymentHistory rec={rec} /></TabCard>}
      </div>
    </div>);

  }

  // the full expanded-record stack (single-scroll disclosure)
  function ExpandedRecord({ rec, openFirst = false }) {
    return (
      <>
      <XCard ic="building-1" title="Court & directions" defaultOpen={openFirst}><CourtInfo rec={rec} /></XCard>
      <XCard ic="files-and-folders" title="Documents" count={(rec.documents || []).length || null}><DocList rec={rec} /></XCard>
      <XCard ic="bill-dollar-2" title="Payments" count={(rec.payments || []).length || null}><PaymentHistory rec={rec} /></XCard>
    </>);

  }

  // expanded-record CSS (shared)
  if (typeof document !== 'undefined' && !document.getElementById('detail-record')) {
    const s = document.createElement('style');
    s.id = 'detail-record';
    s.textContent = `
  .xr-empty{ padding:12px 2px 14px; font-size:12.5px; color:var(--wf-faint); }
  .xr-list{ padding:4px 0 8px; }
  .xr-row{ display:flex; gap:11px; padding:10px 2px; border-top:1px solid var(--wf-line2); }
  .xr-row:first-child{ border-top:none; }
  .xr-num{ width:18px; flex:none; font-size:12px; font-weight:800; color:var(--wf-faint); text-align:center; }
  .xr-ic{ width:18px; flex:none; display:flex; justify-content:center; margin-top:1px; }
  .xr-main{ flex:1; min-width:0; }
  .xr-t{ font-size:13px; font-weight:700; color:var(--wf-ink); text-wrap:pretty; }
  .xr-s{ font-size:11.5px; color:var(--wf-muted); margin-top:2px; }
  .xr-tag{ font-weight:800; color:var(--wf-strong); }
  .xr-tag.pend{ color:#c2680a; }
  .xr-map{ position:relative; height:96px; margin:10px 0; border-radius:11px; overflow:hidden;
    background:#eef1f6; border:1px solid var(--wf-line2); }
  .xr-map-grid{ position:absolute; inset:0;
    background-image:linear-gradient(rgba(140,150,170,.18) 1px,transparent 1px),
      linear-gradient(90deg,rgba(140,150,170,.18) 1px,transparent 1px); background-size:22px 22px; }
  .xr-map-pin{ position:absolute; left:50%; top:46%; transform:translate(-50%,-50%); z-index:2;
    filter:drop-shadow(0 3px 5px rgba(46,107,255,.35)); }
  .xr-actions{ display:flex; gap:8px; }
  .xr-act{ flex:1; display:flex; align-items:center; justify-content:center; gap:6px; height:36px; border-radius:10px;
    border:1px solid var(--wf-line); background:#fff; font-size:12px; font-weight:800; color:var(--wf-strong); }
  .xr-act.xr-act-inline{ flex:none; align-self:flex-start; display:inline-flex; height:30px; padding:0 12px; }
  /* persistent document upload (foot of Documents tab) */
  .docup{ margin:8px 2px 2px; padding:13px; border:1px dashed var(--wf-line); border-radius:13px; background:#fbfcff; }
  .docup-drop{ display:flex; align-items:flex-start; gap:11px; }
  .docup-ic{ width:38px; height:38px; flex:none; border-radius:10px; display:flex; align-items:center; justify-content:center;
    background:#eaf1ff; }
  .docup-main{ flex:1; min-width:0; }
  .docup-t{ font-size:13px; font-weight:800; color:var(--wf-ink); }
  .docup-s{ font-size:11.5px; color:var(--wf-muted); margin-top:2px; line-height:1.4; }
  .docup-row{ display:flex; gap:8px; margin-top:11px; }
  .docup-btn{ flex:1; display:inline-flex; align-items:center; justify-content:center; gap:6px; height:36px;
    border-radius:10px; border:1px solid var(--wf-line); background:#fff; font-size:12px; font-weight:800;
    color:var(--wf-strong); cursor:pointer; }
  .xr-note{ display:flex; gap:6px; align-items:flex-start; margin-top:10px; font-size:11px; color:var(--wf-muted);
    line-height:1.4; }
  .xr-doc{ display:flex; align-items:center; gap:11px; padding:10px 2px; border-top:1px solid var(--wf-line2); }
  .xr-doc:first-child{ border-top:none; }
  .xr-doc-ic{ width:34px; height:34px; border-radius:9px; flex:none; display:flex; align-items:center;
    justify-content:center; background:var(--wf-fill); }
  .xr-doc-dl{ flex:none; display:flex; padding:4px; }
  .xr-pay{ display:flex; align-items:center; gap:11px; padding:10px 2px; border-top:1px solid var(--wf-line2); }
  .xr-pay:first-child{ border-top:none; }
  .xr-pay-amt{ text-align:right; flex:none; }
  .xr-amt{ font-size:13.5px; font-weight:800; color:var(--wf-ink); }
  .xr-amt.over{ color:var(--money); }
  .xr-pstatus{ font-size:11px; font-weight:700; color:var(--wf-faint); margin-top:1px; }
  .xr-pstatus.paid{ color:#19a558; }
  .xr-pstatus.over{ color:var(--money); }
  .xr-quote{ display:flex; align-items:center; gap:11px; padding:11px; margin-top:6px; border-radius:11px;
    background:#e9f1ff; border:1px solid #cfe0ff; }
  .xr-quote .xr-t{ color:#1d52cc; }
  .xr-quote .xr-s{ color:#3a6bd0; }

  /* promoted timeline zone (reassurance anchor) */
  .tlzone{ margin:14px 14px 0; background:#fff; border:1px solid var(--wf-line); border-radius:16px;
    overflow:hidden; }
  .tlzone-h{ display:flex; align-items:center; gap:9px; padding:11px 14px; background:#fbfbfc;
    border-bottom:1px solid var(--wf-line2); }
  .tlzone-h .tlz-ic{ display:flex; }
  .tlzone-h .tlz-t{ font-size:13px; font-weight:800; color:var(--wf-ink); }
  .tlzone .tline{ padding:10px 14px 12px; }

  /* bare timeline — no card, attached to the primary surface (divergence) */
  .tlbare{ margin:18px 0 4px; padding:0 18px; }
  .tlbare .tline{ padding:2px 0 0; }

  /* tabbed record (Overview · Documents · Payments) */
  .rtabs-zone{ margin-top:8px; }
  .rtab-body.fade{ animation:dt-fade .2s ease; }
  @keyframes dt-fade{ from{ opacity:0; transform:translateY(4px); } to{ opacity:1; transform:none; } }
  @media (prefers-reduced-motion: reduce){ .rtab-body.fade{ animation:none; } }
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
  .tcard{ margin:14px 14px 0; background:#fff; border:1px solid var(--wf-line); border-radius:16px;
    overflow:hidden; }
  .tcard-h{ display:flex; align-items:center; gap:9px; padding:11px 14px; background:#fbfbfc;
    border-bottom:1px solid var(--wf-line2); font-size:13px; font-weight:800; color:var(--wf-ink); }
  .tcard-b{ padding:4px 14px 10px; }

  /* timeline */
  .tline{ padding:6px 2px 12px; }
  .tl-row{ display:flex; gap:12px; }
  .tl-spine{ width:24px; flex:none; display:flex; flex-direction:column; align-items:center; }
  .tl-dot{ width:24px; height:24px; border-radius:50%; border:2px solid; display:flex; align-items:center;
    justify-content:center; flex:none; z-index:1; }
  .tl-pulse{ width:9px; height:9px; border-radius:50%; }
  .tl-line{ width:2px; flex:1; min-height:18px; background:var(--wf-line); margin:1px 0; }
  .tl-row.future .tl-line{ background:repeating-linear-gradient(#cfd6e2 0 4px,transparent 4px 8px); }
  .tl-main{ flex:1; min-width:0; padding-bottom:16px; }
  .tl-t{ font-size:13px; font-weight:800; color:var(--wf-ink); display:flex; align-items:center; gap:7px; }
  .tl-row.done .tl-t{ color:var(--wf-faint); }
  .tl-row.done .tl-b{ color:var(--wf-faint); }
  .tl-row.done .tl-d{ color:#c4cad4; }
  .tl-row.future .tl-t{ color:var(--wf-muted); }
  .tl-row.future .tl-b{ color:var(--wf-faint); }
  .tl-row.future .tl-d{ color:var(--wf-faint); }
  .tl-b{ font-size:11.5px; color:var(--wf-muted); margin-top:2px; line-height:1.4; }
  .tl-d{ flex:none; font-size:11px; font-weight:700; color:var(--wf-faint); padding-top:3px; }
  `;
    document.head.appendChild(s);
  }

  Object.assign(window, {
    relCue, CaseFacts, Fact, XCard, ViolationList, CourtInfo, DocList,
    PaymentHistory, Timeline, TimelineZone, HelpZone, ExpandedRecord, DetailTabs, TabCard
  });

})();