import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import TrimestreCountdownBadge from "@/components/ebd/TrimestreCountdownBadge";
import { adultos2026Trimestres } from "@/data/ebd/adultos-2026";
import {
  SEDE_PLACE_NAME,
  SEDE_POSTAL_ADDRESS,
} from "@/data/site";
import { buildPageMetadata, resolveSiteUrl, SITE_NAME } from "@/lib/site";

const trimestre = adultos2026Trimestres.find((t) => t.slug === "2026-3t")!;

const SLUG = "trimestre-ebd-adultos-3t-2026";
const DATA_INICIO = "2026-07-05";
const DATA_FIM = "2026-09-27";
const CANONICAL_PATH = `/eventos/${SLUG}`;

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: `3º Trimestre EBD 2026 — ${trimestre.titulo} | AD Madureira Atibaia`,
    description: trimestre.descricao,
    path: CANONICAL_PATH,
    image: "/programacao/eventos/trimestre.png",
  }),
  alternates: {
    canonical: resolveSiteUrl(CANONICAL_PATH),
  },
};

function formatLicaoDate(iso: string) {
  const [ano, mes, dia] = iso.split("-").map(Number);
  return new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "long",
    timeZone: "America/Sao_Paulo",
  }).format(new Date(Date.UTC(ano, mes - 1, dia, 12)));
}

