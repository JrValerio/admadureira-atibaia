import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  CHURCH_DISPLAY_NAME,
  SEDE_PROGRAMACAO_LOCATION,
  SEDE_WHATSAPP_URL,
} from "@/data/site";
import { cursoTeologiaData } from "@/data/curso-teologia";
import { buildPageMetadata, resolveSiteUrl } from "@/lib/site";

export const revalidate = 3600;

const coursePath = "/programacao/curso-de-teologia";
const heroImage = "/banners/banner-curso-de-teologia.webp";

export const metadata: Metadata = buildPageMetadata({
  title: "Curso de Teologia | AD Madureira Atibaia",
  description:
    "Conheça a página institucional do Curso de Teologia da AD Madureira Atibaia, com foco em formação bíblica, doutrinária e ministerial sob responsabilidade do Pr. Eliel Sobrinho.",
  path: coursePath,
  image: heroImage,
  keywords: [
    "curso de teologia atibaia",
    "teologia ad madureira atibaia",
    "pr eliel sobrinho",
    "formação bíblica atibaia",
  ],
});

export default function CursoTeologiaPage() {
  const whatsappMessage = encodeURIComponent(
    "A paz do Senhor! Gostaria de mais informações sobre o Curso de Teologia da igreja."
  );
  const whatsappUrl = `${SEDE_WHATSAPP_URL}?text=${whatsappMessage}`;
  const canonicalUrl = resolveSiteUrl(coursePath);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
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
        name: "Programação",
        item: resolveSiteUrl("/programacao"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Curso de Teologia",
        item: canonicalUrl,
      },
    ],
  };

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Curso de Teologia",
    description: cursoTeologiaData.hero.description,
    provider: {
      "@type": "Church",
      name: CHURCH_DISPLAY_NAME,
      url: resolveSiteUrl("/"),
    },
    instructor: {
      "@type": "Person",
      name: cursoTeologiaData.teacher.name,
      sameAs: [
        cursoTeologiaData.teacher.socialLinks.facebook,
        cursoTeologiaData.teacher.socialLinks.instagram,
      ],
    },
    location: {
      "@type": "Place",
      name: SEDE_PROGRAMACAO_LOCATION,
    },
    url: canonicalUrl,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />

      <main className="min-h-screen bg-[#f5f5f5]">
        <section className="relative overflow-hidden bg-[#111] text-white">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImage})` }}
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/72 via-black/55 to-black/78" />

          <div className="relative z-10 ui-page-container py-10 sm:py-14 md:py-16 lg:py-20">
            <nav
              aria-label="Breadcrumb"
              className="mb-6 flex flex-wrap items-center gap-2 text-sm text-white/60"
            >
              <Link href="/" className="transition-colors hover:text-white/85">
                Início
              </Link>
              <span>›</span>
              <Link
                href="/programacao"
                className="transition-colors hover:text-white/85"
              >
                Programação
              </Link>
              <span>›</span>
              <span className="text-white/85">Curso de Teologia</span>
            </nav>

            <div className="max-w-3xl">
              <p className="text-xs font-semibold tracking-[0.24em] uppercase text-[#ffa726]">
                {cursoTeologiaData.hero.label}
              </p>
              <h1 className="mt-4 font-acme text-3xl tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
                {cursoTeologiaData.hero.title}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/82 md:text-lg">
                {cursoTeologiaData.hero.description}
              </p>
              <div className="mt-5 inline-flex rounded-full border border-[#ffa726]/25 bg-[#fff8ee]/10 px-5 py-3 text-xs font-semibold tracking-[0.22em] uppercase text-[#f7dfbb]">
                {cursoTeologiaData.hero.highlight}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a href={whatsappUrl} className="ui-btn-primary">
                  Quero mais informações
                </a>
                <Link href="/contato" className="ui-btn-ghost-dark">
                  Ver contato da sede
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-black/5 bg-white/90">
          <div className="ui-page-container py-5 md:py-6">
            <div className="ui-panel ui-panel-pad-sm">
              <p className="ui-section-eyebrow ui-section-eyebrow--gold">
                Próximo passo
              </p>
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-3xl">
                  <h2 className="font-acme text-xl tracking-wide text-[#212121] md:text-2xl">
                    Acompanhe as atualizações do Curso de Teologia
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-[#5f5f5f] md:text-base">
                    Aulas às segundas-feiras, às 19h30, na sede da AD Madureira
                    Atibaia. Para informações sobre inscrição e participação,
                    fale com a equipe da igreja.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <a href={whatsappUrl} className="ui-btn-primary">
                    Registrar interesse
                  </a>
                  <Link href="/programacao" className="ui-btn-secondary">
                    Ver programação
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="ui-page-container space-y-10">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.12fr_0.88fr]">
              <article className="rounded-3xl border border-black/5 bg-white p-6 shadow-[0_6px_24px_rgba(0,0,0,0.04)] md:p-8">
                <p className="text-xs font-bold tracking-widest uppercase text-[#ef5350]">
                  Apresentação
                </p>
                <h2 className="mt-3 font-acme text-2xl tracking-wide text-[#212121] md:text-4xl">
                  {cursoTeologiaData.presentation.title}
                </h2>
                <div className="mt-5 space-y-4 text-sm leading-7 text-[#555] md:text-base md:leading-8">
                  {cursoTeologiaData.presentation.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </article>

              <aside className="rounded-3xl border border-[#ffa726]/20 bg-[#fff8ee] p-6 shadow-[0_6px_24px_rgba(0,0,0,0.04)] md:p-8">
                <p className="text-xs font-bold tracking-widest uppercase text-[#ffa726]">
                  Informações rápidas
                </p>
                <div className="mt-5 grid grid-cols-1 gap-4">
                  {cursoTeologiaData.quickFacts.map((fact) => (
                    <div
                      key={fact.label}
                      className="rounded-2xl border border-[#ffa726]/15 bg-white/75 p-4"
                    >
                      <p className="text-[11px] font-bold tracking-widest uppercase text-[#8b5b18]">
                        {fact.label}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-[#444]">
                        {fact.value}
                      </p>
                    </div>
                  ))}
                </div>
              </aside>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.92fr_1.08fr]">
              <article className="rounded-3xl border border-black/5 bg-white p-6 shadow-[0_6px_24px_rgba(0,0,0,0.04)] md:p-8">
                <p className="text-xs font-bold tracking-widest uppercase text-[#ef5350]">
                  Professor
                </p>
                <div className="mt-5 grid grid-cols-1 gap-6 md:grid-cols-[0.72fr_1.28fr]">
                  <div className="overflow-hidden rounded-[2rem] border border-[#ffa726]/20 bg-[#fff8ee] shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
                    <div className="relative aspect-[4/4.5] bg-[#111]">
                      <Image
                        src={cursoTeologiaData.teacher.photo}
                        alt={cursoTeologiaData.teacher.photoAlt}
                        fill
                        sizes="(max-width: 768px) 100vw, 28vw"
                        className="object-cover object-top"
                      />
                      <div className="absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-black/55 to-transparent" />
                    </div>
                    <div className="border-t border-[#ffa726]/15 bg-white/85 px-5 py-4 text-center">
                      <p className="text-[11px] font-bold tracking-widest uppercase text-[#8b5b18]">
                        Foto institucional
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-[#666]">
                        Professor responsável pelo Curso de Teologia.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h2 className="font-acme text-2xl tracking-wide text-[#212121] md:text-3xl">
                      {cursoTeologiaData.teacher.name}
                    </h2>
                    <p className="mt-2 text-xs font-bold tracking-widest uppercase text-[#ef5350]">
                      {cursoTeologiaData.teacher.role}
                    </p>
                    <p className="mt-4 text-sm leading-7 text-[#555] md:text-base md:leading-8">
                      {cursoTeologiaData.teacher.summary}
                    </p>
                    <div className="mt-5 space-y-3 text-sm leading-relaxed text-[#555]">
                      {cursoTeologiaData.teacher.notes.map((note) => (
                        <p key={note}>{note}</p>
                      ))}
                    </div>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <a
                        href={cursoTeologiaData.teacher.socialLinks.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ui-btn-secondary"
                      >
                        Facebook do professor
                      </a>
                      <a
                        href={cursoTeologiaData.teacher.socialLinks.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ui-btn-secondary"
                      >
                        Instagram do professor
                      </a>
                    </div>
                  </div>
                </div>
              </article>

              <article className="rounded-3xl border border-black/5 bg-white p-6 shadow-[0_6px_24px_rgba(0,0,0,0.04)] md:p-8">
                <p className="text-xs font-bold tracking-widest uppercase text-[#ef5350]">
                  Estrutura do curso
                </p>
                <h2 className="mt-3 font-acme text-2xl tracking-wide text-[#212121] md:text-3xl">
                  Detalhes do curso
                </h2>
                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {cursoTeologiaData.courseDetails.map((detail) => (
                    <div
                      key={detail.label}
                      className="rounded-2xl border border-black/5 bg-[#f9f9f9] p-4"
                    >
                      <p className="text-[11px] font-bold tracking-widest uppercase text-[#777]">
                        {detail.label}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-[#444]">
                        {detail.value}
                      </p>
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-sm leading-relaxed text-[#666]">
                  A programação atual já confirma o curso como parte da rotina da
                  igreja às segundas-feiras. Para saber sobre duração,
                  investimento, certificação e inscrição, fale com a igreja e
                  acompanhe as próximas orientações.
                </p>
              </article>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.02fr_0.98fr]">
              <article className="rounded-3xl border border-black/5 bg-white p-6 shadow-[0_6px_24px_rgba(0,0,0,0.04)] md:p-8">
                <p className="text-xs font-bold tracking-widest uppercase text-[#ef5350]">
                  Conteúdos previstos
                </p>
                <h2 className="mt-3 font-acme text-2xl tracking-wide text-[#212121] md:text-3xl">
                  Formação pensada para Bíblia aberta, doutrina firme e vida cristã prática
                </h2>
                <p className="mt-4 text-sm leading-7 text-[#555] md:text-base md:leading-8">
                  Conteúdos previstos para o Curso de Teologia, abrangendo
                  formação bíblica, doutrina e vida ministerial.
                </p>
                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {cursoTeologiaData.contentTopics.map((topic) => (
                    <div
                      key={topic}
                      className="rounded-2xl border border-[#ffa726]/15 bg-[#fff8ee] px-4 py-3 text-sm font-semibold text-[#444]"
                    >
                      {topic}
                    </div>
                  ))}
                </div>
              </article>

              <article className="rounded-3xl border border-[#ffa726]/20 bg-[#fff8ee] p-6 shadow-[0_6px_24px_rgba(0,0,0,0.04)] md:p-8">
                <p className="text-xs font-bold tracking-widest uppercase text-[#ffa726]">
                  Inscrição e contato
                </p>
                <h2 className="mt-3 font-acme text-2xl tracking-wide text-[#212121] md:text-3xl">
                  {cursoTeologiaData.contact.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-[#555] md:text-base md:leading-8">
                  {cursoTeologiaData.contact.description}
                </p>
                <ul className="mt-5 space-y-3 text-sm leading-relaxed text-[#555]">
                  {cursoTeologiaData.contact.notes.map((note) => (
                    <li key={note} className="flex items-start gap-3">
                      <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-[#ef5350]" />
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <a href={whatsappUrl} className="ui-btn-primary">
                    Falar com a igreja
                  </a>
                  <Link href="/contato" className="ui-btn-secondary">
                    Ver contato da sede
                  </Link>
                </div>
              </article>
            </div>

            <article className="rounded-3xl border border-black/5 bg-white p-6 shadow-[0_6px_24px_rgba(0,0,0,0.04)] md:p-8">
              <p className="text-xs font-bold tracking-widest uppercase text-[#ef5350]">
                Perguntas frequentes
              </p>
              <h2 className="mt-3 font-acme text-2xl tracking-wide text-[#212121] md:text-3xl">
                FAQ do Curso de Teologia
              </h2>
              <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                {cursoTeologiaData.faq.map((item) => (
                  <div
                    key={item.question}
                    className="rounded-2xl border border-black/5 bg-[#f9f9f9] p-5"
                  >
                    <h3 className="font-acme text-lg tracking-wide text-[#212121]">
                      {item.question}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-[#555]">
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </section>
      </main>
    </>
  );
}
