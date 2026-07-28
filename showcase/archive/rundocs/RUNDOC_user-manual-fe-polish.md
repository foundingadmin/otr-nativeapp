# RUNDOC — Feature 020: User Manual FE Polish

**Scope:** showcase
**Version target:** v3.4.0 (MINOR — sidebar restructure counts as significant visual update)
**Depends on:** Feature 019 (html-to-astro Translator Integration)
**Status:** 📅 Scheduled — awaiting Feature 019 completion

---

## Context

A manual FE review in May 2026 surfaced a list of UI/UX issues across the Astro user manual. These span layout bugs, missing dark mode support, sidebar usability, version visibility, and gaps in the AI guide's usability for non-technical users. Implementation waits on Feature 019 because the showcase Astro pages should be translator-generated before polish is layered on top — patching hand-coded components that will later be replaced creates double work.

---

## Phase status

| Phase | Description | Status |
|---|---|---|
| A | Layout & Responsiveness | 📅 Pending |
| B | Dark / Light Mode | 📅 Pending |
| C | Sidebar Improvements | 📅 Pending |
| D | Version Display & Changelog | 📅 Pending |
| E | Assets: Download Functionality | 📅 Pending |
| F | Adapters Copy Update | 📅 Pending |
| G | AI Guide: Session Setup & Path Clarity | 📅 Pending |

---

## Phase A — Layout & Responsiveness

**Files:** `showcase/src/layouts/Base.astro`

- **Hamburger overlap bug:** On mobile, the sidebar slides in over page content but something in the z-index or transform chain causes overlap bleed. Investigate `.sidebar`, `.backdrop`, and `.main` stacking context. Expected fix: confirm `.backdrop` is at z-index between main and sidebar, and that sidebar is `position: fixed` with a higher z-index than any main content.
- **Desktop width:** At 1280px+ the content area is cramped at `margin-left: 220px` + `padding: var(--space-10) var(--space-12)`. Add a breakpoint at `≥1280px` that increases horizontal padding or sets a `max-width` + auto margins on `.main` to let content breathe.
- **Responsive audit:** Review all per-page breakpoints (720px, 800px, 900px) — they were set independently per page. Identify any inconsistencies and align them.

---

## Phase B — Dark / Light Mode

**Files:** `brand/tokens/output/web/color-semantic.css` (or source JSON), `showcase/src/layouts/Base.astro`, `showcase/src/pages/foundations/colors.astro`

- **Colors page layout shift:** On OS dark mode, elements on the Colors page jump location. Root cause: some layout values (height, min-height, or padding) are likely tied to color tokens that have no dark-mode fallback, so they collapse to `initial`. Diagnose by inspecting which properties change between modes. Fix: ensure all layout-relevant tokens have defined dark values, OR decouple layout from color tokens.
- **Dark mode token layer:** Add `@media (prefers-color-scheme: dark) { :root { … } }` overrides in `color-semantic.css`. Key tokens to override: `--bg-canvas`, `--bg-subtle`, `--bg-muted`, `--bg-accent-soft`, `--fg-1`, `--fg-2`, `--fg-3`, `--fg-accent`, `--border-default`, `--border-subtle`, `--border-accent`.
  - `color-semantic.css` is a generated file. Either: (a) update the adapter to emit dark-mode overrides from source JSON, or (b) add a manually maintained `/* dark-mode */` block as a stopgap until the adapter supports it — and document the stopgap clearly.
- **UI toggle:** Add a dark/light toggle button to the sidebar (footer area or near the header logo). Store preference in `localStorage` under `ds-theme`. Apply `data-theme="dark"` on `<html>`. The toggle overrides `prefers-color-scheme`. CSS: `[data-theme="dark"] :root { … }` should mirror the media query overrides.

---

## Phase C — Sidebar Improvements

**File:** `showcase/src/components/Sidebar.astro` (and `Base.astro` if nav data lives there)

- **Typography hierarchy:** Section group labels ("Foundations", "Components", etc.) are not visually distinct enough from individual nav links. Add: `--fw-semibold`, `--ls-wide`, uppercase transform, and a `--fg-3` color to group labels. Increase top margin above each group label.
- **Atomic reorganization:** Rename and reorder nav groups to reflect atomic DS vocabulary:

  | New group label | Pages |
  |---|---|
  | Get started | Welcome / index |
  | Tokens | Colors, Typography, Spacing, Motion |
  | Atoms | Buttons, Icons |
  | Molecules | Forms, Cards |
  | Templates | Templates index |
  | AI guide | Generate on-brand, Update an asset |

  The rename from "Foundations" → "Tokens" is intentional: these are the raw token definitions, and "Tokens" maps directly to atomic DS vocabulary.

---

## Phase D — Version Display & Changelog

**Files:** `showcase/src/components/Sidebar.astro`, new `showcase/src/pages/changelog.astro`

- **Sidebar version badge:** Add a version string to the sidebar footer: `v3.4.0` styled at `--fs-12`, `--fg-3`. Make it a link to `/changelog`. Define the version in a single constant at the top of `Sidebar.astro` or a shared `src/config.ts` so sessions have one place to bump it.
- **Changelog page:** Create `showcase/src/pages/changelog.astro`. Format: a flat list of entries, each showing version number, date, and a one-line summary. Seed it with the last 3–4 shipped versions from git history. Add it to the sidebar under "Get started" as a secondary link (small, below the main Welcome link, or in the sidebar footer).
- **Session enforcement:** Verify CLAUDE.md versioning rules call out that the sidebar version constant AND the changelog page must be updated each session that ships something. Update CLAUDE.md if the reference is missing.

