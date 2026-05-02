import type { EventoTipo } from "@/data/agenda-visuais";
import { getProximoEventoPorTipo } from "@/lib/agenda-utils";

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
  /**
   * Data a partir da qual o slide é completamente removido da rotação: "YYYY-MM-DD".
   * Após essa data, o slide não aparece nem como fallback.
   */
  archivedAfter?: string;
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

function isArchived(slide: HeroEvento, today: Date): boolean {
  if (!slide.archivedAfter) return false;
  const t = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  return t > toMidnight(slide.archivedAfter);
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
  const hrefSantaCeia = getEventoHref(["santa-ceia"], "/programacao");
  const hrefCongressoCirculoOracao = getEventoHref(
    ["congresso-circulo-de-oracao"],
    "/eventos"
  );

  const today = new Date();
  const slides: HeroEvento[] = [
    {
      titulo: "Dízimos e Ofertas",
      subtitulo:
        "Página oficial de contribuição da AD Madureira Atibaia, com PIX, dados bancários e orientação segura para quem deseja cooperar com a obra.",
      ctaLabel: "Ver formas de contribuir",
      alt: "Banner de Dízimos e Ofertas da AD Madureira Atibaia",
      imagem: "/banners/banner-dizimos-e-ofertas.webp",
      href: "/oferta",
      ariaLabel: "Abrir página de dízimos e ofertas",
      priority: "normal",
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
      href: "/programacao/culto-de-ensino",
      ariaLabel: "Abrir página do Culto de Ensino",
      type: "weekly",
      dayOfWeek: 2, // terça-feira
    },
    {
      titulo: "Campanha de Jejum e Oração",
      alt: "Banner da Campanha de Jejum e Oração da AD Madureira Atibaia",
      imagem: "/banners/banner-campanha-jejum-e-oracao.png",
      href: "/programacao/quinta-da-vitoria",
      ariaLabel: "Abrir página da Campanha de Jejum e Oração",
      type: "event",
      eventDate: "2026-04-02",
      archivedAfter: "2026-04-02",
    },
    // banner-batismo: manter fora da rotação até a entrada oficial da arte
    // {
    //   titulo: "Batismo",
    //   alt: "Banner do Batismo da AD Madureira Atibaia",
    //   imagem: "/banners/banner-batismo.png",
    //   href: "/eventos/batismo-05-04-2026",
    //   ariaLabel: "Abrir página do Batismo",
    //   type: "event",
    //   eventDate: "2026-04-05",
    //   archivedAfter: "2026-04-05",
    // },
    {
      titulo: "Reunião de Ministério",
      alt: "Banner da Reunião de Ministério da AD Madureira Atibaia",
      imagem: "/banners/banner-reuniao-de-ministerio.png",
      href: "/programacao",
      ariaLabel: "Abrir página da Reunião de Ministério",
      type: "weekly",
      dayOfWeek: 1, // segunda-feira (1ª do mês)
    },
    {
      titulo: "Reunião de Obreiros",
      alt: "Banner da Reunião de Obreiros da AD Madureira Atibaia",
      imagem: "/banners/banner-reuniao-de-obreiros.png",
      href: "/programacao",
      ariaLabel: "Abrir página da Reunião de Obreiros",
      type: "weekly",
      dayOfWeek: 6, // sábado
    },
    {
      titulo: "Círculo de Oração",
      alt: "Banner do Círculo de Oração da AD Madureira Atibaia",
      imagem: "/banners/banner-circulo-de-oracao.png",
      href: "/programacao/circulo-de-oracao",
      ariaLabel: "Abrir página do Círculo de Oração",
      type: "weekly",
      dayOfWeek: 3, // quarta-feira
    },
    {
      titulo: "Campanha Mulheres em Ação",
      alt: "Banner da Campanha Mulheres em Ação da AD Madureira Atibaia",
      imagem: "/banners/banner-campanha-mulher-em-acao.png",
      href: "/programacao/quinta-da-vitoria",
      ariaLabel: "Abrir página do Culto da Vitória — Campanha Mulheres em Ação",
      type: "event",
      eventDate: "2026-04-23",
      eventEndDate: "2026-05-07",
      archivedAfter: "2026-05-07",
    },
    {
      titulo: "Congresso do Círculo de Oração",
      alt: "Banner do Congresso do Círculo de Oração Baluarte da Fé da AD Madureira Atibaia",
      imagem: "/banners/banner-congresso-circulo-de-oracao.png",
      href: hrefCongressoCirculoOracao,
      ariaLabel: "Abrir página do Congresso do Círculo de Oração",
      priority: "high",
      type: "event",
      eventDate: "2026-05-29",
      eventEndDate: "2026-05-30",
      archivedAfter: "2026-05-30",
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
      imagem: "/banners/banner-curso-de-teologia.webp",
      href: "/programacao/curso-de-teologia",
      ariaLabel: "Abrir página do Curso de Teologia",
      type: "weekly",
      dayOfWeek: 1, // segunda-feira
    },
  ];

  return orderSlides(slides.filter((s) => !isArchived(s, today)));
}
