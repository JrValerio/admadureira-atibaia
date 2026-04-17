import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getArtigoBySlug, getAllArtigoSlugs } from "@/data/curso-teologia-artigos";
import type { Bloco } from "@/data/curso-teologia-artigos";
import { buildPageMetadata, resolveSiteUrl } from "@/lib/site";

export const revalidate = 86400;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllArtigoSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const artigo = getArtigoBySlug(slug);
  if (!artigo) return {};

  return buildPageMetadata({
    title: `${artigo.title} | Pr. Eliel Sobrinho — Curso de Teologia`,
    description: `Artigo teológico de Pr. Eliel Sobrinho: ${artigo.title}. Publicado em ${artigo.date}. Leitura no site da AD Madureira Atibaia.`,
    path: `/programacao/curso-de-teologia/artigos/${slug}`,
    keywords: ["pr eliel sobrinho", "artigo teológico", "teologia", artigo.title],
  });
}

function renderBloco(bloco: Bloco, index: number) {
  switch (bloco.tipo) {
    case "paragrafo":
      return (
        <p key={index} className="text-sm leading-8 text-[#444] md:text-base md:leading-9">
          {bloco.texto}
        </p>
      );
    case "titulo":
      return (
        <h2 key={index} className="pt-4 font-acme text-xl tracking-wide text-[#212121] md:text-2xl">
          {bloco.texto}
        </h2>
      );
    case "subtitulo":
      return (
        <h3 key={index} className="pt-2 font-semibold text-base text-[#333] md:text-lg">
          {bloco.texto}
        </h3>
      );
    case "lista":
      return (
        <ul key={index} className="space-y-2 pl-1">
          {bloco.itens.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-sm leading-7 text-[#444] md:text-base">
              <span className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#ffa726]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "bibliografia":
      return (
        <div key={index} className="rounded-2xl border border-black/5 bg-[#f9f9f9] p-5">
          <p className="mb-3 text-[11px] font-bold tracking-widest uppercase text-[#8b5b18]">
            Referências bibliográficas
          </p>
          <ul className="space-y-2">
            {bloco.itens.map((item, i) => (
              <li key={i} className="text-sm leading-7 text-[#555]">
                {item}
              </li>
            ))}
          </ul>
        </div>
      );
  }
}

export default async function ArtigoTeologicoPage({ params }: Props) {
  const { slug } = await params;
  const artigo = getArtigoBySlug(slug);
  if (!artigo) notFound();

  const artigoPath = `/programacao/curso-de-teologia/artigos/${slug}`;
  const canonicalUrl = resolveSiteUrl(artigoPath);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
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
        name: "Programação",
        item: resolveSiteUrl("/programacao"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Curso de Teologia",
        item: resolveSiteUrl("/programacao/curso-de-teologia"),
      },
      {
        "@type": "ListItem",
        position: 4,
        name: artigo.title,
        item: canonicalUrl,
      },
    ],
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: artigo.title,
    datePublished: artigo.date,
    author: {
      "@type": "Person",
      name: "Pr. Eliel Sobrinho",
      sameAs: "https://prelielsobrinho.blogspot.com/",
    },
    url: canonicalUrl,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <main className="min-h-screen bg-[#f5f5f5]">
        <section className="border-b border-black/5 bg-[#111] pb-10 pt-8 text-white md:pb-14 md:pt-10">
          <div className="ui-page-container">
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
              <Link
                href="/programacao/curso-de-teologia"
                className="transition-colors hover:text-white/80"
              >
                Curso de Teologia
              </Link>
              <span>›</span>
              <span className="text-white/80">{artigo.title}</span>
            </nav>

            <p className="text-xs font-semibold tracking-[0.24em] uppercase text-[#ffa726]">
              Artigo teológico
            </p>
            <h1 className="mt-4 max-w-3xl font-acme text-2xl tracking-tight sm:text-3xl md:text-4xl lg:text-5xl">
              {artigo.title}
            </h1>
            <p className="mt-4 text-sm text-white/55">
              Pr. Eliel Sobrinho · {artigo.date}
            </p>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="ui-page-container">
            <div className="mx-auto max-w-3xl">
              <article className="rounded-3xl border border-black/5 bg-white p-6 shadow-[0_6px_24px_rgba(0,0,0,0.04)] md:p-10">
                <div className="space-y-5">
                  {artigo.blocos.map((bloco, index) => renderBloco(bloco, index))}
                </div>

                <div className="mt-10 border-t border-black/5 pt-8">
                  <a
                    href={artigo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#ffa726] underline underline-offset-4 hover:text-[#e6961e]"
                  >
                    Ver artigo original no blog →
                  </a>
                </div>
              </article>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/programacao/curso-de-teologia"
                  className="ui-btn-secondary"
                >
                  ← Voltar para o Curso de Teologia
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
