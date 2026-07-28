# Case Details Page — PRD

## 1\. The job of the page

A traffic case is a low-frequency, high-anxiety, money-and-consequences event handled by people who do not speak legal. They open a case detail screen in one of three emotional postures:

- **"Did anything change?"** — a quick status check.  
- **"What do I do now?"** — they sense an action is required and want it to be unmissable and quick.  
- **"Tell me everything / reassure me"** — uncertainty about outcome, money, or process, often late at night.

So the page has four jobs, in priority order:

1. **Orient** — what's the state of my case, in one glance, in plain language.  
2. **Direct** — if I need to do something, make it the most prominent thing on the screen and make it one tap.  
3. **Reassure** — what's happening behind the scenes, who's handling it, and what happens next.  
4. **Disclose** — let me drill into the full record (violations, court, documents, payments, communication) without leaving or getting lost.

The current dashboard *card* already nails \#1 well. The detail page exists to reiterate \#1 cleanly, and own \#2, \#3, and \#4 — the things a case preview card is too small to hold.

## 2\. Primary insight from the audit

The card and the detail page are doing different jobs and should stop competing.

The dashboard card is a **status glance**: classification, light ticket/violation info for immediate recognition, attorney reassurance, case status, court date. It's excellent at "did anything change."

The detail page should be the **full case record \+ action surface**. Most of what's hard in this product lives here:

- the **attention/action system** (counter offer, Letter of Engagement signature, past-due payment, chargeback dispute) — currently expressed as banners,  
- the **absence states** (no attorney match yet, rematching, "Not provided," missing case data),  
- and the **string-length reality** of legal data (firm names, courthouse names, multi-count violations) — which your file has already isolated into a dedicated "Classification pill (truncate)" study, signalling it's a known pain to be solved for in this workflow now.

If the detail page only reproduces the card at a larger size, it adds nothing.

Its reason to exist is to add full rich context additions for everything below the card line.

## 3\. Information architecture

Proposed zone order, top to bottom. Zones are conditional — they appear/collapse based on state and data availability.

1. **Account-level alert rail** (conditional, sticky/top) — billing-critical, account-wide messages that aren't specific to this case but must not be missed (overdue payment, chargeback). See §6. Can be guided by the CPC card designs secondary toast action item.  
2. **Identity zone** — ticket photo, classification, attorney avatar \+ rating, firm name. The "who's on my side and what is this" block. Should establish user confidence and reassurance their case in good hands and on the move.  
3. **Status zone** — status badge \+ info affordance with a plain-language explanation of the state and what happens next.  
4. **Action zone** (conditional) — the one (or prioritized few) things the user needs to do now. See §6. Ensure this is in-addition to the account alert rail. They shouldn't yield exact duplicate signals. One or the other may be all that's needed. If not, make it clear why they both exist.  
5. **Case facts** — ticket issued (location \+ date), violations, attorney, court of record, court date. Utilize the ticket element design from the atomic system page. Ensure placement accounts for variations of all kinds within this element.  
6. **Expanded record** *(new, detail-page-only)* — full violation breakdown, complete court info \+ directions, case documents (LOE, offer terms, receipts), payment history, and a what-happened/what's-next timeline. This is the disclosure layer a card can't carry.  
7. **Help / escalation** — contextual support entry (live chat surfaced inline during disputes; always reachable otherwise). Minimal, but available if needed for users who aren't confident.

The card answers zones 2–5 in miniature. Zones 1, 4, 6, and 7 are where the detail page earns its keep.

## 4\. Content inventory

Every field, its empty behavior, and its length behavior. The empty and truncated columns are the real spec — the populated state is the easy 20%.

