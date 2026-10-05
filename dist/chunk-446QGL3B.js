// src/types/date.ts
var IST_OFFSET_MS = 5.5 * 60 * 60 * 1e3;
function getTodayIST() {
  return new Date(Date.now() + IST_OFFSET_MS).toISOString().slice(0, 10);
}
function formatDateRange(startIso, endIso) {
  const start = new Date(startIso);
  const end = new Date(endIso);
  const startLabel = start.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
  const endLabel = end.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
  return startLabel === endLabel ? startLabel : `${startLabel} \u2013 ${endLabel}`;
}

// src/types/campaigns.ts
var MAX_CAMPAIGN_BANNERS = 2;
var RESERVABLE_CAMPAIGN_STATUSES = ["DRAFT", "PENDING_PAYMENT", "ACTIVE"];
function isCampaignReservable(status) {
  return RESERVABLE_CAMPAIGN_STATUSES.includes(status);
}
function isCampaignEnded(campaign) {
  if (campaign.status === "CANCELLED") return false;
  return campaign.endDate.slice(0, 10) < getTodayIST();
}
var AD_DURATION_MIN_SECONDS = 5;
var AD_DURATION_MAX_SECONDS = 120;
var PRIMARY_OBJECTIVES = [
  "BRAND_AWARENESS",
  "PRODUCT_LAUNCH",
  "OFFER_PROMOTION",
  "STORE_TRAFFIC",
  "EVENT_PROMOTION",
  "NEW_BUSINESS_LAUNCH",
  "LEAD_GENERATION",
  "OTHER"
];
var OBJECTIVES = [
  { value: "BRAND_AWARENESS", label: "Brand Awareness" },
  { value: "PRODUCT_LAUNCH", label: "Product Launch" },
  { value: "OFFER_PROMOTION", label: "Offer / Promotion" },
  { value: "STORE_TRAFFIC", label: "Store Traffic" },
  { value: "EVENT_PROMOTION", label: "Event" },
  { value: "NEW_BUSINESS_LAUNCH", label: "New Business Launch" },
  { value: "LEAD_GENERATION", label: "Lead Generation" },
  { value: "OTHER", label: "Other" },
  { value: "STORE_PROMOTION", label: "Store Promotion" },
  { value: "POLITICAL_CAMPAIGN", label: "Political Campaign" },
  { value: "PUBLIC_AWARENESS", label: "Public Awareness" },
  { value: "RECRUITMENT", label: "Recruitment" },
  { value: "GOVERNMENT_ANNOUNCEMENT", label: "Government Announcement" },
  { value: "FESTIVAL_CAMPAIGN", label: "Festival Campaign" },
  { value: "SEASONAL_PROMOTION", label: "Seasonal Promotion" }
];
var TARGET_AUDIENCE_SEGMENTS = [
  { value: "YOUNG_PROFESSIONALS", label: "Young Professionals" },
  { value: "FAMILIES", label: "Families" },
  { value: "STUDENTS", label: "Students" },
  { value: "SHOPPERS", label: "Shoppers" },
  { value: "COMMUTERS", label: "Commuters" },
  { value: "FITNESS_ENTHUSIASTS", label: "Fitness Enthusiasts" },
  { value: "TOURISTS", label: "Tourists" },
  { value: "SENIOR_CITIZENS", label: "Senior Citizens" },
  { value: "BUSINESS_TRAVELERS", label: "Business Travelers" },
  { value: "GENERAL_PUBLIC", label: "General Public" },
  { value: "OTHER", label: "Other" }
];
var TARGET_AGE_MIN = 0;
var TARGET_AGE_MAX = 100;
var COMMON_CITY_SUGGESTIONS = [
  "Mumbai",
  "Delhi",
  "Bengaluru",
  "Hyderabad",
  "Chennai",
  "Kolkata",
  "Pune",
  "Ahmedabad",
  "Jaipur",
  "Lucknow"
];
function formatTargetAudience(campaign) {
  const segmentLabels = (campaign.targetAudienceSegments ?? []).map((code) => {
    if (code === "OTHER") return campaign.targetAudienceOther?.trim() || "Other";
    return TARGET_AUDIENCE_SEGMENTS.find((s) => s.value === code)?.label ?? code;
  });
  const ageLabel = campaign.targetAgeMin != null && campaign.targetAgeMax != null ? `ages ${campaign.targetAgeMin}-${campaign.targetAgeMax}` : null;
  const parts = [...segmentLabels, ...ageLabel ? [ageLabel] : []];
  return parts.length > 0 ? parts.join(", ") : null;
}

