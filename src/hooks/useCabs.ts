import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { apiGetPaginated, apiPost } from "../api/client";
import { getAccessToken, useHasSession } from "../api/session";
import type { DiscoveryScreen } from "../types/screens";

// Cabs & Autos shown by place — copied from cs-web hooks/useCabs.ts, keep in sync.
// cs-api: GET /screens/cab-locations and POST /screens/cab-picks.

export interface CabLocation {
  city: string;
  state: string;
  /** Set only when grouped by area within a city. */
  area: string | null;
  /** Cabs bookable now. */
  cabCount: number;
  liveCount: number;
  minPrice: number;
  maxPrice: number;
  avgPrice: number;
}

export interface CabLocationFilters {
  /** "CAB", "AUTO_RICKSHAW" or both comma-separated; empty = both. */
  categoryCode?: string;
  search?: string;
  state?: string;
  city?: string;
  maxPrice?: number;
  live?: boolean;
  sort?: "count" | "price" | "name";
  groupBy?: "city" | "area";
}

export function useCabLocationsQuery(filters: CabLocationFilters, page = 1, limit = 12, enabled = true) {
  const hasToken = useHasSession();
  return useQuery({
    queryKey: ["cabs", "locations", filters, page, limit],
    queryFn: () => {
      const query = new URLSearchParams({ page: String(page), limit: String(limit) });
      for (const [key, value] of Object.entries(filters)) {
        if (value === undefined || value === "" || value === false) continue;
        query.set(key, String(value));
      }
      return apiGetPaginated<CabLocation>(`/screens/cab-locations?${query.toString()}`, getAccessToken());
    },
    placeholderData: keepPreviousData,
    enabled: hasToken && enabled,
  });
}

export interface CabPickRequestLocation {
  city: string;
  state?: string;
  area?: string;
  /** Cabs wanted in total for this place, including `fixedIds`. */
  count: number;
  /** Cabs the advertiser chose by hand; the rest are auto-picked. */
  fixedIds?: string[];
  /** Cabs the advertiser removed or swapped out. */
  excludeIds?: string[];
}

export interface CabPickRequest {
  locations: CabPickRequestLocation[];
  categoryCode?: string;
  maxPrice?: number;
  live?: boolean;
}

export interface PickedCab extends DiscoveryScreen {
  chosenByYou: boolean;
}

export interface CabPickLocation {
  city: string;
  state: string | null;
  area: string | null;
  requested: number;
  picked: PickedCab[];
  /** How many fewer than requested were available. */
  shortfall: number;
}

export interface CabPicks {
  total: number;
  locations: CabPickLocation[];
}

/** The exact cabs for "N cabs in each place", live first then cheapest. Re-resolves whenever the request changes. */
export function useCabPicksQuery(request: CabPickRequest | null) {
  const hasToken = useHasSession();
  return useQuery({
    queryKey: ["cabs", "picks", request],
    queryFn: () => apiPost<CabPicks>("/screens/cab-picks", request, getAccessToken()),
    placeholderData: keepPreviousData,
    enabled: hasToken && !!request && request.locations.length > 0,
    staleTime: 30_000,
  });
}