| Field | Example (populated) | When missing | Length / overflow behavior |
| :---- | :---- | :---- | :---- |
| Classification pill | Infraction \+ info icon → tooltip | Hide pill entirely (pre-classification) | Truncate with ellipsis; full label in tooltip. Already a known study — treat as solved-pattern, apply consistently. |
| Ticket photo | User's citation image, as card background | Neutral branded placeholder, never a broken image | Handle portrait vs landscape vs low-res; ensure overlaid text stays legible (scrim). |
| Attorney avatar | Photo headshot | Placeholder "scales-of-justice \+ ?" mark when unassigned/rematching | — |
| Attorney name | Aleksander Budakov (+ initials avatar) | Omit row when unassigned | — |
| Attorney rating | ★ 4.7 | Hide rating (new attorney, no reviews) — do not show "0.0" | — |
| Law firm name | Mowry Law Group | Hide when no firm assigned | Real names overflow (Mowry Law Group Mowry Law Gr… appears in file). Truncate \+ reveal full on the detail page. |
| Status badge | E.g. Active (+ info) | Always present (status is guaranteed) | Plain-language tooltip required for *every* status value. |
| Title line | Ticket issued in Morgan Hill – Aug 2024 | Falls back to Ticket issued on August 22, 2024 when location unknown | — |
| Violations | Speeding (16–25 mph over the li…) \+ 2 more | Violations: Not provided | Truncate long count text; \+N more expander; full list in expanded record. Define how many show inline. |
| Court of record | South County Morgan Hill Courth… , Morgan Hill, CA | Not provided | Courthouse names are long — truncate gracefully, full name \+ address/directions in expanded record. |
| Court date | January 12, 2025 | Not provided | Consider relative cue ("in 9 days") near the date for time-sensitivity. |
| Balance / amount due | $550 | Hide unless a balance exists | Always show currency \+ exact figure in payment actions. |
| Transaction history | Legal Fee: $250 | Surface current quote (if any) to complete the first transaction needed to move a case into active status. | — |

**Empty-state principle to decide on:** today, missing data reads as a flat Not provided. On a detail page, an unfilled field is an *opportunity*, not just an absence — e.g., "Court date: Not provided → Add your court date" when the user is the one who can supply it. Recommend turning passive nulls into completion prompts wherever the user is the data source. (Where *Off the Record* is the source — e.g., awaiting attorney assignment — keep it reassuring, not actionable.)

## 5\. State-conditional content & actions

How the page reshapes per lifecycle state. Status logic itself is out of scope; this maps *what surfaces*.

This list is a rough generalization. The latest source of truth that should steer this is located on the status handling page, demonstrating all status \+ action combinations we've locked in. Default to that page's system documentation for this need. If any major variance is present between our source of truth and the generalize list below, surface a diff for team review during sessions so a decision can be finalized.

| Lifecycle state | Identity zone | Action zone | Notable facts behavior |
| :---- | :---- | :---- | :---- |
| Not booked (photo only) | No avatar; overlay "Book now to be matched to a attorney" | Primary: Get instant quote / Book; promo nudge | Most fields Not provided; drive data completion \+ booking |
| Not booked (details provided) | No avatar | Book CTA | Violations/court populated, no firm/date yet |
| Pending review / waiting on attorney | Attorney avatar (proposed) \+ firm | None required; status tooltip explains "firm is reviewing, you'll get an update" | Full facts shown |
| Needs LOE signature | Avatar \+ firm | **Amber**: "Accept representation to proceed" — inline checkbox e-signature \+ link to the Letter of Engagement | Status Pending review |
| Counter offer received | Avatar \+ firm | **Amber**: "You received a counter offer" → Review counter offer | Status Active |
| LOE \+ counter offer both active | Avatar \+ firm | **Two concurrent actions** — stacking/priority required (see §6) | — |
| In progress | Avatar \+ rating \+ firm \+ attorney name | None | Full facts |
| Rematching (firm declined / none available) | Placeholder avatar; overlay "Initial law firm was unavailable. We're finding you a new law firm\!" | None; reassurance only | Attorney/firm rows omitted; violations may drop \+N more |
| Past-due payment | Avatar \+ firm | **Red**: "Your case is at risk of cancellation" \+ balance → Make a payment now | \+ account-level alert |
| Payment disputed / chargeback | Avatar \+ firm | **Red**: "Payment dispute on your case" → Start a live chat | \+ account-level alert; status Fees disputed |
| Resolved — dismissed | Avatar \+ firm \+ **Review your attorney** CTA | **Green** celebratory: "🎉 Your ticket was dismissed\!" | Full facts retained |
| Resolved — not dismissed | Avatar \+ firm \+ Review your attorney CTA | No celebration banner — neutral close | Full facts retained |
| Canceled (by client / admin / no firm) | Varies; likely placeholder | Define: re-book path? read-only archive? | Decide what stays actionable post-cancel |

