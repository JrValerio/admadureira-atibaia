import type { Metadata } from "next";
import { redirect } from "next/navigation";
import HeroPage from "@/components/HeroPage";
import SpiritualBreadcrumb from "@/components/SpiritualBreadcrumb";
import ReadingPlanCard from "@/components/reading/ReadingPlanCard";
import { getReadingPlanBySlug, getReadingPlans } from "@/data/plano-de-leitura";
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
  image: "/pulpito-da-igreja.jpg",
  keywords: [
    "plano de leitura bíblica",
    "bíblia em 1 ano",
    "salmos em 30 dias",
    "evangelhos em 40 dias",
  ],
});

export default async function PlanoDeLeituraPage({ searchParams }: PageProps) {
  const params = await searchParams;

  if (typeof params.plano === "string") {
    const legacyPlan = getReadingPlanBySlug(params.plano);

    if (legacyPlan) {
      redirect(`/espiritualidade/plano-de-leitura/${legacyPlan.slug}`);
    }
  }

  const readingPlans = getReadingPlans();

  return (
    <>
      <HeroPage
        variant="full"
        label="Constância na Palavra"
        title="Planos de Leitura"
        description="Escolha um plano, organize sua jornada espiritual e avance com constância na leitura bíblica ao longo dos dias."
        image="/pulpito-da-igreja.jpg"
        imageAlt="Púlpito da AD Madureira Atibaia"
      />

      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
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
              <h1 className="font-acme text-3xl md:text-4xl text-[#212121] tracking-wide mb-5">
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
                  <span>Abra cada capítulo diretamente na Bíblia Online do site.</span>
                </li>
              </ul>
            </div>
          </div>

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
