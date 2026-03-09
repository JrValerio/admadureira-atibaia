const ministerios = [
  { nome: "Jovens", descricao: "Vida e propósito para a nova geração", icone: "🔥" },
  { nome: "Crianças", descricao: "Formando vidas desde a infância", icone: "🌱" },
  { nome: "Louvor", descricao: "Adoração em espírito e verdade", icone: "🎵" },
  { nome: "Intercessão", descricao: "A oração que move montanhas", icone: "🙏" },
  { nome: "Mulheres", descricao: "Fortaleza e dignidade em Cristo", icone: "👑" },
  { nome: "Homens", descricao: "Liderança com integridade", icone: "⚔️" },
];

export default function Ministerios() {
  return (
    <section id="ministerios" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* Cabeçalho */}
        <div className="text-center mb-16">
          <p className="text-[#ffa726] text-sm font-semibold tracking-widest uppercase mb-2">
            Departamentos
          </p>
          <h2 className="font-acme text-3xl md:text-4xl text-[#212121] tracking-wide">
            Ministérios
          </h2>
          <div className="w-16 h-1 bg-[#ffa726] mx-auto mt-4" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {ministerios.map((min) => (
            <div
              key={min.nome}
              className="group p-6 rounded-xl border border-gray-100 hover:border-[#ffa726] hover:shadow-md transition-all duration-200 cursor-default"
            >
              <div className="text-3xl mb-3">{min.icone}</div>
              <h3 className="font-acme text-[#212121] text-base mb-1 group-hover:text-[#ffa726] transition-colors tracking-wide">
                {min.nome}
              </h3>
              <p className="text-[#757575] text-sm leading-relaxed">
                {min.descricao}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
