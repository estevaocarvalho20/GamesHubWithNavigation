import { resolve } from "node:path";
import { defineConfig } from "vitest/config";

const repositoryRoot = import.meta.dirname;
const appRoot = process.env.GAME_HUB_TEST_SOLUTION === "1"
  ? resolve(repositoryRoot, ".instructor-solution")
  : repositoryRoot;

export default defineConfig({
  resolve: { alias: { "@app": resolve(appRoot, "src") } },
  test: {
    environment: "jsdom",
    globals: true,
    include: ["tests/unit/**/*.{test,spec}.{js,jsx}"],
    setupFiles: ["./tests/setup.js"],
  },
});
