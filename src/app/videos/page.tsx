import type { Metadata } from "next";
import Videos from "@/sections/Videos";

export const metadata: Metadata = {
  title: "Cultos e Vídeos | AD Madureira Atibaia",
  description:
    "Assista aos últimos cultos e pregações da AD Madureira Atibaia no YouTube.",
};

export default function VideosPage() {
  return (
    <main className="pt-[80px]">
      <Videos />
    </main>
  );
}
