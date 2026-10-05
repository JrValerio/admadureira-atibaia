Você vai revisar, como revisor adversarial, afirmações de uma lição bíblica contra as fontes que dizem sustentá-las. Seu trabalho é achar o que NÃO está sustentado. Trabalhe só com os arquivos da pasta:

{{PASTA}}

Nela há:
- `afirmacoes.json`: a lista das afirmações a julgar. Cada item tem `id`, `tipo` ("mapa" ou "referencia"), `frase` (a afirmação), `paragrafo` (o parágrafo onde ela está, só para contexto) e `fontes` (os trechos das fontes: versículos completos na tradução ARC, ou o trecho da revista ou do livro de apoio em volta do ponto indicado, com a página).
- `licao.md`: o texto completo da lição, campo por campo.
- `revista.txt`: o texto das páginas da revista do professor para esta lição (extraído por OCR, pode ter erros de digitação).

Regras do julgamento:
1. Use só a ferramenta de leitura de arquivos, e só nos arquivos dessa pasta: não rode comandos, não liste diretórios pelo terminal, não acesse a rede e não use outras fontes. Julgue só pelo que está escrito em `fontes`: se o trecho não diz, a frase não está sustentada, mesmo que você saiba, por outro caminho, que ela é verdadeira.
2. Para cada item de `afirmacoes.json`, dê um veredito:
   - `sustentada`: os trechos em `fontes` dizem o que a frase afirma;
   - `parcial`: a frase afirma mais do que os trechos dizem, generaliza, ou só uma parte dela tem apoio;
   - `nao_sustentada`: os trechos não tratam do que a frase afirma, ou dizem o contrário.
3. Todo veredito traz `trecho`: a parte da fonte em que você se baseou, copiada literalmente de `fontes` (sem alterar nenhuma palavra). Em `parcial` e `nao_sustentada`, explique em `nota` o que falta ou o que contradiz. Veredito sem `trecho` copiado de `fontes` não vale.
4. Desconfie de três coisas: versículo que existe mas não trata do assunto da frase; frase que inverte o sentido da fonte (atenção às negações); e frase que atribui à fonte uma conclusão que é só de quem escreveu.
5. Na dúvida entre `sustentada` e `parcial`, escolha `parcial`.

Depois dos vereditos, leia `licao.md` inteiro e responda ao checklist. Para cada item, liste os achados (pode ser lista vazia), cada um com o campo e a frase onde está:
- `correcao_ao_comentarista`: o texto aponta, corrige ou critica erro da revista, do livro de apoio ou de seus autores?
- `institucional_ou_nomes`: o texto afirma algo sobre a igreja, a denominação, cargos ou pessoas vivas (além de citar o autor do livro de apoio por capítulo)?
- `diverge_da_revista`: algum ponto doutrinário do texto contradiz o que `revista.txt` ensina?
- `tom`: há trecho agressivo, irônico, partidário, ou que exponha ou constranja o aluno?

Responda só com um objeto JSON, neste formato:

{"vereditos": [{"id": "<id>", "veredito": "sustentada|parcial|nao_sustentada", "trecho": "<cópia literal de fontes>", "nota": "<obrigatória se não for sustentada>"}], "checklist": {"correcao_ao_comentarista": [], "institucional_ou_nomes": [], "diverge_da_revista": [], "tom": []}}

Cada achado do checklist tem o formato {"campo": "<campo de licao.md>", "frase": "<frase>", "motivo": "<por quê>"}.

Depois do JSON, numa linha separada, liste os caminhos de todos os arquivos que você abriu.
