import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiDelete, apiGet, apiGetPaginated, apiPatch, apiPost, apiUpload } from "../api/client";
import type { DiscoveryScreen, Screen, ScreenCategory, ScreenListItem, ScreenPhoto, ScreenVerificationStatus } from "../types/screens";
import { getAccessToken, session, useHasSession, useSession } from "../api/session";
import type { UploadFile } from "./useKyc";

export function useCategoriesQuery() {
  return useQuery({
    queryKey: ["screens", "categories"],
    queryFn: () => apiGet<ScreenCategory[]>("/screens/categories"),
  });
}

// One screen, owner-facing shape (device token, heartbeat, etc.) — used by
// the detail/edit pages. Deliberately its own query key, NOT ["screens",
// screenId] — that plain key is used by useScreenQuery (useBookings.ts) and
// ScreensTab.tsx for the public discovery DTO, and GET /screens/:id returns
// a different shape (owner vs discovery) depending on who's asking. Sharing
// one cache entry for two different response shapes at the same screenId
// let a partner who'd browsed their own screen's public listing crash this
// page with a DiscoveryScreen-shaped object masquerading as their own.
export function useMyScreenQuery(screenId: string) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["screens", "owner", screenId],
    queryFn: () => apiGet<Screen>(`/screens/${screenId}`, getAccessToken()),
    enabled: hasAccessToken && !!screenId,
  });
}

export interface MyScreensListFilters {
  status?: ScreenVerificationStatus;
  search?: string;
  live?: boolean;
}

const MY_SCREENS_PAGE_LIMIT = 20;

// The scalable "My Screens" list — infinite-scrolls over GET /screens/me/list
// (paginated, filtered server-side) instead of fetching every screen a
// partner owns in one unpaginated array, which doesn't hold up for a
// partner running hundreds of screens. Mirrors useCampaigns.ts's
// useMyCampaignsListQuery.
export function useMyScreensListQuery(filters: MyScreensListFilters) {
  const hasAccessToken = useHasSession();
  return useInfiniteQuery({
    queryKey: ["screens", "me", "list", filters],
    queryFn: ({ pageParam }) => {
      const query = new URLSearchParams({ page: String(pageParam), limit: String(MY_SCREENS_PAGE_LIMIT) });
      if (filters.status) query.set("status", filters.status);
      if (filters.search) query.set("search", filters.search);
      if (filters.live) query.set("live", "true");
      return apiGetPaginated<ScreenListItem>(`/screens/me/list?${query.toString()}`, getAccessToken());
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.meta.page * lastPage.meta.limit < lastPage.meta.total ? lastPage.meta.page + 1 : undefined,
    enabled: hasAccessToken,
  });
}

export interface PartnerStats {
  totalScreens: number;
  activeScreens: number;
  pendingScreens: number;
  totalBookings: number;
  activeBookings: number;
}

// Real DB-side counts (GET /screens/me/stats) instead of fetching every
// screen/booking just to .length/.filter() them client-side — mirrors
// modules/admin's getStatsOverview pattern (see useAdmin.ts's
// useAdminStatsQuery).
export function usePartnerStatsQuery() {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["screens", "me", "stats"],
    queryFn: () => apiGet<PartnerStats>("/screens/me/stats", getAccessToken()),
    enabled: hasAccessToken,
  });
}

export function useRegisterScreenMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (values: Record<string, unknown>) =>
      apiPost<Screen>("/screens", values, getAccessToken()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["screens", "me"] });
    },
  });
}

export interface QuickRegisterScreenInput {
  screenName: string;
  categoryCode: string;
  city: string;
  state: string;
  pricePerDay: number;
}

// Low-effort registration — 5 fields, no photos, no admin review; the
// returned screen is already ACTIVE with working device_id/device_token.
export function useQuickRegisterScreenMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (values: QuickRegisterScreenInput) =>
      apiPost<Screen>("/screens/quick-register", values, getAccessToken()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["screens", "me"] });
    },
  });
}

