import Link from "next/link";
import Image from "next/image";

const linksInstitucionais = [
  { label: "A Igreja", href: "/sobre" },
  { label: "Nossos Pastores", href: "/pastores" },
  { label: "Ministérios", href: "/ministerios" },
  { label: "Programação", href: "/programacao" },
  { label: "Eventos", href: "/eventos" },
  { label: "Mensagens", href: "/mensagens" },
  { label: "Contato", href: "/contato" },
];

const horariosResumidos = [
  "Segunda a Sexta — 06:00 / 07:00",
  "Terça — 19:30",
  "Quinta — 19:30",
  "Sexta — 14:30",
  "Domingo — 09:00 / 18:30",
];

const MAPS_URL = "https://maps.google.com/?q=Pra%C3%A7a%20Pio%20XII%2C%20122%20Atibaia%20SP";

const redes = [
  {
    nome: "TikTok",
    href: "https://www.tiktok.com/@midia.ad.madureira",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M14.5 3c.27 1.58 1.26 3 2.66 3.92A6.6 6.6 0 0 0 21 8v2.72a9.48 9.48 0 0 1-4.5-1.1v5.7a6.12 6.12 0 1 1-6.12-6.12c.32 0 .64.03.95.08v2.8a3.44 3.44 0 1 0 2.17 3.24V3h1z" />
      </svg>
    ),
  },
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
    nome: "Facebook Sede",
    href: "https://www.facebook.com/ADMadureiraSedeAtibaia/",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    nome: "Facebook Atibaia",
    href: "https://www.facebook.com/ADMadureiraAtibaiaSede",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#111111] text-white/65">
      <div className="max-w-7xl mx-auto grid gap-10 px-6 py-16 md:grid-cols-2 xl:grid-cols-4">
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <Image
              src="/logo-circle.png"
              alt="Logo AD Madureira Atibaia"
              width={76}
              height={76}
              className="drop-shadow-[0_10px_24px_rgba(0,0,0,0.24)]"
            />
            <div className="space-y-1">
              <p className="font-acme text-sm tracking-[0.22em] text-[#ffa726] uppercase">
                Assembleia de Deus
              </p>
              <p className="text-base font-semibold text-white">Ministério Madureira</p>
              <p className="text-sm text-white/70">Campo de Atibaia</p>
              <p className="pt-2 text-xs text-white/35">CNPJ: 48.644.074/0001-97</p>
            </div>
          </div>

          <div className="space-y-2 text-sm leading-relaxed">
            <p className="font-acme text-sm tracking-[0.22em] text-white uppercase">
              Liderança Pastoral
            </p>
            <Link
              href="/pastores/zacarias-bernardes-felix"
              className="block text-white/80 transition-colors hover:text-[#ffa726]"
            >
              Pr. Dr. Zacarias Bernardes Félix
            </Link>
            <Link
              href="/pastores/anna-alzira"
              className="block text-white/80 transition-colors hover:text-[#ffa726]"
            >
              Pra. Drª Anna Alzira
            </Link>
          </div>
        </div>

        <div>
          <h4 className="mb-4 font-acme text-sm tracking-[0.22em] text-white uppercase">
            Institucional
          </h4>
          <ul className="space-y-3 text-sm">
            {linksInstitucionais.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="transition-colors hover:text-[#ffa726]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-acme text-sm tracking-[0.22em] text-white uppercase">
            Endereço
          </h4>
          <div className="space-y-3 text-sm leading-relaxed">
            <p>
              Praça Pio XII, 122
              <br />
              Centro – Atibaia/SP
              <br />
              CEP 12940-160
            </p>
            <a
              href="https://wa.me/5511916116102"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-[#ffa726] transition-colors hover:text-[#ffd54f]"
            >
              (11) 91611-6102
            </a>
            <div className="space-y-2 pt-1">
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-white/70 transition-colors hover:text-white"
              >
                Ver no Google Maps
              </a>
              <Link
                href="/contato"
                className="block text-white/70 transition-colors hover:text-white"
              >
                Como chegar
              </Link>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <h4 className="mb-4 font-acme text-sm tracking-[0.22em] text-white uppercase">
              Horários de Culto
            </h4>
            <ul className="space-y-3 text-sm leading-relaxed">
              {horariosResumidos.map((horario) => (
                <li key={horario} className="border-b border-white/6 pb-2 last:border-b-0 last:pb-0">
                  {horario}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-7">
          <div className="text-center text-[#f2d4a0]">
            <p className="text-lg leading-relaxed md:text-[1.55rem]">
              &quot;Até aqui nos ajudou o Senhor.&quot;
            </p>
            <p className="mt-2 text-xs tracking-[0.16em] uppercase text-white/40">
              1 Samuel 7:12
            </p>
          </div>

          <div className="mt-6 flex flex-col items-center gap-4">
            <p className="font-acme text-sm tracking-[0.22em] text-white uppercase">
              Siga-nos
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              {redes.map((rede) => (
                <a
                  key={rede.nome}
                  href={rede.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={rede.nome}
                  title={rede.nome}
                  className="group inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/75 transition-colors hover:border-[#ffa726]/60 hover:bg-[#ffa726] hover:text-[#111]"
                >
                  {rede.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 text-center text-xs text-white/35">
          © {new Date().getFullYear()} Igreja Assembleia de Deus – Ministério Madureira | Campo de Atibaia. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
