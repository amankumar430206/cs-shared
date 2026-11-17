// Copied from cs-web src/schemas/kyc.ts — keep in sync.
import { z } from "zod";
import { gstinPan, isCompanyPan, isValidAadhaar, isValidGstin, isValidPan, panFitsLegalStructure } from "../types/indianIds";
import {
  AADHAAR_PATTERN,
  CIN_PATTERN,
  GST_PATTERN,
  IFSC_PATTERN,
  PAN_PATTERN,
  PINCODE_PATTERN,
  UDYAM_PATTERN,
} from "./onboarding";

const PAN_HOLDER_MESSAGE = "Enter a valid PAN number. The 4th letter should be P, C, H, F, A, T, B, L, J or G.";
const PAN_STRUCTURE_MESSAGE =
  "This PAN type doesn't match your legal structure. Use a personal PAN (4th letter P) for Individual or Proprietor, and a company PAN for Company.";
const GST_CHECK_MESSAGE = "This GST number doesn't look right. Check each character.";
const GST_PAN_MESSAGE = "The PAN inside this GST number doesn't match the PAN you entered.";

// Offline consistency checks shared by both forms (mirrors cs-api's kyc.validators.js).
function checkGstin(gstNumber: string | undefined, panNumber: string | undefined, ctx: z.RefinementCtx) {
  if (!gstNumber || !GST_PATTERN.test(gstNumber)) return; // the field's own regex reports a bad shape
  if (!isValidGstin(gstNumber)) {
    ctx.addIssue({ code: "custom", path: ["gstNumber"], message: GST_CHECK_MESSAGE });
  } else if (panNumber && PAN_PATTERN.test(panNumber) && gstinPan(gstNumber) !== panNumber) {
    ctx.addIssue({ code: "custom", path: ["gstNumber"], message: GST_PAN_MESSAGE });
  }
}

const requiredConsent = (message: string) => z.boolean().refine((v) => v === true, { message });

// Mirrors cs-api's kyc.validators.js submitAdvertiserKycSchema.
export const advertiserKycSchema = z
  .object({
  businessAddress: z.string().min(5, "Enter your business address"),
  gstNumber: z
    .string()
    .optional()
    .refine((v) => !v || GST_PATTERN.test(v), "Enter a valid GST number, or leave it blank"),
  panNumber: z
    .string()
    .optional()
    .refine((v) => !v || PAN_PATTERN.test(v), "Enter a valid PAN number, or leave it blank")
    .refine((v) => !v || !PAN_PATTERN.test(v) || isValidPan(v), PAN_HOLDER_MESSAGE),
  businessCategory: z.string().min(1, "Select a business category"),
  cin: z
    .string()
    .optional()
    .refine((v) => !v || CIN_PATTERN.test(v), "Enter a valid 21-character CIN, or leave it blank"),
  billingState: z.string().min(2, "Enter your billing state"),
  billingPincode: z.string().regex(PINCODE_PATTERN, "Enter a valid 6-digit PIN code"),
  wantsGstInvoice: z.boolean().optional(),
  brandName: z.string().optional(),
  brandWebsite: z
    .string()
    .optional()
    .refine((v) => !v || z.string().url().safeParse(v).success, "Enter a valid URL, or leave it blank"),
  socialMediaLinks: z.string().optional(),
  acceptTerms: requiredConsent("You must accept the Terms & Conditions to continue."),
  acceptCopyrightDeclaration: requiredConsent("You must accept the copyright declaration to continue."),
  acceptAdvertisingPolicy: requiredConsent("You must accept the advertising policy to continue."),
  })
  .superRefine((data, ctx) => {
    checkGstin(data.gstNumber, data.panNumber, ctx);
    if (data.cin && CIN_PATTERN.test(data.cin) && data.panNumber && isValidPan(data.panNumber) && !isCompanyPan(data.panNumber)) {
      ctx.addIssue({ code: "custom", path: ["panNumber"], message: "A company's CIN needs a company PAN, not a personal one." });
    }
  });
export type AdvertiserKycFormValues = z.infer<typeof advertiserKycSchema>;

