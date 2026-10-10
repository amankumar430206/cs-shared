// Stable per-install id sent as X-Device-Id so cs-api can tell devices apart
// (session cap, "was this you?" alerts). The platform persists it (localStorage
// on web, SecureStore on native); this only mints one.
export function generateDeviceId(): string {
  const c = (globalThis as { crypto?: { randomUUID?: () => string } }).crypto;
  if (c?.randomUUID) return c.randomUUID();
  const rand = () => Math.random().toString(36).slice(2, 10);
  return `${Date.now().toString(36)}-${rand()}-${rand()}${rand()}`;
}
