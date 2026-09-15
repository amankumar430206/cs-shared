import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiGetPaginated, apiPost } from "../api/client";
import type { AdminRefund, Refund } from "../types/refunds";
import { getAccessToken, session, useHasSession, useSession } from "../api/session";

export function useMyRefundsQuery(page = 1) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["refunds", "mine", page],
    queryFn: () => apiGetPaginated<Refund>(`/refunds?page=${page}`, getAccessToken()),
    enabled: hasAccessToken,
  });
}

export function useCreateRefundRequestMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (campaignId: string) => apiPost<Refund>("/refunds", { campaignId }, getAccessToken()),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["refunds", "mine"] }),
  });
}

export function usePendingRefundsQuery(page: number, options: { enabled?: boolean } = {}) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["refunds", "admin", "pending", page],
    queryFn: () => apiGetPaginated<AdminRefund>(`/refunds/pending?page=${page}`, getAccessToken()),
    enabled: hasAccessToken && (options.enabled ?? true),
  });
}

export function useApproveRefundMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (refundId: string) => apiPost<Refund>(`/refunds/${refundId}/approve`, undefined, getAccessToken()),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["refunds", "admin"] }),
  });
}

export function useRejectRefundMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ refundId, reason }: { refundId: string; reason: string }) =>
      apiPost<Refund>(`/refunds/${refundId}/reject`, { reason }, getAccessToken()),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["refunds", "admin", "pending"] }),
  });
}
