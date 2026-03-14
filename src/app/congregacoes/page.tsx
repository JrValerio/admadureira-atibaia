import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import HeroPage from "@/components/HeroPage";
import { getCongregacoes } from "@/data/congregacoes";
import { igrejaHeroMedia } from "@/data/igreja-media";
import { buildPageMetadata } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: "Congregações do Campo | AD Madureira Atibaia",
  description:
    "Conheça as congregações ligadas ao Campo de Atibaia da Assembleia de Deus Ministério Madureira.",
  path: "/congregacoes",
});

export default function CongregacoesPage() {
  const congregacoes = getCongregacoes();
  const cidades = new Set(congregacoes.map((item) => item.cidade));
  const liderancas = congregacoes.reduce(
    (total, item) => total + item.lideranca.length,
    0
  );

  return (
    <main className="bg-[#f5f5f5] min-h-screen">
      <HeroPage
        variant="full"
        label="Campo de Atibaia"
        title="Congregações do Campo"
        description="O Campo de Atibaia da Assembleia de Deus Ministério Madureira reúne congregações comprometidas com a pregação do Evangelho, o cuidado das famílias e o fortalecimento da vida cristã na região."
        image={igrejaHeroMedia.congregacoes}
        imageAlt="Fachada da AD Madureira Atibaia"
      />

      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            <div className="rounded-3xl bg-white border border-black/5 p-6 shadow-[0_6px_24px_rgba(0,0,0,0.04)]">
              <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-2">
                Congregações mapeadas
              </p>
              <p className="font-acme text-4xl text-[#212121]">
                {congregacoes.length}
              </p>
            </div>
            <div className="rounded-3xl bg-white border border-black/5 p-6 shadow-[0_6px_24px_rgba(0,0,0,0.04)]">
              <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-2">
                Cidades cadastradas
              </p>
              <p className="font-acme text-4xl text-[#212121]">
                {cidades.size}
              </p>
            </div>
            <div className="rounded-3xl bg-white border border-black/5 p-6 shadow-[0_6px_24px_rgba(0,0,0,0.04)]">
              <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-2">
                Lideranças destacadas
              </p>
              <p className="font-acme text-4xl text-[#212121]">
                {liderancas}
              </p>
            </div>
          </div>

          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="text-[#ef5350] text-xs font-bold tracking-widest uppercase mb-3">
              Estrutura em expansão
            </p>
            <p className="text-[#5f5f5f] leading-relaxed">
              Esta página já nasce com a sede do campo e a estrutura pronta para
              receber as demais congregações. Conforme os dados locais forem
              consolidados, novas unidades poderão ser adicionadas sem alterar a
              arquitetura do site.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {congregacoes.map((congregacao) => (
              <Link
                key={congregacao.slug}
                href={`/congregacoes/${congregacao.slug}`}
                className="group rounded-3xl overflow-hidden bg-white border border-black/5 shadow-[0_6px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.07)] transition-shadow"
              >
                <div className="relative aspect-[16/9] bg-[#111] overflow-hidden">
                  <Image
                    src={congregacao.imagem}
                    alt={congregacao.igreja}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />
                </div>

                <div className="p-6">
                  <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-2">
                    {congregacao.cidade}
                  </p>
                  <h2 className="font-acme text-2xl text-[#212121] tracking-wide mb-3">
                    {congregacao.igreja}
                  </h2>
                  <p className="text-[#5f5f5f] leading-relaxed mb-4">
                    {congregacao.resumo}
                  </p>
                  <p className="text-[#777] text-sm mb-1">
                    Pastor responsável: {congregacao.pastor}
                  </p>
                  <p className="text-[#777] text-sm">{congregacao.endereco}</p>
                  <p className="text-[#ef5350] text-xs font-semibold tracking-widest uppercase mt-5">
                    Ver congregação →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