export function useUpdateScreenMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ screenId, values }: { screenId: string; values: Record<string, unknown> }) =>
      apiPatch<Screen>(`/screens/${screenId}`, values, getAccessToken()),
    onSuccess: (_data, { screenId }) => {
      queryClient.invalidateQueries({ queryKey: ["screens", "me"] });
      queryClient.invalidateQueries({ queryKey: ["screens", screenId] });
      queryClient.invalidateQueries({ queryKey: ["screens", "owner", screenId] });
    },
  });
}

// Admin-only — sets or clears (pass null) this screen's own override of how
// often its player polls /sync, taking priority over the platform-wide
// default (useSyncPollingQuery in useTheme.ts) when set. See cs-api's
// 20260101000077 migration.
export function useUpdateScreenSyncConfigMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ screenId, syncIntervalMinutes }: { screenId: string; syncIntervalMinutes: number | null }) =>
      apiPatch<Screen>(`/screens/${screenId}/sync-config`, { syncIntervalMinutes }, getAccessToken()),
    onSuccess: (_data, { screenId }) => {
      queryClient.invalidateQueries({ queryKey: ["screens", screenId] });
      queryClient.invalidateQueries({ queryKey: ["screens", "owner", screenId] });
    },
  });
}

// Admin-only — markup %, per-screen commission override, and/or a direct
// adjustment of the partner's own submitted price_per_day. See cs-api's
// 20260101000090 migration and docs/FINANCIAL_ENGINE_PLAN.md §1.
export function useUpdateScreenPricingConfigMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      screenId,
      ...body
    }: {
      screenId: string;
      markupPercent?: number;
      commissionOverridePercent?: number | null;
      pricePerDay?: number;
    }) => apiPatch<Screen>(`/screens/${screenId}/pricing-config`, body, getAccessToken()),
    onSuccess: (_data, { screenId }) => {
      queryClient.invalidateQueries({ queryKey: ["screens", screenId] });
      queryClient.invalidateQueries({ queryKey: ["screens", "owner", screenId] });
      queryClient.invalidateQueries({ queryKey: ["screens", "admin"] });
    },
  });
}

export function useSubmitScreenMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (screenId: string) =>
      apiPost<Screen>(`/screens/${screenId}/submit`, undefined, getAccessToken()),
    onSuccess: (_data, screenId) => {
      queryClient.invalidateQueries({ queryKey: ["screens", screenId] });
      queryClient.invalidateQueries({ queryKey: ["screens", "owner", screenId] });
      queryClient.invalidateQueries({ queryKey: ["screens", "me"] });
    },
  });
}

function useSetListedMutation(action: "activate" | "deactivate") {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (screenId: string) =>
      apiPost<Screen>(`/screens/${screenId}/${action}`, undefined, getAccessToken()),
    onSuccess: (_data, screenId) => {
      queryClient.invalidateQueries({ queryKey: ["screens", screenId] });
      queryClient.invalidateQueries({ queryKey: ["screens", "owner", screenId] });
      queryClient.invalidateQueries({ queryKey: ["screens", "me"] });
    },
  });
}

export const useActivateScreenMutation = () => useSetListedMutation("activate");
export const useDeactivateScreenMutation = () => useSetListedMutation("deactivate");

export function useDeleteScreenMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (screenId: string) => apiDelete<{ status: string }>(`/screens/${screenId}`, getAccessToken()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["screens", "me"] });
    },
  });
}

export function usePhotosQuery(screenId: string, enabled = true) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["screens", screenId, "photos"],
    queryFn: () => apiGet<ScreenPhoto[]>(`/screens/${screenId}/photos`, getAccessToken()),
    enabled: enabled && hasAccessToken && !!screenId,
  });
}

export function useUploadPhotoMutation(screenId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ photoType, file }: { photoType: string; file: UploadFile }) => {
      const formData = new FormData();
      formData.append("photoType", photoType);
      // React Native's FormData accepts the { uri, name, type } shape at runtime; DOM typings only know Blob.
      formData.append("file", file as Blob);
      return apiUpload(`/screens/${screenId}/photos`, formData, getAccessToken());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["screens", screenId, "photos"] });
    },
  });
}

