import Link from "next/link";
import CardMedia from "@/components/media/CardMedia";
import {
  groupEventosPorMes,
  type EventoFuturo,
  type EventosPorMesUI,
} from "@/lib/agenda-utils";

type EventosProps = {
  eventos: EventoFuturo[];
  showHeader?: boolean;
};

function getGrupoSectionId(grupo: EventosPorMesUI) {
  return `agenda-${grupo.id}`;
}

function EventoCard({ evento }: { evento: EventoFuturo }) {
  return (
    <Link
      href={`/eventos/${evento.slug}`}
      className="ui-card group overflow-hidden rounded-[1.6rem]"
    >
      <CardMedia
        src={evento.imagem ?? evento.banner}
        alt={evento.titulo}
        variant="poster"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="rounded-none"
      />

      <div className="p-5">
        <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-2">
          {evento.data} · {evento.mes}
        </p>
        <h3 className="font-acme text-[#212121] text-2xl tracking-wide leading-tight mb-3 transition-colors group-hover:text-[#ef5350]">
          {evento.titulo}
        </h3>
        {evento.horario ? (
          <p className="text-sm text-[#666] mb-1">{evento.horario}</p>
        ) : null}
        {evento.local ? (
          <p className="text-xs text-[#8a8a8a] leading-relaxed">{evento.local}</p>
        ) : null}
        <p className="ui-link-accent mt-5 inline-flex">
          Ver evento →
        </p>
      </div>
    </Link>
  );
}

function EventosMes({ grupo }: { grupo: EventosPorMesUI }) {
  return (
    <div
      id={getGrupoSectionId(grupo)}
      className="scroll-mt-28 rounded-2xl border border-black/5 bg-white p-5 shadow-[0_8px_24px_rgba(0,0,0,0.04)]"
    >
      <div className="flex items-center justify-between gap-4 mb-5">
        <div>
          <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-2">
            Agenda mensal
          </p>
          <h3 className="font-acme text-2xl text-[#212121] tracking-wide">
            {grupo.label}
          </h3>
        </div>
        <span className="inline-flex rounded-full border border-[#ffa726]/20 bg-[#fff8ee] px-3 py-1 text-[10px] font-bold tracking-[0.16em] uppercase text-[#8b5b18]">
          {grupo.eventos.length} eventos
        </span>
      </div>

      <ul className="divide-y divide-black/5">
        {grupo.eventos.map((evento) => (
          <li key={evento.slug}>
            <Link
              href={`/eventos/${evento.slug}`}
              className="flex items-start gap-4 rounded-xl px-2 py-3 -mx-2 transition-colors hover:bg-[#fff8ee]"
            >
              <span className="w-20 shrink-0 pt-0.5 text-[#ffa726] text-xs font-bold tracking-widest uppercase">
                {evento.data}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-medium leading-relaxed text-[#212121]">
                  {evento.titulo}
                </p>
                {evento.horario ? (
                  <p className="text-xs text-[#8a8a8a] mt-1">{evento.horario}</p>
                ) : null}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Eventos({
  eventos,
  showHeader = true,
}: EventosProps) {
  const proximosEventos = eventos.filter((evento) => evento.destaque).slice(0, 6);
  const agendaPrincipal = proximosEventos.length > 0 ? proximosEventos : eventos.slice(0, 6);
  const agendaPorMes = groupEventosPorMes(eventos);

  return (
    <section id="eventos" className="py-12 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <nav
          aria-label="Breadcrumb"
          className="mb-8 flex flex-wrap items-center gap-2 text-sm text-[#8a8a8a]"
        >
          <Link href="/" className="transition-colors hover:text-[#212121]">
            Início
          </Link>
          <span>›</span>
          <span className="text-[#212121]">Eventos</span>
        </nav>

        {showHeader ? (
          <div className="text-center mb-8 md:mb-16">
            <p className="text-[#ffa726] text-sm font-semibold tracking-widest uppercase mb-2">
              Agenda especial
            </p>
            <h2 className="font-acme text-2xl md:text-4xl text-[#212121] tracking-wide">
              Eventos da Igreja
            </h2>
            <div className="w-16 h-1 bg-[#ffa726] mx-auto mt-4" />
          </div>
        ) : null}

        <div className="mb-10 md:mb-20">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <p className="text-[#ffa726] text-sm font-semibold tracking-widest uppercase mb-2">
              Próximos eventos
            </p>
            <h3 className="font-acme text-2xl md:text-4xl text-[#212121] tracking-wide mb-4">
              Encontros especiais da igreja
            </h3>
            <p className="text-[#5f5f5f] leading-relaxed">
              Congressos, campanhas, batismos, Santa Ceia e encontros especiais
              ficam reunidos aqui para facilitar a consulta da agenda da igreja.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agendaPrincipal.map((evento) => (
              <EventoCard key={evento.slug} evento={evento} />
            ))}
          </div>
        </div>

        <div className="mb-10 md:mb-20 rounded-3xl border border-[#ffa726]/20 bg-[#fff8ee] p-6 md:p-8 shadow-sm">
          <div className="mb-6">
            <p className="text-[#ef5350] text-xs font-bold tracking-widest uppercase mb-3">
              Linha da agenda
            </p>
            <h3 className="font-acme text-2xl md:text-4xl text-[#212121] tracking-wide mb-4">
              Eventos por mês
            </h3>
            <p className="text-[#666] leading-relaxed max-w-3xl">
              Acompanhe a distribuição dos próximos eventos da igreja ao longo
              dos meses e abra cada encontro para ver os detalhes completos.
            </p>
          </div>

          <nav
            aria-label="Ir para o mês da agenda"
            className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5"
          >
            {agendaPorMes.map((grupo) => (
              <Link
                key={grupo.id}
                href={`#${getGrupoSectionId(grupo)}`}
                className="inline-flex min-h-[3rem] items-center justify-center rounded-2xl border border-black/10 bg-white px-4 py-2 text-center text-xs font-bold tracking-[0.14em] uppercase text-[#555] transition-colors hover:border-[#ffa726]/40 hover:bg-white hover:text-[#212121]"
              >
                {grupo.mes} ({grupo.eventos.length})
              </Link>
            ))}
          </nav>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 md:mb-20">
          {agendaPorMes.map((grupo) => (
            <EventosMes key={grupo.id} grupo={grupo} />
          ))}
        </div>

        <div className="rounded-3xl border border-black/5 bg-[#212121] p-6 md:p-8 text-white shadow-[0_10px_28px_rgba(0,0,0,0.08)]">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 items-start">
            <div>
              <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-3">
                Programação semanal
              </p>
              <h3 className="font-acme text-2xl md:text-4xl tracking-wide mb-4">
                Veja os cultos e reuniões da semana
              </h3>
              <p className="text-white/75 leading-relaxed max-w-3xl">
                Para consultar a rotina fixa da igreja, com cultos, oração,
                Escola Bíblica e atividades recorrentes, acesse a página de
                programação semanal.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href="/programacao" className="ui-btn-primary">
                Ver programação
              </Link>
              <Link href="/contato" className="ui-btn-secondary">
                Fale conosco
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
