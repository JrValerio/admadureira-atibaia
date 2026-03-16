import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import HeroPage from "@/components/HeroPage";
import ReadingJourneyActions from "@/components/reading/ReadingJourneyActions";
import SpiritualNotesCard from "@/components/spiritual/SpiritualNotesCard";
import SpiritualBreadcrumb from "@/components/SpiritualBreadcrumb";
import {
  getDevotionalBySlug,
  getDevotionalDisplayDate,
  getDevotionals,
} from "@/data/devocionais";
import { igrejaHeroMedia } from "@/data/igreja-media";
import {
  getReadingPlanBySlug,
  getReadingPlanDailySummary,
  getSuggestedReadingPlanDay,
} from "@/data/plano-de-leitura";
import { buildPageMetadata, resolveSiteUrl } from "@/lib/site";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function formatDevotionalDate(date: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(`${date}T12:00:00-03:00`));
}

export async function generateStaticParams() {
  return getDevotionals().map((devotional) => ({
    slug: devotional.slug,
  }));
}

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const devotional = getDevotionalBySlug(slug);

  if (!devotional) {
    return {
      title: "Devocional não encontrado | AD Madureira Atibaia",
    };
  }

  return buildPageMetadata({
    title: `${devotional.titulo} | Devocional`,
    description: devotional.resumo,
    path: `/espiritualidade/devocional/${devotional.slug}`,
    image: devotional.imagem ?? igrejaHeroMedia.devocional,
  });
}

export default async function DevotionalDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const devotional = getDevotionalBySlug(slug);

  if (!devotional) {
    notFound();
  }

  const relatedDevotionals = getDevotionals()
    .filter((item) => item.slug !== devotional.slug)
    .slice(0, 2);
  const devotionalDisplayDate = getDevotionalDisplayDate(devotional);
  const annualPlan = getReadingPlanBySlug("biblia-em-1-ano");
  const suggestedDay = annualPlan ? getSuggestedReadingPlanDay(annualPlan) : null;
  const suggestedDaySummary =
    annualPlan && suggestedDay
      ? getReadingPlanDailySummary(annualPlan.dias[suggestedDay - 1])
      : "";

  const devotionalSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: devotional.titulo,
    description: devotional.resumo,
    datePublished: devotionalDisplayDate,
    inLanguage: "pt-BR",
    image: resolveSiteUrl(devotional.imagem ?? igrejaHeroMedia.devocional),
    mainEntityOfPage: resolveSiteUrl(
      `/espiritualidade/devocional/${devotional.slug}`
    ),
    publisher: {
      "@type": "Church",
      name: "AD Madureira Atibaia",
      url: resolveSiteUrl(""),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(devotionalSchema) }}
      />
      <HeroPage
        variant="full"
        label="Devocional"
        title={devotional.titulo}
        description={devotional.resumo}
        image={devotional.imagem ?? igrejaHeroMedia.devocional}
        imageAlt={devotional.titulo}
      />

      <section className="py-8 md:py-16">
        <div className="max-w-5xl mx-auto px-4">
          <SpiritualBreadcrumb
            items={[
              { label: "Espiritualidade", href: "/espiritualidade" },
              { label: "Devocional", href: "/espiritualidade/devocional" },
              { label: devotional.titulo },
            ]}
          />

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8">
            <article className="space-y-6">
              <div className="rounded-3xl bg-white border border-black/5 p-6 md:p-8 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <div className="rounded-2xl bg-[#fff8ee] border border-[#ffa726]/20 p-4">
                    <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-1">
                      Publicado em
                    </p>
                    <p className="text-[#212121] text-sm">
                      {formatDevotionalDate(devotionalDisplayDate)}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-[#fff8ee] border border-[#ffa726]/20 p-4">
                    <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-1">
                      Tempo de leitura
                    </p>
                    <p className="text-[#212121] text-sm">{devotional.tempoLeitura}</p>
                  </div>
                </div>

                <div className="rounded-3xl bg-[#fff8ee] border border-[#ffa726]/20 p-6 md:p-8 mb-8">
                  <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-3">
                    Versículo-base
                  </p>
                  <p className="font-acme text-2xl md:text-3xl text-[#212121] tracking-wide mb-4">
                    {devotional.versiculo}
                  </p>
                  <p className="text-[#555] leading-relaxed italic">
                    &quot;{devotional.textoBase}&quot;
                  </p>
                </div>

                <div className="space-y-4 text-[#555] leading-relaxed">
                  {devotional.reflexao.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl bg-white border border-black/5 p-6 md:p-8 shadow-sm">
                <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-4">
                  Aplicação prática
                </p>
                <ul className="space-y-3 text-[#555] leading-relaxed">
                  {devotional.aplicacao.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-[#ef5350]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl bg-[#fff8ee] border border-[#ffa726]/20 p-6 md:p-8 shadow-sm">
                <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-4">
                  Oração
                </p>
                <p className="text-[#555] leading-relaxed">{devotional.oracao}</p>
              </div>

              <SpiritualNotesCard
                noteKey={`devotional:${devotional.slug}`}
                title="Minhas anotações do devocional"
                description="Registre aqui o que Deus ministrou ao seu coração, decisões práticas e pedidos de oração relacionados a esta reflexão."
              />
            </article>

            <aside className="space-y-6">
              {annualPlan && suggestedDay ? (
                <ReadingJourneyActions
                  planSlug={annualPlan.slug}
                  totalDays={annualPlan.dias.length}
                  suggestedDay={suggestedDay}
                  suggestedSummary={suggestedDaySummary}
                  title="Próximo passo na Palavra"
                  description="Aproveite este momento para retomar sua leitura bíblica e abrir o dia sugerido da jornada anual."
                />
              ) : null}

              <div className="rounded-3xl bg-white border border-black/5 p-6 shadow-sm">
                <p className="text-[#ef5350] text-xs font-bold tracking-widest uppercase mb-3">
                  Continue a leitura
                </p>
                <div className="space-y-4">
                  {relatedDevotionals.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/espiritualidade/devocional/${item.slug}`}
                      className="block rounded-2xl border border-black/5 px-4 py-4 transition-colors hover:border-[#ffa726]/25 hover:bg-[#fff8ee]"
                    >
                      <p className="font-semibold text-[#212121] mb-2">
                        {item.titulo}
                      </p>
                      <p className="text-sm text-[#777] leading-relaxed">
                        {item.resumo}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl bg-white border border-black/5 p-6 shadow-sm">
                <p className="text-[#ef5350] text-xs font-bold tracking-widest uppercase mb-3">
                  Próximo passo
                </p>
                <div className="space-y-3">
                  <Link
                    href="/espiritualidade/plano-de-leitura"
                    className="block text-[#212121] transition-colors hover:text-[#ef5350]"
                  >
                    Seguir um plano de leitura
                  </Link>
                  <Link
                    href="/espiritualidade/biblia"
                    className="block text-[#212121] transition-colors hover:text-[#ef5350]"
                  >
                    Abrir a Bíblia Online
                  </Link>
                  <Link
                    href="/espiritualidade/podcast"
                    className="block text-[#212121] transition-colors hover:text-[#ef5350]"
                  >
                    Continue com ouvir reflexões em áudio
                  </Link>
                  <Link
                    href="/oracao"
                    className="block text-[#212121] transition-colors hover:text-[#ef5350]"
                  >
                    Enviar um pedido de oração
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