export default function TrimestreEbdAdultos3t2026Page() {
  const canonicalUrl = resolveSiteUrl(CANONICAL_PATH);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${canonicalUrl}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: resolveSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Eventos", item: resolveSiteUrl("/eventos") },
      { "@type": "ListItem", position: 3, name: `EBD ${trimestre.titulo}`, item: canonicalUrl },
    ],
  };

  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "EducationEvent",
    name: `3º Trimestre EBD 2026 — ${trimestre.titulo}`,
    description: trimestre.descricao,
    url: canonicalUrl,
    startDate: "2026-07-05",
    endDate: DATA_FIM,
    inLanguage: "pt-BR",
    location: {
      "@type": "Place",
      name: SEDE_PLACE_NAME,
      address: SEDE_POSTAL_ADDRESS,
    },
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: resolveSiteUrl("/") },
  };

  return (
    <main className="min-h-screen bg-[#f5f5f5]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />

      {/* Hero */}
      <div className="relative aspect-[21/9] w-full overflow-hidden bg-[#111] md:aspect-[21/7]">
        <Image
          src="/programacao/eventos/trimestre.png"
          alt={`3º Trimestre EBD 2026 — ${trimestre.titulo}`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      </div>

      <section className="py-10 md:py-16">
        <div className="ui-page-container ui-page-container--narrow">

          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="mb-8 flex flex-wrap items-center gap-2 text-sm text-[#8a8a8a]"
          >
            <Link href="/" className="transition-colors hover:text-[#212121]">Início</Link>
            <span>›</span>
            <Link href="/eventos" className="transition-colors hover:text-[#212121]">Eventos</Link>
            <span>›</span>
            <span className="text-[#212121]">3º Trimestre EBD 2026</span>
          </nav>

          {/* Cabeçalho */}
          <div className="mb-10">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-[#ef5350]/10 px-3 py-1 text-xs font-bold tracking-widest uppercase text-[#ef5350]">
                EBD · 3º Trimestre 2026
              </span>
              <TrimestreCountdownBadge dataInicio={DATA_INICIO} dataFim={DATA_FIM} />
            </div>

            <h1 className="font-acme text-3xl tracking-wide text-[#212121] md:text-5xl">
              {trimestre.titulo}
            </h1>
            <p className="mt-2 text-lg text-[#555] md:text-xl">{trimestre.subtitulo}</p>

            <div className="mt-4 flex items-center gap-2 text-sm text-[#8a8a8a]">
              <span>5 de julho a 27 de setembro de 2026</span>
              <span>·</span>
              <span>Todo domingo às 09h</span>
            </div>

            {trimestre.versiculoBase && (
              <p className="mt-4 max-w-2xl rounded-2xl border border-[#ef5350]/15 bg-white px-5 py-3 text-sm italic leading-relaxed text-[#555]">
                <span className="not-italic font-semibold text-[#ef5350] text-xs tracking-widest uppercase block mb-1">
                  Versículo-base
                </span>
                {trimestre.versiculoBase}
              </p>
            )}
          </div>

          {/* Wagner Gaby — "Curitiba" vem da revista física (texto transcrito pelo editor); confirmar contra o PDF CPAD antes de publicar */}
          <div className="mb-10 rounded-3xl border border-black/5 bg-white p-6 shadow-sm md:p-8">
            <p className="mb-3 text-xs font-bold tracking-widest uppercase text-[#ffa726]">
              Comentarista deste trimestre
            </p>
            <div className="flex-1">
              <h2 className="font-acme text-2xl tracking-wide text-[#212121]">
                Pastor Wagner Gaby
              </h2>
              <p className="mt-1 text-sm text-[#555]">
                Comentarista · 3º Trimestre 2026
              </p>
              <p className="mt-4 leading-relaxed text-[#555]">
                Para discorrer sobre o tema "A Igreja dos Gentios", o comentarista deste
                trimestre é o pastor Wagner Gaby. A abordagem percorre a expansão
                missionária de Atos, desde o envio de Barnabé e Saulo em Antioquia até a
                chegada do Evangelho ao coração do Império Romano.
              </p>
            </div>
          </div>

          {/* Sobre o trimestre */}
          <div className="mb-10">
            <h2 className="mb-5 font-acme text-2xl tracking-wide text-[#212121] md:text-3xl">
              O que estudaremos neste trimestre
            </h2>
            <div className="max-w-3xl space-y-4 leading-relaxed text-[#555]">
              <p>
                Estimado(a) professor(a), a copiosa paz do Senhor esteja com você. Neste novo
                trimestre, teremos a grata e rica oportunidade de estudar sobre o chamado da
                igreja para proclamar a salvação entre os gentios, bem como da consolidação
                da mensagem evangelística entre as nações.
              </p>
              <p>
                A abordagem considera, inicialmente, o propósito divino desde o Antigo
                Testamento. Deus havia prometido, por intermédio dos profetas da Antiga
                Aliança, que a mensagem de salvação alcançaria outras nações para além de
                Israel (Is 49.6; Sl 22.27,28). Nesse sentido, o grande avivamento
                experimentado pelos cristãos em Antioquia, a partir da pregação aos gentios,
                é o cumprimento dessa promessa.
              </p>
              <p>
                Esta cidade foi escolhida pelo Espírito Santo haja vista ser um local que
                havia recebido profunda influência da cultura greco-helenista e abrigava
                forte presença judaica. Esses dois aspectos contribuíram para que a mensagem
                do Evangelho encontrasse guarida nos corações. A influência greco-helenista
                tornava a cidade como um berço do desenvolvimento intelectual da época, aberta
                às discussões filosóficas e oportunas à reflexão sobre a salvação.
                Semelhantemente, a presença judaica contribuía para que os missionários da
                igreja persuadissem os judeus à fé cristã a partir das profecias do Antigo
                Testamento.
              </p>
            </div>
          </div>

          {/* Grid das 13 lições */}
          <div className="mb-12">
            <h2 className="mb-6 font-acme text-2xl tracking-wide text-[#212121] md:text-3xl">
              As 13 lições
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {trimestre.licoes.map((licao) => {
                const textoAureo = licao.subsidioAdultos?.cabecalho.textoAureo;
                const verdadePratica = licao.subsidioAdultos?.cabecalho.verdadePratica;

                return (
                  <Link
                    key={licao.id}
                    href={`/ebd/adultos/2026-3t/${licao.slug}`}
                    className="group flex flex-col rounded-3xl border border-black/5 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-xs font-bold tracking-widest uppercase text-[#ef5350]">
                        Lição {licao.numero}
                      </span>
                      <span className="text-xs text-[#8a8a8a]">
                        {formatLicaoDate(licao.data)}
                      </span>
                    </div>

                    <h3 className="mb-3 font-acme text-base tracking-wide text-[#212121] group-hover:text-[#ef5350] transition-colors md:text-lg">
                      {licao.titulo}
                    </h3>

                    {textoAureo && (
                      <p className="mb-3 text-xs italic leading-relaxed text-[#777] line-clamp-3">
                        {textoAureo}
                      </p>
                    )}

                    {verdadePratica && (
                      <div className="mt-auto pt-3 border-t border-black/5">
                        <p className="mb-1 text-xs font-bold tracking-widest uppercase text-[#ffa726]">
                          Verdade prática
                        </p>
                        <p className="text-xs leading-relaxed text-[#555]">
                          {verdadePratica}
                        </p>
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link href="/ebd/adultos/2026-3t" className="ui-btn-primary">
              Ver trimestre completo na EBD
            </Link>
            <Link href="/eventos" className="ui-btn-secondary">
              Ver todos os eventos
            </Link>
            <Link href="/contato" className="ui-btn-secondary">
              Como chegar
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
