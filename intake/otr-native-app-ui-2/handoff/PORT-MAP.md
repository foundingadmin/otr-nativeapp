# Port map

Which file is canon, what it becomes in Figma, and where the copies disagree. Nothing here was deleted. Losing copies stay exactly where they are.

Paths are relative to `design/` in this pack, which mirrors the CD project root.

---

## 1. Canon per file

| File | Canon path | Lines | Becomes in Figma |
| --- | --- | --- | --- |
| `core-kit.jsx` | `cases/_ds-cases/kits/core-kit.jsx` | 461 | StatusBadge family, ActionButton, Chip, Meter, Ticket, OverduePill, Thumb, AttorneyLockup |
| `cpc.jsx` | `cases/_ds-cases/kits/cpc.jsx` | 230 | CasePreviewCard, plus the case fixtures and the precedence helper |
| `card-kit.jsx` | `cases/_ds-cases/kits/card-kit.jsx` | 347 | CPC layout and scaffold variants |
| `feed-kit.jsx` | `cases/screen-all_cases_feed/kits/feed-kit.jsx` | 359 | Feed frame: status bar, app bar, filter row, feed list |
| `feed-assembled.jsx` | `cases/screen-all_cases_feed/kits/feed-assembled.jsx` | 366 | The 4 assembled feed screens |
| `detail-kit.jsx` | `cases/screen-single_case_details/kits/detail-kit.jsx` | 639 | Detail screen shell plus AccountRail, TicketHero, Identity, StatusZone, ActionHub, ActionItem |
| `detail-record.jsx` | `cases/screen-single_case_details/kits/detail-record.jsx` | 463 | CaseFacts, ExpandedRecord, ViolationList, CourtInfo, DocList, PaymentHistory, Timeline, HelpZone |
| `detail-screens.jsx` | `cases/screen-single_case_details/kits/detail-screens.jsx` | 98 | The 9 full detail screens. **Mounted by no board. See finding A.** |
| `status-reps.jsx` | `cases/screen-single_case_details/kits/status-reps.jsx` | 249 | Status representation study. Reference, not a product screen |
| `status-doc.jsx` | two divergent canon copies | 477 / 468 | Registry documentation boards. **See PORT-CONFLICT-001** |
| `atoms.jsx` | `cases/_ds-cases/kits/atoms.jsx` | 414 | Specimen content for the Atomic System board. Not a product surface |
| `design-canvas.jsx` | `cases/_ds-cases/kits/design-canvas.jsx` | 1039 | Nothing. Presentation infrastructure, never printed |
| `tweaks-panel.jsx` | `cases/_ds-cases/kits/tweaks-panel.jsx` | 542 | Nothing. Review infrastructure, never printed |
| `review-explorations.jsx` | `cases/screen-single_case_details/kits/review-explorations.jsx` | n/a | Nothing. Review chrome |

## 2. Duplication, and why it exists

Rule 1 of the CD project is "explorations copy, integration merges": an exploration folder carries its own snapshot of every kit so it cannot be broken by a change upstream. That is deliberate and correct for exploration. It means "the latest version" is a per file judgement, which is why this table exists.

| File | Copies | Distinct lengths | Read as |
| --- | --- | --- | --- |
| `design-canvas.jsx` | 15 | 1039, 1035 | 1035 copies are the older canvas shell, all in archive |
| `core-kit.jsx` | 11 | 461, 449, 443 | 461 is canon; 449 and 443 are frozen exploration snapshots |
| `cpc.jsx` | 10 | 230 | Every copy identical. No conflict |
| `card-kit.jsx` | 10 | 347, 308, 302 | 347 is canon and has moved well ahead of the snapshots |
| `detail-kit.jsx` | 4 | 639, 638 | 639 canon; the 638 in archive is one line behind |
| `detail-record.jsx` | 4 | 464, 463 | 463 is canon. The 464 in archive is **longer than canon**; check before assuming it is stale |
| `tweaks-panel.jsx` | 3 | 542 | Identical |
| `feed-kit.jsx` | 3 | 359 | Identical |
| `status-doc.jsx` | 3 | 477, 468, 466 | Two of these are canon. See below |
| `detail-screens.jsx` | 2 | 98 | Identical |

