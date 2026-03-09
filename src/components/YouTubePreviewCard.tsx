"use client";

import { useState } from "react";
import type { YouTubeVideo } from "@/lib/youtube";

function PlayButton() {
  return (
    <span className="flex items-center justify-center w-16 h-16 rounded-full bg-[#ef5350] text-white shadow-xl transition-transform duration-200 group-hover:scale-105">
      <svg className="w-7 h-7 ml-1" fill="currentColor" viewBox="0 0 24 24">
        <path d="M8 5.14v13.72c0 .72.78 1.17 1.4.8l10.2-6.86a.93.93 0 0 0 0-1.6L9.4 4.34A.93.93 0 0 0 8 5.14z" />
      </svg>
    </span>
  );
}

export default function YouTubePreviewCard({
  video,
  destaque = false,
  badge,
}: {
  video: YouTubeVideo;
  destaque?: boolean;
  badge?: string;
}) {
  const [playing, setPlaying] = useState(false);
  const thumbnailSources = [
    `https://i.ytimg.com/vi_webp/${video.id}/maxresdefault.webp`,
    `https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`,
    `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`,
  ];
  const [thumbnailIndex, setThumbnailIndex] = useState(0);
  const thumbnailSrc = thumbnailSources[thumbnailIndex];

  return (
    <div className="rounded-2xl overflow-hidden shadow-md bg-white border border-black/5">
      <div className="aspect-video bg-[#111]">
        {playing ? (
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0`}
            title={video.title}
            loading="eager"
            className="border-0 w-full h-full"
            referrerPolicy="strict-origin-when-cross-origin"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group relative w-full h-full text-left cursor-pointer"
            aria-label={`Reproduzir ${video.title}`}
          >
            <img
              src={thumbnailSrc}
              alt={video.title}
              loading={destaque ? "eager" : "lazy"}
              fetchPriority={destaque ? "high" : "auto"}
              className="w-full h-full object-cover"
              onError={() => {
                setThumbnailIndex((current) =>
                  current < thumbnailSources.length - 1 ? current + 1 : current
                );
              }}
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/15 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <PlayButton />
            </div>
          </button>
        )}
      </div>
      <div className="px-4 py-3">
        {badge && (
          <p className="text-[#ef5350] text-xs font-semibold tracking-widest uppercase mb-1">
            {badge}
          </p>
        )}
        <p className="font-acme text-[#212121] text-sm tracking-wide">
          {video.title}
        </p>
      </div>
    </div>
  );
}
