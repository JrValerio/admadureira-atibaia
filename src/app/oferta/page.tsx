import Image from "next/image";
import Link from "next/link";
import CopyPixButton from "@/components/CopyPixButton";
import HeroPage from "@/components/HeroPage";
import { igrejaHeroMedia } from "@/data/igreja-media";
import { ofertaData } from "@/data/oferta";
import { buildPageMetadata, resolveSiteUrl } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Dízimos e Ofertas | AD Madureira Atibaia",
  description:
    "Contribua com a obra de Deus na AD Madureira Atibaia por meio de PIX, transferência bancária ou presencialmente nos cultos da igreja.",
  path: "/oferta",
  image: igrejaHeroMedia.oferta,
  keywords: [
    "oferta igreja",
    "pix igreja",
    "contribuição ad madureira atibaia",
    "dizimos e ofertas",
  ],
});

export default function OfertaPage() {
  const baseBiblica = [
    "Malaquias 3:10",
    "2 Coríntios 9:7",
    "Provérbios 3:9",
  ];

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(donationJsonLd),
        }}
      />
      <HeroPage
        variant="full"
        label="Contribuição"
        title="Dízimos e Ofertas"
        description="Contribua para a obra de Deus e participe da expansão do Evangelho por meio da Assembleia de Deus Ministério Madureira no Campo de Atibaia."
        image={igrejaHeroMedia.oferta}
        imageAlt="Fachada da AD Madureira Atibaia"
        imageClassName="object-[center_40%]"
      />
      <section className="py-16 md:py-20">
        <div className="ui-page-container ui-page-container--narrow">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="rounded-3xl bg-white border border-black/5 shadow-[0_6px_24px_rgba(0,0,0,0.04)] p-6 md:p-8">
              <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-3">
                Por que contribuímos
              </p>
              <h2 className="font-acme text-xl md:text-3xl text-[#212121] tracking-wide mb-5">
                Adoração que também sustenta a obra
              </h2>
              <div className="space-y-4 text-[#555] leading-relaxed">
                <p>
                  O dízimo e as ofertas fazem parte da vida de adoração do
                  cristão. Por meio da contribuição, reconhecemos que tudo vem
                  de Deus e cooperamos com a manutenção da igreja, a obra
                  missionária e o cuidado com pessoas.
                </p>
                <p>
                  Contribuir é uma expressão de fidelidade, gratidão e
                  participação prática na missão da igreja na cidade e na
                  região.
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                {baseBiblica.map((referencia) => (
                  <span
                    key={referencia}
                    className="inline-flex rounded-full border border-[#ffa726]/25 bg-[#fff8ee] px-4 py-2 text-xs font-semibold tracking-[0.16em] uppercase text-[#8b5b18]"
                  >
                    {referencia}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-[#fff8ee] border border-[#ffa726]/20 shadow-[0_6px_24px_rgba(0,0,0,0.04)] p-6 md:p-8">
              <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-3">
                Como sua contribuição ajuda
              </p>
              <h2 className="font-acme text-xl md:text-3xl text-[#212121] tracking-wide mb-5">
                Destinação da contribuição
              </h2>
              <p className="text-[#555] leading-relaxed mb-5">
                Sua contribuição coopera diretamente com a continuidade da obra
                de Deus e com as frentes ministeriais mantidas pela igreja.
              </p>
              <ul className="space-y-3 text-sm text-[#555]">
                {ofertaData.destinacao.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-[#ef5350]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 mb-6 text-center">
            <p className="text-[#ef5350] text-xs font-bold tracking-widest uppercase mb-3">
              Formas de contribuição
            </p>
            <h2 className="font-acme text-xl md:text-4xl text-[#212121] tracking-wide">
              Escolha a forma mais conveniente
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-[#666] leading-relaxed">
              Você pode contribuir via PIX, utilizar os dados bancários da igreja
              ou realizar sua contribuição presencialmente durante os cultos.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-8 mt-8">
            <div className="rounded-3xl bg-white border border-black/5 shadow-[0_6px_24px_rgba(0,0,0,0.04)] p-6 md:p-8 text-center">
              <p className="text-[#ffa726] text-xs font-bold tracking-widest uppercase mb-3">
                PIX
              </p>
              <h2 className="font-acme text-xl md:text-3xl text-[#212121] tracking-wide mb-6">
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
                <h2 className="font-acme text-xl md:text-3xl text-[#212121] tracking-wide mb-6">
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
                  Presencial e transparência
                </p>
                <h2 className="font-acme text-xl md:text-3xl text-[#212121] tracking-wide mb-5">
                  Outras formas de contribuir
                </h2>
                <div className="space-y-4 text-[#555] leading-relaxed">
                  <p>
                    Você também pode contribuir presencialmente durante os
                    cultos realizados na igreja, entregando sua oferta com
                    reverência e liberdade.
                  </p>
                  <p>
                    Todas as contribuições são destinadas à manutenção da obra,
                    ao apoio das atividades ministeriais e à administração da
                    igreja.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/contato"
                    className="ui-btn-primary"
                  >
                    Tirar dúvidas
                  </Link>
                  <Link
                    href="/"
                    className="ui-btn-secondary"
                  >
                    Voltar para a home
                  </Link>
                </div>
                <blockquote className="mt-6 rounded-2xl border border-[#ffa726]/20 bg-white/65 px-5 py-4 text-sm leading-relaxed text-[#555]">
                  <p>
                    &quot;Cada um contribua segundo propôs no coração, não com
                    tristeza ou por necessidade, porque Deus ama quem dá com
                    alegria.&quot;
                  </p>
                  <footer className="mt-2 text-[11px] font-semibold tracking-[0.16em] uppercase text-[#8b5b18]">
                    2 Coríntios 9:7
                  </footer>
                </blockquote>
                <p className="text-xs text-[#777] mt-5">
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
