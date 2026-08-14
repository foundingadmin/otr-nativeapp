// File Navigator data. Enforced rule: every line item name matches the real
// file/folder name in the project directory 1:1. No aggregate or invented labels.
// cat: canonical | exploration | decision | system | doc | archive | reference
;(function () {
  const SNAP = 'Isolation copy of a shared kit, snapshotted Jul 6, 2026.';
  const copy = (dir, cat, names) => names.map((n) => ({ name: n, file: dir + n, note: SNAP, cat }));
  const f = (name, file, note, cat, extra) => Object.assign({ name, file, note, cat }, extra || {});

  window.NAV_DATA = [
  f('README.md', 'README.md', 'The front door: how this project is organized, the five operating rules, status vocabulary. Read first.', 'doc', { age: 'today' }),
  { name: 'File Navigator.html', path: 'File Navigator.html', note: 'This page — the sole root board. A 1:1 mirror of the project directory with search, filters, and status badges. The other hub boards now live under docs/.', cat: 'doc', age: 'today' },

  { name: 'cases', file: 'cases/README.md', note: 'THE Cases workflow: everything a user sees to track a ticket. Future workflows (home, onboarding, booking) land as siblings.', children: [
    f('README.md', 'cases/README.md', 'Workflow front door: the three sub-workstreams and the authoritative PRD.', 'doc', { age: 'today' }),

    { name: '_docs-cases', file: 'cases/_docs-cases/decisions/LEDGER.md', note: 'Workflow-local docs: the PRD and decision records for everything inside cases/.', children: [
    f('Cases Tab PRD.md', 'cases/_docs-cases/Cases Tab PRD.md', 'The authoritative PRD, one living file: badge registry, precedence rules, CPC framework, LOE stance. Changelog inside tracks versions and cites DR numbers.', 'doc', { age: 'today' }),
    { name: 'decisions', file: 'cases/_docs-cases/decisions/LEDGER.md', note: 'Decision records for the Cases workflow (DR-X-###).', children: [
      f('LEDGER.md', 'cases/_docs-cases/decisions/LEDGER.md', 'Master ledger: all DRs chronologically + integration debt.', 'decision', { age: 'today' }),
      f('DR-X-001 Badge registry approved.md', 'cases/_docs-cases/decisions/DR-X-001 Badge registry approved.md', 'Series 1–3 badge registry approved.', 'decision', { badges: [{ t: 'INTEGRATED', i: 'success' }] }),
      f('DR-X-002 SmartMatchd pattern and sub-logo.md', 'cases/_docs-cases/decisions/DR-X-002 SmartMatchd pattern and sub-logo.md', 'SmartMatch\u2019d pattern; checkmark elevated to sub-logo.', 'decision', { badges: [{ t: 'INTEGRATED', i: 'success' }] }),
      f('DR-X-003 Resolved macro Dismissed override.md', 'cases/_docs-cases/decisions/DR-X-003 Resolved macro Dismissed override.md', 'Resolved is the macro; Dismissed! overrides on the win.', 'decision', { badges: [{ t: 'INTEGRATED', i: 'success' }] }),
      f('DR-X-004 Hard-stop dropped titled form.md', 'cases/_docs-cases/decisions/DR-X-004 Hard-stop dropped titled form.md', 'No hard-stop status; titled needs-attention form instead.', 'decision', { badges: [{ t: 'INTEGRATED', i: 'success' }] }),
      f('DR-X-005 Blocked and Archived parked.md', 'cases/_docs-cases/decisions/DR-X-005 Blocked and Archived parked.md', 'Blocked (backup-only) + Archived; parked pending a use case.', 'decision', { badges: [{ t: 'PARKED', i: 'neutral' }] }),
      f('DR-X-006 Badge weight and form rule.md', 'cases/_docs-cases/decisions/DR-X-006 Badge weight and form rule.md', 'Badge weight + form codified as the governing DS rule.', 'decision', { badges: [{ t: 'INTEGRATED', i: 'success' }] }),
      f('DR-X-007 LOE conditional micro-step.md', 'cases/_docs-cases/decisions/DR-X-007 LOE conditional micro-step.md', 'LOE is a conditional, state-gated micro-step. Action UI not yet designed.', 'decision', { badges: [{ t: 'PENDING', i: 'warning' }] }),
      f('DR-X-008 Homescreen de-elevated.md', 'cases/_docs-cases/decisions/DR-X-008 Homescreen de-elevated.md', 'Cases workflow leads, homescreen follows. Propagation pending.', 'decision', { badges: [{ t: 'PENDING', i: 'warning' }] }),
    ]},
    ]},

    { name: '_ds-cases', file: 'cases/_ds-cases/MANIFEST.md', note: 'The DS delta this workflow produced on top of ds-global. Every workflow ships its own ds-<workflow> folder; this one travels with the Cases UI at handoff.', children: [
      { name: 'Atomic System.html', path: 'cases/_ds-cases/Atomic System.html', note: 'Specimen board rendering the full atomic stack for review.', cat: 'canonical', badges: [{ t: 'CANONICAL', i: 'info' }], age: '2w' },
      f('MANIFEST.md', 'cases/_ds-cases/MANIFEST.md', 'Every kit mapped to its atomic tier + consumers, the freeze rules, and the engineering Integration contract.', 'system', { age: 'today' }),
      { name: 'kits', file: 'cases/_ds-cases/kits/core-kit.jsx', note: 'Frozen shared kits. Merge via DR only.', children: [
        f('design-canvas.jsx', 'cases/_ds-cases/kits/design-canvas.jsx', 'Infrastructure: pan/zoom canvas shell every board mounts. Project-only.', 'system', { badges: [{ t: 'KIT', i: 'neutral' }] }),
        f('core-kit.jsx', 'cases/_ds-cases/kits/core-kit.jsx', 'Molecules: status badges (form + weight), pills, action primitives.', 'system', { badges: [{ t: 'KIT', i: 'neutral' }] }),
        f('cpc.jsx', 'cases/_ds-cases/kits/cpc.jsx', 'Organism: the Case Preview Card itself.', 'system', { badges: [{ t: 'KIT', i: 'neutral' }] }),
        f('card-kit.jsx', 'cases/_ds-cases/kits/card-kit.jsx', 'Organism: card scaffolding and variants around the CPC.', 'system', { badges: [{ t: 'KIT', i: 'neutral' }] }),
        f('atoms.jsx', 'cases/_ds-cases/kits/atoms.jsx', 'Specimen content for the Atomic System board.', 'system', { badges: [{ t: 'KIT', i: 'neutral' }] }),
        f('tweaks-panel.jsx', 'cases/_ds-cases/kits/tweaks-panel.jsx', 'Infrastructure: Tweaks panel shell. Project-only.', 'system', { badges: [{ t: 'KIT', i: 'neutral' }] }),
      ]},
    ]},
    { name: 'system-case_status_and_action', file: 'cases/system-case_status_and_action/LEDGER.md', note: 'Sub-workstream: the case status badge registry + status language system (PRD §6–§9). Source of truth for status language.', children: [
      { name: 'Case Status and Action.html', path: 'cases/system-case_status_and_action/Case Status and Action.html', note: 'The approved badge registry: form, weight, icon, action pairings (DR-X-001/003/004/006).', cat: 'canonical', badges: [{ t: 'CANONICAL', i: 'info' }], age: '2w' },
      { name: 'kits', file: 'cases/system-case_status_and_action/kits/status-doc.jsx', note: 'Frozen kit the registry board loads. Merge via DR only.', children: [
        f('status-doc.jsx', 'cases/system-case_status_and_action/kits/status-doc.jsx', 'Board content for the registry board.', 'system', { badges: [{ t: 'KIT', i: 'neutral' }] }),
      ]},
      { name: 'explorations', note: 'Self-contained exploration sandboxes. Each carries a BRIEF.md and its own kit copies.', children: [
        { name: '01-status-series', file: 'cases/system-case_status_and_action/explorations/01-status-series/BRIEF.md', note: 'Series 1–3 badge treatment exploration. Decided and folded into the registry; candidate to archive.', children: [
          { name: '01-status-series.html', path: 'cases/system-case_status_and_action/explorations/01-status-series/01-status-series.html', note: 'Series treatment board.', cat: 'exploration', badges: [{ t: 'DECIDED', i: 'success' }, { t: 'INTEGRATED', i: 'success' }], age: '2w' },
          f('BRIEF.md', 'cases/system-case_status_and_action/explorations/01-status-series/BRIEF.md', 'Question + status: decided, integrated (DR-X-001/003/006).', 'exploration', { age: 'today' }),
          ...copy('cases/system-case_status_and_action/explorations/01-status-series/', 'exploration', ['design-canvas.jsx', 'core-kit.jsx', 'cpc.jsx', 'card-kit.jsx', 'status-doc.jsx']),
        ]},
      ]},
      f('LEDGER.md', 'cases/system-case_status_and_action/LEDGER.md', 'Workstream index: explorations, decisions, integration. Flags the unbadged gap states.', 'decision', { age: 'today' }),
    ]},

    { name: 'component-case_preview_cards', file: 'cases/component-case_preview_cards/LEDGER.md', note: 'Sub-workstream: the Case Preview Card component — per-state specs + card-level treatment divergences (PRD §9).', children: [
      { name: 'Case Preview Cards.html', path: 'cases/component-case_preview_cards/Case Preview Cards.html', note: 'CPC per-state specifications across all three Series (PRD §9).', cat: 'canonical', badges: [{ t: 'CANONICAL', i: 'info' }], age: '2w' },
      { name: 'kits', file: 'cases/component-case_preview_cards/kits/status-doc.jsx', note: 'Frozen kit this workstream\u2019s canonical board loads. Merge via DR only.', children: [
        f('status-doc.jsx', 'cases/component-case_preview_cards/kits/status-doc.jsx', 'Board content for the CPC per-state board.', 'system', { badges: [{ t: 'KIT', i: 'neutral' }] }),
      ]},
      { name: 'explorations', note: 'Self-contained exploration sandboxes. Each carries a BRIEF.md and its own kit copies.', children: [
        { name: '01-header-divergences', file: 'cases/component-case_preview_cards/explorations/01-header-divergences/BRIEF.md', note: 'What does the CPC header / identity zone carry, and in which arrangement?', children: [
          { name: '01-header-divergences.html', path: 'cases/component-case_preview_cards/explorations/01-header-divergences/01-header-divergences.html', note: 'CPC header / identity-zone divergence board.', cat: 'exploration', badges: [{ t: 'IN REVIEW', i: 'warning', solid: true }], age: '2w' },
          f('BRIEF.md', 'cases/component-case_preview_cards/explorations/01-header-divergences/BRIEF.md', 'Question + status: in review. Closes with DR-CPC-###.', 'exploration', { age: 'today' }),
          f('header-divergences.jsx', 'cases/component-case_preview_cards/explorations/01-header-divergences/header-divergences.jsx', 'Header divergence source.', 'exploration'),
          ...copy('cases/component-case_preview_cards/explorations/01-header-divergences/', 'exploration', ['design-canvas.jsx', 'core-kit.jsx', 'cpc.jsx', 'card-kit.jsx']),
        ]},
      ]},
      f('LEDGER.md', 'cases/component-case_preview_cards/LEDGER.md', 'Workstream index: canonical CPC board, the header exploration, decisions.', 'decision', { age: 'today' }),
    ]},

    { name: 'screen-all_cases_feed', file: 'cases/screen-all_cases_feed/LEDGER.md', note: 'Sub-workstream: the Cases tab feed of Case Preview Cards (PRD §8, §11).', children: [
      { name: 'All Cases Feed.html', path: 'cases/screen-all_cases_feed/All Cases Feed.html', note: 'THE current feed proposal. Loads frozen kits only.', cat: 'canonical', badges: [{ t: 'CANONICAL', i: 'info' }], age: '2w' },
      { name: 'kits', file: 'cases/screen-all_cases_feed/kits/feed-kit.jsx', note: 'Frozen kits the canonical feed loads. Merge via DR only.', children: [
        f('feed-kit.jsx', 'cases/screen-all_cases_feed/kits/feed-kit.jsx', 'The feed frame.', 'system', { badges: [{ t: 'KIT', i: 'neutral' }] }),
        f('feed-assembled.jsx', 'cases/screen-all_cases_feed/kits/feed-assembled.jsx', 'Assembled feed screens.', 'system', { badges: [{ t: 'KIT', i: 'neutral' }] }),
      ]},
      { name: 'explorations', note: 'Self-contained exploration sandboxes.', children: [
        { name: '01-feed-exploration', file: 'cases/screen-all_cases_feed/explorations/01-feed-exploration/BRIEF.md', note: 'Feed layouts, filters, and action treatments: which minimal feed still orients in under 5 seconds?', children: [
          { name: '01-feed-exploration.html', path: 'cases/screen-all_cases_feed/explorations/01-feed-exploration/01-feed-exploration.html', note: 'Layout, filter, and action exploration board.', cat: 'exploration', badges: [{ t: 'EXPLORING', i: 'neutral', dashed: true }], age: '2w' },
          f('BRIEF.md', 'cases/screen-all_cases_feed/explorations/01-feed-exploration/BRIEF.md', 'Question + status: exploring. Closes with DR-CF-###.', 'exploration', { age: 'today' }),
          f('feed-layouts.jsx', 'cases/screen-all_cases_feed/explorations/01-feed-exploration/feed-layouts.jsx', 'Layout source for this exploration.', 'exploration'),
          f('feed-filters.jsx', 'cases/screen-all_cases_feed/explorations/01-feed-exploration/feed-filters.jsx', 'Filter treatments.', 'exploration'),
          f('feed-actions.jsx', 'cases/screen-all_cases_feed/explorations/01-feed-exploration/feed-actions.jsx', 'Per-card action treatments.', 'exploration'),
          ...copy('cases/screen-all_cases_feed/explorations/01-feed-exploration/', 'exploration', ['design-canvas.jsx', 'core-kit.jsx', 'cpc.jsx', 'card-kit.jsx', 'feed-kit.jsx', 'tweaks-panel.jsx']),
        ]},
      ]},
      { name: 'archive', note: 'Closed explorations, kept whole with provenance in the LEDGER.', children: [
        { name: '00-early-divergence', file: 'cases/screen-all_cases_feed/archive/00-early-divergence/Exploration.html', note: 'Original mega-canvas (Boards B–F), pre-system. Winning directions flowed into the canonicals.', children: [
          { name: 'Exploration.html', path: 'cases/screen-all_cases_feed/archive/00-early-divergence/Exploration.html', note: 'The original all-boards canvas.', cat: 'archive', badges: [{ t: 'ARCHIVED', i: 'neutral' }], age: '3w' },
          ...['board-b.jsx', 'board-e.jsx', 'board-f.jsx', 'boardf-c.jsx', 'boardf-d.jsx'].map((n) => f(n, 'cases/screen-all_cases_feed/archive/00-early-divergence/' + n, 'Divergence board source.', 'archive')),
          ...copy('cases/screen-all_cases_feed/archive/00-early-divergence/', 'archive', ['design-canvas.jsx', 'core-kit.jsx', 'cpc.jsx', 'card-kit.jsx']),
        ]},
        { name: '01-prototype', file: 'cases/screen-all_cases_feed/archive/01-prototype/Prototype.html', note: 'First interactive feed prototype. Superseded by All Cases Feed.html.', children: [
          { name: 'Prototype.html', path: 'cases/screen-all_cases_feed/archive/01-prototype/Prototype.html', note: 'Early clickable feed.', cat: 'archive', badges: [{ t: 'ARCHIVED', i: 'neutral' }], age: '3w' },
          f('prototype.jsx', 'cases/screen-all_cases_feed/archive/01-prototype/prototype.jsx', 'Prototype source.', 'archive'),
          ...copy('cases/screen-all_cases_feed/archive/01-prototype/', 'archive', ['design-canvas.jsx', 'core-kit.jsx', 'cpc.jsx', 'card-kit.jsx']),
        ]},
        { name: '02-divergence-pass-1', file: 'cases/screen-all_cases_feed/archive/02-divergence-pass-1/board-a.jsx', note: 'Cases tab divergence pass 1 (Boards A–F). Depends on otr-kit/otr-cpc, deleted pre-migration.', children: [
          f('Cases Tab - Divergence Pass 1.html', 'cases/screen-all_cases_feed/archive/02-divergence-pass-1/Cases Tab - Divergence Pass 1.html', 'Does not render; kept as source of record.', 'archive', { badges: [{ t: 'ARCHIVED', i: 'neutral' }, { t: 'SOURCE-ONLY', i: 'error' }], age: '3w' }),
          ...['board-a.jsx', 'board-b.jsx', 'board-c.jsx', 'board-d.jsx', 'board-e.jsx', 'board-f.jsx'].map((n) => f(n, 'cases/screen-all_cases_feed/archive/02-divergence-pass-1/' + n, 'Divergence board source.', 'archive')),
          ...copy('cases/screen-all_cases_feed/archive/02-divergence-pass-1/', 'archive', ['design-canvas.jsx']),
        ]},
        { name: '03-variants-a-d', file: 'cases/screen-all_cases_feed/archive/03-variants-a-d/feed-assembled-ad.jsx', note: 'Cases tab variants A–D. Same deleted-kit dependency.', children: [
          f('Cases Tab - Variants A-D.html', 'cases/screen-all_cases_feed/archive/03-variants-a-d/Cases Tab - Variants A-D.html', 'Does not render; kept as source of record.', 'archive', { badges: [{ t: 'ARCHIVED', i: 'neutral' }, { t: 'SOURCE-ONLY', i: 'error' }], age: '3w' }),
          f('feed-assembled-ad.jsx', 'cases/screen-all_cases_feed/archive/03-variants-a-d/feed-assembled-ad.jsx', 'Variants source.', 'archive'),
          ...copy('cases/screen-all_cases_feed/archive/03-variants-a-d/', 'archive', ['design-canvas.jsx', 'feed-kit.jsx', 'tweaks-panel.jsx']),
        ]},
      ]},
      f('LEDGER.md', 'cases/screen-all_cases_feed/LEDGER.md', 'Workstream index: 1 open exploration, 4 archived, provenance notes.', 'decision', { age: 'today' }),
    ]},

    { name: 'screen-single_case_details', file: 'cases/screen-single_case_details/LEDGER.md', note: 'Sub-workstream: the case detail page, the full record for a single case (PRD §10).', children: [
      { name: 'Single Case Details.html', path: 'cases/screen-single_case_details/Single Case Details.html', note: 'THE canonical Active case detail screen (tabbed record, DR-CD-004). Loads frozen kits only.', cat: 'canonical', badges: [{ t: 'CANONICAL', i: 'info' }], age: '2w' },
      { name: 'kits', file: 'cases/screen-single_case_details/kits/detail-kit.jsx', note: 'Frozen kits the canonical detail page loads. Merge via DR only.', children: [
        f('detail-kit.jsx', 'cases/screen-single_case_details/kits/detail-kit.jsx', 'Detail page frame.', 'system', { badges: [{ t: 'KIT', i: 'neutral' }] }),
        f('detail-record.jsx', 'cases/screen-single_case_details/kits/detail-record.jsx', 'Case record data model.', 'system', { badges: [{ t: 'KIT', i: 'neutral' }] }),
        f('detail-screens.jsx', 'cases/screen-single_case_details/kits/detail-screens.jsx', 'Assembled detail screens.', 'system', { badges: [{ t: 'KIT', i: 'neutral' }] }),
        f('status-reps.jsx', 'cases/screen-single_case_details/kits/status-reps.jsx', 'Status representations on the detail page.', 'system', { badges: [{ t: 'KIT', i: 'neutral' }] }),
      ]},
      { name: 'explorations', note: 'Self-contained exploration sandboxes.', children: [
        { name: '03-record-content', file: 'cases/screen-single_case_details/explorations/03-record-content/BRIEF.md', note: 'Record content model (punch list C): confirmed field set + Show more, law firm data block, Receipt vs Transactions, Participants. Closes with DR-CD-002.', children: [
          { name: 'Record Content.html', path: 'cases/screen-single_case_details/explorations/03-record-content/Record Content.html', note: 'Record content exploration board.', cat: 'exploration', badges: [{ t: 'EXPLORING', i: 'neutral', dashed: true }], age: 'today' },
          f('BRIEF.md', 'cases/screen-single_case_details/explorations/03-record-content/BRIEF.md', 'Question + status: exploring. Law firm stats + add-participant blocked on F-2 / F-3.', 'exploration', { age: 'today' }),
          f('record-content.jsx', 'cases/screen-single_case_details/explorations/03-record-content/record-content.jsx', 'Field set, firm block, money modules, participants.', 'exploration', { age: 'today' }),
          ...copy('cases/screen-single_case_details/explorations/03-record-content/', 'exploration', ['design-canvas.jsx', 'core-kit.jsx', 'cpc.jsx', 'card-kit.jsx', 'detail-kit.jsx', 'detail-record.jsx']),
        ]},
        { name: '04-case-chat', file: 'cases/screen-single_case_details/explorations/04-case-chat/BRIEF.md', note: 'Net-new case chat (punch list E): the audit-log-that-is-also-a-chat. Surface approaches, the toast-plus-message pattern, the unified action variant set, and the persistent resolving surface (item G).', children: [
          { name: 'Case Chat.html', path: 'cases/screen-single_case_details/explorations/04-case-chat/Case Chat.html', note: 'Case chat exploration board.', cat: 'exploration', badges: [{ t: 'EXPLORING', i: 'neutral', dashed: true }], age: 'today' },
          f('BRIEF.md', 'cases/screen-single_case_details/explorations/04-case-chat/BRIEF.md', 'Question + status: exploring. Decided display pattern + item G firewall.', 'exploration', { age: 'today' }),
          f('case-chat-kit.jsx', 'cases/screen-single_case_details/explorations/04-case-chat/case-chat-kit.jsx', 'ChatScreen, ActionEntry, Message, SystemChip, PinnedActionBar.', 'exploration', { age: 'today' }),
          f('case-chat-lab.jsx', 'cases/screen-single_case_details/explorations/04-case-chat/case-chat-lab.jsx', 'Board layout: four sections of full-screen wires.', 'exploration', { age: 'today' }),
          ...copy('cases/screen-single_case_details/explorations/04-case-chat/', 'exploration', ['design-canvas.jsx', 'core-kit.jsx']),
        ]},
        { name: '05-status-coverage', file: 'cases/screen-single_case_details/explorations/05-status-coverage/BRIEF.md', note: 'Lifecycle coverage moved off the root (DR-CD-004): one case through every status, each preview card above the detail it opens.', children: [
          { name: 'Status Coverage.html', path: 'cases/screen-single_case_details/explorations/05-status-coverage/Status Coverage.html', note: 'Every-status coverage board.', cat: 'exploration', badges: [{ t: 'EXPLORING', i: 'neutral', dashed: true }], age: 'today' },
          f('BRIEF.md', 'cases/screen-single_case_details/explorations/05-status-coverage/BRIEF.md', 'Status: exploring. Split from the root board Jul 10.', 'exploration', { age: 'today' }),
          f('status-coverage.jsx', 'cases/screen-single_case_details/explorations/05-status-coverage/status-coverage.jsx', 'The former root status board, trimmed to the coverage section.', 'exploration', { age: 'today' }),
          ...copy('cases/screen-single_case_details/explorations/05-status-coverage/', 'exploration', ['design-canvas.jsx', 'core-kit.jsx', 'cpc.jsx', 'card-kit.jsx', 'detail-kit.jsx', 'detail-record.jsx', 'detail-screens.jsx']),
        ]},
      ]},
      { name: 'archive', note: 'Closed explorations and orphaned sources.', children: [
        { name: '00-board-c-detail-pages', file: 'cases/screen-single_case_details/archive/00-board-c-detail-pages/boardf-c.jsx', note: 'Board C: early detail-page divergence. Deleted-kit dependency.', children: [
          f('Board C - Case Detail Pages.html', 'cases/screen-single_case_details/archive/00-board-c-detail-pages/Board C - Case Detail Pages.html', 'Does not render; source of record.', 'archive', { badges: [{ t: 'ARCHIVED', i: 'neutral' }, { t: 'SOURCE-ONLY', i: 'error' }], age: '3w' }),
          f('boardf-c.jsx', 'cases/screen-single_case_details/archive/00-board-c-detail-pages/boardf-c.jsx', 'Board source.', 'archive'),
          ...copy('cases/screen-single_case_details/archive/00-board-c-detail-pages/', 'archive', ['design-canvas.jsx']),
        ]},
        { name: '01-board-d-flow-moments', file: 'cases/screen-single_case_details/archive/01-board-d-flow-moments/boardf-d.jsx', note: 'Board D: flow-moment studies. Deleted-kit dependency.', children: [
          f('Board D - Flow Moments.html', 'cases/screen-single_case_details/archive/01-board-d-flow-moments/Board D - Flow Moments.html', 'Does not render; source of record.', 'archive', { badges: [{ t: 'ARCHIVED', i: 'neutral' }, { t: 'SOURCE-ONLY', i: 'error' }], age: '3w' }),
          f('boardf-d.jsx', 'cases/screen-single_case_details/archive/01-board-d-flow-moments/boardf-d.jsx', 'Board source.', 'archive'),
          ...copy('cases/screen-single_case_details/archive/01-board-d-flow-moments/', 'archive', ['design-canvas.jsx']),
        ]},
        { name: '02-timeline-lab', file: 'cases/screen-single_case_details/archive/02-timeline-lab/BRIEF.md', note: 'Timeline workshop, parked per DR-CD-003. The standalone lifecycle timeline is a dead feature; case chat is the canonical lifecycle surface.', children: [
          { name: 'Timeline Lab.html', path: 'cases/screen-single_case_details/archive/02-timeline-lab/Timeline Lab.html', note: 'Parked; kept for the decision trail.', cat: 'archive', badges: [{ t: 'ARCHIVED', i: 'neutral' }], age: 'today' },
          f('BRIEF.md', 'cases/screen-single_case_details/archive/02-timeline-lab/BRIEF.md', 'Parked per DR-CD-003.', 'archive', { age: 'today' }),
          f('timeline-lab.jsx', 'cases/screen-single_case_details/archive/02-timeline-lab/timeline-lab.jsx', 'Lab board source.', 'archive'),
        ]},
        { name: '03-details-exploration', file: 'cases/screen-single_case_details/archive/03-details-exploration/BRIEF.md', note: 'The former 01-details-exploration (ticket hero, attorney card, record layout), archived per DR-CD-004. Tabbed record won; still renders from the archive.', children: [
          { name: '01-details-exploration.html', path: 'cases/screen-single_case_details/archive/03-details-exploration/01-details-exploration.html', note: 'Renders from the archive.', cat: 'archive', badges: [{ t: 'ARCHIVED', i: 'neutral' }], age: 'today' },
          f('BRIEF.md', 'cases/screen-single_case_details/archive/03-details-exploration/BRIEF.md', 'Archived per DR-CD-004.', 'archive', { age: 'today' }),
        ]},
        { name: '90-orphaned-modules', file: 'cases/screen-single_case_details/archive/90-orphaned-modules/detail-actions.jsx', note: 'JSX whose host boards were deleted pre-migration.', children:
          ['court-row-divergence.jsx', 'detail-actions.jsx', 'detail-disclosure.jsx', 'timeline-titled-card.jsx'].map((n) => f(n, 'cases/screen-single_case_details/archive/90-orphaned-modules/' + n, 'Orphaned module, kept as source reference.', 'archive', { badges: [{ t: 'ARCHIVED', i: 'neutral' }] })),
        },
      ]},
      f('LEDGER.md', 'cases/screen-single_case_details/LEDGER.md', 'Workstream index. DR-CD-004 tabbed record + root trimmed to canon; DR-CD-003 parks the timeline; DR-CD-002 open in 03-record-content.', 'decision', { age: 'today' }),
    ]},

  ]},

  { name: 'docs', file: 'docs/LEDGER.md', note: 'Master overview across workflows: the roll-up ledger + source for the root hub pages. Workflow-local docs live inside each workflow.', children: [
    f('LEDGER.md', 'docs/LEDGER.md', 'Master ledger: one row per workflow, pointing into that workflow\u2019s own decision ledger.', 'decision', { age: 'today' }),
    f('LESSONS.md', 'docs/LESSONS.md', 'The standards we keep: naming, board copy, directory shape, and between-sprint hygiene. Read before naming or writing board copy.', 'doc', { age: 'today' }),
    { name: 'how-it-works', file: 'docs/how-it-works/How It Works.html', note: 'The stakeholder explainer board and its hierarchy data.', children: [
      { name: 'How It Works.html', path: 'docs/how-it-works/How It Works.html', note: 'The stakeholder explainer: the product/workflow/workstream hierarchy as one collapsible tree (variant C locked in).', cat: 'doc', age: 'today' },
      f('hierarchy-data.js', 'docs/how-it-works/hierarchy-data.js', 'The workflow / workstream hierarchy the explainer renders.', 'doc', { age: 'today' }),
    ]},
    { name: 'navigator', file: 'docs/navigator/navigator-data.js', note: 'Source behind File Navigator.html (which stays at root).', children: [
      f('navigator-data.js', 'docs/navigator/navigator-data.js', 'The project map data: names, notes, badges. Kept 1:1 with the directory.', 'doc', { age: 'today' }),
      f('navigator-app.jsx', 'docs/navigator/navigator-app.jsx', 'The File Navigator UI.', 'doc', { age: 'today' }),
    ]},
    { name: 'review-hub', file: 'docs/review-hub/Review Hub.html', note: 'The stakeholder review-queue board and its shared core.', children: [
      { name: 'Review Hub.html', path: 'docs/review-hub/Review Hub.html', note: 'THE stakeholder start page: guided review queue (B2 iteration locked in). Open, comment, mark reviewed.', cat: 'doc', age: 'today' },
      f('review-core.js', 'docs/review-hub/review-core.js', 'Review items + persisted review state, shared across hub versions.', 'doc', { age: 'today' }),
    ]},
    { name: 'roadmap', file: 'docs/roadmap/Roadmap.html', note: 'The high-level roadmap board.', children: [
      { name: 'Roadmap.html', path: 'docs/roadmap/Roadmap.html', note: 'High-level render of ROADMAP.md: 7 initiatives, Done / Current / PRD. No actions here.', cat: 'doc', age: 'today' },
      f('ROADMAP.md', 'docs/roadmap/ROADMAP.md', 'Canonical horizon line: Now, Next, Later. GUI render: Roadmap.html in the same folder.', 'doc', { age: 'today' }),
    ]},
  ]},

  { name: 'reference', file: 'reference/Native PRD - Off The Record (3).md', note: 'Source materials: never edited, never loaded by boards.', children: [
    f('Native PRD - Off The Record (3).md', 'reference/Native PRD - Off The Record (3).md', 'Original uploaded PRD source.', 'reference'),
    f('Case Status.png', 'reference/Case Status.png', 'Approved status badge board reference.', 'reference'),
    f('draw-6eaf275a-cae9-4f0c-8b90-284dcd8d6427.png', 'reference/draw-6eaf275a-cae9-4f0c-8b90-284dcd8d6427.png', 'Sketch reference.', 'reference'),
    f('pasted-1782259773176-0.png', 'reference/pasted-1782259773176-0.png', 'Pasted context screenshot.', 'reference'),
    f('pasted-1783393470337-0.png', 'reference/pasted-1783393470337-0.png', 'Project-map GUI reference from another project.', 'reference'),
  ]},

  { name: '_ds', file: '_ds/off-the-record-design-system-6eff9681-3f7d-456f-bb78-66b98be22409/readme.md', note: 'ds-global: the baseline OTR design system every workflow extends. Tokens, Figtree, 40 components. Never edited here.', children: [
    { name: 'off-the-record-design-system-6eff9681-3f7d-456f-bb78-66b98be22409', file: '_ds/off-the-record-design-system-6eff9681-3f7d-456f-bb78-66b98be22409/readme.md', note: 'The mounted design system bundle.', children: [
      { name: 'tokens', file: '_ds/off-the-record-design-system-6eff9681-3f7d-456f-bb78-66b98be22409/tokens/colors.css', note: 'Design tokens as CSS custom properties.', children:
        ['base.css', 'colors.css', 'fig-tokens.css', 'fonts.css', 'radius.css', 'spacing.css', 'typography.css'].map((n) => f(n, '_ds/off-the-record-design-system-6eff9681-3f7d-456f-bb78-66b98be22409/tokens/' + n, 'Token layer stylesheet.', 'system')),
      },
      f('styles.css', '_ds/off-the-record-design-system-6eff9681-3f7d-456f-bb78-66b98be22409/styles.css', 'Global stylesheet entry; imports all tokens.', 'system'),
      f('_ds_bundle.js', '_ds/off-the-record-design-system-6eff9681-3f7d-456f-bb78-66b98be22409/_ds_bundle.js', 'Compiled component bundle (window.OffTheRecordDesignSystem_6eff96).', 'system'),
      f('_ds_manifest.json', '_ds/off-the-record-design-system-6eff9681-3f7d-456f-bb78-66b98be22409/_ds_manifest.json', 'Component manifest.', 'system'),
      f('readme.md', '_ds/off-the-record-design-system-6eff9681-3f7d-456f-bb78-66b98be22409/readme.md', 'The design system guide.', 'system'),
    ]},
  ]},
  ];
})();
