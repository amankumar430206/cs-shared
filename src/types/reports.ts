// Types + query helpers for the /analytics/reports/* family (plays + revenue).
// Mirrors cs-api modules/analytics/analytics.reports.service.js.

export type ReportRange = "today" | "yesterday" | "7d" | "week" | "30d" | "month" | "last_month" | "year" | "custom";
export type ReportGranularity = "hour" | "day" | "week" | "month";
export type PlaysGroupBy = "screen" | "campaign" | "creative" | "city" | "state";
export type RevenueGroupBy = "screen" | "campaign" | "city" | "state";

export interface ReportFilters {
  range: ReportRange;
  from?: string;
  to?: string;
  screenId: string[];
  campaignId: string[];
  creativeId: string[];
  city?: string;
}

export const DEFAULT_REPORT_FILTERS: ReportFilters = { range: "30d", screenId: [], campaignId: [], creativeId: [] };

export const REPORT_RANGES: ReportRange[] = ["today", "yesterday", "7d", "week", "30d", "month", "last_month", "year", "custom"];

export function buildReportQuery(filters: ReportFilters, extra: Record<string, string | undefined> = {}): string {
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

/** A custom range is only queryable once both ends are picked. */
export const isReportQueryable = (f: ReportFilters) => f.range !== "custom" || (!!f.from && !!f.to);

export interface PlayStats {
  totalPlays: number;
  completed: number;
  failed: number;
  interrupted: number;
  successRate: number | null;
  secondsPlayed: number;
}

export interface PlaysSummary {
  role: "ADVERTISER" | "PARTNER" | "ADMIN";
  range: { from: string; to: string; days: number; previous: { from: string; to: string } };
  kpis: PlayStats & {
    screensPlaying: number;
    campaignsPlaying: number;
    contentPlayed: number;
    estimatedImpressions: number;
    uptimePercent: number | null;
  };
  previous: PlayStats & { estimatedImpressions: number };
  deltas: {
    totalPlays: number | null;
    completed: number | null;
    failed: number | null;
    successRatePoints: number | null;
    estimatedImpressions: number | null;
  };
}

export interface ReportSeries {
  id: string;
  label: string;
  values: number[];
}

export interface PlaysTimeseries {
  granularity: ReportGranularity;
  range: { from: string; to: string };
  buckets: string[];
  totals: { completed: number[]; failed: number[]; interrupted: number[]; plays: number[]; successRate: (number | null)[] };
  series: ReportSeries[] | null;
}

export interface PlaysBreakdownRow extends PlayStats {
  id: string;
  label: string;
  sharePercent: number;
  screens: number;
  lastPlayedDay: string | null;
  city?: string | null;
  uptimePercent?: number | null;
  estimatedImpressions?: number;
  status?: string | null;
}

export interface PlaysBreakdown {
  groupBy: PlaysGroupBy;
  range: { from: string; to: string };
  totalPlays: number;
  rows: PlaysBreakdownRow[];
}

export interface HeatmapDayStat extends PlayStats {
  date: string;
}

export interface PlaysHeatmap {
  range: { from: string; to: string };
  days: HeatmapDayStat[];
  weekdayHour: { supported: boolean; from: string; to: string; grid: number[][] };
}

export interface ReportFilterOptions {
  screens: { id: string; name: string; city: string | null }[];
  campaigns: { id: string; name: string; status: string }[];
  creatives: { id: string; name: string; campaign_name: string }[];
  cities: string[];
}

export interface RevenueTotals {
  gross: number;
  net: number;
  deductions: number;
  bookings: number;
  averageBooking: number;
  plays: number;
  grossPerThousandPlays: number | null;
}

export interface RevenueSummary {
  role: "ADVERTISER" | "PARTNER" | "ADMIN";
  range: { from: string; to: string; days: number; previous: { from: string; to: string } };
  totals: RevenueTotals & { screens: number; campaigns: number };
  previous: RevenueTotals;
  deltas: { gross: number | null; net: number | null; bookings: number | null };
}

export interface RevenueTimeseries {
  granularity: ReportGranularity;
  range: { from: string; to: string };
  buckets: string[];
  totals: { gross: number[]; net: number[] };
  series: ReportSeries[] | null;
}

export interface RevenueBreakdownRow extends RevenueTotals {
  id: string;
  label: string;
  sharePercent: number;
}

export interface RevenueBreakdown {
  role: "ADVERTISER" | "PARTNER" | "ADMIN";
  groupBy: RevenueGroupBy;
  range: { from: string; to: string };
  totalGross: number;
  rows: RevenueBreakdownRow[];
}
