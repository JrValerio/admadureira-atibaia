"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useEffect,
  useEffectEvent,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import type { HeroEvento } from "@/data/hero";

type LegacyMediaQueryList = MediaQueryList & {
  addListener?: (listener: (event: MediaQueryListEvent) => void) => void;
  removeListener?: (listener: (event: MediaQueryListEvent) => void) => void;
};

const AUTO_PLAY_MS = 5500;
const RESUME_AFTER_INTERACTION_MS = 9000;
const SWIPE_THRESHOLD = 56;

type HeroEventosProps = {
  eventos: HeroEvento[];
};

export default function HeroEventos({ eventos }: HeroEventosProps) {
  const total = eventos.length;

  // Infinite loop: clone last slide at front, first slide at end.
  // clonedSlides = [eventos[total-1], ...eventos, eventos[0]]
  // Real slides live at displayIndex 1..total.
  const useLoop = total > 1;
  const clonedSlides = useLoop
    ? [eventos[total - 1], ...eventos, eventos[0]]
    : eventos;
  const clonedTotal = clonedSlides.length;

  // Start at index 1 so the first real slide is shown immediately.
  const [displayIndex, setDisplayIndex] = useState(useLoop ? 1 : 0);
  const [animated, setAnimated] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [focusWithin, setFocusWithin] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [manualPause, setManualPause] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const pointerStartXRef = useRef<number | null>(null);
  const activePointerIdRef = useRef<number | null>(null);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const paused =
    hovered || focusWithin || dragging || manualPause || prefersReducedMotion;

  // Real 0-based index for the progress bar and aria states.
  const realIndex = useLoop
    ? displayIndex === 0
      ? total - 1
      : displayIndex === clonedTotal - 1
        ? 0
        : displayIndex - 1
    : displayIndex;

  const pauseTemporarily = (duration = RESUME_AFTER_INTERACTION_MS) => {
    setManualPause(true);

    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }

    resumeTimeoutRef.current = setTimeout(() => {
      setManualPause(false);
    }, duration);
  };

  const advanceSlide = useEffectEvent(() => {
    setAnimated(true);
    setDisplayIndex((prev) => prev + 1);
  });

  const goBack = () => {
    setAnimated(true);
    setDisplayIndex((prev) => prev - 1);
    pauseTemporarily();
  };

  const goForward = () => {
    setAnimated(true);
    setDisplayIndex((prev) => prev + 1);
    pauseTemporarily();
  };

  // After the transition lands on a clone, snap invisibly to the real slide.
  const handleTransitionEnd = (event: React.TransitionEvent<HTMLDivElement>) => {
    if (event.propertyName !== "transform" || !useLoop) return;

    if (displayIndex === clonedTotal - 1) {
      // Landed on clone of first — jump to real first.
      setAnimated(false);
      setDisplayIndex(1);
    } else if (displayIndex === 0) {
      // Landed on clone of last — jump to real last.
      setAnimated(false);
      setDisplayIndex(total);
    }
  };

  // Re-enable animation one frame after the invisible snap is painted.
  useEffect(() => {
    if (animated) return;

    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => setAnimated(true));
    });

    return () => cancelAnimationFrame(raf);
  }, [animated]);

  useEffect(() => {
    const reducedMotionMedia = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ) as LegacyMediaQueryList;

    const updatePreference = () => {
      setPrefersReducedMotion(reducedMotionMedia.matches);
    };

    const attachListener = (mediaQuery: LegacyMediaQueryList) => {
      if (typeof mediaQuery.addEventListener === "function") {
        mediaQuery.addEventListener("change", updatePreference);

        return () => mediaQuery.removeEventListener("change", updatePreference);
      }

      mediaQuery.addListener?.(updatePreference);

      return () => mediaQuery.removeListener?.(updatePreference);
    };

    updatePreference();

    const detachReducedMotion = attachListener(reducedMotionMedia);

    return () => {
      detachReducedMotion();
    };
  }, []);

  useEffect(() => {
    if (paused || total <= 1) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      advanceSlide();
    }, AUTO_PLAY_MS);

    return () => window.clearInterval(intervalId);
  }, [paused, total]);

  useEffect(() => {
    return () => {
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current);
      }
    };
  }, []);

  if (total === 0) {
    return null;
  }

  const releasePointer = (
    currentTarget: ReactPointerEvent<HTMLElement>["currentTarget"],
    pointerId: number
  ) => {
    if (
      typeof currentTarget.hasPointerCapture === "function" &&
      currentTarget.hasPointerCapture(pointerId)
    ) {
      currentTarget.releasePointerCapture(pointerId);
    }
  };

  const resetPointerState = () => {
    pointerStartXRef.current = null;
    activePointerIdRef.current = null;
    setDragging(false);
  };

  const handleSwipeEnd = (endX: number) => {
    const startX = pointerStartXRef.current;

    if (startX === null) {
      resetPointerState();

      return;
    }

    const delta = endX - startX;

    if (delta >= SWIPE_THRESHOLD) {
      goBack();
    } else if (delta <= -SWIPE_THRESHOLD) {
      goForward();
    }

    resetPointerState();
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLElement>) => {
    if (event.pointerType === "mouse") {
      return;
    }

    pointerStartXRef.current = event.clientX;
    activePointerIdRef.current = event.pointerId;
    setDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLElement>) => {
    if (activePointerIdRef.current !== event.pointerId) {
      return;
    }

    releasePointer(event.currentTarget, event.pointerId);
    handleSwipeEnd(event.clientX);
  };

  const handlePointerCancel = (event: ReactPointerEvent<HTMLElement>) => {
    if (activePointerIdRef.current !== event.pointerId) {
      return;
    }

    releasePointer(event.currentTarget, event.pointerId);
    resetPointerState();
  };

  return (
    <section
      id="eventos-destaque"
      aria-labelledby="home-eventos-destaque-title"
      className="relative w-full overflow-hidden bg-[#f7f6f2] pt-6 pb-8 md:pt-8 md:pb-12"
    >
      <div className="ui-page-container mb-5 text-center md:mb-7">
        <p className="ui-section-eyebrow ui-section-eyebrow--gold">
          Agenda em destaque
        </p>
        <div className="mx-auto max-w-3xl">
          <h2
            id="home-eventos-destaque-title"
            className="font-acme text-xl md:text-3xl lg:text-4xl text-[#212121] tracking-wide"
          >
            Eventos, campanhas e convites especiais
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#5f5f5f] md:text-base">
            Acompanhe os próximos encontros especiais, campanhas e convites da
            igreja que movimentam o calendário além da rotina semanal.
          </p>
        </div>
      </div>

      <div className="relative w-full">
        <div
          className="relative overflow-hidden bg-[#090909] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffa726]"
          role="region"
          aria-roledescription="carousel"
          aria-label="Banners de destaque da igreja"
          tabIndex={0}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocusCapture={() => setFocusWithin(true)}
          onBlurCapture={(event) => {
            if (
              !event.currentTarget.contains(event.relatedTarget as Node | null)
            ) {
              setFocusWithin(false);
            }
          }}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") {
              event.preventDefault();
              goBack();
            }

            if (event.key === "ArrowRight") {
              event.preventDefault();
              goForward();
            }
          }}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
          style={{ touchAction: "pan-y" }}
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,167,38,0.16),transparent_52%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),transparent_22%,rgba(0,0,0,0.18)_100%)]" />

          <div className="absolute left-0 right-0 top-0 z-20 h-[3px] bg-white/8">
            <div
              className="h-full bg-[#ffa726] transition-[width] duration-500 ease-out"
              style={{ width: `${((realIndex + 1) / total) * 100}%` }}
            />
          </div>

          <div
            className={`flex will-change-transform ${animated ? "transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]" : ""}`}
            style={{ transform: `translateX(-${displayIndex * 100}%)` }}
            onTransitionEnd={handleTransitionEnd}
          >
            {clonedSlides.map((evento, slideIndex) => (
              <Link
                key={`${evento.href}-${slideIndex}`}
                href={evento.href}
                aria-hidden={slideIndex !== realIndex + 1}
                aria-label={evento.ariaLabel}
                tabIndex={slideIndex === realIndex + 1 ? 0 : -1}
                className="group relative block min-w-full cursor-pointer"
              >
                <div className="relative h-[16.5rem] w-full sm:h-[20rem] md:h-[22rem] lg:h-auto lg:aspect-[2400/800]">
                  {evento.imagem ? (
                    <>
                      <Image
                        src={evento.imagem}
                        alt={evento.alt}
                        fill
                        loading="lazy"
                        sizes="100vw"
                        quality={78}
                        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.01]"
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,0.12),rgba(5,5,5,0.3))]" />
                    </>
                  ) : (
                    <div className="absolute inset-0 bg-linear-to-br from-[#1a1200] via-[#211800] to-[#0f0a00]" />
                  )}

                  {(evento.subtitulo || evento.ctaLabel) && (
                    <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-8 bg-[linear-gradient(0deg,rgba(0,0,0,0.72)_0%,rgba(0,0,0,0.18)_60%,transparent_100%)]">
                      <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-2">
                        {evento.titulo}
                      </p>
                      {evento.subtitulo && (
                        <p className="text-white/90 text-sm md:text-base leading-relaxed max-w-lg mb-3">
                          {evento.subtitulo}
                        </p>
                      )}
                      {evento.ctaLabel && (
                        <span className="inline-flex self-start rounded-full bg-[#ffa726] px-4 py-1.5 text-xs font-bold tracking-widest uppercase text-[#111] transition-opacity group-hover:opacity-90">
                          {evento.ctaLabel}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="ui-page-container mt-5 text-center md:mt-6">
        <Link href="/eventos" className="ui-btn-secondary">
          Ver agenda de eventos
        </Link>
      </div>
    </section>
  );
}
