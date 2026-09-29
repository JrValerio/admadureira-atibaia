"""
Camada 2 do gate: toda citação bíblica entre aspas precisa ser trecho literal
da ARC.

Para cada trecho entre aspas (“…”) do corpo da lição:
1. associa as referências da mesma frase; "versículo N" sem livro usa o último
   capítulo citado antes, no mesmo parágrafo;
2. procura o trecho, literalmente (caixa e espaços normalizados), no texto
   ARC dos versículos associados (bibliaonline, com cache) e, em seguida, nas
   páginas da lição nas duas revistas;
3. frase que cita o livro de apoio "(Autor, Livro, cap. N)" e cujo trecho não
   é bíblico: a citação é do livro e fica para a camada 3;
4. nada disso: exceção. A regra é que a citação sai do texto (ou é corrigida
   para a forma literal).

Uso: python scripts/gate/citacoes_biblicas.py jovens 2 [--edicao 2026-4t]
"""

import argparse
import re

import arc
from comum import (
    Excecao, VERSICULO_REGEX, carregar_licao, frases, normalizar, paginas_alinhadas,
    referencias, revistas, texto_pagina, textos,
)

ASPAS = re.compile(r"“([^”]+)”")
CITACAO_LIVRO = re.compile(r"\([^()]*,\s*[^()]*,\s*cap\.\s*\d+\)")


def trechos(citacao):
    """Divide em partes quando há supressão ([...] ou …); cada parte precisa bater."""
    return [p.strip(" ,;:.") for p in re.split(r"\[\s*\.\.\.\s*\]|…", citacao) if p.strip(" ,;:.")]


def candidatos(paragrafo, inicio_frase, frase, principais=()):
    """Referências associadas a uma frase: as dela e, para 'versículo N' sem livro,
    o último capítulo citado antes no parágrafo e os capítulos do texto da lição."""
    refs = [(slug, cap, vs, nome) for _id, nome, slug, cap, vs, _i, _f in referencias(frase)]
    anteriores = [(r[2], r[3], r[1]) for r in referencias(paragrafo) if r[5] < inicio_frase + len(frase)]
    contextos = list(dict.fromkeys(anteriores[-1:] + list(principais)))
    for m in VERSICULO_REGEX.finditer(frase):
        fim = int(m.group(2) or m.group(1))
        for slug, cap, nome in contextos:
            refs.append((slug, cap, list(range(int(m.group(1)), fim + 1)), nome))
    return refs


def verificar(classe, numero, edicao="2026-4t", dados=None):
    dados = dados or carregar_licao(classe, edicao, numero)
    corpo = [t for _, t in textos(dados["corpo"])] + [dados["licao"]["resumo"]]
    fontes = revistas(classe, edicao)
    paginas = paginas_alinhadas(fontes, classe, numero)
    texto_revista = {n: normalizar("\n".join(texto_pagina(fontes[n], p) for p in paginas[n])) for n in fontes}
    # Capítulos do texto bíblico da lição: contexto de "versículo N" sem livro.
    principais = [(r[2], r[3], r[1]) for ref in dados["licao"]["leituraBiblica"] for r in referencias(ref)]

    conferidas, do_livro, excecoes, vistos = [], [], [], set()
    for paragrafo in dict.fromkeys(corpo):
        pos = 0
        for frase in frases(paragrafo):
            inicio = paragrafo.find(frase, pos)
            pos = max(pos, inicio)
            for m in ASPAS.finditer(frase):
                citacao = m.group(1)
                chave = (citacao, frase)
                if chave in vistos:
                    continue
                vistos.add(chave)
                refs = candidatos(paragrafo, max(inicio, 0), frase, principais)
                achou = None
                for slug, cap, vs, nome in refs:
                    try:
                        cap_arc = arc.capitulo(slug, cap)
                    except Exception as erro:  # rede fora: não aprova nem reprova em silêncio
                        excecoes.append(Excecao(2, f"ARC indisponível para {nome} {cap}: {erro}", citacao=citacao, frase=frase))
                        continue
                    alvo = normalizar(" ".join(cap_arc.get(v, "") for v in (vs or sorted(cap_arc))))
                    if all(normalizar(t) in alvo for t in trechos(citacao)):
                        achou = {"fonte": "bibliaonline ARC", "ref": f"{nome} {cap}:{','.join(map(str, vs)) or '*'}",
                                 "url": arc.url(slug, cap), "versiculos": {v: cap_arc.get(v) for v in vs}}
                        break
                if not achou:
                    for nome_rev, texto in texto_revista.items():
                        if all(normalizar(t) in texto for t in trechos(citacao)):
                            achou = {"fonte": f"revista ({nome_rev}), PDF p. {paginas[nome_rev][0]}–{paginas[nome_rev][-1]}", "ref": ", ".join(f"{r[3]} {r[1]}" for r in refs)}
                            break
                if achou:
                    conferidas.append({"citacao": citacao, **achou})
                elif CITACAO_LIVRO.search(frase):
                    do_livro.append({"citacao": citacao, "frase": frase})
                else:
                    motivo = "sem referência bíblica associada na frase" if not refs else "não é trecho literal da ARC nos versículos associados"
                    excecoes.append(Excecao(2, f"“{citacao}”: {motivo} — a citação sai do texto ou é corrigida",
                                            citacao=citacao, frase=frase,
                                            refs=[f"{r[3]} {r[1]}:{','.join(map(str, r[2]))}" for r in refs]))
    # Rede de segurança: nenhuma aspa pode ficar sem ser examinada.
    total = sum(p.count("“") for p in dict.fromkeys(corpo))
    examinadas = len(conferidas) + len(do_livro) + len([e for e in excecoes if "citacao" in e])
    if examinadas < total:
        excecoes.append(Excecao(2, f"{total - examinadas} trecho(s) entre aspas não examinado(s): revisar a divisão de frases"))
    return {"conferidas": conferidas, "do_livro": do_livro, "excecoes": excecoes}


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("classe", choices=["adultos", "jovens"])
    ap.add_argument("numero", type=int)
    ap.add_argument("--edicao", default="2026-4t")
    a = ap.parse_args()
    r = verificar(a.classe, a.numero, a.edicao)
    print(f"Conferidas na ARC: {len(r['conferidas'])} | do livro de apoio (camada 3): {len(r['do_livro'])} | exceções: {len(r['excecoes'])}")
    for c in r["conferidas"]:
        print(f"  ✓ “{c['citacao']}” — {c['ref']} ({c['fonte']})")
    for c in r["do_livro"]:
        print(f"  → livro: “{c['citacao']}”")
    for e in r["excecoes"]:
        print(f"  ✗ {e['mensagem']} | refs={e.get('refs')}")
