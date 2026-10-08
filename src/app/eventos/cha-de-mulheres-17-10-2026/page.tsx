import type { Metadata } from "next";
import { getImageProps } from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import EventCountdown from "@/components/EventCountdown";
import { CHA_DE_MULHERES_17_10_2026 as cha } from "@/data/cha-de-mulheres-17-10-2026";
import { getCongregacaoBySlug } from "@/data/congregacoes";
import { buildPageMetadata, resolveSiteUrl, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: cha.tituloSeo,
  description: cha.descricaoSeo,
  path: cha.path,
  image: cha.artes.og,
  keywords: [...cha.keywords],
});

// Página estática por padrão — sem isso, a checagem de "evento encerrado"
// abaixo fica congelada na data do último build/deploy.
export const revalidate = 3600;

function formatGoogleCalendarDate(iso: string) {
  return new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
}

function buildGoogleCalendarUrl() {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: cha.titulo,
    dates: `${formatGoogleCalendarDate(cha.inicioIso)}/${formatGoogleCalendarDate(cha.fimIso)}`,
    details: cha.descricaoSeo,
    location: cha.endereco,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function buildWhatsAppShareUrl() {
  const mensagem = `${cha.titulo} — ${cha.diaSemana}, ${cha.data}, às ${cha.horario}, na ${cha.endereco}. Mais informações: ${resolveSiteUrl(cha.path)}`;
  return `https://wa.me/?text=${encodeURIComponent(mensagem)}`;
}

function isEventEnded(now = new Date()) {
  return now.getTime() > new Date(cha.fimIso).getTime();
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-white/10 pt-4">
      <p className="text-[0.68rem] font-bold tracking-[0.22em] text-text-accent-on-dark uppercase">
        {label}
      </p>
      <p className="mt-1 text-sm leading-relaxed text-white/82">{value}</p>
    </div>
  );
}

