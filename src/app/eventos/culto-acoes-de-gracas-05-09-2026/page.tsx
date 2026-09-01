import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import EventCountdown from "@/components/EventCountdown";
import { CULTO_ACOES_DE_GRACAS_05_09_2026 as culto } from "@/data/culto-acoes-de-gracas-05-09-2026";
import { OFFICIAL_SOCIAL_LINKS, SEDE_POSTAL_ADDRESS } from "@/data/site";
import { buildPageMetadata, resolveSiteUrl, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: culto.tituloSeo,
  description: culto.descricaoSeo,
  path: culto.path,
  image: culto.heroShare,
  keywords: [...culto.keywords],
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
    text: culto.titulo,
    dates: `${formatGoogleCalendarDate(culto.inicioIso)}/${formatGoogleCalendarDate(culto.fimIso)}`,
    details: culto.descricaoSeo,
    location: `${culto.local}, ${culto.endereco}`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function buildWhatsAppShareUrl() {
  const canonicalUrl = resolveSiteUrl(culto.path);
  const mensagem = `${culto.titulo} — ${culto.diaSemana}, ${culto.data}, às ${culto.horario}. ${culto.subtitulo}. Mais informações: ${canonicalUrl}`;
  return `https://wa.me/?text=${encodeURIComponent(mensagem)}`;
}

function isEventEnded(now = new Date()) {
  return now.getTime() > new Date(culto.fimIso).getTime();
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-white/10 pt-4">
      <p className="text-[0.68rem] font-bold tracking-[0.22em] text-[#ffa726] uppercase">
        {label}
      </p>
      <p className="mt-1 text-sm leading-relaxed text-white/82">{value}</p>
    </div>
  );
}

type SocialProfileLinkProps = {
  plataforma: "Instagram" | "YouTube";
  usuario: string;
  href: string;
  nome: string;
  dark?: boolean;
};

function SocialIcon({ plataforma }: { plataforma: "Instagram" | "YouTube" }) {
  if (plataforma === "Instagram") {
    return (
      <svg
        aria-hidden="true"
        focusable="false"
        className="h-5 w-5"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className="h-5 w-5"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function SocialProfileLink({
  plataforma,
  usuario,
  href,
  nome,
  dark = false,
}: SocialProfileLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Abrir ${plataforma} oficial de ${nome} (${usuario}) em nova aba`}
      className={`group flex min-h-12 w-full min-w-0 items-center gap-3 rounded-2xl border px-3 py-2.5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
        dark
          ? "border-white/40 bg-white/[0.06] text-white hover:border-[#ffa726] hover:bg-[#ffa726] hover:text-[#111] focus-visible:ring-[#ffa726] focus-visible:ring-offset-[#160e08]"
          : "border-[#6f6f6f] bg-white text-[#212121] hover:border-[#8b5b18] hover:bg-[#fff8ee] focus-visible:ring-[#8b5b18] focus-visible:ring-offset-white"
      }`}
    >
      <span
        aria-hidden="true"
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
          dark ? "bg-white/10 group-hover:bg-black/10" : "bg-[#f5f1e9]"
        }`}
      >
        <SocialIcon plataforma={plataforma} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[0.65rem] font-bold tracking-[0.16em] uppercase opacity-70">
          {plataforma}
        </span>
        <span className="mt-0.5 block break-all text-xs leading-snug font-semibold">
          {usuario}
        </span>
      </span>
      <svg
        aria-hidden="true"
        focusable="false"
        className="h-4 w-4 shrink-0 opacity-60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 5h6m0 0v6m0-6L10 14" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 13v6H5V5h6" />
      </svg>
    </a>
  );
}

