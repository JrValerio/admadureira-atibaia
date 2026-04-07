"use client";

import { useEffect } from "react";
import Image from "next/image";
import type { GaleriaImagem } from "@/data/galeria";

type GalleryLightboxProps = {
  albumTitle: string;
  images: GaleriaImagem[];
  activeIndex: number | null;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
};

export default function GalleryLightbox({
  albumTitle,
  images,
  activeIndex,
  onClose,
  onPrevious,
  onNext,
}: GalleryLightboxProps) {
  const image = activeIndex === null ? null : images[activeIndex] ?? null;

  useEffect(() => {
    if (activeIndex === null) {
      return undefined;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }

      if (event.key === "ArrowLeft") {
        onPrevious();
      }

      if (event.key === "ArrowRight") {
        onNext();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex, onClose, onNext, onPrevious]);

  if (!image || activeIndex === null) {
    return null;
  }

  const currentLabel = `${activeIndex + 1} / ${images.length}`;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/88 px-4 py-6 backdrop-blur-sm md:px-6 md:py-8"
      role="dialog"
      aria-modal="true"
      aria-label={`Visualização ampliada do álbum ${albumTitle}`}
    >
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        onClick={onClose}
        aria-label="Fechar visualização ampliada"
      />

      <div className="relative z-10 flex w-full max-w-7xl items-center gap-3 md:gap-5">
        <button
          type="button"
          onClick={onPrevious}
          className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 text-lg text-white transition-colors hover:bg-white/18 md:inline-flex"
          aria-label="Foto anterior"
        >
          ←
        </button>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3 pb-4 text-white">
            <div>
              <p className="text-[11px] font-bold tracking-[0.18em] text-[#ffa726] uppercase">
                Galeria
              </p>
              <h2 className="font-acme text-xl tracking-wide md:text-2xl">
                {albumTitle}
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold tracking-[0.18em] uppercase text-white/78">
                {currentLabel}
              </span>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-lg text-white transition-colors hover:bg-white/18"
                aria-label="Fechar visualização ampliada"
              >
                ×
              </button>
            </div>
          </div>

          <figure className="rounded-[1.75rem] border border-white/10 bg-[#050505] p-3 shadow-[0_20px_60px_rgba(0,0,0,0.28)] md:p-4">
            <div className="relative mx-auto aspect-[16/10] w-full overflow-hidden rounded-[1.2rem] bg-black">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>

            <figcaption className="flex flex-col gap-3 px-1 pt-4 text-sm leading-relaxed text-white/78 md:flex-row md:items-center md:justify-between">
              <p>{image.caption ?? image.alt}</p>

              <div className="flex items-center gap-3 md:hidden">
                <button
                  type="button"
                  onClick={onPrevious}
                  className="inline-flex h-11 flex-1 items-center justify-center rounded-full border border-white/15 bg-white/10 font-semibold text-white transition-colors hover:bg-white/18"
                  aria-label="Foto anterior"
                >
                  Anterior
                </button>
                <button
                  type="button"
                  onClick={onNext}
                  className="inline-flex h-11 flex-1 items-center justify-center rounded-full border border-white/15 bg-white/10 font-semibold text-white transition-colors hover:bg-white/18"
                  aria-label="Próxima foto"
                >
                  Próxima
                </button>
              </div>
            </figcaption>
          </figure>
        </div>

        <button
          type="button"
          onClick={onNext}
          className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 text-lg text-white transition-colors hover:bg-white/18 md:inline-flex"
          aria-label="Próxima foto"
        >
          →
        </button>
      </div>
    </div>
  );
}
