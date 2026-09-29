/**
 * Exporta, em JSON, uma lição da EBD exatamente como o site a monta, para a
 * página de gate humano (ver scripts/gate-licao.py).
 *
 * Uso: npx tsx --tsconfig tsconfig.json scripts/gate-licao-dados.ts <classe> <edicao> <numero>
 * Ex.: npx tsx --tsconfig tsconfig.json scripts/gate-licao-dados.ts adultos 2026-4t 2
 */
import { trimestresEBDPorClasse } from "@/data/ebd";

const [classe, edicao, numeroTexto] = process.argv.slice(2);

if (classe !== "adultos" && classe !== "jovens") {
  console.error('Classe deve ser "adultos" ou "jovens".');
  process.exit(1);
}

const trimestre = trimestresEBDPorClasse[classe].find((item) => item.slug === edicao);
if (!trimestre) {
  console.error(`Edição ${edicao} não encontrada em ${classe}.`);
  process.exit(1);
}

const licao = trimestre.licoes.find((item) => item.numero === Number(numeroTexto));
if (!licao) {
  console.error(`Lição ${numeroTexto} não encontrada em ${classe}/${edicao}.`);
  process.exit(1);
}

const subsidio = licao.subsidioAdultos ?? licao.subsidioJovens;
if (!subsidio) {
  console.error(`A lição ${licao.id} não tem subsídio de Adultos nem de Jovens.`);
  process.exit(1);
}

const { cabecalho, ...corpo } = subsidio;

process.stdout.write(
  JSON.stringify({
    classe,
    edicao: {
      slug: trimestre.slug,
      rotulo: trimestre.rotulo,
      titulo: trimestre.titulo,
      comentarista: trimestre.comentarista,
    },
    licao: {
      id: licao.id,
      numero: licao.numero,
      data: licao.data,
      titulo: licao.titulo,
      statusEditorial: licao.statusEditorial ?? "published",
      resumo: licao.resumo,
      leituraBiblica: licao.leituraBiblica,
    },
    cabecalho,
    corpo,
  })
);
