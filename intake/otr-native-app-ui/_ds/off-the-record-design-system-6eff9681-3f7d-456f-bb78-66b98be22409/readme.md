# Off The Record — Design System

A brand & UI system for **Off The Record (OTR)** — a consumer legal-tech platform that helps drivers fight traffic tickets. Drivers enter a citation, get an **instant quote**, are **matched with a local traffic attorney**, book, and track the case to resolution in a **client portal**. The product spans a marketing site, a mobile/web booking flow, and an attorney-facing dashboard; this system focuses on the consumer-facing surfaces.

> Tagline themes from the product copy: *beat your ticket · no court, no points · money-back guarantee.*

## Sources
- **Figma — "Customer side / Guidelines"** (full design-system file): colors, typography, spacing, 960+ component sets, 1,400+ variables. Authoritative source for tokens & components. *(Brand: offtherecord.com; icon library: Font Awesome Pro.)*
- **Figma — "Native App / Design"** (3 narrowed frames: Homescreen Hi-Fi, Case-cards UX map, Onboarding Hi-Fi). *Note: these frames were not reachable in the mounted file — see Caveats. The client-app UI kit here is reconstructed from the Guidelines components + booking-flow specs.*

Reader without Figma access: token values, the type scale, and component specs are all captured in `tokens/` and `components/` so this system stands alone.

---

## Content fundamentals
How OTR writes:
- **Voice:** warm, reassuring, plain-spoken. The user is anxious about a ticket; copy lowers the temperature. *"Beat your ticket," "We'll remind you 3 days before," "If your ticket isn't dismissed, you don't pay."*
- **Person:** second person, active. "**Your** instant quote," "Find **your** attorney," "Hire Dana." Brand refers to itself as "we."
- **Casing:** **Sentence case** everywhere — headings, buttons, labels. Not Title Case. ("Pay in full today," not "Pay In Full Today.")
- **Numbers & money:** concrete and up-front. Prices shown as totals (`$109 total`), savings called out (`Save $240`), time made tangible (`expires in 29 minutes`).
- **Trust language** is load-bearing: *money-back guarantee, secure checkout, no court, no points, cancel anytime.* Use it near decisions.
- **Tone:** confident but never legalese. Short sentences. No jargon unless it's the user's word ("citation," "dismissed," "court date").
- **Emoji:** not used in product UI. Status is communicated with badges/icons, not emoji.
- **Punctuation:** sparing exclamation; a single "Great news —" is the ceiling.

---

