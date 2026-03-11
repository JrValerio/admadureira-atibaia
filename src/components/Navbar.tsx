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
      { label: "Eventos", href: "/eventos" },
      { label: "Pedidos de oração", href: "/oracao" },
    ],
  },
  { label: "Contato", href: "/contato" },
];

const ofertaLink: MenuLink = {
  label: "Oferta",
  href: "/oferta",
};

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
        className={`border-b border-white/10 transition-all duration-300 ${
          scrolled
            ? "bg-[#111111]/92 backdrop-blur-md shadow-xl"
            : "bg-[#111111]/86 backdrop-blur-md"
        }`}
      >
        <div
          className={`max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-[1fr_auto] xl:grid-cols-[1fr_auto_1fr] items-center transition-all duration-300 ${
            scrolled ? "h-16" : "h-20"
          }`}
        >
          <div className="hidden xl:block" />

          <nav className="hidden xl:flex items-center justify-center gap-5 2xl:gap-7">
            {menu.map((item) => {
              const active = isMenuItemActive(pathname, item);

              if (isDirectMenuItem(item)) {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`font-acme text-[11px] 2xl:text-sm tracking-wider transition-colors duration-200 uppercase whitespace-nowrap ${
                      active
                        ? "text-[#ffa726]"
                        : "text-white/70 hover:text-[#ffa726]"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              }

              return (
                <div key={item.label} className="relative group/menu">
                  <button
                    type="button"
                    className={`font-acme inline-flex items-center gap-2 text-[11px] 2xl:text-sm tracking-wider transition-colors duration-200 uppercase whitespace-nowrap ${
                      active
                        ? "text-[#ffa726]"
                        : "text-white/70 hover:text-[#ffa726]"
                    }`}
                  >
                    {item.label}
                    <span className="text-xs">▾</span>
                  </button>

                  <div className="pointer-events-none absolute left-0 top-full pt-4 opacity-0 invisible translate-y-2 transition-all duration-200 group-hover/menu:pointer-events-auto group-hover/menu:opacity-100 group-hover/menu:visible group-hover/menu:translate-y-0 group-focus-within/menu:pointer-events-auto group-focus-within/menu:opacity-100 group-focus-within/menu:visible group-focus-within/menu:translate-y-0">
                    <div className="min-w-56 rounded-xl border border-white/10 bg-[#171717]/98 p-3 shadow-2xl backdrop-blur-md">
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
            <Link
              href={ofertaLink.href}
              className={`hidden xl:inline-flex items-center justify-center rounded-full px-5 py-2.5 text-[11px] 2xl:text-sm font-bold tracking-[0.2em] uppercase transition-colors ${
                isLinkActive(pathname, ofertaLink.href)
                  ? "bg-[#ef5350] text-white"
                  : "bg-[#ffa726] text-[#212121] hover:bg-[#ffb74d]"
              }`}
            >
              {ofertaLink.label}
            </Link>

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
                    className={`font-acme block text-sm uppercase tracking-wider transition-colors ${
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
                  <p className="font-acme text-sm uppercase tracking-wider text-white mb-2">
                    {item.label}
                  </p>
                  <div className="space-y-2 border-l border-white/10 pl-3">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={closeMenu}
                        className={`block text-sm transition-colors ${
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

            <div className="pt-2">
              <Link
                href={ofertaLink.href}
                onClick={closeMenu}
                className={`inline-flex items-center justify-center rounded-full px-5 py-2.5 text-xs font-bold tracking-[0.2em] uppercase transition-colors ${
                  isLinkActive(pathname, ofertaLink.href)
                    ? "bg-[#ef5350] text-white"
                    : "bg-[#ffa726] text-[#212121] hover:bg-[#ffb74d]"
                }`}
              >
                {ofertaLink.label}
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
