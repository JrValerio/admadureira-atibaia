import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPastorBySlug, getPastores } from "@/data/pastores";

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

  return {
    title: `${pastor.nome} | AD Madureira Atibaia`,
    description: pastor.resumo,
    openGraph: {
      title: `${pastor.nome} | AD Madureira Atibaia`,
      description: pastor.resumo,
      images: [pastor.foto],
    },
  };
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

export default async function PastorPage({ params }: PageProps) {
  const { slug } = await params;
  const pastor = getPastorBySlug(slug);

  if (!pastor) {
    notFound();
  }

  return (
    <main className="pt-[80px] bg-[#f5f5f5] min-h-screen">
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <Link
            href="/pastores"
            className="inline-block text-[#ef5350] text-xs font-semibold tracking-widest uppercase hover:underline mb-6"
          >
            ← Voltar para pastores
          </Link>

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
                <h1 className="font-acme text-3xl md:text-5xl text-[#212121] tracking-wide mb-3">
                  {pastor.nome}
                </h1>
                <p className="text-[#ef5350] font-semibold tracking-wide uppercase text-sm mb-5">
                  {pastor.cargo}
                </p>
                <p className="text-[#555] leading-relaxed mb-8">
                  {pastor.resumo}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <InfoCard label="Cargo" value={pastor.cargo} />
                  <InfoCard
                    label="Campo"
                    value="AD Madureira Atibaia"
                  />
                  <InfoCard
                    label="Atuação"
                    value={
                      pastor.grupo === "presidencia"
                        ? "Liderança pastoral e institucional"
                        : "Apoio pastoral e fortalecimento das congregações"
                    }
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_0.95fr] gap-6 mt-10">
              <div className="rounded-3xl bg-[#f9f9f9] border border-black/5 p-6 md:p-8">
                <h2 className="font-acme text-2xl text-[#212121] tracking-wide mb-4">
                  Trajetória
                </h2>
                <div className="space-y-4 text-[#555] leading-relaxed">
                  {pastor.trajetoria.map((item) => (
                    <p key={item}>{item}</p>
                  ))}
                </div>
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
                  <div className="rounded-3xl bg-[#212121] text-white p-6">
                    <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-3">
                      Versículo que marca o ministério
                    </p>
                    <blockquote className="text-white/85 leading-relaxed mb-3">
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
