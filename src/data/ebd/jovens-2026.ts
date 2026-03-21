import type {
  LeituraSemanalItem,
  LicaoEBD,
  TrimestreEBD,
} from "./types";
import {
  getEbdLessonImagePath,
  getEbdQuarterCoverPath,
} from "./assets";
import { normalizeBibleReferenceNotation } from "@/lib/bible-reference";

type LicaoSeed = {
  numero: number;
  data: string;
  titulo: string;
  resumo: string;
  textoChave: string;
  verdadePratica: string;
  leituraBiblica: string[];
  aplicacao: string;
  enfase: string;
};

type JovensEditorialConfig = {
  imagem?: string;
  objetivos: LicaoEBD["objetivos"];
  topicos: LicaoEBD["topicos"];
  apoioProfessor: string[];
  apoioAluno: string[];
  esboco: NonNullable<LicaoEBD["esboco"]>;
  subsidioJovens: NonNullable<LicaoEBD["subsidioJovens"]>;
};

type PlaceholderQuarterConfig = {
  slug: string;
  trimestre: TrimestreEBD["trimestre"];
  imagem: string;
};

type CriarLicaoJovensOptions = {
  edicao?: string;
  statusEditorial?: LicaoEBD["statusEditorial"];
  dataLiberacaoPublica?: string;
};

type LicaoSeedJovensSegundoTrimestre = {
  numero: number;
  data: string;
  titulo: string;
  resumo: string;
  textoPrincipal: string;
  leituraSemanal: LeituraSemanalItem[];
  verdadePratica: string;
  aplicacao: string;
  enfase: string;
};

const apoioProfessorBase = [
  "Relacione a lição com escolhas reais da juventude e incentive conversa honesta em classe.",
  "Conduza o encerramento com oração específica, aplicação prática e acompanhamento pastoral.",
];

const apoioAlunoBase = [
  "Leve anotações da sua leitura da semana e compartilhe uma dúvida ou decisão durante a aula.",
  "Conte a alguém da classe como pretende aplicar a lição durante os próximos dias.",
];

function normalizeReferences(referencias: string[]) {
  return referencias.map((referencia) =>
    normalizeBibleReferenceNotation(referencia)
  );
}

function normalizeYoungSubsidy(
  subsidio: NonNullable<LicaoEBD["subsidioJovens"]>
) {
  return {
    ...subsidio,
    cabecalho: {
      ...subsidio.cabecalho,
      textoPrincipal: subsidio.cabecalho.textoPrincipal
        ? normalizeBibleReferenceNotation(subsidio.cabecalho.textoPrincipal)
        : subsidio.cabecalho.textoPrincipal,
      leituraSemanal: subsidio.cabecalho.leituraSemanal?.map((item) => ({
        ...item,
        referencia: normalizeBibleReferenceNotation(item.referencia),
      })),
    },
  };
}

const objetivosJovensLicao1 = [
  "Apresentar o conceito bíblico de salvação.",
  "Reconhecer que Deus levantou salvadores para o povo de Israel.",
  "Compreender o sentido pleno da salvação em Cristo.",
];

const topicosJovensLicao1 = [
  {
    titulo: "O conceito bíblico da salvação",
    conteudo: [
      "Na Bíblia, salvação comunica livramento, resgate e intervenção misericordiosa de Deus em favor do seu povo.",
      "Desde o Éden, o Senhor sinaliza que não abandonaria a humanidade ao domínio do pecado, mas revelaria seu plano redentor ao longo da história.",
      "O conceito bíblico de salvação não nasce da autonomia humana, e sim da iniciativa de Deus, que vê, ouve e age para libertar.",
    ],
  },
  {
    titulo: "Deus levanta salvadores para o seu povo",
    conteudo: [
      "No Antigo Testamento, Deus levantou juízes, profetas e líderes para livramentos concretos, mostrando que a salvação vem dEle.",
      "Os juízes libertavam Israel em meio à opressão, Samuel intercedia em favor do povo e Davi enfrentava gigantes em nome do Senhor dos Exércitos.",
      "Esses salvadores históricos apontavam para algo maior: Deus preparava o caminho para a salvação plena que seria revelada em Cristo.",
    ],
  },
  {
    titulo: "O sentido pleno da salvação em Cristo",
    conteudo: [
      "Em Jesus, a salvação deixa de ser apenas livramento temporal e se manifesta como redenção do pecado, reconciliação com Deus e vida eterna.",
      "João 3.16 mostra que o coração do Evangelho é o amor de Deus que entrega o Filho para salvar, e não para condenar.",
      "Cristo cumpre o anúncio feito em Gênesis 3.15: Ele vence o mal, restaura o relacionamento com Deus e oferece nova vida aos que creem.",
    ],
  },
];

const subsidioJovensLicao1: LicaoEBD["subsidioJovens"] = {
  cabecalho: {
    numero: 1,
    titulo: "O Conceito Bíblico da Salvação",
    data: "2026-01-04",
    trimestre: "Plano Perfeito — A Salvação da Humanidade, a Mensagem Central das Escrituras",
    textoPrincipal:
      "Gênesis 3.15 já anuncia, desde o princípio, que Deus pisaria a cabeça da serpente por meio da descendência prometida.",
    resumoDaLicao:
      "A salvação, na Bíblia, é o livramento de Deus que começa a ser anunciado no Antigo Testamento e se cumpre plenamente em Jesus Cristo.",
    leituraSemanal: [
      {
        dia: "Segunda",
        referencia: "Juízes 2.16-22",
        foco: "Deus levanta libertadores em meio à infidelidade do seu povo.",
      },
      {
        dia: "Terça",
        referencia: "1 Samuel 7.9",
        foco: "A salvação também aparece ligada à intercessão e à ação misericordiosa do Senhor.",
      },
      {
        dia: "Quarta",
        referencia: "1 Samuel 17.45",
        foco: "O livramento vem do nome do Senhor, e não da força humana.",
      },
      {
        dia: "Quinta",
        referencia: "Salmos 39.8",
        foco: "O salmista reconhece em Deus o único libertador confiável.",
      },
      {
        dia: "Sexta",
        referencia: "Isaías 43.11",
        foco: "Só o Senhor salva; não existe outro salvador além dEle.",
      },
      {
        dia: "Sábado",
        referencia: "João 3.16",
        foco: "Em Cristo, a salvação alcança seu sentido pleno e eterno.",
      },
    ],
  },
  arranquePedagogico: {
    objetivos: objetivosJovensLicao1,
    interacao:
      "A primeira aula do trimestre precisa mostrar que salvação não é jargão religioso. É a resposta de Deus ao drama humano, revelada progressivamente até chegar à plenitude em Cristo.",
    orientacaoPedagogica:
      "Comece perguntando o que os alunos entendem por salvação. Anote respostas como livramento, perdão, mudança de vida e vida eterna. Em seguida, mostre como o Antigo Testamento já trabalha a ideia de livramento, preparando a compreensão plena do Evangelho no Novo Testamento.",
  },
  desenvolvimento: [
    {
      id: "conceito-biblico",
      titulo: "O conceito bíblico da salvação",
      sinopse:
        "Salvação é o ato misericordioso de Deus que resgata o ser humano do pecado, da culpa e da perdição.",
      explicacaoBiblica: [
        "Gênesis 3.15 estabelece a primeira promessa redentora ao anunciar a derrota final da serpente.",
        "O vocabulário bíblico de salvação envolve libertação real, proteção e intervenção divina em favor do seu povo.",
        "Desde cedo, a Escritura ensina que o homem não se salva a si mesmo; depende da graça de Deus.",
      ],
      aplicacaoPratica: [
        "Ajude a turma a perceber que a salvação não é apenas um tema doutrinário, mas a base da esperança cristã.",
        "Incentive os alunos a testemunharem como Deus os resgatou de medo, culpa ou afastamento espiritual.",
      ],
      pense:
        "Quando você fala em salvação, pensa só em ir para o céu ou também em viver hoje debaixo do resgate de Deus?",
      pontoImportante:
        "A salvação bíblica começa na iniciativa de Deus e nunca na autossuficiência humana.",
    },
    {
      id: "salvadores-no-antigo-testamento",
      titulo: "Deus levanta salvadores para o seu povo",
      sinopse:
        "Os livramentos do Antigo Testamento mostram o cuidado de Deus e apontam para uma salvação maior.",
      explicacaoBiblica: [
        "Juízes 2 mostra que o Senhor levantava libertadores quando Israel se arrependia em meio à opressão.",
        "Samuel intercede e Davi enfrenta Golias em nome do Senhor, revelando que a vitória pertence a Deus.",
        "Esses episódios não substituem Cristo, mas preparam o entendimento do agir salvador de Deus na história.",
      ],
      aplicacaoPratica: [
        "Mostre que Deus continua sendo o libertador do seu povo e que nossa confiança deve descansar nEle.",
        "Leve a turma a identificar situações em que tenta vencer batalhas espirituais na força própria, e não na dependência do Senhor.",
      ],
      pense:
        "Quais áreas da sua vida ainda estão sendo enfrentadas como se dependessem só da sua força?",
      pontoImportante:
        "Os salvadores levantados por Deus no Antigo Testamento apontavam para o Salvador definitivo.",
    },
    {
      id: "plenitude-em-cristo",
      titulo: "O sentido pleno da salvação em Cristo",
      sinopse:
        "A obra de Jesus leva a salvação ao seu ponto máximo: perdão, reconciliação e vida eterna.",
      explicacaoBiblica: [
        "João 3.16-17 mostra que o envio do Filho nasce do amor de Deus e tem como alvo a salvação do mundo.",
        "Cristo derrota o pecado e a condenação, oferecendo nova vida aos que creem em seu nome.",
        "A promessa do Éden encontra em Jesus seu cumprimento histórico e redentor.",
      ],
      aplicacaoPratica: [
        "Convide os alunos a responderem ao Evangelho com fé viva, e não apenas com familiaridade religiosa.",
        "Mostre que a salvação em Cristo muda presente e futuro: reconcilia hoje e garante esperança eterna.",
      ],
      pense:
        "Sua relação com Jesus é a de quem admira a mensagem ou a de quem recebeu dEle a salvação?",
      pontoImportante:
        "Não existe salvação plena fora de Cristo, porque somente Ele cumpre o plano redentor de Deus.",
    },
  ],
  apoioProfessor: {
    quebraGelo:
      "Peça à turma que defina salvação em uma frase e use as respostas para abrir a aula.",
    perguntaChave:
      "Como a ideia de salvação se desenvolve das experiências de livramento no Antigo Testamento até a obra completa de Cristo?",
    dificuldadeProvavelDaClasse:
      "Alguns jovens podem reduzir salvação a experiência emocional do passado ou apenas a destino futuro, sem perceber sua centralidade no presente.",
    conducaoDaConversa: [
      "Mostre a linha que vai do protoevangelho em Gênesis 3.15 aos salvadores do Antigo Testamento e chega à plenitude em Jesus.",
      "Enfatize que livramento histórico e redenção eterna não competem; o primeiro prepara o entendimento do segundo.",
      "Evite linguagem vaga e mantenha Cristo no centro da explicação.",
    ],
    fechamento:
      "Conclua reforçando que a salvação bíblica nasce da graça de Deus, se desenvolve na história da redenção e se cumpre plenamente em Jesus Cristo.",
  },
  aprofundamentoOpcional: {
    notaDoutrinariaCurta: [
      "No Antigo Testamento, salvação frequentemente aparece com sentido de livramento, proteção e intervenção de Deus.",
      "No Novo Testamento, a salvação alcança expressão plena em Cristo, envolvendo perdão, reconciliação e vida eterna.",
    ],
    contextoBiblico: [
      "Gênesis 3.15 é tradicionalmente chamado de protoevangelho por anunciar, em germe, a derrota do mal e a esperança redentora.",
      "Os juízes e libertadores de Israel ajudam a classe a perceber como Deus já se revelava como Salvador antes da encarnação do Filho.",
    ],
    conexaoComVidaCrista: [
      "Jovens precisam aprender a falar de salvação com profundidade bíblica e não apenas com frases prontas.",
      "Compreender o conceito bíblico da salvação fortalece evangelização, gratidão e segurança espiritual.",
    ],
  },
  revisao: {
    horaDaRevisao: [
      "O que a Bíblia quer dizer quando fala de salvação?",
      "Como Deus levantou salvadores para o seu povo no Antigo Testamento?",
      "Por que Cristo é o cumprimento pleno da salvação?",
      "O que muda quando entendemos salvação como obra de Deus e não como mérito humano?",
    ],
    quizCurto: [
      "A salvação começa no esforço humano ou na iniciativa de Deus? Resposta esperada: na iniciativa de Deus.",
      "Os salvadores do Antigo Testamento substituem Cristo? Resposta esperada: não; apontam para Ele.",
      "Onde a salvação alcança seu sentido pleno? Resposta esperada: em Jesus Cristo.",
    ],
    conclusao:
      "A salvação é a grande resposta de Deus ao pecado humano, anunciada desde o princípio e consumada em Cristo para todos os que creem.",
  },
};

const objetivosJovensLicao2 = [
  "Apresentar a origem do pecado na humanidade.",
  "Apontar as consequências do pecado.",
  "Saber que a solução de Deus para as consequências do pecado envolve a restauração do relacionamento com Deus, além da remoção da culpa e da vergonha.",
];

const topicosJovensLicao2 = [
  {
    titulo: "A origem do pecado na humanidade",
    conteudo: [
      "O pecado entrou na história humana quando o ser humano escolheu desobedecer a Deus, ouvindo a voz da serpente e rejeitando a palavra do Criador.",
      "A queda mostra que o pecado não é acidente inevitável, mas ruptura moral e espiritual provocada pela rebelião contra Deus.",
      "Desde então, a humanidade passou a carregar uma inclinação pecaminosa que afeta mente, vontade, afetos e relações.",
    ],
  },
  {
    titulo: "As consequências do pecado",
    conteudo: [
      "O pecado produz separação de Deus, culpa, vergonha, sofrimento e morte.",
      "Ele distorce a percepção humana, quebra relacionamentos e faz o coração fugir da presença do Senhor.",
      "A Bíblia não trata o pecado como tropeço superficial, mas como realidade grave que arruína a vida longe da graça.",
    ],
  },
  {
    titulo: "A solução de Deus para as consequências do pecado",
    conteudo: [
      "Em Cristo, Deus restaura o relacionamento rompido, remove a culpa e oferece uma nova vida reconciliada.",
      "A cruz não é remendo moral; é o centro da resposta divina ao pecado humano.",
      "A salvação não apenas perdoa o passado, mas inaugura uma existência renovada em comunhão com Deus.",
    ],
  },
];

const subsidioJovensLicao2: LicaoEBD["subsidioJovens"] = {
  cabecalho: {
    numero: 2,
    titulo: "O Problema do Pecado",
    data: "2026-01-11",
    trimestre: "Plano Perfeito — A Salvação da Humanidade, a Mensagem Central das Escrituras",
    textoPrincipal:
      "Romanos 3.23 declara que todos pecaram e carecem da glória de Deus, mostrando a universalidade do problema humano.",
    resumoDaLicao:
      "O pecado separa, mas Cristo restaura: Ele é a solução divina para a culpa, o sofrimento e a morte que assolam a humanidade.",
    leituraSemanal: [
      {
        dia: "Segunda",
        referencia: "Gênesis 2.16-17",
        foco: "A ordem divina evidencia a responsabilidade moral do ser humano diante de Deus.",
      },
      {
        dia: "Terça",
        referencia: "Romanos 1.22-23",
        foco: "A rebelião humana troca a glória de Deus por falsas adorações.",
      },
      {
        dia: "Quarta",
        referencia: "Romanos 3.23; 5.12",
        foco: "O pecado alcança toda a humanidade e introduz a morte na experiência humana.",
      },
      {
        dia: "Quinta",
        referencia: "Isaías 59.2",
        foco: "O pecado rompe a comunhão e produz separação de Deus.",
      },
      {
        dia: "Sexta",
        referencia: "Gálatas 6.15; Efésios 2.15; Colossenses 3.10",
        foco: "Em Cristo, Deus cria uma nova realidade para quem foi alcançado pela salvação.",
      },
      {
        dia: "Sábado",
        referencia: "2 Coríntios 5.18-19",
        foco: "A reconciliação em Cristo responde ao drama da culpa e da separação.",
      },
    ],
  },
  arranquePedagogico: {
    objetivos: objetivosJovensLicao2,
    interacao:
      "A lição precisa tratar o pecado sem superficialidade e sem desespero. A turma deve perceber a gravidade da queda e, ao mesmo tempo, a suficiência da graça de Deus em Cristo.",
    orientacaoPedagogica:
      "Comece pedindo que a classe identifique quais consequências do pecado são mais visíveis hoje. Depois leve a conversa de volta ao texto bíblico para mostrar que a raiz do problema não é apenas social ou emocional, mas espiritual e relacional.",
  },
  desenvolvimento: [
    {
      id: "origem-do-pecado",
      titulo: "A origem do pecado na humanidade",
      sinopse:
        "O pecado entrou quando o ser humano rejeitou a palavra de Deus e preferiu autonomia à obediência.",
      explicacaoBiblica: [
        "Gênesis 3.1-7 mostra que a tentação atacou confiança, verdade e submissão ao Criador.",
        "A queda não começou com um ato externo apenas, mas com o desejo de viver sem depender de Deus.",
        "Romanos 5.12 ajuda a entender que o pecado passou a marcar toda a história humana.",
      ],
      aplicacaoPratica: [
        "Leve os alunos a perceber que o pecado ainda se manifesta hoje por escolhas que trocam a vontade de Deus por desejos autônomos.",
        "Mostre que reconhecer a origem do pecado ajuda a combater justificativas superficiais para a desobediência.",
      ],
      pense:
        "Em quais áreas você percebe a tentação de definir sozinho o que é certo, sem ouvir a voz de Deus?",
      pontoImportante:
        "O pecado nasce quando a criatura rejeita a verdade do Criador e tenta assumir o controle do próprio caminho.",
    },
    {
      id: "consequencias-do-pecado",
      titulo: "As consequências do pecado",
      sinopse:
        "O pecado produz ruptura com Deus, distorção interior e sofrimento real na vida humana.",
      explicacaoBiblica: [
        "Depois da queda, surgem culpa, vergonha, medo e fuga da presença de Deus.",
        "Isaías 59.2 mostra que o pecado faz separação entre o homem e Deus.",
        "Romanos 3.23 e 5.12 revelam que todos estão debaixo dessa realidade e de seus efeitos.",
      ],
      aplicacaoPratica: [
        "Ajude a turma a nomear como culpa, medo e vergonha ainda tentam dominar o coração longe da graça.",
        "Enfatize que o Evangelho não minimiza o pecado; ele o enfrenta com verdade para depois oferecer cura e reconciliação.",
      ],
      pense:
        "Você costuma enxergar pecado apenas como erro pontual ou como uma força que rompe comunhão, identidade e esperança?",
      pontoImportante:
        "As consequências do pecado não são só externas; elas alcançam consciência, relacionamento e destino.",
    },
    {
      id: "solucao-de-deus",
      titulo: "A solução de Deus para as consequências do pecado",
      sinopse:
        "Deus responde ao pecado humano com reconciliação, nova criação e restauração em Cristo.",
      explicacaoBiblica: [
        "2 Coríntios 5.18-19 mostra que Deus, em Cristo, reconcilia consigo o mundo.",
        "Efésios 2 e Colossenses 3 revelam que a salvação cria um novo homem, renovado segundo a vontade de Deus.",
        "A obra de Cristo remove culpa e vergonha, restaura a comunhão e inaugura uma nova maneira de viver.",
      ],
      aplicacaoPratica: [
        "Conduza a classe a enxergar arrependimento e fé como resposta real à graça oferecida por Deus.",
        "Mostre que a restauração em Cristo inclui novas escolhas, nova identidade e nova relação com Deus.",
      ],
      pense:
        "Você tem respondido ao problema do pecado com desculpas, desânimo ou com arrependimento e fé em Cristo?",
      pontoImportante:
        "A solução divina para o pecado não é maquiagem moral; é reconciliação verdadeira em Jesus.",
    },
  ],
  apoioProfessor: {
    quebraGelo:
      "Peça à turma que cite palavras que surgem quando ouvem a expressão 'pecado' e organize as respostas em quadro ou papel.",
    perguntaChave:
      "Como a Bíblia explica a origem do pecado, suas consequências e a resposta de Deus para restaurar o ser humano?",
    dificuldadeProvavelDaClasse:
      "Alguns jovens podem tratar pecado apenas como escolha moral ruim, sem perceber sua profundidade espiritual e seus efeitos relacionais.",
    conducaoDaConversa: [
      "Conecte Gênesis 3 com Romanos 3 e 5 para mostrar que a queda tem desdobramentos universais.",
      "Evite uma aula só de denúncia; avance até a reconciliação em Cristo para preservar o eixo do Evangelho.",
      "Mostre que culpa e vergonha são reais, mas não têm a palavra final diante da cruz.",
    ],
    fechamento:
      "Encerre lembrando que o pecado é grave, mas a graça de Deus em Cristo é maior, suficiente para reconciliar, restaurar e renovar.",
  },
  aprofundamentoOpcional: {
    notaDoutrinariaCurta: [
      "A doutrina do pecado ajuda a igreja a explicar por que a humanidade precisa desesperadamente da salvação.",
      "A queda afetou o ser humano integralmente, mas não anulou sua responsabilidade diante de Deus.",
    ],
    contextoBiblico: [
      "Gênesis 3 oferece a narrativa matriz da queda e do início da história de redenção.",
      "Textos paulinos aprofundam o tema ao mostrar a universalidade do pecado e a suficiência da reconciliação em Cristo.",
    ],
    conexaoComVidaCrista: [
      "Jovens que entendem a gravidade do pecado valorizam mais a graça e lidam com arrependimento de forma menos superficial.",
      "A restauração em Cristo alcança culpa, vergonha, relacionamentos e futuro.",
    ],
  },
  revisao: {
    horaDaRevisao: [
      "Como o pecado entrou na experiência humana?",
      "Quais consequências aparecem imediatamente após a queda?",
      "O que a cruz responde em relação à culpa, vergonha e separação?",
      "Por que a reconciliação em Cristo é mais profunda do que simples melhora moral?",
    ],
    quizCurto: [
      "O pecado começou por um acidente inevitável ou por desobediência? Resposta esperada: por desobediência.",
      "O pecado afeta só comportamento externo? Resposta esperada: não; afeta relacionamento, consciência e natureza humana.",
      "Qual é a resposta de Deus para o pecado? Resposta esperada: reconciliação e nova vida em Cristo.",
    ],
    conclusao:
      "O pecado rompeu a comunhão com Deus e atingiu a humanidade inteira, mas em Cristo a graça oferece reconciliação, perdão e um novo começo.",
  },
};

const objetivosJovensLicao3 = [
  "Conhecer o Deus que se revela como Salvador e cheio de bondade.",
  "Explicar a salvação como prova do amor de Deus.",
  "Apontar a santidade do Deus que salva.",
];

const topicosJovensLicao3 = [
  {
    titulo: "O Deus que se revela como Salvador",
    conteudo: [
      "A Bíblia apresenta Deus como aquele que salva porque é bom, confiável e ativo em favor do seu povo.",
      "A salvação nasce do caráter do Senhor, e não apenas da necessidade humana.",
      "Conhecer o Deus que salva é enxergar que sua bondade se manifesta em suas obras e em sua fidelidade às promessas.",
    ],
  },
  {
    titulo: "A salvação como prova do amor de Deus",
    conteudo: [
      "A cruz mostra que o amor de Deus não é abstrato: Ele age para alcançar pecadores incapazes de salvar a si mesmos.",
      "Em Cristo, o amor divino encontra expressão concreta, sacrificial e redentora.",
      "A salvação não é favor barato, mas demonstração gloriosa do amor santo do Senhor.",
    ],
  },
  {
    titulo: "A santidade do Deus que salva",
    conteudo: [
      "O Deus que salva é santo, e sua salvação não banaliza o pecado nem acomoda a vida em impureza.",
      "A graça nos reconcilia e também nos chama a viver em santidade.",
      "A obra salvadora revela um Deus que une amor, bondade, justiça e pureza perfeita.",
    ],
  },
];

