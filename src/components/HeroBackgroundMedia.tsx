"use client";

import { useEffect, useState } from "react";

export default function HeroBackgroundMedia() {
  const [showAnimatedMedia, setShowAnimatedMedia] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const desktopMedia = window.matchMedia("(min-width: 768px)");
    const reducedMotionMedia = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateVisibility = () => {
      setShowAnimatedMedia(desktopMedia.matches && !reducedMotionMedia.matches);
    };

    updateVisibility();
    desktopMedia.addEventListener("change", updateVisibility);
    reducedMotionMedia.addEventListener("change", updateVisibility);

    return () => {
      desktopMedia.removeEventListener("change", updateVisibility);
      reducedMotionMedia.removeEventListener("change", updateVisibility);
    };
  }, []);

  if (!showAnimatedMedia) {
    return null;
  }

  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      poster="/fachada-da-igreja.jpg"
      aria-hidden="true"
      className={`absolute inset-0 h-full w-full object-cover object-[center_18%] md:object-[center_14%] xl:object-[center_12%] scale-[1.02] transition-opacity duration-700 ${
        videoReady ? "opacity-100 animate-hero-media-in" : "opacity-0"
      }`}
      onCanPlay={() => setVideoReady(true)}
      onLoadedData={() => setVideoReady(true)}
      disablePictureInPicture
    >
      <source src="/fachada-da-igreja.mp4" type="video/mp4" />
    </video>
  );
}
