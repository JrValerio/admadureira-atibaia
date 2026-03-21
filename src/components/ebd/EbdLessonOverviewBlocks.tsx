import type { ReactNode } from "react";
import BibleReferenceText from "@/components/biblia/BibleReferenceText";
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

type CardTone = "accent" | "neutral" | "white" | "dark";

type ScheduleEntry = {
  day: string;
  reference: string;
  note?: string;
};

type ListBlock = {
  key: string;
  kind: "list";
  title: string;
  items: string[];
  tone?: CardTone;
  fullWidth?: boolean;
};

type TextBlock = {
  key: string;
  kind: "text";
  title: string;
  text: string;
  tone?: CardTone;
  fullWidth?: boolean;
};

type OutlineBlock = {
  key: string;
  kind: "outline";
  title: string;
  items: ListaItem[];
  tone?: CardTone;
  fullWidth?: boolean;
};

type ScheduleBlock = {
  key: string;
  kind: "schedule";
  title: string;
  items: ScheduleEntry[];
  tone?: CardTone;
  fullWidth?: boolean;
};

type RecurringBlock = ListBlock | TextBlock | OutlineBlock | ScheduleBlock;

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

function CardShell({
  title,
  tone = "white",
  fullWidth = false,
  children,
}: {
  title: string;
  tone?: CardTone;
  fullWidth?: boolean;
  children: ReactNode;
}) {
  const toneClasses =
    tone === "accent"
      ? "border border-[#ffa726]/20 bg-[#fff8ee]"
      : tone === "neutral"
        ? "border border-black/5 bg-[#fafafa]"
        : tone === "dark"
          ? "bg-[#212121] text-white"
          : "border border-black/5 bg-white";
  const titleClasses = "text-[#ffa726]";
  const bodyClasses = tone === "dark" ? "text-white/85" : "text-[#555]";

  return (
    <div
      className={`${fullWidth ? "lg:col-span-2" : ""} rounded-3xl p-5 shadow-sm md:p-6 ${toneClasses}`}
    >
      <p className={`mb-3 text-xs font-bold tracking-widest uppercase ${titleClasses}`}>
        {title}
      </p>
      <div className={`space-y-3 leading-relaxed ${bodyClasses}`}>{children}</div>
    </div>
  );
}

function HighlightCard({
  label,
  text,
  tone,
}: {
  label: string;
  text: string;
  tone: Exclude<CardTone, "white">;
}) {
  return (
    <CardShell title={label} tone={tone}>
      <p
        className={`text-lg leading-relaxed md:text-xl ${
          tone === "dark" ? "text-white" : "text-[#212121]"
        }`}
      >
        <BibleReferenceText
          text={text}
          linkClassName={
            tone === "dark"
              ? "font-medium text-white underline decoration-[#ffa726]/70 underline-offset-4 transition-colors hover:text-[#ffe0b2]"
              : "font-medium text-[#212121] underline decoration-[#ffa726]/60 underline-offset-4 transition-colors hover:text-[#8b1e1e]"
          }
        />
      </p>
    </CardShell>
  );
}

function BulletList({
  items,
  markerClassName = "bg-[#ef5350]",
  linkClassName = "font-medium text-[#212121] underline decoration-[#ffa726]/60 underline-offset-4 transition-colors hover:text-[#8b1e1e]",
}: {
  items: string[];
  markerClassName?: string;
  linkClassName?: string;
}) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span className={`mt-[7px] h-1.5 w-1.5 rounded-full ${markerClassName}`} />
          <span>
            <BibleReferenceText text={item} linkClassName={linkClassName} />
          </span>
        </li>
      ))}
    </ul>
  );
}

function OutlineList({ items }: { items: ListaItem[] }) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div
          key={`${item.titulo ?? "esboco"}-${item.conteudo}`}
          className="rounded-2xl border border-black/5 bg-white/80 p-4"
        >
          {item.titulo ? (
            <p className="mb-2 text-xs font-bold tracking-widest uppercase text-[#ffa726]">
              {item.titulo}
            </p>
          ) : null}
          <p className="text-sm leading-relaxed text-[#555]">
            <BibleReferenceText text={item.conteudo} />
          </p>
        </div>
      ))}
    </div>
  );
}

