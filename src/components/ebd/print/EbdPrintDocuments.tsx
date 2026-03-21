import type { ReactNode } from "react";
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
import {
  getAdultLessonStructure,
  getLessonHighlightText,
  getLessonObjectives,
  getLessonPrimaryReading,
  getLessonPrimaryText,
  getLessonStructure,
  getYoungLessonStructure,
} from "@/lib/ebd-lesson-structure";
import { EbdPrintDocumentLayout, EbdPrintPage } from "./EbdPrintLayout";

type EbdPrintDocumentProps = {
  classeInfo: ClasseEBDInfo;
  trimestre: TrimestreEBD;
  licao: LicaoEBD;
};

type PrintablePageSection = {
  key: string;
  title: string;
  content: ReactNode;
  weight: number;
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

function truncateText(text: string, max: number) {
  if (text.length <= max) {
    return text;
  }

  const truncated = text.slice(0, max);
  const lastSpace = truncated.lastIndexOf(" ");

  return `${truncated.slice(0, lastSpace > 0 ? lastSpace : max).trim()}...`;
}

function topicosToListaItems(licao: LicaoEBD) {
  return licao.topicos.map((topico) => ({
    titulo: topico.titulo,
    conteudo:
      topico.conteudo[0] ??
      "Desenvolva este tópico em aula com base bíblica e aplicação prática.",
  }));
}

function estimateTextWeight(text?: string | null, divisor = 340) {
  if (!text) {
    return 0;
  }

  return 0.55 + text.length / divisor;
}

function estimateStringsWeight(items?: string[] | null, divisor = 420) {
  if (!items?.length) {
    return 0;
  }

  const combinedLength = items.reduce((total, item) => total + item.length, 0);

  return 0.45 + items.length * 0.22 + combinedLength / divisor;
}

function estimateListaItemsWeight(items?: ListaItem[] | null, divisor = 470) {
  if (!items?.length) {
    return 0;
  }

  const combinedLength = items.reduce(
    (total, item) => total + (item.titulo?.length ?? 0) + item.conteudo.length,
    0
  );

  return 0.55 + items.length * 0.24 + combinedLength / divisor;
}

function sectionWeight(...weights: number[]) {
  return 0.7 + weights.reduce((total, value) => total + value, 0);
}

function getPageGroupWeight(group: PrintablePageSection[]) {
  return group.reduce((total, section) => total + section.weight, 0);
}

function compactPageGroups(
  groups: PrintablePageSection[][],
  maxWeight: number,
  minGroups = 1
) {
  const compacted: PrintablePageSection[][] = [];

  groups.forEach((group, index) => {
    const previous = compacted[compacted.length - 1];
    const remainingAfterCurrent = groups.length - index - 1;
    const canMerge =
      previous &&
      getPageGroupWeight(previous) + getPageGroupWeight(group) <= maxWeight &&
      compacted.length + remainingAfterCurrent >= minGroups;

    if (canMerge) {
      compacted[compacted.length - 1] = [...previous, ...group];
      return;
    }

    compacted.push([...group]);
  });

  return compacted;
}

function PrintSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="mb-3.5">
      <h3 className="keep-with-next font-acme text-[0.98rem] tracking-wide text-[#212121]">
        {title}
      </h3>
      <div className="mt-1.5 space-y-1 text-[10.3px] leading-[1.36] text-[#333]">
        {children}
      </div>
    </section>
  );
}

function PrintParagraph({
  label,
  children,
}: {
  label?: string;
  children: ReactNode;
}) {
  return (
    <p className="text-[10.3px] leading-[1.36] text-[#333]">
      {label ? <strong className="text-[#212121]">{label}: </strong> : null}
      {children}
    </p>
  );
}

function PrintBulletList({ items }: { items?: string[] }) {
  if (!items?.length) {
    return null;
  }

  return (
    <ul className="ml-4.5 list-disc space-y-0.5 text-[10.3px] leading-[1.34] text-[#333] marker:text-[#8b5b18]">
      {items.map((item, index) => (
        <li key={`${index}-${item.slice(0, 30)}`}>
          <PrintBibleText text={item} />
        </li>
      ))}
    </ul>
  );
}

function PrintOrderedList({ items }: { items?: ListaItem[] }) {
  if (!items?.length) {
    return null;
  }

  return (
    <ol className="ml-4.5 list-decimal space-y-0.5 text-[10.3px] leading-[1.34] text-[#333] marker:font-semibold marker:text-[#8b5b18]">
      {items.map((item, index) => (
        <li key={`${index}-${item.titulo ?? "item"}`}>
          {item.titulo ? (
            <strong className="text-[#212121]">{item.titulo}: </strong>
          ) : null}
          <PrintBibleText text={item.conteudo} />
        </li>
      ))}
    </ol>
  );
}

