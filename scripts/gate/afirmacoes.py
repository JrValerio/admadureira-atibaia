"""
Camada 4 do gate: mapa afirmação → fonte.

Toda frase dos campos doutrinários da lição (introdução, parágrafos e
aprofundamento dos tópicos, contexto histórico e conclusão) precisa de uma
âncora que este script confere. Uma frase está ancorada quando:

1. tem citação entre aspas ou citação do livro de apoio (conferidas pelas
   camadas 2 e 3);
2. tem referência bíblica, e todo versículo citado existe na ARC;
3. ou tem entrada em src/data/ebd/<edicao>/fontes/mapa-afirmacoes.json com ao
   menos uma fonte cuja âncora é literal:
     {"fonte": "biblia",  "ref": "Dt 4.7", "ancora": "<trecho do versículo>"}
     {"fonte": "revista", "pagina": 23,     "ancora": "<trecho da página>"}
     {"fonte": "livro",   "pagina": 41,     "ancora": "<trecho da página>"}

Frase sem nenhuma das três é exceção: ganha fonte, é reescrita ou sai do texto.
A âncora prova que a fonte existe e trata do assunto; se a frase diz o que a
fonte diz é o que a camada 5 (revisão adversarial) e o revisor humano julgam.

Os campos pedagógicos (objetivos, planejamento, aplicações, perguntas, tarefas,
esboço, condução e fechamento) e os de síntese (sinopse, ideia central, frase de
síntese) não entram aqui: não afirmam nada além do corpo, e a camada 5 os lê.

Uso: python scripts/gate/afirmacoes.py adultos 3 [--edicao 2026-4t]
"""

import argparse
import re

import arc
from citacoes_biblicas import ASPAS, CITACAO_LIVRO
from comum import (
    MATERIAL, Excecao, carregar_licao, frases, ler_json, normalizar, paginas_alinhadas,
    pasta_fontes, referencias, revistas, texto_pagina, textos_da_licao,
)

# Nomes dos campos como o site os monta (subsídio de Adultos e de Jovens e campos da lição).
DOUTRINARIOS = {
    "visaoGeral.resumo", "arranquePedagogico.interacao", "licao.resumo",
    "desenvolvimento.explicacaoBiblica", "desenvolvimento.aprofundamentoDoutrinario",
    "aprofundamento.contextoHistorico", "aprofundamentoOpcional.contextoBiblico",
    "revisao.conclusao", "licao.aplicacao",
}


def mapa(edicao):
    return ler_json(pasta_fontes(edicao) / "mapa-afirmacoes.json", [])


def versiculos_inexistentes(frase):
    faltam = []
    for _id, nome, slug, cap, vs, _i, _f in referencias(frase):
        try:
            texto = arc.capitulo(slug, cap)
        except Exception as erro:  # capítulo inexistente ou rede fora
            faltam.append(f"{nome} {cap} ({erro.__class__.__name__})")
            continue
        faltam += [f"{nome} {cap}.{v}" for v in vs if v not in texto and str(v) not in texto]
    return faltam


def fonte_confere(fonte, classe, numero, edicao, livro_pdf, revista_pdf, paginas_revista):
    alvo = normalizar(fonte["ancora"])
    if fonte["fonte"] == "biblia":
        achadas = referencias(fonte["ref"])
        if not achadas:
            return f"referência “{fonte['ref']}” não reconhecida"
        _id, nome, slug, cap, vs, _i, _f = achadas[0]
        texto = arc.capitulo(slug, cap)
        versos = " ".join(texto.get(v) or texto.get(str(v)) or "" for v in vs) if vs else " ".join(texto.values())
        return None if alvo in normalizar(versos) else f"âncora “{fonte['ancora']}” não está em {fonte['ref']} (ARC)"
    if fonte["fonte"] == "revista":
        if fonte["pagina"] not in paginas_revista:
            return f"a página {fonte['pagina']} não é da lição {numero} na revista (páginas {paginas_revista})"
        return None if alvo in normalizar(texto_pagina(revista_pdf, fonte["pagina"])) else f"âncora “{fonte['ancora']}” não está na revista, PDF p. {fonte['pagina']}"
    if fonte["fonte"] == "livro":
        return None if alvo in normalizar(texto_pagina(livro_pdf, fonte["pagina"])) else f"âncora “{fonte['ancora']}” não está no livro de apoio, PDF p. {fonte['pagina']}"
    return f"tipo de fonte desconhecido: {fonte['fonte']}"


