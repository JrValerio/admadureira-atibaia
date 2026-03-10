"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Início", href: "/" },
  { label: "Sobre", href: "/sobre" },
  { label: "Congregações", href: "/congregacoes" },
  { label: "Ministérios", href: "/ministerios" },
  { label: "Mensagens", href: "/mensagens" },
  { label: "Testemunhos", href: "/testemunhos" },
  { label: "Programação", href: "/programacao" },
  { label: "Eventos", href: "/eventos" },
  { label: "Vídeos", href: "/videos" },
  { label: "Oração", href: "/oracao" },
  { label: "Contato", href: "/contato" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

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
            {navLinks.map((link) => (
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
            {navLinks.map((link) => (
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
