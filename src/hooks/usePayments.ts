import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiDelete, apiGet, apiGetPaginated, apiPost } from "../api/client";
import type { BillingFilters, CreateOrderResult, Invoice, InvoiceDetail, Payment, SavedPaymentMethod, SettlementMode } from "../types/payments";
import { getAccessToken, session, useHasSession, useSession } from "../api/session";

function buildQuery(params: Record<string, string | number | undefined>) {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== "") query.set(key, String(value));
  }
  const qs = query.toString();
  return qs ? `?${qs}` : "";
}

export function useMyPaymentsQuery(page: number, filters: BillingFilters = {}) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["payments", "mine", page, filters],
    queryFn: () =>
      apiGetPaginated<Payment>(`/payments/mine${buildQuery({ page, ...filters })}`, getAccessToken()),
    enabled: hasAccessToken,
  });
}

export function usePaymentDetailQuery(paymentId: string) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["payments", "mine", "detail", paymentId],
    queryFn: () => apiGet<Payment>(`/payments/mine/${paymentId}`, getAccessToken()),
    enabled: hasAccessToken && !!paymentId,
  });
}


export function useMyInvoicesQuery(page: number, filters: BillingFilters = {}) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["payments", "invoices", page, filters],
    queryFn: () =>
      apiGetPaginated<Invoice>(`/payments/invoices${buildQuery({ page, ...filters })}`, getAccessToken()),
    enabled: hasAccessToken,
  });
}

export function useInvoiceDetailQuery(invoiceId: string) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["payments", "invoices", "detail", invoiceId],
    queryFn: () => apiGet<InvoiceDetail>(`/payments/invoices/${invoiceId}`, getAccessToken()),
    enabled: hasAccessToken && !!invoiceId,
  });
}


export function usePaymentStatusQuery(campaignId: string) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["payments", "campaign", campaignId],
    queryFn: () => apiGet<Payment>(`/payments/${campaignId}`, getAccessToken()),
    enabled: hasAccessToken && !!campaignId,
    retry: false, // 404 ("no payment yet") is an expected, not transient, response
  });
}

// Admin manual-approval queue — every still-INITIATED payment across all
// advertisers, for admins with campaigns:approve to review and confirm by
// hand when a gateway confirmation never arrived.
export function usePendingPaymentsQuery(page: number, options: { enabled?: boolean } = {}) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["payments", "pending", page],
    queryFn: () => apiGetPaginated<Payment>(`/payments/pending${buildQuery({ page })}`, getAccessToken()),
    enabled: hasAccessToken && (options.enabled ?? true),
  });
}

export interface ApprovePaymentInput {
  paymentId: string;
  settlementMode?: SettlementMode;
  settlementNote?: string;
}

export function useApprovePaymentMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ paymentId, settlementMode, settlementNote }: ApprovePaymentInput) =>
      apiPost<Payment>(
        `/payments/${paymentId}/approve`,
        settlementMode || settlementNote ? { settlementMode, settlementNote } : undefined,
        getAccessToken()
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payments", "pending"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "campaigns"] });
    },
  });
}

// The approval-layer entry point — raises a payment request for a
// PENDING_PAYMENT campaign with no Razorpay call at all, so it works even
// when the gateway isn't configured. Lands in the same admin "pending
// payments" queue as a stuck gateway order.
export function useRaisePaymentRequestMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (campaignId: string) =>
      apiPost<Payment>("/payments/requests", { campaignId }, getAccessToken()),
    onSuccess: (_data, campaignId) => {
      queryClient.invalidateQueries({ queryKey: ["payments", "campaign", campaignId] });
      queryClient.invalidateQueries({ queryKey: ["payments", "pending"] });
    },
  });
}

export interface RejectPaymentInput {
  paymentId: string;
  reason: string;
}

export function useRejectPaymentMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ paymentId, reason }: RejectPaymentInput) =>
      apiPost<Payment>(`/payments/${paymentId}/reject`, { reason }, getAccessToken()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payments", "pending"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "campaigns"] });
    },
  });
}

export function useCreateOrderMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (campaignId: string) =>
      apiPost<CreateOrderResult>("/payments/orders", { campaignId }, getAccessToken()),
    onSuccess: (_data, campaignId) => {
      queryClient.invalidateQueries({ queryKey: ["payments", "campaign", campaignId] });
    },
  });
}

// Billing > Payment Methods — live off Razorpay's own Customer/Token APIs
// (cs-api never stores card/UPI details), so this is always a fresh fetch,
// not something to keep around stale.
export function useSavedPaymentMethodsQuery() {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["payments", "methods"],
    queryFn: () => apiGet<SavedPaymentMethod[]>("/payments/methods", getAccessToken()),
    enabled: hasAccessToken,
  });
}

export function useDeleteSavedPaymentMethodMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (tokenId: string) => apiDelete(`/payments/methods/${tokenId}`, getAccessToken()),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["payments", "methods"] }),
  });
}

interface VerifyPaymentInput {
  campaignId: string;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
}

export function useVerifyPaymentMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: VerifyPaymentInput) =>
      apiPost<Payment>(
        "/payments/verify",
        {
          razorpayOrderId: input.razorpayOrderId,
          razorpayPaymentId: input.razorpayPaymentId,
          razorpaySignature: input.razorpaySignature,
        },
        getAccessToken()
      ),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["payments", "campaign", variables.campaignId] });
      queryClient.invalidateQueries({ queryKey: ["campaigns", variables.campaignId] });
      queryClient.invalidateQueries({ queryKey: ["bookings", "campaign", variables.campaignId] });
    },
  });
}
