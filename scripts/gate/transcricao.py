"""
Folhas de transcrição às cegas da camada 1.

Para cada campo do cabeçalho que os dois OCRs não confirmam e que ainda não tem
transcrição, gera uma folha com o RECORTE da seção e o RÓTULO do campo — nunca o
valor esperado. Quem transcreve registra o que lê em
src/data/ebd/<edicao>/fontes/transcricoes-cabecalho.json:

  {"id": "<id do campo>", "lido": "<texto como está impresso>", "pagina": <PDF p.>,
   "lidoEm": "AAAA-MM-DD"}

e roda de novo scripts/gate/cabecalho.py, que compara a transcrição com o JSON.

Uso: python scripts/gate/transcricao.py 1 2 [--edicao 2026-4t]   (lições 1 e 2, duas classes)
Saída: tmp/gate/transcricao/folha-NN.jpg e tmp/gate/transcricao/pendentes.json
"""

import argparse
import json
import textwrap

from PIL import Image, ImageDraw, ImageFont

import cabecalho
from comum import TMP

LARGURA = 900
POR_FOLHA = 3


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("licoes", type=int, nargs="+")
    ap.add_argument("--edicao", default="2026-4t")
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


if __name__ == "__main__":
    main()
