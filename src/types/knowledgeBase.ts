// Types mirroring cs-api's modules/knowledgeBase responses.

export const KB_CATEGORIES = [
  { value: "ACCOUNT_SETUP", label: "Account Setup" },
  { value: "CAMPAIGN_MANAGEMENT", label: "Campaign Management" },
  { value: "SCREEN_REGISTRATION", label: "Screen Registration" },
  { value: "ANDROID_PLAYER", label: "Android Player" },
  { value: "PAYMENTS", label: "Payments" },
  { value: "PAYOUTS", label: "Payouts" },
  { value: "KYC", label: "KYC" },
  { value: "TROUBLESHOOTING", label: "Troubleshooting" },
  { value: "FAQ", label: "FAQ" },
] as const;
export type KbCategory = (typeof KB_CATEGORIES)[number]["value"];

export interface KbArticle {
  id: string;
  category: KbCategory;
  title: string;
  body: string;
  published: boolean;
  createdBy: string | null;
  createdAt: string;
  updatedAt: string;
}
