import { getProgramacaoSemanalAtual } from "@/lib/programacao-semanal";
import QuadroSemanalGrid, { type DiaQuadroComItens } from "@/sections/QuadroSemanalGrid";

type DiaQuadro = {
  id: number;
  sigla: string;
  nome: string;
};

export type ItemQuadro = {
  id: string;
  horario: string;
  titulo: string;
};

const diasQuadro: DiaQuadro[] = [
  { id: 1, sigla: "Seg", nome: "Segunda" },
  { id: 2, sigla: "Ter", nome: "Terça" },
  { id: 3, sigla: "Qua", nome: "Quarta" },
  { id: 4, sigla: "Qui", nome: "Quinta" },
  { id: 5, sigla: "Sex", nome: "Sexta" },
  { id: 0, sigla: "Dom", nome: "Domingo" },
];

const mapaDias: Record<string, number[]> = {
  "Segunda a Sexta": [1, 2, 3, 4, 5],
  "Segunda-feira": [1],
  "Terça-feira": [2],
  "Quarta-feira": [3],
  "Quinta-feira": [4],
  "Sexta-feira": [5],
  Domingo: [0],
};

function extrairOrdemHorario(horario: string) {
  const match = horario.match(/(\d{1,2})h(\d{2})?/);
  if (!match) return Number.MAX_SAFE_INTEGER;

  const horas = parseInt(match[1], 10);
  const minutos = match[2] ? parseInt(match[2], 10) : 0;
  return horas * 60 + minutos;
}

function montarQuadroSemanal() {
  const quadro = new Map<number, ItemQuadro[]>();

  getProgramacaoSemanalAtual().forEach((item, index) => {
    const dias = mapaDias[item.dia] ?? [];

    dias.forEach((dia) => {
      const atuais = quadro.get(dia) ?? [];
      atuais.push({
        id: `${dia}-${item.titulo}-${index}`,
        horario: item.horario ?? "",
        titulo: item.titulo,
      });
      quadro.set(dia, atuais);
    });
  });

  diasQuadro.forEach((dia) => {
    const itens = quadro.get(dia.id) ?? [];
    itens.sort((a, b) => extrairOrdemHorario(a.horario) - extrairOrdemHorario(b.horario));
    quadro.set(dia.id, itens);
  });

  return quadro;
}

export default function QuadroSemanal() {
  // Monta o quadro no servidor: os dados da programação (e o Zod) ficam fora do bundle do cliente.
  const quadro = montarQuadroSemanal();
  const dias: DiaQuadroComItens[] = diasQuadro.map((dia) => ({ ...dia, itens: quadro.get(dia.id) ?? [] }));

  return (
    <section className="mb-10 md:mb-20">
      <div className="text-center max-w-3xl mx-auto mb-8 md:mb-10">
        <p className="text-text-accent text-sm font-semibold tracking-widest uppercase mb-2">
          Visão rápida da semana
        </p>
        <h3 className="font-acme text-2xl md:text-4xl text-[#212121] tracking-wide mb-4">
          Programação da Semana
        </h3>
        <p className="text-[#5f5f5f] leading-relaxed">
          Veja rapidamente os cultos e reuniões de cada dia e descubra quando
          você pode estar conosco ao longo da semana.
        </p>
      </div>

      <QuadroSemanalGrid dias={dias} />
    </section>
  );
}
