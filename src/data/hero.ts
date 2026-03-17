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
}

function getEventoHref(
  tipos: ReadonlyArray<EventoTipo>,
  fallbackHref: string
) {
  const evento = getProximoEventoPorTipo(tipos);

  return evento ? `/eventos/${evento.slug}` : fallbackHref;
}

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

  return [
    {
      titulo: "Dízimos e Ofertas",
      alt: "Banner de Dízimos e Ofertas da AD Madureira Atibaia",
      imagem: "/banners/banner-dizimos-e-ofertas.png",
      href: "/oferta",
      ariaLabel: "Abrir página de dízimos e ofertas",
    },
    {
      titulo: "Escola Bíblica Dominical",
      alt: "Banner da Escola Bíblica Dominical da AD Madureira Atibaia",
      imagem: "/banners/banner-ebd.png",
      href: "/ebd",
      ariaLabel: "Abrir página da Escola Bíblica Dominical",
    },
    {
      titulo: "Culto de Ensino",
      alt: "Banner do Culto de Ensino da AD Madureira Atibaia",
      imagem: "/banners/banner-culto-de-ensino.png",
      href: hrefCultoEnsino,
      ariaLabel: "Abrir programação do Culto de Ensino",
    },
    {
      titulo: "Campanha de Jejum e Oração",
      alt: "Banner da Campanha de Jejum e Oração da AD Madureira Atibaia",
      imagem: "/banners/banner-campanha-jejum-e-oracao.png",
      href: hrefCampanhaJejumOracao,
      ariaLabel: "Abrir programação da Campanha de Jejum e Oração",
    },
    {
      titulo: "Círculo de Oração",
      alt: "Banner do Círculo de Oração da AD Madureira Atibaia",
      imagem: "/banners/banner-circulo-de-oracao.png",
      href: hrefCirculoOracao,
      ariaLabel: "Abrir programação do Círculo de Oração",
    },
    {
      titulo: "Culto de Santa Ceia",
      alt: "Banner do Culto de Santa Ceia da AD Madureira Atibaia",
      imagem: "/banners/banner-culto-de-santa-ceia.png",
      href: hrefSantaCeia,
      ariaLabel: "Abrir página da Santa Ceia",
    },
    {
      titulo: "Curso de Teologia",
      alt: "Banner do Curso de Teologia da AD Madureira Atibaia",
      imagem: "/banners/banner-curso-de-teologia.png",
      href: hrefCursoTeologia,
      ariaLabel: "Abrir página do Curso de Teologia",
    },
  ];
}
