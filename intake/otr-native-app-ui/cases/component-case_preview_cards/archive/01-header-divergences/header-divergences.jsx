// header-divergences.jsx — four takes on the requested CPC identity-zone change:
//   1) the classification "Misdemeanor" badge → a horizontal row of VIOLATION
//      pills with a count-chip for overflow (+N), and
//   2) the court date promoted UP into the title eyebrow, replacing the quiet
//      "Mar 2026" issue month/year.
// Each divergence renders a FULL loe (active-action) card so the new header is
// seen in real context (attorney row + "sign your LOE" alert footer) — the
// footer/body reuse the locked-in window components so only the header diverges.
/* __IIFE__ */ ;(function(){
const { DCSection, DCArtboard, CASES, StatusBadge, badgeStatus,
  cardAlert, GroupedAlert, AttorneyRow } = window;
const { FeatureIcon: FI } = window.OffTheRecordDesignSystem_6eff96;

// The loe fixture carries one violation + more:2. Expand it into the real
// multi-count charge list these pills are meant to express.
const C = { ...CASES.loe };
const CHARGES = [
  { name:'Reckless driving',    code:'TC 545.401' },
  { name:'Driving w/o license', code:'TC 521.025' },
  { name:'No insurance',        code:'TC 601.191' },
];
const COURT = C.courtDate; // "May 14, 2026"

// ── shared bits ─────────────────────────────────────────────────────────────
const TitleLine = ({ children, style }) =>
  <p className="ttl" style={{ margin:'1px 0 0', ...style }}>{children}</p>;

// the status badge that sits top-right of every header (unchanged behavior)
const Badge = () => <StatusBadge status={badgeStatus(C.status)} note={null} />;

// the card shell: header (the divergent part) + the unchanged body/footer
function Card({ children }){
  const al = cardAlert(C);
  return (
    <div className="cpc">
      {children}
      <div style={{ marginTop:16, display:'flex', flexDirection:'column', gap:8 }}>
        <AttorneyRow c={C} />
      </div>
      {al && <GroupedAlert al={al} />}
    </div>
  );
}

// ── D1 · Filled pills + grey count chip (the literal reading) ────────────────
// Court date as a calendar-led plain eyebrow. Charge pills reuse the existing
// .classif fill; overflow collapses to a grey "+N" pill matching the chip-num.
function H1(){
  return (
    <>
      <div style={{ display:'flex', justifyContent:'space-between', gap:8, alignItems:'flex-start' }}>
        <div style={{ minWidth:0 }}>
          <div style={{ display:'flex', alignItems:'center', gap:5, fontSize:11.5, fontWeight:600, color:'var(--wf-faint)', letterSpacing:.2 }}>
            <i className="fa-regular fa-calendar" style={{ fontSize:10.5 }} />Court date · {COURT}
          </div>
          <TitleLine>{window.tPlace(C)}</TitleLine>
        </div>
        <Badge />
      </div>
      <div style={{ display:'flex', gap:6, marginTop:10, alignItems:'center', flexWrap:'wrap' }}>
        <span className="classif" style={{ whiteSpace:'nowrap' }}><FI name="tag" size={10} color="var(--wf-muted)" />{CHARGES[0].name}</span>
        <span className="classif" style={{ background:'var(--wf-fill)', color:'var(--wf-muted)', paddingLeft:6, paddingRight:6, whiteSpace:'nowrap' }}>+{CHARGES.length-1}</span>
      </div>
    </>
  );
}

// ── D2 · Severity-tinted pills (classification → color) ──────────────────────
// The deleted "Misdemeanor" badge's meaning is re-encoded as pill COLOR: a
// misdemeanor tints the charge pills amber (warning severity). Court date sits
// in a compact uppercase micro eyebrow.
function H2(){
  const pill = {
    display:'inline-flex', alignItems:'center', gap:5, fontSize:11, fontWeight:700, whiteSpace:'nowrap',
    color:'var(--wf-muted)', background:'#fff', border:'1px solid var(--wf-line)', borderRadius:999, padding:'3px 9px',
  };
  return (
    <>
      <div style={{ display:'flex', justifyContent:'space-between', gap:8, alignItems:'flex-start' }}>
        <div style={{ minWidth:0 }}>
          <div className="micro" style={{ color:'var(--wf-faint)', whiteSpace:'nowrap' }}>Issued · {window.tDate(C)}</div>
          <TitleLine>{window.tPlace(C)}</TitleLine>
        </div>
        <Badge />
      </div>
      <div style={{ display:'flex', gap:6, marginTop:10, alignItems:'center', flexWrap:'wrap' }}>
        <span style={pill}>{CHARGES[0].name} +{CHARGES.length-1}</span>
      </div>
    </>
  );
}

// ── D3 · Two-line charge pills + circular count badge ────────────────────────
// Each pill shows the charge name over its statute code (more legible for the
// real multi-count reality); overflow is a round count badge like an avatar +N.
function H3(){
  const pill = {
    display:'inline-flex', flexDirection:'column', gap:1, lineHeight:1.15,
    background:'var(--wf-fill)', borderRadius:8, padding:'5px 9px', minWidth:0,
  };
  return (
    <>
      <div style={{ display:'flex', justifyContent:'space-between', gap:8, alignItems:'flex-start' }}>
        <div style={{ minWidth:0 }}>
          <div style={{ display:'flex', alignItems:'center', gap:5, fontSize:11.5, fontWeight:600, color:'var(--wf-faint)', letterSpacing:.2 }}>
            <i className="fa-regular fa-calendar" style={{ fontSize:10.5 }} />Court date · {COURT}
          </div>
          <TitleLine>{window.tPlace(C)}</TitleLine>
        </div>
        <Badge />
      </div>
      <div style={{ display:'flex', gap:6, marginTop:10, alignItems:'stretch' }}>
        <span style={pill}>
          <span style={{ fontSize:11.5, fontWeight:700, color:'var(--wf-ink)', whiteSpace:'nowrap' }}>{CHARGES[0].name}</span>
          <span style={{ fontSize:9.5, fontWeight:600, color:'var(--wf-faint)', letterSpacing:.2 }}>{CHARGES[0].code}</span>
        </span>
        <span style={{ alignSelf:'center', display:'inline-flex', alignItems:'center', justifyContent:'center',
          minWidth:30, height:30, padding:'0 6px', borderRadius:999, background:'var(--wf-ink)', color:'#fff',
          fontSize:12, fontWeight:800 }}>+{CHARGES.length-1}</span>
      </div>
    </>
  );
}

// ── D4 · Court date as a solid eyebrow chip · outline pills · solid +N ────────
// The court date is promoted to a real filled chip in the eyebrow (the strongest
// "this date matters" treatment); charges read as light outline pills, overflow
// as a solid dark count chip to anchor the row's end.
function H4(){
  const pill = {
    display:'inline-flex', alignItems:'center', gap:5, fontSize:11, fontWeight:700, whiteSpace:'nowrap',
    color:'var(--wf-muted)', background:'#fff', border:'1px solid var(--wf-line)', borderRadius:999, padding:'3px 9px',
  };
  return (
    <>
      <div style={{ display:'flex', justifyContent:'space-between', gap:8, alignItems:'flex-start' }}>
        <div style={{ minWidth:0 }}>
          <span style={{ display:'inline-flex', alignItems:'center', gap:5, fontSize:11, fontWeight:700,
            background:'#eef2fc', color:'var(--otr-blue)', borderRadius:999, padding:'3px 9px' }}>
            <i className="fa-regular fa-calendar" style={{ fontSize:10 }} />Court · {COURT}
          </span>
          <TitleLine style={{ marginTop:6 }}>{window.tPlace(C)}</TitleLine>
        </div>
        <Badge />
      </div>
      <div style={{ display:'flex', gap:6, marginTop:10, alignItems:'center', flexWrap:'wrap' }}>
        <span style={pill}><FI name="tag" size={10} color="var(--wf-faint)" />{CHARGES[0].name}</span>
        <span style={pill}>{CHARGES[1].name}</span>
        <span style={{ ...pill, background:'var(--wf-ink)', color:'#fff', border:'none', fontWeight:800 }}>+{CHARGES.length-2}</span>
      </div>
    </>
  );
}

const DIVS = [
  { id:'d1', label:'D1 • filled pills', note:'The literal reading. Charge pills reuse the existing classification fill, and overflow collapses to a neutral count chip. The court date leads the eyebrow with a calendar glyph.', H:H1 },
  { id:'d2', label:'D2 • severity tinted pills', note:'The dropped Misdemeanor badge is re-encoded as pill color. A misdemeanor tints the charges amber. The court eyebrow stays compact and uppercase.', H:H2 },
  { id:'d3', label:'D3 • two line pills', note:'Pills carry the charge name over its statute code for the multi count reality. Overflow is a round count badge.', H:H3 },
  { id:'d4', label:'D4 • court date chip', note:'The court date is promoted to a solid eyebrow chip, the strongest treatment for a date that matters. Charge pills are outlined, and a solid dark count chip anchors the row.', H:H4 },
];

function HeaderDivergences(){
  return (
    <DCSection id="hdr-div" title="Header Divergences" eyebrow="Exploration" updated="Updated • Tue Jul 7, 2026"
      subtitle="Four takes on the card header. The classification badge becomes a row of violation pills with a count for overflow, and the court date moves up to replace the issue month. The same active case sits under each header so the change is seen in context.">
      {DIVS.map(d => (
        <DCArtboard key={d.id} id={d.id} label={d.label} width={390} height={470}>
          <div className="otr" style={{ padding:'18px 15px', background:'var(--wf-bg)', height:'100%', boxSizing:'border-box' }}>
            <Card><d.H /></Card>
            <p style={{ margin:'14px 2px 0', fontSize:11.5, lineHeight:1.5, color:'var(--wf-muted)', textWrap:'pretty' }}>{d.note}</p>
          </div>
        </DCArtboard>
      ))}
    </DCSection>
  );
}
window.HeaderDivergences = HeaderDivergences;
})();
