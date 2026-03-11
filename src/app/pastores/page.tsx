import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { Pastor } from "@/data/pastores";
import { getPastoresByGrupo } from "@/data/pastores";
import { buildPageMetadata } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: "Nossos Pastores | AD Madureira Atibaia",
  description:
    "Conheça os pastores que lideram o Campo de Atibaia da Assembleia de Deus Ministério Madureira.",
  path: "/pastores",
});

function PastorEditorialCard({ pastor }: { pastor: Pastor }) {
  return (
    <Link
      href={`/pastores/${pastor.slug}`}
      className="group grid lg:grid-cols-[1.05fr_0.95fr] items-center bg-white rounded-3xl shadow-lg overflow-hidden border border-black/5 hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative h-[340px] sm:h-[420px] bg-[#111] overflow-hidden">
        <Image
          src={pastor.foto}
          alt={pastor.nome}
          fill
          sizes="(max-width: 1024px) 100vw, 40vw"
          className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/65 via-transparent to-transparent" />
      </div>

      <div className="p-6 md:p-10">
        <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-2">
          {pastor.cargo}
        </p>
        <h2 className="font-acme text-3xl md:text-4xl text-[#212121] tracking-wide leading-tight mb-4">
          {pastor.nome}
        </h2>
        <p className="text-[#555] leading-relaxed mb-6">{pastor.resumo}</p>
        <span className="inline-flex items-center text-[#ef5350] font-semibold text-sm tracking-wide uppercase group-hover:underline">
          Ler biografia completa →
        </span>
      </div>
    </Link>
  );
}

function PastorCompactCard({ pastor }: { pastor: Pastor }) {
  return (
    <Link
      href={`/pastores/${pastor.slug}`}
      className="group bg-white rounded-2xl overflow-hidden border border-black/5 hover:shadow-lg transition-shadow duration-200"
    >
      <div className="relative aspect-[4/5] bg-[#111] overflow-hidden">
        <Image
          src={pastor.foto}
          alt={pastor.nome}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-linear-to-t from-black/80 to-transparent" />
      </div>

      <div className="p-5">
        <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-2">
          {pastor.cargo}
        </p>
        <h3 className="font-acme text-xl text-[#212121] tracking-wide leading-tight mb-2">
          {pastor.nome}
        </h3>
        <p className="text-[#5f5f5f] text-sm leading-relaxed line-clamp-3">
          {pastor.resumo}
        </p>
      </div>
    </Link>
  );
}

export default function PastoresPage() {
  const presidencia = getPastoresByGrupo("presidencia");
  const vicePresidencia = getPastoresByGrupo("vice-presidencia");
  const versiculoInstitucional =
    presidencia.find((pastor) => pastor.versiculo)?.versiculo;

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
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {presidencia.map((pastor) => (
                  <PastorEditorialCard key={pastor.slug} pastor={pastor} />
                ))}
              </div>
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
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {vicePresidencia.map((pastor) => (
                  <PastorCompactCard key={pastor.slug} pastor={pastor} />
                ))}
              </div>
            </div>
          </div>

          {versiculoInstitucional && (
            <div className="mt-16 md:mt-20 text-center max-w-3xl mx-auto rounded-3xl bg-white border border-black/5 shadow-sm px-6 py-10">
              <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-3">
                Versículo que marca a liderança
              </p>
              <blockquote className="font-acme text-2xl md:text-3xl text-[#212121] leading-tight">
                “{versiculoInstitucional.texto}”
              </blockquote>
              <p className="text-[#777] text-sm mt-4">
                {versiculoInstitucional.referencia}
              </p>
            </div>
          )}

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
