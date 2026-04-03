export function formatCurrency(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(Number(value) || 0);
}

export function formatGuests(guests) {
  const total = Number(guests) || 0;
  return `${total} ${total === 1 ? "hospede" : "hospedes"}`;
}

export function countNights(checkin, checkout) {
  if (!checkin || !checkout) return 0;
  const start = new Date(`${checkin}T12:00:00`);
  const end = new Date(`${checkout}T12:00:00`);
  const diff = end.getTime() - start.getTime();
  if (!Number.isFinite(diff) || diff <= 0) return 0;
  return Math.round(diff / 86400000);
}

export function createReservationSummary({ suite, checkin, checkout, guests }) {
  const nights = countNights(checkin, checkout);
  const total = nights * (suite?.rate || 0);
  return {
    nights,
    total,
    valid: Boolean(suite && nights > 0 && guests > 0),
  };
}

export function formatDateLabel(value) {
  if (!value) return "";
  try {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "short",
    }).format(new Date(`${value}T12:00:00`));
  } catch {
    return value;
  }
}

export function formatDateRange(checkin, checkout) {
  if (!checkin || !checkout) return "";
  return `${formatDateLabel(checkin)} - ${formatDateLabel(checkout)}`;
}

export function formatReservationStatus(status) {
  const normalized = String(status || "").toLowerCase();
  if (normalized === "confirmed") return "confirmada";
  if (normalized === "cancelled") return "cancelada";
  if (normalized === "completed") return "concluída";
  return "pendente";
}

export function h(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
