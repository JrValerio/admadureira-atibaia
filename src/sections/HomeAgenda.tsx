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
      <div className="max-w-6xl mx-auto">
        <div className="-mx-4 flex overflow-x-auto snap-x snap-mandatory gap-4 px-4 pb-2 xl:mx-0 xl:grid xl:grid-cols-2 xl:overflow-visible xl:gap-6 xl:px-4 xl:pb-0">
          {proximoCompromisso ? (
            <article className="min-w-[83%] shrink-0 snap-center xl:min-w-0 rounded-3xl border border-black/5 bg-white p-4 md:p-6 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
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
            <article className="min-w-[83%] shrink-0 snap-center xl:min-w-0 rounded-3xl border border-[#ffa726]/20 bg-[#fff8ee] p-4 md:p-6 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
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
