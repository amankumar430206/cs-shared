import { useQuery } from "@tanstack/react-query";
import { apiGet } from "../api/client";
import { getAccessToken, useHasSession } from "../api/session";

// Ported from cs-web's hooks/useTheme.ts (read-only half; the admin mutation stays web-only).
export interface ScreenPhotoRequirements {
  minPhotos: number;
  maxPhotos: number;
  source: "code-default" | "admin";
}

const DEFAULT_SCREEN_PHOTO_REQUIREMENTS: ScreenPhotoRequirements = { minPhotos: 3, maxPhotos: 5, source: "code-default" };

export function useScreenPhotoRequirementsQuery() {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["settings", "screen-photo-requirements"],
    queryFn: () => apiGet<ScreenPhotoRequirements>("/settings/screen-photo-requirements", getAccessToken()),
    enabled: hasAccessToken,
    initialData: DEFAULT_SCREEN_PHOTO_REQUIREMENTS,
    initialDataUpdatedAt: 0,
  });
}

// cs-api's public GET /settings/app-config — cs-mobile's launch check for forced updates and
// maintenance. Public (no session needed): it runs before sign-in.
export interface AppConfig {
  minSupportedVersion: string;
  latestVersion: string;
  maintenanceEnabled: boolean;
  maintenanceMessage: string | null;
  androidStoreUrl: string | null;
  iosStoreUrl: string | null;
  source: "code-default" | "admin";
}

export function useAppConfigQuery() {
  return useQuery({
    queryKey: ["settings", "app-config"],
    queryFn: () => apiGet<AppConfig>("/settings/app-config"),
    staleTime: 5 * 60_000,
    // A failed check must never lock people out of the app; callers treat "no data" as "all clear".
    retry: 1,
  });
}

/** Compares MAJOR.MINOR.PATCH strings: negative when a < b, 0 when equal, positive when a > b. */
export function compareAppVersions(a: string, b: string): number {
  const pa = a.split(".").map((part) => Number.parseInt(part, 10) || 0);
  const pb = b.split(".").map((part) => Number.parseInt(part, 10) || 0);
  for (let i = 0; i < 3; i += 1) {
    const diff = (pa[i] ?? 0) - (pb[i] ?? 0);
    if (diff !== 0) return diff;
  }
  return 0;
}
