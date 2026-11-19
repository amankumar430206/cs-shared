export { DEFAULT_REPORT_FILTERS, REFERRAL_CODE_MIN_LENGTH, REPORT_RANGES, buildReportQuery, isReportQueryable, referralLink, referralShareText } from '../chunk-GDXKPKMS.js';
import { apiFetchRaw, getAccessToken } from '../chunk-V2V5PEJF.js';
import { parseResolution, getTodayIST } from '../chunk-22XQ7W3A.js';
export { AD_DURATION_MAX_SECONDS, AD_DURATION_MIN_SECONDS, ASSIGNMENT_TEAMS, COMMON_CITY_SUGGESTIONS, DISCOVERY_PHOTO_TYPES, EDITABLE_SCREEN_STATUSES, INSTALLATION_ENVIRONMENTS, INSTALLATION_PHOTO_TYPES, INTERNET_TYPES, MAX_CAMPAIGN_BANNERS, OBJECTIVES, PAN_HOLDER_TYPES, PHOTO_TYPES, PRIMARY_OBJECTIVES, REVENUE_MODELS, SCREEN_ORIENTATIONS, SCREEN_SIZE_PRESETS, SURROUNDING_VIDEO_TYPE, TARGET_AGE_MAX, TARGET_AGE_MIN, TARGET_AUDIENCE_SEGMENTS, TERMINAL_TICKET_STATUSES, TICKET_CATEGORIES, TICKET_PRIORITIES, TICKET_STATUSES, VIDEO_PHOTO_TYPE, formatDateRange, formatTargetAudience, getTodayIST, gstinMatchesState, gstinPan, gstinStateName, isCampaignEnded, isCampaignReservable, isCompanyPan, isValidAadhaar, isValidGstin, isValidPan, orientResolution, orientationLabel, panFitsLegalStructure, parseResolution, screenOrientationOf } from '../chunk-22XQ7W3A.js';
export { PARTNER_TYPES, PARTNER_TYPE_OTHER, PARTNER_TYPE_OTHER_MAX, formatPartnerTypes, partnerTypeLabel, partnerTypeValues } from '../chunk-HK7CF55G.js';

// src/types/orientation.ts
var SQUARE_TOLERANCE = 0.05;
function getMediaShape({ width, height }) {
  const ratio = width / height;
  if (Math.abs(ratio - 1) <= SQUARE_TOLERANCE) return "SQUARE";
  return ratio > 1 ? "LANDSCAPE" : "PORTRAIT";
}
function screenDimensions(screen) {
  if (screen.resolutionWidth && screen.resolutionHeight) {
    return { width: screen.resolutionWidth, height: screen.resolutionHeight };
  }
  const parsed = parseResolution(screen.resolution);
  if (!parsed) return null;
  if (screen.orientation && getMediaShape(parsed) !== "SQUARE" && getMediaShape(parsed) !== screen.orientation) {
    return { width: parsed.height, height: parsed.width };
  }
  return parsed;
}
function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}
var KNOWN_RATIOS = [
  [16, 9],
  [9, 16],
  [4, 3],
  [3, 4],
  [21, 9],
  [1, 1],
  [4, 5],
  [5, 4],
  [3, 2],
  [2, 3]
];
function aspectLabel({ width, height }) {
  const ratio = width / height;
  for (const [w2, h2] of KNOWN_RATIOS) {
    if (Math.abs(ratio - w2 / h2) / (w2 / h2) < 0.02) return `${w2}:${h2}`;
  }
  const divisor = gcd(width, height);
  const w = width / divisor;
  const h = height / divisor;
  if (w <= 32 && h <= 32) return `${w}:${h}`;
  return ratio >= 1 ? `${ratio.toFixed(2)}:1` : `1:${(1 / ratio).toFixed(2)}`;
}
function shapeLabel(shape) {
  return shape === "LANDSCAPE" ? "Landscape" : shape === "PORTRAIT" ? "Portrait" : "Square";
}
function computeFit(media, screen) {
  const mediaRatio = media.width / media.height;
  const screenRatio = screen.width / screen.height;
  const usedArea = mediaRatio > screenRatio ? screenRatio / mediaRatio : mediaRatio / screenRatio;
  const fillsScreen = usedArea >= 0.98;
  const mediaShape = getMediaShape(media);
  const screenShape = getMediaShape(screen);
  return {
    fillsScreen,
    orientationMismatch: mediaShape !== "SQUARE" && screenShape !== "SQUARE" && mediaShape !== screenShape,
    usedAreaPct: Math.round(usedArea * 100),
    bars: fillsScreen ? null : mediaRatio > screenRatio ? "top-bottom" : "sides"
  };
}

