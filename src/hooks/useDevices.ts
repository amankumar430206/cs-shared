import { useMutation, useQueries, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiGet, apiGetPaginated, apiPost, apiPut } from "../api/client";
import type {
  DeviceActivation,
  DeviceLogHistory,
  DeviceLogMapEntry,
  FleetHealthSummary,
  HealthAlertConfig,
  HeartbeatHistoryRow,
  MonitoringTimeline,
  MyScreenHealth,
  MyScreenSummary,
  PlaybackHistoryRow,
  PlaybackLogEntry,
  PlaybackSummary,
  PreviewPlaylist,
  ScreenHealth,
  ScreenLocation, AdvertiserScreenPreview } from "../types/devices";
import { getAccessToken, session, useHasSession, useSession } from "../api/session";

function buildQuery(params: Record<string, string | number | undefined>) {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== "") query.set(key, String(value));
  }
  const qs = query.toString();
  return qs ? `?${qs}` : "";
}

export interface DeviceHealthFilters {
  search?: string;
  status?: "ONLINE" | "OFFLINE";
  page?: number;
  [key: string]: string | number | undefined;
}

// Paginated + filterable — every ACTIVE screen on the platform, not one
// partner's handful, so this has no natural ceiling either.
export function useDeviceHealthQuery(filters: DeviceHealthFilters) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["devices", "health", filters],
    queryFn: () => apiGetPaginated<ScreenHealth>(`/devices/health${buildQuery(filters)}`, getAccessToken()),
    enabled: hasAccessToken,
    refetchInterval: 30_000,
  });
}

// User-authenticated read of a screen's live content — admin or the
// screen's own partner, no device token needed. Used by the player page's
// preview mode; not polled as aggressively as the real device sync loop
// since a human is watching, not a display.
export function useDevicePreviewQuery(deviceId: string) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["devices", "preview", deviceId],
    queryFn: () => apiGet<PreviewPlaylist>(`/devices/${deviceId}/preview`, getAccessToken()),
    enabled: hasAccessToken && !!deviceId,
    refetchInterval: 30_000,
  });
}

// Partner-facing counterpart to useDeviceHealthQuery — the caller's own
// screens only, no device token in the response.
export function useMyDeviceHealthQuery(filters: DeviceHealthFilters) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["devices", "me", "health", filters],
    queryFn: () => apiGetPaginated<MyScreenHealth>(`/devices/me/health${buildQuery(filters)}`, getAccessToken()),
    enabled: hasAccessToken,
    refetchInterval: 30_000,
  });
}

export interface PlaybackLogFilters {
  screenId?: string;
  campaignId?: string;
  page?: number;
  [key: string]: string | number | undefined;
}

// The "Playback Logs" list — every playback event across the caller's own
// screens. The response's meta also carries `screens` (the caller's own
// screen list, for the filter dropdown) alongside the usual pagination
// fields — apiGetPaginated's meta type is fixed to {page,limit,total}, so
// that extra field is cast on here rather than widening the shared helper
// for this one endpoint.
export function useMyPlaybackLogsQuery(filters: PlaybackLogFilters) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["devices", "me", "playback-logs", filters],
    queryFn: async () => {
      const result = await apiGetPaginated<PlaybackLogEntry>(
        `/devices/me/playback-logs${buildQuery(filters)}`,
        getAccessToken()
      );
      const meta = result.meta as typeof result.meta & { screens: MyScreenSummary[] };
      return { rows: result.rows, meta };
    },
    enabled: hasAccessToken,
  });
}

// Mirrors devices.service.js's claimActivationCode response — every detail
// known about the physical device at the moment it's linked, split between
// what the device itself just reported (device) and what the partner
// entered for this screen at onboarding time (screenReportedHardware),
// since the two aren't guaranteed to agree.
export interface ClaimActivationResult {
  screenId: string;
  screenName: string;
  city: string;
  state: string;
  status: string;
  device: {
    deviceId: string;
    deviceToken: string;
    reportedModel: string | null;
    reportedAppVersion: string | null;
    registeredAt: string;
    claimedAt: string;
  };
  screenReportedHardware: {
    deviceModel: string | null;
    ram: string | null;
    storage: string | null;
    installationEnvironment: string | null;
  };
}

// Alternative to copying/pasting the player URL by hand: type the 6-digit
// code the Ad Player app (built by another team, docs/DEVICE_PLAYER_API.md
// section 3) shows on-screen, and the backend binds that physical device to
// this already-approved screen — see devices.service.js's claimActivationCode.
export function useClaimActivationMutation(screenId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (code: string) =>
      apiPost<ClaimActivationResult>(`/devices/${screenId}/activation/claim`, { code }, getAccessToken()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["screens", screenId] });
      queryClient.invalidateQueries({ queryKey: ["screens", "owner", screenId] });
      queryClient.invalidateQueries({ queryKey: ["screens", "me"] });
    },
  });
}

