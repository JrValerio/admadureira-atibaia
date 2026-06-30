import type { ReactNode } from "react";
import BibleReferenceText from "@/components/biblia/BibleReferenceText";
import {
  EbdSupportList,
  EbdSupportListPanel,
  EbdSupportListaPanel,
  EbdSupportPanel,
  EbdSupportSchedulePanel,
  EbdSupportSection,
  EbdSupportTextPanel,
  type EbdSupportLabelTone,
  type EbdSupportMarkerTone,
  type EbdSupportPanelTone,
} from "@/components/ebd/EbdLessonSupportUi";
import { formatEbdDate } from "@/lib/ebd-utils";
import type {
  ClasseEBD,
  LeituraDiariaItem,
  LeituraSemanalItem,
  LicaoEBD,
  ListaItem,
  ReferenciaCruzada,
  SubsidioAdultos,
  SubsidioJovens,
  TopicoConteudo,
  TopicoJovens,
} from "@/data/ebd";

type EbdTeacherSubsidyProps = {
  classe: ClasseEBD;
  licao: LicaoEBD;
};

type TextPanelConfig = {
  key: string;
  title: string;
  text?: string | null;
  tone?: EbdSupportPanelTone;
  labelTone?: EbdSupportLabelTone;
  textClassName?: string;
  className?: string;
};

type ListPanelConfig = {
  key: string;
  title: string;
  items?: string[] | null;
  tone?: EbdSupportPanelTone;
  labelTone?: EbdSupportLabelTone;
  markerTone?: EbdSupportMarkerTone;
  className?: string;
};

type ListaPanelConfig = {
  key: string;
  title: string;
  items?: ListaItem[] | null;
  tone?: EbdSupportPanelTone;
  labelTone?: EbdSupportLabelTone;
  markerTone?: EbdSupportMarkerTone;
  className?: string;
};

const SUPPORT_OVERVIEW_GRID_CLASS_NAME =
  "grid grid-cols-1 gap-6 xl:grid-cols-[1.05fr_0.95fr]";
const SUPPORT_TWO_COLUMN_GRID_CLASS = "grid grid-cols-1 gap-4 xl:grid-cols-2";

function renderTextPanels(panels: TextPanelConfig[]) {
  return panels.map((panel) => (
    <EbdSupportTextPanel
      key={panel.key}
      title={panel.title}
      text={panel.text}
      tone={panel.tone}
      labelTone={panel.labelTone}
      textClassName={panel.textClassName}
      className={panel.className}
    />
  ));
}

function renderListPanels(panels: ListPanelConfig[]) {
  return panels.map((panel) => (
    <EbdSupportListPanel
      key={panel.key}
      title={panel.title}
      items={panel.items}
      tone={panel.tone}
      labelTone={panel.labelTone}
      markerTone={panel.markerTone}
      className={panel.className}
    />
  ));
}

function renderListaPanels(panels: ListaPanelConfig[]) {
  return panels.map((panel) => (
    <EbdSupportListaPanel
      key={panel.key}
      title={panel.title}
      items={panel.items}
      tone={panel.tone}
      labelTone={panel.labelTone}
      markerTone={panel.markerTone}
      className={panel.className}
    />
  ));
}

function toDailyScheduleItems(items?: LeituraDiariaItem[]) {
  return (
    items?.map((item) => ({
      key: `${item.dia}-${item.referencia}`,
      day: item.dia,
      reference: item.referencia,
      note: item.tema,
    })) ?? []
  );
}

function toWeeklyScheduleItems(items?: LeituraSemanalItem[]) {
  return (
    items?.map((item) => ({
      key: `${item.dia}-${item.referencia}`,
      day: item.dia,
      reference: item.referencia,
      note: item.foco,
    })) ?? []
  );
}

