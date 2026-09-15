import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiGet, apiGetPaginated, apiPatch, apiPost } from "../api/client";
import type { AdvertiserBooking, Booking, BookingStatus, CreateBookingResult, PartnerBooking, PriceBreakdown } from "../types/bookings";
import type { DiscoveryScreen } from "../types/screens";
import { getAccessToken, session, useHasSession, useSession } from "../api/session";

export function useCampaignBookingsQuery(campaignId: string) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["bookings", "campaign", campaignId],
    queryFn: () => apiGet<Booking[]>(`/bookings/campaign/${campaignId}`, getAccessToken()),
    enabled: hasAccessToken && !!campaignId,
  });
}

export function useMyPartnerBookingsQuery() {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["bookings", "partner"],
    queryFn: () => apiGet<PartnerBooking[]>("/bookings/partner", getAccessToken()),
    enabled: hasAccessToken,
  });
}

export interface MyPartnerBookingsListFilters {
  status?: BookingStatus;
}

const PARTNER_BOOKINGS_PAGE_LIMIT = 20;

// The scalable "Running & Upcoming Ads" list — infinite-scrolls over
// GET /bookings/partner/list (paginated, filtered server-side) instead of
// useMyPartnerBookingsQuery's full unpaginated array. Mirrors
// useCampaigns.ts's useMyCampaignsListQuery / useScreens.ts's
// useMyScreensListQuery.
export function useMyPartnerBookingsListQuery(filters: MyPartnerBookingsListFilters) {
  const hasAccessToken = useHasSession();
  return useInfiniteQuery({
    queryKey: ["bookings", "partner", "list", filters],
    queryFn: ({ pageParam }) => {
      const query = new URLSearchParams({ page: String(pageParam), limit: String(PARTNER_BOOKINGS_PAGE_LIMIT) });
      if (filters.status) query.set("status", filters.status);
      return apiGetPaginated<PartnerBooking>(`/bookings/partner/list?${query.toString()}`, getAccessToken());
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.meta.page * lastPage.meta.limit < lastPage.meta.total ? lastPage.meta.page + 1 : undefined,
    enabled: hasAccessToken,
  });
}

// The advertiser-side counterpart to useMyPartnerBookingsListQuery — GET
// /bookings/mine, paginated server-side. Used for the dashboard's "recent
// activity" card's Screens tab (just page 1 at a small limit); a future
// "all my bookings" page would reach for useInfiniteQuery instead, same as
// useMyPartnerBookingsListQuery does.
export function useMyBookingsQuery(page: number, limit = 10, status?: BookingStatus) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["bookings", "mine", page, limit, status],
    queryFn: () => {
      const query = new URLSearchParams({ page: String(page), limit: String(limit) });
      if (status) query.set("status", status);
      return apiGetPaginated<AdvertiserBooking>(`/bookings/mine?${query.toString()}`, getAccessToken());
    },
    enabled: hasAccessToken,
  });
}

export function useScreenQuery(screenId: string) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["screens", screenId],
    queryFn: () => apiGet<DiscoveryScreen>(`/screens/${screenId}`, getAccessToken()),
    enabled: hasAccessToken && !!screenId,
  });
}

export interface ScreenAvailabilityEntry {
  /** Only present on the owner/admin timeline variant — see useScreenBookingTimelineQuery. */
  bookingId?: string;
  campaignId?: string;
  campaignName?: string;
  /** Only present for status "OWNER_RESERVED" — the screen partner's own ad inventory, see useScreenSelfReservationsQuery. */
  selfReservationId?: string;
  note?: string;
  startDate: string;
  endDate: string;
  /** Booking statuses (RESERVED/CONFIRMED) or "OWNER_RESERVED" for the partner's own approved self-reservations. */
  status: string;
  slotStartHour: number | null;
  slotEndHour: number | null;
  /** The partner's own N-ads-at-once count — self-reservation entries only. Equal to `reservationWeight` for those entries. */
  slotCount?: number;
  /**
   * How many approved creatives this booking's campaign currently has (0–5) — booking entries only.
   * This is the MEDIA-approval number (cs-api's assertCreativeApprovalCapacity), NOT the reservation
   * gate. Never sum this to decide whether a screen is bookable — use `reservationWeight`.
   */
  mediaCount?: number;
  /**
   * How much of `maxAdCapacity` this entry consumes for the RESERVATION gate: always 1 for a
   * booking, `slotCount` for a self-reservation. Mirrors cs-api's countOccupiedBookings exactly.
   */
  reservationWeight: number;
  /** When this hold lapses — RESERVED bookings only; null for CONFIRMED (never expires) and self-reservations. */
  reservedUntil?: string | null;
}

