"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { GaleriaImagem } from "@/data/galeria";
import GalleryLightbox from "@/components/gallery/GalleryLightbox";

type PhotoCarouselProps = {
  title: string;
  images: GaleriaImagem[];
  /** Avança sozinho a cada poucos segundos. Pausa em hover/toque/foco. */
  autoplay?: boolean;
  intervalMs?: number;
};

export default function PhotoCarousel({
  title,
  images,
  autoplay = true,
  intervalMs = 3200,
}: PhotoCarouselProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() =>
    typeof window === "undefined"
      ? false
      : window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setPrefersReducedMotion(query.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  const openImage = (index: number) => setActiveIndex(index);
  const closeLightbox = () => setActiveIndex(null);
  const goToPrevious = () =>
    setActiveIndex((current) => {
      if (current === null) return current;
      return current === 0 ? images.length - 1 : current - 1;
    });
  const goToNext = () =>
    setActiveIndex((current) => {
      if (current === null) return current;
      return current === images.length - 1 ? 0 : current + 1;
    });

  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-carousel-card]");
    const cardWidth = card ? card.offsetWidth + 12 : track.clientWidth * 0.8;

    const atEnd =
      direction === 1 &&
      track.scrollLeft + track.clientWidth >= track.scrollWidth - cardWidth / 2;
    const atStart = direction === -1 && track.scrollLeft <= cardWidth / 2;

    if (atEnd) {
      track.scrollTo({ left: 0, behavior: "smooth" });
    } else if (atStart) {
      track.scrollTo({ left: track.scrollWidth, behavior: "smooth" });
    } else {
      track.scrollBy({ left: direction * cardWidth, behavior: "smooth" });
    }
  };

  // Autoplay: avança um card por vez, sozinho, enquanto ninguém interagir.
  useEffect(() => {
    if (!autoplay || prefersReducedMotion || paused || activeIndex !== null) {
      return undefined;
    }

    const id = window.setInterval(() => scrollByCard(1), intervalMs);
    return () => window.clearInterval(id);
  }, [autoplay, prefersReducedMotion, paused, activeIndex, intervalMs]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onFocus={() => setPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) {
          setPaused(false);
        }
      }}
    >
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {images.map((image, index) => (
          <button
            key={`${image.src}-${index}`}
            type="button"
            data-carousel-card
            onClick={() => openImage(index)}
            className="group relative aspect-[4/3] w-[78vw] shrink-0 snap-start overflow-hidden rounded-2xl border border-black/8 bg-white text-left shadow-[0_10px_28px_rgba(0,0,0,0.08)] sm:w-[300px]"
            aria-label={`Ampliar foto ${index + 1} de ${images.length} — ${title}`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 640px) 78vw, 300px"
              loading={index < 4 ? undefined : "lazy"}
              className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/35 via-black/0 to-black/0" />
            <span className="absolute bottom-3 right-3 rounded-full border border-white/25 bg-white/15 px-3 py-1 text-[10px] font-bold tracking-[0.16em] text-white uppercase backdrop-blur-sm">
              Ampliar
            </span>
          </button>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <p className="text-xs font-semibold tracking-[0.14em] text-[#8a8a8a] uppercase">
          {images.length} fotos
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white text-[#212121] transition-colors hover:border-[#8b5b18] hover:text-[#8b5b18] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b5b18]"
            aria-label="Fotos anteriores"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white text-[#212121] transition-colors hover:border-[#8b5b18] hover:text-[#8b5b18] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b5b18]"
            aria-label="Próximas fotos"
          >
            →
          </button>
        </div>
      </div>

      <GalleryLightbox
        albumTitle={title}
        images={images}
        activeIndex={activeIndex}
        onClose={closeLightbox}
        onPrevious={goToPrevious}
        onNext={goToNext}
      />
    </div>
  );
}
