import { seedContent } from "../data/deu-lagoa-content.js";
import { getReservationMetrics, getUpcomingBlockedWindows, hasReservationConflict, normalizeReservation, reservationBlocks } from "../utils/availability.js";
import { createReservationSummary, formatCurrency, formatDateLabel, formatDateRange, formatGuests, formatReservationStatus, h } from "../utils/format.js";
import { ensureContent, resetContent, writeContent } from "../utils/storage.js";

const app = document.querySelector("#app");
const SESSION_KEY = "deu_lagoa_seller_session_v1";

const state = {
  content: ensureContent(),
  route: parseRoute(),
  menuOpen: false,
  activeSuite: "",
  activeGalleryIndex: 0,
  openFaq: "",
  notice: "",
  booking: {
    suite: "",
    checkin: "2026-04-10",
    checkout: "2026-04-13",
    guests: 2,
    guestName: "",
    guestContact: "",
    guestEmail: "",
    notes: "",
  },
  seller: {
    suiteEditSlug: "",
    experienceEditId: "",
    instagramEditId: "",
    reservationEditId: "",
  },
};

let revealObserver;
let noticeTimer = 0;

init();

function init() {
  syncSelections();
  if (!location.hash) location.hash = "/comprador";
  render();
  app.addEventListener("click", onClick);
  app.addEventListener("input", onInput);
  app.addEventListener("change", onChange);
  app.addEventListener("submit", onSubmit);
  window.addEventListener("hashchange", onRouteChange);
  window.addEventListener("keydown", onKeydown);
  window.addEventListener("scroll", syncHeader, { passive: true });
  window.addEventListener("pointermove", updatePointerGlow, { passive: true });
}

