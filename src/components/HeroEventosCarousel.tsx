"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type HeroEventosSlide = {
  id: string;
  titulo: string;
  detalhe: string;
  eyebrow: string;
  imagem: string;
  href: string;
  ctaLabel: string;
  apoioHref: string;
  apoioLabel: string;
};

type HeroEventosCarouselProps = {
  slides: HeroEventosSlide[];
};

export default function HeroEventosCarousel({
  slides,
}: HeroEventosCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 7000);

    return () => window.clearInterval(intervalId);
  }, [slides.length]);

  if (slides.length === 0) {
    return null;
  }

  const activeSlide = slides[activeIndex] ?? slides[0];

  return (
    <section className="relative isolate overflow-hidden bg-[#111]">
      <div className="relative min-h-[32rem] md:min-h-[38rem]">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === activeIndex ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <Image
              src={slide.imagem}
              alt={slide.titulo}
              fill
              sizes="100vw"
              priority={index === 0}
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-linear-to-r from-black/82 via-black/55 to-black/38" />
            <div className="absolute inset-0 bg-linear-to-t from-black/72 via-transparent to-black/35" />
          </div>
        ))}

        <div className="relative z-10 mx-auto flex min-h-[32rem] max-w-6xl flex-col justify-end px-4 py-10 md:min-h-[38rem] md:py-14">
          <div className="max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-[#ffa726]">
              {activeSlide.eyebrow}
            </p>
            <h2 className="font-acme text-4xl tracking-wide text-white md:text-5xl lg:text-[3.5rem]">
              {activeSlide.titulo}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/82 md:text-lg">
              {activeSlide.detalhe}
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link href={activeSlide.href} className="ui-btn-primary">
              {activeSlide.ctaLabel}
            </Link>
            <Link href={activeSlide.apoioHref} className="ui-btn-secondary">
              {activeSlide.apoioLabel}
            </Link>
          </div>

          <div className="mt-8 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {slides.map((slide, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-pressed={isActive}
                  className={`rounded-[1.6rem] border px-4 py-4 text-left transition-all ${
                    isActive
                      ? "border-[#ffa726]/60 bg-black/55 shadow-[0_16px_30px_rgba(0,0,0,0.22)]"
                      : "border-white/12 bg-black/28 hover:border-[#ffa726]/35 hover:bg-black/42"
                  }`}
                >
                  <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-[#f7c069]">
                    {slide.eyebrow}
                  </span>
                  <span className="mt-2 block font-acme text-2xl tracking-wide text-white">
                    {slide.titulo}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
