import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiDelete, apiGet, apiGetPaginated, apiPatch, apiPost, apiUpload } from "../api/client";
import type { Campaign, CampaignBanner, CampaignStatus } from "../types/campaigns";
import { getAccessToken, session, useHasSession, useSession } from "../api/session";
import type { UploadFile } from "./useKyc";

export function useMyCampaignsQuery() {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["campaigns", "me"],
    queryFn: () => apiGet<Campaign[]>("/campaigns/me", getAccessToken()),
    enabled: hasAccessToken,
  });
}

export interface MyCampaignsListFilters {
  status?: CampaignStatus;
  search?: string;
  live?: boolean;
}

const CAMPAIGNS_PAGE_LIMIT = 20;

// The scalable "My Campaigns" list — infinite-scrolls over GET /campaigns
// (paginated, filtered server-side) instead of useMyCampaignsQuery's full
// unpaginated array, which is fine for a handful of campaigns but not for
// an advertiser with 50+.
export function useMyCampaignsListQuery(filters: MyCampaignsListFilters) {
  const hasAccessToken = useHasSession();
  return useInfiniteQuery({
    queryKey: ["campaigns", "list", filters],
    queryFn: ({ pageParam }) => {
      const query = new URLSearchParams({ page: String(pageParam), limit: String(CAMPAIGNS_PAGE_LIMIT) });
      if (filters.status) query.set("status", filters.status);
      if (filters.search) query.set("search", filters.search);
      if (filters.live) query.set("live", "true");
      return apiGetPaginated<Campaign>(`/campaigns?${query.toString()}`, getAccessToken());
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.meta.page * lastPage.meta.limit < lastPage.meta.total ? lastPage.meta.page + 1 : undefined,
    enabled: hasAccessToken,
  });
}

export function useCampaignQuery(id: string) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["campaigns", id],
    queryFn: () => apiGet<Campaign>(`/campaigns/${id}`, getAccessToken()),
    enabled: hasAccessToken && !!id,
  });
}

export function useCreateCampaignMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (values: Record<string, unknown>) =>
      apiPost<Campaign>("/campaigns", values, getAccessToken()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["campaigns", "me"] });
      queryClient.invalidateQueries({ queryKey: ["campaigns", "list"] });
    },
  });
}

export interface DuplicateCampaignInput {
  campaignId: string;
  /** The source's old dates are rarely useful to reuse (they've often already passed) — always prompted for, not optional in the UI. */
  startDate: string;
  endDate: string;
}

export function useDuplicateCampaignMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ campaignId, startDate, endDate }: DuplicateCampaignInput) =>
      apiPost<Campaign>(`/campaigns/${campaignId}/duplicate`, { startDate, endDate }, getAccessToken()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["campaigns", "me"] });
      queryClient.invalidateQueries({ queryKey: ["campaigns", "list"] });
    },
  });
}

// Banner/poster/thumbnail — capped at 2 per campaign (cs-api's
// MAX_BANNERS_PER_CAMPAIGN). Shown as a list row's thumbnail (Campaign's own
// thumbnailUrl field) and as a full strip on the detail page.
function invalidateCampaignViews(queryClient: ReturnType<typeof useQueryClient>, campaignId: string) {
  queryClient.invalidateQueries({ queryKey: ["campaigns", campaignId] });
  queryClient.invalidateQueries({ queryKey: ["campaigns", "me"] });
  queryClient.invalidateQueries({ queryKey: ["campaigns", "list"] });
}

// campaignId is a mutate-time variable, not a hook-level parameter — the
// new-campaign wizard doesn't have one yet when the hook itself is called
// (it only exists after POST /campaigns succeeds), unlike a campaign detail
// page where it'd be known from the route the whole time either way.
export function useUploadCampaignBannerMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ campaignId, file }: { campaignId: string; file: UploadFile }) => {
      const formData = new FormData();
      // React Native's FormData accepts the { uri, name, type } shape at runtime; DOM typings only know Blob.
      formData.append("file", file as Blob);
      return apiUpload<CampaignBanner>(`/campaigns/${campaignId}/banners`, formData, getAccessToken());
    },
    onSuccess: (_data, { campaignId }) => invalidateCampaignViews(queryClient, campaignId),
  });
}

export function useDeleteCampaignBannerMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ campaignId, bannerId }: { campaignId: string; bannerId: string }) =>
      apiDelete(`/campaigns/${campaignId}/banners/${bannerId}`, getAccessToken()),
    onSuccess: (_data, { campaignId }) => invalidateCampaignViews(queryClient, campaignId),
  });
}

// Only the budget is editable this way once a campaign is CONFIRMED/ACTIVE
// (cs-api's BUDGET_ONLY_EDITABLE_STATUSES) — and only upward, never a
// decrease. Everything else on a running campaign stays locked; this is
// purely the "raise your budget in response to a spend warning" path, not
// a general campaign-edit mutation.
export function useUpdateCampaignBudgetMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ campaignId, totalBudget }: { campaignId: string; totalBudget: number }) =>
      apiPatch<Campaign>(`/campaigns/${campaignId}`, { totalBudget }, getAccessToken()),
    onSuccess: (_data, { campaignId }) => invalidateCampaignViews(queryClient, campaignId),
  });
}

export function useCancelCampaignMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (campaignId: string) =>
      apiPost<Campaign>(`/campaigns/${campaignId}/cancel`, undefined, getAccessToken()),
    onSuccess: (_data, campaignId) => {
      queryClient.invalidateQueries({ queryKey: ["campaigns", "me"] });
      queryClient.invalidateQueries({ queryKey: ["campaigns", "list"] });
      queryClient.invalidateQueries({ queryKey: ["campaigns", campaignId] });
    },
  });
}
