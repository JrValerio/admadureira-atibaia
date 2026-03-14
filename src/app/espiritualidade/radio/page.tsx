import Link from "next/link";
import HeroPage from "@/components/HeroPage";
import { igrejaHeroMedia } from "@/data/igreja-media";
import SpiritualBreadcrumb from "@/components/SpiritualBreadcrumb";
import { radioConfig } from "@/data/espiritualidade";
import { buildPageMetadata } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Rádio | AD Madureira Atibaia",
  description:
    "Acompanhe a estrutura da futura rádio da AD Madureira Atibaia com transmissão cristã, louvores e mensagens em áudio.",
  path: "/espiritualidade/radio",
  image: igrejaHeroMedia.radio,
});

export default function RadioPage() {
  const hasStream = radioConfig.streamUrl.length > 0;

  return (
    <>
      <HeroPage
        variant="full"
        label="Áudio da igreja"
        title="Rádio"
        description="Uma base pronta para transmissões cristãs, períodos de louvor, mensagens e conteúdo contínuo da AD Madureira Atibaia."
        image={igrejaHeroMedia.radio}
        imageAlt="Fachada da AD Madureira Atibaia"
      />

      <section className="py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-4">
          <SpiritualBreadcrumb
            items={[
              { label: "Espiritualidade", href: "/espiritualidade" },
              { label: "Rádio" },
            ]}
          />
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8">
            <div className="rounded-3xl bg-white border border-black/5 p-6 md:p-8 shadow-sm">
              <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-3">
                Transmissão
              </p>
              <h2 className="font-acme text-3xl md:text-4xl text-[#212121] tracking-wide mb-5">
                Rádio da igreja em implantação
              </h2>
              <p className="text-[#555] leading-relaxed mb-6">
                Esta página já está preparada para receber o link oficial de
                streaming da rádio da igreja e concentrar a distribuição de áudio
                espiritual em um só lugar.
              </p>

              {hasStream ? (
                <audio controls className="w-full">
                  <source src={radioConfig.streamUrl} type="audio/mpeg" />
                </audio>
              ) : (
                <div className="rounded-3xl bg-[#fff8ee] border border-[#ffa726]/20 p-6 text-[#555] leading-relaxed">
                  O streaming ainda não foi configurado. Assim que a rádio for
                  ativada, o player ao vivo ficará disponível nesta página.
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="rounded-3xl bg-[#fff8ee] border border-[#ffa726]/20 p-6 shadow-sm">
                <p className="text-[#ef5350] text-xs font-bold tracking-widest uppercase mb-3">
                  Estrutura prevista
                </p>
                <ul className="space-y-3 text-sm text-[#555] leading-relaxed">
                  {radioConfig.horarios.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-[#ef5350]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl bg-white border border-black/5 p-6 shadow-sm">
                <p className="text-[#ef5350] text-xs font-bold tracking-widest uppercase mb-3">
                  Próximo passo
                </p>
                <p className="text-sm text-[#555] leading-relaxed mb-4">
                  Assim que o link oficial de streaming estiver disponível, esta
                  página já está pronta para receber o player ao vivo.
                </p>
                <Link
                  href="/contato"
                  className="inline-flex items-center justify-center rounded-full bg-[#ffa726] px-5 py-3 text-xs font-bold tracking-widest uppercase text-[#212121] transition-colors hover:bg-[#ffb74d]"
                >
                  Falar com a igreja
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
