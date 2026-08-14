// record-studies.jsx. Row 3: how the record zone that holds Case overview,
// Documents, and Payment history is laid out. Option A stacks all three as
// always-open cards in one scroll, no tap needed to see any section. Option B
// puts them behind tabs that reveal one section card at a time.
/* __IIFE__ */ ;(function(){
const { DCSection, DCArtboard } = window;
const { DScreen, CaseFacts, TabCard, DocList, PaymentHistory, DetailTabs } = window;

const REC = {
  caseId:'OTR-48144', status:'active', cls:'Misdemeanor',
  place:'Glendale, CA', issued:'Mar 11, 2026',
  attorney:{ name:'Helen Vance', firm:'Park & Vance', rating:4.9 },
  violations:[
    { label:'Reckless driving', code:'VC 23103', note:'Willful disregard for safety' },
    { label:'Speeding', code:'VC 22349', note:'Over the posted limit' },
  ],
  court:{ name:'Los Angeles Superior, North', addr:'600 E Broadway, Glendale, CA 91206', date:'May 20, 2026', days:70 },
  balance:0,
  documents:[
    { n:'Letter of engagement', t:'Signed', d:'Mar 16, 2026', ic:'file-check' },
    { n:'Citation #G-1183', t:'On file', d:'Mar 11, 2026', ic:'file-document-info-quick-reference' },
  ],
  payments:[{ l:'Legal fee', a:299, d:'Mar 16, 2026', s:'Paid' }],
};

// Option A. Three always-open cards in one scroll.
function StackedRecord({ rec }){
  return (
    <div style={{ paddingBottom:14 }}>
      <CaseFacts rec={rec} completionPrompts={false} />
      <TabCard ic="files-and-folders" title="Documents"><DocList rec={rec} /></TabCard>
      <TabCard ic="bill-dollar-2" title="Payments"><PaymentHistory rec={rec} /></TabCard>
    </div>
  );
}

function RecordLayoutStudies(){
  return (
    <DCSection id="record-layout" title="Overview, documents, and payments" eyebrow="Exploration"
      subtitle="How the record zone holds the three sections. A stacks all three as always-open cards in one scroll, so nothing is ever a tap away. B keeps them behind tabs that reveal one section at a time, trading the long scroll for a shorter page.">
      <DCArtboard id="rec-stacked" label="A · Stacked cards, always open" width={392} height={1096}>
        <DScreen rec={REC}>
          <StackedRecord rec={REC} />
        </DScreen>
      </DCArtboard>
      <DCArtboard id="rec-tabbed" label="B · Tabbed sections" width={392} height={812}>
        <DScreen rec={REC}>
          <DetailTabs rec={REC} />
        </DScreen>
      </DCArtboard>
    </DCSection>
  );
}

window.RecordLayoutStudies = RecordLayoutStudies;
})();
