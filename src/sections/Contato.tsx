export default function Contato() {
  return (
    <section id="contato" className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        {/* Cabeçalho */}
        <div className="text-center mb-16">
          <p className="text-[#c8a84b] text-sm font-semibold tracking-widest uppercase mb-2">
            Venha nos visitar
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a3a6c]">
            Como Chegar
          </h2>
          <div className="w-16 h-1 bg-[#c8a84b] mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Informações */}
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#1a3a6c] flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-[#1a3a6c] mb-1">Endereço</h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Praça Pio XII, 122<br />
                  Centro – Atibaia/SP<br />
                  CEP 12940-160
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#1a3a6c] flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-[#1a3a6c] mb-1">Telefone / WhatsApp</h4>
                <a
                  href="https://wa.me/5511916116102"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 text-sm hover:text-[#1a3a6c] transition-colors"
                >
                  (11) 91611-6102
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#1a3a6c] flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-[#1a3a6c] mb-1">Horários</h4>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>Terça · 19h30 – Culto de Ensino</li>
                  <li>Quarta · 09h00 – Consagração</li>
                  <li>Quarta · 15h00 – Círculo de Oração</li>
                  <li>Quinta · 19h30 – Culto Público</li>
                  <li>Domingo · 09h00 – Escola Bíblica</li>
                  <li>Domingo · 18h30 – Culto da Família</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Mapa embed */}
          <div className="rounded-2xl overflow-hidden shadow-md h-80 bg-gray-200">
            <iframe
              title="Localização AD Madureira Atibaia"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3664.3!2d-46.5567!3d-23.1171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cef8a6b1234567%3A0x1234567890abcdef!2sPra%C3%A7a%20Pio%20XII%2C%20122%20-%20Centro%2C%20Atibaia%20-%20SP%2C%2012940-160!5e0!3m2!1spt-BR!2sbr!4v1"
              width="100%"
              height="100%"
              className="border-0"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
