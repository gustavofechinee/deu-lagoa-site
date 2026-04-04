import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { HotelSite } from './components/HotelSite';
import { SellerPanel } from './components/SellerPanel';
import { parseHashRoute, normalizeHash, navigateTo } from './lib/routes';
import { ensureContent, resetContent, writeContent } from './utils/storage';
import { createReservationSummary } from './utils/format';
import { getReservationMetrics, hasReservationConflict, normalizeReservation } from './utils/availability';

const SESSION_KEY = 'deu_lagoa_seller_session_v1';
const INTRO_KEY = 'deu_lagoa_intro_seen_v2';

const defaultBooking = {
  suite: '',
  checkin: '',
  checkout: '',
  guests: 2,
  guestName: '',
  guestContact: '',
  guestEmail: '',
  notes: '',
};

const clone = (value) => JSON.parse(JSON.stringify(value));

function getInitialRoute() {
  if (typeof window === 'undefined') return { name: 'hotel' };
  return parseHashRoute();
}

export default function App() {
  const [route, setRoute] = useState(getInitialRoute);
  const [content, setContent] = useState(() => ensureContent());
  const [sellerAuthed, setSellerAuthed] = useState(() => sessionStorage.getItem(SESSION_KEY) === '1');
  const [booking, setBooking] = useState(defaultBooking);
  const [activeSuiteSlug, setActiveSuiteSlug] = useState('');
  const [notice, setNotice] = useState('');
  const [introPhase, setIntroPhase] = useState(() => {
    if (typeof window === 'undefined') return 'content';
    return parseHashRoute().name === 'hotel' && sessionStorage.getItem(INTRO_KEY) !== '1' ? 'video' : 'content';
  });

  const noticeTimer = useRef(0);

  useEffect(() => {
    normalizeHash();
    const handleHashChange = () => {
      if (normalizeHash()) return;
      setRoute(parseHashRoute());
    };

    const handleShortcut = (event) => {
      if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === 'v') {
        event.preventDefault();
        navigateTo('/vendedor');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('keydown', handleShortcut);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('keydown', handleShortcut);
    };
  }, []);

  useEffect(() => {
    if (route.name !== 'hotel') {
      setIntroPhase('content');
      return;
    }

    const shouldPlayIntro = sessionStorage.getItem(INTRO_KEY) !== '1';
    if (!shouldPlayIntro) {
      setIntroPhase('content');
      return;
    }

    setIntroPhase('video');
    const timer = window.setTimeout(() => {
      setIntroPhase('content');
      sessionStorage.setItem(INTRO_KEY, '1');
    }, 1600);

    return () => window.clearTimeout(timer);
  }, [route.name]);

  useEffect(() => {
    const firstSuite = content.suites?.[0]?.slug || '';
    setActiveSuiteSlug((current) => current || firstSuite);
    setBooking((current) => ({ ...current, suite: current.suite || firstSuite }));
  }, [content.suites]);

  const activeSuite = useMemo(() => {
    return content.suites.find((suite) => suite.slug === activeSuiteSlug) || content.suites[0] || null;
  }, [content.suites, activeSuiteSlug]);

  const bookingSummary = useMemo(() => createReservationSummary({ suite: activeSuite, ...booking }), [activeSuite, booking]);
  const metrics = useMemo(() => getReservationMetrics(content, 90), [content]);

  const flashNotice = useCallback((message) => {
    setNotice(message);
    if (noticeTimer.current) window.clearTimeout(noticeTimer.current);
    noticeTimer.current = window.setTimeout(() => setNotice(''), 3200);
  }, []);

  useEffect(() => () => {
    if (noticeTimer.current) window.clearTimeout(noticeTimer.current);
  }, []);

  const persistContent = useCallback((updater, message = '') => {
    setContent((previous) => {
      const draft = clone(previous);
      const next = typeof updater === 'function' ? updater(draft) : updater;
      writeContent(next);
      return next;
    });
    if (message) flashNotice(message);
  }, [flashNotice]);

  const handleBookingSubmit = useCallback(() => {
    if (!activeSuite) {
      flashNotice('Nenhuma categoria de hospedagem está disponível no painel.');
      return { ok: false };
    }

    const reservation = normalizeReservation({
      id: `rsv-${Date.now()}`,
      suiteSlug: activeSuite.slug,
      guestName: booking.guestName,
      guestContact: booking.guestContact,
      guestEmail: booking.guestEmail,
      checkin: booking.checkin,
      checkout: booking.checkout,
      guests: booking.guests,
      notes: booking.notes,
      status: 'pending',
      totalEstimate: bookingSummary.total,
      source: 'site',
    });

    if (!reservation.checkin || !reservation.checkout || !reservation.guestName || !reservation.guestContact) {
      flashNotice('Preencha nome, contato e período para enviar a solicitação.');
      return { ok: false };
    }

    if (hasReservationConflict(content, reservation)) {
      flashNotice('Esse período já está em análise ou bloqueado para esta hospedagem.');
      return { ok: false };
    }

    const nextContent = clone(content);
    nextContent.reservations.unshift(reservation);
    writeContent(nextContent);
    setContent(nextContent);
    setBooking((current) => ({ ...defaultBooking, suite: current.suite || activeSuite.slug }));
    flashNotice('Solicitação registrada no painel interno.');
    return { ok: true, reservation };
  }, [activeSuite, booking, bookingSummary.total, content, flashNotice]);

  const handleSellerLogin = useCallback((code) => {
    if (String(code || '') !== String(content.resort.sellerCode || '')) {
      flashNotice('Código inválido.');
      return false;
    }
    sessionStorage.setItem(SESSION_KEY, '1');
    setSellerAuthed(true);
    navigateTo('/vendedor/overview');
    flashNotice('Painel liberado.');
    return true;
  }, [content.resort.sellerCode, flashNotice]);

  const handleLogout = useCallback(() => {
    sessionStorage.removeItem(SESSION_KEY);
    setSellerAuthed(false);
    navigateTo('/hotel');
    flashNotice('Sessão encerrada.');
  }, [flashNotice]);

  const handleResetDemo = useCallback(() => {
    const next = resetContent();
    setContent(next);
    setBooking((current) => ({ ...defaultBooking, suite: current.suite || next.suites?.[0]?.slug || '' }));
    flashNotice('Conteúdo restaurado para a base atual.');
  }, [flashNotice]);

  return (
    <div className="min-h-screen bg-[#061317] text-stone-100">
      {route.name === 'hotel' ? (
        <HotelSite
          content={content}
          booking={booking}
          setBooking={setBooking}
          activeSuite={activeSuite}
          setActiveSuiteSlug={setActiveSuiteSlug}
          bookingSummary={bookingSummary}
          onBookingSubmit={handleBookingSubmit}
          introPhase={introPhase}
          notice={notice}
        />
      ) : (
        <SellerPanel
          content={content}
          route={route}
          sellerAuthed={sellerAuthed}
          onLogin={handleSellerLogin}
          onLogout={handleLogout}
          onPersistContent={persistContent}
          onResetDemo={handleResetDemo}
          metrics={metrics}
          notice={notice}
        />
      )}
    </div>
  );
}
