interface PriceLineItem {
    screenId: string;
    /** The advertiser-facing daily rate (partner base + CASTADI markup) — what each day actually costs. */
    listedDailyRate: number;
    days: number;
    screenPrice: number;
    platformCharge: number;
    taxAmount: number;
    totalAmount: number;
}
interface PriceBreakdown {
    days: number;
    lineItems: PriceLineItem[];
    subtotal: number;
    platformCharge: number;
    taxAmount: number;
    totalAmount: number;
}
type BookingStatus = "RESERVED" | "CONFIRMED" | "EXPIRED" | "CANCELLED";
interface Booking {
    id: string;
    campaignId: string;
    screenId: string;
    startDate: string;
    endDate: string;
    /** Intra-day slot window — null on a full-day booking. */
    slotStartHour: number | null;
    slotEndHour: number | null;
    status: BookingStatus;
    /** Only on GET /bookings/campaign/:id — the booked screen's name. */
    screenName?: string | null;
    /** Advertiser-facing daily rate for this booking. */
    listedDailyRate: number;
    days: number;
    screenPrice: number;
    platformCharge: number;
    taxAmount: number;
    totalAmount: number;
    reservedUntil: string;
    createdAt: string;
    /** Whether the booked screen's device has reported in within 5 minutes — "Live" is schedule-based, this says if it's actually playing. Absent on older responses. */
    screenDeviceOnline?: boolean;
}
interface CreateBookingResult {
    bookings: Booking[];
    priceBreakdown: PriceBreakdown;
}
interface PartnerBooking extends Booking {
    screenName: string;
    screenCity: string;
}
interface AdvertiserBooking extends Booking {
    screenName: string;
    screenCity: string;
    campaignName: string;
}
declare function formatShortDate(iso: string): string;
declare function formatDateRange(startDate: string, endDate: string): string;
type LiveWindowStatus = "live" | "upcoming" | "ended";
declare function liveWindowStatus(booking: Pick<Booking, "status" | "startDate" | "endDate">, campaignStatus: string): LiveWindowStatus | null;
/** One screen that can't take this campaign for the chosen dates (cs-api bookings checkAvailability). */
interface AvailabilityConflict {
    screenId: string;
    screenName: string | null;
    reason: string;
    /** The window the reason is about — an overlapping booking's own dates, or the full requested range for a capacity conflict. Null for an inactive screen. */
    conflictStartDate: string | null;
    conflictEndDate: string | null;
    /** Capacity conflicts only. */
    maxAdCapacity?: number;
    occupiedSlots?: number;
    yourAdsWeight?: number;
}
interface AvailabilityCheckResult {
    ok: boolean;
    conflicts: AvailabilityConflict[];
}

/** Share of screen time — Standard = 1 share, High Visibility = 2, Custom = 1..4 (cs-api modules/delivery). */
type FrequencyLevel = "STANDARD" | "HIGH" | "CUSTOM";
declare const MAX_CUSTOM_SHARES = 4;
interface ScreenDeliveryEstimate {
    screenId: string;
    /** Guaranteed floor: plays per day even if the screen is fully booked. */
    minPlaysPerDay: number;
    /** null when the screen has no footfall/impressions figure to estimate from. */
    estimatedViewsPerDay: number | null;
}
interface DeliveryEstimate {
    days: number;
    perScreen: ScreenDeliveryEstimate[];
    minPlaysPerDay: number;
    minTotalPlays: number;
    estimatedViewsPerDay: number | null;
    estimatedTotalViews: number | null;
}
/** /pricing/estimate with frequency — price and (when adDuration is sent) delivery in one response. */
interface CampaignQuote extends PriceBreakdown {
    shares: number;
    delivery?: DeliveryEstimate;
}
interface QuoteInput {
    screenIds: string[];
    startDate: string;
    endDate: string;
    frequencyLevel: FrequencyLevel;
    customShares?: number;
    adDuration?: number;
}
interface DeliveryConfig {
    levelShares: {
        STANDARD: number;
        HIGH: number;
    };
    dwellSeconds: number;
    attentionFactor: number;
}
interface PaymentsConfig {
    /** When on, "Pay & Launch" raises a payment request an admin approves instead of paying straight away. */
    requireAdminApproval: boolean;
    /** Rupee amount at/above which a campaign must carry a client quotation and is routed to admin approval. null = off. */
    quotationRequiredAbove: number | null;
}
type PaymentMethod = "RAZORPAY" | "WALLET";
type CheckoutResult = {
    method: "RAZORPAY";
    totalAmount: number;
    order: {
        paymentId: string;
        orderId: string;
        amount: number;
        currency: string;
        keyId: string;
        customerId: string | null;
    };
} | {
    method: "WALLET";
    totalAmount: number;
} | {
    method: "REQUEST";
    totalAmount: number;
};

