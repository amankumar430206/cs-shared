import { z } from 'zod';
export { A as AD_DURATION_MAX_SECONDS, a as AD_DURATION_MIN_SECONDS } from '../campaigns-6nJvR6CG.js';

declare const loginSchema: z.ZodObject<{
    identifier: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
type LoginFormValues = z.infer<typeof loginSchema>;
declare const verifyOtpSchema: z.ZodObject<{
    code: z.ZodString;
}, z.core.$strip>;
type VerifyOtpFormValues = z.infer<typeof verifyOtpSchema>;
declare const forgotPasswordSchema: z.ZodObject<{
    identifier: z.ZodString;
}, z.core.$strip>;
type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;
declare const resetPasswordSchema: z.ZodObject<{
    code: z.ZodString;
    newPassword: z.ZodString;
    confirmPassword: z.ZodString;
}, z.core.$strip>;
type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

declare const MAX_PREFERRED_CITIES = 10;
declare const MAX_PREFERRED_SCREEN_TYPES = 10;
declare const builderDetailsSchema: z.ZodObject<{
    name: z.ZodString;
    brandName: z.ZodString;
    objective: z.ZodEnum<{
        OTHER: "OTHER";
        BRAND_AWARENESS: "BRAND_AWARENESS";
        PRODUCT_LAUNCH: "PRODUCT_LAUNCH";
        OFFER_PROMOTION: "OFFER_PROMOTION";
        STORE_TRAFFIC: "STORE_TRAFFIC";
        EVENT_PROMOTION: "EVENT_PROMOTION";
        NEW_BUSINESS_LAUNCH: "NEW_BUSINESS_LAUNCH";
        LEAD_GENERATION: "LEAD_GENERATION";
    }>;
    description: z.ZodString;
    targetAudienceSegments: z.ZodDefault<z.ZodArray<z.ZodEnum<{
        OTHER: "OTHER";
        YOUNG_PROFESSIONALS: "YOUNG_PROFESSIONALS";
        FAMILIES: "FAMILIES";
        STUDENTS: "STUDENTS";
        SHOPPERS: "SHOPPERS";
        COMMUTERS: "COMMUTERS";
        FITNESS_ENTHUSIASTS: "FITNESS_ENTHUSIASTS";
        TOURISTS: "TOURISTS";
        SENIOR_CITIZENS: "SENIOR_CITIZENS";
        BUSINESS_TRAVELERS: "BUSINESS_TRAVELERS";
        GENERAL_PUBLIC: "GENERAL_PUBLIC";
    }>>>;
    targetAudienceOther: z.ZodDefault<z.ZodString>;
    preferredCities: z.ZodDefault<z.ZodArray<z.ZodString>>;
    preferredScreenTypes: z.ZodDefault<z.ZodArray<z.ZodString>>;
    totalBudget: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
type BuilderDetailsInput = z.input<typeof builderDetailsSchema>;
type BuilderDetailsOutput = z.output<typeof builderDetailsSchema>;

declare const campaignFormSchema: z.ZodObject<{
    name: z.ZodString;
    objective: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    startDate: z.ZodString;
    endDate: z.ZodString;
    totalBudget: z.ZodCoercedNumber<unknown>;
    targetAudienceSegments: z.ZodOptional<z.ZodArray<z.ZodString>>;
    targetAudienceOther: z.ZodOptional<z.ZodString>;
    targetAgeMin: z.ZodOptional<z.ZodNumber>;
    targetAgeMax: z.ZodOptional<z.ZodNumber>;
    preferredCities: z.ZodOptional<z.ZodArray<z.ZodString>>;
    preferredScreenTypes: z.ZodOptional<z.ZodArray<z.ZodString>>;
    adDuration: z.ZodPipe<z.ZodPipe<z.ZodOptional<z.ZodString>, z.ZodTransform<number | undefined, string | undefined>>, z.ZodOptional<z.ZodNumber>>;
    frequency: z.ZodPipe<z.ZodPipe<z.ZodOptional<z.ZodString>, z.ZodTransform<number | undefined, string | undefined>>, z.ZodOptional<z.ZodNumber>>;
}, z.core.$strip>;
type CampaignFormInput = z.input<typeof campaignFormSchema>;
type CampaignFormOutput = z.output<typeof campaignFormSchema>;

declare const advertiserKycSchema: z.ZodObject<{
    businessAddress: z.ZodString;
    gstNumber: z.ZodOptional<z.ZodString>;
    panNumber: z.ZodOptional<z.ZodString>;
    businessCategory: z.ZodString;
    cin: z.ZodOptional<z.ZodString>;
    billingState: z.ZodString;
    billingPincode: z.ZodString;
    wantsGstInvoice: z.ZodOptional<z.ZodBoolean>;
    brandName: z.ZodOptional<z.ZodString>;
    brandWebsite: z.ZodOptional<z.ZodString>;
    socialMediaLinks: z.ZodOptional<z.ZodString>;
    acceptTerms: z.ZodBoolean;
    acceptCopyrightDeclaration: z.ZodBoolean;
    acceptAdvertisingPolicy: z.ZodBoolean;
}, z.core.$strip>;
type AdvertiserKycFormValues = z.infer<typeof advertiserKycSchema>;
declare const screenPartnerKycSchema: z.ZodObject<{
    aadhaarNumber: z.ZodString;
    panNumber: z.ZodString;
    bankAccountNumber: z.ZodString;
    bankIfsc: z.ZodString;
    bankAccountName: z.ZodString;
    upiId: z.ZodOptional<z.ZodString>;
    businessName: z.ZodOptional<z.ZodString>;
    legalStructure: z.ZodOptional<z.ZodString>;
    gstNumber: z.ZodOptional<z.ZodString>;
    udyamNumber: z.ZodOptional<z.ZodString>;
    cin: z.ZodOptional<z.ZodString>;
    acceptTerms: z.ZodBoolean;
    acceptDigitalAgreement: z.ZodBoolean;
    acceptRevenueSharingAgreement: z.ZodBoolean;
}, z.core.$strip>;
type ScreenPartnerKycFormValues = z.infer<typeof screenPartnerKycSchema>;

declare const PASSWORD_PATTERN: RegExp;
declare const PAN_PATTERN: RegExp;
declare const GST_PATTERN: RegExp;
declare const IFSC_PATTERN: RegExp;
declare const AADHAAR_PATTERN: RegExp;
declare const MOBILE_PATTERN: RegExp;
declare const CIN_PATTERN: RegExp;
declare const UDYAM_PATTERN: RegExp;
declare const PINCODE_PATTERN: RegExp;
declare const ADVERTISER_BUSINESS_CATEGORIES: readonly [{
    readonly value: "RETAIL";
    readonly label: "Retail";
}, {
    readonly value: "FMCG";
    readonly label: "FMCG";
}, {
    readonly value: "REAL_ESTATE";
    readonly label: "Real Estate";
}, {
    readonly value: "AUTOMOTIVE";
    readonly label: "Automotive";
}, {
    readonly value: "FOOD_BEVERAGE";
    readonly label: "Food & Beverage";
}, {
    readonly value: "HEALTHCARE";
    readonly label: "Healthcare";
}, {
    readonly value: "EDUCATION";
    readonly label: "Education";
}, {
    readonly value: "FINANCE_INSURANCE";
    readonly label: "Finance & Insurance";
}, {
    readonly value: "ENTERTAINMENT";
    readonly label: "Entertainment";
}, {
    readonly value: "ECOMMERCE";
    readonly label: "E-commerce";
}, {
    readonly value: "TRAVEL_HOSPITALITY";
    readonly label: "Travel & Hospitality";
}, {
    readonly value: "GOVERNMENT_PUBLIC_SECTOR";
    readonly label: "Government / Public Sector";
}, {
    readonly value: "OTHER";
    readonly label: "Other";
}];
declare const BUSINESS_TYPES: readonly [{
    readonly value: "LOCAL_BUSINESS";
    readonly label: "Local Business";
}, {
    readonly value: "BRAND";
    readonly label: "Brand";
}, {
    readonly value: "AGENCY";
    readonly label: "Advertising Agency";
}, {
    readonly value: "STARTUP";
    readonly label: "Startup";
}, {
    readonly value: "ENTERPRISE";
    readonly label: "Enterprise";
}];
declare const BUDGET_RANGES: readonly [{
    readonly value: "UNDER_10K";
    readonly label: "Under ₹10K";
}, {
    readonly value: "10K_50K";
    readonly label: "₹10K – ₹50K";
}, {
    readonly value: "50K_2L";
    readonly label: "₹50K – ₹2L";
}, {
    readonly value: "ABOVE_2L";
    readonly label: "Above ₹2L";
}];
declare const LEGAL_STRUCTURES: readonly [{
    readonly value: "INDIVIDUAL";
    readonly label: "Individual";
}, {
    readonly value: "PROPRIETOR";
    readonly label: "Proprietor";
}, {
    readonly value: "COMPANY";
    readonly label: "Company";
}];
/** The registration form (email + password account). */
declare const onboardingSchema: z.ZodObject<{
    role: z.ZodEnum<{
        ADVERTISER: "ADVERTISER";
        SCREEN_PARTNER: "SCREEN_PARTNER";
    }>;
    fullName: z.ZodString;
    mobileNumber: z.ZodString;
    email: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    password: z.ZodString | z.ZodOptional<z.ZodString>;
    confirmPassword: z.ZodString | z.ZodOptional<z.ZodString>;
    referralCode: z.ZodOptional<z.ZodString>;
    contactPerson: z.ZodOptional<z.ZodString>;
    businessName: z.ZodOptional<z.ZodString>;
    dateOfBirth: z.ZodOptional<z.ZodString>;
    city: z.ZodOptional<z.ZodString>;
    state: z.ZodOptional<z.ZodString>;
    partnerType: z.ZodOptional<z.ZodString>;
    acceptTerms: z.ZodBoolean;
}, z.core.$strip>;
/** Same form for a new Google user: identical fields and rules minus the password pair. */
declare const googleOnboardingSchema: z.ZodObject<{
    role: z.ZodEnum<{
        ADVERTISER: "ADVERTISER";
        SCREEN_PARTNER: "SCREEN_PARTNER";
    }>;
    fullName: z.ZodString;
    mobileNumber: z.ZodString;
    email: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    password: z.ZodString | z.ZodOptional<z.ZodString>;
    confirmPassword: z.ZodString | z.ZodOptional<z.ZodString>;
    referralCode: z.ZodOptional<z.ZodString>;
    contactPerson: z.ZodOptional<z.ZodString>;
    businessName: z.ZodOptional<z.ZodString>;
    dateOfBirth: z.ZodOptional<z.ZodString>;
    city: z.ZodOptional<z.ZodString>;
    state: z.ZodOptional<z.ZodString>;
    partnerType: z.ZodOptional<z.ZodString>;
    acceptTerms: z.ZodBoolean;
}, z.core.$strip>;
type OnboardingFormValues = z.input<typeof onboardingSchema>;

declare const updateProfileSchema: z.ZodObject<{
    fullName: z.ZodString;
}, z.core.$strip>;
type UpdateProfileFormValues = z.infer<typeof updateProfileSchema>;
declare const changePasswordSchema: z.ZodObject<{
    currentPassword: z.ZodString;
    newPassword: z.ZodString;
    confirmNewPassword: z.ZodString;
}, z.core.$strip>;
type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;
declare const bankDetailsSchema: z.ZodObject<{
    bankAccountNumber: z.ZodString;
    bankIfsc: z.ZodString;
    bankAccountName: z.ZodString;
    upiId: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
}, z.core.$strip>;
type BankDetailsFormValues = z.infer<typeof bankDetailsSchema>;

declare const screenFormSchema: z.ZodObject<{
    screenName: z.ZodString;
    categoryCode: z.ZodString;
    screenSize: z.ZodString;
    resolution: z.ZodString;
    orientation: z.ZodOptional<z.ZodEnum<{
        [x: string]: string;
    }>>;
    os: z.ZodString;
    androidVersion: z.ZodOptional<z.ZodString>;
    deviceSerialNumber: z.ZodString;
    installationAddress: z.ZodString;
    city: z.ZodString;
    state: z.ZodString;
    gpsLatitude: z.ZodCoercedNumber<unknown>;
    gpsLongitude: z.ZodCoercedNumber<unknown>;
    locationUrl: z.ZodOptional<z.ZodUnion<readonly [z.ZodLiteral<"">, z.ZodString]>>;
    internetType: z.ZodEnum<{
        [x: string]: string;
    }>;
    operatingHoursStart: z.ZodString;
    operatingHoursEnd: z.ZodString;
    ownershipDetails: z.ZodOptional<z.ZodString>;
    revenueModel: z.ZodString;
    pricePerDay: z.ZodCoercedNumber<unknown>;
    estimatedDailyImpressions: z.ZodPipe<z.ZodPipe<z.ZodOptional<z.ZodString>, z.ZodTransform<number | undefined, string | undefined>>, z.ZodOptional<z.ZodNumber>>;
    installationEnvironment: z.ZodEnum<{
        [x: string]: string;
    }>;
    dailyFootfall: z.ZodPipe<z.ZodPipe<z.ZodOptional<z.ZodString>, z.ZodTransform<number | undefined, string | undefined>>, z.ZodOptional<z.ZodNumber>>;
    deviceModel: z.ZodOptional<z.ZodString>;
    ram: z.ZodOptional<z.ZodString>;
    storage: z.ZodOptional<z.ZodString>;
    maxAdCapacity: z.ZodPipe<z.ZodPipe<z.ZodOptional<z.ZodString>, z.ZodTransform<number | undefined, string | undefined>>, z.ZodOptional<z.ZodNumber>>;
    isSelfManaged: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
type ScreenFormInput = z.input<typeof screenFormSchema>;
type ScreenFormOutput = z.output<typeof screenFormSchema>;

declare const createTicketSchema: z.ZodObject<{
    category: z.ZodEnum<{
        OTHER: "OTHER";
        ACCOUNT_ISSUES: "ACCOUNT_ISSUES";
        LOGIN_PROBLEMS: "LOGIN_PROBLEMS";
        KYC_VERIFICATION: "KYC_VERIFICATION";
        CAMPAIGN_ISSUES: "CAMPAIGN_ISSUES";
        BOOKING_ISSUES: "BOOKING_ISSUES";
        PAYMENT_ISSUES: "PAYMENT_ISSUES";
        REFUND_REQUESTS: "REFUND_REQUESTS";
        PAYOUT_ISSUES: "PAYOUT_ISSUES";
        DEVICE_ISSUES: "DEVICE_ISSUES";
        SCREEN_OFFLINE: "SCREEN_OFFLINE";
        ANDROID_PLAYER_ISSUES: "ANDROID_PLAYER_ISSUES";
        CLOUD_CMS_ISSUES: "CLOUD_CMS_ISSUES";
        TECHNICAL_SUPPORT: "TECHNICAL_SUPPORT";
        GENERAL_INQUIRY: "GENERAL_INQUIRY";
        FEATURE_REQUEST: "FEATURE_REQUEST";
        BUG_REPORT: "BUG_REPORT";
    }>;
    subject: z.ZodString;
    description: z.ZodString;
    priority: z.ZodOptional<z.ZodEnum<{
        HIGH: "HIGH";
        LOW: "LOW";
        MEDIUM: "MEDIUM";
        CRITICAL: "CRITICAL";
    }>>;
}, z.core.$strip>;
type CreateTicketFormValues = z.infer<typeof createTicketSchema>;
declare const ticketMessageSchema: z.ZodObject<{
    message: z.ZodString;
}, z.core.$strip>;
type TicketMessageFormValues = z.infer<typeof ticketMessageSchema>;

export { AADHAAR_PATTERN, ADVERTISER_BUSINESS_CATEGORIES, type AdvertiserKycFormValues, BUDGET_RANGES, BUSINESS_TYPES, type BankDetailsFormValues, type BuilderDetailsInput, type BuilderDetailsOutput, CIN_PATTERN, type CampaignFormInput, type CampaignFormOutput, type ChangePasswordFormValues, type CreateTicketFormValues, type ForgotPasswordFormValues, GST_PATTERN, IFSC_PATTERN, LEGAL_STRUCTURES, type LoginFormValues, MAX_PREFERRED_CITIES, MAX_PREFERRED_SCREEN_TYPES, MOBILE_PATTERN, type OnboardingFormValues, PAN_PATTERN, PASSWORD_PATTERN, PINCODE_PATTERN, type ResetPasswordFormValues, type ScreenFormInput, type ScreenFormOutput, type ScreenPartnerKycFormValues, type TicketMessageFormValues, UDYAM_PATTERN, type UpdateProfileFormValues, type VerifyOtpFormValues, advertiserKycSchema, bankDetailsSchema, builderDetailsSchema, campaignFormSchema, changePasswordSchema, createTicketSchema, forgotPasswordSchema, googleOnboardingSchema, loginSchema, onboardingSchema, resetPasswordSchema, screenFormSchema, screenPartnerKycSchema, ticketMessageSchema, updateProfileSchema, verifyOtpSchema };
