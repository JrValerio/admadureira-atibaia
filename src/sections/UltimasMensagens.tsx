import Link from "next/link";
import CardMedia from "@/components/media/CardMedia";
import { CardGrid, Section, SectionTitle } from "@/components/ui";
import { getMensagemThumbnailUrl, getMensagensRecentes } from "@/data/mensagens";

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
    <Section id="mensagens" className="bg-white">
      <div>
        <div className="flex items-end justify-between gap-6 flex-wrap mb-12">
          <SectionTitle
            eyebrow="Ensino da semana"
            title="Últimas Mensagens"
            center={false}
            className="mb-0 max-w-2xl"
            description="Novas mensagens são publicadas semanalmente a partir dos cultos e ministrações da AD Madureira Atibaia. Acompanhe o ensino bíblico compartilhado na igreja e revisite conteúdos que fortalecem a fé."
          />

          <Link
            href="/mensagens"
            className="ui-btn-primary"
          >
            Ver todas as mensagens
          </Link>
        </div>

        <CardGrid className="gap-8">
          {mensagens.map((mensagem) => (
            <Link
              key={mensagem.slug}
              href={`/mensagens/${mensagem.slug}`}
              className="ui-card group overflow-hidden rounded-[1.6rem]"
            >
              <CardMedia
                src={getMensagemThumbnailUrl(mensagem.youtubeId)}
                alt={mensagem.titulo}
                variant="content"
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                zoomOnHover
                className="rounded-none"
              >
                <div className="absolute left-4 bottom-4 rounded-full bg-black/55 px-3 py-2 text-white text-[11px] font-semibold tracking-widest uppercase">
                  {formatMensagemDate(mensagem.data)}
                </div>
              </CardMedia>

              <div className="p-6">
                <h3 className="font-acme text-xl text-[#212121] tracking-wide mb-3 group-hover:text-[#ef5350] transition-colors line-clamp-2">
                  {mensagem.titulo}
                </h3>
                <p className="text-[#5f5f5f] text-sm leading-relaxed line-clamp-3 mb-4">
                  {mensagem.resumo}
                </p>
                <p className="text-[#777] text-sm">
                  Pregador: {mensagem.pregador ?? "AD Madureira Atibaia"}
                </p>
                <p className="ui-link-accent mt-5 inline-flex">
                  Ver mensagem →
                </p>
              </div>
            </Link>
          ))}
        </CardGrid>
      </div>
    </Section>
  );
}
