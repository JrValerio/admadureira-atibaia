import type { EventoTipo } from "@/data/agenda-visuais";
import { getProximoEventoPorTipo } from "@/lib/agenda-utils";
import { getProgramacaoHref } from "@/lib/programacao-anchor";

export interface HeroEvento {
  titulo: string;
  subtitulo?: string;
  ctaLabel?: string;
  alt: string;
  imagem: string;
  href: string;
  ariaLabel: string;
  /** Slides "high" sempre ficam nas primeiras posições. */
  priority?: "high" | "normal";
  /**
   * fixed   — permanece independente do dia
   * weekly  — ganha relevância na janela do seu dia da semana
   * event   — promovido durante a janela de datas do evento
   */
  type?: "fixed" | "weekly" | "event";
  /** 0 = domingo … 6 = sábado */
  dayOfWeek?: number;
  /** Data de início da janela de promoção: "YYYY-MM-DD" */
  eventDate?: string;
  /** Data de fim da janela de promoção: "YYYY-MM-DD" (opcional; padrão = eventDate + 1 dia) */
  eventEndDate?: string;
}

// ─── Motor de ordenação ──────────────────────────────────────────────────────

function toMidnight(dateStr: string): Date {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function isEventActive(slide: HeroEvento, today: Date): boolean {
  if (!slide.eventDate) return false;

  const start = toMidnight(slide.eventDate);
  start.setDate(start.getDate() - 1); // promove 1 dia antes

  const end = slide.eventEndDate
    ? toMidnight(slide.eventEndDate)
    : (() => {
        const d = toMidnight(slide.eventDate);
        d.setDate(d.getDate() + 2); // ecoa 2 dias depois
        return d;
      })();

  const t = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  return t >= start && t <= end;
}

function isWeeklyRelevant(slide: HeroEvento, today: Date): boolean {
  if (slide.type !== "weekly" || slide.dayOfWeek === undefined) return false;

  const todayDay = today.getDay();
  const d = slide.dayOfWeek;

  // Janela: 1 dia antes, dia do culto, 1 dia depois.
  return (
    todayDay === d ||
    todayDay === (d + 1) % 7 ||
    todayDay === (d + 6) % 7
  );
}

function orderSlides(slides: HeroEvento[]): HeroEvento[] {
  const today = new Date();

  const high: HeroEvento[] = [];
  const events: HeroEvento[] = [];
  const weekly: HeroEvento[] = [];
  const rest: HeroEvento[] = [];

  for (const slide of slides) {
    if (slide.priority === "high") {
      high.push(slide);
    } else if (isEventActive(slide, today)) {
      events.push(slide);
    } else if (isWeeklyRelevant(slide, today)) {
      weekly.push(slide);
    } else {
      rest.push(slide);
    }
  }

  return [...high, ...events, ...weekly, ...rest];
}

// ─── Helpers de href ─────────────────────────────────────────────────────────

function getEventoHref(
  tipos: ReadonlyArray<EventoTipo>,
  fallbackHref: string
) {
  const evento = getProximoEventoPorTipo(tipos);

  return evento ? `/eventos/${evento.slug}` : fallbackHref;
}

// ─── Catálogo de slides ──────────────────────────────────────────────────────

// Banners da home ficam em /public/banners para não misturar
// com as artes dos cards da programação.
export function getHeroEventos(): HeroEvento[] {
  const hrefCursoTeologia = getEventoHref(
    ["curso-de-teologia"],
    getProgramacaoHref({
      dia: "Segunda-feira",
      titulo: "Curso de Teologia",
    })
  );

  const hrefCultoEnsino = getProgramacaoHref({
    dia: "Terça-feira",
    titulo: "Culto de Ensino",
  });

  const hrefCirculoOracao = getProgramacaoHref({
    dia: "Quarta-feira",
    titulo: "Círculo de Oração",
  });

  const hrefCampanhaJejumOracao = getProgramacaoHref({
    dia: "Quinta-feira",
    titulo: "Quinta da Vitória · Jejum e Oração",
  });

  const hrefSantaCeia = getEventoHref(["santa-ceia"], "/programacao");

  const slides: HeroEvento[] = [
    {
      titulo: "Dízimos e Ofertas",
      alt: "Banner de Dízimos e Ofertas da AD Madureira Atibaia",
      imagem: "/banners/banner-dizimos-e-ofertas.png",
      href: "/oferta",
      ariaLabel: "Abrir página de dízimos e ofertas",
      priority: "high",
      type: "fixed",
    },
    {
      titulo: "Escola Bíblica Dominical",
      alt: "Banner da Escola Bíblica Dominical da AD Madureira Atibaia",
      imagem: "/banners/banner-ebd.png",
      href: "/ebd",
      ariaLabel: "Abrir página da Escola Bíblica Dominical",
      priority: "high",
      type: "fixed",
    },
    {
      titulo: "Culto de Ensino",
      alt: "Banner do Culto de Ensino da AD Madureira Atibaia",
      imagem: "/banners/banner-culto-de-ensino.png",
      href: hrefCultoEnsino,
      ariaLabel: "Abrir programação do Culto de Ensino",
      type: "weekly",
      dayOfWeek: 2, // terça-feira
    },
    {
      titulo: "Campanha de Jejum e Oração",
      alt: "Banner da Campanha de Jejum e Oração da AD Madureira Atibaia",
      imagem: "/banners/banner-campanha-jejum-e-oracao.png",
      href: hrefCampanhaJejumOracao,
      ariaLabel: "Abrir programação da Campanha de Jejum e Oração",
      type: "weekly",
      dayOfWeek: 4, // quinta-feira
    },
    {
      titulo: "Círculo de Oração",
      alt: "Banner do Círculo de Oração da AD Madureira Atibaia",
      imagem: "/banners/banner-circulo-de-oracao.png",
      href: hrefCirculoOracao,
      ariaLabel: "Abrir programação do Círculo de Oração",
      type: "weekly",
      dayOfWeek: 3, // quarta-feira
    },
    {
      titulo: "Culto de Santa Ceia",
      alt: "Banner do Culto de Santa Ceia da AD Madureira Atibaia",
      imagem: "/banners/banner-culto-de-santa-ceia.png",
      href: hrefSantaCeia,
      ariaLabel: "Abrir página da Santa Ceia",
      type: "event",
      // eventDate definido pelo operador quando a data for confirmada:
      // eventDate: "YYYY-MM-DD",
    },
    {
      titulo: "Curso de Teologia",
      alt: "Banner do Curso de Teologia da AD Madureira Atibaia",
      imagem: "/banners/banner-curso-de-teologia.png",
      href: hrefCursoTeologia,
      ariaLabel: "Abrir página do Curso de Teologia",
      type: "weekly",
      dayOfWeek: 1, // segunda-feira
    },
  ];

  return orderSlides(slides);
}
