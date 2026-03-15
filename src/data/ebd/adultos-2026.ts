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

const apoioProfessorBase = [
  "Conecte a lição com a vida da igreja local, da família e da missão cristã.",
  "Encerre a aula com revisão dos objetivos, oração e aplicação prática da semana.",
];

const apoioAlunoBase = [
  "Leia os textos bíblicos antes da aula e leve anotações ou perguntas para compartilhar.",
  "Escolha um passo de obediência para viver durante a semana a partir da lição estudada.",
];

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

function criarLicao(seed: LicaoSeed): LicaoEBD {
  return {
    id: `adultos-2026-1t-licao-${seed.numero}`,
    slug: `licao-${seed.numero}`,
    numero: seed.numero,
    data: seed.data,
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

function criarLicaoPilotoAdultos(seed: LicaoSeed): LicaoEBD {
  return {
    ...criarLicao(seed),
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
  };
}

const sementesAdultosPrimeiroTrimestre: LicaoSeed[] = [
  {
    numero: 1,
    data: "2026-01-04",
    titulo: "A Palavra que sustenta a caminhada",
    resumo: "A vida cristã amadurece quando a Escritura ocupa o centro do ensino, da comunhão e das decisões da igreja.",
    textoChave: "2 Timóteo 3:16-17",
    verdadePratica: "Toda transformação duradoura começa quando a Palavra orienta fé, família e serviço cristão.",
    leituraBiblica: ["Salmos 119:97-105", "2 Timóteo 3:14-17"],
    aplicacao: "Separe um horário fixo desta semana para leitura bíblica e trate esse compromisso como parte da sua fidelidade ao Senhor.",
    enfase: "a centralidade da Palavra",
  },
  {
    numero: 2,
    data: "2026-01-11",
    titulo: "Deus Pai, Filho e Espírito Santo",
    resumo: "A lição reforça a ação harmoniosa do Pai, do Filho e do Espírito Santo na salvação e na vida da igreja.",
    textoChave: "Mateus 28:19",
    verdadePratica: "A fé cristã confessa um só Deus, conhecido na revelação do Pai, do Filho e do Espírito Santo.",
    leituraBiblica: ["Mateus 3:13-17", "Efésios 1:3-14"],
    aplicacao: "Transforme sua oração desta semana em um exercício consciente de adoração ao Deus que se revelou em Pai, Filho e Espírito Santo.",
    enfase: "a revelação do Deus triúno",
  },
  {
    numero: 3,
    data: "2026-01-18",
    titulo: "Salvação pela graça em Cristo",
    resumo: "A igreja relembra que a reconciliação com Deus nasce da graça em Cristo, e não do mérito humano.",
    textoChave: "Efésios 2:8-9",
    verdadePratica: "Quem foi alcançado pela graça vive com gratidão, humildade e compromisso com o Evangelho.",
    leituraBiblica: ["Efésios 2:1-10", "Romanos 5:1-11"],
    aplicacao: "Lembre-se diariamente de que você vive pela graça e deixe essa verdade moldar sua gratidão, seu serviço e sua humildade.",
    enfase: "a graça salvadora",
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
    titulo: "Perseverança em tempos difíceis",
    resumo: "A lição prepara a igreja para permanecer firme quando surgem provações, cansaço e pressões da caminhada.",
    textoChave: "Romanos 12:12",
    verdadePratica: "Quem persevera em Cristo aprende a atravessar provações com esperança, oração e confiança no cuidado de Deus.",
    leituraBiblica: ["Tiago 1:2-8", "Romanos 5:1-5"],
    aplicacao: "Compartilhe um pedido de oração com alguém de confiança e fortaleça outra pessoa com presença, intercessão e Palavra.",
    enfase: "a perseverança cristã",
  },
  {
    numero: 13,
    data: "2026-03-29",
    titulo: "Esperança futura e fidelidade presente",
    resumo: "A esperança eterna sustenta uma vida fiel, sóbria e cheia de propósito no presente.",
    textoChave: "Apocalipse 21:5",
    verdadePratica: "A esperança cristã no futuro de Deus fortalece a fidelidade, a santidade e o serviço hoje.",
    leituraBiblica: ["Apocalipse 21:1-7", "1 Tessalonicenses 4:13-18"],
    aplicacao: "Conclua o trimestre renovando seu compromisso com a fidelidade a Cristo, com a igreja e com a esperança que não decepciona.",
    enfase: "a esperança eterna",
  },
];

export const adultos2026Trimestres: TrimestreEBD[] = [
  {
    id: "adultos-2026-1t",
    slug: "2026-1t",
    ano: 2026,
    trimestre: 1,
    rotulo: "1º Trimestre de 2026",
    titulo: "A Santíssima Trindade",
    subtitulo: "O Deus Único Revelado em Três Pessoas Eternas",
    descricao: "Treze lições para contemplar a revelação do Pai, do Filho e do Espírito Santo na obra da redenção e na vida da Igreja.",
    comentarista: "Douglas Baptista",
    classe: "adultos",
    imagem: "/images/EBD/ebd-1t.png",
    versiculoBase: "Mateus 28:19",
    licoes: sementesAdultosPrimeiroTrimestre.map((seed) =>
      seed.numero === 11 ? criarLicaoPilotoAdultos(seed) : criarLicao(seed)
    ),
  },
];
