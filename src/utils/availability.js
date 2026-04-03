const DEFAULT_BLOCKING_STATUSES = ["pending", "confirmed"];

export function getBlockingStatuses(content) {
  const configured = content?.reservationSettings?.blockingStatuses;
  return Array.isArray(configured) && configured.length ? configured : DEFAULT_BLOCKING_STATUSES;
}

export function reservationBlocks(content, reservation) {
  return getBlockingStatuses(content).includes(String(reservation?.status || "").toLowerCase());
}

export function hasReservationConflict(content, candidate, excludeId = "") {
  const suiteSlug = String(candidate?.suiteSlug || "");
  const checkin = String(candidate?.checkin || "");
  const checkout = String(candidate?.checkout || "");
  if (!suiteSlug || !checkin || !checkout) return false;

  return getReservationsForSuite(content, suiteSlug).some((reservation) => {
    if (excludeId && reservation.id === excludeId) return false;
    if (!reservationBlocks(content, reservation)) return false;
    return rangesOverlap(checkin, checkout, reservation.checkin, reservation.checkout);
  });
}

export function getReservationsForSuite(content, suiteSlug) {
  return (content?.reservations || [])
    .filter((reservation) => reservation.suiteSlug === suiteSlug)
    .slice()
    .sort((left, right) => String(left.checkin || "").localeCompare(String(right.checkin || "")));
}

export function getUpcomingBlockedWindows(content, suiteSlug, limit = 3) {
  const today = toEpochDate(new Date().toISOString().slice(0, 10));
  return getReservationsForSuite(content, suiteSlug)
    .filter((reservation) => reservationBlocks(content, reservation))
    .filter((reservation) => toEpochDate(reservation.checkout) >= today)
    .slice(0, limit);
}

export function getReservationMetrics(content, days = 90) {
  const suites = content?.suites || [];
  const reservations = content?.reservations || [];
  const suiteCount = suites.length || 1;
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const end = new Date(start);
  end.setDate(end.getDate() + days);

  let blockedNights = 0;
  let pendingCount = 0;
  let activeCount = 0;

  reservations.forEach((reservation) => {
    if (String(reservation.status || "") === "pending") pendingCount += 1;
    if (!reservationBlocks(content, reservation)) return;
    activeCount += 1;

    const overlapStart = Math.max(toEpochDate(reservation.checkin), Math.floor(start.getTime() / 86400000));
    const overlapEnd = Math.min(toEpochDate(reservation.checkout), Math.floor(end.getTime() / 86400000));
    if (overlapEnd > overlapStart) blockedNights += overlapEnd - overlapStart;
  });

  const totalNights = suiteCount * days;
  return {
    suiteCount,
    reservationCount: reservations.length,
    activeCount,
    pendingCount,
    blockedNights,
    occupancyRate: totalNights ? Math.min(100, Math.round((blockedNights / totalNights) * 100)) : 0,
  };
}

export function normalizeReservation(reservation) {
  return {
    id: String(reservation?.id || ""),
    suiteSlug: String(reservation?.suiteSlug || ""),
    guestName: String(reservation?.guestName || ""),
    guestContact: String(reservation?.guestContact || ""),
    guestEmail: String(reservation?.guestEmail || ""),
    checkin: String(reservation?.checkin || ""),
    checkout: String(reservation?.checkout || ""),
    guests: Number(reservation?.guests || 1),
    notes: String(reservation?.notes || ""),
    status: String(reservation?.status || "pending"),
    source: String(reservation?.source || "site"),
    totalEstimate: Number(reservation?.totalEstimate || 0),
    createdAt: String(reservation?.createdAt || new Date().toISOString()),
  };
}

function rangesOverlap(startA, endA, startB, endB) {
  const aStart = toEpochDate(startA);
  const aEnd = toEpochDate(endA);
  const bStart = toEpochDate(startB);
  const bEnd = toEpochDate(endB);
  if (!Number.isFinite(aStart) || !Number.isFinite(aEnd) || !Number.isFinite(bStart) || !Number.isFinite(bEnd)) return false;
  return aStart < bEnd && bStart < aEnd;
}

function toEpochDate(value) {
  if (!value) return NaN;
  const stamp = new Date(`${value}T12:00:00`).getTime();
  return Number.isFinite(stamp) ? Math.floor(stamp / 86400000) : NaN;
}