function adultTopicoSection(topico: TopicoConteudo): PrintablePageSection {
  return {
    key: `adult-topico-${topico.id}`,
    title: topico.titulo,
    weight: sectionWeight(
      estimateTextWeight(topico.sinopse),
      estimateStringsWeight(topico.explicacaoBiblica),
      estimateStringsWeight(topico.aprofundamentoDoutrinario),
      estimateStringsWeight(topico.aplicacaoPratica),
      estimateListaItemsWeight(
        topico.referenciasCruzadas?.map((item) => ({
          titulo: item.referencia,
          conteudo: item.descricao ?? "Referência de apoio à aula.",
        }))
      )
    ),
    content: (
      <>
        {topico.sinopse ? (
          <PrintParagraph label="Sinopse">
            <PrintBibleText text={topico.sinopse} />
          </PrintParagraph>
        ) : null}

        {topico.explicacaoBiblica?.length ? (
          <>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8b5b18]">
              Explicação bíblica
            </p>
            <PrintBulletList items={topico.explicacaoBiblica} />
          </>
        ) : null}

        {topico.aprofundamentoDoutrinario?.length ? (
          <>
            <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8b5b18]">
              Aprofundamento doutrinário
            </p>
            <PrintBulletList items={topico.aprofundamentoDoutrinario} />
          </>
        ) : null}

        {topico.aplicacaoPratica?.length ? (
          <>
            <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8b5b18]">
              Aplicação prática
            </p>
            <PrintBulletList items={topico.aplicacaoPratica} />
          </>
        ) : null}

        {topico.referenciasCruzadas?.length ? (
          <>
            <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8b5b18]">
              Referências cruzadas
            </p>
            <PrintOrderedList
              items={topico.referenciasCruzadas.map((item) => ({
                titulo: item.referencia,
                conteudo: item.descricao ?? "Referência de apoio à aula.",
              }))}
            />
          </>
        ) : null}
      </>
    ),
  };
}

function youngTopicoSection(topico: TopicoJovens): PrintablePageSection {
  return {
    key: `young-topico-${topico.id}`,
    title: topico.titulo,
    weight: sectionWeight(
      estimateTextWeight(topico.sinopse),
      estimateStringsWeight(topico.explicacaoBiblica),
      estimateStringsWeight(topico.aplicacaoPratica),
      estimateTextWeight(topico.pense),
      estimateTextWeight(topico.pontoImportante)
    ),
    content: (
      <>
        {topico.sinopse ? (
          <PrintParagraph label="Sinopse">
            <PrintBibleText text={topico.sinopse} />
          </PrintParagraph>
        ) : null}

        {topico.explicacaoBiblica?.length ? (
          <>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8b5b18]">
              Desenvolvimento
            </p>
            <PrintBulletList items={topico.explicacaoBiblica} />
          </>
        ) : null}

        {topico.aplicacaoPratica?.length ? (
          <>
            <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8b5b18]">
              Aplicação prática
            </p>
            <PrintBulletList items={topico.aplicacaoPratica} />
          </>
        ) : null}

        {topico.pense ? (
          <PrintParagraph label="Pense">
            <PrintBibleText text={topico.pense} />
          </PrintParagraph>
        ) : null}

        {topico.pontoImportante ? (
          <PrintParagraph label="Ponto importante">
            <PrintBibleText text={topico.pontoImportante} />
          </PrintParagraph>
        ) : null}
      </>
    ),
  };
}

