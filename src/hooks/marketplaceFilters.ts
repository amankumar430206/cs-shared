// Copied from cs-web src/components/marketplace/marketplaceFilters.ts — keep in sync.
import type { ScreenSearchFilters } from "./useScreens";

// Everything the marketplace can be narrowed by, in one plain object — the
// filter drawer edits it, toSearchFilters turns it into cs-api's query.
export interface MarketplaceFilterState {
  /** Free text: screen name, area, landmark, address, city — or a 6-digit PIN. */
  text: string;
  /** A picked place (area/landmark suggestion) or "near me" — searches around it. */
  center: { lat: number; lng: number; label: string } | null;
  radiusKm: number;
  locationCategories: string[];
  categoryCodes: string[];
  audience: string[];
  traffic: "" | "PEDESTRIAN" | "VEHICLE";
  displayTypes: string[];
  environment: "" | "INDOOR" | "OUTDOOR";
  sizeBuckets: string[];
  maxPricePerDay: number | null;
  dates: { from: string; to: string } | null;
}

export const EMPTY_FILTERS: MarketplaceFilterState = {
  text: "",
  center: null,
  radiusKm: 5,
  locationCategories: [],
  categoryCodes: [],
  audience: [],
  traffic: "",
  displayTypes: [],
  environment: "",
  sizeBuckets: [],
  maxPricePerDay: null,
  dates: null,
};

/** How many drawer filters are on — the badge on the Filters button. */
export function activeFilterCount(f: MarketplaceFilterState): number {
  return (
    f.locationCategories.length +
    f.categoryCodes.length +
    f.audience.length +
    (f.traffic ? 1 : 0) +
    f.displayTypes.length +
    (f.environment ? 1 : 0) +
    f.sizeBuckets.length +
    (f.maxPricePerDay != null ? 1 : 0) +
    (f.dates ? 1 : 0)
  );
}

const csv = (values: string[]) => (values.length ? values.join(",") : undefined);

export function toSearchFilters(f: MarketplaceFilterState, text: string): ScreenSearchFilters {
  const trimmed = text.trim();
  const isPin = /^\d{6}$/.test(trimmed);
  return {
    search: !isPin && !f.center && trimmed ? trimmed : undefined,
    pincode: isPin ? trimmed : undefined,
    lat: f.center ? String(f.center.lat) : undefined,
    lng: f.center ? String(f.center.lng) : undefined,
    radiusKm: f.center ? String(f.radiusKm) : undefined,
    locationCategory: csv(f.locationCategories),
    categoryCode: csv(f.categoryCodes),
    audience: csv(f.audience),
    traffic: f.traffic || undefined,
    displayType: csv(f.displayTypes),
    environment: f.environment || undefined,
    sizeBucket: csv(f.sizeBuckets),
    maxPrice: f.maxPricePerDay != null ? String(f.maxPricePerDay) : undefined,
    availableFrom: f.dates?.from,
    availableTo: f.dates?.to,
  };
}
