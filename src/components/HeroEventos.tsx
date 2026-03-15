import Link from "next/link";
import CardMedia from "@/components/media/CardMedia";
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
};

function resumirTexto(texto?: string, limite = 120) {
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
      id: "quinta-da-vitoria",
      titulo: "Campanha de Quinta-feira",
      detalhe:
        "Quinta da Vitória, jejum e oração para fortalecer a fé e caminhar juntos ao longo da semana.",
      eyebrow: "Toda quinta-feira · 19h30",
      imagem: BANNERS_PROGRAMACAO.quintaVitoria,
      href: "/programacao",
      ctaLabel: "Ver programação →",
    },
    {
      id: "culto-da-familia",
      titulo: "Culto da Família",
      detalhe:
        "Nosso encontro principal de domingo à noite, reunindo a igreja em adoração, comunhão e palavra.",
      eyebrow: "Todo domingo · 18h30",
      imagem: BANNERS_PROGRAMACAO.cultoFamilia,
      href: "/programacao",
      ctaLabel: "Ver programação →",
    },
    {
      id: "reuniao-de-obreiros",
      titulo: "Reunião de Obreiros",
      detalhe:
        "Momento mensal de comunhão ministerial, direção pastoral e alinhamento da obra.",
      eyebrow: "3º sábado do mês · 19h30",
      imagem: BANNERS_PROGRAMACAO.reuniaoObreiros,
      href: "/programacao",
      ctaLabel: "Ver programação →",
    },
  ];

  if (santaCeia) {
    destaques.push({
      id: santaCeia.slug,
      titulo: santaCeia.titulo,
      detalhe: resumirTexto(santaCeia.descricao, 110),
      eyebrow: `${santaCeia.data} · ${santaCeia.mes}${
        santaCeia.horario ? ` · ${santaCeia.horario}` : ""
      }`,
      imagem: santaCeia.imagem ?? santaCeia.banner ?? BANNERS_PROGRAMACAO.santaCeia,
      href: `/eventos/${santaCeia.slug}`,
      ctaLabel: "Ver evento →",
    });
  }

  if (batismo) {
    destaques.push({
      id: batismo.slug,
      titulo: batismo.titulo,
      detalhe: resumirTexto(batismo.descricao, 110),
      eyebrow: `${batismo.data} · ${batismo.mes}${
        batismo.horario ? ` · ${batismo.horario}` : ""
      }`,
      imagem: batismo.imagem ?? batismo.banner ?? BANNERS_PROGRAMACAO.santaCeia,
      href: `/eventos/${batismo.slug}`,
      ctaLabel: "Ver evento →",
    });
  }

  if (encontroEspecial) {
    destaques.push({
      id: encontroEspecial.slug,
      titulo: encontroEspecial.titulo,
      detalhe: resumirTexto(encontroEspecial.descricao, 110),
      eyebrow: `${encontroEspecial.data} · ${encontroEspecial.mes}${
        encontroEspecial.horario ? ` · ${encontroEspecial.horario}` : ""
      }`,
      imagem: encontroEspecial.imagem ?? encontroEspecial.banner ?? BANNERS_PROGRAMACAO.santaCeia,
      href: `/eventos/${encontroEspecial.slug}`,
      ctaLabel: "Ver evento →",
    });
  }

  return destaques.slice(0, 6);
}

export default function HeroEventos() {
  const destaques = getDestaquesHome();

  if (destaques.length === 0) {
    return null;
  }

  return (
    <section className="bg-white py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-8 grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#ffa726]">
              Destaques da igreja
            </p>
            <h2 className="font-acme text-3xl tracking-wide text-[#212121] md:text-4xl">
              Cultos e momentos em destaque
            </h2>
            <p className="mt-4 leading-relaxed text-[#5f5f5f]">
              Domingo, Quinta da Vitória, Santa Ceia, batismos, reuniões
              ministeriais e encontros especiais aparecem aqui como destaques
              vivos da agenda da igreja.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href="/programacao" className="ui-btn-secondary">
              Ver programação semanal
            </Link>
            <Link href="/eventos" className="ui-btn-primary">
              Ver agenda especial
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {destaques.map((item, index) => (
            <Link
              key={item.id}
              href={item.href}
              className="ui-card group overflow-hidden rounded-[1.8rem]"
            >
              <CardMedia
                src={item.imagem}
                alt={item.titulo}
                variant="event"
                priority={index === 0}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                zoomOnHover
                imageClassName="group-hover:scale-[1.02]"
                className="rounded-none"
              />

              <div className="p-5 md:p-6">
                <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#ffa726]">
                  {item.eyebrow}
                </p>
                <h3 className="font-acme text-2xl tracking-wide leading-tight text-[#212121] transition-colors group-hover:text-[#ef5350]">
                  {item.titulo}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#5f5f5f]">
                  {item.detalhe}
                </p>
                <p className="mt-5 inline-flex text-sm font-semibold text-[#ef5350] transition-colors group-hover:text-[#c62828]">
                  {item.ctaLabel}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