function getSummaryPages(
  classeInfo: ClasseEBDInfo,
  trimestre: TrimestreEBD,
  licao: LicaoEBD
): PrintablePageSection[][] {
  const lessonStructure = getLessonStructure(classeInfo, trimestre, licao);
  const lessonPrimaryText = getLessonPrimaryText(lessonStructure) ?? "A confirmar";
  const lessonHighlight = getLessonHighlightText(lessonStructure) ?? licao.resumo;
  const lessonPrimaryReading = getLessonPrimaryReading(lessonStructure);
  const lessonObjectives = getLessonObjectives(lessonStructure);
  const lessonOutline =
    lessonStructure?.esboco?.length ? lessonStructure.esboco : topicosToListaItems(licao);
  const weeklyReadingItems =
    lessonStructure?.tipo === "adultos"
      ? lessonStructure.leituraDiaria.map((item) => ({
          titulo: `${item.dia} · ${item.referencia}`,
          conteudo: item.tema ?? "Leitura de apoio à aula.",
        }))
      : lessonStructure?.tipo === "jovens"
        ? lessonStructure.leituraSemanal.map((item) => ({
          titulo: `${item.dia} · ${item.referencia}`,
          conteudo: item.foco ?? "Leitura de apoio à aula.",
        }))
        : [];

  const summaryHighlights: ListaItem[] =
    classeInfo.slug === "adultos" && licao.subsidioAdultos
      ? [
          ...(licao.subsidioAdultos.visaoGeral.ideiaCentral
            ? [
                {
                  titulo: "Ideia central",
                  conteudo: truncateText(
                    licao.subsidioAdultos.visaoGeral.ideiaCentral,
                    250
                  ),
                },
              ]
            : []),
          ...(licao.subsidioAdultos.visaoGeral.palavraChave
            ? [
                {
                  titulo: `Palavra-chave · ${licao.subsidioAdultos.visaoGeral.palavraChave.termo}`,
                  conteudo: truncateText(
                    licao.subsidioAdultos.visaoGeral.palavraChave.definicao ??
                      "Termo central da lição.",
                    220
                  ),
                },
              ]
            : []),
          ...licao.subsidioAdultos.desenvolvimento.slice(0, 3).map((topico) => ({
            titulo: topico.titulo,
            conteudo: truncateText(
              topico.sinopse ??
                topico.explicacaoBiblica?.[0] ??
                topico.aplicacaoPratica?.[0] ??
                "Desenvolva este tópico com apoio bíblico e aplicação prática.",
              220
            ),
          })),
        ]
      : classeInfo.slug === "jovens" && licao.subsidioJovens
        ? [
            ...(licao.subsidioJovens.cabecalho.resumoDaLicao
              ? [
                  {
                    titulo: "Resumo da lição",
                    conteudo: truncateText(
                    licao.subsidioJovens.cabecalho.resumoDaLicao,
                      240
                    ),
                  },
                ]
              : []),
            ...(licao.subsidioJovens.arranquePedagogico.orientacaoPedagogica
              ? [
                  {
                    titulo: "Orientação pedagógica",
                    conteudo: truncateText(
                    licao.subsidioJovens.arranquePedagogico.orientacaoPedagogica,
                      220
                    ),
                  },
                ]
              : []),
            ...licao.subsidioJovens.desenvolvimento.slice(0, 3).map((topico) => ({
              titulo: topico.titulo,
              conteudo: truncateText(
                topico.pontoImportante ??
                  topico.pense ??
                  topico.sinopse ??
                  topico.explicacaoBiblica?.[0] ??
                  "Leve a classe a relacionar o tema com decisões reais da semana.",
                220
              ),
            })),
          ]
        : [];

  const revisionHighlights =
    classeInfo.slug === "adultos"
      ? [
          ...(licao.subsidioAdultos?.revisao?.pontosChave ?? []),
          ...(licao.subsidioAdultos?.revisao?.perguntas ?? []),
        ]
      : [
          ...(licao.subsidioJovens?.revisao?.horaDaRevisao ?? []),
          ...(licao.subsidioJovens?.revisao?.quizCurto ?? []),
        ];

  const sections: PrintablePageSection[] = [
    {
      key: "summary-panorama",
      title: "Panorama e aplicação",
      weight: sectionWeight(
        estimateTextWeight(lessonPrimaryText),
        estimateTextWeight(lessonHighlight),
        estimateTextWeight(licao.resumo),
        estimateTextWeight(licao.aplicacao)
      ),
      content: (
        <>
          <PrintParagraph label={classeInfo.textoBaseLabel}>
            <PrintBibleText text={lessonPrimaryText} />
          </PrintParagraph>
          <PrintParagraph label={classeInfo.resumoDestaqueLabel}>
            <PrintBibleText text={lessonHighlight} />
          </PrintParagraph>
          <PrintParagraph label="Resumo da lição">
            <PrintBibleText text={licao.resumo} />
          </PrintParagraph>
          <PrintParagraph label="Aplicação prática">
            <PrintBibleText text={licao.aplicacao} />
          </PrintParagraph>
        </>
      ),
    },
    {
      key: "summary-planejamento",
      title: "Leitura bíblica e objetivos",
      weight: sectionWeight(
        estimateStringsWeight(lessonPrimaryReading),
        estimateStringsWeight(lessonObjectives)
      ),
      content: (
        <>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8b5b18]">
            {classeInfo.leituraPrincipalLabel}
          </p>
          <PrintBulletList items={lessonPrimaryReading.slice(0, 6)} />

          <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8b5b18]">
            Objetivos
          </p>
          <PrintBulletList items={lessonObjectives.slice(0, 6)} />
        </>
      ),
    },
    {
      key: "summary-esboco",
      title: "Esboço da aula",
      weight: sectionWeight(
        estimateListaItemsWeight(
          lessonOutline.slice(0, 4)
        )
      ),
      content: (
        <PrintOrderedList
          items={
            lessonOutline.slice(0, 4).map((item) => ({
              ...item,
              conteudo: truncateText(item.conteudo, 240),
            }))
          }
        />
      ),
    },
    {
      key: "summary-ritmo",
      title: "Ritmo da semana",
      weight: sectionWeight(estimateListaItemsWeight(weeklyReadingItems.slice(0, 6))),
      content: (
        <PrintOrderedList
          items={weeklyReadingItems.slice(0, 6).map((item) => ({
            ...item,
            conteudo: truncateText(item.conteudo, 170),
          }))}
        />
      ),
    },
    {
      key: "summary-topicos",
      title: "Tópicos centrais",
      weight: sectionWeight(
        estimateListaItemsWeight(
          topicosToListaItems(licao).slice(0, 3).map((item) => ({
            ...item,
            conteudo: truncateText(item.conteudo, 280),
          }))
        )
      ),
      content: (
        <PrintOrderedList
          items={topicosToListaItems(licao).slice(0, 3).map((item) => ({
            ...item,
            conteudo: truncateText(item.conteudo, 280),
          }))}
        />
      ),
    },
    {
      key: "summary-subsidio",
      title: "Subsídio em foco",
      weight: sectionWeight(
        estimateListaItemsWeight(summaryHighlights.slice(0, 5))
      ),
      content: (
        <>
          {summaryHighlights.length ? (
            <>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8b5b18]">
                Destaques do subsídio
              </p>
              <PrintOrderedList items={summaryHighlights.slice(0, 5)} />
            </>
          ) : null}
        </>
      ),
    },
    {
      key: "summary-fechamento",
      title: "Revisão e apoio",
      weight: sectionWeight(
        estimateStringsWeight(licao.apoioProfessor?.slice(0, 5)),
        estimateStringsWeight(revisionHighlights.slice(0, 5)),
        estimateStringsWeight(licao.apoioAluno?.slice(0, 4))
      ),
      content: (
        <>

          {licao.apoioProfessor?.length ? (
            <>
              <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8b5b18]">
                Apoio ao professor
              </p>
              <PrintBulletList items={licao.apoioProfessor.slice(0, 5)} />
            </>
          ) : null}

          {revisionHighlights.length ? (
            <>
              <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8b5b18]">
                Revisão rápida
              </p>
              <PrintBulletList items={revisionHighlights.slice(0, 5)} />
            </>
          ) : null}

          {licao.apoioAluno?.length ? (
            <>
              <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8b5b18]">
                Para reforçar durante a semana
              </p>
              <PrintBulletList items={licao.apoioAluno.slice(0, 4)} />
            </>
          ) : null}
        </>
      ),
    },
  ];

  const [
    panorama,
    planejamento,
    esboco,
    ritmo,
    topicos,
    subsidio,
    fechamento,
  ] = sections;

  return [
    [panorama, planejamento, esboco, ritmo],
    [topicos, subsidio, fechamento],
  ];
}

