import type { LicaoEBDInfantil, TrimestreEBD } from "./types";
import { EBD_DEFAULT_COVER_IMAGE } from "./assets";

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
  "Use linguagem simples, participação ativa e exemplos do cotidiano para conectar a lição com a rotina das crianças.",
  "Feche a aula com oração, memorização do versículo e revisão da aplicação da semana.",
];

const apoioAlunoBase = [
  "Compartilhe com a família o que aprendeu no domingo e repita o versículo da semana em casa.",
  "Escolha uma atitude simples para praticar durante a semana com alegria e obediência a Jesus.",
];

function criarLicao(seed: LicaoSeed): LicaoEBDInfantil {
  return {
    id: `infantil-2026-1t-licao-${seed.numero}`,
    publico: "infantil",
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
      `Ensinar às crianças como ${seed.enfase.toLowerCase()} pode ser vivida com simplicidade e alegria.`,
      "Ajudar a classe a relacionar a lição com casa, igreja, amizades e rotina diária.",
      "Transformar o ensino da semana em atitude prática de fé e obediência a Jesus.",
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

const sementesInfantilPrimeiroTrimestre: LicaoSeed[] = [
  {
    numero: 1,
    data: "2026-01-04",
    titulo: "Jesus me ensina pela Bíblia",
    resumo: "A Bíblia é um presente de Deus para conhecer Jesus e aprender a obedecer com alegria.",
    textoChave: "Salmos 119:105",
    verdadePratica: "Quando escuto a Palavra de Deus, aprendo a viver do jeito que agrada a Jesus.",
    leituraBiblica: ["Salmos 119:105", "2 Timóteo 3:14-15"],
    aplicacao: "Separe um momento da semana para ler um versículo com a família e conversar sobre como obedecer a Jesus.",
    enfase: "o amor pela Palavra",
  },
  {
    numero: 2,
    data: "2026-01-11",
    titulo: "Deus cuida de mim todos os dias",
    resumo: "A lição mostra às crianças que Deus vê, protege, sustenta e acompanha sua vida em todo tempo.",
    textoChave: "Salmos 121:7-8",
    verdadePratica: "Posso confiar porque Deus cuida de mim quando estou em casa, na escola e na igreja.",
    leituraBiblica: ["Salmos 121", "Mateus 6:25-34"],
    aplicacao: "Antes de dormir, agradeça com a família por três cuidados de Deus percebidos durante o dia.",
    enfase: "a confiança no cuidado de Deus",
  },
  {
    numero: 3,
    data: "2026-01-18",
    titulo: "Jesus me ensina a obedecer",
    resumo: "Obedecer a Jesus é sinal de amor e faz bem para a vida da criança em casa e na igreja.",
    textoChave: "João 14:15",
    verdadePratica: "Quando amo Jesus, quero obedecer ao que Ele me ensina.",
    leituraBiblica: ["João 14:15-21", "Efésios 6:1-3"],
    aplicacao: "Escolha uma atitude de obediência para praticar com alegria nesta semana e conte para sua família.",
    enfase: "a obediência a Jesus",
  },
  {
    numero: 4,
    data: "2026-01-25",
    titulo: "A oração aproxima meu coração de Deus",
    resumo: "Orar é conversar com Deus com sinceridade, confiança e gratidão em qualquer momento do dia.",
    textoChave: "Jeremias 33:3",
    verdadePratica: "Posso falar com Deus em todo momento, porque Ele me ouve com amor.",
    leituraBiblica: ["Mateus 6:5-13", "1 Samuel 1:9-20"],
    aplicacao: "Separe um momento do dia para fazer uma oração curta, agradecendo e falando com Deus com sinceridade.",
    enfase: "a vida de oração",
  },
  {
    numero: 5,
    data: "2026-02-01",
    titulo: "Louvar a Deus com alegria",
    resumo: "Louvar é reconhecer quem Deus é e agradecer por seu cuidado com alegria e reverência.",
    textoChave: "Salmos 150:6",
    verdadePratica: "Louvar a Deus com alegria é uma forma bonita de demonstrar amor e gratidão.",
    leituraBiblica: ["Salmos 150", "Atos 16:25-26"],
    aplicacao: "Escolha uma música cristã para cantar com a família nesta semana e agradeça a Deus por sua bondade.",
    enfase: "a alegria da adoração",
  },
  {
    numero: 6,
    data: "2026-02-08",
    titulo: "Jesus me ensina a falar a verdade",
    resumo: "A lição reforça a importância de sinceridade, honestidade e confiança nas pequenas atitudes da infância.",
    textoChave: "Provérbios 12:22",
    verdadePratica: "Falar a verdade agrada a Deus e ajuda a construir confiança com as pessoas.",
    leituraBiblica: ["Efésios 4:25", "Lucas 19:1-10"],
    aplicacao: "Se precisar consertar alguma atitude com sinceridade, fale a verdade e peça ajuda a Jesus para fazer o que é certo.",
    enfase: "a sinceridade cristã",
  },
  {
    numero: 7,
    data: "2026-02-15",
    titulo: "Amar e cuidar dos amigos",
    resumo: "A amizade cristã inclui carinho, respeito, perdão e disposição para fazer o bem.",
    textoChave: "João 15:12",
    verdadePratica: "Jesus me ensina a tratar meus amigos com amor, respeito e bondade.",
    leituraBiblica: ["1 Samuel 18:1-4", "Lucas 10:25-37"],
    aplicacao: "Escolha uma atitude de bondade para demonstrar amor a um amigo nesta semana.",
    enfase: "o cuidado com os amigos",
  },
  {
    numero: 8,
    data: "2026-02-22",
    titulo: "A família é um presente de Deus",
    resumo: "A lição ensina gratidão pela família e mostra como o amor de Deus alcança o lar.",
    textoChave: "Josué 24:15",
    verdadePratica: "Deus cuida da minha família e quer que nosso lar seja lugar de amor e oração.",
    leituraBiblica: ["Deuteronômio 6:4-9", "Atos 16:31-34"],
    aplicacao: "Faça uma oração com sua família nesta semana agradecendo a Deus pelo lar e pedindo cuidado sobre todos.",
    enfase: "o valor da família",
  },
  {
    numero: 9,
    data: "2026-03-01",
    titulo: "Servindo a Deus com o que eu tenho",
    resumo: "As crianças também podem servir a Deus com alegria, atenção e disposição nas pequenas coisas.",
    textoChave: "1 Samuel 3:10",
    verdadePratica: "Posso servir a Deus desde pequeno com amor, obediência e vontade de ajudar.",
    leituraBiblica: ["1 Samuel 3:1-10", "Marcos 10:13-16"],
    aplicacao: "Escolha uma forma simples de ajudar em casa ou na igreja como expressão do seu amor a Deus.",
    enfase: "o serviço das crianças",
  },
  {
    numero: 10,
    data: "2026-03-08",
    titulo: "Compartilhando o amor de Jesus",
    resumo: "As crianças são convidadas a falar de Jesus com naturalidade, carinho e alegria para outras pessoas.",
    textoChave: "Mateus 5:16",
    verdadePratica: "Posso mostrar o amor de Jesus com minhas palavras e atitudes.",
    leituraBiblica: ["Marcos 5:18-20", "Mateus 5:13-16"],
    aplicacao: "Conte para alguém o que você aprendeu sobre Jesus nesta semana e demonstre esse amor com uma atitude prática.",
    enfase: "o testemunho infantil",
  },
  {
    numero: 11,
    data: "2026-03-15",
    titulo: "Confiança quando sinto medo",
    resumo: "A lição ajuda as crianças a lembrar que Deus está perto e cuida delas em momentos de insegurança.",
    textoChave: "Isaías 41:10",
    verdadePratica: "Quando sinto medo, posso lembrar que Deus está comigo e me fortalece.",
    leituraBiblica: ["Isaías 41:10", "Marcos 4:35-41"],
    aplicacao: "Quando sentir medo, faça uma oração curta pedindo ajuda a Deus e compartilhe isso com um adulto de confiança.",
    enfase: "a confiança em tempos de medo",
  },
  {
    numero: 12,
    data: "2026-03-22",
    titulo: "Perdoar como Jesus me perdoa",
    resumo: "Jesus perdoa seus filhos e também nos chama a perdoar uns aos outros com amor e humildade.",
    textoChave: "Efésios 4:32",
    verdadePratica: "Quando recebo o perdão de Jesus, aprendo a perdoar com amor e humildade.",
    leituraBiblica: ["Mateus 18:21-35", "Efésios 4:31-32"],
    aplicacao: "Se precisar perdoar ou pedir perdão nesta semana, peça ajuda a Jesus e dê esse passo com sinceridade.",
    enfase: "o perdão cristão",
  },
  {
    numero: 13,
    data: "2026-03-29",
    titulo: "Crescendo com Jesus a cada domingo",
    resumo: "O encerramento do trimestre celebra o aprendizado das crianças e reforça a alegria de continuar crescendo com Jesus.",
    textoChave: "Lucas 2:52",
    verdadePratica: "Posso crescer com Jesus aprendendo, obedecendo e participando da EBD com alegria.",
    leituraBiblica: ["Lucas 2:40-52", "Salmos 92:12-14"],
    aplicacao: "Agradeça a Deus pelo que aprendeu neste trimestre e peça alegria para continuar crescendo com Jesus em cada domingo.",
    enfase: "o crescimento com Jesus",
  },
];

export const infantil2026Trimestres: TrimestreEBD[] = [
  {
    id: "infantil-2026-1t",
    slug: "2026-1t",
    ano: 2026,
    trimestre: 1,
    statusEditorial: "published",
    rotulo: "1º Trimestre de 2026",
    titulo: "Crescendo com Jesus a cada domingo",
    subtitulo: "Aprendizados simples e consistentes para a classe infantil",
    descricao: "Treze lições para ajudar as crianças a conhecer Jesus, amar a Palavra, viver em oração e praticar a fé com alegria.",
    comentarista: "Material inicial da EBD AD Madureira Atibaia",
    classe: "infantil",
    imagem: EBD_DEFAULT_COVER_IMAGE,
    versiculoBase: "Lucas 2:52",
    licoes: sementesInfantilPrimeiroTrimestre.map(criarLicao),
  },
];
