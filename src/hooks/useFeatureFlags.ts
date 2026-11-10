import { useQuery } from "@tanstack/react-query";
import { apiGet } from "../api/client";
import { getAccessToken, useHasSession } from "../api/session";
import type { FeatureFlag } from "../types/featureFlags";

// The list is public, but flags marked sensitive are only returned to a caller
// holding featureFlags:manage — so send the token when there is one, and key the
// cache on signed-in vs anonymous. Read-only here: toggling flags is an admin job on the web.
export function useFeatureFlagsQuery() {
  const signedIn = useHasSession();
  return useQuery({
    queryKey: ["feature-flags", signedIn],
    queryFn: () => apiGet<FeatureFlag[]>("/feature-flags", getAccessToken()),
    staleTime: 5 * 60_000,
  });
}
