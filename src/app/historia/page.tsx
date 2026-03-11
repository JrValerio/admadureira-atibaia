import type { Metadata } from "next";
import Link from "next/link";
import HeroPage from "@/components/HeroPage";
import { getCongregacoes } from "@/data/congregacoes";
import { marcosHistoricos, historiaEncerramento, historiaIntroducao } from "@/data/historia";
import { getPastoresByGrupo } from "@/data/pastores";
import { buildPageMetadata } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: "História da Igreja | AD Madureira Atibaia",
  description:
    "Conheça a trajetória da Igreja Assembleia de Deus Ministério Madureira no Campo de Atibaia e os marcos que marcaram sua história.",
  path: "/historia",
});

export default function HistoriaPage() {
  const presidencia = getPastoresByGrupo("presidencia");
  const congregacoes = getCongregacoes();

  return (
    <main className="bg-[#f5f5f5] min-h-screen">
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <HeroPage
            label="Campo de Atibaia"
            title="História da Igreja"
            description="Conheça a trajetória da Igreja Assembleia de Deus Ministério Madureira no Campo de Atibaia e como Deus tem conduzido esta obra ao longo dos anos."
            image="/fachada-da-igreja.jpg"
            imageAlt="Fachada da AD Madureira Atibaia"
            imageClassName="object-[center_34%]"
            className="mb-12"
          />

          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-8 items-start mb-14">
            <div className="rounded-3xl bg-white border border-black/5 shadow-[0_6px_24px_rgba(0,0,0,0.04)] p-6 md:p-8">
              <p className="text-[#ef5350] text-xs font-bold tracking-widest uppercase mb-3">
                Nossa trajetória
              </p>
              <div className="space-y-4 text-[#555] leading-relaxed">
                {historiaIntroducao.map((paragrafo) => (
                  <p key={paragrafo}>{paragrafo}</p>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-[#fff8ee] border border-[#ffa726]/20 p-6 md:p-8">
              <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-3">
                Marcos institucionais
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <p className="font-acme text-4xl text-[#212121]">1977</p>
                  <p className="text-[#555] text-sm mt-1">Ano da fundação</p>
                </div>
                <div>
                  <p className="font-acme text-4xl text-[#212121]">2004</p>
                  <p className="text-[#555] text-sm mt-1">
                    Início da presidência atual
                  </p>
                </div>
                <div>
                  <p className="font-acme text-4xl text-[#212121]">
                    {congregacoes.length}
                  </p>
                  <p className="text-[#555] text-sm mt-1">
                    Congregações mapeadas
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] bg-white border border-black/5 shadow-[0_6px_24px_rgba(0,0,0,0.04)] p-6 md:p-10">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <p className="text-[#ffa726] text-sm font-semibold tracking-widest uppercase mb-2">
                Linha do tempo
              </p>
              <h2 className="font-acme text-3xl md:text-4xl text-[#212121] tracking-wide mb-4">
                Marcos da caminhada da igreja
              </h2>
              <p className="text-[#5f5f5f] leading-relaxed">
                Uma trajetória construída com oração, serviço cristão e
                compromisso com a proclamação do Evangelho.
              </p>
            </div>

            <div className="relative">
              <div className="absolute left-[11px] top-0 bottom-0 w-px bg-[#ffa726]/25 md:left-1/2" />
              <div className="space-y-10">
                {marcosHistoricos.map((marco, index) => {
                  const invertido = index % 2 === 1;

                  return (
                    <div
                      key={`${marco.periodo}-${marco.titulo}`}
                      className="relative grid grid-cols-[24px_1fr] md:grid-cols-2 md:gap-10 items-start"
                    >
                      <div
                        className={`hidden md:block ${
                          invertido ? "order-2" : ""
                        }`}
                      />
                      <div
                        className={`relative ${
                          invertido ? "md:order-1" : "md:order-2"
                        }`}
                      >
                        <div className="absolute left-[-37px] top-3 w-6 h-6 rounded-full border-4 border-white bg-[#ffa726] shadow-sm md:left-auto md:right-auto md:translate-x-[-50%] md:left-0" />
                        <div className="rounded-3xl border border-black/5 bg-[#f9f9f9] p-6 md:p-7 shadow-[0_6px_24px_rgba(0,0,0,0.04)]">
                          <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-2">
                            {marco.periodo}
                          </p>
                          <h3 className="font-acme text-2xl text-[#212121] tracking-wide mb-3">
                            {marco.titulo}
                          </h3>
                          <p className="text-[#555] leading-relaxed">
                            {marco.descricao}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-14">
            <div className="rounded-3xl bg-[#212121] text-white p-6 md:p-8">
              <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-3">
                Liderança pastoral
              </p>
              <h2 className="font-acme text-3xl tracking-wide mb-4">
                Pastores que servem o campo
              </h2>
              <p className="text-white/75 leading-relaxed mb-6">
                A liderança pastoral tem sido fundamental para o desenvolvimento
                da igreja. Pastores e obreiros dedicam suas vidas ao serviço de
                Deus e ao cuidado espiritual da comunidade.
              </p>
              <div className="space-y-3 mb-6">
                {presidencia.map((pastor) => (
                  <div
                    key={pastor.slug}
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                  >
                    <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-1">
                      {pastor.cargo}
                    </p>
                    <p className="text-white">{pastor.nome}</p>
                  </div>
                ))}
              </div>
              <Link
                href="/pastores"
                className="inline-flex items-center justify-center bg-[#ffa726] hover:bg-[#ffb74d] text-[#212121] font-bold text-xs tracking-widest uppercase px-6 py-3 rounded-full transition-colors"
              >
                Conheça nossos pastores
              </Link>
            </div>

            <div className="space-y-8">
              <div className="rounded-3xl bg-white border border-black/5 shadow-[0_6px_24px_rgba(0,0,0,0.04)] p-6 md:p-8">
                <p className="text-[#ef5350] text-xs font-bold tracking-widest uppercase mb-3">
                  Expansão do campo
                </p>
                <h2 className="font-acme text-3xl text-[#212121] tracking-wide mb-4">
                  Uma obra que alcança a região
                </h2>
                <p className="text-[#555] leading-relaxed mb-6">
                  Hoje o Campo de Atibaia reúne congregações comprometidas com a
                  proclamação do Evangelho e com o fortalecimento da fé cristã em
                  diferentes cidades da região.
                </p>
                <div className="rounded-2xl bg-[#fff8ee] border border-[#ffa726]/20 p-5 mb-6">
                  <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-2">
                    Congregação em destaque
                  </p>
                  <p className="font-acme text-2xl text-[#212121] mb-2">
                    {congregacoes[0]?.igreja}
                  </p>
                  <p className="text-[#555] text-sm">
                    {congregacoes[0]?.endereco}
                  </p>
                </div>
                <Link
                  href="/congregacoes"
                  className="inline-flex items-center justify-center border border-[#ef5350] text-[#ef5350] hover:bg-[#ef5350] hover:text-white font-bold text-xs tracking-widest uppercase px-6 py-3 rounded-full transition-colors"
                >
                  Ver congregações
                </Link>
              </div>

              <div className="rounded-3xl bg-white border border-black/5 shadow-[0_6px_24px_rgba(0,0,0,0.04)] p-6 md:p-8">
                <p className="text-[#ef5350] text-xs font-bold tracking-widest uppercase mb-3">
                  Vida da igreja
                </p>
                <h2 className="font-acme text-3xl text-[#212121] tracking-wide mb-4">
                  Ministérios que servem a comunidade
                </h2>
                <p className="text-[#555] leading-relaxed mb-6">
                  A história da igreja também é contada por meio dos ministérios
                  que acolhem, discipulam, adoram e servem diferentes gerações da
                  comunidade cristã.
                </p>
                <Link
                  href="/ministerios"
                  className="inline-flex items-center justify-center bg-[#ffa726] hover:bg-[#ffb74d] text-[#212121] font-bold text-xs tracking-widest uppercase px-6 py-3 rounded-full transition-colors"
                >
                  Conheça os ministérios
                </Link>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-[#212121] text-white p-8 md:p-10 text-center mt-14">
            <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-3">
              Uma história que continua
            </p>
            <p className="text-white/80 leading-relaxed max-w-3xl mx-auto">
              {historiaEncerramento}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
