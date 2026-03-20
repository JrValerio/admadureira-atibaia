"use client";

import { useEffect, useState } from "react";

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

const HERO_SETTLE_DELAY_MS = 1200;
const IDLE_CALLBACK_TIMEOUT_MS = 1400;
const HERO_INTENT_VIDEO_DELAY_MS = 180;
const HERO_NO_INTENT_FALLBACK_MS = 12000;

export default function HeroBackgroundMedia() {
  const [showAnimatedMedia, setShowAnimatedMedia] = useState(false);
  const [allowVideoRender, setAllowVideoRender] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

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

    type IdleDeadline = {
      didTimeout: boolean;
      timeRemaining: () => number;
    };

    type WindowWithIdleCallback = Window &
      typeof globalThis & {
        requestIdleCallback?: (
          callback: (deadline: IdleDeadline) => void,
          options?: { timeout: number }
        ) => number;
        cancelIdleCallback?: (handle: number) => void;
      };

    const windowWithIdleCallback = window as WindowWithIdleCallback;
    let settleTimeoutId: number | null = null;
    let idleId: number | null = null;
    let intentTimeoutId: number | null = null;
    let fallbackTimeoutId: number | null = null;
    let detachIntentListeners: (() => void) | null = null;

    const cleanupIntentListeners = () => {
      detachIntentListeners?.();
      detachIntentListeners = null;
    };

    const finalizeVideoRender = () => {
      cleanupIntentListeners();

      if (fallbackTimeoutId !== null) {
        window.clearTimeout(fallbackTimeoutId);
        fallbackTimeoutId = null;
      }

      if (intentTimeoutId !== null) {
        return;
      }

      intentTimeoutId = window.setTimeout(() => {
        setAllowVideoRender(true);
      }, HERO_INTENT_VIDEO_DELAY_MS);
    };

    const armIntentGate = () => {
      const interactionEvents = ["pointerdown", "keydown", "wheel", "touchstart", "scroll"] as const;
      const cleanups = interactionEvents.map((eventName) => {
        const listener = () => {
          finalizeVideoRender();
        };

        window.addEventListener(eventName, listener, {
          once: true,
          passive: eventName !== "keydown",
        });

        return () => window.removeEventListener(eventName, listener);
      });

      detachIntentListeners = () => {
        cleanups.forEach((cleanup) => cleanup());
      };

      fallbackTimeoutId = window.setTimeout(() => {
        finalizeVideoRender();
      }, HERO_NO_INTENT_FALLBACK_MS);
    };

    const scheduleVideoRender = () => {
      const armAfterSettle = () => {
        settleTimeoutId = window.setTimeout(() => {
          armIntentGate();
        }, HERO_SETTLE_DELAY_MS);
      };

      if (typeof windowWithIdleCallback.requestIdleCallback === "function") {
        idleId = windowWithIdleCallback.requestIdleCallback(() => {
          armAfterSettle();
        }, { timeout: IDLE_CALLBACK_TIMEOUT_MS });

        return;
      }

      armAfterSettle();
    };

    if (document.readyState === "complete") {
      scheduleVideoRender();
    } else {
      const handleLoad = () => {
        scheduleVideoRender();
      };

      window.addEventListener("load", handleLoad, { once: true });

      return () => {
        window.removeEventListener("load", handleLoad);

        if (idleId !== null) {
          windowWithIdleCallback.cancelIdleCallback?.(idleId);
        }

        cleanupIntentListeners();

        if (settleTimeoutId !== null) {
          window.clearTimeout(settleTimeoutId);
        }

        if (intentTimeoutId !== null) {
          window.clearTimeout(intentTimeoutId);
        }

        if (fallbackTimeoutId !== null) {
          window.clearTimeout(fallbackTimeoutId);
        }
      };
    }

    return () => {
      if (idleId !== null) {
        windowWithIdleCallback.cancelIdleCallback?.(idleId);
      }

      cleanupIntentListeners();

      if (settleTimeoutId !== null) {
        window.clearTimeout(settleTimeoutId);
      }

      if (intentTimeoutId !== null) {
        window.clearTimeout(intentTimeoutId);
      }

      if (fallbackTimeoutId !== null) {
        window.clearTimeout(fallbackTimeoutId);
      }
    };
  }, [showAnimatedMedia]);

  if (!showAnimatedMedia || !allowVideoRender) {
    return null;
  }

  return (
    <div className="pointer-events-none absolute inset-0">
      {/* Keep the still image as the first-paint anchor; the video only enriches it after the hero settles. */}
      <div className="absolute inset-px overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          aria-hidden="true"
          className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-500 ${
            videoReady ? "opacity-[0.72] animate-hero-media-in" : "opacity-0"
          }`}
          onCanPlay={() => setVideoReady(true)}
          onLoadedData={() => setVideoReady(true)}
          disablePictureInPicture
        >
          <source src="/fachada-da-igreja.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
}
