# Sprint brief — Brandforge showcase copy overhaul

**Status:** Ready to implement
**Scope:** `metanoia-designsys` → `showcase/` — AI guide pages and welcome page
**Prepared by:** CD / FC
**Intended for:** Claude Code agent — read before touching any showcase file

---

## What this sprint does

Rewrites and restructures the user-facing copy across three showcase pages. Renames all public-facing product references. Does not touch tokens, components, or any file outside `showcase/`.

---

## 01 — Naming changes (global, all showcase files)

These replacements apply everywhere in `showcase/` — page titles, meta tags, prose, sidebar, footer, prompt copy blocks, and any inline references.

| Remove | Replace with | Notes |
|---|---|---|
| "Sweden" | "Brandforge" | Never appears in user-facing surfaces again |
| "Sweden User Manual" | "Brandforge" | Sidebar title, meta titles |
| "design system" (as a category descriptor) | "Brandforge" | Brandforge *is* the noun — no category needed |
| "I'm working with the Metanoia design system (Sweden)." | "I'm working with Brandforge." | Prompt context blocks only |
| "save" | "push" | All save/commit language uses push instead |
| "commit" | "push" | Same |

**Naming hierarchy to maintain:**
- Sidebar header: two-line lockup — `Metanoia` (title) / `Brandforge` (subtitle)
- Page meta titles: `[Page name] — Brandforge`
- Footer: `Brandforge by Founding Creative`
- Prose, first mention per page: `Brandforge` — no possessive, no "Metanoia's"
- Prose, subsequent mentions: `Brandforge`

---

## 02 — Page architecture

Three pages are affected. The existing three-page structure is retained but content inside each page is significantly revised. Do not add pages or change routes.

| Page | Route | Status |
|---|---|---|
| Welcome | `/` | Full rewrite |
| Generate | `/ai-guide/generate` | Full rewrite |
| Update | `/ai-guide/update` | Full rewrite |

---

## 03 — Welcome page (`/`)

### Page title
`Brandforge`

### H1
`Every AI output starts here.`

### Subhead (lede)
`Brandforge is Metanoia's brand made machine-readable. It gives any AI tool instant access to the exact colors, type, spacing, and rules — not a description of them, the actual values. Every asset generated through Brandforge starts on-brand and stays there.`

### Body paragraph
`Most AI-generated work drifts because the AI is guessing. It doesn't know your exact navy, your type scale, or which components exist. Brandforge fixes that at the source — before the first word of a prompt is written.`

### Callout block — "The only rule worth memorizing"

Two-column table:

| You bring | Brandforge brings |
|---|---|
| Your goal | Colors, typography, spacing — exact values |
| Your audience | Component rules and layout patterns |
| Your message | Everything else the brand requires |

Below table (small/muted):
`If you're pasting colors, copying CSS, or looking up font names — stop. That's Brandforge's job, not yours.`

### Section — "Where do you want to start?"

Three cards: Generate, Update, Explore. Short descriptor under each. Link to respective routes.

---

## 04 — Generate page (`/ai-guide/generate`)

### Page title
`Generate on-brand — Brandforge`

### H1
`Generate something new.`

### Lede
`Tell the AI what you need and who it's for. Brandforge handles every visual decision automatically — no color names, no font lookups, no brand rules to memorize.`

### Before you start (notice block)
`Open a new session in Claude Code with the Metanoia repo connected. Brandforge loads automatically — you don't need to configure anything. Just start describing what you want to make.`

### Session warning block (visually distinct — warning treatment)
Label: `Your work lives in the session until you push it`

Copy: `Anything you generate exists only in your current Claude Code session. If you close the tab or start a new conversation, it's gone. Push your work to its destination before you leave — each surface has its own push command listed below.`

### Steps — "How to prompt"

**Step 1 — Start a fresh conversation**
Open a new session each time. A clean slate means Brandforge loads correctly and nothing from a previous session carries over unexpectedly.

