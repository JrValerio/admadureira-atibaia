export type DailyVerse = {
  livroSlug: string;
  capitulo: number;
  versiculo: number;
  referencia: string;
  texto: string;
  tema: string;
};

export const dailyVerses: DailyVerse[] = [
  {
    livroSlug: "salmos",
    capitulo: 119,
    versiculo: 105,
    referencia: "Salmos 119:105",
    texto: "Lâmpada para os meus pés é a tua palavra e luz para o meu caminho.",
    tema: "Direção",
  },
  {
    livroSlug: "joao",
    capitulo: 3,
    versiculo: 16,
    referencia: "João 3:16",
    texto:
      "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito.",
    tema: "Amor de Deus",
  },
  {
    livroSlug: "salmos",
    capitulo: 23,
    versiculo: 1,
    referencia: "Salmos 23:1",
    texto: "O Senhor é o meu pastor; nada me faltará.",
    tema: "Cuidado",
  },
  {
    livroSlug: "filipenses",
    capitulo: 4,
    versiculo: 13,
    referencia: "Filipenses 4:13",
    texto: "Posso todas as coisas naquele que me fortalece.",
    tema: "Fortaleza",
  },
  {
    livroSlug: "proverbios",
    capitulo: 3,
    versiculo: 5,
    referencia: "Provérbios 3:5",
    texto:
      "Confia no Senhor de todo o teu coração e não te estribes no teu próprio entendimento.",
    tema: "Confiança",
  },
  {
    livroSlug: "jeremias",
    capitulo: 29,
    versiculo: 11,
    referencia: "Jeremias 29:11",
    texto:
      "Eu é que sei que pensamentos tenho a vosso respeito, diz o Senhor: pensamentos de paz e não de mal.",
    tema: "Esperança",
  },
  {
    livroSlug: "romanos",
    capitulo: 8,
    versiculo: 28,
    referencia: "Romanos 8:28",
    texto:
      "Sabemos que todas as coisas cooperam para o bem daqueles que amam a Deus.",
    tema: "Propósito",
  },
  {
    livroSlug: "isaias",
    capitulo: 41,
    versiculo: 10,
    referencia: "Isaías 41:10",
    texto:
      "Não temas, porque eu sou contigo; não te assombres, porque eu sou o teu Deus.",
    tema: "Coragem",
  },
  {
    livroSlug: "mateus",
    capitulo: 11,
    versiculo: 28,
    referencia: "Mateus 11:28",
    texto:
      "Vinde a mim, todos os que estais cansados e sobrecarregados, e eu vos aliviarei.",
    tema: "Descanso",
  },
  {
    livroSlug: "lamentacoes",
    capitulo: 3,
    versiculo: 22,
    referencia: "Lamentações 3:22-23",
    texto:
      "As misericórdias do Senhor são a causa de não sermos consumidos; renovam-se cada manhã.",
    tema: "Misericórdia",
  },
  {
    livroSlug: "josue",
    capitulo: 1,
    versiculo: 9,
    referencia: "Josué 1:9",
    texto:
      "Sê forte e corajoso; não temas, nem te espantes, porque o Senhor, teu Deus, é contigo.",
    tema: "Ânimo",
  },
  {
    livroSlug: "salmos",
    capitulo: 46,
    versiculo: 1,
    referencia: "Salmos 46:1",
    texto: "Deus é o nosso refúgio e fortaleza, socorro bem-presente nas tribulações.",
    tema: "Refúgio",
  },
  {
    livroSlug: "1-pedro",
    capitulo: 5,
    versiculo: 7,
    referencia: "1 Pedro 5:7",
    texto: "Lançando sobre ele toda a vossa ansiedade, porque ele tem cuidado de vós.",
    tema: "Ansiedade",
  },
  {
    livroSlug: "hebreus",
    capitulo: 11,
    versiculo: 1,
    referencia: "Hebreus 11:1",
    texto:
      "Ora, a fé é a certeza de coisas que se esperam, a convicção de fatos que se não veem.",
    tema: "Fé",
  },
  {
    livroSlug: "tiago",
    capitulo: 1,
    versiculo: 5,
    referencia: "Tiago 1:5",
    texto:
      "Se, porém, algum de vós necessita de sabedoria, peça-a a Deus, que a todos dá liberalmente.",
    tema: "Sabedoria",
  },
  {
    livroSlug: "joao",
    capitulo: 14,
    versiculo: 6,
    referencia: "João 14:6",
    texto: "Eu sou o caminho, e a verdade, e a vida; ninguém vem ao Pai senão por mim.",
    tema: "Cristo",
  },
  {
    livroSlug: "salmos",
    capitulo: 37,
    versiculo: 5,
    referencia: "Salmos 37:5",
    texto: "Entrega o teu caminho ao Senhor, confia nele, e o mais ele fará.",
    tema: "Entrega",
  },
  {
    livroSlug: "1-tessalonicenses",
    capitulo: 5,
    versiculo: 17,
    referencia: "1 Tessalonicenses 5:17",
    texto: "Orai sem cessar.",
    tema: "Oração",
  },
  {
    livroSlug: "efesios",
    capitulo: 6,
    versiculo: 10,
    referencia: "Efésios 6:10",
    texto: "Fortalecei-vos no Senhor e na força do seu poder.",
    tema: "Poder de Deus",
  },
  {
    livroSlug: "salmos",
    capitulo: 121,
    versiculo: 1,
    referencia: "Salmos 121:1-2",
    texto: "Elevo os olhos para os montes: de onde me virá o socorro? O meu socorro vem do Senhor.",
    tema: "Socorro",
  },
  {
    livroSlug: "proverbios",
    capitulo: 16,
    versiculo: 3,
    referencia: "Provérbios 16:3",
    texto: "Confia ao Senhor as tuas obras, e os teus desígnios serão estabelecidos.",
    tema: "Trabalho",
  },
  {
    livroSlug: "2-corintios",
    capitulo: 9,
    versiculo: 7,
    referencia: "2 Coríntios 9:7",
    texto: "Deus ama a quem dá com alegria.",
    tema: "Generosidade",
  },
  {
    livroSlug: "galatas",
    capitulo: 6,
    versiculo: 9,
    referencia: "Gálatas 6:9",
    texto: "E não nos cansemos de fazer o bem, porque a seu tempo ceifaremos.",
    tema: "Perseverança",
  },
  {
    livroSlug: "isaias",
    capitulo: 40,
    versiculo: 31,
    referencia: "Isaías 40:31",
    texto:
      "Os que esperam no Senhor renovam as suas forças; sobem com asas como águias.",
    tema: "Renovo",
  },
  {
    livroSlug: "mateus",
    capitulo: 6,
    versiculo: 33,
    referencia: "Mateus 6:33",
    texto:
      "Buscai, pois, em primeiro lugar, o seu reino e a sua justiça, e todas estas coisas vos serão acrescentadas.",
    tema: "Prioridade",
  },
  {
    livroSlug: "romanos",
    capitulo: 10,
    versiculo: 17,
    referencia: "Romanos 10:17",
    texto: "A fé vem pelo ouvir, e o ouvir, pela palavra de Cristo.",
    tema: "Palavra",
  },
  {
    livroSlug: "joao",
    capitulo: 8,
    versiculo: 32,
    referencia: "João 8:32",
    texto: "Conhecereis a verdade, e a verdade vos libertará.",
    tema: "Liberdade",
  },
  {
    livroSlug: "hebreus",
    capitulo: 13,
    versiculo: 8,
    referencia: "Hebreus 13:8",
    texto: "Jesus Cristo, ontem e hoje, é o mesmo e o será para sempre.",
    tema: "Constância de Cristo",
  },
  {
    livroSlug: "apocalipse",
    capitulo: 3,
    versiculo: 20,
    referencia: "Apocalipse 3:20",
    texto: "Eis que estou à porta e bato; se alguém ouvir a minha voz e abrir a porta, entrarei.",
    tema: "Resposta",
  },
];
