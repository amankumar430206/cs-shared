import { describe, expect, it } from "vitest";
import { advertiserKycSchema, screenPartnerKycSchema } from "../src/schemas";

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
