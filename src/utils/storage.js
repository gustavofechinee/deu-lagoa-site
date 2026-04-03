import { seedContent } from "../data/deu-lagoa-content.js";

const KEY = "deu_lagoa_content_v1";

export function ensureContent() {
  const current = readContent();
  const merged = mergeContent(seedContent, current);
  writeContent(merged);
  return merged;
}

export function readContent() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function writeContent(content) {
  localStorage.setItem(KEY, JSON.stringify(content));
}

export function resetContent() {
  writeContent(seedContent);
  return clone(seedContent);
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function mergeContent(seed, current) {
  if (!current) return clone(seed);

  const next = clone(seed);
  const source = clone(current);

  next.resort = { ...next.resort, ...(source.resort || {}) };
  next.stats = takeArray(source.stats, next.stats);
  next.storyPanels = takeArray(source.storyPanels, next.storyPanels);
  next.suites = takeArray(source.suites, next.suites);
  next.rituals = takeArray(source.rituals, next.rituals);
  next.experiences = takeArray(source.experiences, next.experiences);
  next.itinerary = takeArray(source.itinerary, next.itinerary);
  next.testimonials = takeArray(source.testimonials, next.testimonials);
  next.faq = takeArray(source.faq, next.faq);
  next.policies = takeArray(source.policies, next.policies);
  next.instagramPosts = takeArray(source.instagramPosts, next.instagramPosts);
  next.reservations = takeArray(source.reservations, next.reservations);
  next.verification = mergeDeep(next.verification, source.verification);
  next.ops = mergeDeep(next.ops, source.ops);
  next.reservationSettings = mergeDeep(next.reservationSettings, source.reservationSettings);
  next.meta = {
    updatedAt: source?.meta?.updatedAt || new Date().toISOString(),
    persistence: "localStorage-demo",
  };
  next.version = seed.version;

  return next;
}

function takeArray(candidate, fallback) {
  return Array.isArray(candidate) ? clone(candidate) : clone(fallback);
}

function mergeDeep(seed, source) {
  if (!source || typeof source !== "object" || Array.isArray(source)) return clone(seed);
  const output = clone(seed);
  Object.entries(source).forEach(([key, value]) => {
    if (Array.isArray(value)) output[key] = clone(value);
    else if (value && typeof value === "object") output[key] = mergeDeep(output[key] || {}, value);
    else output[key] = value;
  });
  return output;
}
