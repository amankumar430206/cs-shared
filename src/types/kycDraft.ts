// Copied from cs-web src/lib/kycDraft.ts — keep in sync.
// The in-progress KYC form saved on the server (cs-api kyc_drafts). Pure helpers.

export type KycDraftValue = string | boolean;
export type KycDraftValues = Record<string, KycDraftValue>;

/** `DRAFT` = autosaved by the customer; `SUBMITTED` = pre-filled from an earlier submission. */
export interface KycDraft {
  values: KycDraftValues;
  step: number;
  updatedAt: string | null;
  source: "DRAFT" | "SUBMITTED";
}

export interface KycDraftField {
  key: string;
  label: string;
  /** Needed to submit. */
  required?: boolean;
}

export const ADVERTISER_DRAFT_FIELDS: readonly KycDraftField[] = [
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
  { key: "socialMediaLinks", label: "Social media links" },
];

export const SCREEN_PARTNER_DRAFT_FIELDS: readonly KycDraftField[] = [
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
  { key: "upiId", label: "UPI ID" },
];

export const advertiserDraftKeys = ADVERTISER_DRAFT_FIELDS.map((f) => f.key);
export const screenPartnerDraftKeys = SCREEN_PARTNER_DRAFT_FIELDS.map((f) => f.key);

/** Only the form's own text/boolean fields, in a fixed order — never the consent checkboxes. */
export function pickDraftValues(values: Record<string, unknown>, keys: readonly string[]): KycDraftValues {
  const picked: KycDraftValues = {};
  for (const key of keys) {
    const value = values[key];
    if (typeof value === "string" || typeof value === "boolean") picked[key] = value;
  }
  return picked;
}

/** Stable identity of a save, so an unchanged form is never sent twice. */
export const draftSignature = (values: KycDraftValues, step: number) => JSON.stringify([step, values]);

export const hasValue = (value: KycDraftValue | undefined) => (typeof value === "string" ? value.trim() !== "" : value === true);
