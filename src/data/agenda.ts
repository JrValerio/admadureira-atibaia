export interface Evento {
  slug: string;
  data: string; // ex: "02/03" ou "29–30/05"
  titulo: string;
  horario?: string;
  descricao?: string;
  local?: string;
  imagem?: string;
  banner?: string;
  destaque?: boolean;
}

export interface MesAgenda {
  mes: string;
  mesNumero?: number;
  ano: number;
  eventos: Evento[];
}

export interface ItemSemanal {
  dia: string;
  titulo: string;
  horario?: string;
  icone?: string;
  banner?: string;
}

export const LOCAL_EVENTO_PADRAO =
  "Sede - Praça Pio XII, 122, Centro, Atibaia/SP";

/* ──────────────────────────────────────────────
   PROGRAMAÇÃO SEMANAL FIXA
────────────────────────────────────────────── */
export const programacaoSemanal: ItemSemanal[] = [
  {
    dia: "Terça-feira",
    titulo: "Culto de Libertação",
    horario: "19h30",
    icone: "🙏",
    banner: "/programacao/culto-de-terca.png",
  },
  {
    dia: "Quarta-feira",
    titulo: "Culto de Damas",
    horario: "09h00",
    icone: "👩",
    banner: "/programacao/oracao-matinal.png",
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
    titulo: "Oração Matinal",
    horario: "07h00",
    icone: "🌅",
    banner: "/programacao/oracao-matinal-domingo.png",
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
    banner: "/programacao/consagracao-mulheres.png",
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
   AGENDA 2026 — fonte única para home, /eventos e /programacao
────────────────────────────────────────────── */
export const agenda2026: MesAgenda[] = [
  {
    mes: "Março",
    mesNumero: 3,
    ano: 2026,
    eventos: [
      {
        slug: "reuniao-de-ministerio-02-03-2026",
        data: "02/03",
        titulo: "Reunião de Ministério",
        descricao:
          "Encontro de alinhamento e oração com a liderança ministerial da igreja.",
        local: LOCAL_EVENTO_PADRAO,
        imagem: "/programacao/reuniao-ministerial.png",
      },
      {
        slug: "curso-de-teologia-09-03-2026",
        data: "09/03",
        titulo: "Curso de Teologia",
        horario: "19h30",
        descricao:
          "Aula de formação bíblica e doutrinária para crescimento espiritual da igreja.",
        local: LOCAL_EVENTO_PADRAO,
        imagem: "/pulpito-da-igreja.jpg",
      },
      {
        slug: "santa-ceia-14-03-2026",
        data: "14/03",
        titulo: "Santa Ceia",
        horario: "18h30",
        descricao:
          "Culto de comunhão e gratidão em memória do sacrifício de Cristo.",
        local: LOCAL_EVENTO_PADRAO,
        imagem: "/programacao/consagracao-mulheres.png",
      },
      {
        slug: "curso-de-teologia-16-03-2026",
        data: "16/03",
        titulo: "Curso de Teologia",
        horario: "19h30",
        descricao:
          "Aula de formação bíblica e doutrinária para crescimento espiritual da igreja.",
        local: LOCAL_EVENTO_PADRAO,
        imagem: "/pulpito-da-igreja.jpg",
      },
      {
        slug: "reuniao-de-obreiros-21-03-2026",
        data: "21/03",
        titulo: "Reunião de Obreiros",
        horario: "18h00",
        descricao:
          "Reunião ministerial com obreiros para comunhão, direção e oração.",
        local: LOCAL_EVENTO_PADRAO,
        imagem: "/programacao/culto-de-quinta.png",
      },
      {
        slug: "curso-de-teologia-23-03-2026",
        data: "23/03",
        titulo: "Curso de Teologia",
        horario: "19h30",
        descricao:
          "Aula de formação bíblica e doutrinária para crescimento espiritual da igreja.",
        local: LOCAL_EVENTO_PADRAO,
        imagem: "/pulpito-da-igreja.jpg",
      },
      {
        slug: "confraternizacao-dia-das-mulheres-28-03-2026",
        data: "28/03",
        titulo: "Confraternização Dia das Mulheres",
        horario: "19h00",
        descricao:
          "Culto especial de celebração e comunhão voltado às mulheres, com louvor, ministração e palavra.",
        local: LOCAL_EVENTO_PADRAO,
        imagem: "/programacao/dia-da-mulher.png",
        banner: "/programacao/dia-da-mulher.png",
        destaque: true,
      },
      {
        slug: "batismo-29-03-2026",
        data: "29/03",
        titulo: "Batismo",
        horario: "09h00",
        descricao:
          "Celebração do batismo nas águas para novos convertidos e membros da igreja.",
        local: LOCAL_EVENTO_PADRAO,
        imagem: "/fachada-da-igreja.jpg",
      },
      {
        slug: "curso-de-teologia-30-03-2026",
        data: "30/03",
        titulo: "Curso de Teologia",
        horario: "19h30",
        descricao:
          "Aula de formação bíblica e doutrinária para crescimento espiritual da igreja.",
        local: LOCAL_EVENTO_PADRAO,
        imagem: "/pulpito-da-igreja.jpg",
      },
    ],
  },
  {
    mes: "Abril",
    mesNumero: 4,
    ano: 2026,
    eventos: [
      {
        slug: "reuniao-de-ministerio-06-04-2026",
        data: "06/04",
        titulo: "Reunião de Ministério",
        descricao:
          "Encontro de alinhamento e oração com a liderança ministerial da igreja.",
        local: LOCAL_EVENTO_PADRAO,
        imagem: "/programacao/reuniao-ministerial.png",
      },
      {
        slug: "santa-ceia-11-04-2026",
        data: "11/04",
        titulo: "Santa Ceia",
        horario: "18h30",
        descricao:
          "Culto de comunhão e gratidão em memória do sacrifício de Cristo.",
        local: LOCAL_EVENTO_PADRAO,
        imagem: "/programacao/consagracao-mulheres.png",
      },
      {
        slug: "curso-de-teologia-13-04-2026",
        data: "13/04",
        titulo: "Curso de Teologia",
        horario: "19h30",
        descricao:
          "Aula de formação bíblica e doutrinária para crescimento espiritual da igreja.",
        local: LOCAL_EVENTO_PADRAO,
        imagem: "/pulpito-da-igreja.jpg",
      },
      {
        slug: "reuniao-de-obreiros-18-04-2026",
        data: "18/04",
        titulo: "Reunião de Obreiros",
        horario: "18h00",
        descricao:
          "Reunião ministerial com obreiros para comunhão, direção e oração.",
        local: LOCAL_EVENTO_PADRAO,
        imagem: "/programacao/culto-de-quinta.png",
      },
      {
        slug: "curso-de-teologia-20-04-2026",
        data: "20/04",
        titulo: "Curso de Teologia",
        horario: "19h30",
        descricao:
          "Aula de formação bíblica e doutrinária para crescimento espiritual da igreja.",
        local: LOCAL_EVENTO_PADRAO,
        imagem: "/pulpito-da-igreja.jpg",
      },
      {
        slug: "culto-com-a-mocidade-25-04-2026",
        data: "25/04",
        titulo: "Culto com a Mocidade",
        horario: "19h30",
        descricao:
          "Culto especial dirigido pela mocidade, com participação dos jovens no louvor e na palavra.",
        local: LOCAL_EVENTO_PADRAO,
        imagem: "/programacao/ensaio-jovens.png",
      },
      {
        slug: "curso-de-teologia-27-04-2026",
        data: "27/04",
        titulo: "Curso de Teologia",
        horario: "19h30",
        descricao:
          "Aula de formação bíblica e doutrinária para crescimento espiritual da igreja.",
        local: LOCAL_EVENTO_PADRAO,
        imagem: "/pulpito-da-igreja.jpg",
      },
    ],
  },
  {
    mes: "Maio",
    mesNumero: 5,
    ano: 2026,
    eventos: [
      {
        slug: "reuniao-de-ministerio-04-05-2026",
        data: "04/05",
        titulo: "Reunião de Ministério",
        descricao:
          "Encontro de alinhamento e oração com a liderança ministerial da igreja.",
        local: LOCAL_EVENTO_PADRAO,
        imagem: "/programacao/reuniao-ministerial.png",
      },
      {
        slug: "santa-ceia-09-05-2026",
        data: "09/05",
        titulo: "Santa Ceia",
        horario: "18h30",
        descricao:
          "Culto de comunhão e gratidão em memória do sacrifício de Cristo.",
        local: LOCAL_EVENTO_PADRAO,
        imagem: "/programacao/consagracao-mulheres.png",
      },
      {
        slug: "curso-de-teologia-11-05-2026",
        data: "11/05",
        titulo: "Curso de Teologia",
        horario: "19h30",
        descricao:
          "Aula de formação bíblica e doutrinária para crescimento espiritual da igreja.",
        local: LOCAL_EVENTO_PADRAO,
        imagem: "/pulpito-da-igreja.jpg",
      },
      {
        slug: "reuniao-de-obreiros-16-05-2026",
        data: "16/05",
        titulo: "Reunião de Obreiros",
        horario: "18h00",
        descricao:
          "Reunião ministerial com obreiros para comunhão, direção e oração.",
        local: LOCAL_EVENTO_PADRAO,
        imagem: "/programacao/culto-de-quinta.png",
      },
      {
        slug: "curso-de-teologia-18-05-2026",
        data: "18/05",
        titulo: "Curso de Teologia",
        horario: "19h30",
        descricao:
          "Aula de formação bíblica e doutrinária para crescimento espiritual da igreja.",
        local: LOCAL_EVENTO_PADRAO,
        imagem: "/pulpito-da-igreja.jpg",
      },
      {
        slug: "culto-com-a-mocidade-23-05-2026",
        data: "23/05",
        titulo: "Culto com a Mocidade",
        horario: "19h30",
        descricao:
          "Culto especial dirigido pela mocidade, com participação dos jovens no louvor e na palavra.",
        local: LOCAL_EVENTO_PADRAO,
        imagem: "/programacao/ensaio-jovens.png",
      },
      {
        slug: "curso-de-teologia-25-05-2026",
        data: "25/05",
        titulo: "Curso de Teologia",
        horario: "19h30",
        descricao:
          "Aula de formação bíblica e doutrinária para crescimento espiritual da igreja.",
        local: LOCAL_EVENTO_PADRAO,
        imagem: "/pulpito-da-igreja.jpg",
      },
      {
        slug: "congresso-circulo-de-oracao-29-05-2026",
        data: "29–30/05",
        titulo: "Congresso Círculo de Oração",
        descricao:
          "Dois dias de culto, oração e ministração especial com a participação do círculo de oração da igreja.",
        local: LOCAL_EVENTO_PADRAO,
        imagem: "/programacao/circulo-de-oracao.png",
        banner: "/programacao/circulo-de-oracao.png",
        destaque: true,
      },
    ],
  },
  {
    mes: "Junho",
    mesNumero: 6,
    ano: 2026,
    eventos: [
      {
        slug: "reuniao-de-ministerio-01-06-2026",
        data: "01/06",
        titulo: "Reunião de Ministério",
        descricao:
          "Encontro de alinhamento e oração com a liderança ministerial da igreja.",
        local: LOCAL_EVENTO_PADRAO,
        imagem: "/programacao/reuniao-ministerial.png",
      },
      {
        slug: "curso-de-teologia-08-06-2026",
        data: "08/06",
        titulo: "Curso de Teologia",
        horario: "19h30",
        descricao:
          "Aula de formação bíblica e doutrinária para crescimento espiritual da igreja.",
        local: LOCAL_EVENTO_PADRAO,
        imagem: "/pulpito-da-igreja.jpg",
      },
      {
        slug: "santa-ceia-13-06-2026",
        data: "13/06",
        titulo: "Santa Ceia",
        horario: "18h30",
        descricao:
          "Culto de comunhão e gratidão em memória do sacrifício de Cristo.",
        local: LOCAL_EVENTO_PADRAO,
        imagem: "/programacao/consagracao-mulheres.png",
      },
      {
        slug: "curso-de-teologia-15-06-2026",
        data: "15/06",
        titulo: "Curso de Teologia",
        horario: "19h30",
        descricao:
          "Aula de formação bíblica e doutrinária para crescimento espiritual da igreja.",
        local: LOCAL_EVENTO_PADRAO,
        imagem: "/pulpito-da-igreja.jpg",
      },
      {
        slug: "reuniao-de-obreiros-20-06-2026",
        data: "20/06",
        titulo: "Reunião de Obreiros",
        horario: "18h00",
        descricao:
          "Reunião ministerial com obreiros para comunhão, direção e oração.",
        local: LOCAL_EVENTO_PADRAO,
        imagem: "/programacao/culto-de-quinta.png",
      },
      {
        slug: "curso-de-teologia-22-06-2026",
        data: "22/06",
        titulo: "Curso de Teologia",
        horario: "19h30",
        descricao:
          "Aula de formação bíblica e doutrinária para crescimento espiritual da igreja.",
        local: LOCAL_EVENTO_PADRAO,
        imagem: "/pulpito-da-igreja.jpg",
      },
      {
        slug: "culto-com-a-mocidade-27-06-2026",
        data: "27/06",
        titulo: "Culto com a Mocidade",
        horario: "19h30",
        descricao:
          "Culto especial dirigido pela mocidade, com participação dos jovens no louvor e na palavra.",
        local: LOCAL_EVENTO_PADRAO,
        imagem: "/programacao/ensaio-jovens.png",
      },
      {
        slug: "curso-de-teologia-29-06-2026",
        data: "29/06",
        titulo: "Curso de Teologia",
        horario: "19h30",
        descricao:
          "Aula de formação bíblica e doutrinária para crescimento espiritual da igreja.",
        local: LOCAL_EVENTO_PADRAO,
        imagem: "/pulpito-da-igreja.jpg",
      },
    ],
  },
];
