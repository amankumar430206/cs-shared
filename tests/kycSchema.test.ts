import { describe, expect, it } from "vitest";
import { advertiserKycSchema, screenPartnerKycSchema } from "../src/schemas";
import { evaluateIdentityProofs } from "../src/types/kycIdentity";

const messages = (schema: typeof screenPartnerKycSchema | typeof advertiserKycSchema, input: object) => {
  const result = schema.safeParse(input);
  return result.success ? [] : result.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`);
};

// Continue validates a step while the consents further on are still unticked, so the offline ID checks
// must report even when other fields of the same form are invalid.
describe("partner KYC offline checks", () => {
  const base = {
    aadhaarNumber: "299900000010",
    panNumber: "RAMPH1234F",
    bankAccountNumber: "00011122233",
    bankIfsc: "HDFC0001234",
    bankAccountName: "Ramesh Kumar",
    acceptTerms: false,
    acceptDigitalAgreement: false,
    acceptRevenueSharingAgreement: false,
  };
  const only = (input: object, field: string) => messages(screenPartnerKycSchema, { ...base, ...input }).filter((m) => m.startsWith(`${field}:`));

  it("rejects an Aadhaar whose check digit is wrong", () => {
    expect(only({ aadhaarNumber: "299900000011" }, "aadhaarNumber")).toEqual(["aadhaarNumber: This Aadhaar number doesn't look right. Check each digit."]);
    expect(only({}, "aadhaarNumber")).toEqual([]);
  });
  it("rejects a PAN with an impossible 4th letter", () => {
    expect(only({ panNumber: "RAMXH1234F" }, "panNumber")).toHaveLength(1);
  });
  it("rejects a personal PAN for a company and a company PAN for an individual", () => {
    expect(only({ legalStructure: "COMPANY", cin: "U12345MH2020PTC123456" }, "panNumber")).toHaveLength(1);
    expect(only({ legalStructure: "INDIVIDUAL", panNumber: "ABCCE1234F" }, "panNumber")).toHaveLength(1);
    expect(only({ legalStructure: "INDIVIDUAL" }, "panNumber")).toEqual([]);
  });
  it("checks the GST number's check character and its PAN", () => {
    expect(only({ gstNumber: "29ABCPE1234F1Z8" }, "gstNumber")).toEqual(["gstNumber: This GST number doesn't look right. Check each character."]);
    expect(only({ gstNumber: "29ABCPE1234F1Z7" }, "gstNumber")).toEqual(["gstNumber: The PAN inside this GST number doesn't match the PAN you entered."]);
    expect(only({ gstNumber: "29RAMPH1234F1ZF" }, "gstNumber")).toHaveLength(0);
  });
});

describe("advertiser KYC offline checks", () => {
  const base = {
    businessAddress: "221 MG Road",
    businessCategory: "RETAIL",
    billingState: "Karnataka",
    billingPincode: "560001",
    acceptTerms: false,
    acceptCopyrightDeclaration: false,
    acceptAdvertisingPolicy: false,
  };
  const only = (input: object, field: string) => messages(advertiserKycSchema, { ...base, ...input }).filter((m) => m.startsWith(`${field}:`));

  it("rejects an impossible PAN and a GST number that disagrees with the PAN", () => {
    expect(only({ panNumber: "ABCXE1234F" }, "panNumber")).toHaveLength(1);
    expect(only({ gstNumber: "29ABCPE1234F1Z7", panNumber: "RAMPH1234F" }, "gstNumber")).toHaveLength(1);
  });
  it("needs a company PAN when a CIN is given", () => {
    expect(only({ panNumber: "RAMPH1234F", cin: "U12345MH2020PTC123456" }, "panNumber")).toEqual([
      "panNumber: A company's CIN needs a company PAN, not a personal one.",
    ]);
  });
});

describe("partner KYC: optional IDs and bank, 2-of-3 identity rule", () => {
  const consents = { acceptTerms: true, acceptDigitalAgreement: true, acceptRevenueSharingAgreement: true };

  it("accepts a form with no IDs and no bank (the 2-of-3 rule is checked separately)", () => {
    expect(messages(screenPartnerKycSchema, consents)).toEqual([]);
  });
  it("keeps format checks on any ID that is given", () => {
    expect(messages(screenPartnerKycSchema, { ...consents, aadhaarNumber: "123" })).toHaveLength(1);
    expect(messages(screenPartnerKycSchema, { ...consents, drivingLicenseNumber: "x" })).toHaveLength(1);
    expect(messages(screenPartnerKycSchema, { ...consents, drivingLicenseNumber: "ka0120110012345" })).toEqual([]);
  });
  it("makes bank details all-or-none", () => {
    expect(messages(screenPartnerKycSchema, { ...consents, bankIfsc: "HDFC0001234" })).toEqual([
      "bankAccountNumber: Enter your bank account number",
      "bankAccountName: Enter the bank account holder name",
    ]);
    expect(
      messages(screenPartnerKycSchema, { ...consents, bankAccountNumber: "00011122233", bankIfsc: "HDFC0001234", bankAccountName: "Ramesh" })
    ).toEqual([]);
  });
});

describe("evaluateIdentityProofs", () => {
  it("needs two of Aadhaar / PAN / Driving Licence, by number or document", () => {
    expect(evaluateIdentityProofs({}, [])).toMatchObject({ satisfied: false, needed: 2, provided: [] });
    expect(evaluateIdentityProofs({ panNumber: "ABCPE1234F" }, [])).toMatchObject({ satisfied: false, needed: 1 });
    expect(evaluateIdentityProofs({ panNumber: "ABCPE1234F" }, [{ documentType: "DRIVING_LICENSE" }])).toMatchObject({
      satisfied: true,
      provided: ["PAN", "DRIVING_LICENSE"],
    });
    expect(evaluateIdentityProofs({}, [{ documentType: "AADHAAR_CARD" }, { documentType: "PAN_CARD" }]).satisfied).toBe(true);
  });
  it("ignores blank numbers, other documents and rejected documents", () => {
    expect(evaluateIdentityProofs({ aadhaarNumber: "  " }, [{ documentType: "ADDRESS_PROOF" }]).provided).toEqual([]);
    expect(evaluateIdentityProofs({}, [{ documentType: "PAN_CARD", reviewStatus: "REJECTED" }]).provided).toEqual([]);
  });
});
