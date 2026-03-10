import Image from "next/image";
import Link from "next/link";
import { getMensagensRecentes } from "@/data/mensagens";

function formatMensagemDate(data: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(`${data}T12:00:00-03:00`));
}

export default function UltimasMensagens() {
  const mensagens = getMensagensRecentes(3);

  return (
    <section id="mensagens" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-end justify-between gap-6 flex-wrap mb-12">
          <div className="max-w-2xl">
            <p className="text-[#ef5350] text-sm font-semibold tracking-widest uppercase mb-2">
              Ensino da semana
            </p>
            <h2 className="font-acme text-3xl md:text-4xl text-[#212121] tracking-wide mb-4">
              Últimas Mensagens
            </h2>
            <p className="text-[#5f5f5f] leading-relaxed">
              Novas mensagens são publicadas semanalmente a partir dos cultos e
              ministrações da AD Madureira Atibaia. Acompanhe o ensino bíblico
              compartilhado na igreja e revisite conteúdos que fortalecem a fé.
            </p>
          </div>

          <Link
            href="/mensagens"
            className="ui-btn-primary"
          >
            Ver todas as mensagens
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {mensagens.map((mensagem) => (
            <Link
              key={mensagem.slug}
              href={`/mensagens/${mensagem.slug}`}
              className="ui-card group overflow-hidden"
            >
              <div className="relative aspect-[16/10] bg-[#111] overflow-hidden">
                <Image
                  src={mensagem.capa ?? "/pulpito-da-igreja.jpg"}
                  alt={mensagem.titulo}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-cover group-hover:scale-[1.03] transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/25 to-transparent" />
                <div className="absolute left-4 bottom-4 rounded-full bg-white/12 px-3 py-2 backdrop-blur-sm text-white text-[11px] font-semibold tracking-widest uppercase">
                  {formatMensagemDate(mensagem.data)}
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-acme text-2xl text-[#212121] tracking-wide mb-3 group-hover:text-[#ef5350] transition-colors">
                  {mensagem.titulo}
                </h3>
                <p className="text-[#5f5f5f] text-sm leading-relaxed line-clamp-3 mb-4">
                  {mensagem.resumo}
                </p>
                <p className="text-[#777] text-sm">
                  Pregador: {mensagem.pregador ?? "AD Madureira Atibaia"}
                </p>
                <p className="ui-link-accent mt-5">
                  Ver mensagem →
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
