import { readdirSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const weeksDir = path.join(rootDir, "public", "programacao", "semanas");
const outputFile = path.join(
  rootDir,
  "src",
  "data",
  "banner-semanal-manifest.ts"
);

function getWeeklyBanners() {
  const weeks = readdirSync(weeksDir)
    .filter((entry) => /^\d{4}-\d{2}-\d{2}$/.test(entry))
    .filter((entry) => statSync(path.join(weeksDir, entry)).isDirectory())
    .sort();

  return Object.fromEntries(
    weeks.map((week) => {
      const files = readdirSync(path.join(weeksDir, week))
        .filter((entry) => /\.(png|jpe?g|webp)$/i.test(entry))
        .sort((left, right) => left.localeCompare(right));

      return [week, files];
    })
  );
}

const manifest = getWeeklyBanners();
const source = `// Gerado automaticamente por scripts/generate-banner-semanal-manifest.mjs.
// Nao edite manualmente; alimente public/programacao/semanas/YYYY-MM-DD.

export const BANNERS_SEMANAIS_DISPONIVEIS: Record<string, readonly string[]> = ${JSON.stringify(
  manifest,
  null,
  2
)};
`;

writeFileSync(outputFile, source);
