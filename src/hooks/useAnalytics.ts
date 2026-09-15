import { useQuery } from "@tanstack/react-query";
import { apiGet } from "../api/client";
import type {
  AdminFinance,
  AdminOverview,
  AdminRevenue,
  AdminTaxLedger,
  AdvertiserAnalytics,
  CampaignAnalytics,
  CampaignTrend,
  GeographicRow,
  PartnerAnalytics,
  RefundTrend,
  RevenueGranularity,
  ScreenAnalytics,
  TaxLedgerFilters,
} from "../types/analytics";
import { getAccessToken, session, useHasSession, useSession } from "../api/session";

export function useAdvertiserAnalyticsQuery() {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["analytics", "advertiser"],
    queryFn: () => apiGet<AdvertiserAnalytics>("/analytics/advertiser", getAccessToken()),
    enabled: hasAccessToken,
  });
}

export function usePartnerAnalyticsQuery() {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["analytics", "partner"],
    queryFn: () => apiGet<PartnerAnalytics>("/analytics/partner", getAccessToken()),
    enabled: hasAccessToken,
  });
}

export function useCampaignAnalyticsQuery(campaignId: string) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["analytics", "campaign", campaignId],
    queryFn: () => apiGet<CampaignAnalytics>(`/analytics/campaign/${campaignId}`, getAccessToken()),
    enabled: hasAccessToken,
  });
}

export function useCampaignTrendQuery(campaignId: string) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["analytics", "campaign", campaignId, "trend"],
    queryFn: () => apiGet<CampaignTrend>(`/analytics/campaign/${campaignId}/trend`, getAccessToken()),
    enabled: hasAccessToken,
  });
}

export function useScreenAnalyticsQuery(screenId: string) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["analytics", "screen", screenId],
    queryFn: () => apiGet<ScreenAnalytics>(`/analytics/screen/${screenId}`, getAccessToken()),
    enabled: hasAccessToken && !!screenId,
  });
}

export function useAdminOverviewQuery() {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["analytics", "admin", "overview"],
    queryFn: () => apiGet<AdminOverview>("/analytics/admin/overview", getAccessToken()),
    enabled: hasAccessToken,
  });
}

export function useAdminRevenueQuery(granularity: RevenueGranularity) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["analytics", "admin", "revenue", granularity],
    queryFn: () => apiGet<AdminRevenue>(`/analytics/admin/revenue?granularity=${granularity}`, getAccessToken()),
    enabled: hasAccessToken,
  });
}

export function useAdminGeographicQuery() {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["analytics", "admin", "geographic"],
    queryFn: () => apiGet<GeographicRow[]>("/analytics/admin/geographic", getAccessToken()),
    enabled: hasAccessToken,
  });
}

export function useAdminBookingFunnelQuery() {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["analytics", "admin", "booking-funnel"],
    queryFn: () => apiGet<{ status: string; count: number }[]>("/analytics/admin/booking-funnel", getAccessToken()),
    enabled: hasAccessToken,
  });
}

export function useAdminRefundTrendQuery() {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["analytics", "admin", "refund-trend"],
    queryFn: () => apiGet<RefundTrend>("/analytics/admin/refund-trend", getAccessToken()),
    enabled: hasAccessToken,
  });
}


export function useAdminFinanceQuery(granularity: RevenueGranularity) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["analytics", "admin", "finance", granularity],
    queryFn: () => apiGet<AdminFinance>(`/analytics/admin/finance?granularity=${granularity}`, getAccessToken()),
    enabled: hasAccessToken,
  });
}


function buildTaxLedgerQuery(params: TaxLedgerFilters & { page?: number; format?: string }) {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== "") query.set(key, String(value));
  }
  const qs = query.toString();
  return qs ? `?${qs}` : "";
}

export function useAdminTaxLedgerQuery(page: number, filters: TaxLedgerFilters) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["analytics", "admin", "tax-ledger", page, filters],
    queryFn: () =>
      apiGet<AdminTaxLedger>(`/analytics/admin/tax-ledger${buildTaxLedgerQuery({ page, ...filters })}`, getAccessToken()),
    enabled: hasAccessToken,
  });
}

