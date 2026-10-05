import { F as FrequencyLevel, k as CampaignDocuments } from './campaigns-6nJvR6CG.js';

interface AdvertiserAnalytics {
    kpis: {
        activeCampaigns: number;
        totalCampaigns: number;
        totalSpend: number;
        activeScreens: number;
        /** Verified plays across every campaign. */
        totalPlays: number;
        estimatedViews: number;
        /** Screens showing one of this advertiser's campaigns today. */
        screensRunningNow: number;
        /** Of the screens running now, how many have a device online. Absent on older responses. */
        screensOnlineNow?: number;
    };
    spendTrend: {
        date: string;
        amount: number;
    }[];
    campaignsByStatus: {
        status: string;
        count: number;
    }[];
    campaignTimeline: {
        id: string;
        name: string;
        status: string;
        startDate: string;
        endDate: string;
        totalBudget: number;
        screenCount: number;
    }[];
    screenPerformance: {
        screenId: string;
        screenName: string;
        city: string;
        estimatedDailyImpressions: number | null;
        bookingCount: number;
        playbackCount: number;
        totalPlaybackSeconds: number;
    }[];
}
interface PartnerAnalytics {
    kpis: {
        activeScreens: number;
        totalCampaigns: number;
        avgHealthScore: number;
        lifetimeRevenue: number;
    };
    revenue: {
        daily: number;
        weekly: number;
        monthly: number;
        lifetime: number;
    };
    averageMonthlyEarnings: number;
    revenueTrend: {
        date: string;
        amount: number;
    }[];
    bookingFunnel: {
        status: string;
        count: number;
    }[];
}
interface ScreenAnalytics {
    screenId: string;
    screenName: string;
    playbackTrend: {
        date: string;
        plays: number;
    }[];
    playbackByStatus: {
        status: string;
        count: number;
    }[];
    playbackSuccessRate: number;
    uptimeTrend: {
        date: string;
        uptimePercent: number;
    }[];
    avgUptimePercent: number;
    revenueTrend: {
        date: string;
        amount: number;
    }[];
    totalRevenue: number;
}
interface CampaignLocation {
    city: string;
    state: string;
    screenCount: number;
}
interface CampaignScreenStat {
    screenId: string;
    screenName: string;
    city: string;
    state: string;
    estimatedDailyImpressions: number;
    live: boolean;
    /** NOT_CONNECTED: the screen's player has never checked in. */
    status: "ONLINE" | "OFFLINE" | "NOT_CONNECTED";
    /** Landmark or area, when the partner filled it in. */
    place: string | null;
    playCount: number;
    completedCount: number;
    estimatedViews: number;
    successRate: number;
    /** Set while the screen is silent during its paid run: how long, and the plays that's costing. */
    offline: {
        minutes: number;
        since: string;
        estimatedMissedPlays: number;
    } | null;
}
interface CampaignAnalytics {
    campaignId: string;
    code: string;
    name: string;
    status: string;
    startDate: string;
    endDate: string;
    durationDays: number;
    daysElapsed: number;
    completionPercent: number;
    /** Verified plays x people likely to see each play (footfall-based). */
    estimatedViews: number;
    /** The guaranteed minimum plays for the days run so far. */
    expectedPlaysToDate: number;
    /** Verified plays vs that minimum, capped at 100 — null before the run starts. */
    deliveryPercent: number | null;
    offlineScreens: CampaignScreenStat[];
    paidAmount: number;
    /** Paid amount spread evenly over the run — what's been used so far. */
    spend: number;
    remaining: number;
    activeScreens: number;
    liveScreens: number;
    estimatedDailyViews: number;
    locations: CampaignLocation[];
    screens: CampaignScreenStat[];
    budget: number;
    budgetUtilized: number;
    budgetUtilizationPercent: number;
    playback: {
        total: number;
        completed: number;
        successRate: number;
        byStatus: {
            status: string;
            count: number;
        }[];
    };
}
interface CampaignTrend {
    days: {
        date: string;
        plays: number;
    }[];
    /** null until the campaign has run 14+ days — not enough history yet for two non-overlapping 7-day windows. */
    periodComparison: {
        last7Days: number;
        previous7Days: number;
        percentChange: number;
    } | null;
}
interface AdminOverview {
    totalAdvertisers: number;
    totalPartners: number;
    totalActiveScreens: number;
    activeCampaigns: number;
    onlineScreens: number;
    signupGrowth: {
        month: string;
        role: string;
        count: number;
    }[];
}
type RevenueGranularity = "daily" | "weekly" | "monthly" | "annual";
interface AdminRevenue {
    totalRevenue: number;
    totalCommission: number;
    pendingRevenue: number;
    totalPayouts: number;
    series: {
        period: string;
        amount: number;
    }[];
}
interface GeographicRow {
    state: string;
    screenCount: number;
    revenue: number;
}
interface RefundTrend {
    trend: {
        date: string;
        amount: number;
    }[];
    totalRefunded: number;
}
interface AdminFinance {
    bookingCount: number;
    gmv: number;
    totalAdPlatformFee: number;
    totalGstCollected: number;
    totalCollectedFromAd: number;
    totalPgDeduction: number;
    totalSoCommission: number;
    totalSoGrossSettlement: number;
    totalTds: number;
    totalGstTcs: number;
    totalSoNetPayout: number;
    totalCsNetProfit: number;
    /** Derived: totalGstCollected + totalTds + totalGstTcs. */
    totalTaxRemitted: number;
    /** totalCsNetProfit / gmv * 100. */
    platformYieldPercent: number;
    /** (gmv - totalSoGrossSettlement + totalAdPlatformFee) / totalCollectedFromAd * 100. */
    effectiveTakeRatePercent: number;
    series: {
        period: string;
        totalCollectedFromAd: number;
        csNetProfit: number;
    }[];
}
declare const TAX_LEDGER_ENTRY_TYPES: readonly ["OUTPUT_GST", "TDS_194O", "GST_TCS"];
type TaxLedgerEntryType = (typeof TAX_LEDGER_ENTRY_TYPES)[number];
interface TaxLedgerEntry {
    id: string;
    entryType: TaxLedgerEntryType;
    amount: number;
    createdAt: string;
    campaignId: string;
    campaignName: string;
    advertiserBusinessName: string;
    screenName: string | null;
    screenPartnerId: string | null;
}
interface TaxLedgerTotals {
    outputGst: number;
    tds194o: number;
    gstTcs: number;
}
interface AdminTaxLedger {
    rows: TaxLedgerEntry[];
    meta: {
        page: number;
        limit: number;
        total: number;
    };
    totals: TaxLedgerTotals;
}
interface TaxLedgerFilters {
    startDate?: string;
    endDate?: string;
    entryType?: TaxLedgerEntryType;
}
interface ProofOfPlayEntry {
    date: string;
    screenId: string;
    screenName: string;
    city: string;
    plays: number;
    notCompleted: number;
    secondsPlayed: number;
    firstPlayedAt: string;
    lastPlayedAt: string;
    creatives: string | null;
    status: "VERIFIED" | "NOT_VERIFIED";
}
interface ProofOfPlay {
    campaign: {
        id: string;
        code: string;
        name: string;
        startDate: string;
        endDate: string;
    };
    totals: {
        plays: number;
        screens: number;
        days: number;
    };
    entries: ProofOfPlayEntry[];
}

