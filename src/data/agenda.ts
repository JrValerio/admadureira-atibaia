import { getVisualEvento } from "@/data/agenda-visuais";
import { validateAgenda } from "@/data/agenda-schema";
import { getEventosEspeciais2026 } from "@/data/eventos-especiais";
import { BANNERS_PROGRAMACAO } from "@/data/programacao-banners";
import {
  SEDE_EVENT_LOCATION,
  SEDE_PROGRAMACAO_HORARIOS,
} from "@/data/site";
import { buildBibleReferenceHref } from "@/lib/bible-reference";
import type {
  ConteudoRelacionadoLink,
  Evento,
  EventoBase,
  ItemSemanal,
  MesAgenda,
  MesAgendaBase,
  ReferenciaBiblicaLink,
} from "@/data/agenda-types";

export type {
  Evento,
  EventoBase,
  ItemSemanal,
  MesAgenda,
  MesAgendaBase,
} from "@/data/agenda-types";

export const LOCAL_EVENTO_PADRAO = SEDE_EVENT_LOCATION;

function criarBaseBiblica(
  ...referencias: string[]
): ReferenciaBiblicaLink[] {
  return referencias.map((referencia) => ({
    referencia,
    href: buildBibleReferenceHref(referencia) ?? "/espiritualidade/biblia",
  }));
}

function criarRecurso(
  label: string,
  href: string,
  descricao?: string
): ConteudoRelacionadoLink {
  return {
    label,
    href,
    ...(descricao ? { descricao } : {}),
  };
}