function getAdultFullSections(
  classeInfo: ClasseEBDInfo,
  trimestre: TrimestreEBD,
  licao: LicaoEBD
): PrintablePageSection[] {
  const subsidio = licao.subsidioAdultos;

  if (!subsidio) {
    return [];
  }

  const structure = getAdultLessonStructure(classeInfo, trimestre, licao);
  const leituraDiariaItems = (subsidio.cabecalho.leituraDiaria ?? []).map(
    (item) => ({
      titulo: `${item.dia} · ${item.referencia}`,
      conteudo: item.tema ?? "Leitura de apoio à aula.",
    })
  );
  const leituraClasseItems = (subsidio.cabecalho.leituraBiblicaEmClasse ?? []).map(
    (referencia) => ({
      conteudo: referencia,
    })
  );

  return [
    {
      key: "adult-base",
      title: "Base da lição",
      weight: sectionWeight(
        estimateTextWeight(structure.textoAureo),
        estimateTextWeight(structure.verdadePratica),
        estimateTextWeight(licao.resumo),
        estimateTextWeight(licao.aplicacao)
      ),
      content: (
        <>
          <PrintParagraph label="Texto áureo">
            <PrintBibleText text={structure.textoAureo ?? "A confirmar"} />
          </PrintParagraph>
          <PrintParagraph label="Verdade prática">
            <PrintBibleText text={structure.verdadePratica ?? licao.resumo} />
          </PrintParagraph>
          <PrintParagraph label="Resumo">
            <PrintBibleText text={licao.resumo} />
          </PrintParagraph>
          <PrintParagraph label="Aplicação prática">
            <PrintBibleText text={licao.aplicacao} />
          </PrintParagraph>
        </>
      ),
    },
    {
      key: "adult-planejamento",
      title: "Leitura, objetivos e esboço",
      weight: sectionWeight(
        estimateStringsWeight(structure.leituraBiblicaEmClasse),
        estimateStringsWeight(structure.objetivos),
        estimateListaItemsWeight(structure.esboco)
      ),
      content: (
        <>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8b5b18]">
            Leitura bíblica em classe
          </p>
          <PrintBulletList items={structure.leituraBiblicaEmClasse} />

          <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8b5b18]">
            Objetivos
          </p>
          <PrintBulletList items={structure.objetivos} />

          <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8b5b18]">
            Esboço da aula
          </p>
          <PrintOrderedList items={structure.esboco} />
        </>
      ),
    },
    {
      key: "adult-panorama",
      title: "Panorama da lição",
      weight: sectionWeight(
        estimateTextWeight(subsidio.cabecalho.textoAureo),
        estimateTextWeight(subsidio.cabecalho.verdadePratica),
        estimateTextWeight(subsidio.visaoGeral.resumo),
        estimateTextWeight(subsidio.visaoGeral.ideiaCentral),
        estimateTextWeight(subsidio.visaoGeral.palavraChave?.definicao),
        estimateStringsWeight(subsidio.visaoGeral.objetivos),
        estimateListaItemsWeight(leituraClasseItems)
      ),
      content: (
        <>
          {subsidio.cabecalho.textoAureo ? (
            <PrintParagraph label="Texto áureo">
              <PrintBibleText text={subsidio.cabecalho.textoAureo} />
            </PrintParagraph>
          ) : null}

          {subsidio.cabecalho.verdadePratica ? (
            <PrintParagraph label="Verdade prática">
              <PrintBibleText text={subsidio.cabecalho.verdadePratica} />
            </PrintParagraph>
          ) : null}

          <PrintParagraph label="Resumo expandido">
            <PrintBibleText text={subsidio.visaoGeral.resumo} />
          </PrintParagraph>

          {subsidio.visaoGeral.ideiaCentral ? (
            <PrintParagraph label="Ideia central">
              <PrintBibleText text={subsidio.visaoGeral.ideiaCentral} />
            </PrintParagraph>
          ) : null}

          {subsidio.visaoGeral.palavraChave ? (
            <PrintParagraph
              label={`Palavra-chave · ${subsidio.visaoGeral.palavraChave.termo}`}
            >
              <PrintBibleText
                text={
                  subsidio.visaoGeral.palavraChave.definicao ??
                  "Termo central da lição."
                }
              />
            </PrintParagraph>
          ) : null}

          {subsidio.visaoGeral.objetivos?.length ? (
            <>
              <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8b5b18]">
                Objetivos do subsídio
              </p>
              <PrintBulletList items={subsidio.visaoGeral.objetivos} />
            </>
          ) : null}

          {leituraClasseItems.length ? (
            <>
              <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8b5b18]">
                Leitura bíblica em classe
              </p>
              <PrintOrderedList items={leituraClasseItems} />
            </>
          ) : null}
        </>
      ),
    },
    {
      key: "adult-leitura-diaria",
      title: "Leitura diária e preparação",
      weight: sectionWeight(
        estimateListaItemsWeight(leituraDiariaItems),
        estimateStringsWeight(structure.hinosSugeridos)
      ),
      content: (
        <>
          {leituraDiariaItems.length ? (
            <>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8b5b18]">
                Leitura diária
              </p>
              <PrintOrderedList items={leituraDiariaItems} />
            </>
          ) : null}

          {structure.hinosSugeridos.length ? (
            <>
              <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8b5b18]">
                Hinos sugeridos
              </p>
              <PrintBulletList items={structure.hinosSugeridos} />
            </>
          ) : null}

          {licao.apoioProfessor?.length ? (
            <>
              <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8b5b18]">
                Ênfase para a semana
              </p>
              <PrintBulletList items={licao.apoioProfessor.slice(0, 4)} />
            </>
          ) : null}
        </>
      ),
    },
    ...subsidio.desenvolvimento.map(adultTopicoSection),
    {
      key: "adult-apoio",
      title: "Condução da aula",
      weight: sectionWeight(
        estimateTextWeight(subsidio.apoioProfessor.perguntaDeAbertura),
        estimateTextWeight(subsidio.apoioProfessor.pontoSensivelDaAula),
        estimateTextWeight(subsidio.apoioProfessor.erroComumDeInterpretacao),
        estimateStringsWeight(subsidio.apoioProfessor.perguntasParaDebate),
        estimateTextWeight(subsidio.apoioProfessor.sugestaoDeFechamento),
        estimateStringsWeight(licao.apoioProfessor),
        estimateStringsWeight(licao.apoioAluno)
      ),
      content: (
        <>
          {subsidio.apoioProfessor.perguntaDeAbertura ? (
            <PrintParagraph label="Pergunta de abertura">
              <PrintBibleText text={subsidio.apoioProfessor.perguntaDeAbertura} />
            </PrintParagraph>
          ) : null}

          {subsidio.apoioProfessor.pontoSensivelDaAula ? (
            <PrintParagraph label="Ponto sensível da aula">
              <PrintBibleText text={subsidio.apoioProfessor.pontoSensivelDaAula} />
            </PrintParagraph>
          ) : null}

          {subsidio.apoioProfessor.erroComumDeInterpretacao ? (
            <PrintParagraph label="Erro comum de interpretação">
              <PrintBibleText
                text={subsidio.apoioProfessor.erroComumDeInterpretacao}
              />
            </PrintParagraph>
          ) : null}

          {subsidio.apoioProfessor.perguntasParaDebate?.length ? (
            <>
              <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8b5b18]">
                Perguntas para debate
              </p>
              <PrintBulletList items={subsidio.apoioProfessor.perguntasParaDebate} />
            </>
          ) : null}

          {subsidio.apoioProfessor.sugestaoDeFechamento ? (
            <PrintParagraph label="Sugestão de fechamento">
              <PrintBibleText text={subsidio.apoioProfessor.sugestaoDeFechamento} />
            </PrintParagraph>
          ) : null}

          {licao.apoioProfessor?.length ? (
            <>
              <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8b5b18]">
                Apoio ao professor
              </p>
              <PrintBulletList items={licao.apoioProfessor} />
            </>
          ) : null}

          {licao.apoioAluno?.length ? (
            <>
              <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8b5b18]">
                Apoio ao aluno
              </p>
              <PrintBulletList items={licao.apoioAluno} />
            </>
          ) : null}
        </>
      ),
    },
    {
      key: "adult-aprofundamento",
      title: "Aprofundamento doutrinário",
      weight: sectionWeight(
        estimateStringsWeight(subsidio.aprofundamento?.contextoHistorico),
        estimateStringsWeight(subsidio.aprofundamento?.conceitoTeologico),
        estimateListaItemsWeight(subsidio.aprofundamento?.notaDeVocabulario)
      ),
      content: (
        <>
          {subsidio.aprofundamento?.contextoHistorico?.length ? (
            <>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8b5b18]">
                Contexto histórico
              </p>
              <PrintBulletList items={subsidio.aprofundamento.contextoHistorico} />
            </>
          ) : null}

          {subsidio.aprofundamento?.conceitoTeologico?.length ? (
            <>
              <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8b5b18]">
                Conceito teológico
              </p>
              <PrintBulletList items={subsidio.aprofundamento.conceitoTeologico} />
            </>
          ) : null}

          {subsidio.aprofundamento?.notaDeVocabulario?.length ? (
            <>
              <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8b5b18]">
                Nota de vocabulário
              </p>
              <PrintOrderedList items={subsidio.aprofundamento.notaDeVocabulario} />
            </>
          ) : null}
        </>
      ),
    },
    {
      key: "adult-leituras-complementares",
      title: "Leituras complementares",
      weight: sectionWeight(
        estimateListaItemsWeight(subsidio.aprofundamento?.leituraComplementar)
      ),
      content: (
        <>

          {subsidio.aprofundamento?.leituraComplementar?.length ? (
            <>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8b5b18]">
                Leituras complementares
              </p>
              <PrintOrderedList items={subsidio.aprofundamento.leituraComplementar} />
            </>
          ) : null}
        </>
      ),
    },
    {
      key: "adult-vida-revisao",
      title: "Vida cristã e revisão",
      weight: sectionWeight(
        estimateStringsWeight(subsidio.vidaCrista?.oQueConfronta),
        estimateStringsWeight(subsidio.vidaCrista?.oQueConsola),
        estimateStringsWeight(subsidio.vidaCrista?.oQueExige),
        estimateStringsWeight(subsidio.vidaCrista?.oQueRevelaSobreDeus),
        estimateStringsWeight(subsidio.revisao?.pontosChave),
        estimateStringsWeight(subsidio.revisao?.perguntas),
        estimateTextWeight(subsidio.revisao?.fraseDeSintese)
      ),
      content: (
        <>

          {subsidio.vidaCrista?.oQueConfronta?.length ? (
            <>
              <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8b5b18]">
                O que confronta
              </p>
              <PrintBulletList items={subsidio.vidaCrista.oQueConfronta} />
            </>
          ) : null}

          {subsidio.vidaCrista?.oQueConsola?.length ? (
            <>
              <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8b5b18]">
                O que consola
              </p>
              <PrintBulletList items={subsidio.vidaCrista.oQueConsola} />
            </>
          ) : null}

          {subsidio.vidaCrista?.oQueExige?.length ? (
            <>
              <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8b5b18]">
                O que exige
              </p>
              <PrintBulletList items={subsidio.vidaCrista.oQueExige} />
            </>
          ) : null}

          {subsidio.vidaCrista?.oQueRevelaSobreDeus?.length ? (
            <>
              <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8b5b18]">
                O que revela sobre Deus
              </p>
              <PrintBulletList items={subsidio.vidaCrista.oQueRevelaSobreDeus} />
            </>
          ) : null}

          {subsidio.revisao?.pontosChave?.length ? (
            <>
              <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8b5b18]">
                Pontos-chave
              </p>
              <PrintBulletList items={subsidio.revisao.pontosChave} />
            </>
          ) : null}

          {subsidio.revisao?.perguntas?.length ? (
            <>
              <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8b5b18]">
                Perguntas
              </p>
              <PrintBulletList items={subsidio.revisao.perguntas} />
            </>
          ) : null}

          {subsidio.revisao?.fraseDeSintese ? (
            <PrintParagraph label="Frase de síntese">
              <PrintBibleText text={subsidio.revisao.fraseDeSintese} />
            </PrintParagraph>
          ) : null}
        </>
      ),
    },
  ];
}

