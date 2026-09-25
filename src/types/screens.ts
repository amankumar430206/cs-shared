import type { ScreenListingDetails } from "./screenListing";
// Types mirroring cs-api's modules/screens responses.

export interface ScreenCategory {
  id: string;
  code: string;
  label: string;
}

export type ScreenVerificationStatus = "PENDING" | "UNDER_REVIEW" | "ACTIVE" | "REJECTED";

// Mirrors cs-api's screens.service.js UPDATABLE_STATUSES — PATCH /screens/:id
// now allows editing an ACTIVE screen too (cosmetic fields apply in place;
// a material one — address, GPS, category, serial — sends it back to
// UNDER_REVIEW for re-approval, see that file's own comment). Only
// UNDER_REVIEW stays locked. Single source of truth so the "Edit details"
// button and the edit page's own guard can't drift apart the way they used
// to as two separately-hardcoded copies.
export const EDITABLE_SCREEN_STATUSES: ScreenVerificationStatus[] = ["PENDING", "REJECTED", "ACTIVE"];

export interface Screen extends ScreenListingDetails {
  id: string;
  screenName: string;
  categoryId: string;
  screenSize: string;
  resolution: string;
  /** As-mounted shape — null when the resolution was never parseable (e.g. quick-registered screens). */
  orientation?: ScreenOrientation | null;
  resolutionWidth?: number | null;
  resolutionHeight?: number | null;
  os: string;
  androidVersion: string;
  deviceSerialNumber: string;
  installationAddress: string;
  city: string;
  state: string;
  gpsLatitude: number;
  gpsLongitude: number;
  /** A pasted Google Maps (or similar) share link, entered at registration — optional. */
  locationUrl: string | null;
  internetType: string;
  operatingHoursStart: string;
  operatingHoursEnd: string;
  ownershipDetails: string | null;
  revenueModel: string;
  pricePerDay: number;
  /** What the partner themselves last submitted — equal to pricePerDay unless an admin has adjusted it. */
  originalPricePerDay: number;
  /** Signed delta (pricePerDay - originalPricePerDay) — positive means an admin raised it, negative means they lowered it. */
  priceAdjustmentAmount: number;
  isPriceAdjusted: boolean;
  priceAdjustedAt: string | null;
  /** Admin-only markup added on top of pricePerDay to produce the advertiser-facing listed rate — one of 5/10/15/20. */
  markupPercent: number;
  /** Admin override of the revenueModel's commission preset — null means "use the preset". */
  commissionOverridePercent: number | null;
  estimatedDailyImpressions: number | null;
  installationEnvironment: string | null;
  dailyFootfall: number | null;
  deviceModel: string | null;
  ram: string | null;
  storage: string | null;
  /** How many concurrent campaigns this screen's ad rotation can hold for the same date before it reads as fully booked. Defaults to 1 (exclusive). */
  maxAdCapacity: number;
  /** Admin-only override of how often this screen's player polls /sync — null means "use the platform-wide default" (see useSyncPollingQuery in useTheme.ts). */
  syncIntervalMinutes: number | null;
  // Server-generated (crypto.randomUUID() at registration time) — never
  // sent by the client, only displayed.
  deviceId: string | null;
  // Only ever present on a SINGLE-screen owner/admin fetch (GET /screens/:id,
  // and the response of registering/updating/reviewing one screen) — the
  // secret credential the Phase 6 web player authenticates with
  // (x-device-token header). Never sent for a discovery-view screen, and
  // never sent on any LIST response either (GET /screens/me/list,
  // /screens/admin/list) — see cs-api's toScreenListDto. Use
  // ScreenListItem for those.
  deviceToken: string | null;
  // Raw column — only ever set to "ONLINE" on a heartbeat, never
  // automatically reset to "OFFLINE" as time passes (only an explicit
  // unpair does that). NOT a reliable "live right now" signal on its own —
  // use isLive (heartbeat-recency based) for that instead.
  deviceStatus: "ONLINE" | "OFFLINE";
  lastHeartbeatAt: string | null;
  /** True if a heartbeat arrived within the last 5 minutes — the actual "live right now" signal. */
  isLive: boolean;
  verificationStatus: ScreenVerificationStatus;
  /** Set only alongside UNDER_REVIEW, and only when that status came from an ACTIVE screen's material edit (never a first-time submission) — field-level before/after for what the partner just changed, keyed by the same field names as the update payload. */
  pendingReviewChanges: Partial<Record<keyof Screen, { before: unknown; after: unknown }>> | null;
  rejectionReason: string | null;
  submittedAt: string | null;
  reviewedAt: string | null;
  // Partner-controlled visibility, independent of verificationStatus — an
  // ACTIVE screen with isListed=false is approved but hidden from
  // advertiser search until reactivated.
  isListed: boolean;
  createdAt: string;
  /** Admin-only, single-screen-fetch-only (GET /screens/:id) — the screen's owner's contact + every KYC/business/vehicle field captured at registration. Absent for the owning partner's own view (they already know who they are) and for every list endpoint. */
  owner?: ScreenOwnerDetails;
}

