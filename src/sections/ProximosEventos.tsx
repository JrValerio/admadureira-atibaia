"use client";

import Image from "next/image";
import Link from "next/link";
import { CardGrid, Section, SectionTitle } from "@/components/ui";
import { getEventosFuturos, getProximosEventos } from "@/lib/agenda-utils";
import { useReveal } from "@/hooks/useReveal";

const EVENTO_IMPORTANTE = [
  /santa ceia/i,
  /mulher/i,
  /mocidade/i,
  /jovens?/i,
  /campanha/i,
  /congresso/i,
  /confer[eê]ncia/i,
  /batismo/i,
];

export default function ProximosEventos() {
  const eventosImportantes = getEventosFuturos()
    .filter(
      (evento) =>
        evento.destaque ||
        EVENTO_IMPORTANTE.some((pattern) => pattern.test(evento.titulo))
    )
    .slice(0, 4);
  const eventos =
    eventosImportantes.length > 0 ? eventosImportantes : getProximosEventos(4);
  const ref = useReveal();

  if (eventos.length === 0) return null;

  return (
    <Section className="bg-[#f7f6f2]">
      <div ref={ref} className="reveal">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <SectionTitle
            eyebrow="Agenda"
            eyebrowVariant="gold"
            title="Próximos Eventos"
            center={false}
            divider
            className="mb-0 max-w-2xl"
            description="Selecionamos apenas os cultos e encontros mais relevantes da agenda para manter o topo da home mais direto e útil."
          />
          <Link
            href="/programacao"
            className="ui-link-accent"
          >
            Ver agenda completa →
          </Link>
        </div>

        <CardGrid columns={4} breakpoint="lg" className="gap-5">
          {eventos.map((ev) => (
            <Link
              key={ev.slug}
              href={`/eventos/${ev.slug}`}
              className="ui-card group block overflow-hidden rounded-[1.6rem]"
            >
              {ev.imagem || ev.banner ? (
                <div className="relative w-full aspect-video">
                  <Image
                    src={ev.imagem ?? ev.banner ?? "/fachada-da-igreja.jpg"}
                    alt={ev.titulo}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/15 to-transparent" />
                </div>
              ) : (
                <div className="flex items-center gap-3 bg-[#212121] px-4 py-4">
                  <div className="flex min-w-12 flex-col items-center rounded-lg bg-[#ffa726] px-3 py-1 text-center">
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

              <div className="px-5 py-5">
                {(ev.imagem || ev.banner) && (
                  <p className="mb-2 text-[#ffa726] text-[11px] font-bold tracking-[0.22em] uppercase">
                    {ev.data} · {ev.mes}
                  </p>
                )}
                <h3 className="font-acme text-lg leading-tight tracking-wide text-[#212121] transition-colors group-hover:text-[#ef5350]">
                  {ev.titulo}
                </h3>
                {ev.horario && (
                  <p className="mt-2 text-sm text-[#6c6c6c]">{ev.horario}</p>
                )}
                <p className="ui-link-accent mt-5">
                  Ver detalhes →
                </p>
              </div>
            </Link>
          ))}
        </CardGrid>
      </div>
    </Section>
  );
}
