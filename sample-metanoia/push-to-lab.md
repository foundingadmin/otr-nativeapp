Ship a finished lab file to `showcase/public/lab/` and push it directly to main.

## Step 1 — Identify the file

If the user named a file, use that. Otherwise find the most recently modified `.html` file in `showcase/public/lab/` that hasn't been committed yet.

## Step 2 — Validate (fail fast on any violation)

Run these checks and report each result with ✓ or ✗:

**Filename**
- [ ] Matches `[type]-[slug]-[YYYYMMDD].html` format
- [ ] Lives in `showcase/public/lab/`

**Meta block**
- [ ] `<!-- lab:meta -->` block is present at top of `<body>`
- [ ] Has `title:`, `type:`, `date:`, `description:`, `author:` fields

**Token compliance**
- [ ] Zero hardcoded hex values — run: `grep -E "#[0-9a-fA-F]{3,6}" [file]`
- [ ] Zero hardcoded rgba() values — run: `grep -E "rgba\([0-9]" [file]`
- [ ] Zero hardcoded font names — run: `grep -E "font-family\s*:" [file]` (only `var(--font-*)` allowed)
- [ ] Barrel CSS linked correctly: `https://metanoia-designsys.vercel.app/colors_and_type.css`

**Dark sections**
- [ ] Every element with a dark/navy background carries `data-theme="dark"` — scan for `background.*navy\|background.*dark` without a nearby `data-theme`

If any check fails, **stop and list the violations**. Do not proceed until the user fixes them or explicitly overrides with `--force`.

## Step 3 — Checkpoint: preview card

Show the user a summary before committing:

```
Ready to push to lab:

  File:        [filename]
  Title:       [from meta]
  Type:        [from meta]
  Date:        [from meta]
  Description: [from meta]
  Author:      [from meta]

  Token checks: all passed
  Will push directly to main (no PR)

Type yes to ship it, or no to cancel.
```

Wait for confirmation.

## Step 4 — Commit and push to main

```bash
git add showcase/public/lab/[filename]
git commit -m "lab: add [type] — [slug] ([date])"
git push origin main
```

## Step 5 — Confirm

Report the live URL:

> ✓ Shipped: https://metanoia-designsys.vercel.app/lab/[filename]
>
> Vercel will deploy in ~30s. The file will appear as a card on the Lab index once the build completes.
