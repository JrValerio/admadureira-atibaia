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

## Editorial Conventions for Lesson Bodies (from 4T/2026)

- **Support book.** The commentator's support book is cited by chapter in the text ("Osiel Gomes, *O Deus da Aliança*, cap. 2"). Direct quotes stay short and the rest is paraphrase. The PR lists every citation with its PDF page so the human gate can spot-check at least two per class. If the book is a scan, Bible references taken from it are checked against the page image or the verse content.
- **Divergence from Scripture.** When the support book diverges from the biblical text, the published lesson presents the biblical reading only and never names or corrects the commentator. The divergence is recorded in the PR alone. Correcting the quarter's commentator on the church's official site is a pastoral decision, not an editorial one.
- **Bible quotations.** Direct quotations follow the ARC (Almeida Revista e Corrigida), the translation printed in the CPAD magazine. Each quotation is checked against a real ARC text: the magazine page image, or a published ARC edition for verses the magazine does not print. The comparison is pasted in the PR. The site's Bible reader (`bible-api.com`, "almeida") serves the JFA, whose wording differs from the ARC in several verses; see the open decision in PR #175.
- **ARC text stays out of git.** The ARC translation is copyrighted by the SBB. The gate's ARC cache (`tmp/cache/arc/`, filled from bibliaonline by `scripts/gate/arc.py`) lives in `tmp/`, which is gitignored, and must never be committed or moved into `src/` or `public/`. The same goes for the magazine and support-book PDFs in `material_consulta/`.
- **Greek and Hebrew terms.** Simple transliteration without diacritics: `upsilon → y`, `chi → ch`, `eta` and `epsilon → e`, `omega` and `omicron → o`, no accents (for example `prokope`, `synergeo`, `oida`, `epichoregia`, `politeuomai`, `charis`). Hebrew follows the same rule (`chakhamim`, `nevonim`). The spelling the support book uses is not reproduced when it differs from this pattern.

## Automated Gate: Blind Transcription (layer 1)

Header fields that the two magazine OCRs do not both confirm are read from the page image (`scripts/gate/cabecalho.py`). That reading only counts as a second source if whoever reads has never seen the expected value. The main agent works with `cabecalhos.json` all session long, so hiding the value on the sheet is not enough when it is the main agent that reads.

- **Who transcribes.** A subagent or new session with clean context. It receives only the sheets (`tmp/gate/transcricao/folha-NN.jpg`, from `scripts/gate/transcricao.py`) and the list of labels (`pendentes.json`: id, label and PDF page, no values), copied to a folder outside the repository. It gets no access to the repository, `cabecalhos.json` or the lesson files, and returns the transcriptions as JSON (`id`, `lido`, `pagina`).
- **Fixed instruction.** The message to the subagent is the versioned template `scripts/gate/prompt-transcricao.md`, whose only parameter is the folder. It has no examples taken from real lesson data, because a message written by an agent that holds `cabecalhos.json` could carry values that no tool log would catch. `python scripts/gate/transcricao.py <lessons> --isolar <folder outside the repo>` copies the sheets and `pendentes.json` there, writes `prompt.txt` from the template, and prints both sha256 hashes. The message sent is `prompt.txt` byte for byte, and the PR states that the template was used unchanged. Any change to the template is its own commit, visible in review.
- **What the main agent does.** It writes the returned JSON to `src/data/ebd/<edition>/fontes/transcricoes-cabecalho.json` unchanged, with `lidoEm`, and runs the comparison. It never edits a transcription. A divergence stays an exception with both versions. A new reading of that sheet is a new call to a clean subagent, never a correction by the main agent.
- **How isolation is shown.** Tool restrictions do not guarantee that a subagent cannot open another path, so the evidence is its tool log. The main agent checks that every file the subagent read is inside the sheets folder, and states that in the PR next to the number of transcriptions, how many matched and the exceptions.
- **Reading done before this rule.** The 36 transcriptions for L1–L2 of 4T/2026 were made by the main agent after it had already seen the values. They validate the method, not the independence of the reading.
- **Limit of the method.** The subagent is independent of `cabecalhos.json`, but it is the same kind of model that built the JSON and writes the lessons. A systematic reading bias (a small digit, a dash, an accent in a specific typeface) can repeat in both, and the comparison would still match. Blind transcription is one check, not a guarantee. The defences against a shared bias are the two OCR layers from different engines, the CI test that every reference points to an existing book and chapter, and the drawn transcription that the human reviewer compares with the page crop in each report.
- **Where the tool log is.** Claude Code stores the subagent's transcript at `~/.claude/projects/<project>/<session>/subagents/agent-<id>.jsonl`. The file accesses are the `tool_use` blocks of the assistant messages (`file_path`, `path`).

## Publication and the Weekly Window

A lesson is public when its status is `published`, the edition is open and the weekly window has started: the Friday of the week before the class, nine days earlier (`getLicaoReleaseWindowKey`).

- **The publication merge can land before the window.** The lesson, quarter and listing routes are ISR with `revalidate = 3600` (shown as `1h` in the `next build` output), and availability is recomputed at each regeneration. A lesson merged as `published` on Thursday opens by itself on Friday, within about one hour of 00:00 in São Paulo.
- **First visit after the window opens.** Next serves the stale copy while it regenerates, so the first request to each URL still gets the closed version. On the morning the window opens, request each URL twice, for both classes, and check by content, never by status code (a draft lesson also answers 200):
  - `/ebd`
  - `/ebd/{classe}`
  - `/ebd/{classe}/{edicao}` (must link to the lesson)
  - `/ebd/{classe}/{edicao}/licao-N`
  - `/ebd/{classe}/{edicao}/licao-N/pdf-completo` and `/pdf-resumo`
- **Unavailable lessons stay out of search.** A draft or not-yet-open lesson page carries `noindex`, and `sitemap.ts` lists only lessons that pass `isLicaoPubliclyAvailable` (it regenerates every two minutes).

## Editorial Priorities

When deciding what to ship next, use this order:

1. keep the current published quarters coherent and polished
2. only then prepare the next quarter in draft mode
3. only publish a new quarter when content, artwork, navigation and indexing are ready together

## Historical Note

- `Jovens Lição 11` was published earlier as the pilot lesson and remained in place while the rest of the youth quarter was completed in blocks.
