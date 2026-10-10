import * as _tanstack_react_query from '@tanstack/react-query';
import { bj as RevenueGranularity, c as AdminFinance, _ as GeographicRow, d as AdminOverview, b8 as RefundTrend, f as AdminRevenue, bW as TaxLedgerFilters, i as AdminTaxLedger, l as AdvertiserAnalytics, C as CampaignAnalytics, y as CampaignTrend, as as PartnerAnalytics, aQ as ProofOfPlay, bx as ScreenAnalytics, ba as ReportFilters, aK as PlaysGroupBy, bk as RevenueGroupBy, aI as PlaysBreakdown, aL as PlaysHeatmap, aM as PlaysSummary, bd as ReportGranularity, aN as PlaysTimeseries, b9 as ReportFilterOptions, bh as RevenueBreakdown, bl as RevenueSummary, bm as RevenueTimeseries, P as DiscoveryScreen, aa as KycDocument, az as PendingAdvertiserRow, aB as PendingScreenPartnerRow, E as Creative, ac as LiveScreen, aA as PendingCreative, q as AdvertiserScreenPreview, aF as PlaybackSummary, L as DeviceActivation, bz as ScreenHealth, bD as ScreenLocation, aP as PreviewPlaylist, Z as FleetHealthSummary, $ as HealthAlertConfig, N as DeviceLogHistory, a0 as HeartbeatHistoryRow, O as DeviceLogMapEntry, ae as MonitoringTimeline, af as MyScreenHealth, c3 as TimelineScreen, aE as PlaybackLogEntry, ag as MyScreenSummary, aD as PlaybackHistoryRow, a9 as KbCategory, a8 as KbArticle, ah as Notification, aj as NotificationPreferences, aq as PartnerAdStatus, ar as PartnerAdWithContext, bg as ReservationAds, ap as PartnerAd, bK as SettlementMode, ax as Payment, z as CreateOrderResult, a6 as InvoiceDetail, B as BillingFilters, a5 as Invoice, bu as SavedPaymentMethod, w as CampaignProofRequest, aV as ProofRequestStatus, aS as ProofRequest, aW as ProofRequestSummary, bC as ScreenLiveCampaign, aZ as QuotationDetail, aX as Quotation, b5 as Refund, e as AdminRefund, g as AdminSettlement, h as AdminSettlementFilters, j as AdminWallet, c8 as WithdrawalRequest, bv as ScheduledReport, bc as ReportFrequency, bb as ReportFormat, K as DailyCollection, R as DisplaySettings, Y as FeeConfig, at as Wallet, k as AdminWithdrawalRequest, bJ as SettlementCadence, c4 as TodayCollection, bI as ScreenVerificationStatus, bw as Screen, bA as ScreenListItem, by as ScreenCategory, bH as ScreenPhoto, c1 as TicketStatus, bZ as TicketCategory, c0 as TicketPriority, b$ as TicketMessage, bY as Ticket, t as AssignmentTeam, bL as SlaConfig, b_ as TicketDetail, W as Wallet$1, D as CreateTopUpOrderResult, G as CreditRejectedCreativeResult, aw as PayCampaignFromWalletResult } from '../wallet-C5ikw681.js';
import * as _tanstack_query_core from '@tanstack/query-core';
import { P as PaginationMeta } from '../client-B6tfZPvn.js';
import { S as SessionLimitDetail, C as CurrentUser, G as GoogleAuthResult, L as LoginActivityEvent, T as TokenPair, b as LoginSummary, A as AuthSession } from '../auth-BLLKmqYX.js';
import { e as BookingStatus, B as Booking, c as AvailabilityCheckResult, o as CreateBookingResult, b as AdvertiserBooking, r as PartnerBooking, u as PriceBreakdown, m as CampaignStatus, f as Campaign, g as CampaignBanner, Q as QuoteInput, l as CampaignQuote, n as CheckoutResult, s as PaymentMethod, D as DeliveryConfig, t as PaymentsConfig, j as CampaignDocumentType, i as CampaignDocument, F as FrequencyLevel } from '../campaigns-6nJvR6CG.js';

declare function useAdvertiserAnalyticsQuery(): _tanstack_react_query.UseQueryResult<AdvertiserAnalytics, Error>;
declare function usePartnerAnalyticsQuery(): _tanstack_react_query.UseQueryResult<PartnerAnalytics, Error>;
declare function useCampaignAnalyticsQuery(campaignId: string): _tanstack_react_query.UseQueryResult<CampaignAnalytics, Error>;
declare function useCampaignTrendQuery(campaignId: string): _tanstack_react_query.UseQueryResult<CampaignTrend, Error>;
declare function useScreenAnalyticsQuery(screenId: string): _tanstack_react_query.UseQueryResult<ScreenAnalytics, Error>;
declare function useAdminOverviewQuery(): _tanstack_react_query.UseQueryResult<AdminOverview, Error>;
declare function useAdminRevenueQuery(granularity: RevenueGranularity): _tanstack_react_query.UseQueryResult<AdminRevenue, Error>;
declare function useAdminGeographicQuery(): _tanstack_react_query.UseQueryResult<GeographicRow[], Error>;
declare function useAdminBookingFunnelQuery(): _tanstack_react_query.UseQueryResult<{
    status: string;
    count: number;
}[], Error>;
declare function useAdminRefundTrendQuery(): _tanstack_react_query.UseQueryResult<RefundTrend, Error>;
declare function useAdminFinanceQuery(granularity: RevenueGranularity): _tanstack_react_query.UseQueryResult<AdminFinance, Error>;
declare function useAdminTaxLedgerQuery(page: number, filters: TaxLedgerFilters): _tanstack_react_query.UseQueryResult<AdminTaxLedger, Error>;
declare function useProofOfPlayQuery(campaignId: string, enabled?: boolean): _tanstack_react_query.UseQueryResult<ProofOfPlay, Error>;
/** API path of a campaign's Proof of Play download (fetch with the session token). */
declare const proofOfPlayExportPath: (campaignId: string, format: "pdf" | "csv") => string;
/** API path of a campaign's report PDF. */
declare const campaignReportPath: (campaignId: string) => string;

declare const usePlaysSummaryQuery: (f: ReportFilters) => _tanstack_react_query.UseQueryResult<PlaysSummary, Error>;
declare const usePlaysTimeseriesQuery: (f: ReportFilters, granularity?: ReportGranularity, groupBy?: PlaysGroupBy) => _tanstack_react_query.UseQueryResult<PlaysTimeseries, Error>;
declare const usePlaysBreakdownQuery: (f: ReportFilters, groupBy: PlaysGroupBy) => _tanstack_react_query.UseQueryResult<PlaysBreakdown, Error>;
declare const usePlaysHeatmapQuery: (f: ReportFilters) => _tanstack_react_query.UseQueryResult<PlaysHeatmap, Error>;
declare function useReportFilterOptionsQuery(): _tanstack_react_query.UseQueryResult<ReportFilterOptions, Error>;
declare const useRevenueSummaryQuery: (f: ReportFilters) => _tanstack_react_query.UseQueryResult<RevenueSummary, Error>;
declare const useRevenueTimeseriesQuery: (f: ReportFilters, granularity?: ReportGranularity, groupBy?: RevenueGroupBy) => _tanstack_react_query.UseQueryResult<RevenueTimeseries, Error>;
declare const useRevenueBreakdownQuery: (f: ReportFilters, groupBy: RevenueGroupBy) => _tanstack_react_query.UseQueryResult<RevenueBreakdown, Error>;
declare const playsExportPath: (f: ReportFilters, groupBy: PlaysGroupBy, format: "csv" | "xlsx" | "pdf") => string;
declare const revenueExportPath: (f: ReportFilters, groupBy: RevenueGroupBy, format: "csv" | "xlsx" | "pdf") => string;

declare function useMeQuery(): _tanstack_react_query.UseQueryResult<CurrentUser, Error>;
interface LoginInput {
    identifier: string;
    password: string;
}
declare function useLoginMutation(): _tanstack_react_query.UseMutationResult<TokenPair, Error, LoginInput, unknown>;
/**
 * Posts a Google ID token to /auth/google. Deliberately does NOT store the
 * session: the caller (cs-mobile's useGoogleAuth) must first check the
 * account's role against the app, exactly like useAppLoginMutation does.
 */
