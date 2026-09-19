// Copied from cs-web src/lib/money.ts — keep in sync.
// Indian number formatting for the advertiser-facing surfaces: rupees with
// en-IN grouping (₹1,23,456) and the lakh/crore short forms people actually
// say ("4.2L views", "1.2Cr") rather than K/M.
export function formatRupees(amount: number, { decimals = false }: { decimals?: boolean } = {}): string {
  return `₹${amount.toLocaleString("en-IN", { minimumFractionDigits: decimals ? 2 : 0, maximumFractionDigits: decimals ? 2 : 0 })}`;
}

export function formatCompactIndian(value: number): string {
  const abs = Math.abs(value);
  const trim = (n: number) => (Math.round(n * 10) / 10).toLocaleString("en-IN", { maximumFractionDigits: 1 });
  if (abs >= 1_00_00_000) return `${trim(value / 1_00_00_000)}Cr`;
  if (abs >= 1_00_000) return `${trim(value / 1_00_000)}L`;
  if (abs >= 1_000) return `${trim(value / 1_000)}K`;
  return Math.round(value).toLocaleString("en-IN");
}
