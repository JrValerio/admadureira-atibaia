export default function Hero() {
  return (
    <section
      id="inicio"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f2347] via-[#1a3a6c] to-[#2d5aa0] text-white relative overflow-hidden"
    >
      {/* Padrão decorativo de fundo */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full border-2 border-white" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full border border-white" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Versículo */}
        <p className="text-[#c8a84b] text-sm font-medium tracking-widest uppercase mb-6">
          Salmos 122:1
        </p>

        {/* Título principal */}
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
          Alegrei-me quando me
          <br />
          <span className="text-[#c8a84b]">disseram:</span> Vamos à Casa do Senhor
        </h1>

        {/* Subtítulo */}
        <p className="text-white/70 text-lg md:text-xl mb-10 max-w-xl mx-auto">
          Assembleia de Deus · Ministério Madureira
          <br />
          <span className="text-white font-medium">Campo de Atibaia</span>
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#cultos"
            className="bg-[#c8a84b] hover:bg-[#a8882b] text-white font-semibold px-8 py-3 rounded-full transition-colors duration-200 text-sm tracking-wide"
          >
            Horários de Culto
          </a>
          <a
            href="#contato"
            className="border border-white/40 hover:border-white text-white font-semibold px-8 py-3 rounded-full transition-colors duration-200 text-sm tracking-wide"
          >
            Como Chegar
          </a>
        </div>
      </div>

      {/* Seta para baixo */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-white/40"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </section>
  );
}
