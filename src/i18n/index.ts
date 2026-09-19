// The same English/Hindi UI text cs-web uses (copied from cs-web
// src/i18n/messages — keep in sync; cs-web's `yarn lint` checks key parity
// and advertiser-facing jargon there). ICU MessageFormat strings, as used
// by next-intl on web and i18next + i18next-icu on mobile.
import en from "./en.json";
import hi from "./hi.json";

export const LOCALES = ["en", "hi"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";
export const messages = { en, hi } as const;
export type Messages = typeof en;

export function coerceLocale(value: unknown): Locale | null {
  return typeof value === "string" && (LOCALES as readonly string[]).includes(value) ? (value as Locale) : null;
}
