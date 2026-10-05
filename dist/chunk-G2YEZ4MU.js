// src/tokens/index.ts
var brand = {
  primary: "#FF8A00",
  secondary: "#111111",
  foreground: "#FFFCF3"
};
var defaultThemeConfig = {
  primaryColor: brand.primary,
  secondaryColor: brand.secondary,
  logoUrl: null,
  defaultMode: "system"
};
var neutral = {
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
  950: "#020617"
};
var semantic = {
  success: "#16a34a",
  warning: "#d97706",
  danger: "#dc2626",
  info: "#0284c7"
};
var modes = {
  light: {
    background: neutral[0],
    foreground: neutral[900],
    card: neutral[0],
    cardForeground: neutral[900],
    muted: neutral[100],
    mutedForeground: neutral[500],
    border: neutral[200],
    /** cs-web's card outline: `ring-1 ring-foreground/10`. */
    cardBorder: "rgba(15, 23, 42, 0.1)",
    ring: neutral[300],
    // cs-web's globals.css (the rendered truth, which diverges from its tokens.ts here): dark ink on
    // the orange primary, cream on the near-black secondary.
    primaryForeground: brand.secondary,
    secondaryForeground: brand.foreground
  },
  dark: {
    background: neutral[950],
    foreground: neutral[50],
    card: neutral[900],
    cardForeground: neutral[50],
    muted: neutral[800],
    mutedForeground: neutral[400],
    border: neutral[800],
    cardBorder: "rgba(255, 252, 243, 0.1)",
    ring: neutral[700],
    // cs-web's globals.css (the rendered truth, which diverges from its tokens.ts here): dark ink on
    // the orange primary, cream on the near-black secondary.
    primaryForeground: brand.secondary,
    secondaryForeground: brand.foreground
  }
};
var spacingUnit = 4;
var spacing = (steps) => steps * spacingUnit;
var radii = { sm: 0, md: 0, lg: 0, xl: 0, full: 9999 };
var typography = {
  sizes: { xs: 12, sm: 14, base: 16, lg: 18, xl: 20, "2xl": 24, "3xl": 30 },
  lineHeights: { xs: 16, sm: 20, base: 24, lg: 28, xl: 28, "2xl": 32, "3xl": 36 },
  weights: { normal: "400", medium: "500", semibold: "600", bold: "700" }
};
function resolveTheme(mode, config = defaultThemeConfig) {
  return {
    mode,
    colors: { ...modes[mode], ...semantic, primary: config.primaryColor, secondary: config.secondaryColor }
  };
}

export { brand, defaultThemeConfig, modes, neutral, radii, resolveTheme, semantic, spacing, spacingUnit, typography };
