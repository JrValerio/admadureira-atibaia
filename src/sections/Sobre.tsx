const valores = [
  {
    titulo: "Missão",
    texto:
      "Anunciar o evangelho de Jesus Cristo e formar discípulos comprometidos com a Palavra de Deus.",
  },
  {
    titulo: "Visão",
    texto:
      "Ser uma igreja relevante para a cidade de Atibaia, impactando vidas por meio do amor, da fé e do serviço cristão.",
  },
  {
    titulo: "Valores",
    texto:
      "Fé na Palavra de Deus, família, comunhão, evangelização e serviço ao próximo.",
  },
];

export default function Sobre() {
  return (
    <section id="sobre" className="py-24 bg-[#1a3a6c] text-white">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Texto institucional */}
        <div>
          <p className="text-[#c8a84b] text-sm font-semibold tracking-widest uppercase mb-2">
            Quem somos
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Nossa Igreja</h2>
          <p className="text-[#c8a84b] text-sm mb-6">Fundada em 31 de janeiro de 1977</p>
          <div className="w-16 h-1 bg-[#c8a84b] mb-6" />
          <p className="text-white/80 text-base leading-relaxed mb-4">
            A Igreja Evangélica Assembleia de Deus Ministério Madureira – Campo
            de Atibaia é uma comunidade cristã comprometida com a pregação do
            evangelho de Jesus Cristo, com a edificação espiritual das famílias
            e com o serviço à sociedade.
          </p>
          <p className="text-white/80 text-base leading-relaxed">
            Fundada em 31 de janeiro de 1977, a igreja tem sido um instrumento
            de fé, esperança e transformação na cidade de Atibaia e região.
            Somos parte do Ministério Madureira, um dos maiores movimentos
            pentecostais do Brasil, dedicado à evangelização, discipulado e ação
            social.
          </p>
        </div>

        {/* Cards de missão/visão/valores */}
        <div className="grid grid-cols-1 gap-6">
          {valores.map((item) => (
            <div
              key={item.titulo}
              className="border border-white/20 rounded-xl p-6 hover:border-[#c8a84b] transition-colors"
            >
              <h3 className="text-[#c8a84b] font-bold text-sm tracking-widest uppercase mb-2">
                {item.titulo}
              </h3>
              <p className="text-white/80 text-sm leading-relaxed">
                {item.texto}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
