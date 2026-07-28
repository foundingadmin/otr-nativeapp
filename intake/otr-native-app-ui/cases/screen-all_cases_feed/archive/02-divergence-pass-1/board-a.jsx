// board-a.jsx — BOARD A · CPC + badge component library (the legibility key)
/* __IIFE__ */ ;(function(){
const { DCSection, DCArtboard } = window;
const { StatusBadge, SmartMatchMark, OTR_STATUS, OTR_TONE, CPCRef, CASES } = window;
const { FeatureIcon: FIa } = window.OffTheRecordDesignSystem_6eff96;

// canvas-tinted artboard holding one isolated CPC
function Iso({ c, tap }) {
  return (
    <div className="otr" style={{ padding:'18px 16px', height:'100%' }}>
      <CPCRef c={c} tap={tap} />
    </div>
  );
}

function BadgeCell({ status, unread, note, caption }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:6, alignItems:'flex-start' }}>
      <StatusBadge status={status} unread={unread} note={note} />
      <span style={{ fontSize:10.5, color:'var(--wf-faint)', fontWeight:600, letterSpacing:.2 }}>{caption}</span>
    </div>
  );
}
function SeriesBlock({ k, name, sub, children, first }) {
  return (
    <div style={{ marginTop: first ? 26 : 24, paddingTop: first ? 0 : 22, borderTop: first ? 'none' : '1px solid var(--wf-line2)' }}>
      <div style={{ display:'flex', alignItems:'baseline', gap:8, marginBottom:14 }}>
        <span style={{ fontSize:11, fontWeight:800, letterSpacing:.8, textTransform:'uppercase', color:'var(--otr-blue)' }}>Series {k}</span>
        <span style={{ fontSize:13.5, fontWeight:800, color:'var(--wf-ink)', letterSpacing:-.2 }}>{name}</span>
        <span style={{ fontSize:11.5, color:'var(--wf-faint)' }}>{sub}</span>
      </div>
      <div style={{ display:'flex', flexWrap:'wrap', gap:'20px 22px' }}>{children}</div>
    </div>
  );
}
function Rule({ swatch, label, desc }) {
  return (
    <div style={{ display:'flex', gap:9, alignItems:'flex-start' }}>
      <div style={{ flex:'none', marginTop:1 }}>{swatch}</div>
      <div><div style={{ fontSize:12, fontWeight:700, color:'var(--wf-ink)' }}>{label}</div>
        <div style={{ fontSize:11.5, color:'var(--wf-muted)', lineHeight:1.4 }}>{desc}</div></div>
    </div>
  );
}

function BadgeRegistry() {
  return (
    <div className="otr" style={{ padding:'30px 30px 34px', height:'100%', background:'#fff' }}>
      <div style={{ fontSize:11, fontWeight:800, letterSpacing:1, textTransform:'uppercase', color:'var(--wf-faint)' }}>One reusable component</div>
      <h2 style={{ margin:'3px 0 2px', fontSize:23, fontWeight:800, letterSpacing:-.5 }}>The status badge — every §6.0 state</h2>
      <p style={{ margin:'0', fontSize:13, color:'var(--wf-muted)', maxWidth:520 }}>
        Each badge inherits the Core badge and pairs a Streamline Flex&nbsp;Solid icon + color + weight. Meaning lives in <b>form &amp; weight</b>, not just the label.</p>

      <SeriesBlock k="1" name="Unfinished business" sub="dotted card · a gentle nudge" first>
        <BadgeCell status="incomplete" caption="light · straight" />
        <BadgeCell status="deadline" note="6 days" caption="solid red · countdown" />
      </SeriesBlock>

      <SeriesBlock k="2" name="Quote proposal" sub={'full attention · "me first!"'}>
        <BadgeCell status="analyzing" caption="light · loading (never gradient)" />
        <BadgeCell status="smartmatchd" caption="gradient + checkmark lockup" />
        <BadgeCell status="almostgone" caption="solid amber · ~5 min" />
        <BadgeCell status="expired" caption="solid red · lapsed" />
      </SeriesBlock>

      <SeriesBlock k="3" name="Active case management" sub="reassuring milestones">
        <BadgeCell status="active" caption="light blue · default" />
        <BadgeCell status="active" unread caption="+ red dot · unread" />
        <BadgeCell status="active-action" caption="stays light · action lives in the card" />
        <BadgeCell status="resolved" caption="light green · macro conclusion" />
        <BadgeCell status="dismissed" caption="solid green · the win + confetti" />
      </SeriesBlock>

      {/* form + weight legend */}
      <div style={{ marginTop:28, paddingTop:24, borderTop:'1px solid var(--wf-line)', display:'grid',
        gridTemplateColumns:'1fr 1fr', gap:'22px 32px' }}>
        <Rule label="Light fill = ambient" desc="Incomplete · Analyzing · Active · Resolved — steady, low cognitive load."
          swatch={<span className="sbadge" style={{ background:'#e9f1ff', color:'#2e6bff', height:20, fontSize:11 }}>Aa</span>} />
        <Rule label="Solid fill = act now / peak" desc="Reserved for pre-commitment urgency: Deadline · SmartMatch'd · Almost gone · Expired · Dismissed!"
          swatch={<span className="sbadge solid" style={{ background:'#2e6bff', color:'#fff', height:20, fontSize:11 }}>Aa</span>} />
        <Rule label="Straight = default" desc="Aligned in the feed — the calm baseline."
          swatch={<span className="sbadge" style={{ background:'#e4f7ec', color:'#179a55', height:20, fontSize:11 }}>Aa</span>} />
        <Rule label="Needs attention → in the card" desc="Once a case is paid & active, a required action (LOE) lives in the card's action — the badge stays a calm light Active, not a louder form."
          swatch={<span className="sbadge" style={{ background:'#e9f1ff', color:'#2e6bff', height:20, fontSize:11 }}><FIa name="file-edit" size={11} color="#2e6bff" /></span>} />
        <Rule label="Core badge + gear variant" desc="The base all badges inherit (incl. a config/gear variant)."
          swatch={<span className="sbadge" style={{ background:'#eef0f4', color:'#67707e', height:20, fontSize:11 }}><FIa name="cog" size={11} color="#67707e" /></span>} />
        <Rule label="SmartMatch'd lockup" desc="Gradient + checkmark — a protected sub-brand, the one exception to Flex Solid (§7.6)."
          swatch={<SmartMatchMark size={20} />} />
      </div>
    </div>
  );
}

