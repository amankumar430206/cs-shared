import { describe, expect, it } from "vitest";
import { onboardingSchema } from "../src/schemas";
import {
  COUPONS_FLAG,
  couponShareLink,
  couponShareText,
  describeAudience,
  describeDiscount,
  draftSignature,
  formatPartnerTypes,
  hasValue,
  isFlagEnabled,
  isFlagOn,
  partnerTypeValues,
  pickDraftValues,
  referralLink,
  referralShareText,
  screenPartnerDraftKeys,
  type FeatureFlag,
} from "../src/types";

const flag = (key: string, enabled: boolean): FeatureFlag => ({ key, module: "x", label: key, description: "", enabled, source: "code-default", locked: false });

describe("feature flags", () => {
  it("fails closed for a dark feature while the list has not loaded or lacks the key", () => {
    expect(isFlagOn(undefined, COUPONS_FLAG)).toBe(false);
    expect(isFlagOn([], COUPONS_FLAG)).toBe(false);
    expect(isFlagOn([flag(COUPONS_FLAG, false)], COUPONS_FLAG)).toBe(false);
    expect(isFlagOn([flag(COUPONS_FLAG, true)], COUPONS_FLAG)).toBe(true);
  });
  it("fails open for a flag that was never meant to hide anything", () => {
    expect(isFlagEnabled(undefined, "cabs.module")).toBe(true);
    expect(isFlagEnabled([flag("cabs.module", false)], "cabs.module")).toBe(false);
  });
});

describe("coupon wording", () => {
  it("describes a fixed and a percent discount and the audience", () => {
    expect(describeDiscount({ discountType: "FIXED", discountValue: 1500 })).toBe("₹1,500 off");
    expect(describeDiscount({ discountType: "PERCENT", discountValue: 20 })).toBe("20% off");
    expect(describeAudience({ visibility: "PUBLIC", allowedCount: 0 })).toBe("Public offer");
    expect(describeAudience({ visibility: "PRIVATE", allowedCount: 1 })).toBe("1 advertiser");
    expect(describeAudience({ visibility: "PRIVATE", allowedCount: 3 })).toBe("3 advertisers");
  });
  it("builds share links that pre-fill the code", () => {
    expect(couponShareLink("OWNER 50", "https://app.example")).toBe("https://app.example/campaigns/new?coupon=OWNER%2050");
    expect(couponShareText({ code: "OWNER50", discountType: "FIXED", discountValue: 50 }, "https://app.example")).toContain("OWNER50");
    expect(referralLink("AB12CD34", "https://app.example")).toBe("https://app.example/register?ref=AB12CD34");
    expect(referralShareText("AB12CD34", "https://app.example")).toContain("ref=AB12CD34");
  });
});

describe("partner types", () => {
  it("falls back to the single legacy field and formats Other with its description", () => {
    expect(partnerTypeValues({ partner_type: "SHOP_OWNER" })).toEqual(["SHOP_OWNER"]);
    expect(partnerTypeValues({ partnerTypes: ["SHOP_OWNER", "CAFE_OWNER"], partnerType: "SHOP_OWNER" })).toEqual(["SHOP_OWNER", "CAFE_OWNER"]);
    expect(formatPartnerTypes({ partnerTypes: ["SHOP_OWNER", "OTHER"], partnerTypeOther: "Salon chain" })).toBe("Shop Owner, Other: Salon chain");
    expect(formatPartnerTypes({ partnerType: "INVESTOR" })).toBe("Investor");
  });
});

describe("registration schema", () => {
  const base = {
    role: "SCREEN_PARTNER" as const,
    fullName: "Ramesh Kumar",
    mobileNumber: "9876543210",
    password: "Passw0rd!",
    confirmPassword: "Passw0rd!",
    dateOfBirth: "1990-01-01",
    city: "Pune",
    state: "Maharashtra",
    acceptTerms: true,
  };
  const messages = (input: object) => {
    const result = onboardingSchema.safeParse({ ...base, ...input });
    return result.success ? [] : result.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`);
  };

  it("still accepts the legacy single partnerType", () => {
    expect(messages({ partnerType: "SHOP_OWNER" })).toEqual([]);
  });
  it("accepts several partner types", () => {
    expect(messages({ partnerTypes: ["SHOP_OWNER", "CAFE_OWNER"] })).toEqual([]);
  });
  it("needs at least one type", () => {
    expect(messages({})).toEqual(["partnerType: Select a partner type."]);
    expect(messages({ partnerTypes: [] })).toEqual(["partnerTypes: Select at least one partner type."]);
  });
  it("needs a description only when Other is chosen", () => {
    expect(messages({ partnerTypes: ["OTHER"] })).toEqual(["partnerTypeOther: Tell us what kind of partner you are."]);
    expect(messages({ partnerTypes: ["OTHER"], partnerTypeOther: "Salon chain" })).toEqual([]);
    expect(messages({ partnerTypes: ["SHOP_OWNER"] })).toEqual([]);
  });
});

describe("KYC draft helpers", () => {
  it("keeps only the form's own text and boolean fields, never the consents", () => {
    const picked = pickDraftValues({ aadhaarNumber: "299900000010", acceptTerms: true, panNumber: 5, upiId: "a@b" }, screenPartnerDraftKeys);
    expect(picked).toEqual({ aadhaarNumber: "299900000010", upiId: "a@b" });
  });
  it("signs a save by its step and values, and treats blank as no value", () => {
    expect(draftSignature({ a: "1" }, 2)).toBe(draftSignature({ a: "1" }, 2));
    expect(draftSignature({ a: "1" }, 2)).not.toBe(draftSignature({ a: "1" }, 3));
    expect(hasValue("  ")).toBe(false);
    expect(hasValue(true)).toBe(true);
    expect(hasValue(false)).toBe(false);
  });
});
