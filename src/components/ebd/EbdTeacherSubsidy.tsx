import type { ReactNode } from "react";
import BibleReferenceText from "@/components/biblia/BibleReferenceText";
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

function Section({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-black/5 bg-[#fafafa] p-5 md:p-6">
      <p className="mb-3 text-xs font-bold tracking-widest uppercase text-[#ffa726]">
        {eyebrow}
      </p>
      <h3 className="mb-4 font-acme text-2xl tracking-wide text-[#212121]">
        {title}
      </h3>
      {children}
    </section>
  );
}

function StringList({
  items,
  markerClassName = "bg-[#ef5350]",
}: {
  items?: string[];
  markerClassName?: string;
}) {
  if (!items?.length) {
    return null;
  }

  return (
    <ul className="space-y-3 text-[#555] leading-relaxed">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span className={`mt-[7px] h-1.5 w-1.5 rounded-full ${markerClassName}`} />
          <span>
            <BibleReferenceText text={item} />
          </span>
        </li>
      ))}
    </ul>
  );
}

function ListaItemList({ items }: { items?: ListaItem[] }) {
  if (!items?.length) {
    return null;
  }

  return (
    <ul className="space-y-3 text-[#555] leading-relaxed">
      {items.map((item) => (
        <li
          key={`${item.titulo ?? "item"}-${item.conteudo}`}
          className="flex items-start gap-3"
        >
          <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-[#ef5350]" />
          <span>
            {item.titulo ? (
              <span className="font-semibold text-[#212121]">{item.titulo}: </span>
            ) : null}
            <BibleReferenceText text={item.conteudo} />
          </span>
        </li>
      ))}
    </ul>
  );
}

function ReferenciaList({ items }: { items?: ReferenciaCruzada[] }) {
  if (!items?.length) {
    return null;
  }

  return (
    <ul className="space-y-3 text-[#555] leading-relaxed">
      {items.map((item) => (
        <li key={`${item.referencia}-${item.descricao ?? ""}`} className="flex items-start gap-3">
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

function LeituraDiariaList({ items }: { items?: LeituraDiariaItem[] }) {
  if (!items?.length) {
    return null;
  }

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div
          key={`${item.dia}-${item.referencia}`}
          className="rounded-2xl border border-black/5 bg-white p-4"
        >
          <p className="text-xs font-bold tracking-widest uppercase text-[#ef5350]">
            {item.dia}
          </p>
          <p className="mt-1 font-semibold text-[#212121]">
            <BibleReferenceText
              text={item.referencia}
              linkClassName="font-semibold text-[#212121] underline decoration-[#ffa726]/60 underline-offset-4 transition-colors hover:text-[#8b1e1e]"
            />
          </p>
          {item.tema ? (
            <p className="mt-2 text-sm leading-relaxed text-[#555]">
              <BibleReferenceText text={item.tema} />
            </p>
          ) : null}
        </div>
      ))}
    </div>
  );
}

function LeituraSemanalList({ items }: { items?: LeituraSemanalItem[] }) {
  if (!items?.length) {
    return null;
  }

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div
          key={`${item.dia}-${item.referencia}`}
          className="rounded-2xl border border-black/5 bg-white p-4"
        >
          <p className="text-xs font-bold tracking-widest uppercase text-[#ef5350]">
            {item.dia}
          </p>
          <p className="mt-1 font-semibold text-[#212121]">
            <BibleReferenceText
              text={item.referencia}
              linkClassName="font-semibold text-[#212121] underline decoration-[#ffa726]/60 underline-offset-4 transition-colors hover:text-[#8b1e1e]"
            />
          </p>
          {item.foco ? (
            <p className="mt-2 text-sm leading-relaxed text-[#555]">
              <BibleReferenceText text={item.foco} />
            </p>
          ) : null}
        </div>
      ))}
    </div>
  );
}

