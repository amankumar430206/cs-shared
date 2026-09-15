// Types mirroring cs-api's modules/wallet responses.

export interface Wallet {
  id: string;
  balance: number;
  updatedAt: string;
  transactions: WalletTransaction[];
}

export type WalletTransactionType = "TOPUP" | "CAMPAIGN_PAYMENT" | "REFUND" | "ADJUSTMENT";
export type WalletTransactionStatus = "INITIATED" | "SUCCESSFUL" | "FAILED";

export interface WalletTransaction {
  id: string;
  type: WalletTransactionType;
  status: WalletTransactionStatus;
  /** Signed — positive for a credit (TOPUP, REFUND), negative for a debit (CAMPAIGN_PAYMENT). */
  amount: number;
  balanceAfter: number | null;
  campaignId: string | null;
  paymentId: string | null;
  description: string | null;
  createdAt: string;
}

export interface CreateTopUpOrderResult {
  orderId: string;
  amount: number;
  currency: string;
  keyId: string;
}

export interface PayCampaignFromWalletResult {
  wallet: Wallet;
  paymentId: string;
}

export interface CreditRejectedCreativeResult {
  wallet: Wallet;
  /** The rejected creative's share of its campaign's payment, just credited. */
  amount: number;
}
