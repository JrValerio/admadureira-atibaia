"use client";

import { usePathname } from "next/navigation";

// O painel de conteúdo (/keystatic) ocupa a tela inteira: sem cabeçalho, rodapé e botão do WhatsApp.
export default function HideOnPanel({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return pathname?.startsWith("/keystatic") ? null : children;
}