export function useDeleteScreenPhotoMutation(screenId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (photoId: string) =>
      apiDelete<{ status: string }>(`/screens/${screenId}/photos/${photoId}`, getAccessToken()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["screens", screenId, "photos"] });
    },
  });
}

export interface ScreenSearchFilters {
  search?: string;
  city?: string;
  state?: string;
  categoryCode?: string;
  minPrice?: string;
  maxPrice?: string;
  live?: string;
  /** "Near me" — the browser's geolocation, not a saved address. lat/lng must both be set together. */
  lat?: string;
  lng?: string;
  radiusKm?: string;
  sort?: string;
}

const SCREEN_SEARCH_PAGE_LIMIT = 20;

// Infinite-scrolls over GET /screens (paginated server-side, see
// screensService.searchScreens) instead of fetching every matching screen
// in one unpaginated array — a global, high-volume screen catalog doesn't
// hold up any other way. Mirrors useMyScreensListQuery's shape.
export function useSearchScreensQuery(filters: ScreenSearchFilters, enabled: boolean) {
  return useInfiniteQuery({
    queryKey: ["screens", "search", filters],
    queryFn: ({ pageParam }) => {
      const query = new URLSearchParams({ page: String(pageParam), limit: String(SCREEN_SEARCH_PAGE_LIMIT) });
      for (const [key, value] of Object.entries(filters)) {
        if (value) query.set(key, value);
      }
      return apiGetPaginated<DiscoveryScreen>(`/screens?${query.toString()}`, getAccessToken());
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.meta.page * lastPage.meta.limit < lastPage.meta.total ? lastPage.meta.page + 1 : undefined,
    enabled,
  });
}

// --- Admin review queue ---

export function usePendingScreensQuery() {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["screens", "pending"],
    queryFn: () => apiGet<Screen[]>("/screens/pending", getAccessToken()),
    enabled: hasAccessToken,
  });
}

export interface AdminScreensListFilters {
  status?: ScreenVerificationStatus;
  search?: string;
  live?: boolean;
  page?: number;
}

// The admin-wide counterpart to useMyScreensListQuery — every screen on the
// platform regardless of owner, not just the UNDER_REVIEW-only /pending
// queue. Lets an admin actually browse the full inventory (PENDING/ACTIVE/
// REJECTED too), which /pending alone never surfaced.
export function useAdminScreensListQuery(filters: AdminScreensListFilters) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["screens", "admin", "list", filters],
    queryFn: () => {
      const query = new URLSearchParams({ page: String(filters.page ?? 1), limit: "20" });
      if (filters.status) query.set("status", filters.status);
      if (filters.search) query.set("search", filters.search);
      if (filters.live) query.set("live", "true");
      return apiGetPaginated<ScreenListItem>(`/screens/admin/list?${query.toString()}`, getAccessToken());
    },
    enabled: hasAccessToken,
  });
}

export function useApproveScreenMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (screenId: string) =>
      apiPost<Screen>(`/screens/${screenId}/approve`, undefined, getAccessToken()),
    onSuccess: (_data, screenId) => {
      queryClient.invalidateQueries({ queryKey: ["screens", "pending"] });
      queryClient.invalidateQueries({ queryKey: ["screens", "admin"] });
      queryClient.invalidateQueries({ queryKey: ["screens", screenId] });
      queryClient.invalidateQueries({ queryKey: ["screens", "owner", screenId] });
    },
  });
}

export function useRejectScreenMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ screenId, reason }: { screenId: string; reason: string }) =>
      apiPost<Screen>(`/screens/${screenId}/reject`, { reason }, getAccessToken()),
    onSuccess: (_data, { screenId }) => {
      queryClient.invalidateQueries({ queryKey: ["screens", "pending"] });
      queryClient.invalidateQueries({ queryKey: ["screens", "admin"] });
      queryClient.invalidateQueries({ queryKey: ["screens", screenId] });
      queryClient.invalidateQueries({ queryKey: ["screens", "owner", screenId] });
    },
  });
}
