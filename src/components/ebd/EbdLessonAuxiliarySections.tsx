import Link from "next/link";
import BibleReferenceText from "@/components/biblia/BibleReferenceText";
import {
  EbdSupportListPanel,
  EbdSupportOutlinePanel,
  EbdSupportPanel,
} from "@/components/ebd/EbdLessonSupportUi";
import type { ClasseEBDInfo, LicaoEBD, TrimestreEBD } from "@/data/ebd";
import { type LicaoTocItem } from "@/lib/ebd-lesson-structure";
import type { MetaEstadoProgressaoLicaoEBD } from "@/lib/ebd-utils";

type EbdLessonAuxiliarySectionsProps = {
  classe: string;
  tocItems: LicaoTocItem[];
  classeInfo: ClasseEBDInfo;
  trimestre: TrimestreEBD;
  licao: LicaoEBD;
  posicaoDaLicao: number | null;
  metaEstadoProgressao: MetaEstadoProgressaoLicaoEBD;
  licaoDaSemanaAtual: boolean;
  licaoAnterior: LicaoEBD | null;
  proximaLicao: LicaoEBD | null;
  licaoAnteriorNaTrilha: LicaoEBD | null;
  proximaLicaoNaTrilha: LicaoEBD | null;
  isDraft: boolean;
  isPubliclyAvailable: boolean;
  summaryPrintHref: string;
  fullPrintHref: string;
};

function TrailLesson({
  title,
  lesson,
  href,
}: {
  title: string;
  lesson: LicaoEBD;
  href?: string;
}) {
  return (
    <div>
      <p className="font-semibold text-[#212121]">{title}</p>
      {href ? (
        <Link href={href} className="transition-colors hover:text-[#212121]">
          Lição {lesson.numero} · {lesson.titulo}
        </Link>
      ) : (
        <p>
          Lição {lesson.numero} · {lesson.titulo}
        </p>
      )}
    </div>
  );
}

