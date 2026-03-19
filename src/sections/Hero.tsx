import Image from "next/image";
import Link from "next/link";
import HeroBackgroundMedia from "@/components/HeroBackgroundMedia";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex h-[40svh] min-h-[16.75rem] items-center justify-center overflow-hidden bg-[#111] text-white sm:h-[50svh] sm:min-h-[19.5rem] md:h-[58svh] md:min-h-[24rem] lg:h-[68svh] lg:min-h-[29rem] xl:h-[calc(100svh-5rem)] xl:min-h-[34rem]"
    >
      {/* Foto da fachada como background */}
      <Image
        src="/fachada-da-igreja.jpg"
        alt="Fachada da Igreja AD Madureira Atibaia"
        fill
        sizes="100vw"
        quality={82}
        className="object-cover object-center"
        priority
      />
      <HeroBackgroundMedia />

      {/* Overlay escuro */}
      <div className="absolute inset-0 bg-linear-to-b from-black/50 via-black/38 to-black/64" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,167,38,0.1),transparent_60%)]" />
      <div className="absolute inset-0 hero-vignette pointer-events-none" />

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

      {/* Seta para baixo */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 animate-bounce sm:bottom-6 md:bottom-8 lg:bottom-10">
        <svg className="h-5 w-5 text-[#ffa726] sm:h-6 sm:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
