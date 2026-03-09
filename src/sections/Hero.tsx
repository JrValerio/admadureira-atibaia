import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center text-white overflow-hidden">
      {/* Foto da fachada como background */}
      <Image
        src="/fachada-da-igreja.jpg"
        alt="Fachada da Igreja AD Madureira Atibaia"
        fill
        sizes="100vw"
        className="object-cover object-[center_34%]"
        priority
      />

      {/* Overlay escuro */}
      <div className="absolute inset-0 bg-black/65" />

      {/* Linha decorativa laranja no topo */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#ffa726]" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Image
            src="/logo.jpg"
            alt="Logo AD Madureira Atibaia"
            width={120}
            height={120}
            className="rounded-full border-4 border-[#ffa726] shadow-xl"
          />
        </div>

        {/* Versículo */}
        <p className="text-[#ffd54f] text-xs font-semibold tracking-widest uppercase mb-4">
          Salmos 122:1
        </p>

        {/* Título */}
        <h1 className="font-acme text-4xl md:text-6xl leading-tight mb-4 tracking-wide">
          Alegrei-me quando me disseram:
          <br />
          <span className="text-[#ffa726]">Vamos à Casa do Senhor</span>
        </h1>

        {/* Subtítulo */}
        <p className="text-white/70 text-lg md:text-xl mb-10 max-w-xl mx-auto">
          Assembleia de Deus · Ministério Madureira
          <br />
          <span className="text-white font-semibold">Campo de Atibaia – SP</span>
        </p>

        <p className="text-white/80 text-sm md:text-base mb-8 max-w-2xl mx-auto">
          Praça Pio XII, 122 · Centro · Atibaia/SP
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="#cultos"
            className="bg-[#ffa726] hover:bg-[#e65100] text-[#212121] font-bold px-8 py-3 rounded-full transition-colors duration-200 text-sm tracking-widest uppercase font-acme"
          >
            Horários de Culto
          </Link>
          <Link
            href="/contato"
            className="border-2 border-[#ffa726] hover:bg-[#ffa726] hover:text-[#212121] text-white font-bold px-8 py-3 rounded-full transition-colors duration-200 text-sm tracking-widest uppercase font-acme"
          >
            Como Chegar
          </Link>
        </div>
      </div>

      {/* Seta para baixo */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-[#ffa726]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
