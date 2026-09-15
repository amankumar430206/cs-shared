// Types mirroring cs-api's modules/analytics responses.

export interface AdvertiserAnalytics {
  kpis: {
    activeCampaigns: number;
    totalCampaigns: number;
    totalSpend: number;
    activeScreens: number;
  };
  spendTrend: { date: string; amount: number }[];
  campaignsByStatus: { status: string; count: number }[];
  campaignTimeline: {
    id: string;
    name: string;
    status: string;
    startDate: string;
    endDate: string;
    totalBudget: number;
    screenCount: number;
  }[];
  screenPerformance: {
    screenId: string;
    screenName: string;
    city: string;
    estimatedDailyImpressions: number | null;
    bookingCount: number;
    playbackCount: number;
    totalPlaybackSeconds: number;
  }[];
}

export interface PartnerAnalytics {
  kpis: {
    activeScreens: number;
    totalCampaigns: number;
    avgHealthScore: number;
    lifetimeRevenue: number;
  };
  revenue: { daily: number; weekly: number; monthly: number; lifetime: number };
  averageMonthlyEarnings: number;
  revenueTrend: { date: string; amount: number }[];
  bookingFunnel: { status: string; count: number }[];
}

export interface ScreenAnalytics {
  screenId: string;
  screenName: string;
  playbackTrend: { date: string; plays: number }[];
  playbackByStatus: { status: string; count: number }[];
  playbackSuccessRate: number;
  uptimeTrend: { date: string; uptimePercent: number }[];
  avgUptimePercent: number;
  revenueTrend: { date: string; amount: number }[];
  totalRevenue: number;
}

export interface CampaignLocation {
  city: string;
  state: string;
  screenCount: number;
}

export interface CampaignScreenStat {
  screenId: string;
  screenName: string;
  city: string;
  state: string;
  estimatedDailyImpressions: number;
  live: boolean;
  playCount: number;
  completedCount: number;
  successRate: number;
}

export interface CampaignAnalytics {
  campaignId: string;
  name: string;
  status: string;
  startDate: string;
  endDate: string;
  durationDays: number;
  completionPercent: number;
  activeScreens: number;
  liveScreens: number;
  estimatedDailyViews: number;
  locations: CampaignLocation[];
  screens: CampaignScreenStat[];
  budget: number;
  budgetUtilized: number;
  budgetUtilizationPercent: number;
  playback: {
    total: number;
    completed: number;
    successRate: number;
    byStatus: { status: string; count: number }[];
  };
}

export interface CampaignTrend {
  days: { date: string; plays: number }[];
  /** null until the campaign has run 14+ days — not enough history yet for two non-overlapping 7-day windows. */
  periodComparison: { last7Days: number; previous7Days: number; percentChange: number } | null;
}

export interface AdminOverview {
  totalAdvertisers: number;
  totalPartners: number;
  totalActiveScreens: number;
  activeCampaigns: number;
  onlineScreens: number;
  signupGrowth: { month: string; role: string; count: number }[];
}

export type RevenueGranularity = "daily" | "weekly" | "monthly" | "annual";

export interface AdminRevenue {
  totalRevenue: number;
  totalCommission: number;
  pendingRevenue: number;
  totalPayouts: number;
  series: { period: string; amount: number }[];
}

export interface GeographicRow {
  state: string;
  screenCount: number;
  revenue: number;
}

export interface RefundTrend {
  trend: { date: string; amount: number }[];
  totalRefunded: number;
}

// Admin "Complete Accounting Stats" (Financial Engine Report D) — every
// split line item aggregated across confirmed bookings. See cs-api's
// docs/FINANCIAL_ENGINE_PLAN.md and modules/analytics/analytics.service.js's
// getAdminFinance for how each figure is derived.
export interface AdminFinance {
  bookingCount: number;
  gmv: number;
  totalAdPlatformFee: number;
  totalGstCollected: number;
  totalCollectedFromAd: number;
  totalPgDeduction: number;
  totalSoCommission: number;
  totalSoGrossSettlement: number;
  totalTds: number;
  totalGstTcs: number;
  totalSoNetPayout: number;
  totalCsNetProfit: number;
  /** Derived: totalGstCollected + totalTds + totalGstTcs. */
  totalTaxRemitted: number;
  /** totalCsNetProfit / gmv * 100. */
  platformYieldPercent: number;
  /** (gmv - totalSoGrossSettlement + totalAdPlatformFee) / totalCollectedFromAd * 100. */
  effectiveTakeRatePercent: number;
  series: { period: string; totalCollectedFromAd: number; csNetProfit: number }[];
}

// Tax Ledger tab (Accounting hub) — the raw append-only compliance ledger
// itself (cs-api's tax_ledger_entries, written once per booking on payment
// success), not just AdminFinance's aggregate totals. Every entry always
// has a booking, so campaign/advertiser/screen context is always present.
export const TAX_LEDGER_ENTRY_TYPES = ["OUTPUT_GST", "TDS_194O", "GST_TCS"] as const;
export type TaxLedgerEntryType = (typeof TAX_LEDGER_ENTRY_TYPES)[number];

export interface TaxLedgerEntry {
  id: string;
  entryType: TaxLedgerEntryType;
  amount: number;
  createdAt: string;
  campaignId: string;
  campaignName: string;
  advertiserBusinessName: string;
  screenName: string | null;
  screenPartnerId: string | null;
}

export interface TaxLedgerTotals {
  outputGst: number;
  tds194o: number;
  gstTcs: number;
}

export interface AdminTaxLedger {
  rows: TaxLedgerEntry[];
  meta: { page: number; limit: number; total: number };
  totals: TaxLedgerTotals;
}

export interface TaxLedgerFilters {
  startDate?: string;
  endDate?: string;
  entryType?: TaxLedgerEntryType;
}