function parseRoute() {
  const clean = location.hash.replace(/^#/, "") || "/comprador";
  const parts = clean.split("/").filter(Boolean);
  if (parts[0] === "vendedor") {
    return {
      name: "seller",
      tab: ["suites", "experiencias", "reservas", "midia", "config", "operacao"].includes(parts[1]) ? parts[1] : "login",
    };
  }
  return { name: "buyer" };
}

function onRouteChange() {
  state.route = parseRoute();
  state.menuOpen = false;
  syncSelections();
  render();
}

function render() {
  state.content = ensureContent();
  syncSelections();
  app.innerHTML = `
    <div class="resort-page">
      ${state.route.name === "buyer" ? tplBuyerPage() : tplSellerPage()}
      ${tplNotice()}
    </div>
  `;
  bindReveal();
  syncHeader();
}

function tplBuyerPage() {
  const resort = state.content.resort;
  const activeSuite = getActiveSuite();
  const summary = getBookingSummary();

  return `
    ${tplBuyerHeader()}
    <main class="page-main">
      ${tplHero(resort, activeSuite, summary)}
      ${tplReservationStudio(resort, activeSuite, summary)}
      ${tplBrandStory(resort)}
      ${tplStats()}
      ${tplBookingFlow()}
      ${tplAuditStrip()}
      ${tplSuites(activeSuite)}
      ${tplCinema(resort)}
      ${tplRituals()}
      ${tplExperienceGrid()}
      ${tplInstagram()}
      ${tplStayTimeline()}
      ${tplTestimonials()}
      ${tplFaq()}
      ${tplFinalCta(resort, activeSuite, summary)}
    </main>
    ${tplMobileDock()}
    ${tplSiteFooter()}
  `;
}

function tplBuyerHeader() {
  const resort = state.content.resort;
  return `
    <header class="site-header ${state.menuOpen ? "menu-open" : ""}">
      <a class="brand-lockup" href="#topo">
        <span class="brand-orb"></span>
        <span class="brand-copy">
          <strong>${h(resort.name)}</strong>
          <small>${h(resort.location)}</small>
        </span>
      </a>
      <button type="button" class="menu-toggle" data-action="toggle-menu" aria-label="Abrir menu">
        <span></span>
        <span></span>
      </button>
      <nav class="site-nav ${state.menuOpen ? "open" : ""}">
        <a href="#historia">Historia</a>
        <a href="#suites">Suites</a>
        <a href="#video">Video</a>
        <a href="#experiencias">Experiencias</a>
        <a href="#instagram">Instagram</a>
        <a href="#faq">FAQ</a>
      </nav>
      <div class="header-actions">
        <a class="header-subtle" href="${h(resort.instagramUrl)}" target="_blank" rel="noreferrer noopener">${h(resort.instagramHandle)}</a>
        <a class="header-button" href="#reserva">Consultar reserva</a>
      </div>
    </header>
  `;
}

function tplHero(resort, activeSuite, summary) {
  return `
    <section class="hero-section" id="topo">
      <div class="hero-backdrop" style="background-image: linear-gradient(120deg, rgba(6, 15, 20, 0.72), rgba(5, 12, 18, 0.34)), url('${h(resort.heroImage)}');"></div>
      <div class="hero-overlay"></div>
      <div class="hero-content reveal">
        <p class="kicker">${h(resort.seasonLabel)}</p>
        <h1>${h(resort.heroTitle)}</h1>
        <p class="hero-lead">${h(resort.heroCopy)}</p>
        <div class="hero-meta-row">
          <div class="hero-meta-block"><span>check-in</span><strong>${h(resort.checkIn)}</strong></div>
          <div class="hero-meta-block"><span>check-out</span><strong>${h(resort.checkOut)}</strong></div>
          <div class="hero-meta-block"><span>localizacao</span><strong>${h(resort.location)}</strong></div>
        </div>
        <div class="hero-action-row">
          <a class="button-primary" href="#suites">Explorar suites</a>
          <a class="button-secondary" href="${h(getPrimaryContactHref())}" target="_blank" rel="noreferrer noopener">${h(getPrimaryContactLabel())}</a>
        </div>
        <div class="hero-proof-strip">
          <span>fonte publica auditada</span>
          <span>reserva assistida</span>
          <span>painel vendedor separado</span>
        </div>
      </div>
    </section>
  `;
}

function tplReservationStudio(resort, activeSuite, summary) {
  const availability = getBookingAvailability(activeSuite);
  const blockedWindows = getUpcomingBlockedWindows(state.content, activeSuite.slug, 3);
  const contactPending = !resort.reservationWhatsapp && !resort.reservationEmail;
  return `
    <section class="reservation-studio section-shell" id="reserva">
      <div class="reservation-studio-shell">
        <div class="reservation-studio-copy reveal">
          <p class="kicker">reserva assistida</p>
          <h2>Consulta de hospedagem com bloqueio de datas e triagem comercial.</h2>
          <p>A vitrine publica apresenta a marca. A secao abaixo transforma interesse em pre-reserva, registra contato e impede conflito de agenda na mesma categoria cadastrada.</p>
          <div class="reservation-side-image">
            <img src="${h(activeSuite.image || resort.signatureImage)}" alt="${h(activeSuite.name)}" />
          </div>
        </div>
        <aside class="booking-panel reveal">
          <div class="booking-panel-head">
            <p class="kicker">pre-reserva</p>
            <h2>Monte sua estadia</h2>
          </div>
          <form class="booking-form" id="booking-form">
            <label class="field-block">
              <span>Suite</span>
              <select name="suite">
                ${state.content.suites
                  .map((suite) => `<option value="${h(suite.slug)}" ${suite.slug === state.booking.suite ? "selected" : ""}>${h(suite.name)}</option>`)
                  .join("")}
              </select>
            </label>
            <div class="field-grid">
              <label class="field-block"><span>Check-in</span><input type="date" name="checkin" value="${h(state.booking.checkin)}" /></label>
              <label class="field-block"><span>Check-out</span><input type="date" name="checkout" value="${h(state.booking.checkout)}" /></label>
            </div>
            <label class="field-block">
              <span>Hospedes</span>
              <select name="guests">
                ${[1, 2, 3, 4, 5]
                  .map((guest) => `<option value="${guest}" ${Number(state.booking.guests) === guest ? "selected" : ""}>${guest} ${guest === 1 ? "hospede" : "hospedes"}</option>`)
                  .join("")}
              </select>
            </label>
            <div class="field-grid">
              <label class="field-block"><span>Seu nome</span><input name="guestName" value="${h(state.booking.guestName)}" placeholder="Nome do responsavel" /></label>
              <label class="field-block"><span>Contato</span><input name="guestContact" value="${h(state.booking.guestContact)}" placeholder="WhatsApp ou telefone" /></label>
            </div>
            <label class="field-block"><span>E-mail</span><input type="email" name="guestEmail" value="${h(state.booking.guestEmail)}" placeholder="email@exemplo.com" /></label>
            <label class="field-block"><span>Observacoes</span><textarea name="notes" placeholder="Horário de chegada, pacote, pedido especial...">${h(state.booking.notes)}</textarea></label>
            <div class="booking-summary-card">
              <div class="booking-brand">
                <img src="${h(resort.profileImage)}" alt="${h(resort.name)}" />
                <span>${h(resort.instagramHandle)}</span>
              </div>
              <div><small>categoria sugerida</small><strong>${h(activeSuite.name)}</strong></div>
              <div><small>faixa tarifaria</small><strong>${h(getRateLabel(activeSuite.rate))}</strong></div>
              <div><small>estimativa</small><strong>${h(getEstimateLabel(summary, activeSuite))}</strong></div>
              <div class="availability-badge ${availability.available ? "available" : availability.status === "invalid" ? "pending" : "unavailable"}">
                <small>${h(availability.label)}</small>
                <strong>${h(availability.detail)}</strong>
              </div>
              ${
                blockedWindows.length
                  ? `
                    <div class="blocked-window-list">
                      <small>janelas ja bloqueadas</small>
                      ${blockedWindows
                        .map((reservation) => `<span>${h(formatDateRange(reservation.checkin, reservation.checkout))}</span>`)
                        .join("")}
                    </div>
                  `
                  : `
                    <div class="blocked-window-list">
                      <small>agenda atual</small>
                      <span>Sem bloqueios cadastrados para esta suite.</span>
                    </div>
                  `
              }
              ${
                contactPending
                  ? `
                    <div class="booking-operational-note">
                      <small>canal oficial em homologacao</small>
                      <strong>O envio segue para o Instagram oficial ate a pousada validar WhatsApp e e-mail no painel.</strong>
                    </div>
                  `
                  : ""
              }
            </div>
            <button type="submit" class="booking-submit">Registrar pre-reserva</button>
          </form>
        </aside>
      </div>
    </section>
  `;
}

function tplBrandStory(resort) {
  const [leadPanel, ...supportPanels] = state.content.storyPanels;
  return `
    <section class="story-section section-shell" id="historia">
      <div class="story-shell reveal">
        <div class="story-copy">
          <p class="kicker">a casa</p>
          <h2>${h(resort.storyTitle)}</h2>
          <p>${h(resort.storyCopy)}</p>
          <div class="policy-list">${state.content.policies.map((item) => `<span>${h(item)}</span>`).join("")}</div>
        </div>
        <article class="story-feature">
          <img src="${h(leadPanel.image)}" alt="${h(leadPanel.title)}" />
          <div class="story-feature-copy">
            <small>${h(leadPanel.eyebrow)}</small>
            <strong>${h(leadPanel.title)}</strong>
            <p>${h(leadPanel.copy)}</p>
          </div>
        </article>
      </div>
      <div class="story-grid">
        ${supportPanels
          .map(
            (panel) => `
              <article class="story-card reveal">
                <img src="${h(panel.image)}" alt="${h(panel.title)}" />
                <div>
                  <small>${h(panel.eyebrow)}</small>
                  <strong>${h(panel.title)}</strong>
                  <p>${h(panel.copy)}</p>
                </div>
              </article>
            `,
          )
          .join("")}
      </div>
    </section>
  `;
}

function tplStats() {
  return `
    <section class="stats-section section-shell">
      <div class="stats-grid">
        ${state.content.stats
          .map((item) => {
            const rawValue = String(item.value);
            const counterAttr = /\d/.test(rawValue) ? ` data-counter="${h(rawValue)}"` : "";
            return `<article class="stat-card reveal"><strong${counterAttr}>${h(rawValue)}</strong><span>${h(item.label)}</span></article>`;
          })
          .join("")}
      </div>
    </section>
  `;
}

function tplBookingFlow() {
  return `
    <section class="ops-section section-shell" id="operacao-reserva">
      <div class="section-heading reveal">
        <p class="kicker">reserva e operação</p>
        <h2>Um fluxo mais seguro para vender a pousada sem gerar conflito de agenda.</h2>
        <p>O comprador deixa a pré-reserva no site, o painel registra o lead e as datas passam a respeitar o status operacional definido pela equipe.</p>
      </div>
      <div class="ops-grid">
        ${state.content.ops.bookingFlow
          .map(
            (item) => `
              <article class="ops-card reveal">
                <small>${h(item.step)}</small>
                <strong>${h(item.title)}</strong>
                <p>${h(item.description)}</p>
              </article>
            `,
          )
          .join("")}
      </div>
    </section>
  `;
}

function tplAuditStrip() {
  const verification = state.content.verification;
  return `
    <section class="audit-strip section-shell">
      <div class="audit-strip-shell reveal">
        <div class="audit-strip-copy">
          <p class="kicker">auditoria publica</p>
          <h2>Conteudo revisado para nao vender dado inventado.</h2>
          <p>Informacoes publicas verificadas em ${h(verification.checkedAt)}. O restante ficou no painel vendedor como dado operacional a ser homologado pela pousada.</p>
        </div>
        <div class="audit-strip-tags">
          ${verification.verifiedFacts.map((fact) => `<span>${h(fact.sourceLabel)}</span>`).join("")}
        </div>
      </div>
    </section>
  `;
}

function tplSuites(activeSuite) {
  const suiteFacts = getSuiteFacts(activeSuite);
  const hasAmenities = Array.isArray(activeSuite.amenities) && activeSuite.amenities.length > 0;
  return `
    <section class="suite-section section-shell" id="suites">
      <div class="section-heading reveal">
        <p class="kicker">hospedagem e ambientes</p>
        <h2>Vitrine publica com imagens reais e catalogo pronto para receber os dados oficiais da pousada.</h2>
        <p>Enquanto o inventario final nao e homologado pela operacao, a area abaixo trabalha com uma categoria institucional e direciona a pessoa para consulta direta de disponibilidade.</p>
      </div>
      <div class="suite-layout">
        <div class="suite-list reveal">
          ${state.content.suites
            .map(
              (suite) => `<button type="button" class="suite-chip ${suite.slug === state.activeSuite ? "active" : ""}" data-suite="${h(suite.slug)}"><small>${h(suite.category)}</small><strong>${h(suite.name)}</strong><span>${h(getRateLabel(suite.rate))}</span></button>`,
            )
            .join("")}
        </div>
        <article class="suite-stage reveal">
          <div class="suite-stage-media"><img src="${h(activeSuite.gallery[state.activeGalleryIndex] || activeSuite.image)}" alt="${h(activeSuite.name)}" /></div>
          <div class="suite-stage-copy">
            <p class="kicker">${h(activeSuite.category)}</p>
            <h3>${h(activeSuite.name)}</h3>
            ${suiteFacts.length ? `<div class="suite-facts">${suiteFacts.map((item) => `<span>${h(item)}</span>`).join("")}</div>` : ""}
            <p class="suite-summary">${h(activeSuite.summary)}</p>
            <p>${h(activeSuite.details)}</p>
            ${hasAmenities ? `<div class="amenity-cluster">${activeSuite.amenities.map((item) => `<span>${h(item)}</span>`).join("")}</div>` : ""}
            <div class="gallery-strip">
              ${activeSuite.gallery
                .map(
                  (image, index) => `<button type="button" class="gallery-thumb ${index === state.activeGalleryIndex ? "active" : ""}" data-gallery-index="${index}"><img src="${h(image)}" alt="${h(activeSuite.name)} ${index + 1}" /></button>`,
                )
                .join("")}
            </div>
          </div>
        </article>
      </div>
    </section>
  `;
}

function tplCinema(resort) {
  return `
    <section class="cinema-section section-shell" id="video">
      <div class="cinema-shell reveal">
        <div class="cinema-copy">
          <p class="kicker">video</p>
          <h2>O ritmo da pousada fica melhor quando entra em movimento.</h2>
          <p>O video reforca o que mais converte para a marca: agua, quartos, mesa e um tipo de fim de semana que parece muito mais simples de decidir.</p>
          <div class="hero-action-row">
            <a class="button-primary" href="${h(getPrimaryContactHref())}" target="_blank" rel="noreferrer noopener">${h(getPrimaryContactLabel())}</a>
            <a class="button-secondary" href="${h(resort.instagramUrl)}" target="_blank" rel="noreferrer noopener">Ver reels da marca</a>
          </div>
        </div>
        <div class="cinema-frame">
          <video autoplay muted loop playsinline preload="metadata" poster="${h(resort.featureVideoPoster)}">
            <source src="${h(resort.featureVideo)}" type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  `;
}

function tplRituals() {
  return `
    <section class="ritual-section section-shell" id="rituais">
      <div class="ritual-layout">
        <div class="ritual-copy reveal">
          <p class="kicker">leitura institucional</p>
          <h2>O site agora diferencia claramente fato publico, conteudo operacional e cadastro pendente.</h2>
          <p>Isso evita apresentar como real o que ainda nao foi validado diretamente com a pousada e deixa a interface pronta para receber inventario oficial, contatos e politicas comerciais.</p>
          <div class="policy-list">${state.content.policies.map((item) => `<span>${h(item)}</span>`).join("")}</div>
        </div>
        <div class="ritual-cards reveal">
          ${state.content.rituals.map((ritual, index) => `<article class="ritual-card ritual-card-${index + 1}"><strong>${h(ritual.title)}</strong><p>${h(ritual.copy)}</p></article>`).join("")}
        </div>
      </div>
    </section>
  `;
}

function tplExperienceGrid() {
  return `
    <section class="experience-section section-shell" id="experiencias">
      <div class="section-heading reveal">
        <p class="kicker">sinais publicos da marca</p>
        <h2>O que a comunicacao publica confirma hoje sobre a Deu Lagoa.</h2>
      </div>
      <div class="experience-grid">
        ${state.content.experiences
          .map((item) => `<article class="experience-card reveal"><div class="experience-card-top"><small>${h(item.duration)}</small><span></span></div><h3>${h(item.name)}</h3><p>${h(item.description)}</p></article>`)
          .join("")}
      </div>
    </section>
  `;
}

function tplInstagram() {
  const resort = state.content.resort;
  return `
    <section class="instagram-section section-shell" id="instagram">
      <div class="section-heading reveal">
        <p class="kicker">instagram</p>
        <h2>Uma parede visual para sustentar a marca entre reserva, menu e atmosfera.</h2>
        <p>Os enquadramentos abaixo organizam o que a Deu Lagoa vende melhor: paisagem, mesa, quartos e datas que pedem permanencia.</p>
      </div>
      <div class="instagram-grid">
        ${state.content.instagramPosts
          .map(
            (post, index) => `
              <article class="instagram-card instagram-card-${(index % 3) + 1} reveal">
                <img src="${h(post.image)}" alt="${h(post.caption)}" />
                <div>
                  <small>${h(resort.instagramHandle)}</small>
                  <p>${h(post.caption)}</p>
                </div>
              </article>
            `,
          )
          .join("")}
      </div>
      <div class="instagram-footer reveal">
        <a class="button-secondary" href="${h(resort.instagramUrl)}" target="_blank" rel="noreferrer noopener">Ver perfil completo</a>
      </div>
    </section>
  `;
}

function tplStayTimeline() {
  return `
    <section class="timeline-section section-shell">
      <div class="section-heading reveal">
        <p class="kicker">fonte publica</p>
        <h2>Pontos que aparecem de forma direta no perfil oficial da marca.</h2>
      </div>
      <div class="timeline-grid">
        ${state.content.itinerary.map((item) => `<article class="timeline-card reveal"><small>${h(item.time)}</small><h3>${h(item.title)}</h3><p>${h(item.description)}</p></article>`).join("")}
      </div>
    </section>
  `;
}

function tplTestimonials() {
  return `
    <section class="testimonial-section section-shell">
      <div class="section-heading reveal">
        <p class="kicker">mensagem publica</p>
        <h2>Frases curtas baseadas no posicionamento que hoje pode ser comprovado.</h2>
      </div>
      <div class="testimonial-grid">
        ${state.content.testimonials.map((item) => `<article class="testimonial-card reveal"><p>${h(item.quote)}</p><strong>${h(item.author)}</strong></article>`).join("")}
      </div>
    </section>
  `;
}

function tplFaq() {
  return `
    <section class="faq-section section-shell" id="faq">
      <div class="section-heading reveal">
        <p class="kicker">faq</p>
        <h2>Informacoes objetivas para acelerar a decisao de reserva.</h2>
      </div>
      <div class="faq-stack reveal">
        ${state.content.faq
          .map(
            (item) => `<article class="faq-item ${state.openFaq === item.question ? "open" : ""}"><button type="button" class="faq-question" data-faq="${h(item.question)}"><span>${h(item.question)}</span><strong>${state.openFaq === item.question ? "-" : "+"}</strong></button><div class="faq-answer"><p>${h(item.answer)}</p></div></article>`,
          )
          .join("")}
      </div>
    </section>
  `;
}

function tplFinalCta(resort, activeSuite, summary) {
  const contactLinks = getContactLinks();
  return `
    <section class="final-cta section-shell">
      <div class="final-cta-card reveal">
        <div class="final-cta-copy">
          <p class="kicker">reserva e contato</p>
          <h2>Se a data estiver definida, o sistema registra a pre-reserva e encaminha o atendimento para confirmacao final.</h2>
          <p>${h(resort.tagline)}</p>
          <div class="contact-rail">${contactLinks.map((item) => `<a class="contact-link" href="${h(item.href)}" ${item.external ? 'target="_blank" rel="noreferrer noopener"' : ""}>${h(item.label)}</a>`).join("")}</div>
        </div>
        <div class="final-cta-summary">
          <small>pre-reserva</small>
          <strong>${h(activeSuite.name)}</strong>
          <span>${h(formatDateLabel(state.booking.checkin))} - ${h(formatDateLabel(state.booking.checkout))}</span>
          <span>${h(formatGuests(state.booking.guests))}</span>
          <b>${h(getEstimateLabel(summary, activeSuite))}</b>
        </div>
      </div>
    </section>
  `;
}

function tplSiteFooter() {
  const resort = state.content.resort;
  const verification = state.content.verification;
  return `
    <footer class="site-footer section-shell">
      <div class="site-footer-shell">
        <div class="site-footer-brand">
          <strong>${h(resort.name)}</strong>
          <p>${h(resort.location)}</p>
        </div>
        <div class="site-footer-meta">
          <span>Auditoria publica: ${h(verification.checkedAt)}</span>
          <a href="${h(resort.instagramUrl)}" target="_blank" rel="noreferrer noopener">${h(resort.instagramHandle)}</a>
        </div>
      </div>
    </footer>
  `;
}

function tplMobileDock() {
  const resort = state.content.resort;
  return `
    <div class="mobile-dock" aria-label="Acoes rapidas">
      <a class="mobile-dock-link" href="#reserva">Reserva</a>
      <a class="mobile-dock-link" href="${h(resort.instagramUrl)}" target="_blank" rel="noreferrer noopener">Instagram</a>
    </div>
  `;
}

function tplSellerPage() {
  const metrics = getReservationMetrics(state.content);
  if (!isSellerLogged()) return tplSellerLogin();
  return `
    ${tplSellerHeader()}
    <main class="seller-main section-shell seller-shell">
      <section class="seller-kpis reveal">
        <article><strong>${state.content.suites.length}</strong><span>suites cadastradas</span></article>
        <article><strong>${metrics.activeCount}</strong><span>reservas bloqueando agenda</span></article>
        <article><strong>${metrics.pendingCount}</strong><span>pre-reservas pendentes</span></article>
        <article><strong>${h(getAverageRateLabel())}</strong><span>faixa media cadastrada</span></article>
        <article><strong>${metrics.occupancyRate}%</strong><span>ocupacao projetada em 90 dias</span></article>
        <article><strong>${h(state.content.resort.location)}</strong><span>operacao atual</span></article>
      </section>
      ${tplSellerHeroStrip(metrics)}
      ${state.route.tab === "experiencias"
        ? tplSellerExperiences()
        : state.route.tab === "reservas"
          ? tplSellerReservations()
        : state.route.tab === "midia"
          ? tplSellerMedia()
          : state.route.tab === "config"
            ? tplSellerConfig()
            : state.route.tab === "operacao"
              ? tplSellerOperations()
              : tplSellerSuites()}
    </main>
  `;
}

function tplSellerHeader() {
  return `
    <header class="site-header seller-header ${state.menuOpen ? "menu-open" : ""}">
      <a class="brand-lockup" href="#/comprador">
        <span class="brand-orb"></span>
        <span class="brand-copy"><strong>${h(state.content.resort.name)}</strong><small>painel do vendedor</small></span>
      </a>
      <button type="button" class="menu-toggle" data-action="toggle-menu" aria-label="Abrir menu"><span></span><span></span></button>
      <nav class="site-nav ${state.menuOpen ? "open" : ""}">
        <a class="${state.route.tab === "suites" ? "active" : ""}" href="#/vendedor/suites">Suites</a>
        <a class="${state.route.tab === "experiencias" ? "active" : ""}" href="#/vendedor/experiencias">Experiencias</a>
        <a class="${state.route.tab === "reservas" ? "active" : ""}" href="#/vendedor/reservas">Reservas</a>
        <a class="${state.route.tab === "midia" ? "active" : ""}" href="#/vendedor/midia">Midia</a>
        <a class="${state.route.tab === "config" ? "active" : ""}" href="#/vendedor/config">Configuracoes</a>
        <a class="${state.route.tab === "operacao" ? "active" : ""}" href="#/vendedor/operacao">Operacao</a>
      </nav>
      <div class="header-actions"><a class="header-subtle" href="#/comprador">Ver comprador</a><button type="button" class="header-button seller-logout" data-action="logout-seller">Sair</button></div>
    </header>
  `;
}

function tplSellerLogin() {
  return `
    <main class="seller-login-shell section-shell">
      <section class="seller-login-card reveal">
        <p class="kicker">area do vendedor</p>
        <h1>Painel da pousada</h1>
        <p>Edite suites, experiências, reservas, mídia e configurações sem misturar a operação com a vitrine do comprador.</p>
        <form id="seller-login-form" class="seller-login-form">
          <label class="field-block"><span>Codigo de acesso</span><input type="password" name="sellerCode" placeholder="Digite o codigo do vendedor" required /></label>
          <button type="submit" class="booking-submit">Entrar no painel</button>
        </form>
      </section>
    </main>
  `;
}

function tplSellerHeroStrip(metrics) {
  return `
    <section class="seller-hero-strip reveal">
      <article>
        <small>reservas</small>
        <strong>${metrics.reservationCount}</strong>
        <p>Total registrado no sistema demo.</p>
      </article>
      <article>
        <small>stack</small>
        <strong>Postgres-ready</strong>
        <p>Schema e checklist de produção já incluídos no projeto.</p>
      </article>
      <article>
        <small>status público</small>
        <strong>fontes validadas</strong>
        <p>Instagram oficial e localização pública conferidos em 02/04/2026.</p>
      </article>
    </section>
  `;
}

function getRateLabel(rate) {
  const numeric = Number(rate || 0);
  return numeric > 0 ? `${formatCurrency(numeric)} / noite` : "valor sob consulta";
}

function getEstimateLabel(summary, suite) {
  if (!summary.valid) return "Selecione datas validas";
  return Number(suite?.rate || 0) > 0 ? `${summary.nights} noites | ${formatCurrency(summary.total)}` : "Equipe confirma valores na resposta";
}

function getSuiteFacts(suite) {
  const items = [];
  if (suite?.size) items.push(suite.size);
  if (suite?.beds) items.push(suite.beds);
  if (Number(suite?.guests || 0) > 0) items.push(formatGuests(suite.guests));
  return items;
}

function tplSellerSuites() {
  const editSuite = getSellerSuite();
  return `
    <section class="seller-grid reveal">
      <article class="seller-panel seller-panel-list">
        <div class="seller-panel-head"><div><small>cadastro</small><h2>Suites e casas</h2></div><button type="button" class="seller-link-button" data-action="new-suite">Nova suite</button></div>
        <div class="seller-list">
          ${state.content.suites
            .map(
              (suite) => `<button type="button" class="seller-card ${suite.slug === state.seller.suiteEditSlug ? "active" : ""}" data-edit-suite="${h(suite.slug)}"><div><strong>${h(suite.name)}</strong><span>${h(suite.category)}</span></div><small>${h(formatCurrency(suite.rate))}</small></button>`,
            )
            .join("")}
        </div>
      </article>
      <article class="seller-panel seller-panel-form">
        <div class="seller-panel-head"><div><small>edicao</small><h2>${h(editSuite.name || "Nova suite")}</h2></div>${editSuite.slug ? `<button type="button" class="seller-link-button danger-link" data-action="delete-suite" data-suite="${h(editSuite.slug)}">Excluir</button>` : ""}</div>
        ${tplSellerSuitePreview(editSuite)}
        <form class="seller-form" id="seller-suite-form">
          <input type="hidden" name="slug" value="${h(editSuite.slug || "")}" />
          <div class="seller-two-col"><label class="field-block"><span>Nome</span><input name="name" value="${h(editSuite.name || "")}" required /></label><label class="field-block"><span>Categoria</span><input name="category" value="${h(editSuite.category || "")}" required /></label></div>
          <div class="seller-four-col"><label class="field-block"><span>Diaria</span><input type="number" min="0" name="rate" value="${h(editSuite.rate || 0)}" required /></label><label class="field-block"><span>Tamanho</span><input name="size" value="${h(editSuite.size || "")}" required /></label><label class="field-block"><span>Hospedes</span><input type="number" min="1" name="guests" value="${h(editSuite.guests || 2)}" required /></label><label class="field-block"><span>Camas</span><input name="beds" value="${h(editSuite.beds || "")}" required /></label></div>
          <label class="field-block"><span>Imagem principal</span><input name="image" value="${h(editSuite.image || "")}" required /></label>
          <label class="field-block"><span>Resumo</span><textarea name="summary" required>${h(editSuite.summary || "")}</textarea></label>
          <label class="field-block"><span>Descricao completa</span><textarea name="details" required>${h(editSuite.details || "")}</textarea></label>
          <label class="field-block"><span>Amenidades (uma por linha)</span><textarea name="amenities" required>${h((editSuite.amenities || []).join("\n"))}</textarea></label>
          <label class="field-block"><span>Galeria (uma URL por linha)</span><textarea name="gallery" required>${h((editSuite.gallery || []).join("\n"))}</textarea></label>
          <button type="submit" class="booking-submit">Salvar suite</button>
        </form>
      </article>
    </section>
  `;
}

function tplSellerExperiences() {
  const editExperience = getSellerExperience();
  return `
    <section class="seller-grid reveal">
      <article class="seller-panel seller-panel-list">
        <div class="seller-panel-head"><div><small>programacao</small><h2>Experiencias</h2></div><button type="button" class="seller-link-button" data-action="new-experience">Nova experiencia</button></div>
        <div class="seller-list">
          ${state.content.experiences
            .map(
              (item) => `<button type="button" class="seller-card ${item.id === state.seller.experienceEditId ? "active" : ""}" data-edit-experience="${h(item.id)}"><div><strong>${h(item.name)}</strong><span>${h(item.description)}</span></div><small>${h(item.duration)}</small></button>`,
            )
            .join("")}
        </div>
      </article>
      <article class="seller-panel seller-panel-form">
        <div class="seller-panel-head"><div><small>edicao</small><h2>${h(editExperience.name || "Nova experiencia")}</h2></div>${editExperience.id ? `<button type="button" class="seller-link-button danger-link" data-action="delete-experience" data-id="${h(editExperience.id)}">Excluir</button>` : ""}</div>
        <form class="seller-form" id="seller-experience-form">
          <input type="hidden" name="id" value="${h(editExperience.id || "")}" />
          <div class="seller-two-col"><label class="field-block"><span>Nome</span><input name="name" value="${h(editExperience.name || "")}" required /></label><label class="field-block"><span>Duracao</span><input name="duration" value="${h(editExperience.duration || "")}" required /></label></div>
          <label class="field-block"><span>Descricao</span><textarea name="description" required>${h(editExperience.description || "")}</textarea></label>
          <button type="submit" class="booking-submit">Salvar experiencia</button>
        </form>
      </article>
    </section>
  `;
}

function tplSellerReservations() {
  const editReservation = getSellerReservation();
  const reservations = [...(state.content.reservations || [])].sort((left, right) => String(right.createdAt || "").localeCompare(String(left.createdAt || "")));
  return `
    <section class="seller-grid reveal">
      <article class="seller-panel seller-panel-list">
        <div class="seller-panel-head"><div><small>agenda</small><h2>Reservas e bloqueios</h2></div><button type="button" class="seller-link-button" data-action="new-reservation">Nova reserva</button></div>
        <div class="seller-list">
          ${
            reservations.length
              ? reservations
                  .map((reservation) => {
                    const suite = getSuiteBySlug(reservation.suiteSlug);
                    return `<button type="button" class="seller-card ${reservation.id === state.seller.reservationEditId ? "active" : ""}" data-edit-reservation="${h(reservation.id)}"><div><strong>${h(reservation.guestName || "Sem nome")}</strong><span>${h(suite?.name || reservation.suiteSlug)}</span></div><small>${h(formatReservationStatus(reservation.status))}</small></button>`;
                  })
                  .join("")
              : `<article class="seller-empty-state"><strong>Sem reservas ainda</strong><p>A primeira pre-reserva criada na vitrine aparecera aqui com bloqueio de datas e status operacional.</p></article>`
          }
        </div>
      </article>
      <article class="seller-panel seller-panel-form">
        <div class="seller-panel-head"><div><small>edicao</small><h2>${h(editReservation.id ? "Reserva em andamento" : "Nova reserva manual")}</h2></div>${editReservation.id ? `<button type="button" class="seller-link-button danger-link" data-action="delete-reservation" data-id="${h(editReservation.id)}">Excluir</button>` : ""}</div>
        ${tplSellerReservationPreview(editReservation)}
        <form class="seller-form" id="seller-reservation-form">
          <input type="hidden" name="id" value="${h(editReservation.id || "")}" />
          <div class="seller-two-col">
            <label class="field-block"><span>Hospede</span><input name="guestName" value="${h(editReservation.guestName || "")}" required /></label>
            <label class="field-block"><span>Contato</span><input name="guestContact" value="${h(editReservation.guestContact || "")}" required /></label>
          </div>
          <div class="seller-two-col">
            <label class="field-block"><span>E-mail</span><input type="email" name="guestEmail" value="${h(editReservation.guestEmail || "")}" /></label>
            <label class="field-block"><span>Status</span>
              <select name="status">
                ${["pending", "confirmed", "cancelled", "completed"].map((status) => `<option value="${status}" ${status === editReservation.status ? "selected" : ""}>${h(formatReservationStatus(status))}</option>`).join("")}
              </select>
            </label>
          </div>
          <div class="seller-two-col">
            <label class="field-block"><span>Suite</span>
              <select name="suiteSlug">
                ${state.content.suites.map((suite) => `<option value="${h(suite.slug)}" ${suite.slug === editReservation.suiteSlug ? "selected" : ""}>${h(suite.name)}</option>`).join("")}
              </select>
            </label>
            <label class="field-block"><span>Hospedes</span><input type="number" min="1" max="10" name="guests" value="${h(editReservation.guests || 2)}" required /></label>
          </div>
          <div class="seller-two-col">
            <label class="field-block"><span>Check-in</span><input type="date" name="checkin" value="${h(editReservation.checkin || "")}" required /></label>
            <label class="field-block"><span>Check-out</span><input type="date" name="checkout" value="${h(editReservation.checkout || "")}" required /></label>
          </div>
          <div class="seller-two-col">
            <label class="field-block"><span>Origem</span><input name="source" value="${h(editReservation.source || "site")}" required /></label>
            <label class="field-block"><span>Total estimado</span><input type="number" min="0" name="totalEstimate" value="${h(editReservation.totalEstimate || 0)}" /></label>
          </div>
          <label class="field-block"><span>Observacoes</span><textarea name="notes">${h(editReservation.notes || "")}</textarea></label>
          <button type="submit" class="booking-submit">Salvar reserva</button>
        </form>
      </article>
    </section>
  `;
}

function tplSellerOperations() {
  const verification = state.content.verification;
  return `
    <section class="seller-stack reveal">
      <article class="seller-panel seller-panel-wide">
        <div class="seller-panel-head"><div><small>validacao publica</small><h2>Fontes e dados confiaveis</h2></div></div>
        <div class="ops-grid">
          ${verification.verifiedFacts
            .map(
              (fact) => `
                <article class="ops-card">
                  <small>${h(fact.sourceLabel)}</small>
                  <strong>${h(fact.label)}</strong>
                  <p><a href="${h(fact.sourceUrl)}" target="_blank" rel="noreferrer noopener">${h(fact.sourceUrl)}</a></p>
                </article>
              `,
            )
            .join("")}
        </div>
        <div class="pending-validation">
          <small>pendente de validacao direta</small>
          <div class="policy-list">${verification.pendingValidation.map((item) => `<span>${h(item)}</span>`).join("")}</div>
        </div>
      </article>
      <article class="seller-panel seller-panel-wide">
        <div class="seller-panel-head"><div><small>sql e go-live</small><h2>O que um site vendavel como este precisa ter</h2></div></div>
        <div class="ops-grid">
          ${state.content.ops.stack
            .map(
              (item) => `
                <article class="ops-card">
                  <small>infra</small>
                  <strong>${h(item.title)}</strong>
                  <p>${h(item.description)}</p>
                </article>
              `,
            )
            .join("")}
        </div>
        <div class="launch-checklist">
          ${state.content.ops.launchChecklist.map((item) => `<article class="launch-check"><span></span><p>${h(item)}</p></article>`).join("")}
        </div>
      </article>
    </section>
  `;
}

function tplSellerMedia() {
  const resort = state.content.resort;
  const editInstagram = getSellerInstagramPost();
  return `
    <section class="seller-stack reveal">
      <article class="seller-panel seller-panel-form seller-panel-wide">
        <div class="seller-panel-head"><div><small>brand assets</small><h2>Imagens, video e identidade</h2></div></div>
        ${tplSellerMediaPreview(resort)}
        <form class="seller-form" id="seller-media-form">
          <div class="seller-two-col"><label class="field-block"><span>Hero image</span><input name="heroImage" value="${h(resort.heroImage)}" required /></label><label class="field-block"><span>Profile image</span><input name="profileImage" value="${h(resort.profileImage)}" required /></label></div>
          <div class="seller-two-col"><label class="field-block"><span>Signature image</span><input name="signatureImage" value="${h(resort.signatureImage)}" required /></label><label class="field-block"><span>Culinary image</span><input name="culinaryImage" value="${h(resort.culinaryImage)}" required /></label></div>
          <div class="seller-two-col"><label class="field-block"><span>Video principal</span><input name="featureVideo" value="${h(resort.featureVideo)}" required /></label><label class="field-block"><span>Poster do video</span><input name="featureVideoPoster" value="${h(resort.featureVideoPoster)}" required /></label></div>
          <div class="seller-two-col"><label class="field-block"><span>Instagram handle</span><input name="instagramHandle" value="${h(resort.instagramHandle)}" required /></label><label class="field-block"><span>Instagram URL</span><input name="instagramUrl" value="${h(resort.instagramUrl)}" required /></label></div>
          <button type="submit" class="booking-submit">Salvar midia e identidade</button>
        </form>
      </article>
      <section class="seller-grid">
        <article class="seller-panel seller-panel-list">
          <div class="seller-panel-head"><div><small>wall visual</small><h2>Posts e destaques</h2></div><button type="button" class="seller-link-button" data-action="new-instagram">Novo destaque</button></div>
          <div class="seller-list">
            ${state.content.instagramPosts
              .map(
                (post) => `<button type="button" class="seller-card ${post.id === state.seller.instagramEditId ? "active" : ""}" data-edit-instagram="${h(post.id)}"><div><strong>${h(post.caption.slice(0, 42))}${post.caption.length > 42 ? "..." : ""}</strong><span>${h(post.image)}</span></div><small>Instagram</small></button>`,
              )
              .join("")}
          </div>
        </article>
        <article class="seller-panel seller-panel-form">
          <div class="seller-panel-head"><div><small>edicao</small><h2>${h(editInstagram.id ? "Destaque visual" : "Novo destaque")}</h2></div>${editInstagram.id ? `<button type="button" class="seller-link-button danger-link" data-action="delete-instagram" data-id="${h(editInstagram.id)}">Excluir</button>` : ""}</div>
          <form class="seller-form" id="seller-instagram-form">
            <input type="hidden" name="id" value="${h(editInstagram.id || "")}" />
            <label class="field-block"><span>Imagem</span><input name="image" value="${h(editInstagram.image || "")}" required /></label>
            <label class="field-block"><span>Legenda</span><textarea name="caption" required>${h(editInstagram.caption || "")}</textarea></label>
            <button type="submit" class="booking-submit">Salvar destaque</button>
          </form>
        </article>
      </section>
    </section>
  `;
}

function tplSellerConfig() {
  const resort = state.content.resort;
  return `
    <section class="seller-grid reveal">
      <article class="seller-panel seller-panel-form seller-panel-wide">
        <div class="seller-panel-head"><div><small>institucional</small><h2>Configuracoes da pousada</h2></div><button type="button" class="seller-link-button" data-action="reset-content">Restaurar demo</button></div>
        <div class="config-note">
          <small>contatos oficiais</small>
          <p>Telefone, WhatsApp e e-mail abaixo sao campos operacionais. Eles nao foram marcados como publicamente validados na seed para evitar prometer um dado nao conferido.</p>
        </div>
        <form class="seller-form" id="seller-config-form">
          <div class="seller-two-col"><label class="field-block"><span>Nome da pousada</span><input name="name" value="${h(resort.name)}" required /></label><label class="field-block"><span>Localizacao</span><input name="location" value="${h(resort.location)}" required /></label></div>
          <label class="field-block"><span>Tagline</span><input name="tagline" value="${h(resort.tagline)}" required /></label>
          <label class="field-block"><span>Titulo principal</span><input name="heroTitle" value="${h(resort.heroTitle)}" required /></label>
          <label class="field-block"><span>Texto do hero</span><textarea name="heroCopy" required>${h(resort.heroCopy)}</textarea></label>
          <label class="field-block"><span>Titulo da historia</span><input name="storyTitle" value="${h(resort.storyTitle)}" required /></label>
          <label class="field-block"><span>Texto da historia</span><textarea name="storyCopy" required>${h(resort.storyCopy)}</textarea></label>
          <div class="seller-four-col"><label class="field-block"><span>Check-in</span><input name="checkIn" value="${h(resort.checkIn)}" required /></label><label class="field-block"><span>Check-out</span><input name="checkOut" value="${h(resort.checkOut)}" required /></label><label class="field-block"><span>Telefone</span><input name="reservationPhone" value="${h(resort.reservationPhone)}" placeholder="+55 85 ..." /></label><label class="field-block"><span>WhatsApp</span><input name="reservationWhatsapp" value="${h(resort.reservationWhatsapp)}" placeholder="5585..." /></label></div>
          <div class="seller-two-col"><label class="field-block"><span>E-mail</span><input name="reservationEmail" value="${h(resort.reservationEmail)}" placeholder="reservas@..." /></label><label class="field-block"><span>Codigo vendedor</span><input name="sellerCode" value="${h(resort.sellerCode)}" required /></label></div>
          <label class="field-block"><span>Faixa sazonal</span><input name="seasonLabel" value="${h(resort.seasonLabel)}" required /></label>
          <button type="submit" class="booking-submit">Salvar configuracoes</button>
        </form>
      </article>
    </section>
  `;
}

function tplNotice() {
  if (!state.notice) return "";
  return `<div class="site-notice" role="status" aria-live="polite">${h(state.notice)}</div>`;
}

function tplSellerSuitePreview(suite) {
  if (!suite.image) return "";
  return `
    <article class="seller-preview-card">
      <img src="${h(suite.image)}" alt="${h(suite.name || "Preview da suite")}" />
      <div class="seller-preview-copy">
        <small>preview</small>
        <strong>${h(suite.name || "Nova suite")}</strong>
        <p>${h(suite.summary || "A imagem principal e os dados dessa suite aparecem aqui para facilitar a revisao antes de salvar.")}</p>
      </div>
    </article>
  `;
}

function tplSellerMediaPreview(resort) {
  return `
    <article class="seller-media-preview">
      <div class="seller-media-preview-hero">
        <img src="${h(resort.heroImage)}" alt="${h(resort.name)} hero" />
        <div class="seller-media-preview-copy">
          <small>hero atual</small>
          <strong>${h(resort.heroTitle)}</strong>
          <p>${h(resort.instagramHandle)} | ${h(resort.location)}</p>
        </div>
      </div>
      <div class="seller-media-preview-stack">
        <img src="${h(resort.profileImage)}" alt="${h(resort.name)} profile" />
        <img src="${h(resort.signatureImage)}" alt="${h(resort.name)} signature" />
      </div>
    </article>
  `;
}

function tplSellerReservationPreview(reservation) {
  const suite = getSuiteBySlug(reservation.suiteSlug);
  if (!suite) return "";
  return `
    <article class="seller-preview-card reservation-preview-card">
      <img src="${h(suite.image)}" alt="${h(suite.name)}" />
      <div class="seller-preview-copy">
        <small>${h(formatReservationStatus(reservation.status || "pending"))}</small>
        <strong>${h(reservation.guestName || "Reserva manual")}</strong>
        <p>${h(suite.name)} | ${h(formatDateRange(reservation.checkin, reservation.checkout) || "Defina o periodo")} | ${h(formatGuests(reservation.guests || 2))}</p>
      </div>
    </article>
  `;
}

function getPrimaryContactHref() {
  const resort = state.content.resort;
  if (resort.reservationWhatsapp) return `https://wa.me/${resort.reservationWhatsapp}`;
  if (resort.reservationEmail) return `mailto:${resort.reservationEmail}`;
  return resort.instagramUrl;
}

function getPrimaryContactLabel() {
  const resort = state.content.resort;
  if (resort.reservationWhatsapp) return "Falar no WhatsApp";
  if (resort.reservationEmail) return "Enviar e-mail";
  return "Ver Instagram oficial";
}

function getContactLinks() {
  const resort = state.content.resort;
  const links = [];
  if (resort.reservationEmail) links.push({ label: resort.reservationEmail, href: `mailto:${resort.reservationEmail}`, external: false });
  if (resort.reservationWhatsapp) links.push({ label: "WhatsApp direto", href: `https://wa.me/${resort.reservationWhatsapp}`, external: true });
  links.push({ label: "Instagram oficial", href: resort.instagramUrl, external: true });
  return links;
}

function getBookingSummary() {
  return createReservationSummary({
    suite: getActiveSuite(),
    checkin: state.booking.checkin,
    checkout: state.booking.checkout,
    guests: state.booking.guests,
  });
}

function getBookingAvailability(suite = getActiveSuite()) {
  const summary = getBookingSummary();
  if (!summary.valid) {
    return {
      status: "invalid",
      available: false,
      label: "datas pendentes",
      detail: "Defina um periodo valido para consultar a agenda.",
    };
  }

  const conflict = hasReservationConflict(state.content, {
    suiteSlug: suite.slug,
    checkin: state.booking.checkin,
    checkout: state.booking.checkout,
  });

  if (conflict) {
    return {
      status: "conflict",
      available: false,
      label: "indisponivel nesse periodo",
      detail: "Ja existe bloqueio pendente ou confirmado nessa janela.",
    };
  }

  return {
    status: "available",
    available: true,
    label: "disponibilidade preliminar",
    detail: "Livre para registrar pre-reserva e seguir para confirmacao.",
  };
}

function getActiveSuite() {
  return state.content.suites.find((suite) => suite.slug === state.activeSuite) || state.content.suites[0];
}

function getSuiteBySlug(slug) {
  return state.content.suites.find((suite) => suite.slug === slug) || null;
}

function getSellerSuite() {
  return state.content.suites.find((suite) => suite.slug === state.seller.suiteEditSlug) || emptySuite();
}

function getSellerExperience() {
  return state.content.experiences.find((item) => item.id === state.seller.experienceEditId) || emptyExperience();
}

function getSellerInstagramPost() {
  return state.content.instagramPosts.find((item) => item.id === state.seller.instagramEditId) || emptyInstagramPost();
}

function getSellerReservation() {
  return state.content.reservations.find((item) => item.id === state.seller.reservationEditId) || emptyReservation();
}

function emptySuite() {
  return {
    slug: "",
    name: "",
    category: "",
    rate: 0,
    size: "",
    guests: 2,
    beds: "",
    image: "",
    gallery: [],
    summary: "",
    details: "",
    amenities: [],
  };
}

function emptyExperience() {
  return { id: "", name: "", duration: "", description: "" };
}

function emptyInstagramPost() {
  return { id: "", image: "", caption: "" };
}

function emptyReservation() {
  return {
    id: "",
    suiteSlug: state.content.suites[0]?.slug || "",
    guestName: "",
    guestContact: "",
    guestEmail: "",
    checkin: "",
    checkout: "",
    guests: 2,
    notes: "",
    status: "pending",
    source: "site",
    totalEstimate: 0,
    createdAt: "",
  };
}

function syncSelections() {
  if (!state.content.suites.length) state.content = JSON.parse(JSON.stringify(seedContent));
  if (!state.activeSuite || !state.content.suites.some((suite) => suite.slug === state.activeSuite)) state.activeSuite = state.content.suites[0]?.slug || "";
  if (!state.booking.suite || !state.content.suites.some((suite) => suite.slug === state.booking.suite)) state.booking.suite = state.activeSuite;
  if (!state.content.suites.some((suite) => suite.slug === state.seller.suiteEditSlug)) state.seller.suiteEditSlug = state.content.suites[0]?.slug || "";
  if (!state.content.experiences.some((item) => item.id === state.seller.experienceEditId)) state.seller.experienceEditId = state.content.experiences[0]?.id || "";
  if (!state.content.instagramPosts.some((item) => item.id === state.seller.instagramEditId)) state.seller.instagramEditId = state.content.instagramPosts[0]?.id || "";
  if (!state.content.reservations.some((item) => item.id === state.seller.reservationEditId)) state.seller.reservationEditId = state.content.reservations[0]?.id || "";
  if (!state.openFaq || !state.content.faq.some((item) => item.question === state.openFaq)) state.openFaq = state.content.faq[0]?.question || "";
  state.activeGalleryIndex = Math.max(0, Math.min(state.activeGalleryIndex, (getActiveSuite().gallery?.length || 1) - 1));
}

function onClick(event) {
  const toggle = event.target.closest('[data-action="toggle-menu"]');
  if (toggle) {
    state.menuOpen = !state.menuOpen;
    render();
    return;
  }

  const suiteTrigger = event.target.closest("[data-suite]");
  if (suiteTrigger) {
    const slug = suiteTrigger.getAttribute("data-suite") || state.content.suites[0].slug;
    state.activeSuite = slug;
    state.booking.suite = slug;
    state.activeGalleryIndex = 0;
    render();
    return;
  }

  const galleryTrigger = event.target.closest("[data-gallery-index]");
  if (galleryTrigger) {
    state.activeGalleryIndex = Number(galleryTrigger.getAttribute("data-gallery-index") || 0);
    render();
    return;
  }

  const faqTrigger = event.target.closest("[data-faq]");
  if (faqTrigger) {
    const question = faqTrigger.getAttribute("data-faq") || "";
    state.openFaq = state.openFaq === question ? "" : question;
    render();
    return;
  }

  const editSuiteTrigger = event.target.closest("[data-edit-suite]");
  if (editSuiteTrigger) {
    state.seller.suiteEditSlug = editSuiteTrigger.getAttribute("data-edit-suite") || "";
    render();
    return;
  }

  const editExperienceTrigger = event.target.closest("[data-edit-experience]");
  if (editExperienceTrigger) {
    state.seller.experienceEditId = editExperienceTrigger.getAttribute("data-edit-experience") || "";
    render();
    return;
  }

  const editInstagramTrigger = event.target.closest("[data-edit-instagram]");
  if (editInstagramTrigger) {
    state.seller.instagramEditId = editInstagramTrigger.getAttribute("data-edit-instagram") || "";
    render();
    return;
  }

  const editReservationTrigger = event.target.closest("[data-edit-reservation]");
  if (editReservationTrigger) {
    state.seller.reservationEditId = editReservationTrigger.getAttribute("data-edit-reservation") || "";
    render();
    return;
  }

  const action = event.target.closest("[data-action]");
  if (!action) {
    const navLink = event.target.closest(".site-nav a");
    if (navLink && state.menuOpen) {
      state.menuOpen = false;
      render();
    }
    return;
  }

  const actionName = action.getAttribute("data-action");
  if (actionName === "logout-seller") {
    setSellerLogged(false);
    location.hash = "/vendedor";
    return;
  }
  if (actionName === "new-suite") {
    state.seller.suiteEditSlug = "";
    render();
    return;
  }
  if (actionName === "new-experience") {
    state.seller.experienceEditId = "";
    render();
    return;
  }
  if (actionName === "new-instagram") {
    state.seller.instagramEditId = "";
    render();
    return;
  }
  if (actionName === "new-reservation") {
    state.seller.reservationEditId = "";
    render();
    return;
  }
  if (actionName === "delete-suite") {
    deleteSuite(action.getAttribute("data-suite") || "");
    return;
  }
  if (actionName === "delete-experience") {
    deleteExperience(action.getAttribute("data-id") || "");
    return;
  }
  if (actionName === "delete-instagram") {
    deleteInstagramPost(action.getAttribute("data-id") || "");
    return;
  }
  if (actionName === "delete-reservation") {
    deleteReservation(action.getAttribute("data-id") || "");
    return;
  }
  if (actionName === "reset-content") {
    state.content = resetContent();
    syncSelections();
    setNotice("Conteudo demo restaurado no painel e na area do comprador.");
  }
}

function onInput(event) {
  const target = event.target;
  if (!(target instanceof HTMLInputElement || target instanceof HTMLSelectElement || target instanceof HTMLTextAreaElement)) return;
  const form = target.closest("form");
  if (!form || form.getAttribute("id") !== "booking-form") return;
  state.booking = {
    ...state.booking,
    [target.name]: target.name === "guests" ? Number(target.value) : target.value,
  };
  if (target.name === "suite") {
    state.activeSuite = target.value;
    state.activeGalleryIndex = 0;
  }
  render();
}

function onChange(event) {
  onInput(event);
}

function onSubmit(event) {
  const form = event.target;
  if (!(form instanceof HTMLFormElement)) return;
  const id = form.getAttribute("id") || "";
  event.preventDefault();

  if (id === "booking-form") {
    const summary = getBookingSummary();
    if (!summary.valid) {
      setNotice("Defina check-in e check-out validos para consultar disponibilidade.");
      return;
    }
    if (!String(state.booking.guestName || "").trim() || !String(state.booking.guestContact || "").trim()) {
      setNotice("Preencha nome e contato para registrar a pre-reserva.");
      return;
    }
    if (
      hasReservationConflict(state.content, {
        suiteSlug: state.booking.suite,
        checkin: state.booking.checkin,
        checkout: state.booking.checkout,
      })
    ) {
      setNotice("Esse periodo ja esta bloqueado para a suite selecionada. Escolha novas datas.");
      render();
      return;
    }

    const reservation = normalizeReservation({
      id: uid("res"),
      suiteSlug: state.booking.suite,
      guestName: state.booking.guestName,
      guestContact: state.booking.guestContact,
      guestEmail: state.booking.guestEmail,
      checkin: state.booking.checkin,
      checkout: state.booking.checkout,
      guests: state.booking.guests,
      notes: state.booking.notes,
      totalEstimate: summary.total,
      status: "pending",
      source: "site",
      createdAt: new Date().toISOString(),
    });

    state.content.reservations = [reservation, ...(state.content.reservations || [])];
    state.seller.reservationEditId = reservation.id;
    persistContent();
    window.open(buildReservationUrl(getActiveSuite(), summary, reservation), "_blank", "noopener,noreferrer");
    setNotice(`Pre-reserva registrada para ${getActiveSuite().name}. As datas agora aparecem bloqueadas como pendentes.`);
    return;
  }

  if (id === "seller-login-form") {
    const fd = new FormData(form);
    const code = String(fd.get("sellerCode") || "").trim();
    if (code === state.content.resort.sellerCode) {
      setSellerLogged(true);
      location.hash = "/vendedor/suites";
      return;
    }
    setNotice("Codigo do vendedor invalido.");
    return;
  }

  if (!isSellerLogged()) {
    location.hash = "/vendedor";
    return;
  }

  if (id === "seller-suite-form") {
    saveSuite(new FormData(form));
    return;
  }

  if (id === "seller-experience-form") {
    saveExperience(new FormData(form));
    return;
  }

  if (id === "seller-media-form") {
    saveMedia(new FormData(form));
    return;
  }

  if (id === "seller-instagram-form") {
    saveInstagramPost(new FormData(form));
    return;
  }

  if (id === "seller-reservation-form") {
    saveReservation(new FormData(form));
    return;
  }

  if (id === "seller-config-form") {
    saveConfig(new FormData(form));
  }
}

function saveSuite(fd) {
  const currentSlug = String(fd.get("slug") || "").trim();
  const name = String(fd.get("name") || "").trim();
  const payload = {
    slug: currentSlug || uniqueSlug(slugify(name), state.content.suites),
    name,
    category: String(fd.get("category") || "").trim(),
    rate: Number(fd.get("rate") || 0),
    size: String(fd.get("size") || "").trim(),
    guests: Number(fd.get("guests") || 1),
    beds: String(fd.get("beds") || "").trim(),
    image: String(fd.get("image") || "").trim(),
    gallery: lines(fd.get("gallery")),
    summary: String(fd.get("summary") || "").trim(),
    details: String(fd.get("details") || "").trim(),
    amenities: lines(fd.get("amenities")),
  };

  state.content.suites = currentSlug
    ? state.content.suites.map((suite) => (suite.slug === currentSlug ? payload : suite))
    : [payload, ...state.content.suites];

  state.activeSuite = payload.slug;
  state.booking.suite = payload.slug;
  state.seller.suiteEditSlug = payload.slug;
  persistContent();
  setNotice(`Suite ${payload.name} salva com sucesso.`);
}

function saveExperience(fd) {
  const currentId = String(fd.get("id") || "").trim();
  const payload = {
    id: currentId || uid("exp"),
    name: String(fd.get("name") || "").trim(),
    duration: String(fd.get("duration") || "").trim(),
    description: String(fd.get("description") || "").trim(),
  };

  state.content.experiences = currentId
    ? state.content.experiences.map((item) => (item.id === currentId ? payload : item))
    : [payload, ...state.content.experiences];

  state.seller.experienceEditId = payload.id;
  persistContent();
  setNotice(`Experiencia ${payload.name} salva com sucesso.`);
}

function saveMedia(fd) {
  state.content.resort = {
    ...state.content.resort,
    heroImage: String(fd.get("heroImage") || "").trim(),
    profileImage: String(fd.get("profileImage") || "").trim(),
    signatureImage: String(fd.get("signatureImage") || "").trim(),
    culinaryImage: String(fd.get("culinaryImage") || "").trim(),
    featureVideo: String(fd.get("featureVideo") || "").trim(),
    featureVideoPoster: String(fd.get("featureVideoPoster") || "").trim(),
    instagramHandle: String(fd.get("instagramHandle") || "").trim(),
    instagramUrl: String(fd.get("instagramUrl") || "").trim(),
  };
  persistContent();
  setNotice("Midia e identidade da marca atualizadas.");
}

function saveInstagramPost(fd) {
  const currentId = String(fd.get("id") || "").trim();
  const payload = {
    id: currentId || uid("ig"),
    image: String(fd.get("image") || "").trim(),
    caption: String(fd.get("caption") || "").trim(),
  };

  state.content.instagramPosts = currentId
    ? state.content.instagramPosts.map((item) => (item.id === currentId ? payload : item))
    : [payload, ...state.content.instagramPosts];

  state.seller.instagramEditId = payload.id;
  persistContent();
  setNotice("Destaque visual salvo com sucesso.");
}

function saveReservation(fd) {
  const currentId = String(fd.get("id") || "").trim();
  const suiteSlug = String(fd.get("suiteSlug") || "").trim();
  const suite = getSuiteBySlug(suiteSlug);
  const checkin = String(fd.get("checkin") || "").trim();
  const checkout = String(fd.get("checkout") || "").trim();
  const guests = Number(fd.get("guests") || 1);
  const summary = createReservationSummary({
    suite,
    checkin,
    checkout,
    guests,
  });
  const payload = normalizeReservation({
    id: currentId || uid("res"),
    suiteSlug,
    guestName: String(fd.get("guestName") || "").trim(),
    guestContact: String(fd.get("guestContact") || "").trim(),
    guestEmail: String(fd.get("guestEmail") || "").trim(),
    checkin,
    checkout,
    guests,
    notes: String(fd.get("notes") || "").trim(),
    status: String(fd.get("status") || "pending").trim(),
    source: String(fd.get("source") || "manual").trim(),
    totalEstimate: Number(fd.get("totalEstimate") || 0) || summary.total,
    createdAt: currentId ? getSellerReservation().createdAt || new Date().toISOString() : new Date().toISOString(),
  });

  if (!payload.guestName || !payload.guestContact || !payload.checkin || !payload.checkout || !payload.suiteSlug) {
    setNotice("Preencha hospede, contato, suite e periodo para salvar a reserva.");
    return;
  }

  if (payload.checkin >= payload.checkout) {
    setNotice("Check-in precisa ser anterior ao check-out.");
    return;
  }

  if (hasReservationConflict(state.content, payload, currentId) && reservationBlocks(state.content, payload)) {
    setNotice("Existe conflito de datas para essa suite no status selecionado.");
    return;
  }

  state.content.reservations = currentId
    ? state.content.reservations.map((item) => (item.id === currentId ? payload : item))
    : [payload, ...(state.content.reservations || [])];

  state.seller.reservationEditId = payload.id;
  persistContent();
  setNotice(`Reserva de ${payload.guestName} salva com status ${formatReservationStatus(payload.status)}.`);
}

function saveConfig(fd) {
  state.content.resort = {
    ...state.content.resort,
    name: String(fd.get("name") || "").trim(),
    location: String(fd.get("location") || "").trim(),
    tagline: String(fd.get("tagline") || "").trim(),
    heroTitle: String(fd.get("heroTitle") || "").trim(),
    heroCopy: String(fd.get("heroCopy") || "").trim(),
    storyTitle: String(fd.get("storyTitle") || "").trim(),
    storyCopy: String(fd.get("storyCopy") || "").trim(),
    checkIn: String(fd.get("checkIn") || "").trim(),
    checkOut: String(fd.get("checkOut") || "").trim(),
    reservationPhone: String(fd.get("reservationPhone") || "").trim(),
    reservationWhatsapp: String(fd.get("reservationWhatsapp") || "").trim(),
    reservationEmail: String(fd.get("reservationEmail") || "").trim(),
    sellerCode: String(fd.get("sellerCode") || "").trim(),
    seasonLabel: String(fd.get("seasonLabel") || "").trim(),
  };
  persistContent();
  setNotice("Configuracoes da pousada atualizadas.");
}

function deleteSuite(slug) {
  if (!slug || state.content.suites.length <= 1) {
    setNotice("Mantenha pelo menos uma suite cadastrada.");
    return;
  }
  state.content.suites = state.content.suites.filter((suite) => suite.slug !== slug);
  persistContent();
  setNotice("Suite removida do painel e da area do comprador.");
}

function deleteExperience(id) {
  state.content.experiences = state.content.experiences.filter((item) => item.id !== id);
  persistContent();
  setNotice("Experiencia removida.");
}

function deleteInstagramPost(id) {
  if (state.content.instagramPosts.length <= 1) {
    setNotice("Mantenha pelo menos um destaque visual.");
    return;
  }
  state.content.instagramPosts = state.content.instagramPosts.filter((item) => item.id !== id);
  persistContent();
  setNotice("Destaque visual removido.");
}

function deleteReservation(id) {
  state.content.reservations = (state.content.reservations || []).filter((item) => item.id !== id);
  persistContent();
  setNotice("Reserva removida da agenda.");
}

function persistContent() {
  state.content.meta = {
    ...(state.content.meta || {}),
    updatedAt: new Date().toISOString(),
    persistence: "localStorage-demo",
  };
  writeContent(state.content);
  syncSelections();
  render();
}

function getAverageRate() {
  if (!state.content.suites.length) return 0;
  return Math.round(state.content.suites.reduce((sum, suite) => sum + Number(suite.rate || 0), 0) / state.content.suites.length);
}

function getAverageRateLabel() {
  const average = getAverageRate();
  return average > 0 ? formatCurrency(average) : "sob consulta";
}

function uid(prefix) {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}`;
}

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function uniqueSlug(base, list) {
  const seed = base || uid("suite");
  const used = new Set(list.map((item) => item.slug));
  if (!used.has(seed)) return seed;
  let index = 2;
  while (used.has(`${seed}-${index}`)) index += 1;
  return `${seed}-${index}`;
}

function lines(value) {
  return String(value || "")
    .split(/\r?\n/g)
    .map((item) => item.trim())
    .filter(Boolean);
}

function buildReservationUrl(suite, summary, reservation) {
  const resort = state.content.resort;
  const message = [
    `Ola, equipe ${resort.name}.`,
    `Registrei uma pre-reserva pelo site.`,
    ``,
    `Hospede: ${reservation?.guestName || state.booking.guestName}`,
    `Contato: ${reservation?.guestContact || state.booking.guestContact}`,
    state.booking.guestEmail ? `E-mail: ${state.booking.guestEmail}` : "",
    `Suite: ${suite.name}`,
    `Check-in: ${state.booking.checkin}`,
    `Check-out: ${state.booking.checkout}`,
    `Hospedes: ${formatGuests(state.booking.guests)}`,
    `Estimativa: ${getEstimateLabel(summary, suite)}`,
    state.booking.notes ? `Observacoes: ${state.booking.notes}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  if (resort.reservationWhatsapp) {
    return `https://wa.me/${resort.reservationWhatsapp}?text=${encodeURIComponent(message)}`;
  }
  if (resort.reservationEmail) {
    return `mailto:${resort.reservationEmail}?subject=${encodeURIComponent(`Pre-reserva | ${suite.name}`)}&body=${encodeURIComponent(message)}`;
  }
  return resort.instagramUrl;
}

