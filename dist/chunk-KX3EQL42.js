import { PARTNER_TYPE_OTHER_MAX, PARTNER_TYPE_OTHER } from './chunk-HK7CF55G.js';
import { z } from 'zod';

var PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
var PAN_PATTERN = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
var GST_PATTERN = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z][Z][0-9A-Z]$/;
var IFSC_PATTERN = /^[A-Z]{4}0[A-Z0-9]{6}$/;
var AADHAAR_PATTERN = /^[0-9]{12}$/;
var MOBILE_PATTERN = /^[6-9]\d{9}$/;
var CIN_PATTERN = /^[LU][0-9]{5}[A-Z]{2}[0-9]{4}[A-Z]{3}[0-9]{6}$/;
var UDYAM_PATTERN = /^UDYAM-[A-Z]{2}-\d{2}-\d{7}$/i;
var PINCODE_PATTERN = /^[0-9]{6}$/;
var ADVERTISER_BUSINESS_CATEGORIES = [
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
  { value: "OTHER", label: "Other" }
];
var BUSINESS_TYPES = [
  { value: "LOCAL_BUSINESS", label: "Local Business" },
  { value: "BRAND", label: "Brand" },
  { value: "AGENCY", label: "Advertising Agency" },
  { value: "STARTUP", label: "Startup" },
  { value: "ENTERPRISE", label: "Enterprise" }
];
var BUDGET_RANGES = [
  { value: "UNDER_10K", label: "Under \u20B910K" },
  { value: "10K_50K", label: "\u20B910K \u2013 \u20B950K" },
  { value: "50K_2L", label: "\u20B950K \u2013 \u20B92L" },
  { value: "ABOVE_2L", label: "Above \u20B92L" }
];
var LEGAL_STRUCTURES = [
  { value: "INDIVIDUAL", label: "Individual" },
  { value: "PROPRIETOR", label: "Proprietor" },
  { value: "COMPANY", label: "Company" }
];
var buildOnboardingSchema = (withPassword) => z.object({
  role: z.enum(["ADVERTISER", "SCREEN_PARTNER"]),
  // Basic Information (registration)
  fullName: z.string().min(2, "Enter your full name").max(120),
  mobileNumber: z.string().regex(MOBILE_PATTERN, "Enter a valid 10-digit Indian mobile number"),
  email: z.string().max(160).optional().or(z.literal("")),
  // Absent in Google sign-up: Google proved the email, and the account has no password.
  password: withPassword ? z.string().regex(
    PASSWORD_PATTERN,
    "Password must be at least 8 characters with an uppercase letter, lowercase letter, number, and special character"
  ) : z.string().optional(),
  confirmPassword: withPassword ? z.string() : z.string().optional(),
  referralCode: z.string().optional(),
  // Advertiser — required by registerSchema
  contactPerson: z.string().optional(),
  businessName: z.string().optional(),
  // Screen Partner — required by registerSchema
  dateOfBirth: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  // Legacy single type, kept so older callers keep working.
  partnerType: z.string().optional(),
  // A partner can be several types at once; OTHER needs a short description (cs-api 0.21).
  partnerTypes: z.array(z.string()).optional(),
  partnerTypeOther: z.string().max(PARTNER_TYPE_OTHER_MAX, `Keep it under ${PARTNER_TYPE_OTHER_MAX} characters.`).optional(),
  acceptTerms: z.boolean()
}).superRefine((data, ctx) => {
  const issue = (path, message) => ctx.addIssue({ code: "custom", path: [path], message });
  if (withPassword && data.password !== data.confirmPassword) {
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
    const types = data.partnerTypes?.length ? data.partnerTypes : data.partnerType ? [data.partnerType] : [];
    if (types.length === 0) {
      issue(data.partnerTypes ? "partnerTypes" : "partnerType", data.partnerTypes ? "Select at least one partner type." : "Select a partner type.");
    }
    if (types.includes(PARTNER_TYPE_OTHER) && (data.partnerTypeOther ?? "").trim().length < 2) {
      issue("partnerTypeOther", "Tell us what kind of partner you are.");
    }
  }
  if (!data.acceptTerms) {
    issue("acceptTerms", "You must accept the Terms & Conditions to continue.");
  }
});
var onboardingSchema = buildOnboardingSchema(true);
var googleOnboardingSchema = buildOnboardingSchema(false);

export { AADHAAR_PATTERN, ADVERTISER_BUSINESS_CATEGORIES, BUDGET_RANGES, BUSINESS_TYPES, CIN_PATTERN, GST_PATTERN, IFSC_PATTERN, LEGAL_STRUCTURES, MOBILE_PATTERN, PAN_PATTERN, PASSWORD_PATTERN, PINCODE_PATTERN, UDYAM_PATTERN, googleOnboardingSchema, onboardingSchema };
