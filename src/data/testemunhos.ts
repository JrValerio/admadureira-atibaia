export interface Testemunho {
  slug: string;
  nome: string;
  titulo: string;
  resumo: string;
  historia: string;
  data: string;
  foto?: string;
  youtubeId?: string;
}

const testemunhos: Testemunho[] = [
  {
    slug: "familia-restaurada",
    nome: "Maria da Silva",
    titulo: "Uma família restaurada pela fé",
    resumo:
      "Depois de um período difícil em sua família, Maria encontrou na fé e na comunidade da igreja um caminho de restauração.",
    historia:
      "Maria compartilha como Deus transformou sua família através da oração, da Palavra e do apoio da igreja.\n\nDurante um período de dificuldades, ela encontrou na comunhão com a igreja um ambiente de acolhimento, aconselhamento e fortalecimento espiritual.\n\nCom o cuidado pastoral, a perseverança em oração e o apoio da comunidade cristã, sua família foi restaurada e sua caminhada com Deus se tornou ainda mais firme.",
    data: "2025-10-10",
  },
];

export function getTestemunhos() {
  return testemunhos;
}

export function getTestemunhoBySlug(slug: string) {
  return testemunhos.find((testemunho) => testemunho.slug === slug) ?? null;
}

export function getTestemunhosRecentes(limit = testemunhos.length) {
  return [...testemunhos]
    .sort((a, b) => Date.parse(b.data) - Date.parse(a.data))
    .slice(0, limit);
}
