import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiGet, apiPost, apiUpload } from "../api/client";
import { getAccessToken, useHasSession } from "../api/session";
import type {
  CampaignProofRequest,
  ProofRequest,
  ProofRequestStatus,
  ProofRequestSummary,
  ScreenLiveCampaign,
} from "../types/proofRequests";
import type { UploadFile } from "./useKyc";

// Everything a request touches: the partner picker, the advertiser timeline and the
// home queue/counts. Invalidate them together after any write.
const useInvalidateProofRequests = () => {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: ["proof-requests"] });
};

export function useProofRequestSummaryQuery() {
  const enabled = useHasSession();
  return useQuery({
    queryKey: ["proof-requests", "summary"],
    queryFn: () => apiGet<ProofRequestSummary>("/proof-requests/summary", getAccessToken()),
    enabled,
    refetchInterval: 60_000,
  });
}

export function useMyProofRequestsQuery(status?: ProofRequestStatus) {
  const enabled = useHasSession();
  return useQuery({
    queryKey: ["proof-requests", "mine", status ?? "all"],
    queryFn: () => apiGet<ProofRequest[]>(`/proof-requests/mine${status ? `?status=${status}` : ""}`, getAccessToken()),
    enabled,
  });
}

export function useScreenLiveCampaignsQuery(screenId: string) {
  const enabled = useHasSession();
  return useQuery({
    queryKey: ["proof-requests", "screen", screenId],
    queryFn: () => apiGet<ScreenLiveCampaign[]>(`/proof-requests/screens/${screenId}`, getAccessToken()),
    enabled: enabled && !!screenId,
  });
}

export function useCampaignProofRequestsQuery(campaignId: string) {
  const enabled = useHasSession();
  return useQuery({
    queryKey: ["proof-requests", "campaign", campaignId],
    queryFn: () => apiGet<CampaignProofRequest[]>(`/proof-requests/campaigns/${campaignId}`, getAccessToken()),
    enabled: enabled && !!campaignId,
  });
}

export function useRequestProofMutation() {
  const invalidate = useInvalidateProofRequests();
  return useMutation({
    mutationFn: (input: { campaignId: string; screenId: string; note?: string }) =>
      apiPost<ProofRequest>("/proof-requests", { ...input, note: input.note || undefined }, getAccessToken()),
    onSuccess: invalidate,
  });
}

// Answer an existing request, or (no requestId) volunteer proof for a live campaign.
export function useSubmitProofMutation(screenId: string) {
  const invalidate = useInvalidateProofRequests();
  return useMutation({
    mutationFn: ({ requestId, campaignId, file, caption }: { requestId?: string; campaignId: string; file: UploadFile; caption?: string }) => {
      const formData = new FormData();
      // React Native's FormData accepts the { uri, name, type } shape at runtime; DOM typings only know Blob.
      formData.append("file", file as Blob);
      if (caption) formData.append("caption", caption);
      return apiUpload<ProofRequest>(
        requestId ? `/proof-requests/${requestId}/submit` : `/proof-requests/screens/${screenId}/campaigns/${campaignId}/submit`,
        formData,
        getAccessToken()
      );
    },
    onSuccess: invalidate,
  });
}
