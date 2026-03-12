"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type MenuLink = {
  label: string;
  href: string;
};

type MenuItem =
  | {
      label: string;
      href: string;
      children?: undefined;
    }
  | {
      label: string;
      href?: undefined;
      children: MenuLink[];
    };

const menu: MenuItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Nossa Igreja",
    children: [
      { label: "História", href: "/historia" },
      { label: "Pastores", href: "/pastores" },
      { label: "Congregações", href: "/congregacoes" },
      { label: "Ministérios", href: "/ministerios" },
    ],
  },
  {
    label: "Conteúdo",
    children: [
      { label: "Mensagens", href: "/mensagens" },
      { label: "Vídeos", href: "/videos" },
      { label: "Testemunhos", href: "/testemunhos" },
    ],
  },
  {
    label: "Participe",
    children: [
      { label: "Programação", href: "/programacao" },
      { label: "Eventos", href: "/eventos" },
      { label: "Pedidos de oração", href: "/oracao" },
    ],
  },
  { label: "Contato", href: "/contato" },
  { label: "Oferta", href: "/oferta" },
];

function isDirectMenuItem(item: MenuItem): item is Extract<MenuItem, { href: string }> {
  return typeof item.href === "string";
}

function isLinkActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

function isMenuItemActive(pathname: string, item: MenuItem) {
  if (isDirectMenuItem(item)) {
    return isLinkActive(pathname, item.href);
  }

  return item.children.some((child) => isLinkActive(pathname, child.href));
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleMenu = () => {
    setMenuOpen((current) => !current);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 left-0 right-0 z-50">
      <div
        className={`border-b border-white/5 transition-all duration-300 ${
          scrolled
            ? "bg-[#111111]/92 backdrop-blur-md shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
            : "bg-[#111111]/86 backdrop-blur-md"
        }`}
      >
        <div
          className={`max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-[1fr_auto] xl:grid-cols-[1fr_auto_1fr] items-center transition-all duration-300 ${
            scrolled ? "h-16" : "h-20"
          }`}
        >
          <div className="hidden xl:block" />

          <nav className="hidden xl:flex items-center justify-center gap-8 2xl:gap-10">
            {menu.map((item) => {
              const active = isMenuItemActive(pathname, item);

              if (isDirectMenuItem(item)) {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`group/link relative font-acme text-[14px] 2xl:text-[15px] tracking-[0.16em] transition-colors duration-200 uppercase whitespace-nowrap ${
                      active
                        ? "text-[#ffa726]"
                        : "text-white/70 hover:text-[#ffa726]"
                    }`}
                  >
                    {item.label}
                    <span
                      className={`absolute left-0 -bottom-1 h-px bg-[#ffa726] transition-all duration-300 ${
                        active ? "w-full" : "w-0 group-hover/link:w-full"
                      }`}
                    />
                  </Link>
                );
              }

              return (
                <div key={item.label} className="relative group/menu">
                  <button
                    type="button"
                    className={`group/button relative font-acme inline-flex items-center gap-2 text-[14px] 2xl:text-[15px] tracking-[0.16em] transition-colors duration-200 uppercase whitespace-nowrap ${
                      active
                        ? "text-[#ffa726]"
                        : "text-white/70 hover:text-[#ffa726]"
                    }`}
                  >
                    {item.label}
                    <span className="text-[10px]">▾</span>
                    <span
                      className={`absolute left-0 -bottom-1 h-px bg-[#ffa726] transition-all duration-300 ${
                        active ? "w-full" : "w-0 group-hover/button:w-full"
                      }`}
                    />
                  </button>

                  <div className="pointer-events-none absolute left-0 top-full pt-4 opacity-0 invisible translate-y-2 transition-all duration-200 group-hover/menu:pointer-events-auto group-hover/menu:opacity-100 group-hover/menu:visible group-hover/menu:translate-y-0 group-focus-within/menu:pointer-events-auto group-focus-within/menu:opacity-100 group-focus-within/menu:visible group-focus-within/menu:translate-y-0">
                    <div className="min-w-56 rounded-xl border border-white/10 bg-[#171717]/98 p-3 shadow-[0_12px_36px_rgba(0,0,0,0.16)] backdrop-blur-md">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                            isLinkActive(pathname, child.href)
                              ? "text-[#ffa726] bg-white/6"
                              : "text-white/75 hover:text-[#ffa726] hover:bg-white/6"
                          }`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </nav>

          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              className="xl:hidden text-white p-2"
              onClick={toggleMenu}
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={menuOpen}
            >
              <div className="w-5 h-0.5 bg-white mb-1" />
              <div className="w-5 h-0.5 bg-white mb-1" />
              <div className="w-5 h-0.5 bg-white" />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="xl:hidden bg-[#121212] border-t border-white/10 px-4 py-4 space-y-5">
            {menu.map((item) => {
              if (isDirectMenuItem(item)) {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMenu}
                    className={`font-acme block text-base uppercase tracking-[0.16em] transition-colors ${
                      isMenuItemActive(pathname, item)
                        ? "text-[#ffa726]"
                        : "text-white/70 hover:text-[#ffa726]"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              }

              return (
                <div key={item.label}>
                  <p className="font-acme text-base uppercase tracking-[0.16em] text-white mb-2">
                    {item.label}
                  </p>
                  <div className="space-y-2 border-l border-white/10 pl-3">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={closeMenu}
                        className={`block text-base transition-colors ${
                          isLinkActive(pathname, child.href)
                            ? "text-[#ffa726]"
                            : "text-white/70 hover:text-[#ffa726]"
                        }`}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}

          </div>
        )}
      </div>
    </header>
  );
}
