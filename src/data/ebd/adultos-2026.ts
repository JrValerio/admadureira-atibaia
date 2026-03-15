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
    titulo: "Arrependimento e novo nascimento",
    resumo: "Conversão verdadeira envolve arrependimento, fé e transformação operada pelo Espírito Santo.",
    textoChave: "João 3:3",
    verdadePratica: "O novo nascimento muda a direção da vida e produz frutos visíveis de obediência.",
    leituraBiblica: ["João 3:1-8", "Atos 2:37-42"],
    aplicacao: "Examine uma área concreta da sua vida em que o arrependimento precisa produzir mudança real e leve isso a Deus em oração.",
    enfase: "a conversão genuína",
  },
  {
    numero: 5,
    data: "2026-02-01",
    titulo: "Batismo, comunhão e vida em igreja",
    resumo: "A fé cristã floresce em compromisso público, comunhão fraterna e participação fiel na igreja local.",
    textoChave: "Atos 2:41-42",
    verdadePratica: "A caminhada com Cristo se fortalece quando o discípulo vive integrado ao corpo da igreja.",
    leituraBiblica: ["Atos 2:41-47", "1 Coríntios 12:12-27"],
    aplicacao: "Fortaleça sua participação na igreja local com presença fiel, comunhão intencional e disposição para servir.",
    enfase: "a vida no corpo de Cristo",
  },
  {
    numero: 6,
    data: "2026-02-08",
    titulo: "Oração que renova a vida espiritual",
    resumo: "A lição conduz a igreja a redescobrir a oração como prática de dependência, perseverança e comunhão com Deus.",
    textoChave: "Filipenses 4:6",
    verdadePratica: "A oração constante organiza o coração, fortalece a fé e sustenta a igreja em toda circunstância.",
    leituraBiblica: ["Lucas 11:1-13", "Filipenses 4:4-9"],
    aplicacao: "Escolha um horário da semana para orar com mais intencionalidade por sua família, pela igreja e pela cidade.",
    enfase: "a vida de oração",
  },
  {
    numero: 7,
    data: "2026-02-15",
    titulo: "Adoração em espírito e em verdade",
    resumo: "Adorar vai além do culto público: envolve coração rendido, vida íntegra e centralidade de Cristo.",
    textoChave: "João 4:23-24",
    verdadePratica: "A verdadeira adoração nasce de um coração transformado e se expressa em reverência, alegria e obediência.",
    leituraBiblica: ["João 4:19-26", "Romanos 12:1-2"],
    aplicacao: "Pergunte a si mesmo como sua rotina desta semana pode expressar adoração a Deus em atitudes, palavras e prioridades.",
    enfase: "a adoração bíblica",
  },
  {
    numero: 8,
    data: "2026-02-22",
    titulo: "Santidade no cotidiano",
    resumo: "Santidade não é isolamento, mas vida separada para Deus no meio das responsabilidades diárias.",
    textoChave: "1 Pedro 1:15-16",
    verdadePratica: "A santidade cristã se manifesta em escolhas concretas, coerência moral e temor do Senhor.",
    leituraBiblica: ["1 Pedro 1:13-21", "Romanos 6:11-14"],
    aplicacao: "Escolha uma área prática da sua rotina para alinhar com mais clareza ao padrão de santidade ensinado por Cristo.",
    enfase: "a santidade prática",
  },
  {
    numero: 9,
    data: "2026-03-01",
    titulo: "Família firmada na Palavra",
    resumo: "O ensino bíblico fortalece relacionamentos, gera cuidado mútuo e protege o lar cristão.",
    textoChave: "Josué 24:15",
    verdadePratica: "Lares fortalecidos pela Palavra tornam-se ambientes de comunhão, ensino, oração e testemunho.",
    leituraBiblica: ["Deuteronômio 6:4-9", "Efésios 5:22-33"],
    aplicacao: "Separe um momento desta semana para reunir sua casa em oração, leitura bíblica e conversa sobre a fé.",
    enfase: "a formação espiritual da família",
  },
  {
    numero: 10,
    data: "2026-03-08",
    titulo: "Dons, serviço e edificação do corpo",
    resumo: "Dons espirituais e talentos são confiados por Deus para servir e edificar a igreja.",
    textoChave: "1 Pedro 4:10",
    verdadePratica: "Servir com humildade e fidelidade é expressão concreta de maturidade cristã e amor ao corpo de Cristo.",
    leituraBiblica: ["1 Coríntios 12:4-11", "Efésios 4:11-16"],
    aplicacao: "Pergunte em oração como você pode servir melhor na igreja e dê um passo concreto em direção a esse chamado.",
    enfase: "o serviço cristão",
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
