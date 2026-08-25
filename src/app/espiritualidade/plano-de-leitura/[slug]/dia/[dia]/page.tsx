import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import HeroPage from "@/components/HeroPage";
import ReadingDayCompletionButton from "@/components/reading/ReadingDayCompletionButton";
import ReadingProgressTracker from "@/components/reading/ReadingProgressTracker";
import SpiritualNotesCard from "@/components/spiritual/SpiritualNotesCard";
import SpiritualBreadcrumb from "@/components/SpiritualBreadcrumb";
import {
  createReadingPlanDayPath,
  getReadingPlanBySlug,
  getReadingPlanDay,
  getReadingPlanDailySummary,
} from "@/data/plano-de-leitura";
import { getBibleBookBySlug } from "@/data/biblia-livros";
import { igrejaHeroMedia } from "@/data/igreja-media";
import { getBibleChapter } from "@/lib/bible-api";
import { createBiblePath } from "@/lib/bible-navigation";
import { buildPageMetadata } from "@/lib/site";

type PageProps = {
  params: Promise<{
    slug: string;
    dia: string;
  }>;
};

function parseDay(value: string) {
  const parsed = Number(value);

  if (!Number.isFinite(parsed)) {
    return null;
  }

  return Math.floor(parsed);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, dia } = await params;
  const plan = getReadingPlanBySlug(slug);
  const parsedDay = parseDay(dia);

  if (!plan || parsedDay === null) {
    return buildPageMetadata({
      title: "Plano de Leitura | AD Madureira Atibaia",
      description:
        "Acompanhe dias e leituras dos planos bíblicos da área de espiritualidade.",
      path: "/espiritualidade/plano-de-leitura",
      image: igrejaHeroMedia.planoDeLeitura,
    });
  }

  const day = getReadingPlanDay(plan, parsedDay);

  if (!day) {
    return buildPageMetadata({
      title: `${plan.titulo} | Plano de Leitura`,
      description: plan.descricao,
      path: `/espiritualidade/plano-de-leitura/${plan.slug}`,
      image: plan.imagem,
    });
  }

  return buildPageMetadata({
    title: `${plan.titulo} · Dia ${day.dia} | Plano de Leitura`,
    description: getReadingPlanDailySummary(day),
    path: createReadingPlanDayPath(plan.slug, day.dia),
    image: plan.imagem,
    keywords: [plan.titulo.toLowerCase(), `dia ${day.dia}`, "leitura bíblica diária"],
  });
}