function onKeydown(event) {
  if (event.key === "Escape" && state.menuOpen) {
    state.menuOpen = false;
    render();
    return;
  }

  if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === "v") {
    event.preventDefault();
    location.hash = "/vendedor";
  }
}

function isSellerLogged() {
  return sessionStorage.getItem(SESSION_KEY) === "1";
}

function setSellerLogged(value) {
  if (value) sessionStorage.setItem(SESSION_KEY, "1");
  else sessionStorage.removeItem(SESSION_KEY);
}

function setNotice(message) {
  state.notice = message;
  render();
  if (noticeTimer) window.clearTimeout(noticeTimer);
  noticeTimer = window.setTimeout(() => {
    state.notice = "";
    render();
  }, 3200);
}

function bindReveal() {
  if (revealObserver) revealObserver.disconnect();
  const nodes = app.querySelectorAll(".reveal");
  if (!nodes.length) return;
  if (!("IntersectionObserver" in window)) {
    nodes.forEach((node) => node.classList.add("in-view"));
    animateCounters();
    return;
  }

  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in-view");
        revealObserver.unobserve(entry.target);
      });
      animateCounters();
    },
    { threshold: 0.18 },
  );

  nodes.forEach((node) => revealObserver.observe(node));
}

function animateCounters() {
  app.querySelectorAll("[data-counter]").forEach((node) => {
    if (node.dataset.bound === "1") return;
    node.dataset.bound = "1";
    const raw = node.getAttribute("data-counter") || "0";
    const digits = Number(String(raw).replace(/\D/g, "")) || 0;
    if (!digits) {
      node.textContent = raw;
      return;
    }
    const suffix = String(raw).replace(/[0-9]/g, "");
    const padding = String(digits).length;
    const startedAt = performance.now();
    const duration = 900;

    const step = (time) => {
      const progress = Math.min(1, (time - startedAt) / duration);
      const eased = 1 - (1 - progress) ** 3;
      const value = Math.round(digits * eased);
      node.textContent = `${String(value).padStart(padding, "0")}${suffix}`;
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  });
}

function syncHeader() {
  const header = document.querySelector(".site-header");
  if (!header) return;
  header.classList.toggle("scrolled", window.scrollY > 24);
}

function updatePointerGlow(event) {
  document.documentElement.style.setProperty("--pointer-x", `${event.clientX}px`);
  document.documentElement.style.setProperty("--pointer-y", `${event.clientY}px`);
}
