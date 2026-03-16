import {
  bibleBooks,
  getBibleBookBySlug,
  type BibleBook,
} from "@/data/biblia-livros";
import { getSaoPauloDayOfYear } from "@/lib/date-utils";

export type ReadingReference = {
  livroSlug: string;
  capitulo: number;
};

export type ReadingPlanDay = {
  dia: number;
  leituras: ReadingReference[];
  foco?: string;
};

export type ReadingPlan = {
  slug: string;
  titulo: string;
  descricao: string;
  duracao: number;
  duracaoLabel: string;
  idealPara: string;
  versiculoBase: string;
  imagem: string;
  destaque: string;
  dias: ReadingPlanDay[];
};

function createReadingPlanPath(slug: string) {
  return `/espiritualidade/plano-de-leitura/${slug}`;
}

export function createReadingPlanDayPath(slug: string, dia: number) {
  return `${createReadingPlanPath(slug)}/dia/${dia}`;
}

function createChapterSequence(books: BibleBook[]) {
  return books.flatMap((book) =>
    Array.from({ length: book.capitulos }, (_, index) => ({
      livroSlug: book.slug,
      capitulo: index + 1,
    }))
  );
}

function createBookSequenceBySlugs(bookSlugs: string[]) {
  const books = bookSlugs
    .map((slug) => getBibleBookBySlug(slug))
    .filter((book): book is BibleBook => book !== null);

  return createChapterSequence(books);
}

function splitIntoBalancedDays(
  readings: ReadingReference[],
  totalDays: number,
  focusFactory?: (day: number) => string | undefined
) {
  let index = 0;

  return Array.from({ length: totalDays }, (_, listIndex) => {
    const day = listIndex + 1;
    const remainingReadings = readings.length - index;
    const remainingDays = totalDays - listIndex;
    const takeCount = Math.ceil(remainingReadings / remainingDays);
    const leituras = readings.slice(index, index + takeCount);

    index += takeCount;

    return {
      dia: day,
      leituras,
      foco: focusFactory?.(day),
    };
  });
}

function splitIntoFixedDays(
  readings: ReadingReference[],
  perDay: number,
  focusFactory?: (day: number) => string | undefined
) {
  return Array.from({ length: Math.ceil(readings.length / perDay) }, (_, index) => {
    const day = index + 1;

    return {
      dia: day,
      leituras: readings.slice(index * perDay, index * perDay + perDay),
      foco: focusFactory?.(day),
    };
  });
}

function createBibleInOneYearDays() {
  const oldTestamentReadings = createChapterSequence(
    bibleBooks.filter((book) => book.testamento === "Antigo Testamento")
  );
  const newTestamentReadings = createChapterSequence(
    bibleBooks.filter((book) => book.testamento === "Novo Testamento")
  );
  let oldIndex = 0;
  let newIndex = 0;

  return Array.from({ length: 365 }, (_, listIndex) => {
    const day = listIndex + 1;
    const remainingDays = 365 - listIndex;
    const remainingOld = oldTestamentReadings.length - oldIndex;
    const remainingNew = newTestamentReadings.length - newIndex;
    const oldCount =
      remainingOld > 0 ? Math.ceil(remainingOld / remainingDays) : 0;
    const newCount =
      remainingNew > 0 ? Math.ceil(remainingNew / remainingDays) : 0;
    const leituras = [
      ...oldTestamentReadings.slice(oldIndex, oldIndex + oldCount),
      ...newTestamentReadings.slice(newIndex, newIndex + newCount),
    ];

    oldIndex += oldCount;
    newIndex += newCount;

    return {
      dia: day,
      leituras,
      foco:
        "Leituras do dia para percorrer a Bíblia com constância ao longo do ano.",
    };
  });
}

const planoBibliaEmUmAno: ReadingPlan = {
  slug: "biblia-em-1-ano",
  titulo: "Bíblia em 1 ano",
  descricao:
    "Um plano anual para percorrer toda a Bíblia com constância, distribuindo leituras do Antigo e do Novo Testamento ao longo de 365 dias.",
  duracao: 365,
  duracaoLabel: "365 dias",
  idealPara:
    "Quem deseja criar uma rotina diária e ler toda a Bíblia ao longo do ano.",
  versiculoBase: "Salmos 119:105",
  imagem: "/pulpito-da-igreja.jpg",
  destaque: "Plano completo",
  dias: createBibleInOneYearDays(),
};

const planoSalmosEmTrintaDias: ReadingPlan = {
  slug: "salmos-30-dias",
  titulo: "Salmos em 30 dias",
  descricao:
    "Leia todo o livro de Salmos em um mês, com cinco salmos por dia, fortalecendo oração, louvor e confiança em Deus.",
  duracao: 30,
  duracaoLabel: "30 dias",
  idealPara:
    "Períodos de oração, fortalecimento espiritual e constância devocional.",
  versiculoBase: "Salmos 119:11",
  imagem: "/fachada-da-igreja.jpg",
  destaque: "Oração diária",
  dias: splitIntoFixedDays(
    createBookSequenceBySlugs(["salmos"]),
    5,
    (day) => `Dia ${day} para meditar, orar e fortalecer a esperança no Senhor.`
  ),
};

const planoEvangelhosEmQuarentaDias: ReadingPlan = {
  slug: "evangelhos-40-dias",
  titulo: "Evangelhos em 40 dias",
  descricao:
    "Percorra Mateus, Marcos, Lucas e João em quarenta dias, contemplando a vida, os ensinos e a obra de Jesus.",
  duracao: 40,
  duracaoLabel: "40 dias",
  idealPara:
    "Discipulado, novos convertidos e tempos de renovação centrados em Cristo.",
  versiculoBase: "João 20:31",
  imagem: "/pulpito-da-igreja.jpg",
  destaque: "Foco em Cristo",
  dias: splitIntoBalancedDays(
    createBookSequenceBySlugs(["mateus", "marcos", "lucas", "joao"]),
    40,
    (day) => `Dia ${day} para contemplar a pessoa, os ensinos e os sinais de Jesus.`
  ),
};

const readingPlans: ReadingPlan[] = [
  planoBibliaEmUmAno,
  planoSalmosEmTrintaDias,
  planoEvangelhosEmQuarentaDias,
];

function formatReadingReference(reading: ReadingReference) {
  const book = getBibleBookBySlug(reading.livroSlug);

  return `${book?.nome ?? reading.livroSlug} ${reading.capitulo}`;
}

export function getReadingPlans() {
  return readingPlans;
}

export function getReadingPlanBySlug(slug: string) {
  return readingPlans.find((plan) => plan.slug === slug) ?? null;
}

export function getReadingPlanDay(plan: ReadingPlan, dia: number) {
  return plan.dias.find((day) => day.dia === dia) ?? null;
}

export function getReadingPlanSummary(plan: ReadingPlan) {
  return `${plan.duracaoLabel} • ${plan.idealPara}`;
}

export function getReadingPlanDailySummary(day: ReadingPlanDay) {
  return day.leituras.map(formatReadingReference).join(" • ");
}

export function getSuggestedReadingPlanDay(plan: ReadingPlan, date = new Date()) {
  const dayOfYear = getSaoPauloDayOfYear(date);

  return ((dayOfYear - 1) % plan.duracao) + 1;
}
