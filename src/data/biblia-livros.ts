export type BibleBook = {
  id: string;
  nome: string;
  testamento: "Antigo Testamento" | "Novo Testamento";
};

export const bibleBooks: BibleBook[] = [
  { id: "GEN", nome: "Gênesis", testamento: "Antigo Testamento" },
  { id: "EXO", nome: "Êxodo", testamento: "Antigo Testamento" },
  { id: "LEV", nome: "Levítico", testamento: "Antigo Testamento" },
  { id: "NUM", nome: "Números", testamento: "Antigo Testamento" },
  { id: "DEU", nome: "Deuteronômio", testamento: "Antigo Testamento" },
  { id: "JOS", nome: "Josué", testamento: "Antigo Testamento" },
  { id: "JDG", nome: "Juízes", testamento: "Antigo Testamento" },
  { id: "RUT", nome: "Rute", testamento: "Antigo Testamento" },
  { id: "1SA", nome: "1 Samuel", testamento: "Antigo Testamento" },
  { id: "2SA", nome: "2 Samuel", testamento: "Antigo Testamento" },
  { id: "1KI", nome: "1 Reis", testamento: "Antigo Testamento" },
  { id: "2KI", nome: "2 Reis", testamento: "Antigo Testamento" },
  { id: "1CH", nome: "1 Crônicas", testamento: "Antigo Testamento" },
  { id: "2CH", nome: "2 Crônicas", testamento: "Antigo Testamento" },
  { id: "EZR", nome: "Esdras", testamento: "Antigo Testamento" },
  { id: "NEH", nome: "Neemias", testamento: "Antigo Testamento" },
  { id: "EST", nome: "Ester", testamento: "Antigo Testamento" },
  { id: "JOB", nome: "Jó", testamento: "Antigo Testamento" },
  { id: "PSA", nome: "Salmos", testamento: "Antigo Testamento" },
  { id: "PRO", nome: "Provérbios", testamento: "Antigo Testamento" },
  { id: "ECC", nome: "Eclesiastes", testamento: "Antigo Testamento" },
  { id: "SNG", nome: "Cânticos", testamento: "Antigo Testamento" },
  { id: "ISA", nome: "Isaías", testamento: "Antigo Testamento" },
  { id: "JER", nome: "Jeremias", testamento: "Antigo Testamento" },
  { id: "LAM", nome: "Lamentações", testamento: "Antigo Testamento" },
  { id: "EZK", nome: "Ezequiel", testamento: "Antigo Testamento" },
  { id: "DAN", nome: "Daniel", testamento: "Antigo Testamento" },
  { id: "HOS", nome: "Oséias", testamento: "Antigo Testamento" },
  { id: "JOL", nome: "Joel", testamento: "Antigo Testamento" },
  { id: "AMO", nome: "Amós", testamento: "Antigo Testamento" },
  { id: "OBA", nome: "Obadias", testamento: "Antigo Testamento" },
  { id: "JON", nome: "Jonas", testamento: "Antigo Testamento" },
  { id: "MIC", nome: "Miquéias", testamento: "Antigo Testamento" },
  { id: "NAM", nome: "Naum", testamento: "Antigo Testamento" },
  { id: "HAB", nome: "Habacuque", testamento: "Antigo Testamento" },
  { id: "ZEP", nome: "Sofonias", testamento: "Antigo Testamento" },
  { id: "HAG", nome: "Ageu", testamento: "Antigo Testamento" },
  { id: "ZEC", nome: "Zacarias", testamento: "Antigo Testamento" },
  { id: "MAL", nome: "Malaquias", testamento: "Antigo Testamento" },
  { id: "MAT", nome: "Mateus", testamento: "Novo Testamento" },
  { id: "MRK", nome: "Marcos", testamento: "Novo Testamento" },
  { id: "LUK", nome: "Lucas", testamento: "Novo Testamento" },
  { id: "JHN", nome: "João", testamento: "Novo Testamento" },
  { id: "ACT", nome: "Atos", testamento: "Novo Testamento" },
  { id: "ROM", nome: "Romanos", testamento: "Novo Testamento" },
  { id: "1CO", nome: "1 Coríntios", testamento: "Novo Testamento" },
  { id: "2CO", nome: "2 Coríntios", testamento: "Novo Testamento" },
  { id: "GAL", nome: "Gálatas", testamento: "Novo Testamento" },
  { id: "EPH", nome: "Efésios", testamento: "Novo Testamento" },
  { id: "PHP", nome: "Filipenses", testamento: "Novo Testamento" },
  { id: "COL", nome: "Colossenses", testamento: "Novo Testamento" },
  { id: "1TH", nome: "1 Tessalonicenses", testamento: "Novo Testamento" },
  { id: "2TH", nome: "2 Tessalonicenses", testamento: "Novo Testamento" },
  { id: "1TI", nome: "1 Timóteo", testamento: "Novo Testamento" },
  { id: "2TI", nome: "2 Timóteo", testamento: "Novo Testamento" },
  { id: "TIT", nome: "Tito", testamento: "Novo Testamento" },
  { id: "PHM", nome: "Filemom", testamento: "Novo Testamento" },
  { id: "HEB", nome: "Hebreus", testamento: "Novo Testamento" },
  { id: "JAS", nome: "Tiago", testamento: "Novo Testamento" },
  { id: "1PE", nome: "1 Pedro", testamento: "Novo Testamento" },
  { id: "2PE", nome: "2 Pedro", testamento: "Novo Testamento" },
  { id: "1JN", nome: "1 João", testamento: "Novo Testamento" },
  { id: "2JN", nome: "2 João", testamento: "Novo Testamento" },
  { id: "3JN", nome: "3 João", testamento: "Novo Testamento" },
  { id: "JUD", nome: "Judas", testamento: "Novo Testamento" },
  { id: "REV", nome: "Apocalipse", testamento: "Novo Testamento" },
];

export function getBibleBooksByTestament(testamento: BibleBook["testamento"]) {
  return bibleBooks.filter((book) => book.testamento === testamento);
}

export function getBibleBookById(id: string) {
  return bibleBooks.find((book) => book.id === id) ?? null;
}
