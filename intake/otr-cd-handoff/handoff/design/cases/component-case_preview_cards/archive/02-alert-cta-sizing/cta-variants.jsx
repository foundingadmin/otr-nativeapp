// cta-variants.jsx — four takes on the GroupedAlert action button, which reads
// too large/heavy at its current 44px full-width pill (Board-A comment, on the
// "unread" card's "View updates" CTA). V1–V4 render the SAME real card
// (CASES.unread — info tone, "2 unread messages") so the button is judged in
// context, not in isolation. The decided direction is V4 (whole block taps).
// V4 also supports an optional one-line supporting descriptor under the
// headline — shown on two OTHER action items that actually benefit from it
// (unread messages reads fine as a bare headline; these two don't).
/* __IIFE__ */ ;(function(){
const { DCSection, DCArtboard, CASES, CPCHeader, AttorneyRow, ALERT_TONE, cardAlert } = window;
const { FeatureIcon: FI } = window.OffTheRecordDesignSystem_6eff96;

// the card shell every variant shares: header + attorney row + the divergent
// alert block. `tap` marks the whole card as clickable with a single chevron
// centered on the right edge (no visible button, and clear of the top-right
// status badge — that's why we don't use the default .cpc.tap corner glyph).
function FixtureCard({ c, tap, children }){
  return (
    <div className="cpc" style={ tap ? { position:'relative', paddingRight:34 } : undefined }>
      <CPCHeader c={c} />
      <div style={{ marginTop:16, display:'flex', flexDirection:'column', gap:8 }}>
        <AttorneyRow c={c} />
      </div>
      {children}
      {tap && (
        <div style={{ position:'absolute', right:14, top:'50%', transform:'translateY(-50%)', display:'flex' }}>
          <FI name="chevron-right" size={16} color="var(--wf-faint)" />
        </div>
      )}
    </div>
  );
}

// shared alert message row. `sub` is optional: a single supporting line under
// the headline, used only when the action item needs a bit more context than
// the headline alone.
function AlertMessage({ al, t, sub }){
  return (
    <div style={{ display:'flex', alignItems:'flex-start', gap:10 }}>
      <span style={{ color:t.icon, fontSize:16, flex:'none', width:18, textAlign:'center', lineHeight:'19px' }}><i className={`fa-solid ${al.faIcon}`} /></span>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ fontSize:13, fontWeight:700, color:t.ink, lineHeight:1.35, textWrap:'pretty' }}>{al.text}</div>
        {sub && <div style={{ marginTop:2, fontSize:12, fontWeight:500, color:t.ink, opacity:.72, lineHeight:1.4, textWrap:'pretty' }}>{sub}</div>}
      </div>
    </div>
  );
}

// ── V0 · No toast at all ────────────────────────────────────────────────────
// The baseline: nothing needs the customer's attention right now, so there is
// no tinted alert block AND no button of any kind. The card itself is the
// only affordance — the corner chevron says "this whole card is tappable."
const ACTIVE = { ...CASES.active };
function V0(){ return null; }

// ── the unread-messages fixture drives V1–V4 (the button-sizing study) ──────
const UNREAD = { ...CASES.unread };
const AL_UNREAD = cardAlert(UNREAD); // { tone:'info', faIcon:'fa-comment-dots', text:'2 unread messages', cta:'View updates' }
const T_UNREAD = ALERT_TONE[AL_UNREAD.tone];

// ── V1 · Same pill, just shorter ─────────────────────────────────────────────
function V1(){
  return (
    <div style={{ marginTop:12, background:T_UNREAD.bg, border:`1px solid ${T_UNREAD.line}`, borderRadius:14, padding:'11px 12px 12px' }}>
      <AlertMessage al={AL_UNREAD} t={T_UNREAD} />
      <div className="act ghost full" style={{ marginTop:10, height:36, fontSize:13, borderRadius:999, borderColor:T_UNREAD.line }}>{AL_UNREAD.cta}</div>
    </div>
  );
}

// ── V2 · Right-aligned compact button ────────────────────────────────────────
function V2(){
  return (
    <div style={{ marginTop:12, background:T_UNREAD.bg, border:`1px solid ${T_UNREAD.line}`, borderRadius:14, padding:'11px 12px' }}>
      <div style={{ display:'flex', alignItems:'center', gap:10 }}>
        <div style={{ flex:1, minWidth:0 }}><AlertMessage al={AL_UNREAD} t={T_UNREAD} /></div>
        <div className="act ghost" style={{ flex:'none', height:32, fontSize:12.5, padding:'0 14px', borderRadius:999, borderColor:T_UNREAD.line }}>{AL_UNREAD.cta}</div>
      </div>
    </div>
  );
}

// ── V3 · Text-link CTA, no button chrome ─────────────────────────────────────
function V3(){
  return (
    <div style={{ marginTop:12, background:T_UNREAD.bg, border:`1px solid ${T_UNREAD.line}`, borderRadius:14, padding:'11px 12px 12px' }}>
      <AlertMessage al={AL_UNREAD} t={T_UNREAD} />
      <div style={{ marginTop:9, display:'flex', alignItems:'center', justifyContent:'space-between',
        fontSize:13, fontWeight:700, color:T_UNREAD.ink }}>
        {AL_UNREAD.cta}<FI name="chevron-right" size={13} color={T_UNREAD.ink} />
      </div>
    </div>
  );
}

