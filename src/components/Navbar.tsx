"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const desktopNavLinks = [
  { label: "Início", href: "/" },
  { label: "Sobre", href: "/sobre" },
  { label: "Congregações", href: "/congregacoes" },
  { label: "Ministérios", href: "/ministerios" },
  { label: "Programação", href: "/programacao" },
  { label: "Eventos", href: "/eventos" },
  { label: "Contato", href: "/contato" },
];

const resourceLinks = [
  {
    label: "Mensagens",
    href: "/mensagens",
    description: "Sermões e ensino bíblico da semana.",
  },
  {
    label: "Testemunhos",
    href: "/testemunhos",
    description: "Histórias reais de fé e transformação.",
  },
  {
    label: "Vídeos",
    href: "/videos",
    description: "Cultos, transmissões e destaques do canal.",
  },
  {
    label: "Oração",
    href: "/oracao",
    description: "Pedidos de oração e apoio pastoral.",
  },
];

const mobileNavLinks = [
  ...desktopNavLinks.slice(0, 4),
  ...resourceLinks.map(({ label, href }) => ({ label, href })),
  ...desktopNavLinks.slice(4),
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isResourceRoute = resourceLinks.some((link) => pathname === link.href);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fecha menu ao trocar de página
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Topbar — some ao rolar */}
      <div
        className={`bg-[#ffa726] transition-all duration-300 overflow-hidden ${
          scrolled ? "max-h-0 py-0" : "max-h-10 py-1"
        }`}
      >
        <p className="text-[#212121] text-xs font-semibold tracking-widest uppercase text-center px-4">
          Venha fazer parte desta família · (11) 91611-6102
        </p>
      </div>

      {/* Navbar principal */}
      <div
        className={`transition-all duration-300 ${
          scrolled
            ? "bg-[#212121]/95 backdrop-blur-sm shadow-xl"
            : "bg-[#212121]"
        }`}
      >
        <div
          className={`max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between gap-8 md:gap-10 transition-all duration-300 ${
            scrolled ? "py-3.5" : "py-5 md:py-6"
          }`}
        >
          {/* Logo + nome */}
          <Link
            href="/"
            className="flex flex-col items-center justify-center text-center shrink-0 min-w-[160px] md:min-w-[230px]"
          >
            <Image
              src="/logo.jpg"
              alt="AD Madureira Atibaia"
              width={scrolled ? 52 : 74}
              height={scrolled ? 52 : 74}
              className="rounded-full transition-all duration-300 mb-3"
            />
            <div className="leading-tight">
              <p className="font-script text-[#f7dcb0] text-[1.7rem] md:text-[2.35rem] leading-none">
                Assembleia de Deus
              </p>
              <p className="text-white/70 text-[10px] md:text-[11px] tracking-[0.32em] uppercase mt-1.5">
                Ministério Madureira
              </p>
              <p className="text-white/80 text-xs md:text-sm mt-1">
                Campo de Atibaia
              </p>
            </div>
          </Link>

          {/* Links desktop */}
          <nav className="hidden xl:flex flex-1 items-center justify-end gap-3 2xl:gap-5 ml-10">
            {desktopNavLinks.slice(0, 4).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-acme text-[11px] 2xl:text-sm tracking-wider transition-colors duration-200 uppercase whitespace-nowrap ${
                  pathname === link.href
                    ? "text-[#ffa726]"
                    : "text-white/70 hover:text-[#ffa726]"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="relative group/menu">
              <button
                type="button"
                className={`font-acme inline-flex items-center gap-2 text-[11px] 2xl:text-sm tracking-wider transition-colors duration-200 uppercase whitespace-nowrap ${
                  isResourceRoute
                    ? "text-[#ffa726]"
                    : "text-white/70 hover:text-[#ffa726]"
                }`}
              >
                Recursos
                <span className="text-xs">▾</span>
              </button>

              <div className="pointer-events-none absolute right-0 top-full pt-5 opacity-0 invisible translate-y-2 transition-all duration-200 group-hover/menu:pointer-events-auto group-hover/menu:opacity-100 group-hover/menu:visible group-hover/menu:translate-y-0 group-focus-within/menu:pointer-events-auto group-focus-within/menu:opacity-100 group-focus-within/menu:visible group-focus-within/menu:translate-y-0">
                <div className="ui-menu-panel w-[31rem] p-5">
                  <div className="mb-4">
                    <p className="text-[#ef5350] text-[11px] font-semibold tracking-[0.24em] uppercase mb-2">
                      Recursos da comunidade
                    </p>
                    <p className="text-[#5f5f5f] text-sm leading-relaxed">
                      Conteúdo espiritual, acompanhamento e materiais da vida da igreja.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {resourceLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="ui-menu-box"
                      >
                        <p className="font-acme text-lg text-[#212121] tracking-wide mb-1">
                          {link.label}
                        </p>
                        <p className="text-[#5f5f5f] text-sm leading-relaxed">
                          {link.description}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {desktopNavLinks.slice(4).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-acme text-[11px] 2xl:text-sm tracking-wider transition-colors duration-200 uppercase whitespace-nowrap ${
                  pathname === link.href
                    ? "text-[#ffa726]"
                    : "text-white/70 hover:text-[#ffa726]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Hamburger mobile */}
          <button
            type="button"
            className="xl:hidden text-white p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          >
            <div className="w-5 h-0.5 bg-white mb-1" />
            <div className="w-5 h-0.5 bg-white mb-1" />
            <div className="w-5 h-0.5 bg-white" />
          </button>
        </div>

        {/* Menu mobile */}
        {menuOpen && (
          <div className="xl:hidden bg-[#1a1a1a] px-4 pb-4">
            {mobileNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-acme block py-2 text-sm uppercase tracking-wider border-b border-white/10 transition-colors ${
                  pathname === link.href
                    ? "text-[#ffa726]"
                    : "text-white/70 hover:text-[#ffa726]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
