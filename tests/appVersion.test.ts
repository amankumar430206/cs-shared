import { describe, expect, it } from "vitest";
import { compareAppVersions } from "../src/hooks/useSettings";

describe("compareAppVersions", () => {
  it("orders by major, then minor, then patch numerically", () => {
    expect(compareAppVersions("1.0.0", "1.0.0")).toBe(0);
    expect(compareAppVersions("1.2.0", "1.10.0")).toBeLessThan(0);
    expect(compareAppVersions("2.0.0", "1.99.99")).toBeGreaterThan(0);
    expect(compareAppVersions("1.0.9", "1.0.10")).toBeLessThan(0);
  });

  it("treats missing or non-numeric parts as 0", () => {
    expect(compareAppVersions("1.2", "1.2.0")).toBe(0);
    expect(compareAppVersions("1.x.3", "1.0.3")).toBe(0);
  });
});
