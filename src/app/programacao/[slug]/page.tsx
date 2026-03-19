import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getCultoBySlug, getCultosSlugs } from "@/lib/agenda-utils";
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

  return buildPageMetadata({
    title: `${culto.titulo} | AD Madureira Atibaia`,
    description:
      culto.descricao ??
      `${culto.titulo} — ${culto.dia}${culto.horario ? `, ${culto.horario}` : ""}. AD Madureira Atibaia.`,
    path: `/programacao/${slug}`,
    ...(culto.banner ? { image: culto.banner } : {}),
  });
}

export default async function CultoPage({ params }: Props) {
  const { slug } = await params;
  const culto = getCultoBySlug(slug);

  if (!culto) return notFound();

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
      name: "Assembleia de Deus Madureira — Sede",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Praça Pio XII, 122",
        addressLocality: "Atibaia",
        addressRegion: "SP",
        addressCountry: "BR",
      },
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
        <div className="relative w-full bg-[#111] overflow-hidden" style={{ minHeight: "320px" }}>
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
          <div className="relative z-10 ui-page-container ui-page-container--narrow flex min-h-[320px] flex-col justify-end py-10 md:py-14">
            <nav
              aria-label="Breadcrumb"
              className="mb-6 flex flex-wrap items-center gap-2 text-sm text-white/55"
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

            <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-3">
              {culto.dia}
              {culto.horario ? ` · ${culto.horario}` : ""}
            </p>
            <h1 className="font-acme text-2xl md:text-4xl lg:text-5xl text-white tracking-wide leading-tight">
              {culto.titulo}
            </h1>
          </div>
        </div>

        {/* Conteúdo */}
        <section className="py-12 md:py-16">
          <div className="ui-page-container ui-page-container--narrow space-y-6">

            {/* Descrição */}
            {culto.descricao && (
              <div className="rounded-3xl bg-white border border-black/5 shadow-[0_6px_24px_rgba(0,0,0,0.04)] p-6 md:p-8">
                <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-3">
                  Sobre o culto
                </p>
                <p className="text-[#444] leading-relaxed text-base md:text-lg">
                  {culto.descricao}
                </p>
              </div>
            )}

            {/* Convite */}
            {culto.convite && (
              <div className="rounded-3xl bg-[#fff8ee] border border-[#ffa726]/20 p-6 md:p-8">
                <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-3">
                  Você é bem-vindo
                </p>
                <blockquote className="text-[#555] leading-relaxed text-base md:text-lg">
                  {culto.convite}
                </blockquote>
              </div>
            )}

            {/* Local e horário */}
            <div className="rounded-3xl bg-white border border-black/5 shadow-[0_6px_24px_rgba(0,0,0,0.04)] p-6 md:p-8">
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
                    Sede — Praça Pio XII, 122, Centro, Atibaia/SP
                  </p>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link href="/contato" className="ui-btn-primary">
                Como chegar
              </Link>
              <Link href="/programacao" className="ui-btn-secondary">
                Ver programação completa
              </Link>
            </div>

          </div>
        </section>
      </main>
    </>
  );
}