---

## Phase E — Assets: Download Functionality

**File:** `showcase/src/pages/foundations/assets.astro`

- Add a `download` anchor to each row in the file inventory table:
  ```html
  <a href="/assets/logo-brandmark.svg" download class="download-link">Download</a>
  ```
- Add a "Download" button to each `.logo-meta` block on the logo cards.
- **Path note:** Assets are in `brand/assets/` in the repo. Astro needs them served from `public/`. Either symlink `brand/assets/` → `showcase/public/assets/` or add an Astro integration to copy them at build time. Confirm the correct path before wiring up the `href`.
- Style: `.download-link` should be minimal — `--fs-13`, `--fg-accent`, `--fw-medium`, underline on hover. No button-style fill (the page already has a lot of visual weight).

---

## Phase F — Adapters Copy Update

**File:** `showcase/src/pages/foundations/adapters.astro`

The "How adapters stay in sync" section describes an outdated flow. Current wrong copy:
> Step 2: "The Sweden sync engine reads the new Figma values and patches the canonical token CSS files in `brand/tokens/`."

Correct flow (post v3.3.0):
1. Designer updates Figma.
2. Visual → code sync runs. Sweden reads Figma values and patches `brand/tokens/source/*.tokens.json` (W3C Design Tokens JSON — the single source of truth).
3. Run `node sweden/engine/run-adapters.js` to regenerate all adapter outputs from the updated source JSON.

Update all three sync steps accordingly. Also review the lead paragraph — "when a designer updates Figma and runs a sync, every active adapter's output updates automatically" implies outputs regenerate without a separate adapter run, which is not accurate. Clarify that the adapter run is a required step.

---

## Phase G — AI Guide: Session Setup & Path Clarity

**Files:** `showcase/src/pages/ai-guide/generate.astro`, `showcase/src/pages/ai-guide/update.astro`

- **Prerequisite callout:** Add a callout box near the top of both pages (after the lead, before "Step by step"). Plain-language copy:
  > "Before you start: these prompts reference token files by repo path. They work from inside a Claude Code session with the Sweden repo loaded. If you're in a standalone chat, you'll need to paste the relevant token values manually."
  Style: `--bg-accent-soft` background, `--border-accent` left border, `--fg-2` text.

- **Path audit:** In `generate.astro`, the email example prompt references `brand/tokens/color-primitives.css` — this is a legacy file (see Feature 012). Update to `brand/tokens/output/web/color-primitives.css`.

- **Plain-language token vocab:** Rename the "Token vocabulary" card title to something like "What to name in your prompts". Replace "CSS custom properties" → "token names". Replace "var() references" → "token values". Keep the actual `--token-name` examples — those are useful — but don't gate them behind jargon in the explanatory text.

- **Example image scaffold:** On each `.example-block` in the examples list, add:
  ```html
  <figure class="example-preview" aria-hidden="true" data-preview-image=""></figure>
  ```
  And CSS:
  ```css
  .example-preview { display: none; } /* hidden until images are provided */
  ```
  This is the structural hook for a future enhancement — no images needed now.

- **Update an asset — step 1 clarity:** Step 1 currently says "Paste or read the existing file into the conversation." Add a sentence: "In Claude Code, use the `/read` command or paste the file path — the session can read it directly from the repo."

---

## Items deferred (not in this feature)

- **Natural language abstraction layer** for non-technical brand users who don't know token names. Needs design research. May involve a plain-language config block in `brand/BRAND.md` or a separate brand context file. Scope TBD.
- **Actual preview images** for example prompt cards (Phase G scaffolds the slot; images are a separate future task).
- **Templates page workflow improvements** — the user flagged these for later consideration.

---

## Conflict check

| Feature | Surface overlap | Notes |
|---|---|---|
| 011 — User Manual Completeness | Both touch `adapters.astro` | 011 adds missing token docs; 014 fixes copy accuracy. Independent changes, no conflict. |
| 012 — Retire Legacy Token CSS | Email prompt path in `generate.astro` | Phase G already corrects the legacy path. If 012 ships first, the prompt path fix is still valid (just confirming the right output path). |
| 001/002 — Engine | None | — |

---

## Verification checklist

- [ ] `cd showcase && npm install && npm run build` — no errors
- [ ] Toggle OS to dark mode → Colors page has no layout shift; semantic color tokens update correctly
- [ ] Click sidebar dark/light toggle → theme switches; preference persists on page reload
- [ ] Mobile (~375px): open hamburger → sidebar opens cleanly with no content overlap behind it
- [ ] Desktop at 1440px: content area is visibly wider, not cramped
- [ ] Sidebar nav groups show atomic labels in correct order (Tokens → Atoms → Molecules → Patterns → AI guide)
- [ ] Sidebar section labels are visually distinct from nav link items
- [ ] Version number visible in sidebar footer; clicking it loads `/changelog`
- [ ] `/changelog` page exists and lists recent versions
- [ ] Assets page: clicking Download on a logo file triggers a browser file download
- [ ] Adapters page "How adapters stay in sync" accurately describes W3C JSON → run-adapters.js → outputs
- [ ] Generate on-brand page: prerequisite callout visible above Step 1; email prompt path points to `output/web/`
- [ ] "Token vocabulary" card uses plain language, not CSS jargon
- [ ] Example prompt cards have `.example-preview` placeholder elements in the DOM
