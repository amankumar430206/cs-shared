// Types mirroring cs-api's modules/kyc responses.

export interface AdvertiserKycStatus {
  verificationStatus: "PENDING" | "UNDER_REVIEW" | "APPROVED" | "REJECTED";
  rejectionReason: string | null;
  submittedAt: string | null;
  reviewedAt: string | null;
}

export interface ScreenPartnerKycStatus {
  kycStatus: "PENDING" | "UNDER_REVIEW" | "APPROVED" | "REJECTED";
  rejectionReason: string | null;
  submittedAt: string | null;
  reviewedAt: string | null;
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
export type ScreenPartnerDocumentType = "SELF_PHOTOGRAPH" | "ADDRESS_PROOF";

export interface KycDocument {
  id: string;
  documentType: string;
  originalFilename: string;
  uploadedAt: string;
  downloadUrl: string;
}
