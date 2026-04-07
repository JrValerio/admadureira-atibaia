import type { Metadata } from "next";
import Link from "next/link";
import HeroPage from "@/components/HeroPage";
import { igrejaHeroMedia } from "@/data/igreja-media";
import SpiritualBreadcrumb from "@/components/SpiritualBreadcrumb";
import {
  hasConfiguredPodcastFeed,
  podcastConfig,
} from "@/data/espiritualidade";
import { buildPageMetadata } from "@/lib/site";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: "Podcast | AD Madureira Atibaia",
    description:
      "Acompanhe novidades do podcast da AD Madureira Atibaia e veja o espaço reservado para futuros episódios em áudio.",
    path: "/espiritualidade/podcast",
    image: igrejaHeroMedia.podcast,
  }),
  ...(!hasConfiguredPodcastFeed
    ? {
        robots: {
          index: false,
          follow: true,
          googleBot: {
            index: false,
            follow: true,
          },
        },
      }
    : {}),
};

export default function PodcastPage() {
  const hasEmbed = hasConfiguredPodcastFeed;
  const statusLabel = hasEmbed ? "Episódios disponíveis" : podcastConfig.statusLabel;
  const statusClassName = hasEmbed
    ? "border-emerald-500/20 bg-emerald-50 text-emerald-700"
    : "border-[#ffa726]/20 bg-[#fff8ee] text-[#8b5b18]";

  return (
    <>
      <HeroPage
        variant="full"
        label="Conteúdo em áudio"
        title="Podcast"
        description="Um espaço para acompanhar episódios em áudio, séries temáticas e conversas que fortaleçam a fé ao longo da semana."
        image={igrejaHeroMedia.podcast}
        imageAlt="Púlpito da AD Madureira Atibaia preparado para conteúdos em áudio"
        imageClassName="object-[center_36%]"
      />

      <section className="py-16 md:py-20">
        <div className="ui-page-container ui-page-container--narrow">
          <SpiritualBreadcrumb
            items={[
              { label: "Espiritualidade", href: "/espiritualidade" },
              { label: "Podcast" },
            ]}
          />
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8">
            <div className="rounded-3xl bg-white border border-black/5 p-6 md:p-8 shadow-sm">
              <div className="mb-5 flex flex-wrap items-center gap-3">
                <span className="text-[#ffa726] text-xs font-bold tracking-widest uppercase">
                  Distribuição
                </span>
                <span
                  className={`inline-flex rounded-full border px-3 py-1 text-[10px] font-bold tracking-[0.16em] uppercase ${statusClassName}`.trim()}
                >
                  {statusLabel}
                </span>
              </div>
              <h2 className="font-acme text-xl md:text-3xl lg:text-4xl text-[#212121] tracking-wide mb-5">
                Mensagens em áudio da igreja
              </h2>
              <p className="text-[#555] leading-relaxed mb-4">
                {podcastConfig.resumo}
              </p>
              <p className="text-[#777] text-sm leading-relaxed mb-6">
                Este espaço foi separado para reunir mensagens, reflexões e
                séries em áudio que possam acompanhar a igreja ao longo da
                semana.
              </p>

              {hasEmbed ? (
                <div className="rounded-3xl border border-emerald-500/15 bg-emerald-50/60 p-5">
                  <p className="mb-3 text-[11px] font-bold tracking-[0.18em] uppercase text-emerald-700">
                    Episódios em destaque
                  </p>
                  <iframe
                    title="Podcast AD Madureira Atibaia"
                    src={podcastConfig.spotifyEmbedUrl}
                    width="100%"
                    height="380"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    className="rounded-3xl border-0"
                  />
                </div>
              ) : (
                <div className="rounded-3xl bg-[#fff8ee] border border-[#ffa726]/20 p-6">
                  <p className="mb-3 text-[11px] font-bold tracking-[0.18em] uppercase text-[#8b5b18]">
                    Em breve
                  </p>
                  <p className="text-[#555] leading-relaxed">
                    Os episódios ainda não estão disponíveis nesta página. Assim
                    que forem publicados, o player aparecerá aqui.
                  </p>
                  <p className="mt-4 text-sm text-[#777] leading-relaxed">
                    Enquanto isso, acompanhe o canal da igreja e volte em breve
                    para ouvir os episódios em áudio.
                  </p>
                </div>
              )}

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={podcastConfig.youtubePlaylistUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ui-btn-primary"
                >
                  {podcastConfig.youtubeChannelLabel}
                </a>
                <Link href="/espiritualidade/radio" className="ui-btn-secondary">
                  Ver rádio
                </Link>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-3xl bg-[#fff8ee] border border-[#ffa726]/20 p-6 shadow-sm">
                <p className="text-[#ef5350] text-xs font-bold tracking-widest uppercase mb-3">
                  O que você encontrará aqui
                </p>
                <ul className="space-y-3 text-sm text-[#555] leading-relaxed">
                  {podcastConfig.linhasEditoriais.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-[#ef5350]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl bg-white border border-black/5 p-6 shadow-sm">
                <p className="text-[#ef5350] text-xs font-bold tracking-widest uppercase mb-3">
                  Temas para ouvir
                </p>
                <div className="space-y-4">
                  {podcastConfig.seriesPrevistas.map((serie) => (
                    <div key={serie.titulo}>
                      <p className="text-sm font-semibold tracking-wide text-[#212121]">
                        {serie.titulo}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-[#555]">
                        {serie.descricao}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl bg-white border border-black/5 p-6 shadow-sm">
                <p className="text-[#ef5350] text-xs font-bold tracking-widest uppercase mb-3">
                  Disponível hoje
                </p>
                <p className="text-sm text-[#555] leading-relaxed mb-5">
                  Enquanto os episódios chegam por aqui, o canal da igreja no
                  YouTube segue reunindo mensagens e outros conteúdos em áudio
                  para acompanhar durante a semana.
                </p>
                <div className="flex flex-wrap gap-3 mb-5">
                  {podcastConfig.plataformas.map((platform) => (
                    <span
                      key={platform}
                      className="inline-flex rounded-full border border-black/10 bg-[#f9f9f9] px-4 py-2 text-xs font-semibold tracking-[0.12em] uppercase text-[#555]"
                    >
                      {platform}
                    </span>
                  ))}
                </div>
                <a
                  href={podcastConfig.youtubePlaylistUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ui-btn-primary"
                >
                  {podcastConfig.youtubeChannelLabel}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