// Mirrors cs-api's kyc.validators.js submitScreenPartnerKycSchema. Every ID and the bank block are optional here:
// the "at least 2 of Aadhaar / PAN / Driving Licence (number or upload)" rule needs the uploaded documents too, so
// the form checks it with evaluateIdentityProofs (types/kycIdentity.ts), and the server enforces it on submit.
const DRIVING_LICENSE_PATTERN = /^[A-Z0-9][A-Z0-9 /-]{7,18}[A-Z0-9]$/;

export const screenPartnerKycSchema = z
  .object({
    aadhaarNumber: z
      .string()
      .optional()
      .refine((v) => !v || AADHAAR_PATTERN.test(v), "Enter a valid 12-digit Aadhaar number, or leave it blank")
      .refine((v) => !v || !AADHAAR_PATTERN.test(v) || isValidAadhaar(v), "This Aadhaar number doesn't look right. Check each digit."),
    panNumber: z
      .string()
      .optional()
      .refine((v) => !v || PAN_PATTERN.test(v), "Enter a valid PAN number, or leave it blank")
      .refine((v) => !v || !PAN_PATTERN.test(v) || isValidPan(v), PAN_HOLDER_MESSAGE),
    drivingLicenseNumber: z
      .string()
      .optional()
      .refine((v) => !v || DRIVING_LICENSE_PATTERN.test(v.toUpperCase()), "Enter a valid driving licence number, or leave it blank"),
    bankAccountNumber: z.string().optional(),
    bankIfsc: z
      .string()
      .optional()
      .refine((v) => !v || IFSC_PATTERN.test(v), "Enter a valid IFSC code"),
    bankAccountName: z.string().optional(),
    upiId: z.string().optional(),
    businessName: z.string().optional(),
    legalStructure: z.string().optional(),
    gstNumber: z
      .string()
      .optional()
      .refine((v) => !v || GST_PATTERN.test(v), "Enter a valid GST number, or leave it blank"),
    udyamNumber: z
      .string()
      .optional()
      .refine((v) => !v || UDYAM_PATTERN.test(v), "Enter a valid UDYAM registration number, or leave it blank"),
    cin: z.string().optional(),
    acceptTerms: requiredConsent("You must accept the Terms & Conditions to continue."),
    acceptDigitalAgreement: requiredConsent("You must accept the Digital Agreement to continue."),
    acceptRevenueSharingAgreement: requiredConsent("You must accept the Revenue Sharing Agreement to continue."),
  })
  .superRefine((data, ctx) => {
    checkGstin(data.gstNumber, data.panNumber, ctx);
    if (data.panNumber && panFitsLegalStructure(data.panNumber, data.legalStructure) === false) {
      ctx.addIssue({ code: "custom", path: ["panNumber"], message: PAN_STRUCTURE_MESSAGE });
    }
    // Bank details are all-or-none: a half-filled block can never be verified or paid to.
    const bank = [data.bankAccountNumber, data.bankIfsc, data.bankAccountName];
    if (bank.some(Boolean)) {
      if (!data.bankAccountNumber) ctx.addIssue({ code: "custom", path: ["bankAccountNumber"], message: "Enter your bank account number" });
      if (!data.bankIfsc) ctx.addIssue({ code: "custom", path: ["bankIfsc"], message: "Enter a valid IFSC code" });
      if (!data.bankAccountName) ctx.addIssue({ code: "custom", path: ["bankAccountName"], message: "Enter the bank account holder name" });
    }
    if (data.legalStructure === "COMPANY") {
      if (!data.cin || !CIN_PATTERN.test(data.cin)) {
        ctx.addIssue({ code: "custom", path: ["cin"], message: "Enter a valid 21-character CIN — required for a Company." });
      }
    } else if (data.cin && !CIN_PATTERN.test(data.cin)) {
      ctx.addIssue({ code: "custom", path: ["cin"], message: "Enter a valid 21-character CIN, or leave it blank." });
    }
  });
export type ScreenPartnerKycFormValues = z.infer<typeof screenPartnerKycSchema>;
