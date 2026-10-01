import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { apiGet } from "../api/client";
import { getAccessToken, useHasSession } from "../api/session";
import {
  buildReportQuery,
  isReportQueryable,
  type PlaysBreakdown,
  type PlaysGroupBy,
  type PlaysHeatmap,
  type PlaysSummary,
  type PlaysTimeseries,
  type ReportFilterOptions,
  type ReportFilters,
  type ReportGranularity,
  type RevenueBreakdown,
  type RevenueGroupBy,
  type RevenueSummary,
  type RevenueTimeseries,
} from "../types/reports";

// Role-scoped playback + revenue reports (/analytics/reports/*). The API
// derives scope (own campaigns / own screens) from the caller's role.
function useReportQuery<T>(key: unknown[], path: string, filters: ReportFilters, extra?: Record<string, string | undefined>) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["reports", ...key, filters, extra],
    queryFn: () => apiGet<T>(`/analytics/reports/${path}?${buildReportQuery(filters, extra)}`, getAccessToken()),
    enabled: hasAccessToken && isReportQueryable(filters),
    placeholderData: keepPreviousData,
  });
}

export const usePlaysSummaryQuery = (f: ReportFilters) => useReportQuery<PlaysSummary>(["plays", "summary"], "summary", f);

export const usePlaysTimeseriesQuery = (f: ReportFilters, granularity?: ReportGranularity, groupBy?: PlaysGroupBy) =>
  useReportQuery<PlaysTimeseries>(["plays", "timeseries"], "timeseries", f, { granularity, groupBy });

export const usePlaysBreakdownQuery = (f: ReportFilters, groupBy: PlaysGroupBy) =>
  useReportQuery<PlaysBreakdown>(["plays", "breakdown"], "breakdown", f, { groupBy });

export const usePlaysHeatmapQuery = (f: ReportFilters) =>
  useReportQuery<PlaysHeatmap>(["plays", "heatmap"], "heatmap", { ...f, range: "30d", from: undefined, to: undefined });

export function useReportFilterOptionsQuery() {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["reports", "filters"],
    queryFn: () => apiGet<ReportFilterOptions>("/analytics/reports/filters?range=30d", getAccessToken()),
    enabled: hasAccessToken,
    staleTime: 5 * 60_000,
  });
}

export const useRevenueSummaryQuery = (f: ReportFilters) => useReportQuery<RevenueSummary>(["revenue", "summary"], "revenue/summary", f);

export const useRevenueTimeseriesQuery = (f: ReportFilters, granularity?: ReportGranularity, groupBy?: RevenueGroupBy) =>
  useReportQuery<RevenueTimeseries>(["revenue", "timeseries"], "revenue/timeseries", f, { granularity, groupBy });

export const useRevenueBreakdownQuery = (f: ReportFilters, groupBy: RevenueGroupBy) =>
  useReportQuery<RevenueBreakdown>(["revenue", "breakdown"], "revenue/breakdown", f, { groupBy });

// Path builders for file exports (the app downloads these with its own file API).
export const playsExportPath = (f: ReportFilters, groupBy: PlaysGroupBy, format: "csv" | "xlsx" | "pdf") =>
  `/analytics/reports/export?${buildReportQuery(f, { groupBy, format })}`;
export const revenueExportPath = (f: ReportFilters, groupBy: RevenueGroupBy, format: "csv" | "xlsx" | "pdf") =>
  `/analytics/reports/revenue/export?${buildReportQuery(f, { groupBy, format })}`;
