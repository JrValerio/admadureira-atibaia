"use client";

import { useEffect, useRef } from "react";

/**
 * Hook que arma o efeito de reveal e adiciona a classe `is-visible` ao
 * elemento quando ele entra no viewport. Use junto com as classes CSS
 * `.reveal`, `.reveal-armed` e `.is-visible` definidas em globals.css.
 *
 * `.reveal` sozinho é visível — o conteúdo não depende de JavaScript para
 * aparecer. Só quando este hook roda (`reveal-armed`) o elemento passa ao
 * estado oculto/deslocado que antecede a revelação por scroll.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.classList.add("reveal-armed");

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
