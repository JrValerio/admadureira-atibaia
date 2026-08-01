import type { EventoTipo } from "@/data/agenda-visuais";
import { CONGRESSO_RIOS_DE_UNCAO_2026 as congressoRiosDeUncao } from "@/data/congresso-rios-de-uncao-2026";
import type {
  ConteudoRelacionadoLink,
  MesAgendaBase,
  ReferenciaBiblicaLink,
} from "@/data/agenda-types";
import { buildBibleReferenceHref } from "@/lib/bible-reference";

type EventoConfig = {
  slug: string;
  data: string;
  titulo: string;
  tipo: EventoTipo;
  descricao: string;
  convite?: string;
  baseBiblica?: ReferenciaBiblicaLink[];
  recursos?: ConteudoRelacionadoLink[];
  horario?: string;
  local?: string;
  destaque?: boolean;
  imagem?: string;
  banner?: string;
  hero?: string;
};

function criarEvento(local: string, config: EventoConfig) {
  return {
    ...config,
    baseBiblica:
      config.baseBiblica ?? BASE_BIBLICA_PADRAO_POR_TIPO[config.tipo],
    local: config.local ?? local,
  };
}

function criarBaseBiblica(
  ...referencias: string[]
): ReferenciaBiblicaLink[] {
  return referencias.map((referencia) => ({
    referencia,
    href: buildBibleReferenceHref(referencia) ?? "/espiritualidade/biblia",
  }));
}

const BASE_BIBLICA_PADRAO_POR_TIPO: Partial<
  Record<EventoTipo, ReferenciaBiblicaLink[]>
> = {
  "curso-de-teologia": criarBaseBiblica(
    "2 Timóteo 2:15",
    "Oséias 6:3"
  ),
  "reuniao-de-ministerio": criarBaseBiblica(
    "Atos 6:4",
    "1 Pedro 5:2-3"
  ),
  "santa-ceia": criarBaseBiblica(
    "1 Coríntios 11:23-26",
    "Lucas 22:19-20"
  ),
  "reuniao-de-obreiros": criarBaseBiblica(
    "1 Coríntios 4:2",
    "2 Timóteo 2:2"
  ),
  "culto-com-a-mocidade": criarBaseBiblica(
    "1 Timóteo 4:12",
    "Eclesiastes 12:1"
  ),
  batismo: criarBaseBiblica("Mateus 28:19", "Romanos 6:4"),
};

