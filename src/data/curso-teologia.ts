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
      "A página já está preparada para receber os detalhes oficiais da coordenação do curso. Enquanto isso, ela reúne as informações confirmadas pela programação atual da igreja e organiza os pontos que serão completados com a resposta do professor responsável.",
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
      "A foto oficial do professor já integra a página. A biografia ministerial completa e os detalhes finais do curso serão adicionados assim que a coordenação enviar o material complementar.",
      "Enquanto isso, os interessados já podem registrar contato com a igreja para receber informações sobre aulas, inscrições e próximos passos.",
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
      value: "Em atualização pela coordenação",
    },
    {
      label: "Formato",
      value: "Informação oficial em atualização",
    },
    {
      label: "Requisitos",
      value: "Serão informados pela coordenação do curso",
    },
    {
      label: "Certificação",
      value: "Em confirmação com a equipe responsável",
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
      "A página já está pronta para receber os dados finais de inscrição, valor e certificação. Até lá, a igreja pode orientar os interessados sobre o curso, vagas e próximos passos.",
    notes: [
      "WhatsApp e forma oficial de inscrição serão adicionados assim que forem confirmados pela coordenação.",
      "Se houver lista de interesse ou vagas limitadas, esta seção será atualizada com prioridade.",
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
        "Sim. A página já está preparada para receber o fluxo oficial de inscrição assim que ele for definido.",
    },
    {
      question: "Tem certificado?",
      answer:
        "A política de certificação ainda será confirmada pela coordenação e será publicada aqui quando estiver alinhada oficialmente.",
    },
  ],
} as const;
