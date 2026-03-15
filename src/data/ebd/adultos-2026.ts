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

type AdultosEditorialConfig = {
  imagem?: string;
  objetivos: LicaoEBD["objetivos"];
  topicos: LicaoEBD["topicos"];
  apoioProfessor: string[];
  apoioAluno: string[];
  esboco: NonNullable<LicaoEBD["esboco"]>;
  subsidioAdultos: NonNullable<LicaoEBD["subsidioAdultos"]>;
};

type PlaceholderQuarterConfig = {
  slug: string;
  trimestre: TrimestreEBD["trimestre"];
  imagem: string;
};

const apoioProfessorBase = [
  "Conecte a lição com a vida da igreja local, da família e da missão cristã.",
  "Encerre a aula com revisão dos objetivos, oração e aplicação prática da semana.",
];

const apoioAlunoBase = [
  "Leia os textos bíblicos antes da aula e leve anotações ou perguntas para compartilhar.",
  "Escolha um passo de obediência para viver durante a semana a partir da lição estudada.",
];

const objetivosAdultosLicao1 = [
  "Explicar a revelação da Trindade no batismo de Jesus.",
  "Mostrar a unidade e a distinção das Pessoas divinas à luz das Escrituras.",
  "Enfatizar a importância da doutrina trinitária para a fé cristã.",
];

const topicosAdultosLicao1 = [
  {
    titulo: "A Trindade se revela no batismo de Jesus",
    conteudo: [
      "Mateus 3.13-17 apresenta, de maneira simultânea, o Filho nas águas, o Espírito descendo como pomba e a voz do Pai declarando seu amor.",
      "A cena do batismo não inventa uma doutrina abstrata; ela mostra a revelação de um só Deus agindo em perfeita harmonia na história da redenção.",
      "Ao iniciar o ministério público de Cristo, o texto bíblico já aponta que a salvação não pode ser entendida sem a cooperação entre Pai, Filho e Espírito Santo.",
    ],
  },
  {
    titulo: "Unidade e distinção das Pessoas divinas",
    conteudo: [
      "A fé cristã não confessa três deuses, mas um único Deus subsistindo eternamente em três Pessoas distintas.",
      "O Pai não é o Filho, o Filho não é o Espírito e o Espírito não é o Pai; ainda assim, os três compartilham a mesma natureza divina.",
      "A doutrina da Trindade protege a igreja tanto do politeísmo quanto das tentativas de diluir ou confundir as Pessoas divinas.",
    ],
  },
  {
    titulo: "Por que a Trindade importa para a vida cristã",
    conteudo: [
      "A salvação é trinitária: o Pai planeja, o Filho realiza a redenção e o Espírito aplica essa obra ao coração do salvo.",
      "A igreja adora o Deus verdadeiro quando reconhece a revelação bíblica completa, sem reduzir o mistério divino a fórmulas simplistas.",
      "Compreender a Trindade fortalece a oração, a adoração, a missão e a confiança do crente no agir de Deus.",
    ],
  },
];

const subsidioAdultosLicao1: LicaoEBD["subsidioAdultos"] = {
  cabecalho: {
    numero: 1,
    titulo: "O Mistério da Santíssima Trindade",
    data: "2026-01-04",
    trimestre: "A Santíssima Trindade — O Deus Único Revelado em Três Pessoas Eternas",
    comentarista: "Douglas Baptista",
    textoAureo:
      "Mateus 3.17 revela a voz do Pai sobre o Filho, enquanto o Espírito repousa sobre Jesus, mostrando a beleza da revelação trinitária.",
    verdadePratica:
      "A doutrina da Trindade está no coração da fé cristã e mostra um só Deus agindo harmonicamente na salvação.",
    leituraBiblicaEmClasse: [
      "Mateus 3.13-17 — a revelação do Pai, do Filho e do Espírito no batismo de Jesus.",
    ],
    leituraDiaria: [
      {
        dia: "Segunda",
        referencia: "Mateus 3.16-17",
        tema: "O batismo de Jesus revela a ação conjunta das Pessoas divinas.",
      },
      {
        dia: "Terça",
        referencia: "Mateus 28.19",
        tema: "A Grande Comissão traz a fórmula trinitária no discipulado cristão.",
      },
      {
        dia: "Quarta",
        referencia: "2 Coríntios 13.13",
        tema: "A bênção apostólica mostra a presença do Deus triúno na comunhão da igreja.",
      },
      {
        dia: "Quinta",
        referencia: "João 14.16-17",
        tema: "Jesus promete o Consolador sem perder a unidade com o Pai.",
      },
      {
        dia: "Sexta",
        referencia: "1 Pedro 1.2",
        tema: "Eleição, santificação e obediência aparecem em chave trinitária.",
      },
      {
        dia: "Sábado",
        referencia: "Efésios 1.3-14",
        tema: "O plano da salvação exibe a atuação do Pai, do Filho e do Espírito.",
      },
    ],
  },
  visaoGeral: {
    resumo:
      "A primeira lição estabelece o fundamento de todo o trimestre ao mostrar que a doutrina da Trindade nasce da revelação bíblica e não de especulação humana. O batismo de Jesus ilumina a unidade do Deus único e a distinção eterna das Pessoas divinas, oferecendo à igreja um eixo seguro para adoração, missão e compreensão da salvação.",
    ideiaCentral:
      "O mistério da Trindade não é contradição, mas revelação bíblica do Deus único que age em três Pessoas eternas.",
    objetivos: objetivosAdultosLicao1,
    palavraChave: {
      termo: "Trindade",
      definicao:
        "Nome dado à revelação bíblica de um único Deus que subsiste eternamente em três Pessoas distintas: Pai, Filho e Espírito Santo.",
    },
  },
  desenvolvimento: [
    {
      id: "batismo-de-jesus",
      titulo: "A Trindade se revela no batismo de Jesus",
      sinopse:
        "O início do ministério público de Cristo já revela a harmonia do Deus triúno na história da redenção.",
      explicacaoBiblica: [
        "Mateus 3.13-17 reúne no mesmo acontecimento a obediência do Filho, o selo visível do Espírito e a aprovação verbal do Pai.",
        "A descida do Espírito não indica inferioridade de Cristo, mas a unção messiânica do Servo perfeito.",
        "A voz do Pai confirma publicamente a identidade do Filho amado e o sentido redentor do seu ministério.",
      ],
      aprofundamentoDoutrinario: [
        "A doutrina da Trindade nasce da Escritura e deve ser ensinada como resposta reverente à revelação, não como invenção filosófica.",
        "O batismo de Jesus ajuda a igreja a rejeitar tanto a confusão das Pessoas quanto a fragmentação da divindade.",
      ],
      aplicacaoPratica: [
        "Leve a classe a perceber que o Evangelho inteiro tem base trinitária, e por isso nossa fé não pode ser rasa ou apenas utilitária.",
        "A adoração cristã se aprofunda quando reconhecemos a beleza da ação conjunta do Pai, do Filho e do Espírito.",
      ],
      referenciasCruzadas: [
        { referencia: "Mateus 28.19", descricao: "A fórmula batismal confirma a revelação trinitária." },
        { referencia: "2 Coríntios 13.13", descricao: "A comunhão da igreja flui da graça trinitária." },
      ],
    },
    {
      id: "unidade-distincao",
      titulo: "Unidade e distinção das Pessoas divinas",
      sinopse:
        "A Bíblia preserva ao mesmo tempo o monoteísmo e a distinção real entre as Pessoas divinas.",
      explicacaoBiblica: [
        "Deuteronômio 6.4 afirma a unidade de Deus, enquanto o Novo Testamento esclarece a relação eterna entre Pai, Filho e Espírito.",
        "João 14.16-17 mostra que Jesus fala do Espírito como outro Consolador, sem confundir as Pessoas.",
        "Textos apostólicos unem as Pessoas divinas na salvação sem diluir sua distinção.",
      ],
      aprofundamentoDoutrinario: [
        "A igreja histórica aprendeu a usar linguagem precisa para dizer que há uma só essência divina e três Pessoas distintas.",
        "Negar a distinção entre as Pessoas enfraquece o Evangelho e cria confusão sobre quem salva, envia e santifica.",
      ],
      aplicacaoPratica: [
        "Ensine a classe a falar da Trindade com reverência e clareza, evitando caricaturas ou fórmulas apressadas.",
        "A precisão doutrinária protege a igreja de erros que parecem simples, mas distorcem a fé cristã.",
      ],
    },
    {
      id: "relevancia-para-a-fe",
      titulo: "Por que a Trindade importa para a vida cristã",
      sinopse:
        "A doutrina trinitária sustenta oração, adoração, missão e salvação.",
      explicacaoBiblica: [
        "Efésios 1 mostra o Pai elegendo, o Filho redimindo e o Espírito selando, revelando a estrutura trinitária do plano da salvação.",
        "A oração cristã se move nessa direção: chegamos ao Pai, por meio do Filho, no poder do Espírito.",
        "A missão da igreja carrega a mesma marca, pois o discipulado é feito em nome do Pai, do Filho e do Espírito Santo.",
      ],
      aprofundamentoDoutrinario: [
        "A doutrina da Trindade preserva a integridade do Evangelho e ajuda a igreja a entender por que a salvação é obra de Deus do começo ao fim.",
        "Sem a Trindade, a adoração cristã perde profundidade e a compreensão da redenção fica fragmentada.",
      ],
      aplicacaoPratica: [
        "A classe deve sair desta lição com mais reverência diante de Deus e mais confiança na consistência da fé cristã.",
        "Reconhecer a ação trinitária na salvação produz humildade, gratidão e compromisso missionário.",
      ],
    },
  ],
  apoioProfessor: {
    perguntaDeAbertura:
      "Por que a doutrina da Trindade costuma parecer difícil para muitos crentes, mesmo sendo central à fé cristã?",
    pontoSensivelDaAula:
      "Alguns alunos podem ter medo de abordar o tema por acharem a Trindade abstrata demais. A aula precisa mostrar que o assunto é bíblico, pastoral e ligado à salvação.",
    erroComumDeInterpretacao:
      "Tentar explicar a Trindade por comparações simplistas demais pode confundir mais do que ajudar e levar a erros doutrinários.",
    perguntasParaDebate: [
      "O que o batismo de Jesus ensina de forma concreta sobre a Trindade?",
      "Como manter a unidade de Deus sem negar a distinção das Pessoas?",
      "De que modo a doutrina trinitária fortalece a adoração e a missão da igreja?",
    ],
    sugestaoDeFechamento:
      "Encerre levando a classe a adorar o Deus triúno com gratidão, reconhecendo que toda a obra da salvação nasce dessa revelação santa.",
  },
  aprofundamento: {
    contextoHistorico: [
      "Desde os primeiros séculos, a igreja precisou defender a fé no Deus único revelado em Pai, Filho e Espírito Santo contra simplificações e distorções.",
      "O uso do termo Trindade surgiu como tentativa pastoral de resumir, com fidelidade, a revelação bíblica já presente no Novo Testamento.",
    ],
    conceitoTeologico: [
      "A unidade de Deus pertence à essência divina; a distinção pertence às Pessoas eternas do Pai, do Filho e do Espírito Santo.",
      "A economia da salvação revela externamente aquilo que Deus é eternamente em si mesmo: comunhão perfeita e ação harmônica.",
    ],
    notaDeVocabulario: [
      {
        titulo: "Monoteísmo",
        conteudo:
          "Confissão bíblica de que existe um único Deus verdadeiro, sem concorrentes ou divisões em sua essência.",
      },
      {
        titulo: "Economia da salvação",
        conteudo:
          "Expressão usada para descrever como Pai, Filho e Espírito atuam de forma harmoniosa na obra redentora.",
      },
    ],
  },
  vidaCrista: {
    oQueConfronta: [
      "A tendência de tratar doutrina apenas como teoria sem relação com a vida espiritual.",
      "A superficialidade que fala de Deus sem conhecer a forma como Ele se revelou nas Escrituras.",
    ],
    oQueConsola: [
      "A salvação não depende de esforço humano isolado, mas da ação coordenada do Deus triúno.",
      "A igreja é sustentada por um Deus que se revelou com clareza suficiente para nossa fé e obediência.",
    ],
    oQueExige: [
      "Reverência doutrinária, humildade e compromisso com o ensino bíblico fiel.",
      "Disposição para adorar, servir e anunciar o Evangelho à luz da revelação trinitária.",
    ],
    oQueRevelaSobreDeus: [
      "Deus é um só em essência e pleno em comunhão eterna entre Pai, Filho e Espírito Santo.",
      "O próprio modo como Deus salva confirma a unidade e a harmonia do seu ser.",
    ],
  },
  revisao: {
    perguntas: [
      "O que o batismo de Jesus revela sobre a Trindade?",
      "Como a Bíblia sustenta ao mesmo tempo a unidade de Deus e a distinção das Pessoas?",
      "Por que a doutrina da Trindade é importante para a salvação e a adoração?",
    ],
    pontosChave: [
      "A Trindade é revelação bíblica, não invenção humana.",
      "Há um único Deus verdadeiro em três Pessoas distintas.",
      "A salvação, a missão e a comunhão cristã possuem base trinitária.",
    ],
    fraseDeSintese:
      "Conhecer o Deus triúno é entrar mais fundo no coração da fé cristã e adorar com mais reverência o Senhor que salva.",
  },
};

const objetivosAdultosLicao2 = [
  "Reconhecer, biblicamente, a identidade de Deus Pai.",
  "Entender que o Pai se revela plenamente em Cristo.",
  "Identificar atributos e nomes que expressam a natureza de Deus Pai.",
];

const topicosAdultosLicao2 = [
  {
    titulo: "Quem é o Deus Pai nas Escrituras",
    conteudo: [
      "A Bíblia apresenta o Pai como o Deus verdadeiro, eterno, santo e digno de toda adoração.",
      "Conhecer o Pai não significa imaginar uma divindade distante, mas receber a revelação que o próprio Deus oferece em sua Palavra.",
      "O Pai está na origem do plano redentor, governando a história com sabedoria, poder e bondade.",
    ],
  },
  {
    titulo: "O Pai se revela no Filho",
    conteudo: [
      "Jesus ensina que ninguém conhece plenamente o Pai senão o Filho, e aquele a quem o Filho o quiser revelar.",
      "A revelação do Pai em Cristo corrige imagens distorcidas de Deus e mostra sua santidade, amor e verdade.",
      "Olhar para Jesus com fé é encontrar o caminho mais seguro para compreender o caráter do Pai.",
    ],
  },
  {
    titulo: "Nomes e atributos que sustentam a fé",
    conteudo: [
      "Os nomes divinos nas Escrituras não são enfeite religioso; eles revelam aspectos do caráter, da aliança e da ação de Deus.",
      "Atributos como santidade, amor, justiça, eternidade e fidelidade dão segurança à igreja em meio às lutas.",
      "Conhecer os atributos do Pai fortalece a oração, a confiança e o temor do Senhor.",
    ],
  },
];

const subsidioAdultosLicao2: LicaoEBD["subsidioAdultos"] = {
  cabecalho: {
    numero: 2,
    titulo: "O Deus Pai",
    data: "2026-01-11",
    trimestre: "A Santíssima Trindade — O Deus Único Revelado em Três Pessoas Eternas",
    comentarista: "Douglas Baptista",
    textoAureo:
      "Mateus 11.27 declara que o conhecimento verdadeiro do Pai nos chega por meio do Filho.",
    verdadePratica:
      "Conhecemos a identidade, os atributos e a glória do Pai por meio de Cristo e da ação do Espírito Santo.",
    leituraBiblicaEmClasse: [
      "Mateus 11.25-27 — o Pai revelado pelo Filho.",
      "João 14.6-11 — quem vê o Filho conhece o Pai.",
    ],
    leituraDiaria: [
      {
        dia: "Segunda",
        referencia: "Mateus 11.27",
        tema: "O Filho é o revelador perfeito do Pai.",
      },
      {
        dia: "Terça",
        referencia: "João 14.9",
        tema: "Conhecer Jesus conduz ao conhecimento verdadeiro do Pai.",
      },
      {
        dia: "Quarta",
        referencia: "Salmos 103.13",
        tema: "O cuidado paterno de Deus aparece com ternura e compaixão.",
      },
      {
        dia: "Quinta",
        referencia: "Malaquias 3.6",
        tema: "A imutabilidade divina sustenta a confiança da igreja.",
      },
      {
        dia: "Sexta",
        referencia: "Êxodo 34.6-7",
        tema: "O nome e o caráter de Deus revelam graça, verdade e justiça.",
      },
      {
        dia: "Sábado",
        referencia: "Tiago 1.17",
        tema: "O Pai das luzes permanece fiel e constante em todo tempo.",
      },
    ],
  },
  visaoGeral: {
    resumo:
      "A segunda lição leva a classe a contemplar a identidade do Pai sem cair em abstrações vazias. As Escrituras mostram que o Pai é o Deus verdadeiro, revelado de modo pleno em Cristo, e que seus nomes e atributos não apenas informam a mente, mas sustentam a confiança do povo de Deus em meio à vida real.",
    ideiaCentral:
      "Conhecer o Pai biblicamente fortalece a fé porque nos aproxima do Deus que se revelou em Cristo com verdade, santidade e amor.",
    objetivos: objetivosAdultosLicao2,
    palavraChave: {
      termo: "Revelação",
      definicao:
        "Não conhecemos o Pai por especulação humana, mas pela iniciativa do próprio Deus em se dar a conhecer por meio da Palavra e de Cristo.",
    },
  },
  desenvolvimento: [
    {
      id: "identidade-do-pai",
      titulo: "Quem é o Deus Pai nas Escrituras",
      sinopse:
        "A Bíblia apresenta o Pai como o Deus verdadeiro, eterno, santo, sábio e soberano.",
      explicacaoBiblica: [
        "Jesus se dirige ao Pai como Senhor do céu e da terra, reconhecendo seu governo absoluto.",
        "O testemunho do Antigo e do Novo Testamento preserva a santidade, a justiça e a bondade do Pai sem oposição interna.",
        "O Pai não é figura abstrata: Ele planeja, chama, governa e sustenta seu povo.",
      ],
      aprofundamentoDoutrinario: [
        "A paternidade divina não deve ser reduzida a projeções humanas; ela é atributo santo e perfeito em Deus.",
        "O Pai permanece a fonte do plano redentor sem jamais agir separado do Filho e do Espírito.",
      ],
      aplicacaoPratica: [
        "Ajude a classe a substituir imagens distorcidas de Deus por uma visão moldada pelas Escrituras.",
        "Conhecer o Pai traz equilíbrio entre reverência profunda e confiança sincera.",
      ],
      referenciasCruzadas: [
        { referencia: "Salmos 90.2", descricao: "O Pai é o Deus eterno." },
        { referencia: "Isaías 6.3", descricao: "A santidade divina molda nossa adoração." },
      ],
    },
    {
      id: "o-pai-revelado-no-filho",
      titulo: "O Pai se revela no Filho",
      sinopse:
        "Cristo é o caminho seguro para conhecer o Pai de forma verdadeira e redentora.",
      explicacaoBiblica: [
        "Mateus 11.27 mostra que o Filho conhece plenamente o Pai e comunica essa revelação aos que nele creem.",
        "João 14 corrige o desejo de ver o Pai fora de Cristo: quem vê o Filho vê o Pai.",
        "A encarnação não obscurece o Pai; ela torna sua graça, sua santidade e sua verdade visíveis ao coração humano.",
      ],
      aprofundamentoDoutrinario: [
        "Não existe conhecimento salvífico do Pai independente da pessoa e da obra de Cristo.",
        "A revelação do Pai no Filho confirma a unidade da Trindade e protege a igreja contra uma espiritualidade vaga e sem centro cristológico.",
      ],
      aplicacaoPratica: [
        "Toda devoção saudável ao Pai precisa passar pelo Cristo das Escrituras.",
        "A classe deve sair da lição sabendo que o Pai não é menos amoroso do que o Filho, nem mais distante do que imaginam alguns corações feridos.",
      ],
      referenciasCruzadas: [
        { referencia: "João 14.6-11", descricao: "O Filho é o caminho revelador do Pai." },
        { referencia: "Colossenses 1.15", descricao: "Cristo é a imagem do Deus invisível." },
      ],
    },
    {
      id: "nomes-e-atributos",
      titulo: "Nomes e atributos que sustentam a fé",
      sinopse:
        "Os nomes e atributos do Pai mostram quem Ele é e como sustenta a vida da igreja.",
      explicacaoBiblica: [
        "Êxodo 34.6-7 descreve Deus como misericordioso, longânimo, fiel e justo.",
        "Tiago 1.17 revela constância no Pai, sem variação ou sombra de mudança.",
        "Os nomes divinos nas Escrituras apontam para cuidado, aliança, provisão e santidade.",
      ],
      aprofundamentoDoutrinario: [
        "Atributos divinos não são peças soltas; eles expressam o ser perfeito de Deus em sua unidade.",
        "A igreja cresce em maturidade quando reconhece que amor, justiça, santidade e fidelidade coexistem plenamente no Pai.",
      ],
      aplicacaoPratica: [
        "Conhecer os atributos do Pai fortalece a oração confiante e combate a leitura emocionalmente instável de Deus.",
        "Os nomes divinos lembram que nossa segurança está no caráter do Pai, e não nas circunstâncias.",
      ],
    },
  ],
  apoioProfessor: {
    perguntaDeAbertura:
      "Quando as pessoas falam de Deus hoje, que imagens mais distorcidas costumam aparecer sobre o Pai?",
    pontoSensivelDaAula:
      "A imagem paterna ferida de alguns alunos pode dificultar a compreensão da paternidade divina. Trate o tema com cuidado pastoral e base bíblica.",
    erroComumDeInterpretacao:
      "Separar o Pai de Cristo ou descrevê-lo como mais severo e menos amoroso do que o Filho distorce a revelação bíblica.",
    perguntasParaDebate: [
      "Por que o conhecimento do Pai depende da revelação do Filho?",
      "Como os atributos do Pai fortalecem a confiança cristã?",
      "Que diferenças práticas surgem quando a igreja conhece o Pai biblicamente?",
    ],
    sugestaoDeFechamento:
      "Conclua levando a classe a agradecer pela revelação do Pai em Cristo e a renovar sua confiança no caráter santo, bom e fiel de Deus.",
  },
  aprofundamento: {
    contextoHistorico: [
      "Ao longo da história, muitos sistemas religiosos falaram de divindade sem oferecer revelação pessoal, santa e redentora do Pai.",
      "A fé cristã preserva o conhecimento de Deus como revelação e aliança, e não como mera especulação filosófica.",
    ],
    conceitoTeologico: [
      "A revelação do Pai no Filho preserva a transcendência divina sem perder a proximidade da graça.",
      "Os atributos de Deus não se contradizem; justiça e amor convivem perfeitamente no ser do Pai.",
    ],
    notaDeVocabulario: [
      {
        titulo: "Pai",
        conteudo:
          "Na linguagem bíblica, o título expressa relação, origem do plano redentor e cuidado santo, não limitação humana projetada em Deus.",
      },
      {
        titulo: "Imutabilidade",
        conteudo:
          "Atributo divino que declara que Deus não muda em seu ser, em seu caráter e em suas promessas.",
      },
    ],
  },
  vidaCrista: {
    oQueConfronta: [
      "Imagens distorcidas de Deus moldadas mais por experiências humanas do que pela Palavra.",
      "A ideia de que é possível amar a Jesus e permanecer indiferente ao Pai que Ele revela.",
    ],
    oQueConsola: [
      "O Pai que se revela em Cristo é fiel, santo, bondoso e digno de confiança em toda circunstância.",
      "Conhecer o caráter do Pai cura inseguranças e fortalece a vida de oração.",
    ],
    oQueExige: [
      "Buscar conhecimento bíblico de Deus com reverência, não com curiosidade superficial.",
      "Responder à revelação do Pai com fé, adoração e vida coerente.",
    ],
    oQueRevelaSobreDeus: [
      "O Pai é santo e amoroso, soberano e próximo, justo e misericordioso.",
      "Sua glória não está separada da obra de Cristo, mas plenamente revelada nela.",
    ],
  },
  revisao: {
    perguntas: [
      "Como a Bíblia apresenta a identidade do Pai?",
      "Por que conhecer Cristo é essencial para conhecer o Pai?",
      "Quais atributos do Pai mais fortalecem a vida cristã?",
    ],
    pontosChave: [
      "O Pai é o Deus verdadeiro, santo, eterno e soberano.",
      "Cristo revela o Pai de maneira plena e confiável.",
      "Os atributos divinos sustentam a fé, a oração e a adoração da igreja.",
    ],
    fraseDeSintese:
      "Conhecer o Pai biblicamente nos leva a confiar mais, orar melhor e viver com reverência diante do Deus que se revelou em Cristo.",
  },
};

