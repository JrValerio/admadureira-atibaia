"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { heroEventos } from "@/data/hero";

export default function HeroEventos() {
  const [index, setIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [hovered, setHovered] = useState(false);
  const [touching, setTouching] = useState(false);
  const [focusWithin, setFocusWithin] = useState(false);
  const [manualPause, setManualPause] = useState(false);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const total = heroEventos.length;
  const paused = hovered || touching || focusWithin || manualPause;

  const proximo = useCallback(
    () => setIndex((prev) => (prev + 1) % total),
    [total]
  );

  const anterior = useCallback(
    () => setIndex((prev) => (prev - 1 + total) % total),
    [total]
  );

  const pauseTemporarily = useCallback((duration = 8000) => {
    setManualPause(true);

    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }

    resumeTimeoutRef.current = setTimeout(() => {
      setManualPause(false);
    }, duration);
  }, []);

  useEffect(() => {
    if (paused) {
      return undefined;
    }

    const id = setInterval(proximo, 6000);
    return () => clearInterval(id);
  }, [paused, proximo]);

  useEffect(() => {
    return () => {
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current);
      }
    };
  }, []);

  const handleTouchStart = (e: React.TouchEvent<HTMLElement>) => {
    setTouchStart(e.touches[0].clientX);
    setTouching(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) {
      return;
    }

    const delta = e.changedTouches[0].clientX - touchStart;
    if (delta > 50) {
      anterior();
    } else if (delta < -50) {
      proximo();
    }

    setTouchStart(null);
    setTouching(false);
    pauseTemporarily();
  };

  return (
    <section
      className="relative w-full aspect-[5/6] overflow-hidden bg-[#111] sm:aspect-[4/3] md:aspect-[16/9]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocusWithin(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          setFocusWithin(false);
        }
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={() => {
        setTouchStart(null);
        setTouching(false);
      }}
    >
      {heroEventos.map((ev, i) => (
        <Link
          key={ev.titulo}
          href={ev.link ?? "/programacao"}
          aria-hidden={i !== index}
          tabIndex={i === index ? 0 : -1}
          className={`group absolute inset-0 block cursor-pointer transition-opacity duration-700 ${
            i === index
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }`}
        >
          <Image
            src={ev.imagem}
            alt={ev.titulo}
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.01] md:object-contain"
          />
          <div className="absolute inset-0 bg-black/30 transition-colors duration-300 group-hover:bg-black/20" />
          <div className="banner-light pointer-events-none absolute inset-0" />

          <div className="pointer-events-none absolute bottom-8 left-5 right-5 max-w-xl text-white sm:bottom-9 sm:left-8 sm:right-8 md:bottom-10 md:left-10 md:right-auto">
            {(ev.data || ev.horario) && (
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.26em] text-[#ffa726] drop-shadow-[0_3px_8px_rgba(0,0,0,0.6)] sm:text-xs">
                {ev.data}
                {ev.data && ev.horario ? " • " : ""}
                {ev.horario}
              </p>
            )}
            <h2 className="font-acme text-[1.75rem] leading-tight tracking-wide text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.72)] sm:text-3xl md:text-4xl">
              {ev.titulo}
            </h2>
          </div>
        </Link>
      ))}

      <button
        type="button"
        onClick={() => {
          anterior();
          pauseTemporarily();
        }}
        aria-label="Slide anterior"
        className="absolute left-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-lg text-white transition-colors hover:bg-black/60 sm:left-3 sm:h-9 sm:w-9 sm:text-xl"
      >
        ‹
      </button>
      <button
        type="button"
        onClick={() => {
          proximo();
          pauseTemporarily();
        }}
        aria-label="Próximo slide"
        className="absolute right-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-lg text-white transition-colors hover:bg-black/60 sm:right-3 sm:h-9 sm:w-9 sm:text-xl"
      >
        ›
      </button>

      <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-2 sm:bottom-5">
        {heroEventos.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => {
              setIndex(i);
              pauseTemporarily();
            }}
            aria-label={`Ir para slide ${i + 1}`}
            className={`h-2 w-2 rounded-full transition-all ${
              i === index ? "scale-125 bg-[#ffa726]" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
