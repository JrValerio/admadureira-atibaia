import HeroPage from "@/components/HeroPage";
import SpiritualBreadcrumb from "@/components/SpiritualBreadcrumb";
import {
  getReadingPlanBySlug,
  getReadingPlans,
} from "@/data/plano-de-leitura";
import { buildPageMetadata } from "@/lib/site";

type PageProps = {
  searchParams: Promise<{
    plano?: string;
  }>;
};

export const metadata = buildPageMetadata({
  title: "Plano de Leitura | AD Madureira Atibaia",
  description:
    "Escolha um plano de leitura bíblica, acompanhe a sugestão do dia e mantenha constância na leitura da Palavra.",
  path: "/espiritualidade/plano-de-leitura",
  image: "/fachada-da-igreja.jpg",
});

function getDayOfYear() {
  const today = new Date();
  const start = new Date(today.getFullYear(), 0, 0);
  const diff = today.getTime() - start.getTime();

  return Math.floor(diff / 86400000);
}

export default async function PlanoDeLeituraPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const readingPlans = getReadingPlans();
  const selectedPlanCandidate =
    typeof params.plano === "string"
      ? getReadingPlanBySlug(params.plano)
      : null;
  const selectedPlan = selectedPlanCandidate ?? readingPlans[0];
  const suggestedDay =
    ((getDayOfYear() - 1) % selectedPlan.dias.length) + 1;

  return (
    <>
      <HeroPage
        variant="full"
        label="Constância na Palavra"
        title="Plano de Leitura"
        description="Escolha um plano de leitura bíblica e avance com constância na Palavra de Deus ao longo dos dias."
        image="/fachada-da-igreja.jpg"
        imageAlt="Fachada da AD Madureira Atibaia"
      />

      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <SpiritualBreadcrumb
            items={[
              { label: "Espiritualidade", href: "/espiritualidade" },
              { label: "Plano de Leitura" },
            ]}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {readingPlans.map((plan) => {
              const isActive = plan.slug === selectedPlan.slug;

              return (
                <a
                  key={plan.slug}
                  href={`/espiritualidade/plano-de-leitura?plano=${plan.slug}`}
                  className={`rounded-3xl border p-6 md:p-8 shadow-sm transition-colors ${
                    isActive
                      ? "bg-[#fff8ee] border-[#ffa726]/25"
                      : "bg-white border-black/5 hover:border-[#ffa726]/25"
                  }`}
                >
                  <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-3">
                    {plan.duracaoLabel}
                  </p>
                  <h2 className="font-acme text-3xl text-[#212121] tracking-wide mb-4">
                    {plan.titulo}
                  </h2>
                  <p className="text-[#555] leading-relaxed mb-4">
                    {plan.descricao}
                  </p>
                  <p className="text-sm text-[#777]">
                    Ideal para: {plan.idealPara}
                  </p>
                </a>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 mb-12">
            <div className="rounded-3xl bg-white border border-black/5 p-6 md:p-8 shadow-sm">
              <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-3">
                Plano selecionado
              </p>
              <h2 className="font-acme text-3xl md:text-4xl text-[#212121] tracking-wide mb-4">
                {selectedPlan.titulo}
              </h2>
              <div className="space-y-4 text-[#555] leading-relaxed">
                <p>{selectedPlan.descricao}</p>
                <p>
                  <span className="font-semibold text-[#212121]">Ideal para:</span>{" "}
                  {selectedPlan.idealPara}
                </p>
                <p>
                  <span className="font-semibold text-[#212121]">Versículo-base:</span>{" "}
                  {selectedPlan.versiculoBase}
                </p>
              </div>
            </div>

            <div className="rounded-3xl bg-[#fff8ee] border border-[#ffa726]/20 p-6 shadow-sm">
              <p className="text-[#ef5350] text-xs font-bold tracking-widest uppercase mb-3">
                Sugestão para hoje
              </p>
              <p className="font-acme text-4xl text-[#212121] tracking-wide mb-3">
                Dia {suggestedDay}
              </p>
              <div className="space-y-2 text-sm text-[#555] leading-relaxed">
                {selectedPlan.dias
                  .filter((day) => day.dia === suggestedDay)
                  .flatMap((day) => day.leituras)
                  .map((reading) => (
                    <p key={reading}>{reading}</p>
                  ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {selectedPlan.dias.map((day) => {
              const isSuggested = day.dia === suggestedDay;

              return (
                <article
                  key={`${selectedPlan.slug}-${day.dia}`}
                  className={`rounded-3xl border p-6 shadow-sm ${
                    isSuggested
                      ? "bg-[#fff8ee] border-[#ffa726]/25"
                      : "bg-white border-black/5"
                  }`}
                >
                  <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-3">
                    Dia {day.dia}
                  </p>
                  <div className="space-y-2 mb-4">
                    {day.leituras.map((reading) => (
                      <p
                        key={reading}
                        className="font-semibold text-[#212121] leading-relaxed"
                      >
                        {reading}
                      </p>
                    ))}
                  </div>
                  <p className="text-sm text-[#555] leading-relaxed">{day.foco}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
