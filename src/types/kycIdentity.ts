// Screen-partner identity rule: of Aadhaar, PAN and Driving Licence, at least MIN_IDENTITY_PROOFS must be
// provided to submit KYC. An ID counts when its number is typed OR its document is uploaded (a document an
// admin REJECTED does not count). Every other document is optional. Mirrors cs-api's modules/kyc/kyc.identity.js
// (which is what actually enforces it) — keep in sync; cs-web has a copy at src/lib/kycIdentity.ts.

export const MIN_IDENTITY_PROOFS = 2;

export type IdentityProofKey = "AADHAAR" | "PAN" | "DRIVING_LICENSE";

export interface IdentityProof {
  key: IdentityProofKey;
  label: string;
  numberField: "aadhaarNumber" | "panNumber" | "drivingLicenseNumber";
  documentType: "AADHAAR_CARD" | "PAN_CARD" | "DRIVING_LICENSE";
}

export const IDENTITY_PROOFS: readonly IdentityProof[] = [
  { key: "AADHAAR", label: "Aadhaar", numberField: "aadhaarNumber", documentType: "AADHAAR_CARD" },
  { key: "PAN", label: "PAN", numberField: "panNumber", documentType: "PAN_CARD" },
  { key: "DRIVING_LICENSE", label: "Driving Licence", numberField: "drivingLicenseNumber", documentType: "DRIVING_LICENSE" },
];

export interface IdentityProofValues {
  aadhaarNumber?: string;
  panNumber?: string;
  drivingLicenseNumber?: string;
}

export interface IdentityDocument {
  documentType: string;
  reviewStatus?: string;
}

export interface IdentityEvaluation {
  provided: IdentityProofKey[];
  missing: IdentityProofKey[];
  /** How many more IDs are still needed (0 when satisfied). */
  needed: number;
  satisfied: boolean;
}

export function evaluateIdentityProofs(values: IdentityProofValues, documents: readonly IdentityDocument[]): IdentityEvaluation {
  const usable = new Set(documents.filter((d) => d.reviewStatus !== "REJECTED").map((d) => d.documentType));
  const provided: IdentityProofKey[] = [];
  const missing: IdentityProofKey[] = [];
  for (const proof of IDENTITY_PROOFS) {
    if (values[proof.numberField]?.trim() || usable.has(proof.documentType)) provided.push(proof.key);
    else missing.push(proof.key);
  }
  return {
    provided,
    missing,
    needed: Math.max(0, MIN_IDENTITY_PROOFS - provided.length),
    satisfied: provided.length >= MIN_IDENTITY_PROOFS,
  };
}
