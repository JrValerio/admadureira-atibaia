import type { Metadata } from "next";
import Ministerios from "@/sections/Ministerios";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Ministérios | AD Madureira Atibaia",
  description:
    "Conheça os ministérios da AD Madureira Atibaia, como CONFADAT, UMADAT, Rios de Unção, Baluarte da Fé e Ministério Infantil.",
  alternates: {
    canonical: `${SITE_URL}/ministerios`,
  },
  openGraph: {
    url: `${SITE_URL}/ministerios`,
    title: "Ministérios | AD Madureira Atibaia",
    description:
      "Conheça os ministérios da AD Madureira Atibaia, como CONFADAT, UMADAT, Rios de Unção, Baluarte da Fé e Ministério Infantil.",
    images: [`${SITE_URL}/fachada-da-igreja.jpg`],
  },
};

export default function MinisteriosPage() {
  return (
    <main className="pt-[80px] bg-[#f5f5f5] min-h-screen">
      <Ministerios />
    </main>
  );
}