export default async function ReadingPlanDayPage({ params }: PageProps) {
  const { slug, dia } = await params;
  const plan = getReadingPlanBySlug(slug);
  const parsedDay = parseDay(dia);

  if (!plan || parsedDay === null) {
    notFound();
  }

  const day = getReadingPlanDay(plan, parsedDay);

  if (!day) {
    notFound();
  }

  const readings = await Promise.all(
    day.leituras.map(async (reading) => {
      const book = getBibleBookBySlug(reading.livroSlug);

      if (!book) {
        return {
          reading,
          book: null,
          chapterData: null,
          error: "Livro não encontrado neste momento.",
        };
      }

      try {
        const chapterData = await getBibleChapter(book.id, reading.capitulo);

        return {
          reading,
          book,
          chapterData,
          error: "",
        };
      } catch {
        return {
          reading,
          book,
          chapterData: null,
          error:
            "Não foi possível carregar este capítulo agora. Tente novamente em instantes.",
        };
      }
    })
  );

  const previousDay =
    day.dia > 1 ? createReadingPlanDayPath(plan.slug, day.dia - 1) : null;
  const nextDay =
    day.dia < plan.dias.length
      ? createReadingPlanDayPath(plan.slug, day.dia + 1)
      : null;

  return (
    <>
      <ReadingProgressTracker planSlug={plan.slug} day={day.dia} />
      <HeroPage
        variant="full"
        label="Leitura diária"
        title={`${plan.titulo} · Dia ${day.dia}`}
        description={
          day.foco ??
          "Siga a leitura proposta para hoje e avance com constância na Palavra de Deus."
        }
        image={plan.imagem}
        imageAlt={plan.titulo}
      />

      <section className="py-16 md:py-20">
        <div className="ui-page-container">
          <SpiritualBreadcrumb
            items={[
              { label: "Espiritualidade", href: "/espiritualidade" },
              { label: "Planos de Leitura", href: "/espiritualidade/plano-de-leitura" },
              { label: plan.titulo, href: `/espiritualidade/plano-de-leitura/${plan.slug}` },
              { label: `Dia ${day.dia}` },
            ]}
          />

          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 mb-8">
            <div className="rounded-3xl bg-white border border-black/5 p-6 md:p-8 shadow-sm">
              <p className="ui-card-eyebrow mb-3">
                Leituras do dia
              </p>
              <h2 className="font-acme text-xl md:text-3xl lg:text-4xl text-[#212121] tracking-wide mb-4">
                Dia {day.dia}
              </h2>
              <p className="text-[#555] leading-relaxed mb-5">
                {getReadingPlanDailySummary(day)}
              </p>
              {day.foco ? (
                <p className="text-sm text-[#555] leading-relaxed">{day.foco}</p>
              ) : null}
            </div>

            <div className="rounded-3xl bg-[#fff8ee] border border-[#ffa726]/20 p-6 md:p-8 shadow-sm">
              <p className="text-[#ef5350] text-xs font-bold tracking-widest uppercase mb-3">
                Navegação do plano
              </p>
              <div className="flex flex-wrap gap-3 mb-5">
                {previousDay ? (
                  <Link
                    href={previousDay}
                    className="inline-flex items-center justify-center rounded-full border border-[#212121] px-5 py-3 text-xs font-bold tracking-widest uppercase text-[#212121] transition-colors hover:bg-[#212121] hover:text-white"
                  >
                    Dia anterior
                  </Link>
                ) : null}
                {nextDay ? (
                  <Link
                    href={nextDay}
                    className="inline-flex items-center justify-center rounded-full bg-[#ffa726] px-5 py-3 text-xs font-bold tracking-widest uppercase text-[#212121] transition-colors hover:bg-[#ffb74d]"
                  >
                    Próximo dia
                  </Link>
                ) : null}
                <ReadingDayCompletionButton planSlug={plan.slug} day={day.dia} />
              </div>
              <Link
                href={`/espiritualidade/plano-de-leitura/${plan.slug}`}
                className="text-[#ef5350] text-xs font-semibold tracking-widest uppercase"
              >
                Voltar ao plano →
              </Link>
            </div>
          </div>

          <div className="mb-8">
            <SpiritualNotesCard
              noteKey={`reading-plan:${plan.slug}:day:${day.dia}`}
              title="Minhas anotações deste dia"
              description="Anote aprendizados, orações e aplicações práticas desta leitura para continuar crescendo com constância na Palavra."
            />
          </div>

          <div className="space-y-8">
            {readings.map(({ reading, book, chapterData, error }) => {
              const title = book
                ? `${book.nome} ${reading.capitulo}`
                : `${reading.livroSlug} ${reading.capitulo}`;

              return (
                <article
                  key={`${reading.livroSlug}-${reading.capitulo}`}
                  className="rounded-3xl bg-white border border-black/5 p-6 md:p-8 shadow-sm"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 items-start mb-6">
                    <div>
                      <p className="ui-card-eyebrow mb-2">
                        Capítulo da leitura
                      </p>
                      <h2 className="font-acme text-xl md:text-3xl text-[#212121] tracking-wide mb-3">
                        {title}
                      </h2>
                      <p className="text-sm text-[#777]">
                        Abra este capítulo separadamente na Bíblia Online.
                      </p>
                    </div>

                    {book ? (
                      <Link
                        href={createBiblePath(book.slug, reading.capitulo)}
                        className="inline-flex items-center justify-center rounded-full border border-[#212121] px-5 py-3 text-xs font-bold tracking-widest uppercase text-[#212121] transition-colors hover:bg-[#212121] hover:text-white"
                      >
                        Abrir capítulo
                      </Link>
                    ) : null}
                  </div>

                  {error ? (
                    <div className="rounded-2xl border border-red-200 bg-[#fff5f5] px-5 py-4 text-sm leading-relaxed text-[#6a3f3f]">
                      {error}
                    </div>
                  ) : (
                    <div className="space-y-5">
                      {chapterData?.versiculos.map((verse) => (
                        <p key={verse.numero} className="text-[#4f4f4f] leading-relaxed">
                          <span className="mr-3 font-semibold text-[#ef5350]">
                            {verse.numero}
                          </span>
                          {verse.texto}
                        </p>
                      ))}
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