// src/types/screens.ts
var EDITABLE_SCREEN_STATUSES = ["PENDING", "REJECTED", "ACTIVE", "UNDER_REVIEW"];
var REVENUE_MODELS = [
  { value: "EXISTING_SCREEN_OWNER", label: "Existing Screen Owner (70% you / 30% CASTADI)" },
  { value: "AUTO_CAB_DRIVER", label: "Auto & Cab Driver (80% you / 20% CASTADI)" },
  { value: "MANAGED_INVESTOR", label: "Managed / Investor (60% you / 40% CASTADI)" }
];
var INTERNET_TYPES = [
  { value: "WIFI", label: "Wi-Fi" },
  { value: "4G", label: "4G" },
  { value: "ETHERNET", label: "Ethernet" },
  { value: "MOBILE_DATA", label: "Mobile Data" }
];
var SCREEN_ORIENTATIONS = [
  { value: "LANDSCAPE", label: "Landscape" },
  { value: "PORTRAIT", label: "Portrait" }
];
function parseResolution(resolution) {
  const match = resolution?.match(/^\s*(\d+)\s*x\s*(\d+)\s*$/i);
  if (!match) return null;
  const width = Number(match[1]);
  const height = Number(match[2]);
  return width > 0 && height > 0 ? { width, height } : null;
}
function orientResolution(resolution, orientation) {
  const parsed = parseResolution(resolution);
  if (!parsed) return resolution;
  const { width, height } = parsed;
  const isPortrait = height > width;
  if (orientation === "PORTRAIT" === isPortrait || width === height) return `${width}x${height}`;
  return `${height}x${width}`;
}
function screenOrientationOf(screen) {
  if (screen.orientation) return screen.orientation;
  const parsed = parseResolution(screen.resolution);
  if (!parsed) return null;
  return parsed.height > parsed.width ? "PORTRAIT" : "LANDSCAPE";
}
function orientationLabel(screen) {
  const orientation = screenOrientationOf(screen);
  return orientation ? SCREEN_ORIENTATIONS.find((o) => o.value === orientation)?.label ?? null : null;
}
var INSTALLATION_ENVIRONMENTS = [
  { value: "INDOOR", label: "Indoor" },
  { value: "OUTDOOR", label: "Outdoor" }
];
var SCREEN_SIZE_PRESETS = [
  { value: "10-720p", label: '10" \u2014 1280x720 (HD)', screenSize: "10 inch", resolution: "1280x720" },
  { value: "15-1080p", label: '15" \u2014 1920x1080 (Full HD)', screenSize: "15 inch", resolution: "1920x1080" },
  { value: "21-1080p", label: '21" \u2014 1920x1080 (Full HD)', screenSize: "21 inch", resolution: "1920x1080" },
  { value: "32-1080p", label: '32" \u2014 1920x1080 (Full HD)', screenSize: "32 inch", resolution: "1920x1080" },
  { value: "43-4k", label: '43" \u2014 3840x2160 (4K)', screenSize: "43 inch", resolution: "3840x2160" },
  { value: "55-4k", label: '55" \u2014 3840x2160 (4K)', screenSize: "55 inch", resolution: "3840x2160" }
];
var DISCOVERY_PHOTO_TYPES = [
  { value: "FRONT_VIEW", label: "Front view" },
  { value: "SIDE_VIEW", label: "Side view" },
  { value: "SURROUNDING_AREA", label: "Surrounding area" }
];
var INSTALLATION_PHOTO_TYPES = [
  { value: "INSTALLED_VIEW", label: "Installed view" },
  { value: "DEVICE_SERIAL_PHOTO", label: "Device serial number" }
];
var PHOTO_TYPES = [...DISCOVERY_PHOTO_TYPES, ...INSTALLATION_PHOTO_TYPES];
var VIDEO_PHOTO_TYPE = "INSTALLATION_VIDEO";
var SURROUNDING_VIDEO_TYPE = "SURROUNDING_VIDEO";

