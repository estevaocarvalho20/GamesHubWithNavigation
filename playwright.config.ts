import { resolve } from "node:path";
import { defineConfig, devices } from "@playwright/test";

const repositoryRoot = import.meta.dirname;
const appRoot = process.env.GAME_HUB_TEST_SOLUTION === "1"
  ? resolve(repositoryRoot, ".instructor-solution")
  : repositoryRoot;
const host = "127.0.0.1";
const port = 4175;

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: false,
  use: { baseURL: `http://${host}:${port}`, headless: true, viewport: { width: 1200, height: 800 } },
  webServer: {
    command: `npx vite build "${appRoot}" && npx vite preview "${appRoot}" --host ${host} --port ${port}`,
    url: `http://${host}:${port}`,
    timeout: 120_000,
    reuseExistingServer: false,
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
});
