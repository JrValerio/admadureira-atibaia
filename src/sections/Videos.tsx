import Link from "next/link";
import { getYouTubeVideosPageFeed } from "@/lib/youtube";
import YouTubePreviewCard from "@/components/YouTubePreviewCard";
import { Section } from "@/components/ui/Section";

const CANAL_URL = "https://www.youtube.com/@ADMadureiraAtibaia";

type VideosProps = {
  showHeader?: boolean;
};

export default async function Videos({ showHeader = true }: VideosProps) {
  const { liveNow, upcomingLive, featuredVideos, recentLiveVideos } =
    await getYouTubeVideosPageFeed();

  return (
    <Section id="videos" bg="gray">
        {showHeader ? (
          <div className="text-center mb-16">
            <p className="text-[#ef5350] text-sm font-semibold tracking-widest uppercase mb-2">
              Canal no YouTube
            </p>
            <h2 className="font-acme text-xl md:text-3xl lg:text-4xl text-[#212121] tracking-wide">
              Lives e transmissões do canal
            </h2>
            <div className="w-16 h-1 bg-[#ef5350] mx-auto mt-4" />
            <p className="text-[#757575] text-sm mt-4">
              Assista ao que está ao vivo e acompanhe apenas as transmissões do
              canal da igreja nesta página.
            </p>
          </div>
        ) : null}

        {liveNow && (
          <div className="mb-14">
            <div className="flex items-end justify-between gap-4 flex-wrap mb-6">
              <div>
                <p className="text-[#ef5350] text-xs font-semibold tracking-widest uppercase mb-1">
                  Transmissão no YouTube
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
                Ir para o canal →
              </a>
            </div>

            <YouTubePreviewCard video={liveNow} destaque badge="Ao vivo" />
          </div>
        )}

        {!liveNow && upcomingLive ? (
          <div className="mb-14">
            <div className="ui-panel-accent ui-panel-pad-sm">
              <p className="text-[#ef5350] text-xs font-semibold tracking-widest uppercase mb-2">
                Próxima transmissão
              </p>
              <h3 className="font-acme text-2xl text-[#212121] tracking-wide">
                {upcomingLive.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#5f5f5f]">
                Quando a live estiver ativa, ela passa a ser priorizada
                automaticamente na Home e nesta área de vídeos.
              </p>
              <div className="mt-5">
                <a
                  href={upcomingLive.url}
                  target="_blank"
                  rel="noopener noreferrer"
                className="ui-btn-secondary"
              >
                Abrir transmissão no YouTube
                </a>
              </div>
            </div>
          </div>
        ) : null}

        {featuredVideos.length > 0 && (
          <div className="mb-14">
            <div className="flex items-end justify-between gap-4 flex-wrap mb-6">
              <div>
                <p className="text-[#ef5350] text-xs font-semibold tracking-widest uppercase mb-1">
                  Destaques da igreja
                </p>
                <h3 className="font-acme text-2xl text-[#212121] tracking-wide">
                  Transmissões em destaque
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

        {recentLiveVideos.length > 0 && (
          <div className="mb-10">
            <div className="flex items-end justify-between gap-4 flex-wrap mb-6">
              <div>
                <p className="text-[#ef5350] text-xs font-semibold tracking-widest uppercase mb-1">
                  Acervo de transmissões
                </p>
                <h3 className="font-acme text-2xl text-[#212121] tracking-wide">
                  Mais lives para assistir
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentLiveVideos.map((video) => (
                <YouTubePreviewCard key={video.id} video={video} />
              ))}
            </div>
          </div>
        )}

        <div className="ui-panel ui-panel-pad-sm text-center">
          <p className="ui-section-eyebrow ui-section-eyebrow--gold">
            Próximo passo
          </p>
          <h3 className="font-acme text-xl tracking-wide text-[#212121] md:text-2xl">
            Continue no canal certo para o que você precisa agora
          </h3>
          <p className="mx-auto mt-3 max-w-3xl text-sm leading-relaxed text-[#5f5f5f] md:text-base">
            Aqui a regra é simples: a página de vídeos mostra somente lives e
            transmissões do canal. Já a área de Mensagens continua sendo a
            curadoria da playlist de pregações, com contexto editorial mais
            organizado.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <a
              href={CANAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="ui-btn-red gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              Abrir canal completo
            </a>
            <Link href="/mensagens" className="ui-btn-secondary">
              Explorar mensagens
            </Link>
            <Link href="/programacao" className="ui-btn-secondary">
              Ver programação
            </Link>
          </div>
        </div>
    </Section>
  );
}