**Step 2 — Describe what you're making and who it's for**
Name the asset, the audience, and the goal. Don't describe colors or fonts — describe the communication problem you're solving. Brandforge translates intent into on-brand output.

Example: *"Create a landing page for the AIC product. Audience is operations managers at mid-size manufacturers. Goal is to get them to request a demo. Three sections: hero, key benefits, call to action."*

**Step 3 — Describe structure, not style**
Say what sections or pieces you need. Leave every visual decision to Brandforge. If you need to reference something visual, use plain English — the AI will translate it to the right brand value.

Example: *"Hero with a headline, one-sentence subhead, and a button. Three feature cards below. Footer with contact info." — not: "Use the dark navy background with the aqua button."*

**Step 4 — Review and direct**
If something feels off, say so in plain English. "The headline feels too small." "The cards feel cramped." You're directing — Brandforge is executing. You never need to touch the code.

**Step 5 — Push your work**
When you're happy with the result, use the push command for your surface type. This sends the file to its destination so it exists beyond the session and is accessible to your team.

### Section — "Example prompts by surface"

Intro copy: `Active surfaces can be generated and pushed today. Coming soon surfaces can be previewed in-session but don't have a push command yet — your work will be lost when the session ends.`

**Surface cards — structure for each:**
- Surface name + badge (Active or Coming soon)
- Example prompt (italicised, Metanoia-specific — see copy below)
- Push row: label `Push command:` + the command or `not yet available`

**Landing page** — badge: Active
Example prompt: *"Create a landing page for the AIC product. Audience: operations managers at mid-size manufacturers. Goal: demo requests. Sections: hero with headline and CTA, three benefit cards, closing CTA strip."*
Push command: `/push-to-lab`

**Presentation** — badge: Coming soon
Example prompt: *"Build a 10-slide pitch deck for a manufacturing prospect. Cover, problem, solution, three product highlights, case study, pricing overview, next steps, thank you."*
Push command: `not yet available`

**Email** — badge: Coming soon
Example prompt: *"Write a re-engagement email for prospects who attended a demo but haven't followed up. Warm tone, one clear CTA to book a follow-up call. Under 150 words."*
Push command: `not yet available`

**One-sheet** — badge: Coming soon
Example prompt: *"Create a one-sheet for the iBOM product. Audience: plant managers evaluating digital parts management tools. Lead with the time-saving outcome. One page, print-ready."*
Push command: `not yet available`

---

## 05 — Update page (`/ai-guide/update`)

### Page title
`Update an asset — Brandforge`

### H1
`Update an existing asset.`

### Lede
`Change one thing. Name exactly what it is. Say explicitly what stays the same. That's the whole discipline.`

### Body paragraphs
`Updating is not regenerating. When you update, something already exists and most of it should stay exactly as it is. The more precisely you scope the change, the less the AI touches things you didn't ask about.`

`Brandforge stays connected throughout — you don't re-explain the brand or paste anything in. What you bring is the one thing Brandforge can't know: why this change is happening and what the new direction is.`

### Before you start (notice block)
`Open Claude Code with the Metanoia repo connected. You'll use the Read command to load the asset file — the AI sees the current file and Brandforge's rules at the same time, automatically. Don't copy-paste code into the conversation. That creates a disconnected copy. Always load through the repo.`

### Section — "Using the Read command"

Intro: `The Read command loads any file from the repo into your session. You type it directly in the Claude Code conversation, just like a message.`

Four-step walkthrough (numbered, in a visually distinct block):

1. Find the file path in your repo — for example, a landing page lives at `site/landing/aic-product.html`
2. Type the Read command in your Claude Code conversation:
   ```
   Read site/landing/aic-product.html
   ```
3. Claude will confirm the file loaded and summarise what it sees. You'll know it worked when it describes the current content back to you.
4. Follow your Read command with your update instruction in the same message or the next one:
   ```
   Read site/landing/aic-product.html

   Change the headline to "Clarity through structure." Keep the same size, weight, and color — only the words change.
   ```