// Kills a screen's current device binding without waiting for a new
// activation code — devices.service.js's revokeDevice already allows this
// for an admin OR the screen's own partner (same ownership gate as claim),
// so this one hook serves the "Disassociate device" CTA on both
// /my-screens/[id] and /admin/screens/[id] (same shared
// ScreenDetailPageContent -> LinkDeviceDialog component tree).
export function useRevokeDeviceMutation(screenId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => apiPost<{ screenId: string; status: string }>(`/devices/${screenId}/revoke`, undefined, getAccessToken()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["screens", screenId] });
      queryClient.invalidateQueries({ queryKey: ["screens", "owner", screenId] });
      queryClient.invalidateQueries({ queryKey: ["screens", "me"] });
    },
  });
}

// Fleet-wide device locations for the admin's India map — unpaginated, same
// 30s cadence as the health tables since it's driven by the same heartbeats.
// The admin dashboard's fleet-health tile — see FleetHealthSummary's
// docstring for why playbackSuccessRateToday is null rather than 0 when
// nothing's played yet.
export function useFleetHealthSummaryQuery() {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["devices", "fleet-summary"],
    queryFn: () => apiGet<FleetHealthSummary>("/devices/fleet-summary", getAccessToken()),
    enabled: hasAccessToken,
    refetchInterval: 30_000,
  });
}

export function useDeviceLocationsQuery() {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["devices", "locations"],
    queryFn: () => apiGet<ScreenLocation[]>("/devices/locations", getAccessToken()),
    enabled: hasAccessToken,
    refetchInterval: 30_000,
  });
}

// Partner-facing counterpart — the caller's own screens only.
export function useMyDeviceLocationsQuery() {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["devices", "me", "locations"],
    queryFn: () => apiGet<ScreenLocation[]>("/devices/me/locations", getAccessToken()),
    enabled: hasAccessToken,
    refetchInterval: 30_000,
  });
}

export interface DeviceActivationFilters {
  search?: string;
  status?: "PENDING" | "EXPIRED" | "CLAIMED";
  page?: number;
  [key: string]: string | number | undefined;
}

// A device that's only called /activation/register has no `screens` row
// yet — this is the one admin view of what's sitting there waiting to be
// claimed (or expired unclaimed). Polled less aggressively than the health
// tables since codes only change on device restart/claim, not continuously.
export function useDeviceActivationsQuery(filters: DeviceActivationFilters, options: { enabled?: boolean } = {}) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["devices", "activation", "pending", filters],
    queryFn: () => apiGetPaginated<DeviceActivation>(`/devices/activation/pending${buildQuery(filters)}`, getAccessToken()),
    enabled: hasAccessToken && (options.enabled ?? true),
    refetchInterval: 30_000,
  });
}

// Heartbeat/playback activity map — powers the calendar-heatmap in
// DeviceActivityMapDialog. `enabled` gated on a non-empty deviceId since
// this is only fetched once a dialog is opened for a specific screen, not
// eagerly on page load. Not polled — a day's rollup only changes once a
// day (the archival job) or, for "today," on the next heartbeat/play, and
// re-opening the dialog is enough to see that.
export function useHeartbeatMapQuery(deviceId: string, days = 30) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["devices", deviceId, "heartbeats", "map", days],
    queryFn: () => apiGet<DeviceLogMapEntry[]>(`/devices/${deviceId}/heartbeats/map?days=${days}`, getAccessToken()),
    enabled: hasAccessToken && !!deviceId,
  });
}

export function usePlaybackMapQuery(deviceId: string, days = 30) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["devices", deviceId, "playback-events", "map", days],
    queryFn: () => apiGet<DeviceLogMapEntry[]>(`/devices/${deviceId}/playback-events/map?days=${days}`, getAccessToken()),
    enabled: hasAccessToken && !!deviceId,
  });
}

// Single-day raw drill-down — only fetched once a specific day cell is
// clicked (`date` starts empty, gating the query off entirely until then).
export function useHeartbeatHistoryQuery(deviceId: string, date: string) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["devices", deviceId, "heartbeats", "history", date],
    queryFn: () =>
      apiGet<DeviceLogHistory<HeartbeatHistoryRow>>(`/devices/${deviceId}/heartbeats/history?date=${date}`, getAccessToken()),
    enabled: hasAccessToken && !!deviceId && !!date,
  });
}

export function usePlaybackHistoryQuery(deviceId: string, date: string) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["devices", deviceId, "playback-events", "history", date],
    queryFn: () =>
      apiGet<DeviceLogHistory<PlaybackHistoryRow>>(`/devices/${deviceId}/playback-events/history?date=${date}`, getAccessToken()),
    enabled: hasAccessToken && !!deviceId && !!date,
  });
}

export function useCampaignPlaybackQuery(campaignId: string) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["devices", "campaign-playback", campaignId],
    queryFn: () => apiGet<PlaybackSummary[]>(`/devices/campaigns/${campaignId}/playback`, getAccessToken()),
    enabled: hasAccessToken && !!campaignId,
  });
}

export interface MonitoringTimelineFilters {
  from?: string;
  to?: string;
  search?: string;
  [key: string]: string | number | undefined;
}

