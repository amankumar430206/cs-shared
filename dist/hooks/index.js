import { buildReportQuery, isReportQueryable } from '../chunk-WRV2ZKUS.js';
import { useHasSession, apiGet, getAccessToken, session, apiPost, apiPatch, apiGetPaginated, apiUpload, apiDelete, apiPut, useSession, apiRequest } from '../chunk-LNWNAJHB.js';
import { useQuery, useQueryClient, useMutation, useInfiniteQuery, keepPreviousData, useQueries } from '@tanstack/react-query';

function useAdvertiserAnalyticsQuery() {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["analytics", "advertiser"],
    queryFn: () => apiGet("/analytics/advertiser", getAccessToken()),
    enabled: hasAccessToken
  });
}
function usePartnerAnalyticsQuery() {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["analytics", "partner"],
    queryFn: () => apiGet("/analytics/partner", getAccessToken()),
    enabled: hasAccessToken
  });
}
function useCampaignAnalyticsQuery(campaignId) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["analytics", "campaign", campaignId],
    queryFn: () => apiGet(`/analytics/campaign/${campaignId}`, getAccessToken()),
    enabled: hasAccessToken
  });
}
function useCampaignTrendQuery(campaignId) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["analytics", "campaign", campaignId, "trend"],
    queryFn: () => apiGet(`/analytics/campaign/${campaignId}/trend`, getAccessToken()),
    enabled: hasAccessToken
  });
}
function useScreenAnalyticsQuery(screenId) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["analytics", "screen", screenId],
    queryFn: () => apiGet(`/analytics/screen/${screenId}`, getAccessToken()),
    enabled: hasAccessToken && !!screenId
  });
}
function useAdminOverviewQuery() {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["analytics", "admin", "overview"],
    queryFn: () => apiGet("/analytics/admin/overview", getAccessToken()),
    enabled: hasAccessToken
  });
}
function useAdminRevenueQuery(granularity) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["analytics", "admin", "revenue", granularity],
    queryFn: () => apiGet(`/analytics/admin/revenue?granularity=${granularity}`, getAccessToken()),
    enabled: hasAccessToken
  });
}
function useAdminGeographicQuery() {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["analytics", "admin", "geographic"],
    queryFn: () => apiGet("/analytics/admin/geographic", getAccessToken()),
    enabled: hasAccessToken
  });
}
function useAdminBookingFunnelQuery() {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["analytics", "admin", "booking-funnel"],
    queryFn: () => apiGet("/analytics/admin/booking-funnel", getAccessToken()),
    enabled: hasAccessToken
  });
}
function useAdminRefundTrendQuery() {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["analytics", "admin", "refund-trend"],
    queryFn: () => apiGet("/analytics/admin/refund-trend", getAccessToken()),
    enabled: hasAccessToken
  });
}
function useAdminFinanceQuery(granularity) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["analytics", "admin", "finance", granularity],
    queryFn: () => apiGet(`/analytics/admin/finance?granularity=${granularity}`, getAccessToken()),
    enabled: hasAccessToken
  });
}
function buildTaxLedgerQuery(params) {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== void 0 && value !== "") query.set(key, String(value));
  }
  const qs = query.toString();
  return qs ? `?${qs}` : "";
}
function useAdminTaxLedgerQuery(page, filters) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["analytics", "admin", "tax-ledger", page, filters],
    queryFn: () => apiGet(`/analytics/admin/tax-ledger${buildTaxLedgerQuery({ page, ...filters })}`, getAccessToken()),
    enabled: hasAccessToken
  });
}
function useProofOfPlayQuery(campaignId, enabled = true) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["analytics", "proof-of-play", campaignId],
    queryFn: () => apiGet(`/analytics/campaign/${campaignId}/proof-of-play`, getAccessToken()),
    enabled: hasAccessToken && !!campaignId && enabled
  });
}
var proofOfPlayExportPath = (campaignId, format) => `/analytics/campaign/${campaignId}/proof-of-play/export?format=${format}`;
var campaignReportPath = (campaignId) => `/analytics/campaign/${campaignId}/report`;
function useReportQuery(key, path, filters, extra) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["reports", ...key, filters, extra],
    queryFn: () => apiGet(`/analytics/reports/${path}?${buildReportQuery(filters, extra)}`, getAccessToken()),
    enabled: hasAccessToken && isReportQueryable(filters),
    placeholderData: keepPreviousData
  });
}
var usePlaysSummaryQuery = (f) => useReportQuery(["plays", "summary"], "summary", f);
var usePlaysTimeseriesQuery = (f, granularity, groupBy) => useReportQuery(["plays", "timeseries"], "timeseries", f, { granularity, groupBy });
var usePlaysBreakdownQuery = (f, groupBy) => useReportQuery(["plays", "breakdown"], "breakdown", f, { groupBy });
var usePlaysHeatmapQuery = (f) => useReportQuery(["plays", "heatmap"], "heatmap", { ...f, range: "30d", from: void 0, to: void 0 });
function useReportFilterOptionsQuery() {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["reports", "filters"],
    queryFn: () => apiGet("/analytics/reports/filters?range=30d", getAccessToken()),
    enabled: hasAccessToken,
    staleTime: 5 * 6e4
  });
}
var useRevenueSummaryQuery = (f) => useReportQuery(["revenue", "summary"], "revenue/summary", f);
var useRevenueTimeseriesQuery = (f, granularity, groupBy) => useReportQuery(["revenue", "timeseries"], "revenue/timeseries", f, { granularity, groupBy });
var useRevenueBreakdownQuery = (f, groupBy) => useReportQuery(["revenue", "breakdown"], "revenue/breakdown", f, { groupBy });
var playsExportPath = (f, groupBy, format) => `/analytics/reports/export?${buildReportQuery(f, { groupBy, format })}`;
var revenueExportPath = (f, groupBy, format) => `/analytics/reports/revenue/export?${buildReportQuery(f, { groupBy, format })}`;
function useMeQuery() {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["auth", "me"],
    queryFn: () => apiGet("/auth/me", getAccessToken()),
    enabled: hasAccessToken
  });
}
function useLoginMutation() {
  const setSession = session.setTokens;
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input) => apiPost("/auth/login", input),
    onSuccess: async (tokens) => {
      setSession(tokens);
      await queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
    }
  });
}
function useGoogleLoginMutation() {
  return useMutation({
    mutationFn: (input) => apiPost("/auth/google", input)
  });
}
function useGoogleCompleteMutation() {
  return useMutation({
    mutationFn: (input) => apiPost("/auth/google/complete", input)
  });
}
function useRegisterMutation() {
  return useMutation({
    mutationFn: (input) => apiPost("/auth/register", input)
  });
}
function useCheckAvailabilityMutation() {
  return useMutation({
    mutationFn: (input) => apiPost("/auth/check-availability", input)
  });
}
function useVerifyOtpMutation() {
  const setSession = session.setTokens;
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input) => apiPost("/auth/verify-otp", input),
    onSuccess: async (tokens) => {
      setSession(tokens);
      await queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
    }
  });
}
function useSendMobileOtpMutation() {
  return useMutation({
    mutationFn: (userId) => apiPost("/auth/send-mobile-otp", { userId })
  });
}
function useVerifyMobileOtpMutation() {
  const setSession = session.setTokens;
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input) => apiPost("/auth/verify-mobile-otp", input),
    onSuccess: async (tokens) => {
      setSession(tokens);
      await queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
    }
  });
}
function useSendEmailLinkMutation() {
  return useMutation({
    mutationFn: (userId) => apiPost("/auth/send-email-link", { userId })
  });
}
function useVerifyEmailMutation() {
  const setSession = session.setTokens;
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (token) => apiPost("/auth/verify-email", { token }),
    onSuccess: async (tokens) => {
      setSession(tokens);
      await queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
    }
  });
}
function useSendEmailOtpMutation() {
  return useMutation({
    mutationFn: (userId) => apiPost("/auth/send-email-otp", { userId })
  });
}
function useVerifyEmailOtpMutation() {
  const setSession = session.setTokens;
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input) => apiPost("/auth/verify-email-otp", input),
    onSuccess: async (tokens) => {
      setSession(tokens);
      await queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
    }
  });
}
function useResetPasswordMutation() {
  return useMutation({
    mutationFn: (input) => apiPost("/auth/reset-password", input)
  });
}
function useChangePasswordMutation() {
  return useMutation({
    mutationFn: (input) => apiPatch("/auth/change-password", input, getAccessToken())
  });
}
function useUpdateProfileMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input) => apiPatch("/auth/me", input, getAccessToken()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
    }
  });
}
function useChangeMobileNumberMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input) => apiPatch("/auth/me/mobile-number", input, getAccessToken()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
    }
  });
}
function useChangeEmailMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input) => apiPatch("/auth/me/email", input, getAccessToken()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
    }
  });
}
function useLogout() {
  const logout = session.clear;
  const queryClient = useQueryClient();
  return () => {
    logout();
    queryClient.removeQueries({ queryKey: ["auth", "me"] });
  };
}
function useCampaignBookingsQuery(campaignId) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["bookings", "campaign", campaignId],
    queryFn: () => apiGet(`/bookings/campaign/${campaignId}`, getAccessToken()),
    enabled: hasAccessToken && !!campaignId
  });
}
function useMyPartnerBookingsQuery() {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["bookings", "partner"],
    queryFn: () => apiGet("/bookings/partner", getAccessToken()),
    enabled: hasAccessToken
  });
}
var PARTNER_BOOKINGS_PAGE_LIMIT = 20;
function useMyPartnerBookingsListQuery(filters) {
  const hasAccessToken = useHasSession();
  return useInfiniteQuery({
    queryKey: ["bookings", "partner", "list", filters],
    queryFn: ({ pageParam }) => {
      const query = new URLSearchParams({ page: String(pageParam), limit: String(PARTNER_BOOKINGS_PAGE_LIMIT) });
      if (filters.status) query.set("status", filters.status);
      return apiGetPaginated(`/bookings/partner/list?${query.toString()}`, getAccessToken());
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.meta.page * lastPage.meta.limit < lastPage.meta.total ? lastPage.meta.page + 1 : void 0,
    enabled: hasAccessToken
  });
}
function useMyBookingsQuery(page, limit = 10, status) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["bookings", "mine", page, limit, status],
    queryFn: () => {
      const query = new URLSearchParams({ page: String(page), limit: String(limit) });
      if (status) query.set("status", status);
      return apiGetPaginated(`/bookings/mine?${query.toString()}`, getAccessToken());
    },
    enabled: hasAccessToken
  });
}
function useScreenQuery(screenId) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["screens", screenId],
    queryFn: () => apiGet(`/screens/${screenId}`, getAccessToken()),
    enabled: hasAccessToken && !!screenId
  });
}
function useScreenAvailabilityQuery(screenId) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["bookings", "screen-availability", screenId],
    queryFn: () => apiGet(`/bookings/screens/${screenId}/availability`, getAccessToken()),
    enabled: hasAccessToken && !!screenId
  });
}
function useScreenBookingTimelineQuery(screenId) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["bookings", "screen-timeline", screenId],
    queryFn: () => apiGet(`/bookings/screens/${screenId}/timeline`, getAccessToken()),
    enabled: hasAccessToken && !!screenId
  });
}
function usePriceEstimateQuery(screenIds, startDate, endDate) {
  return useQuery({
    queryKey: ["pricing", "estimate", screenIds, startDate, endDate],
    queryFn: () => apiPost(
      "/pricing/estimate",
      { screenIds, startDate, endDate },
      getAccessToken()
    ),
    enabled: screenIds.length > 0
  });
}
function useCreateBookingMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input) => apiPost("/bookings", input, getAccessToken()),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["bookings", "campaign", variables.campaignId] });
      queryClient.invalidateQueries({ queryKey: ["campaigns", variables.campaignId] });
      queryClient.invalidateQueries({ queryKey: ["screens", "search"] });
    }
  });
}
function useCancelBookingMutation(campaignId) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (bookingId) => apiPost(`/bookings/${bookingId}/cancel`, void 0, getAccessToken()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings", "campaign", campaignId] });
    }
  });
}
function useDisassociateBookingMutation(campaignId) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (bookingId) => apiPost(`/bookings/${bookingId}/disassociate`, void 0, getAccessToken()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings", "campaign", campaignId] });
    }
  });
}
function invalidateSelfReservationViews(queryClient, screenId) {
  queryClient.invalidateQueries({ queryKey: ["bookings", "self-reservations", "screen", screenId] });
  queryClient.invalidateQueries({ queryKey: ["bookings", "self-reservations", "pending"] });
  queryClient.invalidateQueries({ queryKey: ["bookings", "screen-availability", screenId] });
  queryClient.invalidateQueries({ queryKey: ["bookings", "screen-timeline", screenId] });
}
function useScreenSelfReservationsQuery(screenId) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["bookings", "self-reservations", "screen", screenId],
    queryFn: () => apiGet(`/bookings/screens/${screenId}/self-reservations`, getAccessToken()),
    enabled: hasAccessToken && !!screenId
  });
}
function useRequestSelfReservationMutation(screenId) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input) => apiPost(`/bookings/screens/${screenId}/self-reservations`, input, getAccessToken()),
    onSuccess: () => invalidateSelfReservationViews(queryClient, screenId)
  });
}
function useCancelSelfReservationMutation(screenId) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => apiPost(`/bookings/self-reservations/${id}/cancel`, void 0, getAccessToken()),
    onSuccess: () => invalidateSelfReservationViews(queryClient, screenId)
  });
}
function useUpdateSelfReservationMutation(screenId) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...input }) => apiPatch(`/bookings/self-reservations/${id}`, input, getAccessToken()),
    onSuccess: () => invalidateSelfReservationViews(queryClient, screenId)
  });
}
function usePendingSelfReservationsQuery(page, limit = 20, options = {}) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["bookings", "self-reservations", "pending", page, limit],
    queryFn: () => apiGetPaginated(
      `/bookings/self-reservations/pending?page=${page}&limit=${limit}`,
      getAccessToken()
    ),
    enabled: hasAccessToken && (options.enabled ?? true)
  });
}
function useApproveSelfReservationMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id }) => apiPost(`/bookings/self-reservations/${id}/approve`, void 0, getAccessToken()),
    onSuccess: (_data, { screenId }) => invalidateSelfReservationViews(queryClient, screenId)
  });
}
function useRejectSelfReservationMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, reason }) => apiPost(`/bookings/self-reservations/${id}/reject`, { reason }, getAccessToken()),
    onSuccess: (_data, { screenId }) => invalidateSelfReservationViews(queryClient, screenId)
  });
}
function useCheckAvailabilityQuery(params) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["bookings", "check-availability", params],
    queryFn: () => apiPost("/bookings/check-availability", params, getAccessToken()),
    enabled: hasAccessToken && !!params && params.screenIds.length > 0 && !!params.startDate && !!params.endDate
  });
}
function useMyCampaignsQuery() {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["campaigns", "me"],
    queryFn: () => apiGet("/campaigns/me", getAccessToken()),
    enabled: hasAccessToken
  });
}
var CAMPAIGNS_PAGE_LIMIT = 20;
function useMyCampaignsListQuery(filters) {
  const hasAccessToken = useHasSession();
  return useInfiniteQuery({
    queryKey: ["campaigns", "list", filters],
    queryFn: ({ pageParam }) => {
      const query = new URLSearchParams({ page: String(pageParam), limit: String(CAMPAIGNS_PAGE_LIMIT) });
      if (filters.status) query.set("status", filters.status);
      if (filters.search) query.set("search", filters.search);
      if (filters.live) query.set("live", "true");
      return apiGetPaginated(`/campaigns?${query.toString()}`, getAccessToken());
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.meta.page * lastPage.meta.limit < lastPage.meta.total ? lastPage.meta.page + 1 : void 0,
    enabled: hasAccessToken
  });
}
function useCampaignQuery(id) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["campaigns", id],
    queryFn: () => apiGet(`/campaigns/${id}`, getAccessToken()),
    enabled: hasAccessToken && !!id
  });
}
function useCreateCampaignMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (values) => apiPost("/campaigns", values, getAccessToken()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["campaigns", "me"] });
      queryClient.invalidateQueries({ queryKey: ["campaigns", "list"] });
    }
  });
}
function useDuplicateCampaignMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ campaignId, startDate, endDate }) => apiPost(`/campaigns/${campaignId}/duplicate`, { startDate, endDate }, getAccessToken()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["campaigns", "me"] });
      queryClient.invalidateQueries({ queryKey: ["campaigns", "list"] });
    }
  });
}
function invalidateCampaignViews(queryClient, campaignId) {
  queryClient.invalidateQueries({ queryKey: ["campaigns", campaignId] });
  queryClient.invalidateQueries({ queryKey: ["campaigns", "me"] });
  queryClient.invalidateQueries({ queryKey: ["campaigns", "list"] });
}
function useUploadCampaignBannerMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ campaignId, file }) => {
      const formData = new FormData();
      formData.append("file", file);
      return apiUpload(`/campaigns/${campaignId}/banners`, formData, getAccessToken());
    },
    onSuccess: (_data, { campaignId }) => invalidateCampaignViews(queryClient, campaignId)
  });
}
function useDeleteCampaignBannerMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ campaignId, bannerId }) => apiDelete(`/campaigns/${campaignId}/banners/${bannerId}`, getAccessToken()),
    onSuccess: (_data, { campaignId }) => invalidateCampaignViews(queryClient, campaignId)
  });
}
function useUpdateCampaignBudgetMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ campaignId, totalBudget }) => apiPatch(`/campaigns/${campaignId}`, { totalBudget }, getAccessToken()),
    onSuccess: (_data, { campaignId }) => invalidateCampaignViews(queryClient, campaignId)
  });
}
function useCancelCampaignMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (campaignId) => apiPost(`/campaigns/${campaignId}/cancel`, void 0, getAccessToken()),
    onSuccess: (_data, campaignId) => {
      queryClient.invalidateQueries({ queryKey: ["campaigns", "me"] });
      queryClient.invalidateQueries({ queryKey: ["campaigns", "list"] });
      queryClient.invalidateQueries({ queryKey: ["campaigns", campaignId] });
    }
  });
}
function useCampaignQuoteQuery(input) {
  return useQuery({
    queryKey: ["pricing", "quote", input],
    queryFn: () => apiPost("/pricing/estimate", input, getAccessToken()),
    enabled: !!input && input.screenIds.length > 0 && !!input.startDate && !!input.endDate,
    placeholderData: keepPreviousData
  });
}
function useDeliveryConfigQuery() {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["settings", "delivery"],
    queryFn: () => apiGet("/settings/delivery", getAccessToken()),
    enabled: hasAccessToken,
    staleTime: 10 * 6e4
  });
}
function usePaymentsConfigQuery() {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["settings", "payments"],
    queryFn: () => apiGet("/settings/payments", getAccessToken()),
    enabled: hasAccessToken
  });
}
function useUpdateCampaignMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ campaignId, values }) => apiPatch(`/campaigns/${campaignId}`, values, getAccessToken()),
    onSuccess: (campaign) => {
      queryClient.setQueryData(["campaigns", campaign.id], (old) => ({ ...old, ...campaign }));
      queryClient.invalidateQueries({ queryKey: ["campaigns", "list"] });
    }
  });
}
function useRemoveCreativeMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ creativeId }) => apiDelete(`/creatives/${creativeId}`, getAccessToken()),
    onSuccess: (_data, { campaignId }) => {
      queryClient.invalidateQueries({ queryKey: ["creatives", "campaign", campaignId] });
    }
  });
}
function useUploadCampaignDocumentMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ campaignId, type, file }) => {
      const formData = new FormData();
      formData.append("file", file);
      return apiUpload(`/campaigns/${campaignId}/documents/${type}`, formData, getAccessToken());
    },
    onSuccess: (_data, { campaignId }) => queryClient.invalidateQueries({ queryKey: ["campaigns", campaignId] })
  });
}
function useRemoveCampaignDocumentMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ campaignId, type }) => apiDelete(`/campaigns/${campaignId}/documents/${type}`, getAccessToken()),
    onSuccess: (_data, { campaignId }) => queryClient.invalidateQueries({ queryKey: ["campaigns", campaignId] })
  });
}
function useUpdatePaymentsConfigMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (patch) => apiPut("/settings/payments", patch, getAccessToken()),
    onSuccess: (config) => queryClient.setQueryData(["settings", "payments"], config)
  });
}
function useCheckoutMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      campaignId,
      ...body
    }) => apiPost(`/checkout/campaigns/${campaignId}`, body, getAccessToken()),
    onSuccess: (_data, { campaignId }) => {
      queryClient.invalidateQueries({ queryKey: ["campaigns"] });
      queryClient.invalidateQueries({ queryKey: ["bookings", "campaign", campaignId] });
      queryClient.invalidateQueries({ queryKey: ["payments"] });
      queryClient.invalidateQueries({ queryKey: ["wallet"] });
    }
  });
}
function buildQuery(params) {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== void 0 && value !== "") query.set(key, String(value));
  }
  const qs = query.toString();
  return qs ? `?${qs}` : "";
}
function useCampaignCreativesQuery(campaignId) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["creatives", "campaign", campaignId],
    queryFn: () => apiGet(`/creatives/campaigns/${campaignId}`, getAccessToken()),
    enabled: hasAccessToken && !!campaignId
  });
}
function useUploadCreativeMutation(campaignId) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ file, durationSeconds, label, width, height }) => {
      const formData = new FormData();
      formData.append("file", file);
      if (durationSeconds) formData.append("durationSeconds", String(Math.min(120, Math.max(1, Math.round(durationSeconds)))));
      if (label) formData.append("label", label);
      if (width && height) {
        formData.append("width", String(Math.round(width)));
        formData.append("height", String(Math.round(height)));
      }
      return apiUpload(`/creatives/campaigns/${campaignId}`, formData, getAccessToken());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["creatives", "campaign", campaignId] });
      queryClient.invalidateQueries({ queryKey: ["creatives", "mine"] });
      queryClient.invalidateQueries({ queryKey: ["media"] });
    }
  });
}
function useMyCreativesQuery() {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["creatives", "mine"],
    queryFn: () => apiGet("/creatives/mine", getAccessToken()),
    enabled: hasAccessToken
  });
}
function useLiveScreensQuery() {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["creatives", "live-screens"],
    queryFn: () => apiGet("/creatives/live-screens", getAccessToken()),
    enabled: hasAccessToken
  });
}
function usePendingCreativesQuery(filters, options = {}) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["creatives", "pending", filters],
    queryFn: () => apiGetPaginated(`/creatives/pending${buildQuery(filters)}`, getAccessToken()),
    enabled: hasAccessToken && (options.enabled ?? true)
  });
}
function useApproveCreativeMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (creativeId) => apiPost(`/creatives/${creativeId}/approve`, void 0, getAccessToken()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["creatives", "pending"] });
    }
  });
}
function useRejectCreativeMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ creativeId, reason }) => apiPost(`/creatives/${creativeId}/reject`, { reason }, getAccessToken()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["creatives", "pending"] });
    }
  });
}
function useApplyMediaMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ mediaId, campaignId, durationSeconds }) => apiPost(`/media/${mediaId}/apply`, { campaignId, durationSeconds }, getAccessToken()),
    onSuccess: (_data, { campaignId }) => {
      queryClient.invalidateQueries({ queryKey: ["creatives", "campaign", campaignId] });
      queryClient.invalidateQueries({ queryKey: ["creatives", "mine"] });
      queryClient.invalidateQueries({ queryKey: ["media"] });
    }
  });
}
function buildQuery2(params) {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== void 0 && value !== "") query.set(key, String(value));
  }
  const qs = query.toString();
  return qs ? `?${qs}` : "";
}
function useDeviceHealthQuery(filters) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["devices", "health", filters],
    queryFn: () => apiGetPaginated(`/devices/health${buildQuery2(filters)}`, getAccessToken()),
    enabled: hasAccessToken,
    refetchInterval: 3e4
  });
}
function useDevicePreviewQuery(deviceId) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["devices", "preview", deviceId],
    queryFn: () => apiGet(`/devices/${deviceId}/preview`, getAccessToken()),
    enabled: hasAccessToken && !!deviceId,
    refetchInterval: 3e4
  });
}
function useMyDeviceHealthQuery(filters) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["devices", "me", "health", filters],
    queryFn: () => apiGetPaginated(`/devices/me/health${buildQuery2(filters)}`, getAccessToken()),
    enabled: hasAccessToken,
    refetchInterval: 3e4
  });
}
function useMyPlaybackLogsQuery(filters) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["devices", "me", "playback-logs", filters],
    queryFn: async () => {
      const result = await apiGetPaginated(
        `/devices/me/playback-logs${buildQuery2(filters)}`,
        getAccessToken()
      );
      const meta = result.meta;
      return { rows: result.rows, meta };
    },
    enabled: hasAccessToken
  });
}
function useClaimActivationMutation(screenId) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (code) => apiPost(`/devices/${screenId}/activation/claim`, { code }, getAccessToken()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["screens", screenId] });
      queryClient.invalidateQueries({ queryKey: ["screens", "owner", screenId] });
      queryClient.invalidateQueries({ queryKey: ["screens", "me"] });
    }
  });
}
function useRevokeDeviceMutation(screenId) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => apiPost(`/devices/${screenId}/revoke`, void 0, getAccessToken()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["screens", screenId] });
      queryClient.invalidateQueries({ queryKey: ["screens", "owner", screenId] });
      queryClient.invalidateQueries({ queryKey: ["screens", "me"] });
    }
  });
}
function useFleetHealthSummaryQuery() {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["devices", "fleet-summary"],
    queryFn: () => apiGet("/devices/fleet-summary", getAccessToken()),
    enabled: hasAccessToken,
    refetchInterval: 3e4
  });
}
function useDeviceLocationsQuery() {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["devices", "locations"],
    queryFn: () => apiGet("/devices/locations", getAccessToken()),
    enabled: hasAccessToken,
    refetchInterval: 3e4
  });
}
function useMyDeviceLocationsQuery() {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["devices", "me", "locations"],
    queryFn: () => apiGet("/devices/me/locations", getAccessToken()),
    enabled: hasAccessToken,
    refetchInterval: 3e4
  });
}
function useDeviceActivationsQuery(filters, options = {}) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["devices", "activation", "pending", filters],
    queryFn: () => apiGetPaginated(`/devices/activation/pending${buildQuery2(filters)}`, getAccessToken()),
    enabled: hasAccessToken && (options.enabled ?? true),
    refetchInterval: 3e4
  });
}
function useHeartbeatMapQuery(deviceId, days = 30) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["devices", deviceId, "heartbeats", "map", days],
    queryFn: () => apiGet(`/devices/${deviceId}/heartbeats/map?days=${days}`, getAccessToken()),
    enabled: hasAccessToken && !!deviceId
  });
}
function usePlaybackMapQuery(deviceId, days = 30) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["devices", deviceId, "playback-events", "map", days],
    queryFn: () => apiGet(`/devices/${deviceId}/playback-events/map?days=${days}`, getAccessToken()),
    enabled: hasAccessToken && !!deviceId
  });
}
function useHeartbeatHistoryQuery(deviceId, date) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["devices", deviceId, "heartbeats", "history", date],
    queryFn: () => apiGet(`/devices/${deviceId}/heartbeats/history?date=${date}`, getAccessToken()),
    enabled: hasAccessToken && !!deviceId && !!date
  });
}
function usePlaybackHistoryQuery(deviceId, date) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["devices", deviceId, "playback-events", "history", date],
    queryFn: () => apiGet(`/devices/${deviceId}/playback-events/history?date=${date}`, getAccessToken()),
    enabled: hasAccessToken && !!deviceId && !!date
  });
}
function useCampaignPlaybackQuery(campaignId) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["devices", "campaign-playback", campaignId],
    queryFn: () => apiGet(`/devices/campaigns/${campaignId}/playback`, getAccessToken()),
    enabled: hasAccessToken && !!campaignId
  });
}
function useMonitoringTimelineQuery(filters) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["devices", "monitoring", "timeline", filters],
    queryFn: () => apiGet(`/devices/monitoring/timeline${buildQuery2(filters)}`, getAccessToken()),
    enabled: hasAccessToken,
    refetchInterval: 6e4
  });
}
function useMyMonitoringTimelineQuery(filters, options = {}) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["devices", "me", "monitoring", "timeline", filters],
    queryFn: () => apiGet(`/devices/me/monitoring/timeline${buildQuery2(filters)}`, getAccessToken()),
    enabled: hasAccessToken && (options.enabled ?? true),
    refetchInterval: 6e4
  });
}
function useMyLiveScreensTimelineQuery(screenIds, filters) {
  const hasAccessToken = useHasSession();
  const accessToken = useSession((s) => s.accessToken);
  const results = useQueries({
    queries: screenIds.map((screenId) => ({
      queryKey: ["devices", "screens", screenId, "monitoring", "timeline", filters],
      queryFn: () => apiGet(`/devices/screens/${screenId}/monitoring/timeline${buildQuery2(filters)}`, accessToken),
      enabled: hasAccessToken && !!screenId,
      refetchInterval: 6e4
    }))
  });
  return {
    screens: results.flatMap((r) => r.data?.screens ?? []),
    isLoading: results.some((r) => r.isLoading),
    error: results.find((r) => r.error)?.error
  };
}
function useScreenTimelineQuery(screenId, filters, options = {}) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["devices", "screens", screenId, "monitoring", "timeline", filters],
    queryFn: () => apiGet(`/devices/screens/${screenId}/monitoring/timeline${buildQuery2(filters)}`, getAccessToken()),
    enabled: hasAccessToken && !!screenId && (options.enabled ?? true),
    refetchInterval: 6e4
  });
}
function useAdvertiserScreenPreviewQuery(deviceId, campaignId, enabled = true) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["devices", "preview", "mine", deviceId, campaignId],
    queryFn: () => apiGet(
      `/devices/${deviceId}/preview/mine?campaignId=${encodeURIComponent(campaignId)}`,
      getAccessToken()
    ),
    enabled: hasAccessToken && !!deviceId && !!campaignId && enabled,
    // A human is watching; this is also what refreshes the online/offline
    // banner, so it can't be left stale.
    refetchInterval: 3e4
  });
}
function useHealthAlertConfigQuery() {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["devices", "health-alert-config"],
    queryFn: () => apiGet("/devices/health-alert-config", getAccessToken()),
    enabled: hasAccessToken
  });
}
function useUpdateHealthAlertConfigMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (healthScoreAlertThreshold) => apiPut("/devices/health-alert-config", { healthScoreAlertThreshold }, getAccessToken()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["devices", "health-alert-config"] });
    }
  });
}
function useKbArticlesQuery(page, filters = {}) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["knowledge-base", page, filters],
    queryFn: () => {
      const query = new URLSearchParams({ page: String(page) });
      if (filters.category) query.set("category", filters.category);
      if (filters.search) query.set("search", filters.search);
      return apiGetPaginated(`/knowledge-base?${query.toString()}`, getAccessToken());
    },
    enabled: hasAccessToken
  });
}
function useKbArticleQuery(id) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["knowledge-base", "article", id],
    queryFn: () => apiGet(`/knowledge-base/${id}`, getAccessToken()),
    enabled: hasAccessToken && !!id
  });
}
function useCreateKbArticleMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input) => apiPost("/knowledge-base", input, getAccessToken()),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["knowledge-base"] })
  });
}
function useUpdateKbArticleMutation(id) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input) => apiPut(`/knowledge-base/${id}`, input, getAccessToken()),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["knowledge-base"] })
  });
}
function useDeleteKbArticleMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => apiDelete(`/knowledge-base/${id}`, getAccessToken()),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["knowledge-base"] })
  });
}
function useMyKycQuery() {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["kyc", "me"],
    queryFn: () => apiGet("/kyc/me", getAccessToken()),
    enabled: hasAccessToken
  });
}
function useMyDocumentsQuery() {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["kyc", "documents", "me"],
    queryFn: () => apiGet("/kyc/documents/me", getAccessToken()),
    enabled: hasAccessToken
  });
}
function useSubmitKycMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    // getState() at call time, not a render-time hook value — this mutation
    // is often fired immediately after useVerifyOtpMutation's onSuccess sets
    // the token, before React has re-rendered (see hooks/useTheme.ts).
    mutationFn: (payload) => apiPost("/kyc/submit", payload, getAccessToken()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kyc", "me"] });
    }
  });
}
function useUploadDocumentMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ documentType, file }) => {
      const formData = new FormData();
      formData.append("documentType", documentType);
      formData.append("file", file);
      return apiUpload("/kyc/documents", formData, getAccessToken());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kyc", "documents", "me"] });
    }
  });
}
function useUpdateBankDetailsMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input) => apiPatch("/kyc/screen-partners/me/bank-details", input, getAccessToken()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
    }
  });
}
function useUpdateAdvertiserBankDetailsMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input) => apiPatch("/kyc/advertisers/me/bank-details", input, getAccessToken()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
    }
  });
}
function usePendingAdvertisersQuery(options = {}) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["kyc", "pending", "advertisers"],
    queryFn: () => apiGet("/kyc/pending/advertisers", getAccessToken()),
    enabled: hasAccessToken && (options.enabled ?? true)
  });
}
function usePendingScreenPartnersQuery(options = {}) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["kyc", "pending", "screen-partners"],
    queryFn: () => apiGet("/kyc/pending/screen-partners", getAccessToken()),
    enabled: hasAccessToken && (options.enabled ?? true)
  });
}
function useKycDocumentsQuery(kind, id, enabled) {
  return useQuery({
    queryKey: ["kyc", kind, id, "documents"],
    queryFn: () => apiGet(`/kyc/${kind}/${id}/documents`, getAccessToken()),
    enabled
  });
}
function useReviewMutation(kind, decision) {
  const queryClient = useQueryClient();
  const queueKey = kind === "advertisers" ? ["kyc", "pending", "advertisers"] : ["kyc", "pending", "screen-partners"];
  return useMutation({
    mutationFn: ({ id, reason }) => apiPost(`/kyc/${kind}/${id}/${decision}`, reason ? { reason } : void 0, getAccessToken()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queueKey });
    }
  });
}
var useApproveAdvertiserMutation = () => useReviewMutation("advertisers", "approve");
var useRejectAdvertiserMutation = () => useReviewMutation("advertisers", "reject");
var useApproveScreenPartnerMutation = () => useReviewMutation("screen-partners", "approve");
var useRejectScreenPartnerMutation = () => useReviewMutation("screen-partners", "reject");
var NOTIFICATIONS_UNREAD_COUNT_KEY = ["notifications", "unread-count"];
var NOTIFICATIONS_LIST_KEY = ["notifications", "list"];
var NOTIFICATIONS_PREFERENCES_KEY = ["notifications", "preferences"];
function useNotificationsQuery(page) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: [...NOTIFICATIONS_LIST_KEY, page],
    queryFn: () => apiGetPaginated(`/notifications?page=${page}`, getAccessToken()),
    enabled: hasAccessToken
  });
}
function useNotificationsInfiniteQuery() {
  const hasAccessToken = useHasSession();
  return useInfiniteQuery({
    queryKey: [...NOTIFICATIONS_LIST_KEY, "infinite"],
    queryFn: ({ pageParam }) => apiGetPaginated(`/notifications?page=${pageParam}`, getAccessToken()),
    initialPageParam: 1,
    getNextPageParam: (last) => last.meta.page * last.meta.limit < last.meta.total ? last.meta.page + 1 : void 0,
    enabled: hasAccessToken
  });
}
function useUnreadCountQuery(options = {}) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: NOTIFICATIONS_UNREAD_COUNT_KEY,
    queryFn: () => apiGet("/notifications/unread-count", getAccessToken()),
    enabled: hasAccessToken,
    refetchInterval: options.refetchInterval
  });
}
function useMarkNotificationReadMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => apiPost(`/notifications/${id}/read`, void 0, getAccessToken()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: NOTIFICATIONS_LIST_KEY });
      queryClient.invalidateQueries({ queryKey: NOTIFICATIONS_UNREAD_COUNT_KEY });
    }
  });
}
function useMarkAllNotificationsReadMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => apiPost("/notifications/read-all", void 0, getAccessToken()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: NOTIFICATIONS_LIST_KEY });
      queryClient.invalidateQueries({ queryKey: NOTIFICATIONS_UNREAD_COUNT_KEY });
    }
  });
}
function useNotificationPreferencesQuery() {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: NOTIFICATIONS_PREFERENCES_KEY,
    queryFn: () => apiGet("/notifications/preferences", getAccessToken()),
    enabled: hasAccessToken
  });
}
function useUpdateNotificationPreferencesMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input) => apiPut("/notifications/preferences", input, getAccessToken()),
    onSuccess: (updated) => {
      queryClient.setQueryData(NOTIFICATIONS_PREFERENCES_KEY, updated);
    }
  });
}
function useInvalidateNotifications() {
  const queryClient = useQueryClient();
  return () => {
    queryClient.invalidateQueries({ queryKey: NOTIFICATIONS_LIST_KEY });
    queryClient.invalidateQueries({ queryKey: NOTIFICATIONS_UNREAD_COUNT_KEY });
  };
}
function invalidatePartnerAdViews(queryClient, reservationId) {
  if (reservationId) queryClient.invalidateQueries({ queryKey: ["partner-ads", "reservation", reservationId] });
  queryClient.invalidateQueries({ queryKey: ["partner-ads", "mine"] });
}
function useReservationAdsQuery(reservationId, options = {}) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["partner-ads", "reservation", reservationId],
    queryFn: () => apiGet(`/partner-ads/reservations/${reservationId}`, getAccessToken()),
    enabled: hasAccessToken && !!reservationId && (options.enabled ?? true)
  });
}
function useMyPartnerAdsQuery(filters = {}) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["partner-ads", "mine", filters],
    queryFn: () => {
      const query = new URLSearchParams();
      if (filters.status) query.set("status", filters.status);
      if (filters.screenId) query.set("screenId", filters.screenId);
      if (filters.page) query.set("page", String(filters.page));
      const qs = query.toString();
      return apiGetPaginated(`/partner-ads/mine${qs ? `?${qs}` : ""}`, getAccessToken());
    },
    enabled: hasAccessToken
  });
}
function useUploadPartnerAdMutation(reservationId) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input) => {
      const formData = new FormData();
      formData.append("file", input.file);
      if (input.label) formData.append("label", input.label);
      if (input.durationSeconds !== void 0) formData.append("durationSeconds", String(input.durationSeconds));
      if (input.slotStartHour !== void 0 && input.slotEndHour !== void 0) {
        formData.append("slotStartHour", String(input.slotStartHour));
        formData.append("slotEndHour", String(input.slotEndHour));
      }
      return apiUpload(`/partner-ads/reservations/${reservationId}`, formData, getAccessToken());
    },
    onSuccess: () => invalidatePartnerAdViews(queryClient, reservationId)
  });
}
function useDeletePartnerAdMutation(reservationId) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => apiDelete(`/partner-ads/${id}`, getAccessToken()),
    onSuccess: () => invalidatePartnerAdViews(queryClient, reservationId)
  });
}
function buildQuery3(params) {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== void 0 && value !== "") query.set(key, String(value));
  }
  const qs = query.toString();
  return qs ? `?${qs}` : "";
}
function useMyPaymentsQuery(page, filters = {}) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["payments", "mine", page, filters],
    queryFn: () => apiGetPaginated(`/payments/mine${buildQuery3({ page, ...filters })}`, getAccessToken()),
    enabled: hasAccessToken
  });
}
function usePaymentDetailQuery(paymentId) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["payments", "mine", "detail", paymentId],
    queryFn: () => apiGet(`/payments/mine/${paymentId}`, getAccessToken()),
    enabled: hasAccessToken && !!paymentId
  });
}
function useMyInvoicesQuery(page, filters = {}) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["payments", "invoices", page, filters],
    queryFn: () => apiGetPaginated(`/payments/invoices${buildQuery3({ page, ...filters })}`, getAccessToken()),
    enabled: hasAccessToken
  });
}
function useInvoiceDetailQuery(invoiceId) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["payments", "invoices", "detail", invoiceId],
    queryFn: () => apiGet(`/payments/invoices/${invoiceId}`, getAccessToken()),
    enabled: hasAccessToken && !!invoiceId
  });
}
function usePaymentStatusQuery(campaignId) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["payments", "campaign", campaignId],
    queryFn: () => apiGet(`/payments/${campaignId}`, getAccessToken()),
    enabled: hasAccessToken && !!campaignId,
    retry: false
    // 404 ("no payment yet") is an expected, not transient, response
  });
}
function usePendingPaymentsQuery(page, options = {}) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["payments", "pending", page],
    queryFn: () => apiGetPaginated(`/payments/pending${buildQuery3({ page })}`, getAccessToken()),
    enabled: hasAccessToken && (options.enabled ?? true)
  });
}
function useApprovePaymentMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ paymentId, settlementMode, settlementNote }) => apiPost(
      `/payments/${paymentId}/approve`,
      settlementMode || settlementNote ? { settlementMode, settlementNote } : void 0,
      getAccessToken()
    ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payments", "pending"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "campaigns"] });
    }
  });
}
function useRaisePaymentRequestMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (campaignId) => apiPost("/payments/requests", { campaignId }, getAccessToken()),
    onSuccess: (_data, campaignId) => {
      queryClient.invalidateQueries({ queryKey: ["payments", "campaign", campaignId] });
      queryClient.invalidateQueries({ queryKey: ["payments", "pending"] });
    }
  });
}
function useRejectPaymentMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ paymentId, reason }) => apiPost(`/payments/${paymentId}/reject`, { reason }, getAccessToken()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payments", "pending"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "campaigns"] });
    }
  });
}
function useCreateOrderMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (campaignId) => apiPost("/payments/orders", { campaignId }, getAccessToken()),
    onSuccess: (_data, campaignId) => {
      queryClient.invalidateQueries({ queryKey: ["payments", "campaign", campaignId] });
    }
  });
}
function useSavedPaymentMethodsQuery() {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["payments", "methods"],
    queryFn: () => apiGet("/payments/methods", getAccessToken()),
    enabled: hasAccessToken
  });
}
function useDeleteSavedPaymentMethodMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (tokenId) => apiDelete(`/payments/methods/${tokenId}`, getAccessToken()),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["payments", "methods"] })
  });
}
function useVerifyPaymentMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input) => apiPost(
      "/payments/verify",
      {
        razorpayOrderId: input.razorpayOrderId,
        razorpayPaymentId: input.razorpayPaymentId,
        razorpaySignature: input.razorpaySignature
      },
      getAccessToken()
    ),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["payments", "campaign", variables.campaignId] });
      queryClient.invalidateQueries({ queryKey: ["campaigns", variables.campaignId] });
      queryClient.invalidateQueries({ queryKey: ["bookings", "campaign", variables.campaignId] });
    }
  });
}
var invoicePdfPath = (invoiceId) => `/payments/invoices/${invoiceId}/pdf`;
function usePlacesQuery(query) {
  const q = query.trim();
  return useQuery({
    queryKey: ["geo", "places", q.toLowerCase()],
    queryFn: () => apiGet(`/geo/places?q=${encodeURIComponent(q)}`, getAccessToken()),
    enabled: q.length >= 3,
    staleTime: Infinity
  });
}
var useInvalidateProofRequests = () => {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: ["proof-requests"] });
};
function useProofRequestSummaryQuery() {
  const enabled = useHasSession();
  return useQuery({
    queryKey: ["proof-requests", "summary"],
    queryFn: () => apiGet("/proof-requests/summary", getAccessToken()),
    enabled,
    refetchInterval: 6e4
  });
}
function useMyProofRequestsQuery(status) {
  const enabled = useHasSession();
  return useQuery({
    queryKey: ["proof-requests", "mine", status ?? "all"],
    queryFn: () => apiGet(`/proof-requests/mine${status ? `?status=${status}` : ""}`, getAccessToken()),
    enabled
  });
}
function useScreenLiveCampaignsQuery(screenId) {
  const enabled = useHasSession();
  return useQuery({
    queryKey: ["proof-requests", "screen", screenId],
    queryFn: () => apiGet(`/proof-requests/screens/${screenId}`, getAccessToken()),
    enabled: enabled && !!screenId
  });
}
function useCampaignProofRequestsQuery(campaignId) {
  const enabled = useHasSession();
  return useQuery({
    queryKey: ["proof-requests", "campaign", campaignId],
    queryFn: () => apiGet(`/proof-requests/campaigns/${campaignId}`, getAccessToken()),
    enabled: enabled && !!campaignId
  });
}
function useRequestProofMutation() {
  const invalidate = useInvalidateProofRequests();
  return useMutation({
    mutationFn: (input) => apiPost("/proof-requests", { ...input, note: input.note || void 0 }, getAccessToken()),
    onSuccess: invalidate
  });
}
function useSubmitProofMutation(screenId) {
  const invalidate = useInvalidateProofRequests();
  return useMutation({
    mutationFn: ({ requestId, campaignId, file, caption }) => {
      const formData = new FormData();
      formData.append("file", file);
      if (caption) formData.append("caption", caption);
      return apiUpload(
        requestId ? `/proof-requests/${requestId}/submit` : `/proof-requests/screens/${screenId}/campaigns/${campaignId}/submit`,
        formData,
        getAccessToken()
      );
    },
    onSuccess: invalidate
  });
}
var registerPushToken = (input) => apiPost("/notifications/push-tokens", input, getAccessToken());
var unregisterPushToken = (token) => apiRequest("/notifications/push-tokens", { method: "DELETE", body: { token }, accessToken: getAccessToken() });
function useRegisterPushTokenMutation() {
  return useMutation({ mutationFn: registerPushToken });
}
function useUnregisterPushTokenMutation() {
  return useMutation({ mutationFn: unregisterPushToken });
}
function buildQuery4(params) {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== void 0 && value !== "") query.set(key, String(value));
  }
  const qs = query.toString();
  return qs ? `?${qs}` : "";
}
function useInvalidateQuotation() {
  const queryClient = useQueryClient();
  return (q) => {
    queryClient.setQueryData(["quotations", "campaign", q.campaignId], q);
    queryClient.setQueryData(["quotations", "detail", q.id], q);
    queryClient.invalidateQueries({ queryKey: ["quotations", "mine"] });
    queryClient.invalidateQueries({ queryKey: ["campaigns"] });
    queryClient.invalidateQueries({ queryKey: ["bookings", "campaign", q.campaignId] });
    queryClient.invalidateQueries({ queryKey: ["payments"] });
  };
}
function useCampaignQuotationQuery(campaignId) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["quotations", "campaign", campaignId],
    queryFn: () => apiGet(`/quotations/campaigns/${campaignId}`, getAccessToken()),
    enabled: hasAccessToken && !!campaignId
  });
}
function useMyQuotationQuery(id) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["quotations", "detail", id],
    queryFn: () => apiGet(`/quotations/mine/${id}`, getAccessToken()),
    enabled: hasAccessToken && !!id
  });
}
function useMyQuotationsQuery(page, filters = {}) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["quotations", "mine", page, filters],
    queryFn: () => apiGetPaginated(`/quotations/mine${buildQuery4({ page, ...filters })}`, getAccessToken()),
    enabled: hasAccessToken
  });
}
function useSubmitQuotationMutation() {
  const onDone = useInvalidateQuotation();
  return useMutation({
    mutationFn: ({ campaignId, ...body }) => apiPost(`/quotations/campaigns/${campaignId}`, body, getAccessToken()),
    onSuccess: onDone
  });
}
function useAcceptQuotationMutation() {
  const onDone = useInvalidateQuotation();
  return useMutation({
    mutationFn: ({ campaignId }) => apiPost(`/quotations/campaigns/${campaignId}/accept`, {}, getAccessToken()),
    onSuccess: onDone
  });
}
function usePayQuotationMutation() {
  const onDone = useInvalidateQuotation();
  return useMutation({
    mutationFn: ({ campaignId, ...body }) => apiPost(`/quotations/campaigns/${campaignId}/pay`, body, getAccessToken()),
    onSuccess: onDone
  });
}
var quotationPdfPath = (quotationId) => `/quotations/mine/${quotationId}/pdf`;
function useMyRefundsQuery(page = 1) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["refunds", "mine", page],
    queryFn: () => apiGetPaginated(`/refunds?page=${page}`, getAccessToken()),
    enabled: hasAccessToken
  });
}
function useCreateRefundRequestMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (campaignId) => apiPost("/refunds", { campaignId }, getAccessToken()),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["refunds", "mine"] })
  });
}
function usePendingRefundsQuery(page, options = {}) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["refunds", "admin", "pending", page],
    queryFn: () => apiGetPaginated(`/refunds/pending?page=${page}`, getAccessToken()),
    enabled: hasAccessToken && (options.enabled ?? true)
  });
}
function useApproveRefundMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (refundId) => apiPost(`/refunds/${refundId}/approve`, void 0, getAccessToken()),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["refunds", "admin"] })
  });
}
function useRejectRefundMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ refundId, reason }) => apiPost(`/refunds/${refundId}/reject`, { reason }, getAccessToken()),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["refunds", "admin", "pending"] })
  });
}
function buildQuery5(params) {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== void 0 && value !== "") query.set(key, String(value));
  }
  const qs = query.toString();
  return qs ? `?${qs}` : "";
}
function useWalletQuery(page) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["revenue", "wallet", page],
    queryFn: () => apiGet(`/revenue/wallet?page=${page}`, getAccessToken()),
    enabled: hasAccessToken
  });
}
function useTodayCollectionQuery() {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["revenue", "collections", "today"],
    queryFn: () => apiGet("/revenue/collections/today", getAccessToken()),
    enabled: hasAccessToken
  });
}
function useDailyCollectionsQuery(range) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["revenue", "collections", range ?? null],
    queryFn: () => {
      const query = new URLSearchParams();
      if (range?.startDate) query.set("startDate", range.startDate);
      if (range?.endDate) query.set("endDate", range.endDate);
      const qs = query.toString();
      return apiGet(
        `/revenue/collections${qs ? `?${qs}` : ""}`,
        getAccessToken()
      );
    },
    enabled: hasAccessToken
  });
}
function useSetSettlementCadenceMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (cadence) => apiPatch(
      "/revenue/settlement-preference",
      { cadence },
      getAccessToken()
    ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["revenue"] });
    }
  });
}
function useMyWithdrawalsQuery(page) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["revenue", "withdrawals", page],
    queryFn: () => apiGetPaginated(`/revenue/withdrawals?page=${page}`, getAccessToken()),
    enabled: hasAccessToken
  });
}
function useCreateWithdrawalMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (amount) => apiPost("/revenue/withdrawals", { amount }, getAccessToken()),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["revenue", "withdrawals"] })
  });
}
function useCancelWithdrawalMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (requestId) => apiDelete(`/revenue/withdrawals/${requestId}`, getAccessToken()),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["revenue", "withdrawals"] })
  });
}
function useDisplaySettingsQuery() {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["revenue", "display-settings"],
    queryFn: () => apiGet("/revenue/display-settings", getAccessToken()),
    enabled: hasAccessToken,
    staleTime: 5 * 60 * 1e3
  });
}
function useFeeConfigQuery() {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["revenue", "fee-config"],
    queryFn: () => apiGet("/revenue/fee-config", getAccessToken()),
    enabled: hasAccessToken
  });
}
function useUpdateFeeConfigMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input) => apiPut("/revenue/fee-config", input, getAccessToken()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["revenue", "fee-config"] });
      queryClient.invalidateQueries({ queryKey: ["revenue", "display-settings"] });
    }
  });
}
function useAdminWalletsQuery(page, search) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["revenue", "admin", "wallets", page, search],
    queryFn: () => apiGetPaginated(`/revenue/wallets${buildQuery5({ page, search })}`, getAccessToken()),
    enabled: hasAccessToken
  });
}
function useAdminSettlementsQuery(page, filters = {}) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["revenue", "admin", "settlements", page, filters],
    queryFn: () => apiGetPaginated(`/revenue/settlements${buildQuery5({ page, ...filters })}`, getAccessToken()),
    enabled: hasAccessToken
  });
}
function useAdminSettlementDetailQuery(settlementId) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["revenue", "admin", "settlements", "detail", settlementId],
    queryFn: () => apiGet(`/revenue/settlements/${settlementId}`, getAccessToken()),
    enabled: hasAccessToken && !!settlementId
  });
}
function useRecordPayoutMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ walletId, amount, note }) => apiPost(
      `/revenue/wallets/${walletId}/payouts`,
      { amount, ...note ? { note } : {} },
      getAccessToken()
    ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["revenue", "admin"] });
    }
  });
}
function usePendingWithdrawalsQuery(page, options = {}) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["revenue", "admin", "withdrawals", page],
    queryFn: () => apiGetPaginated(`/revenue/withdrawals/pending?page=${page}`, getAccessToken()),
    enabled: hasAccessToken && (options.enabled ?? true)
  });
}
function useApproveWithdrawalMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (requestId) => apiPost(`/revenue/withdrawals/${requestId}/approve`, void 0, getAccessToken()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["revenue", "admin"] });
    }
  });
}
function useRejectWithdrawalMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ requestId, reason }) => apiPost(`/revenue/withdrawals/${requestId}/reject`, { reason }, getAccessToken()),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["revenue", "admin", "withdrawals"] })
  });
}
function useScheduledReportsQuery() {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["revenue", "scheduled-reports"],
    queryFn: () => apiGet("/revenue/scheduled-reports", getAccessToken()),
    enabled: hasAccessToken
  });
}
function useCreateScheduledReportMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ frequency, format }) => apiPost("/revenue/scheduled-reports", { frequency, format }, getAccessToken()),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["revenue", "scheduled-reports"] })
  });
}
function useDeleteScheduledReportMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => apiDelete(`/revenue/scheduled-reports/${id}`, getAccessToken()),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["revenue", "scheduled-reports"] })
  });
}
function useSavedScreensQuery(enabled = true) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["saved-screens"],
    queryFn: () => apiGet("/saved-screens", getAccessToken()),
    enabled: hasAccessToken && enabled
  });
}
function useToggleSavedScreenMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ screenId, save }) => save ? apiPut(`/saved-screens/${screenId}`, void 0, getAccessToken()) : apiDelete(`/saved-screens/${screenId}`, getAccessToken()),
    // Heart flips instantly; the server call confirms it.
    onMutate: async ({ screenId, save }) => {
      await queryClient.cancelQueries({ queryKey: ["saved-screens"] });
      const previous = queryClient.getQueryData(["saved-screens"]);
      if (previous) {
        queryClient.setQueryData(["saved-screens"], {
          screenIds: save ? [screenId, ...previous.screenIds] : previous.screenIds.filter((id) => id !== screenId),
          screens: save ? previous.screens : previous.screens.filter((s) => s.id !== screenId)
        });
      }
      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) queryClient.setQueryData(["saved-screens"], context.previous);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["saved-screens"] })
  });
}
function useScreenGroupsQuery(enabled = true) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["screen-groups"],
    queryFn: () => apiGet("/screen-groups", getAccessToken()),
    enabled: hasAccessToken && enabled
  });
}
function useScreenGroupQuery(groupId) {
  return useQuery({
    queryKey: ["screen-groups", groupId],
    queryFn: () => apiGet(`/screen-groups/${groupId}`, getAccessToken()),
    enabled: !!groupId
  });
}
function useCreateScreenGroupMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input) => apiPost("/screen-groups", input, getAccessToken()),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["screen-groups"] })
  });
}
function useUpdateScreenGroupMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ groupId, ...values }) => apiPatch(`/screen-groups/${groupId}`, values, getAccessToken()),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["screen-groups"] })
  });
}
function useDeleteScreenGroupMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (groupId) => apiDelete(`/screen-groups/${groupId}`, getAccessToken()),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["screen-groups"] })
  });
}
function useCategoriesQuery() {
  return useQuery({
    queryKey: ["screens", "categories"],
    queryFn: () => apiGet("/screens/categories")
  });
}
function useMyScreenQuery(screenId) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["screens", "owner", screenId],
    queryFn: () => apiGet(`/screens/${screenId}`, getAccessToken()),
    enabled: hasAccessToken && !!screenId
  });
}
var MY_SCREENS_PAGE_LIMIT = 20;
function useMyScreensListQuery(filters) {
  const hasAccessToken = useHasSession();
  return useInfiniteQuery({
    queryKey: ["screens", "me", "list", filters],
    queryFn: ({ pageParam }) => {
      const query = new URLSearchParams({ page: String(pageParam), limit: String(MY_SCREENS_PAGE_LIMIT) });
      if (filters.status) query.set("status", filters.status);
      if (filters.search) query.set("search", filters.search);
      if (filters.live) query.set("live", "true");
      return apiGetPaginated(`/screens/me/list?${query.toString()}`, getAccessToken());
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.meta.page * lastPage.meta.limit < lastPage.meta.total ? lastPage.meta.page + 1 : void 0,
    enabled: hasAccessToken
  });
}
function usePartnerStatsQuery() {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["screens", "me", "stats"],
    queryFn: () => apiGet("/screens/me/stats", getAccessToken()),
    enabled: hasAccessToken
  });
}
function useRegisterScreenMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (values) => apiPost("/screens", values, getAccessToken()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["screens", "me"] });
    }
  });
}
function useQuickRegisterScreenMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (values) => apiPost("/screens/quick-register", values, getAccessToken()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["screens", "me"] });
    }
  });
}
function useUpdateScreenMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ screenId, values }) => apiPatch(`/screens/${screenId}`, values, getAccessToken()),
    onSuccess: (_data, { screenId }) => {
      queryClient.invalidateQueries({ queryKey: ["screens", "me"] });
      queryClient.invalidateQueries({ queryKey: ["screens", screenId] });
      queryClient.invalidateQueries({ queryKey: ["screens", "owner", screenId] });
    }
  });
}
function useUpdateScreenSyncConfigMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ screenId, syncIntervalMinutes }) => apiPatch(`/screens/${screenId}/sync-config`, { syncIntervalMinutes }, getAccessToken()),
    onSuccess: (_data, { screenId }) => {
      queryClient.invalidateQueries({ queryKey: ["screens", screenId] });
      queryClient.invalidateQueries({ queryKey: ["screens", "owner", screenId] });
    }
  });
}
function useUpdateScreenPricingConfigMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      screenId,
      ...body
    }) => apiPatch(`/screens/${screenId}/pricing-config`, body, getAccessToken()),
    onSuccess: (_data, { screenId }) => {
      queryClient.invalidateQueries({ queryKey: ["screens", screenId] });
      queryClient.invalidateQueries({ queryKey: ["screens", "owner", screenId] });
      queryClient.invalidateQueries({ queryKey: ["screens", "admin"] });
    }
  });
}
function useSubmitScreenMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (screenId) => apiPost(`/screens/${screenId}/submit`, void 0, getAccessToken()),
    onSuccess: (_data, screenId) => {
      queryClient.invalidateQueries({ queryKey: ["screens", screenId] });
      queryClient.invalidateQueries({ queryKey: ["screens", "owner", screenId] });
      queryClient.invalidateQueries({ queryKey: ["screens", "me"] });
    }
  });
}
function useSetListedMutation(action) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (screenId) => apiPost(`/screens/${screenId}/${action}`, void 0, getAccessToken()),
    onSuccess: (_data, screenId) => {
      queryClient.invalidateQueries({ queryKey: ["screens", screenId] });
      queryClient.invalidateQueries({ queryKey: ["screens", "owner", screenId] });
      queryClient.invalidateQueries({ queryKey: ["screens", "me"] });
    }
  });
}
var useActivateScreenMutation = () => useSetListedMutation("activate");
var useDeactivateScreenMutation = () => useSetListedMutation("deactivate");
function useDeleteScreenMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (screenId) => apiDelete(`/screens/${screenId}`, getAccessToken()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["screens", "me"] });
    }
  });
}
function usePhotosQuery(screenId, enabled = true) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["screens", screenId, "photos"],
    queryFn: () => apiGet(`/screens/${screenId}/photos`, getAccessToken()),
    enabled: enabled && hasAccessToken && !!screenId
  });
}
function useUploadPhotoMutation(screenId) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ photoType, file }) => {
      const formData = new FormData();
      formData.append("photoType", photoType);
      formData.append("file", file);
      return apiUpload(`/screens/${screenId}/photos`, formData, getAccessToken());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["screens", screenId, "photos"] });
    }
  });
}
function useDeleteScreenPhotoMutation(screenId) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (photoId) => apiDelete(`/screens/${screenId}/photos/${photoId}`, getAccessToken()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["screens", screenId, "photos"] });
    }
  });
}
var SCREEN_SEARCH_PAGE_LIMIT = 20;
function useSearchScreensQuery(filters, enabled) {
  return useInfiniteQuery({
    queryKey: ["screens", "search", filters],
    queryFn: ({ pageParam }) => {
      const query = new URLSearchParams({ page: String(pageParam), limit: String(SCREEN_SEARCH_PAGE_LIMIT) });
      for (const [key, value] of Object.entries(filters)) {
        if (value) query.set(key, value);
      }
      return apiGetPaginated(`/screens?${query.toString()}`, getAccessToken());
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.meta.page * lastPage.meta.limit < lastPage.meta.total ? lastPage.meta.page + 1 : void 0,
    enabled
  });
}
function usePendingScreensQuery() {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["screens", "pending"],
    queryFn: () => apiGet("/screens/pending", getAccessToken()),
    enabled: hasAccessToken
  });
}
function useAdminScreensListQuery(filters) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["screens", "admin", "list", filters],
    queryFn: () => {
      const query = new URLSearchParams({ page: String(filters.page ?? 1), limit: "20" });
      if (filters.status) query.set("status", filters.status);
      if (filters.search) query.set("search", filters.search);
      if (filters.live) query.set("live", "true");
      return apiGetPaginated(`/screens/admin/list?${query.toString()}`, getAccessToken());
    },
    enabled: hasAccessToken
  });
}
function useApproveScreenMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (screenId) => apiPost(`/screens/${screenId}/approve`, void 0, getAccessToken()),
    onSuccess: (_data, screenId) => {
      queryClient.invalidateQueries({ queryKey: ["screens", "pending"] });
      queryClient.invalidateQueries({ queryKey: ["screens", "admin"] });
      queryClient.invalidateQueries({ queryKey: ["screens", screenId] });
      queryClient.invalidateQueries({ queryKey: ["screens", "owner", screenId] });
    }
  });
}
function useRejectScreenMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ screenId, reason }) => apiPost(`/screens/${screenId}/reject`, { reason }, getAccessToken()),
    onSuccess: (_data, { screenId }) => {
      queryClient.invalidateQueries({ queryKey: ["screens", "pending"] });
      queryClient.invalidateQueries({ queryKey: ["screens", "admin"] });
      queryClient.invalidateQueries({ queryKey: ["screens", screenId] });
      queryClient.invalidateQueries({ queryKey: ["screens", "owner", screenId] });
    }
  });
}
function useAppConfigQuery() {
  return useQuery({
    queryKey: ["settings", "app-config"],
    queryFn: () => apiGet("/settings/app-config"),
    staleTime: 5 * 6e4,
    // A failed check must never lock people out of the app; callers treat "no data" as "all clear".
    retry: 1
  });
}
function compareAppVersions(a, b) {
  const pa = a.split(".").map((part) => Number.parseInt(part, 10) || 0);
  const pb = b.split(".").map((part) => Number.parseInt(part, 10) || 0);
  for (let i = 0; i < 3; i += 1) {
    const diff = (pa[i] ?? 0) - (pb[i] ?? 0);
    if (diff !== 0) return diff;
  }
  return 0;
}
function useCreateTicketMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input) => apiPost("/support/tickets", input, getAccessToken()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["support", "mine"] });
    }
  });
}
function useMyTicketsQuery(page, status) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["support", "mine", page, status ?? null],
    queryFn: () => {
      const query = new URLSearchParams({ page: String(page) });
      if (status) query.set("status", status);
      return apiGetPaginated(`/support/tickets/mine?${query.toString()}`, getAccessToken());
    },
    enabled: hasAccessToken
  });
}
function useMyTicketsInfiniteQuery(status) {
  const hasAccessToken = useHasSession();
  return useInfiniteQuery({
    queryKey: ["support", "mine", "infinite", status ?? null],
    queryFn: ({ pageParam }) => {
      const query = new URLSearchParams({ page: String(pageParam) });
      if (status) query.set("status", status);
      return apiGetPaginated(`/support/tickets/mine?${query.toString()}`, getAccessToken());
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.meta.page * lastPage.meta.limit < lastPage.meta.total ? lastPage.meta.page + 1 : void 0,
    enabled: hasAccessToken
  });
}
function useAdminTicketsQuery(page, filters = {}, options = {}) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["support", "admin", page, filters],
    queryFn: () => {
      const query = new URLSearchParams({ page: String(page) });
      if (filters.status) query.set("status", filters.status);
      if (filters.category) query.set("category", filters.category);
      if (filters.priority) query.set("priority", filters.priority);
      if (filters.assignedTo) query.set("assignedTo", filters.assignedTo);
      return apiGetPaginated(`/support/tickets?${query.toString()}`, getAccessToken());
    },
    enabled: hasAccessToken && (options.enabled ?? true)
  });
}
function useTicketDetailQuery(ticketId, options = {}) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["support", "ticket", ticketId],
    queryFn: () => apiGet(`/support/tickets/${ticketId}`, getAccessToken()),
    enabled: hasAccessToken && !!ticketId,
    refetchInterval: options.refetchInterval
  });
}
function invalidateTicket(queryClient, ticketId) {
  queryClient.invalidateQueries({ queryKey: ["support", "ticket", ticketId] });
  queryClient.invalidateQueries({ queryKey: ["support", "mine"] });
  queryClient.invalidateQueries({ queryKey: ["support", "admin"] });
}
function useAddTicketMessageMutation(ticketId) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input) => apiPost(`/support/tickets/${ticketId}/messages`, input, getAccessToken()),
    onSuccess: () => invalidateTicket(queryClient, ticketId)
  });
}
function useAssignTicketMutation(ticketId) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input) => apiPatch(`/support/tickets/${ticketId}/assign`, input, getAccessToken()),
    onSuccess: () => invalidateTicket(queryClient, ticketId)
  });
}
function useUpdateTicketStatusMutation(ticketId) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (status) => apiPatch(`/support/tickets/${ticketId}/status`, { status }, getAccessToken()),
    onSuccess: () => invalidateTicket(queryClient, ticketId)
  });
}
function useResolveTicketMutation(ticketId) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (resolutionSummary) => apiPost(`/support/tickets/${ticketId}/resolve`, { resolutionSummary }, getAccessToken()),
    onSuccess: () => invalidateTicket(queryClient, ticketId)
  });
}
function useCloseTicketMutation(ticketId) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => apiPost(`/support/tickets/${ticketId}/close`, void 0, getAccessToken()),
    onSuccess: () => invalidateTicket(queryClient, ticketId)
  });
}
function useReopenTicketMutation(ticketId) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => apiPost(`/support/tickets/${ticketId}/reopen`, void 0, getAccessToken()),
    onSuccess: () => invalidateTicket(queryClient, ticketId)
  });
}
function useSubmitTicketFeedbackMutation(ticketId) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input) => apiPost(`/support/tickets/${ticketId}/feedback`, input, getAccessToken()),
    onSuccess: () => invalidateTicket(queryClient, ticketId)
  });
}
function useSlaConfigsQuery() {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["support", "sla-config"],
    queryFn: () => apiGet("/support/sla-config", getAccessToken()),
    enabled: hasAccessToken
  });
}
function useUpdateSlaConfigMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ priority, ...input }) => apiPut(`/support/sla-config/${priority}`, input, getAccessToken()),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["support", "sla-config"] })
  });
}
function useWalletQuery2(limit = 20) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["wallet", limit],
    queryFn: () => apiGet(`/wallet?limit=${limit}`, getAccessToken()),
    enabled: hasAccessToken
  });
}
function useCreateTopUpOrderMutation() {
  return useMutation({
    mutationFn: (amount) => apiPost("/wallet/topups", { amount }, getAccessToken())
  });
}
function useVerifyTopUpMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input) => apiPost("/wallet/topups/verify", input, getAccessToken()),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["wallet"] })
  });
}
function usePayCampaignFromWalletMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (campaignId) => apiPost(`/wallet/campaigns/${campaignId}/pay`, void 0, getAccessToken()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wallet"] });
      queryClient.invalidateQueries({ queryKey: ["campaigns"] });
      queryClient.invalidateQueries({ queryKey: ["payments"] });
    }
  });
}
function useCreditRejectedCreativeToWalletMutation(campaignId) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (creativeId) => apiPost(`/wallet/creatives/${creativeId}/credit`, void 0, getAccessToken()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wallet"] });
      queryClient.invalidateQueries({ queryKey: ["creatives", "campaign", campaignId] });
    }
  });
}