type ReportRange = "today" | "yesterday" | "7d" | "week" | "30d" | "month" | "last_month" | "year" | "custom";
type ReportGranularity = "hour" | "day" | "week" | "month";
type PlaysGroupBy = "screen" | "campaign" | "creative" | "city" | "state";
type RevenueGroupBy = "screen" | "campaign" | "city" | "state";
interface ReportFilters {
    range: ReportRange;
    from?: string;
    to?: string;
    screenId: string[];
    campaignId: string[];
    creativeId: string[];
    city?: string;
}
declare const DEFAULT_REPORT_FILTERS: ReportFilters;
declare const REPORT_RANGES: ReportRange[];
declare function buildReportQuery(filters: ReportFilters, extra?: Record<string, string | undefined>): string;
/** A custom range is only queryable once both ends are picked. */
declare const isReportQueryable: (f: ReportFilters) => boolean;
interface PlayStats {
    totalPlays: number;
    completed: number;
    failed: number;
    interrupted: number;
    successRate: number | null;
    secondsPlayed: number;
}
interface PlaysSummary {
    role: "ADVERTISER" | "PARTNER" | "ADMIN";
    range: {
        from: string;
        to: string;
        days: number;
        previous: {
            from: string;
            to: string;
        };
    };
    kpis: PlayStats & {
        screensPlaying: number;
        campaignsPlaying: number;
        contentPlayed: number;
        estimatedImpressions: number;
        uptimePercent: number | null;
    };
    previous: PlayStats & {
        estimatedImpressions: number;
    };
    deltas: {
        totalPlays: number | null;
        completed: number | null;
        failed: number | null;
        successRatePoints: number | null;
        estimatedImpressions: number | null;
    };
}
interface ReportSeries {
    id: string;
    label: string;
    values: number[];
}
interface PlaysTimeseries {
    granularity: ReportGranularity;
    range: {
        from: string;
        to: string;
    };
    buckets: string[];
    totals: {
        completed: number[];
        failed: number[];
        interrupted: number[];
        plays: number[];
        successRate: (number | null)[];
    };
    series: ReportSeries[] | null;
}
interface PlaysBreakdownRow extends PlayStats {
    id: string;
    label: string;
    sharePercent: number;
    screens: number;
    lastPlayedDay: string | null;
    city?: string | null;
    uptimePercent?: number | null;
    estimatedImpressions?: number;
    status?: string | null;
}
interface PlaysBreakdown {
    groupBy: PlaysGroupBy;
    range: {
        from: string;
        to: string;
    };
    totalPlays: number;
    rows: PlaysBreakdownRow[];
}
interface HeatmapDayStat extends PlayStats {
    date: string;
}
interface PlaysHeatmap {
    range: {
        from: string;
        to: string;
    };
    days: HeatmapDayStat[];
    weekdayHour: {
        supported: boolean;
        from: string;
        to: string;
        grid: number[][];
    };
}
interface ReportFilterOptions {
    screens: {
        id: string;
        name: string;
        city: string | null;
    }[];
    campaigns: {
        id: string;
        name: string;
        status: string;
    }[];
    creatives: {
        id: string;
        name: string;
        campaign_name: string;
    }[];
    cities: string[];
}
interface RevenueTotals {
    gross: number;
    net: number;
    deductions: number;
    bookings: number;
    averageBooking: number;
    plays: number;
    grossPerThousandPlays: number | null;
}
interface RevenueSummary {
    role: "ADVERTISER" | "PARTNER" | "ADMIN";
    range: {
        from: string;
        to: string;
        days: number;
        previous: {
            from: string;
            to: string;
        };
    };
    totals: RevenueTotals & {
        screens: number;
        campaigns: number;
    };
    previous: RevenueTotals;
    deltas: {
        gross: number | null;
        net: number | null;
        bookings: number | null;
    };
}
interface RevenueTimeseries {
    granularity: ReportGranularity;
    range: {
        from: string;
        to: string;
    };
    buckets: string[];
    totals: {
        gross: number[];
        net: number[];
    };
    series: ReportSeries[] | null;
}
interface RevenueBreakdownRow extends RevenueTotals {
    id: string;
    label: string;
    sharePercent: number;
}
interface RevenueBreakdown {
    role: "ADVERTISER" | "PARTNER" | "ADMIN";
    groupBy: RevenueGroupBy;
    range: {
        from: string;
        to: string;
    };
    totalGross: number;
    rows: RevenueBreakdownRow[];
}

declare const LOCATION_CATEGORIES: readonly ["PREMIUM_COMMERCIAL", "HIGH_STREET", "BUSINESS_DISTRICT", "RESIDENTIAL", "TRANSIT", "RETAIL", "TOURIST", "INSTITUTIONAL"];
declare const AUDIENCE_TAGS: readonly ["STUDENTS", "PROFESSIONALS", "FAMILIES", "SHOPPERS", "COMMUTERS", "TOURISTS"];
declare const TRAFFIC_TYPES: readonly ["PEDESTRIAN", "VEHICLE", "BOTH"];
declare const DISPLAY_TYPES: readonly ["LCD", "LED", "DIGITAL_BILLBOARD"];
declare const FACINGS: readonly ["ROAD_FACING", "INDOOR_FACING"];
declare const SIZE_BUCKETS: readonly ["10-20", "21-32", "33-55", "55+"];
type LocationCategory = (typeof LOCATION_CATEGORIES)[number];
type AudienceTag = (typeof AUDIENCE_TAGS)[number];
type TrafficType = (typeof TRAFFIC_TYPES)[number];
type DisplayType = (typeof DISPLAY_TYPES)[number];
type Facing = (typeof FACINGS)[number];
interface ScreenListingDetails {
    area: string | null;
    landmark: string | null;
    pincode: string | null;
    locationCategory: LocationCategory | null;
    audienceTags: AudienceTag[];
    trafficType: TrafficType | null;
    peakHoursStart: string | null;
    peakHoursEnd: string | null;
    weekendFootfall: number | null;
    avgDwellSeconds: number | null;
    displayType: DisplayType | null;
    screenSizeInches: number | null;
    facing: Facing | null;
    viewingDistanceM: number | null;
    visibilityAngle: number | null;
    obstructions: string | null;
    nightVisibility: boolean | null;
    brightnessNits: number | null;
    /** 0-100: how fully the partner has described the screen. Better-described screens rank first. */
    listingCompleteness: number;
}
/** "35,000–45,000" style footfall band for cards — a range reads as an estimate, a single number as a promise. */
declare function footfallRange(footfall: number | null | undefined): string | null;
/** Monthly price shown alongside the daily one (client spec shows ₹/month). */
declare const monthlyPrice: (pricePerDay: number) => number;

