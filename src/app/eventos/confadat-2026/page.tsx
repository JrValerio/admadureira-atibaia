import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import EventCountdown from "@/components/EventCountdown";
import { CONFADAT_2026 as confadat } from "@/data/confadat-2026";
import { SEDE_POSTAL_ADDRESS } from "@/data/site";
import { buildPageMetadata, resolveSiteUrl, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: confadat.tituloSeo,
  description: confadat.descricaoSeo,
  path: confadat.path,
  image: confadat.artes.og,
  keywords: [...confadat.keywords],
});

// Página estática por padrão — sem isso, a checagem de "evento encerrado"
// abaixo fica congelada na data do último build/deploy.
export const revalidate = 3600;

type Noite = (typeof confadat.noites)[number];

function formatGoogleCalendarDate(iso: string) {
  return new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
}

function buildGoogleCalendarUrl(noite: Noite) {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${confadat.titulo} — ${noite.noite}`,
    dates: `${formatGoogleCalendarDate(noite.inicioIso)}/${formatGoogleCalendarDate(noite.fimIso)}`,
    details: confadat.descricaoSeo,
    location: `${confadat.local}, ${confadat.endereco}`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function buildWhatsAppShareUrl() {
  const mensagem = `${confadat.titulo} — ${confadat.tema}. ${confadat.data}, às ${confadat.horario}, na Igreja Sede (${confadat.endereco}). Mais informações: ${resolveSiteUrl(confadat.path)}`;
  return `https://wa.me/?text=${encodeURIComponent(mensagem)}`;
}

