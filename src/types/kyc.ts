// Types mirroring cs-api's modules/kyc responses.
import type { KycDraft } from "./kycDraft";

export type { KycDraft };

/** GET /kyc/ifsc/:code — informational only; submit never depends on it. */
export interface IfscLookup {
  ifsc: string;
  status: "FOUND" | "NOT_FOUND" | "UNAVAILABLE";
  bank?: string;
  branch?: string;
  city?: string;
  state?: string;
}

export interface AdvertiserKycStatus {
  /** Saved/pre-filled form values; only while the form is open (PENDING / REJECTED). */
  draft?: KycDraft | null;
  verificationStatus: "PENDING" | "UNDER_REVIEW" | "APPROVED" | "REJECTED";
  rejectionReason: string | null;
  submittedAt: string | null;
  reviewedAt: string | null;
}

/**
 * Partner bank KYC. MISSING = nothing on file, PENDING = awaiting an admin, REJECTED = sent back (see
 * rejectionReason), VERIFIED = payouts allowed. Money cannot leave a wallet unless VERIFIED; the portal itself
 * is usable in every state. Editing the details moves a VERIFIED bank back to PENDING.
 */
export type BankVerificationState = "MISSING" | "PENDING" | "REJECTED" | "VERIFIED";

export interface BankStatus {
  status: BankVerificationState;
  verifiedAt: string | null;
  rejectionReason: string | null;
}

/** Same rule as cs-api's bankVerification.js, from the /auth/me screenPartner row. */
export function bankStatusOf(
  partner?: {
    bank_account_number: string | null;
    bank_ifsc: string | null;
    bank_account_name: string | null;
    bank_verified_at?: string | null;
    bank_rejection_reason?: string | null;
  } | null
): BankVerificationState {
  if (!partner?.bank_account_number || !partner.bank_ifsc || !partner.bank_account_name) return "MISSING";
  if (partner.bank_verified_at) return "VERIFIED";
  return partner.bank_rejection_reason ? "REJECTED" : "PENDING";
}

export interface ScreenPartnerKycStatus {
  draft?: KycDraft | null;
  kycStatus: "PENDING" | "UNDER_REVIEW" | "APPROVED" | "REJECTED";
  rejectionReason: string | null;
  submittedAt: string | null;
  reviewedAt: string | null;
  bankStatus: BankStatus;
}

export interface PendingAdvertiserRow {
  id: string;
  user_id: string;
  business_name: string;
  gst_number: string | null;
  pan_number: string | null;
  address: string | null;
  verification_submitted_at: string;
  // Onboarding-gap field ("Business Category"). `business_type` is a
  // separate, unrelated registration-time personalization field (see
  // auth.repository.js) — the two used to collide on one column before
  // 20260101000025 gave this one its own.
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

export interface PendingScreenPartnerRow {
  id: string;
  user_id: string;
  partner_type: string;
  aadhaar_number: string | null;
  pan_number: string | null;
  bank_account_name: string | null;
  kyc_submitted_at: string;
  // Onboarding-gap fields.
  business_name: string | null;
  legal_structure: string | null;
  gst_number: string | null;
  udyam_number: string | null;
  cin: string | null;
  terms_accepted_at: string | null;
  digital_agreement_accepted_at: string | null;
  revenue_sharing_agreement_accepted_at: string | null;
}

export type AdvertiserDocumentType = "BUSINESS_REGISTRATION_CERTIFICATE";
export type ScreenPartnerDocumentType =
  | "AADHAAR_CARD"
  | "PAN_CARD"
  | "DRIVING_LICENSE"
  | "SELF_PHOTOGRAPH"
  | "ADDRESS_PROOF";

export interface KycDocument {
  id: string;
  documentType: string;
  originalFilename: string;
  uploadedAt: string;
  downloadUrl: string;
  /** PENDING = not reviewed yet, VERIFIED, REJECTED = action required (reviewNote says why). */
  reviewStatus?: "PENDING" | "VERIFIED" | "REJECTED";
  reviewNote?: string | null;
}
