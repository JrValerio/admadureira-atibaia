"""
Orquestrador do gate: roda as camadas 1 a 5 numa lição e gera o relatório de
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

import afirmacoes
import cabecalho
import citacoes_biblicas
import livro_apoio
import revisao
from comum import MATERIAL, TMP, cabecalhos, carregar_licao, recortar, revistas


def gerar(classe, numero, edicao="2026-4t", semente=None):
    saida = TMP / "gate" / f"{classe}-{edicao}-licao-{numero}"
    dados = carregar_licao(classe, edicao, numero)
    c1 = cabecalho.verificar(classe, numero, edicao, saida)
    c2 = citacoes_biblicas.verificar(classe, numero, edicao, dados)
    c3 = livro_apoio.verificar(classe, numero, edicao, dados, c2["do_livro"], saida)
    c4 = afirmacoes.verificar(classe, numero, edicao, dados)
    c5 = revisao.verificar(classe, numero, edicao, dados)
    excecoes = c1["excecoes"] + c2["excecoes"] + c3["excecoes"] + c4["excecoes"] + c5["excecoes"]

    semente = semente if semente is not None else int(time.time())
    sorteaveis = [("biblia", c) for c in c2["conferidas"] if c.get("url")] + [("livro", e) for e in c3["conferidas"]]
    tipo, sorteada = random.Random(semente).choice(sorteaveis) if sorteaveis else (None, None)

    corpo, licao = dados["corpo"], dados["licao"]
    ideia = (corpo.get("visaoGeral") or {}).get("ideiaCentral")
    sinopses = [(t["titulo"], t.get("sinopse")) for t in corpo.get("desenvolvimento", [])]

    L = [f"# Gate · {classe.capitalize()} L{numero} · {dados['edicao']['rotulo']} · {dados['edicao']['titulo']}", ""]
    L.append(f"Lição `{licao['id']}` ({licao['data']}), status `{licao['statusEditorial']}`. Semente do sorteio: `{semente}`.")
    L += ["", "## Resultado por camada", "",
          "| Camada | Conferido por script | Transcrito às cegas na imagem (o script compara) | Exceções |", "|---|---|---|---|",
          f"| 1. Cabeçalho × dois OCRs | {len(c1['conferidos'])} campos nos dois OCRs | {len(c1['resolvidos'])} | {len(c1['excecoes'])} |",
          f"| 2. Citações bíblicas (ARC) | {len(c2['conferidas'])} citações | — | {len(c2['excecoes'])} |",
          f"| 3. Livro de apoio | {len(c3['conferidas'])} citações com âncora no PDF | — | {len(c3['excecoes'])} |",
          f"| 4. Afirmação → fonte | {c4['ancoradas']['citacao']} frases por citação, {c4['ancoradas']['mapa']} pelo mapa, {c4['ancoradas']['referencia']} só por referência (a mais fraca) | — | {len(c4['excecoes'])} |",
          f"| 5. Revisão adversarial | {len(c5['sustentadas'])} de {c5['total']} afirmações julgadas sustentadas (as do mapa e as só por referência) | — | {len(c5['excecoes'])} |", ""]

    L += ["## Exceções", ""]
    if excecoes:
        for e in excecoes:
            extra = f" — imagem: `{e['imagem']}`" if e.get("imagem") else ""
            L.append(f"- **Camada {e['camada']}:** {e['mensagem']}{extra}")
    else:
        L.append("Nenhuma. Tudo o que as camadas 1 a 5 cobrem foi conferido por script, resolvido na imagem ou julgado sustentado pelo revisor adversarial.")
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

    # Auditoria do agente: uma transcrição às cegas sorteada, com o recorte da seção.
    L += ["## Transcrição às cegas sorteada para auditar", ""]
    if c1["resolvidos"]:
        ident, t = random.Random(semente + 1).choice(c1["resolvidos"])
        campo = ident.split("-", 2)[2]
        seed = cabecalhos(edicao)[classe]["licoes"][numero - 1]
        hinos = dados["cabecalho"].get("hinosSugeridos") if classe == "adultos" else None
        _, _, _, rotulo, secao = next(c for c in cabecalho.campos(classe, seed, hinos) if c[0] == campo)
        pagina, imagem = cabecalho.recorte_da_secao(revistas(classe, edicao)["canonica"], [t["pagina"]], secao,
                                                    saida / "sorteio" / f"transcricao-{campo.replace('[', '_').replace(']', '')}.png")
        L += [f"Campo: `{ident}` ({rotulo}), PDF p. {pagina}", "",
              f"O agente leu, sem ver o valor esperado: “{t['lido']}” ({t.get('lidoEm', '')})", "",
              f"Recorte da página: `{imagem}`", "",
              "Confira: o que está impresso no recorte é exatamente o que o agente leu."]
    else:
        L.append("Nenhuma transcrição nesta lição: todos os campos foram confirmados pelos dois OCRs.")
    L.append("")

    if c1["resolvidos"]:
        L += ["## Transcrito às cegas pelo agente (camada 1)", "",
              "Campos que os dois OCRs não confirmaram. O agente leu o recorte sem ver o valor esperado, e o script comparou com o JSON.", ""]
        for ident, t in c1["resolvidos"]:
            L.append(f"- `{ident}`: lido “{t['lido']}” (PDF p. {t['pagina']}, {t.get('lidoEm', '')})")
        L.append("")

    # Auditoria do mapa: uma afirmação sorteada, com a fonte que a sustenta.
    L += ["## Afirmação sorteada do mapa (camada 4)", ""]
    if c4["mapeadas"]:
        m = random.Random(semente + 2).choice(c4["mapeadas"])
        L += [f"No texto do site (`{m['campo']}`): {m['frase']}", "", "Fontes registradas (âncora conferida pelo script):", ""]
        for f in m["fontes"]:
            onde = f["ref"] + " (ARC)" if f["fonte"] == "biblia" else f"{f['fonte']}, PDF p. {f['pagina']}"
            L.append(f"- {onde}: “{f['ancora']}”")
        L += ["", "Confira: a fonte sustenta o que a frase afirma, sem acréscimo.", ""]
    else:
        L += ["Nenhuma afirmação precisou do mapa nesta lição.", ""]

    # Auditoria do revisor adversarial: três vereditos "sustentada" sorteados.
    L += ["## Vereditos “sustentada” sorteados (camada 5)", ""]
    if c5["sustentadas"]:
        amostra = random.Random(semente + 3).sample(c5["sustentadas"], min(3, len(c5["sustentadas"])))
        for v in amostra:
            L += [f"- `{v['id']}` ({v['tipo']}): {v['frase']}", f"  - trecho da fonte citado pelo revisor: “{v['trecho']}”"]
        L += ["", "Confira: em cada um, o trecho citado diz o que a frase afirma.", ""]
    else:
        L += ["Nenhum veredito disponível (revisão pendente ou com exceções).", ""]

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
