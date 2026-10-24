import { describe, expect, it } from "vitest";
import { placeKey, planToRequest, planTotal, withCount, withFixed, withoutCab, type Plan } from "../src/hooks/cabPlan";
import type { CabLocation } from "../src/hooks/useCabs";

const pune: CabLocation = { city: "Pune", state: "MH", area: null, cabCount: 5, liveCount: 3, minPrice: 100, maxPrice: 300, avgPrice: 200 };
const mumbai: CabLocation = { ...pune, city: "Mumbai", cabCount: 10 };

describe("cabPlan", () => {
  it("clamps a count to the place's cabs and to the overall cap", () => {
    expect(planTotal(withCount({}, pune, 99, 50))).toBe(5);
    const plan = withCount({}, mumbai, 8, 10);
    expect(planTotal(withCount(plan, pune, 5, 10))).toBe(10);
  });

  it("drops a place when its count reaches zero", () => {
    const plan = withCount({}, pune, 3, 50);
    expect(withCount(plan, pune, 0, 50)).toEqual({});
  });

  it("never lets the count fall below cabs chosen by hand", () => {
    let plan: Plan = withFixed({}, pune, "a", 50);
    plan = withFixed(plan, pune, "b", 50);
    expect(withCount(plan, pune, 1, 50)[placeKey(pune)].count).toBe(2);
  });

  it("toggling a chosen cab off keeps the count and the cab is not excluded", () => {
    const plan = withFixed(withFixed({}, pune, "a", 50), pune, "a", 50);
    expect(plan[placeKey(pune)]).toMatchObject({ count: 1, fixedIds: [] });
  });

  it("ignores a hand-picked cab that would exceed the cap", () => {
    const plan = withCount({}, mumbai, 10, 10);
    expect(withFixed(plan, pune, "a", 10)).toBe(plan);
  });

  it("swapping excludes the cab and keeps the count; removing also lowers it", () => {
    const plan = withCount({}, pune, 2, 50);
    const key = placeKey(pune);
    expect(withoutCab(plan, key, "x", true)[key]).toMatchObject({ count: 2, excludeIds: ["x"] });
    expect(withoutCab(plan, key, "x", false)[key]).toMatchObject({ count: 1, excludeIds: ["x"] });
    expect(withoutCab(withCount({}, pune, 1, 50), key, "x", false)).toEqual({});
  });

  it("builds the pick request and returns null for an empty plan", () => {
    expect(planToRequest({}, {})).toBeNull();
    const plan = withoutCab(withFixed(withCount({}, pune, 3, 50), pune, "a", 50), placeKey(pune), "b", true);
    expect(planToRequest(plan, { live: true })).toEqual({
      locations: [{ city: "Pune", state: "MH", count: 3, fixedIds: ["a"], excludeIds: ["b"] }],
      live: true,
    });
  });
});
