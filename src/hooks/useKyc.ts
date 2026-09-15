import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiGet, apiPatch, apiPost, apiUpload } from "../api/client";
import type { KycDocument, PendingAdvertiserRow, PendingScreenPartnerRow } from "../types/kyc";
import { getAccessToken, session, useHasSession, useSession } from "../api/session";

interface KycSubmitResult {
  verificationStatus?: string;
  kycStatus?: string;
}

export function useMyKycQuery<T>() {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["kyc", "me"],
    queryFn: () => apiGet<T>("/kyc/me", getAccessToken()),
    enabled: hasAccessToken,
  });
}

export function useMyDocumentsQuery() {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["kyc", "documents", "me"],
    queryFn: () => apiGet<KycDocument[]>("/kyc/documents/me", getAccessToken()),
    enabled: hasAccessToken,
  });
}

export function useSubmitKycMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    // getState() at call time, not a render-time hook value — this mutation
    // is often fired immediately after useVerifyOtpMutation's onSuccess sets
    // the token, before React has re-rendered (see hooks/useTheme.ts).
    mutationFn: (payload: Record<string, unknown>) =>
      apiPost<KycSubmitResult>("/kyc/submit", payload, getAccessToken()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kyc", "me"] });
    },
  });
}

interface UploadDocumentInput {
  documentType: string;
  file: File;
}

interface UploadDocumentResult {
  id: string;
  documentType: string;
  uploadedAt: string;
}

export function useUploadDocumentMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ documentType, file }: UploadDocumentInput) => {
      const formData = new FormData();
      formData.append("documentType", documentType);
      formData.append("file", file);
      return apiUpload<UploadDocumentResult>("/kyc/documents", formData, getAccessToken());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kyc", "documents", "me"] });
    },
  });
}

interface BankDetailsInput {
  bankAccountNumber: string;
  bankIfsc: string;
  bankAccountName: string;
  upiId?: string;
}

export function useUpdateBankDetailsMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: BankDetailsInput) =>
      apiPatch<BankDetailsInput>("/kyc/screen-partners/me/bank-details", input, getAccessToken()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
    },
  });
}

export function useUpdateAdvertiserBankDetailsMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: BankDetailsInput) =>
      apiPatch<BankDetailsInput>("/kyc/advertisers/me/bank-details", input, getAccessToken()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
    },
  });
}

// --- Admin review queue ---

export function usePendingAdvertisersQuery(options: { enabled?: boolean } = {}) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["kyc", "pending", "advertisers"],
    queryFn: () => apiGet<PendingAdvertiserRow[]>("/kyc/pending/advertisers", getAccessToken()),
    enabled: hasAccessToken && (options.enabled ?? true),
  });
}

export function usePendingScreenPartnersQuery(options: { enabled?: boolean } = {}) {
  const hasAccessToken = useHasSession();
  return useQuery({
    queryKey: ["kyc", "pending", "screen-partners"],
    queryFn: () =>
      apiGet<PendingScreenPartnerRow[]>("/kyc/pending/screen-partners", getAccessToken()),
    enabled: hasAccessToken && (options.enabled ?? true),
  });
}

export function useKycDocumentsQuery(kind: "advertisers" | "screen-partners", id: string, enabled: boolean) {
  return useQuery({
    queryKey: ["kyc", kind, id, "documents"],
    queryFn: () => apiGet<KycDocument[]>(`/kyc/${kind}/${id}/documents`, getAccessToken()),
    enabled,
  });
}

function useReviewMutation(kind: "advertisers" | "screen-partners", decision: "approve" | "reject") {
  const queryClient = useQueryClient();
  const queueKey = kind === "advertisers" ? ["kyc", "pending", "advertisers"] : ["kyc", "pending", "screen-partners"];
  return useMutation({
    mutationFn: ({ id, reason }: { id: string; reason?: string }) =>
      apiPost(`/kyc/${kind}/${id}/${decision}`, reason ? { reason } : undefined, getAccessToken()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queueKey });
    },
  });
}

export const useApproveAdvertiserMutation = () => useReviewMutation("advertisers", "approve");
export const useRejectAdvertiserMutation = () => useReviewMutation("advertisers", "reject");
export const useApproveScreenPartnerMutation = () => useReviewMutation("screen-partners", "approve");
export const useRejectScreenPartnerMutation = () => useReviewMutation("screen-partners", "reject");
