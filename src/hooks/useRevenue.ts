import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiDelete, apiGet, apiGetPaginated, apiPatch, apiPost, apiPut } from "../api/client";
import type {
  AdminSettlement,
  AdminSettlementFilters,
  AdminWallet,
  AdminWithdrawalRequest,
  DailyCollection,
  DisplaySettings,
  FeeConfig,
  ReportFormat,
  ReportFrequency,
  ScheduledReport,
  SettlementCadence,
  TodayCollection,
  Wallet,
  WithdrawalRequest,
} from "../types/revenue";
import { getAccessToken, session, useHasSession, useSession } from "../api/session";

function buildQuery(params: Record<string, string | number | undefined>) {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== "") query.set(key, String(value));
  }
  const qs = query.toString();
  return qs ? `?${qs}` : "";
}

// --- Screen partner (own earnings) ---------------------------------------

export function useWalletQuery(page: number) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["revenue", "wallet", page],
    queryFn: () => apiGet<Wallet>(`/revenue/wallet?page=${page}`, getAccessToken()),
    enabled: hasAccessToken,
  });
}

export function useTodayCollectionQuery() {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["revenue", "collections", "today"],
    queryFn: () => apiGet<TodayCollection>("/revenue/collections/today", getAccessToken()),
    enabled: hasAccessToken,
  });
}

// Defaults to the backend's own last-30-days window when no range is passed.
export function useDailyCollectionsQuery(range?: { startDate?: string; endDate?: string }) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["revenue", "collections", range ?? null],
    queryFn: () => {
      const query = new URLSearchParams();
      if (range?.startDate) query.set("startDate", range.startDate);
      if (range?.endDate) query.set("endDate", range.endDate);
      const qs = query.toString();
      return apiGet<DailyCollection[]>(
        `/revenue/collections${qs ? `?${qs}` : ""}`,
        getAccessToken()
      );
    },
    enabled: hasAccessToken,
  });
}

export function useSetSettlementCadenceMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (cadence: SettlementCadence) =>
      apiPatch<{ settlementCadence: SettlementCadence }>(
        "/revenue/settlement-preference",
        { cadence },
        getAccessToken()
      ),
    onSuccess: () => {
      // Cadence changes what today's fee/net figures look like, so both the
      // wallet header and the today/history reads need re-fetching.
      queryClient.invalidateQueries({ queryKey: ["revenue"] });
    },
  });
}

export function useMyWithdrawalsQuery(page: number) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["revenue", "withdrawals", page],
    queryFn: () => apiGetPaginated<WithdrawalRequest>(`/revenue/withdrawals?page=${page}`, getAccessToken()),
    enabled: hasAccessToken,
  });
}

export function useCreateWithdrawalMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (amount: number) =>
      apiPost<WithdrawalRequest>("/revenue/withdrawals", { amount }, getAccessToken()),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["revenue", "withdrawals"] }),
  });
}

export function useCancelWithdrawalMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (requestId: string) =>
      apiDelete<WithdrawalRequest>(`/revenue/withdrawals/${requestId}`, getAccessToken()),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["revenue", "withdrawals"] }),
  });
}

// Any authenticated role — drives whether cs-web's own price-preview
// (ScreenReservationBuilder) and earnings breakdown (the Earnings page)
// show each toggleable line item. Long staleTime: an admin changing this
// is rare and every advertiser/partner reads it on nearly every page.
export function useDisplaySettingsQuery() {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["revenue", "display-settings"],
    queryFn: () => apiGet<DisplaySettings>("/revenue/display-settings", getAccessToken()),
    enabled: hasAccessToken,
    staleTime: 5 * 60 * 1000,
  });
}

// --- Admin ---------------------------------------------------------------

export function useFeeConfigQuery() {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["revenue", "fee-config"],
    queryFn: () => apiGet<FeeConfig>("/revenue/fee-config", getAccessToken()),
    enabled: hasAccessToken,
  });
}

