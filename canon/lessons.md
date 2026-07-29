# Lessons ledger · read during preflight

Hard-won rules from sessions 1 through 4. Each one cost something. Breaking
one again costs more.

## Layout and containment

1. **Resize is not relayout.** Growing any section changes the geometry of
   its siblings' world. After ANY size change, re-flow the parent's
   children. The ③/④ overlap shipped twice because a widened section slid
   under its neighbor while every child-in-parent check passed.
2. **Containment QA is two checks, not one.** (a) children inside parent
   bounds, (b) PAIRWISE overlap across all siblings at page level. Run both
   after every print, before ending the session. The user has flagged
   hang-outs three times; there is no fourth pass.
3. **Sections are ditched (D-013, Jul 29).** They cannot take auto
   layout or radius, so plates are FRAMES now: auto layout, padding
   spacing/13xl (96), radius 80 (raw, no DS token that large, flagged),
   fill brand/50, hairline black 10% stroke. Carve-out: pages hosting
   presentable rigs keep rigs at page level (see 12b3).
3b. **Auto layout all the way down (ratified, brief 4; extended D-013).**
   Every container including the topmost plate is an auto-layout frame:
   header columns, item wrappers, wrapping rows for small parts.
   Hand-placed grids are banned; if content grows, the sheet must flow.
3c. **Demo wells + numeric binding (D-013).** A shelf's right rail is a
   demo well: global/background/strong fill, global/border/neutral/
   default 1px, padding spacing/8xl (48), radius radius/XL (20), content
   centered, FILL height when the left rail is taller. Bind EVERY
   numeric to a DS token (radius + spacing maps in BRAND.md). Nested
   radius formula: inner = outer minus padding, snapped to the nearest
   smaller token; eyeball-check that nested corners never pinch.
4. **Display and storage are different layers.** Component sets cannot use
   auto layout, so never hand-grid variants as the presentation. The client
   pattern (see the Buttons specimen, node 11355:19505): presentation
   sheets are frames of INSTANCES with auto layout; variant masters park in
   a compact strip. Wrap counts chosen by hand ("4 per row") are always
   wrong.
5. **Screen demos have a minimum device height: 844px (locked, Jul 29).**
   A frame insinuating a mobile mock must be at least a real phone tall;
   short content gets background fill to 844. Present screens through a
   Rig (Proto page) resized to the device size you need; OS chrome lives
   in OTR/Mock/Chrome overlays, never inside screen designs.
   Every sheet and group carries a title AND a one-line description;
   "what am I looking at" must always have an answer on canvas.
6. **Canvas language**: hue = surface type; band tint one step stronger
   than plate; type on bands is ink, never white; white = a pickable
   object. Annotations use Canvas/Title, Canvas/Note, Canvas/Label styles,
   never raw one-off text. Canvas type ramp (Jul 29): Canvas/Page,
   /Section, /Collection, /Item tiers, each with Headline + Text, plus
   Caption (96/28, 64/22, 36/17, 22/14, 12). Tier matches container.
   Block anatomy is always: bold title, one-line
   description, then the visual. Axis-dump labels (form: card · compact
   signal: none · urgency...) are banned; they are noise, not naming.
6b. **Label-noise control (user technique, Jul 29)**: sections render
   their own name AND the names of their direct frame children (proven in
   brief 5); top-level frames render theirs; GROUPS never do. When we print our own titles, wrap the outermost containers
   in groups so Figma's tiny labels disappear and the designed titles are
   the only titles. Nested frames inside a group are label-free too.

6c. **Shelves is the default presentation system (verdict, Jul 29).** One
   white rounded auto-layout shelf per family: fixed-width index card
   (bold name + human description) then the content, as wide as needed.
   The other six proposal systems stay on the Proposed page as the
   toolbox for cases where a shelf fits worse. Proposed lives on its own
   sub-page; Components, Screens, Diffs live on the area page.
6d. **Verify existence before destroy.** A user may hand-wrap nodes in
   groups mid-session; never assume the tree matches your last write.
   Confirm critical nodes survived any bulk removal BEFORE building on
   top (the family sets nearly shipped inside a deleted sheet).

## Figma plugin API traps (use_figma)

7. `figma.skipInvisibleInstanceChildren` defaults true in this harness.
   Set it false at the top of any script that findOne()s hidden override
   slots inside instances, or they return null.
8. `setBoundVariableForPaint` can leave the paint's base color unsynced
   (renders black or stale). Always build bound paints from the honest hex:
   `solidPaint(realHex)` then bind. Sweep for bound-black paints after
   bulk binding.
