"""
Gera a página local de gate humano de uma lição da EBD: o texto que o site
vai publicar ao lado das páginas rasterizadas da revista do professor.

Uso (da raiz do repositório):
    python scripts/gate-licao.py adultos 2
    python scripts/gate-licao.py jovens 2 --edicao 2026-4t --abrir
    python scripts/gate-licao.py adultos 2 --paginas 12-18

A página sai em tmp/gate/<classe>-<edicao>-licao-<n>/index.html (tmp/ está no
.gitignore). Ela contém páginas da revista: não publique nem versione.

Requisitos: PyMuPDF (pip install pymupdf) e as revistas em material_consulta/
(também fora do git). Os dados da lição vêm de scripts/gate-licao-dados.ts,
via npx tsx, a partir do mesmo código que monta o site.

A camada de texto dos PDFs é OCR. Ela serve só para localizar as páginas da
lição; datas, números e referências se conferem sempre na imagem.
"""

import argparse
import html
import json
import os
import re
import subprocess
import sys
import webbrowser
from pathlib import Path

try:
    import fitz  # PyMuPDF
except ImportError:
    sys.exit("PyMuPDF não encontrado. Instale com: pip install pymupdf")

RAIZ = Path(__file__).resolve().parent.parent
PASTA_REVISTA = {"adultos": "ADULTO", "jovens": "JOVENS"}
# Primeira página de cada lição na revista do professor.
MARCADOR_INICIO = {"adultos": "TEXTO ÁUREO", "jovens": "TEXTO PRINCIPAL"}


def carregar_dados(classe, edicao, numero):
    comando = [
        "npx", "tsx", "--tsconfig", "tsconfig.json",
        "scripts/gate-licao-dados.ts", classe, edicao, str(numero),
    ]
    resultado = subprocess.run(
        comando, cwd=RAIZ, capture_output=True, text=True, encoding="utf-8",
        shell=os.name == "nt",
    )
    if resultado.returncode != 0:
        sys.exit(f"Falha ao ler a lição:\n{resultado.stderr.strip()}")
    return json.loads(resultado.stdout)


def achar_revista(classe, edicao, caminho):
    if caminho:
        return Path(caminho)
    ano, trimestre = re.match(r"(\d{4})-(\d)t", edicao).groups()
    pasta = RAIZ / "material_consulta" / PASTA_REVISTA[classe]
    candidatas = [
        p for p in pasta.glob("*.pdf")
        if "Prof." in p.name and f"{trimestre} Trimestre {ano}" in p.name
    ]
    if len(candidatas) != 1:
        nomes = ", ".join(p.name for p in candidatas) or "nenhuma"
        sys.exit(f"Revista do professor não identificada em {pasta} ({nomes}). Use --pdf.")
    return candidatas[0]


def achar_paginas(doc, classe, numero, intervalo):
    if intervalo:
        inicio, fim = (int(x) for x in intervalo.split("-"))
        return list(range(inicio, fim + 1))
    inicios = [
        i + 1 for i in range(len(doc))
        if MARCADOR_INICIO[classe] in doc[i].get_text().upper()
    ]
    if len(inicios) < numero:
        sys.exit(
            f"Só {len(inicios)} lições localizadas pelo marcador {MARCADOR_INICIO[classe]!r}. "
            "Informe o intervalo com --paginas."
        )
    inicio = inicios[numero - 1]
    fim = inicios[numero] - 1 if numero < len(inicios) else min(inicio + 8, len(doc))
    return list(range(inicio, fim + 1))


def rotulo(chave):
    return re.sub(r"(?<!^)(?=[A-Z])", " ", chave).capitalize()


def texto(valor):
    """Renderiza qualquer valor do subsídio como HTML legível."""
    if valor is None or valor == "" or valor == []:
        return '<em class="vazio">(vazio)</em>'
    if isinstance(valor, str):
        return f"<p>{html.escape(valor)}</p>"
    if isinstance(valor, (int, float)):
        return f"<p>{valor}</p>"
    if isinstance(valor, list):
        if all(isinstance(item, str) for item in valor):
            return "<ul>" + "".join(f"<li>{html.escape(item)}</li>" for item in valor) + "</ul>"
        return "".join(texto(item) for item in valor)
    partes = []
    for chave, item in valor.items():
        if chave == "id":
            continue
        partes.append(f'<div class="sub"><span class="k">{html.escape(rotulo(chave))}</span>{texto(item)}</div>')
    return "".join(partes)


def leituras(itens):
    linhas = "".join(
        f"<tr><td>{html.escape(i.get('dia', ''))}</td><td>{html.escape(i.get('referencia', ''))}</td>"
        f"<td>{html.escape(i.get('tema') or i.get('foco') or '')}</td></tr>"
        for i in itens or []
    )
    return f"<table>{linhas}</table>" if linhas else '<em class="vazio">(vazio)</em>'


