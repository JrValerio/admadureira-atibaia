import Link from "next/link";
import Image from "next/image";

const linksPrimeirosPassos = [
  { label: "Programação", href: "/programacao" },
  { label: "Eventos", href: "/eventos" },
  { label: "Mensagens", href: "/mensagens" },
  { label: "Pedido de oração", href: "/oracao" },
  { label: "Contato", href: "/contato" },
  { label: "Dízimos e ofertas", href: "/oferta" },
];

const linksIgreja = [
  { label: "Sobre a Igreja", href: "/sobre" },
  { label: "Nossa História", href: "/historia" },
  { label: "Nossos Pastores", href: "/pastores" },
  { label: "Congregações", href: "/congregacoes" },
  { label: "Ministérios", href: "/ministerios" },
];

const horariosResumidos = [
  "Segunda a Sexta — 06:00 / 07:00",
  "Segunda — 19:30",
  "Terça — 19:30",
  "Quarta — 09:00 / 15:00 / 19:00",
  "Quinta — 19:30",
  "Sexta — 14:30",
  "Domingo — 08:00 / 09:00 / 11:00 / 18:30",
];

const descricaoInstitucional =
  "Uma igreja comprometida com a Palavra de Deus, a oração e a transformação de vidas.";

const versiculoFooter = {
  texto: "Eu e a minha casa serviremos ao Senhor.",
  referencia: "Josué 24:15",
};

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
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#111111] text-white/65">
      <div className="ui-page-container ui-page-container--footer grid gap-6 py-8 md:grid-cols-[minmax(0,0.96fr)_minmax(0,1.04fr)] md:items-start md:gap-8 md:py-14 xl:grid-cols-[1.2fr_0.8fr_0.95fr_0.95fr] xl:gap-10">
        <div className="flex flex-col items-center text-center space-y-4 md:max-w-sm md:items-start md:text-left md:space-y-6">
          <div className="flex flex-col items-center gap-3 md:flex-row md:items-start md:gap-4">
            <Image
              src="/logo-transparent.png"
              alt="Logo AD Madureira Atibaia"
              width={76}
              height={76}
              className="drop-shadow-[0_10px_24px_rgba(0,0,0,0.24)]"
              style={{ width: "auto", height: "auto" }}
            />
            <div className="space-y-1">
              <p className="text-base font-semibold leading-snug text-white">
                Igreja Assembleia de Deus - Ministério Madureira
              </p>
              <p className="font-acme text-sm tracking-[0.22em] text-[#ffa726] uppercase">
                Campo de Atibaia
              </p>
            </div>
          </div>

          <p className="max-w-xs text-xs leading-relaxed text-white/58">
            {descricaoInstitucional}
          </p>

          <blockquote className="max-w-sm border-l border-[#ffa726]/40 pl-4 text-left text-sm leading-relaxed text-white/82">
            <p>&quot;{versiculoFooter.texto}&quot;</p>
            <footer className="mt-2 text-[11px] tracking-[0.16em] uppercase text-white/45">
              {versiculoFooter.referencia}
            </footer>
          </blockquote>

          <div className="flex flex-wrap justify-center gap-3 pt-0.5 md:justify-start">
            {redes.map((rede) => (
              <a
                key={rede.nome}
                href={rede.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={rede.nome}
                title={rede.nome}
                className="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/75 transition-colors hover:border-[#ffa726]/60 hover:bg-[#ffa726] hover:text-[#111]"
              >
                {rede.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="space-y-5 text-center md:hidden">
          <div>
            <h4 className="mb-3 font-acme text-sm tracking-[0.22em] text-white uppercase">
              Primeiros passos
            </h4>
            <ul className="space-y-2.5 text-sm">
              {linksPrimeirosPassos.map((link) => (
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

          <details className="group mx-auto max-w-xs text-center [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer list-none items-center justify-center gap-2 font-acme text-sm tracking-[0.22em] text-white uppercase">
              A Igreja
              <span className="text-[10px] text-white/45">▾</span>
            </summary>
            <ul className="mt-3 space-y-2.5 text-sm">
              {linksIgreja.map((link) => (
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
          </details>
        </div>

        <div className="hidden md:grid md:grid-cols-2 md:gap-6 md:text-left xl:hidden">
          <div className="space-y-6">
            <div>
              <h4 className="mb-4 font-acme text-sm tracking-[0.22em] text-white uppercase">
                Primeiros passos
              </h4>
              <ul className="space-y-3 text-sm">
                {linksPrimeirosPassos.map((link) => (
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
                A Igreja
              </h4>
              <ul className="space-y-3 text-sm">
                {linksIgreja.map((link) => (
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
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="mb-4 font-acme text-sm tracking-[0.22em] text-white uppercase">
                Endereço
              </h4>
              <div className="space-y-3 text-sm leading-relaxed">
                <p>
                  Praça Pio XII, 122
                  <br />
                  Centro - Atibaia/SP
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

            <div>
              <h4 className="mb-4 font-acme text-sm tracking-[0.22em] text-white uppercase">
                Horários de Culto
              </h4>
              <ul className="space-y-4 text-sm leading-relaxed">
                {horariosResumidos.map((horario) => (
                  <li key={horario}>
                    {horario}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="hidden space-y-8 xl:block xl:text-left">
          <div>
            <h4 className="mb-4 font-acme text-sm tracking-[0.22em] text-white uppercase">
              Primeiros passos
            </h4>
            <ul className="space-y-3 text-sm">
              {linksPrimeirosPassos.map((link) => (
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
              A Igreja
            </h4>
            <ul className="space-y-3 text-sm">
              {linksIgreja.map((link) => (
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
        </div>

        <div className="space-y-6 text-center md:hidden xl:block xl:space-y-8 xl:text-left">
          <div>
            <h4 className="mb-3 font-acme text-sm tracking-[0.22em] text-white uppercase md:mb-4">
              Endereço
            </h4>
            <div className="space-y-3 text-sm leading-relaxed">
              <p>
                Praça Pio XII, 122
                <br />
                Centro - Atibaia/SP
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
        </div>

        <div className="hidden xl:block">
          <h4 className="mb-4 font-acme text-sm tracking-[0.22em] text-white uppercase">
            Horários de Culto
          </h4>
          <ul className="space-y-4 text-sm leading-relaxed">
            {horariosResumidos.map((horario) => (
              <li key={horario}>
                {horario}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="ui-page-container ui-page-container--footer py-4 text-center text-xs text-white/35 md:py-5">
          <p>
            © {new Date().getFullYear()} Igreja Assembleia de Deus - Ministério
            Madureira | Campo de Atibaia. Todos os direitos reservados.
          </p>
          <p className="mt-1.5 md:mt-2">CNPJ: 48.644.074/0001-97</p>
        </div>
      </div>
    </footer>
  );
}
