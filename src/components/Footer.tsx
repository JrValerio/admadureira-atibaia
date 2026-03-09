export default function Footer() {
  return (
    <footer className="bg-[#0f2347] text-white/70 py-10">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Identidade */}
        <div>
          <p className="text-[#c8a84b] font-bold text-sm tracking-widest uppercase mb-2">
            Assembleia de Deus
          </p>
          <p className="text-white font-semibold text-sm mb-1">
            Ministério Madureira
          </p>
          <p className="text-white/60 text-sm">Campo de Atibaia</p>
        </div>

        {/* Endereço */}
        <div>
          <h4 className="text-white font-semibold text-sm mb-2">Endereço</h4>
          <p className="text-sm leading-relaxed">
            Praça Pio XII, 122
            <br />
            Centro – Atibaia/SP
          </p>
        </div>

        {/* Cultos */}
        <div>
          <h4 className="text-white font-semibold text-sm mb-2">Cultos</h4>
          <ul className="text-sm space-y-1">
            <li>Domingo · 9h e 18h</li>
            <li>Quarta · 19h30</li>
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-8 pt-6 border-t border-white/10 text-center text-xs text-white/40">
        © {new Date().getFullYear()} AD Madureira Atibaia · Todos os direitos reservados
      </div>
    </footer>
  );
}
