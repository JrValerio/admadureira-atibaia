import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCongregacaoBySlug, getCongregacoes } from "@/data/congregacoes";
import { buildPageMetadata, SITE_URL } from "@/lib/site";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return getCongregacoes().map((congregacao) => ({
    slug: congregacao.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const congregacao = getCongregacaoBySlug(slug);

  if (!congregacao) {
    return {
      title: "Congregação não encontrada | AD Madureira Atibaia",
    };
  }

  return buildPageMetadata({
    title: `${congregacao.igreja} | AD Madureira Atibaia`,
    description: congregacao.resumo,
    path: `/congregacoes/${congregacao.slug}`,
    image: congregacao.imagem,
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
      <Link href="/congregacoes" className="hover:underline">
        Congregações
      </Link>
      <span>›</span>
      <span className="text-[#212121] font-medium">{nome}</span>
    </nav>
  );
}

export default async function CongregacaoPage({ params }: PageProps) {
  const { slug } = await params;
  const congregacao = getCongregacaoBySlug(slug);

  if (!congregacao) {
    notFound();
  }

  const congregationSchema = {
    "@context": "https://schema.org",
    "@type": "Church",
    name: congregacao.igreja,
    image: `${SITE_URL}${congregacao.imagem}`,
    url: `${SITE_URL}/congregacoes/${congregacao.slug}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Praça Pio XII, 122",
      addressLocality: congregacao.cidade,
      addressRegion: "SP",
      postalCode: "12940-160",
      addressCountry: "BR",
    },
    telephone: congregacao.telefone,
  };

  return (
    <main className="bg-[#f5f5f5] min-h-screen">
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(congregationSchema),
            }}
          />

          <Breadcrumb nome={congregacao.igreja} />

          <div className="rounded-3xl overflow-hidden bg-white border border-black/5 shadow-lg">
            <div className="relative aspect-[16/9] bg-[#111]">
              <Image
                src={congregacao.imagem}
                alt={congregacao.igreja}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 1200px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
            </div>

            <div className="p-6 md:p-10">
              <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-2">
                Campo de Atibaia · {congregacao.cidade}
              </p>
              <h1 className="font-acme text-3xl md:text-5xl text-[#212121] tracking-wide mb-4">
                {congregacao.igreja}
              </h1>
              <p className="text-[#555] leading-relaxed max-w-3xl mb-8">
                {congregacao.resumo}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                <div className="rounded-2xl bg-[#fff8ee] border border-[#ffa726]/20 p-4">
                  <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-1">
                    Pastor responsável
                  </p>
                  {congregacao.pastorSlug ? (
                    <Link
                      href={`/pastores/${congregacao.pastorSlug}`}
                      className="text-[#212121] text-sm hover:text-[#ef5350] transition-colors"
                    >
                      {congregacao.pastor}
                    </Link>
                  ) : (
                    <p className="text-[#212121] text-sm">{congregacao.pastor}</p>
                  )}
                </div>
                <div className="rounded-2xl bg-[#fff8ee] border border-[#ffa726]/20 p-4">
                  <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-1">
                    Cidade
                  </p>
                  <p className="text-[#212121] text-sm">{congregacao.cidade}</p>
                </div>
                <div className="rounded-2xl bg-[#fff8ee] border border-[#ffa726]/20 p-4">
                  <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-1">
                    Contato
                  </p>
                  <p className="text-[#212121] text-sm">
                    {congregacao.telefone ?? "A confirmar"}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6">
                <div className="rounded-3xl bg-[#f9f9f9] border border-black/5 p-6 md:p-8">
                  <h2 className="font-acme text-2xl text-[#212121] tracking-wide mb-4">
                    Endereço e visitação
                  </h2>
                  <p className="text-[#555] leading-relaxed mb-4">
                    {congregacao.endereco}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    {congregacao.mapsUrl && (
                      <a
                        href={congregacao.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center bg-[#ffa726] hover:bg-[#ffb74d] text-[#212121] font-bold text-xs tracking-widest uppercase px-6 py-3 rounded-full transition-colors"
                      >
                        Abrir no mapa
                      </a>
                    )}
                    {congregacao.whatsappUrl && (
                      <a
                        href={congregacao.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center border border-[#ef5350] text-[#ef5350] hover:bg-[#ef5350] hover:text-white font-bold text-xs tracking-widest uppercase px-6 py-3 rounded-full transition-colors"
                      >
                        Falar pelo WhatsApp
                      </a>
                    )}
                  </div>
                </div>

                <div className="rounded-3xl bg-[#fff8ee] border border-[#ffa726]/20 p-6">
                  <h2 className="font-acme text-2xl text-[#212121] tracking-wide mb-4">
                    Liderança local
                  </h2>
                  <div className="space-y-4">
                    {congregacao.lideranca.map((lider) => (
                      <div
                        key={`${lider.cargo}-${lider.nome}`}
                        className="border-b border-black/8 pb-4 last:border-b-0 last:pb-0"
                      >
                        <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-1">
                          {lider.cargo}
                        </p>
                        {lider.pastorSlug ? (
                          <Link
                            href={`/pastores/${lider.pastorSlug}`}
                            className="text-[#212121] hover:text-[#ef5350] transition-colors"
                          >
                            {lider.nome}
                          </Link>
                        ) : (
                          <p className="text-[#212121]">{lider.nome}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-3xl bg-white border border-black/5 p-6 md:p-8 mt-6">
                <h2 className="font-acme text-2xl text-[#212121] tracking-wide mb-4">
                  Programação da congregação
                </h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[#555] leading-relaxed">
                  {congregacao.horarios.map((item) => (
                    <li
                      key={item}
                      className="rounded-2xl bg-[#f9f9f9] border border-black/5 px-4 py-3"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