export interface ScreenOwnerDetails {
  partnerId: string;
  userId: string;
  fullName: string;
  mobileNumber: string;
  email: string | null;
  accountStatus: string;
  partnerType: string;
  kycStatus: string;
  kycRejectionReason: string | null;
  kycSubmittedAt: string | null;
  kycReviewedAt: string | null;
  aadhaarNumber: string | null;
  panNumber: string | null;
  bankAccountNumber: string | null;
  bankIfsc: string | null;
  bankAccountName: string | null;
  upiId: string | null;
  dateOfBirth: string | null;
  city: string | null;
  state: string | null;
  businessName: string | null;
  legalStructure: string | null;
  gstNumber: string | null;
  udyamNumber: string | null;
  cin: string | null;
  vehicleRegistrationNumber: string | null;
  vehicleInsuranceValidTill: string | null;
  partnerSince: string;
}

/** The shape GET /screens/me/list and /screens/admin/list actually return — every Screen field except deviceToken, which only a single-screen fetch carries. */
export type ScreenListItem = Omit<Screen, "deviceToken"> & {
  /** First marketplace photo for list thumbnails — null when the screen has no photos yet. */
  thumbnailUrl: string | null;
};

export interface DiscoveryScreenPhoto {
  id: string;
  photoType: string;
  downloadUrl: string;
}

export interface DiscoveryScreen extends ScreenListingDetails {
  id: string;
  screenName: string;
  categoryId: string;
  screenSize: string;
  resolution: string;
  /** As-mounted shape — null when the resolution was never parseable (e.g. quick-registered screens). */
  orientation?: ScreenOrientation | null;
  resolutionWidth?: number | null;
  resolutionHeight?: number | null;
  city: string;
  state: string;
  gpsLatitude: number;
  gpsLongitude: number;
  operatingHoursStart: string;
  operatingHoursEnd: string;
  pricePerDay: number;
  estimatedDailyImpressions: number | null;
  installationEnvironment: string | null;
  dailyFootfall: number | null;
  maxAdCapacity: number;
  availability: boolean;
  /** True if this screen's player has sent a heartbeat within the last 5 minutes. */
  isLive: boolean;
  /** Marketplace-facing still photos, oldest first. Never includes the installation video. */
  photos: DiscoveryScreenPhoto[];
  /** Not a credential (that's deviceToken, owner/admin-only) — an opaque id for GET /devices/:deviceId/preview/mine. */
  deviceId: string | null;
  /** Only present when the search was a "near me" query (lat/lng passed). */
  distanceKm?: number;
  /** Guaranteed plays a day for a 15s ad at Standard frequency — the card's "Estimated plays" figure. */
  estimatedPlaysPerDay: number;
}

export interface ScreenPhoto {
  id: string;
  photoType: string;
  originalFilename: string;
  uploadedAt: string;
  downloadUrl: string;
}

// Mirrors cs-api/src/modules/screens/screens.validators.js REVENUE_MODELS —
// keep in sync if that list changes.
export const REVENUE_MODELS = [
  { value: "EXISTING_SCREEN_OWNER", label: "Existing Screen Owner (70% you / 30% CASTADI)" },
  { value: "AUTO_CAB_DRIVER", label: "Auto & Cab Driver (80% you / 20% CASTADI)" },
  { value: "MANAGED_INVESTOR", label: "Managed / Investor (60% you / 40% CASTADI)" },
] as const;

