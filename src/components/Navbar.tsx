"use client";

import { useState } from "react";
import Image from "next/image";

const navLinks = [
  { label: "Início", href: "#inicio" },
  { label: "Cultos", href: "#cultos" },
  { label: "Ministérios", href: "#ministerios" },
  { label: "Sobre", href: "#sobre" },
  { label: "Contato", href: "#contato" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Barra superior laranja */}
      <div className="bg-[#ffa726] py-1 px-4 text-center">
        <p className="text-[#212121] text-xs font-semibold tracking-widest uppercase">
          Venha fazer parte desta família · (11) 91611-6102
        </p>
      </div>

      {/* Navbar principal */}
      <div className="bg-[#212121] shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between">
          {/* Logo + nome */}
          <div className="flex items-center gap-3">
            <Image
              src="/logo.jpg"
              alt="AD Madureira Atibaia"
              width={48}
              height={48}
              className="rounded-full"
            />
            <div className="leading-tight">
              <p className="font-acme text-[#ffa726] font-bold text-xs tracking-widest uppercase">
                Assembleia de Deus
              </p>
              <p className="text-white/70 text-xs">
                Ministério Madureira · Atibaia
              </p>
            </div>
          </div>

          {/* Links desktop */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-acme text-white/70 hover:text-[#ffa726] text-sm tracking-wider transition-colors duration-200 uppercase"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Hamburger mobile */}
          <button
            type="button"
            className="md:hidden text-white p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen ? "true" : "false"}
          >
            <div className="w-5 h-0.5 bg-white mb-1" />
            <div className="w-5 h-0.5 bg-white mb-1" />
            <div className="w-5 h-0.5 bg-white" />
          </button>
        </div>

        {/* Menu mobile */}
        {menuOpen && (
          <div className="md:hidden bg-[#1a1a1a] px-4 pb-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-acme block text-white/70 hover:text-[#ffa726] py-2 text-sm uppercase tracking-wider border-b border-white/10 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