export interface UpdateFeeConfigInput {
  transactionFeePercent?: number;
  dailySettlementFeePercent?: number;
  monthlySettlementFeePercent?: number;
  adPlatformFeePercent?: number;
  gstRatePercent?: number;
  pgBaseFeePercent?: number;
  pgGstOnFeePercent?: number;
  tds194oPercent?: number;
  gstTcsPercent?: number;
  showPlatformCommission?: boolean;
  showTaxBreakdown?: boolean;
  showGrossAmount?: boolean;
  showSettlementFee?: boolean;
}

export function useUpdateFeeConfigMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: UpdateFeeConfigInput) =>
      apiPut<FeeConfig>("/revenue/fee-config", input, getAccessToken()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["revenue", "fee-config"] });
      queryClient.invalidateQueries({ queryKey: ["revenue", "display-settings"] });
    },
  });
}

export function useAdminWalletsQuery(page: number, search?: string) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["revenue", "admin", "wallets", page, search],
    queryFn: () => apiGetPaginated<AdminWallet>(`/revenue/wallets${buildQuery({ page, search })}`, getAccessToken()),
    enabled: hasAccessToken,
  });
}

export function useAdminSettlementsQuery(page: number, filters: AdminSettlementFilters = {}) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["revenue", "admin", "settlements", page, filters],
    queryFn: () =>
      apiGetPaginated<AdminSettlement>(`/revenue/settlements${buildQuery({ page, ...filters })}`, getAccessToken()),
    enabled: hasAccessToken,
  });
}

export function useAdminSettlementDetailQuery(settlementId: string) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["revenue", "admin", "settlements", "detail", settlementId],
    queryFn: () => apiGet<AdminSettlement>(`/revenue/settlements/${settlementId}`, getAccessToken()),
    enabled: hasAccessToken && !!settlementId,
  });
}

export interface RecordPayoutInput {
  walletId: string;
  amount: number;
  note?: string;
}

export function useRecordPayoutMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ walletId, amount, note }: RecordPayoutInput) =>
      apiPost<{ id: string; amount: number; balanceAfter: number }>(
        `/revenue/wallets/${walletId}/payouts`,
        { amount, ...(note ? { note } : {}) },
        getAccessToken()
      ),
    onSuccess: () => {
      // A payout debits the balance, so the worklist and the settlement
      // history both change.
      queryClient.invalidateQueries({ queryKey: ["revenue", "admin"] });
    },
  });
}

export function usePendingWithdrawalsQuery(page: number, options: { enabled?: boolean } = {}) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["revenue", "admin", "withdrawals", page],
    queryFn: () =>
      apiGetPaginated<AdminWithdrawalRequest>(`/revenue/withdrawals/pending?page=${page}`, getAccessToken()),
    enabled: hasAccessToken && (options.enabled ?? true),
  });
}

export function useApproveWithdrawalMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (requestId: string) =>
      apiPost<WithdrawalRequest>(`/revenue/withdrawals/${requestId}/approve`, undefined, getAccessToken()),
    onSuccess: () => {
      // Approving pays out immediately, so both the withdrawal worklist and
      // the wallet balances/settlement history change.
      queryClient.invalidateQueries({ queryKey: ["revenue", "admin"] });
    },
  });
}

export function useRejectWithdrawalMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ requestId, reason }: { requestId: string; reason: string }) =>
      apiPost<WithdrawalRequest>(`/revenue/withdrawals/${requestId}/reject`, { reason }, getAccessToken()),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["revenue", "admin", "withdrawals"] }),
  });
}

// --- Scheduled revenue report delivery -----------------------------------
// Delivery is stubbed (an in-app notification with a download link, no real
// email/SMS provider) — see cs-api's revenue.service.js runScheduledReportDelivery.

export function useScheduledReportsQuery() {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["revenue", "scheduled-reports"],
    queryFn: () => apiGet<ScheduledReport[]>("/revenue/scheduled-reports", getAccessToken()),
    enabled: hasAccessToken,
  });
}

export function useCreateScheduledReportMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ frequency, format }: { frequency: ReportFrequency; format: ReportFormat }) =>
      apiPost<ScheduledReport>("/revenue/scheduled-reports", { frequency, format }, getAccessToken()),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["revenue", "scheduled-reports"] }),
  });
}

export function useDeleteScheduledReportMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiDelete(`/revenue/scheduled-reports/${id}`, getAccessToken()),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["revenue", "scheduled-reports"] }),
  });
}
