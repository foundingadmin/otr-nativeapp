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
3. **Sections cannot take corner radius or auto layout.** They are
   organizational only. Anything that needs the specimen look (rounded,
   auto layout, breathing room) must be a FRAME.
3b. **Auto layout all the way down (ratified, brief 4).** Sections exist
   only at the topmost layer. Every container inside is an auto-layout
   frame: header columns, item wrappers, wrapping rows for small parts.
   Hand-placed grids are banned; if content grows, the sheet must flow.
4. **Display and storage are different layers.** Component sets cannot use
   auto layout, so never hand-grid variants as the presentation. The client
   pattern (see the Buttons specimen, node 11355:19505): presentation
   sheets are frames of INSTANCES with auto layout; variant masters park in
   a compact strip. Wrap counts chosen by hand ("4 per row") are always
   wrong.
5. **Screen demos have a minimum device height.** No 300px "phones."
   Every sheet and group carries a title AND a one-line description;
   "what am I looking at" must always have an answer on canvas.
6. **Canvas language**: hue = surface type; band tint one step stronger
   than plate; type on bands is ink, never white; white = a pickable
   object. Annotations use Canvas/Title, Canvas/Note, Canvas/Label styles,
   never raw one-off text.
6b. **Label-noise control (user technique, Jul 29)**: sections always
   render their name on canvas, top-level frames render theirs, GROUPS
   never do. When we print our own titles, wrap the outermost containers
   in groups so Figma's tiny labels disappear and the designed titles are
   the only titles. Nested frames inside a group are label-free too.

## Figma plugin API traps (use_figma)

7. `figma.skipInvisibleInstanceChildren` defaults true in this harness.
   Set it false at the top of any script that findOne()s hidden override
   slots inside instances, or they return null.
8. `setBoundVariableForPaint` can leave the paint's base color unsynced
   (renders black or stale). Always build bound paints from the honest hex:
   `solidPaint(realHex)` then bind. Sweep for bound-black paints after
   bulk binding.
9. Semantic `global/foreground/*` variables alias the light/dark
   collection and can flip. Product text binds primitives (`colors/ink/*`)
   per session 1 precedent. Verify with `resolveForConsumer`, not with a
   screenshot.
10. Parse variant names BEFORE popping variants out of a component set;
    extraction can rename nodes mid-loop.
11. The screenshot endpoint serves stale cached tiles for minutes after
    edits (sometimes identical bytes across calls). Never diagnose from a
    single render: verify structurally (outline, resolvedVariableModes,
    resolveForConsumer) or pixel-sample a fresh export.
12. One `setCurrentPageAsync` per script; fan multi-page work into
    parallel calls.

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
