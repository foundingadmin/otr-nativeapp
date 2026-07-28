# cases/_ds-cases — Manifest

Atomic DS expansions the **Cases workflow** has created on top of the baseline `_ds/`. A kit lives here when **2+ sub-workstreams** consume it; single-workstream kits live in that sub-workstream's `kits/`. Graduating a kit in is itself a DR. Future workflows create their own `_ds-<workflow>/` folder (`home/_ds-home/`, `booking/_ds-booking/`); anything the whole app needs graduates toward the baseline DS.

**Specimen board:** `Atomic System.html` — renders the full atomic stack for review.

## Kits (frozen shared source)

- `kits/design-canvas.jsx` — **infrastructure.** Pan/zoom canvas shell (DCSection/DCArtboard) every board mounts.
- `kits/core-kit.jsx` — **molecules.** Status badges (form + weight system), pills, action primitives. Consumers: all canonical boards.
- `kits/cpc.jsx` — **organism.** The Case Preview Card. Consumers: status-system, case-feed, case-details.
- `kits/card-kit.jsx` — **organism.** Card scaffolding/variants around the CPC. Consumers: all canonical boards.
- `kits/atoms.jsx` — **specimen content.** Atomic System board content. Consumer: `Atomic System.html` only (lives here because it documents this layer).
- `kits/tweaks-panel.jsx` — **infrastructure.** Tweaks panel shell. Consumers: case-feed canonical + studies.

## Workstream-owned kits (for reference)

- `cases/system-case_status_and_action/kits/status-doc.jsx` — badge/CPC registry board content (also copied into `cases/component-case_preview_cards/kits/` for its CPC per-state board).
- `cases/screen-all_cases_feed/kits/feed-kit.jsx`, `feed-assembled.jsx` — feed frame + assembled feed screens.
- `cases/screen-single_case_details/kits/detail-kit.jsx`, `detail-record.jsx`, `detail-screens.jsx`, `status-reps.jsx` — detail page frame, record data, screens, status representations.

## Rules

1. These files are **frozen**: only an *adopt* DR merges changes in.
2. Explorations never load these paths — they carry their own copies (snapshot isolation).
3. Load order for boards: design-canvas → core-kit → cpc → card-kit → screen kits.

## Integration contract (engineering handoff)

Each kit is a reviewed delta against **ds-global** (`_ds/`). When this workflow travels, this folder goes with the UI as the DS integration list.

- `kits/core-kit.jsx` — molecules. Consumes ds-global tokens (color, radius, type). Becomes: the **StatusBadge** component family (form + weight variants) in the core DS.
- `kits/cpc.jsx` — organism. Consumes core-kit + ds-global Card/Avatar/Badge patterns. Becomes: the **CasePreviewCard** component.
- `kits/card-kit.jsx` — organism. Consumes cpc + tokens. Becomes: CPC layout/scaffold variants.
- `kits/design-canvas.jsx` — project-only presentation infrastructure. Not shipped to the core DS.
- `kits/tweaks-panel.jsx` — project-only review infrastructure. Not shipped.
- `kits/atoms.jsx` — specimen content for the Atomic System board. Not shipped.