interface ScreenCategory {
    id: string;
    code: string;
    label: string;
}
type ScreenVerificationStatus = "PENDING" | "UNDER_REVIEW" | "ACTIVE" | "REJECTED";
declare const EDITABLE_SCREEN_STATUSES: ScreenVerificationStatus[];
interface Screen extends ScreenListingDetails {
    id: string;
    screenName: string;
    categoryId: string;
    screenSize: string;
    resolution: string;
    /** As-mounted shape — null when the resolution was never parseable (e.g. quick-registered screens). */
    orientation?: ScreenOrientation | null;
    resolutionWidth?: number | null;
    resolutionHeight?: number | null;
    os: string;
    androidVersion: string;
    deviceSerialNumber: string;
    installationAddress: string;
    city: string;
    state: string;
    gpsLatitude: number;
    gpsLongitude: number;
    /** A pasted Google Maps (or similar) share link, entered at registration — optional. */
    locationUrl: string | null;
    internetType: string;
    operatingHoursStart: string;
    operatingHoursEnd: string;
    ownershipDetails: string | null;
    revenueModel: string;
    pricePerDay: number;
    /** What the partner themselves last submitted — equal to pricePerDay unless an admin has adjusted it. */
    originalPricePerDay: number;
    /** Signed delta (pricePerDay - originalPricePerDay) — positive means an admin raised it, negative means they lowered it. */
    priceAdjustmentAmount: number;
    isPriceAdjusted: boolean;
    priceAdjustedAt: string | null;
    /** Admin-only markup added on top of pricePerDay to produce the advertiser-facing listed rate — 5 to 50 in steps of 5. */
    markupPercent: number;
    /** Admin override of the revenueModel's commission preset — null means "use the preset". */
    commissionOverridePercent: number | null;
    estimatedDailyImpressions: number | null;
    installationEnvironment: string | null;
    dailyFootfall: number | null;
    deviceModel: string | null;
    ram: string | null;
    storage: string | null;
    /** How many concurrent campaigns this screen's ad rotation can hold for the same date before it reads as fully booked. Defaults to 1 (exclusive). */
    maxAdCapacity: number;
    /** Managed offline: the device has no internet, so the partner downloads the booked creatives from the CMS and plays them by hand. Still bookable and visible to advertisers (cs-api 20260101000143). */
    isSelfManaged: boolean;
    /** Admin-only override of how often this screen's player polls /sync — null means "use the platform-wide default" (see useSyncPollingQuery in useTheme.ts). */
    syncIntervalMinutes: number | null;
    deviceId: string | null;
    deviceToken: string | null;
    deviceStatus: "ONLINE" | "OFFLINE";
    lastHeartbeatAt: string | null;
    /** True if a heartbeat arrived within the last 5 minutes — the actual "live right now" signal. */
    isLive: boolean;
    verificationStatus: ScreenVerificationStatus;
    /** Set only alongside UNDER_REVIEW, and only when that status came from an ACTIVE screen's material edit (never a first-time submission) — field-level before/after for what the partner just changed, keyed by the same field names as the update payload. */
    pendingReviewChanges: Partial<Record<keyof Screen, {
        before: unknown;
        after: unknown;
    }>> | null;
    rejectionReason: string | null;
    submittedAt: string | null;
    reviewedAt: string | null;
    isListed: boolean;
    createdAt: string;
    /** Admin-only, single-screen-fetch-only (GET /screens/:id) — the screen's owner's contact + every KYC/business/vehicle field captured at registration. Absent for the owning partner's own view (they already know who they are) and for every list endpoint. */
    owner?: ScreenOwnerDetails;
}
interface ScreenOwnerDetails {
    partnerId: string;
    userId: string;
    fullName: string;
    mobileNumber: string;
    email: string | null;
    accountStatus: string;
    partnerType: string;
    kycStatus: string;
    kycRejectionReason: string | null;
    kycSubmittedAt: string | null;
    kycReviewedAt: string | null;
    aadhaarNumber: string | null;
    panNumber: string | null;
    bankAccountNumber: string | null;
    bankIfsc: string | null;
    bankAccountName: string | null;
    upiId: string | null;
    dateOfBirth: string | null;
    city: string | null;
    state: string | null;
    businessName: string | null;
    legalStructure: string | null;
    gstNumber: string | null;
    udyamNumber: string | null;
    cin: string | null;
    vehicleRegistrationNumber: string | null;
    vehicleInsuranceValidTill: string | null;
    partnerSince: string;
}
/** The shape GET /screens/me/list and /screens/admin/list actually return — every Screen field except deviceToken, which only a single-screen fetch carries. */
type ScreenListItem = Omit<Screen, "deviceToken"> & {
    /** First marketplace photo for list thumbnails — null when the screen has no photos yet. */
    thumbnailUrl: string | null;
};
interface DiscoveryScreenPhoto {
    id: string;
    /** One of DISCOVERY_PHOTO_TYPES, or SURROUNDING_VIDEO_TYPE for the one video entry — check against that constant to render it as a video instead of an image. */
    photoType: string;
    downloadUrl: string;
    /** Small WebP copies (see types/imageVariants.ts); null/absent for videos and older images. */
    thumbUrl?: string | null;
    previewUrl?: string | null;
}
interface DiscoveryScreen extends ScreenListingDetails {
    id: string;
    screenName: string;
    categoryId: string;
    screenSize: string;
    resolution: string;
    /** As-mounted shape — null when the resolution was never parseable (e.g. quick-registered screens). */
    orientation?: ScreenOrientation | null;
    resolutionWidth?: number | null;
    resolutionHeight?: number | null;
    city: string;
    state: string;
    gpsLatitude: number;
    gpsLongitude: number;
    operatingHoursStart: string;
    operatingHoursEnd: string;
    pricePerDay: number;
    estimatedDailyImpressions: number | null;
    installationEnvironment: string | null;
    dailyFootfall: number | null;
    maxAdCapacity: number;
    availability: boolean;
    /** True if this screen's player has sent a heartbeat within the last 5 minutes. */
    isLive: boolean;
    /** Marketplace-facing discovery media, oldest first: 3 photos of the screen plus one surrounding-area video. Never includes installation/verification media (installed view, device serial photo, installation video) — see SURROUNDING_VIDEO_TYPE/DISCOVERY_PHOTO_TYPES. */
    photos: DiscoveryScreenPhoto[];
    /** Not a credential (that's deviceToken, owner/admin-only) — an opaque id for GET /devices/:deviceId/preview/mine. */
    deviceId: string | null;
    /** Only present when the search was a "near me" query (lat/lng passed). */
    distanceKm?: number;
    /** Guaranteed plays a day for a 15s ad at Standard frequency — the card's "Estimated plays" figure. */
    estimatedPlaysPerDay: number;
}
interface ScreenPhoto {
    id: string;
    photoType: string;
    originalFilename: string;
    uploadedAt: string;
    downloadUrl: string;
    /** Small WebP copies (see types/imageVariants.ts); null/absent for videos and older images. */
    thumbUrl?: string | null;
    previewUrl?: string | null;
}
declare const REVENUE_MODELS: readonly [{
    readonly value: "EXISTING_SCREEN_OWNER";
    readonly label: "Existing Screen Owner (70% you / 30% CASTADI)";
}, {
    readonly value: "AUTO_CAB_DRIVER";
    readonly label: "Auto & Cab Driver (80% you / 20% CASTADI)";
}, {
    readonly value: "MANAGED_INVESTOR";
    readonly label: "Managed / Investor (60% you / 40% CASTADI)";
}];
declare const INTERNET_TYPES: readonly [{
    readonly value: "WIFI";
    readonly label: "Wi-Fi";
}, {
    readonly value: "4G";
    readonly label: "4G";
}, {
    readonly value: "ETHERNET";
    readonly label: "Ethernet";
}, {
    readonly value: "MOBILE_DATA";
    readonly label: "Mobile Data";
}];
declare const SCREEN_ORIENTATIONS: readonly [{
    readonly value: "LANDSCAPE";
    readonly label: "Landscape";
}, {
    readonly value: "PORTRAIT";
    readonly label: "Portrait";
}];
type ScreenOrientation = (typeof SCREEN_ORIENTATIONS)[number]["value"];
declare function parseResolution(resolution: string | null | undefined): {
    width: number;
    height: number;
} | null;
/** Rewrites a "WxH" resolution so it matches the orientation (portrait = taller than wide). Unparseable strings pass through unchanged. */
declare function orientResolution(resolution: string, orientation: ScreenOrientation): string;
/** The orientation to show for a screen — the stored value, else derived from its resolution, else null. */
declare function screenOrientationOf(screen: {
    orientation?: ScreenOrientation | null;
    resolution?: string | null;
}): ScreenOrientation | null;
/** "Landscape" / "Portrait" for display, or null when the shape isn't known. */
declare function orientationLabel(screen: {
    orientation?: ScreenOrientation | null;
    resolution?: string | null;
}): string | null;
declare const INSTALLATION_ENVIRONMENTS: readonly [{
    readonly value: "INDOOR";
    readonly label: "Indoor";
}, {
    readonly value: "OUTDOOR";
    readonly label: "Outdoor";
}];
declare const SCREEN_SIZE_PRESETS: readonly [{
    readonly value: "10-720p";
    readonly label: "10\" — 1280x720 (HD)";
    readonly screenSize: "10 inch";
    readonly resolution: "1280x720";
}, {
    readonly value: "15-1080p";
    readonly label: "15\" — 1920x1080 (Full HD)";
    readonly screenSize: "15 inch";
    readonly resolution: "1920x1080";
}, {
    readonly value: "21-1080p";
    readonly label: "21\" — 1920x1080 (Full HD)";
    readonly screenSize: "21 inch";
    readonly resolution: "1920x1080";
}, {
    readonly value: "32-1080p";
    readonly label: "32\" — 1920x1080 (Full HD)";
    readonly screenSize: "32 inch";
    readonly resolution: "1920x1080";
}, {
    readonly value: "43-4k";
    readonly label: "43\" — 3840x2160 (4K)";
    readonly screenSize: "43 inch";
    readonly resolution: "3840x2160";
}, {
    readonly value: "55-4k";
    readonly label: "55\" — 3840x2160 (4K)";
    readonly screenSize: "55 inch";
    readonly resolution: "3840x2160";
}];
declare const DISCOVERY_PHOTO_TYPES: readonly [{
    readonly value: "FRONT_VIEW";
    readonly label: "Front view";
}, {
    readonly value: "SIDE_VIEW";
    readonly label: "Side view";
}, {
    readonly value: "SURROUNDING_AREA";
    readonly label: "Surrounding area";
}];
declare const INSTALLATION_PHOTO_TYPES: readonly [{
    readonly value: "INSTALLED_VIEW";
    readonly label: "Installed view";
}, {
    readonly value: "DEVICE_SERIAL_PHOTO";
    readonly label: "Device serial number";
}];
declare const PHOTO_TYPES: ({
    readonly value: "FRONT_VIEW";
    readonly label: "Front view";
} | {
    readonly value: "SIDE_VIEW";
    readonly label: "Side view";
} | {
    readonly value: "SURROUNDING_AREA";
    readonly label: "Surrounding area";
} | {
    readonly value: "INSTALLED_VIEW";
    readonly label: "Installed view";
} | {
    readonly value: "DEVICE_SERIAL_PHOTO";
    readonly label: "Device serial number";
})[];
declare const VIDEO_PHOTO_TYPE = "INSTALLATION_VIDEO";
declare const SURROUNDING_VIDEO_TYPE = "SURROUNDING_VIDEO";

