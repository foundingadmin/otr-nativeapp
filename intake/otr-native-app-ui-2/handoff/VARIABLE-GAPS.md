# Variable gaps

Generated from `spec/tokens/binding-report.json`. Two lists: values with no honest Figma variable, and values that bind with visible drift.

Read the summary as a health score for how close the design surface sits to the design system.

```
119 colour values in the canon kits
  5   exact variable match                 bind
 35   perceptually identical (ΔE < 2)      bind nearest, silently
 40   visible drift (ΔE 2 to 5)            bind nearest, print a diff note
 29   no honest match (ΔE > 5)             raw value, print a diff swatch, ask design
 10   board scaffolding                    never ships
```

The headline: **the Cases boards were authored as wireframe grade, deliberately.** `core-kit.jsx` says the badge hues were "tuned to the CEO approved badge board (friendlier than raw DS tokens)", and the whole board palette is a local `--wf-*` set rather than the DS ramps. So these gaps are mostly not mistakes; they are a design position that the design system has not absorbed yet. Printing them as diffs is how that conversation finally happens on a canvas.

## The local palette, reconciled

The 15 semantic tokens every board is authored against, and what each one resolves to.

| Local token | Value | Meaning | Verdict |
| --- | --- | --- | --- |
| `--wf-ink` | `#1b1c21` | primary text | bind nearest `colors/gray/dark/mode/900/2` ΔE 4.72 |
| `--wf-strong` | `#3b3e46` | secondary text / emphasis | bind nearest `colors/gray/dark/mode/700/2` ΔE 3.48 |
| `--wf-muted` | `#6b7280` | tertiary text | bind nearest `colors/foreground/fg/quaternary/500/2` ΔE 4.33 |
| `--wf-faint` | `#9aa1ad` | quaternary text / placeholder icon | bind nearest `colors/foreground/fg/disabled/2` ΔE 2.93 |
| `--wf-line` | `#e6e8ec` | default hairline border | bind nearest `neutral/200` ΔE 0.35 |
| `--wf-line2` | `#eef0f3` | subtle divider | bind nearest `colors/gray/cool/100` ΔE 0.63 |
| `--wf-fill` | `#f3f4f6` | neutral fill / chip background | bind nearest `colors/background/bg/disabled/2` ΔE 0.62 |
| `--wf-bg` | `#fbfcfd` | screen background | bind nearest `colors/gray/blue/25` ΔE 0.36 |
| `--wf-photo` | `#d8dbe1` | photo placeholder hatch A | bind nearest `colors/border/border/disabled/2` ΔE 2.56 |
| `--wf-photo2` | `#cfd3da` | photo placeholder hatch B | bind nearest `colors/border/border/disabled/2` ΔE 0.91 |
| `--money` | `#e5463a` | money / overdue accent (the one sentiment accent on the CPC) | **DS request** • nearest `colors/error/500/2` ΔE 5.6 |
| `--money-bg` | `#fdeceb` | money surface | bind nearest `secondary/coral/50` ΔE 1.56 |
| `--money-line` | `#f7c9c4` | money border | bind nearest `sentiment/negative/200` ΔE 2.08 |
| `--otr-blue` | `#2e6bff` | brand accent for links and blue actions | bind nearest `colors/blue/dark/500` ΔE 4.11 |
| `--otr-grad` | `linear-gradient(102deg,#5b63ff 6%,#8b5cf6 96%)` | SmartMatch'd sub-brand gradient (protected) | **DS request** • no candidate |

Two are unresolvable and are the most important asks in the pack:

- **`--money: #e5463a`** carries every payment and overdue signal in the product. The nearest DS variable is `colors/error/500` at #f04438, ΔE 5.6, a visibly different red. Either the DS gains a money token or the design moves to error/500. This one value appears on the CPC, the detail action hub, the account rail and the overdue pill.
- **`--otr-grad`** is the SmartMatch sub brand gradient, `linear-gradient(102deg, #5b63ff 6%, #8b5cf6 96%)`. Gradients are not variables. Ship it as a shared Figma gradient style named for the sub brand, and record it as protected.

## No honest match • 29 values

Print each as a diff swatch. Ask: adopt as a token, or correct the design?

### Brand and SmartMatch accents

