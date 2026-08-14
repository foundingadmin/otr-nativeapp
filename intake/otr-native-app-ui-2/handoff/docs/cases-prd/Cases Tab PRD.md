# Off The Record — Cases Tab PRD

**Product:** Off The Record (OTR) — native B2C mobile app for fighting traffic tickets **Surface:** Cases tab (feed of Case Preview Cards) \+ Case detail page **Version:** 1.4 **Date:** June 23, 2026 **Owner:** Founding Creative **Status:** Draft for review **Source of truth:** This workflow is authoritative for case status language. Decisions here flow **downstream** to the homescreen and other surfaces — earlier homescreen status vocabulary is not elevated here. **Inputs reconciled:** *Case Status Badge* board, Series 1–3 (reviewed Jun 16, 2026\) \+ feedback; *SmartMatch'd* pattern (approved Jun 23, 2026); Streamline *Flex Solid* icon set; preliminary LOE legal research (§7.7).

---

## Changelog

- **v1.4 — Jun 23, 2026** — (1) Added **§7.7 Letter of Engagement (LOE)** — a conditional, state-gated micro-step that fires *after* quote acceptance, with preliminary research showing mandatory LOE is a **low-% scenario** for traffic matters; defined the friction-minimizing UX stance and the re-sign-on-reassignment edge. (2) Codified **badge weight \+ form** as a governing DS rule (light vs. solid fill; straight vs. titled) and made it the basis for feed triage (§6.1). (3) Removed **Settled** from the language — **Resolved** is the macro; **Dismissed** overrides on a favorable outcome. (4) Dropped **hard-stop** as a concept (it's *Active \+ a required action*, surfaced via the needs-attention badge, not a status). (5) **Blocked** parked as backup-only. (6) **De-elevated the homescreen** as a source; demoted "Pending review" out of the customer-facing badge set.  
- **v1.3 — Jun 23, 2026** — Icon library, corrected color logic, SmartMatch'd sub-logo, §8 reframed as the CPC exploration framework.  
- **v1.2 — Jun 23, 2026** — Reconciled against the approved badge board; surfaced unbadged lifecycle states.  
- **v1.1 / v1.0 — Jun 23, 2026** — Interim naming reconciliation; initial draft.

---

## 1\. Overview

The **Cases tab** is the user's home base — where they return to track every ticket they've handed to OTR. Its job is to answer, at a glance, for every case: **where does this stand?** and **do I need to do anything?** — across an emotionally loaded, largely *passive* journey where the user mostly waits, anxious and out of the app.

Two views:

- **The feed** — a scrollable list of **Case Preview Cards (CPCs)**, one per case (§8).  
- **The detail page** — the full record for a single case, opened by tapping a CPC.

---

## 2\. Problem & rationale

The current card collapses four jobs by proximity, not priority: **Evidence**, **Marketplace identity**, **Status & interrupts**, **Case record**. The result: signal collisions (dismissed-green over overdue-red over a review prompt), silent truncation, and a duplicated-firm-name bind. The redesign introduces a **design-approved badge system** (§6), shared **precedence rules** (§7), and a **CPC exploration framework** (§8).

---

## 3\. Goals & non-goals

**Goals:** at-a-glance legibility; one canonical, customer-facing badge set; signal precedence (money \> legal gate \> info, one action per card); calm edge-path handling; **frictionless handling of conditional legal steps (LOE)**; a clear CPC must-stay spine with explicit room to vary.

**Non-goals:** booking / instant-quote purchase flow; attorney-side app; payment processing internals; the visual token spec (this PRD references *style logic*, not hex values).

---

## 4\. Users & jobs-to-be-done

Primary user: a person with one or more traffic tickets — non-expert, mobile-first, anxious, sporadic check-ins.

| Series / phase | The user is silently asking… |
| :---- | :---- |
| Unfinished (Series 1\) | "Should I do something with this ticket I uploaded?" |
| Quote proposal (Series 2\) | "Did they match me? Is my quote still good? Do I agree with the price? Do I accept or deny?" |
| Active management (Series 3\) | "Is this being handled? How long will this take? Did I win? Do I owe anything?" |

Success \= the user answers their current question in **under five seconds** from the feed.

---

## 5\. Information architecture

```
Cases tab
└── Feed (list of Case Preview Cards — sorted by priority, §11.4)
    └── CPC  ──tap──▶  Case detail page (full record)
```

The **CPC** is a strict subset of the detail page. Field tags: **▸ CPC-tier** · **◦ Detail-only**.

---

## 6\. Case status badge system (canonical)

### 6.0 Status badge registry (approved board \+ feedback)

Single source of truth for **customer-facing status badges**. **Naming principle:** one word, immediate understanding. Every badge pairs **icon \+ color \+ weight** (§6.1, §7.5).

#### Series 1 — Unfinished business · *dotted outline \= "I'm still unfinished," a gentle nudge*

| Badge | Decision | Meaning |
| :---- | :---- | :---- |
| **Incomplete** | ✅ Approved | Fragment booking lacking minimum info to trigger a SmartMatch. |
| **Deadline** | ✅ Approved | Court date provided but info still incomplete. Shows **XX days to court date** (solid red urgency). |

#### Series 2 — Quote proposal · *full-color \= "me first\!", maximum attention*

| Badge | Decision | Meaning |
| :---- | :---- | :---- |
| **Analyzing…** | ✅ Approved | Loading state for an extended delay between booking submission and a SmartMatch result. |
| **SmartMatch'd** | ✅ Approved | Matched to best-fit attorney; user must **accept or deny the legal fee quote** before it expires. (Gradient \+ checkmark sub-logo, §7.6.) |
| **Almost gone** | ✅ Approved | Quote expires within \~5 min (orange). Accept or deny now. |
| **Expired** | ✅ Approved | Quote lapsed (red). Reinitiate SmartMatch for a new quote. |

#### Series 3 — Active case management · *solid muted \= reassuring milestones*

| Badge | Decision | Meaning |
| :---- | :---- | :---- |
| **Active** | ✅ Approved | Quote accepted; matched attorney working. Default. A required action (e.g. LOE, payment) is surfaced via the **titled / needs-attention** form (§6.1), not a new status. |
| **Active** \+ unread dot | ✅ Approved | Active case with ≥1 unread notification (red-dot accent). |
| **Resolved** | ✅ Approved | The **macro** conclusion state — used whenever a case ends. |
| **Dismissed\!** | ✅ Approved | **Overrides Resolved** on a favorable outcome — the win. Confetti. |
| ~~Settled~~ | 🗑 Removed | Removed from the language. Conclusions are **Resolved** (macro), or **Dismissed** when favorable. |
| ~~Won~~ | ⤵ Retired | Renamed **Dismissed**. |
| ~~Blocked~~ | 🅿️ Parked (backup) | No clear fit today (per CEO). Retained as a backup edge case only; **not in active use**. |
| ~~Archived~~ | ⏸ Parked | No confirmed use case (§15). |

**Resolved / Dismissed rule:** **Resolved** is the single macro state for any conclusion. **Dismissed** overrides it when the outcome is favorable (the win). There is no "Settled."

---

### 6.1 Badge style, form, weight & icon system

Meaning lives in badge *form and weight*, not just the label. **Retain and strengthen all of it.**

**Fill weight \= attention demand:**

- **Light / tinted fill** → ambient, steady, low cognitive load (no action or low urgency): **Incomplete, Analyzing…, Active, Resolved, Archived**.  
- **Solid fill** → elevated attention or a peak moment (act now / brand peak / celebration): **Deadline, SmartMatch'd, Almost gone, Expired, Dismissed\!**.

**Form \= default vs. needs-attention:**

- **Straight badge** \= default state.  
- **Titled badge** \= needs attention — the form OTR uses to flag "this case wants you."

**Why it matters (the triage payoff):** in a feed of mostly light badges, a solid or titled badge **pops** — the system gives the user built-in visual triage; the eye lands on what needs action before a word is read. This is also the mechanism that surfaces a **required action on an otherwise-steady Active case** — which is precisely why no separate "hard-stop" or "Blocked" status is needed.

**Other form rules:** dotted outline (Series 1\) \= unfinished; **Active \+ red dot** \= unread notification; **confetti** \= the Dismissed win only; **blue→purple gradient** \= SmartMatch'd only (§7.6).

**Iconography — Streamline *Flex Solid*, the *folder \+ icon* set** (`streamlinehq.com/icons/flex-solid-style`). Deliberately chosen for status-badge support: the folder-plus-glyph reads as "a case file in a given state" and unifies the set. **Retain.** One intentional exception: the SmartMatch'd checkmark is elevated to a branded sub-logo (§7.6). The **Core badge** component (incl. a gear/config variant) is the base all badges inherit.

---

### 6.2 Lifecycle-to-badge mapping & gaps

The board covers the **data → SmartMatch → active → resolved spine**. Remaining branch states and how they're handled:

| Operational / lifecycle state | Customer badge | Status |
| :---- | :---- | :---- |
| Booking incomplete (photo / partial) | **Incomplete** | ✅ Covered |
| Incomplete \+ court date known | **Deadline** | ✅ Covered |
| Matching (extended delay) | **Analyzing…** | ✅ Covered |
| Matched, quote awaiting user | **SmartMatch'd** | ✅ Covered |
| Quote expiring / expired | **Almost gone** / **Expired** | ✅ Covered |
| Representation active | **Active** (+dot for unread; titled when action needed) | ✅ Covered |
| Resolved (any conclusion) | **Resolved** | ✅ Covered |
| Resolved, favorable (the win) | **Dismissed\!** (overrides) | ✅ Covered |
| **LOE signature** (state-gated) | — (required action on Active) | ✅ Handled as a conditional micro-step (§7.7), not a status |
| Required action / "hard-stop" | — | ✅ *Active \+ titled/needs-attention* form (§6.1) — **not a separate status** |
| **Counter offer** | — | ⚠️ **No badge.** Real branch; needs a decision (§15). |
| **Remarketing** (declined, re-matching) | — | ⚠️ **No badge.** Closest analog: Analyzing… (§15). |
| **Cancelled** (no firm / client / post-LOE) | — | ⚠️ **No badge.** Terminal/branch path; needs a decision (§15). |
| Attorney finalizing after user accepts | — | ◦ Transitional moment; reads as the brief gap between SmartMatch'd and Active, or routes to **Remarketing** on decline. Likely no dedicated badge. |
| Review submitted | retains Resolved / Dismissed | ◦ Minor; terminal sub-state. |

**Overlays** (ride on any card): **Payment due / overdue** (red, "Make a payment"), **Classification** (Infraction → Wobbler → Misdemeanor, top-left).

---

### 6.3 Decision logic

```
Incomplete / Deadline ──submit──▶ Analyzing… ──▶ SmartMatch'd ──┐
                                                  │ (quote timer)│
                                       Almost gone ┘             │
                                       Expired ──reinitiate──▶ Analyzing…
SmartMatch'd ──accept quote──▶ attorney revealed ──▶ [LOE if state-required, §7.7] ──▶ Active
Active ──outcome──▶  Dismissed!  (favorable, overrides)   |   Resolved (any other conclusion)
cancelled after LOE ──seek new attorney──▶ re-match ──▶ [new LOE if required] ──▶ Active
```

---

## 7\. Cross-cutting systems

### 7.1 Status badge (source of truth)

One badge per card. For conclusions the badge names the outcome — **Dismissed\!** (the win) or **Resolved** (everything else) — not a generic badge plus a separate banner. The badge *is* the result; confetti elaborates the win.

### 7.2 Signal precedence

**1\. Money owed (overdue) → 2\. Legal gate / required decision (quote, LOE, counter offer) → 3\. Outcome / celebration → 4\. Informational**

**Exactly one primary action per card.** Hard case — **Dismissed\!** with an unpaid balance — resolves as: balance is primary; the win is subordinate until paid.

### 7.3 Overlays

- **Payment:** "Due" soft; "Overdue" loud (red), outranks all but a blocking gate.  
- **Classification:** always-on context, never an action.  
- **Required actions on Active cases** surface via the **titled / solid needs-attention** badge (§6.1) — not a status downgrade.

### 7.4 Emotional-arc mapping (by Series)

| Series | Register | UX must deliver |
| :---- | :---- | :---- |
| 1 — Unfinished | Inertia / mild dread | Low-friction nudge; Deadline adds honest time pressure |
| 2 — Quote proposal | Urgency / "me first" | Attention \+ a clear accept/deny before the clock runs |
| 3 — Active | Reassurance | Quiet confidence; nothing required (unless titled) |
| 3 — Resolved | Recovery | Honest result \+ a path to value (review) |
| 3 — Dismissed\! | Relief / delight | Earned celebration (confetti) |

### 7.5 Color logic

Each badge pairs a **Streamline Flex Solid icon** \+ color \+ **weight** (§6.1); never color-only.

- **Gray / neutral (light)** → passive or processing: **Incomplete, Analyzing…** (loading), **Archived**. *Analyzing… stays muted — never the reserved gradient; the gradient is the SmartMatch'd payoff.*  
- **Red** → time-critical / lapse / money: **Deadline, Expired**, overdue-payment overlay.  
- **Orange / amber** → imminent action window: **Almost gone**.  
- **Blue → purple gradient** → **SmartMatch'd only** (§7.6).  
- **Blue** → steady engagement: **Active** (light); **red dot** \= unread.  
- **Green** → positive outcome: **Resolved** (light, macro) and **Dismissed\!** (solid, the win).

**The color \+ weight tells the arc:** muted (Series 1 / Analyzing) → urgent solid (Series 2\) → reassuring light blue (Active) → green ending, solid on the win.

### 7.6 SmartMatch'd pattern & sub-brand

Gradient reserved for SmartMatch'd. The matching moment runs **Analyzing… → SmartMatch'd → Almost gone / Expired**. The SmartMatch'd card shows a **blurred** attorney (real, local; not AI) \+ ⭐ rating \+ quote; on **acceptance** the attorney is **revealed**, the fee leaves the hierarchy, and the case proceeds (via LOE where required, §7.7) to **Active**.

**Sub-logo decision:** the SmartMatch'd **checkmark is elevated from a glyph to a branded sub-logo.** Gradient \+ checkmark \= the **SmartMatch'd lockup**, a protected sub-brand asset and the one intentional exception to the Flex Solid icon set. The attorney-elevation pattern repeats then de-emphasizes across the lifecycle; the sub-logo may likewise minimize as SmartMatch becomes less central.

### 7.7 Letter of Engagement (LOE) — conditional, state-gated micro-step

**When it fires:** the LOE is **not** a booking step. It occurs only **after** the customer accepts a SmartMatch'd quote and the matched attorney is revealed. The customer signs to formalize representation, then the case moves to **Active**.

**It's conditional, not universal.** A signed LOE is legally mandated only in some states, often only above a fee threshold. For OTR's flat-fee, low-dollar traffic matters, this is a **low-prevalence requirement** (research below).

**The friction edge (the concern):** if the case is cancelled after the customer has signed the LOE — by the **attorney, the customer, or OTR** — and the customer seeks a new attorney, a **new LOE** is required (in applicable states). Two rare events compound (state-requires-LOE × case-reassigned), so the edge is uncommon — but it's a real frictional cliff when it hits.

**Preliminary research** *(non-legal-advice; OTR to confirm against its actual attorney-network requirements):*

- Most states follow ABA Model Rule 1.5(b): the fee basis should be communicated, **preferably in writing** — encouraged, not mandated, for ordinary non-contingency work.  
- The two largest markets gate by **dollar amount**, and traffic flat fees usually fall *under* it: **California** requires a written agreement only when foreseeable total expense exceeds **$1,000** (B\&P 6148); **New York** requires a letter of engagement only at **$3,000+** (22 NYCRR Part 1215, with exemptions). Traffic fees typically trigger neither.  
- A **small number** of states require a written engagement for *every* representation regardless of amount — most clearly **Massachusetts**; **Connecticut** (terms in writing); **D.C.** (for clients not regularly represented).  
- **Read:** mandatory LOE for OTR's traffic use case is a **minority-of-states, low-percentage** scenario; the re-sign-on-reassignment edge is rarer still.

**Strategic UX stance:**

- **Gate it, don't globalize it.** Trigger the LOE only where the customer's state (and fee) require it; skip it everywhere else.  
- **Never a blocking status badge.** Surface the LOE as a **required action** on the post-acceptance / Active card via the titled/needs-attention treatment (§6.1).  
- **One-tap e-sign.** Keep the current weight ("checking this box constitutes an electronic signature").  
- **Re-sign \= re-confirm, not restart.** On reassignment, present the new LOE as a one-tap re-confirmation that highlights only the delta (new attorney) — never a fresh start.  
- **Pre-empt.** Where the state is known to require it, prepare the LOE so it's ready the instant the quote is accepted, collapsing the gap.

---

## 8\. The Case Preview Card (CPC) — exploration framework

**A working exploration brief, not a fixed layout.** The CPC is OTR's analog to an e-commerce **Product Display Card (PDC)**: a scannable feed unit that communicates *identity, state, urgency, and a path to action* fast enough to drive a decision without opening detail. The current workflow is to **remix this card at volume — quantity over quality — to learn what *feels* right to cut and what must stay.**

### 8.1 The CPC's job (the PDC parallel)

| PDC job | CPC equivalent |
| :---- | :---- |
| Which product is this? | **Which case is this?** (identity) |
| Is it desirable / available? | **Where does it stand?** (status badge) |
| Price / urgency / scarcity | **Do I need to act, and by when?** (primary action, deadlines, quote timer) |
| Trust to buy | **Is a real attorney on it?** (representation, when relevant) |

### 8.2 Field tiering — what stays, what's negotiable

**🔒 Anchor — 100% must stay on every CPC.** The card fails without these.

- ▸ **Status badge** (with correct form \+ weight, §6.1) — the reason the card exists.  
- ▸ **Case identity** — enough to know *which* case: title `Ticket issued in {city} – {mon yyyy}` and/or a strong visual anchor (ticket thumbnail).  
- ▸ **Primary action** — when the state has one. One only (§7.2).

**🔁 Conditional — surfaces only when the state needs it.**

- ▸ Attorney identity (avatar / ⭐ / firm) — critical at SmartMatch'd & Active; near-irrelevant at Incomplete.  
- ▸ Quote \+ countdown (Series 2\) · court date (Deadline / near hearings) · outcome detail / confetti (Series 3\) · balance / overdue · unread dot · **LOE required-action** (state-gated, §7.7).

**✂️ Candidate-to-cut — present today; interrogate hard.** Default toward detail-only unless a variation proves it earns feed space.

- Case ID · Classification badge · Violation list \+ "N more" · Court of record (vs. just court date) · Defendant name · Full firm name.

### 8.3 Variation axes — what parallel sessions remix

Hold the Anchor tier fixed; remix along: **1\.** identity anchor (photo / title / badge-led) · **2\.** density (minimal → rich) · **3\.** zone count (2 / 3 / 4 / zoneless) · **4\.** reading order (status / identity / action-first) · **5\.** attorney presence (prominent / minimal / absent) · **6\.** status manifestation (badge-only / badge \+ progress / color-field) · **7\.** action treatment (inline / full-width CTA / tap-card).

### 8.4 The starting hypothesis (one option, not the answer)

A four-zone baseline — **A** Status & action · **B** Identity & evidence · **C** Key record · **D** Outcome/overlay — ranked by §7.2. Remix *against* it; the goal is the **minimal CPC that still lets a user orient in \<5s**, and to learn which Conditional/Candidate fields a real feed actually misses when gone.

### 8.5 How to judge a variation

Identify case \+ status in \<5s across a 6+ card scroll · the one action is obvious and *right* (§7.2) · nothing reads as noise you'd cut · holds across all Series, not just the happy path.

---

## 9\. Per-state CPC specifications

| State | Status badge (form / weight) | Primary action | CPC surfaces | Module |
| :---- | :---- | :---- | :---- | :---- |
| Incomplete | **Incomplete** (light, dotted) | Finish & get matched | Photo, "Not provided" fields | Completeness meter |
| Deadline | **Deadline** (solid red, dotted) | Finish before court date | Photo, partial record, court date | XX-days countdown |
| Analyzing… | **Analyzing…** (light/loading) | *(none — processing)* | Record | Neutral loading (not gradient) |
| SmartMatch'd | **SmartMatch'd** (solid gradient) | Accept or deny quote | Quote, blurred attorney \+ ⭐ | Gradient \+ checkmark sub-logo |
| Almost gone | **Almost gone** (solid orange) | Accept or deny (now) | Quote, attorney | \~5-min urgency |
| Expired | **Expired** (solid red) | Reinitiate SmartMatch | Record | Re-match CTA |
| Active | **Active** (light blue) | *(none — reassurance)* | Attorney (revealed), court date | Quiet progress |
| Active — needs action (e.g. LOE) | **Active** (titled / solid) | The required action | Attorney, the action | Needs-attention form (§6.1) |
| Active \+ unread | **Active** \+ red dot | View update | Attorney, latest notification | Unread accent |
| Resolved | **Resolved** (light green) | Review your attorney | Attorney, outcome detail | Outcome summary |
| Dismissed\! | **Dismissed\!** (solid green) | Review attorney (secondary) | Attorney, outcome | Confetti (the win) |
| *Active/resolved \+ OVERDUE* | *(badge unchanged)* | **Make a payment now** | Balance | Red overdue alert (outranks all but a gate) |
| **Gap states** (Counter offer, Remarketing, Cancelled) | ⚠️ TBD | per state | per state | **No approved badge — §6.2 / §15** |

---

## 10\. Case detail page — full data model

**▸** \= also on the CPC; **◦** \= detail-only.

- **10.1 Identity & classification:** ▸ Case ID (◦ copy) · ▸ Classification badge \+ tooltip · ▸ Title `Ticket issued in {city} – {mon yyyy}` · ◦ citation no., issuing agency, jurisdiction / `<state>`.  
- **10.2 Status & next action:** ▸ Status badge (Dismissed\! / Resolved on conclusion) · ▸ primary action (§7.2) · ◦ secondary actions; status timeline; last-updated \+ "next expected update."  
- **10.3 Representation:** ▸ Firm name *(fix duplicate-bind, §14)* · ▸ attorney \+ avatar \+ ⭐ (blurred pre-acceptance) · ◦ **LOE (link, read/sign state, e-sig record \+ timestamp; re-sign history, §7.7)**; counter-offer terms; SmartMatch'd/quote context; contact thread.  
- **10.4 Violation & legal detail:** ▸ primary violation \+ "N more" · ◦ full list w/ code sections \+ severity; defendant; plea/disposition.  
- **10.5 Court:** ▸ court of record (name \+ city); court date · ◦ address; appear-by deadline; warrant-risk flag if missed.  
- **10.6 Billing (overlay):** ▸ balance \+ overdue flag · ◦ paid/quoted, method, invoice history, *Make a payment*.  
- **10.7 Outcome:** ▸ result via badge (Dismissed\! / Resolved) · ◦ outcome detail ($ saved, points avoided); review prompt \+ submitted.  
- **10.8 Empty / unfinished:** ▸ **Incomplete** / **Deadline** \+ completeness meter · ◦ per-field "Not provided," instant-quote CTA.

---

## 11\. Interaction & behavior rules

- **11.1 One primary action per card** — enforced.  
- **11.2 Truncation is always tappable** — no silent clips.  
- **11.3 Hero de-escalation** — rough "ticket \= bad" against clean "solution \= good"; full-weight at Incomplete/Deadline, shrinks as the case advances so Dismissed\! doesn't re-trigger anxiety.  
- **11.4 Feed sort & filter** — action-required first (Almost gone, Expired, SmartMatch'd, overdue, **titled-Active LOE/actions**), then Active, then resolved (Dismissed\! / Resolved), then passive (Incomplete, Archived); reverse-chron within tier; ◦ filter by Series. **Note:** solid/titled badges naturally surface in this sort — weight and order reinforce each other.  
- **11.5 Refresh & cadence** — pull-to-refresh; Active \+ unread-dot flags new notifications; away-state transitions reflect on next load \+ push.  
- **11.6 Empty states** — no cases: first-run upload prompt; empty filter: quiet "nothing here."

---

## 12\. Content & copy guidelines

Calm, plain-English, non-legalese. Badge labels per §6.0 verbatim with correct form/weight. Tokens (`{city}`, `{mon yyyy}`, `<state>`, names) never render raw or duplicated. Series 2 copy carries honest time pressure (price genuinely can change). LOE copy is reassuring and minimal — a confirmation, not a contract wall (§7.7). Edge states name the situation without blame and always offer a next step.

---

## 13\. Edge cases & error states

- **Quote expired** — **Expired**; reinitiate (§7.6).  
- **Required action on an Active case** (incl. LOE) — titled/needs-attention badge \+ the action; not a status change (§6.1/§7.7).  
- **LOE re-sign on reassignment** — one-tap re-confirm highlighting the new attorney; never a restart (§7.7).  
- **Counter offer / Remarketing / Cancelled** — real branches with **no approved badge** (§6.2 / §15).  
- **Resolved (not dismissed)** — honest, no false celebration, routed to review.  
- **Overdue on a Dismissed\! case** — balance first; win subordinate until paid (§7.2).  
- **Missing / partial data** — completeness meter; never raw empty fields.  
- **Court date passed / missed** — warrant-risk flag (relates to **Deadline**).  
- **Multiple cases / stale data** — feed scales; priority sort; show last-updated.

---

## 14\. Known defects to fix

1. Duplicate firm-name bind ("Garibyan Law Garibyan Law…"). 2\. Silent truncation (no tap affordance). 3\. Signal collision — resolved by §7.2. 4\. Hero crowding (avatar vs. ⭐ badge). 5\. Status/outcome redundancy — ✅ resolved: the badge names the result; confetti elaborates.

---

## 15\. Open questions

- **Three unbadged branches (§6.2)** — decide for **Counter offer, Remarketing, Cancelled**: badge / silent transition / action treatment. *Highest-priority gap before build.*  
- **LOE state list & thresholds** — confirm the exact states (and fee thresholds) where OTR's attorney network requires the LOE, to validate the low-% read in §7.7 and scope the conditional gate.  
- **Archived** — real use case for a dormant terminal badge, or unnecessary?  
- **CPC essentials** — validate the Anchor tier (§8.2) against real feeds: which Candidate-to-cut fields are actually missed when removed?  
- **Dismissal celebration under overdue balance** — demote (current §7.2) or gate until paid?  
- **Active \+ unread-dot** — clears on case open, or on notification open?  
- **Downstream propagation** — which homescreen cards inherit these badges, and on what timeline? (This workflow leads; homescreen follows.)

---

## 16\. Success metrics

Time-to-orient (\< 5s) · quote-decision rate in the SmartMatch'd / Almost gone window · action completion on gates (quote, **LOE**, overdue) · **LOE friction** (drop-off at the LOE step, esp. on re-sign) · support contacts about case status (should fall) · review submission rate · re-engagement from Incomplete / Deadline.

---

## 17\. Out of scope / future

Booking / instant-quote purchase flow · lifecycle communications layer · attorney messaging depth · multi-case bulk actions · first-run onboarding.

---

*End of PRD v1.4*  
