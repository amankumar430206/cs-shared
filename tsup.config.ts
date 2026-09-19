import { defineConfig } from "tsup";

export default defineConfig({
  entry: [
    "src/index.ts",
    "src/types/index.ts",
    "src/schemas/index.ts",
    "src/tokens/index.ts",
    "src/api/index.ts",
    "src/hooks/index.ts",
    "src/i18n/index.ts",
  ],
  format: ["esm"],
  dts: true,
  // Unbundled-per-entry output with shared chunks keeps Metro/Next tree-shaking effective.
  splitting: true,
  treeshake: true,
  clean: true,
  target: "es2020",
  external: ["react", "@tanstack/react-query", "zod"],
});
