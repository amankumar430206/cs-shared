import { keepPreviousData, useMutation, useQueries, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiGet, apiGetPaginated, apiPost } from "../api/client";
import { getAccessToken, useHasSession } from "../api/session";
import type { CampaignQuote, QuoteInput } from "../types/checkout";
import type { AllowedAdvertiser, Coupon, CouponOffer, CouponRedemption, CouponStatus, CouponSummary } from "../types/coupons";

// Screen-owner coupons — copied from cs-web hooks/useCoupons.ts (owner + advertiser
// parts only; admin and the create/edit sheet stay on the web). Keep in sync.
// The module sits behind the `coupons.module` feature flag: while it is off
// /coupons/mine/* answers 404 and offers come back empty, so callers should
// gate the UI on `useFeatureFlagsQuery` + `isFlagOn(flags, COUPONS_FLAG)`.

// --- Screen owner ---------------------------------------------------------

export function useMyCouponsQuery(page = 1, enabled = true) {
  const hasToken = useHasSession();
  return useQuery({
    queryKey: ["coupons", "mine", "list", page],
    queryFn: () => apiGetPaginated<Coupon>(`/coupons/mine?page=${page}&limit=20`, getAccessToken()),
    enabled: hasToken && enabled,
    placeholderData: keepPreviousData,
  });
}

export function useMyCouponSummaryQuery(enabled = true) {
  const hasToken = useHasSession();
  return useQuery({
    queryKey: ["coupons", "mine", "summary"],
    queryFn: () => apiGet<CouponSummary>("/coupons/mine/summary", getAccessToken()),
    enabled: hasToken && enabled,
  });
}

export function useMyCouponRedemptionsQuery(couponId: string | null) {
  const hasToken = useHasSession();
  return useQuery({
    queryKey: ["coupons", "mine", "redemptions", couponId],
    queryFn: () => apiGetPaginated<CouponRedemption>(`/coupons/mine/${couponId}/redemptions?limit=50`, getAccessToken()),
    enabled: hasToken && !!couponId,
  });
}

export function useCouponAdvertisersQuery(couponId: string | null) {
  const hasToken = useHasSession();
  return useQuery({
    queryKey: ["coupons", "mine", "advertisers", couponId],
    queryFn: () => apiGet<AllowedAdvertiser[]>(`/coupons/mine/${couponId}/advertisers`, getAccessToken()),
    enabled: hasToken && !!couponId,
  });
}

/** Switch a coupon on or off. An owner cannot re-activate a coupon an admin deactivated (the server says so). */
export function useSetMyCouponStatusMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: CouponStatus }) => apiPost<Coupon>(`/coupons/mine/${id}/status`, { status }, getAccessToken()),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["coupons"] }),
  });
}

// --- Advertiser -----------------------------------------------------------

/** Coupons this advertiser may use on the screens in their cart: public offers plus private ones that name them. */
export function useCouponOffersQuery(screenIds: string[], enabled = true) {
  const hasToken = useHasSession();
  const key = [...screenIds].sort().join(",");
  return useQuery({
    queryKey: ["coupons", "offers", key],
    queryFn: () => apiGet<CouponOffer[]>(`/coupons/offers?screenIds=${key}`, getAccessToken()),
    enabled: hasToken && enabled && screenIds.length > 0,
    staleTime: 60_000,
  });
}

const OFFER_CHUNK = 40;

/**
 * Offers for every screen on a results page, as screenId -> offers. Screens are
 * looked up in batches of 40 so a long list never makes an oversized request.
 * Only advertisers are shown offers, so other roles pass enabled = false.
 */
export function useCouponOffersByScreen(screenIds: string[], enabled: boolean) {
  const hasToken = useHasSession();
  const chunks: string[][] = [];
  for (let i = 0; i < screenIds.length; i += OFFER_CHUNK) chunks.push(screenIds.slice(i, i + OFFER_CHUNK));

  const results = useQueries({
    queries: chunks.map((chunk) => {
      const key = [...chunk].sort().join(",");
      return {
        queryKey: ["coupons", "offers", key],
        queryFn: () => apiGet<CouponOffer[]>(`/coupons/offers?screenIds=${key}`, getAccessToken()),
        enabled: hasToken && enabled,
        staleTime: 60_000,
        retry: false,
      };
    }),
  });

  const byScreen = new Map<string, CouponOffer[]>();
  for (const result of results) {
    for (const offer of result.data ?? []) {
      for (const screenId of offer.screenIds) byScreen.set(screenId, [...(byScreen.get(screenId) ?? []), offer]);
    }
  }
  return byScreen;
}

/** Checks a code against the current cart by pricing it; resolves with the discounted quote or rejects with the reason (422). */
export function useValidateCouponMutation() {
  return useMutation({
    mutationFn: ({ input, couponCode }: { input: QuoteInput; couponCode: string }) =>
      apiPost<CampaignQuote>("/pricing/estimate", { ...input, couponCode }, getAccessToken()),
  });
}
