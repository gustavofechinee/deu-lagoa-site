const asset = (path) => `${import.meta.env.BASE_URL}${path}`;

export const seedContent = {
  version: 9,
  resort: {
    name: "Deu Lagoa Uruaú",
    tagline: "Pousada e restô à beira da Lagoa do Uruaú, em Beberibe.",
    heroTitle: "Pousada e restô à beira da Lagoa do Uruaú.",
    heroCopy:
      "Um endereço para desacelerar, chegar perto da água e reservar direto com a equipe. A experiência combina hospedagem, mesa e paisagem no mesmo ritmo.",
    storyTitle: "Uma casa voltada para a água, para a mesa e para estadias sem pressa.",
    storyCopy:
      "A leitura da marca parte da lagoa e segue para ambientes de permanência, restaurante e atendimento direto. O objetivo não é volume; é fazer a chegada parecer simples, bonita e bem acompanhada.",
    location: "Lagoa do Uruaú, Beberibe - Ceará",
    reservationPhone: "",
    reservationWhatsapp: "",
    reservationEmail: "",
    checkIn: "sob consulta",
    checkOut: "sob consulta",
    seasonLabel: "Deu Lagoa Uruaú | Pousada + Restô",
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
    { value: "Lagoa", label: "a paisagem organiza a chegada e a permanência" },
    { value: "Restô", label: "mesa e hospedagem no mesmo endereço" },
    { value: "Reserva", label: "atendimento direto com a equipe da casa" },
    { value: "Beberibe", label: "Uruaú como destino principal da viagem" },
  ],
  storyPanels: [
    {
      id: "story-1",
      eyebrow: "paisagem",
      title: "A lagoa define a chegada.",
      copy: "A vista abre a experiência, organiza o silêncio da casa e sustenta a primeira memória de quem chega.",
      image: asset("deu-lagoa/hero-lagoa-hq.jpg"),
    },
    {
      id: "story-2",
      eyebrow: "mesa",
      title: "A mesa prolonga a estadia.",
      copy: "O restô amplia a permanência e transforma a reserva em um programa mais completo, do almoço à noite.",
      image: asset("deu-lagoa/resto-noite-hq.jpg"),
    },
    {
      id: "story-3",
      eyebrow: "quartos",
      title: "Ambientes para ficar mais tempo.",
      copy: "Quartos, áreas comuns e atendimento foram organizados para uma estadia mais lenta, sem excesso de informação.",
      image: asset("deu-lagoa/suite-casal-hq.jpg"),
    },
  ],
  suites: [
    {
      slug: "consulta-hospedagem",
      name: "Consulta de hospedagem",
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
      summary: "Consulta direta para confirmar categoria, tarifa e datas com a equipe da pousada.",
      details:
        "Use esta opção para iniciar a consulta de disponibilidade e receber a orientação mais adequada para o período desejado.",
      amenities: [],
    },
    {
      slug: "consulta-experiencia",
      name: "Estadia Deu Lagoa",
      category: "pousada + restô",
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
      summary: "Consulta pensada para alinhar hospedagem, mesa e programação na mesma reserva.",
      details:
        "Ideal para estadias que combinam acomodação, restaurante e planejamento de chegada com acompanhamento da equipe.",
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
      question: "Como a reserva é iniciada?",
      answer: "A consulta de disponibilidade chega à equipe, que confirma agenda, categoria e valores antes da finalização.",
    },
    {
      question: "Os valores aparecem no site?",
      answer: "As tarifas seguem sob consulta direta, de acordo com período, categoria e disponibilidade.",
    },
    {
      question: "Posso reservar pelo Instagram?",
      answer: "Sim. O perfil oficial segue como um dos canais de atendimento rápido para pedidos de disponibilidade.",
    },
    {
      question: "A disponibilidade é atualizada em tempo real?",
      answer: "O sistema bloqueia pedidos pendentes e reservas confirmadas para evitar conflito de agenda durante o atendimento.",
    },
  ],
  policies: [
    "Pousada e restô no mesmo endereço.",
    "Reserva direta com acompanhamento da equipe.",
    "Paisagem aberta para a lagoa.",
    "Agenda protegida contra sobreposição de datas.",
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
      caption: "Noite acesa no restô, com a casa operando em ritmo de estadia.",
    },
    {
      id: "ig-3",
      image: asset("deu-lagoa/suite-casal-hq.jpg"),
      caption: "Quartos pensados para permanência, descanso e chegada sem pressa.",
    },
    {
      id: "ig-4",
      image: asset("deu-lagoa/familia-hq.jpg"),
      caption: "Convivência leve entre água, áreas comuns e dias mais longos.",
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
        label: "A Lagoa do Uruau está em Beberibe, Ceará.",
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
    updatedAt: "2026-04-04T18:00:00.000Z",
    persistence: "localStorage",
  },
};