// src/hooks/marketplaceFilters.ts
var EMPTY_FILTERS = {
  text: "",
  center: null,
  radiusKm: 5,
  locationCategories: [],
  categoryCodes: [],
  audience: [],
  traffic: "",
  displayTypes: [],
  environment: "",
  sizeBuckets: [],
  maxPricePerDay: null,
  dates: null
};
function activeFilterCount(f) {
  return f.locationCategories.length + f.categoryCodes.length + f.audience.length + (f.traffic ? 1 : 0) + f.displayTypes.length + (f.environment ? 1 : 0) + f.sizeBuckets.length + (f.maxPricePerDay != null ? 1 : 0) + (f.dates ? 1 : 0);
}
var csv = (values) => values.length ? values.join(",") : void 0;
function toSearchFilters(f, text) {
  const trimmed = text.trim();
  const isPin = /^\d{6}$/.test(trimmed);
  return {
    search: !isPin && !f.center && trimmed ? trimmed : void 0,
    pincode: isPin ? trimmed : void 0,
    lat: f.center ? String(f.center.lat) : void 0,
    lng: f.center ? String(f.center.lng) : void 0,
    radiusKm: f.center ? String(f.radiusKm) : void 0,
    locationCategory: csv(f.locationCategories),
    categoryCode: csv(f.categoryCodes),
    audience: csv(f.audience),
    traffic: f.traffic || void 0,
    displayType: csv(f.displayTypes),
    environment: f.environment || void 0,
    sizeBucket: csv(f.sizeBuckets),
    maxPrice: f.maxPricePerDay != null ? String(f.maxPricePerDay) : void 0,
    availableFrom: f.dates?.from,
    availableTo: f.dates?.to
  };
}

