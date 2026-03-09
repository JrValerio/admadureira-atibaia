"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { heroEventos } from "@/data/hero";

export default function HeroEventos() {
  const [index, setIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const total = heroEventos.length;

  const proximo = useCallback(
    () => setIndex((prev) => (prev + 1) % total),
    [total]
  );

  const anterior = useCallback(
    () => setIndex((prev) => (prev - 1 + total) % total),
    [total]
  );

  // Troca automática a cada 6 segundos
  useEffect(() => {
    const id = setInterval(proximo, 6000);
    return () => clearInterval(id);
  }, [proximo]);

  // Swipe mobile
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const delta = e.changedTouches[0].clientX - touchStart;
    if (delta > 50) anterior();
    else if (delta < -50) proximo();
    setTouchStart(null);
  };

  const evento = heroEventos[index];

  return (
    <section
      className="relative w-full aspect-[16/9] overflow-hidden bg-[#111]"
      onTouchStart={(e) => setTouchStart(e.touches[0].clientX)}
      onTouchEnd={handleTouchEnd}
    >
      {/* Imagens — pré-carrega todas, exibe apenas a ativa */}
      {heroEventos.map((ev, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={ev.imagem}
            alt={ev.titulo}
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-contain"
          />
        </div>
      ))}

      {/* Overlay escuro */}
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/25 to-black/10" />

      {/* Texto central */}
      <div className="absolute inset-0 flex items-end justify-center px-4 pb-6 sm:pb-10 md:items-center md:pb-0 text-center">
        <div className="max-w-xl rounded-2xl border border-white/10 bg-black/45 px-4 py-3 sm:px-6 sm:py-5 shadow-2xl backdrop-blur-sm md:translate-y-12 lg:translate-y-16">
          <p className="text-[#ffa726] text-[11px] sm:text-xs font-bold tracking-widest uppercase mb-2">
            {evento.data}
            {evento.horario && ` · ${evento.horario}`}
          </p>
          <h2 className="font-acme text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-wide leading-tight">
            {evento.titulo}
          </h2>
          {evento.link && (
            <Link
              href={evento.link}
              className="mt-3 sm:mt-4 inline-block bg-[#ffa726] text-[#212121] font-bold text-[11px] sm:text-xs tracking-widest uppercase px-5 sm:px-6 py-2 rounded-full hover:bg-[#ffb74d] transition-colors"
            >
              Ver programação
            </Link>
          )}
        </div>
      </div>

      {/* Setas */}
      <button
        type="button"
        onClick={anterior}
        aria-label="Slide anterior"
        className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center transition-colors text-lg sm:text-xl"
      >
        ‹
      </button>
      <button
        type="button"
        onClick={proximo}
        aria-label="Próximo slide"
        className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center transition-colors text-lg sm:text-xl"
      >
        ›
      </button>

      {/* Bolinhas indicadoras */}
      <div className="absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
        {heroEventos.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
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
