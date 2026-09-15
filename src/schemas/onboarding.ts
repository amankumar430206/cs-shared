import { z } from "zod";

// Regexes mirrored 1:1 from cs-api's auth.validators.js / kyc.validators.js.
export const PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
export const PAN_PATTERN = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
export const GST_PATTERN = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z][Z][0-9A-Z]$/;
export const IFSC_PATTERN = /^[A-Z]{4}0[A-Z0-9]{6}$/;
export const AADHAAR_PATTERN = /^[0-9]{12}$/;
export const MOBILE_PATTERN = /^[6-9]\d{9}$/;
export const CIN_PATTERN = /^[LU][0-9]{5}[A-Z]{2}[0-9]{4}[A-Z]{3}[0-9]{6}$/;
export const UDYAM_PATTERN = /^UDYAM-[A-Z]{2}-\d{2}-\d{7}$/i;
export const PINCODE_PATTERN = /^[0-9]{6}$/;

// Mirrors cs-api's kyc.validators.js ADVERTISER_BUSINESS_CATEGORIES.
export const ADVERTISER_BUSINESS_CATEGORIES = [
  { value: "RETAIL", label: "Retail" },
  { value: "FMCG", label: "FMCG" },
  { value: "REAL_ESTATE", label: "Real Estate" },
  { value: "AUTOMOTIVE", label: "Automotive" },
  { value: "FOOD_BEVERAGE", label: "Food & Beverage" },
  { value: "HEALTHCARE", label: "Healthcare" },
  { value: "EDUCATION", label: "Education" },
  { value: "FINANCE_INSURANCE", label: "Finance & Insurance" },
  { value: "ENTERTAINMENT", label: "Entertainment" },
  { value: "ECOMMERCE", label: "E-commerce" },
  { value: "TRAVEL_HOSPITALITY", label: "Travel & Hospitality" },
  { value: "GOVERNMENT_PUBLIC_SECTOR", label: "Government / Public Sector" },
  { value: "OTHER", label: "Other" },
] as const;

// Mirrors cs-api's auth.validators.js businessType/budgetRange enums
// (registration-time personalization — distinct from Business Category).
export const BUSINESS_TYPES = [
  { value: "LOCAL_BUSINESS", label: "Local Business" },
  { value: "BRAND", label: "Brand" },
  { value: "AGENCY", label: "Advertising Agency" },
  { value: "STARTUP", label: "Startup" },
  { value: "ENTERPRISE", label: "Enterprise" },
] as const;

export const BUDGET_RANGES = [
  { value: "UNDER_10K", label: "Under ₹10K" },
  { value: "10K_50K", label: "₹10K – ₹50K" },
  { value: "50K_2L", label: "₹50K – ₹2L" },
  { value: "ABOVE_2L", label: "Above ₹2L" },
] as const;

// Mirrors cs-api's kyc.validators.js legalStructure enum.
export const LEGAL_STRUCTURES = [
  { value: "INDIVIDUAL", label: "Individual" },
  { value: "PROPRIETOR", label: "Proprietor" },
  { value: "COMPANY", label: "Company" },
] as const;

// Registration only collects what POST /auth/register actually requires
// (cs-api's auth.validators.js registerSchema) — everything else (business
// address, GST/PAN, Aadhaar, bank details, legal consents, documents) is
// genuine KYC data, collected later on its own time from /kyc
// (AdvertiserKycPanel/ScreenPartnerKycPanel) instead of up front, to keep
// signup itself fast. See ActionableItemsCard for the post-registration
// reminder that KYC data will be needed.
export const onboardingSchema = z
  .object({
    role: z.enum(["ADVERTISER", "SCREEN_PARTNER"]),

    // Basic Information (registration)
    fullName: z.string().min(2, "Enter your full name").max(120),
    mobileNumber: z.string().regex(MOBILE_PATTERN, "Enter a valid 10-digit Indian mobile number"),
    email: z.string().max(160).optional().or(z.literal("")),
    password: z.string().regex(
      PASSWORD_PATTERN,
      "Password must be at least 8 characters with an uppercase letter, lowercase letter, number, and special character"
    ),
    confirmPassword: z.string(),
    referralCode: z.string().optional(),

    // Advertiser — required by registerSchema
    contactPerson: z.string().optional(),
    businessName: z.string().optional(),

    // Screen Partner — required by registerSchema
    dateOfBirth: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    partnerType: z.string().optional(),

    acceptTerms: z.boolean(),
  })
  .superRefine((data, ctx) => {
    const issue = (path: string, message: string) => ctx.addIssue({ code: "custom", path: [path], message });

    if (data.password !== data.confirmPassword) {
      issue("confirmPassword", "Passwords do not match.");
    }

    if (data.role === "ADVERTISER") {
      if (!data.email || !z.string().email().safeParse(data.email).success) {
        issue("email", "Enter a valid email address.");
      }
      if (!data.contactPerson || data.contactPerson.trim().length < 2) {
        issue("contactPerson", "Enter a contact person name.");
      }
      if (!data.businessName || data.businessName.trim().length < 2) {
        issue("businessName", "Enter your business name.");
      }
    }

    if (data.role === "SCREEN_PARTNER") {
      if (data.email && !z.string().email().safeParse(data.email).success) {
        issue("email", "Enter a valid email address, or leave it blank.");
      }
      if (!data.dateOfBirth) {
        issue("dateOfBirth", "Enter your date of birth.");
      }
      if (!data.city || data.city.trim().length < 2) {
        issue("city", "Enter your city.");
      }
      if (!data.state || data.state.trim().length < 2) {
        issue("state", "Enter your state.");
      }
      if (!data.partnerType) {
        issue("partnerType", "Select a partner type.");
      }
    }

    if (!data.acceptTerms) {
      issue("acceptTerms", "You must accept the Terms & Conditions to continue.");
    }
  });

export type OnboardingFormValues = z.input<typeof onboardingSchema>;
