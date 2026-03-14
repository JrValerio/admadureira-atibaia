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
    titulo: "Missão e evangelização na cidade",
    resumo: "A igreja é chamada a olhar para a cidade com compaixão, fidelidade bíblica e disposição para anunciar Cristo.",
    textoChave: "Mateus 28:19-20",
    verdadePratica: "Uma igreja saudável não vive voltada apenas para si mesma, mas participa da missão de Deus no mundo.",
    leituraBiblica: ["Mateus 28:18-20", "Atos 1:8"],
    aplicacao: "Ore por uma pessoa específica e busque uma oportunidade concreta de compartilhar Cristo com amor e clareza nesta semana.",
    enfase: "a missão da igreja",
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
    titulo: "Fundamentos da caminhada cristã",
    subtitulo: "Doutrina, comunhão e missão para a igreja local",
    descricao: "Treze lições para fortalecer a base doutrinária da classe de adultos e conectar fé bíblica, vida em igreja e testemunho cristão na cidade.",
    comentarista: "Material inicial da EBD AD Madureira Atibaia",
    classe: "adultos",
    imagem: "/images/EBD/ebd-1t.png",
    versiculoBase: "Colossenses 2:6-7",
    licoes: sementesAdultosPrimeiroTrimestre.map(criarLicao),
  },
];