def campo(contador, titulo, conteudo, tipo):
    contador[0] += 1
    ident = f"f{contador[0]}"
    return (
        f'<div class="campo {tipo}"><label><input type="checkbox" data-id="{ident}" '
        f'data-label="{html.escape(titulo)}"> <b>{html.escape(titulo)}</b></label>'
        f'<div class="valor">{conteudo}</div>'
        f'<input class="nota" data-id="{ident}n" placeholder="anotação (se não confere)"></div>'
    )


def montar_campos(dados):
    contador = [0]
    cab, corpo, licao = dados["cabecalho"], dados["corpo"], dados["licao"]
    h = [
        '<h3>Cabeçalho: tem que bater <u>literalmente</u> com a revista</h3>'
        '<p class="dica">Única diferença esperada: o site escreve as referências com dois-pontos '
        '(a revista imprime Dt 1.30; o site mostra Dt 1:30).</p>'
    ]
    h.append(campo(contador, "Data", html.escape(cab.get("data", "")), "t"))
    h.append(campo(contador, "Título", html.escape(cab.get("titulo", "")), "t"))
    if dados["classe"] == "adultos":
        h.append(campo(contador, "Texto Áureo", texto(cab.get("textoAureo")), "t"))
        h.append(campo(contador, "Verdade Prática", texto(cab.get("verdadePratica")), "t"))
        h.append(campo(contador, "Leitura Diária (6 dias)", leituras(cab.get("leituraDiaria")), "t"))
        h.append(campo(contador, "Leitura Bíblica em Classe", texto(cab.get("leituraBiblicaEmClasse")), "t"))
        h.append(campo(contador, "Hinos sugeridos", texto(cab.get("hinosSugeridos")), "t"))
    else:
        h.append(campo(contador, "Texto Principal", texto(cab.get("textoPrincipal")), "t"))
        h.append(campo(contador, "Resumo da Lição", texto(cab.get("resumoDaLicao")), "t"))
        h.append(campo(contador, "Leitura Semanal (6 dias)", leituras(cab.get("leituraSemanal")), "t"))
        h.append(campo(contador, "Texto Bíblico", texto(licao.get("leituraBiblica")), "t"))
    topicos = corpo.get("desenvolvimento", [])
    h.append(campo(contador, "Títulos dos tópicos", texto([t["titulo"] for t in topicos]), "t"))
    h.append('<h3>Corpo: subsídio <u>redigido</u> para o site. Conferir fidelidade ao tema e à doutrina, não literalidade</h3>')
    h.append(campo(contador, "Resumo exibido no topo da página", texto(licao.get("resumo")), "c"))
    for secao, valor in corpo.items():
        if secao == "desenvolvimento":
            for topico in valor:
                h.append(campo(contador, topico["titulo"], texto({k: v for k, v in topico.items() if k != "titulo"}), "c"))
        elif valor:
            h.append(campo(contador, rotulo(secao), texto(valor), "c"))
    return "".join(h), contador[0]


CSS = """
:root{--bg:#f6f4ef;--fg:#1d1b18;--muted:#6b645a;--card:#fff;--line:#e3ddd2;--ok:#1f7a3f;--acc:#b86a00}
@media (prefers-color-scheme:dark){:root{--bg:#16140f;--fg:#eee8dc;--muted:#a79f92;--card:#211e18;--line:#3a352c;--ok:#5fc585;--acc:#ffb74d}}
*{box-sizing:border-box}body{margin:0;font:15px/1.5 system-ui,sans-serif;background:var(--bg);color:var(--fg)}
header{position:sticky;top:0;z-index:5;background:var(--card);border-bottom:1px solid var(--line);padding:10px 16px;display:flex;gap:12px;align-items:center;flex-wrap:wrap}
header h1{font-size:16px;margin:0 12px 0 0}#prog{color:var(--muted)}
button{font:inherit;padding:6px 12px;border-radius:8px;border:1px solid var(--line);background:var(--bg);color:var(--fg);cursor:pointer}
main{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:16px;padding:16px}
.site,.revista{overflow:auto;max-height:calc(100vh - 60px)}.site{padding-right:6px}
.revista img{width:100%;border:1px solid var(--line);border-radius:6px;background:#fff}
figure{margin:0 0 12px}figcaption{font-size:12px;color:var(--muted)}
h3{font-size:14px;color:var(--acc);margin:18px 0 8px}
.campo{background:var(--card);border:1px solid var(--line);border-left:4px solid var(--line);border-radius:8px;padding:10px 12px;margin-bottom:10px}
.campo.feito{border-left-color:var(--ok)}.valor{margin:6px 0}.valor p{margin:4px 0}
.sub{margin:6px 0}.k{display:block;font-size:12px;font-weight:600;color:var(--muted)}
table{border-collapse:collapse;width:100%}td{border-top:1px solid var(--line);padding:3px 6px;vertical-align:top}
.nota{width:100%;font:inherit;font-size:13px;padding:4px 8px;border:1px dashed var(--line);border-radius:6px;background:transparent;color:var(--fg)}
.vazio{color:#c0392b}.dica{font-size:13px;color:var(--muted);margin:-4px 0 10px}
@media (max-width:900px){main{grid-template-columns:1fr}.site,.revista{max-height:none}}
"""

