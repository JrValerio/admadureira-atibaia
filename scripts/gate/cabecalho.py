"""
Camada 1 do gate: cabeçalho da lição × as duas camadas de OCR das revistas,
com transcrição às cegas na imagem para o que os OCRs não confirmam.

Cada campo de cabecalhos.json (data, título, texto-chave, verdade prática ou
resumo, leituras da semana, leitura em classe e hinos) é procurado nas páginas
de abertura da lição nas DUAS revistas do professor da edição.

- Nas DUAS (após normalização): confere automaticamente. São motores de OCR
  diferentes; errarem igual no mesmo ponto é improvável.
- Em uma só ou em nenhuma: não basta, porque cabecalhos.json foi montado em
  parte a partir desses OCRs (checagem circular). O campo precisa de uma
  TRANSCRIÇÃO ÀS CEGAS da imagem em
  src/data/ebd/<edicao>/fontes/transcricoes-cabecalho.json: quem transcreve vê
  só o recorte e o rótulo do campo (scripts/gate/transcricao.py), nunca o valor
  esperado. O script compara a transcrição com o JSON:
    bate  -> resolvido na imagem;
    diverge -> exceção com as duas versões;
    falta -> exceção "transcrição pendente".

Uso: python scripts/gate/cabecalho.py adultos 2 [--edicao 2026-4t]
"""

import argparse

from comum import (
    Excecao, TMP, abrir, cabecalhos, carregar_licao, fitz, ler_json, normalizar,
    paginas_alinhadas, pasta_fontes, revistas, similaridade_melhor_trecho, texto_pagina,
)

MESES = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto",
         "setembro", "outubro", "novembro", "dezembro"]
DIAS = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"]


def formas_da_data(iso):
    ano, mes, dia = iso.split("-")
    nome = MESES[int(mes) - 1]
    return [f"{int(dia)} de {nome} de {ano}", f"{dia} de {nome} de {ano}", f"{int(dia)} {nome[:3]} {ano}", f"{dia} {nome[:3]} {ano}"]


def campos(classe, seed, hinos):
    """(id, valor esperado, formas aceitas, rótulo humano, título da seção) de cada campo."""
    adultos = classe == "adultos"
    chave = "textoAureo" if adultos else "textoPrincipal"
    nome_chave = "Texto Áureo" if adultos else "Texto Principal"
    sintese = "verdadePratica" if adultos else "resumoLicao"
    nome_sintese = "Verdade Prática" if adultos else "Resumo da Lição"
    leituras = "leituraDiaria" if adultos else "leituraSemanal"
    nome_leituras = "Leitura Diária" if adultos else "Leitura Semanal"
    nome_biblica = "Leitura Bíblica em Classe" if adultos else "Texto Bíblico"

    saida = [
        ("data", seed["data"], formas_da_data(seed["data"]), "Data da lição (como impressa)", None),
        ("titulo", seed["titulo"], [seed["titulo"]], "Título da lição", None),
        (f"{chave}.texto", seed[chave]["texto"], [seed[chave]["texto"]], f"{nome_chave} — texto (sem as aspas externas)", nome_chave),
        (f"{chave}.referencia", seed[chave]["referencia"], [seed[chave]["referencia"]], f"{nome_chave} — referência", nome_chave),
        (sintese, seed[sintese], [seed[sintese]], nome_sintese, nome_sintese),
    ]
    for i, item in enumerate(seed[leituras]):
        dia = DIAS[i] if i < len(DIAS) else f"item {i + 1}"
        saida.append((f"{leituras}[{i}].referencia", item["referencia"], [item["referencia"]], f"{nome_leituras} · {dia} · referência", nome_leituras))
        saida.append((f"{leituras}[{i}].tema", item["tema"], [item["tema"]], f"{nome_leituras} · {dia} · tema", nome_leituras))
    saida.append(("leituraBiblica", seed["leituraBiblica"], [seed["leituraBiblica"]], f"{nome_biblica} — referência do título", nome_biblica))
    if hinos:
        numeros = [h.split()[0] for h in hinos]
        formas = [f"{', '.join(numeros[:-1])} e {numeros[-1]}", ", ".join(numeros)]
        saida.append(("hinosSugeridos", ", ".join(numeros), formas, "Hinos sugeridos — só os números", "Hinos Sugeridos"))
    return saida


