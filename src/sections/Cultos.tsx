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
    <section id="cultos" className="ui-section bg-[#f7f6f2]">
      <div className="ui-section-container">
        {/* Cabeçalho */}
        <div className="text-center mb-16">
          <p className="ui-section-eyebrow ui-section-eyebrow--gold">
            Programação
          </p>
          <h2 className="ui-section-title">
            Horários de Culto
          </h2>
          <div className="w-16 h-1 bg-[#ffa726] mx-auto mt-4" />
        </div>

        {/* Grid de cultos */}
        <div className="ui-card-grid ui-card-grid--4lg mb-12">
          {cultos.map((culto) => (
            <div
              key={culto.dia}
              className="ui-card p-6 border-t-4 border-[#ffa726]"
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
        <div className="ui-card border border-[#ffa726]/30 p-6 max-w-xl mx-auto text-center">
          <p className="ui-section-eyebrow ui-section-eyebrow--gold mb-4">
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