export interface ScreenAvailability {
  /** How many concurrent bookings this screen's ad rotation can hold for the same date — see cs-api's 20260101000073 migration. */
  maxAdCapacity: number;
  entries: ScreenAvailabilityEntry[];
}

// Public/anonymized — reachable by any authenticated user browsing a
// screen (including a competing advertiser), so entries never carry
// campaign identity. Used by the reserve flow's "how crowded is this
// screen" timeline and the public screen detail page's calendar.
export function useScreenAvailabilityQuery(screenId: string) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["bookings", "screen-availability", screenId],
    queryFn: () => apiGet<ScreenAvailability>(`/bookings/screens/${screenId}/availability`, getAccessToken()),
    enabled: hasAccessToken && !!screenId,
  });
}

// Owner/admin counterpart — same shape, entries include real campaign
// identity. Only the screen's own partner or an admin can reach this (the
// backend 403s anyone else); used on the screen's own detail page to show
// "today's ongoing campaigns" instead of an anonymized count.
export function useScreenBookingTimelineQuery(screenId: string) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["bookings", "screen-timeline", screenId],
    queryFn: () => apiGet<ScreenAvailability>(`/bookings/screens/${screenId}/timeline`, getAccessToken()),
    enabled: hasAccessToken && !!screenId,
  });
}

export function usePriceEstimateQuery(screenIds: string[], startDate: string, endDate: string) {
  return useQuery({
    queryKey: ["pricing", "estimate", screenIds, startDate, endDate],
    queryFn: () =>
      apiPost<PriceBreakdown>(
        "/pricing/estimate",
        { screenIds, startDate, endDate },
        getAccessToken()
      ),
    enabled: screenIds.length > 0,
  });
}

export function useCreateBookingMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: {
      campaignId: string;
      screenIds: string[];
      startDate: string;
      endDate: string;
      slotStartHour?: number;
      slotEndHour?: number;
      /** Per-screen slot override, keyed by screenId — mutually exclusive with the top-level slotStartHour/slotEndHour (see cs-api's createBookingSchema). A screen absent here books full-day. */
      screenSlots?: Record<string, { slotStartHour: number; slotEndHour: number }>;
    }) => apiPost<CreateBookingResult>("/bookings", input, getAccessToken()),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["bookings", "campaign", variables.campaignId] });
      queryClient.invalidateQueries({ queryKey: ["campaigns", variables.campaignId] });
      queryClient.invalidateQueries({ queryKey: ["screens", "search"] });
    },
  });
}

export function useCancelBookingMutation(campaignId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (bookingId: string) =>
      apiPost(`/bookings/${bookingId}/cancel`, undefined, getAccessToken()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings", "campaign", campaignId] });
    },
  });
}

// cancelBooking's counterpart for a screen whose booking is already
// CONFIRMED (or beyond) — see bookings.service.js's disassociateBooking.
// No refund/payment side effect; just releases the screen from the campaign.
export function useDisassociateBookingMutation(campaignId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (bookingId: string) =>
      apiPost(`/bookings/${bookingId}/disassociate`, undefined, getAccessToken()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings", "campaign", campaignId] });
    },
  });
}

// The screen partner's own ad inventory (e.g. their pre-existing ads
// already running on a screen they've onboarded to CASTADI) — see cs-api's
// 20260101000074 migration. A partner proposes N slots for a date range;
// it doesn't reduce this screen's bookable capacity until an admin
// approves it. An admin creating one directly is auto-approved instead of
// going through its own queue.
export type SelfReservationStatus = "PENDING" | "APPROVED" | "REJECTED" | "CANCELLED";

export interface SelfReservation {
  id: string;
  screenId: string;
  startDate: string;
  endDate: string;
  slotCount: number;
  /**
   * Non-null only while the partner has asked for MORE slots and an admin hasn't ruled on it yet.
   * `slotCount` above stays the live, effective figure throughout — see cs-api's 20260101000094
   * migration. A decrease never lands here; it applies immediately.
   */
  requestedSlotCount: number | null;
  note: string | null;
  status: SelfReservationStatus;
  requestedBy: string;
  reviewedBy: string | null;
  reviewedAt: string | null;
  rejectionReason: string | null;
  createdAt: string;
}

