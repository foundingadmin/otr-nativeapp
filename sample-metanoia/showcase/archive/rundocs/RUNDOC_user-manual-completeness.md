# RUNDOC — Feature 011: User Manual Completeness & Living Doc Rule

**Scope:** `showcase`
**Issue:** [#64](https://github.com/foundingadmin/metanoia-designsys/issues/64)
**Branch:** `feat/user-manual-completeness`
**Version:** v3.3.6
**Date:** 2026-05-28
**Status:** 🔄 In Progress — Phase 1–3 complete, Phase — blocked pending Feature 001

---

## Goal

Bring the Astro user manual up to date with all current DS tokens and components, and enforce that the manual stays current going forward via a session rule in CLAUDE.md.

---

## Scope audit

| Gap | Actionable? | Action |
|---|---|---|
| Border-width tokens missing from Spacing page | ✅ Yes | Add section to `foundations/spacing.astro` |
| Living doc rule for manual updates | ✅ Yes | Add to CLAUDE.md Living Doc Rule section |
| Verify preview cards against `brand/components/html/` | ❌ Blocked | `brand/components/html/` does not exist yet |

The `brand/components/html/` verification is deferred — that directory will be populated as Feature 001 (Figma-First Component Sync) ships canonical component HTML. Feature 011 remains open until that gap closes.

---

## Phase Checklist

| Phase | Task | Status |
|---|---|---|
| 0 | Create RUNDOC | ✅ |
| 0 | Update ROADMAP to In Progress | ✅ |
| 1 | Add border-width section to `foundations/spacing.astro` | ✅ |
| 1 | Add manual coverage rule to CLAUDE.md Living Doc section | ✅ |
| 2 | Showcase build passes clean | ✅ |
| 3 | Version bumped to v3.3.6 | ✅ |
| 3 | Commit and push PR | ✅ |
| — | Verify preview cards vs `brand/components/html/` | ⏳ Blocked on Feature 001 |

---

## Verification Checklist

- [ ] `/foundations/spacing` shows border-width section with all 4 tokens
- [ ] Visual swatches render at correct widths
- [ ] CLAUDE.md living doc rule covers manual update requirement
- [ ] Showcase build: 0 errors
