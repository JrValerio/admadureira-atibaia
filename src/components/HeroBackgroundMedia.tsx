"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

type LegacyMediaQueryList = MediaQueryList & {
  addListener?: (listener: (event: MediaQueryListEvent) => void) => void;
  removeListener?: (listener: (event: MediaQueryListEvent) => void) => void;
};

type LegacyNetworkInformation = {
  effectiveType?: string;
  saveData?: boolean;
  addEventListener?: (type: "change", listener: () => void) => void;
  removeEventListener?: (type: "change", listener: () => void) => void;
  addListener?: (listener: () => void) => void;
  removeListener?: (listener: () => void) => void;
};

type NavigatorWithConnection = Navigator & {
  connection?: LegacyNetworkInformation;
};

type WindowWithIdleCallback = Window & {
  requestIdleCallback?: (
    callback: () => void,
    options?: { timeout: number }
  ) => number;
  cancelIdleCallback?: (handle: number) => void;
};

export default function HeroBackgroundMedia() {
  const [showAnimatedMedia, setShowAnimatedMedia] = useState(false);
  const [allowVideoRender, setAllowVideoRender] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [translateY, setTranslateY] = useState(0);
  const mediaLayerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const desktopMedia = window.matchMedia("(min-width: 768px)") as LegacyMediaQueryList;
    const reducedMotionMedia = window.matchMedia("(prefers-reduced-motion: reduce)") as LegacyMediaQueryList;
    const connection = (navigator as NavigatorWithConnection).connection;

    const shouldAvoidHeavyMedia = () => {
      if (!connection) {
        return false;
      }

      return (
        Boolean(connection.saveData) ||
        connection.effectiveType === "slow-2g" ||
        connection.effectiveType === "2g" ||
        connection.effectiveType === "3g"
      );
    };

    const updateVisibility = () => {
      const shouldShow =
        desktopMedia.matches &&
        !reducedMotionMedia.matches &&
        !shouldAvoidHeavyMedia();

      setShowAnimatedMedia(shouldShow);

      if (!shouldShow) {
        setAllowVideoRender(false);
        setVideoReady(false);
      }
    };

    const handleMediaChange = () => {
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

    const attachConnectionListener = (
      networkInformation?: LegacyNetworkInformation
    ) => {
      if (!networkInformation) {
        return () => undefined;
      }

      if (typeof networkInformation.addEventListener === "function") {
        networkInformation.addEventListener("change", handleMediaChange);

        return () =>
          networkInformation.removeEventListener?.("change", handleMediaChange);
      }

      networkInformation.addListener?.(handleMediaChange);

      return () => networkInformation.removeListener?.(handleMediaChange);
    };

    updateVisibility();
    const detachDesktop = attachListener(desktopMedia);
    const detachReducedMotion = attachListener(reducedMotionMedia);
    const detachConnection = attachConnectionListener(connection);

    return () => {
      detachDesktop();
      detachReducedMotion();
      detachConnection();
    };
  }, []);

  useEffect(() => {
    if (!showAnimatedMedia) {
      return;
    }

    const currentWindow = window as WindowWithIdleCallback;
    let timeoutId: number | null = null;
    let idleId: number | null = null;

    if (typeof currentWindow.requestIdleCallback === "function") {
      idleId = currentWindow.requestIdleCallback(() => {
        setAllowVideoRender(true);
      }, { timeout: 1400 });
    } else {
      timeoutId = window.setTimeout(() => {
        setAllowVideoRender(true);
      }, 900);
    }

    return () => {
      if (idleId !== null) {
        currentWindow.cancelIdleCallback?.(idleId);
      }

      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [showAnimatedMedia]);

  useEffect(() => {
    if (!showAnimatedMedia || !allowVideoRender) {
      return;
    }

    const handleScroll = () => {
      setTranslateY(Math.min(window.scrollY * 0.08, 18));
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [allowVideoRender, showAnimatedMedia]);

  useLayoutEffect(() => {
    if (!mediaLayerRef.current) {
      return;
    }

    mediaLayerRef.current.style.transform = `translateY(${translateY}px)`;
  }, [translateY]);

  if (!showAnimatedMedia || !allowVideoRender) {
    return null;
  }

  return (
    <div
      ref={mediaLayerRef}
      className="pointer-events-none absolute inset-0 will-change-transform"
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="none"
        poster="/fachada-da-igreja.jpg"
        aria-hidden="true"
        className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ${
          videoReady ? "opacity-100 animate-hero-media-in" : "opacity-0"
        }`}
        onCanPlay={() => setVideoReady(true)}
        onLoadedData={() => setVideoReady(true)}
        disablePictureInPicture
      >
        <source src="/fachada-da-igreja.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
