import Link from "next/link";
import CardMedia from "@/components/media/CardMedia";
import { getTestemunhosRecentes } from "@/data/testemunhos";
import { Section } from "@/components/ui/Section";

function formatDate(data: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(`${data}T12:00:00-03:00`));
}

export default async function HistoriasDeFe() {
  const testemunhos = await getTestemunhosRecentes(2);

  return (
    <Section id="testemunhos" bg="cream">
        <div className="flex items-end justify-between gap-6 flex-wrap mb-12">
          <div className="max-w-2xl">
            <p className="text-[#ef5350] text-sm font-semibold tracking-widest uppercase mb-2">
              Comunidade e fé
            </p>
            <h2 className="font-acme text-2xl md:text-4xl text-[#212121] tracking-wide mb-4">
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
              className="ui-btn-primary"
            >
              Ver todos os testemunhos
            </Link>
            <Link
              href="/mensagens"
              className="ui-btn-secondary"
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
              className="ui-card group overflow-hidden"
            >
              <CardMedia
                src={testemunho.foto}
                alt={testemunho.titulo}
                variant="testimony"
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="rounded-none"
              >
                <div className="absolute left-4 bottom-4 rounded-full bg-white/12 px-3 py-2 backdrop-blur-sm text-white text-[11px] font-semibold tracking-widest uppercase">
                  {formatDate(testemunho.data)}
                </div>
              </CardMedia>

              <div className="p-4 md:p-8">
                {testemunho.youtubeId && (
                  <p className="text-[#ef5350] text-[11px] font-semibold tracking-widest uppercase mb-2">
                    Vídeo testemunho
                  </p>
                )}
                <h3 className="font-acme text-xl md:text-3xl text-[#212121] tracking-wide mb-3 group-hover:text-[#ef5350] transition-colors">
                  {testemunho.titulo}
                </h3>
                <p className="text-[#5f5f5f] leading-relaxed line-clamp-3 mb-4">
                  {testemunho.resumo}
                </p>
                <p className="text-[#777] text-sm">Por: {testemunho.nome}</p>
                <p className="ui-link-accent mt-5 inline-flex">
                  Ler testemunho →
                </p>
              </div>
            </Link>
          ))}
        </div>
    </Section>
  );
}