type CampaignStatus = "DRAFT" | "PENDING_PAYMENT" | "CONFIRMED" | "ACTIVE" | "CANCELLED" | "COMPLETED" | "PAUSED";
/**
 * What advertisers see — derived server-side from the stored status plus the
 * ad's review state and the screen bookings (cs-api's campaignStage.js).
 * Labels/descriptions live in i18n/messages under `campaignStatus`.
 */
type CampaignDisplayStatus = "DRAFT" | "PAYMENT_PENDING" | "PAYMENT_RECEIVED" | "UNDER_REVIEW" | "APPROVED" | "SCHEDULED" | "LIVE" | "PAUSED" | "COMPLETED" | "REJECTED" | "CANCELLED";
interface Campaign {
    id: string;
    /** Human-readable reference shown instead of the UUID, e.g. "CAST-7K3QPX". */
    code: string;
    name: string;
    brandName: string | null;
    objective: string;
    description: string | null;
    startDate: string;
    endDate: string;
    totalBudget: number;
    status: CampaignStatus;
    displayStatus: CampaignDisplayStatus;
    /** The advertiser has to do something before this campaign can move on (pay, fix the ad, finish it). */
    needsAction: boolean;
    targetAudienceSegments: string[];
    /** Only meaningful when "OTHER" is in targetAudienceSegments. */
    targetAudienceOther: string | null;
    /** Both set together or both null — see cs-api's createCampaignSchema .and() rule. */
    targetAgeMin: number | null;
    targetAgeMax: number | null;
    preferredCities: string[];
    preferredScreenTypes: string[];
    adDuration: number | null;
    frequency: number | null;
    /** Share of screen time picked in the builder — see ./checkout. */
    frequencyLevel: FrequencyLevel;
    /** Resolved loop shares (Standard 1, High Visibility 2, Custom 1..4). */
    shares: number;
    /** Only on the Duplicate response: how many ads were copied (back into review) and the original's screens. */
    copiedCreatives?: number;
    sourceScreenIds?: string[];
    createdAt: string;
    /** Distinct screens with a CONFIRMED booking — only present on the /campaigns/me list, not a single-campaign fetch. */
    screenCount?: number;
    /** Same, narrowed to bookings whose date range covers today — "live right now," not just booked. */
    liveScreenCount?: number;
    /** Of the live screens, how many have a device reporting in right now. Absent on older responses — treat as online. */
    onlineScreenCount?: number;
    /** The oldest-uploaded banner's signed URL, for a list row's thumbnail — null if none uploaded yet. Present on every list/detail response. */
    thumbnailUrl: string | null;
    /** Every banner, in upload order — only present on a single-campaign detail fetch, not the list views (which only need the thumbnail). */
    banners?: CampaignBanner[];
    /** Quotation / receipt for high-value campaigns — only present on a single-campaign detail fetch. */
    documents?: CampaignDocuments;
}
interface CampaignBanner {
    id: string;
    downloadUrl: string;
    /** Small WebP copies (see types/imageVariants.ts); null/absent for videos and older images. */
    thumbUrl?: string | null;
    previewUrl?: string | null;
}
interface CampaignDocument {
    filename: string;
    contentType?: string;
    uploadedAt?: string;
    downloadUrl: string;
}
interface CampaignDocuments {
    QUOTATION: CampaignDocument | null;
    RECEIPT: CampaignDocument | null;
}
type CampaignDocumentType = "QUOTATION" | "RECEIPT";
declare const MAX_CAMPAIGN_BANNERS = 2;
declare function isCampaignReservable(status: CampaignStatus): boolean;
declare function isCampaignEnded(campaign: Pick<Campaign, "endDate" | "status">): boolean;
declare const AD_DURATION_MIN_SECONDS = 5;
declare const AD_DURATION_MAX_SECONDS = 120;
declare const PRIMARY_OBJECTIVES: readonly ["BRAND_AWARENESS", "PRODUCT_LAUNCH", "OFFER_PROMOTION", "STORE_TRAFFIC", "EVENT_PROMOTION", "NEW_BUSINESS_LAUNCH", "LEAD_GENERATION", "OTHER"];
declare const OBJECTIVES: readonly [{
    readonly value: "BRAND_AWARENESS";
    readonly label: "Brand Awareness";
}, {
    readonly value: "PRODUCT_LAUNCH";
    readonly label: "Product Launch";
}, {
    readonly value: "OFFER_PROMOTION";
    readonly label: "Offer / Promotion";
}, {
    readonly value: "STORE_TRAFFIC";
    readonly label: "Store Traffic";
}, {
    readonly value: "EVENT_PROMOTION";
    readonly label: "Event";
}, {
    readonly value: "NEW_BUSINESS_LAUNCH";
    readonly label: "New Business Launch";
}, {
    readonly value: "LEAD_GENERATION";
    readonly label: "Lead Generation";
}, {
    readonly value: "OTHER";
    readonly label: "Other";
}, {
    readonly value: "STORE_PROMOTION";
    readonly label: "Store Promotion";
}, {
    readonly value: "POLITICAL_CAMPAIGN";
    readonly label: "Political Campaign";
}, {
    readonly value: "PUBLIC_AWARENESS";
    readonly label: "Public Awareness";
}, {
    readonly value: "RECRUITMENT";
    readonly label: "Recruitment";
}, {
    readonly value: "GOVERNMENT_ANNOUNCEMENT";
    readonly label: "Government Announcement";
}, {
    readonly value: "FESTIVAL_CAMPAIGN";
    readonly label: "Festival Campaign";
}, {
    readonly value: "SEASONAL_PROMOTION";
    readonly label: "Seasonal Promotion";
}];
declare const TARGET_AUDIENCE_SEGMENTS: readonly [{
    readonly value: "YOUNG_PROFESSIONALS";
    readonly label: "Young Professionals";
}, {
    readonly value: "FAMILIES";
    readonly label: "Families";
}, {
    readonly value: "STUDENTS";
    readonly label: "Students";
}, {
    readonly value: "SHOPPERS";
    readonly label: "Shoppers";
}, {
    readonly value: "COMMUTERS";
    readonly label: "Commuters";
}, {
    readonly value: "FITNESS_ENTHUSIASTS";
    readonly label: "Fitness Enthusiasts";
}, {
    readonly value: "TOURISTS";
    readonly label: "Tourists";
}, {
    readonly value: "SENIOR_CITIZENS";
    readonly label: "Senior Citizens";
}, {
    readonly value: "BUSINESS_TRAVELERS";
    readonly label: "Business Travelers";
}, {
    readonly value: "GENERAL_PUBLIC";
    readonly label: "General Public";
}, {
    readonly value: "OTHER";
    readonly label: "Other";
}];
declare const TARGET_AGE_MIN = 0;
declare const TARGET_AGE_MAX = 100;
declare const COMMON_CITY_SUGGESTIONS: string[];
declare function formatTargetAudience(campaign: Pick<Campaign, "targetAudienceSegments" | "targetAudienceOther" | "targetAgeMin" | "targetAgeMax">): string | null;

