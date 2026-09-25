import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiGet, apiGetPaginated, apiPost } from "../api/client";
import { getAccessToken, useHasSession } from "../api/session";
import type { FrequencyLevel } from "../types/checkout";
import type { Quotation, QuotationDetail } from "../types/quotations";

// The advertiser half of cs-web's hooks/useQuotations.ts — the quotation negotiation cycle
// (cs-api modules/quotations). The admin queue/actions stay web-only.
//
// Every mutation refreshes the one quotation it touched, both list views, and — since paying moves
// bookings, payments and the campaign — those caches too.

function buildQuery(params: Record<string, string | number | undefined>) {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== "") query.set(key, String(value));
  }
  const qs = query.toString();
  return qs ? `?${qs}` : "";
}

function useInvalidateQuotation() {
  const queryClient = useQueryClient();
  return (q: QuotationDetail) => {
    queryClient.setQueryData(["quotations", "campaign", q.campaignId], q);
    queryClient.setQueryData(["quotations", "detail", q.id], q);
    queryClient.invalidateQueries({ queryKey: ["quotations", "mine"] });
    queryClient.invalidateQueries({ queryKey: ["campaigns"] });
    queryClient.invalidateQueries({ queryKey: ["bookings", "campaign", q.campaignId] });
    queryClient.invalidateQueries({ queryKey: ["payments"] });
  };
}

/** The campaign's open quotation, or null when it has never had one. */
export function useCampaignQuotationQuery(campaignId: string | undefined) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["quotations", "campaign", campaignId],
    queryFn: () => apiGet<QuotationDetail | null>(`/quotations/campaigns/${campaignId}`, getAccessToken()),
    enabled: hasAccessToken && !!campaignId,
  });
}

export function useMyQuotationQuery(id: string) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["quotations", "detail", id],
    queryFn: () => apiGet<QuotationDetail>(`/quotations/mine/${id}`, getAccessToken()),
    enabled: hasAccessToken && !!id,
  });
}

export function useMyQuotationsQuery(page: number, filters: { status?: string; search?: string } = {}) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["quotations", "mine", page, filters],
    queryFn: () => apiGetPaginated<Quotation>(`/quotations/mine${buildQuery({ page, ...filters })}`, getAccessToken()),
    enabled: hasAccessToken,
  });
}

export interface SubmitQuotationInput {
  campaignId: string;
  screenIds: string[];
  startDate: string;
  endDate: string;
  frequencyLevel?: FrequencyLevel;
  customShares?: number;
  proposedAmount?: number | null;
  note?: string;
}

/** Submit a quotation, or reopen the existing one for revision. */
export function useSubmitQuotationMutation() {
  const onDone = useInvalidateQuotation();
  return useMutation({
    mutationFn: ({ campaignId, ...body }: SubmitQuotationInput) =>
      apiPost<QuotationDetail>(`/quotations/campaigns/${campaignId}`, body, getAccessToken()),
    onSuccess: onDone,
  });
}

export function useAcceptQuotationMutation() {
  const onDone = useInvalidateQuotation();
  return useMutation({
    mutationFn: ({ campaignId }: { campaignId: string }) =>
      apiPost<QuotationDetail>(`/quotations/campaigns/${campaignId}/accept`, {}, getAccessToken()),
    onSuccess: onDone,
  });
}

/**
 * "Submit payment" on an APPROVED quotation: cs-api re-holds the quoted screens and raises a payment
 * request priced at the negotiated amount, which an admin then settles — no online charge here.
 */
export function usePayQuotationMutation() {
  const onDone = useInvalidateQuotation();
  return useMutation({
    mutationFn: ({ campaignId, ...body }: { campaignId: string; screenIds: string[]; startDate: string; endDate: string }) =>
      apiPost<QuotationDetail>(`/quotations/campaigns/${campaignId}/pay`, body, getAccessToken()),
    onSuccess: onDone,
  });
}
