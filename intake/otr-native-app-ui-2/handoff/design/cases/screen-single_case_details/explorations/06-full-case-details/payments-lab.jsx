// payments-lab.jsx — the Payments sub-tab: two divergences against the built
// version, plus the deeper states. A transaction is a tap target that opens its
// own receipt, and the plan carries an overdue state and a paid-in-full state.
/* __IIFE__ */ ;(function(){
const { useState } = React;
const { FeatureIcon: FI } = window.OffTheRecordDesignSystem_6eff96;

const TOTAL = 329;

if (typeof document !== 'undefined' && !document.getElementById('fcd-pay')) {
  const s = document.createElement('style');
  s.id = 'fcd-pay';
  s.textContent = `
  .tx-chev{ flex:none; display:flex; margin-left:2px; }
  .tx-a, .tx-st{ display:block; }
  /* balance-first variant */
  .balcard{ margin:16px 14px 0; padding:16px; border-radius:18px; background:#fff; border:1px solid var(--wf-line);
    box-shadow:0 2px 10px rgba(16,24,40,.05); }
  .balcard .bc-k{ font-size:10.5px; font-weight:800; letter-spacing:.8px; text-transform:uppercase; color:var(--wf-faint); }
  .balcard .bc-v{ font-size:34px; font-weight:800; letter-spacing:-1.2px; color:var(--wf-ink); margin-top:4px; line-height:1; }
  .balcard .bc-s{ font-size:12.5px; color:var(--wf-muted); margin-top:5px; }
  .balcard .bc-row{ display:flex; gap:8px; margin-top:14px; }
  .balcard .bc-row .act{ flex:1; }
  .disc{ margin:12px 14px 0; background:#fff; border:1px solid var(--wf-line); border-radius:16px; overflow:hidden; }
  .disc-row{ display:flex; align-items:center; gap:11px; padding:14px; }
  .disc-row + .disc-row{ border-top:1px solid var(--wf-line2); }
  .disc-row .dr-m{ flex:1; min-width:0; }
  .disc-row .dr-t{ display:block; font-size:13.5px; font-weight:800; color:var(--wf-ink); }
  .disc-row .dr-s{ display:block; font-size:11.5px; color:var(--wf-muted); margin-top:2px; }
  .disc-row .dr-a{ flex:none; font-size:13.5px; font-weight:800; color:var(--wf-ink); }
  /* segmented variant */
  .payseg{ display:flex; gap:3px; margin:14px 14px 0; padding:3px; border-radius:999px; background:#eef0f4; }
  .payseg div{ flex:1; height:34px; border-radius:999px; display:flex; align-items:center; justify-content:center;
    font-size:12.5px; font-weight:800; color:var(--wf-muted); cursor:pointer; }
  .payseg div.on{ background:#fff; color:var(--wf-ink); box-shadow:0 1px 3px rgba(16,24,40,.12); }
  /* overdue installment */
  .odue{ display:flex; align-items:center; gap:10px; padding:11px; border-radius:12px; background:var(--money-bg);
    border:1px solid var(--money-line); }
  .odue .od-m{ flex:1; min-width:0; }
  .odue .od-t{ display:block; font-size:12.5px; font-weight:800; color:var(--money); }
  .odue .od-s{ display:block; font-size:11.5px; color:var(--money); opacity:.85; margin-top:2px; }
  .odue .od-cta{ flex:none; height:32px; padding:0 13px; border-radius:999px; background:var(--money); color:#fff;
    font-size:12.5px; font-weight:800; display:inline-flex; align-items:center; }
  .txn .tx-st.fail{ color:var(--money); }
  /* receipt push screen */
  .rbar{ display:flex; align-items:center; gap:6px; padding:6px 12px 10px; background:#fff; flex:none;
    border-bottom:1px solid var(--wf-line2); }
  .rbar .nav{ width:36px; height:36px; border-radius:50%; display:flex; align-items:center; justify-content:center;
    flex:none; color:var(--wf-strong); }
  .rbar .rt{ flex:1; min-width:0; text-align:center; font-size:15px; font-weight:800; color:var(--wf-ink); }
  .rhero{ background:#fff; padding:20px 20px 22px; text-align:center; border-bottom:1px solid var(--wf-line2); }
  .rhero .rh-a{ font-size:38px; font-weight:800; letter-spacing:-1.4px; color:var(--wf-ink); line-height:1; }
  .rhero .rh-s{ font-size:12.5px; color:var(--wf-muted); margin-top:7px; }
  .rhero .rh-badge{ display:inline-flex; align-items:center; gap:6px; margin-top:11px; height:26px; padding:0 11px;
    border-radius:999px; background:#e4f7ec; color:#0f7a41; font-size:12px; font-weight:800; }
  .rrow{ display:flex; align-items:baseline; gap:12px; padding:12px 0; border-top:1px solid var(--wf-line2); }
  .rrow:first-child{ border-top:none; }
  .rrow .rr-k{ flex:none; width:112px; font-size:12px; font-weight:700; color:var(--wf-faint); }
  .rrow .rr-v{ flex:1; min-width:0; font-size:13px; font-weight:700; color:var(--wf-ink); text-align:right; }
  .ract{ display:flex; gap:8px; margin:14px 14px 0; }
  `;
  document.head.appendChild(s);
}

function Money(n) { return '$' + n; }

function LineItemRows() {
  const { LINE_ITEMS } = window;
  return (
    <>
      {LINE_ITEMS.map(([l, a, s]) =>
        <div key={l} className="li">
          <span className="li-m"><span className="li-t">{l}</span><span className="li-s">{s}</span></span>
          <span className="li-a">{Money(a)}</span>
        </div>
      )}
      <div className="li total"><span className="li-m"><span className="li-t">Total</span></span><span className="li-a">{Money(TOTAL)}</span></div>
    </>
  );
}

// a transaction row is a tap target: it opens its own receipt
function TxnRows({ rows, chev = true }) {
  return rows.map((t, i) =>
    <div key={i} className={`txn${t.up ? ' up' : ''}`}>
      <span className="tx-ic"><FI name={t.up ? 'countdown-timer' : t.fail ? 'warning-triangle' : 'file-check'} size={15} color={t.fail ? 'var(--money)' : 'var(--wf-muted)'} /></span>
      <span className="tx-m"><span className="tx-t">{t.d}</span><span className="tx-s">{t.m}</span></span>
      <span className="tx-r"><span className="tx-a">{Money(t.a)}</span><span className={`tx-st${t.fail ? ' fail' : ''}`}>{t.s}</span></span>
      {chev && !t.up && <span className="tx-chev"><FI name="chevron-right" size={12} color="var(--wf-faint)" /></span>}
    </div>
  );
}

// the balance card, kept as the head of both B and D
function BalanceCard() {
  return (
    <div className="balcard">
      <div className="bc-k">Remaining balance</div>
      <div className="bc-v">$109</div>
      <div className="bc-s">$220 paid of $329. Last installment due Mar 27, 2026.</div>
      <div className="plan-bar" style={{ marginTop: 13 }}><i style={{ width: '67%' }} /></div>
      <div className="bc-row">
        <div className="act blue" style={{ flex: 1 }}>Pay $109 now</div>
      </div>
    </div>
  );
}

// B · balance first, the ledger folded away behind two rows
function PayVariantB() {
  const { TXNS } = window;
  return (
    <>
      <BalanceCard />
      <div className="disc">
        <div className="disc-row">
          <FI name="bill-dollar-2" size={16} color="var(--wf-muted)" />
          <span className="dr-m"><span className="dr-t">Statement of charges</span><span className="dr-s">Legal fee, CDL surcharge, service fee</span></span>
          <span className="dr-a">$329</span>
          <FI name="chevron-right" size={12} color="var(--wf-faint)" />
        </div>
        <div className="disc-row">
          <FI name="download-tray" size={16} color="var(--wf-muted)" />
          <span className="dr-m"><span className="dr-t">Payment history</span><span className="dr-s">2 payments, 1 scheduled</span></span>
          <FI name="chevron-right" size={12} color="var(--wf-faint)" />
        </div>
      </div>
      <div className="mcard">
        <div className="m-h"><FI name="countdown-timer" size={15} color="var(--wf-muted)" /><span className="mh-t">Next up</span></div>
        <div className="m-b"><TxnRows rows={[TXNS[2]]} /></div>
      </div>
      <div className="fnote">
        <FI name="information-circle" size={13} color="var(--wf-faint)" />
        The money question a user arrives with is what do I still owe. Detail is one tap behind it.
      </div>
    </>
  );
}

// D · the liked balance card as the head, then the ledger in full underneath.
// No second plan card: the card already carries the bar and the next due date.
function PayVariantD() {
  const { TXNS } = window;
  return (
    <>
      <BalanceCard />
      <div className="mcard">
        <div className="m-h"><FI name="bill-dollar-2" size={15} color="var(--wf-muted)" /><span className="mh-t">Statement of charges</span></div>
        <div className="m-b"><LineItemRows /></div>
      </div>
      <div className="mcard">
        <div className="m-h"><FI name="download-tray" size={15} color="var(--wf-muted)" /><span className="mh-t">Payment history</span><span className="mh-s">3 transactions</span></div>
        <div className="m-b"><TxnRows rows={TXNS} /></div>
      </div>
    </>
  );
}

// C · RETIRED Aug 14, 2026: a segmented control inside a sub-tab is a third
// stacked level of navigation. Kept in source, off the board.
function PayVariantC() {
  const { TXNS } = window;
  const [seg, setSeg] = useState('receipt');
  return (
    <>
      <div className="payseg">
        <div className={seg === 'receipt' ? 'on' : ''} onClick={() => setSeg('receipt')}>Receipt</div>
        <div className={seg === 'txn' ? 'on' : ''} onClick={() => setSeg('txn')}>Transactions</div>
      </div>
      {seg === 'receipt' ?
        <>
          <div className="mcard">
            <div className="m-h"><FI name="bill-dollar-2" size={15} color="var(--wf-muted)" /><span className="mh-t">Statement of charges</span></div>
            <div className="m-b"><LineItemRows /></div>
          </div>
          <div className="mcard">
            <div className="m-h"><FI name="calendar-check" size={15} color="var(--wf-muted)" /><span className="mh-t">Payment plan</span><span className="mh-s">3 installments</span></div>
            <div className="m-b">
              <div className="plan-bar" style={{ marginTop: 10 }}><i style={{ width: '67%' }} /></div>
              <div className="plan-next">
                <span className="pn-m"><span className="pn-t">$109 due Mar 27, 2026</span><span className="pn-s">$220 already paid, 2/3</span></span>
                <span className="pn-cta">Pay $109</span>
              </div>
            </div>
          </div>
        </> :
        <div className="mcard">
          <div className="m-h"><FI name="download-tray" size={15} color="var(--wf-muted)" /><span className="mh-t">Payment history</span><span className="mh-s">3 transactions</span></div>
          <div className="m-b"><TxnRows rows={TXNS} /></div>
        </div>}
      <div className="fnote">
        <FI name="information-circle" size={13} color="var(--wf-faint)" />
        Keeps the billing side and the payment side from ever being read as one list.
      </div>
    </>
  );
}

// ── deeper states ─────────────────────────────────────────────────────────
function PayOverdue() {
  const rows = [
    { d: 'Feb 06, 2026', a: 110, m: 'Visa ···· 4242', s: 'Paid' },
    { d: 'Mar 06, 2026', a: 110, m: 'Visa ···· 4242', s: 'Card declined', fail: true },
    { d: 'Mar 27, 2026', a: 109, m: 'Visa ···· 4242', s: 'Scheduled', up: true },
  ];
  return (
    <>
      <div className="mcard" style={{ marginTop: 16 }}>
        <div className="m-h"><FI name="calendar-check" size={15} color="var(--wf-muted)" /><span className="mh-t">Payment plan</span><span className="mh-s">1 installment late</span></div>
        <div className="m-b">
          <div className="odue" style={{ marginTop: 10 }}>
            <FI name="warning-octagon" size={17} color="var(--money)" />
            <span className="od-m"><span className="od-t">$110 was due Mar 06, 2026</span><span className="od-s">Your card was declined. Cases with a late balance can be cancelled.</span></span>
            <span className="od-cta">Pay now</span>
          </div>
          <div className="li" style={{ marginTop: 12, paddingBottom: 4 }}>
            <span className="li-m"><span className="li-t">$110 paid</span><span className="li-s">$219 remaining, one payment late</span></span>
            <span className="li-a" style={{ fontSize: 12, color: 'var(--wf-muted)' }}>1/3</span>
          </div>
          <div className="plan-bar"><i style={{ width: '33%', background: 'var(--money)' }} /></div>
        </div>
      </div>
      <div className="mcard">
        <div className="m-h"><FI name="download-tray" size={15} color="var(--wf-muted)" /><span className="mh-t">Payment history</span><span className="mh-s">3 transactions</span></div>
        <div className="m-b"><TxnRows rows={rows} /></div>
      </div>
    </>
  );
}

function PayPaidInFull() {
  return (
    <>
      <div className="mcard" style={{ marginTop: 16 }}>
        <div className="m-h"><FI name="bill-dollar-2" size={15} color="var(--wf-muted)" /><span className="mh-t">Statement of charges</span><span className="mh-s">Settled</span></div>
        <div className="m-b"><LineItemRows /></div>
      </div>
      <div className="mcard">
        <div className="m-h"><FI name="download-tray" size={15} color="var(--wf-muted)" /><span className="mh-t">Payment history</span><span className="mh-s">1 transaction</span></div>
        <div className="m-b"><TxnRows rows={[{ d: 'Feb 06, 2026', a: 329, m: 'Visa ···· 4242, paid in full', s: 'Paid' }]} /></div>
      </div>
      <div className="ract">
        <div className="act ghost" style={{ flex: 1 }}><FI name="download-tray" size={14} color="var(--wf-ink)" />Download all receipts</div>
      </div>
    </>
  );
}

// the screen a transaction row pushes into
function TxnReceiptScreen({ height }) {
  return (
    <div className="otr dscreen" style={height ? { height } : null}>
      <div className="dstatus"><span>9:41</span><span className="dots"><i /><i /><i style={{ width: 18 }} /></span></div>
      <div className="rbar">
        <div className="nav"><FI name="chevron-left" size={16} color="var(--wf-strong)" /></div>
        <div className="rt">Receipt</div>
        <div className="nav"><FI name="download-tray" size={17} color="var(--wf-strong)" /></div>
      </div>
      <div className="dbody">
        <div className="rhero">
          <div className="rh-a">$110</div>
          <div className="rh-s">Installment 2 of 3 · Case #OTR-12345</div>
          <div className="rh-badge"><FI name="check-thick" size={13} color="#0f7a41" />Paid Mar 06, 2026</div>
        </div>
        <div className="mcard" style={{ marginTop: 16 }}>
          <div className="m-h"><FI name="file-document-info-quick-reference" size={15} color="var(--wf-muted)" /><span className="mh-t">Details</span></div>
          <div className="m-b">
            <div className="rrow"><span className="rr-k">Invoice</span><span className="rr-v">#8841</span></div>
            <div className="rrow"><span className="rr-k">Charged</span><span className="rr-v">Mar 06, 2026 · 9:02 AM</span></div>
            <div className="rrow"><span className="rr-k">Method</span><span className="rr-v">Visa ···· 4242</span></div>
            <div className="rrow"><span className="rr-k">Applied to</span><span className="rr-v">Legal fee, Park &amp; Vance</span></div>
            <div className="rrow"><span className="rr-k">Balance after</span><span className="rr-v">$109 remaining</span></div>
          </div>
        </div>
        <div className="ract">
          <div className="act ghost" style={{ flex: 1 }}><FI name="download-tray" size={14} color="var(--wf-ink)" />Download PDF</div>
          <div className="act ghost" style={{ flex: 1 }}><FI name="chat-bubble-info-help" size={14} color="var(--wf-ink)" />Question about this</div>
        </div>
        <div className="fnote" style={{ marginBottom: 18 }}>
          <FI name="information-circle" size={13} color="var(--wf-faint)" />
          Billing questions go to Off the Record support, not to your law firm.
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { BalanceCard, LineItemRows, TxnRows, PayVariantB, PayVariantC, PayVariantD, PayOverdue, PayPaidInFull, TxnReceiptScreen });

})();
