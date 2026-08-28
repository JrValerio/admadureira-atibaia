"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
    label: "Programação",
    children: [
      { label: "Agenda da igreja", href: "/programacao" },
      { label: "Eventos especiais", href: "/eventos" },
      { label: "Pedidos de oração", href: "/oracao" },
      { label: "Dízimos e ofertas", href: "/oferta" },
    ],
  },
  {
    label: "Ensino",
    children: [
      { label: "Escola Bíblica Dominical (EBD)", href: "/ebd" },
      { label: "Curso de Teologia", href: "/programacao/curso-de-teologia" },
    ],
  },
  {
    label: "Conteúdo",
    children: [
      { label: "Mensagens", href: "/mensagens" },
      { label: "Vídeos", href: "/videos" },
      { label: "Galeria", href: "/galeria" },
      { label: "Testemunhos", href: "/testemunhos" },
    ],
  },
  {
    label: "Espiritualidade",
    children: [
      { label: "Visão geral", href: "/espiritualidade" },
      { label: "Versículo do Dia", href: "/espiritualidade/versiculo-do-dia" },
      { label: "Bíblia Online", href: "/espiritualidade/biblia" },
      { label: "Plano de Leitura", href: "/espiritualidade/plano-de-leitura" },
      { label: "Devocional", href: "/espiritualidade/devocional" },
    ],
  },
  {
    label: "Nossa Igreja",
    children: [
      { label: "Sobre a Igreja", href: "/sobre" },
      { label: "História", href: "/historia" },
      { label: "Pastores", href: "/pastores" },
      { label: "Congregações", href: "/congregacoes" },
      { label: "Ministérios", href: "/ministerios" },
      { label: "Missões", href: "/ministerios/missoes" },
    ],
  },
  { label: "Contato", href: "/contato" },
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

function getMobileMenuSectionId(label: string) {
  return `mobile-menu-section-${label
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/\s+/g, "-")}`;
}

