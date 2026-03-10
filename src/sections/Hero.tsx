import Image from "next/image";
import HeroBackgroundMedia from "@/components/HeroBackgroundMedia";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative h-[calc(100svh-5rem)] min-h-[36rem] flex items-center justify-center text-white overflow-hidden bg-[#111]"
    >
      {/* Foto da fachada como background */}
      <Image
        src="/fachada-da-igreja.jpg"
        alt="Fachada da Igreja AD Madureira Atibaia"
        fill
        sizes="100vw"
        className="object-contain object-center"
        priority
      />
      <HeroBackgroundMedia />

      {/* Overlay escuro */}
      <div className="absolute inset-0 bg-linear-to-b from-black/50 via-black/38 to-black/64" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,167,38,0.1),transparent_60%)]" />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 flex flex-col items-center justify-center text-center">
        {/* Logo */}
        <div className="flex justify-center mb-7">
          <Image
            src="/logo.jpg"
            alt="Logo AD Madureira Atibaia"
            width={136}
            height={136}
            className="rounded-full border-4 border-[#ffa726] shadow-[0_18px_45px_rgba(0,0,0,0.35)]"
          />
        </div>

        <div>
          <p className="font-script text-[#f7dfbb] text-[3rem] md:text-[6rem] leading-none drop-shadow-[0_3px_12px_rgba(0,0,0,0.45)]">
            Assembleia de Deus
          </p>
          <p className="text-white/82 text-[11px] md:text-base tracking-[0.34em] uppercase mt-3">
            Ministério Madureira · Campo de Atibaia
          </p>
        </div>
      </div>

      {/* Seta para baixo */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-[#ffa726]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
