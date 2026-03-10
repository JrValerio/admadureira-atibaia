"use client";

import { useState, useEffect } from "react";
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
  { label: "Mensagens", href: "/mensagens" },
  { label: "Testemunhos", href: "/testemunhos" },
  { label: "Vídeos", href: "/videos" },
  { label: "Oração", href: "/oracao" },
];

const mobileNavLinks = [...desktopNavLinks, ...resourceLinks];

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
    <header className="sticky top-0 left-0 right-0 z-50">
      <div
        className={`border-b border-white/10 transition-all duration-300 ${
          scrolled
            ? "bg-[#111111]/92 backdrop-blur-md shadow-xl"
            : "bg-[#111111]/86 backdrop-blur-md"
        }`}
      >
        <div
          className={`max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-end xl:justify-center transition-all duration-300 ${
            scrolled ? "h-16" : "h-20"
          }`}
        >
          {/* Links desktop */}
          <nav className="hidden xl:flex items-center justify-center gap-5 2xl:gap-7">
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

              <div className="pointer-events-none absolute left-0 top-full pt-4 opacity-0 invisible translate-y-2 transition-all duration-200 group-hover/menu:pointer-events-auto group-hover/menu:opacity-100 group-hover/menu:visible group-hover/menu:translate-y-0 group-focus-within/menu:pointer-events-auto group-focus-within/menu:opacity-100 group-focus-within/menu:visible group-focus-within/menu:translate-y-0">
                <div className="min-w-52 rounded-xl border border-white/10 bg-[#171717]/98 p-3 shadow-2xl backdrop-blur-md">
                  {resourceLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                        pathname === link.href
                          ? "text-[#ffa726] bg-white/6"
                          : "text-white/75 hover:text-[#ffa726] hover:bg-white/6"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
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
          <div className="xl:hidden bg-[#121212] border-t border-white/10 px-4 pb-4">
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