const subsidioJovensLicao3: LicaoEBD["subsidioJovens"] = {
  cabecalho: {
    numero: 3,
    titulo: "A Natureza do Deus que Salva",
    data: "2026-01-18",
    trimestre: "Plano Perfeito — A Salvação da Humanidade, a Mensagem Central das Escrituras",
    textoPrincipal:
      "Salmos 34.8 convida a provar e ver que o Senhor é bom, ligando a experiência da salvação ao caráter do próprio Deus.",
    resumoDaLicao:
      "A obra da salvação, revelada plenamente em Jesus Cristo, expressa a bondade, o amor e a santidade de Deus.",
    leituraSemanal: [
      {
        dia: "Segunda",
        referencia: "Tito 3.4-5",
        foco: "A salvação manifesta a bondade e a misericórdia do nosso Deus.",
      },
      {
        dia: "Terça",
        referencia: "Colossenses 2.9; João 14.9-10",
        foco: "Jesus revela perfeitamente o Deus que salva.",
      },
      {
        dia: "Quarta",
        referencia: "Efésios 2.1",
        foco: "A gravidade da condição humana destaca ainda mais a iniciativa divina na salvação.",
      },
      {
        dia: "Quinta",
        referencia: "1 Coríntios 13.4",
        foco: "O amor verdadeiro ajuda a compreender, ainda que de modo limitado, a ação graciosa de Deus.",
      },
      {
        dia: "Sexta",
        referencia: "Isaías 6.3",
        foco: "A santidade de Deus não desaparece quando Ele salva; ela é parte da sua glória.",
      },
      {
        dia: "Sábado",
        referencia: "1 Pedro 1.16",
        foco: "O Deus santo chama seu povo a responder à salvação com vida santa.",
      },
    ],
  },
  arranquePedagogico: {
    objetivos: objetivosJovensLicao3,
    interacao:
      "A aula deve mostrar que a salvação não é apenas resposta à miséria humana; ela é manifestação de quem Deus é. Bondade, amor e santidade precisam aparecer juntas.",
    orientacaoPedagogica:
      "Comece perguntando o que os alunos pensam quando ouvem que Deus salva. Depois desloque a conversa da necessidade humana para o caráter divino: Deus salva porque é bom, amoroso e santo. Isso ajuda a turma a enxergar a salvação com mais profundidade.",
  },
  desenvolvimento: [
    {
      id: "deus-salvador",
      titulo: "O Deus que se revela como Salvador",
      sinopse:
        "A salvação brota da bondade e da fidelidade do próprio Deus.",
      explicacaoBiblica: [
        "Salmos 34.8-9 convida à experiência da bondade do Senhor, mostrando que salvação e caráter divino caminham juntos.",
        "Tito 3.4-5 afirma que a bondade e o amor de Deus se manifestaram em favor de pecadores incapazes de salvar a si mesmos.",
        "Jesus revela, de maneira perfeita, esse Deus salvador ao tornar visível o Pai em sua vida e ministério.",
      ],
      aplicacaoPratica: [
        "Leve a turma a perceber que confiar na salvação implica confiar no caráter de Deus.",
        "Incentive os alunos a recordarem situações em que a bondade de Deus sustentou sua fé em meio à crise.",
      ],
      pense:
        "Você vê a salvação apenas como resposta ao seu problema ou como manifestação de quem Deus é?",
      pontoImportante:
        "O Deus que salva é o mesmo Deus que é bom, fiel e digno de confiança.",
    },
    {
      id: "amor-de-deus",
      titulo: "A salvação como prova do amor de Deus",
      sinopse:
        "Na cruz, o amor divino se torna visível, sacrificial e redentor.",
      explicacaoBiblica: [
        "Romanos 5.6-8 mostra que Deus prova o seu amor ao agir por pecadores impotentes.",
        "João 14 ajuda a perceber que o Filho torna conhecido o coração do Pai.",
        "A salvação em Cristo mostra que o amor de Deus é iniciativa santa, e não mera reação sentimental.",
      ],
      aplicacaoPratica: [
        "Ajude os alunos a discernirem entre noções superficiais de amor e o amor redentor revelado no Evangelho.",
        "Mostre que receber a salvação inclui descansar no amor de Deus sem banalizar a santidade.",
      ],
      pense:
        "Como a cruz corrige as imagens frágeis de amor que circulam hoje entre os jovens?",
      pontoImportante:
        "O amor de Deus não é discurso vazio; ele se manifesta poderosamente na salvação em Cristo.",
    },
    {
      id: "santidade-deus",
      titulo: "A santidade do Deus que salva",
      sinopse:
        "A mesma graça que reconcilia também chama a uma vida santa diante de Deus.",
      explicacaoBiblica: [
        "Isaías 6.3 mostra que a santidade pertence ao ser de Deus e não é atributo secundário.",
        "1 Pedro 1.16 aplica essa santidade à vida do povo redimido: quem foi alcançado pela graça é chamado à pureza.",
        "A salvação revela que amor e santidade não se anulam; eles se encontram perfeitamente no agir de Deus.",
      ],
      aplicacaoPratica: [
        "Ensine a turma que graça não é licença para descuido espiritual, mas poder para viver de modo santo.",
        "Convide os alunos a examinarem hábitos, conversas e escolhas à luz do Deus santo que os chamou para si.",
      ],
      pense:
        "Há alguma área em que você quer a salvação de Deus, mas ainda resiste ao chamado à santidade?",
      pontoImportante:
        "O Deus que salva continua santo, e sua salvação forma um povo santo.",
    },
  ],
  apoioProfessor: {
    quebraGelo:
      "Pergunte quais atributos de Deus os alunos mais relacionam com a salvação e use isso como ponte para a aula.",
    perguntaChave:
      "O que a salvação revela sobre a bondade, o amor e a santidade do Deus que age em favor do seu povo?",
    dificuldadeProvavelDaClasse:
      "Alguns jovens podem separar amor e santidade, como se a graça de Deus diminuísse sua pureza ou sua exigência moral.",
    conducaoDaConversa: [
      "Mantenha a aula centrada no caráter de Deus e não apenas na necessidade humana.",
      "Mostre que Jesus revela o Deus que salva e impede imagens distorcidas de um deus abstrato ou contraditório.",
      "Conecte salvação e santidade para evitar leituras permissivas da graça.",
    ],
    fechamento:
      "Encerre lembrando a turma de que a salvação nasce do Deus que é bom, amoroso e santo, e por isso transforma a vida do salvo de forma integral.",
  },
  aprofundamentoOpcional: {
    notaDoutrinariaCurta: [
      "A salvação expressa o caráter de Deus: seu amor não enfraquece sua santidade, e sua santidade não cancela sua misericórdia.",
      "Cristo é a revelação perfeita do Deus que salva, tornando visível aquilo que o Pai é.",
    ],
    contextoBiblico: [
      "Salmos, profetas e cartas apostólicas se unem ao mostrar que Deus salva porque é bom e santo.",
      "A cruz de Cristo é o lugar onde amor, justiça e santidade se encontram de modo perfeito.",
    ],
    conexaoComVidaCrista: [
      "Jovens precisam aprender a admirar não apenas os benefícios da salvação, mas o Deus que os concede.",
      "Entender o caráter de Deus fortalece confiança, gratidão e compromisso com a santidade.",
    ],
  },
  revisao: {
    horaDaRevisao: [
      "O que significa dizer que Deus se revela como Salvador?",
      "Como a salvação prova o amor de Deus?",
      "Por que a santidade continua central quando falamos de graça?",
      "De que forma a compreensão do caráter de Deus muda a vida cristã?",
    ],
    quizCurto: [
      "A salvação revela só a necessidade humana ou também o caráter de Deus? Resposta esperada: também o caráter de Deus.",
      "Jesus revela plenamente quem é o Deus que salva? Resposta esperada: sim.",
      "A graça elimina a santidade? Resposta esperada: não; ela nos chama a viver em santidade.",
    ],
    conclusao:
      "O Deus que salva é bom, amoroso e santo; por isso sua graça não apenas resgata, mas também forma um povo que aprende a viver para sua glória.",
  },
};

const objetivosJovensLicao4 = [
  "Apresentar o que é a justificação pela fé.",
  "Explicar como Deus justificou Abraão.",
  "Conscientizar sobre o livramento da culpa e das consequências eternas do pecado.",
];

const topicosJovensLicao4 = [
  {
    titulo: "O que é a justificação pela fé",
    conteudo: [
      "Justificação é a mudança de posição do pecador diante de Deus: de culpado e condenado para perdoado e declarado justo em Cristo.",
      "Essa obra não se baseia em méritos humanos, mas na justiça de Cristo aplicada ao que crê.",
      "A justificação pela fé produz paz com Deus e inaugura uma nova maneira de viver diante do Senhor.",
    ],
  },
  {
    titulo: "Deus justificou Abraão",
    conteudo: [
      "Romanos 4 usa Abraão como exemplo para mostrar que a justificação não começou no Novo Testamento; ela já era ensinada no plano de Deus.",
      "Abraão foi declarado justo porque creu em Deus, e sua obediência surgiu como fruto dessa fé viva.",
      "Isso mostra que a fé é o gesto de dependência que recebe a graça, e não uma obra que compra salvação.",
    ],
  },
  {
    titulo: "Livres da culpa e das consequências eternas do pecado",
    conteudo: [
      "A justificação remove a condenação e quebra o domínio da culpa sobre quem está em Cristo.",
      "O salvo aprende a viver sem carregar para sempre o peso do passado, porque foi perdoado e aceito por Deus.",
      "O Espírito Santo confirma interiormente essa nova identidade e fortalece o crente em sua caminhada.",
    ],
  },
];

const subsidioJovensLicao4: LicaoEBD["subsidioJovens"] = {
  cabecalho: {
    numero: 4,
    titulo: "O Deus que Justifica",
    data: "2026-01-25",
    trimestre: "Plano Perfeito — A Salvação da Humanidade, a Mensagem Central das Escrituras",
    textoPrincipal:
      "Romanos 5.1 declara que, justificados pela fé, temos paz com Deus por meio de nosso Senhor Jesus Cristo.",
    resumoDaLicao:
      "O jovem cristão que entende a realidade da justificação pela fé vive com ousadia, gratidão e santidade, sabendo que foi perdoado, regenerado e capacitado para vencer em Cristo.",
    leituraSemanal: [
      {
        dia: "Segunda",
        referencia: "Romanos 5.1",
        foco: "A justificação traz paz real com Deus por meio de Cristo.",
      },
      {
        dia: "Terça",
        referencia: "Romanos 4.3",
        foco: "Abraão foi justificado por crer, e não por obras.",
      },
      {
        dia: "Quarta",
        referencia: "Romanos 8.1",
        foco: "Quem está em Cristo não vive mais debaixo de condenação.",
      },
      {
        dia: "Quinta",
        referencia: "Romanos 8.16",
        foco: "O Espírito confirma a nova identidade do salvo.",
      },
      {
        dia: "Sexta",
        referencia: "Romanos 8.17",
        foco: "Filhos justificados aprendem a viver como herdeiros de Deus.",
      },
      {
        dia: "Sábado",
        referencia: "2 Coríntios 5.17",
        foco: "A justificação caminha com a nova vida em Cristo.",
      },
    ],
  },
  arranquePedagogico: {
    objetivos: objetivosJovensLicao4,
    interacao:
      "A aula deve mostrar que justificação pela fé não é abstração doutrinária. Ela muda identidade, remove condenação e liberta o jovem para viver com paz, gratidão e ousadia diante de Deus.",
    orientacaoPedagogica:
      "Comece perguntando se alguém pode ser salvo por ser uma boa pessoa. Use as respostas para mostrar que a salvação não se firma em mérito, mas na justiça de Cristo recebida pela fé. Depois conecte Romanos 4 e 5 com a vida prática da turma.",
  },
  desenvolvimento: [
    {
      id: "o-que-e-justificacao",
      titulo: "O que é a justificação pela fé",
      sinopse:
        "Justificação é o ato gracioso de Deus que declara justo o pecador que crê em Cristo.",
      explicacaoBiblica: [
        "Romanos 4 e 5 mostram que a justificação não é recompensa por desempenho, mas graça recebida pela fé.",
        "A justiça que nos falta é suprida por Cristo, e por isso Deus nos declara justos diante dEle.",
        "Essa declaração muda nossa posição espiritual e inaugura paz com Deus.",
      ],
      aplicacaoPratica: [
        "Ajude a turma a perceber que viver preso à condenação é negar, na prática, a suficiência da obra de Cristo.",
        "Mostre que a justificação gera humildade, porque toda glória da salvação pertence a Deus.",
      ],
      pense:
        "Você ainda tenta provar valor para Deus por desempenho ou já descansa na justiça de Cristo?",
      pontoImportante:
        "A fé não compra salvação; ela recebe a obra perfeita que Deus já ofereceu em Cristo.",
    },
    {
      id: "abraao-justificado",
      titulo: "Deus justificou Abraão",
      sinopse:
        "Abraão mostra que a justificação sempre esteve ligada à fé no Deus que salva.",
      explicacaoBiblica: [
        "Romanos 4.1-8 ensina que Abraão foi justificado por crer em Deus, antes de qualquer mérito pessoal.",
        "A fé de Abraão não foi passiva; ela gerou obediência e caminhada concreta com o Senhor.",
        "O exemplo do patriarca mostra continuidade entre Antigo e Novo Testamento no plano da salvação.",
      ],
      aplicacaoPratica: [
        "Leve a classe a enxergar que fé viva sempre se expressa em obediência e dependência de Deus.",
        "Combata a religiosidade vazia que tenta parecer santa sem ter passado pela justificação.",
      ],
      pense:
        "Sua fé tem sido apenas discurso ou já produz passos concretos de confiança e obediência?",
      pontoImportante:
        "A fé ocupa lugar central na justificação e depois produz frutos visíveis na vida do salvo.",
    },
    {
      id: "livres-da-culpa",
      titulo: "Livres da culpa e das consequências eternas do pecado",
      sinopse:
        "O Deus que justifica também liberta da condenação e firma nova identidade no coração do salvo.",
      explicacaoBiblica: [
        "Romanos 8.1 afirma que já não há condenação para os que estão em Cristo Jesus.",
        "O testemunho interior do Espírito fortalece o crente contra a acusação e o medo.",
        "A justificação não nos autoriza a pecar; ela nos chama a viver de modo coerente com a graça recebida.",
      ],
      aplicacaoPratica: [
        "Ajude os jovens a identificar culpas antigas que ainda tentam definir sua identidade.",
        "Mostre que a liberdade da justificação produz obediência alegre, e não descuido espiritual.",
      ],
      pense:
        "Você vive como alguém perdoado e aceito por Deus ou ainda como quem está sempre tentando fugir da culpa?",
      pontoImportante:
        "O salvo em Cristo não é prisioneiro do passado; ele foi justificado, acolhido e chamado a viver em novidade de vida.",
    },
  ],
  apoioProfessor: {
    quebraGelo:
      "Pergunte à turma se uma pessoa pode ser salva só por ser boa e use a discussão para introduzir Romanos 4 e 5.",
    perguntaChave:
      "O que significa ser justificado pela fé e como isso muda a relação do jovem com culpa, passado e identidade?",
    dificuldadeProvavelDaClasse:
      "Alguns alunos podem confundir justificação com licença para pecar ou, no extremo oposto, continuar presos à ideia de que precisam merecer aceitação diante de Deus.",
    conducaoDaConversa: [
      "Mostre que a justificação é ato jurídico e gracioso de Deus, mas com efeitos profundos na vida prática.",
      "Use Abraão para provar que a fé sempre esteve no centro da experiência do povo de Deus.",
      "Conecte a aula com realidades de culpa, vergonha e medo muito presentes na juventude.",
    ],
    fechamento:
      "Conclua reforçando que Deus justifica o pecador que crê, remove sua culpa e o chama a viver em paz, gratidão e santidade.",
  },
  aprofundamentoOpcional: {
    notaDoutrinariaCurta: [
      "Justificação tem forte sentido judicial: o pecador é absolvido porque a justiça de Cristo lhe é imputada pela fé.",
      "Ela se distingue da regeneração, mas caminha junto dela no plano da salvação.",
    ],
    contextoBiblico: [
      "Romanos 4 conecta Abraão e Davi para mostrar que a salvação pela fé não é inovação tardia, mas fio contínuo da revelação bíblica.",
      "Romanos 8 mostra que a justificação se desdobra em identidade, herança e vida no Espírito.",
    ],
    conexaoComVidaCrista: [
      "Jovens que entendem a justificação aprendem a viver sem performance religiosa e sem desespero condenatório.",
      "A paz com Deus abre espaço para uma vida santa que brota da graça, não do medo.",
    ],
  },
  revisao: {
    horaDaRevisao: [
      "O que significa ser justificado pela fé?",
      "Como Abraão ilustra essa doutrina?",
      "O que a justificação faz com a culpa e a condenação?",
      "Qual é o papel do Espírito nessa nova identidade?",
    ],
    quizCurto: [
      "A justificação vem por obras ou pela fé em Cristo? Resposta esperada: pela fé em Cristo.",
      "Abraão foi declarado justo antes ou depois de méritos pessoais? Resposta esperada: antes, por crer em Deus.",
      "Quem está em Cristo continua debaixo de condenação? Resposta esperada: não.",
    ],
    conclusao:
      "O Deus que justifica livra da culpa, dá paz e firma uma nova identidade para o jovem que confia em Cristo.",
  },
};

const objetivosJovensLicao5 = [
  "Apresentar a tipologia do Cordeiro Pascal.",
  "Mostrar que Jesus é o Cordeiro de Deus que tira o pecado do mundo, valorizando a obra de Cristo como o único meio de reconciliação com Deus.",
  "Saber que a redenção e a reconciliação ocorrem por meio da obra salvífica de Cristo.",
];

const topicosJovensLicao5 = [
  {
    titulo: "O Cordeiro da Páscoa como símbolo da salvação",
    conteudo: [
      "Êxodo 12 apresenta o cordeiro pascal como sinal de livramento, proteção e saída da escravidão.",
      "O sangue nas portas marcava as casas do povo de Deus e revelava que a libertação vinha da obediência à palavra do Senhor.",
      "Essa imagem prepara o coração da Bíblia para o sacrifício perfeito que seria cumprido em Cristo.",
    ],
  },
  {
    titulo: "Jesus é o Cordeiro de Deus que tira o pecado do mundo",
    conteudo: [
      "João Batista identifica Jesus como o Cordeiro definitivo, cujo sacrifício é completo e suficiente para tratar o pecado.",
      "As imagens do cordeiro pascal, dos sacrifícios do Antigo Testamento e do Servo Sofredor convergem em Cristo.",
      "Jesus não apenas simboliza redenção; Ele a realiza de uma vez por todas por meio da cruz.",
    ],
  },
  {
    titulo: "Redenção e reconciliação pela obra de Cristo",
    conteudo: [
      "Pelo sangue de Jesus fomos resgatados do domínio do pecado e recebidos novamente em comunhão com o Pai.",
      "A redenção revela o preço pago; a reconciliação revela o relacionamento restaurado.",
      "Quem foi alcançado por essa obra é chamado a viver como alguém perdoado, liberto e acolhido por Deus.",
    ],
  },
];

const subsidioJovensLicao5: LicaoEBD["subsidioJovens"] = {
  cabecalho: {
    numero: 5,
    titulo: "O Filho que Redime",
    data: "2026-02-01",
    trimestre: "Plano Perfeito — A Salvação da Humanidade, a Mensagem Central das Escrituras",
    textoPrincipal:
      "João 1.29 apresenta Jesus como o Cordeiro de Deus que tira o pecado do mundo, revelando o centro da redenção.",
    resumoDaLicao:
      "O sacrifício único de Jesus, como o Cordeiro de Deus, para nos redimir do pecado e nos reconciliar com o Pai, cumpre as profecias, trazendo libertação e perdão definitivo para quem crê.",
    leituraSemanal: [
      {
        dia: "Segunda",
        referencia: "Êxodo 12.3,5",
        foco: "O cordeiro pascal já apontava para a pureza do sacrifício preparado por Deus.",
      },
      {
        dia: "Terça",
        referencia: "Êxodo 12.7",
        foco: "O sangue do cordeiro era sinal de proteção e livramento.",
      },
      {
        dia: "Quarta",
        referencia: "Êxodo 12.11",
        foco: "A Páscoa preparava o povo para a libertação realizada pelo Senhor.",
      },
      {
        dia: "Quinta",
        referencia: "João 1.29",
        foco: "Jesus é o Cordeiro de Deus anunciado e revelado para tratar o pecado.",
      },
      {
        dia: "Sexta",
        referencia: "Hebreus 9.22",
        foco: "Sem derramamento de sangue não há remissão.",
      },
      {
        dia: "Sábado",
        referencia: "1 Pedro 1.18-19",
        foco: "Fomos resgatados pelo sangue precioso de Cristo.",
      },
    ],
  },
  arranquePedagogico: {
    objetivos: objetivosJovensLicao5,
    interacao:
      "A aula precisa destacar que a cruz não é acidente da história, mas cumprimento de um plano redentor anunciado desde o Antigo Testamento. O Cordeiro de Deus está no centro dessa reconciliação.",
    orientacaoPedagogica:
      "Comece perguntando se a turma já experimentou reconciliação depois de um afastamento doloroso. Use essa ponte para mostrar que o pecado nos afastou de Deus, mas Cristo nos redimiu e reconciliou por meio do seu sacrifício.",
  },
  desenvolvimento: [
    {
      id: "cordeiro-da-pascoa",
      titulo: "O Cordeiro da Páscoa: um símbolo da salvação",
      sinopse:
        "A Páscoa do Antigo Testamento já apontava para um livramento realizado por meio de um cordeiro sem defeito.",
      explicacaoBiblica: [
        "Êxodo 12 mostra Israel escravizado e Deus providenciando libertação por meio do cordeiro pascal.",
        "O sangue nas ombreiras sinalizava vida, proteção e obediência à palavra do Senhor.",
        "Essa tipologia prepara o entendimento da obra de Cristo como livramento maior e definitivo.",
      ],
      aplicacaoPratica: [
        "Leve a classe a perceber que a salvação em Cristo não surgiu de improviso; ela já estava anunciada na história da redenção.",
        "Mostre que o livramento de Deus exige resposta obediente de fé.",
      ],
      pense:
        "Você enxerga a história bíblica como um todo que converge para Cristo ou lê cada texto de forma isolada?",
      pontoImportante:
        "O cordeiro pascal não era fim em si mesmo; ele apontava para o Redentor que viria.",
    },
    {
      id: "cordeiro-de-deus",
      titulo: "Jesus: o Cordeiro de Deus que tira o pecado do mundo",
      sinopse:
        "Em Jesus, as figuras do Antigo Testamento se cumprem no sacrifício perfeito e suficiente.",
      explicacaoBiblica: [
        "João Batista identifica Jesus como o Cordeiro de Deus, unindo o tema da Páscoa ao problema universal do pecado.",
        "Hebreus mostra que Cristo não repete sacrifícios antigos; Ele oferece a si mesmo de uma vez por todas.",
        "A obra de Jesus aniquila o pecado em sua culpa e em seu domínio sobre o ser humano.",
      ],
      aplicacaoPratica: [
        "Mostre que não existe outro mediador, outro preço ou outro caminho de reconciliação fora de Cristo.",
        "Ajude a turma a responder ao sacrifício de Jesus com adoração, gratidão e dependência.",
      ],
      pense:
        "Sua confiança está realmente no Cordeiro de Deus ou ainda em soluções religiosas e humanas para o pecado?",
      pontoImportante:
        "Jesus é o sacrifício perfeito, completo e suficiente para tratar o pecado e reconciliar o homem com Deus.",
    },
    {
      id: "redencao-e-reconciliacao",
      titulo: "Redenção e reconciliação por meio da obra de Cristo",
      sinopse:
        "A cruz nos liberta do pecado e nos devolve à comunhão com o Pai.",
      explicacaoBiblica: [
        "1 Pedro 1.18-19 ensina que fomos redimidos por alto preço: o sangue precioso de Cristo.",
        "2 Coríntios 5.18-19 mostra que Deus estava em Cristo reconciliando consigo o mundo.",
        "Hebreus 4.16 reforça que, reconciliados, agora nos aproximamos com confiança do trono da graça.",
      ],
      aplicacaoPratica: [
        "Conduza a turma a abandonar mentalidade de escravidão, medo e condenação diante daquilo que Cristo já realizou.",
        "Mostre que viver como redimidos envolve liberdade santa, intimidade com o Pai e rejeição do passado de pecado.",
      ],
      pense:
        "Você tem vivido como alguém reconciliado com Deus ou ainda como quem permanece preso ao passado?",
      pontoImportante:
        "A redenção mostra o preço pago; a reconciliação mostra a comunhão restaurada pelo Filho que redime.",
    },
  ],
  apoioProfessor: {
    quebraGelo:
      "Pergunte se a turma já viveu uma reconciliação importante e use isso como ponte para o tema da aula.",
    perguntaChave:
      "Como o cordeiro pascal aponta para Cristo e o que sua obra realiza em termos de redenção e reconciliação?",
    dificuldadeProvavelDaClasse:
      "Alguns alunos podem conhecer a linguagem da cruz, mas sem conectar o Antigo Testamento, o problema do pecado e o acesso restaurado ao Pai.",
    conducaoDaConversa: [
      "Trace a linha entre Êxodo 12, João 1.29, Hebreus 9 e 1 Pedro 1 para mostrar unidade bíblica.",
      "Evite tratar redenção e reconciliação como termos vazios; dê sempre consequência prática e relacional.",
      "Conecte a aula com culpa, escravidão e comunhão restaurada.",
    ],
    fechamento:
      "Encerre exaltando a obra vicária de Cristo e convidando a turma a viver como gente realmente redimida e reconciliada com Deus.",
  },
  aprofundamentoOpcional: {
    notaDoutrinariaCurta: [
      "Redenção aponta para resgate mediante pagamento; reconciliação aponta para restauração de relacionamento.",
      "O sangue de Cristo cumpre e ultrapassa tudo o que os sacrifícios do Antigo Testamento apenas anunciavam.",
    ],
    contextoBiblico: [
      "Êxodo 12, Isaías 53, João 1 e Hebreus convergem para mostrar Jesus como Cordeiro sacrificial perfeito.",
      "A Ceia do Senhor mantém viva essa memória na vida da igreja e aponta continuamente para a cruz.",
    ],
    conexaoComVidaCrista: [
      "Jovens precisam lembrar que o Evangelho não oferece só melhora moral, mas libertação real do domínio do pecado.",
      "Viver reconciliado com Deus muda a maneira de orar, adorar, servir e lidar com o passado.",
    ],
  },
  revisao: {
    horaDaRevisao: [
      "O que o cordeiro pascal simboliza na história da redenção?",
      "Por que João Batista chama Jesus de Cordeiro de Deus?",
      "Qual a diferença entre redenção e reconciliação?",
      "Como a cruz muda a vida prática do crente?",
    ],
    quizCurto: [
      "Onde a imagem do cordeiro aparece com clareza pela primeira vez? Resposta esperada: em Êxodo 12.",
      "Quem é o Cordeiro de Deus que tira o pecado do mundo? Resposta esperada: Jesus.",
      "A salvação envolve qual alto preço? Resposta esperada: o sangue de Jesus.",
    ],
    conclusao:
      "O Filho que redime nos comprou com seu sangue, destruiu o poder do pecado e restaurou nossa comunhão com o Pai.",
  },
};

