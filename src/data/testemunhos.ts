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
    slug: "familia-restaurada-em-cristo",
    nome: "Irmã A. S.",
    titulo: "Deus restaurou minha casa em um tempo de oração",
    resumo:
      "Após um período de crise familiar, a irmã encontrou acolhimento na igreja e perseverou em oração até ver Deus restaurar seu lar.",
    historia:
      "Durante um período difícil dentro de casa, senti meu coração cansado e sem direção. Foi nesse tempo que comecei a buscar mais a Deus em oração.\n\nNa AD Madureira Atibaia encontrei apoio espiritual, aconselhamento pastoral e comunhão com irmãos que me fortaleceram na fé.\n\nCom o passar do tempo, Deus trouxe paz, reconciliação e restauração para minha família. Hoje testemunho que o Senhor continua operando milagres na vida daqueles que confiam nele.",
    data: "2026-03-11",
  },
  {
    slug: "renovo-espiritual-na-presenca-de-deus",
    nome: "Irmão J. R.",
    titulo: "Encontrei renovo espiritual na presença de Deus",
    resumo:
      "Após um período de afastamento espiritual, o irmão voltou a buscar ao Senhor e encontrou renovo em sua vida.",
    historia:
      "Houve um tempo em que me senti espiritualmente distante e sem forças para continuar.\n\nAo retornar aos cultos e ouvir novamente a Palavra ministrada na igreja, senti meu coração ser renovado e fortalecido.\n\nHoje posso dizer que Deus restaurou minha alegria espiritual e renovou minha caminhada com Ele.",
    data: "2026-02-20",
  },
  {
    slug: "provisao-de-deus-em-tempo-dificil",
    nome: "Irmã M. P.",
    titulo: "Deus trouxe provisão em um momento de necessidade",
    resumo:
      "Mesmo enfrentando dificuldades financeiras, a irmã testemunha como Deus abriu portas e trouxe provisão no momento certo.",
    historia:
      "Passei por um período de grande dificuldade financeira e muitas vezes não sabia como resolver certas necessidades.\n\nMesmo assim continuei confiando em Deus e buscando orientação na Palavra.\n\nDe forma surpreendente, o Senhor abriu portas e trouxe provisão no tempo certo, mostrando mais uma vez seu cuidado e fidelidade.",
    data: "2026-02-10",
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
