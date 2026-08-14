# cases/ — The Cases workflow

Everything a user sees to track a ticket they've handed to OTR. One workflow; inside it, workstreams named `<category>-<task_name>`, each with the standard shape (canonical board → kits/ → explorations/ → archive/ → LEDGER.md):

- `_docs-cases/` — the workflow’s PRD + decision records (`_docs-cases/decisions/LEDGER.md` is the index).
- `_ds-cases/` — the DS delta this workflow produced; travels with the UI at handoff.
- `system-case_status_and_action/` — the case status badge registry + status language system. Source of truth for status language (PRD §6–§9).
- `component-case_preview_cards/` — the Case Preview Card component: per-state specs + card-level treatment divergences (PRD §9).
- `screen-all_cases_feed/` — the Cases tab: the feed of Case Preview Cards (PRD §8, §11).
- `screen-single_case_details/` — the case detail page: the full record for a single case (PRD §10).

**Authoritative PRD:** `_docs-cases/Cases Tab PRD.md`. Decisions here flow downstream to the homescreen and other surfaces — never the reverse (DR-X-008).
