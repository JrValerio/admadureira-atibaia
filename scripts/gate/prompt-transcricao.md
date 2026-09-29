Você vai transcrever campos impressos em recortes de páginas de uma revista. Trabalhe só com os arquivos da pasta:

{{PASTA}}

Nela há:
- folhas de imagem `folha-NN.jpg`: cada folha tem até três cartões; cada cartão traz no topo, em azul, o id do campo, o rótulo do campo e a página do PDF, e embaixo o recorte da página;
- `pendentes.json`: a lista dos campos a transcrever (id, rótulo e página), na mesma ordem dos cartões.

Regras:
1. Não abra nenhum arquivo fora dessa pasta e não use outras fontes (busca, memória de outros textos, conhecimento prévio do conteúdo).
2. Para cada id de `pendentes.json`, encontre o cartão com esse id e transcreva do recorte apenas o trecho que o rótulo pede.
3. Copie exatamente o que está impresso: letras, acentos, pontuação, abreviações, números e separadores. Não corrija, não complete, não padronize, mesmo que pareça erro de impressão.
4. Quando o rótulo pedir "sem as aspas externas", omita só as aspas que abrem e fecham o texto.
5. Se não conseguir ler com segurança, use `"lido": null` e explique em `"nota"`. Não chute.
6. Se o trecho pedido não estiver no recorte, use `"lido": null` e `"nota": "fora do recorte"`.

Responda com um array JSON, um objeto por id, na ordem de `pendentes.json`:

[{"id": "<id>", "lido": "<texto impresso>", "pagina": <página do cartão>}]

Depois do array, numa linha separada, liste os caminhos de todos os arquivos que você abriu.
