import HeroPage from "@/components/HeroPage";
import SpiritualBreadcrumb from "@/components/SpiritualBreadcrumb";
import { podcastConfig } from "@/data/espiritualidade";
import { buildPageMetadata } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Podcast | AD Madureira Atibaia",
  description:
    "Página preparada para episódios em áudio, séries temáticas e distribuição do podcast da AD Madureira Atibaia.",
  path: "/espiritualidade/podcast",
  image: "/pulpito-da-igreja.jpg",
});

export default function PodcastPage() {
  const hasEmbed = podcastConfig.spotifyEmbedUrl.length > 0;

  return (
    <>
      <HeroPage
        variant="full"
        label="Conteúdo em áudio"
        title="Podcast"
        description="Uma área preparada para receber episódios em áudio, séries temáticas e conversas que fortaleçam a fé ao longo da semana."
        image="/pulpito-da-igreja.jpg"
        imageAlt="Púlpito da AD Madureira Atibaia"
      />

      <section className="py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-4">
          <SpiritualBreadcrumb
            items={[
              { label: "Espiritualidade", href: "/espiritualidade" },
              { label: "Podcast" },
            ]}
          />
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8">
            <div className="rounded-3xl bg-white border border-black/5 p-6 md:p-8 shadow-sm">
              <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-3">
                Distribuição futura
              </p>
              <h2 className="font-acme text-3xl md:text-4xl text-[#212121] tracking-wide mb-5">
                Podcast da igreja em preparação
              </h2>
              <p className="text-[#555] leading-relaxed mb-6">
                O espaço já está pronto para receber episódios em áudio,
                reflexões temáticas e conteúdos pastorais distribuídos em
                plataformas digitais.
              </p>

              {hasEmbed ? (
                <iframe
                  title="Podcast AD Madureira Atibaia"
                  src={podcastConfig.spotifyEmbedUrl}
                  width="100%"
                  height="380"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  className="rounded-3xl border-0"
                />
              ) : (
                <div className="rounded-3xl bg-[#fff8ee] border border-[#ffa726]/20 p-6 text-[#555] leading-relaxed">
                  O feed do podcast ainda não foi configurado. Assim que os
                  primeiros episódios forem publicados, o player ficará
                  disponível nesta página.
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="rounded-3xl bg-[#fff8ee] border border-[#ffa726]/20 p-6 shadow-sm">
                <p className="text-[#ef5350] text-xs font-bold tracking-widest uppercase mb-3">
                  Linhas editoriais
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
                  Plataformas previstas
                </p>
                <p className="text-sm text-[#555] leading-relaxed mb-4">
                  A publicação pode ser distribuída nestas plataformas:
                </p>
                <div className="flex flex-wrap gap-3 mb-4">
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
                  className="inline-flex items-center justify-center rounded-full bg-[#ffa726] px-5 py-3 text-xs font-bold tracking-widest uppercase text-[#212121] transition-colors hover:bg-[#ffb74d]"
                >
                  Abrir canal da igreja
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