// src/types/adChecks.ts
var AD_FORMATS = ["JPG", "PNG", "GIF", "MP4", "MOV"];
var AD_MAX_FILE_MB = 50;
var AD_MAX_VIDEO_SECONDS = 120;
var MIN_SHORT_EDGE_PX = 720;
var formatOf = (contentType) => ({ "image/jpeg": "JPG", "image/png": "PNG", "image/gif": "GIF", "video/mp4": "MP4", "video/quicktime": "MOV" })[contentType] ?? contentType;
function isVideo(contentType) {
  return contentType.startsWith("video/");
}
function adChecks(ad) {
  const checks = [
    { key: "format", state: "ok", values: { format: formatOf(ad.contentType) } },
    { key: "size", state: ad.fileSize <= AD_MAX_FILE_MB * 1024 * 1024 ? "ok" : "warn", values: { mb: Math.max(0.1, Math.round(ad.fileSize / 1024 / 1024 * 10) / 10) } }
  ];
  if (ad.width && ad.height) {
    const shortEdge = Math.min(ad.width, ad.height);
    checks.push({ key: "resolution", state: shortEdge >= MIN_SHORT_EDGE_PX ? "ok" : "warn", values: { width: ad.width, height: ad.height } });
    checks.push({ key: "orientation", state: "ok", values: { shape: getMediaShape({ width: ad.width, height: ad.height }) } });
  }
  if (isVideo(ad.contentType) && ad.durationSeconds) {
    checks.push({ key: "length", state: ad.durationSeconds <= AD_MAX_VIDEO_SECONDS ? "ok" : "warn", values: { seconds: ad.durationSeconds } });
  }
  return checks;
}
function compatibilityOf(ad, screen) {
  const screenDims = screenDimensions(screen);
  if (!ad || !screenDims) return "unknown";
  const fit = computeFit(ad, screenDims);
  if (fit.orientationMismatch) return "rotated";
  return fit.fillsScreen ? "fits" : "bars";
}
function shapeKey(shape) {
  return shape.toLowerCase();
}

// src/types/analytics.ts
var TAX_LEDGER_ENTRY_TYPES = ["OUTPUT_GST", "TDS_194O", "GST_TCS"];

// src/types/bookings.ts
function formatShortDate(iso) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}
function formatDateRange2(startDate, endDate) {
  const start = startDate.slice(0, 10);
  const end = endDate.slice(0, 10);
  return start === end ? formatShortDate(startDate) : `${formatShortDate(startDate)} \u2013 ${formatShortDate(endDate)}`;
}
function liveWindowStatus(booking, campaignStatus) {
  if (booking.status !== "CONFIRMED") return null;
  const today = getTodayIST();
  const start = booking.startDate.slice(0, 10);
  const end = booking.endDate.slice(0, 10);
  if (today < start) return "upcoming";
  if (today > end) return "ended";
  return campaignStatus === "ACTIVE" ? "live" : "upcoming";
}

// src/types/checkout.ts
var MAX_CUSTOM_SHARES = 4;

// src/types/delivery.ts
function effectiveShares(shares, maxAdCapacity) {
  const capacity = Math.max(1, Number(maxAdCapacity) || 1);
  return Math.min(capacity, Math.max(1, Math.round(shares) || 1));
}
function toSeconds(hhmm) {
  const [h, m = "0"] = String(hhmm ?? "00:00").split(":");
  return Number(h) * 3600 + Number(m) * 60;
}
function operatingSecondsPerDay(start, end) {
  const s = toSeconds(start);
  const e = toSeconds(end);
  if (e === s) return 24 * 3600;
  return e > s ? e - s : 24 * 3600 - s + e;
}
function minPlaysPerDay(screen, adDurationSeconds, shares) {
  const capacity = Math.max(1, Number(screen.maxAdCapacity) || 1);
  const duration = Math.max(1, adDurationSeconds || 1);
  const operating = operatingSecondsPerDay(screen.operatingHoursStart, screen.operatingHoursEnd);
  return Math.floor(operating / (capacity * duration) * effectiveShares(shares, capacity));
}
function totalMinPlaysPerDay(screens, adDurationSeconds, shares) {
  return screens.reduce((sum, s) => sum + minPlaysPerDay(s, adDurationSeconds, shares), 0);
}

