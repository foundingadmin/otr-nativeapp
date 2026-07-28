// case-chat-kit.jsx — the case chat surface: an audit log that is also a chat.
// Punch-list item E. Everything is built from ONE unified case-action entry
// component (ActionEntry) plus a normal chat Message bubble, so the legacy
// client-side / firm-side / system action cards collapse to a single styling.
//
// Governing rules encoded here:
//  • Decided display pattern — an action TOAST (Case accepted, Counter offer
//    sent, …) renders as a system entry; the firm's required human message
//    renders as a NORMAL chat bubble directly beneath it, tied by adjacency
//    (same sender, same time). The offer/detail block stays attached to the
//    toast; the message is itself, never encapsulated inside the toast.
//  • Item G firewall — timestamped log entries are permanent and never mutate.
//    No state-changing CTA lives inside a historical action entry. A resolving
//    CTA lives on a PERSISTENT surface (PinnedActionBar at the top), never in
//    the log row.
/* __IIFE__ */ ;(function(){
const { Attorney } = window;
const { FeatureIcon: FI } = window.OffTheRecordDesignSystem_6eff96;

// ── tone system (matches the detail-kit severity hues; brand blue for info) ──
// ink = headline color; sub = secondary copy inside the same tinted container
// (a bit lighter than ink, same hue, so it reads secondary without going gray).
const CC_TONE = {
  success:  { bg:'#e9f7ef', line:'#c6e8d5', ink:'#127a43', sub:'#2f8a5b', ic:'#19a558' },
  warning:  { bg:'#fff4e3', line:'#f2dcaf', ink:'#8a5206', sub:'#a56a1e', ic:'#c2680a' },
  critical: { bg:'#fdeceb', line:'#f6cbc6', ink:'#b3271b', sub:'#c4483c', ic:'#e5463a' },
  info:     { bg:'#e9f1ff', line:'#cfe0ff', ink:'#1d52cc', sub:'#4269d1', ic:'#2e6bff' },
  neutral:  { bg:'#f4f5f7', line:'#e5e7ec', ink:'#40444d', sub:'#6b7280', ic:'#7b8595' },
};

// ── the case-action variant set (build for future additions) ───────────────
// actor: firm | client | system(automated). Most actions are firm-performed;
// some are client-performed (accept/decline a counter offer).
const CC_ACTIONS = {
  accepted:        { actor:'firm',   tone:'success',  icon:'folder-check',          title:'Case accepted' },
  declined:        { actor:'firm',   tone:'neutral',  icon:'folder-remove',         title:'Case declined' },
  cancelled:       { actor:'firm',   tone:'neutral',  icon:'folder-remove',         title:'Case cancelled' },
  counterSent:     { actor:'firm',   tone:'warning',  icon:'scale-balanced',        title:'Counter offer sent' },
  counterAccepted: { actor:'client', tone:'success',  icon:'check-thick',           title:'Counter offer accepted' },
  counterDeclined: { actor:'client', tone:'neutral',  icon:'delete-circle',         title:'Counter offer declined' },
  counterWithdrawn:{ actor:'firm',   tone:'neutral',  icon:'delete-circle',         title:'Counter offer withdrawn' },
  resolved:        { actor:'firm',   tone:'success',  icon:'folder-star-favorite',  title:'Case resolved' },
  paymentFailed:   { actor:'system', tone:'critical', icon:'bill-dollar-2',         title:'Payment failed' },
};

const actorLabel = (cfg, firm) =>
  cfg.actor === 'firm' ? firm : cfg.actor === 'client' ? 'You' : 'OTR · automated';

// ── the offer / detail block that stays attached to a counter-offer toast ──
function OfferBlock({ offer, tone }){
  return (
    <div className="cc-offer">
      <div className="cc-offer-row">
        <span className="cc-offer-k" style={{ color:tone.sub }}>Revised quote</span>
        <span className="cc-offer-v"><s>${offer.from}</s><span className="cc-offer-now">${offer.to}</span></span>
      </div>
      {offer.terms && <div className="cc-offer-note" style={{ color:tone.sub }}>{offer.terms}</div>}
    </div>
  );
}

// ── THE unified case-action entry (a permanent, non-mutating log toast) ─────
// note / attach / actor label are per-action optional (show/hide). Devs build
// each as a toggle; defaults lean less-is-more.
function ActionEntry({ kind, firm='Park & Vance', time='2:14 PM', note, attach, offer,
  showActor=true, compact=false }){
  const cfg = CC_ACTIONS[kind];
  const t = CC_TONE[cfg.tone];
  const mine = cfg.actor === 'client';
  return (
    <div className={`cc-action${compact ? ' compact' : ''}${mine ? ' mine' : ''}`} style={{ background:t.bg, borderColor:t.line }}>
      <div className="cc-action-head">
        <span className="cc-ic" style={{ borderColor:t.line }}><FI name={cfg.icon} size={15} color={t.ic} /></span>
        <div className="cc-ah-main">
          <div className="cc-title" style={{ color:t.ink }}>{cfg.title}</div>
          {showActor && <div className="cc-actor" style={{ color:t.sub }}>{actorLabel(cfg, firm)}</div>}
        </div>
        <span className="cc-time">{time}</span>
      </div>
      {offer && <OfferBlock offer={offer} tone={t} />}
      {note && <div className="cc-note" style={{ color:t.sub }}>{note}</div>}
      {attach && <div className="cc-attach" style={{ borderColor:t.line }}>
        <FI name="file-document-info-quick-reference" size={13} color={t.ic} />
        <span className="cc-attach-n">{attach}</span>
        <FI name="download-tray" size={13} color="var(--wf-faint)" />
      </div>}
    </div>
  );
}

// ── a normal chat message bubble (the human message, rendered as itself) ───
function Message({ side='firm', text, time, firstOfGroup=true }){
  const me = side === 'me';
  return (
    <div className={`cc-msg ${me ? 'me' : 'firm'}`}>
      {!me && <div className="cc-av">{firstOfGroup ? <Attorney size={28} /> : null}</div>}
      <div className="cc-msg-col">
        <div className="cc-bubble">{text}</div>
        {time && <div className="cc-mtime">{time}</div>}
      </div>
    </div>
  );
}

// ── a slim inline system chip (approach E · compact system rows) ───────────
function SystemChip({ kind, firm='Park & Vance', time }){
  const cfg = CC_ACTIONS[kind];
  const t = CC_TONE[cfg.tone];
  return (
    <div className="cc-chip">
      <span className="cc-chip-ic" style={{ background:t.bg, borderColor:t.line }}><FI name={cfg.icon} size={12} color={t.ic} /></span>
      <span className="cc-chip-t">{cfg.title}</span>
      {time && <span className="cc-chip-time">{time}</span>}
    </div>
  );
}

// ── date divider (audit-log framing) ───────────────────────────────────────
function DayDivider({ children }){
  return <div className="cc-day"><span>{children}</span></div>;
}

// ── the persistent resolving-action surface (item G) ───────────────────────
// Any CTA that changes state lives HERE, above the sealed log, never inside a
// log entry. Pinned to the top of the thread.
function PinnedActionBar({ tone='warning', icon='scale-balanced', title, sub, cta }){
  const t = CC_TONE[tone];
  return (
    <div className="cc-pinned" style={{ background:t.bg, borderColor:t.line }}>
      <span className="cc-pinned-ic" style={{ borderColor:t.line }}><FI name={icon} size={16} color={t.ic} /></span>
      <div className="cc-pinned-main">
        <div className="cc-pinned-t" style={{ color:t.ink }}>{title}</div>
        {sub && <div className="cc-pinned-s" style={{ color:t.sub }}>{sub}</div>}
      </div>
      <span className="cc-pinned-cta" style={{ background:t.ic }}>{cta}<FI name="chevron-right" size={12} color="#fff" /></span>
    </div>
  );
}

// ── the phone shell for a chat screen ──────────────────────────────────────
function ChatScreen({ firm='Park & Vance', caseId='OTR-48144', height, pinned, composer=true, children }){
  return (
    <div className="otr cc-screen" style={height ? { height } : null}>
      <div className="cc-statusbar"><span>9:41</span><span className="dots"><i /><i /><i style={{ width:18 }} /></span></div>
      <div className="cc-appbar">
        <div className="cc-nav"><FI name="chevron-left" size={16} color="var(--wf-strong)" /></div>
        <div className="cc-appbar-id"><Attorney size={30} /></div>
        <div className="cc-who">
          <div className="cc-who-t">{firm}</div>
          <div className="cc-who-s">Case chat · {caseId}</div>
        </div>
        <div className="cc-nav"><svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor"><circle cx="9" cy="3.5" r="1.5" /><circle cx="9" cy="9" r="1.5" /><circle cx="9" cy="14.5" r="1.5" /></svg></div>
      </div>
      {pinned}
      <div className="cc-log">{children}</div>
      {composer && (
        <div className="cc-composer">
          <div className="cc-plus"><FI name="add-circle" size={20} color="var(--wf-faint)" /></div>
          <div className="cc-input">Message your law firm…</div>
          <div className="cc-send"><FI name="paper-plane" size={15} color="#fff" /></div>
        </div>
      )}
    </div>
  );
}

// ── CSS ────────────────────────────────────────────────────────────────────
if (typeof document !== 'undefined' && !document.getElementById('case-chat-kit')) {
  const s = document.createElement('style');
  s.id = 'case-chat-kit';
  s.textContent = `
  .cc-screen{ width:390px; background:#f6f7f9; display:flex; flex-direction:column;
    border-radius:22px; border:1px solid #dfe4ef; box-shadow:0 8px 30px rgba(20,30,60,.12);
    overflow:hidden; position:relative; }
  .cc-statusbar{ height:30px; display:flex; align-items:center; justify-content:space-between;
    padding:0 18px 0 22px; font-size:13px; font-weight:600; color:var(--wf-strong); flex:none; background:#fff; }
  .cc-statusbar .dots{ display:flex; gap:5px; align-items:center; }
  .cc-statusbar .dots i{ width:15px; height:9px; border-radius:2px; background:var(--wf-strong); opacity:.85; }
  /* app bar */
  .cc-appbar{ display:flex; align-items:center; gap:10px; padding:7px 12px 9px; background:#fff; flex:none;
    border-bottom:1px solid var(--wf-line2); position:relative; z-index:4; }
  .cc-nav{ width:32px; height:32px; border-radius:50%; display:flex; align-items:center; justify-content:center;
    color:var(--wf-strong); flex:none; }
  .cc-nav:first-child{ margin-right:-4px; }
  .cc-appbar-id{ flex:none; display:flex; }
  .cc-who{ flex:1; min-width:0; }
  .cc-who-t{ font-size:14.5px; font-weight:800; letter-spacing:-.2px; color:var(--wf-ink);
    white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
  .cc-who-s{ font-size:11px; font-weight:600; color:var(--wf-faint); letter-spacing:.2px; }

  /* the log / thread */
  .cc-log{ flex:1; min-height:0; display:flex; flex-direction:column; justify-content:flex-end; gap:10px;
    padding:14px 14px 16px; overflow:hidden; }
  .cc-log.dense{ gap:7px; }

  /* action entry (permanent log toast — no state CTA inside, item G) */
  .cc-action{ align-self:flex-start; max-width:86%; border:1px solid; border-radius:15px; padding:11px 12px; }
  /* inside a thread, a toast shares the exact axis + width of the message it's
     tied to: firm/system toasts align to the firm bubble (past the 36px avatar
     gutter); client-performed toasts align right with the user's own bubbles. */
  .cc-log .cc-action{ margin-left:36px; max-width:calc(84% - 36px); }
  .cc-log .cc-action.mine{ align-self:flex-end; margin-left:0; margin-right:0; max-width:84%; }
  .cc-action.compact{ padding:9px 11px; border-radius:13px; }
  .cc-action-head{ display:flex; align-items:flex-start; gap:10px; }
  .cc-action .cc-ic{ width:28px; height:28px; border-radius:9px; flex:none; display:flex;
    align-items:center; justify-content:center; background:#fff; border:1px solid; }
  .cc-ah-main{ flex:1; min-width:0; }
  .cc-title{ font-size:13.5px; font-weight:800; letter-spacing:-.1px; line-height:1.25; }
  .cc-actor{ font-size:10.5px; font-weight:700; color:var(--wf-faint); margin-top:2px;
    letter-spacing:.2px; text-wrap:pretty; }
  .cc-time{ flex:none; font-size:10.5px; font-weight:700; color:var(--wf-faint); padding-top:2px; white-space:nowrap; }
  .cc-note{ font-size:12px; line-height:1.45; margin-top:8px; opacity:.9; text-wrap:pretty; }
  .cc-attach{ display:inline-flex; align-items:center; gap:7px; margin-top:9px; padding:6px 10px;
    background:#fff; border:1px solid; border-radius:999px; font-size:11.5px; font-weight:700; color:var(--wf-strong); }
  .cc-attach-n{ max-width:180px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }

  /* attached offer/detail block */
  .cc-offer{ margin-top:9px; background:rgba(255,255,255,.72); border:1px solid rgba(0,0,0,.05);
    border-radius:11px; padding:9px 11px; }
  .cc-offer-row{ display:flex; align-items:center; justify-content:space-between; gap:8px; }
  .cc-offer-k{ font-size:11px; font-weight:700; color:var(--wf-muted); letter-spacing:.2px; }
  .cc-offer-v{ font-size:13px; font-weight:800; color:var(--wf-faint); }
  .cc-offer-v s{ opacity:.65; font-weight:700; margin-right:6px; }
  .cc-offer-now{ color:var(--wf-ink); font-size:15px; }
  .cc-offer-note{ font-size:11px; color:var(--wf-muted); margin-top:5px; line-height:1.4; text-wrap:pretty; }

  /* chat message bubble */
  .cc-msg{ display:flex; gap:8px; max-width:84%; }
  .cc-msg.firm{ align-self:flex-start; }
  .cc-msg.me{ align-self:flex-end; flex-direction:row-reverse; }
  .cc-av{ width:28px; height:28px; flex:none; align-self:flex-end; }
  .cc-msg-col{ min-width:0; display:flex; flex-direction:column; }
  .cc-msg.me .cc-msg-col{ align-items:flex-end; }
  .cc-bubble{ padding:9px 12px; border-radius:16px; font-size:13px; line-height:1.42; text-wrap:pretty; }
  .cc-msg.firm .cc-bubble{ background:#fff; border:1px solid var(--wf-line); color:var(--wf-ink);
    border-bottom-left-radius:5px; }
  .cc-msg.me .cc-bubble{ background:var(--otr-blue); color:#fff; border-bottom-right-radius:5px; }
  .cc-mtime{ font-size:10px; font-weight:600; color:var(--wf-faint); margin:3px 4px 0; }

  /* the adjacency cluster: action toast + its firm message, grouped tight */
  .cc-cluster{ display:flex; flex-direction:column; gap:6px; align-self:stretch; }
  .cc-cluster .cc-msg{ margin-left:2px; }

  /* slim inline system chip (compact approach) */
  .cc-chip{ display:flex; align-items:center; gap:8px; align-self:center; padding:4px 12px 4px 5px;
    background:#fff; border:1px solid var(--wf-line); border-radius:999px; }
  .cc-chip-ic{ width:20px; height:20px; border-radius:50%; border:1px solid; display:flex;
    align-items:center; justify-content:center; flex:none; }
  .cc-chip-t{ font-size:11.5px; font-weight:700; color:var(--wf-strong); }
  .cc-chip-time{ font-size:10.5px; font-weight:600; color:var(--wf-faint); }

  /* date divider */
  .cc-day{ display:flex; align-items:center; gap:10px; align-self:stretch; margin:2px 0; }
  .cc-day::before, .cc-day::after{ content:''; flex:1; height:1px; background:var(--wf-line); }
  .cc-day span{ font-size:10.5px; font-weight:800; letter-spacing:.6px; text-transform:uppercase;
    color:var(--wf-faint); }

  /* persistent resolving-action surface (item G) */
  .cc-pinned{ display:flex; align-items:center; gap:10px; padding:10px 12px; border-bottom:1px solid;
    flex:none; position:relative; z-index:3; }
  .cc-pinned-ic{ width:30px; height:30px; border-radius:9px; flex:none; display:flex; align-items:center;
    justify-content:center; background:#fff; border:1px solid; }
  .cc-pinned-main{ flex:1; min-width:0; }
  .cc-pinned-t{ font-size:12.5px; font-weight:800; letter-spacing:-.1px; }
  .cc-pinned-s{ font-size:11px; color:var(--wf-muted); margin-top:1px; line-height:1.35; text-wrap:pretty; }
  .cc-pinned-cta{ flex:none; display:inline-flex; align-items:center; gap:3px; height:32px; padding:0 12px;
    border-radius:999px; color:#fff; font-size:12px; font-weight:800; white-space:nowrap; }

  /* composer */
  .cc-composer{ display:flex; align-items:center; gap:9px; padding:10px 12px; background:#fff;
    border-top:1px solid var(--wf-line2); flex:none; }
  .cc-plus{ flex:none; display:flex; }
  .cc-input{ flex:1; height:38px; display:flex; align-items:center; padding:0 14px; border-radius:999px;
    background:var(--wf-fill); border:1px solid var(--wf-line); font-size:12.5px; color:var(--wf-faint); }
  .cc-send{ width:38px; height:38px; border-radius:50%; flex:none; display:flex; align-items:center;
    justify-content:center; background:var(--otr-blue); }

  /* small study caption under an artboard */
  .cc-cap{ font-size:11.5px; line-height:1.5; color:var(--wf-muted); text-wrap:pretty; }
  `;
  document.head.appendChild(s);
}

Object.assign(window, {
  CC_TONE, CC_ACTIONS, ActionEntry, OfferBlock, Message, SystemChip, DayDivider,
  PinnedActionBar, ChatScreen,
});
})();
