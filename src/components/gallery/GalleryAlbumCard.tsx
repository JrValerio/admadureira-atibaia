import Image from "next/image";
import Link from "next/link";
import type { GaleriaAlbum } from "@/data/galeria";
import {
  formatGaleriaDate,
  getGaleriaCategoryLabel,
} from "@/data/galeria";

type GalleryAlbumCardProps = {
  album: GaleriaAlbum;
  priority?: boolean;
};

export default function GalleryAlbumCard({
  album,
  priority = false,
}: GalleryAlbumCardProps) {
  const descricao =
    album.shortDescription ??
    album.description ??
    "Veja os registros publicados deste álbum da AD Madureira Atibaia.";

  return (
    <Link
      href={`/galeria/${album.slug}`}
      className="group block overflow-hidden rounded-[1.75rem] border border-black/6 bg-white shadow-[0_18px_40px_rgba(0,0,0,0.06)] transition-transform duration-300 hover:-translate-y-1"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={album.coverImage.src}
          alt={album.coverImage.alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/10 via-black/5 to-black/70" />

        <div className="absolute left-4 right-4 top-4 flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-white/15 bg-black/35 px-3 py-1 text-[10px] font-bold tracking-[0.18em] text-white uppercase backdrop-blur-sm">
            {getGaleriaCategoryLabel(album.category)}
          </span>
          <span className="rounded-full border border-white/15 bg-white/12 px-3 py-1 text-[10px] font-semibold tracking-[0.16em] text-white uppercase backdrop-blur-sm">
            {album.images.length} fotos
          </span>
        </div>
      </div>

      <div className="p-5 md:p-6">
        <p className="text-[11px] font-bold tracking-[0.18em] text-[#ef5350] uppercase">
          {formatGaleriaDate(album.date)}
        </p>
        <h3 className="mt-3 font-acme text-xl tracking-wide text-[#212121] md:text-2xl">
          {album.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-[#5f5f5f] md:text-base">
          {descricao}
        </p>
        <div className="mt-5 flex items-center justify-between gap-3 border-t border-black/6 pt-4 text-sm font-semibold text-[#8b5b18]">
          <span>Abrir álbum</span>
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}
