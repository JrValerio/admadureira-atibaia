# Home Hero Video Follow-up

Captured on `2026-03-20` after [HeroBackgroundMedia.tsx](/f:/devprojects/admadureira-atibaia/src/components/HeroBackgroundMedia.tsx) started deferring the desktop background video behind the static hero image.

## Scope

- Route: `/`
- Environments:
  - mobile Lighthouse
  - desktop Lighthouse
- Baseline source:
  - [performance-review-sprint-7.md](/f:/devprojects/admadureira-atibaia/docs/performance-review-sprint-7.md)
- After environment:
  - production-target Vercel deployment with bypass protection

## Patch under test

Commit:

- `651e996` — `fix(hero): defer desktop background video behind static hero image`

Files touched:

- [HeroBackgroundMedia.tsx](/f:/devprojects/admadureira-atibaia/src/components/HeroBackgroundMedia.tsx)

What changed:

- desktop video render now waits for:
  - desktop breakpoint
  - no `prefers-reduced-motion`
  - no `saveData`
  - no slow connection
  - `window.load`
  - idle time
  - an additional hero settle delay
- removed the video `poster` so the still image remains the first-paint anchor
- reduced the video layer opacity so the still image stays visually dominant after the video fades in

## Before vs after

### Mobile

| Pass | Perf. | FCP | LCP | TBT | CLS | LCP element | Render delay |
|---|---:|---:|---:|---:|---:|---|---:|
| Before | 97 | 1.12s | 2.33s | 145ms | 0.001 | static hero image | 0.33s |
| After | 89 | 1.50s | 2.60s | 120ms | 0.001 | static hero image | 0.22s |

### Desktop

| Pass | Perf. | FCP | LCP | TBT | CLS | LCP element | Render delay |
|---|---:|---:|---:|---:|---:|---|---:|
| Before | 86 | 0.54s | 1.94s | 4ms | 0.000 | hero background video | 0.31s |
| After | 88 | 0.60s | 1.90s | 0ms | 0.000 | hero background video | 0.45s |

## Readout

### What improved

- Desktop score improved slightly: `86 -> 88`
- Desktop LCP improved slightly: `1.94s -> 1.90s`
- Mobile render delay dropped further: `0.33s -> 0.22s`
- The hero still opens cleanly from the static image on mobile

### What stayed the same

- Mobile LCP remained on the static hero image
- Desktop kept the same overall visual identity

### What did not resolve

- Desktop home still uses the hero video as the LCP element
- The patch reduced how early the video mounts, but it did not fully push desktop LCP back onto the static image
- Mobile regressed a bit in score and LCP, even though it kept the correct LCP element

## Objective conclusion

This follow-up succeeded at preserving the mobile behavior and slightly improving desktop score/LCP without changing the hero identity.

It did **not** finish the desktop home problem:

- `/` desktop still has the video as LCP
- the next explicit target is the delivery strategy of [fachada-da-igreja.mp4](/f:/devprojects/admadureira-atibaia/public/fachada-da-igreja.mp4), or a stricter rule that keeps the video from becoming the desktop LCP candidate at all

## Narrow exit check

- `/` mobile continues good:
  - **Partially met**
  - LCP element stayed correct, but score/LCP regressed slightly
- `/` desktop reduces the chance of video being LCP:
  - **Not met**
  - the video remains the LCP element
- Hero keeps institutional appearance:
  - **Met**
- No obvious visual regression:
  - **Met**
- Only consider reencode if the video still remains the bottleneck after defer:
  - **Met**
  - the follow-up measurement now justifies that next investigation
