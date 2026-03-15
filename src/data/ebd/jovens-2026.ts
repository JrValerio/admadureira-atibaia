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

function criarLicaoPilotoJovens(seed: LicaoSeed): LicaoEBD {
  return {
    ...criarLicao(seed),
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
    titulo: "Identidade firmada em Cristo",
    resumo: "A juventude cristã encontra identidade segura em Cristo, e não na aprovação do mundo.",
    textoChave: "Gálatas 2:20",
    verdadePratica: "Quem sabe quem é em Cristo consegue viver com coragem, sobriedade e propósito.",
    leituraBiblica: ["Efésios 1:3-14", "1 Pedro 2:9-10"],
    aplicacao: "Escolha um versículo para lembrar todos os dias desta semana que sua identidade está firmada em Cristo.",
    enfase: "a identidade em Cristo",
  },
  {
    numero: 2,
    data: "2026-01-11",
    titulo: "Propósito para viver e servir",
    resumo: "Juventude cristã não é tempo de espera vazia, mas estação de propósito, serviço e crescimento.",
    textoChave: "Jeremias 29:11",
    verdadePratica: "Deus chama os jovens para viver com propósito hoje, servindo com fidelidade no tempo presente.",
    leituraBiblica: ["1 Timóteo 4:12-16", "Efésios 2:10"],
    aplicacao: "Ore sobre uma área concreta em que você pode começar a servir com mais intencionalidade nesta semana.",
    enfase: "o propósito cristão",
  },
  {
    numero: 3,
    data: "2026-01-18",
    titulo: "Amizades que fortalecem a fé",
    resumo: "Relacionamentos saudáveis ajudam a juventude a permanecer em Cristo com encorajamento e verdade.",
    textoChave: "Provérbios 13:20",
    verdadePratica: "Boas amizades não apenas acompanham a caminhada; elas também ajudam a moldar o rumo espiritual.",
    leituraBiblica: ["1 Samuel 18:1-4", "Hebreus 10:23-25"],
    aplicacao: "Aproxime-se intencionalmente de alguém que fortaleça sua fé e seja esse tipo de presença para outra pessoa.",
    enfase: "as amizades saudáveis",
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
    imagem: "/images/EBD/ebd-1t.png",
    versiculoBase: "João 3:16",
    licoes: sementesJovensPrimeiroTrimestre.map((seed) =>
      seed.numero === 11 ? criarLicaoPilotoJovens(seed) : criarLicao(seed)
    ),
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