def verificar(classe, numero, edicao="2026-4t", dados=None):
    dados = dados or carregar_licao(classe, edicao, numero)
    manifesto = ler_json(pasta_fontes(edicao) / "livro-apoio.json", {})
    livro_pdf = MATERIAL / manifesto["livros"][classe]["arquivo"]
    fontes_revista = revistas(classe, edicao)
    paginas_revista = paginas_alinhadas(fontes_revista, classe, numero)["canonica"]
    entradas = [e for e in mapa(edicao) if e["classe"] == classe and e["licao"] == numero]
    usadas, excecoes, ancoradas = set(), [], {"citacao": 0, "referencia": 0, "mapa": 0}
    detalhes = []

    vistas = set()
    for campo, texto in textos_da_licao(dados):
        if campo not in DOUTRINARIOS:
            continue
        for frase in frases(texto):
            # O mesmo texto pode ser renderizado em dois campos; cada frase conta uma vez.
            if frase in vistas:
                continue
            vistas.add(frase)
            if ASPAS.search(frase) or CITACAO_LIVRO.search(frase):
                ancoradas["citacao"] += 1
                continue
            if referencias(frase):
                faltam = versiculos_inexistentes(frase)
                if faltam:
                    excecoes.append(Excecao(4, f"{campo}: versículo inexistente na ARC ({', '.join(faltam)}) em “{frase[:90]}…”", campo=campo))
                else:
                    ancoradas["referencia"] += 1
                continue
            donas = [e for e in entradas if normalizar(e["frase"]) in normalizar(frase)]
            if not donas:
                excecoes.append(Excecao(4, f"{campo}: afirmação sem âncora — “{frase[:110]}{'…' if len(frase) > 110 else ''}”", campo=campo, frase=frase))
                continue
            entrada = donas[0]
            usadas.add(entrada["id"])
            problemas = [p for p in (fonte_confere(f, classe, numero, edicao, livro_pdf, fontes_revista["canonica"], paginas_revista) for f in entrada["fontes"]) if p]
            if not entrada["fontes"]:
                problemas.append("entrada sem fonte")
            if problemas:
                excecoes.append(Excecao(4, f"{entrada['id']}: " + "; ".join(problemas), campo=campo, frase=frase))
            else:
                ancoradas["mapa"] += 1
                detalhes.append({"id": entrada["id"], "campo": campo, "frase": frase, "fontes": entrada["fontes"]})

    for e in entradas:
        if e["id"] not in usadas:
            excecoes.append(Excecao(4, f"{e['id']}: a frase do mapa não está mais no texto da lição — atualizar ou remover a entrada"))
    return {"ancoradas": ancoradas, "mapeadas": detalhes, "excecoes": excecoes, "paginas_revista": paginas_revista}


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("classe", choices=["adultos", "jovens"])
    ap.add_argument("numero", type=int)
    ap.add_argument("--edicao", default="2026-4t")
    a = ap.parse_args()
    r = verificar(a.classe, a.numero, a.edicao)
    print(f"Ancoradas — por citação: {r['ancoradas']['citacao']} | por referência existente: {r['ancoradas']['referencia']} | pelo mapa: {r['ancoradas']['mapa']} | exceções: {len(r['excecoes'])}")
    for e in r["excecoes"]:
        print("  -", e["mensagem"])
