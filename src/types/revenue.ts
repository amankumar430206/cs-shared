// Types mirroring cs-api's modules/revenue responses.

// Mirrors cs-api's revenue.validators.js SETTLEMENT_CADENCES.
export const SETTLEMENT_CADENCES = [
  {
    value: "MONTHLY",
    label: "Monthly",
    // The fee percentages themselves are admin-configurable (fee_configs), so
    // these describe the tradeoff without hardcoding numbers that could drift.
    hint: "Paid out once at month end. Lower settlement fee.",
  },
  {
    value: "DAILY",
    label: "Daily",
    hint: "Credited to your wallet every day. Higher settlement fee.",
  },
] as const;
export type SettlementCadence = (typeof SETTLEMENT_CADENCES)[number]["value"];

export type WalletTransactionType = "SETTLEMENT" | "PAYOUT" | "ADJUSTMENT";

export interface WalletTransaction {
  id: string;
  type: WalletTransactionType;
  /** Signed — positive credit (settlement), negative debit (payout). */
  amount: number;
  balanceAfter: number;
  /** Only meaningful on a SETTLEMENT row. */
  periodStart: string | null;
  periodEnd: string | null;
  description: string | null;
  createdAt: string;
}

export interface Wallet {
  balance: number;
  settlementCadence: SettlementCadence;
  transactions: {
    rows: WalletTransaction[];
    meta: { page: number; limit: number; total: number };
  };
}

export interface DailyCollection {
  date: string;
  /** Post-commission (Financial Engine's SO_GROSS_SETTLEMENT), not the pre-commission listed price. */
  grossAmount: number;
  tdsAmount: number;
  gstTcsAmount: number;
  /** grossAmount - tdsAmount - gstTcsAmount, before the settlement-cadence fee below. */
  soNetCashPayout: number;
  settlementFeeAmount: number;
  netAmount: number;
  settled: boolean;
}

export interface TodayCollection {
  date: string;
  grossAmount: number;
  tdsAmount: number;
  gstTcsAmount: number;
  soNetCashPayout: number;
  settlementFeeAmount: number;
  netAmount: number;
  settlementCadence: SettlementCadence;
  /** DAILY cadence only — MONTHLY just accrues until month end. */
  willSettleToday: boolean;
}

export interface FeeConfig {
  id: string;
  transactionFeePercent: number;
  dailySettlementFeePercent: number;
  monthlySettlementFeePercent: number;
  // Financial Engine rates (docs/FINANCIAL_ENGINE_PLAN.md, cs-api's
  // financialEngine.service.js) — what modules/pricing actually reads for
  // every new booking estimate/reservation, distinct from the three legacy
  // fields above (which now only drive the settlement-cadence fee).
  adPlatformFeePercent: number;
  gstRatePercent: number;
  pgBaseFeePercent: number;
  pgGstOnFeePercent: number;
  tds194oPercent: number;
  gstTcsPercent: number;
  showPlatformCommission: boolean;
  showTaxBreakdown: boolean;
  showGrossAmount: boolean;
  showSettlementFee: boolean;
  updatedAt: string;
}

/** The subset of FeeConfig any authenticated advertiser/partner can read —
 * just what to show/hide, never the actual fee percentages. */
export interface DisplaySettings {
  showPlatformCommission: boolean;
  showTaxBreakdown: boolean;
  showGrossAmount: boolean;
  showSettlementFee: boolean;
}

/** Admin view — one row per partner wallet holding a balance. */
export interface AdminWallet {
  walletId: string;
  screenPartnerId: string;
  partnerName: string;
  partnerMobile: string;
  settlementCadence: SettlementCadence;
  balance: number;
  updatedAt: string;
}

/** Admin view — history of what's been credited, across all partners. */
export interface AdminSettlement {
  id: string;
  screenPartnerId: string;
  walletId: string;
  partnerName: string;
  /** Only populated on a single-settlement detail fetch, not the list. */
  partnerMobile?: string;
  partnerEmail?: string;
  amount: number;
  balanceAfter: number;
  periodStart: string | null;
  periodEnd: string | null;
  description: string | null;
  createdAt: string;
}

export interface AdminSettlementFilters {
  dateFrom?: string;
  dateTo?: string;
  search?: string;
}

export type WithdrawalStatus = "PENDING" | "APPROVED" | "REJECTED" | "CANCELLED";

export const REPORT_FREQUENCIES = [
  { value: "DAILY", label: "Daily" },
  { value: "WEEKLY", label: "Weekly" },
  { value: "MONTHLY", label: "Monthly" },
] as const;
export type ReportFrequency = (typeof REPORT_FREQUENCIES)[number]["value"];

export const REPORT_FORMATS = [
  { value: "csv", label: "CSV" },
  { value: "xlsx", label: "Excel" },
] as const;
export type ReportFormat = (typeof REPORT_FORMATS)[number]["value"];

// Delivery itself is stubbed (see cs-api's revenue.service.js
// runScheduledReportDelivery) — an in-app notification with a download
// link, no real email/SMS provider. lastSentAt null means it's never
// fired yet.
export interface ScheduledReport {
  id: string;
  reportType: "REVENUE";
  frequency: ReportFrequency;
  format: ReportFormat;
  active: boolean;
  lastSentAt: string | null;
  createdAt: string;
}

export interface WithdrawalRequest {
  id: string;
  walletId: string;
  amount: number;
  status: WithdrawalStatus;
  rejectionReason: string | null;
  reviewedAt: string | null;
  createdAt: string;
}

/** Admin worklist row — a withdrawal request joined to who requested it. */
export interface AdminWithdrawalRequest extends WithdrawalRequest {
  screenPartnerId: string;
  partnerName: string;
  partnerMobile: string;
}
