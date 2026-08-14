# Print brief • 03 Record content

Promotes the record content exploration into the print queue. Added Aug 11, 2026. Read `PROTOCOL.md` and `FIGMA-PRINT-GUIDE.md` first; this brief only adds what is specific to this board.

## Source

| | |
| --- | --- |
| IR | `spec/ir/exp-03-record-content.json` • 9 artboards, 532 nodes |
| Board | `design/cases/screen-single_case_details/explorations/03-record-content/Record Content.html` |
| Kit | `record-content.jsx` in the same folder (the local board kit; shared kits are the usual copies) |
| Brief | `BRIEF.md` in the same folder • the design intent, verbatim |
| Reference PNGs | `reference/png/exp-03-record-content/01..09-artboard.png` |

**IR freshness.** Extracted in the Jul 28, 2026 export and still current: every kit source is byte-identical to the extract-time mirror. The only change to the board file since is the review-notes annotation layer, which is chrome and not in the IR. Do not re-extract.

## Print stance: Proposed, not Screens

This board is stage `exploration`. DR-CD-002 has not closed and two inputs are blocked (F-2, F-3 below). Per PROTOCOL.md section 5: build the components in the ① workshop, then print all 9 artboards to page ③ **Proposed** with OPEN markers. Nothing from this board goes to ② Screens or anywhere near ⑤ until the decision record closes.

## Component mapping • best DS match

Build in this order on page ①. Where a live DS component is the honest match, instance it; where the module is net-new, build it from DS atoms and name it as below.

| Board module | Print as | Best discovered match |
| --- | --- | --- |
| RecordFields | `OTR/Cases/CaseFacts` • variant `expanded=false/true` | Extends the existing CaseFacts organism from `mount-detail-screens` (same `.facts` / `.frow` anatomy). Do not fork it; add the variant and the new rows. Show more toggle is the DS Link pattern in brand blue. |
| FirmBlock | `OTR/Cases/FirmProfile` | Net-new. Nearest composite is DS `AttorneyCard`; reuse its avatar + `Rating` stars + Card shell. Stat triptych is new. |
| ReceiptPaid / ReceiptPlan | `OTR/Cases/Receipt` • variant `state=paid/plan-overdue` | Fee lines are the DS `PaymentLineItems` pattern. Header tag is a Badge pill. Installment rows are a new molecule: `OTR/Cases/InstallmentRow` • `state=overdue/done/upcoming` (upcoming carries the dashed border). |
| Transactions | `OTR/Cases/Transactions` | Rows are a new molecule `OTR/Cases/TransactionRow` • `state=settled/upcoming`, standard DS list-row anatomy. |
| TxnDetail | `OTR/Cases/TransactionDetail` | Net-new. Key-value rows follow the Receipt line pattern; Download invoice is a DS secondary pill button. |
| Participants / ParticipantsManage | `OTR/Cases/Participants` • variant `mode=view/manage` | Net-new. Rows are `OTR/Cases/ParticipantRow` • `removable=true/false`, DS `Avatar` as the head. Remove is a small destructive pill; This is you is a neutral Badge. |

Icons are Streamline Flex Solid instances matched by name: `open-folder`, `hashtag`, `building-1`, `location-pin`, `countdown-timer`, `warning-triangle`, `shield-check`, `bill-dollar-2`, `car-1`, `copy-paste`, `receipt-1`, `credit-card-1`, `calendar-check`, `bolt`, `hourglass`, `download-tray`, `multiple-users-1`, `user-square-single`, `add-circle`, `delete-circle`, `chevron-*`. Unmatched names go to the diff page as placeholder frames, per PORT-MAP section 6.

## Variable binding

IR paint decisions: 44 BIND, 82 BIND_NEAREST, 157 BIND_NEAREST_AND_FLAG, 6 DS_REQUEST. Honour every action through `token-resolve.js` as usual. Specific to this board:

- `.rc-mod-tag.paid` success pair `#127a43` on `#e4f7ec`; check it lands on the sentiment green ramp, flag if it drifts.
- `--money` (overdue accent, Remove buttons) is the known money-accent DS_REQUEST from `VARIABLE-GAPS.md`; it already has a diff entry, do not duplicate it.
- `--wf-*` neutrals resolve through `figma-variable-map.json` exactly like the detail kits.
- Type prints as Figtree at IR size, weight, line height, letter spacing (guide section 4). Radius 999 binds to the full radius token.

## Do not print

The usual scaffolding list (guide section 6), plus board-specific: `.rc-cap` caption paragraphs inside artboards are reviewer annotation, not product UI; `#__boardPath`; the review-notes layer. Reference PNGs are letterboxed on the canvas cream `#f0eee9`; the artboard is the white card only.

## OPEN markers to print with the frames

| Marker | What is open |
| --- | --- |
| OPEN • field order | The record field sequence is expected to re-sequence; order on the board is not ratified. |
| OPEN • F-2 firm stats | The firm profile stat set (reviews, clients booked, success rate, years with OTR) is placeholder structure; source of truth is Alex's screenshot, still blocked. |
| OPEN • F-3 participant permissions | Add and remove affordances are placed but gated; who can add or remove is pending Alex's confirmation. |
| OPEN • DR-CD-002 | The decision record that closes this exploration is not yet written. |

## Naming

```
Components   OTR/Cases/Receipt, OTR/Cases/FirmProfile, ...
Frames       OPEN · Record content / Record · collapsed
             OPEN · Record content / Receipt · payment plan + overdue
```

Keep the IR artboard id (`rc-collapsed`, `rc-receipt-plan`, ...) in the frame description; that is the read-back join key.

## After the print

Write the run into `canon/` per PROTOCOL.md section 6, and add the three F-2 / F-3 / field-order items to `variable-requests.md` only if they surface variable gaps; otherwise they belong in `drift.json` as open decisions awaiting CD.
