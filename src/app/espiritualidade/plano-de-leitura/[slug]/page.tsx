import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ContinueReading from "@/components/reading/ContinueReading";
import HeroPage from "@/components/HeroPage";
import ReadingDayCompletionButton from "@/components/reading/ReadingDayCompletionButton";
import ReadingPlanProgressSummary from "@/components/reading/ReadingPlanProgressSummary";
import SpiritualBreadcrumb from "@/components/SpiritualBreadcrumb";
import { getDevotionalOfTheDay } from "@/data/devocionais";
import { igrejaHeroMedia } from "@/data/igreja-media";
import {
  createReadingPlanDayPath,
  getReadingPlanBySlug,
  getReadingPlanDailySummary,
  getReadingPlanSummary,
  getSuggestedReadingPlanDay,
} from "@/data/plano-de-leitura";
import { buildPageMetadata } from "@/lib/site";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const revalidate = 3600;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const plan = getReadingPlanBySlug(slug);

  if (!plan) {
    return buildPageMetadata({
      title: "Planos de Leitura | AD Madureira Atibaia",
      description:
        "Escolha um plano de leitura bíblica na área de espiritualidade da AD Madureira Atibaia.",
      path: "/espiritualidade/plano-de-leitura",
      image: igrejaHeroMedia.planoDeLeitura,
    });
  }

  return buildPageMetadata({
    title: `${plan.titulo} | Plano de Leitura`,
    description: plan.descricao,
    path: `/espiritualidade/plano-de-leitura/${plan.slug}`,
    image: plan.imagem,
    keywords: [plan.titulo.toLowerCase(), "plano de leitura bíblica", plan.versiculoBase],
  });
}

export default async function ReadingPlanDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const plan = getReadingPlanBySlug(slug);

  if (!plan) {
    notFound();
  }

  const suggestedDay = getSuggestedReadingPlanDay(plan);
  const dailyDevotional = getDevotionalOfTheDay();

  return (
    <>
      <HeroPage
        variant="full"
        label="Plano de leitura"
        title={plan.titulo}
        description={plan.descricao}
        image={plan.imagem}
        imageAlt={plan.titulo}
      />

      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <SpiritualBreadcrumb
            items={[
              { label: "Espiritualidade", href: "/espiritualidade" },
              { label: "Planos de Leitura", href: "/espiritualidade/plano-de-leitura" },
              { label: plan.titulo },
            ]}
          />

          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 mb-12">
            <div className="rounded-3xl bg-white border border-black/5 p-6 md:p-8 shadow-sm">
              <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-3">
                Visão geral do plano
              </p>
              <h1 className="font-acme text-3xl md:text-4xl text-[#212121] tracking-wide mb-5">
                {plan.titulo}
              </h1>
              <div className="space-y-4 text-[#555] leading-relaxed">
                <p>{plan.descricao}</p>
                <p>
                  <span className="font-semibold text-[#212121]">Ideal para:</span>{" "}
                  {plan.idealPara}
                </p>
                <p>
                  <span className="font-semibold text-[#212121]">Versículo-base:</span>{" "}
                  {plan.versiculoBase}
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-3 text-[11px] font-semibold tracking-[0.16em] uppercase text-[#777]">
                <span className="rounded-full bg-[#fff8ee] px-3 py-2 text-[#8b5b18]">
                  {plan.duracaoLabel}
                </span>
                <span className="rounded-full border border-black/10 px-3 py-2">
                  {plan.destaque}
                </span>
              </div>
            </div>

            <div className="rounded-3xl bg-[#fff8ee] border border-[#ffa726]/20 p-6 md:p-8 shadow-sm">
              <p className="text-[#ef5350] text-xs font-bold tracking-widest uppercase mb-3">
                Sugestão para hoje
              </p>
              <ContinueReading planSlug={plan.slug} totalDays={plan.dias.length} />
              <p className="font-acme text-4xl text-[#212121] tracking-wide mb-3">
                Dia {suggestedDay}
              </p>
              <p className="text-sm text-[#555] leading-relaxed mb-4">
                {getReadingPlanDailySummary(plan.dias[suggestedDay - 1])}
              </p>
              <p className="text-xs text-[#777] mb-6">
                Abra o dia sugerido para hoje ou retome do ponto em que você parou.
              </p>
              <Link
                href={createReadingPlanDayPath(plan.slug, suggestedDay)}
                className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-[#ffa726] px-5 py-3 text-xs font-bold tracking-widest uppercase text-[#212121] transition-colors hover:bg-[#ffb74d]"
              >
                Abrir dia sugerido
              </Link>
              <div className="mt-3">
                <ReadingDayCompletionButton planSlug={plan.slug} day={suggestedDay} />
              </div>
            </div>
          </div>

          {plan.slug === "biblia-em-1-ano" && dailyDevotional ? (
            <div className="rounded-3xl bg-white border border-black/5 p-6 md:p-8 shadow-sm mb-8">
              <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-3">
                Devocional do dia
              </p>
              <h2 className="font-acme text-3xl text-[#212121] tracking-wide mb-3">
                {dailyDevotional.titulo}
              </h2>
              <p className="text-sm text-[#8b5b18] mb-4">{dailyDevotional.versiculo}</p>
              <p className="text-[#555] leading-relaxed mb-5">
                {dailyDevotional.resumo}
              </p>
              <Link
                href={`/espiritualidade/devocional/${dailyDevotional.slug}`}
                className="text-[#ef5350] text-xs font-semibold tracking-widest uppercase"
              >
                Ler devocional completo →
              </Link>
            </div>
          ) : null}

          <div className="mb-8">
            <ReadingPlanProgressSummary
              planSlug={plan.slug}
              totalDays={plan.dias.length}
              todayDay={suggestedDay}
              showCalendar={plan.slug === "biblia-em-1-ano"}
            />
          </div>

          <div className="rounded-3xl bg-white border border-black/5 p-6 md:p-8 shadow-sm">
            <div className="mb-8">
              <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-3">
                Jornada completa
              </p>
              <h2 className="font-acme text-3xl text-[#212121] tracking-wide mb-4">
                Dias do plano
              </h2>
              <p className="text-[#555] leading-relaxed">
                {getReadingPlanSummary(plan)}. Cada dia leva para uma página própria
                com a leitura organizada e acesso direto aos capítulos.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {plan.dias.map((day) => (
                <Link
                  key={`${plan.slug}-${day.dia}`}
                  href={createReadingPlanDayPath(plan.slug, day.dia)}
                  className={`rounded-3xl border p-5 shadow-sm transition-colors ${
                    day.dia === suggestedDay
                      ? "bg-[#fff8ee] border-[#ffa726]/25"
                      : "bg-[#fafafa] border-black/5 hover:border-[#ffa726]/25"
                  }`}
                >
                  <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-3">
                    Dia {day.dia}
                  </p>
                  <p className="font-semibold text-[#212121] leading-relaxed mb-3">
                    {getReadingPlanDailySummary(day)}
                  </p>
                  {day.foco ? (
                    <p className="text-sm text-[#555] leading-relaxed mb-5">
                      {day.foco}
                    </p>
                  ) : null}
                  <p className="text-[#ef5350] text-xs font-semibold tracking-widest uppercase">
                    Abrir dia →
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
