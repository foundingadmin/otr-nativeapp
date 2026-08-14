// case-shell.jsx — the full Case Details screen shell for the Ticket/Case split.
// New hero direction (no ticket-photo hero): white identity block, issued
// eyebrow over a large location headline, lifecycle badge at the right.
// Below it the legal-team card (the door into case chat), the persistent
// action toast, then the two-level tab group: Ticket (static, from the
// citation) vs Case (dynamic), with Overview / Documents / Payments living
// inside Case.
/* __IIFE__ */ ;(function(){
const { useState } = React;
const { StatusBadge, Attorney, Stars } = window;
const { FeatureIcon: FI } = window.OffTheRecordDesignSystem_6eff96;

const CASE = {
  caseId: 'OTR-12345', status: 'active',
  issued: 'Issued · Feb 2026', place: 'Riverside, CA',
  firm: { name: 'Park & Vance', attorney: 'Helen Vance', rating: 4.8, unread: 2,
    last: 'Helen: Notice of appearance is filed. Nothing needed from you.' },
};

if (typeof document !== 'undefined' && !document.getElementById('fcd-shell')) {
  const s = document.createElement('style');
  s.id = 'fcd-shell';
  s.textContent = `
  /* app bar — back · Case ID #… · chat (variant) · overflow */
  .cbar{ display:flex; align-items:center; gap:6px; padding:6px 12px 10px; background:#fff; flex:none;
    border-bottom:1px solid var(--wf-line2); position:relative; z-index:4; }
  .cbar .nav{ width:36px; height:36px; border-radius:50%; display:flex; align-items:center; justify-content:center;
    color:var(--wf-strong); flex:none; position:relative; cursor:pointer; }
  .cbar .nav:hover{ background:var(--wf-fill); }
  .cbar .ctitle{ flex:1; min-width:0; text-align:center; font-size:15px; font-weight:700; color:var(--wf-muted);
    white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
  .cbar .ctitle b{ font-weight:800; color:var(--wf-ink); }
  .cbar .cright{ display:flex; align-items:center; gap:2px; flex:none; }
  .cbar .ndot{ position:absolute; top:3px; right:2px; min-width:16px; height:16px; padding:0 4px; border-radius:999px;
    background:var(--otr-blue); color:#fff; font-size:10px; font-weight:800; font-style:normal; line-height:16px;
    text-align:center; box-shadow:0 0 0 2px #fff; }

  /* hero — white identity block */
  .chero{ background:#fff; padding:18px 20px 20px; flex:none; }
  .chero-top{ display:flex; align-items:center; justify-content:space-between; gap:10px; }
  .chero-eyebrow{ font-size:11.5px; font-weight:800; letter-spacing:.9px; text-transform:uppercase; color:var(--wf-muted); }
  .chero-h1{ margin:7px 0 0; font-size:32px; line-height:1.08; font-weight:800; letter-spacing:-1px;
    color:var(--wf-ink); text-wrap:balance; }
  .chero-meta{ display:flex; align-items:center; gap:7px; margin-top:9px; font-size:12.5px; color:var(--wf-muted); }
  .chero-meta .cm-cd{ font-weight:800; color:var(--wf-strong); }

  /* legal team card — firm identity, unread preview, whole card opens chat */
  .lteam{ margin:14px 14px 0; background:#fff; border:1px solid var(--wf-line); border-radius:18px; padding:14px;
    box-shadow:0 2px 10px rgba(16,24,40,.05); }
  .lteam.tap{ cursor:pointer; }
  .lteam.tap:hover{ box-shadow:0 6px 18px rgba(16,24,40,.1); }
  .lt-row{ display:flex; align-items:center; gap:12px; }
  .lt-main{ flex:1; min-width:0; }
  .lt-eyebrow{ font-size:10px; font-weight:800; letter-spacing:.8px; text-transform:uppercase; color:var(--wf-faint); }
  .lt-name{ font-size:17px; font-weight:800; letter-spacing:-.3px; color:var(--wf-ink); margin-top:2px;
    white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
  .lt-sub{ display:flex; align-items:center; gap:6px; margin-top:4px; font-size:12.5px; color:var(--wf-muted);
    min-width:0; }
  .lt-sub .sep{ color:var(--wf-line); }
  .lt-sub .who{ overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
  .lt-chev{ flex:none; display:flex; }
  .lt-msg{ display:flex; align-items:center; gap:9px; margin-top:12px; padding:10px 11px; border-radius:12px;
    background:#f6f8fd; border:1px solid #e6ecf9; }
  .lt-msg .lm-t{ flex:1; min-width:0; font-size:12px; color:var(--wf-strong); line-height:1.35;
    display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
  .lt-msg .lm-n{ flex:none; min-width:19px; height:19px; padding:0 6px; border-radius:999px; background:var(--otr-blue);
    color:#fff; font-size:11px; font-weight:800; display:inline-flex; align-items:center; justify-content:center; }
  .lt-quiet{ margin-top:11px; padding-top:11px; border-top:1px solid var(--wf-line2); display:flex; align-items:center;
    gap:7px; font-size:11.5px; color:var(--wf-faint); }

  /* persistent action toast — sits above the tabs, stays put on every tab */
  .atoast{ display:flex; align-items:center; gap:11px; margin:12px 14px 0; padding:11px 12px; border-radius:14px;
    background:#e9f1ff; border:1px solid #cfe0ff; }
  .atoast .at-ic{ width:32px; height:32px; border-radius:10px; flex:none; display:flex; align-items:center;
    justify-content:center; background:#d8e6ff; }
  .atoast .at-tx{ flex:1; min-width:0; }
  .atoast .at-t{ display:block; font-size:12.5px; font-weight:800; color:#1d52cc; line-height:1.3; }
  .atoast .at-s{ display:block; font-size:11.5px; color:#3a6bd0; margin-top:2px; line-height:1.35; }
  .atoast .at-cta{ flex:none; height:32px; padding:0 14px; border-radius:999px; background:var(--otr-blue); color:#fff;
    font-size:12.5px; font-weight:800; display:inline-flex; align-items:center; }

  /* two-level tabs — segmented Ticket|Case, then underline sub-tabs in Case */
  .ttabs{ margin:14px 14px 0; padding:3px; border-radius:999px; background:#eef0f4; display:flex; gap:3px; }
  .ttab{ flex:1; height:38px; border-radius:999px; display:flex; align-items:center; justify-content:center; gap:7px;
    font-size:13.5px; font-weight:800; color:var(--wf-muted); cursor:pointer; }
  .ttab.on{ background:#fff; color:var(--wf-ink); box-shadow:0 1px 3px rgba(16,24,40,.12); }
  .stabs{ display:flex; gap:18px; margin:0 16px; padding:13px 0 0; border-bottom:1px solid var(--wf-line); }
  .stab{ padding-bottom:9px; font-size:13px; font-weight:800; color:var(--wf-faint); cursor:pointer;
    border-bottom:2px solid transparent; margin-bottom:-1px; display:flex; align-items:center; gap:6px; }
  .stab.on{ color:var(--wf-ink); border-bottom-color:var(--otr-blue); }
  .stab .sn{ font-size:10px; font-weight:800; min-width:16px; height:16px; padding:0 4px; border-radius:999px;
    background:var(--wf-fill); color:var(--wf-muted); display:inline-flex; align-items:center; justify-content:center; }
  .stab.on .sn{ background:#e9f1ff; color:var(--otr-blue); }
  .tabbody{ padding-bottom:24px; animation:fcd-fade .18s ease; }
  @keyframes fcd-fade{ from{ opacity:0; transform:translateY(4px); } to{ opacity:1; transform:none; } }
  @media (prefers-reduced-motion: reduce){ .tabbody{ animation:none; } }
  `;
  document.head.appendChild(s);
}

function CScreen({ children, chat = false, height }) {
  return (
    <div className="otr dscreen" style={height ? { height } : null}>
      <div className="dstatus"><span>9:41</span><span className="dots"><i /><i /><i style={{ width: 18 }} /></span></div>
      <div className="cbar">
        <div className="nav"><FI name="chevron-left" size={16} color="var(--wf-strong)" /></div>
        <div className="ctitle"><b>Case ID</b> #{CASE.caseId}</div>
        <div className="cright">
          {chat && <div className="nav">
            <FI name="chat-bubble-oval-smiley-1" size={19} color="var(--wf-strong)" />
            <i className="ndot">{CASE.firm.unread}</i>
          </div>}
          <div className="nav"><svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor"><circle cx="9" cy="3.5" r="1.5" /><circle cx="9" cy="9" r="1.5" /><circle cx="9" cy="14.5" r="1.5" /></svg></div>
        </div>
      </div>
      <div className="dbody">{children}</div>
    </div>
  );
}

function CHero() {
  return (
    <div className="chero">
      <div className="chero-top">
        <span className="chero-eyebrow">{CASE.issued}</span>
        <StatusBadge status="active" />
      </div>
      <h1 className="chero-h1">{CASE.place}</h1>
      <div className="chero-meta">
        <FI name="countdown-timer" size={13} color="var(--wf-faint)" />
        Court date <span className="cm-cd">Apr 18, 2026</span>
      </div>
    </div>
  );
}

// preview = unread message line inside the card · tap = whole card opens chat
function LegalTeam({ preview = true, tap = true }) {
  const f = CASE.firm;
  return (
    <div className={`lteam${tap ? ' tap' : ''}`}>
      <div className="lt-row">
        <Attorney size={54} />
        <div className="lt-main">
          <div className="lt-eyebrow">Your legal team</div>
          <div className="lt-name">{f.name}</div>
          <div className="lt-sub">
            <Stars rating={f.rating} size={11} />
            <span className="sep">·</span>
            <span className="who">{f.attorney}</span>
          </div>
        </div>
        {tap && <span className="lt-chev"><FI name="chevron-right" size={13} color="var(--wf-faint)" /></span>}
      </div>
      {preview ?
        <div className="lt-msg">
          <FI name="chat-bubble-oval-smiley-1" size={16} color="var(--otr-blue)" />
          <span className="lm-t">{f.last}</span>
          <span className="lm-n">{f.unread}</span>
        </div> :
        <div className="lt-quiet">
          <FI name="shield-check" size={13} color="var(--wf-faint)" />
          Handling your case since Feb 06, 2026
        </div>}
    </div>
  );
}

function ActionToast() {
  return (
    <div className="atoast">
      <span className="at-ic"><FI name="user-identifier-card" size={17} color="#1d52cc" /></span>
      <span className="at-tx">
        <span className="at-t">Your driver’s license was requested</span>
        <span className="at-s">Park &amp; Vance needs a photo to file with the court</span>
      </span>
      <span className="at-cta">Upload</span>
    </div>
  );
}

// initial: 'ticket' | 'overview' | 'docs' | 'pay'
// chatEntry: 'card' | 'appbar' | 'both'
function CaseDetailScreen({ initial = 'overview', chatEntry = 'card', ticketPhoto = true, toast = true, payVariant = 'a', height, crop = false }) {
  const [top, setTop] = useState(initial === 'ticket' ? 'ticket' : 'case');
  const [sub, setSub] = useState(initial === 'ticket' ? 'overview' : initial);
  const cardEntry = chatEntry === 'card' || chatEntry === 'both';
  const barEntry = chatEntry === 'appbar' || chatEntry === 'both';
  const { TicketTab, OverviewTab, DocsTab, PayTab, DOCS, LINE_ITEMS } = window;
  return (
    <CScreen chat={barEntry} height={height}>
      <CHero />
      <LegalTeam preview={cardEntry} tap={cardEntry} />
      {toast && <ActionToast />}
      {!crop && <>
        <div className="ttabs">
          <div className={`ttab${top === 'ticket' ? ' on' : ''}`} onClick={() => setTop('ticket')}>
            <FI name="padlock-circle-2" size={13} color={top === 'ticket' ? 'var(--wf-ink)' : 'var(--wf-faint)'} />Ticket
          </div>
          <div className={`ttab${top === 'case' ? ' on' : ''}`} onClick={() => setTop('case')}>
            <FI name="open-folder" size={14} color={top === 'case' ? 'var(--wf-ink)' : 'var(--wf-faint)'} />Case
          </div>
        </div>
        {top === 'ticket' ?
          <div className="tabbody" key="ticket"><TicketTab photo={ticketPhoto} /></div> :
          <>
            <div className="stabs">
              {[['overview', 'Overview', null], ['docs', 'Documents', DOCS.length], ['pay', 'Payments', null]].map(([id, label, n]) =>
                <div key={id} className={`stab${sub === id ? ' on' : ''}`} onClick={() => setSub(id)}>
                  {label}{n != null && <span className="sn">{n}</span>}
                </div>
              )}
            </div>
            <div className="tabbody" key={sub}>
              {sub === 'overview' && <OverviewTab />}
              {sub === 'docs' && <DocsTab />}
              {sub === 'pay' && <PayTab variant={payVariant} />}
            </div>
          </>}
      </>}
    </CScreen>
  );
}

Object.assign(window, { CASE, CScreen, CHero, LegalTeam, ActionToast, CaseDetailScreen });

})();