JS = """
const K=document.body.dataset.chave;let st={};try{st=JSON.parse(localStorage.getItem(K)||'{}')}catch(e){}
const save=()=>{try{localStorage.setItem(K,JSON.stringify(st))}catch(e){}};
function prog(){const a=[...document.querySelectorAll('input[type=checkbox]')];document.getElementById('prog').textContent=a.filter(x=>x.checked).length+' de '+a.length+' conferidos'}
document.querySelectorAll('input[type=checkbox]').forEach(cb=>{cb.checked=!!st[cb.dataset.id];cb.closest('.campo').classList.toggle('feito',cb.checked);
  cb.onchange=()=>{st[cb.dataset.id]=cb.checked;cb.closest('.campo').classList.toggle('feito',cb.checked);save();prog()}});
document.querySelectorAll('.nota').forEach(n=>{n.value=st[n.dataset.id]||'';n.oninput=()=>{st[n.dataset.id]=n.value;save()}});
prog();
document.getElementById('copiar').onclick=()=>{const out=['## '+document.body.dataset.titulo];
  document.querySelectorAll('.campo').forEach(c=>{const cb=c.querySelector('input[type=checkbox]'),n=c.querySelector('.nota');
  out.push((cb.checked?'[ok] ':'[  ] ')+cb.dataset.label+(n.value?' — '+n.value:''))});
  navigator.clipboard.writeText(out.join('\\n')).then(()=>alert('Resultado copiado. Cole na conversa ou na PR.'))};
"""


def main():
    # O console do Windows não é UTF-8 por padrão; sem isso, os acentos saem trocados.
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")
    parser = argparse.ArgumentParser(description="Página de gate humano de uma lição da EBD.")
    parser.add_argument("classe", choices=["adultos", "jovens"])
    parser.add_argument("numero", type=int)
    parser.add_argument("--edicao", default="2026-4t", help="slug da edição (padrão: 2026-4t)")
    parser.add_argument("--pdf", help="caminho da revista do professor, se a busca automática falhar")
    parser.add_argument("--paginas", help="intervalo de páginas do PDF, ex.: 12-18")
    parser.add_argument("--abrir", action="store_true", help="abre a página no navegador")
    args = parser.parse_args()

    dados = carregar_dados(args.classe, args.edicao, args.numero)
    revista = achar_revista(args.classe, args.edicao, args.pdf)
    doc = fitz.open(revista)
    paginas = achar_paginas(doc, args.classe, args.numero, args.paginas)

    saida = RAIZ / "tmp" / "gate" / f"{args.classe}-{args.edicao}-licao-{args.numero}"
    (saida / "pags").mkdir(parents=True, exist_ok=True)
    figuras = []
    for pagina in paginas:
        nome = f"p{pagina:03d}.jpg"
        doc[pagina - 1].get_pixmap(matrix=fitz.Matrix(1.6, 1.6)).save(saida / "pags" / nome, jpg_quality=72)
        figuras.append(f'<figure><figcaption>PDF p. {pagina}</figcaption><img loading="lazy" src="pags/{nome}"></figure>')

    campos, total = montar_campos(dados)
    licao, edicao = dados["licao"], dados["edicao"]
    titulo = f"{args.classe.capitalize()} L{licao['numero']} · {edicao['rotulo']} · {edicao['titulo']}"
    aviso = "" if licao["statusEditorial"] == "draft" else f' <small>(status atual: {licao["statusEditorial"]})</small>'
    pagina_html = (
        '<!doctype html><html lang="pt-BR"><head><meta charset="utf-8">'
        '<meta name="viewport" content="width=device-width,initial-scale=1">'
        f"<title>Gate {html.escape(titulo)}</title><style>{CSS}</style></head>"
        f'<body data-chave="gate-{licao["id"]}" data-titulo="{html.escape(titulo)}">'
        f"<header><h1>Gate · {html.escape(titulo)}{aviso}</h1><span id=\"prog\"></span>"
        '<button id="copiar">Copiar resultado</button></header>'
        f'<main><div class="site">{campos}</div><div class="revista">{"".join(figuras)}</div></main>'
        f"<script>{JS}</script></body></html>"
    )
    (saida / "index.html").write_text(pagina_html, encoding="utf-8")

    print(f"Lição: {licao['id']} ({licao['data']}, status {licao['statusEditorial']})")
    print(f"Revista: {revista.name}, PDF p. {paginas[0]}–{paginas[-1]}")
    print(f"{total} itens para conferir em {saida / 'index.html'}")
    if args.abrir:
        webbrowser.open((saida / "index.html").as_uri())


if __name__ == "__main__":
    main()
