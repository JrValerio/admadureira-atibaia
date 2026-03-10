"use client";

import { useEffect, useState } from "react";

type LegacyMediaQueryList = MediaQueryList & {
  addListener?: (listener: (event: MediaQueryListEvent) => void) => void;
  removeListener?: (listener: (event: MediaQueryListEvent) => void) => void;
};

export default function HeroBackgroundMedia() {
  const [showAnimatedMedia, setShowAnimatedMedia] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const desktopMedia = window.matchMedia("(min-width: 768px)") as LegacyMediaQueryList;
    const reducedMotionMedia = window.matchMedia("(prefers-reduced-motion: reduce)") as LegacyMediaQueryList;

    const updateVisibility = () => {
      const shouldShow = desktopMedia.matches && !reducedMotionMedia.matches;
      setShowAnimatedMedia(shouldShow);

      if (!shouldShow) {
        setVideoReady(false);
      }
    };

    const handleMediaChange = (_event: MediaQueryListEvent) => {
      updateVisibility();
    };

    const attachListener = (mediaQuery: LegacyMediaQueryList) => {
      if (typeof mediaQuery.addEventListener === "function") {
        mediaQuery.addEventListener("change", handleMediaChange);

        return () => mediaQuery.removeEventListener("change", handleMediaChange);
      }

      mediaQuery.addListener?.(handleMediaChange);

      return () => mediaQuery.removeListener?.(handleMediaChange);
    };

    updateVisibility();
    const detachDesktop = attachListener(desktopMedia);
    const detachReducedMotion = attachListener(reducedMotionMedia);

    return () => {
      detachDesktop();
      detachReducedMotion();
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
      className={`pointer-events-none absolute inset-0 h-full w-full object-contain object-center transition-opacity duration-700 ${
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
