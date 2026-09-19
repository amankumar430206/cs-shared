// Copied from cs-web src/lib/checkout.ts — keep in sync.
// Types mirroring cs-api's simplified-builder endpoints: /pricing/estimate
// with frequency + delivery, /settings/delivery, /settings/payments and
// /checkout/campaigns/:id.
import type { PriceBreakdown } from "./bookings";

/** Share of screen time — Standard = 1 share, High Visibility = 2, Custom = 1..4 (cs-api modules/delivery). */
export type FrequencyLevel = "STANDARD" | "HIGH" | "CUSTOM";
export const MAX_CUSTOM_SHARES = 4;

export interface ScreenDeliveryEstimate {
  screenId: string;
  /** Guaranteed floor: plays per day even if the screen is fully booked. */
  minPlaysPerDay: number;
  /** null when the screen has no footfall/impressions figure to estimate from. */
  estimatedViewsPerDay: number | null;
}

export interface DeliveryEstimate {
  days: number;
  perScreen: ScreenDeliveryEstimate[];
  minPlaysPerDay: number;
  minTotalPlays: number;
  estimatedViewsPerDay: number | null;
  estimatedTotalViews: number | null;
}

/** /pricing/estimate with frequency — price and (when adDuration is sent) delivery in one response. */
export interface CampaignQuote extends PriceBreakdown {
  shares: number;
  delivery?: DeliveryEstimate;
}

export interface QuoteInput {
  screenIds: string[];
  startDate: string;
  endDate: string;
  frequencyLevel: FrequencyLevel;
  customShares?: number;
  adDuration?: number;
}

export interface DeliveryConfig {
  levelShares: { STANDARD: number; HIGH: number };
  dwellSeconds: number;
  attentionFactor: number;
}

export interface PaymentsConfig {
  /** When on, "Pay & Launch" raises a payment request an admin approves instead of paying straight away. */
  requireAdminApproval: boolean;
}

export type PaymentMethod = "RAZORPAY" | "WALLET";

export type CheckoutResult =
  | {
      method: "RAZORPAY";
      totalAmount: number;
      order: { paymentId: string; orderId: string; amount: number; currency: string; keyId: string; customerId: string | null };
    }
  | { method: "WALLET"; totalAmount: number }
  | { method: "REQUEST"; totalAmount: number };
