const cultos = [
  {
    dia: "Domingo",
    horarios: [
      { hora: "09h00", nome: "Escola Bíblica Dominical" },
      { hora: "18h00", nome: "Culto da Família" },
    ],
    icone: "☀️",
  },
  {
    dia: "Quarta-feira",
    horarios: [{ hora: "19h30", nome: "Culto de Ensino e Oração" }],
    icone: "🕯️",
  },
];

export default function Cultos() {
  return (
    <section id="cultos" className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        {/* Cabeçalho */}
        <div className="text-center mb-16">
          <p className="text-[#c8a84b] text-sm font-semibold tracking-widest uppercase mb-2">
            Programação
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a3a6c]">
            Horários de Culto
          </h2>
          <div className="w-16 h-1 bg-[#c8a84b] mx-auto mt-4" />
        </div>

        {/* Cards de culto */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {cultos.map((culto) => (
            <div
              key={culto.dia}
              className="bg-white rounded-2xl shadow-md p-8 border-t-4 border-[#1a3a6c] hover:shadow-lg transition-shadow"
            >
              <div className="text-3xl mb-3">{culto.icone}</div>
              <h3 className="text-[#1a3a6c] font-bold text-xl mb-4">
                {culto.dia}
              </h3>
              <ul className="space-y-3">
                {culto.horarios.map((h) => (
                  <li key={h.hora} className="flex items-start gap-3">
                    <span className="bg-[#1a3a6c] text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                      {h.hora}
                    </span>
                    <span className="text-gray-600 text-sm pt-0.5">
                      {h.nome}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Nota sobre transmissão */}
        <p className="text-center text-gray-400 text-sm mt-10">
          Acompanhe também pelo nosso canal no YouTube
        </p>
      </div>
    </section>
  );
}
