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
  const statusLabel = hasStream ? "Ao vivo agora" : radioConfig.statusLabel;
  const statusClassName = hasStream
    ? "border-emerald-500/20 bg-emerald-50 text-emerald-700"
    : "border-[#ffa726]/20 bg-[#fff8ee] text-[#8b5b18]";

  return (
    <>
      <HeroPage
        variant="full"
        label="Áudio da igreja"
        title="Rádio"
        description="Uma página preparada para reunir transmissões da igreja, períodos de louvor, mensagens em áudio e programação espiritual ao longo da semana."
        image={igrejaHeroMedia.radio}
        imageAlt="Interior da AD Madureira Atibaia preparado para transmissões em áudio"
        imageClassName="object-[center_38%]"
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
              <div className="mb-5 flex flex-wrap items-center gap-3">
                <span className="text-[#ffa726] text-xs font-bold tracking-widest uppercase">
                  Transmissão
                </span>
                <span
                  className={`inline-flex rounded-full border px-3 py-1 text-[10px] font-bold tracking-[0.16em] uppercase ${statusClassName}`.trim()}
                >
                  {statusLabel}
                </span>
              </div>
              <h2 className="font-acme text-3xl md:text-4xl text-[#212121] tracking-wide mb-5">
                Rádio da igreja em construção
              </h2>
              <p className="text-[#555] leading-relaxed mb-4">
                {radioConfig.resumo}
              </p>
              <p className="text-[#777] text-sm leading-relaxed mb-6">
                A proposta é que esta página se torne o ponto oficial para ouvir
                a transmissão da igreja, acompanhar blocos de programação e
                encontrar rapidamente conteúdos de áudio ligados à rotina
                espiritual da comunidade.
              </p>

              {hasStream ? (
                <div className="rounded-3xl border border-emerald-500/15 bg-emerald-50/60 p-5">
                  <p className="mb-3 text-[11px] font-bold tracking-[0.18em] uppercase text-emerald-700">
                    Transmissão ao vivo
                  </p>
                  <audio controls className="w-full">
                    <source src={radioConfig.streamUrl} type="audio/mpeg" />
                  </audio>
                </div>
              ) : (
                <div className="rounded-3xl bg-[#fff8ee] border border-[#ffa726]/20 p-6">
                  <p className="mb-3 text-[11px] font-bold tracking-[0.18em] uppercase text-[#8b5b18]">
                    Player em implantação
                  </p>
                  <p className="text-[#555] leading-relaxed">
                    O streaming ainda não foi configurado. Assim que a rádio for
                    ativada, o player ao vivo ficará disponível nesta página.
                  </p>
                  <p className="mt-4 text-sm text-[#777] leading-relaxed">
                    {radioConfig.streamHostLabel}
                  </p>
                </div>
              )}

              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/contato" className="ui-btn-primary">
                  Receber avisos
                </Link>
                <Link
                  href="/espiritualidade/podcast"
                  className="ui-btn-secondary"
                >
                  Ver podcast
                </Link>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-3xl bg-[#fff8ee] border border-[#ffa726]/20 p-6 shadow-sm">
                <p className="text-[#ef5350] text-xs font-bold tracking-widest uppercase mb-3">
                  Como vai funcionar
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
                  Faixas previstas
                </p>
                <div className="space-y-4">
                  {radioConfig.faixas.map((faixa) => (
                    <div key={faixa.titulo}>
                      <p className="text-sm font-semibold tracking-wide text-[#212121]">
                        {faixa.titulo}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-[#555]">
                        {faixa.descricao}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl bg-white border border-black/5 p-6 shadow-sm">
                <p className="text-[#ef5350] text-xs font-bold tracking-widest uppercase mb-3">
                  Próximo passo
                </p>
                <ul className="space-y-3 text-sm text-[#555] leading-relaxed mb-5">
                  {radioConfig.proximosPassos.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-[#ef5350]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/contato" className="ui-btn-primary">
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
