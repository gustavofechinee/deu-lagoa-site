const asset = (path) => `${import.meta.env.BASE_URL}${path}`;

export const seedContent = {
  version: 8,
  resort: {
    name: "Hotel Resto Deu Lagoa Uruau",
    tagline: "Hotel, restaurante e vista para a lagoa em Uruau.",
    heroTitle: "Lagoa, mesa e estadia no mesmo ritmo.",
    heroCopy:
      "A Deu Lagoa reune hospedagem, restaurante e uma vista que conduz o tempo do Uruau. Um endereco para chegar sem pressa, ficar perto da agua e reservar direto com a equipe.",
    storyTitle: "Uma casa de lagoa pensada para mesa, descanso e permanencia.",
    storyCopy:
      "A experiencia comeca na paisagem, atravessa o resto e segue para estadias desenhadas para fins de semana prolongados, encontros a dois e dias inteiros perto da agua.",
    location: "Lagoa do Uruau, Beberibe - Ceara",
    reservationPhone: "",
    reservationWhatsapp: "",
    reservationEmail: "",
    checkIn: "sob consulta",
    checkOut: "sob consulta",
    seasonLabel: "Deu Lagoa | Hotel + Resto | Uruau",
    sellerCode: "deulagoa2026",
    heroImage: asset("deu-lagoa/hero-lagoa-hq.jpg"),
    profileImage: asset("deu-lagoa/perfil.jpg"),
    signatureImage: asset("deu-lagoa/resto-noite-hq.jpg"),
    culinaryImage: asset("deu-lagoa/suite-casal-hq.jpg"),
    featureVideo: asset("deu-lagoa/lagoa-cinema.mp4"),
    featureVideoPoster: asset("deu-lagoa/hero-lagoa-hq.jpg"),
    instagramHandle: "@deulagoauruau",
    instagramUrl: "https://www.instagram.com/deulagoauruau/",
  },
  stats: [
    { value: "Lagoa", label: "a paisagem organiza a chegada e a permanencia" },
    { value: "Resto", label: "mesa e hospedagem dividem o mesmo endereco" },
    { value: "Hotel", label: "estadias com atendimento direto da equipe" },
    { value: "Uruau", label: "Beberibe, Ceara, como destino principal" },
  ],
  storyPanels: [
    {
      id: "story-1",
      eyebrow: "paisagem",
      title: "A lagoa define a chegada.",
      copy: "A vista abre a experiencia, acalma o ritmo e sustenta a primeira impressao da casa.",
      image: asset("deu-lagoa/hero-lagoa-hq.jpg"),
    },
    {
      id: "story-2",
      eyebrow: "resto",
      title: "Mesa e hospedagem no mesmo endereco.",
      copy: "O restaurante amplia a estadia e faz da reserva uma experiencia que atravessa o dia inteiro.",
      image: asset("deu-lagoa/resto-noite-hq.jpg"),
    },
    {
      id: "story-3",
      eyebrow: "permanencia",
      title: "O ritmo e de permanencia.",
      copy: "Quartos, areas comuns e atendimento direto foram organizados para estadias mais longas e reservas acompanhadas pela equipe.",
      image: asset("deu-lagoa/suite-casal-hq.jpg"),
    },
  ],
  suites: [
    {
      slug: "consulta-hospedagem",
      name: "Reserva de hospedagem",
      category: "estadia",
      rate: 0,
      size: "",
      guests: 0,
      beds: "",
      image: asset("deu-lagoa/suite-casal-hq.jpg"),
      gallery: [
        asset("deu-lagoa/suite-casal-hq.jpg"),
        asset("deu-lagoa/hero-lagoa-hq.jpg"),
        asset("deu-lagoa/resto-noite-hq.jpg"),
      ],
      summary: "Atendimento direto para confirmar categoria, tarifa e datas com a equipe da pousada.",
      details:
        "Use esta opcao para iniciar a consulta de disponibilidade e receber a orientacao mais adequada para o periodo desejado.",
      amenities: [],
    },
    {
      slug: "consulta-experiencia",
      name: "Estadia Deu Lagoa",
      category: "hotel + resto",
      rate: 0,
      size: "",
      guests: 0,
      beds: "",
      image: asset("deu-lagoa/resto-noite-hq.jpg"),
      gallery: [
        asset("deu-lagoa/resto-noite-hq.jpg"),
        asset("deu-lagoa/hero-lagoa-hq.jpg"),
        asset("deu-lagoa/familia-hq.jpg"),
      ],
      summary: "Uma consulta pensada para quem quer alinhar hospedagem, mesa e programacao na mesma reserva.",
      details:
        "Ideal para estadias que combinam acomodacao, restaurante e planejamento de chegada com acompanhamento da equipe.",
      amenities: [],
    },
  ],
  rituals: [
    {
      title: "Paisagem como protagonista",
      copy: "A vista para a lagoa organiza a arquitetura, a experiencia e o tempo da estadia.",
    },
    {
      title: "Mesa e estadia integradas",
      copy: "Hospedagem e restaurante convivem no mesmo gesto de chegada e permanencia.",
    },
    {
      title: "Reserva acompanhada",
      copy: "A equipe recebe o pedido, confirma agenda e orienta cada estadia ate a finalizacao.",
    },
  ],
  experiences: [
    {
      id: "exp-1",
      name: "Vista para a lagoa",
      duration: "paisagem",
      description: "A agua permanece no centro da experiencia e acompanha a casa do check-in ao fim da tarde.",
    },
    {
      id: "exp-2",
      name: "Mesa da casa",
      duration: "resto",
      description: "O restaurante amplia a estadia e transforma a reserva em programa completo.",
    },
    {
      id: "exp-3",
      name: "Estadia em Uruau",
      duration: "hotel",
      description: "A pousada se posiciona como endereco para desacelerar, ficar perto da lagoa e permanecer mais tempo.",
    },
    {
      id: "exp-4",
      name: "Reserva direta",
      duration: "atendimento",
      description: "O pedido chega a equipe, que confirma categoria, valores, agenda e detalhes da estadia.",
    },
  ],
  itinerary: [
    {
      time: "chegada",
      title: "Check-in com vista aberta para a lagoa",
      description: "A primeira impressao ja organiza a estadia em torno da paisagem e do ritmo da agua.",
    },
    {
      time: "tarde",
      title: "Piscina, descanso e tempo mais lento",
      description: "A casa funciona melhor quando a estadia acompanha o ritmo do lugar, sem pressa para sair.",
    },
    {
      time: "noite",
      title: "Mesa acesa no resto",
      description: "O restaurante complementa a experiencia e faz da noite uma extensao natural da hospedagem.",
    },
    {
      time: "reserva",
      title: "Equipe confirma a estadia",
      description: "O pedido de disponibilidade abre o atendimento direto e evita conflito de agenda no periodo solicitado.",
    },
  ],
  testimonials: [
    {
      quote: "Hotel e restaurante a beira da lagoa.",
      author: "Deu Lagoa",
    },
    {
      quote: "Experiencias, sabores e conforto.",
      author: "Deu Lagoa",
    },
    {
      quote: "Uruau em um ritmo mais calmo.",
      author: "Deu Lagoa",
    },
  ],
  faq: [
    {
      question: "Como funciona a reserva?",
      answer: "O pedido de disponibilidade chega a equipe, que confirma categoria, valores e politicas antes da finalizacao.",
    },
    {
      question: "Os valores aparecem no site?",
      answer: "As tarifas podem ser informadas diretamente pela equipe, de acordo com periodo, categoria e disponibilidade.",
    },
    {
      question: "Posso reservar pelo Instagram?",
      answer: "Sim. O perfil oficial segue como um dos canais de atendimento rapido para pedidos de disponibilidade.",
    },
    {
      question: "A disponibilidade e atualizada em tempo real?",
      answer: "O sistema bloqueia pedidos pendentes e reservas confirmadas para evitar conflito de agenda durante o atendimento.",
    },
  ],
  policies: [
    "Hotel, resto e lagoa no mesmo endereco.",
    "Reserva direta com acompanhamento da equipe.",
    "Atendimento integrado ao Instagram oficial.",
    "Agenda protegida contra sobreposicao de datas.",
  ],
  instagramPosts: [
    {
      id: "ig-1",
      image: asset("deu-lagoa/hero-lagoa-hq.jpg"),
      caption: "A lagoa aparece como plano principal da casa.",
    },
    {
      id: "ig-2",
      image: asset("deu-lagoa/resto-noite-hq.jpg"),
      caption: "Noite acesa no resto, com a casa operando em ritmo de estadia.",
    },
    {
      id: "ig-3",
      image: asset("deu-lagoa/suite-casal-hq.jpg"),
      caption: "Quartos pensados para permanencia, descanso e chegada sem pressa.",
    },
    {
      id: "ig-4",
      image: asset("deu-lagoa/familia-hq.jpg"),
      caption: "Convivencia leve entre agua, areas comuns e dias mais longos.",
    },
    {
      id: "ig-5",
      image: asset("deu-lagoa/inauguracao-hq.jpg"),
      caption: "A marca aparece com tom de casa aberta, mesa pronta e paisagem presente.",
    },
    {
      id: "ig-6",
      image: asset("deu-lagoa/lagoa.jpg"),
      caption: "Uruau como destino de agua calma, luz baixa e estadia prolongada.",
    },
  ],
  reservations: [],
  reservationSettings: {
    blockingStatuses: ["pending", "confirmed"],
    leadExpiryHours: 24,
  },
  verification: {
    checkedAt: "2026-04-02",
    verifiedFacts: [
      {
        id: "vf-1",
        label: "O perfil oficial usa o nome Hotel Resto Deu Lagoa Uruau e o handle @deulagoauruau.",
        sourceLabel: "Instagram oficial",
        sourceUrl: "https://www.instagram.com/deulagoauruau/",
      },
      {
        id: "vf-2",
        label: "A bio publica traz as linhas Hotel & Restaurante, Vista encantadora da lagoa e Experiencias, sabores e conforto.",
        sourceLabel: "Instagram oficial",
        sourceUrl: "https://www.instagram.com/deulagoauruau/",
      },
      {
        id: "vf-3",
        label: "A Lagoa do Uruau esta em Beberibe, Ceara.",
        sourceLabel: "Semace",
        sourceUrl: "https://www.semace.ce.gov.br/2021/05/26/lagoa-do-urau-operacao-de-fiscalizacao-da-semace-e-bpma-resulta-em-embargos-e-auto-de-infracao/",
      },
    ],
    pendingValidation: [
      "Telefone operacional",
      "WhatsApp comercial",
      "E-mail oficial de reservas",
      "Tipos reais de quarto",
      "Tarifas oficiais",
      "Politicas financeiras e de cancelamento",
    ],
  },
  ops: {
    stack: [
      {
        title: "Banco de dados",
        description: "PostgreSQL com bloqueio transacional por periodo e estrutura para multiusuario.",
      },
      {
        title: "Aplicacao",
        description: "Frontend institucional com painel operacional separado do site.",
      },
      {
        title: "API",
        description: "Camada REST ou Supabase para reservas, autenticacao, auditoria e midia.",
      },
      {
        title: "Operacao",
        description: "Fluxo de aprovacao, calendario, notificacoes, logs e backups.",
      },
    ],
    bookingFlow: [
      {
        step: "01",
        title: "Pedido de disponibilidade",
        description: "O visitante envia interesse com nome, contato, categoria e periodo desejado.",
      },
      {
        step: "02",
        title: "Bloqueio temporario",
        description: "Status pendente e confirmado impedem dupla venda no mesmo intervalo cadastrado.",
      },
      {
        step: "03",
        title: "Confirmacao operacional",
        description: "A equipe confirma valores, politica, pagamento e disponibilidade final.",
      },
    ],
    launchChecklist: [
      "Conectar o painel a Postgres ou Supabase antes da venda final.",
      "Validar contatos oficiais com a pousada e preencher o painel com dados reais.",
      "Configurar autenticacao real para vendedor, sem depender de codigo estatico.",
      "Salvar reservas com auditoria e historico de alteracoes.",
      "Ativar backups, politica LGPD e monitoramento de erros.",
    ],
  },
  meta: {
    updatedAt: "2026-04-02T18:00:00.000Z",
    persistence: "localStorage",
  },
};
