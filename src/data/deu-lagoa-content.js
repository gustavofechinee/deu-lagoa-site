export const seedContent = {
  version: 7,
  resort: {
    name: "Hotel Resto Deu Lagoa Uruau",
    tagline: "Hotel, restaurante e vista para a lagoa em Uruau.",
    heroTitle: "Hotel, restaurante e lagoa na mesma paisagem.",
    heroCopy:
      "Esta versao publica usa apenas informacoes que puderam ser confirmadas a partir do Instagram oficial e da referencia geografica publica da Lagoa do Uruau. Catalogo detalhado, tarifas e politicas seguem editaveis no painel para homologacao com a pousada.",
    storyTitle: "A marca publica se apresenta como hotel e restaurante com foco na lagoa.",
    storyCopy:
      "O objetivo desta entrega e separar o que ja esta confirmado em fonte publica do que ainda precisa ser preenchido pela operacao. Assim o site fica bonito, vendavel e tecnicamente honesto.",
    location: "Lagoa do Uruau, Beberibe - Ceara",
    reservationPhone: "",
    reservationWhatsapp: "",
    reservationEmail: "",
    checkIn: "sob consulta",
    checkOut: "sob consulta",
    seasonLabel: "Hotel + Restaurante | Lagoa do Uruau",
    sellerCode: "deulagoa2026",
    heroImage: "/deu-lagoa/hero-lagoa-hq.jpg",
    profileImage: "/deu-lagoa/perfil.jpg",
    signatureImage: "/deu-lagoa/resto-noite-hq.jpg",
    culinaryImage: "/deu-lagoa/suite-casal-hq.jpg",
    featureVideo: "/deu-lagoa/lagoa-cinema.mp4",
    featureVideoPoster: "/deu-lagoa/hero-lagoa-hq.jpg",
    instagramHandle: "@deulagoauruau",
    instagramUrl: "https://www.instagram.com/deulagoauruau/",
  },
  stats: [
    { value: "Hotel", label: "o perfil oficial apresenta a marca como hotel" },
    { value: "Resto", label: "o mesmo perfil tambem comunica restaurante" },
    { value: "Lagoa", label: "a vista para a lagoa aparece na bio publica" },
    { value: "Uruau", label: "a referencia territorial da marca e Uruau" },
  ],
  storyPanels: [
    {
      id: "story-1",
      eyebrow: "fonte publica",
      title: "O principal ativo visual confirmado e a lagoa.",
      copy: "A bio oficial fala em vista encantadora da lagoa, e as imagens publicas reforcam essa leitura como centro da experiencia.",
      image: "/deu-lagoa/hero-lagoa-hq.jpg",
    },
    {
      id: "story-2",
      eyebrow: "identidade",
      title: "Hotel e restaurante aparecem juntos na apresentacao da marca.",
      copy: "Isso permite um site institucional mais forte, com reserva assistida e uma narrativa que integra hospedagem e mesa sem inventar detalhes operacionais.",
      image: "/deu-lagoa/resto-noite-hq.jpg",
    },
    {
      id: "story-3",
      eyebrow: "homologacao",
      title: "Tarifas, tipos de quarto e politicas ficam no painel ate validacao da operacao.",
      copy: "A interface publica evita prometer informacoes que nao foram confirmadas e o painel segue pronto para receber o inventario oficial.",
      image: "/deu-lagoa/suite-casal-hq.jpg",
    },
  ],
  suites: [
    {
      slug: "consulta-hospedagem",
      name: "Consulta de hospedagem",
      category: "canal direto",
      rate: 0,
      size: "",
      guests: 0,
      beds: "",
      image: "/deu-lagoa/suite-casal-hq.jpg",
      gallery: ["/deu-lagoa/suite-casal-hq.jpg", "/deu-lagoa/hero-lagoa-hq.jpg", "/deu-lagoa/resto-noite-hq.jpg"],
      summary: "O perfil oficial confirma hospedagem na Deu Lagoa, mas o inventario publico detalhado nao estava disponivel sem login ou contato direto.",
      details:
        "Esta categoria funciona como estrutura institucional para a vitrine. A pousada pode substituir por suites reais, tarifas e regras oficiais diretamente no painel vendedor.",
      amenities: [],
    },
    {
      slug: "consulta-experiencia",
      name: "Experiencia integrada",
      category: "hotel e restaurante",
      rate: 0,
      size: "",
      guests: 0,
      beds: "",
      image: "/deu-lagoa/resto-noite-hq.jpg",
      gallery: ["/deu-lagoa/resto-noite-hq.jpg", "/deu-lagoa/hero-lagoa-hq.jpg", "/deu-lagoa/familia-hq.jpg"],
      summary: "A comunicacao publica posiciona hotel e restaurante como parte da mesma identidade.",
      details:
        "A operacao pode transformar este bloco em pacote, experiencia ou categoria real assim que houver dados homologados sobre consumo, inclusoes e disponibilidade.",
      amenities: [],
    },
  ],
  rituals: [
    {
      title: "Fonte publica primeiro",
      copy: "Tudo que aparece como fato na vitrine precisa estar sustentado por fonte publica ou validacao direta da pousada.",
    },
    {
      title: "Painel separado",
      copy: "Dados operacionais ficam no vendedor para serem preenchidos e aprovados sem contaminar a area publica com suposicoes.",
    },
    {
      title: "Reserva com bloqueio",
      copy: "O sistema ja trata pendencia, confirmacao e cancelamento para evitar sobreposicao de datas na mesma categoria cadastrada.",
    },
  ],
  experiences: [
    {
      id: "exp-1",
      name: "Hotel e Restaurante",
      duration: "bio oficial",
      description: "O perfil publico apresenta a marca como hotel e restaurante.",
    },
    {
      id: "exp-2",
      name: "Vista encantadora da lagoa",
      duration: "bio oficial",
      description: "A lagoa aparece como elemento central da experiencia comunicada publicamente.",
    },
    {
      id: "exp-3",
      name: "Experiencias, sabores e conforto",
      duration: "bio oficial",
      description: "Essa e a frase publica que resume a promessa atual da marca no Instagram.",
    },
    {
      id: "exp-4",
      name: "Reservas e mais informacoes",
      duration: "bio oficial",
      description: "O perfil indica canal de reservas, mas sem exibir publicamente telefone e e-mail completos nesta verificacao.",
    },
  ],
  itinerary: [
    {
      time: "perfil",
      title: "Hotel e restaurante",
      description: "A apresentacao publica deixa claro que hospedagem e mesa fazem parte da mesma oferta.",
    },
    {
      time: "bio",
      title: "Vista para a lagoa",
      description: "A lagoa e o principal ativo territorial identificado na comunicacao oficial observada em 02 de abril de 2026.",
    },
    {
      time: "bio",
      title: "Experiencias, sabores e conforto",
      description: "A mensagem publica trabalha atmosfera e experiencia, sem detalhar ainda catalogo ou politicas comerciais.",
    },
    {
      time: "site",
      title: "Pre-reserva assistida",
      description: "O fluxo do site registra interesse, bloqueia datas e prepara o terreno para a confirmacao da equipe.",
    },
  ],
  testimonials: [
    {
      quote: "Hotel e Restaurante",
      author: "bio oficial",
    },
    {
      quote: "Vista encantadora da lagoa",
      author: "bio oficial",
    },
    {
      quote: "Experiencias, sabores e conforto",
      author: "bio oficial",
    },
  ],
  faq: [
    {
      question: "As tarifas mostradas no site ja sao oficiais?",
      answer: "Nao. Esta versao publica evita expor precos nao confirmados. O painel vendedor esta pronto para cadastrar valores reais assim que a pousada homologar o catalogo.",
    },
    {
      question: "A reserva e confirmada automaticamente?",
      answer: "Nao. O site registra uma pre-reserva, bloqueia datas em status pendente e encaminha o atendimento para confirmacao final.",
    },
    {
      question: "Quais dados foram realmente validados?",
      answer: "Nome do perfil, handle, bio publica e o vinculo territorial com a Lagoa do Uruau em Beberibe. Contatos e politicas seguem pendentes de validacao direta.",
    },
    {
      question: "O painel ja esta pronto para operacao real?",
      answer: "A interface e o fluxo estao prontos. Para producao, o proximo passo e ligar o sistema a um backend com autenticacao e banco SQL.",
    },
  ],
  policies: [
    "Somente fatos publicos verificados entram na vitrine por padrao.",
    "Contatos, tarifas e politicas oficiais devem ser homologados no painel.",
    "Pre-reserva no site nao substitui confirmacao final da equipe.",
    "Instagram oficial e a fonte publica principal validada nesta entrega.",
  ],
  instagramPosts: [
    {
      id: "ig-1",
      image: "/deu-lagoa/hero-lagoa-hq.jpg",
      caption: "Imagem publica usada para reforcar a lagoa como eixo visual da marca.",
    },
    {
      id: "ig-2",
      image: "/deu-lagoa/resto-noite-hq.jpg",
      caption: "Imagem publica alinhada ao posicionamento de hotel e restaurante.",
    },
    {
      id: "ig-3",
      image: "/deu-lagoa/suite-casal-hq.jpg",
      caption: "Imagem publica de ambiente de hospedagem, sem inventario detalhado associado.",
    },
    {
      id: "ig-4",
      image: "/deu-lagoa/familia-hq.jpg",
      caption: "Imagem publica de convivencia usada para sustentar a leitura de experiencia e conforto.",
    },
    {
      id: "ig-5",
      image: "/deu-lagoa/inauguracao-hq.jpg",
      caption: "Imagem publica institucional reaproveitada como material de marca.",
    },
    {
      id: "ig-6",
      image: "/deu-lagoa/lagoa.jpg",
      caption: "Imagem publica de paisagem usada para reforcar a narrativa territorial.",
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
        description: "Frontend institucional com painel vendedor separado da vitrine publica.",
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
        title: "Pre-reserva",
        description: "O comprador envia interesse com nome, contato, categoria e periodo desejado.",
      },
      {
        step: "02",
        title: "Bloqueio temporario",
        description: "Status pendente e confirmado impedem dupla venda no mesmo intervalo cadastrado.",
      },
      {
        step: "03",
        title: "Homologacao operacional",
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
    persistence: "localStorage-demo",
  },
};
