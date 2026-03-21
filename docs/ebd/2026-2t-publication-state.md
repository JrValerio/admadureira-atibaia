# Estado Final de Publicacao - EBD 2T/2026

## Contexto

Este documento registra a fotografia editorial e publica atual do `2T/2026` da EBD.
Ele descreve o comportamento real do produto para `Adultos` e `Jovens` sem alterar a governanca geral da EBD.

Use esta referencia para evitar quatro confusoes comuns:

- trimestre discoverable nao significa trimestre integralmente publicado
- licao robusta no dado nao significa licao publica agora
- `Em breve` nao e sinonimo de `draft`
- `Adultos` e `Jovens` compartilham o mesmo padrao operacional no `2T/2026`, mas seguem com controle editorial independente

## Estado atual por classe

### Adultos 2T/2026

- o trimestre `Adultos 2026-2t` esta publicamente discoverable
- apenas a `Licao 1` esta publica neste momento
- as `Licoes 2` a `13` existem no dado com estrutura editorial robusta
- as `Licoes 2` a `13` aparecem para o usuario como `Em breve`
- as `Licoes 2` a `13` continuam fora da descoberta publica enquanto a propria janela semanal nao abre

### Jovens 2T/2026

- o trimestre `Jovens 2026-2t` esta publicamente discoverable
- apenas a `Licao 1` esta publica neste momento
- as `Licoes 2` a `13` existem no dado com estrutura editorial robusta
- as `Licoes 2` a `13` aparecem para o usuario como `Em breve`
- as `Licoes 2` a `13` continuam fora da descoberta publica enquanto a propria janela semanal nao abre

## Distincao obrigatoria de estados

No estado atual do `2T/2026`, a documentacao deve diferenciar explicitamente tres camadas:

### 1. Licao publica

Uma licao publica:

- esta discoverable
- pode entrar no sitemap
- deve ficar indexavel
- ja passou pela combinacao de `statusEditorial` compativel, prontidao editorial e janela semanal aberta

Hoje, isso vale apenas para a `Licao 1` de cada classe no `2T/2026`.

### 2. Licao futura em `Em breve`

Uma licao em `Em breve`:

- ja existe no dado
- pode estar editorialmente robusta
- pode estar com `statusEditorial` compativel com publicacao
- ainda nao deve entrar em descoberta publica
- continua fora do sitemap
- continua sob `noindex` enquanto sua propria janela nao abre

No `2T/2026`, as `Licoes 2` a `13` de `Adultos` e `Jovens` devem ser entendidas assim.

### 3. Draft editorial interno

`Draft` continua sendo o estado correto para:

- conteudo ainda nao pronto para entrar na fila de liberacao
- licoes ou trimestres ainda em preparacao interna real
- material que nao deve ser descrito ao usuario como faseado ou `Em breve`

No estado atual do `2T/2026`, as futuras licoes de `Adultos` e `Jovens` nao devem ser descritas nesta documentacao como `draft` se a UX atual ja as apresenta como `Em breve`.

## Regra tecnica atual

O comportamento atual do `2T/2026` depende dos seguintes pontos:

- `Adultos 2026-2t` e `Jovens 2026-2t` usam `statusEditorial: partial` no trimestre
- isso permite que a edicao exista publicamente mesmo sem todas as licoes estarem publicas
- `dataLiberacaoPublica` foi aplicada de forma localizada apenas onde necessario para liberar a `Licao 1`
- a existencia de conteudo mais robusto no dado nao gera exposicao publica automatica
- a descoberta publica continua dependendo do helper central de elegibilidade

Em outras palavras:

- trimestre publico nao significa todas as licoes publicas
- licao pronta nao significa licao publica
- `Em breve` representa disponibilidade futura sinalizada, nao publicacao antecipada

## Paralelismo entre classes

No estado atual do `2T/2026`:

- `Adultos` e `Jovens` compartilham o mesmo padrao operacional
- as duas classes estao com trimestre aberto
- as duas classes tem apenas a `Licao 1` publica
- as duas classes mostram `Licoes 2` a `13` como `Em breve`
- as duas classes usam a mesma governanca semanal central

Isso nao significa dependencia editorial entre classes.

Continua valendo que:

- uma classe nao autoriza publicacao da outra
- uma classe nao redefine a cadencia da outra
- uma alteracao futura em `Adultos` nao deve ser presumida automaticamente para `Jovens`, e vice-versa

## Guardrails

- nao documentar `2T/2026` como se estivesse integralmente publicado
- nao tratar `Em breve` como sinonimo automatico de `draft`
- nao afirmar que a robustez do dado equivale a exposicao publica
- nao descrever a excecao da `Licao 1` como mudanca global da regra da sexta
- nao sugerir divergencia atual entre `Adultos` e `Jovens` no `2T/2026`, porque o comportamento agora esta alinhado

## Nota operacional

Leitura curta do estado atual:

- trimestre aberto ao usuario nas duas classes
- `Licao 1` publica nas duas classes
- futuras licoes presentes no dado e sinalizadas como `Em breve`
- descoberta publica futura ainda controlada pela janela semanal de cada licao

Este documento e uma fotografia do estado atual do `2T/2026`.
Ele nao substitui a governanca central da EBD nem cria nova politica global de publicacao.
