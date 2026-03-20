import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPastorBySlug, getPastores } from "@/data/pastores";
import { CHURCH_SHORT_NAME, SEDE_POSTAL_ADDRESS } from "@/data/site";
import { buildPageMetadata, resolveSiteUrl } from "@/lib/site";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return getPastores().map((pastor) => ({
    slug: pastor.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const pastor = getPastorBySlug(slug);

  if (!pastor) {
    return {
      title: "Pastor não encontrado | AD Madureira Atibaia",
    };
  }

  return buildPageMetadata({
    title: pastor.seo?.title ?? `${pastor.nome} | AD Madureira Atibaia`,
    description: pastor.seo?.description ?? pastor.resumo,
    path: `/pastores/${pastor.slug}`,
    image: pastor.foto,
  });
}

function Breadcrumb({ nome }: { nome: string }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="text-sm text-[#777] mb-6 flex flex-wrap items-center gap-2"
    >
      <Link href="/" className="hover:underline">
        Início
      </Link>
      <span>›</span>
      <Link href="/pastores" className="hover:underline">
        Pastores
      </Link>
      <span>›</span>
      <span className="text-[#212121] font-medium">{nome}</span>
    </nav>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-[#fff8ee] border border-[#ffa726]/20 p-4">
      <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-1">
        {label}
      </p>
      <p className="text-[#212121] text-sm leading-relaxed">{value}</p>
    </div>
  );
}

function Timeline({ itens }: { itens: string[] }) {
  return (
    <div className="space-y-6">
      {itens.map((item, index) => (
        <div key={item} className="flex gap-4">
          <div className="relative pt-2">
            <div className="w-3 h-3 rounded-full bg-[#ffa726]" />
            {index < itens.length - 1 && (
              <div className="absolute left-1.5 top-5 bottom-[-28px] w-px bg-[#ffa726]/30" />
            )}
          </div>
          <p className="text-[#555] leading-relaxed">{item}</p>
        </div>
      ))}
    </div>
  );
}

export default async function PastorPage({ params }: PageProps) {
  const { slug } = await params;
  const pastor = getPastorBySlug(slug);

  if (!pastor) {
    notFound();
  }

  const sameAs = [pastor.redes?.instagram, pastor.redes?.youtube].filter(
    (value): value is string => Boolean(value)
  );

  const ministryCards = pastor.ministerioInfo
    ? [
        pastor.ministerioInfo.inicio
          ? {
              label: "Início do ministério",
              value: pastor.ministerioInfo.inicio,
            }
          : null,
        pastor.ministerioInfo.funcao
          ? {
              label: "Função",
              value: pastor.ministerioInfo.funcao,
            }
          : null,
        pastor.ministerioInfo.igreja
          ? {
              label: "Igreja",
              value: pastor.ministerioInfo.igreja,
            }
          : null,
      ].filter((item): item is { label: string; value: string } => item !== null)
    : [];

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: pastor.nome,
    jobTitle: pastor.cargo,
    description: pastor.seo?.description ?? pastor.resumo,
    image: resolveSiteUrl(pastor.foto),
    url: resolveSiteUrl(`/pastores/${pastor.slug}`),
    worksFor: {
      "@type": "Organization",
      name: pastor.ministerioInfo?.igreja ?? CHURCH_SHORT_NAME,
      address: SEDE_POSTAL_ADDRESS,
    },
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };

  return (
    <main className="bg-[#f5f5f5] min-h-screen">
      <section className="py-8 md:py-16">
        <div className="ui-page-container">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
          />

          <Breadcrumb nome={pastor.nome} />

          <div className="rounded-3xl overflow-hidden bg-white shadow-lg border border-black/5 p-6 md:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-8 items-center">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#111]">
                <Image
                  src={pastor.foto}
                  alt={pastor.nome}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 360px"
                  className="object-cover object-top"
                />
              </div>

              <div>
                <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-2">
                  {pastor.grupo === "presidencia"
                    ? "Presidência do Campo"
                    : "Vice-Presidência do Campo"}
                </p>
                <h1 className="font-acme text-2xl md:text-4xl lg:text-5xl text-[#212121] tracking-wide mb-3">
                  {pastor.nome}
                </h1>
                <p className="text-[#ef5350] font-semibold tracking-wide uppercase text-sm mb-5">
                  {pastor.cargo}
                </p>
                <p className="text-[#555] text-lg leading-relaxed max-w-2xl mb-8">
                  {pastor.resumo}
                </p>

                {ministryCards.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {ministryCards.map((item) => (
                      <InfoCard
                        key={`${item.label}-${item.value}`}
                        label={item.label}
                        value={item.value}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <InfoCard label="Cargo" value={pastor.cargo} />
                    <InfoCard label="Campo" value={CHURCH_SHORT_NAME} />
                    <InfoCard
                      label="Atuação"
                      value={
                        pastor.grupo === "presidencia"
                          ? "Liderança pastoral e institucional"
                          : "Apoio pastoral e fortalecimento das congregações"
                      }
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_0.95fr] gap-6 mt-10">
              <div className="rounded-3xl bg-[#f9f9f9] border border-black/5 p-6 md:p-8">
                <h2 className="font-acme text-2xl text-[#212121] tracking-wide mb-4">
                  Trajetória
                </h2>
                <Timeline itens={pastor.trajetoria} />
              </div>

              <div className="space-y-6">
                <div className="rounded-3xl bg-[#fff8ee] border border-[#ffa726]/20 p-6">
                  <h2 className="font-acme text-2xl text-[#212121] tracking-wide mb-4">
                    Ministério
                  </h2>
                  <ul className="space-y-3 text-[#555] leading-relaxed">
                    {pastor.ministerio.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="text-[#ffa726]">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {pastor.formacao && (
                  <div className="rounded-3xl bg-[#fff8ee] border border-[#ffa726]/20 p-6">
                    <h2 className="font-acme text-2xl text-[#212121] tracking-wide mb-4">
                      Formação e Atuação
                    </h2>
                    <ul className="space-y-3 text-[#555] leading-relaxed">
                      {pastor.formacao.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span className="text-[#ffa726]">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {pastor.versiculo && (
                  <div className="rounded-3xl bg-[#212121] text-white p-8 text-center">
                    <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-3">
                      Versículo que marca o ministério
                    </p>
                    <blockquote className="text-xl md:text-2xl italic text-white/85 leading-relaxed mb-3">
                      “{pastor.versiculo.texto}”
                    </blockquote>
                    <p className="text-white/60 text-sm">
                      {pastor.versiculo.referencia}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Link
                href="/pastores"
                className="inline-flex items-center justify-center border border-[#212121] text-[#212121] hover:bg-[#212121] hover:text-white font-bold text-xs tracking-widest uppercase px-6 py-3 rounded-full transition-colors"
              >
                Ver outros pastores
              </Link>
              <Link
                href="/contato"
                className="inline-flex items-center justify-center bg-[#ffa726] hover:bg-[#ffb74d] text-[#212121] font-bold text-xs tracking-widest uppercase px-6 py-3 rounded-full transition-colors"
              >
                Fale com a igreja
              </Link>
              <Link
                href="/sobre"
                className="inline-flex items-center justify-center border border-[#ef5350] text-[#ef5350] hover:bg-[#ef5350] hover:text-white font-bold text-xs tracking-widest uppercase px-6 py-3 rounded-full transition-colors"
              >
                Ver história da igreja
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
