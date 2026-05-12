import {
  agenda2026,
  programacaoSemanal,
  type Evento,
  type ItemSemanal,
} from "@/data/agenda";
import { getSaoPauloDate } from "@/lib/date-utils";
import { getProgramacaoHref } from "@/lib/programacao-anchor";
import { getProgramacaoSemanalAtual } from "@/lib/programacao-semanal";

const mesesOrdenados = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
] as const;

const mesParaNumero: Record<string, number> = Object.fromEntries(
  mesesOrdenados.map((mes, index) => [mes, index + 1])
);

export interface EventoFuturo extends Evento {
  mes: string;
  ano: number;
}

export interface ProximoCompromisso {
  titulo: string;
  horario?: string;
  data: string;
  mes: string;
  ano: number;
  href: string;
  origem: "evento" | "programacao";
  detalhe?: string;
}

export interface AtividadeHojeNaIgreja {
  id: string;
  dia: string;
  titulo: string;
  horario?: string;
  banner?: string;
  href?: string;
  origem: "evento" | "programacao";
  detalhe?: string;
}

export interface HojeNaIgrejaUI {
  dia: string;
  titulo: string;
  atividades: AtividadeHojeNaIgreja[];
}

export interface EventosPorMesUI {
  id: string;
  ano: number;
  mes: string;
  mesNumero: number;
  label: string;
  eventos: EventoFuturo[];
}

type AgendaOccurrence = {
  id: string;
  titulo: string;
  horario?: string;
  banner?: string;
  href: string;
  origem: "evento" | "programacao";
  detalhe?: string;
  dataEvento: Date;
  data: string;
  mes: string;
  ano: number;
};

const TIPOS_EVENTO_PUBLICO = new Set<Evento["tipo"]>([
  "santa-ceia",
  "dia-das-mulheres",
  "batismo",
  "culto-com-a-mocidade",
  "congresso-circulo-de-oracao",
  "congresso-criancas",
  "evento-especial",
  "reuniao-de-obreiros",
]);

const TIPOS_EVENTO_COM_PAGINA = new Set<Evento["tipo"]>([
  ...TIPOS_EVENTO_PUBLICO,
  "curso-de-teologia",
  "reuniao-de-ministerio",
  "reuniao-de-obreiros",
]);

const diasProgramacao: Record<string, number[]> = {
  "Segunda a Sexta": [1, 2, 3, 4, 5],
  "Segunda-feira": [1],
  "Terça-feira": [2],
  "Quarta-feira": [3],
  "Quinta-feira": [4],
  "Sexta-feira": [5],
  Domingo: [0],
};

const diasSemanaPtBr = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

function primeiroDia(data: string): number {
  const match = data.match(/\d+/);
  return match ? parseInt(match[0], 10) : 1;
}

function extrairHorario(horario?: string) {
  let hora = 0;
  let minuto = 0;

  if (horario) {
    const match = horario.match(/(\d+)h(\d+)?/);
    if (match) {
      hora = parseInt(match[1], 10);
      minuto = match[2] ? parseInt(match[2], 10) : 0;
    }
  }

  return { hora, minuto };
}

function formatarData(data: Date) {
  const dia = String(data.getDate()).padStart(2, "0");
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  return `${dia}/${mes}`;
}

function formatarDataChave(data: Date) {
  return `${data.getFullYear()}-${String(data.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(data.getDate()).padStart(2, "0")}`;
}