export const INTERNET_TYPES = [
  { value: "WIFI", label: "Wi-Fi" },
  { value: "4G", label: "4G" },
  { value: "ETHERNET", label: "Ethernet" },
  { value: "MOBILE_DATA", label: "Mobile Data" },
] as const;

// A screen's as-mounted orientation — see cs-api's 20260101000123 migration.
// The resolution is always stored as-mounted too, so a portrait screen's
// resolution reads e.g. 1080x1920.
export const SCREEN_ORIENTATIONS = [
  { value: "LANDSCAPE", label: "Landscape" },
  { value: "PORTRAIT", label: "Portrait" },
] as const;

export type ScreenOrientation = (typeof SCREEN_ORIENTATIONS)[number]["value"];

// "1920x1080" -> { width, height }; null for anything unparseable.
export function parseResolution(resolution: string | null | undefined): { width: number; height: number } | null {
  const match = resolution?.match(/^\s*(\d+)\s*x\s*(\d+)\s*$/i);
  if (!match) return null;
  const width = Number(match[1]);
  const height = Number(match[2]);
  return width > 0 && height > 0 ? { width, height } : null;
}

/** Rewrites a "WxH" resolution so it matches the orientation (portrait = taller than wide). Unparseable strings pass through unchanged. */
export function orientResolution(resolution: string, orientation: ScreenOrientation): string {
  const parsed = parseResolution(resolution);
  if (!parsed) return resolution;
  const { width, height } = parsed;
  const isPortrait = height > width;
  if ((orientation === "PORTRAIT") === isPortrait || width === height) return `${width}x${height}`;
  return `${height}x${width}`;
}

/** The orientation to show for a screen — the stored value, else derived from its resolution, else null. */
export function screenOrientationOf(screen: { orientation?: ScreenOrientation | null; resolution?: string | null }): ScreenOrientation | null {
  if (screen.orientation) return screen.orientation;
  const parsed = parseResolution(screen.resolution);
  if (!parsed) return null;
  return parsed.height > parsed.width ? "PORTRAIT" : "LANDSCAPE";
}

/** "Landscape" / "Portrait" for display, or null when the shape isn't known. */
export function orientationLabel(screen: { orientation?: ScreenOrientation | null; resolution?: string | null }): string | null {
  const orientation = screenOrientationOf(screen);
  return orientation ? (SCREEN_ORIENTATIONS.find((o) => o.value === orientation)?.label ?? null) : null;
}

export const INSTALLATION_ENVIRONMENTS = [
  { value: "INDOOR", label: "Indoor" },
  { value: "OUTDOOR", label: "Outdoor" },
] as const;

// Common screen size/resolution pairings, for ScreenForm's preset picker —
// selecting one fills both fields at once instead of typing each
// separately. "Custom" (the form's own fallback, not a row here) reveals
// the two plain inputs for anything outside this list.
export const SCREEN_SIZE_PRESETS = [
  { value: "10-720p", label: '10" — 1280x720 (HD)', screenSize: "10 inch", resolution: "1280x720" },
  { value: "15-1080p", label: '15" — 1920x1080 (Full HD)', screenSize: "15 inch", resolution: "1920x1080" },
  { value: "21-1080p", label: '21" — 1920x1080 (Full HD)', screenSize: "21 inch", resolution: "1920x1080" },
  { value: "32-1080p", label: '32" — 1920x1080 (Full HD)', screenSize: "32 inch", resolution: "1920x1080" },
  { value: "43-4k", label: '43" — 3840x2160 (4K)', screenSize: "43 inch", resolution: "3840x2160" },
  { value: "55-4k", label: '55" — 3840x2160 (4K)', screenSize: "55 inch", resolution: "3840x2160" },
] as const;

export const PHOTO_TYPES = [
  { value: "FRONT_VIEW", label: "Front view" },
  { value: "SIDE_VIEW", label: "Side view" },
  { value: "INSTALLED_VIEW", label: "Installed view" },
  { value: "SURROUNDING_AREA", label: "Surrounding area" },
  { value: "DEVICE_SERIAL_PHOTO", label: "Device serial number" },
] as const;

// Onboarding spec's "Short Video (10-20 sec)" — reuses the same upload
// endpoint/table as photos (backend enforces mime type video/mp4 + 20MB cap
// for this one type specifically).
export const VIDEO_PHOTO_TYPE = "INSTALLATION_VIDEO";
