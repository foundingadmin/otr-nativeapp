// detail-screens.jsx — BOARD: the assembled Case Details screen.
// FullDetail composes every zone (rail → identity → status → action hub →
// facts → expanded record → help) for a record. Section A annotates the
// zone anatomy on the calm Active baseline; Section G walks the landmark
// lifecycle states end-to-end. Single-scroll disclosure (the PRD-recommended
// default; the tabs alternative lives on the Disclosure board).
// Timeline zone parked (DR-CD-003, Jul 10 2026): the standalone lifecycle
// timeline is a dead feature; the case chat audit log is the canonical
// lifecycle surface. No timeline renders on any Case Details screen.
/* __IIFE__ */ ;(function(){
const { DCSection, DCArtboard, DCPostIt, DETAIL, DScreen, ZLabel, AccountRail,
  TicketHero, Identity, ActionHub, Celebrate, DetailTabs,
  HelpZone } = window;

// the full single-scroll detail screen for one record
function FullDetail({ k, rec, annotate=false, height }){
  rec = rec || DETAIL[k];
  const dispute = rec.status==='active' && rec.balance>0;
  return (
    <DScreen rec={rec} height={height}>
      {annotate && <ZLabel n="2">Identity — who’s on my side & what is this</ZLabel>}
      <TicketHero rec={rec} />
      <Identity rec={rec} />

      <Celebrate rec={rec} />

      {rec.actions && <>
        {annotate && <ZLabel n="3">Action needed — prioritized hub</ZLabel>}
        <ActionHub rec={rec} />
      </>}

      {annotate && <ZLabel n="4">Record — Overview · Documents · Payments</ZLabel>}
      <DetailTabs rec={rec} />

      {annotate && <ZLabel n="5">Help / escalation — OTR support</ZLabel>}
      <HelpZone dispute={dispute} />
    </DScreen>
  );
}

// per-screen heights (single-scroll = tall; measured to content, timeline removed)
const H = {
  active:1352, loe:1618, counter:1492, concurrent:1863, overdue:1626,
  remarket:1223, dismissed:1438, notbooked:1020,
};
const H_ANATOMY = 1450; // Active + zone-label annotations (timeline zone parked)

function DetailAnatomy(){
  return (
    <DCSection id="detail-anatomy" title="Case Details · the zone anatomy"
      subtitle="One calm baseline (Active), annotated top to bottom. The card answers the middle zones in miniature; this page owns identity, record, and help — the disclosure and action surface a preview card can’t carry. Single-scroll keeps an anxious user oriented.">
      <DCArtboard id="anatomy-active" label="Active · annotated zones" width={390} height={H_ANATOMY}>
        <FullDetail k="active" annotate height={H_ANATOMY} />
      </DCArtboard>
      <DCArtboard id="active-clean" label="Active · clean (no annotations)" width={390} height={H.active}>
        <FullDetail k="active" height={H.active} />
      </DCArtboard>
      <DCArtboard id="loe" label="Needs signature · amber action" width={390} height={H.loe}>
        <FullDetail k="loe" height={H.loe} />
      </DCArtboard>
      <DCArtboard id="counter" label="Counter offer · amber action" width={390} height={H.counter}>
        <FullDetail k="counter" height={H.counter} />
      </DCArtboard>
    </DCSection>
  );
}

function DetailLifecycle(){
  return (
    <DCSection id="detail-lifecycle" title="Lifecycle coverage · landmark states"
      subtitle="The same screen reshapes per state — conditional zones appear, collapse, and change tone. Starting with the landmark statuses; the full spectrum follows from the Case Preview Cards status system.">
      <DCArtboard id="concurrent" label="LOE + counter offer · concurrency" width={390} height={H.concurrent}>
        <FullDetail k="concurrent" height={H.concurrent} />
      </DCArtboard>
      <DCArtboard id="overdue" label="Past-due · critical + account rail" width={390} height={H.overdue}>
        <FullDetail k="overdue" height={H.overdue} />
      </DCArtboard>
      <DCArtboard id="remarket" label="Rematching · reassurance, no attorney" width={390} height={H.remarket}>
        <FullDetail k="remarket" height={H.remarket} />
      </DCArtboard>
      <DCArtboard id="dismissed" label="Resolved · dismissed (celebration)" width={390} height={H.dismissed}>
        <FullDetail k="dismissed" height={H.dismissed} />
      </DCArtboard>
      <DCArtboard id="notbooked" label="Not booked · drive booking" width={390} height={H.notbooked}>
        <FullDetail k="notbooked" height={H.notbooked} />
      </DCArtboard>
    </DCSection>
  );
}

function DetailScreens(){
  return <><DetailAnatomy /><DetailLifecycle /></>;
}
window.FullDetail = FullDetail;
window.DETAIL_H = H;
window.DetailScreens = DetailScreens;
})();
