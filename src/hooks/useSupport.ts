import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiGet, apiGetPaginated, apiPatch, apiPost, apiPut } from "../api/client";
import type {
  AssignmentTeam,
  SlaConfig,
  Ticket,
  TicketCategory,
  TicketDetail,
  TicketMessage,
  TicketPriority,
  TicketStatus,
} from "../types/support";
import { getAccessToken, session, useHasSession, useSession } from "../api/session";

export interface CreateTicketInput {
  category: TicketCategory;
  subject: string;
  description: string;
  priority?: TicketPriority;
}

export function useCreateTicketMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateTicketInput) => apiPost<Ticket>("/support/tickets", input, getAccessToken()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["support", "mine"] });
    },
  });
}

export function useMyTicketsQuery(page: number, status?: TicketStatus) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["support", "mine", page, status ?? null],
    queryFn: () => {
      const query = new URLSearchParams({ page: String(page) });
      if (status) query.set("status", status);
      return apiGetPaginated<Ticket>(`/support/tickets/mine?${query.toString()}`, getAccessToken());
    },
    enabled: hasAccessToken,
  });
}

// Infinite-scroll variant for cs-mobile's ticket list; shares the ["support", "mine"] prefix so every existing
// invalidation (create, reply, reopen…) refreshes it too.
export function useMyTicketsInfiniteQuery(status?: TicketStatus) {
  const hasAccessToken = useHasSession();
  return useInfiniteQuery({
    queryKey: ["support", "mine", "infinite", status ?? null],
    queryFn: ({ pageParam }) => {
      const query = new URLSearchParams({ page: String(pageParam) });
      if (status) query.set("status", status);
      return apiGetPaginated<Ticket>(`/support/tickets/mine?${query.toString()}`, getAccessToken());
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.meta.page * lastPage.meta.limit < lastPage.meta.total ? lastPage.meta.page + 1 : undefined,
    enabled: hasAccessToken,
  });
}

export interface AdminTicketFilters {
  status?: TicketStatus;
  category?: TicketCategory;
  priority?: TicketPriority;
  assignedTo?: string;
}

export function useAdminTicketsQuery(page: number, filters: AdminTicketFilters = {}, options: { enabled?: boolean } = {}) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["support", "admin", page, filters],
    queryFn: () => {
      const query = new URLSearchParams({ page: String(page) });
      if (filters.status) query.set("status", filters.status);
      if (filters.category) query.set("category", filters.category);
      if (filters.priority) query.set("priority", filters.priority);
      if (filters.assignedTo) query.set("assignedTo", filters.assignedTo);
      return apiGetPaginated<Ticket>(`/support/tickets?${query.toString()}`, getAccessToken());
    },
    enabled: hasAccessToken && (options.enabled ?? true),
  });
}

// refetchInterval: cs-mobile has no SSE stream, so an open thread polls for new replies instead.
export function useTicketDetailQuery(ticketId: string, options: { refetchInterval?: number } = {}) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["support", "ticket", ticketId],
    queryFn: () => apiGet<TicketDetail>(`/support/tickets/${ticketId}`, getAccessToken()),
    enabled: hasAccessToken && !!ticketId,
    refetchInterval: options.refetchInterval,
  });
}

function invalidateTicket(queryClient: ReturnType<typeof useQueryClient>, ticketId: string) {
  queryClient.invalidateQueries({ queryKey: ["support", "ticket", ticketId] });
  queryClient.invalidateQueries({ queryKey: ["support", "mine"] });
  queryClient.invalidateQueries({ queryKey: ["support", "admin"] });
}

export function useAddTicketMessageMutation(ticketId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: { message: string; isInternalNote?: boolean }) =>
      apiPost<TicketMessage>(`/support/tickets/${ticketId}/messages`, input, getAccessToken()),
    onSuccess: () => invalidateTicket(queryClient, ticketId),
  });
}

export function useAssignTicketMutation(ticketId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: { assignedTo?: string | null; assignedTeam?: AssignmentTeam | null }) =>
      apiPatch<Ticket>(`/support/tickets/${ticketId}/assign`, input, getAccessToken()),
    onSuccess: () => invalidateTicket(queryClient, ticketId),
  });
}

export function useUpdateTicketStatusMutation(ticketId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (status: TicketStatus) =>
      apiPatch<Ticket>(`/support/tickets/${ticketId}/status`, { status }, getAccessToken()),
    onSuccess: () => invalidateTicket(queryClient, ticketId),
  });
}

export function useResolveTicketMutation(ticketId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (resolutionSummary: string) =>
      apiPost<Ticket>(`/support/tickets/${ticketId}/resolve`, { resolutionSummary }, getAccessToken()),
    onSuccess: () => invalidateTicket(queryClient, ticketId),
  });
}

export function useCloseTicketMutation(ticketId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => apiPost<Ticket>(`/support/tickets/${ticketId}/close`, undefined, getAccessToken()),
    onSuccess: () => invalidateTicket(queryClient, ticketId),
  });
}

export function useReopenTicketMutation(ticketId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => apiPost<Ticket>(`/support/tickets/${ticketId}/reopen`, undefined, getAccessToken()),
    onSuccess: () => invalidateTicket(queryClient, ticketId),
  });
}

export function useSubmitTicketFeedbackMutation(ticketId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: { rating: number; comment?: string }) =>
      apiPost<Ticket>(`/support/tickets/${ticketId}/feedback`, input, getAccessToken()),
    onSuccess: () => invalidateTicket(queryClient, ticketId),
  });
}

// --- SLA management (admin) ------------------------------------------

export function useSlaConfigsQuery() {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["support", "sla-config"],
    queryFn: () => apiGet<SlaConfig[]>("/support/sla-config", getAccessToken()),
    enabled: hasAccessToken,
  });
}

export function useUpdateSlaConfigMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ priority, ...input }: { priority: TicketPriority; firstResponseMinutes?: number; resolutionMinutes?: number }) =>
      apiPut<SlaConfig>(`/support/sla-config/${priority}`, input, getAccessToken()),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["support", "sla-config"] }),
  });
}
