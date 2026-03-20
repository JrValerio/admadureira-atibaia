# Sprint 7 Shared Hero Performance Review

Captured on `2026-03-20` after the shared hero patch landed in production-target hosting.

## 1. Baseline by route

### Hosted baseline protocol

- Baseline source: [performance-baseline-sprint-7.md](/f:/devprojects/admadureira-atibaia/docs/performance-baseline-sprint-7.md)
- Baseline environment: `https://admadureira-atibaia.vercel.app`
- After environment: production-target deployment protected by Vercel bypass
- Sentinel routes:
  - `/`
  - `/programacao`
  - `/videos`
  - `/oferta`
  - `/espiritualidade`
- Same Lighthouse CLI protocol for both passes:
  - mobile emulation
  - desktop preset
  - performance category only

### Mobile baseline

| Route | Perf. | FCP | LCP | TBT | CLS | LCP element | Resource | Render delay |
|---|---:|---:|---:|---:|---:|---|---|---:|
| `/` | 75 | 1.10s | 7.51s | 79ms | 0.058 | Fachada da Igreja AD Madureira Atibaia | `/_next/image?url=%2Ffachada-da-igreja.jpg…` | 6.04s |
| `/programacao` | 73 | 1.43s | 8.34s | 166ms | 0.002 | Fachada da AD Madureira Atibaia | `/_next/image?url=%2Fimages%2Figreja…nave-1.jpg…` | 5.14s |
| `/videos` | 97 | 0.92s | 2.50s | 80ms | 0.002 | Púlpito da AD Madureira Atibaia | `/_next/image?url=%2Fimages%2Figreja…pulpito-5.jpg…` | 0.09s |
| `/oferta` | 73 | 0.92s | 7.61s | 189ms | 0.002 | Fachada da AD Madureira Atibaia | `/_next/image?url=%2Fimages%2Figreja…nave-8.jpg…` | 0.36s |
| `/espiritualidade` | 74 | 1.09s | 7.66s | 158ms | 0.002 | Fachada da AD Madureira Atibaia | `/_next/image?url=%2Fimages%2Figreja…nave-pulpito-1.jpg…` | 0.46s |

### Desktop baseline

| Route | Perf. | FCP | LCP | TBT | CLS | LCP element | Resource | Render delay |
|---|---:|---:|---:|---:|---:|---|---|---:|
| `/` | 88 | 0.45s | 1.69s | 0ms | 0.025 | `video.absolute` do hero | `public/fachada-da-igreja.mp4` | 1.38s |
| `/programacao` | 95 | 0.30s | 1.55s | 0ms | 0.000 | Fachada da AD Madureira Atibaia | `/_next/image?url=%2Fimages%2Figreja…nave-1.jpg…` | 0.35s |
| `/videos` | 95 | 0.25s | 1.47s | 0ms | 0.000 | Púlpito da AD Madureira Atibaia | `/_next/image?url=%2Fimages%2Figreja…pulpito-5.jpg…` | 0.56s |
| `/oferta` | 96 | 0.25s | 1.37s | 0ms | 0.000 | Fachada da AD Madureira Atibaia | `/_next/image?url=%2Fimages%2Figreja…nave-8.jpg…` | 0.47s |
| `/espiritualidade` | 96 | 0.29s | 1.37s | 0ms | 0.000 | Fachada da AD Madureira Atibaia | `/_next/image?url=%2Fimages%2Figreja…nave-pulpito-1.jpg…` | 0.20s |

## 2. Diagnosis: media vs composition

### What the baseline proved

- The shared hero stack was the real hotspot, not just a random route issue.
- Four of the five sentinel routes were using `HeroPage` imagery as the LCP element.
- The home split by viewport:
  - mobile LCP = static hero image
  - desktop LCP = hero video layer

### Media vs composition readout

- `/` on mobile was mostly composition-bound before the patch:
  - LCP `7.51s`
  - render delay alone `6.04s`
- `/` on desktop was also composition-heavy before the patch:
  - LCP `1.69s`
  - render delay `1.38s`
  - but with the `video.absolute` itself as LCP
- `/programacao` and `/espiritualidade` on mobile were being dragged mainly by the shared hero image pipeline plus render delay.
- `/oferta` on mobile was different:
  - the route was slow, but render delay was not the main villain
  - that pointed to route-level load cost rather than shared hero paint alone
