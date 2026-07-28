# Handoff Plan • OTR Native App UI to a coded repo

**Canonical truth.** Stakeholder render: `Handoff Plan.html` (same folder). Keep the two in sync.

Goal: stand up a blank repo where Claude Code wires the Cases workflow into a real coded prototype, deployed to Vercel, reviewable on a phone by the CEO, and structured to absorb months of updates, versions, explorations, and tests.

---

## 1. Where the project stands

One workflow (`cases/`) with four workstreams, four canonical boards, five open explorations, nine archived explorations, twelve decision records across two numbering series, two PRDs, and a bound design system consumed as tokens plus one component.

What is genuinely strong and should survive the move:

- The governance model. Workflow to workstream to board, with a closed category set (`screen`, `component`, `system`), is a repo hierarchy already.
- The decision trail. Every exploration closes in a DR, ledgers roll up, archive is append only. That is the part most design projects never have and the part that makes a months long build safe.
- The DS delta discipline. `cases/_ds-cases/MANIFEST.md` already names what each kit becomes in engineering terms. That document is a port map in draft.
- The design language itself. The status registry, the signal precedence rule, the severity hierarchy, and the badge form and weight system are real product logic, worked out and ratified.

## 2. Seven things that block a code handoff

**a. There is no running app.** Every artifact is a pan and zoom canvas of artboards. The README names a workflow demo (`Cases Demo.html`) as the standard, and it does not exist. Nothing in the project navigates from a feed card into that card's own detail screen. The interactive prototype is net new assembly, not a port of something already working.

**b. There is no build.** Babel in the browser, IIFE modules, and `window.*` globals. Correct for boards, unusable as a deployed app: transpile on every load, no module graph, no types, no tree shaking, nowhere to hang a test.

**c. The case data is forked.** `cpc.jsx` holds `CASES`, eighteen states shaped for a preview card. `detail-kit.jsx` holds `DETAIL`, a handful of landmark states shaped for a full record. They share no ids and no schema. A demo that opens a card into its own case needs one model that serves both.

**d. Snapshot duplication is heavy.** `design-canvas.jsx` (1,039 lines) exists in eleven places. `core-kit.jsx` exists in eight, in three divergent lengths. This is rule 1 working as designed for exploration isolation, and it means "the latest source of truth" is a per file judgment call that I have to make, not something Claude Code can infer.

**e. Product code and board scaffolding live in the same files.** `DScreen`, `FScreen`, `ZLabel`, `Spec`, explore pins, and the tweaks panel sit next to the CPC, the status badge, and the action hub. The port needs those separated cleanly.

**f. Assets are inlined.** A 71 KB base64 PNG sits inside `core-kit.jsx`, and `firm-team.b64.txt` carries 344 KB more.

**g. There is no review mechanism outside this tool.** Comments pinned to elements are how feedback works today. On Vercel that layer does not exist, so the CEO loop has to be designed deliberately rather than assumed.

One large piece of good news: the only thing the kits take from the bound design system bundle is `FeatureIcon`. Everything else is authored directly against the token CSS variables. The design system dependency is therefore small and portable, which removes the biggest usual risk in a handoff like this.

## 3. Two trees, one repo

The repo holds two trees that must not be confused.

- `design/` is the board system, moved across essentially verbatim and served as static HTML. Explorations continue exactly as they do now, unchanged. This is the studio.
- `apps/` and `packages/` are the coded product. Only decided work enters here. This is the build.

The bridge between them is the decision record, as it is today. A pattern enters the coded tree when a DR says adopt, and the DR records the commit and the preview URL where that happened.

## 4. Target repo architecture

```
otr-native-app/
  apps/
    prototype/          Next.js App Router, TypeScript. The deployed demo.
    boards/             the design/ tree, served as static HTML on its own URL.
  packages/
    tokens/             DS token CSS, pinned and versioned, plus typed token names.
    icons/              FeatureIcon and the Streamline set, extracted from the DS bundle.
    ui/                 the OTR primitives the app actually uses.
    cases/              the Cases domain: status registry, precedence, severity, CPC, detail zones.
    fixtures/           one typed case dataset plus named scenarios.
  design/               the board system, verbatim.
  docs/                 PRDs, decisions, ledgers, roadmap, lessons, port map.
```

Stack calls, with reasons:

- **Next.js App Router with TypeScript.** Routing gives the demo real URLs, which is what makes a review link precise.
- **CSS Modules over the DS custom properties. No Tailwind.** The design system ships tokens as CSS variables and every kit is already authored against them. Adding a utility framework would mean translating a token system that already works.
- **pnpm workspaces with Turborepo.** Packages keep the domain logic testable on its own and stop the demo app from becoming the only place code can live.
- **Vitest** for pure logic, **Playwright** for flows and per status screenshots, **GitHub Actions** for typecheck, lint, test, build on every PR.
- **Changesets** for versioning, so every review build has a number and a short list of what changed.

Route map for the prototype:

- `/cases` the feed
- `/cases/[caseId]` the detail screen
- `/cases/[caseId]/chat` the privileged channel, when it lands
- `/lab/<workstream>/<exploration>` coded explorations, flagged off by default
- `/review` the current review build, what changed, and how to leave feedback

## 5. The demo, scoped

The thing the CEO opens on a phone.

