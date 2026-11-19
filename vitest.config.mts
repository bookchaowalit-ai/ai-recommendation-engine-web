import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: { alias: { "@": fileURLToPath(new URL(".", import.meta.url)) } },
  test: {
    environment: "node",
    include: ["tests/**/*.test.{ts,tsx}", "lib/**/*.test.ts"],
    coverage: {
      provider: "v8",
      include: ["app/**/*.{ts,tsx}", "components/**/*.tsx", "lib/**/*.ts"],
      exclude: ["**/*.test.ts", "app/api/**"],
      // ADR-0004 coverage gate for this repo.
      thresholds: { lines: 90, statements: 90, functions: 90, branches: 80 },
    },
  },
});