const objetivosAdultosLicao3 = [
  "Compreender que o envio do Filho é a maior prova do amor de Deus Pai.",
  "Reconhecer que a vinda de Cristo ocorreu na plenitude dos tempos.",
  "Identificar a atuação da Trindade na execução e aplicação da salvação.",
];

const topicosAdultosLicao3 = [
  {
    titulo: "O amor do Pai no envio do Filho",
    conteudo: [
      "O envio do Filho mostra que a salvação nasce da iniciativa amorosa do Pai, e não da busca humana por Deus.",
      "João 3.16-17 e 1 João 4.9-10 unem amor e missão, revelando que Deus age para resgatar pecadores e não para condená-los sem saída.",
      "O amor do Pai não é sentimentalismo; é ação redentora concreta em favor de um mundo perdido.",
    ],
  },
  {
    titulo: "A plenitude dos tempos e a encarnação",
    conteudo: [
      "Gálatas 4.4 mostra que a vinda do Filho aconteceu no tempo certo, dentro do governo soberano de Deus.",
      "A encarnação revela que a história da salvação não é improvisada, mas planejada pelo Pai desde antes da fundação do mundo.",
      "Cristo veio ao mundo assumindo nossa humanidade para cumprir de modo perfeito aquilo que nós jamais conseguiríamos realizar.",
    ],
  },
  {
    titulo: "A Trindade aplica a salvação ao crente",
    conteudo: [
      "O Pai envia o Filho, o Filho realiza a redenção e o Espírito aplica seus benefícios ao coração do crente.",
      "A adoção, a justificação e a vida nova em Cristo precisam ser lidas dentro dessa cooperação trinitária.",
      "O crente encontra segurança quando percebe que toda a salvação nasce do amor do Pai e é sustentada pela ação do Deus triúno.",
    ],
  },
];

const subsidioAdultosLicao3: LicaoEBD["subsidioAdultos"] = {
  cabecalho: {
    numero: 3,
    titulo: "O Pai Enviou o Filho",
    data: "2026-01-18",
    trimestre: "A Santíssima Trindade — O Deus Único Revelado em Três Pessoas Eternas",
    comentarista: "Douglas Baptista",
    textoAureo:
      "1 João 4.9 mostra que o amor de Deus se tornou visível no envio do Filho unigênito ao mundo.",
    verdadePratica:
      "O envio do Filho revela o amor do Pai e a unidade da Trindade no plano da salvação.",
    leituraBiblicaEmClasse: [
      "João 3.16-17 — o amor do Pai no envio do Filho.",
      "1 João 4.9-10 — o amor divino manifestado na propiciação.",
      "Gálatas 4.4-6 — a plenitude dos tempos e a adoção em Cristo.",
    ],
    leituraDiaria: [
      {
        dia: "Segunda",
        referencia: "João 3.16",
        tema: "O envio do Filho nasce do amor do Pai pelo mundo perdido.",
      },
      {
        dia: "Terça",
        referencia: "1 João 4.9-10",
        tema: "O amor de Deus se manifesta em missão redentora e propiciação.",
      },
      {
        dia: "Quarta",
        referencia: "Gálatas 4.4-5",
        tema: "Cristo veio na plenitude dos tempos para resgatar os que estavam sob a Lei.",
      },
      {
        dia: "Quinta",
        referencia: "Romanos 8.32",
        tema: "O Pai não poupou o próprio Filho, antes o entregou por nós.",
      },
      {
        dia: "Sexta",
        referencia: "Efésios 1.4-7",
        tema: "Eleição, redenção e perdão aparecem no mesmo plano eterno de Deus.",
      },
      {
        dia: "Sábado",
        referencia: "Gálatas 4.6",
        tema: "O Espírito aplica a obra do Filho e confirma nossa adoção.",
      },
    ],
  },
  visaoGeral: {
    resumo:
      "A terceira lição aprofunda a obra do Pai ao mostrar que a missão de Cristo nasce de seu amor eterno e soberano. O envio do Filho, longe de ser evento isolado, revela a unidade da Trindade na redenção: o Pai envia, o Filho obedece e o Espírito aplica a salvação ao coração do pecador regenerado.",
    ideiaCentral:
      "O envio do Filho é a expressão mais alta do amor do Pai e mostra a cooperação trinitária no plano da salvação.",
    objetivos: objetivosAdultosLicao3,
    palavraChave: {
      termo: "Envio",
      definicao:
        "O termo resume a iniciativa missionária do Pai, que envia o Filho ao mundo para realizar a redenção no tempo certo.",
    },
  },
  desenvolvimento: [
    {
      id: "amor-do-pai",
      titulo: "O amor do Pai no envio do Filho",
      sinopse:
        "A missão de Cristo tem origem no amor divino e confronta toda visão meritória da salvação.",
      explicacaoBiblica: [
        "João 3.16-17 revela que o amor do Pai não fica no discurso; ele se torna ação redentora no envio do Filho.",
        "1 João 4.9-10 liga amor, envio e propiciação, mostrando que Deus age para salvar pecadores.",
        "O Pai não envia o Filho por necessidade externa, mas por graça soberana e misericordiosa.",
      ],
      aprofundamentoDoutrinario: [
        "A missão do Filho mostra que o amor divino é santo e eficaz, não mera emoção religiosa.",
        "A iniciativa do Pai preserva a gratuidade da salvação e humilha todo orgulho humano.",
      ],
      aplicacaoPratica: [
        "A classe deve perceber que o amor de Deus não é teoria distante, mas fundamento concreto da esperança cristã.",
        "Quem foi alcançado por esse amor aprende a rejeitar autossuficiência e a viver em gratidão.",
      ],
      referenciasCruzadas: [
        { referencia: "João 3.16-17", descricao: "O amor do Pai se manifesta no envio do Filho." },
        { referencia: "Romanos 5.8", descricao: "Deus prova seu amor ao entregar Cristo por nós." },
      ],
    },
    {
      id: "plenitude-dos-tempos",
      titulo: "A plenitude dos tempos e a encarnação",
      sinopse:
        "A vinda de Cristo acontece no tempo certo e confirma que o plano da salvação não é improvisado.",
      explicacaoBiblica: [
        "Gálatas 4.4 mostra que Deus enviou o Filho na plenitude dos tempos, unindo soberania divina e história concreta.",
        "O nascimento sob a Lei revela a identificação de Cristo com nossa condição, para cumprir de modo perfeito a vontade do Pai.",
        "A encarnação confirma que a redenção acontece na história, mas nasce no coração eterno do plano divino.",
      ],
      aprofundamentoDoutrinario: [
        "A plenitude dos tempos mostra que Deus governa o cenário religioso, político e histórico para cumprir sua promessa.",
        "A obediência do Filho na encarnação faz parte da mesma missão amorosa recebida do Pai.",
      ],
      aplicacaoPratica: [
        "Quando entendemos a soberania de Deus no envio do Filho, aprendemos a confiar em seus tempos mesmo quando a espera é longa.",
        "A fé cristã olha para a história com esperança porque sabe que Deus não trabalha de forma tardia ou acidental.",
      ],
    },
    {
      id: "trindade-na-salvacao",
      titulo: "A Trindade aplica a salvação ao crente",
      sinopse:
        "O mesmo amor que envia o Filho também sustenta a aplicação da redenção pelo Espírito Santo.",
      explicacaoBiblica: [
        "Gálatas 4.6 mostra que, após a obra do Filho, o Pai envia o Espírito do Filho ao coração dos redimidos.",
        "A adoção cristã não é etapa separada do plano redentor, mas fruto da mesma ação divina que nos reconciliou com Deus.",
        "Efésios 1 reforça que eleição, redenção e selo do Espírito pertencem ao mesmo projeto salvador.",
      ],
      aprofundamentoDoutrinario: [
        "A salvação é uma obra trinitária do começo ao fim: o Pai planeja, o Filho executa e o Espírito aplica.",
        "Essa cooperação divina sustenta a segurança do crente porque sua esperança repousa em Deus inteiro, não em esforço humano.",
      ],
      aplicacaoPratica: [
        "Leve a classe a descansar no fato de que sua salvação não é resultado de improviso nem de mérito pessoal.",
        "A compreensão trinitária da salvação fortalece gratidão, adoração e segurança espiritual.",
      ],
    },
  ],
  apoioProfessor: {
    perguntaDeAbertura:
      "O que muda em nossa visão da salvação quando entendemos que ela começa na iniciativa amorosa do Pai?",
    pontoSensivelDaAula:
      "Alguns alunos podem ter sido marcados por uma visão meritória da fé. A aula precisa mostrar, com clareza, que a salvação nasce do amor e da iniciativa de Deus.",
    erroComumDeInterpretacao:
      "Separar o amor do Pai da obra do Filho ou tratar o Espírito como etapa secundária enfraquece a visão trinitária do plano redentor.",
    perguntasParaDebate: [
      "Por que o envio do Filho é a maior prova do amor do Pai?",
      "O que a plenitude dos tempos ensina sobre a soberania de Deus?",
      "Como a atuação do Espírito completa a aplicação da salvação ao crente?",
    ],
    sugestaoDeFechamento:
      "Conclua levando a turma a agradecer pelo amor do Pai, a obra do Filho e a presença do Espírito, reconhecendo a unidade da Trindade na salvação.",
  },
  aprofundamento: {
    contextoHistorico: [
      "A linguagem de envio no Novo Testamento comunica missão, autoridade e origem: o Filho não veio por conta própria, mas em obediência ao Pai.",
      "Paulo usa a expressão plenitude dos tempos para mostrar que Deus governa a história em favor do seu plano redentor.",
    ],
    conceitoTeologico: [
      "A missão do Filho revela o amor do Pai sem diminuir a voluntária obediência de Cristo.",
      "A aplicação da salvação pelo Espírito confirma que redenção, adoção e vida nova pertencem ao mesmo movimento trinitário.",
    ],
  },
  vidaCrista: {
    oQueConfronta: [
      "A ideia de que a salvação depende de desempenho humano ou de mérito espiritual.",
      "A tendência de ler a obra de Cristo sem perceber a iniciativa amorosa do Pai e a aplicação do Espírito.",
    ],
    oQueConsola: [
      "A salvação tem origem no amor do Pai, e isso sustenta o coração do crente em meio às lutas.",
      "O mesmo Deus que enviou o Filho também nos dá o Espírito para confirmar a adoção e a esperança.",
    ],
    oQueExige: [
      "Responder ao amor divino com fé, arrependimento e gratidão perseverante.",
      "Viver como quem foi alcançado por um plano redentor completo e confiável.",
    ],
    oQueRevelaSobreDeus: [
      "O Pai ama de modo santo e eficaz, enviando o Filho para salvar.",
      "A Trindade age em perfeita harmonia na execução e aplicação da redenção.",
    ],
  },
  revisao: {
    perguntas: [
      "Como o envio do Filho manifesta o amor do Pai?",
      "O que significa dizer que Cristo veio na plenitude dos tempos?",
      "Como Pai, Filho e Espírito aparecem juntos na aplicação da salvação?",
    ],
    pontosChave: [
      "A salvação começa na iniciativa amorosa do Pai.",
      "A vinda de Cristo aconteceu no tempo perfeito de Deus.",
      "O Espírito aplica ao crente a obra que o Filho realizou.",
    ],
    fraseDeSintese:
      "O Pai enviou o Filho por amor, no tempo certo, e pelo Espírito torna eficaz em nós a salvação conquistada por Cristo.",
  },
};

const objetivosAdultosLicao4 = [
  "Compreender que a paternidade de Deus é eterna e inseparável de sua natureza.",
  "Reconhecer que confessar a Cristo como Filho é evidência de filiação divina.",
  "Aplicar os princípios do amor do Pai como base para a vida cristã.",
];

const topicosAdultosLicao4 = [
  {
    titulo: "A paternidade divina é eterna",
    conteudo: [
      "A paternidade de Deus não é improvisada nem temporária; ela pertence à forma como o Pai se revela nas Escrituras.",
      "O Pai não se torna Pai apenas por causa da criação ou da igreja, mas é eternamente Pai em relação ao Filho.",
      "Essa verdade protege a fé de uma visão frágil de Deus e sustenta a segurança espiritual do crente.",
    ],
  },
  {
    titulo: "A filiação se evidencia na confissão do Filho",
    conteudo: [
      "1 João 4 mostra que confessar a Jesus como Filho de Deus é marca de permanência em Deus.",
      "A paternidade divina se torna experiência viva quando o crente reconhece Cristo com fé e persevera nessa confissão.",
      "Não há comunhão verdadeira com o Pai sem reconhecimento sincero da identidade e da obra do Filho.",
    ],
  },
  {
    titulo: "O amor do Pai aperfeiçoa a vida cristã",
    conteudo: [
      "O amor do Pai não apenas acolhe; ele forma o caráter do crente e o conduz à maturidade.",
      "Quem vive no amor divino aprende a vencer o medo, crescer em comunhão e responder com obediência.",
      "A paternidade de Deus cria uma comunidade marcada por acolhimento, segurança e verdade.",
    ],
  },
];

