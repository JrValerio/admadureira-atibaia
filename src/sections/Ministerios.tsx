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
          <p className="text-[#c8a84b] text-sm font-semibold tracking-widest uppercase mb-2">
            Departamentos
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a3a6c]">
            Ministérios
          </h2>
          <div className="w-16 h-1 bg-[#c8a84b] mx-auto mt-4" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {ministerios.map((min) => (
            <div
              key={min.nome}
              className="group p-6 rounded-xl border border-gray-100 hover:border-[#1a3a6c] hover:shadow-md transition-all duration-200 cursor-default"
            >
              <div className="text-3xl mb-3">{min.icone}</div>
              <h3 className="text-[#1a3a6c] font-bold text-base mb-1 group-hover:text-[#c8a84b] transition-colors">
                {min.nome}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {min.descricao}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
