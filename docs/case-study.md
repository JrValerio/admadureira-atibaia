# Case Study — AD Madureira Atibaia

## Contexto

A Igreja Assembleia de Deus Ministério Madureira de Atibaia não possuía presença digital organizada além das redes sociais.

Informações importantes — programação, eventos, materiais de ensino e recursos espirituais — ficavam dispersas entre Instagram, grupos de WhatsApp e comunicados presenciais.

---

## Problema

Essa dispersão criava três dificuldades concretas:

**Para membros:** precisavam perguntar no grupo a cada semana para saber horários, datas de eventos e disponibilidade de materiais da EBD.

**Para visitantes:** não havia onde consultar como é a rotina da igreja antes de aparecer pessoalmente.

**Para a liderança:** não havia forma de distribuir conteúdos espirituais (devocionais, lições, plano de leitura) sem depender de terceiros ou plataformas externas.

---

## Solução

Desenvolvimento de uma plataforma digital institucional e espiritual que centraliza:

- programação semanal com horários e descrições
- agenda de eventos especiais com destaque para próximos cultos
- Escola Bíblica Dominical com lições, resumos e materiais para impressão
- hub espiritual com Bíblia online, devocionais e plano de leitura
- biblioteca de mensagens via YouTube
- informações institucionais: ministérios, pastores, história, congregações

---

## Decisões de produto

### Separar programação de eventos

A programação semanal é recorrente e previsível. Eventos especiais são pontuais e precisam de destaque específico. Misturá-los geraria ruído e dificultaria a consulta rápida.

A solução foi manter dois sistemas distintos com uma camada de composição para a home.

### EBD como produto editorial

A EBD não é só uma listagem de arquivos. Ela tem faixas etárias, trimestres, numeração, materiais de apoio e uma lógica de publicação progressiva.

Foi criado um sistema de governança editorial que controla o que está publicado, o que está em rascunho e os gates de lançamento por trimestre. Isso evita conteúdo incompleto aparecendo para o usuário final.

### Hub espiritual como ponto de retorno diário

Redes sociais criam dependência de algoritmo. Um hub próprio cria um hábito direto.

O objetivo da seção de espiritualidade é oferecer razão para o usuário voltar todo dia: versículo novo, devocional novo, progresso no plano de leitura.

---

## Stack escolhida

**Next.js + React + TypeScript + TailwindCSS**

Next.js foi escolhido por:
- excelente suporte a SEO via App Router e metadata API
- Server Components para geração estática com dados dinâmicos
- otimização de imagens nativa
- estrutura de rotas que espelha bem a organização do conteúdo

TailwindCSS foi escolhido por produtividade e consistência visual sem overhead de sistema de design externo.

TypeScript foi adotado desde o início para garantir segurança nos dados institucionais, que são estáticos mas têm estrutura complexa (agenda recorrente, eventos com slots de data, lições com metadados).

---

## Resultados

- site em produção com domínio próprio
- programação e eventos acessíveis a qualquer momento, sem depender de grupos
- EBD digital com mais de 26 lições publicadas (adultos + jovens)
- presença nos resultados de busca com schema.org estruturado
- SEO por página com OpenGraph e Twitter Card para compartilhamento

---

## Aprendizados técnicos

- **modelagem de conteúdo recorrente:** agenda semanal com expansão de datas, exceções e variações de tipo
- **sistema editorial com gates:** controle de publicação por trimestre sem CMS externo
- **SEO para conteúdo religioso:** estrutura de metadados, schema Church e OpenGraph por página
- **composição de dados para home:** múltiplas fontes (agenda fixa + eventos especiais + hero) sem duplicidade
- **experiência mobile-first:** hero responsivo, carrossel com swipe, tipografia adaptada

---

## Próximos passos

- área administrativa para atualização de conteúdo sem deploy
- PWA com instalação no celular e suporte offline básico
- notificações de eventos
- área de membros com login
- podcast da igreja
