# Variable requests

Raised by the first print session against the **live** Guidelines library
(fruit-ramp palette). Re-resolved with CIEDE2000; the CSS-dump candidates in
`intake/.../VARIABLE-GAPS.md` are stale (that library naming no longer
exists). One entry per value. The design team owns the verdict.

```
#5b63ff • SmartMatch gradient stop 1 (protected sub-brand)
  used        act grad buttons, analyzing-brand card border
  nearest     colors/blueberry/600 (#155eef) dE 6.93
  ask         adopt a SmartMatch indigo token, or ship the pair as a shared
              gradient style named for the sub-brand
  decided     open
  frame       DIFF · #5b63ff · SmartMatch grad stop 1

#e5463a • money and overdue accent
  used        5+ places: money buttons, OverduePill, deadline countdown
  nearest     colors/cherry/500 (#e35545) dE 2.61  ← BOUND, flagged
  ask         bless cherry/500 as the money accent, or mint a semantic
              money token (the old error/500 dE 5.6 problem is gone in the
              live library)
  decided     open
  frame       DIFF · #e5463a · money accent

#f79009 • chip alert dot
  used        feed filter chips with live alerts
  nearest     colors/honey/600 (#f19d00) dE 5.87
  ask         adopt an alert-orange token, or move design to honey/600
  decided     open
  frame       DIFF · #f79009 · chip alert dot

#7a2e0e • amber action item title ink
  used        aitem headers (loe, counter, overdue boards)
  nearest     nothing honest in the honey ramp
  ask         mint a warning-ink token
  decided     open
  frame       DIFF · #7a2e0e · amber action ink

#fbfcfd / #fbfbfc • screen background and zone header tints
  used        every screen bg; facts/ahub headers, esign doc row
  nearest     sits between background/default (#ffffff) and
              background/strong (#f5f6f6)
  ask         pick one, or mint screen/surface-tint tokens
  decided     open
  frame       DIFF · #fbfcfd · screen tint

ticket paper palette • #6b4f1d cream + blue/green/pink/slate tints
  used        OTR/Cases/Ticket, all variants
  ask         intentionally non-DS skeuomorphic palette; ratify as protected
              illustration colors
  decided     open
  frame       DIFF · #6b4f1d · ticket paper

#10141e @ 50% • hero classification chip scrim
  used        TicketHero cls chip
  nearest     alpha/dark/30 and alpha/dark/60 straddle it
  ask         pick one or accept raw
  decided     open
  frame       DIFF · #10141e · hero chip scrim

radius 16 • card corner radius
  used        CPC, Identity, ActionHub, CaseFacts cards
  nearest     no radius token resolves to 16
  ask         add a radius/16 (or LG=16) token, or move cards to an existing
              step
  decided     open

Courier New • ticket typeface
  used        OTR/Cases/Ticket (printed in Roboto Mono as fallback)
  ask         pick the shipping mono face or add Courier New to file fonts
  decided     open
```

Flagged binds (bound, listed on ④ Diffs for correction at source):
cherry/500 dE 2.61 (money), blueberry/500 dE 4.51 (otr-blue), grape/500
dE 3.34 (grad stop 2), ink/600 dE 3.64 (wf-muted), ink/800 dE 2.63
(wf-strong), ink/300 dE 4.16 (wf-faint), cherry/25 dE 2.92 (money-bg),
cherry/100 dE 2.36 (money-line), ink/50+ink/100 (portrait gradient).

#6a5bd0 / #5b4bb8 • rematch violet accent and ink (session 4)
  used        rematch tap block icon, compact signal dot, block title ink
  nearest     brand/700 (#0f4bc4) dE 14.3 / 13.3, nothing honest
  ask         mint a rematch/processing accent pair, or ratify grape ramp
              values for this state
  decided     open
  frame       DIFF · CPC v2 (11338:1922)

#ecfdd9 • celebration green tint (session 4)
  used        dismissed review block bg, money-back block bg
  nearest     success/50 (#e1f2dd) dE 5.03  ← BOUND, flagged
  ask         bless success/50 for celebration surfaces, or mint a
              celebration tint token
  decided     open
  frame       DIFF · CPC v2 (11338:1922)