function BoardA() {
  return (
    <DCSection id="board-a" title="Board A · Badge + CPC component library"
      subtitle="The legibility key — one reusable badge across every §6.0 state, then one isolated Case Preview Card per status (the full spectrum).">
      <DCArtboard id="a-registry" label="Status badge — all states + form/weight rules" width={620} height={922} style={{ background:'#fff' }}>
        <BadgeRegistry />
      </DCArtboard>

      <DCArtboard id="a-incomplete" label="CPC · Incomplete" width={390} height={325} style={{ background:'#eef2fc' }}><Iso c={CASES.incomp} /></DCArtboard>
      <DCArtboard id="a-deadline" label="CPC · Deadline (solid red, dotted card)" width={390} height={315} style={{ background:'#eef2fc' }}><Iso c={CASES.deadline} /></DCArtboard>
      <DCArtboard id="a-analyzing" label="CPC · Analyzing…" width={390} height={240} style={{ background:'#eef2fc' }}><Iso c={CASES.analyze} /></DCArtboard>
      <DCArtboard id="a-smart" label="CPC · SmartMatch'd (blurred attorney + quote)" width={390} height={338} style={{ background:'#eef2fc' }}><Iso c={CASES.smart} /></DCArtboard>
      <DCArtboard id="a-almost" label="CPC · Almost gone (~5 min)" width={390} height={338} style={{ background:'#eef2fc' }}><Iso c={CASES.almost} /></DCArtboard>
      <DCArtboard id="a-expired" label="CPC · Expired" width={390} height={306} style={{ background:'#eef2fc' }}><Iso c={CASES.expired} /></DCArtboard>
      <DCArtboard id="a-active" label="CPC · Active (reassurance, no action)" width={390} height={284} style={{ background:'#eef2fc' }}><Iso c={CASES.active} /></DCArtboard>
      <DCArtboard id="a-unread" label="CPC · Active + unread dot" width={390} height={394} style={{ background:'#eef2fc' }}><Iso c={CASES.unread} /></DCArtboard>
      <DCArtboard id="a-loe" label="CPC · Active — needs action (LOE, calm badge)" width={390} height={394} style={{ background:'#eef2fc' }}><Iso c={CASES.loe} /></DCArtboard>
      <DCArtboard id="a-overdue" label="CPC · Active + OVERDUE overlay" width={390} height={423} style={{ background:'#eef2fc' }}><Iso c={CASES.overdue} /></DCArtboard>
      <DCArtboard id="a-resolved" label="CPC · Resolved (macro conclusion)" width={390} height={357} style={{ background:'#eef2fc' }}><Iso c={CASES.resolved} /></DCArtboard>
      <DCArtboard id="a-dismissed" label="CPC · Dismissed! (the win + confetti)" width={390} height={357} style={{ background:'#eef2fc' }}><Iso c={CASES.dismiss} /></DCArtboard>
      <DCArtboard id="a-dismiss-pay" label="CPC · Dismissed! + overdue (balance wins, §7.2)" width={390} height={460} style={{ background:'#eef2fc' }}><Iso c={CASES.dismissPay} /></DCArtboard>
    </DCSection>
  );
}
window.BoardA = BoardA;

})();
