# seed/ — canon seed for Claude Design

CC generates these files from canon (usually after the Figma read-back) when
the operator asks for "the CD seed":

- `tokens/*.css` — flattened token CSS from `brand/tokens/output/web/`
- `components/` — normalized component HTML from `brand/components/html/`
- `BRAND-RULES.md` — condensed from `brand/BRAND.md` Design Rules + Copy/Voice
- fonts the client uses (or links to them)

Upload the contents of this folder into the CD project together with
`CD-PROJECT-BRIEF.md`. Regenerate whenever canon changes materially.