function getYoungFullSections(
  classeInfo: ClasseEBDInfo,
  trimestre: TrimestreEBD,
  licao: LicaoEBD
): PrintablePageSection[] {
  const subsidio = licao.subsidioJovens;

  if (!subsidio) {
    return [];
  }

  const structure = getYoungLessonStructure(classeInfo, trimestre, licao);
  const leituraSemanalItems = (subsidio.cabecalho.leituraSemanal ?? []).map(
    (item) => ({
      titulo: `${item.dia} · ${item.referencia}`,
      conteudo: item.foco ?? "Leitura de apoio à aula.",
    })
  );

  return [
    {
      key: "young-base",
      title: "Base da lição",
      weight: sectionWeight(
        estimateTextWeight(structure.textoPrincipal),
        estimateTextWeight(structure.resumoDaLicao),
        estimateTextWeight(licao.resumo),
        estimateTextWeight(licao.aplicacao)
      ),
      content: (
        <>
          <PrintParagraph label="Texto principal">
            <PrintBibleText text={structure.textoPrincipal ?? "A confirmar"} />
          </PrintParagraph>
          <PrintParagraph label="Resumo da lição">
            <PrintBibleText text={structure.resumoDaLicao ?? licao.resumo} />
          </PrintParagraph>
          <PrintParagraph label="Síntese">
            <PrintBibleText text={licao.resumo} />
          </PrintParagraph>
          <PrintParagraph label="Aplicação prática">
            <PrintBibleText text={licao.aplicacao} />
          </PrintParagraph>
        </>
      ),
    },
    {
      key: "young-planejamento",
      title: "Leitura, objetivos e esboço",
      weight: sectionWeight(
        estimateStringsWeight(structure.textoBiblico),
        estimateStringsWeight(structure.objetivos),
        estimateListaItemsWeight(structure.esboco)
      ),
      content: (
        <>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8b5b18]">
            Texto bíblico
          </p>
          <PrintBulletList items={structure.textoBiblico} />

          <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8b5b18]">
            Objetivos
          </p>
          <PrintBulletList items={structure.objetivos} />

          <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8b5b18]">
            Esboço da aula
          </p>
          <PrintOrderedList items={structure.esboco} />
        </>
      ),
    },
    {
      key: "young-arranque",
      title: "Arranque pedagógico",
      weight: sectionWeight(
        estimateTextWeight(structure.textoPrincipal),
        estimateTextWeight(structure.resumoDaLicao),
        estimateTextWeight(structure.interacao),
        estimateTextWeight(structure.orientacaoPedagogica)
      ),
      content: (
        <>
          {structure.textoPrincipal ? (
            <PrintParagraph label="Texto principal">
              <PrintBibleText text={structure.textoPrincipal} />
            </PrintParagraph>
          ) : null}

          {structure.resumoDaLicao ? (
            <PrintParagraph label="Resumo da lição">
              <PrintBibleText text={structure.resumoDaLicao} />
            </PrintParagraph>
          ) : null}

          {structure.interacao ? (
            <PrintParagraph label="Interação">
              <PrintBibleText text={structure.interacao} />
            </PrintParagraph>
          ) : null}

          {structure.orientacaoPedagogica ? (
            <PrintParagraph label="Orientação pedagógica">
              <PrintBibleText text={structure.orientacaoPedagogica} />
            </PrintParagraph>
          ) : null}
        </>
      ),
    },
    {
      key: "young-arranque-leitura",
      title: "Objetivos e leitura semanal",
      weight: sectionWeight(
        estimateStringsWeight(structure.objetivos),
        estimateListaItemsWeight(leituraSemanalItems)
      ),
      content: (
        <>
          {structure.objetivos.length ? (
            <>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8b5b18]">
                Objetivos
              </p>
              <PrintBulletList items={structure.objetivos} />
            </>
          ) : null}

          {leituraSemanalItems.length ? (
            <>
              <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8b5b18]">
                Leitura semanal
              </p>
              <PrintOrderedList items={leituraSemanalItems} />
            </>
          ) : null}
        </>
      ),
    },
    ...subsidio.desenvolvimento.map(youngTopicoSection),
    {
      key: "young-apoio",
      title: "Condução da aula",
      weight: sectionWeight(
        estimateTextWeight(subsidio.apoioProfessor.quebraGelo),
        estimateTextWeight(subsidio.apoioProfessor.perguntaChave),
        estimateTextWeight(subsidio.apoioProfessor.dificuldadeProvavelDaClasse),
        estimateStringsWeight(subsidio.apoioProfessor.conducaoDaConversa),
        estimateTextWeight(subsidio.apoioProfessor.fechamento),
        estimateStringsWeight(licao.apoioProfessor),
        estimateStringsWeight(licao.apoioAluno)
      ),
      content: (
        <>
          {subsidio.apoioProfessor.quebraGelo ? (
            <PrintParagraph label="Quebra-gelo">
              <PrintBibleText text={subsidio.apoioProfessor.quebraGelo} />
            </PrintParagraph>
          ) : null}

          {subsidio.apoioProfessor.perguntaChave ? (
            <PrintParagraph label="Pergunta-chave">
              <PrintBibleText text={subsidio.apoioProfessor.perguntaChave} />
            </PrintParagraph>
          ) : null}

          {subsidio.apoioProfessor.dificuldadeProvavelDaClasse ? (
            <PrintParagraph label="Dificuldade provável da classe">
              <PrintBibleText
                text={subsidio.apoioProfessor.dificuldadeProvavelDaClasse}
              />
            </PrintParagraph>
          ) : null}

          {subsidio.apoioProfessor.conducaoDaConversa?.length ? (
            <>
              <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8b5b18]">
                Condução da conversa
              </p>
              <PrintBulletList items={subsidio.apoioProfessor.conducaoDaConversa} />
            </>
          ) : null}

          {subsidio.apoioProfessor.fechamento ? (
            <PrintParagraph label="Fechamento">
              <PrintBibleText text={subsidio.apoioProfessor.fechamento} />
            </PrintParagraph>
          ) : null}

          {licao.apoioProfessor?.length ? (
            <>
              <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8b5b18]">
                Apoio ao professor
              </p>
              <PrintBulletList items={licao.apoioProfessor} />
            </>
          ) : null}

          {licao.apoioAluno?.length ? (
            <>
              <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8b5b18]">
                Apoio ao aluno
              </p>
              <PrintBulletList items={licao.apoioAluno} />
            </>
          ) : null}
        </>
      ),
    },
    {
      key: "young-aprofundamento",
      title: "Aprofundamento",
      weight: sectionWeight(
        estimateStringsWeight(subsidio.aprofundamentoOpcional?.notaDoutrinariaCurta),
        estimateStringsWeight(subsidio.aprofundamentoOpcional?.contextoBiblico),
        estimateStringsWeight(subsidio.aprofundamentoOpcional?.conexaoComVidaCrista)
      ),
      content: (
        <>
          {subsidio.aprofundamentoOpcional?.notaDoutrinariaCurta?.length ? (
            <>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8b5b18]">
                Nota doutrinária
              </p>
              <PrintBulletList
                items={subsidio.aprofundamentoOpcional.notaDoutrinariaCurta}
              />
            </>
          ) : null}

          {subsidio.aprofundamentoOpcional?.contextoBiblico?.length ? (
            <>
              <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8b5b18]">
                Contexto bíblico
              </p>
              <PrintBulletList items={subsidio.aprofundamentoOpcional.contextoBiblico} />
            </>
          ) : null}

          {subsidio.aprofundamentoOpcional?.conexaoComVidaCrista?.length ? (
            <>
              <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8b5b18]">
                Conexão com a vida cristã
              </p>
              <PrintBulletList
                items={subsidio.aprofundamentoOpcional.conexaoComVidaCrista}
              />
            </>
          ) : null}
        </>
      ),
    },
    {
      key: "young-revisao",
      title: "Revisão e fechamento",
      weight: sectionWeight(
        estimateStringsWeight(structure.horaDaRevisao),
        estimateStringsWeight(subsidio.revisao?.quizCurto),
        estimateTextWeight(subsidio.revisao?.conclusao)
      ),
      content: (
        <>
          {structure.horaDaRevisao.length ? (
            <>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8b5b18]">
                Hora da revisão
              </p>
              <PrintBulletList items={structure.horaDaRevisao} />
            </>
          ) : null}

          {subsidio.revisao?.quizCurto?.length ? (
            <>
              <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8b5b18]">
                Quiz curto
              </p>
              <PrintBulletList items={subsidio.revisao.quizCurto} />
            </>
          ) : null}

          {subsidio.revisao?.conclusao ? (
            <PrintParagraph label="Conclusão">
              <PrintBibleText text={subsidio.revisao.conclusao} />
            </PrintParagraph>
          ) : null}
        </>
      ),
    },
  ];
}

