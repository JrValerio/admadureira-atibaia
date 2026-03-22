import Image from "next/image";
import Link from "next/link";
import HeroBackgroundMedia from "@/components/HeroBackgroundMedia";
import type { YouTubeVideo } from "@/lib/youtube";

type HeroProps = {
  liveNow?: YouTubeVideo | null;
};

export default function Hero({ liveNow = null }: HeroProps) {
  const hasLiveNow = Boolean(liveNow?.isLive);
  const liveEmbedUrl =
    hasLiveNow && liveNow
      ? `https://www.youtube.com/embed/${liveNow.id}?autoplay=1&mute=1&playsinline=1&rel=0`
      : null;

  return (
    <section
      id="inicio"
      className={`relative overflow-hidden bg-[#111] text-white ${
        hasLiveNow
          ? "flex items-center justify-center px-0 py-24 min-h-[42rem] sm:min-h-[48rem] lg:min-h-[40rem] xl:min-h-[46rem]"
          : "flex h-[40svh] min-h-[16.75rem] items-center justify-center sm:h-[50svh] sm:min-h-[19.5rem] md:h-[58svh] md:min-h-[24rem] lg:h-[68svh] lg:min-h-[29rem] xl:h-[calc(100svh-5rem)] xl:min-h-[34rem]"
      }`}
    >
      {/* Foto da fachada como background */}
      <Image
        src="/fachada-da-igreja.jpg"
        alt="Fachada da Igreja AD Madureira Atibaia"
        fill
        sizes="100vw"
        quality={74}
        fetchPriority="high"
        decoding="sync"
        className="object-cover object-center"
        priority
      />
      <HeroBackgroundMedia />

      {/* Overlay escuro */}
      <div className="absolute inset-0 bg-linear-to-b from-black/48 via-black/36 to-black/62" />
      <div className="absolute inset-0 hidden lg:block bg-[radial-gradient(circle_at_center,rgba(255,167,38,0.08),transparent_58%)]" />
      <div className="absolute inset-0 hero-vignette pointer-events-none" />

      {hasLiveNow && liveNow && liveEmbedUrl ? (
        <div className="relative z-10 ui-page-container grid w-full items-center gap-8 pt-6 pb-10 text-center sm:pt-10 sm:pb-12 md:pt-12 md:pb-14 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:gap-10 lg:py-0 lg:text-left">
          <div className="mx-auto flex max-w-2xl flex-col items-center lg:mx-0 lg:items-start">
            <div className="mb-4 flex justify-center sm:mb-5 md:mb-6 lg:justify-start">
              <Image
                src="/logo-transparent.png"
                alt="Logo AD Madureira Atibaia"
                width={136}
                height={136}
                sizes="(max-width: 639px) 86px, (max-width: 767px) 101px, (max-width: 1023px) 116px, (max-width: 1279px) 128px, 139px"
                quality={80}
                className="h-auto w-[5.35rem] drop-shadow-[0_18px_32px_rgba(0,0,0,0.26)] sm:w-[6.3rem] md:w-[7.25rem] lg:w-[7.1rem] xl:w-[7.8rem]"
                style={{ height: "auto" }}
              />
            </div>

            <p className="text-[9px] tracking-[0.2em] text-[#f7dfbb] uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] sm:text-[10px] sm:tracking-[0.26em] md:text-[12px] md:tracking-[0.3em] lg:text-sm xl:text-base">
              Assembleia de Deus · Ministério Madureira · Campo de Atibaia
            </p>
            <div className="mt-4 inline-flex items-center rounded-full border border-[#ef5350]/50 bg-[#ef5350]/18 px-4 py-2 text-[10px] font-bold tracking-[0.24em] uppercase text-white shadow-[0_10px_28px_rgba(239,83,80,0.26)] sm:text-[11px]">
              Transmissão ao vivo agora
            </div>
            <h1 className="mt-5 font-acme text-[2rem] tracking-wide text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.4)] sm:text-[2.5rem] md:text-[3.1rem] lg:text-[3.45rem] xl:text-[4rem]">
              Acompanhe a transmissão da igreja
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/86 sm:text-base md:text-lg lg:mx-0">
              {liveNow.title}
            </p>

            <div className="mt-5 flex flex-col items-center gap-2.5 sm:mt-6 sm:flex-row sm:justify-center sm:gap-3 lg:justify-start">
              <a
                href={liveNow.url}
                target="_blank"
                rel="noopener noreferrer"
                className="ui-btn-primary"
              >
                Abrir no YouTube
              </a>
              <Link href="/videos" className="ui-btn-ghost-dark">
                Abrir vídeos
              </Link>
            </div>
          </div>

          <div className="mx-auto w-full max-w-4xl">
            <div className="overflow-hidden rounded-[1.8rem] border border-white/12 bg-black/75 shadow-[0_24px_70px_rgba(0,0,0,0.45)] backdrop-blur-sm">
              <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3 text-left sm:px-5">
                <div>
                  <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#f7dfbb]">
                    Live em destaque
                  </p>
                  <p className="mt-1 text-sm text-white/82 sm:text-base">
                    A transmissão está disponível direto na Home.
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-[#ef5350] px-3 py-1 text-[10px] font-bold tracking-[0.22em] uppercase text-white">
                  Ao vivo
                </span>
              </div>
              <div className="aspect-video bg-black">
                <iframe
                  title={liveNow.title}
                  src={liveEmbedUrl}
                  width="100%"
                  height="100%"
                  className="h-full w-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative z-10 ui-page-container flex flex-col items-center justify-center pt-8 pb-10 text-center sm:pt-10 sm:pb-12 md:pt-12 md:pb-14 lg:py-0">
          {/* Logo */}
          <div className="mb-4 flex justify-center sm:mb-5 md:mb-6">
            <Image
              src="/logo-transparent.png"
              alt="Logo AD Madureira Atibaia"
              width={136}
              height={136}
              sizes="(max-width: 639px) 86px, (max-width: 767px) 101px, (max-width: 1023px) 116px, (max-width: 1279px) 128px, 139px"
              quality={80}
              className="h-auto w-[5.35rem] drop-shadow-[0_18px_32px_rgba(0,0,0,0.26)] sm:w-[6.3rem] md:w-[7.25rem] lg:w-[8rem] xl:w-[8.7rem]"
              style={{ height: "auto" }}
            />
          </div>

          <div>
            <p className="font-script hero-title-glow leading-none text-[1.95rem] text-[#f7dfbb] sm:text-[2.45rem] md:text-[3.45rem] lg:text-[4.45rem] xl:text-[5.15rem]">
              Assembleia de Deus
            </p>
            <p className="mt-2 text-[9px] tracking-[0.2em] text-white/82 uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] sm:mt-2.5 sm:text-[10px] sm:tracking-[0.26em] md:text-[12px] md:tracking-[0.3em] lg:text-sm xl:text-base">
              Ministério Madureira · Campo de Atibaia
            </p>
          </div>

          <div className="mt-5 flex flex-col items-center gap-2.5 sm:mt-6 sm:flex-row sm:justify-center sm:gap-3">
            <Link href="/programacao" className="ui-btn-primary">
              Ver programação
            </Link>
            <Link href="/contato" className="ui-btn-ghost-dark">
              Como chegar
            </Link>
          </div>
        </div>
      )}

      {/* Seta para baixo */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 animate-bounce sm:bottom-6 md:bottom-8 lg:bottom-10">
        <svg className="h-5 w-5 text-[#ffa726] sm:h-6 sm:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
