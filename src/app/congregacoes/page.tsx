import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import HeroPage from "@/components/HeroPage";
import { getCongregacoes } from "@/data/congregacoes";
import { getPastoresByGrupo } from "@/data/pastores";
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
  const sede = congregacoes.find((c) => c.slug === "atibaia-sede")!;
  const outras = congregacoes.filter((c) => c.slug !== "atibaia-sede");
  const totalLideres = getPastoresByGrupo("congregacao").length;
  const cidades = new Set(congregacoes.map((c) => c.cidade)).size;

  const canonicalUrl = resolveSiteUrl("/congregacoes");
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${canonicalUrl}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: resolveSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Congregações", item: canonicalUrl },
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
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: resolveSiteUrl("/") },
    breadcrumb: { "@id": `${canonicalUrl}#breadcrumb` },
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
              <Link href="/" className="hover:underline">Início</Link>
              <span>›</span>
              <span className="font-medium text-[#212121]">Congregações</span>
            </nav>

            {/* Bloco de contexto */}
            <div className="grid grid-cols-1 lg:grid-cols-[1.08fr_0.92fr] gap-8 items-start mb-16">
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
                    Cada congregação faz parte dessa história de cuidado,
                    serviço e crescimento do campo ao longo do tempo.
                  </p>
                </div>
                <div className="mt-8 flex flex-col sm:flex-row sm:flex-wrap gap-4">
                  <Link href="/programacao" className="ui-btn-primary">
                    Ver programação
                  </Link>
                  <Link href="/contato" className="ui-btn-secondary">
                    Falar com a Igreja
                  </Link>
                </div>
              </div>

              <div className="rounded-3xl bg-[#fff8ee] border border-[#ffa726]/20 p-6 md:p-8 shadow-sm">
                <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-3">
                  Base atual do campo
                </p>
                <h2 className="font-acme text-xl md:text-3xl text-[#212121] tracking-wide mb-6">
                  Um campo em crescimento, presente em mais de uma cidade
                </h2>
                <div className="grid grid-cols-3 gap-5">
                  <div>
                    <p className="font-acme text-3xl md:text-4xl text-[#212121]">
                      {congregacoes.length}
                    </p>
                    <p className="text-[#555] text-sm mt-1">Congregações ativas</p>
                  </div>
                  <div>
                    <p className="font-acme text-3xl md:text-4xl text-[#212121]">
                      {cidades}
                    </p>
                    <p className="text-[#555] text-sm mt-1">Cidades atendidas</p>
                  </div>
                  <div>
                    <p className="font-acme text-3xl md:text-4xl text-[#212121]">
                      {totalLideres}
                    </p>
                    <p className="text-[#555] text-sm mt-1">Líderes pastorais</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sede em destaque */}
            <div className="mb-4">
              <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-3">
                Templo Sede
              </p>
              <h2 className="font-acme text-xl md:text-4xl text-[#212121] tracking-wide mb-2">
                A sede do Campo de Atibaia
              </h2>
              <p className="text-[#5f5f5f] leading-relaxed mb-8 max-w-2xl">
                O Templo Sede é o coração do campo — onde se reúnem os cultos principais,
                o ensino, o discipulado e o cuidado pastoral voltados à cidade e à região.
              </p>
            </div>

            <Link
              href={`/congregacoes/${sede.slug}`}
              className="group flex flex-col md:flex-row rounded-3xl overflow-hidden bg-white border border-black/5 shadow-[0_6px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.07)] transition-shadow mb-16"
            >
              <div className="relative w-full md:w-[45%] aspect-video md:aspect-auto min-h-[220px] overflow-hidden bg-[#111] shrink-0">
                <Image
                  src={sede.imagem}
                  alt={sede.igreja}
                  fill
                  sizes="(max-width: 768px) 100vw, 45vw"
                  className="object-cover group-hover:scale-[1.03] transition-transform duration-300"
                  priority
                />
                <div className="absolute inset-0 bg-linear-to-r from-transparent to-black/10" />
              </div>
              <div className="p-6 md:p-10 flex flex-col justify-center">
                <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-2">
                  {sede.cidade}
                </p>
                <h3 className="font-acme text-2xl md:text-3xl text-[#212121] tracking-wide mb-3">
                  {sede.igreja}
                </h3>
                <p className="text-[#5f5f5f] leading-relaxed mb-5 max-w-xl">
                  {sede.resumo}
                </p>
                <p className="text-[#777] text-sm mb-1">
                  Pastor responsável: {sede.pastor}
                </p>
                <p className="text-[#777] text-sm">{sede.endereco}</p>
                <p className="ui-link-accent mt-6 inline-flex">Ver congregação →</p>
              </div>
            </Link>

            {/* Outras congregações */}
            <div className="mb-8 max-w-3xl">
              <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-3">
                Congregações do campo
              </p>
              <h2 className="font-acme text-xl md:text-4xl text-[#212121] tracking-wide mb-4">
                Presença pastoral em Atibaia e região
              </h2>
              <p className="text-[#5f5f5f] leading-relaxed">
                Cada congregação apresenta liderança local, endereço, horários e
                informações de visitação — expressando a presença do campo em
                diferentes bairros e cidades.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {outras.map((congregacao) => (
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
                    <p className="ui-link-accent mt-5 inline-flex">Ver congregação →</p>
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
