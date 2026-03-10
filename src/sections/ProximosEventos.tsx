"use client";

import Image from "next/image";
import Link from "next/link";
import { getProximosEventos } from "@/lib/agenda-utils";
import { useReveal } from "@/hooks/useReveal";

export default function ProximosEventos() {
  const eventos = getProximosEventos(4);
  const ref = useReveal();

  if (eventos.length === 0) return null;

  return (
    <section className="py-24 bg-[#f7f6f2]">
      <div ref={ref} className="max-w-6xl mx-auto px-4 reveal">
        {/* Cabeçalho */}
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <p className="text-[#ffa726] text-sm font-semibold tracking-widest uppercase mb-1">
              Agenda
            </p>
            <h2 className="font-acme text-3xl text-[#212121] tracking-wide">
              Próximos Eventos
            </h2>
            <div className="w-12 h-1 bg-[#ffa726] mt-3" />
          </div>
          <Link
            href="/programacao"
            className="ui-link-accent"
          >
            Ver agenda completa →
          </Link>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {eventos.map((ev) => (
            <Link
              key={ev.slug}
              href={`/eventos/${ev.slug}`}
              className="ui-card rounded-[1.6rem] overflow-hidden group block"
            >
              {/* Banner quando existir */}
              {ev.imagem || ev.banner ? (
                <div className="relative w-full aspect-video">
                  <Image
                    src={ev.imagem ?? ev.banner ?? "/fachada-da-igreja.jpg"}
                    alt={ev.titulo}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ) : (
                /* Badge de data quando não há banner */
                <div className="bg-[#212121] px-4 py-3 flex items-center gap-3">
                  <div className="flex flex-col items-center bg-[#ffa726] rounded-lg px-3 py-1 min-w-12 text-center">
                    <span className="text-[#212121] text-xs font-bold tracking-widest uppercase leading-none">
                      {ev.mes.slice(0, 3)}
                    </span>
                    <span className="font-acme text-[#212121] text-2xl leading-tight">
                      {ev.data.match(/\d+/)?.[0]}
                    </span>
                  </div>
                  <span className="text-white/60 text-xs">{ev.mes} {ev.ano}</span>
                </div>
              )}

              {/* Info */}
              <div className="px-4 py-3">
                {(ev.imagem || ev.banner) && (
                  <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-1">
                    {ev.data} · {ev.mes}
                  </p>
                )}
                <p className="font-acme text-[#212121] text-base tracking-wide leading-tight">
                  {ev.titulo}
                </p>
                {ev.horario && (
                  <p className="text-[#9e9e9e] text-xs mt-1">{ev.horario}</p>
                )}
                <p className="ui-link-accent mt-4">
                  Ver detalhes →
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
