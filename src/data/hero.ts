import type { EventoTipo } from "@/data/agenda-visuais";
import { getProximoEventoPorTipo } from "@/lib/agenda-utils";
import { getProgramacaoHref } from "@/lib/programacao-anchor";

export interface HeroEvento {
  titulo: string;
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

  const hrefCultoMulheres = getEventoHref(
    ["dia-das-mulheres"],
    "/ministerios/baluarte-da-fe"
  );

  const hrefReuniaoMinisterio = getEventoHref(
    ["reuniao-de-ministerio"],
    "/eventos"
  );

  const hrefReuniaoObreiros = getEventoHref(
    ["reuniao-de-obreiros"],
    "/eventos"
  );

  return [
    {
      titulo: "Curso de Teologia",
      alt: "Banner do Curso de Teologia da AD Madureira Atibaia",
      imagem: "/banners/banner-curso-de-teologia.png",
      href: hrefCursoTeologia,
      ariaLabel: "Abrir página do Curso de Teologia",
    },
    {
      titulo: "Culto de Ensino",
      alt: "Banner do Culto de Ensino da AD Madureira Atibaia",
      imagem: "/banners/banner-culto-de-ensino.png",
      href: hrefCultoEnsino,
      ariaLabel: "Abrir programação do Culto de Ensino",
    },
    {
      titulo: "Círculo de Oração",
      alt: "Banner do Círculo de Oração da AD Madureira Atibaia",
      imagem: "/banners/banner-circulo-de-oracao.png",
      href: hrefCirculoOracao,
      ariaLabel: "Abrir programação do Círculo de Oração",
    },
    {
      titulo: "Campanha de Jejum e Oração",
      alt: "Banner da Campanha de Jejum e Oração da AD Madureira Atibaia",
      imagem: "/banners/banner-campanha-jejum-e-oracao.png",
      href: hrefCampanhaJejumOracao,
      ariaLabel: "Abrir programação da Campanha de Jejum e Oração",
    },
    {
      titulo: "Culto de Santa Ceia",
      alt: "Banner do Culto de Santa Ceia da AD Madureira Atibaia",
      imagem: "/banners/banner-culto-de-santa-ceia.png",
      href: hrefSantaCeia,
      ariaLabel: "Abrir página da Santa Ceia",
    },
    {
      titulo: "Culto de Mulheres",
      alt: "Banner do Culto de Mulheres da AD Madureira Atibaia",
      imagem: "/banners/banner-Culto-de-Mulhere.png",
      href: hrefCultoMulheres,
      ariaLabel: "Abrir página do Culto de Mulheres",
    },
    {
      titulo: "Reunião de Ministério",
      alt: "Banner da Reunião de Ministério da AD Madureira Atibaia",
      imagem: "/banners/banner-reuniao-de-ministerio.png",
      href: hrefReuniaoMinisterio,
      ariaLabel: "Abrir página da Reunião de Ministério",
    },
    {
      titulo: "Reunião de Obreiros",
      alt: "Banner da Reunião de Obreiros da AD Madureira Atibaia",
      imagem: "/banners/banner-reuniao-de-obreiros.png",
      href: hrefReuniaoObreiros,
      ariaLabel: "Abrir página da Reunião de Obreiros",
    },
  ];
}
