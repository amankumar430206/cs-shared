import type { CabLocation, CabPickRequest, CabPickRequestLocation } from "./useCabs";

// Copied from cs-web lib/cabPlan.ts — keep in sync.
// The advertiser's cab plan: for each place, how many cabs, which ones they chose by hand and which they sent away.
// Pure logic, no React, so the rules (counts, the overall cap, swapping) live in one testable place.

export interface PlanItem {
  key: string;
  city: string;
  state: string;
  count: number;
  fixedIds: string[];
  excludeIds: string[];
}

export type Plan = Record<string, PlanItem>;

export const placeKey = (loc: Pick<CabLocation, "city" | "state">) => `${loc.state}|${loc.city}`.toLowerCase();

const without = (plan: Plan, key: string): Plan => Object.fromEntries(Object.entries(plan).filter(([k]) => k !== key));

const entry = (plan: Plan, loc: Pick<CabLocation, "city" | "state">): PlanItem =>
  plan[placeKey(loc)] ?? { key: placeKey(loc), city: loc.city, state: loc.state, count: 0, fixedIds: [], excludeIds: [] };

export { without as withoutPlace };

export const planTotal = (plan: Plan) => Object.values(plan).reduce((sum, p) => sum + p.count, 0);

/** Sets one place's count, never above what the place has, never past the overall cap, and never below the cabs already chosen by hand. */
export function withCount(plan: Plan, loc: CabLocation, wanted: number, capacity: number): Plan {
  const key = placeKey(loc);
  const current = plan[key];
  const others = planTotal(plan) - (current?.count ?? 0);
  const floor = current?.fixedIds.length ?? 0;
  const count = Math.max(floor, Math.min(wanted, loc.cabCount, capacity - others));
  if (count <= 0) return without(plan, key);
  return { ...plan, [key]: { ...entry(plan, loc), count } };
}

/** Chooses (or un-chooses) one specific cab in a place. Choosing raises the count if needed. */
export function withFixed(plan: Plan, loc: CabLocation, cabId: string, capacity: number): Plan {
  const key = placeKey(loc);
  const current = plan[key];
  const fixed = current?.fixedIds ?? [];
  if (fixed.includes(cabId)) {
    return { ...plan, [key]: { ...current!, fixedIds: fixed.filter((id) => id !== cabId) } };
  }
  const others = planTotal(plan) - (current?.count ?? 0);
  const nextFixed = [...fixed, cabId];
  const count = Math.max(current?.count ?? 0, nextFixed.length);
  if (others + count > capacity) return plan;
  const base = entry(plan, loc);
  return { ...plan, [key]: { ...base, excludeIds: base.excludeIds.filter((id) => id !== cabId), fixedIds: nextFixed, count } };
}

/** Sends one cab away: it is never picked again here. `keepCount` false also drops one from the count (a plain remove). */
export function withoutCab(plan: Plan, placeKeyValue: string, cabId: string, keepCount: boolean): Plan {
  const current = plan[placeKeyValue];
  if (!current) return plan;
  const next: PlanItem = {
    ...current,
    fixedIds: current.fixedIds.filter((id) => id !== cabId),
    excludeIds: current.excludeIds.includes(cabId) ? current.excludeIds : [...current.excludeIds, cabId],
    count: keepCount ? current.count : current.count - 1,
  };
  if (next.count <= 0) return without(plan, placeKeyValue);
  return { ...plan, [placeKeyValue]: next };
}

/** The request cs-api resolves into actual cabs; null while the plan is empty. */
export function planToRequest(plan: Plan, extra: Pick<CabPickRequest, "categoryCode" | "maxPrice" | "live">): CabPickRequest | null {
  const items = Object.values(plan);
  if (items.length === 0) return null;
  const locations: CabPickRequestLocation[] = items.map((p) => ({
    city: p.city,
    state: p.state,
    count: p.count,
    ...(p.fixedIds.length ? { fixedIds: p.fixedIds } : {}),
    ...(p.excludeIds.length ? { excludeIds: p.excludeIds } : {}),
  }));
  return { locations, ...extra };
}
