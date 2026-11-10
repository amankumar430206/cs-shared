// Copied from cs-web src/lib/coupons.ts (types for cs-api's modules/coupons) — keep in sync.
// Share links take an `origin` so the caller decides which site they point at.

export type CouponDiscountType = "FIXED" | "PERCENT";
export type CouponStatus = "ACTIVE" | "INACTIVE";
export type CouponVisibility = "PUBLIC" | "PRIVATE";
export type CouponEffectiveStatus = CouponStatus | "SCHEDULED" | "EXPIRED";

export interface CouponScreen {
  id: string;
  name: string;
}

export interface Coupon {
  id: string;
  partnerId: string;
  name: string;
  code: string;
  /** PUBLIC: any advertiser may use it and it is offered to everyone booking these screens. PRIVATE: only the listed advertisers. */
  visibility: CouponVisibility;
  allowedCount: number;
  discountType: CouponDiscountType;
  discountValue: number;
  minBookingValue: number | null;
  usageLimit: number | null;
  perAdvertiserLimit: number;
  startsAt: string;
  expiresAt: string | null;
  status: CouponStatus;
  effectiveStatus: CouponEffectiveStatus;
  deactivatedReason: string | null;
  screens: CouponScreen[];
  redeemedCount: number;
  discountGiven: number;
  createdAt: string;
}

export interface CouponSummary {
  totalBookings: number;
  negotiatedValue: number;
  discountValue: number;
  castadiCommission: number;
  pendingSettlement: number;
  settledAmount: number;
}

export interface CouponRedemption {
  id: string;
  status: "RESERVED" | "REDEEMED" | "RELEASED" | "REVERSED";
  campaignId: string;
  campaignName: string | null;
  advertiserName: string | null;
  listedValue: number;
  discountValue: number;
  negotiatedValue: number;
  commission: number;
  redeemedAt: string | null;
  createdAt: string;
}

/** One entry on a private coupon's list of allowed advertisers. */
export interface AllowedAdvertiser {
  id: string;
  email: string | null;
  mobile: string | null;
  /** Set only for people the owner referred. */
  advertiserId: string | null;
  businessName: string | null;
  /** INVITED: named by email / mobile. REFERRED: joined through the owner's referral. USED: has used the coupon. */
  status: "INVITED" | "REFERRED" | "USED";
}

/** A coupon offered to the signed-in advertiser for the screens in their cart. */
export interface CouponOffer {
  code: string;
  name: string;
  ownerName: string;
  visibility: CouponVisibility;
  discountType: CouponDiscountType;
  discountValue: number;
  minBookingValue: number | null;
  expiresAt: string | null;
  screenIds: string[];
}

/** "₹50 off" / "20% off" — the discount as an owner reads it. */
export function describeDiscount(coupon: Pick<Coupon, "discountType" | "discountValue">): string {
  return coupon.discountType === "PERCENT" ? `${coupon.discountValue}% off` : `₹${coupon.discountValue.toLocaleString("en-IN")} off`;
}

/** "Public offer" or "3 advertisers" — who can use the coupon. */
export function describeAudience(coupon: Pick<Coupon, "visibility" | "allowedCount">): string {
  if (coupon.visibility === "PUBLIC") return "Public offer";
  return `${coupon.allowedCount} advertiser${coupon.allowedCount === 1 ? "" : "s"}`;
}

/** A booking link that pre-fills the code in the campaign builder. */
export function couponShareLink(code: string, origin: string): string {
  return `${origin}/campaigns/new?coupon=${encodeURIComponent(code)}`;
}

export function couponShareText(coupon: Pick<Coupon, "code" | "discountType" | "discountValue">, origin: string): string {
  return `Book my screens on CASTADI with code ${coupon.code} (${describeDiscount(coupon)}): ${couponShareLink(coupon.code, origin)}`;
}

/** The best offer by value for display: a fixed rupee amount or a percentage, whichever the screens' owner set. */
export function describeOffer(offer: Pick<CouponOffer, "discountType" | "discountValue">): string {
  return describeDiscount(offer);
}
