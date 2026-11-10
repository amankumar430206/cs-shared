// Copied from cs-web src/lib/referrals.ts (cs-api modules/referrals) — keep in sync.
// The "remember a code until it can be used" storage is platform-specific, so it lives in each app.

export interface ReferralCheck {
  valid: boolean;
  /** The owner's first name only. */
  ownerName?: string;
}

export interface MyReferral {
  code: string;
  advertisers: number;
  screenOwners: number;
}

export interface ReferredPerson {
  id: string;
  role: "ADVERTISER" | "SCREEN_PARTNER";
  name: string;
  businessName: string | null;
  city: string | null;
  /** Masked: a***@example.com */
  email: string | null;
  /** Masked: ******3210 */
  mobile: string | null;
  /** Present for advertisers — what a private coupon uses to name them. */
  advertiserId: string | null;
  accountStatus: "ACTIVE" | "PENDING";
  source: "SIGNUP" | "LATER";
  joinedAt: string;
}

export interface MyReferrer {
  referredBy: { ownerName: string; since: string; source: "SIGNUP" | "LATER" } | null;
}

/** The link an owner shares: opens the registration form with the code filled in. */
export function referralLink(code: string, origin: string): string {
  return `${origin}/register?ref=${encodeURIComponent(code)}`;
}

export function referralShareText(code: string, origin: string): string {
  return `Join me on CASTADI to book digital screens. Sign up with my referral code ${code}: ${referralLink(code, origin)}`;
}

/** A referral code is 8 characters; anything shorter is not worth a server check. */
export const REFERRAL_CODE_MIN_LENGTH = 4;
