import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMinisterioBySlug, getMinisterios } from "@/data/ministerios";
import { buildPageMetadata, SITE_URL } from "@/lib/site";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return getMinisterios().map((ministerio) => ({
    slug: ministerio.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const ministerio = getMinisterioBySlug(slug);

  if (!ministerio) {
    return {
      title: "Ministério não encontrado | AD Madureira Atibaia",
    };
  }

  return buildPageMetadata({
    title: `${ministerio.nome} | AD Madureira Atibaia`,
    description: ministerio.resumo,
    path: `/ministerios/${ministerio.slug}`,
    image: ministerio.imagem ?? "/fachada-da-igreja.jpg",
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
      <Link href="/ministerios" className="hover:underline">
        Ministérios
      </Link>
      <span>›</span>
      <span className="text-[#212121] font-medium">{nome}</span>
    </nav>
  );
}

export default async function MinisterioPage({ params }: PageProps) {
  const { slug } = await params;
  const ministerio = getMinisterioBySlug(slug);

  if (!ministerio) {
    notFound();
  }

  const ministrySchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: `${ministerio.nome} | AD Madureira Atibaia`,
    url: `${SITE_URL}/ministerios/${ministerio.slug}`,
    image: `${SITE_URL}${ministerio.imagem ?? "/fachada-da-igreja.jpg"}`,
    parentOrganization: {
      "@type": "Church",
      name: "AD Madureira Atibaia",
      url: SITE_URL,
    },
  };

  return (
    <main className="bg-[#f5f5f5] min-h-screen">
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(ministrySchema) }}
          />

          <Breadcrumb nome={ministerio.nome} />

          <div className="rounded-3xl overflow-hidden bg-white border border-black/5 shadow-lg">
            <div className="relative aspect-[16/9] bg-[#111]">
              <Image
                src={ministerio.imagem ?? "/fachada-da-igreja.jpg"}
                alt={ministerio.nome}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 1200px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/75 to-transparent" />
            </div>

            <div className="p-6 md:p-10">
              <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-2">
                {ministerio.escopo}
              </p>
              <h1 className="font-acme text-3xl md:text-5xl text-[#212121] tracking-wide mb-4">
                {ministerio.nome}
              </h1>
              <p className="text-[#555] text-lg leading-relaxed max-w-3xl mb-8">
                {ministerio.resumo}
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-6">
                <div className="rounded-3xl bg-[#f9f9f9] border border-black/5 p-6 md:p-8">
                  <h2 className="font-acme text-2xl text-[#212121] tracking-wide mb-4">
                    Sobre o ministério
                  </h2>
                  <div className="space-y-4 text-[#555] leading-relaxed">
                    {ministerio.descricao.map((item) => (
                      <p key={item}>{item}</p>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  {ministerio.atividades && (
                    <div className="rounded-3xl bg-[#fff8ee] border border-[#ffa726]/20 p-6">
                      <h2 className="font-acme text-2xl text-[#212121] tracking-wide mb-4">
                        Atividades
                      </h2>
                      <ul className="space-y-3 text-[#555] leading-relaxed">
                        {ministerio.atividades.map((atividade) => (
                          <li key={atividade} className="flex gap-3">
                            <span className="text-[#ffa726]">•</span>
                            <span>{atividade}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {ministerio.lideranca && (
                    <div className="rounded-3xl bg-[#fff8ee] border border-[#ffa726]/20 p-6">
                      <h2 className="font-acme text-2xl text-[#212121] tracking-wide mb-4">
                        Liderança
                      </h2>
                      <ul className="space-y-3 text-[#555] leading-relaxed">
                        {ministerio.lideranca.map((lider) => (
                          <li key={lider} className="flex gap-3">
                            <span className="text-[#ffa726]">•</span>
                            <span>{lider}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link
                  href="/contato"
                  className="inline-flex items-center justify-center bg-[#ffa726] hover:bg-[#ffb74d] text-[#212121] font-bold text-xs tracking-widest uppercase px-6 py-3 rounded-full transition-colors"
                >
                  Visite a igreja
                </Link>
                <Link
                  href="/ministerios"
                  className="inline-flex items-center justify-center border border-[#ef5350] text-[#ef5350] hover:bg-[#ef5350] hover:text-white font-bold text-xs tracking-widest uppercase px-6 py-3 rounded-full transition-colors"
                >
                  Ver outros ministérios
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
