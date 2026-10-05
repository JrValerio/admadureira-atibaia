"""
Camada 5 do gate: revisão adversarial por subagente de contexto limpo.

A camada 4 prova que cada afirmação tem uma fonte que existe e trata do assunto.
Esta camada julga se a fonte sustenta a frase. Quem julga é um subagente que
recebe só uma pasta isolada (fora do repositório) com:
- afirmacoes.json: cada frase do mapa e cada frase ancorada só por referência,
  com os trechos das fontes (versículos ARC completos; trecho da revista ou do
  livro em volta da âncora, com a página);
- licao.md: o texto da lição, campo por campo, para o checklist geral;
- revista.txt: as páginas da lição na revista do professor;
- prompt.txt: a instrução, gerada do modelo fixo scripts/gate/prompt-revisao.md
  (a pasta é o único parâmetro).

Fluxo:
  1. python scripts/gate/revisao.py adultos 4 --isolar <pasta fora do repo>
     -> monta a pasta e imprime o sha256 do modelo e do prompt.txt;
  2. o agente principal envia prompt.txt, sem alteração, a um subagente novo;
  3. python scripts/gate/revisao.py adultos 4 --gravar <resposta.json>
     -> valida e grava tmp/gate/<lição>/revisao.json (fora do git: tem texto da ARC);
  4. relatorio.py lê o resultado: vão para as exceções os vereditos "parcial" e
     "nao_sustentada", os achados do checklist, veredito sem trecho literal das
     fontes, item sem veredito e revisão feita sobre um texto que já mudou. Três
     vereditos "sustentada" são sorteados para o revisor auditar o subagente.

O isolamento é conferido no registro de ferramentas do subagente
(scripts/gate/auditar_subagente.py), como na transcrição às cegas.
"""

import argparse
import hashlib
import json
import re
import shutil
from pathlib import Path

import afirmacoes
from comum import RAIZ, TMP, Excecao, carregar_licao, normalizar, texto_pagina, textos_da_licao

MODELO = Path(__file__).with_name("prompt-revisao.md")
VEREDITOS = ("sustentada", "parcial", "nao_sustentada")
CHECKLIST = ("correcao_ao_comentarista", "institucional_ou_nomes", "diverge_da_revista", "tom")
JANELA = 600


def trecho_da_pagina(pdf, pagina, ancora):
    """O parágrafo em volta da âncora: janela na página, estendida até o fim das frases."""
    bruto = " ".join(texto_pagina(pdf, pagina).split())
    m = re.search(r"\s+".join(re.escape(p) for p in ancora.split()), bruto, re.IGNORECASE)
    if not m:
        return bruto  # aspas ou hifenização diferentes: vai a página inteira
    ini = bruto.rfind(". ", 0, max(0, m.start() - JANELA))
    fim = bruto.find(". ", min(len(bruto), m.end() + JANELA))
    return bruto[ini + 2 if ini >= 0 else 0:fim + 1 if fim >= 0 else len(bruto)]


def itens(classe, numero, edicao, dados=None):
    dados = dados or carregar_licao(classe, edicao, numero)
    c4 = afirmacoes.verificar(classe, numero, edicao, dados)
    saida = []
    for m in c4["mapeadas"]:
        fontes = []
        for f in m["fontes"]:
            if f["fonte"] == "biblia":
                fontes += [{"fonte": "Bíblia (ARC)", "onde": rotulo, "trecho": texto} for rotulo, texto in afirmacoes.versos_da_referencia(f["ref"])]
            else:
                pdf = c4["revista_pdf"] if f["fonte"] == "revista" else c4["livro_pdf"]
                nome = "revista do professor" if f["fonte"] == "revista" else "livro de apoio"
                fontes.append({"fonte": nome, "onde": f"PDF p. {f['pagina']}", "trecho": trecho_da_pagina(pdf, f["pagina"], f["ancora"])})
        saida.append({"id": m["id"], "tipo": "mapa", "campo": m["campo"], "frase": m["frase"], "paragrafo": m["paragrafo"], "fontes": fontes})
    for i, r in enumerate(c4["por_referencia"], 1):
        fontes = [{"fonte": "Bíblia (ARC)", "onde": rotulo, "trecho": texto} for rotulo, texto in afirmacoes.versos_da_referencia(r["frase"])]
        unicas = list({f["onde"]: f for f in fontes}.values())[:40]
        saida.append({"id": f"REF-{i:02d}", "tipo": "referencia", "campo": r["campo"], "frase": r["frase"], "paragrafo": r["paragrafo"], "fontes": unicas})
    return dados, c4, saida


def impressao(lista):
    """Identidade do que foi julgado: muda se uma frase ou uma fonte mudar."""
    base = [(i["id"], i["frase"], [(f["onde"], f["trecho"]) for f in i["fontes"]]) for i in lista]
    return hashlib.sha256(json.dumps(base, ensure_ascii=False, sort_keys=True).encode()).hexdigest()[:16]


def pasta_resultado(classe, numero, edicao):
    return TMP / "gate" / f"{classe}-{edicao}-licao-{numero}"


