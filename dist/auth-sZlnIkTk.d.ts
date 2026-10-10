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
/** One logged-in browser or app install (GET /auth/sessions). */
interface AuthSession {
    id: string;
    platform: "web" | "mobile";
    deviceName: string | null;
    ipAddress: string | null;
    /** Device the user confirmed ("yes, that was me"); false = still unreviewed. */
    trusted: boolean;
    /** True for the session making this request. */
    current: boolean;
    createdAt: string;
    lastUsedAt: string;
}
/** `details[0]` of a 409 SESSION_LIMIT_REACHED login response. */
interface SessionLimitDetail {
    loginTicket: string;
    platform: "web" | "mobile";
    limit: number;
    sessions: AuthSession[];
}
/** One row of GET /auth/activity: a login-related event on the account, display-ready. */
interface LoginActivityEvent {
    id: string;
    action: string;
    title: string;
    /** "warning" for failed/blocked/suspicious events. */
    tone: "default" | "warning";
    /** Best-effort "Chrome on Windows" label. */
    device: string;
    ipAddress: string | null;
    createdAt: string;
}

export type { AuthSession as A, CurrentUser as C, GoogleAuthResult as G, LoginActivityEvent as L, SessionLimitDetail as S, TokenPair as T, UserRole as U };
