import type { CampaignDocuments } from "./campaigns";
import type { FrequencyLevel } from "./checkout";

// Mirrors cs-api's modules/quotations — the negotiation cycle on a
// campaign's payment order (see quotations.service.js for the state machine).
export type QuotationStatus = "SUBMITTED" | "COUNTERED" | "APPROVED" | "REJECTED" | "PAYMENT_SUBMITTED" | "COMPLETED" | "CANCELLED";

export type QuotationAction =
  | "SUBMITTED"
  | "COUNTERED"
  | "ACCEPTED"
  | "APPROVED"
  | "REJECTED"
  | "REOPENED"
  | "RECEIPT_SUBMITTED"
  | "PAYMENT_REJECTED"
  | "COMPLETED"
  | "CANCELLED";

export interface QuotationEvent {
  id: string;
  revision: number;
  actorRole: "ADVERTISER" | "ADMIN" | "SYSTEM";
  actorName: string | null;
  action: QuotationAction;
  fromStatus: QuotationStatus | null;
  toStatus: QuotationStatus;
  amount: number | null;
  note: string | null;
  createdAt: string;
}

export interface QuotationOrderSnapshot {
  screenIds: string[];
  startDate: string;
  endDate: string;
  frequencyLevel: FrequencyLevel;
  customShares: number | null;
  estimate: {
    days: number;
    shares: number;
    subtotal: number;
    platformCharge: number;
    taxAmount: number;
    totalAmount: number;
  };
}

export interface Quotation {
  id: string;
  campaignId: string;
  campaignName: string | null;
  campaignCode: string | null;
  campaignStatus: string | null;
  advertiserId: string;
  advertiserName: string | null;
  status: QuotationStatus;
  revision: number;
  systemAmount: number;
  proposedAmount: number | null;
  counterAmount: number | null;
  approvedAmount: number | null;
  /** Approved figure once agreed, otherwise the latest offer on the table. */
  currentAmount: number;
  /** The approved amount differs from the order's list total. */
  isRevised: boolean;
  orderSnapshot: QuotationOrderSnapshot;
  paymentId: string | null;
  completedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface QuotationDetail extends Quotation {
  events: QuotationEvent[];
  documents: CampaignDocuments;
  payment: {
    id: string;
    status: string;
    referenceNumber: string | null;
    totalAmount: number;
    listAmount: number | null;
  } | null;
}

export const OPEN_QUOTATION_STATUSES: QuotationStatus[] = ["SUBMITTED", "COUNTERED", "APPROVED", "REJECTED", "PAYMENT_SUBMITTED"];

/** Whether the quoted order still matches what the builder currently has selected. */
export function quotationMatchesOrder(q: Quotation, order: { screenIds: string[]; startDate: string; endDate: string }) {
  const wanted = [...order.screenIds].sort();
  const quoted = q.orderSnapshot.screenIds;
  return (
    quoted.length === wanted.length &&
    quoted.every((id, i) => id === wanted[i]) &&
    q.orderSnapshot.startDate === order.startDate.slice(0, 10) &&
    q.orderSnapshot.endDate === order.endDate.slice(0, 10)
  );
}
