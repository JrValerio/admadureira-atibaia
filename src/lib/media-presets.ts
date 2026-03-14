import { igrejaHeroMedia } from "@/data/igreja-media";

export type MediaVariant =
  | "event"
  | "content"
  | "institutional"
  | "spiritual"
  | "testimony";

type MediaPreset = {
  aspect: string;
  containerClass: string;
  imageClass: string;
  overlayClass: string;
  fallback: string;
};

export const mediaPresets: Record<MediaVariant, MediaPreset> = {
  event: {
    aspect: "aspect-video",
    containerClass: "overflow-hidden rounded-[1.6rem] bg-[#111] min-h-[220px]",
    imageClass: "object-cover",
    overlayClass: "bg-linear-to-t from-black/72 via-black/18 to-transparent",
    fallback: igrejaHeroMedia.eventos,
  },
  content: {
    aspect: "aspect-[16/10]",
    containerClass: "overflow-hidden rounded-[1.6rem] bg-[#111] min-h-[220px]",
    imageClass: "object-cover",
    overlayClass: "bg-linear-to-t from-black/75 via-black/22 to-transparent",
    fallback: igrejaHeroMedia.mensagens,
  },
  institutional: {
    aspect: "aspect-[4/3]",
    containerClass: "overflow-hidden rounded-[1.4rem] bg-[#111] min-h-[220px]",
    imageClass: "object-cover",
    overlayClass: "bg-linear-to-t from-black/70 via-black/15 to-transparent",
    fallback: igrejaHeroMedia.sobre,
  },
  spiritual: {
    aspect: "aspect-square",
    containerClass: "overflow-hidden rounded-[1.4rem] bg-[#111] min-h-[220px]",
    imageClass: "object-cover",
    overlayClass: "bg-linear-to-t from-black/68 via-black/18 to-transparent",
    fallback: igrejaHeroMedia.espiritualidade,
  },
  testimony: {
    aspect: "aspect-[16/10]",
    containerClass: "overflow-hidden rounded-[1.6rem] bg-[#111] min-h-[220px]",
    imageClass: "object-cover",
    overlayClass: "bg-linear-to-t from-black/75 via-black/20 to-transparent",
    fallback: igrejaHeroMedia.testemunhos,
  },
};