interface AdvertiserKycStatus {
    verificationStatus: "PENDING" | "UNDER_REVIEW" | "APPROVED" | "REJECTED";
    rejectionReason: string | null;
    submittedAt: string | null;
    reviewedAt: string | null;
}
interface ScreenPartnerKycStatus {
    kycStatus: "PENDING" | "UNDER_REVIEW" | "APPROVED" | "REJECTED";
    rejectionReason: string | null;
    submittedAt: string | null;
    reviewedAt: string | null;
}
interface PendingAdvertiserRow {
    id: string;
    user_id: string;
    business_name: string;
    gst_number: string | null;
    pan_number: string | null;
    address: string | null;
    verification_submitted_at: string;
    business_category: string | null;
    business_type: string | null;
    budget_range: string | null;
    cin: string | null;
    billing_state: string | null;
    billing_pincode: string | null;
    wants_gst_invoice: boolean;
    brand_name: string | null;
    brand_website: string | null;
    social_media_links: string[] | null;
    terms_accepted_at: string | null;
    copyright_declaration_accepted_at: string | null;
    advertising_policy_accepted_at: string | null;
}
interface PendingScreenPartnerRow {
    id: string;
    user_id: string;
    partner_type: string;
    aadhaar_number: string | null;
    pan_number: string | null;
    bank_account_name: string | null;
    kyc_submitted_at: string;
    business_name: string | null;
    legal_structure: string | null;
    gst_number: string | null;
    udyam_number: string | null;
    cin: string | null;
    terms_accepted_at: string | null;
    digital_agreement_accepted_at: string | null;
    revenue_sharing_agreement_accepted_at: string | null;
}
type AdvertiserDocumentType = "BUSINESS_REGISTRATION_CERTIFICATE";
type ScreenPartnerDocumentType = "SELF_PHOTOGRAPH" | "ADDRESS_PROOF";
interface KycDocument {
    id: string;
    documentType: string;
    originalFilename: string;
    uploadedAt: string;
    downloadUrl: string;
}

type CreativeStatus = "PENDING_REVIEW" | "APPROVED" | "REJECTED";
type StorageProvider = "LOCAL" | "R2";
interface Creative {
    id: string;
    campaignId: string;
    originalFilename: string;
    contentType: string;
    fileSize: number;
    durationSeconds: number | null;
    /** Displayed pixel size, measured by cs-api from the file itself — null for older uploads. */
    width?: number | null;
    height?: number | null;
    storageProvider: StorageProvider;
    label: string | null;
    tags: string[];
    status: CreativeStatus;
    rejectionReason: string | null;
    submittedAt: string;
    reviewedAt: string | null;
    downloadUrl: string;
    /** Small WebP copies (see types/imageVariants.ts); null/absent for videos and older images. */
    thumbUrl?: string | null;
    previewUrl?: string | null;
    /** The Media Library asset backing this creative — every creative is linked to one now, whether it started as a direct campaign upload or a library asset applied to a campaign. */
    mediaAssetId: string | null;
    /** Optional time-of-day restriction — the creative only rotates into a screen's playlist while the current hour falls in [slotStartHour, slotEndHour). Both null means no restriction. */
    slotStartHour: number | null;
    slotEndHour: number | null;
    /** Set only once a rejected creative's payment share has been credited to the wallet (see useWallet's useCreditRejectedCreativeToWalletMutation) — null otherwise, including a rejected creative still awaiting the advertiser's choice. */
    walletCreditedAt: string | null;
    walletCreditAmount: number | null;
}
interface PendingCreative extends Creative {
    campaignName: string;
}
interface LiveScreen {
    screenId: string;
    screenName: string;
    installationAddress: string;
    city: string;
    state: string;
    gpsLatitude: number;
    gpsLongitude: number;
    /** Not a credential — an opaque id for GET /devices/:deviceId/preview/mine. */
    deviceId: string | null;
    /** True if this screen's player has sent a heartbeat within the last 5 minutes. */
    isLive: boolean;
    /** Managed offline — the partner plays the booked creatives from manual downloads (no heartbeat, so isLive is false). */
    isSelfManaged: boolean;
    campaignId: string;
    campaignName: string;
    creative: {
        id: string;
        originalFilename: string;
        contentType: string;
        durationSeconds: number | null;
        downloadUrl: string;
        thumbUrl?: string | null;
        previewUrl?: string | null;
    };
}

