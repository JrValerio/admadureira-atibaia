# Roadmap

Evoluções planejadas ordenadas por impacto e viabilidade.

---

## Curto prazo

### EBD 2T/2026
- publicação das lições do segundo trimestre (adultos + jovens)
- gate de lançamento definido em `ebd-governance.md`

### Melhorias de SEO
- sitemap dinâmico incluindo slugs de eventos futuros
- structured data por página de evento

### Performance
- revisão de imagens pesadas (conversão para WebP/AVIF)
- auditoria de LCP por rota

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
