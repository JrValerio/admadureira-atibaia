# Arquitetura do Projeto

## Stack

| Camada | Tecnologia | Motivo |
|---|---|---|
| Framework | Next.js 14 (App Router) | SSG/SSR nativo, metadata API, otimização de imagens |
| UI | React + TailwindCSS | Componentização + utilidade sem overhead |
| Linguagem | TypeScript | Segurança em dados complexos e estáticos |
| Deploy | Vercel | Zero config, preview deploys, analytics |
| API externa | YouTube Data API | Mensagens sem hospedar vídeos |

---

## Estrutura de pastas

```
src/
  app/              rotas e páginas (Next.js App Router)
    (rota)/
      page.tsx      página da rota
      layout.tsx    layout compartilhado (quando necessário)
  components/       componentes reutilizáveis de UI
    programacao/    componentes específicos da EBD e programação
    ui/             primitivos visuais genéricos
  sections/         blocos estruturais de páginas (hero, grids, carrosséis)
  data/             conteúdo e dados institucionais estáticos
  lib/              utilitários, helpers e regras de negócio
  hooks/            hooks personalizados (interação, mídia)
```

---

## Separação de responsabilidades

### `data/`

Contém todo o conteúdo editorial e institucional em TypeScript puro, sem dependência de CMS externo.

Exemplos:
- `agenda.ts` — programação semanal recorrente
- `agenda-recorrente.ts` — definição de slots de tempo
- `eventos-especiais.ts` — eventos com data e slug
- `ebd/` — lições por trimestre e faixa etária
- `pastores.ts`, `ministerios.ts`, `historia.ts` — conteúdo institucional

Vantagem: conteúdo tipado, versionado no git, sem dependência de API em tempo de execução.

### `lib/`

Contém regras de negócio, utilitários e funções de derivação de dados — nunca markup.

Exemplos:
- `agenda-utils.ts` — expansão de datas recorrentes, filtro de próximos eventos, resolução de slugs
- `programacao-anchor.ts` — geração de IDs e hrefs de âncora para a programação
- `date-utils.ts` — manipulação de datas no fuso de São Paulo
- `site.ts` — constantes de URL, nome e imagem padrão

### `components/`

Componentes de UI puros: recebem dados por props, não buscam dados diretamente.

### `sections/`

Blocos maiores que compõem páginas. Podem conter lógica de layout mas delegam regras de negócio para `lib/`.

### `app/`

Páginas e rotas. Responsáveis por buscar dados (Server Components) e passar para componentes via props.

---

## Fluxo de dados

```
data/          conteúdo estático
   ↓
lib/           transformação e filtragem
   ↓
app/page.tsx   Server Component — busca e passa dados
   ↓
sections/      blocos de layout
   ↓
components/    UI pura com props
```

Dados nunca sobem (componente não importa de `data/` diretamente).
Regras nunca ficam em componentes.

---

## Renderização

O projeto usa **geração estática (SSG)** como padrão, com `generateStaticParams` para rotas dinâmicas como `/eventos/[slug]` e `/ebd/[trimestre]/[faixa]/[slug]`.

Dados sensíveis ao tempo (próximo evento, versículo do dia) são resolvidos em Server Components no momento do build ou do request, sem hidratação desnecessária no cliente.

---

## SEO

Cada página exporta `metadata` via Next.js Metadata API com:

- `title` e `description` específicos
- `openGraph` com imagem, URL e locale
- `twitter` card
- `alternates.canonical`

O `layout.tsx` raiz contém Schema.org JSON-LD do tipo `Church` para resultados de busca estruturados.

---

## EBD — Governança editorial

A EBD tem um sistema de publicação controlada por gates de trimestre.

O que está publicado fica disponível em rotas públicas.
O que está em rascunho existe no código mas não é exposto por `generateStaticParams`.

Ver [ebd-governance.md](ebd-governance.md) para detalhes do sistema editorial.
