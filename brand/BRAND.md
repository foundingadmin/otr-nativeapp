# Brand Config — Off The Record Design System

This file is the **instance configuration** for running Sweden in this repo.
It contains every value that is specific to the Off The Record brand.

Status: **LIVE — print + binding integrity complete; Native type collection ratified and bound. Preflight: canon/INDEX.md.**

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

Sub-pages of `↪ Cases` (session 4): `↪ Explorations` page `11337:2087`
(agent, exploration prints land here); `↪ Archive` page `11158:8460`
(retired frames; first-run Test debris moved here); `↪ Proposed` page
`11368:3`; `↪ Proto` page `11382:38949` with section ① Tools (agent)
`11414:1529` — stretchy `OTR/Mock/Chrome` set `11389:13975` (8 variants,
part × os × tone, all auto layout) and two resize-anywhere rigs, direct
section children so they stay presentable: `Rig · apple` `11410:4926`
(starts 393×852), `Rig · android` `11410:5405` (starts 412×917).
Retired session 4n to Archive as DEPRECATED/: `OTR/Mock/Device`
`11376:2353`, `OTR/Mock/Slot` `11375:2221`, Mock test bench
`11383:19378`. CPC v2 diff card: `11338:1922` on ④ Diffs.

---

## Component Node ID Reference

| Component | Node ID | Variants |
|---|---|---|
| OTR/Cases/StatusBadge | `11262:1769` | 60 (status × form × size; no unread axis yet) |
| ~~OTR/Cases/ActionButton~~ | archived (Archive page) | superseded by DS Button `624f386331f5011ab67eba8f318994a7fbff4369` (Solid-brand / Solid-error / Outline-neutral / Gradient-brand; see DS Button adoption diff) |
| OTR/Cases/Chip | `11276:1553` | 8 (on × count × alert) |
| OTR/Cases/ClassifTag | `11276:1558` | 2 (classif, charge) |
| OTR/Cases/AttorneyLockup | `11278:295` | 8 (blurred × quote × size 38/52) |
| OTR/Cases/Meter | `11278:305` | 5 (value 0–100) |
| OTR/Cases/OverduePill | `11278:306` | 1 |
| OTR/Cases/Ticket | `11279:303` | 6 (cream/blue/green/pink/slate/photo) |
| OTR/Cases/CasePreviewCard/Incomplete | `11344:2108` | 6 (form × signal none/urgency/warrant) |
| OTR/Cases/CasePreviewCard/Active | `11344:2109` | 12 (form × signal none/unread/sign/counter/rematch/overdue) |
| OTR/Cases/CasePreviewCard/Resolved | `11344:2110` | 6 (form × signal none/unread/overdue) |
| OTR/Cases/CasePreviewCard/Dismissed | `11344:2111` | 8 (form × signal none/review/unread/overdue) |
| OTR/Cases/CasePreviewCard/Cancelled | `11344:2112` | 8 (form × signal none/warrant/moneyback/unread) |
| OTR/Cases/CasePreviewCard/SmartMatch | `11344:2113` | 6 (phase matching/matching-brand/rematching/quote/quote-urgent/expired, card only) |
| OTR/Cases/CasePreviewCard/Incomplete draft | `11280:698` | 1 (meter + booking CTA, quote-CTA verdict pending) |
| OTR/Cases/SignalBlock | `11341:26731` | 12 (tone error/warning/info/success/match/inactive × density block/line); nested OTR/Icons instance swappable, hidden amount/body override slots |

The former 53-variant CasePreviewCard set is dissolved (family split per the
badge-rule board); variant node ids survive inside the family sets, screen
instances intact. Deprecated to the Cases Archive page: deadline, missed,
counter, active-action, reassigned, tap. `OTR/Icons/*`: nine icon
components `11340:1948`-`11340:1972` (warning-triangle, warning-circle,
chat-bubble-typing-oval, file-edit, briefcase-dollar, ai-sparkles, star-1,
bill-dollar-2, time-history-off).
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
| global/foreground/dark/primary | `8939924c69631ed6029ce1e9cd53c10687361083` | ink labels on light; Lexicon titles |
| global/foreground/dark/secondary | `7a0bc428cc7d5c31321e9d35754747c8ac8c958d` | unused: resolves within 18 RGB of primary |
| global/foreground/dark/tertiary | `1e056d0f465c79084ec1984bf9285fdde8ce45ae` | Lexicon body/desc text |
| global/foreground/dark/quaternary | `b6fb57b805b83eab3a3c5fa1e2a8d71539f7fbfc` | (mapped, unused) |
| global/foreground/dark/quinary | `7c72ee4bdb2f67dbc25bff8a069d009e3c8033f3` | Lexicon captions/tags; index desc precedent |
| global/foreground/light/primary | `e05d77c21b08df7ca3ce80e39baf026cf3b73840` | white labels on solid |
| global/border/neutral/default | `bee2429384afeb37061af72682c5c8e035b54b17` | demo well strokes (D-013) |
| brand/50 | `435c614a3c985051679454cfd7dae62d0218c7da` | plate fill (D-013) |