def isolar(classe, numero, edicao, destino):
    destino = Path(destino).resolve()
    if destino.is_relative_to(RAIZ):
        raise SystemExit(f"--isolar precisa ficar fora do repositório: {destino}")
    dados, c4, lista = itens(classe, numero, edicao)
    if c4["excecoes"]:
        raise SystemExit(f"a camada 4 tem {len(c4['excecoes'])} exceção(ões); resolva antes da revisão")
    if destino.exists():
        shutil.rmtree(destino)
    destino.mkdir(parents=True)
    (destino / "afirmacoes.json").write_text(json.dumps(lista, ensure_ascii=False, indent=1), encoding="utf-8")
    linhas = [f"# Lição {numero} · {dados['licao']['titulo']}", ""]
    for campo, texto in dict.fromkeys(textos_da_licao(dados)):
        if not campo.endswith(".id"):
            linhas += [f"## {campo}", "", texto, ""]
    (destino / "licao.md").write_text("\n".join(linhas), encoding="utf-8")
    (destino / "revista.txt").write_text(
        "\n\n".join(f"=== PDF p. {p} ===\n" + texto_pagina(c4["revista_pdf"], p) for p in c4["paginas_revista"]), encoding="utf-8")
    modelo = MODELO.read_text(encoding="utf-8")
    prompt = modelo.replace("{{PASTA}}", str(destino))
    (destino / "prompt.txt").write_text(prompt, encoding="utf-8")
    print(f"{len(lista)} afirmações ({sum(i['tipo'] == 'mapa' for i in lista)} do mapa, {sum(i['tipo'] == 'referencia' for i in lista)} por referência) em {destino}")
    print(f"Modelo sha256 {hashlib.sha256(modelo.encode()).hexdigest()[:16]} · prompt.txt sha256 {hashlib.sha256(prompt.encode()).hexdigest()[:16]} · impressão {impressao(lista)}")


def gravar(classe, numero, edicao, resposta):
    _dados, _c4, lista = itens(classe, numero, edicao)
    bruto = Path(resposta).read_text(encoding="utf-8")
    obj = json.loads(bruto[bruto.index("{"):bruto.rindex("}") + 1])
    destino = pasta_resultado(classe, numero, edicao)
    destino.mkdir(parents=True, exist_ok=True)
    (destino / "revisao.json").write_text(json.dumps({"impressao": impressao(lista), **obj}, ensure_ascii=False, indent=1), encoding="utf-8")
    r = verificar(classe, numero, edicao)
    print(f"Gravado em {destino / 'revisao.json'}: {len(r['sustentadas'])} sustentadas, {len(r['excecoes'])} exceção(ões)")
    for e in r["excecoes"]:
        print("  -", e["mensagem"])


def verificar(classe, numero, edicao="2026-4t", dados=None):
    _dados, c4, lista = itens(classe, numero, edicao, dados)
    arquivo = pasta_resultado(classe, numero, edicao) / "revisao.json"
    if c4["excecoes"]:
        return {"sustentadas": [], "excecoes": [Excecao(5, "revisão adversarial não roda enquanto a camada 4 tiver exceções")], "total": len(lista)}
    if not arquivo.exists():
        return {"sustentadas": [], "excecoes": [Excecao(5, f"revisão adversarial pendente ({len(lista)} afirmações a julgar)")], "total": len(lista)}
    obj = json.loads(arquivo.read_text(encoding="utf-8"))
    if obj.get("impressao") != impressao(lista):
        return {"sustentadas": [], "excecoes": [Excecao(5, "a revisão adversarial foi feita sobre um texto ou fontes que já mudaram — refazer")], "total": len(lista)}
    por_id = {v.get("id"): v for v in obj.get("vereditos", [])}
    excecoes, sustentadas = [], []
    for item in lista:
        v = por_id.get(item["id"])
        if not v:
            excecoes.append(Excecao(5, f"{item['id']}: sem veredito — “{item['frase'][:90]}”"))
            continue
        fontes = normalizar(" ".join(f["trecho"] or "" for f in item["fontes"]))
        trecho = (v.get("trecho") or "").strip()
        if v.get("veredito") not in VEREDITOS:
            excecoes.append(Excecao(5, f"{item['id']}: veredito inválido “{v.get('veredito')}”"))
        elif len(trecho.split()) < 3 or normalizar(trecho) not in fontes:
            excecoes.append(Excecao(5, f"{item['id']}: o veredito “{v['veredito']}” não cita trecho literal das fontes — não vale (“{item['frase'][:80]}”)"))
        elif v["veredito"] == "sustentada":
            sustentadas.append({**item, "trecho": trecho})
        else:
            rotulo = "parcialmente sustentada" if v["veredito"] == "parcial" else "NÃO sustentada"
            excecoes.append(Excecao(5, f"{item['id']} ({item['tipo']}): {rotulo} — “{item['frase']}” · fonte: “{trecho[:160]}” · {v.get('nota', 'sem nota')}", frase=item["frase"]))
    for chave in CHECKLIST:
        for achado in (obj.get("checklist") or {}).get(chave, []):
            excecoes.append(Excecao(5, f"checklist · {chave}: “{achado.get('frase', '')[:120]}” ({achado.get('campo', '?')}) — {achado.get('motivo', '')}"))
    if set(CHECKLIST) - set(obj.get("checklist") or {}):
        excecoes.append(Excecao(5, "checklist incompleto na resposta do subagente"))
    return {"sustentadas": sustentadas, "excecoes": excecoes, "total": len(lista)}


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("classe", choices=["adultos", "jovens"])
    ap.add_argument("numero", type=int)
    ap.add_argument("--edicao", default="2026-4t")
    ap.add_argument("--isolar", help="pasta fora do repositório para o subagente")
    ap.add_argument("--gravar", help="arquivo com a resposta do subagente (o JSON devolvido)")
    a = ap.parse_args()
    if a.isolar:
        isolar(a.classe, a.numero, a.edicao, a.isolar)
    elif a.gravar:
        gravar(a.classe, a.numero, a.edicao, a.gravar)
    else:
        r = verificar(a.classe, a.numero, a.edicao)
        print(f"{r['total']} afirmações · {len(r['sustentadas'])} sustentadas · {len(r['excecoes'])} exceção(ões)")
        for e in r["excecoes"]:
            print("  -", e["mensagem"])
