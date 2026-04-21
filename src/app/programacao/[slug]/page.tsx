import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  SEDE_PLACE_NAME,
  SEDE_POSTAL_ADDRESS,
  SEDE_PROGRAMACAO_LOCATION,
} from "@/data/site";
import type { ConteudoRelacionadoLink, CampanhaData } from "@/data/agenda-types";
import { getCultoBySlug, getCultosSlugs } from "@/lib/agenda-utils";
import { getBannerSemanal } from "@/lib/banner-semanal";
import { buildBibleReferenceHref } from "@/lib/bible-reference";
import { formatEbdDate, getLicaoDaSemana } from "@/lib/ebd-utils";
import { buildPageMetadata, resolveSiteUrl, SITE_NAME } from "@/lib/site";

export const revalidate = 3600;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getCultosSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const culto = getCultoBySlug(slug);

  if (!culto) return {};

  const banner = culto.banner ? getBannerSemanal(culto.banner) : culto.banner;

  return buildPageMetadata({
    title: `${culto.titulo} | AD Madureira Atibaia`,
    description:
      culto.descricao ??
      `${culto.titulo} — ${culto.dia}${culto.horario ? `, ${culto.horario}` : ""}. AD Madureira Atibaia.`,
    path: `/programacao/${slug}`,
    ...(banner ? { image: banner } : {}),
  });
}

function splitRichText(text?: string) {
  return text?.split(/\n\s*\n/).filter(Boolean) ?? [];
}

