import Image from "next/image";
import Link from "next/link";
import HeroBackgroundMedia from "@/components/HeroBackgroundMedia";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-[18.5rem] h-[47svh] items-center justify-center overflow-hidden bg-[#111] text-white sm:min-h-[22rem] sm:h-[calc(100svh-5rem)]"
    >
      {/* Foto da fachada como background */}
      <Image
        src="/fachada-da-igreja.jpg"
        alt="Fachada da Igreja AD Madureira Atibaia"
        fill
        sizes="100vw"
        className="object-cover object-center"
        priority
      />
      <HeroBackgroundMedia />

      {/* Overlay escuro */}
      <div className="absolute inset-0 bg-linear-to-b from-black/50 via-black/38 to-black/64" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,167,38,0.1),transparent_60%)]" />
      <div className="absolute inset-0 hero-vignette pointer-events-none" />

      <div className="relative z-10 ui-page-container flex flex-col items-center justify-center pt-10 pb-12 text-center sm:py-0">
        {/* Logo */}
        <div className="mb-5 flex justify-center sm:mb-7">
          <Image
            src="/logo-transparent.png"
            alt="Logo AD Madureira Atibaia"
            width={136}
            height={136}
            className="h-auto w-[6.4rem] drop-shadow-[0_18px_32px_rgba(0,0,0,0.26)] sm:w-[7.4rem] md:w-[8.5rem]"
            style={{ height: "auto" }}
          />
        </div>

        <div>
          <p className="font-script hero-title-glow leading-none text-[#f7dfbb] text-[2.15rem] sm:text-[2.8rem] md:text-[4.6rem] lg:text-[5.2rem]">
            Assembleia de Deus
          </p>
          <p className="mt-2 text-[10px] tracking-[0.24em] text-white/82 uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] sm:mt-3 sm:text-[11px] sm:tracking-[0.34em] md:text-base">
            Ministério Madureira · Campo de Atibaia
          </p>
        </div>

        <div className="mt-6 flex flex-col items-center gap-2.5 sm:mt-8 sm:gap-3 sm:flex-row sm:justify-center">
          <Link href="/programacao" className="ui-btn-primary">
            Ver programação
          </Link>
          <Link href="/contato" className="ui-btn-secondary">
            Como chegar
          </Link>
        </div>
      </div>

      {/* Seta para baixo */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 animate-bounce sm:bottom-10">
        <svg className="h-5 w-5 text-[#ffa726] sm:h-6 sm:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
