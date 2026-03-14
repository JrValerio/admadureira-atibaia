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
  "Relacione a lição com escolhas reais da juventude e incentive conversa honesta em classe.",
  "Conduza o encerramento com oração específica, aplicação prática e acompanhamento pastoral.",
];

const apoioAlunoBase = [
  "Leve anotações da sua leitura da semana e compartilhe uma dúvida ou decisão durante a aula.",
  "Conte a alguém da classe como pretende aplicar a lição durante os próximos dias.",
];

function criarLicao(seed: LicaoSeed): LicaoEBD {
  return {
    id: `jovens-2026-1t-licao-${seed.numero}`,
    slug: `licao-${seed.numero}`,
    numero: seed.numero,
    data: seed.data,
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
    titulo: "Coragem para testemunhar",
    resumo: "A lição encoraja os jovens a anunciar Cristo com simplicidade, amor e firmeza nos ambientes em que vivem.",
    textoChave: "Romanos 1:16",
    verdadePratica: "O jovem cristão não precisa esperar perfeição para testemunhar; precisa depender do Espírito e viver com coragem.",
    leituraBiblica: ["Atos 4:13-20", "1 Pedro 3:15-16"],
    aplicacao: "Ore por coragem para compartilhar sua fé com uma pessoa específica e se prepare para essa conversa com simplicidade.",
    enfase: "o testemunho do Evangelho",
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
    rotulo: "1º Trimestre de 2026",
    titulo: "Identidade e propósito em Cristo",
    subtitulo: "Formação espiritual para a juventude da igreja",
    descricao: "Treze lições para fortalecer identidade, discernimento e compromisso dos jovens com Cristo, com a igreja e com a missão.",
    comentarista: "Material inicial da EBD AD Madureira Atibaia",
    classe: "jovens",
    imagem: "/images/EBD/ebd-1t.png",
    versiculoBase: "1 Timóteo 4:12",
    licoes: sementesJovensPrimeiroTrimestre.map(criarLicao),
  },
];
