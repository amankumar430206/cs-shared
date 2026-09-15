import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiGet, apiPatch, apiPost } from "../api/client";
import type { CurrentUser, TokenPair } from "../types/auth";
import { getAccessToken, session, useHasSession, useSession } from "../api/session";

export function useMeQuery() {
  // Reactive selector drives `enabled` (React re-renders when it flips);
  // queryFn reads via getState() so it always sees the latest token even if
  // called right after another mutation's onSuccess in the same handler.
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["auth", "me"],
    queryFn: () => apiGet<CurrentUser>("/auth/me", getAccessToken()),
    enabled: hasAccessToken,
  });
}

interface LoginInput {
  identifier: string;
  password: string;
}

export function useLoginMutation() {
  const setSession = session.setTokens;
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: LoginInput) => apiPost<TokenPair>("/auth/login", input),
    onSuccess: async (tokens) => {
      setSession(tokens);
      await queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
    },
  });
}

export interface RegisterInput {
  fullName: string;
  mobileNumber: string;
  email?: string;
  password: string;
  role: "ADVERTISER" | "SCREEN_PARTNER";
  referralCode?: string;
  businessName?: string;
  contactPerson?: string;
  businessType?: string;
  budgetRange?: string;
  partnerType?: string;
  dateOfBirth?: string;
  city?: string;
  state?: string;
  /** Redeems a team invite — joins the inviter's advertiser account instead
   * of creating a new one; businessName/contactPerson are omitted in this
   * case (the backend rejects them alongside an inviteCode). */
  inviteCode?: string;
}

export interface RegisterResult {
  userId: string;
  status: string;
}

export function useRegisterMutation() {
  return useMutation({
    mutationFn: (input: RegisterInput) => apiPost<RegisterResult>("/auth/register", input),
  });
}

// OnboardingWizard calls this advancing off the Account step, so a
// duplicate email/mobile surfaces there instead of only after Review's
// "Create account" click. `available: false` never says which field
// collided — same non-disclosure rule as the actual registration 409.
export function useCheckAvailabilityMutation() {
  return useMutation({
    mutationFn: (input: { mobileNumber: string; email?: string }) =>
      apiPost<{ available: boolean }>("/auth/check-availability", input),
  });
}

// `accessToken` is the JWT MSG91's OTP widget hands back after the user
// enters a correct code (see verify-otp page's useVerifyWidgetOtp call) —
// cs-web never sends the code itself to cs-api, only this token.
interface VerifyOtpInput {
  userId: string;
  accessToken: string;
}

export function useVerifyOtpMutation() {
  const setSession = session.setTokens;
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: VerifyOtpInput) => apiPost<TokenPair>("/auth/verify-otp", input),
    onSuccess: async (tokens) => {
      setSession(tokens);
      await queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
    },
  });
}

// There's no forgot-password/resend-otp backend call anymore — sending
// (and resending) an OTP is a direct client-side call to MSG91's widget
// (see lib/msg91Widget.ts's sendWidgetOtp/retryWidgetOtp), with no cs-api
// involvement at all. That's also what keeps the enumeration-safety
// property (nothing account-specific happens until reset-password below,
// same reasoning cs-api's auth.service.js documents).
interface ResetPasswordInput {
  identifier: string;
  accessToken: string;
  newPassword: string;
}

export function useResetPasswordMutation() {
  return useMutation({
    mutationFn: (input: ResetPasswordInput) => apiPost<{ status: string }>("/auth/reset-password", input),
  });
}

interface ChangePasswordInput {
  currentPassword: string;
  newPassword: string;
}

export function useChangePasswordMutation() {
  return useMutation({
    mutationFn: (input: ChangePasswordInput) =>
      apiPatch<{ status: string }>("/auth/change-password", input, getAccessToken()),
  });
}

export function useUpdateProfileMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: { fullName: string }) =>
      apiPatch<CurrentUser>("/auth/me", input, getAccessToken()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
    },
  });
}

// Self-service only — an Administrator changes these directly instead (see
// useAdmin.ts's useAdminUpdateUserContactMutation). `accessToken` is the
// MSG91 widget's proof the caller verified the NEW value, not the
// account's current one — see cs-api's auth.service.js.
export function useChangeMobileNumberMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: { newMobileNumber: string; accessToken: string }) =>
      apiPatch<CurrentUser>("/auth/me/mobile-number", input, getAccessToken()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
    },
  });
}

export function useChangeEmailMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: { newEmail: string; accessToken: string }) =>
      apiPatch<CurrentUser>("/auth/me/email", input, getAccessToken()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
    },
  });
}

export function useLogout() {
  const logout = session.clear;
  const queryClient = useQueryClient();
  return () => {
    logout();
    queryClient.removeQueries({ queryKey: ["auth", "me"] });
  };
}