const objetivosJovensLicao6 = [
  "Saber o que é a regeneração.",
  "Mostrar a atuação do Espírito Santo na regeneração.",
  "Reconhecer a santificação como evidência da obra da salvação, operada pelo Espírito Santo que habita o crente.",
];

const topicosJovensLicao6 = [
  {
    titulo: "O que é a regeneração",
    conteudo: [
      "Regeneração é o novo nascimento, a transformação interior realizada pelo Espírito Santo no coração do pecador.",
      "Não se trata apenas de mudança de comportamento, mas de uma nova vida inaugurada pela graça de Deus.",
      "Quem nasce de novo começa uma caminhada real com Cristo, marcada por nova natureza e nova direção.",
    ],
  },
  {
    titulo: "A atuação do Espírito Santo na regeneração",
    conteudo: [
      "É o Espírito quem convence do pecado, ilumina a mente, quebranta o coração e gera nova vida.",
      "A regeneração não nasce de tradição, ritual ou esforço humano, mas do mover gracioso de Deus.",
      "O Espírito usa a Palavra e sua ação poderosa para produzir esse milagre invisível e real.",
    ],
  },
  {
    titulo: "O Espírito habita o crente e opera a santificação",
    conteudo: [
      "A presença do Espírito no salvo inaugura um processo contínuo de santificação.",
      "Santificação é resultado da salvação e evidência de que a regeneração realmente aconteceu.",
      "Quem foi alcançado pela graça aprende a rejeitar o pecado e a refletir o caráter de Cristo no dia a dia.",
    ],
  },
];

const subsidioJovensLicao6: LicaoEBD["subsidioJovens"] = {
  cabecalho: {
    numero: 6,
    titulo: "O Espírito Santo que Regenera e Santifica",
    data: "2026-02-08",
    trimestre: "Plano Perfeito — A Salvação da Humanidade, a Mensagem Central das Escrituras",
    textoPrincipal:
      "João 3.5 mostra que ninguém entra no Reino de Deus sem nascer da água e do Espírito.",
    resumoDaLicao:
      "A regeneração é uma transformação interior realizada pelo Espírito Santo. Essa obra da graça se evidencia por uma vida de santificação e obediência à vontade de Deus.",
    leituraSemanal: [
      {
        dia: "Segunda",
        referencia: "João 3.3,7",
        foco: "O novo nascimento é indispensável para ver o Reino de Deus.",
      },
      {
        dia: "Terça",
        referencia: "Tito 3.5",
        foco: "A regeneração é obra da misericórdia divina, não de mérito humano.",
      },
      {
        dia: "Quarta",
        referencia: "1 Pedro 1.23",
        foco: "A Palavra participa do processo pelo qual Deus gera nova vida.",
      },
      {
        dia: "Quinta",
        referencia: "Ezequiel 36.26-27",
        foco: "Deus promete dar novo coração e colocar seu Espírito no seu povo.",
      },
      {
        dia: "Sexta",
        referencia: "Gálatas 5.22-23",
        foco: "O fruto do Espírito evidencia a nova vida em Cristo.",
      },
      {
        dia: "Sábado",
        referencia: "1 Coríntios 6.19",
        foco: "O corpo do crente é templo do Espírito Santo.",
      },
    ],
  },
  arranquePedagogico: {
    objetivos: objetivosJovensLicao6,
    interacao:
      "A aula deve mostrar que regeneração e santificação não são temas opcionais da vida cristã. O Espírito Santo inicia a nova vida e continua operando para formar em nós o caráter de Cristo.",
    orientacaoPedagogica:
      "Comece perguntando o que mudou na vida de quem nasceu de novo. Depois leve a conversa para João 3, Tito 3 e Gálatas 5, mostrando que o novo nascimento é obra do Espírito e que a santificação é a evidência contínua dessa obra.",
  },
  desenvolvimento: [
    {
      id: "o-que-e-regeneracao",
      titulo: "O que é a regeneração",
      sinopse:
        "Regeneração é o novo nascimento operado por Deus no interior do pecador.",
      explicacaoBiblica: [
        "João 3 ensina que ninguém entra no Reino sem nascer de novo.",
        "2 Coríntios 5.17 mostra que, em Cristo, surge uma nova criatura.",
        "A regeneração envolve nova natureza, novo começo e nova orientação espiritual.",
      ],
      aplicacaoPratica: [
        "Ajude a turma a diferenciar transformação real de mera mudança externa ou aparência religiosa.",
        "Mostre que ninguém amadurece espiritualmente sem antes nascer de novo.",
      ],
      pense:
        "Sua vida cristã tem sido só ajuste de comportamento ou fruto de um novo nascimento real?",
      pontoImportante:
        "Sem regeneração não há vida cristã autêntica; há apenas religiosidade sem nova natureza.",
    },
    {
      id: "atuacao-do-espirito",
      titulo: "A atuação do Espírito Santo na regeneração",
      sinopse:
        "O Espírito convence, transforma e gera nova vida por meio da graça e da Palavra.",
      explicacaoBiblica: [
        "O Espírito age como vento: invisível, mas com efeitos reais e perceptíveis.",
        "Tito 3.5 mostra que a regeneração acontece pela misericórdia de Deus e pela renovação do Espírito Santo.",
        "Ezequiel 36.26-27 antecipa a promessa do novo coração e da ação interior do Espírito.",
      ],
      aplicacaoPratica: [
        "Leve os alunos a reconhecer que conversão genuína não é produto de carisma humano ou rito religioso.",
        "Incentive a classe a responder à voz do Espírito com quebrantamento, fé e submissão.",
      ],
      pense:
        "Você tem tratado a obra do Espírito como detalhe da fé ou como fundamento da nova vida?",
      pontoImportante:
        "A regeneração é uma obra exclusiva da graça, realizada pelo Espírito e recebida pela fé.",
    },
    {
      id: "santificacao-como-evidencia",
      titulo: "O Espírito habita o crente e opera a santificação",
      sinopse:
        "O mesmo Espírito que regenera permanece no crente e o conduz em santificação.",
      explicacaoBiblica: [
        "1 Coríntios 6.19 afirma que o corpo do crente é templo do Espírito Santo.",
        "Gálatas 5 mostra que o fruto do Espírito aparece na vida de quem caminha sob sua direção.",
        "Santificação é processo contínuo que evidencia a realidade da salvação operada por Deus.",
      ],
      aplicacaoPratica: [
        "Mostre que santidade não é tentativa de merecer salvação, mas resposta à graça já recebida.",
        "Ajude a turma a identificar decisões diárias em que precisa cooperar com a obra do Espírito.",
      ],
      pense:
        "Quais sinais de santificação sua rotina já revela e em que área você ainda precisa render-se ao Espírito?",
      pontoImportante:
        "A presença do Espírito não é teoria espiritual; ela aparece em vida santa, caráter transformado e obediência prática.",
    },
  ],
  apoioProfessor: {
    quebraGelo:
      "Pergunte o que muda em alguém que realmente nasceu de novo e deixe a turma responder antes de abrir João 3.",
    perguntaChave:
      "O que o Espírito Santo faz na regeneração e como a santificação evidencia essa obra ao longo da vida cristã?",
    dificuldadeProvavelDaClasse:
      "Alguns alunos podem separar experiência espiritual de transformação moral, como se novo nascimento não precisasse aparecer em vida santa.",
    conducaoDaConversa: [
      "Mostre que regeneração é instantânea, enquanto santificação é contínua, sem separar as duas realidades.",
      "Use João 3 e Gálatas 5 para ligar novo nascimento a fruto visível na vida.",
      "Conecte a aula com decisões concretas, hábitos e lutas reais da juventude.",
    ],
    fechamento:
      "Conclua lembrando que o Espírito Santo inicia a nova vida, habita o crente e o conduz diariamente em santificação.",
  },
  aprofundamentoOpcional: {
    notaDoutrinariaCurta: [
      "Regeneração é o ponto de partida da nova vida; santificação é o desenvolvimento contínuo dessa vida no poder do Espírito.",
      "A graça de Deus não apenas perdoa: ela também recria, habita e transforma.",
    ],
    contextoBiblico: [
      "O diálogo com Nicodemos em João 3 é a grande chave do Novo Testamento para compreender o novo nascimento.",
      "Textos como Ezequiel 36 e Tito 3 mostram continuidade entre promessa, cumprimento e experiência cristã.",
    ],
    conexaoComVidaCrista: [
      "Jovens precisam aprender a medir maturidade não só por emoção ou fala religiosa, mas por fruto do Espírito e obediência.",
      "A certeza de que o Espírito habita o crente fortalece santidade, identidade e perseverança.",
    ],
  },
  revisao: {
    horaDaRevisao: [
      "O que é a regeneração?",
      "Qual é o papel do Espírito no novo nascimento?",
      "Como a santificação se relaciona com a salvação?",
      "Que sinais mostram que a nova vida está realmente operando em alguém?",
    ],
    quizCurto: [
      "Regeneração é obra humana ou ação do Espírito? Resposta esperada: ação do Espírito.",
      "Santificação vem antes ou depois da salvação? Resposta esperada: é evidência e desdobramento da salvação.",
      "O fruto do Espírito aponta para quê? Resposta esperada: para a realidade da nova vida em Cristo.",
    ],
    conclusao:
      "O Espírito Santo regenera, habita e santifica, formando no salvo uma vida nova que revela a grandeza da graça de Deus.",
  },
};

const objetivosJovensLicao7 = [
  "Compreender a maravilhosa graça na obra da salvação.",
  "Refletir a respeito da graça de Deus e as obras.",
  "Mostrar as implicações da graça na vida cristã.",
];

const topicosJovensLicao7 = [
  {
    titulo: "A maravilhosa graça na obra da salvação",
    conteudo: [
      "A graça de Deus nos alcança quando estávamos mortos em ofensas e pecados, incapazes de produzir vida espiritual por nós mesmos.",
      "A salvação nasce da misericórdia divina e nos arranca da morte para a vida em Cristo.",
      "Entender a graça começa por reconhecer a gravidade da condição humana sem Deus.",
    ],
  },
  {
    titulo: "A graça de Deus e as obras",
    conteudo: [
      "A salvação não vem das obras, mas a graça produz uma vida que transborda em boas obras preparadas por Deus.",
      "As obras da lei não salvam; as obras da graça revelam o fruto de um coração transformado.",
      "Fé verdadeira não é estéril: ela se expressa em obediência, amor e serviço.",
    ],
  },
  {
    titulo: "As implicações da graça na vida cristã",
    conteudo: [
      "A graça nos ensina a amar, perdoar e servir, refletindo na prática o que recebemos de Deus.",
      "Quem foi alcançado pela graça abandona a lógica do mérito e aprende a viver com gratidão diária.",
      "A vida cristã amadurece quando a graça sai do discurso e alcança relacionamentos, escolhas e serviço.",
    ],
  },
];

const subsidioJovensLicao7: LicaoEBD["subsidioJovens"] = {
  cabecalho: {
    numero: 7,
    titulo: "A Graça de Deus",
    data: "2026-02-15",
    trimestre: "Plano Perfeito — A Salvação da Humanidade, a Mensagem Central das Escrituras",
    textoPrincipal:
      "Efésios 2.8-9 declara que a salvação é pela graça, por meio da fé, e não por méritos humanos.",
    resumoDaLicao:
      "A salvação pela graça é um presente imerecido de Deus, que transforma o cristão para que viva refletindo essa graça em boas obras, amor, perdão e serviço aos outros.",
    leituraSemanal: [
      {
        dia: "Segunda",
        referencia: "Efésios 2.8-9",
        foco: "A salvação é dom gracioso de Deus.",
      },
      {
        dia: "Terça",
        referencia: "Efésios 2.10",
        foco: "A graça nos recria para boas obras.",
      },
      {
        dia: "Quarta",
        referencia: "Tiago 2.14-17",
        foco: "A fé verdadeira se expressa em ações concretas.",
      },
      {
        dia: "Quinta",
        referencia: "Tito 2.11-12",
        foco: "A graça também educa e corrige o viver do salvo.",
      },
      {
        dia: "Sexta",
        referencia: "Efésios 4.32",
        foco: "A graça forma uma vida marcada por amor, perdão e bondade.",
      },
      {
        dia: "Sábado",
        referencia: "Colossenses 3.12-14",
        foco: "A graça nos reveste de misericórdia, paciência e amor.",
      },
    ],
  },
  arranquePedagogico: {
    objetivos: objetivosJovensLicao7,
    interacao:
      "A aula precisa mostrar que graça não é apenas ponto de entrada da vida cristã. Ela continua moldando a forma como o jovem ama, perdoa, serve e responde à vontade de Deus.",
    orientacaoPedagogica:
      "Comece perguntando se a turma já recebeu algo que não merecia. Use essa experiência para explicar graça como favor imerecido e, depois, conduza Efésios 2 para mostrar que esse presente gera uma nova vida com boas obras.",
  },
  desenvolvimento: [
    {
      id: "graca-na-salvacao",
      titulo: "A maravilhosa graça na obra da salvação",
      sinopse:
        "A graça nos encontra em morte espiritual e nos vivifica juntamente com Cristo.",
      explicacaoBiblica: [
        "Efésios 2.1-7 descreve a condição humana anterior à graça como morte espiritual e escravidão ao pecado.",
        "A iniciativa da salvação nasce da misericórdia e do amor de Deus, não do valor do pecador.",
        "A graça produz uma mudança radical: da morte para a vida, da condenação para a esperança.",
      ],
      aplicacaoPratica: [
        "Ajude a turma a lembrar de onde Deus a tirou para aumentar a gratidão e diminuir o orgulho espiritual.",
        "Mostre que compreender a graça protege contra autossuficiência e desprezo pelos que ainda não conhecem a Cristo.",
      ],
      pense:
        "Você enxerga a salvação como presente imerecido ou ainda tenta viver como quem precisa conquistá-la?",
      pontoImportante:
        "A graça é a única razão pela qual passamos da morte para a vida em Cristo.",
    },
    {
      id: "graca-e-obras",
      titulo: "A graça de Deus e as obras",
      sinopse:
        "Boas obras não compram salvação, mas revelam a transformação operada pela graça.",
      explicacaoBiblica: [
        "Efésios 2.8-10 mostra que somos salvos pela graça e criados em Cristo para boas obras.",
        "Tiago 2 complementa essa verdade ao mostrar que fé viva se manifesta em atitudes concretas.",
        "A graça não enfraquece a obediência; ela capacita a obediência verdadeira.",
      ],
      aplicacaoPratica: [
        "Conduza a classe a abandonar tanto o legalismo quanto a passividade espiritual.",
        "Mostre que a pergunta certa não é 'como merecer?', mas 'como responder com fidelidade ao que recebi?'.",
      ],
      pense:
        "Suas ações revelam gratidão pela graça ou apenas religiosidade sem vida?",
      pontoImportante:
        "O cristão não é salvo pelas obras, mas a graça o salva para uma vida frutífera.",
    },
    {
      id: "implicacoes-da-graca",
      titulo: "As implicações da graça na vida cristã",
      sinopse:
        "Graça recebida se torna graça praticada em amor, perdão e serviço.",
      explicacaoBiblica: [
        "Efésios 4.32 e Colossenses 3 mostram que o perdão recebido em Cristo deve moldar nossa relação com os outros.",
        "Tito 2 ensina que a graça também educa o salvo a viver de modo santo neste mundo.",
        "O amor cristão nasce do fato de que fomos amados primeiro por Deus.",
      ],
      aplicacaoPratica: [
        "Ajude os alunos a identificar situações concretas em que precisam praticar graça com família, amigos e igreja.",
        "Mostre que servir é resposta de gratidão, não tentativa de compensar Deus pelo que Ele fez.",
      ],
      pense:
        "A graça que você celebra nos cultos aparece também no jeito como perdoa, serve e trata pessoas difíceis?",
      pontoImportante:
        "A graça de Deus transforma relações, atitudes e prioridades do cristão.",
    },
  ],
  apoioProfessor: {
    quebraGelo:
      "Pergunte à turma como se sente alguém que recebe um presente totalmente imerecido.",
    perguntaChave:
      "O que a graça de Deus realiza na salvação e como ela se desdobra em boas obras, amor, perdão e serviço?",
    dificuldadeProvavelDaClasse:
      "Alguns alunos podem opor graça e obediência, como se a gratuidade da salvação dispensasse transformação prática.",
    conducaoDaConversa: [
      "Use Efésios 2 para mostrar que a graça nos salva e nos recria para viver de forma nova.",
      "Destaque a diferença entre obras da lei e obras como fruto da graça.",
      "Conecte a aula com conflitos reais em que amor, perdão e serviço precisam aparecer.",
    ],
    fechamento:
      "Conclua lembrando que a graça não é só mensagem para acreditar, mas vida nova para praticar todos os dias.",
  },
  aprofundamentoOpcional: {
    notaDoutrinariaCurta: [
      "Graça é favor imerecido, mas também poder divino que sustenta toda a vida cristã do começo ao fim.",
      "Obras legítimas não competem com a graça; elas testemunham a transformação que a graça produziu.",
    ],
    contextoBiblico: [
      "Efésios 2 é texto-chave para compreender a passagem da morte espiritual para a vida pela graça.",
      "Tiago complementa Paulo ao mostrar que fé viva se manifesta concretamente no cotidiano.",
    ],
    conexaoComVidaCrista: [
      "Jovens que entendem a graça deixam de viver para provar valor e passam a viver em gratidão e serviço.",
      "A graça recebida precisa alcançar vínculos, feridas, decisões e o modo como tratamos o próximo.",
    ],
  },
  revisao: {
    horaDaRevisao: [
      "Qual era nossa condição antes da graça?",
      "Como a graça se relaciona com as boas obras?",
      "Por que graça não produz passividade?",
      "Que implicações práticas a graça traz para amor, perdão e serviço?",
    ],
    quizCurto: [
      "A salvação vem por mérito humano? Resposta esperada: não; vem pela graça.",
      "Boas obras salvam? Resposta esperada: não; são fruto da salvação.",
      "A graça ensina o salvo a viver como? Resposta esperada: com amor, perdão, serviço e santidade.",
    ],
    conclusao:
      "A graça de Deus salva, transforma e capacita o cristão a viver refletindo o amor que recebeu.",
  },
};

const objetivosJovensLicao8 = [
  "Apresentar o conceito bíblico de eleição.",
  "Compreender a eleição bíblica fundamentada em Jesus.",
  "Conhecer as implicações da eleição bíblica.",
];

const topicosJovensLicao8 = [
  {
    titulo: "O conceito bíblico de eleição",
    conteudo: [
      "A eleição bíblica faz parte do plano redentor de Deus e deve ser entendida em conexão com Cristo e com a resposta de fé.",
      "No testemunho bíblico, a eleição aparece fortemente em chave corporativa: Deus chama um povo para si e o envia em missão.",
      "Ela não é desculpa para passividade, mas convite para entrega real, santidade e obediência.",
    ],
  },
  {
    titulo: "A eleição fundamentada em Jesus",
    conteudo: [
      "Jesus é o Eleito por excelência, o Cordeiro escolhido antes da fundação do mundo para realizar a redenção.",
      "Todos os crentes são eleitos nEle, pois a eleição não acontece fora da união com Cristo.",
      "A escolha divina é profundamente cristocêntrica e nos liga à obra redentora do Filho.",
    ],
  },
  {
    titulo: "Implicações da eleição bíblica",
    conteudo: [
      "A eleição chama o povo de Deus à missão, à santidade e ao serviço no Reino.",
      "Quem foi alcançado por esse chamado vive para a glória de Deus e participa da proclamação do Evangelho.",
      "A eleição não é fim em si mesma; ela nos move a uma vida fiel e útil aos propósitos de Deus.",
    ],
  },
];

const subsidioJovensLicao8: LicaoEBD["subsidioJovens"] = {
  cabecalho: {
    numero: 8,
    titulo: "A Eleição na Salvação",
    data: "2026-02-22",
    trimestre: "Plano Perfeito — A Salvação da Humanidade, a Mensagem Central das Escrituras",
    textoPrincipal:
      "Efésios 1.4 mostra que Deus nos escolheu em Cristo para uma vida santa e irrepreensível diante dEle.",
    resumoDaLicao:
      "A compreensão da eleição nos impulsiona a uma vida de entrega total a Deus, refletindo sua glória e cumprindo seu propósito no mundo.",
    leituraSemanal: [
      {
        dia: "Segunda",
        referencia: "Efésios 1.4-5",
        foco: "Deus nos escolheu em Cristo com propósito santo.",
      },
      {
        dia: "Terça",
        referencia: "2 Timóteo 1.9",
        foco: "A eleição nos chama a viver segundo o propósito divino.",
      },
      {
        dia: "Quarta",
        referencia: "1 Pedro 1.2",
        foco: "Fomos eleitos para a obediência e a santificação.",
      },
      {
        dia: "Quinta",
        referencia: "1 Pedro 2.9",
        foco: "A eleição forma um povo de propriedade exclusiva de Deus.",
      },
      {
        dia: "Sexta",
        referencia: "Efésios 2.10",
        foco: "Os eleitos em Cristo são chamados para boas obras.",
      },
      {
        dia: "Sábado",
        referencia: "Romanos 12.1-2",
        foco: "A eleição nos conduz a uma vida entregue à vontade de Deus.",
      },
    ],
  },
  arranquePedagogico: {
    objetivos: objetivosJovensLicao8,
    interacao:
      "A aula precisa tratar eleição com reverência bíblica e responsabilidade pastoral, mostrando soberania divina, centralidade de Cristo e resposta humana de fé e obediência.",
    orientacaoPedagogica:
      "Comece perguntando se os alunos entendem a eleição como privilégio passivo ou como chamado para viver de modo santo e missionário. Depois organize a aula em torno de Cristo, da Igreja e do propósito de Deus para seu povo.",
  },
  desenvolvimento: [
    {
      id: "conceito-de-eleicao",
      titulo: "O conceito bíblico de eleição",
      sinopse:
        "A eleição faz parte do plano de Deus e chama um povo a responder em fé e obediência.",
      explicacaoBiblica: [
        "Efésios 1 e João 10 ajudam a perceber que a eleição bíblica está ligada à relação com Cristo e à resposta a sua voz.",
        "No Antigo Testamento, Deus elege Israel como povo para sua glória e para a história da salvação.",
        "No Novo Testamento, esse chamado se amplia em Cristo, alcançando judeus e gentios pela pregação do Evangelho.",
      ],
      aplicacaoPratica: [
        "Ensine a classe a não tratar eleição como debate estéril, mas como verdade que fortalece compromisso com Cristo.",
        "Mostre que responder ao chamado de Deus exige entrega, fé e perseverança.",
      ],
      pense:
        "Sua compreensão de eleição produz humildade e compromisso ou apenas curiosidade teológica sem transformação?",
      pontoImportante:
        "A eleição bíblica sempre aponta para Cristo e para um povo chamado a refletir sua glória.",
    },
    {
      id: "eleicao-fundamentada-em-jesus",
      titulo: "A eleição bíblica fundamentada em Jesus",
      sinopse:
        "Toda eleição para a salvação se torna realidade em Cristo, o Eleito de Deus.",
      explicacaoBiblica: [
        "Jesus é o Cordeiro escolhido antes da fundação do mundo para realizar a obra redentora.",
        "Efésios 1.4-5 mostra que fomos eleitos nEle e não fora dEle.",
        "A eleição cristã é cristocêntrica: ela nasce, se sustenta e se cumpre na obra do Filho.",
      ],
      aplicacaoPratica: [
        "Ajude a turma a perceber que segurança espiritual não está em abstrações, mas na união com Cristo.",
        "Mostre que ser eleito em Cristo significa viver intencionalmente para a glória de Deus.",
      ],
      pense:
        "Você enxerga sua identidade espiritual realmente enraizada em Cristo, ou ainda em desempenho, tradição ou comparação?",
      pontoImportante:
        "A eleição bíblica não afasta de Jesus; ela nos leva diretamente para Ele.",
    },
    {
      id: "implicacoes-da-eleicao",
      titulo: "Implicações da eleição bíblica",
      sinopse:
        "Quem foi alcançado pelo chamado de Deus vive em santidade, missão e serviço.",
      explicacaoBiblica: [
        "Mateus 28 e 2 Coríntios 5 mostram que a eleição participa do propósito missionário de Deus no mundo.",
        "1 Pedro 1 e 1 Pedro 2 ligam eleição a santidade, identidade e testemunho público.",
        "Efésios 2.10 mostra que os eleitos em Cristo são também chamados para boas obras.",
      ],
      aplicacaoPratica: [
        "Leve os alunos a enxergar a eleição como vocação para serviço e não como zona de conforto espiritual.",
        "Conecte o tema com evangelização, santidade e participação ativa na vida da igreja.",
      ],
      pense:
        "Sua vida tem refletido o propósito de Deus para os eleitos: santidade, missão e serviço?",
      pontoImportante:
        "A eleição nos chama não apenas para a salvação, mas também para um viver santo e útil ao Reino de Deus.",
    },
  ],
  apoioProfessor: {
    quebraGelo:
      "Pergunte se os alunos entendem eleição mais como privilégio ou como responsabilidade diante de Deus.",
    perguntaChave:
      "Como a eleição bíblica, fundamentada em Cristo, chama o salvo para santidade, missão e serviço?",
    dificuldadeProvavelDaClasse:
      "Alguns jovens podem associar eleição a fatalismo espiritual ou tratar o tema apenas como disputa teórica, sem perceber seu eixo cristocêntrico e prático.",
    conducaoDaConversa: [
      "Mantenha a explicação ancorada na perspectiva pentecostal/assembleiana já usada pela revista.",
      "Mostre que a eleição é inseparável de Cristo, da Igreja e da missão no mundo.",
      "Evite reducionismos individualistas e destaque a dimensão corporativa do povo de Deus.",
    ],
    fechamento:
      "Conclua reforçando que a eleição em Cristo é chamada para viver de modo santo, missionário e obediente, para a glória de Deus.",
  },
  aprofundamentoOpcional: {
    notaDoutrinariaCurta: [
      "A eleição bíblica deve ser lida a partir de Cristo, e não separada dEle.",
      "Na perspectiva pentecostal, soberania divina e responsabilidade humana não são inimigas, mas caminham juntas no drama da salvação.",
    ],
    contextoBiblico: [
      "Israel é eleito como povo no Antigo Testamento, e a Igreja aparece no Novo como povo eleito em Cristo.",
      "Textos como Efésios 1, 1 Pedro 1 e 1 Pedro 2 ajudam a ligar identidade, propósito e missão.",
    ],
    conexaoComVidaCrista: [
      "Jovens que entendem a eleição corretamente tendem a valorizar mais a graça, a santidade e a evangelização.",
      "A eleição não alimenta orgulho; ela produz gratidão e disposição para servir.",
    ],
  },
  revisao: {
    horaDaRevisao: [
      "Como a eleição bíblica é apresentada nas Escrituras?",
      "Por que a eleição precisa ser entendida em Cristo?",
      "Quais implicações práticas a eleição traz para o salvo?",
      "Como eleição e missão caminham juntas?",
    ],
    quizCurto: [
      "A eleição bíblica está fundamentada em quem? Resposta esperada: em Cristo.",
      "Ela chama o povo de Deus para quê? Resposta esperada: santidade, missão e serviço.",
      "A eleição é fim em si mesma? Resposta esperada: não.",
    ],
    conclusao:
      "A eleição na salvação é expressão do amor de Deus em Cristo e chamado a uma vida entregue à sua vontade, em santidade e missão.",
  },
};