function getFullPages(
  classeInfo: ClasseEBDInfo,
  trimestre: TrimestreEBD,
  licao: LicaoEBD
): PrintablePageSection[][] {
  const sections =
    classeInfo.slug === "adultos"
      ? getAdultFullSections(classeInfo, trimestre, licao)
      : getYoungFullSections(classeInfo, trimestre, licao);

  const buildPage = (...pageSections: Array<PrintablePageSection | undefined>) =>
    pageSections.filter(Boolean) as PrintablePageSection[];

  if (sections.length <= 4) {
    return compactPageGroups(
      sections.map((section) => [section]),
      classeInfo.slug === "adultos" ? 6.7 : 6.5,
      3
    );
  }

  if (classeInfo.slug === "adultos") {
    const baseSection = sections.find((section) => section.key === "adult-base");
    const planningSection = sections.find(
      (section) => section.key === "adult-planejamento"
    );
    const panoramaSection = sections.find(
      (section) => section.key === "adult-panorama"
    );
    const readingSection = sections.find(
      (section) => section.key === "adult-leitura-diaria"
    );
    const topicoSections = sections.filter((section) =>
      section.key.startsWith("adult-topico-")
    );
    const apoioSection = sections.find((section) => section.key === "adult-apoio");
    const aprofundamentoSection = sections.find(
      (section) => section.key === "adult-aprofundamento"
    );
    const complementarySection = sections.find(
      (section) => section.key === "adult-leituras-complementares"
    );
    const revisaoSection = sections.find(
      (section) => section.key === "adult-vida-revisao"
    );

    return [
      buildPage(baseSection, planningSection, panoramaSection),
      buildPage(readingSection, topicoSections[0]),
      buildPage(...topicoSections.slice(1)),
      buildPage(apoioSection, aprofundamentoSection),
      buildPage(complementarySection, revisaoSection),
    ].filter((group) => group.length > 0);
  }

  const baseSection = sections.find((section) => section.key === "young-base");
  const planningSection = sections.find(
    (section) => section.key === "young-planejamento"
  );
  const arranqueSection = sections.find((section) => section.key === "young-arranque");
  const arranqueReadingSection = sections.find(
    (section) => section.key === "young-arranque-leitura"
  );
  const topicoSections = sections.filter((section) =>
    section.key.startsWith("young-topico-")
  );
  const apoioSection = sections.find((section) => section.key === "young-apoio");
  const aprofundamentoSection = sections.find(
    (section) => section.key === "young-aprofundamento"
  );
  const revisaoSection = sections.find((section) => section.key === "young-revisao");

  return [
    buildPage(baseSection, planningSection, arranqueSection),
    buildPage(arranqueReadingSection, ...topicoSections.slice(0, 2)),
    buildPage(...topicoSections.slice(2), apoioSection),
    buildPage(aprofundamentoSection, revisaoSection),
  ].filter((group) => group.length > 0);
}