## Visual foundations
- **Color vibe:** clean, optimistic, trustworthy. A confident **brand blue (#155EEF)** carries primary actions; **coral (#F34822)** is the energetic accent for savings/marketing CTAs; **purple (#662FE5)** flags premium/Fastlane. Sentiment greens/ambers/reds are used literally for case status. Backgrounds are white or a faint cool gray (`--neutral-25/50`); the booking quote card sits on a tinted `--surface-subtle`.
- **Typography:** **Figtree** throughout (the brand font — chosen for legibility in a legal context). Display/marketing weights run 700–800; product headings 700; body 400 at 16px (the workhorse). Product text carries **1% letter-spacing**; marketing display is tracked tight (0%). Line-heights are generous (1.5 on body).
- **Shape language:** **pills.** Buttons, badges, tags, toggles and progress tracks are all fully rounded (`--radius-full`). Cards and sheets use soft 16–20px corners. This pill-forward geometry is the most recognizable OTR signature.
- **Cards:** white surface, hairline `--border-secondary` (#ECECED), soft cool-gray shadow (`--shadow-card`). Interactive cards lift 2px and deepen shadow on hover; selected cards get a brand-blue border + focus ring. No heavy borders, no colored left-accent bars.
- **Elevation:** soft, low-contrast shadows built on `rgba(16,24,40,…)` — never harsh. Modals use a dimmed `rgba(12,17,29,0.7)` overlay with a subtle blur.
- **Borders:** 1px, cool gray. Inputs are 8px-radius (not pill) with a 4px brand focus ring; error states swap to red border + red ring.
- **Backgrounds / imagery:** photography is real attorney headshots (warm, professional). No illustration-heavy or gradient-mesh backgrounds. The one full-bleed color block is the blue storefront header.
- **Motion:** quick and functional — 120–160ms ease on hover/color, 300ms on progress fills, a gentle knob slide on toggles. No bounce, no decorative looping animation. Respect reduced-motion.
- **Hover:** primary buttons darken one step (600→700) and lift 0.5px; secondary buttons tint to `--neutral-50`; links darken to blue-800. **Press:** color deepens (no scale-down).
- **Layout:** 4px spacing grid; 24px page gutters; 1200px max container on web. Mobile-first booking flow with a sticky app bar and bottom tab bar.
- **Transparency/blur:** reserved for overlays (modal scrim) and the translucent location chip on the blue header. Used sparingly.

---

## Iconography
Two tiers:
- **Inline UI icons — Font Awesome.** The brand holds a Font Awesome Pro membership (*"30,000+ icons… 1M page views/month"* per the Figma guideline). Solid style is the default; used inline in buttons, badges, fields, nav. Loaded here from the Font Awesome **free** CDN (`6.5.1`). **Substitution flag:** Pro-only glyphs need the Pro kit in production.
- **Large feature icons — Streamline “Flex Solid”** (`<FeatureIcon>`). **157 licensed icons** (provided by the OTR team) for big, standalone icons on the Native app / marketing surfaces (empty states, value props, onboarding, feature rows). Each is a single monochrome path normalized to `currentColor` and inlined in `components/icons/icon-data.js`, so the set is self-contained and themeable. Render with `<FeatureIcon name="shield-check" size={48} />` or `featured tone="brand"` for the tinted container. Names not in the registry fall back to a Font Awesome solid glyph. To add more, drop SVGs in `assets/icons/streamline-flex-solid/` and regenerate (folder README has the script).
- **Star ratings** are drawn as inline SVG (`Rating` component) for partial-fill control.
- **No emoji** as icons. Unicode is not used for iconography.
- **Logo:** the “Off the Record” wordmark + lowercase **“o” brandmark** live in `assets/logos/` (navy `#002340` and white variants, each with explicit path fills so they render in both live and thumbnail renderers).

---

## Index / manifest
**Root**
- `index.html` — **front-end demonstration page**: an accessible, solid-background showcase of the brand, palette, type scale, and live components. The system's front door.
- `styles.css` — global entry point (import this). `@import`s all tokens + base reset + full Figma variable set.
- `readme.md` — this guide.
- `SKILL.md` — portable skill manifest (Agent Skills compatible).

**`tokens/`** — `fonts.css` (Figtree), `colors.css`, `typography.css`, `spacing.css`, `radius.css`, `base.css`, and `fig-tokens.css`/`fig-typography.css` (full Figma variable dump, incl. dark-mode & responsive scopes).

**`components/`** (React, `window.OffTheRecordDesignSystem_6eff96`)
- `actions/` — **Button** (6 variants × 5 sizes), **Link**
- `forms/` — **Input**, **Textarea**, **Select**, **Checkbox**, **Radio**, **Toggle**
- `display/` — **Badge** (intent×emphasis system), **Tag**, **Avatar**, **Rating**, **Card**
- `icons/` — **FeatureIcon** (large Streamline Flex Solid feature icons, with Font Awesome fallback)
- `feedback/` — **Banner**, **Toast**, **Tooltip**, **Modal**, **ProgressBar** / **StepProgress**
- `navigation/` — **Breadcrumbs**, **Tabs** (underline/pill), **Pagination**, **NavBar**, **BottomNav**, **DropdownMenu**
- `selection/` — **SelectionCard**, **Stepper**, **SegmentedControl**, **PhotoUpload**
- `disclosure/` — **Accordion** (FAQ), **Skeleton** / **SkeletonCard**, **CalloutCard**, **PromoCard**
- `product/` — **AttorneyCard**, **QuoteCard**, **PaymentLineItems**, **PaymentMethodSelector**, **PaymentPlanPicker**, **CourtCard** (OTR-specific composites)

**`ui_kits/`**
- `client-app/` — interactive mobile client app (find attorney → instant quote → booking → case portal → account).

**`guidelines/`** — foundation specimen cards (Colors, Type, Spacing, Brand) shown in the Design System tab.

**`assets/logos/`** — wordmark & brandmark SVGs (navy/white).

---

## Scope & caveats
This system is **complete for Off The Record's consumer-facing surfaces** — the booking flow and client portal. It ships **40 components across 8 groups**, the full token foundation (1,900+ variables incl. dark-mode & responsive scopes), foundation specimen cards, an interactive client-app UI kit, and a front-end demonstration page. The components are **parameterized** (props for size/colour/state/variant), so they reproduce the Figma file's many variant permutations rather than hard-coding each one — the curated set is the intended deliverable, not a partial port.

- The "Native App / Design" frames (Homescreen, Onboarding) were **not reachable** in the mounted Figma VFS. The client-app UI kit is reconstructed faithfully from the Guidelines components and the booking-flow / instant-quote specs. If you can re-attach that file, the home & onboarding screens can be added.
- **Figtree** is served from Google Fonts (it is the exact brand font, freely available). Self-host woff2 if you need offline builds.
- Font Awesome is loaded from the **free** CDN; production should use the brand's **Pro** kit.
