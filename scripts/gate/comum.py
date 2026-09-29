"""
Base comum do gate automatizado das lições da EBD (scripts/gate/*).

Responsável por: caminhos, normalização de texto, tabela de livros bíblicos
(nome, abreviação e slug do bibliaonline), leitura de referências, leitura
dos PDFs de material_consulta/ e carga da lição como o site a monta.

Os PDFs ficam fora do git (material_consulta/); o cache e as saídas ficam em
tmp/, também fora do git. Os dados versionados do gate (manifesto do livro de
apoio, mapa afirmação → fonte e resoluções de cabeçalho) ficam em
src/data/ebd/<edicao>/fontes/.
"""

import difflib
import json
import os
import re
import subprocess
import sys
import unicodedata
from functools import lru_cache
from pathlib import Path

try:
    import fitz  # PyMuPDF
except ImportError:  # pragma: no cover
    sys.exit("PyMuPDF não encontrado. Instale com: pip install pymupdf")

RAIZ = Path(__file__).resolve().parents[2]
MATERIAL = RAIZ / "material_consulta"
TMP = RAIZ / "tmp"
PASTA_REVISTA = {"adultos": "ADULTO", "jovens": "JOVENS"}
MARCADOR_INICIO = {"adultos": "TEXTO ÁUREO", "jovens": "TEXTO PRINCIPAL"}

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")


# ---------------------------------------------------------------- livros ---
# (id, nome, abreviação da revista, slug do bibliaonline)
LIVROS = [
    ("GEN", "Gênesis", "Gn", "gn"), ("EXO", "Êxodo", "Êx", "ex"), ("LEV", "Levítico", "Lv", "lv"),
    ("NUM", "Números", "Nm", "nm"), ("DEU", "Deuteronômio", "Dt", "dt"), ("JOS", "Josué", "Js", "js"),
    ("JDG", "Juízes", "Jz", "jz"), ("RUT", "Rute", "Rt", "rt"), ("1SA", "1 Samuel", "1 Sm", "1sm"),
    ("2SA", "2 Samuel", "2 Sm", "2sm"), ("1KI", "1 Reis", "1 Rs", "1rs"), ("2KI", "2 Reis", "2 Rs", "2rs"),
    ("1CH", "1 Crônicas", "1 Cr", "1cr"), ("2CH", "2 Crônicas", "2 Cr", "2cr"), ("EZR", "Esdras", "Ed", "ed"),
    ("NEH", "Neemias", "Ne", "ne"), ("EST", "Ester", "Et", "et"), ("JOB", "Jó", "Jó", "job"),
    ("PSA", "Salmos", "Sl", "sl"), ("PRO", "Provérbios", "Pv", "pv"), ("ECC", "Eclesiastes", "Ec", "ec"),
    ("SNG", "Cantares", "Ct", "ct"), ("ISA", "Isaías", "Is", "is"), ("JER", "Jeremias", "Jr", "jr"),
    ("LAM", "Lamentações", "Lm", "lm"), ("EZK", "Ezequiel", "Ez", "ez"), ("DAN", "Daniel", "Dn", "dn"),
    ("HOS", "Oseias", "Os", "os"), ("JOL", "Joel", "Jl", "jl"), ("AMO", "Amós", "Am", "am"),
    ("OBA", "Obadias", "Ob", "ob"), ("JON", "Jonas", "Jn", "jn"), ("MIC", "Miqueias", "Mq", "mq"),
    ("NAM", "Naum", "Na", "na"), ("HAB", "Habacuque", "Hc", "hc"), ("ZEP", "Sofonias", "Sf", "sf"),
    ("HAG", "Ageu", "Ag", "ag"), ("ZEC", "Zacarias", "Zc", "zc"), ("MAL", "Malaquias", "Ml", "ml"),
    ("MAT", "Mateus", "Mt", "mt"), ("MRK", "Marcos", "Mc", "mc"), ("LUK", "Lucas", "Lc", "lc"),
    ("JHN", "João", "Jo", "jo"), ("ACT", "Atos", "At", "at"), ("ROM", "Romanos", "Rm", "rm"),
    ("1CO", "1 Coríntios", "1 Co", "1co"), ("2CO", "2 Coríntios", "2 Co", "2co"), ("GAL", "Gálatas", "Gl", "gl"),
    ("EPH", "Efésios", "Ef", "ef"), ("PHP", "Filipenses", "Fp", "fp"), ("COL", "Colossenses", "Cl", "cl"),
    ("1TH", "1 Tessalonicenses", "1 Ts", "1ts"), ("2TH", "2 Tessalonicenses", "2 Ts", "2ts"),
    ("1TI", "1 Timóteo", "1 Tm", "1tm"), ("2TI", "2 Timóteo", "2 Tm", "2tm"), ("TIT", "Tito", "Tt", "tt"),
    ("PHM", "Filemom", "Fm", "fm"), ("HEB", "Hebreus", "Hb", "hb"), ("JAS", "Tiago", "Tg", "tg"),
    ("1PE", "1 Pedro", "1 Pe", "1pe"), ("2PE", "2 Pedro", "2 Pe", "2pe"), ("1JN", "1 João", "1 Jo", "1jo"),
    ("2JN", "2 João", "2 Jo", "2jo"), ("3JN", "3 João", "3 Jo", "3jo"), ("JUD", "Judas", "Jd", "jd"),
    ("REV", "Apocalipse", "Ap", "ap"),
]
_ALIAS = {}
for _id, _nome, _abrev, _slug in LIVROS:
    for _forma in {_nome, _abrev, _abrev.replace(" ", "")}:
        _ALIAS[_forma.casefold()] = (_id, _nome, _slug)
