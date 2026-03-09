import { getVisualEvento } from "@/data/agenda-visuais";
import { validateAgenda } from "@/data/agenda-schema";
import { gerarAgendaRecorrente } from "@/data/agenda-recorrente";
import { getEventosEspeciais2026 } from "@/data/eventos-especiais";
import { BANNERS_PROGRAMACAO } from "@/data/programacao-banners";
import type {
  Evento,
  EventoBase,
  ItemSemanal,
  MesAgenda,
  MesAgendaBase,
} from "@/data/agenda-types";

export type {
  Evento,
  EventoBase,
  ItemSemanal,
  MesAgenda,
  MesAgendaBase,
} from "@/data/agenda-types";

export const LOCAL_EVENTO_PADRAO =
  "Sede - Praça Pio XII, 122, Centro, Atibaia/SP";

export const programacaoSemanal: ItemSemanal[] = [
  {
    dia: "Segunda a Sexta",
    titulo: "Oração Matinal",
    horario: "06h00 – 07h00",
    icone: "🙏",
    banner: BANNERS_PROGRAMACAO.oracaoMatinal,
  },
  {
    dia: "Segunda-feira",
    titulo: "Curso de Teologia",
    horario: "19h30",
    icone: "📘",
    banner: BANNERS_PROGRAMACAO.cursoTeologia,
  },
  {
    dia: "Terça-feira",
    titulo: "Culto de Ensino",
    horario: "19h30",
    icone: "📖",
    banner: BANNERS_PROGRAMACAO.cultoEnsino,
  },
  {
    dia: "Quarta-feira",
    titulo: "Consagração",
    horario: "09h00",
    icone: "🙏",
    banner: BANNERS_PROGRAMACAO.consagracao,
  },
  {
    dia: "Quarta-feira",
    titulo: "Círculo de Oração",
    horario: "15h00",
    icone: "🙏",
    banner: BANNERS_PROGRAMACAO.circuloOracao,
  },
  {
    dia: "Quarta-feira",
    titulo: "Ensaio das Irmãs",
    horario: "19h00",
    icone: "🎵",
    banner: BANNERS_PROGRAMACAO.ensaioIrmas,
  },
  {
    dia: "Quinta-feira",
    titulo: "Quinta da Vitória",
    horario: "19h30",
    icone: "🔥",
    banner: BANNERS_PROGRAMACAO.quintaVitoria,
  },
  {
    dia: "Sexta-feira",
    titulo: "Tarde de Libertação",
    horario: "14h30",
    icone: "🕊️",
    banner: BANNERS_PROGRAMACAO.libertacao,
  },
  {
    dia: "Domingo",
    titulo: "Oração Matinal",
    horario: "08h00",
    icone: "🌅",
    banner: BANNERS_PROGRAMACAO.oracaoMatinalDomingo,
  },
  {
    dia: "Domingo",
    titulo: "Escola Bíblica Dominical",
    horario: "09h00",
    icone: "📖",
    banner: BANNERS_PROGRAMACAO.ebd,
  },
  {
    dia: "Domingo",
    titulo: "Ensaio Jovens Rios de Unção",
    horario: "11h00",
    icone: "🎵",
    banner: BANNERS_PROGRAMACAO.ensaioJovens,
  },
  {
    dia: "Domingo",
    titulo: "Culto da Família",
    horario: "18h30",
    icone: "🏠",
    banner: BANNERS_PROGRAMACAO.cultoFamilia,
  },
  {
    dia: "1ª Segunda do mês",
    titulo: "Reunião de Ministério",
    icone: "👥",
    banner: BANNERS_PROGRAMACAO.reuniaoMinisterio,
  },
  {
    dia: "2º Sábado",
    titulo: "Santa Ceia",
    icone: "🍞",
    banner: BANNERS_PROGRAMACAO.santaCeia,
  },
  {
    dia: "3º Sábado",
    titulo: "Reunião de Obreiros",
    icone: "👔",
    banner: BANNERS_PROGRAMACAO.reuniaoObreiros,
  },
  {
    dia: "4º Sábado",
    titulo: "Culto com a Mocidade",
    icone: "🔥",
    banner: BANNERS_PROGRAMACAO.cultoJovens,
  },
];

function primeiroDia(data: string) {
  const match = data.match(/\d+/);
  return match ? parseInt(match[0], 10) : 1;
}

function mergeMeses(blocos: MesAgendaBase[]): MesAgendaBase[] {
  const mapa = new Map<string, MesAgendaBase>();

  for (const bloco of blocos) {
    const chave = `${bloco.ano}-${bloco.mesNumero ?? bloco.mes}`;
    const atual = mapa.get(chave);

    if (atual) {
      atual.eventos.push(...bloco.eventos);
    } else {
      mapa.set(chave, {
        ...bloco,
        eventos: [...bloco.eventos],
      });
    }
  }

  return [...mapa.values()]
    .map((bloco) => ({
      ...bloco,
      eventos: [...bloco.eventos].sort(
        (a, b) => primeiroDia(a.data) - primeiroDia(b.data)
      ),
    }))
    .sort((a, b) => {
      if (a.ano !== b.ano) return a.ano - b.ano;
      return (a.mesNumero ?? 0) - (b.mesNumero ?? 0);
    });
}

const agendaBase2026 = validateAgenda(
  mergeMeses([
    ...gerarAgendaRecorrente(2026, [3, 4, 5, 6], LOCAL_EVENTO_PADRAO),
    ...getEventosEspeciais2026(LOCAL_EVENTO_PADRAO),
  ])
);

export const agenda2026: MesAgenda[] = agendaBase2026.map((mes) => ({
  ...mes,
  eventos: mes.eventos.map((evento: EventoBase): Evento => ({
    ...evento,
    ...getVisualEvento(evento.tipo),
  })),
}));
