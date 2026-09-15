import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiGet, apiGetPaginated, apiPost } from "../api/client";
import type { Creative, LiveScreen, PendingCreative } from "../types/creatives";
import { getAccessToken, session, useHasSession, useSession } from "../api/session";

function buildQuery(params: Record<string, string | number | undefined>) {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== "") query.set(key, String(value));
  }
  const qs = query.toString();
  return qs ? `?${qs}` : "";
}

export function useCampaignCreativesQuery(campaignId: string) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["creatives", "campaign", campaignId],
    queryFn: () => apiGet<Creative[]>(`/creatives/campaigns/${campaignId}`, getAccessToken()),
    enabled: hasAccessToken && !!campaignId,
  });
}

export function useMyCreativesQuery() {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["creatives", "mine"],
    queryFn: () => apiGet<PendingCreative[]>("/creatives/mine", getAccessToken()),
    enabled: hasAccessToken,
  });
}

export function useLiveScreensQuery() {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["creatives", "live-screens"],
    queryFn: () => apiGet<LiveScreen[]>("/creatives/live-screens", getAccessToken()),
    enabled: hasAccessToken,
  });
}

export interface PendingCreativesFilters {
  search?: string;
  page?: number;
  [key: string]: string | number | undefined;
}

// Paginated + searchable — the platform-wide review queue, not one
// advertiser's list, so it has no natural ceiling.
export function usePendingCreativesQuery(filters: PendingCreativesFilters, options: { enabled?: boolean } = {}) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["creatives", "pending", filters],
    queryFn: () => apiGetPaginated<PendingCreative>(`/creatives/pending${buildQuery(filters)}`, getAccessToken()),
    enabled: hasAccessToken && (options.enabled ?? true),
  });
}

export function useApproveCreativeMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (creativeId: string) =>
      apiPost<Creative>(`/creatives/${creativeId}/approve`, undefined, getAccessToken()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["creatives", "pending"] });
    },
  });
}

export function useRejectCreativeMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ creativeId, reason }: { creativeId: string; reason: string }) =>
      apiPost<Creative>(`/creatives/${creativeId}/reject`, { reason }, getAccessToken()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["creatives", "pending"] });
    },
  });
}