const subsidioAdultosLicao4: LicaoEBD["subsidioAdultos"] = {
  cabecalho: {
    numero: 4,
    titulo: "A Paternidade Divina",
    data: "2026-01-25",
    trimestre: "A Santíssima Trindade — O Deus Único Revelado em Três Pessoas Eternas",
    comentarista: "Douglas Baptista",
    textoAureo:
      "1 João 4.14 mostra que o testemunho cristão sobre o Filho está ligado ao conhecimento do amor paterno de Deus.",
    verdadePratica:
      "A paternidade de Deus é revelada no envio do Filho e na concessão do Espírito, confirmando a filiação e aperfeiçoando-nos em amor.",
    leituraBiblicaEmClasse: [
      "1 João 4.13-16 — a paternidade divina reconhecida na confissão do Filho e no dom do Espírito.",
    ],
    leituraDiaria: [
      {
        dia: "Segunda",
        referencia: "1 João 4.13-16",
        tema: "O Pai é conhecido por meio do Filho e do dom do Espírito.",
      },
      {
        dia: "Terça",
        referencia: "João 20.31",
        tema: "Crer no Filho é entrar na vida que o Pai oferece.",
      },
      {
        dia: "Quarta",
        referencia: "Romanos 8.15",
        tema: "A paternidade de Deus vence a lógica do medo servil.",
      },
      {
        dia: "Quinta",
        referencia: "Efésios 3.14-15",
        tema: "Toda verdadeira paternidade encontra seu referencial em Deus.",
      },
      {
        dia: "Sexta",
        referencia: "1 João 3.1",
        tema: "O amor do Pai se manifesta ao nos chamar seus filhos.",
      },
      {
        dia: "Sábado",
        referencia: "Hebreus 12.6-7",
        tema: "A disciplina também pertence ao cuidado paternal de Deus.",
      },
    ],
  },
  visaoGeral: {
    resumo:
      "A quarta lição mostra que a paternidade divina não é uma imagem sentimental, mas uma verdade eterna revelada nas Escrituras. O Pai se dá a conhecer no envio do Filho, no dom do Espírito e no aperfeiçoamento do amor que sustenta a vida cristã e forma a igreja como família da fé.",
    ideiaCentral:
      "A paternidade divina é eterna, cristológica e transformadora: ela acolhe, corrige, amadurece e conduz o crente no amor.",
    objetivos: objetivosAdultosLicao4,
    palavraChave: {
      termo: "Paternidade",
      definicao:
        "Na revelação bíblica, a paternidade de Deus expressa sua relação santa e eterna com o Filho e seu cuidado amoroso com os redimidos.",
    },
  },
  desenvolvimento: [
    {
      id: "paternidade-eterna",
      titulo: "A paternidade divina é eterna",
      sinopse:
        "O Pai não recebe esse título de forma acidental; ele se revela assim de modo perfeito e eterno.",
      explicacaoBiblica: [
        "A paternidade divina aparece nas Escrituras ligada à relação do Pai com o Filho e ao seu cuidado pactual com o povo.",
        "Efésios 3.14-15 ajuda a perceber que toda linguagem legítima de paternidade tem sua fonte em Deus.",
        "Essa verdade impede que reduzamos o Pai a uma projeção humana limitada ou instável.",
      ],
      aprofundamentoDoutrinario: [
        "Deus é Pai eternamente em relação ao Filho, e por isso sua paternidade não depende da criação para existir.",
        "A igreja precisa distinguir a perfeição da paternidade divina das falhas das referências humanas.",
      ],
      aplicacaoPratica: [
        "A classe deve aprender a confiar no Pai a partir da revelação bíblica e não apenas da experiência emocional.",
        "A paternidade divina oferece segurança a quem foi marcado por abandono, rejeição ou medo.",
      ],
    },
    {
      id: "confissao-do-filho",
      titulo: "A filiação se evidencia na confissão do Filho",
      sinopse:
        "A relação com o Pai se manifesta onde Cristo é confessado como Filho de Deus.",
      explicacaoBiblica: [
        "1 João 4.15 mostra que a confissão de Cristo não é detalhe doutrinário, mas evidência de permanência em Deus.",
        "Não existe acesso genuíno ao Pai ignorando a identidade do Filho.",
        "A presença do Espírito confirma esse testemunho e firma o crente na verdade do Evangelho.",
      ],
      aprofundamentoDoutrinario: [
        "A paternidade divina jamais pode ser isolada da cristologia bíblica.",
        "A filiação cristã é recebida na união com Cristo e confirmada pelo Espírito Santo.",
      ],
      aplicacaoPratica: [
        "Incentive a classe a perceber que uma fé madura honra o Pai justamente porque honra o Filho que Ele enviou.",
        "A confissão de Cristo precisa aparecer na igreja não apenas em palavras, mas em fidelidade e perseverança.",
      ],
    },
    {
      id: "amor-que-aperfeicoa",
      titulo: "O amor do Pai aperfeiçoa a vida cristã",
      sinopse:
        "O amor do Pai forma caráter, vence o medo e fortalece a comunhão dos salvos.",
      explicacaoBiblica: [
        "1 João relaciona o amor divino à permanência, à confiança e à transformação da vida cristã.",
        "Romanos 8.15 mostra que a filiação substitui o espírito de escravidão por intimidade reverente diante de Deus.",
        "Hebreus 12 lembra que o cuidado paternal de Deus inclui disciplina amorosa para maturidade.",
      ],
      aprofundamentoDoutrinario: [
        "O amor do Pai não é permissividade; é graça que acolhe e disciplina para formar filhos maduros.",
        "A vida cristã saudável nasce quando comunhão, correção e segurança espiritual caminham juntas.",
      ],
      aplicacaoPratica: [
        "Ajude a classe a identificar áreas em que ainda resiste ao cuidado paternal de Deus.",
        "A igreja local precisa refletir esse amor paterno em acolhimento, verdade e cuidado mútuo.",
      ],
    },
  ],
  apoioProfessor: {
    perguntaDeAbertura:
      "Como a compreensão bíblica da paternidade de Deus corrige imagens distorcidas de autoridade, amor e cuidado?",
    pontoSensivelDaAula:
      "A palavra pai pode acionar memórias dolorosas em alguns alunos. Trabalhe a aula com sensibilidade pastoral e firmeza bíblica.",
    erroComumDeInterpretacao:
      "Reduzir a paternidade divina a sentimentalismo sem santidade, disciplina e verdade enfraquece o ensino bíblico.",
    perguntasParaDebate: [
      "Por que a paternidade de Deus precisa ser entendida a partir do Filho?",
      "Como o amor do Pai combate medo e insegurança espiritual?",
      "De que modo a igreja pode refletir a paternidade divina em sua vida comunitária?",
    ],
    sugestaoDeFechamento:
      "Conclua levando a classe a agradecer pela paternidade santa e amorosa de Deus, reconhecendo sua segurança em Cristo e no dom do Espírito.",
  },
  vidaCrista: {
    oQueConfronta: [
      "A visão de Deus como distante, instável ou emocionalmente imprevisível.",
      "A tendência de querer comunhão com o Pai sem submissão real ao Filho e ao Espírito.",
    ],
    oQueConsola: [
      "O Pai é constante, santo e presente no cuidado com seus filhos.",
      "Seu amor aperfeiçoa a vida cristã e sustenta a comunhão da igreja.",
    ],
    oQueExige: [
      "Confessar Cristo com fidelidade e permanecer no amor do Pai.",
      "Responder ao cuidado divino com confiança, obediência e maturidade.",
    ],
    oQueRevelaSobreDeus: [
      "O Pai se dá a conhecer no Filho e age pelo Espírito em favor do seu povo.",
      "Sua paternidade é eterna, perfeita e transformadora.",
    ],
  },
  revisao: {
    perguntas: [
      "Por que a paternidade de Deus é eterna e não meramente simbólica?",
      "Como a confissão do Filho se relaciona com a filiação divina?",
      "De que modo o amor do Pai aperfeiçoa a vida cristã?",
    ],
    pontosChave: [
      "A paternidade divina pertence ao ser e à revelação de Deus.",
      "A filiação cristã se firma na confissão de Cristo e no dom do Espírito.",
      "O amor do Pai acolhe, corrige e amadurece seus filhos.",
    ],
    fraseDeSintese:
      "A paternidade divina é santa, eterna e amorosa, formando em Cristo uma família marcada por confiança, verdade e maturidade.",
  },
};

const objetivosAdultosLicao5 = [
  "Explicar a concepção virginal e a deidade absoluta de Jesus.",
  "Mostrar a centralidade de Cristo como cumprimento da Lei e dos Profetas.",
  "Enfatizar a exclusividade de Cristo como único mediador e salvador.",
];

const topicosAdultosLicao5 = [
  {
    titulo: "A concepção virginal revela o Deus Filho",
    conteudo: [
      "O anúncio do nascimento de Jesus mostra que sua origem é sobrenatural e inseparável da ação de Deus.",
      "A concepção virginal preserva tanto a verdadeira humanidade quanto a plena divindade do Filho.",
      "Cristo não é apenas mensageiro exaltado; Ele é o Filho eterno que entrou em nossa história.",
    ],
  },
  {
    titulo: "A glória do Filho no monte da transfiguração",
    conteudo: [
      "Na transfiguração, o Pai ordena que a igreja ouça o Filho acima de toda expectativa religiosa ou tradição humana.",
      "A presença de Moisés e Elias reforça que Jesus é o centro e o cumprimento da Lei e dos Profetas.",
      "A glória de Cristo não pode ser reduzida a exemplo moral; ela aponta para sua identidade divina.",
    ],
  },
  {
    titulo: "O Filho é o único mediador e salvador",
    conteudo: [
      "O Deus Filho não divide seu lugar com outros mediadores, porque somente Ele une perfeitamente divindade, humanidade e redenção.",
      "A exclusividade de Cristo não é arrogância da igreja, mas fidelidade à revelação bíblica.",
      "Quem conhece o Filho encontra o caminho seguro de reconciliação com o Pai.",
    ],
  },
];

const subsidioAdultosLicao5: LicaoEBD["subsidioAdultos"] = {
  cabecalho: {
    numero: 5,
    titulo: "O Deus Filho",
    data: "2026-02-01",
    trimestre: "A Santíssima Trindade — O Deus Único Revelado em Três Pessoas Eternas",
    comentarista: "Douglas Baptista",
    textoAureo:
      "Mateus 17.5 destaca a voz do Pai chamando a igreja a ouvir o Filho amado em quem sua glória se manifesta.",
    verdadePratica:
      "Jesus Cristo, o Deus Filho, é a revelação plena do Pai, centro da revelação divina e único mediador.",
    leituraBiblicaEmClasse: [
      "Lucas 1.31-35 — a anunciação e a concepção do Filho.",
      "Mateus 17.1-8 — a glória do Filho no monte da transfiguração.",
    ],
  },
  visaoGeral: {
    resumo:
      "A quinta lição concentra a atenção da classe no Deus Filho, mostrando que a concepção virginal, a transfiguração e a exclusividade da mediação de Cristo revelam sua identidade divina. O Filho não ocupa lugar secundário no plano da salvação; Ele é o centro da revelação e da reconciliação entre Deus e os homens.",
    ideiaCentral:
      "O Deus Filho se revela em glória, cumpre as Escrituras e permanece como o único mediador entre Deus e os homens.",
    objetivos: objetivosAdultosLicao5,
    palavraChave: {
      termo: "Mediador",
      definicao:
        "Aquele que une duas partes e reconcilia o pecador com Deus por meio de sua pessoa e obra redentora.",
    },
  },
  desenvolvimento: [
    {
      id: "concepcao-virginal",
      titulo: "A concepção virginal revela o Deus Filho",
      sinopse:
        "O nascimento de Jesus confirma sua origem divina e sua verdadeira humanidade.",
      explicacaoBiblica: [
        "Lucas 1 mostra que o menino prometido não nasce de iniciativa humana, mas de ação soberana de Deus.",
        "O Filho assume nossa humanidade sem perder sua plena divindade.",
        "A concepção virginal serve como porta de entrada para uma cristologia bíblica sólida.",
      ],
      aprofundamentoDoutrinario: [
        "Negar a concepção virginal enfraquece a encarnação e distorce a identidade do Salvador.",
        "A igreja confessa o Filho eterno que entrou na história humana de modo santo e miraculoso.",
      ],
      aplicacaoPratica: [
        "Ajude a classe a perceber que a fé cristã depende de um Cristo real, divino e encarnado.",
        "A identidade do Filho fortalece a confiança do crente na suficiência da salvação.",
      ],
    },
    {
      id: "transfiguracao",
      titulo: "A glória do Filho no monte da transfiguração",
      sinopse:
        "A transfiguração confirma publicamente a supremacia do Filho sobre toda expectativa religiosa.",
      explicacaoBiblica: [
        "A voz do Pai em Mateus 17 concentra a atenção da igreja em Jesus: 'A ele ouvi'.",
        "Moisés e Elias apontam para Cristo como cumprimento pleno da revelação anterior.",
        "A glória momentaneamente descortinada no monte sustenta a certeza da identidade do Filho.",
      ],
      aprofundamentoDoutrinario: [
        "A centralidade de Cristo não elimina a revelação anterior; ela a consuma.",
        "O Pai autentica o Filho diante dos discípulos para firmar sua fé e obediência.",
      ],
      aplicacaoPratica: [
        "A igreja precisa ouvir o Filho acima de vozes concorrentes, tradições humanas e modismos espirituais.",
        "Toda leitura saudável da Bíblia conduz à centralidade de Cristo.",
      ],
    },
    {
      id: "unico-mediador",
      titulo: "O Filho é o único mediador e salvador",
      sinopse:
        "A exclusividade de Cristo faz parte do coração do Evangelho e protege a igreja de substitutos religiosos.",
      explicacaoBiblica: [
        "A mediação de Cristo nasce de quem Ele é: verdadeiro Deus e verdadeiro homem.",
        "Só o Filho pode reconciliar o pecador com o Pai porque sua obra é suficiente e definitiva.",
        "A salvação cristã não admite competidores para o lugar de Cristo.",
      ],
      aprofundamentoDoutrinario: [
        "A singularidade de Cristo não é intolerância eclesiástica, mas fidelidade ao testemunho das Escrituras.",
        "Quando a igreja relativiza a mediação do Filho, enfraquece a mensagem do Evangelho.",
      ],
      aplicacaoPratica: [
        "Conduza a classe a renovar sua confiança em Cristo como único Senhor e Salvador.",
        "A centralidade do Filho impede sincretismos e fortalece a missão evangelística.",
      ],
    },
  ],
  apoioProfessor: {
    perguntaDeAbertura:
      "Por que a igreja precisa insistir hoje na deidade plena de Cristo e em sua mediação exclusiva?",
    pontoSensivelDaAula:
      "Muitos discursos religiosos aceitam Jesus como mestre admirável, mas resistem em reconhecê-lo como Deus Filho e único mediador.",
    erroComumDeInterpretacao:
      "Tratar Cristo apenas como exemplo moral ou profeta elevado, sem afirmar sua plena divindade, descaracteriza o Evangelho.",
    perguntasParaDebate: [
      "O que a concepção virginal nos ensina sobre a identidade do Filho?",
      "Por que a transfiguração reforça a centralidade de Cristo?",
      "Como a igreja deve viver a verdade de que Jesus é o único mediador?",
    ],
    sugestaoDeFechamento:
      "Encerre chamando a classe a ouvir o Filho amado com fé, obediência e confiança total em sua obra salvadora.",
  },
  revisao: {
    perguntas: [
      "Como a concepção virginal reforça a doutrina do Deus Filho?",
      "O que a transfiguração ensina sobre a supremacia de Cristo?",
      "Por que a mediação de Jesus é exclusiva e suficiente?",
    ],
    pontosChave: [
      "Jesus é o Filho eterno que assumiu nossa humanidade.",
      "A glória de Cristo o coloca no centro da revelação bíblica.",
      "O Filho é o único mediador e salvador dos pecadores.",
    ],
    fraseDeSintese:
      "O Deus Filho entrou em nossa história, revelou a glória divina e permanece como o único mediador capaz de salvar.",
  },
};

const objetivosAdultosLicao6 = [
  "Explicar a preexistência e a divindade do Verbo.",
  "Mostrar a atuação do Verbo na criação e como fonte de vida e luz.",
  "Ressaltar que o Verbo encarnado é a plena revelação do Pai.",
];

const topicosAdultosLicao6 = [
  {
    titulo: "O Verbo eterno estava com Deus e era Deus",
    conteudo: [
      "João 1 afirma a preexistência do Verbo e sua plena divindade antes de toda criação.",
      "O Filho não começou em Belém; Ele já existia eternamente em comunhão com o Pai.",
      "O prólogo de João oferece uma das declarações mais fortes sobre a identidade divina de Cristo.",
    ],
  },
  {
    titulo: "O Verbo atua na criação como fonte de vida e luz",
    conteudo: [
      "Todas as coisas foram feitas por meio do Verbo, mostrando sua participação ativa na criação.",
      "A vida que está no Verbo é luz para os homens, confrontando as trevas espirituais.",
      "Cristo não é apenas resposta para o pecado; Ele é também o fundamento do cosmos e da existência.",
    ],
  },
  {
    titulo: "O Verbo encarnado revela plenamente o Pai",
    conteudo: [
      "João 1.14 mostra que o Verbo se fez carne e habitou entre nós sem perder sua glória.",
      "Na encarnação, Deus não envia só uma mensagem; Ele mesmo se aproxima em Cristo para revelar graça e verdade.",
      "Ver o Filho é receber a revelação mais completa do Pai oferecida ao ser humano.",
    ],
  },
];

const subsidioAdultosLicao6: LicaoEBD["subsidioAdultos"] = {
  cabecalho: {
    numero: 6,
    titulo: "O Filho como o Verbo de Deus",
    data: "2026-02-08",
    trimestre: "A Santíssima Trindade — O Deus Único Revelado em Três Pessoas Eternas",
    comentarista: "Douglas Baptista",
    textoAureo:
      "João 1.14 declara que o Verbo eterno se fez carne e manifestou entre nós a glória do Pai.",
    verdadePratica:
      "Jesus Cristo, o Verbo eterno, é a revelação plena e visível de Deus ao mundo.",
    leituraBiblicaEmClasse: [
      "João 1.1-5,14 — o Verbo eterno, criador, fonte de vida e revelado na encarnação.",
    ],
  },
  visaoGeral: {
    resumo:
      "A sexta lição contempla o Filho como o Verbo eterno de Deus. O prólogo de João reúne preexistência, divindade, criação, vida, luz e encarnação em uma síntese magnífica que conduz a igreja a reconhecer em Cristo a plena revelação do Pai e o fundamento da esperança cristã.",
    ideiaCentral:
      "O Verbo eterno é Deus, participa da criação e se encarna para revelar plenamente o Pai.",
    objetivos: objetivosAdultosLicao6,
    palavraChave: {
      termo: "Verbo",
      definicao:
        "Expressão usada por João para descrever o Filho eterno como autoexpressão de Deus, agente da criação e revelação suprema do Pai.",
    },
  },
  desenvolvimento: [
    {
      id: "verbo-eterno",
      titulo: "O Verbo eterno estava com Deus e era Deus",
      sinopse:
        "João 1 afirma a preexistência do Filho e sua plena divindade com clareza incomum.",
      explicacaoBiblica: [
        "O prólogo não começa no nascimento de Jesus, mas na eternidade, antes de todas as coisas.",
        "O Verbo estava com Deus, indicando distinção relacional, e era Deus, afirmando plena divindade.",
        "Essa combinação sustenta uma cristologia robusta e trinitária.",
      ],
      aprofundamentoDoutrinario: [
        "A linguagem joanina protege a igreja tanto do subordinacionismo quanto da negação da distinção pessoal entre Pai e Filho.",
        "A eternidade do Verbo confirma que Cristo não é criatura exaltada, mas Deus verdadeiro.",
      ],
      aplicacaoPratica: [
        "Ensinar a eternidade do Verbo fortalece a confiança da igreja na suficiência de Cristo.",
        "O crente pode descansar porque o Salvador não é passageiro nem limitado pela história.",
      ],
    },
    {
      id: "verbo-criador",
      titulo: "O Verbo atua na criação como fonte de vida e luz",
      sinopse:
        "Cristo participa da criação e confronta as trevas como fonte de vida e luz para a humanidade.",
      explicacaoBiblica: [
        "João 1.3 declara que nada do que foi feito veio à existência sem o Verbo.",
        "A vida no Verbo se manifesta como luz que alcança a humanidade caída.",
        "As trevas não prevalecem contra a luz de Cristo, por mais intensas que pareçam.",
      ],
      aprofundamentoDoutrinario: [
        "A atuação criadora do Verbo mostra que redenção e criação pertencem ao mesmo Senhor.",
        "Cristo é tanto origem de todas as coisas quanto esperança da nova criação.",
      ],
      aplicacaoPratica: [
        "A classe deve perceber que a luz de Cristo continua sendo resposta para confusão, pecado e desorientação espiritual.",
        "A vida cristã amadurece quando reconhece em Jesus não apenas auxílio, mas o fundamento de toda existência.",
      ],
    },
    {
      id: "verbo-encarnado",
      titulo: "O Verbo encarnado revela plenamente o Pai",
      sinopse:
        "Na encarnação, Deus torna visível sua glória e aproxima graça e verdade do ser humano.",
      explicacaoBiblica: [
        "João 1.14 descreve o Verbo habitando entre nós em linguagem que lembra a presença de Deus no tabernáculo.",
        "A glória vista em Cristo é glória do unigênito do Pai, cheia de graça e verdade.",
        "A encarnação mostra que Deus não fala de longe; Ele se aproxima em Jesus para salvar e revelar.",
      ],
      aprofundamentoDoutrinario: [
        "A encarnação não diminui a divindade do Filho; revela sua graça ao assumir nossa humanidade.",
        "Cristo é a mais completa manifestação do Pai oferecida ao ser humano pecador.",
      ],
      aplicacaoPratica: [
        "A igreja precisa voltar sempre a Cristo para conhecer Deus com fidelidade e profundidade.",
        "Graça e verdade não se opõem em Jesus; elas caminham juntas e moldam o discipulado.",
      ],
    },
  ],
  apoioProfessor: {
    perguntaDeAbertura:
      "O que o prólogo de João acrescenta à nossa compreensão sobre quem é Jesus?",
    pontoSensivelDaAula:
      "Alguns alunos podem enxergar João 1 apenas como texto elevado e abstrato. A aula precisa mostrar a força pastoral do Verbo eterno que se fez carne.",
    erroComumDeInterpretacao:
      "Tratar o Verbo como simples fala de Deus, sem reconhecer a pessoa eterna do Filho, reduz a profundidade do texto joanino.",
    perguntasParaDebate: [
      "Como João 1 confirma a preexistência e a divindade de Cristo?",
      "Por que a atuação do Verbo na criação é importante para a fé cristã?",
      "O que significa dizer que o Verbo se fez carne e revelou o Pai?",
    ],
    sugestaoDeFechamento:
      "Conclua convidando a classe a contemplar o Verbo encarnado com reverência, fé e gratidão pela revelação plena do Pai em Cristo.",
  },
  revisao: {
    perguntas: [
      "O que João 1 ensina sobre a eternidade do Verbo?",
      "Como o Verbo participa da criação e da vida do mundo?",
      "Por que a encarnação é essencial para conhecer o Pai?",
    ],
    pontosChave: [
      "O Verbo estava com Deus e era Deus.",
      "Todas as coisas foram feitas por meio do Verbo.",
      "O Verbo se fez carne e revelou a glória do Pai.",
    ],
    fraseDeSintese:
      "O Filho como Verbo eterno é Deus verdadeiro, Senhor da criação e revelação suprema do Pai para a salvação do mundo.",
  },
};

const objetivosAdultosLicao7 = [
  "Explicar a humilhação voluntária de Cristo e sua obediência até a cruz.",
  "Mostrar que a obra redentora do Filho é única, suficiente e vicária.",
  "Ressaltar a exaltação gloriosa de Cristo e sua soberania universal.",
];

