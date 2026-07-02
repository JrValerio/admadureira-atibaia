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

## Gate de merge para conteúdo e documentação

**Decisão:** documentação de processo com escopo pré-aprovado em conversa pode ser mergeada pelo agente após CI verde. Conteúdo editorial ou institucional publicado no site exige gate humano antes do merge, mesmo com CI verde.

**Motivo:** CI valida compilação, lint e testes; não valida verdade de mundo real, grafia de nomes, cargos, horários, fontes bíblicas ou atribuições institucionais. A fonte da confirmação deve ficar registrada no corpo do PR quando a mudança envolver dado editorial ou institucional.

**Regra de handoff:** se a mudança altera conteúdo visível para igreja, visitantes ou alunos, manter o PR aberto ou em draft até aprovação humana/fonte oficial. Se a mudança apenas registra processo já aprovado, CI verde basta.

---

## Separação entre programação semanal e eventos especiais

**Decisão:** `agenda.ts` para rotina fixa; `eventos-especiais.ts` para eventos pontuais.

**Motivo:** a programação semanal é recorrente e previsível — aparece toda semana nos mesmos dias. Eventos especiais têm data específica, descrição própria, slug e página de detalhe. Misturar os dois geraria duplicidade na exibição e complexidade desnecessária na filtragem.

---

## Eventos de vários dias com página canônica

**Decisão:** congressos e eventos especiais com várias datas usam uma página canônica dedicada em `/eventos/[slug-do-evento]`, mantendo cada data como entrada própria em `eventos-especiais.ts`.

**Motivo:** as entradas da agenda preservam a função de calendário, enquanto a página canônica concentra SEO, arte oficial, programação completa, convidados, liderança e CTA compartilhável. O padrão usado no Congresso da Mocidade — Rios de Unção 2026 também deve orientar eventos como o Congresso Geral UMADAT Jovem.

**Regra de implementação:** criar um arquivo de dados compartilhado em `src/data/`, apontar as entradas antigas da agenda para a página canônica via `recursos`, incluir a canônica no sitemap e, se houver slide na home, linkar o hero para a canônica.

**Regra visual:** artes verticais informativas usam `object-contain` de forma escopada ao asset do evento; não mudar o crop padrão dos demais eventos. Evitar overlay de texto sobre pôsteres que já carregam data, tema e nomes.

**Regra editorial:** nomes, cargos, convidados, preletores e atribuições institucionais exigem material oficial ou confirmação da liderança antes do merge. A fonte da confirmação deve ser registrada no corpo do PR.

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

---

## EBD: discriminated union por `publico`

**Decisão:** `LicaoEBD = LicaoEBDAdultos | LicaoEBDJovens | LicaoEBDInfantil`, discriminadas por `publico`.

**Motivo:** Adultos e Jovens têm nomenclaturas editoriais distintas (`textoAureo`/`verdadePratica` vs `textoPrincipal`/`resumoDaLicao`). A union garante type safety por classe sem forçar nomenclatura unificada, e narrowing por `publico` resolve o render sem fallbacks runtime.

**Custo aceito:** cada nova variante de classe exige uma linha na union e um type guard.

---

## EBD: subsídio valida shapes reais, não estrutura paralela

**Decisão:** `SubsidioAdultos` e `SubsidioJovens` são os schemas canônicos, validados com Zod e tipados via `z.infer`. Campo `subsidioExpandido` paralelo (PR #87) foi removido no PR #88.

**Motivo:** uma camada paralela com shape diferente do que renderiza em produção cria três fontes de verdade por lição (subsídio da classe, aprofundamento da classe, expandido cross-class) e dois lugares para o mesmo contexto histórico. Para adicionar granularidade ao aprofundamento, o caminho correto é estender os schemas existentes com sub-tipos compartilhados opcionais (`aprofundamentoEstruturadoSchema`), não criar um terceiro campo.

**Regra de handoff:** qualquer proposta de novo campo top-level em `LicaoEBDBase` deve checar primeiro se `SubsidioAdultos.aprofundamento` ou `SubsidioJovens.aprofundamentoOpcional` já cobre o shape — se cobrir, estender de dentro, não adicionar campo paralelo.

---

## EBD: leitura diária é fiel à revista (6 dias, sem domingo)

**Decisão:** `leituraDiaria` de Adultos e `leituraSemanal` de Jovens seguem o padrão CPAD: 6 entradas (seg–sáb), sem domingo autoral. Conteúdo (quais versículos, quais temas) é verbatim da revista, incluindo pontuação dos temas. Formato das referências segue a convenção do site: nome completo + dois-pontos (`Atos 1:8`, não `At 1.8`).

**Motivo:** a Lição 1 de Adultos 3T2026 foi publicada com 7 dias e referências divergentes de qua–sáb em relação à revista física. A Lição 2 do mesmo trimestre (PR #89) teve referências gravadas em dot notation verbatim da revista (`Efésios 2.8,9`) em vez da convenção do site (`Efésios 2:8,9`). O site renderiza a string como armazenada — formato inconsistente vira inconsistência visual no bloco mais consultado da página. A normalização em runtime (`normalizeBibleReferenceNotation` via `normalizeAdultSubsidy`) converte ponto → dois-pontos entre dígitos, mas a fonte deve já usar colon notation para que a leitura do dado seja imediata sem depender do conhecimento do normalizador.

**Regra de handoff:** copiar conteúdo e temas da CPAD sem alteração; formatar referências com nome por extenso + dois-pontos. O array é livre no schema (sem `.length` fixo) para acomodar variações eventuais sem alterar o tipo.
