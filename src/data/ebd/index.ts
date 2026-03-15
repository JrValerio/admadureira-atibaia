import { adultos2026Trimestres } from "./adultos-2026";
import { infantil2026Trimestres } from "./infantil-2026";
import { jovens2026Trimestres } from "./jovens-2026";
import type { ClasseEBD, ClasseEBDInfo, TrimestreEBD } from "./types";

export * from "./types";

export const classesEBD: ClasseEBDInfo[] = [
  {
    slug: "adultos",
    label: "Adultos",
    descricao: "Classe voltada ao ensino bíblico contínuo para adultos, com ênfase em doutrina, comunhão e missão.",
    horarioLabel: "Todo domingo às 09h",
    textoBaseLabel: "Texto áureo",
    resumoDestaqueLabel: "Verdade prática",
    leituraPrincipalLabel: "Leitura bíblica em classe",
    publicadaNoSite: true,
    ordem: 1,
  },
  {
    slug: "jovens",
    label: "Jovens",
    descricao: "Classe para formação espiritual da juventude, com temas ligados à identidade, propósito e maturidade cristã.",
    horarioLabel: "Todo domingo às 09h",
    textoBaseLabel: "Texto principal",
    resumoDestaqueLabel: "Resumo da lição",
    leituraPrincipalLabel: "Texto bíblico",
    publicadaNoSite: true,
    ordem: 2,
  },
  {
    slug: "infantil",
    label: "Infantil",
    descricao: "Classe pensada para crianças crescerem em Jesus com linguagem simples, bíblica e acolhedora.",
    horarioLabel: "Todo domingo às 09h",
    textoBaseLabel: "Versículo-base",
    resumoDestaqueLabel: "Resumo da lição",
    leituraPrincipalLabel: "Leitura bíblica",
    publicadaNoSite: false,
    ordem: 3,
  },
];

export const trimestresEBDPorClasse: Record<ClasseEBD, TrimestreEBD[]> = {
  adultos: adultos2026Trimestres,
  jovens: jovens2026Trimestres,
  infantil: infantil2026Trimestres,
};

export const todosOsTrimestresEBD = Object.values(trimestresEBDPorClasse).flat();