const topicosAdultosLicao7 = [
  {
    titulo: "A humilhação voluntária do Filho",
    conteudo: [
      "Filipenses 2 mostra que Cristo não se agarrou à sua glória, mas assumiu a forma de servo em obediência ao Pai.",
      "A humilhação do Filho não significa perda de divindade, mas manifestação suprema de amor e missão redentora.",
      "A cruz revela que a obediência de Jesus foi completa, santa e voluntária.",
    ],
  },
  {
    titulo: "A obra redentora é única e suficiente",
    conteudo: [
      "Hebreus 9 destaca que Cristo entrou no santuário celestial com seu próprio sangue, realizando redenção eterna.",
      "A obra do Filho é vicária: Ele assume em nosso lugar aquilo que nós não poderíamos cumprir.",
      "Nada precisa ser acrescentado ao sacrifício de Cristo para completar a salvação.",
    ],
  },
  {
    titulo: "O Filho exaltado reina soberanamente",
    conteudo: [
      "A exaltação de Cristo confirma a aprovação do Pai e a vitória plena da obra redentora.",
      "O nome que está acima de todo nome chama a igreja à adoração, submissão e esperança.",
      "A soberania do Filho sustenta a missão da igreja e a perseverança do crente.",
    ],
  },
];

const subsidioAdultosLicao7: LicaoEBD["subsidioAdultos"] = {
  cabecalho: {
    numero: 7,
    titulo: "A Obra do Filho",
    data: "2026-02-15",
    trimestre: "A Santíssima Trindade — O Deus Único Revelado em Três Pessoas Eternas",
    comentarista: "Douglas Baptista",
    textoAureo:
      "Filipenses 2.9 mostra que a exaltação de Cristo confirma a glória do Filho que se humilhou por nós.",
    verdadePratica:
      "A humilhação voluntária, a obra redentora e a exaltação gloriosa de Cristo revelam que só Ele é digno de adoração e obediência.",
    leituraBiblicaEmClasse: [
      "Filipenses 2.5-11 — a humilhação e a exaltação do Filho.",
      "Hebreus 9.24-28 — a obra redentora única e suficiente de Cristo.",
    ],
  },
  visaoGeral: {
    resumo:
      "A sétima lição apresenta o coração da obra do Filho: sua humilhação voluntária, seu sacrifício suficiente e sua exaltação gloriosa. Em Cristo, a redenção deixa de ser hipótese e se torna obra consumada, capaz de reconciliar o pecador com Deus e sustentar a esperança da igreja.",
    ideiaCentral:
      "A obra do Filho une obediência, sacrifício e glória em uma redenção completa e suficiente para o pecador.",
    objetivos: objetivosAdultosLicao7,
    palavraChave: {
      termo: "Redenção",
      definicao:
        "A obra pela qual Cristo liberta o pecador do poder do pecado e o reconcilia com Deus por meio de seu sacrifício vicário.",
    },
  },
  desenvolvimento: [
    {
      id: "humilhacao",
      titulo: "A humilhação voluntária do Filho",
      sinopse:
        "Cristo se humilhou em obediência perfeita, sem perder sua dignidade divina.",
      explicacaoBiblica: [
        "Filipenses 2 apresenta a encarnação e a cruz como movimentos de obediência e serviço.",
        "A forma de servo assumida por Cristo revela sua disposição de cumprir plenamente a vontade do Pai.",
        "A humilhação do Filho é manifestação do amor redentor e não sinal de inferioridade ontológica.",
      ],
      aplicacaoPratica: [
        "A igreja aprende com Cristo a obedecer com humildade e fidelidade, mesmo quando o caminho envolve renúncia.",
        "A contemplação da cruz combate orgulho, autossuficiência e superficialidade espiritual.",
      ],
    },
    {
      id: "redencao-suficiente",
      titulo: "A obra redentora é única e suficiente",
      sinopse:
        "O sacrifício do Filho realiza de uma vez por todas aquilo que nenhum sistema religioso poderia completar.",
      explicacaoBiblica: [
        "Hebreus 9 mostra que Cristo entrou no verdadeiro santuário com seu próprio sangue.",
        "Sua oferta é definitiva, diferente dos sacrifícios repetitivos e incapazes de aperfeiçoar plenamente.",
        "A redenção operada por Cristo é eterna, eficaz e suficiente.",
      ],
      aplicacaoPratica: [
        "A classe precisa sair da lição descansando na suficiência de Cristo e rejeitando toda lógica de mérito complementar.",
        "A segurança da salvação nasce da obra consumada do Filho, e não do desempenho humano.",
      ],
    },
    {
      id: "exaltacao",
      titulo: "O Filho exaltado reina soberanamente",
      sinopse:
        "A exaltação confirma a vitória do Filho e chama toda a criação à submissão.",
      explicacaoBiblica: [
        "O Pai exaltou o Filho e lhe deu o nome acima de todo nome.",
        "A soberania de Cristo se estende sobre céus, terra e tudo o que existe.",
        "A igreja vive sob a certeza de que o Redentor crucificado é também o Senhor glorificado.",
      ],
      aplicacaoPratica: [
        "A exaltação de Cristo fortalece a adoração e a coragem missionária da igreja.",
        "O crente persevera porque sabe que o Senhor da cruz também é o Senhor do futuro.",
      ],
    },
  ],
  apoioProfessor: {
    perguntaDeAbertura:
      "Por que a igreja precisa lembrar continuamente que a obra de Cristo é suficiente e definitiva?",
    pontoSensivelDaAula:
      "Muitos cristãos vivem como se ainda precisassem provar seu valor a Deus. A aula precisa conduzir a classe ao descanso na obra consumada do Filho.",
    erroComumDeInterpretacao:
      "Confundir a humilhação do Filho com inferioridade de sua pessoa enfraquece a cristologia bíblica.",
    perguntasParaDebate: [
      "O que a humilhação voluntária de Cristo ensina sobre seu amor e sua obediência?",
      "Por que Hebreus insiste tanto na suficiência do sacrifício de Cristo?",
      "Como a exaltação do Filho fortalece a vida da igreja hoje?",
    ],
    sugestaoDeFechamento:
      "Conclua levando a turma a adorar a Cristo como Redentor suficiente e Senhor exaltado, confiando plenamente em sua obra.",
  },
  revisao: {
    perguntas: [
      "Como Filipenses 2 descreve a humilhação do Filho?",
      "O que torna a obra redentora de Cristo única e suficiente?",
      "Por que a exaltação de Cristo é tão importante para a esperança cristã?",
    ],
    pontosChave: [
      "O Filho se humilhou voluntariamente em obediência ao Pai.",
      "Seu sacrifício é vicário, suficiente e definitivo.",
      "Cristo exaltado reina soberanamente sobre todas as coisas.",
    ],
    fraseDeSintese:
      "A obra do Filho une cruz e glória, sacrifício e soberania, oferecendo redenção completa ao pecador e esperança segura à igreja.",
  },
};

const objetivosAdultosLicao8 = [
  "Mostrar que o Espírito Santo é uma Pessoa, distinta, mas coigual ao Pai e ao Filho.",
  "Evidenciar a plena divindade do Espírito Santo e seus atributos.",
  "Ressaltar as principais obras do Espírito Santo: encarnação, ressurreição e santificação.",
];

const topicosAdultosLicao8 = [
  {
    titulo: "O Espírito Santo é Pessoa divina",
    conteudo: [
      "O Espírito Santo ensina, guia, fala e consola, mostrando atributos pessoais e não mera força impessoal.",
      "Sua distinção em relação ao Pai e ao Filho aparece com clareza nas palavras de Jesus em João 14.",
      "Reconhecer a pessoalidade do Espírito protege a igreja de reduções místicas e utilitárias.",
    ],
  },
  {
    titulo: "O Espírito é plenamente Deus",
    conteudo: [
      "Os atributos e obras do Espírito Santo revelam sua plena divindade e coigualdade na Trindade.",
      "O Espírito participa da encarnação, atua na ressurreição e sustenta a santificação do povo de Deus.",
      "Negar a divindade do Espírito empobrece a doutrina da salvação e a vida da igreja.",
    ],
  },
  {
    titulo: "As obras do Espírito sustentam a vida cristã",
    conteudo: [
      "O Espírito não apenas iniciou a história da redenção; Ele continua atuando na igreja e no crente.",
      "Santificação, consolo, direção e comunhão pertencem à presença ativa do Espírito na vida dos salvos.",
      "A igreja pentecostal precisa falar do Espírito com base bíblica e reverência teológica.",
    ],
  },
];

const subsidioAdultosLicao8: LicaoEBD["subsidioAdultos"] = {
  cabecalho: {
    numero: 8,
    titulo: "O Deus Espírito Santo",
    data: "2026-02-22",
    trimestre: "A Santíssima Trindade — O Deus Único Revelado em Três Pessoas Eternas",
    comentarista: "Douglas Baptista",
    textoAureo:
      "João 14.16 mostra que o Espírito Santo é outro Consolador enviado pelo Pai em nome do Filho.",
    verdadePratica:
      "O Espírito Santo é a terceira Pessoa da Trindade, plenamente divino, Consolador, Ensinador e Santificador.",
    leituraBiblicaEmClasse: [
      "João 14.25-31 — o Consolador enviado à igreja.",
    ],
  },
  visaoGeral: {
    resumo:
      "A oitava lição centra a atenção da classe no Espírito Santo como Pessoa divina, distinta, coigual e ativa na história da redenção. O mesmo Espírito que participa da encarnação, atua na ressurreição e santifica a igreja continua sendo Consolador, Ensinador e presença viva de Deus entre seu povo.",
    ideiaCentral:
      "O Espírito Santo é Deus verdadeiro, Pessoa divina e agente indispensável da salvação e da santificação.",
    objetivos: objetivosAdultosLicao8,
    palavraChave: {
      termo: "Consolador",
      definicao:
        "Título que descreve o Espírito Santo como presença pessoal de Deus que auxilia, ensina, lembra e fortalece a igreja.",
    },
  },
  desenvolvimento: [
    {
      id: "pessoa-divina",
      titulo: "O Espírito Santo é Pessoa divina",
      sinopse:
        "O Espírito ensina, lembra, guia e fala, revelando pessoalidade real e distinta.",
      explicacaoBiblica: [
        "João 14 apresenta o Espírito como outro Consolador, distinto do Filho e enviado pelo Pai.",
        "O uso de ações pessoais impede que o tratemos como energia ou influência impessoal.",
        "A vida da igreja depende de relacionamento reverente com o Espírito Santo.",
      ],
      aplicacaoPratica: [
        "A classe deve abandonar linguagem superficial que reduz o Espírito a sensação ou recurso emocional.",
        "Reconhecer a pessoalidade do Espírito aprofunda a oração e a dependência cristã.",
      ],
    },
    {
      id: "divindade",
      titulo: "O Espírito é plenamente Deus",
      sinopse:
        "Os atributos e as obras do Espírito revelam sua plena divindade e coigualdade trinitária.",
      explicacaoBiblica: [
        "O Espírito atua na encarnação de Cristo, participa da ressurreição e opera santificação no crente.",
        "Essas obras pertencem a Deus e mostram que o Espírito não ocupa posição inferior na Trindade.",
        "A igreja precisa confessar com clareza sua divindade para não empobrecer a fé cristã.",
      ],
      aplicacaoPratica: [
        "A adoração da igreja deve ser marcada por reverência ao Espírito Santo como Deus verdadeiro.",
        "A doutrina correta do Espírito protege contra exageros místicos e frieza doutrinária.",
      ],
    },
    {
      id: "obra-na-igreja",
      titulo: "As obras do Espírito sustentam a vida cristã",
      sinopse:
        "O Espírito segue atuando de forma pessoal e santa no cotidiano da igreja e do crente.",
      explicacaoBiblica: [
        "Ele ensina, consola, convence, dirige e santifica o povo de Deus.",
        "A vida cristã se torna árida quando tenta avançar sem dependência real do Espírito.",
        "A presença do Espírito não elimina a centralidade de Cristo; ao contrário, a confirma.",
      ],
      aplicacaoPratica: [
        "A igreja precisa cultivar uma relação bíblica com o Espírito, marcada por reverência, submissão e sensibilidade à Palavra.",
        "O crente amadurece quando entende que santificação e consolo caminham juntos na obra do Espírito.",
      ],
    },
  ],
  apoioProfessor: {
    perguntaDeAbertura:
      "Por que ainda hoje tanta gente fala do Espírito Santo como se Ele fosse apenas força ou sensação?",
    pontoSensivelDaAula:
      "A aula precisa equilibrar fervor pentecostal com firmeza bíblica, evitando tanto o reducionismo racional quanto o emocionalismo sem base doutrinária.",
    erroComumDeInterpretacao:
      "Tratar o Espírito como poder impessoal ou como manifestação separada do Pai e do Filho rompe a compreensão bíblica da Trindade.",
    perguntasParaDebate: [
      "Que evidências bíblicas mostram que o Espírito Santo é Pessoa?",
      "Como a Bíblia revela sua plena divindade?",
      "De que modo a igreja deve responder à atuação do Espírito hoje?",
    ],
    sugestaoDeFechamento:
      "Conclua levando a classe a reconhecer o Espírito Santo com reverência, dependência e gratidão por sua presença santa na igreja.",
  },
  revisao: {
    perguntas: [
      "Quais características pessoais do Espírito aparecem em João 14?",
      "Que obras do Espírito evidenciam sua divindade?",
      "Como o Espírito sustenta a vida cristã e a santificação da igreja?",
    ],
    pontosChave: [
      "O Espírito Santo é Pessoa divina, distinta e coigual na Trindade.",
      "Sua plena divindade aparece em seus atributos e obras.",
      "A igreja vive, aprende e amadurece pela atuação do Espírito.",
    ],
    fraseDeSintese:
      "O Deus Espírito Santo permanece presente, ativo e santo, sustentando a igreja com consolo, ensino e santificação.",
  },
};

const objetivosAdultosLicao9 = [
  "Explicar que a regeneração é obra trinitária, planejada pelo Pai, realizada pelo Filho e aplicada pelo Espírito Santo.",
  "Mostrar que a regeneração é transformação espiritual interior e indispensável à salvação.",
  "Apontar sinais práticos do novo nascimento: justificação, santificação e fruto do Espírito.",
];

const topicosAdultosLicao9 = [
  {
    titulo: "A regeneração é obra da Trindade",
    conteudo: [
      "O novo nascimento não nasce de esforço humano, mas da ação conjunta do Pai, do Filho e do Espírito Santo.",
      "O Pai planeja, o Filho realiza a redenção e o Espírito aplica a vida nova ao coração do pecador.",
      "Falar de regeneração é falar de milagre espiritual, não de mera reforma de comportamento.",
    ],
  },
  {
    titulo: "O novo nascimento transforma o interior",
    conteudo: [
      "João 3 mostra que nascer de novo é necessidade absoluta para ver e entrar no Reino de Deus.",
      "A regeneração alcança o coração, muda desejos, abre os olhos espirituais e reorienta a vida para Deus.",
      "Sem o novo nascimento, a religião permanece externa e incapaz de produzir verdadeira comunhão com Deus.",
    ],
  },
  {
    titulo: "Evidências práticas da vida regenerada",
    conteudo: [
      "A obra do Espírito produz sinais concretos: nova postura diante do pecado, santificação progressiva e fruto espiritual.",
      "A regeneração não elimina a luta cristã, mas muda a direção da vida e o centro do desejo.",
      "A igreja precisa discernir entre emoção religiosa passageira e transformação real operada por Deus.",
    ],
  },
];

const subsidioAdultosLicao9: LicaoEBD["subsidioAdultos"] = {
  cabecalho: {
    numero: 9,
    titulo: "Espírito Santo — O Regenerador",
    data: "2026-03-01",
    trimestre: "A Santíssima Trindade — O Deus Único Revelado em Três Pessoas Eternas",
    comentarista: "Douglas Baptista",
    textoAureo:
      "João 3.3 mostra que o novo nascimento é indispensável para ver o Reino de Deus.",
    verdadePratica:
      "A regeneração é transformação operada pelo Espírito pela qual o pecador se torna nova criatura.",
    leituraBiblicaEmClasse: [
      "João 3.1-8 — a necessidade do novo nascimento e a ação soberana do Espírito.",
    ],
  },
  visaoGeral: {
    resumo:
      "A nona lição destaca o Espírito Santo como regenerador, mostrando que o novo nascimento é obra indispensável da graça de Deus. A salvação não consiste em ajuste moral externo, mas em transformação interior produzida pelo Espírito, que cria nova vida, novo desejo e nova direção para quem crê em Cristo.",
    ideiaCentral:
      "A regeneração é milagre espiritual indispensável, operado pelo Espírito e visível em uma vida transformada.",
    objetivos: objetivosAdultosLicao9,
    palavraChave: {
      termo: "Regeneração",
      definicao:
        "Ato pelo qual o Espírito Santo comunica nova vida ao pecador, tornando-o participante da obra de Cristo e da família de Deus.",
    },
  },
  desenvolvimento: [
    {
      id: "obra-trinitaria",
      titulo: "A regeneração é obra da Trindade",
      sinopse:
        "O novo nascimento faz parte do mesmo plano salvador em que Pai, Filho e Espírito atuam harmonicamente.",
      explicacaoBiblica: [
        "João 3 apresenta a regeneração como ação que vem de cima, e não como construção da vontade humana.",
        "A obra regeneradora é inseparável da redenção de Cristo e do propósito do Pai.",
        "O Espírito Santo aplica ao coração o que o Filho conquistou na cruz.",
      ],
      aplicacaoPratica: [
        "A classe deve rejeitar a ideia de que disciplina religiosa, por si só, produz novo nascimento.",
        "A salvação precisa ser ensinada como dependência total da graça divina.",
      ],
    },
    {
      id: "transformacao-interior",
      titulo: "O novo nascimento transforma o interior",
      sinopse:
        "Regeneração é mudança profunda do coração, do entendimento e da disposição diante de Deus.",
      explicacaoBiblica: [
        "Nascer da água e do Espírito aponta para purificação e vida nova realizadas por Deus.",
        "O Espírito opera de modo soberano, invisível e eficaz, como o vento que sopra onde quer.",
        "A transformação interior explica por que o regenerado passa a amar o que antes rejeitava.",
      ],
      aplicacaoPratica: [
        "A igreja deve confrontar uma religiosidade apenas externa que não produz vida nova.",
        "O discipulado cristão precisa começar no coração regenerado e avançar em santificação.",
      ],
    },
    {
      id: "evidencias-praticas",
      titulo: "Evidências práticas da vida regenerada",
      sinopse:
        "O novo nascimento deixa marcas visíveis na caminhada cristã, embora não produza perfeição imediata.",
      explicacaoBiblica: [
        "Justificação, santificação e fruto do Espírito surgem como efeitos da nova vida recebida em Cristo.",
        "A regeneração muda a direção do ser humano, ainda que a luta contra o pecado continue presente.",
        "A nova criatura passa a responder de maneira diferente à Palavra, à oração e à comunhão da igreja.",
      ],
      aplicacaoPratica: [
        "Ajude a classe a distinguir entre decisão emocional e transformação contínua produzida pelo Espírito.",
        "Leve os alunos a examinar se há sinais reais de nova vida em seu caminhar com Deus.",
      ],
    },
  ],
  apoioProfessor: {
    perguntaDeAbertura:
      "O que diferencia uma mudança apenas emocional de um novo nascimento verdadeiro?",
    pontoSensivelDaAula:
      "Alguns alunos podem associar conversão apenas a experiência passada. A aula precisa mostrar que o novo nascimento continua produzindo efeitos presentes.",
    erroComumDeInterpretacao:
      "Reduzir a regeneração a decisão intelectual ou mudança de ambiente enfraquece a gravidade e a beleza da obra do Espírito.",
    perguntasParaDebate: [
      "Por que Jesus trata o novo nascimento como necessidade absoluta?",
      "Como a regeneração se relaciona com o restante da salvação?",
      "Que sinais práticos ajudam a reconhecer a vida regenerada?",
    ],
    sugestaoDeFechamento:
      "Conclua chamando a classe à gratidão pelo novo nascimento e ao exame sincero diante de Deus sobre os frutos dessa obra na vida diária.",
  },
  revisao: {
    perguntas: [
      "Por que a regeneração é indispensável para entrar no Reino?",
      "Como o Espírito opera o novo nascimento no pecador?",
      "Que sinais práticos acompanham a vida regenerada?",
    ],
    pontosChave: [
      "A regeneração é obra da Trindade aplicada pelo Espírito Santo.",
      "O novo nascimento transforma o interior e não apenas a aparência religiosa.",
      "A vida regenerada produz fruto, santificação e nova direção espiritual.",
    ],
    fraseDeSintese:
      "O Espírito Santo regenera o pecador e inaugura uma vida nova que se torna visível em fé, santidade e fruto espiritual.",
  },
};

const objetivosAdultosLicao10 = [
  "Mostrar que o derramamento do Espírito Santo é promessa universal e atual.",
  "Explicar que o Espírito Santo concede poder para testemunhar de Cristo.",
  "Destacar que o Espírito distribui dons e fortalece a unidade da Igreja.",
];

