// Ported from cs-web src/hooks/useCheckout.ts — keep in sync.
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiDelete, apiGet, apiPatch, apiPost, apiPut, apiUpload } from "../api/client";
import type { Campaign, CampaignDocument, CampaignDocumentType } from "../types/campaigns";
import type { CampaignQuote, CheckoutResult, DeliveryConfig, PaymentMethod, PaymentsConfig, QuoteInput } from "../types/checkout";
import type { UploadFile } from "./useKyc";
import { getAccessToken, useHasSession } from "../api/session";

// Price + delivery for the builder's summary bar and review step. Keeps the
// previous numbers on screen while a new selection re-quotes, so the bar
// doesn't flicker to empty on every tick.
export function useCampaignQuoteQuery(input: QuoteInput | null) {
  return useQuery({
    queryKey: ["pricing", "quote", input],
    queryFn: () => apiPost<CampaignQuote>("/pricing/estimate", input, getAccessToken()),
    enabled: !!input && input.screenIds.length > 0 && !!input.startDate && !!input.endDate,
    placeholderData: keepPreviousData,
  });
}

export function useDeliveryConfigQuery() {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["settings", "delivery"],
    queryFn: () => apiGet<DeliveryConfig>("/settings/delivery", getAccessToken()),
    enabled: hasAccessToken,
    staleTime: 10 * 60_000,
  });
}

export function usePaymentsConfigQuery() {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["settings", "payments"],
    queryFn: () => apiGet<PaymentsConfig>("/settings/payments", getAccessToken()),
    enabled: hasAccessToken,
  });
}

/** General draft edit — the builder saves each step as the advertiser moves on. */
export function useUpdateCampaignMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ campaignId, values }: { campaignId: string; values: Record<string, unknown> }) =>
      apiPatch<Campaign>(`/campaigns/${campaignId}`, values, getAccessToken()),
    onSuccess: (campaign) => {
      queryClient.setQueryData(["campaigns", campaign.id], (old: Campaign | undefined) => ({ ...old, ...campaign }));
      queryClient.invalidateQueries({ queryKey: ["campaigns", "list"] });
    },
  });
}

/** "Replace ad" before paying — cs-api only allows it for an unreviewed ad on an unpaid campaign. */
export function useRemoveCreativeMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ creativeId }: { creativeId: string; campaignId: string }) =>
      apiDelete(`/creatives/${creativeId}`, getAccessToken()),
    onSuccess: (_data, { campaignId }) => {
      queryClient.invalidateQueries({ queryKey: ["creatives", "campaign", campaignId] });
    },
  });
}

/** Attach (or replace) a campaign's quotation / receipt — high-value flow. */
export function useUploadCampaignDocumentMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ campaignId, type, file }: { campaignId: string; type: CampaignDocumentType; file: UploadFile }) => {
      const formData = new FormData();
      // React Native's FormData accepts the { uri, name, type } shape at runtime; DOM typings only know Blob.
      formData.append("file", file as Blob);
      return apiUpload<CampaignDocument>(`/campaigns/${campaignId}/documents/${type}`, formData, getAccessToken());
    },
    onSuccess: (_data, { campaignId }) => queryClient.invalidateQueries({ queryKey: ["campaigns", campaignId] }),
  });
}

export function useRemoveCampaignDocumentMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ campaignId, type }: { campaignId: string; type: CampaignDocumentType }) =>
      apiDelete(`/campaigns/${campaignId}/documents/${type}`, getAccessToken()),
    onSuccess: (_data, { campaignId }) => queryClient.invalidateQueries({ queryKey: ["campaigns", campaignId] }),
  });
}

/** Admin: set the approval switch and the quotation threshold. */
export function useUpdatePaymentsConfigMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (patch: Partial<Pick<PaymentsConfig, "requireAdminApproval" | "quotationRequiredAbove">>) =>
      apiPut<PaymentsConfig>("/settings/payments", patch, getAccessToken()),
    onSuccess: (config) => queryClient.setQueryData(["settings", "payments"], config),
  });
}

export function useCheckoutMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      campaignId,
      ...body
    }: {
      campaignId: string;
      screenIds: string[];
      startDate: string;
      endDate: string;
      paymentMethod: PaymentMethod;
    }) => apiPost<CheckoutResult>(`/checkout/campaigns/${campaignId}`, body, getAccessToken()),
    onSuccess: (_data, { campaignId }) => {
      queryClient.invalidateQueries({ queryKey: ["campaigns"] });
      queryClient.invalidateQueries({ queryKey: ["bookings", "campaign", campaignId] });
      queryClient.invalidateQueries({ queryKey: ["payments"] });
      queryClient.invalidateQueries({ queryKey: ["wallet"] });
    },
  });
}