## 6\. The attention & action system (the part to actually design)

This is the highest-leverage and least-solved area. Today actions appear as banners with an emerging visual grammar:

- **Amber / warning** \= your move, time matters, not yet dangerous (counter offer, LOE signature).  
- **Red / error** \= money or representation is at risk (past-due, chargeback, expiring soon).  
- **Green / success** \= positive terminal outcome (resolved, dismissed).

Three things need explicit rules:

**a) Severity hierarchy must be formalized.** Define the levels (success / informational / warning / critical), their color and weight, and the rule that critical always outranks warning in both position and visual prominence. A past-due red banner must never sit below an amber counter-offer banner.

**b) Concurrency / stacking.** Your "LOE \+ counter offer both active" exploration is the tell: multiple actions *can* be live at once. Decide:

- Do we stack banners, collapse them into a single "2 actions needed" checklist/progress hub, or show the top-priority one with a count for expansion?  
- What's the ordering rule (severity first, then deadline proximity, then sequence dependency — e.g., LOE may need to be signed *before* an offer can be accepted)?  
- Recommendation: a single prioritized **"Action needed" group** with a clear count, ordered by severity → deadline → dependency, so the page never becomes a wall of banners.

**c) Account-level vs case-level de-duplication.** Billing issues surface in *two* places — a global alert above the dashboard (with · · template vars and "View case details") \*and\* an in-case banner. On the detail page, define which one wins so the user isn't told the same thing twice in two visual languages. The account rail should summarize and link; the case banner should be the actionable, specifically detailed instance.

**Inline legal action (LOE) needs a real spec.** The LOE flow embeds an e-signature checkbox ("Checking this box constitutes an electronic signature") plus a link to the document. This is a legally binding action inside a content surface. Required: the document must be readable without leaving the page (sheet/modal), the checkbox must be disabled until the doc is opened (decide), and signature must capture an audit trail (timestamp, identity, likely IP — the desktop frames annotate "User data" near this flow). Treat this as a legal artifact, not UI microcopy.

## 7\. Edge cases the page must handle

Grouped by type. Each is a real branch the audit surfaced or implies.

**Data presence**

- Any single fact missing → Not provided vs completion-prompt (per §4 principle).  
- Entirely pre-classification → no pill.  
- No court date yet vs court date imminent (surface urgency).

**String length / truncation** *(your dedicated study confirms this is a priority)*

- Long classification pill.  
- Long / duplicated firm name (Mowry Law Group Mowry Law Gr…).  
- Long courthouse name \+ address.  
- Multi-count violations and long single-violation strings (+N more); define inline cap and where the full list lives.

**Attorney / firm absence**

