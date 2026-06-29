import {
  EbdSupportListPanel,
  EbdSupportOutlinePanel,
  EbdSupportSchedulePanel,
  EbdSupportTextPanel,
  type EbdSupportPanelTone,
  type EbdSupportScheduleItem,
} from "@/components/ebd/EbdLessonSupportUi";
import type {
  ClasseEBDInfo,
  LeituraDiariaItem,
  LeituraSemanalItem,
  LicaoEstruturaPorClasse,
  ListaItem,
} from "@/data/ebd";

type EbdLessonOverviewBlocksProps = {
  classeInfo: ClasseEBDInfo;
  structure: LicaoEstruturaPorClasse;
};

type OverviewBlockTone = EbdSupportPanelTone;

type BaseBlock = {
  key: string;
  title: string;
  tone?: OverviewBlockTone;
  fullWidth?: boolean;
};

type ListBlock = BaseBlock & {
  kind: "list";
  items: string[];
};

type TextBlock = BaseBlock & {
  kind: "text";
  text: string;
  highlight?: boolean;
};

type OutlineBlock = BaseBlock & {
  kind: "outline";
  items: ListaItem[];
};

type ScheduleBlock = BaseBlock & {
  kind: "schedule";
  items: EbdSupportScheduleItem[];
};

type RecurringBlock = ListBlock | TextBlock | OutlineBlock | ScheduleBlock;

const OVERVIEW_BLOCK_CLASS_NAME = "rounded-3xl p-5 shadow-sm md:p-6";
const OVERVIEW_SCHEDULE_GRID_CLASS_NAME = "grid gap-3 sm:grid-cols-2 xl:grid-cols-4";

function SectionLead({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="mb-2 text-xs font-bold tracking-widest uppercase text-[#ef5350]">
        {eyebrow}
      </p>
      <h2 className="mb-3 font-acme text-2xl tracking-wide text-[#212121] md:text-3xl">
        {title}
      </h2>
      <p className="leading-relaxed text-[#555]">{description}</p>
    </div>
  );
}

function getOverviewBlockClassName(fullWidth = false) {
  return fullWidth
    ? `${OVERVIEW_BLOCK_CLASS_NAME} lg:col-span-2`
    : OVERVIEW_BLOCK_CLASS_NAME;
}

function renderBlock(block: RecurringBlock) {
  switch (block.kind) {
    case "list":
      return (
        <EbdSupportListPanel
          key={block.key}
          title={block.title}
          items={block.items}
          tone={block.tone}
          className={getOverviewBlockClassName(block.fullWidth)}
        />
      );
    case "text":
      return (
        <EbdSupportTextPanel
          key={block.key}
          title={block.title}
          text={block.text}
          tone={block.tone}
          className={getOverviewBlockClassName(block.fullWidth)}
          textClassName={
            block.highlight ? "text-lg leading-relaxed md:text-xl" : undefined
          }
        />
      );
    case "outline":
      return (
        <EbdSupportOutlinePanel
          key={block.key}
          title={block.title}
          items={block.items}
          tone={block.tone}
          className={getOverviewBlockClassName(block.fullWidth)}
        />
      );
    case "schedule":
      return (
        <EbdSupportSchedulePanel
          key={block.key}
          title={block.title}
          items={block.items}
          tone={block.tone}
          className={getOverviewBlockClassName(block.fullWidth)}
          itemsClassName={OVERVIEW_SCHEDULE_GRID_CLASS_NAME}
        />
      );
  }
}

function toDailySchedule(items: LeituraDiariaItem[]): EbdSupportScheduleItem[] {
  return items.map((item) => ({
    key: `${item.dia}-${item.referencia}`,
    day: item.dia,
    reference: item.referencia,
    note: item.tema,
  }));
}

function toWeeklySchedule(items: LeituraSemanalItem[]): EbdSupportScheduleItem[] {
  return items.map((item) => ({
    key: `${item.dia}-${item.referencia}`,
    day: item.dia,
    reference: item.referencia,
    note: item.foco,
  }));
}

