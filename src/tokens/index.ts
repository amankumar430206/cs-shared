// CASTADI design tokens. Ported from cs-web/src/design-system/{colors,tokens}.ts.
// cs-web still owns its own copy; keep hex values in sync with it and with
// cs-api settings.service.js's CODE_DEFAULT_THEME.

export type ThemeMode = "light" | "dark" | "system";
export type ResolvedThemeMode = "light" | "dark";

export const brand = {
  primary: "#FF8A00",
  secondary: "#111111",
  foreground: "#FFFCF3",
} as const;

export const defaultThemeConfig = {
  primaryColor: brand.primary as string,
  secondaryColor: brand.secondary as string,
  logoUrl: null as string | null,
  defaultMode: "system" as ThemeMode,
};

export const neutral = {
  0: "#ffffff",
  50: brand.foreground,
  100: "#f1f5f9",
  200: "#e2e8f0",
  300: "#cbd5e1",
  400: "#94a3b8",
  500: "#64748b",
  600: "#475569",
  700: "#334155",
  800: "#1e293b",
  900: "#0f172a",
  950: "#020617",
} as const;

export const semantic = {
  success: "#16a34a",
  warning: "#d97706",
  danger: "#dc2626",
  info: "#0284c7",
} as const;

export const modes = {
  light: {
    background: neutral[0],
    foreground: neutral[900],
    card: neutral[0],
    cardForeground: neutral[900],
    muted: neutral[100],
    mutedForeground: neutral[500],
    border: neutral[200],
    ring: neutral[300],
    primaryForeground: neutral[0],
    secondaryForeground: neutral[0],
  },
  dark: {
    background: neutral[950],
    foreground: neutral[50],
    card: neutral[900],
    cardForeground: neutral[50],
    muted: neutral[800],
    mutedForeground: neutral[400],
    border: neutral[800],
    ring: neutral[700],
    primaryForeground: neutral[0],
    secondaryForeground: neutral[0],
  },
} as const;

export type ModeColors = { [K in keyof (typeof modes)["light"]]: string };

// Numeric (px / dp) scales for native. 1rem = 16.
export const spacingUnit = 4;
export const spacing = (steps: number) => steps * spacingUnit;

export const radii = { sm: 4, md: 8, lg: 12, xl: 16, full: 9999 } as const;

export const typography = {
  sizes: { xs: 12, sm: 14, base: 16, lg: 18, xl: 20, "2xl": 24, "3xl": 30 },
  lineHeights: { xs: 16, sm: 20, base: 24, lg: 28, xl: 28, "2xl": 32, "3xl": 36 },
  weights: { normal: "400", medium: "500", semibold: "600", bold: "700" },
} as const;

export interface ResolvedTheme {
  mode: ResolvedThemeMode;
  colors: ModeColors & { primary: string; secondary: string } & typeof semantic;
}

export function resolveTheme(
  mode: ResolvedThemeMode,
  config: Pick<typeof defaultThemeConfig, "primaryColor" | "secondaryColor"> = defaultThemeConfig
): ResolvedTheme {
  return {
    mode,
    colors: { ...modes[mode], ...semantic, primary: config.primaryColor, secondary: config.secondaryColor },
  };
}