def recorte_da_secao(caminho, paginas, secao, destino, zoom=2.2):
    """Recorta a região da seção pelo TÍTULO dela (nunca pelo valor esperado).
    Sem título (data e título da lição): metade de cima da primeira página."""
    doc = abrir(caminho)
    alvo, clip = paginas[0], None
    # O OCR às vezes estraga o título ("LEITURA BIBLICA :M CLASSE"): tenta variações.
    variacoes = {
        "Leitura Bíblica em Classe": ["Leitura Bíblica em Classe", "LEITURA BIBLICA", "M CLASSE"],
        "Texto Bíblico": ["Texto Bíblico", "TEXTO BIBLICO"],
        "Leitura Diária": ["Leitura Diária", "LEITURA DIARIA", "LEITURA DI"],
        "Leitura Semanal": ["Leitura Semanal", "LEITURA SEMANAL"],
        "Hinos Sugeridos": ["Hinos Sugeridos", "Hinos Sugerid"],
    }.get(secao, [secao] if secao else [])
    if secao:
        for p, termo in ((p, t) for t in variacoes for p in paginas):
            pag = doc[p - 1]
            areas = pag.search_for(termo)
            if areas:
                r, h = areas[0], pag.rect.height
                altura = 0.10 if secao in ("Leitura Bíblica em Classe", "Texto Bíblico", "Hinos Sugeridos") else 0.36
                clip = fitz.Rect(pag.rect.x0, max(pag.rect.y0, r.y0 - 0.02 * h), pag.rect.x1, min(pag.rect.y1, r.y1 + altura * h))
                alvo = p
                break
    if clip is None and secao in ("Leitura Bíblica em Classe", "Texto Bíblico", "Hinos Sugeridos"):
        # Sem título no OCR: o bloco fica depois da página de abertura.
        alvo = paginas[1] if len(paginas) > 1 else paginas[0]
    pag = doc[alvo - 1]
    if clip is None:
        h = pag.rect.height
        clip = fitz.Rect(pag.rect.x0, pag.rect.y0, pag.rect.x1, pag.rect.y0 + (0.55 if not secao else 1.0) * h)
    destino.parent.mkdir(parents=True, exist_ok=True)
    pag.get_pixmap(matrix=fitz.Matrix(zoom, zoom), clip=clip).save(str(destino))
    return alvo, destino


def transcricoes(edicao):
    return {t["id"]: t for t in ler_json(pasta_fontes(edicao) / "transcricoes-cabecalho.json", [])}


def bate(lido, formas):
    return any(normalizar(lido) == normalizar(f) for f in formas)


def verificar(classe, numero, edicao="2026-4t", saida=None):
    seed = cabecalhos(edicao)[classe]["licoes"][numero - 1]
    hinos = carregar_licao(classe, edicao, numero)["cabecalho"].get("hinosSugeridos") if classe == "adultos" else None
    fontes = revistas(classe, edicao)
    paginas = {nome: ps[:3] for nome, ps in paginas_alinhadas(fontes, classe, numero).items()}
    texto = {nome: normalizar("\n".join(texto_pagina(fontes[nome], p) for p in paginas[nome])) for nome in fontes}
    lidas = transcricoes(edicao)
    saida = saida or TMP / "gate" / f"{classe}-{edicao}-licao-{numero}"

    excecoes, conferidos, resolvidos, pendentes = [], [], [], []
    for campo, valor, formas, rotulo, secao in campos(classe, seed, hinos):
        ident = f"{classe}-L{numero}-{campo}"
        onde = [nome for nome in fontes if any(normalizar(f) in texto[nome] for f in formas)]
        if len(onde) == len(fontes):
            conferidos.append((ident, onde))
            continue
        transcricao = lidas.get(ident)
        if transcricao and transcricao.get("lido") is not None and bate(transcricao["lido"], formas):
            resolvidos.append((ident, transcricao))
            continue
        pagina, imagem = recorte_da_secao(fontes["canonica"], paginas["canonica"], secao,
                                          saida / "cabecalho" / f"{ident.replace('[', '_').replace(']', '')}.png")
        item = {"id": ident, "rotulo": rotulo, "pagina": pagina, "imagem": str(imagem)}
        semelhanca = {nome: round(max(similaridade_melhor_trecho(f, texto[nome]) for f in formas), 2) for nome in fontes}
        if transcricao and transcricao.get("lido") is None:
            # Ilegível para quem transcreveu: caso 1 de escalonamento se os OCRs também não resolvem.
            excecoes.append(Excecao(1, f"{campo}: ilegível na transcrição às cegas ({transcricao.get('nota', 'sem nota')})",
                                    valor=valor, semelhanca_ocr=semelhanca, **item))
        elif transcricao:
            excecoes.append(Excecao(1, f"{campo}: a transcrição às cegas diverge do JSON — lido “{transcricao['lido']}”, JSON “{valor}”",
                                    valor=valor, lido=transcricao["lido"], semelhanca_ocr=semelhanca, **item))
        else:
            pendentes.append(item)
            origem = f"só no OCR {onde[0]}" if onde else "em nenhum dos dois OCRs"
            excecoes.append(Excecao(1, f"{campo}: {origem}; transcrição às cegas pendente", valor=valor, semelhanca_ocr=semelhanca, **item))
    return {"conferidos": conferidos, "resolvidos": resolvidos, "excecoes": excecoes, "pendentes": pendentes, "paginas": paginas}


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("classe", choices=["adultos", "jovens"])
    ap.add_argument("numero", type=int)
    ap.add_argument("--edicao", default="2026-4t")
    a = ap.parse_args()
    r = verificar(a.classe, a.numero, a.edicao)
    print(f"Páginas: {r['paginas']}")
    print(f"Conferidos nos dois OCRs: {len(r['conferidos'])} | transcritos às cegas e iguais ao JSON: {len(r['resolvidos'])} | exceções: {len(r['excecoes'])}")
    for e in r["excecoes"]:
        print(f"  - {e['id']}: {e['mensagem']} | p. {e['pagina']}")