const objetivosJovensLicao9 = [
  "Apresentar o livre-arbítrio como um dom de Deus.",
  "Saber o que é graça preveniente e como ela opera.",
  "Explicar a salvação como uma escolha capacitada pela graça.",
];

const topicosJovensLicao9 = [
  {
    titulo: "O livre-arbítrio como dom de Deus",
    conteudo: [
      "O ser humano foi criado com capacidade de escolha, consciência moral e responsabilidade diante de Deus.",
      "O pecado afetou profundamente essa capacidade, mas não anulou a dignidade humana nem a responsabilidade pelas escolhas.",
      "Em Cristo, a graça de Deus restaura a possibilidade de responder ao chamado divino.",
    ],
  },
  {
    titulo: "A necessidade da graça preveniente",
    conteudo: [
      "Por causa da corrupção do pecado, o ser humano não consegue escolher o bem espiritual sem a ação graciosa de Deus.",
      "A graça preveniente antecede a conversão e desperta o coração para arrependimento e fé.",
      "Ela é suficiente e universal em alcance, mas pode ser resistida pelo coração humano.",
    ],
  },
  {
    titulo: "Salvação como escolha capacitada pela graça",
    conteudo: [
      "A salvação é dom gratuito de Deus, mas requer resposta humana de fé, arrependimento e perseverança.",
      "A graça não anula a vontade; ela a restaura e a capacita a dizer sim a Deus.",
      "Depois da conversão, o crente continua chamado a perseverar diariamente em obediência.",
    ],
  },
];

const subsidioJovensLicao9: LicaoEBD["subsidioJovens"] = {
  cabecalho: {
    numero: 9,
    titulo: "O Livre-arbítrio na Salvação",
    data: "2026-03-01",
    trimestre: "Plano Perfeito — A Salvação da Humanidade, a Mensagem Central das Escrituras",
    textoPrincipal:
      "João 3.18 mostra que a resposta pessoal a Cristo está no centro da experiência da salvação.",
    resumoDaLicao:
      "A salvação é o dom gracioso de Deus, precedido pela graça preveniente, e requer do ser humano uma resposta de arrependimento, fé e perseverança.",
    leituraSemanal: [
      {
        dia: "Segunda",
        referencia: "Efésios 2.8-9",
        foco: "A salvação é dom de Deus, não conquista humana.",
      },
      {
        dia: "Terça",
        referencia: "Tito 2.11-12",
        foco: "A graça se manifesta e alcança a todos, chamando ao viver santo.",
      },
      {
        dia: "Quarta",
        referencia: "João 1.9-12",
        foco: "A verdadeira luz ilumina e chama a uma resposta.",
      },
      {
        dia: "Quinta",
        referencia: "Deuteronômio 30.19-20",
        foco: "Deus coloca diante do ser humano a responsabilidade de escolher o caminho da vida.",
      },
      {
        dia: "Sexta",
        referencia: "Hebreus 3.12",
        foco: "A perseverança continua sendo responsabilidade real do crente.",
      },
      {
        dia: "Sábado",
        referencia: "Filipenses 2.12-13",
        foco: "O crente coopera com Deus em obediência sustentada pela graça.",
      },
    ],
  },
  arranquePedagogico: {
    objetivos: objetivosJovensLicao9,
    interacao:
      "A aula deve mostrar que a salvação é inteiramente graciosa, mas não transforma o ser humano em robô. Deus chama, ilumina e capacita; o homem responde com fé, arrependimento e perseverança.",
    orientacaoPedagogica:
      "Comece perguntando sobre escolhas difíceis da vida e, a partir daí, mostre que o livre-arbítrio, ferido pelo pecado, precisa ser restaurado pela graça preveniente para responder corretamente ao chamado de Deus.",
  },
  desenvolvimento: [
    {
      id: "livre-arbitrio-dom-de-deus",
      titulo: "O livre-arbítrio: um dom de Deus",
      sinopse:
        "Deus criou o ser humano com consciência e capacidade de escolha, ainda que o pecado tenha corrompido essa realidade.",
      explicacaoBiblica: [
        "Gênesis, Deuteronômio e Josué mostram que Deus trata o ser humano como responsável diante de suas decisões.",
        "A queda afetou profundamente intelecto, vontade e afetos, tornando impossível o bem espiritual sem graça.",
        "Mesmo assim, a responsabilidade humana permanece, e Deus continua chamando à resposta.",
      ],
      aplicacaoPratica: [
        "Ajude a turma a perceber que escolhas espirituais não são neutras e carregam peso moral diante de Deus.",
        "Mostre que a liberdade humana deve ser entendida dentro da verdade bíblica, e não como autonomia absoluta.",
      ],
      pense:
        "Você tem tratado suas decisões espirituais como algo sério diante de Deus ou como escolha sem consequências?",
      pontoImportante:
        "Livre-arbítrio é dom de Deus, mas o pecado tornou necessária a ação prévia da graça para qualquer resposta salvadora.",
    },
    {
      id: "graca-preveniente",
      titulo: "A necessidade da graça",
      sinopse:
        "A graça preveniente antecede a conversão e desperta o pecador para responder ao chamado de Deus.",
      explicacaoBiblica: [
        "João 1.9 e Tito 2.11 mostram o alcance da ação graciosa de Deus em direção ao ser humano.",
        "João 16.8 revela o Espírito convencendo do pecado, da justiça e do juízo.",
        "A graça preveniente não salva automaticamente, mas restaura a capacidade de responder com arrependimento e fé.",
      ],
      aplicacaoPratica: [
        "Leve a classe a valorizar a iniciativa divina em cada processo de conversão genuína.",
        "Mostre que resistir continuamente à graça é endurecer o coração diante do amor de Deus.",
      ],
      pense:
        "Você reconhece a graça de Deus lhe antecedendo, despertando e atraindo para mais perto de Cristo?",
      pontoImportante:
        "A graça preveniente não anula a vontade humana; ela a ilumina, toca e capacita a responder.",
    },
    {
      id: "escolha-capacitada-pela-graca",
      titulo: "Salvação: uma escolha capacitada pela graça",
      sinopse:
        "A resposta salvadora do homem é real, pessoal e sustentada pela graça divina.",
      explicacaoBiblica: [
        "A salvação é dom de Deus, mas exige arrependimento e fé como resposta consciente ao Evangelho.",
        "Após a conversão, a perseverança continua sendo exercício diário de fidelidade na força da graça.",
        "Filipenses 2.12-13 ajuda a ver essa cooperação: Deus opera, e o crente responde em obediência.",
      ],
      aplicacaoPratica: [
        "Ensine a turma a dizer sim a Deus não apenas no início da caminhada, mas em cada dia da vida cristã.",
        "Mostre que perseverança não é automação espiritual, mas decisão contínua sustentada pela graça.",
      ],
      pense:
        "Você tem escolhido andar com Cristo todos os dias ou confiado que a vida espiritual se sustenta sozinha?",
      pontoImportante:
        "A salvação é dom gracioso, e a resposta humana é capacitada, despertada e sustentada por essa mesma graça.",
    },
  ],
  apoioProfessor: {
    quebraGelo:
      "Peça aos alunos que contem uma escolha difícil e o que pesou na decisão.",
    perguntaChave:
      "Como a graça de Deus restaura a capacidade humana de responder ao chamado da salvação com fé e perseverança?",
    dificuldadeProvavelDaClasse:
      "Alguns jovens podem confundir graça com automatismo espiritual ou imaginar liberdade humana como independência total de Deus.",
    conducaoDaConversa: [
      "Trabalhe a lição mostrando a queda, a necessidade da graça preveniente e a resposta humana à salvação.",
      "Use Deuteronômio 30 e João 1 para mostrar que Deus chama e o homem responde.",
      "Conecte o tema com perseverança prática, já que a vontade regenerada continua sendo exercida diariamente.",
    ],
    fechamento:
      "Conclua lembrando que Deus chama com graça, e o salvo responde com fé, arrependimento e perseverança no caminho de Cristo.",
  },
  aprofundamentoOpcional: {
    notaDoutrinariaCurta: [
      "Graça preveniente é a ação divina que antecede a conversão e torna possível uma resposta salvadora do pecador.",
      "A responsabilidade humana permanece real tanto antes quanto depois da conversão.",
    ],
    contextoBiblico: [
      "Deuteronômio 30 e João 1 ajudam a perceber que Deus se revela, ilumina e coloca o ser humano diante de escolha responsável.",
      "Textos apostólicos mostram que perseverança é continuação da vida de fé, não mera formalidade inicial.",
    ],
    conexaoComVidaCrista: [
      "Jovens precisam aprender a não terceirizar a própria resposta a Deus nem reduzir a conversão a evento emocional.",
      "A graça que chama é a mesma que sustenta decisões diárias de fidelidade.",
    ],
  },
  revisao: {
    horaDaRevisao: [
      "O que é livre-arbítrio?",
      "Por que a graça preveniente é necessária?",
      "Como a salvação é escolha capacitada pela graça?",
      "Qual é o papel da perseverança depois da conversão?",
    ],
    quizCurto: [
      "O pecado anulou totalmente a responsabilidade humana? Resposta esperada: não.",
      "A graça preveniente salva automaticamente? Resposta esperada: não.",
      "O crente é chamado a perseverar voluntariamente na fé? Resposta esperada: sim.",
    ],
    conclusao:
      "O livre-arbítrio na salvação só pode ser entendido corretamente à luz da graça de Deus, que chama, capacita e sustenta uma resposta fiel em Cristo.",
  },
};

const objetivosJovensLicao10 = [
  "Apresentar o conceito de arrependimento e sua importância para receber a salvação.",
  "Explicar a salvação e a fé salvífica.",
  "Esclarecer que a cooperação humana no processo da salvação não é mérito.",
];

const topicosJovensLicao10 = [
  {
    titulo: "Salvação e arrependimento",
    conteudo: [
      "Arrependimento é mudança de mente, atitude e direção diante de Deus.",
      "Ele envolve reconhecimento sincero do pecado, abandono do caminho antigo e nova disposição de obedecer ao Senhor.",
      "O arrependimento não salva por si mesmo, mas prepara o coração para receber a graça de Cristo.",
    ],
  },
  {
    titulo: "Salvação e fé salvífica",
    conteudo: [
      "Fé salvífica é confiança viva em Jesus Cristo como único e suficiente Salvador.",
      "Ela não se limita a concordância intelectual; envolve entrega, dependência e compromisso com o senhorio de Cristo.",
      "Por meio dessa fé, o crente é unido a Cristo e participa da sua vida, paz e justiça.",
    ],
  },
  {
    titulo: "Salvação e decisão pessoal",
    conteudo: [
      "A salvação é oferta graciosa de Deus, mas requer resposta pessoal de arrependimento e fé.",
      "Responder ao Evangelho não é mérito humano; é acolher humildemente a obra que Deus já realizou em Cristo.",
      "A graça não anula a responsabilidade: ela chama, capacita e aguarda uma entrega consciente e obediente.",
    ],
  },
];

const subsidioJovensLicao10: LicaoEBD["subsidioJovens"] = {
  cabecalho: {
    numero: 10,
    titulo: "Arrependimento e Fé como Respostas Humanas",
    data: "2026-03-08",
    trimestre: "Plano Perfeito — A Salvação da Humanidade, a Mensagem Central das Escrituras",
    textoPrincipal:
      "Marcos 1.15 resume o chamado do Evangelho: arrepender-se e crer na boa notícia do Reino de Deus.",
    resumoDaLicao:
      "A salvação é um dom da graça de Deus, recebido mediante arrependimento e fé. Essa resposta pessoal não é mérito humano, mas disposição humilde em receber a obra que Jesus realizou.",
    leituraSemanal: [
      {
        dia: "Segunda",
        referencia: "João 16.8",
        foco: "O Espírito Santo convence o mundo do pecado, da justiça e do juízo.",
      },
      {
        dia: "Terça",
        referencia: "Atos 2.38",
        foco: "O chamado apostólico à conversão começa com arrependimento sincero.",
      },
      {
        dia: "Quarta",
        referencia: "Efésios 2.8-9",
        foco: "A salvação continua sendo dom da graça, não conquista humana.",
      },
      {
        dia: "Quinta",
        referencia: "João 1.12",
        foco: "Receber a Cristo pela fé introduz o pecador na família de Deus.",
      },
      {
        dia: "Sexta",
        referencia: "Romanos 5.1",
        foco: "A fé une o salvo a Cristo e o coloca em paz com Deus.",
      },
      {
        dia: "Sábado",
        referencia: "Apocalipse 3.20",
        foco: "Cristo chama e espera uma resposta pessoal ao seu convite.",
      },
    ],
  },
  arranquePedagogico: {
    objetivos: objetivosJovensLicao10,
    interacao:
      "A aula precisa mostrar que arrependimento e fé não são obras meritórias, mas respostas humanas indispensáveis ao convite da graça. O Evangelho chama o coração inteiro a voltar-se para Cristo.",
    orientacaoPedagogica:
      "Comece distinguindo arrependimento de remorso e fé salvífica de mera crença intelectual. Depois organize a lição mostrando que o Espírito convence, o pecador responde e a graça continua sendo a base de toda a experiência de salvação.",
  },
  desenvolvimento: [
    {
      id: "salvacao-e-arrependimento",
      titulo: "Salvação e arrependimento",
      sinopse:
        "Arrependimento é transformação interior que muda mente, direção e vontade diante de Deus.",
      explicacaoBiblica: [
        "Marcos 1.15, Atos 2.38 e Atos 3.19 mostram o arrependimento no centro do chamado do Evangelho.",
        "O Espírito Santo convence o pecador e o conduz a reconhecer o pecado de forma séria e pessoal.",
        "Sem arrependimento sincero, a fé se torna discurso vazio sem quebrantamento real.",
      ],
      aplicacaoPratica: [
        "Ajude a turma a discernir entre tristeza passageira por consequências e verdadeiro abandono do pecado.",
        "Mostre que arrependimento contínuo continua sendo parte da caminhada cristã, não apenas do início da conversão.",
      ],
      pense:
        "Seu arrependimento tem produzido mudança real de direção ou apenas sentimento momentâneo?",
      pontoImportante:
        "Arrependimento não compra a salvação, mas prepara o coração para receber a graça de Cristo.",
    },
    {
      id: "salvacao-e-fe-salvifica",
      titulo: "Salvação e fé salvífica",
      sinopse:
        "Fé salvífica é confiança viva em Cristo, marcada por entrega e perseverança.",
      explicacaoBiblica: [
        "A fé que salva confia em Jesus como Salvador e Senhor, não apenas como ideia religiosa.",
        "Romanos 10.9-11 mostra fé do coração e confissão pública ligadas à experiência da salvação.",
        "A fé une o pecador a Cristo, produz paz com Deus e inaugura nova vida no Espírito.",
      ],
      aplicacaoPratica: [
        "Ensine a classe a avaliar se sua fé é apenas linguagem cristã ou dependência real de Jesus.",
        "Mostre que a fé cresce à medida que o crente permanece em relacionamento com Cristo e sua Palavra.",
      ],
      pense:
        "Sua fé é só concordância com verdades bíblicas ou entrega real do coração ao senhorio de Cristo?",
      pontoImportante:
        "A fé salvífica envolve confiança, entrega e compromisso com o Cristo que salva.",
    },
    {
      id: "salvacao-e-decisao-pessoal",
      titulo: "Salvação e decisão pessoal",
      sinopse:
        "A graça chama, e o ser humano responde pessoalmente com fé e arrependimento.",
      explicacaoBiblica: [
        "A salvação é oferecida por Deus a todos, mas se torna eficaz nos que respondem voluntariamente ao Evangelho.",
        "João 1.12 e Apocalipse 3.20 mostram Cristo chamando e aguardando acolhimento pessoal.",
        "Responder ao chamado não significa mérito humano, mas acolher com humildade o que Deus preparou em Cristo.",
      ],
      aplicacaoPratica: [
        "Leve a turma a assumir responsabilidade espiritual por sua resposta a Deus, sem terceirizar a fé.",
        "Mostre que decisão pessoal não é evento isolado; ela se prolonga em obediência, fidelidade e perseverança.",
      ],
      pense:
        "Você tem respondido ao chamado de Deus com entrega sincera ou apenas com proximidade religiosa?",
      pontoImportante:
        "A graça não anula a responsabilidade humana; ela a desperta e a capacita.",
    },
  ],
  apoioProfessor: {
    quebraGelo:
      "Peça à turma que diga a diferença entre remorso e arrependimento e use isso para abrir a aula.",
    perguntaChave:
      "Como arrependimento e fé funcionam como respostas humanas à salvação sem se tornarem mérito humano?",
    dificuldadeProvavelDaClasse:
      "Alguns jovens podem reduzir arrependimento a emoção e fé a mera crença mental, sem perceber a profundidade de ambas como resposta ao Evangelho.",
    conducaoDaConversa: [
      "Mantenha a distinção entre graça, arrependimento e fé, mostrando que a graça continua sendo a base de tudo.",
      "Use Marcos 1, João 1 e Romanos 10 para ligar chamada, resposta e união com Cristo.",
      "Conecte a aula com decisões concretas de obediência, abandono do pecado e perseverança.",
    ],
    fechamento:
      "Conclua lembrando que Deus oferece salvação por graça, e o ser humano responde com arrependimento sincero, fé viva e entrega real a Cristo.",
  },
  aprofundamentoOpcional: {
    notaDoutrinariaCurta: [
      "Arrependimento e fé não competem com a graça; eles são respostas despertadas e capacitadas pela graça.",
      "A fé salvífica envolve mais do que assentimento mental: ela abraça Cristo com confiança e submissão.",
    ],
    contextoBiblico: [
      "A pregação de Jesus, de João Batista e dos apóstolos une frequentemente arrependimento e fé no anúncio da salvação.",
      "Textos como Romanos 10 e João 1 ajudam a mostrar o caráter pessoal da resposta ao Evangelho.",
    ],
    conexaoComVidaCrista: [
      "Jovens precisam aprender a responder a Deus de forma pessoal, e não apenas por ambiente, costume ou pressão externa.",
      "Arrependimento e fé continuam relevantes para a manutenção de uma vida humilde e dependente de Cristo.",
    ],
  },
  revisao: {
    horaDaRevisao: [
      "O que significa arrependimento bíblico?",
      "O que distingue a fé salvífica de mera crença intelectual?",
      "Por que arrependimento e fé não são mérito humano?",
      "Como a graça e a responsabilidade humana aparecem juntas nessa lição?",
    ],
    quizCurto: [
      "Arrependimento é só remorso? Resposta esperada: não.",
      "A fé salvífica se limita a acreditar que Deus existe? Resposta esperada: não.",
      "Responder ao Evangelho com fé é mérito humano? Resposta esperada: não; é resposta à graça.",
    ],
    conclusao:
      "Arrependimento e fé são respostas humanas indispensáveis ao Evangelho, despertadas pela graça e dirigidas ao Cristo que salva.",
  },
};

const objetivosJovensLicao12 = [
  "Refletir sobre a necessidade da perseverança para alcançar a promessa.",
  "Reconhecer que a apostasia é um perigo real para quem se afasta da fé.",
  "Apresentar os contrapontos entre perseverança e apostasia, incentivando o compromisso de uma vida fiel a Cristo até o fim.",
];

const topicosJovensLicao12 = [
  {
    titulo: "Perseverança para alcançar a promessa",
    conteudo: [
      "Perseverar é manter os olhos fixos na promessa de Deus e não nas pressões passageiras do tempo presente.",
      "A esperança cristã produz coragem, estabilidade e constância mesmo em meio a provações reais.",
      "Perseverança não é apenas resistir; é continuar fazendo a vontade de Deus com fidelidade prática.",
    ],
  },
  {
    titulo: "A possibilidade da apostasia",
    conteudo: [
      "A apostasia é um afastamento consciente da fé, não um tropeço acidental ou mera ignorância espiritual.",
      "Ela se torna especialmente grave porque parte de quem conheceu a verdade e ainda assim a abandona deliberadamente.",
      "O recuo costuma começar em pequenas negligências: oração enfraquecida, comunhão abandonada e concessões ao pecado.",
    ],
  },
  {
    titulo: "Perseverança x apostasia",
    conteudo: [
      "Hebreus mostra dois caminhos opostos: perseverar na fé ou recuar para a perdição.",
      "A vida cristã fiel escolhe diariamente obedecer a Cristo, mesmo quando isso parece difícil, impopular ou solitário.",
      "Quem permanece em Cristo vive com convicção, vigilância e esperança, sustentado pelo Espírito Santo.",
    ],
  },
];

