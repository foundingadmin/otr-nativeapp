# Print brief • 06 Full case details

Promotes the full case details board into the print queue. Added Aug 14, 2026. Read `PROTOCOL.md` and `FIGMA-PRINT-GUIDE.md` first; this brief only adds what is specific to this board.

## Source

| | |
| --- | --- |
| Board | `design/cases/screen-single_case_details/explorations/06-full-case-details/Full Case Details.html` |
| Local kits | `case-shell.jsx` (app bar, hero, legal team card, action toast, tab group), `case-record.jsx` (tab content), `payments-lab.jsx` (Payments divergences and deeper states), `full-case-details.jsx` (board assembly and frame heights) |
| Shared kits | the usual copies in the same folder: `design-canvas`, `core-kit`, `cpc`, `card-kit`, `detail-kit`, `detail-record` |
| Brief | `BRIEF.md` in the same folder • the design intent, verbatim |
| Ledger | `design/cases/screen-single_case_details/LEDGER.md` • DR-CD-006 recorded, DR-CD-005 still open |
| IR | **Not yet extracted.** This board is newer than the Jul 28, 2026 export. |

**IR first.** The board is registered in `Canon Export.html` as `exp-06-full-case-details`. Run the export before printing so `spec/ir/exp-06-full-case-details.json` exists, then print from the IR, not from the DOM. Reference PNGs for this board do not exist yet either; capture them in the same pass.

## Print stance: Proposed, not Screens

Stage `exploration`. DR-CD-005, the Ticket and Case tab architecture, has not closed, and the Payments sub-tab is an open three-way choice. Per PROTOCOL.md section 5, build the components in the ① workshop, then print all fourteen artboards to page ③ **Proposed** with OPEN markers. Nothing here goes to ② Screens or ⑤ until DR-CD-005 closes.

## What is new on this board

The static versus dynamic split. The ticket comes from the citation, a permanent external document, so it never changes. The case is the live record around it. That difference is the top-level navigation.

```
CaseDetailScreen
  zone 1  app bar        back · Case ID #OTR-12345 · overflow        (chat icon variant, not taken)
  zone 2  hero           issued eyebrow · location headline · lifecycle badge · court date line
  zone 3  legal team     firm identity + unread message, whole card opens case chat   ← DR-CD-006
  zone 4  action toast   persistent, sits ABOVE the tabs so it holds on every tab
  zone 5  tab group      segmented Ticket | Case, then underline sub-tabs inside Case
  zone 6  tab body       Ticket · static      Case · Overview | Documents | Payments · dynamic
```

## Component mapping • best DS match

Build in this order on page ①. Instance a live DS component where it is the honest match; build from DS atoms where the module is net-new, and name it as below.

