import BibleReferenceText from "@/components/biblia/BibleReferenceText";
import type {
  ClasseEBDInfo,
  LicaoEBD,
  ListaItem,
  TopicoConteudo,
  TopicoJovens,
  TrimestreEBD,
} from "@/data/ebd";
import { getEbdPrintRoute } from "@/lib/ebd-print";
import { EbdPrintDocumentLayout, EbdPrintPage } from "./EbdPrintLayout";

type EbdPrintDocumentProps = {
  classeInfo: ClasseEBDInfo;
  trimestre: TrimestreEBD;
  licao: LicaoEBD;
};

type PrintableBlock =
  | { type: "text"; label: string; text: string }
  | { type: "list"; label: string; items: string[]; accent?: "orange" | "red" | "dark" }
  | { type: "items"; label: string; items: ListaItem[] };

type PrintableSection = {
  key: string;
  eyebrow: string;
  title: string;
  blocks: PrintableBlock[];
};

function PrintBibleText({ text }: { text: string }) {
  return (
    <BibleReferenceText
      text={text}
      renderLinks={false}
      linkClassName="font-medium text-[#212121]"
    />
  );
}

function textBlock(label: string, text?: string | null) {
  return text ? ({ type: "text", label, text } satisfies PrintableBlock) : null;
}

function listBlock(
  label: string,
  items?: string[] | null,
  accent: "orange" | "red" | "dark" = "orange"
) {
  return items?.length
    ? ({ type: "list", label, items, accent } satisfies PrintableBlock)
    : null;
}

function itemsBlock(label: string, items?: ListaItem[] | null) {
  return items?.length
    ? ({ type: "items", label, items } satisfies PrintableBlock)
    : null;
}

function limitStrings(items: string[] | undefined, max: number) {
  return items?.slice(0, max) ?? [];
}

function limitListaItems(items: ListaItem[] | undefined, max: number) {
  return items?.slice(0, max) ?? [];
}

function topicosToListaItems(licao: LicaoEBD) {
  return licao.topicos.map((topico) => ({
    titulo: topico.titulo,
    conteudo:
      topico.conteudo[0] ??
      "Desenvolva este tópico em aula com base bíblica e aplicação prática.",
  }));
}