export function getEventosEspeciais2026(local: string): MesAgendaBase[] {
  const cursoTeologiaDescricao =
    [
      "Uma igreja que deseja permanecer firme precisa cultivar também o estudo sério da Palavra. O Curso de Teologia reúne ensino bíblico, formação doutrinária e preparo ministerial para quem deseja amadurecer na fé e servir com responsabilidade.",
      "Não se trata de conhecimento por vaidade, mas de entendimento que gera reverência, discernimento e compromisso com o Evangelho.",
    ].join("\n\n");
  const cursoTeologiaConvite =
    "Venha aprofundar seu conhecimento bíblico, amadurecer espiritualmente e servir ao Senhor com mais clareza, convicção e temor.";
  const cursoTeologiaBaseBiblica = criarBaseBiblica(
    "2 Timóteo 2:15",
    "Oséias 6:3"
  );

  const reuniaoMinisterioDescricao =
    [
      "A reunião de ministério é o lugar onde o serviço deixa de ser improviso e volta a ser responsabilidade espiritual. Antes de escalas, decisões e tarefas, a liderança se reúne para orar, alinhar a visão e cuidar da obra com temor.",
      "Ministério saudável se constrói com joelhos no chão, Bíblia aberta e consciência de que vidas estão sendo pastoreadas.",
    ].join("\n\n");
  const reuniaoMinisterioConvite =
    "É um tempo de unidade, direção e fortalecimento para quem serve na obra do Senhor com compromisso e reverência.";
  const reuniaoMinisterioBaseBiblica = criarBaseBiblica(
    "Atos 6:4",
    "1 Pedro 5:2-3"
  );

  const santaCeiaDescricao =
    [
      "A Santa Ceia é um dos momentos mais solenes da vida da igreja. À mesa do Senhor, a congregação relembra o sacrifício de Cristo, reafirma a comunhão do corpo e renova a esperança na promessa da sua volta.",
      "Não é rito vazio nem costume repetido no automático. É memória, aliança, reverência, exame sincero e gratidão profunda pela obra da cruz.",
    ].join("\n\n");
  const santaCeiaConvite =
    "Participe conosco deste momento santo de comunhão com o Senhor, reverência à cruz e renovação da aliança com Cristo.";
  const santaCeiaBaseBiblica = criarBaseBiblica(
    "1 Coríntios 11:23-26",
    "Lucas 22:19-20"
  );

  const reuniaoObreirosDescricao =
    [
      "Servir na obra exige mais do que disposição; exige fidelidade, unidade e temor. A reunião de obreiros é um tempo de alinhamento pastoral, fortalecimento espiritual e cuidado com aqueles que ajudam a sustentar o serviço da igreja.",
      "É o tipo de encontro que reforça a responsabilidade do chamado e lembra que a obra de Deus deve ser conduzida com seriedade e coração ensinável.",
    ].join("\n\n");
  const reuniaoObreirosConvite =
    "Se você serve como obreiro, participe deste tempo de comunhão, direção e fortalecimento para continuar servindo ao Senhor com fidelidade.";
  const reuniaoObreirosBaseBiblica = criarBaseBiblica(
    "1 Coríntios 4:2",
    "2 Timóteo 2:2"
  );

  const cultoMocidadeDescricao =
    [
      "Quando a mocidade se reúne para cultuar, a igreja testemunha que juventude não é só energia: é chamado, voz e propósito nas mãos de Deus. Este culto especial reúne jovens em adoração, comunhão e ministração da Palavra.",
      "É uma noite em que dons são colocados no altar e corações são despertados para viver a fé com coragem, santidade e identidade em Cristo.",
    ].join("\n\n");
  const cultoMocidadeConvite =
    "A mocidade tem voz, tem chamado e tem propósito. Venha cultuar conosco e viver uma noite de fé, comunhão e entrega diante de Deus.";
  const cultoMocidadeBaseBiblica = criarBaseBiblica(
    "1 Timóteo 4:12",
    "Eclesiastes 12:1"
  );

  const batismoDescricao =
    [
      "O batismo nas águas é um dos testemunhos públicos mais marcantes da caminhada cristã. Ele declara diante da igreja e da cidade que uma vida alcançada pela graça decidiu seguir a Cristo em obediência, fé e nova caminhada.",
      "Mais do que uma cerimônia, o batismo é memória viva do Evangelho: morrer para o velho homem e ressurgir para uma vida firmada em Jesus.",
    ].join("\n\n");
  const batismoConvite =
    "Venha celebrar conosco este momento marcante de obediência, testemunho e alegria na presença de Deus.";

  const congressoCirculoOracaoDescricao =
    "O Congresso do Círculo de Oração — Baluarte da Fé é um encontro preparado para mulheres, famílias e toda a igreja viverem dias de renovação espiritual, comunhão e fortalecimento na presença de Deus. Com o tema “Em tempos de dor, as prioridades mudam”, baseado em II Samuel 21:10, o congresso propõe uma reflexão profunda sobre fé, perseverança, oração e posicionamento espiritual em tempos difíceis. Serão duas noites de louvor, ministração da Palavra e celebração ao Senhor, reunindo servas de Deus com trajetórias marcadas por dedicação, compromisso ministerial e amor pela obra.";
  const congressoCirculoOracaoConvite =
    "A Igreja Assembleia de Deus — Ministério Madureira Campo de Atibaia convida você e sua família para participarem deste congresso especial. Venha com o coração aberto para adorar, ouvir a Palavra e ser fortalecido pela presença de Deus. Será um tempo precioso de fé, comunhão e edificação espiritual. Esperamos por você nos dias 29 e 30 de maio, às 19h30, na Praça Pio XII, 122 — Centro — Atibaia/SP.";
  const congressoCirculoOracaoBaseBiblica = criarBaseBiblica("II Samuel 21:10");

  return [
    {
      mes: "Janeiro",
      mesNumero: 1,
      ano: 2026,
      eventos: [
        criarEvento(local, {
          slug: "reuniao-de-ministerio-05-01-2026",
          data: "05/01",
          titulo: "Reunião de Ministério",
          tipo: "reuniao-de-ministerio",
          horario: "19h30",
          descricao: reuniaoMinisterioDescricao,
          convite: reuniaoMinisterioConvite,
          baseBiblica: reuniaoMinisterioBaseBiblica,
        }),
        criarEvento(local, {
          slug: "santa-ceia-e-reuniao-de-obreiros-10-01-2026",
          data: "10/01",
          titulo: "Santa Ceia e Reunião de Obreiros",
          tipo: "santa-ceia",
          horario: "19h00",
          descricao:
            "Culto especial que une a solenidade da mesa do Senhor à comunhão ministerial dos obreiros, em uma noite de reverência, alinhamento espiritual e gratidão pela obra de Cristo.",
          convite:
            "Participe conosco deste encontro santo de comunhão com o Senhor e fortalecimento da obra no templo sede.",
          baseBiblica: santaCeiaBaseBiblica,
          destaque: true,
        }),
      ],
    },
    {
      mes: "Fevereiro",
      mesNumero: 2,
      ano: 2026,
      eventos: [
        criarEvento(local, {
          slug: "reuniao-de-ministerio-02-02-2026",
          data: "02/02",
          titulo: "Reunião de Ministério",
          tipo: "reuniao-de-ministerio",
          horario: "19h30",
          descricao: reuniaoMinisterioDescricao,
          convite: reuniaoMinisterioConvite,
          baseBiblica: reuniaoMinisterioBaseBiblica,
        }),
        criarEvento(local, {
          slug: "curso-de-teologia-09-02-2026",
          data: "09/02",
          titulo: "Curso de Teologia",
          tipo: "curso-de-teologia",
          horario: "19h00",
          descricao: cursoTeologiaDescricao,
          convite: cursoTeologiaConvite,
          baseBiblica: cursoTeologiaBaseBiblica,
        }),
        criarEvento(local, {
          slug: "santa-ceia-14-02-2026",
          data: "14/02",
          titulo: "Santa Ceia",
          tipo: "santa-ceia",
          horario: "19h00",
          descricao: santaCeiaDescricao,
          convite: santaCeiaConvite,
          baseBiblica: santaCeiaBaseBiblica,
        }),
        criarEvento(local, {
          slug: "curso-de-teologia-16-02-2026",
          data: "16/02",
          titulo: "Curso de Teologia",
          tipo: "curso-de-teologia",
          horario: "19h00",
          descricao: cursoTeologiaDescricao,
          convite: cursoTeologiaConvite,
          baseBiblica: cursoTeologiaBaseBiblica,
        }),
        criarEvento(local, {
          slug: "reuniao-de-obreiros-21-02-2026",
          data: "21/02",
          titulo: "Reunião de Obreiros",
          tipo: "reuniao-de-obreiros",
          horario: "19h30",
          descricao: reuniaoObreirosDescricao,
          convite: reuniaoObreirosConvite,
          baseBiblica: reuniaoObreirosBaseBiblica,
        }),
        criarEvento(local, {
          slug: "curso-de-teologia-23-02-2026",
          data: "23/02",
          titulo: "Curso de Teologia",
          tipo: "curso-de-teologia",
          horario: "19h00",
          descricao: cursoTeologiaDescricao,
          convite: cursoTeologiaConvite,
          baseBiblica: cursoTeologiaBaseBiblica,
        }),
        criarEvento(local, {
          slug: "culto-com-a-mocidade-28-02-2026",
          data: "28/02",
          titulo: "Culto com a Mocidade",
          tipo: "culto-com-a-mocidade",
          horario: "19h00",
          descricao: cultoMocidadeDescricao,
          convite: cultoMocidadeConvite,
          baseBiblica: cultoMocidadeBaseBiblica,
        }),
      ],
    },
    {
      mes: "Março",
      mesNumero: 3,
      ano: 2026,
      eventos: [
        criarEvento(local, {
          slug: "reuniao-de-ministerio-02-03-2026",
          data: "02/03",
          titulo: "Reunião de Ministério",
          tipo: "reuniao-de-ministerio",
          horario: "19h30",
          descricao: reuniaoMinisterioDescricao,
          convite: reuniaoMinisterioConvite,
        }),
        criarEvento(local, {
          slug: "curso-de-teologia-09-03-2026",
          data: "09/03",
          titulo: "Curso de Teologia",
          tipo: "curso-de-teologia",
          horario: "19h00",
          descricao: cursoTeologiaDescricao,
          convite: cursoTeologiaConvite,
        }),
        criarEvento(local, {
          slug: "santa-ceia-14-03-2026",
          data: "14/03",
          titulo: "Santa Ceia",
          tipo: "santa-ceia",
          horario: "19h00",
          descricao: santaCeiaDescricao,
          convite: santaCeiaConvite,
        }),
        criarEvento(local, {
          slug: "curso-de-teologia-16-03-2026",
          data: "16/03",
          titulo: "Curso de Teologia",
          tipo: "curso-de-teologia",
          horario: "19h00",
          descricao: cursoTeologiaDescricao,
          convite: cursoTeologiaConvite,
        }),
        criarEvento(local, {
          slug: "reuniao-de-obreiros-21-03-2026",
          data: "21/03",
          titulo: "Reunião de Obreiros",
          tipo: "reuniao-de-obreiros",
          horario: "19h30",
          descricao: reuniaoObreirosDescricao,
          convite: reuniaoObreirosConvite,
        }),
        criarEvento(local, {
          slug: "curso-de-teologia-23-03-2026",
          data: "23/03",
          titulo: "Curso de Teologia",
          tipo: "curso-de-teologia",
          horario: "19h00",
          descricao: cursoTeologiaDescricao,
          convite: cursoTeologiaConvite,
        }),
        criarEvento(local, {
          slug: "confraternizacao-departamento-feminino-28-03-2026",
          data: "28/03",
          titulo: "Confraternização do Departamento Feminino",
          tipo: "dia-das-mulheres",
          horario: "19h00",
          descricao:
            "Encontro especial do departamento feminino com louvor, comunhão e palavra voltada à edificação das irmãs.",
          destaque: true,
        }),
        criarEvento(local, {
          slug: "batismo-29-03-2026",
          data: "29/03",
          titulo: "Batismo",
          tipo: "batismo",
          horario: "09h30",
          descricao: batismoDescricao,
          convite: batismoConvite,
          destaque: true,
        }),
        criarEvento(local, {
          slug: "curso-de-teologia-30-03-2026",
          data: "30/03",
          titulo: "Curso de Teologia",
          tipo: "curso-de-teologia",
          horario: "19h00",
          descricao: cursoTeologiaDescricao,
          convite: cursoTeologiaConvite,
        }),
      ],
    },
    {
      mes: "Abril",
      mesNumero: 4,
      ano: 2026,
      eventos: [
        criarEvento(local, {
          slug: "batismo-05-04-2026",
          data: "05/04",
          titulo: "Batismo",
          tipo: "batismo",
          horario: "09h30",
          descricao: batismoDescricao,
          convite: batismoConvite,
          destaque: true,
        }),
        criarEvento(local, {
          slug: "reuniao-de-ministerio-06-04-2026",
          data: "06/04",
          titulo: "Reunião de Ministério",
          tipo: "reuniao-de-ministerio",
          horario: "19h30",
          descricao: reuniaoMinisterioDescricao,
          convite: reuniaoMinisterioConvite,
        }),
        criarEvento(local, {
          slug: "santa-ceia-11-04-2026",
          data: "11/04",
          titulo: "Santa Ceia",
          tipo: "santa-ceia",
          horario: "19h00",
          descricao: santaCeiaDescricao,
          convite: santaCeiaConvite,
          destaque: true,
        }),
        criarEvento(local, {
          slug: "curso-de-teologia-13-04-2026",
          data: "13/04",
          titulo: "Curso de Teologia",
          tipo: "curso-de-teologia",
          horario: "19h00",
          descricao: cursoTeologiaDescricao,
          convite: cursoTeologiaConvite,
        }),
        criarEvento(local, {
          slug: "reuniao-de-obreiros-18-04-2026",
          data: "18/04",
          titulo: "Reunião de Obreiros",
          tipo: "reuniao-de-obreiros",
          horario: "19h30",
          descricao: reuniaoObreirosDescricao,
          convite: reuniaoObreirosConvite,
        }),
        criarEvento(local, {
          slug: "curso-de-teologia-20-04-2026",
          data: "20/04",
          titulo: "Curso de Teologia",
          tipo: "curso-de-teologia",
          horario: "19h00",
          descricao: cursoTeologiaDescricao,
          convite: cursoTeologiaConvite,
        }),
        criarEvento(local, {
          slug: "congresso-com-as-criancas-25-04-2026",
          data: "25/04",
          titulo: "Congresso com as Crianças",
          tipo: "congresso-criancas",
          horario: "19h00",
          descricao:
            "Culto especial voltado às crianças, com participação do departamento infantil, louvor e ministração da Palavra.",
          destaque: true,
        }),
        criarEvento(local, {
          slug: "curso-de-teologia-27-04-2026",
          data: "27/04",
          titulo: "Curso de Teologia",
          tipo: "curso-de-teologia",
          horario: "19h00",
          descricao: cursoTeologiaDescricao,
          convite: cursoTeologiaConvite,
        }),
      ],
    },
    {
      mes: "Maio",
      mesNumero: 5,
      ano: 2026,
      eventos: [
        criarEvento(local, {
          slug: "reuniao-de-ministerio-04-05-2026",
          data: "04/05",
          titulo: "Reunião de Ministério",
          tipo: "reuniao-de-ministerio",
          horario: "19h30",
          descricao: reuniaoMinisterioDescricao,
          convite: reuniaoMinisterioConvite,
        }),
        criarEvento(local, {
          slug: "santa-ceia-09-05-2026",
          data: "09/05",
          titulo: "Santa Ceia",
          tipo: "santa-ceia",
          horario: "19h00",
          descricao: santaCeiaDescricao,
          convite: santaCeiaConvite,
          destaque: true,
          imagem: "/programacao/semanas/2026-04-27/santa-ceia.png",
          banner: "/programacao/semanas/2026-04-27/santa-ceia.png",
        }),
        criarEvento(local, {
          slug: "curso-de-teologia-11-05-2026",
          data: "11/05",
          titulo: "Curso de Teologia",
          tipo: "curso-de-teologia",
          horario: "19h00",
          descricao: cursoTeologiaDescricao,
          convite: cursoTeologiaConvite,
        }),
        criarEvento(local, {
          slug: "reuniao-de-obreiros-16-05-2026",
          data: "16/05",
          titulo: "Reunião de Obreiros",
          tipo: "reuniao-de-obreiros",
          horario: "19h30",
          descricao: reuniaoObreirosDescricao,
          convite: reuniaoObreirosConvite,
          destaque: true,
          imagem: "/programacao/semanas/2026-05-11/reuniao-de-obreiro.png",
          banner: "/programacao/semanas/2026-05-11/reuniao-de-obreiro.png",
        }),
        criarEvento(local, {
          slug: "curso-de-teologia-18-05-2026",
          data: "18/05",
          titulo: "Curso de Teologia",
          tipo: "curso-de-teologia",
          horario: "19h00",
          descricao: cursoTeologiaDescricao,
          convite: cursoTeologiaConvite,
        }),
        criarEvento(local, {
          slug: "curso-de-teologia-25-05-2026",
          data: "25/05",
          titulo: "Curso de Teologia",
          tipo: "curso-de-teologia",
          horario: "19h00",
          descricao: cursoTeologiaDescricao,
          convite: cursoTeologiaConvite,
        }),
        criarEvento(local, {
          slug: "congresso-circulo-de-oracao-29-05-2026",
          data: "29/05",
          titulo: "Congresso do Círculo de Oração — Baluarte da Fé",
          tipo: "congresso-circulo-de-oracao",
          horario: "19h30",
          descricao:
            [
              congressoCirculoOracaoDescricao,
              "A primeira noite do Congresso do Círculo de Oração — Baluarte da Fé será marcada por um tempo especial de adoração, comunhão e ministração da Palavra. Com a participação da Missionária Paula Ribeiro na pregação e da Cantora Guiomar Victor no louvor, será uma noite preparada para fortalecer a fé, renovar a esperança e conduzir a igreja a uma reflexão profunda sobre o tema “Em tempos de dor, as prioridades mudam”, baseado em II Samuel 21:10.",
            ].join("\n\n"),
          convite: congressoCirculoOracaoConvite,
          baseBiblica: congressoCirculoOracaoBaseBiblica,
          destaque: true,
          imagem: "/programacao/eventos/congresso-circulo-de-oracao.png",
          banner: "/programacao/eventos/congresso-circulo-de-oracao.png",
        }),
        criarEvento(local, {
          slug: "congresso-circulo-de-oracao-30-05-2026",
          data: "30/05",
          titulo: "Congresso do Círculo de Oração — Baluarte da Fé",
          tipo: "congresso-circulo-de-oracao",
          horario: "19h30",
          descricao:
            [
              congressoCirculoOracaoDescricao,
              "A segunda noite do Congresso do Círculo de Oração — Baluarte da Fé dará continuidade a esse propósito de edificação espiritual, oração e fortalecimento na presença de Deus. A ministração da Palavra ficará com a Pastora Geane Silva, e o louvor contará novamente com a participação da Cantora Guiomar Victor. Será uma noite de celebração, entrega e renovação, encerrando o congresso com uma mensagem de fé, perseverança e posicionamento diante de Deus.",
            ].join("\n\n"),
          convite: congressoCirculoOracaoConvite,
          baseBiblica: congressoCirculoOracaoBaseBiblica,
          destaque: true,
          imagem: "/programacao/eventos/congresso-circulo-de-oracao.png",
          banner: "/programacao/eventos/congresso-circulo-de-oracao.png",
        }),
      ],
    },
    {
      mes: "Junho",
      mesNumero: 6,
      ano: 2026,
      eventos: [
        criarEvento(local, {
          slug: "reuniao-de-ministerio-01-06-2026",
          data: "01/06",
          titulo: "Reunião de Ministério",
          tipo: "reuniao-de-ministerio",
          horario: "19h30",
          descricao: reuniaoMinisterioDescricao,
          convite: reuniaoMinisterioConvite,
        }),
        criarEvento(local, {
          slug: "curso-de-teologia-08-06-2026",
          data: "08/06",
          titulo: "Curso de Teologia",
          tipo: "curso-de-teologia",
          horario: "19h00",
          descricao: cursoTeologiaDescricao,
          convite: cursoTeologiaConvite,
        }),
        criarEvento(local, {
          slug: "santa-ceia-13-06-2026",
          data: "13/06",
          titulo: "Santa Ceia",
          tipo: "santa-ceia",
          horario: "19h00",
          descricao: santaCeiaDescricao,
          convite: santaCeiaConvite,
          destaque: true,
          imagem: "/programacao/semanas/2026-06-08/santa-ceia.png",
          banner: "/programacao/semanas/2026-06-08/santa-ceia.png",
        }),
        criarEvento(local, {
          slug: "dia-do-pastor-14-06-2026",
          data: "14/06",
          titulo: "Dia do Pastor",
          tipo: "evento-especial",
          descricao: [
            "Neste segundo domingo de junho, celebramos com gratidão a vida dos nossos queridos pastores, Pr. Zacarias B. Félix e Pra. Anna Alzira, que há mais de 20 anos têm dedicado suas vidas ao cuidado da obra de Deus e ao pastoreio da Assembleia de Deus Ministério Madureira – Campo de Atibaia.",
            "Ao longo dessa caminhada, foram incontáveis vidas alcançadas, famílias restauradas, aconselhamentos, orações, ensinamentos e demonstrações de amor ao Reino de Deus. Com zelo, dedicação e fidelidade, nossos pastores têm sido instrumentos nas mãos do Senhor para conduzir esta igreja pelos caminhos da fé.",
            "Hoje rendemos graças a Deus por suas vidas e por todo o legado construído ao longo desses anos de ministério. Que o Senhor continue fortalecendo, renovando e recompensando cada esforço, cada lágrima e cada semente plantada na obra de Deus.",
          ].join("\n\n"),
          convite: [
            "Parabéns pelo Dia do Pastor! Que Deus continue abençoando abundantemente suas vidas, família e ministério.",
            "Com carinho e gratidão, Família AD Madureira Campo de Atibaia.",
          ].join("\n\n"),
          baseBiblica: criarBaseBiblica("Hebreus 13:17"),
          recursos: [
            {
              label: "Assistir à entrevista — Pr. Zacarias B. Félix",
              href: "https://youtu.be/nD8ww-uzRgg?si=vFtAAFGa-7jU_YD_",
              descricao:
                "Conheça a história, o chamado e a trajetória de fé do nosso pastor.",
            },
          ],
          destaque: true,
          imagem: "/programacao/eventos/dia-do-pastor-hero.png",
          banner: "/programacao/eventos/dia-do-pastor.png",
        }),
        criarEvento(local, {
          slug: "entrevista-pastor-zacarias-felix-2026",
          data: "14/06",
          titulo: "Entrevista — Pr. Zacarias B. Félix",
          tipo: "evento-especial",
          descricao: [
            "Em uma conversa especial, o Pr. Zacarias B. Félix compartilhou um pouco da sua história, da sua caminhada ministerial, do seu chamado e da sua trajetória de fé à frente da Assembleia de Deus Ministério Madureira – Campo de Atibaia.",
            "Há mais de 20 anos dedicados ao pastoreio desta obra, o Pastor Zacarias tem sido um instrumento fiel nas mãos de Deus. Sua trajetória é marcada por fé, perseverança e amor pela igreja e pelas pessoas que Deus colocou sob seus cuidados.",
            "Esta entrevista é uma oportunidade de conhecer mais sobre essa linda história de dedicação ao Reino de Deus.",
          ].join("\n\n"),
          convite:
            "Assista à entrevista e conheça mais sobre a história e o chamado do nosso pastor.",
          recursos: [
            {
              label: "Assistir à entrevista no YouTube",
              href: "https://youtu.be/nD8ww-uzRgg?si=vFtAAFGa-7jU_YD_",
              descricao:
                "Pr. Zacarias B. Félix conta sua história, chamado e trajetória de fé.",
            },
          ],
          destaque: true,
          imagem: "/programacao/eventos/entrevista-hero.png",
          banner: "/programacao/eventos/entrevista.png",
        }),
        criarEvento(local, {
          slug: "curso-de-teologia-15-06-2026",
          data: "15/06",
          titulo: "Curso de Teologia",
          tipo: "curso-de-teologia",
          horario: "19h00",
          descricao: cursoTeologiaDescricao,
          convite: cursoTeologiaConvite,
        }),
        criarEvento(local, {
          slug: "reuniao-de-obreiros-20-06-2026",
          data: "20/06",
          titulo: "Reunião de Obreiros",
          tipo: "reuniao-de-obreiros",
          horario: "19h30",
          descricao: reuniaoObreirosDescricao,
          convite: reuniaoObreirosConvite,
          destaque: true,
          imagem: "/programacao/semanas/2026-06-15/reuniao-de-obreiro.png",
          banner: "/programacao/semanas/2026-06-15/reuniao-de-obreiro.png",
        }),
        criarEvento(local, {
          slug: "curso-de-teologia-22-06-2026",
          data: "22/06",
          titulo: "Curso de Teologia",
          tipo: "curso-de-teologia",
          horario: "19h00",
          descricao: cursoTeologiaDescricao,
          convite: cursoTeologiaConvite,
        }),
        criarEvento(local, {
          slug: "culto-com-a-mocidade-27-06-2026",
          data: "27/06",
          titulo: "Culto com a Mocidade",
          tipo: "culto-com-a-mocidade",
          horario: "19h00",
          descricao: cultoMocidadeDescricao,
          convite: cultoMocidadeConvite,
        }),
        criarEvento(local, {
          slug: "batismo-28-06-2026",
          data: "28/06",
          titulo: "Batismo",
          tipo: "batismo",
          horario: "09h30",
          descricao: batismoDescricao,
          convite: batismoConvite,
          destaque: true,
          imagem: "/programacao/semanas/2026-06-22/batismo.png",
          banner: "/programacao/semanas/2026-06-22/batismo.png",
        }),
        criarEvento(local, {
          slug: "curso-de-teologia-29-06-2026",
          data: "29/06",
          titulo: "Curso de Teologia",
          tipo: "curso-de-teologia",
          horario: "19h00",
          descricao: cursoTeologiaDescricao,
          convite: cursoTeologiaConvite,
        }),
      ],
    },
    {
      mes: "Julho",
      mesNumero: 7,
      ano: 2026,
      eventos: [
        criarEvento(local, {
          slug: "trimestre-ebd-adultos-3t-2026",
          data: "05/07 a 27/09",
          titulo: "3º Trimestre EBD 2026 — A Igreja dos Gentios",
          tipo: "evento-especial",
          descricao: [
            "Neste 3º trimestre de 2026, a Escola Bíblica Dominical da AD Madureira Atibaia inicia um novo ciclo de estudos. Treze lições acompanham a expansão do Evangelho entre os gentios, da chamada de Barnabé e Saulo em Antioquia até a chegada de Paulo a Roma.",
            "A abordagem sobre a proclamação do Evangelho entre os gentios considera, inicialmente, o propósito divino desde o Antigo Testamento. Deus havia prometido, por intermédio dos profetas da Antiga Aliança, que a mensagem de salvação alcançaria outras nações para além de Israel. Nesse sentido, o grande avivamento experimentado pelos cristãos em Antioquia, a partir da pregação aos gentios, é o cumprimento dessa promessa.",
            "O comentarista deste trimestre é o pastor Wagner Gaby, líder da Assembleia de Deus em Curitiba. As aulas acontecem todo domingo às 09h, na sede da AD Madureira Atibaia.",
          ].join("\n\n"),
          convite:
            "Participe das aulas da Escola Bíblica Dominical todo domingo às 09h e aprofunde seu conhecimento sobre a expansão do Evangelho entre os povos.",
          baseBiblica: criarBaseBiblica("Atos 1.8"),
          destaque: true,
          imagem: "/programacao/eventos/trimestre.png",
          banner: "/programacao/eventos/trimestre.png",
        }),
        criarEvento(local, {
          slug: "reuniao-de-ministerio-06-07-2026",
          data: "06/07",
          titulo: "Reunião de Ministério",
          tipo: "reuniao-de-ministerio",
          horario: "19h30",
          descricao: reuniaoMinisterioDescricao,
          convite: reuniaoMinisterioConvite,
        }),
        criarEvento(local, {
          slug: "santa-ceia-e-reuniao-de-obreiros-11-07-2026",
          data: "11/07",
          titulo: "Santa Ceia e Reunião de Obreiros",
          tipo: "santa-ceia",
          horario: "19h00",
          descricao:
            "Culto especial de Santa Ceia com reunião de obreiros no templo sede.",
          destaque: true,
          imagem: "/programacao/semanas/2026-07-06/santa-ceia.png",
          banner: "/programacao/semanas/2026-07-06/santa-ceia.png",
        }),
        criarEvento(local, {
          slug: "curso-de-teologia-13-07-2026",
          data: "13/07",
          titulo: "Curso de Teologia",
          tipo: "curso-de-teologia",
          horario: "19h00",
          descricao: cursoTeologiaDescricao,
          convite: cursoTeologiaConvite,
        }),
        criarEvento(local, {
          slug: "congresso-da-mocidade-local-17-07-2026",
          data: "17/07",
          titulo: "Congresso da Mocidade — Rios de Unção (1ª noite)",
          tipo: "culto-com-a-mocidade",
          horario: congressoRiosDeUncao.horarioAgenda,
          descricao: [
            "Primeira noite do Congresso da Mocidade — Rios de Unção 2026, com o tema “Vinho novo em odre novo”, baseado em Lucas 5:38.",
            "A programação terá a ministração do PB Rafael Garcia, participação da cantora Talita Morais e presença das igrejas convidadas AD Ministério Ipiranga, AD Ministério Curados para Curar e AD Ministério Madureira — Congregações.",
          ].join("\n\n"),
          convite:
            "Participe desta primeira noite e acompanhe a página oficial do congresso para ver a programação completa dos dois dias.",
          baseBiblica: criarBaseBiblica(congressoRiosDeUncao.baseBiblica),
          recursos: [
            {
              label: "Ver programação completa do Congresso",
              href: congressoRiosDeUncao.path,
              descricao:
                "Acesse a página oficial com tema, liderança, convidados e programação dos dias 17 e 18 de julho.",
            },
          ],
          destaque: true,
          imagem: congressoRiosDeUncao.imagem,
          banner: congressoRiosDeUncao.imagem,
          hero: congressoRiosDeUncao.hero,
        }),
        criarEvento(local, {
          slug: "congresso-da-mocidade-local-18-07-2026",
          data: "18/07",
          titulo: "Congresso da Mocidade — Rios de Unção (2ª noite)",
          tipo: "culto-com-a-mocidade",
          horario: congressoRiosDeUncao.horarioAgenda,
          descricao: [
            "Segunda noite do Congresso da Mocidade — Rios de Unção 2026, no templo sede, com o tema “Vinho novo em odre novo”, baseado em Lucas 5:38.",
            "A programação terá a ministração e participação musical do Pr. Fábio Ricardo, participação da cantora Talita Morais, presença das congregações do Campo de Atibaia e da UMADAT.",
          ].join("\n\n"),
          convite:
            "Participe desta segunda noite e acompanhe a página oficial do congresso para ver a programação completa dos dois dias.",
          baseBiblica: criarBaseBiblica(congressoRiosDeUncao.baseBiblica),
          recursos: [
            {
              label: "Ver programação completa do Congresso",
              href: congressoRiosDeUncao.path,
              descricao:
                "Acesse a página oficial com tema, liderança, convidados e programação dos dias 17 e 18 de julho.",
            },
          ],
          destaque: true,
          imagem: congressoRiosDeUncao.imagem,
          banner: congressoRiosDeUncao.imagem,
          hero: congressoRiosDeUncao.hero,
        }),
        criarEvento(local, {
          slug: "curso-de-teologia-20-07-2026",
          data: "20/07",
          titulo: "Curso de Teologia",
          tipo: "curso-de-teologia",
          horario: "19h00",
          descricao: cursoTeologiaDescricao,
          convite: cursoTeologiaConvite,
        }),
        criarEvento(local, {
          slug: "cha-de-mulheres-que-inspiram-24-07-2026",
          data: "24/07",
          titulo: "Chá de Mulheres que Inspiram",
          tipo: "evento-especial",
          horario: "19h30",
          descricao:
            "Uma noite de fé, comunhão, louvor e propósito preparada especialmente para mulheres, com palestra da Dra. Andresa Gomes.",
          convite:
            "Participe deste encontro especial entre mulheres e convide alguém para compartilhar uma noite de inspiração e comunhão.",
          local: "Rua Pacaembu, 85 — Jardim Imperial, Atibaia/SP",
          destaque: true,
          imagem: "/programacao/eventos/cha-de-mulheres/cha-de-mulheres.png",
          banner: "/programacao/eventos/cha-de-mulheres/banner-cha-de-mulheres.png",
          hero: "/programacao/eventos/cha-de-mulheres/banner-cha-de-mulheres.png",
        }),
        criarEvento(local, {
          slug: "curso-de-teologia-27-07-2026",
          data: "27/07",
          titulo: "Curso de Teologia",
          tipo: "curso-de-teologia",
          horario: "19h00",
          descricao: cursoTeologiaDescricao,
          convite: cursoTeologiaConvite,
        }),
      ],
    },
    {
      mes: "Agosto",
      mesNumero: 8,
      ano: 2026,
      eventos: [
        criarEvento(local, {
          slug: "reuniao-de-ministerio-03-08-2026",
          data: "03/08",
          titulo: "Reunião de Ministério",
          tipo: "reuniao-de-ministerio",
          horario: "19h30",
          descricao: reuniaoMinisterioDescricao,
          convite: reuniaoMinisterioConvite,
        }),
        criarEvento(local, {
          slug: "santa-ceia-08-08-2026",
          data: "08/08",
          titulo: "Santa Ceia",
          tipo: "santa-ceia",
          horario: "19h00",
          descricao: santaCeiaDescricao,
          convite: santaCeiaConvite,
          destaque: true,
          imagem: "/programacao/semanas/2026-08-03/santa-ceia.png",
          banner: "/programacao/semanas/2026-08-03/santa-ceia.png",
        }),
        criarEvento(local, {
          slug: "curso-de-teologia-10-08-2026",
          data: "10/08",
          titulo: "Curso de Teologia",
          tipo: "curso-de-teologia",
          horario: "19h00",
          descricao: cursoTeologiaDescricao,
          convite: cursoTeologiaConvite,
        }),
        criarEvento(local, {
          slug: "reuniao-de-obreiros-15-08-2026",
          data: "15/08",
          titulo: "Reunião de Obreiros",
          tipo: "reuniao-de-obreiros",
          horario: "19h30",
          descricao: reuniaoObreirosDescricao,
          convite: reuniaoObreirosConvite,
        }),
        criarEvento(local, {
          slug: "curso-de-teologia-17-08-2026",
          data: "17/08",
          titulo: "Curso de Teologia",
          tipo: "curso-de-teologia",
          horario: "19h00",
          descricao: cursoTeologiaDescricao,
          convite: cursoTeologiaConvite,
        }),
        criarEvento(local, {
          slug: "culto-com-a-mocidade-22-08-2026",
          data: "22/08",
          titulo: "Culto com a Mocidade",
          tipo: "culto-com-a-mocidade",
          horario: "19h00",
          descricao: cultoMocidadeDescricao,
          convite: cultoMocidadeConvite,
        }),
        criarEvento(local, {
          slug: "curso-de-teologia-24-08-2026",
          data: "24/08",
          titulo: "Curso de Teologia",
          tipo: "curso-de-teologia",
          horario: "19h00",
          descricao: cursoTeologiaDescricao,
          convite: cursoTeologiaConvite,
        }),
        criarEvento(local, {
          slug: "vigilia-29-08-2026",
          data: "29/08",
          titulo: "Vigília",
          tipo: "evento-especial",
          horario: "22h00",
          descricao:
            "Uma noite de adoração, clamor e Palavra, com ministração do Pr. Wanderley Abrahão e participação especial dos cantores Noemi Nonato, Nando Menezes, Gildo Borges e Cíntia Pérez.",
          convite:
            "Separe a noite de sábado para buscar a presença de Deus conosco. Traga sua família e convide alguém para essa vigília.",
          baseBiblica: criarBaseBiblica("Mateus 26:41"),
          recursos: [
            {
              label: "Ver página completa da Vigília",
              href: "/eventos/vigilia-29-08-2026",
              descricao:
                "Participantes, preletor, data, horário e local da Vigília 29/08.",
            },
          ],
          destaque: true,
          imagem: "/programacao/eventos/vigilia.png",
          banner: "/programacao/eventos/vigilia.png",
          hero: "/programacao/eventos/hero-vigilia.png",
        }),
        criarEvento(local, {
          slug: "curso-de-teologia-31-08-2026",
          data: "31/08",
          titulo: "Curso de Teologia",
          tipo: "curso-de-teologia",
          horario: "19h00",
          descricao: cursoTeologiaDescricao,
          convite: cursoTeologiaConvite,
        }),
      ],
    },
    {
      mes: "Setembro",
      mesNumero: 9,
      ano: 2026,
      eventos: [
        criarEvento(local, {
          slug: "aniversario-pastor-zacarias-02-09-2026",
          data: "02/09",
          titulo: "Aniversário do Pastor Zacarias Bernardes Félix",
          tipo: "evento-especial",
          descricao:
            "Celebração especial em honra ao aniversário do Pastor Zacarias Bernardes Félix.",
          destaque: true,
          imagem: "/programacao/eventos/aniversario-pastor-zacarias.png",
          banner: "/programacao/eventos/aniversario-pastor-zacarias.png",
        }),
        criarEvento(local, {
          slug: "reuniao-de-ministerio-07-09-2026",
          data: "07/09",
          titulo: "Reunião de Ministério",
          tipo: "reuniao-de-ministerio",
          horario: "19h30",
          descricao: reuniaoMinisterioDescricao,
          convite: reuniaoMinisterioConvite,
        }),
        criarEvento(local, {
          slug: "santa-ceia-12-09-2026",
          data: "12/09",
          titulo: "Santa Ceia",
          tipo: "santa-ceia",
          horario: "19h00",
          descricao: santaCeiaDescricao,
          convite: santaCeiaConvite,
        }),
        criarEvento(local, {
          slug: "curso-de-teologia-14-09-2026",
          data: "14/09",
          titulo: "Curso de Teologia",
          tipo: "curso-de-teologia",
          horario: "19h00",
          descricao: cursoTeologiaDescricao,
          convite: cursoTeologiaConvite,
        }),
        criarEvento(local, {
          slug: "reuniao-de-obreiros-19-09-2026",
          data: "19/09",
          titulo: "Reunião de Obreiros",
          tipo: "reuniao-de-obreiros",
          horario: "19h30",
          descricao: reuniaoObreirosDescricao,
          convite: reuniaoObreirosConvite,
        }),
        criarEvento(local, {
          slug: "curso-de-teologia-21-09-2026",
          data: "21/09",
          titulo: "Curso de Teologia",
          tipo: "curso-de-teologia",
          horario: "19h00",
          descricao: cursoTeologiaDescricao,
          convite: cursoTeologiaConvite,
        }),
        criarEvento(local, {
          slug: "culto-com-a-mocidade-26-09-2026",
          data: "26/09",
          titulo: "Culto com a Mocidade",
          tipo: "culto-com-a-mocidade",
          horario: "19h00",
          descricao: cultoMocidadeDescricao,
          convite: cultoMocidadeConvite,
        }),
        criarEvento(local, {
          slug: "batismo-27-09-2026",
          data: "27/09",
          titulo: "Batismo",
          tipo: "batismo",
          horario: "09h30",
          descricao: batismoDescricao,
          convite: batismoConvite,
          destaque: true,
          imagem: "/programacao/semanas/2026-09-21/batismo.png",
          banner: "/programacao/semanas/2026-09-21/batismo.png",
        }),
        criarEvento(local, {
          slug: "curso-de-teologia-28-09-2026",
          data: "28/09",
          titulo: "Curso de Teologia",
          tipo: "curso-de-teologia",
          horario: "19h00",
          descricao: cursoTeologiaDescricao,
          convite: cursoTeologiaConvite,
        }),
      ],
    },
    {
      mes: "Outubro",
      mesNumero: 10,
      ano: 2026,
      eventos: [
        criarEvento(local, {
          slug: "reuniao-de-ministerio-05-10-2026",
          data: "05/10",
          titulo: "Reunião de Ministério",
          tipo: "reuniao-de-ministerio",
          horario: "19h30",
          descricao: reuniaoMinisterioDescricao,
          convite: reuniaoMinisterioConvite,
        }),
        criarEvento(local, {
          slug: "santa-ceia-10-10-2026",
          data: "10/10",
          titulo: "Santa Ceia",
          tipo: "santa-ceia",
          horario: "19h00",
          descricao: santaCeiaDescricao,
          convite: santaCeiaConvite,
        }),
        criarEvento(local, {
          slug: "curso-de-teologia-12-10-2026",
          data: "12/10",
          titulo: "Curso de Teologia",
          tipo: "curso-de-teologia",
          horario: "19h00",
          descricao: cursoTeologiaDescricao,
          convite: cursoTeologiaConvite,
        }),
        criarEvento(local, {
          slug: "reuniao-de-obreiros-17-10-2026",
          data: "17/10",
          titulo: "Reunião de Obreiros",
          tipo: "reuniao-de-obreiros",
          horario: "19h30",
          descricao: reuniaoObreirosDescricao,
          convite: reuniaoObreirosConvite,
        }),
        criarEvento(local, {
          slug: "curso-de-teologia-19-10-2026",
          data: "19/10",
          titulo: "Curso de Teologia",
          tipo: "curso-de-teologia",
          horario: "19h00",
          descricao: cursoTeologiaDescricao,
          convite: cursoTeologiaConvite,
        }),
        criarEvento(local, {
          slug: "congresso-geral-umadat-jovem-23-10-2026",
          data: "23/10",
          titulo: "Congresso Geral UMADAT Jovem",
          tipo: "culto-com-a-mocidade",
          descricao:
            "Primeira noite do Congresso Geral UMADAT Jovem, reunindo a juventude em adoração e ministração da Palavra.",
        }),
        criarEvento(local, {
          slug: "congresso-geral-umadat-jovem-24-10-2026",
          data: "24/10",
          titulo: "Congresso Geral UMADAT Jovem",
          tipo: "culto-com-a-mocidade",
          descricao:
            "Segunda noite do Congresso Geral UMADAT Jovem no templo sede.",
        }),
        criarEvento(local, {
          slug: "curso-de-teologia-26-10-2026",
          data: "26/10",
          titulo: "Curso de Teologia",
          tipo: "curso-de-teologia",
          horario: "19h00",
          descricao: cursoTeologiaDescricao,
          convite: cursoTeologiaConvite,
        }),
      ],
    },
    {
      mes: "Novembro",
      mesNumero: 11,
      ano: 2026,
      eventos: [
        criarEvento(local, {
          slug: "reuniao-de-ministerio-02-11-2026",
          data: "02/11",
          titulo: "Reunião de Ministério",
          tipo: "reuniao-de-ministerio",
          horario: "19h30",
          descricao: reuniaoMinisterioDescricao,
          convite: reuniaoMinisterioConvite,
        }),
        criarEvento(local, {
          slug: "curso-de-teologia-09-11-2026",
          data: "09/11",
          titulo: "Curso de Teologia",
          tipo: "curso-de-teologia",
          horario: "19h00",
          descricao: cursoTeologiaDescricao,
          convite: cursoTeologiaConvite,
        }),
        criarEvento(local, {
          slug: "santa-ceia-e-reuniao-de-obreiros-14-11-2026",
          data: "14/11",
          titulo: "Santa Ceia e Reunião de Obreiros",
          tipo: "santa-ceia",
          horario: "19h00",
          descricao:
            "Culto especial de Santa Ceia com reunião de obreiros no templo sede.",
          destaque: true,
        }),
        criarEvento(local, {
          slug: "curso-de-teologia-16-11-2026",
          data: "16/11",
          titulo: "Curso de Teologia",
          tipo: "curso-de-teologia",
          horario: "19h00",
          descricao: cursoTeologiaDescricao,
          convite: cursoTeologiaConvite,
        }),
        criarEvento(local, {
          slug: "aniversario-pastora-anna-alzira-21-11-2026",
          data: "21/11",
          titulo: "Aniversário da Pastora Anna Alzira",
          tipo: "evento-especial",
          descricao:
            "Celebração especial em honra ao aniversário da Pastora Anna Alzira.",
          convite:
            "Vamos celebrar com carinho e gratidão a vida da nossa pastora. Um momento especial de honra.",
        }),
        criarEvento(local, {
          slug: "confadat-congresso-das-irmas-27-11-2026",
          data: "27/11",
          titulo: "CONFADAT — Congresso das Irmãs",
          tipo: "congresso-circulo-de-oracao",
          horario: "19h00",
          descricao:
            "Congresso especial das irmãs, voltado à edificação, comunhão, adoração e fortalecimento espiritual das mulheres na presença de Deus.",
          convite:
            "Serão dias especiais de renovo, comunhão e glória de Deus. Convide outras irmãs e venha participar do CONFADAT.",
        }),
        criarEvento(local, {
          slug: "confadat-congresso-das-irmas-28-11-2026",
          data: "28/11",
          titulo: "CONFADAT — Congresso das Irmãs",
          tipo: "congresso-circulo-de-oracao",
          horario: "19h00",
          descricao:
            "Segundo dia do CONFADAT, Congresso das Irmãs, com adoração, palavra e comunhão no templo sede.",
          convite:
            "Serão dias especiais de renovo, comunhão e glória de Deus. Convide outras irmãs e venha participar do CONFADAT.",
        }),
        criarEvento(local, {
          slug: "curso-de-teologia-23-11-2026",
          data: "23/11",
          titulo: "Curso de Teologia",
          tipo: "curso-de-teologia",
          horario: "19h00",
          descricao: cursoTeologiaDescricao,
          convite: cursoTeologiaConvite,
        }),
        criarEvento(local, {
          slug: "curso-de-teologia-30-11-2026",
          data: "30/11",
          titulo: "Curso de Teologia",
          tipo: "curso-de-teologia",
          horario: "19h00",
          descricao: cursoTeologiaDescricao,
          convite: cursoTeologiaConvite,
        }),
      ],
    },
    {
      mes: "Dezembro",
      mesNumero: 12,
      ano: 2026,
      eventos: [
        criarEvento(local, {
          slug: "reuniao-de-ministerio-07-12-2026",
          data: "07/12",
          titulo: "Reunião de Ministério",
          tipo: "reuniao-de-ministerio",
          horario: "19h30",
          descricao: reuniaoMinisterioDescricao,
          convite: reuniaoMinisterioConvite,
        }),
        criarEvento(local, {
          slug: "ultima-santa-ceia-e-reuniao-de-obreiros-12-12-2026",
          data: "12/12",
          titulo: "Reunião de Obreiros / Última Santa Ceia do Ano",
          tipo: "santa-ceia",
          horario: "19h00",
          descricao:
            "Culto especial de encerramento do ano com Santa Ceia e reunião de obreiros.",
        }),
        criarEvento(local, {
          slug: "batismo-13-12-2026",
          data: "13/12",
          titulo: "Batismo",
          tipo: "batismo",
          horario: "09h30",
          descricao: batismoDescricao,
          convite: batismoConvite,
        }),
      ],
    },
  ];
}