const topicosAdultosLicao10 = [
  {
    titulo: "O derramamento do Espírito é promessa para a Igreja",
    conteudo: [
      "Joel 2 anuncia que o Espírito seria derramado de forma ampla, alcançando diferentes perfis e gerações.",
      "Atos 2 mostra que a promessa entrou na história da igreja com poder e continuidade.",
      "A experiência pentecostal pertence à vida e à missão da igreja de Cristo.",
    ],
  },
  {
    titulo: "O Espírito capacita para testemunhar",
    conteudo: [
      "O batismo no Espírito Santo está ligado à expansão do testemunho cristão e não a mera experiência privada.",
      "Atos mostra que o poder do Espírito fortalece coragem, ousadia e fidelidade à missão de Cristo.",
      "A capacitação espiritual não substitui a santidade; ela a acompanha e a impulsiona.",
    ],
  },
  {
    titulo: "Dons espirituais e unidade do corpo",
    conteudo: [
      "O Espírito distribui dons conforme sua vontade para edificação da igreja.",
      "Diversidade de dons não deve produzir competição, mas serviço mútuo e unidade no corpo.",
      "A igreja saudável acolhe os dons com ordem, discernimento e propósito cristocêntrico.",
    ],
  },
];

const subsidioAdultosLicao10: LicaoEBD["subsidioAdultos"] = {
  cabecalho: {
    numero: 10,
    titulo: "Espírito Santo — O Capacitador",
    data: "2026-03-08",
    trimestre: "A Santíssima Trindade — O Deus Único Revelado em Três Pessoas Eternas",
    comentarista: "Douglas Baptista",
    textoAureo:
      "Joel 2.28 aponta para o derramamento do Espírito como promessa abundante sobre o povo de Deus.",
    verdadePratica:
      "O derramamento do Espírito capacita a Igreja com poder para pregar o Evangelho.",
    leituraBiblicaEmClasse: [
      "Joel 2.28-29 — a promessa do derramamento do Espírito.",
      "Atos 2.1-4 — o cumprimento pentecostal da promessa.",
      "1 Coríntios 12.4-7 — dons espirituais para edificação do corpo.",
    ],
  },
  visaoGeral: {
    resumo:
      "A décima lição apresenta o Espírito Santo como aquele que capacita a igreja para testemunhar, servir e crescer em unidade. O derramamento prometido em Joel e experimentado em Atos continua sendo referência para a vida pentecostal, enquanto a distribuição dos dons chama a igreja ao serviço ordenado e cristocêntrico.",
    ideiaCentral:
      "O Espírito Santo capacita a igreja com poder, dons e direção para testemunhar de Cristo e edificar o corpo.",
    objetivos: objetivosAdultosLicao10,
    palavraChave: {
      termo: "Capacitação",
      definicao:
        "Ação do Espírito Santo que fortalece, envia e equipa a igreja para testemunho, serviço e edificação mútua.",
    },
  },
  desenvolvimento: [
    {
      id: "promessa-do-espirito",
      titulo: "O derramamento do Espírito é promessa para a Igreja",
      sinopse:
        "A promessa de Joel e o cumprimento em Atos mostram continuidade, alcance e atualidade da obra do Espírito.",
      explicacaoBiblica: [
        "Joel 2 amplia a expectativa do povo de Deus em relação ao Espírito derramado sobre diferentes grupos.",
        "Atos 2 mostra que a promessa não ficou no futuro; ela entrou no coração da missão da igreja.",
        "A atualidade da promessa sustenta a esperança e o fervor pentecostal.",
      ],
      aplicacaoPratica: [
        "A igreja deve manter viva a expectativa por atuação santa e poderosa do Espírito.",
        "A promessa do Espírito não autoriza superficialidade; ela chama à vida de consagração e missão.",
      ],
    },
    {
      id: "poder-para-testemunhar",
      titulo: "O Espírito capacita para testemunhar",
      sinopse:
        "A capacitação do Espírito tem direção missionária e fortalece a igreja para anunciar Cristo com ousadia.",
      explicacaoBiblica: [
        "Em Atos, a ação do Espírito fortalece a proclamação do Evangelho e impulsiona a expansão da igreja.",
        "O poder do Espírito não se reduz a experiência privada; ele se orienta para testemunho fiel.",
        "O mesmo Espírito que capacita também santifica e dirige a vida da igreja.",
      ],
      aplicacaoPratica: [
        "A classe precisa ligar experiência espiritual à missão, e não apenas à busca de sensações religiosas.",
        "A capacitação do Espírito fortalece coragem, oração e compromisso evangelístico.",
      ],
    },
    {
      id: "dons-e-unidade",
      titulo: "Dons espirituais e unidade do corpo",
      sinopse:
        "Os dons são concedidos para edificação e exigem serviço humilde, discernimento e amor cristão.",
      explicacaoBiblica: [
        "1 Coríntios 12 mostra diversidade de dons, mas um mesmo Espírito operando para o bem comum.",
        "A distribuição dos dons pertence à soberania do Espírito e não ao mérito humano.",
        "O propósito final dos dons não é autopromoção, mas edificação da igreja.",
      ],
      aplicacaoPratica: [
        "Leve a classe a perceber que dons espirituais precisam andar com amor, ordem e compromisso com a unidade do corpo.",
        "A igreja amadurece quando serve com humildade e reconhece a diversidade como graça do Espírito.",
      ],
    },
  ],
  apoioProfessor: {
    perguntaDeAbertura:
      "O que acontece quando a igreja deseja poder espiritual, mas perde de vista missão, santidade e edificação do corpo?",
    pontoSensivelDaAula:
      "A aula precisa unir identidade pentecostal e sobriedade bíblica, evitando tanto o esfriamento quanto o exibicionismo espiritual.",
    erroComumDeInterpretacao:
      "Separar dons da missão e da edificação da igreja transforma a obra do Espírito em experiência autocentrada.",
    perguntasParaDebate: [
      "O que Joel e Atos ensinam sobre a promessa do derramamento do Espírito?",
      "Por que a capacitação espiritual está ligada ao testemunho de Cristo?",
      "Como os dons fortalecem a unidade da igreja em vez de produzir competição?",
    ],
    sugestaoDeFechamento:
      "Conclua chamando a classe a buscar poder espiritual com santidade, missão e compromisso com a edificação da igreja.",
  },
  revisao: {
    perguntas: [
      "Como a promessa de Joel se relaciona com a experiência de Atos 2?",
      "Por que a capacitação do Espírito está ligada ao testemunho cristão?",
      "Qual é o propósito dos dons espirituais na igreja?",
    ],
    pontosChave: [
      "O derramamento do Espírito é promessa ampla e atual para a igreja.",
      "O Espírito concede poder para testemunhar de Cristo.",
      "Os dons espirituais existem para edificação e unidade do corpo.",
    ],
    fraseDeSintese:
      "O Espírito Santo capacita a igreja com poder, dons e direção para testemunhar de Cristo e edificar o corpo com ordem e amor.",
  },
};

const objetivosAdultosLicao11 = [
  "Mostrar como o Espírito Santo liberta o crente da escravidão do pecado e confirma sua filiação em Cristo.",
  "Explicar de que modo o Espírito guia o crente na vontade do Pai em uma vida de comunhão, mortificação da carne e obediência.",
  "Destacar que a herança eterna do cristão nasce de uma obra trinitária em que o Pai planeja, o Filho redime e o Espírito aplica.",
];

const topicosAdultosLicao11 = [
  {
    titulo: "O Espírito e as dádivas do Pai",
    conteudo: [
      "O Pai não nos deixou presos ao medo e à condenação, mas nos recebeu em Cristo e nos concedeu o Espírito de adoção.",
      "O Espírito testemunha ao coração regenerado que já não vivemos como escravos, e sim como filhos amados que podem chamar Deus de Pai.",
      "A adoção não é apenas um conceito jurídico; ela muda a identidade, o acesso a Deus e a forma de caminhar em santidade.",
    ],
  },
  {
    titulo: "O Espírito nos guia na vontade do Pai",
    conteudo: [
      "Ser guiado pelo Espírito significa caminhar sob a direção constante de Deus, e não segundo os impulsos da carne.",
      "A mortificação das obras do corpo não nasce de esforço autônomo, mas de uma vida de dependência, obediência e vigilância diante do Senhor.",
      "O mesmo Espírito que convence, consola e fortalece também nos conduz a uma resposta prática de fé, arrependimento e perseverança.",
    ],
  },
  {
    titulo: "A Trindade nos conduz à herança eterna",
    conteudo: [
      "A herança do crente não é improvisada: ela foi planejada pelo Pai, conquistada pelo Filho e confirmada pelo Espírito como penhor.",
      "Ser coerdeiro com Cristo inclui esperança futura, mas também maturidade presente para atravessar sofrimentos com fidelidade.",
      "A vida cristã é sustentada pela certeza de que o Deus que nos adotou também completará sua obra até a glorificação final.",
    ],
  },
];

const subsidioAdultosLicao11: LicaoEBD["subsidioAdultos"] = {
  cabecalho: {
    numero: 11,
    titulo: "O Pai e o Espírito Santo",
    data: "2026-03-15",
    trimestre: "A Santíssima Trindade — O Deus Único Revelado em Três Pessoas Eternas",
    comentarista: "Douglas Baptista",
    textoAureo:
      "Romanos 8.14 revela que os filhos de Deus são reconhecidos por uma vida guiada pelo Espírito.",
    verdadePratica:
      "O Espírito nos tira da lógica da escravidão, confirma a filiação em Cristo e nos conduz à herança preparada pelo Pai.",
    leituraBiblicaEmClasse: [
      "Romanos 8.12-17 — do abandono do temor à certeza de sermos filhos e herdeiros.",
      "Gálatas 4.1-6 — da servidão à adoção, com o Espírito clamando em nós: Aba, Pai.",
    ],
    leituraDiaria: [
      {
        dia: "Segunda",
        referencia: "Romanos 8.15",
        tema: "O Espírito substitui o medo servil pela liberdade da adoção.",
      },
      {
        dia: "Terça",
        referencia: "João 1.12",
        tema: "A filiação é recebida em Cristo, não fabricada pelo mérito humano.",
      },
      {
        dia: "Quarta",
        referencia: "Gálatas 4.6",
        tema: "O Pai envia o Espírito do Filho aos corações dos redimidos.",
      },
      {
        dia: "Quinta",
        referencia: "Efésios 1.13-14",
        tema: "O Espírito é a garantia presente da herança futura.",
      },
      {
        dia: "Sexta",
        referencia: "Romanos 8.17",
        tema: "A filiação inclui herança, glória e comunhão com Cristo.",
      },
      {
        dia: "Sábado",
        referencia: "1 Pedro 1.3-4",
        tema: "A esperança cristã aponta para uma herança incorruptível guardada por Deus.",
      },
    ],
  },
  visaoGeral: {
    resumo:
      "A lição mostra que a filiação cristã não é um sentimento vago, mas uma realidade produzida pela ação conjunta do Pai e do Espírito. O Pai planeja a adoção, o Filho garante a reconciliação e o Espírito confirma internamente essa nova condição, libertando o crente do medo e sustentando sua esperança.",
    ideiaCentral:
      "A vida no Espírito substitui a escravidão do pecado por comunhão filial, direção santa e esperança de herança eterna.",
    objetivos: objetivosAdultosLicao11,
    palavraChave: {
      termo: "Filiação",
      definicao:
        "Mais do que pertencer a uma instituição religiosa, filiação é viver como filho acolhido por Deus, guiado pelo Espírito e sustentado pela obra de Cristo.",
    },
  },
  desenvolvimento: [
    {
      id: "dadivas-do-pai",
      titulo: "O Espírito e as dádivas do Pai",
      sinopse:
        "A adoção cristã marca a passagem da escravidão para a intimidade com Deus e redefine a identidade do salvo.",
      explicacaoBiblica: [
        "Romanos 8 mostra que o Espírito recebido pelo crente não o devolve ao temor, mas o introduz na liberdade de quem pode clamar: Aba, Pai.",
        "Gálatas 4 apresenta a adoção como resultado do envio do Filho e do Espírito, mostrando que a filiação é fruto da graça e não da capacidade humana.",
        "João 1.12 reforça que a nova condição de filho nasce da fé em Cristo e se expressa em uma comunhão real com o Pai.",
      ],
      aprofundamentoDoutrinario: [
        "A adoção possui dimensão jurídica e afetiva: Deus declara o pecador reconciliado como filho e o recebe de fato em sua casa.",
        "O Espírito não apenas informa a doutrina da filiação; Ele produz no íntimo do crente a consciência de pertencimento e a coragem de viver como filho.",
      ],
      aplicacaoPratica: [
        "A sala de aula precisa ajudar o aluno a sair da lógica da culpa crônica para a segurança de quem foi recebido por Deus.",
        "Vale confrontar a mentalidade de performance espiritual que tenta trocar comunhão por esforço autossuficiente.",
      ],
      referenciasCruzadas: [
        { referencia: "Romanos 8.15-16", descricao: "O Espírito testemunha a filiação." },
        { referencia: "Gálatas 4.4-6", descricao: "A adoção brota do plano do Pai e da obra do Filho." },
        { referencia: "Efésios 2.18", descricao: "Acesso ao Pai por meio de Cristo no Espírito." },
      ],
    },
    {
      id: "guia-na-vontade-do-pai",
      titulo: "O Espírito nos guia na vontade do Pai",
      sinopse:
        "A filiação se torna visível quando o crente aprende a mortificar a carne e a caminhar em obediência.",
      explicacaoBiblica: [
        "Ser guiado pelo Espírito em Romanos 8.14 é uma realidade contínua: o crente é conduzido por Deus em sua forma de pensar, decidir e perseverar.",
        "A mortificação das obras do corpo em Romanos 8.13 exige resposta humana, mas só é possível porque o Espírito fortalece e orienta.",
        "Gálatas 4 conecta a adoção à plenitude dos tempos, lembrando que o Espírito age dentro do plano soberano do Pai.",
      ],
      aprofundamentoDoutrinario: [
        "A direção do Espírito não é misticismo solto, mas condução coerente com a vontade do Pai já revelada nas Escrituras.",
        "A luta contra a carne não é negação da graça; é consequência da nova identidade recebida em Cristo e sustentada pelo Espírito.",
      ],
      aplicacaoPratica: [
        "Leve a classe a identificar áreas em que ainda reage como escrava do medo, da culpa ou do impulso, em vez de responder como filhos guiados por Deus.",
        "Aponte a diferença entre sensibilidade espiritual e instabilidade emocional: o Espírito conduz com verdade, santidade e constância.",
      ],
      referenciasCruzadas: [
        { referencia: "Romanos 8.13-14", descricao: "Mortificação da carne e direção do Espírito." },
        { referencia: "João 16.13", descricao: "O Espírito guia em toda a verdade." },
        { referencia: "Filipenses 2.12-13", descricao: "Deus opera no querer e no efetuar." },
      ],
    },
    {
      id: "heranca-eterna",
      titulo: "A Trindade nos conduz à herança eterna",
      sinopse:
        "A certeza da herança futura sustenta a perseverança presente e impede uma visão estreita da salvação.",
      explicacaoBiblica: [
        "Romanos 8.17 liga filiação, herança e sofrimento, mostrando que o caminho dos filhos passa por maturidade antes da glorificação.",
        "Efésios 1.13-14 descreve o Espírito como penhor da herança, ou seja, a garantia presente de algo que será plenamente revelado.",
        "1 Pedro 1.3-4 amplia essa esperança ao apontar para uma herança incorruptível, preservada pelo próprio Deus.",
      ],
      aprofundamentoDoutrinario: [
        "Na economia da redenção, o Pai planeja, o Filho assegura o acesso e o Espírito confirma a posse futura com sua presença atual.",
        "A esperança cristã não é fuga do presente, mas força para enfrentar o sofrimento com fidelidade e perspectiva eterna.",
      ],
      aplicacaoPratica: [
        "Ajude a classe a perceber que a herança eterna muda o modo de lidar com dor, atraso, disciplina e sofrimento.",
        "A esperança bíblica produz perseverança santa, e não passividade diante da vida espiritual.",
      ],
      referenciasCruzadas: [
        { referencia: "Romanos 8.17-18", descricao: "Sofrimento presente e glória futura." },
        { referencia: "Efésios 1.13-14", descricao: "O Espírito como garantia da herança." },
        { referencia: "1 Pedro 1.3-4", descricao: "Herança incorruptível reservada nos céus." },
      ],
    },
  ],
  apoioProfessor: {
    perguntaDeAbertura:
      "O que mais marca a sua relação com Deus hoje: medo de falhar ou confiança de filho acolhido?",
    pontoSensivelDaAula:
      "Muitos alunos convivem com referências paternas feridas; por isso, a aula precisa apresentar a paternidade divina com cuidado pastoral, sem simplificações.",
    erroComumDeInterpretacao:
      "Reduzir a filiação a emoção momentânea ou tratar a herança apenas como conforto futuro enfraquece a força prática do texto.",
    perguntasParaDebate: [
      "Como distinguir entre convicção do Espírito e culpa paralisante?",
      "De que formas a escravidão espiritual ainda pode aparecer em quem já frequenta a igreja há anos?",
      "Como a esperança da herança futura ajuda o crente a enfrentar sofrimento e disciplina hoje?",
    ],
    sugestaoDeFechamento:
      "Encerre levando a classe a orar como filhos, confessando áreas de medo e reafirmando diante de Deus a confiança no Espírito que conduz à santidade e à esperança.",
  },
  aprofundamento: {
    contextoHistorico: [
      "A linguagem de adoção dialoga com o ambiente jurídico do mundo greco-romano, no qual um filho adotado recebia nome, pertencimento e direitos reais de herança.",
      "Paulo usa essa imagem para mostrar que a salvação não apenas perdoa; ela reintegra o crente à casa do Pai com nova identidade.",
    ],
    conceitoTeologico: [
      "A adoção não compete com justificação e regeneração; ela completa o quadro da redenção ao mostrar a nova posição relacional do salvo.",
      "A atuação do Espírito na filiação é ao mesmo tempo objetiva e subjetiva: Ele sela, habita, guia e confirma a certeza de pertencimento.",
    ],
    notaDeVocabulario: [
      {
        titulo: "Pneuma douleias",
        conteudo:
          "Expressa a lógica da escravidão espiritual marcada por medo, condenação e incapacidade de viver em liberdade diante de Deus.",
      },
      {
        titulo: "Pneuma huiothesias",
        conteudo:
          "Aponta para o Espírito que aplica a adoção e conduz o crente à intimidade filial com o Pai.",
      },
      {
        titulo: "Abba",
        conteudo:
          "Forma carinhosa de tratamento ao Pai, preservando reverência sem perder intimidade e confiança.",
      },
      {
        titulo: "Kleronomos",
        conteudo:
          "A ideia de herdeiro mostra que a filiação recebida em Cristo inclui direitos reais sobre a promessa futura de Deus.",
      },
    ],
    leituraComplementar: [
      {
        titulo: "Romanos 8.12-17",
        conteudo:
          "Leia o texto inteiro observando como Paulo liga mortificação da carne, filiação, testemunho interior e herança.",
      },
      {
        titulo: "Gálatas 4.4-7",
        conteudo:
          "Compare a passagem com Romanos 8 e perceba como o envio do Filho e do Espírito estrutura a doutrina da adoção.",
      },
      {
        titulo: "Efésios 1.13-14",
        conteudo:
          "Use este texto para mostrar que a herança futura já tem garantia presente na atuação do Espírito Santo.",
      },
    ],
  },
  vidaCrista: {
    oQueConfronta: [
      "A mentalidade de escravo espiritual que só se aproxima de Deus por medo ou desempenho.",
      "A falsa autonomia que tenta vencer a carne sem dependência do Espírito e sem comunhão com o Pai.",
    ],
    oQueConsola: [
      "O crente não precisa viver sem certeza: o Espírito confirma a filiação e sustenta o coração ferido.",
      "Mesmo em meio a sofrimentos, o Pai não perdeu o controle do futuro nem da herança reservada para seus filhos.",
    ],
    oQueExige: [
      "Andar como filho requer mortificar a carne, obedecer à Palavra e perseverar sob a direção do Espírito.",
      "A confiança na herança futura não dispensa fidelidade presente; ela a fortalece.",
    ],
    oQueRevelaSobreDeus: [
      "Deus não apenas absolve pecadores; Ele os acolhe em sua casa como filhos legítimos.",
      "O Pai é generoso em suas dádivas, o Filho assegura a reconciliação e o Espírito aplica com poder essa realidade ao coração do salvo.",
    ],
  },
  revisao: {
    perguntas: [
      "Como a adoção cristã corrige a mentalidade de medo e escravidão espiritual?",
      "O que significa ser guiado pelo Espírito na prática do cotidiano?",
      "Por que a herança futura fortalece a perseverança presente do crente?",
      "De que forma o texto mostra a cooperação entre Pai, Filho e Espírito na salvação?",
    ],
    pontosChave: [
      "O Espírito substitui a escravidão pelo testemunho da filiação.",
      "Ser guiado pelo Espírito envolve santidade, obediência e mortificação da carne.",
      "A herança eterna é certa porque o Espírito age como penhor da promessa.",
      "A doutrina da adoção é profundamente pastoral e transforma identidade, oração e esperança.",
    ],
    fraseDeSintese:
      "Quem vive no Espírito deixa a lógica do medo, aprende a chamar Deus de Pai e caminha para a herança eterna com esperança madura.",
  },
};