// The admin Live Monitoring Gantt — one row per active screen (status
// alongside), one bar per ad whose booking/reserved-slot window overlaps
// [from, to]. Polled the same 30-60s cadence as the rest of the fleet-health
// surface so the "now" marker and online/offline dots stay current.
export function useMonitoringTimelineQuery(filters: MonitoringTimelineFilters) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["devices", "monitoring", "timeline", filters],
    queryFn: () => apiGet<MonitoringTimeline>(`/devices/monitoring/timeline${buildQuery(filters)}`, getAccessToken()),
    enabled: hasAccessToken,
    refetchInterval: 60_000,
  });
}

// The same fleet-wide Gantt as useMonitoringTimelineQuery, restricted to the
// caller's own screens — the "Live Monitoring" view on /device-monitoring.
export function useMyMonitoringTimelineQuery(filters: MonitoringTimelineFilters, options: { enabled?: boolean } = {}) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["devices", "me", "monitoring", "timeline", filters],
    queryFn: () => apiGet<MonitoringTimeline>(`/devices/me/monitoring/timeline${buildQuery(filters)}`, getAccessToken()),
    enabled: hasAccessToken && (options.enabled ?? true),
    refetchInterval: 60_000,
  });
}

// An advertiser's own Gantt, across every screen currently running one of
// their ads — no dedicated backend endpoint for this (unlike the partner's
// fleet-wide one above): it composes the already-scoped per-screen endpoint
// (useScreenTimelineQuery's route, OWN_ONLY for an advertiser) across a
// handful of screenIds via useQueries, the same fan-out pattern
// ViewLiveScreenCta already uses for its own per-screen liveness check.
// Reasonable because an advertiser's live-screen count is small (their own
// active campaigns' screens, not the whole fleet) — unlike the partner/admin
// views, which genuinely need one server-side query over many screens.
export function useMyLiveScreensTimelineQuery(screenIds: string[], filters: MonitoringTimelineFilters) {
  const hasAccessToken = useHasSession();
  const accessToken = useSession((s) => s.accessToken);
  const results = useQueries({
    queries: screenIds.map((screenId) => ({
      queryKey: ["devices", "screens", screenId, "monitoring", "timeline", filters],
      queryFn: () => apiGet<MonitoringTimeline>(`/devices/screens/${screenId}/monitoring/timeline${buildQuery(filters)}`, accessToken),
      enabled: hasAccessToken && !!screenId,
      refetchInterval: 60_000,
    })),
  });

  return {
    screens: results.flatMap((r) => r.data?.screens ?? []),
    isLoading: results.some((r) => r.isLoading),
    error: results.find((r) => r.error)?.error,
  };
}

// The same Gantt, scoped to one screen — the "Live Ads" tab on
// /screens/[id], /my-screens/[id], and /admin/screens/[id]. Response shape
// mirrors useMonitoringTimelineQuery's (screens: [one element]), so
// AdsGanttChart is fed identically either way. Open to any authenticated
// role — cs-api's getScreenTimeline scopes what comes back (full vs.
// own-campaigns-only) rather than gating the route itself.
export function useScreenTimelineQuery(screenId: string, filters: MonitoringTimelineFilters, options: { enabled?: boolean } = {}) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["devices", "screens", screenId, "monitoring", "timeline", filters],
    queryFn: () => apiGet<MonitoringTimeline>(`/devices/screens/${screenId}/monitoring/timeline${buildQuery(filters)}`, getAccessToken()),
    enabled: hasAccessToken && !!screenId && (options.enabled ?? true),
    refetchInterval: 60_000,
  });
}

// An advertiser previewing their own ad on a screen their campaign is
// running on. Separate from useDevicePreviewQuery: that one is admin/partner
// only and returns the device token plus every campaign's creatives.
export function useAdvertiserScreenPreviewQuery(deviceId: string, campaignId: string, enabled = true) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["devices", "preview", "mine", deviceId, campaignId],
    queryFn: () =>
      apiGet<AdvertiserScreenPreview>(
        `/devices/${deviceId}/preview/mine?campaignId=${encodeURIComponent(campaignId)}`,
        getAccessToken()
      ),
    enabled: hasAccessToken && !!deviceId && !!campaignId && enabled,
    // A human is watching; this is also what refreshes the online/offline
    // banner, so it can't be left stale.
    refetchInterval: 30_000,
  });
}

// Admin-only singleton settings — same GET/PUT-one-fixed-key shape as
// useRevenue.ts's useFeeConfigQuery/useUpdateFeeConfigMutation.
export function useHealthAlertConfigQuery() {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["devices", "health-alert-config"],
    queryFn: () => apiGet<HealthAlertConfig>("/devices/health-alert-config", getAccessToken()),
    enabled: hasAccessToken,
  });
}

export function useUpdateHealthAlertConfigMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (healthScoreAlertThreshold: number) =>
      apiPut<HealthAlertConfig>("/devices/health-alert-config", { healthScoreAlertThreshold }, getAccessToken()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["devices", "health-alert-config"] });
    },
  });
}
