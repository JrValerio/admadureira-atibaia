# Sprint 7 Hosted Performance Baseline

Captured on `2026-03-20` for the Sprint 7 baseline.

## Method

- Environment: hosted production deployment at `https://admadureira-atibaia.vercel.app`
- Framework: Next.js `16.1.6`
- Tool: Lighthouse via CLI against the hosted app
- Category: `performance`
- Sentinel routes:
  - `/`
  - `/programacao`
  - `/videos`
  - `/oferta`
  - `/espiritualidade`
- Protocol:
  - mobile emulation
  - desktop preset
  - same route list and same CLI protocol for every pass

## Mobile Baseline

| Route | Perf. | FCP | LCP | TBT | CLS | LCP element | Resource | Render delay |
|---|---:|---:|---:|---:|---:|---|---|---:|
| `/` | 75 | 1.10s | 7.51s | 79ms | 0.058 | Fachada da Igreja AD Madureira Atibaia | `/_next/image?url=%2Ffachada-da-igreja.jpg…` | 6.04s |
| `/programacao` | 73 | 1.43s | 8.34s | 166ms | 0.002 | Fachada da AD Madureira Atibaia | `/_next/image?url=%2Fimages%2Figreja…` | 5.14s |
| `/videos` | 97 | 0.92s | 2.50s | 80ms | 0.002 | Púlpito da AD Madureira Atibaia | `/_next/image?url=%2Fimages%2Figreja…` | 86ms |
| `/oferta` | 73 | 0.92s | 7.61s | 189ms | 0.002 | Fachada da AD Madureira Atibaia | `/_next/image?url=%2Fimages%2Figreja…` | 361ms |
| `/espiritualidade` | 74 | 1.09s | 7.66s | 158ms | 0.002 | Fachada da AD Madureira Atibaia | `/_next/image?url=%2Fimages%2Figreja…` | 463ms |

## Desktop Baseline

| Route | Perf. | FCP | LCP | TBT | CLS | LCP element | Resource | Render delay |
|---|---:|---:|---:|---:|---:|---|---|---:|
| `/` | 88 | 0.45s | 1.69s | 0ms | 0.025 | `video.absolute` do hero | `public/fachada-da-igreja.mp4` | 1.38s |
| `/programacao` | 95 | 0.30s | 1.55s | 0ms | 0.000 | Fachada da AD Madureira Atibaia | `/_next/image?url=%2Fimages%2Figreja…` | 352ms |
| `/videos` | 95 | 0.25s | 1.47s | 0ms | 0.000 | Púlpito da AD Madureira Atibaia | `/_next/image?url=%2Fimages%2Figreja…` | 556ms |
| `/oferta` | 96 | 0.25s | 1.37s | 0ms | 0.000 | Fachada da AD Madureira Atibaia | `/_next/image?url=%2Fimages%2Figreja…` | 470ms |
| `/espiritualidade` | 96 | 0.29s | 1.37s | 0ms | 0.000 | Fachada da AD Madureira Atibaia | `/_next/image?url=%2Fimages%2Figreja…` | 201ms |

## Baseline Readout

### Shared hero pattern

- Four of the five sentinel routes use the same `HeroPage` image as the LCP element.
- The home splits behavior by viewport:
  - mobile LCP = hero fallback image
  - desktop LCP = animated hero video element

### Media vs composition clues

- `/` on mobile is not just an asset problem:
  - image transfer finishes relatively early
  - render delay still accounts for `6.04s` of the `7.51s` LCP
- `/` on desktop is strongly composition-bound:
  - LCP element is the hero video layer itself
  - render delay is `1.38s` of a `1.69s` LCP
- `/programacao` is still the worst mobile route:
  - LCP `8.34s`
  - render delay `5.14s`
- `/videos` is the control route:
  - already healthy on mobile and desktop
  - useful to verify that shared hero work does not regress a route that is already stable

## Sprint 7 Implications

- The sprint should treat the shared hero stack as the main target before touching route-specific micro-optimizations.
- The home hero needs separate attention for mobile and desktop because the LCP element changes by viewport.
- `public/fachada-da-igreja.mp4` is a candidate for review, but the baseline does not support blaming media alone; render delay is already the dominant factor on the home.
- `/programacao` remains the strongest candidate for route-level follow-up after the shared hero is stabilized.
