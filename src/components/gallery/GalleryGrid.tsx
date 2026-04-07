"use client";

import { useState } from "react";
import Image from "next/image";
import type { GaleriaImagem } from "@/data/galeria";
import GalleryLightbox from "@/components/gallery/GalleryLightbox";

type GalleryGridProps = {
  albumTitle: string;
  images: GaleriaImagem[];
};

function isWideTile(index: number, total: number) {
  return total >= 5 && index === 0;
}

export default function GalleryGrid({
  albumTitle,
  images,
}: GalleryGridProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const openImage = (index: number) => setActiveIndex(index);
  const closeLightbox = () => setActiveIndex(null);
  const goToPrevious = () =>
    setActiveIndex((current) => {
      if (current === null) {
        return current;
      }

      return current === 0 ? images.length - 1 : current - 1;
    });
  const goToNext = () =>
    setActiveIndex((current) => {
      if (current === null) {
        return current;
      }

      return current === images.length - 1 ? 0 : current + 1;
    });

  return (
    <>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 xl:grid-cols-4">
        {images.map((image, index) => {
          const wideTile = isWideTile(index, images.length);

          return (
            <button
              key={`${image.src}-${index}`}
              type="button"
              onClick={() => openImage(index)}
              className={`group relative overflow-hidden rounded-[1.5rem] border border-black/8 bg-white text-left shadow-[0_14px_36px_rgba(0,0,0,0.05)] ${
                wideTile ? "col-span-2 xl:col-span-2" : ""
              }`.trim()}
              aria-label={`Ampliar foto ${index + 1} do álbum ${albumTitle}`}
            >
              <div
                className={`relative ${
                  wideTile ? "aspect-[16/10]" : "aspect-square md:aspect-[4/3]"
                }`.trim()}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes={
                    wideTile
                      ? "(max-width: 768px) 100vw, (max-width: 1280px) 66vw, 50vw"
                      : "(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  }
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-linear-to-b from-black/10 via-black/0 to-black/60" />
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 p-4 text-white">
                  <p className="line-clamp-2 text-sm leading-relaxed text-white/88">
                    {image.caption ?? image.alt}
                  </p>
                  <span className="shrink-0 rounded-full border border-white/15 bg-white/12 px-3 py-1 text-[10px] font-bold tracking-[0.16em] uppercase backdrop-blur-sm">
                    Ampliar
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <GalleryLightbox
        albumTitle={albumTitle}
        images={images}
        activeIndex={activeIndex}
        onClose={closeLightbox}
        onPrevious={goToPrevious}
        onNext={goToNext}
      />
    </>
  );
}