const subsidioJovensLicao12: LicaoEBD["subsidioJovens"] = {
  cabecalho: {
    numero: 12,
    titulo: "Perseverando na Salvação",
    data: "2026-03-22",
    trimestre: "Plano Perfeito — A Salvação da Humanidade, a Mensagem Central das Escrituras",
    textoPrincipal:
      "Hebreus 10.38 afirma que o justo viverá da fé e alerta para o perigo real do recuo espiritual.",
    resumoDaLicao:
      "Perseverar na fé é essencial para a salvação. A apostasia é um risco real, mas pode ser evitada com vigilância, fidelidade e confiança diária em Deus, sob o auxílio do Espírito Santo.",
    leituraSemanal: [
      {
        dia: "Segunda",
        referencia: "2 Coríntios 4.17-18",
        foco: "Perseverar é manter os olhos fixos no que é eterno.",
      },
      {
        dia: "Terça",
        referencia: "Romanos 12.1-2",
        foco: "A perseverança se mostra em um estilo de vida alinhado à vontade de Deus.",
      },
      {
        dia: "Quarta",
        referencia: "Colossenses 1.10",
        foco: "O salvo persevera buscando agradar a Deus em tudo.",
      },
      {
        dia: "Quinta",
        referencia: "Hebreus 3.12-13",
        foco: "Apostasia e endurecimento são perigos reais para quem negligencia a fé.",
      },
      {
        dia: "Sexta",
        referencia: "João 16.13; Romanos 8.13-14",
        foco: "O Espírito Santo auxilia o crente a permanecer firme.",
      },
      {
        dia: "Sábado",
        referencia: "Filipenses 1.6",
        foco: "Deus é fiel para completar a boa obra iniciada em nós.",
      },
    ],
  },
  arranquePedagogico: {
    objetivos: objetivosJovensLicao12,
    interacao:
      "A aula precisa tratar perseverança como parte essencial da caminhada cristã. O objetivo é mostrar que a fé salvadora não termina em um começo empolgado, mas se revela em fidelidade contínua até o fim.",
    orientacaoPedagogica:
      "Comece perguntando o que mais pressiona os jovens a desistirem da caminhada com Cristo. Em seguida, mostre em Hebreus 10 que perseverar envolve esperança, firmeza, vigilância e dependência do Espírito Santo.",
  },
  desenvolvimento: [
    {
      id: "perseveranca-para-a-promessa",
      titulo: "Perseverança para alcançar a promessa",
      sinopse:
        "A esperança em Deus produz coragem para continuar firme no caminho da fé.",
      explicacaoBiblica: [
        "Hebreus 10.35-36 liga confiança, perseverança e promessa em uma mesma dinâmica espiritual.",
        "A palavra hypomone comunica constância firme mesmo em meio a dores, pressões e sofrimentos.",
        "Perseverar é também continuar fazendo a vontade de Deus e não apenas suportar circunstâncias difíceis.",
      ],
      aplicacaoPratica: [
        "Leve a turma a identificar como a esperança futura sustenta a fidelidade presente.",
        "Mostre que perseverança não é impulso de um dia, mas decisão renovada em toda a caminhada.",
      ],
      pense:
        "Sua esperança em Deus tem produzido coragem real para continuar quando a caminhada fica difícil?",
      pontoImportante:
        "Quem persevera não vive preso ao presente; vive sustentado pela promessa de Deus.",
    },
    {
      id: "possibilidade-da-apostasia",
      titulo: "A possibilidade da apostasia",
      sinopse:
        "A apostasia é um abandono consciente da fé e precisa ser tratada com seriedade espiritual.",
      explicacaoBiblica: [
        "Hebreus 10.26-31 alerta sobre o perigo de rejeitar deliberadamente a verdade depois de conhecê-la.",
        "A gravidade da apostasia está em desprezar o Filho de Deus, seu sangue e a graça do Espírito.",
        "O afastamento raramente acontece de uma vez; ele cresce em negligências, concessões e frieza.",
      ],
      aplicacaoPratica: [
        "Ajude os alunos a perceber sinais iniciais de recuo: abandono de oração, distanciamento da igreja e vergonha do testemunho cristão.",
        "Incentive a turma a tratar pequenas concessões com seriedade, antes que se tornem hábitos de endurecimento.",
      ],
      pense:
        "Há alguma área em que seu coração já começou a recuar em silêncio, por cansaço, orgulho ou indiferença?",
      pontoImportante:
        "A apostasia é perigo real, mas a vigilância espiritual e a comunhão viva com Deus interrompem esse caminho.",
    },
    {
      id: "perseveranca-versus-apostasia",
      titulo: "Perseverança x apostasia",
      sinopse:
        "A vida cristã exige escolha diária entre permanecer em Cristo ou recuar da fé.",
      explicacaoBiblica: [
        "Hebreus 10.38-39 mostra que o justo vive da fé e não pertence aos que recuam para a perdição.",
        "A perseverança se expressa em integridade, constância devocional, comunhão e obediência mesmo sob pressão.",
        "O Espírito Santo sustenta quem decide permanecer fiel a Cristo até o fim.",
      ],
      aplicacaoPratica: [
        "Mostre que perseverar é escolha diária: manter vida devocional, amizades saudáveis, serviço e coragem de testemunho.",
        "Encoraje a turma a responder às dificuldades com fé madura, e não com fuga silenciosa da comunhão com Deus.",
      ],
      pense:
        "Você tem dado pequenos passos de fidelidade ou pequenas concessões que silenciam seu testemunho?",
      pontoImportante:
        "Perseverar é continuar dizendo sim a Cristo quando seria mais fácil recuar.",
    },
  ],
  apoioProfessor: {
    quebraGelo:
      "Pergunte quais pressões mais tentam um jovem a desistir da caminhada cristã.",
    perguntaChave:
      "O que sustenta a perseverança e como identificar, cedo, o risco da apostasia?",
    dificuldadeProvavelDaClasse:
      "Alguns alunos podem enxergar apostasia como algo distante demais, sem perceber que ela começa em negligências pequenas e contínuas.",
    conducaoDaConversa: [
      "Mostre que perseverança tem dimensão passiva e ativa: resistir e continuar obedecendo.",
      "Use Hebreus 10 para apresentar tanto o alerta quanto a esperança da permanência fiel.",
      "Conecte a aula com práticas concretas: oração, comunhão, leitura bíblica e coragem no testemunho.",
    ],
    fechamento:
      "Conclua lembrando que Deus chama seu povo à perseverança e oferece graça suficiente para permanecer firme até o fim.",
  },
  aprofundamentoOpcional: {
    notaDoutrinariaCurta: [
      "Perseverança não é autossustentação humana, mas fidelidade contínua sustentada pela graça de Deus.",
      "A apostasia precisa ser tratada com seriedade porque envolve abandono consciente da fé experimentada.",
    ],
    contextoBiblico: [
      "Hebreus foi escrito para fortalecer crentes pressionados a desistir, e por isso une advertência forte e encorajamento perseverante.",
      "Textos paulinos e joaninos reforçam que o Espírito Santo é auxílio real no caminho da fidelidade.",
    ],
    conexaoComVidaCrista: [
      "Jovens precisam aprender a vigiar hábitos cotidianos, pois a perseverança é construída no ordinário.",
      "A esperança da promessa futura fortalece o coração para não ceder ao desânimo do presente.",
    ],
  },
  revisao: {
    horaDaRevisao: [
      "O que produz coragem para perseverar na estrada da fé?",
      "O que significa hypomone?",
      "Como a apostasia começa e por que é tão grave?",
      "O que significa viver da fé em tempos difíceis?",
    ],
    quizCurto: [
      "A perseverança é só resistência passiva? Resposta esperada: não.",
      "A apostasia pode começar em pequenas negligências? Resposta esperada: sim.",
      "O justo é chamado a viver de quê? Resposta esperada: da fé.",
    ],
    conclusao:
      "Perseverar na salvação é permanecer fiel a Cristo, sustentado pela esperança, pela vigilância e pela graça do Espírito Santo.",
  },
};

const objetivosJovensLicao13 = [
  "Mostrar as diferenças entre o homem terreno e o espiritual.",
  "Explicar que Deus consumará sua obra ao estabelecer novo céu e nova terra.",
  "Saber que viver com Deus no centro de tudo é caminhar na contramão de um mundo antropocêntrico.",
];

const topicosJovensLicao13 = [
  {
    titulo: "Do terreno ao celestial",
    conteudo: [
      "A glorificação é a etapa final da salvação, quando o corpo corruptível dará lugar à incorruptibilidade.",
      "Em Adão herdamos a fragilidade do homem terreno; em Cristo herdaremos plenamente a vida do homem celestial.",
      "A esperança da glorificação nos ajuda a interpretar o presente à luz do que Deus ainda completará.",
    ],
  },
  {
    titulo: "Uma nova ordem do cosmos",
    conteudo: [
      "A consumação da salvação alcançará não apenas o ser humano, mas toda a criação.",
      "O novo céu e a nova terra revelam um mundo restaurado pela presença de Deus, sem maldição e sem desordem.",
      "O rio da vida e a árvore da vida apontam para plenitude, cura e comunhão eterna na presença do Senhor.",
    ],
  },
  {
    titulo: "Vivendo o futuro glorioso no presente trabalhoso",
    conteudo: [
      "A esperança da glorificação não produz fuga do presente, mas vida coerente com o Reino agora.",
      "O salvo é chamado a viver como cidadão celestial, canal da água da vida e testemunha em um mundo desordenado.",
      "Em contraste com a cultura centrada no ego, o cristão aprende a viver com mentalidade teocêntrica.",
    ],
  },
];

const subsidioJovensLicao13: LicaoEBD["subsidioJovens"] = {
  cabecalho: {
    numero: 13,
    titulo: "A Consumação da Salvação",
    data: "2026-03-29",
    trimestre: "Plano Perfeito — A Salvação da Humanidade, a Mensagem Central das Escrituras",
    textoPrincipal:
      "1 Coríntios 15.49 aponta para a grande esperança cristã: assim como trouxemos a imagem do terreno, traremos também a imagem do celestial.",
    resumoDaLicao:
      "A certeza da glorificação final nos impulsiona a viver como cidadãos celestiais, mesmo em um mundo em desordem.",
    leituraSemanal: [
      {
        dia: "Segunda",
        referencia: "Romanos 8.20-21",
        foco: "A criação aguarda libertação da corrupção.",
      },
      {
        dia: "Terça",
        referencia: "João 7.38-39",
        foco: "O Espírito já faz jorrar vida em quem crê.",
      },
      {
        dia: "Quarta",
        referencia: "Hebreus 12.1-3",
        foco: "Cristo inspira perseverança enquanto caminhamos para a glória.",
      },
      {
        dia: "Quinta",
        referencia: "Efésios 1.4",
        foco: "Fomos escolhidos em Cristo dentro do plano eterno de Deus.",
      },
      {
        dia: "Sexta",
        referencia: "Romanos 12.2",
        foco: "Viver para Deus exige mente renovada em meio a um mundo desordenado.",
      },
      {
        dia: "Sábado",
        referencia: "Gálatas 2.20",
        foco: "A vida centrada em Deus já antecipa a realidade futura do Reino.",
      },
    ],
  },
  arranquePedagogico: {
    objetivos: objetivosJovensLicao13,
    interacao:
      "A última lição do trimestre precisa erguer os olhos da turma para a glorificação final sem desconectá-la da vida presente. Esperança futura e fidelidade cotidiana caminham juntas.",
    orientacaoPedagogica:
      "Comece perguntando o que muda hoje quando o cristão sabe para onde está indo. A partir daí, mostre que glorificação, nova criação e vida centrada em Deus não são fuga do mundo, mas força para viver neste mundo com propósito.",
  },
  desenvolvimento: [
    {
      id: "do-terreno-ao-celestial",
      titulo: "Do terreno ao celestial",
      sinopse:
        "A glorificação consumará a salvação ao transformar completamente o que hoje ainda é marcado pela finitude.",
      explicacaoBiblica: [
        "1 Coríntios 15 mostra a transição do corpo corruptível para a incorruptibilidade gloriosa.",
        "O contraste entre Adão e Cristo ajuda a entender nossa passagem do homem terreno ao homem celestial.",
        "A esperança cristã inclui transformação real do corpo e libertação final da morte.",
      ],
      aplicacaoPratica: [
        "Ajude a turma a lidar com fraquezas, contradições e dores presentes à luz da promessa de transformação final.",
        "Mostre que a esperança da glorificação fortalece santidade e perseverança, em vez de produzir alienação.",
      ],
      pense:
        "Você tem interpretado suas limitações presentes à luz da glória futura prometida em Cristo?",
      pontoImportante:
        "O corpo atual é marcado pela finitude, mas o corpo glorificado será marcado pela vida incorruptível do Senhor.",
    },
    {
      id: "nova-ordem-do-cosmos",
      titulo: "Uma nova ordem do cosmos",
      sinopse:
        "A consumação da salvação alcançará toda a criação em um novo céu e nova terra.",
      explicacaoBiblica: [
        "Apocalipse 22 apresenta a cidade eterna cheia da presença de Deus, do Cordeiro e da vida que flui do seu trono.",
        "O rio da água da vida e a árvore da vida simbolizam restauração completa, cura e plenitude eterna.",
        "Romanos 8 conecta essa esperança com a criação que geme aguardando libertação final.",
      ],
      aplicacaoPratica: [
        "Leve a classe a perceber que o plano de Deus é maior do que sobrevivência pessoal: Ele está restaurando todas as coisas em Cristo.",
        "Mostre que esperança cósmica fortalece consolo, adoração e compromisso com o Reino.",
      ],
      pense:
        "Sua visão de salvação é ampla o suficiente para incluir a nova criação que Deus prometeu?",
      pontoImportante:
        "A redenção consumada incluirá criação restaurada, comunhão plena e Deus no centro para sempre.",
    },
    {
      id: "futuro-glorioso-presente-trabalhoso",
      titulo: "Vivendo o futuro glorioso no presente trabalhoso",
      sinopse:
        "A esperança da glória futura chama o salvo a uma vida teocêntrica e missionária já no presente.",
      explicacaoBiblica: [
        "Colossenses 3 e Gálatas 2 mostram que a vida do salvo já está orientada pelo céu mesmo enquanto caminha neste mundo.",
        "João 7 e Apocalipse 22 ajudam a entender o cristão como canal de vida em um mundo sedento e quebrado.",
        "Romanos 12 reforça a contracultura do salvo diante de um tempo marcado pelo ego e pela desordem.",
      ],
      aplicacaoPratica: [
        "Incentive a turma a viver com propósito, santidade e serviço, sem esperar a eternidade para começar a refletir o Reino.",
        "Ajude os alunos a identificar se Deus ou o ego ocupa o centro de suas prioridades, escolhas e estilo de vida.",
      ],
      pense:
        "Quem ocupa o centro das suas decisões diárias: a vontade de Deus ou as exigências do próprio ego?",
      pontoImportante:
        "Viver o futuro glorioso no presente é caminhar com mente renovada, coração teocêntrico e esperança firme.",
    },
  ],
  apoioProfessor: {
    quebraGelo:
      "Pergunte o que muda hoje quando alguém sabe com clareza qual é o seu destino final em Cristo.",
    perguntaChave:
      "Como a glorificação futura transforma a maneira como vivemos, servimos e enfrentamos o presente?",
    dificuldadeProvavelDaClasse:
      "Alguns alunos podem tratar a eternidade como tema distante demais, sem perceber como ela redefine identidade, prioridades e coragem no presente.",
    conducaoDaConversa: [
      "Mostre que glorificação, nova criação e vida presente não competem; uma sustenta a outra.",
      "Use 1 Coríntios 15 e Apocalipse 22 para unir esperança futura e fidelidade atual.",
      "Conecte a aula com propósito, santidade e vida centrada em Deus em meio a um mundo antropocêntrico.",
    ],
    fechamento:
      "Conclua lembrando a turma de que a consumação da salvação já lança luz sobre o presente e chama o salvo a viver como cidadão do céu desde agora.",
  },
  aprofundamentoOpcional: {
    notaDoutrinariaCurta: [
      "Glorificação é a etapa final da salvação, quando o que começou na graça será plenamente consumado em Cristo.",
      "A esperança escatológica bíblica é concreta: inclui corpo, criação e comunhão eterna com Deus.",
    ],
    contextoBiblico: [
      "1 Coríntios 15 e Apocalipse 22 oferecem uma das visões mais fortes da transformação final e da nova criação.",
      "Romanos 8, João 7 e Colossenses 3 ajudam a ligar essa esperança ao presente da igreja.",
    ],
    conexaoComVidaCrista: [
      "Jovens que vivem com os olhos na glória futura tendem a encarar o presente com mais santidade, firmeza e esperança.",
      "Uma vida centrada em Deus hoje já antecipa, em parte, a realidade futura do Reino consumado.",
    ],
  },
  revisao: {
    horaDaRevisao: [
      "O que significa passar do terreno ao celestial?",
      "Como a nova criação aparece na consumação da salvação?",
      "O que significa viver o futuro glorioso no presente trabalhoso?",
      "Como a esperança da glorificação muda nossas prioridades atuais?",
    ],
    quizCurto: [
      "A glorificação é etapa futura da salvação? Resposta esperada: sim.",
      "A consumação alcança só o ser humano? Resposta esperada: não; alcança também a criação.",
      "Viver com Deus no centro contrasta com qual mentalidade? Resposta esperada: com a mentalidade antropocêntrica.",
    ],
    conclusao:
      "A consumação da salvação nos lembra que a história caminha para a glória de Cristo, e essa esperança já deve moldar o modo como vivemos hoje.",
  },
};

const objetivosJovensLicao11 = [
  "Apresentar a doutrina bíblica da adoção como expressão da graça que nos insere de fato na família de Deus.",
  "Explicar como o Espírito Santo confirma a filiação cristã e nos conduz a uma relação viva com o Pai.",
  "Mostrar que a adoção é realidade presente, mas também esperança futura para quem pertence a Cristo.",
];

const topicosJovensLicao11 = [
  {
    titulo: "O que é a doutrina bíblica da adoção",
    conteudo: [
      "A adoção é um ato da graça de Deus que inclui o salvo em sua família e lhe concede nova identidade, privilégios e responsabilidades em Cristo.",
      "Em Jesus, deixamos de ser apenas criaturas marcadas pelo pecado e passamos a viver como filhos recebidos pelo Pai.",
      "Na ordem da salvação, a adoção mostra que Deus não apenas perdoa; Ele também acolhe, aproxima e estabelece comunhão familiar com o seu povo.",
    ],
  },
  {
    titulo: "Adotados mediante o Espírito: Aba, Pai",
    conteudo: [
      "O Espírito Santo confirma em nosso íntimo que pertencemos a Deus e nos ensina a nos aproximar do Senhor com intimidade reverente.",
      "Clamar 'Aba, Pai' não é fórmula religiosa; é expressão de um relacionamento vivo, caloroso e confiante com Deus.",
      "A presença do Espírito rompe a lógica do medo e fortalece uma obediência voluntária, alegre e coerente com a identidade de filhos.",
    ],
  },
  {
    titulo: "Adoção como realidade presente e futura",
    conteudo: [
      "Já desfrutamos hoje da identidade de filhos de Deus, com acesso ao Pai, consolo espiritual e lugar na família da fé.",
      "Ao mesmo tempo, aguardamos a plenitude dessa adoção quando nosso corpo for redimido e a glória futura se manifestar em Cristo.",
      "Como coerdeiros com Cristo, atravessamos sofrimentos presentes sem perder a esperança da herança eterna preparada por Deus.",
    ],
  },
];

const subsidioJovensLicao11: LicaoEBD["subsidioJovens"] = {
  cabecalho: {
    numero: 11,
    titulo: "A Adoção — Entrando na Família de Deus",
    data: "2026-03-15",
    trimestre: "Plano Perfeito — A Salvação da Humanidade, a Mensagem Central das Escrituras",
    textoPrincipal:
      "Romanos 8.15 mostra que não recebemos um espírito de escravidão, mas o Espírito de adoção, pelo qual clamamos: Aba, Pai.",
    resumoDaLicao:
      "Em Cristo, fomos feitos filhos de Deus por meio da adoção, guiados pelo Espírito e coerdeiros de uma esperança gloriosa.",
    leituraSemanal: [
      {
        dia: "Segunda",
        referencia: "Efésios 1.5",
        foco: "O fundamento da adoção está na vontade soberana de Deus.",
      },
      {
        dia: "Terça",
        referencia: "João 1.12",
        foco: "A adoção é recebida pela fé em Cristo.",
      },
      {
        dia: "Quarta",
        referencia: "Romanos 8.14-17",
        foco: "Os guiados pelo Espírito vivem como filhos e herdeiros de Deus.",
      },
      {
        dia: "Quinta",
        referencia: "Gálatas 4.6; Romanos 8.15",
        foco: "O Espírito confirma a adoção e conduz o coração à intimidade com o Pai.",
      },
      {
        dia: "Sexta",
        referencia: "1 João 3.1",
        foco: "A adoção é expressão do amor divino derramado sobre nós.",
      },
      {
        dia: "Sábado",
        referencia: "Romanos 8.23; 2 Timóteo 3.12",
        foco: "A adoção aponta para esperança futura e perseverança em meio ao sofrimento.",
      },
    ],
  },
  arranquePedagogico: {
    objetivos: objetivosJovensLicao11,
    interacao:
      "A aula precisa mostrar que Deus não apenas perdoa pecadores, mas os recebe em sua família. Isso fortalece identidade, segurança espiritual e compromisso com a vida cristã.",
    orientacaoPedagogica:
      "Comece perguntando à turma o que significa, na prática, sentir-se parte da família de Deus. Organize as respostas em dois blocos: identidade e relacionamento. Depois mostre como Romanos 8 e Gálatas 4 revelam a adoção como obra do Pai confirmada pelo Espírito.",
  },
  desenvolvimento: [
    {
      id: "doutrina-da-adocao",
      titulo: "O que é a doutrina bíblica da adoção",
      sinopse:
        "A adoção mostra que a salvação inclui pertencimento real à família de Deus, e não apenas livramento da condenação.",
      explicacaoBiblica: [
        "Efésios 1.5 mostra que a adoção está ligada ao propósito gracioso de Deus em Cristo.",
        "João 1.12 ensina que a nova condição de filhos se recebe mediante a fé em Jesus.",
        "Romanos 8 apresenta a adoção como realidade espiritual que reorganiza nossa identidade, nossa oração e nosso lugar diante do Pai.",
      ],
      aplicacaoPratica: [
        "Leve a classe a perceber que muitos ainda vivem como visitantes na fé, quando Deus os chama a viver como filhos acolhidos.",
        "Mostre que identidade cristã saudável combate tanto o orgulho quanto a insegurança espiritual.",
      ],
      pense:
        "Você se aproxima de Deus como alguém recebido em casa ou ainda como quem vive distante e inseguro?",
      pontoImportante:
        "Adoção é mais do que perdão: é relacionamento, intimidade e nova identidade em Cristo.",
    },
    {
      id: "aba-pai",
      titulo: "Adotados mediante o Espírito: Aba, Pai",
      sinopse:
        "O Espírito Santo confirma a filiação e conduz o crente a uma relação viva, próxima e obediente com Deus.",
      explicacaoBiblica: [
        "Romanos 8.15-16 mostra que o Espírito afasta o temor servil e confirma em nosso interior que somos filhos de Deus.",
        "Gálatas 4.6 reforça que o Espírito do Filho clama em nosso coração e nos ensina a nos relacionar com Deus como Pai.",
        "A expressão 'Aba, Pai' comunica intimidade reverente, confiança e proximidade produzidas pela obra do Espírito.",
      ],
      aplicacaoPratica: [
        "Incentive a turma a enxergar oração e obediência como marcas de filhos que conhecem o Pai, e não como peso religioso.",
        "Ajude os alunos a perceber que o Espírito não apenas consola; Ele também guia, corrige e fortalece.",
      ],
      pense:
        "O que muda na sua vida quando você entende que o Espírito confirma, no íntimo, que você pertence à família de Deus?",
      pontoImportante:
        "No Espírito, Deus não é distante: Ele é Pai, e seus filhos podem se aproximar com confiança e reverência.",
    },
    {
      id: "realidade-presente-futura",
      titulo: "Adoção como realidade presente e futura",
      sinopse:
        "A adoção já transforma a vida presente, mas também aponta para a plenitude futura da redenção.",
      explicacaoBiblica: [
        "Romanos 8.23 mostra que ainda aguardamos a consumação da adoção quando nosso corpo for plenamente redimido.",
        "1 João 3.1 reforça que a condição de filhos já é presente e nasce do amor do Pai.",
        "Romanos 8.17 ensina que os filhos de Deus são também herdeiros e coerdeiros com Cristo, inclusive no caminho de sofrimento e glória.",
      ],
      aplicacaoPratica: [
        "Mostre que a esperança futura não produz alienação, mas firmeza para enfrentar dores, conflitos e pressões do presente.",
        "Ajude a classe a nomear como a identidade de filhos pode curar feridas de rejeição, abandono ou insegurança.",
      ],
      pense:
        "Como a esperança de uma herança futura muda a forma como você atravessa sofrimentos e inseguranças hoje?",
      pontoImportante:
        "Quem foi adotado por Deus já vive uma nova identidade hoje e caminha com esperança para a glória futura.",
    },
  ],
  apoioProfessor: {
    quebraGelo:
      "Pergunte à turma o que significa, na prática, ser recebido por Deus como parte de sua família.",
    perguntaChave:
      "Como a doutrina da adoção muda a forma como um jovem enxerga sua identidade, sua oração e sua relação com a igreja?",
    dificuldadeProvavelDaClasse:
      "Alguns alunos podem reduzir a adoção a ideia sentimental ou confundi-la com mera metáfora religiosa sem efeitos reais na vida cristã.",
    conducaoDaConversa: [
      "Destaque a diferença entre ser criado por Deus e ser recebido como filho por meio da graça em Cristo.",
      "Explore como o Espírito fortalece intimidade, obediência e segurança espiritual.",
      "Conecte o tema com realidades de abandono, comparação e insegurança comuns à juventude.",
    ],
    fechamento:
      "Conclua lembrando a turma de que em Cristo fomos amados, aceitos e adotados, e convide os alunos a responder com confiança, santidade e vida em família.",
  },
  aprofundamentoOpcional: {
    notaDoutrinariaCurta: [
      "Adoção é linguagem relacional e jurídica ao mesmo tempo: fala de pertencimento, privilégios e responsabilidades.",
      "Na ordem da salvação, adoção se soma à justificação e à regeneração para mostrar a profundidade da obra de Cristo.",
    ],
    contextoBiblico: [
      "Romanos 8 e Gálatas 4 tratam a filiação cristã como fruto da obra trinitária: o Pai acolhe, o Filho redime e o Espírito confirma.",
      "O pano de fundo da adoção no mundo antigo ajuda a entender por que Paulo liga esse tema a herança, pertencimento e identidade.",
    ],
    conexaoComVidaCrista: [
      "Jovens que entendem a adoção em Cristo deixam de viver buscando aprovação desesperada em outros lugares.",
      "A segurança de ser filho de Deus fortalece a comunhão com a igreja, a oração e a coragem de viver como discípulo.",
    ],
  },
  revisao: {
    horaDaRevisao: [
      "O que a linguagem bíblica da adoção comunica sobre identidade e pertencimento?",
      "Como o Espírito confirma, no íntimo, que somos filhos de Deus?",
      "De que forma a adoção é realidade presente e também esperança futura?",
      "O que significa ser coerdeiro com Cristo no tempo presente?",
    ],
    quizCurto: [
      "A adoção é conquista humana ou ato da graça? Resposta esperada: ato da graça de Deus.",
      "Quem confirma nossa filiação e nos leva a clamar 'Aba, Pai'? Resposta esperada: o Espírito Santo.",
      "A adoção aponta só para o presente ou também para a glória futura? Resposta esperada: para os dois.",
    ],
    conclusao:
      "Em Cristo, o jovem não vive mais como órfão espiritual, mas como filho amado, guiado pelo Espírito e sustentado pela esperança da herança futura.",
  },
};

