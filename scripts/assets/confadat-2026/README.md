# Máscaras florais da prévia CONFADAT 2026

Fonte: `public/ministerios/confadat/confadat-2026/Fundos-Aprovados/Fundo floral bordô com centro livre-1.png`, matriz de 1122 × 1402 px.

As duas imagens são máscaras de um canal: representam somente transparência. O script `scripts/prepare-confadat-2026-assets.mjs` recupera os canais RGB diretamente da fonte, compõe a rosa e folhas e exporta WebP sem perdas.

- `rosa-alpha.png`: 402 × 400. Região `{left:720, top:0, width:402, height:400}`. Segmentação do objeto isolado com U2Net, mantendo o componente principal e eliminando pixels fracos fora do contorno. Não há geração de pixels de flor.
- `folha-alpha.png`: 200 × 115. Região `{left:280, top:1025, width:200, height:115}`. Contorno da folha dourada original, com antialias curto para remover a franja do cetim.

As regiões com cetim e flores desfocadas não integram os arranjos finais. Os elementos escolhidos têm contorno completo, sem transição linear atravessando pétalas. Espelhamento e rotações de 90 graus distribuem as folhas e a composição nas bordas; o retrato não recebe essas transformações.

As máscaras foram verificadas sobre marfim em tamanho original. A preparação usa apenas `sharp`, já disponível no projeto; não exige modelos ou pacotes de segmentação em produção.
