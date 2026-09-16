// Types mirroring cs-api's modules/devices responses, plus a small fetch
// helper for the device-credential routes (x-device-token header, not a
// user JWT) that the Phase 6 web player calls directly.

/** Who the ad belongs to. "PARTNER" is the screen partner's own ad on the slots they reserved out of their own screen (cs-api's modules/partnerAds) — free, no campaign behind it. */
export type AdOwner = "ADVERTISER" | "PARTNER";

export interface PlaylistItem {
  creativeId: string;
  owner?: AdOwner;
  /** Absent for a partner's own ad — there is no campaign behind one. */
  campaignId?: string;
  /** The campaign's name, or for a partner ad the label the partner gave it. */
  campaignName?: string;
  contentType: string;
  durationSeconds: number | null;
  /** `sha256:<hex>` — absent for creatives uploaded before this existed. */
  checksum?: string;
  /** Optional time-of-day restriction the server already enforced when building this list — informational, the item simply wouldn't be here otherwise. */
  slotStartHour?: number;
  slotEndHour?: number;
  order: number;
  downloadUrl: string;
}

export interface Playlist {
  screenId: string;
  screenName: string;
  /** Omitted (not just empty-string) when `items` is empty — nothing to version, and no future no_change to diff against. */
  playlistVersion?: string;
  items: PlaylistItem[];
}

// GET /devices/:deviceId/sync's actual response shape — `no_change` omits
// screenId/screenName/items entirely (the point of the delta check is to
// skip re-sending them), so those three are only present for `ok`/
// `update_available`.
export type SyncResult =
  | { status: "no_change"; playlistVersion: string }
  | ({ status: "ok" | "update_available" } & Playlist);

// Same content as Playlist, reached with a user login instead of the
// device's own secret token — see the player page's ?mode=preview branch.
// Carries the real device credentials too (only returned to an admin or the
// screen's own partner) so the preview page can also offer "use this as the
// live backup player" without a second round trip.
export interface PreviewPlaylist extends Playlist {
  deviceId: string;
  deviceToken: string;
  deviceStatus: "ONLINE" | "OFFLINE";
  lastHeartbeatAt: string | null;
  /** "WIDTHxHEIGHT" (e.g. "1920x1080") — sizes the billboard mockup's bezel to the screen's own orientation. */
  resolution: string | null;
}

export interface ScreenHealth {
  screenId: string;
  screenName: string;
  city: string;
  state: string;
  deviceId: string;
  deviceToken: string;
  status: "ONLINE" | "OFFLINE";
  lastHeartbeatAt: string | null;
  healthScore: number;
  /** Whatever the most recent heartbeat's health payload reported — null if never heartbeated, partial if only some fields were sent. */
  health: DeviceHealthReport | null;
}

// The partner-facing counterpart to ScreenHealth (GET /devices/me/health) —
// identical except it never includes the device token, which is an admin/
// support concern, not something a partner's own monitoring view needs.
export type MyScreenHealth = Omit<ScreenHealth, "deviceToken">;

export interface PlaybackSummary {
  creativeId: string;
  completedCount: number;
  failedCount: number;
  interruptedCount: number;
  lastPlayedAt: string | null;
}

export interface PlaybackLogEntry {
  id: string;
  screenId: string;
  owner?: AdOwner;
  /** Null for a play of the partner's own ad on their reserved slots. */
  campaignId: string | null;
  campaignName: string | null;
  creativeId: string;
  startedAt: string;
  endedAt: string | null;
  status: "COMPLETED" | "FAILED" | "INTERRUPTED";
}

export interface MyScreenSummary {
  id: string;
  screenName: string;
  city: string;
  state: string;
}

// A screen with a known device-reported location — feeds the India map of
// live device locations (GET /devices/locations, /devices/me/locations).
export interface ScreenLocation {
  screenId: string;
  screenName: string;
  city: string;
  state: string;
  installationAddress?: string | null;
  /** Where to plot — the player's reported GPS when known, else the registered position (see locationSource). */
  latitude: number;
  longitude: number;
  locationSource?: "DEVICE" | "REGISTERED";
  reportedLatitude?: number | null;
  reportedLongitude?: number | null;
  locationReportedAt?: string | null;
  registeredLatitude?: number | null;
  registeredLongitude?: number | null;
  distanceFromRegisteredKm?: number | null;
  status: "ONLINE" | "OFFLINE";
  lastHeartbeatAt: string | null;
}

// GET /devices/fleet-summary — the admin dashboard's fleet-health tile.
// playbackSuccessRateToday is null (not 0) when nothing has played yet
// today, distinguishing "no data" from "everything failed."
export interface FleetHealthSummary {
  onlineCount: number;
  offlineCount: number;
  totalActiveScreens: number;
  playbackSuccessRateToday: number | null;
  totalPlaysToday: number;
}

// The admin-editable threshold devices.service.js's scanForDeviceHealthAlerts
// compares a screen's health score against — below it, the owning partner
// gets a "Screen health is low" notification (once per drop-below event).
export interface HealthAlertConfig {
  healthScoreAlertThreshold: number;
  updatedAt: string | null;
}

export interface DeviceHealthReport {
  batteryLevel?: number;
  storageAvailableMb?: number;
  appVersion?: string;
  androidVersion?: number;
  uptimeMs?: number;
  networkType?: "WIFI" | "ETHERNET" | "CELLULAR" | "OFFLINE" | "UNKNOWN";
  playbackErrorCount?: number;
}