export { AD_DURATION_MAX_SECONDS as A, type Booking as B, COMMON_CITY_SUGGESTIONS as C, type DeliveryConfig as D, formatTargetAudience as E, type FrequencyLevel as F, isCampaignEnded as G, isCampaignReservable as H, liveWindowStatus as I, type LiveWindowStatus as L, MAX_CAMPAIGN_BANNERS as M, OBJECTIVES as O, PRIMARY_OBJECTIVES as P, type QuoteInput as Q, type ScreenDeliveryEstimate as S, TARGET_AGE_MAX as T, AD_DURATION_MIN_SECONDS as a, type AdvertiserBooking as b, type AvailabilityCheckResult as c, type AvailabilityConflict as d, type BookingStatus as e, type Campaign as f, type CampaignBanner as g, type CampaignDisplayStatus as h, type CampaignDocument as i, type CampaignDocumentType as j, type CampaignDocuments as k, type CampaignQuote as l, type CampaignStatus as m, type CheckoutResult as n, type CreateBookingResult as o, type DeliveryEstimate as p, MAX_CUSTOM_SHARES as q, type PartnerBooking as r, type PaymentMethod as s, type PaymentsConfig as t, type PriceBreakdown as u, type PriceLineItem as v, TARGET_AGE_MIN as w, TARGET_AUDIENCE_SEGMENTS as x, formatDateRange as y, formatShortDate as z };
