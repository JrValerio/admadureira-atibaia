# Home Hero Video Intent Gate Review

Captured on `2026-03-20` after the desktop hero video started waiting for user intent before mounting.

## Scope

- Route under test: `/`
- Measurements:
  - mobile Lighthouse
  - desktop Lighthouse
- Baseline source:
  - [home-hero-video-follow-up.md](/f:/devprojects/admadureira-atibaia/docs/home-hero-video-follow-up.md)
- After environment:
  - production-target Vercel deployment with protection bypass

## Patch under test

Commit:

- `8e6e645` — `fix(hero): gate desktop background video behind user intent`

File touched:

- [HeroBackgroundMedia.tsx](/f:/devprojects/admadureira-atibaia/src/components/HeroBackgroundMedia.tsx)

What changed:

- the desktop video now waits for:
  - desktop breakpoint
  - no `prefers-reduced-motion`
  - no `saveData`
  - no slow connection
  - `window.load`
  - idle time
  - a short hero settle delay
  - user intent (`pointerdown`, `keydown`, `wheel`, `touchstart`, `scroll`)
- if no intent happens, the video falls back to a much later delayed mount
- mobile behavior stayed untouched

## Before vs after

### Mobile

| Pass | Perf. | FCP | LCP | TBT | CLS | LCP element | Resource | Render delay |
|---|---:|---:|---:|---:|---:|---|---|---:|
| Before | 89 | 1.50s | 2.60s | 120ms | 0.001 | static hero image | `/_next/image?...fachada-da-igreja.jpg...` | 0.22s |
| After | 95 | 1.50s | 2.50s | 170ms | 0.001 | static hero image | `/_next/image?...fachada-da-igreja.jpg...` | 0.42s |

### Desktop

| Pass | Perf. | FCP | LCP | TBT | CLS | LCP element | Resource | Render delay |
|---|---:|---:|---:|---:|---:|---|---|---:|
| Before | 88 | 0.60s | 1.90s | 0ms | 0.000 | hero background video | `public/fachada-da-igreja.mp4` | 0.45s |
| After | 100 | 0.60s | 0.70s | 10ms | 0.000 | static hero image | `/_next/image?...fachada-da-igreja.jpg...` | 0.40s |

## Readout

### What improved

- Desktop home stopped using the hero video as the LCP element
- Desktop score jumped `88 -> 100`
- Desktop LCP dropped `1.90s -> 0.70s`
- Mobile stayed in the correct hierarchy:
  - static image still owns the LCP
  - LCP improved slightly `2.60s -> 2.50s`

### What stayed acceptable

- Desktop FCP stayed flat at `0.60s`
- Desktop CLS stayed `0.000`
- The mobile path remained image-first, which was the main guardrail for this experiment

### What to keep in view

- Mobile TBT and render delay moved up a bit in this pass, even with the LCP staying healthy
- This experiment solved the desktop LCP ownership problem, but it does not replace a future reencode pass if [fachada-da-igreja.mp4](/f:/devprojects/admadureira-atibaia/public/fachada-da-igreja.mp4) still proves heavy in real-user monitoring

## Objective conclusion

This front met its narrow goal.

- `/` desktop no longer promotes the video into the LCP slot
- `/` mobile stayed in the healthy image-first path
- the hero identity was preserved while the technical ownership of first paint returned to the static image

The next performance move does **not** need to reopen hero architecture again.

If another follow-up opens, it should be either:

- production/field confirmation of the same behavior, or
- a controlled reencode of [fachada-da-igreja.mp4](/f:/devprojects/admadureira-atibaia/public/fachada-da-igreja.mp4) as a secondary optimization, not as the primary fix
