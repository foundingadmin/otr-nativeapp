// record-content.jsx — BOARD for the record content exploration (punch-list
// item C). Applies the confirmed Case Details record model: the field set with
// a Show more disclosure, the net-new law-firm data block, the two money
// modules (Receipt vs Transactions), and the net-new Participants module.
// Closes with DR-CD-002. Reuses the copied detail kits for the phone shell
// (DScreen) and the .facts / .frow / .xcard record styling.
/* __IIFE__ */;(function () {
  const { DCSection, DCArtboard, DScreen, Fact, Attorney, Stars } = window;
  const { FeatureIcon: FI } = window.OffTheRecordDesignSystem_6eff96;

  const FIRM = 'Park & Vance';
  const ID = 'OTR-48144';

  // ── the confirmed overview field set + Show more disclosure ────────────────
  // Always on: Case ID, Law firm, Issued on, Court of record, Court date (when
  // available), Violation(s). Issue date is the primary date; booked date is
  // de-prioritized down with the receipt, not here.
  function RecordFields({ expanded = false }) {
    return (
      <div className="facts">
      <div className="facts-h"><FI name="open-folder" size={15} color="var(--wf-muted)" />Case record</div>

      <Fact ic="hashtag" k="Case ID">
        <div className="f-v rc-copy">{ID}<FI name="copy-paste" size={13} color="var(--wf-faint)" /></div>
      </Fact>

      <div className="frow rc-tap">
        <div className="f-ic"><FI name="building-1" size={15} color="var(--wf-faint)" /></div>
        <div className="f-main"><div className="f-k">Law firm</div>
          <div className="f-v"><span className="trunc">{FIRM}</span><div className="f-sub trunc">Helen Vance</div></div>
        </div>
        <div className="rc-chev"><FI name="chevron-right" size={14} color="var(--wf-faint)" /></div>
      </div>

      <Fact ic="location-pin" k="Issued on">
        <div className="f-v">Mar 11, 2026<div className="f-sub">Glendale, CA</div></div>
      </Fact>

      <Fact ic="building-1" k="Court of record">
        <div className="f-v"><span className="trunc">LA Superior, North</span><div className="f-sub trunc">600 E Broadway, Glendale</div></div>
      </Fact>

      <Fact ic="countdown-timer" k="Court date">
        <div className="f-v"><div className="f-court-row"><span>May 20, 2026</span><span className="f-rel">in 70 days</span></div></div>
      </Fact>

      <Fact ic="warning-triangle" k="Violations">
        <div className="f-v"><span className="trunc">Reckless driving · VC 23103</span>
          <div className="vmore">+1 more violation<FI name="chevron-right" size={9} color="var(--otr-blue)" /></div></div>
      </Fact>

      {expanded && <>
        <Fact ic="shield-check" k="Refund eligibility">
          <div className="f-v">Money-back guarantee<div className="f-sub">Full refund if not dismissed or reduced</div></div>
        </Fact>
        <Fact ic="hashtag" k="Reference number">
          <div className="f-v rc-copy">G-1183-4471<FI name="copy-paste" size={13} color="var(--wf-faint)" /></div>
        </Fact>
        <Fact ic="bill-dollar-2" k="Fine">
          <div className="f-v">$712 <span className="f-sub" style={{ display: 'inline' }}>if convicted</span></div>
        </Fact>
        <Fact ic="warning-triangle" k="Points">
          <div className="f-v">2 points on your record if convicted</div>
        </Fact>
        <Fact ic="car-1" k="Accidents">
          <div className="f-v"><span className="muted">None reported on this citation</span></div>
        </Fact>
      </>}

      <div className="rc-more">{expanded ?
          <span className="rc-more-b">Show less<FI name="chevron-up" size={12} color="var(--otr-blue)" /></span> :
          <span className="rc-more-b">Show more<FI name="chevron-down" size={12} color="var(--otr-blue)" /></span>}</div>
    </div>);

  }

  // ── net-new: the law-firm data block (behind the Law firm tap) ─────────────
  // Field source of truth is Alex's screenshot (blocked, F-2). Structure shown;
  // OTR's rules decide which stats surface and which sit behind a further tap.
  function FirmBlock() {
    return (
      <div className="rc-firm">
      <div className="rc-firm-head">
        <Attorney size={54} />
        <div className="rc-firm-id">
          <div className="rc-firm-name">{FIRM}</div>
          <div className="rc-firm-sub">Helen Vance · Glendale, CA</div>
          <div className="rc-firm-rate"><Stars rating={4.9} size={12} /><span className="rc-firm-reviews">128 reviews</span></div>
        </div>
      </div>
      <div className="rc-firm-stats">
        <div className="rc-stat"><div className="rc-stat-v">1,240</div><div className="rc-stat-k">Clients booked</div></div>
        <div className="rc-stat"><div className="rc-stat-v">94%</div><div className="rc-stat-k">Success rate</div></div>
        <div className="rc-stat"><div className="rc-stat-v">8 yrs</div><div className="rc-stat-k">With OTR</div></div>
      </div>
      <div className="rc-firm-row"><FI name="award-trophy-star-1" size={14} color="var(--wf-muted)" />Handles reckless-driving and speeding matters<FI name="chevron-right" size={13} color="var(--wf-faint)" style={{ marginLeft: 'auto' }} /></div>
      <div className="rc-firm-row"><FI name="messages-bubble-square-typing" size={14} color="var(--wf-muted)" />Read client reviews<FI name="chevron-right" size={13} color="var(--wf-faint)" style={{ marginLeft: 'auto' }} /></div>
    </div>);

  }

  // ── money module 1 · Receipt (the balance): what is owed and what for ──────
  function ReceiptPaid() {
    return (
      <div className="rc-mod">
      <div className="rc-mod-h"><FI name="receipt-1" size={15} color="var(--wf-muted)" />Receipt<span className="rc-mod-tag paid">Paid in full</span></div>
      <div className="rc-li"><span>Legal fee</span><span>$249</span></div>
      <div className="rc-li"><span>Service fee</span><span>$50</span></div>
      <div className="rc-li total"><span>Total</span><span>$299</span></div>
      <div className="rc-mod-foot"><FI name="calendar-check" size={12} color="var(--wf-faint)" />Booked Mar 14, 2026</div>
    </div>);

  }
  function ReceiptPlan() {
    return (
      <div className="rc-mod">
      <div className="rc-mod-h"><FI name="receipt-1" size={15} color="var(--wf-muted)" />Receipt<span className="rc-mod-tag">Payment plan · $299</span></div>
      <div className="rc-inst overdue">
        <div className="rc-inst-main"><div className="rc-inst-t">Installment 2 of 3</div><div className="rc-inst-s">Was due Apr 2</div></div>
        <div className="rc-inst-amt">$100<span className="rc-inst-flag">Overdue</span></div>
      </div>
      <div className="rc-inst done"><div className="rc-inst-main"><div className="rc-inst-t">Installment 1 of 3</div><div className="rc-inst-s">Paid Mar 14</div></div><div className="rc-inst-amt">$99</div></div>
      <div className="rc-inst upcoming"><div className="rc-inst-main"><div className="rc-inst-t">Installment 3 of 3</div><div className="rc-inst-s">Due May 2</div></div><div className="rc-inst-amt">$100</div></div>
      <div className="rc-payahead"><FI name="bolt" size={12} color="var(--otr-blue)" />Pay ahead to clear your balance</div>
    </div>);

  }

  // ── money module 2 · Transactions (how you paid): statement-level charges ───
  function Transactions() {
    return (
      <div className="rc-mod">
      <div className="rc-mod-h"><FI name="credit-card-1" size={15} color="var(--wf-muted)" />Transactions</div>
      <div className="rc-txn"><div className="rc-txn-ic"><FI name="bill-dollar-2" size={14} color="var(--wf-muted)" /></div>
        <div className="rc-txn-main"><div className="rc-txn-t">Installment 1 of 3</div><div className="rc-txn-s">Visa ···4471 · Mar 14</div></div>
        <div className="rc-txn-amt">$99<FI name="chevron-right" size={12} color="var(--wf-faint)" /></div></div>
      <div className="rc-txn"><div className="rc-txn-ic"><FI name="bill-dollar-2" size={14} color="var(--wf-muted)" /></div>
        <div className="rc-txn-main"><div className="rc-txn-t">Service fee</div><div className="rc-txn-s">Visa ···4471 · Mar 14</div></div>
        <div className="rc-txn-amt">$50<FI name="chevron-right" size={12} color="var(--wf-faint)" /></div></div>
      <div className="rc-txn upcoming"><div className="rc-txn-ic"><FI name="hourglass" size={14} color="var(--wf-faint)" /></div>
        <div className="rc-txn-main"><div className="rc-txn-t">Installment 2 of 3</div><div className="rc-txn-s">Upcoming · May 2</div></div>
        <div className="rc-txn-amt up">$100</div></div>
    </div>);

  }
  function TxnDetail() {
    return (
      <div className="rc-mod">
      <div className="rc-mod-h"><FI name="chevron-left" size={15} color="var(--wf-muted)" />Transaction</div>
      <div className="rc-txd-amt">$99.00</div>
      <div className="rc-txd-sub">Installment 1 of 3 · Paid</div>
      <div className="rc-li"><span>Date</span><span>Mar 14, 2026, 9:12 AM</span></div>
      <div className="rc-li"><span>Method</span><span>Visa ···4471</span></div>
      <div className="rc-li"><span>Reference</span><span>ch_1P4471</span></div>
      <div className="rc-txd-cta"><FI name="download-tray" size={13} color="var(--wf-strong)" />Download invoice</div>
    </div>);

  }

  // ── net-new: the Participants module ───────────────────────────────────────
  // Booker + added defendant / others. Add-participant affordance shown, pending
  // Alex confirming the permission rule (F-3).
  function Participants() {
    return (
      <div className="rc-mod">
      <div className="rc-mod-h"><FI name="multiple-users-1" size={15} color="var(--wf-muted)" />Participants</div>
      <div className="rc-ppl"><div className="rc-ppl-av"><FI name="user-square-single" size={18} color="var(--wf-muted)" /></div>
        <div className="rc-ppl-main"><div className="rc-ppl-n">You</div><div className="rc-ppl-r">Booker · primary contact</div></div></div>
      <div className="rc-ppl"><div className="rc-ppl-av"><FI name="user-square-single" size={18} color="var(--wf-muted)" /></div>
        <div className="rc-ppl-main"><div className="rc-ppl-n">Marcus Vale</div><div className="rc-ppl-r">Defendant on the citation</div></div></div>
      <div className="rc-ppl-add"><FI name="add-circle" size={15} color="var(--otr-blue)" />Add a participant</div>
    </div>);

  }

  // ── board ──────────────────────────────────────────────────────────────────
  function Cap({ children }) {return <p className="rc-cap">{children}</p>;}

  function RecordContentLab() {
    return (
      <>
      <DCSection id="rc-fields" title="Case record · field set + Show more" eyebrow="Exploration"
        updated="Updated • Fri Jul 10, 2026"
        subtitle="The confirmed record field set. Always on: Case ID, Law firm, Issued on, Court of record, Court date when available, and Violations. Issue date leads; booked date moves down with the receipt. Show more reveals refund eligibility, reference number, fine, points, and accidents. Order is open, expect to re-sequence.">
        <DCArtboard id="rc-collapsed" label="Record · collapsed" width={390} height={664}>
          <DScreen rec={{ caseId: ID }} height={664}><div style={{ paddingBottom: 14 }}><RecordFields /></div></DScreen>
        </DCArtboard>
        <DCArtboard id="rc-expanded" label="Record · Show more expanded" width={390} height={980}>
          <DScreen rec={{ caseId: ID }} height={980}><div style={{ paddingBottom: 14 }}><RecordFields expanded /></div></DScreen>
        </DCArtboard>
      </DCSection>

      <DCSection id="rc-firm" title="Law firm data block"
        subtitle="Renamed from Attorney: the block is the firm name, sometimes a solo practitioner's own name. On the record the Law firm field taps into this profile. Net-new, pre-Figma. Field source of truth is Alex's screenshot (blocked, F-2), so the exact stat set is a placeholder; the design holds all firm info and reveals it selectively per OTR's rules.">
        <DCArtboard id="rc-firm-block" label="Firm profile · tapped from Law firm" width={356} height={430}>
          <div className="otr" style={{ background: 'var(--wf-bg)', height: '100%', padding: 16, boxSizing: 'border-box' }}>
            <FirmBlock />
            <Cap>Reviews, clients booked, and success rate sit up front; anything OTR chooses not to surface stays one tap deeper. Values are placeholder pending F-2.</Cap>
          </div>
        </DCArtboard>
      </DCSection>

      <DCSection id="rc-money" title="Two money modules · Receipt vs Transactions"
        subtitle="Receipt is the balance: what is owed and what for (legal fee, service fee, total), with the payment-plan schedule, pay-ahead, and any overdue installment surfaced at top. Transactions is how you paid: each charge that hits your statement, tapping into its own invoice, with future installments as inactive upcoming rows.">
        <DCArtboard id="rc-receipt-paid" label="Receipt · paid in full" width={356} height={264}>
          <div className="otr" style={{ background: 'var(--wf-bg)', height: '100%', padding: 16, boxSizing: 'border-box' }}><ReceiptPaid /></div>
        </DCArtboard>
        <DCArtboard id="rc-receipt-plan" label="Receipt · payment plan + overdue" width={356} height={400}>
          <div className="otr" style={{ background: 'var(--wf-bg)', height: '100%', padding: 16, boxSizing: 'border-box' }}>
            <ReceiptPlan />
            <Cap>The overdue installment is pulled to the top; paid and upcoming follow.</Cap>
          </div>
        </DCArtboard>
        <DCArtboard id="rc-txns" label="Transactions · statement charges" width={356} height={330}>
          <div className="otr" style={{ background: 'var(--wf-bg)', height: '100%', padding: 16, boxSizing: 'border-box' }}>
            <Transactions />
            <Cap>Future installments render as inactive upcoming rows.</Cap>
          </div>
        </DCArtboard>
        <DCArtboard id="rc-txn-detail" label="Transaction · invoice detail" width={356} height={344}>
          <div className="otr" style={{ background: 'var(--wf-bg)', height: '100%', padding: 16, boxSizing: 'border-box' }}>
            <TxnDetail />
            <Cap>A transaction row taps into its own invoice / receipt detail.</Cap>
          </div>
        </DCArtboard>
      </DCSection>

      <DCSection id="rc-participants" title="Participants module"
        subtitle="Net-new, first time in review. Shows case participants: the booker plus any added defendant or others. The add-participant affordance is shown but the permission rule is pending Alex's confirmation (F-3), so who can add is not yet wired.">
        <DCArtboard id="rc-participants-card" label="Participants · booker + defendant" width={356} height={300}>
          <div className="otr" style={{ background: 'var(--wf-bg)', height: '100%', padding: 16, boxSizing: 'border-box' }}>
            <Participants />
            <Cap>Add a participant is placed but gated pending the F-3 permission rule.</Cap>
          </div>
        </DCArtboard>
      </DCSection>
    </>);

  }

  // ── CSS ────────────────────────────────────────────────────────────────────
  if (typeof document !== 'undefined' && !document.getElementById('record-content-css')) {
    const s = document.createElement('style');
    s.id = 'record-content-css';
    s.textContent = `
  .rc-cap{ font-size:11.5px; line-height:1.5; color:var(--wf-muted); margin:12px 2px 0; text-wrap:pretty; }
  .rc-copy{ display:inline-flex; align-items:center; gap:6px; }
  .rc-tap{ align-items:center; cursor:pointer; }
  .rc-tap .rc-chev{ flex:none; margin-left:auto; display:flex; align-self:center; }
  .rc-more{ padding:12px 14px 4px; border-top:1px solid var(--wf-line2); }
  .rc-more-b{ display:inline-flex; align-items:center; gap:5px; font-size:12.5px; font-weight:800; color:var(--otr-blue); }

  /* law-firm data block */
  .rc-firm{ background:#fff; border:1px solid var(--wf-line); border-radius:16px; overflow:hidden; }
  .rc-firm-head{ display:flex; align-items:center; gap:12px; padding:14px; }
  .rc-firm-id{ flex:1; min-width:0; }
  .rc-firm-name{ font-size:16px; font-weight:800; letter-spacing:-.2px; color:var(--wf-ink); }
  .rc-firm-sub{ font-size:12px; color:var(--wf-muted); margin-top:2px; }
  .rc-firm-rate{ display:flex; align-items:center; gap:8px; margin-top:6px; }
  .rc-firm-reviews{ font-size:11.5px; color:var(--wf-faint); font-weight:600; }
  .rc-firm-stats{ display:flex; border-top:1px solid var(--wf-line2); }
  .rc-stat{ flex:1; text-align:center; padding:11px 4px; border-left:1px solid var(--wf-line2); }
  .rc-stat:first-child{ border-left:none; }
  .rc-stat-v{ font-size:17px; font-weight:800; color:var(--wf-ink); letter-spacing:-.3px; }
  .rc-stat-k{ font-size:10.5px; color:var(--wf-faint); font-weight:600; margin-top:2px; }
  .rc-firm-row{ display:flex; align-items:center; gap:9px; padding:11px 14px; border-top:1px solid var(--wf-line2);
    font-size:12.5px; font-weight:700; color:var(--wf-strong); }

  /* money + participant module shell */
  .rc-mod{ background:#fff; border:1px solid var(--wf-line); border-radius:16px; padding:6px 14px 12px; }
  .rc-mod-h{ display:flex; align-items:center; gap:9px; padding:10px 0 9px; font-size:13px; font-weight:800;
    color:var(--wf-ink); border-bottom:1px solid var(--wf-line2); margin-bottom:6px; }
  .rc-mod-tag{ margin-left:auto; font-size:10.5px; font-weight:800; color:var(--wf-muted);
    background:var(--wf-fill); border-radius:999px; padding:3px 9px; }
  .rc-mod-tag.paid{ color:#127a43; background:#e4f7ec; }
  .rc-li{ display:flex; align-items:center; justify-content:space-between; padding:7px 0; font-size:13px;
    color:var(--wf-strong); }
  .rc-li.total{ border-top:1px solid var(--wf-line2); margin-top:4px; padding-top:10px; font-weight:800; color:var(--wf-ink); font-size:14.5px; }
  .rc-mod-foot{ display:flex; align-items:center; gap:6px; margin-top:9px; padding-top:9px;
    border-top:1px solid var(--wf-line2); font-size:11px; font-weight:600; color:var(--wf-faint); }

  /* payment-plan installments */
  .rc-inst{ display:flex; align-items:center; gap:10px; padding:10px 11px; border-radius:11px; margin-top:8px;
    background:var(--wf-fill); border:1px solid var(--wf-line2); }
  .rc-inst-main{ flex:1; min-width:0; }
  .rc-inst-t{ font-size:12.5px; font-weight:800; color:var(--wf-ink); }
  .rc-inst-s{ font-size:11px; color:var(--wf-muted); margin-top:1px; }
  .rc-inst-amt{ font-size:14px; font-weight:800; color:var(--wf-ink); display:flex; flex-direction:column; align-items:flex-end; gap:2px; }
  .rc-inst-flag{ font-size:9.5px; font-weight:800; letter-spacing:.3px; text-transform:uppercase; color:#fff;
    background:var(--money); border-radius:999px; padding:1px 6px; }
  .rc-inst.overdue{ background:var(--money-bg); border-color:var(--money-line); }
  .rc-inst.overdue .rc-inst-amt{ color:var(--money); }
  .rc-inst.done{ opacity:.72; }
  .rc-inst.upcoming{ background:#fff; border-style:dashed; }
  .rc-inst.upcoming .rc-inst-t, .rc-inst.upcoming .rc-inst-amt{ color:var(--wf-muted); }
  .rc-payahead{ display:inline-flex; align-items:center; gap:6px; margin-top:11px; font-size:12px; font-weight:800; color:var(--otr-blue); }

  /* transactions */
  .rc-txn{ display:flex; align-items:center; gap:11px; padding:9px 0; border-top:1px solid var(--wf-line2); }
  .rc-txn:first-of-type{ border-top:none; }
  .rc-txn-ic{ width:32px; height:32px; border-radius:9px; flex:none; display:flex; align-items:center; justify-content:center; background:var(--wf-fill); }
  .rc-txn-main{ flex:1; min-width:0; }
  .rc-txn-t{ font-size:13px; font-weight:700; color:var(--wf-ink); }
  .rc-txn-s{ font-size:11px; color:var(--wf-muted); margin-top:1px; }
  .rc-txn-amt{ display:flex; align-items:center; gap:5px; font-size:13.5px; font-weight:800; color:var(--wf-ink); }
  .rc-txn.upcoming{ opacity:.6; }
  .rc-txn-amt.up{ color:var(--wf-muted); }
  .rc-txd-amt{ font-size:30px; font-weight:800; letter-spacing:-.8px; color:var(--wf-ink); margin-top:6px; }
  .rc-txd-sub{ font-size:12px; color:var(--wf-muted); margin-bottom:8px; }
  .rc-txd-cta{ display:flex; align-items:center; justify-content:center; gap:7px; height:38px; margin-top:12px;
    border-radius:999px; border:1px solid var(--wf-line); font-size:13px; font-weight:800; color:var(--wf-strong); }

  /* participants */
  .rc-ppl{ display:flex; align-items:center; gap:11px; padding:9px 0; border-top:1px solid var(--wf-line2); }
  .rc-ppl:first-of-type{ border-top:none; }
  .rc-ppl-av{ width:36px; height:36px; border-radius:11px; flex:none; display:flex; align-items:center; justify-content:center;
    background:var(--wf-fill); border:1px solid var(--wf-line2); }
  .rc-ppl-main{ flex:1; min-width:0; }
  .rc-ppl-n{ font-size:13.5px; font-weight:800; color:var(--wf-ink); }
  .rc-ppl-r{ font-size:11.5px; color:var(--wf-muted); margin-top:1px; }
  .rc-ppl-add{ display:inline-flex; align-items:center; gap:7px; margin-top:11px; padding-top:11px;
    border-top:1px solid var(--wf-line2); font-size:12.5px; font-weight:800; color:var(--otr-blue); width:100%; }
  `;
    document.head.appendChild(s);
  }

  window.RecordContentLab = RecordContentLab;
})();