Radius tokens (full map, session 4q): 3XS 6 `c6fd93ce`, 2XS 8 `a80bba8c`,
XS 12 `4d768c1c`, SM 14 `f0d32d90`, MD 16 `55464a75`, LG 18 `1b148a1a`,
XL 20 `2ed187a9`, 2XL 24 `b88dec1b`, 4XL 32 `639921c1`, 5XL 36 `6c6e4885`,
FULL `a95f4856` (short prefixes; full keys resolve via team library).
Spacing tokens: none 0, 5xs 2, 4xs 4, 3xs 6 `6459000b`, 2xs 8 `43df441b`,
xs 12 `d1c9c214`, sm 14, md 16 `be36ab2a`, lg 18, xl 20 `27c15b5f`,
2xl 24 `67cca52a`, sxl 28, 4xl 32, 5xl 36, 6xl 40 `1b1c1447`, 7xl 44,
8xl 48 `82a97643`, 9xl 52, 10xl 56, 11xl 64 `b988fbbe`, 12xl 80,
13xl 96 `93026106`, 14xl 128, 15xl 140. There is no radius token near 80;
the D-013 plate radius stays raw pending a DS request.
| radius/FULL | `a95f485680b5d91600397f3608161b1f6e64ee47` | every pill radius |
| error/25 | `bae9985c720078feabbbbcba1cf59186bdfa3f11` | red block bg (ΔE 0.54) |
| error/600 | `279bb8c2905a03fe2cb0a332d5ae722253307a0b` | red dot, icon, chevron (ΔE 0) |
| error/800 | `1beae9fc75b447c4e60456b2155fc8c24845c479` | red block ink (ΔE 4.15 FLAG) |
| brand/25 | `f05bc44aeee9cceb08be4d37fa0dd2b95b0396fa` | blue block bg (ΔE 1.01) |
| brand/600 | `2cc478c5d0aa0862fd89de270aa82aca0d676ab8` | blue dot, icon, chevron (ΔE 0 vs #155eef) |
| brand/800 | `c1d7bb9246d973793b5cd8cddd889f81ac10b1a1` | blue block ink (ΔE 1.82) |
| success/50 | `4fba1271e2a1e26e8f09bd2ee443ac221de2dae4` | green block bg (ΔE 5.03 FLAG) |
| success/600 | `258d903b8a7e732a7955d95bca7e690e54218812` | green dot, icon, chevron (ΔE 3.12 FLAG) |
| success/900 | `5ac865b8ba3c8e0e485c427e03bd0b5caa9bfdbb` | green block ink (ΔE 3.74 FLAG) |
| accent2/25 | `f251b2740c6572f49a7daf07ac159e0dda7f3284` | violet block bg (ΔE 3.64 FLAG) |

Raw values in use (DS requests, see ④ Diffs): `#5b63ff` grad stop 1,
`#f79009` alert dot + amber block accents, `#7a2e0e` amber ink, `#6a5bd0` /
`#5b4bb8` rematch violet accent + ink (session 4), `#fbfcfd` screen bg,
`#fbfbfc` zone header tint, `#10141e` @50% hero chip, ticket paper palette,
wireframe silhouettes `#545c6a` @50%.

Binding note (reframed session 4p): semantic `global/foreground/*` and
`global/background/*` variables are **mode-aware** — the DS ships
light/dark modes, and the session 1 "flip" was modes working. Bind the
semantic foreground/dark ramp for text that should flip with mode
(canvas furniture does, Lexicon precedent); bind `colors/ink/*`
primitives only to mode-lock a color. Product text is currently
primitive-bound (mode-locked); migration to the semantic ramp is an
OPEN candidate in canon/INDEX.md. Tap block radius 14 printed raw (no
token, same as card 16).

## Text Style Reference

**RATIFIED: the Native collection** (local to this file; publish-to-library
ask pending with the design team). One axis per level, integer ladder
25 / 20 / 16 / 14 / 13 / 12 / 11 / 10, Figtree throughout:

| Style | Spec | Carries |
|---|---|---|
| Native/Title/Page | ExtraBold 25, ls -0.3 | page titles |
| Native/Title/Hero | ExtraBold 20, ls -0.3 | hero locations, quotes |
| Native/Title/Section | Bold 16, ls -0.2 | card titles, app bar |
| Native/Title/Subsection | ExtraBold 14 | zone and action headers |
| Native/Text/Large/Standard | Regular 13 | prominent running text |
| Native/Text/Large/Action | Bold 13 | badges, values, taps |
| Native/Text/Regular/Standard | Regular 12 | metalines, notes |
| Native/Text/Regular/Action | Bold 12 | tabs, timers |
| Native/Text/Regular/Highlight | SemiBold 12 | chips, medium emphasis |
| Native/Text/Small/Standard | Regular 11 | subs, captions |
| Native/Text/Small/Action | Bold 11 | strong subs, pills, micro labels |
| Native/Text/Caption/Note | SemiBold 11, ls 0.2, UPPER | eyebrows, progress micro, facts keys |
| Native/Text/Caption/Small Note | Bold 10, ls 0.4, UPPER | tags, counters, watermarks |

Plus `Native/Ticket/*` (6 protected mono styles, Roboto Mono) and the
library-bound `Product/Small Standard Text` (Figtree Regular 14) where it
was an exact match. Buttons carry their own bound Product styles via the DS
Button. The `OTR/Cases` working set is deleted; every agent text node binds
a Native, Ticket, Product, or DS-component style.

## Icons

Product icons come from the CD bundle's FeatureIcon set (157 icons,
`intake/.../design/_ds/.../_ds_bundle.js`, name → viewBox + SVG body).
Printed icons inherit their slot's variable-bound color (paint reuse from
the placeholder they replaced). In use: bill-dollar-2, countdown-timer,
star-1, image-photo-add, location-pin, triangle-arrow-synchronize-1,
time-history-off, chart-circle-up-growth, file-edit,
file-document-info-quick-reference, bell-notification, open-folder,
calendar-check, building-1, tag, chat-bubble-info-help,
magnifying-glass-square, triangle-arrow-expand-window-1. The FI set has no
chevrons (boards used FontAwesome scaffold) — chevrons are drawn 2.5pt
round-cap vectors. Best-guess slots to sanity check: bell (Action needed),
calendar/tag/building (facts rows), magnifier (search).

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