// src/types/devices.ts
function parseResolutionAspectRatio(resolution) {
  const match = resolution?.match(/^(\d+)\s*x\s*(\d+)$/i);
  if (!match) return null;
  const width = Number(match[1]);
  const height = Number(match[2]);
  return width > 0 && height > 0 ? width / height : null;
}

// src/types/format.ts
function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

// src/types/geo.ts
async function geoGet(path) {
  const res = await apiFetchRaw(`/geo${path}`, getAccessToken());
  if (!res.ok) throw new Error(`geo ${path} \u2192 ${res.status}`);
  const body = await res.json();
  return body.data;
}
async function resolvePincode(pincode) {
  const res = await apiFetchRaw(`/geo/pincode/${pincode}`, getAccessToken());
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`geo pincode lookup failed (${res.status})`);
  const body = await res.json();
  return body.data;
}
var listStates = () => geoGet("/states");
var listCities = (state) => geoGet(`/states/${encodeURIComponent(state)}/cities`);

// src/types/imageVariants.ts
var thumbSrc = (item) => item.thumbUrl ?? item.downloadUrl;
var previewSrc = (item) => item.previewUrl ?? item.downloadUrl;

// src/types/knowledgeBase.ts
var KB_CATEGORIES = [
  { value: "ACCOUNT_SETUP", label: "Account Setup" },
  { value: "CAMPAIGN_MANAGEMENT", label: "Campaign Management" },
  { value: "SCREEN_REGISTRATION", label: "Screen Registration" },
  { value: "ANDROID_PLAYER", label: "Android Player" },
  { value: "PAYMENTS", label: "Payments" },
  { value: "PAYOUTS", label: "Payouts" },
  { value: "KYC", label: "KYC" },
  { value: "TROUBLESHOOTING", label: "Troubleshooting" },
  { value: "FAQ", label: "FAQ" }
];

// src/types/kyc.ts
function bankStatusOf(partner) {
  if (!partner?.bank_account_number || !partner.bank_ifsc || !partner.bank_account_name) return "MISSING";
  if (partner.bank_verified_at) return "VERIFIED";
  return partner.bank_rejection_reason ? "REJECTED" : "PENDING";
}

// src/types/kycIdentity.ts
var MIN_IDENTITY_PROOFS = 2;
var IDENTITY_PROOFS = [
  { key: "AADHAAR", label: "Aadhaar", numberField: "aadhaarNumber", documentType: "AADHAAR_CARD" },
  { key: "PAN", label: "PAN", numberField: "panNumber", documentType: "PAN_CARD" },
  { key: "DRIVING_LICENSE", label: "Driving Licence", numberField: "drivingLicenseNumber", documentType: "DRIVING_LICENSE" }
];
function evaluateIdentityProofs(values, documents) {
  const usable = new Set(documents.filter((d) => d.reviewStatus !== "REJECTED").map((d) => d.documentType));
  const provided = [];
  const missing = [];
  for (const proof of IDENTITY_PROOFS) {
    if (values[proof.numberField]?.trim() || usable.has(proof.documentType)) provided.push(proof.key);
    else missing.push(proof.key);
  }
  return {
    provided,
    missing,
    needed: Math.max(0, MIN_IDENTITY_PROOFS - provided.length),
    satisfied: provided.length >= MIN_IDENTITY_PROOFS
  };
}

// src/types/money.ts
function formatRupees(amount, { decimals = false } = {}) {
  return `\u20B9${amount.toLocaleString("en-IN", { minimumFractionDigits: decimals ? 2 : 0, maximumFractionDigits: decimals ? 2 : 0 })}`;
}
function formatCompactIndian(value) {
  const abs = Math.abs(value);
  const trim = (n) => (Math.round(n * 10) / 10).toLocaleString("en-IN", { maximumFractionDigits: 1 });
  if (abs >= 1e7) return `${trim(value / 1e7)}Cr`;
  if (abs >= 1e5) return `${trim(value / 1e5)}L`;
  if (abs >= 1e3) return `${trim(value / 1e3)}K`;
  return Math.round(value).toLocaleString("en-IN");
}

