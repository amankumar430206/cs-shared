// The one place "what day is it right now" gets computed for the whole app —
// every campaign/booking start/end date is a plain calendar date meaning
// "in India" (the platform is India-only), so "today" has to mean IST-today,
// not the UTC date `new Date().toISOString().slice(0, 10)` would give — those
// two disagree for ~5.5 hours a day (18:30–23:59 UTC = 00:00–05:29 IST),
// during which UTC's date is a full day behind. Fixed +5:30 offset — no DST
// to account for in India — mirrors cs-api's shared/utils/istDate.js so both
// sides agree on the exact same "today."
const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000;

export function getTodayIST(): string {
  return new Date(Date.now() + IST_OFFSET_MS).toISOString().slice(0, 10);
}

// "5 Aug" / "5 Aug – 12 Aug" — same "day month" style already used ad hoc
// in ScreenAvailabilityCalendar.tsx's formatSpan, centralized here for the
// campaign header's date range.
export function formatDateRange(startIso: string, endIso: string): string {
  const start = new Date(startIso);
  const end = new Date(endIso);
  const startLabel = start.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
  const endLabel = end.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
  return startLabel === endLabel ? startLabel : `${startLabel} – ${endLabel}`;
}