/** Who the ad belongs to. "PARTNER" is the screen partner's own ad on the slots they reserved out of their own screen (cs-api's modules/partnerAds) — free, no campaign behind it. */
type AdOwner = "ADVERTISER" | "PARTNER";
interface PlaylistItem {
    creativeId: string;
    owner?: AdOwner;
    /** Absent for a partner's own ad — there is no campaign behind one. */
    campaignId?: string;
    /** The campaign's name, or for a partner ad the label the partner gave it. */
    campaignName?: string;
    contentType: string;
    durationSeconds: number | null;
    /** `sha256:<hex>` — absent for creatives uploaded before this existed. */
    checksum?: string;
    /** Optional time-of-day restriction the server already enforced when building this list — informational, the item simply wouldn't be here otherwise. */
    slotStartHour?: number;
    slotEndHour?: number;
    order: number;
    downloadUrl: string;
}
interface Playlist {
    screenId: string;
    screenName: string;
    /** Omitted (not just empty-string) when `items` is empty — nothing to version, and no future no_change to diff against. */
    playlistVersion?: string;
    items: PlaylistItem[];
}
type SyncResult = {
    status: "no_change";
    playlistVersion: string;
} | ({
    status: "ok" | "update_available";
} & Playlist);
interface PreviewPlaylist extends Playlist {
    deviceId: string;
    deviceToken: string;
    deviceStatus: "ONLINE" | "OFFLINE";
    lastHeartbeatAt: string | null;
    /** "WIDTHxHEIGHT" (e.g. "1920x1080") — sizes the billboard mockup's bezel to the screen's own orientation. */
    resolution: string | null;
}
interface ScreenHealth {
    screenId: string;
    screenName: string;
    city: string;
    state: string;
    deviceId: string;
    deviceToken: string;
    status: "ONLINE" | "OFFLINE";
    lastHeartbeatAt: string | null;
    healthScore: number;
    /** Whatever the most recent heartbeat's health payload reported — null if never heartbeated, partial if only some fields were sent. */
    health: DeviceHealthReport | null;
}
type MyScreenHealth = Omit<ScreenHealth, "deviceToken">;
interface PlaybackSummary {
    creativeId: string;
    completedCount: number;
    failedCount: number;
    interruptedCount: number;
    lastPlayedAt: string | null;
}
interface PlaybackLogEntry {
    id: string;
    screenId: string;
    owner?: AdOwner;
    /** Null for a play of the partner's own ad on their reserved slots. */
    campaignId: string | null;
    campaignName: string | null;
    creativeId: string;
    startedAt: string;
    endedAt: string | null;
    status: "COMPLETED" | "FAILED" | "INTERRUPTED";
}
interface MyScreenSummary {
    id: string;
    screenName: string;
    city: string;
    state: string;
}
interface ScreenLocation {
    screenId: string;
    screenName: string;
    city: string;
    state: string;
    installationAddress?: string | null;
    /** Where to plot — the player's reported GPS when known, else the registered position (see locationSource). */
    latitude: number;
    longitude: number;
    locationSource?: "DEVICE" | "REGISTERED";
    reportedLatitude?: number | null;
    reportedLongitude?: number | null;
    locationReportedAt?: string | null;
    registeredLatitude?: number | null;
    registeredLongitude?: number | null;
    distanceFromRegisteredKm?: number | null;
    status: "ONLINE" | "OFFLINE";
    lastHeartbeatAt: string | null;
}
interface FleetHealthSummary {
    onlineCount: number;
    offlineCount: number;
    totalActiveScreens: number;
    playbackSuccessRateToday: number | null;
    totalPlaysToday: number;
}
interface HealthAlertConfig {
    healthScoreAlertThreshold: number;
    updatedAt: string | null;
}
interface DeviceHealthReport {
    batteryLevel?: number;
    storageAvailableMb?: number;
    appVersion?: string;
    androidVersion?: number;
    uptimeMs?: number;
    networkType?: "WIFI" | "ETHERNET" | "CELLULAR" | "OFFLINE" | "UNKNOWN";
    playbackErrorCount?: number;
}
interface TimelineBar {
    id: string;
    owner: AdOwner;
    /** Campaign name for an advertiser ad, or the partner's own label for their ad. */
    label: string;
    advertiserName: string | null;
    campaignId: string | null;
    /** Calendar dates ('YYYY-MM-DD'), inclusive — the booking/reserved-slot window this ad plays in. */
    startDate: string;
    endDate: string;
    /** Optional time-of-day restriction — informational, shown in the bar's tooltip. */
    slotStartHour?: number;
    slotEndHour?: number;
    fileName: string;
    contentType: string;
    durationSeconds: number | null;
}
interface TimelineScreen {
    screenId: string;
    screenName: string;
    city: string;
    state: string;
    /** Opaque device id for `/player/:deviceId` — null when no device has ever been linked to this screen. */
    deviceId: string | null;
    status: "ONLINE" | "OFFLINE";
    lastHeartbeatAt: string | null;
    bars: TimelineBar[];
}
interface MonitoringTimeline {
    from: string;
    to: string;
    /** Only present on the screen-scoped endpoint — FULL for an admin/the owning partner, OWN_ONLY for anyone else (e.g. an advertiser browsing the marketplace only ever sees their own campaign's ads). */
    scope?: "FULL" | "OWN_ONLY";
    screens: TimelineScreen[];
}
interface DeviceLogMapEntry {
    date: string;
    rowCount: number;
    firstAt: string | null;
    lastAt: string | null;
    summary: {
        onlineMinutes: number;
        statusBreakdown: Record<string, number>;
    } | {
        totalPlays: number;
        uniqueCampaignIds: number;
        errorCount: number;
    } | null;
}
interface HeartbeatHistoryRow {
    id: string;
    screen_id: string;
    status: string;
    metadata: Record<string, unknown> | null;
    received_at: string;
}
interface PlaybackHistoryRow {
    id: string;
    screen_id: string;
    campaign_id: string;
    creative_id: string;
    started_at: string;
    ended_at: string | null;
    status: string;
}
interface DeviceLogHistory<Row> {
    date: string;
    source: "live" | "archive";
    rows: Row[];
}
interface DeviceActivation {
    id: string;
    deviceId: string;
    deviceModel: string | null;
    appVersion: string | null;
    status: "PENDING" | "EXPIRED" | "CLAIMED";
    expiresAt: string;
    registeredAt: string;
    updatedAt: string;
    claimedScreenId: string | null;
    claimedScreenName: string | null;
}
interface PreviewDeviceLiveness {
    online: boolean;
    lastHeartbeatAt: string | null;
    minutesSinceLastHeartbeat: number | null;
    offlineAfterMinutes: number;
    /** false when the screen has never once checked in — needs different wording than "went offline". */
    everSeen: boolean;
}
declare function parseResolutionAspectRatio(resolution: string | null | undefined): number | null;
interface AdvertiserPreviewItem {
    creativeId: string;
    originalFilename: string;
    contentType: string;
    durationSeconds: number | null;
    slotStartHour?: number;
    slotEndHour?: number;
    order: number;
    downloadUrl: string;
}
interface AdvertiserScreenPreview {
    screenId: string;
    screenName: string;
    city: string | null;
    /** "WIDTHxHEIGHT" (e.g. "1920x1080") — sizes the billboard mockup's bezel to the screen's own orientation. */
    resolution: string | null;
    device: PreviewDeviceLiveness;
    /** Total approved creatives on this screen today, this campaign's included — a count, never identities. */
    itemsInRotation: number;
    items: AdvertiserPreviewItem[];
}

declare const KB_CATEGORIES: readonly [{
    readonly value: "ACCOUNT_SETUP";
    readonly label: "Account Setup";
}, {
    readonly value: "CAMPAIGN_MANAGEMENT";
    readonly label: "Campaign Management";
}, {
    readonly value: "SCREEN_REGISTRATION";
    readonly label: "Screen Registration";
}, {
    readonly value: "ANDROID_PLAYER";
    readonly label: "Android Player";
}, {
    readonly value: "PAYMENTS";
    readonly label: "Payments";
}, {
    readonly value: "PAYOUTS";
    readonly label: "Payouts";
}, {
    readonly value: "KYC";
    readonly label: "KYC";
}, {
    readonly value: "TROUBLESHOOTING";
    readonly label: "Troubleshooting";
}, {
    readonly value: "FAQ";
    readonly label: "FAQ";
}];
type KbCategory = (typeof KB_CATEGORIES)[number]["value"];
interface KbArticle {
    id: string;
    category: KbCategory;
    title: string;
    body: string;
    published: boolean;
    createdBy: string | null;
    createdAt: string;
    updatedAt: string;
}

type NotificationCategory = "AUTH" | "KYC" | "SCREENS" | "CAMPAIGNS" | "BOOKINGS" | "PAYMENTS" | "PAYOUTS" | "DEVICE_HEALTH" | "MAINTENANCE" | "SUPPORT" | "SYSTEM" | "SECURITY";
type NotificationPriority = "LOW" | "NORMAL" | "HIGH" | "CRITICAL";
type NotificationStatus = "SENT" | "READ";
interface NotificationPreferences {
    inAppEnabled: boolean;
    emailEnabled: boolean;
    smsEnabled: boolean;
    marketingEnabled: boolean;
    /** Mobile push (cs-mobile). SECURITY notifications are pushed regardless. */
    pushEnabled: boolean;
    /** Null when the user has never saved a preference (all-enabled defaults). */
    updatedAt: string | null;
}
interface Notification {
    id: string;
    category: NotificationCategory;
    priority: NotificationPriority;
    title: string;
    message: string;
    link: string | null;
    status: NotificationStatus;
    readAt: string | null;
    metadata: Record<string, unknown> | null;
    createdAt: string;
}
interface NotificationTemplate {
    templateKey: string;
    category: NotificationCategory;
    titleTemplate: string;
    messageTemplate: string;
    emailEnabled: boolean;
    updatedAt: string;
}

type PartnerAdStatus = "PENDING_REVIEW" | "APPROVED" | "REJECTED";
interface PartnerAd {
    id: string;
    selfReservationId: string;
    screenId: string;
    /** Usually the partner's own offline client — the only name a partner ad ever gets. */
    label: string | null;
    originalFilename: string;
    contentType: string;
    fileSize: number;
    durationSeconds: number | null;
    slotStartHour: number | null;
    slotEndHour: number | null;
    status: PartnerAdStatus;
    rejectionReason: string | null;
    submittedAt: string;
    reviewedAt: string | null;
    createdAt: string;
    downloadUrl?: string;
    /** Small WebP copies (see types/imageVariants.ts); null/absent for videos and older images. */
    thumbUrl?: string | null;
    previewUrl?: string | null;
}
interface PartnerAdWithContext extends PartnerAd {
    screenName: string;
    screenCity: string;
    reservationStartDate: string;
    reservationEndDate: string;
    reservationSlotCount: number;
    reservationStatus: string;
    /** Admin queue only. */
    partnerBusinessName?: string;
}
/** What one reserved block currently holds — its slot ceiling and the ads in it. */
interface ReservationAds {
    slotCount: number;
    usedSlots: number;
    availableSlots: number;
    ads: PartnerAd[];
}

