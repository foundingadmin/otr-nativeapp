# cd-kit — Claude Design startup install

Give Claude Design (CD) a dictated project architecture at session zero,
instead of letting it invent one. The kit has two parts:

1. **`CD-PROJECT-BRIEF.md`** — paste (or upload) into a brand-new CD project
   as its first instruction. It dictates the scaffold, naming conventions,
   token discipline, and the exact package format CD must export back for
   CC's intake pipeline.

2. **`seed/`** — the canon seed CC generates for the client. Because most
   client work starts Figma-first, CC runs the read-back pipeline first
   (Figma → tokens + components + rules) and writes the results here. The
   operator uploads the seed into CD alongside the brief, so CD starts with
   the client's real tokens and components — never guessed brand values.

## Operator flow (Figma-first client, the 99% case)

1. Run Sweden activation (`../ACTIVATE.md`) → Path B builds canon from Figma.
2. Ask CC: "generate the CD seed" → CC fills `cd-kit/seed/` from canon.
3. New CD project → upload `CD-PROJECT-BRIEF.md` + the `seed/` contents.
4. CD designs inside the dictated scaffold, exports packages per the brief.
5. Packages land in `intake/` → CC tokenizes, reconciles, prints to Figma.

For net-new clients (no Figma yet), skip the seed or generate it after Path D
scaffolds first tokens.
