import { existsSync } from "fs";
import path from "path";

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
 * na pasta semanal. Permite usar nomes limpos e consistentes nas pastas
 * semanais sem depender dos nomes históricos dos arquivos estáticos.
 */
const WEEKLY_FILENAME_MAP: Record<string, string> = {
  "/programacao/oracao-matinal.png": "oracao-matinal.png",
  "/programacao/oracao-matinal-domingo.png": "oracao-matinal-domingo.png",
  "/programacao/curso-teologia.png": "curso-de-teologia.png",
  "/programacao/culto-de-terca.png": "culto-de-ensino.png",
  "/programacao/consagracao-mulheres.png": "consagracao.png",
  "/programacao/circulo-de-oracao.png": "circulo-de-oracao.png",
  "/programacao/ensaio-irmas.png": "ensaio-irmas.png",
  "/programacao/culto-de-quinta.png": "quinta-da-vitoria.png",
  "/programacao/culto-de-libertacao.png": "libertacao.png",
  "/programacao/EBD.png": "ebd.png",
  "/programacao/ensaio-jovens.png": "ensaio-jovens.png",
  "/programacao/culto-de-domingo.png": "culto-da-familia.png",
  "/programacao/reuniao-ministerial.png": "reuniao-de-ministerio.png",
  "/programacao/culto-de-jovens.png": "culto-de-jovens.png",
  "/programacao/culto-de-ceia.png": "santa-ceia.png",
  "/programacao/reuniao-de-obreiro.png": "reuniao-de-obreiros.png",
};

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
  const weeklyFilename = WEEKLY_FILENAME_MAP[defaultPath];
  if (!weeklyFilename) return defaultPath;

  const monday = getMondayOfCurrentWeek();
  const weeklyPath = `/programacao/semanas/${monday}/${weeklyFilename}`;
  const absolutePath = path.join(process.cwd(), "public", weeklyPath);

  return existsSync(absolutePath) ? weeklyPath : defaultPath;
}
