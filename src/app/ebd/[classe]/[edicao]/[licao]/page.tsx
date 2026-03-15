import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import HeroPage from "@/components/HeroPage";
import EbdTeacherSubsidy from "@/components/ebd/EbdTeacherSubsidy";
import {
  formatEbdDate,
  getClasseEbdInfo,
  getClassesEbd,
  getLicao,
  getTrimestre,
  getTrimestresPorClasse,
  isClasseEbd,
} from "@/lib/ebd-utils";
import { buildPageMetadata } from "@/lib/site";

type PageProps = {
  params: Promise<{
    classe: string;
    edicao: string;
    licao: string;
  }>;
};

export const revalidate = 3600;

export async function generateStaticParams() {
  return getClassesEbd().flatMap((classe) =>
    getTrimestresPorClasse(classe.slug).flatMap((trimestre) =>
      trimestre.licoes.map((licao) => ({
        classe: classe.slug,
        edicao: trimestre.slug,
        licao: licao.slug,
      }))
    )
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { classe, edicao, licao } = await params;

  if (!isClasseEbd(classe)) {
    return {
      title: "Lição não encontrada | EBD",
    };
  }

  const lessonContext = getLicao(classe, edicao, licao);

  if (!lessonContext) {
    return {
      title: "Lição não encontrada | EBD",
    };
  }

  const pageImage = lessonContext.licao.imagem ?? lessonContext.trimestre.imagem;

  return buildPageMetadata({
    title: `Lição ${lessonContext.licao.numero} | ${lessonContext.licao.titulo}`,
    description: lessonContext.licao.resumo,
    path: `/ebd/${classe}/${edicao}/${licao}`,
    image: pageImage,
  });
}

function Breadcrumb({
  classe,
  classeLabel,
  edicao,
  edicaoLabel,
  licaoLabel,
}: {
  classe: string;
  classeLabel: string;
  edicao: string;
  edicaoLabel: string;
  licaoLabel: string;
}) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-8 flex flex-wrap items-center gap-2 text-sm text-[#777]"
    >
      <Link href="/" className="transition-colors hover:text-[#212121]">
        Início
      </Link>
      <span>›</span>
      <Link href="/ebd" className="transition-colors hover:text-[#212121]">
        EBD
      </Link>
      <span>›</span>
      <Link
        href={`/ebd/${classe}`}
        className="transition-colors hover:text-[#212121]"
      >
        {classeLabel}
      </Link>
      <span>›</span>
      <Link
        href={`/ebd/${classe}/${edicao}`}
        className="transition-colors hover:text-[#212121]"
      >
        {edicaoLabel}
      </Link>
      <span>›</span>
      <span className="font-medium text-[#212121]">{licaoLabel}</span>
    </nav>
  );
}