function ReferenciaList({ items }: { items?: ReferenciaCruzada[] }) {
  if (!items?.length) {
    return null;
  }

  return (
    <ul className="space-y-3 text-[#555] leading-relaxed">
      {items.map((item) => (
        <li
          key={`${item.referencia}-${item.descricao ?? ""}`}
          className="flex items-start gap-3"
        >
          <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-[#ffa726]" />
          <span>
            <span className="font-semibold text-[#212121]">
              <BibleReferenceText
                text={item.referencia}
                linkClassName="font-semibold text-[#212121] underline decoration-[#ffa726]/60 underline-offset-4 transition-colors hover:text-[#8b1e1e]"
              />
            </span>
            {item.descricao ? ` — ${item.descricao}` : ""}
          </span>
        </li>
      ))}
    </ul>
  );
}

function TopicCardShell({
  title,
  synopsis,
  children,
}: {
  title: string;
  synopsis?: string;
  children: ReactNode;
}) {
  return (
    <article className="rounded-3xl border border-black/5 bg-white p-5 shadow-sm md:p-6">
      <h4 className="mb-3 font-acme text-2xl tracking-wide text-[#212121]">
        {title}
      </h4>
      {synopsis ? (
        <p className="mb-4 text-[#555] leading-relaxed">
          <BibleReferenceText text={synopsis} />
        </p>
      ) : null}
      <div className="space-y-5">{children}</div>
    </article>
  );
}

function TopicListBlock({
  title,
  items,
  labelTone = "accent",
  markerTone = "accent",
}: {
  title: string;
  items?: string[];
  labelTone?: EbdSupportLabelTone;
  markerTone?: EbdSupportMarkerTone;
}) {
  if (!items?.length) {
    return null;
  }

  const labelClassName =
    labelTone === "danger"
      ? "text-[#ef5350]"
      : labelTone === "earth"
        ? "text-[#8b5b18]"
        : "text-[#ffa726]";

  return (
    <div>
      <p
        className={`mb-3 text-xs font-bold tracking-widest uppercase ${labelClassName}`}
      >
        {title}
      </p>
      <EbdSupportList items={items} markerTone={markerTone} />
    </div>
  );
}

function AdultTopicoCard({ topico }: { topico: TopicoConteudo }) {
  return (
    <TopicCardShell title={topico.titulo} synopsis={topico.sinopse}>
      <TopicListBlock
        title="Explicação bíblica"
        items={topico.explicacaoBiblica}
        labelTone="accent"
        markerTone="accent"
      />
      <TopicListBlock
        title="Aprofundamento doutrinário"
        items={topico.aprofundamentoDoutrinario}
        labelTone="danger"
        markerTone="danger"
      />
      <TopicListBlock
        title="Aplicação prática"
        items={topico.aplicacaoPratica}
        labelTone="earth"
        markerTone="earth"
      />
      {topico.referenciasCruzadas?.length ? (
        <div>
          <p className="mb-3 text-xs font-bold tracking-widest uppercase text-[#ffa726]">
            Referências cruzadas
          </p>
          <ReferenciaList items={topico.referenciasCruzadas} />
        </div>
      ) : null}
    </TopicCardShell>
  );
}

function YoungTopicoCard({ topico }: { topico: TopicoJovens }) {
  return (
    <TopicCardShell title={topico.titulo} synopsis={topico.sinopse}>
      <TopicListBlock
        title="Desenvolvimento"
        items={topico.explicacaoBiblica}
        labelTone="accent"
        markerTone="accent"
      />
      <TopicListBlock
        title="Aplicação prática"
        items={topico.aplicacaoPratica}
        labelTone="earth"
        markerTone="earth"
      />
      <EbdSupportTextPanel
        title="Pense"
        text={topico.pense}
        tone="accent"
        labelTone="danger"
      />
      <EbdSupportTextPanel
        title="Ponto importante"
        text={topico.pontoImportante}
        tone="dark"
      />
    </TopicCardShell>
  );
}

function AdultSubsidy({ subsidio }: { subsidio: SubsidioAdultos }) {
  const dailySchedule = toDailyScheduleItems(subsidio.cabecalho.leituraDiaria);

  return (
    <div className="space-y-6">
      <EbdSupportSection eyebrow="Panorama da lição" title="Visão geral da aula">
        <div className={SUPPORT_OVERVIEW_GRID_CLASS_NAME}>
          <div>
            <p className="mb-4 text-[#555] leading-relaxed">
              <BibleReferenceText text={subsidio.visaoGeral.resumo} />
            </p>
            <EbdSupportTextPanel
              title="Ideia central"
              text={subsidio.visaoGeral.ideiaCentral}
              labelTone="danger"
            />
          </div>

          <div className="space-y-4">
            <EbdSupportListPanel
              title="Objetivos"
              items={subsidio.visaoGeral.objetivos}
              markerTone="accent"
            />
            {subsidio.visaoGeral.palavraChave ? (
              <EbdSupportPanel title="Palavra-chave" labelTone="danger">
                <p className="font-semibold text-[#212121]">
                  {subsidio.visaoGeral.palavraChave.termo}
                </p>
                {subsidio.visaoGeral.palavraChave.definicao ? (
                  <p className="mt-2 text-sm leading-relaxed text-[#555]">
                    <BibleReferenceText
                      text={subsidio.visaoGeral.palavraChave.definicao}
                    />
                  </p>
                ) : null}
              </EbdSupportPanel>
            ) : null}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {renderTextPanels([
            {
              key: "texto-aureo",
              title: "Texto áureo",
              text: subsidio.cabecalho.textoAureo ?? "A confirmar",
              textClassName: "text-sm",
            },
            {
              key: "trimestre",
              title: "Trimestre",
              text: subsidio.cabecalho.trimestre,
              textClassName: "text-sm",
            },
            {
              key: "comentarista",
              title: "Comentarista",
              text: subsidio.cabecalho.comentarista ?? "A confirmar",
              textClassName: "text-sm",
            },
          ])}
        </div>

        <div className="mt-6 space-y-6">
          <EbdSupportListPanel
            title="Leitura bíblica em classe"
            items={subsidio.cabecalho.leituraBiblicaEmClasse}
            labelTone="danger"
          />
          <EbdSupportSchedulePanel
            title="Leitura diária"
            items={dailySchedule}
            labelTone="danger"
          />
          <EbdSupportListPanel
            title="Hinos sugeridos"
            items={subsidio.cabecalho.hinosSugeridos}
            labelTone="danger"
          />
        </div>
      </EbdSupportSection>

      <EbdSupportSection eyebrow="Desenvolvimento" title="Comentário por tópicos">
        <div className="space-y-4">
          {subsidio.desenvolvimento.map((topico) => (
            <AdultTopicoCard key={topico.id} topico={topico} />
          ))}
        </div>
      </EbdSupportSection>

      <EbdSupportSection eyebrow="Condução da aula" title="Apoio ao professor">
        <div className={SUPPORT_TWO_COLUMN_GRID_CLASS}>
          <div className="space-y-4">
            {renderTextPanels([
              {
                key: "pergunta-abertura",
                title: "Pergunta de abertura",
                text: subsidio.apoioProfessor.perguntaDeAbertura,
              },
              {
                key: "ponto-sensivel",
                title: "Ponto sensível da aula",
                text: subsidio.apoioProfessor.pontoSensivelDaAula,
              },
              {
                key: "erro-comum",
                title: "Erro comum de interpretação",
                text: subsidio.apoioProfessor.erroComumDeInterpretacao,
              },
            ])}
          </div>

          <div className="space-y-4">
            {renderListPanels([
              {
                key: "perguntas-debate",
                title: "Perguntas para debate",
                items: subsidio.apoioProfessor.perguntasParaDebate,
                labelTone: "danger",
              },
            ])}
            <EbdSupportTextPanel
              title="Sugestão de fechamento"
              text={subsidio.apoioProfessor.sugestaoDeFechamento}
              tone="dark"
            />
          </div>
        </div>
      </EbdSupportSection>

      {subsidio.aprofundamento ? (
        <EbdSupportSection eyebrow="Aprofundamento" title="Doutrina e contexto">
          <div className={SUPPORT_TWO_COLUMN_GRID_CLASS}>
            {renderListPanels([
              {
                key: "contexto-historico",
                title: "Contexto histórico",
                items: subsidio.aprofundamento.contextoHistorico,
                markerTone: "accent",
              },
              {
                key: "conceito-teologico",
                title: "Conceito teológico",
                items: subsidio.aprofundamento.conceitoTeologico,
                markerTone: "accent",
              },
            ])}
            {renderListaPanels([
              {
                key: "nota-vocabulario",
                title: "Nota de vocabulário",
                items: subsidio.aprofundamento.notaDeVocabulario,
                labelTone: "danger",
              },
              {
                key: "leituras-complementares",
                title: "Leituras complementares",
                items: subsidio.aprofundamento.leituraComplementar,
                labelTone: "danger",
              },
            ])}
          </div>
        </EbdSupportSection>
      ) : null}

      {subsidio.vidaCrista ? (
        <EbdSupportSection eyebrow="Vida cristã" title="Aplicação pastoral">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {renderListPanels([
              {
                key: "o-que-confronta",
                title: "O que confronta",
                items: subsidio.vidaCrista.oQueConfronta,
                markerTone: "accent",
              },
              {
                key: "o-que-consola",
                title: "O que consola",
                items: subsidio.vidaCrista.oQueConsola,
                markerTone: "accent",
              },
              {
                key: "o-que-exige",
                title: "O que exige",
                items: subsidio.vidaCrista.oQueExige,
                labelTone: "danger",
                markerTone: "danger",
              },
              {
                key: "o-que-revela",
                title: "O que revela sobre Deus",
                items: subsidio.vidaCrista.oQueRevelaSobreDeus,
                labelTone: "danger",
                markerTone: "danger",
              },
            ])}
          </div>
        </EbdSupportSection>
      ) : null}

      {subsidio.revisao ? (
        <EbdSupportSection eyebrow="Revisão" title="Fixação da lição">
          <div className={SUPPORT_TWO_COLUMN_GRID_CLASS}>
            {renderListPanels([
              {
                key: "perguntas",
                title: "Perguntas",
                items: subsidio.revisao.perguntas,
                markerTone: "accent",
              },
              {
                key: "pontos-chave",
                title: "Pontos-chave",
                items: subsidio.revisao.pontosChave,
                labelTone: "danger",
                markerTone: "danger",
              },
            ])}
          </div>
          <EbdSupportTextPanel
            title="Frase de síntese"
            text={subsidio.revisao.fraseDeSintese}
            tone="dark"
            className="mt-4"
          />
        </EbdSupportSection>
      ) : null}
    </div>
  );
}

function YoungSubsidy({ subsidio }: { subsidio: SubsidioJovens }) {
  const weeklySchedule = toWeeklyScheduleItems(subsidio.cabecalho.leituraSemanal);

  return (
    <div className="space-y-6">
      <EbdSupportSection eyebrow="Panorama da lição" title="Arranque pedagógico">
        <div className={SUPPORT_OVERVIEW_GRID_CLASS_NAME}>
          <div className="space-y-4">
            {renderTextPanels([
              {
                key: "texto-principal",
                title: "Texto principal",
                text: subsidio.cabecalho.textoPrincipal ?? "A confirmar",
                textClassName: "text-sm",
              },
              {
                key: "resumo-da-licao",
                title: "Resumo da lição",
                text: subsidio.cabecalho.resumoDaLicao,
                textClassName: "text-sm",
              },
              {
                key: "trimestre",
                title: "Trimestre",
                text: subsidio.cabecalho.trimestre,
                textClassName: "text-sm",
              },
            ])}
          </div>

          <div className="space-y-4">
            {renderListPanels([
              {
                key: "objetivos",
                title: "Objetivos",
                items: subsidio.arranquePedagogico.objetivos,
                labelTone: "danger",
                markerTone: "danger",
              },
            ])}
            <EbdSupportTextPanel
              title="Interação"
              text={subsidio.arranquePedagogico.interacao}
              labelTone="danger"
              textClassName="text-sm"
            />
          </div>
        </div>

        <div className="mt-6 space-y-6">
          <EbdSupportTextPanel
            title="Orientação pedagógica"
            text={subsidio.arranquePedagogico.orientacaoPedagogica}
            tone="dark"
          />
          <EbdSupportSchedulePanel
            title="Leitura semanal"
            items={weeklySchedule}
            labelTone="danger"
          />
        </div>
      </EbdSupportSection>

      <EbdSupportSection eyebrow="Desenvolvimento" title="Tópicos da lição">
        <div className="space-y-4">
          {subsidio.desenvolvimento.map((topico) => (
            <YoungTopicoCard key={topico.id} topico={topico} />
          ))}
        </div>
      </EbdSupportSection>

      <EbdSupportSection eyebrow="Condução da aula" title="Apoio ao professor">
        <div className={SUPPORT_TWO_COLUMN_GRID_CLASS}>
          <div className="space-y-4">
            {renderTextPanels([
              {
                key: "quebra-gelo",
                title: "Quebra-gelo",
                text: subsidio.apoioProfessor.quebraGelo,
              },
              {
                key: "pergunta-chave",
                title: "Pergunta-chave",
                text: subsidio.apoioProfessor.perguntaChave,
              },
              {
                key: "dificuldade-provavel",
                title: "Dificuldade provável",
                text: subsidio.apoioProfessor.dificuldadeProvavelDaClasse,
              },
            ])}
          </div>

          <div className="space-y-4">
            {renderListPanels([
              {
                key: "conducao-da-conversa",
                title: "Condução da conversa",
                items: subsidio.apoioProfessor.conducaoDaConversa,
                labelTone: "danger",
                markerTone: "danger",
              },
            ])}
            <EbdSupportTextPanel
              title="Fechamento"
              text={subsidio.apoioProfessor.fechamento}
              tone="dark"
            />
          </div>
        </div>
      </EbdSupportSection>

      {subsidio.aprofundamentoOpcional ? (
        <EbdSupportSection eyebrow="Aprofundamento" title="Notas para ampliar a lição">
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
            {renderListPanels([
              {
                key: "nota-doutrinaria",
                title: "Nota doutrinária",
                items: subsidio.aprofundamentoOpcional.notaDoutrinariaCurta,
                markerTone: "accent",
              },
              {
                key: "contexto-biblico",
                title: "Contexto bíblico",
                items: subsidio.aprofundamentoOpcional.contextoBiblico,
                labelTone: "danger",
                markerTone: "danger",
              },
              {
                key: "conexao-vida-crista",
                title: "Conexão com a vida cristã",
                items: subsidio.aprofundamentoOpcional.conexaoComVidaCrista,
                labelTone: "earth",
                markerTone: "earth",
              },
            ])}
          </div>
        </EbdSupportSection>
      ) : null}

      {subsidio.revisao ? (
        <EbdSupportSection eyebrow="Revisão" title="Fixação da aula">
          <div className={SUPPORT_TWO_COLUMN_GRID_CLASS}>
            {renderListPanels([
              {
                key: "hora-da-revisao",
                title: "Hora da revisão",
                items: subsidio.revisao.horaDaRevisao,
                markerTone: "accent",
              },
              {
                key: "quiz-curto",
                title: "Quiz curto",
                items: subsidio.revisao.quizCurto,
                labelTone: "danger",
                markerTone: "danger",
              },
            ])}
          </div>
          <EbdSupportTextPanel
            title="Conclusão"
            text={subsidio.revisao.conclusao}
            tone="dark"
            className="mt-4"
          />
        </EbdSupportSection>
      ) : null}
    </div>
  );
}

export default function EbdTeacherSubsidy({
  classe,
  licao,
}: EbdTeacherSubsidyProps) {
  const tituloDaSecao =
    classe === "adultos"
      ? "Subsídio do professor"
      : classe === "jovens"
        ? "Roteiro do professor"
        : null;
  const subtitulo =
    classe === "adultos"
      ? "Base doutrinária, condução pedagógica e revisão para aprofundar a preparação da aula."
      : classe === "jovens"
        ? "Uma camada expandida com arranque pedagógico, condução de conversa e revisão da lição."
        : null;
  const subsidio =
    classe === "adultos"
      ? licao.subsidioAdultos
      : classe === "jovens"
        ? licao.subsidioJovens
        : null;

  if (!tituloDaSecao || !subsidio) {
    return null;
  }

  return (
    <section
      id="subsidio-do-professor"
      className="scroll-mt-28 rounded-3xl border border-black/5 bg-white p-6 shadow-sm md:p-8"
    >
      <details className="group">
        <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="mb-3 text-xs font-bold tracking-widest uppercase text-[#ef5350]">
                {tituloDaSecao}
              </p>
              <h2 className="mb-3 font-acme text-xl tracking-wide text-[#212121] md:text-3xl lg:text-4xl">
                {licao.titulo}
              </h2>
              <p className="max-w-3xl text-[#555] leading-relaxed">
                {subtitulo} Lição {licao.numero} • {formatEbdDate(licao.data)}.
              </p>
            </div>
            <span
              aria-hidden="true"
              className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-black/10 text-[#555] transition-transform duration-200 group-open:rotate-180"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3 5.5L8 10.5L13 5.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
        </summary>
        <div className="mt-8">
          {classe === "adultos" ? (
            <AdultSubsidy subsidio={subsidio as SubsidioAdultos} />
          ) : (
            <YoungSubsidy subsidio={subsidio as SubsidioJovens} />
          )}
        </div>
      </details>
    </section>
  );
}
