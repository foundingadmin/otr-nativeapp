// case-record.jsx — tab content for the Ticket / Case split.
// Ticket is the static record: it comes from the citation, a permanent
// external document, so it is read only and framed as fixed. Case is the
// dynamic record, split into Overview, Documents and Payments. Payments
// separates line items (what you are billed) from transactions (how you paid),
// per the CEO's receipt model.
/* __IIFE__ */ ;(function(){
const { Fact, DocList, Ticket } = window;
const { FeatureIcon: FI } = window.OffTheRecordDesignSystem_6eff96;

const VIOLATIONS = [
  { v: 'Speeding', note: 'VC 22349(a) · 78 mph in a posted 65' },
  { v: 'Unsafe lane change', note: 'VC 21658(a)' },
];

const DOCS = [
  { n: 'Citation #C-77421', t: 'On file', d: 'Feb 04, 2026', ic: 'file-document-info-quick-reference' },
  { n: 'Letter of engagement', t: 'Signed', d: 'Feb 06, 2026', ic: 'file-check' },
  { n: 'Counter offer terms', t: 'Accepted', d: 'Feb 19, 2026', ic: 'file-report' },
  { n: 'Notice of appearance', t: 'Filed', d: 'Mar 02, 2026', ic: 'file-check' },
  { n: 'Receipt #8841', t: 'Paid', d: 'Mar 06, 2026', ic: 'bill-dollar-2' },
];

const LINE_ITEMS = [
  ['Legal fee', 250, 'Park & Vance'],
  ['CDL surcharge', 50, 'Commercial licence'],
  ['Service fee', 29, 'Off the Record'],
];

const TXNS = [
  { d: 'Feb 06, 2026', a: 110, m: 'Visa ···· 4242', s: 'Paid' },
  { d: 'Mar 06, 2026', a: 110, m: 'Visa ···· 4242', s: 'Paid' },
  { d: 'Mar 27, 2026', a: 109, m: 'Visa ···· 4242', s: 'Scheduled', up: true },
];

const ACTIVITY = [
  { t: 'Notice of appearance filed', b: 'Helen Vance · Park & Vance', d: 'Mar 02', ic: 'file-check' },
  { t: 'Court date updated', b: 'Moved to Apr 18, 2026', d: 'Feb 27', ic: 'countdown-timer' },
  { t: 'Counter offer accepted', b: 'Legal fee changed to $250', d: 'Feb 19', ic: 'bill-dollar-2' },
];

if (typeof document !== 'undefined' && !document.getElementById('fcd-record')) {
  const s = document.createElement('style');
  s.id = 'fcd-record';
  s.textContent = `
  /* fixed-record framing on the Ticket tab */
  .tfixed{ display:flex; align-items:flex-start; gap:10px; margin:14px 14px 0; padding:11px 12px; border-radius:13px;
    background:#f4f5f8; border:1px solid var(--wf-line); }
  .tfixed .tf-t{ font-size:12.5px; font-weight:800; color:var(--wf-strong); }
  .tfixed .tf-s{ font-size:11.5px; color:var(--wf-muted); margin-top:2px; line-height:1.4; text-wrap:pretty; }
  .tart{ margin:14px 14px 0; }
  .tart-row{ display:flex; gap:8px; margin-top:9px; }
  .addphoto{ display:flex; align-items:center; gap:11px; margin:14px 14px 0; padding:12px; border-radius:14px;
    border:1.5px dashed #cfd6e6; background:#fbfcff; }
  .addphoto .ap-ic{ width:38px; height:38px; border-radius:11px; flex:none; display:flex; align-items:center;
    justify-content:center; background:#eaf1ff; }
  .addphoto .ap-t{ font-size:12.5px; font-weight:800; color:var(--wf-ink); }
  .addphoto .ap-s{ font-size:11.5px; color:var(--wf-muted); margin-top:2px; line-height:1.35; }
  .addphoto .ap-cta{ flex:none; height:32px; padding:0 13px; border-radius:999px; background:var(--otr-blue); color:#fff;
    font-size:12.5px; font-weight:800; display:inline-flex; align-items:center; }
  .tdl{ display:flex; align-items:center; justify-content:center; gap:8px; margin:14px 14px 0; height:44px;
    border-radius:999px; border:1px solid var(--wf-line); background:#fff; font-size:13px; font-weight:800;
    color:var(--wf-strong); }

  /* participants row inside the Case overview */
  .parts{ display:flex; flex-direction:column; gap:9px; margin-top:3px; }
  .part{ display:flex; align-items:center; gap:9px; }
  .part .p-n{ flex:1; min-width:0; font-size:13px; font-weight:700; color:var(--wf-ink); }
  .part .p-r{ flex:none; font-size:11px; font-weight:800; color:var(--wf-muted); background:var(--wf-fill);
    border-radius:999px; padding:3px 8px; }
  .part-add{ display:inline-flex; align-items:center; gap:6px; margin-top:4px; font-size:12.5px; font-weight:800;
    color:var(--otr-blue); }

  /* latest activity, the surface that opens case chat */
  .act-card{ margin:14px 14px 0; background:#fff; border:1px solid var(--wf-line); border-radius:16px; overflow:hidden; }
  .act-card .ac-h{ display:flex; align-items:center; gap:9px; padding:11px 14px; background:#fbfbfc;
    border-bottom:1px solid var(--wf-line2); font-size:13px; font-weight:800; color:var(--wf-ink); }
  .ac-row{ display:flex; align-items:flex-start; gap:11px; padding:11px 14px; border-top:1px solid var(--wf-line2); }
  .ac-row:first-of-type{ border-top:none; }
  .ac-ic{ width:30px; height:30px; border-radius:9px; flex:none; display:flex; align-items:center;
    justify-content:center; background:var(--wf-fill); }
  .ac-main{ flex:1; min-width:0; }
  .ac-t{ font-size:13px; font-weight:700; color:var(--wf-ink); }
  .ac-s{ font-size:11.5px; color:var(--wf-muted); margin-top:2px; }
  .ac-d{ flex:none; font-size:11px; font-weight:700; color:var(--wf-faint); padding-top:2px; }
  .ac-foot{ display:flex; align-items:center; gap:8px; padding:12px 14px; border-top:1px solid var(--wf-line2);
    background:#fbfcff; font-size:12.5px; font-weight:800; color:var(--otr-blue); }
  .ac-foot .af-n{ margin-left:auto; min-width:19px; height:19px; padding:0 6px; border-radius:999px;
    background:var(--otr-blue); color:#fff; font-size:11px; display:inline-flex; align-items:center; justify-content:center; }

  /* money: line items, plan, transactions */
  .mcard{ margin:14px 14px 0; background:#fff; border:1px solid var(--wf-line); border-radius:16px; overflow:hidden; }
  .mcard .m-h{ display:flex; align-items:center; gap:9px; padding:11px 14px; background:#fbfbfc;
    border-bottom:1px solid var(--wf-line2); }
  .mcard .m-h .mh-t{ font-size:13px; font-weight:800; color:var(--wf-ink); flex:1; }
  .mcard .m-h .mh-s{ font-size:11px; font-weight:700; color:var(--wf-faint); }
  .mcard .m-b{ padding:4px 14px 12px; }
  .li{ display:flex; align-items:baseline; gap:11px; padding:10px 0; border-top:1px solid var(--wf-line2); }
  .li:first-child{ border-top:none; }
  .li .li-m{ flex:1; min-width:0; }
  .li .li-t{ font-size:13px; font-weight:700; color:var(--wf-ink); }
  .li .li-s{ font-size:11.5px; color:var(--wf-muted); margin-top:2px; }
  .li .li-a{ flex:none; font-size:13.5px; font-weight:800; color:var(--wf-ink); }
  .li.total{ border-top:1px solid var(--wf-line); margin-top:2px; padding-top:12px; }
  .li.total .li-t{ font-size:13.5px; font-weight:800; }
  .li.total .li-a{ font-size:17px; letter-spacing:-.4px; }
  .li.up .li-t, .li.up .li-a{ color:var(--wf-faint); }
  .plan-bar{ height:8px; border-radius:999px; background:var(--wf-fill); overflow:hidden; margin:4px 0 10px; }
  .plan-bar i{ display:block; height:100%; border-radius:999px; background:var(--otr-blue); }
  .plan-next{ display:flex; align-items:center; gap:10px; padding:11px; border-radius:12px; background:#f6f8fd;
    border:1px solid #e6ecf9; }
  .plan-next .pn-m{ flex:1; min-width:0; }
  .plan-next .pn-t{ font-size:12.5px; font-weight:800; color:var(--wf-ink); }
  .plan-next .pn-s{ font-size:11.5px; color:var(--wf-muted); margin-top:2px; }
  .plan-next .pn-cta{ flex:none; height:32px; padding:0 13px; border-radius:999px; border:1px solid #cfe0ff;
    background:#fff; color:var(--otr-blue); font-size:12.5px; font-weight:800; display:inline-flex; align-items:center;
    white-space:nowrap; }
  .txn{ display:flex; align-items:center; gap:11px; padding:11px 0; border-top:1px solid var(--wf-line2); }
  .txn:first-child{ border-top:none; }
  .txn .tx-ic{ width:32px; height:32px; border-radius:9px; flex:none; display:flex; align-items:center;
    justify-content:center; background:var(--wf-fill); }
  .txn .tx-m{ flex:1; min-width:0; }
  .txn .tx-t{ font-size:13px; font-weight:700; color:var(--wf-ink); }
  .txn .tx-s{ font-size:11.5px; color:var(--wf-muted); margin-top:2px; }
  .txn .tx-r{ flex:none; text-align:right; }
  .txn .tx-a{ font-size:13.5px; font-weight:800; color:var(--wf-ink); }
  .txn .tx-st{ font-size:11px; font-weight:700; color:#19a558; margin-top:1px; }
  .txn.up .tx-a{ color:var(--wf-faint); }
  .txn.up .tx-st{ color:var(--wf-faint); }
  .fnote{ display:flex; gap:7px; align-items:flex-start; margin:12px 16px 0; font-size:11.5px; color:var(--wf-muted);
    line-height:1.45; text-wrap:pretty; }
  .sortbtn{ margin-left:auto; flex:none; display:inline-flex; align-items:center; gap:6px; height:28px; padding:0 10px;
    border-radius:999px; border:1px solid var(--wf-line); background:#fff; font-family:inherit; font-size:11.5px;
    font-weight:800; color:var(--wf-strong); cursor:pointer; white-space:nowrap; }
  .sortbtn:hover{ background:var(--wf-fill); }
  .sortbtn i{ font-size:11px; color:var(--wf-muted); }
  /* two-line rows built from spans need explicit blocks */
  .ap-t, .ap-s, .li-t, .li-s, .ac-t, .ac-s, .tx-t, .tx-s, .pn-t, .pn-s{ display:block; }
  .tx-a, .tx-st{ display:block; }
  `;
  document.head.appendChild(s);
}

// ── Ticket · the static record ────────────────────────────────────────────
function TicketTab({ photo = true }) {
  return (
    <>
      {photo ?
        <div className="tart" style={{ marginTop: 16 }}>
          <div className="wf-photo" style={{ width: '100%', height: 194, borderRadius: 14 }}><span>Ticket photo</span></div>
          <div className="tart-row">
            <div className="xr-act">Open full size</div>
            <div className="xr-act">Replace photo</div>
          </div>
        </div> :
        <>
          <div className="tart">
            <Ticket variant="cream" cap="TRAFFIC CITATION · RIVERSIDE PD"
              fields={[['Citation', 'C-77421'], ['Issued', 'Feb 04, 2026 · 4:12 PM'], ['Location', 'Hwy 91 at Adams St']]}
              violations={VIOLATIONS}
              flags={['2 counts', '$490 fine', '1 point', 'No accident']} />
          </div>
          <div className="addphoto">
            <span className="ap-ic"><FI name="image-photo-add" size={18} color="var(--otr-blue)" /></span>
            <span style={{ flex: 1, minWidth: 0, display: 'block' }}>
              <span className="ap-t" style={{ display: 'block' }}>Add a photo of your ticket</span>
              <span className="ap-s">Helen can work from the details you typed, a photo helps her confirm them.</span>
            </span>
            <span className="ap-cta">Add</span>
          </div>
        </>}

      <div className="facts">
        <div className="facts-h"><FI name="file-document-info-quick-reference" size={15} color="var(--wf-muted)" />On the citation</div>
        <Fact ic="file-document-info-quick-reference" k="Citation number"><div className="f-v">C-77421</div></Fact>
        <Fact ic="countdown-timer" k="Issued">
          <div className="f-v">Feb 04, 2026 · 4:12 PM<div className="f-sub">Riverside Police Department · Officer badge 2214</div></div>
        </Fact>
        <Fact ic="location-pin" k="Cited location">
          <div className="f-v">Hwy 91 at Adams St<div className="f-sub">Riverside, CA</div></div>
        </Fact>
        <Fact ic="warning-triangle" k="Violations">
          {VIOLATIONS.map((v, i) =>
            <div key={i} className="f-v" style={{ marginTop: i ? 7 : 0 }}>{v.v}<div className="f-sub">{v.note}</div></div>
          )}
        </Fact>
        <Fact ic="bill-dollar-2" k="Fine printed on the ticket"><div className="f-v">$490</div></Fact>
        <Fact ic="warning-triangle" k="Points"><div className="f-v">1 point<div className="f-sub">Assigned by the DMV if convicted</div></div></Fact>
        <Fact ic="information-circle" k="Accident"><div className="f-v">None reported</div></Fact>
        <Fact ic="building-1" k="Court named on the ticket">
          <div className="f-v">Riverside Superior Court<div className="f-sub">Appear by Mar 06, 2026 as printed</div></div>
        </Fact>
      </div>

      <div className="tdl"><FI name="download-tray" size={15} color="var(--wf-strong)" />Download the citation, PDF</div>
      <div className="fnote">
        <FI name="information-circle" size={13} color="var(--wf-faint)" />
        Something wrong here? Send Helen a message and she will correct the record with the court.
      </div>
    </>
  );
}

// ── Case · Overview (the dynamic record) ──────────────────────────────────
function OverviewTab() {
  return (
    <>
      <div className="facts" style={{ marginTop: 16 }}>
        <div className="facts-h"><FI name="open-folder" size={15} color="var(--wf-muted)" />Case</div>
        <Fact ic="calendar-check" k="Case opened"><div className="f-v">Feb 06, 2026<div className="f-sub">Two days after the ticket was issued</div></div></Fact>
        <Fact ic="building-1" k="Law firm">
          <div className="f-v">Park &amp; Vance<div className="f-sub">Helen Vance, attorney of record</div></div>
        </Fact>
        <Fact ic="building-1" k="Court of record">
          <div className="f-v">Riverside Superior Court
            <div className="f-sub">4100 Main St, Riverside, CA 92501</div>
            <div className="xr-map"><div className="xr-map-pin"><FI name="location-pin" size={18} color="var(--otr-blue)" /></div><div className="xr-map-grid" /></div>
            <div className="xr-act xr-act-inline"><FI name="location-compass-1" size={14} color="var(--wf-strong)" />Directions</div>
          </div>
        </Fact>
        <Fact ic="countdown-timer" k="Court date">
          <div className="f-v">
            <div className="f-court-row"><span>Apr 18, 2026</span><span className="f-rel">in 63 days</span></div>
            <div className="f-sub">Updated Feb 27, 2026. Helen appears for you, you do not attend.</div>
            <div className="cd-cal"><FI name="add-circle" size={13} color="var(--otr-blue)" />Add to calendar</div>
          </div>
        </Fact>
        <Fact ic="bill-dollar-2" k="Payment plan">
          <div className="f-v">$220 paid of $329<div className="f-sub">Next installment $109 on Mar 27, 2026</div></div>
        </Fact>
        <Fact ic="user-friendship-group" k="Participants">
          <div className="parts">
            <div className="part"><span className="wf-portrait" style={{ width: 26, height: 26, borderRadius: 8 }} /><span className="p-n">You, Dana Ellis</span><span className="p-r">Booked it</span></div>
            <div className="part"><span className="wf-portrait" style={{ width: 26, height: 26, borderRadius: 8 }} /><span className="p-n">Marcus Ellis</span><span className="p-r">Defendant</span></div>
          </div>
          <div className="part-add"><FI name="user-friendship-group" size={14} color="var(--otr-blue)" />Manage participants</div>
        </Fact>
      </div>

      <div className="act-card">
        <div className="ac-h"><FI name="chat-bubble-oval-smiley-1" size={15} color="var(--wf-muted)" />Latest updates</div>
        {ACTIVITY.map((a, i) =>
          <div key={i} className="ac-row">
            <span className="ac-ic"><FI name={a.ic} size={15} color="var(--wf-muted)" /></span>
            <span className="ac-main"><span className="ac-t">{a.t}</span><span className="ac-s">{a.b}</span></span>
            <span className="ac-d">{a.d}</span>
          </div>
        )}
        <div className="ac-foot">Open case chat<span className="af-n">2</span></div>
      </div>
    </>
  );
}

// upload affordance at the foot of Documents (local copy, the canonical kit
// keeps its own version unexported)
function UploadBlock() {
  return (
    <div className="docup">
      <div className="docup-drop">
        <div className="docup-ic"><FI name="cloud-upload" size={19} color="var(--otr-blue)" /></div>
        <div className="docup-main">
          <div className="docup-t">Upload a document</div>
          <div className="docup-s">Court notice, licence, or correspondence. PDF, JPG or PNG.</div>
        </div>
      </div>
      <div className="docup-row">
        <button className="docup-btn"><FI name="files-and-folders" size={14} color="var(--wf-strong)" />Choose file</button>
        <button className="docup-btn"><FI name="camera-1" size={14} color="var(--wf-strong)" />Take photo</button>
      </div>
    </div>);
}

// ── Case · Documents ──────────────────────────────────────────────────────
function DocsTab() {
  const [newest, setNewest] = React.useState(true);
  const docs = DOCS.slice().sort((a, b) => {
    const d = Date.parse(a.d) - Date.parse(b.d);
    return newest ? -d : d;
  });
  return (
    <>
      <div className="tcard">
        <div className="tcard-h">
          <FI name="files-and-folders" size={15} color="var(--wf-muted)" />Case documents
          <button className="sortbtn" onClick={() => setNewest((v) => !v)}>
            <i className={`fa-solid ${newest ? 'fa-arrow-down-short-wide' : 'fa-arrow-up-short-wide'}`} />
            {newest ? 'Newest first' : 'Oldest first'}
          </button>
        </div>
        <div className="tcard-b">
          <DocList rec={{ documents: docs }} />
          <UploadBlock />
        </div>
      </div>
      <div className="fnote">
        <FI name="padlock-circle-2" size={13} color="var(--wf-faint)" />
        Files you share inside case chat stay in the chat. Copy one to your case file and it shows up here.
      </div>
    </>
  );
}

// ── Case · Payments (line items vs transactions) ──────────────────────────
function PayTab({ variant = 'a' }) {
  const { PayVariantB, PayVariantC, PayVariantD, TxnRows } = window;
  if (variant === 'b') return <PayVariantB />;
  if (variant === 'c') return <PayVariantC />;
  if (variant === 'd') return <PayVariantD />;
  const total = LINE_ITEMS.reduce((n, [, a]) => n + a, 0);
  return (
    <>
      <div className="mcard">
        <div className="m-h"><FI name="bill-dollar-2" size={15} color="var(--wf-muted)" /><span className="mh-t">Statement of charges</span></div>
        <div className="m-b">
          {LINE_ITEMS.map(([l, a, s]) =>
            <div key={l} className="li">
              <span className="li-m"><span className="li-t">{l}</span><span className="li-s">{s}</span></span>
              <span className="li-a">${a}</span>
            </div>
          )}
          <div className="li total"><span className="li-m"><span className="li-t">Total</span></span><span className="li-a">${total}</span></div>
        </div>
      </div>

      <div className="mcard">
        <div className="m-h"><FI name="calendar-check" size={15} color="var(--wf-muted)" /><span className="mh-t">Payment plan</span><span className="mh-s">3 installments</span></div>
        <div className="m-b">
          <div className="li" style={{ paddingBottom: 4 }}>
            <span className="li-m"><span className="li-t">$220 paid</span><span className="li-s">$109 remaining</span></span>
            <span className="li-a" style={{ fontSize: 12, color: 'var(--wf-muted)' }}>2/3</span>
          </div>
          <div className="plan-bar"><i style={{ width: '67%' }} /></div>
          <div className="plan-next">
            <span className="pn-m"><span className="pn-t">$109 due Mar 27, 2026</span><span className="pn-s">Charged to Visa ···· 4242</span></span>
            <span className="pn-cta">Pay $109</span>
          </div>
        </div>
      </div>

      <div className="mcard">
        <div className="m-h"><FI name="download-tray" size={15} color="var(--wf-muted)" /><span className="mh-t">Payment history</span><span className="mh-s">3 transactions</span></div>
        <div className="m-b"><TxnRows rows={TXNS} /></div>
      </div>
      <div className="fnote">
        <FI name="information-circle" size={13} color="var(--wf-faint)" />
        Each paid transaction opens its own receipt.
      </div>
    </>
  );
}

Object.assign(window, { VIOLATIONS, DOCS, LINE_ITEMS, TXNS, ACTIVITY, UploadBlock, TicketTab, OverviewTab, DocsTab, PayTab });

})();
