export interface Evento {
  data: string;        // ex: "02/03" ou "29–30/03"
  titulo: string;
  horario?: string;
  banner?: string;     // caminho em /public, ex: "/programacao/dia-da-mulher.png"
  destaque?: boolean;  // exibe card com banner em tamanho maior
}

export interface MesAgenda {
  mes: string;         // ex: "Março"
  ano: number;
  eventos: Evento[];
}

export interface ItemSemanal {
  dia: string;         // ex: "Terça-feira" ou "2º Sábado"
  titulo: string;
  horario?: string;
  icone?: string;      // emoji
  banner?: string;     // imagem do banner em /public
}

/* ──────────────────────────────────────────────
   PROGRAMAÇÃO SEMANAL FIXA
────────────────────────────────────────────── */
export const programacaoSemanal: ItemSemanal[] = [
  // Cultos semanais regulares
  {
    dia: "Terça-feira",
    titulo: "Culto",
    horario: "19h30",
    icone: "🙏",
    banner: "/programacao/culto-de-terça.png",
  },
  {
    dia: "Quarta-feira",
    titulo: "Culto de Damas",
    horario: "09h00",
    icone: "👩",
    banner: "/programacao/oração-matinal.png",
  },
  {
    dia: "Quinta-feira",
    titulo: "Culto de Jovens",
    horario: "19h30",
    icone: "🔥",
    banner: "/programacao/culto-de-jovens.png",
  },
  {
    dia: "Domingo",
    titulo: "Escola Bíblica Dominical",
    horario: "09h00",
    icone: "📖",
    banner: "/programacao/EBD.png",
  },
  {
    dia: "Domingo",
    titulo: "Culto da Noite",
    horario: "18h30",
    icone: "🌙",
    banner: "/programacao/culto-de-domingo.png",
  },
  // Recorrentes mensais
  {
    dia: "1ª Segunda do mês",
    titulo: "Reunião de Ministério",
    icone: "👥",
    banner: "/programacao/reuniao-ministerial.png",
  },
  {
    dia: "2º Sábado",
    titulo: "Santa Ceia",
    icone: "🍞",
    banner: "/programacao/consagração-mulheres.png",
  },
  {
    dia: "3º Sábado",
    titulo: "Reunião de Obreiros",
    icone: "👔",
    banner: "/programacao/culto-de-quinta.png",
  },
  {
    dia: "4º Sábado",
    titulo: "Culto com a Mocidade",
    icone: "🔥",
    banner: "/programacao/ensaio-jovens.png",
  },
];

/* ──────────────────────────────────────────────
   AGENDA 2026 — adicione/edite os meses aqui
────────────────────────────────────────────── */
export const agenda2026: MesAgenda[] = [
  {
    mes: "Março",
    ano: 2026,
    eventos: [
      { data: "02/03", titulo: "Reunião de Ministério" },
      { data: "09/03", titulo: "Curso de Teologia" },
      { data: "14/03", titulo: "Santa Ceia" },
      { data: "16/03", titulo: "Curso de Teologia" },
      { data: "21/03", titulo: "Reunião de Obreiros" },
      { data: "23/03", titulo: "Curso de Teologia" },
      {
        data: "28/03",
        titulo: "Confraternização Dia das Mulheres",
        horario: "19h00",
        destaque: true,
        banner: "/programacao/dia-da-mulher.png",
      },
      { data: "29/03", titulo: "Batismo" },
      { data: "30/03", titulo: "Curso de Teologia" },
    ],
  },
  {
    mes: "Abril",
    ano: 2026,
    eventos: [
      { data: "06/04", titulo: "Reunião de Ministério" },
      { data: "11/04", titulo: "Santa Ceia" },
      { data: "13,20,27/04", titulo: "Curso de Teologia" },
      { data: "18/04", titulo: "Reunião de Obreiros" },
      { data: "25/04", titulo: "Culto com a Mocidade" },
    ],
  },
  {
    mes: "Maio",
    ano: 2026,
    eventos: [
      { data: "04/05", titulo: "Reunião de Ministério" },
      { data: "09/05", titulo: "Santa Ceia" },
      { data: "11,18,25/05", titulo: "Curso de Teologia" },
      { data: "16/05", titulo: "Reunião de Obreiros" },
      { data: "23/05", titulo: "Culto com a Mocidade" },
      {
        data: "29–30/05",
        titulo: "Congresso Círculo de Oração",
        destaque: true,
        banner: "/programacao/circulo-de-oracao.png",
      },
    ],
  },
  {
    mes: "Junho",
    ano: 2026,
    eventos: [
      { data: "01/06", titulo: "Reunião de Ministério" },
      { data: "08,15,22,29/06", titulo: "Curso de Teologia" },
      { data: "13/06", titulo: "Santa Ceia" },
      { data: "20/06", titulo: "Reunião de Obreiros" },
      { data: "27/06", titulo: "Culto com a Mocidade" },
    ],
  },
];
