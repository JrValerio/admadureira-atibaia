import Image from "next/image";
import Link from "next/link";
import { getTestemunhosRecentes } from "@/data/testemunhos";

function formatDate(data: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(`${data}T12:00:00-03:00`));
}

export default function HistoriasDeFe() {
  const testemunhos = getTestemunhosRecentes(2);

  return (
    <section id="testemunhos" className="py-24 bg-[#f5f5f5]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-end justify-between gap-6 flex-wrap mb-12">
          <div className="max-w-2xl">
            <p className="text-[#ef5350] text-sm font-semibold tracking-widest uppercase mb-2">
              Comunidade e fé
            </p>
            <h2 className="font-acme text-3xl md:text-4xl text-[#212121] tracking-wide mb-4">
              Histórias de Fé
            </h2>
            <p className="text-[#5f5f5f] leading-relaxed">
              Testemunhos mostram como Deus continua agindo na vida de pessoas e
              famílias da comunidade. Leia relatos de restauração, resposta de
              oração e fortalecimento espiritual.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/testemunhos"
              className="inline-flex items-center justify-center bg-[#ffa726] hover:bg-[#ffb74d] text-[#212121] font-bold text-xs tracking-widest uppercase px-6 py-3 rounded-full transition-colors"
            >
              Ver todos os testemunhos
            </Link>
            <Link
              href="/mensagens"
              className="inline-flex items-center justify-center border border-[#212121] text-[#212121] hover:bg-[#212121] hover:text-white font-bold text-xs tracking-widest uppercase px-6 py-3 rounded-full transition-colors"
            >
              Ver mensagens
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {testemunhos.map((testemunho) => (
            <Link
              key={testemunho.slug}
              href={`/testemunhos/${testemunho.slug}`}
              className="group rounded-3xl overflow-hidden bg-white border border-black/5 shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="relative aspect-[16/10] bg-[#111] overflow-hidden">
                <Image
                  src={testemunho.foto ?? "/pulpito-da-igreja.jpg"}
                  alt={testemunho.titulo}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover group-hover:scale-[1.03] transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/25 to-transparent" />
                <div className="absolute left-4 bottom-4 rounded-full bg-white/12 px-3 py-2 backdrop-blur-sm text-white text-[11px] font-semibold tracking-widest uppercase">
                  {formatDate(testemunho.data)}
                </div>
              </div>

              <div className="p-6 md:p-8">
                {testemunho.youtubeId && (
                  <p className="text-[#ef5350] text-[11px] font-semibold tracking-widest uppercase mb-2">
                    Vídeo testemunho
                  </p>
                )}
                <h3 className="font-acme text-3xl text-[#212121] tracking-wide mb-3 group-hover:text-[#ef5350] transition-colors">
                  {testemunho.titulo}
                </h3>
                <p className="text-[#5f5f5f] leading-relaxed line-clamp-3 mb-4">
                  {testemunho.resumo}
                </p>
                <p className="text-[#777] text-sm">Por: {testemunho.nome}</p>
                <p className="text-[#ef5350] text-xs font-semibold tracking-widest uppercase mt-5">
                  Ler testemunho →
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
