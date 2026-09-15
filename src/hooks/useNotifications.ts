import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiGet, apiGetPaginated, apiPost, apiPut } from "../api/client";
import { getAccessToken, useHasSession } from "../api/session";
import type { Notification, NotificationPreferences } from "../types/notifications";

// REST half of cs-web/src/hooks/useNotifications.ts. The web SSE stream and
// admin template hooks stay web-only; native gets push instead.
export const NOTIFICATIONS_UNREAD_COUNT_KEY = ["notifications", "unread-count"] as const;
export const NOTIFICATIONS_LIST_KEY = ["notifications", "list"] as const;
export const NOTIFICATIONS_PREFERENCES_KEY = ["notifications", "preferences"] as const;

export function useNotificationsQuery(page: number) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: [...NOTIFICATIONS_LIST_KEY, page],
    queryFn: () => apiGetPaginated<Notification>(`/notifications?page=${page}`, getAccessToken()),
    enabled: hasAccessToken,
  });
}

// Page-at-a-time list for infinite scrolling; shares NOTIFICATIONS_LIST_KEY so mark-read invalidates it too.
export function useNotificationsInfiniteQuery() {
  const hasAccessToken = useHasSession();
  return useInfiniteQuery({
    queryKey: [...NOTIFICATIONS_LIST_KEY, "infinite"],
    queryFn: ({ pageParam }) => apiGetPaginated<Notification>(`/notifications?page=${pageParam}`, getAccessToken()),
    initialPageParam: 1,
    getNextPageParam: (last) => (last.meta.page * last.meta.limit < last.meta.total ? last.meta.page + 1 : undefined),
    enabled: hasAccessToken,
  });
}

export function useUnreadCountQuery(options: { refetchInterval?: number } = {}) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: NOTIFICATIONS_UNREAD_COUNT_KEY,
    queryFn: () => apiGet<{ count: number }>("/notifications/unread-count", getAccessToken()),
    enabled: hasAccessToken,
    refetchInterval: options.refetchInterval,
  });
}

export function useMarkNotificationReadMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiPost<Notification>(`/notifications/${id}/read`, undefined, getAccessToken()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: NOTIFICATIONS_LIST_KEY });
      queryClient.invalidateQueries({ queryKey: NOTIFICATIONS_UNREAD_COUNT_KEY });
    },
  });
}

export function useMarkAllNotificationsReadMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => apiPost<{ count: number }>("/notifications/read-all", undefined, getAccessToken()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: NOTIFICATIONS_LIST_KEY });
      queryClient.invalidateQueries({ queryKey: NOTIFICATIONS_UNREAD_COUNT_KEY });
    },
  });
}

export function useNotificationPreferencesQuery() {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: NOTIFICATIONS_PREFERENCES_KEY,
    queryFn: () => apiGet<NotificationPreferences>("/notifications/preferences", getAccessToken()),
    enabled: hasAccessToken,
  });
}

// Partial by design — the backend merges omitted channels with current values.
export function useUpdateNotificationPreferencesMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: Partial<Omit<NotificationPreferences, "updatedAt">>) =>
      apiPut<NotificationPreferences>("/notifications/preferences", input, getAccessToken()),
    onSuccess: (updated) => {
      queryClient.setQueryData(NOTIFICATIONS_PREFERENCES_KEY, updated);
    },
  });
}

/** Call when a push arrives while the app is open, so badges/lists catch up without polling. */
export function useInvalidateNotifications() {
  const queryClient = useQueryClient();
  return () => {
    queryClient.invalidateQueries({ queryKey: NOTIFICATIONS_LIST_KEY });
    queryClient.invalidateQueries({ queryKey: NOTIFICATIONS_UNREAD_COUNT_KEY });
  };
}
