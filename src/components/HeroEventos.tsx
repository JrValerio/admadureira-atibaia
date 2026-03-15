import HeroEventosCarousel from "@/components/HeroEventosCarousel";
import { BANNERS_PROGRAMACAO } from "@/data/programacao-banners";
import { getEventosDestaque, getEventosFuturos } from "@/lib/agenda-utils";

type HomeHighlight = {
  id: string;
  titulo: string;
  detalhe: string;
  eyebrow: string;
  imagem: string;
  href: string;
  ctaLabel: string;
  apoioHref: string;
  apoioLabel: string;
};

function resumirTexto(texto?: string, limite = 150) {
  if (!texto) {
    return "";
  }

  if (texto.length <= limite) {
    return texto;
  }

  return `${texto.slice(0, limite).trimEnd()}...`;
}

function getDestaquesHome(): HomeHighlight[] {
  const destaquePrincipal = getEventosDestaque(1, false)[0]?.slug ?? null;
  const eventosFuturos = getEventosFuturos(12);
  const usados = new Set<string>();

  const selecionarEvento = (
    predicate: (slug: string, titulo: string) => boolean
  ) => {
    const evento = eventosFuturos.find(
      (item) =>
        item.slug !== destaquePrincipal &&
        !usados.has(item.slug) &&
        predicate(item.slug, item.titulo)
    );

    if (!evento) {
      return null;
    }

    usados.add(evento.slug);
    return evento;
  };

  const santaCeia = selecionarEvento((slug) => slug.includes("santa-ceia"));
  const batismo = selecionarEvento((slug) => slug.includes("batismo"));
  const encontroEspecial = selecionarEvento(
    (slug, titulo) =>
      /congresso|confraternizacao|vigilia|aniversario/i.test(slug) ||
      /congresso|confraternização|vigília|aniversário/i.test(titulo)
  );

  const destaques: HomeHighlight[] = [
    {
      id: "culto-da-familia",
      titulo: "Culto da Família",
      detalhe:
        "Nosso encontro principal de domingo à noite, reunindo a igreja em adoração, comunhão e palavra para encerrar a semana na presença de Deus.",
      eyebrow: "Todo domingo · 18h30",
      imagem: BANNERS_PROGRAMACAO.cultoFamilia,
      href: "/programacao",
      ctaLabel: "Ver programação",
      apoioHref: "/eventos",
      apoioLabel: "Ver agenda especial",
    },
    {
      id: "quinta-da-vitoria",
      titulo: "Campanha de Quinta-feira",
      detalhe:
        "Quinta da Vitória, jejum e oração para fortalecer a fé, apresentar causas diante do Senhor e caminhar juntos ao longo da semana.",
      eyebrow: "Toda quinta-feira · 19h30",
      imagem: BANNERS_PROGRAMACAO.quintaVitoria,
      href: "/programacao",
      ctaLabel: "Ver programação",
      apoioHref: "/eventos",
      apoioLabel: "Ver agenda especial",
    },
  ];

  if (santaCeia) {
    destaques.push({
      id: santaCeia.slug,
      titulo: santaCeia.titulo,
      detalhe: resumirTexto(santaCeia.descricao, 150),
      eyebrow: `${santaCeia.data} · ${santaCeia.mes}${
        santaCeia.horario ? ` · ${santaCeia.horario}` : ""
      }`,
      imagem:
        santaCeia.imagem ?? santaCeia.banner ?? BANNERS_PROGRAMACAO.santaCeia,
      href: `/eventos/${santaCeia.slug}`,
      ctaLabel: "Ver evento",
      apoioHref: "/programacao",
      apoioLabel: "Ver programação",
    });
  }

  if (batismo) {
    destaques.push({
      id: batismo.slug,
      titulo: batismo.titulo,
      detalhe: resumirTexto(batismo.descricao, 150),
      eyebrow: `${batismo.data} · ${batismo.mes}${
        batismo.horario ? ` · ${batismo.horario}` : ""
      }`,
      imagem: batismo.imagem ?? batismo.banner ?? BANNERS_PROGRAMACAO.santaCeia,
      href: `/eventos/${batismo.slug}`,
      ctaLabel: "Ver evento",
      apoioHref: "/programacao",
      apoioLabel: "Ver programação",
    });
  }

  destaques.push({
    id: "reuniao-de-obreiros",
    titulo: "Reunião de Obreiros",
    detalhe:
      "Momento mensal de comunhão ministerial, direção pastoral e alinhamento da obra para quem serve na liderança da igreja.",
    eyebrow: "3º sábado do mês · 19h30",
    imagem: BANNERS_PROGRAMACAO.reuniaoObreiros,
    href: "/programacao",
    ctaLabel: "Ver programação",
    apoioHref: "/eventos",
    apoioLabel: "Ver agenda especial",
  });

  if (encontroEspecial) {
    destaques.push({
      id: encontroEspecial.slug,
      titulo: encontroEspecial.titulo,
      detalhe: resumirTexto(encontroEspecial.descricao, 150),
      eyebrow: `${encontroEspecial.data} · ${encontroEspecial.mes}${
        encontroEspecial.horario ? ` · ${encontroEspecial.horario}` : ""
      }`,
      imagem:
        encontroEspecial.imagem ??
        encontroEspecial.banner ??
        BANNERS_PROGRAMACAO.santaCeia,
      href: `/eventos/${encontroEspecial.slug}`,
      ctaLabel: "Ver evento",
      apoioHref: "/eventos",
      apoioLabel: "Ver agenda especial",
    });
  }

  return destaques.slice(0, 6);
}

export default function HeroEventos() {
  const destaques = getDestaquesHome();

  if (destaques.length === 0) {
    return null;
  }

  return <HeroEventosCarousel slides={destaques} />;
}
