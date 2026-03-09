import type { Metadata } from "next";
import Link from "next/link";
import PastoresGrid from "@/components/PastoresGrid";
import { getPastoresByGrupo } from "@/data/pastores";

export const metadata: Metadata = {
  title: "Nossos Pastores | AD Madureira Atibaia",
  description:
    "Conheça os pastores que lideram o Campo de Atibaia da Assembleia de Deus Ministério Madureira.",
};

export default function PastoresPage() {
  const presidencia = getPastoresByGrupo("presidencia");
  const vicePresidencia = getPastoresByGrupo("vice-presidencia");

  return (
    <main className="pt-[80px] bg-[#f5f5f5] min-h-screen">
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <p className="text-[#ffa726] text-sm font-semibold tracking-widest uppercase mb-2">
              Liderança Pastoral
            </p>
            <h1 className="font-acme text-4xl md:text-5xl text-[#212121] tracking-wide mb-4">
              Nossos Pastores
            </h1>
            <p className="text-[#5f5f5f] leading-relaxed">
              Conheça a liderança que serve a AD Madureira Atibaia com
              dedicação, cuidado pastoral e compromisso com a Palavra de Deus.
            </p>
          </div>

          <div className="space-y-14">
            <div>
              <div className="flex items-center justify-between gap-4 mb-8">
                <div>
                  <p className="text-[#ef5350] text-xs font-bold tracking-widest uppercase mb-2">
                    Campo de Atibaia
                  </p>
                  <h2 className="font-acme text-3xl text-[#212121] tracking-wide">
                    Presidência
                  </h2>
                </div>
              </div>
              <PastoresGrid pastores={presidencia} />
            </div>

            <div>
              <div className="flex items-center justify-between gap-4 mb-8">
                <div>
                  <p className="text-[#ef5350] text-xs font-bold tracking-widest uppercase mb-2">
                    Apoio Pastoral
                  </p>
                  <h2 className="font-acme text-3xl text-[#212121] tracking-wide">
                    Vice-Presidência
                  </h2>
                </div>
              </div>
              <PastoresGrid pastores={vicePresidencia} />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-14">
            <Link
              href="/sobre"
              className="inline-flex items-center justify-center border border-[#212121] text-[#212121] hover:bg-[#212121] hover:text-white font-bold text-xs tracking-widest uppercase px-6 py-3 rounded-full transition-colors"
            >
              Ver história da igreja
            </Link>
            <Link
              href="/contato"
              className="inline-flex items-center justify-center bg-[#ffa726] hover:bg-[#ffb74d] text-[#212121] font-bold text-xs tracking-widest uppercase px-6 py-3 rounded-full transition-colors"
            >
              Fale conosco
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

