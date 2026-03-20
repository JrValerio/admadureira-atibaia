import type { Metadata } from "next";
import Link from "next/link";
import HeroPage from "@/components/HeroPage";
import { igrejaHeroMedia } from "@/data/igreja-media";
import { getCongregacoes } from "@/data/congregacoes";
import { marcosHistoricos, historiaEncerramento, historiaIntroducao } from "@/data/historia";
import { getPastoresByGrupo } from "@/data/pastores";
import { buildPageMetadata, resolveSiteUrl, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: "História da Igreja | AD Madureira Atibaia",
  description:
    "Conheça a trajetória da Igreja Assembleia de Deus Ministério Madureira no Campo de Atibaia e os marcos que marcaram sua história.",
  path: "/historia",
  image: igrejaHeroMedia.historia,
});

export default function HistoriaPage() {
  const presidencia = getPastoresByGrupo("presidencia");
  const vicePresidencia = getPastoresByGrupo("vice-presidencia");
  const congregacoes = getCongregacoes();
  const congregacaoSede = congregacoes[0];
  const canonicalUrl = resolveSiteUrl("/historia");
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
        name: "História da Igreja",
        item: canonicalUrl,
      },
    ],
  };
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "História da Igreja",
    description:
      "Conheça a trajetória da Igreja Assembleia de Deus Ministério Madureira no Campo de Atibaia, seus marcos e sua atuação na cidade e na região.",
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
          title="História da Igreja"
          description="Conheça a trajetória da Igreja Assembleia de Deus Ministério Madureira no Campo de Atibaia e como Deus tem conduzido esta obra ao longo dos anos."
          image={igrejaHeroMedia.historia}
          imageAlt="Foto histórica da AD Madureira Atibaia"
          imageClassName="object-[center_34%]"
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
              <span className="font-medium text-[#212121]">História da Igreja</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-[1.08fr_0.92fr] gap-8 items-start mb-14">
              <div className="rounded-3xl bg-white border border-black/5 shadow-[0_6px_24px_rgba(0,0,0,0.04)] p-6 md:p-8">
                <p className="text-[#ef5350] text-xs font-bold tracking-widest uppercase mb-3">
                  Nossa caminhada
                </p>
                <h2 className="font-acme text-xl md:text-4xl text-[#212121] tracking-wide mb-5">
                  Uma história construída com fé, serviço e permanência
                </h2>
                <div className="space-y-4 text-sm md:text-base text-[#555] leading-7 md:leading-8">
                  {historiaIntroducao.map((paragrafo) => (
                    <p key={paragrafo}>{paragrafo}</p>
                  ))}
                  <p>
                    Cada etapa dessa trajetória ajuda a entender como a igreja se
                    consolidou em Atibaia, fortaleceu sua vida ministerial e
                    preservou um legado pastoral comprometido com a Palavra de
                    Deus.
                  </p>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row sm:flex-wrap gap-4">
                  <Link href="/sobre" className="ui-btn-primary">
                    Conheça nossa igreja
                  </Link>
                  <Link href="/pastores" className="ui-btn-secondary">
                    Ver liderança pastoral
                  </Link>
                </div>
              </div>

              <div className="rounded-3xl bg-[#fff8ee] border border-[#ffa726]/20 p-6 md:p-8 shadow-sm">
                <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-3">
                  Marcos institucionais
                </p>
                <h2 className="font-acme text-xl md:text-3xl text-[#212121] tracking-wide mb-5">
                  Da origem da igreja ao cuidado com a cidade
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">
                  <div>
                    <p className="font-acme text-2xl md:text-4xl text-[#212121]">1977</p>
                    <p className="text-[#555] text-sm mt-1">Ano da fundação</p>
                  </div>
                  <div>
                    <p className="font-acme text-2xl md:text-4xl text-[#212121]">2004</p>
                    <p className="text-[#555] text-sm mt-1">
                      Presidência atual
                    </p>
                  </div>
                  <div>
                    <p className="font-acme text-2xl md:text-4xl text-[#212121]">Atibaia</p>
                    <p className="text-[#555] text-sm mt-1">
                      Serviço à cidade e à região
                    </p>
                  </div>
                </div>
                <p className="text-sm md:text-base text-[#555] leading-7 md:leading-8">
                  A história da igreja não é apenas memória. Ela sustenta a
                  identidade pastoral, ministerial e congregacional que segue
                  viva no Campo de Atibaia até hoje.
                </p>
              </div>
            </div>

            <div className="rounded-4xl bg-white border border-black/5 shadow-[0_6px_24px_rgba(0,0,0,0.04)] p-6 md:p-10">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <p className="text-[#ffa726] text-sm font-semibold tracking-widest uppercase mb-2">
                  Da origem ao presente
                </p>
                <h2 className="font-acme text-xl md:text-4xl text-[#212121] tracking-wide mb-4">
                  Marcos que ajudam a entender a caminhada da igreja
                </h2>
                <p className="text-sm md:text-base text-[#5f5f5f] leading-7 md:leading-8">
                  Uma trajetória construída com oração, ensino bíblico,
                  comunhão entre famílias e compromisso com a proclamação do
                  Evangelho em Atibaia e na região.
                </p>
              </div>

              <div className="relative">
                <div className="absolute left-[11px] top-0 bottom-0 w-px bg-[#ffa726]/25 md:left-1/2" />
                <div className="space-y-10">
                  {marcosHistoricos.map((marco, index) => {
                    const invertido = index % 2 === 1;

                    return (
                      <div
                        key={`${marco.periodo}-${marco.titulo}`}
                        className="relative pl-8 md:pl-0 grid grid-cols-1 md:grid-cols-2 md:gap-10 items-start"
                      >
                        <div
                          className={`hidden md:block ${invertido ? "order-2" : ""}`}
                        />
                        <div
                          className={`relative ${invertido ? "md:order-1" : "md:order-2"}`}
                        >
                          <div className="absolute left-[-21px] top-3 h-6 w-6 rounded-full border-4 border-white bg-[#ffa726] shadow-sm md:left-0 md:translate-x-[-50%]" />
                          <div className="rounded-3xl border border-black/5 bg-[#f9f9f9] p-6 md:p-7 shadow-[0_6px_24px_rgba(0,0,0,0.04)]">
                            <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-2">
                              {marco.periodo}
                            </p>
                            <h3 className="font-acme text-2xl md:text-[2rem] text-[#212121] tracking-wide mb-3">
                              {marco.titulo}
                            </h3>
                            <p className="text-sm md:text-base text-[#555] leading-7 md:leading-8">
                              {marco.descricao}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-14">
              <div className="rounded-3xl bg-[#212121] text-white p-6 md:p-8">
                <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-3">
                  Legado pastoral
                </p>
                <h2 className="font-acme text-xl md:text-3xl tracking-wide mb-4">
                  Liderança que serve, cuida e preserva a caminhada da igreja
                </h2>
                <p className="text-sm md:text-base text-white/75 leading-7 md:leading-8 mb-6">
                  A história do Campo de Atibaia também é contada por meio da
                  liderança pastoral que sustenta a igreja com ensino, cuidado,
                  discipulado e compromisso com a obra de Deus.
                </p>

                <div className="space-y-5 mb-6">
                  <div>
                    <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-2">
                      Presidência do campo
                    </p>
                    <div className="grid grid-cols-1 gap-3">
                      {presidencia.map((pastor) => (
                        <div
                          key={pastor.slug}
                          className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                        >
                          <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-1">
                            {pastor.cargo}
                          </p>
                          <p className="text-sm md:text-base text-white leading-relaxed">
                            {pastor.nome}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-2">
                      Vice-presidência e apoio pastoral
                    </p>
                    <div className="grid grid-cols-1 gap-3">
                      {vicePresidencia.map((pastor) => (
                        <div
                          key={pastor.slug}
                          className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                        >
                          <p className="text-sm md:text-base text-white leading-relaxed">
                            {pastor.nome}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <Link href="/pastores" className="ui-btn-primary">
                  Conheça nossos pastores
                </Link>
              </div>

              <div className="space-y-8">
                <div className="rounded-3xl bg-white border border-black/5 shadow-[0_6px_24px_rgba(0,0,0,0.04)] p-6 md:p-8">
                  <p className="text-[#ef5350] text-xs font-bold tracking-widest uppercase mb-3">
                    Crescimento e atuação em Atibaia
                  </p>
                  <h2 className="font-acme text-xl md:text-3xl text-[#212121] tracking-wide mb-4">
                    Uma obra que permanece presente na cidade e na região
                  </h2>
                  <p className="text-sm md:text-base text-[#555] leading-7 md:leading-8 mb-6">
                    O Campo de Atibaia segue reunindo cultos, ensino bíblico,
                    discipulado, ações de cuidado pastoral e iniciativas
                    ministeriais que fortalecem a vida cristã da comunidade.
                  </p>
                  {congregacaoSede ? (
                    <div className="rounded-2xl bg-[#fff8ee] border border-[#ffa726]/20 p-5 mb-6">
                      <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-2">
                        Templo sede
                      </p>
                      <p className="font-acme text-2xl text-[#212121] mb-2">
                        {congregacaoSede.igreja}
                      </p>
                      <p className="text-[#555] text-sm leading-relaxed">
                        {congregacaoSede.resumo}
                      </p>
                    </div>
                  ) : null}
                  <Link href="/congregacoes" className="ui-btn-secondary">
                    Ver congregações
                  </Link>
                </div>

                <div className="rounded-3xl bg-white border border-black/5 shadow-[0_6px_24px_rgba(0,0,0,0.04)] p-6 md:p-8">
                  <p className="text-[#ef5350] text-xs font-bold tracking-widest uppercase mb-3">
                    Conexão com a igreja hoje
                  </p>
                  <h2 className="font-acme text-xl md:text-3xl text-[#212121] tracking-wide mb-4">
                    A história continua em cada culto, ministério e família
                  </h2>
                  <p className="text-sm md:text-base text-[#555] leading-7 md:leading-8 mb-4">
                    O legado construído ao longo dos anos segue vivo na rotina
                    da igreja: na programação semanal, no discipulado, no
                    cuidado pastoral e nos ministérios que servem diferentes
                    gerações da comunidade.
                  </p>
                  <p className="text-sm md:text-base text-[#555] leading-7 md:leading-8 mb-6">
                    {historiaEncerramento}
                  </p>
                  <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4">
                    <Link href="/programacao" className="ui-btn-primary">
                      Ver programação
                    </Link>
                    <Link href="/ministerios" className="ui-btn-secondary">
                      Conheça os ministérios
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
