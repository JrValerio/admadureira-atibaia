"""
Orquestrador do gate: roda as camadas 1 a 3 numa lição e gera o relatório de
exceções para o revisor humano.

Saída: tmp/gate/<classe>-<edicao>-licao-<n>/relatorio.md (fora do git), com
- as exceções de cada camada (o que o agente não resolveu sozinho);
- a ideia central e as sinopses, para a leitura doutrinária rápida;
- uma citação sorteada, com a evidência (versículo ARC e link, ou recorte da
  página do livro de apoio), para o revisor auditar o próprio sistema;
- as leituras feitas na imagem pela camada 1, com página.

Uso: python scripts/gate/relatorio.py adultos 2 [--edicao 2026-4t] [--semente N]
     python scripts/gate/relatorio.py todos 2
Sai com código 1 se houver exceção.
"""

import argparse
import random
import sys
import time

import cabecalho
import citacoes_biblicas
import livro_apoio
from comum import MATERIAL, TMP, carregar_licao, recortar


def gerar(classe, numero, edicao="2026-4t", semente=None):
    saida = TMP / "gate" / f"{classe}-{edicao}-licao-{numero}"
    dados = carregar_licao(classe, edicao, numero)
    c1 = cabecalho.verificar(classe, numero, edicao, saida)
    c2 = citacoes_biblicas.verificar(classe, numero, edicao, dados)
    c3 = livro_apoio.verificar(classe, numero, edicao, dados, c2["do_livro"], saida)
    excecoes = c1["excecoes"] + c2["excecoes"] + c3["excecoes"]

    semente = semente if semente is not None else int(time.time())
    sorteaveis = [("biblia", c) for c in c2["conferidas"] if c.get("url")] + [("livro", e) for e in c3["conferidas"]]
    tipo, sorteada = random.Random(semente).choice(sorteaveis) if sorteaveis else (None, None)

    corpo, licao = dados["corpo"], dados["licao"]
    ideia = (corpo.get("visaoGeral") or {}).get("ideiaCentral")
    sinopses = [(t["titulo"], t.get("sinopse")) for t in corpo.get("desenvolvimento", [])]

    L = [f"# Gate · {classe.capitalize()} L{numero} · {dados['edicao']['rotulo']} · {dados['edicao']['titulo']}", ""]
    L.append(f"Lição `{licao['id']}` ({licao['data']}), status `{licao['statusEditorial']}`. Semente do sorteio: `{semente}`.")
    L += ["", "## Resultado por camada", "",
          "| Camada | Conferido por script | Lido na imagem pelo agente | Exceções |", "|---|---|---|---|",
          f"| 1. Cabeçalho × dois OCRs | {len(c1['conferidos'])} campos nos dois OCRs | {len(c1['resolvidos'])} | {len(c1['excecoes'])} |",
          f"| 2. Citações bíblicas (ARC) | {len(c2['conferidas'])} citações | — | {len(c2['excecoes'])} |",
          f"| 3. Livro de apoio | {len(c3['conferidas'])} citações com âncora no PDF | — | {len(c3['excecoes'])} |", ""]

    L += ["## Exceções", ""]
    if excecoes:
        for e in excecoes:
            extra = f" — imagem: `{e['imagem']}`" if e.get("imagem") else ""
            L.append(f"- **Camada {e['camada']}:** {e['mensagem']}{extra}")
    else:
        L.append("Nenhuma. Tudo o que as camadas 1 a 3 cobrem foi conferido por script ou resolvido na imagem (lista no fim).")
    L.append("")

    L += ["## Para ler (2 minutos)", ""]
    if ideia:
        L += [f"**Ideia central:** {ideia}", ""]
    else:
        # Jovens não tem ideia central no modelo: a introdução é a síntese autoral.
        introducao = (corpo.get("arranquePedagogico") or {}).get("interacao") or licao.get("resumo")
        L += [f"**Introdução (síntese da lição):** {introducao}", ""]
    for titulo, sinopse in sinopses:
        L.append(f"- **{titulo}:** {sinopse or '_(sem sinopse)_'}")
    L.append("")

    L += ["## Citação sorteada para auditar", ""]
    if tipo == "biblia":
        L += [f"No texto do site: “{sorteada['citacao']}”", "",
              f"Fonte conferida pelo script: {sorteada['ref']} (ARC) — {sorteada['url']}", ""]
        for v, texto in (sorteada.get("versiculos") or {}).items():
            L.append(f"> {v} {texto}")
        L += ["", "Confira: o trecho entre aspas é literal no versículo acima (abra o link e compare)."]
    elif tipo == "livro":
        pdf = MATERIAL / livro_apoio.manifesto(edicao)["livros"][classe]["arquivo"]
        imagens = [recortar(pdf, a["pagina"], saida / "sorteio" / f"{sorteada['id']}-p{a['pagina']}.png", termo=a["frase"]) for a in sorteada["ancoras"]]
        L += [f"No texto do site: “{sorteada['trecho']}”", "",
              f"Fonte conferida pelo script: {pdf.name}, cap. {sorteada['capitulo']}", ""]
        for a, img in zip(sorteada["ancoras"], imagens):
            L.append(f"- PDF p. {a['pagina']}, âncora “{a['frase']}”: `{img}`")
        L += ["", "Confira: a âncora está na página e o trecho do site diz o que a página diz (sem acrescentar)."]
    else:
        L.append("Nenhuma citação sorteável nesta lição.")
    L.append("")

    if c1["resolvidos"]:
        L += ["## Lido na imagem pelo agente (camada 1)", ""]
        for ident, r in c1["resolvidos"]:
            L.append(f"- `{ident}` = “{r['valor']}” (PDF p. {r['pagina']}): {r.get('nota', '')}")
        L.append("")

    saida.mkdir(parents=True, exist_ok=True)
    arquivo = saida / "relatorio.md"
    arquivo.write_text("\n".join(L), encoding="utf-8")
    return arquivo, excecoes


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("classe", choices=["adultos", "jovens", "todos"])
    ap.add_argument("numero", type=int)
    ap.add_argument("--edicao", default="2026-4t")
    ap.add_argument("--semente", type=int)
    a = ap.parse_args()
    total = 0
    for classe in (["adultos", "jovens"] if a.classe == "todos" else [a.classe]):
        arquivo, excecoes = gerar(classe, a.numero, a.edicao, a.semente)
        total += len(excecoes)
        print(f"{classe} L{a.numero}: {len(excecoes)} exceção(ões) — {arquivo}")
    sys.exit(1 if total else 0)
