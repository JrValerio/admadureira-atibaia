import type { LeituraSemanalItem } from "./types";

export type SementeJovensTerceiroTrimestre = {
  numero: number;
  data: string;
  titulo: string;
  textoPrincipal: string;
  resumo: string;
  leituraSemanal: LeituraSemanalItem[];
  textoBiblico: string[];
  dataEspecial?: string;
};

export const sementesJovensTerceiroTrimestre: SementeJovensTerceiroTrimestre[] = [
  {
    numero: 1,
    data: "2026-07-05",
    titulo: "O Livro de Juízes: Quando Cada um Fazia o que Parecia Certo",
    textoPrincipal: "Juízes 17.6",
    resumo:
      "Deus cumpre seus propósitos por meio de instrumentos humanos, escolhidos e capacitados por Ele, apesar da fraqueza do homem.",
    leituraSemanal: [
      { dia: "Segunda", referencia: "Josué 1.1-9", foco: "Tende bom ânimo" },
      { dia: "Terça", referencia: "Josué 3.1-17", foco: "A travessia do Jordão" },
      {
        dia: "Quarta",
        referencia: "Josué 23",
        foco: "Um chamado à fidelidade exclusiva a Deus",
      },
      { dia: "Quinta", referencia: "Hebreus 11.32", foco: "Juízes como heróis da fé" },
      {
        dia: "Sexta",
        referencia: "Romanos 13.1,2",
        foco: "Toda autoridade é constituída por Deus",
      },
      {
        dia: "Sábado",
        referencia: "Atos 2.14-21",
        foco: "Liderando no poder do Espírito",
      },
    ],
    textoBiblico: ["Josué 24.26-30", "Juízes 1.1", "Juízes 17.6"],
  },
  {
    numero: 2,
    data: "2026-07-12",
    titulo: "Fidelidade a Deus: Uma Questão de Escolha",
    textoPrincipal: "Juízes 2.11",
    resumo:
      "A fidelidade a Deus exige um alto custo, mas tem uma grande recompensa.",
    leituraSemanal: [
      { dia: "Segunda", referencia: "Deuteronômio 7.9", foco: "Deus é fiel" },
      {
        dia: "Terça",
        referencia: "2 Timóteo 2.13",
        foco: "O Senhor não pode negar a si mesmo",
      },
      { dia: "Quarta", referencia: "Apocalipse 2.10", foco: "A recompensa da fidelidade" },
      { dia: "Quinta", referencia: "Hebreus 12.6", foco: "O Senhor corrige ao que ama" },
      { dia: "Sexta", referencia: "Mateus 6.24", foco: "Deus exige exclusividade" },
      { dia: "Sábado", referencia: "Êxodo 20.3-6", foco: "O pecado da idolatria" },
    ],
    textoBiblico: ["Juízes 2.1-6", "Juízes 2.10-13"],
  },
  {
    numero: 3,
    data: "2026-07-19",
    titulo: "Clamor e Libertação: A Liderança de Otniel",
    textoPrincipal: "Juízes 3.9",
    resumo: "A liderança servidora e abnegada é uma marca da vida cristã.",
    leituraSemanal: [
      { dia: "Segunda", referencia: "Romanos 5.3,4", foco: "Gloriando na tribulação" },
      { dia: "Terça", referencia: "Efésios 6.10-17", foco: "Preparados para a batalha" },
      { dia: "Quarta", referencia: "2 Coríntios 6.14", foco: "Cuidado com o jugo desigual" },
      { dia: "Quinta", referencia: "Gálatas 5.1", foco: "Firmes na liberdade de Cristo" },
      { dia: "Sexta", referencia: "Marcos 10.42-45", foco: "O líder servidor" },
      { dia: "Sábado", referencia: "Atos 1.8", foco: "Capacitados pelo Espírito" },
    ],
    textoBiblico: ["Juízes 3.5-11"],
  },
  {
    numero: 4,
    data: "2026-07-26",
    titulo: "Eúde e Sangar: Deus Usa os Improváveis",
    textoPrincipal: "Juízes 3.15",
    resumo:
      "Deus realiza seus propósitos por meio daqueles que o mundo considera incapazes.",
    leituraSemanal: [
      {
        dia: "Segunda",
        referencia: "1 Coríntios 1.27-29",
        foco: "Deus escolheu as coisas loucas e vis",
      },
      { dia: "Terça", referencia: "Efésios 3.6", foco: "A bênção estendida aos gentios" },
      { dia: "Quarta", referencia: "Filipenses 2.5-8", foco: "Jesus humilhou-se a si mesmo" },
      { dia: "Quinta", referencia: "Mateus 10.42", foco: "O valor dos pequenos gestos" },
      { dia: "Sexta", referencia: "Lucas 16.10", foco: "Seja fiel no pouco" },
      { dia: "Sábado", referencia: "Zacarias 4.10", foco: "Não despreze as pequenas coisas" },
    ],
    textoBiblico: ["Juízes 3.12-21", "Juízes 3.29-31"],
  },
  {
    numero: 5,
    data: "2026-08-02",
    titulo: "Débora e Baraque: União para Fazer a Obra de Deus",
    textoPrincipal: "Juízes 4.14",
    resumo:
      "A obra de Deus é feita em cooperação, cada pessoa contribuindo com os talentos que o Senhor lhe concedeu.",
    leituraSemanal: [
      { dia: "Segunda", referencia: "Gálatas 6.2", foco: "Levando as cargas uns dos outros" },
      { dia: "Terça", referencia: "Hebreus 10.23-25", foco: "Encorajando uns aos outros" },
      { dia: "Quarta", referencia: "1 Coríntios 3.6-9", foco: "Cooperação na obra de Deus" },
      { dia: "Quinta", referencia: "1 Coríntios 12.12-27", foco: "Cada membro tem a sua função" },
      { dia: "Sexta", referencia: "1 Coríntios 10.31", foco: "Façam tudo para a glória de Deus" },
      { dia: "Sábado", referencia: "Gálatas 3.28", foco: "Todos somos um em Cristo" },
    ],
    textoBiblico: ["Juízes 4.1-9", "Juízes 4.14-21"],
  },
  {
    numero: 6,
    data: "2026-08-09",
    titulo: "Gideão: Deus Transforma a Insegurança em Coragem",
    textoPrincipal: "Juízes 6.12",
    resumo:
      "Mesmo diante das limitações, Deus capacita e conduz à vitória aqueles que confiam nEle.",
    leituraSemanal: [
      { dia: "Segunda", referencia: "1 Timóteo 4.2", foco: "O perigo da mente cauterizada" },
      { dia: "Terça", referencia: "João 10.10", foco: "As ações do ladrão" },
      { dia: "Quarta", referencia: "Isaías 40.31", foco: "Renovando as forças" },
      {
        dia: "Quinta",
        referencia: "Romanos 8.35-39",
        foco: "Quem nos afastará do amor de Cristo?",
      },
      { dia: "Sexta", referencia: "1 João 2.14", foco: "Jovens, sois fortes!" },
      { dia: "Sábado", referencia: "Romanos 8.37", foco: "Somos mais que vencedores" },
    ],
    textoBiblico: ["Juízes 6.1-5", "Juízes 6.11-16"],
  },
  {
    numero: 7,
    data: "2026-08-16",
    titulo: "O Fim da Liderança de Gideão e o Governo de Abimeleque",
    textoPrincipal: "Juízes 9.6",
    resumo:
      "A liderança cristã deve ser exercida em constante vigilância, para que os líderes não sejam seduzidos pelo orgulho e pelo poder.",
    leituraSemanal: [
      { dia: "Segunda", referencia: "Salmos 139.23", foco: "Sonda-me, ó Deus" },
      { dia: "Terça", referencia: "1 Coríntios 16.13", foco: "Sejam vigilantes" },
      { dia: "Quarta", referencia: "1 Coríntios 10.12", foco: "Cuide para que não caia" },
      { dia: "Quinta", referencia: "Provérbios 16.18", foco: "A soberba precede a ruína" },
      {
        dia: "Sexta",
        referencia: "1 Pedro 5.2,3",
        foco: "Não cuide do rebanho com má vontade",
      },
      { dia: "Sábado", referencia: "João 10.12,13", foco: "O perigo dos mercenários" },
    ],
    textoBiblico: ["Juízes 8.22-24", "Juízes 9.1-6"],
  },
  {
    numero: 8,
    data: "2026-08-23",
    titulo: "Jefté: De Rejeitado a Libertador",
    textoPrincipal: "Juízes 11.6",
    resumo:
      "Em tudo o que fazemos é preciso ter fé e coragem, mas também atitudes sábias e prudentes.",
    leituraSemanal: [
      { dia: "Segunda", referencia: "Provérbios 28.13", foco: "Aquele que confessa e deixa" },
      { dia: "Terça", referencia: "Tiago 2.26", foco: "Fé sem obras é morta" },
      { dia: "Quarta", referencia: "Eclesiastes 5.4,5", foco: "Cuidado ao fazer um voto" },
      { dia: "Quinta", referencia: "Eclesiastes 3.1", foco: "Tudo tem o seu tempo" },
      { dia: "Sexta", referencia: "Colossenses 1.9", foco: "Inteligência espiritual" },
      { dia: "Sábado", referencia: "Salmos 133", foco: "A beleza da unidade" },
    ],
    textoBiblico: ["Juízes 10.15-18", "Juízes 11.1-6"],
  },
  {
    numero: 9,
    data: "2026-08-30",
    titulo: "Sansão: A Força e a Fraqueza de um Jovem",
    textoPrincipal: "Juízes 13.24",
    resumo:
      "Por mais que Deus use alguém de forma extraordinária, a natureza humana ainda carrega fragilidades.",
    leituraSemanal: [
      { dia: "Segunda", referencia: "Romanos 12.2", foco: "Não vos conformeis com este mundo" },
      { dia: "Terça", referencia: "Romanos 6.16", foco: "Não seja escravo" },
      { dia: "Quarta", referencia: "1 Pedro 1.15,16", foco: "Seja santo" },
      { dia: "Quinta", referencia: "Romanos 5.8", foco: "Cristo, o libertador" },
      { dia: "Sexta", referencia: "1 João 2.14", foco: "A força dos jovens" },
      { dia: "Sábado", referencia: "Tiago 4.7", foco: "Resistindo ao Diabo" },
    ],
    textoBiblico: ["Juízes 13.1-7", "Juízes 13.24,25", "Juízes 14.1-3"],
  },
  {
    numero: 10,
    data: "2026-09-06",
    titulo: "Sansão: Entre Vitórias e Derrotas",
    textoPrincipal: "Juízes 16.28",
    resumo:
      "Entre vitórias e derrotas, o cristão aprende que a obediência fortalece, mas o pecado enfraquece.",
    leituraSemanal: [
      { dia: "Segunda", referencia: "Gálatas 6.1,2", foco: "Cuidando do irmão" },
      { dia: "Terça", referencia: "João 7.37,38", foco: "Jesus, água da vida" },
      { dia: "Quarta", referencia: "1 Coríntios 6.18,19", foco: "Fuja da prostituição" },
      { dia: "Quinta", referencia: "Provérbios 4.23", foco: "Cuidado com as confidências" },
      { dia: "Sexta", referencia: "Provérbios 16.18", foco: "A soberba precede a ruína" },
      { dia: "Sábado", referencia: "Romanos 8.37-39", foco: "Mais que vencedores" },
    ],
    textoBiblico: ["Juízes 15.1-4", "Juízes 16.1-4", "Juízes 16.28-30"],
  },
  {
    numero: 11,
    data: "2026-09-13",
    titulo: "Crise Espiritual e Falsa Religiosidade",
    textoPrincipal: "Juízes 17.5",
    resumo:
      "O abandono do verdadeiro culto a Deus leva à crise espiritual e produz uma falsa religiosidade.",
    leituraSemanal: [
      { dia: "Segunda", referencia: "Colossenses 2.22,23", foco: "Preceitos de homens" },
      { dia: "Terça", referencia: "2 Pedro 2.1-3", foco: "O perigo das heresias" },
      { dia: "Quarta", referencia: "2 Timóteo 3.5", foco: "Aparência de piedade" },
      { dia: "Quinta", referencia: "Atos 8.18-20", foco: "O pecado da simonia" },
      { dia: "Sexta", referencia: "Tiago 1.27", foco: "A verdadeira religião" },
      { dia: "Sábado", referencia: "João 4.23,24", foco: "Verdadeiros adoradores" },
    ],
    textoBiblico: ["Juízes 17.1-13"],
    dataEspecial: "Dia Nacional de Missões",
  },
  {
    numero: 12,
    data: "2026-09-20",
    titulo: "Tempos de Decadência Moral e Maldade",
    textoPrincipal: "Juízes 19.30",
    resumo:
      "Quando o povo se afasta de Deus e de seus princípios, a sociedade entra em decadência.",
    leituraSemanal: [
      { dia: "Segunda", referencia: "Gênesis 2.24", foco: "O plano de Deus" },
      { dia: "Terça", referencia: "Mateus 24.12", foco: "A multiplicação da iniquidade" },
      { dia: "Quarta", referencia: "Salmos 11.3", foco: "Fundamentos transtornados" },
      { dia: "Quinta", referencia: "1 Pedro 5.8", foco: "Vigiando sempre" },
      { dia: "Sexta", referencia: "Romanos 1.26,27", foco: "Confrontando a depravação" },
      {
        dia: "Sábado",
        referencia: "Miqueias 6.8; 1 Timóteo 5.8",
        foco: "Protegendo os vulneráveis",
      },
    ],
    textoBiblico: ["Juízes 19.1-3", "Juízes 19.14,15", "Juízes 19.20-23"],
    dataEspecial: "Dia Nacional da Escola Dominical",
  },
  {
    numero: 13,
    data: "2026-09-27",
    titulo: "Esperança em Meio ao Caos: Aguardando a Vinda do Rei",
    textoPrincipal: "Juízes 21.25",
    resumo:
      "Mesmo em meio ao caos, há esperança, pois Deus conduz a história e sustenta aqueles que confiam nEle.",
    leituraSemanal: [
      {
        dia: "Segunda",
        referencia: "Provérbios 17.15; Romanos 1.32",
        foco: "O erro da cumplicidade com o pecado",
      },
      { dia: "Terça", referencia: "Mateus 23.23", foco: "A hipocrisia religiosa" },
      { dia: "Quarta", referencia: "2 Timóteo 3.1-5", foco: "Dias trabalhosos" },
      { dia: "Quinta", referencia: "2 Samuel 7.12-16", foco: "Aliança davídica" },
      { dia: "Sexta", referencia: "Jeremias 29.11", foco: "Vivendo em esperança" },
      { dia: "Sábado", referencia: "Apocalipse 19.16", foco: "Jesus, Rei dos reis" },
    ],
    textoBiblico: ["Juízes 21.1-3", "Juízes 21.6-10", "Juízes 21.25"],
  },
];
