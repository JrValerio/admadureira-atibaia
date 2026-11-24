# Changelog

Todas as mudanças relevantes deste projeto são registradas aqui.
Formato baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/).

---

## [Não lançado]

### Planejado
- Painel de conteúdo além das artes semanais (eventos e avisos)
- PWA com suporte offline básico
- Notificações de eventos
- Área de membros

---

## [1.6.0] — 2026-11-24

Consolida março a novembro de 2026 (377 commits). O detalhe de cada mudança está nos PRs, de #157 a #223.

### Adicionado
- Painel Keystatic em `/keystatic` para publicar as artes da semana sem código (#220). Fica desligado em produção até o GitHub App ser configurado
- EBD: 3º e 4º trimestres de 2026 de Adultos e Jovens, com subsídios, versão para impressão e contagem do trimestre
- Gate editorial da EBD em Python (`scripts/gate-licao.py`): cabeçalho por OCR, citações bíblicas literais (ARC) e livro de apoio
- Eventos: CONFADAT 2026, Congresso UMADAT 2026 (álbuns e vídeos), Chá de Mulheres, Vigília, Culto de Ações de Graças e outros, com hero e destaque na home
- Programação semanal com exceções por data e banners por semana
- Política de privacidade do agente de transmissão (`/privacidade-agente`)
- Speed Insights da Vercel (#218)
- `npm run optimize:artes` para comprimir as artes sem mudar nome nem formato (#219)

### Alterado
- Next 16.4.6, React 19.3.1, Tailwind 4.3.5, Zod 4.6.7 e demais dependências; `npm audit` zerado (#212, #223 e bumps do Dependabot)
- YouTube: a detecção de live deixa de usar `search.list`, que esgotava a cota diária. A live revalida a cada 2 min e as listas a cada 10 min (#215)
- Artes de `public/programacao` comprimidas: 850 MB → 236 MB (#219)
- Vídeo do hero: 20,2 MB → 8,9 MB (#218)
- CI em Node 24 com `npm audit`, `tsc --noEmit` e gitleaks; Dependabot com patch e minor agrupados (#217)
- Funções da Vercel em São Paulo (`gru1`)

### Segurança
- Cabeçalhos CSP, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` e `X-Frame-Options` (#216)
- JSON-LD escapado contra fechamento de `<script>` (#216)
- A chave da API do YouTube não é mais gravada em logs nem exposta no `/healthz` (#215)
- Branch `main` protegida, exigindo CI verde

### Corrigido
- Miniaturas do YouTube servidas por `i1`–`i9.ytimg.com` voltavam 400 (#218)
- Build com número variável de páginas quando o YouTube respondia 429 (#190, via #215)

---

## [1.5.0] — 2026-03-22

### Adicionado
- Seção `/ministerios/missoes` adicionada ao sitemap com `priority: 0.8`
- Bloco `QuemSomos` na home (identidade institucional + link para `/sobre`)

### Alterado
- Home reorganizada: ordem das seções ajustada por hierarquia institucional
- `Destaques` recebe prop `liveNow` — quando há live ativa, primeiro card redireciona para `/sobre` em vez de `/videos`
- `HomeEBD` reduzida a teaser compacto com link para `/ebd`

---

## [1.4.0] — 2026-03-22

### Alterado (P1-B — fechamento editorial)
- `/programacao/curso-de-teologia`: linguagem interna removida do hero, callout e seção de detalhes; CTA duplicado corrigido (segundo botão passou a apontar para `/contato`)
- `/ministerios/missoes`: copy do callout bar reescrita para visitante; seção "Frentes apoiadas" e "Pedidos de oração" sem referência a estado interno da página
- `src/data/curso-teologia.ts`: notas do professor, detalhes do curso e FAQ revisados para linguagem limpa sem exposição de estado de desenvolvimento
- `src/data/missoes.ts`: parágrafos de frentes apoiadas e relatórios reescritos

---

## [1.3.1] — 2026-03-22

### Alterado (P1-A — governança do design system)
- `/sobre`: painel cream migrado para tokens `ui-panel-accent ui-panel-pad-lg`
- `/ministerios`: dois painéis (branco e cream) migrados para `ui-panel` / `ui-panel-accent` + `ui-panel-pad-lg`
- `/testemunhos`: cards de estatísticas e bloco cream migrados para tokens semânticos
- `/mensagens`: mesmo padrão de `/testemunhos` aplicado

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
