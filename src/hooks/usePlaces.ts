// Ported from cs-web src/hooks/usePlaces.ts — keep in sync.
import { useQuery } from "@tanstack/react-query";
import { apiGet } from "../api/client";
import { getAccessToken, useHasSession } from "../api/session";

// Area / landmark suggestions ("Boring Road, Patna") from cs-api's
// /geo/places (a cached OpenStreetMap lookup). Picking one searches around
// it by distance. Needs 3+ characters; results are cached for the session.
export interface Place {
  label: string;
  name: string;
  city: string | null;
  state: string | null;
  pincode: string | null;
  lat: number;
  lng: number;
}

export function usePlacesQuery(query: string) {
  const q = query.trim();
  return useQuery({
    queryKey: ["geo", "places", q.toLowerCase()],
    queryFn: () => apiGet<Place[]>(`/geo/places?q=${encodeURIComponent(q)}`, getAccessToken()),
    enabled: q.length >= 3,
    staleTime: Infinity,
  });
}
