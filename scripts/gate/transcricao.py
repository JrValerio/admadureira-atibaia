"""
Folhas de transcrição às cegas da camada 1.

Para cada campo do cabeçalho que os dois OCRs não confirmam e que ainda não tem
transcrição, gera uma folha com o RECORTE da seção e o RÓTULO do campo — nunca o
valor esperado. Quem transcreve registra o que lê em
src/data/ebd/<edicao>/fontes/transcricoes-cabecalho.json:

  {"id": "<id do campo>", "lido": "<texto como está impresso>", "pagina": <PDF p.>,
   "lidoEm": "AAAA-MM-DD"}

e roda de novo scripts/gate/cabecalho.py, que compara a transcrição com o JSON.

Quem transcreve é um subagente de contexto limpo (docs/ebd-governance.md). Com
--isolar DIR, as folhas e pendentes.json são copiados para DIR (fora do
repositório) e a instrução ao subagente é gerada em DIR/prompt.txt a partir do
modelo fixo scripts/gate/prompt-transcricao.md, com a pasta como único
parâmetro. O sha256 impresso permite conferir que a mensagem enviada é o modelo
sem alteração.

Uso: python scripts/gate/transcricao.py 1 2 [--edicao 2026-4t] [--isolar DIR]
Saída: tmp/gate/transcricao/folha-NN.jpg e tmp/gate/transcricao/pendentes.json
"""

import argparse
import hashlib
import json
import shutil
import textwrap
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

import cabecalho
from comum import TMP

RAIZ = Path(__file__).resolve().parents[2]
MODELO = Path(__file__).with_name("prompt-transcricao.md")
LARGURA = 900
POR_FOLHA = 3


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("licoes", type=int, nargs="+")
    ap.add_argument("--edicao", default="2026-4t")
    ap.add_argument("--isolar", help="pasta fora do repositório para o subagente")
    a = ap.parse_args()

    pendentes = []
    for classe in ("adultos", "jovens"):
        for numero in a.licoes:
            pendentes += cabecalho.verificar(classe, numero, a.edicao)["pendentes"]

    destino = TMP / "gate" / "transcricao"
    destino.mkdir(parents=True, exist_ok=True)
    for antiga in destino.glob("folha-*.jpg"):
        antiga.unlink()
    (destino / "pendentes.json").write_text(
        json.dumps([{k: p[k] for k in ("id", "rotulo", "pagina")} for p in pendentes], ensure_ascii=False, indent=1), encoding="utf-8")

    fonte = ImageFont.truetype("C:/Windows/Fonts/arial.ttf", 18)
    cartoes = []
    for p in pendentes:
        im = Image.open(p["imagem"]).convert("RGB")
        im = im.resize((LARGURA, int(im.height * LARGURA / im.width)))
        legenda = textwrap.wrap(f"{p['id']}  ·  {p['rotulo']}  ·  PDF p. {p['pagina']}", 90)
        topo = 26 * len(legenda) + 10
        cartao = Image.new("RGB", (LARGURA, im.height + topo), "white")
        d = ImageDraw.Draw(cartao)
        for i, linha in enumerate(legenda):
            d.text((8, 5 + 26 * i), linha, fill=(20, 60, 140), font=fonte)
        cartao.paste(im, (0, topo))
        cartoes.append(cartao)
    for k in range(0, len(cartoes), POR_FOLHA):
        grupo = cartoes[k:k + POR_FOLHA]
        folha = Image.new("RGB", (LARGURA, sum(g.height for g in grupo) + 12 * len(grupo)), (60, 60, 60))
        y = 0
        for g in grupo:
            folha.paste(g, (0, y))
            y += g.height + 12
        folha.save(destino / f"folha-{k // POR_FOLHA + 1:02d}.jpg", quality=84)
    print(f"{len(pendentes)} campo(s) pendente(s) em {(len(cartoes) + POR_FOLHA - 1) // POR_FOLHA} folha(s): {destino}")

    if a.isolar:
        isolada = Path(a.isolar).resolve()
        if isolada.is_relative_to(RAIZ):
            raise SystemExit(f"--isolar precisa ficar fora do repositório: {isolada}")
        if isolada.exists():
            shutil.rmtree(isolada)
        isolada.mkdir(parents=True)
        for arquivo in sorted(destino.glob("folha-*.jpg")) + [destino / "pendentes.json"]:
            shutil.copy2(arquivo, isolada / arquivo.name)
        modelo = MODELO.read_text(encoding="utf-8")
        prompt = modelo.replace("{{PASTA}}", str(isolada))
        (isolada / "prompt.txt").write_text(prompt, encoding="utf-8")
        print(f"Pasta isolada: {isolada}")
        print(f"Modelo sha256 {hashlib.sha256(modelo.encode()).hexdigest()[:16]} · prompt.txt sha256 {hashlib.sha256(prompt.encode()).hexdigest()[:16]}")


if __name__ == "__main__":
    main()
