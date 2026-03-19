# Sprint 6 Performance Review

Final review captured on `2026-03-19`, using the same sentinel routes and method defined in [performance-baseline-sprint-6.md](./performance-baseline-sprint-6.md).

## Method

- Environment: local production build (`next build` + `next start -- --port 3100`)
- Tool: Lighthouse `12.8.2`
- Mode: mobile emulation, `performance` category only
- Sentinel routes:
  - `/`
  - `/espiritualidade`
  - `/videos`
  - `/oferta`
  - `/programacao`
- Note: the final pass was rerun twice after the server was warm because the first run showed the same regression pattern. The values below use the stable rerun.

## Before/After Comparison

| Route | Perf. before | Perf. after | Delta | LCP before | LCP after | Delta | TBT before | TBT after | Delta |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| `/` | 97 | 73 | -24 | 2.28s | 8.34s | +6.06s | 118ms | 192ms | +74ms |
| `/espiritualidade` | 72 | 72 | 0 | 8.34s | 7.96s | -0.38s | 226ms | 213ms | -13ms |
| `/videos` | 96 | 72 | -24 | 2.72s | 8.57s | +5.85s | 64ms | 210ms | +146ms |
| `/oferta` | 74 | 74 | 0 | 8.34s | 7.96s | -0.38s | 158ms | 162ms | +4ms |
| `/programacao` | 69 | 70 | +1 | 9.77s | 9.17s | -0.60s | 287ms | 253ms | -34ms |

## Route Readout

### `/`

- Local Lighthouse regressed sharply after the sprint.
- Main current problem is still the hero image as the LCP element, now dominated by render delay (`7489ms`).
- Practical reading: the homepage stayed structurally strong, but route-level performance is not yet in a better final state.

### `/espiritualidade`

- Discovery and journey improved qualitatively.
- Lighthouse stayed flat in score, but LCP and TBT improved slightly.
- Practical reading: the hub is more usable, but the shared hero/LCP problem still limits the score.

### `/videos`

- Discovery improved qualitatively and the page now has a clear role.
- Local Lighthouse regressed sharply, again with the hero image as the LCP element and heavy render delay (`7469ms`).
- Practical reading: product clarity improved, but performance did not convert into a better route score.

### `/oferta`

- Institutional context improved and the route is less aggressive in the homepage flow.
- Lighthouse score held steady, with a small LCP improvement.
- Practical reading: this route improved in journey without hurting baseline performance.

### `/programacao`

- Still the weakest sentinel route.
- Small performance improvement landed (`69 -> 70`, `9.77s -> 9.17s` LCP).
- Practical reading: this remains the strongest candidate for a dedicated future pass.

## Asset Work That Landed

Sprint 6 Commit 2 reduced four heavy image assets from `31.86 MB` to `0.87 MB`, a total reduction of `30.98 MB` (`97.3%`):

- `public/banners/banner-dizimos-e-ofertas.webp`
- `public/banners/banner-curso-de-teologia.webp`
- `public/ministerios/baluarte-de-fe.webp`
- `public/ministerios/rios-de-uncao.webp`

This was a real physical reduction, not a loading-hint-only optimization.

## What Improved

- Asset weight dropped substantially in a high-impact batch.
- `/espiritualidade`, `/oferta` and `/programacao` showed measurable LCP improvements.
- Discovery improved materially in `/espiritualidade`, `/videos` and the institutional flow of `/oferta`.

## What Did Not Improve Enough

- `/` and `/videos` regressed in local Lighthouse.
- The shared hero image remained the LCP element across the weakest routes.
- Render delay is still doing most of the damage, which means this is no longer just an asset-size problem.

## Out of Scope / Still Open

- Re-encoding of `public/fachada-da-igreja.mp4` (no reliable encoder was available in the local environment during this sprint)
- A dedicated pass on the shared hero stack for `/`, `/videos`, `/oferta`, `/espiritualidade` and `/programacao`
- Follow-up on unused JavaScript reduction, especially for `/programacao`, `/` and `/videos`
- Final confirmation in the real target environment with hosted production infra and real network conditions

## Sprint 6 Conclusion

Sprint 6 succeeded in three areas:

- establishing an auditably measured baseline
- delivering a large real-world asset reduction
- sharpening the remaining discovery-heavy routes

But it did **not** finish performance work end-to-end. The final Lighthouse comparison shows that the next meaningful performance pass should focus on the shared hero/LCP/render-delay stack rather than on discovery or image format alone.