declare function useGoogleLoginMutation(): _tanstack_react_query.UseMutationResult<GoogleAuthResult, Error, {
    idToken: string;
    nonce?: string;
}, unknown>;
type GoogleCompleteInput = Omit<RegisterInput, "email" | "password" | "inviteCode"> & {
    signupToken: string;
};
/** Creates the account after a PROFILE_REQUIRED Google sign-in. Returns tokens; the caller stores them after its role check. */
declare function useGoogleCompleteMutation(): _tanstack_react_query.UseMutationResult<GoogleAuthResult, Error, GoogleCompleteInput, unknown>;
interface RegisterInput {
    fullName: string;
    mobileNumber: string;
    email?: string;
    password: string;
    role: "ADVERTISER" | "SCREEN_PARTNER";
    referralCode?: string;
    businessName?: string;
    contactPerson?: string;
    businessType?: string;
    budgetRange?: string;
    partnerType?: string;
    dateOfBirth?: string;
    city?: string;
    state?: string;
    /** Redeems a team invite — joins the inviter's advertiser account instead
     * of creating a new one; businessName/contactPerson are omitted in this
     * case (the backend rejects them alongside an inviteCode). */
    inviteCode?: string;
}
interface RegisterResult {
    userId: string;
    status: string;
}
declare function useRegisterMutation(): _tanstack_react_query.UseMutationResult<RegisterResult, Error, RegisterInput, unknown>;
declare function useCheckAvailabilityMutation(): _tanstack_react_query.UseMutationResult<{
    available: boolean;
}, Error, {
    mobileNumber: string;
    email?: string;
}, unknown>;
interface VerifyOtpInput {
    userId: string;
    accessToken: string;
}
declare function useVerifyOtpMutation(): _tanstack_react_query.UseMutationResult<TokenPair, Error, VerifyOtpInput, unknown>;
declare function useSendMobileOtpMutation(): _tanstack_react_query.UseMutationResult<{
    status: string;
}, Error, string, unknown>;
declare function useVerifyMobileOtpMutation(): _tanstack_react_query.UseMutationResult<TokenPair, Error, {
    userId: string;
    code: string;
}, unknown>;
declare function useSendEmailLinkMutation(): _tanstack_react_query.UseMutationResult<{
    status: string;
}, Error, string, unknown>;
declare function useVerifyEmailMutation(): _tanstack_react_query.UseMutationResult<TokenPair, Error, string, unknown>;
declare function useSendEmailOtpMutation(): _tanstack_react_query.UseMutationResult<{
    status: string;
}, Error, string, unknown>;
declare function useVerifyEmailOtpMutation(): _tanstack_react_query.UseMutationResult<TokenPair, Error, {
    userId: string;
    code: string;
}, unknown>;
interface ResetPasswordInput {
    identifier: string;
    accessToken: string;
    newPassword: string;
}
declare function useResetPasswordMutation(): _tanstack_react_query.UseMutationResult<{
    status: string;
}, Error, ResetPasswordInput, unknown>;
interface ChangePasswordInput {
    currentPassword: string;
    newPassword: string;
}
declare function useChangePasswordMutation(): _tanstack_react_query.UseMutationResult<{
    status: string;
}, Error, ChangePasswordInput, unknown>;
declare function useUpdateProfileMutation(): _tanstack_react_query.UseMutationResult<CurrentUser, Error, {
    fullName?: string;
    preferredLanguage?: "en" | "hi";
}, unknown>;
declare function useChangeMobileNumberMutation(): _tanstack_react_query.UseMutationResult<CurrentUser, Error, {
    newMobileNumber: string;
    accessToken: string;
}, unknown>;
declare function useChangeEmailMutation(): _tanstack_react_query.UseMutationResult<CurrentUser, Error, {
    newEmail: string;
    accessToken: string;
}, unknown>;
declare function useLogout(): () => void;
/** Pulls the ticket + sessions out of a login rejected by the per-platform session cap, else null. */
declare function getSessionLimit(error: unknown): SessionLimitDetail | null;
/** Finishes a login blocked by the session cap: signs `revokeSessionId` out and returns tokens (caller stores them after its role check). */
declare function useResolveSessionLimitMutation(): _tanstack_react_query.UseMutationResult<TokenPair, Error, {
    loginTicket: string;
    revokeSessionId: string;
}, unknown>;
declare function useSessionsQuery(): _tanstack_react_query.UseQueryResult<AuthSession[], Error>;
declare function useRevokeSessionMutation(): _tanstack_react_query.UseMutationResult<{
    status: string;
}, Error, string, unknown>;
declare function useRevokeOtherSessionsMutation(): _tanstack_react_query.UseMutationResult<{
    revoked: number;
}, Error, void, unknown>;
declare function useTrustSessionMutation(): _tanstack_react_query.UseMutationResult<{
    status: string;
}, Error, string, unknown>;
/** Best-effort server-side logout (revokes this session). Never throws: local sign-out must always succeed. */
declare function logoutOnServer(): Promise<void>;
/** Login history for the Activity page (GET /auth/activity), newest first, loaded a page at a time. */
declare function useLoginActivityQuery(): _tanstack_react_query.UseInfiniteQueryResult<_tanstack_query_core.InfiniteData<{
    rows: LoginActivityEvent[];
    meta: PaginationMeta;
}, unknown>, Error>;
/** Per-day sign-in counts for the Activity heatmap (GET /auth/activity/summary). */
declare function useLoginSummaryQuery(): _tanstack_react_query.UseQueryResult<LoginSummary, Error>;

