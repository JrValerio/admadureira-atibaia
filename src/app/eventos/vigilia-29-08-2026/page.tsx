import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import VigiliaCountdown from "./VigiliaCountdown";
import { VIGILIA_29_08_2026 as vigilia } from "@/data/vigilia-29-08-2026";
import { SEDE_POSTAL_ADDRESS } from "@/data/site";
import { buildPageMetadata, resolveSiteUrl, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: vigilia.tituloSeo,
  description: vigilia.descricaoSeo,
  path: vigilia.path,
  image: vigilia.hero,
  keywords: [...vigilia.keywords],
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

export default function Vigilia29082026Page() {
  const canonicalUrl = resolveSiteUrl(vigilia.path);
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${canonicalUrl}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: resolveSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Eventos", item: resolveSiteUrl("/eventos") },
      { "@type": "ListItem", position: 3, name: vigilia.titulo, item: canonicalUrl },
    ],
  };
  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    "@id": `${canonicalUrl}#event`,
    name: `${vigilia.titulo} — ${vigilia.data}`,
    description: vigilia.descricaoSeo,
    url: canonicalUrl,
    image: [resolveSiteUrl(vigilia.hero)],
    startDate: "2026-08-29T22:00:00-03:00",
    inLanguage: "pt-BR",
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: vigilia.local,
      address: SEDE_POSTAL_ADDRESS,
    },
    organizer: {
      "@type": "Organization",
      name: SITE_NAME,
      url: resolveSiteUrl("/"),
    },
    performer: [
      { "@type": "Person", name: vigilia.preletor },
      ...vigilia.cantores.map((cantor) => ({
        "@type": "Person",
        name: cantor.nome,
      })),
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

      <div className="relative aspect-square w-full overflow-hidden bg-[#111] sm:aspect-[21/9] md:aspect-[21/7]">
        <Image
          src={vigilia.hero}
          alt="Vigília 29 de agosto — AD Madureira Atibaia"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
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
            <span className="text-[#212121]">{vigilia.titulo}</span>
          </nav>

          <div className="mb-4">
            <VigiliaCountdown targetIso="2026-08-29T22:00:00-03:00" />
          </div>

          <p className="mb-2 text-xs font-bold tracking-[0.28em] text-[#ffa726] uppercase">
            {vigilia.diaSemana}, {vigilia.data} · {vigilia.horario}
          </p>
          <h1 className="font-acme text-3xl leading-tight tracking-wide text-[#212121] md:text-5xl">
            {vigilia.titulo}
          </h1>
          <p className="mt-3 max-w-2xl text-lg font-semibold leading-relaxed text-[#8b5b18] md:text-2xl">
            {vigilia.subtitulo}
          </p>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#555]">
            {vigilia.descricaoTopo}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/contato" className="ui-btn-primary">
              Como chegar
            </Link>
            <Link href="/programacao" className="ui-btn-secondary">
              Ver programação completa
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#160e08] text-white">
        <div className="ui-page-container py-10 md:py-14">
          <div className="grid gap-4 sm:grid-cols-3">
            <InfoItem label="Data" value={`${vigilia.diaSemana}, ${vigilia.data}`} />
            <InfoItem label="Horário" value={vigilia.horario} />
            <InfoItem label="Local" value={vigilia.endereco} />
          </div>
        </div>
      </section>

      <section className="ui-section">
        <div className="ui-page-container">
          <p className="ui-section-eyebrow ui-section-eyebrow--gold">
            Sobre a Vigília
          </p>
          <h2 className="ui-section-title">Uma noite de adoração, clamor e Palavra</h2>
          <div className="mt-6 max-w-3xl space-y-4 text-[#555] leading-relaxed">
            {vigilia.sobre.map((paragrafo) => (
              <p key={paragrafo}>{paragrafo}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="ui-section ui-section--dense bg-white">
        <div className="ui-page-container">
          <div className="mb-8 max-w-3xl">
            <p className="ui-section-eyebrow">Participação especial</p>
            <h2 className="ui-section-title">Preletor e cantores convidados</h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <article className="rounded-[1.5rem] border border-[#ffa726]/25 bg-[#fff8ee] p-6 shadow-sm lg:col-span-3">
              <p className="text-xs font-bold tracking-[0.22em] text-[#ef5350] uppercase">
                Preletor
              </p>
              <h3 className="mt-2 font-acme text-2xl tracking-wide text-[#212121]">
                {vigilia.preletor}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#555]">
                Ministração da Palavra nesta noite de adoração e clamor.
              </p>
            </article>

            {vigilia.cantores.map((cantor) => (
              <article
                key={cantor.nome}
                className="rounded-[1.5rem] border border-black/5 bg-[#f9f9f9] p-6 shadow-sm"
              >
                <p className="text-xs font-bold tracking-[0.22em] text-[#ffa726] uppercase">
                  {cantor.papel}
                </p>
                <h3 className="mt-2 font-acme text-xl tracking-wide text-[#212121]">
                  {cantor.nome}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#555]">
                  Participação especial no louvor e adoração da Vigília.
                </p>
              </article>
            ))}
          </div>

          <div className="mt-8 rounded-[1.5rem] border border-black/5 bg-[#f9f9f9] p-6">
            <p className="text-xs font-bold tracking-[0.22em] text-[#ef5350] uppercase">
              Anfitriões
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[#555]">
              {vigilia.anfitrioes.join(" e ")}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#212121] py-10 text-white md:py-14">
        <div className="ui-page-container flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-bold tracking-[0.24em] text-[#ffa726] uppercase">
              Vigília — {vigilia.data}
            </p>
            <h2 className="mt-3 font-acme text-2xl tracking-wide md:text-4xl">
              Prepare sua família e venha buscar a Deus conosco
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/72 md:text-base">
              {vigilia.diaSemana}, {vigilia.data}, às {vigilia.horario}, na{" "}
              {vigilia.endereco}.
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
