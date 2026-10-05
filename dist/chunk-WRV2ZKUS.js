// src/types/reports.ts
var DEFAULT_REPORT_FILTERS = { range: "30d", screenId: [], campaignId: [], creativeId: [] };
var REPORT_RANGES = ["today", "yesterday", "7d", "week", "30d", "month", "last_month", "year", "custom"];
function buildReportQuery(filters, extra = {}) {
  const p = new URLSearchParams();
  p.set("range", filters.range);
  if (filters.range === "custom" && filters.from && filters.to) {
    p.set("from", filters.from);
    p.set("to", filters.to);
  }
  filters.screenId.forEach((id) => p.append("screenId", id));
  filters.campaignId.forEach((id) => p.append("campaignId", id));
  filters.creativeId.forEach((id) => p.append("creativeId", id));
  if (filters.city) p.set("city", filters.city);
  for (const [k, v] of Object.entries(extra)) if (v) p.set(k, v);
  return p.toString();
}
var isReportQueryable = (f) => f.range !== "custom" || !!f.from && !!f.to;

export { DEFAULT_REPORT_FILTERS, REPORT_RANGES, buildReportQuery, isReportQueryable };
