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
