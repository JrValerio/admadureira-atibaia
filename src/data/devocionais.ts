import {
  formatSaoPauloDateKey,
  getSaoPauloDayOfYear,
} from "@/lib/date-utils";

export type Devotional = {
  slug: string;
  titulo: string;
  resumo: string;
  versiculo: string;
  textoBase: string;
  data: string;
  tempoLeitura: string;
  reflexao: string[];
  aplicacao: string[];
  oracao: string;
  imagem?: string;
};

const devotionals: Devotional[] = [
  {
    slug: "deus-cuida-de-voce-em-silencio",
    titulo: "Deus cuida de você até nos dias silenciosos",
    resumo:
      "Mesmo quando o coração parece cansado e as respostas demoram, o Senhor continua presente, sustentando e conduzindo seus filhos.",
    versiculo: "Salmos 121:1-2",
    textoBase:
      "Elevo os meus olhos para os montes: de onde me virá o socorro? O meu socorro vem do Senhor, que fez o céu e a terra.",
    data: "2026-03-12",
    tempoLeitura: "4 min",
    reflexao: [
      "Há dias em que a vida cristã parece atravessar um tempo de silêncio. As orações continuam, mas a alma se sente pesada e a resposta parece distante. Nessas horas, somos tentados a confundir silêncio com abandono.",
      "O salmista, porém, nos lembra que o socorro não nasce das circunstâncias, mas do Senhor. Deus permanece guardando seus filhos, mesmo quando a caminhada exige paciência, perseverança e quietude.",
      "A fidelidade de Deus não depende do que sentimos no momento. Ele continua sustentando, abrindo caminhos e fortalecendo o coração daqueles que confiam em sua presença.",
    ],
    aplicacao: [
      "Ore hoje com sinceridade, mesmo que ainda não veja a resposta.",
      "Lembre-se das vezes em que Deus já lhe sustentou.",
      "Confie que a mão do Senhor continua operando em silêncio.",
    ],
    oracao:
      "Senhor, ajuda-me a confiar em ti também nos dias silenciosos. Sustenta meu coração, renova minha esperança e fortalece minha fé em tua presença constante.",
    imagem: "/fachada-da-igreja.jpg",
  },
  {
    slug: "a-palavra-que-fortalece-a-casa",
    titulo: "A Palavra que fortalece a casa",
    resumo:
      "Famílias são fortalecidas quando a presença de Deus ocupa o centro da rotina, das decisões e da comunhão diária.",
    versiculo: "Josué 24:15",
    textoBase:
      "Eu e a minha casa serviremos ao Senhor.",
    data: "2026-03-10",
    tempoLeitura: "5 min",
    reflexao: [
      "Construir uma casa espiritual não depende apenas de grandes momentos, mas de escolhas diárias. O ambiente do lar muda quando a Palavra de Deus é honrada nas conversas, nas decisões e no modo como a família caminha junta.",
      "Josué fez uma declaração pública de fé, mas ela nasceu primeiro como decisão interior. A família cristã precisa dessa mesma firmeza: escolher servir ao Senhor mesmo em um tempo de distrações, pressa e desgaste emocional.",
      "Quando Cristo governa o coração, a casa encontra direção. Nem toda dificuldade desaparece de imediato, mas a presença do Senhor traz paz, sabedoria e unidade para continuar avançando.",
    ],
    aplicacao: [
      "Separe um momento breve de oração com sua família nesta semana.",
      "Leia um texto bíblico em casa e converse sobre ele.",
      "Decida conscientemente servir ao Senhor no ambiente do lar.",
    ],
    oracao:
      "Senhor, visita nossa casa com tua presença. Dá-nos unidade, sabedoria e alegria para servir ao teu nome com fidelidade.",
    imagem: "/programacao/semanas/2026-03-30/culto-de-domingo.png",
  },
  {
    slug: "permaneca-firme-nas-pequenas-disciplinas",
    titulo: "Permaneça firme nas pequenas disciplinas",
    resumo:
      "A constância na oração, na leitura bíblica e na comunhão fortalece a alma e prepara o coração para permanecer fiel a Deus.",
    versiculo: "Gálatas 6:9",
    textoBase:
      "E não nos cansemos de fazer o bem, porque a seu tempo ceifaremos, se não houvermos desfalecido.",
    data: "2026-03-08",
    tempoLeitura: "4 min",
    reflexao: [
      "Grande parte do crescimento espiritual acontece longe dos holofotes, nas pequenas disciplinas que repetimos com fidelidade. Ler a Bíblia, orar e permanecer em comunhão parecem gestos simples, mas moldam a vida cristã.",
      "Muitas vezes esperamos experiências extraordinárias, quando Deus está trabalhando justamente por meio da perseverança diária. A colheita espiritual é resultado de sementes lançadas com constância.",
      "Não despreze os hábitos santos. Eles sustentam a alma, guardam o coração e nos mantêm sensíveis à voz do Senhor em meio à rotina.",
    ],
    aplicacao: [
      "Defina um horário fixo para oração esta semana.",
      "Leia um capítulo da Bíblia por dia e anote um aprendizado.",
      "Permaneça fiel mesmo quando o progresso parecer discreto.",
    ],
    oracao:
      "Pai, dá-me constância nas pequenas disciplinas da fé. Ensina-me a permanecer firme, paciente e sensível à tua voz a cada dia.",
    imagem: "/pulpito-da-igreja.jpg",
  },
];

function getDayOfYear(date = new Date()) {
  return getSaoPauloDayOfYear(date);
}

function createDailyDevotional(devotional: Devotional, date: Date) {
  return {
    ...devotional,
    data: formatSaoPauloDateKey(date),
  };
}

export function getDevotionals() {
  return devotionals;
}

export function getDevotionalBySlug(slug: string) {
  return devotionals.find((devotional) => devotional.slug === slug) ?? null;
}

export function getDevotionalOfTheDay(date = new Date()) {
  if (devotionals.length === 0) {
    return null;
  }

  const index = (getDayOfYear(date) - 1) % devotionals.length;
  const devotional = devotionals[index] ?? null;

  return devotional ? createDailyDevotional(devotional, date) : null;
}

export function getDevotionalDisplayDate(
  devotional: Devotional,
  date = new Date()
) {
  const dailyDevotional = getDevotionalOfTheDay(date);

  return dailyDevotional?.slug === devotional.slug
    ? dailyDevotional.data
    : devotional.data;
}