export interface AdminSelfReservation extends SelfReservation {
  screenName: string;
  screenCity: string;
  /** The screen's total ad-rotation capacity — see cs-api's 20260101000073 migration. */
  screenMaxAdCapacity: number;
  /** Everything else occupying these dates already (bookings + other approved self-reservations), BEFORE this request. */
  screenOccupiedSlots: number;
  /** What this decision would add on top of screenOccupiedSlots — the full ask for a new request, just the delta for an increase. */
  requestedAdditionalSlots: number;
}

function invalidateSelfReservationViews(queryClient: ReturnType<typeof useQueryClient>, screenId: string) {
  queryClient.invalidateQueries({ queryKey: ["bookings", "self-reservations", "screen", screenId] });
  queryClient.invalidateQueries({ queryKey: ["bookings", "self-reservations", "pending"] });
  queryClient.invalidateQueries({ queryKey: ["bookings", "screen-availability", screenId] });
  queryClient.invalidateQueries({ queryKey: ["bookings", "screen-timeline", screenId] });
}

export function useScreenSelfReservationsQuery(screenId: string) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["bookings", "self-reservations", "screen", screenId],
    queryFn: () => apiGet<SelfReservation[]>(`/bookings/screens/${screenId}/self-reservations`, getAccessToken()),
    enabled: hasAccessToken && !!screenId,
  });
}

export function useRequestSelfReservationMutation(screenId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: { startDate: string; endDate: string; slotCount: number; note?: string }) =>
      apiPost<SelfReservation>(`/bookings/screens/${screenId}/self-reservations`, input, getAccessToken()),
    onSuccess: () => invalidateSelfReservationViews(queryClient, screenId),
  });
}

export function useCancelSelfReservationMutation(screenId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      apiPost<SelfReservation>(`/bookings/self-reservations/${id}/cancel`, undefined, getAccessToken()),
    onSuccess: () => invalidateSelfReservationViews(queryClient, screenId),
  });
}

// Adjusting a block after the fact — the partner's offline clients come and
// go, so this figure isn't fixed at onboarding. Lowering `slotCount` (or
// shortening `endDate`) applies immediately since it only ever hands
// capacity back; raising it parks in `requestedSlotCount` for admin review.
// See cs-api's bookings.service.js updateSelfReservation.
export function useUpdateSelfReservationMutation(screenId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...input }: { id: string; slotCount?: number; endDate?: string; note?: string }) =>
      apiPatch<SelfReservation>(`/bookings/self-reservations/${id}`, input, getAccessToken()),
    onSuccess: () => invalidateSelfReservationViews(queryClient, screenId),
  });
}

// Admin review queue — mirrors useScreens.ts's usePendingScreensQuery, but
// (unlike that one) also called unconditionally from useNavBadgeCounts.ts's
// useAdminNavBadgeCounts for every dashboard load regardless of role, so it
// needs its own `enabled` gate rather than just hasAccessToken — without it,
// a non-admin's dashboard would 403 against this admin-only endpoint and
// surface a "Forbidden" toast on every load (apiClient's reportApiError).
export function usePendingSelfReservationsQuery(page: number, limit = 20, options: { enabled?: boolean } = {}) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["bookings", "self-reservations", "pending", page, limit],
    queryFn: () =>
      apiGetPaginated<AdminSelfReservation>(
        `/bookings/self-reservations/pending?page=${page}&limit=${limit}`,
        getAccessToken()
      ),
    enabled: hasAccessToken && (options.enabled ?? true),
  });
}

export function useApproveSelfReservationMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id }: { id: string; screenId: string }) =>
      apiPost<SelfReservation>(`/bookings/self-reservations/${id}/approve`, undefined, getAccessToken()),
    onSuccess: (_data, { screenId }) => invalidateSelfReservationViews(queryClient, screenId),
  });
}

export function useRejectSelfReservationMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, reason }: { id: string; screenId: string; reason: string }) =>
      apiPost<SelfReservation>(`/bookings/self-reservations/${id}/reject`, { reason }, getAccessToken()),
    onSuccess: (_data, { screenId }) => invalidateSelfReservationViews(queryClient, screenId),
  });
}
