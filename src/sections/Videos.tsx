import { getYouTubeFeed } from "@/lib/youtube";
import YouTubePreviewCard from "@/components/YouTubePreviewCard";
import { FIXED_FEATURED_VIDEO_IDS } from "@/data/featuredVideos";

const CANAL_URL = "https://www.youtube.com/@ADMadureiraAtibaia";

type VideosProps = {
  showHeader?: boolean;
};

export default async function Videos({ showHeader = true }: VideosProps) {
  const { liveNow, recentVideos } = await getYouTubeFeed();
  const fixedFeaturedVideos = FIXED_FEATURED_VIDEO_IDS.map((id) =>
    recentVideos.find((video) => video.id === id)
  ).filter((video) => video !== undefined);

  const featuredVideoIdSet = new Set(FIXED_FEATURED_VIDEO_IDS);
  const otherVideos = recentVideos.filter(
    (video) => !featuredVideoIdSet.has(video.id)
  );

  const featuredVideos =
    fixedFeaturedVideos.length > 0
      ? fixedFeaturedVideos
      : liveNow
        ? otherVideos.slice(0, 1)
        : otherVideos.slice(0, 2);

  const libraryVideos =
    fixedFeaturedVideos.length > 0
      ? otherVideos
      : otherVideos.slice(featuredVideos.length);

  return (
    <section id="videos" className="py-12 md:py-24 bg-[#f5f5f5]">
      <div className="max-w-6xl mx-auto px-4">
        {showHeader ? (
          <div className="text-center mb-16">
            <p className="text-[#ef5350] text-sm font-semibold tracking-widest uppercase mb-2">
              Canal no YouTube
            </p>
            <h2 className="font-acme text-3xl md:text-4xl text-[#212121] tracking-wide">
              Ultimos Cultos
            </h2>
            <div className="w-16 h-1 bg-[#ef5350] mx-auto mt-4" />
            <p className="text-[#757575] text-sm mt-4">
              Assista nossas pregacoes e transmissoes ao vivo.
            </p>
          </div>
        ) : null}

        {liveNow && (
          <div className="mb-14">
            <div className="flex items-end justify-between gap-4 flex-wrap mb-6">
              <div>
                <p className="text-[#ef5350] text-xs font-semibold tracking-widest uppercase mb-1">
                  Transmissao no YouTube
                </p>
                <h3 className="font-acme text-2xl text-[#212121] tracking-wide">
                  Ao Vivo Agora
                </h3>
              </div>
              <a
                href={CANAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-[#ef5350] hover:underline tracking-wide uppercase"
              >
                Ir para o canal -&gt;
              </a>
            </div>

            <YouTubePreviewCard video={liveNow} destaque badge="Ao vivo" />
          </div>
        )}

        {featuredVideos.length > 0 && (
          <div className="mb-14">
            <div className="flex items-end justify-between gap-4 flex-wrap mb-6">
              <div>
                <p className="text-[#ef5350] text-xs font-semibold tracking-widest uppercase mb-1">
                  Selecoes da semana
                </p>
                <h3 className="font-acme text-2xl text-[#212121] tracking-wide">
                  Videos em Destaque
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {featuredVideos.map((video) => (
                <YouTubePreviewCard
                  key={video.id}
                  video={video}
                  destaque
                  badge="Destaque"
                />
              ))}
            </div>
          </div>
        )}

        {libraryVideos.length > 0 && (
          <div className="mb-10">
            <div className="flex items-end justify-between gap-4 flex-wrap mb-6">
              <div>
                <p className="text-[#ef5350] text-xs font-semibold tracking-widest uppercase mb-1">
                  Biblioteca
                </p>
                <h3 className="font-acme text-2xl text-[#212121] tracking-wide">
                  Mais Transmissoes
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {libraryVideos.map((video) => (
                <YouTubePreviewCard key={video.id} video={video} />
              ))}
            </div>
          </div>
        )}

        <div className="text-center">
          <a
            href={CANAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="ui-btn-red gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
            Ver canal completo
          </a>
        </div>
      </div>
    </section>
  );
}
