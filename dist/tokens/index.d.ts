type ThemeMode = "light" | "dark" | "system";
type ResolvedThemeMode = "light" | "dark";
declare const brand: {
    readonly primary: "#FF8A00";
    readonly secondary: "#111111";
    readonly foreground: "#FFFCF3";
};
declare const defaultThemeConfig: {
    primaryColor: string;
    secondaryColor: string;
    logoUrl: string | null;
    defaultMode: ThemeMode;
};
declare const neutral: {
    readonly 0: "#ffffff";
    readonly 50: "#FFFCF3";
    readonly 100: "#f1f5f9";
    readonly 200: "#e2e8f0";
    readonly 300: "#cbd5e1";
    readonly 400: "#94a3b8";
    readonly 500: "#64748b";
    readonly 600: "#475569";
    readonly 700: "#334155";
    readonly 800: "#1e293b";
    readonly 900: "#0f172a";
    readonly 950: "#020617";
};
declare const semantic: {
    readonly success: "#16a34a";
    readonly warning: "#d97706";
    readonly danger: "#dc2626";
    readonly info: "#0284c7";
};
declare const modes: {
    readonly light: {
        readonly background: "#ffffff";
        readonly foreground: "#0f172a";
        readonly card: "#ffffff";
        readonly cardForeground: "#0f172a";
        readonly muted: "#f1f5f9";
        readonly mutedForeground: "#64748b";
        readonly border: "#e2e8f0";
        /** cs-web's card outline: `ring-1 ring-foreground/10`. */
        readonly cardBorder: "rgba(15, 23, 42, 0.1)";
        readonly ring: "#cbd5e1";
        readonly primaryForeground: "#111111";
        readonly secondaryForeground: "#FFFCF3";
    };
    readonly dark: {
        readonly background: "#020617";
        readonly foreground: "#FFFCF3";
        readonly card: "#0f172a";
        readonly cardForeground: "#FFFCF3";
        readonly muted: "#1e293b";
        readonly mutedForeground: "#94a3b8";
        readonly border: "#1e293b";
        readonly cardBorder: "rgba(255, 252, 243, 0.1)";
        readonly ring: "#334155";
        readonly primaryForeground: "#111111";
        readonly secondaryForeground: "#FFFCF3";
    };
};
type ModeColors = {
    [K in keyof (typeof modes)["light"]]: string;
};
declare const spacingUnit = 4;
declare const spacing: (steps: number) => number;
declare const radii: {
    readonly sm: 0;
    readonly md: 0;
    readonly lg: 0;
    readonly xl: 0;
    readonly full: 9999;
};
declare const typography: {
    readonly sizes: {
        readonly xs: 12;
        readonly sm: 14;
        readonly base: 16;
        readonly lg: 18;
        readonly xl: 20;
        readonly "2xl": 24;
        readonly "3xl": 30;
    };
    readonly lineHeights: {
        readonly xs: 16;
        readonly sm: 20;
        readonly base: 24;
        readonly lg: 28;
        readonly xl: 28;
        readonly "2xl": 32;
        readonly "3xl": 36;
    };
    readonly weights: {
        readonly normal: "400";
        readonly medium: "500";
        readonly semibold: "600";
        readonly bold: "700";
    };
};
interface ResolvedTheme {
    mode: ResolvedThemeMode;
    colors: ModeColors & {
        primary: string;
        secondary: string;
    } & typeof semantic;
}
declare function resolveTheme(mode: ResolvedThemeMode, config?: Pick<typeof defaultThemeConfig, "primaryColor" | "secondaryColor">): ResolvedTheme;

export { type ModeColors, type ResolvedTheme, type ResolvedThemeMode, type ThemeMode, brand, defaultThemeConfig, modes, neutral, radii, resolveTheme, semantic, spacing, spacingUnit, typography };
