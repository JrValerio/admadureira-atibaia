import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import HeroPage from "@/components/HeroPage";
import CardMedia from "@/components/media/CardMedia";
import { getCongregacaoBySlug, getCongregacoes } from "@/data/congregacoes";
import { buildPageMetadata, resolveSiteUrl, SITE_NAME } from "@/lib/site";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

type HorarioCongregacao = {
  dia: string;
  horario: string;
  titulo: string;
};

export const revalidate = 86400;

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
    title:
      congregacao.seo?.title ?? `${congregacao.igreja} | AD Madureira Atibaia`,
    description: congregacao.seo?.description ?? congregacao.resumo,
    path: `/congregacoes/${congregacao.slug}`,
    image: congregacao.imagem,
  });
}

function Breadcrumb({ nome }: { nome: string }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-8 flex flex-wrap items-center gap-2 text-sm text-[#777]"
    >
      <Link href="/" className="transition-colors hover:text-[#212121]">
        Início
      </Link>
      <span>›</span>
      <Link
        href="/congregacoes"
        className="transition-colors hover:text-[#212121]"
      >
        Congregações
      </Link>
      <span>›</span>
      <span className="font-medium text-[#212121]">{nome}</span>
    </nav>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[#ffa726]/20 bg-[#fff8ee] p-4">
      <p className="mb-1 text-xs font-bold tracking-widest uppercase text-[#ffa726]">
        {label}
      </p>
      <p className="text-sm leading-relaxed text-[#212121]">{value}</p>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-black/5 bg-white/80 p-5">
      <p className="mb-2 text-xs font-bold tracking-widest uppercase text-[#8b5b18]">
        {label}
      </p>
      <p className="font-acme text-xl md:text-3xl tracking-wide text-[#212121]">{value}</p>
    </div>
  );
}

function parseHorario(item: string): HorarioCongregacao {
  const partes = item
    .split(" · ")
    .map((parte) => parte.trim())
    .filter(Boolean);
  const [dia, horario, ...titulo] = partes;

  return {
    dia: dia ?? "Programação",
    horario: horario ?? "Horário a confirmar",
    titulo: titulo.length > 0 ? titulo.join(" · ") : item,
  };
}

function formatTelefoneHref(telefone?: string) {
  if (!telefone) {
    return null;
  }

  const digits = telefone.replace(/\D/g, "");

  return digits.length > 0 ? `tel:+${digits}` : null;
}

export default async function CongregacaoPage({ params }: PageProps) {
  const { slug } = await params;
  const congregacao = getCongregacaoBySlug(slug);

  if (!congregacao) {
    notFound();
  }

  const locationInfo = {
    bairro: congregacao.localizacao?.bairro,
    cidade: congregacao.localizacao?.cidade ?? congregacao.cidade,
    estado: congregacao.localizacao?.estado ?? "SP",
    pais: congregacao.localizacao?.pais ?? "BR",
  };
  const telefoneHref = formatTelefoneHref(congregacao.telefone);
  const horarios = congregacao.horarios.map(parseHorario);
  const canonicalUrl = resolveSiteUrl(`/congregacoes/${congregacao.slug}`);
  const pageTitle = congregacao.seo?.title ?? congregacao.igreja;
  const pageDescription = congregacao.seo?.description ?? congregacao.resumo;
  const locationLabel = [locationInfo.bairro, locationInfo.cidade]
    .filter(Boolean)
    .join(" · ");
  const congregationSchema = {
    "@context": "https://schema.org",
    "@type": "Church",
    name: congregacao.igreja,
    description: pageDescription,
    image: resolveSiteUrl(congregacao.imagem),
    url: canonicalUrl,
    parentOrganization: {
      "@type": "Church",
      name: SITE_NAME,
      url: resolveSiteUrl("/"),
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: congregacao.endereco,
      addressLocality: locationInfo.cidade,
      addressRegion: locationInfo.estado,
      addressCountry: locationInfo.pais,
    },
    ...(congregacao.telefone ? { telephone: congregacao.telefone } : {}),
    ...(congregacao.localizacao?.lat !== undefined &&
    congregacao.localizacao?.lng !== undefined
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: congregacao.localizacao.lat,
            longitude: congregacao.localizacao.lng,
          },
        }
      : {}),
    ...(congregacao.mapsUrl ? { hasMap: congregacao.mapsUrl } : {}),
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${canonicalUrl}#breadcrumb`,
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
        name: "Congregações",
        item: resolveSiteUrl("/congregacoes"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: congregacao.igreja,
        item: canonicalUrl,
      },
    ],
  };
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: pageTitle,
    description: pageDescription,
    url: canonicalUrl,
    inLanguage: "pt-BR",
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: resolveSiteUrl("/"),
    },
    breadcrumb: {
      "@id": `${canonicalUrl}#breadcrumb`,
    },
    about: {
      "@id": canonicalUrl,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(congregationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />

      <main className="min-h-screen bg-[#f5f5f5]">
        <HeroPage
          variant="full"
          label={`Campo de Atibaia · ${locationInfo.cidade}`}
          title={congregacao.igreja}
          description={congregacao.resumo}
          image={congregacao.imagem}
          imageAlt={congregacao.igreja}
        />

        <section className="py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-4">
            <Breadcrumb nome={congregacao.igreja} />

            <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-[1.08fr_0.92fr]">
              <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.04)] md:p-8">
                <p className="mb-3 text-xs font-bold tracking-widest uppercase text-[#ef5350]">
                  Presença congregacional
                </p>
                <h2 className="mb-5 font-acme text-xl md:text-3xl tracking-wide text-[#212121] md:text-4xl">
                  Uma congregação com Palavra, cuidado pastoral e acolhimento em{" "}
                  {locationInfo.cidade}
                </h2>
                <div className="space-y-4 text-[#555] leading-relaxed">
                  <p>{congregacao.resumo}</p>
                  <p>
                    Localizada em {congregacao.endereco}, esta congregação
                    integra o Campo de Atibaia e mantém uma rotina local de
                    oração, ensino bíblico, comunhão e visitação para servir a
                    igreja e acolher quem deseja conhecer a casa do Senhor.
                  </p>
                </div>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                  {congregacao.mapsUrl ? (
                    <a
                      href={congregacao.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ui-btn-primary"
                    >
                      Abrir no mapa
                    </a>
                  ) : null}
                  {congregacao.whatsappUrl ? (
                    <a
                      href={congregacao.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ui-btn-secondary"
                    >
                      Falar pelo WhatsApp
                    </a>
                  ) : null}
                  <Link href="/contato" className="ui-btn-ghost">
                    Como visitar
                  </Link>
                </div>
              </div>

              <div className="rounded-3xl border border-[#ffa726]/20 bg-[#fff8ee] p-6 shadow-sm md:p-8">
                <p className="mb-3 text-xs font-bold tracking-widest uppercase text-[#ffa726]">
                  Base local
                </p>
                <h2 className="mb-5 font-acme text-xl md:text-3xl tracking-wide text-[#212121]">
                  Informações rápidas da congregação
                </h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <StatCard label="Cidade" value={locationInfo.cidade} />
                  <StatCard
                    label="Bairro"
                    value={locationInfo.bairro ?? "A confirmar"}
                  />
                  <StatCard
                    label="Liderança"
                    value={String(congregacao.lideranca.length)}
                  />
                  <StatCard
                    label="Programações"
                    value={String(congregacao.horarios.length)}
                  />
                </div>
                <p className="mt-6 text-sm leading-relaxed text-[#555]">
                  A página reúne liderança, endereço, rotina local e caminhos de
                  contato para facilitar visitação, acompanhamento pastoral e
                  navegação institucional dentro do Campo de Atibaia.
                </p>
              </div>
            </div>

            <div className="mb-8 grid grid-cols-1 gap-8 xl:grid-cols-[1.05fr_0.95fr]">
              <div className="space-y-8">
                <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm md:p-8">
                  <p className="mb-3 text-xs font-bold tracking-widest uppercase text-[#ffa726]">
                    Endereço e visitação
                  </p>
                  <h2 className="mb-4 font-acme text-xl md:text-3xl tracking-wide text-[#212121]">
                    Como visitar esta congregação
                  </h2>
                  <p className="mb-6 max-w-3xl leading-relaxed text-[#555]">
                    Use estas informações para planejar sua visita, localizar a
                    congregação no mapa e entrar em contato com a igreja local.
                  </p>

                  <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                    <InfoCard label="Endereço" value={congregacao.endereco} />
                    <InfoCard
                      label="Localização"
                      value={locationLabel || locationInfo.cidade}
                    />
                    <InfoCard
                      label="Contato"
                      value={congregacao.telefone ?? "A confirmar"}
                    />
                  </div>

                  <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                    {congregacao.mapsUrl ? (
                      <a
                        href={congregacao.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ui-btn-primary"
                      >
                        Abrir rota
                      </a>
                    ) : null}
                    {congregacao.whatsappUrl ? (
                      <a
                        href={congregacao.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ui-btn-secondary"
                      >
                        Falar no WhatsApp
                      </a>
                    ) : null}
                    {telefoneHref ? (
                      <a href={telefoneHref} className="ui-btn-ghost">
                        Ligar para a congregação
                      </a>
                    ) : null}
                  </div>
                </div>

                <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm md:p-8">
                  <p className="mb-3 text-xs font-bold tracking-widest uppercase text-[#ffa726]">
                    Programação local
                  </p>
                  <h2 className="mb-4 font-acme text-xl md:text-3xl tracking-wide text-[#212121]">
                    Cultos, oração e encontros da congregação
                  </h2>
                  <p className="mb-6 max-w-3xl leading-relaxed text-[#555]">
                    Veja a rotina local registrada para acompanhar a vida da
                    congregação com mais clareza antes da visita.
                  </p>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {horarios.map((item) => (
                      <article
                        key={`${item.dia}-${item.horario}-${item.titulo}`}
                        className="rounded-2xl border border-black/5 bg-[#f9f9f9] p-5"
                      >
                        <p className="mb-2 text-xs font-bold tracking-widest uppercase text-[#ffa726]">
                          {item.dia}
                        </p>
                        <h3 className="mb-2 font-acme text-2xl tracking-wide text-[#212121]">
                          {item.titulo}
                        </h3>
                        <p className="text-sm leading-relaxed text-[#666]">
                          {item.horario}
                        </p>
                      </article>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm">
                  <CardMedia
                    src={congregacao.imagem}
                    alt={congregacao.igreja}
                    variant="institutional"
                    sizes="(max-width: 1280px) 100vw, 520px"
                    priority
                    className="rounded-none"
                  >
                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <p className="mb-2 text-xs font-bold tracking-widest uppercase text-[#ffa726]">
                        Campo de Atibaia
                      </p>
                      <h2 className="font-acme text-xl md:text-3xl tracking-wide text-white">
                        Congregação em destaque
                      </h2>
                    </div>
                  </CardMedia>
                  <div className="p-6">
                    <p className="leading-relaxed text-[#555]">
                      Esta página organiza a presença local da congregação com
                      o mesmo padrão institucional das demais áreas do site:
                      informação clara, visitação simples e leitura fácil da
                      rotina da igreja.
                    </p>
                  </div>
                </div>

                <div className="rounded-3xl border border-[#ffa726]/20 bg-[#fff8ee] p-6 shadow-sm">
                  <p className="mb-3 text-xs font-bold tracking-widest uppercase text-[#ef5350]">
                    Liderança local
                  </p>
                  <h2 className="mb-5 font-acme text-xl md:text-3xl tracking-wide text-[#212121]">
                    Pessoas que servem nesta frente congregacional
                  </h2>
                  <div className="space-y-4">
                    {congregacao.lideranca.map((lider) => (
                      <div
                        key={`${lider.cargo}-${lider.nome}`}
                        className="rounded-2xl border border-black/5 bg-white px-5 py-4"
                      >
                        <p className="mb-1 text-xs font-bold tracking-widest uppercase text-[#ffa726]">
                          {lider.cargo}
                        </p>
                        {lider.pastorSlug ? (
                          <Link
                            href={`/pastores/${lider.pastorSlug}`}
                            className="text-[#212121] transition-colors hover:text-[#ef5350]"
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

                <div className="rounded-3xl bg-[#212121] p-6 text-white shadow-[0_18px_40px_rgba(0,0,0,0.18)]">
                  <p className="mb-3 text-xs font-bold tracking-widest uppercase text-[#ffa726]">
                    Próximos passos
                  </p>
                  <h2 className="mb-4 font-acme text-xl md:text-3xl tracking-wide">
                    Continue sua navegação pelo campo
                  </h2>
                  <div className="space-y-3 text-sm leading-relaxed text-white/80">
                    <Link
                      href="/programacao"
                      className="block transition-colors hover:text-white"
                    >
                      Ver a programação geral da igreja
                    </Link>
                    <Link
                      href="/congregacoes"
                      className="block transition-colors hover:text-white"
                    >
                      Voltar para todas as congregações
                    </Link>
                    {congregacao.pastorSlug ? (
                      <Link
                        href={`/pastores/${congregacao.pastorSlug}`}
                        className="block transition-colors hover:text-white"
                      >
                        Conhecer o pastor responsável
                      </Link>
                    ) : null}
                    <Link
                      href="/contato"
                      className="block transition-colors hover:text-white"
                    >
                      Falar com a igreja
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
