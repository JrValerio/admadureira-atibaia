import Link from "next/link";
import DailySpiritualActions from "@/components/spiritual/DailySpiritualActions";
import { getDevotionalOfTheDay } from "@/data/devocionais";
import { getReadingPlanBySlug, getReadingPlanDailySummary, getSuggestedReadingPlanDay } from "@/data/plano-de-leitura";
import { createBiblePath } from "@/lib/bible-navigation";
import { getDailyVerse } from "@/lib/getDailyVerse";

export default function DailySpiritual() {
  const verse = getDailyVerse();
  const devotional = getDevotionalOfTheDay();
  const annualPlan = getReadingPlanBySlug("biblia-em-1-ano");

  if (!annualPlan || !devotional) {
    return null;
  }

  const suggestedDay = getSuggestedReadingPlanDay(annualPlan);
  const readingDay = annualPlan.dias[suggestedDay - 1];
  const readingSummary = readingDay
    ? getReadingPlanDailySummary(readingDay)
    : "";

  return (
    <section className="bg-[#f5f5f5] py-10 md:py-14">
      <div className="max-w-6xl mx-auto px-4">
        <div className="rounded-[2rem] border border-[#ffa726]/15 bg-[#fff8ee] p-6 md:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
          <div className="mb-8">
            <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-3">
              Hoje com Deus
            </p>
            <h2 className="font-acme text-3xl md:text-5xl text-[#212121] tracking-wide mb-4">
              Palavra, devocional e leitura do dia
            </h2>
            <p className="max-w-3xl text-[#555] leading-relaxed">
              Um ponto de partida diário para abrir a Bíblia, seguir o plano de
              leitura e manter constância espiritual ao longo da semana.
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-[1.05fr_0.95fr] gap-6 mb-6">
            <div className="rounded-3xl bg-white/80 border border-white/60 p-6 md:p-7">
              <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-3">
                Versículo do dia
              </p>
              <p className="text-lg md:text-xl leading-relaxed text-[#3f3f3f] mb-4 max-w-[34ch]">
                &quot;{verse.texto}&quot;
              </p>
              <p className="text-sm font-semibold tracking-[0.16em] uppercase text-[#8b5b18] mb-5">
                {verse.referencia}
              </p>
              <Link
                href={createBiblePath(verse.livroSlug, verse.capitulo)}
                className="text-[#ef5350] text-xs font-semibold tracking-widest uppercase"
              >
                Ler capítulo →
              </Link>
            </div>

            <div className="rounded-3xl bg-white/80 border border-white/60 p-6 md:p-7">
              <p className="text-[#ef5350] text-xs font-bold tracking-widest uppercase mb-3">
                Devocional do dia
              </p>
              <h3 className="font-acme text-3xl text-[#212121] tracking-wide mb-3">
                {devotional.titulo}
              </h3>
              <p className="text-sm text-[#8b5b18] mb-4">{devotional.versiculo}</p>
              <p className="text-[#555] leading-relaxed mb-5">
                {devotional.resumo}
              </p>
              <Link
                href={`/espiritualidade/devocional/${devotional.slug}`}
                className="text-[#ef5350] text-xs font-semibold tracking-widest uppercase"
              >
                Abrir devocional →
              </Link>
            </div>
          </div>

          <div className="rounded-3xl bg-[#212121] p-6 md:p-7 text-white">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-5 items-start">
              <div>
                <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-3">
                  Leitura bíblica do dia
                </p>
                <h3 className="font-acme text-3xl md:text-4xl tracking-wide mb-3">
                  Dia {suggestedDay}
                </h3>
                <p className="text-sm md:text-base text-white/80 leading-relaxed mb-3">
                  {readingSummary}
                </p>
                {readingDay?.foco ? (
                  <p className="text-sm text-white/65 leading-relaxed max-w-3xl">
                    {readingDay.foco}
                  </p>
                ) : null}
              </div>

              <DailySpiritualActions
                planSlug={annualPlan.slug}
                suggestedDay={suggestedDay}
                totalDays={annualPlan.dias.length}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