type PaymentStatus = "INITIATED" | "SUCCESSFUL" | "FAILED";
declare const SETTLEMENT_MODES: readonly [{
    readonly value: "CASH";
    readonly label: "Cash";
}, {
    readonly value: "BANK_TRANSFER";
    readonly label: "Bank transfer";
}, {
    readonly value: "INTERNAL_SETTLEMENT";
    readonly label: "Internal settlement";
}, {
    readonly value: "OTHER";
    readonly label: "Other";
}];
type SettlementMode = (typeof SETTLEMENT_MODES)[number]["value"];
interface AdvertiserBillingInfo {
    advertiserBusinessName?: string;
    advertiserGstNumber?: string;
    advertiserAddress?: string;
    advertiserBillingState?: string;
    advertiserBillingPincode?: string;
}
interface Payment extends AdvertiserBillingInfo {
    id: string;
    campaignId: string;
    campaignName?: string;
    status: PaymentStatus;
    screenAmount: number;
    platformCommission: number;
    taxAmount: number;
    totalAmount: number;
    /** Derived from this payment's own amounts (never a live fee-config read — see cs-api's derivedPercent). */
    platformFeePercent: number;
    gstRatePercent: number;
    currency: string;
    gatewayOrderId: string | null;
    gatewayPaymentId: string | null;
    failureReason: string | null;
    settlementMode: SettlementMode | null;
    settlementNote: string | null;
    /** CSP-YYYYMMDD-###### — null for a payment created before this existed. */
    referenceNumber: string | null;
    createdAt: string;
    invoiceId?: string | null;
    /** CSIN-YYYYMMDD-###### */
    invoiceNumber?: string | null;
    invoiceIssuedAt?: string | null;
}
interface CreateOrderResult {
    paymentId: string;
    orderId: string;
    amount: number;
    currency: string;
    keyId: string;
    /** Razorpay Customer id, lazily created — null if that step failed (checkout still proceeds, just without the saved-methods option). */
    customerId: string | null;
}
interface SavedPaymentMethod {
    id: string;
    method: string;
    card: {
        network: string;
        last4: string;
        type: string;
    } | null;
    vpa: string | null;
    bank: string | null;
    createdAt: string | null;
}
interface Invoice {
    id: string;
    invoiceNumber: string;
    campaignId: string;
    campaignName: string;
    amount: number;
    taxAmount: number;
    totalAmount: number;
    issuedAt: string;
}
interface InvoiceDetail extends AdvertiserBillingInfo {
    id: string;
    invoiceNumber: string;
    campaignId: string;
    campaignName: string;
    campaignStatus: string;
    screenAmount: number;
    platformCommission: number;
    taxAmount: number;
    totalAmount: number;
    /** Derived from this invoice's own amounts (never a live fee-config read — see cs-api's derivedPercent). */
    platformFeePercent: number;
    gstRatePercent: number;
    currency: string;
    gatewayOrderId: string | null;
    gatewayPaymentId: string | null;
    settlementMode: SettlementMode | null;
    settlementNote: string | null;
    paidAt: string;
    issuedAt: string;
}
interface BillingFilters {
    status?: PaymentStatus | "";
    dateFrom?: string;
    dateTo?: string;
    search?: string;
}

type ProofRequestStatus = "PENDING" | "SUBMITTED" | "VERIFIED" | "OVERDUE" | "WAIVED";
type ProofRequestSource = "AUTO_GO_LIVE" | "ADVERTISER" | "PARTNER";
interface ProofRequest {
    id: string;
    campaignId: string;
    campaignName?: string;
    screenId: string;
    screenName?: string;
    source: ProofRequestSource;
    status: ProofRequestStatus;
    note: string | null;
    requestedAt: string;
    dueAt: string;
    submittedAt: string | null;
    /** True when a COMPLETED playback was logged within minutes of the photo. */
    playbackMatched: boolean;
    waivedReason: string | null;
}
interface ProofRequestPhoto {
    id: string;
    caption: string | null;
    capturedAt: string;
    uploadedAt: string;
    downloadUrl: string;
    /** Small WebP copies (see types/imageVariants.ts); null/absent for videos and older images. */
    thumbUrl?: string | null;
    previewUrl?: string | null;
}
interface CampaignProofRequest extends ProofRequest {
    photos: ProofRequestPhoto[];
}
/** One row of the partner's picker: a campaign live on the screen, with its open or latest request. */
interface ScreenLiveCampaign {
    campaignId: string;
    campaignName: string;
    request: Pick<ProofRequest, "id" | "status" | "source" | "note" | "requestedAt" | "dueAt" | "submittedAt" | "playbackMatched"> | null;
}
interface ProofRequestSummary {
    PENDING: number;
    SUBMITTED: number;
    VERIFIED: number;
    OVERDUE: number;
    WAIVED: number;
    /** PENDING + OVERDUE. */
    open: number;
}
declare const isOpen: (status: ProofRequestStatus) => status is "PENDING" | "OVERDUE";

type QuotationStatus = "SUBMITTED" | "COUNTERED" | "APPROVED" | "REJECTED" | "PAYMENT_SUBMITTED" | "COMPLETED" | "CANCELLED";
type QuotationAction = "SUBMITTED" | "COUNTERED" | "ACCEPTED" | "APPROVED" | "REJECTED" | "REOPENED" | "RECEIPT_SUBMITTED" | "PAYMENT_REJECTED" | "REVISION_OPENED" | "REVISION_CLOSED" | "COMPLETED" | "CANCELLED";
interface QuotationEvent {
    id: string;
    revision: number;
    actorRole: "ADVERTISER" | "ADMIN" | "SYSTEM";
    actorName: string | null;
    action: QuotationAction;
    fromStatus: QuotationStatus | null;
    toStatus: QuotationStatus;
    amount: number | null;
    note: string | null;
    createdAt: string;
}
interface QuotationOrderSnapshot {
    screenIds: string[];
    startDate: string;
    endDate: string;
    frequencyLevel: FrequencyLevel;
    customShares: number | null;
    estimate: {
        days: number;
        shares: number;
        subtotal: number;
        platformCharge: number;
        taxAmount: number;
        totalAmount: number;
        lineItems?: {
            screenId: string;
            shares: number;
            listedDailyRate: number;
            days: number;
            screenPrice: number;
            platformCharge: number;
            taxAmount: number;
            totalAmount: number;
        }[];
    };
}
interface Quotation {
    id: string;
    campaignId: string;
    campaignName: string | null;
    campaignCode: string | null;
    campaignStatus: string | null;
    /** Admin responses only. */
    advertiserId?: string;
    advertiserName: string | null;
    status: QuotationStatus;
    revision: number;
    systemAmount: number;
    proposedAmount: number | null;
    counterAmount: number | null;
    approvedAmount: number | null;
    /** Approved figure once agreed, otherwise the latest offer on the table. */
    currentAmount: number;
    /** The approved amount differs from the order's list total. */
    isRevised: boolean;
    /** Admin-controlled: the advertiser may reopen / re-propose only while this is on. */
    revisionAllowed: boolean;
    orderSnapshot: QuotationOrderSnapshot;
    /** Admin responses only (advertisers use payment.id). */
    paymentId?: string | null;
    completedAt: string | null;
    /** List rows only: the uploaded payment receipt, if any (signed link). */
    receipt?: {
        filename: string;
        downloadUrl: string;
    } | null;
    createdAt: string;
    updatedAt: string;
}
interface QuotationDetail extends Quotation {
    events: QuotationEvent[];
    documents: CampaignDocuments;
    payment: {
        id: string;
        status: string;
        referenceNumber: string | null;
        totalAmount: number;
        listAmount: number | null;
        settlementMode: string | null;
        createdAt: string;
        /** Issued once the quotation is completed (payment SUCCESSFUL). */
        invoice: {
            id: string;
            invoiceNumber: string;
            issuedAt: string;
        } | null;
    } | null;
    billing: {
        businessName: string | null;
        gstNumber: string | null;
        address: string | null;
        billingState: string | null;
        billingPincode: string | null;
    };
    screens: {
        id: string;
        name: string;
        city: string;
        state: string;
    }[];
}
declare const OPEN_QUOTATION_STATUSES: QuotationStatus[];
/** Whether the quoted order still matches what the builder currently has selected. */
declare function quotationMatchesOrder(q: Quotation, order: {
    screenIds: string[];
    startDate: string;
    endDate: string;
}): boolean;
/** The quotation's reference number — same on the PDF, cs-web and the app: QT-<campaign code>-R<revision>. */
declare const quotationNumber: (q: Pick<Quotation, "campaignCode" | "id" | "revision">) => string;

type RefundMethod = "GATEWAY" | "WALLET" | "MANUAL";
type RefundStatus = "PENDING" | "APPROVED" | "REJECTED";
interface Refund {
    id: string;
    paymentId: string;
    campaignId: string;
    amount: number;
    method: RefundMethod;
    status: RefundStatus;
    rejectionReason: string | null;
    reviewedAt: string | null;
    createdAt: string;
}
/** Admin worklist row — a refund request joined to its campaign/advertiser. */
interface AdminRefund extends Refund {
    campaignName: string;
    advertiserBusinessName: string;
}

