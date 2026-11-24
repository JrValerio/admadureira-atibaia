import { collection, config, fields } from "@keystatic/core";

// Cada campo grava em public/programacao/semanas/<semana>/<campo>.png, que é exatamente
// onde src/lib/banner-semanal.ts procura a arte da semana. Os nomes precisam ficar iguais.
const ARTES_RECORRENTES: Record<string, string> = {
  "culto-de-domingo": "Culto de domingo",
  "culto-da-familia": "Culto da família (domingo)",
  "santa-ceia": "Santa Ceia",
  "oracao-matinal": "Oração matinal",
  "oracao-matinal-domingo": "Oração matinal de domingo",
  ebd: "EBD",
  "culto-de-ensino": "Culto de ensino (terça)",
  "culto-de-quinta": "Culto de quinta",
  "culto-de-libertacao": "Culto de libertação",
  "culto-de-jovens": "Culto de jovens",
  "consagracao-mulheres": "Consagração das mulheres",
  "circulo-de-oracao": "Círculo de oração",
  "jejum-e-oração": "Jejum e oração",
  vigilia: "Vigília",
  "ensaio-irmas": "Ensaio das irmãs",
  "ensaio-jovens": "Ensaio dos jovens",
  "reuniao-ministerial": "Reunião ministerial",
  "reuniao-de-obreiro": "Reunião de obreiros",
  "curso-teologia": "Curso de teologia",
};

const imagensDaSemana = Object.fromEntries(
  Object.entries(ARTES_RECORRENTES).map(([arquivo, label]) => [
    arquivo,
    fields.image({
      label,
      description: "PNG 1080×1350. Deixe vazio se não houver arte nesta semana.",
      directory: "public/programacao/semanas",
      publicPath: "/programacao/semanas/",
    }),
  ])
);

// Com as variáveis do GitHub App configuradas, o painel salva direto no repositório
// (cada publicação vira um commit). Sem elas, só funciona localmente em `npm run dev`.
export const isGitHubStorage = Boolean(process.env.KEYSTATIC_GITHUB_CLIENT_ID);

export default config({
  storage: isGitHubStorage
    ? { kind: "github", repo: "JrValerio/admadureira-atibaia" }
    : { kind: "local" },
  ui: { brand: { name: "AD Madureira Atibaia" } },
  collections: {
    artesSemanais: collection({
      label: "Artes da semana",
      slugField: "semana",
      path: "content/artes-semanais/*",
      format: { data: "yaml" },
      schema: {
        semana: fields.slug({
          name: {
            label: "Semana",
            description: "Data da segunda-feira da semana, no formato AAAA-MM-DD (ex.: 2026-11-30).",
            validation: { isRequired: true },
          },
        }),
        ...imagensDaSemana,
      },
    }),
  },
});
