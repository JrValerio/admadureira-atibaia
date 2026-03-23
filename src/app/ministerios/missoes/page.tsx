import Link from "next/link";
import HeroPage from "@/components/HeroPage";
import { igrejaHeroMedia } from "@/data/igreja-media";
import { missoesData } from "@/data/missoes";
import { SEDE_WHATSAPP_URL } from "@/data/site";
import { buildPageMetadata, resolveSiteUrl, SITE_NAME } from "@/lib/site";

export const revalidate = 3600;

const missionsPath = "/ministerios/missoes";

export const metadata = buildPageMetadata({
  title: "Missões | AD Madureira Atibaia",
  description:
    "Conheça a visão missionária da AD Madureira Atibaia, saiba como participar em oração, contribuição e serviço, e acompanhe futuras atualizações sobre campanhas e frentes apoiadas.",
  path: missionsPath,
  image: igrejaHeroMedia.ministerios,
  keywords: [
    "missoes igreja",
    "missoes ad madureira atibaia",
    "oferta missionaria atibaia",
    "obra missionaria igreja",
  ],
});

export default function MissoesPage() {
  const whatsappMessage = encodeURIComponent(
    "A paz do Senhor! Gostaria de mais informações sobre a frente de Missões da igreja."
  );
  const whatsappUrl = `${SEDE_WHATSAPP_URL}?text=${whatsappMessage}`;
  const canonicalUrl = resolveSiteUrl(missionsPath);

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
        name: "Ministérios",
        item: resolveSiteUrl("/ministerios"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Missões",
        item: canonicalUrl,
      },
    ],
  };

  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Missões | AD Madureira Atibaia",
    description: missoesData.hero.description,
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
          label={missoesData.hero.label}
          title={missoesData.hero.title}
          description={missoesData.hero.description}
          image={igrejaHeroMedia.ministerios}
          imageAlt="Culto na AD Madureira Atibaia"
          imageClassName="object-[center_34%]"
        />

        <section className="border-b border-black/5 bg-white/90">
          <div className="ui-page-container py-5 md:py-6">
            <div className="ui-panel ui-panel-pad-sm">
              <p className="ui-section-eyebrow ui-section-eyebrow--gold">
                Envolva-se com a obra
              </p>
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-3xl">
                  <h2 className="font-acme text-xl tracking-wide text-[#212121] md:text-2xl">
                    Visão, contribuição e participação na obra missionária
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-[#5f5f5f] md:text-base">
                    Conheça a visão missionária da AD Madureira Atibaia, saiba
                    como participar com oração e contribuição, e fique atento a
                    campanhas e pedidos de intercessão.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link href="/oferta" className="ui-btn-primary">
                    Contribuir com missões
                  </Link>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ui-btn-secondary"
                  >
                    Falar com a igreja
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="ui-page-container space-y-10">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.08fr_0.92fr]">
              <article className="rounded-3xl border border-black/5 bg-white p-6 shadow-[0_6px_24px_rgba(0,0,0,0.04)] md:p-8">
                <p className="text-xs font-bold tracking-widest uppercase text-[#ef5350]">
                  Visão missionária
                </p>
                <h2 className="mt-3 font-acme text-2xl tracking-wide text-[#212121] md:text-4xl">
                  O compromisso da igreja com a obra missionária
                </h2>
                <blockquote className="mt-5 rounded-2xl border border-[#ffa726]/20 bg-[#fff8ee] px-5 py-4 text-sm leading-relaxed text-[#6b4a12] md:text-base">
                  {missoesData.vision.verse}
                </blockquote>
                <div className="mt-5 space-y-4 text-sm leading-7 text-[#555] md:text-base md:leading-8">
                  {missoesData.vision.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </article>

              <article className="rounded-3xl border border-[#ffa726]/20 bg-[#fff8ee] p-6 shadow-[0_6px_24px_rgba(0,0,0,0.04)] md:p-8">
                <p className="text-xs font-bold tracking-widest uppercase text-[#ffa726]">
                  Como participar
                </p>
                <h2 className="mt-3 font-acme text-2xl tracking-wide text-[#212121] md:text-3xl">
                  Toda a igreja pode se envolver com missões
                </h2>
                <div className="mt-6 grid grid-cols-1 gap-4">
                  {missoesData.participationWays.map((item) => (
                    <div
                      key={item.title}
                      className="rounded-2xl border border-[#ffa726]/15 bg-white/70 p-4"
                    >
                      <h3 className="font-acme text-lg tracking-wide text-[#212121]">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-[#555]">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </article>
            </div>

            <article className="rounded-3xl border border-black/5 bg-white p-6 shadow-[0_6px_24px_rgba(0,0,0,0.04)] md:p-8">
              <p className="text-xs font-bold tracking-widest uppercase text-[#ef5350]">
                Áreas de atuação
              </p>
              <h2 className="mt-3 font-acme text-2xl tracking-wide text-[#212121] md:text-3xl">
                Frentes em que a igreja pode se mobilizar missionariamente
              </h2>
              <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                {missoesData.involvementAreas.map((area) => (
                  <div
                    key={area.title}
                    className="rounded-2xl border border-black/5 bg-[#f9f9f9] p-5"
                  >
                    <h3 className="font-acme text-lg tracking-wide text-[#212121]">
                      {area.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-[#555]">
                      {area.description}
                    </p>
                  </div>
                ))}
              </div>
            </article>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1fr]">
              <article className="rounded-3xl border border-black/5 bg-white p-6 shadow-[0_6px_24px_rgba(0,0,0,0.04)] md:p-8">
                <p className="text-xs font-bold tracking-widest uppercase text-[#ef5350]">
                  Frentes apoiadas
                </p>
                <h2 className="mt-3 font-acme text-2xl tracking-wide text-[#212121] md:text-3xl">
                  {missoesData.supportedFronts.title}
                </h2>
                <div className="mt-5 space-y-4 text-sm leading-7 text-[#555] md:text-base md:leading-8">
                  {missoesData.supportedFronts.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </article>

              <article className="rounded-3xl border border-[#ffa726]/20 bg-[#fff8ee] p-6 shadow-[0_6px_24px_rgba(0,0,0,0.04)] md:p-8">
                <p className="text-xs font-bold tracking-widest uppercase text-[#ffa726]">
                  Contribuição missionária
                </p>
                <h2 className="mt-3 font-acme text-2xl tracking-wide text-[#212121] md:text-3xl">
                  {missoesData.contribution.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-[#555] md:text-base md:leading-8">
                  {missoesData.contribution.description}
                </p>
                <ul className="mt-5 space-y-3 text-sm leading-relaxed text-[#555]">
                  {missoesData.contribution.notes.map((note) => (
                    <li key={note} className="flex items-start gap-3">
                      <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-[#ef5350]" />
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Link href="/oferta" className="ui-btn-primary">
                    Ir para ofertas
                  </Link>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ui-btn-secondary"
                  >
                    Tirar dúvidas
                  </a>
                </div>
              </article>
            </div>

            <article className="rounded-3xl border border-black/5 bg-white p-6 shadow-[0_6px_24px_rgba(0,0,0,0.04)] md:p-8">
              <p className="text-xs font-bold tracking-widest uppercase text-[#ef5350]">
                Relatórios e intercessão
              </p>
              <h2 className="mt-3 font-acme text-2xl tracking-wide text-[#212121] md:text-3xl">
                {missoesData.prayerAndReports.title}
              </h2>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-[#555] md:text-base md:leading-8">
                {missoesData.prayerAndReports.description}
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ui-btn-primary"
                >
                  Enviar pedido de oração
                </a>
                <Link href="/contato" className="ui-btn-secondary">
                  Falar com a igreja
                </Link>
              </div>
            </article>
          </div>
        </section>
      </main>
    </>
  );
}
