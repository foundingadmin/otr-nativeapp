// detail-kit.jsx — Case Details page kit: CSS, rich fixtures, the phone-screen
// shell, and the four-zone primitives (account rail · identity/ticket hero ·
// status zone · prioritized Action-needed hub · case facts). Builds on
// core-kit (StatusBadge, OTR_STATUS, OTR_TONE, Attorney, Stars, Ticket).
// Wireframe-neutral; real color reserved for status badges + the severity
// system (critical red · warning amber · success green · info blue).
/* __IIFE__ */;(function () {
  const { StatusBadge, OTR_STATUS, OTR_TONE, Attorney, Stars, Confetti } = window;
  const { FeatureIcon: FI } = window.OffTheRecordDesignSystem_6eff96;

  // ── severity system (§6a) — the formalized hierarchy ──────────────────────
  // critical always outranks warning in both position and visual prominence.
  const SEVERITY = {
    critical: { rank: 4, label: 'Critical', bg: 'var(--red-50)', line: 'var(--red-200)', ink: 'var(--red-900)', ic: 'var(--red-600)', dot: 'var(--red-600)', icon: 'warning-octagon' },
    warning: { rank: 3, label: 'Warning', bg: 'var(--amber-50)', line: 'var(--amber-200)', ink: 'var(--amber-900)', ic: 'var(--amber-500)', dot: 'var(--amber-500)', icon: 'warning-triangle' },
    info: { rank: 2, label: 'Info', bg: 'var(--blue-50)', line: 'var(--blue-200)', ink: 'var(--blue-900)', ic: 'var(--blue-600)', dot: 'var(--blue-600)', icon: 'information-circle' },
    success: { rank: 1, label: 'Success', bg: 'var(--green-50)', line: 'var(--green-200)', ink: 'var(--green-900)', ic: 'var(--green-600)', dot: 'var(--green-600)', icon: 'chart-circle-up-growth' }
  };

  // ── one-time CSS ──────────────────────────────────────────────────────────
  if (typeof document !== 'undefined' && !document.getElementById('detail-kit')) {
    const s = document.createElement('style');
    s.id = 'detail-kit';
    s.textContent = `
  .dscreen{ width:390px; background:var(--wf-bg); display:flex; flex-direction:column;
    border-radius:22px; border:1px solid #dfe4ef; box-shadow:0 8px 30px rgba(20,30,60,.12);
    overflow:hidden; position:relative; }
  .dscreen .dstatus{ height:30px; display:flex; align-items:center; justify-content:space-between;
    padding:0 18px 0 22px; font-size:13px; font-weight:600; color:var(--wf-strong); flex:none; background:#fff; }
  .dscreen .dstatus .dots{ display:flex; gap:5px; align-items:center; }
  .dscreen .dstatus .dots i{ width:15px; height:9px; border-radius:2px; background:var(--wf-strong); opacity:.85; }
  /* app bar — back · Case + id · overflow */
  .dappbar{ display:flex; align-items:center; gap:12px; padding:6px 14px 10px; background:#fff; flex:none;
    border-bottom:1px solid var(--wf-line2); position:relative; z-index:4; }
  .dappbar .nav{ width:36px; height:36px; border-radius:50%; display:flex; align-items:center; justify-content:center;
    color:var(--wf-strong); flex:none; cursor:pointer; }
  .dappbar .nav:hover{ background:var(--wf-fill); }
  .dappbar .who{ flex:1; min-width:0; text-align:center; }
  .dappbar .who .t{ font-size:15px; font-weight:800; letter-spacing:-.2px; color:var(--wf-ink); }
  .dappbar .who .id{ font-size:11px; font-weight:700; color:var(--wf-faint); letter-spacing:.3px; }

  .dbody{ display:flex; flex-direction:column; }

  /* zone eyebrow (study annotation, not chrome the user sees in prod) */
  .zlabel{ display:flex; align-items:center; gap:7px; padding:14px 18px 2px; }
  .zlabel .zn{ font-size:9px; font-weight:800; letter-spacing:1px; color:#fff; background:oklch(0.58 0.27 350);
    border-radius:4px; padding:2px 6px; line-height:1; }
  .zlabel .zt{ font-size:11px; font-weight:800; letter-spacing:.5px; text-transform:uppercase; color:oklch(0.58 0.27 350); }

  /* 1 · account-level alert rail (sticky, billing-critical, account-wide) */
  .acct-rail{ display:flex; align-items:center; gap:11px; padding:11px 16px; background:#3a1714;
    color:#ffe3de; font-size:12.5px; position:relative; z-index:3; }
  .acct-rail.warn{ background:#3a2c10; color:#ffeccb; }
  .acct-rail .ar-ic{ flex:none; display:flex; }
  .acct-rail .ar-tx{ flex:1; min-width:0; line-height:1.35; }
  .acct-rail .ar-tx b{ font-weight:800; color:#fff; }
  .acct-rail .ar-cta{ flex:none; display:inline-flex; align-items:center; gap:4px; font-weight:800;
    color:#fff; font-size:12px; white-space:nowrap; }

  /* 2 · identity zone — ticket photo hero */
  .thero{ position:relative; height:208px; overflow:hidden; background:#cfd3da; flex:none; }
  .thero .ph{ position:absolute; inset:0; }
  .thero .ph.hatch{ background:repeating-linear-gradient(135deg,#d8dbe1 0 9px,#cfd3da 9px 18px); }
  .thero .ph.tall{ background:repeating-linear-gradient(135deg,#cdd6e6 0 9px,#c2cce0 9px 18px); }
  .thero .ph.placeholder{ background:linear-gradient(160deg,#e8ecf4,#d6dce8);
    display:flex; align-items:center; justify-content:center; flex-direction:column; gap:9px; color:#9aa6bb; }
  .thero .ph.lowres{ background:repeating-linear-gradient(135deg,#d8dbe1 0 16px,#cfd3da 16px 32px); filter:blur(1.4px); }
  .thero .ph .pwm{ position:absolute; inset:0; display:flex; align-items:center; justify-content:center;
    font-size:10px; font-weight:800; letter-spacing:1.5px; text-transform:uppercase; color:rgba(60,64,72,.4); }
  .thero .scrim{ position:absolute; inset:0; background:linear-gradient(to top,
    rgba(12,16,26,.82) 0%, rgba(12,16,26,.5) 30%, rgba(12,16,26,.04) 58%, rgba(12,16,26,.18) 100%); }
  .thero .ttop{ position:absolute; top:12px; left:12px; right:12px; display:flex; align-items:flex-start;
    justify-content:space-between; gap:8px; }
  /* classification chip — matches the CPC .classif badge shape (rounded rect),
     kept frosted/white so it stays legible on the photo */
  .thero .cls{ display:inline-flex; align-items:center; gap:4px; max-width:60%; font-size:10.5px; font-weight:700;
    letter-spacing:.4px; text-transform:uppercase; color:#fff; background:rgba(16,20,30,.5);
    backdrop-filter:blur(6px); border:1px solid rgba(255,255,255,.18); border-radius:6px; padding:3px 8px; }
  .thero .cls .ct{ overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
  .thero .tbottom{ position:absolute; left:16px; right:16px; bottom:30px; }
  .thero .tbottom .tdate{ font-size:12px; font-weight:700; letter-spacing:.3px; color:rgba(255,255,255,.82);
    text-shadow:0 1px 6px rgba(0,0,0,.35); margin-bottom:3px; }
  .thero .tbottom .tt{ font-size:21px; font-weight:800; letter-spacing:-.4px; color:#fff; line-height:1.15;
    text-shadow:0 1px 8px rgba(0,0,0,.4); text-wrap:balance; }
  .thero .tbottom .ts{ display:flex; align-items:center; gap:7px; margin-top:5px; font-size:12px;
    font-weight:600; color:rgba(255,255,255,.85); }
  .thero .tbottom .ts .ts-cd{ font-weight:700; color:#fff; background:rgba(255,255,255,.18);
    border-radius:999px; padding:1px 8px; font-size:11px; }
  .thero .badge-hold{ filter:drop-shadow(0 2px 6px rgba(0,0,0,.25)); }

  /* attorney identity block (on white, lifts up over hero) */
  .idatt{ margin:-22px 14px 0; position:relative; z-index:2; background:#fff; border:1px solid var(--wf-line);
    border-radius:16px; padding:13px 14px; box-shadow:0 6px 18px rgba(16,24,40,.08);
    display:flex; align-items:center; gap:12px; }
  .idatt .ia-main{ flex:1; min-width:0; }
  .idatt .ia-elig{ font-size:10px; font-weight:800; letter-spacing:.7px; text-transform:uppercase; color:var(--wf-faint); }
  .idatt .ia-name{ font-size:15px; font-weight:800; letter-spacing:-.2px; color:var(--wf-ink); margin-top:1px;
    white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
  .idatt .ia-firm{ display:flex; align-items:center; gap:6px; margin-top:3px; font-size:12px; color:var(--wf-muted);
    min-width:0; }
  .idatt .ia-firm .fn{ overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
  .idatt .ia-place{ position:relative; }
  .att-ph{ position:relative; overflow:hidden; flex:none; border-radius:14px;
    background:linear-gradient(160deg,#e2e6ec 0%,#ccd1da 100%); width:52px; height:52px; }
  .att-ph::before{ content:""; position:absolute; left:50%; top:15%; transform:translateX(-50%);
    width:38%; height:38%; border-radius:50%; background:rgba(84,92,106,.5); }
  .att-ph::after{ content:""; position:absolute; left:50%; bottom:-26%; transform:translateX(-50%);
    width:72%; height:60%; border-radius:50%; background:rgba(84,92,106,.5); }
  .att-ph.blur{ filter:blur(3px); }
  .att-ph.none{ background:linear-gradient(160deg,#eef1f6,#e0e5ee); }
  .att-ph.none::before, .att-ph.none::after{ display:none; }
  .att-ph .qmark{ position:absolute; inset:0; display:flex; align-items:center; justify-content:center; }

  /* reassurance overlay (rematching / not-booked) — replaces attorney identity */
  .id-reassure{ margin:-22px 14px 0; position:relative; z-index:2; background:#fff; border:1px solid var(--wf-line);
    border-radius:16px; padding:14px; box-shadow:0 6px 18px rgba(16,24,40,.08); display:flex; gap:12px; align-items:center; }
  .id-reassure .ir-ic{ width:46px; height:46px; border-radius:13px; flex:none; display:flex; align-items:center;
    justify-content:center; background:var(--wf-fill); }
  .id-reassure .ir-t{ font-size:13.5px; font-weight:800; color:var(--wf-ink); }
  .id-reassure .ir-s{ font-size:12px; color:var(--wf-muted); margin-top:2px; line-height:1.4; }
  .id-reassure.match{ background:#f1eeff; border-color:#dcd6f5; }
  .id-reassure.match .ir-ic{ background:#e4dcfa; }
  .id-reassure.match .ir-t{ color:#4a3aa0; }
  .id-reassure.match .ir-s{ color:#6a5bd0; }
  /* empty-state attorney slot (pre-booking) — sets placement expectation for the
     SmartMatch'd attorney, static (no shimmer) so it reads as empty, not loading */
  .id-empty{ margin:-22px 14px 0; position:relative; z-index:2; background:#fbfcff; border:1.5px dashed #cfd6e6;
    border-radius:16px; padding:13px 14px 14px; box-shadow:0 6px 18px rgba(16,24,40,.06); }
  .id-empty .ie-row{ display:flex; align-items:center; gap:12px; }
  .id-empty .ie-ph{ width:52px; height:52px; border-radius:14px; flex:none; display:flex; align-items:center;
    justify-content:center; background:#eef1f8; border:1.5px dashed #c4ccdc; }
  .id-empty .ie-main{ flex:1; min-width:0; }
  .id-empty .ie-name{ font-size:14px; font-weight:800; color:var(--wf-muted); letter-spacing:-.1px; }
  .id-empty .ie-sub{ font-size:11.5px; color:var(--wf-faint); margin-top:3px; line-height:1.4; text-wrap:pretty; }

  /* 3 · status zone — plain-language explainer + info */
  .statz{ margin:14px 14px 0; display:flex; gap:10px; padding:12px 13px; border-radius:13px;
    background:#fff; border:1px solid var(--wf-line); }
  .statz .sz-ic{ width:30px; height:30px; border-radius:9px; flex:none; display:flex; align-items:center;
    justify-content:center; background:var(--wf-fill); }
  .statz .sz-t{ font-size:13px; font-weight:800; color:var(--wf-ink); display:flex; align-items:center; gap:6px; }
  .statz .sz-b{ font-size:12px; color:var(--wf-muted); margin-top:2px; line-height:1.45; text-wrap:pretty; }
  .statz .sz-info{ color:var(--wf-faint); display:inline-flex; cursor:pointer; }

  /* 4 · action-needed hub (§6b — single prioritized group with count) */
  .ahub{ margin:14px 14px 0; border-radius:16px; overflow:hidden; border:1px solid var(--wf-line);
    background:#fff; box-shadow:0 2px 8px rgba(16,24,40,.05); }
  .ahub-h{ display:flex; align-items:center; gap:9px; padding:11px 14px; background:#fbfbfc;
    border-bottom:1px solid var(--wf-line2); }
  .ahub-h .ah-ic{ display:flex; }
  .ahub-h .ah-t{ font-size:13px; font-weight:800; color:var(--wf-ink); flex:1; }
  .ahub-h .ah-n{ font-size:11px; font-weight:800; color:#fff; background:var(--money); min-width:20px; height:20px;
    padding:0 6px; border-radius:999px; display:inline-flex; align-items:center; justify-content:center; }
  .ahub-items{ display:flex; flex-direction:column; }
  .aitem{ padding:13px 14px; }
  .aitem + .aitem{ border-top:1px solid var(--wf-line2); }
  .aitem .ai-head{ display:flex; align-items:flex-start; gap:9px; }
  .aitem .ai-ic{ flex:none; display:flex; margin-top:1px; }
  .aitem .ai-t{ font-size:13.5px; font-weight:800; letter-spacing:-.1px; line-height:1.3; flex:1; min-width:0; text-wrap:pretty; }
  .aitem .ai-when{ font-size:11px; font-weight:800; flex:none; margin-top:2px; white-space:nowrap; }
  .aitem .ai-s{ font-size:12px; color:var(--wf-muted); margin-top:6px; line-height:1.4; text-wrap:pretty; }
  .aitem .ai-cta{ display:flex; align-items:center; justify-content:center; height:42px; margin-top:11px;
    border-radius:999px; font-size:13.5px; font-weight:800; padding:0 16px; width:100%; background:#fff;
    border:1px solid var(--wf-line); color:var(--wf-ink); }
  .aitem .ai-dep{ display:flex; align-items:center; gap:6px; margin-top:8px; font-size:11px; font-weight:700;
    color:var(--wf-faint); }
  /* inline e-signature (LOE) */
  .esign{ margin-top:10px; border:1px solid var(--wf-line); border-radius:11px; overflow:hidden; }
  .esign .es-doc{ display:flex; align-items:center; gap:9px; padding:9px 11px; background:#fbfbfc;
    border-bottom:1px solid var(--wf-line2); font-size:12px; font-weight:700; color:var(--wf-strong); }
  .esign .es-doc .es-open{ margin-left:auto; font-size:11.5px; font-weight:800; color:var(--otr-blue);
    display:inline-flex; align-items:center; gap:4px; }
  .esign .es-check{ display:flex; gap:10px; padding:11px; align-items:flex-start; background:#fff; }
  .esign .es-box{ width:20px; height:20px; border-radius:6px; border:2px solid var(--wf-line); flex:none; margin-top:1px; }
  .esign .es-box.disabled{ background:var(--wf-fill); border-color:var(--wf-line2); }
  .esign .es-lbl{ font-size:11.5px; color:var(--wf-muted); line-height:1.4; }
  .esign .es-lbl b{ color:var(--wf-strong); font-weight:700; }

  /* 5 · case facts */
  .facts{ margin:14px 14px 0; background:#fff; border:1px solid var(--wf-line); border-radius:16px;
    overflow:hidden; padding-bottom:8px; }
  .facts-h{ display:flex; align-items:center; gap:9px; padding:11px 14px; background:#fbfbfc;
    border-bottom:1px solid var(--wf-line2); font-size:13px; font-weight:800; color:var(--wf-ink); }
  .frow{ display:flex; align-items:flex-start; gap:11px; padding:11px 14px; border-top:1px solid var(--wf-line2); }
  .frow:first-of-type{ border-top:none; }
  .frow .f-ic{ width:18px; flex:none; display:flex; justify-content:center; margin-top:1px; }
  .frow .f-main{ flex:1; min-width:0; }
  .frow .f-k{ font-size:11px; font-weight:700; color:var(--wf-faint); letter-spacing:.2px; }
  .frow .f-v{ font-size:13.5px; font-weight:700; color:var(--wf-ink); margin-top:1px; text-wrap:pretty; }
  .frow .f-v .trunc{ display:block; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
  .frow .f-v .muted{ color:var(--wf-faint); font-weight:600; }
  .frow .f-sub{ font-size:11.5px; color:var(--wf-muted); margin-top:2px; }
  .frow .f-rel{ display:inline-flex; align-items:center; gap:4px; font-size:11px; font-weight:800;
    color:var(--otr-blue); background:#e9f1ff; border-radius:999px; padding:2px 8px; margin-top:4px; }
  .frow .f-rel.soon{ color:var(--money); background:var(--money-bg); }
  .frow .f-court-row{ display:flex; align-items:center; gap:8px; }
  .frow .f-court-row .f-rel{ margin-top:0; flex:none; margin-left:auto; }
  .frow .cd-cal{ display:inline-flex; align-items:center; gap:5px; font-size:12px; font-weight:800;
    color:var(--otr-blue); margin-top:7px; cursor:pointer; }
  /* completion prompt — a null the USER can fill becomes an action */
  .f-complete{ display:inline-flex; align-items:center; gap:6px; font-size:12.5px; font-weight:800;
    color:var(--otr-blue); margin-top:2px; cursor:pointer; }
  .f-await{ display:inline-flex; align-items:center; gap:6px; font-size:12.5px; color:var(--wf-faint); margin-top:1px; }
  .vmore{ display:inline-flex; align-items:center; gap:5px; font-size:11.5px; font-weight:800; color:var(--otr-blue);
    margin-top:6px; cursor:pointer; }

  /* terminal CTA (review attorney) + celebration */
  .celebrate{ margin:14px 14px 0; border-radius:16px; padding:15px 14px; position:relative; overflow:hidden;
    background:linear-gradient(135deg,#e8f8ee,#d6f2e1); border:1px solid #bfe8cf; }
  .celebrate .cb-t{ font-size:16px; font-weight:800; color:#127a43; letter-spacing:-.3px; }
  .celebrate .cb-s{ font-size:12.5px; color:#2c7a52; margin-top:2px; }
  .celebrate .cb-cta{ display:inline-flex; align-items:center; justify-content:center; gap:7px; height:38px;
    margin-top:11px; border-radius:999px; background:#19a558; color:#fff; font-size:13.5px; font-weight:800;
    width:100%; }

  /* generic section card used by the expanded record */
  .xcard{ margin:14px 14px 0; background:#fff; border:1px solid var(--wf-line); border-radius:16px; overflow:hidden; }
  .xcard-h{ display:flex; align-items:center; gap:9px; padding:12px 14px; cursor:pointer; user-select:none; }
  .xcard-h .xh-ic{ display:flex; color:var(--wf-muted); }
  .xcard-h .xh-t{ font-size:13.5px; font-weight:800; color:var(--wf-ink); flex:1; letter-spacing:-.1px; }
  .xcard-h .xh-n{ font-size:11px; font-weight:800; color:var(--wf-muted); background:var(--wf-fill); min-width:19px;
    height:19px; padding:0 5px; border-radius:999px; display:inline-flex; align-items:center; justify-content:center; }
  .xcard-h .xh-chev{ color:var(--wf-faint); transition:transform .18s; display:flex; }
  .xcard-h.collapsed .xh-chev{ transform:rotate(-90deg); }
  .xcard-b{ padding:0 14px 4px; border-top:1px solid var(--wf-line2); }

  /* help / escalation (OTR support — plainer, system-styled, NOT the attorney) */
  .helpz{ margin:14px 14px 22px; display:flex; align-items:center; gap:11px; padding:13px 14px; border-radius:14px;
    background:#fff; border:1px dashed var(--wf-line); }
  .helpz .hz-ic{ width:34px; height:34px; border-radius:10px; flex:none; display:flex; align-items:center;
    justify-content:center; background:var(--wf-fill); }
  .helpz .hz-t{ font-size:12.5px; font-weight:800; color:var(--wf-ink); }
  .helpz .hz-s{ font-size:11px; color:var(--wf-muted); margin-top:1px; }
  .helpz .hz-cta{ margin-left:auto; flex:none; font-size:12px; font-weight:800; color:var(--wf-strong);
    border:1px solid var(--wf-line); border-radius:999px; padding:7px 13px; white-space:nowrap; }

  .dscreen .grad-cta{ background:var(--otr-grad)!important; }
  `;
    document.head.appendChild(s);
  }

  // ── rich fixtures: landmark lifecycle states with full detail records ─────
  const V = (label, code, note) => ({ label, code, note });
  const DETAIL = {
    active: {
      status: 'active', caseId: 'OTR-47210', cls: 'Infraction',
      photo: 'hatch', place: 'Fresno, CA', issued: 'Jan 14, 2026', title: 'Ticket issued in Fresno — Jan 2026',
      attorney: { name: 'Priya Nair', firm: 'Nair Law Group', rating: 4.9 },
      statusLine: { t: 'Your case is active', b: 'Priya is preparing your defense. There’s nothing you need to do right now — we’ll update you here as it moves.' },
      violations: [V('Failure to stop', 'VC 22450', 'Stop sign / limit line')],
      court: { name: 'Fresno Superior Court', addr: '1100 Van Ness Ave, Fresno, CA 93724', date: 'Apr 18, 2026', days: 81 },
      documents: [{ n: 'Letter of engagement', t: 'Signed', d: 'Jan 16, 2026', ic: 'file-check' }, { n: 'Citation #C-22450', t: 'On file', d: 'Jan 14, 2026', ic: 'file-document-info-quick-reference' }],
      payments: [{ l: 'Legal fee', a: 250, d: 'Jan 16, 2026', s: 'Paid' }], balance: 0,
      timeline: [
      { t: 'Attorney assigned', b: 'Priya Nair · Nair Law Group', d: 'Jan 16', ic: 'user-square-single', done: true },
      { t: 'Engagement signed', b: 'You accepted representation', d: 'Jan 16', ic: 'file-check', done: true },
      { t: 'Case filed with court', b: 'Fresno Superior Court', d: 'Jan 22', ic: 'building-1', done: true },
      { t: 'Court date', b: 'Priya appears on your behalf — you don’t attend', d: 'Apr 18', ic: 'gavel', future: true }]

    },
    loe: {
      status: 'active-action', caseId: 'OTR-48090', cls: 'Misdemeanor',
      photo: 'tall', place: 'Austin, TX', issued: 'Mar 03, 2026', title: 'Ticket issued in Austin — Mar 2026',
      attorney: { name: 'Dana Whitfield', firm: 'Whitfield & Reyes', rating: 4.9 },
      statusLine: { t: 'One step left to begin', b: 'Dana is ready to represent you. Accept the letter of engagement below and your case becomes active.' },
      actions: [{ sev: 'warning', kind: 'loe', title: 'Accept representation to proceed',
        body: 'Sign your letter of engagement so Dana can act on your behalf.' }],
      violations: [V('Reckless driving', 'TC 545.401', 'Class B misdemeanor'), V('Unsafe lane change', 'TC 545.060')],
      court: { name: 'Travis County Justice Court', addr: '1000 Guadalupe St, Austin, TX 78701', date: 'May 14, 2026', days: 69 },
      documents: [{ n: 'Letter of engagement', t: 'Awaiting signature', d: 'Mar 06, 2026', ic: 'file-edit', pending: true }],
      payments: [{ l: 'Legal fee', a: 0, d: 'Quoted', s: 'Due on signing', q: 299 }], balance: 0,
      timeline: [
      { t: 'Attorney proposed', b: 'Dana Whitfield · Whitfield & Reyes', d: 'Mar 06', ic: 'user-square-single', done: true },
      { t: 'Awaiting your signature', b: 'Accept the letter of engagement', d: 'Now', ic: 'file-edit', current: true, tone: 'warning' },
      { t: 'Case becomes active', b: 'Dana files and prepares your defense', d: '—', ic: 'open-folder', future: true }]

    },
    counter: {
      status: 'counter', caseId: 'OTR-48510', cls: 'Infraction',
      photo: 'hatch', place: 'Anaheim, CA', issued: 'Feb 09, 2026', title: 'Ticket issued in Anaheim — Feb 2026',
      attorney: { name: 'Carla Reyes', firm: 'Reyes Traffic Law', rating: 4.8 },
      statusLine: { t: 'You received a counter offer', b: 'Carla reviewed your case and proposed adjusted terms. Review the details and decide before the offer expires.' },
      actions: [{ sev: 'warning', kind: 'counter', when: 'Expires in 2 days', title: 'Review your counter offer',
        body: 'Carla proposed $189 (was $149). See what changed before you accept or decline.' }],
      violations: [V('Speeding', 'VC 22349(a)', '16–25 mph over the posted limit')],
      court: { name: 'Orange County Superior Court', addr: '700 Civic Center Dr W, Santa Ana, CA 92701', date: 'May 02, 2026', days: 57 },
      documents: [{ n: 'Counter offer terms', t: 'New', d: 'Feb 24, 2026', ic: 'file-report', pending: true }, { n: 'Citation #A-1149', t: 'On file', d: 'Feb 09, 2026', ic: 'file-document-info-quick-reference' }],
      payments: [{ l: 'Original quote', a: 149, d: 'Feb 12, 2026', s: 'Superseded' }], balance: 0,
      timeline: [
      { t: 'Attorney assigned', b: 'Carla Reyes · Reyes Traffic Law', d: 'Feb 12', ic: 'user-square-single', done: true },
      { t: 'Counter offer received', b: 'Adjusted terms proposed — your review needed', d: 'Feb 24', ic: 'scale-balanced', current: true, tone: 'warning' },
      { t: 'Court date', b: 'Carla appears on your behalf', d: 'May 02', ic: 'gavel', future: true }]

    },
    concurrent: {
      status: 'active-action', caseId: 'OTR-48144', cls: 'Misdemeanor',
      photo: 'tall', place: 'Glendale, CA', issued: 'Mar 11, 2026', title: 'Ticket issued in Glendale — Mar 2026',
      attorney: { name: 'Helen Vance', firm: 'Park & Vance', rating: 4.9 },
      statusLine: { t: 'Two things need your attention', b: 'Sign your engagement first — then you can act on the counter offer Helen proposed.' },
      actions: [
      { sev: 'warning', kind: 'loe', title: 'Accept representation to proceed',
        body: 'Sign your letter of engagement so Helen can act on your behalf.' },
      { sev: 'warning', kind: 'counter', when: 'Expires in 4 days', title: 'Review your counter offer', dep: 'Sign your engagement first',
        body: 'Helen proposed $229 (was $189). You can review it now and accept once you’ve signed.' }],

      violations: [V('Reckless driving', 'VC 23103', 'Willful disregard for safety'), V('Speeding', 'VC 22349', 'Over posted limit')],
      court: { name: 'Los Angeles Superior — North', addr: '600 E Broadway, Glendale, CA 91206', date: 'May 20, 2026', days: 75 },
      documents: [{ n: 'Letter of engagement', t: 'Awaiting signature', d: 'Mar 14, 2026', ic: 'file-edit', pending: true }, { n: 'Counter offer terms', t: 'New', d: 'Mar 15, 2026', ic: 'file-report', pending: true }],
      payments: [{ l: 'Legal fee', a: 0, d: 'Quoted', s: 'Due on signing', q: 229 }], balance: 0,
      timeline: [
      { t: 'Attorney proposed', b: 'Helen Vance · Park & Vance', d: 'Mar 14', ic: 'user-square-single', done: true },
      { t: 'Awaiting your signature', b: 'Sign the letter of engagement so Helen can represent you', d: 'Now', ic: 'file-edit', current: true, tone: 'warning' },
      { t: 'Counter offer to review', b: 'Helen proposed adjusted terms — review when you’re ready', d: 'Now', ic: 'scale-balanced', current: true, tone: 'warning' },
      { t: 'Case becomes active', b: 'Helen prepares your defense', d: '—', ic: 'open-folder', future: true }]

    },
    overdue: {
      status: 'active', caseId: 'OTR-46622', cls: 'Wobbler',
      photo: 'hatch', place: 'Houston, TX', issued: 'Dec 02, 2025', title: 'Ticket issued in Houston — Dec 2025',
      attorney: { name: 'Marcus Brail', firm: 'Briggs Traffic', rating: 4.7 },
      statusLine: { t: 'Your case is at risk', b: 'A payment is past due. Cases with overdue balances are paused and can be cancelled — clear the balance to keep Marcus on your case.' },
      accountRail: { sev: 'critical', text: 'A payment of $109 is past due on this case.', cta: 'Pay now' },
      actions: [{ sev: 'critical', kind: 'pay', when: '5 days overdue', title: 'Make a payment to avoid cancellation',
        body: 'Balance of $109 is past due. Pay now to keep your representation active.', amount: 109 }],
      violations: [V('No insurance', 'TC 601.191', 'Failure to maintain financial responsibility')],
      court: { name: 'Harris County Justice Court', addr: '1001 Preston St, Houston, TX 77002', date: 'Apr 02, 2026', days: 5 },
      documents: [{ n: 'Letter of engagement', t: 'Signed', d: 'Dec 05, 2025', ic: 'file-check' }, { n: 'Invoice #4421', t: 'Past due', d: 'Mar 14, 2026', ic: 'bill-dollar-2', pending: true }],
      payments: [{ l: 'Retainer', a: 150, d: 'Dec 05, 2025', s: 'Paid' }, { l: 'Court filing fee', a: 109, d: 'Mar 14, 2026', s: 'Past due', overdue: true }], balance: 109,
      timeline: [
      { t: 'Attorney assigned', b: 'Marcus Brail · Briggs Traffic', d: 'Dec 05', ic: 'user-square-single', done: true },
      { t: 'Payment past due', b: 'Invoice #4421 · $109', d: 'Mar 14', ic: 'bill-dollar-2', current: true, sev: 'critical' },
      { t: 'Court date', b: 'At risk if balance not cleared', d: 'Apr 02', ic: 'gavel', future: true }]

    },
    remarket: {
      status: 'remarketing', caseId: 'OTR-48533', cls: 'Infraction',
      photo: 'hatch', place: 'Modesto, CA', issued: 'Mar 09, 2026', title: 'Ticket issued in Modesto — Mar 2026',
      attorney: null,
      reassure: { t: 'We’re finding you a new law firm', b: 'Your initial firm was unavailable. We’re re-SmartMatching you with a local traffic attorney — no action needed.', ic: 'triangle-arrow-synchronize-1' },
      statusLine: { t: 'Re-SmartMatching in progress', b: 'This usually takes a day or two. We’ll let you know the moment a new attorney is ready.' },
      violations: [V('Speeding', 'VC 22349', 'Over posted limit')],
      court: { name: 'Stanislaus Superior Court', addr: '800 11th St, Modesto, CA 95354', date: 'Apr 27, 2026', days: 49 },
      documents: [{ n: 'Citation #M-2271', t: 'On file', d: 'Mar 09, 2026', ic: 'file-document-info-quick-reference' }],
      payments: [], balance: 0,
      timeline: [
      { t: 'Case submitted', b: 'Citation uploaded', d: 'Mar 09', ic: 'open-folder', done: true },
      { t: 'Initial firm unavailable', b: 'We’re re-SmartMatching you', d: 'Mar 12', ic: 'triangle-arrow-synchronize-1', current: true },
      { t: 'New attorney assigned', b: 'We’ll notify you', d: '—', ic: 'user-square-single', future: true }]

    },
    dismissed: {
      status: 'dismissed', caseId: 'OTR-45533', cls: 'Infraction',
      photo: 'hatch', place: 'Riverside, CA', issued: 'Oct 09, 2025', title: 'Ticket issued in Riverside — Oct 2025',
      attorney: { name: 'David Okonkwo', firm: 'Okonkwo Legal', rating: 5.0 },
      celebrate: { t: '🎉 Your ticket was dismissed', s: 'No points, no fine. David got the charge thrown out.' },
      statusLine: { t: 'Case resolved — dismissed', b: 'Nothing further is required. Your record stays clean and the documents below are yours to keep.' },
      review: true,
      violations: [V('Speeding', 'VC 22349', 'Over posted limit — dismissed')],
      court: { name: 'Riverside Superior Court', addr: '4100 Main St, Riverside, CA 92501', date: 'Oct 09, 2025', days: null, past: true },
      documents: [{ n: 'Dismissal confirmation', t: 'Final', d: 'Nov 12, 2025', ic: 'file-check' }, { n: 'Letter of engagement', t: 'Signed', d: 'Oct 11, 2025', ic: 'file-check' }, { n: 'Receipt #8841', t: 'Paid', d: 'Oct 11, 2025', ic: 'bill-dollar-2' }],
      payments: [{ l: 'Legal fee', a: 480, d: 'Oct 11, 2025', s: 'Paid' }], balance: 0,
      outcome: { saved: 480, points: 2 },
      timeline: [
      { t: 'Attorney assigned', b: 'David Okonkwo · Okonkwo Legal', d: 'Oct 11', ic: 'user-square-single', done: true },
      { t: 'Appeared in court', b: 'David represented you', d: 'Oct 09', ic: 'gavel', done: true },
      { t: 'Charge dismissed', b: 'No points, no fine', d: 'Nov 12', ic: 'folder-star-favorite', done: true, sev: 'success' }]

    },
    notbooked: {
      status: 'incomplete', caseId: 'OTR-48377', cls: null,
      photo: 'placeholder', place: null, issued: 'Mar 18, 2026', title: 'Ticket issued on Mar 18, 2026',
      attorney: null,
      reassure: { t: 'Book now to be SmartMatch’d with an attorney', b: 'Add a few details and get an instant quote — we’ll SmartMatch you with a local traffic attorney who can fight this ticket.', ic: 'user-square-single', cta: 'Get instant quote' },
      statusLine: { t: 'Finish setting up your case', b: 'We need a little more before we can SmartMatch you. The more you add, the faster we move.' },
      booking: true,
      violations: [], court: null,
      documents: [], payments: [], balance: 0,
      timeline: [
      { t: 'Ticket added', b: 'Mar 18, 2026', d: 'Now', ic: 'open-folder', current: true },
      { t: 'Get SmartMatch’d', b: 'Book to be SmartMatch’d with an attorney', d: '—', ic: 'user-square-single', future: true }]

    }
  };

  // ── shell ─────────────────────────────────────────────────────────────────
  function DScreen({ rec, children, height }) {
    return (
      <div className="otr dscreen" style={height ? { height } : null}>
      <div className="dstatus"><span>9:41</span><span className="dots"><i /><i /><i style={{ width: 18 }} /></span></div>
      <div className="dappbar">
        <div className="nav"><FI name="chevron-left" size={16} color="var(--wf-strong)" /></div>
        <div className="who"><div className="t">Case</div><div className="id">{rec.caseId}</div></div>
        <div className="nav"><svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor"><circle cx="9" cy="3.5" r="1.5" /><circle cx="9" cy="9" r="1.5" /><circle cx="9" cy="14.5" r="1.5" /></svg></div>
      </div>
      <div className="dbody">{children}</div>
    </div>);

  }

  function ZLabel({ n, children }) {
    return <div className="zlabel"><span className="zn">{n}</span><span className="zt">{children}</span></div>;
  }

  // 1 · account rail
  function AccountRail({ rail }) {
    if (!rail) return null;
    const warn = rail.sev === 'warning';
    return (
      <div className={`acct-rail${warn ? ' warn' : ''}`}>
      <span className="ar-ic"><FI name={warn ? 'warning-triangle' : 'warning-octagon'} size={17} color={warn ? '#ffd591' : '#ff9e92'} /></span>
      <span className="ar-tx">{rail.text} <b>This affects your whole account.</b></span>
      <span className="ar-cta">{rail.cta}<FI name="chevron-right" size={11} color="#fff" /></span>
    </div>);

  }

  // 2 · ticket photo hero + identity
  // Hero header mirrors the CPC identity (card-kit TitleBlock): a small month-year
  // eyebrow over a large location headline — no "Ticket issued" prose, since the
  // classification tag already signals the type. Keeps the card→detail transition
  // visually continuous.
  const heroDate = (issued) => {
    if (!issued) return 'Date unknown';
    const p = issued.split(' ');
    return p.length >= 3 ? `${p[0]} ${p[p.length - 1]}` : issued;
  };
  function TicketHero({ rec }) {
    const ph = rec.photo || 'hatch';
    return (
      <div className="thero">
      {ph === 'placeholder' ?
        <div className="ph placeholder"><FI name="ticket-1" size={34} color="#aab4c8" /><span style={{ fontSize: 11, fontWeight: 800, letterSpacing: .5 }}>Add your ticket photo</span></div> :
        <div className={`ph ${ph}`}><span className="pwm">{ph === 'lowres' ? 'Low-res photo' : 'Ticket photo'}</span></div>}
      <div className="scrim" />
      <div className="ttop">
        <span className="cls"><FI name="tag" size={11} color="#fff" /><span className="ct">{window.clsLabel(rec)}</span></span>
        <span className="badge-hold"><StatusBadge status={window.badgeStatus(rec.status)} /></span>
      </div>
      <div className="tbottom">
        <div className="tdate">{heroDate(rec.issued)}</div>
        <div className="tt">{rec.place || 'Location unknown'}</div>
        <div className="ts"><FI name="countdown-timer" size={13} color="rgba(255,255,255,.8)" />Court date · {rec.court && rec.court.date ? rec.court.date : 'Unknown'}{rec.court && rec.court.date && rec.court.days != null && rec.court.days >= 0 && <span className="ts-cd">{rec.court.days === 0 ? 'Today' : `in ${rec.court.days} days`}</span>}</div>
      </div>
    </div>);

  }

  function AttPhoto({ rec, size = 52 }) {
    const a = rec.attorney;
    if (!a) {
      return (
        <div className="att-ph none" style={{ width: size, height: size }}>
        <span className="qmark"><FI name="help-question-1" size={22} color="#9aa6bb" /></span>
      </div>);

    }
    return <div className={`att-ph${a.blurred ? ' blur' : ''}`} style={{ width: size, height: size }} />;
  }

  function Identity({ rec }) {
    // Matching: mimic the revealed attorney identity block (idatt), but redacted
    // as the SmartMatch-branded gradient skeleton — this is the exact slot the
    // real attorney drops into on match. Explanatory copy lives in the status zone.
    if (rec.status === 'analyzing') {
      return (
        <div className="idatt">
        <div className="ia-place"><div className="sk" style={{ width: 52, height: 52, borderRadius: 14, flex: 'none' }} /></div>
        <div className="ia-main">
          <div className="sk" style={{ width: '58%', height: 14, borderRadius: 7 }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 9 }}>
            <div className="sk" style={{ width: 62, height: 11, borderRadius: 6 }} />
            <div className="sk" style={{ width: '30%', height: 11, borderRadius: 6 }} />
          </div>
        </div>
      </div>);

    }
    // empty-state attorney slot (pre-booking): same identity placement as the
    // matched block, but a static dashed placeholder — "your attorney appears
    // here once you book." No shimmer (that's reserved for the active match loader).
    if (rec.status === 'incomplete') {
      const cta = rec.reassure && rec.reassure.cta;
      return (
        <div className="id-empty">
        <div className="ie-row">
          <div className="ie-ph"><FI name="user-square-single" size={22} color="#aeb6c6" /></div>
          <div className="ie-main">
            <div className="ie-name">Your SmartMatch’d attorney</div>
            <div className="ie-sub">This is where your matched attorney will appear once you complete your booking.</div>
          </div>
        </div>
        {cta && <div className="act blue full" style={{ height: 38, marginTop: 12, fontSize: 13.5 }}>
          <FI name="bolt" size={15} color="#fff" />{cta}</div>}
      </div>);

    }
    // reassurance variant (no attorney yet)
    if (rec.reassure) {
      const match = rec.status === 'remarketing';
      return (
        <div className={`id-reassure${match ? ' match' : ''}`}>
        <div className="ir-ic"><FI name={rec.reassure.ic} size={22} color={match ? '#6a5bd0' : 'var(--wf-muted)'} /></div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="ir-t">{rec.reassure.t}</div>
          <div className="ir-s">{rec.reassure.b}</div>
          {rec.reassure.cta && <div className="act blue full" style={{ height: 38, marginTop: 11, fontSize: 13.5 }}>
            <FI name="bolt" size={15} color="#fff" />{rec.reassure.cta}</div>}
        </div>
      </div>);

    }
    const a = rec.attorney;
    // bare unassigned (pre-match / analyzing) — the "?" placeholder, no reassure CTA
    if (!a) {
      return (
        <div className="idatt">
        <div className="ia-place"><AttPhoto rec={rec} /></div>
        <div className="ia-main">
          <div className="ia-name" style={{ color: 'var(--wf-faint)' }}>Finding your best-fit attorney…</div>
          <div className="ia-firm"><span className="fn">SmartMatch’d to a local pro shortly</span></div>
        </div>
      </div>);

    }
    return (
      <div className="idatt">
      <div className="ia-place"><AttPhoto rec={rec} /></div>
      <div className="ia-main">
        <div className="ia-name">{a.name}</div>
        <div className="ia-firm">
          {a.rating && <Stars rating={a.rating} size={11} />}
          <span className="fn">{a.firm}</span>
        </div>
      </div>
    </div>);

  }

  // 3 · status zone
  function StatusZone({ rec }) {
    const sl = rec.statusLine;if (!sl) return null;
    const cfg = OTR_STATUS[rec.status];
    const tone = cfg ? OTR_TONE[cfg.tone] : null;
    return (
      <div className="statz">
      <div className="sz-ic" style={tone ? { background: tone.light[0] } : null}>
        <FI name={cfg ? cfg.icon : 'open-folder'} size={16} color={tone ? tone.light[1] : 'var(--wf-muted)'} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="sz-t">{sl.t}<span className="sz-info"><FI name="information-circle" size={13} color="var(--wf-faint)" /></span></div>
        <div className="sz-b">{sl.b}</div>
      </div>
    </div>);

  }

  // 4 · the prioritized Action-needed hub
  function sortActions(actions) {
    return actions.slice().sort((a, b) => SEVERITY[b.sev].rank - SEVERITY[a.sev].rank);
  }
  // Action-item CTAs mirror the CPC primary actions (cpc.jsx → primaryAction)
  // so the label/icon a user taps on the preview card and on the detail page are
  // one source of truth and never diverge.
  const ACTION_CTA = {
    loe: { label: 'Review & sign engagement', icon: 'file-edit' },
    counter: { label: 'Review counter offer', icon: 'scale-balanced' },
    pay: { label: (a) => `Make a payment · $${a.amount}`, icon: 'bill-dollar-2' },
    quote: { label: 'Accept or deny quote', icon: 'bolt' },
    update: { label: 'View updates', icon: 'chat-bubble-oval-smiley-1' },
    prep: { label: 'Review checklist', icon: 'calendar-check' },
    dispute: { label: 'Start a live chat', icon: 'chat-bubble-info-help' },
    review: { label: 'Review your attorney', icon: 'star-1' }
  };
  function ActionItem({ a, first }) {
    const sv = SEVERITY[a.sev];
    const cta = ACTION_CTA[a.kind] || { label: 'Take action' };
    const ctaLabel = typeof cta.label === 'function' ? cta.label(a) : cta.label;
    return (
      <div className="aitem" style={{ background: sv.bg }}>
      <div className="ai-head">
        {cta.icon && <span className="ai-ic"><FI name={cta.icon} size={16} color={sv.ic} /></span>}
        <span className="ai-t" style={{ color: sv.ink }}>{a.title}</span>
        {a.when && <span className="ai-when" style={{ color: sv.ic }}>{a.when}</span>}
      </div>
      <div className="ai-s">{a.body}</div>
      {a.dep && <div className="ai-dep"><FI name="information-circle" size={12} color="var(--wf-faint)" />{a.dep}</div>}
      {a.kind === 'loe' && first && <ESign />}
      <div className="ai-cta" style={{ borderColor: sv.line }}>{ctaLabel}</div>
    </div>);

  }
  function ESign() {
    return (
      <div className="esign">
      <div className="es-doc"><FI name="file-document-info-quick-reference" size={15} color="var(--wf-muted)" />Letter of engagement
        <span className="es-open">Open document<FI name="triangle-arrow-expand-window-1" size={11} color="var(--otr-blue)" /></span></div>
      <div className="es-check">
        <div className="es-box disabled" />
        <div className="es-lbl"><b>Checking this box constitutes an electronic signature.</b> Open and read the document above to enable signing.</div>
      </div>
    </div>);

  }
  function ActionHub({ rec, actions }) {
    const list = actions || rec.actions;if (!list || !list.length) return null;
    const sorted = sortActions(list);
    return (
      <div className="ahub">
      <div className="ahub-h">
        <span className="ah-ic"><FI name="warning-triangle" size={15} color={SEVERITY[sorted[0].sev].ic} /></span>
        <span className="ah-t">{sorted.length > 1 ? `${sorted.length} actions needed` : 'Action needed'}</span>
      </div>
      <div className="ahub-items">
        {sorted.map((a, i) => <ActionItem key={i} a={a} first={i === 0} />)}
      </div>
    </div>);

  }

  // celebration (terminal positive)
  function Celebrate({ rec }) {
    if (!rec.celebrate) return null;
    return (
      <div className="celebrate">
      <Confetti n={14} />
      <div className="cb-t">{rec.celebrate.t}</div>
      <div className="cb-s">{rec.celebrate.s}</div>
      {rec.review && <div className="cb-cta"><FI name="star-1" size={15} color="#fff" />Review your attorney</div>}
    </div>);

  }

  Object.assign(window, {
    SEVERITY, DETAIL, DScreen, ZLabel, AccountRail, TicketHero, AttPhoto, Identity,
    StatusZone, ActionHub, ActionItem, ESign, sortActions, Celebrate
  });

})();