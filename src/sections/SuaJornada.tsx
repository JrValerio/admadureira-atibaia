import ReadingJourneyActions from "@/components/reading/ReadingJourneyActions";
import ReadingPlanProgressSummary from "@/components/reading/ReadingPlanProgressSummary";
import type { SpiritualityHubData } from "@/lib/spirituality-hub";

type SuaJornadaProps = {
  data: SpiritualityHubData;
};

export default function SuaJornada({ data }: SuaJornadaProps) {
  return (
    <section className="mb-12">
      <div className="mb-6 max-w-3xl">
        <p className="text-[#ef5350] text-xs font-bold tracking-widest uppercase mb-3">
          Sua jornada
        </p>
        <h2 className="font-acme text-2xl md:text-4xl text-[#212121] tracking-wide mb-4">
          Retome sua leitura com clareza e constância
        </h2>
        <p className="text-[#555] leading-relaxed">
          Use este bloco para voltar ao ponto onde parou, abrir o dia sugerido
          e acompanhar seu progresso no plano bíblico ao longo do ano.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1.05fr_0.95fr] gap-6">
        <ReadingJourneyActions
          planSlug={data.plan.slug}
          totalDays={data.plan.dias.length}
          suggestedDay={data.suggestedDay}
          suggestedSummary={data.readingSummary}
          title="Sua jornada de hoje"
        />

        <ReadingPlanProgressSummary
          planSlug={data.plan.slug}
          totalDays={data.plan.dias.length}
          todayDay={data.suggestedDay}
        />
      </div>
    </section>
  );
}
