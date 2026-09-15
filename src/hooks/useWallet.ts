import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiGet, apiPost } from "../api/client";
import type { CreateTopUpOrderResult, CreditRejectedCreativeResult, PayCampaignFromWalletResult, Wallet } from "../types/wallet";
import { getAccessToken, session, useHasSession, useSession } from "../api/session";

// No true cursor pagination — `limit` grows on "Show more" and each fetch
// just re-requests that many of the most recent transactions. Simpler than
// threading page/meta through for a history list that's rarely more than a
// couple dozen rows deep for most advertisers.
export function useWalletQuery(limit = 20) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["wallet", limit],
    queryFn: () => apiGet<Wallet>(`/wallet?limit=${limit}`, getAccessToken()),
    enabled: hasAccessToken,
  });
}

export function useCreateTopUpOrderMutation() {
  return useMutation({
    mutationFn: (amount: number) => apiPost<CreateTopUpOrderResult>("/wallet/topups", { amount }, getAccessToken()),
  });
}

export function useVerifyTopUpMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: { razorpayOrderId: string; razorpayPaymentId: string; razorpaySignature: string }) =>
      apiPost<Wallet>("/wallet/topups/verify", input, getAccessToken()),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["wallet"] }),
  });
}

export function usePayCampaignFromWalletMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (campaignId: string) =>
      apiPost<PayCampaignFromWalletResult>(`/wallet/campaigns/${campaignId}/pay`, undefined, getAccessToken()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wallet"] });
      queryClient.invalidateQueries({ queryKey: ["campaigns"] });
      queryClient.invalidateQueries({ queryKey: ["payments"] });
    },
  });
}

// The advertiser's alternative to re-uploading after a rejection — credits
// that creative's share of the campaign's payment straight to the wallet,
// no admin review (the rejection itself already was the review). Invalidates
// the campaign's own creatives list too, so CreativesTab's button flips to
// "credited" immediately rather than on the next unrelated refetch.
export function useCreditRejectedCreativeToWalletMutation(campaignId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (creativeId: string) =>
      apiPost<CreditRejectedCreativeResult>(`/wallet/creatives/${creativeId}/credit`, undefined, getAccessToken()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wallet"] });
      queryClient.invalidateQueries({ queryKey: ["creatives", "campaign", campaignId] });
    },
  });
}
