# Brand Config — Off The Record Design System

This file is the **instance configuration** for running Sweden in this repo.
It contains every value that is specific to the Off The Record brand.

Status: **LIVE — first print session completed (pass 1 + DR-aligned pass 2).**

---

## Identity

| Key | Value |
|---|---|
| Brand name | Off The Record |
| Wordmark casing | Off The Record (OTR in product shorthand, e.g. case ids `OTR-47210`) |
| Visual tool file key | `JcqKNz1pMrEvxwExhb296r` |
| Target file | "Native App / Design" |
| Variables source | **Customer side / Guidelines library** (team library, not local) |

**Library caveat:** the target file consumes variables from the Guidelines
library. Library variables cannot be created from the consuming file — new
variables require a DS update request to the design team (see
`canon/variable-requests.md`). Binding uses
`figma.variables.importVariableByKeyAsync(key)` with the keys below.

**Library naming caveat:** the live library palette is fruit-named
(`blueberry` blues, `cherry` reds, `grape` purples, `honey` ambers, `lime`
greens, `ink` neutrals, plus `watermelon`, `coral`, `periwinkle`) with
`components/*` and `global/*` semantic collections. The CD handoff's
`binding-report.json` candidates (`colors/error/500` etc.) do NOT exist live;
every binding this session was re-resolved against the live library with
CIEDE2000. Thresholds: ΔE < 2 silent bind, 2–5 bind + flag on ④ Diffs,
> 5 raw value + DS request.

---

## Font

Family: **Figtree** (product UI). Weights used: Regular (400), SemiBold (600),
Bold (700), ExtraBold (800).

```js
await Promise.all(['Regular', 'SemiBold', 'Bold', 'ExtraBold'].map(style =>
  figma.loadFontAsync({ family: 'Figtree', style })));
```

**Ticket exception:** the skeuomorphic citation (`OTR/Cases/Ticket`) is
authored in Courier New, which is unavailable in Figma. Printed in
**Roboto Mono** — OPEN decision on ③ Proposed.

---

## Visual Tool Pages and Sections

Agent surfaces live as sections on the `↪ Cases` page (`11158:4451`) inside
the client's existing file structure:

| Section | Node ID |
|---|---|
| ① Components (agent) | `11262:1588` |
| ② Screens (agent) | `11285:396` |
| ③ Proposed (agent) | `11287:1655` |
| ④ Diffs (agent) | `11287:1672` |
| ⑤ Ready for dev | human-owned, not created by agents |

---

## Component Node ID Reference

| Component | Node ID | Variants |
|---|---|---|
| OTR/Cases/StatusBadge | `11262:1769` | 60 (status × form × size; no unread axis yet) |
| OTR/Cases/ActionButton | `11274:1577` | 20 (kind × size × full) |
| OTR/Cases/Chip | `11276:1553` | 8 (on × count × alert) |
| OTR/Cases/ClassifTag | `11276:1558` | 2 (classif, charge) |
| OTR/Cases/AttorneyLockup | `11278:295` | 8 (blurred × quote × size 38/52) |
| OTR/Cases/Meter | `11278:305` | 5 (value 0–100) |
| OTR/Cases/OverduePill | `11278:306` | 1 |
| OTR/Cases/Ticket | `11279:303` | 6 (cream/blue/green/pink/slate/photo) |
| OTR/Cases/CasePreviewCard | `11280:763` | 18 (15 statuses + unfinished/analyzing-brand/tap) |
| OTR/Cases/Detail/StatusZone | `11281:351` | 1 |
| OTR/Cases/Detail/AppBar | `11281:357` | 1 |
| OTR/Cases/Detail/TicketHero | `11281:365` | 1 |
| OTR/Cases/Detail/Identity | `11281:381` | 1 |
| OTR/Cases/Detail/ActionItem | `11281:393` | 1 |
| OTR/Cases/Detail/ActionHub | `11281:407` | 1 |
| OTR/Cases/Detail/CaseFacts | `11281:425` | 1 |
| OTR/Cases/Detail/ExpandedRecord | `11281:447` | 1 |
| OTR/Cases/Detail/HelpZone | `11281:482` | 1 |

AccountRail: listed in FIGMA-PRINT-GUIDE but absent from the IR — not printed
(OPEN card on ③).

## Screen Frame Reference

| Screen | Node ID | IR join key |
|---|---|---|
| Cases / Feed / solo · 1 active | `11285:397` | `p-solo` |
| Cases / Feed / light · 1 active | `11285:462` | `p-light` |
| Cases / Feed / heavy · 5 active | `11285:594` | `p-heavy` |
| Cases / Feed / empty · no cases yet | `11285:1038` | `v-empty` |
| Cases / Detail / active · clean | `11285:1056` | `active-clean` |
| Cases / Detail / needs signature | `11285:1142` | `loe` |
| Cases / Detail / counter offer | `11285:1246` | `counter` |
| Cases / Detail / loe + counter | `11285:1350` | `concurrent` |
| Cases / Detail / overdue · past due | `11285:1468` | `overdue` |
| Cases / Detail / rematching | `11285:1576` | `remarket` |
| Cases / Detail / dismissed | `11285:1650` | `dismissed` |
| Cases / Detail / not booked | `11285:1736` | `notbooked` |