Print from canon only. The IR was extracted from the canonical boards, so if you work from `spec/ir/` you are already on canon; this table is for when you need to read source.

## 3. Known conflicts

**PORT-CONFLICT-001 • two canon copies of `status-doc.jsx` have diverged.**

```
component-case_preview_cards/kits/status-doc.jsx   477 lines   loaded by Case Preview Cards.html   → ProposedCPC
system-case_status_and_action/kits/status-doc.jsx   468 lines   loaded by Case Status and Action.html → BadgeActionSystem
```

The same file name, forked, each board loading its own. The MANIFEST records the copy as intentional ("also copied into component-case_preview_cards/kits/ for its CPC per-state board") but the two have since drifted by 9 lines. Both boards were extracted, so both renderings are in the IR and neither is lost. Needs a decision record: merge into one shared kit, or rename so the fork is explicit.

**PORT-CONFLICT-002 • `detail-record.jsx` in archive is longer than canon.** 464 lines in `archive/03-details-exploration/` against 463 in `kits/`. Almost certainly a trivial difference, but do not assume the archive copy is a subset.

## 4. Findings

**A • `DetailScreens` was mounted by nothing.** `detail-screens.jsx` declares 2 sections and 9 artboards of the real detail screen. `Single Case Details.html` mounts `CaseStatusReps` only, one artboard. The nine screens rendered nowhere and would have been invisible to a port.

Fix in this pack: `pipeline/mounts/detail-screens.html`, a mount page that exists only so those screens reach the IR and the PNG set. It is not a board and does not belong to a workstream. IR id `mount-detail-screens`, 9 artboards, 1,366 nodes. **Treat it as the canonical detail screen set.** CD should decide whether the canonical board starts mounting it.

**B • the canonical boards each mount one component.** Worth knowing before you go looking for missing artboards:

| Board | Mounts | Artboards |
| --- | --- | --- |
| Case Status and Action | `BadgeActionSystem` | 2 |
| Case Preview Cards | `ProposedCPC` | 5 |
| All Cases Feed | `FeedAssembled` | 4 |
| Single Case Details | `CaseStatusReps` | 1 |
| Atomic System | `Atoms` | 9 |
| pipeline mount | `DetailScreens` | 9 |

`StatusSeries` (18 artboards) is mounted by the `01-status-series` exploration, not by the system board. That is intentional; it is an exploration.

**C • four archive boards predate the canvas shell** and have no artboards to walk: `02-divergence-pass-1`, `03-variants-a-d`, `Board C detail pages`, `Board D flow moments`. Source travels in `design/`; they are simply not in the IR.

**D • `record-content.jsx` is orphaned at the CD project root.** The exploration that owns it (`cases/screen-single_case_details/explorations/03-record-content/`) carries its own copy. The root file was left in place rather than moved, because nothing in this pack deletes or relocates design work without a decision. It travels in `design/record-content.jsx`. CD should decide whether to archive it.

## 5. Assets

| Asset | Was | Now |
| --- | --- | --- |
| Firm team photo | 33 KB base64 inside `core-kit.jsx` | `assets/firm-team.png` |
| Firm team source | 343 KB base64 in `cases/_ds-cases/kits/firm-team.b64.txt` | left in place, travels in `design/` |
| Reference screenshots | `screenshots/`, `uploads/`, `reference/` | `reference/` |

Attorney and user portraits are CSS silhouettes, not photographs. In Figma they should be image placeholders with a note, not vector art. Real headshots are an OTR asset request.

## 6. Design system dependency

Small, and that is the good news. The only thing the kits import from the bound DS bundle is `FeatureIcon`. Everything else is authored against CSS variables or raw hex. So the port depends on:

- `_ds/.../tokens/*.css` for the token values and the Figma variable dump
- `FeatureIcon` from `_ds/.../_ds_bundle.js`, which renders Streamline Flex Solid glyphs, with a Font Awesome fallback

Icon names used by the kits are Streamline Flex Solid names (`bill-dollar-2`, `file-edit`, `open-folder`, `gavel`, `triangle-arrow-synchronize-1`, and so on). In Figma these should be instances from the OTR icon library, matched by name. Where a name has no match in the library, print the glyph as a placeholder frame with the name visible and add it to the diff page. Do not draw icons by hand.
