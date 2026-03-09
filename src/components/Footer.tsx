import Image from "next/image";

const redes = [
  {
    nome: "Instagram",
    href: "https://www.instagram.com/admadureira_atibaia/",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    nome: "YouTube",
    href: "https://www.youtube.com/@ADMadureiraAtibaia",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    nome: "Facebook",
    href: "https://www.facebook.com/ADMadureiraAtibaiaSede",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    nome: "Linktree",
    href: "https://linktr.ee/admadureira_atibaia",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M7.953 15.066c-.08.163-.08.324-.08.486.08.517.528.89 1.052.89h6.15c.525 0 .972-.374 1.052-.89 0-.162 0-.323-.08-.486L13.554 9.5h2.59L12 2 7.856 9.5h2.59l-2.493 5.566zm8.047 3.982H8c-.553 0-1 .448-1 1s.447 1 1 1h8c.553 0 1-.448 1-1s-.447-1-1-1z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white/60 py-12">
      {/* Barra laranja no topo */}
      <div className="h-1 bg-[#ffa726] w-full mb-12" />

      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Logo + identidade */}
        <div className="flex flex-col items-start gap-3">
          <Image
            src="/logo.jpg"
            alt="Logo AD Madureira Atibaia"
            width={72}
            height={72}
            className="rounded-full"
          />
          <div>
            <p className="font-acme text-[#ffa726] text-sm tracking-widest uppercase">
              Assembleia de Deus
            </p>
            <p className="text-white text-sm font-semibold">Ministério Madureira</p>
            <p className="text-white/50 text-xs">Campo de Atibaia – SP</p>
            <p className="text-white/30 text-xs mt-1">CNPJ: 48.644.074/0001-97</p>
          </div>
        </div>

        {/* Endereço */}
        <div>
          <h4 className="font-acme text-white text-sm tracking-widest uppercase mb-3">
            Endereço
          </h4>
          <p className="text-sm leading-relaxed mb-2">
            Praça Pio XII, 122<br />
            Centro – Atibaia/SP<br />
            CEP 12940-160
          </p>
          <a
            href="https://wa.me/5511916116102"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#ffa726] hover:text-[#ffd54f] text-sm transition-colors"
          >
            (11) 91611-6102
          </a>
        </div>

        {/* Redes sociais */}
        <div>
          <h4 className="font-acme text-white text-sm tracking-widest uppercase mb-4">
            Redes Sociais
          </h4>
          <div className="flex flex-wrap gap-3">
            {redes.map((rede) => (
              <a
                key={rede.nome}
                href={rede.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={rede.nome}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#ffa726] hover:text-[#212121] text-white flex items-center justify-center transition-colors duration-200"
              >
                {rede.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-10 pt-6 border-t border-white/10 text-center text-xs text-white/30">
        © {new Date().getFullYear()} AD Madureira Atibaia · Todos os direitos reservados
      </div>
    </footer>
  );
}
