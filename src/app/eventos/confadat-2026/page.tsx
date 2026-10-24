import type { Metadata } from "next";
import Image, { getImageProps } from "next/image";
import Link from "next/link";
import EventCountdown from "@/components/EventCountdown";
import { CONFADAT_2026 as confadat } from "@/data/confadat-2026";
import { SEDE_POSTAL_ADDRESS, SEDE_WHATSAPP_URL } from "@/data/site";
import { buildPageMetadata, resolveSiteUrl, SITE_NAME } from "@/lib/site";
import styles from "./confadat.module.css";

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
    // As artes não informam o término: o evento entra na agenda só com o início.
    dates: `${formatGoogleCalendarDate(noite.inicioIso)}/${formatGoogleCalendarDate(noite.inicioIso)}`,
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
    <div className="border-t border-[#b18a50]/35 pt-4">
      <p className="text-[0.68rem] font-bold tracking-[0.22em] text-[#743044] uppercase">
        {label}
      </p>
      <p className="mt-1 text-sm leading-relaxed text-[#64534f]">{value}</p>
    </div>
  );
}

export default function Confadat2026Page() {
  const canonicalUrl = resolveSiteUrl(confadat.path);
  const eventEnded = isEventEnded();
  const programacaoPorNoite = confadat.noites
    .map(
      (noite) =>
        `${noite.diaSemana}, ${noite.data.replace(" de 2026", "")}: ${noite.participantes
          .map((participante) => `${participante.nome} (${participante.funcao.toLowerCase()})`)
          .join(" e ")}`
    )
    .join("; ");
  const arteAlt = `Arte oficial do ${confadat.titulo}: ${confadat.tema}, ${confadat.baseBiblica}. ${programacaoPorNoite}. Às ${confadat.horario}, com os pastores Pr. Zacarias Bernardes Félix e Pra. Anna Alzira Félix.`;
  // Art direction: no celular, a hero-mobile (4:5); a partir de md, a faixa
  // hero-desktop (3:1). As duas trazem as três convidadas e a liderança, e vão
  // inteiras. Com <picture>, o navegador baixa só a do tamanho da tela.
  const {
    props: { srcSet: bannerSrcSet },
  } = getImageProps({
    src: confadat.artes.banner,
    alt: arteAlt,
    width: 2172,
    height: 724,
    sizes: "(min-width: 1280px) 1200px, calc(100vw - 3rem)",
  });
  const { props: heroMobileProps } = getImageProps({
    src: confadat.artes.heroMobile,
    alt: arteAlt,
    width: 1080,
    height: 1350,
    sizes: "calc(100vw - 2rem)",
    loading: "eager",
    fetchPriority: "high",
  });
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
    // Sem endDate: as artes não informam o término.
    startDate: confadat.inicioIso,
    inLanguage: "pt-BR",
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: eventEnded
      ? "https://schema.org/OfflineEventAttendanceMode"
      : "https://schema.org/MixedEventAttendanceMode",
    location: eventEnded
      ? sede
      : [sede, { "@type": "VirtualLocation", url: confadat.transmissaoUrl }],
    organizer: { "@type": "Organization", name: SITE_NAME, url: resolveSiteUrl("/") },
    performer: confadat.convidadas.map((convidada) => ({
      "@type": "Person",
      name: convidada.nome,
      ...(convidada.instagram ? { sameAs: [convidada.instagram.href] } : {}),
    })),
    subEvent: confadat.noites.map((noite) => ({
      "@type": "Event",
      name: `${confadat.titulo} — ${noite.noite}`,
      startDate: noite.inicioIso,
      location: sede,
      performer: noite.participantes.map((participante) => ({
        "@type": "Person",
        name: participante.nome,
      })),
    })),
  };

  return (
    <main className={`${styles.page} min-h-screen`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
      />

      <section className={`${styles.opening} py-8 md:py-14`}>
        <div className="ui-page-container">
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex flex-wrap items-center gap-2 text-sm text-[#806a61]"
          >
            <Link href="/" className="transition-colors hover:text-[#542132]">
              Início
            </Link>
            <span>›</span>
            <Link href="/eventos" className="transition-colors hover:text-[#542132]">
              Eventos
            </Link>
            <span>›</span>
            <span className="text-[#542132]">{confadat.titulo}</span>
          </nav>

          <div className="grid gap-8 md:gap-10">
            {/* A arte já traz tema, datas e nomes: vai inteira, sem texto por cima. */}
            <div className="overflow-hidden rounded-[1.5rem] border border-black/5 bg-[#3a0b12] shadow-sm">
              <picture>
                <source
                  media="(min-width: 768px)"
                  srcSet={bannerSrcSet}
                  sizes="(min-width: 1280px) 1200px, calc(100vw - 3rem)"
                  width={2172}
                  height={724}
                />
                <img {...heroMobileProps} alt={arteAlt} className="h-auto w-full" />
              </picture>
            </div>

            <div className={styles.introduction}>
              <div className={styles.introFlowers} aria-hidden="true" />
              <div className={styles.introCopy}>
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
                <h1 className="font-acme text-3xl leading-tight tracking-wide text-[#542132] md:text-5xl">
                  {confadat.titulo}
                </h1>
                <p className="mt-3 max-w-2xl text-lg font-semibold leading-relaxed text-text-accent md:text-2xl">
                  {confadat.tema}
                </p>
                <p className="mt-1 text-sm font-semibold tracking-wide text-[#806a61]">
                  {confadat.descritor} · {confadat.baseBiblica}
                </p>
                <ul className="mt-5 space-y-1.5 text-sm leading-relaxed text-[#555]">
                  {confadat.noites.map((noite) => (
                    <li key={noite.inicioIso}>
                      <span className="font-semibold text-[#542132]">
                        {noite.diaSemana}, {noite.data.replace(" de 2026", "")}:
                      </span>{" "}
                      {noite.participantes.map((participante) => participante.nome).join(" e ")}
                    </li>
                  ))}
                </ul>
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

                {eventEnded ? null : (
                  <>
                    <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                      <a
                        href={buildWhatsAppShareUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ui-btn-ghost"
                      >
                        Compartilhar no WhatsApp
                      </a>
                    </div>

                    <nav
                      aria-label="Prepare-se para o congresso"
                      className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2"
                    >
                      <span className="basis-full text-xs font-bold tracking-[0.22em] text-[#555] uppercase sm:basis-auto">
                        Prepare-se
                      </span>
                      <Link href="#playlist" className="ui-link-accent inline-flex min-h-6 items-center">
                        Playlist do congresso<span aria-hidden="true">&nbsp;→</span>
                      </Link>
                      <Link href="#paleta" className="ui-link-accent inline-flex min-h-6 items-center">
                        Paleta de cores<span aria-hidden="true">&nbsp;→</span>
                      </Link>
                    </nav>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.information}>
        <div className="ui-page-container py-10 md:py-14">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <InfoItem label="Datas" value={`Sexta e sábado, ${confadat.data}`} />
            <InfoItem label="Horário" value={`${confadat.horario}, nas duas noites`} />
            <InfoItem label="Local" value={`${confadat.local} — ${confadat.endereco}`} />
            <InfoItem label="Transmissão" value="Ao vivo no canal da igreja no YouTube" />
          </div>
        </div>
      </section>

      <section className={`${styles.reflection} ui-section`}>
        <div className={styles.reflectionFlowers} aria-hidden="true" />
        <div className="ui-page-container">
          <p className="ui-section-eyebrow ui-section-eyebrow--gold">Para você</p>
          <h2 className="ui-section-title">{confadat.reflexao.titulo}</h2>
          <div className="mt-6 max-w-3xl space-y-4 leading-relaxed text-[#555]">
            {confadat.reflexao.paragrafos.map((paragrafo) => (
              <p key={paragrafo}>{paragrafo}</p>
            ))}
          </div>
          <blockquote className="mt-8 max-w-3xl rounded-[1.5rem] border border-[#b18a50]/30 bg-[#fffaf3] p-6 md:p-8">
            <p className="text-lg leading-relaxed text-[#542132]">“{confadat.reflexao.versiculo}”</p>
            <footer className="mt-3 text-sm font-semibold text-text-accent">
              {confadat.reflexao.referencia}
            </footer>
          </blockquote>
        </div>
      </section>

      <section
        id="mensagem-presidente"
        aria-labelledby="mensagem-presidente-title"
        data-floating-contact-exclusion
        className={`${styles.welcome} ui-section`}
      >
        <div className="ui-page-container">
          <div className={styles.welcomeHeading}>
            <p className="ui-section-eyebrow">Boas-vindas</p>
            <h2 id="mensagem-presidente-title" className="ui-section-title">
              {confadat.mensagemPresidente.titulo}
            </h2>
          </div>
          <div className={styles.letter}>
            <figure className={styles.portrait}>
              <Image
                src={confadat.mensagemPresidente.retrato}
                alt="Pastora Anna Alzira Félix, com a blusa rosa, na fotografia aprovada para o CONFADAT 2026."
                width={1087}
                height={1447}
                // O WebP aprovado já é leve: manter a resolução original do retrato.
                unoptimized
                className={styles.portraitImage}
              />
              <figcaption>
                <span>Pastora Anna Alzira Félix</span>
                <span>Presidente da CONFADAT</span>
              </figcaption>
            </figure>
            <div className={styles.letterCopy}>
              {confadat.mensagemPresidente.paragrafos.map((paragrafo) => (
                <p key={paragrafo}>{paragrafo}</p>
              ))}
              <footer className={styles.signature}>
                <p>{confadat.mensagemPresidente.assinatura}</p>
                <p>{confadat.mensagemPresidente.identificacao}</p>
              </footer>
            </div>
          </div>
          <p className="mt-6 md:hidden">
            <a
              href={SEDE_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="ui-btn-secondary"
            >
              Falar com a igreja pelo WhatsApp
            </a>
          </p>
        </div>
      </section>

      <section
        id="programacao"
        aria-labelledby="programacao-confadat-title"
        className={`${styles.programme} ui-section ui-section--dense scroll-mt-28`}
      >
        <div className={styles.programmeFlowers} aria-hidden="true" />
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
                className="rounded-[1.5rem] border border-black/5 bg-[#fffcf8] p-6 shadow-sm"
              >
                <p className="text-xs font-bold tracking-[0.22em] text-text-accent uppercase">
                  {noite.noite} · {noite.diaSemana}
                </p>
                <h3 className="mt-2 font-acme text-2xl tracking-wide text-[#542132] md:text-3xl">
                  {noite.data}
                </h3>
                <ul className="mt-5 space-y-2 text-sm text-[#555]">
                  {noite.participantes.map((participante) => (
                    <li key={participante.nome}>
                      <span className="font-semibold text-[#542132]">{participante.nome}</span>
                      {" · "}
                      {participante.funcao}
                    </li>
                  ))}
                </ul>
                <dl className="mt-5 grid gap-4 text-sm text-[#555] sm:grid-cols-2">
                  <div>
                    <dt className="font-semibold text-[#542132]">Horário</dt>
                    <dd>{noite.horario}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-[#542132]">Local</dt>
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

          {eventEnded ? null : (
            <div className="mt-6 max-w-3xl rounded-[1.5rem] border border-[#b18a50]/30 bg-[#f8eee8] p-5 md:p-6">
              <p className="text-xs font-bold tracking-[0.22em] text-[#743044] uppercase">
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
          )}
        </div>
      </section>

      <section aria-labelledby="convidadas-confadat-title" className={`${styles.guests} ui-section`}>
        <div className="ui-page-container">
          <p className="ui-section-eyebrow">Convidadas e liderança</p>
          <h2 id="convidadas-confadat-title" className="ui-section-title">
            Quem ministra
          </h2>

          {/* Artes individuais do kit (4:5), inteiras: o card cresce com a arte. */}
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {confadat.convidadas.map((convidada) => (
              <li
                key={convidada.nome}
                className="overflow-hidden rounded-[1.5rem] border border-black/6 bg-[#fffcf8] shadow-sm"
              >
                <Image
                  src={convidada.arte}
                  alt={`Arte do ${confadat.titulo}: ${convidada.nome}, ${convidada.funcao.toLowerCase()}, ${convidada.quando.toLowerCase()}, às ${confadat.horario}`}
                  width={1080}
                  height={1350}
                  sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                  className="h-auto w-full"
                />
                <div className="p-5">
                  <p className="text-[0.68rem] font-bold tracking-[0.2em] text-text-accent uppercase">
                    {convidada.funcao} · {convidada.quando}
                  </p>
                  <h3 className="mt-1.5 font-acme text-xl tracking-wide text-[#542132]">
                    {convidada.nome}
                  </h3>
                  {convidada.instagram ? (
                    <p className="mt-3 text-sm text-[#555]">
                      Instagram:{" "}
                      <a
                        href={convidada.instagram.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Abrir o Instagram de ${convidada.nome} (${convidada.instagram.usuario}) em nova aba`}
                        className="break-all font-semibold text-text-accent underline-offset-4 hover:underline"
                      >
                        {convidada.instagram.usuario}
                      </a>
                    </p>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>

          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {confadat.liderancas.map((lideranca) => (
              <li
                key={lideranca.nome}
                className="overflow-hidden rounded-[1.5rem] border border-black/5 bg-[#fffcf8]"
              >
                <Image
                  src={lideranca.arte}
                  alt={`Arte do ${confadat.titulo}: ${lideranca.nome}, ${lideranca.papel}`}
                  width={1080}
                  height={1350}
                  sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                  className="h-auto w-full"
                />
                <div className="p-5">
                  <p className="text-xs font-bold tracking-[0.22em] text-[#743044] uppercase">
                    {lideranca.papel}
                  </p>
                  <p className="mt-1.5 font-acme text-xl tracking-wide text-[#542132]">
                    {lideranca.nome}
                  </p>
                </div>
              </li>
            ))}
            <li className="self-start rounded-[1.5rem] border border-black/5 bg-[#fffcf8] p-6">
              <p className="text-xs font-bold tracking-[0.22em] text-[#743044] uppercase">
                Realização
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[#555]">
                <Link
                  href={confadat.ministerio.path}
                  className="font-semibold text-text-accent underline-offset-4 hover:underline"
                >
                  {confadat.ministerio.nome}
                </Link>
              </p>
            </li>
          </ul>
        </div>
      </section>

      <section
        id="playlist"
        aria-labelledby="playlist-confadat-title"
        className={`${styles.playlist} ui-section ui-section--dense scroll-mt-28`}
      >
        <div className={styles.playlistFlowers} aria-hidden="true" />
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
                className="flex items-center gap-4 rounded-[1.25rem] border border-black/5 bg-[#fffcf8] px-5 py-4"
              >
                <span
                  aria-hidden="true"
                  className="w-6 shrink-0 text-center font-acme text-2xl text-text-accent"
                >
                  {indice + 1}
                </span>
                <div>
                  <p className="font-semibold text-[#542132]">{faixa.titulo}</p>
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

      {eventEnded ? null : (
        <section id="paleta" aria-labelledby="paleta-confadat-title" className={`${styles.palette} ui-section scroll-mt-28`}>
          <div className="ui-page-container">
            <div className="max-w-3xl">
              <p className="ui-section-eyebrow ui-section-eyebrow--gold">Paleta de cores</p>
              <h2 id="paleta-confadat-title" className="ui-section-title">
                Escolha o seu tom
              </h2>
              <p className="mt-4 leading-relaxed text-[#555]">
                Estas são as cores da festividade, para usar em vestido, em blusa e saia ou
                numa blusa com saia preta. A paleta é um convite, não uma condição para
                participar: quem não tiver roupa nesses tons é bem-vinda do mesmo jeito.
              </p>
            </div>

            <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {confadat.paleta.cores.map((cor) => (
                <li
                  key={cor.hex}
                  className="overflow-hidden rounded-[1.25rem] border border-black/5 bg-white shadow-sm"
                >
                  <div
                    aria-hidden="true"
                    className="h-20 border-b border-black/5"
                    style={{ backgroundColor: cor.hex }}
                  />
                  <div className="px-4 py-3">
                    <p className="font-semibold text-[#542132]">{cor.nome}</p>
                    <p className="font-mono text-xs tracking-wide text-[#666]">{cor.hex}</p>
                  </div>
                </li>
              ))}
            </ul>

            <h3 className="mt-12 font-acme text-2xl tracking-wide text-[#542132]">
              Inspirações de look
            </h3>
            <ul className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-3">
              {confadat.paleta.looks.map((look) => (
                <li key={look.src}>
                  <figure>
                    <a
                      href={look.src}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Ampliar a imagem: ${look.alt}`}
                      className="block overflow-hidden rounded-[1.25rem] border border-black/5 bg-white shadow-sm"
                    >
                      <Image
                        src={look.src}
                        alt={look.alt}
                        width={1080}
                        height={1350}
                        sizes="(max-width: 768px) calc(50vw - 1.5rem), 360px"
                        className="h-auto w-full"
                      />
                    </a>
                    <figcaption className="mt-2 text-sm leading-snug">
                      <span className="block font-semibold text-[#542132]">{look.titulo}</span>
                      <span className="block text-[#666]">{look.legenda}</span>
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className={`${styles.invitation} py-10 md:py-14`}>
        <div className={styles.invitationFlowers} aria-hidden="true" />
        <div className="ui-page-container flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-bold tracking-[0.24em] text-[#743044] uppercase">
              {confadat.titulo} — {confadat.tema}
            </p>
            <h2 className="mt-3 font-acme text-2xl tracking-wide md:text-4xl">
              Há um lugar preparado para você
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#64534f] md:text-base">
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