| Board module | Print as | Best discovered match |
| --- | --- | --- |
| `CScreen` app bar | `OTR/Cases/CaseAppBar` • variant `chat=false/true` | Extends the `dappbar` anatomy already printed from `detail-kit`. The chat variant carries a counted badge; print it, mark it not taken. |
| `CHero` | `OTR/Cases/CaseHero` • variant `photo=none` | Net-new and the replacement for the printed `TicketHero` photo hero. Type is Figtree 800, 32px, -1px tracking on the headline; eyebrow 11.5px 800, 0.9px tracking, uppercase. Badge is the existing `StatusBadge` instance, `active`. |
| `LegalTeam` | `OTR/Cases/LegalTeamCard` • variant `preview=true/false` | Nearest DS composite is `AttorneyCard`. Reuse its avatar and `Rating` stars inside a Card shell. The message strip and the unread pill are new; unread pill is a Badge on brand blue. |
| `ActionToast` | `OTR/Cases/ActionToast` • intent `info` | DS `Banner` is the honest match, tinted, not solid. Brand blue for a non critical action, per the Jul 28 call. Trailing pill is a DS Button, size sm. |
| `ttabs` | `OTR/Cases/TabsPrimary` • 2 up | DS `SegmentedControl`. Pill track, white active pill, small leading icons. |
| `stabs` | `OTR/Cases/TabsSecondary` | DS `Tabs`, underline style, brand blue indicator. Count badge only where the number is literal, Documents. |
| `TicketTab` | `OTR/Cases/TicketRecord` • variant `photo=true/false` | Photo state is a placeholder image frame plus two secondary pills. No-photo state instances the coded ticket, `OTR/Cases/CodedTicket`, already in the workshop from the CPC work, plus a dashed prompt card. Field list extends the existing `CaseFacts` organism, read only. |
| `OverviewTab` | `OTR/Cases/CaseOverview` | Extends printed `CaseFacts`. New rows: Payment plan summary, Participants. Participants rows are `OTR/Cases/ParticipantRow` from the 03 brief, do not fork. |
| `DocsTab` | `OTR/Cases/DocumentsTab` | Extends printed `DocList`. New: the sort control in the card header, `OTR/Cases/SortToggle` • variant `order=newest/oldest`, a small secondary pill with a Font Awesome caret. Upload block is the printed `UploadDocs`. |
| `PayTab` variant A | `OTR/Cases/PaymentsTab` • variant `layout=ledger` | Charges rows are the DS `PaymentLineItems` pattern. Plan is `OTR/Cases/InstallmentPlan`. Transaction rows are `OTR/Cases/TransactionRow` from the 03 brief, plus a trailing chevron. |
| `PayVariantB` | `OTR/Cases/PaymentsTab` • variant `layout=balance-folded` | Balance card is net-new, `OTR/Cases/BalanceCard`. Disclosure rows are standard DS list rows with chevrons. |
| `PayVariantD` | `OTR/Cases/PaymentsTab` • variant `layout=balance-ledger` | Same `BalanceCard` head, then the A ledger with no second plan card. |
| `TxnReceiptScreen` | `OTR/Cases/TransactionDetail` | Already specced in the 03 brief. This board adds the pushed screen shell and the amount hero. Reuse, do not duplicate. |
| `PayOverdue` / `PayPaidInFull` | `OTR/Cases/InstallmentPlan` • state `late/settled` | Late state carries the money accent on the row and the progress fill. |

Icons are Streamline Flex Solid instances matched by name: `padlock-circle-2`, `padlock-shield`, `open-folder`, `chat-bubble-oval-smiley-1`, `user-identifier-card`, `user-friendship-group`, `shield-check`, `image-photo-add`, `file-document-info-quick-reference`, `file-check`, `file-report`, `bill-dollar-2`, `calendar-check`, `countdown-timer`, `location-pin`, `location-compass-1`, `building-1`, `warning-triangle`, `warning-octagon`, `information-circle`, `add-circle`, `download-tray`, `cloud-upload`, `camera-1`, `files-and-folders`, `check-thick`, `star-1`, `chevron-left`, `chevron-right`. Unmatched names go to the diff page as placeholder frames, per PORT-MAP section 6. **One exception:** the Documents sort control uses a Font Awesome glyph, `fa-arrow-down-short-wide` and `fa-arrow-up-short-wide`. Print it as the nearest Streamline sort glyph and flag it on the diff page.

## Variable binding

Resolve every paint through `token-resolve.js` as usual. Specific to this board:

- Brand blue `#2e6bff` carries the action toast, the sub-tab indicator, the unread pills and the plan bar. It binds to the interactive blue, the same near match already flagged in `VARIABLE-GAPS.md`. Do not duplicate the entry.
- Toast surface `#e9f1ff` on border `#cfe0ff` with ink `#1d52cc` is the info tint set. Check it lands on the blue ramp.
- `--money` `#e5463a` on `#fdeceb` with border `#f7c9c4` carries the late installment. Known DS_REQUEST, already logged.
- Success pair `#0f7a41` on `#e4f7ec` on the receipt Paid badge, and `#19a558` on transaction status text. Same sentiment green as the 03 board.
- `--wf-*` neutrals resolve through `figma-variable-map.json` exactly like the detail kits.
- The coded ticket paper keeps its cream pair `#fdf3c6` to `#f6e6a2` with sepia ink `#6b4f1d`. It is deliberately outside the ramp, print as a diff swatch, do not bind.
- Radius: cards 16 to 18, pills and progress tracks 999, inputs and photo frames 14. Type prints as Figtree at IR size, weight, line height and letter spacing.

