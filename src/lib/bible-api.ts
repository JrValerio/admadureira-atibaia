type BibleApiVerse = {
  book_id: string;
  book: string;
  chapter: number;
  verse: number;
  text: string;
};

type BibleApiResponse = {
  translation: {
    identifier: string;
    name: string;
    language: string;
    language_code: string;
    license: string;
  };
  verses: BibleApiVerse[];
};

export type BibleChapter = {
  livro: string;
  capitulo: number;
  traducao: string;
  idioma: string;
  idiomaCodigo: string;
  versiculos: {
    numero: number;
    texto: string;
  }[];
};

export async function getBibleChapter(
  bookId: string,
  chapter: number,
  version = "almeida"
) {
  const response = await fetch(
    `https://bible-api.com/data/${version}/${bookId}/${chapter}`,
    {
      next: { revalidate: 86400 },
    }
  );

  if (!response.ok) {
    throw new Error("Não foi possível carregar o capítulo solicitado.");
  }

  const data = (await response.json()) as BibleApiResponse;

  if (!data.verses?.length) {
    throw new Error("Capítulo bíblico sem conteúdo disponível.");
  }

  return {
    livro: data.verses[0].book,
    capitulo: data.verses[0].chapter,
    traducao: data.translation.name,
    idioma: data.translation.language,
    idiomaCodigo: data.translation.language_code,
    versiculos: data.verses.map((verse) => ({
      numero: verse.verse,
      texto: verse.text.trim(),
    })),
  } satisfies BibleChapter;
}