### Steps — "How to prompt an update"

**Step 1 — Load the asset with Read**
Type `Read [file path]` to pull the file into context. The AI sees the current asset and Brandforge's rules simultaneously. No setup needed on your end.

**Step 2 — Name exactly what changes**
Be specific. Vague instructions give the AI room to interpret — and it will use that room. Precise instructions leave no space for guessing.

Example: *"Change the headline to 'Clarity through structure.' Keep the same size, weight, and color as the current headline — only the words change."*

**Step 3 — Name what stays the same**
This is the most important habit in updating. Telling the AI what not to touch is as important as telling it what to change.

Example: *"Update the background color only — don't touch the typography, spacing, or layout." / "Change the copy only. No visual changes at all."*

**Step 4 — Verify what moved**
Ask the AI to confirm what changed before accepting anything. One thing should have moved. Everything else should be identical.

Example: *"Show me only what changed. Confirm everything else is identical to the original file."*

**Step 5 — Push your work**
When the update is right, use the push command for this surface type to send the change to its destination. Until you push, the update only exists in your session.

```
# For a landing page:
/push-to-lab
```

### Section — "What not to do"

- Paste existing code or CSS into the chat. Use `Read` instead — pasting creates a disconnected copy that's no longer wired to the real brand.
- Say "make it look better." Name the specific property you want to change. Subjective prompts produce unpredictable output.
- Ask for a redesign when you want a tweak. "Redesign this section" gives the AI permission to rebuild from scratch. Name the one thing.
- Close the session before pushing. Use the push command first — unpushed work disappears when the session ends.

---

## 06 — Push command standard

All "I'm done" commands follow this convention. Apply consistently across all pages, prompts, and future documentation.

**Verb:** `push`
**Format:** `/push-to-[destination]`
**Language rule:** Never say "save." Never say "commit." Always say "push."

Current commands:

| Command | Destination | Status |
|---|---|---|
| `/push-to-lab` | Showcase lab | Active |
| `/push-to-site` | Marketing site | Planned |
| `/push-to-deck` | Presentation library | Planned |
| `/push-to-email` | Email templates | Planned |
| `/push-to-sheet` | One-sheets | Planned |

As new surface commands ship, add a row to this table and update the corresponding surface card on the Generate page.

---

## 07 — Sidebar and footer (global)

These appear on every page. Update the layout component, not individual pages.

**Sidebar header:**
```
Metanoia        ← title treatment
Brandforge      ← subtitle treatment
```

**Sidebar footer:**
```
Brandforge by Founding Creative
```

**Version tag:** Retain `v3.4.0` in sidebar footer — keep below the Founding Creative attribution line.

---

## 08 — What not to touch

- Token files — no changes
- Component files — no changes  
- Any file outside `showcase/`
- Existing routes and URL structure
- Dark/light mode toggle — retain as-is
- Sidebar navigation link structure — retain, update labels only where "Sweden" appears

---

## 09 — Verification checklist

Run after implementation. All must pass before merge to `main`.

- [ ] Zero instances of "Sweden" in any user-facing showcase file
- [ ] Zero instances of "design system" as a standalone category descriptor
- [ ] Zero uses of "save" or "commit" in user-facing copy — "push" only
- [ ] Sidebar header renders Metanoia / Brandforge two-line lockup on all pages
- [ ] Footer reads "Brandforge by Founding Creative" on all pages
- [ ] Meta titles follow `[Page name] — Brandforge` pattern
- [ ] Session warning block present on Generate page
- [ ] Read command walkthrough present on Update page with working code blocks
- [ ] All four surface cards on Generate page have push row
- [ ] Landing page badge reads Active — all others read Coming soon
- [ ] `/push-to-lab` is the only active command shown — all others show `not yet available`
- [ ] Light and dark mode render correctly after copy changes
- [ ] No layout regressions on mobile viewport
