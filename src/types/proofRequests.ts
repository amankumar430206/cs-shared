// Types mirroring cs-api's modules/proofRequests responses. A proof request is
// "show us campaign X playing on screen Y"; the screen partner answers it with
// a photo. See docs/plan/proof-of-play-requests.md.
export type ProofRequestStatus = "PENDING" | "SUBMITTED" | "VERIFIED" | "OVERDUE" | "WAIVED";
export type ProofRequestSource = "AUTO_GO_LIVE" | "ADVERTISER" | "PARTNER";

export interface ProofRequest {
  id: string;
  campaignId: string;
  campaignName?: string;
  screenId: string;
  screenName?: string;
  source: ProofRequestSource;
  status: ProofRequestStatus;
  note: string | null;
  requestedAt: string;
  dueAt: string;
  submittedAt: string | null;
  /** True when a COMPLETED playback was logged within minutes of the photo. */
  playbackMatched: boolean;
  waivedReason: string | null;
}

export interface ProofRequestPhoto {
  id: string;
  caption: string | null;
  capturedAt: string;
  uploadedAt: string;
  downloadUrl: string;
}

export interface CampaignProofRequest extends ProofRequest {
  photos: ProofRequestPhoto[];
}

/** One row of the partner's picker: a campaign live on the screen, with its open or latest request. */
export interface ScreenLiveCampaign {
  campaignId: string;
  campaignName: string;
  request: Pick<ProofRequest, "id" | "status" | "source" | "note" | "requestedAt" | "dueAt" | "submittedAt" | "playbackMatched"> | null;
}

export interface ProofRequestSummary {
  PENDING: number;
  SUBMITTED: number;
  VERIFIED: number;
  OVERDUE: number;
  WAIVED: number;
  /** PENDING + OVERDUE. */
  open: number;
}

export const isOpen = (status: ProofRequestStatus) => status === "PENDING" || status === "OVERDUE";
