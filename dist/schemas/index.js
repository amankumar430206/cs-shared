import { TARGET_AUDIENCE_SEGMENTS, PRIMARY_OBJECTIVES, AD_DURATION_MIN_SECONDS, AD_DURATION_MAX_SECONDS, INSTALLATION_ENVIRONMENTS, INTERNET_TYPES, SCREEN_ORIENTATIONS, TICKET_PRIORITIES, TICKET_CATEGORIES } from '../chunk-446QGL3B.js';
export { AD_DURATION_MAX_SECONDS, AD_DURATION_MIN_SECONDS } from '../chunk-446QGL3B.js';
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
  partnerType: z.string().optional(),
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
    if (!data.partnerType) {
      issue("partnerType", "Select a partner type.");
    }
  }
  if (!data.acceptTerms) {
    issue("acceptTerms", "You must accept the Terms & Conditions to continue.");
  }
});
var onboardingSchema = buildOnboardingSchema(true);
var googleOnboardingSchema = buildOnboardingSchema(false);

// src/schemas/auth.ts
var loginSchema = z.object({
  identifier: z.string().min(1, "Enter your email or mobile number"),
  password: z.string().min(1, "Enter your password")
});
var verifyOtpSchema = z.object({
  code: z.string().length(6, "Enter the 6-digit code")
});
var forgotPasswordSchema = z.object({
  identifier: z.string().min(1, "Enter your email or mobile number")
});
var resetPasswordSchema = z.object({
  code: z.string().length(6, "Enter the 6-digit code"),
  newPassword: z.string().regex(
    PASSWORD_PATTERN,
    "Password must be at least 8 characters with an uppercase letter, lowercase letter, number, and special character"
  ),
  confirmPassword: z.string()
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});
var MAX_PREFERRED_CITIES = 10;
var MAX_PREFERRED_SCREEN_TYPES = 10;
var TARGET_AUDIENCE_SEGMENT_VALUES = TARGET_AUDIENCE_SEGMENTS.map((s) => s.value);
var builderDetailsSchema = z.object({
  name: z.string().trim().min(2, "nameRequired").max(160, "nameTooLong"),
  brandName: z.string().trim().max(150, "brandTooLong"),
  objective: z.enum(PRIMARY_OBJECTIVES, { error: "objectiveRequired" }),
  description: z.string().trim().max(1e3, "descriptionTooLong"),
  targetAudienceSegments: z.array(z.enum(TARGET_AUDIENCE_SEGMENT_VALUES)).max(TARGET_AUDIENCE_SEGMENTS.length).default([]),
  targetAudienceOther: z.string().trim().max(160, "targetAudienceOtherTooLong").default(""),
  preferredCities: z.array(z.string().trim().max(100)).max(MAX_PREFERRED_CITIES, "preferredCitiesTooMany").default([]),
  preferredScreenTypes: z.array(z.string()).max(MAX_PREFERRED_SCREEN_TYPES, "preferredScreenTypesTooMany").default([]),
  totalBudget: z.number().positive("totalBudgetInvalid").optional()
});
var campaignFormSchema = z.object({
  name: z.string().min(2, "Enter a campaign name").max(160),
  objective: z.string().min(1, "Select an objective"),
  description: z.string().optional(),
  startDate: z.string().min(1, "Pick a start date"),
  endDate: z.string().min(1, "Pick an end date"),
  totalBudget: z.coerce.number().positive("Enter a valid total budget"),
  targetAudienceSegments: z.array(z.string()).optional(),
  // Only meaningful alongside "OTHER" in targetAudienceSegments.
  targetAudienceOther: z.string().max(160).optional(),
  targetAgeMin: z.number().int().optional(),
  targetAgeMax: z.number().int().optional(),
  // Custom messages here, not Zod's own default ("Too big: expected array
  // to have <=10 items") — matches cs-api's campaigns.validators.js wording
  // for the same fields, so client and server agree if this is ever hit
  // both ways (e.g. a stale client bypassing this schema).
  preferredCities: z.array(z.string()).max(10, "You can select up to 10 cities.").optional(),
  preferredScreenTypes: z.array(z.string()).max(10, "You can select up to 10 screen types.").optional(),
  adDuration: z.string().optional().transform((v) => v ? Number(v) : void 0).pipe(z.number().int().min(AD_DURATION_MIN_SECONDS).max(AD_DURATION_MAX_SECONDS).optional()),
  frequency: z.string().optional().transform((v) => v ? Number(v) : void 0).pipe(z.number().int().positive().optional())
}).refine((data) => new Date(data.endDate) >= new Date(data.startDate), {
  message: "End date must be on or after the start date.",
  path: ["endDate"]
}).refine((data) => data.targetAgeMin == null || data.targetAgeMax == null || data.targetAgeMax >= data.targetAgeMin, {
  message: "Age range end must be on or after the start.",
  path: ["targetAgeMax"]
});
var requiredConsent = (message) => z.boolean().refine((v) => v === true, { message });
var advertiserKycSchema = z.object({
  businessAddress: z.string().min(5, "Enter your business address"),
  gstNumber: z.string().optional().refine((v) => !v || GST_PATTERN.test(v), "Enter a valid GST number, or leave it blank"),
  panNumber: z.string().optional().refine((v) => !v || PAN_PATTERN.test(v), "Enter a valid PAN number, or leave it blank"),
  businessCategory: z.string().min(1, "Select a business category"),
  cin: z.string().optional().refine((v) => !v || CIN_PATTERN.test(v), "Enter a valid 21-character CIN, or leave it blank"),
  billingState: z.string().min(2, "Enter your billing state"),
  billingPincode: z.string().regex(PINCODE_PATTERN, "Enter a valid 6-digit PIN code"),
  wantsGstInvoice: z.boolean().optional(),
  brandName: z.string().optional(),
  brandWebsite: z.string().optional().refine((v) => !v || z.string().url().safeParse(v).success, "Enter a valid URL, or leave it blank"),
  socialMediaLinks: z.string().optional(),
  acceptTerms: requiredConsent("You must accept the Terms & Conditions to continue."),
  acceptCopyrightDeclaration: requiredConsent("You must accept the copyright declaration to continue."),
  acceptAdvertisingPolicy: requiredConsent("You must accept the advertising policy to continue.")
});
var screenPartnerKycSchema = z.object({
  aadhaarNumber: z.string().regex(AADHAAR_PATTERN, "Enter a valid 12-digit Aadhaar number"),
  panNumber: z.string().regex(PAN_PATTERN, "Enter a valid PAN number"),
  bankAccountNumber: z.string().min(1, "Enter your bank account number"),
  bankIfsc: z.string().regex(IFSC_PATTERN, "Enter a valid IFSC code"),
  bankAccountName: z.string().min(1, "Enter the bank account holder name"),
  upiId: z.string().optional(),
  businessName: z.string().optional(),
  legalStructure: z.string().optional(),
  gstNumber: z.string().optional().refine((v) => !v || GST_PATTERN.test(v), "Enter a valid GST number, or leave it blank"),
  udyamNumber: z.string().optional().refine((v) => !v || UDYAM_PATTERN.test(v), "Enter a valid UDYAM registration number, or leave it blank"),
  cin: z.string().optional(),
  acceptTerms: requiredConsent("You must accept the Terms & Conditions to continue."),
  acceptDigitalAgreement: requiredConsent("You must accept the Digital Agreement to continue."),
  acceptRevenueSharingAgreement: requiredConsent("You must accept the Revenue Sharing Agreement to continue.")
}).superRefine((data, ctx) => {
  if (data.legalStructure === "COMPANY") {
    if (!data.cin || !CIN_PATTERN.test(data.cin)) {
      ctx.addIssue({ code: "custom", path: ["cin"], message: "Enter a valid 21-character CIN \u2014 required for a Company." });
    }
  } else if (data.cin && !CIN_PATTERN.test(data.cin)) {
    ctx.addIssue({ code: "custom", path: ["cin"], message: "Enter a valid 21-character CIN, or leave it blank." });
  }
});
var updateProfileSchema = z.object({
  fullName: z.string().min(2, "Enter your full name").max(120)
});
var changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Enter your current password"),
  newPassword: z.string().regex(
    PASSWORD_PATTERN,
    "Password must be at least 8 characters with an uppercase letter, lowercase letter, number, and special character"
  ),
  confirmNewPassword: z.string()
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: "Passwords don't match",
  path: ["confirmNewPassword"]
});
var bankDetailsSchema = z.object({
  bankAccountNumber: z.string().min(6).max(30),
  bankIfsc: z.string().regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Enter a valid IFSC code"),
  bankAccountName: z.string().min(2).max(120),
  upiId: z.string().max(80).optional().or(z.literal(""))
});
var timeOfDay = z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Enter a time as HH:MM (24-hour)");
var optionalInt = z.string().optional().transform((v) => v ? Number(v) : void 0).pipe(z.number().int().min(0).optional());
var optionalCapacity = z.string().optional().transform((v) => v ? Number(v) : void 0).pipe(z.number().int().min(1).max(100).optional());
var screenFormSchema = z.object({
  screenName: z.string().min(2, "Enter a screen name").max(160),
  categoryCode: z.string().min(1, "Select a category"),
  screenSize: z.string().min(1, "Enter a screen size").max(40),
  resolution: z.string().min(1, "Enter a resolution").max(40),
  // Optional so older forms keep working — cs-api derives it from the
  // resolution when omitted, and swaps the resolution to match when sent.
  orientation: z.enum(SCREEN_ORIENTATIONS.map((o) => o.value)).optional(),
  os: z.string().min(1, "Enter the OS").max(60),
  // Not collected at registration — the physical device reports this once
  // activated (see LinkDeviceDialog / docs/DEVICE_PLAYER_API.md section 3a),
  // not typed in by the partner.
  androidVersion: z.string().optional(),
  deviceSerialNumber: z.string().min(4, "Enter the device serial number").max(120),
  installationAddress: z.string().min(5, "Enter the installation address").max(500),
  city: z.string().min(2, "Enter the city").max(100),
  state: z.string().min(2, "Enter the state").max(100),
  gpsLatitude: z.coerce.number().min(-90, "Enter a valid latitude").max(90, "Enter a valid latitude"),
  gpsLongitude: z.coerce.number().min(-180, "Enter a valid longitude").max(180, "Enter a valid longitude"),
  // A pasted Google Maps (or similar) share link — optional, blank means
  // "not provided" same as ownershipDetails/androidVersion below.
  locationUrl: z.union([z.literal(""), z.string().url("Enter a valid URL")]).optional(),
  internetType: z.enum(INTERNET_TYPES.map((t) => t.value)),
  operatingHoursStart: timeOfDay,
  operatingHoursEnd: timeOfDay,
  ownershipDetails: z.string().optional(),
  revenueModel: z.string().min(1, "Select a revenue model"),
  pricePerDay: z.coerce.number().positive("Enter a valid listed price per day"),
  estimatedDailyImpressions: optionalInt,
  installationEnvironment: z.enum(INSTALLATION_ENVIRONMENTS.map((e) => e.value)),
  dailyFootfall: optionalInt,
  deviceModel: z.string().optional(),
  ram: z.string().optional(),
  storage: z.string().optional(),
  // How many concurrent campaigns this screen's ad rotation can hold for
  // the same date — see cs-api's 20260101000073 migration. Blank uses the
  // server default (1, exclusive).
  maxAdCapacity: optionalCapacity,
  // Partner plays downloaded ads on their own hardware instead of the CASTADI
  // Ad Player — see cs-api's 20260101000143 migration. Mirrors cs-web.
  isSelfManaged: z.boolean().optional()
}).refine((data) => data.operatingHoursStart < data.operatingHoursEnd, {
  message: "End time must be after start time",
  path: ["operatingHoursEnd"]
});
var createTicketSchema = z.object({
  category: z.enum(TICKET_CATEGORIES.map((c) => c.value), {
    message: "Choose a category"
  }),
  subject: z.string().min(3, "Enter a subject").max(255),
  description: z.string().min(10, "Describe the issue in a bit more detail").max(5e3),
  priority: z.enum(TICKET_PRIORITIES).optional()
});
var ticketMessageSchema = z.object({
  message: z.string().trim().min(1, "Write a message").max(5e3)
});

export { AADHAAR_PATTERN, ADVERTISER_BUSINESS_CATEGORIES, BUDGET_RANGES, BUSINESS_TYPES, CIN_PATTERN, GST_PATTERN, IFSC_PATTERN, LEGAL_STRUCTURES, MAX_PREFERRED_CITIES, MAX_PREFERRED_SCREEN_TYPES, MOBILE_PATTERN, PAN_PATTERN, PASSWORD_PATTERN, PINCODE_PATTERN, UDYAM_PATTERN, advertiserKycSchema, bankDetailsSchema, builderDetailsSchema, campaignFormSchema, changePasswordSchema, createTicketSchema, forgotPasswordSchema, googleOnboardingSchema, loginSchema, onboardingSchema, resetPasswordSchema, screenFormSchema, screenPartnerKycSchema, ticketMessageSchema, updateProfileSchema, verifyOtpSchema };
