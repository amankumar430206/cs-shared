// Types mirroring cs-api's modules/creatives responses.

export type CreativeStatus = "PENDING_REVIEW" | "APPROVED" | "REJECTED";

// Which object storage this file actually landed in at upload time — see
// cs-api's currentStorageProvider(). Recorded per-row, so it reflects
// reality even after USE_R2_LOCAL changes.
export type StorageProvider = "LOCAL" | "R2";

export interface Creative {
  id: string;
  campaignId: string;
  originalFilename: string;
  contentType: string;
  fileSize: number;
  durationSeconds: number | null;
  /** Displayed pixel size, measured by cs-api from the file itself — null for older uploads. */
  width?: number | null;
  height?: number | null;
  storageProvider: StorageProvider;
  label: string | null;
  tags: string[];
  status: CreativeStatus;
  rejectionReason: string | null;
  submittedAt: string;
  reviewedAt: string | null;
  downloadUrl: string;
  /** The Media Library asset backing this creative — every creative is linked to one now, whether it started as a direct campaign upload or a library asset applied to a campaign. */
  mediaAssetId: string | null;
  /** Optional time-of-day restriction — the creative only rotates into a screen's playlist while the current hour falls in [slotStartHour, slotEndHour). Both null means no restriction. */
  slotStartHour: number | null;
  slotEndHour: number | null;
  /** Set only once a rejected creative's payment share has been credited to the wallet (see useWallet's useCreditRejectedCreativeToWalletMutation) — null otherwise, including a rejected creative still awaiting the advertiser's choice. */
  walletCreditedAt: string | null;
  walletCreditAmount: number | null;
}

export interface PendingCreative extends Creative {
  campaignName: string;
}

export interface LiveScreen {
  screenId: string;
  screenName: string;
  installationAddress: string;
  city: string;
  state: string;
  gpsLatitude: number;
  gpsLongitude: number;
  /** Not a credential — an opaque id for GET /devices/:deviceId/preview/mine. */
  deviceId: string | null;
  /** True if this screen's player has sent a heartbeat within the last 5 minutes. */
  isLive: boolean;
  campaignId: string;
  campaignName: string;
  creative: {
    id: string;
    originalFilename: string;
    contentType: string;
    durationSeconds: number | null;
    downloadUrl: string;
  };
}
