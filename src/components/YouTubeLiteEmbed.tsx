"use client";

import { useState } from "react";
import Image from "next/image";

function PlayButton() {
  return (
    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#ef5350] text-white shadow-xl transition-transform duration-200 group-hover:scale-105">
      <svg className="ml-1 h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
        <path d="M8 5.14v13.72c0 .72.78 1.17 1.4.8l10.2-6.86a.93.93 0 0 0 0-1.6L9.4 4.34A.93.93 0 0 0 8 5.14z" />
      </svg>
    </span>
  );
}

type YouTubeLiteEmbedProps = {
  videoId: string;
  title: string;
  badge?: string;
};

/**
 * Embed leve de YouTube: mostra a thumbnail e só carrega o iframe (e os
 * scripts do YouTube) depois do clique, para não pesar o carregamento
 * inicial da página com um vídeo que talvez ninguém assista.
 */
export default function YouTubeLiteEmbed({
  videoId,
  title,
  badge,
}: YouTubeLiteEmbedProps) {
  const [playing, setPlaying] = useState(false);
  const thumbnailSources = [
    `https://i.ytimg.com/vi_webp/${videoId}/maxresdefault.webp`,
    `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
    `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
  ];
  const [thumbnailIndex, setThumbnailIndex] = useState(0);

  return (
    <div className="overflow-hidden rounded-2xl border border-black/8 bg-white shadow-[0_10px_28px_rgba(0,0,0,0.08)]">
      <div className="relative aspect-video bg-[#111]">
        {playing ? (
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            title={title}
            className="h-full w-full border-0"
            referrerPolicy="strict-origin-when-cross-origin"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group relative h-full w-full cursor-pointer text-left"
            aria-label={`Reproduzir ${title}`}
          >
            <Image
              src={thumbnailSources[thumbnailIndex]}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, 640px"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              onError={() =>
                setThumbnailIndex((current) =>
                  current < thumbnailSources.length - 1 ? current + 1 : current
                )
              }
            />
            <div className="absolute inset-0 bg-black/15" />
            <div className="absolute inset-0 flex items-center justify-center">
              <PlayButton />
            </div>
          </button>
        )}
      </div>
      <div className="px-4 py-3">
        {badge && (
          <p className="mb-1 text-xs font-semibold tracking-widest text-[#ef5350] uppercase">
            {badge}
          </p>
        )}
        <p className="font-acme text-sm tracking-wide text-[#212121]">
          {title}
        </p>
      </div>
    </div>
  );
}
