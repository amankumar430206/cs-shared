// Types mirroring cs-api's modules/partnerAds responses (copied from cs-web's hooks/usePartnerAds.ts).
//
// A screen partner's OWN ad, running on the slots they reserved out of their own screen's capacity — free, no
// campaign, no booking behind it. See cs-api's 20260101000095 migration for why this is separate from `Creative`.

export type PartnerAdStatus = "PENDING_REVIEW" | "APPROVED" | "REJECTED";

export interface PartnerAd {
  id: string;
  selfReservationId: string;
  screenId: string;
  /** Usually the partner's own offline client — the only name a partner ad ever gets. */
  label: string | null;
  originalFilename: string;
  contentType: string;
  fileSize: number;
  durationSeconds: number | null;
  slotStartHour: number | null;
  slotEndHour: number | null;
  status: PartnerAdStatus;
  rejectionReason: string | null;
  submittedAt: string;
  reviewedAt: string | null;
  createdAt: string;
  downloadUrl?: string;
}

export interface PartnerAdWithContext extends PartnerAd {
  screenName: string;
  screenCity: string;
  reservationStartDate: string;
  reservationEndDate: string;
  reservationSlotCount: number;
  reservationStatus: string;
  /** Admin queue only. */
  partnerBusinessName?: string;
}

/** What one reserved block currently holds — its slot ceiling and the ads in it. */
export interface ReservationAds {
  slotCount: number;
  usedSlots: number;
  availableSlots: number;
  ads: PartnerAd[];
}