// src/types/support.ts
var TICKET_CATEGORIES = [
  { value: "ACCOUNT_ISSUES", label: "Account Issues" },
  { value: "LOGIN_PROBLEMS", label: "Login Problems" },
  { value: "KYC_VERIFICATION", label: "KYC Verification" },
  { value: "CAMPAIGN_ISSUES", label: "Campaign Issues" },
  { value: "BOOKING_ISSUES", label: "Booking Issues" },
  { value: "PAYMENT_ISSUES", label: "Payment Issues" },
  { value: "REFUND_REQUESTS", label: "Refund Requests" },
  { value: "PAYOUT_ISSUES", label: "Payout Issues" },
  { value: "DEVICE_ISSUES", label: "Device Issues" },
  { value: "SCREEN_OFFLINE", label: "Screen Offline" },
  { value: "ANDROID_PLAYER_ISSUES", label: "Android Player Issues" },
  { value: "CLOUD_CMS_ISSUES", label: "Cloud CMS Issues" },
  { value: "TECHNICAL_SUPPORT", label: "Technical Support" },
  { value: "GENERAL_INQUIRY", label: "General Inquiry" },
  { value: "FEATURE_REQUEST", label: "Feature Request" },
  { value: "BUG_REPORT", label: "Bug Report" },
  { value: "OTHER", label: "Other" }
];
var TICKET_PRIORITIES = ["LOW", "MEDIUM", "HIGH", "CRITICAL"];
var TICKET_STATUSES = [
  "OPEN",
  "ASSIGNED",
  "UNDER_REVIEW",
  "WAITING_FOR_CUSTOMER",
  "IN_PROGRESS",
  "ESCALATED",
  "RESOLVED",
  "CLOSED",
  "REOPENED"
];
var ASSIGNMENT_TEAMS = ["SUPPORT", "FINANCE", "TECHNICAL", "OPERATIONS", "ENGINEERING", "MANAGEMENT"];
var TERMINAL_TICKET_STATUSES = ["RESOLVED", "CLOSED"];

export { AD_DURATION_MAX_SECONDS, AD_DURATION_MIN_SECONDS, ASSIGNMENT_TEAMS, COMMON_CITY_SUGGESTIONS, DISCOVERY_PHOTO_TYPES, EDITABLE_SCREEN_STATUSES, INSTALLATION_ENVIRONMENTS, INSTALLATION_PHOTO_TYPES, INTERNET_TYPES, MAX_CAMPAIGN_BANNERS, OBJECTIVES, PHOTO_TYPES, PRIMARY_OBJECTIVES, REVENUE_MODELS, SCREEN_ORIENTATIONS, SCREEN_SIZE_PRESETS, SURROUNDING_VIDEO_TYPE, TARGET_AGE_MAX, TARGET_AGE_MIN, TARGET_AUDIENCE_SEGMENTS, TERMINAL_TICKET_STATUSES, TICKET_CATEGORIES, TICKET_PRIORITIES, TICKET_STATUSES, VIDEO_PHOTO_TYPE, formatDateRange, formatTargetAudience, getTodayIST, isCampaignEnded, isCampaignReservable, orientResolution, orientationLabel, parseResolution, screenOrientationOf };