// ── V4 · Whole block is the tap target (the decided direction) ─────────────
// No visible CTA at all — the message and a trailing chevron ARE the button;
// tapping anywhere in the tinted block resolves the alert.
function TapAlert({ c, sub }){
  const al = cardAlert(c);
  const t = ALERT_TONE[al.tone];
  return (
    <div className="cpc tap" style={{ marginTop:12, background:t.bg, border:`1px solid ${t.line}`, borderRadius:14, padding:'11px 34px 12px 12px', boxShadow:'none', '--cpc-caret':t.icon }}>
      <AlertMessage al={al} t={t} sub={sub} />
    </div>
  );
}
function V4(){ return <TapAlert c={UNREAD} />; }

// ── V4b · Sign the letter of engagement (needs the extra line) ─────────────
// The headline alone ("Sign your letter of engagement") doesn't say who it
// engages or why it matters right now — the supporting line answers both.
const LOE = { ...CASES.loe };
function V4b(){
  return <TapAlert c={LOE} sub="Confirms Whitfield and Reyes to represent you at your May 14 court date." />;
}

// ── V4c · Counter offer (needs the extra line) ──────────────────────────────
// The headline states the fact; the supporting line gives the reason to act
// now, since a bare "$189" without context reads as just a price change.
const COUNTER = { ...CASES.counter };
function V4c(){
  return <TapAlert c={COUNTER} sub="Carla Reyes raised her quote from $149. Review the new terms before you respond." />;
}

// V4d · payment overdue: same whole-block tap, critical money tone (red), caret adopts it.
const OVERDUE = { ...CASES.active, status:'active', balance:{ amount:109, overdue:true } };
function V4d(){
  return <TapAlert c={OVERDUE} sub="Your $109 court filing fee is 5 days past due. Clear it to keep Helen on your case." />;
}

const VARIANTS = [
  { id:'v0', label:'V0 • no toast, no button', note:'The baseline: nothing needs attention, so there is no tinted alert block and no CTA at all. No caret or button chrome either; the whole card is the tap target, and tapping anywhere opens the case.', V:V0, tap:false, h:270 },
  { id:'v1', label:'V1 • shorter pill', note:'Same full-width filled pill, just smaller: 44px to 36px, 14px to 13px label. The safest, most literal fix.', V:V1 },
  { id:'v2', label:'V2 • compact, on the headline row', note:'Drops full-width. The button sizes to its label and sits at the row\u2019s end, reading as a small action rather than a second bar.', V:V2 },
  { id:'v3', label:'V3 • text-link CTA', note:'No button chrome at all: bold colored text plus a chevron, matching the existing tap-card treatment elsewhere in the app.', V:V3 },
  { id:'v4', label:'V4 • whole block taps', note:'No visible CTA. The tinted block itself is the tap target, with a corner chevron affordance. Smallest footprint of the four. The decided direction.', V:V4 },
  { id:'v4b', label:'V4b • LOE signature, with support line', note:'A case where the bare headline needs help: which firm, and why now. The optional supporting line carries that context.', V:V4b, h:372 },
  { id:'v4c', label:'V4c • counter offer, with support line', note:'Another case that benefits: the headline states the fact, the supporting line gives the reason to act. Unread messages, by contrast, needed no help and stays bare (V4).', V:V4c, h:372 },
  { id:'v4d', label:'V4d • payment overdue, critical', note:'The whole-block tap carrying a critical money alert. The tone shifts to red, the caret adopts it, and the supporting line names the amount and the stakes.', V:V4d, h:372 },
];

function CTAVariants(){
  return (
    <DCSection id="cta-sizing" title="Alert CTA Sizing" eyebrow="Exploration" updated="Updated • Fri Jul 10, 2026"
      subtitle="The action button inside a card's grouped alert reads too large at 44px full-width. V4 (whole block taps) is decided. Its optional one-line supporting descriptor is shown here on two action items that actually need it.">
      {VARIANTS.map(v => (
        <DCArtboard key={v.id} id={v.id} label={v.label} width={390} height={v.h || 340}>
          <div className="otr" style={{ padding:'18px 15px', background:'var(--wf-bg)', height:'100%', boxSizing:'border-box' }}>
            <FixtureCard c={v.id === 'v0' ? ACTIVE : v.id === 'v4b' ? LOE : v.id === 'v4c' ? COUNTER : v.id === 'v4d' ? OVERDUE : UNREAD} tap={v.tap}><v.V /></FixtureCard>
            <p style={{ margin:'14px 2px 0', fontSize:11.5, lineHeight:1.5, color:'var(--wf-muted)', textWrap:'pretty' }}>{v.note}</p>
          </div>
        </DCArtboard>
      ))}
    </DCSection>
  );
}
window.CTAVariants = CTAVariants;
})();