declare const SETTLEMENT_CADENCES: readonly [{
    readonly value: "MONTHLY";
    readonly label: "Monthly";
    readonly hint: "Paid out once at month end. Lower settlement fee.";
}, {
    readonly value: "DAILY";
    readonly label: "Daily";
    readonly hint: "Credited to your wallet every day. Higher settlement fee.";
}];
type SettlementCadence = (typeof SETTLEMENT_CADENCES)[number]["value"];
type WalletTransactionType$1 = "SETTLEMENT" | "PAYOUT" | "ADJUSTMENT";
interface WalletTransaction$1 {
    id: string;
    type: WalletTransactionType$1;
    /** Signed — positive credit (settlement), negative debit (payout). */
    amount: number;
    balanceAfter: number;
    /** Only meaningful on a SETTLEMENT row. */
    periodStart: string | null;
    periodEnd: string | null;
    description: string | null;
    createdAt: string;
}
interface Wallet$1 {
    balance: number;
    settlementCadence: SettlementCadence;
    transactions: {
        rows: WalletTransaction$1[];
        meta: {
            page: number;
            limit: number;
            total: number;
        };
    };
}
interface DailyCollection {
    date: string;
    /** Post-commission (Financial Engine's SO_GROSS_SETTLEMENT), not the pre-commission listed price. */
    grossAmount: number;
    tdsAmount: number;
    gstTcsAmount: number;
    /** grossAmount - tdsAmount - gstTcsAmount, before the settlement-cadence fee below. */
    soNetCashPayout: number;
    settlementFeeAmount: number;
    netAmount: number;
    settled: boolean;
}
interface TodayCollection {
    date: string;
    grossAmount: number;
    tdsAmount: number;
    gstTcsAmount: number;
    soNetCashPayout: number;
    settlementFeeAmount: number;
    netAmount: number;
    settlementCadence: SettlementCadence;
    /** DAILY cadence only — MONTHLY just accrues until month end. */
    willSettleToday: boolean;
}
interface FeeConfig {
    id: string;
    transactionFeePercent: number;
    dailySettlementFeePercent: number;
    monthlySettlementFeePercent: number;
    adPlatformFeePercent: number;
    gstRatePercent: number;
    pgBaseFeePercent: number;
    pgGstOnFeePercent: number;
    tds194oPercent: number;
    gstTcsPercent: number;
    showPlatformCommission: boolean;
    showTaxBreakdown: boolean;
    showGrossAmount: boolean;
    showSettlementFee: boolean;
    updatedAt: string;
}
/** The subset of FeeConfig any authenticated advertiser/partner can read —
 * just what to show/hide, never the actual fee percentages. */
interface DisplaySettings {
    showPlatformCommission: boolean;
    showTaxBreakdown: boolean;
    showGrossAmount: boolean;
    showSettlementFee: boolean;
}
/** Admin view — one row per partner wallet holding a balance. */
interface AdminWallet {
    walletId: string;
    screenPartnerId: string;
    partnerName: string;
    partnerMobile: string;
    settlementCadence: SettlementCadence;
    balance: number;
    updatedAt: string;
}
/** Admin view — history of what's been credited, across all partners. */
interface AdminSettlement {
    id: string;
    screenPartnerId: string;
    walletId: string;
    partnerName: string;
    /** Only populated on a single-settlement detail fetch, not the list. */
    partnerMobile?: string;
    partnerEmail?: string;
    amount: number;
    balanceAfter: number;
    periodStart: string | null;
    periodEnd: string | null;
    description: string | null;
    createdAt: string;
}
interface AdminSettlementFilters {
    dateFrom?: string;
    dateTo?: string;
    search?: string;
}
type WithdrawalStatus = "PENDING" | "APPROVED" | "REJECTED" | "CANCELLED";
declare const REPORT_FREQUENCIES: readonly [{
    readonly value: "DAILY";
    readonly label: "Daily";
}, {
    readonly value: "WEEKLY";
    readonly label: "Weekly";
}, {
    readonly value: "MONTHLY";
    readonly label: "Monthly";
}];
type ReportFrequency = (typeof REPORT_FREQUENCIES)[number]["value"];
declare const REPORT_FORMATS: readonly [{
    readonly value: "csv";
    readonly label: "CSV";
}, {
    readonly value: "xlsx";
    readonly label: "Excel";
}];
type ReportFormat = (typeof REPORT_FORMATS)[number]["value"];
interface ScheduledReport {
    id: string;
    reportType: "REVENUE";
    frequency: ReportFrequency;
    format: ReportFormat;
    active: boolean;
    lastSentAt: string | null;
    createdAt: string;
}
interface WithdrawalRequest {
    id: string;
    walletId: string;
    amount: number;
    status: WithdrawalStatus;
    rejectionReason: string | null;
    reviewedAt: string | null;
    createdAt: string;
}
/** Admin worklist row — a withdrawal request joined to who requested it. */
interface AdminWithdrawalRequest extends WithdrawalRequest {
    screenPartnerId: string;
    partnerName: string;
    partnerMobile: string;
}

declare const TICKET_CATEGORIES: readonly [{
    readonly value: "ACCOUNT_ISSUES";
    readonly label: "Account Issues";
}, {
    readonly value: "LOGIN_PROBLEMS";
    readonly label: "Login Problems";
}, {
    readonly value: "KYC_VERIFICATION";
    readonly label: "KYC Verification";
}, {
    readonly value: "CAMPAIGN_ISSUES";
    readonly label: "Campaign Issues";
}, {
    readonly value: "BOOKING_ISSUES";
    readonly label: "Booking Issues";
}, {
    readonly value: "PAYMENT_ISSUES";
    readonly label: "Payment Issues";
}, {
    readonly value: "REFUND_REQUESTS";
    readonly label: "Refund Requests";
}, {
    readonly value: "PAYOUT_ISSUES";
    readonly label: "Payout Issues";
}, {
    readonly value: "DEVICE_ISSUES";
    readonly label: "Device Issues";
}, {
    readonly value: "SCREEN_OFFLINE";
    readonly label: "Screen Offline";
}, {
    readonly value: "ANDROID_PLAYER_ISSUES";
    readonly label: "Android Player Issues";
}, {
    readonly value: "CLOUD_CMS_ISSUES";
    readonly label: "Cloud CMS Issues";
}, {
    readonly value: "TECHNICAL_SUPPORT";
    readonly label: "Technical Support";
}, {
    readonly value: "GENERAL_INQUIRY";
    readonly label: "General Inquiry";
}, {
    readonly value: "FEATURE_REQUEST";
    readonly label: "Feature Request";
}, {
    readonly value: "BUG_REPORT";
    readonly label: "Bug Report";
}, {
    readonly value: "OTHER";
    readonly label: "Other";
}];
type TicketCategory = (typeof TICKET_CATEGORIES)[number]["value"];
declare const TICKET_PRIORITIES: readonly ["LOW", "MEDIUM", "HIGH", "CRITICAL"];
type TicketPriority = (typeof TICKET_PRIORITIES)[number];
declare const TICKET_STATUSES: readonly ["OPEN", "ASSIGNED", "UNDER_REVIEW", "WAITING_FOR_CUSTOMER", "IN_PROGRESS", "ESCALATED", "RESOLVED", "CLOSED", "REOPENED"];
type TicketStatus = (typeof TICKET_STATUSES)[number];
declare const ASSIGNMENT_TEAMS: readonly ["SUPPORT", "FINANCE", "TECHNICAL", "OPERATIONS", "ENGINEERING", "MANAGEMENT"];
type AssignmentTeam = (typeof ASSIGNMENT_TEAMS)[number];
declare const TERMINAL_TICKET_STATUSES: TicketStatus[];
interface Ticket {
    id: string;
    userId: string;
    /** Only present on the admin queue's rows (joined in server-side). */
    raiserName?: string;
    raiserMobile?: string;
    raiserRole?: string;
    category: TicketCategory;
    subject: string;
    description: string;
    priority: TicketPriority;
    status: TicketStatus;
    assignedTo: string | null;
    assignedTeam: AssignmentTeam | null;
    resolutionSummary: string | null;
    resolvedAt: string | null;
    resolvedBy: string | null;
    feedbackRating: number | null;
    feedbackComment: string | null;
    firstRespondedAt: string | null;
    /** Only present when the caller has support:manage (see toTicketDto). */
    sla: {
        firstResponseBreached: boolean;
        resolutionBreached: boolean;
        breached: boolean;
    } | null;
    createdAt: string;
    updatedAt: string;
}
interface SlaConfig {
    priority: TicketPriority;
    firstResponseMinutes: number;
    resolutionMinutes: number;
}
interface TicketMessage {
    id: string;
    ticketId: string;
    senderId: string;
    senderName: string;
    senderRole: string;
    message: string;
    /** Never present on a message returned to the ticket's own owner. */
    isInternalNote: boolean;
    createdAt: string;
}
interface TicketDetail {
    ticket: Ticket;
    messages: TicketMessage[];
}

