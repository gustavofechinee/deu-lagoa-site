import { seedContent } from "../data/deu-lagoa-content.js";
import { getReservationMetrics, getUpcomingBlockedWindows, hasReservationConflict, normalizeReservation, reservationBlocks } from "../utils/availability.js";
import { createReservationSummary, formatCurrency, formatDateLabel, formatDateRange, formatGuests, formatReservationStatus, h } from "../utils/format.js";
import { ensureContent, resetContent, writeContent } from "../utils/storage.js";

const app = document.querySelector("#app");
const SESSION_KEY = "deu_lagoa_seller_session_v1";
const INTRO_VIDEO_OFFSET_SECONDS = 1.15;
const INTRO_VIDEO_HOLD_MS = 10000;
const INTRO_FALLBACK_HOLD_MS = 1900;
const INTRO_PRIMARY_REVEAL_MS = 2800;
const INTRO_SECONDARY_REVEAL_MS = 2200;
const INTRO_BLUR_REVEAL_MS = 3200;

const state = {
  content: ensureContent(),
  route: parseRoute(),
  menuOpen: false,
  activeSuite: "",
  activeGalleryIndex: 0,
  openFaq: "",
  notice: "",
  introVisible: shouldShowIntro(),
  booking: {
    suite: "",
    checkin: "",
    checkout: "",
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
let introTimer = 0;
let introSecondaryTimer = 0;
let introBlurTimer = 0;
let introExitTimer = 0;
let scrollFrame = 0;
let introPlayedThisLoad = false;

init();

function init() {
  app.addEventListener("click", onClick);
  app.addEventListener("input", onInput);
  app.addEventListener("change", onChange);
  app.addEventListener("submit", onSubmit);
  window.addEventListener("hashchange", onRouteChange);
  window.addEventListener("keydown", onKeydown);
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", requestScrollEffects);
  window.addEventListener("pointermove", updatePointerGlow, { passive: true });
  if (normalizePublicRoute()) return;
  syncSelections();
  render();
}

function parseRoute() {
  const clean = location.hash.replace(/^#/, "") || "/hotel";
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
  if (normalizePublicRoute()) return;
  state.route = parseRoute();
  state.menuOpen = false;
  if (state.route.name === "buyer" && shouldShowIntro()) state.introVisible = true;
  if (state.route.name === "seller") state.introVisible = false;
  syncSelections();
  render();
}

function normalizePublicRoute() {
  const clean = location.hash.replace(/^#/, "");
  if (!clean || clean === "/" || clean === "/comprador") {
    location.hash = "/hotel";
    return true;
  }
  return false;
}

function render() {
  syncSelections();
  app.innerHTML = `
    <div class="resort-page">
      ${state.route.name === "buyer" ? tplBuyerPage() : tplSellerPage()}
      ${tplNotice()}
    </div>
  `;
  syncIntroState();
  bindReveal();
  syncHeader();
  syncBookingStudio();
  requestScrollEffects();
}

function tplBuyerPage() {
  const resort = state.content.resort;
  const activeSuite = getActiveSuite();
  const summary = getBookingSummary();

  return `
    ${tplBuyerHeader()}
    <main class="page-main">
      ${tplHero(resort, activeSuite, summary)}
      ${tplBrandStory(resort)}
      ${tplExperienceGrid()}
      ${tplSuites(activeSuite)}
      ${tplCinema(resort)}
      ${tplReservationStudio(resort, activeSuite, summary)}
      ${tplInstagram()}
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
        <a href="#historia">A casa</a>
        <a href="#experiencias">Experiência</a>
        <a href="#suites">Hospedagem</a>
        <a href="#reserva">Reserva</a>
        <a href="#video">Reel</a>
        <a href="#instagram">Imagens</a>
        <a href="#contato">Contato</a>
      </nav>
      <div class="header-actions">
        <a class="header-subtle" href="${h(resort.instagramUrl)}" target="_blank" rel="noreferrer noopener">${h(resort.instagramHandle)}</a>
        <a class="header-button" href="#reserva">Consultar disponibilidade</a>
      </div>
    </header>
  `;
}

function splitHeroTitle(title, explicitLines = []) {
  if (Array.isArray(explicitLines) && explicitLines.length) {
    return explicitLines.map((line) => String(line || "").trim()).filter(Boolean);
  }

  const normalized = String(title || "").trim();
  if (!normalized) return [];

  for (const divider of [" à ", " na ", " no "]) {
    if (normalized.includes(divider)) {
      const [lead, ...rest] = normalized.split(divider);
      const tail = rest.join(divider).trim();
      return [lead.trim(), `${divider.trim()} ${tail}`.trim()];
    }
  }

  const words = normalized.split(/\s+/).filter(Boolean);
  if (words.length < 5) return [normalized];
  const midpoint = Math.ceil(words.length / 2);
  return [words.slice(0, midpoint).join(" "), words.slice(midpoint).join(" ")];
}

function splitHeroCopy(copy) {
  return String(copy || "")
    .split(/(?<=[.!?])\s+/)
    .map((part) => part.trim())
    .filter(Boolean);
}

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

function addDaysIso(value, days) {
  if (!value) return "";
  const stamp = new Date(`${value}T12:00:00`);
  if (!Number.isFinite(stamp.getTime())) return "";
  stamp.setDate(stamp.getDate() + days);
  return stamp.toISOString().slice(0, 10);
}

function getBookingGuestLimit(suite = getActiveSuite()) {
  const capacity = Number(suite?.guests || 0);
  return capacity > 0 ? capacity : 5;
}

function clampGuestCount(value, suite = getActiveSuite()) {
  const total = Number(value) || 1;
  return Math.min(getBookingGuestLimit(suite), Math.max(1, total));
}

function getBookingAnchorDate() {
  return state.booking.checkin || addDaysIso(todayIso(), 1) || todayIso();
}

function getStayPresetRange(nights) {
  const checkin = getBookingAnchorDate();
  return {
    checkin,
    checkout: addDaysIso(checkin, nights),
  };
}

function getNextWeekendRange() {
  const anchor = new Date(`${getBookingAnchorDate()}T12:00:00`);
  const day = anchor.getDay();
  const untilFriday = (5 - day + 7) % 7 || 7;
  anchor.setDate(anchor.getDate() + untilFriday);
  const checkin = anchor.toISOString().slice(0, 10);
  return {
    checkin,
    checkout: addDaysIso(checkin, 2),
  };
}

function getBookingPeriodLabel(summary = getBookingSummary()) {
  return summary.valid ? formatDateRange(state.booking.checkin, state.booking.checkout) : "Selecione check-in e check-out";
}

function getBookingNightsLabel(summary = getBookingSummary()) {
  if (!summary.valid) return "Periodo ainda nao definido";
  return `${summary.nights} ${summary.nights === 1 ? "noite" : "noites"}`;
}

function buildBlockedWindowMarkup(blockedWindows) {
  if (!blockedWindows.length) {
    return `
      <small>agenda atual</small>
      <span>Sem bloqueios cadastrados para esta categoria.</span>
    `;
  }

  return `
    <small>janelas ja bloqueadas</small>
    ${blockedWindows
      .map((reservation) => `<span>${h(formatDateRange(reservation.checkin, reservation.checkout))}</span>`)
      .join("")}
  `;
}

function getBookingSubmitState(summary = getBookingSummary(), availability = getBookingAvailability()) {
  const hasIdentity = String(state.booking.guestName || "").trim() && String(state.booking.guestContact || "").trim();
  if (!state.booking.checkin || !state.booking.checkout) {
    return {
      disabled: true,
      label: "Defina seu periodo",
      note: "Escolha entrada e saida para consultar a agenda.",
    };
  }
  if (!summary.valid) {
    return {
      disabled: true,
      label: "Revise as datas",
      note: "O check-out precisa ser posterior ao check-in.",
    };
  }
  if (!availability.available) {
    return {
      disabled: true,
      label: "Escolha outro periodo",
      note: availability.detail,
    };
  }
  if (!hasIdentity) {
    return {
      disabled: false,
      label: "Preencha nome e contato",
      note: "Esses dois campos sao suficientes para a equipe retornar.",
    };
  }
  return {
    disabled: false,
    label: "Enviar consulta",
    note: "Ao enviar, a janela fica pendente ate a confirmacao da equipe.",
  };
}

function applyBookingState(patch, { rerender = false } = {}) {
  const suiteSlug = String(patch.suite || state.booking.suite || state.activeSuite || "");
  const suite = getSuiteBySlug(suiteSlug) || getActiveSuite();
  const nextBooking = {
    ...state.booking,
    ...patch,
    suite: suite?.slug || suiteSlug,
  };

  nextBooking.guests = clampGuestCount(nextBooking.guests, suite);

  if (nextBooking.checkin && nextBooking.checkout && nextBooking.checkout <= nextBooking.checkin) {
    nextBooking.checkout = addDaysIso(nextBooking.checkin, 1);
  }

  state.booking = nextBooking;

  if (suite?.slug) {
    state.activeSuite = suite.slug;
    state.activeGalleryIndex = 0;
  }

  if (rerender) {
    render();
    return;
  }

  syncBookingStudio();
}

function tplHero(resort, activeSuite, summary) {
  const heroTitleLines = splitHeroTitle(resort.heroTitle, resort.heroTitleLines);
  const heroCopyLines = splitHeroCopy(resort.heroCopy);

  return `
    <section class="hero-section ${state.introVisible ? "intro-playing" : "intro-complete"}" id="topo">
      ${state.introVisible ? `<button type="button" class="intro-skip hero-intro-skip" data-action="dismiss-intro">Pular</button>` : ""}
      <div class="hero-backdrop">
        ${
          resort.featureVideo
            ? `
              <video class="hero-video" data-hero-video="1" autoplay muted loop playsinline webkit-playsinline preload="auto" poster="${h(resort.featureVideoPoster || resort.heroImage)}" disablepictureinpicture controlslist="nodownload noplaybackrate noremoteplayback">
                <source src="${h(resort.featureVideo)}" type="video/mp4" />
              </video>
            `
            : ""
        }
        <div class="hero-image ${resort.featureVideo ? "has-video" : ""}" style="background-image: linear-gradient(120deg, rgba(6, 15, 20, 0.72), rgba(5, 12, 18, 0.34)), url('${h(resort.heroImage)}');">
        </div>
        <div class="hero-blur-film" aria-hidden="true"></div>
      </div>
      <div class="hero-overlay"></div>
      <div class="hero-grid">
        <div class="hero-content">
          <div class="hero-intro-copy hero-intro-primary">
            <p class="kicker hero-primary-seq hero-primary-1">${h(resort.seasonLabel)}</p>
            <h1 class="hero-heading">
              ${heroTitleLines
                .map((line, index) => `<span class="hero-title-line hero-primary-seq hero-primary-${index + 2}">${h(line)}</span>`)
                .join("")}
            </h1>
            <div class="hero-lead">
              ${heroCopyLines
                .map((line, index) => `<span class="hero-copy-line hero-primary-seq hero-primary-${index + 6}">${h(line)}</span>`)
                .join("")}
            </div>
          </div>
          <div class="hero-content-secondary hero-intro-copy hero-intro-secondary">
            <div class="hero-action-row hero-secondary-seq hero-secondary-1">
              <a class="button-primary" href="#reserva">Consultar disponibilidade</a>
              <a class="button-secondary" href="${h(getPrimaryContactHref())}" target="_blank" rel="noreferrer noopener">${h(getPrimaryContactLabel())}</a>
            </div>
            <div class="hero-proof-strip hero-secondary-seq hero-secondary-2">
              <span>hotel & restaurante</span>
              <span>reserva direta</span>
              <span>Uruaú, Ceará</span>
            </div>
          </div>
        </div>
        <aside class="hero-aside hero-intro-copy hero-intro-secondary">
          <div class="hero-aside-block hero-secondary-seq hero-secondary-1">
            <span>destino</span>
            <strong>${h(resort.location)}</strong>
          </div>
          <div class="hero-aside-block hero-secondary-seq hero-secondary-2">
            <span>check-in</span>
            <strong>${h(resort.checkIn)}</strong>
          </div>
          <div class="hero-aside-block hero-secondary-seq hero-secondary-3">
            <span>check-out</span>
            <strong>${h(resort.checkOut)}</strong>
          </div>
          <div class="hero-aside-block hero-aside-block-featured hero-secondary-seq hero-secondary-4">
            <span>perfil oficial</span>
            <strong>${h(resort.instagramHandle)}</strong>
            <small>reservas e mais informações por atendimento direto</small>
          </div>
          <a class="hero-aside-link hero-secondary-seq hero-secondary-5" href="#instagram">Ver imagens da casa</a>
        </aside>
      </div>
      <div class="hero-scroll-indicator hero-intro-copy hero-intro-blur">
        <span></span>
        <small>deslize para conhecer</small>
      </div>
    </section>
  `;
}

function tplReservationStudio(resort, activeSuite, summary) {
  const availability = getBookingAvailability(activeSuite);
  const blockedWindows = getUpcomingBlockedWindows(state.content, activeSuite.slug, 3);
  const contactPending = !resort.reservationWhatsapp && !resort.reservationEmail;
  const guestLimit = getBookingGuestLimit(activeSuite);
  const stayPresets = [1, 2, 3, 4].map((nights) => ({
    nights,
    active: summary.valid && summary.nights === nights,
  }));
  const submitState = getBookingSubmitState(summary, availability);
  return `
    <section class="reservation-studio section-shell" id="reserva">
      <div class="reservation-studio-shell">
        <div class="reservation-studio-copy reveal">
          <p class="kicker">reserva direta</p>
          <h2>Monte a consulta sem perder o contexto da estadia.</h2>
          <p>Escolha categoria, periodo e ocupacao com atalhos objetivos. O formulario mantem a agenda visivel, resume a estadia ao lado e so pede os dados essenciais para a equipe retornar.</p>
          <div class="reservation-side-image">
            <img src="${h(activeSuite.image || resort.signatureImage)}" alt="${h(activeSuite.name)}" loading="lazy" decoding="async" />
            <div class="reservation-image-caption">
              <span data-booking-suite-label>${h(activeSuite.name)}</span>
              <strong data-booking-period-label>${h(getBookingPeriodLabel(summary))}</strong>
            </div>
          </div>
          <div class="reservation-notes">
            <div>
              <span>categoria ativa</span>
              <strong data-booking-note-suite>${h(activeSuite.name)}</strong>
            </div>
            <div>
              <span>estadia</span>
              <strong data-booking-note-stay>${h(getBookingNightsLabel(summary))}</strong>
            </div>
            <div>
              <span>ocupacao</span>
              <strong data-booking-note-guests>${h(formatGuests(state.booking.guests))}</strong>
            </div>
          </div>
        </div>
        <aside class="booking-panel reveal">
          <div class="booking-panel-head">
            <p class="kicker">disponibilidade</p>
            <h2>Planeje sua chegada</h2>
            <p>O periodo bloqueado no site segue como pendente ate a confirmacao manual da pousada.</p>
          </div>
          <form class="booking-form booking-form-refined" id="booking-form" novalidate>
            <section class="booking-step">
              <div class="booking-step-head">
                <span>01</span>
                <div>
                  <strong>Categoria</strong>
                  <small>Troque a acomodacao sem sair da tela.</small>
                </div>
              </div>
              <div class="booking-chip-row" role="group" aria-label="Categorias de hospedagem">
                ${state.content.suites
                  .map(
                    (suite) => `
                      <button type="button" class="booking-choice-chip ${suite.slug === state.booking.suite ? "active" : ""}" data-booking-suite="${h(suite.slug)}" aria-pressed="${suite.slug === state.booking.suite ? "true" : "false"}">
                        <small>${h(suite.category || "suite")}</small>
                        <strong>${h(suite.name)}</strong>
                      </button>
                    `,
                  )
                  .join("")}
              </div>
            </section>
            <section class="booking-step">
              <div class="booking-step-head">
                <span>02</span>
                <div>
                  <strong>Periodo</strong>
                  <small>Datas validas atualizam a disponibilidade imediatamente.</small>
                </div>
              </div>
              <div class="field-grid booking-date-grid">
                <label class="field-block booking-date-field">
                  <span>Check-in</span>
                  <input type="date" name="checkin" value="${h(state.booking.checkin)}" />
                  <small data-booking-checkin-hint>${state.booking.checkin ? h(formatDateLabel(state.booking.checkin)) : "Escolha a chegada"}</small>
                </label>
                <label class="field-block booking-date-field">
                  <span>Check-out</span>
                  <input type="date" name="checkout" value="${h(state.booking.checkout)}" />
                  <small data-booking-checkout-hint>${state.booking.checkout ? h(formatDateLabel(state.booking.checkout)) : "Escolha a saida"}</small>
                </label>
              </div>
              <div class="booking-quick-grid" role="group" aria-label="Atalhos de estadia">
                ${stayPresets
                  .map(
                    (preset) => `
                      <button type="button" class="booking-quick-chip ${preset.active ? "active" : ""}" data-booking-stay="${preset.nights}">
                        ${preset.nights} ${preset.nights === 1 ? "noite" : "noites"}
                      </button>
                    `,
                  )
                  .join("")}
                <button type="button" class="booking-quick-chip" data-booking-weekend="1">Proximo fim de semana</button>
              </div>
            </section>
            <section class="booking-step">
              <div class="booking-step-head">
                <span>03</span>
                <div>
                  <strong>Hospedes</strong>
                  <small>Capacidade desta categoria: ate ${h(String(guestLimit))} ${guestLimit === 1 ? "pessoa" : "pessoas"}.</small>
                </div>
              </div>
              <div class="guest-stepper" role="group" aria-label="Quantidade de hospedes">
                <button type="button" class="guest-stepper-button" data-booking-guests-step="-1" aria-label="Reduzir hospedes">-</button>
                <div class="guest-stepper-display">
                  <strong data-booking-guests-count>${h(String(clampGuestCount(state.booking.guests, activeSuite)))}</strong>
                  <span data-booking-guests-label>${h(formatGuests(state.booking.guests))}</span>
                </div>
                <button type="button" class="guest-stepper-button" data-booking-guests-step="1" aria-label="Aumentar hospedes">+</button>
              </div>
            </section>
            <section class="booking-step booking-step-contact">
              <div class="booking-step-head">
                <span>04</span>
                <div>
                  <strong>Contato</strong>
                  <small>Nome e WhatsApp bastam para a equipe responder.</small>
                </div>
              </div>
              <div class="field-grid">
                <label class="field-block">
                  <span>Seu nome</span>
                  <input name="guestName" value="${h(state.booking.guestName)}" placeholder="Nome do responsavel" autocomplete="name" />
                </label>
                <label class="field-block">
                  <span>WhatsApp ou telefone</span>
                  <input name="guestContact" value="${h(state.booking.guestContact)}" placeholder="(85) 99999-9999" autocomplete="tel" inputmode="tel" />
                </label>
              </div>
              <label class="field-block">
                <span>E-mail</span>
                <input type="email" name="guestEmail" value="${h(state.booking.guestEmail)}" placeholder="email@exemplo.com" autocomplete="email" />
              </label>
              <label class="field-block">
                <span>Observacoes</span>
                <textarea name="notes" placeholder="Horario de chegada, preferencia de acomodacao ou pedido especial.">${h(state.booking.notes)}</textarea>
              </label>
            </section>
            <div class="booking-summary-card">
              <div class="booking-brand">
                <img src="${h(resort.profileImage)}" alt="${h(resort.name)}" loading="lazy" decoding="async" />
                <span>${h(resort.instagramHandle)}</span>
              </div>
              <div class="booking-summary-grid">
                <div><small>categoria</small><strong data-booking-summary-suite>${h(activeSuite.name)}</strong></div>
                <div><small>periodo</small><strong data-booking-summary-period>${h(getBookingPeriodLabel(summary))}</strong></div>
                <div><small>estadia</small><strong data-booking-summary-stay>${h(getEstimateLabel(summary, activeSuite))}</strong></div>
                <div><small>ocupacao</small><strong data-booking-summary-guests>${h(formatGuests(state.booking.guests))}</strong></div>
              </div>
              <div class="availability-badge ${availability.available ? "available" : availability.status === "invalid" ? "pending" : "unavailable"}" data-booking-availability>
                <small data-booking-availability-label>${h(availability.label)}</small>
                <strong data-booking-availability-detail>${h(availability.detail)}</strong>
              </div>
              <div class="blocked-window-list" data-booking-blocked>${buildBlockedWindowMarkup(blockedWindows)}</div>
              ${
                contactPending
                  ? `
                    <div class="booking-operational-note">
                      <small>atendimento direto</small>
                      <strong>Enquanto os demais canais sao atualizados, o contato segue pelo Instagram oficial da pousada.</strong>
                    </div>
                  `
                  : ""
              }
            </div>
            <button type="submit" class="booking-submit" data-booking-submit ${submitState.disabled ? "disabled" : ""}>${h(submitState.label)}</button>
            <p class="booking-submit-note" data-booking-submit-note>${h(submitState.note)}</p>
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
          <img src="${h(leadPanel.image)}" alt="${h(leadPanel.title)}" loading="lazy" decoding="async" />
          <div class="story-feature-copy">
            <small>${h(leadPanel.eyebrow)}</small>
            <strong>${h(leadPanel.title)}</strong>
            <p>${h(leadPanel.copy)}</p>
          </div>
        </article>
      </div>
      <div class="story-note-grid">
        ${supportPanels
          .map(
            (panel) => `
              <article class="story-note reveal">
                <div class="story-note-media"><img src="${h(panel.image)}" alt="${h(panel.title)}" loading="lazy" decoding="async" /></div>
                <div class="story-note-copy">
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
    <section class="stats-section">
      <div class="stats-grid section-shell">
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
        <p class="kicker">reserva e atendimento</p>
        <h2>Do primeiro contato a confirmacao da estadia.</h2>
        <p>O pedido entra no painel, bloqueia datas em andamento e segue para a equipe concluir a reserva sem conflito de agenda.</p>
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

function tplSuites(activeSuite) {
  const suiteFacts = getSuiteFacts(activeSuite);
  const hasAmenities = Array.isArray(activeSuite.amenities) && activeSuite.amenities.length > 0;
  return `
    <section class="suite-section section-shell" id="suites">
      <div class="section-heading reveal">
        <p class="kicker">hospedagem</p>
        <h2>Consulta direta para verificar a hospedagem.</h2>
        <p>O site abre o pedido e protege a agenda. A equipe retorna com disponibilidade, tarifa e categoria para o período solicitado.</p>
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
          <div class="suite-stage-media"><img src="${h(activeSuite.gallery[state.activeGalleryIndex] || activeSuite.image)}" alt="${h(activeSuite.name)}" loading="lazy" decoding="async" /></div>
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
                  (image, index) => `<button type="button" class="gallery-thumb ${index === state.activeGalleryIndex ? "active" : ""}" data-gallery-index="${index}"><img src="${h(image)}" alt="${h(activeSuite.name)} ${index + 1}" loading="lazy" decoding="async" /></button>`,
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
          <p class="kicker">movimento</p>
          <h2>Filmagens do local publicadas no perfil oficial.</h2>
          <p>O vídeo abaixo usa um reel oficial da Deu Lagoa Uruaú com imagens da lagoa e da casa, sem apresentação em frente à câmera.</p>
          <div class="hero-action-row">
            <a class="button-primary" href="${h(getPrimaryContactHref())}" target="_blank" rel="noreferrer noopener">${h(getPrimaryContactLabel())}</a>
            <a class="button-secondary" href="${h(resort.featureVideoSourceUrl || resort.instagramUrl)}" target="_blank" rel="noreferrer noopener">Abrir reel oficial</a>
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
          <p class="kicker">a experiencia</p>
          <h2>Uma hospedagem guiada por agua, mesa e permanencia.</h2>
          <p>A casa combina paisagem, restaurante e atendimento direto para transformar a reserva em um plano completo de chegada.</p>
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
        <p class="kicker">perfil oficial</p>
        <h2>O que a própria marca comunica sobre o lugar.</h2>
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
  const posts = state.content.instagramPosts.slice(0, 4);
  return `
    <section class="instagram-section section-shell" id="instagram">
      <div class="section-heading reveal">
        <p class="kicker">imagens</p>
        <h2>Ambiente, hospedagem e lagoa em uma seleção mais limpa.</h2>
        <p>Os destaques abaixo usam imagens da própria operação para sustentar a leitura do lugar sem excesso de texto promocional.</p>
      </div>
      <div class="instagram-grid">
        ${posts
          .map(
            (post, index) => `
              <${post.sourceUrl ? "a" : "article"} class="instagram-card instagram-card-${(index % 3) + 1} reveal" ${post.sourceUrl ? `href="${h(post.sourceUrl)}" target="_blank" rel="noreferrer noopener"` : ""}>
                <img src="${h(post.image)}" alt="${h(post.caption)}" loading="lazy" decoding="async" />
                <div>
                  <small>${h(resort.instagramHandle)}</small>
                  <p>${h(post.caption)}</p>
                </div>
              </${post.sourceUrl ? "a" : "article"}>
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
        <p class="kicker">ritmo da casa</p>
        <h2>Uma jornada pensada para chegar, ficar e prolongar o dia.</h2>
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
        <p class="kicker">assinatura</p>
        <h2>Frases que resumem o tom da casa.</h2>
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
        <p class="kicker">perguntas</p>
        <h2>Informações públicas confirmadas até aqui.</h2>
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
  const dateLabel =
    state.booking.checkin && state.booking.checkout
      ? `${formatDateLabel(state.booking.checkin)} - ${formatDateLabel(state.booking.checkout)}`
      : "Defina o período desejado";
  return `
    <section class="final-cta section-shell" id="contato">
      <div class="final-cta-card reveal" style="background-image: linear-gradient(120deg, rgba(5, 12, 14, 0.44), rgba(5, 12, 14, 0.78)), url('${h(resort.signatureImage || activeSuite.image)}');">
        <div class="final-cta-copy">
          <p class="kicker">contato</p>
          <h2>Se o período fizer sentido para a sua viagem, a equipe conclui o restante por atendimento direto.</h2>
          <p>${h(resort.tagline)}</p>
          <div class="contact-rail">${contactLinks.map((item) => `<a class="contact-link" href="${h(item.href)}" ${item.external ? 'target="_blank" rel="noreferrer noopener"' : ""}>${h(item.label)}</a>`).join("")}</div>
        </div>
        <div class="final-cta-summary">
          <small>consulta enviada</small>
          <strong>${h(activeSuite.name)}</strong>
          <span>${h(dateLabel)}</span>
          <span>${h(formatGuests(state.booking.guests))}</span>
          <b>${h(getEstimateLabel(summary, activeSuite))}</b>
        </div>
      </div>
    </section>
  `;
}

function tplSiteFooter() {
  const resort = state.content.resort;
  return `
    <footer class="site-footer section-shell">
      <div class="site-footer-shell">
        <div class="site-footer-brand">
          <strong>${h(resort.name)}</strong>
          <p>${h(resort.location)}</p>
        </div>
        <div class="site-footer-meta">
          <span>Reservas por atendimento direto</span>
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
      <a class="mobile-dock-link" href="#reserva">Consultar</a>
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
        <article><strong>${state.content.suites.length}</strong><span>categorias cadastradas</span></article>
        <article><strong>${metrics.activeCount}</strong><span>reservas bloqueando agenda</span></article>
        <article><strong>${metrics.pendingCount}</strong><span>solicita\u00e7\u00f5es pendentes</span></article>
        <article><strong>${h(getAverageRateLabel())}</strong><span>tarif?rio cadastrado</span></article>
        <article><strong>${metrics.occupancyRate}%</strong><span>ocupa\u00e7\u00e3o projetada em 90 dias</span></article>
        <article><strong>${h(state.content.resort.location)}</strong><span>opera\u00e7\u00e3o atual</span></article>
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
      <a class="brand-lockup" href="#/hotel">
        <span class="brand-orb"></span>
        <span class="brand-copy"><strong>${h(state.content.resort.name)}</strong><small>painel operacional</small></span>
      </a>
      <button type="button" class="menu-toggle" data-action="toggle-menu" aria-label="Abrir menu"><span></span><span></span></button>
      <nav class="site-nav ${state.menuOpen ? "open" : ""}">
        <a class="${state.route.tab === "suites" ? "active" : ""}" href="#/vendedor/suites">Hospedagem</a>
        <a class="${state.route.tab === "experiencias" ? "active" : ""}" href="#/vendedor/experiencias">Experi\u00eancias</a>
        <a class="${state.route.tab === "reservas" ? "active" : ""}" href="#/vendedor/reservas">Reservas</a>
        <a class="${state.route.tab === "midia" ? "active" : ""}" href="#/vendedor/midia">M\u00eddia</a>
        <a class="${state.route.tab === "config" ? "active" : ""}" href="#/vendedor/config">Configura\u00e7\u00f5es</a>
        <a class="${state.route.tab === "operacao" ? "active" : ""}" href="#/vendedor/operacao">Opera\u00e7\u00e3o</a>
      </nav>
      <div class="header-actions"><a class="header-subtle" href="#/hotel">Ver site</a><button type="button" class="header-button seller-logout" data-action="logout-seller">Sair</button></div>
    </header>
  `;
}

function tplSellerLogin() {
  return `
    <main class="seller-login-shell section-shell">
      <section class="seller-login-card reveal">
        <p class="kicker">\u00e1rea interna</p>
        <h1>Painel da pousada</h1>
        <p>Edite su\u00edtes, experi\u00eancias, reservas, m\u00eddia e configura\u00e7\u00f5es sem misturar a opera\u00e7\u00e3o com o site institucional.</p>
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
        <p>Total registrado no painel da pousada.</p>
      </article>
      <article>
        <small>stack</small>
        <strong>Postgres-ready</strong>
        <p>Schema e checklist de produ\u00e7\u00e3o j\u00e1 inclu\u00eddos no projeto.</p>
      </article>
      <article>
        <small>status p\u00fablico</small>
        <strong>fontes validadas</strong>
        <p>Instagram oficial e localiza\u00e7\u00e3o p\u00fablica conferidos em 02/04/2026.</p>
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
        <div class="seller-panel-head"><div><small>cadastro</small><h2>Categorias de hospedagem</h2></div><button type="button" class="seller-link-button" data-action="new-suite">Nova categoria</button></div>
        <div class="seller-list">
          ${state.content.suites
            .map(
              (suite) => `<button type="button" class="seller-card ${suite.slug === state.seller.suiteEditSlug ? "active" : ""}" data-edit-suite="${h(suite.slug)}"><div><strong>${h(suite.name)}</strong><span>${h(suite.category)}</span></div><small>${h(formatCurrency(suite.rate))}</small></button>`,
            )
            .join("")}
        </div>
      </article>
      <article class="seller-panel seller-panel-form">
        <div class="seller-panel-head"><div><small>edicao</small><h2>${h(editSuite.name || "Nova categoria")}</h2></div>${editSuite.slug ? `<button type="button" class="seller-link-button danger-link" data-action="delete-suite" data-suite="${h(editSuite.slug)}">Excluir</button>` : ""}</div>
        ${tplSellerSuitePreview(editSuite)}
        <form class="seller-form" id="seller-suite-form">
          <input type="hidden" name="slug" value="${h(editSuite.slug || "")}" />
          <div class="seller-two-col"><label class="field-block"><span>Nome</span><input name="name" value="${h(editSuite.name || "")}" required /></label><label class="field-block"><span>Categoria</span><input name="category" value="${h(editSuite.category || "")}" required /></label></div>
          <div class="seller-four-col"><label class="field-block"><span>Diária</span><input type="number" min="0" name="rate" value="${h(editSuite.rate || 0)}" /></label><label class="field-block"><span>Tamanho</span><input name="size" value="${h(editSuite.size || "")}" /></label><label class="field-block"><span>Hóspedes</span><input type="number" min="0" name="guests" value="${h(editSuite.guests || 0)}" /></label><label class="field-block"><span>Camas</span><input name="beds" value="${h(editSuite.beds || "")}" /></label></div>
          <label class="field-block"><span>Imagem principal</span><input name="image" value="${h(editSuite.image || "")}" /></label>
          <label class="field-block"><span>Resumo</span><textarea name="summary" required>${h(editSuite.summary || "")}</textarea></label>
          <label class="field-block"><span>Descrição completa</span><textarea name="details" required>${h(editSuite.details || "")}</textarea></label>
          <label class="field-block"><span>Amenidades (uma por linha)</span><textarea name="amenities">${h((editSuite.amenities || []).join("\n"))}</textarea></label>
          <label class="field-block"><span>Galeria (uma URL por linha)</span><textarea name="gallery">${h((editSuite.gallery || []).join("\n"))}</textarea></label>
          <button type="submit" class="booking-submit">Salvar categoria</button>
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
              : `<article class="seller-empty-state"><strong>Sem reservas ainda</strong><p>A primeira solicitacao de disponibilidade criada no site aparecera aqui com bloqueio de datas e status operacional.</p></article>`
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
        <div class="seller-panel-head"><div><small>fontes institucionais</small><h2>Referencias e dados confiaveis</h2></div></div>
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
          <small>pendente de confirmacao direta</small>
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
                (post) => `<button type="button" class="seller-card ${post.id === state.seller.instagramEditId ? "active" : ""}" data-edit-instagram="${h(post.id)}"><div><strong>${h(post.caption.slice(0, 42))}${post.caption.length > 42 ? "..." : ""}</strong><span>${h(post.image)}</span></div><small>${h(post.sourceUrl ? "Instagram" : "Local")}</small></button>`,
              )
              .join("")}
          </div>
        </article>
        <article class="seller-panel seller-panel-form">
          <div class="seller-panel-head"><div><small>edicao</small><h2>${h(editInstagram.id ? "Destaque visual" : "Novo destaque")}</h2></div>${editInstagram.id ? `<button type="button" class="seller-link-button danger-link" data-action="delete-instagram" data-id="${h(editInstagram.id)}">Excluir</button>` : ""}</div>
          <form class="seller-form" id="seller-instagram-form">
            <input type="hidden" name="id" value="${h(editInstagram.id || "")}" />
            <label class="field-block"><span>Imagem</span><input name="image" value="${h(editInstagram.image || "")}" required /></label>
            <label class="field-block"><span>URL de origem</span><input name="sourceUrl" value="${h(editInstagram.sourceUrl || "")}" placeholder="https://www.instagram.com/..." /></label>
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
        <div class="seller-panel-head"><div><small>institucional</small><h2>Configuracoes da pousada</h2></div><button type="button" class="seller-link-button" data-action="reset-content">Restaurar padrao</button></div>
        <div class="config-note">
          <small>contatos oficiais</small>
          <p>Telefone, WhatsApp e e-mail abaixo sao campos operacionais. Preencha os canais oficiais da pousada para refletir o atendimento real no site.</p>
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

function shouldShowIntro() {
  return parseRoute().name === "buyer" && !introPlayedThisLoad;
}

function syncIntroState() {
  document.body.classList.toggle("intro-active", state.route.name === "buyer" && state.introVisible);
  if (introTimer) {
    window.clearTimeout(introTimer);
    introTimer = 0;
  }
  if (introSecondaryTimer) {
    window.clearTimeout(introSecondaryTimer);
    introSecondaryTimer = 0;
  }
  if (introBlurTimer) {
    window.clearTimeout(introBlurTimer);
    introBlurTimer = 0;
  }
  if (introExitTimer) {
    window.clearTimeout(introExitTimer);
    introExitTimer = 0;
  }

  const heroVideo = app.querySelector("[data-hero-video='1']");
  if (heroVideo instanceof HTMLVideoElement) {
    primeIntroVideo(heroVideo);
    ensureHeroVideoPlayback(heroVideo);
  }

  if (!(state.route.name === "buyer" && state.introVisible)) return;
  if (heroVideo instanceof HTMLVideoElement) {
    scheduleIntroFromVideo(heroVideo);
    return;
  }
  introTimer = window.setTimeout(startIntroTransition, INTRO_FALLBACK_HOLD_MS);
}

function scheduleIntroFromVideo(heroVideo) {
  if (heroVideo.dataset.introScheduled === "1") return;
  heroVideo.dataset.introScheduled = "1";
  if (introTimer) {
    window.clearTimeout(introTimer);
    introTimer = 0;
  }
  introTimer = window.setTimeout(startIntroTransition, INTRO_VIDEO_HOLD_MS);
}

function primeIntroVideo(heroVideo) {
  if (heroVideo.dataset.introPrimed === "1") return;

  const seekPastSlate = () => {
    if (heroVideo.dataset.introPrimed === "1") return;
    const duration = Number(heroVideo.duration || 0);
    if (!Number.isFinite(duration) || duration <= INTRO_VIDEO_OFFSET_SECONDS + 0.25) return;
    heroVideo.currentTime = INTRO_VIDEO_OFFSET_SECONDS;
    heroVideo.dataset.introPrimed = "1";
  };

  if (heroVideo.readyState >= 1) {
    seekPastSlate();
    return;
  }

  heroVideo.addEventListener("loadedmetadata", seekPastSlate, { once: true });
}

function ensureHeroVideoPlayback(heroVideo) {
  heroVideo.autoplay = true;
  heroVideo.loop = true;
  heroVideo.muted = true;
  heroVideo.defaultMuted = true;
  heroVideo.playsInline = true;
  heroVideo.setAttribute("autoplay", "");
  heroVideo.setAttribute("muted", "");
  heroVideo.setAttribute("playsinline", "");
  heroVideo.setAttribute("webkit-playsinline", "");
  heroVideo.removeAttribute("controls");

  const tryPlay = () => {
    heroVideo.play().catch(() => {});
  };

  tryPlay();
  if (heroVideo.readyState < 3) {
    heroVideo.addEventListener("canplay", tryPlay, { once: true });
  }
}

function startIntroTransition() {
  if (!(state.route.name === "buyer" && state.introVisible)) return;
  if (introExitTimer) return;
  if (introTimer) {
    window.clearTimeout(introTimer);
    introTimer = 0;
  }

  const heroSection = app.querySelector(".hero-section");
  const header = app.querySelector(".site-header");

  if (heroSection instanceof HTMLElement) {
    heroSection.classList.add("intro-primary");
  }
  document.body.classList.add("intro-transitioning");
  document.body.classList.add("intro-primary");

  introSecondaryTimer = window.setTimeout(startIntroSecondaryPhase, INTRO_PRIMARY_REVEAL_MS);
  introBlurTimer = window.setTimeout(startIntroBlurPhase, INTRO_PRIMARY_REVEAL_MS + INTRO_SECONDARY_REVEAL_MS);
  introExitTimer = window.setTimeout(dismissIntro, INTRO_PRIMARY_REVEAL_MS + INTRO_SECONDARY_REVEAL_MS + INTRO_BLUR_REVEAL_MS);

  if (header instanceof HTMLElement) header.classList.remove("intro-revealing");
}

function startIntroSecondaryPhase() {
  if (!(state.route.name === "buyer" && state.introVisible)) return;
  const heroSection = app.querySelector(".hero-section");
  const header = app.querySelector(".site-header");

  document.body.classList.add("intro-secondary");
  if (heroSection instanceof HTMLElement) heroSection.classList.add("intro-secondary");
  if (header instanceof HTMLElement) header.classList.add("intro-revealing");
}

function startIntroBlurPhase() {
  if (!(state.route.name === "buyer" && state.introVisible)) return;
  const heroSection = app.querySelector(".hero-section");

  document.body.classList.add("intro-blurring");
  if (heroSection instanceof HTMLElement) heroSection.classList.add("intro-blurring");
}

function dismissIntro() {
  if (!state.introVisible) return;
  if (introTimer) {
    window.clearTimeout(introTimer);
    introTimer = 0;
  }
  if (introSecondaryTimer) {
    window.clearTimeout(introSecondaryTimer);
    introSecondaryTimer = 0;
  }
  if (introBlurTimer) {
    window.clearTimeout(introBlurTimer);
    introBlurTimer = 0;
  }
  if (introExitTimer) {
    window.clearTimeout(introExitTimer);
    introExitTimer = 0;
  }
  state.introVisible = false;
  introPlayedThisLoad = true;
  document.body.classList.remove("intro-active");
  document.body.classList.remove("intro-transitioning");
  document.body.classList.remove("intro-primary");
  document.body.classList.remove("intro-secondary");
  document.body.classList.remove("intro-blurring");
  const header = app.querySelector(".site-header");
  if (header instanceof HTMLElement) header.classList.remove("intro-revealing");
  const heroSection = app.querySelector(".hero-section");
  if (heroSection instanceof HTMLElement) {
    heroSection.classList.remove("intro-playing");
    heroSection.classList.remove("intro-primary");
    heroSection.classList.remove("intro-secondary");
    heroSection.classList.remove("intro-blurring");
    heroSection.classList.add("intro-complete");
    heroSection.classList.add("intro-settled");
  }
  bindReveal();
  syncHeader();
  requestScrollEffects();
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
  return "Instagram da pousada";
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
      detail: "Defina um período válido para consultar a agenda.",
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
      label: "indisponível nesse período",
      detail: "Já existe bloqueio pendente ou confirmado nessa janela.",
    };
  }

  return {
    status: "available",
    available: true,
    label: "disponibilidade preliminar",
    detail: "Livre para receber a solicitação e seguir para confirmação.",
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
  return { id: "", image: "", caption: "", sourceUrl: "" };
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
  state.booking.guests = clampGuestCount(state.booking.guests, getActiveSuite());
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

  const dismissIntroTrigger = event.target.closest('[data-action="dismiss-intro"]');
  if (dismissIntroTrigger) {
    dismissIntro();
    return;
  }

  const bookingSuiteTrigger = event.target.closest("[data-booking-suite]");
  if (bookingSuiteTrigger) {
    const slug = bookingSuiteTrigger.getAttribute("data-booking-suite") || state.content.suites[0]?.slug || "";
    applyBookingState({ suite: slug, guests: clampGuestCount(state.booking.guests, getSuiteBySlug(slug) || getActiveSuite()) }, { rerender: true });
    return;
  }

  const stayPresetTrigger = event.target.closest("[data-booking-stay]");
  if (stayPresetTrigger) {
    const nights = Number(stayPresetTrigger.getAttribute("data-booking-stay") || 0);
    if (nights > 0) applyBookingState(getStayPresetRange(nights));
    return;
  }

  const weekendTrigger = event.target.closest("[data-booking-weekend]");
  if (weekendTrigger) {
    applyBookingState(getNextWeekendRange());
    return;
  }

  const guestStepTrigger = event.target.closest("[data-booking-guests-step]");
  if (guestStepTrigger) {
    const direction = Number(guestStepTrigger.getAttribute("data-booking-guests-step") || 0);
    applyBookingState({ guests: clampGuestCount(Number(state.booking.guests || 1) + direction) });
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
    setNotice("Conteudo padrao restaurado no painel e no site.");
  }
}

function onInput(event) {
  const target = event.target;
  if (!(target instanceof HTMLInputElement || target instanceof HTMLSelectElement || target instanceof HTMLTextAreaElement)) return;
  const form = target.closest("form");
  if (!form || form.getAttribute("id") !== "booking-form") return;
  let value = target.value;
  if (target.name === "guestContact") {
    value = formatPhoneInput(value);
    target.value = value;
  }
  applyBookingState({
    [target.name]: target.name === "guests" ? Number(value) : value,
  });
}

function onChange(event) {
  const target = event.target;
  if (!(target instanceof HTMLInputElement || target instanceof HTMLSelectElement || target instanceof HTMLTextAreaElement)) return;
  const form = target.closest("form");
  if (!form || form.getAttribute("id") !== "booking-form") return;
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
      setNotice("Defina check-in e check-out válidos para consultar disponibilidade.");
      return;
    }
    if (!String(state.booking.guestName || "").trim() || !String(state.booking.guestContact || "").trim()) {
      setNotice("Preencha nome e contato para solicitar disponibilidade.");
      return;
    }
    if (
      hasReservationConflict(state.content, {
        suiteSlug: state.booking.suite,
        checkin: state.booking.checkin,
        checkout: state.booking.checkout,
      })
    ) {
      setNotice("Esse período já está bloqueado para a categoria selecionada. Escolha novas datas.");
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
    setNotice("Solicitação registrada. As datas agora aparecem bloqueadas como pendentes.");
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
  const currentSuite = currentSlug ? state.content.suites.find((suite) => suite.slug === currentSlug) : null;
  const image = String(fd.get("image") || "").trim() || currentSuite?.image || "";
  const gallery = lines(fd.get("gallery"));
  const payload = {
    slug: currentSlug || uniqueSlug(slugify(name), state.content.suites),
    name,
    category: String(fd.get("category") || "").trim(),
    rate: Number(fd.get("rate") || 0),
    size: String(fd.get("size") || "").trim(),
    guests: Number(fd.get("guests") || 0),
    beds: String(fd.get("beds") || "").trim(),
    image,
    gallery: gallery.length ? gallery : image ? [image] : currentSuite?.gallery || [],
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
  setNotice(`Suíte ${payload.name} salva com sucesso.`);
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
    sourceUrl: String(fd.get("sourceUrl") || "").trim(),
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
  setNotice("Suite removida do painel e do site.");
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

function formatPhoneInput(value) {
  const digits = String(value || "").replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function syncBookingStudio() {
  if (state.route.name !== "buyer") return;
  const form = app.querySelector("#booking-form");
  if (!(form instanceof HTMLFormElement)) return;

  const suite = getActiveSuite();
  const summary = getBookingSummary();
  const availability = getBookingAvailability(suite);
  const submitState = getBookingSubmitState(summary, availability);
  const blockedWindows = getUpcomingBlockedWindows(state.content, suite.slug, 3);
  const guestLimit = getBookingGuestLimit(suite);
  const today = todayIso();

  const checkinInput = form.elements.namedItem("checkin");
  if (checkinInput instanceof HTMLInputElement) {
    checkinInput.min = today;
    if (checkinInput.value !== state.booking.checkin) checkinInput.value = state.booking.checkin;
  }

  const checkoutInput = form.elements.namedItem("checkout");
  if (checkoutInput instanceof HTMLInputElement) {
    checkoutInput.min = state.booking.checkin ? addDaysIso(state.booking.checkin, 1) : today;
    if (checkoutInput.value !== state.booking.checkout) checkoutInput.value = state.booking.checkout;
  }

  form.querySelectorAll("[data-booking-suite]").forEach((node) => {
    const active = node.getAttribute("data-booking-suite") === suite.slug;
    node.classList.toggle("active", active);
    node.setAttribute("aria-pressed", active ? "true" : "false");
  });

  form.querySelectorAll("[data-booking-stay]").forEach((node) => {
    const nights = Number(node.getAttribute("data-booking-stay") || 0);
    node.classList.toggle("active", summary.valid && summary.nights === nights);
  });

  const weekendButton = form.querySelector("[data-booking-weekend]");
  if (weekendButton instanceof HTMLElement) {
    const weekend = getNextWeekendRange();
    weekendButton.classList.toggle("active", state.booking.checkin === weekend.checkin && state.booking.checkout === weekend.checkout);
  }

  const minusButton = form.querySelector('[data-booking-guests-step="-1"]');
  const plusButton = form.querySelector('[data-booking-guests-step="1"]');
  if (minusButton instanceof HTMLButtonElement) minusButton.disabled = Number(state.booking.guests || 1) <= 1;
  if (plusButton instanceof HTMLButtonElement) plusButton.disabled = Number(state.booking.guests || 1) >= guestLimit;

  const guestCount = app.querySelector("[data-booking-guests-count]");
  if (guestCount) guestCount.textContent = String(state.booking.guests || 1);
  const guestLabel = app.querySelector("[data-booking-guests-label]");
  if (guestLabel) guestLabel.textContent = formatGuests(state.booking.guests);

  const checkinHint = app.querySelector("[data-booking-checkin-hint]");
  if (checkinHint) checkinHint.textContent = state.booking.checkin ? formatDateLabel(state.booking.checkin) : "Escolha a chegada";
  const checkoutHint = app.querySelector("[data-booking-checkout-hint]");
  if (checkoutHint) checkoutHint.textContent = state.booking.checkout ? formatDateLabel(state.booking.checkout) : "Escolha a saida";

  const suiteLabel = app.querySelector("[data-booking-suite-label]");
  if (suiteLabel) suiteLabel.textContent = suite.name;
  const periodLabel = app.querySelector("[data-booking-period-label]");
  if (periodLabel) periodLabel.textContent = getBookingPeriodLabel(summary);
  const noteSuite = app.querySelector("[data-booking-note-suite]");
  if (noteSuite) noteSuite.textContent = suite.name;
  const noteStay = app.querySelector("[data-booking-note-stay]");
  if (noteStay) noteStay.textContent = getBookingNightsLabel(summary);
  const noteGuests = app.querySelector("[data-booking-note-guests]");
  if (noteGuests) noteGuests.textContent = formatGuests(state.booking.guests);

  const summarySuite = app.querySelector("[data-booking-summary-suite]");
  if (summarySuite) summarySuite.textContent = suite.name;
  const summaryPeriod = app.querySelector("[data-booking-summary-period]");
  if (summaryPeriod) summaryPeriod.textContent = getBookingPeriodLabel(summary);
  const summaryStay = app.querySelector("[data-booking-summary-stay]");
  if (summaryStay) summaryStay.textContent = getEstimateLabel(summary, suite);
  const summaryGuests = app.querySelector("[data-booking-summary-guests]");
  if (summaryGuests) summaryGuests.textContent = formatGuests(state.booking.guests);

  const availabilityCard = app.querySelector("[data-booking-availability]");
  if (availabilityCard) {
    availabilityCard.classList.remove("available", "pending", "unavailable");
    availabilityCard.classList.add(availability.available ? "available" : availability.status === "invalid" ? "pending" : "unavailable");
  }
  const availabilityLabel = app.querySelector("[data-booking-availability-label]");
  if (availabilityLabel) availabilityLabel.textContent = availability.label;
  const availabilityDetail = app.querySelector("[data-booking-availability-detail]");
  if (availabilityDetail) availabilityDetail.textContent = availability.detail;

  const blocked = app.querySelector("[data-booking-blocked]");
  if (blocked) blocked.innerHTML = buildBlockedWindowMarkup(blockedWindows);

  const submitButton = app.querySelector("[data-booking-submit]");
  if (submitButton instanceof HTMLButtonElement) {
    submitButton.disabled = submitState.disabled;
    submitButton.textContent = submitState.label;
  }
  const submitNote = app.querySelector("[data-booking-submit-note]");
  if (submitNote) submitNote.textContent = submitState.note;
}

function persistContent() {
  state.content.meta = {
    ...(state.content.meta || {}),
    updatedAt: new Date().toISOString(),
    persistence: "localStorage",
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
    `Olá, equipe ${resort.name}.`,
    `Registrei um pedido de disponibilidade pelo site.`,
    ``,
    `Hóspede: ${reservation?.guestName || state.booking.guestName}`,
    `Contato: ${reservation?.guestContact || state.booking.guestContact}`,
    state.booking.guestEmail ? `E-mail: ${state.booking.guestEmail}` : "",
    `Categoria: ${suite.name}`,
    `Check-in: ${state.booking.checkin}`,
    `Check-out: ${state.booking.checkout}`,
    `Hóspedes: ${formatGuests(state.booking.guests)}`,
    `Estimativa: ${getEstimateLabel(summary, suite)}`,
    state.booking.notes ? `Observações: ${state.booking.notes}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  if (resort.reservationWhatsapp) {
    return `https://wa.me/${resort.reservationWhatsapp}?text=${encodeURIComponent(message)}`;
  }
  if (resort.reservationEmail) {
    return `mailto:${resort.reservationEmail}?subject=${encodeURIComponent(`Solicitação | ${suite.name}`)}&body=${encodeURIComponent(message)}`;
  }
  return resort.instagramUrl;
}

function onKeydown(event) {
  if (event.key === "Escape" && state.menuOpen) {
    state.menuOpen = false;
    render();
    return;
  }

  if (event.key === "Escape" && state.introVisible) {
    dismissIntro();
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
  nodes.forEach((node, index) => node.style.setProperty("--reveal-delay", `${Math.min(index % 6, 5) * 70}ms`));
  if (state.route.name === "buyer" && state.introVisible) return;
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
    { threshold: 0.1, rootMargin: "0px 0px -8% 0px" },
  );

  nodes.forEach((node) => revealObserver.observe(node));
  syncVisibleReveals(nodes);
}

function syncVisibleReveals(nodes = app.querySelectorAll(".reveal")) {
  if (!nodes.length) return;
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 0;
  nodes.forEach((node) => {
    if (!(node instanceof HTMLElement) || node.classList.contains("in-view")) return;
    const rect = node.getBoundingClientRect();
    const entersViewport = rect.top <= viewportHeight * 0.92;
    const notFarAbove = rect.bottom >= viewportHeight * 0.08;
    if (!entersViewport || !notFarAbove) return;
    node.classList.add("in-view");
    if (revealObserver) revealObserver.unobserve(node);
  });
  animateCounters();
}

function onScroll() {
  syncHeader();
  syncVisibleReveals();
  requestScrollEffects();
}

function requestScrollEffects() {
  if (scrollFrame) return;
  scrollFrame = window.requestAnimationFrame(syncScrollEffects);
}

function syncScrollEffects() {
  scrollFrame = 0;
  if (state.route.name !== "buyer") return;

  const viewportHeight = Math.max(window.innerHeight || 0, 1);
  const hero = app.querySelector(".hero-section");
  if (hero instanceof HTMLElement) {
    const rect = hero.getBoundingClientRect();
    const progress = Math.max(0, Math.min(1.4, (-rect.top || 0) / Math.max(rect.height * 0.92, 1)));
    hero.style.setProperty("--hero-progress", progress.toFixed(3));
  }

  const mediaTargets = [
    [".story-feature img", 24],
    [".story-note-media img", 18],
    [".suite-stage-media img", 18],
    [".reservation-side-image img", 16],
    [".cinema-frame video", 28],
    [".instagram-card img", 14],
  ];

  mediaTargets.forEach(([selector, amplitude]) => {
    app.querySelectorAll(selector).forEach((node) => {
      const rect = node.getBoundingClientRect();
      const centerOffset = rect.top + rect.height / 2 - viewportHeight / 2;
      const normalized = centerOffset / viewportHeight;
      const translate = Math.max(-amplitude, Math.min(amplitude, normalized * -amplitude));
      node.style.setProperty("--media-parallax-y", `${translate.toFixed(2)}px`);
    });
  });
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