function AdultTopicoCard({ topico }: { topico: TopicoConteudo }) {
  return (
    <article className="rounded-3xl border border-black/5 bg-white p-5 shadow-sm md:p-6">
      <h4 className="mb-3 font-acme text-2xl tracking-wide text-[#212121]">
        {topico.titulo}
      </h4>
      {topico.sinopse ? (
        <p className="mb-4 text-[#555] leading-relaxed">
          <BibleReferenceText text={topico.sinopse} />
        </p>
      ) : null}

      <div className="space-y-5">
        {topico.explicacaoBiblica?.length ? (
          <div>
            <p className="mb-3 text-xs font-bold tracking-widest uppercase text-[#ffa726]">
              Explicação bíblica
            </p>
            <StringList items={topico.explicacaoBiblica} markerClassName="bg-[#ffa726]" />
          </div>
        ) : null}

        {topico.aprofundamentoDoutrinario?.length ? (
          <div>
            <p className="mb-3 text-xs font-bold tracking-widest uppercase text-[#ef5350]">
              Aprofundamento doutrinário
            </p>
            <StringList
              items={topico.aprofundamentoDoutrinario}
              markerClassName="bg-[#ef5350]"
            />
          </div>
        ) : null}

        {topico.aplicacaoPratica?.length ? (
          <div>
            <p className="mb-3 text-xs font-bold tracking-widest uppercase text-[#8b5b18]">
              Aplicação prática
            </p>
            <StringList
              items={topico.aplicacaoPratica}
              markerClassName="bg-[#8b5b18]"
            />
          </div>
        ) : null}

        {topico.referenciasCruzadas?.length ? (
          <div>
            <p className="mb-3 text-xs font-bold tracking-widest uppercase text-[#ffa726]">
              Referências cruzadas
            </p>
            <ReferenciaList items={topico.referenciasCruzadas} />
          </div>
        ) : null}
      </div>
    </article>
  );
}

function YoungTopicoCard({ topico }: { topico: TopicoJovens }) {
  return (
    <article className="rounded-3xl border border-black/5 bg-white p-5 shadow-sm md:p-6">
      <h4 className="mb-3 font-acme text-2xl tracking-wide text-[#212121]">
        {topico.titulo}
      </h4>
      {topico.sinopse ? (
        <p className="mb-4 text-[#555] leading-relaxed">
          <BibleReferenceText text={topico.sinopse} />
        </p>
      ) : null}

      <div className="space-y-5">
        {topico.explicacaoBiblica?.length ? (
          <div>
            <p className="mb-3 text-xs font-bold tracking-widest uppercase text-[#ffa726]">
              Desenvolvimento
            </p>
            <StringList items={topico.explicacaoBiblica} markerClassName="bg-[#ffa726]" />
          </div>
        ) : null}

        {topico.aplicacaoPratica?.length ? (
          <div>
            <p className="mb-3 text-xs font-bold tracking-widest uppercase text-[#8b5b18]">
              Aplicação prática
            </p>
            <StringList items={topico.aplicacaoPratica} markerClassName="bg-[#8b5b18]" />
          </div>
        ) : null}

        {topico.pense ? (
          <div className="rounded-2xl border border-[#ffa726]/20 bg-[#fff8ee] p-4">
            <p className="mb-2 text-xs font-bold tracking-widest uppercase text-[#ef5350]">
              Pense
            </p>
            <p className="text-[#555] leading-relaxed">
              <BibleReferenceText text={topico.pense} />
            </p>
          </div>
        ) : null}

        {topico.pontoImportante ? (
          <div className="rounded-2xl bg-[#212121] p-4 text-white">
            <p className="mb-2 text-xs font-bold tracking-widest uppercase text-[#ffa726]">
              Ponto importante
            </p>
            <p className="text-white/85 leading-relaxed">
              <BibleReferenceText
                text={topico.pontoImportante}
                linkClassName="font-medium text-white underline decoration-[#ffa726]/70 underline-offset-4 transition-colors hover:text-[#ffe0b2]"
              />
            </p>
          </div>
        ) : null}
      </div>
    </article>
  );
}