// GET /devices/monitoring/timeline — the admin Live Monitoring Gantt. The bar
// unit is an ad, not a campaign — see cs-api's devices.repository.js for why
// (multiple ads can rotate within one booking, each with its own optional
// slot-hour restriction; a partner's own ads on their reserved slots have no
// campaign at all).
export interface TimelineBar {
  id: string;
  owner: AdOwner;
  /** Campaign name for an advertiser ad, or the partner's own label for their ad. */
  label: string;
  advertiserName: string | null;
  campaignId: string | null;
  /** Calendar dates ('YYYY-MM-DD'), inclusive — the booking/reserved-slot window this ad plays in. */
  startDate: string;
  endDate: string;
  /** Optional time-of-day restriction — informational, shown in the bar's tooltip. */
  slotStartHour?: number;
  slotEndHour?: number;
  fileName: string;
  contentType: string;
  durationSeconds: number | null;
}

export interface TimelineScreen {
  screenId: string;
  screenName: string;
  city: string;
  state: string;
  /** Opaque device id for `/player/:deviceId` — null when no device has ever been linked to this screen. */
  deviceId: string | null;
  status: "ONLINE" | "OFFLINE";
  lastHeartbeatAt: string | null;
  bars: TimelineBar[];
}

export interface MonitoringTimeline {
  from: string;
  to: string;
  /** Only present on the screen-scoped endpoint — FULL for an admin/the owning partner, OWN_ONLY for anyone else (e.g. an advertiser browsing the marketplace only ever sees their own campaign's ads). */
  scope?: "FULL" | "OWN_ONLY";
  screens: TimelineScreen[];
}

// Device-token (player-side) request helpers stay in cs-web's /player simulator;
// this package only covers user-authenticated APIs.

// Admin-only listing of device_activation_codes (GET /devices/activation/pending)
// — mirrors devices.service.js's toActivationDto. A device that's only
// called /activation/register has no `screens` row yet, so this is the only
// place a pending/expired/claimed activation code is visible at all.
// GET /devices/:deviceId/heartbeats/map and /playback-events/map — one
// entry per day, oldest first. `summary` is null for a day with zero rows
// (never archived because there was nothing to archive that day).
export interface DeviceLogMapEntry {
  date: string;
  rowCount: number;
  firstAt: string | null;
  lastAt: string | null;
  summary: { onlineMinutes: number; statusBreakdown: Record<string, number> } | { totalPlays: number; uniqueCampaignIds: number; errorCount: number } | null;
}

export interface HeartbeatHistoryRow {
  id: string;
  screen_id: string;
  status: string;
  metadata: Record<string, unknown> | null;
  received_at: string;
}

export interface PlaybackHistoryRow {
  id: string;
  screen_id: string;
  campaign_id: string;
  creative_id: string;
  started_at: string;
  ended_at: string | null;
  status: string;
}

// GET /devices/:deviceId/heartbeats/history and /playback-events/history —
// `source` tells the UI whether this came straight from Postgres (today,
// still "hot") or was reconstructed from the archived R2 .jsonl file.
export interface DeviceLogHistory<Row> {
  date: string;
  source: "live" | "archive";
  rows: Row[];
}

export interface DeviceActivation {
  id: string;
  deviceId: string;
  deviceModel: string | null;
  appVersion: string | null;
  status: "PENDING" | "EXPIRED" | "CLAIMED";
  expiresAt: string;
  registeredAt: string;
  updatedAt: string;
  claimedScreenId: string | null;
  claimedScreenName: string | null;
}

// Liveness for an advertiser-facing preview. Derived server-side from
// heartbeat recency, never from the device_status column — that column is
// only ever written 'ONLINE' and never aged back out, so it would tell an
// advertiser their ad was playing on a screen that died days ago.
export interface PreviewDeviceLiveness {
  online: boolean;
  lastHeartbeatAt: string | null;
  minutesSinceLastHeartbeat: number | null;
  offlineAfterMinutes: number;
  /** false when the screen has never once checked in — needs different wording than "went offline". */
  everSeen: boolean;
}

// Parses a screen's "WIDTHxHEIGHT" resolution string (e.g. "1920x1080") into
// a width/height ratio for BillboardFrame — null on anything unparseable
// (missing, malformed, zero) so the caller can fall back to its own default
// rather than rendering a degenerate/NaN aspect ratio.
export function parseResolutionAspectRatio(resolution: string | null | undefined): number | null {
  const match = resolution?.match(/^(\d+)\s*x\s*(\d+)$/i);
  if (!match) return null;
  const width = Number(match[1]);
  const height = Number(match[2]);
  return width > 0 && height > 0 ? width / height : null;
}

export interface AdvertiserPreviewItem {
  creativeId: string;
  originalFilename: string;
  contentType: string;
  durationSeconds: number | null;
  slotStartHour?: number;
  slotEndHour?: number;
  order: number;
  downloadUrl: string;
}

// GET /devices/:deviceId/preview/mine — the advertiser's own creatives only.
// Deliberately carries no device token and no other campaign's media; see
// devices.service.js's getAdvertiserScreenPreview for why that matters.
export interface AdvertiserScreenPreview {
  screenId: string;
  screenName: string;
  city: string | null;
  /** "WIDTHxHEIGHT" (e.g. "1920x1080") — sizes the billboard mockup's bezel to the screen's own orientation. */
  resolution: string | null;
  device: PreviewDeviceLiveness;
  /** Total approved creatives on this screen today, this campaign's included — a count, never identities. */
  itemsInRotation: number;
  items: AdvertiserPreviewItem[];
}