export default function EbdLessonAuxiliarySections({
  classe,
  tocItems,
  classeInfo,
  trimestre,
  licao,
  posicaoDaLicao,
  metaEstadoProgressao,
  licaoDaSemanaAtual,
  licaoAnterior,
  proximaLicao,
  licaoAnteriorNaTrilha,
  proximaLicaoNaTrilha,
  isDraft,
  isPubliclyAvailable,
  summaryPrintHref,
  fullPrintHref,
}: EbdLessonAuxiliarySectionsProps) {
  return (
    <aside className="space-y-6">
      {/* TOC só agrega valor com 2+ destinos; "Base da lição" sozinha não navega nada */}
      {tocItems.length > 1 && (
        <nav
          aria-label="Nesta página"
          className="hidden rounded-2xl border border-black/5 bg-white p-4 shadow-sm lg:sticky lg:top-24 lg:block"
        >
          <p className="mb-3 text-xs font-bold tracking-widest uppercase text-[#ef5350]">
            Nesta página
          </p>
          <ul className="space-y-2 text-sm">
            {tocItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="text-[#555] transition-colors hover:text-[#212121]"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}

      <EbdSupportPanel
        title="Contexto da edição"
        labelTone="danger"
        className="rounded-3xl p-6 shadow-sm"
      >
        <h2 className="mb-3 font-acme text-xl tracking-wide text-[#212121] md:text-3xl">
          {trimestre.titulo}
        </h2>
        <div className="space-y-3 text-sm leading-relaxed text-[#555]">
          <p>{trimestre.rotulo}</p>
          <p>{classeInfo.horarioLabel}</p>
          <p>
            <BibleReferenceText
              text={
                licao.textoChave ??
                trimestre.versiculoBase ??
                `${classeInfo.textoBaseLabel} a confirmar`
              }
              linkClassName="font-medium text-[#555] underline decoration-[#ffa726]/60 underline-offset-4 transition-colors hover:text-[#8b1e1e]"
            />
          </p>
        </div>
        <Link
          href={`/ebd/${classe}/${trimestre.slug}`}
          className="ui-btn-secondary mt-6"
        >
          Voltar ao trimestre
        </Link>
      </EbdSupportPanel>

      <EbdSupportPanel
        title="Trilha do trimestre"
        tone="accent"
        labelTone="danger"
        className="rounded-3xl p-6 shadow-sm"
      >
        <div className="space-y-3 text-sm leading-relaxed text-[#555]">
          <p>
            <span className="font-semibold text-[#212121]">Posição:</span> Lição{" "}
            {posicaoDaLicao ?? licao.numero} de {trimestre.licoes.length}
          </p>
          <p>
            <span className="font-semibold text-[#212121]">Estado:</span>{" "}
            {metaEstadoProgressao.label}
          </p>
          {licaoDaSemanaAtual ? (
            <p>
              <span className="font-semibold text-[#212121]">
                Semana atual:
              </span>{" "}
              esta é a lição em destaque desta semana.
            </p>
          ) : null}
          {licaoAnteriorNaTrilha ? (
            <TrailLesson
              title="Anterior na trilha"
              lesson={licaoAnteriorNaTrilha}
              href={
                licaoAnterior
                  ? `/ebd/${classe}/${trimestre.slug}/${licaoAnterior.slug}`
                  : undefined
              }
            />
          ) : null}
          {proximaLicaoNaTrilha ? (
            <TrailLesson
              title="Próxima na trilha"
              lesson={proximaLicaoNaTrilha}
              href={
                proximaLicao && proximaLicao.slug === proximaLicaoNaTrilha.slug
                  ? `/ebd/${classe}/${trimestre.slug}/${proximaLicao.slug}`
                  : undefined
              }
            />
          ) : null}
        </div>
      </EbdSupportPanel>

      {isDraft ? (
        <>
          <EbdSupportListPanel
            title="Apoio ao professor"
            items={licao.apoioProfessor}
            labelTone="danger"
            className="rounded-3xl p-6 shadow-sm"
          />
          <EbdSupportListPanel
            title="Apoio ao aluno"
            items={licao.apoioAluno}
            labelTone="danger"
            className="rounded-3xl p-6 shadow-sm"
          />
          <EbdSupportOutlinePanel
            title="Esboço da aula"
            items={licao.esboco}
            labelTone="danger"
            className="rounded-3xl p-6 shadow-sm"
          />
        </>
      ) : null}

      {!isDraft && isPubliclyAvailable ? (
        <EbdSupportPanel
          title="Material para impressão"
          tone="accent"
          labelTone="danger"
          className="rounded-3xl p-6 shadow-sm"
        >
          <p className="text-sm leading-relaxed text-[#555]">
            Abra uma versão enxuta em até 2 páginas ou o subsídio completo com
            identidade visual da igreja para imprimir ou salvar em PDF.
          </p>
          <div className="mt-5 flex flex-col gap-3">
            <Link
              href={summaryPrintHref}
              target="_blank"
              rel="noreferrer"
              className="ui-btn-primary"
            >
              Baixar resumo em PDF
            </Link>
            <Link
              href={fullPrintHref}
              target="_blank"
              rel="noreferrer"
              className="ui-btn-secondary"
            >
              Baixar subsídio completo em PDF
            </Link>
          </div>
        </EbdSupportPanel>
      ) : null}

      <EbdSupportPanel
        title="Continue estudando"
        tone="dark"
        className="rounded-3xl p-6 shadow-[0_18px_40px_rgba(0,0,0,0.18)]"
      >
        <div className="space-y-3 text-sm leading-relaxed text-white/80">
          {licaoAnterior ? (
            <Link
              href={`/ebd/${classe}/${trimestre.slug}/${licaoAnterior.slug}`}
              className="block transition-colors hover:text-white"
            >
              ← Lição {licaoAnterior.numero} · {licaoAnterior.titulo}
            </Link>
          ) : null}
          {proximaLicao ? (
            <Link
              href={`/ebd/${classe}/${trimestre.slug}/${proximaLicao.slug}`}
              className="block transition-colors hover:text-white"
            >
              Lição {proximaLicao.numero} · {proximaLicao.titulo} →
            </Link>
          ) : proximaLicaoNaTrilha ? (
            <p>
              Próxima na trilha: Lição {proximaLicaoNaTrilha.numero} ·{" "}
              {proximaLicaoNaTrilha.titulo}
            </p>
          ) : null}
          <Link
            href="/programacao"
            className="block transition-colors hover:text-white"
          >
            Ver EBD na programação da igreja
          </Link>
          <Link
            href="/contato"
            className="block transition-colors hover:text-white"
          >
            Falar com a igreja
          </Link>
        </div>
      </EbdSupportPanel>
    </aside>
  );
}
