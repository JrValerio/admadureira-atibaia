"""
Texto ARC (Almeida Revista e Corrigida) por capítulo, a partir do bibliaonline,
com cache em tmp/cache/arc/<slug>-<capitulo>.json.

A página traz cada palavra num <span data-t> agrupado por data-v=".N."; o
capítulo é remontado versículo a versículo a partir desses marcadores. Uma
requisição por capítulo, com pausa entre elas; o cache evita repetir.
"""

import html
import json
import re
import time
import urllib.request

from comum import TMP

CACHE = TMP / "cache" / "arc"
URL = "https://www.bibliaonline.com.br/arc/{slug}/{capitulo}"
_ultima = [0.0]


def _baixar(url):
    espera = 1.0 - (time.time() - _ultima[0])
    if espera > 0:
        time.sleep(espera)
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (gate EBD AD Madureira Atibaia)"})
    with urllib.request.urlopen(req, timeout=30) as r:
        _ultima[0] = time.time()
        return r.read().decode("utf-8")


def _juntar(tokens):
    saida = ""
    for t in tokens:
        if saida and not saida[-1].isspace() and t[:1].isalnum():
            saida += " "
        saida += t
    return re.sub(r"\s+", " ", saida).strip()


def extrair_versiculos(pagina_html):
    atual, tokens = None, {}
    for m in re.finditer(r'data-v="\.(\d+)\."|<span data-t="\d+"[^>]*>([^<]*)</span>', pagina_html):
        if m.group(1):
            atual = int(m.group(1))
        elif atual is not None:
            tokens.setdefault(atual, []).append(html.unescape(m.group(2)))
    return {n: _juntar(t) for n, t in tokens.items()}


def capitulo(slug, numero):
    """{versículo: texto} do capítulo na ARC; usa o cache quando existir."""
    arquivo = CACHE / f"{slug}-{numero}.json"
    if arquivo.exists():
        dados = json.loads(arquivo.read_text(encoding="utf-8"))
        return {int(k): v for k, v in dados["versiculos"].items()}
    url = URL.format(slug=slug, capitulo=numero)
    versiculos = extrair_versiculos(_baixar(url))
    if not versiculos:
        raise RuntimeError(f"Nenhum versículo extraído de {url}")
    CACHE.mkdir(parents=True, exist_ok=True)
    arquivo.write_text(json.dumps({"fonte": url, "versiculos": versiculos}, ensure_ascii=False, indent=1), encoding="utf-8")
    return versiculos


def url(slug, numero):
    return URL.format(slug=slug, capitulo=numero)
