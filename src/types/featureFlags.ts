// Copied from cs-web src/lib/featureFlags.ts (cs-api modules/featureFlags) — keep in sync.

export interface FeatureFlag {
  key: string;
  module: string;
  label: string;
  description: string;
  enabled: boolean;
  source: "code-default" | "admin" | "env-override";
  /** true when an env var is forcing this flag's value. */
  locked: boolean;
}

/** Flag that switches the screen-owner coupon module on. Off in production until the CA signs off. */
export const COUPONS_FLAG = "coupons.module";

/**
 * Fail open: a key that hasn't loaded yet or isn't registered in the backend's
 * flag config should not hide a feature that was never meant to be gated.
 * For coupons use {@link isFlagOn} instead, which fails closed.
 */
export function isFlagEnabled(flags: FeatureFlag[] | undefined, key: string | string[]): boolean {
  if (Array.isArray(key)) return key.some((k) => isFlagEnabled(flags, k));
  return flags?.find((flag) => flag.key === key)?.enabled ?? true;
}

/** Fail closed: only true when the list has loaded and the flag is on. For features that ship dark. */
export function isFlagOn(flags: FeatureFlag[] | undefined, key: string): boolean {
  return flags?.find((flag) => flag.key === key)?.enabled === true;
}
