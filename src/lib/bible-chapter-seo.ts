import type { BibleBook } from "@/data/biblia-livros";

type BookGroup = {
  label: string;
  metadataSnippet: string;
  intro: string;
};

const PENTATEUCH = new Set([
  "genesis",
  "exodo",
  "levitico",
  "numeros",
  "deuteronomio",
]);

const HISTORICAL_BOOKS = new Set([
  "josue",
  "juizes",
  "rute",
  "1-samuel",
  "2-samuel",
  "1-reis",
  "2-reis",
  "1-cronicas",
  "2-cronicas",
  "esdras",
  "neemias",
  "ester",
]);

const WISDOM_BOOKS = new Set([
  "jo",
  "salmos",
  "proverbios",
  "eclesiastes",
  "canticos",
]);

const MAJOR_PROPHETS = new Set([
  "isaias",
  "jeremias",
  "lamentacoes",
  "ezequiel",
  "daniel",
]);

const GOSPELS = new Set(["mateus", "marcos", "lucas", "joao"]);
const PAULINE_EPISTLES = new Set([
  "romanos",
  "1-corintios",
  "2-corintios",
  "galatas",
  "efesios",
  "filipenses",
  "colossenses",
  "1-tessalonicenses",
  "2-tessalonicenses",
  "1-timoteo",
  "2-timoteo",
  "tito",
  "filemom",
]);

const GENERAL_EPISTLES = new Set([
  "hebreus",
  "tiago",
  "1-pedro",
  "2-pedro",
  "1-joao",
  "2-joao",
  "3-joao",
  "judas",
]);

function getBookGroup(book: BibleBook): BookGroup {
  if (PENTATEUCH.has(book.slug)) {
    return {
      label: "Pentateuco",
      metadataSnippet:
        "Este livro faz parte do Pentateuco e reúne fundamentos da revelação bíblica, da aliança e da formação do povo de Deus.",
      intro:
        "O Pentateuco apresenta os fundamentos da criação, da aliança e da formação do povo de Deus. Este capítulo pode ser lido para estudo bíblico, meditação e compreensão do início da narrativa bíblica.",
    };
  }

  if (HISTORICAL_BOOKS.has(book.slug)) {
    return {
      label: "Livros históricos",
      metadataSnippet:
        "Este livro pertence aos livros históricos e mostra como Deus conduziu seu povo em diferentes momentos da história bíblica.",
      intro:
        "Os livros históricos registram a atuação de Deus na caminhada do seu povo, revelando obediência, quedas, restauração e direção divina. Este capítulo oferece contexto para leitura devocional e estudo da história bíblica.",
    };
  }

  if (WISDOM_BOOKS.has(book.slug)) {
    return {
      label: "Livros poéticos e sapienciais",
      metadataSnippet:
        "Este livro faz parte dos livros poéticos e sapienciais, com textos de oração, louvor, sabedoria e reflexão espiritual.",
      intro:
        "Os livros poéticos e sapienciais reúnem orações, louvores, sabedoria prática e reflexões sobre a vida diante de Deus. Este capítulo ajuda na meditação, na devoção pessoal e na oração diária.",
    };
  }

  if (MAJOR_PROPHETS.has(book.slug)) {
    return {
      label: "Profetas maiores",
      metadataSnippet:
        "Este livro faz parte dos profetas maiores e traz mensagens de exortação, esperança, juízo e restauração.",
      intro:
        "Os profetas maiores registram mensagens de exortação, esperança, juízo e restauração dirigidas ao povo de Deus. Este capítulo ajuda a compreender o chamado à fidelidade e a esperança das promessas divinas.",
    };
  }

  if (book.testamento === "Antigo Testamento") {
    return {
      label: "Profetas menores",
      metadataSnippet:
        "Este livro pertence ao bloco profético do Antigo Testamento, com apelos à fidelidade, arrependimento e esperança.",
      intro:
        "Os profetas do Antigo Testamento chamam o povo à fidelidade, ao arrependimento e à confiança na justiça e misericórdia do Senhor. Este capítulo pode ser usado para reflexão bíblica e estudo temático.",
    };
  }

  if (GOSPELS.has(book.slug)) {
    return {
      label: "Evangelhos",
      metadataSnippet:
        "Este livro pertence aos Evangelhos e apresenta a vida, os ensinos, os milagres e a obra redentora de Jesus.",
      intro:
        "Os Evangelhos apresentam a pessoa de Jesus, seus ensinos, milagres e a obra da salvação. Este capítulo é um ponto importante para leitura cristocêntrica, discipulado e meditação espiritual.",
    };
  }

  if (book.slug === "atos") {
    return {
      label: "Igreja primitiva",
      metadataSnippet:
        "Este livro mostra a expansão da igreja primitiva, a ação do Espírito Santo e o avanço do Evangelho.",
      intro:
        "Atos dos Apóstolos registra a expansão da igreja, a ação do Espírito Santo e o avanço do Evangelho entre os povos. Este capítulo fortalece a compreensão da missão cristã e da vida da igreja.",
    };
  }

  if (PAULINE_EPISTLES.has(book.slug)) {
    return {
      label: "Cartas paulinas",
      metadataSnippet:
        "Este livro pertence às cartas paulinas, com ensino doutrinário, aconselhamento pastoral e aplicação para a vida cristã.",
      intro:
        "As cartas paulinas oferecem ensino doutrinário, aconselhamento pastoral e aplicação prática para a vida cristã. Este capítulo pode ser usado para estudo bíblico, discipulado e fortalecimento da fé.",
    };
  }

  if (GENERAL_EPISTLES.has(book.slug)) {
    return {
      label: "Cartas gerais",
      metadataSnippet:
        "Este livro pertence às cartas gerais do Novo Testamento e traz exortações para perseverança, santidade e maturidade espiritual.",
      intro:
        "As cartas gerais do Novo Testamento reúnem exortações à perseverança, santidade e maturidade espiritual. Este capítulo ajuda na leitura pastoral, no encorajamento e na prática da fé.",
    };
  }

  return {
    label: "Apocalipse",
    metadataSnippet:
      "Este livro apresenta linguagem profética e esperança escatológica, revelando a soberania de Cristo e a vitória final de Deus.",
    intro:
      "Apocalipse apresenta visões proféticas, esperança escatológica e a certeza da vitória final de Cristo. Este capítulo pode ser lido com reverência, oração e atenção ao consolo que Deus oferece ao seu povo.",
  };
}

export function getBibleChapterSeo(book: BibleBook, chapter: number) {
  const group = getBookGroup(book);
  const chapterLabel = `${book.nome} ${chapter}`;

  return {
    chapterLabel,
    groupLabel: group.label,
    metadataDescription: `Leia ${chapterLabel} na Bíblia Online em português. ${group.metadataSnippet}`,
    introTitle: `${chapterLabel} na Bíblia Online`,
    introText: `${group.intro} Leia ${chapterLabel} na tradução João Ferreira de Almeida e use o texto para meditação, leitura devocional e estudo bíblico.`,
    keywords: [
      "bíblia online",
      book.nome.toLowerCase(),
      `${book.nome.toLowerCase()} ${chapter}`,
      `${book.nome.toLowerCase()} ${chapter} significado`,
      `${book.nome.toLowerCase()} ${chapter} bíblia`,
      group.label.toLowerCase(),
      "joão ferreira de almeida",
    ],
  };
}
