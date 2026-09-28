import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "tests",
  testMatch: "quote-delivery.spec.ts",
  workers: 1,
  timeout: 30000,
  use: { baseURL: "http://localhost:3100", browserName: "chromium" },
  webServer: {
    command: "npm run start -- --port 3100",
    url: "http://localhost:3100",
    reuseExistingServer: false,
    env: {
      VERCEL: "1",
      QUOTE_FIREWALL_ENABLED: "true",
      RESEND_API_KEY: "qa-server-secret-never-public",
      QUOTE_FROM_EMAIL: "qa@notifications.saeedcontracting.ca",
      TURNSTILE_SECRET_KEY: "",
      NEXT_PUBLIC_TURNSTILE_SITE_KEY: "",
    },
  },
});
