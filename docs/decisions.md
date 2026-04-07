# Decisões Técnicas

Registro das decisões de arquitetura e produto com o raciocínio por trás de cada uma.

---

## Next.js App Router (não Pages Router)

**Decisão:** usar App Router desde o início.

**Motivo:** Server Components eliminam hidratação desnecessária para conteúdo majoritariamente estático. A Metadata API nativa resolve SEO sem biblioteca externa. `generateStaticParams` simplifica rotas dinâmicas com conteúdo conhecido em build time.

---

## Conteúdo em TypeScript puro (sem CMS)

**Decisão:** todo conteúdo editorial fica em arquivos `.ts` dentro de `src/data/`.

**Motivo:** o volume de atualizações não justifica um CMS externo. Manter o conteúdo no repositório significa que cada mudança editorial vira um commit rastreável, com histórico, revisão e rollback. TypeScript garante que nenhuma lição seja publicada sem os campos obrigatórios.

**Custo aceito:** atualizações exigem deploy. Para o ritmo atual de publicação (uma vez por semana na EBD, eventualmente para eventos), isso é aceitável.

---

## Separação entre programação semanal e eventos especiais

**Decisão:** `agenda.ts` para rotina fixa; `eventos-especiais.ts` para eventos pontuais.

**Motivo:** a programação semanal é recorrente e previsível — aparece toda semana nos mesmos dias. Eventos especiais têm data específica, descrição própria, slug e página de detalhe. Misturar os dois geraria duplicidade na exibição e complexidade desnecessária na filtragem.

---

## Expansão de datas em runtime (não datas fixas no banco)

**Decisão:** a agenda recorrente é definida como regras de recorrência e expandida para datas concretas em `agenda-utils.ts`.

**Motivo:** não faz sentido cadastrar manualmente "Culto de Terça 15/04", "Culto de Terça 22/04"... para sempre. A regra é "toda terça às 19h30". O sistema expande isso em uma janela de tempo e resolve o próximo evento de cada tipo automaticamente.

---

## Sistema de âncoras para programação

**Decisão:** cada card da programação recebe um `id` gerado de forma determinística a partir do dia e título.

**Motivo:** os banners da home precisam linkar para algo específico dentro da página de programação. IDs gerados manualmente seriam propensos a inconsistência. A função `getProgramacaoAnchorId()` garante que o link do banner e o `id` do card sempre coincidem.

---

## Hero sem controles visuais (setas e indicadores)

**Decisão:** remover setas e pontos do carrossel da home.

**Motivo:** os banners têm arte própria com composição visual cuidada. Qualquer overlay — por mais discreto — compete com o design da arte. Autoplay, swipe e teclado cobrem os casos de uso sem adicionar ruído visual.

---

## Dados do hero gerados no servidor

**Decisão:** `getHeroEventos()` é chamada em `app/page.tsx` (Server Component) e passa o resultado como prop para `HeroEventos`.

**Motivo:** os destinos dos banners dependem de qual é o próximo evento de cada tipo. Se esse cálculo for feito no módulo no momento da importação, o resultado congela no build. Feito no Server Component, é recalculado a cada request (ou revalidação), mantendo os links corretos conforme o calendário avança.

---

## TailwindCSS sem design system externo

**Decisão:** usar TailwindCSS puro, sem shadcn/ui, Radix ou bibliotecas de componentes.

**Motivo:** o projeto tem identidade visual própria e específica. Adotar um sistema de componentes externo exigiria customização extensiva para corresponder à identidade, além de adicionar bundle desnecessário. Tailwind com componentes próprios dá controle total.

---

## YouTube para mensagens (não upload próprio)

**Decisão:** mensagens são exibidas via YouTube Data API, não hospedadas no servidor.

**Motivo:** hospedagem de vídeo tem custo de armazenamento, CDN e processamento. A igreja já usa o YouTube como canal principal. Integrar a API mantém o conteúdo em um lugar só e aproveita a infraestrutura de streaming do Google sem custo adicional.

---

## Repositório privado sem Code scanning

**Decisão:** manter o repositório privado e aceitar a indisponibilidade de Code scanning no plano atual.

**Motivo:** o repositório está em plano Free/Pro e, nesse modelo, o GitHub não disponibiliza CodeQL para este repositório privado. A cobertura operacional atual já inclui CI obrigatório, Dependabot alerts, security updates, branch protection, smoke checks e validação centralizada de variáveis de ambiente.

**Risco aceito:** análise estática de segurança em nível de plataforma fica fora do fluxo por limitação de plano, não por omissão operacional.

**Revisão futura:** reavaliar essa decisão se o repositório se tornar público ou se o plano/hospedagem mudar para um nível que habilite Code scanning.