- `/videos` was the healthy control route:
  - already stable before the patch
  - useful to confirm whether shared hero work caused regressions

### Diagnostic conclusion

The shared hero problem was a combination of both:

- media delivery on the critical hero layer
- composition/render delay above the fold

The video was not the sole culprit in the baseline. After the shared patch, it became clearer that the remaining desktop home issue is now much more specifically tied to the hero video layer itself.

## 3. Patches applied

### Shared hero patch

Commit:

- `4be4bbf` — `perf(hero): reduce shared hero render delay and media overhead`

Files:

- [HeroBackgroundMedia.tsx](/f:/devprojects/admadureira-atibaia/src/components/HeroBackgroundMedia.tsx)
- [Hero.tsx](/f:/devprojects/admadureira-atibaia/src/sections/Hero.tsx)
- [HeroPage.tsx](/f:/devprojects/admadureira-atibaia/src/components/HeroPage.tsx)
- [Navbar.tsx](/f:/devprojects/admadureira-atibaia/src/components/Navbar.tsx)
- [globals.css](/f:/devprojects/admadureira-atibaia/src/app/globals.css)

What changed:

- Removed hero parallax work from the shared background video component.
- Replaced the previous media boot path with a simpler delayed render path for the video.
- Simplified hero entrance animation from fade+scale to fade only.
- Removed the always-on `backdrop-blur` cost from the top navbar shell.
- Reduced visual overhead in the home hero overlays.
- Tightened `HeroPage` image delivery:
  - `fetchPriority`
  - sync decode for full heroes
  - lower image quality for the full-bleed route heroes

### Route calibration review

Reviewed:

- [programacao/page.tsx](/f:/devprojects/admadureira-atibaia/src/app/programacao/page.tsx)
- [videos/page.tsx](/f:/devprojects/admadureira-atibaia/src/app/videos/page.tsx)

Decision:

- No route-local hero patch was applied in this sprint.
- `/programacao` improved enough after the shared patch that local top surgery was not justified.
- `/videos` stayed in the healthy band and remained the control route, so no local hero divergence was introduced there.

### Critical media review

- `sizes`, `fetchPriority`, image quality and decode strategy were revised in the shared hero components.
- `public/fachada-da-igreja.mp4` was reviewed as a candidate, but not reencoded in this sprint because:
  - the baseline did not justify blaming media alone before the shared patch
  - the local environment did not have a safe encoder available for an auditable reencode pass

## 4. New measurement

Environment:

- production-target deployment protected with Vercel bypass
- same Lighthouse CLI protocol as the baseline

### Mobile after patch

| Route | Perf. | FCP | LCP | TBT | CLS | LCP element | Resource | Render delay |
|---|---:|---:|---:|---:|---:|---|---|---:|
| `/` | 97 | 1.12s | 2.33s | 145ms | 0.001 | Fachada da Igreja AD Madureira Atibaia | `/_next/image?url=%2Ffachada-da-igreja.jpg…` | 0.33s |
| `/programacao` | 92 | 1.11s | 2.56s | 268ms | 0.001 | Fachada da AD Madureira Atibaia | `/_next/image?url=%2Fimages%2Figreja…nave-1.jpg…` | 0.07s |
| `/videos` | 96 | 1.10s | 2.59s | 112ms | 0.001 | Púlpito da AD Madureira Atibaia | `/_next/image?url=%2Fimages%2Figreja…pulpito-5.jpg…` | 0.04s |
| `/oferta` | 73 | 1.10s | 7.72s | 190ms | 0.001 | Fachada da AD Madureira Atibaia | `/_next/image?url=%2Fimages%2Figreja…nave-8.jpg…` | 0.13s |
| `/espiritualidade` | 98 | 1.16s | 2.16s | 106ms | 0.001 | Fachada da AD Madureira Atibaia | `/_next/image?url=%2Fimages%2Figreja…nave-pulpito-1.jpg…` | 0.05s |

### Desktop after patch

