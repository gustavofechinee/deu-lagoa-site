export function parseHashRoute(hash = window.location.hash) {
  const clean = String(hash || '').replace(/^#/, '') || '/hotel';
  const parts = clean.split('/').filter(Boolean);

  if (parts[0] === 'vendedor') {
    return {
      name: 'seller',
      tab: parts[1] || 'overview',
    };
  }

  return { name: 'hotel' };
}

export function normalizeHash() {
  const clean = String(window.location.hash || '').replace(/^#/, '');
  if (!clean || clean === '/' || clean === '/comprador') {
    window.location.hash = '/hotel';
    return true;
  }
  return false;
}

export function navigateTo(hash) {
  const nextHash = hash.startsWith('#') ? hash : `#${hash}`;
  if (window.location.hash === nextHash) {
    window.dispatchEvent(new HashChangeEvent('hashchange'));
    return;
  }
  window.location.hash = nextHash;
}
