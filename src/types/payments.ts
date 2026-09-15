// Types mirroring cs-api's modules/payments responses.

export type PaymentStatus = "INITIATED" | "SUCCESSFUL" | "FAILED";

// Mirrors cs-api's payments.validators.js MANUAL_SETTLEMENT_MODES — only
// ever set on a manually-approved payment, null for a real gateway payment.
export const SETTLEMENT_MODES = [
  { value: "CASH", label: "Cash" },
  { value: "BANK_TRANSFER", label: "Bank transfer" },
  { value: "INTERNAL_SETTLEMENT", label: "Internal settlement" },
  { value: "OTHER", label: "Other" },
] as const;
export type SettlementMode = (typeof SETTLEMENT_MODES)[number]["value"];

// Only populated on a single-row detail fetch (findPaymentByIdForAdvertiser/
// findInvoiceByIdForAdvertiser join advertisers; the paginated list queries
// don't) — the "Bill to" block on a printable invoice/receipt.
export interface AdvertiserBillingInfo {
  advertiserBusinessName?: string;
  advertiserGstNumber?: string;
  advertiserAddress?: string;
  advertiserBillingState?: string;
  advertiserBillingPincode?: string;
}

export interface Payment extends AdvertiserBillingInfo {
  id: string;
  campaignId: string;
  campaignName?: string;
  status: PaymentStatus;
  screenAmount: number;
  platformCommission: number;
  taxAmount: number;
  totalAmount: number;
  /** Derived from this payment's own amounts (never a live fee-config read — see cs-api's derivedPercent). */
  platformFeePercent: number;
  gstRatePercent: number;
  currency: string;
  // Null for a raised payment request that hasn't gone through Razorpay yet
  // (or was resolved by an admin directly) — see PaymentButton/
  // RaisePaymentRequestButton.
  gatewayOrderId: string | null;
  gatewayPaymentId: string | null;
  failureReason: string | null;
  settlementMode: SettlementMode | null;
  settlementNote: string | null;
  /** CSP-YYYYMMDD-###### — null for a payment created before this existed. */
  referenceNumber: string | null;
  createdAt: string;
  // Only ever set once this payment is SUCCESSFUL (an invoice is generated
  // the moment it is), and only populated by getPaymentStatus's own
  // campaign-scoped lookup (GET /payments/:campaignId) — absent (not just
  // null) on every other Payment-shaped response (the payments list,
  // transaction detail, admin queue), which don't do the extra join.
  invoiceId?: string | null;
  /** CSIN-YYYYMMDD-###### */
  invoiceNumber?: string | null;
  invoiceIssuedAt?: string | null;
}

export interface CreateOrderResult {
  paymentId: string;
  orderId: string;
  amount: number;
  currency: string;
  keyId: string;
  /** Razorpay Customer id, lazily created — null if that step failed (checkout still proceeds, just without the saved-methods option). */
  customerId: string | null;
}

// The advertiser's own saved cards/UPI (Billing > Payment Methods) — read
// live from Razorpay's Customer/Token APIs, nothing stored locally.
export interface SavedPaymentMethod {
  id: string;
  method: string;
  card: { network: string; last4: string; type: string } | null;
  vpa: string | null;
  bank: string | null;
  createdAt: string | null;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  campaignId: string;
  campaignName: string;
  amount: number;
  taxAmount: number;
  totalAmount: number;
  issuedAt: string;
}

export interface InvoiceDetail extends AdvertiserBillingInfo {
  id: string;
  invoiceNumber: string;
  campaignId: string;
  campaignName: string;
  campaignStatus: string;
  screenAmount: number;
  platformCommission: number;
  taxAmount: number;
  totalAmount: number;
  /** Derived from this invoice's own amounts (never a live fee-config read — see cs-api's derivedPercent). */
  platformFeePercent: number;
  gstRatePercent: number;
  currency: string;
  gatewayOrderId: string | null;
  gatewayPaymentId: string | null;
  settlementMode: SettlementMode | null;
  settlementNote: string | null;
  paidAt: string;
  issuedAt: string;
}

// Billing > Invoices / Transactions toolbar — shared shape, though invoices
// have no `status` of their own (see cs-api's applyInvoiceFilters).
export interface BillingFilters {
  status?: PaymentStatus | "";
  dateFrom?: string;
  dateTo?: string;
  search?: string;
}
