export type ReadingPlanDay = {
  dia: number;
  leituras: string[];
  foco: string;
};

export type ReadingPlan = {
  slug: string;
  titulo: string;
  descricao: string;
  duracaoLabel: string;
  idealPara: string;
  versiculoBase: string;
  dias: ReadingPlanDay[];
};

const planoEvangelhoJoao: ReadingPlan = {
  slug: "evangelho-de-joao-21-dias",
  titulo: "Evangelho de João em 21 dias",
  descricao:
    "Plano para quem deseja conhecer mais de perto a pessoa de Jesus, sua mensagem e os sinais registrados no Evangelho de João.",
  duracaoLabel: "21 dias",
  idealPara: "Novos convertidos, visitantes e períodos de renovação espiritual.",
  versiculoBase: "João 20:31",
  dias: [
    { dia: 1, leituras: ["João 1"], foco: "Jesus, a Palavra viva" },
    { dia: 2, leituras: ["João 2"], foco: "O primeiro sinal e a glória de Cristo" },
    { dia: 3, leituras: ["João 3"], foco: "Novo nascimento e salvação" },
    { dia: 4, leituras: ["João 4"], foco: "Adoração verdadeira" },
    { dia: 5, leituras: ["João 5"], foco: "Autoridade do Filho" },
    { dia: 6, leituras: ["João 6"], foco: "Jesus, o pão da vida" },
    { dia: 7, leituras: ["João 7"], foco: "A sede espiritual e o Espírito" },
    { dia: 8, leituras: ["João 8"], foco: "A verdade que liberta" },
    { dia: 9, leituras: ["João 9"], foco: "Luz para quem quer enxergar" },
    { dia: 10, leituras: ["João 10"], foco: "O bom pastor" },
    { dia: 11, leituras: ["João 11"], foco: "Jesus e a esperança da ressurreição" },
    { dia: 12, leituras: ["João 12"], foco: "Entrega e adoração" },
    { dia: 13, leituras: ["João 13"], foco: "Serviço e amor" },
    { dia: 14, leituras: ["João 14"], foco: "Consolo e promessa" },
    { dia: 15, leituras: ["João 15"], foco: "Permanecer em Cristo" },
    { dia: 16, leituras: ["João 16"], foco: "O Espírito Consolador" },
    { dia: 17, leituras: ["João 17"], foco: "A oração sacerdotal de Jesus" },
    { dia: 18, leituras: ["João 18"], foco: "Fidelidade em meio ao sofrimento" },
    { dia: 19, leituras: ["João 19"], foco: "A cruz e a obra consumada" },
    { dia: 20, leituras: ["João 20"], foco: "A vitória da ressurreição" },
    { dia: 21, leituras: ["João 21"], foco: "Restauração e chamado" },
  ],
};

const planoSalmosEsperanca: ReadingPlan = {
  slug: "salmos-de-esperanca-14-dias",
  titulo: "Salmos de esperança em 14 dias",
  descricao:
    "Leituras curtas para tempos de oração, consolo e fortalecimento da fé, com foco na confiança em Deus nas lutas diárias.",
  duracaoLabel: "14 dias",
  idealPara: "Momentos de oração, aconselhamento e fortalecimento devocional.",
  versiculoBase: "Salmos 46:1",
  dias: [
    { dia: 1, leituras: ["Salmos 1", "Salmos 23"], foco: "O caminho do justo e o cuidado do Pastor" },
    { dia: 2, leituras: ["Salmos 27"], foco: "Confiança em meio ao temor" },
    { dia: 3, leituras: ["Salmos 34"], foco: "Deus ouve o clamor" },
    { dia: 4, leituras: ["Salmos 37"], foco: "Esperar com paciência no Senhor" },
    { dia: 5, leituras: ["Salmos 42", "Salmos 43"], foco: "Esperança para a alma abatida" },
    { dia: 6, leituras: ["Salmos 46"], foco: "Refúgio e fortaleza" },
    { dia: 7, leituras: ["Salmos 51"], foco: "Arrependimento e restauração" },
    { dia: 8, leituras: ["Salmos 63"], foco: "Sede de Deus" },
    { dia: 9, leituras: ["Salmos 84"], foco: "Alegria na casa do Senhor" },
    { dia: 10, leituras: ["Salmos 91"], foco: "Proteção e descanso" },
    { dia: 11, leituras: ["Salmos 103"], foco: "Lembrar os benefícios do Senhor" },
    { dia: 12, leituras: ["Salmos 121"], foco: "Socorro que vem do alto" },
    { dia: 13, leituras: ["Salmos 130"], foco: "Esperar pela misericórdia" },
    { dia: 14, leituras: ["Salmos 139"], foco: "Conhecidos e guardados por Deus" },
  ],
};

const readingPlans: ReadingPlan[] = [planoEvangelhoJoao, planoSalmosEsperanca];

export function getReadingPlans() {
  return readingPlans;
}

export function getReadingPlanBySlug(slug: string) {
  return readingPlans.find((plan) => plan.slug === slug) ?? null;
}
