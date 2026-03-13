export const DEFAULT_BIBLE_LANGUAGE = "pt" as const;
export const DEFAULT_BIBLE_VERSION = "almeida" as const;

export const BIBLE_LANGUAGES = {
  pt: {
    label: "Português",
  },
  en: {
    label: "English",
  },
} as const;

export const BIBLE_VERSIONS = {
  pt: [
    {
      id: "almeida",
      label: "João Ferreira de Almeida",
    },
  ],
  en: [
    {
      id: "web",
      label: "World English Bible",
    },
    {
      id: "bbe",
      label: "Bible in Basic English",
    },
    {
      id: "kjv",
      label: "King James Version",
    },
  ],
} as const;

export type BibleLanguage = keyof typeof BIBLE_LANGUAGES;
export type BibleVersion =
  (typeof BIBLE_VERSIONS)[keyof typeof BIBLE_VERSIONS][number]["id"];

export function getBibleLanguage(value?: string | null): BibleLanguage {
  if (value && value in BIBLE_LANGUAGES) {
    return value as BibleLanguage;
  }

  return DEFAULT_BIBLE_LANGUAGE;
}

export function getBibleVersionsForLanguage(language: BibleLanguage) {
  return [...BIBLE_VERSIONS[language]];
}

export function getBibleVersion(
  language: BibleLanguage,
  value?: string | null
): BibleVersion {
  const versions = getBibleVersionsForLanguage(language);

  if (value && versions.some((version) => version.id === value)) {
    return value as BibleVersion;
  }

  return versions[0]?.id ?? DEFAULT_BIBLE_VERSION;
}

export function getBibleLanguageLabel(language: BibleLanguage) {
  return BIBLE_LANGUAGES[language].label;
}

export function getBibleVersionLabel(
  language: BibleLanguage,
  version: BibleVersion
) {
  const match = getBibleVersionsForLanguage(language).find(
    (item) => item.id === version
  );

  return match?.label ?? version;
}
