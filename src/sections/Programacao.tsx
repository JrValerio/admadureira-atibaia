import Image from "next/image";
import Link from "next/link";
import { programacaoSemanal } from "@/data/agenda";
import { getProgramacaoAnchorId } from "@/lib/programacao-anchor";
import QuadroSemanal from "@/sections/QuadroSemanal";

type ProgramacaoProps = {
  showHeader?: boolean;
};

type CardSemanalProps = {
  dia: string;
  titulo: string;
  horario?: string;
  banner?: string;
};

const ordemProgramacaoDetalhada: Record<string, number> = {
  "Segunda a Sexta": 0,
  "Segunda-feira": 1,
  "Terça-feira": 2,
  "Quarta-feira": 3,
  "Quinta-feira": 4,
  "Sexta-feira": 5,
  Sábado: 6,
  Domingo: 7,
};

function extrairOrdemHorario(horario?: string) {
  const match = horario?.match(/(\d{1,2})h(\d{2})?/);

  if (!match) {
    return Number.MAX_SAFE_INTEGER;
  }

  const horas = parseInt(match[1], 10);
  const minutos = match[2] ? parseInt(match[2], 10) : 0;

  return horas * 60 + minutos;
}

function extrairOrdemDia(dia: string) {
  return ordemProgramacaoDetalhada[dia] ?? Number.MAX_SAFE_INTEGER;
}

function CardSemanal({
  dia,
  titulo,
  horario,
  banner,
}: CardSemanalProps) {
  return (
    <article
      id={getProgramacaoAnchorId({ dia, titulo })}
      className="min-w-[75vw] snap-start scroll-mt-28 rounded-2xl overflow-hidden border border-black/5 bg-white shadow-[0_8px_24px_rgba(0,0,0,0.04)] transition-all duration-200 hover:border-[#ffa726]/40 hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] sm:min-w-0"
    >
      <div className="relative w-full aspect-video bg-[#212121]">
        {banner ? (
          <Image
            src={banner}
            alt={titulo}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-end bg-linear-to-br from-[#1a1a1a] via-[#202020] to-[#2a2a2a] p-5">
            <span className="font-acme text-[#ffa726] text-xl tracking-wide leading-tight">
              {titulo}
            </span>
          </div>
        )}
      </div>

      <div className="px-5 py-4">
        <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-2">
          {dia}
        </p>
        <h4 className="font-acme text-xl md:text-2xl text-[#212121] tracking-wide leading-tight mb-2">
          {titulo}
        </h4>
        {horario ? (
          <p className="text-sm text-[#666] leading-relaxed">{horario}</p>
        ) : null}
      </div>
    </article>
  );
}

export default function Programacao({
  showHeader = true,
}: ProgramacaoProps = {}) {
  const programacaoDetalhada = [...programacaoSemanal].sort(
    (a, b) =>
      extrairOrdemDia(a.dia) - extrairOrdemDia(b.dia) ||
      extrairOrdemHorario(a.horario) - extrairOrdemHorario(b.horario)
  );

  return (
    <section id="programacao" className="py-12 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <nav
          aria-label="Breadcrumb"
          className="mb-8 flex flex-wrap items-center gap-2 text-sm text-[#8a8a8a]"
        >
          <Link href="/" className="transition-colors hover:text-[#212121]">
            Início
          </Link>
          <span>›</span>
          <span className="text-[#212121]">Programação</span>
        </nav>

        {showHeader ? (
          <div className="text-center mb-8 md:mb-16">
            <p className="text-[#ffa726] text-sm font-semibold tracking-widest uppercase mb-2">
              Vida da Igreja
            </p>
            <h2 className="font-acme text-2xl md:text-4xl text-[#212121] tracking-wide">
              Programação da Igreja
            </h2>
            <div className="w-16 h-1 bg-[#ffa726] mx-auto mt-4" />
          </div>
        ) : null}

        <QuadroSemanal />

        <div className="mb-10 md:mb-20">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <p className="text-[#ffa726] text-sm font-semibold tracking-widest uppercase mb-2">
              Cultos e reuniões da semana
            </p>
            <h3 className="font-acme text-2xl md:text-4xl text-[#212121] tracking-wide mb-4">
              Programação semanal detalhada
            </h3>
            <p className="text-[#5f5f5f] leading-relaxed">
              Consulte cada culto, reunião e atividade fixa da igreja com
              apoio visual para acompanhar a rotina semanal com clareza.
            </p>
          </div>

          <div className="-mx-4 flex gap-4 overflow-x-auto snap-x snap-mandatory px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 sm:snap-none xl:grid-cols-4">
            {programacaoDetalhada.map((item, index) => (
              <CardSemanal key={`${item.dia}-${item.titulo}-${index}`} {...item} />
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-[#ffa726]/20 bg-[#fff8ee] p-6 md:p-8 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 items-start">
            <div>
              <p className="text-[#ef5350] text-xs font-bold tracking-widest uppercase mb-3">
                Eventos especiais
              </p>
              <h3 className="font-acme text-2xl md:text-4xl text-[#212121] tracking-wide mb-4">
                Veja a agenda da igreja
              </h3>
              <p className="text-[#666] leading-relaxed max-w-3xl">
                Congressos, batismos, campanhas, Santa Ceia e encontros
                especiais ficam concentrados na página de eventos, separando a
                rotina semanal da agenda especial da igreja. A Escola Bíblica
                Dominical acontece todo domingo às 09h, com classes para
                adultos, jovens e infantil, enquanto o material publicado no
                site acompanha hoje as classes de adultos e jovens.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href="/eventos" className="ui-btn-primary">
                Ver eventos
              </Link>
              <Link href="/ebd" className="ui-btn-secondary">
                Escola Bíblica Dominical
              </Link>
              <Link href="/contato" className="ui-btn-secondary">
                Falar com a igreja
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
