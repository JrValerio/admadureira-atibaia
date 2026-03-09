import Image from "next/image";
import Link from "next/link";
import PastoresGrid from "@/components/PastoresGrid";
import { getPastores } from "@/data/pastores";

const valores = [
  {
    titulo: "Missão",
    texto: "Anunciar o evangelho de Jesus Cristo e formar discípulos comprometidos com a Palavra de Deus.",
  },
  {
    titulo: "Visão",
    texto: "Ser uma igreja relevante para a cidade de Atibaia, impactando vidas por meio do amor, da fé e do serviço cristão.",
  },
  {
    titulo: "Valores",
    texto: "Fé na Palavra de Deus, família, comunhão, evangelização e serviço ao próximo.",
  },
];

export default function Sobre() {
  const pastores = getPastores();

  return (
    <section id="sobre" className="py-24 bg-[#212121] text-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Foto do púlpito */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl h-80 md:h-full min-h-64">
            <Image
              src="/pulpito-da-igreja.jpg"
              alt="Púlpito da Igreja AD Madureira Atibaia"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-4 left-4">
              <p className="text-[#ffd54f] text-xs tracking-widest uppercase font-semibold">
                Fundada em 31 de janeiro de 1977
              </p>
            </div>
          </div>

          {/* Texto + cards */}
          <div>
            <p className="text-[#ffa726] text-sm font-semibold tracking-widest uppercase mb-2">
              Quem somos
            </p>
            <h2 className="font-acme text-3xl md:text-4xl mb-6 tracking-wide">
              Nossa Igreja
            </h2>
            <div className="w-16 h-1 bg-[#ffa726] mb-6" />
            <p className="text-white/75 text-base leading-relaxed mb-4">
              A Igreja Evangélica Assembleia de Deus Ministério Madureira –
              Campo de Atibaia é uma comunidade cristã comprometida com a
              pregação do evangelho de Jesus Cristo, com a edificação espiritual
              das famílias e com o serviço à sociedade.
            </p>
            <p className="text-white/75 text-base leading-relaxed mb-8">
              Somos parte do Ministério Madureira, um dos maiores movimentos
              pentecostais do Brasil, dedicado à evangelização, discipulado e
              ação social.
            </p>

            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 mb-8">
              <Link
                href="/historia"
                className="inline-flex items-center justify-center bg-[#ffa726] hover:bg-[#ffb74d] text-[#212121] font-bold text-xs tracking-widest uppercase px-6 py-3 rounded-full transition-colors"
              >
                Ver história da igreja
              </Link>
              <Link
                href="/congregacoes"
                className="inline-flex items-center justify-center border border-white/20 text-white hover:border-[#ffa726] hover:text-[#ffa726] font-bold text-xs tracking-widest uppercase px-6 py-3 rounded-full transition-colors"
              >
                Ver congregações
              </Link>
              <Link
                href="/ministerios"
                className="inline-flex items-center justify-center border border-white/20 text-white hover:border-[#ffa726] hover:text-[#ffa726] font-bold text-xs tracking-widest uppercase px-6 py-3 rounded-full transition-colors"
              >
                Ver ministérios
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {valores.map((item) => (
                <div
                  key={item.titulo}
                  className="border border-white/15 rounded-xl p-4 hover:border-[#ffa726] transition-colors"
                >
                  <h3 className="font-acme text-[#ffa726] text-xs tracking-widest uppercase mb-1">
                    {item.titulo}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {item.texto}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-20 pt-16 border-t border-white/10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="text-[#ffa726] text-sm font-semibold tracking-widest uppercase mb-2">
              Nossos Pastores
            </p>
            <h2 className="font-acme text-3xl md:text-4xl tracking-wide mb-4">
              Liderança Pastoral
            </h2>
            <p className="text-white/70 leading-relaxed">
              Conheça os pastores que servem o Campo de Atibaia com dedicação,
              cuidado pastoral e compromisso com a Palavra de Deus.
            </p>
          </div>

          <PastoresGrid pastores={pastores} theme="dark" />

          <div className="text-center mt-10">
            <Link
              href="/pastores"
              className="inline-flex items-center justify-center bg-[#ffa726] hover:bg-[#ffb74d] text-[#212121] font-bold text-xs tracking-widest uppercase px-6 py-3 rounded-full transition-colors"
            >
              Ver liderança completa
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