export function EbdLessonSummaryPrintDocument({
  classeInfo,
  trimestre,
  licao,
}: EbdPrintDocumentProps) {
  const backHref = `/ebd/${classeInfo.slug}/${trimestre.slug}/${licao.slug}`;
  const pages = getSummaryPages(classeInfo, trimestre, licao);

  return (
    <EbdPrintDocumentLayout
      title={`Resumo da lição ${licao.numero}`}
      backHref={backHref}
      alternateHref={getEbdPrintRoute(
        classeInfo.slug,
        trimestre.slug,
        licao.slug,
        "pdf-completo"
      )}
      alternateLabel="Abrir subsídio completo"
    >
      {pages.map((pageSections, index) => (
        <EbdPrintPage
          key={`summary-page-${index + 1}`}
          modeLabel="Resumo da lição"
          classeInfo={classeInfo}
          trimestreLabel={trimestre.rotulo}
          licao={licao}
          pageNumber={index + 1}
          pageCount={pages.length}
        >
          {pageSections.map((section) => (
            <PrintSection key={section.key} title={section.title}>
              {section.content}
            </PrintSection>
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
  const pages = getFullPages(classeInfo, trimestre, licao);

  return (
    <EbdPrintDocumentLayout
      title={`Subsídio completo · Lição ${licao.numero}`}
      backHref={backHref}
      alternateHref={getEbdPrintRoute(
        classeInfo.slug,
        trimestre.slug,
        licao.slug,
        "pdf-resumo"
      )}
      alternateLabel="Abrir resumo da lição"
    >
      {pages.map((pageSections, index) => (
        <EbdPrintPage
          key={`full-page-${index + 1}`}
          modeLabel="Subsídio completo"
          classeInfo={classeInfo}
          trimestreLabel={trimestre.rotulo}
          licao={licao}
          pageNumber={index + 1}
          pageCount={pages.length}
        >
          {pageSections.map((section) => (
            <PrintSection key={section.key} title={section.title}>
              {section.content}
            </PrintSection>
          ))}
        </EbdPrintPage>
      ))}
    </EbdPrintDocumentLayout>
  );
}
