import { defineConfig, devices } from "@playwright/test";

/**
 * Post-deploy smoke test: runs against a URL that is already live, so there is
 * no webServer here. Point it somewhere with SMOKE_URL, e.g.
 *   SMOKE_URL=https://gutiful.at pnpm smoke
 */
export default defineConfig({
  testDir: "./tests/smoke",
  timeout: 120_000,
  retries: 1,
  reporter: [["list"]],
  use: {
    baseURL: process.env.SMOKE_URL || "https://gutiful.at",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    actionTimeout: 20_000,
  },
  projects: [
    { name: "Mobile Safari", use: { ...devices["iPhone 12"] } },
    { name: "Desktop Chrome", use: { ...devices["Desktop Chrome"] } },
  ],
});