export { EMPTY_FILTERS, NOTIFICATIONS_LIST_KEY, NOTIFICATIONS_PREFERENCES_KEY, NOTIFICATIONS_UNREAD_COUNT_KEY, activeFilterCount, campaignReportPath, compareAppVersions, invoicePdfPath, playsExportPath, proofOfPlayExportPath, quotationPdfPath, registerPushToken, revenueExportPath, toSearchFilters, unregisterPushToken, useAcceptQuotationMutation, useActivateScreenMutation, useAddTicketMessageMutation, useAdminBookingFunnelQuery, useAdminFinanceQuery, useAdminGeographicQuery, useAdminOverviewQuery, useAdminRefundTrendQuery, useAdminRevenueQuery, useAdminScreensListQuery, useAdminSettlementDetailQuery, useAdminSettlementsQuery, useAdminTaxLedgerQuery, useAdminTicketsQuery, useAdminWalletsQuery, useAdvertiserAnalyticsQuery, useAdvertiserScreenPreviewQuery, useWalletQuery2 as useAdvertiserWalletQuery, useAppConfigQuery, useApplyMediaMutation, useApproveAdvertiserMutation, useApproveCreativeMutation, useApprovePaymentMutation, useApproveRefundMutation, useApproveScreenMutation, useApproveScreenPartnerMutation, useApproveSelfReservationMutation, useApproveWithdrawalMutation, useAssignTicketMutation, useCampaignAnalyticsQuery, useCampaignBookingsQuery, useCampaignCreativesQuery, useCampaignPlaybackQuery, useCampaignProofRequestsQuery, useCampaignQuery, useCampaignQuotationQuery, useCampaignQuoteQuery, useCampaignTrendQuery, useCancelBookingMutation, useCancelCampaignMutation, useCancelSelfReservationMutation, useCancelWithdrawalMutation, useCategoriesQuery, useChangeEmailMutation, useChangeMobileNumberMutation, useChangePasswordMutation, useCheckAvailabilityMutation, useCheckAvailabilityQuery, useCheckoutMutation, useClaimActivationMutation, useCloseTicketMutation, useCreateBookingMutation, useCreateCampaignMutation, useCreateKbArticleMutation, useCreateOrderMutation, useCreateRefundRequestMutation, useCreateScheduledReportMutation, useCreateScreenGroupMutation, useCreateTicketMutation, useCreateTopUpOrderMutation, useCreateWithdrawalMutation, useCreditRejectedCreativeToWalletMutation, useDailyCollectionsQuery, useDeactivateScreenMutation, useDeleteCampaignBannerMutation, useDeleteKbArticleMutation, useDeletePartnerAdMutation, useDeleteSavedPaymentMethodMutation, useDeleteScheduledReportMutation, useDeleteScreenGroupMutation, useDeleteScreenMutation, useDeleteScreenPhotoMutation, useDeliveryConfigQuery, useDeviceActivationsQuery, useDeviceHealthQuery, useDeviceLocationsQuery, useDevicePreviewQuery, useDisassociateBookingMutation, useDisplaySettingsQuery, useDuplicateCampaignMutation, useFeeConfigQuery, useFleetHealthSummaryQuery, useGoogleCompleteMutation, useGoogleLoginMutation, useHealthAlertConfigQuery, useHeartbeatHistoryQuery, useHeartbeatMapQuery, useInvalidateNotifications, useInvoiceDetailQuery, useKbArticleQuery, useKbArticlesQuery, useKycDocumentsQuery, useLiveScreensQuery, useLoginMutation, useLogout, useMarkAllNotificationsReadMutation, useMarkNotificationReadMutation, useMeQuery, useMonitoringTimelineQuery, useMyBookingsQuery, useMyCampaignsListQuery, useMyCampaignsQuery, useMyCreativesQuery, useMyDeviceHealthQuery, useMyDeviceLocationsQuery, useMyDocumentsQuery, useMyInvoicesQuery, useMyKycQuery, useMyLiveScreensTimelineQuery, useMyMonitoringTimelineQuery, useMyPartnerAdsQuery, useMyPartnerBookingsListQuery, useMyPartnerBookingsQuery, useMyPaymentsQuery, useMyPlaybackLogsQuery, useMyProofRequestsQuery, useMyQuotationQuery, useMyQuotationsQuery, useMyRefundsQuery, useMyScreenQuery, useMyScreensListQuery, useMyTicketsInfiniteQuery, useMyTicketsQuery, useMyWithdrawalsQuery, useNotificationPreferencesQuery, useNotificationsInfiniteQuery, useNotificationsQuery, usePartnerAnalyticsQuery, usePartnerStatsQuery, useWalletQuery as usePartnerWalletQuery, usePayCampaignFromWalletMutation, usePayQuotationMutation, usePaymentDetailQuery, usePaymentStatusQuery, usePaymentsConfigQuery, usePendingAdvertisersQuery, usePendingCreativesQuery, usePendingPaymentsQuery, usePendingRefundsQuery, usePendingScreenPartnersQuery, usePendingScreensQuery, usePendingSelfReservationsQuery, usePendingWithdrawalsQuery, usePhotosQuery, usePlacesQuery, usePlaybackHistoryQuery, usePlaybackMapQuery, usePlaysBreakdownQuery, usePlaysHeatmapQuery, usePlaysSummaryQuery, usePlaysTimeseriesQuery, usePriceEstimateQuery, useProofOfPlayQuery, useProofRequestSummaryQuery, useQuickRegisterScreenMutation, useRaisePaymentRequestMutation, useRecordPayoutMutation, useRegisterMutation, useRegisterPushTokenMutation, useRegisterScreenMutation, useRejectAdvertiserMutation, useRejectCreativeMutation, useRejectPaymentMutation, useRejectRefundMutation, useRejectScreenMutation, useRejectScreenPartnerMutation, useRejectSelfReservationMutation, useRejectWithdrawalMutation, useRemoveCampaignDocumentMutation, useRemoveCreativeMutation, useReopenTicketMutation, useReportFilterOptionsQuery, useRequestProofMutation, useRequestSelfReservationMutation, useReservationAdsQuery, useResetPasswordMutation, useResolveTicketMutation, useRevenueBreakdownQuery, useRevenueSummaryQuery, useRevenueTimeseriesQuery, useRevokeDeviceMutation, useSavedPaymentMethodsQuery, useSavedScreensQuery, useScheduledReportsQuery, useScreenAnalyticsQuery, useScreenAvailabilityQuery, useScreenBookingTimelineQuery, useScreenGroupQuery, useScreenGroupsQuery, useScreenLiveCampaignsQuery, useScreenQuery, useScreenSelfReservationsQuery, useScreenTimelineQuery, useSearchScreensQuery, useSendEmailLinkMutation, useSendEmailOtpMutation, useSendMobileOtpMutation, useSetSettlementCadenceMutation, useSlaConfigsQuery, useSubmitKycMutation, useSubmitProofMutation, useSubmitQuotationMutation, useSubmitScreenMutation, useSubmitTicketFeedbackMutation, useTicketDetailQuery, useTodayCollectionQuery, useToggleSavedScreenMutation, useUnreadCountQuery, useUnregisterPushTokenMutation, useUpdateAdvertiserBankDetailsMutation, useUpdateBankDetailsMutation, useUpdateCampaignBudgetMutation, useUpdateCampaignMutation, useUpdateFeeConfigMutation, useUpdateHealthAlertConfigMutation, useUpdateKbArticleMutation, useUpdateNotificationPreferencesMutation, useUpdatePaymentsConfigMutation, useUpdateProfileMutation, useUpdateScreenGroupMutation, useUpdateScreenMutation, useUpdateScreenPricingConfigMutation, useUpdateScreenSyncConfigMutation, useUpdateSelfReservationMutation, useUpdateSlaConfigMutation, useUpdateTicketStatusMutation, useUploadCampaignBannerMutation, useUploadCampaignDocumentMutation, useUploadCreativeMutation, useUploadDocumentMutation, useUploadPartnerAdMutation, useUploadPhotoMutation, useVerifyEmailMutation, useVerifyEmailOtpMutation, useVerifyMobileOtpMutation, useVerifyOtpMutation, useVerifyPaymentMutation, useVerifyTopUpMutation, useWalletQuery };