function criarLicao(
  seed: LicaoSeed,
  options: CriarLicaoJovensOptions = {}
): LicaoEBD {
  const {
    edicao = "2026-1t",
    statusEditorial = "published",
    dataLiberacaoPublica,
  } = options;

  return {
    id: `jovens-${edicao}-licao-${seed.numero}`,
    slug: `licao-${seed.numero}`,
    numero: seed.numero,
    data: seed.data,
    ...(dataLiberacaoPublica
      ? { dataLiberacaoPublica }
      : {}),
    statusEditorial,
    titulo: seed.titulo,
    resumo: seed.resumo,
    textoChave: normalizeBibleReferenceNotation(seed.textoChave),
    verdadePratica: seed.verdadePratica,
    leituraBiblica: normalizeReferences(seed.leituraBiblica),
    objetivos: [
      `Entender como ${seed.enfase.toLowerCase()} participa da formação espiritual da juventude.`,
      "Relacionar a lição com decisões concretas, afetos, rotina e testemunho cristão.",
      "Transformar o ensino da semana em postura de fé, constância e serviço.",
    ],
    topicos: [
      {
        titulo: "Entendendo o tema",
        conteudo: [seed.resumo, seed.verdadePratica],
      },
      {
        titulo: "Leitura bíblica em classe",
        conteudo: seed.leituraBiblica.map((referencia) => `Leitura sugerida: ${referencia}.`),
      },
      {
        titulo: "Vivendo a lição",
        conteudo: [seed.aplicacao],
      },
    ],
    aplicacao: seed.aplicacao,
    apoioProfessor: apoioProfessorBase,
    apoioAluno: apoioAlunoBase,
  };
}

function criarLicaoEditorialJovens(
  seed: LicaoSeed,
  editorial: JovensEditorialConfig,
  options: CriarLicaoJovensOptions = {}
): LicaoEBD {
  return {
    ...criarLicao(seed, options),
    imagem: editorial.imagem,
    objetivos: editorial.objetivos,
    topicos: editorial.topicos,
    apoioProfessor: editorial.apoioProfessor,
    apoioAluno: editorial.apoioAluno,
    esboco: editorial.esboco,
    subsidioJovens: normalizeYoungSubsidy(editorial.subsidioJovens),
  };
}

function adicionarSemanas(dataInicial: string, semanas: number) {
  const date = new Date(`${dataInicial}T12:00:00-03:00`);
  date.setDate(date.getDate() + semanas * 7);
  return date.toISOString().slice(0, 10);
}

function criarLicaoPlaceholder(
  edicao: string,
  numero: number,
  data: string
): LicaoEBD {
  const trimestre = `${edicao.slice(5, 6)}º Trimestre de ${edicao.slice(0, 4)}`;
  const resumoPlaceholder =
    "Conteúdo em preparação para a classe de Jovens. Esta lição será publicada com resumo original, aplicação prática e apoio ao professor.";

  return {
    id: `jovens-${edicao}-licao-${numero}`,
    slug: `licao-${numero}`,
    numero,
    data,
    statusEditorial: "draft",
    titulo: `Lição ${numero}`,
    resumo: resumoPlaceholder,
    leituraBiblica: [],
    objetivos: [],
    topicos: [],
    aplicacao:
      "Acompanhe esta edição da EBD e volte em breve para acessar a lição completa.",
    subsidioJovens: {
      cabecalho: {
        numero,
        titulo: `Lição ${numero}`,
        data,
        trimestre,
        leituraSemanal: [],
      },
      arranquePedagogico: {
        objetivos: [],
      },
      desenvolvimento: [],
      apoioProfessor: {},
    },
  };
}

function criarTrimestrePlaceholder({
  slug,
  trimestre,
  imagem,
}: PlaceholderQuarterConfig): TrimestreEBD {
  const dataInicialPorEdicao: Record<string, string> = {
    "2026-2t": "2026-04-05",
    "2026-3t": "2026-07-05",
    "2026-4t": "2026-10-04",
  };
  const dataInicial = dataInicialPorEdicao[slug];

  return {
    id: `jovens-${slug}`,
    slug,
    ano: 2026,
    trimestre,
    statusEditorial: "draft",
    rotulo: `${trimestre}º Trimestre de 2026`,
    titulo: `${trimestre}º Trimestre de 2026`,
    subtitulo: "Conteúdo em preparação",
    descricao:
      "Esta edição da classe de Jovens já está aberta no site e receberá as lições progressivamente conforme a curadoria e a revisão editorial forem concluídas.",
    classe: "jovens",
    imagem,
    licoes: Array.from({ length: 13 }, (_, index) =>
      criarLicaoPlaceholder(slug, index + 1, adicionarSemanas(dataInicial, index))
    ),
  };
}

const trimestreJovensSegundoTrimestre =
  "Entre a Verdade e o Engano — Combatendo Ideologias e Ensinos que se Opõem à Palavra de Deus";

function criarLicaoJovensSegundoTrimestre(
  seed: LicaoSeedJovensSegundoTrimestre,
  options: CriarLicaoJovensOptions = {}
): LicaoEBD {
  const base = criarLicao(
    {
      numero: seed.numero,
      data: seed.data,
      titulo: seed.titulo,
      resumo: seed.resumo,
      textoChave: seed.textoPrincipal,
      verdadePratica: seed.verdadePratica,
      leituraBiblica: [seed.textoPrincipal],
      aplicacao: seed.aplicacao,
      enfase: seed.enfase,
    },
    {
      edicao: "2026-2t",
      statusEditorial: "published",
      ...options,
    }
  );

  return {
    ...base,
    imagem: getEbdLessonImagePath("jovens", "2026-2t", seed.numero, "jpg"),
    subsidioJovens: normalizeYoungSubsidy({
      cabecalho: {
        numero: seed.numero,
        titulo: seed.titulo,
        data: seed.data,
        trimestre: trimestreJovensSegundoTrimestre,
        textoPrincipal: seed.textoPrincipal,
        resumoDaLicao: seed.resumo,
        leituraSemanal: seed.leituraSemanal,
      },
      arranquePedagogico: {
        objetivos: base.objetivos,
      },
      desenvolvimento: [],
      apoioProfessor: {},
    }),
  };
}

function criarObjetivosJovensSegundoTrimestre(
  seed: LicaoSeedJovensSegundoTrimestre
) {
  return [
    `Identificar como a lição "${seed.titulo}" confronta ideias e ensinos que tentam disputar o lugar da verdade bíblica.`,
    `Relacionar ${seed.enfase} com o texto principal, a leitura semanal e as escolhas concretas da juventude cristã.`,
    "Responder ao tema da semana com discernimento espiritual, firmeza doutrinária e aplicação prática.",
  ];
}

function criarTopicosJovensSegundoTrimestre(
  seed: LicaoSeedJovensSegundoTrimestre
): LicaoEBD["topicos"] {
  return [
    {
      titulo: "Panorama do tema",
      conteudo: [
        seed.resumo,
        `A lição enfatiza ${seed.enfase} e mostra por que esse assunto precisa ser avaliado à luz das Escrituras.`,
      ],
    },
    {
      titulo: "A resposta das Escrituras",
      conteudo: [
        seed.verdadePratica,
        `Texto principal para meditação e confronto bíblico: ${seed.textoPrincipal}.`,
        `A leitura semanal reforça esse discernimento ao longo da semana com passagens que ampliam a compreensão do tema.`,
      ],
    },
    {
      titulo: "Discernimento e prática cristã",
      conteudo: [
        seed.aplicacao,
        "A juventude precisa permanecer fiel à verdade mesmo quando o ambiente cultural normaliza leituras contrárias ao Evangelho.",
      ],
    },
  ];
}

function criarEsbocoJovensSegundoTrimestre(
  seed: LicaoSeedJovensSegundoTrimestre
): NonNullable<LicaoEBD["esboco"]> {
  return [
    {
      titulo: "Abertura",
      conteudo:
        `Introduza "${seed.titulo}" mostrando como esse tema aparece no cotidiano da juventude e por que ele precisa ser discernido biblicamente.`,
    },
    {
      titulo: "Desenvolvimento",
      conteudo:
        `Conduza a aula a partir de ${seed.textoPrincipal}, da leitura semanal e da verdade prática, destacando a resposta bíblica ao tema.`,
    },
    {
      titulo: "Aplicação",
      conteudo:
        `${seed.aplicacao} Encerre levando a classe a assumir uma postura de fidelidade prática diante do tema estudado.`,
    },
  ];
}

function criarApoioProfessorJovensSegundoTrimestre(
  seed: LicaoSeedJovensSegundoTrimestre
) {
  return [
    `Conduza a classe a perceber como "${seed.titulo}" aparece em discursos, hábitos e referências culturais que alcançam a juventude.`,
    `Mantenha a conversa centrada em ${seed.textoPrincipal} e nas leituras da semana, evitando respostas superficiais ou apenas reativas.`,
  ];
}

function criarApoioAlunoJovensSegundoTrimestre(
  seed: LicaoSeedJovensSegundoTrimestre
) {
  return [
    `Releia ${seed.textoPrincipal} e escolha uma passagem da leitura semanal para anotar como ela fortalece seu discernimento sobre o tema da lição.`,
    "Observe durante a semana onde esse assunto aparece nas conversas, nas mídias e nas escolhas pessoais, e leve sua percepção para a aula.",
  ];
}

function criarSubsidioJovensSegundoTrimestre(
  seed: LicaoSeedJovensSegundoTrimestre
): NonNullable<LicaoEBD["subsidioJovens"]> {
  const objetivos = criarObjetivosJovensSegundoTrimestre(seed);

  return {
    cabecalho: {
      numero: seed.numero,
      titulo: seed.titulo,
      data: seed.data,
      trimestre: trimestreJovensSegundoTrimestre,
      textoPrincipal: seed.textoPrincipal,
      resumoDaLicao: seed.resumo,
      leituraSemanal: seed.leituraSemanal,
    },
    arranquePedagogico: {
      objetivos,
      interacao:
        `Abra a aula pedindo que a turma cite situações em que "${seed.titulo}" aparece no cotidiano e use as respostas para conduzir a necessidade de discernimento bíblico.`,
      orientacaoPedagogica:
        `Mantenha a aula focada no confronto entre ${seed.enfase} e a verdade revelada nas Escrituras, ajudando a juventude a pensar biblicamente e reagir com convicção e graça.`,
    },
    desenvolvimento: [
      {
        id: `jovens-2t-licao-${seed.numero}-panorama`,
        titulo: "Panorama do tema",
        sinopse: seed.resumo,
        explicacaoBiblica: [
          `O texto principal ${seed.textoPrincipal} oferece o eixo bíblico para compreender o tema da lição.`,
          seed.verdadePratica,
          "A juventude precisa aprender a julgar ideias, discursos e propostas contemporâneas à luz da Palavra de Deus.",
        ],
        aplicacaoPratica: [
          `Ajude a turma a identificar como "${seed.titulo}" se manifesta no ambiente cultural, escolar, digital ou relacional.`,
          "Mostre que nem toda proposta atraente, moderna ou popular é compatível com a fé cristã.",
        ],
        pense:
          "Onde esse tema pressiona sua forma de pensar, falar ou decidir durante a semana?",
        pontoImportante:
          "Discernimento espiritual começa quando a verdade bíblica volta a ocupar o centro da interpretação da realidade.",
      },
      {
        id: `jovens-2t-licao-${seed.numero}-resposta-biblica`,
        titulo: "A resposta das Escrituras",
        sinopse:
          "A resposta cristã não nasce de improviso, mas do confronto fiel entre o ensino bíblico e as ideias do tempo presente.",
        explicacaoBiblica: [
          `A leitura semanal reforça ${seed.enfase} e amplia o entendimento do tema ao longo da semana.`,
          "O texto principal e as demais referências lembram que a verdade não é moldada por pressões culturais, mas pela revelação de Deus.",
        ],
        referenciasCruzadas: seed.leituraSemanal.map((item) => ({
          referencia: item.referencia,
          descricao: item.foco,
        })),
        aplicacaoPratica: [
          "Revise com a classe as passagens da semana e destaque como cada uma protege a mente do jovem contra o erro.",
          `Retome a verdade prática e mostre como ela sustenta a resposta cristã ao tema "${seed.titulo}".`,
        ],
        pense:
          "Como o texto principal e as leituras da semana ajudam você a responder esse tema com firmeza e graça?",
        pontoImportante:
          "Discernimento bíblico exige mente renovada, leitura consistente das Escrituras e coragem para permanecer na verdade.",
      },
      {
        id: `jovens-2t-licao-${seed.numero}-fidelidade-pratica`,
        titulo: "Fidelidade e testemunho",
        sinopse:
          "A juventude cristã é chamada a responder ao tema da lição com convicção, santidade e testemunho coerente.",
        explicacaoBiblica: [
          "A resposta do crente não é apenas intelectual; ela precisa alcançar hábitos, linguagem, escolhas e relacionamentos.",
          "O Evangelho forma uma postura de fidelidade que rejeita o engano e testemunha a verdade com firmeza e amor.",
        ],
        aplicacaoPratica: [
          seed.aplicacao,
          "Ore com a turma para que a verdade de Deus governe mente, linguagem e decisões durante a semana.",
        ],
        pense:
          "Que ajuste prático esta lição exige da sua rotina, das suas conversas e do seu testemunho cristão?",
        pontoImportante:
          "Não basta identificar o erro; é preciso permanecer fiel à verdade em Cristo.",
      },
    ],
    apoioProfessor: {
      quebraGelo:
        `Pergunte onde "${seed.titulo}" aparece no cotidiano da juventude e use as respostas para conduzir a necessidade de discernimento bíblico.`,
      perguntaChave:
        `Como a juventude pode responder biblicamente a "${seed.titulo}" sem perder firmeza doutrinária nem sensibilidade pastoral?`,
      dificuldadeProvavelDaClasse:
        "Parte da turma pode tratar o tema apenas como debate cultural, sem perceber como ele pressiona identidade, moralidade, fé e testemunho cristão.",
      conducaoDaConversa: [
        "Traga a classe de volta às Escrituras sempre que o debate correr para opiniões soltas ou reações puramente ideológicas.",
        `Mostre que ${seed.enfase} precisa ser discernido com Bíblia aberta, mente renovada e vida submetida ao senhorio de Cristo.`,
        "Procure transformar a aula em formação espiritual e não apenas em reação cultural.",
      ],
      fechamento:
        "Encerre reforçando que permanecer na verdade exige discernimento, fidelidade às Escrituras e prática cristã coerente ao longo da semana.",
    },
    aprofundamentoOpcional: {
      notaDoutrinariaCurta: [seed.verdadePratica],
      contextoBiblico: [
        `Texto principal da lição: ${seed.textoPrincipal}.`,
        "A leitura semanal amplia o olhar bíblico e ajuda a classe a enxergar o tema com mais maturidade espiritual.",
      ],
      conexaoComVidaCrista: [seed.aplicacao],
    },
    revisao: {
      horaDaRevisao: [
        `Qual o principal alerta da lição "${seed.titulo}"?`,
        "Como o texto principal ajuda a confrontar esse tema com a verdade bíblica?",
        "Que passagens da leitura semanal mais fortaleceram seu discernimento nesta semana?",
        "Que atitude prática a juventude deve assumir diante do tema estudado?",
      ],
      conclusao:
        `Em "${seed.titulo}", a juventude é chamada a permanecer firme na verdade, discernindo o erro e respondendo ao tema da semana com fidelidade a Cristo.`,
    },
  };
}

function criarLicaoJovensSegundoTrimestreEnriquecida(
  seed: LicaoSeedJovensSegundoTrimestre,
  options: CriarLicaoJovensOptions = {}
): LicaoEBD {
  const base = criarLicaoJovensSegundoTrimestre(seed, options);
  const objetivos = criarObjetivosJovensSegundoTrimestre(seed);
  const topicos = criarTopicosJovensSegundoTrimestre(seed);

  return {
    ...base,
    objetivos,
    topicos,
    apoioProfessor: criarApoioProfessorJovensSegundoTrimestre(seed),
    apoioAluno: criarApoioAlunoJovensSegundoTrimestre(seed),
    esboco: criarEsbocoJovensSegundoTrimestre(seed),
    subsidioJovens: normalizeYoungSubsidy(
      criarSubsidioJovensSegundoTrimestre(seed)
    ),
  };
}

const sementesJovensPrimeiroTrimestre: LicaoSeed[] = [
  {
    numero: 1,
    data: "2026-01-04",
    titulo: "O Conceito Bíblico da Salvação",
    resumo:
      "A salvação, na Bíblia, é o livramento de Deus que começa no Antigo Testamento e se cumpre plenamente em Jesus Cristo no Novo Testamento.",
    textoChave: "Gênesis 3.15",
    verdadePratica:
      "A salvação bíblica nasce da iniciativa de Deus, atravessa a história da redenção e alcança sua plenitude em Cristo.",
    leituraBiblica: [
      "Juízes 2.16,18",
      "1 Samuel 7.7-10",
      "1 Samuel 17.45-46",
      "1 Samuel 19.5",
      "João 3.16-17",
    ],
    aplicacao:
      "Reserve um tempo nesta semana para agradecer a Deus pela salvação revelada em Cristo e anote como essa verdade precisa fortalecer sua fé hoje.",
    enfase: "o conceito bíblico da salvação",
  },
  {
    numero: 2,
    data: "2026-01-11",
    titulo: "O Problema do Pecado",
    resumo:
      "O pecado separa, mas Cristo restaura: Ele é a solução divina para a culpa, o sofrimento e a morte que assolam a humanidade.",
    textoChave: "Romanos 3.23",
    verdadePratica:
      "O pecado rompe a comunhão com Deus, mas a graça em Cristo oferece reconciliação, perdão e nova vida.",
    leituraBiblica: ["Gênesis 3.1-7", "Romanos 5.12", "2 Coríntios 5.18-19"],
    aplicacao:
      "Ore nesta semana reconhecendo diante de Deus áreas em que você precisa de arrependimento sincero e da restauração que Cristo oferece.",
    enfase: "a gravidade do pecado e a resposta da graça",
  },
  {
    numero: 3,
    data: "2026-01-18",
    titulo: "A Natureza do Deus que Salva",
    resumo:
      "A obra da salvação, que é revelada plenamente em Jesus Cristo, expressa a bondade, o amor e a santidade de Deus.",
    textoChave: "Salmos 34.8",
    verdadePratica:
      "A salvação revela o caráter do Deus que é bom, amoroso e santo, e por isso transforma a vida de quem crê.",
    leituraBiblica: [
      "Salmos 105.5-6",
      "Salmos 34.8-9",
      "Lucas 18.18-19",
      "Romanos 5.6-8",
    ],
    aplicacao:
      "Separe um momento para adorar a Deus por quem Ele é e peça que sua salvação molde seu caráter e suas escolhas nesta semana.",
    enfase: "a natureza do Deus que salva",
  },
  {
    numero: 4,
    data: "2026-01-25",
    titulo: "O Deus que Justifica",
    resumo:
      "O jovem cristão, que entende a realidade da justificação pela fé, vive com ousadia, gratidão e santidade, sabendo que foi perdoado, regenerado e capacitado para vencer em Cristo.",
    textoChave: "Romanos 5.1",
    verdadePratica:
      "Justificados pela fé, vivemos em paz com Deus, livres da culpa e firmados em nova identidade em Cristo.",
    leituraBiblica: ["Romanos 4.1-8", "Romanos 5.1", "Romanos 8.1", "Romanos 8.16-17"],
    aplicacao:
      "Durante esta semana, substitua a culpa pela confiança na obra de Cristo e viva conscientemente como alguém justificado pela fé.",
    enfase: "a justificação pela fé",
  },
  {
    numero: 5,
    data: "2026-02-01",
    titulo: "O Filho que Redime",
    resumo:
      "O sacrifício único de Jesus, como o Cordeiro de Deus, para nos redimir do pecado e nos reconciliar com o Pai, cumpre as profecias, trazendo libertação e perdão definitivo para quem crê.",
    textoChave: "João 1.29",
    verdadePratica:
      "A redenção e a reconciliação só se tornam possíveis por meio da obra salvadora de Cristo, o Cordeiro de Deus.",
    leituraBiblica: ["Êxodo 12.1-7,11", "João 1.29,32-34", "Hebreus 9.22", "1 Pedro 1.18-19"],
    aplicacao:
      "Adore a Cristo durante a semana como o Cordeiro que redime e viva com gratidão por ter sido reconciliado com o Pai.",
    enfase: "a redenção em Cristo",
  },
  {
    numero: 6,
    data: "2026-02-08",
    titulo: "O Espírito Santo que Regenera e Santifica",
    resumo:
      "A regeneração é uma transformação interior realizada pelo Espírito Santo. Essa obra da graça se evidencia por uma vida de santificação e obediência à vontade de Deus.",
    textoChave: "João 3.5",
    verdadePratica:
      "O Espírito Santo gera nova vida no salvo e continua operando nele uma santificação visível e diária.",
    leituraBiblica: ["João 3.1-15", "Tito 3.5", "Ezequiel 36.26-27", "Gálatas 5.22-23"],
    aplicacao:
      "Ore pedindo ao Espírito Santo que torne visíveis em sua rotina os frutos da nova vida que Ele operou em você.",
    enfase: "a regeneração e a santificação",
  },
  {
    numero: 7,
    data: "2026-02-15",
    titulo: "A Graça de Deus",
    resumo:
      "A salvação pela graça é um presente imerecido de Deus, que transforma o cristão para que viva refletindo essa graça em boas obras, amor, perdão e serviço aos outros.",
    textoChave: "Efésios 2.8-9",
    verdadePratica:
      "A graça salva gratuitamente e produz uma vida que responde a Deus com gratidão, amor e serviço.",
    leituraBiblica: ["Efésios 2.1-10", "Tiago 2.14-17", "Tito 2.11-12", "Efésios 4.32"],
    aplicacao:
      "Escolha uma atitude concreta de amor, perdão ou serviço para praticar nesta semana como resposta à graça recebida.",
    enfase: "a graça de Deus na salvação",
  },
  {
    numero: 8,
    data: "2026-02-22",
    titulo: "A Eleição na Salvação",
    resumo:
      "A compreensão da eleição nos impulsiona a uma vida de entrega total a Deus, refletindo sua glória e cumprindo seu propósito no mundo.",
    textoChave: "Efésios 1.4",
    verdadePratica:
      "A eleição em Cristo chama o salvo à santidade, à missão e ao serviço para a glória de Deus.",
    leituraBiblica: ["Efésios 1.3-14", "1 Pedro 1.2", "1 Pedro 2.9", "Romanos 12.1-2"],
    aplicacao:
      "Reflita nesta semana de que forma sua vida pode responder com mais entrega ao propósito de Deus para você em Cristo.",
    enfase: "a eleição em Cristo",
  },
  {
    numero: 9,
    data: "2026-03-01",
    titulo: "O Livre-arbítrio na Salvação",
    resumo:
      "A salvação é o dom gracioso de Deus, precedido pela graça preveniente, e requer do ser humano uma resposta de arrependimento, fé e perseverança.",
    textoChave: "João 3.18",
    verdadePratica:
      "A graça de Deus antecede, desperta e capacita o ser humano a responder com fé ao chamado da salvação.",
    leituraBiblica: ["Deuteronômio 30.15-20", "João 1.6-14", "Tito 2.11-12", "Filipenses 2.12-13"],
    aplicacao:
      "Identifique uma decisão espiritual concreta desta semana em que você precisa responder com obediência ao chamado de Deus.",
    enfase: "a resposta humana capacitada pela graça",
  },
  {
    numero: 10,
    data: "2026-03-08",
    titulo: "Arrependimento e Fé como Respostas Humanas",
    resumo:
      "A salvação é um dom da graça de Deus, recebido mediante arrependimento e fé. Essa resposta pessoal não é mérito humano, mas disposição humilde em receber a obra que Jesus realizou.",
    textoChave: "Marcos 1.15",
    verdadePratica:
      "Arrependimento e fé são respostas humanas despertadas pela graça e dirigidas ao Cristo que salva.",
    leituraBiblica: ["Marcos 1.14-15", "Romanos 10.9-11", "João 16.8", "Apocalipse 3.20"],
    aplicacao:
      "Faça uma oração de entrega sincera nesta semana, pedindo que Deus aprofunde em você arrependimento real e fé perseverante em Cristo.",
    enfase: "a resposta humana à salvação",
  },
  {
    numero: 11,
    data: "2026-03-15",
    titulo: "A Adoção — Entrando na Família de Deus",
    resumo: "Em Cristo, fomos feitos filhos de Deus por meio da adoção, guiados pelo Espírito e coerdeiros de uma esperança gloriosa.",
    textoChave: "Romanos 8:15",
    verdadePratica: "A adoção nos insere na família de Deus, fortalece nossa identidade e nos leva a viver como filhos guiados pelo Espírito.",
    leituraBiblica: ["Romanos 8:12-17", "Gálatas 4:1-7"],
    aplicacao: "Reserve um momento nesta semana para orar como filho diante do Pai e identificar de que forma essa verdade precisa moldar sua rotina e sua confiança em Deus.",
    enfase: "a filiação em Cristo",
  },
  {
    numero: 12,
    data: "2026-03-22",
    titulo: "Perseverando na Salvação",
    resumo:
      "Perseverar na fé é essencial para a salvação. A apostasia é um risco real, mas pode ser evitada com vigilância, fidelidade e confiança diária em Deus, sob o auxílio do Espírito Santo.",
    textoChave: "Hebreus 10.38",
    verdadePratica:
      "Perseverar é escolher, dia após dia, permanecer fiel a Cristo com vigilância, esperança e firmeza na fé.",
    leituraBiblica: ["Hebreus 10.26-39", "Hebreus 3.12-13", "Romanos 12.1-2", "Filipenses 1.6"],
    aplicacao:
      "Revise seus hábitos espirituais nesta semana e fortaleça intencionalmente aquilo que ajuda sua fé a permanecer firme em Cristo.",
    enfase: "a perseverança na fé",
  },
  {
    numero: 13,
    data: "2026-03-29",
    titulo: "A Consumação da Salvação",
    resumo:
      "A certeza da glorificação final nos impulsiona a viver como cidadãos celestiais, mesmo em um mundo em desordem.",
    textoChave: "1 Coríntios 15.49",
    verdadePratica:
      "A esperança da glorificação final chama o salvo a viver hoje com mente renovada, santidade e Deus no centro de tudo.",
    leituraBiblica: ["1 Coríntios 15.42-49", "Apocalipse 22.1-5", "Romanos 8.20-21", "Romanos 12.2"],
    aplicacao:
      "Consagre esta semana a viver com os olhos na eternidade e os pés firmes no presente, alinhando escolhas e prioridades ao Reino de Deus.",
    enfase: "a consumação da salvação",
  },
];

