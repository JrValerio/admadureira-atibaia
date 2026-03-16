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
      setIndex((current) => (current - 1 + total) % total);
      pauseTemporarily();
    } else if (delta <= -SWIPE_THRESHOLD) {
      setIndex((current) => (current + 1) % total);
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
    <section className="relative w-full overflow-hidden bg-linear-to-b from-[#17120c] via-[#111111] to-[#181818] py-0">
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
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
              setFocusWithin(false);
            }
          }}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") {
              event.preventDefault();
              setIndex((current) => (current - 1 + total) % total);
              pauseTemporarily();
            }

            if (event.key === "ArrowRight") {
              event.preventDefault();
              setIndex((current) => (current + 1) % total);
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
            {eventos.map((evento, slideIndex) => (
              <Link
                key={evento.imagem}
                href={evento.href}
                aria-hidden={slideIndex !== index}
                aria-label={evento.ariaLabel}
                tabIndex={slideIndex === index ? 0 : -1}
                className="group relative block min-w-full cursor-pointer"
              >
                <div className="relative aspect-[16/7] w-full sm:aspect-[18/7] md:aspect-[3/1] xl:aspect-[2400/800]">
                  <Image
                    src={evento.imagem}
                    alt={evento.alt}
                    fill
                    priority={slideIndex === 0}
                    sizes="100vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.01]"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,0.12),rgba(5,5,5,0.3))]" />
                </div>
              </Link>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
