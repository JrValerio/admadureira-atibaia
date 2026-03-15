import type { LicaoEBD, TrimestreEBD } from "./types";

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

const apoioProfessorBase = [
  "Relacione a lição com escolhas reais da juventude e incentive conversa honesta em classe.",
  "Conduza o encerramento com oração específica, aplicação prática e acompanhamento pastoral.",
];

const apoioAlunoBase = [
  "Leve anotações da sua leitura da semana e compartilhe uma dúvida ou decisão durante a aula.",
  "Conte a alguém da classe como pretende aplicar a lição durante os próximos dias.",
];

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

function criarLicao(seed: LicaoSeed): LicaoEBD {
  return {
    id: `jovens-2026-1t-licao-${seed.numero}`,
    slug: `licao-${seed.numero}`,
    numero: seed.numero,
    data: seed.data,
    statusEditorial: "published",
    titulo: seed.titulo,
    resumo: seed.resumo,
    textoChave: seed.textoChave,
    verdadePratica: seed.verdadePratica,
    leituraBiblica: seed.leituraBiblica,
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
  editorial: JovensEditorialConfig
): LicaoEBD {
  return {
    ...criarLicao(seed),
    imagem: editorial.imagem,
    objetivos: editorial.objetivos,
    topicos: editorial.topicos,
    apoioProfessor: editorial.apoioProfessor,
    apoioAluno: editorial.apoioAluno,
    esboco: editorial.esboco,
    subsidioJovens: editorial.subsidioJovens,
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
  return {
    id: `jovens-${edicao}-licao-${numero}`,
    slug: `licao-${numero}`,
    numero,
    data,
    statusEditorial: "draft",
    titulo: `Lição ${numero}`,
    resumo:
      "Conteúdo em preparação para a classe de Jovens. Esta lição será publicada com resumo original, aplicação prática e apoio ao professor.",
    leituraBiblica: [],
    objetivos: [],
    topicos: [],
    aplicacao:
      "Acompanhe esta edição da EBD e volte em breve para acessar a lição completa.",
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
    titulo: "Santidade em meio às escolhas",
    resumo: "Santidade também se constrói nas escolhas que os jovens fazem em ambiente digital, afetivo e social.",
    textoChave: "Salmos 119:9",
    verdadePratica: "Santidade não é isolamento; é discernimento cristão aplicado às decisões mais práticas da juventude.",
    leituraBiblica: ["Romanos 12:1-2", "1 Tessalonicenses 4:1-8"],
    aplicacao: "Reavalie uma escolha prática desta semana à luz da santidade e tome uma decisão coerente com sua fé.",
    enfase: "a santidade prática",
  },
  {
    numero: 5,
    data: "2026-02-01",
    titulo: "Vida devocional que permanece",
    resumo: "A classe é chamada a cultivar constância espiritual por meio de leitura bíblica, oração e comunhão com Deus.",
    textoChave: "João 15:4",
    verdadePratica: "Constância devocional não nasce de emoção passageira, mas de permanência diária em Cristo.",
    leituraBiblica: ["João 15:1-8", "Salmos 1:1-3"],
    aplicacao: "Monte um plano simples para seus próximos sete dias de leitura bíblica e oração, com horário e objetivo definidos.",
    enfase: "a permanência em Cristo",
  },
  {
    numero: 6,
    data: "2026-02-08",
    titulo: "Emoções sob a luz do Evangelho",
    resumo: "A juventude aprende a lidar com medo, ansiedade e frustração à luz da presença e da Palavra de Deus.",
    textoChave: "Salmos 42:5",
    verdadePratica: "O Evangelho não ignora emoções humanas; ele as conduz à verdade, à oração e à esperança.",
    leituraBiblica: ["Salmos 42", "Filipenses 4:4-9"],
    aplicacao: "Separe um tempo para orar honestamente sobre o que você tem sentido e compartilhe isso com alguém maduro na fé.",
    enfase: "o cuidado do coração",
  },
  {
    numero: 7,
    data: "2026-02-15",
    titulo: "Relacionamentos e sabedoria cristã",
    resumo: "A lição aborda namoro, limites, intenção e pureza com linguagem pastoral e responsabilidade bíblica.",
    textoChave: "Provérbios 4:23",
    verdadePratica: "Relacionamentos saudáveis exigem sabedoria, pureza, responsabilidade e temor do Senhor.",
    leituraBiblica: ["1 Coríntios 13:4-7", "Cantares 2:7"],
    aplicacao: "Reflita se suas expectativas afetivas estão alinhadas com sabedoria, pureza e responsabilidade diante de Deus.",
    enfase: "a sabedoria nos relacionamentos",
  },
  {
    numero: 8,
    data: "2026-02-22",
    titulo: "Trabalho, estudos e fidelidade cristã",
    resumo: "Estudos e trabalho também são campos de testemunho, serviço e formação do caráter cristão.",
    textoChave: "Colossenses 3:23",
    verdadePratica: "O cristão glorifica a Deus também quando estuda, trabalha e administra com responsabilidade o tempo recebido.",
    leituraBiblica: ["Colossenses 3:22-24", "Provérbios 22:29"],
    aplicacao: "Escolha uma atitude prática para demonstrar fidelidade cristã em seus estudos ou no trabalho ainda nesta semana.",
    enfase: "a fidelidade no cotidiano",
  },
  {
    numero: 9,
    data: "2026-03-01",
    titulo: "Dons e participação na igreja",
    resumo: "Os jovens são encorajados a servir de forma concreta, assumindo lugar, responsabilidade e compromisso na vida da igreja.",
    textoChave: "1 Timóteo 4:12",
    verdadePratica: "Juventude engajada na igreja aprende a servir com alegria, humildade e disposição para crescer.",
    leituraBiblica: ["1 Coríntios 12:12-20", "Romanos 12:3-8"],
    aplicacao: "Converse com sua liderança sobre uma área em que você pode servir ou se desenvolver mais na igreja local.",
    enfase: "o serviço da juventude",
  },
  {
    numero: 10,
    data: "2026-03-08",
    titulo: "Evangelho e presença nas redes",
    resumo: "A juventude é chamada a viver coerência cristã também no ambiente digital, onde fala, reage e se posiciona.",
    textoChave: "Mateus 5:16",
    verdadePratica: "A presença digital do cristão também deve refletir verdade, graça, sobriedade e temor do Senhor.",
    leituraBiblica: ["Efésios 4:25-32", "Tiago 3:1-12"],
    aplicacao: "Revise uma prática digital desta semana e ajuste sua presença online para refletir mais claramente o Evangelho.",
    enfase: "o testemunho cristão nas redes",
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
    titulo: "Perseverança quando a fé é provada",
    resumo: "A juventude é preparada para permanecer firme quando surgem crises, dúvidas e períodos de desânimo.",
    textoChave: "Hebreus 10:36",
    verdadePratica: "Fé provada não significa fé perdida; significa oportunidade de amadurecer, depender e perseverar em Deus.",
    leituraBiblica: ["Tiago 1:2-5", "Hebreus 10:35-39"],
    aplicacao: "Procure apoio espiritual nesta semana em vez de enfrentar suas lutas sozinho, e transforme sua dificuldade em motivo de oração.",
    enfase: "a perseverança da juventude",
  },
  {
    numero: 13,
    data: "2026-03-29",
    titulo: "Juventude que permanece até o fim",
    resumo: "O encerramento do trimestre celebra uma juventude que deseja seguir firme, madura e disponível para o Reino de Deus.",
    textoChave: "2 Timóteo 4:7",
    verdadePratica: "O alvo da juventude cristã não é viver uma fé momentânea, mas permanecer fiel a Cristo até o fim.",
    leituraBiblica: ["Hebreus 12:1-3", "2 Timóteo 4:6-8"],
    aplicacao: "Faça uma oração de consagração ao fim deste trimestre, renovando sua disposição de permanecer em Cristo com fidelidade.",
    enfase: "a perseverança até o fim",
  },
];

const editoriaisJovensPrimeiroTrimestre: Partial<
  Record<number, JovensEditorialConfig>
> = {
  1: {
    imagem: "/images/EBD/licao-01-jovens.png",
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
    imagem: "/images/EBD/licao-02-jovens.jpg",
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
    imagem: "/images/EBD/licao-03-jovens.png",
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
  11: {
    imagem: "/images/EBD/licao-11-jovens.png",
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
    imagem: "/images/EBD/ebd-1t-jovens.png",
    versiculoBase: "João 3:16",
    licoes: sementesJovensPrimeiroTrimestre.map((seed) => {
      const editorial = editoriaisJovensPrimeiroTrimestre[seed.numero];
      return editorial ? criarLicaoEditorialJovens(seed, editorial) : criarLicao(seed);
    }),
  },
  criarTrimestrePlaceholder({
    slug: "2026-2t",
    trimestre: 2,
    imagem: "/images/EBD/ebd-2t.png",
  }),
  criarTrimestrePlaceholder({
    slug: "2026-3t",
    trimestre: 3,
    imagem: "/images/EBD/ebd-2t.png",
  }),
  criarTrimestrePlaceholder({
    slug: "2026-4t",
    trimestre: 4,
    imagem: "/images/EBD/ebd-2t.png",
  }),
];
