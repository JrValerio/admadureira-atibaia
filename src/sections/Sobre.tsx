export default function Sobre() {
  return (
    <section id="sobre" className="py-24 bg-[#1a3a6c] text-white">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Texto */}
        <div>
          <p className="text-[#c8a84b] text-sm font-semibold tracking-widest uppercase mb-2">
            Quem somos
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Nossa Igreja
          </h2>
          <div className="w-16 h-1 bg-[#c8a84b] mb-6" />
          <p className="text-white/80 text-base leading-relaxed mb-4">
            A Assembleia de Deus Ministério Madureira em Atibaia é uma comunidade
            de fé comprometida com o evangelho de Jesus Cristo, servindo à cidade
            e região há décadas.
          </p>
          <p className="text-white/80 text-base leading-relaxed">
            Somos parte do Ministério Madureira, um dos maiores movimentos
            pentecostais do Brasil, fundado com o propósito de levar a Palavra
            de Deus a cada família.
          </p>
        </div>

        {/* Valores */}
        <div className="grid grid-cols-1 gap-6">
          {[
            { titulo: "Missão", texto: "Evangelizar e discipular nações para Cristo" },
            { titulo: "Visão", texto: "Ser uma igreja viva e transformadora na cidade de Atibaia" },
            { titulo: "Valores", texto: "Fé, família, comunidade e serviço ao próximo" },
          ].map((item) => (
            <div
              key={item.titulo}
              className="border border-white/20 rounded-xl p-6 hover:border-[#c8a84b] transition-colors"
            >
              <h3 className="text-[#c8a84b] font-bold text-sm tracking-widest uppercase mb-2">
                {item.titulo}
              </h3>
              <p className="text-white/80 text-sm leading-relaxed">{item.texto}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