const objetivosAdultosLicao12 = [
  "Mostrar que a concepção de Jesus foi uma obra sobrenatural do Espírito Santo, preservando a plena divindade e a verdadeira humanidade do Filho.",
  "Explicar que o ministério terreno de Jesus revela plena dependência do Espírito, sem confundir as Pessoas da Trindade nem reduzir sua glória.",
  "Destacar que a missão redentora é trinitária: o Pai envia, o Filho obedece e o Espírito capacita e exalta a obra de Cristo.",
];

const topicosAdultosLicao12 = [
  {
    titulo: "O Espírito e a concepção do Filho",
    conteudo: [
      "A anunciação a Maria mostra que a encarnação não nasceu de iniciativa humana, mas de intervenção soberana do Espírito Santo.",
      "A concepção virginal preserva a santidade do Filho e revela que o Verbo assumiu nossa humanidade sem deixar de ser plenamente Deus.",
      "Desde o início da vida terrena de Jesus, a redenção aparece como obra conjunta do Pai, do Filho e do Espírito.",
    ],
  },
  {
    titulo: "O Filho viveu em dependência do Espírito",
    conteudo: [
      "Jesus não realizou seu ministério como um homem autônomo, mas como o Filho obediente que se move em perfeita comunhão com o Espírito.",
      "Batismo, tentação, milagres e proclamação do Reino mostram a atuação do Espírito em seu ministério messiânico.",
      "Essa dependência não diminui o Filho; ela revela a harmonia da Trindade na economia da salvação.",
    ],
  },
  {
    titulo: "A missão redentora revela a cooperação trinitária",
    conteudo: [
      "O Pai envia o Filho ao mundo, o Filho cumpre a vontade do Pai e o Espírito aplica com poder a obra da redenção.",
      "O Espírito não ocupa o lugar do Filho, mas o glorifica, tornando eficaz na Igreja aquilo que Cristo conquistou na cruz.",
      "O crente é chamado a responder a essa missão com fé, submissão e dependência do mesmo Espírito que esteve sobre Jesus.",
    ],
  },
];

const subsidioAdultosLicao12: LicaoEBD["subsidioAdultos"] = {
  cabecalho: {
    numero: 12,
    titulo: "O Filho e o Espírito",
    data: "2026-03-22",
    trimestre: "A Santíssima Trindade — O Deus Único Revelado em Três Pessoas Eternas",
    comentarista: "Douglas Baptista",
    textoAureo:
      "Lucas 1.35 mostra que a encarnação do Filho foi obra sobrenatural do Espírito, preservando a santidade daquele que viria ao mundo.",
    verdadePratica:
      "A redenção é uma obra trinitária: o Pai envia, o Filho obedece e o Espírito capacita e exalta a missão do Salvador.",
    leituraBiblicaEmClasse: [
      "Lucas 1.26-38 — a anunciação a Maria e a ação do Espírito na concepção de Jesus.",
    ],
    leituraDiaria: [
      {
        dia: "Segunda",
        referencia: "Lucas 1.35",
        tema: "A concepção de Jesus nasce da ação sobrenatural do Espírito Santo.",
      },
      {
        dia: "Terça",
        referencia: "João 1.14",
        tema: "O Verbo se fez carne sem deixar de ser plenamente Deus.",
      },
      {
        dia: "Quarta",
        referencia: "João 16.14",
        tema: "O Espírito glorifica o Filho e torna sua obra conhecida ao coração da Igreja.",
      },
      {
        dia: "Quinta",
        referencia: "Mateus 12.28",
        tema: "Os sinais do Reino revelam o Filho atuando no poder do Espírito.",
      },
      {
        dia: "Sexta",
        referencia: "Atos 10.38",
        tema: "Jesus foi ungido com o Espírito para fazer o bem e libertar os oprimidos.",
      },
      {
        dia: "Sábado",
        referencia: "Lucas 1.38",
        tema: "A resposta de fé de Maria ilustra submissão humilde ao plano redentor de Deus.",
      },
    ],
  },
  visaoGeral: {
    resumo:
      "A lição mostra que da concepção de Jesus ao seu ministério público a relação entre o Filho e o Espírito revela a harmonia da Trindade na salvação. O Espírito atua na encarnação, acompanha o ministério messiânico e glorifica Cristo, enquanto o Filho cumpre com perfeita obediência a vontade do Pai.",
    ideiaCentral:
      "O Filho não age isoladamente: sua encarnação, seu ministério e a aplicação da redenção revelam cooperação trinitária perfeita.",
    objetivos: objetivosAdultosLicao12,
    palavraChave: {
      termo: "Dependência",
      definicao:
        "No ministério de Cristo, dependência não indica inferioridade ontológica, mas a expressão histórica da obediência do Filho e da unidade da Trindade na redenção.",
    },
  },
  desenvolvimento: [
    {
      id: "concepcao-do-filho",
      titulo: "O Espírito e a concepção do Filho",
      sinopse:
        "A encarnação de Cristo começa com a ação soberana do Espírito e confirma que o nascimento de Jesus pertence ao centro do plano redentor.",
      explicacaoBiblica: [
        "Lucas 1.26-38 mostra que o nascimento de Jesus não é apenas extraordinário, mas redentivamente necessário: o Filho assume nossa humanidade por intervenção do Espírito.",
        "João 1.14 ensina que o Verbo se fez carne, revelando verdadeira humanidade sem perda da plena divindade.",
        "A santidade do Cristo concebido pelo Espírito aponta para o Salvador sem pecado, apto para representar seu povo diante de Deus.",
      ],
      aprofundamentoDoutrinario: [
        "A encarnação é trinitária: o Pai envia, o Filho assume a natureza humana e o Espírito realiza a concepção milagrosa.",
        "A união entre divindade e humanidade em Cristo não cria mistura confusa entre naturezas; ela preserva sua identidade plena como Deus e homem.",
      ],
      aplicacaoPratica: [
        "A classe precisa ver que a salvação não começa na iniciativa humana, mas na ação graciosa de Deus que entra em nossa história.",
        "A resposta humilde de Maria ensina que fé verdadeira acolhe a Palavra de Deus mesmo quando ela ultrapassa a lógica humana.",
      ],
      referenciasCruzadas: [
        { referencia: "Lucas 1.35", descricao: "O Espírito Santo virá sobre ti." },
        { referencia: "João 1.14", descricao: "O Verbo se fez carne e habitou entre nós." },
        { referencia: "Mateus 1.20-23", descricao: "O nascimento virginal cumpre o plano divino." },
      ],
    },
    {
      id: "ministerio-no-espirito",
      titulo: "O Filho e a sua relação com o Espírito",
      sinopse:
        "Jesus realizou seu ministério em plena comunhão com o Espírito, mostrando que a obra messiânica é exercida em obediência, poder e santidade.",
      explicacaoBiblica: [
        "No batismo de Jesus, o Espírito desce sobre o Filho e o Pai testemunha publicamente sua identidade messiânica.",
        "Lucas 4 apresenta Jesus cheio do Espírito tanto para resistir à tentação quanto para anunciar as boas-novas aos pobres.",
        "Atos 10.38 resume o ministério do Senhor como atuação ungida pelo Espírito, marcada por misericórdia, libertação e autoridade santa.",
      ],
      aprofundamentoDoutrinario: [
        "A dependência do Espírito em Jesus não significa limitação essencial do Filho, mas a expressão da sua missão encarnada em perfeita obediência ao Pai.",
        "O Espírito não substitui o Filho no centro da redenção; Ele confirma e torna visível o caráter messiânico da atuação de Cristo.",
      ],
      aplicacaoPratica: [
        "A igreja precisa rejeitar leituras que opõem Cristo e o Espírito, como se um diminuísse a glória do outro.",
        "Quem segue Jesus é chamado a servir com a mesma lógica: obediência, dependência do Espírito e centralidade no Reino de Deus.",
      ],
      referenciasCruzadas: [
        { referencia: "Lucas 3.21-22", descricao: "Batismo de Jesus e manifestação trinitária." },
        { referencia: "Lucas 4.1,18", descricao: "Jesus é guiado e ungido pelo Espírito." },
        { referencia: "Atos 10.38", descricao: "Resumo apostólico do ministério de Cristo." },
      ],
    },
    {
      id: "missao-redentora-trinitaria",
      titulo: "A Trindade e a missão redentora",
      sinopse:
        "A redenção não é uma ação isolada: Pai, Filho e Espírito atuam juntos para trazer salvação, iluminação e obediência ao povo de Deus.",
      explicacaoBiblica: [
        "João 3.16 e João 16 mostram que o Pai entrega o Filho e o Espírito torna eficaz no coração do crente aquilo que Cristo conquistou.",
        "O Espírito glorifica o Filho, conduzindo a Igreja a compreender a pessoa e a obra do Salvador com fidelidade.",
        "A resposta humana adequada diante dessa missão é fé obediente, e não curiosidade teórica sobre a Trindade.",
      ],
      aprofundamentoDoutrinario: [
        "Na economia da salvação, há distinção de operações sem separação de essência: o Pai envia, o Filho realiza a redenção e o Espírito aplica seus benefícios.",
        "A cristologia saudável impede qualquer noção de subordinação ontológica do Filho, ao mesmo tempo que reconhece sua obediência funcional na história da redenção.",
      ],
      aplicacaoPratica: [
        "O professor deve conduzir a classe a contemplar a Trindade com reverência, sem transformar a doutrina em abstração fria.",
        "A salvação recebida em Cristo pede vida de submissão ao Espírito, serviço humilde e adoração centrada em Deus.",
      ],
      referenciasCruzadas: [
        { referencia: "João 16.13-14", descricao: "O Espírito guia à verdade e glorifica o Filho." },
        { referencia: "Hebreus 9.14", descricao: "Cristo se oferece a Deus pelo Espírito eterno." },
        { referencia: "Filipenses 2.5-11", descricao: "A obediência do Filho culmina em sua exaltação." },
      ],
    },
  ],
  apoioProfessor: {
    perguntaDeAbertura:
      "Quando você pensa na vida de Jesus, percebe mais sua glória divina ou sua dependência obediente do Espírito? Como equilibrar as duas verdades?",
    pontoSensivelDaAula:
      "Alguns alunos podem confundir dependência com inferioridade. Vale mostrar com cuidado que o Filho não é menor que o Espírito, mas atua em perfeita comunhão com Ele na missão encarnada.",
    erroComumDeInterpretacao:
      "Tratar a relação entre Filho e Espírito como competição de protagonismo distorce a doutrina da Trindade e enfraquece a compreensão da redenção.",
    perguntasParaDebate: [
      "Por que a concepção virginal é importante para a fé cristã e não apenas um detalhe da narrativa?",
      "Como explicar a dependência do Espírito no ministério de Jesus sem sugerir inferioridade do Filho?",
      "De que modo a obra do Espírito hoje continua exaltando a pessoa e a obra de Cristo na Igreja?",
    ],
    sugestaoDeFechamento:
      "Conclua chamando a classe a adorar o Deus triúno pela redenção e a servir como discípulos de Cristo em humilde dependência do Espírito.",
  },
  aprofundamento: {
    contextoHistorico: [
      "A igreja primitiva precisou defender simultaneamente a plena divindade e a verdadeira humanidade de Cristo contra leituras que enfraqueciam um desses polos.",
      "A formulação trinitária amadureceu justamente para preservar a unidade divina sem dissolver a distinção entre Pai, Filho e Espírito.",
    ],
    conceitoTeologico: [
      "A encarnação revela que o Filho assume a natureza humana sem abdicar de sua divindade, inaugurando a obra redentora em perfeita harmonia com o Espírito.",
      "O ministério público de Cristo mostra a economia trinitária da salvação: há distinção nas operações, mas indivisibilidade na vontade e na glória de Deus.",
    ],
    notaDeVocabulario: [
      {
        titulo: "Logos",
        conteudo:
          "Em João 1, destaca o Filho eterno que se fez carne, revelando que a encarnação não começou a existência de Cristo, mas sua missão histórica entre nós.",
      },
      {
        titulo: "Hagios",
        conteudo:
          "A santidade ligada ao Espírito e ao Filho sublinha pureza absoluta, separação do pecado e adequação perfeita para a obra redentora.",
      },
      {
        titulo: "Doxasei",
        conteudo:
          "Em João 16.14, indica que o Espírito glorifica o Filho, tornando sua pessoa e obra conhecidas, honradas e eficazes na vida da Igreja.",
      },
      {
        titulo: "Apostello",
        conteudo:
          "A linguagem do envio ajuda a perceber a missão do Filho como iniciativa do Pai, cumprida em obediência e manifestada no poder do Espírito.",
      },
    ],
    leituraComplementar: [
      {
        titulo: "Lucas 1.26-38",
        conteudo:
          "Observe como a anunciação reúne promessa, milagre, submissão e linguagem trinitária em torno do nascimento de Jesus.",
      },
      {
        titulo: "Lucas 4.1-21",
        conteudo:
          "Leia o início do ministério público de Cristo percebendo o papel do Espírito na tentação, no anúncio e na missão messiânica.",
      },
      {
        titulo: "João 16.13-15",
        conteudo:
          "Use esse texto para mostrar que a ação do Espírito no presente permanece cristocêntrica e fiel à revelação do Filho.",
      },
    ],
  },
  vidaCrista: {
    oQueConfronta: [
      "A tendência de falar sobre o Espírito sem centralidade em Cristo ou de falar sobre Cristo sem dependência do Espírito.",
      "A autossuficiência ministerial que tenta servir a Deus sem oração, submissão e sensibilidade à direção do Espírito.",
    ],
    oQueConsola: [
      "A redenção não depende de improviso humano; ela nasce do conselho perfeito do Deus triúno.",
      "O mesmo Espírito que atuou na missão de Cristo hoje fortalece a Igreja a viver e testemunhar com fidelidade.",
    ],
    oQueExige: [
      "Seguir Jesus implica abandonar a lógica da força humana e aprender a depender do Espírito em santidade e serviço.",
      "A contemplação da Trindade deve produzir obediência concreta, e não mera curiosidade doutrinária.",
    ],
    oQueRevelaSobreDeus: [
      "Deus age com perfeita unidade na salvação: o Pai planeja, o Filho cumpre e o Espírito aplica com poder e santidade.",
      "O Deus revelado em Cristo não é distante; Ele entra na história e conduz pessoalmente seu povo à redenção.",
    ],
  },
  revisao: {
    perguntas: [
      "Por que a concepção de Jesus pelo Espírito Santo é central para a doutrina da encarnação?",
      "O que a dependência de Jesus em relação ao Espírito revela sobre sua missão messiânica?",
      "Como a ação do Espírito continua exaltando Cristo na vida da Igreja?",
      "De que forma a obra redentora mostra a cooperação entre Pai, Filho e Espírito?",
    ],
    pontosChave: [
      "A concepção virginal revela a ação soberana do Espírito na encarnação do Filho.",
      "O ministério de Jesus acontece em plena comunhão com o Espírito, sem diminuir sua divindade.",
      "O Espírito glorifica o Filho e aplica à Igreja a redenção conquistada por Cristo.",
      "A doutrina da Trindade deve levar a adoração, confiança e dependência obediente.",
    ],
    fraseDeSintese:
      "A relação entre o Filho e o Espírito revela que a redenção é obra do Deus triúno e chama a Igreja a viver em adoração, submissão e missão.",
  },
};

const objetivosAdultosLicao13 = [
  "Mostrar que a redenção da Igreja nasce da atuação conjunta do Pai, do Filho e do Espírito no plano eterno da salvação.",
  "Explicar que a comunhão cristã só é possível porque a Igreja participa, pela graça, da vida do Deus triúno.",
  "Destacar que a missão da Igreja é fruto do envio trinitário e depende da presença capacitadora do Espírito Santo.",
];

const topicosAdultosLicao13 = [
  {
    titulo: "A Trindade atua no plano redentor da Igreja",
    conteudo: [
      "A eleição do Pai, a redenção do Filho e a santificação do Espírito mostram que a Igreja não nasce do acaso, mas do propósito eterno de Deus.",
      "A salvação da comunidade cristã é inseparável da cruz de Cristo e da obra santificadora do Espírito.",
      "O povo de Deus vive seguro porque sua origem está no conselho santo da Trindade, e não na força humana.",
    ],
  },
  {
    titulo: "A Igreja vive em comunhão com o Deus Triúno",
    conteudo: [
      "A comunhão da Igreja vai além de convivência social; ela nasce da graça do Senhor Jesus, do amor do Pai e da comunhão do Espírito Santo.",
      "A vida cristã saudável reflete essa realidade em unidade, cuidado mútuo, santidade e serviço.",
      "Quando a Igreja perde a comunhão com o Deus triúno, também enfraquece sua comunhão entre irmãos.",
    ],
  },
  {
    titulo: "A Igreja é enviada pela Trindade",
    conteudo: [
      "O Pai envia, o Filho comissiona e o Espírito capacita a Igreja para testemunhar o Evangelho até os confins da terra.",
      "Missão não é projeto periférico, mas expressão da própria vida do Deus que salva e reúne um povo para si.",
      "A fidelidade missionária da Igreja depende de comunhão com Deus, não apenas de estratégia humana.",
    ],
  },
];

