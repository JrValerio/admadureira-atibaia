const eventos = [
  {
    mes: "MAR",
    dia: "15",
    titulo: "Congresso de Jovens",
    horario: "18h00",
    local: "Sede – Praça Pio XII, 122",
    tipo: "congresso",
  },
  {
    mes: "MAR",
    dia: "22",
    titulo: "Vigília de Oração",
    horario: "22h00",
    local: "Sede – Praça Pio XII, 122",
    tipo: "vigilia",
  },
  {
    mes: "ABR",
    dia: "05",
    titulo: "Encontro de Mulheres",
    horario: "09h00",
    local: "Sede – Praça Pio XII, 122",
    tipo: "encontro",
  },
  {
    mes: "ABR",
    dia: "12",
    titulo: "Culto de Santa Ceia",
    horario: "18h30",
    local: "Sede – Praça Pio XII, 122",
    tipo: "culto",
  },
  {
    mes: "ABR",
    dia: "19",
    titulo: "Congresso de Homens",
    horario: "18h00",
    local: "Sede – Praça Pio XII, 122",
    tipo: "congresso",
  },
  {
    mes: "MAI",
    dia: "03",
    titulo: "Culto de Jovens",
    horario: "19h30",
    local: "Sede – Praça Pio XII, 122",
    tipo: "culto",
  },
];

const tipoCor: Record<string, string> = {
  congresso: "bg-[#ef5350] text-white",
  vigilia: "bg-[#212121] text-[#ffd54f]",
  encontro: "bg-[#ffa726] text-[#212121]",
  culto: "bg-[#424242] text-white",
};

export default function Eventos() {
  return (
    <section id="eventos" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* Cabeçalho */}
        <div className="text-center mb-16">
          <p className="text-[#ffa726] text-sm font-semibold tracking-widest uppercase mb-2">
            Agenda
          </p>
          <h2 className="font-acme text-3xl md:text-4xl text-[#212121] tracking-wide">
            Próximos Eventos
          </h2>
          <div className="w-16 h-1 bg-[#ffa726] mx-auto mt-4" />
        </div>

        {/* Grid de eventos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {eventos.map((e, i) => (
            <div
              key={i}
              className="flex gap-4 p-6 rounded-2xl border border-gray-100 hover:border-[#ffa726] hover:shadow-md transition-all duration-200"
            >
              {/* Data */}
              <div className="flex flex-col items-center justify-center bg-[#f5f5f5] rounded-xl px-4 py-3 shrink-0 min-w-16 text-center">
                <span className="text-[#ffa726] text-xs font-bold tracking-widest">
                  {e.mes}
                </span>
                <span className="font-acme text-[#212121] text-3xl leading-none">
                  {e.dia}
                </span>
              </div>

              {/* Info */}
              <div className="flex flex-col justify-center">
                <span
                  className={`text-xs font-bold tracking-widest uppercase px-2 py-0.5 rounded-full self-start mb-2 ${tipoCor[e.tipo]}`}
                >
                  {e.tipo}
                </span>
                <h3 className="font-acme text-[#212121] text-base tracking-wide leading-tight mb-1">
                  {e.titulo}
                </h3>
                <p className="text-[#757575] text-xs">{e.horario}</p>
                <p className="text-[#9e9e9e] text-xs">{e.local}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-[#9e9e9e] text-sm mt-10">
          Acompanhe nossa agenda pelo{" "}
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
