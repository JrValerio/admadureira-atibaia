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
    <section id="cultos" className="py-24 bg-[#f5f5f5]">
      <div className="max-w-6xl mx-auto px-4">
        {/* Cabeçalho */}
        <div className="text-center mb-16">
          <p className="text-[#ffa726] text-sm font-semibold tracking-widest uppercase mb-2">
            Programação
          </p>
          <h2 className="font-acme text-3xl md:text-4xl text-[#212121] tracking-wide">
            Horários de Culto
          </h2>
          <div className="w-16 h-1 bg-[#ffa726] mx-auto mt-4" />
        </div>

        {/* Grid de cultos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {cultos.map((culto) => (
            <div
              key={culto.dia}
              className="bg-white rounded-2xl shadow-md p-6 border-t-4 border-[#ffa726] hover:shadow-lg transition-shadow"
            >
              <div className="text-3xl mb-3">{culto.icone}</div>
              <h3 className="font-acme text-[#212121] text-base mb-4 tracking-wide">
                {culto.dia}
              </h3>
              <ul className="space-y-3">
                {culto.horarios.map((h) => (
                  <li key={h.hora} className="flex flex-col gap-1">
                    <span className="bg-[#ffa726] text-[#212121] text-xs font-bold px-3 py-1 rounded-full self-start">
                      {h.hora}
                    </span>
                    <span className="text-[#424242] text-sm">{h.nome}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Eventos especiais */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#ffa726]/40 p-6 max-w-xl mx-auto text-center">
          <p className="text-[#ffa726] text-xs font-semibold tracking-widest uppercase mb-4">
            Eventos Mensais
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {eventosEspeciais.map((e) => (
              <div key={e.nome}>
                <p className="text-[#212121] font-semibold text-sm">{e.nome}</p>
                <p className="text-[#757575] text-xs">{e.detalhe}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-[#9e9e9e] text-sm mt-8">
          Acompanhe também pelo nosso canal no{" "}
          <a
            href="https://www.youtube.com/@ADMadureiraAtibaia"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#ef5350] hover:underline font-semibold"
          >
            YouTube
          </a>
        </p>
      </div>
    </section>
  );
}
