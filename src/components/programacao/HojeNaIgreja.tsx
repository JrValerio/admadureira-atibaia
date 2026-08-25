import { getHojeNaIgreja, type HojeNaIgrejaUI } from "@/lib/agenda-utils";

type HojeNaIgrejaProps = {
  data?: HojeNaIgrejaUI;
};

export default function HojeNaIgreja({
  data = getHojeNaIgreja(),
}: HojeNaIgrejaProps) {
  const hasAtividades = data.atividades.length > 0;

  return (
    <div className="rounded-3xl border border-[#ffa726]/20 bg-[#fff8ee] p-4 md:p-8 shadow-sm">
      <div className="mb-3 md:mb-6">
        <p className="text-[#ef5350] text-xs font-bold tracking-widest uppercase mb-3">
          {data.titulo}
        </p>
        <h3 className="font-acme text-2xl md:text-4xl text-[#212121] tracking-wide mb-2">
          {data.dia}
        </h3>
        <p className="text-[#666] leading-relaxed max-w-3xl">
          Veja as atividades programadas para hoje e acompanhe a rotina da
          igreja com mais clareza ao longo da semana.
        </p>
      </div>

      {hasAtividades ? (
        <div className="-mx-4 flex gap-3 overflow-x-auto snap-x snap-mandatory px-4 pb-2 md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 md:pb-0 xl:grid-cols-3 md:gap-4">
          {data.atividades.map((atividade) => (
            <article
              key={atividade.id}
              className="min-w-[82vw] shrink-0 snap-center rounded-2xl border border-black/5 bg-white p-4 shadow-[0_8px_24px_rgba(0,0,0,0.04)] md:min-w-0"
            >
              <p className="ui-card-eyebrow mb-2">
                {atividade.horario ?? "Horário a confirmar"}
              </p>
              <h4 className="font-acme text-xl md:text-2xl text-[#212121] tracking-wide mb-2">
                {atividade.titulo}
              </h4>
              <div className="flex flex-wrap items-center gap-2 text-sm text-[#777] leading-relaxed">
                <p>{atividade.dia}</p>
                {atividade.origem === "evento" ? (
                  <span className="rounded-full border border-[#ffa726]/20 bg-[#fff8ee] px-2 py-1 text-[10px] font-bold tracking-[0.16em] uppercase text-[#8b5b18]">
                    Evento especial
                  </span>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-[0_8px_24px_rgba(0,0,0,0.04)]">
          <p className="text-[#212121] font-acme text-2xl tracking-wide mb-2">
            Nenhuma atividade programada para hoje
          </p>
          <p className="text-[#666] leading-relaxed">
            Use a programação semanal para consultar os próximos cultos e
            reuniões da igreja.
          </p>
        </div>
      )}
    </div>
  );
}
