import { describe, expect, it } from "vitest";
import {
  bestNameMatch,
  compareNames,
  gstinMatchesState,
  gstinPan,
  gstinStateName,
  isCompanyPan,
  isValidAadhaar,
  isValidGstin,
  isValidPan,
  panFitsLegalStructure,
} from "../src/types";

// The values below are the ones cs-api's own tests and the dev-fill buttons use, so web, mobile
// and the API agree on what is valid.
describe("Aadhaar", () => {
  it("accepts a number whose Verhoeff check digit is right", () => {
    expect(isValidAadhaar("299900000010")).toBe(true);
  });
  it("rejects a mistyped digit, a leading 0/1 and the wrong length", () => {
    expect(isValidAadhaar("299900000011")).toBe(false);
    expect(isValidAadhaar("099900000010")).toBe(false);
    expect(isValidAadhaar("19990000001")).toBe(false);
    expect(isValidAadhaar("")).toBe(false);
  });
});

describe("PAN", () => {
  it("accepts a real holder type and rejects an impossible 4th letter", () => {
    expect(isValidPan("RAMPH1234F")).toBe(true);
    expect(isValidPan("RAMXH1234F")).toBe(false);
    expect(isValidPan("ram")).toBe(false);
  });
  it("fits individuals and proprietors to a personal PAN, companies to a company PAN", () => {
    expect(panFitsLegalStructure("RAMPH1234F", "INDIVIDUAL")).toBe(true);
    expect(panFitsLegalStructure("RAMPH1234F", "COMPANY")).toBe(false);
    expect(panFitsLegalStructure("ABCCE1234F", "COMPANY")).toBe(true);
    expect(panFitsLegalStructure("ABCCE1234F", "PROPRIETOR")).toBe(false);
  });
  it("has nothing to judge without a structure or with a bad PAN", () => {
    expect(panFitsLegalStructure("RAMPH1234F", undefined)).toBeNull();
    expect(panFitsLegalStructure("nope", "INDIVIDUAL")).toBeNull();
  });
  it("treats personal and HUF PANs as not company PANs", () => {
    expect(isCompanyPan("RAMPH1234F")).toBe(false);
    expect(isCompanyPan("ABCCE1234F")).toBe(true);
  });
});

describe("GSTIN", () => {
  it("accepts a number with the right check character and exposes its PAN and state", () => {
    expect(isValidGstin("29ABCPE1234F1Z7")).toBe(true);
    expect(gstinPan("29ABCPE1234F1Z7")).toBe("ABCPE1234F");
    expect(gstinStateName("29ABCPE1234F1Z7")).toBe("Karnataka");
  });
  it("rejects a wrong check character", () => {
    expect(isValidGstin("29ABCPE1234F1Z8")).toBe(false);
  });
  it("compares the state code with a state name, and says nothing for an unknown name", () => {
    expect(gstinMatchesState("29ABCPE1234F1Z7", "Karnataka")).toBe(true);
    expect(gstinMatchesState("29ABCPE1234F1Z7", "karnataka ")).toBe(true);
    expect(gstinMatchesState("29ABCPE1234F1Z7", "Maharashtra")).toBe(false);
    expect(gstinMatchesState("29ABCPE1234F1Z7", "Atlantis")).toBeNull();
  });
});

describe("name matching", () => {
  it("matches the same name through honorifics and order", () => {
    expect(compareNames("Mr Ramesh Kumar", "Kumar Ramesh").status).toBe("MATCH");
  });
  it("asks for a look when one word is set against several", () => {
    expect(compareNames("Ramesh", "Ramesh Kumar").status).toBe("REVIEW");
  });
  it("flags unrelated names and says UNKNOWN for a blank one", () => {
    expect(compareNames("Ramesh Kumar", "Sunita Verma").status).toBe("MISMATCH");
    expect(compareNames("", "Sunita").status).toBe("UNKNOWN");
  });
  it("picks the best verdict across candidates", () => {
    const best = bestNameMatch("Ramesh Kumar", ["Sunita Verma", "Ramesh Kumar Traders Pvt Ltd", undefined]);
    expect(best.against).toBe("Ramesh Kumar Traders Pvt Ltd");
    expect(best.status).not.toBe("MISMATCH");
  });
});
