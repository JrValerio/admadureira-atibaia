// src/data/curso-teologia-artigos.ts
// Artigos teológicos do Pr. Eliel Sobrinho — Blog KERUSSÕ
// Conteúdo utilizado com autorização do autor.

export type Bloco =
  | { tipo: "paragrafo"; texto: string }
  | { tipo: "titulo"; texto: string }
  | { tipo: "subtitulo"; texto: string }
  | { tipo: "citacao"; texto: string; referencia?: string }
  | { tipo: "lista"; itens: string[] }
  | { tipo: "destaque"; texto: string }
  | { tipo: "versiculo"; texto: string; referencia: string }
  | { tipo: "bibliography"; itens: string[] }

export interface ArtigoTeologico {
  slug: string
  titulo: string
  data: string
  dataISO: string
  resumo: string
  blocos: Bloco[]
}

export const artigosTeologicos: ArtigoTeologico[] = [
  // ─── 1 ────────────────────────────────────────────────────────────────────
  {
    slug: "soteriologia-doutrina-da-salvacao",
    titulo: "Soteriologia — Doutrina da Salvação",
    data: "Setembro 2010",
    dataISO: "2010-09",
    resumo:
      "Estudo sistemático sobre a doutrina da salvação: justificação, regeneração, santificação, glorificação e os meios pelos quais Deus opera a redenção do homem.",
    blocos: [
      {
        tipo: "paragrafo",
        texto:
          'A Soteriologia é o ramo da teologia sistemática que trata da salvação. O termo provém do grego sōtēria, "salvação", e logos, "estudo". Trata-se do estudo de como Deus resgata o homem do pecado e de suas consequências, por meio da obra redentora de Jesus Cristo.',
      },
      { tipo: "titulo", texto: "I – O Plano da Salvação" },
      {
        tipo: "paragrafo",
        texto:
          'O termo grego para "salvar" é sōzō, com o sentido de: libertar, preservar, curar, trazer a salvo. O verbo "salvar" significa fazer são, restaurar ao estado de saúde e integridade. A salvação bíblica implica uma completa transformação do ser humano — positional, moral e escatologicamente.',
      },
      {
        tipo: "paragrafo",
        texto:
          'A Bíblia usa vários termos relacionados ao conceito de "salvo": libertado, redimido, justificado, reconciliado, regenerado, adotado, santificado e glorificado. Cada um desses vocábulos ilumina uma faceta distinta da obra salvífica de Deus.',
      },
      { tipo: "titulo", texto: "II – Os Atos da Salvação" },
      { tipo: "subtitulo", texto: "1) Justificação" },
      {
        tipo: "paragrafo",
        texto:
          'A "justificação" é objetiva (externa). A palavra "justifica" é termo judicial que significa absolver, declarar justo, ou pronunciar sentença de aceitação.',
      },
      {
        tipo: "subtitulo",
        texto: "a) A Natureza da Justificação: Absolvição Divina",
      },
      {
        tipo: "paragrafo",
        texto:
          "Justificação é primeiramente uma mudança de posição da parte do pecador, o qual antes era um condenado; agora, porém goza de absolvição. A justificação é muito mais do que perdão de pecados e remoção da condenação. Deus coloca o ofensor na posição de justo. Ele apaga o passado, os pecados e ofensas, e, em seguida, trata o ofensor como se nunca tivesse cometido um pecado sequer! Deus, ao perdoar o pecador, o declara justificado, isto é, justo aos olhos divinos. (Rm 5.1)",
      },
      {
        tipo: "subtitulo",
        texto: "b) A Necessidade da Justificação: A Condenação do Homem",
      },
      {
        tipo: "paragrafo",
        texto:
          "A Bíblia deixa claro o estado moral e espiritual em que se encontrava o homem. Paulo aos Romanos mostra a degradação em que o homem estava eternamente sob condenação: outrora conheceram a Deus (Rm. 1:19,20); falhando em adorarem e servirem, seu coração insensato se obscureceu (1.21,22); a cegueira espiritual os conduzia à idolatria (vr.23) e a idolatria os conduzia à corrupção moral (vrs.24-31). São indesculpáveis porque tinham revelação de Deus na natureza (1.19,20; 2.14,15).",
      },
      {
        tipo: "versiculo",
        texto:
          "Ora, nós sabemos que tudo o que a lei diz aos que estão debaixo da lei o diz, para que toda boca esteja fechada e todo o mundo seja condenável diante de Deus. Por isso nenhuma carne será justificada diante dele pelas obras da lei, porque pela lei vem o conhecimento do pecado.",
        referencia: "Rm 3.19,20",
      },
      { tipo: "subtitulo", texto: "c) A Fonte da Justificação: A Graça" },
      {
        tipo: "paragrafo",
        texto:
          "No hebraico, graça hen, demonstrar favor, afeição, comiseração. O termo grego para graça no Novo Testamento é charis, usado para graciosidade, amabilidade, favor. Graça é o favor que se dispensa ou se recebe; favor que não merecemos, mas Deus livremente nos concede bênçãos imerecidas, especialmente com referência ao favor Divino. A salvação é sempre apresentada como dom, um favor não merecido, impossível de ser recompensado; é um benefício de Deus. (Rm.6.23)",
      },
      {
        tipo: "versiculo",
        texto:
          "Porque pela graça, sois salvos, por meio da fé; e isso não vem de vós; é dom de Deus. Não vem das obras, para que ninguém se glorie.",
        referencia: "Ef 2.9,10",
      },
      {
        tipo: "subtitulo",
        texto: "d) Fundamento da Justificação: A Justiça de Cristo",
      },
      {
        tipo: "paragrafo",
        texto:
          'Deus proveu a justiça "mediante a redenção que há em Cristo Jesus". Redenção (agorazô) é o resgate (lutron) pela libertação por preço pago. Cristo morreu por nós para nos salvar da justa ira de Deus contra nós. Sua morte foi um ato perfeito de justiça, porque satisfez a lei de Deus. O ato pelo qual Deus credita essa justiça à nossa conta chama-se imputação. Imputação (logizomai) é levar à conta de alguém a consequência do ato de outrem.',
      },
      { tipo: "subtitulo", texto: "e) Os Meios da Justificação: a Fé" },
      {
        tipo: "paragrafo",
        texto:
          "A fé é o instrumento pelo qual o homem se apropria da justiça de Cristo provida por Deus. Poderíamos dizer que a fé é a mão que recebe o que Deus oferece. (Rm.3.22; 4.11; 9.30; Hb.11.7; Fil.3.9). A fé lança mão da promessa divina e apropria-se da salvação. A doutrina da justificação pela graça de Deus, mediante a fé do homem.",
      },
      { tipo: "subtitulo", texto: '2) Regeneração: "novo nascimento"' },
      {
        tipo: "paragrafo",
        texto:
          'Palingenesia — "novo nascimento" (formado de palin, "de novo", e gênesis, "nascimento"). Tg.1.18; I Pe.1.23; Tt3.5; S.Jo.3.5,6. A "regeneração" é subjetiva (interna), trata da vida interna que corresponde à nossa chamada e que nos faz participantes da natureza divina.',
      },
      {
        tipo: "subtitulo",
        texto: "a) Natureza da Regeneração",
      },
      {
        tipo: "lista",
        itens: [
          'Nascimento — Deus o pai é quem "gerou"; "nascido de Deus" (I S.Jo.5.1), "nascido do Espírito" (S.Jo.3.8), "nascido do alto" (S.Jo.3.3,7).',
          'Purificação — Deus nos salvou pela "lavagem da regeneração" (Tt.3.5)',
          'Vivificação — Somos salvos também pela "renovação do Espírito Santo" (Sl.51.10; Ef.4.23; Rm.12.2)',
          'Criação — É o resultado prático de uma transformação radical na natureza, no caráter, nos desejos e propósitos. (II Cor.5.17)',
          'Ressurreição — João Wesley disse: A "regeneração é a grande mudança que Deus opera na alma quando a vivifica; quando ele a levanta da morte do pecado para a vida de justiça". (Rm.6.4,5; Cl.2.13; 3.1; Ef.2.5,6)',
        ],
      },
      {
        tipo: "subtitulo",
        texto: "b) A Necessidade da Regeneração",
      },
      {
        tipo: "paragrafo",
        texto:
          'Em João três, Jesus não tentou explicar o como do novo nascimento, mas explicou o porquê do novo nascimento. "O que é nascido da carne é carne, e o que é nascido de Espírito é espírito". Carne e espírito pertencem a reinos diferentes, e um não pode produzir o outro. A natureza humana pode gerar a natureza humana, mas somente o Espírito Santo pode gerar a natureza espiritual.',
      },
      {
        tipo: "subtitulo",
        texto: "c) Os Meios de Regeneração",
      },
      {
        tipo: "paragrafo",
        texto:
          "Por ser um ato inteiramente divino e não tendo aparentemente o homem nenhuma participação, estritamente falando, mas o homem pode tomar parte na preparação para esse novo nascimento, se arrependendo e tendo fé. (At 3.19)",
      },
      {
        tipo: "subtitulo",
        texto: "d) Efeitos da Regeneração",
      },
      {
        tipo: "paragrafo",
        texto:
          'Posicionais: Através da "adoção" (huiothesia, formado de huios, filho e thesis, "posição", cognato de tithemi, "pôr"; condições de filho dados àquele a quem não lhe pertencem por natureza"). A palavra "adoção" significa literalmente: "dar a posição de filhos". Literalmente é um termo legal que indica conceder o privilégio de filiação a um que não é membro da família. (Rm 8.15; Gl 4.5; Ef 1.5)',
      },
      {
        tipo: "paragrafo",
        texto:
          "Espirituais: Devido à sua natureza, a regeneração envolve união espiritual com Deus e com Cristo mediante ao Espírito Santo. Essa união resulta em novo tipo de vida e de caráter; novidade de vida (Rm.6.4); um novo coração (Ez.36.26); um novo espírito (Ez.11.19); um novo homem (Ef.4.24); participantes da natureza divina (II Pe.1.4) e templo do Espírito Santo (II Cor.6.16-18).",
      },
      {
        tipo: "paragrafo",
        texto:
          "Práticos: A pessoa nascida de novo demonstrará esse fato pelo ódio que tem do pecado (I S.Jo.3.9; 5.18); por obras de justiça (I S.Jo.2.29); pelo amor fraternal (I S.Jo.4.7) e pela vitória alcançada sobre o mundo (I S.Jo.5.4).",
      },
      { tipo: "subtitulo", texto: "3) Santificação" },
      {
        tipo: "paragrafo",
        texto:
          'Hagiasmos no grego e no hebraico Kadosh é usado para aludir a separação para Deus; "tornar santo" derivado de hagios, "santo", "separado". Hb.12.14; I Tm.2.15; I Ts.4.7; ICor.1.30. Observa-se que "santificação", "santidade" e "consagração" são sinônimos, como o são: "santificados" e "santos". Santificar é a mesma coisa que fazer "santo" ou "consagrar".',
      },
      {
        tipo: "paragrafo",
        texto:
          "A santificação é tanto objetiva (externa) como subjetiva (interna). De modo externo é a separação do pecado e dedicação a Deus; de modo interno é purificação da contaminação do pecado. A santificação é um processo progressivo — uma obra contínua do Espírito Santo na vida do crente.",
      },
      {
        tipo: "lista",
        itens: [
          "A palavra que acompanha a santificação é a separação (separar-se do pecado)",
          "Processar-se e a tornar-se progressivo",
          "Purificação progressiva",
          "Consagração ao serviço de Deus",
        ],
      },
      {
        tipo: "destaque",
        texto:
          "O Espírito Santo é o agente da santificação (II Ts.2.13; I Pe.1.2); a Palavra de Deus é o instrumento (Jo.17.17; I Pe.2.2); a fé é o meio (At.15.9; 26.18); e a obediência é a condição (I Pe.1.14-16).",
      },
      { tipo: "subtitulo", texto: "4) Glorificação" },
      {
        tipo: "paragrafo",
        texto:
          'A glorificação é a consumação da salvação — a completa e final redenção do corpo do crente na volta de Cristo. "E aos que predestinou a estes também chamou; e aos que chamou a estes também justificou; e aos que justificou a estes também glorificou." (Rm.8.30)',
      },
      {
        tipo: "bibliography",
        itens: [
          "Teologia Sistemática — Lewis Sperry Chafer",
          "Dicionário Internacional de Teologia do NT — Colin Brown",
          "Bíblia de Estudo Pentecostal",
          "Biblioteca Digital Libronix",
        ],
      },
    ],
  },

  // ─── 2 ────────────────────────────────────────────────────────────────────
  {
    slug: "biblia-revelacao-de-deus",
    titulo: "Bíblia Revelação de Deus",
    data: "Setembro 2010",
    dataISO: "2010-09",
    resumo:
      "O que é a Bíblia, sua origem, os materiais em que foi escrita, as línguas originais e a autoridade das Escrituras Sagradas como revelação de Deus à humanidade.",
    blocos: [
      { tipo: "titulo", texto: "O que é a Bíblia" },
      {
        tipo: "destaque",
        texto:
          "É a revelação de Deus à humanidade. Seu Autor é o próprio Deus. Seu real intérprete é o Espírito Santo. Seu assunto principal e central é o Senhor Jesus Cristo. A Bíblia é Deus falando ao homem; é Deus falando através do homem; é Deus falando como homem; é Deus falando a favor do homem; mas é sempre Deus falando!",
      },
      {
        tipo: "paragrafo",
        texto:
          "Nossa atitude para com a Bíblia mostra nossa atitude para com Deus. Ignorar a Bíblia é ignorar essa vontade. O homem deve ler a Bíblia para ser sábio, crer na Bíblia para ser salvo e praticar a Bíblia para ser santo ou santificado.",
      },
      {
        tipo: "paragrafo",
        texto:
          "A Bíblia foi uma das maiores ferramentas que Deus deixou para a humanidade, para que através dela o homem viesse a ter o pleno conhecimento da revelação de Deus. Sem ela possivelmente o homem não teria essa plena compreensão da providência de Deus através dos séculos, em expor através de seu Filho Jesus Cristo seu plano sacrificial em resgate de toda essa humanidade.",
      },
      {
        tipo: "paragrafo",
        texto:
          "A Bíblia é um livro muito antigo. É resultado de longa experiência religiosa de um povo. É o registro de várias pessoas, em diversos lugares, em contextos diversos. Foram escritas ao longo de um período de 1600 anos por cerca de 40 homens das mais diversas profissões, origens culturais e classes sociais.",
      },
      { tipo: "titulo", texto: "II – A Origem do Nome 'Bíblia'" },
      {
        tipo: "paragrafo",
        texto:
          "A palavra grega Bíblia, em plural, deriva do grego bíblos ou biblion que significa 'rolo' ou 'livro'. Biblion, no nominativo plural, assume a forma bíblia, significando 'livros'. No latim medieval, bíblia é usada como uma palavra singular — uma coleção de livros ou 'a Bíblia'. Foi Jerônimo, tradutor da Vulgata Latina, que chamou pela primeira vez ao conjunto dos livros do Antigo Testamento e Novo Testamento de 'Biblioteca Divina'. E aplicada primeiramente às Escrituras por João Crisóstomo, grande reformador e patriarca de Constantinopla (398-404).",
      },
      { tipo: "titulo", texto: "III – Materiais Originais da Bíblia" },
      {
        tipo: "paragrafo",
        texto:
          "Os principais materiais foram dois: papiros e pergaminhos. O Papiro Rylands é o fragmento mais antigo encontrado do manuscrito do Evangelho de João, datado aproximadamente de 125 E.C. Escrito em Grego, contém parte do Evangelho segundo João, sendo que na frente contém partes do capítulo 18 e versículos 31-33, e no verso, os versículos 37-38.",
      },
      {
        tipo: "paragrafo",
        texto:
          "O papiro era extraído de uma planta aquática desse mesmo nome. Há várias menções dele na Bíblia: Êxodo 2.3; Jó 8.11; Isaías 18.2; 2 João v.12. De papiro deriva o termo papel. Seu uso na escrita vem de 3.000 a.C., no Egito. A planta Cyperus papyrus, adaptada às margens do Nilo, com uma longa haste, sem nós, com folhas onde mede seis centímetros. O que aparecia acima da terra era, em síntese, uma planta em forma de junco com aproximadamente três metros de altura.",
      },
      {
        tipo: "paragrafo",
        texto:
          "O Pergaminho (do pergaméne e do latim pergamina ou pergamena) é o nome dado a uma pele de animal, geralmente de cabra, carneiro, cordeiro ou ovelha, preparada para nela se escrever. Seu nome deriva do nome da cidade grega onde se terá fabricado pela primeira vez: Pérgamo, na Ásia Menor. Foi largamente utilizado na antiguidade ocidental, em especial na Idade Média. O NT menciona esse material gráfico em 2 Tm 4:13 e Ap 6:14.",
      },
      { tipo: "titulo", texto: "IV – As Línguas da Bíblia" },
      {
        tipo: "paragrafo",
        texto:
          "O Antigo Testamento foi escrito predominantemente em hebraico, com algumas partes em aramaico (Dn 2.4b–7.28; Ed 4.8–6.18; 7.12-26; Jr 10.11; Gn 31.47). O Novo Testamento foi escrito em grego (koiné), a língua comum do mundo mediterrâneo nos primeiros séculos da era cristã.",
      },
      {
        tipo: "paragrafo",
        texto:
          "O hebraico pertence ao grupo das línguas semíticas, assim como o aramaico, o fenício e o acádico. É escrito da direita para a esquerda, e o alfabeto hebraico original não possuía vogais — apenas consoantes. Mais tarde os massoretas passaram a colocar na escrita sinais vocálicos, perpetuando, assim, a pronúncia tradicional. Esses sinais são pontos colocados em cima, em baixo e dentro das consoantes.",
      },
      {
        tipo: "destaque",
        texto:
          "O grego koiné, língua do NT, é o grego popular (koiné = comum) que serviu como língua franca do mundo mediterrâneo helenístico. Diferente do grego clássico ático, o koiné foi a língua em que o evangelho foi proclamado e transmitido ao mundo.",
      },
      {
        tipo: "bibliography",
        itens: [
          "Introdução ao Antigo Testamento — Gleason L. Archer",
          "O Mundo da Bíblia — Merrill F. Unger",
          "Dicionário Bíblico Illustrated — W. A. Elwell",
          "Biblioteca Digital Libronix",
        ],
      },
    ],
  },

  // ─── 3 ────────────────────────────────────────────────────────────────────
  {
    slug: "quando-um-espinho-agrada-a-deus-parte-1",
    titulo: "Quando um Espinho Agrada a Deus — Parte 1",
    data: "Novembro 2010",
    dataISO: "2010-11",
    resumo:
      "Estudo sobre o 'espinho na carne' do apóstolo Paulo (2Co 12.7-10): o que era, por que Deus o permitiu, e como o sofrimento pode ser instrumento de santificação e dependência de Deus.",
    blocos: [
      {
        tipo: "versiculo",
        texto:
          "E, para que não me exaltasse pela excelência das revelações, foi-me dado um espinho na carne, o mensageiro de Satanás, para me esbofetear, para que não me exaltasse demais.",
        referencia: "2Co 12.7",
      },
      { tipo: "titulo", texto: "I – O Contexto do Espinho" },
      {
        tipo: "paragrafo",
        texto:
          "Paulo acabara de descrever a experiência extraordinária de ser arrebatado ao terceiro céu (2Co 12.1-6), onde ouviu palavras inefáveis — αρρητος arrhetos — que significa 'inexprimível, o que não pode ser expressado por causa de sua santidade'. Era de uso comum nas religiões e indicava aquilo que era sagrado demais para ser falado.",
      },
      {
        tipo: "paragrafo",
        texto:
          "Imediatamente após esse relato de exaltação espiritual excepcional, Paulo menciona o espinho. A justaposição não é acidental: quanto maior a revelação, maior o perigo do orgulho. Deus sabia disso, e o espinho foi a providência divina para guardar o apóstolo.",
      },
      { tipo: "titulo", texto: "II – O que Era o Espinho" },
      {
        tipo: "paragrafo",
        texto:
          "O termo 'espinho' no grego é σκόλοψ skolops, que significa literalmente uma estaca, um espinho, uma lasca afiada. Usado metaforicamente para algo que cause dor constante e irritação persistente. Paulo diz que foi 'dado' — passivo divino — indicando que Deus foi o agente último, embora Satanás fosse o instrumento.",
      },
      {
        tipo: "paragrafo",
        texto:
          "A função desse mensageiro ou anjo (αγγελος aggelos) era um mensageiro enviado, para que Paulo não se exaltasse pelas suas excelências das revelações. O espinho na carne de Paulo foi para preveni-lo do pecado de orgulho.",
      },
      {
        tipo: "destaque",
        texto:
          "Observa-se que o texto não explica qual era a natureza do espinho. Isso é proposital — a experiência do sofrimento como instrumento de santificação é universal, e o apóstolo descreve o princípio, não o diagnóstico.",
      },
      { tipo: "titulo", texto: "III – As Implicações do Espinho" },
      {
        tipo: "paragrafo",
        texto:
          "Três vezes Paulo orou ao Senhor para que o espinho fosse removido (vr.8). A resposta de Deus foi definitiva: 'A minha graça te basta, porque o meu poder se aperfeiçoa na fraqueza.' Deus não removeu o espinho; Ele revelou o propósito do espinho.",
      },
      {
        tipo: "lista",
        itens: [
          "O espinho guardava Paulo do pecado da soberba — o mais perigoso dos pecados espirituais",
          "O espinho ensinava Paulo a depender exclusivamente de Deus",
          "O espinho revelava que o poder de Deus se aperfeiçoa na fraqueza humana",
          "O espinho tornava Paulo um ministério mais autêntico — sofrimento vivido, não apenas pregado",
        ],
      },
      {
        tipo: "versiculo",
        texto:
          "De boa vontade, pois, me gloriarei nas minhas fraquezas, para que em mim habite o poder de Cristo. Por isso, tenho prazer nas fraquezas, nos insultos, nas necessidades, nas perseguições, nas angústias por amor de Cristo. Porque quando sou fraco, então, é que sou forte.",
        referencia: "2Co 12.9b-10",
      },
      {
        tipo: "bibliography",
        itens: [
          "O Espinho na Carne — F. F. Bruce",
          "Comentário de 2 Coríntios — Philip E. Hughes",
          "Bíblia de Estudo Pentecostal",
          "Biblioteca Digital Libronix",
        ],
      },
    ],
  },

  // ─── 4 ────────────────────────────────────────────────────────────────────
  {
    slug: "quando-um-espinho-agrada-a-deus-parte-2",
    titulo: "Quando um Espinho Agrada a Deus — Parte 2",
    data: "Novembro 2010",
    dataISO: "2010-11",
    resumo:
      "Continuação do estudo sobre o espinho na carne de Paulo: as quatro razões pelas quais Deus permitiu esse sofrimento — orgulho, humildade, dependência e testemunho.",
    blocos: [
      {
        tipo: "versiculo",
        texto:
          "Sacrifício e oferta não quiseste; os meus ouvidos abriste; holocausto e expiação pelo pecado não reclamaste.",
        referencia: "Sl 40.6",
      },
      {
        tipo: "paragrafo",
        texto:
          "Há quatro razões existentes e significativas que têm como objetivo e propósitos na vida de cada crente sincero, ainda que causem aflições (θλιψις thlipsis — no grego clássico significa pressão, opressão; derivado de θλιβω thlibo que tem sentido geral de afligir, pressionar, esmagar, apertar, aborrecer, angustiar).",
      },
      { tipo: "titulo", texto: "1ª Razão: Orgulho" },
      {
        tipo: "paragrafo",
        texto:
          'O vr. 7 diz: "para que me não exaltasse pelas excelências das revelações". O texto grego diz καὶ τῇ ὑπερβολῇ τῶν ἀποκαλύψεων — ou seja, extraordinária grandeza, excesso, superabundância. υπεραιρομαι huperairomai está na voz média: levantar ou construir sobre algo, levantar-se, ser exaltado, ser arrogante, comportar-se insolentemente.',
      },
      {
        tipo: "paragrafo",
        texto:
          "A soberba é um princípio satânico. O pecado não começou com um ato exterior, mas com uma decisão interior no coração. Cinco vezes Satanás disse em seu coração: 'Eu subirei..., exaltarei..., me assentarei..., subirei..., serei...' Is14.13. Essas afirmações mostram a essência do pecado: a reivindicação do direito da criatura na autodeterminação, independência de Deus, ou autonomia pessoal.",
      },
      {
        tipo: "destaque",
        texto:
          "O primeiro dos pecados mortais é o orgulho. O orgulho espiritual leva a pessoa a confiar mais em seus méritos e virtudes próprias do que na graça de Deus. Deus abomina o orgulho espiritual pelo fato de o orgulho pensar ser bom e justo aos seus próprios olhos.",
      },
      {
        tipo: "versiculo",
        texto: "Deus resiste aos soberbos; dá, porém, graça aos humildes.",
        referencia: "Tg 4.6",
      },
      { tipo: "titulo", texto: "2ª Razão: Humildade" },
      {
        tipo: "paragrafo",
        texto:
          "A humildade é uma virtude que deve ser cultivada. Esta palavra no Novo Testamento — ταπεινος tapeinos — significa primeiramente 'abaixado'; 'trazido para baixo'; 'trazer para terra', humilde. Do latim húmus — terra; conscientizar das nossas fraquezas e das nossas dependências, nos fazer saber que somos pó, terra, em outras palavras, não somos nada.",
      },
      {
        tipo: "paragrafo",
        texto:
          "Jesus no Sermão do Monte contradisse todos os juízes e todas as expectativas nacionalistas a cerca do reino de Deus: 'Bem-aventurados os humildes de espírito, porque deles é o reino dos céus.' Jesus mostra que a verdadeira felicidade é concedida ao pobre, não ao rico; ao frágil, não ao poderoso; ao humilde e não ao soberbo. Paulo na descrição da Obra de Cristo disse: 'que, sendo em forma de Deus, não teve por usurpação ser igual a Deus. Mas aniquilou-se a si mesmo, tornando a forma de servo, fazendo-se semelhante aos homens; e, achado na forma de homem, humilhou-se a si mesmo, sendo obediente até a morte e morte de cruz.'",
      },
      { tipo: "titulo", texto: "3ª Razão: Dependência" },
      {
        tipo: "paragrafo",
        texto:
          "Aquela situação produzia em Paulo uma dependência de Deus, constante e consciente. Paulo sabia que não podia realizar coisa alguma sozinho; tinha mesmo que depender de Deus. Descobriu que seu sofrimento o resguardou do orgulho, deixou-o mais humilde e mostrou-lhe que Deus era suficiente, fazendo-o dependente Dele.",
      },
      {
        tipo: "paragrafo",
        texto:
          'O texto é bem claro: o anjo veio "para me esbofetear" (Vr. 7). A palavra esbofetear no gr. κολαφιζω kolaphizo significa dar bofetada após bofetada, dar punhadas, bater ou dar em alguém soco com o punho fechado, maltratar, tratar com violência e ofensa.',
      },
      { tipo: "titulo", texto: "4ª Razão: Testemunho" },
      {
        tipo: "paragrafo",
        texto:
          "Alguma situação Deus permitiu que algumas pessoas passassem por sua vontade preceptiva — aquela que ele lança preceitos e cabe ao homem executar ou não. Ele estabelece os preceitos e espera de nós uma atitude coerente.",
      },
      {
        tipo: "paragrafo",
        texto:
          "A Israel, Deus 'tentou' no deserto (Dt 8.2). À Abraão, da mesma forma, o provou, נסה nacah (nassaion) — pôr à prova, testar, tentar. O sentido predominante é provar uma pessoa. A prova visa ao testemunho: que o poder não é do homem, mas de Deus.",
      },
      {
        tipo: "versiculo",
        texto:
          "Pois quando sou fraco, então sou forte. De boa vontade, pois, me gloriarei nas minhas fraquezas, para que em mim habite o poder de Cristo.",
        referencia: "2Co 12.10b; 9b",
      },
      {
        tipo: "bibliography",
        itens: [
          "Ele Humilhou-se a Si mesmo — Kenneth C. Fleming",
          "Bíblia de Estudo Pentecostal",
          "Biblioteca Digital Libronix",
        ],
      },
    ],
  },

  // ─── 5 ────────────────────────────────────────────────────────────────────
  {
    slug: "as-mulheres-que-revolucionaram-uma-epoca",
    titulo: "As Mulheres que Revolucionaram uma Época",
    data: "Dezembro 2010",
    dataISO: "2010-12",
    resumo:
      "Estudo sobre as filhas de Zelofeade (Nm 27.1-11) que desafiaram a legislação hebraica e obtiveram o direito de herança para mulheres, mudando a história de Israel.",
    blocos: [
      {
        tipo: "versiculo",
        texto:
          "E chegaram as filhas de Zelofeade, filho de Héfer, filho de Gileade, filho de Maquir, filho de Manassés, entre as famílias de Manassés, filho de José (e estes são os nomes de suas filhas: Macla, Noa, Hogla, Milca e Tirza).",
        referencia: "Nm 27.1",
      },
      { tipo: "titulo", texto: "I – O Contexto Histórico" },
      {
        tipo: "paragrafo",
        texto:
          "Bem na época das peregrinações no deserto, no tempo do grande legislador e profeta Moisés, no tempo do segundo censo da nação requerido por Deus, 1406 a.C., houve um acontecimento, uma revolução, uma alteração na legislação de Israel que está marcada até os dias de hoje.",
      },
      {
        tipo: "paragrafo",
        texto:
          "Na lei hebraica-judaica antiga, só se era concedido aos filhos o direito à herança. Ou seja, a lei de Israel prescrevia que a herança do pai era dos filhos homens, na hierarquia dos primogênitos; as filhas mulheres não tinham direito à herança.",
      },
      {
        tipo: "paragrafo",
        texto:
          "Zelofeade (Ts^elophchad — 'primogênito') falece sem deixar herdeiro filho homem, somente filhas. Estas, por sua vez, mesmo sabendo da lei regida em Israel sobre herdades e heranças, foram reclamar o direito de sua herança: 'Porque se tiraria o nome de nosso pai do meio de sua família, por quanto não teve filhos? Dá-nos possessão entre os irmãos de nosso pai.'",
      },
      { tipo: "titulo", texto: "II – Os Nomes e seus Significados" },
      {
        tipo: "lista",
        itens: [
          "Macla (Machlah) = 'doença' — a 1ª filha, a mais velha. Procedente de chalah = ser ou tornar-se fraco, estar aflito ou triste.",
          "Noa (No'ah) = não está relacionado com o patriarca Noé. Nome feminino de raiz diferente.",
          "Hogla (Choglah) = 'perdiz' — 3ª filha. No popular, perdiz indica 'perda ou prejuízo'; na gíria, condições insuficientes para cobrir despesas.",
          "Milca (Milkah) = 'rainha' — procedente de malak = ser ou tornar-se rei ou rainha, reinar.",
          "Tirza (Tirtsah) = 'favorável' — procedente de ratsah = estar contente com, aceitar favoravelmente.",
        ],
      },
      {
        tipo: "paragrafo",
        texto:
          "A sequência dos nomes das filhas de Zelofeade — doença, perda, rainha, favorável — narra em síntese a jornada: da aflição à realeza, da carência ao favor. É o arco narrativo de quem vai reclamar um direito justo diante de Deus.",
      },
      { tipo: "titulo", texto: "III – A Peregrinação pelos Tribunais" },
      {
        tipo: "paragrafo",
        texto:
          "As filhas de Zelofeade tinham previamente levado o caso para todos os tribunais inferiores: primeiro aos capitães de dezenas, que se recusaram a resolver; depois aos de cinquenta, e depois aos de centenas. Todas as autoridades não podiam ajudá-las — até que chegaram a Moisés.",
      },
      {
        tipo: "paragrafo",
        texto:
          "Moisés, com um profundo conhecimento dos sentimentos humanos, não queria ferir a sensibilidade dos capitães consultados. Respondeu às filhas: 'Eu também me recuso pronunciar-me a respeito; existe um juiz mais eminente do que eu.' E levou o caso diante do Eterno.",
      },
      { tipo: "titulo", texto: "IV – A Decisão Divina" },
      {
        tipo: "paragrafo",
        texto:
          "A resposta de Deus foi revolucionária: as filhas de Zelofeade tinham razão. A lei foi alterada para incluir as filhas no direito de herança, quando não houvesse filho homem. Mais do que uma decisão jurídica, foi um pronunciamento de Deus sobre a dignidade e os direitos da mulher na comunidade de Israel.",
      },
      {
        tipo: "destaque",
        texto:
          "O pedido delas era nada mais nada menos que se alterasse a lei. E Deus não hesitou: as filhas de Zelofeade falaram certo. Cinco mulheres corajosas mudaram a legislação de um povo inteiro — e sua história está registrada para sempre nas Escrituras.",
      },
      {
        tipo: "bibliography",
        itens: [
          "Comentário do Antigo Testamento — Keil e Delitzsch",
          "A Torah — Vaycrá — Marcelo Miranda Guimarães",
          "Bíblia de Estudo Pentecostal",
          "Biblioteca Digital Libronix",
        ],
      },
    ],
  },

  // ─── 6 ────────────────────────────────────────────────────────────────────
  {
    slug: "lucifer-em-isaias-14-12-17",
    titulo: "\"Lúcifer\" em Isaías 14:12-17",
    data: "Janeiro 2011",
    dataISO: "2011-01",
    resumo:
      "Estudo exegético sobre o uso do nome 'Lúcifer' em Isaías 14, sua origem no latim, o contexto histórico e literário do oráculo contra a Babilônia, e a identificação equivocada com Satanás.",
    blocos: [
      {
        tipo: "paragrafo",
        texto:
          "O nome Lúcifer tem sido muitas vezes entendido como outro nome para o diabo ou Satanás. Esta identificação tem uma longa história na Igreja, que remonta a pelo menos o quarto século. Sua origem é de uma passagem do Antigo Testamento do livro de Isaías que, para alguns, fala de um ser expulso do céu por causa do orgulho.",
      },
      { tipo: "titulo", texto: "I – A Passagem de Isaías 14" },
      {
        tipo: "versiculo",
        texto:
          "Como caíste do céu, ó estrela da manhã, filha da alva! Como foste lançado por terra, tu que debilitavas as nações! E tu dizias no teu coração: Eu subirei ao céu, e, acima das estrelas de Deus, exaltarei o meu trono... Subirei acima das mais altas nuvens e serei semelhante ao Altíssimo.",
        referencia: "Is 14.12-14 (ARC)",
      },
      { tipo: "titulo", texto: "II – A Origem do Nome 'Lúcifer'" },
      {
        tipo: "paragrafo",
        texto:
          "O termo Lúcifer foi popularizado em inglês pela tradução do Rei James. No entanto, o nome não vem do hebraico, ou mesmo da tradução grega (Septuaginta), mas do século IV d.C. da tradução latina: quomodo cecidisti de caelo lucifer qui mane oriebaris corruisti in terram qui vulnerabas gentes.",
      },
      {
        tipo: "paragrafo",
        texto:
          "No latim era um nome para Vênus, especialmente para a 'estrela da manhã'. A palavra latina Lúcifer é composta por duas palavras: lux, ou sob a forma genitiva lucis (que significa 'luz') e ferre, o que significa 'suportar' ou 'levar'. Assim, a palavra Lúcifer significa portador da luz.",
      },
      { tipo: "titulo", texto: "III – O Hebraico Original" },
      {
        tipo: "paragrafo",
        texto:
          "Há algum debate sobre a origem exata da palavra original em hebraico de Isaías 14:12 — הֵילֵל (heylel). A possibilidade mais forte é que ele vem de uma raiz verbal הלל (halal) que significa 'brilham' (Jó 29:3), bem como 'de louvar' (onde temos a frase halelu-yah). Em qualquer caso, a forma nominal é o termo hebraico para a estrela da manhã, na maioria dos casos, o planeta Vênus.",
      },
      {
        tipo: "destaque",
        texto:
          "Tanto a tradução grega do século II a.C., na Septuaginta (ἑωσφόρος ὁ πρωὶ ἀνατέλλων), como no quarto século d.C. a tradução latina da Vulgata (lucifer qui mane oriebaris) dão a entender que este é o significado da palavra hebraica heylel — simplesmente 'estrela da manhã'.",
      },
      { tipo: "titulo", texto: "IV – O Contexto do Oráculo" },
      {
        tipo: "paragrafo",
        texto:
          "Isaías 13 faz parte do oráculo contra Babilônia, provavelmente de um tempo após o Exílio. Em linguagem muito floreada, poética e figurativa, a Babilônia é denunciada por sua arrogância e falta de preocupação com outras nações ao construir o seu império.",
      },
      {
        tipo: "paragrafo",
        texto:
          "Aqui, o rei da Babilônia é comparado com a estrela da manhã, filho da alva — astro que os cananeus consideravam como um deus que desejava colocar-se acima dos demais deuses (v.13). Com essa figura, o autor ridiculariza o orgulho e a arrogância do rei da Babilônia, insinuando que também ele deverá cair como aquele deus pagão.",
      },
      { tipo: "titulo", texto: "V – Conclusão" },
      {
        tipo: "paragrafo",
        texto:
          "Assim, a passagem de Isaías não liga, quer historicamente ou teologicamente, com as passagens do NT sobre o diabo ou Satanás. Ao ouvir a passagem do AT em seus próprios termos do seu próprio contexto, descobrimos que Lúcifer não é um nome do Velho Testamento para o diabo ou Satanás. A passagem em Isaías 14:12-17 é dirigida contra a queda dos governantes babilônicos arrogantes que levaram Israel para o exílio.",
      },
      {
        tipo: "bibliography",
        itens: [
          "99 perguntas sobre Anjos, Demônios e Batalha Espiritual — B.J. Oropeza",
          "Apócrifos e Pseudo-epígrafos da Bíblia — Fonte Editorial",
          "Dicionário Grego-Português — Isidro Pereira, S.J.",
          "Dicionário Latino-Português — José Cretella Júnior",
          "Biblioteca Digital Libronix / BibleWorks",
        ],
      },
    ],
  },

  // ─── 7 ────────────────────────────────────────────────────────────────────
  {
    slug: "koinonia-x-pleonexia",
    titulo: "Koinõnia x Pleonexia",
    data: "Janeiro 2011",
    dataISO: "2011-01",
    resumo:
      "Estudo contrastante entre koinōnia (comunhão, partilha generosa) e pleonexia (ganância arrogante), dois conceitos gregos que revelam posturas opostas diante do próximo e de Deus.",
    blocos: [
      { tipo: "titulo", texto: "I – Pleonexia: A Ganância Arrogante" },
      {
        tipo: "paragrafo",
        texto:
          "Pleonexia, às vezes chamado pleonexy, provém da língua grega πλεονεξια e é um conceito filosófico empregado tanto no Novo Testamento como nos escritos de Platão e Aristóteles. Ele corresponde aproximadamente à ganância, à avareza, que é rigorosamente definida como 'o desejo insaciável de ter o que por direito pertence aos outros'. Descreve-se como 'cruel egoísmo e uma suposição arrogante de que os outros e as coisas existem para benefício próprio'.",
      },
      {
        tipo: "paragrafo",
        texto:
          "A ideia etimológica de pleonexia está em pleon, que significa 'mais', 'ter mais'. A avareza é uma palavra que sugere ainda outro sentido em pleonekteo πλεονεκτεω que significa 'tirar vantagem, lesar, defraudar ou enganar, alguém ansioso para ter mais'. Vários textos bíblicos ilustram esses significados (2 Co 7.2; 12.17,18; 1Ts 4.6).",
      },
      {
        tipo: "destaque",
        texto:
          "William Barclay diz que pleonexia descreve 'um amor maldito de ter', que 'vai prosseguir os seus próprios interesses, com total desrespeito pelos direitos dos outros, e até mesmo para as considerações de humanidade comum'.",
      },
      { tipo: "titulo", texto: "II – Koinõnia: A Partilha Generosa" },
      {
        tipo: "paragrafo",
        texto:
          "Koinonia é um termo grego (κοινωνία) que significa comunhão, participação íntima. A palavra é usada frequentemente no Novo Testamento para descrever a relação dentro dos primeiros cristãos da Igreja. Koinõnia significa 'um participante', compartilhar uns com os outros em uma propriedade em comum.",
      },
      {
        tipo: "paragrafo",
        texto:
          "Implica o espírito de partilha generosa ou o ato de dar, em contraste com o egoísmo (pleonexia) de receber. Quando koinonia está presente, o espírito de partilha e de dar torna-se palpável. Na maioria dos contextos, a generosidade não é um ideal abstrato, mas uma ação demonstrável, resultando em uma expressão concreta e realista de dar.",
      },
      { tipo: "titulo", texto: "III – As Cinco Diferenças" },
      {
        tipo: "lista",
        itens: [
          "Koinõnia significa 'compartilhar de amizade', é uma permanência no convívio dos outros (At.2:42). Pleonexia é o homem cujo único desejo é obter e que nunca sequer pensa em dar, egoísta (Lc.12:15).",
          "Koinõnia significa 'uma divisão prática' com os que são menos afortunados. A comunhão cristã é uma coisa prática (Rm.15:26; II Cor.8:4). Pleonexia descreve o pecado do homem que usa sua posição por vantagem própria (I Ts.2:5; II Pe.2:3).",
          "Koinõnia significa 'uma cooperação na obra de Cristo' (Fp.1:5). Pleonexia em Cl.3:5 é identificada com a idolatria — é a adoração aos objetos em lugar de Deus.",
          "Koinõnia significa 'um membro no convívio da fé' (Ef.3:9). Pleonexia é o pecado do mundo sem Deus (Rm.1:29) — o homem virou as costas às leis de Deus.",
          "Koinõnia significa 'viver na comunhão, na presença, no convívio, na ajuda e na orientação do Espírito' (Fp.2:1; II Cor.13:14). Pleonexia é o desejo de ter aquilo que é proibido, ligado ao pecado sexual (Mc.7.22; Rm.1.29; Ef.4.19).",
        ],
      },
      {
        tipo: "citacao",
        texto:
          "A disposição que sempre está a sacrificar o próximo em lugar de si mesmo em todas as coisas.",
        referencia: "Lightfoot, sobre Pleonexia (Rm 1.29)",
      },
      {
        tipo: "bibliography",
        itens: [
          "Elienai Cabral — Mordomia Cristã, pg.128",
          "William Barclay — Palavras do Novo Testamento, pg.166",
          "Biblioteca Digital Libronix",
        ],
      },
    ],
  },

  // ─── 8 ────────────────────────────────────────────────────────────────────
  {
    slug: "agape-o-amor-incondicional",
    titulo: "Ágape — O Amor Incondicional",
    data: "Janeiro 2011",
    dataISO: "2011-01",
    resumo:
      "Estudo sobre os tipos de amor no grego (eros, storgē, philia, agapē) e no latim, com foco no ágape como amor divino incondicional que transcende sentimento e se expressa em atitude e comportamento.",
    blocos: [
      {
        tipo: "paragrafo",
        texto:
          "Fala-se do amor das mais diversas formas: amor físico, amor platônico, amor materno, amor a Deus, amor à vida. O conceito mais popular de amor envolve, de modo geral, a formação de um vínculo emocional com alguém. As muitas dificuldades que essa diversidade de termos oferece ocorrem não só nos idiomas modernos, mas também no grego e no latim.",
      },
      { tipo: "titulo", texto: "I – Os Tipos de Amor no Grego" },
      {
        tipo: "subtitulo",
        texto: "1. Amor Físico — ἐπιθυμία (epithumia)",
      },
      {
        tipo: "paragrafo",
        texto:
          "Desejo, anelo, anseio, desejo pelo que é proibido, luxúria. Vem de epithumeō que significa 'girar em torno de algo'. Vem precedida da preposição epi (em cima de, perto de, através de) em junção com thumos — paixão, raiva, fúria. Quando usada no sentido negativo é traduzido como lascívia. Quando usado no sentido positivo é traduzido como desejo.",
      },
      {
        tipo: "subtitulo",
        texto: "2. Amor Emocional — ἔρως (érōs)",
      },
      {
        tipo: "paragrafo",
        texto:
          "É o amor atrativo, instinto, espontâneo, paixão popular romântico. Sua origem é no instinto sexual. Aristóteles diz que érōs sempre começa com o prazer dos olhos. O amor gr. érōs não é pecaminoso e nem diabólico em si mesmo. Mas quando reina sozinho torna-se egoísta e interesseiro.",
      },
      {
        tipo: "subtitulo",
        texto: "3. Amor Afetivo — στοργή (storgē)",
      },
      {
        tipo: "paragrafo",
        texto:
          "Amor afetivo, amor romântico, amor familiar, amor conjugal, amor doméstico. Este amor envolve reciprocidade. É objetivo, pois une almas. Exige-se disciplina, lealdade entre os dois que amam. O amor storgē é gradativo, paulatino — vai crescendo aos poucos. É totalmente oposto do amor érōs que é repentino, sem expectativa.",
      },
      {
        tipo: "subtitulo",
        texto: "4. Amor Fraternal — φιλία (philía)",
      },
      {
        tipo: "paragrafo",
        texto:
          "Amor fraternal, filantrópico (de philéo), amor ao próximo, generoso, social, patriótico, cívico. Philía descreve um relacionamento caloroso, íntimo e terno do corpo, mente e espírito. Inclui o lado físico do amor, pois o verbo philein pode significar beijar ou acariciar. Mas philía, como todas as coisas humanas, pode alterar-se, pode diminuir e seu calor esfriar.",
      },
      { tipo: "titulo", texto: "II – O Amor Incondicional: ἀγάπη (agapē)" },
      {
        tipo: "paragrafo",
        texto:
          'Amor Incondicional Gr. "ἀγάπη agapē" — desenvolve este aspecto, pois é independente de qualquer reciprocidade. O amor divino procede do coração de Deus: é amor eterno, imutável, incomparável, perfeito. Deus é a perfeição desse amor. Esse amor não implica em um sentimento como nos demais, mas sim numa atitude e comportamento diferenciado.',
      },
      {
        tipo: "destaque",
        texto:
          "O amor agapē é o espírito no coração que nunca procurará outra coisa senão o sumo bem do seu próximo. Não se importa com o tratamento que recebe do seu próximo, nem com a natureza dele; nunca procurará outra coisa a não ser o sumo bem do próximo, o melhor para ele.",
      },
      {
        tipo: "citacao",
        texto:
          "Ele ama a todos como se houvesse uma só pessoa para Ele amar; o amor cristão deve modelar-se no amor de Deus.",
        referencia: "Agostinho de Hipona",
      },
      {
        tipo: "bibliography",
        itens: [
          "William Barclay — As Obras da Carne e o Fruto do Espírito",
          "Masters e Johnson — O Relacionamento Amoroso",
          "Sergio e Magali Leoto — Casamento para Crescer",
          "Winkie A. Pratney — A Natureza e o Caráter de Deus",
        ],
      },
    ],
  },

  // ─── 9 ────────────────────────────────────────────────────────────────────
  {
    slug: "a-mulher-virtuosa",
    titulo: "A Mulher Virtuosa",
    data: "Janeiro 2011",
    dataISO: "2011-01",
    resumo:
      "Exegese de Provérbios 31.10 sobre a mulher virtuosa: análise do hebraico, o valor do rubi e do diamante como metáforas, e o caráter como fundamento da beleza verdadeira.",
    blocos: [
      {
        tipo: "destaque",
        texto:
          "אֵשֶׁת־חַיִל מִי יִמְצָא וְרָחֹק מִפְּנִינִים מִכְרָהּ — Mulher virtuosa, quem a achará? O seu valor muito excede o de rubins.",
      },
      { tipo: "versiculo", texto: "Mulher virtuosa, quem a achará? O seu valor muito excede o de rubins.", referencia: "Pv 31.10 (ARC)" },
      { tipo: "titulo", texto: "I – O Livro de Provérbios" },
      {
        tipo: "paragrafo",
        texto:
          "O Livro de Provérbios pertence ao grupo dos que são denominados genericamente 'poéticos e sapienciais'. Ele é composto por uma série de coleções que, em forma de máximas, refrões, ditos e poemas, transmitem a antiga herança de sabedoria de Israel. Além de Salomão, são citados como autores ou compiladores: Agur, filho de Jaque (30.1), e o rei Lemuel (31.1), ambos oriundos da tribo de Massá.",
      },
      {
        tipo: "paragrafo",
        texto:
          "Provérbio é denominado de mashal מָשָׁל em hebraico, palavra aparentada com uma raiz que inclui o sentido de 'dominar', 'reger', 'governar', 'ter domínio', 'reinar'. Essa ideia tipifica um autêntico mashal como uma expressão persuasiva e estimulante — uma máxima moral que avalia e compara diversas condutas e atitudes diante da vida.",
      },
      { tipo: "titulo", texto: "II – A Qualidade e o Valor" },
      {
        tipo: "paragrafo",
        texto:
          "O rei Lemuel recebe instruções de sua mãe para buscar uma mulher virtuosa, colocada num patamar de valor inestimável. Este versículo nos apresenta duas coisas: a qualidade e o valor. Esta mulher tem qualidade e também tem valor. A sua qualidade é a virtude; seu valor excede o de rubis (ARC).",
      },
      {
        tipo: "paragrafo",
        texto:
          "O termo hebraico para virtuosa — רָחֹק rachôq — vem de uma raiz primitiva que significa: estar ou vir a estar longe, estar ou vir a estar distante. Mostrando seu valor raro e inestimável. Virtude: disposição constante de praticar o bem e evitar o mal, qualidade própria para produzir certos efeitos. Virtuosa é austeridade no viver, eficácia, força, vigor.",
      },
      { tipo: "titulo", texto: "III – O Rubi e o Diamante" },
      {
        tipo: "paragrafo",
        texto:
          "Rubi é uma pedra preciosa vermelha que faz parte de uma variedade do mineral coríndon (óxido de alumínio). Na escala de Mohs, representa valor 9 em dureza — das mais resistentes entre as gemas naturais. Os rubis naturais são excepcionalmente raros: quanto menores as imperfeições, mais caro é o rubi.",
      },
      {
        tipo: "paragrafo",
        texto:
          "Observe que essa mulher não é comparada ao rubi: seu valor excede, ultrapassa. Ela é comparada à mais rara e preciosa joia — o diamante. O rubi tem dureza 9 na escala de Mohs, e entre as gemas naturais somente é ultrapassado pelo diamante em termos de dureza. O diamante é uma forma alotrópica do carbono: a mais dura substância natural conhecida.",
      },
      {
        tipo: "destaque",
        texto:
          "Em nossa sociedade, onde a beleza física é exaltada, a descrição da mulher virtuosa é um poema acróstico que exalta a honra e a dignidade da mulher — não a aparência. A causa de ser atraente é exclusivamente atribuída ao caráter dela. O curioso é a desvalorização da beleza física, mas o enaltecimento das qualidades morais.",
      },
      {
        tipo: "paragrafo",
        texto:
          "Dessa mulher se menciona 'as mãos', 'as palavras', 'o braço', 'sua atividade' — aquela que dirige tudo com sensibilidade, competência e criatividade. Ela representa no pensamento a mais pura joia e beleza, com características imprescindíveis: ao mesmo tempo com a pequenez de um grafite (frágil), mas preciosa, bela, resistente como um diamante.",
      },
      {
        tipo: "bibliography",
        itens: [
          "Bíblia de Estudo Aplicação Pessoal",
          "Bíblia King James de 1611",
          "Bíblia Nova Versão Internacional",
          "Biblioteca Digital Libronix",
        ],
      },
    ],
  },

  // ─── 10 ───────────────────────────────────────────────────────────────────
  {
    slug: "o-servo-da-orelha-furada",
    titulo: "O Servo da Orelha Furada",
    data: "Junho 2011",
    dataISO: "2011-06",
    resumo:
      "Estudo sobre a lei hebraica do servo voluntário (Ex 21.1-6; Dt 15.12-18) e sua aplicação espiritual ao servo que escolhe permanecer com seu Senhor por amor, com base em Salmo 40.6.",
    blocos: [
      {
        tipo: "versiculo",
        texto:
          "Sacrifício e oferta não quiseste; os meus ouvidos abriste; holocausto e expiação pelo pecado não reclamaste.",
        referencia: "Sl 40.6",
      },
      {
        tipo: "paragrafo",
        texto:
          "Davi escreveu este salmo baseado numa de suas experiências de rejeição, provavelmente quando seu filho Absalão rebelou-se e furtou os corações das pessoas (IISm 15.6). Davi clama ao Senhor numa oração em que pede livramento. No versículo seis, Davi faz uma referência à lei hebraica concernente ao servo.",
      },
      { tipo: "titulo", texto: "I – A Lei do Servo Hebreu" },
      {
        tipo: "paragrafo",
        texto:
          "A lei concernente ao serviço hebreu é explanada duas vezes nas Escrituras (Ex.21.1-6; Dt.15.12-18). Israel era uma nação agrícola. Na economia agrária, os pequenos proprietários de terras às vezes faliam. O proprietário, em vez de vender sua pequena propriedade, oferecia-se como servo para algum fazendeiro.",
      },
      {
        tipo: "paragrafo",
        texto:
          "Não se tratava de um acordo perpétuo, mas com duração de seis anos apenas. No sétimo ano esse servo devia ser libertado. Ele só devia levar consigo a esposa e os filhos adquiridos durante a servidão. Neste período o contrato terminava, e ele voltaria provido de mercadoria para reiniciar sua vida.",
      },
      { tipo: "titulo", texto: "II – A Escolha de Permanecer" },
      {
        tipo: "paragrafo",
        texto:
          "Quando esse servo ou escravo resolvia não abandonar seu senhor e optava em continuar servi-lo, a fim de oficializar esse ato e servi-lo perpetuamente, teria que participar de uma pequena cerimônia prescrita para a ocasião.",
      },
      {
        tipo: "versiculo",
        texto:
          "Eu amo meu senhor, e minha mulher, e meus filhos; não quero sair forro.",
        referencia: "Ex 21.5",
      },
      {
        tipo: "paragrafo",
        texto:
          "Em seguida era levado à porta de madeira e sua orelha era furada com um sovelo — um instrumento de ferro ou de aço em forma de haste, cortante e pontiagudo — deixando uma cicatriz permanente, ou seja, uma marca de servidão. A partir de então ele não devia retroceder; devia servir seu senhor pelo resto da vida.",
      },
      { tipo: "titulo", texto: "III – A Aplicação Espiritual" },
      {
        tipo: "destaque",
        texto:
          "Aqui especificamente, Davi declara sua devoção a Deus, sendo servo obediente. Ele observa que Deus não está interessado na faceta cerimonial dos sacrifícios. Os sacrifícios legais de animais eram apenas figuras do único sacrifício legal e verdadeiro pelo pecado — Jesus.",
      },
      {
        tipo: "paragrafo",
        texto:
          "'As minhas orelhas furastes' (Sl.40.6) — é a declaração de servo que escolheu livremente servir seu Senhor não por obrigação contratual, mas por amor. O servo de orelha furada é aquele que, tendo tido a oportunidade de partir, preferiu ficar. É o retrato do discipulado voluntário, da entrega radical motivada por amor, não por medo.",
      },
      {
        tipo: "bibliography",
        itens: ["Ele Humilhou-se a Si mesmo — Kenneth C. Fleming"],
      },
    ],
  },

  // ─── 11 ───────────────────────────────────────────────────────────────────
  {
    slug: "pregadores-ou-clones",
    titulo: "Pregadores ou Clones?",
    data: "Junho 2011",
    dataISO: "2011-06",
    resumo:
      "Reflexão sobre a identidade do pregador cristão: o perigo da imitação superficial de outros ministros, a chamada ao discipulado autêntico e ao desenvolvimento do caráter próprio no ministério.",
    blocos: [
      {
        tipo: "paragrafo",
        texto:
          "No decorrer da história, homens como Jerônimo Savonarola, Martinho Lutero, João Wesley, Carlos Finney, Hudson Taylor, Spurgeon, Dwight Moody e tantos outros foram grandes vultos humanos, homens ilustres em valor, valentes, fiéis, vencedores, desbravadores. A vida desses homens nos inspira e continua nos inspirando com seus sermões ardentes e empolgantes, bem como suas histórias.",
      },
      {
        tipo: "paragrafo",
        texto:
          "Mas infelizmente o que se tem percebido é clones. Pregadores que perderam totalmente sua identidade, imitando no vestir, no falar, no gesticular, até mesmo na oração, os grandes do passado e do presente.",
      },
      { tipo: "titulo", texto: "I – O Custo do Chamado" },
      {
        tipo: "paragrafo",
        texto:
          "Aos que receberam do Senhor esse chamado, devem estar cientes dos fatos, principalmente da renúncia que ele exige de cada um. Jesus certa vez se dirigiu a pessoas que queriam segui-Lo. Ao primeiro disse: 'As raposas têm covis, e as aves, ninhos, mas o Filho do Homem não tem onde reclinar a cabeça.' Ao segundo: 'Deixa aos mortos o enterrar os seus mortos.' Ao terceiro: 'Ninguém que lança mão do arado e olha para trás é apto para o Reino de Deus.'",
      },
      { tipo: "titulo", texto: "II – Modelos Bíblicos de Obreiro Fiel" },
      {
        tipo: "lista",
        itens: [
          "Eliezer — Humildade (Gn.24:2,34)",
          "Moisés — Fidelidade (Nm.12:7)",
          "Samuel — Santidade (I Sm.12:2-5)",
          "Daniel — Integridade (Dn.6:4)",
          "Barnabé — Espiritualidade (At.11:24)",
          "Paulo — Fidelidade (II Tm.4:7)",
          "Tíquico — Fidedignidade (Cl.4:7,8)",
          "Epafras — Servo fiel (Cl.1:7; Fm.23)",
          "Demétrios — Vida irrepreensível, caráter (III Jo.12)",
        ],
      },
      { tipo: "titulo", texto: "III – O Perigo da Clonagem Ministerial" },
      {
        tipo: "paragrafo",
        texto:
          "A revista Defesa da Fé (Ano 3, nº 20, março de 2000), convidado prof. Christiano P. Neto da ABPC, escreveu sobre clonagem: 'Os clones carregam consigo o mesmo material genético do ser que o originou. Mas quanto às características psicológicas, suas preferências, suas habilidades? Que podemos dizer acerca da questão espiritual?'",
      },
      {
        tipo: "paragrafo",
        texto:
          "'Oriundos do mesmo material genético, gêmeos idênticos guardam entre si semelhanças muito significativas, mas não totais. Caso os clones humanos venham a ser uma realidade, teremos problemas nessas áreas. Como se sentiriam os clones sendo praticamente filhos de ninguém?'",
      },
      {
        tipo: "destaque",
        texto:
          "Quando o apóstolo Paulo nos aconselhou a imitá-lo (I Co.11.1), estava nos encorajando a imitá-lo na fé, no caráter, em seus procedimentos e ações diante de Deus e dos homens — não em entoações de voz, gestos e maneiras de se vestir.",
      },
      {
        tipo: "paragrafo",
        texto:
          "O termo imitar vem do grego μιμηταί. Deriva do latim imitatio (resulta de imitari, da mesma raiz de imago, 'imagem'). Imitação supõe a apresentação de qualquer coisa num plano-outro-mediato que se diferencia daquele plano-mesmo-imediato em que a coisa é apresentada.",
      },
      {
        tipo: "citacao",
        texto:
          "Erro gera erro, heresia gera heresia, sempre em nome da verdade e em nome do evangelho.",
        referencia:
          "John Ankerberg e John Weldon — Os Fatos sobre o Movimento da Fé",
      },
      {
        tipo: "bibliography",
        itens: [
          "Pregadores ou Clones? — Eliel Sobrinho, pag.28-31",
          "Defesa da Fé — ICP, Ano 3; nº 20, março de 2000",
          "Fatos sobre o Movimento da Fé — Ankerberg e Weldon",
          "Antonio Gilberto — O Obreiro do Senhor",
          "Bíblia de Estudo Pentecostal",
        ],
      },
    ],
  },

  // ─── 12 ───────────────────────────────────────────────────────────────────
  {
    slug: "decisoes-decidem-destino",
    titulo: "Decisões Decidem Destino",
    data: "Dezembro 2011",
    dataISO: "2011-12",
    resumo:
      "Estudo sobre a cura do leproso (Mc 1.40-45): o que era a lepra, suas dimensões física, social e religiosa no contexto bíblico, e como a decisão e a compaixão de Jesus revertem destinos.",
    blocos: [
      {
        tipo: "versiculo",
        texto:
          "E aproximou-se dele um leproso, que, rogando-lhe e pondo-se de joelhos diante dele, lhe dizia: Se queres, bem podes limpar-me. E Jesus, movido de grande compaixão, estendeu a mão, e tocou-o, e disse-lhe: Quero, sê limpo! E, tendo ele dito isso, logo a lepra desapareceu, e ficou limpo.",
        referencia: "Mc 1.40-42",
      },
      { tipo: "titulo", texto: "I – O que Era a Lepra" },
      {
        tipo: "paragrafo",
        texto:
          "A lepra é uma infecção crônica causada por uma bactéria ou por um bacilo chamado em latim de mycobacterium leprae, que atinge principalmente os nervos periféricos, afetando as áreas mais superficiais como o nariz, testículos, olhos, afetando a pele e provocando danos severos. Estima-se que mais de 5 milhões de pessoas em todo o mundo estejam infectadas.",
      },
      {
        tipo: "paragrafo",
        texto:
          "Biblicamente falando, o termo 'lepra' etimologicamente vem da palavra hebraica צָרַעַת tsara'ath que vem de uma raiz primitiva tsara' que pode significar: uma manifestação de uma enfermidade; portador de uma doença de pele; vergonha ou desonra; açoite; também lepra. Esse termo é genérico, significando várias doenças.",
      },
      { tipo: "titulo", texto: "II – As Três Dimensões do Leproso" },
      {
        tipo: "lista",
        itens: [
          "No aspecto físico: a pústula esbranquiçada corroía a carne, um membro após o outro era atingido e por fim os ossos eram carcomidos. Febre alta com insônia e pesadelos o atormentavam. Os mestres da lei judaicos contavam os leprosos entre os mortos.",
          "No aspecto social: o enfermo era isolado da sociedade, excluído. A lei ordenava 'que se lancem fora do arraial todo o leproso' (Nm.5:2). As esposas podiam divorciar, segundo a tradição. Deviam rasgar suas roupas ao se aproximar das pessoas e anunciar sua situação.",
          "No aspecto religioso: era impuro perante a lei. Em tudo que tocasse era tido como impuro. Sua presença era o suficiente para contaminar tudo. Deviam rasgar as vestes e anunciar bem alto 'imundo' — estou pesteado de lepra, sou excluído.",
        ],
      },
      { tipo: "titulo", texto: "III – O Ato de Jesus" },
      {
        tipo: "paragrafo",
        texto:
          "Jesus desce do monte e junto com ele uma multidão. O texto de Mateus usa 'eis' (gr. ἰδού idou) um leproso — de forma súbita, surpreendente, sem ser convidado, rápido. O comportamento do leproso — que devia estar fora do convívio social — quebrando todo o paradigma ao se aproximar.",
      },
      {
        tipo: "paragrafo",
        texto:
          "Vr.40 rogando — παρακαλεω parakaleo — dirigir-se a, falar a, esforçar-se por satisfazer de forma humilde e sem orgulho. Vr.40 pondo de joelhos. Expressa súplica de ajuda, bem como reverência e honra. Mateus usa o verbo 'adorar' — προσκυνεω proskuneo — significando beijar, como um cachorro que lambe a mão de seu mestre.",
      },
      {
        tipo: "paragrafo",
        texto:
          "Vr.41 Jesus movido de grande compaixão. O termo grego σπλαγχνιζομαι splagchnizomai — ser movido pelas entranhas; daí, ser movido pela compaixão (pois se achava que as entranhas eram a sede do amor e da piedade). Vr.41 Tocou-o. A lei era terminantemente clara: o leproso não podia ser tocado. Mesmo assim, Jesus estendeu a mão e o tocou.",
      },
      {
        tipo: "destaque",
        texto:
          "Vr.41 Quero sê limpo! — θέλω, καθαρίσθητι (Thelō; katharidzō). 'A vontade que procede de inclinação.' Denota a resolução ativa, a vontade que encoraja a ação. O resultado: 'Decisões Decidem Destinos' — Vr.42: logo a lepra desapareceu.",
      },
      {
        tipo: "bibliography",
        itens: [
          "Evangelho de Mateus — Fritz Rienecker, pag.125-129",
          "A Torah — Vaycrá — Marcelo Miranda Guimarães, pag.105",
          "A Lei da Lepra — G.C. Willis",
          "Bíblia de Estudo Pentecostal",
          "Biblioteca Digital Libronix",
        ],
      },
    ],
  },
  // ─── 13 ──────────────────────────────────────────────────────────────────
  {
    slug: "a-excelencia-da-maturidade-crista",
    titulo: "A Excelência da Maturidade Cristã",
    data: "Agosto 2010",
    dataISO: "2010-08",
    resumo:
      "Estudo sobre a disciplina cristã como caminho para a maturidade: o sentido bíblico de paideia, nouthesia, didaskō e exortação, e as três razões pelas quais a Igreja deve disciplinar.",
    blocos: [
      {
        tipo: "versiculo",
        texto:
          "Filho meu, não te esqueças da minha lei, e o teu coração guarde os meus mandamentos. Porque eles aumentarão os teus dias e te acrescentarão anos de vida e paz.",
        referencia: "Pv 3.1,2",
      },
      {
        tipo: "paragrafo",
        texto:
          "A Bíblia utiliza algumas linguagens para caracterizar os filhos de Deus. O apóstolo Paulo usa a linguagem figurada para caracterizar alguns da igreja de Corinto como 'os meninos em Cristo ou imaturos, neófitos', justamente porque não manifestam sinais de filiação divina, mas sim humana e carnal (I Cor. 3.1-3).",
      },
      {
        tipo: "lista",
        itens: [
          "A disciplina do Senhor tem dois propósitos: (1) que não sejamos condenados com o mundo (I Cor. 11.31,32); (2) compartilhar da Santidade de Deus (S.Jo.17.17).",
          "Sendo disciplinado por Deus mostra ao cristão que andando na vontade de Deus podemos sofrer adversidade (S.Jo.17.14).",
          "Resulta numa guerra espiritual travada com Satanás (Ef.6.10-18).",
          "Testa a nossa fé em caminhada com Deus (I Pe.1.6,7; 4.12).",
          "Faz parte da preparação para consolarmos o próximo (II Cor.1.3-5).",
          "Manifesta a vida de Cristo através de nossas vidas (S.Jo.17.23).",
        ],
      },
      { tipo: "titulo", texto: "I – A Disciplina (Paideuō)" },
      {
        tipo: "paragrafo",
        texto:
          "A palavra disciplina vem do grego παιδευω paideuō, denota primeiramente 'treinar crianças', ser instruído ou ensinado, levar alguém a aprender, sugerindo a ampla ideia de educação (παις pais — 'criança', 'menino'). A disciplina como vocábulo cognato de 'discípulos' (do latim discipulus) tem sua ideia original na raiz grega μαθητης mathetes — literalmente 'aprendiz', derivado de μανθανω manthanō, 'aprender', proveniente de uma raiz math- que indica pensamento acompanhado por esforço.",
      },
      { tipo: "titulo", texto: "II – O Ensino (Didaskō)" },
      {
        tipo: "paragrafo",
        texto:
          "O verbo didaskō é usado como 'dar instrução'; 'coisas ensinadas'. Jesus gastou horas incontáveis no ensino, instruindo seus discípulos no princípio da vida abundante (S.Mt.5-7). Paulo mostra a centralidade do ensino logo que houve centenas de conversões em Éfeso. Lucas informa que Paulo discorreu diariamente na escola de certo Tirano durante dois anos. Um manuscrito antigo acrescenta que Paulo ficava das onze às dezesseis horas neste trabalho de ensinar.",
      },
      { tipo: "titulo", texto: "III – A Exortação (Paraklēsis)" },
      {
        tipo: "paragrafo",
        texto:
          "A palavra grega parakaleō, primeiramente 'chamar uma pessoa' (formado de para, 'para o lado' e kaleō, 'chamar'), denota: 'chamar, pedir, invocar, rogar, admoestar, exortar' sempre visando o futuro. Esta palavra parakaleō vem de Paraklētos — παράκλητος — 'encorajador', 'consolador', 'advogado', 'ajudante', obra do Espírito Santo ao convencer o mundo do pecado, da justiça e do juízo (S.Jo.16.8-13).",
      },
      { tipo: "titulo", texto: "IV – A Admoestação (Nouthesia)" },
      {
        tipo: "paragrafo",
        texto:
          "A palavra 'admoestar' vem do grego νουθεσια nouthesia — literalmente 'o ato de pôr em mente' (formado de nous, 'mente', e tithemi, 'pôr'). O termo nouthesia é o 'treinamento pela palavra', quer por incentivo, ou, se necessário, por reprovação ou reclamação. A diferença entre 'admoestar' e 'ensinar' é que o primeiro tem em vista as coisas que estão erradas e exige advertência; o último tem a ver primeiramente com a doação da verdade positiva.",
      },
      { tipo: "titulo", texto: "V – A Educação (Paideia)" },
      {
        tipo: "paragrafo",
        texto:
          "Este termo foi usado nada menos de oito vezes pelo escritor aos Hebreus num só parágrafo (Hb.12.4-11). O verbo grego paideuō significa 'treinar uma criança'. A disciplina de Deus serve como reconhecimento de uma filiação e visa alcançar um fim muito mais glorioso. A educação tem alvo certo de tornar os filhos obedientes.",
      },
      { tipo: "titulo", texto: "VI – A Repreensão (Elenchō)" },
      {
        tipo: "paragrafo",
        texto:
          "O verbo elenchō — ελεγχω — 'convencer', 'condenar', 'refutar', 'reprovar'. Enquanto o verbo epitimaō significa simplesmente repreender em qualquer sentido, o verbo elenchō implica numa repreensão que traz convicção — repreender com causa suficiente e de forma efetiva, de tal modo a levar o censurado à confissão ou, pelo menos, à convicção de pecado.",
      },
      { tipo: "titulo", texto: "Conclusão" },
      {
        tipo: "destaque",
        texto:
          "Há três razões pelas quais a Igreja deve disciplinar: (1) Para o bem do pecador — despertá-lo do erro e restaurá-lo. (2) Por amor à pureza da Igreja — tolerar o pecado rebaixa o padrão moral e espiritual de todos. (3) Para o bem do mundo — a Igreja não pode ganhar as pessoas para Cristo mantendo-as da mesma forma.",
      },
      {
        tipo: "bibliography",
        itens: [
          "Bíblia Anotada — Charles Caldwell Ryrie",
          "Bíblia de Estudo Plenitude — Jack W. Hayford",
          "Bíblia de Estudo Pentecostal — Donald C. Stamps",
          "Chave Linguística do NT — Fritz Rienecker, Cleon Rogers",
          "Disciplina na Igreja — Dr. Russell P. Shedd",
          "Dicionário VINE — W.E. Vine, Merril F. Unger, William White Jr.",
          "Manual de Exegese Bíblica — Douglas Stuart e Gordon D. Fee",
        ],
      },
    ],
  },

  // ─── 14 ──────────────────────────────────────────────────────────────────
  {
    slug: "o-rosto-de-moises-resplandece",
    titulo: "O Rosto de Moisés Resplandece",
    data: "Agosto 2010",
    dataISO: "2010-08",
    resumo:
      "Estudo sobre Êxodo 34.29 e a palavra hebraica qāran: por que a Vulgata traduziu 'resplandecia' por 'tinha chifres', gerando a famosa estátua de Moisés com chifres de Michelangelo.",
    blocos: [
      {
        tipo: "versiculo",
        texto:
          "Quando desceu Moisés do monte Sinai, tendo nas mãos as duas tábuas do Testemunho, não sabia Moisés que a pele do seu rosto resplandecia, depois de haver Deus falado com ele.",
        referencia: "Ex 34.29 (ARA)",
      },
      {
        tipo: "paragrafo",
        texto:
          "Em Roma, numa capela humilde de San Pedro in Vincoli, existe uma das obras-primas de Michelangelo: a magnífica estátua de Moisés assentado, com mais de 2,40 metros de altura. É possível observar as ondas da barba e as dobras das suas vestes, e até mesmo as veias das suas mãos foram esculpidas na pedra. Mas o que finalmente chama a atenção são os dois pequenos chifres que sobressaem acima da cabeça de Moisés.",
      },
      {
        tipo: "paragrafo",
        texto:
          "Será que Michelangelo teve a intenção de desrespeitar o grande líder Moisés e a religião monoteísta hebraica? Logicamente que não. Esse curioso problema surgiu por causa da tradução equivocada de uma palavra hebraica.",
      },
      { tipo: "titulo", texto: "I – A Palavra Hebraica qāran (קרן)" },
      {
        tipo: "paragrafo",
        texto:
          "A palavra traduzida por 'resplandecia' nessa passagem — qāran — é usada três vezes nesse capítulo a fim de descrever o brilho intenso ou a glória do Senhor sobre ele. A palavra hebraica qāran קרן assemelha-se a qéren קרן, que significa chifre. A Vulgata traduz assim: 'A face de Moisés projetava cornos de luz.'",
      },
      {
        tipo: "paragrafo",
        texto:
          "A palavra hebraica qéren significa ao mesmo tempo corno e raio, e ainda brilho, força, poder, glória, trombeta, lugar e várias outras acepções. Tem também significado literal em 'empurrar para fora, irradiar', e em outro lugar refere-se ao surgimento dos chifres de um animal. Foi isso que motivou Michelangelo a representar Moisés com dois chifres — o que pode ser considerado como um grave erro de tradução.",
      },
      { tipo: "titulo", texto: "II – O Que o Texto Realmente Diz" },
      {
        tipo: "paragrafo",
        texto:
          "Este verbo denominativo qāran denota, primeiramente, os raios fulgurantes que brotaram do rosto de Moisés depois de ele se encontrar com Deus. O fenômeno descrito é associado à pele do rosto de Moisés, e não aos lados da sua cabeça. Também, o que Moisés cobriu com o véu foi o rosto, e não a cabeça.",
      },
      {
        tipo: "destaque",
        texto:
          "O resplendor do rosto de Moisés é um reflexo da glória divina que ele queria ver (Êx 33.18). Os israelitas reconheceram nessa radiação luminosa um reflexo da glória do Senhor — não chifres de animal, mas a transfiguração de um servo que havia estado na presença de Deus.",
      },
      {
        tipo: "paragrafo",
        texto:
          "No AT o chifre não é apenas uma expressão de força física: pode denotar instrumentos musicais (Js.6:5), frascos feitos de chifres (I Sm.16:1), sinônimo de arrogância (Sl.75:4,5) e símbolo de pessoas dotadas de poder (Dn.8:20,21). Os tradutores renascentistas, não tendo conhecimento dos usos figurados da palavra, traduziram-na de acordo com o único significado que conheciam.",
      },
      {
        tipo: "bibliography",
        itens: [
          "O que Você Sabe Pode não Estar Certo — David C. Downing",
          "Larousse Ilustrado da Língua Portuguesa",
          "A Lei de Moisés — Torah (Sêfer)",
          "Bíblia de Estudo Plenitude",
          "Dicionário Hebraico-Português e Aramaico-Português — Sinodal/Vozes",
          "Dicionário Internacional de Teologia do Antigo Testamento",
        ],
      },
    ],
  },

  // ─── 15 ──────────────────────────────────────────────────────────────────
  {
    slug: "katallassein-a-palavra-da-reconciliacao",
    titulo: "Katallassein — A Palavra da Reconciliação",
    data: "Agosto 2010",
    dataISO: "2010-08",
    resumo:
      "Estudo filológico sobre o grupo semântico de katallassō (reconciliar) no grego clássico, secular e no NT: as variantes katallassō, apokatallassō e diallassō, e o que a reconciliação significa teologicamente.",
    blocos: [
      { tipo: "titulo", texto: "I – Definindo o Termo" },
      {
        tipo: "paragrafo",
        texto:
          "O termo grego para o verbo 'reconciliar' é katallassō que denota 'mudar', 'trocar' acerca de pessoas, 'mudar de inimizade para amizade, reconciliar'. O uso deste verbo e de outras palavras relacionadas mostra que a 'reconciliação' é primariamente o que Deus realiza exercendo Sua graça para com o homem pecador com base na morte de Cristo em sacrifício propiciatório sob o julgamento devido ao pecado.",
      },
      {
        tipo: "paragrafo",
        texto:
          "A doutrina da 'reconciliação', como o próprio termo assim o define, consiste da mudança da relação de hostilidade que existiu entre dois indivíduos, passando eles a serem amigos entre si. Essa relação de hostilidade é alterada para a relação de paz.",
      },
      { tipo: "titulo", texto: "II – No Grego Clássico" },
      {
        tipo: "paragrafo",
        texto:
          "Katallassein é a forma composta do verbo simples allassein. A palavra allassein pode ser usada para expressar uma forma, uma cor ou uma aparência que muda. Pode ser usada, também, no sentido de trocar ou permutar (do latim permutare — dar uma coisa em troca de outra).",
      },
      { tipo: "titulo", texto: "III – No Grego Secular" },
      {
        tipo: "paragrafo",
        texto:
          "No grego secular adquire o sentido quase técnico de 'trocar dinheiro ou trocar por dinheiro'. Plutarco conta como quatro irmãos sírios trocaram peça por peça vasos de ouro do rei por dinheiro (Plutarco: Arato 18). Aristóteles fala dos soldados mercenários dispostos a trocar suas vidas por um ganho pequeno (Ética a Nicomaco 1117s 20). Xenofonte conta acerca de um homem que guerreara contra Ciro e depois se tornou seu amigo de novo (Anabasis 1.6.1).",
      },
      { tipo: "titulo", texto: "IV – As Três Formas no NT" },
      {
        tipo: "subtitulo",
        texto: "Katallassō",
      },
      {
        tipo: "paragrafo",
        texto:
          "Composta pela preposição kata e pelo verbo simples allassein. Em Rm.5:10 diz que quando éramos inimigos fomos 'reconciliados' (katallassein) com Deus mediante a morte do seu Filho. Em II Cor.5:18-20 há uma série inteira de usos desta palavra — o ministério e a palavra da 'reconciliação'.",
      },
      {
        tipo: "subtitulo",
        texto: "Apokatallassō",
      },
      {
        tipo: "paragrafo",
        texto:
          "Formado de apo (ponto de partida) e katallassō. Geralmente aplicada de forma mais forte como: 'mudar de uma condição para outra', 'tirar toda inimizade e não deixar impedimento algum à unidade e paz'. Usada em Ef.2:16, acerca da 'reconciliação' pela cruz; e em Cl.1:20-21, acerca do propósito divino de 'reconciliar' por meio de Cristo todas as coisas.",
      },
      {
        tipo: "subtitulo",
        texto: "Diallassō",
      },
      {
        tipo: "paragrafo",
        texto:
          "Significa 'efetuar uma alteração', 'trocar', e, por conseguinte, 'reconciliar' em casos de hostilidade mútua, rendendo-se à concessão mútua. Usada em Mt.5:24 e I Cor.7:11. O apóstolo Paulo nunca usa este verbo — porque denota concessão mútua depois de hostilidade mútua, o que não descreve a relação entre Deus e o homem.",
      },
      { tipo: "titulo", texto: "V – Conclusão Teológica" },
      {
        tipo: "destaque",
        texto:
          "O NT quando fala sobre a ira de Deus mostra que 'a hostilidade é representada não como parte de Deus, mas do homem'. Paulo nunca fala em Deus sendo 'reconciliado' com o homem — sempre nos homens sendo 'reconciliados'. Era o homem, e não Deus, que precisava ser 'reconciliado'.",
      },
      {
        tipo: "paragrafo",
        texto:
          "O efeito da cruz mudou não o coração de Deus, mas o coração do homem. A ira de Deus foi transformada em amor, e o julgamento de Deus foi transformado em misericórdia, por causa da morte expiatória de Cristo na cruz do Calvário. 'Reconciliar' é devolver a unidade, harmonia, tudo aquilo que antes tinha se perdido por causa do pecado.",
      },
      {
        tipo: "bibliography",
        itens: [
          "Enciclopédia de Bíblia Teologia e Filosofia — R.N. Champlim, J.M. Bentes, pg.574,575",
          "Palavras Chaves do Novo Testamento — William Barclay, pg.116,117",
          "Introdução ao Estudo do Novo Testamento Grego — W.C. Taylor, pg.234,259,273",
          "Dicionário VINE — W.E. Vine, Merril F. Unger, William White Jr., pg.929,930",
        ],
      },
    ],
  },

  // ─── 16 ──────────────────────────────────────────────────────────────────
  {
    slug: "anatomia-do-sofrimento",
    titulo: "Anatomia do Sofrimento",
    data: "Setembro 2010",
    dataISO: "2010-09",
    resumo:
      "Estudo bíblico sobre o sofrimento humano: suas causas, a necessidade que ele supre, sua universalidade, os tipos de enfermidade na Bíblia e as obrigações que ele impõe ao crente.",
    blocos: [
      {
        tipo: "paragrafo",
        texto:
          "O assunto surgiu após ter lido um livro 'Quando coisas ruins acontecem às pessoas Boas', de um jovem rabino estudante de Teologia, Harold Kushner. Rabino de uma pequena cidade; o clérigo consolava as pessoas visitadas pela dor e pelo sofrimento. No instante, porém, em que soube que seu filho Aaron, de três anos de idade, morreria de uma doença rara, 'progéria', no início da adolescência, ele se deparou com a mais importante e mais terrível questão que alguém pode enfrentar: Por que coisas ruins acontecem com pessoas boas?",
      },
      {
        tipo: "versiculo",
        texto: "No mundo tereis aflição; mas tende bom ânimo; eu venci o mundo.",
        referencia: "Jo 16.33",
      },
      { tipo: "titulo", texto: "I – As Causas do Sofrimento" },
      {
        tipo: "paragrafo",
        texto:
          "O termo grego thlipsis significa pressão, opressão, estresse, angústia, tribulação. Essa palavra vem de thlibō que tem sentido de espremer, pressionar, esmagar, apertar.",
      },
      {
        tipo: "lista",
        itens: [
          "Pecado — Gn.3; Rm.8.22,23; 3.23; 6.23; 5.12. O pecado é a causa original de toda doença, moléstia e sofrimento. Is.1:5,6",
          "Escolhas erradas — Gl.6.7. Uma decisão errada pode fazer muitas pessoas sofrerem.",
          "Transgressão das leis — Mt.4.1. A lei da causalidade: plantou, colhe.",
          "Fenômenos naturais — Mt.24.7. Terremotos, furacões, raios, inundações atingem as pessoas sem distinção.",
          "Causa da justiça — Mt.5.10-12. Sofremos por causa da fidelidade ao Evangelho.",
          "Meio disciplinar — Hb.12.6-8; Ap.3:19. Deus usa o sofrimento para disciplinar seus filhos.",
          "Pecados graves — At.12.23; 5.1. Algumas vezes o sofrimento é consequência direta de pecados específicos.",
        ],
      },
      { tipo: "titulo", texto: "II – A Necessidade do Sofrimento" },
      {
        tipo: "lista",
        itens: [
          "As tribulações tornam-nos mais conscientes de que somos criaturas dependentes (S.Jo.15.7).",
          "As tribulações nos aproximam mais das outras pessoas — unem famílias, igrejas (Fp.2.5).",
          "As tribulações ajudam-nos a compreender as outras pessoas que estão passando pelo mesmo problema (Pv.25.11; Ecl.3.1).",
          "As tribulações podem ser resultado de má semeadura — servem de punição (Gl.6.7).",
          "As tribulações nos ensinam sobre a maldade no coração do homem (Jr.17.9).",
          "Nossa vida espiritual é fortalecida na tribulação (IICor.12.9; Rm.8.17,18).",
        ],
      },
      { tipo: "titulo", texto: "III – Os Tipos de Enfermidade na Bíblia" },
      {
        tipo: "lista",
        itens: [
          "Enfermidade como provação (Jó 2.1; IICor.12.9)",
          "Enfermidade como consequência de pecado (S.Jo.5.4; Mc.2.1; Tg.5.4)",
          "Enfermidade como manifestação da glória de Deus (S.Jo.9.1)",
          "Enfermidade como espírito maligno (Lc.13.10; Mt.9.27)",
          "Enfermidade como causa natural (ITm.5.23; IITm.4.20)",
          "Enfermidade como causa genética (S.Jo.9.1)",
          "Enfermidade como excesso de trabalho (Fp.2.25-30)",
          "Enfermidade como causa espiritual (ICor.11.30)",
        ],
      },
      {
        tipo: "destaque",
        texto:
          "Quem põe a enfermidade — Deus, diabo ou consequência do pecado? Nem todas as enfermidades são consequências do pecado. Algumas vezes vimos Deus ferindo (II Cr.26.20; Lv.10.2); outras, Deus permitindo que Satanás fira (IICor.12.9; Jó 2); outras, enviando um anjo (Sl.78.49); outras, demônios causadores de enfermidade (Mt.17.14-21). Deus pode usar tanto anjos bons como maus para seus propósitos.",
      },
      { tipo: "titulo", texto: "IV – Os Benefícios das Enfermidades" },
      {
        tipo: "lista",
        itens: [
          "A enfermidade ajuda o ser humano a lembrar-se da morte (Lc.18.18).",
          "A enfermidade faz com que os homens pensem seriamente sobre Deus (II Rs.8.8).",
          "A enfermidade ajuda a amolecer o coração do homem (Ez.36.26).",
          "A enfermidade nos torna mais humildes (IICor.12.9).",
          "A enfermidade nos ajuda a testar a nossa autenticidade (Sl.26.2; Sl.119.67,71).",
        ],
      },
      { tipo: "titulo", texto: "V – As Obrigações Impostas" },
      {
        tipo: "lista",
        itens: [
          "Vivermos constantemente preparados para encontrar com Deus (Lc.12.16).",
          "Vivermos constantemente prontos para suportá-la com paciência (Rm.5.3).",
          "Vivermos constantemente em prontidão para ajudar os nossos semelhantes e nos identificarmos com eles (Mt.25.36; Ef.4.32).",
        ],
      },
      {
        tipo: "citacao",
        texto:
          "Em resumo, o sofrimento serve para enobrecer o homem, para eliminar da mente o orgulho, ampliar novos horizontes. O propósito do sofrimento é reparar os defeitos da personalidade do homem.",
        referencia: "Pr. Eliel Sobrinho",
      },
    ],
  },
]

export function getArtigo(slug: string): ArtigoTeologico | undefined {
  return artigosTeologicos.find((a) => a.slug === slug)
}
