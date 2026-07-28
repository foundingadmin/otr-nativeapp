// case-chat-lab.jsx — BOARD for the case chat exploration (punch-list item E).
// Four sections: (1) surface approaches, (2) the decided toast+message
// adjacency pattern, (3) the unified case-action variant gallery, and (4) the
// persistent resolving-action surface (item G). Quantity over quality — many
// full-screen wires to react to.
/* __IIFE__ */ ;(function(){
const { DCSection, DCArtboard } = window;
const { ChatScreen, ActionEntry, Message, SystemChip, DayDivider, PinnedActionBar } = window;

const FIRM = 'Park & Vance';
const ID = 'OTR-48144';
const OFFER = { from:299, to:349, terms:'Adds a second appearance for the added reckless-driving count.' };

// a small caption block placed beside/under a screen inside its artboard
function Cap({ children }){
  return <p className="cc-cap" style={{ margin:'12px 2px 0' }}>{children}</p>;
}

// ── Section 1 · surface approaches ─────────────────────────────────────────
function ApproachA(){
  return (
    <ChatScreen firm={FIRM} caseId={ID} height={812}>
      <DayDivider>Mar 14</DayDivider>
      <ActionEntry kind="accepted" firm={FIRM} time="9:12 AM" />
      <Message side="firm" text="Hi, I'm Helen at Park & Vance. I've taken your case and I'll handle everything from here." time="9:13 AM" />
      <Message side="me" text="Thank you. Do I need to show up to court?" time="9:20 AM" />
      <Message side="firm" text="No, I appear for you. You don't attend unless I tell you otherwise." time="9:24 AM" firstOfGroup={false} />
      <DayDivider>Mar 18</DayDivider>
      <ActionEntry kind="counterSent" firm={FIRM} time="2:02 PM" offer={OFFER} />
      <Message side="firm" text="After reading the citation I adjusted the quote a little. The details are on the offer above, happy to explain." time="2:03 PM" />
    </ChatScreen>
  );
}
function ApproachB(){
  return (
    <ChatScreen firm={FIRM} caseId={ID} height={812}>
      <DayDivider>Fri, Mar 14</DayDivider>
      <ActionEntry kind="accepted" firm={FIRM} time="9:12 AM" compact />
      <Message side="firm" text="Hi, I'm Helen. I've got your case, we'll do this together." time="9:13 AM" />
      <DayDivider>Tue, Mar 18</DayDivider>
      <ActionEntry kind="counterSent" firm={FIRM} time="2:02 PM" offer={OFFER} compact />
      <ActionEntry kind="counterAccepted" firm={FIRM} time="4:41 PM" compact />
      <DayDivider>Wed, May 20</DayDivider>
      <ActionEntry kind="resolved" firm={FIRM} time="11:30 AM" attach="OTR-48144-Resolution.pdf" compact />
      <Message side="firm" text="Great news, the charge was dismissed. Nothing more you need to do." time="11:32 AM" />
    </ChatScreen>
  );
}
// ── ApproachC · adjacency clusters — RETIRED Jul 10, 2026 (user call). Kept
// in source for the decision trail; removed from the APPROACHES set below. The
// left-aligned toast axis (.cc-action) now ties toast + message across every
// approach, which subsumed the explicit cluster treatment.
function ApproachC(){
  return (
    <ChatScreen firm={FIRM} caseId={ID} height={812}>
      <DayDivider>Mar 14</DayDivider>
      <div className="cc-cluster">
        <ActionEntry kind="accepted" firm={FIRM} time="9:12 AM" />
        <Message side="firm" text="Hi, I'm Helen at Park & Vance, I've taken your case." time="9:13 AM" />
      </div>
      <Message side="me" text="Thanks so much!" time="9:20 AM" />
      <DayDivider>Mar 18</DayDivider>
      <div className="cc-cluster">
        <ActionEntry kind="counterSent" firm={FIRM} time="2:02 PM" offer={OFFER} />
        <Message side="firm" text="Adjusted the quote for the extra count, details above." time="2:03 PM" />
      </div>
    </ChatScreen>
  );
}
function ApproachD(){
  return (
    <ChatScreen firm={FIRM} caseId={ID} height={812}
      pinned={<PinnedActionBar tone="warning" icon="scale-balanced" title="Counter offer needs your response"
        sub="Expires in 2 days" cta="Review" />}>
      <DayDivider>Mar 18</DayDivider>
      <ActionEntry kind="counterSent" firm={FIRM} time="2:02 PM" offer={OFFER} />
      <Message side="firm" text="Adjusted the quote a little, details on the offer above. The button up top opens the full terms." time="2:03 PM" />
      <Message side="me" text="Got it, taking a look now." time="2:31 PM" />
    </ChatScreen>
  );
}
function ApproachE(){
  return (
    <ChatScreen firm={FIRM} caseId={ID} height={812}>
      <SystemChip kind="accepted" firm={FIRM} time="Mar 14" />
      <Message side="firm" text="Hi, I'm Helen at Park & Vance. I've got your case." time="9:13 AM" />
      <Message side="me" text="Do I need to go to court?" time="9:20 AM" />
      <Message side="firm" text="No, I appear for you." time="9:24 AM" firstOfGroup={false} />
      <SystemChip kind="counterSent" firm={FIRM} time="Mar 18" />
      <Message side="firm" text="I revised the quote to $349, tap the case tab to see the new terms." time="2:03 PM" />
      <SystemChip kind="counterAccepted" firm={FIRM} time="Mar 18" />
      <Message side="me" text="Accepted, let's go." time="4:41 PM" />
    </ChatScreen>
  );
}
// compact chips + a single pinned toast for the most actionable item (new)
function ApproachF(){
  return (
    <ChatScreen firm={FIRM} caseId={ID} height={812}
      pinned={<PinnedActionBar tone="warning" icon="scale-balanced" title="Counter offer needs your response"
        sub="Revised quote $349 · expires in 2 days" cta="Review" />}>
      <SystemChip kind="accepted" firm={FIRM} time="Mar 14" />
      <Message side="firm" text="Hi, I'm Helen at Park & Vance. I've got your case." time="9:13 AM" />
      <Message side="me" text="Do I need to go to court?" time="9:20 AM" />
      <Message side="firm" text="No, I appear for you." time="9:24 AM" firstOfGroup={false} />
      <SystemChip kind="counterSent" firm={FIRM} time="Mar 18" />
      <Message side="firm" text="I revised the quote to $349. The button up top has the full terms to accept or decline." time="2:03 PM" />
    </ChatScreen>
  );
}

const APPROACHES = [
  { id:'a', label:'A · Unified thread', V:ApproachA,
    note:'The baseline. Actions and messages share one chronological stream; action toasts left-aligned on the message axis, human replies as bubbles. Simplest mental model.' },
  { id:'b', label:'B · Log-led, day dividers', V:ApproachB,
    note:'Leans into the audit-log framing: prominent date dividers, compact action rows, messages secondary. Reads as a permanent record first, a chat second.' },
  { id:'c', label:'C · Split · pinned + log', V:ApproachD,
    note:'A persistent needs-you bar sits above a calm log (item G). The resolving CTA never lives in the historical row; the log stays a pure record.' },
  { id:'d', label:'D · Compact system chips', V:ApproachE,
    note:'Most chat-like: actions collapse to slim centered chips between messages; detail lives one tap away on the case tab. Lightest footprint, least record weight.' },
  { id:'e', label:'E · Compact chips + pinned toast', V:ApproachF,
    note:'The compact-chip thread kept light, with the single most actionable case action lifted to a persistent pinned toast at the top (item G). Lightest record weight with one clear place to act.' },
];

function ChatApproaches(){
  return (
    <DCSection id="cc-approaches" title="Case chat · surface approaches" eyebrow="Exploration"
      updated="Updated Wed Jul 8, 2026"
      subtitle="The case chat is an audit log that is also a chat: a permanent record of what happened, with conversation interleaved. Five full-screen takes on how the log and the conversation compose. Same case throughout (Glendale, Park & Vance).">
      {APPROACHES.map(a => (
        <DCArtboard key={a.id} id={a.id} label={a.label} width={390} height={936}>
          <div className="otr" style={{ padding:'0 0 0', background:'transparent', height:'100%' }}>
            <a.V />
            <Cap>{a.note}</Cap>
          </div>
        </DCArtboard>
      ))}
    </DCSection>
  );
}

// ── Section 2 · the decided display pattern ────────────────────────────────
function PatternAccepted(){
  return (
    <ChatScreen firm={FIRM} caseId={ID} height={560} composer={false}>
      <DayDivider>Mar 14</DayDivider>
      <ActionEntry kind="accepted" firm={FIRM} time="9:12 AM" />
      <Message side="firm" text="Hi, I'm Helen at Park & Vance. I've taken your case and I'll handle everything from here. You won't need to attend court, I appear on your behalf." time="9:12 AM" />
    </ChatScreen>
  );
}
function PatternCounter(){
  return (
    <ChatScreen firm={FIRM} caseId={ID} height={560} composer={false}>
      <DayDivider>Mar 18</DayDivider>
      <ActionEntry kind="counterSent" firm={FIRM} time="2:02 PM" offer={OFFER} />
      <Message side="firm" text="I revised the quote after reading the full citation, the change is on the offer above. Happy to walk you through it." time="2:02 PM" />
    </ChatScreen>
  );
}
function PatternClient(){
  return (
    <ChatScreen firm={FIRM} caseId={ID} height={560} composer={false}>
      <DayDivider>Mar 18</DayDivider>
      <Message side="me" text="That works for me, let's do it." time="4:40 PM" />
      <ActionEntry kind="counterAccepted" firm={FIRM} time="4:41 PM" note="You accepted the revised $349 quote." />
    </ChatScreen>
  );
}

// ── Section 2 (decided pattern) — RETIRED Jul 8, 2026 (user call). Kept in
// source for the decision trail; no longer rendered by CaseChatLab.
function ChatPattern(){
  return (
    <DCSection id="cc-pattern" title="The decided pattern · toast plus real message"
      subtitle="An action toast (Case accepted, Counter offer sent) renders as a system entry; the firm's required human message renders as a normal chat bubble directly beneath it, tied by adjacency (same sender, same time). The offer block stays attached to the toast; the message is itself, never wrapped inside it.">
      <DCArtboard id="p-accepted" label="Case accepted + the firm's message" width={390} height={628}>
        <div className="otr" style={{ height:'100%' }}><PatternAccepted />
          <Cap>Firm-performed. The toast states the fact; Helen's onboarding message reads as a normal bubble beneath, same sender and time.</Cap></div>
      </DCArtboard>
      <DCArtboard id="p-counter" label="Counter offer sent + offer + message" width={390} height={628}>
        <div className="otr" style={{ height:'100%' }}><PatternCounter />
          <Cap>The offer/detail block stays attached to the toast (it belongs to the action). The explanation is a separate human message.</Cap></div>
      </DCArtboard>
      <DCArtboard id="p-client" label="Client-performed · counter accepted" width={390} height={628}>
        <div className="otr" style={{ height:'100%' }}><PatternClient />
          <Cap>Some actions are client-performed. Actor label reads You; an optional note restates what was accepted. The message can precede the toast just as naturally.</Cap></div>
      </DCArtboard>
    </DCSection>
  );
}

// ── Section 3 · the unified case-action variant set ────────────────────────
const GALLERY = [
  { id:'g-accepted', label:'Case accepted', props:{ kind:'accepted', time:'9:12 AM' },
    note:'Firm-performed. Bare default, less-is-more.' },
  { id:'g-declined', label:'Case declined', props:{ kind:'declined', time:'10:04 AM', note:'The firm can\u2019t take this case right now. We\u2019re re-matching you with another local attorney.' },
    note:'Firm-performed, with an optional note explaining the next step.' },
  { id:'g-cancelled', label:'Case cancelled', props:{ kind:'cancelled', time:'3:20 PM', note:'Cancelled at your request. Your records stay available.' },
    note:'Actor varies (firm, you, or OTR). The note names who and why.' },
  { id:'g-counterSent', label:'Counter offer sent', props:{ kind:'counterSent', time:'2:02 PM', offer:OFFER, attach:'Revised engagement.pdf', note:'Full terms attached.' },
    note:'All options on: offer block, attachment, note. Resolving CTA is NOT here (item G).' },
  { id:'g-counterAccepted', label:'Counter offer accepted', props:{ kind:'counterAccepted', time:'4:41 PM' },
    note:'Client-performed. Actor label reads You.' },
  { id:'g-counterDeclined', label:'Counter offer declined', props:{ kind:'counterDeclined', time:'4:55 PM', note:'You declined the revised quote. The original terms still stand.' },
    note:'Client-performed, with a clarifying note.' },
  { id:'g-counterWithdrawn', label:'Counter offer withdrawn', props:{ kind:'counterWithdrawn', time:'5:10 PM' },
    note:'Firm-performed. Bare, neutral tone.' },
  { id:'g-resolved', label:'Case resolved', props:{ kind:'resolved', time:'11:30 AM', attach:'OTR-48144-Resolution.pdf' },
    note:'Firm-performed, with the outcome document attached.' },
  { id:'g-paymentFailed', label:'Payment failed · automated', props:{ kind:'paymentFailed', time:'6:00 AM', note:'Your card was declined for the $109 filing fee. Update your payment method to keep the case active.' },
    note:'System-performed. Actor label reads OTR · automated. Resolving CTA lives on a persistent bar, never here.' },
];

function ChatGallery(){
  return (
    <DCSection id="cc-gallery" title="One component · the case-action variant set"
      subtitle="Every case action is the same ActionEntry component, retoned per kind. Note, attachment, and actor label are per-action optional (show/hide). Built for future additions. Each shown on the chat surface it lives on.">
      {GALLERY.map(g => (
        <DCArtboard key={g.id} id={g.id} label={g.label} width={352} height={g.props.offer ? 330 : g.props.note ? 268 : 210}>
          <div className="otr" style={{ background:'#f6f7f9', height:'100%', padding:14, boxSizing:'border-box',
            display:'flex', flexDirection:'column' }}>
            <ActionEntry firm={FIRM} {...g.props} />
            <p className="cc-cap" style={{ margin:'auto 2px 0', paddingTop:12 }}>{g.note}</p>
          </div>
        </DCArtboard>
      ))}
      <DCArtboard id="g-optionality" label="Optionality · same action, three levels" width={352} height={470}>
        <div className="otr" style={{ background:'#f6f7f9', height:'100%', padding:14, boxSizing:'border-box',
          display:'flex', flexDirection:'column', gap:10 }}>
          <ActionEntry firm={FIRM} kind="declined" time="10:04 AM" showActor={false} />
          <ActionEntry firm={FIRM} kind="declined" time="10:04 AM" />
          <ActionEntry firm={FIRM} kind="declined" time="10:04 AM" note="We\u2019re re-matching you with another local attorney, no action needed." attach="Case notes.pdf" />
          <p className="cc-cap" style={{ margin:'auto 2px 0', paddingTop:8 }}>Same action, toggles stacked: bare, plus actor label, plus note and attachment. Devs ship all three switches; defaults lean bare.</p>
        </div>
      </DCArtboard>
    </DCSection>
  );
}

// ── Section 4 · persistent resolving-action surface (item G) ───────────────
function GCounter(){
  return (
    <ChatScreen firm={FIRM} caseId={ID} height={600}
      pinned={<PinnedActionBar tone="warning" icon="scale-balanced" title="Counter offer needs your response"
        sub="Revised quote $349 · expires in 2 days" cta="Review" />}>
      <DayDivider>Mar 18</DayDivider>
      <ActionEntry kind="counterSent" firm={FIRM} time="2:02 PM" offer={OFFER} />
      <Message side="firm" text="Details are on the offer above. Use the button at the top to accept or decline." time="2:03 PM" />
    </ChatScreen>
  );
}
function GPayment(){
  return (
    <ChatScreen firm={FIRM} caseId={ID} height={600}
      pinned={<PinnedActionBar tone="critical" icon="bill-dollar-2" title="A payment of $109 failed"
        sub="Pay to keep Helen on your case" cta="Pay now" />}>
      <DayDivider>Apr 02</DayDivider>
      <ActionEntry kind="paymentFailed" firm={FIRM} time="6:00 AM"
        note="Your card was declined for the $109 filing fee." />
      <Message side="firm" text="No worries, just update your card up top and I'll keep moving on the case." time="8:15 AM" />
    </ChatScreen>
  );
}

function ChatPersistent(){
  return (
    <DCSection id="cc-persistent" title="Persistent resolving surface · item G"
      subtitle="Timestamped log entries are permanent and never mutate, so no state-changing CTA can live inside a historical action row (resolving it would rewrite chat history). The resolving CTA lives on a persistent bar pinned above the log.">
      <DCArtboard id="g-pin-counter" label="Counter offer · resolve from the top" width={390} height={668}>
        <div className="otr" style={{ height:'100%' }}><GCounter />
          <Cap>The log entry is an inert record. The Review CTA lives on the pinned bar, so accepting never edits the historical Counter offer sent row.</Cap></div>
      </DCArtboard>
      <DCArtboard id="g-pin-payment" label="Failed payment · automated + pinned pay" width={390} height={668}>
        <div className="otr" style={{ height:'100%' }}><GPayment />
          <Cap>The automated Payment failed entry stays fixed forever. Pay now sits on the persistent bar; once paid, a new entry is appended rather than mutating this one.</Cap></div>
      </DCArtboard>
    </DCSection>
  );
}

function CaseChatLab(){
  return (
    <>
      <ChatApproaches />
      {/* ChatPattern retired Jul 8, 2026 (user call); kept in source for the trail */}
      <ChatGallery />
      <ChatPersistent />
    </>
  );
}
window.CaseChatLab = CaseChatLab;
})();
