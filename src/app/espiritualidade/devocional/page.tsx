import type { Metadata } from "next";
import Link from "next/link";
import HeroPage from "@/components/HeroPage";
import SpiritualBreadcrumb from "@/components/SpiritualBreadcrumb";
import { getDevotionals } from "@/data/devocionais";
import { buildPageMetadata } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: "Devocional | AD Madureira Atibaia",
  description:
    "Leia devocionais com versículo, reflexão, aplicação e oração na área de espiritualidade da AD Madureira Atibaia.",
  path: "/espiritualidade/devocional",
  image: "/pulpito-da-igreja.jpg",
});

function formatDevotionalDate(date: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(`${date}T12:00:00-03:00`));
}

export default function DevocionalPage() {
  const devotionals = getDevotionals();

  return (
    <>
      <HeroPage
        variant="full"
        label="Reflexão diária"
        title="Devocional"
        description="Leia reflexões curtas com base bíblica, aplicação prática e oração para fortalecer sua caminhada com Deus."
        image="/pulpito-da-igreja.jpg"
        imageAlt="Púlpito da AD Madureira Atibaia"
      />

      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <SpiritualBreadcrumb
            items={[
              { label: "Espiritualidade", href: "/espiritualidade" },
              { label: "Devocional" },
            ]}
          />
          <div className="rounded-3xl bg-[#fff8ee] border border-[#ffa726]/20 p-6 md:p-8 max-w-4xl mx-auto mb-12">
            <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-3">
              Caminhada diária
            </p>
            <p className="text-[#555] leading-relaxed">
              Cada devocional reúne um versículo, uma reflexão breve, aplicações
              simples e uma oração final. A proposta é incentivar constância
              espiritual durante a semana.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {devotionals.map((devotional) => (
              <Link
                key={devotional.slug}
                href={`/espiritualidade/devocional/${devotional.slug}`}
                className="group rounded-3xl bg-white border border-black/5 p-6 md:p-8 shadow-sm hover:shadow-[0_10px_30px_rgba(0,0,0,0.07)] transition-shadow"
              >
                <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-3">
                  {formatDevotionalDate(devotional.data)}
                </p>
                <h2 className="font-acme text-3xl text-[#212121] tracking-wide mb-4 group-hover:text-[#ef5350] transition-colors">
                  {devotional.titulo}
                </h2>
                <p className="text-sm text-[#777] mb-4">{devotional.versiculo}</p>
                <p className="text-[#555] leading-relaxed mb-6">
                  {devotional.resumo}
                </p>
                <p className="text-[#ef5350] text-xs font-semibold tracking-widest uppercase">
                  Ler devocional →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