declare function useCampaignBookingsQuery(campaignId: string): _tanstack_react_query.UseQueryResult<Booking[], Error>;
declare function useMyPartnerBookingsQuery(): _tanstack_react_query.UseQueryResult<PartnerBooking[], Error>;
interface MyPartnerBookingsListFilters {
    status?: BookingStatus;
}
declare function useMyPartnerBookingsListQuery(filters: MyPartnerBookingsListFilters): _tanstack_react_query.UseInfiniteQueryResult<_tanstack_query_core.InfiniteData<{
    rows: PartnerBooking[];
    meta: PaginationMeta;
}, unknown>, Error>;
declare function useMyBookingsQuery(page: number, limit?: number, status?: BookingStatus): _tanstack_react_query.UseQueryResult<{
    rows: AdvertiserBooking[];
    meta: PaginationMeta;
}, Error>;
declare function useScreenQuery(screenId: string): _tanstack_react_query.UseQueryResult<DiscoveryScreen, Error>;
interface ScreenAvailabilityEntry {
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
interface ScreenAvailability {
    /** How many concurrent bookings this screen's ad rotation can hold for the same date — see cs-api's 20260101000073 migration. */
    maxAdCapacity: number;
    entries: ScreenAvailabilityEntry[];
}
declare function useScreenAvailabilityQuery(screenId: string): _tanstack_react_query.UseQueryResult<ScreenAvailability, Error>;
declare function useScreenBookingTimelineQuery(screenId: string): _tanstack_react_query.UseQueryResult<ScreenAvailability, Error>;
declare function usePriceEstimateQuery(screenIds: string[], startDate: string, endDate: string): _tanstack_react_query.UseQueryResult<PriceBreakdown, Error>;
declare function useCreateBookingMutation(): _tanstack_react_query.UseMutationResult<CreateBookingResult, Error, {
    campaignId: string;
    screenIds: string[];
    startDate: string;
    endDate: string;
    slotStartHour?: number;
    slotEndHour?: number;
    /** Per-screen slot override, keyed by screenId — mutually exclusive with the top-level slotStartHour/slotEndHour (see cs-api's createBookingSchema). A screen absent here books full-day. */
    screenSlots?: Record<string, {
        slotStartHour: number;
        slotEndHour: number;
    }>;
}, unknown>;
declare function useCancelBookingMutation(campaignId: string): _tanstack_react_query.UseMutationResult<unknown, Error, string, unknown>;
declare function useDisassociateBookingMutation(campaignId: string): _tanstack_react_query.UseMutationResult<unknown, Error, string, unknown>;
type SelfReservationStatus = "PENDING" | "APPROVED" | "REJECTED" | "CANCELLED";
interface SelfReservation {
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
interface AdminSelfReservation extends SelfReservation {
    screenName: string;
    screenCity: string;
    /** The screen's total ad-rotation capacity — see cs-api's 20260101000073 migration. */
    screenMaxAdCapacity: number;
    /** Everything else occupying these dates already (bookings + other approved self-reservations), BEFORE this request. */
    screenOccupiedSlots: number;
    /** What this decision would add on top of screenOccupiedSlots — the full ask for a new request, just the delta for an increase. */
    requestedAdditionalSlots: number;
}
declare function useScreenSelfReservationsQuery(screenId: string): _tanstack_react_query.UseQueryResult<SelfReservation[], Error>;
declare function useRequestSelfReservationMutation(screenId: string): _tanstack_react_query.UseMutationResult<SelfReservation, Error, {
    startDate: string;
    endDate: string;
    slotCount: number;
    note?: string;
}, unknown>;
declare function useCancelSelfReservationMutation(screenId: string): _tanstack_react_query.UseMutationResult<SelfReservation, Error, string, unknown>;
declare function useUpdateSelfReservationMutation(screenId: string): _tanstack_react_query.UseMutationResult<SelfReservation, Error, {
    id: string;
    slotCount?: number;
    endDate?: string;
    note?: string;
}, unknown>;
declare function usePendingSelfReservationsQuery(page: number, limit?: number, options?: {
    enabled?: boolean;
}): _tanstack_react_query.UseQueryResult<{
    rows: AdminSelfReservation[];
    meta: PaginationMeta;
}, Error>;
declare function useApproveSelfReservationMutation(): _tanstack_react_query.UseMutationResult<SelfReservation, Error, {
    id: string;
    screenId: string;
}, unknown>;
declare function useRejectSelfReservationMutation(): _tanstack_react_query.UseMutationResult<SelfReservation, Error, {
    id: string;
    screenId: string;
    reason: string;
}, unknown>;
declare function useCheckAvailabilityQuery(params: {
    campaignId: string;
    screenIds: string[];
    startDate: string;
    endDate: string;
} | null): _tanstack_react_query.UseQueryResult<AvailabilityCheckResult, Error>;

interface KycSubmitResult {
    verificationStatus?: string;
    kycStatus?: string;
}
declare function useMyKycQuery<T>(): _tanstack_react_query.UseQueryResult<T, Error>;
declare function useMyDocumentsQuery(): _tanstack_react_query.UseQueryResult<KycDocument[], Error>;
declare function useSubmitKycMutation(): _tanstack_react_query.UseMutationResult<KycSubmitResult, Error, Record<string, unknown>, unknown>;
/** A browser File/Blob, or a React Native file reference (`{ uri, name, type }`). */
type UploadFile = Blob | {
    uri: string;
    name: string;
    type: string;
};
interface UploadDocumentInput {
    documentType: string;
    file: UploadFile;
}
interface UploadDocumentResult {
    id: string;
    documentType: string;
    uploadedAt: string;
}
declare function useUploadDocumentMutation(): _tanstack_react_query.UseMutationResult<UploadDocumentResult, Error, UploadDocumentInput, unknown>;
interface BankDetailsInput {
    bankAccountNumber: string;
    bankIfsc: string;
    bankAccountName: string;
    upiId?: string;
}
declare function useUpdateBankDetailsMutation(): _tanstack_react_query.UseMutationResult<BankDetailsInput, Error, BankDetailsInput, unknown>;
declare function useUpdateAdvertiserBankDetailsMutation(): _tanstack_react_query.UseMutationResult<BankDetailsInput, Error, BankDetailsInput, unknown>;
declare function usePendingAdvertisersQuery(options?: {
    enabled?: boolean;
}): _tanstack_react_query.UseQueryResult<PendingAdvertiserRow[], Error>;
declare function usePendingScreenPartnersQuery(options?: {
    enabled?: boolean;
}): _tanstack_react_query.UseQueryResult<PendingScreenPartnerRow[], Error>;
declare function useKycDocumentsQuery(kind: "advertisers" | "screen-partners", id: string, enabled: boolean): _tanstack_react_query.UseQueryResult<KycDocument[], Error>;
declare const useApproveAdvertiserMutation: () => _tanstack_react_query.UseMutationResult<unknown, Error, {
    id: string;
    reason?: string;
}, unknown>;
declare const useRejectAdvertiserMutation: () => _tanstack_react_query.UseMutationResult<unknown, Error, {
    id: string;
    reason?: string;
}, unknown>;
declare const useApproveScreenPartnerMutation: () => _tanstack_react_query.UseMutationResult<unknown, Error, {
    id: string;
    reason?: string;
}, unknown>;
declare const useRejectScreenPartnerMutation: () => _tanstack_react_query.UseMutationResult<unknown, Error, {
    id: string;
    reason?: string;
}, unknown>;

declare function useMyCampaignsQuery(): _tanstack_react_query.UseQueryResult<Campaign[], Error>;
interface MyCampaignsListFilters {
    status?: CampaignStatus;
    search?: string;
    live?: boolean;
}
declare function useMyCampaignsListQuery(filters: MyCampaignsListFilters): _tanstack_react_query.UseInfiniteQueryResult<_tanstack_query_core.InfiniteData<{
    rows: Campaign[];
    meta: PaginationMeta;
}, unknown>, Error>;
declare function useCampaignQuery(id: string): _tanstack_react_query.UseQueryResult<Campaign, Error>;
declare function useCreateCampaignMutation(): _tanstack_react_query.UseMutationResult<Campaign, Error, Record<string, unknown>, unknown>;
interface DuplicateCampaignInput {
    campaignId: string;
    /** The source's old dates are rarely useful to reuse (they've often already passed) — always prompted for, not optional in the UI. */
    startDate: string;
    endDate: string;
}
declare function useDuplicateCampaignMutation(): _tanstack_react_query.UseMutationResult<Campaign, Error, DuplicateCampaignInput, unknown>;
declare function useUploadCampaignBannerMutation(): _tanstack_react_query.UseMutationResult<CampaignBanner, Error, {
    campaignId: string;
    file: UploadFile;
}, unknown>;
declare function useDeleteCampaignBannerMutation(): _tanstack_react_query.UseMutationResult<unknown, Error, {
    campaignId: string;
    bannerId: string;
}, unknown>;
declare function useUpdateCampaignBudgetMutation(): _tanstack_react_query.UseMutationResult<Campaign, Error, {
    campaignId: string;
    totalBudget: number;
}, unknown>;
declare function useCancelCampaignMutation(): _tanstack_react_query.UseMutationResult<Campaign, Error, string, unknown>;

declare function useCampaignQuoteQuery(input: QuoteInput | null): _tanstack_react_query.UseQueryResult<CampaignQuote, Error>;
declare function useDeliveryConfigQuery(): _tanstack_react_query.UseQueryResult<DeliveryConfig, Error>;
declare function usePaymentsConfigQuery(): _tanstack_react_query.UseQueryResult<PaymentsConfig, Error>;
/** General draft edit — the builder saves each step as the advertiser moves on. */
declare function useUpdateCampaignMutation(): _tanstack_react_query.UseMutationResult<Campaign, Error, {
    campaignId: string;
    values: Record<string, unknown>;
}, unknown>;
/** "Replace ad" before paying — cs-api only allows it for an unreviewed ad on an unpaid campaign. */
declare function useRemoveCreativeMutation(): _tanstack_react_query.UseMutationResult<unknown, Error, {
    creativeId: string;
    campaignId: string;
}, unknown>;
/** Attach (or replace) a campaign's quotation / receipt — high-value flow. */
declare function useUploadCampaignDocumentMutation(): _tanstack_react_query.UseMutationResult<CampaignDocument, Error, {
    campaignId: string;
    type: CampaignDocumentType;
    file: UploadFile;
}, unknown>;
declare function useRemoveCampaignDocumentMutation(): _tanstack_react_query.UseMutationResult<unknown, Error, {
    campaignId: string;
    type: CampaignDocumentType;
}, unknown>;
/** Admin: set the approval switch and the quotation threshold. */
declare function useUpdatePaymentsConfigMutation(): _tanstack_react_query.UseMutationResult<PaymentsConfig, Error, Partial<Pick<PaymentsConfig, "requireAdminApproval" | "quotationRequiredAbove">>, unknown>;
declare function useCheckoutMutation(): _tanstack_react_query.UseMutationResult<CheckoutResult, Error, {
    campaignId: string;
    screenIds: string[];
    startDate: string;
    endDate: string;
    paymentMethod: PaymentMethod;
}, unknown>;

declare function useCampaignCreativesQuery(campaignId: string): _tanstack_react_query.UseQueryResult<Creative[], Error>;
interface UploadCreativeInput {
    file: UploadFile;
    /** Whole seconds, 1–120. Videos should send their real length. */
    durationSeconds?: number;
    label?: string;
    /** Displayed pixel size as measured on the client — cs-api uses it for video (images are measured server-side). */
    width?: number;
    height?: number;
}
declare function useUploadCreativeMutation(campaignId: string): _tanstack_react_query.UseMutationResult<Creative, Error, UploadCreativeInput, unknown>;
declare function useMyCreativesQuery(): _tanstack_react_query.UseQueryResult<PendingCreative[], Error>;
declare function useLiveScreensQuery(): _tanstack_react_query.UseQueryResult<LiveScreen[], Error>;
interface PendingCreativesFilters {
    search?: string;
    page?: number;
    [key: string]: string | number | undefined;
}
declare function usePendingCreativesQuery(filters: PendingCreativesFilters, options?: {
    enabled?: boolean;
}): _tanstack_react_query.UseQueryResult<{
    rows: PendingCreative[];
    meta: PaginationMeta;
}, Error>;
declare function useApproveCreativeMutation(): _tanstack_react_query.UseMutationResult<Creative, Error, string, unknown>;
declare function useRejectCreativeMutation(): _tanstack_react_query.UseMutationResult<Creative, Error, {
    creativeId: string;
    reason: string;
}, unknown>;
declare function useApplyMediaMutation(): _tanstack_react_query.UseMutationResult<Creative, Error, {
    mediaId: string;
    campaignId: string;
    durationSeconds?: number;
}, unknown>;

interface DeviceHealthFilters {
    search?: string;
    status?: "ONLINE" | "OFFLINE";
    page?: number;
    [key: string]: string | number | undefined;
}
declare function useDeviceHealthQuery(filters: DeviceHealthFilters): _tanstack_react_query.UseQueryResult<{
    rows: ScreenHealth[];
    meta: PaginationMeta;
}, Error>;
declare function useDevicePreviewQuery(deviceId: string): _tanstack_react_query.UseQueryResult<PreviewPlaylist, Error>;
declare function useMyDeviceHealthQuery(filters: DeviceHealthFilters): _tanstack_react_query.UseQueryResult<{
    rows: MyScreenHealth[];
    meta: PaginationMeta;
}, Error>;
interface PlaybackLogFilters {
    screenId?: string;
    campaignId?: string;
    page?: number;
    [key: string]: string | number | undefined;
}
declare function useMyPlaybackLogsQuery(filters: PlaybackLogFilters): _tanstack_react_query.UseQueryResult<{
    rows: PlaybackLogEntry[];
    meta: PaginationMeta & {
        screens: MyScreenSummary[];
    };
}, Error>;
interface ClaimActivationResult {
    screenId: string;
    screenName: string;
    city: string;
    state: string;
    status: string;
    device: {
        deviceId: string;
        deviceToken: string;
        reportedModel: string | null;
        reportedAppVersion: string | null;
        registeredAt: string;
        claimedAt: string;
    };
    screenReportedHardware: {
        deviceModel: string | null;
        ram: string | null;
        storage: string | null;
        installationEnvironment: string | null;
    };
}
declare function useClaimActivationMutation(screenId: string): _tanstack_react_query.UseMutationResult<ClaimActivationResult, Error, string, unknown>;
declare function useRevokeDeviceMutation(screenId: string): _tanstack_react_query.UseMutationResult<{
    screenId: string;
    status: string;
}, Error, void, unknown>;
declare function useFleetHealthSummaryQuery(): _tanstack_react_query.UseQueryResult<FleetHealthSummary, Error>;
declare function useDeviceLocationsQuery(): _tanstack_react_query.UseQueryResult<ScreenLocation[], Error>;
declare function useMyDeviceLocationsQuery(): _tanstack_react_query.UseQueryResult<ScreenLocation[], Error>;
interface DeviceActivationFilters {
    search?: string;
    status?: "PENDING" | "EXPIRED" | "CLAIMED";
    page?: number;
    [key: string]: string | number | undefined;
}
declare function useDeviceActivationsQuery(filters: DeviceActivationFilters, options?: {
    enabled?: boolean;
}): _tanstack_react_query.UseQueryResult<{
    rows: DeviceActivation[];
    meta: PaginationMeta;
}, Error>;
declare function useHeartbeatMapQuery(deviceId: string, days?: number): _tanstack_react_query.UseQueryResult<DeviceLogMapEntry[], Error>;
declare function usePlaybackMapQuery(deviceId: string, days?: number): _tanstack_react_query.UseQueryResult<DeviceLogMapEntry[], Error>;
declare function useHeartbeatHistoryQuery(deviceId: string, date: string): _tanstack_react_query.UseQueryResult<DeviceLogHistory<HeartbeatHistoryRow>, Error>;
declare function usePlaybackHistoryQuery(deviceId: string, date: string): _tanstack_react_query.UseQueryResult<DeviceLogHistory<PlaybackHistoryRow>, Error>;
declare function useCampaignPlaybackQuery(campaignId: string): _tanstack_react_query.UseQueryResult<PlaybackSummary[], Error>;
interface MonitoringTimelineFilters {
    from?: string;
    to?: string;
    search?: string;
    [key: string]: string | number | undefined;
}
declare function useMonitoringTimelineQuery(filters: MonitoringTimelineFilters): _tanstack_react_query.UseQueryResult<MonitoringTimeline, Error>;
declare function useMyMonitoringTimelineQuery(filters: MonitoringTimelineFilters, options?: {
    enabled?: boolean;
}): _tanstack_react_query.UseQueryResult<MonitoringTimeline, Error>;
declare function useMyLiveScreensTimelineQuery(screenIds: string[], filters: MonitoringTimelineFilters): {
    screens: TimelineScreen[];
    isLoading: boolean;
    error: Error | null | undefined;
};
declare function useScreenTimelineQuery(screenId: string, filters: MonitoringTimelineFilters, options?: {
    enabled?: boolean;
}): _tanstack_react_query.UseQueryResult<MonitoringTimeline, Error>;
declare function useAdvertiserScreenPreviewQuery(deviceId: string, campaignId: string, enabled?: boolean): _tanstack_react_query.UseQueryResult<AdvertiserScreenPreview, Error>;
declare function useHealthAlertConfigQuery(): _tanstack_react_query.UseQueryResult<HealthAlertConfig, Error>;
declare function useUpdateHealthAlertConfigMutation(): _tanstack_react_query.UseMutationResult<HealthAlertConfig, Error, number, unknown>;

interface KbFilters {
    category?: KbCategory;
    search?: string;
}
declare function useKbArticlesQuery(page: number, filters?: KbFilters): _tanstack_react_query.UseQueryResult<{
    rows: KbArticle[];
    meta: PaginationMeta;
}, Error>;
declare function useKbArticleQuery(id: string): _tanstack_react_query.UseQueryResult<KbArticle, Error>;
interface CreateKbArticleInput {
    category: KbCategory;
    title: string;
    body: string;
    published?: boolean;
}
declare function useCreateKbArticleMutation(): _tanstack_react_query.UseMutationResult<KbArticle, Error, CreateKbArticleInput, unknown>;
declare function useUpdateKbArticleMutation(id: string): _tanstack_react_query.UseMutationResult<KbArticle, Error, Partial<CreateKbArticleInput>, unknown>;
declare function useDeleteKbArticleMutation(): _tanstack_react_query.UseMutationResult<unknown, Error, string, unknown>;

declare const NOTIFICATIONS_UNREAD_COUNT_KEY: readonly ["notifications", "unread-count"];
declare const NOTIFICATIONS_LIST_KEY: readonly ["notifications", "list"];
declare const NOTIFICATIONS_PREFERENCES_KEY: readonly ["notifications", "preferences"];
declare function useNotificationsQuery(page: number): _tanstack_react_query.UseQueryResult<{
    rows: Notification[];
    meta: PaginationMeta;
}, Error>;
declare function useNotificationsInfiniteQuery(): _tanstack_react_query.UseInfiniteQueryResult<_tanstack_query_core.InfiniteData<{
    rows: Notification[];
    meta: PaginationMeta;
}, unknown>, Error>;
declare function useUnreadCountQuery(options?: {
    refetchInterval?: number;
}): _tanstack_react_query.UseQueryResult<{
    count: number;
}, Error>;
declare function useMarkNotificationReadMutation(): _tanstack_react_query.UseMutationResult<Notification, Error, string, unknown>;
declare function useMarkAllNotificationsReadMutation(): _tanstack_react_query.UseMutationResult<{
    count: number;
}, Error, void, unknown>;
declare function useNotificationPreferencesQuery(): _tanstack_react_query.UseQueryResult<NotificationPreferences, Error>;
declare function useUpdateNotificationPreferencesMutation(): _tanstack_react_query.UseMutationResult<NotificationPreferences, Error, Partial<Omit<NotificationPreferences, "updatedAt">>, unknown>;
/** Call when a push arrives while the app is open, so badges/lists catch up without polling. */
declare function useInvalidateNotifications(): () => void;

declare function useReservationAdsQuery(reservationId: string, options?: {
    enabled?: boolean;
}): _tanstack_react_query.UseQueryResult<ReservationAds, Error>;
interface MyPartnerAdsFilters {
    status?: PartnerAdStatus;
    screenId?: string;
    page?: number;
}
declare function useMyPartnerAdsQuery(filters?: MyPartnerAdsFilters): _tanstack_react_query.UseQueryResult<{
    rows: PartnerAdWithContext[];
    meta: PaginationMeta;
}, Error>;
interface UploadPartnerAdInput {
    file: UploadFile;
    label?: string;
    durationSeconds?: number;
    slotStartHour?: number;
    slotEndHour?: number;
}
declare function useUploadPartnerAdMutation(reservationId: string): _tanstack_react_query.UseMutationResult<PartnerAd, Error, UploadPartnerAdInput, unknown>;
declare function useDeletePartnerAdMutation(reservationId?: string): _tanstack_react_query.UseMutationResult<{
    id: string;
}, Error, string, unknown>;

declare function useMyPaymentsQuery(page: number, filters?: BillingFilters): _tanstack_react_query.UseQueryResult<{
    rows: Payment[];
    meta: PaginationMeta;
}, Error>;
declare function usePaymentDetailQuery(paymentId: string): _tanstack_react_query.UseQueryResult<Payment, Error>;
declare function useMyInvoicesQuery(page: number, filters?: BillingFilters): _tanstack_react_query.UseQueryResult<{
    rows: Invoice[];
    meta: PaginationMeta;
}, Error>;
declare function useInvoiceDetailQuery(invoiceId: string): _tanstack_react_query.UseQueryResult<InvoiceDetail, Error>;
declare function usePaymentStatusQuery(campaignId: string): _tanstack_react_query.UseQueryResult<Payment, Error>;
declare function usePendingPaymentsQuery(page: number, options?: {
    enabled?: boolean;
}): _tanstack_react_query.UseQueryResult<{
    rows: Payment[];
    meta: PaginationMeta;
}, Error>;
interface ApprovePaymentInput {
    paymentId: string;
    settlementMode?: SettlementMode;
    settlementNote?: string;
}
declare function useApprovePaymentMutation(): _tanstack_react_query.UseMutationResult<Payment, Error, ApprovePaymentInput, unknown>;
declare function useRaisePaymentRequestMutation(): _tanstack_react_query.UseMutationResult<Payment, Error, string, unknown>;
interface RejectPaymentInput {
    paymentId: string;
    reason: string;
}
declare function useRejectPaymentMutation(): _tanstack_react_query.UseMutationResult<Payment, Error, RejectPaymentInput, unknown>;
declare function useCreateOrderMutation(): _tanstack_react_query.UseMutationResult<CreateOrderResult, Error, string, unknown>;
declare function useSavedPaymentMethodsQuery(): _tanstack_react_query.UseQueryResult<SavedPaymentMethod[], Error>;
declare function useDeleteSavedPaymentMethodMutation(): _tanstack_react_query.UseMutationResult<unknown, Error, string, unknown>;
interface VerifyPaymentInput {
    campaignId: string;
    razorpayOrderId: string;
    razorpayPaymentId: string;
    razorpaySignature: string;
}
declare function useVerifyPaymentMutation(): _tanstack_react_query.UseMutationResult<Payment, Error, VerifyPaymentInput, unknown>;
/** Server-rendered tax invoice PDF for one of the caller's invoices. */
declare const invoicePdfPath: (invoiceId: string) => string;

interface Place {
    label: string;
    name: string;
    city: string | null;
    state: string | null;
    pincode: string | null;
    lat: number;
    lng: number;
}
declare function usePlacesQuery(query: string): _tanstack_react_query.UseQueryResult<Place[], Error>;

declare function useProofRequestSummaryQuery(): _tanstack_react_query.UseQueryResult<ProofRequestSummary, Error>;
declare function useMyProofRequestsQuery(status?: ProofRequestStatus): _tanstack_react_query.UseQueryResult<ProofRequest[], Error>;
declare function useScreenLiveCampaignsQuery(screenId: string): _tanstack_react_query.UseQueryResult<ScreenLiveCampaign[], Error>;
declare function useCampaignProofRequestsQuery(campaignId: string): _tanstack_react_query.UseQueryResult<CampaignProofRequest[], Error>;
declare function useRequestProofMutation(): _tanstack_react_query.UseMutationResult<ProofRequest, Error, {
    campaignId: string;
    screenId: string;
    note?: string;
}, unknown>;
declare function useSubmitProofMutation(screenId: string): _tanstack_react_query.UseMutationResult<ProofRequest, Error, {
    requestId?: string;
    campaignId: string;
    file: UploadFile;
    caption?: string;
}, unknown>;

type PushPlatform = "ios" | "android";
interface RegisterPushTokenInput {
    token: string;
    platform: PushPlatform;
    appVersion?: string;
}
interface PushTokenRegistration {
    token: string;
    platform: PushPlatform;
    appVersion: string | null;
    lastSeenAt: string;
}
declare const registerPushToken: (input: RegisterPushTokenInput) => Promise<PushTokenRegistration>;
declare const unregisterPushToken: (token: string) => Promise<{
    removed: boolean;
}>;
declare function useRegisterPushTokenMutation(): _tanstack_react_query.UseMutationResult<PushTokenRegistration, Error, RegisterPushTokenInput, unknown>;
declare function useUnregisterPushTokenMutation(): _tanstack_react_query.UseMutationResult<{
    removed: boolean;
}, Error, string, unknown>;

/** The campaign's open quotation, or null when it has never had one. */
declare function useCampaignQuotationQuery(campaignId: string | undefined): _tanstack_react_query.UseQueryResult<QuotationDetail | null, Error>;
declare function useMyQuotationQuery(id: string): _tanstack_react_query.UseQueryResult<QuotationDetail, Error>;
declare function useMyQuotationsQuery(page: number, filters?: {
    status?: string;
    search?: string;
}): _tanstack_react_query.UseQueryResult<{
    rows: Quotation[];
    meta: PaginationMeta;
}, Error>;
interface SubmitQuotationInput {
    campaignId: string;
    screenIds: string[];
    startDate: string;
    endDate: string;
    frequencyLevel?: FrequencyLevel;
    customShares?: number;
    proposedAmount?: number | null;
    note?: string;
}
/** Submit a quotation, or reopen the existing one for revision. */
declare function useSubmitQuotationMutation(): _tanstack_react_query.UseMutationResult<QuotationDetail, Error, SubmitQuotationInput, unknown>;
declare function useAcceptQuotationMutation(): _tanstack_react_query.UseMutationResult<QuotationDetail, Error, {
    campaignId: string;
}, unknown>;
/**
 * "Submit payment" on an APPROVED quotation: cs-api re-holds the quoted screens and raises a payment
 * request priced at the negotiated amount, which an admin then settles — no online charge here.
 */
declare function usePayQuotationMutation(): _tanstack_react_query.UseMutationResult<QuotationDetail, Error, {
    campaignId: string;
    screenIds: string[];
    startDate: string;
    endDate: string;
}, unknown>;
/** Server-rendered quotation PDF for one of the caller's quotations (download + share on mobile). */
declare const quotationPdfPath: (quotationId: string) => string;

declare function useMyRefundsQuery(page?: number): _tanstack_react_query.UseQueryResult<{
    rows: Refund[];
    meta: PaginationMeta;
}, Error>;
declare function useCreateRefundRequestMutation(): _tanstack_react_query.UseMutationResult<Refund, Error, string, unknown>;
declare function usePendingRefundsQuery(page: number, options?: {
    enabled?: boolean;
}): _tanstack_react_query.UseQueryResult<{
    rows: AdminRefund[];
    meta: PaginationMeta;
}, Error>;
declare function useApproveRefundMutation(): _tanstack_react_query.UseMutationResult<Refund, Error, string, unknown>;
declare function useRejectRefundMutation(): _tanstack_react_query.UseMutationResult<Refund, Error, {
    refundId: string;
    reason: string;
}, unknown>;

declare function useWalletQuery$1(page: number): _tanstack_react_query.UseQueryResult<Wallet, Error>;
declare function useTodayCollectionQuery(): _tanstack_react_query.UseQueryResult<TodayCollection, Error>;
declare function useDailyCollectionsQuery(range?: {
    startDate?: string;
    endDate?: string;
}): _tanstack_react_query.UseQueryResult<DailyCollection[], Error>;
declare function useSetSettlementCadenceMutation(): _tanstack_react_query.UseMutationResult<{
    settlementCadence: SettlementCadence;
}, Error, "MONTHLY" | "DAILY", unknown>;
declare function useMyWithdrawalsQuery(page: number): _tanstack_react_query.UseQueryResult<{
    rows: WithdrawalRequest[];
    meta: PaginationMeta;
}, Error>;
declare function useCreateWithdrawalMutation(): _tanstack_react_query.UseMutationResult<WithdrawalRequest, Error, number, unknown>;
declare function useCancelWithdrawalMutation(): _tanstack_react_query.UseMutationResult<WithdrawalRequest, Error, string, unknown>;
declare function useDisplaySettingsQuery(): _tanstack_react_query.UseQueryResult<DisplaySettings, Error>;
declare function useFeeConfigQuery(): _tanstack_react_query.UseQueryResult<FeeConfig, Error>;
interface UpdateFeeConfigInput {
    transactionFeePercent?: number;
    dailySettlementFeePercent?: number;
    monthlySettlementFeePercent?: number;
    adPlatformFeePercent?: number;
    gstRatePercent?: number;
    pgBaseFeePercent?: number;
    pgGstOnFeePercent?: number;
    tds194oPercent?: number;
    gstTcsPercent?: number;
    showPlatformCommission?: boolean;
    showTaxBreakdown?: boolean;
    showGrossAmount?: boolean;
    showSettlementFee?: boolean;
}
declare function useUpdateFeeConfigMutation(): _tanstack_react_query.UseMutationResult<FeeConfig, Error, UpdateFeeConfigInput, unknown>;
declare function useAdminWalletsQuery(page: number, search?: string): _tanstack_react_query.UseQueryResult<{
    rows: AdminWallet[];
    meta: PaginationMeta;
}, Error>;
declare function useAdminSettlementsQuery(page: number, filters?: AdminSettlementFilters): _tanstack_react_query.UseQueryResult<{
    rows: AdminSettlement[];
    meta: PaginationMeta;
}, Error>;
declare function useAdminSettlementDetailQuery(settlementId: string): _tanstack_react_query.UseQueryResult<AdminSettlement, Error>;
interface RecordPayoutInput {
    walletId: string;
    amount: number;
    note?: string;
}
declare function useRecordPayoutMutation(): _tanstack_react_query.UseMutationResult<{
    id: string;
    amount: number;
    balanceAfter: number;
}, Error, RecordPayoutInput, unknown>;
declare function usePendingWithdrawalsQuery(page: number, options?: {
    enabled?: boolean;
}): _tanstack_react_query.UseQueryResult<{
    rows: AdminWithdrawalRequest[];
    meta: PaginationMeta;
}, Error>;
declare function useApproveWithdrawalMutation(): _tanstack_react_query.UseMutationResult<WithdrawalRequest, Error, string, unknown>;
declare function useRejectWithdrawalMutation(): _tanstack_react_query.UseMutationResult<WithdrawalRequest, Error, {
    requestId: string;
    reason: string;
}, unknown>;
declare function useScheduledReportsQuery(): _tanstack_react_query.UseQueryResult<ScheduledReport[], Error>;
declare function useCreateScheduledReportMutation(): _tanstack_react_query.UseMutationResult<ScheduledReport, Error, {
    frequency: ReportFrequency;
    format: ReportFormat;
}, unknown>;
declare function useDeleteScheduledReportMutation(): _tanstack_react_query.UseMutationResult<unknown, Error, string, unknown>;

interface SavedScreens {
    screenIds: string[];
    screens: DiscoveryScreen[];
}
interface ScreenGroup {
    id: string;
    name: string;
    screenIds: string[];
    screenCount: number;
    createdAt: string;
    updatedAt: string;
}
interface ScreenGroupDetail extends ScreenGroup {
    screens: DiscoveryScreen[];
}
declare function useSavedScreensQuery(enabled?: boolean): _tanstack_react_query.UseQueryResult<SavedScreens, Error>;
declare function useToggleSavedScreenMutation(): _tanstack_react_query.UseMutationResult<unknown, Error, {
    screenId: string;
    save: boolean;
}, {
    previous: SavedScreens | undefined;
}>;
declare function useScreenGroupsQuery(enabled?: boolean): _tanstack_react_query.UseQueryResult<ScreenGroup[], Error>;
declare function useScreenGroupQuery(groupId: string | null): _tanstack_react_query.UseQueryResult<ScreenGroupDetail, Error>;
declare function useCreateScreenGroupMutation(): _tanstack_react_query.UseMutationResult<ScreenGroup, Error, {
    name: string;
    screenIds: string[];
}, unknown>;
declare function useUpdateScreenGroupMutation(): _tanstack_react_query.UseMutationResult<ScreenGroup, Error, {
    groupId: string;
    name?: string;
    screenIds?: string[];
}, unknown>;
declare function useDeleteScreenGroupMutation(): _tanstack_react_query.UseMutationResult<unknown, Error, string, unknown>;

declare function useCategoriesQuery(): _tanstack_react_query.UseQueryResult<ScreenCategory[], Error>;
declare function useMyScreenQuery(screenId: string): _tanstack_react_query.UseQueryResult<Screen, Error>;
interface MyScreensListFilters {
    status?: ScreenVerificationStatus;
    search?: string;
    live?: boolean;
}
declare function useMyScreensListQuery(filters: MyScreensListFilters): _tanstack_react_query.UseInfiniteQueryResult<_tanstack_query_core.InfiniteData<{
    rows: ScreenListItem[];
    meta: PaginationMeta;
}, unknown>, Error>;
interface PartnerStats {
    totalScreens: number;
    activeScreens: number;
    pendingScreens: number;
    totalBookings: number;
    activeBookings: number;
}
declare function usePartnerStatsQuery(): _tanstack_react_query.UseQueryResult<PartnerStats, Error>;
declare function useRegisterScreenMutation(): _tanstack_react_query.UseMutationResult<Screen, Error, Record<string, unknown>, unknown>;
interface QuickRegisterScreenInput {
    screenName: string;
    categoryCode: string;
    city: string;
    state: string;
    pricePerDay: number;
}
declare function useQuickRegisterScreenMutation(): _tanstack_react_query.UseMutationResult<Screen, Error, QuickRegisterScreenInput, unknown>;
declare function useUpdateScreenMutation(): _tanstack_react_query.UseMutationResult<Screen, Error, {
    screenId: string;
    values: Record<string, unknown>;
}, unknown>;
declare function useUpdateScreenSyncConfigMutation(): _tanstack_react_query.UseMutationResult<Screen, Error, {
    screenId: string;
    syncIntervalMinutes: number | null;
}, unknown>;
declare function useUpdateScreenPricingConfigMutation(): _tanstack_react_query.UseMutationResult<Screen, Error, {
    screenId: string;
    markupPercent?: number;
    commissionOverridePercent?: number | null;
    pricePerDay?: number;
}, unknown>;
declare function useSubmitScreenMutation(): _tanstack_react_query.UseMutationResult<Screen, Error, string, unknown>;
declare const useActivateScreenMutation: () => _tanstack_react_query.UseMutationResult<Screen, Error, string, unknown>;
declare const useDeactivateScreenMutation: () => _tanstack_react_query.UseMutationResult<Screen, Error, string, unknown>;
declare function useDeleteScreenMutation(): _tanstack_react_query.UseMutationResult<{
    status: string;
}, Error, string, unknown>;
declare function usePhotosQuery(screenId: string, enabled?: boolean): _tanstack_react_query.UseQueryResult<ScreenPhoto[], Error>;
declare function useUploadPhotoMutation(screenId: string): _tanstack_react_query.UseMutationResult<unknown, Error, {
    photoType: string;
    file: UploadFile;
}, unknown>;
declare function useDeleteScreenPhotoMutation(screenId: string): _tanstack_react_query.UseMutationResult<{
    status: string;
}, Error, string, unknown>;
interface ScreenSearchFilters {
    /** Screen name, area, landmark, address, city or PIN. */
    search?: string;
    city?: string;
    state?: string;
    pincode?: string;
    /** One venue code or several, comma-separated. */
    categoryCode?: string;
    /** Comma-separated lists (see types/screenListing.ts). */
    locationCategory?: string;
    audience?: string;
    traffic?: string;
    displayType?: string;
    environment?: string;
    sizeBucket?: string;
    /** Only screens with room for these dates — send both. */
    availableFrom?: string;
    availableTo?: string;
    minPrice?: string;
    maxPrice?: string;
    live?: string;
    /** "Near me" — the browser's geolocation, not a saved address. lat/lng must both be set together. */
    lat?: string;
    lng?: string;
    radiusKm?: string;
    sort?: string;
}
declare function useSearchScreensQuery(filters: ScreenSearchFilters, enabled: boolean): _tanstack_react_query.UseInfiniteQueryResult<_tanstack_query_core.InfiniteData<{
    rows: DiscoveryScreen[];
    meta: PaginationMeta;
}, unknown>, Error>;
declare function usePendingScreensQuery(): _tanstack_react_query.UseQueryResult<Screen[], Error>;
interface AdminScreensListFilters {
    status?: ScreenVerificationStatus;
    search?: string;
    live?: boolean;
    page?: number;
}
declare function useAdminScreensListQuery(filters: AdminScreensListFilters): _tanstack_react_query.UseQueryResult<{
    rows: ScreenListItem[];
    meta: PaginationMeta;
}, Error>;
declare function useApproveScreenMutation(): _tanstack_react_query.UseMutationResult<Screen, Error, string, unknown>;
declare function useRejectScreenMutation(): _tanstack_react_query.UseMutationResult<Screen, Error, {
    screenId: string;
    reason: string;
}, unknown>;

interface AppConfig {
    minSupportedVersion: string;
    latestVersion: string;
    maintenanceEnabled: boolean;
    maintenanceMessage: string | null;
    androidStoreUrl: string | null;
    iosStoreUrl: string | null;
    source: "code-default" | "admin";
}
declare function useAppConfigQuery(): _tanstack_react_query.UseQueryResult<AppConfig, Error>;
/** Compares MAJOR.MINOR.PATCH strings: negative when a < b, 0 when equal, positive when a > b. */
declare function compareAppVersions(a: string, b: string): number;

interface CreateTicketInput {
    category: TicketCategory;
    subject: string;
    description: string;
    priority?: TicketPriority;
}
declare function useCreateTicketMutation(): _tanstack_react_query.UseMutationResult<Ticket, Error, CreateTicketInput, unknown>;
declare function useMyTicketsQuery(page: number, status?: TicketStatus): _tanstack_react_query.UseQueryResult<{
    rows: Ticket[];
    meta: PaginationMeta;
}, Error>;
declare function useMyTicketsInfiniteQuery(status?: TicketStatus): _tanstack_react_query.UseInfiniteQueryResult<_tanstack_query_core.InfiniteData<{
    rows: Ticket[];
    meta: PaginationMeta;
}, unknown>, Error>;
interface AdminTicketFilters {
    status?: TicketStatus;
    category?: TicketCategory;
    priority?: TicketPriority;
    assignedTo?: string;
}
declare function useAdminTicketsQuery(page: number, filters?: AdminTicketFilters, options?: {
    enabled?: boolean;
}): _tanstack_react_query.UseQueryResult<{
    rows: Ticket[];
    meta: PaginationMeta;
}, Error>;
declare function useTicketDetailQuery(ticketId: string, options?: {
    refetchInterval?: number;
}): _tanstack_react_query.UseQueryResult<TicketDetail, Error>;
declare function useAddTicketMessageMutation(ticketId: string): _tanstack_react_query.UseMutationResult<TicketMessage, Error, {
    message: string;
    isInternalNote?: boolean;
}, unknown>;
declare function useAssignTicketMutation(ticketId: string): _tanstack_react_query.UseMutationResult<Ticket, Error, {
    assignedTo?: string | null;
    assignedTeam?: AssignmentTeam | null;
}, unknown>;
declare function useUpdateTicketStatusMutation(ticketId: string): _tanstack_react_query.UseMutationResult<Ticket, Error, "UNDER_REVIEW" | "REOPENED" | "OPEN" | "ASSIGNED" | "WAITING_FOR_CUSTOMER" | "IN_PROGRESS" | "ESCALATED" | "RESOLVED" | "CLOSED", unknown>;
declare function useResolveTicketMutation(ticketId: string): _tanstack_react_query.UseMutationResult<Ticket, Error, string, unknown>;
declare function useCloseTicketMutation(ticketId: string): _tanstack_react_query.UseMutationResult<Ticket, Error, void, unknown>;
declare function useReopenTicketMutation(ticketId: string): _tanstack_react_query.UseMutationResult<Ticket, Error, void, unknown>;
declare function useSubmitTicketFeedbackMutation(ticketId: string): _tanstack_react_query.UseMutationResult<Ticket, Error, {
    rating: number;
    comment?: string;
}, unknown>;
declare function useSlaConfigsQuery(): _tanstack_react_query.UseQueryResult<SlaConfig[], Error>;
declare function useUpdateSlaConfigMutation(): _tanstack_react_query.UseMutationResult<SlaConfig, Error, {
    priority: TicketPriority;
    firstResponseMinutes?: number;
    resolutionMinutes?: number;
}, unknown>;

declare function useWalletQuery(limit?: number): _tanstack_react_query.UseQueryResult<Wallet$1, Error>;
declare function useCreateTopUpOrderMutation(): _tanstack_react_query.UseMutationResult<CreateTopUpOrderResult, Error, number, unknown>;
declare function useVerifyTopUpMutation(): _tanstack_react_query.UseMutationResult<Wallet$1, Error, {
    razorpayOrderId: string;
    razorpayPaymentId: string;
    razorpaySignature: string;
}, unknown>;
declare function usePayCampaignFromWalletMutation(): _tanstack_react_query.UseMutationResult<PayCampaignFromWalletResult, Error, string, unknown>;
declare function useCreditRejectedCreativeToWalletMutation(campaignId: string): _tanstack_react_query.UseMutationResult<CreditRejectedCreativeResult, Error, string, unknown>;

interface MarketplaceFilterState {
    /** Free text: screen name, area, landmark, address, city — or a 6-digit PIN. */
    text: string;
    /** A picked place (area/landmark suggestion) or "near me" — searches around it. */
    center: {
        lat: number;
        lng: number;
        label: string;
    } | null;
    radiusKm: number;
    locationCategories: string[];
    categoryCodes: string[];
    audience: string[];
    traffic: "" | "PEDESTRIAN" | "VEHICLE";
    displayTypes: string[];
    environment: "" | "INDOOR" | "OUTDOOR";
    sizeBuckets: string[];
    maxPricePerDay: number | null;
    dates: {
        from: string;
        to: string;
    } | null;
}
declare const EMPTY_FILTERS: MarketplaceFilterState;
/** How many drawer filters are on — the badge on the Filters button. */
declare function activeFilterCount(f: MarketplaceFilterState): number;
declare function toSearchFilters(f: MarketplaceFilterState, text: string): ScreenSearchFilters;

export { type AdminScreensListFilters, type AdminSelfReservation, type AdminTicketFilters, type AppConfig, type ApprovePaymentInput, type ClaimActivationResult, type CreateKbArticleInput, type CreateTicketInput, type DeviceActivationFilters, type DeviceHealthFilters, type DuplicateCampaignInput, EMPTY_FILTERS, type GoogleCompleteInput, type KbFilters, type MarketplaceFilterState, type MonitoringTimelineFilters, type MyCampaignsListFilters, type MyPartnerAdsFilters, type MyPartnerBookingsListFilters, type MyScreensListFilters, NOTIFICATIONS_LIST_KEY, NOTIFICATIONS_PREFERENCES_KEY, NOTIFICATIONS_UNREAD_COUNT_KEY, type PartnerStats, type PendingCreativesFilters, type Place, type PlaybackLogFilters, type PushPlatform, type PushTokenRegistration, type QuickRegisterScreenInput, type RecordPayoutInput, type RegisterInput, type RegisterPushTokenInput, type RegisterResult, type RejectPaymentInput, type SavedScreens, type ScreenAvailability, type ScreenAvailabilityEntry, type ScreenGroup, type ScreenGroupDetail, type ScreenSearchFilters, type SelfReservation, type SelfReservationStatus, type SubmitQuotationInput, type UpdateFeeConfigInput, type UploadCreativeInput, type UploadFile, type UploadPartnerAdInput, activeFilterCount, campaignReportPath, compareAppVersions, getSessionLimit, invoicePdfPath, logoutOnServer, playsExportPath, proofOfPlayExportPath, quotationPdfPath, registerPushToken, revenueExportPath, toSearchFilters, unregisterPushToken, useAcceptQuotationMutation, useActivateScreenMutation, useAddTicketMessageMutation, useAdminBookingFunnelQuery, useAdminFinanceQuery, useAdminGeographicQuery, useAdminOverviewQuery, useAdminRefundTrendQuery, useAdminRevenueQuery, useAdminScreensListQuery, useAdminSettlementDetailQuery, useAdminSettlementsQuery, useAdminTaxLedgerQuery, useAdminTicketsQuery, useAdminWalletsQuery, useAdvertiserAnalyticsQuery, useAdvertiserScreenPreviewQuery, useWalletQuery as useAdvertiserWalletQuery, useAppConfigQuery, useApplyMediaMutation, useApproveAdvertiserMutation, useApproveCreativeMutation, useApprovePaymentMutation, useApproveRefundMutation, useApproveScreenMutation, useApproveScreenPartnerMutation, useApproveSelfReservationMutation, useApproveWithdrawalMutation, useAssignTicketMutation, useCampaignAnalyticsQuery, useCampaignBookingsQuery, useCampaignCreativesQuery, useCampaignPlaybackQuery, useCampaignProofRequestsQuery, useCampaignQuery, useCampaignQuotationQuery, useCampaignQuoteQuery, useCampaignTrendQuery, useCancelBookingMutation, useCancelCampaignMutation, useCancelSelfReservationMutation, useCancelWithdrawalMutation, useCategoriesQuery, useChangeEmailMutation, useChangeMobileNumberMutation, useChangePasswordMutation, useCheckAvailabilityMutation, useCheckAvailabilityQuery, useCheckoutMutation, useClaimActivationMutation, useCloseTicketMutation, useCreateBookingMutation, useCreateCampaignMutation, useCreateKbArticleMutation, useCreateOrderMutation, useCreateRefundRequestMutation, useCreateScheduledReportMutation, useCreateScreenGroupMutation, useCreateTicketMutation, useCreateTopUpOrderMutation, useCreateWithdrawalMutation, useCreditRejectedCreativeToWalletMutation, useDailyCollectionsQuery, useDeactivateScreenMutation, useDeleteCampaignBannerMutation, useDeleteKbArticleMutation, useDeletePartnerAdMutation, useDeleteSavedPaymentMethodMutation, useDeleteScheduledReportMutation, useDeleteScreenGroupMutation, useDeleteScreenMutation, useDeleteScreenPhotoMutation, useDeliveryConfigQuery, useDeviceActivationsQuery, useDeviceHealthQuery, useDeviceLocationsQuery, useDevicePreviewQuery, useDisassociateBookingMutation, useDisplaySettingsQuery, useDuplicateCampaignMutation, useFeeConfigQuery, useFleetHealthSummaryQuery, useGoogleCompleteMutation, useGoogleLoginMutation, useHealthAlertConfigQuery, useHeartbeatHistoryQuery, useHeartbeatMapQuery, useInvalidateNotifications, useInvoiceDetailQuery, useKbArticleQuery, useKbArticlesQuery, useKycDocumentsQuery, useLiveScreensQuery, useLoginActivityQuery, useLoginMutation, useLoginSummaryQuery, useLogout, useMarkAllNotificationsReadMutation, useMarkNotificationReadMutation, useMeQuery, useMonitoringTimelineQuery, useMyBookingsQuery, useMyCampaignsListQuery, useMyCampaignsQuery, useMyCreativesQuery, useMyDeviceHealthQuery, useMyDeviceLocationsQuery, useMyDocumentsQuery, useMyInvoicesQuery, useMyKycQuery, useMyLiveScreensTimelineQuery, useMyMonitoringTimelineQuery, useMyPartnerAdsQuery, useMyPartnerBookingsListQuery, useMyPartnerBookingsQuery, useMyPaymentsQuery, useMyPlaybackLogsQuery, useMyProofRequestsQuery, useMyQuotationQuery, useMyQuotationsQuery, useMyRefundsQuery, useMyScreenQuery, useMyScreensListQuery, useMyTicketsInfiniteQuery, useMyTicketsQuery, useMyWithdrawalsQuery, useNotificationPreferencesQuery, useNotificationsInfiniteQuery, useNotificationsQuery, usePartnerAnalyticsQuery, usePartnerStatsQuery, useWalletQuery$1 as usePartnerWalletQuery, usePayCampaignFromWalletMutation, usePayQuotationMutation, usePaymentDetailQuery, usePaymentStatusQuery, usePaymentsConfigQuery, usePendingAdvertisersQuery, usePendingCreativesQuery, usePendingPaymentsQuery, usePendingRefundsQuery, usePendingScreenPartnersQuery, usePendingScreensQuery, usePendingSelfReservationsQuery, usePendingWithdrawalsQuery, usePhotosQuery, usePlacesQuery, usePlaybackHistoryQuery, usePlaybackMapQuery, usePlaysBreakdownQuery, usePlaysHeatmapQuery, usePlaysSummaryQuery, usePlaysTimeseriesQuery, usePriceEstimateQuery, useProofOfPlayQuery, useProofRequestSummaryQuery, useQuickRegisterScreenMutation, useRaisePaymentRequestMutation, useRecordPayoutMutation, useRegisterMutation, useRegisterPushTokenMutation, useRegisterScreenMutation, useRejectAdvertiserMutation, useRejectCreativeMutation, useRejectPaymentMutation, useRejectRefundMutation, useRejectScreenMutation, useRejectScreenPartnerMutation, useRejectSelfReservationMutation, useRejectWithdrawalMutation, useRemoveCampaignDocumentMutation, useRemoveCreativeMutation, useReopenTicketMutation, useReportFilterOptionsQuery, useRequestProofMutation, useRequestSelfReservationMutation, useReservationAdsQuery, useResetPasswordMutation, useResolveSessionLimitMutation, useResolveTicketMutation, useRevenueBreakdownQuery, useRevenueSummaryQuery, useRevenueTimeseriesQuery, useRevokeDeviceMutation, useRevokeOtherSessionsMutation, useRevokeSessionMutation, useSavedPaymentMethodsQuery, useSavedScreensQuery, useScheduledReportsQuery, useScreenAnalyticsQuery, useScreenAvailabilityQuery, useScreenBookingTimelineQuery, useScreenGroupQuery, useScreenGroupsQuery, useScreenLiveCampaignsQuery, useScreenQuery, useScreenSelfReservationsQuery, useScreenTimelineQuery, useSearchScreensQuery, useSendEmailLinkMutation, useSendEmailOtpMutation, useSendMobileOtpMutation, useSessionsQuery, useSetSettlementCadenceMutation, useSlaConfigsQuery, useSubmitKycMutation, useSubmitProofMutation, useSubmitQuotationMutation, useSubmitScreenMutation, useSubmitTicketFeedbackMutation, useTicketDetailQuery, useTodayCollectionQuery, useToggleSavedScreenMutation, useTrustSessionMutation, useUnreadCountQuery, useUnregisterPushTokenMutation, useUpdateAdvertiserBankDetailsMutation, useUpdateBankDetailsMutation, useUpdateCampaignBudgetMutation, useUpdateCampaignMutation, useUpdateFeeConfigMutation, useUpdateHealthAlertConfigMutation, useUpdateKbArticleMutation, useUpdateNotificationPreferencesMutation, useUpdatePaymentsConfigMutation, useUpdateProfileMutation, useUpdateScreenGroupMutation, useUpdateScreenMutation, useUpdateScreenPricingConfigMutation, useUpdateScreenSyncConfigMutation, useUpdateSelfReservationMutation, useUpdateSlaConfigMutation, useUpdateTicketStatusMutation, useUploadCampaignBannerMutation, useUploadCampaignDocumentMutation, useUploadCreativeMutation, useUploadDocumentMutation, useUploadPartnerAdMutation, useUploadPhotoMutation, useVerifyEmailMutation, useVerifyEmailOtpMutation, useVerifyMobileOtpMutation, useVerifyOtpMutation, useVerifyPaymentMutation, useVerifyTopUpMutation, useWalletQuery$1 as useWalletQuery };
