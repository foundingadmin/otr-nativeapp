// atoms.jsx — ATOMIC SYSTEM page · the reusable building blocks in isolation.
// Status semantics (which badge, which tone, when) live on the Status-handling
// page; this page is purely the parts: tokens, badge, buttons, toast, attorney
// lockup, the ticket element, the card anatomy, and the motion atoms.
/* __IIFE__ */ ;(function(){
const { DCSection, DCArtboard, OTR_TONE, StatusBadge, GroupedAlert, AttLockup,
  AttorneyRow, Ticket, Confetti, CPCConsistent, CASES } = window;
const { FeatureIcon: FI } = window.OffTheRecordDesignSystem_6eff96;

// ── shared chrome ──────────────────────────────────────────────────────────
function Panel({ children }){
  return <div className="otr" style={{ padding:'34px 32px 38px', height:'100%', background:'#fff' }}>{children}</div>;
}
function Eyebrow({ children }){
  return <div style={{ fontSize:11, fontWeight:800, letterSpacing:1, textTransform:'uppercase', color:'var(--wf-faint)' }}>{children}</div>;
}
function H2({ children }){
  return <h2 style={{ margin:'3px 0 2px', fontSize:23, fontWeight:800, letterSpacing:-.5 }}>{children}</h2>;
}
function Lead({ children }){
  return <p style={{ margin:0, fontSize:13, color:'var(--wf-muted)', maxWidth:540, lineHeight:1.5 }}>{children}</p>;
}
function Group({ title, children, first }){
  return (
    <div style={{ marginTop: first ? 22 : 26, paddingTop: first ? 0 : 22, borderTop: first ? 'none' : '1px solid var(--wf-line2)' }}>
      <div style={{ fontSize:11, fontWeight:800, letterSpacing:.7, textTransform:'uppercase', color:'var(--otr-blue)', marginBottom:14 }}>{title}</div>
      {children}
    </div>
  );
}

// ── 1 · color ──────────────────────────────────────────────────────────────
function Sw({ c, name, hex }){
  return (
    <div style={{ width:92 }}>
      <div style={{ height:52, borderRadius:10, background:c, border:'1px solid rgba(16,24,40,.08)' }} />
      <div style={{ fontSize:11, fontWeight:700, color:'var(--wf-ink)', marginTop:6 }}>{name}</div>
      <div style={{ fontSize:10, color:'var(--wf-faint)', fontFamily:'ui-monospace,Menlo,monospace' }}>{hex}</div>
    </div>
  );
}
function Row({ children }){ return <div style={{ display:'flex', flexWrap:'wrap', gap:'16px 14px' }}>{children}</div>; }
function ColorBoard(){
  const tones = [['gray','Gray'],['red','Red · money'],['amber','Amber'],['blue','Blue'],['green','Green']];
  return (
    <Panel>
      <Eyebrow>Foundations</Eyebrow>
      <H2>Color tokens</H2>
      <Lead>A wireframe-neutral base. Real color is reserved for status badges, the money/overdue accent, and the SmartMatch'd sub-brand gradient — never decoration.</Lead>
      <Group title="Brand & accent" first>
        <Row>
          <Sw c="#2e6bff" name="Brand blue" hex="#2E6BFF" />
          <Sw c="#e5463a" name="Money / red" hex="#E5463A" />
          <Sw c="linear-gradient(102deg,#5b63ff,#8b5cf6)" name="SmartMatch'd" hex="grad" />
          <Sw c="#6a5bd0" name="Match · purple" hex="#6A5BD0" />
        </Row>
      </Group>
      <Group title="Neutrals">
        <Row>
          <Sw c="#1b1c21" name="Ink" hex="#1B1C21" />
          <Sw c="#3b3e46" name="Strong" hex="#3B3E46" />
          <Sw c="#6b7280" name="Muted" hex="#6B7280" />
          <Sw c="#9aa1ad" name="Faint" hex="#9AA1AD" />
          <Sw c="#e6e8ec" name="Line" hex="#E6E8EC" />
          <Sw c="#f3f4f6" name="Fill" hex="#F3F4F6" />
        </Row>
      </Group>
      <Group title="Badge tones · light tint + ink">
        <Row>
          {tones.map(([k,name]) => {
            const t = OTR_TONE[k];
            return (
              <div key={k} style={{ width:92 }}>
                <div style={{ height:52, borderRadius:10, background:t.light[0], border:'1px solid rgba(16,24,40,.08)',
                  display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <span style={{ fontSize:15, fontWeight:800, color:t.light[1] }}>Aa</span>
                </div>
                <div style={{ fontSize:11, fontWeight:700, color:'var(--wf-ink)', marginTop:6 }}>{name}</div>
                <div style={{ fontSize:10, color:'var(--wf-faint)', fontFamily:'ui-monospace,Menlo,monospace' }}>{t.light[1].toUpperCase()}</div>
              </div>
            );
          })}
        </Row>
      </Group>
    </Panel>
  );
}

// ── 2 · text & shape ────────────────────────────────────────────────────────
function TextBoard(){
  const Spec = ({ cls, label, sample }) => (
    <div style={{ display:'grid', gridTemplateColumns:'150px 1fr', gap:18, alignItems:'baseline', padding:'12px 0', borderBottom:'1px solid var(--wf-line2)' }}>
      <div><div style={{ fontSize:12, fontWeight:700, color:'var(--wf-ink)' }}>{label}</div>
        <code style={{ fontSize:10.5, color:'var(--wf-faint)' }}>.{cls}</code></div>
      <div>{sample}</div>
    </div>
  );
  return (
    <Panel>
      <Eyebrow>Foundations</Eyebrow>
      <H2>Text & shape</H2>
      <Lead>The type roles used across the cards, and the pill-forward geometry — fully-rounded badges, chips, and buttons; soft 16px card corners.</Lead>
      <div style={{ marginTop:18 }}>
        <Spec cls="ttl" label="Card title" sample={<p className="ttl" style={{ margin:0 }}>San Diego, CA</p>} />
        <Spec cls="sub" label="Subhead" sample={<span className="sub">Best-fit local pro · Mar 2026</span>} />
        <Spec cls="rec" label="Record line" sample={<span className="rec">Reduced to non-moving · 1 pt avoided</span>} />
        <Spec cls="micro" label="Micro / overline" sample={<span className="micro">40% complete</span>} />
        <Spec cls="classif" label="Classification chip" sample={<span className="classif"><FI name="tag" size={10} color="var(--wf-muted)" />Infraction</span>} />
      </div>
      <Group title="Shape · pills + soft cards">
        <div style={{ display:'flex', alignItems:'center', gap:14, flexWrap:'wrap' }}>
          <span className="sbadge" style={{ background:'#e9f1ff', color:'#2e6bff' }}>Pill badge</span>
          <span className="otr-chip on">Chip</span>
          <span className="otr-chip">Chip</span>
          <div className="act blue" style={{ width:150 }}>Pill button</div>
          <div style={{ width:120, height:46, borderRadius:16, background:'#fff', border:'1px solid var(--wf-line)',
            display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, color:'var(--wf-faint)', boxShadow:'0 1px 2px rgba(16,24,40,.04)' }}>card · 16px</div>
        </div>
      </Group>
    </Panel>
  );
}

// ── 3 · status badge ────────────────────────────────────────────────────────
function BadgeBoard(){
  const Cell = ({ children, cap }) => (
    <div style={{ display:'flex', flexDirection:'column', gap:6, alignItems:'flex-start' }}>
      {children}
      <span style={{ fontSize:10.5, color:'var(--wf-faint)', fontWeight:600 }}>{cap}</span>
    </div>
  );
  return (
    <Panel>
      <Eyebrow>Component</Eyebrow>
      <H2>Status badge</H2>
      <Lead>One component, every status. Always light/tinted — no solid fills. <span style={{ color:'var(--wf-faint)' }}>Semantics &amp; the collapse rules live on the Status-handling page.</span></Lead>
      <Group title="Lifecycle states" first>
        <div style={{ display:'flex', flexWrap:'wrap', gap:'16px 18px' }}>
          <Cell cap="red tint"><StatusBadge status="incomplete" /></Cell>
          <Cell cap="blue tint"><StatusBadge status="active" /></Cell>
          <Cell cap="green tint"><StatusBadge status="resolved" /></Cell>
          <Cell cap="green · confetti card"><StatusBadge status="dismissed" /></Cell>
          <Cell cap="gray tint"><StatusBadge status="cancelled" /></Cell>
        </div>
      </Group>
      <Group title="Matching stage · pre-active">
        <div style={{ display:'flex', flexWrap:'wrap', gap:'16px 18px' }}>
          <Cell cap="loading shimmer"><StatusBadge status="analyzing" /></Cell>
          <Cell cap="gradient + check lockup"><StatusBadge status="smartmatchd" /></Cell>
        </div>
      </Group>
      <Group title="Modifiers">
        <div style={{ display:'flex', flexWrap:'wrap', gap:'16px 18px', alignItems:'flex-end' }}>
          <Cell cap="unread red dot"><StatusBadge status="active" unread /></Cell>
          <Cell cap="size sm"><StatusBadge status="active" size="sm" /></Cell>
          <Cell cap="noIcon (dense rows)"><StatusBadge status="active" size="sm" noIcon /></Cell>
          <Cell cap="trailing note"><StatusBadge status="incomplete" note="9 days" /></Cell>
        </div>
      </Group>
    </Panel>
  );
}

// ── 4 · buttons ─────────────────────────────────────────────────────────────
function ButtonBoard(){
  return (
    <Panel>
      <Eyebrow>Component</Eyebrow>
      <H2>Buttons · the one-blue rule</H2>
      <Lead>Color stays on the badge and the toast — never the button. Every card's primary action is one blue; review-style actions use a ghost. Money/gradient fills are legacy.</Lead>
      <Group title="In use" first>
        <div style={{ display:'flex', flexDirection:'column', gap:10, maxWidth:340 }}>
          <div className="act blue full" style={{ height:44 }}><FI name="bill-dollar-2" size={15} color="#fff" />Make a payment</div>
          <div className="act blue full" style={{ height:44 }}>Complete booking</div>
          <div className="act ghost full" style={{ height:44 }}><FI name="star-1" size={15} color="var(--wf-ink)" />Review your attorney</div>
        </div>
      </Group>
      <Group title="Legacy · retired fills">
        <div style={{ display:'flex', gap:10, flexWrap:'wrap', opacity:.42 }}>
          <div className="act money" style={{ width:150, textDecoration:'line-through' }}>Make a payment</div>
          <div className="act grad" style={{ width:150, textDecoration:'line-through' }}>Review quote</div>
          <div className="act primary" style={{ width:150, textDecoration:'line-through' }}>Complete booking</div>
        </div>
        <div style={{ fontSize:11.5, color:'var(--wf-faint)', marginTop:10, lineHeight:1.45, maxWidth:420 }}>
          Four button colors used to compete with the badge. Sentiment moved to the badge/toast, so the action color is now constant.
        </div>
      </Group>
    </Panel>
  );
}

// ── 5 · action toast ────────────────────────────────────────────────────────
function ToastBoard(){
  const al = { tone:'error', faIcon:'fa-circle-exclamation', text:'Payment overdue', value:'$109', cta:'Make a payment' };
  const Part = ({ k, v }) => (
    <div style={{ display:'flex', gap:10, fontSize:12, padding:'7px 0', borderBottom:'1px solid var(--wf-line2)' }}>
      <span style={{ width:104, flex:'none', fontWeight:700, color:'var(--wf-strong)' }}>{k}</span>
      <span style={{ color:'var(--wf-muted)' }}>{v}</span>
    </div>
  );
  return (
    <Panel>
      <Eyebrow>Component</Eyebrow>
      <H2>Action toast</H2>
      <Lead>The grouped alert + its resolving button share one tinted block, so the alert literally owns its CTA. Tone is a fixed design-system meaning. <span style={{ color:'var(--wf-faint)' }}>All six tones are catalogued on the Status-handling page.</span></Lead>
      <div style={{ display:'grid', gridTemplateColumns:'300px 1fr', gap:26, marginTop:20, alignItems:'start' }}>
        <GroupedAlert al={al} />
        <div>
          <div style={{ fontSize:11, fontWeight:800, letterSpacing:.6, textTransform:'uppercase', color:'var(--otr-blue)', marginBottom:6 }}>Anatomy</div>
          <Part k="Tone" v="error · warning · info · success · match · inactive" />
          <Part k="Icon" v="Font Awesome solid, tone-colored" />
          <Part k="Text" v="One line — what's happening" />
          <Part k="Value" v="Optional money/amount, right-aligned" />
          <Part k="Button" v="The action that resolves it (ghost, tone border)" />
        </div>
      </div>
    </Panel>
  );
}

// ── 6 · attorney lockup ─────────────────────────────────────────────────────
function AttorneyBoard(){
  return (
    <Panel>
      <Eyebrow>Component</Eyebrow>
      <H2>Attorney lockup</H2>
      <Lead>A heavily-rounded square photo (real people, like one of us), a gradient check, and a rating chip. Blurred before the match is accepted, revealed after.</Lead>
      <div style={{ display:'flex', gap:40, marginTop:24, alignItems:'flex-start', flexWrap:'wrap' }}>
        <div style={{ textAlign:'center' }}>
          <AttLockup size={120} reveal={false} />
          <div style={{ fontSize:11, color:'var(--wf-faint)', fontWeight:600, marginTop:14 }}>Blurred · pre-accept</div>
        </div>
        <div style={{ textAlign:'center' }}>
          <AttLockup size={120} reveal={true} />
          <div style={{ fontSize:11, color:'var(--wf-faint)', fontWeight:600, marginTop:14 }}>Revealed · accepted</div>
        </div>
      </div>
      <Group title="Attorney row · in-card">
        <div style={{ display:'flex', flexDirection:'column', gap:14, maxWidth:360 }}>
          <AttorneyRow c={CASES.unread} />
          <AttorneyRow c={CASES.smart} quote />
        </div>
      </Group>
    </Panel>
  );
}

// ── 7 · ticket element ──────────────────────────────────────────────────────
function TicketBoard(){
  const baseFields = [['Citation','TR-4471188'],['Issued','Mar 14, 2026'],['Location','I-5 N · San Diego']];
  const oneViol = [{ v:'Speeding · VC 22349(a)', note:'21+ over' }];

  // color variants keyed to the issuing state's citation stock
  const states = [
    { variant:'cream', cap:'CALIFORNIA · DMV', fields:[['Citation','CA-22349A'],['County','San Diego']],
      viol:[{ v:'Speeding · VC 22349(a)', note:'66 / 55' }] },
    { variant:'blue', cap:'NEW YORK · DMV', fields:[['Citation','NY-1180D'],['County','Kings']],
      viol:[{ v:'Speeding · VTL 1180(d)', note:'72 / 55' }] },
    { variant:'green', cap:'FLORIDA · FLHSMV', fields:[['Citation','FL-316183'],['County','Miami-Dade']],
      viol:[{ v:'Unlawful speed · FS 316.183', note:'18 over' }] },
    { variant:'slate', cap:'ILLINOIS · SOS', fields:[['Citation','IL-11601'],['County','Cook']],
      viol:[{ v:'Speeding · 625 ILCS 5/11-601', note:'24 over' }] },
  ];

  // multiple infractions on one citation
  const multi = { variant:'cream', cap:'TEXAS · DPS',
    fields:[['Citation','TX-5450099'],['Issued','Feb 02, 2026'],['Location','US-290 · Travis Co.']],
    viol:[
      { v:'Speeding · TC 545.351', note:'82 / 65' },
      { v:'No insurance · TC 601.191', note:'financial responsibility' },
      { v:'Expired registration · TC 502.407', note:'4 months lapsed' },
    ] };

  // specialty notes — rubber-stamp flags
  const flagged = [
    { variant:'pink', cap:'CALIFORNIA · DMV', flags:['Juvenile','School zone'],
      fields:[['Citation','CA-22350J'],['Driver','Age 17']], viol:[{ v:'Speeding · VC 22350', note:'posted school zone' }] },
    { variant:'slate', cap:'TEXAS · DPS', flags:['CDL','Accident caused','Injury'],
      fields:[['Citation','TX-545401'],['Class','Commercial']], viol:[{ v:'Reckless driving · TC 545.401', note:'collision on file' }] },
  ];

  return (
    <Panel>
      <Eyebrow>Component</Eyebrow>
      <H2>The ticket element</H2>
      <Lead>The rough "ticket = bad" paper — perforated edges, monospace, sepia ink — set against the clean "solution = good" UI. Issuing-state paper stock, multi-count citations, and specialty stamps.</Lead>

      <Group title="Base · cream, pink emphasis" first>
        <div style={{ display:'flex', gap:18, flexWrap:'wrap', alignItems:'flex-start' }}>
          <div style={{ width:188 }}><Ticket variant="cream" fields={baseFields} violations={oneViol} /></div>
          <div style={{ width:188 }}><Ticket variant="pink" fields={baseFields} violations={oneViol} /></div>
        </div>
      </Group>

      <Group title="Color variants · keyed to issuing state">
        <div style={{ display:'flex', gap:16, flexWrap:'wrap', alignItems:'flex-start' }}>
          {states.map((s) => (
            <div key={s.cap} style={{ width:126 }}>
              <Ticket variant={s.variant} cap={s.cap} fields={s.fields} violations={s.viol} />
            </div>
          ))}
        </div>
      </Group>

      <Group title="Multiple infractions · one citation, numbered counts">
        <div style={{ display:'flex', gap:20, alignItems:'flex-start', flexWrap:'wrap' }}>
          <div style={{ width:212 }}><Ticket variant={multi.variant} cap={multi.cap} fields={multi.fields} violations={multi.viol} /></div>
          <p style={{ margin:'4px 0 0', fontSize:12, color:'var(--wf-muted)', lineHeight:1.5, maxWidth:240 }}>
            A count badge in the caption and numbered violation rows keep several charges legible without breaking the rough paper rhythm.
          </p>
        </div>
      </Group>

      <Group title="Specialty notes · rubber-stamp flags">
        <div style={{ display:'flex', gap:18, flexWrap:'wrap', alignItems:'flex-start' }}>
          {flagged.map((f) => (
            <div key={f.cap} style={{ width:200 }}>
              <Ticket variant={f.variant} cap={f.cap} fields={f.fields} violations={f.viol} flags={f.flags} />
            </div>
          ))}
        </div>
        <div style={{ fontSize:11.5, color:'var(--wf-faint)', marginTop:12, lineHeight:1.45, maxWidth:440 }}>
          Stamps surface case-shaping facts the attorney must see up front — juvenile, CDL, accident-caused, injury, school zone, DUI.
        </div>
      </Group>
    </Panel>
  );
}

// ── 8 · card anatomy ────────────────────────────────────────────────────────
function CardBoard(){
  const Zone = ({ n, name, desc }) => (
    <div style={{ display:'flex', gap:10, padding:'9px 0', borderBottom:'1px solid var(--wf-line2)' }}>
      <span style={{ width:20, height:20, borderRadius:'50%', background:'var(--otr-blue)', color:'#fff', fontSize:11, fontWeight:800,
        display:'flex', alignItems:'center', justifyContent:'center', flex:'none' }}>{n}</span>
      <div><div style={{ fontSize:12, fontWeight:700, color:'var(--wf-ink)' }}>{name}</div>
        <div style={{ fontSize:11, color:'var(--wf-muted)', lineHeight:1.4 }}>{desc}</div></div>
    </div>
  );
  return (
    <Panel>
      <Eyebrow>Component</Eyebrow>
      <H2>Case card · anatomy</H2>
      <Lead>The consistent-CTA card that holds across the whole status spectrum.</Lead>
      <div style={{ marginTop:18 }}><CPCConsistent c={CASES.loe} /></div>
      <div style={{ marginTop:16 }}>
        <Zone n="1" name="Identity" desc="Date eyebrow + place headline + the lifecycle badge (top-right)." />
        <Zone n="2" name="Body" desc="State-specific record — attorney row, quote block, or a meta line." />
        <Zone n="3" name="Action" desc="One blue CTA, or a grouped action toast when something needs attention." />
      </div>
    </Panel>
  );
}

// ── 9 · motion atoms ────────────────────────────────────────────────────────
function MotionBoard(){
  return (
    <Panel>
      <Eyebrow>Component</Eyebrow>
      <H2>Motion atoms</H2>
      <Lead>Functional, never decorative — and all gated on reduced-motion.</Lead>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:20, marginTop:22 }}>
        <div>
          <div style={{ position:'relative', height:96, borderRadius:12, background:'var(--wf-bg)', border:'1px solid var(--wf-line)', overflow:'hidden' }}>
            <Confetti n={14} />
          </div>
          <div style={{ fontSize:11, fontWeight:700, color:'var(--wf-strong)', marginTop:8 }}>Confetti · the win</div>
        </div>
        <div>
          <div style={{ height:96, borderRadius:12, background:'var(--wf-bg)', border:'1px solid var(--wf-line)', padding:14,
            display:'flex', flexDirection:'column', gap:9, justifyContent:'center' }}>
            <div className="sk" style={{ width:'70%', height:11 }} />
            <div className="sk" style={{ width:'46%', height:9 }} />
            <div className="sk" style={{ width:'58%', height:9 }} />
          </div>
          <div style={{ fontSize:11, fontWeight:700, color:'var(--wf-strong)', marginTop:8 }}>Skeleton · matching</div>
        </div>
        <div>
          <div style={{ height:96, borderRadius:12, background:'var(--wf-bg)', border:'1px solid var(--wf-line)',
            display:'flex', alignItems:'center', justifyContent:'center' }}>
            <StatusBadge status="analyzing" />
          </div>
          <div style={{ fontSize:11, fontWeight:700, color:'var(--wf-strong)', marginTop:8 }}>Shimmer · agent running</div>
        </div>
      </div>
    </Panel>
  );
}

// ════════════════════════════════════════════════════════════════════════
function AtomicSystem(){
  return (
    <>
    <DCSection id="atoms-foundations" title="Atomic system · foundations"
      subtitle="The raw tokens these Cases screens are built from — a wireframe-neutral palette plus the five badge tones, the type roles, and the pill-forward geometry.">
      <DCArtboard id="at-color" label="Color tokens" width={620} height={744} style={{ background:'#fff' }}><ColorBoard /></DCArtboard>
      <DCArtboard id="at-text" label="Text & shape" width={620} height={654} style={{ background:'#fff' }}><TextBoard /></DCArtboard>
    </DCSection>
    <DCSection id="atoms-components" title="Atomic system · components"
      subtitle="The reusable building blocks, in isolation. Status semantics (which badge, which tone, when) live on the Status-handling page; here it's purely the parts.">
      <DCArtboard id="at-badge" label="Status badge" width={620} height={578} style={{ background:'#fff' }}><BadgeBoard /></DCArtboard>
      <DCArtboard id="at-buttons" label="Buttons · the one-blue rule" width={620} height={536} style={{ background:'#fff' }}><ButtonBoard /></DCArtboard>
      <DCArtboard id="at-toast" label="Action toast" width={620} height={526} style={{ background:'#fff' }}><ToastBoard /></DCArtboard>
      <DCArtboard id="at-attorney" label="Attorney lockup" width={620} height={524} style={{ background:'#fff' }}><AttorneyBoard /></DCArtboard>
      <DCArtboard id="at-ticket" label="The ticket element" width={620} height={1432} style={{ background:'#fff' }}><TicketBoard /></DCArtboard>
      <DCArtboard id="at-card" label="Case card · anatomy" width={440} height={640} style={{ background:'#fff' }}><CardBoard /></DCArtboard>
      <DCArtboard id="at-motion" label="Motion atoms" width={620} height={300} style={{ background:'#fff' }}><MotionBoard /></DCArtboard>
    </DCSection>
    </>
  );
}
window.Atoms = AtomicSystem;
})();
