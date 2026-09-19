// Copied from cs-web src/lib/delivery.ts — keep in sync.
// Client mirror of cs-api's modules/delivery/deliveryEstimator.js plays
// formula — lets the frequency cards show "at least N plays a day" for every
// level instantly, without a quote round-trip per card. The authoritative
// numbers (and the price) still come from /pricing/estimate. Keep in sync.
export function effectiveShares(shares: number, maxAdCapacity: number | null | undefined) {
  const capacity = Math.max(1, Number(maxAdCapacity) || 1);
  return Math.min(capacity, Math.max(1, Math.round(shares) || 1));
}

function toSeconds(hhmm: string | null | undefined) {
  const [h, m = "0"] = String(hhmm ?? "00:00").split(":");
  return Number(h) * 3600 + Number(m) * 60;
}

export function operatingSecondsPerDay(start: string | null | undefined, end: string | null | undefined) {
  const s = toSeconds(start);
  const e = toSeconds(end);
  if (e === s) return 24 * 3600;
  return e > s ? e - s : 24 * 3600 - s + e;
}

export interface DeliveryScreen {
  operatingHoursStart: string;
  operatingHoursEnd: string;
  maxAdCapacity?: number | null;
}

/** Guaranteed floor for one screen: the sold-out loop, this ad's share of it. */
export function minPlaysPerDay(screen: DeliveryScreen, adDurationSeconds: number, shares: number) {
  const capacity = Math.max(1, Number(screen.maxAdCapacity) || 1);
  const duration = Math.max(1, adDurationSeconds || 1);
  const operating = operatingSecondsPerDay(screen.operatingHoursStart, screen.operatingHoursEnd);
  return Math.floor((operating / (capacity * duration)) * effectiveShares(shares, capacity));
}

export function totalMinPlaysPerDay(screens: DeliveryScreen[], adDurationSeconds: number, shares: number) {
  return screens.reduce((sum, s) => sum + minPlaysPerDay(s, adDurationSeconds, shares), 0);
}
