import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import HeroPage from "@/components/HeroPage";
import { getCongregacoes } from "@/data/congregacoes";
import { igrejaHeroMedia } from "@/data/igreja-media";
import { buildPageMetadata, resolveSiteUrl, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: "Congregações do Campo | AD Madureira Atibaia",
  description:
    "Conheça as congregações ligadas ao Campo de Atibaia da Assembleia de Deus Ministério Madureira.",
  path: "/congregacoes",
  image: igrejaHeroMedia.congregacoes,
});

export default function CongregacoesPage() {
  const congregacoes = getCongregacoes();
  const congregacaoSede = congregacoes[0];
  const canonicalUrl = resolveSiteUrl("/congregacoes");
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
        name: "Congregações",
        item: canonicalUrl,
      },
    ],
  };
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Congregações do Campo",
    description:
      "Conheça as congregações ligadas ao Campo de Atibaia da Assembleia de Deus Ministério Madureira.",
    url: canonicalUrl,
    inLanguage: "pt-BR",
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: resolveSiteUrl("/"),
    },
    breadcrumb: {
      "@id": `${canonicalUrl}#breadcrumb`,
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />

      <main className="bg-[#f5f5f5] min-h-screen">
        <HeroPage
          variant="full"
          label="Campo de Atibaia"
          title="Congregações do Campo"
          description="O Campo de Atibaia da Assembleia de Deus Ministério Madureira reúne congregações comprometidas com a pregação do Evangelho, o cuidado das famílias e o fortalecimento da vida cristã na região."
          image={igrejaHeroMedia.congregacoes}
          imageAlt="Fachada da AD Madureira Atibaia"
        />

        <section className="py-16 md:py-20">
          <div className="ui-page-container">
            <nav
              aria-label="Breadcrumb"
              className="mb-8 flex flex-wrap items-center gap-2 text-sm text-[#777]"
            >
              <Link href="/" className="hover:underline">
                Início
              </Link>
              <span>›</span>
              <span className="font-medium text-[#212121]">Congregações</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-[1.08fr_0.92fr] gap-8 items-start mb-12">
              <div className="rounded-3xl bg-white border border-black/5 p-6 md:p-8 shadow-[0_6px_24px_rgba(0,0,0,0.04)]">
                <p className="text-[#ef5350] text-xs font-bold tracking-widest uppercase mb-3">
                  Presença do campo
                </p>
                <h2 className="font-acme text-xl md:text-4xl text-[#212121] tracking-wide mb-5">
                  Uma igreja presente na cidade, com base pastoral e congregacional
                </h2>
                <div className="space-y-4 text-sm md:text-base text-[#555] leading-7 md:leading-8">
                  <p>
                    As congregações do Campo de Atibaia expressam a presença da
                    igreja na cidade e na região. Elas reúnem culto, ensino
                    bíblico, discipulado, cuidado pastoral e acolhimento às
                    famílias em diferentes frentes da caminhada cristã.
                  </p>
                  <p>
                    Esta página apresenta a base congregacional já estruturada e
                    prepara o site para registrar, com clareza institucional, o
                    crescimento do campo ao longo do tempo.
                  </p>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row sm:flex-wrap gap-4">
                  <Link href="/programacao" className="ui-btn-primary">
                    Ver programação
                  </Link>
                  <Link href="/contato" className="ui-btn-secondary">
                    Como visitar
                  </Link>
                </div>
              </div>

              <div className="rounded-3xl bg-[#fff8ee] border border-[#ffa726]/20 p-6 md:p-8 shadow-sm">
                <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-3">
                  Base atual do campo
                </p>
                <h2 className="font-acme text-xl md:text-3xl text-[#212121] tracking-wide mb-5">
                  A sede reúne culto, ensino, discipulado e cuidado pastoral
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">
                  <div>
                    <p className="font-acme text-2xl md:text-4xl text-[#212121]">Atibaia</p>
                    <p className="text-[#555] text-sm mt-1">Cidade base do campo</p>
                  </div>
                  <div>
                    <p className="font-acme text-2xl md:text-4xl text-[#212121]">Sede</p>
                    <p className="text-[#555] text-sm mt-1">Templo congregacional em destaque</p>
                  </div>
                  <div>
                    <p className="font-acme text-2xl md:text-4xl text-[#212121]">
                      {congregacaoSede?.lideranca.length ?? 0}
                    </p>
                    <p className="text-[#555] text-sm mt-1">Lideranças vinculadas</p>
                  </div>
                </div>
                <p className="text-sm md:text-base text-[#555] leading-7 md:leading-8">
                  À medida que novas congregações forem consolidadas, esta área
                  continuará servindo como mapa institucional do Campo de Atibaia,
                  preservando unidade visual e clareza de navegação.
                </p>
              </div>
            </div>

            <div className="mb-8 max-w-3xl">
              <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-3">
                Congregação em destaque
              </p>
              <h2 className="font-acme text-xl md:text-4xl text-[#212121] tracking-wide mb-4">
                Conheça a base congregacional já estruturada no Campo de Atibaia
              </h2>
              <p className="text-[#5f5f5f] leading-relaxed">
                Cada congregação registrada aqui apresenta liderança, endereço,
                horários e informações de visitação, ajudando a igreja a mostrar
                com clareza sua presença pastoral e comunitária.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {congregacoes.map((congregacao) => (
                <Link
                  key={congregacao.slug}
                  href={`/congregacoes/${congregacao.slug}`}
                  className="group rounded-3xl overflow-hidden bg-white border border-black/5 shadow-[0_6px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.07)] transition-shadow"
                >
                  <div className="relative aspect-video overflow-hidden bg-[#111]">
                    <Image
                      src={congregacao.imagem}
                      alt={congregacao.igreja}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover group-hover:scale-[1.03] transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />
                  </div>

                  <div className="p-6">
                    <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-2">
                      {congregacao.cidade}
                    </p>
                    <h2 className="font-acme text-2xl text-[#212121] tracking-wide mb-3">
                      {congregacao.igreja}
                    </h2>
                    <p className="text-[#5f5f5f] leading-relaxed mb-4">
                      {congregacao.resumo}
                    </p>
                    <p className="text-[#777] text-sm mb-1">
                      Pastor responsável: {congregacao.pastor}
                    </p>
                    <p className="text-[#777] text-sm">{congregacao.endereco}</p>
                    <p className="ui-link-accent mt-5 inline-flex">
                      Ver congregação →
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
