# Performance Baseline — novembro/2026

Lighthouse 12, mobile (simulado), produção `www.admadureiraatibaia.com.br`, 24/11/2026.
Substitui o baseline da Sprint 7 (março), que mostrava LCP mobile de 7,5s a 8,3s.

| Rota | Perf. | FCP | LCP | TBT | CLS | Elemento LCP |
|---|---:|---:|---:|---:|---:|---|
| `/` | 93 | 1.5s | 2.7s | 160ms | 0 | foto da fachada (28 KB, `fetchpriority=high`) |
| `/programacao` | 86 | 0.9s | 2.6s | 430ms | 0 | foto do culto |
| `/espiritualidade` | 87 | 0.9s | 2.4s | 420ms | 0 | foto da fachada |

## Leitura

- A imagem do hero já é pedida junto com o HTML, com prioridade alta. O atraso que sobra na home é a chegada do próprio documento.
- O TBT de 420–430ms em `/programacao` e `/espiritualidade` é o próximo alvo, se o Speed Insights confirmar em dados reais.
- O vídeo do hero (só desktop, carregado depois do `load`) caiu de 20,2 MB para 8,9 MB: H.264 CRF 26, sem trilha de áudio (o vídeo é `muted`), `faststart`.

## Dados reais

O Speed Insights da Vercel (`<SpeedInsights />` no layout) coleta os Core Web Vitals de visitantes reais. A partir de agora, ele é a referência; o Lighthouse serve para comparar antes e depois de uma mudança.