interface Wallet {
    id: string;
    balance: number;
    updatedAt: string;
    transactions: WalletTransaction[];
}
type WalletTransactionType = "TOPUP" | "CAMPAIGN_PAYMENT" | "REFUND" | "ADJUSTMENT";
type WalletTransactionStatus = "INITIATED" | "SUCCESSFUL" | "FAILED";
interface WalletTransaction {
    id: string;
    type: WalletTransactionType;
    status: WalletTransactionStatus;
    /** Signed — positive for a credit (TOPUP, REFUND), negative for a debit (CAMPAIGN_PAYMENT). */
    amount: number;
    balanceAfter: number | null;
    campaignId: string | null;
    paymentId: string | null;
    description: string | null;
    createdAt: string;
}
interface CreateTopUpOrderResult {
    orderId: string;
    amount: number;
    currency: string;
    keyId: string;
}
interface PayCampaignFromWalletResult {
    wallet: Wallet;
    paymentId: string;
}
interface CreditRejectedCreativeResult {
    wallet: Wallet;
    /** The rejected creative's share of its campaign's payment, just credited. */
    amount: number;
}

export { type HealthAlertConfig as $, ASSIGNMENT_TEAMS as A, type BillingFilters as B, type CampaignAnalytics as C, type CreateTopUpOrderResult as D, type Creative as E, type CreativeStatus as F, type CreditRejectedCreativeResult as G, DEFAULT_REPORT_FILTERS as H, DISCOVERY_PHOTO_TYPES as I, DISPLAY_TYPES as J, type DailyCollection as K, type DeviceActivation as L, type DeviceHealthReport as M, type DeviceLogHistory as N, type DeviceLogMapEntry as O, type DiscoveryScreen as P, type DiscoveryScreenPhoto as Q, type DisplaySettings as R, type ScreenOrientation as S, type DisplayType as T, EDITABLE_SCREEN_STATUSES as U, FACINGS as V, type Wallet as W, type Facing as X, type FeeConfig as Y, type FleetHealthSummary as Z, type GeographicRow as _, AUDIENCE_TAGS as a, type QuotationOrderSnapshot as a$, type HeartbeatHistoryRow as a0, type HeatmapDayStat as a1, INSTALLATION_ENVIRONMENTS as a2, INSTALLATION_PHOTO_TYPES as a3, INTERNET_TYPES as a4, type Invoice as a5, type InvoiceDetail as a6, KB_CATEGORIES as a7, type KbArticle as a8, type KbCategory as a9, type PendingCreative as aA, type PendingScreenPartnerRow as aB, type PlayStats as aC, type PlaybackHistoryRow as aD, type PlaybackLogEntry as aE, type PlaybackSummary as aF, type Playlist as aG, type PlaylistItem as aH, type PlaysBreakdown as aI, type PlaysBreakdownRow as aJ, type PlaysGroupBy as aK, type PlaysHeatmap as aL, type PlaysSummary as aM, type PlaysTimeseries as aN, type PreviewDeviceLiveness as aO, type PreviewPlaylist as aP, type ProofOfPlay as aQ, type ProofOfPlayEntry as aR, type ProofRequest as aS, type ProofRequestPhoto as aT, type ProofRequestSource as aU, type ProofRequestStatus as aV, type ProofRequestSummary as aW, type Quotation as aX, type QuotationAction as aY, type QuotationDetail as aZ, type QuotationEvent as a_, type KycDocument as aa, LOCATION_CATEGORIES as ab, type LiveScreen as ac, type LocationCategory as ad, type MonitoringTimeline as ae, type MyScreenHealth as af, type MyScreenSummary as ag, type Notification as ah, type NotificationCategory as ai, type NotificationPreferences as aj, type NotificationPriority as ak, type NotificationStatus as al, type NotificationTemplate as am, OPEN_QUOTATION_STATUSES as an, PHOTO_TYPES as ao, type PartnerAd as ap, type PartnerAdStatus as aq, type PartnerAdWithContext as ar, type PartnerAnalytics as as, type Wallet$1 as at, type WalletTransaction$1 as au, type WalletTransactionType$1 as av, type PayCampaignFromWalletResult as aw, type Payment as ax, type PaymentStatus as ay, type PendingAdvertiserRow as az, type AdOwner as b, type TicketMessage as b$, type QuotationStatus as b0, REPORT_FORMATS as b1, REPORT_FREQUENCIES as b2, REPORT_RANGES as b3, REVENUE_MODELS as b4, type Refund as b5, type RefundMethod as b6, type RefundStatus as b7, type RefundTrend as b8, type ReportFilterOptions as b9, type ScreenListItem as bA, type ScreenListingDetails as bB, type ScreenLiveCampaign as bC, type ScreenLocation as bD, type ScreenOwnerDetails as bE, type ScreenPartnerDocumentType as bF, type ScreenPartnerKycStatus as bG, type ScreenPhoto as bH, type ScreenVerificationStatus as bI, type SettlementCadence as bJ, type SettlementMode as bK, type SlaConfig as bL, type StorageProvider as bM, type SyncResult as bN, TAX_LEDGER_ENTRY_TYPES as bO, TERMINAL_TICKET_STATUSES as bP, TICKET_CATEGORIES as bQ, TICKET_PRIORITIES as bR, TICKET_STATUSES as bS, TRAFFIC_TYPES as bT, type TaxLedgerEntry as bU, type TaxLedgerEntryType as bV, type TaxLedgerFilters as bW, type TaxLedgerTotals as bX, type Ticket as bY, type TicketCategory as bZ, type TicketDetail as b_, type ReportFilters as ba, type ReportFormat as bb, type ReportFrequency as bc, type ReportGranularity as bd, type ReportRange as be, type ReportSeries as bf, type ReservationAds as bg, type RevenueBreakdown as bh, type RevenueBreakdownRow as bi, type RevenueGranularity as bj, type RevenueGroupBy as bk, type RevenueSummary as bl, type RevenueTimeseries as bm, type RevenueTotals as bn, SCREEN_ORIENTATIONS as bo, SCREEN_SIZE_PRESETS as bp, SETTLEMENT_CADENCES as bq, SETTLEMENT_MODES as br, SIZE_BUCKETS as bs, SURROUNDING_VIDEO_TYPE as bt, type SavedPaymentMethod as bu, type ScheduledReport as bv, type Screen as bw, type ScreenAnalytics as bx, type ScreenCategory as by, type ScreenHealth as bz, type AdminFinance as c, type TicketPriority as c0, type TicketStatus as c1, type TimelineBar as c2, type TimelineScreen as c3, type TodayCollection as c4, type TrafficType as c5, VIDEO_PHOTO_TYPE as c6, type WalletTransactionStatus as c7, type WithdrawalRequest as c8, type WithdrawalStatus as c9, buildReportQuery as ca, footfallRange as cb, isOpen as cc, isReportQueryable as cd, monthlyPrice as ce, orientResolution as cf, orientationLabel as cg, parseResolution as ch, parseResolutionAspectRatio as ci, quotationMatchesOrder as cj, quotationNumber as ck, screenOrientationOf as cl, type AdminOverview as d, type AdminRefund as e, type AdminRevenue as f, type AdminSettlement as g, type AdminSettlementFilters as h, type AdminTaxLedger as i, type AdminWallet as j, type AdminWithdrawalRequest as k, type AdvertiserAnalytics as l, type AdvertiserBillingInfo as m, type AdvertiserDocumentType as n, type AdvertiserKycStatus as o, type AdvertiserPreviewItem as p, type AdvertiserScreenPreview as q, type WalletTransaction as r, type WalletTransactionType as s, type AssignmentTeam as t, type AudienceTag as u, type CampaignLocation as v, type CampaignProofRequest as w, type CampaignScreenStat as x, type CampaignTrend as y, type CreateOrderResult as z };
