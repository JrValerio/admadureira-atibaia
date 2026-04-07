import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import HeroPage from "@/components/HeroPage";
import ContinueReading from "@/components/reading/ContinueReading";
import ReadingDayCompletionButton from "@/components/reading/ReadingDayCompletionButton";
import ReadingPlanProgressSummary from "@/components/reading/ReadingPlanProgressSummary";
import SpiritualBreadcrumb from "@/components/SpiritualBreadcrumb";
import ReadingPlanCard from "@/components/reading/ReadingPlanCard";
import { getDevotionalOfTheDay } from "@/data/devocionais";
import { igrejaHeroMedia } from "@/data/igreja-media";
import {
  createReadingPlanDayPath,
  getReadingPlanBySlug,
  getReadingPlanDailySummary,
  getReadingPlans,
  getSuggestedReadingPlanDay,
} from "@/data/plano-de-leitura";
import { buildPageMetadata } from "@/lib/site";

type PageProps = {
  searchParams: Promise<{
    plano?: string;
  }>;
};

export const metadata: Metadata = buildPageMetadata({
  title: "Planos de Leitura | AD Madureira Atibaia",
  description:
    "Escolha um plano de leitura bíblica, acompanhe sua jornada espiritual e avance na Palavra com constância.",
  path: "/espiritualidade/plano-de-leitura",
  image: igrejaHeroMedia.planoDeLeitura,
  keywords: [
    "plano de leitura bíblica",
    "bíblia em 1 ano",
    "salmos em 30 dias",
    "evangelhos em 40 dias",
  ],
});

export const revalidate = 3600;

export default async function PlanoDeLeituraPage({ searchParams }: PageProps) {
  const params = await searchParams;

  if (typeof params.plano === "string") {
    const legacyPlan = getReadingPlanBySlug(params.plano);

    if (legacyPlan) {
      redirect(`/espiritualidade/plano-de-leitura/${legacyPlan.slug}`);
    }
  }

  const readingPlans = getReadingPlans();
  const annualPlan = getReadingPlanBySlug("biblia-em-1-ano");
  const dailyDevotional = getDevotionalOfTheDay();
  const suggestedAnnualDay = annualPlan ? getSuggestedReadingPlanDay(annualPlan) : null;
  const annualDay =
    annualPlan && suggestedAnnualDay
      ? annualPlan.dias[suggestedAnnualDay - 1] ?? null
      : null;

  return (
    <>
      <HeroPage
        variant="full"
        label="Constância na Palavra"
        title="Planos de Leitura"
        description="Escolha um plano, organize sua jornada espiritual e avance com constância na leitura bíblica ao longo dos dias."
        image={igrejaHeroMedia.planoDeLeitura}
        imageAlt="Púlpito da AD Madureira Atibaia"
      />

      <section className="py-16 md:py-20">
        <div className="ui-page-container">
          <SpiritualBreadcrumb
            items={[
              { label: "Espiritualidade", href: "/espiritualidade" },
              { label: "Planos de Leitura" },
            ]}
          />

          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 mb-12">
            <div className="rounded-3xl bg-white border border-black/5 p-6 md:p-8 shadow-sm">
              <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-3">
                Jornada organizada
              </p>
              <h1 className="font-acme text-xl md:text-3xl lg:text-4xl text-[#212121] tracking-wide mb-5">
                Descubra planos para leitura diária e progresso espiritual
              </h1>
              <div className="space-y-4 text-[#555] leading-relaxed">
                <p>
                  A proposta desta área é oferecer jornadas claras para quem
                  deseja manter constância na leitura bíblica, com planos
                  completos, ritmo diário e acesso rápido aos capítulos.
                </p>
                <p>
                  Você pode começar por um plano curto, como Salmos em 30 dias,
                  ou seguir uma jornada completa, como a Bíblia em 1 ano.
                </p>
              </div>
            </div>

            <div className="rounded-3xl bg-[#fff8ee] border border-[#ffa726]/20 p-6 md:p-8 shadow-sm">
              <p className="text-[#ef5350] text-xs font-bold tracking-widest uppercase mb-3">
                Como funciona
              </p>
              <ul className="space-y-4 text-[#555] text-sm leading-relaxed">
                <li className="flex items-start gap-3">
                  <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-[#ef5350]" />
                  <span>Escolha um plano conforme seu momento espiritual.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-[#ef5350]" />
                  <span>Acompanhe a sequência diária com foco e referências.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-[#ef5350]" />
                  <span>Abra cada capítulo diretamente na Bíblia Online.</span>
                </li>
              </ul>
            </div>
          </div>

          {annualPlan && annualDay ? (
            <div className="grid grid-cols-1 xl:grid-cols-[1.05fr_0.95fr] gap-8 mb-12">
              <div className="rounded-3xl bg-white border border-black/5 p-6 md:p-8 shadow-sm">
                <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-3">
                  Bíblia em 1 ano
                </p>
                <h2 className="font-acme text-xl md:text-3xl lg:text-4xl text-[#212121] tracking-wide mb-4">
                  Leitura e devocional de hoje
                </h2>
                <p className="text-sm text-[#777] mb-4">
                  Dia {annualDay.dia} • {getReadingPlanDailySummary(annualDay)}
                </p>
                {annualDay.foco ? (
                  <p className="text-[#555] leading-relaxed mb-6">{annualDay.foco}</p>
                ) : null}

                <div className="rounded-2xl border border-black/5 bg-[#fafafa] p-5 mb-6">
                  <p className="text-[#ef5350] text-xs font-bold tracking-widest uppercase mb-2">
                    Devocional do dia
                  </p>
                  {dailyDevotional ? (
                    <>
                      <h3 className="font-semibold text-[#212121] text-lg mb-2">
                        {dailyDevotional.titulo}
                      </h3>
                      <p className="text-sm text-[#8b5b18] mb-3">
                        {dailyDevotional.versiculo}
                      </p>
                      <p className="text-sm text-[#555] leading-relaxed mb-4">
                        {dailyDevotional.resumo}
                      </p>
                      <Link
                        href={`/espiritualidade/devocional/${dailyDevotional.slug}`}
                        className="text-[#ef5350] text-xs font-semibold tracking-widest uppercase"
                      >
                        Ler devocional completo →
                      </Link>
                    </>
                  ) : (
                    <p className="text-sm text-[#555] leading-relaxed">
                      Nenhum devocional disponível hoje.
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap gap-3 mb-6">
                  <Link
                    href={createReadingPlanDayPath(annualPlan.slug, annualDay.dia)}
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-[#ffa726] px-5 py-3 text-xs font-bold tracking-widest uppercase text-[#212121] transition-colors hover:bg-[#ffb74d]"
                  >
                    Abrir leitura do dia
                  </Link>
                  <ReadingDayCompletionButton
                    planSlug={annualPlan.slug}
                    day={annualDay.dia}
                  />
                </div>
                <ContinueReading
                  planSlug={annualPlan.slug}
                  totalDays={annualPlan.dias.length}
                />
              </div>

              <ReadingPlanProgressSummary
                planSlug={annualPlan.slug}
                totalDays={annualPlan.dias.length}
                todayDay={annualDay.dia}
              />
            </div>
          ) : null}

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {readingPlans.map((plan) => (
              <ReadingPlanCard key={plan.slug} plan={plan} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