function isEventEnded(now = new Date()) {
  return now.getTime() > new Date(confadat.fimIso).getTime();
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

export default function Confadat2026Page() {
  const canonicalUrl = resolveSiteUrl(confadat.path);
  const eventEnded = isEventEnded();
  const preletorasNomes = confadat.preletoras.map((preletora) => preletora.nome).join(" e ");
  const arteAlt = `Arte oficial do ${confadat.titulo}: ${confadat.tema}, ${confadat.baseBiblica}. Preletoras: ${preletorasNomes}. ${confadat.data}, sexta e sábado, às ${confadat.horario}.`;
  const sede = {
    "@type": "Place",
    name: confadat.local,
    address: SEDE_POSTAL_ADDRESS,
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${canonicalUrl}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: resolveSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Eventos", item: resolveSiteUrl("/eventos") },
      { "@type": "ListItem", position: 3, name: confadat.titulo, item: canonicalUrl },
    ],
  };
  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    "@id": `${canonicalUrl}#event`,
    name: `${confadat.titulo} — ${confadat.tema}`,
    description: confadat.descricaoSeo,
    url: canonicalUrl,
    image: [resolveSiteUrl(confadat.artes.og)],
    startDate: confadat.inicioIso,
    endDate: confadat.fimIso,
    inLanguage: "pt-BR",
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: eventEnded
      ? "https://schema.org/OfflineEventAttendanceMode"
      : "https://schema.org/MixedEventAttendanceMode",
    location: eventEnded
      ? sede
      : [sede, { "@type": "VirtualLocation", url: confadat.transmissaoUrl }],
    organizer: { "@type": "Organization", name: SITE_NAME, url: resolveSiteUrl("/") },
    performer: confadat.preletoras.map((preletora) => ({
      "@type": "Person",
      name: preletora.nome,
      sameAs: [preletora.instagram.href],
    })),
    subEvent: confadat.noites.map((noite) => ({
      "@type": "Event",
      name: `${confadat.titulo} — ${noite.noite}`,
      startDate: noite.inicioIso,
      endDate: noite.fimIso,
      location: sede,
    })),
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
            <span className="text-[#212121]">{confadat.titulo}</span>
          </nav>

          <div className="grid gap-8 md:grid-cols-[minmax(0,420px)_minmax(0,1fr)] md:items-start md:gap-12">
            {/* A arte já traz tema, datas e nomes: vai inteira, sem texto por cima.
                Só a do feed (4:5) entra no site, também no celular. */}
            <div className="overflow-hidden rounded-[1.5rem] border border-black/5 bg-white shadow-sm">
              <Image
                src={confadat.artes.feed}
                alt={arteAlt}
                width={1080}
                height={1350}
                priority
                fetchPriority="high"
                sizes="(max-width: 768px) calc(100vw - 2rem), 420px"
                className="h-auto w-full"
              />
            </div>

            <div>
              <div className="mb-4">
                {eventEnded ? (
                  <span className="inline-flex items-center rounded-full border border-black/10 bg-[#eeeeee] px-4 py-2 text-xs font-bold tracking-[0.18em] text-[#555] uppercase">
                    Evento encerrado
                  </span>
                ) : (
                  <EventCountdown
                    targetIso={confadat.inicioIso}
                    endIso={confadat.fimIso}
                    eventName={confadat.titulo}
                  />
                )}
              </div>

              <p className="mb-2 text-xs font-bold tracking-[0.28em] text-text-accent uppercase">
                {confadat.data} · {confadat.horario}
              </p>
              <h1 className="font-acme text-3xl leading-tight tracking-wide text-[#212121] md:text-5xl">
                {confadat.titulo}
              </h1>
              <p className="mt-3 max-w-2xl text-lg font-semibold leading-relaxed text-text-accent md:text-2xl">
                {confadat.tema}
              </p>
              <p className="mt-1 text-sm font-semibold tracking-wide text-[#8a8a8a]">
                {confadat.descritor} · {confadat.baseBiblica}
              </p>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#555]">
                {confadat.descricaoTopo}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                {eventEnded ? (
                  <Link href="/eventos" className="ui-btn-primary">
                    Ver próximos eventos
                  </Link>
                ) : (
                  <a
                    href={confadat.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ui-btn-primary"
                  >
                    Como chegar
                  </a>
                )}
                <Link href="#programacao" className="ui-btn-secondary">
                  Ver programação
                </Link>
              </div>

              <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                {eventEnded ? null : (
                  <a
                    href={buildWhatsAppShareUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ui-btn-ghost"
                  >
                    Compartilhar no WhatsApp
                  </a>
                )}
                <Link href="#playlist" className="ui-btn-ghost">
                  Ouvir a playlist
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#160e08] text-white">
        <div className="ui-page-container py-10 md:py-14">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <InfoItem label="Datas" value={`Sexta e sábado, ${confadat.data}`} />
            <InfoItem label="Horário" value={`${confadat.horario}, nas duas noites`} />
            <InfoItem label="Local" value={`Igreja Sede — ${confadat.endereco}`} />
            <InfoItem label="Transmissão" value="Ao vivo no canal da igreja no YouTube" />
          </div>
        </div>
      </section>

      <section className="ui-section">
        <div className="ui-page-container">
          <p className="ui-section-eyebrow ui-section-eyebrow--gold">Para você</p>
          <h2 className="ui-section-title">{confadat.reflexao.titulo}</h2>
          <div className="mt-6 max-w-3xl space-y-4 leading-relaxed text-[#555]">
            {confadat.reflexao.paragrafos.map((paragrafo) => (
              <p key={paragrafo}>{paragrafo}</p>
            ))}
          </div>
          <blockquote className="mt-8 max-w-3xl rounded-[1.5rem] border border-[#ffa726]/25 bg-[#fff8ee] p-6 md:p-8">
            <p className="text-lg leading-relaxed text-[#212121]">“{confadat.reflexao.versiculo}”</p>
            <footer className="mt-3 text-sm font-semibold text-text-accent">
              {confadat.reflexao.referencia}
            </footer>
          </blockquote>
        </div>
      </section>

      <section
        id="programacao"
        aria-labelledby="programacao-confadat-title"
        className="ui-section ui-section--dense scroll-mt-28 bg-white"
      >
        <div className="ui-page-container">
          <div className="mb-8 max-w-3xl">
            <p className="ui-section-eyebrow">Programação</p>
            <h2 id="programacao-confadat-title" className="ui-section-title">
              Duas noites de Palavra, louvor e oração
            </h2>
          </div>

          <ul className="grid gap-5 md:grid-cols-2">
            {confadat.noites.map((noite) => (
              <li
                key={noite.inicioIso}
                className="rounded-[1.5rem] border border-black/5 bg-[#f9f9f9] p-6 shadow-sm"
              >
                <p className="text-xs font-bold tracking-[0.22em] text-text-accent uppercase">
                  {noite.noite} · {noite.diaSemana}
                </p>
                <h3 className="mt-2 font-acme text-2xl tracking-wide text-[#212121] md:text-3xl">
                  {noite.data}
                </h3>
                <dl className="mt-5 grid gap-4 text-sm text-[#555] sm:grid-cols-2">
                  <div>
                    <dt className="font-semibold text-[#212121]">Horário</dt>
                    <dd>{noite.horario}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-[#212121]">Local</dt>
                    <dd>Igreja Sede</dd>
                  </div>
                </dl>
                {eventEnded ? null : (
                  <a
                    href={buildGoogleCalendarUrl(noite)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Adicionar a ${noite.noite} do ${confadat.titulo} ao Google Agenda`}
                    className="ui-btn-ghost mt-6"
                  >
                    Adicionar ao calendário
                  </a>
                )}
              </li>
            ))}
          </ul>

          <div className="mt-6 max-w-3xl rounded-[1.5rem] border border-[#ffa726]/20 bg-[#fff8ee] p-5 md:p-6">
            <p className="text-xs font-bold tracking-[0.22em] text-[#ef5350] uppercase">
              Transmissão ao vivo
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[#555]">
              Nada substitui estar na Casa de Deus com as irmãs. Se não puder estar
              presente, acompanhe as duas noites ao vivo no canal da igreja.
            </p>
            <a
              href={confadat.transmissaoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ui-link-accent mt-3 inline-flex"
            >
              Abrir o canal no YouTube →
            </a>
          </div>
        </div>
      </section>

      <section aria-labelledby="preletoras-confadat-title" className="ui-section">
        <div className="ui-page-container">
          <p className="ui-section-eyebrow">Preletoras e liderança</p>
          <h2 id="preletoras-confadat-title" className="ui-section-title">
            Quem ministra
          </h2>

          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {confadat.preletoras.map((preletora) => (
              <li
                key={preletora.nome}
                className="rounded-[1.5rem] border border-black/6 bg-[#faf8f3] p-5 shadow-sm"
              >
                <p className="text-[0.68rem] font-bold tracking-[0.2em] text-text-accent uppercase">
                  {preletora.papel}
                </p>
                <h3 className="mt-1.5 font-acme text-xl tracking-wide text-[#212121]">
                  {preletora.nome}
                </h3>
                <p className="mt-3 text-sm text-[#555]">
                  Instagram:{" "}
                  <a
                    href={preletora.instagram.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Abrir o Instagram de ${preletora.nome} (${preletora.instagram.usuario}) em nova aba`}
                    className="break-all font-semibold text-text-accent underline-offset-4 hover:underline"
                  >
                    {preletora.instagram.usuario}
                  </a>
                </p>
              </li>
            ))}
          </ul>

          <dl className="mt-6 grid gap-4 sm:grid-cols-2">
            {confadat.liderancas.map((lideranca) => (
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
            <div className="rounded-[1.5rem] border border-black/5 bg-[#f9f9f9] p-6">
              <dt className="text-xs font-bold tracking-[0.22em] text-[#ef5350] uppercase">
                Realização
              </dt>
              <dd className="mt-2 text-sm leading-relaxed text-[#555]">
                <Link
                  href={confadat.ministerio.path}
                  className="font-semibold text-text-accent underline-offset-4 hover:underline"
                >
                  {confadat.ministerio.nome}
                </Link>
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section
        id="playlist"
        aria-labelledby="playlist-confadat-title"
        className="ui-section ui-section--dense scroll-mt-28 bg-white"
      >
        <div className="ui-page-container">
          <div className="max-w-3xl">
            <p className="ui-section-eyebrow ui-section-eyebrow--gold">Playlist do congresso</p>
            <h2 id="playlist-confadat-title" className="ui-section-title">
              Prepare o coração para adorar
            </h2>
            <p className="mt-4 leading-relaxed text-[#555]">
              Quatro canções para ouvir até o congresso: em casa, no carro, a caminho do
              trabalho. Louvor não é trilha de fundo, é preparo do coração para o que Deus
              vai falar nestas duas noites.
            </p>
          </div>

          <ol className="mt-8 grid gap-3 sm:grid-cols-2">
            {confadat.playlist.faixas.map((faixa, indice) => (
              <li
                key={faixa.titulo}
                className="flex items-center gap-4 rounded-[1.25rem] border border-black/5 bg-[#f9f9f9] px-5 py-4"
              >
                <span
                  aria-hidden="true"
                  className="w-6 shrink-0 text-center font-acme text-2xl text-text-accent"
                >
                  {indice + 1}
                </span>
                <div>
                  <p className="font-semibold text-[#212121]">{faixa.titulo}</p>
                  <p className="text-sm text-[#666]">{faixa.artista}</p>
                </div>
              </li>
            ))}
          </ol>

          <ul className="mt-6 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
            {confadat.playlist.plataformas.map((plataforma) => (
              <li key={plataforma.nome} className="flex">
                <a
                  href={plataforma.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Ouvir a playlist do ${confadat.titulo} no ${plataforma.nome}, em nova aba`}
                  className={`${plataforma.principal ? "ui-btn-primary" : "ui-btn-secondary"} w-full`}
                >
                  {plataforma.nome}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-[#212121] py-10 text-white md:py-14">
        <div className="ui-page-container flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-bold tracking-[0.24em] text-text-accent-on-dark uppercase">
              {confadat.titulo} — {confadat.tema}
            </p>
            <h2 className="mt-3 font-acme text-2xl tracking-wide md:text-4xl">
              Há um lugar preparado para você
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/72 md:text-base">
              Sexta e sábado, {confadat.data}, às {confadat.horario}, na Igreja Sede —{" "}
              {confadat.endereco}.
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
