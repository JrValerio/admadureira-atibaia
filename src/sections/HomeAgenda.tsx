import Link from "next/link";
import {
  getEventosDestaque,
  getProximoEventoComData,
} from "@/lib/agenda-utils";

function formatarDataCompleta(data: string, mes: string, ano: number) {
  return `${data} · ${mes} · ${ano}`;
}

export default function HomeAgenda() {
  const proximoCompromisso = getProximoEventoComData();
  const eventoDestaque = getEventosDestaque(1)[0] ?? null;

  if (!proximoCompromisso && !eventoDestaque) {
    return null;
  }

  return (
    <section className="bg-[#f7f6f2] py-7 md:py-14">
      <div className="ui-page-container">
        <div className="-mx-4 flex gap-4 overflow-x-auto snap-x snap-mandatory px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:gap-6 sm:px-0 sm:pb-0 sm:snap-none">
          {proximoCompromisso ? (
            <article className="ui-panel ui-panel-pad-sm min-w-[84vw] max-w-[21rem] shrink-0 snap-center sm:min-w-0 sm:max-w-none">
              <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-3">
                Próximo compromisso
              </p>
              <h2 className="font-acme text-2xl md:text-4xl text-[#212121] tracking-wide mb-3">
                {proximoCompromisso.evento.titulo}
              </h2>
              <p className="text-sm font-semibold tracking-[0.16em] uppercase text-[#8b5b18] mb-4">
                {proximoCompromisso.evento.detalhe ?? "Programação semanal"}
              </p>
              <p className="text-[#555] leading-relaxed mb-6">
                {formatarDataCompleta(
                  proximoCompromisso.evento.data,
                  proximoCompromisso.evento.mes,
                  proximoCompromisso.evento.ano
                )}
                {proximoCompromisso.evento.horario
                  ? ` · ${proximoCompromisso.evento.horario}`
                  : ""}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href={proximoCompromisso.evento.href} className="ui-btn-primary">
                  {proximoCompromisso.evento.origem === "evento"
                    ? "Ver evento"
                    : "Ver programação"}
                </Link>
                <Link
                  href={
                    proximoCompromisso.evento.origem === "evento"
                      ? "/eventos"
                      : "/contato"
                  }
                  className="ui-btn-secondary"
                >
                  {proximoCompromisso.evento.origem === "evento"
                    ? "Ver agenda"
                    : "Como chegar"}
                </Link>
              </div>
            </article>
          ) : null}

          {eventoDestaque ? (
            <article className="ui-panel-accent ui-panel-pad-sm min-w-[84vw] max-w-[21rem] shrink-0 snap-center sm:min-w-0 sm:max-w-none">
              <p className="text-[#ef5350] text-xs font-bold tracking-widest uppercase mb-3">
                Evento em destaque
              </p>
              <h2 className="font-acme text-2xl md:text-4xl text-[#212121] tracking-wide mb-4">
                {eventoDestaque.titulo}
              </h2>
              <p className="text-[#555] leading-relaxed mb-3">
                {formatarDataCompleta(
                  eventoDestaque.data,
                  eventoDestaque.mes,
                  eventoDestaque.ano
                )}
                {eventoDestaque.horario ? ` · ${eventoDestaque.horario}` : ""}
              </p>
              {eventoDestaque.local ? (
                <p className="text-sm text-[#777] leading-relaxed mb-6">
                  {eventoDestaque.local}
                </p>
              ) : null}
              <div className="flex flex-wrap gap-3">
                <Link
                  href={`/eventos/${eventoDestaque.slug}`}
                  className="ui-btn-primary"
                >
                  Ver evento
                </Link>
                <Link href="/eventos" className="ui-btn-secondary">
                  Ver agenda
                </Link>
              </div>
            </article>
          ) : null}
        </div>
      </div>
    </section>
  );
}