_NOMES_REGEX = "|".join(sorted((re.escape(k) for k in {f for _, n, a, _ in LIVROS for f in (n, a, a.replace(" ", ""))}), key=len, reverse=True))
# Referência: livro + capítulo + (.|:) + versículos (ex.: "Dt 1.21", "Deuteronômio 1:9-12,19-21", "Fp 1.27a").
REF_REGEX = re.compile(
    rf"(?<![\wÀ-ÿ])({_NOMES_REGEX})\s+(\d{{1,3}})(?:[.:](\d+[a-z]?(?:\s*[-–]\s*\d+[a-z]?)?(?:\s*,\s*\d+[a-z]?(?:\s*[-–]\s*\d+[a-z]?)?)*))?",
    re.IGNORECASE,
)
VERSICULO_REGEX = re.compile(r"\b(?:no\s+)?vers[íi]culos?\s+(\d+)(?:\s*[-–]\s*(\d+))?", re.IGNORECASE)


def livro(nome):
    return _ALIAS.get(nome.casefold().strip())


def versiculos(texto):
    """'9-12,19-21' -> [9,10,11,12,19,20,21]; ignora sufixos como 27a."""
    saida = []
    for parte in re.split(r"\s*,\s*", texto or ""):
        numeros = [int(x) for x in re.findall(r"\d+", parte)]
        if len(numeros) == 1:
            saida.append(numeros[0])
        elif len(numeros) >= 2 and numeros[1] >= numeros[0]:
            saida.extend(range(numeros[0], numeros[1] + 1))
    return saida


def referencias(texto):
    """Lista de (id_livro, nome, slug, capitulo, [versiculos]) encontradas no texto."""
    achadas = []
    for m in REF_REGEX.finditer(texto):
        info = livro(m.group(1))
        if not info:
            continue
        achadas.append((*info, int(m.group(2)), versiculos(m.group(3)), m.start(), m.end()))
    return achadas


# ------------------------------------------------------------ normalização --
ASPAS = str.maketrans({"“": '"', "”": '"', "„": '"', "«": '"', "»": '"', "‘": "'", "’": "'", "–": "-", "—": "-", "­": ""})


def normalizar(texto, sem_acentos=False):
    """Normalização para comparação literal: caixa, aspas, espaços, hifenização."""
    t = (texto or "").translate(ASPAS)
    t = re.sub(r"(\w)-\s*\n\s*(\w)", r"\1\2", t)
    t = re.sub(r"\[\s*\.\.\.\s*\]|…", " ", t)
    t = re.sub(r"\s+", " ", t).strip().casefold()
    t = re.sub(r"\s+([,.;:!?)])", r"\1", t)
    t = re.sub(r"(\d)\s*([,.:-])\s+(\d)", r"\1\2\3", t)  # "1.9-12, 19-21" == "1.9-12,19-21"
    t = re.sub(r"([(])\s+", r"\1", t)
    if sem_acentos:
        t = "".join(c for c in unicodedata.normalize("NFD", t) if unicodedata.category(c) != "Mn")
    return t


