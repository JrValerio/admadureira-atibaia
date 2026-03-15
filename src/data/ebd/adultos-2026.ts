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