function getDesktopMenuSectionId(label: string) {
  return `desktop-menu-section-${label
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/\s+/g, "-")}`;
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [openDesktopCategory, setOpenDesktopCategory] = useState<string | null>(null);
  const pathname = usePathname();
  const mobileMenuId = "primary-mobile-menu";
  const desktopNavRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!openDesktopCategory) {
      return;
    }

    const closeOnOutsideInteraction = (event: PointerEvent) => {
      if (
        desktopNavRef.current &&
        !desktopNavRef.current.contains(event.target as Node)
      ) {
        setOpenDesktopCategory(null);
      }
    };

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenDesktopCategory(null);
      }
    };

    document.addEventListener("pointerdown", closeOnOutsideInteraction);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideInteraction);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [openDesktopCategory]);

  const toggleMenu = () => {
    setMenuOpen((current) => !current);
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setOpenCategory(null);
  };

  return (
    <header className="sticky top-0 left-0 right-0 z-50">
      <div
        className={`border-b border-white/5 transition-all duration-300 ${
          scrolled
            ? "bg-[#111111]/92 shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
            : "bg-[#111111]/86"
        }`}
      >
        <div
          className={`ui-page-container ui-page-container--footer grid grid-cols-[1fr_auto] xl:grid-cols-[1fr_auto_1fr] items-center transition-all duration-300 ${
            scrolled ? "h-[3.9rem] md:h-[4.15rem]" : "h-[4.5rem] md:h-[4.85rem]"
          }`}
        >
          <Link
            href="/"
            className="flex min-w-0 items-center gap-2.5 md:gap-3.5 xl:min-w-fit"
            aria-label="Voltar para a página inicial"
          >
            <Image
              src="/logo-transparent.png"
              alt="Logo AD Madureira Atibaia"
              width={42}
              height={42}
              sizes="(max-width: 767px) 36px, 44px"
              quality={80}
              className="h-auto w-9 shrink-0 drop-shadow-[0_10px_24px_rgba(0,0,0,0.22)] md:w-11"
              style={{ width: "auto", height: "auto" }}
            />
            <div className="min-w-0 xl:min-w-fit">
              <p className="truncate font-script text-[1.32rem] leading-none text-[#f7dfbb] md:text-[1.55rem] xl:overflow-visible xl:text-clip xl:whitespace-nowrap">
                Assembleia de Deus
              </p>
              <p className="mt-1 text-[8px] tracking-[0.22em] text-white/72 uppercase md:text-[9px] md:tracking-[0.28em]">
                Madureira · Atibaia
              </p>
            </div>
          </Link>

          <nav
            ref={desktopNavRef}
            className="hidden xl:flex items-center justify-center gap-5 2xl:gap-8"
          >
            {menu.map((item) => {
              const active = isMenuItemActive(pathname, item);

              if (isDirectMenuItem(item)) {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`group/link relative font-acme text-[13px] 2xl:text-[14px] tracking-[0.15em] transition-colors duration-200 uppercase whitespace-nowrap ${
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

              const isOpen = openDesktopCategory === item.label;
              const desktopSectionId = getDesktopMenuSectionId(item.label);

              return (
                <div key={item.label} className="relative group/menu">
                  <button
                    type="button"
                    onClick={() =>
                      setOpenDesktopCategory((prev) =>
                        prev === item.label ? null : item.label
                      )
                    }
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                    aria-controls={desktopSectionId}
                    className={`group/button relative font-acme inline-flex items-center gap-2 text-[13px] 2xl:text-[14px] tracking-[0.15em] transition-colors duration-200 uppercase whitespace-nowrap ${
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

                  <div
                    id={desktopSectionId}
                    className={`pointer-events-none absolute left-0 top-full pt-4 opacity-0 invisible translate-y-2 transition-all duration-200 group-hover/menu:pointer-events-auto group-hover/menu:opacity-100 group-hover/menu:visible group-hover/menu:translate-y-0 group-focus-within/menu:pointer-events-auto group-focus-within/menu:opacity-100 group-focus-within/menu:visible group-focus-within/menu:translate-y-0 ${
                      isOpen ? "pointer-events-auto opacity-100 visible translate-y-0" : ""
                    }`}
                  >
                    <div className="min-w-56 rounded-xl border border-white/10 bg-[#171717]/98 p-3 shadow-[0_12px_36px_rgba(0,0,0,0.16)] backdrop-blur-md">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setOpenDesktopCategory(null)}
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
              className="rounded-full p-2 text-white transition-colors hover:bg-white/6 xl:hidden"
              onClick={toggleMenu}
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={menuOpen}
              aria-controls={mobileMenuId}
            >
              <div className="w-5 h-0.5 bg-white mb-1" />
              <div className="w-5 h-0.5 bg-white mb-1" />
              <div className="w-5 h-0.5 bg-white" />
            </button>
          </div>
        </div>

        <nav
          id={mobileMenuId}
          aria-label="Menu principal"
          hidden={!menuOpen}
          className="border-t border-white/10 bg-[#121212] xl:hidden"
        >
          <div className="ui-page-container max-h-[calc(100dvh-5rem)] overflow-y-auto py-2 md:py-3">
            {menu.map((item) => {
              if (isDirectMenuItem(item)) {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMenu}
                    className={`font-acme block py-3 text-base uppercase tracking-[0.16em] transition-colors ${
                      isMenuItemActive(pathname, item)
                        ? "text-[#ffa726]"
                        : "text-white/70 hover:text-[#ffa726]"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              }

              const isOpen = openCategory === item.label;
              const sectionId = getMobileMenuSectionId(item.label);

              return (
                <div key={item.label}>
                  <button
                    type="button"
                    onClick={() =>
                      setOpenCategory((prev) =>
                        prev === item.label ? null : item.label
                      )
                    }
                    className={`flex w-full items-center justify-between py-3 font-acme text-base uppercase tracking-[0.16em] transition-colors ${
                      isMenuItemActive(pathname, item)
                        ? "text-[#ffa726]"
                        : "text-white/70"
                    }`}
                    aria-expanded={isOpen}
                    aria-controls={sectionId}
                  >
                    {item.label}
                    <span
                      className={`text-[10px] transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    >
                      ▾
                    </span>
                  </button>
                  <div
                    id={sectionId}
                    hidden={!isOpen}
                    className="space-y-1 border-l border-white/10 pl-3 pb-3"
                  >
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={closeMenu}
                        className={`block py-2 text-sm transition-colors ${
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
        </nav>
      </div>
    </header>
  );
}
