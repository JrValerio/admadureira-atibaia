import Image from "next/image";
import Link from "next/link";
import type { Pastor } from "@/data/pastores";

type PastoresGridProps = {
  pastores: Pastor[];
  theme?: "light" | "dark";
};

export default function PastoresGrid({
  pastores,
  theme = "light",
}: PastoresGridProps) {
  const isDark = theme === "dark";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {pastores.map((pastor) => (
        <Link
          key={pastor.slug}
          href={`/pastores/${pastor.slug}`}
          className={`group rounded-2xl overflow-hidden border transition-all duration-200 ${
            isDark
              ? "bg-white/5 border-white/10 hover:border-[#ffa726] hover:bg-white/8"
              : "bg-white border-black/5 hover:border-[#ffa726] hover:shadow-lg"
          }`}
        >
          <div className="relative aspect-[4/5] bg-[#111] overflow-hidden">
            <Image
              src={pastor.foto}
              alt={pastor.nome}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
              className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-black/80 to-transparent" />
          </div>

          <div className="p-5">
            <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-2">
              {pastor.cargo}
            </p>
            <h3
              className={`font-acme text-xl tracking-wide leading-tight mb-3 ${
                isDark ? "text-white" : "text-[#212121]"
              }`}
            >
              {pastor.nome}
            </h3>
            <p
              className={`text-sm leading-relaxed ${
                isDark ? "text-white/70" : "text-[#5f5f5f]"
              }`}
            >
              {pastor.resumo}
            </p>
            <p className="text-[#ef5350] text-xs font-semibold tracking-widest uppercase mt-4">
              Ver biografia →
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}