const subsidioAdultosLicao13: LicaoEBD["subsidioAdultos"] = {
  cabecalho: {
    numero: 13,
    titulo: "A Trindade Santa e a Igreja de Cristo",
    data: "2026-03-29",
    trimestre: "A Santíssima Trindade — O Deus Único Revelado em Três Pessoas Eternas",
    comentarista: "Douglas Baptista",
    textoAureo:
      "Mateus 28.19 mostra que a Igreja nasce e vive debaixo da revelação do Pai, do Filho e do Espírito Santo.",
    verdadePratica:
      "A redenção da Igreja é uma obra conjunta da Trindade: o Pai elege, o Filho redime e o Espírito santifica e sustenta a missão do povo de Deus.",
    leituraBiblicaEmClasse: [
      "2 Coríntios 13.11-13 — a bênção apostólica revela a comunhão da Igreja com o Deus triúno.",
      "1 Pedro 1.2-3 — eleição, santificação e redenção estruturam a identidade do povo de Deus.",
    ],
    leituraDiaria: [
      {
        dia: "Segunda",
        referencia: "1 Pedro 1.2",
        tema: "A Igreja é conhecida a partir da eleição do Pai, da santificação do Espírito e da obediência a Jesus Cristo.",
      },
      {
        dia: "Terça",
        referencia: "Efésios 1.4",
        tema: "O Pai escolheu um povo em Cristo antes da fundação do mundo.",
      },
      {
        dia: "Quarta",
        referencia: "1 João 1.7",
        tema: "A comunhão cristã permanece viva sob o sangue purificador de Jesus.",
      },
      {
        dia: "Quinta",
        referencia: "2 Tessalonicenses 2.13",
        tema: "O Espírito santifica o povo que Deus separou para si.",
      },
      {
        dia: "Sexta",
        referencia: "João 15.4",
        tema: "A permanência em Cristo sustenta a frutificação e a vida comunitária.",
      },
      {
        dia: "Sábado",
        referencia: "2 Coríntios 13.13",
        tema: "Graça, amor e comunhão trinitária moldam a vida da Igreja.",
      },
    ],
  },
  visaoGeral: {
    resumo:
      "A lição conclui o trimestre mostrando que a Igreja de Cristo existe, persevera e cumpre sua missão por causa da atuação do Pai, do Filho e do Espírito Santo. A Trindade aparece no plano redentor, na comunhão do corpo e no envio missionário do povo de Deus.",
    ideiaCentral:
      "A Igreja não é apenas uma instituição religiosa; ela é o povo reunido, redimido, santificado e enviado pelo Deus triúno.",
    objetivos: objetivosAdultosLicao13,
    palavraChave: {
      termo: "Trindade",
      definicao:
        "A doutrina da Trindade não é apêndice abstrato da fé cristã; ela explica a origem, a comunhão e a missão da Igreja de Cristo.",
    },
  },
  desenvolvimento: [
    {
      id: "plano-redentor-da-igreja",
      titulo: "A Trindade e o plano redentor",
      sinopse:
        "A identidade da Igreja é moldada pela ação conjunta do Pai, do Filho e do Espírito desde o princípio do plano de salvação.",
      explicacaoBiblica: [
        "1 Pedro 1.2 apresenta a eleição segundo a presciência do Pai, a santificação do Espírito e a obediência com aspersão do sangue de Jesus Cristo.",
        "Efésios 1 reforça que a salvação do povo de Deus foi pensada no Pai, realizada em Cristo e aplicada pelo Espírito.",
        "A Igreja não surge como acidente histórico; ela é fruto do propósito santo e amoroso de Deus.",
      ],
      aprofundamentoDoutrinario: [
        "A eleição não anula a obra do Filho nem substitui a santificação do Espírito; ela revela a unidade do plano redentor na Trindade.",
        "A redenção da Igreja precisa ser lida de forma cristocêntrica e pneumatológica, sem reduzir a salvação a uma única operação isolada.",
      ],
      aplicacaoPratica: [
        "A classe deve perceber que pertencer à Igreja é resposta a uma graça eterna, não a mera tradição religiosa.",
        "O senso de pertencimento ao povo de Deus cresce quando enxergamos a Igreja como fruto do plano santo da Trindade.",
      ],
      referenciasCruzadas: [
        { referencia: "1 Pedro 1.2-3", descricao: "A identidade da Igreja nasce da ação trinitária." },
        { referencia: "Efésios 1.3-14", descricao: "Panorama do plano redentor em Pai, Filho e Espírito." },
        { referencia: "João 17.6-11", descricao: "Cristo intercede pelo povo que o Pai lhe deu." },
      ],
    },
    {
      id: "comunhao-com-a-trindade",
      titulo: "A Igreja e a comunhão com a Trindade",
      sinopse:
        "A comunhão cristã é sustentada pela graça do Filho, pelo amor do Pai e pela comunhão do Espírito Santo.",
      explicacaoBiblica: [
        "2 Coríntios 13.13 mostra que a bênção apostólica é mais do que fórmula litúrgica: ela descreve a atmosfera espiritual em que a Igreja vive.",
        "A permanência em Cristo, ensinada em João 15, é condição para frutificação, unidade e perseverança do corpo.",
        "A comunhão horizontal entre irmãos depende da comunhão vertical com o Deus triúno.",
      ],
      aprofundamentoDoutrinario: [
        "A Igreja reflete a comunhão divina sem reproduzi-la em igualdade de essência; ela participa por graça da vida que vem de Deus.",
        "Sem comunhão com o Pai, com o Filho e com o Espírito, a vida eclesial se reduz a organização vazia e ativismo sem poder.",
      ],
      aplicacaoPratica: [
        "Conflitos, isolamento e indiferença dentro da igreja devem ser tratados à luz da comunhão trinitária que sustenta o corpo de Cristo.",
        "A maturidade espiritual aparece quando a graça recebida em Cristo se transforma em perdão, serviço e cuidado mútuo.",
      ],
      referenciasCruzadas: [
        { referencia: "2 Coríntios 13.13", descricao: "Graça, amor e comunhão como fundamento da vida da Igreja." },
        { referencia: "João 15.4-5", descricao: "Sem permanecer em Cristo a Igreja não frutifica." },
        { referencia: "Efésios 4.3-6", descricao: "Unidade do Espírito em um só corpo e um só Deus." },
      ],
    },
    {
      id: "igreja-enviada-pela-trindade",
      titulo: "A Igreja é enviada pela Trindade",
      sinopse:
        "A missão da Igreja nasce do coração de Deus e só pode ser cumprida por um povo que vive em dependência do Espírito.",
      explicacaoBiblica: [
        "Mateus 28.19-20 apresenta a missão da Igreja como envio em nome do Pai, do Filho e do Espírito Santo.",
        "Atos 1.8 revela que o testemunho cristão depende da descida do Espírito e não apenas de boa vontade ou planejamento humano.",
        "A missão da Igreja prolonga no mundo o plano redentor do Deus que salva, santifica e reúne um povo para si.",
      ],
      aprofundamentoDoutrinario: [
        "O envio missionário da Igreja possui fundamento trinitário: o Pai deseja alcançar povos, o Filho comissiona discípulos e o Espírito os reveste de poder.",
        "A eclesiologia saudável precisa ser missionária; uma Igreja sem envio perde conexão com a própria lógica da redenção.",
      ],
      aplicacaoPratica: [
        "A igreja local deve avaliar se sua agenda reflete comunhão com o Deus missionário ou apenas manutenção interna.",
        "Cada crente é chamado a participar da missão com oração, testemunho, serviço e compromisso com o Reino.",
      ],
      referenciasCruzadas: [
        { referencia: "Mateus 28.19-20", descricao: "A Grande Comissão é explicitamente trinitária." },
        { referencia: "Atos 1.8", descricao: "O Espírito capacita a testemunhar até os confins da terra." },
        { referencia: "João 20.21-22", descricao: "Jesus envia a Igreja e sopra sobre ela o Espírito." },
      ],
    },
  ],
  apoioProfessor: {
    perguntaDeAbertura:
      "Quando falamos sobre a Igreja, pensamos primeiro em estrutura, em pessoas ou no Deus que a reuniu e a enviou?",
    pontoSensivelDaAula:
      "Alguns alunos podem ter visão cansada ou ferida da vida comunitária. Mostre que a Igreja de Cristo não se define por falhas humanas, mas pela ação redentora e sustentadora da Trindade.",
    erroComumDeInterpretacao:
      "Reduzir a Igreja a organização humana ou tratar missão e comunhão como temas secundários esvazia a força trinitária da eclesiologia bíblica.",
    perguntasParaDebate: [
      "Como a doutrina da Trindade corrige uma visão utilitária ou apenas institucional da Igreja?",
      "De que maneiras a comunhão do Deus triúno deve aparecer na vida prática da igreja local?",
      "O que muda na missão da Igreja quando lembramos que ela é enviada pelo Pai, comissionada pelo Filho e capacitada pelo Espírito?",
    ],
    sugestaoDeFechamento:
      "Encerre conduzindo a classe a agradecer pela Igreja de Cristo, a renovar o compromisso com a comunhão e a se dispor novamente para a missão.",
  },
  aprofundamento: {
    contextoHistorico: [
      "Desde cedo a Igreja precisou afirmar que sua identidade não nasce do poder político ou cultural, mas da ação salvadora de Deus em Cristo pelo Espírito.",
      "A bênção apostólica e a linguagem trinitária do Novo Testamento serviram como base para uma compreensão eclesial profundamente cristocêntrica e comunitária.",
    ],
    conceitoTeologico: [
      "A eclesiologia bíblica é inseparável da teologia trinitária: eleição, redenção, santificação e missão pertencem à mesma obra divina.",
      "A comunhão da Igreja é dom antes de ser tarefa; ela é recebida da Trindade e, por isso, precisa ser preservada com humildade e santidade.",
    ],
    notaDeVocabulario: [
      {
        titulo: "Ekloge",
        conteudo:
          "A noção de eleição destaca a iniciativa graciosa do Pai em separar para si um povo que viverá para sua glória.",
      },
      {
        titulo: "Proginosko",
        conteudo:
          "A presciência divina em 1 Pedro aponta para o conhecimento amoroso e soberano de Deus dentro do seu plano redentor.",
      },
      {
        titulo: "Hagiasmos",
        conteudo:
          "A santificação pelo Espírito descreve a separação progressiva e santa do povo de Deus para viver em obediência.",
      },
      {
        titulo: "Koinonia",
        conteudo:
          "A comunhão cristã é participação real em uma vida compartilhada diante de Deus e entre os irmãos, sustentada pelo Espírito Santo.",
      },
    ],
    leituraComplementar: [
      {
        titulo: "1 Pedro 1.1-5",
        conteudo:
          "Observe como a esperança, a eleição e a santificação aparecem unidas na identidade do povo de Deus.",
      },
      {
        titulo: "2 Coríntios 13.11-13",
        conteudo:
          "Use a bênção final de Paulo para mostrar que a comunhão trinitária possui implicações pastorais concretas para a igreja local.",
      },
      {
        titulo: "Mateus 28.18-20",
        conteudo:
          "Leia a Grande Comissão destacando sua base cristológica, sua forma trinitária e sua direção missionária.",
      },
    ],
  },
  vidaCrista: {
    oQueConfronta: [
      "A visão de igreja como espaço de consumo religioso, sem compromisso real com comunhão, santidade e missão.",
      "O isolamento espiritual que tenta viver a fé sem corpo, sem vínculo e sem responsabilidade comunitária.",
    ],
    oQueConsola: [
      "A Igreja não se sustenta apenas por competência humana; ela é guardada pela graça do Deus triúno.",
      "Mesmo em tempos difíceis, o povo de Deus continua inserido em um plano eterno de amor, redenção e santificação.",
    ],
    oQueExige: [
      "Viver em igreja requer compromisso com unidade, reconciliação, serviço e fidelidade à missão de Cristo.",
      "A comunhão trinitária recebida por graça precisa aparecer em atitudes concretas dentro da congregação local.",
    ],
    oQueRevelaSobreDeus: [
      "Deus não salva indivíduos soltos apenas para o céu; Ele reúne um povo santo para viver em comunhão e testemunho no mundo.",
      "O Pai, o Filho e o Espírito Santo estão presentes tanto na origem quanto na permanência e no envio da Igreja de Cristo.",
    ],
  },
  revisao: {
    perguntas: [
      "Como 1 Pedro 1.2 resume a participação da Trindade no plano redentor da Igreja?",
      "O que a bênção apostólica de 2 Coríntios 13.13 ensina sobre comunhão cristã?",
      "Por que a missão da Igreja precisa ser entendida em chave trinitária?",
      "Quais perigos aparecem quando a Igreja perde a centralidade da comunhão com o Deus triúno?",
    ],
    pontosChave: [
      "A Igreja nasce do plano do Pai, da redenção do Filho e da santificação do Espírito.",
      "Comunhão cristã verdadeira flui da graça de Cristo, do amor do Pai e da comunhão do Espírito.",
      "A missão da Igreja não é acessória; ela nasce do envio trinitário e depende do poder do Espírito.",
      "A doutrina da Trindade fortalece identidade, vida comunitária e fidelidade missionária.",
    ],
    fraseDeSintese:
      "A Igreja de Cristo vive da graça do Deus triúno: é escolhida pelo Pai, redimida pelo Filho, santificada pelo Espírito e enviada ao mundo com poder.",
  },
};

