// Ported from cs-web src/hooks/useSavedScreens.ts — keep in sync.
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiDelete, apiGet, apiPatch, apiPost, apiPut } from "../api/client";
import type { DiscoveryScreen } from "../types/screens";
import { getAccessToken, useHasSession } from "../api/session";

// cs-api modules/savedScreens — an advertiser's saved screens (favourites)
// and named screen groups ("Patna Premium Locations").
export interface SavedScreens {
  screenIds: string[];
  screens: DiscoveryScreen[];
}

export interface ScreenGroup {
  id: string;
  name: string;
  screenIds: string[];
  screenCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ScreenGroupDetail extends ScreenGroup {
  screens: DiscoveryScreen[];
}

export function useSavedScreensQuery(enabled = true) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["saved-screens"],
    queryFn: () => apiGet<SavedScreens>("/saved-screens", getAccessToken()),
    enabled: hasAccessToken && enabled,
  });
}

export function useToggleSavedScreenMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ screenId, save }: { screenId: string; save: boolean }) =>
      save
        ? apiPut(`/saved-screens/${screenId}`, undefined, getAccessToken())
        : apiDelete(`/saved-screens/${screenId}`, getAccessToken()),
    // Heart flips instantly; the server call confirms it.
    onMutate: async ({ screenId, save }) => {
      await queryClient.cancelQueries({ queryKey: ["saved-screens"] });
      const previous = queryClient.getQueryData<SavedScreens>(["saved-screens"]);
      if (previous) {
        queryClient.setQueryData<SavedScreens>(["saved-screens"], {
          screenIds: save ? [screenId, ...previous.screenIds] : previous.screenIds.filter((id) => id !== screenId),
          screens: save ? previous.screens : previous.screens.filter((s) => s.id !== screenId),
        });
      }
      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) queryClient.setQueryData(["saved-screens"], context.previous);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["saved-screens"] }),
  });
}

export function useScreenGroupsQuery(enabled = true) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["screen-groups"],
    queryFn: () => apiGet<ScreenGroup[]>("/screen-groups", getAccessToken()),
    enabled: hasAccessToken && enabled,
  });
}

export function useScreenGroupQuery(groupId: string | null) {
  return useQuery({
    queryKey: ["screen-groups", groupId],
    queryFn: () => apiGet<ScreenGroupDetail>(`/screen-groups/${groupId}`, getAccessToken()),
    enabled: !!groupId,
  });
}

export function useCreateScreenGroupMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: { name: string; screenIds: string[] }) =>
      apiPost<ScreenGroup>("/screen-groups", input, getAccessToken()),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["screen-groups"] }),
  });
}

export function useUpdateScreenGroupMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ groupId, ...values }: { groupId: string; name?: string; screenIds?: string[] }) =>
      apiPatch<ScreenGroup>(`/screen-groups/${groupId}`, values, getAccessToken()),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["screen-groups"] }),
  });
}

export function useDeleteScreenGroupMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (groupId: string) => apiDelete(`/screen-groups/${groupId}`, getAccessToken()),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["screen-groups"] }),
  });
}
