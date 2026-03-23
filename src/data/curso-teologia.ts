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
      "O curso será conduzido pelo Pr. Eliel Sobrinho, com foco em ensino bíblico, fortalecimento doutrinário e edificação da igreja por meio da Palavra de Deus.",
    notes: [
      "A biografia ministerial do Pr. Eliel Sobrinho será publicada em breve.",
      "Para informações sobre inscrições e aulas, entre em contato com a sede da igreja.",
    ],
    socialLinks: {
      facebook: "https://www.facebook.com/eliel.sobrinho.1/",
      instagram: "https://www.instagram.com/eliel.sobrinho/",
    },
  },
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
      "O canal oficial de inscrição será comunicado pela coordenação do curso.",
      "Em caso de vagas limitadas, a coordenação orientará sobre a lista de interesse.",
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
        "Não necessariamente. A participação seguirá as orientações oficiais da coordenação, mas a proposta do curso é acolher pessoas interessadas em aprender mais das Escrituras.",
    },
    {
      question: "Tem mensalidade?",
      answer:
        "As informações sobre investimento, se houver, serão confirmadas pela coordenação do curso e atualizadas nesta página.",
    },
    {
      question: "Precisa fazer inscrição?",
      answer:
        "Sim. Entre em contato com a igreja para obter informações sobre as condições de participação e o processo de ingresso.",
    },
    {
      question: "Tem certificado?",
      answer:
        "A política de certificação ainda será confirmada pela coordenação e será publicada aqui quando estiver alinhada oficialmente.",
    },
  ],
} as const;
