import Image from "next/image";
import type { MinisterioLiderancaDestaque } from "@/data/ministerios";

type Props = {
  lider?: MinisterioLiderancaDestaque;
};

// Retrato em 4:5 com o rosto no terço superior: o enquadramento é feito por
// object-position, sem recortar o arquivo original.
export default function LiderancaDestaque({ lider }: Props) {
  if (!lider) return null;

  return (
    <div className="flex items-center gap-4 rounded-2xl border border-[#ffa726]/20 bg-white p-4">
      <div className="relative aspect-[4/5] w-24 shrink-0 overflow-hidden rounded-2xl bg-[#111] sm:w-28">
        <Image
          src={lider.foto}
          alt={`${lider.nome}, ${lider.cargo}`}
          fill
          sizes="112px"
          className="object-cover object-[center_30%]"
        />
      </div>
      <div>
        <p className="font-acme text-xl tracking-wide text-[#212121]">{lider.nome}</p>
        <p className="mt-1 text-sm font-semibold uppercase tracking-widest text-text-accent">
          {lider.cargo}
        </p>
      </div>
    </div>
  );
}
