import Image from "next/image";
import Link from "next/link";
import CopyPixButton from "@/components/CopyPixButton";
import HeroPage from "@/components/HeroPage";
import { ofertaData } from "@/data/oferta";
import { buildPageMetadata, resolveSiteUrl } from "@/lib/site";

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
  const donationJsonLd = {
    "@context": "https://schema.org",
    "@type": "DonateAction",
    name: "Contribuir com a AD Madureira Atibaia",
    description:
      "Página oficial de contribuição da AD Madureira Atibaia com chave PIX e dados bancários da igreja.",
    target: resolveSiteUrl("/oferta"),
    recipient: {
      "@type": "Organization",
      name: ofertaData.instituicao.nome,
      alternateName: "AD Madureira Atibaia",
      identifier: ofertaData.instituicao.cnpj,
    },
  };

  return (
    <main className="bg-[#f5f5f5] min-h-screen">
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(donationJsonLd),
            }}
          />

          <HeroPage
            label="Contribuição"
            title="Oferta e contribuição"
            description="Sua contribuição ajuda na manutenção da obra de Deus, no apoio às atividades da igreja e no avanço do Evangelho por meio da AD Madureira Atibaia."
            image="/fachada-da-igreja.jpg"
            imageAlt="Fachada da AD Madureira Atibaia"
            imageClassName="object-[center_34%]"
            className="mb-8 border border-white/10 shadow-[0_10px_32px_rgba(0,0,0,0.08)]"
          />

          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-8 mt-8">
            <div className="rounded-3xl bg-white border border-black/5 shadow-[0_6px_24px_rgba(0,0,0,0.04)] p-6 md:p-8 text-center">
              <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-3">
                PIX
              </p>
              <h2 className="font-acme text-3xl text-[#212121] tracking-wide mb-6">
                QR Code para contribuição
              </h2>

              <div className="inline-flex rounded-[2rem] bg-[#f8f8f8] border border-black/5 p-4 shadow-[0_6px_24px_rgba(0,0,0,0.04)]">
                <Image
                  src={ofertaData.pix.qrCodePath}
                  alt="QR Code PIX da AD Madureira Atibaia"
                  width={240}
                  height={240}
                  priority
                  className="rounded-2xl"
                />
              </div>
              <p className="text-[#777] text-sm mt-4">
                Escaneie com o aplicativo do seu banco para contribuir com
                segurança.
              </p>
              <p className="text-xs text-[#999] mt-1">
                Verifique se o recebedor é{" "}
                <span className="font-semibold text-[#555]">
                  Assembleia de Deus Madureira - Campo de Atibaia
                </span>
                .
              </p>

              <div className="mt-6">
                <p className="text-[#777] text-sm uppercase tracking-[0.18em] mb-2">
                  Chave PIX ({ofertaData.pix.tipo})
                </p>
                <p className="font-acme text-2xl text-[#ef5350] break-all">
                  {ofertaData.pix.chaveFormatada}
                </p>
                <p className="text-[#777] text-sm mt-3">
                  Se preferir, utilize a chave numérica{" "}
                  <span className="font-semibold text-[#212121]">
                    {ofertaData.pix.chave}
                  </span>
                  .
                </p>
                <CopyPixButton
                  value={ofertaData.pix.chave}
                  label="Copiar chave Pix"
                />
              </div>

              <div className="mt-6 rounded-2xl bg-[#f8f8f8] border border-black/5 p-5 text-left">
                <p className="text-[#777] text-xs font-bold tracking-widest uppercase mb-2">
                  Pix Copia e Cola
                </p>
                <p className="text-[#555] text-sm leading-relaxed mb-4">
                  Se preferir, copie o código completo e cole no campo de Pix do
                  aplicativo do seu banco.
                </p>
                <div className="rounded-xl border border-black/5 bg-white px-4 py-3 text-xs leading-relaxed text-[#555] break-all">
                  {ofertaData.pix.copiaECola}
                </div>
                <CopyPixButton
                  value={ofertaData.pix.copiaECola}
                  label="Copiar Pix Copia e Cola"
                  successLabel="Código copiado"
                  helperText="Use o código completo na opção Pix Copia e Cola do seu banco."
                />
              </div>

              <div className="mt-8 rounded-2xl bg-[#f8f8f8] border border-black/5 p-5 text-left">
                <p className="text-[#777] text-xs font-bold tracking-widest uppercase mb-2">
                  Destinatário
                </p>
                <p className="text-[#212121] font-semibold leading-relaxed">
                  {ofertaData.instituicao.nome}
                </p>
                <p className="text-[#555] mt-1">
                  {ofertaData.instituicao.complemento}
                </p>
                <hr className="my-4 border-black/5" />
                <p className="text-[#777] text-xs mt-3">
                  CNPJ: {ofertaData.instituicao.cnpj}
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <div className="rounded-3xl bg-white border border-black/5 shadow-[0_6px_24px_rgba(0,0,0,0.04)] p-6 md:p-8">
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
                <div className="max-w-xl text-sm text-[#555] mb-6">
                  <p className="text-[#777] text-xs font-bold tracking-widest uppercase mb-3">
                    Como sua contribuição ajuda
                  </p>
                  <ul className="space-y-2">
                    {ofertaData.destinacao.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-[#ef5350]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
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
                <p className="text-xs text-[#777] mt-6">
                  {ofertaData.segurancaMensagem}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
