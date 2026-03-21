# EBD Governance

## Public Scope

Current public scope for the EBD module:

- `Adultos 1T/2026`: published
- `Adultos 2T/2026`: in publication, with `Lição 1` already public and the remaining lessons following gradual weekly release
- `Jovens 1T/2026`: published
- `Jovens 2T/2026`: in publication, with `Lição 1` already public and the remaining lessons following gradual weekly release

The `Infantil` class remains preserved in the architecture, but editorial production is intentionally paused.
In the current codebase, it stays out of public discovery because the class is not marked for public publication on the site.

## What counts as published

The current project behavior uses three layers of editorial eligibility:

1. **Class visibility**
   - a class only enters public discovery when it is marked with `publicadaNoSite: true`
   - the class also needs at least one published lesson to be considered publicly available

2. **Quarter visibility**
   - quarter pages can exist before launch
   - quarters marked as `draft` remain out of public discovery
   - direct routes may still exist for internal review and editorial preparation

3. **Lesson visibility**
   - lesson routes can exist before launch
   - a lesson only becomes public when it is `published`, editorially ready and already inside the weekly release window
   - lessons that are `published` but still incomplete editorially must remain outside discovery and under `noindex`
   - unpublished lessons remain accessible by direct route only when already prepared internally, but they must stay outside discovery and under `noindex`

## Editorial Readiness

The codebase now distinguishes **editorial readiness** from **public release**.

A lesson may exist in the dataset and still be considered incomplete from an editorial point of view.
That distinction is now represented by internal readiness helpers, without changing public discovery by itself.

### Adult readiness checklist

For `Adultos`, a lesson is considered editorially ready when it has, at minimum:

- title
- date
- summary
- `texto áureo` or equivalent
- `verdade prática`
- `leitura diária`
- `leitura bíblica em classe`
- application
- at least one useful pedagogical block

Useful pedagogical block for `Adultos` means at least one of:

- objectives
- teacher support
- student support
- outline
- subsidy/development block

### Youth readiness checklist

For `Jovens`, a lesson is considered editorially ready when it has, at minimum:

- title
- date
- summary
- `texto principal`
- `leitura semanal`
- `texto bíblico`
- at least one useful pedagogical block

Useful pedagogical block for `Jovens` means at least one of:

- objectives
- interaction
- pedagogical guidance
- review block
- teacher support
- student support
- outline/development block

### Important distinction

Editorial readiness does **not** mean that the lesson is already public.

At the current stage of the project:

- readiness is an internal editorial checklist
- `statusEditorial` still defines whether the lesson is `draft` or `published`
- the weekly release window still defines when a published and editorially ready lesson becomes publicly discoverable

This means a lesson can be:

- mapped in the dataset
- editorially incomplete
- still `draft`
- and therefore outside public discovery

Or it can be:

- editorially ready
- still waiting for the correct weekly release window
- and therefore not yet publicly discoverable

And it can also be:

- `published`
- still editorially incomplete
- and therefore still outside public discovery until the checklist is complete

## Draft Policy

Future quarters may exist in the dataset and routes before launch, but they remain in backstage mode until the release gate is met.

Backstage rules:

- draft quarters must stay out of public discovery on home, EBD hub and class pages
- draft quarters and draft lessons must stay out of the public sitemap
- draft pages must remain `noindex`
- direct routes may exist for internal review and content preparation

This means route existence is not the same thing as public publication.
The public layer is defined by the combination of editorial helpers, sitemap eligibility and page-level `robots`.
At this stage, public lesson eligibility depends on all three conditions together:

- `statusEditorial: published`
- editorial readiness checklist completed
- weekly release window already open

## Front Behavior Today

Current front behavior is:

- `/ebd` only surfaces classes that are public today
- class pages surface only the material that is considered public for discovery
- quarter pages can render an `Em preparação` state when the quarter is still `draft`
- lesson pages can render a `Conteúdo em preparação` state when the lesson is not published
- lesson pages outside public eligibility remain `noindex`, even if they already exist in the route tree
- draft quarters and unpublished lessons remain outside the public sitemap
- draft quarter pages and unpublished lesson pages remain `noindex`

## 2026 Release Gate

Current release gate by class:

- `Adultos 2T/2026` is now open as a public quarter because `Lição 1` is editorially ready and uses the same localized release override pattern already adopted in `Jovens 2T/2026`
- `Adultos 2T/2026` uses `statusEditorial: partial`, which allows the quarter page to be discoverable even while lesson publication continues gradually
- `Lição 1` of `Adultos 2T/2026` uses an explicit release override to become public immediately
- `Lições 2` to `13` remain under the weekly release window and only enter public discovery when their own release window opens
- `Jovens 2T/2026` is now open as a public quarter because the teacher magazine and the supporting material are available
- `Jovens 2T/2026` uses `statusEditorial: partial`, which allows the quarter page to be discoverable even while lesson publication continues gradually
- `Lição 1` of `Jovens 2T/2026` uses an explicit release override to become public immediately
- `Lições 2` to `13` remain under the weekly release window and only enter public discovery when their own release window opens

This means `Adultos` and `Jovens` keep independent operational control for `2026-2t`, even though both classes now use the same public-release pattern for their first lesson.

## Operational Notes

For the final shared publication snapshot of `2026-2t`, use:

- [docs/ebd/2026-2t-publication-state.md](./ebd/2026-2t-publication-state.md)

For the current weekly operation of `Jovens 2T/2026`, use:

- [docs/ebd/jovens-2t-2026-operacao.md](./ebd/jovens-2t-2026-operacao.md)
- [docs/ebd/jovens-2t-2026-checklist.md](./ebd/jovens-2t-2026-checklist.md)

## Editorial Priorities

When deciding what to ship next, use this order:

1. keep the current published quarters coherent and polished
2. only then prepare the next quarter in draft mode
3. only publish a new quarter when content, artwork, navigation and indexing are ready together

## Historical Note

- `Jovens Lição 11` was published earlier as the pilot lesson and remained in place while the rest of the youth quarter was completed in blocks.
