// Copied from cs-web src/lib/screenListing.ts — keep in sync.
// Marketplace listing details — mirrors cs-api's screens.validators.js
// (LOCATION_CATEGORIES, AUDIENCE_TAGS, TRAFFIC_TYPES, DISPLAY_TYPES, FACINGS,
// SIZE_BUCKETS). Labels are i18n keys under `listing.*`.
export const LOCATION_CATEGORIES = [
  "PREMIUM_COMMERCIAL",
  "HIGH_STREET",
  "BUSINESS_DISTRICT",
  "RESIDENTIAL",
  "TRANSIT",
  "RETAIL",
  "TOURIST",
  "INSTITUTIONAL",
] as const;
export const AUDIENCE_TAGS = ["STUDENTS", "PROFESSIONALS", "FAMILIES", "SHOPPERS", "COMMUTERS", "TOURISTS"] as const;
export const TRAFFIC_TYPES = ["PEDESTRIAN", "VEHICLE", "BOTH"] as const;
export const DISPLAY_TYPES = ["LCD", "LED", "DIGITAL_BILLBOARD"] as const;
export const FACINGS = ["ROAD_FACING", "INDOOR_FACING"] as const;
export const SIZE_BUCKETS = ["10-20", "21-32", "33-55", "55+"] as const;

export type LocationCategory = (typeof LOCATION_CATEGORIES)[number];
export type AudienceTag = (typeof AUDIENCE_TAGS)[number];
export type TrafficType = (typeof TRAFFIC_TYPES)[number];
export type DisplayType = (typeof DISPLAY_TYPES)[number];
export type Facing = (typeof FACINGS)[number];

export interface ScreenListingDetails {
  area: string | null;
  landmark: string | null;
  pincode: string | null;
  locationCategory: LocationCategory | null;
  audienceTags: AudienceTag[];
  trafficType: TrafficType | null;
  peakHoursStart: string | null;
  peakHoursEnd: string | null;
  weekendFootfall: number | null;
  avgDwellSeconds: number | null;
  displayType: DisplayType | null;
  screenSizeInches: number | null;
  facing: Facing | null;
  viewingDistanceM: number | null;
  visibilityAngle: number | null;
  obstructions: string | null;
  nightVisibility: boolean | null;
  brightnessNits: number | null;
  /** 0-100: how fully the partner has described the screen. Better-described screens rank first. */
  listingCompleteness: number;
}

/** "35,000–45,000" style footfall band for cards — a range reads as an estimate, a single number as a promise. */
export function footfallRange(footfall: number | null | undefined): string | null {
  if (!footfall) return null;
  const round = (n: number) => (n >= 10_000 ? Math.round(n / 5_000) * 5_000 : n >= 1_000 ? Math.round(n / 500) * 500 : Math.round(n / 50) * 50);
  const low = round(footfall * 0.85);
  const high = round(footfall * 1.15);
  return low === high ? low.toLocaleString("en-IN") : `${low.toLocaleString("en-IN")}–${high.toLocaleString("en-IN")}`;
}

/** Monthly price shown alongside the daily one (client spec shows ₹/month). */
export const monthlyPrice = (pricePerDay: number) => Math.round(pricePerDay * 30);
