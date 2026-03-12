import Image from "next/image";
import Link from "next/link";
import { programacaoSemanal, agenda2026 } from "@/data/agenda";
import type { MesAgenda, Evento } from "@/data/agenda";
import QuadroSemanal from "@/sections/QuadroSemanal";

/* ── Card da programação semanal ───────────────── */
function CardSemanal({
  dia,
  titulo,
  horario,
  banner,
}: {
  dia: string;
  titulo: string;
  horario?: string;
  banner?: string;
}) {
  return (
    <div className="rounded-2xl overflow-hidden border border-gray-100 hover:border-[#ffa726] hover:shadow-md transition-all duration-200 group">
      {/* Banner */}
      <div className="relative w-full aspect-video bg-[#212121]">
        {banner ? (
          <Image
            src={banner}
            alt={titulo}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-end bg-linear-to-br from-[#1a1a1a] via-[#202020] to-[#2a2a2a] p-5">
            <span className="font-acme text-[#ffa726] text-xl tracking-wide leading-tight">
              {titulo}
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="px-4 py-3 bg-white">
        <p className="text-[#ffa726] text-xs font-bold uppercase tracking-widest">
          {dia}
        </p>
        <p className="font-acme text-[#212121] text-base tracking-wide leading-tight mt-0.5">
          {titulo}
        </p>
        {horario && <p className="text-[#9e9e9e] text-xs mt-0.5">{horario}</p>}
      </div>
    </div>
  );
}

/* ── Card de evento com banner (agenda) ─────────── */
function EventoBanner({ evento }: { evento: Evento }) {
  return (
    <Link
      href={`/eventos/${evento.slug}`}
      className="rounded-2xl overflow-hidden border border-[#ffa726] shadow-md block hover:shadow-lg transition-shadow"
    >
      {evento.banner && (
        <div className="relative w-full aspect-video">
          <Image
            src={evento.banner}
            alt={evento.titulo}
            fill
            priority
            sizes="(max-width: 640px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      )}
      <div className="px-4 py-3 bg-[#fff8ee]">
        <p className="text-[#ffa726] text-xs font-bold uppercase tracking-widest">
          {evento.data}
          {evento.horario && ` · ${evento.horario}`}
        </p>
        <p className="font-acme text-[#212121] text-base tracking-wide mt-0.5">
          {evento.titulo}
        </p>
      </div>
    </Link>
  );
}

/* ── Card de mês ───────────────────────────────── */
function CardMes({ mes }: { mes: MesAgenda }) {
  const destaques = mes.eventos.filter((e) => e.destaque);
  const regulares = mes.eventos.filter((e) => !e.destaque);

  return (
    <div className="rounded-2xl border border-gray-100 overflow-hidden">
      {/* Header do mês */}
      <div className="bg-[#212121] px-6 py-3 flex items-center gap-3">
        <span className="font-acme text-[#ffa726] text-lg tracking-widest uppercase">
          {mes.mes}
        </span>
        <span className="text-white/40 text-sm">{mes.ano}</span>
      </div>

      <div className="p-4 bg-white space-y-4">
        {/* Eventos destacados com banner */}
        {destaques.length > 0 && (
          <div className="space-y-3">
            {destaques.map((e, i) => (
              <EventoBanner key={i} evento={e} />
            ))}
          </div>
        )}

        {/* Lista de eventos regulares */}
        <ul className="divide-y divide-gray-100">
          {regulares.map((e) => (
            <li key={e.slug}>
              <Link
                href={`/eventos/${e.slug}`}
                className="flex items-start gap-3 py-2.5 hover:bg-[#fff8ee] rounded-xl px-2 -mx-2 transition-colors"
              >
              <span className="text-[#ffa726] font-bold text-xs w-20 shrink-0 pt-0.5">
                {e.data}
              </span>
              <div>
                <p className="text-[#212121] text-sm font-medium">{e.titulo}</p>
                {e.horario && (
                  <p className="text-[#9e9e9e] text-xs">{e.horario}</p>
                )}
              </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

type ProgramacaoProps = {
  showHeader?: boolean;
};

/* ── Seção principal ───────────────────────────── */
export default function Programacao({
  showHeader = true,
}: ProgramacaoProps = {}) {
  return (
    <section id="programacao" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        {showHeader ? (
          <div className="text-center mb-16">
            <p className="text-[#ffa726] text-sm font-semibold tracking-widest uppercase mb-2">
              Igreja AD Madureira · Atibaia
            </p>
            <h2 className="font-acme text-3xl md:text-4xl text-[#212121] tracking-wide">
              Programação da Igreja
            </h2>
            <div className="w-16 h-1 bg-[#ffa726] mx-auto mt-4" />
          </div>
        ) : null}

        {/* ── 1. PROGRAMAÇÃO SEMANAL ── */}
        <QuadroSemanal />

        <div className="mb-20">
          <h3 className="font-acme text-2xl text-[#212121] tracking-wide mb-4 text-center">
            Programação semanal detalhada
          </h3>
          <p className="text-center text-[#666] leading-relaxed max-w-3xl mx-auto mb-8">
            Abaixo você encontra cada culto e reunião da semana em cards
            individuais, com apoio visual para consulta rápida da rotina da
            igreja.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {programacaoSemanal.map((item, i) => (
              <CardSemanal key={i} {...item} />
            ))}
          </div>
        </div>

        {/* Divisor */}
        <div className="flex items-center gap-4 mb-14">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="font-acme text-[#ffa726] tracking-widest uppercase text-sm">
            Agenda 2026
          </span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* ── 2. AGENDA ANUAL ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {agenda2026.map((mes) => (
            <CardMes key={`${mes.ano}-${mes.mes}`} mes={mes} />
          ))}
        </div>

        {/* Rodapé */}
        <p className="text-center text-[#9e9e9e] text-sm mt-12">
          Acompanhe novidades pelo{" "}
          <a
            href="https://www.instagram.com/admadureira_atibaia/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#ffa726] hover:underline font-semibold"
          >
            Instagram
          </a>
        </p>
      </div>
    </section>
  );
}