const editoriaisJovensPrimeiroTrimestre: Partial<
  Record<number, JovensEditorialConfig>
> = {
  1: {
    imagem: getEbdLessonImagePath("jovens", "2026-1t", 1, "png"),
    objetivos: objetivosJovensLicao1,
    topicos: topicosJovensLicao1,
    apoioProfessor: [
      "Apresente a ideia de salvação como linha bíblica contínua, do Éden à cruz, para evitar que a classe trate o tema como conceito isolado do Novo Testamento.",
      "Mostre que os livramentos do Antigo Testamento apontam para Cristo, sem transformar juízes, Samuel ou Davi em substitutos do Salvador definitivo.",
    ],
    apoioAluno: [
      "Leia João 3.16-17 durante a semana e escreva por que esse texto resume a plenitude da salvação em Cristo.",
      "Ore agradecendo por livramentos que Deus já trouxe à sua vida e conecte isso à salvação maior oferecida por Jesus.",
    ],
    esboco: [
      {
        titulo: "Entrada",
        conteudo:
          "Abra a aula perguntando o que a turma entende por salvação e organize as respostas para mostrar que a Bíblia fala de livramento, resgate e reconciliação.",
      },
      {
        titulo: "Desenvolvimento",
        conteudo:
          "Percorra a lição em três passos: conceito bíblico de salvação, salvadores levantados por Deus no Antigo Testamento e cumprimento pleno da salvação em Cristo.",
      },
      {
        titulo: "Fechamento",
        conteudo:
          "Conclua mostrando que toda a história bíblica aponta para Jesus como o Salvador definitivo e convide a turma a responder com fé e gratidão.",
      },
    ],
    subsidioJovens: subsidioJovensLicao1,
  },
  2: {
    imagem: getEbdLessonImagePath("jovens", "2026-1t", 2, "jpg"),
    objetivos: objetivosJovensLicao2,
    topicos: topicosJovensLicao2,
    apoioProfessor: [
      "Trate o pecado com seriedade bíblica, mas conduza a aula até a graça em Cristo para não transformar o estudo em moralismo ou culpa sem esperança.",
      "Ajude a classe a perceber que culpa, vergonha e separação são efeitos reais da queda e que a reconciliação em Cristo é a resposta de Deus para esse drama.",
    ],
    apoioAluno: [
      "Leia Gênesis 3.1-7 e 2 Coríntios 5.18-19 e anote como a Bíblia mostra o problema do pecado e a solução da reconciliação.",
      "Identifique uma área em que você precisa responder a Deus com arrependimento e fé, não com desculpas.",
    ],
    esboco: [
      {
        titulo: "Entrada",
        conteudo:
          "Comece a aula pedindo que a turma diga quais consequências do pecado são mais visíveis hoje e use isso para conduzir a leitura de Gênesis 3.",
      },
      {
        titulo: "Desenvolvimento",
        conteudo:
          "Organize a exposição em três eixos: origem do pecado, consequências da queda e resposta de Deus por meio da reconciliação em Cristo.",
      },
      {
        titulo: "Fechamento",
        conteudo:
          "Finalize mostrando que a graça de Cristo não encobre o pecado com superficialidade; ela restaura o pecador e inaugura nova vida.",
      },
    ],
    subsidioJovens: subsidioJovensLicao2,
  },
  3: {
    imagem: getEbdLessonImagePath("jovens", "2026-1t", 3, "png"),
    objetivos: objetivosJovensLicao3,
    topicos: topicosJovensLicao3,
    apoioProfessor: [
      "Mantenha a aula focada no caráter de Deus para que os alunos não reduzam salvação a utilidade pessoal ou benefício momentâneo.",
      "Mostre que bondade, amor e santidade não competem entre si; juntos, eles revelam a beleza do Deus que salva.",
    ],
    apoioAluno: [
      "Leia Tito 3.4-5 e 1 Pedro 1.16 durante a semana e anote como a salvação revela ao mesmo tempo amor e santidade.",
      "Ore pedindo que sua compreensão sobre quem Deus é produza mais reverência, gratidão e desejo de santidade.",
    ],
    esboco: [
      {
        titulo: "Entrada",
        conteudo:
          "Abra a aula perguntando quais atributos de Deus a turma mais associa à salvação e use as respostas para conduzir o estudo.",
      },
      {
        titulo: "Desenvolvimento",
        conteudo:
          "Trabalhe a lição em três movimentos: Deus se revela como Salvador, a salvação manifesta seu amor e a mesma salvação expõe sua santidade.",
      },
      {
        titulo: "Fechamento",
        conteudo:
          "Conclua levando a classe a adorar o Deus que salva e a responder com vida santa à graça recebida.",
      },
    ],
    subsidioJovens: subsidioJovensLicao3,
  },
  4: {
    imagem: getEbdLessonImagePath("jovens", "2026-1t", 4, "png"),
    objetivos: objetivosJovensLicao4,
    topicos: topicosJovensLicao4,
    apoioProfessor: [
      "Apresente a justificação pela fé como verdade libertadora, e não como conceito frio ou apenas técnico.",
      "Ajude a turma a conectar doutrina, identidade e vida prática, especialmente nas áreas de culpa, passado e paz com Deus.",
    ],
    apoioAluno: [
      "Leia Romanos 4.1-8 e Romanos 8.1 durante a semana e anote o que esses textos dizem sobre culpa e nova identidade.",
      "Troque a linguagem de autoconfiança espiritual por gratidão explícita à justiça de Cristo em sua oração.",
    ],
    esboco: [
      {
        titulo: "Entrada",
        conteudo:
          "Comece a aula perguntando se uma pessoa pode ser salva apenas por ser boa e use isso como ponte para a doutrina da justificação pela fé.",
      },
      {
        titulo: "Desenvolvimento",
        conteudo:
          "Explique a lição em três eixos: o que é a justificação, como Abraão ilustra a fé que justifica e como Deus liberta da culpa e da condenação.",
      },
      {
        titulo: "Fechamento",
        conteudo:
          "Conclua levando a turma a descansar na obra de Cristo e a viver como quem foi realmente perdoado e aceito por Deus.",
      },
    ],
    subsidioJovens: subsidioJovensLicao4,
  },
  5: {
    imagem: getEbdLessonImagePath("jovens", "2026-1t", 5, "jpg"),
    objetivos: objetivosJovensLicao5,
    topicos: topicosJovensLicao5,
    apoioProfessor: [
      "Mantenha a aula centrada na cruz como cumprimento das promessas e figuras do Antigo Testamento.",
      "Ajude a classe a perceber que redenção e reconciliação não são palavras abstratas, mas efeitos reais da obra vicária de Cristo.",
    ],
    apoioAluno: [
      "Leia João 1.29 e 1 Pedro 1.18-19 durante a semana e escreva o que mais o impressiona no preço da sua redenção.",
      "Agradeça a Cristo em oração por ter sido reconciliado com Deus e responda com adoração e obediência.",
    ],
    esboco: [
      {
        titulo: "Entrada",
        conteudo:
          "Abra a aula perguntando sobre experiências de reconciliação e use isso como ponte para a reconciliação com Deus em Cristo.",
      },
      {
        titulo: "Desenvolvimento",
        conteudo:
          "Percorra a lição em três movimentos: o cordeiro pascal como figura, Jesus como Cordeiro de Deus e os efeitos da redenção e da reconciliação.",
      },
      {
        titulo: "Fechamento",
        conteudo:
          "Finalize exaltando a obra do Filho que redime e convidando a turma a viver sem culpa, perto do coração do Pai.",
      },
    ],
    subsidioJovens: subsidioJovensLicao5,
  },
  6: {
    imagem: getEbdLessonImagePath("jovens", "2026-1t", 6, "png"),
    objetivos: objetivosJovensLicao6,
    topicos: topicosJovensLicao6,
    apoioProfessor: [
      "Mostre com clareza a diferença entre regeneração e santificação, sem separá-las como se fossem realidades desconectadas.",
      "Conduza a aula para além do discurso espiritual genérico, perguntando onde o fruto do Espírito já aparece ou ainda precisa aparecer na vida da turma.",
    ],
    apoioAluno: [
      "Leia João 3.1-8 e Gálatas 5.22-23 durante a semana e anote sinais concretos do novo nascimento em sua vida.",
      "Peça ao Espírito Santo que revele áreas em que você precisa crescer em santificação e obediência.",
    ],
    esboco: [
      {
        titulo: "Entrada",
        conteudo:
          "Comece perguntando o que muda em alguém que realmente nasceu de novo e leve a turma a abrir João 3.",
      },
      {
        titulo: "Desenvolvimento",
        conteudo:
          "Trabalhe a aula em três movimentos: conceito de regeneração, atuação do Espírito no novo nascimento e santificação como evidência da salvação.",
      },
      {
        titulo: "Fechamento",
        conteudo:
          "Conclua desafiando a turma a cooperar com o Espírito em uma vida santa, coerente com a nova vida recebida em Cristo.",
      },
    ],
    subsidioJovens: subsidioJovensLicao6,
  },
  7: {
    imagem: getEbdLessonImagePath("jovens", "2026-1t", 7, "png"),
    objetivos: objetivosJovensLicao7,
    topicos: topicosJovensLicao7,
    apoioProfessor: [
      "Mostre que graça e transformação caminham juntas, evitando tanto legalismo quanto passividade espiritual.",
      "Leve a turma a aplicar a aula em relações concretas, principalmente nas áreas de perdão, bondade e serviço.",
    ],
    apoioAluno: [
      "Leia Efésios 2.8-10 e Colossenses 3.12-14 durante a semana e anote como a graça precisa aparecer na sua rotina.",
      "Pratique um gesto concreto de serviço ou reconciliação como resposta à graça recebida em Cristo.",
    ],
    esboco: [
      {
        titulo: "Entrada",
        conteudo:
          "Abra a aula perguntando sobre um presente imerecido e use essa experiência para explicar graça como favor não merecido.",
      },
      {
        titulo: "Desenvolvimento",
        conteudo:
          "Percorra a lição mostrando a condição humana sem graça, a relação entre graça e obras e as implicações práticas em amor, perdão e serviço.",
      },
      {
        titulo: "Fechamento",
        conteudo:
          "Conclua lembrando que a graça não só nos salva, mas também nos ensina a viver de modo coerente com o Evangelho.",
      },
    ],
    subsidioJovens: subsidioJovensLicao7,
  },
  8: {
    imagem: getEbdLessonImagePath("jovens", "2026-1t", 8, "png"),
    objetivos: objetivosJovensLicao8,
    topicos: topicosJovensLicao8,
    apoioProfessor: [
      "Trabalhe o tema da eleição em chave pastoral e cristocêntrica, sem transformar a aula em disputa teórica abstrata.",
      "Mostre que eleição bíblica chama para santidade, missão e serviço, e não para orgulho espiritual.",
    ],
    apoioAluno: [
      "Leia Efésios 1.3-14 e 1 Pedro 2.9 durante a semana e anote o que esses textos dizem sobre identidade e propósito em Cristo.",
      "Ore pedindo que sua compreensão de eleição produza mais humildade, compromisso missionário e santidade.",
    ],
    esboco: [
      {
        titulo: "Entrada",
        conteudo:
          "Comece perguntando se eleição é vista pela turma como privilégio ou responsabilidade diante de Deus e organize a conversa a partir disso.",
      },
      {
        titulo: "Desenvolvimento",
        conteudo:
          "Explique a lição em três eixos: conceito bíblico de eleição, centralidade de Cristo e implicações missionárias, santas e servis do chamado divino.",
      },
      {
        titulo: "Fechamento",
        conteudo:
          "Finalize reforçando que a eleição em Cristo é convite para uma vida entregue à glória de Deus e útil ao Reino.",
      },
    ],
    subsidioJovens: subsidioJovensLicao8,
  },
  9: {
    imagem: getEbdLessonImagePath("jovens", "2026-1t", 9, "png"),
    objetivos: objetivosJovensLicao9,
    topicos: topicosJovensLicao9,
    apoioProfessor: [
      "Explique livre-arbítrio, graça preveniente e perseverança com clareza, preservando a linha pentecostal/assembleiana da revista.",
      "Ajude a classe a perceber que resposta humana à salvação é real, mas só acontece porque a graça de Deus veio primeiro.",
    ],
    apoioAluno: [
      "Leia Deuteronômio 30.19-20 e João 1.9-12 durante a semana e observe como Deus chama o ser humano a responder com fé.",
      "Identifique uma área em que você precisa continuar dizendo sim a Deus com mais constância e perseverança.",
    ],
    esboco: [
      {
        titulo: "Entrada",
        conteudo:
          "Abra a aula com uma pergunta sobre escolhas difíceis e use isso para introduzir responsabilidade humana diante da salvação.",
      },
      {
        titulo: "Desenvolvimento",
        conteudo:
          "Organize a explicação em três partes: livre-arbítrio como dom de Deus, necessidade da graça preveniente e salvação como resposta capacitada pela graça.",
      },
      {
        titulo: "Fechamento",
        conteudo:
          "Conclua lembrando que a graça chama, capacita e sustenta, mas o crente responde com fé, arrependimento e perseverança.",
      },
    ],
    subsidioJovens: subsidioJovensLicao9,
  },
  10: {
    imagem: getEbdLessonImagePath("jovens", "2026-1t", 10, "png"),
    objetivos: objetivosJovensLicao10,
    topicos: topicosJovensLicao10,
    apoioProfessor: [
      "Mostre com clareza que arrependimento e fé são respostas humanas exigidas pelo Evangelho, mas não se transformam em mérito diante de Deus.",
      "Ajude a turma a diferenciar fé viva de mera concordância intelectual e arrependimento verdadeiro de remorso superficial.",
    ],
    apoioAluno: [
      "Leia Marcos 1.14-15 e Romanos 10.9-11 durante a semana e anote o que esses textos pedem do seu coração.",
      "Examine se há áreas em que você ainda precisa responder ao chamado de Cristo com mais sinceridade, obediência e confiança.",
    ],
    esboco: [
      {
        titulo: "Entrada",
        conteudo:
          "Abra a aula perguntando a diferença entre remorso e arrependimento e entre acreditar em Deus e confiar-se a Cristo.",
      },
      {
        titulo: "Desenvolvimento",
        conteudo:
          "Trabalhe a lição em três movimentos: salvação e arrependimento, salvação e fé salvífica, e salvação como decisão pessoal sem mérito humano.",
      },
      {
        titulo: "Fechamento",
        conteudo:
          "Conclua convidando a turma a responder à graça de Deus com coração quebrantado, fé viva e obediência prática.",
      },
    ],
    subsidioJovens: subsidioJovensLicao10,
  },
  11: {
    imagem: getEbdLessonImagePath("jovens", "2026-1t", 11, "png"),
    objetivos: objetivosJovensLicao11,
    topicos: topicosJovensLicao11,
    apoioProfessor: [
      "Apresente a adoção como realidade bíblica concreta, evitando tratá-la apenas como ilustração emocional.",
      "Ajude os alunos a relacionar identidade, intimidade com Deus e esperança futura em uma única linha de ensino.",
    ],
    apoioAluno: [
      "Leia Romanos 8.12-17 durante a semana e anote o que mais fortalece sua identidade como filho de Deus.",
      "Ore chamando Deus de Pai e observe como essa verdade muda sua confiança, sua obediência e sua esperança.",
    ],
    esboco: [
      {
        titulo: "Entrada",
        conteudo:
          "Abra a aula perguntando o que significa, na prática, ser parte da família de Deus e acolha as respostas com atenção pastoral.",
      },
      {
        titulo: "Desenvolvimento",
        conteudo:
          "Trabalhe a doutrina da adoção em três movimentos: identidade recebida pela graça, confirmação do Espírito e esperança futura como coerdeiros com Cristo.",
      },
      {
        titulo: "Fechamento",
        conteudo:
          "Conclua reafirmando a identidade de filhos e convidando a turma a responder com oração, comunhão e vida coerente com a família da fé.",
      },
    ],
    subsidioJovens: subsidioJovensLicao11,
  },
  12: {
    imagem: getEbdLessonImagePath("jovens", "2026-1t", 12, "png"),
    objetivos: objetivosJovensLicao12,
    topicos: topicosJovensLicao12,
    apoioProfessor: [
      "Trabalhe perseverança e apostasia com sensibilidade pastoral e seriedade bíblica, sem banalizar nenhuma das duas.",
      "Ajude os alunos a reconhecer sinais pequenos de recuo na fé antes que se transformem em hábitos de afastamento.",
    ],
    apoioAluno: [
      "Leia Hebreus 10.35-39 e Hebreus 3.12-13 durante a semana e anote o que mais fortalece sua decisão de permanecer fiel a Cristo.",
      "Reforce um hábito espiritual concreto nesta semana para combater qualquer início de recuo ou frieza na fé.",
    ],
    esboco: [
      {
        titulo: "Entrada",
        conteudo:
          "Abra a aula perguntando quais pressões mais tentam um jovem a desistir da caminhada com Cristo atualmente.",
      },
      {
        titulo: "Desenvolvimento",
        conteudo:
          "Organize a exposição em três eixos: perseverança para alcançar a promessa, perigo real da apostasia e contraste prático entre permanecer e recuar.",
      },
      {
        titulo: "Fechamento",
        conteudo:
          "Conclua encorajando a turma a perseverar com olhos na promessa, coração vigilante e dependência diária do Espírito Santo.",
      },
    ],
    subsidioJovens: subsidioJovensLicao12,
  },
  13: {
    imagem: getEbdLessonImagePath("jovens", "2026-1t", 13, "png"),
    objetivos: objetivosJovensLicao13,
    topicos: topicosJovensLicao13,
    apoioProfessor: [
      "Conduza a última lição do trimestre com senso de esperança, mostrando que a glorificação futura ilumina o presente em vez de anulá-lo.",
      "Ajude a turma a aplicar a esperança da nova criação em escolhas, prioridades e serviço no mundo atual.",
    ],
    apoioAluno: [
      "Leia 1 Coríntios 15.42-49 e Apocalipse 22.1-5 durante a semana e anote o que mais desperta sua esperança na consumação da salvação.",
      "Pergunte a si mesmo em quais áreas você precisa viver de modo mais teocêntrico, com Deus no centro de tudo.",
    ],
    esboco: [
      {
        titulo: "Entrada",
        conteudo:
          "Comece a aula perguntando o que muda hoje quando sabemos com clareza que a história termina na glória de Cristo.",
      },
      {
        titulo: "Desenvolvimento",
        conteudo:
          "Trabalhe a lição em três movimentos: do terreno ao celestial, nova ordem do cosmos e vida presente orientada pela esperança futura.",
      },
      {
        titulo: "Fechamento",
        conteudo:
          "Finalize consagrando o encerramento do trimestre à esperança da glorificação e ao compromisso de viver com Deus no centro.",
      },
    ],
    subsidioJovens: subsidioJovensLicao13,
  },
};