// src/types/payments.ts
var SETTLEMENT_MODES = [
  { value: "CASH", label: "Cash" },
  { value: "BANK_TRANSFER", label: "Bank transfer" },
  { value: "INTERNAL_SETTLEMENT", label: "Internal settlement" },
  { value: "OTHER", label: "Other" }
];

// src/types/proofRequests.ts
var isOpen = (status) => status === "PENDING" || status === "OVERDUE";

// src/types/quotations.ts
var OPEN_QUOTATION_STATUSES = ["SUBMITTED", "COUNTERED", "APPROVED", "REJECTED", "PAYMENT_SUBMITTED"];
function quotationMatchesOrder(q, order) {
  const wanted = [...order.screenIds].sort();
  const quoted = q.orderSnapshot.screenIds;
  return quoted.length === wanted.length && quoted.every((id, i) => id === wanted[i]) && q.orderSnapshot.startDate === order.startDate.slice(0, 10) && q.orderSnapshot.endDate === order.endDate.slice(0, 10);
}
var quotationNumber = (q) => `QT-${q.campaignCode ?? q.id.slice(0, 8).toUpperCase()}-R${q.revision}`;

// src/types/revenue.ts
var SETTLEMENT_CADENCES = [
  {
    value: "MONTHLY",
    label: "Monthly",
    // The fee percentages themselves are admin-configurable (fee_configs), so
    // these describe the tradeoff without hardcoding numbers that could drift.
    hint: "Paid out once at month end. Lower settlement fee."
  },
  {
    value: "DAILY",
    label: "Daily",
    hint: "Credited to your wallet every day. Higher settlement fee."
  }
];
var REPORT_FREQUENCIES = [
  { value: "DAILY", label: "Daily" },
  { value: "WEEKLY", label: "Weekly" },
  { value: "MONTHLY", label: "Monthly" }
];
var REPORT_FORMATS = [
  { value: "csv", label: "CSV" },
  { value: "xlsx", label: "Excel" }
];

// src/types/screenListing.ts
var LOCATION_CATEGORIES = [
  "PREMIUM_COMMERCIAL",
  "HIGH_STREET",
  "BUSINESS_DISTRICT",
  "RESIDENTIAL",
  "TRANSIT",
  "RETAIL",
  "TOURIST",
  "INSTITUTIONAL"
];
var AUDIENCE_TAGS = ["STUDENTS", "PROFESSIONALS", "FAMILIES", "SHOPPERS", "COMMUTERS", "TOURISTS"];
var TRAFFIC_TYPES = ["PEDESTRIAN", "VEHICLE", "BOTH"];
var DISPLAY_TYPES = ["LCD", "LED", "DIGITAL_BILLBOARD"];
var FACINGS = ["ROAD_FACING", "INDOOR_FACING"];
var SIZE_BUCKETS = ["10-20", "21-32", "33-55", "55+"];
function footfallRange(footfall) {
  if (!footfall) return null;
  const round = (n) => n >= 1e4 ? Math.round(n / 5e3) * 5e3 : n >= 1e3 ? Math.round(n / 500) * 500 : Math.round(n / 50) * 50;
  const low = round(footfall * 0.85);
  const high = round(footfall * 1.15);
  return low === high ? low.toLocaleString("en-IN") : `${low.toLocaleString("en-IN")}\u2013${high.toLocaleString("en-IN")}`;
}
var monthlyPrice = (pricePerDay) => Math.round(pricePerDay * 30);

// src/types/trend.ts
function computePeriodDelta(values) {
  if (values.length < 14) return null;
  const last7 = values.slice(-7).reduce((a, b) => a + b, 0);
  const prev7 = values.slice(-14, -7).reduce((a, b) => a + b, 0);
  if (prev7 === 0) return last7 > 0 ? 100 : 0;
  return Math.round((last7 - prev7) / prev7 * 100);
}

