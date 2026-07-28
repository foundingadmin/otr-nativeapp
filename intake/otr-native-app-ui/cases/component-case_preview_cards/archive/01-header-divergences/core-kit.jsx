// core-kit.jsx — design tokens, status registry + StatusBadge, CPC primitives
// The ONE reusable status-badge component (every §6.0 state) + CPC primitives.
// Accents are tokenized in #otr-tokens so the CEO-sample flavor can be retuned
// in one place. Wireframe-neutral everywhere; real color reserved for badges +
// money/overdue (the one critical sentiment accent), per the brief.
/* __IIFE__ */ ;(function(){
const { FeatureIcon } = window.OffTheRecordDesignSystem_6eff96;

// ── one-time CSS (tokens + frame chrome + confetti) ───────────────────────
if (typeof document !== 'undefined' && !document.getElementById('otr-tokens')) {
  const s = document.createElement('style');
  s.id = 'otr-tokens';
  s.textContent = `
  :root{
    --wf-ink:#1b1c21; --wf-strong:#3b3e46; --wf-muted:#6b7280; --wf-faint:#9aa1ad;
    --wf-line:#e6e8ec; --wf-line2:#eef0f3; --wf-fill:#f3f4f6; --wf-bg:#fbfcfd;
    --wf-photo:#d8dbe1; --wf-photo2:#cfd3da;
    --money:#e5463a; --money-bg:#fdeceb; --money-line:#f7c9c4;
    --otr-blue:#2e6bff;
    --otr-grad:linear-gradient(102deg,#5b63ff 6%,#8b5cf6 96%);
  }
  .otr, .otr *{ box-sizing:border-box; }
  .otr{ font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,system-ui,sans-serif;
    color:var(--wf-ink); -webkit-font-smoothing:antialiased; line-height:1.42; }
  /* text polish — reduce widows/orphans on any wrapping copy */
  .otr p, .otr .rec{ text-wrap:pretty; }
  .otr .ttl, .balance, .spec .vt{ text-wrap:balance; }
  .note, .overlay-pay .lbl, .tkt .tk-viol .v, .classif{ text-wrap:pretty; }
  .mline{ text-wrap:pretty; }
  .otr-frame{ width:390px; background:var(--wf-bg); position:relative; overflow:hidden; }
  .otr-frame.screen{ border-radius:22px; border:1px solid #dfe4ef; box-shadow:0 8px 30px rgba(20,30,60,.12); }
  .otr-statusbar{ height:30px; display:flex; align-items:center; justify-content:space-between;
    padding:0 18px 0 22px; font-size:13px; font-weight:600; color:var(--wf-strong); }
  .otr-statusbar .dots{ display:flex; gap:5px; align-items:center; }
  .otr-statusbar .dots i{ width:15px; height:9px; border-radius:2px; background:var(--wf-strong); opacity:.85; }
  .otr-appbar{ padding:6px 20px 12px; display:flex; align-items:flex-end; justify-content:space-between; }
  .otr-appbar h1{ margin:0; font-size:25px; font-weight:800; letter-spacing:-.5px; color:var(--wf-ink); }
  .otr-appbar .avatar{ width:30px; height:30px; border-radius:50%; background:var(--wf-fill);
    border:1px solid var(--wf-line); }
  .otr-filters{ display:flex; gap:7px; padding:2px 20px 14px; overflow:hidden; }
  .no-sb{ scrollbar-width:none; -ms-overflow-style:none; }
  .no-sb::-webkit-scrollbar{ display:none; }
  .otr-chip{ font-size:12.5px; font-weight:600; padding:5px 12px; border-radius:999px;
    border:1px solid var(--wf-line); color:var(--wf-muted); background:#fff; white-space:nowrap; }
  .otr-chip.on{ background:var(--wf-ink); color:#fff; border-color:var(--wf-ink); }
  .chip-num{ font-style:normal; font-size:11px; font-weight:700; line-height:1; min-width:16px;
    padding:2px 5px; border-radius:999px; background:var(--wf-fill); color:var(--wf-muted); text-align:center; }
  .otr-chip.on .chip-num{ background:rgba(255,255,255,.22); color:#fff; }
  .chip-alert{ width:7px; height:7px; border-radius:50%; flex:none; }
  .otr-chip.has-alert{ font-weight:700; }
  .otr-chip.on .chip-alert{ box-shadow:0 0 0 2px rgba(255,255,255,.3); }
  @media (prefers-reduced-motion: no-preference){
    .chip-alert{ animation: chipPulse 1.6s ease-in-out infinite; }
  }
  @keyframes chipPulse{ 0%,100%{ transform:scale(1); opacity:1; } 50%{ transform:scale(.62); opacity:.5; } }
  .otr-feed{ display:flex; flex-direction:column; gap:11px; padding:2px 16px 22px; }

  /* generic card surface */
  .cpc{ background:#fff; border:1px solid var(--wf-line); border-radius:16px; padding:14px;
    box-shadow:0 1px 2px rgba(16,24,40,.04); position:relative; }
  .cpc.flat{ box-shadow:none; }
  .cpc.unfinished{ border:1.6px dashed #c4c9d2; background:#fcfcfd; box-shadow:none; }
  /* analyzing: a live-agent state — editing is impossible, so the title goes
     inactive (like a concluded card) and the border carries a slow SmartMatch'd
     gradient sweep to signal "the match is being computed." */
  .cpc.analyzing-brand{ border-color:transparent; background:#fff; }
  .cpc.analyzing-brand .ttl{ color:var(--wf-faint); }
  .cpc.analyzing-brand::before{ content:""; position:absolute; inset:0; border-radius:inherit;
    padding:1.6px; background:linear-gradient(102deg,#5b63ff,#8b5cf6,#5b63ff,#8b5cf6); background-size:280% 100%;
    -webkit-mask:linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    -webkit-mask-composite:xor; mask-composite:exclude; pointer-events:none;
    animation:smbrand 3.6s linear infinite; }
  @keyframes smbrand{ to{ background-position:280% 0; } }
  @media (prefers-reduced-motion: reduce){ .cpc.analyzing-brand::before{ animation:none; } }
  .cpc.tap::after{ content:""; position:absolute; right:13px; top:16px; width:7px; height:7px;
    border-right:2px solid var(--wf-faint); border-top:2px solid var(--wf-faint);
    transform:rotate(45deg); }

  /* wireframe helpers */
  .wf-photo{ background:
      repeating-linear-gradient(135deg,var(--wf-photo) 0 9px,var(--wf-photo2) 9px 18px);
    border-radius:9px; display:flex; align-items:center; justify-content:center;
    color:rgba(60,64,72,.5); flex:none; }
  .wf-photo span{ font-size:10px; font-weight:700; letter-spacing:.6px; text-transform:uppercase; }
  .wf-photo.blur{ filter:blur(3px); }
  .blur{ filter:blur(3px); }
  /* attorney / user portrait — a heavily-rounded SQUARE (not a circle), so a
     lawyer's photo carries the same shape as a user's avatar: "real people,
     just like one of us." A soft head+shoulders silhouette stands in for the
     real headshot; .blur softens it for the pre-accept reveal state. */
  .wf-portrait{ position:relative; overflow:hidden; flex:none;
    background:linear-gradient(160deg,#e2e6ec 0%,#ccd1da 100%); }
  .wf-portrait.blur{ filter:blur(3px); }
  .wf-portrait::before{ content:""; position:absolute; left:50%; top:15%;
    transform:translateX(-50%); width:38%; height:38%; border-radius:50%;
    background:rgba(84,92,106,.5); }
  .wf-portrait::after{ content:""; position:absolute; left:50%; bottom:-26%;
    transform:translateX(-50%); width:72%; height:60%; border-radius:50%;
    background:rgba(84,92,106,.5); }
  .ttl{ font-size:15.5px; font-weight:700; letter-spacing:-.2px; color:var(--wf-ink); margin:0; }
  .sub{ font-size:12.5px; color:var(--wf-muted); }
  .micro{ font-size:11px; color:var(--wf-faint); font-weight:600; text-transform:uppercase; letter-spacing:.5px; }
  .rec{ font-size:13px; color:var(--wf-strong); }
  .divider{ height:1px; background:var(--wf-line2); margin:11px -2px; }

  /* primary / secondary actions (wireframe-neutral; money = red) */
  .act{ display:flex; align-items:center; justify-content:center; gap:7px; height:40px;
    border-radius:999px; font-size:14px; font-weight:700; cursor:default; border:1px solid transparent; }
  .act.primary{ background:var(--wf-ink); color:#fff; }
  .act.ghost{ background:#fff; color:var(--wf-ink); border-color:var(--wf-line); }
  .act.money{ background:var(--money); color:#fff; }
  .act.grad{ background:var(--otr-grad); color:#fff; }
  .act.blue{ background:var(--otr-blue); color:#fff; }
  .act.sm{ height:32px; font-size:13px; padding:0 14px; }
  .act.full{ width:100%; }

  /* quote + countdown */
  .quote{ font-size:22px; font-weight:800; letter-spacing:-.5px; color:var(--wf-ink); }
  .timer{ display:inline-flex; align-items:center; gap:5px; font-size:12px; font-weight:700;
    color:var(--wf-muted); }
  .meter{ height:6px; border-radius:999px; background:var(--wf-fill); overflow:hidden; }
  .meter i{ display:block; height:100%; background:var(--wf-strong); border-radius:999px; }

  /* status badge core */
  .sbadge{ position:relative; display:inline-flex; align-items:center; gap:5px; height:25px;
    padding:0 10px; border-radius:8px; font-size:13px; font-weight:700; letter-spacing:.1px;
    line-height:1; white-space:nowrap; vertical-align:middle; }
  .sbadge.solid{ }
  .sbadge.tilt{ transform:rotate(-3.5deg); box-shadow:0 3px 11px rgba(16,24,40,.2); }
  .sbadge .reddot{ position:absolute; top:-3px; right:-3px; width:9px; height:9px; border-radius:50%;
    background:var(--money); box-shadow:0 0 0 2px #fff; }
  .sbadge .ico{ display:inline-flex; }
  .sm-mark{ display:inline-flex; align-items:center; justify-content:center; flex:none; }

  /* spec caption + hardest-call note (study chrome around feed frames) */
  .spec{ width:390px; font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",system-ui,sans-serif;
    padding:0 2px 10px; }
  .spec .vk{ font-size:11px; font-weight:800; letter-spacing:.8px; text-transform:uppercase;
    color:var(--blue-700,#0b4ad0); }
  .spec .vt{ font-size:16px; font-weight:800; letter-spacing:-.3px; color:#1b1c21; margin:2px 0 7px; }
  .spec .tags{ display:flex; flex-wrap:wrap; gap:5px; }
  .spec .tag{ font-size:10.5px; font-weight:700; color:#3b3e46; background:#fff;
    border:1px solid #e0e3e8; border-radius:6px; padding:3px 7px; }
  .spec .tag b{ color:#9aa1ad; font-weight:700; }
  .note{ width:390px; margin-top:11px; padding:9px 12px; background:#fffdf3;
    border:1px solid #f1e6b8; border-radius:9px; font-family:-apple-system,system-ui,sans-serif;
    font-size:11.5px; line-height:1.45; color:#6a5a17; }
  .note b{ color:#8a6d00; font-weight:800; }

  /* rough "ticket = bad" paper element (perforated, monospace, sepia ink) */
  .tkt{ position:relative; font-family:'Courier New',ui-monospace,Menlo,monospace;
    --ink:#6b4f1d; --ink-line:rgba(107,79,29,.3); --ink-soft:rgba(107,79,29,.62); color:var(--ink);
    background:linear-gradient(176deg,#fdf3c6,#f6e6a2);
    padding:14px 15px 16px; transform:rotate(-0.7deg);
    filter:drop-shadow(0 6px 11px rgba(120,90,20,.22));
    -webkit-mask:radial-gradient(circle 8px at 50% 0,#0000 8px,#000 8.5px) repeat-x top/22px 51%,
                 radial-gradient(circle 8px at 50% 100%,#0000 8px,#000 8.5px) repeat-x bottom/22px 51%;
            mask:radial-gradient(circle 8px at 50% 0,#0000 8px,#000 8.5px) repeat-x top/22px 51%,
                 radial-gradient(circle 8px at 50% 100%,#0000 8px,#000 8.5px) repeat-x bottom/22px 51%; }
  .tkt.pink{ --ink:#9b2a5a; --ink-line:rgba(155,42,90,.28); --ink-soft:rgba(155,42,90,.6); background:linear-gradient(176deg,#ffdcea,#ffc2da); }
  .tkt.blue{ --ink:#234e86; --ink-line:rgba(35,78,134,.26); --ink-soft:rgba(35,78,134,.6); background:linear-gradient(176deg,#dde9fb,#bdd4f2); }
  .tkt.green{ --ink:#356b2a; --ink-line:rgba(53,107,42,.26); --ink-soft:rgba(53,107,42,.6); background:linear-gradient(176deg,#e3f0d4,#c6e2ad); }
  .tkt.slate{ --ink:#3d4452; --ink-line:rgba(61,68,82,.24); --ink-soft:rgba(61,68,82,.58); background:linear-gradient(176deg,#e9ecf2,#d2d8e2); }
  .tkt .tkt-cap{ display:flex; align-items:center; justify-content:space-between; gap:8px;
    font-size:9px; font-weight:700; letter-spacing:1.2px; opacity:.78; margin-bottom:8px; }
  .tkt .tkt-cap .tk-count{ flex:none; letter-spacing:.4px; opacity:1; padding:1.5px 5px; border-radius:2px;
    border:1px solid var(--ink-line); background:rgba(255,255,255,.28); }
  .tkt .trow{ display:flex; justify-content:space-between; gap:12px; align-items:baseline;
    padding:2.5px 0; border-bottom:1px solid var(--ink-line); font-size:11px; letter-spacing:-.2px; }
  .tkt .trow .tk-lbl{ flex:none; opacity:.74; }
  .tkt .trow .tk-val{ text-align:right; font-weight:700; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; max-width:62%; }
  .tkt .tk-viol{ display:flex; gap:7px; padding:5px 0 3px; border-bottom:1px solid var(--ink-line); }
  .tkt .tk-viol .vnum{ flex:none; font-size:11px; font-weight:800; opacity:.55; line-height:1.25; }
  .tkt .tk-viol .vbody{ flex:1; min-width:0; }
  .tkt .tk-viol .v{ font-size:11.5px; font-weight:700; line-height:1.25; }
  .tkt .tk-viol .n{ font-size:9.5px; letter-spacing:.1px; opacity:.7; margin-top:1px; }
  .tkt .tk-stamps{ display:flex; flex-wrap:wrap; gap:5px 6px; margin-top:10px; }
  .tkt .tk-stamp{ font-size:8.5px; font-weight:800; letter-spacing:.8px; text-transform:uppercase;
    color:var(--ink-soft); border:1.4px solid var(--ink-soft); border-radius:3px; padding:2px 5px 1.5px;
    line-height:1; transform:rotate(-2.4deg); }
  .tkt .tk-stamp:nth-child(2n){ transform:rotate(1.8deg); }
  .tkt .tk-stamp:nth-child(3n){ transform:rotate(-0.8deg); }
  .tkt-photo{ position:relative; transform:rotate(-1.4deg);
    filter:drop-shadow(0 6px 12px rgba(60,50,30,.28)); border-radius:3px; overflow:hidden;
    -webkit-mask:radial-gradient(circle 7px at 50% 0,#0000 7px,#000 7.5px) repeat-x top/20px 51%,
                 radial-gradient(circle 7px at 50% 100%,#0000 7px,#000 7.5px) repeat-x bottom/20px 51%;
            mask:radial-gradient(circle 7px at 50% 0,#0000 7px,#000 7.5px) repeat-x top/20px 51%,
                 radial-gradient(circle 7px at 50% 100%,#0000 7px,#000 7.5px) repeat-x bottom/20px 51%; }

  /* overlays */
  .overlay-pay{ display:flex; align-items:center; gap:9px; padding:9px 11px; border-radius:10px;
    background:var(--money-bg); border:1px solid var(--money-line); }
  .overlay-pay .lbl{ font-size:12.5px; font-weight:700; color:var(--money); }
  .classif{ display:inline-flex; align-items:center; gap:4px; font-size:10.5px; font-weight:700;
    text-transform:uppercase; letter-spacing:.4px; color:var(--wf-muted);
    background:var(--wf-fill); border-radius:6px; padding:3px 7px; }

  /* confetti */
  @keyframes otr-fall{ 0%{ transform:translateY(-14px) rotate(0); opacity:0 }
    10%{ opacity:1 } 100%{ transform:translateY(220px) rotate(320deg); opacity:0 } }
  .confetti{ position:absolute; inset:0; overflow:hidden; pointer-events:none; z-index:3; }
  .confetti i{ position:absolute; top:-12px; width:7px; height:11px; border-radius:1px;
    animation:otr-fall 2.4s linear infinite; }
  @media (prefers-reduced-motion: reduce){ .confetti i{ animation:none; opacity:.9; } }

  /* analyzing badge — SmartMatch's background operation: a muted, low-saturation
     version of the sub-brand gradient that slowly shimmers, with a slowly
     rotating arrow. Reads as "an agent session running" before it issues a
     result — present but clearly not the full-saturation SmartMatch'd win. */
  @keyframes otr-an-shimmer{ 0%{ background-position:0% 50% } 100%{ background-position:220% 50% } }
  @keyframes otr-an-spin{ to{ transform:rotate(360deg) } }
  .sbadge.analyzing{ color:#6a5bd0;
    background:linear-gradient(100deg,#ecebff 0%,#f4e9ff 25%,#e6ecff 50%,#f4e9ff 75%,#ecebff 100%);
    background-size:220% 100%; animation:otr-an-shimmer 3.4s linear infinite;
    box-shadow:inset 0 0 0 1px rgba(123,118,200,.22); }
  .sbadge.analyzing .ico{ display:inline-flex; transform-origin:50% 50%;
    animation:otr-an-spin 2.6s linear infinite; }
  @media (prefers-reduced-motion: reduce){
    .sbadge.analyzing{ animation:none } .sbadge.analyzing .ico{ animation:none } }

  /* skeleton loader — a SmartMatch-branded gradient sweeps through grey blocks
     while the match is being computed (mirrors the SmartMatch'd card layout). */
  .sk{ position:relative; overflow:hidden; border-radius:6px; background:#ecebff; }
  .sk.circ{ border-radius:50%; }
  .sk::after{ content:""; position:absolute; inset:-10px;
    background:linear-gradient(100deg, transparent 0%, rgba(123,118,200,.10) 32%,
      rgba(106,91,208,.26) 50%, rgba(123,118,200,.10) 68%, transparent 100%);
    background-size:260% 100%; filter:blur(7px); animation:sk-sweep 4.5s linear infinite; }
  @keyframes sk-sweep{ 0%{ background-position:140% 0 } 100%{ background-position:-140% 0 } }
  @media (prefers-reduced-motion: reduce){ .sk::after{ animation:none } }
  `;
  document.head.appendChild(s);
}

// ── status registry (single source of truth for form+weight+icon+color) ───
// Hues tuned to the CEO-approved badge board (friendlier than raw DS tokens).
const OTR_TONE = {
  gray:  { light:['#eef0f4','#67707e','#98a1ae'], solid:['#3b3e46','#fff'] },
  red:   { light:['#fdeceb','#e5463a','#e5463a'], solid:['#ef4338','#fff'] },
  amber: { light:['#fff4e3','#b96a06','#e08a14'], solid:['#c2680a','#fff'] },
  blue:  { light:['#e9f1ff','#2e6bff','#2e6bff'], solid:['#2e6bff','#fff'] },
  green: { light:['#e4f7ec','#179a55','#19a558'], solid:['#19a558','#fff'] },
};

const OTR_STATUS = {
  incomplete:   { label:'Incomplete',   icon:'new-folder',               tone:'red',   fill:'light', series:1 },
  deadline:     { label:'Deadline',     icon:'alarm-solo',               tone:'red',   fill:'solid', series:1 },
  missed:       { label:'Court missed', icon:'warning-triangle',         tone:'red',   fill:'solid', series:1 },
  analyzing:    { label:"SmartMatch'n…",   icon:'triangle-arrow-synchronize-1', tone:'gray', fill:'light', series:2, loading:true },
  remarketing:  { label:'Re-SmartMatching', icon:'magnifying-glass-square',   tone:'gray',  fill:'light', series:2, loading:true },
  smartmatchd:  { label:"SmartMatch'd", icon:'check-thick',              tone:'grad',  fill:'solid', lockup:true,  series:2 },
  almostgone:   { label:'Last Chance',  icon:'warning-triangle',         tone:'red',   fill:'solid', series:2 },
  counter:      { label:'Counter offer',icon:'tag-empty',                tone:'amber', fill:'solid', series:2 },
  expired:      { label:'Expired',      icon:'delete-circle',            tone:'gray',  fill:'light', series:2 },
  active:       { label:'Active',       icon:'open-folder',              tone:'blue',  fill:'light', series:3 },
  'active-action':{ label:'Active',     icon:'open-folder',              tone:'blue',  fill:'light', series:3 },
  reassigned:   { label:'Active',       icon:'open-folder',              tone:'blue',  fill:'light', series:3 },
  resolved:     { label:'Resolved',     icon:'folder-check',             tone:'green', fill:'light', series:3 },
  dismissed:    { label:'Dismissed!',   icon:'folder-star-favorite',     tone:'green', fill:'solid', confetti:true,series:3 },
  cancelled:    { label:'Cancelled',    icon:'folder-remove',            tone:'gray',  fill:'light', series:3 },
};

// SmartMatch'd lockup: gradient chip + white check (the protected sub-logo, §7.6)
// SmartMatch'd mark: a thin check — no container chip, just the icon. The
// gradient stroke is the protected SmartMatch sub-brand cue (§7.6); pass
// color="#fff" when it sits on the gradient badge so it stays visible.
function SmartMatchMark({ size = 16, color = null }) {
  return (
    <span className="sm-mark" style={{ width: size, height: size }}>
      <svg viewBox="0 0 24 24" width={size} height={size} fill="none" style={{ display: 'block' }}>
        <defs>
          <linearGradient id="otr-smartmatch-grad" x1="2" y1="20" x2="22" y2="6" gradientUnits="userSpaceOnUse">
            <stop offset="0.06" stopColor="#5b63ff" />
            <stop offset="0.96" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
        <path d="M4.5 12.5 L9.5 17.5 L19.5 6.5" stroke={color || 'url(#otr-smartmatch-grad)'} strokeWidth="2.4"
          strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

// Lifecycle simplification (§ badge rule): every granular status collapses to ONE
// of five long-lived lifecycle badges — Incomplete · Active · Resolved · Dismissed ·
// Cancelled. Urgent/action signals are carried by the card's toast, not the badge.
const LIFECYCLE = { incomplete:'incomplete', deadline:'incomplete', dismissed:'dismissed', resolved:'resolved',
  cancelled:'cancelled', missed:'cancelled' };
const lifeStatus = (s) => LIFECYCLE[s] || 'active';

// Two TRANSIENT SmartMatch badge states keep their own mark on the card + detail
// hero — SmartMatch'n… (matching in progress) and SmartMatch'd (a quote landed).
// Every other status collapses to its calm lifecycle badge via lifeStatus.
const TRANSIENT_BADGE = { analyzing:true, smartmatchd:true };
const badgeStatus = (s) => TRANSIENT_BADGE[s] ? s : lifeStatus(s);

// THE reusable status badge. status = key in OTR_STATUS. unread→red dot.
// note = optional trailing text (e.g. "4 days", "4:52"). size sm|md.
function StatusBadge({ status, unread = false, note = null, size = 'md', style = {}, noIcon = false }) {
  const cfg = OTR_STATUS[status];
  if (!cfg) return null;
  const sm = size === 'sm';
  const base = {
    height: sm ? 22 : 25, padding: sm ? '0 8px' : '0 10px',
    fontSize: sm ? 12 : 13, ...style,
  };
  // Rule: all case status badges render in the LIGHT (tinted) style — no solid fills.
  const solid = false;
  const loading = !!cfg.loading;
  const cls = `sbadge${cfg.tilt ? ' tilt' : ''}${loading ? ' analyzing' : ''}`;
  let skin = {};
  if (loading) {
    skin = {}; // CSS .analyzing handles the muted shimmering gradient + text color
  } else if (cfg.tone === 'grad') {
    skin = { background: '#f1eeff', color: '#5b4bb8' };
  } else {
    const t = OTR_TONE[cfg.tone];
    skin = { background: t.light[0], color: t.light[1] };
  }
  const iconColor = loading
    ? '#8b86d6'
    : cfg.tone === 'grad'
    ? '#6a5bd0'
    : OTR_TONE[cfg.tone].light[2];
  return (
    <span className={cls} style={{ ...base, ...skin }}>
      {noIcon ? null : cfg.lockup
        ? <SmartMatchMark size={sm ? 15 : 17} color={cfg.tone === 'grad' ? '#6a5bd0' : null} />
        : <span className="ico"><FeatureIcon name={cfg.icon} size={sm ? 12 : 13} color={iconColor} /></span>}
      <span>{cfg.label}</span>
      {note && <span style={{ opacity: .85, fontWeight: 700 }}>· {note}</span>}
    </span>
  );
}

// ── primitives ────────────────────────────────────────────────────────────
function Thumb({ w = 52, h = 52, label = 'Ticket', r = 9 }) {
  return <div className="wf-photo" style={{ width: w, height: h, borderRadius: r }}><span>{label}</span></div>;
}

function Attorney({ size = 38, blurred = false }) {
  const r = Math.max(7, Math.round(size * 0.28));
  return (
    <div style={{ width: size, height: size, borderRadius: r, overflow: 'hidden', flex: 'none' }} className={blurred ? 'blur' : ''}>
      <img src="firm-team.jpg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
    </div>
  );
}

function Stars({ rating = 4.8, size = 12 }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, color: 'var(--wf-ink)' }}>
      <FeatureIcon name="star-1" size={size} color="var(--wf-ink)" />
      <span style={{ fontSize: size, fontWeight: 700, color: 'var(--wf-strong)' }}>{rating}</span>
    </span>
  );
}

function Bar({ w = '60%', h = 9, mt = 0, c = 'var(--wf-fill)' }) {
  return <div style={{ width: w, height: h, background: c, borderRadius: 999, marginTop: mt }} />;
}

// Phone frame shell (bare, no bezel) — status bar + Cases app bar + filters
function Frame({ children, title = 'Cases', filters = ['All', 'Action needed', 'Active', 'Resolved'], showChrome = true, screen = false, height }) {
  return (
    <div className={`otr otr-frame${screen ? ' screen' : ''}`} style={height ? { height } : {}}>
      {showChrome && <>
        <div className="otr-statusbar"><span>9:41</span><span className="dots"><i /><i /><i style={{ width: 18 }} /></span></div>
        <div className="otr-appbar"><h1>{title}</h1><div className="avatar" /></div>
        {filters && <div className="otr-filters">{filters.map((f, i) => <span key={f} className={`otr-chip${i === 0 ? ' on' : ''}`}>{f}</span>)}</div>}
      </>}
      {children}
    </div>
  );
}

// Confetti overlay (Dismissed! only)
function Confetti({ n = 16 }) {
  const cols = ['#1f9d57', '#22c55e', '#4ade80', '#15803d', '#86efac', '#2e74ff', '#7da9ff'];
  const bits = Array.from({ length: n }, (_, i) => ({
    left: (i * 6.3 + (i % 3) * 4) % 96 + 2,
    delay: (i % 7) * 0.28, dur: 2 + (i % 5) * 0.25,
    col: cols[i % cols.length], rot: (i * 47) % 360,
  }));
  return (
    <div className="confetti" aria-hidden="true">
      {bits.map((b, i) => (
        <i key={i} style={{ left: b.left + '%', background: b.col, animationDelay: b.delay + 's', animationDuration: b.dur + 's', transform: `rotate(${b.rot}deg)` }} />
      ))}
    </div>
  );
}

// Spec caption (above feed) + hardest-call note (below)
function Spec({ vk, title, tags }) {
  return (
    <div className="otr spec">
      <div className="vk">{vk}</div>
      <div className="vt">{title}</div>
      <div className="tags">{tags.map(([k, v]) => <span key={k} className="tag"><b>{k}</b> {v}</span>)}</div>
    </div>
  );
}
function HardestCall({ children }) {
  return <div className="otr note"><b>Hardest call —</b> {children}</div>;
}

// Rough "ticket = bad" paper. variant cream|pink · photo renders an uploaded
// image with the same torn treatment instead of typed fields.
const TKT_VARIANTS = ['cream', 'pink', 'blue', 'green', 'slate'];
function Ticket({ variant = 'cream', cap = 'TRAFFIC CITATION', fields = [], violations = [], flags = [], photo = false, style = {} }) {
  if (photo) {
    return (
      <div className="tkt-photo" style={{ width:'100%', height:118, ...style }}>
        <div className="wf-photo" style={{ width:'100%', height:'100%', borderRadius:0 }}><span>Ticket photo</span></div>
      </div>
    );
  }
  const v = TKT_VARIANTS.includes(variant) ? variant : 'cream';
  const multi = violations.length > 1;
  return (
    <div className={`tkt${v === 'cream' ? '' : ' ' + v}`} style={style}>
      <div className="tkt-cap">
        <span>{cap}</span>
        {multi && <span className="tk-count">{violations.length} counts</span>}
      </div>
      {fields.map(([l, val]) => (
        <div className="trow" key={l}><span className="tk-lbl">{l}</span><span className="tk-val">{val}</span></div>
      ))}
      {violations.map((vi, i) => (
        <div className="tk-viol" key={i}>
          {multi && <span className="vnum">{i + 1}.</span>}
          <div className="vbody"><div className="v">{vi.v}</div>{vi.note && <div className="n">({vi.note})</div>}</div>
        </div>
      ))}
      {flags.length > 0 && (
        <div className="tk-stamps">{flags.map((f) => <span className="tk-stamp" key={f}>{f}</span>)}</div>
      )}
    </div>
  );
}

Object.assign(window, {
  OTR_STATUS, OTR_TONE, StatusBadge, SmartMatchMark, lifeStatus, badgeStatus,
  Thumb, Attorney, Stars, Bar, Frame, Confetti, Spec, HardestCall, Ticket,
});

})();
