import Ministerios from "@/sections/Ministerios";
import { buildPageMetadata } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Ministérios | AD Madureira Atibaia",
  description:
    "Conheça os ministérios da AD Madureira Atibaia, como CONFADAT, UMADAT, Rios de Unção, Baluarte da Fé e Ministério Infantil.",
  path: "/ministerios",
});

export default function MinisteriosPage() {
  return (
    <main className="pt-[80px] bg-[#f5f5f5] min-h-screen">
      <Ministerios />
    </main>
  );
}
