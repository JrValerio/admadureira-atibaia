import Videos from "@/sections/Videos";
import { buildPageMetadata } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Cultos e Vídeos | AD Madureira Atibaia",
  description:
    "Assista aos últimos cultos e pregações da AD Madureira Atibaia no YouTube.",
  path: "/videos",
});

export default function VideosPage() {
  return (
    <main className="pt-[80px]">
      <Videos />
    </main>
  );
}
