// full-case-details.jsx — BOARD: the assembled Case Details screen on the
// Ticket / Case split, the chat entry decision, the Payments divergences and
// the deeper payment states.
/* __IIFE__ */ ;(function(){
const { DCSection, DCArtboard, CaseDetailScreen, TxnReceiptScreen, PayOverdue, PayPaidInFull } = window;

const H = { ticket: 1600, overview: 1664, docs: 1168, pay: 1396, payB: 1142, payD: 1362,
  crop: 492, nophoto: 1670, receipt: 640, mod_overdue: 528, mod_paid: 536 };

function Module({ children, height }) {
  return <div className="otr" style={{ background: 'var(--wf-bg)', height, overflow: 'hidden' }}>{children}</div>;
}

function FullCaseDetails(){
  return (
    <>
      <DCSection id="fcd-screen" title="Case Details · Ticket and Case" eyebrow="Exploration"
        updated="Updated • Fri Aug 14, 2026"
        subtitle="One Active case, every tab filled, in the order they appear on the screen. The top split is Ticket against Case. Ticket is the static record, it comes from the citation, a permanent external document, so it is read only. Case is the dynamic record and carries Overview, Documents and Payments inside it. The hero drops the ticket photo for a plain identity block, and the action toast sits above the tabs so it stays put wherever the user is. Tabs are live, click through them.">
        <DCArtboard id="fcd-ticket" label="Ticket · the static record" width={390} height={H.ticket}>
          <CaseDetailScreen initial="ticket" height={H.ticket} />
        </DCArtboard>
        <DCArtboard id="fcd-overview" label="Case · Overview, the default" width={390} height={H.overview}>
          <CaseDetailScreen initial="overview" height={H.overview} />
        </DCArtboard>
        <DCArtboard id="fcd-docs" label="Case · Documents" width={390} height={H.docs}>
          <CaseDetailScreen initial="docs" height={H.docs} />
        </DCArtboard>
        <DCArtboard id="fcd-pay" label="Case · Payments" width={390} height={H.pay}>
          <CaseDetailScreen initial="pay" height={H.pay} />
        </DCArtboard>
      </DCSection>

      <DCSection id="fcd-pay-div" title="Case · Payments · the open decision"
        subtitle="A is what is built above, the full ledger in reading order: billed, plan, paid. B leads with the number a user came for and folds the ledger behind two rows. D keeps the balance card you liked and puts the full ledger under it, no second plan card since the card already carries the bar and the next due date. The segmented Receipt against Transactions version was retired Aug 14, 2026, a segmented control inside a sub-tab is a third stacked level of navigation. In every version a paid transaction is a tap target that opens its own receipt.">
        <DCArtboard id="fcd-pay-a" label="A · full ledger, as built" width={390} height={H.pay}>
          <CaseDetailScreen initial="pay" payVariant="a" height={H.pay} />
        </DCArtboard>
        <DCArtboard id="fcd-pay-b" label="B · balance first, ledger folded" width={390} height={H.payB}>
          <CaseDetailScreen initial="pay" payVariant="b" height={H.payB} />
        </DCArtboard>
        <DCArtboard id="fcd-pay-d" label="D · balance card, then the full ledger" width={390} height={H.payD}>
          <CaseDetailScreen initial="pay" payVariant="d" height={H.payD} />
        </DCArtboard>
      </DCSection>

      <DCSection id="fcd-pay-states" title="Payments · the deeper states"
        subtitle="Where a transaction goes when it is tapped, and the two states the plan can be in. The receipt is a pushed screen, not a sheet, because it is a document a user may need to keep. Billing questions route to Off the Record support, never to the law firm.">
        <DCArtboard id="fcd-receipt" label="Transaction · its own receipt" width={390} height={H.receipt}>
          <TxnReceiptScreen height={H.receipt} />
        </DCArtboard>
        <DCArtboard id="fcd-pay-overdue" label="Plan · installment late" width={390} height={H.mod_overdue}>
          <Module height={H.mod_overdue}><PayOverdue /></Module>
        </DCArtboard>
        <DCArtboard id="fcd-pay-paid" label="Plan · paid in full" width={390} height={H.mod_paid}>
          <Module height={H.mod_paid}><PayPaidInFull /></Module>
        </DCArtboard>
      </DCSection>

      <DCSection id="fcd-chat" title="Getting into case chat"
        subtitle="Decided Aug 14, 2026: the firm card is the door. The whole card opens the chat and the unread message shows inline, so the people handling the case are the way into talking to them. The app bar icon and the both version stay here as the alternatives that were weighed.">
        <DCArtboard id="fcd-chat-card" label="Firm card is the door · decided" width={390} height={H.crop}>
          <CaseDetailScreen chatEntry="card" crop height={H.crop} />
        </DCArtboard>
        <DCArtboard id="fcd-chat-bar" label="Chat icon in the app bar · not taken" width={390} height={H.crop}>
          <CaseDetailScreen chatEntry="appbar" crop height={H.crop} />
        </DCArtboard>
        <DCArtboard id="fcd-chat-both" label="Both, card and app bar · not taken" width={390} height={H.crop}>
          <CaseDetailScreen chatEntry="both" crop height={H.crop} />
        </DCArtboard>
      </DCSection>

      <DCSection id="fcd-nophoto" title="Ticket tab · no photo yet"
        subtitle="A user can book a case without ever photographing the ticket. The static record still exists, so the coded ticket stands in for the artifact and the add-photo prompt sits directly under it. The field set below is identical either way.">
        <DCArtboard id="fcd-ticket-nophoto" label="Ticket · photo missing" width={390} height={H.nophoto}>
          <CaseDetailScreen initial="ticket" ticketPhoto={false} height={H.nophoto} />
        </DCArtboard>
      </DCSection>
    </>
  );
}

Object.assign(window, { FullCaseDetails });

})();
