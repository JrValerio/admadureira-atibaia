"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback, useRef } from "react";
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

  // Troca automática a cada 6 segundos
  useEffect(() => {
    if (paused) return;

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

  // Swipe mobile
  const handleTouchStart = (e: React.TouchEvent<HTMLElement>) => {
    setTouchStart(e.touches[0].clientX);
    setTouching(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const delta = e.changedTouches[0].clientX - touchStart;
    if (delta > 50) anterior();
    else if (delta < -50) proximo();
    setTouchStart(null);
    setTouching(false);
    pauseTemporarily();
  };

  return (
    <section
      className="relative w-full aspect-[5/6] sm:aspect-[4/3] md:aspect-[16/9] overflow-hidden bg-[#111]"
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
      {/* Slides clicáveis */}
      {heroEventos.map((ev, i) => (
        <Link
          key={ev.titulo}
          href={ev.link ?? "/programacao"}
          aria-hidden={i !== index}
          tabIndex={i === index ? 0 : -1}
          className={`group absolute inset-0 block cursor-pointer transition-opacity duration-700 ${
            i === index ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        >
          <Image
            src={ev.imagem}
            alt={ev.titulo}
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover object-center md:object-contain transition-transform duration-500 group-hover:scale-[1.01]"
          />
          <div className="absolute inset-0 bg-black/30 transition-colors duration-300 group-hover:bg-black/20" />
          <div className="absolute inset-0 banner-light pointer-events-none" />

          <div className="absolute bottom-8 left-5 right-5 sm:bottom-9 sm:left-8 sm:right-8 md:bottom-10 md:left-10 md:right-auto max-w-xl text-white pointer-events-none">
            {(ev.data || ev.horario) && (
              <p className="text-[#ffa726] text-[10px] sm:text-xs font-bold tracking-[0.26em] uppercase mb-2 drop-shadow-[0_3px_8px_rgba(0,0,0,0.6)]">
                {ev.data}
                {ev.data && ev.horario ? " • " : ""}
                {ev.horario}
              </p>
            )}
            <h2 className="font-acme text-white text-[1.75rem] sm:text-3xl md:text-4xl tracking-wide leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.72)]">
              {ev.titulo}
            </h2>
          </div>
        </Link>
      ))}

      {/* Setas */}
      <button
        type="button"
        onClick={() => {
          anterior();
          pauseTemporarily();
        }}
        aria-label="Slide anterior"
        className="absolute z-10 left-2 sm:left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center transition-colors text-lg sm:text-xl"
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
        className="absolute z-10 right-2 sm:right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center transition-colors text-lg sm:text-xl"
      >
        ›
      </button>

      {/* Bolinhas indicadoras */}
      <div className="absolute z-10 bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
        {heroEventos.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => {
              setIndex(i);
              pauseTemporarily();
            }}
            aria-label={`Ir para slide ${i + 1}`}
            className={`w-2 h-2 rounded-full transition-all ${
              i === index ? "bg-[#ffa726] scale-125" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