## Semantic Variable Reference

Import keys for every variable bound this session (Guidelines library):

| Variable | Key | Bound for |
|---|---|---|
| colors/ink/950 | `d3d7ff7919807dfd72a4dc4911ec87b33d603e73` | wf-ink text/fills (ΔE 1.55) |
| colors/ink/800 | `dde96eac00002b25e4df80eb5db40cc095e202b6` | wf-strong, meter bar, rating (ΔE 2.63 FLAG) |
| colors/ink/600 | `af636c456e595a7b521c6946543abd91f582f4f5` | wf-muted tertiary text (ΔE 3.64 FLAG) |
| colors/ink/300 | `8127ec9a256b88b334d52494c4a748386675c9ce` | wf-faint (ΔE 4.16 FLAG) |
| colors/ink/100 | `e789d73b65b654d22ed349d3035f9ad2b1f36a6b` | photo placeholder dark stop |
| colors/ink/50 | `36b9540f7ed23261f3a8702b8af32470f90f8013` | photo placeholder light stop |
| colors/cherry/500 | `dbb04fd92aaf6e6cd4f39bd09fb3f0002b7ee957` | money accent (ΔE 2.61 FLAG) |
| colors/cherry/100 | `2a218e9c492d06d5eb9b85774c6a9be25c4ab8a5` | money-line (ΔE 2.36 FLAG) |
| colors/cherry/25 | `b798ae4c47bcfe6a66824be4a548ac5a172b7690` | money-bg (ΔE 2.92 FLAG) |
| colors/blueberry/500 | `6bee5bc7aaa4ed722a98b991283187fda9a57c36` | otr-blue (ΔE 4.51 FLAG) |
| colors/grape/500 | `4545830a40c810240133dc45f660bee1af417c8e` | grad stop 2 (ΔE 3.34 FLAG) |
| colors/honey/500 | `3336374a685cf65b610e975c35b2e3f446e84b94` | amber accents |
| colors/honey/25 | `ca09fc8197ade94557b92d4dc0c871837e5c8f72` | action item amber fill |
| colors/alpha/light/20 | `fbb02f910c0ebbbe92cd0ab30487d6ce8915304a` | on-chip count bg (design 22%) |
| global/background/default | `90a77fdcd2961eb79eb3d5c8b8159f453d80d849` | white fills |
| global/background/strong | `94ec2f99f4d126ad77f9f94b8c93f15c0b85766b` | wf-fill (ΔE 1.14) |
| global/border/neutral/light | `2e9b5493c4e28758f74749adf58583d41a04d42d` | wf-line borders (ΔE 1.28) |
| global/foreground/dark/primary | `8939924c69631ed6029ce1e9cd53c10687361083` | ink labels on light |
| global/foreground/light/primary | `e05d77c21b08df7ca3ce80e39baf026cf3b73840` | white labels on solid |
| radius/FULL | `a95f485680b5d91600397f3608161b1f6e64ee47` | every pill radius |

Raw values in use (DS requests, see ④ Diffs): `#5b63ff` grad stop 1,
`#f79009` alert dot, `#7a2e0e` amber ink, `#fbfcfd` screen bg, `#fbfbfc`
zone header tint, `#10141e` @50% hero chip, ticket paper palette, wireframe
silhouettes `#545c6a` @50%.

## Variable Collection IDs

Confirmed at runtime each session via
`figma.teamLibrary.getAvailableLibraryVariableCollectionsAsync()`. Collections
present: `primitives`, `semantic variables`, `radius`, `spacing`,
`responsiveness`, `light/dark primitives` (all "Customer side / Guidelines").

---

## Design Rules

- Pill radius binds `radius/FULL`, never a literal 999.
- Radius 16 (cards) has **no matching radius token** — printed raw; candidate
  for a DS request.
- Product type is Figtree even where boards render the system UI stack.
- DR-CPC-001: CPC header = uppercase eyebrow `ISSUED · MON YYYY` over
  location headline; one hollow violation pill (charge + overflow count);
  no filled classif tag, no court-date line. Attorney identity shows the firm
  name, never an individual; rating stars are ink, not gold.
- DR-CPC-002: grouped alerts are tinted whole-block taps with an edge
  chevron; no separate CTA button inside the alert block.

## Copy and Voice

- No em dashes anywhere; use commas, periods, semicolons, or `•`. Board copy
  containing em dashes was adjusted at print time (OverduePill, HelpZone,
  analyzing metaline).
- Sentence case everywhere. Second person, active voice. No emoji in UI.
- Trust language near decisions: money back guarantee, secure checkout,
  no court, no points, cancel anytime.
