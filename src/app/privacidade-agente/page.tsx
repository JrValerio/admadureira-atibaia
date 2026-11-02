import type { Metadata } from "next";
import Link from "next/link";
import {
  CHURCH_FIELD_NAME,
  CHURCH_OFFICIAL_NAME,
  SEDE_CONTACT,
  SEDE_WHATSAPP_URL,
} from "@/data/site";
import { buildPageMetadata } from "@/lib/site";

// Política exigida pelo Google para o app OAuth do agente que conduz as lives
// do canal da igreja. É ferramenta interna: a página existe para a tela de
// consentimento do Google, não para os visitantes, por isso fica fora do
// sitemap e não é indexada.
export const metadata: Metadata = {
  ...buildPageMetadata({
    title: "Privacidade do Agente de Transmissão | AD Madureira Atibaia",
    description:
      "Como o Agente de Transmissão, ferramenta interna da equipe de mídia da AD Madureira Atibaia, usa os dados do YouTube para programar e conduzir as lives do canal da igreja.",
    path: "/privacidade-agente",
  }),
  robots: { index: false, follow: true },
};

const ATUALIZADA_EM = "2 de novembro de 2026";

const linkClassName =
  "text-[#212121] underline decoration-black/20 underline-offset-4 transition-colors hover:text-[#8b1e1e]";

function Secao({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="font-acme text-lg tracking-wide text-[#212121] md:text-xl">{titulo}</h2>
      <div className="space-y-3 text-sm leading-7 text-[#555] md:text-base">{children}</div>
    </section>
  );
}

export default function PrivacidadeAgentePage() {
  return (
    <main className="bg-[#f5f5f5] min-h-screen">
      <section className="py-12 md:py-16">
        <div className="ui-page-container ui-page-container--narrow">
          <nav
            aria-label="Breadcrumb"
            className="mb-8 flex flex-wrap items-center gap-2 text-sm text-[#777]"
          >
            <Link href="/" className="hover:underline">
              Início
            </Link>
            <span>›</span>
            <span className="font-medium text-[#212121]">Privacidade do Agente de Transmissão</span>
          </nav>

          <header className="mb-8">
            <p className="ui-section-eyebrow">Ferramenta interna da equipe de mídia</p>
            <h1 className="font-acme text-2xl tracking-wide text-[#212121] md:text-4xl">
              Política de Privacidade do Agente de Transmissão
            </h1>
            <p className="mt-3 text-sm text-[#777]">
              {CHURCH_OFFICIAL_NAME} · {CHURCH_FIELD_NAME} · Atualizada em {ATUALIZADA_EM}
            </p>
          </header>

          <article className="ui-panel ui-panel-pad-lg space-y-8">
            <Secao titulo="O que é o agente">
              <p>
                O Agente de Transmissão é uma ferramenta interna da equipe de mídia da igreja. Ele
                roda somente no computador da igreja e serve para programar e conduzir as
                transmissões ao vivo do canal oficial da igreja no YouTube. Não é oferecido ao
                público e não coleta dados de visitantes deste site.
              </p>
            </Secao>

            <Secao titulo="Dados do Google que o agente usa">
              <p>
                Com a autorização da conta responsável pelo canal da igreja, o agente usa os
                Serviços de API do YouTube apenas para:
              </p>
              <ul className="list-disc space-y-2 pl-5">
                <li>ler o nome e o identificador do canal;</li>
                <li>
                  criar, programar e encerrar as transmissões ao vivo do canal (título, descrição,
                  data, horário e privacidade) e enviar a imagem de capa de cada uma;
                </li>
                <li>
                  consultar as transmissões do canal para ligar cada live à chave de transmissão
                  configurada no OBS.
                </li>
              </ul>
              <p>
                O agente não lê comentários, mensagens do chat, inscritos nem dados de quem assiste
                às transmissões.
              </p>
            </Secao>

            <Secao titulo="Como os dados são guardados">
              <p>
                A autorização concedida ao agente fica somente no computador da igreja, cifrada pela
                proteção de dados do Windows. A chave de transmissão é conferida no próprio
                computador e não é gravada pelo agente nem enviada a terceiros.
              </p>
              <p>
                O título, o horário e o link de cada live programada ficam num arquivo local do
                agente, usado para mostrar os links à equipe de mídia. Lives com mais de 30 dias saem
                dessa lista.
              </p>
            </Secao>

            <Secao titulo="Compartilhamento">
              <p>
                Nenhum dado é vendido, cedido a terceiros ou usado para publicidade. Os dados do
                YouTube trafegam apenas entre o computador da igreja e os serviços do Google.
              </p>
            </Secao>

            <Secao titulo="Como revogar o acesso">
              <p>
                O botão “Desconectar YouTube”, no painel do agente, apaga a autorização do
                computador. O acesso também pode ser removido a qualquer momento em{" "}
                <a
                  href="https://myaccount.google.com/permissions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClassName}
                >
                  myaccount.google.com/permissions
                </a>
                .
              </p>
            </Secao>

            <Secao titulo="YouTube e Google">
              <p>
                O agente usa os Serviços de API do YouTube. Ao autorizá-lo, você concorda com os{" "}
                <a
                  href="https://www.youtube.com/t/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClassName}
                >
                  Termos de Serviço do YouTube
                </a>
                . Os dados tratados pelo Google seguem a{" "}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClassName}
                >
                  Política de Privacidade do Google
                </a>
                .
              </p>
              <p>
                O uso das informações recebidas das APIs do Google segue a{" "}
                <a
                  href="https://developers.google.com/terms/api-services-user-data-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClassName}
                >
                  Política de Dados do Usuário dos Serviços de API do Google
                </a>
                , incluindo os requisitos de Uso Limitado.
              </p>
            </Secao>

            <Secao titulo="Contato">
              <p>
                Dúvidas sobre esta política podem ser enviadas pela{" "}
                <Link href="/contato" className={linkClassName}>
                  página de contato
                </Link>{" "}
                ou pelo{" "}
                <a
                  href={SEDE_WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClassName}
                >
                  WhatsApp {SEDE_CONTACT.whatsappDisplay}
                </a>
                .
              </p>
            </Secao>
          </article>
        </div>
      </section>
    </main>
  );
}
