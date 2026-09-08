import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

// Ferramenta de diagnóstico — item 27 da varredura de layout.
// Lista o conteúdo de public/ com peso, formato, dimensões e uma checagem
// heurística de referência em src/. NÃO apaga nada.
//
//   npm run audit:assets

const rootDir = process.cwd();
const publicDir = path.join(rootDir, "public");
const srcDir = path.join(rootDir, "src");

const RASTER_EXT = new Set([
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
  ".avif",
  ".gif",
  ".tiff",
]);
const DIMENSION_EXT = new Set([...RASTER_EXT, ".svg"]);
const TEXT_EXT = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".mjs",
  ".cjs",
  ".css",
  ".json",
  ".md",
  ".mdx",
]);

// Já comprimidos — não entram na lista de "revisar formato".
const MODERN_RASTER_EXT = new Set([".webp", ".avif"]);

const HEAVY_BYTES = 500 * 1024; // 500 KB — revisar sempre
const RECOMPRESS_HINT_BYTES = 150 * 1024; // 150 KB — PNG/JPG acima disso já vale WebP/AVIF
const HEAVY_RASTER_BYTES = 1024 * 1024; // 1 MB — piores ofensores, listados em detalhe

function walk(dir, acc = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, acc);
    } else if (entry.isFile()) {
      acc.push(full);
    }
  }
  return acc;
}

function buildReferenceCorpus() {
  const files = walk(srcDir).filter((file) =>
    TEXT_EXT.has(path.extname(file).toLowerCase())
  );

  for (const name of [
    "next.config.ts",
    "next.config.js",
    "next.config.mjs",
    "README.md",
  ]) {
    const candidate = path.join(rootDir, name);
    try {
      if (statSync(candidate).isFile()) {
        files.push(candidate);
      }
    } catch {
      // arquivo opcional
    }
  }

  return files.map((file) => readFileSync(file, "utf8")).join("\n");
}

function formatBytes(bytes) {
  if (bytes >= 1024 * 1024) {
    return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
  }
  return `${(bytes / 1024).toFixed(1)} KB`;
}

async function getDimensions(file, ext) {
  if (!DIMENSION_EXT.has(ext)) {
    return null;
  }
  try {
    const meta = await sharp(file).metadata();
    if (meta.width && meta.height) {
      return { width: meta.width, height: meta.height };
    }
  } catch {
    // formatos que o sharp não lê (alguns SVG) ficam sem dimensão
  }
  return null;
}

function pad(value, width) {
  return String(value).padEnd(width);
}

async function main() {
  try {
    if (!statSync(publicDir).isDirectory()) {
      throw new Error("não é um diretório");
    }
  } catch {
    console.error(`[audit:assets] public/ não encontrado em ${publicDir}`);
    process.exit(1);
  }

  const corpus = buildReferenceCorpus();
  const files = walk(publicDir);

  const rows = [];
  for (const file of files) {
    const rel = path.relative(rootDir, file).replace(/\\/g, "/");
    const urlPath = `/${path.relative(publicDir, file).replace(/\\/g, "/")}`;
    const base = path.basename(file);
    const ext = path.extname(file).toLowerCase();
    const size = statSync(file).size;
    const dims = await getDimensions(file, ext);
    // Heurística: consideramos referenciado se o caminho de URL completo OU o
    // nome do arquivo aparecerem em qualquer texto de src/.
    const referenced = corpus.includes(urlPath) || corpus.includes(base);
    rows.push({ rel, base, ext, size, dims, referenced });
  }

  rows.sort((left, right) => right.size - left.size);

  const total = rows.reduce((sum, row) => sum + row.size, 0);
  const orphans = rows.filter((row) => !row.referenced);
  const heavy = rows.filter((row) => row.size >= HEAVY_BYTES);
  const legacyRaster = (row) =>
    RASTER_EXT.has(row.ext) && !MODERN_RASTER_EXT.has(row.ext);
  const recompressCount = rows.filter(
    (row) => legacyRaster(row) && row.size >= RECOMPRESS_HINT_BYTES
  ).length;
  const heavyRaster = rows.filter(
    (row) => legacyRaster(row) && row.size >= HEAVY_RASTER_BYTES
  );

  console.log("\n=== Auditoria de mídia — public/ ===");
  console.log(
    `Arquivos: ${rows.length}   Peso total: ${formatBytes(total)}`
  );
  console.log(
    `Possivelmente órfãos: ${orphans.length}   >= 500 KB: ${heavy.length}   PNG/JPG/GIF >= 150 KB: ${recompressCount}`
  );

  console.log("\n--- Todos os arquivos (peso decrescente) ---");
  console.log(`${pad("PESO", 10)} ${pad("DIMENSÕES", 12)} ${pad("REF", 5)} CAMINHO`);
  for (const row of rows) {
    const dims = row.dims ? `${row.dims.width}x${row.dims.height}` : "—";
    console.log(
      `${pad(formatBytes(row.size), 10)} ${pad(dims, 12)} ${pad(
        row.referenced ? "sim" : "NÃO",
        5
      )} ${row.rel}`
    );
  }

  console.log(
    "\n--- Possivelmente órfãos (nome e caminho não encontrados em src/) ---"
  );
  if (orphans.length === 0) {
    console.log("  (nenhum)");
  }
  for (const row of orphans) {
    console.log(`  ${pad(formatBytes(row.size), 10)} ${row.rel}`);
  }
  console.log(
    "  Heurística: procura o nome do arquivo e o caminho /url no texto de src/."
  );
  console.log(
    "  Caminhos montados dinamicamente (`/programacao/${slug}.png`) podem cair aqui sem estar órfãos — confira antes de remover."
  );

  console.log("\n--- Revisar formato/peso (PNG/JPG/GIF >= 1 MB) ---");
  if (heavyRaster.length === 0) {
    console.log("  (nenhum)");
  }
  for (const row of heavyRaster) {
    const dims = row.dims ? `${row.dims.width}x${row.dims.height}` : "—";
    console.log(`  ${pad(formatBytes(row.size), 10)} ${pad(dims, 12)} ${row.rel}`);
  }
  console.log("");
}

main().catch((error) => {
  console.error("[audit:assets] falhou", error);
  process.exit(1);
});