function CampanhaBlock({ campanha }: { campanha: CampanhaData }) {
  return (
    <div className="order-2 rounded-3xl border border-[#ef5350]/20 bg-white p-6 shadow-[0_6px_24px_rgba(0,0,0,0.04)] md:p-8">
      <p className="text-[#ef5350] text-xs font-bold tracking-widest uppercase mb-3">
        Campanha em andamento
      </p>
      <h2 className="font-acme text-2xl text-[#212121] tracking-wide mb-2">
        {campanha.titulo}
      </h2>
      {campanha.versiculo && (
        <p className="text-sm text-[#777] italic mb-5">
          &ldquo;{campanha.versiculo.texto}&rdquo; — {campanha.versiculo.referencia}
        </p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
        {campanha.datas.map(({ data, preletora }) => (
          <div
            key={data}
            className="rounded-2xl border border-[#ef5350]/15 bg-[#fff5f5] px-4 py-3"
          >
            <p className="font-acme text-xl text-[#ef5350]">{data}</p>
            {preletora && (
              <p className="text-xs text-[#555] mt-1 leading-snug">{preletora}</p>
            )}
          </div>
        ))}
      </div>
      {campanha.cantoras && campanha.cantoras.length > 0 && (
        <p className="text-sm text-[#666]">
          <span className="font-semibold text-[#444]">Cantoras: </span>
          {campanha.cantoras.join(", ")}
        </p>
      )}
      {(campanha.local || campanha.horario) && (
        <p className="text-sm text-[#666] mt-1">
          {[campanha.local, campanha.horario].filter(Boolean).join(" · ")}
        </p>
      )}
    </div>
  );
}

function getCultoRecursosRelacionados(
  slug?: string,
  recursos: ConteudoRelacionadoLink[] = []
) {
  const itens = [...recursos];

  if (slug !== "escola-biblica-dominical") {
    return itens;
  }

  const licaoDaSemanaAdultos = getLicaoDaSemana("adultos");

  if (!licaoDaSemanaAdultos) {
    return itens;
  }

  itens.unshift({
    label: "Lição da semana dos adultos",
    href: `/ebd/adultos/${licaoDaSemanaAdultos.trimestre.slug}/${licaoDaSemanaAdultos.licao.slug}`,
    descricao: `Lição ${licaoDaSemanaAdultos.licao.numero} · ${licaoDaSemanaAdultos.licao.titulo} · ${formatEbdDate(licaoDaSemanaAdultos.licao.data)}`,
  });

  const referenciaTextoAureo =
    licaoDaSemanaAdultos.licao.subsidioAdultos?.cabecalho.textoAureo ??
    licaoDaSemanaAdultos.licao.textoChave;
  const textoAureoHref = referenciaTextoAureo
    ? buildBibleReferenceHref(referenciaTextoAureo)
    : null;

  if (textoAureoHref) {
    itens.push({
      label: "Texto áureo da lição da semana",
      href: textoAureoHref,
      descricao: licaoDaSemanaAdultos.licao.textoChave,
    });
  }

  return itens;
}

export default async function CultoPage({ params }: Props) {
  const { slug } = await params;
  const cultoBase = getCultoBySlug(slug);

  if (!cultoBase) return notFound();

  const culto = {
    ...cultoBase,
    banner: cultoBase.banner ? getBannerSemanal(cultoBase.banner) : cultoBase.banner,
  };
  const descricaoParagrafos = splitRichText(culto.descricao);
  const conviteParagrafos = splitRichText(culto.convite);
  const recursosRelacionados = getCultoRecursosRelacionados(
    culto.slug,
    culto.recursos
  );
  const hasActiveBanner = Boolean(culto.banner);
  const mobileHeroSummary = culto.horario
    ? `${culto.dia} · ${culto.horario}`
    : culto.dia;

  const canonicalUrl = resolveSiteUrl(`/programacao/${slug}`);
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: resolveSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Programação", item: resolveSiteUrl("/programacao") },
      { "@type": "ListItem", position: 3, name: culto.titulo, item: canonicalUrl },
    ],
  };
  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: culto.titulo,
    description: culto.descricao,
    eventSchedule: {
      "@type": "Schedule",
      byDay: culto.dia,
      ...(culto.horario ? { startTime: culto.horario } : {}),
    },
    location: {
      "@type": "Place",
      name: SEDE_PLACE_NAME,
      address: SEDE_POSTAL_ADDRESS,
    },
    organizer: {
      "@type": "Organization",
      name: SITE_NAME,
      url: resolveSiteUrl("/"),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
      />

      <main className="min-h-screen bg-[#f5f5f5]">
        {/* Hero banner */}
        <div className="relative w-full min-h-52 overflow-hidden bg-[#111] md:min-h-80">
          {culto.banner && (
            <>
              <Image
                src={culto.banner}
                alt={culto.titulo}
                fill
                priority
                sizes="100vw"
                className="object-cover object-center opacity-70"
              />
              <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/40 to-black/80" />
            </>
          )}
          <div className="relative z-10 ui-page-container ui-page-container--narrow flex min-h-52 flex-col justify-end py-5 md:min-h-80 md:py-14">
            <nav
              aria-label="Breadcrumb"
              className="mb-4 flex flex-wrap items-center gap-2 text-xs text-white/60 md:mb-6 md:text-sm"
            >
              <Link href="/" className="transition-colors hover:text-white/80">
                Início
              </Link>
              <span>›</span>
              <Link href="/programacao" className="transition-colors hover:text-white/80">
                Programação
              </Link>
              <span>›</span>
              <span className="text-white/80">{culto.titulo}</span>
            </nav>

            <div className={hasActiveBanner ? "hidden md:block" : "block"}>
              <p className="mb-3 text-xs font-bold tracking-widest uppercase text-[#ffa726]">
                {culto.dia}
                {culto.horario ? ` · ${culto.horario}` : ""}
              </p>
              <h1 className="font-acme text-2xl leading-tight tracking-wide text-white md:text-4xl lg:text-5xl">
                {culto.titulo}
              </h1>
            </div>
          </div>
        </div>

        {/* Conteúdo */}
        <section className="py-12 md:py-16">
          <div className="ui-page-container ui-page-container--narrow">
            <div className="mb-6 rounded-3xl border border-black/5 bg-white px-5 py-5 shadow-[0_6px_24px_rgba(0,0,0,0.04)] md:hidden">
              <p className="mb-2 text-xs font-bold tracking-widest uppercase text-[#ffa726]">
                {mobileHeroSummary}
              </p>
              <h1 className="font-acme text-3xl leading-tight tracking-wide text-[#212121]">
                {culto.titulo}
              </h1>
            </div>

            <div className="flex flex-col gap-6">
            {/* Descrição */}
            {descricaoParagrafos.length > 0 && (
              <div className="order-3 rounded-3xl border border-black/5 bg-white p-6 shadow-[0_6px_24px_rgba(0,0,0,0.04)] md:order-1 md:p-8">
                <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-3">
                  Sobre o culto
                </p>
                <div className="space-y-4 text-[#444] leading-relaxed text-base md:text-lg">
                  {descricaoParagrafos.map((paragrafo) => (
                    <p key={paragrafo}>{paragrafo}</p>
                  ))}
                </div>
              </div>
            )}

            {/* Campanha atual */}
            {culto.campanha && <CampanhaBlock campanha={culto.campanha} />}

            {/* Convite */}
            {conviteParagrafos.length > 0 && (
              <div className="order-4 rounded-3xl border border-[#ffa726]/20 bg-[#fff8ee] p-6 md:order-2 md:p-8">
                <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-3">
                  Você é bem-vindo
                </p>
                <blockquote className="space-y-3 text-[#555] leading-relaxed text-base md:text-lg">
                  {conviteParagrafos.map((paragrafo) => (
                    <p key={paragrafo}>{paragrafo}</p>
                  ))}
                </blockquote>
              </div>
            )}

            {((culto.baseBiblica?.length ?? 0) > 0 ||
              recursosRelacionados.length > 0) && (
              <div className="order-5 grid grid-cols-1 gap-6 md:order-3 lg:grid-cols-2">
                {(culto.baseBiblica?.length ?? 0) > 0 && (
                  <div className="rounded-3xl bg-white border border-black/5 shadow-[0_6px_24px_rgba(0,0,0,0.04)] p-6 md:p-8">
                    <p className="text-[#ef5350] text-xs font-bold tracking-widest uppercase mb-3">
                      Base bíblica
                    </p>
                    <p className="text-sm leading-relaxed text-[#666] mb-5">
                      Abra cada referência diretamente na Bíblia Online.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {culto.baseBiblica?.map((item) => (
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
                  <div className="rounded-3xl bg-[#fff8ee] border border-[#ffa726]/20 p-6 md:p-8">
                    <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-3">
                      Continue navegando
                    </p>
                    <div className="space-y-4">
                      {recursosRelacionados.map((item) => (
                        <Link
                          key={`${item.label}-${item.href}`}
                          href={item.href}
                          className="block rounded-2xl border border-[#ffa726]/20 bg-white px-5 py-4 transition-colors hover:border-[#ffa726]/35"
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

            {/* Local e horário */}
            <div className="order-1 rounded-3xl border border-black/5 bg-white p-6 shadow-[0_6px_24px_rgba(0,0,0,0.04)] md:order-4 md:p-8">
              <p className="text-[#ef5350] text-xs font-bold tracking-widest uppercase mb-4">
                Quando e onde
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <p className="text-[#888] text-xs font-bold tracking-widest uppercase mb-1">
                    Dia
                  </p>
                  <p className="text-[#212121] font-semibold">{culto.dia}</p>
                </div>
                {culto.horario && (
                  <div>
                    <p className="text-[#888] text-xs font-bold tracking-widest uppercase mb-1">
                      Horário
                    </p>
                    <p className="text-[#212121] font-semibold">{culto.horario}</p>
                  </div>
                )}
                <div className="sm:col-span-2">
                  <p className="text-[#888] text-xs font-bold tracking-widest uppercase mb-1">
                    Local
                  </p>
                  <p className="text-[#212121] font-semibold">
                    {SEDE_PROGRAMACAO_LOCATION}
                  </p>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="order-6 flex flex-col gap-3 pt-2 md:order-5 sm:flex-row">
              <Link href="/contato" className="ui-btn-primary">
                Como chegar
              </Link>
              <Link href="/programacao" className="ui-btn-secondary">
                Ver programação completa
              </Link>
            </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
