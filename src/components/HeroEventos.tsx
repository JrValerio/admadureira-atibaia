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
import { heroEventos } from "@/data/hero";

type LegacyMediaQueryList = MediaQueryList & {
  addListener?: (listener: (event: MediaQueryListEvent) => void) => void;
  removeListener?: (listener: (event: MediaQueryListEvent) => void) => void;
};

const AUTO_PLAY_MS = 5500;
const RESUME_AFTER_INTERACTION_MS = 9000;
const SWIPE_THRESHOLD = 56;

export default function HeroEventos() {
  const total = heroEventos.length;
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focusWithin, setFocusWithin] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [manualPause, setManualPause] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const pointerStartXRef = useRef<number | null>(null);
  const activePointerIdRef = useRef<number | null>(null);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const paused = hovered || focusWithin || dragging || manualPause || prefersReducedMotion;

  const goToSlide = (nextIndex: number) => {
    if (total === 0) {
      return;
    }

    setIndex((nextIndex + total) % total);
  };

  const goToPrevious = () => {
    setIndex((current) => (current - 1 + total) % total);
  };

  const goToNext = () => {
    setIndex((current) => (current + 1) % total);
  };

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
    setIndex((current) => (current + 1) % total);
  });

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
      goToPrevious();
      pauseTemporarily();
    } else if (delta <= -SWIPE_THRESHOLD) {
      goToNext();
      pauseTemporarily();
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
    <section className="relative overflow-hidden bg-linear-to-b from-[#17120c] via-[#111111] to-[#181818] py-5 sm:py-6 lg:py-8">
      <div className="mx-auto max-w-[110rem] px-4 sm:px-6 lg:px-8">
        <div
          className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#090909] shadow-[0_28px_84px_rgba(0,0,0,0.34)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffa726]"
          role="region"
          aria-roledescription="carousel"
          aria-label="Banners de destaque da igreja"
          tabIndex={0}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocusCapture={() => setFocusWithin(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
              setFocusWithin(false);
            }
          }}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") {
              event.preventDefault();
              goToPrevious();
              pauseTemporarily();
            }

            if (event.key === "ArrowRight") {
              event.preventDefault();
              goToNext();
              pauseTemporarily();
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
              style={{ width: `${((index + 1) / total) * 100}%` }}
            />
          </div>

          <div
            className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {heroEventos.map((evento, slideIndex) => (
              <Link
                key={evento.imagem}
                href={evento.href}
                aria-hidden={slideIndex !== index}
                aria-label={evento.ariaLabel}
                tabIndex={slideIndex === index ? 0 : -1}
                className="group relative block min-w-full cursor-pointer"
              >
                <div className="relative aspect-[16/7] sm:aspect-[18/7] md:aspect-[3/1]">
                  <Image
                    src={evento.imagem}
                    alt={evento.alt}
                    fill
                    priority={slideIndex === 0}
                    sizes="100vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.015]"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,0.12),rgba(5,5,5,0.3))]" />
                </div>
              </Link>
            ))}
          </div>

          <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3 rounded-full border border-white/10 bg-black/48 px-3 py-2 shadow-[0_14px_36px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:bottom-5 sm:px-4">
            <button
              type="button"
              onClick={() => {
                goToPrevious();
                pauseTemporarily();
              }}
              aria-label="Mostrar banner anterior"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/8 text-white transition-colors duration-200 hover:bg-white/16 hover:text-[#ffa726]"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                className="h-4 w-4"
              >
                <path
                  d="m15 18-6-6 6-6"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <div className="flex items-center gap-2">
              {heroEventos.map((evento, slideIndex) => (
                <button
                  key={evento.imagem}
                  type="button"
                  onClick={() => {
                    goToSlide(slideIndex);
                    pauseTemporarily();
                  }}
                  aria-label={evento.ariaLabel}
                  aria-current={slideIndex === index}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    slideIndex === index
                      ? "w-8 bg-[#ffa726]"
                      : "w-2 bg-white/45 hover:bg-white/75"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => {
                goToNext();
                pauseTemporarily();
              }}
              aria-label="Mostrar próximo banner"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/8 text-white transition-colors duration-200 hover:bg-white/16 hover:text-[#ffa726]"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                className="h-4 w-4"
              >
                <path
                  d="m9 6 6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
