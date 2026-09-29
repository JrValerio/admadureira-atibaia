"""
Camada 1 do gate: cabeçalho da lição × as duas camadas de OCR das revistas.

Cada campo de cabecalhos.json (data, título, texto-chave, verdade prática ou
resumo, leituras da semana, leitura em classe e hinos) é procurado nas páginas
de abertura da lição nas DUAS revistas do professor da edição.

- Encontrado literalmente (após normalização) nas DUAS: confere automaticamente.
  São motores de OCR diferentes; errarem igual no mesmo ponto é improvável.
- Em só uma: não basta. cabecalhos.json foi montado em parte a partir desses
  OCRs, e um erro copiado de um deles bateria com ele mesmo (checagem circular).
- Em uma só ou em nenhuma: o gate recorta a imagem da página e exige uma
  resolução registrada em src/data/ebd/<edicao>/fontes/resolucoes-cabecalho.json,
  feita na imagem, com o valor confirmado. A resolução só vale enquanto o valor
  em cabecalhos.json for exatamente o valor confirmado.

Uso: python scripts/gate/cabecalho.py adultos 2 [--edicao 2026-4t]
"""

import argparse

from comum import (
    Excecao, TMP, cabecalhos, ler_json, normalizar, paginas_alinhadas, pasta_fontes,
    recortar, revistas, similaridade_melhor_trecho, texto_pagina,
)

MESES = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto",
         "setembro", "outubro", "novembro", "dezembro"]


def formas_da_data(iso):
    ano, mes, dia = iso.split("-")
    nome = MESES[int(mes) - 1]
    return [f"{int(dia)} de {nome} de {ano}", f"{dia} de {nome} de {ano}", f"{int(dia)} {nome[:3]} {ano}", f"{dia} {nome[:3]} {ano}"]


def campos(classe, seed, hinos):
    """(id, valor esperado, formas aceitas) de cada campo do cabeçalho."""
    saida = [("data", seed["data"], formas_da_data(seed["data"])), ("titulo", seed["titulo"], [seed["titulo"]])]
    chave = "textoAureo" if classe == "adultos" else "textoPrincipal"
    saida.append((f"{chave}.texto", seed[chave]["texto"], [seed[chave]["texto"]]))
    saida.append((f"{chave}.referencia", seed[chave]["referencia"], [seed[chave]["referencia"]]))
    sintese = "verdadePratica" if classe == "adultos" else "resumoLicao"
    saida.append((sintese, seed[sintese], [seed[sintese]]))
    leituras = "leituraDiaria" if classe == "adultos" else "leituraSemanal"
    for i, item in enumerate(seed[leituras]):
        saida.append((f"{leituras}[{i}].referencia", item["referencia"], [item["referencia"]]))
        saida.append((f"{leituras}[{i}].tema", item["tema"], [item["tema"]]))
    saida.append(("leituraBiblica", seed["leituraBiblica"], [seed["leituraBiblica"]]))
    if hinos:
        numeros = [h.split()[0] for h in hinos]
        saida.append(("hinosSugeridos", ", ".join(numeros), [f"{', '.join(numeros[:-1])} e {numeros[-1]}"]))
    return saida


def verificar(classe, numero, edicao="2026-4t", saida=None):
    seed = cabecalhos(edicao)[classe]["licoes"][numero - 1]
    from comum import carregar_licao  # evita o custo do tsx quando não há hinos
    hinos = carregar_licao(classe, edicao, numero)["cabecalho"].get("hinosSugeridos") if classe == "adultos" else None
    fontes = revistas(classe, edicao)
    paginas = {nome: ps[:3] for nome, ps in paginas_alinhadas(fontes, classe, numero).items()}
    texto = {nome: normalizar("\n".join(texto_pagina(fontes[nome], p) for p in paginas[nome])) for nome in fontes}
    resolucoes = {r["id"]: r for r in ler_json(pasta_fontes(edicao) / "resolucoes-cabecalho.json", [])}
    saida = saida or TMP / "gate" / f"{classe}-{edicao}-licao-{numero}"

    excecoes, conferidos, resolvidos = [], [], []
    for campo, valor, formas in campos(classe, seed, hinos):
        ident = f"{classe}-L{numero}-{campo}"
        onde = [nome for nome in fontes if any(normalizar(f) in texto[nome] for f in formas)]
        if len(onde) == len(fontes):
            conferidos.append((ident, onde))
            continue
        resolucao = resolucoes.get(ident)
        if resolucao and resolucao.get("valor") == valor:
            resolvidos.append((ident, resolucao))
            continue
        semelhanca = {nome: round(max(similaridade_melhor_trecho(f, texto[nome]) for f in formas), 2) for nome in fontes}
        # Recorte da página da lição cujo texto mais se aproxima do valor esperado.
        pagina = max(paginas["canonica"], key=lambda p: max(similaridade_melhor_trecho(f, texto_pagina(fontes["canonica"], p)) for f in formas))
        imagem = recortar(fontes["canonica"], pagina, saida / "cabecalho" / f"{ident.replace('[', '_').replace(']', '')}.png", termo=formas[0])
        if resolucao:
            motivo = "resolução registrada com outro valor"
        elif onde:
            motivo = f"só no OCR {onde[0]}; precisa de confirmação na imagem"
        else:
            motivo = "não encontrado literalmente em nenhuma das duas revistas"
        excecoes.append(Excecao(1, f"{campo}: {motivo}", id=ident, valor=valor, pagina=pagina, so_em=onde,
                                semelhanca_ocr=semelhanca, imagem=str(imagem)))
    return {"conferidos": conferidos, "resolvidos": resolvidos, "excecoes": excecoes, "paginas": paginas}


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("classe", choices=["adultos", "jovens"])
    ap.add_argument("numero", type=int)
    ap.add_argument("--edicao", default="2026-4t")
    a = ap.parse_args()
    r = verificar(a.classe, a.numero, a.edicao)
    print(f"Páginas: {r['paginas']}")
    print(f"Conferidos nos dois OCRs: {len(r['conferidos'])} | resolvidos na imagem: {len(r['resolvidos'])} | exceções: {len(r['excecoes'])}")
    for e in r["excecoes"]:
        print(f"  - {e['id']}: {e['mensagem']} | p. {e['pagina']} | valor={e['valor']!r} | similaridade={e['semelhanca_ocr']}")
