(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=e=>`./${e}`,t={version:8,resort:{name:`Hotel Resto Deu Lagoa Uruau`,tagline:`Hotel, restaurante e vista para a lagoa em Uruau.`,heroTitle:`Lagoa, mesa e estadia no mesmo ritmo.`,heroCopy:`A Deu Lagoa reune hospedagem, restaurante e uma vista que conduz o tempo do Uruau. Um endereco para chegar sem pressa, ficar perto da agua e reservar direto com a equipe.`,storyTitle:`Uma casa de lagoa pensada para mesa, descanso e permanencia.`,storyCopy:`A experiencia comeca na paisagem, atravessa o resto e segue para estadias desenhadas para fins de semana prolongados, encontros a dois e dias inteiros perto da agua.`,location:`Lagoa do Uruau, Beberibe - Ceara`,reservationPhone:``,reservationWhatsapp:``,reservationEmail:``,checkIn:`sob consulta`,checkOut:`sob consulta`,seasonLabel:`Deu Lagoa | Hotel + Resto | Uruau`,sellerCode:`deulagoa2026`,heroImage:e(`deu-lagoa/hero-lagoa-hq.jpg`),profileImage:e(`deu-lagoa/perfil.jpg`),signatureImage:e(`deu-lagoa/resto-noite-hq.jpg`),culinaryImage:e(`deu-lagoa/suite-casal-hq.jpg`),featureVideo:e(`deu-lagoa/lagoa-cinema.mp4`),featureVideoPoster:e(`deu-lagoa/hero-lagoa-hq.jpg`),instagramHandle:`@deulagoauruau`,instagramUrl:`https://www.instagram.com/deulagoauruau/`},stats:[{value:`Lagoa`,label:`a paisagem organiza a chegada e a permanencia`},{value:`Resto`,label:`mesa e hospedagem dividem o mesmo endereco`},{value:`Hotel`,label:`estadias com atendimento direto da equipe`},{value:`Uruau`,label:`Beberibe, Ceara, como destino principal`}],storyPanels:[{id:`story-1`,eyebrow:`paisagem`,title:`A lagoa define a chegada.`,copy:`A vista abre a experiencia, acalma o ritmo e sustenta a primeira impressao da casa.`,image:e(`deu-lagoa/hero-lagoa-hq.jpg`)},{id:`story-2`,eyebrow:`resto`,title:`Mesa e hospedagem no mesmo endereco.`,copy:`O restaurante amplia a estadia e faz da reserva uma experiencia que atravessa o dia inteiro.`,image:e(`deu-lagoa/resto-noite-hq.jpg`)},{id:`story-3`,eyebrow:`permanencia`,title:`O ritmo e de permanencia.`,copy:`Quartos, areas comuns e atendimento direto foram organizados para estadias mais longas e reservas acompanhadas pela equipe.`,image:e(`deu-lagoa/suite-casal-hq.jpg`)}],suites:[{slug:`consulta-hospedagem`,name:`Reserva de hospedagem`,category:`estadia`,rate:0,size:``,guests:0,beds:``,image:e(`deu-lagoa/suite-casal-hq.jpg`),gallery:[e(`deu-lagoa/suite-casal-hq.jpg`),e(`deu-lagoa/hero-lagoa-hq.jpg`),e(`deu-lagoa/resto-noite-hq.jpg`)],summary:`Atendimento direto para confirmar categoria, tarifa e datas com a equipe da pousada.`,details:`Use esta opcao para iniciar a consulta de disponibilidade e receber a orientacao mais adequada para o periodo desejado.`,amenities:[]},{slug:`consulta-experiencia`,name:`Estadia Deu Lagoa`,category:`hotel + resto`,rate:0,size:``,guests:0,beds:``,image:e(`deu-lagoa/resto-noite-hq.jpg`),gallery:[e(`deu-lagoa/resto-noite-hq.jpg`),e(`deu-lagoa/hero-lagoa-hq.jpg`),e(`deu-lagoa/familia-hq.jpg`)],summary:`Uma consulta pensada para quem quer alinhar hospedagem, mesa e programacao na mesma reserva.`,details:`Ideal para estadias que combinam acomodacao, restaurante e planejamento de chegada com acompanhamento da equipe.`,amenities:[]}],rituals:[{title:`Paisagem como protagonista`,copy:`A vista para a lagoa organiza a arquitetura, a experiencia e o tempo da estadia.`},{title:`Mesa e estadia integradas`,copy:`Hospedagem e restaurante convivem no mesmo gesto de chegada e permanencia.`},{title:`Reserva acompanhada`,copy:`A equipe recebe o pedido, confirma agenda e orienta cada estadia ate a finalizacao.`}],experiences:[{id:`exp-1`,name:`Vista para a lagoa`,duration:`paisagem`,description:`A agua permanece no centro da experiencia e acompanha a casa do check-in ao fim da tarde.`},{id:`exp-2`,name:`Mesa da casa`,duration:`resto`,description:`O restaurante amplia a estadia e transforma a reserva em programa completo.`},{id:`exp-3`,name:`Estadia em Uruau`,duration:`hotel`,description:`A pousada se posiciona como endereco para desacelerar, ficar perto da lagoa e permanecer mais tempo.`},{id:`exp-4`,name:`Reserva direta`,duration:`atendimento`,description:`O pedido chega a equipe, que confirma categoria, valores, agenda e detalhes da estadia.`}],itinerary:[{time:`chegada`,title:`Check-in com vista aberta para a lagoa`,description:`A primeira impressao ja organiza a estadia em torno da paisagem e do ritmo da agua.`},{time:`tarde`,title:`Piscina, descanso e tempo mais lento`,description:`A casa funciona melhor quando a estadia acompanha o ritmo do lugar, sem pressa para sair.`},{time:`noite`,title:`Mesa acesa no resto`,description:`O restaurante complementa a experiencia e faz da noite uma extensao natural da hospedagem.`},{time:`reserva`,title:`Equipe confirma a estadia`,description:`O pedido de disponibilidade abre o atendimento direto e evita conflito de agenda no periodo solicitado.`}],testimonials:[{quote:`Hotel e restaurante a beira da lagoa.`,author:`Deu Lagoa`},{quote:`Experiencias, sabores e conforto.`,author:`Deu Lagoa`},{quote:`Uruau em um ritmo mais calmo.`,author:`Deu Lagoa`}],faq:[{question:`Como funciona a reserva?`,answer:`O pedido de disponibilidade chega a equipe, que confirma categoria, valores e politicas antes da finalizacao.`},{question:`Os valores aparecem no site?`,answer:`As tarifas podem ser informadas diretamente pela equipe, de acordo com periodo, categoria e disponibilidade.`},{question:`Posso reservar pelo Instagram?`,answer:`Sim. O perfil oficial segue como um dos canais de atendimento rapido para pedidos de disponibilidade.`},{question:`A disponibilidade e atualizada em tempo real?`,answer:`O sistema bloqueia pedidos pendentes e reservas confirmadas para evitar conflito de agenda durante o atendimento.`}],policies:[`Hotel, resto e lagoa no mesmo endereco.`,`Reserva direta com acompanhamento da equipe.`,`Atendimento integrado ao Instagram oficial.`,`Agenda protegida contra sobreposicao de datas.`],instagramPosts:[{id:`ig-1`,image:e(`deu-lagoa/hero-lagoa-hq.jpg`),caption:`A lagoa aparece como plano principal da casa.`},{id:`ig-2`,image:e(`deu-lagoa/resto-noite-hq.jpg`),caption:`Noite acesa no resto, com a casa operando em ritmo de estadia.`},{id:`ig-3`,image:e(`deu-lagoa/suite-casal-hq.jpg`),caption:`Quartos pensados para permanencia, descanso e chegada sem pressa.`},{id:`ig-4`,image:e(`deu-lagoa/familia-hq.jpg`),caption:`Convivencia leve entre agua, areas comuns e dias mais longos.`},{id:`ig-5`,image:e(`deu-lagoa/inauguracao-hq.jpg`),caption:`A marca aparece com tom de casa aberta, mesa pronta e paisagem presente.`},{id:`ig-6`,image:e(`deu-lagoa/lagoa.jpg`),caption:`Uruau como destino de agua calma, luz baixa e estadia prolongada.`}],reservations:[],reservationSettings:{blockingStatuses:[`pending`,`confirmed`],leadExpiryHours:24},verification:{checkedAt:`2026-04-02`,verifiedFacts:[{id:`vf-1`,label:`O perfil oficial usa o nome Hotel Resto Deu Lagoa Uruau e o handle @deulagoauruau.`,sourceLabel:`Instagram oficial`,sourceUrl:`https://www.instagram.com/deulagoauruau/`},{id:`vf-2`,label:`A bio publica traz as linhas Hotel & Restaurante, Vista encantadora da lagoa e Experiencias, sabores e conforto.`,sourceLabel:`Instagram oficial`,sourceUrl:`https://www.instagram.com/deulagoauruau/`},{id:`vf-3`,label:`A Lagoa do Uruau esta em Beberibe, Ceara.`,sourceLabel:`Semace`,sourceUrl:`https://www.semace.ce.gov.br/2021/05/26/lagoa-do-urau-operacao-de-fiscalizacao-da-semace-e-bpma-resulta-em-embargos-e-auto-de-infracao/`}],pendingValidation:[`Telefone operacional`,`WhatsApp comercial`,`E-mail oficial de reservas`,`Tipos reais de quarto`,`Tarifas oficiais`,`Politicas financeiras e de cancelamento`]},ops:{stack:[{title:`Banco de dados`,description:`PostgreSQL com bloqueio transacional por periodo e estrutura para multiusuario.`},{title:`Aplicacao`,description:`Frontend institucional com painel operacional separado do site.`},{title:`API`,description:`Camada REST ou Supabase para reservas, autenticacao, auditoria e midia.`},{title:`Operacao`,description:`Fluxo de aprovacao, calendario, notificacoes, logs e backups.`}],bookingFlow:[{step:`01`,title:`Pedido de disponibilidade`,description:`O visitante envia interesse com nome, contato, categoria e periodo desejado.`},{step:`02`,title:`Bloqueio temporario`,description:`Status pendente e confirmado impedem dupla venda no mesmo intervalo cadastrado.`},{step:`03`,title:`Confirmacao operacional`,description:`A equipe confirma valores, politica, pagamento e disponibilidade final.`}],launchChecklist:[`Conectar o painel a Postgres ou Supabase antes da venda final.`,`Validar contatos oficiais com a pousada e preencher o painel com dados reais.`,`Configurar autenticacao real para vendedor, sem depender de codigo estatico.`,`Salvar reservas com auditoria e historico de alteracoes.`,`Ativar backups, politica LGPD e monitoramento de erros.`]},meta:{updatedAt:`2026-04-02T18:00:00.000Z`,persistence:`localStorage`}},n=[`pending`,`confirmed`];function r(e){let t=e?.reservationSettings?.blockingStatuses;return Array.isArray(t)&&t.length?t:n}function i(e,t){return r(e).includes(String(t?.status||``).toLowerCase())}function a(e,t,n=``){let r=String(t?.suiteSlug||``),a=String(t?.checkin||``),s=String(t?.checkout||``);return!r||!a||!s?!1:o(e,r).some(t=>n&&t.id===n||!i(e,t)?!1:u(a,s,t.checkin,t.checkout))}function o(e,t){return(e?.reservations||[]).filter(e=>e.suiteSlug===t).slice().sort((e,t)=>String(e.checkin||``).localeCompare(String(t.checkin||``)))}function s(e,t,n=3){let r=d(new Date().toISOString().slice(0,10));return o(e,t).filter(t=>i(e,t)).filter(e=>d(e.checkout)>=r).slice(0,n)}function c(e,t=90){let n=e?.suites||[],r=e?.reservations||[],a=n.length||1,o=new Date;o.setHours(0,0,0,0);let s=new Date(o);s.setDate(s.getDate()+t);let c=0,l=0,u=0;r.forEach(t=>{if(String(t.status||``)===`pending`&&(l+=1),!i(e,t))return;u+=1;let n=Math.max(d(t.checkin),Math.floor(o.getTime()/864e5)),r=Math.min(d(t.checkout),Math.floor(s.getTime()/864e5));r>n&&(c+=r-n)});let f=a*t;return{suiteCount:a,reservationCount:r.length,activeCount:u,pendingCount:l,blockedNights:c,occupancyRate:f?Math.min(100,Math.round(c/f*100)):0}}function l(e){return{id:String(e?.id||``),suiteSlug:String(e?.suiteSlug||``),guestName:String(e?.guestName||``),guestContact:String(e?.guestContact||``),guestEmail:String(e?.guestEmail||``),checkin:String(e?.checkin||``),checkout:String(e?.checkout||``),guests:Number(e?.guests||1),notes:String(e?.notes||``),status:String(e?.status||`pending`),source:String(e?.source||`site`),totalEstimate:Number(e?.totalEstimate||0),createdAt:String(e?.createdAt||new Date().toISOString())}}function u(e,t,n,r){let i=d(e),a=d(t),o=d(n),s=d(r);return!Number.isFinite(i)||!Number.isFinite(a)||!Number.isFinite(o)||!Number.isFinite(s)?!1:i<s&&o<a}function d(e){if(!e)return NaN;let t=new Date(`${e}T12:00:00`).getTime();return Number.isFinite(t)?Math.floor(t/864e5):NaN}function f(e){return new Intl.NumberFormat(`pt-BR`,{style:`currency`,currency:`BRL`,maximumFractionDigits:0}).format(Number(e)||0)}function p(e){let t=Number(e)||0;return`${t} ${t===1?`hospede`:`hospedes`}`}function ee(e,t){if(!e||!t)return 0;let n=new Date(`${e}T12:00:00`),r=new Date(`${t}T12:00:00`).getTime()-n.getTime();return!Number.isFinite(r)||r<=0?0:Math.round(r/864e5)}function m({suite:e,checkin:t,checkout:n,guests:r}){let i=ee(t,n);return{nights:i,total:i*(e?.rate||0),valid:!!(e&&i>0&&r>0)}}function h(e){if(!e)return``;try{return new Intl.DateTimeFormat(`pt-BR`,{day:`2-digit`,month:`short`}).format(new Date(`${e}T12:00:00`))}catch{return e}}function g(e,t){return!e||!t?``:`${h(e)} - ${h(t)}`}function _(e){let t=String(e||``).toLowerCase();return t===`confirmed`?`confirmada`:t===`cancelled`?`cancelada`:t===`completed`?`concluída`:`pendente`}function v(e){return String(e??``).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/\"/g,`&quot;`).replace(/'/g,`&#39;`)}var y=`deu_lagoa_content_v2`;function b(){let e=re(t,te());return x(e),e}function te(){try{let e=localStorage.getItem(y);return e?JSON.parse(e):null}catch{return null}}function x(e){localStorage.setItem(y,JSON.stringify(e))}function ne(){return x(t),S(t)}function S(e){return JSON.parse(JSON.stringify(e))}function re(e,t){if(!t)return S(e);let n=S(e),r=S(t);return n.resort={...n.resort,...r.resort||{}},n.stats=C(r.stats,n.stats),n.storyPanels=C(r.storyPanels,n.storyPanels),n.suites=C(r.suites,n.suites),n.rituals=C(r.rituals,n.rituals),n.experiences=C(r.experiences,n.experiences),n.itinerary=C(r.itinerary,n.itinerary),n.testimonials=C(r.testimonials,n.testimonials),n.faq=C(r.faq,n.faq),n.policies=C(r.policies,n.policies),n.instagramPosts=C(r.instagramPosts,n.instagramPosts),n.reservations=C(r.reservations,n.reservations),n.verification=w(n.verification,r.verification),n.ops=w(n.ops,r.ops),n.reservationSettings=w(n.reservationSettings,r.reservationSettings),n.meta={updatedAt:r?.meta?.updatedAt||new Date().toISOString(),persistence:`localStorage`},n.version=e.version,n}function C(e,t){return S(Array.isArray(e)?e:t)}function w(e,t){if(!t||typeof t!=`object`||Array.isArray(t))return S(e);let n=S(e);return Object.entries(t).forEach(([e,t])=>{Array.isArray(t)?n[e]=S(t):t&&typeof t==`object`?n[e]=w(n[e]||{},t):n[e]=t}),n}var T=document.querySelector(`#app`),E=`deu_lagoa_seller_session_v1`,D={content:b(),route:A(),menuOpen:!1,activeSuite:``,activeGalleryIndex:0,openFaq:``,notice:``,booking:{suite:``,checkin:`2026-04-10`,checkout:`2026-04-13`,guests:2,guestName:``,guestContact:``,guestEmail:``,notes:``},seller:{suiteEditSlug:``,experienceEditId:``,instagramEditId:``,reservationEditId:``}},O,k=0;ie();function ie(){T.addEventListener(`click`,Ke),T.addEventListener(`input`,W),T.addEventListener(`change`,qe),T.addEventListener(`submit`,Je),window.addEventListener(`hashchange`,ae),window.addEventListener(`keydown`,lt),window.addEventListener(`scroll`,$,{passive:!0}),window.addEventListener(`pointermove`,dt,{passive:!0}),!j()&&(U(),M())}function A(){let e=(location.hash.replace(/^#/,``)||`/hotel`).split(`/`).filter(Boolean);return e[0]===`vendedor`?{name:`seller`,tab:[`suites`,`experiencias`,`reservas`,`midia`,`config`,`operacao`].includes(e[1])?e[1]:`login`}:{name:`buyer`}}function ae(){j()||(D.route=A(),D.menuOpen=!1,U(),M())}function j(){let e=location.hash.replace(/^#/,``);return!e||e===`/`||e===`/comprador`?(location.hash=`/hotel`,!0):!1}function M(){D.content=b(),U(),T.innerHTML=`
    <div class="resort-page">
      ${D.route.name===`buyer`?oe():Se()}
      ${Ne()}
    </div>
  `,ut(),$()}function oe(){let e=D.content.resort,t=B(),n=z();return`
    ${se()}
    <main class="page-main">
      ${ce(e,t,n)}
      ${le(e,t,n)}
      ${ue(e)}
      ${de()}
      ${fe()}
      ${pe(t)}
      ${me(e)}
      ${he()}
      ${ge()}
      ${_e()}
      ${ve()}
      ${ye()}
      ${N()}
      ${P(e,t,n)}
    </main>
    ${xe()}
    ${be()}
  `}function se(){let e=D.content.resort;return`
    <header class="site-header ${D.menuOpen?`menu-open`:``}">
      <a class="brand-lockup" href="#topo">
        <span class="brand-orb"></span>
        <span class="brand-copy">
          <strong>${v(e.name)}</strong>
          <small>${v(e.location)}</small>
        </span>
      </a>
      <button type="button" class="menu-toggle" data-action="toggle-menu" aria-label="Abrir menu">
        <span></span>
        <span></span>
      </button>
      <nav class="site-nav ${D.menuOpen?`open`:``}">
        <a href="#historia">Historia</a>
        <a href="#suites">Suites</a>
        <a href="#video">Video</a>
        <a href="#experiencias">Experiencias</a>
        <a href="#instagram">Instagram</a>
        <a href="#faq">FAQ</a>
      </nav>
      <div class="header-actions">
        <a class="header-subtle" href="${v(e.instagramUrl)}" target="_blank" rel="noreferrer noopener">${v(e.instagramHandle)}</a>
        <a class="header-button" href="#reserva">Consultar reserva</a>
      </div>
    </header>
  `}function ce(e,t,n){return`
    <section class="hero-section" id="topo">
      <div class="hero-backdrop" style="background-image: linear-gradient(120deg, rgba(6, 15, 20, 0.72), rgba(5, 12, 18, 0.34)), url('${v(e.heroImage)}');"></div>
      <div class="hero-overlay"></div>
      <div class="hero-content reveal">
        <p class="kicker">${v(e.seasonLabel)}</p>
        <h1>${v(e.heroTitle)}</h1>
        <p class="hero-lead">${v(e.heroCopy)}</p>
        <div class="hero-meta-row">
          <div class="hero-meta-block"><span>check-in</span><strong>${v(e.checkIn)}</strong></div>
          <div class="hero-meta-block"><span>check-out</span><strong>${v(e.checkOut)}</strong></div>
          <div class="hero-meta-block"><span>localizacao</span><strong>${v(e.location)}</strong></div>
        </div>
        <div class="hero-action-row">
          <a class="button-primary" href="#suites">Explorar suites</a>
          <a class="button-secondary" href="${v(L())}" target="_blank" rel="noreferrer noopener">${v(R())}</a>
        </div>
        <div class="hero-proof-strip">
          <span>hotel + resto</span>
          <span>reserva direta</span>
          <span>Uruau, Ceara</span>
        </div>
      </div>
    </section>
  `}function le(e,t,n){let r=Re(t),i=s(D.content,t.slug,3),a=!e.reservationWhatsapp&&!e.reservationEmail;return`
    <section class="reservation-studio section-shell" id="reserva">
      <div class="reservation-studio-shell">
        <div class="reservation-studio-copy reveal">
          <p class="kicker">reserva direta</p>
          <h2>Solicite sua estadia com confirmacao da equipe.</h2>
          <p>Escolha o periodo, envie seus dados e receba o retorno com categoria, valores e disponibilidade para a data desejada.</p>
          <div class="reservation-side-image">
            <img src="${v(t.image||e.signatureImage)}" alt="${v(t.name)}" />
          </div>
        </div>
        <aside class="booking-panel reveal">
          <div class="booking-panel-head">
            <p class="kicker">disponibilidade</p>
            <h2>Planeje sua chegada</h2>
          </div>
          <form class="booking-form" id="booking-form">
            <label class="field-block">
              <span>Suite</span>
              <select name="suite">
                ${D.content.suites.map(e=>`<option value="${v(e.slug)}" ${e.slug===D.booking.suite?`selected`:``}>${v(e.name)}</option>`).join(``)}
              </select>
            </label>
            <div class="field-grid">
              <label class="field-block"><span>Check-in</span><input type="date" name="checkin" value="${v(D.booking.checkin)}" /></label>
              <label class="field-block"><span>Check-out</span><input type="date" name="checkout" value="${v(D.booking.checkout)}" /></label>
            </div>
            <label class="field-block">
              <span>Hospedes</span>
              <select name="guests">
                ${[1,2,3,4,5].map(e=>`<option value="${e}" ${Number(D.booking.guests)===e?`selected`:``}>${e} ${e===1?`hospede`:`hospedes`}</option>`).join(``)}
              </select>
            </label>
            <div class="field-grid">
              <label class="field-block"><span>Seu nome</span><input name="guestName" value="${v(D.booking.guestName)}" placeholder="Nome do responsavel" /></label>
              <label class="field-block"><span>Contato</span><input name="guestContact" value="${v(D.booking.guestContact)}" placeholder="WhatsApp ou telefone" /></label>
            </div>
            <label class="field-block"><span>E-mail</span><input type="email" name="guestEmail" value="${v(D.booking.guestEmail)}" placeholder="email@exemplo.com" /></label>
            <label class="field-block"><span>Observacoes</span><textarea name="notes" placeholder="Horário de chegada, pacote, pedido especial...">${v(D.booking.notes)}</textarea></label>
            <div class="booking-summary-card">
              <div class="booking-brand">
                <img src="${v(e.profileImage)}" alt="${v(e.name)}" />
                <span>${v(e.instagramHandle)}</span>
              </div>
              <div><small>categoria sugerida</small><strong>${v(t.name)}</strong></div>
              <div><small>faixa tarifaria</small><strong>${v(F(t.rate))}</strong></div>
              <div><small>estimativa</small><strong>${v(I(n,t))}</strong></div>
              <div class="availability-badge ${r.available?`available`:r.status===`invalid`?`pending`:`unavailable`}">
                <small>${v(r.label)}</small>
                <strong>${v(r.detail)}</strong>
              </div>
              ${i.length?`
                    <div class="blocked-window-list">
                      <small>janelas ja bloqueadas</small>
                      ${i.map(e=>`<span>${v(g(e.checkin,e.checkout))}</span>`).join(``)}
                    </div>
                  `:`
                    <div class="blocked-window-list">
                      <small>agenda atual</small>
                      <span>Sem bloqueios cadastrados para esta suite.</span>
                    </div>
                  `}
              ${a?`
                    <div class="booking-operational-note">
                      <small>atendimento direto</small>
                      <strong>Enquanto os demais canais sao atualizados, o contato segue pelo Instagram oficial da pousada.</strong>
                    </div>
                  `:``}
            </div>
            <button type="submit" class="booking-submit">Solicitar disponibilidade</button>
          </form>
        </aside>
      </div>
    </section>
  `}function ue(e){let[t,...n]=D.content.storyPanels;return`
    <section class="story-section section-shell" id="historia">
      <div class="story-shell reveal">
        <div class="story-copy">
          <p class="kicker">a casa</p>
          <h2>${v(e.storyTitle)}</h2>
          <p>${v(e.storyCopy)}</p>
          <div class="policy-list">${D.content.policies.map(e=>`<span>${v(e)}</span>`).join(``)}</div>
        </div>
        <article class="story-feature">
          <img src="${v(t.image)}" alt="${v(t.title)}" />
          <div class="story-feature-copy">
            <small>${v(t.eyebrow)}</small>
            <strong>${v(t.title)}</strong>
            <p>${v(t.copy)}</p>
          </div>
        </article>
      </div>
      <div class="story-grid">
        ${n.map(e=>`
              <article class="story-card reveal">
                <img src="${v(e.image)}" alt="${v(e.title)}" />
                <div>
                  <small>${v(e.eyebrow)}</small>
                  <strong>${v(e.title)}</strong>
                  <p>${v(e.copy)}</p>
                </div>
              </article>
            `).join(``)}
      </div>
    </section>
  `}function de(){return`
    <section class="stats-section section-shell">
      <div class="stats-grid">
        ${D.content.stats.map(e=>{let t=String(e.value);return`<article class="stat-card reveal"><strong${/\d/.test(t)?` data-counter="${v(t)}"`:``}>${v(t)}</strong><span>${v(e.label)}</span></article>`}).join(``)}
      </div>
    </section>
  `}function fe(){return`
    <section class="ops-section section-shell" id="operacao-reserva">
      <div class="section-heading reveal">
        <p class="kicker">reserva e atendimento</p>
        <h2>Do primeiro contato a confirmacao da estadia.</h2>
        <p>O pedido entra no painel, bloqueia datas em andamento e segue para a equipe concluir a reserva sem conflito de agenda.</p>
      </div>
      <div class="ops-grid">
        ${D.content.ops.bookingFlow.map(e=>`
              <article class="ops-card reveal">
                <small>${v(e.step)}</small>
                <strong>${v(e.title)}</strong>
                <p>${v(e.description)}</p>
              </article>
            `).join(``)}
      </div>
    </section>
  `}function pe(e){let t=Ee(e),n=Array.isArray(e.amenities)&&e.amenities.length>0;return`
    <section class="suite-section section-shell" id="suites">
      <div class="section-heading reveal">
        <p class="kicker">hospedagem</p>
        <h2>Opcoes de reserva para montar a estadia no ritmo da Deu Lagoa.</h2>
        <p>Cada pedido pode ser alinhado com acomodacao, mesa e periodo desejado antes da confirmacao final.</p>
      </div>
      <div class="suite-layout">
        <div class="suite-list reveal">
          ${D.content.suites.map(e=>`<button type="button" class="suite-chip ${e.slug===D.activeSuite?`active`:``}" data-suite="${v(e.slug)}"><small>${v(e.category)}</small><strong>${v(e.name)}</strong><span>${v(F(e.rate))}</span></button>`).join(``)}
        </div>
        <article class="suite-stage reveal">
          <div class="suite-stage-media"><img src="${v(e.gallery[D.activeGalleryIndex]||e.image)}" alt="${v(e.name)}" /></div>
          <div class="suite-stage-copy">
            <p class="kicker">${v(e.category)}</p>
            <h3>${v(e.name)}</h3>
            ${t.length?`<div class="suite-facts">${t.map(e=>`<span>${v(e)}</span>`).join(``)}</div>`:``}
            <p class="suite-summary">${v(e.summary)}</p>
            <p>${v(e.details)}</p>
            ${n?`<div class="amenity-cluster">${e.amenities.map(e=>`<span>${v(e)}</span>`).join(``)}</div>`:``}
            <div class="gallery-strip">
              ${e.gallery.map((t,n)=>`<button type="button" class="gallery-thumb ${n===D.activeGalleryIndex?`active`:``}" data-gallery-index="${n}"><img src="${v(t)}" alt="${v(e.name)} ${n+1}" /></button>`).join(``)}
            </div>
          </div>
        </article>
      </div>
    </section>
  `}function me(e){return`
    <section class="cinema-section section-shell" id="video">
      <div class="cinema-shell reveal">
        <div class="cinema-copy">
          <p class="kicker">video</p>
          <h2>O ritmo da pousada fica melhor quando entra em movimento.</h2>
          <p>O video reforca o que mais converte para a marca: agua, quartos, mesa e um tipo de fim de semana que parece muito mais simples de decidir.</p>
          <div class="hero-action-row">
            <a class="button-primary" href="${v(L())}" target="_blank" rel="noreferrer noopener">${v(R())}</a>
            <a class="button-secondary" href="${v(e.instagramUrl)}" target="_blank" rel="noreferrer noopener">Ver reels da marca</a>
          </div>
        </div>
        <div class="cinema-frame">
          <video autoplay muted loop playsinline preload="metadata" poster="${v(e.featureVideoPoster)}">
            <source src="${v(e.featureVideo)}" type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  `}function he(){return`
    <section class="ritual-section section-shell" id="rituais">
      <div class="ritual-layout">
        <div class="ritual-copy reveal">
          <p class="kicker">a experiencia</p>
          <h2>Uma hospedagem guiada por agua, mesa e permanencia.</h2>
          <p>A casa combina paisagem, restaurante e atendimento direto para transformar a reserva em um plano completo de chegada.</p>
          <div class="policy-list">${D.content.policies.map(e=>`<span>${v(e)}</span>`).join(``)}</div>
        </div>
        <div class="ritual-cards reveal">
          ${D.content.rituals.map((e,t)=>`<article class="ritual-card ritual-card-${t+1}"><strong>${v(e.title)}</strong><p>${v(e.copy)}</p></article>`).join(``)}
        </div>
      </div>
    </section>
  `}function ge(){return`
    <section class="experience-section section-shell" id="experiencias">
      <div class="section-heading reveal">
        <p class="kicker">a estadia</p>
        <h2>O que define a experiencia na Deu Lagoa.</h2>
      </div>
      <div class="experience-grid">
        ${D.content.experiences.map(e=>`<article class="experience-card reveal"><div class="experience-card-top"><small>${v(e.duration)}</small><span></span></div><h3>${v(e.name)}</h3><p>${v(e.description)}</p></article>`).join(``)}
      </div>
    </section>
  `}function _e(){let e=D.content.resort;return`
    <section class="instagram-section section-shell" id="instagram">
      <div class="section-heading reveal">
        <p class="kicker">instagram</p>
        <h2>Uma parede visual para sustentar a marca entre reserva, menu e atmosfera.</h2>
        <p>Os enquadramentos abaixo organizam o que a Deu Lagoa vende melhor: paisagem, mesa, quartos e datas que pedem permanencia.</p>
      </div>
      <div class="instagram-grid">
        ${D.content.instagramPosts.map((t,n)=>`
              <article class="instagram-card instagram-card-${n%3+1} reveal">
                <img src="${v(t.image)}" alt="${v(t.caption)}" />
                <div>
                  <small>${v(e.instagramHandle)}</small>
                  <p>${v(t.caption)}</p>
                </div>
              </article>
            `).join(``)}
      </div>
      <div class="instagram-footer reveal">
        <a class="button-secondary" href="${v(e.instagramUrl)}" target="_blank" rel="noreferrer noopener">Ver perfil completo</a>
      </div>
    </section>
  `}function ve(){return`
    <section class="timeline-section section-shell">
      <div class="section-heading reveal">
        <p class="kicker">ritmo da casa</p>
        <h2>Uma jornada pensada para chegar, ficar e prolongar o dia.</h2>
      </div>
      <div class="timeline-grid">
        ${D.content.itinerary.map(e=>`<article class="timeline-card reveal"><small>${v(e.time)}</small><h3>${v(e.title)}</h3><p>${v(e.description)}</p></article>`).join(``)}
      </div>
    </section>
  `}function ye(){return`
    <section class="testimonial-section section-shell">
      <div class="section-heading reveal">
        <p class="kicker">assinatura</p>
        <h2>Frases que resumem o tom da casa.</h2>
      </div>
      <div class="testimonial-grid">
        ${D.content.testimonials.map(e=>`<article class="testimonial-card reveal"><p>${v(e.quote)}</p><strong>${v(e.author)}</strong></article>`).join(``)}
      </div>
    </section>
  `}function N(){return`
    <section class="faq-section section-shell" id="faq">
      <div class="section-heading reveal">
        <p class="kicker">faq</p>
        <h2>Informacoes objetivas para acelerar a decisao de reserva.</h2>
      </div>
      <div class="faq-stack reveal">
        ${D.content.faq.map(e=>`<article class="faq-item ${D.openFaq===e.question?`open`:``}"><button type="button" class="faq-question" data-faq="${v(e.question)}"><span>${v(e.question)}</span><strong>${D.openFaq===e.question?`-`:`+`}</strong></button><div class="faq-answer"><p>${v(e.answer)}</p></div></article>`).join(``)}
      </div>
    </section>
  `}function P(e,t,n){let r=Le();return`
    <section class="final-cta section-shell">
      <div class="final-cta-card reveal">
        <div class="final-cta-copy">
          <p class="kicker">reserva e atendimento</p>
          <h2>Quando a data fizer sentido, a equipe assume o atendimento e fecha os detalhes da estadia.</h2>
          <p>${v(e.tagline)}</p>
          <div class="contact-rail">${r.map(e=>`<a class="contact-link" href="${v(e.href)}" ${e.external?`target="_blank" rel="noreferrer noopener"`:``}>${v(e.label)}</a>`).join(``)}</div>
        </div>
        <div class="final-cta-summary">
          <small>solicitacao</small>
          <strong>${v(t.name)}</strong>
          <span>${v(h(D.booking.checkin))} - ${v(h(D.booking.checkout))}</span>
          <span>${v(p(D.booking.guests))}</span>
          <b>${v(I(n,t))}</b>
        </div>
      </div>
    </section>
  `}function be(){let e=D.content.resort;return`
    <footer class="site-footer section-shell">
      <div class="site-footer-shell">
        <div class="site-footer-brand">
          <strong>${v(e.name)}</strong>
          <p>${v(e.location)}</p>
        </div>
        <div class="site-footer-meta">
          <span>Reservas sob consulta direta</span>
          <a href="${v(e.instagramUrl)}" target="_blank" rel="noreferrer noopener">${v(e.instagramHandle)}</a>
        </div>
      </div>
    </footer>
  `}function xe(){let e=D.content.resort;return`
    <div class="mobile-dock" aria-label="Acoes rapidas">
      <a class="mobile-dock-link" href="#reserva">Reserva</a>
      <a class="mobile-dock-link" href="${v(e.instagramUrl)}" target="_blank" rel="noreferrer noopener">Instagram</a>
    </div>
  `}function Se(){let e=c(D.content);return Y()?`
    ${Ce()}
    <main class="seller-main section-shell seller-shell">
      <section class="seller-kpis reveal">
        <article><strong>${D.content.suites.length}</strong><span>suites cadastradas</span></article>
        <article><strong>${e.activeCount}</strong><span>reservas bloqueando agenda</span></article>
        <article><strong>${e.pendingCount}</strong><span>solicitacoes pendentes</span></article>
        <article><strong>${v(ot())}</strong><span>faixa media cadastrada</span></article>
        <article><strong>${e.occupancyRate}%</strong><span>ocupacao projetada em 90 dias</span></article>
        <article><strong>${v(D.content.resort.location)}</strong><span>operacao atual</span></article>
      </section>
      ${Te(e)}
      ${D.route.tab===`experiencias`?Oe():D.route.tab===`reservas`?ke():D.route.tab===`midia`?je():D.route.tab===`config`?Me():D.route.tab===`operacao`?Ae():De()}
    </main>
  `:we()}function Ce(){return`
    <header class="site-header seller-header ${D.menuOpen?`menu-open`:``}">
      <a class="brand-lockup" href="#/hotel">
        <span class="brand-orb"></span>
        <span class="brand-copy"><strong>${v(D.content.resort.name)}</strong><small>painel do vendedor</small></span>
      </a>
      <button type="button" class="menu-toggle" data-action="toggle-menu" aria-label="Abrir menu"><span></span><span></span></button>
      <nav class="site-nav ${D.menuOpen?`open`:``}">
        <a class="${D.route.tab===`suites`?`active`:``}" href="#/vendedor/suites">Suites</a>
        <a class="${D.route.tab===`experiencias`?`active`:``}" href="#/vendedor/experiencias">Experiencias</a>
        <a class="${D.route.tab===`reservas`?`active`:``}" href="#/vendedor/reservas">Reservas</a>
        <a class="${D.route.tab===`midia`?`active`:``}" href="#/vendedor/midia">Midia</a>
        <a class="${D.route.tab===`config`?`active`:``}" href="#/vendedor/config">Configuracoes</a>
        <a class="${D.route.tab===`operacao`?`active`:``}" href="#/vendedor/operacao">Operacao</a>
      </nav>
      <div class="header-actions"><a class="header-subtle" href="#/hotel">Ver site</a><button type="button" class="header-button seller-logout" data-action="logout-seller">Sair</button></div>
    </header>
  `}function we(){return`
    <main class="seller-login-shell section-shell">
      <section class="seller-login-card reveal">
        <p class="kicker">area do vendedor</p>
        <h1>Painel da pousada</h1>
        <p>Edite suites, experiencias, reservas, midia e configuracoes sem misturar a operacao com o site institucional.</p>
        <form id="seller-login-form" class="seller-login-form">
          <label class="field-block"><span>Codigo de acesso</span><input type="password" name="sellerCode" placeholder="Digite o codigo do vendedor" required /></label>
          <button type="submit" class="booking-submit">Entrar no painel</button>
        </form>
      </section>
    </main>
  `}function Te(e){return`
    <section class="seller-hero-strip reveal">
      <article>
        <small>reservas</small>
        <strong>${e.reservationCount}</strong>
        <p>Total registrado no painel da pousada.</p>
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
  `}function F(e){let t=Number(e||0);return t>0?`${f(t)} / noite`:`valor sob consulta`}function I(e,t){return e.valid?Number(t?.rate||0)>0?`${e.nights} noites | ${f(e.total)}`:`Equipe confirma valores na resposta`:`Selecione datas validas`}function Ee(e){let t=[];return e?.size&&t.push(e.size),e?.beds&&t.push(e.beds),Number(e?.guests||0)>0&&t.push(p(e.guests)),t}function De(){let e=ze();return`
    <section class="seller-grid reveal">
      <article class="seller-panel seller-panel-list">
        <div class="seller-panel-head"><div><small>cadastro</small><h2>Suites e casas</h2></div><button type="button" class="seller-link-button" data-action="new-suite">Nova suite</button></div>
        <div class="seller-list">
          ${D.content.suites.map(e=>`<button type="button" class="seller-card ${e.slug===D.seller.suiteEditSlug?`active`:``}" data-edit-suite="${v(e.slug)}"><div><strong>${v(e.name)}</strong><span>${v(e.category)}</span></div><small>${v(f(e.rate))}</small></button>`).join(``)}
        </div>
      </article>
      <article class="seller-panel seller-panel-form">
        <div class="seller-panel-head"><div><small>edicao</small><h2>${v(e.name||`Nova suite`)}</h2></div>${e.slug?`<button type="button" class="seller-link-button danger-link" data-action="delete-suite" data-suite="${v(e.slug)}">Excluir</button>`:``}</div>
        ${Pe(e)}
        <form class="seller-form" id="seller-suite-form">
          <input type="hidden" name="slug" value="${v(e.slug||``)}" />
          <div class="seller-two-col"><label class="field-block"><span>Nome</span><input name="name" value="${v(e.name||``)}" required /></label><label class="field-block"><span>Categoria</span><input name="category" value="${v(e.category||``)}" required /></label></div>
          <div class="seller-four-col"><label class="field-block"><span>Diaria</span><input type="number" min="0" name="rate" value="${v(e.rate||0)}" required /></label><label class="field-block"><span>Tamanho</span><input name="size" value="${v(e.size||``)}" required /></label><label class="field-block"><span>Hospedes</span><input type="number" min="1" name="guests" value="${v(e.guests||2)}" required /></label><label class="field-block"><span>Camas</span><input name="beds" value="${v(e.beds||``)}" required /></label></div>
          <label class="field-block"><span>Imagem principal</span><input name="image" value="${v(e.image||``)}" required /></label>
          <label class="field-block"><span>Resumo</span><textarea name="summary" required>${v(e.summary||``)}</textarea></label>
          <label class="field-block"><span>Descricao completa</span><textarea name="details" required>${v(e.details||``)}</textarea></label>
          <label class="field-block"><span>Amenidades (uma por linha)</span><textarea name="amenities" required>${v((e.amenities||[]).join(`
`))}</textarea></label>
          <label class="field-block"><span>Galeria (uma URL por linha)</span><textarea name="gallery" required>${v((e.gallery||[]).join(`
`))}</textarea></label>
          <button type="submit" class="booking-submit">Salvar suite</button>
        </form>
      </article>
    </section>
  `}function Oe(){let e=Be();return`
    <section class="seller-grid reveal">
      <article class="seller-panel seller-panel-list">
        <div class="seller-panel-head"><div><small>programacao</small><h2>Experiencias</h2></div><button type="button" class="seller-link-button" data-action="new-experience">Nova experiencia</button></div>
        <div class="seller-list">
          ${D.content.experiences.map(e=>`<button type="button" class="seller-card ${e.id===D.seller.experienceEditId?`active`:``}" data-edit-experience="${v(e.id)}"><div><strong>${v(e.name)}</strong><span>${v(e.description)}</span></div><small>${v(e.duration)}</small></button>`).join(``)}
        </div>
      </article>
      <article class="seller-panel seller-panel-form">
        <div class="seller-panel-head"><div><small>edicao</small><h2>${v(e.name||`Nova experiencia`)}</h2></div>${e.id?`<button type="button" class="seller-link-button danger-link" data-action="delete-experience" data-id="${v(e.id)}">Excluir</button>`:``}</div>
        <form class="seller-form" id="seller-experience-form">
          <input type="hidden" name="id" value="${v(e.id||``)}" />
          <div class="seller-two-col"><label class="field-block"><span>Nome</span><input name="name" value="${v(e.name||``)}" required /></label><label class="field-block"><span>Duracao</span><input name="duration" value="${v(e.duration||``)}" required /></label></div>
          <label class="field-block"><span>Descricao</span><textarea name="description" required>${v(e.description||``)}</textarea></label>
          <button type="submit" class="booking-submit">Salvar experiencia</button>
        </form>
      </article>
    </section>
  `}function ke(){let e=H(),t=[...D.content.reservations||[]].sort((e,t)=>String(t.createdAt||``).localeCompare(String(e.createdAt||``)));return`
    <section class="seller-grid reveal">
      <article class="seller-panel seller-panel-list">
        <div class="seller-panel-head"><div><small>agenda</small><h2>Reservas e bloqueios</h2></div><button type="button" class="seller-link-button" data-action="new-reservation">Nova reserva</button></div>
        <div class="seller-list">
          ${t.length?t.map(e=>{let t=V(e.suiteSlug);return`<button type="button" class="seller-card ${e.id===D.seller.reservationEditId?`active`:``}" data-edit-reservation="${v(e.id)}"><div><strong>${v(e.guestName||`Sem nome`)}</strong><span>${v(t?.name||e.suiteSlug)}</span></div><small>${v(_(e.status))}</small></button>`}).join(``):`<article class="seller-empty-state"><strong>Sem reservas ainda</strong><p>A primeira solicitacao de disponibilidade criada no site aparecera aqui com bloqueio de datas e status operacional.</p></article>`}
        </div>
      </article>
      <article class="seller-panel seller-panel-form">
        <div class="seller-panel-head"><div><small>edicao</small><h2>${v(e.id?`Reserva em andamento`:`Nova reserva manual`)}</h2></div>${e.id?`<button type="button" class="seller-link-button danger-link" data-action="delete-reservation" data-id="${v(e.id)}">Excluir</button>`:``}</div>
        ${Ie(e)}
        <form class="seller-form" id="seller-reservation-form">
          <input type="hidden" name="id" value="${v(e.id||``)}" />
          <div class="seller-two-col">
            <label class="field-block"><span>Hospede</span><input name="guestName" value="${v(e.guestName||``)}" required /></label>
            <label class="field-block"><span>Contato</span><input name="guestContact" value="${v(e.guestContact||``)}" required /></label>
          </div>
          <div class="seller-two-col">
            <label class="field-block"><span>E-mail</span><input type="email" name="guestEmail" value="${v(e.guestEmail||``)}" /></label>
            <label class="field-block"><span>Status</span>
              <select name="status">
                ${[`pending`,`confirmed`,`cancelled`,`completed`].map(t=>`<option value="${t}" ${t===e.status?`selected`:``}>${v(_(t))}</option>`).join(``)}
              </select>
            </label>
          </div>
          <div class="seller-two-col">
            <label class="field-block"><span>Suite</span>
              <select name="suiteSlug">
                ${D.content.suites.map(t=>`<option value="${v(t.slug)}" ${t.slug===e.suiteSlug?`selected`:``}>${v(t.name)}</option>`).join(``)}
              </select>
            </label>
            <label class="field-block"><span>Hospedes</span><input type="number" min="1" max="10" name="guests" value="${v(e.guests||2)}" required /></label>
          </div>
          <div class="seller-two-col">
            <label class="field-block"><span>Check-in</span><input type="date" name="checkin" value="${v(e.checkin||``)}" required /></label>
            <label class="field-block"><span>Check-out</span><input type="date" name="checkout" value="${v(e.checkout||``)}" required /></label>
          </div>
          <div class="seller-two-col">
            <label class="field-block"><span>Origem</span><input name="source" value="${v(e.source||`site`)}" required /></label>
            <label class="field-block"><span>Total estimado</span><input type="number" min="0" name="totalEstimate" value="${v(e.totalEstimate||0)}" /></label>
          </div>
          <label class="field-block"><span>Observacoes</span><textarea name="notes">${v(e.notes||``)}</textarea></label>
          <button type="submit" class="booking-submit">Salvar reserva</button>
        </form>
      </article>
    </section>
  `}function Ae(){let e=D.content.verification;return`
    <section class="seller-stack reveal">
      <article class="seller-panel seller-panel-wide">
        <div class="seller-panel-head"><div><small>fontes institucionais</small><h2>Referencias e dados confiaveis</h2></div></div>
        <div class="ops-grid">
          ${e.verifiedFacts.map(e=>`
                <article class="ops-card">
                  <small>${v(e.sourceLabel)}</small>
                  <strong>${v(e.label)}</strong>
                  <p><a href="${v(e.sourceUrl)}" target="_blank" rel="noreferrer noopener">${v(e.sourceUrl)}</a></p>
                </article>
              `).join(``)}
        </div>
        <div class="pending-validation">
          <small>pendente de confirmacao direta</small>
          <div class="policy-list">${e.pendingValidation.map(e=>`<span>${v(e)}</span>`).join(``)}</div>
        </div>
      </article>
      <article class="seller-panel seller-panel-wide">
        <div class="seller-panel-head"><div><small>sql e go-live</small><h2>O que um site vendavel como este precisa ter</h2></div></div>
        <div class="ops-grid">
          ${D.content.ops.stack.map(e=>`
                <article class="ops-card">
                  <small>infra</small>
                  <strong>${v(e.title)}</strong>
                  <p>${v(e.description)}</p>
                </article>
              `).join(``)}
        </div>
        <div class="launch-checklist">
          ${D.content.ops.launchChecklist.map(e=>`<article class="launch-check"><span></span><p>${v(e)}</p></article>`).join(``)}
        </div>
      </article>
    </section>
  `}function je(){let e=D.content.resort,t=Ve();return`
    <section class="seller-stack reveal">
      <article class="seller-panel seller-panel-form seller-panel-wide">
        <div class="seller-panel-head"><div><small>brand assets</small><h2>Imagens, video e identidade</h2></div></div>
        ${Fe(e)}
        <form class="seller-form" id="seller-media-form">
          <div class="seller-two-col"><label class="field-block"><span>Hero image</span><input name="heroImage" value="${v(e.heroImage)}" required /></label><label class="field-block"><span>Profile image</span><input name="profileImage" value="${v(e.profileImage)}" required /></label></div>
          <div class="seller-two-col"><label class="field-block"><span>Signature image</span><input name="signatureImage" value="${v(e.signatureImage)}" required /></label><label class="field-block"><span>Culinary image</span><input name="culinaryImage" value="${v(e.culinaryImage)}" required /></label></div>
          <div class="seller-two-col"><label class="field-block"><span>Video principal</span><input name="featureVideo" value="${v(e.featureVideo)}" required /></label><label class="field-block"><span>Poster do video</span><input name="featureVideoPoster" value="${v(e.featureVideoPoster)}" required /></label></div>
          <div class="seller-two-col"><label class="field-block"><span>Instagram handle</span><input name="instagramHandle" value="${v(e.instagramHandle)}" required /></label><label class="field-block"><span>Instagram URL</span><input name="instagramUrl" value="${v(e.instagramUrl)}" required /></label></div>
          <button type="submit" class="booking-submit">Salvar midia e identidade</button>
        </form>
      </article>
      <section class="seller-grid">
        <article class="seller-panel seller-panel-list">
          <div class="seller-panel-head"><div><small>wall visual</small><h2>Posts e destaques</h2></div><button type="button" class="seller-link-button" data-action="new-instagram">Novo destaque</button></div>
          <div class="seller-list">
            ${D.content.instagramPosts.map(e=>`<button type="button" class="seller-card ${e.id===D.seller.instagramEditId?`active`:``}" data-edit-instagram="${v(e.id)}"><div><strong>${v(e.caption.slice(0,42))}${e.caption.length>42?`...`:``}</strong><span>${v(e.image)}</span></div><small>Instagram</small></button>`).join(``)}
          </div>
        </article>
        <article class="seller-panel seller-panel-form">
          <div class="seller-panel-head"><div><small>edicao</small><h2>${v(t.id?`Destaque visual`:`Novo destaque`)}</h2></div>${t.id?`<button type="button" class="seller-link-button danger-link" data-action="delete-instagram" data-id="${v(t.id)}">Excluir</button>`:``}</div>
          <form class="seller-form" id="seller-instagram-form">
            <input type="hidden" name="id" value="${v(t.id||``)}" />
            <label class="field-block"><span>Imagem</span><input name="image" value="${v(t.image||``)}" required /></label>
            <label class="field-block"><span>Legenda</span><textarea name="caption" required>${v(t.caption||``)}</textarea></label>
            <button type="submit" class="booking-submit">Salvar destaque</button>
          </form>
        </article>
      </section>
    </section>
  `}function Me(){let e=D.content.resort;return`
    <section class="seller-grid reveal">
      <article class="seller-panel seller-panel-form seller-panel-wide">
        <div class="seller-panel-head"><div><small>institucional</small><h2>Configuracoes da pousada</h2></div><button type="button" class="seller-link-button" data-action="reset-content">Restaurar padrao</button></div>
        <div class="config-note">
          <small>contatos oficiais</small>
          <p>Telefone, WhatsApp e e-mail abaixo sao campos operacionais. Preencha os canais oficiais da pousada para refletir o atendimento real no site.</p>
        </div>
        <form class="seller-form" id="seller-config-form">
          <div class="seller-two-col"><label class="field-block"><span>Nome da pousada</span><input name="name" value="${v(e.name)}" required /></label><label class="field-block"><span>Localizacao</span><input name="location" value="${v(e.location)}" required /></label></div>
          <label class="field-block"><span>Tagline</span><input name="tagline" value="${v(e.tagline)}" required /></label>
          <label class="field-block"><span>Titulo principal</span><input name="heroTitle" value="${v(e.heroTitle)}" required /></label>
          <label class="field-block"><span>Texto do hero</span><textarea name="heroCopy" required>${v(e.heroCopy)}</textarea></label>
          <label class="field-block"><span>Titulo da historia</span><input name="storyTitle" value="${v(e.storyTitle)}" required /></label>
          <label class="field-block"><span>Texto da historia</span><textarea name="storyCopy" required>${v(e.storyCopy)}</textarea></label>
          <div class="seller-four-col"><label class="field-block"><span>Check-in</span><input name="checkIn" value="${v(e.checkIn)}" required /></label><label class="field-block"><span>Check-out</span><input name="checkOut" value="${v(e.checkOut)}" required /></label><label class="field-block"><span>Telefone</span><input name="reservationPhone" value="${v(e.reservationPhone)}" placeholder="+55 85 ..." /></label><label class="field-block"><span>WhatsApp</span><input name="reservationWhatsapp" value="${v(e.reservationWhatsapp)}" placeholder="5585..." /></label></div>
          <div class="seller-two-col"><label class="field-block"><span>E-mail</span><input name="reservationEmail" value="${v(e.reservationEmail)}" placeholder="reservas@..." /></label><label class="field-block"><span>Codigo vendedor</span><input name="sellerCode" value="${v(e.sellerCode)}" required /></label></div>
          <label class="field-block"><span>Faixa sazonal</span><input name="seasonLabel" value="${v(e.seasonLabel)}" required /></label>
          <button type="submit" class="booking-submit">Salvar configuracoes</button>
        </form>
      </article>
    </section>
  `}function Ne(){return D.notice?`<div class="site-notice" role="status" aria-live="polite">${v(D.notice)}</div>`:``}function Pe(e){return e.image?`
    <article class="seller-preview-card">
      <img src="${v(e.image)}" alt="${v(e.name||`Preview da suite`)}" />
      <div class="seller-preview-copy">
        <small>preview</small>
        <strong>${v(e.name||`Nova suite`)}</strong>
        <p>${v(e.summary||`A imagem principal e os dados dessa suite aparecem aqui para facilitar a revisao antes de salvar.`)}</p>
      </div>
    </article>
  `:``}function Fe(e){return`
    <article class="seller-media-preview">
      <div class="seller-media-preview-hero">
        <img src="${v(e.heroImage)}" alt="${v(e.name)} hero" />
        <div class="seller-media-preview-copy">
          <small>hero atual</small>
          <strong>${v(e.heroTitle)}</strong>
          <p>${v(e.instagramHandle)} | ${v(e.location)}</p>
        </div>
      </div>
      <div class="seller-media-preview-stack">
        <img src="${v(e.profileImage)}" alt="${v(e.name)} profile" />
        <img src="${v(e.signatureImage)}" alt="${v(e.name)} signature" />
      </div>
    </article>
  `}function Ie(e){let t=V(e.suiteSlug);return t?`
    <article class="seller-preview-card reservation-preview-card">
      <img src="${v(t.image)}" alt="${v(t.name)}" />
      <div class="seller-preview-copy">
        <small>${v(_(e.status||`pending`))}</small>
        <strong>${v(e.guestName||`Reserva manual`)}</strong>
        <p>${v(t.name)} | ${v(g(e.checkin,e.checkout)||`Defina o periodo`)} | ${v(p(e.guests||2))}</p>
      </div>
    </article>
  `:``}function L(){let e=D.content.resort;return e.reservationWhatsapp?`https://wa.me/${e.reservationWhatsapp}`:e.reservationEmail?`mailto:${e.reservationEmail}`:e.instagramUrl}function R(){let e=D.content.resort;return e.reservationWhatsapp?`Falar no WhatsApp`:e.reservationEmail?`Enviar e-mail`:`Ver Instagram oficial`}function Le(){let e=D.content.resort,t=[];return e.reservationEmail&&t.push({label:e.reservationEmail,href:`mailto:${e.reservationEmail}`,external:!1}),e.reservationWhatsapp&&t.push({label:`WhatsApp direto`,href:`https://wa.me/${e.reservationWhatsapp}`,external:!0}),t.push({label:`Instagram oficial`,href:e.instagramUrl,external:!0}),t}function z(){return m({suite:B(),checkin:D.booking.checkin,checkout:D.booking.checkout,guests:D.booking.guests})}function Re(e=B()){return z().valid?a(D.content,{suiteSlug:e.slug,checkin:D.booking.checkin,checkout:D.booking.checkout})?{status:`conflict`,available:!1,label:`indisponivel nesse periodo`,detail:`Ja existe bloqueio pendente ou confirmado nessa janela.`}:{status:`available`,available:!0,label:`disponibilidade preliminar`,detail:`Livre para receber a solicitacao e seguir para confirmacao.`}:{status:`invalid`,available:!1,label:`datas pendentes`,detail:`Defina um periodo valido para consultar a agenda.`}}function B(){return D.content.suites.find(e=>e.slug===D.activeSuite)||D.content.suites[0]}function V(e){return D.content.suites.find(t=>t.slug===e)||null}function ze(){return D.content.suites.find(e=>e.slug===D.seller.suiteEditSlug)||He()}function Be(){return D.content.experiences.find(e=>e.id===D.seller.experienceEditId)||Ue()}function Ve(){return D.content.instagramPosts.find(e=>e.id===D.seller.instagramEditId)||We()}function H(){return D.content.reservations.find(e=>e.id===D.seller.reservationEditId)||Ge()}function He(){return{slug:``,name:``,category:``,rate:0,size:``,guests:2,beds:``,image:``,gallery:[],summary:``,details:``,amenities:[]}}function Ue(){return{id:``,name:``,duration:``,description:``}}function We(){return{id:``,image:``,caption:``}}function Ge(){return{id:``,suiteSlug:D.content.suites[0]?.slug||``,guestName:``,guestContact:``,guestEmail:``,checkin:``,checkout:``,guests:2,notes:``,status:`pending`,source:`site`,totalEstimate:0,createdAt:``}}function U(){D.content.suites.length||(D.content=JSON.parse(JSON.stringify(t))),(!D.activeSuite||!D.content.suites.some(e=>e.slug===D.activeSuite))&&(D.activeSuite=D.content.suites[0]?.slug||``),(!D.booking.suite||!D.content.suites.some(e=>e.slug===D.booking.suite))&&(D.booking.suite=D.activeSuite),D.content.suites.some(e=>e.slug===D.seller.suiteEditSlug)||(D.seller.suiteEditSlug=D.content.suites[0]?.slug||``),D.content.experiences.some(e=>e.id===D.seller.experienceEditId)||(D.seller.experienceEditId=D.content.experiences[0]?.id||``),D.content.instagramPosts.some(e=>e.id===D.seller.instagramEditId)||(D.seller.instagramEditId=D.content.instagramPosts[0]?.id||``),D.content.reservations.some(e=>e.id===D.seller.reservationEditId)||(D.seller.reservationEditId=D.content.reservations[0]?.id||``),(!D.openFaq||!D.content.faq.some(e=>e.question===D.openFaq))&&(D.openFaq=D.content.faq[0]?.question||``),D.activeGalleryIndex=Math.max(0,Math.min(D.activeGalleryIndex,(B().gallery?.length||1)-1))}function Ke(e){if(e.target.closest(`[data-action="toggle-menu"]`)){D.menuOpen=!D.menuOpen,M();return}let t=e.target.closest(`[data-suite]`);if(t){let e=t.getAttribute(`data-suite`)||D.content.suites[0].slug;D.activeSuite=e,D.booking.suite=e,D.activeGalleryIndex=0,M();return}let n=e.target.closest(`[data-gallery-index]`);if(n){D.activeGalleryIndex=Number(n.getAttribute(`data-gallery-index`)||0),M();return}let r=e.target.closest(`[data-faq]`);if(r){let e=r.getAttribute(`data-faq`)||``;D.openFaq=D.openFaq===e?``:e,M();return}let i=e.target.closest(`[data-edit-suite]`);if(i){D.seller.suiteEditSlug=i.getAttribute(`data-edit-suite`)||``,M();return}let a=e.target.closest(`[data-edit-experience]`);if(a){D.seller.experienceEditId=a.getAttribute(`data-edit-experience`)||``,M();return}let o=e.target.closest(`[data-edit-instagram]`);if(o){D.seller.instagramEditId=o.getAttribute(`data-edit-instagram`)||``,M();return}let s=e.target.closest(`[data-edit-reservation]`);if(s){D.seller.reservationEditId=s.getAttribute(`data-edit-reservation`)||``,M();return}let c=e.target.closest(`[data-action]`);if(!c){e.target.closest(`.site-nav a`)&&D.menuOpen&&(D.menuOpen=!1,M());return}let l=c.getAttribute(`data-action`);if(l===`logout-seller`){X(!1),location.hash=`/vendedor`;return}if(l===`new-suite`){D.seller.suiteEditSlug=``,M();return}if(l===`new-experience`){D.seller.experienceEditId=``,M();return}if(l===`new-instagram`){D.seller.instagramEditId=``,M();return}if(l===`new-reservation`){D.seller.reservationEditId=``,M();return}if(l===`delete-suite`){tt(c.getAttribute(`data-suite`)||``);return}if(l===`delete-experience`){nt(c.getAttribute(`data-id`)||``);return}if(l===`delete-instagram`){rt(c.getAttribute(`data-id`)||``);return}if(l===`delete-reservation`){it(c.getAttribute(`data-id`)||``);return}l===`reset-content`&&(D.content=ne(),U(),Z(`Conteudo padrao restaurado no painel e no site.`))}function W(e){let t=e.target;if(!(t instanceof HTMLInputElement||t instanceof HTMLSelectElement||t instanceof HTMLTextAreaElement))return;let n=t.closest(`form`);!n||n.getAttribute(`id`)!==`booking-form`||(D.booking={...D.booking,[t.name]:t.name===`guests`?Number(t.value):t.value},t.name===`suite`&&(D.activeSuite=t.value,D.activeGalleryIndex=0),M())}function qe(e){W(e)}function Je(e){let t=e.target;if(!(t instanceof HTMLFormElement))return;let n=t.getAttribute(`id`)||``;if(e.preventDefault(),n===`booking-form`){let e=z();if(!e.valid){Z(`Defina check-in e check-out validos para consultar disponibilidade.`);return}if(!String(D.booking.guestName||``).trim()||!String(D.booking.guestContact||``).trim()){Z(`Preencha nome e contato para solicitar disponibilidade.`);return}if(a(D.content,{suiteSlug:D.booking.suite,checkin:D.booking.checkin,checkout:D.booking.checkout})){Z(`Esse periodo ja esta bloqueado para a suite selecionada. Escolha novas datas.`),M();return}let t=l({id:K(`res`),suiteSlug:D.booking.suite,guestName:D.booking.guestName,guestContact:D.booking.guestContact,guestEmail:D.booking.guestEmail,checkin:D.booking.checkin,checkout:D.booking.checkout,guests:D.booking.guests,notes:D.booking.notes,totalEstimate:e.total,status:`pending`,source:`site`,createdAt:new Date().toISOString()});D.content.reservations=[t,...D.content.reservations||[]],D.seller.reservationEditId=t.id,G(),window.open(ct(B(),e,t),`_blank`,`noopener,noreferrer`),Z(`Solicitacao registrada para ${B().name}. As datas agora aparecem bloqueadas como pendentes.`);return}if(n===`seller-login-form`){let e=new FormData(t);if(String(e.get(`sellerCode`)||``).trim()===D.content.resort.sellerCode){X(!0),location.hash=`/vendedor/suites`;return}Z(`Codigo do vendedor invalido.`);return}if(!Y()){location.hash=`/vendedor`;return}if(n===`seller-suite-form`){Ye(new FormData(t));return}if(n===`seller-experience-form`){Xe(new FormData(t));return}if(n===`seller-media-form`){Ze(new FormData(t));return}if(n===`seller-instagram-form`){Qe(new FormData(t));return}if(n===`seller-reservation-form`){$e(new FormData(t));return}n===`seller-config-form`&&et(new FormData(t))}function Ye(e){let t=String(e.get(`slug`)||``).trim(),n=String(e.get(`name`)||``).trim(),r={slug:t||q(st(n),D.content.suites),name:n,category:String(e.get(`category`)||``).trim(),rate:Number(e.get(`rate`)||0),size:String(e.get(`size`)||``).trim(),guests:Number(e.get(`guests`)||1),beds:String(e.get(`beds`)||``).trim(),image:String(e.get(`image`)||``).trim(),gallery:J(e.get(`gallery`)),summary:String(e.get(`summary`)||``).trim(),details:String(e.get(`details`)||``).trim(),amenities:J(e.get(`amenities`))};D.content.suites=t?D.content.suites.map(e=>e.slug===t?r:e):[r,...D.content.suites],D.activeSuite=r.slug,D.booking.suite=r.slug,D.seller.suiteEditSlug=r.slug,G(),Z(`Suite ${r.name} salva com sucesso.`)}function Xe(e){let t=String(e.get(`id`)||``).trim(),n={id:t||K(`exp`),name:String(e.get(`name`)||``).trim(),duration:String(e.get(`duration`)||``).trim(),description:String(e.get(`description`)||``).trim()};D.content.experiences=t?D.content.experiences.map(e=>e.id===t?n:e):[n,...D.content.experiences],D.seller.experienceEditId=n.id,G(),Z(`Experiencia ${n.name} salva com sucesso.`)}function Ze(e){D.content.resort={...D.content.resort,heroImage:String(e.get(`heroImage`)||``).trim(),profileImage:String(e.get(`profileImage`)||``).trim(),signatureImage:String(e.get(`signatureImage`)||``).trim(),culinaryImage:String(e.get(`culinaryImage`)||``).trim(),featureVideo:String(e.get(`featureVideo`)||``).trim(),featureVideoPoster:String(e.get(`featureVideoPoster`)||``).trim(),instagramHandle:String(e.get(`instagramHandle`)||``).trim(),instagramUrl:String(e.get(`instagramUrl`)||``).trim()},G(),Z(`Midia e identidade da marca atualizadas.`)}function Qe(e){let t=String(e.get(`id`)||``).trim(),n={id:t||K(`ig`),image:String(e.get(`image`)||``).trim(),caption:String(e.get(`caption`)||``).trim()};D.content.instagramPosts=t?D.content.instagramPosts.map(e=>e.id===t?n:e):[n,...D.content.instagramPosts],D.seller.instagramEditId=n.id,G(),Z(`Destaque visual salvo com sucesso.`)}function $e(e){let t=String(e.get(`id`)||``).trim(),n=String(e.get(`suiteSlug`)||``).trim(),r=V(n),o=String(e.get(`checkin`)||``).trim(),s=String(e.get(`checkout`)||``).trim(),c=Number(e.get(`guests`)||1),u=m({suite:r,checkin:o,checkout:s,guests:c}),d=l({id:t||K(`res`),suiteSlug:n,guestName:String(e.get(`guestName`)||``).trim(),guestContact:String(e.get(`guestContact`)||``).trim(),guestEmail:String(e.get(`guestEmail`)||``).trim(),checkin:o,checkout:s,guests:c,notes:String(e.get(`notes`)||``).trim(),status:String(e.get(`status`)||`pending`).trim(),source:String(e.get(`source`)||`manual`).trim(),totalEstimate:Number(e.get(`totalEstimate`)||0)||u.total,createdAt:t&&H().createdAt||new Date().toISOString()});if(!d.guestName||!d.guestContact||!d.checkin||!d.checkout||!d.suiteSlug){Z(`Preencha hospede, contato, suite e periodo para salvar a reserva.`);return}if(d.checkin>=d.checkout){Z(`Check-in precisa ser anterior ao check-out.`);return}if(a(D.content,d,t)&&i(D.content,d)){Z(`Existe conflito de datas para essa suite no status selecionado.`);return}D.content.reservations=t?D.content.reservations.map(e=>e.id===t?d:e):[d,...D.content.reservations||[]],D.seller.reservationEditId=d.id,G(),Z(`Reserva de ${d.guestName} salva com status ${_(d.status)}.`)}function et(e){D.content.resort={...D.content.resort,name:String(e.get(`name`)||``).trim(),location:String(e.get(`location`)||``).trim(),tagline:String(e.get(`tagline`)||``).trim(),heroTitle:String(e.get(`heroTitle`)||``).trim(),heroCopy:String(e.get(`heroCopy`)||``).trim(),storyTitle:String(e.get(`storyTitle`)||``).trim(),storyCopy:String(e.get(`storyCopy`)||``).trim(),checkIn:String(e.get(`checkIn`)||``).trim(),checkOut:String(e.get(`checkOut`)||``).trim(),reservationPhone:String(e.get(`reservationPhone`)||``).trim(),reservationWhatsapp:String(e.get(`reservationWhatsapp`)||``).trim(),reservationEmail:String(e.get(`reservationEmail`)||``).trim(),sellerCode:String(e.get(`sellerCode`)||``).trim(),seasonLabel:String(e.get(`seasonLabel`)||``).trim()},G(),Z(`Configuracoes da pousada atualizadas.`)}function tt(e){if(!e||D.content.suites.length<=1){Z(`Mantenha pelo menos uma suite cadastrada.`);return}D.content.suites=D.content.suites.filter(t=>t.slug!==e),G(),Z(`Suite removida do painel e do site.`)}function nt(e){D.content.experiences=D.content.experiences.filter(t=>t.id!==e),G(),Z(`Experiencia removida.`)}function rt(e){if(D.content.instagramPosts.length<=1){Z(`Mantenha pelo menos um destaque visual.`);return}D.content.instagramPosts=D.content.instagramPosts.filter(t=>t.id!==e),G(),Z(`Destaque visual removido.`)}function it(e){D.content.reservations=(D.content.reservations||[]).filter(t=>t.id!==e),G(),Z(`Reserva removida da agenda.`)}function G(){D.content.meta={...D.content.meta||{},updatedAt:new Date().toISOString(),persistence:`localStorage`},x(D.content),U(),M()}function at(){return D.content.suites.length?Math.round(D.content.suites.reduce((e,t)=>e+Number(t.rate||0),0)/D.content.suites.length):0}function ot(){let e=at();return e>0?f(e):`sob consulta`}function K(e){return`${e}-${Math.random().toString(36).slice(2,8)}`}function st(e){return String(e||``).toLowerCase().normalize(`NFD`).replace(/[\u0300-\u036f]/g,``).replace(/[^a-z0-9]+/g,`-`).replace(/(^-|-$)/g,``)}function q(e,t){let n=e||K(`suite`),r=new Set(t.map(e=>e.slug));if(!r.has(n))return n;let i=2;for(;r.has(`${n}-${i}`);)i+=1;return`${n}-${i}`}function J(e){return String(e||``).split(/\r?\n/g).map(e=>e.trim()).filter(Boolean)}function ct(e,t,n){let r=D.content.resort,i=[`Ola, equipe ${r.name}.`,`Registrei um pedido de disponibilidade pelo site.`,``,`Hospede: ${n?.guestName||D.booking.guestName}`,`Contato: ${n?.guestContact||D.booking.guestContact}`,D.booking.guestEmail?`E-mail: ${D.booking.guestEmail}`:``,`Suite: ${e.name}`,`Check-in: ${D.booking.checkin}`,`Check-out: ${D.booking.checkout}`,`Hospedes: ${p(D.booking.guests)}`,`Estimativa: ${I(t,e)}`,D.booking.notes?`Observacoes: ${D.booking.notes}`:``].filter(Boolean).join(`
`);return r.reservationWhatsapp?`https://wa.me/${r.reservationWhatsapp}?text=${encodeURIComponent(i)}`:r.reservationEmail?`mailto:${r.reservationEmail}?subject=${encodeURIComponent(`Solicitacao | ${e.name}`)}&body=${encodeURIComponent(i)}`:r.instagramUrl}function lt(e){if(e.key===`Escape`&&D.menuOpen){D.menuOpen=!1,M();return}e.ctrlKey&&e.shiftKey&&e.key.toLowerCase()===`v`&&(e.preventDefault(),location.hash=`/vendedor`)}function Y(){return sessionStorage.getItem(E)===`1`}function X(e){e?sessionStorage.setItem(E,`1`):sessionStorage.removeItem(E)}function Z(e){D.notice=e,M(),k&&window.clearTimeout(k),k=window.setTimeout(()=>{D.notice=``,M()},3200)}function ut(){O&&O.disconnect();let e=T.querySelectorAll(`.reveal`);if(e.length){if(!(`IntersectionObserver`in window)){e.forEach(e=>e.classList.add(`in-view`)),Q();return}O=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&(e.target.classList.add(`in-view`),O.unobserve(e.target))}),Q()},{threshold:.18}),e.forEach(e=>O.observe(e))}}function Q(){T.querySelectorAll(`[data-counter]`).forEach(e=>{if(e.dataset.bound===`1`)return;e.dataset.bound=`1`;let t=e.getAttribute(`data-counter`)||`0`,n=Number(String(t).replace(/\D/g,``))||0;if(!n){e.textContent=t;return}let r=String(t).replace(/[0-9]/g,``),i=String(n).length,a=performance.now(),o=t=>{let s=Math.min(1,(t-a)/900),c=1-(1-s)**3,l=Math.round(n*c);e.textContent=`${String(l).padStart(i,`0`)}${r}`,s<1&&requestAnimationFrame(o)};requestAnimationFrame(o)})}function $(){let e=document.querySelector(`.site-header`);e&&e.classList.toggle(`scrolled`,window.scrollY>24)}function dt(e){document.documentElement.style.setProperty(`--pointer-x`,`${e.clientX}px`),document.documentElement.style.setProperty(`--pointer-y`,`${e.clientY}px`)}