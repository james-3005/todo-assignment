import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setup-tests.ts",
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "clover", "json", "lcov", "json-summary"],
      include: ["src/components/**", "src/pages/**"],
    },
  },
});