export default function EbdLessonOverviewBlocks({
  classeInfo,
  structure,
}: EbdLessonOverviewBlocksProps) {
  const primaryText =
    structure.tipo === "adultos"
      ? structure.textoAureo ?? "A confirmar"
      : structure.textoPrincipal ?? "A confirmar";
  const highlightText =
    structure.tipo === "adultos"
      ? structure.verdadePratica ?? structure.resumo
      : structure.resumoDaLicao ?? structure.resumo;
  const primaryReading =
    structure.tipo === "adultos"
      ? structure.leituraBiblicaEmClasse
      : structure.textoBiblico;
  const weeklyBlocks: RecurringBlock[] =
    structure.tipo === "adultos"
      ? [
          ...(structure.leituraDiaria.length
            ? [
                {
                  key: "leitura-diaria",
                  kind: "schedule" as const,
                  title: "Leitura diária",
                  items: toDailySchedule(structure.leituraDiaria),
                  tone: "accent" as const,
                  fullWidth: true,
                },
              ]
            : []),
          ...(structure.hinosSugeridos.length
            ? [
                {
                  key: "hinos-sugeridos",
                  kind: "list" as const,
                  title: "Hinos sugeridos",
                  items: structure.hinosSugeridos,
                  tone: "white" as const,
                },
              ]
            : []),
        ]
      : structure.leituraSemanal.length
        ? [
            {
              key: "leitura-semanal",
              kind: "schedule" as const,
              title: "Leitura semanal",
              items: toWeeklySchedule(structure.leituraSemanal),
              tone: "accent" as const,
              fullWidth: true,
            },
          ]
        : [];
  const planningBlocks: RecurringBlock[] =
    structure.tipo === "adultos"
      ? [
          ...(structure.apoioProfessor.length
            ? [
                {
                  key: "apoio-professor",
                  kind: "list" as const,
                  title: "Apoio ao professor",
                  items: structure.apoioProfessor,
                  tone: "white" as const,
                },
              ]
            : []),
          ...(structure.apoioAluno.length
            ? [
                {
                  key: "apoio-aluno",
                  kind: "list" as const,
                  title: "Apoio ao aluno",
                  items: structure.apoioAluno,
                  tone: "white" as const,
                },
              ]
            : []),
          ...(structure.esboco.length
            ? [
                {
                  key: "esboco",
                  kind: "outline" as const,
                  title: "Esboço da aula",
                  items: structure.esboco,
                  tone: "accent" as const,
                  fullWidth: true,
                },
              ]
            : []),
        ]
      : [
          ...(structure.interacao
            ? [
                {
                  key: "interacao",
                  kind: "text" as const,
                  title: "Interação",
                  text: structure.interacao,
                  tone: "white" as const,
                },
              ]
            : []),
          ...(structure.orientacaoPedagogica
            ? [
                {
                  key: "orientacao-pedagogica",
                  kind: "text" as const,
                  title: "Orientação pedagógica",
                  text: structure.orientacaoPedagogica,
                  tone: "dark" as const,
                  fullWidth: true,
                },
              ]
            : []),
          ...(structure.horaDaRevisao.length
            ? [
                {
                  key: "hora-da-revisao",
                  kind: "list" as const,
                  title: "Hora da revisão",
                  items: structure.horaDaRevisao,
                  tone: "soft" as const,
                },
              ]
            : []),
          ...(structure.apoioProfessor.length
            ? [
                {
                  key: "apoio-professor",
                  kind: "list" as const,
                  title: "Apoio ao professor",
                  items: structure.apoioProfessor,
                  tone: "white" as const,
                },
              ]
            : []),
          ...(structure.apoioAluno.length
            ? [
                {
                  key: "apoio-aluno",
                  kind: "list" as const,
                  title: "Apoio ao aluno",
                  items: structure.apoioAluno,
                  tone: "white" as const,
                },
              ]
            : []),
          ...(structure.esboco.length
            ? [
                {
                  key: "esboco",
                  kind: "outline" as const,
                  title: "Esboço da aula",
                  items: structure.esboco,
                  tone: "accent" as const,
                  fullWidth: true,
                },
              ]
            : []),
        ];
  const hasPrimaryColumn =
    primaryReading.length > 0 || structure.objetivos.length > 0;

  return (
    <div className="space-y-10">
      <section className="space-y-6">
        <SectionLead
          eyebrow="Base da lição"
          title="Blocos principais em destaque"
          description="Os blocos recorrentes mais consultados aparecem logo no topo para facilitar leitura devocional, leitura rápida e preparação da aula."
        />

        <div
          className={`grid gap-6 ${
            hasPrimaryColumn ? "xl:grid-cols-[1.05fr_0.95fr]" : ""
          }`}
        >
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <EbdSupportTextPanel
                title={classeInfo.textoBaseLabel}
                text={primaryText}
                tone="accent"
                className={OVERVIEW_BLOCK_CLASS_NAME}
                textClassName="text-lg leading-relaxed md:text-xl"
              />
              <EbdSupportTextPanel
                title={classeInfo.resumoDestaqueLabel}
                text={highlightText}
                tone="soft"
                className={OVERVIEW_BLOCK_CLASS_NAME}
                textClassName="text-lg leading-relaxed md:text-xl"
              />
            </div>
          </div>

          {hasPrimaryColumn ? (
            <div className="grid gap-4">
              {primaryReading.length ? (
                <EbdSupportListPanel
                  title={classeInfo.leituraPrincipalLabel}
                  items={primaryReading}
                  className={OVERVIEW_BLOCK_CLASS_NAME}
                />
              ) : null}

              {structure.objetivos.length ? (
                <EbdSupportListPanel
                  title="Objetivos da lição"
                  items={structure.objetivos}
                  className={OVERVIEW_BLOCK_CLASS_NAME}
                />
              ) : null}
            </div>
          ) : null}
        </div>
      </section>

      {weeklyBlocks.length ? (
        <section className="space-y-4">
          <SectionLead
            eyebrow="Ritmo da semana"
            title={
              structure.tipo === "adultos"
                ? "Leitura e preparação recorrente"
                : "Leitura semanal em evidência"
            }
            description={
              structure.tipo === "adultos"
                ? "A preparação devocional e os apoios recorrentes da semana ficam agrupados para consulta mais direta."
                : "A leitura semanal sobe de nível visual para apoiar acompanhamento da juventude ao longo dos dias."
            }
          />
          <div className="grid gap-4 lg:grid-cols-2">{weeklyBlocks.map(renderBlock)}</div>
        </section>
      ) : null}

      {planningBlocks.length ? (
        <section className="space-y-4">
          <SectionLead
            eyebrow="Planejamento da aula"
            title={
              structure.tipo === "adultos"
                ? "Apoio e condução da lição"
                : "Apoio pedagógico e revisão"
            }
            description={
              structure.tipo === "adultos"
                ? "Objetivos, apoio e esboço ficam consolidados perto do topo, sem disputar espaço com o desenvolvimento completo."
                : "Interação, orientação pedagógica, revisão e apoios ficam organizados no mesmo fluxo para consulta do professor."
            }
          />
          <div className="grid gap-4 lg:grid-cols-2">{planningBlocks.map(renderBlock)}</div>
        </section>
      ) : null}
    </div>
  );
}
