import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiGet, apiGetPaginated, apiPost, apiUpload } from "../api/client";
import type { Creative, LiveScreen, PendingCreative } from "../types/creatives";
import { getAccessToken, session, useHasSession, useSession } from "../api/session";
import type { UploadFile } from "./useKyc";

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

export interface UploadCreativeInput {
  file: UploadFile;
  /** Whole seconds, 1–120. Videos should send their real length. */
  durationSeconds?: number;
  label?: string;
  /** Displayed pixel size as measured on the client — cs-api uses it for video (images are measured server-side). */
  width?: number;
  height?: number;
}

// POST /creatives/campaigns/:id — the ad itself, sent for admin review.
// Distinct from useUploadCampaignBannerMutation (a campaign's marketing
// thumbnail, never played on screens).
export function useUploadCreativeMutation(campaignId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ file, durationSeconds, label, width, height }: UploadCreativeInput) => {
      const formData = new FormData();
      // React Native's FormData accepts the { uri, name, type } shape at runtime; DOM typings only know Blob.
      formData.append("file", file as Blob);
      if (durationSeconds) formData.append("durationSeconds", String(Math.min(120, Math.max(1, Math.round(durationSeconds)))));
      if (label) formData.append("label", label);
      if (width && height) {
        formData.append("width", String(Math.round(width)));
        formData.append("height", String(Math.round(height)));
      }
      return apiUpload<Creative>(`/creatives/campaigns/${campaignId}`, formData, getAccessToken());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["creatives", "campaign", campaignId] });
      queryClient.invalidateQueries({ queryKey: ["creatives", "mine"] });
      queryClient.invalidateQueries({ queryKey: ["media"] });
    },
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

// Ported from cs-web src/hooks/useMedia.ts useApplyMediaMutation — keep in sync.
// Re-attaches an already-uploaded file to a campaign as a new ad (the builder
// uses it to change a still image's on-screen time without re-uploading).
export function useApplyMediaMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ mediaId, campaignId, durationSeconds }: { mediaId: string; campaignId: string; durationSeconds?: number }) =>
      apiPost<Creative>(`/media/${mediaId}/apply`, { campaignId, durationSeconds }, getAccessToken()),
    onSuccess: (_data, { campaignId }) => {
      queryClient.invalidateQueries({ queryKey: ["creatives", "campaign", campaignId] });
      queryClient.invalidateQueries({ queryKey: ["creatives", "mine"] });
      queryClient.invalidateQueries({ queryKey: ["media"] });
    },
  });
}