## Frame inventory

Fourteen artboards, all 390 wide. Section order on the board is the order to print.

| Section | Frames |
| --- | --- |
| Case Details · Ticket and Case | Ticket · the static record 1600 · Case · Overview, the default 1664 · Case · Documents 1168 · Case · Payments 1396 |
| Case · Payments · the open decision | A · full ledger, as built 1396 · B · balance first, ledger folded 1142 · D · balance card, then the full ledger 1362 |
| Payments · the deeper states | Transaction · its own receipt 640 · Plan · installment late 528 · Plan · paid in full 536 |
| Getting into case chat | Firm card is the door · decided 492 · Chat icon in the app bar · not taken 492 · Both, card and app bar · not taken 492 |
| Ticket tab · no photo yet | Ticket · photo missing 1670 |

The three chat frames and the two plan states are crops, not whole screens. Print them at the given height with the content top aligned; do not pad them out to a device height.

## Do not print

The usual scaffolding list (guide section 6), plus board specific: the `.fnote` reviewer footnotes inside artboards are product microcopy and **do** print; the DCSection titles and subtitles do not. `#__boardPath` does not print. `PayVariantC`, the retired segmented Receipt against Transactions version, is in `payments-lab.jsx` but has no artboard, do not print it.

## OPEN markers to print with the frames

| Marker | What is open |
| --- | --- |
| OPEN • DR-CD-005 | The Ticket and Case tab architecture is not ratified. Every frame on this board depends on it. |
| OPEN • Payments layout | A, B or D. The CEO has seen all three and liked the balance card; the pick is not made. |
| OPEN • sub-tab naming | Overview, inside Case, is a placeholder. Updates, Status and Case facts are candidates. |
| OPEN • ticket artifact | In the no-photo state the coded ticket repeats three fields the list below also carries. Undecided whether the artifact carries data or is purely a stand-in. |
| OPEN • F-3 participant permissions | Manage participants is placed but gated. Who can add or remove is still pending Alex. |
| OPEN • F-2 firm stats | The legal team card shows the rating only. The fuller firm profile waits on Alex's screenshot. |

## Decided, print without a marker

| Decision | Where |
| --- | --- |
| DR-CD-006 • the legal team card is the door into case chat, no app bar chat icon | LEDGER.md, Aug 14, 2026 |
| The hero is not the ticket photo. Ticket data lives in the Ticket tab | Jul 31 sync |
| Action needed sits above the tabs so it holds on every tab | Jul 31 sync |
| Non critical actions use brand blue, not amber | Jul 28 sync |
| Payments separates Statement of charges from Payment history | Jul 31 sync |
| Progress reads as installments, 2/3, never a percentage | Aug 14 review |
| The plan action clears a balance due, it is not a pay ahead | Aug 14 review |

## Naming

```
Components   OTR/Cases/CaseHero, OTR/Cases/LegalTeamCard, OTR/Cases/BalanceCard, ...
Frames       OPEN · Full case details / Ticket · the static record
             OPEN · Full case details / Case · Payments · B · balance first
```

Keep the IR artboard id (`fcd-ticket`, `fcd-overview`, `fcd-pay-b`, `fcd-receipt`, ...) in the frame description; that is the read-back join key.

## After the print

Write the run into `canon/` per PROTOCOL.md section 6. Add the Font Awesome sort glyph to `variable-requests.md` only if it surfaces an icon gap; the six OPEN items above belong in `drift.json` as open decisions awaiting CD.