| Value | Uses | Nearest Figma variable | Where it is used |
| --- | --- | --- | --- |
| `#6a5bd0` | 9 | `colors/background/bg/brand/solid/2`<br>`#7f56d9` ΔE 10.34 | .sbadge.analyzing{ color:#6a5bd0; |
| `#5b63ff` | 5 | `colors/purple/500/2`<br>`#7a5af8` ΔE 8.73 | --otr-grad:linear-gradient(102deg,#5b63ff 6%,#8b5cf6 96%); |
| `#5b4bb8` | 3 | `colors/brand/800/2`<br>`#53389e` ΔE 8.33 | skin = { background: '#f1eeff', color: '#5b4bb8' }; |
| `#8b86d6` | 1 | `colors/gray/blue/400/2`<br>`#717bbc` ΔE 11.1 | ? '#8b86d6' |
| `#c2cce0` | 1 | `colors/gray/blue/200/2`<br>`#d5d9eb` ΔE 5.54 | .thero .ph.tall{ background:repeating-linear-gradient(135deg,#cd |
| `#c4ccdc` | 1 | `colors/gray/blue/200/2`<br>`#d5d9eb` ΔE 5.29 | justify-content:center; background:#eef1f8; border:1.5px dashed  |
| `#aab4c8` | 1 | `colors/foreground/fg/disabled/2`<br>`#98a2b3` ΔE 6.94 | <div className="ph placeholder"><FI name="ticket-1" size={34} co |
| `#aeb6c6` | 1 | `content/grayscale/300`<br>`#b3b5bb` ΔE 5.76 | <div className="ie-ph"><FI name="user-square-single" size={22} c |
| `#7b8595` | 1 | `colors/gray/dark/mode/500/2`<br>`#85888e` ΔE 6.37 | neutral: { bg: '#eef0f4', line: '#dfe3ea', ic: '#7b8595' } |
| `#1d52cc` | 1 | `colors/blue/700/2`<br>`#175cd3` ΔE 5.28 | .xr-quote .xr-t{ color:#1d52cc; } |
| `#3a6bd0` | 1 | `color/azure/45`<br>`#007be3` ΔE 8.96 | .xr-quote .xr-s{ color:#3a6bd0; } |

### Sentiment: money, urgency, warning

| Value | Uses | Nearest Figma variable | Where it is used |
| --- | --- | --- | --- |
| `#e5463a` | 5 | `colors/error/500/2`<br>`#f04438` ΔE 5.6 | --money • money / overdue accent (the one sentiment accent on the CPC) |
| `#c2680a` | 4 | `colors/background/bg/warning/solid`<br>`#dc6803` ΔE 12.47 | amber: { light:['#fff4e3','#b96a06','#e08a14'], solid:['#c2680a' |
| `#6a5a17` | 1 | `colors/yellow/950`<br>`#542c0d` ΔE 26.19 | font-size:11.5px; line-height:1.45; color:#6a5a17; } |
| `#f6e6a2` | 1 | `colors/warning/200/2`<br>`#fedf89` ΔE 11.58 | background:linear-gradient(176deg,#fdf3c6,#f6e6a2); |
| `#b96a06` | 1 | `colors/background/bg/warning/solid`<br>`#dc6803` ΔE 17.18 | amber: { light:['#fff4e3','#b96a06','#e08a14'], solid:['#c2680a' |
| `#e08a14` | 1 | `colors/warning/500/2`<br>`#f79009` ΔE 9.82 | amber: { light:['#fff4e3','#b96a06','#e08a14'], solid:['#c2680a' |
| `#aa2233` | 1 | `colors/error/800/2`<br>`#912018` ΔE 13.09 | .att-banner .ab-s{ font-size:11.5px; color:#a23; opacity:.85; } |
| `#3a1714` | 1 | `secondary/coral/950`<br>`#3e1709` ΔE 6.72 | .acct-rail{ display:flex; align-items:center; gap:11px; padding: |
| `#3a2c10` | 1 | `colors/yellow/950`<br>`#542c0d` ΔE 15.27 | .acct-rail.warn{ background:#3a2c10; color:#ffeccb; } |
| `#ffd591` | 1 | `colors/warning/200/2`<br>`#fedf89` ΔE 9.57 | <span className="ar-ic"><FI name={warn ? 'warning-triangle' : 'w |

### Sentiment: success and resolution

| Value | Uses | Nearest Figma variable | Where it is used |
| --- | --- | --- | --- |
| `#19a558` | 5 | `colors/foreground/fg/success/secondary/2`<br>`#17b26a` ΔE 5.98 | green: { light:['#e4f7ec','#179a55','#19a558'], solid:['#19a558' |
| `#22c55e` | 1 | `marketing/colors/green/300`<br>`#01b64d` ΔE 5.56 | const cols = ['#1f9d57', '#22c55e', '#4ade80', '#15803d', '#86ef |
| `#4ade80` | 1 | `colors/success/400/2`<br>`#47cd89` ΔE 14.67 | const cols = ['#1f9d57', '#22c55e', '#4ade80', '#15803d', '#86ef |
| `#15803d` | 1 | `marketing/colors/green/400`<br>`#008b3b` ΔE 8.66 | const cols = ['#1f9d57', '#22c55e', '#4ade80', '#15803d', '#86ef |
| `#86efac` | 1 | `colors/success/300/2`<br>`#75e0a7` ΔE 6.96 | const cols = ['#1f9d57', '#22c55e', '#4ade80', '#15803d', '#86ef |
| `#bfe8cf` | 1 | `colors/background/bg/success/secondary/2`<br>`#dcfae6` ΔE 8.65 | background:linear-gradient(135deg,#e8f8ee,#d6f2e1); border:1px s |
| `#2c7a52` | 1 | `colors/success/700/2`<br>`#067647` ΔE 7.23 | .celebrate .cb-s{ font-size:12.5px; color:#2c7a52; margin-top:2p |

### Ticket paper (the citation element)

| Value | Uses | Nearest Figma variable | Where it is used |
| --- | --- | --- | --- |
| `#6b4f1d` | 1 | `colors/yellow/950`<br>`#542c0d` ΔE 17.22 | --ink:#6b4f1d; --ink-line:rgba(107,79,29,.3); --ink-soft:rgba(10 |

## Visible drift • 40 values

Bind the nearest variable, then add a one line note to the diff page. These are close enough to ship and far enough to be worth correcting at source.

| Value | Uses | Nearest Figma variable | Where it is used |
| --- | --- | --- | --- |
| `#2e6bff` | 7 | `colors/blue/dark/500`<br>`#2970ff` ΔE 4.11 | --otr-blue • brand accent for links and blue actions |
| `#3b3e46` | 6 | `colors/gray/dark/mode/700/2`<br>`#333741` ΔE 3.48 | --wf-strong • secondary text / emphasis |
| `#8b5cf6` | 5 | `secondary/purple/500`<br>`#8c5cf1` ΔE 2.66 | --otr-grad:linear-gradient(102deg,#5b63ff 6%,#8b5cf6 96%); |
| `#1b1c21` | 4 | `colors/gray/dark/mode/900/2`<br>`#161b26` ΔE 4.72 | --wf-ink • primary text |
| `#9aa1ad` | 4 | `colors/foreground/fg/disabled/2`<br>`#98a2b3` ΔE 2.93 | --wf-faint • quaternary text / placeholder icon |
| `#e9f1ff` | 4 | `brand/ice`<br>`#eef4ff` ΔE 2.01 | blue:  { light:['#e9f1ff','#2e6bff','#2e6bff'], solid:['#2e6bff' |
| `#6b7280` | 3 | `colors/foreground/fg/quaternary/500/2`<br>`#667085` ΔE 4.33 | --wf-muted • tertiary text |
| `#d8dbe1` | 3 | `colors/border/border/disabled/2`<br>`#d0d5dd` ΔE 2.56 | --wf-photo • photo placeholder hatch A |
| `#f1eeff` | 3 | `colors/background/bg/brand/secondary`<br>`#f4ebff` ΔE 2.67 | skin = { background: '#f1eeff', color: '#5b4bb8' }; |
| `#dfe4ef` | 2 | `colors/gray/blue/100/2`<br>`#eaecf5` ΔE 3.32 | .otr-frame.screen{ border-radius:22px; border:1px solid #dfe4ef; |
| `#98a1ae` | 2 | `colors/foreground/fg/disabled/2`<br>`#98a2b3` ΔE 2.26 | gray:  { light:['#eef0f4','#67707e','#98a1ae'], solid:['#3b3e46' |
| `#fff4e3` | 2 | `colors/warning/50/2`<br>`#fffaeb` ΔE 2.97 | amber: { light:['#fff4e3','#b96a06','#e08a14'], solid:['#c2680a' |
| `#dcd6f5` | 2 | `colors/purple/200/2`<br>`#d9d6fe` ΔE 4.78 | match:   { bg:'#f1eeff',         line:'#dcd6f5',          ink:'# |
| `#9aa6bb` | 2 | `colors/foreground/fg/disabled/2`<br>`#98a2b3` ΔE 2.68 | display:flex; align-items:center; justify-content:center; flex-d |
| `#cfd6e2` | 2 | `colors/border/border/disabled/2`<br>`#d0d5dd` ΔE 2.21 | const dot = state === 'future' ? { background: '#fff', borderCol |
| `#f7c9c4` | 1 | `sentiment/negative/200`<br>`#fecdc9` ΔE 2.08 | --money-line • money border |
| `#c4c9d2` | 1 | `border/neutral`<br>`#cecfd2` ΔE 4.16 | .cpc.unfinished{ border:1.6px dashed #c4c9d2; background:#fcfcfd |
| `#0b4ad0` | 1 | `colors/blue/dark/800`<br>`#0040c1` ΔE 4.56 | color:var(--blue-700,#0b4ad0); } |
| `#f1e6b8` | 1 | `sentiment/warning/100`<br>`#feefc6` ΔE 4.66 | border:1px solid #f1e6b8; border-radius:9px; font-family:-apple- |
| `#fdf3c6` | 1 | `colors/background/bg/warning/secondary`<br>`#fef0c7` ΔE 2.54 | background:linear-gradient(176deg,#fdf3c6,#f6e6a2); |
| `#67707e` | 1 | `colors/foreground/fg/quaternary/500/2`<br>`#667085` ΔE 4.16 | gray:  { light:['#eef0f4','#67707e','#98a1ae'], solid:['#3b3e46' |
| `#e4f7ec` | 1 | `colors/success/50/2`<br>`#ecfdf3` ΔE 2.42 | green: { light:['#e4f7ec','#179a55','#19a558'], solid:['#19a558' |
| `#179a55` | 1 | `colors/background/bg/success/solid/2`<br>`#079455` ΔE 3.68 | green: { light:['#e4f7ec','#179a55','#19a558'], solid:['#19a558' |
| `#1f9d57` | 1 | `colors/background/bg/success/solid/2`<br>`#079455` ΔE 4.68 | const cols = ['#1f9d57', '#22c55e', '#4ade80', '#15803d', '#86ef |
| `#2e74ff` | 1 | `colors/blue/dark/500`<br>`#2970ff` ΔE 3.07 | const cols = ['#1f9d57', '#22c55e', '#4ade80', '#15803d', '#86ef |
| `#7da9ff` | 1 | `colors/blue/dark/300`<br>`#84adff` ΔE 2.79 | const cols = ['#1f9d57', '#22c55e', '#4ade80', '#15803d', '#86ef |
| `#7b5cf0` | 1 | `secondary/purple/500`<br>`#8c5cf1` ΔE 4.53 | if (cfg.tone === 'grad') return '#7b5cf0'; |
| `#ffeccb` | 1 | `sentiment/warning/100`<br>`#feefc6` ΔE 4.27 | .acct-rail.warn{ background:#3a2c10; color:#ffeccb; } |
| `#cdd6e6` | 1 | `colors/gray/blue/200/2`<br>`#d5d9eb` ΔE 2.53 | .thero .ph.tall{ background:repeating-linear-gradient(135deg,#cd |
| `#d6dce8` | 1 | `colors/border/border/disabled/2`<br>`#d0d5dd` ΔE 3.28 | .thero .ph.placeholder{ background:linear-gradient(160deg,#e8ecf |
| `#e0e5ee` | 1 | `colors/gray/blue/100/2`<br>`#eaecf5` ΔE 2.87 | .att-ph.none{ background:linear-gradient(160deg,#eef1f6,#e0e5ee) |
| `#e4dcfa` | 1 | `secondary/purple/25`<br>`#eee6ff` ΔE 4.32 | .id-reassure.match .ir-ic{ background:#e4dcfa; } |
| `#4a3aa0` | 1 | `colors/brand/800/2`<br>`#53389e` ΔE 2.91 | .id-reassure.match .ir-t{ color:#4a3aa0; } |
| `#cfd6e6` | 1 | `colors/gray/blue/200/2`<br>`#d5d9eb` ΔE 2 | .id-empty{ margin:-22px 14px 0; position:relative; z-index:2; ba |
| `#d6f2e1` | 1 | `colors/background/bg/success/secondary/2`<br>`#dcfae6` ΔE 3.06 | background:linear-gradient(135deg,#e8f8ee,#d6f2e1); border:1px s |
| `#127a43` | 1 | `colors/success/700/2`<br>`#067647` ΔE 4.63 | .celebrate .cb-t{ font-size:16px; font-weight:800; color:#127a43 |
| `#ff9e92` | 1 | `colors/error/300/2`<br>`#fda29b` ΔE 4.33 | <span className="ar-ic"><FI name={warn ? 'warning-triangle' : 'w |
| `#dfe3ea` | 1 | `neutral/200`<br>`#e5e7eb` ΔE 2.25 | neutral: { bg: '#eef0f4', line: '#dfe3ea', ic: '#7b8595' } |
| `#aab2bf` | 1 | `content/grayscale/300`<br>`#b3b5bb` ΔE 4.53 | {state === 'done' && <FI name="check-thick" size={12} color="#aa |
| `#c4cad4` | 1 | `colors/border/border/disabled/2`<br>`#d0d5dd` ΔE 4.13 | .tl-row.done .tl-d{ color:#c4cad4; } |

## How to raise a request

Do not edit the design system. Append to `canon/variable-requests.md`, one entry per value:

```
#e5463a • money and overdue accent
  used        5 places: CPC action, overdue pill, account rail, detail action hub
  nearest     colors/error/500 (#f04438) ΔE 5.6
  ask         adopt as semantic token colors/sentiment/money, or move design to error/500
  decided     open
  frame       DIFF · #e5463a · money accent
```

The design team owns the verdict. Claude Code owns keeping the list accurate.
