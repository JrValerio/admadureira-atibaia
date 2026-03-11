import Image from "next/image";
import Link from "next/link";
import { ofertaData } from "@/data/oferta";
import { buildPageMetadata } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Oferta | AD Madureira Atibaia",
  description:
    "Contribua com a AD Madureira Atibaia por meio da chave PIX e dos dados bancários oficiais da igreja.",
  path: "/oferta",
  image: "/fachada-da-igreja.jpg",
  keywords: [
    "oferta igreja",
    "pix igreja",
    "contribuição ad madureira atibaia",
    "dizimos e ofertas",
  ],
});

export default function OfertaPage() {
  return (
    <main className="bg-[#f5f5f5] min-h-screen">
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="rounded-[2rem] overflow-hidden bg-[#212121] text-white border border-white/10 shadow-xl">
            <div className="px-6 py-14 md:px-10 md:py-18 text-center">
              <p className="text-[#ffa726] text-sm font-semibold tracking-widest uppercase mb-3">
                Contribuição
              </p>
              <h1 className="font-acme text-4xl md:text-5xl tracking-wide mb-5">
                Oferta e contribuição
              </h1>
              <p className="text-white/80 leading-relaxed max-w-2xl mx-auto">
                Sua contribuição ajuda na manutenção da obra de Deus, no apoio
                às atividades da igreja e no avanço do Evangelho por meio da AD
                Madureira Atibaia.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-8 mt-8">
            <div className="rounded-3xl bg-white border border-black/5 shadow-sm p-6 md:p-8 text-center">
              <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-3">
                PIX
              </p>
              <h2 className="font-acme text-3xl text-[#212121] tracking-wide mb-6">
                QR Code para contribuição
              </h2>

              <div className="inline-flex rounded-[2rem] bg-[#f8f8f8] border border-black/5 p-4 shadow-sm">
                <Image
                  src={ofertaData.pix.qrCodePath}
                  alt="QR Code PIX da AD Madureira Atibaia"
                  width={280}
                  height={280}
                  priority
                  className="rounded-2xl"
                />
              </div>

              <div className="mt-6">
                <p className="text-[#777] text-sm uppercase tracking-[0.18em] mb-2">
                  Chave PIX ({ofertaData.pix.tipo})
                </p>
                <p className="font-acme text-3xl text-[#ef5350] break-all">
                  {ofertaData.pix.chaveFormatada}
                </p>
                <p className="text-[#777] text-sm mt-3">
                  Se preferir, utilize a chave numérica{" "}
                  <span className="font-semibold text-[#212121]">
                    {ofertaData.pix.chave}
                  </span>
                  .
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <div className="rounded-3xl bg-white border border-black/5 shadow-sm p-6 md:p-8">
                <p className="text-[#ef5350] text-xs font-bold tracking-widest uppercase mb-3">
                  Dados bancários
                </p>
                <h2 className="font-acme text-3xl text-[#212121] tracking-wide mb-6">
                  Informações da conta
                </h2>

                <div className="space-y-5 text-left">
                  <div>
                    <p className="text-[#777] text-xs font-bold tracking-widest uppercase mb-2">
                      Favorecido
                    </p>
                    <p className="text-[#212121] leading-relaxed">
                      {ofertaData.favorecido[0]}
                      <br />
                      {ofertaData.favorecido[1]}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="rounded-2xl bg-[#f8f8f8] border border-black/5 p-4">
                      <p className="text-[#777] text-[11px] font-bold tracking-widest uppercase mb-2">
                        Banco
                      </p>
                      <p className="text-[#212121] font-semibold">
                        {ofertaData.banco.nome}
                      </p>
                    </div>
                    <div className="rounded-2xl bg-[#f8f8f8] border border-black/5 p-4">
                      <p className="text-[#777] text-[11px] font-bold tracking-widest uppercase mb-2">
                        Agência
                      </p>
                      <p className="text-[#212121] font-semibold">
                        {ofertaData.banco.agencia}
                      </p>
                    </div>
                    <div className="rounded-2xl bg-[#f8f8f8] border border-black/5 p-4">
                      <p className="text-[#777] text-[11px] font-bold tracking-widest uppercase mb-2">
                        Conta corrente
                      </p>
                      <p className="text-[#212121] font-semibold">
                        {ofertaData.banco.contaCorrente}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl bg-[#fff8ee] border border-[#ffa726]/20 p-6 md:p-8">
                <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-3">
                  Palavra e serviço
                </p>
                <p className="text-[#555] leading-relaxed mb-5">
                  Cada contribuição coopera com a manutenção do templo, o apoio
                  às atividades ministeriais e a continuidade do trabalho
                  evangelístico da igreja na cidade e na região.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/contato"
                    className="inline-flex items-center justify-center bg-[#ffa726] hover:bg-[#ffb74d] text-[#212121] font-bold text-xs tracking-widest uppercase px-6 py-3 rounded-full transition-colors"
                  >
                    Tirar dúvidas
                  </Link>
                  <Link
                    href="/"
                    className="inline-flex items-center justify-center border border-[#212121] text-[#212121] hover:bg-[#212121] hover:text-white font-bold text-xs tracking-widest uppercase px-6 py-3 rounded-full transition-colors"
                  >
                    Voltar para a home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