export default function ChaDeMulheres17102026Page() {
  const congregacao = getCongregacaoBySlug(cha.congregacaoSlug);
  if (!congregacao) {
    notFound();
  }

  const canonicalUrl = resolveSiteUrl(cha.path);
  const eventEnded = isEventEnded();
  // Art direction: no celular, a arte do story (9:16) se lê melhor; a partir de
  // md, a do feed (4:5). Com <picture>, o navegador baixa só a do tamanho da tela.
  const arteAlt =
    "Arte do Chá de Mulheres: sábado, 17 de outubro, às 19h, na Estrada do Ramalho, 918, Chácaras Brasil, Atibaia";
  const {
    props: { srcSet: feedSrcSet },
  } = getImageProps({ src: cha.artes.feed, alt: arteAlt, width: 1080, height: 1350, sizes: "420px" });
  const { props: storyProps } = getImageProps({
    src: cha.artes.story,
    alt: arteAlt,
    width: 1080,
    height: 1920,
    sizes: "100vw",
    loading: "eager",
    fetchPriority: "high",
  });
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${canonicalUrl}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: resolveSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Eventos", item: resolveSiteUrl("/eventos") },
      { "@type": "ListItem", position: 3, name: cha.titulo, item: canonicalUrl },
    ],
  };
  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    "@id": `${canonicalUrl}#event`,
    name: `${cha.titulo} — ${cha.data}`,
    description: cha.descricaoSeo,
    url: canonicalUrl,
    image: [resolveSiteUrl(cha.artes.og)],
    startDate: cha.inicioIso,
    endDate: cha.fimIso,
    inLanguage: "pt-BR",
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: cha.endereco,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Estrada do Ramalho, 918",
        addressLocality: "Atibaia",
        addressRegion: "SP",
        addressCountry: "BR",
      },
      hasMap: cha.mapsUrl,
    },
    organizer: { "@type": "Organization", name: SITE_NAME, url: resolveSiteUrl("/") },
    performer: cha.participantes.map((pessoa) => ({ "@type": "Person", name: pessoa.nome })),
  };

  return (
    <main className="min-h-screen bg-[#f5f5f5]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
      />

      <section className="py-8 md:py-14">
        <div className="ui-page-container">
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex flex-wrap items-center gap-2 text-sm text-[#8a8a8a]"
          >
            <Link href="/" className="transition-colors hover:text-[#212121]">
              Início
            </Link>
            <span>›</span>
            <Link href="/eventos" className="transition-colors hover:text-[#212121]">
              Eventos
            </Link>
            <span>›</span>
            <span className="text-[#212121]">{cha.titulo}</span>
          </nav>

          <div className="grid gap-8 md:grid-cols-[minmax(0,420px)_minmax(0,1fr)] md:items-start md:gap-12">
            <div className="overflow-hidden rounded-[1.5rem] border border-black/5 bg-white shadow-sm">
              <picture>
                <source
                  media="(min-width: 768px)"
                  srcSet={feedSrcSet}
                  sizes="420px"
                  width={1080}
                  height={1350}
                />
                <img {...storyProps} alt={arteAlt} className="h-auto w-full" />
              </picture>
            </div>

            <div>
              <div className="mb-4">
                {eventEnded ? (
                  <span className="inline-flex items-center rounded-full border border-black/10 bg-[#eeeeee] px-4 py-2 text-xs font-bold tracking-[0.18em] text-[#555] uppercase">
                    Evento encerrado
                  </span>
                ) : (
                  <EventCountdown
                    targetIso={cha.inicioIso}
                    endIso={cha.fimIso}
                    eventName={cha.titulo}
                  />
                )}
              </div>

              <p className="mb-2 text-xs font-bold tracking-[0.28em] text-text-accent uppercase">
                {cha.diaSemana}, {cha.data} · {cha.horario}
              </p>
              <h1 className="font-acme text-3xl leading-tight tracking-wide text-[#212121] md:text-5xl">
                {cha.titulo}
              </h1>
              <p className="mt-3 max-w-2xl text-lg font-semibold leading-relaxed text-text-accent md:text-2xl">
                {cha.subtitulo}
              </p>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#555]">
                {cha.descricaoTopo}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                {eventEnded ? (
                  <Link href="/eventos" className="ui-btn-primary">
                    Ver próximos eventos
                  </Link>
                ) : (
                  <a
                    href={cha.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ui-btn-primary"
                  >
                    Como chegar
                  </a>
                )}
                <Link href={`/congregacoes/${congregacao.slug}`} className="ui-btn-secondary">
                  Conhecer a congregação
                </Link>
              </div>

              {eventEnded ? null : (
                <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={buildGoogleCalendarUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ui-btn-ghost"
                  >
                    Adicionar ao calendário
                  </a>
                  <a
                    href={buildWhatsAppShareUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ui-btn-ghost"
                  >
                    Compartilhar no WhatsApp
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#160e08] text-white">
        <div className="ui-page-container py-10 md:py-14">
          <div className="grid gap-4 sm:grid-cols-3">
            <InfoItem label="Data" value={`${cha.diaSemana}, ${cha.data}`} />
            <InfoItem label="Horário" value={cha.horario} />
            <InfoItem label="Local" value={cha.endereco} />
          </div>
        </div>
      </section>

      <section className="ui-section">
        <div className="ui-page-container">
          <p className="ui-section-eyebrow ui-section-eyebrow--gold">Para você</p>
          <h2 className="ui-section-title">Uma só coisa é necessária</h2>
          <div className="mt-6 max-w-3xl space-y-4 leading-relaxed text-[#555]">
            {cha.reflexao.paragrafos.map((paragrafo) => (
              <p key={paragrafo}>{paragrafo}</p>
            ))}
          </div>
          <blockquote className="mt-8 max-w-3xl rounded-[1.5rem] border border-[#ffa726]/25 bg-[#fff8ee] p-6 md:p-8">
            <p className="text-lg leading-relaxed text-[#212121]">“{cha.reflexao.versiculo}”</p>
            <footer className="mt-3 text-sm font-semibold text-text-accent">
              {cha.reflexao.referencia}
            </footer>
          </blockquote>
        </div>
      </section>

      <section
        aria-labelledby="participantes-cha-title"
        className="ui-section ui-section--dense bg-white"
      >
        <div className="ui-page-container">
          <p className="ui-section-eyebrow">Participações e lideranças</p>
          <h2 id="participantes-cha-title" className="ui-section-title">
            Quem participa
          </h2>

          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {cha.participantes.map((pessoa) => (
              <li
                key={pessoa.nome}
                className="rounded-[1.5rem] border border-black/6 bg-[#faf8f3] p-5 shadow-sm"
              >
                <p className="text-[0.68rem] font-bold tracking-[0.2em] text-text-accent uppercase">
                  {pessoa.papel}
                </p>
                <h3 className="mt-1.5 font-acme text-xl tracking-wide text-[#212121]">
                  {pessoa.nome}
                </h3>
              </li>
            ))}
          </ul>

          <dl className="mt-6 grid gap-4 sm:grid-cols-2">
            {cha.liderancas.map((lideranca) => (
              <div
                key={lideranca.papel}
                className="rounded-[1.5rem] border border-black/5 bg-[#f9f9f9] p-6"
              >
                <dt className="text-xs font-bold tracking-[0.22em] text-[#ef5350] uppercase">
                  {lideranca.papel}
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-[#555]">{lideranca.nomes}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="bg-[#212121] py-10 text-white md:py-14">
        <div className="ui-page-container flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-bold tracking-[0.24em] text-text-accent-on-dark uppercase">
              {cha.titulo} — {cha.data}
            </p>
            <h2 className="mt-3 font-acme text-2xl tracking-wide md:text-4xl">
              Há um lugar preparado para você nesta mesa
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/72 md:text-base">
              {cha.diaSemana}, {cha.data}, às {cha.horario}, na {cha.endereco}.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/eventos" className="ui-btn-primary">
              Ver todos os eventos
            </Link>
            <Link href="/contato" className="ui-btn-ghost-dark">
              Falar com a igreja
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
