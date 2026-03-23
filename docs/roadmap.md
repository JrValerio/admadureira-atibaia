# Roadmap

Evoluções planejadas ordenadas por impacto e viabilidade.

---

## Fechado recentemente (março/2026)

### P0 — Hierarquia da home
- seções reordenadas por relevância institucional
- `Destaques` condicional ao estado de live (YouTube)
- `HomeEBD` reduzida a teaser com link para `/ebd`
- bloco `QuemSomos` adicionado para identidade institucional

### P1-A — Governança do design system
- tokens `ui-panel`, `ui-panel-accent`, `ui-panel-pad-lg` adotados em `/sobre`, `/ministerios`, `/testemunhos`, `/mensagens`
- painéis hardcoded migrados para tokens semânticos

### P1-B — Fechamento editorial das páginas novas
- linguagem interna removida de `/programacao/curso-de-teologia` e `/ministerios/missoes`
- copy orientada ao visitante sem inflacionar conteúdo ainda não disponível
- CTA duplicado corrigido na página do curso

---

## Em operação / pendente externo

### EBD Jovens 2T/2026
- Lição 1 publicada; demais lições dependem de entrega editorial da coordenação

### EBD Infantil
- publicação pausada aguardando material oficial da coordenação

### Curso de Teologia
- detalhes (duração, formato, certificação, inscrição) aguardam comunicado oficial da coordenação

### Biografia do Pr. Eliel Sobrinho
- aguarda material oficial da coordenação do curso

---

## Próximo (P2 — refinamento de grid)

### Breakpoints intermediários em cards e listagens
- `Cultos.tsx`, `Programacao.tsx`, `QuadroSemanal.tsx`, `PastoresGrid.tsx`, `Eventos.tsx`
- padrão aprovado: `md:grid-cols-2 lg:grid-cols-3` (ou `xl:grid-cols-4` onde aplicável)
- commit único: `fix(grid): adiciona breakpoints intermediarios em cards e listagens`

---

## Médio prazo

### Área administrativa (CMS leve)
Permitir que membros da liderança atualizem eventos e programação sem deploy.

Opções avaliadas:
- Notion como backend (API pública)
- Sanity (free tier)
- arquivo markdown com front matter + GitHub Actions

### Podcast
- player de áudio para mensagens em formato podcast
- integração com feed RSS para Spotify e Apple Podcasts

### PWA
- instalação no celular via manifest
- cache básico para consulta offline da programação

---

## Longo prazo

### Área de membros
- login com Google ou número de telefone
- histórico de leituras bíblicas
- pedidos de oração privados
- acesso a materiais exclusivos

### Notificações
- push notifications para eventos especiais
- lembrete semanal da programação

### App mobile
- React Native com compartilhamento de código da lógica
- notificações nativas

### Multi-congregação
- suporte a congregações do campo de Atibaia com programação própria
- estrutura de rotas por congregação

---

## Descartado (e por quê)

| Ideia | Motivo do descarte |
|---|---|
| Blog editorial | Baixo engajamento esperado; Instagram cobre melhor |
| Live streaming próprio | YouTube resolve sem custo e com infraestrutura superior |
| Loja de livros/recursos | Fora do escopo institucional |
