import { PASSWORD_PATTERN, PINCODE_PATTERN, CIN_PATTERN, PAN_PATTERN, GST_PATTERN, UDYAM_PATTERN, IFSC_PATTERN, AADHAAR_PATTERN } from '../chunk-KX3EQL42.js';
export { AADHAAR_PATTERN, ADVERTISER_BUSINESS_CATEGORIES, BUDGET_RANGES, BUSINESS_TYPES, CIN_PATTERN, GST_PATTERN, IFSC_PATTERN, LEGAL_STRUCTURES, MOBILE_PATTERN, PAN_PATTERN, PASSWORD_PATTERN, PINCODE_PATTERN, UDYAM_PATTERN, googleOnboardingSchema, onboardingSchema } from '../chunk-KX3EQL42.js';
import { TARGET_AUDIENCE_SEGMENTS, PRIMARY_OBJECTIVES, AD_DURATION_MIN_SECONDS, AD_DURATION_MAX_SECONDS, isValidPan, isCompanyPan, isValidAadhaar, panFitsLegalStructure, INSTALLATION_ENVIRONMENTS, INTERNET_TYPES, SCREEN_ORIENTATIONS, TICKET_PRIORITIES, TICKET_CATEGORIES, isValidGstin, gstinPan } from '../chunk-22XQ7W3A.js';
export { AD_DURATION_MAX_SECONDS, AD_DURATION_MIN_SECONDS } from '../chunk-22XQ7W3A.js';
import '../chunk-HK7CF55G.js';
import { z } from 'zod';

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
var PAN_HOLDER_MESSAGE = "Enter a valid PAN number. The 4th letter should be P, C, H, F, A, T, B, L, J or G.";
var PAN_STRUCTURE_MESSAGE = "This PAN type doesn't match your legal structure. Use a personal PAN (4th letter P) for Individual or Proprietor, and a company PAN for Company.";
var GST_CHECK_MESSAGE = "This GST number doesn't look right. Check each character.";
var GST_PAN_MESSAGE = "The PAN inside this GST number doesn't match the PAN you entered.";
function checkGstin(gstNumber, panNumber, ctx) {
  if (!gstNumber || !GST_PATTERN.test(gstNumber)) return;
  if (!isValidGstin(gstNumber)) {
    ctx.addIssue({ code: "custom", path: ["gstNumber"], message: GST_CHECK_MESSAGE });
  } else if (panNumber && PAN_PATTERN.test(panNumber) && gstinPan(gstNumber) !== panNumber) {
    ctx.addIssue({ code: "custom", path: ["gstNumber"], message: GST_PAN_MESSAGE });
  }
}
var requiredConsent = (message) => z.boolean().refine((v) => v === true, { message });
var advertiserKycSchema = z.object({
  businessAddress: z.string().min(5, "Enter your business address"),
  gstNumber: z.string().optional().refine((v) => !v || GST_PATTERN.test(v), "Enter a valid GST number, or leave it blank"),
  panNumber: z.string().optional().refine((v) => !v || PAN_PATTERN.test(v), "Enter a valid PAN number, or leave it blank").refine((v) => !v || !PAN_PATTERN.test(v) || isValidPan(v), PAN_HOLDER_MESSAGE),
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
}).superRefine((data, ctx) => {
  checkGstin(data.gstNumber, data.panNumber, ctx);
  if (data.cin && CIN_PATTERN.test(data.cin) && data.panNumber && isValidPan(data.panNumber) && !isCompanyPan(data.panNumber)) {
    ctx.addIssue({ code: "custom", path: ["panNumber"], message: "A company's CIN needs a company PAN, not a personal one." });
  }
});
var DRIVING_LICENSE_PATTERN = /^[A-Z0-9][A-Z0-9 /-]{7,18}[A-Z0-9]$/;
var screenPartnerKycSchema = z.object({
  aadhaarNumber: z.string().optional().refine((v) => !v || AADHAAR_PATTERN.test(v), "Enter a valid 12-digit Aadhaar number, or leave it blank").refine((v) => !v || !AADHAAR_PATTERN.test(v) || isValidAadhaar(v), "This Aadhaar number doesn't look right. Check each digit."),
  panNumber: z.string().optional().refine((v) => !v || PAN_PATTERN.test(v), "Enter a valid PAN number, or leave it blank").refine((v) => !v || !PAN_PATTERN.test(v) || isValidPan(v), PAN_HOLDER_MESSAGE),
  drivingLicenseNumber: z.string().optional().refine((v) => !v || DRIVING_LICENSE_PATTERN.test(v.toUpperCase()), "Enter a valid driving licence number, or leave it blank"),
  bankAccountNumber: z.string().optional(),
  bankIfsc: z.string().optional().refine((v) => !v || IFSC_PATTERN.test(v), "Enter a valid IFSC code"),
  bankAccountName: z.string().optional(),
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
  checkGstin(data.gstNumber, data.panNumber, ctx);
  if (data.panNumber && panFitsLegalStructure(data.panNumber, data.legalStructure) === false) {
    ctx.addIssue({ code: "custom", path: ["panNumber"], message: PAN_STRUCTURE_MESSAGE });
  }
  const bank = [data.bankAccountNumber, data.bankIfsc, data.bankAccountName];
  if (bank.some(Boolean)) {
    if (!data.bankAccountNumber) ctx.addIssue({ code: "custom", path: ["bankAccountNumber"], message: "Enter your bank account number" });
    if (!data.bankIfsc) ctx.addIssue({ code: "custom", path: ["bankIfsc"], message: "Enter a valid IFSC code" });
    if (!data.bankAccountName) ctx.addIssue({ code: "custom", path: ["bankAccountName"], message: "Enter the bank account holder name" });
  }
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

export { MAX_PREFERRED_CITIES, MAX_PREFERRED_SCREEN_TYPES, advertiserKycSchema, bankDetailsSchema, builderDetailsSchema, campaignFormSchema, changePasswordSchema, createTicketSchema, forgotPasswordSchema, loginSchema, resetPasswordSchema, screenFormSchema, screenPartnerKycSchema, ticketMessageSchema, updateProfileSchema, verifyOtpSchema };
