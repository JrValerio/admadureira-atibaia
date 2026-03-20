"use client";

import { useState, useEffect } from "react";
import { SEDE_WHATSAPP_URL } from "@/data/site";

const WHATSAPP_URL =
  `${SEDE_WHATSAPP_URL}?text=Olá!%20Vim%20pelo%20site%20e%20gostaria%20de%20mais%20informações.`;

export default function WhatsAppButton() {
  const [visivel, setVisivel] = useState(false);

  // Aparece após o usuário rolar um pouco
  useEffect(() => {
    const onScroll = () => setVisivel(window.scrollY > 200);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Fale conosco pelo WhatsApp"
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25d366] hover:bg-[#1ebe57] text-white rounded-full shadow-xl transition-all duration-300 ${
        visivel
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      {/* Ícone do WhatsApp — pulsa 3x ao aparecer */}
      <span className="flex items-center justify-center w-14 h-14 shrink-0 wa-pulse">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          className="w-7 h-7"
          fill="currentColor"
        >
          <path d="M16.003 2.667C8.64 2.667 2.667 8.64 2.667 16c0 2.352.636 4.573 1.747 6.496L2.667 29.333l6.997-1.733A13.26 13.26 0 0 0 16.003 29.333c7.36 0 13.33-5.973 13.33-13.333S23.363 2.667 16.003 2.667zm0 24c-2.187 0-4.227-.6-5.973-1.64l-.427-.253-4.147 1.027 1.053-4.04-.28-.44A10.613 10.613 0 0 1 5.333 16c0-5.88 4.787-10.667 10.67-10.667 5.88 0 10.667 4.787 10.667 10.667S21.883 26.667 16.003 26.667zm5.853-7.987c-.32-.16-1.893-.933-2.187-1.04-.293-.107-.507-.16-.72.16-.213.32-.827 1.04-.987 1.227-.173.187-.333.213-.653.053-.32-.16-1.347-.493-2.56-1.573-.947-.84-1.587-1.88-1.773-2.2-.187-.32-.02-.493.14-.653.14-.133.32-.347.48-.52.16-.173.213-.293.32-.507.107-.213.053-.4-.027-.56-.08-.16-.72-1.733-.987-2.373-.253-.613-.52-.533-.72-.547-.187-.013-.4-.013-.613-.013-.213 0-.56.08-.853.4-.293.32-1.12 1.093-1.12 2.667s1.147 3.093 1.307 3.307c.16.213 2.253 3.44 5.467 4.827.76.32 1.36.52 1.827.667.76.24 1.453.213 2 .133.613-.093 1.893-.773 2.16-1.52.267-.747.267-1.387.187-1.52-.08-.147-.293-.227-.613-.387z" />
        </svg>
      </span>
      {/* Label — visível apenas em telas maiores */}
      <span className="hidden sm:block text-sm font-bold tracking-wide pr-5">
        Fale conosco
      </span>
    </a>
  );
}