const sementesJovensSegundoTrimestre: LicaoSeedJovensSegundoTrimestre[] = [
  {
    numero: 1,
    data: "2026-04-05",
    titulo: "O Que é uma Ideologia",
    resumo:
      "Para resistir aos enganos ideológicos e manter-se firme na fé, é necessário ter conhecimento profundo das Escrituras, renovar a mente em Cristo e usar as armas espirituais.",
    textoPrincipal: "Colossenses 2.2",
    leituraSemanal: [
      { dia: "Segunda", referencia: "Mateus 15.9", foco: "Doutrinas que são preceitos dos homens." },
      { dia: "Terça", referencia: "Efésios 6.12; Colossenses 2.1", foco: "Na vida cristã a luta espiritual é real." },
      { dia: "Quarta", referencia: "1 Coríntios 1.18-21", foco: "A loucura da sabedoria humana." },
      { dia: "Quinta", referencia: "Efésios 4.14", foco: "Contra os ventos de doutrina." },
      { dia: "Sexta", referencia: "1 Timóteo 6.20", foco: "Cuidado com as falsas ciências." },
      { dia: "Sábado", referencia: "Romanos 12.2", foco: "Buscando a renovação da mente." },
    ],
    verdadePratica:
      "Ideologias que deslocam Cristo do centro precisam ser confrontadas pela verdade das Escrituras e pelo discernimento espiritual.",
    aplicacao:
      "Separe um tempo nesta semana para confrontar ideias e discursos que você consome com a Palavra de Deus, pedindo ao Senhor mente renovada e discernimento espiritual para permanecer firme na verdade.",
    enfase: "o discernimento cristão diante das ideologias",
  },
  {
    numero: 2,
    data: "2026-04-12",
    titulo: "A Falácia do Materialismo Histórico",
    resumo:
      "A resposta bíblica está na fidelidade ao Evangelho, que promove transformação genuína pela graça de Deus, não por revolução ideológica.",
    textoPrincipal: "2 Coríntios 10.5",
    leituraSemanal: [
      { dia: "Segunda", referencia: "Gênesis 1.26-27" },
      { dia: "Terça", referencia: "Salmos 33.10-11" },
      { dia: "Quarta", referencia: "Daniel 2.20-21" },
      { dia: "Quinta", referencia: "João 18.36" },
      { dia: "Sexta", referencia: "Atos 17.26-27" },
      { dia: "Sábado", referencia: "1 Coríntios 2.14" },
    ],
    verdadePratica:
      "A fé cristã responde ao materialismo histórico com a soberania de Deus e a transformação operada pelo Evangelho.",
    aplicacao:
      "Avalie ideias sociais e históricas que você consome e confronte-as com o Evangelho, lembrando que Deus governa a história e transforma vidas.",
    enfase: "a soberania de Deus acima do materialismo histórico",
  },
  {
    numero: 3,
    data: "2026-04-19",
    titulo: "A Falácia do Relativismo Ético-Moral",
    resumo:
      "A fé cristã afirma que Deus é a fonte da moralidade e que seus princípios revelados nas Escrituras são universais, imutáveis e essenciais para uma vida justa.",
    textoPrincipal: "Isaías 5.20",
    leituraSemanal: [
      { dia: "Segunda", referencia: "Êxodo 20" },
      { dia: "Terça", referencia: "Salmos 19.7-9" },
      { dia: "Quarta", referencia: "Provérbios 14.12" },
      { dia: "Quinta", referencia: "Romanos 1.18-32" },
      { dia: "Sexta", referencia: "Romanos 12.2" },
      { dia: "Sábado", referencia: "Hebreus 5.14" },
    ],
    verdadePratica:
      "A moralidade não nasce do consenso humano, mas do caráter santo de Deus revelado nas Escrituras.",
    aplicacao:
      "Submeta suas escolhas morais à Palavra de Deus e rejeite a lógica que chama o mal de bem e o bem de mal.",
    enfase: "a verdade moral revelada por Deus",
  },
  {
    numero: 4,
    data: "2026-04-26",
    titulo: "A Falácia da Ideologia de Gênero",
    resumo:
      "À luz das Escrituras, aprendemos que homem e mulher foram criados de forma intencional e complementar, e que a verdadeira identidade do ser humano só é plenamente encontrada em Cristo.",
    textoPrincipal: "Gênesis 1.27",
    leituraSemanal: [
      { dia: "Segunda", referencia: "Salmos 139.14" },
      { dia: "Terça", referencia: "Romanos 1.26-27" },
      { dia: "Quarta", referencia: "1 Coríntios 6.9-11" },
      { dia: "Quinta", referencia: "Efésios 4.14-15" },
      { dia: "Sexta", referencia: "1 Timóteo 3.15" },
      { dia: "Sábado", referencia: "João 17.17" },
    ],
    verdadePratica:
      "A identidade humana só é plenamente compreendida à luz da criação divina e da redenção em Cristo.",
    aplicacao:
      "Afirme sua identidade em Cristo e trate criação, corpo e sexualidade à luz da verdade bíblica.",
    enfase: "a identidade humana segundo a criação de Deus",
  },
  {
    numero: 5,
    data: "2026-05-03",
    titulo: "A Falácia da Teologia Progressista",
    resumo:
      "A Teologia Progressista tenta adaptar a fé cristã às ideias contemporâneas, relativizando verdades fundamentais e buscando enfraquecer a autoridade das Escrituras.",
    textoPrincipal: "Colossenses 2.8",
    leituraSemanal: [
      { dia: "Segunda", referencia: "1 Timóteo 3.16" },
      { dia: "Terça", referencia: "Judas 3" },
      { dia: "Quarta", referencia: "João 17.17" },
      { dia: "Quinta", referencia: "1 Tessalonicenses 5.20" },
      { dia: "Sexta", referencia: "Romanos 3.2" },
      { dia: "Sábado", referencia: "Mateus 5.18" },
    ],
    verdadePratica:
      "Qualquer releitura progressista que relativize a autoridade bíblica se afasta da fé cristã histórica.",
    aplicacao:
      "Examine mensagens que tentam adaptar o Evangelho ao espírito do tempo e permaneça fiel à autoridade das Escrituras.",
    enfase: "a fidelidade à autoridade das Escrituras",
  },
  {
    numero: 6,
    data: "2026-05-10",
    titulo: "A Falácia do Humanismo",
    resumo:
      "O Humanismo secular é uma filosofia falha por exaltar a razão humana e rejeitar a dependência de Deus, conduzindo ao relativismo moral e ao vazio existencial.",
    textoPrincipal: "Provérbios 3.5-6",
    leituraSemanal: [
      { dia: "Segunda", referencia: "Jeremias 17.5" },
      { dia: "Terça", referencia: "Provérbios 14.12" },
      { dia: "Quarta", referencia: "1 Coríntios 1.25" },
      { dia: "Quinta", referencia: "Romanos 1.21" },
      { dia: "Sexta", referencia: "Romanos 3.23" },
      { dia: "Sábado", referencia: "Mateus 5.16" },
    ],
    verdadePratica:
      "A razão humana precisa se submeter à sabedoria de Deus para não se perder em autonomia vazia.",
    aplicacao:
      "Confie menos na autossuficiência e mais na direção do Senhor, deixando a verdade bíblica guiar suas decisões.",
    enfase: "a dependência de Deus acima do humanismo",
  },
  {
    numero: 7,
    data: "2026-05-17",
    titulo: "A Falácia da Teoria Darwiniana",
    resumo:
      "A teoria darwiniana, ao excluir Deus da criação, contradiz a revelação bíblica, que afirma que todas as coisas foram criadas intencionalmente por um Criador soberano.",
    textoPrincipal: "João 1.3",
    leituraSemanal: [
      { dia: "Segunda", referencia: "Gênesis 1.1" },
      { dia: "Terça", referencia: "Gênesis 1.24-25" },
      { dia: "Quarta", referencia: "Êxodo 20.11" },
      { dia: "Quinta", referencia: "Salmos 33.6" },
      { dia: "Sexta", referencia: "Isaías 45.18" },
      { dia: "Sábado", referencia: "Salmos 19.1" },
    ],
    verdadePratica:
      "A criação testemunha um Criador soberano e não pode ser reduzida a acaso sem propósito.",
    aplicacao:
      "Reforce sua confiança no Deus Criador e responda com adoração, gratidão e defesa da verdade bíblica.",
    enfase: "a criação segundo o Deus soberano",
  },
  {
    numero: 8,
    data: "2026-05-24",
    titulo: "A Falácia do Pragmatismo",
    resumo:
      "A verdade não deve ser medida pela utilidade imediata ou pelos resultados visíveis, mas pela fidelidade à Palavra de Deus e ao Evangelho de Cristo.",
    textoPrincipal: "2 Coríntios 4.2",
    leituraSemanal: [
      { dia: "Segunda", referencia: "2 Coríntios 1.18" },
      { dia: "Terça", referencia: "João 17.17" },
      { dia: "Quarta", referencia: "Marcos 8.34-35" },
      { dia: "Quinta", referencia: "Jeremias 6.16" },
      { dia: "Sexta", referencia: "Gálatas 1.10" },
      { dia: "Sábado", referencia: "Mateus 7.22-23" },
    ],
    verdadePratica:
      "A fidelidade ao Evangelho vale mais do que resultados imediatos ou utilidade aparente.",
    aplicacao:
      "Escolha a fidelidade à Palavra mesmo quando o pragmatismo parecer mais rápido, útil ou popular.",
    enfase: "a fidelidade ao Evangelho acima do resultado imediato",
  },
  {
    numero: 9,
    data: "2026-05-31",
    titulo: "A Falácia do Ateísmo",
    resumo:
      "A criação testemunha claramente sobre a existência de Deus, tornando indesculpável a incredulidade.",
    textoPrincipal: "Salmos 14.1",
    leituraSemanal: [
      { dia: "Segunda", referencia: "Hebreus 11.6" },
      { dia: "Terça", referencia: "Salmos 19.1" },
      { dia: "Quarta", referencia: "Atos 17.24-27" },
      { dia: "Quinta", referencia: "João 16.4" },
      { dia: "Sexta", referencia: "Salmos 10.4" },
      { dia: "Sábado", referencia: "Romanos 3.11" },
    ],
    verdadePratica:
      "A existência de Deus é manifesta na criação e sua rejeição revela rebelião do coração humano.",
    aplicacao:
      "Observe os sinais da criação e renove sua convicção de que Deus existe, fala e deve ser buscado.",
    enfase: "o testemunho da criação sobre a existência de Deus",
  },
  {
    numero: 10,
    data: "2026-06-07",
    titulo: "A Falácia da Teoria do Deísmo",
    resumo:
      "O Deus da Bíblia é pessoal, amoroso, presente e atuante, em total contraste com a ideia de um deus distante propagado pelo Deísmo.",
    textoPrincipal: "Colossenses 1.16-17",
    leituraSemanal: [
      { dia: "Segunda", referencia: "Hebreus 1.3" },
      { dia: "Terça", referencia: "Salmos 121.4" },
      { dia: "Quarta", referencia: "João 14.13" },
      { dia: "Quinta", referencia: "Isaías 41.10" },
      { dia: "Sexta", referencia: "Mateus 10.29-30" },
      { dia: "Sábado", referencia: "Salmos 139.7-10" },
    ],
    verdadePratica:
      "O Deus bíblico não é distante: Ele sustenta, governa e intervém em sua criação.",
    aplicacao:
      "Ore reconhecendo que Deus sustenta sua vida diariamente e rejeite a ideia de um Criador distante.",
    enfase: "a presença ativa do Deus bíblico",
  },
  {
    numero: 11,
    data: "2026-06-14",
    titulo: "A Falácia da Teologia da Prosperidade",
    resumo:
      "A Teologia da Prosperidade busca associar as bênçãos divinas à riqueza material, ignorando o chamado bíblico ao contentamento e à verdadeira prosperidade espiritual em Cristo.",
    textoPrincipal: "Apocalipse 3.17",
    leituraSemanal: [
      { dia: "Segunda", referencia: "1 Timóteo 6.6-8" },
      { dia: "Terça", referencia: "1 Timóteo 6.9" },
      { dia: "Quarta", referencia: "Provérbios 23.4" },
      { dia: "Quinta", referencia: "Hebreus 13.5" },
      { dia: "Sexta", referencia: "Mateus 16.24-26" },
      { dia: "Sábado", referencia: "João 6.26" },
    ],
    verdadePratica:
      "A verdadeira prosperidade cristã está em Cristo, no contentamento e na fidelidade, não no acúmulo material.",
    aplicacao:
      "Pratique contentamento, generosidade e foco em Cristo para não medir a bênção de Deus apenas por resultados materiais.",
    enfase: "o contentamento cristão acima da ganância religiosa",
  },
  {
    numero: 12,
    data: "2026-06-21",
    titulo: "A Falácia do Triunfalismo",
    resumo:
      "O Triunfalismo distorce o Evangelho ao prometer uma vida cristã sem sofrimentos, enquanto a Bíblia revela que a verdadeira vitória está na perseverança, na cruz e na esperança eterna em Cristo.",
    textoPrincipal: "Lucas 9.23",
    leituraSemanal: [
      { dia: "Segunda", referencia: "João 16.33" },
      { dia: "Terça", referencia: "2 Timóteo 3.12" },
      { dia: "Quarta", referencia: "Mateus 5.11-12" },
      { dia: "Quinta", referencia: "Lucas 9.23" },
      { dia: "Sexta", referencia: "2 Coríntios 12.9" },
      { dia: "Sábado", referencia: "Hebreus 11.38" },
    ],
    verdadePratica:
      "A vitória cristã passa pela cruz, pela perseverança e pela esperança eterna, não por triunfalismo terreno.",
    aplicacao:
      "Aceite o chamado de Cristo à perseverança e rejeite promessas de vitória sem cruz, renúncia ou fidelidade.",
    enfase: "a perseverança cristã acima do triunfalismo",
  },
  {
    numero: 13,
    data: "2026-06-28",
    titulo: "O Discernimento do Cristão",
    resumo:
      "O discernimento espiritual é essencial para que o crente permaneça firme na verdade bíblica, rejeitando os enganos dos falsos mestres e sendo guiado pelo Espírito Santo.",
    textoPrincipal: "Hebreus 5.14",
    leituraSemanal: [
      { dia: "Segunda", referencia: "1 João 4.1" },
      { dia: "Terça", referencia: "Mateus 24.24" },
      { dia: "Quarta", referencia: "João 7.24" },
      { dia: "Quinta", referencia: "João 16.13" },
      { dia: "Sexta", referencia: "Tiago 1.5" },
      { dia: "Sábado", referencia: "1 Tessalonicenses 5.21" },
    ],
    verdadePratica:
      "Discernimento espiritual nasce da maturidade bíblica e da submissão ao Espírito Santo.",
    aplicacao:
      "Peça discernimento ao Espírito Santo e teste ensinos, vozes e ideias pela Palavra de Deus.",
    enfase: "o discernimento espiritual na juventude cristã",
  },
];

const objetivosJovensSegundoTrimestreLicao1 = [
  "Apontar as características de uma ideologia.",
  "Identificar os impactos da ideologia sobre a fé cristã.",
  "Estimular a busca do conhecimento bíblico para a defesa da verdade.",
];

const topicosJovensSegundoTrimestreLicao1 = [
  {
    titulo: "As características de uma ideologia",
    conteudo: [
      "Ideologias são sistemas organizados de ideias que tentam explicar e moldar a realidade a partir de referenciais humanos.",
      "Quando se colocam como alternativa à verdade revelada nas Escrituras, elas deslocam Deus do centro e passam a competir com a autoridade bíblica.",
      "Por mais coerentes que pareçam, carregam limites da razão humana caída e precisam ser julgadas à luz da Palavra.",
    ],
  },
  {
    titulo: "Os impactos da ideologia sobre a fé cristã",
    conteudo: [
      "Ideologias afetam moralidade, cultura, política, identidade e espiritualidade, oferecendo respostas autossuficientes para questões que exigem revelação divina.",
      "Sem discernimento, o cristão corre o risco de absorver valores antibíblicos e chamar de verdade aquilo que apenas ecoa a sabedoria humana.",
      "A igreja precisa reconhecer que muitas propostas aparentemente bonitas e inteligentes têm raízes humanistas, relativistas e antibíblicas.",
    ],
  },
  {
    titulo: "Conhecimento bíblico para defesa da verdade",
    conteudo: [
      "Paulo alerta para filosofias e vãs sutilezas que não são segundo Cristo, mostrando a necessidade de uma mente rendida ao Evangelho.",
      "A resistência aos enganos ideológicos exige renovação da mente, vida de oração, firmeza em Cristo e uso das armas espirituais.",
      "A Escola Dominical é espaço estratégico para fortalecer a juventude no conhecimento bíblico-doutrinário e prepará-la para responder com verdade e graça.",
    ],
  },
];

const subsidioJovensSegundoTrimestreLicao1: LicaoEBD["subsidioJovens"] = {
  cabecalho: {
    numero: 1,
    titulo: "O Que é uma Ideologia",
    data: "2026-04-05",
    trimestre: trimestreJovensSegundoTrimestre,
    textoPrincipal:
      "Para que os seus corações sejam consolados, e estejam unidos em amor, e enriquecidos da plenitude da inteligência, para conhecimento do mistério de Deus - Cristo. (Cl 2.2)",
    resumoDaLicao:
      "Para resistir aos enganos ideológicos e manter-se firme na fé, é necessário ter conhecimento profundo das Escrituras, renovar a mente em Cristo e usar as armas espirituais.",
    leituraSemanal: sementesJovensSegundoTrimestre[0].leituraSemanal,
  },
  arranquePedagogico: {
    objetivos: objetivosJovensSegundoTrimestreLicao1,
    interacao:
      "Iniciamos um trimestre voltado a ideologias que influenciam escolas, redes sociais, cultura e até algumas igrejas. A classe precisa compreender o que são essas ideias, de onde vêm e como afetam a fé cristã.",
    orientacaoPedagogica:
      "Explique que ideologia é um conjunto organizado de ideias que tenta explicar como o mundo funciona e moldar comportamentos. Mostre que o perigo começa quando essas ideias substituem a verdade bíblica e colocam o ser humano no centro.",
  },
  desenvolvimento: [
    {
      id: "caracteristicas-da-ideologia",
      titulo: "As características de uma ideologia",
      sinopse:
        "Toda ideologia nasce de construções humanas e procura oferecer explicações totalizantes sobre a realidade.",
      explicacaoBiblica: [
        "Colossenses 2.8 alerta contra filosofias e vãs sutilezas fundadas em tradições humanas e não em Cristo.",
        "A razão humana, sem a luz da revelação divina, tende a produzir sistemas que parecem sofisticados, mas se afastam da verdade.",
        "Por isso, o cristão precisa aprender a discernir quando uma ideia se apresenta como rival da Palavra de Deus.",
      ],
      aplicacaoPratica: [
        "Ajude a turma a identificar quais ideias do tempo presente prometem explicações totais para a vida sem depender do Senhor.",
        "Mostre que nem toda proposta intelectualmente atraente é compatível com a fé cristã.",
      ],
      pense:
        "Quais discursos você consome com frequência e que precisam ser avaliados com mais cuidado à luz das Escrituras?",
      pontoImportante:
        "Uma ideologia se torna perigosa quando deseja moldar a vida sem submissão à verdade de Cristo.",
    },
    {
      id: "impactos-sobre-a-fe",
      titulo: "Os impactos da ideologia sobre a fé cristã",
      sinopse:
        "Ideologias moldam visão de mundo, hábitos, linguagem e valores, podendo enfraquecer a fé quando não são confrontadas pela verdade.",
      explicacaoBiblica: [
        "Efésios 4.14 mostra que o povo de Deus não deve ser levado por ventos de doutrina e enganos de homens.",
        "1 Coríntios 1.18-21 expõe a insuficiência da sabedoria humana para compreender a salvação sem a cruz de Cristo.",
        "Ideias antibíblicas podem parecer moralmente aceitáveis, mas terminam por afastar a mente da obediência a Cristo.",
      ],
      aplicacaoPratica: [
        "Converse com a classe sobre ideologias presentes na escola, nas redes sociais e em ambientes culturais frequentados pela juventude.",
        "Estimule os alunos a reconhecer como essas narrativas tentam redefinir verdade, identidade e moralidade.",
      ],
      pense:
        "Você percebe quando uma ideia sedutora está, na prática, tirando Cristo do centro da sua forma de pensar?",
      pontoImportante:
        "A fé cristã precisa ser protegida de sistemas que normalizam engano, orgulho intelectual e autonomia sem Deus.",
    },
    {
      id: "defesa-da-verdade",
      titulo: "Conhecimento bíblico para defesa da verdade",
      sinopse:
        "Discernimento espiritual não nasce de improviso, mas de mente renovada, conhecimento bíblico e vida submetida ao Senhor.",
      explicacaoBiblica: [
        "2 Coríntios 10.3-5 ensina que nossas armas são espirituais e que todo entendimento deve ser levado à obediência de Cristo.",
        "Romanos 12.2 mostra que a mente precisa ser renovada para discernir a vontade de Deus.",
        "O conhecimento profundo das Escrituras fortalece o crente contra falsos ensinos e o prepara para responder com verdade.",
      ],
      aplicacaoPratica: [
        "Desafie a turma a cultivar leitura bíblica consistente, oração e conversa honesta sobre as pressões ideológicas do presente.",
        "Mostre que a defesa da verdade começa com um coração firmado em Cristo e uma mente cheia da Palavra.",
      ],
      pense:
        "Seu contato com a Bíblia tem sido suficiente para formar convicções firmes ou apenas para sobreviver espiritualmente?",
      pontoImportante:
        "Conhecimento bíblico, mente renovada e armas espirituais são essenciais para resistir ao engano.",
    },
  ],
  apoioProfessor: {
    quebraGelo:
      "Peça que a turma diga o que entende por ideologia e use as respostas para mostrar como ideias moldam visão de mundo e comportamento.",
    perguntaChave:
      "Como reconhecer ideologias que competem com a verdade bíblica e como a juventude pode permanecer firme em Cristo diante delas?",
    dificuldadeProvavelDaClasse:
      "Alguns jovens podem achar que ideologia é assunto distante da vida cristã, sem perceber como ela aparece em discursos aparentemente neutros, bonitos ou modernos.",
    conducaoDaConversa: [
      "Leve a classe a perceber que nem toda ideia organizada é neutra; muitas delas carregam pressupostos espirituais e morais incompatíveis com a Palavra.",
      "Mostre que Paulo não condena o pensamento sério, mas rejeita filosofias que colocam a humanidade no lugar que pertence a Cristo.",
      "Mantenha o foco em discernimento bíblico, renovação da mente e obediência de todo pensamento ao Senhor.",
    ],
    fechamento:
      "Encerre reforçando que resistir ao engano ideológico exige firmeza nas Escrituras, mente renovada em Cristo e vida sustentada por armas espirituais.",
  },
  revisao: {
    horaDaRevisao: [
      "O que caracteriza uma ideologia e por que ela pode se tornar perigosa para a fé cristã?",
      "Como as ideologias tentam competir com a autoridade das Escrituras?",
      "Qual a relação entre renovação da mente e discernimento espiritual?",
      "Que recursos Deus oferece para resistirmos aos enganos ideológicos?",
    ],
    conclusao:
      "A juventude cristã precisa crescer em conhecimento bíblico, discernimento espiritual e firmeza em Cristo para resistir a ideologias que se opõem à Palavra de Deus.",
  },
};

const licaoJovensSegundoTrimestre1Base = criarLicaoJovensSegundoTrimestre(
  sementesJovensSegundoTrimestre[0],
  {
    statusEditorial: "published",
    dataLiberacaoPublica: "2026-03-21",
  }
);

const licaoJovensSegundoTrimestre1: LicaoEBD = {
  ...licaoJovensSegundoTrimestre1Base,
  leituraBiblica: normalizeReferences([
    "Colossenses 2.8",
    "2 Coríntios 10.3-5",
  ]),
  objetivos: objetivosJovensSegundoTrimestreLicao1,
  topicos: topicosJovensSegundoTrimestreLicao1,
  apoioProfessor: [
    "Apresente ideologia como sistema organizado de ideias que, quando se opõe à revelação bíblica, disputa o lugar da verdade no coração da juventude.",
    "Ajude a classe a perceber que nem tudo o que parece moderno, sensato ou libertador nasce da sabedoria de Deus.",
  ],
  apoioAluno: [
    "Leia Colossenses 2.8 e 2 Coríntios 10.3-5 durante a semana e anote quais ideias atuais mais precisam ser confrontadas pela Palavra.",
    "Escolha uma influência cultural recorrente na sua rotina e avalie se ela aproxima você de Cristo ou enfraquece seu discernimento bíblico.",
  ],
  esboco: [
    {
      titulo: "Entrada",
      conteudo:
        "Comece pedindo que a turma descreva o que entende por ideologia e use as respostas para mostrar como ideias moldam cultura, moralidade e identidade.",
    },
    {
      titulo: "Desenvolvimento",
      conteudo:
        "Trabalhe a lição em três movimentos: características da ideologia, impactos sobre a fé cristã e conhecimento bíblico como defesa da verdade.",
    },
    {
      titulo: "Fechamento",
      conteudo:
        "Conclua encorajando a juventude a renovar a mente em Cristo, discernir discursos do tempo presente e permanecer firme nas Escrituras.",
    },
  ],
  subsidioJovens: normalizeYoungSubsidy(subsidioJovensSegundoTrimestreLicao1),
};

const jovens2026SegundoTrimestreBase = criarTrimestrePlaceholder({
  slug: "2026-2t",
  trimestre: 2,
  imagem: getEbdQuarterCoverPath("jovens", "2026-2t", "ebd-2t-capa.jpg"),
});

const jovens2026SegundoTrimestre: TrimestreEBD = {
  ...jovens2026SegundoTrimestreBase,
  id: "jovens-2026-2t",
  statusEditorial: "partial",
  titulo: "Entre a Verdade e o Engano",
  subtitulo: "Combatendo Ideologias e Ensinos que se Opõem à Palavra de Deus",
  descricao:
    "Treze lições para fortalecer a juventude no discernimento bíblico diante de ideologias e ensinos que tentam substituir a verdade da Palavra de Deus.",
  comentarista: "Eduardo Leandro Alves",
  versiculoBase: "Colossenses 2:8",
  licoes: sementesJovensSegundoTrimestre.map((seed) =>
    seed.numero === 1
      ? licaoJovensSegundoTrimestre1
      : criarLicaoJovensSegundoTrimestreEnriquecida(seed)
  ),
};

export const jovens2026Trimestres: TrimestreEBD[] = [
  {
    id: "jovens-2026-1t",
    slug: "2026-1t",
    ano: 2026,
    trimestre: 1,
    statusEditorial: "published",
    rotulo: "1º Trimestre de 2026",
    titulo: "Plano Perfeito",
    subtitulo: "A Salvação da Humanidade, a Mensagem Central das Escrituras",
    descricao: "Treze lições para conduzir a juventude pelo plano da salvação, da graça de Deus à perseverança da fé e à consumação em Cristo.",
    comentarista: "Marcelo Oliveira",
    classe: "jovens",
    imagem: getEbdQuarterCoverPath("jovens", "2026-1t", "ebd-1t-capa.png"),
    versiculoBase: "João 3:16",
    licoes: sementesJovensPrimeiroTrimestre.map((seed) => {
      const editorial = editoriaisJovensPrimeiroTrimestre[seed.numero];
      return editorial ? criarLicaoEditorialJovens(seed, editorial) : criarLicao(seed);
    }),
  },
  jovens2026SegundoTrimestre,
  criarTrimestrePlaceholder({
    slug: "2026-3t",
    trimestre: 3,
    imagem: getEbdQuarterCoverPath("jovens", "2026-2t", "ebd-2t-capa.jpg"),
  }),
  criarTrimestrePlaceholder({
    slug: "2026-4t",
    trimestre: 4,
    imagem: getEbdQuarterCoverPath("jovens", "2026-2t", "ebd-2t-capa.jpg"),
  }),
];
