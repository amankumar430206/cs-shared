import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiDelete, apiGet, apiGetPaginated, apiUpload } from "../api/client";
import { getAccessToken, useHasSession } from "../api/session";
import type { PartnerAd, PartnerAdStatus, PartnerAdWithContext, ReservationAds } from "../types/partnerAds";
import type { UploadFile } from "./useKyc";

// Partner-side half of cs-web's hooks/usePartnerAds.ts (the admin review queue stays web-only).

function invalidatePartnerAdViews(queryClient: ReturnType<typeof useQueryClient>, reservationId?: string) {
  if (reservationId) queryClient.invalidateQueries({ queryKey: ["partner-ads", "reservation", reservationId] });
  queryClient.invalidateQueries({ queryKey: ["partner-ads", "mine"] });
}

export function useReservationAdsQuery(reservationId: string, options: { enabled?: boolean } = {}) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["partner-ads", "reservation", reservationId],
    queryFn: () => apiGet<ReservationAds>(`/partner-ads/reservations/${reservationId}`, getAccessToken()),
    enabled: hasAccessToken && !!reservationId && (options.enabled ?? true),
  });
}

export interface MyPartnerAdsFilters {
  status?: PartnerAdStatus;
  screenId?: string;
  page?: number;
}

export function useMyPartnerAdsQuery(filters: MyPartnerAdsFilters = {}) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["partner-ads", "mine", filters],
    queryFn: () => {
      const query = new URLSearchParams();
      if (filters.status) query.set("status", filters.status);
      if (filters.screenId) query.set("screenId", filters.screenId);
      if (filters.page) query.set("page", String(filters.page));
      const qs = query.toString();
      return apiGetPaginated<PartnerAdWithContext>(`/partner-ads/mine${qs ? `?${qs}` : ""}`, getAccessToken());
    },
    enabled: hasAccessToken,
  });
}

export interface UploadPartnerAdInput {
  file: UploadFile;
  label?: string;
  durationSeconds?: number;
  slotStartHour?: number;
  slotEndHour?: number;
}

export function useUploadPartnerAdMutation(reservationId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: UploadPartnerAdInput) => {
      const formData = new FormData();
      formData.append("file", input.file as Blob);
      if (input.label) formData.append("label", input.label);
      if (input.durationSeconds !== undefined) formData.append("durationSeconds", String(input.durationSeconds));
      // Both hours or neither — cs-api's uploadPartnerAdSchema pairs them with .and(), so one alone is a 422.
      if (input.slotStartHour !== undefined && input.slotEndHour !== undefined) {
        formData.append("slotStartHour", String(input.slotStartHour));
        formData.append("slotEndHour", String(input.slotEndHour));
      }
      return apiUpload<PartnerAd>(`/partner-ads/reservations/${reservationId}`, formData, getAccessToken());
    },
    onSuccess: () => invalidatePartnerAdViews(queryClient, reservationId),
  });
}

export function useDeletePartnerAdMutation(reservationId?: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiDelete<{ id: string }>(`/partner-ads/${id}`, getAccessToken()),
    onSuccess: () => invalidatePartnerAdViews(queryClient, reservationId),
  });
}