function AdultSubsidy({ subsidio }: { subsidio: SubsidioAdultos }) {
  return (
    <div className="space-y-6">
      <Section eyebrow="Panorama da lição" title="Visão geral da aula">
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="mb-4 text-[#555] leading-relaxed">
              <BibleReferenceText text={subsidio.visaoGeral.resumo} />
            </p>
            {subsidio.visaoGeral.ideiaCentral ? (
              <div className="rounded-2xl border border-[#ffa726]/20 bg-white p-4">
                <p className="mb-2 text-xs font-bold tracking-widest uppercase text-[#ef5350]">
                  Ideia central
                </p>
                <p className="text-[#555] leading-relaxed">
                  <BibleReferenceText text={subsidio.visaoGeral.ideiaCentral} />
                </p>
              </div>
            ) : null}
          </div>

          <div className="space-y-4">
            {subsidio.visaoGeral.objetivos?.length ? (
              <div className="rounded-2xl border border-black/5 bg-white p-4">
                <p className="mb-3 text-xs font-bold tracking-widest uppercase text-[#ffa726]">
                  Objetivos
                </p>
                <StringList items={subsidio.visaoGeral.objetivos} markerClassName="bg-[#ffa726]" />
              </div>
            ) : null}
            {subsidio.visaoGeral.palavraChave ? (
              <div className="rounded-2xl border border-black/5 bg-white p-4">
                <p className="mb-2 text-xs font-bold tracking-widest uppercase text-[#ef5350]">
                  Palavra-chave
                </p>
                <p className="font-semibold text-[#212121]">
                  {subsidio.visaoGeral.palavraChave.termo}
                </p>
                {subsidio.visaoGeral.palavraChave.definicao ? (
                  <p className="mt-2 text-sm leading-relaxed text-[#555]">
                    <BibleReferenceText text={subsidio.visaoGeral.palavraChave.definicao} />
                  </p>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          <div className="rounded-2xl border border-black/5 bg-white p-4">
            <p className="mb-2 text-xs font-bold tracking-widest uppercase text-[#ffa726]">
              Texto áureo
            </p>
            <p className="text-sm leading-relaxed text-[#555]">
              <BibleReferenceText text={subsidio.cabecalho.textoAureo ?? "A confirmar"} />
            </p>
          </div>
          <div className="rounded-2xl border border-black/5 bg-white p-4">
            <p className="mb-2 text-xs font-bold tracking-widest uppercase text-[#ffa726]">
              Trimestre
            </p>
            <p className="text-sm leading-relaxed text-[#555]">
              {subsidio.cabecalho.trimestre}
            </p>
          </div>
          <div className="rounded-2xl border border-black/5 bg-white p-4">
            <p className="mb-2 text-xs font-bold tracking-widest uppercase text-[#ffa726]">
              Comentarista
            </p>
            <p className="text-sm leading-relaxed text-[#555]">
              {subsidio.cabecalho.comentarista ?? "A confirmar"}
            </p>
          </div>
        </div>

        {subsidio.cabecalho.leituraBiblicaEmClasse?.length ? (
          <div className="mt-6">
            <p className="mb-3 text-xs font-bold tracking-widest uppercase text-[#ef5350]">
              Leitura bíblica em classe
            </p>
            <StringList
              items={subsidio.cabecalho.leituraBiblicaEmClasse}
              markerClassName="bg-[#ef5350]"
            />
          </div>
        ) : null}

        {subsidio.cabecalho.leituraDiaria?.length ? (
          <div className="mt-6">
            <p className="mb-3 text-xs font-bold tracking-widest uppercase text-[#ef5350]">
              Leitura diária
            </p>
            <LeituraDiariaList items={subsidio.cabecalho.leituraDiaria} />
          </div>
        ) : null}
      </Section>

      <Section eyebrow="Desenvolvimento" title="Comentário por tópicos">
        <div className="space-y-4">
          {subsidio.desenvolvimento.map((topico) => (
            <AdultTopicoCard key={topico.id} topico={topico} />
          ))}
        </div>
      </Section>

      <Section eyebrow="Condução da aula" title="Apoio ao professor">
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          <div className="space-y-4">
            {subsidio.apoioProfessor.perguntaDeAbertura ? (
              <div className="rounded-2xl border border-black/5 bg-white p-4">
                <p className="mb-2 text-xs font-bold tracking-widest uppercase text-[#ffa726]">
                  Pergunta de abertura
                </p>
                <p className="text-[#555] leading-relaxed">
                  <BibleReferenceText text={subsidio.apoioProfessor.perguntaDeAbertura} />
                </p>
              </div>
            ) : null}
            {subsidio.apoioProfessor.pontoSensivelDaAula ? (
              <div className="rounded-2xl border border-black/5 bg-white p-4">
                <p className="mb-2 text-xs font-bold tracking-widest uppercase text-[#ffa726]">
                  Ponto sensível da aula
                </p>
                <p className="text-[#555] leading-relaxed">
                  <BibleReferenceText text={subsidio.apoioProfessor.pontoSensivelDaAula} />
                </p>
              </div>
            ) : null}
            {subsidio.apoioProfessor.erroComumDeInterpretacao ? (
              <div className="rounded-2xl border border-black/5 bg-white p-4">
                <p className="mb-2 text-xs font-bold tracking-widest uppercase text-[#ffa726]">
                  Erro comum de interpretação
                </p>
                <p className="text-[#555] leading-relaxed">
                  <BibleReferenceText
                    text={subsidio.apoioProfessor.erroComumDeInterpretacao}
                  />
                </p>
              </div>
            ) : null}
          </div>

          <div className="space-y-4">
            {subsidio.apoioProfessor.perguntasParaDebate?.length ? (
              <div className="rounded-2xl border border-black/5 bg-white p-4">
                <p className="mb-3 text-xs font-bold tracking-widest uppercase text-[#ef5350]">
                  Perguntas para debate
                </p>
                <StringList
                  items={subsidio.apoioProfessor.perguntasParaDebate}
                  markerClassName="bg-[#ef5350]"
                />
              </div>
            ) : null}
            {subsidio.apoioProfessor.sugestaoDeFechamento ? (
              <div className="rounded-2xl bg-[#212121] p-4 text-white">
                <p className="mb-2 text-xs font-bold tracking-widest uppercase text-[#ffa726]">
                  Sugestão de fechamento
                </p>
                <p className="text-white/85 leading-relaxed">
                  <BibleReferenceText
                    text={subsidio.apoioProfessor.sugestaoDeFechamento}
                    linkClassName="font-medium text-white underline decoration-[#ffa726]/70 underline-offset-4 transition-colors hover:text-[#ffe0b2]"
                  />
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </Section>

      {subsidio.aprofundamento ? (
        <Section eyebrow="Aprofundamento" title="Doutrina e contexto">
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
            {subsidio.aprofundamento.contextoHistorico?.length ? (
              <div className="rounded-2xl border border-black/5 bg-white p-4">
                <p className="mb-3 text-xs font-bold tracking-widest uppercase text-[#ffa726]">
                  Contexto histórico
                </p>
                <StringList
                  items={subsidio.aprofundamento.contextoHistorico}
                  markerClassName="bg-[#ffa726]"
                />
              </div>
            ) : null}
            {subsidio.aprofundamento.conceitoTeologico?.length ? (
              <div className="rounded-2xl border border-black/5 bg-white p-4">
                <p className="mb-3 text-xs font-bold tracking-widest uppercase text-[#ffa726]">
                  Conceito teológico
                </p>
                <StringList
                  items={subsidio.aprofundamento.conceitoTeologico}
                  markerClassName="bg-[#ffa726]"
                />
              </div>
            ) : null}
            {subsidio.aprofundamento.notaDeVocabulario?.length ? (
              <div className="rounded-2xl border border-black/5 bg-white p-4">
                <p className="mb-3 text-xs font-bold tracking-widest uppercase text-[#ef5350]">
                  Nota de vocabulário
                </p>
                <ListaItemList items={subsidio.aprofundamento.notaDeVocabulario} />
              </div>
            ) : null}
            {subsidio.aprofundamento.leituraComplementar?.length ? (
              <div className="rounded-2xl border border-black/5 bg-white p-4">
                <p className="mb-3 text-xs font-bold tracking-widest uppercase text-[#ef5350]">
                  Leituras complementares
                </p>
                <ListaItemList items={subsidio.aprofundamento.leituraComplementar} />
              </div>
            ) : null}
          </div>
        </Section>
      ) : null}

      {subsidio.vidaCrista ? (
        <Section eyebrow="Vida cristã" title="Aplicação pastoral">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {subsidio.vidaCrista.oQueConfronta?.length ? (
              <div className="rounded-2xl border border-black/5 bg-white p-4">
                <p className="mb-3 text-xs font-bold tracking-widest uppercase text-[#ffa726]">
                  O que confronta
                </p>
                <StringList items={subsidio.vidaCrista.oQueConfronta} markerClassName="bg-[#ffa726]" />
              </div>
            ) : null}
            {subsidio.vidaCrista.oQueConsola?.length ? (
              <div className="rounded-2xl border border-black/5 bg-white p-4">
                <p className="mb-3 text-xs font-bold tracking-widest uppercase text-[#ffa726]">
                  O que consola
                </p>
                <StringList items={subsidio.vidaCrista.oQueConsola} markerClassName="bg-[#ffa726]" />
              </div>
            ) : null}
            {subsidio.vidaCrista.oQueExige?.length ? (
              <div className="rounded-2xl border border-black/5 bg-white p-4">
                <p className="mb-3 text-xs font-bold tracking-widest uppercase text-[#ef5350]">
                  O que exige
                </p>
                <StringList items={subsidio.vidaCrista.oQueExige} markerClassName="bg-[#ef5350]" />
              </div>
            ) : null}
            {subsidio.vidaCrista.oQueRevelaSobreDeus?.length ? (
              <div className="rounded-2xl border border-black/5 bg-white p-4">
                <p className="mb-3 text-xs font-bold tracking-widest uppercase text-[#ef5350]">
                  O que revela sobre Deus
                </p>
                <StringList
                  items={subsidio.vidaCrista.oQueRevelaSobreDeus}
                  markerClassName="bg-[#ef5350]"
                />
              </div>
            ) : null}
          </div>
        </Section>
      ) : null}

      {subsidio.revisao ? (
        <Section eyebrow="Revisão" title="Fixação da lição">
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1fr_1fr]">
            {subsidio.revisao.perguntas?.length ? (
              <div className="rounded-2xl border border-black/5 bg-white p-4">
                <p className="mb-3 text-xs font-bold tracking-widest uppercase text-[#ffa726]">
                  Perguntas
                </p>
                <StringList items={subsidio.revisao.perguntas} markerClassName="bg-[#ffa726]" />
              </div>
            ) : null}
            {subsidio.revisao.pontosChave?.length ? (
              <div className="rounded-2xl border border-black/5 bg-white p-4">
                <p className="mb-3 text-xs font-bold tracking-widest uppercase text-[#ef5350]">
                  Pontos-chave
                </p>
                <StringList items={subsidio.revisao.pontosChave} markerClassName="bg-[#ef5350]" />
              </div>
            ) : null}
          </div>
          {subsidio.revisao.fraseDeSintese ? (
            <div className="mt-4 rounded-2xl bg-[#212121] p-4 text-white">
              <p className="mb-2 text-xs font-bold tracking-widest uppercase text-[#ffa726]">
                Frase de síntese
              </p>
              <p className="text-white/85 leading-relaxed">
                  <BibleReferenceText
                    text={subsidio.revisao.fraseDeSintese}
                    linkClassName="font-medium text-white underline decoration-[#ffa726]/70 underline-offset-4 transition-colors hover:text-[#ffe0b2]"
                  />
              </p>
            </div>
          ) : null}
        </Section>
      ) : null}
    </div>
  );
}

function YoungSubsidy({ subsidio }: { subsidio: SubsidioJovens }) {
  return (
    <div className="space-y-6">
      <Section eyebrow="Panorama da lição" title="Arranque pedagógico">
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-4">
            <div className="rounded-2xl border border-black/5 bg-white p-4">
              <p className="mb-2 text-xs font-bold tracking-widest uppercase text-[#ffa726]">
                Texto principal
              </p>
              <p className="text-sm leading-relaxed text-[#555]">
                <BibleReferenceText text={subsidio.cabecalho.textoPrincipal ?? "A confirmar"} />
              </p>
            </div>
            {subsidio.cabecalho.resumoDaLicao ? (
              <div className="rounded-2xl border border-black/5 bg-white p-4">
                <p className="mb-2 text-xs font-bold tracking-widest uppercase text-[#ffa726]">
                  Resumo da lição
                </p>
                <p className="text-sm leading-relaxed text-[#555]">
                  <BibleReferenceText text={subsidio.cabecalho.resumoDaLicao} />
                </p>
              </div>
            ) : null}
            <div className="rounded-2xl border border-black/5 bg-white p-4">
              <p className="mb-2 text-xs font-bold tracking-widest uppercase text-[#ffa726]">
                Trimestre
              </p>
              <p className="text-sm leading-relaxed text-[#555]">
                {subsidio.cabecalho.trimestre}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {subsidio.arranquePedagogico.objetivos?.length ? (
              <div className="rounded-2xl border border-black/5 bg-white p-4">
                <p className="mb-3 text-xs font-bold tracking-widest uppercase text-[#ef5350]">
                  Objetivos
                </p>
                <StringList
                  items={subsidio.arranquePedagogico.objetivos}
                  markerClassName="bg-[#ef5350]"
                />
              </div>
            ) : null}
            {subsidio.arranquePedagogico.interacao ? (
              <div className="rounded-2xl border border-black/5 bg-white p-4">
                <p className="mb-2 text-xs font-bold tracking-widest uppercase text-[#ef5350]">
                  Interação
                </p>
                <p className="text-sm leading-relaxed text-[#555]">
                  <BibleReferenceText text={subsidio.arranquePedagogico.interacao} />
                </p>
              </div>
            ) : null}
          </div>
        </div>

        {subsidio.arranquePedagogico.orientacaoPedagogica ? (
          <div className="mt-6 rounded-2xl bg-[#212121] p-4 text-white">
            <p className="mb-2 text-xs font-bold tracking-widest uppercase text-[#ffa726]">
              Orientação pedagógica
            </p>
            <p className="text-white/85 leading-relaxed">
              <BibleReferenceText
                text={subsidio.arranquePedagogico.orientacaoPedagogica}
                linkClassName="font-medium text-white underline decoration-[#ffa726]/70 underline-offset-4 transition-colors hover:text-[#ffe0b2]"
              />
            </p>
          </div>
        ) : null}

        {subsidio.cabecalho.leituraSemanal?.length ? (
          <div className="mt-6">
            <p className="mb-3 text-xs font-bold tracking-widest uppercase text-[#ef5350]">
              Leitura semanal
            </p>
            <LeituraSemanalList items={subsidio.cabecalho.leituraSemanal} />
          </div>
        ) : null}
      </Section>

      <Section eyebrow="Desenvolvimento" title="Tópicos da lição">
        <div className="space-y-4">
          {subsidio.desenvolvimento.map((topico) => (
            <YoungTopicoCard key={topico.id} topico={topico} />
          ))}
        </div>
      </Section>

      <Section eyebrow="Condução da aula" title="Apoio ao professor">
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          <div className="space-y-4">
            {subsidio.apoioProfessor.quebraGelo ? (
              <div className="rounded-2xl border border-black/5 bg-white p-4">
                <p className="mb-2 text-xs font-bold tracking-widest uppercase text-[#ffa726]">
                  Quebra-gelo
                </p>
                <p className="text-[#555] leading-relaxed">
                  <BibleReferenceText text={subsidio.apoioProfessor.quebraGelo} />
                </p>
              </div>
            ) : null}
            {subsidio.apoioProfessor.perguntaChave ? (
              <div className="rounded-2xl border border-black/5 bg-white p-4">
                <p className="mb-2 text-xs font-bold tracking-widest uppercase text-[#ffa726]">
                  Pergunta-chave
                </p>
                <p className="text-[#555] leading-relaxed">
                  <BibleReferenceText text={subsidio.apoioProfessor.perguntaChave} />
                </p>
              </div>
            ) : null}
            {subsidio.apoioProfessor.dificuldadeProvavelDaClasse ? (
              <div className="rounded-2xl border border-black/5 bg-white p-4">
                <p className="mb-2 text-xs font-bold tracking-widest uppercase text-[#ffa726]">
                  Dificuldade provável
                </p>
                <p className="text-[#555] leading-relaxed">
                  <BibleReferenceText
                    text={subsidio.apoioProfessor.dificuldadeProvavelDaClasse}
                  />
                </p>
              </div>
            ) : null}
          </div>

          <div className="space-y-4">
            {subsidio.apoioProfessor.conducaoDaConversa?.length ? (
              <div className="rounded-2xl border border-black/5 bg-white p-4">
                <p className="mb-3 text-xs font-bold tracking-widest uppercase text-[#ef5350]">
                  Condução da conversa
                </p>
                <StringList
                  items={subsidio.apoioProfessor.conducaoDaConversa}
                  markerClassName="bg-[#ef5350]"
                />
              </div>
            ) : null}
            {subsidio.apoioProfessor.fechamento ? (
              <div className="rounded-2xl bg-[#212121] p-4 text-white">
                <p className="mb-2 text-xs font-bold tracking-widest uppercase text-[#ffa726]">
                  Fechamento
                </p>
                <p className="text-white/85 leading-relaxed">
                  <BibleReferenceText
                    text={subsidio.apoioProfessor.fechamento}
                    linkClassName="font-medium text-white underline decoration-[#ffa726]/70 underline-offset-4 transition-colors hover:text-[#ffe0b2]"
                  />
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </Section>

      {subsidio.aprofundamentoOpcional ? (
        <Section eyebrow="Aprofundamento" title="Notas para ampliar a lição">
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
            {subsidio.aprofundamentoOpcional.notaDoutrinariaCurta?.length ? (
              <div className="rounded-2xl border border-black/5 bg-white p-4">
                <p className="mb-3 text-xs font-bold tracking-widest uppercase text-[#ffa726]">
                  Nota doutrinária
                </p>
                <StringList
                  items={subsidio.aprofundamentoOpcional.notaDoutrinariaCurta}
                  markerClassName="bg-[#ffa726]"
                />
              </div>
            ) : null}
            {subsidio.aprofundamentoOpcional.contextoBiblico?.length ? (
              <div className="rounded-2xl border border-black/5 bg-white p-4">
                <p className="mb-3 text-xs font-bold tracking-widest uppercase text-[#ef5350]">
                  Contexto bíblico
                </p>
                <StringList
                  items={subsidio.aprofundamentoOpcional.contextoBiblico}
                  markerClassName="bg-[#ef5350]"
                />
              </div>
            ) : null}
            {subsidio.aprofundamentoOpcional.conexaoComVidaCrista?.length ? (
              <div className="rounded-2xl border border-black/5 bg-white p-4">
                <p className="mb-3 text-xs font-bold tracking-widest uppercase text-[#8b5b18]">
                  Conexão com a vida cristã
                </p>
                <StringList
                  items={subsidio.aprofundamentoOpcional.conexaoComVidaCrista}
                  markerClassName="bg-[#8b5b18]"
                />
              </div>
            ) : null}
          </div>
        </Section>
      ) : null}

      {subsidio.revisao ? (
        <Section eyebrow="Revisão" title="Fixação da aula">
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1fr_1fr]">
            {subsidio.revisao.horaDaRevisao?.length ? (
              <div className="rounded-2xl border border-black/5 bg-white p-4">
                <p className="mb-3 text-xs font-bold tracking-widest uppercase text-[#ffa726]">
                  Hora da revisão
                </p>
                <StringList
                  items={subsidio.revisao.horaDaRevisao}
                  markerClassName="bg-[#ffa726]"
                />
              </div>
            ) : null}
            {subsidio.revisao.quizCurto?.length ? (
              <div className="rounded-2xl border border-black/5 bg-white p-4">
                <p className="mb-3 text-xs font-bold tracking-widest uppercase text-[#ef5350]">
                  Quiz curto
                </p>
                <StringList items={subsidio.revisao.quizCurto} markerClassName="bg-[#ef5350]" />
              </div>
            ) : null}
          </div>
          {subsidio.revisao.conclusao ? (
            <div className="mt-4 rounded-2xl bg-[#212121] p-4 text-white">
              <p className="mb-2 text-xs font-bold tracking-widest uppercase text-[#ffa726]">
                Conclusão
              </p>
              <p className="text-white/85 leading-relaxed">
                {subsidio.revisao.conclusao}
              </p>
            </div>
          ) : null}
        </Section>
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
    <section className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm md:p-8">
      <div className="mb-8">
        <p className="mb-3 text-xs font-bold tracking-widest uppercase text-[#ef5350]">
          {tituloDaSecao}
        </p>
        <h2 className="mb-3 font-acme text-3xl tracking-wide text-[#212121] md:text-4xl">
          {licao.titulo}
        </h2>
        <p className="max-w-3xl text-[#555] leading-relaxed">
          {subtitulo} Lição {licao.numero} • {formatEbdDate(licao.data)}.
        </p>
      </div>

      {classe === "adultos" ? (
        <AdultSubsidy subsidio={subsidio as SubsidioAdultos} />
      ) : (
        <YoungSubsidy subsidio={subsidio as SubsidioJovens} />
      )}
    </section>
  );
}
