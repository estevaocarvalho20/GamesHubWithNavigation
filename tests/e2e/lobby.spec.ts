import { expect, test } from "@playwright/test";

async function clearSettings(page) {
  await page.goto("/");
  await page.evaluate(() => localStorage.clear());
}

test.beforeEach(async ({ page }) => {
  await clearSettings(page);
});

test("saves and restores every player setting and the document theme", async ({ page }) => {
  await page.goto("/lobby");
  await page.getByLabel("Player Name").fill("Alex");
  await page.locator('label.avatar-option:has(input[value="wizard"])').click();
  await page.getByLabel("Difficulty").selectOption("hard");
  await page.getByLabel("Dark Theme").check();
  await page.getByRole("button", { name: "Save Settings" }).click();

  await expect(page).toHaveURL(/\/$/);
  await expect.poll(() => page.evaluate(() => JSON.parse(localStorage.getItem("game.settings")!))).toEqual({
    name: "Alex",
    avatar: "wizard",
    difficulty: "hard",
    darkMode: true,
  });

  await page.goto("/lobby");
  await expect(page.getByLabel("Player Name")).toHaveValue("Alex");
  await expect(page.getByLabel("Wizard", { exact: false })).toBeChecked();
  await expect(page.getByLabel("Difficulty")).toHaveValue("hard");
  await expect(page.getByLabel("Dark Theme")).toBeChecked();
  await expect(page.locator("html")).toHaveClass(/theme-dark/);

  await page.reload();
  await expect(page.locator("html")).toHaveClass(/theme-dark/);
  await expect(page.getByLabel("Player Name")).toHaveValue("Alex");
});

test("rejects names shorter than two characters", async ({ page }) => {
  await page.goto("/lobby");
  await page.getByLabel("Player Name").fill("A");
  await page.locator('label.avatar-option:has(input[value="wizard"])').click();
  await page.getByRole("button", { name: "Save Settings" }).click();

  await expect(page).toHaveURL(/\/lobby$/);
  await expect.poll(() => page.evaluate(() => localStorage.getItem("game.settings"))).toBeNull();
});

test("requires an avatar before saving", async ({ page }) => {
  await page.goto("/lobby");
  await page.getByLabel("Player Name").fill("Valid Name");
  await page.getByRole("button", { name: "Save Settings" }).click();

  await expect(page).toHaveURL(/\/lobby$/);
  await expect.poll(() => page.evaluate(() => localStorage.getItem("game.settings"))).toBeNull();
});
