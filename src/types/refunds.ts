// Types mirroring cs-api's modules/refunds responses.

export type RefundMethod = "GATEWAY" | "WALLET" | "MANUAL";
export type RefundStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface Refund {
  id: string;
  paymentId: string;
  campaignId: string;
  amount: number;
  method: RefundMethod;
  status: RefundStatus;
  rejectionReason: string | null;
  reviewedAt: string | null;
  createdAt: string;
}

/** Admin worklist row — a refund request joined to its campaign/advertiser. */
export interface AdminRefund extends Refund {
  campaignName: string;
  advertiserBusinessName: string;
}