export default function CultoAcoesDeGracas05092026Page() {
  const canonicalUrl = resolveSiteUrl(culto.path);
  const eventEnded = isEventEnded();
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${canonicalUrl}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: resolveSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Eventos", item: resolveSiteUrl("/eventos") },
      { "@type": "ListItem", position: 3, name: culto.titulo, item: canonicalUrl },
    ],
  };
  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    "@id": `${canonicalUrl}#event`,
    name: `${culto.titulo} — ${culto.data}`,
    description: culto.descricaoSeo,
    url: canonicalUrl,
    image: [resolveSiteUrl(culto.hero)],
    startDate: culto.inicioIso,
    endDate: culto.fimIso,
    inLanguage: "pt-BR",
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: culto.local,
      address: SEDE_POSTAL_ADDRESS,
    },
    organizer: {
      "@type": "Organization",
      name: SITE_NAME,
      url: resolveSiteUrl("/"),
    },
    performer: [
      {
        "@type": "Person",
        name: culto.preletor.nome,
        image: resolveSiteUrl(culto.preletor.foto),
        sameAs: culto.preletor.redes.map((rede) => rede.href),
      },
    ],
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

      <div className="w-full overflow-hidden bg-[#140a06]">
        <div className="relative mx-auto h-[clamp(184px,51vw,216px)] w-full max-w-[1536px] md:aspect-[2172/724] md:h-auto">
          <Image
            src={culto.hero}
            alt={`${culto.titulo} — ${culto.data}`}
            fill
            priority
            fetchPriority="high"
            sizes="(min-width: 1536px) 1536px, 100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        </div>
      </div>

      <section className="py-8 md:py-14">
        <div className="ui-page-container ui-page-container--narrow">
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
            <span className="text-[#212121]">{culto.titulo}</span>
          </nav>

          <div className="mb-4">
            {eventEnded ? (
              <span className="inline-flex items-center rounded-full border border-black/10 bg-[#eeeeee] px-4 py-2 text-xs font-bold tracking-[0.18em] text-[#555] uppercase">
                Evento encerrado
              </span>
            ) : (
              <EventCountdown
                targetIso={culto.inicioIso}
                endIso={culto.fimIso}
                eventName={culto.titulo}
              />
            )}
          </div>

          <p className="mb-2 text-xs font-bold tracking-[0.28em] text-[#ffa726] uppercase">
            {culto.diaSemana}, {culto.data} · {culto.horario}
          </p>
          <h1 className="font-acme text-3xl leading-tight tracking-wide text-[#212121] md:text-5xl">
            {culto.titulo}
          </h1>
          <p className="mt-3 max-w-2xl text-lg font-semibold leading-relaxed text-[#8b5b18] md:text-2xl">
            {culto.subtitulo}
          </p>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#555]">
            {culto.descricaoTopo}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {eventEnded ? (
              <>
                <Link href="/galeria" className="ui-btn-primary">
                  Ver fotos e vídeos
                </Link>
                <Link href="/eventos" className="ui-btn-secondary">
                  Ver próximos eventos
                </Link>
              </>
            ) : (
              <>
                <Link href="/contato" className="ui-btn-primary">
                  Como chegar
                </Link>
                <Link href="/programacao" className="ui-btn-secondary">
                  Ver programação completa
                </Link>
              </>
            )}
          </div>

          {eventEnded ? null : (
            <div className="mt-3">
              <a
                href={OFFICIAL_SOCIAL_LINKS.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-[#8b5b18] transition-colors hover:text-[#212121]"
              >
                Assistir ao vivo →
              </a>
            </div>
          )}

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
      </section>

      <section className="bg-[#160e08] text-white">
        <div className="ui-page-container py-10 md:py-14">
          <div className="grid gap-4 sm:grid-cols-3">
            <InfoItem label="Data" value={`${culto.diaSemana}, ${culto.data}`} />
            <InfoItem label="Horário" value={culto.horario} />
            <InfoItem label="Local" value={culto.endereco} />
          </div>
        </div>
      </section>

      <section className="ui-section">
        <div className="ui-page-container">
          <p className="ui-section-eyebrow ui-section-eyebrow--gold">
            Sobre o Culto
          </p>
          <h2 className="ui-section-title">Uma noite de gratidão</h2>
          <div className="mt-6 max-w-3xl space-y-4 text-[#555] leading-relaxed">
            {culto.sobre.map((paragrafo) => (
              <p key={paragrafo}>{paragrafo}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="ui-section bg-white">
        <div className="ui-page-container">
          <p className="ui-section-eyebrow ui-section-eyebrow--gold">
            Base Bíblica
          </p>
          <h2 className="ui-section-title">Palavra de Deus</h2>
          <div className="mt-6 rounded-xl border border-[#ffa726]/30 bg-[#ffa726]/5 p-6">
            <p className="text-lg leading-relaxed text-[#212121]">
              {culto.baseBiblica}
            </p>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="perfis-culto-title"
        className="ui-section ui-section--dense bg-white"
      >
        <div className="ui-page-container">
          <div className="mb-8 max-w-3xl">
            <p className="ui-section-eyebrow">Ministração e presidência</p>
            <h2 id="perfis-culto-title" className="ui-section-title">
              Pastores do evento
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#555] md:text-base">
              Conheça os pastores que farão parte deste culto especial de gratidão.
            </p>
          </div>

          <article className="overflow-hidden rounded-[1.5rem] border border-[#ffa726]/30 bg-[#160e08] shadow-[0_18px_50px_rgba(22,14,8,0.16)] md:grid md:grid-cols-[minmax(240px,320px)_minmax(0,1fr)]">
            <div className="relative aspect-[4/5] overflow-hidden bg-[#111] md:aspect-auto md:min-h-[400px]">
              <Image
                src={culto.preletor.foto}
                alt={culto.preletor.nome}
                fill
                sizes="(max-width: 767px) calc(100vw - 2rem), 320px"
                className={culto.preletor.fotoClassName}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/5" />
            </div>

            <div className="flex flex-col justify-center p-5 sm:p-7 lg:p-10">
              <p className="text-xs font-bold tracking-[0.22em] text-[#ffa726] uppercase">
                {culto.preletor.papel}
              </p>
              <h3 className="mt-2 font-acme text-3xl tracking-wide text-white lg:text-4xl">
                {culto.preletor.nome}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/72">
                Presidente do Campo de Atibaia e condutor deste culto especial de gratidão.
              </p>
              <div className="mt-6 grid max-w-xl gap-2 sm:grid-cols-2">
                {culto.preletor.redes.length > 0 && culto.preletor.redes.map((rede) => (
                  <SocialProfileLink
                    key={rede.plataforma}
                    plataforma={rede.plataforma}
                    usuario={rede.usuario}
                    href={rede.href}
                    nome={culto.preletor.nome}
                    dark
                  />
                ))}
              </div>
            </div>
          </article>

          <div className="mt-8 rounded-[1.5rem] border border-black/5 bg-[#f9f9f9] p-6">
            <p className="text-xs font-bold tracking-[0.22em] text-[#ef5350] uppercase">
              Presidência
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[#555]">
              {culto.anfitrioes.join(" e ")}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#212121] py-10 text-white md:py-14">
        <div className="ui-page-container flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-bold tracking-[0.24em] text-[#ffa726] uppercase">
              {culto.titulo} — {culto.data}
            </p>
            <h2 className="mt-3 font-acme text-2xl tracking-wide md:text-4xl">
              Venha agradecer com a gente
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/72 md:text-base">
              {culto.diaSemana}, {culto.data}, às {culto.horario}, na{" "}
              {culto.endereco}.
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
