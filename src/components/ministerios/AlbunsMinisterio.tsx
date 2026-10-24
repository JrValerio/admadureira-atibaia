import Image from "next/image";
import type { MinisterioAlbum } from "@/data/ministerios";
import { formatGaleriaDate } from "@/data/galeria";

export default function AlbunsMinisterio({ albuns }: { albuns?: MinisterioAlbum[] }) {
  if (!albuns?.length) return null;

  return albuns.map((album) => (
    <section
      key={album.id}
      aria-labelledby={`album-${album.id}`}
      className="mt-10 overflow-hidden rounded-3xl border border-black/8 bg-[#faf8f3]"
    >
      <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
        <div className="self-center p-6 md:p-8">
          <p className="ui-section-eyebrow">Galeria de fotos</p>
          <time dateTime={album.data} className="text-sm text-[#666]">
            {formatGaleriaDate(album.data)}
          </time>
          <h2 id={`album-${album.id}`} className="mt-3 font-acme text-2xl tracking-wide text-[#212121] md:text-3xl">
            {album.titulo}
          </h2>
          <p className="mt-4 leading-relaxed text-[#555]">{album.descricao}</p>
          <a
            href={album.href}
            target="_blank"
            rel="noopener noreferrer"
            className="ui-btn-primary mt-6"
          >
            Abrir álbum completo<span aria-hidden="true">&nbsp;↗</span>
          </a>
          <p className="mt-3 text-xs text-[#666]">Google Fotos · abre em nova guia</p>
        </div>
        <a
          href={album.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Abrir o álbum ${album.titulo} no Google Fotos, em nova guia`}
          className="block self-center overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[#b3261e]"
        >
          <Image
            src={album.capa.src}
            alt={album.capa.alt}
            width={album.capa.largura}
            height={album.capa.altura}
            sizes="(min-width: 1024px) 600px, 100vw"
            className="h-auto w-full"
          />
        </a>
      </div>
      <div className="grid grid-cols-2 items-start gap-3 p-4 md:gap-4 lg:grid-cols-4 lg:p-6">
        {album.fotos.map((foto) => (
          <Image
            key={foto.src}
            src={foto.src}
            alt={foto.alt}
            width={foto.largura}
            height={foto.altura}
            sizes="(min-width: 1024px) 260px, 50vw"
            className="h-auto w-full rounded-xl"
          />
        ))}
      </div>
    </section>
  ));
}
