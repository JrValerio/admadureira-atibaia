"use client";

import { useEffect, useRef } from "react";

/**
 * Hook que adiciona a classe `is-visible` ao elemento quando ele entra
 * no viewport. Use junto com as classes CSS `.reveal` e `.is-visible`
 * definidas em globals.css.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}
