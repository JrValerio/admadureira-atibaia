import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CONGRESSO_RIOS_DE_UNCAO_2026 as congressoRiosDeUncao } from "@/data/congresso-rios-de-uncao-2026";
import type { ConteudoRelacionadoLink } from "@/data/agenda-types";
import { getEventoBySlug, getEventosAgenda } from "@/lib/agenda-utils";
import { buildEventJsonLd } from "@/lib/event-schema";
import { buildPageMetadata, resolveSiteUrl } from "@/lib/site";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function formatEventMetaDate(data: string, ano: number) {
  const [dia, mes] = data.split("/").map((value) => Number.parseInt(value, 10));

  if (!Number.isFinite(dia) || !Number.isFinite(mes)) {
    return `${data}/${ano}`;
  }

  return new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "America/Sao_Paulo",
  }).format(new Date(Date.UTC(ano, mes - 1, dia, 12)));
}

export async function generateStaticParams() {
  return getEventosAgenda().map((evento) => ({
    slug: evento.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const evento = getEventoBySlug(slug);

  if (!evento) {
    return {
      title: "Evento não encontrado | AD Madureira Atibaia",
    };
  }

  const eventDateLabel = formatEventMetaDate(evento.data, evento.ano);
  const title = `${evento.titulo} · ${eventDateLabel} | AD Madureira Atibaia`;
  const baseDescription =
    evento.descricao ?? `${evento.titulo} na AD Madureira Atibaia.`;
  const description = `${baseDescription} Programação em ${eventDateLabel}${
    evento.horario ? `, às ${evento.horario}` : ""
  }.`;

  return buildPageMetadata({
    title,
    description,
    path: `/eventos/${evento.slug}`,
    image: evento.imagem ?? evento.banner ?? "/fachada-da-igreja.jpg",
  });
}

function splitRichText(text?: string) {
  return text?.split(/\n\s*\n/).filter(Boolean) ?? [];
}

function getRecursosRelacionados(recursos: ConteudoRelacionadoLink[] = []) {
  return recursos;
}

export default async function EventoPage({ params }: PageProps) {
  const { slug } = await params;
  const evento = getEventoBySlug(slug);

  if (!evento) {
    notFound();
  }

  const eventImage =
    evento.imagem ?? evento.banner ?? "/fachada-da-igreja.jpg";
  const eventImageClassName =
    eventImage === congressoRiosDeUncao.imagem
      ? "object-contain"
      : eventImage === "/programacao/eventos/congresso-circulo-de-oracao.png"
      ? "object-cover object-[center_38%]"
      : eventImage === "/programacao/semanas/2026-04-27/santa-ceia.png"
      ? "object-cover object-top"
      : "object-cover";
  const descricaoParagrafos = splitRichText(evento.descricao);
  const conviteParagrafos = splitRichText(evento.convite);
  const recursosRelacionados = getRecursosRelacionados(evento.recursos);
  const canonicalUrl = resolveSiteUrl(`/eventos/${evento.slug}`);
  const eventSchema = buildEventJsonLd(evento);
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${canonicalUrl}#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Início",
        item: resolveSiteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Eventos",
        item: resolveSiteUrl("/eventos"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: evento.titulo,
        item: canonicalUrl,
      },
    ],
  };

  return (
    <main className="bg-[#f5f5f5] min-h-screen">
      <section className="py-8 md:py-16">
        <div className="ui-page-container ui-page-container--narrow">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(breadcrumbSchema),
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
          />

          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex flex-wrap items-center gap-2 text-sm text-[#8a8a8a]"
          >
            <Link href="/" className="transition-colors hover:text-[#212121]">
              Início
            </Link>
            <span>›</span>
            <Link
              href="/eventos"
              className="transition-colors hover:text-[#212121]"
            >
              Eventos
            </Link>
            <span>›</span>
            <span className="text-[#212121]">{evento.titulo}</span>
          </nav>

          <div className="rounded-3xl overflow-hidden bg-white shadow-lg border border-black/5">
            <div className="relative aspect-video w-full bg-[#111]">
              <Image
                src={eventImage}
                alt={evento.titulo}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 1200px"
                className={eventImageClassName}
              />
            </div>

            <div className="p-6 md:p-10">
              <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-2">
                {evento.data}
                {evento.horario && ` · ${evento.horario}`}
              </p>

              <h1 className="font-acme text-2xl md:text-4xl lg:text-5xl text-[#212121] tracking-wide mb-6">
                {evento.titulo}
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="rounded-2xl bg-[#fff8ee] border border-[#ffa726]/20 p-4">
                  <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-1">
                    Data
                  </p>
                  <p className="text-[#212121] text-sm">{evento.data}</p>
                </div>
                <div className="rounded-2xl bg-[#fff8ee] border border-[#ffa726]/20 p-4">
                  <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-1">
                    Horário
                  </p>
                  <p className="text-[#212121] text-sm">
                    {evento.horario ?? "A confirmar"}
                  </p>
                </div>
                <div className="rounded-2xl bg-[#fff8ee] border border-[#ffa726]/20 p-4">
                  <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-1">
                    Local
                  </p>
                  <p className="text-[#212121] text-sm">
                    {evento.local ?? "AD Madureira Atibaia"}
                  </p>
                </div>
              </div>

              <div className="max-w-3xl space-y-5">
                <div>
                  <h2 className="font-acme text-2xl text-[#212121] tracking-wide mb-3">
                    Sobre o evento
                  </h2>
                  <div className="space-y-4 text-[#555] leading-relaxed">
                    {(descricaoParagrafos.length > 0
                      ? descricaoParagrafos
                      : [
                          "Participe deste evento especial na AD Madureira Atibaia e acompanhe nossa programação para mais detalhes.",
                        ]
                    ).map((paragrafo) => (
                      <p key={paragrafo}>{paragrafo}</p>
                    ))}
                  </div>
                </div>

                {conviteParagrafos.length > 0 && (
                  <div className="rounded-2xl bg-[#fff8ee] border border-[#ffa726]/20 p-5">
                    <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-2">
                      Você é bem-vindo
                    </p>
                    <blockquote className="space-y-3 text-[#555] leading-relaxed">
                      {conviteParagrafos.map((paragrafo) => (
                        <p key={paragrafo}>{paragrafo}</p>
                      ))}
                    </blockquote>
                  </div>
                )}

                {((evento.baseBiblica?.length ?? 0) > 0 ||
                  recursosRelacionados.length > 0) && (
                  <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                    {(evento.baseBiblica?.length ?? 0) > 0 && (
                      <div className="rounded-2xl border border-black/5 bg-white p-5">
                        <p className="text-[#ef5350] text-xs font-bold tracking-widest uppercase mb-2">
                          Base bíblica
                        </p>
                        <p className="mb-4 text-sm leading-relaxed text-[#666]">
                          Abra cada referência diretamente na Bíblia Online.
                        </p>
                        <div className="flex flex-wrap gap-3">
                          {evento.baseBiblica?.map((item) => (
                            <Link
                              key={`${item.referencia}-${item.href}`}
                              href={item.href}
                              className="inline-flex rounded-full border border-[#ffa726]/25 bg-[#fff8ee] px-4 py-2 text-xs font-semibold tracking-[0.12em] uppercase text-[#8b5b18] transition-colors hover:border-[#ffa726]/40 hover:text-[#6d4511]"
                            >
                              {item.referencia}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {recursosRelacionados.length > 0 && (
                      <div className="rounded-2xl border border-[#ffa726]/20 bg-[#fff8ee] p-5">
                        <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-2">
                          Continue navegando
                        </p>
                        <div className="space-y-3">
                          {recursosRelacionados.map((item) => (
                            <Link
                              key={`${item.label}-${item.href}`}
                              href={item.href}
                              className="block rounded-2xl border border-[#ffa726]/20 bg-white px-4 py-3 transition-colors hover:border-[#ffa726]/35"
                            >
                              <p className="font-semibold text-[#212121]">
                                {item.label}
                              </p>
                              {item.descricao ? (
                                <p className="mt-1 text-sm leading-relaxed text-[#666]">
                                  {item.descricao}
                                </p>
                              ) : null}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link
                  href="/contato"
                  className="inline-flex items-center justify-center bg-[#ffa726] hover:bg-[#ffb74d] text-[#212121] font-bold text-xs tracking-widest uppercase px-6 py-3 rounded-full transition-colors"
                >
                  Como chegar
                </Link>
                <Link
                  href="/programacao"
                  className="inline-flex items-center justify-center border border-[#ef5350] text-[#ef5350] hover:bg-[#ef5350] hover:text-white font-bold text-xs tracking-widest uppercase px-6 py-3 rounded-full transition-colors"
                >
                  Ver programação completa
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
