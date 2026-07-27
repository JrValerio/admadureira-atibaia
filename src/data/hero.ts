import type { EventoTipo } from "@/data/agenda-visuais";
import { CONGRESSO_RIOS_DE_UNCAO_2026 as congressoRiosDeUncao } from "@/data/congresso-rios-de-uncao-2026";
import { getProximoEventoPorTipo } from "@/lib/agenda-utils";
import {
  isFirstMondayWeek,
  isThirdSaturdayWeek,
  isWeekBeforeFirstMonday,
} from "@/lib/programacao-recorrencia";

export interface HeroEvento {
  titulo: string;
  subtitulo?: string;
  ctaLabel?: string;
  alt: string;
  imagem: string;
  imageClassName?: string;
  href: string;
  ariaLabel: string;
  /** Slides "high" sempre ficam nas primeiras posições. */
  priority?: "high" | "normal";
  /**
   * fixed   — permanece independente do dia
   * weekly  — ganha relevância na janela do seu dia da semana
   * recurring-event — aparece somente na janela mensal configurada
   * event   — promovido durante a janela de datas do evento
   */
  type?: "fixed" | "weekly" | "event" | "recurring-event";
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
  recurrence?: "first-monday-previous-week" | "third-saturday-week";
  hiddenWhen?: "first-monday-week";
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

function isRecurringEventActive(slide: HeroEvento, today: Date): boolean {
  if (slide.type !== "recurring-event") return false;

  if (slide.recurrence === "first-monday-previous-week") {
    return isWeekBeforeFirstMonday(today);
  }

  if (slide.recurrence === "third-saturday-week") {
    return isThirdSaturdayWeek(today);
  }

  return false;
}

function isHiddenByCalendar(slide: HeroEvento, today: Date): boolean {
  if (slide.hiddenWhen === "first-monday-week" && isFirstMondayWeek(today)) {
    return true;
  }

  return slide.type === "recurring-event" && !isRecurringEventActive(slide, today);
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
    } else if (isEventActive(slide, today) || isRecurringEventActive(slide, today)) {
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
    {
      titulo: "Batismo",
      alt: "Banner do Batismo da AD Madureira Atibaia",
      imagem: "/banners/banner-batismo.png",
      href: "/eventos/batismo-28-06-2026",
      ariaLabel: "Abrir página do Batismo",
      type: "event",
      eventDate: "2026-06-28",
      archivedAfter: "2026-06-28",
    },
    {
      titulo: "Congresso da Mocidade — Rios de Unção",
      alt: "Arte oficial do Congresso da Mocidade Rios de Unção 2026",
      imagem: congressoRiosDeUncao.banner,
      imageClassName: "object-cover object-center",
      href: congressoRiosDeUncao.path,
      ariaLabel: "Abrir página do Congresso da Mocidade Rios de Unção 2026",
      priority: "high",
      type: "event",
      eventDate: "2026-07-17",
      eventEndDate: "2026-07-18",
      archivedAfter: "2026-07-18",
    },
    {
      titulo: "Reunião de Ministério",
      alt: "Banner da Reunião de Ministério da AD Madureira Atibaia",
      imagem: "/banners/banner-reuniao-de-ministerio.png",
      href: "/programacao",
      ariaLabel: "Abrir página da Reunião de Ministério",
      type: "recurring-event",
      recurrence: "first-monday-previous-week",
    },
    {
      titulo: "Reunião de Obreiros",
      alt: "Banner da Reunião de Obreiros da AD Madureira Atibaia",
      imagem: "/banners/banner-reuniao-de-obreiros.png",
      href: "/programacao",
      ariaLabel: "Abrir página da Reunião de Obreiros",
      type: "recurring-event",
      recurrence: "third-saturday-week",
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
      titulo: "Dia do Pastor",
      alt: "Banner do Dia do Pastor — Pr. Zacarias B. Félix e Pra. Anna Alzira",
      imagem: "/banners/dia-do-pastor.png",
      href: "/eventos/dia-do-pastor-14-06-2026",
      ariaLabel: "Abrir página do Dia do Pastor",
      priority: "high",
      type: "event",
      eventDate: "2026-06-14",
      eventEndDate: "2026-06-30",
      archivedAfter: "2026-06-30",
    },
    {
      titulo: "Entrevista — Pr. Zacarias B. Félix",
      alt: "Banner da Entrevista com o Pr. Zacarias B. Félix",
      imagem: "/banners/entrevista.png",
      href: "/eventos/entrevista-pastor-zacarias-felix-2026",
      ariaLabel: "Assistir à entrevista com o Pastor Zacarias",
      priority: "high",
      type: "event",
      eventDate: "2026-06-14",
      eventEndDate: "2026-06-30",
      archivedAfter: "2026-06-30",
    },
    {
      titulo: "Vigília",
      subtitulo:
        "Uma noite de adoração, clamor e Palavra com o Pr. Wanderley Abrahão e participação de Noemi Nonato, Nando Menezes, Gildo Borges e Cíntia Pérez.",
      ctaLabel: "Ver detalhes da Vigília",
      alt: "Banner da Vigília 29 de agosto — AD Madureira Atibaia",
      imagem: "/banners/banner-vigilia.png",
      href: "/eventos/vigilia-29-08-2026",
      ariaLabel: "Abrir página da Vigília 29 de agosto",
      priority: "high",
      type: "event",
      eventDate: "2026-08-29",
      archivedAfter: "2026-08-29",
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
      hiddenWhen: "first-monday-week",
    },
  ];

  return orderSlides(
    slides.filter(
      (slide) => !isArchived(slide, today) && !isHiddenByCalendar(slide, today)
    )
  );
}
