import { getVisualEvento } from "@/data/agenda-visuais";
import { validateAgenda } from "@/data/agenda-schema";
import { getEventosEspeciais2026 } from "@/data/eventos-especiais";
import { BANNERS_PROGRAMACAO } from "@/data/programacao-banners";
import {
  SEDE_EVENT_LOCATION,
  SEDE_PROGRAMACAO_HORARIOS,
} from "@/data/site";
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

export const LOCAL_EVENTO_PADRAO = SEDE_EVENT_LOCATION;

export const programacaoSemanal: ItemSemanal[] = [
  {
    dia: "Segunda a Sexta",
    titulo: "Oração Matinal",
    horario: SEDE_PROGRAMACAO_HORARIOS.oracaoMatinalSemana,
    banner: BANNERS_PROGRAMACAO.oracaoMatinal,
    slug: "oracao-matinal",
    descricao:
      "Um momento diário de busca pela presença de Deus logo no início do dia, dedicado à oração, consagração e fortalecimento espiritual para enfrentar a rotina com fé e direção.",
    convite:
      "Comece o dia na presença do Senhor. Venha orar conosco e entregar sua manhã nas mãos de Deus.",
  },
  {
    dia: "Segunda-feira",
    titulo: "Curso de Teologia",
    horario: SEDE_PROGRAMACAO_HORARIOS.cursoTeologia,
    banner: BANNERS_PROGRAMACAO.cursoTeologia,
    slug: "curso-de-teologia",
    descricao:
      "Um tempo de aprendizado e aprofundamento bíblico, voltado para quem deseja crescer no conhecimento da Palavra de Deus e amadurecer espiritualmente.",
    convite:
      "Venha aprender mais da Palavra e crescer no conhecimento de Deus. Teologia séria, Bíblia aberta e coração ensinável.",
  },
  {
    dia: "Terça-feira",
    titulo: "Culto de Ensino",
    horario: SEDE_PROGRAMACAO_HORARIOS.cultoEnsino,
    banner: BANNERS_PROGRAMACAO.cultoEnsino,
    slug: "culto-de-ensino",
    descricao:
      "Culto voltado ao ensino das Escrituras, edificação da igreja e fortalecimento da fé por meio da exposição bíblica.",
    convite:
      "Uma noite para aprender, renovar a fé e ser edificado pela Palavra. Participe conosco do Culto de Ensino.",
  },
  {
    dia: "Quarta-feira",
    titulo: "Consagração",
    horario: SEDE_PROGRAMACAO_HORARIOS.consagracao,
    banner: BANNERS_PROGRAMACAO.consagracao,
    slug: "consagracao",
    descricao:
      "Um período separado para oração, entrega, renúncia e busca da direção de Deus, fortalecendo a vida espiritual da igreja.",
    convite:
      "Separe esse tempo para buscar ao Senhor com mais intensidade. Deus honra uma vida consagrada.",
  },
  {
    dia: "Quarta-feira",
    titulo: "Círculo de Oração",
    horario: SEDE_PROGRAMACAO_HORARIOS.circuloOracao,
    banner: BANNERS_PROGRAMACAO.circuloOracao,
    slug: "circulo-de-oracao",
    descricao:
      "Culto de intercessão e clamor, marcado por oração, comunhão e busca pelo agir de Deus em favor das famílias, da igreja e das causas apresentadas.",
    convite:
      "Traga seu pedido de oração e venha clamar conosco. Há poder quando a igreja se une em oração.",
  },
  {
    dia: "Quarta-feira",
    titulo: "Ensaio das Irmãs",
    horario: SEDE_PROGRAMACAO_HORARIOS.ensaioIrmas,
    banner: BANNERS_PROGRAMACAO.ensaioIrmas,
    slug: "ensaio-das-irmas",
    descricao:
      "Momento de preparação do grupo das irmãs, com dedicação, alinhamento e adoração para servir ao Senhor com excelência.",
    convite:
      "Se você faz parte do grupo, participe desse tempo de preparo e comunhão. Servir ao Senhor também exige dedicação.",
  },
  {
    dia: "Quinta-feira",
    titulo: "Culto de Quinta",
    horario: SEDE_PROGRAMACAO_HORARIOS.quintaVitoria,
    banner: BANNERS_PROGRAMACAO.quintaVitoria,
    slug: "quinta-da-vitoria",
    descricao:
      "Culto semanal de adoração, oração e ministração da Palavra, reunindo a igreja para buscar a presença de Deus e fortalecer a fé no meio da semana.",
    convite:
      "Reserve a quinta-feira para estar em comunhão conosco. Venha cultuar, ouvir a Palavra e buscar ao Senhor em mais uma noite de fé.",
  },
  {
    dia: "Sexta-feira",
    titulo: "Tarde de Libertação",
    horario: SEDE_PROGRAMACAO_HORARIOS.tardeLibertacao,
    banner: BANNERS_PROGRAMACAO.libertacao,
    slug: "tarde-de-libertacao",
    descricao:
      "Um culto voltado à oração, libertação, cura interior e restauração, confiando no poder transformador de Deus.",
    convite:
      "Se você precisa de renovo, cura e libertação, essa tarde é para você. Venha buscar a Deus conosco.",
  },
  {
    dia: "Domingo",
    titulo: "Oração Matinal",
    horario: SEDE_PROGRAMACAO_HORARIOS.oracaoMatinalDomingo,
    banner: BANNERS_PROGRAMACAO.oracaoMatinalDomingo,
    slug: "oracao-matinal-domingo",
    descricao:
      "Momento de oração que prepara a igreja para o Dia do Senhor, consagrando o domingo ao cuidado e à direção de Deus.",
    convite:
      "Antes de tudo, oração. Venha começar o domingo na presença de Deus conosco.",
  },
  {
    dia: "Domingo",
    titulo: "Escola Bíblica Dominical (EBD)",
    horario: SEDE_PROGRAMACAO_HORARIOS.ebdDomingo,
    banner: BANNERS_PROGRAMACAO.ebd,
    slug: "escola-biblica-dominical",
    descricao:
      "A Escola Bíblica Dominical é um tempo precioso de estudo das Escrituras, aprendizado em comunidade e crescimento espiritual para todas as idades.",
    convite:
      "Domingo também é dia de aprender a Palavra. Venha para a EBD e cresça no conhecimento bíblico.",
  },
  {
    dia: "Domingo",
    titulo: "Ensaio Jovens Rios de Unção",
    horario: SEDE_PROGRAMACAO_HORARIOS.ensaioJovensDomingo,
    banner: BANNERS_PROGRAMACAO.ensaioJovens,
    slug: "ensaio-jovens-rios-de-uncao",
    descricao:
      "Encontro de preparação do grupo de jovens, fortalecendo unidade, responsabilidade e adoração com excelência.",
    convite:
      "Juventude que serve também se prepara. Participe do ensaio e venha crescer junto com o grupo Rios de Unção.",
  },
  {
    dia: "Domingo",
    titulo: "Culto da Família",
    horario: SEDE_PROGRAMACAO_HORARIOS.cultoFamiliaDomingo,
    banner: BANNERS_PROGRAMACAO.cultoFamilia,
    slug: "culto-da-familia",
    descricao:
      "Culto voltado à edificação das famílias, com louvor, Palavra, oração e comunhão, fortalecendo os lares na presença de Deus.",
    convite:
      "Traga sua família e venha cultuar conosco. O altar também é lugar de restauração para os lares.",
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