def similaridade_melhor_trecho(agulha, palheiro):
    """Maior razão de similaridade entre `agulha` e uma janela de `palheiro` do mesmo tamanho."""
    a, p = normalizar(agulha), normalizar(palheiro)
    if not a or not p:
        return 0.0
    if a in p:
        return 1.0
    n = len(a)
    melhor = 0.0
    passo = max(1, n // 4)
    candidatos = set()
    for palavra in set(a.split()[:3] + a.split()[-2:]):
        if len(palavra) >= 4:
            candidatos.update(m.start() for m in re.finditer(re.escape(palavra), p))
    inicios = sorted({max(0, c - n) for c in candidatos} | set(range(0, max(1, len(p) - n + 1), passo)))
    for i in inicios:
        janela = p[i:i + n + n // 3]
        r = difflib.SequenceMatcher(None, a, janela).ratio()
        if r > melhor:
            melhor = r
    return melhor


# --------------------------------------------------------------- PDFs -------
@lru_cache(maxsize=None)
def abrir(caminho):
    return fitz.open(str(caminho))


@lru_cache(maxsize=None)
def texto_pagina(caminho, pagina):
    return abrir(caminho)[pagina - 1].get_text()


def revistas(classe, edicao):
    """As duas revistas do professor da edição (duas camadas de OCR independentes)."""
    ano, tri = re.match(r"(\d{4})-(\d)t", edicao).groups()
    pasta = MATERIAL / PASTA_REVISTA[classe]
    canonica = [p for p in pasta.glob("*.pdf") if "Prof." in p.name and f"{tri} Trimestre {ano}" in p.name]
    apoio = [p for p in pasta.glob("*.pdf") if p.name.startswith("Revista Licoes Biblicas") and f"{tri}º Trim" in p.name]
    if len(canonica) != 1 or len(apoio) != 1:
        raise SystemExit(f"Revistas de {classe} {edicao} não identificadas em {pasta}")
    return {"canonica": canonica[0], "apoio": apoio[0]}


@lru_cache(maxsize=None)
def inicios_licoes(caminho, classe):
    doc = abrir(caminho)
    return [i + 1 for i in range(len(doc)) if MARCADOR_INICIO[classe] in doc[i].get_text().upper()]


def paginas_alinhadas(fontes, classe, numero):
    """Páginas da lição nas duas revistas. A segunda revista (OCR mais fraco) usa a
    paginação da canônica quando as duas têm o mesmo número de páginas e os inícios
    que o OCR dela encontra são um subconjunto dos inícios da canônica."""
    canonica = paginas_licao(fontes["canonica"], classe, numero)
    ini_c, ini_a = inicios_licoes(fontes["canonica"], classe), inicios_licoes(fontes["apoio"], classe)
    alinhadas = len(abrir(fontes["canonica"])) == len(abrir(fontes["apoio"])) and set(ini_a) <= set(ini_c)
    return {"canonica": canonica, "apoio": canonica if alinhadas else paginas_licao(fontes["apoio"], classe, numero)}


def paginas_licao(caminho, classe, numero):
    inicios = inicios_licoes(caminho, classe)
    if len(inicios) < numero:
        raise SystemExit(f"Lição {numero} não localizada em {caminho.name}")
    inicio = inicios[numero - 1]
    fim = inicios[numero] - 1 if numero < len(inicios) else min(inicio + 8, len(abrir(caminho)))
    return list(range(inicio, fim + 1))


def recortar(caminho, pagina, destino, termo=None, zoom=2.0):
    """Salva a página (ou a região em torno de `termo`) como imagem para conferência."""
    doc = abrir(caminho)
    pag = doc[pagina - 1]
    clip = None
    if termo:
        for palavra in [termo] + [p for p in re.findall(r"[\wÀ-ÿ]{5,}", termo)][:3]:
            areas = pag.search_for(palavra)
            if areas:
                r = areas[0]
                clip = fitz.Rect(pag.rect.x0, max(pag.rect.y0, r.y0 - 90), pag.rect.x1, min(pag.rect.y1, r.y1 + 140))
                break
    destino.parent.mkdir(parents=True, exist_ok=True)
    pag.get_pixmap(matrix=fitz.Matrix(zoom, zoom), clip=clip).save(str(destino))
    return destino


# ------------------------------------------------------------ dados ---------
def carregar_licao(classe, edicao, numero):
    """A lição como o site a monta (scripts/gate-licao-dados.ts)."""
    comando = ["npx", "tsx", "--tsconfig", "tsconfig.json", "scripts/gate-licao-dados.ts", classe, edicao, str(numero)]
    r = subprocess.run(comando, cwd=RAIZ, capture_output=True, text=True, encoding="utf-8", shell=os.name == "nt")
    if r.returncode != 0:
        raise SystemExit(f"Falha ao ler a lição: {r.stderr.strip()}")
    return json.loads(r.stdout)


def pasta_fontes(edicao):
    return RAIZ / "src" / "data" / "ebd" / edicao / "fontes"


def ler_json(caminho, padrao):
    return json.loads(Path(caminho).read_text(encoding="utf-8")) if Path(caminho).exists() else padrao


def cabecalhos(edicao):
    return json.loads((RAIZ / "src" / "data" / "ebd" / edicao / "cabecalhos.json").read_text(encoding="utf-8"))


def textos(valor, caminho=""):
    """Achata um objeto em [(caminho, texto)]."""
    if isinstance(valor, str):
        return [(caminho, valor)]
    if isinstance(valor, list):
        return [par for item in valor for par in textos(item, caminho)]
    if isinstance(valor, dict):
        return [par for k, v in valor.items() for par in textos(v, f"{caminho}.{k}" if caminho else k)]
    return []


def frases(texto):
    """Divide em frases sem quebrar abreviações como 'cap. 2' ou 'Dt 1.21'."""
    partes = re.split(r"(?<=[.!?])[”\"]?\s+(?=[A-ZÁÉÍÓÚÂÊÔÃÕÇ“\"(])", texto.strip())
    return [p.strip() for p in partes if p.strip()]


class Excecao(dict):
    """Uma exceção do gate: camada, gravidade, mensagem e evidência."""

    def __init__(self, camada, mensagem, **extra):
        super().__init__(camada=camada, mensagem=mensagem, **extra)
