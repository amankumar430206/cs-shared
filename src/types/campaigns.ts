// Types mirroring cs-api's modules/campaigns responses.
import { getTodayIST } from "./date";
import type { FrequencyLevel } from "./checkout";

export type CampaignStatus = "DRAFT" | "PENDING_PAYMENT" | "CONFIRMED" | "ACTIVE" | "CANCELLED" | "COMPLETED" | "PAUSED";

/**
 * What advertisers see — derived server-side from the stored status plus the
 * ad's review state and the screen bookings (cs-api's campaignStage.js).
 * Labels/descriptions live in i18n/messages under `campaignStatus`.
 */
export type CampaignDisplayStatus =
  | "DRAFT"
  | "PAYMENT_PENDING"
  | "PAYMENT_RECEIVED"
  | "UNDER_REVIEW"
  | "APPROVED"
  | "SCHEDULED"
  | "LIVE"
  | "PAUSED"
  | "COMPLETED"
  | "REJECTED"
  | "CANCELLED";


export interface Campaign {
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
  /** The oldest-uploaded banner's signed URL, for a list row's thumbnail — null if none uploaded yet. Present on every list/detail response. */
  thumbnailUrl: string | null;
  /** Every banner, in upload order — only present on a single-campaign detail fetch, not the list views (which only need the thumbnail). */
  banners?: CampaignBanner[];
}

export interface CampaignBanner {
  id: string;
  downloadUrl: string;
}

// Mirrors cs-api's campaigns.validators.js MAX_BANNERS_PER_CAMPAIGN.
export const MAX_CAMPAIGN_BANNERS = 2;

// Mirrors cs-api's bookings.service.js RESERVABLE_CAMPAIGN_STATUSES — ACTIVE
// is included: an advertiser can keep reserving screens on an already-live
// campaign, each new batch going through its own fresh payment round (see
// campaigns/[id]/page.tsx's hasPendingAmount). CONFIRMED (payment in
// flight) and CANCELLED stay locked. Reused everywhere the "Reserve (more)
// screens"/"Request again"/"Disassociate" CTAs are gated, so this one list
// can't drift out of sync with what the API actually accepts. NOT reused
// for creative-upload eligibility — that's a separate, narrower backend
// rule (CREATIVE_ELIGIBLE_STATUSES) that stays DRAFT/PENDING_PAYMENT-only.
const RESERVABLE_CAMPAIGN_STATUSES: CampaignStatus[] = ["DRAFT", "PENDING_PAYMENT", "ACTIVE"];
export function isCampaignReservable(status: CampaignStatus): boolean {
  return RESERVABLE_CAMPAIGN_STATUSES.includes(status);
}

// Derived, not a real backend status — cs-api never transitions a campaign
// to some "ENDED" state on its own once endDate passes, it just sits at
// whatever status it was last in (CONFIRMED/ACTIVE, usually). CANCELLED is
// its own terminal state with its own handling (CampaignLiveToggle's
// "Inactive"), so it's excluded here rather than also reading as "ended."
export function isCampaignEnded(campaign: Pick<Campaign, "endDate" | "status">): boolean {
  if (campaign.status === "CANCELLED") return false;
  return campaign.endDate.slice(0, 10) < getTodayIST();
}

// Mirrors cs-api's campaigns.validators.js AD_DURATION_MIN_SECONDS/MAX_SECONDS.
export const AD_DURATION_MIN_SECONDS = 5;
export const AD_DURATION_MAX_SECONDS = 120;

// Mirrors cs-api/src/modules/campaigns/campaigns.validators.js OBJECTIVES —
// keep in sync if that list changes.
// Mirrors cs-api's campaigns.validators.js PRIMARY_OBJECTIVES — the short,
// plain list the campaign builder offers. Translated labels live under
// `objective.<VALUE>` in i18n/messages.
export const PRIMARY_OBJECTIVES = [
  "BRAND_AWARENESS",
  "PRODUCT_LAUNCH",
  "OFFER_PROMOTION",
  "STORE_TRAFFIC",
  "EVENT_PROMOTION",
  "NEW_BUSINESS_LAUNCH",
  "LEAD_GENERATION",
  "OTHER",
] as const;

// Every objective cs-api still accepts (older campaigns may carry one of the
// retired values), for display only.
export const OBJECTIVES = [
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
  { value: "SEASONAL_PROMOTION", label: "Seasonal Promotion" },
] as const;

// Mirrors cs-api/src/modules/campaigns/campaigns.validators.js
// TARGET_AUDIENCE_SEGMENTS — keep in sync if that list changes. "OTHER" is a
// real, selectable entry (not a UI-only affordance) — the form shows a text
// input for targetAudienceOther exactly when it's toggled on.
export const TARGET_AUDIENCE_SEGMENTS = [
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
  { value: "OTHER", label: "Other" },
] as const;

export const TARGET_AGE_MIN = 0;
export const TARGET_AGE_MAX = 100;

// Quick-add suggestions for the preferred-cities pill input — not a fixed
// enum (preferredCities accepts any city name, cs-api's
// createCampaignSchema just caps length/count), so this is only ever a
// starting point the advertiser can click, never a constraint.
export const COMMON_CITY_SUGGESTIONS = [
  "Mumbai",
  "Delhi",
  "Bengaluru",
  "Hyderabad",
  "Chennai",
  "Kolkata",
  "Pune",
  "Ahmedabad",
  "Jaipur",
  "Lucknow",
];

// A single readable line from the structured targeting fields — e.g.
// "Families, Fitness Enthusiasts, ages 25-40" — for the one-line summary
// spots (CampaignTabs' overview MetaFact) that used to just print the old
// free-text targetAudience column verbatim. Segment codes not in the known
// list (never expected, but a stale client or direct API write could send
// one) fall back to the raw code rather than being silently dropped.
export function formatTargetAudience(
  campaign: Pick<Campaign, "targetAudienceSegments" | "targetAudienceOther" | "targetAgeMin" | "targetAgeMax">
): string | null {
  const segmentLabels = (campaign.targetAudienceSegments ?? []).map((code) => {
    if (code === "OTHER") return campaign.targetAudienceOther?.trim() || "Other";
    return TARGET_AUDIENCE_SEGMENTS.find((s) => s.value === code)?.label ?? code;
  });
  const ageLabel =
    campaign.targetAgeMin != null && campaign.targetAgeMax != null
      ? `ages ${campaign.targetAgeMin}-${campaign.targetAgeMax}`
      : null;
  const parts = [...segmentLabels, ...(ageLabel ? [ageLabel] : [])];
  return parts.length > 0 ? parts.join(", ") : null;
}
