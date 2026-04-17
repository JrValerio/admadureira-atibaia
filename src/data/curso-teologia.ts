import {
  SEDE_PROGRAMACAO_HORARIOS,
  SEDE_PROGRAMACAO_LOCATION,
} from "@/data/site";

export const cursoTeologiaData = {
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
      title: "Soteriologia — Doutrina da Salvação",
      date: "Setembro 2010",
    },
    {
      title: "Bíblia Revelação de Deus",
      date: "Setembro 2010",
    },
    {
      title: "Quando um Espinho Agrada a Deus — Parte 1",
      date: "Novembro 2010",
    },
    {
      title: "Quando um Espinho Agrada a Deus — Parte 2",
      date: "Novembro 2010",
    },
    {
      title: "As Mulheres que Revolucionaram uma Época",
      date: "Dezembro 2010",
    },
    {
      title: "Lúcifer em Isaías 14:12-17",
      date: "Janeiro 2011",
    },
    {
      title: "Koinõnia x Pleonexia",
      date: "Janeiro 2011",
    },
    {
      title: "Ágape — O Amor Incondicional",
      date: "Janeiro 2011",
    },
    {
      title: "A Mulher Virtuosa",
      date: "Janeiro 2011",
    },
    {
      title: "Pregadores ou Clones?",
      date: "Junho 2011",
    },
    {
      title: "O Servo da Orelha Furada",
      date: "Junho 2011",
    },
    {
      title: "Decisões Decidem Destino",
      date: "Dezembro 2011",
    },
  ],
  quickFacts: [
    {
      label: "Professor",
      value: "Pr. Eliel Sobrinho",
    },
    {
      label: "Dia e horário",
      value: `Segunda-feira · ${SEDE_PROGRAMACAO_HORARIOS.cursoTeologia}`,
    },
    {
      label: "Local",
      value: SEDE_PROGRAMACAO_LOCATION,
    },
    {
      label: "Público",
      value: "Jovens, adultos, obreiros, líderes e irmãos interessados em formação bíblica",
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
    title: "Informações e inscrição",
    description:
      "Para informações sobre inscrição, vagas e próximos passos, entre em contato com a sede da igreja.",
    notes: [
      "A equipe da igreja orientará sobre inscrições, vagas e próximos passos.",
      "Se houver vagas limitadas, você receberá a orientação necessária ao entrar em contato.",
    ],
  },
  faq: [
    {
      question: "Quem pode participar?",
      answer:
        "O curso foi estruturado para irmãos, obreiros, líderes, jovens e adultos que desejam crescer no conhecimento da Palavra de Deus e avançar em formação bíblica e doutrinária.",
    },
    {
      question: "Precisa ser obreiro?",
      answer:
        "Não necessariamente. O curso busca acolher pessoas interessadas em aprender mais das Escrituras e crescer no conhecimento bíblico.",
    },
    {
      question: "Tem mensalidade?",
      answer:
        "Se houver investimento, a igreja informará no momento da inscrição.",
    },
    {
      question: "Precisa fazer inscrição?",
      answer:
        "Sim. Entre em contato com a igreja para obter informações sobre as condições de participação e o processo de ingresso.",
    },
    {
      question: "Tem certificado?",
      answer:
        "A igreja orientará sobre certificado e critérios de participação no momento oportuno.",
    },
  ],
} as const;