export default async function EbdLessonPage({ params }: PageProps) {
  const { classe, edicao, licao } = await params;

  if (!isClasseEbd(classe)) {
    notFound();
  }

  const lessonContext = getLicao(classe, edicao, licao);
  const trimestre = getTrimestre(classe, edicao);

  if (!lessonContext || !trimestre) {
    notFound();
  }

  const classeInfo = getClasseEbdInfo(classe);
  const lessonImage = lessonContext.licao.imagem ?? null;
  const currentIndex = trimestre.licoes.findIndex((item) => item.slug === licao);
  const licaoAnterior = currentIndex > 0 ? trimestre.licoes[currentIndex - 1] : null;
  const proximaLicao =
    currentIndex >= 0 && currentIndex < trimestre.licoes.length - 1
      ? trimestre.licoes[currentIndex + 1]
      : null;

  return (
    <main className="min-h-screen bg-[#f5f5f5]">
      <HeroPage
        variant="full"
        label={`EBD ${classeInfo.label} · ${trimestre.rotulo}`}
        title={`Lição ${lessonContext.licao.numero} · ${lessonContext.licao.titulo}`}
        description={lessonContext.licao.resumo}
        image={trimestre.imagem}
        imageAlt={lessonContext.licao.titulo}
      />

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <Breadcrumb
            classe={classe}
            classeLabel={classeInfo.label}
            edicao={edicao}
            edicaoLabel={trimestre.rotulo}
            licaoLabel={`Lição ${lessonContext.licao.numero}`}
          />

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_300px]">
            <article className="space-y-6">
              {lessonImage ? (
                <div className="rounded-3xl border border-black/5 bg-white p-4 shadow-sm md:p-5">
                  <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-2xl bg-[#fafafa]">
                    <Image
                      src={lessonImage}
                      alt={`Arte da lição ${lessonContext.licao.numero} — ${lessonContext.licao.titulo}`}
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, 420px"
                      className="object-contain"
                    />
                  </div>
                </div>
              ) : null}

              <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm md:p-8">
                <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-[#ffa726]/20 bg-[#fff8ee] p-4">
                    <p className="mb-1 text-xs font-bold tracking-widest uppercase text-[#ffa726]">
                      Data
                    </p>
                    <p className="text-sm text-[#212121]">
                      {formatEbdDate(lessonContext.licao.data)}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-[#ffa726]/20 bg-[#fff8ee] p-4">
                    <p className="mb-1 text-xs font-bold tracking-widest uppercase text-[#ffa726]">
                      Texto-chave
                    </p>
                    <p className="text-sm text-[#212121]">
                      {lessonContext.licao.textoChave ?? "A confirmar"}
                    </p>
                  </div>
                </div>

                {lessonContext.licao.verdadePratica ? (
                  <div className="mb-8 rounded-3xl border border-[#ffa726]/20 bg-[#fff8ee] p-6 md:p-8">
                    <p className="mb-3 text-xs font-bold tracking-widest uppercase text-[#ffa726]">
                      Verdade prática
                    </p>
                    <p className="leading-relaxed text-[#555]">
                      {lessonContext.licao.verdadePratica}
                    </p>
                  </div>
                ) : null}

                <div className="mb-8">
                  <p className="mb-4 text-xs font-bold tracking-widest uppercase text-[#ef5350]">
                    Leitura bíblica
                  </p>
                  <ul className="space-y-3 text-[#555] leading-relaxed">
                    {lessonContext.licao.leituraBiblica.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-[#ef5350]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-8">
                  <p className="mb-4 text-xs font-bold tracking-widest uppercase text-[#ef5350]">
                    Objetivos da lição
                  </p>
                  <ul className="space-y-3 text-[#555] leading-relaxed">
                    {lessonContext.licao.objetivos.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-[#ef5350]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-6">
                  {lessonContext.licao.topicos.map((topico) => (
                    <section key={topico.titulo} className="rounded-3xl border border-black/5 bg-[#fafafa] p-5">
                      <h2 className="mb-3 font-acme text-2xl tracking-wide text-[#212121]">
                        {topico.titulo}
                      </h2>
                      <ul className="space-y-3 text-[#555] leading-relaxed">
                        {topico.conteudo.map((item) => (
                          <li key={item} className="flex items-start gap-3">
                            <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-[#ffa726]" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </section>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-[#ffa726]/20 bg-[#fff8ee] p-6 shadow-sm md:p-8">
                <p className="mb-3 text-xs font-bold tracking-widest uppercase text-[#ffa726]">
                  Aplicação prática
                </p>
                <p className="leading-relaxed text-[#555]">
                  {lessonContext.licao.aplicacao}
                </p>
              </div>

              <EbdTeacherSubsidy
                classe={classe}
                licao={lessonContext.licao}
              />
            </article>

            <aside className="space-y-6">
              <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm">
                <p className="mb-3 text-xs font-bold tracking-widest uppercase text-[#ef5350]">
                  Contexto da edição
                </p>
                <h2 className="mb-3 font-acme text-3xl tracking-wide text-[#212121]">
                  {trimestre.titulo}
                </h2>
                <div className="space-y-3 text-sm leading-relaxed text-[#555]">
                  <p>{trimestre.rotulo}</p>
                  <p>{classeInfo.horarioLabel}</p>
                  <p>{trimestre.versiculoBase ?? "Versículo-base a confirmar"}</p>
                </div>
                <Link
                  href={`/ebd/${classe}/${trimestre.slug}`}
                  className="ui-btn-secondary mt-6"
                >
                  Voltar ao trimestre
                </Link>
              </div>

              {lessonContext.licao.apoioProfessor?.length ? (
                <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm">
                  <p className="mb-3 text-xs font-bold tracking-widest uppercase text-[#ef5350]">
                    Apoio ao professor
                  </p>
                  <ul className="space-y-3 text-sm leading-relaxed text-[#555]">
                    {lessonContext.licao.apoioProfessor.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-[#ef5350]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {lessonContext.licao.apoioAluno?.length ? (
                <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm">
                  <p className="mb-3 text-xs font-bold tracking-widest uppercase text-[#ef5350]">
                    Apoio ao aluno
                  </p>
                  <ul className="space-y-3 text-sm leading-relaxed text-[#555]">
                    {lessonContext.licao.apoioAluno.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-[#ef5350]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <div className="rounded-3xl bg-[#212121] p-6 text-white shadow-[0_18px_40px_rgba(0,0,0,0.18)]">
                <p className="mb-3 text-xs font-bold tracking-widest uppercase text-[#ffa726]">
                  Continue estudando
                </p>
                <div className="space-y-3 text-sm leading-relaxed text-white/80">
                  {licaoAnterior ? (
                    <Link
                      href={`/ebd/${classe}/${trimestre.slug}/${licaoAnterior.slug}`}
                      className="block transition-colors hover:text-white"
                    >
                      ← Lição anterior
                    </Link>
                  ) : null}
                  {proximaLicao ? (
                    <Link
                      href={`/ebd/${classe}/${trimestre.slug}/${proximaLicao.slug}`}
                      className="block transition-colors hover:text-white"
                    >
                      Próxima lição →
                    </Link>
                  ) : null}
                  <Link
                    href="/programacao"
                    className="block transition-colors hover:text-white"
                  >
                    Ver EBD na programação da igreja
                  </Link>
                  <Link
                    href="/contato"
                    className="block transition-colors hover:text-white"
                  >
                    Falar com a igreja
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
