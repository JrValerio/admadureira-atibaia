export interface Mensagem {
  slug: string;
  titulo: string;
  pregador?: string;
  data: string;
  resumo: string;
  versiculo?: string;
  youtubeId: string;
  capa?: string;
}

const mensagens: Mensagem[] = [
  {
    slug: "culto-da-familia-especial-cristina-maranhao",
    titulo:
      "Culto da Família Especial | Missionária Cristina Maranhão | AD Madureira Atibaia",
    pregador: "Missionária Cristina Maranhão",
    data: "2026-01-25",
    resumo:
      "Mensagem ministrada em um culto especial da família, com ênfase na edificação do lar, na comunhão cristã e no fortalecimento da fé.",
    youtubeId: "iXVuDQRxrlw",
    capa: "/banners/banner-culto-da-familia.jpg",
  },
  {
    slug: "reuniao-de-obreiros-com-cicero-nogueira",
    titulo: "Culto e Reunião de Obreiros com Cicero Nogueira",
    pregador: "Cicero Nogueira",
    data: "2026-02-21",
    resumo:
      "Ministração voltada à liderança e ao serviço cristão, destacando compromisso ministerial, unidade da igreja e fidelidade à Palavra.",
    youtubeId: "TThk0ZEd3OU",
    capa: "/programacao/reuniao-ministerial.png",
  },
  {
    slug: "culto-especial-da-familia-mulheres-virtuosas",
    titulo: "Culto Especial da Família – Mulheres Virtuosas",
    data: "2026-03-08",
    resumo:
      "Culto especial com foco na família e no papel da mulher cristã, reunindo a igreja para um momento de adoração, comunhão e ensino bíblico.",
    youtubeId: "juq8QkL3urY",
    capa: "/banners/banner-culto-para-mulheres.jpg",
  },
  {
    slug: "campanha-jejum-e-oracao-com-pr-wantuil",
    titulo: "Campanha Jejum e Oração | Palavra com Pr. Wantuil",
    pregador: "Pr. Wantuil",
    data: "2026-03-05",
    resumo:
      "Mensagem ministrada durante a campanha de jejum e oração, chamando a igreja à perseverança espiritual, à consagração e à confiança em Deus.",
    versiculo: "Joel 3:10",
    youtubeId: "l87g14Ei6lc",
    capa: "/banners/banner-campanha-de-quinta.jpg",
  },
  {
    slug: "culto-da-familia-palavra-para-fortalecer-lares",
    titulo: "Culto da Família | Palavra para Fortalecer Lares",
    data: "2026-03-01",
    resumo:
      "Culto dedicado ao fortalecimento das famílias, com exortação bíblica, adoração congregacional e encorajamento para a vida cristã no lar.",
    youtubeId: "_OJUyJQhoGQ",
    capa: "/programacao/culto-da-familia.jpg",
  },
];

export function getMensagens() {
  return mensagens;
}

export function getMensagemBySlug(slug: string) {
  return mensagens.find((mensagem) => mensagem.slug === slug) ?? null;
}
