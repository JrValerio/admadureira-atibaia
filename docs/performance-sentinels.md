# Performance Sentinel Routes

Living route set for Lighthouse performance passes. Sprint review documents keep
their historical route list, but new passes should start from this list so dense
editorial surfaces do not fall out of measurement.

## Protocol

- Environment: production or production-target Vercel deployment
- Tool: Lighthouse CLI
- Category: `performance`
- Viewports:
  - mobile emulation
  - desktop preset
- Compare every route against the same previous-pass protocol.

## Routes

| Route | Why it is a sentinel |
|---|---|
| `/` | Home composition and desktop hero video LCP. |
| `/programacao` | Core visitor journey with shared hero and card/list density. |
| `/videos` | Healthy media/control route used to catch regressions. |
| `/oferta` | Weakest mobile route after Sprint 7; needs route-level follow-up. |
| `/espiritualidade` | Shared hero route that improved strongly after Sprint 7. |
| `/ebd/adultos/2026-3t/licao-3` | Dense EBD lesson page with TOC, reading grids and populated teacher subsidy. |

## EBD Sentinel Rule

Use the densest currently published EBD lesson as the EBD sentinel. As new
quarters advance, update the route only when the replacement has comparable or
greater content weight: overview blocks, weekly reading, planning blocks,
subsidy and auxiliary sidebar.

The EBD sentinel exists because this page type is longer and denser than the
original five Sprint 7 sentinels. It should be measured before making further
EBD layout changes or claiming that performance work covers the platform as a
whole.

## Local Check - 2026-06-30

Environment: local production build via `npm run build` + `next start`, measured
with Lighthouse CLI 12.8.2 mobile emulation. Treat this as a directional check;
promotion decisions still need a production/Vercel run with the same sentinel
set.

| Route | Pass | Score | LCP | LCP element | Note |
|---|---:|---:|---:|---|---|
| `/` | cold | 73 | 10.3s | Home facade image | Image optimizer/cache cold start dominated the pass. |
| `/` | warm | 91 | 3.4s | Home facade image | Warm local pass is materially healthier. |
| `/oferta` | cold | 94 | 3.0s | Shared offer hero image | Did not reproduce the old 7.7s mobile LCP locally. |
| `/oferta` | warm | 94 | 3.0s | Shared offer hero image | Revalidate on production before route-level optimization. |
| `/ebd/adultos/2026-3t/licao-3` | warm, before image hint | 71 | 8.4s | Lesson art image | Slow LCP was the lesson art, not the teacher subsidy/details DOM. |
| `/ebd/adultos/2026-3t/licao-3` | warm, after image hint | 89 | 3.3s | Lesson art image | Explicit `fetchPriority="high"` + `decoding="sync"` on the lesson art. |
| `/ebd/adultos/2026-3t/licao-3` | warm, current combined state | 90 | 3.3s | Lesson art image | Re-measured after `deviceSizes` cap and subsidy deduplication. First local pass was still cache-sensitive at 8.3s. |

Follow-up: the shared Next Image configuration now caps generated device
variants at `2048px`, preventing full-bleed route heroes such as `/oferta` from
advertising a `w=3840` candidate. Local production HTML for `/oferta` was
checked after build: `nave-8.jpg` offered widths from `360` through `2048`, with
no `3840` variant.

The critical sentinel images checked for `/`, `/oferta` and the EBD lesson are
all at or below `2048px` wide. Some non-sentinel public assets are larger than
that, so this remains a deliberate global trade-off to avoid `3840px` overfetch;
production visual QA on very wide displays should confirm whether any large
photo route needs a higher cap.
