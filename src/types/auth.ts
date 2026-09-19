export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

export type UserRole = "ADVERTISER" | "SCREEN_PARTNER" | "ADMINISTRATOR" | "SUPER_ADMINISTRATOR";

export interface CurrentUser {
  id: string;
  role: UserRole;
  full_name: string;
  email: string;
  mobile_number: string;
  status: string;
  /** UI language saved on the account ("en" | "hi"). */
  preferred_language?: "en" | "hi";
  advertiser?: {
    id: string;
    business_name: string;
    verification_status: string;
    bank_account_number: string | null;
    bank_ifsc: string | null;
    bank_account_name: string | null;
    upi_id: string | null;
  };
  screenPartner?: {
    id: string;
    partner_type: string;
    kyc_status: string;
    bank_account_number: string | null;
    bank_ifsc: string | null;
    bank_account_name: string | null;
    upi_id: string | null;
  };
}