function normalizarTexto(valor: string) {
  return valor
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function criarChaveOcorrencia(titulo: string, dataEvento: Date) {
  return `${formatarDataChave(dataEvento)}:${normalizarTexto(titulo)}`;
}

function criarIdAtividade(item: ItemSemanal, indice: number) {
  const base = `${item.dia}-${item.titulo}-${item.horario ?? indice}`;
  return normalizarTexto(base);
}

function criarIdOcorrenciaEvento(evento: EventoFuturo) {
  return `evento-${evento.slug}`;
}

function ordenarOcorrencias(
  esquerda: AgendaOccurrence,
  direita: AgendaOccurrence
) {
  const diff = esquerda.dataEvento.getTime() - direita.dataEvento.getTime();

  if (diff !== 0) {
    return diff;
  }

  if (esquerda.origem === direita.origem) {
    return esquerda.titulo.localeCompare(direita.titulo);
  }

  return esquerda.origem === "evento" ? -1 : 1;
}

function combinarOcorrencias(ocorrencias: AgendaOccurrence[]) {
  const mapa = new Map<string, AgendaOccurrence>();

  for (const ocorrencia of [...ocorrencias].sort(ordenarOcorrencias)) {
    const chave = criarChaveOcorrencia(ocorrencia.titulo, ocorrencia.dataEvento);
    const existente = mapa.get(chave);

    if (!existente) {
      mapa.set(chave, ocorrencia);
      continue;
    }

    if (existente.origem === "programacao" && ocorrencia.origem === "evento") {
      mapa.set(chave, ocorrencia);
    }
  }

  return [...mapa.values()].sort(ordenarOcorrencias);
}

function criarCompromissoEvento(evento: EventoFuturo): ProximoCompromisso {
  return {
    titulo: evento.titulo,
    horario: evento.horario,
    data: evento.data,
    mes: evento.mes,
    ano: evento.ano,
    href: `/eventos/${evento.slug}`,
    origem: "evento",
    detalhe: "Agenda especial",
  };
}

function criarOcorrenciaProgramacao(
  item: ItemSemanal,
  dataEvento: Date,
  indice: number
): AgendaOccurrence {
  return {
    id: criarIdAtividade(item, indice),
    titulo: item.titulo,
    horario: item.horario,
    banner: item.banner,
    href: getProgramacaoHref({
      dia: item.dia,
      titulo: item.titulo,
    }),
    origem: "programacao",
    detalhe: item.dia,
    dataEvento,
    data: formatarData(dataEvento),
    mes: mesesOrdenados[dataEvento.getMonth()] ?? "Janeiro",
    ano: dataEvento.getFullYear(),
  };
}

function criarOcorrenciaEvento(
  evento: EventoFuturo,
  dataEvento: Date
): AgendaOccurrence {
  return {
    id: criarIdOcorrenciaEvento(evento),
    titulo: evento.titulo,
    horario: evento.horario,
    banner: evento.banner ?? evento.imagem,
    href: `/eventos/${evento.slug}`,
    origem: "evento",
    detalhe: "Agenda especial",
    dataEvento,
    data: evento.data,
    mes: evento.mes,
    ano: evento.ano,
  };
}

function encontrarProximaOcorrenciaSemanal(
  item: ItemSemanal,
  referencia: Date,
  indice: number
): AgendaOccurrence | null {
  const dias = diasProgramacao[item.dia] ?? [];

  if (!item.horario || dias.length === 0) {
    return null;
  }

  const { hora, minuto } = extrairHorario(item.horario);

  for (let offset = 0; offset <= 7; offset += 1) {
    const dataCandidata = new Date(referencia);
    dataCandidata.setHours(0, 0, 0, 0);
    dataCandidata.setDate(dataCandidata.getDate() + offset);

    if (!dias.includes(dataCandidata.getDay())) {
      continue;
    }

    dataCandidata.setHours(hora, minuto, 0, 0);

    if (dataCandidata < referencia) {
      continue;
    }

    return criarOcorrenciaProgramacao(item, dataCandidata, indice);
  }

  return null;
}

function getProximaProgramacaoSemanal(referencia: Date) {
  const proximosCompromissos = getProgramacaoSemanalAtual(referencia)
    .map((item, indice) =>
      encontrarProximaOcorrenciaSemanal(item, referencia, indice)
    )
    .filter((item): item is AgendaOccurrence => item !== null);

  return combinarOcorrencias(proximosCompromissos)[0] ?? null;
}

function isEventoPublico(evento: EventoFuturo) {
  return TIPOS_EVENTO_PUBLICO.has(evento.tipo);
}

function isEventoComPagina(evento: EventoFuturo) {
  return TIPOS_EVENTO_COM_PAGINA.has(evento.tipo);
}

function expandirAgendaCompleta() {
  return agenda2026
    .flatMap((bloco) =>
      bloco.eventos.map((evento) => {
        const mesNumero = bloco.mesNumero ?? mesParaNumero[bloco.mes] ?? 1;
        const { hora, minuto } = extrairHorario(evento.horario);
        const dataEvento = new Date(
          bloco.ano,
          mesNumero - 1,
          primeiroDia(evento.data),
          hora,
          minuto
        );

        return {
          evento: {
            ...evento,
            mes: bloco.mes,
            ano: bloco.ano,
          } satisfies EventoFuturo,
          dataEvento,
        };
      })
    )
    .sort((a, b) => a.dataEvento.getTime() - b.dataEvento.getTime());
}

function expandirAgendaPublica() {
  return expandirAgendaCompleta().filter((item) => isEventoPublico(item.evento));
}

function getOcorrenciasEspeciaisDoDia(referencia: Date) {
  const chaveHoje = formatarDataChave(referencia);

  return expandirAgendaPublica()
    .filter((item) => formatarDataChave(item.dataEvento) === chaveHoje)
    .map((item) => criarOcorrenciaEvento(item.evento, item.dataEvento));
}

function getOcorrenciasSemanaisDoDia(referencia: Date) {
  const diaSemana = referencia.getDay();

  return getProgramacaoSemanalAtual(referencia)
    .filter((item) => (diasProgramacao[item.dia] ?? []).includes(diaSemana))
    .map((item, indice) => {
      const { hora, minuto } = extrairHorario(item.horario);
      const dataEvento = new Date(referencia);
      dataEvento.setHours(hora, minuto, 0, 0);

      return criarOcorrenciaProgramacao(item, dataEvento, indice);
    });
}

export function getEventoBySlug(slug: string) {
  return (
    expandirAgendaCompleta().find(
      (item) => isEventoComPagina(item.evento) && item.evento.slug === slug
    )?.evento ?? null
  );
}

export function getEventosAgenda() {
  return expandirAgendaCompleta()
    .filter((item) => isEventoComPagina(item.evento))
    .map((item) => item.evento);
}

export function getEventosFuturos(limite?: number) {
  const hoje = getSaoPauloDate();
  hoje.setHours(0, 0, 0, 0);

  const futuros = expandirAgendaPublica()
    .filter((item) => item.dataEvento >= hoje)
    .map((item) => item.evento);

  return typeof limite === "number" ? futuros.slice(0, limite) : futuros;
}

export function getProximoEventoPorTipo(
  tipos: ReadonlyArray<Evento["tipo"]>,
  referencia = new Date()
) {
  const agora = getSaoPauloDate(referencia);

  return (
    expandirAgendaCompleta()
      .filter(
        (item) =>
          isEventoComPagina(item.evento) &&
          tipos.includes(item.evento.tipo) &&
          item.dataEvento >= agora
      )
      .map((item) => item.evento)[0] ?? null
  );
}

export function getHojeNaIgreja(referencia = new Date()): HojeNaIgrejaUI {
  const dataReferencia = getSaoPauloDate(referencia);
  const atividades = combinarOcorrencias([
    ...getOcorrenciasSemanaisDoDia(dataReferencia),
    ...getOcorrenciasEspeciaisDoDia(dataReferencia),
  ]).map((atividade) => ({
    id: atividade.id,
    dia: atividade.origem === "evento" ? "Agenda especial" : atividade.detalhe ?? "",
    titulo: atividade.titulo,
    horario: atividade.horario,
    banner: atividade.banner,
    href: atividade.href,
    origem: atividade.origem,
    detalhe: atividade.detalhe,
  }));

  return {
    dia: diasSemanaPtBr[dataReferencia.getDay()] ?? "Hoje",
    titulo: "Hoje na Igreja",
    atividades,
  };
}

export function getNextCultoSemanal(referencia = new Date()): {
  evento: ProximoCompromisso;
  dataEvento: Date;
} | null {
  const proximaProgramacao = getProximaProgramacaoSemanal(
    getSaoPauloDate(referencia)
  );

  if (!proximaProgramacao) {
    return null;
  }

  return {
    evento: {
      titulo: proximaProgramacao.titulo,
      horario: proximaProgramacao.horario,
      data: proximaProgramacao.data,
      mes: proximaProgramacao.mes,
      ano: proximaProgramacao.ano,
      href: proximaProgramacao.href,
      origem: proximaProgramacao.origem,
      detalhe: proximaProgramacao.detalhe,
    },
    dataEvento: proximaProgramacao.dataEvento,
  };
}

export function getEventosDestaque(
  limite = 3,
  incluirFallback = true
): EventoFuturo[] {
  const futuros = getEventosFuturos();
  const destaques = futuros.filter((evento) => evento.destaque);

  if (destaques.length > 0) {
    return destaques.slice(0, limite);
  }

  return incluirFallback ? futuros.slice(0, limite) : [];
}

export function groupEventosPorMes(eventos = getEventosFuturos()): EventosPorMesUI[] {
  const agrupados = new Map<string, EventosPorMesUI>();

  for (const evento of eventos) {
    const mesNumero = mesParaNumero[evento.mes] ?? 1;
    const id = `${evento.ano}-${String(mesNumero).padStart(2, "0")}`;
    const existente = agrupados.get(id);

    if (existente) {
      existente.eventos.push(evento);
      continue;
    }

    agrupados.set(id, {
      id,
      ano: evento.ano,
      mes: evento.mes,
      mesNumero,
      label: `${evento.mes} ${evento.ano}`,
      eventos: [evento],
    });
  }

  return [...agrupados.values()].sort((a, b) => {
    if (a.ano !== b.ano) return a.ano - b.ano;
    return a.mesNumero - b.mesNumero;
  });
}

export function getProximoEventoComData(referencia = new Date()): {
  evento: ProximoCompromisso;
  dataEvento: Date;
} | null {
  const agora = getSaoPauloDate(referencia);
  const proximoEvento = expandirAgendaPublica()
    .filter((item) => item.dataEvento >= agora)
    .map((item) => criarOcorrenciaEvento(item.evento, item.dataEvento))[0];
  const proximaProgramacao = getProximaProgramacaoSemanal(agora);
  const proximoCompromisso = combinarOcorrencias(
    [proximoEvento, proximaProgramacao].filter(
      (item): item is AgendaOccurrence => item !== undefined && item !== null
    )
  )[0];

  if (!proximoCompromisso) {
    return null;
  }

  if (proximoCompromisso.origem === "evento") {
    const evento = getEventoBySlug(
      proximoCompromisso.href.replace("/eventos/", "")
    );

    if (evento) {
      return {
        evento: criarCompromissoEvento(evento),
        dataEvento: proximoCompromisso.dataEvento,
      };
    }
  }

  return {
    evento: {
      titulo: proximoCompromisso.titulo,
      horario: proximoCompromisso.horario,
      data: proximoCompromisso.data,
      mes: proximoCompromisso.mes,
      ano: proximoCompromisso.ano,
      href: proximoCompromisso.href,
      origem: proximoCompromisso.origem,
      detalhe: proximoCompromisso.detalhe,
    },
    dataEvento: proximoCompromisso.dataEvento,
  };
}

export function getCultoBySlug(slug: string): ItemSemanal | undefined {
  return programacaoSemanal.find((item) => item.slug === slug);
}

export function getCultosSlugs(): string[] {
  return programacaoSemanal.flatMap((item) => (item.slug ? [item.slug] : []));
}
