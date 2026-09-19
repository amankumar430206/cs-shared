// Types mirroring cs-api's modules/pricing and modules/bookings responses.
import { getTodayIST } from "./date";

export interface PriceLineItem {
  screenId: string;
  /** The advertiser-facing daily rate (partner base + CASTADI markup) — what each day actually costs. */
  listedDailyRate: number;
  days: number;
  screenPrice: number;
  platformCharge: number;
  taxAmount: number;
  totalAmount: number;
}

export interface PriceBreakdown {
  days: number;
  lineItems: PriceLineItem[];
  subtotal: number;
  platformCharge: number;
  taxAmount: number;
  totalAmount: number;
}

export type BookingStatus = "RESERVED" | "CONFIRMED" | "EXPIRED" | "CANCELLED";

export interface Booking {
  id: string;
  campaignId: string;
  screenId: string;
  startDate: string;
  endDate: string;
  /** Intra-day slot window — null on a full-day booking. */
  slotStartHour: number | null;
  slotEndHour: number | null;
  status: BookingStatus;
  /** Advertiser-facing daily rate for this booking. */
  listedDailyRate: number;
  days: number;
  screenPrice: number;
  platformCharge: number;
  taxAmount: number;
  totalAmount: number;
  reservedUntil: string;
  createdAt: string;
}

export interface CreateBookingResult {
  bookings: Booking[];
  priceBreakdown: PriceBreakdown;
}

export interface PartnerBooking extends Booking {
  screenName: string;
  screenCity: string;
}

export interface AdvertiserBooking extends Booking {
  screenName: string;
  screenCity: string;
  campaignName: string;
}

export function formatShortDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

export function formatDateRange(startDate: string, endDate: string): string {
  const start = startDate.slice(0, 10);
  const end = endDate.slice(0, 10);
  return start === end ? formatShortDate(startDate) : `${formatShortDate(startDate)} – ${formatShortDate(endDate)}`;
}

export type LiveWindowStatus = "live" | "upcoming" | "ended";

// The "N day(s)" count alone hides *which* day — this makes the actual
// window (and whether it covers today) visible at a glance, since a
// CONFIRMED booking whose dates simply don't include today is otherwise
// indistinguishable from a real playback problem (nothing in the sync
// response or the player itself says "your booking dates are wrong").
export function liveWindowStatus(booking: Pick<Booking, "status" | "startDate" | "endDate">, campaignStatus: string): LiveWindowStatus | null {
  if (booking.status !== "CONFIRMED") return null;
  const today = getTodayIST();
  const start = booking.startDate.slice(0, 10);
  const end = booking.endDate.slice(0, 10);
  if (today < start) return "upcoming";
  if (today > end) return "ended";
  return campaignStatus === "ACTIVE" ? "live" : "upcoming";
}
