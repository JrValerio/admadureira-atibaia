import { BANNERS_SEMANAIS_DISPONIVEIS } from "@/data/banner-semanal-manifest";

/**
 * Retorna a segunda-feira da semana atual no formato "YYYY-MM-DD".
 * Usa horário de São Paulo para não virar a semana no fuso errado.
 */
function getMondayOfCurrentWeek(): string {
  const now = new Date();

  // Converte para data local de São Paulo
  const spStr = now.toLocaleDateString("en-CA", {
    timeZone: "America/Sao_Paulo",
  }); // "YYYY-MM-DD"
  const [year, month, day] = spStr.split("-").map(Number);
  const spDate = new Date(year, month - 1, day);

  // Ajusta para segunda-feira (getDay: 0=dom, 1=seg ... 6=sáb)
  const dow = spDate.getDay();
  const diff = dow === 0 ? -6 : 1 - dow; // domingo volta 6 dias, outros avançam para seg
  spDate.setDate(spDate.getDate() + diff);

  const y = spDate.getFullYear();
  const m = String(spDate.getMonth() + 1).padStart(2, "0");
  const d = String(spDate.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/**
 * Mapa do caminho padrão (em /programacao/) para o nome do arquivo
 * esperado na pasta semanal. O objetivo é manter a operação simples:
 * quando entrar uma arte nova da semana, basta substituir o arquivo da
 * pasta YYYY-MM-DD sem mudar a estrutura do site.
 */
const WEEKLY_FILENAME_MAP: Record<string, readonly string[]> = {
  "/programacao/oracao-matinal.png": ["oracao-matinal.png"],
  "/programacao/oracao-matinal-domingo.png": ["oracao-matinal-domingo.png"],
  "/programacao/curso-teologia.png": ["curso-teologia.png"],
  "/programacao/culto-de-terca.png": ["culto-de-ensino.png", "culto-de-terca.png"],
  "/programacao/consagracao-mulheres.png": ["consagracao-mulheres.png"],
  "/programacao/circulo-de-oracao.png": ["circulo-de-oracao.png"],
  "/programacao/ensaio-irmas.png": ["ensaio-irmas.png"],
  "/programacao/culto-de-quinta.png": ["culto-de-quinta.png"],
  "/programacao/culto-de-libertacao.png": ["culto-de-libertacao.png"],
  "/programacao/EBD.png": ["ebd.png", "EBD.png"],
  "/programacao/ensaio-jovens.png": ["ensaio-jovens.png"],
  "/programacao/culto-de-domingo.png": [
    "culto-de-domingo.png",
    "culto-da-familia.png",
  ],
  "/programacao/reuniao-ministerial.png": ["reuniao-ministerial.png"],
  "/programacao/culto-de-jovens.png": ["culto-de-jovens.png"],
  "/programacao/culto-de-ceia.png": ["santa-ceia.png", "culto-de-ceia.png"],
  "/programacao/reuniao-de-obreiro.png": ["reuniao-de-obreiro.png"],
  "/programacao/jejum-e-oracao.png": ["jejum-e-oração.png"],
};

function findWeeklyPath(monday: string, weeklyFilenames: readonly string[]) {
  const availableWeeks = Object.keys(BANNERS_SEMANAIS_DISPONIVEIS)
    .filter((week) => week <= monday)
    .sort()
    .reverse();

  for (const week of availableWeeks) {
    const files = BANNERS_SEMANAIS_DISPONIVEIS[week] ?? [];
    const filename = weeklyFilenames.find((candidate) => files.includes(candidate));

    if (filename) {
      return `/programacao/semanas/${week}/${filename}`;
    }
  }

  return null;
}

/**
 * Dado o caminho padrão de um banner de programação, verifica se existe
 * um arquivo correspondente na pasta da semana atual.
 *
 * Estrutura esperada:
 *   public/programacao/semanas/YYYY-MM-DD/{filename}
 *
 * Se encontrar, retorna o caminho semanal. Se não, retorna o padrão.
 * Seguro para uso em Server Components — nunca chamado no cliente.
 */
export function getBannerSemanal(defaultPath: string): string {
  const weeklyFilenames = WEEKLY_FILENAME_MAP[defaultPath];
  if (!weeklyFilenames) return defaultPath;

  const monday = getMondayOfCurrentWeek();
  return findWeeklyPath(monday, weeklyFilenames) ?? defaultPath;
}
