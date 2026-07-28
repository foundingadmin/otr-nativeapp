# Translator: html-to-astro

Converts standalone DS component HTML into `.astro` components.

**Status:** Implemented and validated (v3.4.0)

---

## Usage

```bash
node sweden/translators/html-to-astro/index.js <input.html> [--out <dir>]
```

Default output: `brand/components/astro/`

```bash
# Single component
node sweden/translators/html-to-astro/index.js my-component.html --out showcase/src/components/

# Lab page → Astro
node sweden/translators/html-to-astro/index.js showcase/public/lab/my-page.html --out /tmp/preview/
```

---

## What it does

- Extracts `<style>` → scoped Astro `<style>`
- Extracts `<script>` → Astro `<script>`
- Converts `data-*` attributes → Astro props in frontmatter
- Preserves all `var(--token-name)` references — never resolves to hardcoded values
- Warns (does not fail) on hardcoded hex colors or px font sizes found in output

---

## Canonical workflow for new DS components

This is the standard path for adding a new component to the Astro showcase:

1. Build or receive the component as standalone HTML (from Figma translation, lab file, or scratch)
2. Run the translator: `node sweden/translators/html-to-astro/index.js <file>.html --out showcase/src/components/`
3. Review translator warnings — replace any flagged hardcoded values with `var(--token-name)`
4. Move or integrate the output into `showcase/src/pages/components/<name>.astro`
5. Add to sidebar nav in `showcase/src/components/Sidebar.astro`
6. Bump version per CLAUDE.md versioning rules

**Never hand-build a new showcase page from scratch** if you have existing HTML — run it through the translator first and iterate from there.

---

## What the translator does NOT do

- Does not run automatically — always on-demand
- Does not fetch from Figma — for Figma → HTML, use `sync-figma-to-repo.js` first
- Does not resolve token aliases to computed values — `var(--color-navy)` stays as-is
- Does not generate Astro layouts or page shells — output is a component fragment