function criarLicao(seed: LicaoSeed): LicaoEBD {
  return {
    id: `adultos-2026-1t-licao-${seed.numero}`,
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
      `Compreender como ${seed.enfase.toLowerCase()} fortalece a caminhada cristã.`,
      "Relacionar o ensino bíblico da lição com a vida da igreja, da família e do serviço ao próximo.",
      "Transformar a aprendizagem da semana em prática de oração, comunhão e fidelidade.",
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

function criarLicaoEditorialAdultos(
  seed: LicaoSeed,
  editorial: AdultosEditorialConfig
): LicaoEBD {
  return {
    ...criarLicao(seed),
    imagem: editorial.imagem,
    objetivos: editorial.objetivos,
    topicos: editorial.topicos,
    apoioProfessor: editorial.apoioProfessor,
    apoioAluno: editorial.apoioAluno,
    esboco: editorial.esboco,
    subsidioAdultos: editorial.subsidioAdultos,
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
    id: `adultos-${edicao}-licao-${numero}`,
    slug: `licao-${numero}`,
    numero,
    data,
    statusEditorial: "draft",
    titulo: `Lição ${numero}`,
    resumo:
      "Conteúdo em preparação para a classe de Adultos. Esta lição será publicada no site com texto original e apoio ao professor.",
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
    id: `adultos-${slug}`,
    slug,
    ano: 2026,
    trimestre,
    statusEditorial: "draft",
    rotulo: `${trimestre}º Trimestre de 2026`,
    titulo: `${trimestre}º Trimestre de 2026`,
    subtitulo: "Conteúdo em preparação",
    descricao:
      "Esta edição da classe de Adultos já está aberta no site e receberá as lições progressivamente conforme a curadoria e a revisão editorial forem concluídas.",
    classe: "adultos",
    imagem,
    licoes: Array.from({ length: 13 }, (_, index) =>
      criarLicaoPlaceholder(slug, index + 1, adicionarSemanas(dataInicial, index))
    ),
  };
}

const editoriaisAdultosPrimeiroTrimestre: Partial<Record<number, AdultosEditorialConfig>> = {
  1: {
    imagem: "/images/EBD/licao-01-adulto.jpg",
    objetivos: objetivosAdultosLicao1,
    topicos: topicosAdultosLicao1,
    apoioProfessor: [
      "Apresente a doutrina da Trindade como revelação bíblica e não como curiosidade teológica distante da vida da igreja.",
      "Ajude a classe a distinguir reverência diante do mistério de Deus de confusão doutrinária causada por comparações simplistas.",
    ],
    apoioAluno: [
      "Leia Mateus 3.13-17 durante a semana e anote o que esse texto ensina sobre a unidade e a distinção do Pai, do Filho e do Espírito Santo.",
      "Transforme sua oração da semana em um exercício consciente de adoração ao Deus triúno revelado nas Escrituras.",
    ],
    esboco: [
      {
        titulo: "Entrada",
        conteudo:
          "Comece a aula pelo batismo de Jesus e peça à classe que identifique no texto a presença simultânea do Pai, do Filho e do Espírito Santo.",
      },
      {
        titulo: "Desenvolvimento",
        conteudo:
          "Explique a doutrina da Trindade em três movimentos: revelação no batismo, unidade com distinção das Pessoas e relevância para salvação, adoração e missão.",
      },
      {
        titulo: "Fechamento",
        conteudo:
          "Conclua destacando que a Trindade não é detalhe periférico, mas a forma como Deus se deu a conhecer ao seu povo.",
      },
    ],
    subsidioAdultos: subsidioAdultosLicao1,
  },
  2: {
    imagem: "/images/EBD/licao-02-adulto.jpg",
    objetivos: objetivosAdultosLicao2,
    topicos: topicosAdultosLicao2,
    apoioProfessor: [
      "Conduza a aula de modo pastoral, lembrando que a imagem paterna de alguns alunos pode estar ferida e precisa ser corrigida pelas Escrituras.",
      "Mostre com clareza que conhecer o Pai biblicamente depende da revelação do Filho e não de projeções emocionais ou tradições vagas.",
    ],
    apoioAluno: [
      "Leia Mateus 11.25-27 e João 14.6-11 durante a semana e observe como Cristo revela o Pai ao coração do crente.",
      "Separe um momento para agradecer em oração pelos atributos do Pai que mais sustentam sua fé nesta fase da vida.",
    ],
    esboco: [
      {
        titulo: "Entrada",
        conteudo:
          "Abra perguntando quais imagens distorcidas sobre Deus Pai aparecem com mais frequência hoje e conduza a resposta para a revelação bíblica.",
      },
      {
        titulo: "Desenvolvimento",
        conteudo:
          "Organize a aula em três eixos: identidade do Pai nas Escrituras, revelação do Pai no Filho e nomes e atributos que sustentam a fé da igreja.",
      },
      {
        titulo: "Fechamento",
        conteudo:
          "Encerre destacando que conhecer o Pai em Cristo fortalece a adoração, a oração e a confiança em meio às lutas.",
      },
    ],
    subsidioAdultos: subsidioAdultosLicao2,
  },
  3: {
    imagem: "/images/EBD/licao-03-adulto.jpg",
    objetivos: objetivosAdultosLicao3,
    topicos: topicosAdultosLicao3,
    apoioProfessor: [
      "Ressalte que a salvação nasce do amor do Pai e não do mérito humano, combatendo leituras moralistas do Evangelho.",
      "Ajude a classe a perceber a cooperação entre Pai, Filho e Espírito sem transformar a redenção em etapas isoladas ou concorrentes.",
    ],
    apoioAluno: [
      "Leia João 3.16-17, 1 João 4.9-10 e Gálatas 4.4-6 durante a semana e anote como esses textos mostram o amor do Pai na missão do Filho.",
      "Agradeça a Deus em oração pela salvação que nasce de sua iniciativa amorosa e peça que essa verdade fortaleça sua confiança.",
    ],
    esboco: [
      {
        titulo: "Entrada",
        conteudo:
          "Comece a aula perguntando por que o envio do Filho é a maior demonstração do amor do Pai e deixe a classe responder à luz das Escrituras.",
      },
      {
        titulo: "Desenvolvimento",
        conteudo:
          "Percorra a lição em três movimentos: o amor do Pai no envio do Filho, a plenitude dos tempos e a atuação trinitária na aplicação da salvação.",
      },
      {
        titulo: "Fechamento",
        conteudo:
          "Finalize levando a turma a descansar na iniciativa amorosa do Pai e a reconhecer a unidade do Deus triúno na redenção.",
      },
    ],
    subsidioAdultos: subsidioAdultosLicao3,
  },
  4: {
    imagem: "/images/EBD/licao-04-adulto.jpg",
    objetivos: objetivosAdultosLicao4,
    topicos: topicosAdultosLicao4,
    apoioProfessor: [
      "Trabalhe a paternidade divina com sensibilidade pastoral, reconhecendo que a experiência humana de paternidade pode estar ferida em muitos corações.",
      "Mostre que a filiação bíblica se firma na confissão do Filho e no amor que o Pai aperfeiçoa em nós.",
    ],
    apoioAluno: [
      "Leia 1 João 4.13-16 durante a semana e anote como o amor do Pai fortalece sua confiança e sua comunhão com a igreja.",
      "Ore pedindo que Deus cure imagens distorcidas de paternidade e firme seu coração no amor revelado em Cristo.",
    ],
    esboco: [
      {
        titulo: "Entrada",
        conteudo:
          "Abra a aula perguntando o que a expressão paternidade divina comunica sobre cuidado, segurança e identidade cristã.",
      },
      {
        titulo: "Desenvolvimento",
        conteudo:
          "Organize a lição em três passos: a paternidade eterna de Deus, a filiação evidenciada na confissão do Filho e o amor do Pai aperfeiçoando a vida cristã.",
      },
      {
        titulo: "Fechamento",
        conteudo:
          "Encerre reforçando que a paternidade divina acolhe, disciplina, amadurece e forma uma igreja marcada pelo amor.",
      },
    ],
    subsidioAdultos: subsidioAdultosLicao4,
  },
  5: {
    imagem: "/images/EBD/licao-05-adulto.jpg",
    objetivos: objetivosAdultosLicao5,
    topicos: topicosAdultosLicao5,
    apoioProfessor: [
      "Afirme com clareza a deidade absoluta de Jesus, evitando tratá-lo apenas como mestre moral ou personagem central da história bíblica.",
      "Mostre que a exclusividade de Cristo como mediador não é dureza religiosa, mas fidelidade à própria revelação do Evangelho.",
    ],
    apoioAluno: [
      "Leia Lucas 1.31-35 e Mateus 17.1-8 durante a semana e observe como esses textos revelam a glória e a identidade do Filho.",
      "Renove sua confiança em Cristo como único Senhor e Salvador, rejeitando substitutos religiosos ou mediadores concorrentes.",
    ],
    esboco: [
      {
        titulo: "Entrada",
        conteudo:
          "Comece a aula perguntando por que a igreja precisa insistir em 2026 que Jesus é mais do que exemplo moral: Ele é o Deus Filho.",
      },
      {
        titulo: "Desenvolvimento",
        conteudo:
          "Percorra a lição em três eixos: concepção virginal, transfiguração e exclusividade de Cristo como mediador e salvador.",
      },
      {
        titulo: "Fechamento",
        conteudo:
          "Conclua chamando a classe a ouvir o Filho amado com fé, reverência e submissão prática.",
      },
    ],
    subsidioAdultos: subsidioAdultosLicao5,
  },
  6: {
    imagem: "/images/EBD/licao-06-adulto.jpg",
    objetivos: objetivosAdultosLicao6,
    topicos: topicosAdultosLicao6,
    apoioProfessor: [
      "Mostre que João 1 não é apenas abertura poética do Evangelho, mas uma declaração doutrinária profunda sobre a identidade do Filho.",
      "Ajude a classe a perceber a força pastoral da encarnação: o Verbo eterno realmente veio ao nosso encontro em Cristo.",
    ],
    apoioAluno: [
      "Leia João 1.1-5,14 durante a semana e anote o que o texto ensina sobre a eternidade, a criação e a encarnação do Verbo.",
      "Adore conscientemente a Cristo como Senhor da criação e revelação plena do Pai, deixando essa verdade fortalecer sua fé.",
    ],
    esboco: [
      {
        titulo: "Entrada",
        conteudo:
          "Abra a aula perguntando o que muda na vida cristã quando entendemos que Jesus não começou em Belém, mas é o Verbo eterno de Deus.",
      },
      {
        titulo: "Desenvolvimento",
        conteudo:
          "Trabalhe o prólogo de João em três movimentos: o Verbo eterno, o Verbo criador e o Verbo encarnado que revela o Pai.",
      },
      {
        titulo: "Fechamento",
        conteudo:
          "Encerre chamando a classe a contemplar Cristo com reverência como Deus verdadeiro, Senhor da criação e Salvador revelado na encarnação.",
      },
    ],
    subsidioAdultos: subsidioAdultosLicao6,
  },
  7: {
    imagem: "/images/EBD/licao-07-adulto.jpg",
    objetivos: objetivosAdultosLicao7,
    topicos: topicosAdultosLicao7,
    apoioProfessor: [
      "Leve a classe a contemplar a obra do Filho como suficiente, evitando qualquer linguagem que reintroduza mérito humano na salvação.",
      "Conecte cruz e exaltação para mostrar que a soberania de Cristo sustenta a missão e a esperança da igreja.",
    ],
    apoioAluno: [
      "Leia Filipenses 2.5-11 e Hebreus 9.24-28 durante a semana e observe como a humilhação, a cruz e a exaltação de Cristo formam uma única obra redentora.",
      "Agradeça em oração pela suficiência da obra de Cristo e renove sua confiança em seu senhorio.",
    ],
    esboco: [
      {
        titulo: "Entrada",
        conteudo:
          "Comece perguntando por que a obra de Cristo precisa ser ensinada não só como fato passado, mas como fundamento presente da fé cristã.",
      },
      {
        titulo: "Desenvolvimento",
        conteudo:
          "Trabalhe a lição em três movimentos: a humilhação voluntária do Filho, a suficiência do seu sacrifício e sua exaltação gloriosa.",
      },
      {
        titulo: "Fechamento",
        conteudo:
          "Encerre levando a classe a descansar na obra consumada de Cristo e a adorá-lo como Senhor exaltado.",
      },
    ],
    subsidioAdultos: subsidioAdultosLicao7,
  },
  8: {
    imagem: "/images/EBD/licao-08-adulto.jpg",
    objetivos: objetivosAdultosLicao8,
    topicos: topicosAdultosLicao8,
    apoioProfessor: [
      "Ajude a classe a falar do Espírito Santo com fervor pentecostal e precisão bíblica, sem reduzi-lo a força impessoal.",
      "Mostre que a obra do Espírito sempre fortalece a centralidade de Cristo e a santidade da igreja.",
    ],
    apoioAluno: [
      "Leia João 14.25-31 durante a semana e anote o que o texto ensina sobre a pessoa e a atuação do Espírito Santo.",
      "Ore pedindo que sua relação com o Espírito seja marcada por reverência, dependência e sensibilidade à Palavra.",
    ],
    esboco: [
      {
        titulo: "Entrada",
        conteudo:
          "Abra a aula perguntando que erros mais aparecem quando as pessoas falam do Espírito Santo sem base bíblica sólida.",
      },
      {
        titulo: "Desenvolvimento",
        conteudo:
          "Organize o ensino em três eixos: a pessoalidade do Espírito, sua plena divindade e suas obras na redenção e na vida da igreja.",
      },
      {
        titulo: "Fechamento",
        conteudo:
          "Conclua convidando a classe a honrar o Espírito Santo com reverência e dependência prática em sua caminhada cristã.",
      },
    ],
    subsidioAdultos: subsidioAdultosLicao8,
  },
  9: {
    imagem: "/images/EBD/licao-09-adulto.jpg",
    objetivos: objetivosAdultosLicao9,
    topicos: topicosAdultosLicao9,
    apoioProfessor: [
      "Apresente a regeneração como milagre espiritual real, evitando reduzi-la a decisão intelectual ou emoção momentânea.",
      "Conduza a classe a discernir os sinais práticos do novo nascimento sem cair em moralismo ou superficialidade.",
    ],
    apoioAluno: [
      "Leia João 3.1-8 durante a semana e pergunte diante de Deus quais evidências de nova vida o Espírito tem produzido em você.",
      "Ore pedindo que a graça do novo nascimento continue gerando fruto, santidade e sensibilidade espiritual em sua vida.",
    ],
    esboco: [
      {
        titulo: "Entrada",
        conteudo:
          "Comece perguntando o que diferencia uma mudança apenas emocional de um novo nascimento verdadeiro operado por Deus.",
      },
      {
        titulo: "Desenvolvimento",
        conteudo:
          "Trabalhe a lição em três passos: a regeneração como obra trinitária, a transformação interior do novo nascimento e suas evidências práticas.",
      },
      {
        titulo: "Fechamento",
        conteudo:
          "Encerre chamando a classe a examinar a própria vida à luz do novo nascimento e a agradecer ao Espírito pela obra regeneradora.",
      },
    ],
    subsidioAdultos: subsidioAdultosLicao9,
  },
  10: {
    imagem: "/images/EBD/licao-10-adulto.jpg",
    objetivos: objetivosAdultosLicao10,
    topicos: topicosAdultosLicao10,
    apoioProfessor: [
      "Mantenha a identidade pentecostal da aula ligada à missão, à santidade e à edificação da igreja, e não a experiências autocentradas.",
      "Mostre que dons espirituais e unidade do corpo não competem; pertencem ao mesmo agir do Espírito Santo.",
    ],
    apoioAluno: [
      "Leia Joel 2.28-29, Atos 2.1-4 e 1 Coríntios 12.4-7 durante a semana e observe como a promessa, o poder e os dons se unem na vida da igreja.",
      "Ore pedindo que o Espírito capacite você a testemunhar de Cristo com mais ousadia, humildade e serviço ao corpo.",
    ],
    esboco: [
      {
        titulo: "Entrada",
        conteudo:
          "Abra a aula perguntando como a igreja pode buscar poder espiritual sem perder missão, amor e ordem bíblica.",
      },
      {
        titulo: "Desenvolvimento",
        conteudo:
          "Percorra a lição em três movimentos: a promessa do derramamento, a capacitação para testemunhar e a distribuição dos dons para edificação.",
      },
      {
        titulo: "Fechamento",
        conteudo:
          "Conclua chamando a classe a buscar o Espírito com consagração, coragem missionária e compromisso com a unidade do corpo.",
      },
    ],
    subsidioAdultos: subsidioAdultosLicao10,
  },
  11: {
    imagem: "/images/EBD/licao-11-adulto.jpg",
    objetivos: objetivosAdultosLicao11,
    topicos: topicosAdultosLicao11,
    apoioProfessor: [
      "Apresente a doutrina da adoção como verdade pastoral concreta, não apenas como conceito teórico.",
      "Ajude a classe a perceber a diferença entre culpa espiritual crônica e convicção produzida pelo Espírito.",
    ],
    apoioAluno: [
      "Leia Romanos 8.12-17 durante a semana e anote o que muda em sua vida quando você se lembra de que é filho de Deus.",
      "Ore chamando conscientemente a Deus de Pai e observe como isso redefine sua confiança, sua santidade e sua esperança.",
    ],
    esboco: [
      {
        titulo: "Entrada",
        conteudo:
          "Comece expondo a passagem da escravidão para a filiação e peça aos alunos que identifiquem os sinais dessa mudança no texto.",
      },
      {
        titulo: "Desenvolvimento",
        conteudo:
          "Trabalhe a ação do Espírito em três movimentos: libertação do medo, direção na vontade do Pai e garantia da herança eterna.",
      },
      {
        titulo: "Fechamento",
        conteudo:
          "Conclua chamando a turma a responder como filhos: com oração, santidade prática e esperança perseverante.",
      },
    ],
    subsidioAdultos: subsidioAdultosLicao11,
  },
  12: {
    imagem: "/images/EBD/licao-12-adulto.png",
    objetivos: objetivosAdultosLicao12,
    topicos: topicosAdultosLicao12,
    apoioProfessor: [
      "Destaque que a dependência de Jesus em relação ao Espírito pertence ao seu ministério encarnado e não diminui sua plena divindade.",
      "Conduza a classe a perceber que o Espírito sempre exalta Cristo, evitando leituras que separam ou rivalizam as Pessoas da Trindade.",
    ],
    apoioAluno: [
      "Leia Lucas 1.26-38 e Atos 10.38 durante a semana e anote como esses textos mostram a ação conjunta do Filho e do Espírito.",
      "Ore pedindo que sua vida de serviço reflita a mesma lógica de Cristo: obediência ao Pai e dependência do Espírito.",
    ],
    esboco: [
      {
        titulo: "Entrada",
        conteudo:
          "Introduza a aula mostrando que a encarnação e o ministério de Jesus não podem ser entendidos sem a atuação do Espírito Santo.",
      },
      {
        titulo: "Desenvolvimento",
        conteudo:
          "Percorra a lição em três movimentos: a concepção do Filho, o ministério de Cristo em dependência do Espírito e a missão redentora como obra trinitária.",
      },
      {
        titulo: "Fechamento",
        conteudo:
          "Conclua levando a classe a adorar o Deus triúno e a assumir uma postura de obediência humilde e dependência do Espírito.",
      },
    ],
    subsidioAdultos: subsidioAdultosLicao12,
  },
  13: {
    imagem: "/images/EBD/licao-13-adulto.png",
    objetivos: objetivosAdultosLicao13,
    topicos: topicosAdultosLicao13,
    apoioProfessor: [
      "Mostre que a doutrina da Trindade não é abstração teórica, mas fundamento da identidade, da comunhão e da missão da Igreja.",
      "Ajude a turma a ligar vida comunitária, reconciliação e missão ao fato de pertencermos ao Deus triúno.",
    ],
    apoioAluno: [
      "Leia 1 Pedro 1.2-3 e 2 Coríntios 13.13 nesta semana e observe como a Trindade aparece na identidade e na comunhão da Igreja.",
      "Escolha uma forma concreta de servir a igreja local nesta semana como resposta ao chamado missionário do Deus triúno.",
    ],
    esboco: [
      {
        titulo: "Entrada",
        conteudo:
          "Abra a aula perguntando o que sustenta a Igreja além de estrutura e organização, conduzindo a resposta para a ação do Deus triúno.",
      },
      {
        titulo: "Desenvolvimento",
        conteudo:
          "Organize o ensino em três eixos: plano redentor, comunhão da Igreja e envio missionário, sempre mostrando a atuação do Pai, do Filho e do Espírito.",
      },
      {
        titulo: "Fechamento",
        conteudo:
          "Finalize renovando o compromisso da classe com comunhão, santidade e missão como expressão da vida recebida da Trindade.",
      },
    ],
    subsidioAdultos: subsidioAdultosLicao13,
  },
};

const sementesAdultosPrimeiroTrimestre: LicaoSeed[] = [
  {
    numero: 1,
    data: "2026-01-04",
    titulo: "O Mistério da Santíssima Trindade",
    resumo:
      "A primeira lição do trimestre apresenta a revelação da Trindade no batismo de Jesus e mostra que um só Deus age eternamente em três Pessoas distintas.",
    textoChave: "Mateus 3:17",
    verdadePratica:
      "A doutrina da Trindade é central à fé cristã e mostra um só Deus atuando harmoniosamente na redenção.",
    leituraBiblica: ["Mateus 3:13-17"],
    aplicacao:
      "Adore conscientemente ao Deus triúno nesta semana e permita que essa verdade fortaleça sua oração, sua confiança e sua reverência.",
    enfase: "a revelação do Deus triúno",
  },
  {
    numero: 2,
    data: "2026-01-11",
    titulo: "O Deus Pai",
    resumo:
      "A lição conduz a igreja a conhecer biblicamente a identidade do Pai, sua revelação em Cristo e os atributos que sustentam a fé cristã.",
    textoChave: "Mateus 11:27",
    verdadePratica:
      "Conhecemos a identidade, os atributos e a glória do Pai por meio de Cristo e da ação do Espírito Santo.",
    leituraBiblica: ["Mateus 11:25-27", "João 14:6-11"],
    aplicacao:
      "Ore nesta semana agradecendo pela revelação do Pai em Cristo e peça que seu coração seja moldado pela verdade do seu caráter santo e fiel.",
    enfase: "o conhecimento do Pai",
  },
  {
    numero: 3,
    data: "2026-01-18",
    titulo: "O Pai Enviou o Filho",
    resumo:
      "A lição mostra que o envio de Cristo nasce do amor do Pai e revela a unidade da Trindade na execução e aplicação da salvação.",
    textoChave: "1 João 4:9",
    verdadePratica:
      "O envio do Filho revela o amor do Pai e a unidade da Trindade no plano da salvação.",
    leituraBiblica: ["João 3:16-17", "1 João 4:9-10", "Gálatas 4:4-6"],
    aplicacao:
      "Agradeça ao Pai pelo envio do Filho e viva esta semana com mais confiança na salvação que nasce de sua iniciativa amorosa.",
    enfase: "o amor do Pai na redenção",
  },
  {
    numero: 4,
    data: "2026-01-25",
    titulo: "A Paternidade Divina",
    resumo:
      "A lição mostra que a paternidade de Deus é eterna, se revela no envio do Filho e aperfeiçoa a vida cristã no amor.",
    textoChave: "1 João 4:14",
    verdadePratica:
      "A paternidade de Deus é revelada no envio do Filho e na concessão do Espírito, confirmando a filiação e aperfeiçoando-nos em amor.",
    leituraBiblica: ["1 João 4:13-16"],
    aplicacao:
      "Viva esta semana com mais confiança no cuidado paternal de Deus, respondendo ao seu amor com obediência e comunhão.",
    enfase: "a paternidade divina",
  },
  {
    numero: 5,
    data: "2026-02-01",
    titulo: "O Deus Filho",
    resumo:
      "A lição apresenta Jesus como o Deus Filho, revelado na concepção virginal, na transfiguração e em sua mediação exclusiva.",
    textoChave: "Mateus 17:5",
    verdadePratica:
      "Jesus Cristo, o Deus Filho, é a revelação plena do Pai, centro da revelação divina e único mediador.",
    leituraBiblica: ["Lucas 1:31-35", "Mateus 17:1-8"],
    aplicacao:
      "Renove sua confiança em Cristo como único Senhor e Salvador, ouvindo sua voz acima de qualquer autoridade concorrente.",
    enfase: "a identidade do Deus Filho",
  },
  {
    numero: 6,
    data: "2026-02-08",
    titulo: "O Filho como o Verbo de Deus",
    resumo:
      "A lição apresenta o Filho como o Verbo eterno, participante da criação, fonte de vida e luz e revelação plena do Pai.",
    textoChave: "João 1:14",
    verdadePratica:
      "Jesus Cristo, o Verbo eterno, é a revelação plena e visível de Deus ao mundo.",
    leituraBiblica: ["João 1:1-5", "João 1:14"],
    aplicacao:
      "Contemple nesta semana o Verbo encarnado com mais reverência e deixe a graça e a verdade de Cristo moldarem sua caminhada.",
    enfase: "o Verbo eterno",
  },
  {
    numero: 7,
    data: "2026-02-15",
    titulo: "A Obra do Filho",
    resumo:
      "A lição mostra que a humilhação, a redenção e a exaltação de Cristo formam uma obra única, suficiente e gloriosa para a salvação.",
    textoChave: "Filipenses 2:9",
    verdadePratica:
      "A humilhação voluntária, a obra redentora e a exaltação gloriosa de Cristo revelam que só Ele é digno de adoração e obediência.",
    leituraBiblica: ["Filipenses 2:5-11", "Hebreus 9:24-28"],
    aplicacao:
      "Descanse nesta semana na suficiência da obra de Cristo e responda ao seu senhorio com adoração, gratidão e obediência prática.",
    enfase: "a obra redentora do Filho",
  },
  {
    numero: 8,
    data: "2026-02-22",
    titulo: "O Deus Espírito Santo",
    resumo:
      "A lição apresenta o Espírito Santo como Pessoa divina, Consolador, Ensinador e Santificador, plenamente coigual ao Pai e ao Filho.",
    textoChave: "João 14:16",
    verdadePratica:
      "O Espírito Santo é a terceira Pessoa da Trindade, plenamente divino, Consolador, Ensinador e Santificador.",
    leituraBiblica: ["João 14:25-31"],
    aplicacao:
      "Viva esta semana em reverente dependência do Espírito Santo, buscando sua direção, consolo e santificação na caminhada cristã.",
    enfase: "a pessoa e a obra do Espírito Santo",
  },
  {
    numero: 9,
    data: "2026-03-01",
    titulo: "Espírito Santo — O Regenerador",
    resumo:
      "A lição mostra que a regeneração é obra do Espírito Santo, indispensável para a salvação e visível em uma vida transformada.",
    textoChave: "João 3:3",
    verdadePratica:
      "A regeneração é transformação operada pelo Espírito pela qual o pecador se torna nova criatura.",
    leituraBiblica: ["João 3:1-8"],
    aplicacao:
      "Examine nesta semana os sinais do novo nascimento em sua vida e peça ao Espírito que continue produzindo fruto e santidade em você.",
    enfase: "o novo nascimento",
  },
  {
    numero: 10,
    data: "2026-03-08",
    titulo: "Espírito Santo — O Capacitador",
    resumo:
      "A lição mostra que o Espírito Santo derrama poder sobre a igreja para testemunho, distribuição de dons e edificação do corpo de Cristo.",
    textoChave: "Joel 2:28",
    verdadePratica:
      "O derramamento do Espírito capacita a Igreja com poder para pregar o Evangelho.",
    leituraBiblica: [
      "Joel 2:28-29",
      "Atos 2:1-4",
      "Atos 8:14-17",
      "1 Coríntios 12:4-7",
    ],
    aplicacao:
      "Busque nesta semana a capacitação do Espírito com foco em testemunho, serviço humilde e edificação da igreja local.",
    enfase: "a capacitação do Espírito",
  },
  {
    numero: 11,
    data: "2026-03-15",
    titulo: "O Pai e o Espírito Santo",
    resumo: "O Espírito Santo nos tira da escravidão do pecado, confirma nossa filiação em Cristo e nos conduz à herança eterna preparada pelo Pai.",
    textoChave: "Romanos 8:14",
    verdadePratica: "A vida cristã floresce quando o crente deixa de viver como escravo e passa a caminhar como filho guiado pelo Espírito.",
    leituraBiblica: ["Romanos 8:12-17", "Gálatas 4:1-6"],
    aplicacao: "Identifique uma área em que você ainda reage com medo ou autossuficiência e entregue isso ao Pai em oração, pedindo direção do Espírito para viver como filho.",
    enfase: "a filiação confirmada pelo Espírito",
  },
  {
    numero: 12,
    data: "2026-03-22",
    titulo: "O Filho e o Espírito",
    resumo:
      "Da concepção de Jesus à aplicação da redenção, o Espírito Santo atua em perfeita comunhão com o Filho, revelando a harmonia trinitária da salvação.",
    textoChave: "Lucas 1:35",
    verdadePratica:
      "Na obra da redenção, o Pai envia, o Filho obedece e o Espírito capacita e exalta a missão salvadora de Cristo.",
    leituraBiblica: ["Lucas 1:26-38"],
    aplicacao:
      "Abandone a lógica da autossuficiência espiritual e peça que o Senhor forme em você uma vida de obediência a Cristo em dependência do Espírito.",
    enfase: "a cooperação entre o Filho e o Espírito na redenção",
  },
  {
    numero: 13,
    data: "2026-03-29",
    titulo: "A Trindade Santa e a Igreja de Cristo",
    resumo:
      "A Igreja de Cristo nasce do plano do Pai, da redenção do Filho e da santificação do Espírito, vivendo em comunhão com o Deus triúno e sendo enviada em sua missão.",
    textoChave: "Mateus 28:19",
    verdadePratica:
      "A vida e a missão da Igreja só podem ser compreendidas à luz da atuação conjunta do Pai, do Filho e do Espírito Santo.",
    leituraBiblica: ["2 Coríntios 13:11-13", "1 Pedro 1:2-3"],
    aplicacao:
      "Renove seu compromisso com a comunhão da igreja local e com a missão de Cristo, vivendo em dependência do Espírito e sob o amor do Pai.",
    enfase: "a vida e a missão trinitárias da Igreja",
  },
];

export const adultos2026Trimestres: TrimestreEBD[] = [
  {
    id: "adultos-2026-1t",
    slug: "2026-1t",
    ano: 2026,
    trimestre: 1,
    statusEditorial: "published",
    rotulo: "1º Trimestre de 2026",
    titulo: "A Santíssima Trindade",
    subtitulo: "O Deus Único Revelado em Três Pessoas Eternas",
    descricao: "Treze lições para contemplar a revelação do Pai, do Filho e do Espírito Santo na obra da redenção e na vida da Igreja.",
    comentarista: "Douglas Baptista",
    classe: "adultos",
    imagem: "/images/EBD/ebd-1t.png",
    versiculoBase: "Mateus 28:19",
    licoes: sementesAdultosPrimeiroTrimestre.map((seed) => {
      const editorial = editoriaisAdultosPrimeiroTrimestre[seed.numero];
      return editorial ? criarLicaoEditorialAdultos(seed, editorial) : criarLicao(seed);
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
