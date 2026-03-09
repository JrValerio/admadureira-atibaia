import Image from "next/image";
import Link from "next/link";
import { getMinisterios } from "@/data/ministerios";

export default function Ministerios() {
  const ministerios = getMinisterios();

  return (
    <section id="ministerios" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-[#ffa726] text-sm font-semibold tracking-widest uppercase mb-2">
            Departamentos
          </p>
          <h2 className="font-acme text-3xl md:text-4xl text-[#212121] tracking-wide">
            Ministérios
          </h2>
          <div className="w-16 h-1 bg-[#ffa726] mx-auto mt-4" />
          <p className="text-[#5f5f5f] text-sm md:text-base max-w-3xl mx-auto mt-4 leading-relaxed">
            Conheça os ministérios que servem a igreja por meio do discipulado,
            da adoração, da oração e da formação cristã.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {ministerios.map((min) => (
            <Link
              key={min.slug}
              href={`/ministerios/${min.slug}`}
              className="group rounded-2xl overflow-hidden border border-gray-100 hover:border-[#ffa726] hover:shadow-md transition-all duration-200 bg-white"
            >
              <div className="relative aspect-[4/3] bg-[#111] overflow-hidden">
                <Image
                  src={min.imagem ?? "/fachada-da-igreja.jpg"}
                  alt={min.nome}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
              </div>

              <div className="p-5">
                <div className="text-3xl mb-3">{min.icone}</div>
                <p className="text-[#ef5350] text-[11px] font-semibold tracking-widest uppercase mb-2">
                  {min.escopo}
                </p>
                <h3 className="font-acme text-[#212121] text-xl mb-2 group-hover:text-[#ffa726] transition-colors tracking-wide">
                  {min.nome}
                </h3>
                <p className="text-[#757575] text-sm leading-relaxed line-clamp-3">
                  {min.resumo}
                </p>
                <p className="text-[#ef5350] text-xs font-semibold tracking-widest uppercase mt-4">
                  Ver ministério →
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <Link
            href="/historia"
            className="inline-flex items-center justify-center border border-[#212121] text-[#212121] hover:bg-[#212121] hover:text-white font-bold text-xs tracking-widest uppercase px-6 py-3 rounded-full transition-colors"
          >
            Ver história da igreja
          </Link>
          <Link
            href="/congregacoes"
            className="inline-flex items-center justify-center bg-[#ffa726] hover:bg-[#ffb74d] text-[#212121] font-bold text-xs tracking-widest uppercase px-6 py-3 rounded-full transition-colors"
          >
            Ver congregações
          </Link>
        </div>
      </div>
    </section>
  );
}
