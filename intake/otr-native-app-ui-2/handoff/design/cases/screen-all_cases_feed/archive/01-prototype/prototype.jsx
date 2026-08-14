// prototype.jsx — PROTOTYPE page (stub) · a future home for the interactive
// end-to-end Cases flow, stitched from the components documented on the other pages.
/* __IIFE__ */ ;(function(){
const { DCSection, DCArtboard } = window;
const { FeatureIcon: FI } = window.OffTheRecordDesignSystem_6eff96;

function Stub(){
  const steps = [
    ['magnifying-glass','Find','Enter the citation — photo, upload, or type it in'],
    ['countdown-timer','Quote','Instant SmartMatch price from a local attorney'],
    ['file-edit','Book','Review the match, sign the engagement, pay'],
    ['folder-open','Track','Watch the case through to dismissed'],
  ];
  return (
    <div className="otr" style={{ height:'100%', background:'#fff', display:'flex', flexDirection:'column',
      alignItems:'center', justifyContent:'center', textAlign:'center', padding:'0 64px' }}>
      <div style={{ width:72, height:72, borderRadius:20, background:'#eef2fc', display:'flex',
        alignItems:'center', justifyContent:'center', marginBottom:22 }}>
        <FI name="bolt" size={32} color="var(--otr-blue)" />
      </div>
      <div style={{ fontSize:11, fontWeight:800, letterSpacing:1, textTransform:'uppercase', color:'var(--wf-faint)' }}>Prototype · coming soon</div>
      <h2 style={{ margin:'8px 0 0', fontSize:28, fontWeight:800, letterSpacing:-.6, color:'var(--wf-ink)' }}>The end-to-end Cases flow</h2>
      <p style={{ margin:'10px 0 0', fontSize:14, color:'var(--wf-muted)', maxWidth:520, lineHeight:1.55 }} className="balance">
        One clickable walkthrough that strings the screens together — built from the atoms and the status system on the other pages, not redrawn.</p>
      <div style={{ display:'flex', gap:14, marginTop:30, flexWrap:'wrap', justifyContent:'center' }}>
        {steps.map(([ic,t,d],i) => (
          <div key={t} style={{ width:158, padding:'16px 14px', borderRadius:16, border:'1px solid var(--wf-line)',
            background:'var(--wf-bg)', textAlign:'left' }}>
            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
              <span style={{ width:26, height:26, borderRadius:'50%', background:'var(--otr-blue)', color:'#fff', fontSize:12,
                fontWeight:800, display:'flex', alignItems:'center', justifyContent:'center', flex:'none' }}>{i+1}</span>
              <FI name={ic} size={16} color="var(--wf-strong)" />
            </div>
            <div style={{ fontSize:14, fontWeight:800, marginTop:11, color:'var(--wf-ink)' }}>{t}</div>
            <div style={{ fontSize:11.5, color:'var(--wf-muted)', marginTop:2, lineHeight:1.4 }}>{d}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
function Prototype(){
  return (
    <DCSection id="prototype" title="Prototype"
      subtitle="A future home for the interactive end-to-end Cases flow — find → quote → book → track — stitched from the components on the other pages.">
      <DCArtboard id="proto-stub" label="Planned flow" width={920} height={560} style={{ background:'#fff' }}><Stub /></DCArtboard>
    </DCSection>
  );
}
window.Prototype = Prototype;
})();
