"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { heroEventos } from "@/data/hero";

export default function HeroEventos() {
  const [index, setIndex] = useState(0);
  const total = heroEventos.length;

  const proximo = useCallback(
    () => setIndex((prev) => (prev + 1) % total),
    [total]
  );

  const anterior = () => setIndex((prev) => (prev - 1 + total) % total);

  // Troca automática a cada 6 segundos
  useEffect(() => {
    const id = setInterval(proximo, 6000);
    return () => clearInterval(id);
  }, [proximo]);

  const evento = heroEventos[index];

  return (
    <section className="relative w-full h-[420px] md:h-[520px] overflow-hidden bg-[#212121]">
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
            className="object-cover"
          />
        </div>
      ))}

      {/* Overlay escuro */}
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />

      {/* Texto central */}
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 px-4 text-center">
        <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-2">
          {evento.data}
          {evento.horario && ` · ${evento.horario}`}
        </p>
        <h2 className="font-acme text-white text-3xl md:text-5xl tracking-wide leading-tight max-w-2xl">
          {evento.titulo}
        </h2>
        {evento.link && (
          <Link
            href={evento.link}
            className="mt-4 inline-block bg-[#ffa726] text-[#212121] font-bold text-xs tracking-widest uppercase px-6 py-2 rounded-full hover:bg-[#ffb74d] transition-colors"
          >
            Ver programação
          </Link>
        )}
      </div>

      {/* Setas */}
      <button
        type="button"
        onClick={anterior}
        aria-label="Slide anterior"
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full w-9 h-9 flex items-center justify-center transition-colors"
      >
        ‹
      </button>
      <button
        type="button"
        onClick={proximo}
        aria-label="Próximo slide"
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full w-9 h-9 flex items-center justify-center transition-colors"
      >
        ›
      </button>

      {/* Bolinhas indicadoras */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
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
