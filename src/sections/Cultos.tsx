const cultos = [
  {
    dia: "Terça-feira",
    icone: "📖",
    horarios: [{ hora: "19h30", nome: "Culto de Ensino" }],
  },
  {
    dia: "Quarta-feira",
    icone: "🙏",
    horarios: [
      { hora: "09h00", nome: "Consagração" },
      { hora: "15h00", nome: "Círculo de Oração" },
    ],
  },
  {
    dia: "Quinta-feira",
    icone: "🕯️",
    horarios: [{ hora: "19h30", nome: "Culto Público" }],
  },
  {
    dia: "Domingo",
    icone: "☀️",
    horarios: [
      { hora: "09h00", nome: "Escola Bíblica Dominical" },
      { hora: "18h30", nome: "Culto da Família" },
    ],
  },
];

const eventosEspeciais = [
  { nome: "Santa Ceia", detalhe: "2º sábado do mês" },
  { nome: "Reunião de Obreiros", detalhe: "3º sábado do mês" },
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

        {/* Grid de cultos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {cultos.map((culto) => (
            <div
              key={culto.dia}
              className="bg-white rounded-2xl shadow-md p-6 border-t-4 border-[#1a3a6c] hover:shadow-lg transition-shadow"
            >
              <div className="text-3xl mb-3">{culto.icone}</div>
              <h3 className="text-[#1a3a6c] font-bold text-base mb-4">
                {culto.dia}
              </h3>
              <ul className="space-y-3">
                {culto.horarios.map((h) => (
                  <li key={h.hora} className="flex flex-col gap-1">
                    <span className="bg-[#1a3a6c] text-white text-xs font-bold px-3 py-1 rounded-full self-start">
                      {h.hora}
                    </span>
                    <span className="text-gray-500 text-sm">{h.nome}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Eventos especiais */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#c8a84b]/30 p-6 max-w-xl mx-auto text-center">
          <p className="text-[#c8a84b] text-xs font-semibold tracking-widest uppercase mb-4">
            Eventos Mensais
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {eventosEspeciais.map((e) => (
              <div key={e.nome}>
                <p className="text-[#1a3a6c] font-semibold text-sm">{e.nome}</p>
                <p className="text-gray-400 text-xs">{e.detalhe}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-gray-400 text-sm mt-8">
          Acompanhe também pelo nosso canal no{" "}
          <a
            href="https://www.youtube.com/@ADMadureiraAtibaia"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#1a3a6c] hover:underline font-medium"
          >
            YouTube
          </a>
        </p>
      </div>
    </section>
  );
}