// src/types/coupons.ts
function describeDiscount(coupon) {
  return coupon.discountType === "PERCENT" ? `${coupon.discountValue}% off` : `\u20B9${coupon.discountValue.toLocaleString("en-IN")} off`;
}
function describeAudience(coupon) {
  if (coupon.visibility === "PUBLIC") return "Public offer";
  return `${coupon.allowedCount} advertiser${coupon.allowedCount === 1 ? "" : "s"}`;
}
function couponShareLink(code, origin) {
  return `${origin}/campaigns/new?coupon=${encodeURIComponent(code)}`;
}
function couponShareText(coupon, origin) {
  return `Book my screens on CASTADI with code ${coupon.code} (${describeDiscount(coupon)}): ${couponShareLink(coupon.code, origin)}`;
}
function describeOffer(offer) {
  return describeDiscount(offer);
}

// src/types/featureFlags.ts
var COUPONS_FLAG = "coupons.module";
function isFlagEnabled(flags, key) {
  if (Array.isArray(key)) return key.some((k) => isFlagEnabled(flags, k));
  return flags?.find((flag) => flag.key === key)?.enabled ?? true;
}
function isFlagOn(flags, key) {
  return flags?.find((flag) => flag.key === key)?.enabled === true;
}

// src/types/kycDraft.ts
var ADVERTISER_DRAFT_FIELDS = [
  { key: "businessAddress", label: "Business address", required: true },
  { key: "businessCategory", label: "Business category", required: true },
  { key: "billingState", label: "Billing state", required: true },
  { key: "billingPincode", label: "Billing PIN code", required: true },
  { key: "gstNumber", label: "GST number" },
  { key: "panNumber", label: "PAN number" },
  { key: "cin", label: "CIN" },
  { key: "wantsGstInvoice", label: "Wants a GST invoice" },
  { key: "brandName", label: "Brand name" },
  { key: "brandWebsite", label: "Brand website" },
  { key: "socialMediaLinks", label: "Social media links" }
];
var SCREEN_PARTNER_DRAFT_FIELDS = [
  { key: "aadhaarNumber", label: "Aadhaar number", required: true },
  { key: "panNumber", label: "PAN number", required: true },
  { key: "businessName", label: "Business name" },
  { key: "legalStructure", label: "Legal structure" },
  { key: "gstNumber", label: "GST number" },
  { key: "udyamNumber", label: "UDYAM number" },
  { key: "cin", label: "CIN" },
  { key: "bankAccountNumber", label: "Bank account number", required: true },
  { key: "bankIfsc", label: "Bank IFSC code", required: true },
  { key: "bankAccountName", label: "Account holder name", required: true },
  { key: "upiId", label: "UPI ID" }
];
var advertiserDraftKeys = ADVERTISER_DRAFT_FIELDS.map((f) => f.key);
var screenPartnerDraftKeys = SCREEN_PARTNER_DRAFT_FIELDS.map((f) => f.key);
function pickDraftValues(values, keys) {
  const picked = {};
  for (const key of keys) {
    const value = values[key];
    if (typeof value === "string" || typeof value === "boolean") picked[key] = value;
  }
  return picked;
}
var draftSignature = (values, step) => JSON.stringify([step, values]);
var hasValue = (value) => typeof value === "string" ? value.trim() !== "" : value === true;

