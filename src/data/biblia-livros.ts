export type BibleBook = {
  id: string;
  slug: string;
  nome: string;
  capitulos: number;
  testamento: "Antigo Testamento" | "Novo Testamento";
};

export const bibleBooks: BibleBook[] = [
  { id: "GEN", slug: "genesis", nome: "Gênesis", capitulos: 50, testamento: "Antigo Testamento" },
  { id: "EXO", slug: "exodo", nome: "Êxodo", capitulos: 40, testamento: "Antigo Testamento" },
  { id: "LEV", slug: "levitico", nome: "Levítico", capitulos: 27, testamento: "Antigo Testamento" },
  { id: "NUM", slug: "numeros", nome: "Números", capitulos: 36, testamento: "Antigo Testamento" },
  { id: "DEU", slug: "deuteronomio", nome: "Deuteronômio", capitulos: 34, testamento: "Antigo Testamento" },
  { id: "JOS", slug: "josue", nome: "Josué", capitulos: 24, testamento: "Antigo Testamento" },
  { id: "JDG", slug: "juizes", nome: "Juízes", capitulos: 21, testamento: "Antigo Testamento" },
  { id: "RUT", slug: "rute", nome: "Rute", capitulos: 4, testamento: "Antigo Testamento" },
  { id: "1SA", slug: "1-samuel", nome: "1 Samuel", capitulos: 31, testamento: "Antigo Testamento" },
  { id: "2SA", slug: "2-samuel", nome: "2 Samuel", capitulos: 24, testamento: "Antigo Testamento" },
  { id: "1KI", slug: "1-reis", nome: "1 Reis", capitulos: 22, testamento: "Antigo Testamento" },
  { id: "2KI", slug: "2-reis", nome: "2 Reis", capitulos: 25, testamento: "Antigo Testamento" },
  { id: "1CH", slug: "1-cronicas", nome: "1 Crônicas", capitulos: 29, testamento: "Antigo Testamento" },
  { id: "2CH", slug: "2-cronicas", nome: "2 Crônicas", capitulos: 36, testamento: "Antigo Testamento" },
  { id: "EZR", slug: "esdras", nome: "Esdras", capitulos: 10, testamento: "Antigo Testamento" },
  { id: "NEH", slug: "neemias", nome: "Neemias", capitulos: 13, testamento: "Antigo Testamento" },
  { id: "EST", slug: "ester", nome: "Ester", capitulos: 10, testamento: "Antigo Testamento" },
  { id: "JOB", slug: "jo", nome: "Jó", capitulos: 42, testamento: "Antigo Testamento" },
  { id: "PSA", slug: "salmos", nome: "Salmos", capitulos: 150, testamento: "Antigo Testamento" },
  { id: "PRO", slug: "proverbios", nome: "Provérbios", capitulos: 31, testamento: "Antigo Testamento" },
  { id: "ECC", slug: "eclesiastes", nome: "Eclesiastes", capitulos: 12, testamento: "Antigo Testamento" },
  { id: "SNG", slug: "canticos", nome: "Cânticos", capitulos: 8, testamento: "Antigo Testamento" },
  { id: "ISA", slug: "isaias", nome: "Isaías", capitulos: 66, testamento: "Antigo Testamento" },
  { id: "JER", slug: "jeremias", nome: "Jeremias", capitulos: 52, testamento: "Antigo Testamento" },
  { id: "LAM", slug: "lamentacoes", nome: "Lamentações", capitulos: 5, testamento: "Antigo Testamento" },
  { id: "EZK", slug: "ezequiel", nome: "Ezequiel", capitulos: 48, testamento: "Antigo Testamento" },
  { id: "DAN", slug: "daniel", nome: "Daniel", capitulos: 12, testamento: "Antigo Testamento" },
  { id: "HOS", slug: "oseias", nome: "Oséias", capitulos: 14, testamento: "Antigo Testamento" },
  { id: "JOL", slug: "joel", nome: "Joel", capitulos: 3, testamento: "Antigo Testamento" },
  { id: "AMO", slug: "amos", nome: "Amós", capitulos: 9, testamento: "Antigo Testamento" },
  { id: "OBA", slug: "obadias", nome: "Obadias", capitulos: 1, testamento: "Antigo Testamento" },
  { id: "JON", slug: "jonas", nome: "Jonas", capitulos: 4, testamento: "Antigo Testamento" },
  { id: "MIC", slug: "miqueias", nome: "Miquéias", capitulos: 7, testamento: "Antigo Testamento" },
  { id: "NAM", slug: "naum", nome: "Naum", capitulos: 3, testamento: "Antigo Testamento" },
  { id: "HAB", slug: "habacuque", nome: "Habacuque", capitulos: 3, testamento: "Antigo Testamento" },
  { id: "ZEP", slug: "sofonias", nome: "Sofonias", capitulos: 3, testamento: "Antigo Testamento" },
  { id: "HAG", slug: "ageu", nome: "Ageu", capitulos: 2, testamento: "Antigo Testamento" },
  { id: "ZEC", slug: "zacarias", nome: "Zacarias", capitulos: 14, testamento: "Antigo Testamento" },
  { id: "MAL", slug: "malaquias", nome: "Malaquias", capitulos: 4, testamento: "Antigo Testamento" },
  { id: "MAT", slug: "mateus", nome: "Mateus", capitulos: 28, testamento: "Novo Testamento" },
  { id: "MRK", slug: "marcos", nome: "Marcos", capitulos: 16, testamento: "Novo Testamento" },
  { id: "LUK", slug: "lucas", nome: "Lucas", capitulos: 24, testamento: "Novo Testamento" },
  { id: "JHN", slug: "joao", nome: "João", capitulos: 21, testamento: "Novo Testamento" },
  { id: "ACT", slug: "atos", nome: "Atos", capitulos: 28, testamento: "Novo Testamento" },
  { id: "ROM", slug: "romanos", nome: "Romanos", capitulos: 16, testamento: "Novo Testamento" },
  { id: "1CO", slug: "1-corintios", nome: "1 Coríntios", capitulos: 16, testamento: "Novo Testamento" },
  { id: "2CO", slug: "2-corintios", nome: "2 Coríntios", capitulos: 13, testamento: "Novo Testamento" },
  { id: "GAL", slug: "galatas", nome: "Gálatas", capitulos: 6, testamento: "Novo Testamento" },
  { id: "EPH", slug: "efesios", nome: "Efésios", capitulos: 6, testamento: "Novo Testamento" },
  { id: "PHP", slug: "filipenses", nome: "Filipenses", capitulos: 4, testamento: "Novo Testamento" },
  { id: "COL", slug: "colossenses", nome: "Colossenses", capitulos: 4, testamento: "Novo Testamento" },
  { id: "1TH", slug: "1-tessalonicenses", nome: "1 Tessalonicenses", capitulos: 5, testamento: "Novo Testamento" },
  { id: "2TH", slug: "2-tessalonicenses", nome: "2 Tessalonicenses", capitulos: 3, testamento: "Novo Testamento" },
  { id: "1TI", slug: "1-timoteo", nome: "1 Timóteo", capitulos: 6, testamento: "Novo Testamento" },
  { id: "2TI", slug: "2-timoteo", nome: "2 Timóteo", capitulos: 4, testamento: "Novo Testamento" },
  { id: "TIT", slug: "tito", nome: "Tito", capitulos: 3, testamento: "Novo Testamento" },
  { id: "PHM", slug: "filemom", nome: "Filemom", capitulos: 1, testamento: "Novo Testamento" },
  { id: "HEB", slug: "hebreus", nome: "Hebreus", capitulos: 13, testamento: "Novo Testamento" },
  { id: "JAS", slug: "tiago", nome: "Tiago", capitulos: 5, testamento: "Novo Testamento" },
  { id: "1PE", slug: "1-pedro", nome: "1 Pedro", capitulos: 5, testamento: "Novo Testamento" },
  { id: "2PE", slug: "2-pedro", nome: "2 Pedro", capitulos: 3, testamento: "Novo Testamento" },
  { id: "1JN", slug: "1-joao", nome: "1 João", capitulos: 5, testamento: "Novo Testamento" },
  { id: "2JN", slug: "2-joao", nome: "2 João", capitulos: 1, testamento: "Novo Testamento" },
  { id: "3JN", slug: "3-joao", nome: "3 João", capitulos: 1, testamento: "Novo Testamento" },
  { id: "JUD", slug: "judas", nome: "Judas", capitulos: 1, testamento: "Novo Testamento" },
  { id: "REV", slug: "apocalipse", nome: "Apocalipse", capitulos: 22, testamento: "Novo Testamento" },
];

export function getBibleBooksByTestament(testamento: BibleBook["testamento"]) {
  return bibleBooks.filter((book) => book.testamento === testamento);
}

export function getBibleBookById(id: string) {
  return bibleBooks.find((book) => book.id === id) ?? null;
}

export function getBibleBookBySlug(slug: string) {
  return bibleBooks.find((book) => book.slug === slug) ?? null;
}
