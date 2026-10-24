# Prévia visual — CONFADAT 2026

Prévia local: http://127.0.0.1:3001/eventos/confadat-2026

## Alterações

- Fundo marfim e rosé claro, títulos e botões em vinho, detalhes dourados e tipografia de títulos em serifa. Estilos isolados nesta página.
- Seção “Uma mensagem da nossa presidente” depois da apresentação e antes da programação: seis parágrafos transcritos integralmente da carta, assinatura e identificação em HTML selecionável.
- Retrato aprovado com blusa rosa: ao lado da mensagem a partir de 768 px e acima dela no celular, mantendo a proporção original.
- O retrato é servido diretamente em 1087 × 1447 px, sem uma segunda redução ou recompressão pelo otimizador de imagens.
- No celular, o WhatsApp flutuante fica oculto enquanto a seção da presidente está visível. Um link de contato ao final da seção mantém o acesso disponível fora do texto.
- Arranjos refinados a partir da rosa e da folha dourada do próprio kit, com contornos naturais e transparência limpa. As regiões com cetim, flores desfocadas e limites que cortavam pétalas foram retiradas da composição.
- Programação, informações corrigidas, artes existentes, links e dados estruturados preservados.

## Capturas

| Formato | Página completa | Mensagem da presidente |
| --- | --- | --- |
| Computador, viewport 1440 × 1000 | [Abrir captura](screenshots/confadat-2026/computador.png) | [Abrir detalhe](screenshots/confadat-2026/mensagem-computador.png) |
| Celular, viewport 390 × 844 | [Abrir captura](screenshots/confadat-2026/celular.png) | [Abrir detalhe](screenshots/confadat-2026/mensagem-celular.png) |

[Leitura no celular, com o WhatsApp flutuante oculto](screenshots/confadat-2026/leitura-celular.png).

Acabamento floral: [apresentação](screenshots/confadat-2026/flores-apresentacao.png) · [reflexão](screenshots/confadat-2026/flores-reflexao.png).

## Origem das imagens

- Retrato: `D:/Downloads/CONFADAT-2026-fontes/Anna-Alzira-Felix-restaurada-oficial.png`, 1087 × 1447. Apenas conversão para WebP, sem geração, retoque ou alteração do rosto.
- Rosas e folhas: `public/ministerios/confadat/confadat-2026/Fundos-Aprovados/Fundo floral bordô com centro livre-1.png`. Máscaras aprovadas em `scripts/assets/confadat-2026/` aplicadas ao RGB original, preservando pétalas, sombras e nervuras. Os WebP florais são exportados sem perdas e usam novos nomes para evitar as imagens anteriores em cache.
- Texto: `Carta de boas-vindas CONFADAT 2026.png`, conferido visualmente na íntegra.
- Preparação reproduzível: `scripts/prepare-confadat-2026-assets.mjs`, com argumentos para fundo, retrato e diretório de saída. Os arquivos brutos preexistentes não foram modificados.

## Verificação

- TypeScript sem erros; 239 testes aprovados; build de produção concluído.
- Navegador com build de produção: 320, 390, 768, 1024 e 1440 px, sem rolagem horizontal nem imagens quebradas.
- Mensagem com seis parágrafos, texto de 16 px no celular e 17 px a partir de 768 px; ordem e enquadramento do retrato conferidos.
- Retrato confirmado no navegador com resolução natural de 1087 × 1447, também em celular com densidade 3×.
- WhatsApp verificado antes, na entrada, no meio, no fim e depois da mensagem; nas mudanças de largura 390 → 1024 → 390 px; e após navegação interna para `/eventos`.
- Sem erros de JavaScript no navegador; revisão visual das capturas nos dois formatos.
- O build apresentou avisos de feeds do YouTube em outras páginas e concluiu usando os fallbacks existentes.

Registro da prévia aprovada. As capturas documentam a versão validada antes do merge.