export const programacaoSemanal: ItemSemanal[] = [
  {
    dia: "Segunda a Sexta",
    titulo: "Oração Matinal",
    horario: SEDE_PROGRAMACAO_HORARIOS.oracaoMatinalSemana,
    banner: BANNERS_PROGRAMACAO.oracaoMatinal,
    slug: "oracao-matinal",
    descricao: [
      "A oração da manhã é o jeito mais bonito de começar o dia do lugar certo: na presença de Deus. Antes da correria, do trabalho e das preocupações, a igreja se reúne para lembrar que a força para viver não nasce da agenda, mas do Senhor que sustenta cada passo.",
      "É um altar simples, mas profundo. Gente que chega com pedidos, cansaço e expectativa sai fortalecida para enfrentar a rotina com fé, paz e direção. Quando a igreja ora cedo, ela testemunha que Deus vem antes de tudo.",
    ].join("\n\n"),
    convite:
      "Antes de qualquer compromisso, venha buscar ao Senhor conosco. Entregue sua manhã nas mãos de Deus e comece o dia com o coração fortalecido.",
    baseBiblica: criarBaseBiblica("Salmos 5:3", "Marcos 1:35"),
  },
  {
    dia: "Segunda-feira",
    titulo: "Curso de Teologia",
    horario: SEDE_PROGRAMACAO_HORARIOS.cursoTeologia,
    banner: BANNERS_PROGRAMACAO.cursoTeologia,
    slug: "curso-de-teologia",
    descricao: [
      "Uma igreja saudável não vive apenas de emoção; ela também investe em formação, doutrina e entendimento da Palavra. O Curso de Teologia existe para aprofundar a fé, organizar o pensamento bíblico e preparar homens e mulheres para servir com maturidade.",
      "Aqui o estudo não é vaidade intelectual. É reverência, responsabilidade e fome de conhecer melhor o Deus que se revelou nas Escrituras. Quando a mente é discipulada pela verdade, a vida inteira cresce em firmeza.",
    ].join("\n\n"),
    convite:
      "Se você deseja amadurecer no conhecimento bíblico e servir com mais consciência e profundidade, este tempo de estudo é para você.",
    baseBiblica: criarBaseBiblica("2 Timóteo 2:15", "Oséias 6:3"),
  },
  {
    dia: "Terça-feira",
    titulo: "Culto de Ensino",
    horario: SEDE_PROGRAMACAO_HORARIOS.cultoEnsino,
    banner: BANNERS_PROGRAMACAO.cultoEnsino,
    slug: "culto-de-ensino",
    descricao: [
      "O Culto de Ensino é uma das colunas da vida da igreja porque fé sem doutrina vira entusiasmo sem raiz. A igreja cresce de verdade quando ama a presença de Deus e, ao mesmo tempo, persevera no ensino da Palavra com reverência, escuta e disposição para obedecer.",
      "É nessa noite que dúvidas encontram direção, convicções se fortalecem e o coração aprende a discernir a vontade do Senhor com mais clareza. Aqui a Palavra não passa por nós; ela nos forma.",
    ].join("\n\n"),
    convite:
      "Venha crescer no conhecimento das Escrituras, fortalecer sua fé e ser edificado por uma Palavra que orienta, corrige e sustenta.",
    baseBiblica: criarBaseBiblica("Atos 2:42", "2 Timóteo 4:2"),
  },
  {
    dia: "Quarta-feira",
    titulo: "Consagração das Irmãs",
    horario: SEDE_PROGRAMACAO_HORARIOS.consagracao,
    banner: BANNERS_PROGRAMACAO.consagracao,
    slug: "consagracao",
    descricao: [
      "As grandes histórias da igreja quase sempre passam por mulheres de joelhos, coração sensível e vida consagrada. A consagração das irmãs é um altar de entrega, intercessão e santificação, onde a busca por Deus vem acima da pressa e do peso da rotina.",
      "Esse encontro carrega cuidado, comunhão e renovo espiritual. É o tipo de reunião que fortalece por dentro e ajuda a sustentar muita coisa que nem todo mundo vê, mas Deus vê.",
    ].join("\n\n"),
    convite:
      "Mulheres de fé, este é um tempo separado para buscar ao Senhor com mais profundidade, renovar as forças e seguir firmadas na presença de Deus.",
    baseBiblica: criarBaseBiblica("Romanos 12:1-2", "Joel 2:28"),
  },
  {
    dia: "Quarta-feira",
    titulo: "Círculo de Oração",
    horario: SEDE_PROGRAMACAO_HORARIOS.circuloOracao,
    banner: BANNERS_PROGRAMACAO.circuloOracao,
    slug: "circulo-de-oracao",
    descricao: [
      "No contexto assembleiano brasileiro, o Círculo de Oração se tornou uma das marcas mais fortes da vida pentecostal. A memória mais conhecida remete a Recife, em 1942, quando a irmã Albertina Bezerra Barreto reuniu outras mulheres para clamar ao Senhor. Desde então, esse legado de intercessão, perseverança e comunhão atravessa gerações e continua vivo na igreja.",
      "Na AD Madureira Atibaia, essa herança permanece como uma das colunas espirituais da congregação. É lugar de lágrimas sinceras, testemunhos, consolo, cura da alma e respostas que só Deus pode dar. Muita igreja continua de pé porque alguém permaneceu orando quando ninguém mais via.",
    ].join("\n\n"),
    convite:
      "Apresente sua causa ao Senhor, interceda por sua casa e venha participar de um ambiente de comunhão, clamor e busca profunda pela presença de Deus.",
    baseBiblica: criarBaseBiblica(
      "1 Tessalonicenses 5:17",
      "Tiago 5:16"
    ),
  },
  {
    dia: "Quarta-feira",
    titulo: "Ensaio das Irmãs",
    horario: SEDE_PROGRAMACAO_HORARIOS.ensaioIrmas,
    banner: BANNERS_PROGRAMACAO.ensaioIrmas,
    slug: "ensaio-das-irmas",
    descricao: [
      "O ensaio não é um bastidor vazio nem uma etapa meramente técnica. Quem ministra em louvor também ministra com preparo, unidade e reverência. Antes de subir ao púlpito, o coração aprende a servir a Deus no silêncio da dedicação.",
      "Esse momento fortalece vínculos, alinha vozes, organiza o ministério e lembra que excelência espiritual também passa pela disciplina de quem se apresenta diante do Senhor.",
    ].join("\n\n"),
    convite:
      "Se você faz parte do grupo, venha se preparar com alegria, comunhão e responsabilidade. Servir ao Senhor com louvor também é uma forma de consagração.",
    baseBiblica: criarBaseBiblica(
      "Colossenses 3:16",
      "1 Coríntios 14:40"
    ),
  },
  {
    dia: "Quinta-feira",
    titulo: "Culto da Vitória",
    horario: SEDE_PROGRAMACAO_HORARIOS.quintaVitoria,
    banner: BANNERS_PROGRAMACAO.quintaVitoria,
    slug: "quinta-da-vitoria",
    descricao: [
      "O Culto da Vitória é uma noite marcada por perseverança, jejum e clamor. É quando a igreja se reúne para lembrar que existem batalhas que não se vencem apenas com esforço humano, mas diante de Deus, em oração, quebrantamento e confiança na sua fidelidade.",
      "Ao longo do ano, este culto também abriga campanhas especiais — momentos em que a igreja se une em torno de um propósito, uma Palavra e uma crença de que Deus responde ao clamor coletivo do seu povo.",
    ].join("\n\n"),
    convite:
      "Se você tem uma causa diante de Deus, venha clamar conosco. Traga seu coração, sua casa e sua esperança para uma noite de fé, jejum e oração.",
    baseBiblica: criarBaseBiblica(
      "2 Crônicas 20:3-4",
      "Filipenses 4:6",
      "1 Tessalonicenses 5:18"
    ),
    campanha: {
      titulo: "Campanha Mulheres em Ação",
      versiculo: {
        texto: "Eu e minha casa serviremos ao Senhor.",
        referencia: "Josué 24:15",
      },
      datas: [
        { data: "23/04", preletora: "Pastora Anna Alzira Felix" },
        { data: "30/04", preletora: "Diaconisa Andreia Spaca" },
        { data: "07/05", preletora: "Missionária Eunice Motta" },
      ],
      cantoras: ["Elizama", "Jaine", "Edna", "Valéria e Filhas", "Erlândia"],
      local: "Igreja Sede — Campo de Atibaia",
      horario: "19h30",
    },
  },
  {
    dia: "Sexta-feira",
    titulo: "Culto de Libertação",
    horario: SEDE_PROGRAMACAO_HORARIOS.tardeLibertacao,
    banner: BANNERS_PROGRAMACAO.libertacao,
    slug: "tarde-de-libertacao",
    descricao: [
      "O Culto de Libertação existe porque a igreja continua crendo que Jesus restaura, quebra cadeias e devolve esperança a quem chega cansado da luta. Não é espetáculo religioso; é fé no Evangelho que alcança o interior, cura feridas profundas e chama pessoas de volta para a luz.",
      "Há tardes em que Deus visita corações oprimidos, renova a mente e fortalece vidas que já não sabiam por onde continuar. Por isso este culto é um lugar de oração, Palavra e expectativa pelo agir do Senhor.",
    ].join("\n\n"),
    convite:
      "Se você precisa de renovo, cura interior, restauração e intervenção de Deus, esta tarde é para você. Venha buscar ao Senhor e crer no seu agir poderoso.",
    baseBiblica: criarBaseBiblica("Lucas 4:18", "João 8:36"),
  },
  {
    dia: "Domingo",
    titulo: "Oração Matinal",
    horario: SEDE_PROGRAMACAO_HORARIOS.oracaoMatinalDomingo,
    banner: BANNERS_PROGRAMACAO.oracaoMatinalDomingo,
    slug: "oracao-matinal-domingo",
    descricao: [
      "O domingo começa melhor quando começa no altar. Antes da Escola Bíblica, antes do reencontro da igreja e antes de toda a programação do Dia do Senhor, a congregação se reúne para consagrar o coração a Deus em oração.",
      "É um tempo simples, mas profundamente necessário. Menos ruído, mais presença; menos pressa, mais sensibilidade espiritual para tudo o que o Senhor deseja fazer ao longo do dia.",
    ].join("\n\n"),
    convite:
      "Venha preparar o coração em oração para tudo o que Deus fará ao longo do domingo. Comece o Dia do Senhor na presença dEle.",
    baseBiblica: criarBaseBiblica(
      "Salmos 63:1",
      "Lamentações 3:22-23"
    ),
  },
  {
    dia: "Domingo",
    titulo: "Escola Bíblica Dominical (EBD)",
    horario: SEDE_PROGRAMACAO_HORARIOS.ebdDomingo,
    banner: BANNERS_PROGRAMACAO.ebd,
    slug: "escola-biblica-dominical",
    descricao: [
      "A Escola Bíblica Dominical carrega uma herança preciosa do ensino cristão no Brasil. Uma das referências históricas mais lembradas remete a Petrópolis, em 1855, com o trabalho do casal Robert e Sarah Kalley, mostrando que a formação bíblica sempre foi tratada como investimento real na vida da igreja e das famílias.",
      "Na AD Madureira Atibaia, essa herança continua viva todos os domingos. A Palavra é estudada com seriedade, as classes acompanham o trimestre com clareza e a igreja segue aprendendo junta ao longo da semana.",
    ].join("\n\n"),
    convite:
      "Traga sua família para aprender a Palavra com profundidade, comunhão e propósito. A EBD é lugar de crescimento, convicção e transformação pela verdade bíblica.",
    baseBiblica: criarBaseBiblica(
      "Atos 2:42",
      "2 Timóteo 3:16-17",
      "Oséias 6:3"
    ),
    recursos: [
      criarRecurso(
        "Abrir a área da EBD",
        "/ebd",
        "Acesse classes, trimestres e o estudo da semana."
      ),
    ],
  },
  {
    dia: "Domingo",
    titulo: "Ensaio com os Jovens",
    horario: SEDE_PROGRAMACAO_HORARIOS.ensaioJovensDomingo,
    banner: BANNERS_PROGRAMACAO.ensaioJovens,
    slug: "ensaio-jovens-rios-de-uncao",
    descricao: [
      "Juventude não é só fase; é força que precisa de direção. O ensaio com os jovens é um espaço de preparo, comunhão e responsabilidade, onde dons e talentos são alinhados para servir ao Senhor com reverência e alegria.",
      "No grupo Rios de Unção, o ensaio também se torna ambiente de discipulado, convivência e amadurecimento. Quando o jovem entende que servir exige compromisso, o talento deixa de ser impulso e passa a ser oferta no altar.",
    ].join("\n\n"),
    convite:
      "Jovens que desejam servir ao Senhor com excelência encontram aqui um tempo de preparo, unidade e crescimento. Venha participar conosco.",
    baseBiblica: criarBaseBiblica(
      "Eclesiastes 12:1",
      "Colossenses 3:16"
    ),
  },
  {
    dia: "Domingo",
    titulo: "Culto da Família",
    horario: SEDE_PROGRAMACAO_HORARIOS.cultoFamiliaDomingo,
    banner: BANNERS_PROGRAMACAO.cultoFamilia,
    slug: "culto-da-familia",
    descricao: [
      "Encerrar o domingo na casa de Deus, ao lado da família, é mais do que tradição: é decisão espiritual. Em um tempo de pressa, distrações e desgastes silenciosos, o culto da família chama os lares de volta ao altar, à comunhão e à direção do Senhor.",
      "É uma noite de Palavra, adoração e restauração, onde pais, mães, filhos e irmãos se colocam juntos diante de Deus para reafirmar que a casa continua pertencendo a Ele.",
    ].join("\n\n"),
    convite:
      "Traga sua família para uma noite de adoração, comunhão e Palavra. O altar também é lugar de restauração, esperança e fortalecimento para os lares.",
    baseBiblica: criarBaseBiblica(
      "Josué 24:15",
      "Hebreus 10:25",
      "Salmos 128:1-4"
    ),
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
