import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CONGRESSO_RIOS_DE_UNCAO_2026 as congresso } from "@/data/congresso-rios-de-uncao-2026";
import { SEDE_POSTAL_ADDRESS } from "@/data/site";
import { buildPageMetadata, resolveSiteUrl, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: congresso.tituloSeo,
  description: congresso.descricaoSeo,
  path: congresso.path,
  image: congresso.imagem,
  keywords: [...congresso.keywords],
});

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

export default function CongressoMocidadeRiosDeUncao2026Page() {
  const canonicalUrl = resolveSiteUrl(congresso.path);
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${canonicalUrl}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: resolveSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Eventos", item: resolveSiteUrl("/eventos") },
      { "@type": "ListItem", position: 3, name: congresso.titulo, item: canonicalUrl },
    ],
  };
  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    "@id": `${canonicalUrl}#event`,
    name: congresso.titulo,
    description: congresso.descricaoSeo,
    url: canonicalUrl,
    image: [resolveSiteUrl(congresso.imagem)],
    startDate: "2026-07-17T19:00:00-03:00",
    inLanguage: "pt-BR",
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: congresso.local,
      address: SEDE_POSTAL_ADDRESS,
    },
    organizer: {
      "@type": "Organization",
      name: SITE_NAME,
      url: resolveSiteUrl("/"),
    },
    performer: congresso.programacao.map((noite) => ({
      "@type": "Person",
      name: noite.preletor,
    })),
    subEvent: congresso.programacao.map((noite, index) => ({
      "@type": "Event",
      name: `${congresso.titulo} — ${noite.noite}`,
      startDate: `2026-07-${index === 0 ? "17" : "18"}T19:00:00-03:00`,
      location: {
        "@type": "Place",
        name: congresso.local,
        address: SEDE_POSTAL_ADDRESS,
      },
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

      <section className="bg-[#160e08] text-white">
        <div className="ui-page-container grid gap-8 py-8 md:py-12 lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)] lg:items-center">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[28rem] overflow-hidden rounded-[1.5rem] border border-white/10 bg-black shadow-[0_26px_70px_rgba(0,0,0,0.35)] lg:max-w-none">
            <Image
              src={congresso.imagem}
              alt="Arte oficial do Congresso da Mocidade Rios de Unção 2026"
              fill
              priority
              fetchPriority="high"
              sizes="(max-width: 1024px) 92vw, 430px"
              className="object-contain"
            />
          </div>

          <div>
            <nav
              aria-label="Breadcrumb"
              className="mb-6 flex flex-wrap items-center gap-2 text-sm text-white/58"
            >
              <Link href="/" className="transition-colors hover:text-white">
                Início
              </Link>
              <span>›</span>
              <Link href="/eventos" className="transition-colors hover:text-white">
                Eventos
              </Link>
              <span>›</span>
              <span className="text-white/86">Congresso da Mocidade</span>
            </nav>

            <p className="mb-3 text-xs font-bold tracking-[0.28em] text-[#ffa726] uppercase">
              {congresso.data} · {congresso.horario}
            </p>
            <h1 className="font-acme text-3xl leading-tight tracking-wide text-white md:text-5xl lg:text-6xl">
              {congresso.titulo}
            </h1>
            <p className="mt-4 text-lg font-semibold leading-relaxed text-[#f6d6a5] md:text-2xl">
              {congresso.subtitulo}
            </p>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/76 md:text-lg">
              {congresso.descricaoTopo} Serão dois dias de adoração, comunhão,
              Palavra e fortalecimento espiritual para a juventude e toda a igreja.
            </p>

            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              <InfoItem label="Data" value={congresso.data} />
              <InfoItem label="Horário" value={congresso.horario} />
              <InfoItem label="Local" value={congresso.local} />
              <InfoItem label="Endereço" value={congresso.endereco} />
              <InfoItem label="Tema" value={`“${congresso.tema}”`} />
              <InfoItem label="Base bíblica" value={congresso.baseBiblica} />
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="#programacao" className="ui-btn-primary">
                Ver programação
              </Link>
              <Link href="/contato" className="ui-btn-ghost-dark">
                Como chegar
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="ui-section">
        <div className="ui-page-container">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(18rem,0.95fr)]">
            <div>
              <p className="ui-section-eyebrow ui-section-eyebrow--gold">
                Sobre o congresso
              </p>
              <h2 className="ui-section-title">Uma geração preparada para o novo de Deus</h2>
              <div className="mt-6 max-w-3xl space-y-4 text-[#555] leading-relaxed">
                {congresso.sobre.map((paragrafo) => (
                  <p key={paragrafo}>{paragrafo}</p>
                ))}
              </div>
            </div>

            <aside className="self-start rounded-[1.5rem] border border-[#ffa726]/20 bg-[#fff8ee] p-6 shadow-sm">
              <p className="text-xs font-bold tracking-[0.22em] text-[#ef5350] uppercase">
                Participe conosco
              </p>
              <h3 className="mt-3 font-acme text-2xl tracking-wide text-[#212121]">
                {congresso.ministerio}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#555]">
                Convide sua família, seus amigos, sua mocidade e esteja conosco
                nesses dois dias de adoração, Palavra e comunhão.
              </p>
              <dl className="mt-5 space-y-3 text-sm text-[#555]">
                <div>
                  <dt className="font-semibold text-[#212121]">Data</dt>
                  <dd>{congresso.data}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-[#212121]">Horário</dt>
                  <dd>{congresso.horario}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-[#212121]">Local</dt>
                  <dd>{congresso.endereco}</dd>
                </div>
              </dl>
            </aside>
          </div>
        </div>
      </section>

      <section id="programacao" className="ui-section ui-section--dense bg-white">
        <div className="ui-page-container">
          <div className="mb-8 max-w-3xl">
            <p className="ui-section-eyebrow">Programação oficial</p>
            <h2 className="ui-section-title">Duas noites de adoração, Palavra e comunhão</h2>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            {congresso.programacao.map((noite) => (
              <article
                key={noite.data}
                className="rounded-[1.5rem] border border-black/5 bg-[#f9f9f9] p-6 shadow-sm"
              >
                <p className="text-xs font-bold tracking-[0.22em] text-[#ffa726] uppercase">
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
                    <dt className="font-semibold text-[#212121]">{noite.preletorLabel}</dt>
                    <dd>{noite.preletor}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-[#212121]">Participação</dt>
                    <dd>{noite.participacao}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-[#212121]">Ministério local</dt>
                    <dd>{noite.ministerioLocal}</dd>
                  </div>
                </dl>

                <div className="mt-6 border-t border-black/5 pt-5">
                  <p className="text-xs font-bold tracking-[0.2em] text-[#ef5350] uppercase">
                    {noite.convidadosLabel}
                  </p>
                  <ul className="mt-3 space-y-2 text-sm leading-relaxed text-[#555]">
                    {noite.convidados.map((convidado) => (
                      <li key={convidado} className="flex gap-3">
                        <span className="text-[#ffa726]">•</span>
                        <span>{convidado}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ui-section">
        <div className="ui-page-container">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start">
            <div>
              <p className="ui-section-eyebrow ui-section-eyebrow--gold">
                Chamada espiritual
              </p>
              <h2 className="ui-section-title">Vinho novo em odre novo</h2>
              <div className="mt-6 max-w-3xl space-y-4 text-[#555] leading-relaxed">
                {congresso.chamadaEspiritual.map((paragrafo) => (
                  <p key={paragrafo}>{paragrafo}</p>
                ))}
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-black/5 bg-white p-6 shadow-sm">
              <p className="text-xs font-bold tracking-[0.22em] text-[#ef5350] uppercase">
                Liderança e organização
              </p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {congresso.lideranca.map((grupo) => (
                  <div key={grupo.titulo} className="rounded-2xl bg-[#f9f9f9] p-4">
                    <h3 className="font-semibold text-[#212121]">{grupo.titulo}</h3>
                    <ul className="mt-2 space-y-1 text-sm text-[#555]">
                      {grupo.nomes.map((nome) => (
                        <li key={nome}>{nome}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#212121] py-10 text-white md:py-14">
        <div className="ui-page-container flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-bold tracking-[0.24em] text-[#ffa726] uppercase">
              Congresso da Mocidade — Rios de Unção 2026
            </p>
            <h2 className="mt-3 font-acme text-2xl tracking-wide md:text-4xl">
              Venha participar desses dois dias conosco
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/72 md:text-base">
              {congresso.data}, às {congresso.horario}, na {congresso.endereco}.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/programacao" className="ui-btn-primary">
              Ver agenda
            </Link>
            <Link href="/ministerios/rios-de-uncao" className="ui-btn-ghost-dark">
              Conhecer a mocidade
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
