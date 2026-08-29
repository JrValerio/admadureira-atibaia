import {
  SEDE_PROGRAMACAO_HORARIOS,
  SEDE_PROGRAMACAO_LOCATION,
} from "@/data/site";

export const cursoTeologiaData = {
  suspenso: true,
  hero: {
    label: "Formação bíblica",
    title: "Curso de Teologia",
    description:
      "Um tempo de aprendizado, aprofundamento bíblico e crescimento espiritual para quem deseja conhecer mais da Palavra de Deus e servir com firmeza doutrinária, maturidade cristã e senso ministerial.",
    highlight: "Professor: Pr. Eliel Sobrinho",
  },
  presentation: {
    title: "Formação bíblica, doutrinária e ministerial",
    paragraphs: [
      "O Curso de Teologia é uma frente de ensino voltada ao fortalecimento da fé, ao amadurecimento espiritual e ao preparo de irmãos que desejam servir ao Senhor com mais entendimento, responsabilidade e reverência à Palavra.",
      "Mais do que uma sequência de aulas, o curso busca unir Bíblia aberta, reflexão doutrinária, prática cristã e consciência ministerial. A proposta é oferecer uma base consistente para que cada aluno compreenda melhor as Escrituras e cresça em sua caminhada com Deus.",
    ],
  },
  teacher: {
    name: "Pr. Eliel Sobrinho",
    role: "Professor responsável",
    photo: "/pr-eliel-sobrinho.jpg",
    photoAlt: "Pr. Eliel Sobrinho",
    summary:
      "Ministro da Palavra, conferencista e pesquisador de Hebraico, Grego e Latim. Apaixonado por literaturas e pelo ensino das Escrituras Sagradas.",
    notes: [
      "Aprofunda o estudo bíblico com base nas línguas originais — Hebraico, Grego e Latim —, buscando transmitir o conteúdo das Escrituras com rigor e clareza.",
      "Sua abordagem une pesquisa teológica, prática ministerial e paixão pelo ensino, tornando o curso acessível e edificante para todos os participantes.",
    ],
    socialLinks: {
      facebook: "https://www.facebook.com/eliel.sobrinho.1/",
      instagram: "https://www.instagram.com/eliel.sobrinho/",
    },
  },
  articles: [
    {
      slug: "soteriologia-doutrina-da-salvacao",
      title: "Soteriologia — Doutrina da Salvação",
      date: "Setembro 2010",
    },
    {
      slug: "biblia-revelacao-de-deus",
      title: "Bíblia Revelação de Deus",
      date: "Setembro 2010",
    },
    {
      slug: "quando-um-espinho-agrada-a-deus-parte-1",
      title: "Quando um Espinho Agrada a Deus — Parte 1",
      date: "Novembro 2010",
    },
    {
      slug: "quando-um-espinho-agrada-a-deus-parte-2",
      title: "Quando um Espinho Agrada a Deus — Parte 2",
      date: "Novembro 2010",
    },
    {
      slug: "as-mulheres-que-revolucionaram-uma-epoca",
      title: "As Mulheres que Revolucionaram uma Época",
      date: "Dezembro 2010",
    },
    {
      slug: "lucifer-em-isaias-14-12-17",
      title: "Lúcifer em Isaías 14:12-17",
      date: "Janeiro 2011",
    },
    {
      slug: "koinonia-x-pleonexia",
      title: "Koinõnia x Pleonexia",
      date: "Janeiro 2011",
    },
    {
      slug: "agape-o-amor-incondicional",
      title: "Ágape — O Amor Incondicional",
      date: "Janeiro 2011",
    },
    {
      slug: "a-mulher-virtuosa",
      title: "A Mulher Virtuosa",
      date: "Janeiro 2011",
    },
    {
      slug: "pregadores-ou-clones",
      title: "Pregadores ou Clones?",
      date: "Junho 2011",
    },
    {
      slug: "o-servo-da-orelha-furada",
      title: "O Servo da Orelha Furada",
      date: "Junho 2011",
    },
    {
      slug: "decisoes-decidem-destino",
      title: "Decisões Decidem Destino",
      date: "Dezembro 2011",
    },
  ],
  quickFacts: [
    {
      label: "Situação",
      value: "Turma suspensa no momento — sem previsão de retorno",
    },
    {
      label: "Professor",
      value: "Pr. Eliel Sobrinho",
    },
    {
      label: "Quando estava ativo",
      value: `Segunda-feira · ${SEDE_PROGRAMACAO_HORARIOS.cursoTeologia}`,
    },
    {
      label: "Local",
      value: SEDE_PROGRAMACAO_LOCATION,
    },
  ],
  courseDetails: [
    {
      label: "Duração",
      value: "A confirmar",
    },
    {
      label: "Formato",
      value: "A confirmar",
    },
    {
      label: "Requisitos",
      value: "A confirmar",
    },
    {
      label: "Certificação",
      value: "A confirmar",
    },
  ],
  contentTopics: [
    "Bíblia",
    "Teologia Sistemática",
    "Doutrinas Bíblicas",
    "Vida ministerial",
    "Ética cristã",
    "Hermenêutica",
    "Homilética",
    "História da Igreja",
  ],
  contact: {
    title: "Quer saber quando voltar",
    description:
      "O curso está suspenso e não há data de retorno confirmada. Para acompanhar novidades, entre em contato com a sede da igreja.",
    notes: [
      "A equipe da igreja informará se e quando uma nova turma for aberta.",
      "As informações abaixo (professor, conteúdo, artigos) seguem como referência de como o curso funcionava.",
    ],
  },
  faq: [
    {
      question: "O curso está acontecendo agora?",
      answer:
        "Não. O Curso de Teologia está suspenso no momento, sem data de retorno confirmada.",
    },
    {
      question: "Quem pode participar quando voltar?",
      answer:
        "O curso foi estruturado para irmãos, obreiros, líderes, jovens e adultos que desejam crescer no conhecimento da Palavra de Deus e avançar em formação bíblica e doutrinária.",
    },
    {
      question: "Precisa ser obreiro?",
      answer:
        "Não necessariamente. O curso busca acolher pessoas interessadas em aprender mais das Escrituras e crescer no conhecimento bíblico.",
    },
    {
      question: "Como eu fico sabendo se ele voltar?",
      answer:
        "Entre em contato com a igreja para ficar de olho — a equipe informará se e quando uma nova turma for aberta.",
    },
  ],
} as const;