| Route | Perf. | FCP | LCP | TBT | CLS | LCP element | Resource | Render delay |
|---|---:|---:|---:|---:|---:|---|---|---:|
| `/` | 86 | 0.54s | 1.94s | 4ms | 0.000 | `video.absolute` do hero | `public/fachada-da-igreja.mp4` | 0.31s |
| `/programacao` | 96 | 0.30s | 1.41s | 0ms | 0.000 | Fachada da AD Madureira Atibaia | `/_next/image?url=%2Fimages%2Figreja…nave-1.jpg…` | 0.42s |
| `/videos` | 96 | 0.30s | 1.35s | 0ms | 0.000 | Púlpito da AD Madureira Atibaia | `/_next/image?url=%2Fimages%2Figreja…pulpito-5.jpg…` | 0.58s |
| `/oferta` | 96 | 0.30s | 1.37s | 0ms | 0.000 | Fachada da AD Madureira Atibaia | `/_next/image?url=%2Fimages%2Figreja…nave-8.jpg…` | 0.36s |
| `/espiritualidade` | 96 | 0.31s | 1.36s | 0ms | 0.000 | Fachada da AD Madureira Atibaia | `/_next/image?url=%2Fimages%2Figreja…nave-pulpito-1.jpg…` | 0.44s |

## 5. Final comparison

### Improved clearly

- `/` mobile:
  - LCP `7.51s -> 2.33s`
  - render delay `6.04s -> 0.33s`
  - LCP element remained the same static image, which made the gain easy to attribute to the shared hero simplification
- `/programacao` mobile:
  - LCP `8.34s -> 2.56s`
  - render delay `5.14s -> 0.07s`
  - biggest practical shared-hero win outside the home
- `/espiritualidade` mobile:
  - LCP `7.66s -> 2.16s`
  - render delay `0.46s -> 0.05s`
  - confirms that the shared `HeroPage` path benefited from the patch
- `/programacao` desktop:
  - LCP `1.55s -> 1.41s`
- `/videos` desktop:
  - LCP `1.47s -> 1.35s`

### Stayed effectively stable

- `/oferta` desktop:
  - LCP `1.37s -> 1.37s`
- `/espiritualidade` desktop:
  - LCP `1.37s -> 1.36s`
- `/videos` overall stayed in the healthy band:
  - mobile `2.50s -> 2.59s`
  - desktop `1.47s -> 1.35s`
  - score stayed healthy enough that no local hero patch was justified

### Worsened or did not convert enough

- `/` desktop:
  - LCP `1.69s -> 1.94s`
  - score `88 -> 86`
  - render delay improved sharply `1.38s -> 0.31s`
  - but the hero video still remained the LCP element, so the cost moved from composition to media delivery timing
- `/oferta` mobile:
  - LCP `7.61s -> 7.72s`
  - score stayed `73`
  - render delay improved, but the route did not convert that into a better LCP

## 6. Objective conclusion against the exit criteria

### Exit criterion check

- LCP improves in the 5 sentinel routes, or at least in the 3 main ones:
  - **Partially met**
  - clearly improved on:
    - `/` mobile
    - `/programacao` mobile and desktop
    - `/espiritualidade` mobile and desktop
    - `/videos` desktop
  - did not improve cleanly on:
    - `/` desktop
    - `/oferta` mobile
- LCP element becomes predictable:
  - **Partially met**
  - predictable image LCP across the shared `HeroPage` routes
  - still split on the home:
    - mobile = static image
    - desktop = hero video
- `/programacao` and `/videos` do not worsen:
  - **Met overall**
  - `/programacao` improved strongly
  - `/videos` stayed stable enough to remain the control route
- The top keeps its visual identity:
  - **Met**
  - the shared hero still reads as the same product, with lighter composition work
- Final comparison documented with before/after:
  - **Met**

### Honest readout

This sprint succeeded at reducing the shared hero cost in the places where composition and render delay were the main drag.

It did **not** finish the home desktop performance problem.

The remaining hotspot is now explicit:

- home desktop still uses the hero video as the LCP element
- render delay is no longer the dominant issue there
- the next likely target is the delivery/encoding strategy of [fachada-da-igreja.mp4](/f:/devprojects/admadureira-atibaia/public/fachada-da-igreja.mp4) and the exact timing of when that layer becomes LCP

### Next target

If a follow-up sprint opens, the next explicit target should be:

- shared home desktop video LCP on `/`

If another route must be named directly after that:

- `/oferta` mobile remains poor and should be treated as a route-level performance follow-up rather than another generic shared-hero pass
