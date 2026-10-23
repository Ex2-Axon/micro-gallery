import { defineConfig } from "playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  reporter: "list",
  use: {
    baseURL: "http://127.0.0.1:3184",
    browserName: "chromium",
    trace: "retain-on-failure",
  },
  webServer: {
    command: "node node_modules/next/dist/bin/next start --hostname 127.0.0.1 --port 3184",
    url: "http://127.0.0.1:3184",
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
