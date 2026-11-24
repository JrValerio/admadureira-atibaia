// Comprime os PNGs das artes (paleta via libimagequant do sharp) mantendo nome e formato.
// Uso: npm run optimize:artes [-- pasta ...]   (padrão: public/programacao)
// Rodar antes de commitar artes novas. É idempotente: só regrava quando ganha >10%.
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const roots = process.argv.slice(2);
const targets = roots.length > 0 ? roots : ["public/programacao"];

function listPngs(dir) {
  return readdirSync(dir).flatMap((entry) => {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) return listPngs(full);
    return /\.png$/i.test(entry) ? [full] : [];
  });
}

let before = 0;
let after = 0;
let rewritten = 0;

for (const file of targets.flatMap(listPngs)) {
  const original = readFileSync(file);
  const compressed = await sharp(original)
    .png({ palette: true, quality: 90, effort: 10, compressionLevel: 9 })
    .toBuffer();

  before += original.length;
  if (compressed.length < original.length * 0.9) {
    writeFileSync(file, compressed);
    after += compressed.length;
    rewritten += 1;
  } else {
    after += original.length;
  }
}

const mb = (bytes) => (bytes / 1048576).toFixed(1);
console.log(`[optimize:artes] ${rewritten} arquivos regravados: ${mb(before)} MB -> ${mb(after)} MB`);
