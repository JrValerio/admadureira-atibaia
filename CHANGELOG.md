# Changelog

Todas as mudanças relevantes deste projeto são registradas aqui.
Formato baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/).

---

## [Não lançado]

### Planejado
- Área administrativa para atualização de conteúdo
- PWA com suporte offline básico
- Notificações de eventos
- Área de membros

---

## [1.3.0] — 2026-03-16

### Adicionado
- Hero banner full width na home sem overlay de controles
- Links dos banners apontando para páginas específicas (programação por âncora, eventos por slug)
- `getProximoEventoPorTipo()` para resolver destino dinâmico dos banners
- `getProgramacaoHref()` e `getProgramacaoAnchorId()` para âncoras consistentes
- IDs de âncora nos cards da programação com `scroll-mt` para navegação precisa
- Logo da igreja como ícone da aba do navegador (`src/app/icon.png`)

### Alterado
- Hero carrossel agora ocupa 100% da largura da tela (removido container e moldura de card)
- Geração do dataset do hero movida para o servidor (`getHeroEventos()`)
- Setas e pontos do carrossel removidos — interação por autoplay, swipe e teclado

---

## [1.2.0] — 2026-03

### Adicionado
- Slider de banners na home com autoplay, swipe, pausa e teclado
- Setas e indicadores de posição no carrossel

### Alterado
- Refatoração da EBD: cabeçalhos de impressão, densidade de conteúdo e layout de páginas fixas

---

## [1.1.0] — 2026-01 a 2026-02

### Adicionado
- Módulo completo de EBD (adultos e jovens — 1T/2026)
- Lição piloto de jovens (`Lição 11`) publicada como validação antecipada
- Estrutura de governança editorial para controle de publicação (`docs/ebd-governance.md`)
- Integração com YouTube Data API para mensagens
- Schema.org JSON-LD para SEO estruturado
- OpenGraph e Twitter Card configurados

### Alterado
- Separação entre programação semanal recorrente e agenda de eventos especiais
- Reorganização do hub de espiritualidade

---

## [1.0.0] — 2025

### Adicionado
- Estrutura base do site institucional com Next.js App Router
- Página inicial com hero, programação e destaques
- Programação semanal da igreja
- Agenda de eventos especiais
- Hub de espiritualidade: Bíblia online, versículo do dia, devocionais, plano de leitura, rádio
- Escola Bíblica Dominical
- Página de mensagens
- Ministérios
- Pastores e liderança
- História da igreja
- Congregações
- Pedidos de oração e contato
- Página de dízimos e ofertas
- Responsividade mobile-first
- SEO estruturado por página
