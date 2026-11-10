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

// src/types/indianIds.ts
var D = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
  [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
  [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
  [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
  [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
  [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
  [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
  [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
  [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
];
var P = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
  [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
  [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
  [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
  [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
  [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
  [7, 0, 4, 6, 9, 1, 3, 2, 5, 8]
];
var AADHAAR_SHAPE = /^[2-9][0-9]{11}$/;
function isValidAadhaar(value) {
  if (!AADHAAR_SHAPE.test(value)) return false;
  let c = 0;
  [...value].reverse().forEach((ch, i) => {
    c = D[c][P[i % 8][Number(ch)]];
  });
  return c === 0;
}
var PAN_HOLDER_TYPES = {
  P: "Individual",
  C: "Company",
  H: "Hindu Undivided Family",
  F: "Firm / LLP",
  A: "Association of Persons",
  T: "Trust",
  B: "Body of Individuals",
  L: "Local authority",
  J: "Artificial juridical person",
  G: "Government"
};
var PAN_SHAPE = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
var isValidPan = (value) => PAN_SHAPE.test(value) && value[3] in PAN_HOLDER_TYPES;
var PAN_TYPES_BY_STRUCTURE = {
  INDIVIDUAL: ["P"],
  PROPRIETOR: ["P"],
  COMPANY: ["C", "F", "A", "B", "G", "J", "L", "T"]
};
function panFitsLegalStructure(pan, structure) {
  const allowed = structure ? PAN_TYPES_BY_STRUCTURE[structure] : void 0;
  if (!allowed || !isValidPan(pan)) return null;
  return allowed.includes(pan[3]);
}
var isCompanyPan = (pan) => isValidPan(pan) && pan[3] !== "P" && pan[3] !== "H";
var GSTIN_SHAPE = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/;
var GSTIN_CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
function gstinCheckChar(first14) {
  let sum = 0;
  [...first14].forEach((ch, i) => {
    const product = GSTIN_CHARS.indexOf(ch) * (i % 2 === 0 ? 1 : 2);
    sum += Math.floor(product / 36) + product % 36;
  });
  return GSTIN_CHARS[(36 - sum % 36) % 36];
}
var isValidGstin = (value) => GSTIN_SHAPE.test(value) && value[14] === gstinCheckChar(value.slice(0, 14));
var gstinPan = (gstin) => gstin.slice(2, 12);
var GST_STATES = {
  "01": ["Jammu and Kashmir", "J&K"],
  "02": ["Himachal Pradesh"],
  "03": ["Punjab"],
  "04": ["Chandigarh"],
  "05": ["Uttarakhand", "Uttaranchal"],
  "06": ["Haryana"],
  "07": ["Delhi", "NCT of Delhi", "New Delhi"],
  "08": ["Rajasthan"],
  "09": ["Uttar Pradesh", "UP"],
  "10": ["Bihar"],
  "11": ["Sikkim"],
  "12": ["Arunachal Pradesh"],
  "13": ["Nagaland"],
  "14": ["Manipur"],
  "15": ["Mizoram"],
  "16": ["Tripura"],
  "17": ["Meghalaya"],
  "18": ["Assam"],
  "19": ["West Bengal"],
  "20": ["Jharkhand"],
  "21": ["Odisha", "Orissa"],
  "22": ["Chhattisgarh"],
  "23": ["Madhya Pradesh", "MP"],
  "24": ["Gujarat"],
  "25": ["Daman and Diu", "Dadra and Nagar Haveli and Daman and Diu"],
  "26": ["Dadra and Nagar Haveli", "Daman and Diu", "Dadra and Nagar Haveli and Daman and Diu"],
  "27": ["Maharashtra"],
  "28": ["Andhra Pradesh"],
  "29": ["Karnataka"],
  "30": ["Goa"],
  "31": ["Lakshadweep"],
  "32": ["Kerala"],
  "33": ["Tamil Nadu"],
  "34": ["Puducherry", "Pondicherry"],
  "35": ["Andaman and Nicobar Islands", "Andaman and Nicobar"],
  "36": ["Telangana"],
  "37": ["Andhra Pradesh"],
  "38": ["Ladakh"]
};
var stateKey = (name) => String(name ?? "").toLowerCase().replace(/&/g, " and ").replace(/[^a-z]/g, "");
var CODES_BY_STATE = /* @__PURE__ */ new Map();
Object.entries(GST_STATES).forEach(([code, names]) => {
  names.forEach((name) => {
    const key = stateKey(name);
    CODES_BY_STATE.set(key, [...CODES_BY_STATE.get(key) ?? [], code]);
  });
});
function gstinMatchesState(gstin, stateName) {
  const codes = CODES_BY_STATE.get(stateKey(stateName));
  if (!codes || !GSTIN_SHAPE.test(gstin)) return null;
  return codes.includes(gstin.slice(0, 2));
}
function gstinStateName(gstin) {
  return GST_STATES[gstin.slice(0, 2)]?.[0];
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

export { AD_DURATION_MAX_SECONDS, AD_DURATION_MIN_SECONDS, ASSIGNMENT_TEAMS, COMMON_CITY_SUGGESTIONS, DISCOVERY_PHOTO_TYPES, EDITABLE_SCREEN_STATUSES, INSTALLATION_ENVIRONMENTS, INSTALLATION_PHOTO_TYPES, INTERNET_TYPES, MAX_CAMPAIGN_BANNERS, OBJECTIVES, PAN_HOLDER_TYPES, PHOTO_TYPES, PRIMARY_OBJECTIVES, REVENUE_MODELS, SCREEN_ORIENTATIONS, SCREEN_SIZE_PRESETS, SURROUNDING_VIDEO_TYPE, TARGET_AGE_MAX, TARGET_AGE_MIN, TARGET_AUDIENCE_SEGMENTS, TERMINAL_TICKET_STATUSES, TICKET_CATEGORIES, TICKET_PRIORITIES, TICKET_STATUSES, VIDEO_PHOTO_TYPE, formatDateRange, formatTargetAudience, getTodayIST, gstinMatchesState, gstinPan, gstinStateName, isCampaignEnded, isCampaignReservable, isCompanyPan, isValidAadhaar, isValidGstin, isValidPan, orientResolution, orientationLabel, panFitsLegalStructure, parseResolution, screenOrientationOf };