- Full bleed mobile web on a phone, with a PWA manifest so it installs to the home screen and runs without browser chrome. On desktop it renders inside a device frame.
- The feed, wired from the real fixture set: grouping, the segmented Active and Resolved tabs, sub chips, search, sort sheet, density.
- Every card taps through to that case's own detail screen and back.
- Full status coverage. All eighteen states reachable, each with its correct badge, primary action, and detail record.
- A scenario switcher. The README already fixes the rule that demo tweaks are user state cohorts and never design divergences, so scenarios are personas: single incomplete case, multi case with money overdue, action needed on a legal gate, a won case, and a QA mode that shows every status at once. Scenario travels in the URL so a review link is reproducible.
- Session state persists locally, so unread clearing and a signed LOE survive a refresh during a review session.

## 6. How updates, versions, explorations, and tests wire in

This is the part that has to hold for months.

- **Design explorations** continue in `design/`, untouched. Nothing changes about how you work today.
- **Coded explorations** get a `/lab` route and a flag, so a divergence can ship to the same preview URL without touching the canonical demo. Same BRIEF and DR discipline, same ledger.
- **Adoption** is a pull request that moves the pattern from `/lab` into `packages/cases`, flips the DR to integrated, and deletes nothing.
- **Versions** are changesets and git tags. Every DR from here forward records the tag and the preview URL it was decided on, so "which version did he see" is never a question.
- **Tests** you write in three tiers. Pure logic first, because it is the highest value and the easiest: the badge registry completeness check, `primaryAction` precedence, `sortActions`, `feedGroup`, urgency. Then component level per status. Then Playwright flows with a screenshot per status, which is the regression net that lets you refactor without fear.

## 7. The CEO review loop

- Every pull request produces a Vercel preview URL. Nothing is reviewed on a local machine.
- Primary feedback path: Vercel preview comments, which pin to elements the same way this project's comments do, and require the CEO to hold a seat on the Vercel team.
- Fallback if he will not sign in: a small in app feedback pin in the demo that captures route, scenario, viewport, and build sha, and posts to a serverless route that opens a GitHub issue. Two days of work, worth it only if the seat is a problem.
- Cadence: a tagged review build with a short changelog on `/review`, then triage into DRs, then the roadmap. Same shape as today, on a URL instead of in a tool.

## 8. Phases

**Phase 0 • Handoff pack.** One to two weeks, me. Everything in section 9 below.

**Phase 1 • Repo scaffold.** One week, Claude Code. Workspace, tokens, icons, CI, both Vercel projects live, boards deployed. Success: two URLs exist and the boards render.

**Phase 2 • The Cases demo.** Three to five weeks, Claude Code with your direction. Feed, detail, all statuses, scenario switcher, PWA. Success: the CEO taps through every status on his phone.

**Phase 3 • Review and test loop.** One to two weeks. Vitest suite, Playwright per status screenshots, changesets, `/review`, feedback path live.

**Phase 4 • Open explorations land.** Ongoing. Case chat, record content, LOE action UI, the three gap state badges. Each arrives as a `/lab` route, closes in a DR, and merges.

**Phase 5 • The next workflow.** Home and onboarding reuse the pipeline. Success is that the second workflow costs a fraction of the first.

## 9. What I do before handoff

1. **Pick canon, file by file.** Resolve the three divergent `core-kit` copies and every other duplicated kit, and record the choice in a port map. Nothing is deleted; the losing copies stay where they are.
2. **Unify the case model.** Merge `CASES` and `DETAIL` into one typed shape covering all eighteen states, with the record fields the detail page needs. Publish it as `CASE-MODEL.md` plus a JSON fixture Claude Code imports directly.
3. **Extract the status registry to data.** The eighteen states with badge form, weight, tone, primary action, and severity, as a JSON file rather than a component. This is the single highest value artifact in the handoff.
4. **Build `Cases Demo.html`.** The missing workflow demo, wired from frozen kits only, feed to detail and back, all statuses, scenario switcher. It is the reference the coded port has to match, and building it is what proves the unified model works before anyone writes TypeScript.
5. **Unpack the assets.** Base64 out of source and into real image files.
6. **Write the handoff docs.** `HANDOFF.md`, `ARCHITECTURE.md`, `PORT-MAP.md` mapping every kit to its target module, and a `CLAUDE.md` for the new repo carrying the rules this project runs on, including the copy standards and the never delete rule.
7. **Tidy the root.** The orphaned `record-content.jsx` at the project root, and the stray upload and screenshot folders.

## 10. Decisions I need from you

1. Does the repo hold both trees, or does the design system of boards stay here and only the coded prototype travel?
2. Vercel seat for the CEO, yes or no. This picks the review path.
3. Does the demo need the case chat surface in Phase 2, or is Phase 4 soon enough?
4. The three gap state badges (Counter offer, Remarketing, Cancelled) are undecided and block full status coverage. Decide them in Phase 0, or ship them behind a flag?
5. Is Claude Code writing production code that engineering later adopts, or a demo that engineering rebuilds? This changes how much rigor goes into the packages.

## 11. Risks

- The gap state badges are a known hole in the status system. Full coverage cannot be claimed until they close.
- Merging the two fixture models will surface detail record fields that were never specified for the rarer statuses. Expect content decisions, not just code.
- The design system bundle is a compiled artifact from another project. Pin a version in the repo and record it, or the port silently drifts.
- FeatureIcon coverage and font loading need a real check on iOS Safari early, not at the end.
- Snapshot duplication means canon selection is a design call. Claude Code must not guess it, which is why item 1 in section 9 comes first.
