import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getEventoBySlug, getEventosAgenda } from "@/lib/agenda-utils";
import { buildEventJsonLd } from "@/lib/event-schema";
import { buildPageMetadata, resolveSiteUrl } from "@/lib/site";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

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

  const title = `${evento.titulo} | AD Madureira Atibaia`;
  const description =
    evento.descricao ??
    `${evento.titulo} na AD Madureira Atibaia em ${evento.data}.`;

  return buildPageMetadata({
    title,
    description,
    path: `/eventos/${evento.slug}`,
    image: evento.imagem ?? evento.banner ?? "/fachada-da-igreja.jpg",
  });
}

export default async function EventoPage({ params }: PageProps) {
  const { slug } = await params;
  const evento = getEventoBySlug(slug);

  if (!evento) {
    notFound();
  }

  const eventImage =
    evento.imagem ?? evento.banner ?? "/fachada-da-igreja.jpg";
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
                className="object-cover"
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
                  <p className="text-[#555] leading-relaxed">
                    {evento.descricao ??
                      "Participe deste evento especial na AD Madureira Atibaia e acompanhe nossa programação para mais detalhes."}
                  </p>
                </div>

                {evento.convite && (
                  <div className="rounded-2xl bg-[#fff8ee] border border-[#ffa726]/20 p-5">
                    <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-2">
                      Você é bem-vindo
                    </p>
                    <blockquote className="text-[#555] leading-relaxed">
                      {evento.convite}
                    </blockquote>
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
