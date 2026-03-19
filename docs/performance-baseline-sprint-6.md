# Sprint 6 Performance Baseline

Captured on `2026-03-19` for the Sprint 6 baseline.

## Method

- Environment: local production build (`next build` + `next start -- --port 3100`)
- Framework: Next.js `16.1.6`
- Tool: Lighthouse `12.8.2`
- Mode: mobile emulation, `performance` category only
- Sentinel routes:
  - `/`
  - `/espiritualidade`
  - `/videos`
  - `/oferta`
  - `/programacao`

## Baseline Metrics

| Route | Perf. | FCP | LCP | Speed Index | TBT | CLS | LCP element | Render delay |
|---|---:|---:|---:|---:|---:|---:|---|---:|
| `/` | 97 | 1.08s | 2.28s | 1.62s | 118ms | 0.001 | Fachada da Igreja AD Madureira Atibaia | 1698ms |
| `/espiritualidade` | 72 | 0.94s | 8.34s | 0.97s | 226ms | 0.001 | Fachada da AD Madureira Atibaia | 3990ms |
| `/videos` | 96 | 1.00s | 2.72s | 1.17s | 64ms | 0.001 | Púlpito da AD Madureira Atibaia | 1480ms |
| `/oferta` | 74 | 0.95s | 8.34s | 1.05s | 158ms | 0.001 | Fachada da AD Madureira Atibaia | 5752ms |
| `/programacao` | 69 | 0.96s | 9.77s | 2.40s | 287ms | 0.001 | Fachada da AD Madureira Atibaia | 8786ms |

## Route Notes

### `/`

- Healthy baseline after Sprint 5.
- Main opportunity: properly size images (`Est savings of 16 KiB`).

### `/espiritualidade`

- Low score is driven more by LCP/render delay than by first paint.
- Main opportunities:
  - reduce unused JavaScript (`Est savings of 28 KiB`)
  - avoid serving legacy JavaScript to modern browsers (`Est savings of 13 KiB`)

### `/videos`

- Healthy baseline for a secondary hub.
- Main opportunity: reduce unused JavaScript (`Est savings of 26 KiB`).

### `/oferta`

- Similar profile to `/espiritualidade`: decent first paint, weak LCP.
- Main opportunities:
  - reduce unused JavaScript (`Est savings of 28 KiB`)
  - avoid serving legacy JavaScript to modern browsers (`Est savings of 13 KiB`)

### `/programacao`

- Lowest baseline among the sentinel routes.
- Main opportunities:
  - reduce unused JavaScript (`Est savings of 74 KiB`)
  - avoid serving legacy JavaScript to modern browsers (`Est savings of 13 KiB`)
- Current route is the strongest candidate for the biggest Sprint 6 performance gain.

## Heavy Asset Inventory

Largest files currently found under `public/`:

| Asset | Size |
|---|---:|
| `public/fachada-da-igreja.mp4` | 20.24 MB |
| `public/ministerios/baluarte-de-fe.png` | 14.44 MB |
| `public/ministerios/rios-de-uncao.png` | 12.26 MB |
| `public/banners/banner-curso-de-teologia.png` | 4.45 MB |
| `public/programacao/culto-de-jovens.png` | 3.45 MB |
| `public/pastores/pra-anna-alzira.png` | 3.25 MB |

## Sprint 6 Implications

- Commit 2 should focus on physical asset reduction before any cosmetic media change.
- Commit 3 should review `Oferta` with both discovery and hero prominence in mind.
- Commits 4 and 5 should prioritize stronger journey clarity in `/espiritualidade` and `/videos`.
- Final comparison must rerun the same five sentinel routes to make the before/after auditable.

## Caveat

This baseline is useful for relative comparison across Sprint 6 work. Final confirmation should still be rerun in the target environment with production hosting and real network conditions.