- Not booked (no one assigned).  
- SmartMatch'd with quote ready for review to move case into active status.  
- Rematching after a decline (placeholder avatar, reassurance overlay, hidden attorney rows).  
- Assigned attorney with no rating yet.  
- Attorney already reviewed → the "Review your attorney" CTA must change or disappear (don't invite a duplicate review).

**Media**

- Missing, low-res, portrait, or landscape ticket photo → legible scrim, never a broken frame.

**Concurrency / conflict**

- Two+ live actions (LOE \+ counter offer).  
- A warning and a critical action simultaneously (counter offer \+ past-due).  
- Account-level and case-level alert for the same issue.

**Terminal & negative outcomes**

- Dismissed vs resolved-not-dismissed (celebration vs neutral close).  
- Canceled by client vs by admin vs no-firm-available — different messaging, and a decision on what remains actionable (re-book? archived read-only?).  
- Counter offer that expired or was already actioned → banner must resolve, not linger.

**System / error scenarios** *(your file carries explicit "⚠️ Error scenarios" frames)*

- Payment failure on submit, signature submission failure, network loss mid-action, stale data after backgrounding the app → define inline error \+ recovery for every action in the action zone.

**Notification linkage**

- Deep-link from a push ("your court date is in 3 days," "counter offer received") must land on the detail page with the relevant zone in focus.

## 8\. What still needs to be decided

Open questions to resolve before/within design:

1. **Disclosure model for zone 6** — accordions, tabs, or a single long scroll for full violations / court / documents / payments / timeline? (A scroll keeps anxious users oriented; tabs hide things they may not know to look for.)  
2. **Completion prompts vs neutral nulls** — confirm where the user is the data source and we should convert Not provided into an action.  
3. **Concurrency UX** — stack, collapse-to-hub, or top-priority-with-count (recommend hub).  
4. **Account vs case alert ownership** — which surface owns a given billing message.  
5. **LOE e-signature requirements** — gating, audit capture, document presentation.  
6. **Post-terminal behavior** — what a resolved/canceled case lets you still do (review, re-book, download outcome, dispute).  
7. **A documents/record home** — where the actual legal artifacts (signed LOE, offer terms, receipts, dismissal confirmation) live and download from. The card has never had room for these; the detail page is their natural home.  
8. **Communication/timeline** — does the detail page show a chronological "what's happened / what's next" log? For an anxious, infrequent user, this may be the single most reassuring element on the page and is currently absent.

## 9\. Attorney messaging (privileged channel)

### 9.0 Governing constraint — the confidentiality firewall

**One rule governs every decision in this section. Read it before anything below.**

**The app may know that a message *exists* and *which case it belongs to*. The app may never know what a message *says*. Existence and routing are allowed; content is sealed.**

**Ownership corollary.** The user is the **sole owner** of the channel and the **only** party who can move anything across the seal — and only by deliberate action. OTR never reaches in to extract; nothing is elevated out of the chat without the user's explicit choice (see §9.7.5, §9.7.7).

OTR has no ability — and must build no ability — to surface, read, index, summarize, or act on the contents of the user↔attorney conversation anywhere else in the product. This protects attorney–client privilege and confidentiality, and we are choosing to be **critically safe** here rather than convenient.

Everything that follows is downstream of that line. The firewall resolves most ambiguous calls on its own:

- Message **previews** in the feed or detail page → **no** (content).  
- Message **text in a push notification or lock screen** → **no** (content).  
- **AI / SmartMatch summarizing or "helping with" the thread, server-side or anywhere outside it** → **never** (content). Any *in-chat* assist must be front-end-only — see §9.9.  
- **Auto-populating a case field** because the attorney typed a court date in chat → **never** (content → app state).  
- A **timeline event** that says *"new message received"* → **allowed** (existence). The same event naming *what* the message was about → **not allowed** (content). See §9.6.

**The strategic reframe (push past the obvious):** most messaging UX sells itself on previews and immediacy. We can't — and shouldn't want to. What we're building is a **privileged, sealed line to a real lawyer**, and "sealed" is precisely what an anxious person with a legal problem wants to hear. **The constraint is the value proposition.** We market the seal, not apologize for it. This also extends the SmartMatch'd principle (§7.6 of the Cases Tab PRD) — elevate the attorney's presence through the lifecycle — to its natural apex: a direct, private channel to the human on your side.

### 9.1 The job, and why it's a deeper screen

The conversation is **privileged comms about this specific case**, so it lives **nested under the case detail page**, opened by a committed full-screen push navigation — not a bottom sheet. A privileged legal conversation should not feel ephemeral or dismissible; the navigation weight should match the gravity.

**Why not a global "Messages" inbox.** The tempting pattern is a top-level inbox. We should reject it *because of* the firewall, not despite it: an inbox is a list of threads, and a list wants previews and wants to aggregate content across cases and attorneys. Both fight the seal. Nesting one thread under one case keeps the boundary clean and the mental model honest — **one case, one attorney, one sealed room.**

**The cost, and the firewall-safe mitigation.** Multi-case users must navigate case → chat each time. We pay that. If it bites in testing, the only compromise that respects the firewall is a **content-free pointer** — a "you have unread messages" cue on the dashboard that *routes into* the right case's chat without ever previewing it. A pointer, not a peek. This reuses the existing **Active \+ unread-dot** primitive (Cases Tab PRD §6.0) rather than inventing a new surface.

### 9.2 Entry point

- **Anchored to the attorney, not to "chat."** The entry point lives in the **Identity zone** (§3, zone 2), tied to the attorney avatar and name — *"Message Aleksander,"* not *"Open chat"* or *"Support."* This does three jobs at once: it is the strongest trust/reassurance cue on the page (I have a direct line to my lawyer), it inherits the case's people-data so it **self-gates** correctly (no attorney → no entry point, §9.3), and it keeps the channel cleanly distinct from OTR support.  
- **Distinct from OTR support.** The dispute states already use **"Start a live chat"** — that is *OTR support* (billing, account, product help), a different channel with no privilege protection. The two must read as different things, visually and verbally, or users will route billing complaints to their lawyer and privileged legal questions to support. Recommendation: reserve the attorney avatar/name treatment for the privileged channel; give support a plainer, system-styled affordance in the Help/escalation zone (§3, zone 7).

| Channel | Who's on the other end | Privileged? | Entry surface |
| :---- | :---- | :---- | :---- |
| Attorney messaging | The matched attorney | **Yes — sealed** | Identity zone, on attorney avatar/name |
| OTR support ("Start a live chat") | OTR staff / support | No | Help/escalation zone; dispute banners |

### 9.3 State-gating (entry-point availability by lifecycle state)

The channel is not always present. The empty and blocked states are the interesting ones — defaulting to the safest, least-presumptuous read.

| Lifecycle state | Attorney channel | Entry treatment / messaging |
| :---- | :---- | :---- |
| Not booked (photo only / details) | **None** | No attorney exists — don't imply a direct line before there's a person. Support only. |
| Analyzing… / SmartMatch'd (pre-acceptance) | **None** | No channel pre-representation. Attorney-first: opens only once the attorney reaches out (§9.7.2). |
| Pending review (attorney revealed, not yet accepted) | **Pending (attorney-first)** | No user-initiated thread. Reads *"available once your attorney reaches out."* Opens on the attorney's first message (§9.7.2). |
| Active | **Open** | Full channel. Primary, reassuring state. |
| Active \+ unread | **Open** \+ unread dot | Existence-level cue only (§9.5); routes into the thread. |
| Rematching (declined / no firm) | **None** | No attorney attached — hide attorney rows and the channel. The prior attorney's thread enters **afterlife immediately** on reassignment (§9.7.4). |
| Past-due payment | **Open — never paused** | Billing never severs the lawyer line; handled in support/billing surfaces (§9.7.1). |
| Payment disputed / chargeback | **Open — never paused** | Dispute routes to *support*, not the attorney; channel stays open (§9.7.1). |
| Resolved / Dismissed\! | **Afterlife (timed)** | Goes inactive after a clearly signaled time limit; history retained, read-only, exportable (§9.7.3). |
| Canceled (client / admin / no firm) | **Afterlife** | Same afterlife treatment; history \+ export retained (§9.7.3). |

### 9.4 Inside the screen

- **Persistent confidentiality line.** A always-visible reassurance, e.g. *"Private between you and your attorney. Off the Record can't read this."* This is the trust judo done openly — the firewall stated as a feature.  
- **Response-time expectation setting.** Lawyers aren't instant, and to an anxious user silence reads as abandonment. Set an honest expectation (typical reply window, business-hours note) so a slow reply doesn't feel like being dropped.  
- **Scope statement.** A plain line on what this channel is *for* (your case, your attorney) vs. what support handles (billing, account, app) — keeps the sealed room clean and prevents misrouting.  
- **Composer.** Standard, calm, plain-language. **Attachments are allowed and sealed** like any message; a per-item *"Copy to my case file"* action lets the user consent to elevate one into the Documents section (§9.7.5). Note the channel is **attorney-first** — until the attorney opens it, the composer is not live (§9.7.2).  
- **Metadata affordances** (read receipts, typing indicators, unread count) are **shown in full inside the chat** — a normal, reassuring messaging experience in the sealed room — and **never render outside it** (§9.7.6).

### 9.5 Firewall-line decision A — unread indicators · **DECIDED**

**Decision (locked): show the unread count.** A dot or a count reveals *existence and volume*, not *content* — by the governing principle (§9.0) it stays on the allowed side of the firewall, so we surface it.

- Both the presence **dot** and the numeric **count** are approved.  
- Reuse and extend the existing **Active \+ unread-dot** primitive (Cases Tab PRD §6.0) to carry a count.  
- **Everything downstream inherits this** — the dashboard pointer (§9.1), detail-page unread surfacing, and badges may all show the count. Content stays sealed regardless of the volume shown; a count is "how many," never "what."

### 9.6 Firewall-line decision B — notification language · **DECIDED**

Notification copy is governed by **two splits**: *what kind* of notification it is, and *where* the user receives it.

**Two notification classes — keep them rigorously distinct.**

- **Message** \= a chat message **from the attorney**, specifically. This word is reserved; it may *only* ever refer to the privileged channel. If "message" can mean other things, the privilege-sensitivity logic breaks.  
- **Update** \= everything else: a **status change**, or any other high-level **app, account, or case** change. Not chat.

Maintaining this taxonomy lets a notification signal *which surface to go to* (chat vs. the case) without revealing content.

**Outside the app (native push / lock screen) — maximally scrubbed, brand-led, case-blind, content-blind.** This is the least-controlled environment (lock screens, notification mirrors, paired watches), so it gets the strictest treatment.

- ✅ *"You have a new message."* (existence — attorney chat)  
- ✅ *"You have a new update."* (existence — a non-chat change)  
- **Attribution is the brand, not the case.** Native push carries the **OTR logo**; copy may lean on the brand name only — e.g. *"…from Off the Record."* Outside the app we hinge on brand identity and reveal **no case name and no content**.  
- **Scrub update language for privilege too.** Even an *"update"* push must not leak privileged context in its wording — the safe-language rule applies to both classes, not just messages.

**Inside the app (authenticated, on-device) — brand recedes, case context is allowed.** Once the user is authenticated inside the app, we can drop the brand framing and hinge on **case-level context** for clarity:

- ✅ *"New message about your Morgan Hill case…"* (case metadata is acceptable inside the authenticated surface)  
- Still **no message body / content**, ever. Naming the case is allowed inside the app; quoting the chat is not.

**Hard floor for both environments:**

- ❌ Any fragment of the message body, anywhere. Default to **suppressing message text on the lock screen**, and consider **screenshot handling** in-thread for maximum protection.

Tie-in: deep-linking from any of these must land **inside the correct case's chat** (§9.1 pointer behavior) without rendering a preview en route.

### 9.7 Decisions & remaining open items

Most of these are now **decided** — several set exactly where the firewall line sits. A unifying principle fell out of them and now governs the rest (elevated to the §9.0 corollary): **the user is the sole owner of the privileged channel, and the only party who can elevate anything out of it, by explicit action.**

1. **Service-paused availability — DECIDED: there is no pause.** Past-due or dispute **never** severs the attorney channel. A billing problem is handled in *support* and billing surfaces; it does not cut the client's line to their lawyer. (Reflected in §9.3: those rows stay **open**.)  
     
2. **Pre-acceptance availability — DECIDED: no; attorney-first initiation.** The user cannot open a thread before representation is real. **The attorney initiates** the channel; until they do, the entry point reads as pending (*"available once your attorney reaches out"*), not a live composer. Once opened, the user messages normally. (Reflected in §9.3 pre-acceptance and Pending rows, and §9.4 composer.)  
     
3. **Channel afterlife — DECIDED (one safeguard still open).** On Resolved / Dismissed / Canceled:  
     
   - The live channel **goes inactive after a clearly signaled time limit** — the user sees *when* it closes, and after it, no new messages pass between user and attorney.  
   - **Full history is always available** to revisit, anytime; the UI shifts to an **inactive treatment** (muted coloring). **Export is available anytime.** Records persist; nothing silently disappears.  
   - **OPEN — reactivation safeguard.** We may let the user *reactivate* a closed chat, but only behind a safeguard still to be defined. The guardrail problem: a user must not be able to reopen and message an attorney years after a case closed with zero friction. Define the gate (re-confirmation, attorney opt-in, an eligibility window, or routing a genuinely new matter to a fresh match) before enabling reactivation.

   

4. **Thread on reassignment — DECIDED: immediate afterlife, no countdown.** When a case is rematched (Remarketing) to a new attorney, the old thread enters afterlife **immediately** — frozen the moment the new attorney comes on, with **no time-limit grace window**. History stays read-only and exportable. It never carries over: a different attorney is a different privilege holder, and the new attorney opens a new channel (attorney-first, §9.7.2).  
     
5. **Attachments — DECIDED: yes, with consent-based elevation.**  
     
   - Attachments are allowed in-channel and are **sealed** like any message — OTR can't inspect them.  
   - **Source determines status.** A document uploaded through any *non*\-privileged UI is an **OTR document** (slightly looser handling; lives in the Documents section). A document shared *inside* the privileged chat stays **privileged** by default.  
   - **Consent micro-action.** Inside the chat, offer a per-item *"Copy to my case file."* If the user chooses it, that copy becomes an OTR document **because the user agreed to elevate it** — and only then. The original stays sealed. This is the firewall's elevation mechanism made concrete, and the template for item 7\.

   

6. **Metadata line — DECIDED: full inside, nothing outside.** Read receipts, typing indicators, and unread count are all **shown within the privileged chat screen** (a normal, reassuring messaging experience in the sealed room). **None of it ever renders outside** the chat — consistent with §9.5 (count) and §9.6 (notification language).  
     
7. **Retention, privilege & legal ownership — DECIDED in principle; legal input still required.**  
     
   - **Design default:** privileged chat activity **stays in the privileged chat** unless the user takes a clear, explicit action to elevate a specific item out (per item 5's pattern). **The user owns this channel — forever.** What elevates or leaves it is the user's choice, and no one else's.  
   - **OPEN — counsel must confirm:** retention duration, discovery / subpoena / legal-hold handling, and how user-export interacts with any retention obligation. This is a legal determination, not a design default — build to the user-ownership default and let legal constrain it only where the law requires.

### 9.8 Connection back to the detail page (the most likely leak vector)

The **what-happened / what's-next timeline** recommended for the detail page (§8, open decision 8\) **must be fed by system events only — never by the chat.** A timeline naturally *wants* to narrate ("your attorney messaged you about your court date"), and that is exactly where this firewall gets violated by accident. The timeline may say **"New message received"** (existence) and route into the sealed thread; it may **never** say what the message was about (content). Treat this as a hard build constraint, called out at implementation, not a guideline.

### 9.9 Non-goals

- The **attorney-side** messaging experience — a separate future app/surface sprint, not this one.  
    
- Any **AI, summarization, search, or moderation that surfaces thread contents *outside* the privileged chat** — forbidden by §9.0, listed here so it is never quietly reintroduced elsewhere in the product as a "helpful" feature.  
    
  - **Inside** the privileged chat, a front-end-only assist *may* be viable — worth confirming, not assuming. The deciding test is singular: **does the feature require the server to read message content?**  
    - **Front-end-only / on-device → potentially safe.** Processing and rendering happen on the user's device; no OTR server ever indexes or analyzes the content; the seal holds. **In-chat search is the clean example** — a local search over locally-held messages, rendering results in the chat UI only. Most likely a safe internal feature.  
    - **Server-side analysis → almost certainly a non-starter.** Most summarization / AI inference needs the content to reach a server or model, which *is* the firewall violation. Only revisit if it can run fully on-device.  
    - **Watch the plumbing, not just the feature.** Even a client-side feature leaks if content rides out in crash logs, analytics SDKs, telemetry, or screen-capture. The seal breaks at the side channel as easily as the front door — audit those explicitly before shipping any in-chat assist.


- **Group / multi-party threads in the privileged channel — permanent, absolute non-starter.** The channel is strictly **one user ↔ one matched attorney**, always. Never entertain a variation; privilege does not survive added parties.  
    
  - This prohibition is about the *privileged* channel **only**. Two *separate, non-privileged* communication surfaces are legitimate future work — explicitly **not** forbidden — provided they live outside the seal and never share it:  
    - **User ↔ user (social layer).** Commenting on the activity feed (think Venmo) or direct user-to-user messaging. A community surface, entirely outside privilege. Future scope.  
    - **User ↔ OTR support.** Its own UX, to be standardized — and notably *able* to be multi-party in a way the attorney channel never can: support may pull additional reps in and out of a session. Non-privileged, and distinct from both the attorney channel and the social layer.  
  - **The governing principle across all three:** they are different rooms and must always *feel* like different rooms. The privileged seal must never be blurred by sharing visual language, infrastructure, or entry points with a non-privileged channel — the user must always know which room they're standing in.

## 10\. Out of scope (confirmed)

- Status state-machine and status-badge logic — already solved by Case Cards & Feed PRD; consumed here as input.  
- The dashboard/list view — already solved Case Cards & Feed PRD; consumed here as input for reference only where the page links naturally out to it if/when needed.  
- The booking funnel workflow — already solved in 2025 workflows; consumed here as input for reference only where the detail page links naturally out to it if/when needed.