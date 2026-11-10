import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiGet, apiGetPaginated, apiPost } from "../api/client";
import { getAccessToken, useHasSession } from "../api/session";
import { REFERRAL_CODE_MIN_LENGTH, type MyReferral, type MyReferrer, type ReferralCheck, type ReferredPerson } from "../types/referrals";

// Copied from cs-web hooks/useReferrals.ts — keep in sync.

/** Public call, used while registering — no login needed. */
export const checkReferralCode = (code: string) => apiGet<ReferralCheck>(`/referrals/check?code=${encodeURIComponent(code.trim())}`);

/** Live check of a typed code; stays idle until the code is long enough to be worth asking. */
export function useReferralCheckQuery(code: string) {
  const trimmed = code.trim();
  return useQuery({
    queryKey: ["referrals", "check", trimmed.toUpperCase()],
    queryFn: () => checkReferralCode(trimmed),
    enabled: trimmed.length >= REFERRAL_CODE_MIN_LENGTH,
    staleTime: 5 * 60_000,
    retry: false,
  });
}

// --- Screen owner ---------------------------------------------------------

export function useMyReferralQuery() {
  const hasToken = useHasSession();
  return useQuery({
    queryKey: ["referrals", "mine"],
    queryFn: () => apiGet<MyReferral>("/referrals/mine", getAccessToken()),
    enabled: hasToken,
  });
}

export function useReferredPeopleQuery(role: ReferredPerson["role"] | "", page = 1, limit = 20) {
  const hasToken = useHasSession();
  return useQuery({
    queryKey: ["referrals", "people", role, page, limit],
    queryFn: () => {
      const query = new URLSearchParams({ page: String(page), limit: String(limit) });
      if (role) query.set("role", role);
      return apiGetPaginated<ReferredPerson>(`/referrals/mine/people?${query.toString()}`, getAccessToken());
    },
    enabled: hasToken,
    placeholderData: keepPreviousData,
  });
}

// --- Any signed-in advertiser / owner --------------------------------------

export function useMyReferrerQuery(enabled = true) {
  const hasToken = useHasSession();
  return useQuery({
    queryKey: ["referrals", "me"],
    queryFn: () => apiGet<MyReferrer>("/referrals/me", getAccessToken()),
    enabled: hasToken && enabled,
  });
}

/** Links an existing account to a referrer once; it never changes afterwards. */
export function useApplyReferralMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (code: string) => apiPost<MyReferrer>("/referrals/apply", { code: code.trim() }, getAccessToken()),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["referrals"] }),
  });
}
