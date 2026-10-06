interface TokenPair {
    accessToken: string;
    refreshToken: string;
}
/** POST /auth/google result: either signed in, or a new Google identity that must complete its profile. */
type GoogleAuthResult = ({
    status: "AUTHENTICATED";
} & TokenPair) | {
    status: "PROFILE_REQUIRED";
    signupToken: string;
    email: string;
    fullName: string;
};
type UserRole = "ADVERTISER" | "SCREEN_PARTNER" | "ADMINISTRATOR" | "SUPER_ADMINISTRATOR";
interface CurrentUser {
    id: string;
    role: UserRole;
    full_name: string;
    email: string;
    mobile_number: string;
    status: string;
    /** ISO timestamps; null until that channel is verified. */
    mobile_verified_at?: string | null;
    email_verified_at?: string | null;
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

export type { CurrentUser as C, GoogleAuthResult as G, TokenPair as T, UserRole as U };
