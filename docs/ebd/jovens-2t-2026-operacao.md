# Operacao Semanal - Jovens 2T/2026

## Estado atual

- `Jovens 2026-2t` esta publico como edicao e visivel no site
- `Licao 1` esta publicada e publicamente elegivel
- `Licoes 2` a `13` ja estao estruturadas no dataset, mas permanecem fora da descoberta publica
- a publicacao segue cadencia semanal controlada
- `Adultos 2T/2026` nao faz parte desta rotina e nao deve ser alterado por tabela

## Regra de publicacao

A publicacao semanal de `Jovens 2T/2026` depende sempre da combinacao de:

1. `statusEditorial` compativel com publicacao
2. prontidao editorial concluida
3. janela semanal de liberacao aberta

Observacoes:

- a `Licao 1` ja possui excecao localizada de liberacao publica e nao precisa de nova intervencao
- `Licoes 2` a `13` nao devem ser antecipadas manualmente
- deixar uma licao mais completa no dataset nao significa libera-la no site antes da hora

## Cadencia da edicao

- `Licao 1` -> publica
- `Licao 2` -> `2026-04-10`
- `Licao 3` -> `2026-04-17`
- `Licao 4` -> `2026-04-24`
- `Licao 5` -> `2026-05-01`
- `Licao 6` -> `2026-05-08`
- `Licao 7` -> `2026-05-15`
- `Licao 8` -> `2026-05-22`
- `Licao 9` -> `2026-05-29`
- `Licao 10` -> `2026-06-05`
- `Licao 11` -> `2026-06-12`
- `Licao 12` -> `2026-06-19`
- `Licao 13` -> `2026-06-26`

## Convencao de status

No codigo e na operacao desta edicao:

- `draft` = licao ainda nao deve ser tratada como pronta para liberacao
- `published` = licao apta a entrar na fila de liberacao, desde que passe pela prontidao editorial e pela janela semanal
- `partial` = estado do trimestre, permitindo que a edicao exista publicamente mesmo com liberacao gradual das licoes

No acompanhamento editorial semanal, `em-breve` pode ser usado como linguagem operacional para licoes futuras, mas isso nao substitui os status reais do modelo de dados.

## Ordem operacional semanal

Repita esta ordem sempre antes de liberar a proxima licao:

1. revisar o conteudo da licao no dataset
2. revisar metadados, resumo, objetivos e referencias biblicas
3. validar imagem, capa e identificadores da licao
4. confirmar prontidao editorial completa
5. confirmar que a janela semanal correta foi atingida
6. validar rota da licao
7. validar pagina do trimestre e card da classe
8. validar navegacao `anterior` e `proxima`
9. validar `robots` e sitemap apos o build

## Guardrails

- nao publicar mais de uma licao por vez sem decisao editorial explicita
- nao alterar `Adultos 2T/2026` dentro da rotina de `Jovens 2T/2026`
- nao mudar slug, data ou imagem de uma licao ja publicada sem revisar todos os consumidores
- nao introduzir excecoes novas de release sem registrar a decisao na documentacao
- nao tratar rota existente como sinonimo de descoberta publica
- nao atualizar convencoes de status sem atualizar esta documentacao e [docs/ebd-governance.md](../ebd-governance.md)

## Rollback simples

Se alguma licao sair com erro editorial, inconsistencias de metadados ou exposicao indevida:

1. devolver a licao para um estado fora da elegibilidade publica
2. confirmar que `robots` volta para `noindex`
3. confirmar que a licao deixa de aparecer no sitemap
4. revisar pagina da classe e pagina do trimestre
5. corrigir o dataset antes de reabrir a licao publicamente

Se o erro estiver isolado em uma licao, o restante do trimestre nao deve ser mexido.

## Documentos relacionados

- [Governanca central da EBD](../ebd-governance.md)
- [Checklist semanal do Jovens 2T/2026](./jovens-2t-2026-checklist.md)
