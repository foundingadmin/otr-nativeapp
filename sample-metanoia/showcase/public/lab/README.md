# showcase/public/lab/

This directory is the **creative sandbox** for the Metanoia design system.

It is the middle layer between the DS showcase (which documents what the system contains) and production (which is the real website). Everything here is an experiment — built in a CC session, dropped here, and automatically surfaced on the Lab page at `/lab`.

---

## Rules

- **Every file is a standalone HTML page.** It links the DS barrel via CDN and renders in a browser with no build step.
- **Never hardcode a hex value, font name, or spacing value.** Every visual decision must reference a CSS custom property from the DS barrel. If a token doesn't exist for what you need, flag it — don't invent a value.
- **Semantic tokens are always the default.** Use role-based tokens (`--fg-1`, `--bg-canvas`, `--border-subtle`, `--fg-accent`, etc.) before reaching for primitive tokens (`--color-navy`, `--color-aqua`). Only use a primitive when no semantic token covers the case — and leave an inline comment explaining why.
- **File naming convention:** `[type]-[slug]-[YYYYMMDD].html`
  - Examples: `landing-acme-exec-20260528.html`, `onesheet-aic-overview-20260601.html`, `email-prospect-followup-20260610.html`
- **Every file needs a `<!-- lab:meta -->` comment block** at the top of `<body>` so the hub page can parse it for the card:

```html
<!-- lab:meta
title: Acme Inc — Executive Landing Page
type: landing
date: 2026-05-28
description: Prospect landing page for executive ops persona. Built in CC, 12min session.
author: Josh / FC
-->
```

- **The barrel URL is always:**
  `https://metanoia-designsys.vercel.app/colors_and_type.css`

---

## What belongs here

| Type | Description |
|------|-------------|
| `landing` | Prospect landing pages, campaign pages |
| `onesheet` | One-pagers, PDF-printable sales sheets |
| `email` | HTML email templates |
| `ad` | Static ad creative, IAB sizes |
| `deck` | Slide-style single-page presentations |
| `experiment` | Anything else — layout tests, component explorations |

---

## Semantic token patterns

### Dark sections — always use `data-theme="dark"`

Any section with a dark background (navy, deep-invert) must carry `data-theme="dark"` on the element itself. This lets semantic tokens resolve correctly for that context:

```html
<nav class="nav" data-theme="dark">...</nav>
<section class="hero" data-theme="dark">...</section>
<section class="testimonial-section" data-theme="dark">...</section>
<footer class="footer" data-theme="dark">...</footer>
```

Without it, `--fg-1` resolves to dark navy text (invisible on a dark background) instead of white. Always scope dark-surface elements this way — never override with hardcoded `rgba(255,255,255,...)` unless the DS has no semantic token for that opacity level.

### The `--fg-accent` canary

`--fg-accent` is intentionally mapped to `var(--color-error-600)` — a red — in the DS source. **This is not a bug.** It is a governance sentinel.

When you use `color: var(--fg-accent)` for teal/aqua UI accents and the page renders with red accents, that is the system working correctly. It signals that the token source (`brand/tokens/source/color-semantic.tokens.json`) needs to be updated to point `--fg-accent` at the correct brand color. Until that update ships, red accents distinguish proper DS-semantic usage from AI hallucination or hardcoded values.

**Always use `var(--fg-accent)` for UI accent text.** Never substitute `var(--color-aqua)` to avoid the red — that defeats the governance signal.

### Logo components

Use the brandmark SVG inline with `.logo-mark`, `.logo-accent`, `.logo-wordmark` fill classes. Define the logo token variables in your page's `:root` and `[data-theme="dark"]` blocks, matching the DS pattern:

```css
:root { --logo-mark: var(--color-navy); --logo-accent: var(--color-aqua); --logo-wordmark: var(--color-navy); }
[data-theme="dark"] { --logo-mark: var(--color-white); --logo-wordmark: var(--color-white); }
.logo-mark   { fill: var(--logo-mark); }
.logo-accent { fill: var(--logo-accent); }
.logo-wordmark { fill: var(--logo-wordmark); }
```

The brandmark SVG paths live in `showcase/preview/logo-brandmark.html`. The wordmark SVG path lives in `showcase/preview/logo-wordmark.html`.

---

## What does NOT belong here

- Files from `brand/components/` — those are canonical DS components, not experiments
- Files that import from other directories in this repo
- Files with hardcoded hex values (grep will catch these in CI)
- Files that use primitive tokens where a semantic equivalent exists (e.g. `var(--color-aqua)` for accent text instead of `var(--fg-accent)`)

---

## How the hub page works

`/lab` (src/pages/lab/index.astro) reads all `.html` files in this directory at build time, parses the `<!-- lab:meta -->` comment, and renders a card for each one. Cards link directly to the file at `/lab/[filename]`.

If your file has no meta comment, it will still appear as a card with "Untitled experiment" and the filename as the slug.

---

## CC prompt to start a lab session

```
Read CLAUDE.md and showcase/public/lab/README.md before responding.

Task: Build a [type] for [purpose/persona/company].

Context: [Paste any relevant info — QBR notes, prospect details, campaign brief, etc.]

Output: A single HTML file in showcase/public/lab/ following the naming convention and including the lab:meta comment block.

Token rules (strictly enforced):
1. Semantic tokens are always the default. Use --fg-1, --fg-2, --fg-3, --bg-canvas, --bg-subtle, --bg-accent, --bg-accent-soft, --border-subtle, --border-default, --fg-accent, --fg-link, etc. before any primitive.
2. Only use a primitive token (--color-navy, --color-aqua, etc.) when no semantic token covers the case. Leave an inline comment explaining why.
3. Never hardcode a hex value, rgba(), font name, or spacing value.
4. Any section with a dark/navy background must carry data-theme="dark" on the element — never override text color with hardcoded rgba(255,255,255,...) unless there is no semantic token at that opacity.
5. Use var(--fg-accent) for all UI accent text. If it renders red, that is intentional — it is a governance signal that the DS token source needs updating.
6. For the logo/brandmark, use inline SVG with .logo-mark / .logo-accent / .logo-wordmark fill classes and the logo token variable block from README.md.

After building, confirm:
- File is in showcase/public/lab/ with correct naming
- lab:meta block is present and complete
- Zero hardcoded hex values (grep confirms)
- Zero primitive token uses where a semantic equivalent exists (grep for var(--color-aqua), var(--color-white), var(--color-navy) as color/background values and justify each one)
- All dark sections carry data-theme="dark"
- Page renders correctly at 375px and 1280px
```
