// Last-7-vs-previous-7-days percent change, computed client-side from a
// series the caller already fetched — same comparison
// cs-api's getCampaignTrend does server-side, just without a dedicated
// endpoint for it. Needs 14+ points to have two full, non-overlapping
// windows to compare.
export function computePeriodDelta(values: number[]): number | null {
  if (values.length < 14) return null;
  const last7 = values.slice(-7).reduce((a, b) => a + b, 0);
  const prev7 = values.slice(-14, -7).reduce((a, b) => a + b, 0);
  if (prev7 === 0) return last7 > 0 ? 100 : 0;
  return Math.round(((last7 - prev7) / prev7) * 100);
}
