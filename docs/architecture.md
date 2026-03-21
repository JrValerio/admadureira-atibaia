# Arquitetura do Projeto

## Stack

| Camada | Tecnologia | Motivo |
|---|---|---|
| Framework | Next.js 16.1.6 (App Router) | SSG/SSR nativo, metadata API, otimização de imagens |
| UI | React + TailwindCSS | Componentização + utilidade sem overhead |
| Linguagem | TypeScript | Segurança em dados complexos e estáticos |
| Deploy | Vercel | Zero config, preview deploys, analytics |
| Integração de mídia | YouTube Data API | Mensagens e transmissões sem hospedar vídeos |

---

## Estrutura de pastas

```
src/
  app/              rotas e páginas (Next.js App Router)
  components/       componentes reutilizáveis de UI
    ebd/            componentes específicos da EBD
    ui/             primitivos visuais genéricos
  sections/         blocos estruturais de páginas (hero, grids, carrosséis)
  data/             conteúdo editorial, dados institucionais e configurações
    ebd/            trimestres, lições e metadados por classe
    site.ts         fonte única dos dados institucionais da sede
  lib/              utilitários, builders de metadata e regras de negócio
  hooks/            hooks personalizados (interação, mídia)
```

---

## Separação de responsabilidades

### `data/`

Contém o conteúdo editorial, as configurações de disponibilidade e os dados institucionais em TypeScript puro, sem dependência de CMS externo.

Exemplos:
- `agenda.ts` — programação semanal recorrente
- `agenda-recorrente.ts` — definição de slots de tempo
- `eventos-especiais.ts` — eventos com data e slug
- `ebd/` — lições por trimestre e faixa etária
- `espiritualidade.ts` — configuração de recursos como rádio e podcast
- `site.ts` — nome oficial, endereço, mapas, coordenadas, horários e redes da sede
- `pastores.ts`, `ministerios.ts`, `historia.ts` — conteúdo institucional

Vantagem: conteúdo tipado, versionado no git, sem dependência de API em tempo de execução.

### `lib/`

Contém regras de negócio, utilitários e funções de derivação de dados — nunca markup.

Exemplos:
- `agenda-utils.ts` — expansão de datas recorrentes, filtro de próximos eventos, resolução de slugs
- `ebd-utils.ts` — elegibilidade editorial, descoberta pública e contexto das lições
- `programacao-anchor.ts` — geração de IDs e hrefs de âncora para a programação
- `date-utils.ts` — manipulação de datas no fuso de São Paulo
- `site.ts` — builders de metadata, canonical e imagem padrão

### `components/`

Componentes de UI puros: recebem dados por props ou consomem constantes já centralizadas, sem concentrar regras editoriais.

### `sections/`

Blocos maiores que compõem páginas. Podem conter lógica de layout mas delegam regras de negócio para `lib/`.

### `app/`

Páginas e rotas. Responsáveis por buscar dados (Server Components) e passar para componentes via props.

---

## Fluxo de dados

```
data/          conteúdo editorial + configuração institucional
   ↓
lib/           transformação, elegibilidade e metadata
   ↓
app/page.tsx   Server Component — busca e passa dados
   ↓
sections/      blocos de layout
   ↓
components/    UI pura com props
```

O projeto separa a existência da rota da descoberta pública.
Uma rota pode existir para revisão editorial interna, enquanto `lib/`, sitemap e `metadata.robots` controlam se ela entra ou não em descoberta pública.

---

## Renderização

O projeto usa **geração estática (SSG)** como padrão, com `generateStaticParams` para rotas dinâmicas como `/eventos/[slug]` e as rotas da EBD.

Dados sensíveis ao tempo (próximo evento, lição em estudo, plano de leitura, versículo do dia) são resolvidos em Server Components sem hidratação desnecessária no cliente.

No caso da EBD, a pré-geração de rotas não significa publicação automática:

- trimestres e lições em `draft` podem existir como rota para revisão interna
- essas páginas recebem `noindex`
- a descoberta pública continua filtrada por helpers e sitemap

---

## Descoberta pública, sitemap e indexação

Cada página exporta `metadata` via Next.js Metadata API com:

- `title` e `description` específicos
- `openGraph` com imagem, URL e locale
- `twitter` card
- `alternates.canonical`

O `layout.tsx` raiz contém Schema.org JSON-LD do tipo `Church` e consome os dados institucionais centralizados em `src/data/site.ts`.

O sitemap é tratado como camada de descoberta pública, não apenas como espelho das rotas existentes.

Regras práticas atuais:

- rotas publicáveis entram no sitemap
- rotas acessíveis, mas ainda não prontas para descoberta pública, ficam fora do sitemap e recebem `noindex`
- `Rádio` e `Podcast` permanecem acessíveis no produto, mas ficam fora do sitemap enquanto o stream/feed oficial não estiver configurado
- trimestres `draft` da EBD e lições não publicadas ficam fora do sitemap
- páginas de `draft` na EBD permanecem acessíveis por rota direta para preparação editorial, com `noindex`

---

## EBD — Governança editorial

A EBD usa um fluxo editorial em camadas:

- configuração de classe (`publicadaNoSite`)
- status do trimestre (`published` ou `draft`)
- status da lição (`published` ou `draft`)
- helpers de elegibilidade em `src/lib/ebd-utils.ts`
- controle final de descoberta via sitemap e `metadata.robots`

Na prática:

- uma classe só entra em descoberta pública quando está marcada para o site e possui ao menos uma lição publicada
- um trimestre `draft` pode existir no dataset e na rota, mas não entra em descoberta pública
- uma lição não publicada pode existir na rota, mas recebe `noindex` e fica fora do sitemap
- home, hub da EBD, páginas de classe e sitemap usam filtros de publicação para expor apenas o que faz sentido publicamente hoje

Ver [ebd-governance.md](ebd-governance.md) para detalhes do sistema editorial.
