import { getHojeNaIgreja, type HojeNaIgrejaUI } from "@/lib/agenda-utils";

type HojeNaIgrejaProps = {
  data?: HojeNaIgrejaUI;
};

export default function HojeNaIgreja({
  data = getHojeNaIgreja(),
}: HojeNaIgrejaProps) {
  const hasAtividades = data.atividades.length > 0;

  return (
    <div className="rounded-3xl border border-[#ffa726]/20 bg-[#fff8ee] p-6 md:p-8 shadow-sm">
      <div className="mb-6">
        <p className="text-[#ef5350] text-xs font-bold tracking-widest uppercase mb-3">
          {data.titulo}
        </p>
        <h3 className="font-acme text-3xl md:text-4xl text-[#212121] tracking-wide mb-2">
          {data.dia}
        </h3>
        <p className="text-[#666] leading-relaxed max-w-3xl">
          Veja as atividades programadas para hoje e acompanhe a rotina da
          igreja com mais clareza ao longo da semana.
        </p>
      </div>

      {hasAtividades ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {data.atividades.map((atividade) => (
            <article
              key={atividade.id}
              className="rounded-2xl border border-black/5 bg-white p-5 shadow-[0_8px_24px_rgba(0,0,0,0.04)]"
            >
              <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-2">
                {atividade.horario ?? "Horário a confirmar"}
              </p>
              <h4 className="font-acme text-2xl text-[#212121] tracking-wide mb-2">
                {atividade.titulo}
              </h4>
              <p className="text-sm text-[#777] leading-relaxed">
                {atividade.dia}
              </p>
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