// src/types/identityMatch.ts
var HONORIFICS = /* @__PURE__ */ new Set(["mr", "mrs", "ms", "miss", "shri", "shree", "sri", "smt", "kumari", "dr", "prof", "late"]);
var FILLER = /* @__PURE__ */ new Set(["and", "the", "pvt", "private", "ltd", "limited", "llp", "co", "company", "ms"]);
function nameTokens(name) {
  return String(name ?? "").normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter((t) => t && !HONORIFICS.has(t) && !FILLER.has(t));
}
function jaroWinkler(a, b) {
  if (a === b) return 1;
  if (!a.length || !b.length) return 0;
  const range = Math.max(0, Math.floor(Math.max(a.length, b.length) / 2) - 1);
  const aMatched = new Array(a.length).fill(false);
  const bMatched = new Array(b.length).fill(false);
  let matches = 0;
  for (let i = 0; i < a.length; i += 1) {
    const from = Math.max(0, i - range);
    const to = Math.min(i + range + 1, b.length);
    for (let j = from; j < to; j += 1) {
      if (!bMatched[j] && a[i] === b[j]) {
        aMatched[i] = true;
        bMatched[j] = true;
        matches += 1;
        break;
      }
    }
  }
  if (!matches) return 0;
  let transpositions = 0;
  let k = 0;
  for (let i = 0; i < a.length; i += 1) {
    if (aMatched[i]) {
      while (!bMatched[k]) k += 1;
      if (a[i] !== b[k]) transpositions += 1;
      k += 1;
    }
  }
  const jaro = (matches / a.length + matches / b.length + (matches - transpositions / 2) / matches) / 3;
  let prefix = 0;
  while (prefix < 4 && a[prefix] === b[prefix]) prefix += 1;
  return jaro + prefix * 0.1 * (1 - jaro);
}
var tokenScore = (a, b) => a.length === 1 || b.length === 1 ? a[0] === b[0] ? 0.9 : 0 : jaroWinkler(a, b);
function compareNames(first, second) {
  const a = nameTokens(first);
  const b = nameTokens(second);
  if (!a.length || !b.length) return { status: "UNKNOWN", score: 0 };
  const [short, long] = a.length <= b.length ? [a, b] : [b, a];
  const used = /* @__PURE__ */ new Set();
  let sum = 0;
  let weakest = 1;
  short.forEach((token) => {
    let best = 0;
    let bestIndex = -1;
    long.forEach((other, i) => {
      if (used.has(i)) return;
      const s = tokenScore(token, other);
      if (s > best) {
        best = s;
        bestIndex = i;
      }
    });
    if (bestIndex >= 0) used.add(bestIndex);
    sum += best;
    weakest = Math.min(weakest, best);
  });
  const score = Math.round(sum / short.length * 100) / 100;
  let status = "MISMATCH";
  if (score >= 0.9 && weakest >= 0.85) status = "MATCH";
  else if (score >= 0.75) status = "REVIEW";
  if (status === "MATCH" && short.length === 1 && long.length > 1) status = "REVIEW";
  return { status, score };
}
var RANK = { MATCH: 3, REVIEW: 2, MISMATCH: 1, UNKNOWN: 0 };
function bestNameMatch(name, candidates) {
  let best = { status: "UNKNOWN", score: 0, against: null };
  candidates.forEach((candidate) => {
    if (!candidate) return;
    const result = compareNames(name, candidate);
    if (RANK[result.status] > RANK[best.status] || result.status === best.status && result.score > best.score) {
      best = { ...result, against: candidate };
    }
  });
  return best;
}

export { ADVERTISER_DRAFT_FIELDS, AD_FORMATS, AD_MAX_FILE_MB, AD_MAX_VIDEO_SECONDS, AUDIENCE_TAGS, COUPONS_FLAG, DISPLAY_TYPES, FACINGS, IDENTITY_PROOFS, KB_CATEGORIES, LOCATION_CATEGORIES, MAX_CUSTOM_SHARES, MIN_IDENTITY_PROOFS, OPEN_QUOTATION_STATUSES, REPORT_FORMATS, REPORT_FREQUENCIES, SCREEN_PARTNER_DRAFT_FIELDS, SETTLEMENT_CADENCES, SETTLEMENT_MODES, SIZE_BUCKETS, TAX_LEDGER_ENTRY_TYPES, TRAFFIC_TYPES, adChecks, advertiserDraftKeys, aspectLabel, bankStatusOf, bestNameMatch, compareNames, compatibilityOf, computeFit, computePeriodDelta, couponShareLink, couponShareText, describeAudience, describeDiscount, describeOffer, draftSignature, effectiveShares, evaluateIdentityProofs, footfallRange, formatDateRange2 as formatBookingDateRange, formatCompactIndian, formatFileSize, formatRupees, formatShortDate, getMediaShape, hasValue, isFlagEnabled, isFlagOn, isOpen, isVideo, listCities, listStates, liveWindowStatus, minPlaysPerDay, monthlyPrice, operatingSecondsPerDay, parseResolutionAspectRatio, pickDraftValues, previewSrc, quotationMatchesOrder, quotationNumber, resolvePincode, screenDimensions, screenPartnerDraftKeys, shapeKey, shapeLabel, thumbSrc, totalMinPlaysPerDay };
