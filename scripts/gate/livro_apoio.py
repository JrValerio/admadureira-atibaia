"""
Camada 3 do gate: manifesto das citações do livro de apoio.

src/data/ebd/<edicao>/fontes/livro-apoio.json lista cada citação do livro de
apoio no texto do site: capítulo, âncoras (página do PDF + frase) e o trecho do
site que carrega a citação. O script confere:
1. cada frase-âncora está, literalmente, na página indicada do PDF do livro;
2. o trecho existe no corpo da lição e cita o livro com o mesmo capítulo;
3. toda citação direta do livro (trecho entre aspas que a camada 2 atribuiu ao
   livro) está numa das páginas de âncora da entrada correspondente;
4. toda frase do corpo que cita o livro de apoio tem entrada no manifesto.
Âncora ausente vira exceção com o recorte da página para conferência.

Uso: python scripts/gate/livro_apoio.py adultos 2 [--edicao 2026-4t]
"""

import argparse
import re

import citacoes_biblicas
from comum import (
    MATERIAL, TMP, Excecao, carregar_licao, frases, ler_json, normalizar, pasta_fontes,
    recortar, texto_pagina, textos_da_licao,
)


def manifesto(edicao):
    return ler_json(pasta_fontes(edicao) / "livro-apoio.json", {"livros": {}, "citacoes": []})


def verificar(classe, numero, edicao="2026-4t", dados=None, citacoes_livro=None, saida=None):
    dados = dados or carregar_licao(classe, edicao, numero)
    m = manifesto(edicao)
    livro = m["livros"].get(classe)
    entradas = [c for c in m["citacoes"] if c["classe"] == classe and c["licao"] == numero]
    saida = saida or TMP / "gate" / f"{classe}-{edicao}-licao-{numero}"
    corpo = list(dict.fromkeys(t for _, t in textos_da_licao(dados)))
    if citacoes_livro is None:
        citacoes_livro = citacoes_biblicas.verificar(classe, numero, edicao, dados)["do_livro"]

    conferidas, excecoes = [], []
    if not livro:
        cita = [f for t in corpo for f in frases(t) if citacoes_biblicas.CITACAO_LIVRO.search(f)]
        if cita:
            excecoes.append(Excecao(3, f"{len(cita)} frase(s) citam livro de apoio, mas o manifesto não declara o livro de {classe}"))
        return {"conferidas": conferidas, "excecoes": excecoes}
    pdf = MATERIAL / livro["arquivo"]

    for entrada in entradas:
        problemas = []
        for ancora in entrada["ancoras"]:
            pagina = normalizar(texto_pagina(pdf, ancora["pagina"]))
            if normalizar(ancora["frase"]) not in pagina:
                imagem = recortar(pdf, ancora["pagina"], saida / "livro" / f"{entrada['id']}-p{ancora['pagina']}.png", termo=ancora["frase"])
                problemas.append(f"âncora “{ancora['frase']}” não está na PDF p. {ancora['pagina']} ({imagem})")
        onde = [t for t in corpo if entrada["trecho"] in t]
        if not onde:
            problemas.append("trecho não encontrado no corpo da lição (texto mudou: atualizar o manifesto)")
        elif f"{livro['citacao']}, cap. {entrada['capitulo']}" not in entrada["trecho"]:
            problemas.append(f"o trecho não cita “{livro['citacao']}, cap. {entrada['capitulo']}”")
        if problemas:
            excecoes.extend(Excecao(3, f"{entrada['id']}: {p}", id=entrada["id"]) for p in problemas)
        else:
            conferidas.append(entrada)

    # 3. citações diretas do livro precisam estar numa página de âncora da entrada.
    for c in citacoes_livro:
        dono = [e for e in entradas if normalizar(c["citacao"]) in normalizar(e["trecho"])]
        paginas = sorted({a["pagina"] for e in dono for a in e["ancoras"]})
        if not dono:
            excecoes.append(Excecao(3, f"citação direta “{c['citacao']}” sem entrada no manifesto"))
        elif not any(normalizar(c["citacao"]) in normalizar(texto_pagina(pdf, p)) for p in paginas):
            excecoes.append(Excecao(3, f"citação direta “{c['citacao']}” não está literalmente nas páginas {paginas} do livro"))

    # 4. toda frase que cita o livro precisa estar coberta por uma entrada.
    for texto in corpo:
        for frase in frases(texto):
            if livro["citacao"] in frase and not any(e["trecho"] in frase or frase in e["trecho"] for e in entradas):
                excecoes.append(Excecao(3, f"citação do livro sem entrada no manifesto: “{frase[:100]}…”"))
    return {"conferidas": conferidas, "excecoes": excecoes, "pdf": str(pdf), "deslocamento": livro.get("deslocamentoPaginaImpressa")}


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("classe", choices=["adultos", "jovens"])
    ap.add_argument("numero", type=int)
    ap.add_argument("--edicao", default="2026-4t")
    a = ap.parse_args()
    r = verificar(a.classe, a.numero, a.edicao)
    print(f"Entradas conferidas no PDF: {len(r['conferidas'])} | exceções: {len(r['excecoes'])}")
    for e in r["conferidas"]:
        print(f"  ✓ {e['id']}: " + "; ".join(f"p. {x['pagina']} “{x['frase']}”" for x in e["ancoras"]))
    for e in r["excecoes"]:
        print(f"  ✗ {e['mensagem']}")
