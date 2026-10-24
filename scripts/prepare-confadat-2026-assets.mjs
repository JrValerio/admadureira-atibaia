// Recompõe elementos do kit com máscaras de transparência aprovadas.
// Nenhuma flor, folha ou pessoa é gerada: os canais RGB vêm dos arquivos originais.
// Uso: node scripts/prepare-confadat-2026-assets.mjs <fundo-aprovado.png> <retrato-aprovado.png> <destino>
import sharp from "sharp";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { mkdir } from "node:fs/promises";

const [background, portrait, destination] = process.argv.slice(2);
if (!background || !portrait || !destination) {
  throw new Error("Informe fundo aprovado, retrato aprovado e diretório de saída.");
}
await mkdir(destination, { recursive: true });
const masks = fileURLToPath(new URL("./assets/confadat-2026/", import.meta.url));

async function originalCutout(region, maskName) {
  const rgb = await sharp(background).extract(region).removeAlpha().raw().toBuffer();
  const alpha = await sharp(path.join(masks, maskName)).greyscale().raw().toBuffer();
  if (alpha.length !== region.width * region.height) throw new Error("Máscara incompatível com a fonte.");
  const rgba = Buffer.alloc(alpha.length * 4);
  let left = region.width, top = region.height, right = 0, bottom = 0;
  for (let p = 0; p < alpha.length; p++) {
    rgba[p * 4] = rgb[p * 3];
    rgba[p * 4 + 1] = rgb[p * 3 + 1];
    rgba[p * 4 + 2] = rgb[p * 3 + 2];
    rgba[p * 4 + 3] = alpha[p];
    if (alpha[p]) {
      const x = p % region.width, y = Math.floor(p / region.width);
      left = Math.min(left, x); top = Math.min(top, y);
      right = Math.max(right, x); bottom = Math.max(bottom, y);
    }
  }
  const width = right - left + 1, height = bottom - top + 1;
  const input = await sharp(rgba, { raw: { width: region.width, height: region.height, channels: 4 } })
    .extract({ left, top, width, height }).png().toBuffer();
  return { input, width, height };
}

// Coordenadas na matriz aprovada de 1122 × 1402.
const rose = await originalCutout({ left: 720, top: 0, width: 402, height: 400 }, "rosa-alpha.png");
const leaf = await originalCutout({ left: 280, top: 1025, width: 200, height: 115 }, "folha-alpha.png");
const upwardLeaf = await sharp(leaf.input).rotate(270).png().toBuffer();
const leftwardLeaf = await sharp(leaf.input).flop().png().toBuffer();

const arrangement = await sharp({ create: { width: 400, height: 430, channels: 4, background: "#00000000" } })
  .composite([
    { input: upwardLeaf, left: 280, top: 20 },
    { input: leftwardLeaf, left: 40, top: 270 },
    { input: rose.input, left: 400 - rose.width, top: 430 - rose.height },
  ]).png().toBuffer();

// As margens mantêm as dimensões e o enquadramento que a página já utiliza.
// A borda cortada da matriz coincide apenas com a borda externa da página.
const outputs = [
  { name: "rosas-base-direita-refinada", width: 422, height: 642, input: arrangement, left: 22, top: 212 },
  { name: "rosas-base-esquerda-refinada", width: 530, height: 647,
    input: await sharp(arrangement).flop().png().toBuffer(), left: 0, top: 217 },
  { name: "rosas-canto-superior-refinada", width: 747, height: 550, input: arrangement, left: 347, top: 0 },
];
for (const { name, width, height, input, left, top } of outputs) {
  const result = await sharp({ create: { width, height, channels: 4, background: "#00000000" } })
    .composite([{ input, left, top }])
    .webp({ lossless: true, effort: 6 })
    .toFile(path.join(destination, `${name}.webp`));
  console.log(`${name}: ${width}×${height}, ${result.size} bytes`);
}

const result = await sharp(portrait).webp({ quality: 92, effort: 6 })
  .toFile(path.join(destination, "anna-alzira-boas-vindas.webp"));
console.log(`anna-alzira-boas-vindas: ${result.width}×${result.height}, ${result.size} bytes`);
