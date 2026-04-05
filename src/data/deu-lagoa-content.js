const asset = (path) => `${import.meta.env.BASE_URL}${path}`;

export const seedContent = {
  version: 11,
  resort: {
    name: "Deu Lagoa Uruaú",
    tagline: "Hotel & Restaurante à beira da Lagoa do Uruaú, em Beberibe.",
    heroTitle: "Hotel & Restaurante à beira da Lagoa do Uruaú.",
    heroTitleLines: ["Hotel &", "Restaurante", "à beira da Lagoa", "do Uruaú."],
    heroCopy:
      "Vista encantadora da lagoa, experiências, sabores e conforto. A reserva e o atendimento seguem pelo perfil oficial da casa.",
    storyTitle: "Hospedagem, restaurante e paisagem no mesmo endereço.",
    storyCopy:
      "No perfil oficial, a Deu Lagoa Uruaú se apresenta como Hotel & Restaurante com vista encantadora da lagoa. As publicações reforçam tranquilidade, conforto, boa comida e momentos à beira d'água.",
    location: "Lagoa do Uruaú, Beberibe - Ceará",
    reservationPhone: "",
    reservationWhatsapp: "",
    reservationEmail: "",
    checkIn: "sob consulta",
    checkOut: "sob consulta",
    seasonLabel: "Deu Lagoa Uruaú | Hotel & Restaurante",
    sellerCode: "deulagoa2026",
    heroImage: asset("deu-lagoa/hero-lagoa-hq.jpg"),
    profileImage: asset("deu-lagoa/perfil.jpg"),
    signatureImage: asset("deu-lagoa/resto-noite-hq.jpg"),
    culinaryImage: asset("deu-lagoa/familia-hq.jpg"),
    featureVideo: asset("deu-lagoa/instagram/reel-drvibmkjor5.mp4"),
    featureVideoPoster: asset("deu-lagoa/hero-lagoa-hq.jpg"),
    featureVideoSourceUrl: "https://www.instagram.com/reel/DRvIBmkjor5/",
    instagramHandle: "@deulagoauruau",
    instagramUrl: "https://www.instagram.com/deulagoauruau/",
  },
  stats: [
    { value: "Hotel", label: "o perfil oficial apresenta a casa como hotel" },
    { value: "Restaurante", label: "a operação também comunica a mesa da casa" },
    { value: "Lagoa", label: "a vista aparece como eixo central da experiência" },
    { value: "Reserva", label: "o contato público segue por atendimento direto" },
  ],
  storyPanels: [
    {
      id: "story-1",
      eyebrow: "lagoa",
      title: "Às margens da Lagoa do Uruaú.",
      copy: "O reel oficial de dezembro de 2025 descreve a Deu Lagoa Uruaú como o lugar ideal para viver momentos inesquecíveis às margens da lagoa.",
      image: asset("deu-lagoa/hero-lagoa-hq.jpg"),
    },
    {
      id: "story-2",
      eyebrow: "restaurante",
      title: "Sabor, conforto e clima à beira da água.",
      copy: "Em janeiro de 2026, o perfil oficial apresentou o Restaurante Deu Lagoa Uruaú como uma experiência única, com clima perfeito à beira da lagoa.",
      image: asset("deu-lagoa/resto-noite-hq.jpg"),
    },
    {
      id: "story-3",
      eyebrow: "hospedagem",
      title: "Tranquilidade e atmosfera acolhedora.",
      copy: "Em abril de 2026, a conta oficial reforçou a hospedagem como experiência de tranquilidade, paisagem e acolhimento em Uruaú.",
      image: asset("deu-lagoa/suite-casal-hq.jpg"),
    },
  ],
  suites: [
    {
      slug: "consulta-hospedagem",
      name: "Consulta de hospedagem",
      category: "hotel",
      rate: 0,
      size: "",
      guests: 0,
      beds: "",
      image: asset("deu-lagoa/suite-casal-hq.jpg"),
      gallery: [
        asset("deu-lagoa/suite-casal-hq.jpg"),
        asset("deu-lagoa/hero-lagoa-hq.jpg"),
        asset("deu-lagoa/familia-hq.jpg"),
      ],
      summary: "Atendimento direto para verificar disponibilidade, tarifa e categoria no período desejado.",
      details:
        "O perfil oficial divulga hospedagem em Uruaú com vista para a lagoa e encaminhamento de reservas pela equipe da casa.",
      amenities: ["Hotel & Restaurante", "Vista para a lagoa", "Reserva sob consulta"],
    },
  ],
  rituals: [
    {
      title: "Hotel & Restaurante",
      copy: "A bio pública apresenta a operação como hotel e restaurante no mesmo endereço.",
    },
    {
      title: "Vista encantadora da lagoa",
      copy: "A paisagem da lagoa aparece na bio e nas publicações oficiais como atributo central da experiência.",
    },
    {
      title: "Experiências, sabores e conforto",
      copy: "Esse é o trio de atributos usado na bio pública da marca para resumir o posicionamento da casa.",
    },
  ],
  experiences: [
    {
      id: "exp-1",
      name: "Hotel & Restaurante",
      duration: "bio oficial",
      description: "A conta pública da marca se apresenta diretamente como Hotel & Restaurante Deu Lagoa Uruaú.",
    },
    {
      id: "exp-2",
      name: "Vista encantadora da lagoa",
      duration: "bio oficial",
      description: "A paisagem da lagoa é apresentada pela própria marca como um dos principais atrativos da experiência.",
    },
    {
      id: "exp-3",
      name: "Experiências, sabores e conforto",
      duration: "bio oficial",
      description: "A bio pública resume a proposta da casa nesses três eixos, combinando hospedagem, mesa e ambiente.",
    },
    {
      id: "exp-4",
      name: "Momentos inesquecíveis à beira da lagoa",
      duration: "reel oficial",
      description: "No reel oficial de dezembro de 2025, a marca descreve o local como cenário perfeito para relaxar, aproveitar e se encantar.",
    },
  ],
  itinerary: [
    {
      time: "bio",
      title: "Hotel & Restaurante",
      description: "É assim que a própria Deu Lagoa Uruaú se define publicamente no Instagram.",
    },
    {
      time: "reel",
      title: "Momentos à margem da lagoa",
      description: "O conteúdo oficial reforça a lagoa como pano de fundo da estadia e do tempo de permanência no local.",
    },
    {
      time: "restaurante",
      title: "Sabor e clima à beira da água",
      description: "O restaurante aparece em conteúdo oficial como parte importante da experiência da casa.",
    },
    {
      time: "reserva",
      title: "Atendimento direto da equipe",
      description: "Reservas e mais informações seguem por contato direto com a operação, hoje centralizado no perfil oficial.",
    },
  ],
  testimonials: [
    {
      quote: "Experiências, sabores e conforto.",
      author: "Bio oficial",
    },
    {
      quote: "Um cenário perfeito para relaxar, aproveitar e se encantar.",
      author: "Reel oficial | dez/2025",
    },
    {
      quote: "Sabor, conforto e aquele clima perfeito à beira da lagoa.",
      author: "Restaurante Deu Lagoa Uruaú | jan/2026",
    },
  ],
  faq: [
    {
      question: "Como a reserva é iniciada hoje?",
      answer: "O canal público confirmado é o Instagram oficial da Deu Lagoa Uruaú, onde a bio indica reservas e mais informações.",
    },
    {
      question: "O site publica uma tabela completa de tarifas?",
      answer: "Não. O perfil oficial divulga hospedagem e chamadas promocionais, mas não publica uma tabela pública completa de tarifas neste projeto.",
    },
    {
      question: "O restaurante faz parte da operação?",
      answer: "Sim. A bio pública define a casa como Hotel & Restaurante, e há reels oficiais dedicados ao Restaurante Deu Lagoa Uruaú.",
    },
    {
      question: "Onde a Deu Lagoa Uruaú fica?",
      answer: "Na Lagoa do Uruaú, em Beberibe, no Ceará.",
    },
  ],
  policies: [
    "Hotel & Restaurante.",
    "Vista encantadora da lagoa.",
    "Experiências, sabores e conforto.",
    "Reservas e mais informações pelo Instagram oficial.",
  ],
  instagramPosts: [
    {
      id: "ig-1",
      image: asset("deu-lagoa/hero-lagoa-hq.jpg"),
      caption: "Momentos inesquecíveis às margens da Lagoa do Uruaú.",
    },
    {
      id: "ig-2",
      image: asset("deu-lagoa/resto-noite-hq.jpg"),
      caption: "Restaurante Deu Lagoa Uruaú: sabor, conforto e clima à beira da lagoa.",
    },
    {
      id: "ig-3",
      image: asset("deu-lagoa/suite-casal-hq.jpg"),
      caption: "Hospedagem com tranquilidade, atmosfera acolhedora e vista para Uruaú.",
    },
    {
      id: "ig-4",
      image: asset("deu-lagoa/instagram/reel-drvibmkjor5.jpg"),
      caption: "Reel oficial com filmagens do local publicadas pela Deu Lagoa Uruaú.",
      sourceUrl: "https://www.instagram.com/reel/DRvIBmkjor5/",
    },
  ],
  reservations: [],
  reservationSettings: {
    blockingStatuses: ["pending", "confirmed"],
    leadExpiryHours: 24,
  },
  verification: {
    checkedAt: "2026-04-04",
    verifiedFacts: [
      {
        id: "vf-1",
        label: "O perfil oficial usa o handle @deulagoauruau e o nome Hotel Restô Deu Lagoa Uruaú.",
        sourceLabel: "Instagram oficial",
        sourceUrl: "https://www.instagram.com/deulagoauruau/",
      },
      {
        id: "vf-2",
        label: "A bio pública informa Hotel & Restaurante, vista encantadora da lagoa e experiências, sabores e conforto.",
        sourceLabel: "Instagram oficial",
        sourceUrl: "https://www.instagram.com/deulagoauruau/",
      },
      {
        id: "vf-3",
        label: "Em 1 de dezembro de 2025, a conta oficial publicou reel sobre momentos às margens da Lagoa do Uruaú.",
        sourceLabel: "Reel oficial",
        sourceUrl: "https://www.instagram.com/reel/DRvIBmkjor5/",
      },
      {
        id: "vf-4",
        label: "Em 17 de janeiro de 2026, a conta oficial publicou reel sobre o Restaurante Deu Lagoa Uruaú.",
        sourceLabel: "Reel oficial",
        sourceUrl: "https://www.instagram.com/reel/DTniihqDlfT/",
      },
      {
        id: "vf-5",
        label: "A Lagoa do Uruaú está em Beberibe, Ceará.",
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
      "Políticas financeiras e de cancelamento",
      "Passeios de jetski e lancha sem confirmação direta no perfil oficial",
    ],
  },
  ops: {
    stack: [
      {
        title: "Banco relacional para reservas",
        description: "Persistir reservas, disponibilidade e contatos em PostgreSQL para tirar a operação do localStorage.",
      },
      {
        title: "Autenticação do painel interno",
        description: "Trocar o código único por contas reais de operação com controle de acesso e histórico de edição.",
      },
      {
        title: "Storage de mídia",
        description: "Permitir upload e gestão de imagens e vídeos da pousada sem editar caminhos manualmente no painel.",
      },
      {
        title: "Integração de atendimento",
        description: "Conectar formulário, WhatsApp e CRM para centralizar solicitações e retorno comercial.",
      },
    ],
    bookingFlow: [
      {
        step: "01",
        title: "Consulta entra no painel",
        description: "O pedido de hospedagem gera bloqueio provisório e evita choque de datas enquanto a equipe responde.",
      },
      {
        step: "02",
        title: "Equipe valida a solicitação",
        description: "A operação confirma período, categoria e condições comerciais antes de concluir a reserva.",
      },
      {
        step: "03",
        title: "Agenda é atualizada",
        description: "Reservas confirmadas ou canceladas ajustam a disponibilidade e mantêm o calendário consistente.",
      },
    ],
    launchChecklist: [
      "Confirmar canais oficiais de contato e reserva.",
      "Cadastrar categorias reais de hospedagem no painel.",
      "Definir política comercial e de cancelamento.",
      "Migrar reservas para backend e autenticação reais.",
    ],
  },
};
