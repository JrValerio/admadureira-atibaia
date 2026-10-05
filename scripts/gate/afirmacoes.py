"""
Camada 4 do gate: mapa afirmação → fonte.

Toda frase dos campos doutrinários da lição (introdução, parágrafos e
aprofundamento dos tópicos, contexto histórico, conclusão e aplicação) precisa
de uma âncora que este script confere. Da mais forte para a mais fraca:

1. citação: a frase tem trecho entre aspas ou citação do livro de apoio,
   conferidos pelas camadas 2 e 3;
2. mapa: a frase tem entrada em src/data/ebd/<edicao>/fontes/mapa-afirmacoes.json
   com ao menos uma fonte cuja âncora é literal:
     {"fonte": "biblia",  "ref": "Dt 4.7", "ancora": "<trecho do versículo>"}
     {"fonte": "revista", "pagina": 23,     "ancora": "<trecho da página>"}
     {"fonte": "livro",   "pagina": 41,     "ancora": "<trecho da página>"}
3. referência: a frase cita versículos, e todos existem na ARC. É a categoria
   mais fraca: o script só sabe que o versículo existe, não que ele sustenta a
   frase. Acrescentar versículo para a frase "passar" é proof-texting; por
   isso a camada 5 julga estas frases, uma a uma, como as do mapa.

Frase sem nenhuma das três é exceção: ganha fonte, é reescrita ou sai do texto.

Regras da âncora do mapa: no mínimo 6 palavras (trecho curto existe em quase
qualquer página e não sustenta nada) e, se a frase da fonte nega, a negação
entra na âncora ("Não foi Jesus quem se autoexaltou", nunca "Jesus quem se
autoexaltou").

A âncora prova que a fonte existe e trata do assunto. Se a frase diz o que a
fonte diz é julgamento da camada 5 (scripts/gate/revisao.py) e do revisor.

Os campos pedagógicos (objetivos, planejamento, aplicações, perguntas, tarefas,
esboço, condução e fechamento) e os de síntese (sinopse, ideia central, frase de
síntese) não entram aqui; a camada 5 os lê no checklist geral.

Uso: python scripts/gate/afirmacoes.py adultos 3 [--edicao 2026-4t]
"""

import argparse

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
MINIMO_PALAVRAS = 6


def mapa(edicao):
    return ler_json(pasta_fontes(edicao) / "mapa-afirmacoes.json", [])


def versos_da_referencia(ref):
    """[(rótulo, texto)] dos versículos de uma referência, na ARC."""
    saida = []
    for _id, nome, slug, cap, vs, _i, _f in referencias(ref):
        texto = arc.capitulo(slug, cap)
        numeros = vs or sorted(int(n) for n in texto)
        for v in numeros:
            saida.append((f"{nome} {cap}.{v}", texto.get(v) or texto.get(str(v))))
    return saida


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


def fonte_confere(fonte, numero, livro_pdf, revista_pdf, paginas_revista):
    if len(fonte["ancora"].split()) < MINIMO_PALAVRAS:
        return f"âncora “{fonte['ancora']}” tem menos de {MINIMO_PALAVRAS} palavras"
    alvo = normalizar(fonte["ancora"])
    if fonte["fonte"] == "biblia":
        versos = versos_da_referencia(fonte["ref"])
        if not versos:
            return f"referência “{fonte['ref']}” não reconhecida"
        return None if alvo in normalizar(" ".join(t or "" for _, t in versos)) else f"âncora “{fonte['ancora']}” não está em {fonte['ref']} (ARC)"
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
    usadas, excecoes, ancoradas = set(), [], {"citacao": 0, "mapa": 0, "referencia": 0}
    mapeadas, por_referencia = [], []

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
            donas = [e for e in entradas if normalizar(e["frase"]) in normalizar(frase)]
            if donas:
                entrada = donas[0]
                usadas.add(entrada["id"])
                problemas = [p for p in (fonte_confere(f, numero, livro_pdf, fontes_revista["canonica"], paginas_revista) for f in entrada["fontes"]) if p]
                if not entrada["fontes"]:
                    problemas.append("entrada sem fonte")
                if problemas:
                    excecoes.append(Excecao(4, f"{entrada['id']}: " + "; ".join(problemas), campo=campo, frase=frase))
                else:
                    ancoradas["mapa"] += 1
                    mapeadas.append({"id": entrada["id"], "campo": campo, "frase": frase, "paragrafo": texto, "fontes": entrada["fontes"]})
                continue
            if referencias(frase):
                faltam = versiculos_inexistentes(frase)
                if faltam:
                    excecoes.append(Excecao(4, f"{campo}: versículo inexistente na ARC ({', '.join(faltam)}) em “{frase[:90]}…”", campo=campo))
                else:
                    ancoradas["referencia"] += 1
                    por_referencia.append({"campo": campo, "frase": frase, "paragrafo": texto})
                continue
            excecoes.append(Excecao(4, f"{campo}: afirmação sem âncora — “{frase[:110]}{'…' if len(frase) > 110 else ''}”", campo=campo, frase=frase))

    for e in entradas:
        if e["id"] not in usadas:
            excecoes.append(Excecao(4, f"{e['id']}: a frase do mapa não está mais no texto da lição — atualizar ou remover a entrada"))
    return {
        "ancoradas": ancoradas, "mapeadas": mapeadas, "por_referencia": por_referencia, "excecoes": excecoes,
        "livro_pdf": livro_pdf, "revista_pdf": fontes_revista["canonica"], "paginas_revista": paginas_revista,
    }


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("classe", choices=["adultos", "jovens"])
    ap.add_argument("numero", type=int)
    ap.add_argument("--edicao", default="2026-4t")
    a = ap.parse_args()
    r = verificar(a.classe, a.numero, a.edicao)
    print(f"Ancoradas — por citação: {r['ancoradas']['citacao']} | pelo mapa: {r['ancoradas']['mapa']} | só por referência (a mais fraca): {r['ancoradas']['referencia']} | exceções: {len(r['excecoes'])}")
    for e in r["excecoes"]:
        print("  -", e["mensagem"])
