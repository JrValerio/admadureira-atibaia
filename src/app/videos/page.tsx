import Link from "next/link";
import HeroPage from "@/components/HeroPage";
import { igrejaHeroMedia } from "@/data/igreja-media";
import Videos from "@/sections/Videos";
import { buildPageMetadata } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Cultos e Vídeos | AD Madureira Atibaia",
  description:
    "Assista aos últimos cultos e pregações da AD Madureira Atibaia no YouTube.",
  path: "/videos",
});

export default function VideosPage() {
  return (
    <main className="bg-[#f5f5f5] min-h-screen">
      <HeroPage
        variant="full"
        label="Vídeo e transmissão"
        title="Cultos, transmissões e vídeos"
        description="Veja o que está ao vivo, assista aos cultos mais recentes da AD Madureira Atibaia e use esta área como ponto de entrada para acompanhar a igreja em vídeo."
        image={igrejaHeroMedia.videos}
        imageAlt="Púlpito da AD Madureira Atibaia"
      />
      <section className="border-b border-black/5 bg-white/90">
        <div className="ui-page-container py-5 md:py-6">
          <div className="ui-panel ui-panel-pad-sm">
            <p className="ui-section-eyebrow ui-section-eyebrow--gold">
              O que assistir agora
            </p>
            <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-3xl">
                <h2 className="font-acme text-xl tracking-wide text-[#212121] md:text-2xl">
                  Use esta área para transmissões e para o feed geral mais recente do canal
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[#5f5f5f] md:text-base">
                  Aqui você encontra o que está ao vivo e os vídeos mais novos já
                  publicados no canal. Quando quiser mensagens organizadas por
                  playlist e com espaço para metadados editoriais, siga para a
                  área de Mensagens. Para ver a rotina presencial da igreja, vá
                  para Programação.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="#videos" className="ui-btn-primary">
                  Abrir vídeos agora
                </Link>
                <Link href="/mensagens" className="ui-btn-secondary">
                  Explorar mensagens
                </Link>
                <Link href="/programacao" className="ui-btn-secondary">
                  Ver programação
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <article className="ui-panel-accent ui-panel-pad-sm h-full">
                <p className="text-[#ef5350] text-[11px] font-bold tracking-widest uppercase mb-2">
                  Ao vivo e recentes
                </p>
                <h3 className="font-acme text-lg tracking-wide text-[#212121] md:text-xl">
                  Quando quiser assistir agora
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#5f5f5f]">
                  Este hub é o melhor caminho para abrir a transmissão atual ou
                  escolher rapidamente os últimos cultos em vídeo.
                </p>
              </article>

              <article className="ui-panel-accent ui-panel-pad-sm h-full">
                <p className="text-[#ef5350] text-[11px] font-bold tracking-widest uppercase mb-2">
                  Mensagens
                </p>
                <h3 className="font-acme text-lg tracking-wide text-[#212121] md:text-xl">
                  Quando quiser ensino mais organizado
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#5f5f5f]">
                  A área de Mensagens acompanha a playlist curada de pregações
                  para separar o conteúdo geral do canal da biblioteca editorial
                  de ensinos.
                </p>
              </article>

              <article className="ui-panel-accent ui-panel-pad-sm h-full">
                <p className="text-[#ef5350] text-[11px] font-bold tracking-widest uppercase mb-2">
                  Programação
                </p>
                <h3 className="font-acme text-lg tracking-wide text-[#212121] md:text-xl">
                  Quando quiser participar presencialmente
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#5f5f5f]">
                  Se o objetivo for saber dia, horário e ritmo da vida da
                  igreja, a rota certa é Programação.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>
      <Videos showHeader={false} />
    </main>
  );
}
