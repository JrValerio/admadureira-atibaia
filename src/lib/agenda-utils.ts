import { agenda2026, programacaoSemanal, type Evento, type ItemSemanal } from "@/data/agenda";

const mesParaNumero: Record<string, number> = {
  Janeiro: 1,
  Fevereiro: 2,
  Março: 3,
  Abril: 4,
  Maio: 5,
  Junho: 6,
  Julho: 7,
  Agosto: 8,
  Setembro: 9,
  Outubro: 10,
  Novembro: 11,
  Dezembro: 12,
};

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

const diasProgramacao: Record<string, number[]> = {
  "Segunda a Sexta": [1, 2, 3, 4, 5],
  "Segunda-feira": [1],
  "Terça-feira": [2],
  "Quarta-feira": [3],
  "Quinta-feira": [4],
  "Sexta-feira": [5],
  Domingo: [0],
};

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

function criarCompromissoEvento(evento: EventoFuturo): ProximoCompromisso {
  return {
    titulo: evento.titulo,
    horario: evento.horario,
    data: evento.data,
    mes: evento.mes,
    ano: evento.ano,
    href: `/eventos/${evento.slug}`,
    origem: "evento",
  };
}

function encontrarProximaOcorrenciaSemanal(
  item: ItemSemanal,
  referencia: Date
): Date | null {
  const dias = diasProgramacao[item.dia] ?? [];

  if (!item.horario || dias.length === 0) {
    return null;
  }

  const { hora, minuto } = extrairHorario(item.horario);
  let proximaOcorrencia: Date | null = null;

  for (let offset = 0; offset <= 7; offset += 1) {
    const dataCandidata = new Date(referencia);
    dataCandidata.setDate(referencia.getDate() + offset);
    dataCandidata.setHours(hora, minuto, 0, 0);

    if (!dias.includes(dataCandidata.getDay())) {
      continue;
    }

    if (dataCandidata <= referencia) {
      continue;
    }

    if (!proximaOcorrencia || dataCandidata < proximaOcorrencia) {
      proximaOcorrencia = dataCandidata;
    }
  }

  return proximaOcorrencia;
}

function getProximaProgramacaoSemanal(referencia: Date) {
  const proximosCompromissos = programacaoSemanal
    .map((item) => {
      const dataEvento = encontrarProximaOcorrenciaSemanal(item, referencia);

      if (!dataEvento) {
        return null;
      }

      return {
        evento: {
          titulo: item.titulo,
          horario: item.horario,
          data: formatarData(dataEvento),
          mes: Object.keys(mesParaNumero)[dataEvento.getMonth()],
          ano: dataEvento.getFullYear(),
          href: "/programacao",
          origem: "programacao" as const,
          detalhe: item.dia,
        } satisfies ProximoCompromisso,
        dataEvento,
      };
    })
    .filter((item) => item !== null);

  return proximosCompromissos.sort((a, b) => a.dataEvento.getTime() - b.dataEvento.getTime())[0] ?? null;
}

function expandirAgenda() {
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

export function getEventoBySlug(slug: string) {
  return expandirAgenda().find((item) => item.evento.slug === slug)?.evento ?? null;
}

export function getEventosAgenda() {
  return expandirAgenda().map((item) => item.evento);
}

export function getEventosFuturos(limite?: number) {
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  const futuros = expandirAgenda()
    .filter((item) => item.dataEvento >= hoje)
    .map((item) => item.evento);

  return typeof limite === "number" ? futuros.slice(0, limite) : futuros;
}

export function getProximoEventoComData(): {
  evento: ProximoCompromisso;
  dataEvento: Date;
} | null {
  const agora = new Date();
  const proximoEvento = expandirAgenda().find((item) => item.dataEvento > agora);
  const proximaProgramacao = getProximaProgramacaoSemanal(agora);

  if (!proximoEvento) {
    return proximaProgramacao;
  }

  if (!proximaProgramacao) {
    return {
      evento: criarCompromissoEvento(proximoEvento.evento),
      dataEvento: proximoEvento.dataEvento,
    };
  }

  if (proximoEvento.dataEvento <= proximaProgramacao.dataEvento) {
    return {
      evento: criarCompromissoEvento(proximoEvento.evento),
      dataEvento: proximoEvento.dataEvento,
    };
  }

  return proximaProgramacao;
}

export function getProximosEventos(limite = 4) {
  return getEventosFuturos(limite);
}