function ScheduleList({
  items,
  tone = "white",
}: {
  items: ScheduleEntry[];
  tone?: CardTone;
}) {
  const itemClasses =
    tone === "dark"
      ? "border border-white/10 bg-white/5"
      : tone === "accent"
        ? "border border-[#ffa726]/15 bg-white/80"
        : "border border-black/5 bg-white";
  const referenceClass =
    tone === "dark"
      ? "font-semibold text-white"
      : "font-semibold text-[#212121]";
  const noteClass = tone === "dark" ? "text-white/80" : "text-[#555]";

  return (
    <div className="grid gap-3 md:grid-cols-2">
      {items.map((item) => (
        <div
          key={`${item.day}-${item.reference}`}
          className={`rounded-2xl p-4 ${itemClasses}`}
        >
          <p className="text-xs font-bold tracking-widest uppercase text-[#ef5350]">
            {item.day}
          </p>
          <p className={`mt-2 ${referenceClass}`}>
            <BibleReferenceText
              text={item.reference}
              linkClassName={
                tone === "dark"
                  ? "font-semibold text-white underline decoration-[#ffa726]/70 underline-offset-4 transition-colors hover:text-[#ffe0b2]"
                  : "font-semibold text-[#212121] underline decoration-[#ffa726]/60 underline-offset-4 transition-colors hover:text-[#8b1e1e]"
              }
            />
          </p>
          {item.note ? (
            <p className={`mt-2 text-sm leading-relaxed ${noteClass}`}>
              <BibleReferenceText
                text={item.note}
                linkClassName={
                  tone === "dark"
                    ? "font-medium text-white underline decoration-[#ffa726]/70 underline-offset-4 transition-colors hover:text-[#ffe0b2]"
                    : "font-medium text-[#212121] underline decoration-[#ffa726]/60 underline-offset-4 transition-colors hover:text-[#8b1e1e]"
                }
              />
            </p>
          ) : null}
        </div>
      ))}
    </div>
  );
}

function renderBlock(block: RecurringBlock) {
  switch (block.kind) {
    case "list":
      return (
        <CardShell
          key={block.key}
          title={block.title}
          tone={block.tone}
          fullWidth={block.fullWidth}
        >
          <BulletList items={block.items} />
        </CardShell>
      );
    case "text":
      return (
        <CardShell
          key={block.key}
          title={block.title}
          tone={block.tone}
          fullWidth={block.fullWidth}
        >
          <p>
            <BibleReferenceText
              text={block.text}
              linkClassName={
                block.tone === "dark"
                  ? "font-medium text-white underline decoration-[#ffa726]/70 underline-offset-4 transition-colors hover:text-[#ffe0b2]"
                  : "font-medium text-[#212121] underline decoration-[#ffa726]/60 underline-offset-4 transition-colors hover:text-[#8b1e1e]"
              }
            />
          </p>
        </CardShell>
      );
    case "outline":
      return (
        <CardShell
          key={block.key}
          title={block.title}
          tone={block.tone}
          fullWidth={block.fullWidth}
        >
          <OutlineList items={block.items} />
        </CardShell>
      );
    case "schedule":
      return (
        <CardShell
          key={block.key}
          title={block.title}
          tone={block.tone}
          fullWidth={block.fullWidth}
        >
          <ScheduleList items={block.items} tone={block.tone} />
        </CardShell>
      );
  }
}

function toDailySchedule(items: LeituraDiariaItem[]) {
  return items.map((item) => ({
    day: item.dia,
    reference: item.referencia,
    note: item.tema,
  }));
}

function toWeeklySchedule(items: LeituraSemanalItem[]) {
  return items.map((item) => ({
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
                  tone: "neutral" as const,
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
              <HighlightCard
                label={classeInfo.textoBaseLabel}
                text={primaryText}
                tone="accent"
              />
              <HighlightCard
                label={classeInfo.resumoDestaqueLabel}
                text={highlightText}
                tone="neutral"
              />
            </div>
          </div>

          {hasPrimaryColumn ? (
            <div className="grid gap-4">
              {primaryReading.length ? (
                <CardShell title={classeInfo.leituraPrincipalLabel} tone="white">
                  <BulletList items={primaryReading} />
                </CardShell>
              ) : null}

              {structure.objetivos.length ? (
                <CardShell title="Objetivos da lição" tone="white">
                  <BulletList items={structure.objetivos} />
                </CardShell>
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
          <div className="grid gap-4 lg:grid-cols-2">
            {weeklyBlocks.map(renderBlock)}
          </div>
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
          <div className="grid gap-4 lg:grid-cols-2">
            {planningBlocks.map(renderBlock)}
          </div>
        </section>
      ) : null}
    </div>
  );
}
