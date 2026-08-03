"use client";

import Image from "next/image";
import Link from "next/link";
import EventCountdown from "@/components/EventCountdown";
import {
  useEffect,
  useEffectEvent,
  useLayoutEffect,
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
  const manualPauseLockedRef = useRef(false);
  const pointerStartXRef = useRef<number | null>(null);
  const activePointerIdRef = useRef<number | null>(null);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const sliderTrackRef = useRef<HTMLDivElement>(null);

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
    if (manualPauseLockedRef.current) {
      setManualPause(true);
      return;
    }

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

  const toggleManualPause = () => {
    if (manualPause) {
      manualPauseLockedRef.current = false;

      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current);
        resumeTimeoutRef.current = null;
      }

      setManualPause(false);
    } else {
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current);
        resumeTimeoutRef.current = null;
      }

      manualPauseLockedRef.current = true;
      setManualPause(true);
    }
  };

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
      manualPauseLockedRef.current = false;

      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current);
      }
    };
  }, []);

  useLayoutEffect(() => {
    if (!progressBarRef.current) {
      return;
    }

    progressBarRef.current.style.width = `${((realIndex + 1) / total) * 100}%`;
  }, [realIndex, total]);

  useLayoutEffect(() => {
    if (!sliderTrackRef.current) {
      return;
    }

    sliderTrackRef.current.style.transform = `translateX(-${displayIndex * 100}%)`;
  }, [displayIndex]);

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

  const activeEvento = eventos[realIndex];
  const countdownEvento = eventos.find((evento) => evento.countdown);
  const countdown = countdownEvento?.countdown;

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

      <div
        className="relative mx-auto w-[calc(100%-2rem)] max-w-[430px] overflow-hidden rounded-[22px] border border-black/5 bg-white shadow-[0_14px_35px_rgba(0,0,0,0.08)] md:w-full md:max-w-none md:overflow-visible md:rounded-none md:border-0 md:bg-transparent md:shadow-none"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocusCapture={() => setFocusWithin(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
            setFocusWithin(false);
          }
        }}
      >
        <div
          id="hero-eventos-slider"
          className="relative overflow-hidden bg-[#090909] touch-pan-y focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffa726]"
          role="region"
          aria-roledescription="carousel"
          aria-label="Banners de destaque da igreja"
          tabIndex={0}
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
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,167,38,0.16),transparent_52%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),transparent_22%,rgba(0,0,0,0.18)_100%)]" />

          <div className="absolute left-0 right-0 top-0 z-20 h-[3px] bg-white/8">
            <div
              ref={progressBarRef}
              className="h-full bg-[#ffa726] transition-[width] duration-500 ease-out motion-reduce:transition-none"
            />
          </div>

          <div
            ref={sliderTrackRef}
            className={`flex will-change-transform ${animated ? "transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]" : ""}`}
            onTransitionEnd={handleTransitionEnd}
          >
            {clonedSlides.map((evento, slideIndex) => (
              <Link
                key={`${evento.href}-${slideIndex}`}
                href={evento.href}
                aria-hidden={slideIndex !== displayIndex}
                aria-label={evento.ariaLabel}
                tabIndex={slideIndex === displayIndex ? 0 : -1}
                className="group relative block min-w-full cursor-pointer"
              >
                <div className="relative h-[clamp(184px,51vw,216px)] w-full overflow-hidden bg-[#090909] md:aspect-[2172/724] md:h-auto">
                  {evento.imagem ? (
                    <>
                      <Image
                        src={evento.imagem}
                        alt={evento.alt}
                        fill
                        loading="lazy"
                        sizes="100vw"
                        quality={78}
                        className={`${evento.imageClassName ?? "object-cover object-center"} transition-transform duration-700 ease-out group-hover:scale-[1.01] motion-reduce:transform-none motion-reduce:transition-none`}
                      />
                      <div className="absolute inset-0 hidden bg-[linear-gradient(180deg,rgba(5,5,5,0.12),rgba(5,5,5,0.3))] md:block" />
                    </>
                  ) : (
                    <div className="absolute inset-0 bg-linear-to-br from-[#1a1200] via-[#211800] to-[#0f0a00]" />
                  )}

                  {(evento.subtitulo || evento.ctaLabel) && (
                    <div className="absolute inset-0 hidden flex-col justify-end bg-[linear-gradient(0deg,rgba(0,0,0,0.84)_0%,rgba(0,0,0,0.28)_58%,transparent_100%)] p-8 md:flex">
                      <div className="max-w-lg">
                        <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#ffa726]">
                          {evento.titulo}
                        </p>
                        {evento.subtitulo && (
                          <p className="mb-3 max-w-lg text-sm leading-relaxed text-white/90 lg:text-base">
                            {evento.subtitulo}
                          </p>
                        )}
                        {evento.ctaLabel && (
                          <span className="inline-flex self-start rounded-full bg-[#ffa726] px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#111] transition-opacity group-hover:opacity-90">
                            {evento.ctaLabel}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {total > 1 && (
          <div className="flex h-[52px] items-center gap-1 border-t border-white/10 bg-[#111] px-2 text-white md:contents">
            <button
              type="button"
              onClick={goBack}
              aria-label="Slide anterior"
              aria-controls="hero-eventos-slider"
              className="relative z-30 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/[0.06] transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffa726] md:absolute md:left-2 md:top-1/2 md:-translate-y-1/2 md:bg-black/40 md:backdrop-blur-sm md:hover:bg-black/60 md:focus-visible:ring-offset-1"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
              </svg>
            </button>

            <span aria-hidden="true" className="flex-1 text-center text-xs font-bold tracking-[0.18em] text-white/75 md:hidden">
              {realIndex + 1} / {total}
            </span>

            <button
              type="button"
              onClick={toggleManualPause}
              aria-label={manualPause ? "Retomar rotação de banners" : "Pausar rotação de banners"}
              aria-pressed={manualPause}
              aria-controls="hero-eventos-slider"
              className="relative z-30 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/[0.06] transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffa726] md:absolute md:bottom-3 md:right-3 md:bg-black/50 md:backdrop-blur-sm md:hover:bg-black/70 md:focus-visible:ring-offset-1"
            >
              {manualPause ? (
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8 5v14l11-7z" />
                </svg>
              ) : (
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              )}
            </button>

            <button
              type="button"
              onClick={goForward}
              aria-label="Próximo slide"
              aria-controls="hero-eventos-slider"
              className="relative z-30 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/[0.06] transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffa726] md:absolute md:right-2 md:top-1/2 md:-translate-y-1/2 md:bg-black/40 md:backdrop-blur-sm md:hover:bg-black/60 md:focus-visible:ring-offset-1"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        )}

        {activeEvento && (
          <div className="flex min-h-[220px] flex-col bg-white p-5 md:hidden">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#c96f00]">
              Evento em destaque
            </p>
            <h3 className="mt-2 font-acme text-xl leading-6 tracking-wide text-[#212121]">
              {activeEvento.titulo}
            </h3>
            {activeEvento.subtitulo && (
              <p className="mt-2 text-sm leading-5 text-[#5f5f5f]">
                {activeEvento.subtitulo}
              </p>
            )}
            <Link
              href={activeEvento.href}
              aria-label={activeEvento.ariaLabel}
              className="mt-auto inline-flex min-h-11 w-full items-center justify-center rounded-full bg-[#ffa726] px-5 py-2 text-center text-xs font-bold uppercase tracking-widest text-[#111] transition-colors hover:bg-[#f59b17] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              {activeEvento.ctaLabel ?? "Ver detalhes"}
            </Link>
          </div>
        )}
      </div>

      {countdownEvento && countdown && (
        <div className="ui-page-container mt-5">
          <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 rounded-2xl bg-[#17130e] px-5 py-4 text-center shadow-[0_12px_30px_rgba(0,0,0,0.12)] sm:flex-row sm:text-left md:px-7">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#ffc46b]">
                Próximo grande encontro
              </p>
              <p className="mt-1 font-acme text-xl tracking-wide text-white">
                {countdownEvento.titulo}
              </p>
            </div>

            <EventCountdown
              targetIso={countdown.targetIso}
              endIso={countdown.endIso}
              eventName={countdown.eventName}
              variant="overlay"
            />

            <Link
              href={countdownEvento.href}
              aria-label={countdownEvento.ariaLabel}
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#ffa726] px-5 py-2 text-xs font-bold uppercase tracking-widest text-[#111] transition-colors hover:bg-[#f59b17] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#17130e]"
            >
              Ver detalhes
            </Link>
          </div>
        </div>
      )}

      <div className="ui-page-container mt-5 text-center md:mt-6">
        <Link href="/eventos" className="ui-btn-secondary">
          Ver agenda de eventos
        </Link>
      </div>

      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {eventos[realIndex] ? `Slide ${realIndex + 1} de ${total}: ${eventos[realIndex].titulo}` : ""}
      </div>
    </section>
  );
}
