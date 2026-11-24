import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isGitHubStorage } from "../../../keystatic.config";

export const metadata: Metadata = {
  title: "Painel | AD Madureira Atibaia",
  robots: { index: false, follow: false },
};

export default function KeystaticLayout({ children }: { children: React.ReactNode }) {
  // Em produção sem GitHub App, o modo local tentaria gravar no disco da Vercel: escondemos o painel.
  if (process.env.NODE_ENV === "production" && !isGitHubStorage) {
    notFound();
  }

  return children;
}