9. **Semantic foreground/background variables are MODE-AWARE (reframed
   Jul 29).** The DS team ships light/dark modes; `global/foreground/*`
   flipping is the feature, not a bug (session 1 misdiagnosed it).
   Choose bindings intentionally: semantic `global/foreground/dark/*`
   ramp (primary...quinary) for text that should flip with mode;
   `colors/ink/*` primitives ONLY when a color must be mode-locked.
   Canvas furniture text binds the semantic ramp (Lexicon precedent:
   titles=primary, body=tertiary, captions=quinary; secondary is nearly
   identical to primary, skip it for hierarchy). Product screens still
   bind ink primitives from session 1 and are therefore mode-locked; a
   migration to the semantic ramp is an OPEN candidate. Always verify
   with `resolveForConsumer`, never with a screenshot.
10. Parse variant names BEFORE popping variants out of a component set;
    extraction can rename nodes mid-loop.
11. The screenshot endpoint serves stale cached tiles for minutes after
    edits (sometimes identical bytes across calls). Never diagnose from a
    single render: verify structurally (outline, resolvedVariableModes,
    resolveForConsumer) or pixel-sample a fresh export.
12. One `setCurrentPageAsync` per script; fan multi-page work into
    parallel calls.

12b. **Instances are sealed boxes.** Nothing can be appended inside a
    component instance, and swapped nested instances keep the MASTER's
    slot geometry (a tall screen crops to the slot height; resize from
    outside is ignored). Instance-swap slots = static quick looks only.
    Real scroll/drop testing requires detached, duplicatable bench
    frames (clipped content + overflowDirection VERTICAL). figma.createSlot
    does not exist in this plugin API; the native Slot feature is
    UI-only for now.
12b2. **Native-first proto testing (verdict, Jul 29; hardened 4n).**
    Figma's presentation settings render real device bezels; do not
    rebuild bezels for flow testing. The tools are two flexible Rigs on
    ↪ Proto: plain frames whose screen and chrome children STRETCH, so
    you resize to any device size instead of picking a matching mock.
    OTR/Mock/Chrome supplies status and home bars (fix position
    manually; scrollBehavior is not in the plugin API). OTR/Mock/Device,
    Slot, and the bench are DEPRECATED on the Archive page.
12b3. **Prototype start frames must be page- or section-level.** A frame
    nested inside another frame (a shelf, a column) cannot start a flow
    or be presented. Anything meant to be presented lives as a direct
    child of the page or a topmost section, even when that breaks the
    shelf pattern; the section renders its instructional name as the
    label instead of an index card.
12b4. **Everything in a device rig stretches.** Chrome sets, screens,
    and rig children all use auto layout / STRETCH constraints so the
    rig resizes to any device size. Fixed-dimension device variants are
    the smell that got the 24-variant mock set retired. Before
    converting a tree to auto layout, audit it: the 12 screens were
    already fully responsive and needed zero changes.
12c. **Chrome hunting is content-based.** Screen chrome hid as
    Detail/StatusZone instances; name searches miss it. Find chrome by
    what it renders (9:41, 12:30) and walk up to the holder.

## Process

13. **Recency before printing (D-009).** CD root HTMLs can trail ratified
    decisions because exploration escalation is manual. Cross-check any
    board against explorations and the ledger, and confirm with the user,
    before printing it as canon.
14. **When a pass is rejected, stop iterating live.** Build wireframe
    proposals off to the side (③ Proposed, dated group) and get a verdict.
    Structural canvas decisions run for months; churn burns trust.
    Verbatim verdict: "try harder."
15. **Candidates vs decisions (D-012).** CD outputs candidates; only
    Figma-stamped, ledger-recorded verdicts are decisions. Disposable: CD
    projects, exploration bodies, unverdicted prints. Permanent: repo,
    canon, verdicts.
16. **Reuse the binding index before re-resolving colors.** CIEDE2000
    passes are expensive and already done for most values;
    `canon/binding-index.json` is the source. Thresholds: <2 silent bind,
    2 to 5 bind + flag, >5 raw + DS request (session precedent stretches
    flags to 6).
17. **Video briefs**: the pipe is Drive folder + brief-crunch (mp4 + txt +
    srt land automatically). gdown for anything over the connector's 10MB
    cap; read the .txt, skip transcription when an .srt exists; seek-based
    frames only. Answer the asides; the highest-value item usually hides
    there.
18. Every session ends with: canon files updated, commit pushed, PR
    current, and this file extended if something new was learned the hard
    way.
19. **Tree demos in replies stay narrow.** Sidebar/structure trees keep
    each line short enough to never wrap (roughly 40 chars); no inline
    annotation tails on tree lines. Notes go below the tree. Wrapped
    tree lines are unreadable (user flag, Jul 29).
