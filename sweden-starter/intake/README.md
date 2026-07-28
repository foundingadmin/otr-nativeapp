# intake/ — Claude Design package drop zone

Drop each Claude Design (CD) package into its own subdirectory here:

```
intake/
└── <package-name>/     ← one CD package (HTML, CSS, assets, fonts)
```

## What happens after a drop

Claude processes each package through this pipeline:

1. **Audit** — read every file; inventory colors, type scale, spacing, radii,
   shadows, motion, components.
2. **Tokenize** — extract values into `brand/tokens/source/*.tokens.json`
   (W3C Design Tokens format) and update `brand/token-map.js` and
   `brand/BRAND.md`.
3. **Componentize** — normalize each UI component into
   `brand/components/html/<name>.html` using `var(--token)` references only.
4. **Print** — bootstrap Figma variable collections (`init-figma.js`), then
   generate `use_figma` plugin scripts per `sweden/engine/FIGMA-PLUGIN.md` to
   draw each component into the target Figma file with variable bindings.

Packages in this directory are raw input — never edited in place, and safe to
delete once tokenized and componentized.
