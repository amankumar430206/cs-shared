import { apiFetchRaw } from "../api/client";
import { getAccessToken } from "../api/session";

// Bypasses apiGet on purpose: a PIN the directory doesn't know is an expected
// "not found", not an error worth surfacing to the user.

export interface PincodeResolution {
  city: string;
  state: string;
  /** which side resolved it — live India Post vs the bundled fallback */
  source: "india_post" | "static";
}

export interface GeoState {
  name: string;
  code: string | null;
}

interface SuccessEnvelope<T> {
  success: true;
  data: T;
}

async function geoGet<T>(path: string): Promise<T> {
  const res = await apiFetchRaw(`/geo${path}`, getAccessToken());
  if (!res.ok) throw new Error(`geo ${path} → ${res.status}`);
  const body = (await res.json()) as SuccessEnvelope<T>;
  return body.data;
}

/** Resolves a 6-digit PIN to { city, state }; `null` when neither source knows it. */
export async function resolvePincode(pincode: string): Promise<PincodeResolution | null> {
  const res = await apiFetchRaw(`/geo/pincode/${pincode}`, getAccessToken());
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`geo pincode lookup failed (${res.status})`);
  const body = (await res.json()) as SuccessEnvelope<PincodeResolution>;
  return body.data;
}

export const listStates = () => geoGet<GeoState[]>("/states");

export const listCities = (state: string) => geoGet<string[]>(`/states/${encodeURIComponent(state)}/cities`);
