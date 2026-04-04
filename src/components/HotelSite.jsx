import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { formatCurrency, formatDateRange, formatGuests } from '../utils/format';

const sectionTransition = {
  duration: 0.9,
  ease: [0.16, 1, 0.3, 1],
};

function Reveal({ children, className = '', delay = 0, amount = 0.2 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 48, filter: 'blur(18px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount }}
      transition={{ ...sectionTransition, delay }}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({ eyebrow, title, body, align = 'left' }) {
  return (
    <div className={`grid gap-4 ${align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-2xl'}`}>
      <span className="text-[0.68rem] uppercase tracking-[0.38em] text-[#d4c1a1]/70">{eyebrow}</span>
      <h2 className="font-display text-4xl leading-[0.9] text-[#f7ecd8] sm:text-5xl lg:text-6xl">{title}</h2>
      {body ? <p className="max-w-xl text-base leading-8 text-stone-300/82">{body}</p> : null}
    </div>
  );
}

function InfoLine({ label, value }) {
  return (
    <div className="grid gap-1 border-b border-white/10 pb-4">
      <span className="text-[0.65rem] uppercase tracking-[0.34em] text-stone-400">{label}</span>
      <span className="text-lg font-semibold text-stone-100">{value}</span>
    </div>
  );
}

export function HotelSite({
  content,
  booking,
  setBooking,
  activeSuite,
  setActiveSuiteSlug,
  bookingSummary,
  onBookingSubmit,
  introPhase,
  notice,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(content.faq?.[0]?.question || '');
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const videoY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const filmMode = introPhase === 'video';
  const primaryContactHref = content.resort.instagramUrl || '#instagram';
  const primaryContactLabel = content.resort.instagramHandle || 'Instagram oficial';
  const summaryLabel = useMemo(() => {
    if (bookingSummary.valid && bookingSummary.total > 0) return `${formatCurrency(bookingSummary.total)} estimados`;
    if (bookingSummary.valid) return `${bookingSummary.nights} noites em análise`;
    return 'Consulta sob medida';
  }, [bookingSummary]);

  useEffect(() => {
    document.body.classList.toggle('overflow-hidden', filmMode);
    return () => document.body.classList.remove('overflow-hidden');
  }, [filmMode]);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const close = () => setMenuOpen(false);
    window.addEventListener('hashchange', close);
    return () => window.removeEventListener('hashchange', close);
  }, [menuOpen]);

  return (
    <div className="relative overflow-x-clip bg-[#061317]">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(153,190,174,0.12),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(212,193,161,0.08),transparent_22%)]" />

      <motion.header
        initial={false}
        animate={filmMode ? { opacity: 0, y: -26 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-40 px-4 py-4 sm:px-6 lg:px-10"
      >
        <div className="mx-auto flex max-w-[1380px] items-center justify-between rounded-full border border-white/10 bg-[#081317]/78 px-4 py-3 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:px-6">
          <a href="#/hotel" className="flex items-center gap-3">
            <span className="h-3 w-3 rounded-full bg-[#d4c1a1] shadow-[0_0_28px_rgba(212,193,161,0.8)]" />
            <div className="grid leading-tight">
              <strong className="text-sm font-semibold tracking-[0.18em] text-[#f8ebd4] sm:text-base">DEU LAGOA URUAÚ</strong>
              <span className="text-[0.68rem] uppercase tracking-[0.28em] text-stone-400">Lagoa do Uruaú, Beberibe</span>
            </div>
          </a>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-stone-200 lg:hidden"
            onClick={() => setMenuOpen((current) => !current)}
            aria-label="Abrir menu"
          >
            <span className="relative h-4 w-5">
              <span className={`absolute left-0 top-0 h-px w-5 bg-current transition ${menuOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
              <span className={`absolute left-0 top-[7px] h-px w-5 bg-current transition ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`absolute left-0 top-[14px] h-px w-5 bg-current transition ${menuOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
            </span>
          </button>

          <nav className="hidden items-center gap-8 lg:flex">
            {['A casa', 'Estadia', 'Reserva', 'Galeria', 'Contato'].map((item, index) => {
              const map = ['#historia', '#estadia', '#reserva', '#galeria', '#contato'];
              return (
                <a key={item} href={map[index]} className="text-sm text-stone-300 transition hover:text-white">
                  {item}
                </a>
              );
            })}
          </nav>

          <div className="hidden items-center gap-4 lg:flex">
            <a href={content.resort.instagramUrl} target="_blank" rel="noreferrer" className="text-sm text-stone-300 transition hover:text-white">
              {content.resort.instagramHandle}
            </a>
            <a href="#reserva" className="rounded-full bg-[#d4c1a1] px-6 py-3 text-sm font-semibold text-[#102126] transition hover:bg-[#ead6af]">
              Consultar disponibilidade
            </a>
          </div>
        </div>

        <motion.div
          initial={false}
          animate={menuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -18, pointerEvents: 'none' }}
          className="mx-auto mt-3 max-w-[1380px] rounded-[2rem] border border-white/10 bg-[#071216]/95 p-6 shadow-2xl backdrop-blur-2xl lg:hidden"
        >
          <div className="grid gap-4 text-sm text-stone-300">
            <a href="#historia" onClick={() => setMenuOpen(false)}>A casa</a>
            <a href="#estadia" onClick={() => setMenuOpen(false)}>Estadia</a>
            <a href="#reserva" onClick={() => setMenuOpen(false)}>Reserva</a>
            <a href="#galeria" onClick={() => setMenuOpen(false)}>Galeria</a>
            <a href="#contato" onClick={() => setMenuOpen(false)}>Contato</a>
            <a href={content.resort.instagramUrl} target="_blank" rel="noreferrer">{content.resort.instagramHandle}</a>
          </div>
        </motion.div>
      </motion.header>

      <section ref={heroRef} id="topo" className="relative min-h-screen overflow-hidden">
        <motion.video
          autoPlay
          muted
          loop
          playsInline
          poster={content.resort.featureVideoPoster || content.resort.heroImage}
          style={{ scale: videoScale, y: videoY }}
          className={`absolute inset-0 h-full w-full object-cover transition-[filter,transform,opacity] duration-[1800ms] ${filmMode ? 'brightness-[1.02] saturate-[1.04]' : 'scale-[1.04] brightness-[0.45] saturate-[0.9] blur-[7px]'}`}
        >
          <source src={content.resort.featureVideo} type="video/mp4" />
        </motion.video>

        <div className={`absolute inset-0 transition duration-[1800ms] ${filmMode ? 'bg-[linear-gradient(180deg,rgba(2,8,10,0.12),rgba(2,8,10,0.34))]' : 'bg-[linear-gradient(180deg,rgba(3,8,10,0.1),rgba(3,8,10,0.56)_40%,rgba(3,8,10,0.92)_100%)]'}`} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(239,221,183,0.16),transparent_22%),radial-gradient(circle_at_78%_20%,rgba(145,181,169,0.14),transparent_18%)]" />

        <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1480px] items-end px-4 pb-10 pt-28 sm:px-6 lg:px-10 lg:pb-12">
          <motion.div style={{ y: contentY }} className="grid w-full gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-12">
            <motion.div
              initial={false}
              animate={filmMode ? { opacity: 0, y: 36 } : { opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: filmMode ? 0 : 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-[760px]"
            >
              <motion.span
                initial={false}
                animate={filmMode ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.45, delay: 0.04 }}
                className="mb-5 inline-flex rounded-full border border-white/10 bg-white/6 px-4 py-2 text-[0.68rem] uppercase tracking-[0.34em] text-[#e9d8b8]"
              >
                {content.resort.seasonLabel}
              </motion.span>

              <motion.h1
                initial={false}
                animate={filmMode ? { opacity: 0, y: 30 } : { opacity: 1, y: 0 }}
                transition={{ duration: 0.72, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-[10ch] font-display text-[clamp(4rem,11vw,9rem)] leading-[0.86] tracking-[-0.05em] text-[#f7ecd8]"
              >
                {content.resort.heroTitle}
              </motion.h1>

              <motion.p
                initial={false}
                animate={filmMode ? { opacity: 0, y: 24 } : { opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
                className="mt-6 max-w-2xl text-lg leading-8 text-stone-200/78 sm:text-xl"
              >
                {content.resort.heroCopy}
              </motion.p>

              <motion.div
                initial={false}
                animate={filmMode ? { opacity: 0, y: 18 } : { opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="mt-8 flex flex-col gap-4 sm:flex-row"
              >
                <a href="#reserva" className="inline-flex items-center justify-center rounded-full bg-[#d4c1a1] px-7 py-4 text-sm font-semibold text-[#102126] transition hover:-translate-y-0.5 hover:bg-[#ead6af]">
                  Consultar disponibilidade
                </a>
                <a href={primaryContactHref} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-full border border-white/14 bg-white/6 px-7 py-4 text-sm font-medium text-stone-100 transition hover:-translate-y-0.5 hover:border-white/24 hover:bg-white/10">
                  {primaryContactLabel}
                </a>
              </motion.div>

              <motion.div
                initial={false}
                animate={filmMode ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-10 flex flex-wrap gap-6 text-[0.74rem] uppercase tracking-[0.32em] text-stone-300/70"
              >
                {content.policies.slice(0, 3).map((policy) => (
                  <span key={policy}>{policy}</span>
                ))}
              </motion.div>
            </motion.div>

            <motion.aside
              initial={false}
              animate={filmMode ? { opacity: 0, x: 32 } : { opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="hidden self-end rounded-[2.4rem] border border-white/10 bg-[linear-gradient(180deg,rgba(8,19,24,0.76),rgba(8,19,24,0.4))] p-7 shadow-[0_24px_80px_rgba(0,0,0,0.24)] backdrop-blur-xl lg:grid"
            >
              <InfoLine label="Destino" value={content.resort.location} />
              <div className="mt-5 grid gap-5">
                <InfoLine label="Check-in" value={content.resort.checkIn} />
                <InfoLine label="Check-out" value={content.resort.checkOut} />
                <InfoLine label="Canal oficial" value={content.resort.instagramHandle} />
              </div>
            </motion.aside>
          </motion.div>
        </div>

        <motion.button
          type="button"
          initial={false}
          animate={filmMode ? { opacity: 0.16 } : { opacity: 1 }}
          onClick={() => window.scrollTo({ top: window.innerHeight * 0.92, behavior: 'smooth' })}
          className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3 text-[0.68rem] uppercase tracking-[0.36em] text-stone-200/70"
        >
          <motion.span animate={{ y: [0, 10, 0] }} transition={{ duration: 1.8, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }} className="block h-14 w-px bg-gradient-to-b from-[#d4c1a1] to-transparent" />
          <span>Role para baixo</span>
        </motion.button>
      </section>

      <main className="relative z-10">
        <section className="border-y border-white/8 bg-black/14 py-6">
          <div className="mx-auto grid max-w-[1380px] gap-4 px-4 sm:px-6 lg:grid-cols-4 lg:px-10">
            {content.stats.map((item, index) => (
              <Reveal key={item.label} delay={index * 0.08} className="border-white/8 lg:border-l lg:pl-6 lg:first:border-l-0 lg:first:pl-0">
                <div className="text-[0.68rem] uppercase tracking-[0.32em] text-stone-400">{item.label}</div>
                <div className="mt-2 font-display text-3xl text-[#f4e6cc]">{item.value}</div>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="historia" className="mx-auto max-w-[1380px] px-4 py-24 sm:px-6 lg:px-10 lg:py-32">
          <Reveal>
            <SectionHeading eyebrow="A casa" title={content.resort.storyTitle} body={content.resort.storyCopy} />
          </Reveal>
          <div className="mt-16 grid gap-12">
            {content.storyPanels.map((panel, index) => (
              <Reveal key={panel.id} delay={index * 0.06} className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
                <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.6 }} className={`${index % 2 === 1 ? 'lg:order-2' : ''} overflow-hidden rounded-[2rem] border border-white/10`}>
                  <img src={panel.image} alt={panel.title} className="h-[360px] w-full object-cover sm:h-[480px]" />
                </motion.div>
                <div className={`${index % 2 === 1 ? 'lg:order-1' : ''} max-w-xl`}>
                  <span className="text-[0.68rem] uppercase tracking-[0.36em] text-[#d4c1a1]/70">{panel.eyebrow}</span>
                  <h3 className="mt-5 font-display text-4xl leading-[0.94] text-[#f7ecd8] sm:text-5xl">{panel.title}</h3>
                  <p className="mt-6 text-base leading-8 text-stone-300/82">{panel.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-[1480px] px-4 pb-24 sm:px-6 lg:px-10 lg:pb-32">
          <div className="grid gap-10 rounded-[2.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(10,21,24,0.88),rgba(5,12,14,0.94))] px-5 py-8 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-12 lg:py-12">
            <Reveal className="grid content-start gap-6">
              <SectionHeading eyebrow="Atmosfera" title="A presença da água conduz toda a leitura do espaço." body="As publicações oficiais reforçam a lagoa como eixo da experiência, com hospedagem, restaurante e permanência no mesmo ritmo." />
              <div className="grid gap-4 text-sm leading-7 text-stone-300/78">
                {content.itinerary.map((item) => (
                  <div key={item.title} className="grid gap-2 border-b border-white/8 pb-4 last:border-b-0 last:pb-0">
                    <span className="text-[0.64rem] uppercase tracking-[0.34em] text-[#d4c1a1]/70">{item.time}</span>
                    <strong className="text-lg text-stone-100">{item.title}</strong>
                    <p>{item.description}</p>
                  </div>
                ))}
              </div>
            </Reveal>
            <div className="grid gap-5 sm:grid-cols-2">
              {content.instagramPosts.map((post, index) => {
                const Wrapper = post.sourceUrl ? motion.a : motion.div;
                const extra = post.sourceUrl ? { href: post.sourceUrl, target: '_blank', rel: 'noreferrer' } : {};
                return (
                  <Reveal key={post.id} delay={index * 0.08}>
                    <Wrapper {...extra} whileHover={{ y: -8 }} className={`group block overflow-hidden rounded-[2rem] border border-white/10 bg-black/18 ${index === 0 ? 'sm:col-span-2' : ''}`}>
                      <div className={`overflow-hidden ${index === 0 ? 'aspect-[16/9]' : 'aspect-[5/6]'}`}>
                        <motion.img src={post.image} alt={post.caption} whileHover={{ scale: 1.06 }} transition={{ duration: 0.7 }} className="h-full w-full object-cover" />
                      </div>
                      <div className="px-5 py-5 text-sm leading-7 text-stone-300/80">
                        <p>{post.caption}</p>
                      </div>
                    </Wrapper>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <section id="estadia" className="mx-auto max-w-[1380px] px-4 pb-24 sm:px-6 lg:px-10 lg:pb-32">
          <div className="grid gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:items-end">
            <Reveal className="overflow-hidden rounded-[2.5rem] border border-white/10">
              <img src={activeSuite?.image || content.resort.signatureImage} alt={activeSuite?.name || content.resort.name} className="h-[560px] w-full object-cover" />
            </Reveal>
            <div className="grid gap-8">
              <Reveal>
                <SectionHeading eyebrow="Hospedagem" title={activeSuite?.name || 'Consulta de hospedagem'} body={activeSuite?.details || content.resort.storyCopy} />
              </Reveal>
              <Reveal delay={0.08} className="grid gap-5 text-base leading-8 text-stone-300/82">
                <p>{activeSuite?.summary}</p>
                <div className="flex flex-wrap gap-3">
                  {(activeSuite?.amenities || []).map((amenity) => (
                    <span key={amenity} className="rounded-full border border-white/12 px-4 py-2 text-sm text-stone-200/84">{amenity}</span>
                  ))}
                </div>
              </Reveal>
              <Reveal delay={0.16} className="grid gap-4 sm:grid-cols-2">
                {content.testimonials.map((item) => (
                  <blockquote key={item.author} className="rounded-[2rem] border border-white/10 bg-white/4 p-6">
                    <p className="font-display text-2xl leading-[1.02] text-[#f3e4c7]">“{item.quote}”</p>
                    <footer className="mt-4 text-[0.68rem] uppercase tracking-[0.28em] text-stone-400">{item.author}</footer>
                  </blockquote>
                ))}
              </Reveal>
            </div>
          </div>
        </section>

        <section id="reserva" className="mx-auto max-w-[1480px] px-4 pb-24 sm:px-6 lg:px-10 lg:pb-32">
          <div className="grid gap-10 rounded-[2.6rem] border border-white/10 bg-[linear-gradient(145deg,rgba(8,19,24,0.96),rgba(12,31,36,0.76))] px-5 py-8 shadow-[0_30px_120px_rgba(0,0,0,0.22)] sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:px-12 lg:py-12">
            <Reveal>
              <SectionHeading eyebrow="Reserva" title="Solicitação direta com bloqueio de período." body="Selecione o período e envie seus dados. A solicitação entra na agenda da equipe e evita sobreposição enquanto a disponibilidade é confirmada." />
              <div className="mt-8 grid gap-5">
                <InfoLine label="Categoria em análise" value={activeSuite?.name || 'Consulta de hospedagem'} />
                <InfoLine label="Período" value={booking.checkin && booking.checkout ? formatDateRange(booking.checkin, booking.checkout) : 'Selecione as datas'} />
                <InfoLine label="Estimativa" value={summaryLabel} />
                <InfoLine label="Canal oficial" value={primaryContactLabel} />
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <form
                className="grid gap-5"
                onSubmit={(event) => {
                  event.preventDefault();
                  onBookingSubmit();
                }}
              >
                <div className="grid gap-2">
                  <label className="text-[0.68rem] uppercase tracking-[0.32em] text-stone-400">Hospedagem</label>
                  <select
                    value={booking.suite}
                    onChange={(event) => {
                      const slug = event.target.value;
                      setActiveSuiteSlug(slug);
                      setBooking((current) => ({ ...current, suite: slug }));
                    }}
                    className="h-14 rounded-2xl border border-white/12 bg-[#09161a] px-4 text-base text-stone-100 outline-none transition focus:border-[#d4c1a1]"
                  >
                    {content.suites.map((suite) => (
                      <option key={suite.slug} value={suite.slug}>
                        {suite.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Check-in" type="date" value={booking.checkin} onChange={(value) => setBooking((current) => ({ ...current, checkin: value }))} />
                  <Field label="Check-out" type="date" value={booking.checkout} onChange={(value) => setBooking((current) => ({ ...current, checkout: value }))} />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Nome" value={booking.guestName} onChange={(value) => setBooking((current) => ({ ...current, guestName: value }))} />
                  <Field label="Contato" value={booking.guestContact} onChange={(value) => setBooking((current) => ({ ...current, guestContact: value }))} />
                </div>

                <div className="grid gap-5 sm:grid-cols-[1fr_180px]">
                  <Field label="E-mail" type="email" value={booking.guestEmail} onChange={(value) => setBooking((current) => ({ ...current, guestEmail: value }))} />
                  <Field label="Hóspedes" type="number" min="1" max="12" value={booking.guests} onChange={(value) => setBooking((current) => ({ ...current, guests: Number(value) || 1 }))} />
                </div>

                <div className="grid gap-2">
                  <label className="text-[0.68rem] uppercase tracking-[0.32em] text-stone-400">Observações</label>
                  <textarea
                    value={booking.notes}
                    onChange={(event) => setBooking((current) => ({ ...current, notes: event.target.value }))}
                    rows={4}
                    className="rounded-[1.5rem] border border-white/12 bg-[#09161a] px-4 py-4 text-base text-stone-100 outline-none transition focus:border-[#d4c1a1]"
                  />
                </div>

                <div className="flex flex-col gap-3 border-t border-white/8 pt-5 text-sm text-stone-300/70 sm:flex-row sm:items-center sm:justify-between">
                  <div className="grid gap-1">
                    <span>{bookingSummary.valid ? `${bookingSummary.nights} noites · ${formatGuests(booking.guests)}` : 'Selecione o período para avançar.'}</span>
                    <span>{content.resort.instagramHandle}</span>
                  </div>
                  <button type="submit" className="inline-flex items-center justify-center rounded-full bg-[#d4c1a1] px-7 py-4 text-sm font-semibold text-[#102126] transition hover:-translate-y-0.5 hover:bg-[#ead6af]">
                    Registrar solicitação
                  </button>
                </div>
              </form>
            </Reveal>
          </div>
        </section>

        <section id="galeria" className="mx-auto max-w-[1380px] px-4 pb-24 sm:px-6 lg:px-10 lg:pb-32">
          <Reveal>
            <SectionHeading eyebrow="Galeria" title="Recortes públicos do lugar." body="Imagens e reel oficial usados como base visual do site. Sem material simulado nem cenas fora do que a operação já publica." />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {content.instagramPosts.map((post, index) => (
              <Reveal key={post.id} delay={index * 0.06}>
                <a
                  href={post.sourceUrl || content.resort.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={`group block overflow-hidden rounded-[2rem] border border-white/10 bg-white/4 ${index === 0 ? 'lg:col-span-2' : ''}`}
                >
                  <div className={`overflow-hidden ${index === 0 ? 'aspect-[16/10]' : 'aspect-[4/5]'}`}>
                    <motion.img src={post.image} alt={post.caption} whileHover={{ scale: 1.07 }} transition={{ duration: 0.75 }} className="h-full w-full object-cover" />
                  </div>
                  <div className="grid gap-3 px-5 py-5 text-sm leading-7 text-stone-300/78">
                    <span className="text-[0.64rem] uppercase tracking-[0.34em] text-[#d4c1a1]/70">Publicação oficial</span>
                    <p>{post.caption}</p>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="contato" className="mx-auto max-w-[1380px] px-4 pb-24 sm:px-6 lg:px-10 lg:pb-32">
          <div className="grid gap-10 rounded-[2.6rem] border border-white/10 bg-black/16 px-5 py-8 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:px-12 lg:py-12">
            <Reveal>
              <SectionHeading eyebrow="Contato" title="Tudo converge para o atendimento direto da casa." body="O canal público confirmado hoje é o Instagram oficial da Deu Lagoa Uruaú. Outros contatos podem ser confirmados diretamente com a equipe da pousada." />
            </Reveal>
            <Reveal delay={0.08} className="grid gap-4">
              {content.faq.map((item) => {
                const open = openFaq === item.question;
                return (
                  <div key={item.question} className="rounded-[1.8rem] border border-white/10 bg-white/4 px-5 py-5">
                    <button type="button" className="flex w-full items-center justify-between gap-4 text-left" onClick={() => setOpenFaq(open ? '' : item.question)}>
                      <span className="text-lg font-semibold text-stone-100">{item.question}</span>
                      <span className="text-[#d4c1a1]">{open ? '-' : '+'}</span>
                    </button>
                    <motion.div initial={false} animate={open ? { height: 'auto', opacity: 1, marginTop: 16 } : { height: 0, opacity: 0, marginTop: 0 }} className="overflow-hidden text-sm leading-7 text-stone-300/78">
                      <p>{item.answer}</p>
                    </motion.div>
                  </div>
                );
              })}
            </Reveal>
          </div>
        </section>
      </main>

      {notice ? (
        <div className="fixed bottom-5 left-1/2 z-50 w-[min(calc(100%-1.5rem),480px)] -translate-x-1/2 rounded-full border border-white/10 bg-[#0b181c]/92 px-5 py-3 text-center text-sm text-stone-100 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl">
          {notice}
        </div>
      ) : null}

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-[#061216]/90 px-4 py-3 backdrop-blur-xl lg:hidden">
        <div className="mx-auto flex max-w-xl items-center gap-3">
          <a href="#reserva" className="flex-1 rounded-full bg-[#d4c1a1] px-4 py-3 text-center text-sm font-semibold text-[#102126]">
            Reserva
          </a>
          <a href={content.resort.instagramUrl} target="_blank" rel="noreferrer" className="flex-1 rounded-full border border-white/12 px-4 py-3 text-center text-sm text-stone-100">
            Instagram
          </a>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = 'text', min, max }) {
  return (
    <div className="grid gap-2">
      <label className="text-[0.68rem] uppercase tracking-[0.32em] text-stone-400">{label}</label>
      <input
        type={type}
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-14 rounded-2xl border border-white/12 bg-[#09161a] px-4 text-base text-stone-100 outline-none transition focus:border-[#d4c1a1]"
      />
    </div>
  );
}
