# Brief — alert CTA sizing

**Question:** The button inside a card's grouped alert (e.g. "View updates" on an unread-messages card) reads too large at 44px, full-width. What's the right size/treatment?

**Status:** decided (DR-CPC-002). V0 = no toast, no button, whole card taps. V4 = whole tinted block is the tap target, headline only. V4b/c/d = same, with a one-line descriptor under the headline for money / legal-gate / high-stakes items. Elevated into the shared `_ds-cases/kits/` and applied across the root `Case Preview Cards.html`. Archived.

**Variants:**
1. V1 — same full-width filled pill, just shorter (36px, 13px label).
2. V2 — compact, right-aligned button sized to its label, not full-width.
3. V3 — text-link CTA (bold text + chevron), no button chrome.
4. V4 — no visible CTA; the whole tinted block is the tap target.

Same real card (CASES.unread, "2 unread messages") rendered under each so the button is judged in context.