function renderBlock(block: PrintableBlock) {
  if (block.type === "text") {
    return (
      <div
        key={`${block.label}-${block.text}`}
        className="rounded-2xl border border-black/10 bg-white px-4 py-3"
      >
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8b5b18]">
          {block.label}
        </p>
        <p className="mt-2 text-[13px] leading-relaxed text-[#444]">
          <PrintBibleText text={block.text} />
        </p>
      </div>
    );
  }

  if (block.type === "items") {
    return (
      <div key={block.label}>
        <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#ef5350]">
          {block.label}
        </p>
        <div className="space-y-3">
          {block.items.map((item) => (
            <div
              key={`${item.titulo ?? "item"}-${item.conteudo}`}
              className="rounded-2xl border border-black/10 bg-white px-4 py-3"
            >
              {item.titulo ? (
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8b5b18]">
                  {item.titulo}
                </p>
              ) : null}
              <p className="mt-2 text-[13px] leading-relaxed text-[#444]">
                <PrintBibleText text={item.conteudo} />
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const markerClassName =
    block.accent === "red"
      ? "bg-[#ef5350]"
      : block.accent === "dark"
        ? "bg-[#8b5b18]"
        : "bg-[#ffa726]";

  return (
    <div key={`${block.label}-${block.items.join("|")}`}>
      <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#ef5350]">
        {block.label}
      </p>
      <ul className="space-y-2.5">
        {block.items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-[13px] leading-relaxed text-[#444]">
            <span className={`mt-[7px] h-1.5 w-1.5 rounded-full ${markerClassName}`} />
            <span>
              <PrintBibleText text={item} />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function RenderSection({ section }: { section: PrintableSection }) {
  return (
    <section className="ebd-print-no-break rounded-[1.5rem] border border-black/10 bg-[#fcfbf8] p-5">
      <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#ef5350]">
        {section.eyebrow}
      </p>
      <h3 className="mt-2 font-acme text-[1.45rem] tracking-wide text-[#212121]">
        {section.title}
      </h3>
      <div className="mt-4 space-y-4">{section.blocks.map(renderBlock)}</div>
    </section>
  );
}

function chunkSections<T>(items: T[], size: number) {
  const pages: T[][] = [];

  for (let index = 0; index < items.length; index += size) {
    pages.push(items.slice(index, index + size));
  }

  return pages;
}

function getSummarySections(classeInfo: ClasseEBDInfo, licao: LicaoEBD): PrintableSection[] {
  const summaryHighlights =
    classeInfo.slug === "adultos" && licao.subsidioAdultos
      ? [
          licao.subsidioAdultos.visaoGeral.ideiaCentral
            ? {
                titulo: "Ideia central",
                conteudo: licao.subsidioAdultos.visaoGeral.ideiaCentral,
              }
            : null,
          licao.subsidioAdultos.visaoGeral.palavraChave
            ? {
                titulo: `Palavra-chave · ${licao.subsidioAdultos.visaoGeral.palavraChave.termo}`,
                conteudo:
                  licao.subsidioAdultos.visaoGeral.palavraChave.definicao ??
                  "Termo central da lição.",
              }
            : null,
          ...licao.subsidioAdultos.desenvolvimento.slice(0, 2).map((topico) =>
            ({
              titulo: topico.titulo,
              conteudo:
                topico.sinopse ??
                topico.explicacaoBiblica?.[0] ??
                topico.aplicacaoPratica?.[0] ??
                "Desenvolva este tópico com apoio bíblico e aplicação prática.",
            })
          ),
        ]
      : classeInfo.slug === "jovens" && licao.subsidioJovens
        ? [
            licao.subsidioJovens.cabecalho.resumoDaLicao
              ? {
                  titulo: "Resumo da lição",
                  conteudo: licao.subsidioJovens.cabecalho.resumoDaLicao,
                }
              : null,
            licao.subsidioJovens.arranquePedagogico.orientacaoPedagogica
              ? {
                  titulo: "Orientação pedagógica",
                  conteudo:
                    licao.subsidioJovens.arranquePedagogico.orientacaoPedagogica,
                }
              : null,
            ...licao.subsidioJovens.desenvolvimento.slice(0, 2).map((topico) =>
              ({
                titulo: topico.titulo,
                conteudo:
                  topico.pontoImportante ??
                  topico.pense ??
                  topico.sinopse ??
                  topico.explicacaoBiblica?.[0] ??
                  "Leve a classe a relacionar o tema com decisões reais da semana.",
              })
            ),
          ]
        : [];

  const revisionHighlights =
    classeInfo.slug === "adultos"
      ? [
          ...limitStrings(licao.subsidioAdultos?.revisao?.pontosChave, 3),
          ...limitStrings(licao.subsidioAdultos?.revisao?.perguntas, 2),
        ].slice(0, 4)
      : [
          ...limitStrings(licao.subsidioJovens?.revisao?.horaDaRevisao, 2),
          ...limitStrings(licao.subsidioJovens?.revisao?.quizCurto, 2),
        ].slice(0, 4);

  return [
    {
      key: "base",
      eyebrow: "Panorama",
      title: "Base da lição",
      blocks: [
        textBlock(classeInfo.textoBaseLabel, licao.textoChave),
        textBlock(classeInfo.resumoDestaqueLabel, licao.verdadePratica ?? licao.resumo),
        textBlock("Resumo", licao.resumo),
        textBlock("Aplicação prática", licao.aplicacao),
      ].filter(Boolean) as PrintableBlock[],
    },
    {
      key: "planejamento",
      eyebrow: "Planejamento",
      title: "Leitura e objetivos",
      blocks: [
        listBlock("Leitura bíblica", limitStrings(licao.leituraBiblica, 3), "orange"),
        listBlock("Objetivos", limitStrings(licao.objetivos, 4), "red"),
      ].filter(Boolean) as PrintableBlock[],
    },
    {
      key: "esboco",
      eyebrow: "Condução",
      title: "Esboço e tópicos centrais",
      blocks: [
        itemsBlock(
          "Esboço da aula",
          licao.esboco?.length
            ? limitListaItems(licao.esboco, 4)
            : limitListaItems(topicosToListaItems(licao), 3)
        ),
        itemsBlock("Tópicos centrais", limitListaItems(topicosToListaItems(licao), 3)),
      ].filter(Boolean) as PrintableBlock[],
    },
    {
      key: "apoio",
      eyebrow: "Fechamento",
      title: "Subsídio em foco e revisão",
      blocks: [
        itemsBlock(
          "Destaques do subsídio",
          summaryHighlights.filter(Boolean) as ListaItem[]
        ),
        listBlock("Pontos de apoio ao professor", limitStrings(licao.apoioProfessor, 4), "red"),
        listBlock("Revisão rápida", revisionHighlights, "orange"),
        listBlock("Para reforçar durante a semana", limitStrings(licao.apoioAluno, 3), "dark"),
      ].filter(Boolean) as PrintableBlock[],
    },
  ];
}

function adultTopicoSection(topico: TopicoConteudo): PrintableSection {
  return {
    key: `adult-topico-${topico.id}`,
    eyebrow: "Desenvolvimento",
    title: topico.titulo,
    blocks: [
      textBlock("Sinopse", topico.sinopse),
      listBlock("Explicação bíblica", topico.explicacaoBiblica, "orange"),
      listBlock("Aprofundamento doutrinário", topico.aprofundamentoDoutrinario, "red"),
      listBlock("Aplicação prática", topico.aplicacaoPratica, "dark"),
      itemsBlock(
        "Referências cruzadas",
        topico.referenciasCruzadas?.map((item) => ({
          titulo: item.referencia,
          conteudo: item.descricao ?? "Referência de apoio à aula.",
        }))
      ),
    ].filter(Boolean) as PrintableBlock[],
  };
}

function youngTopicoSection(topico: TopicoJovens): PrintableSection {
  return {
    key: `young-topico-${topico.id}`,
    eyebrow: "Desenvolvimento",
    title: topico.titulo,
    blocks: [
      textBlock("Sinopse", topico.sinopse),
      listBlock("Desenvolvimento", topico.explicacaoBiblica, "orange"),
      listBlock("Aplicação prática", topico.aplicacaoPratica, "dark"),
      textBlock("Pense", topico.pense),
      textBlock("Ponto importante", topico.pontoImportante),
    ].filter(Boolean) as PrintableBlock[],
  };
}

function getFullSections(classeInfo: ClasseEBDInfo, licao: LicaoEBD): PrintableSection[] {
  const baseSections: PrintableSection[] = [
    {
      key: "base-licao",
      eyebrow: "Base da lição",
      title: "Resumo, leitura e aplicação",
      blocks: [
        textBlock(classeInfo.textoBaseLabel, licao.textoChave),
        textBlock(classeInfo.resumoDestaqueLabel, licao.verdadePratica ?? licao.resumo),
        textBlock("Resumo da lição", licao.resumo),
        listBlock("Leitura bíblica", licao.leituraBiblica, "orange"),
        listBlock("Objetivos", licao.objetivos, "red"),
        textBlock("Aplicação prática", licao.aplicacao),
      ].filter(Boolean) as PrintableBlock[],
    },
    {
      key: "planejamento-aula",
      eyebrow: "Planejamento",
      title: "Esboço, tópicos e apoios",
      blocks: [
        itemsBlock("Esboço da aula", licao.esboco),
        itemsBlock("Tópicos centrais", topicosToListaItems(licao)),
        listBlock("Apoio ao professor", licao.apoioProfessor, "red"),
        listBlock("Apoio ao aluno", licao.apoioAluno, "dark"),
      ].filter(Boolean) as PrintableBlock[],
    },
  ];

  if (classeInfo.slug === "adultos" && licao.subsidioAdultos) {
    const subsidio = licao.subsidioAdultos;

    return [
      ...baseSections,
      {
        key: "adult-panorama",
        eyebrow: "Subsídio do professor",
        title: "Panorama da lição",
        blocks: [
          textBlock("Texto áureo", subsidio.cabecalho.textoAureo),
          textBlock("Resumo expandido", subsidio.visaoGeral.resumo),
          textBlock("Ideia central", subsidio.visaoGeral.ideiaCentral),
          subsidio.visaoGeral.palavraChave
            ? textBlock(
                `Palavra-chave · ${subsidio.visaoGeral.palavraChave.termo}`,
                subsidio.visaoGeral.palavraChave.definicao
              )
            : null,
          listBlock("Objetivos", subsidio.visaoGeral.objetivos, "orange"),
          itemsBlock(
            "Leitura diária",
            subsidio.cabecalho.leituraDiaria?.map((item) => ({
              titulo: `${item.dia} · ${item.referencia}`,
              conteudo: item.tema ?? "Leitura de apoio à aula.",
            }))
          ),
        ].filter(Boolean) as PrintableBlock[],
      },
      ...subsidio.desenvolvimento.map(adultTopicoSection),
      {
        key: "adult-apoio",
        eyebrow: "Condução da aula",
        title: "Apoio ao professor",
        blocks: [
          textBlock("Pergunta de abertura", subsidio.apoioProfessor.perguntaDeAbertura),
          textBlock("Ponto sensível da aula", subsidio.apoioProfessor.pontoSensivelDaAula),
          textBlock(
            "Erro comum de interpretação",
            subsidio.apoioProfessor.erroComumDeInterpretacao
          ),
          listBlock(
            "Perguntas para debate",
            subsidio.apoioProfessor.perguntasParaDebate,
            "red"
          ),
          textBlock(
            "Sugestão de fechamento",
            subsidio.apoioProfessor.sugestaoDeFechamento
          ),
        ].filter(Boolean) as PrintableBlock[],
      },
      {
        key: "adult-aprofundamento",
        eyebrow: "Aprofundamento",
        title: "Doutrina, vida cristã e revisão",
        blocks: [
          listBlock("Contexto histórico", subsidio.aprofundamento?.contextoHistorico, "orange"),
          listBlock("Conceito teológico", subsidio.aprofundamento?.conceitoTeologico, "red"),
          itemsBlock("Nota de vocabulário", subsidio.aprofundamento?.notaDeVocabulario),
          itemsBlock(
            "Leituras complementares",
            subsidio.aprofundamento?.leituraComplementar
          ),
          listBlock("O que confronta", subsidio.vidaCrista?.oQueConfronta, "orange"),
          listBlock("O que consola", subsidio.vidaCrista?.oQueConsola, "orange"),
          listBlock("O que exige", subsidio.vidaCrista?.oQueExige, "red"),
          listBlock(
            "O que revela sobre Deus",
            subsidio.vidaCrista?.oQueRevelaSobreDeus,
            "red"
          ),
          listBlock("Perguntas", subsidio.revisao?.perguntas, "orange"),
          listBlock("Pontos-chave", subsidio.revisao?.pontosChave, "red"),
          textBlock("Frase de síntese", subsidio.revisao?.fraseDeSintese),
        ].filter(Boolean) as PrintableBlock[],
      },
    ];
  }

  if (classeInfo.slug === "jovens" && licao.subsidioJovens) {
    const subsidio = licao.subsidioJovens;

    return [
      ...baseSections,
      {
        key: "young-arranque",
        eyebrow: "Roteiro do professor",
        title: "Arranque pedagógico",
        blocks: [
          textBlock("Texto principal", subsidio.cabecalho.textoPrincipal),
          textBlock("Resumo da lição", subsidio.cabecalho.resumoDaLicao),
          listBlock("Objetivos", subsidio.arranquePedagogico.objetivos, "orange"),
          textBlock("Interação", subsidio.arranquePedagogico.interacao),
          textBlock(
            "Orientação pedagógica",
            subsidio.arranquePedagogico.orientacaoPedagogica
          ),
          itemsBlock(
            "Leitura semanal",
            subsidio.cabecalho.leituraSemanal?.map((item) => ({
              titulo: `${item.dia} · ${item.referencia}`,
              conteudo: item.foco ?? "Leitura de apoio à aula.",
            }))
          ),
        ].filter(Boolean) as PrintableBlock[],
      },
      ...subsidio.desenvolvimento.map(youngTopicoSection),
      {
        key: "young-apoio",
        eyebrow: "Condução da aula",
        title: "Apoio ao professor",
        blocks: [
          textBlock("Quebra-gelo", subsidio.apoioProfessor.quebraGelo),
          textBlock("Pergunta-chave", subsidio.apoioProfessor.perguntaChave),
          textBlock(
            "Dificuldade provável da classe",
            subsidio.apoioProfessor.dificuldadeProvavelDaClasse
          ),
          listBlock(
            "Condução da conversa",
            subsidio.apoioProfessor.conducaoDaConversa,
            "red"
          ),
          textBlock("Fechamento", subsidio.apoioProfessor.fechamento),
        ].filter(Boolean) as PrintableBlock[],
      },
      {
        key: "young-revisao",
        eyebrow: "Aprofundamento",
        title: "Notas finais e revisão",
        blocks: [
          listBlock(
            "Nota doutrinária",
            subsidio.aprofundamentoOpcional?.notaDoutrinariaCurta,
            "orange"
          ),
          listBlock(
            "Contexto bíblico",
            subsidio.aprofundamentoOpcional?.contextoBiblico,
            "red"
          ),
          listBlock(
            "Conexão com a vida cristã",
            subsidio.aprofundamentoOpcional?.conexaoComVidaCrista,
            "dark"
          ),
          listBlock("Hora da revisão", subsidio.revisao?.horaDaRevisao, "orange"),
          listBlock("Quiz curto", subsidio.revisao?.quizCurto, "red"),
          textBlock("Conclusão", subsidio.revisao?.conclusao),
        ].filter(Boolean) as PrintableBlock[],
      },
    ];
  }

  return baseSections;
}

function buildFullPages(classeInfo: ClasseEBDInfo, licao: LicaoEBD) {
  const sections = getFullSections(classeInfo, licao);
  const pages = [
    ...chunkSections(sections.slice(0, 2), 2),
    ...chunkSections(sections.slice(2, 4), 2),
    ...sections.slice(4).map((section) => [section]),
  ];

  return pages.filter((page) => page.length > 0);
}

export function EbdLessonSummaryPrintDocument({
  classeInfo,
  trimestre,
  licao,
}: EbdPrintDocumentProps) {
  const backHref = `/ebd/${classeInfo.slug}/${trimestre.slug}/${licao.slug}`;
  const pages = chunkSections(getSummarySections(classeInfo, licao), 2);

  return (
    <EbdPrintDocumentLayout
      title={`Resumo da lição ${licao.numero}`}
      subtitle="Versão enxuta para aula e impressão rápida, pensada para caber idealmente em duas páginas."
      backHref={backHref}
      alternateHref={getEbdPrintRoute(
        classeInfo.slug,
        trimestre.slug,
        licao.slug,
        "pdf-completo"
      )}
      alternateLabel="Abrir subsídio completo"
    >
      {pages.map((sections, index) => (
        <EbdPrintPage
          key={`summary-page-${index + 1}`}
          modeLabel="Resumo em até 2 páginas"
          classeInfo={classeInfo}
          trimestreLabel={trimestre.rotulo}
          licao={licao}
          pageNumber={index + 1}
          pageCount={pages.length}
        >
          {sections.map((section) => (
            <RenderSection key={section.key} section={section} />
          ))}
        </EbdPrintPage>
      ))}
    </EbdPrintDocumentLayout>
  );
}

export function EbdLessonFullPrintDocument({
  classeInfo,
  trimestre,
  licao,
}: EbdPrintDocumentProps) {
  const backHref = `/ebd/${classeInfo.slug}/${trimestre.slug}/${licao.slug}`;
  const pages = buildFullPages(classeInfo, licao);

  return (
    <EbdPrintDocumentLayout
      title={`Subsídio completo · Lição ${licao.numero}`}
      subtitle="Versão completa com a estrutura expandida da aula, pronta para impressão e arquivo do professor."
      backHref={backHref}
      alternateHref={getEbdPrintRoute(
        classeInfo.slug,
        trimestre.slug,
        licao.slug,
        "pdf-resumo"
      )}
      alternateLabel="Abrir resumo em 2 páginas"
    >
      {pages.map((sections, index) => (
        <EbdPrintPage
          key={`full-page-${index + 1}`}
          modeLabel="Subsídio completo"
          classeInfo={classeInfo}
          trimestreLabel={trimestre.rotulo}
          licao={licao}
          pageNumber={index + 1}
          pageCount={pages.length}
        >
          {sections.map((section) => (
            <RenderSection key={section.key} section={section} />
          ))}
        </EbdPrintPage>
      ))}
    </EbdPrintDocumentLayout>
  );
}
