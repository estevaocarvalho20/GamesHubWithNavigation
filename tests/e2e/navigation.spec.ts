import { expect, test } from "@playwright/test";

async function clearSettings(page) {
  await page.goto("/");
  await page.evaluate(() => localStorage.clear());
}

test.beforeEach(async ({ page }) => {
  await clearSettings(page);
});

test("returns to the protected route after settings are saved", async ({ page }) => {
  await page.goto("/game/rps");
  await expect(page).toHaveURL(/\/lobby$/);
  await page.getByLabel("Player Name").fill("Route Tester");
  await page.locator('label.avatar-option:has(input[value="wizard"])').click();
  await page.getByRole("button", { name: "Save Settings" }).click();
  await expect(page).toHaveURL(/\/game\/rps$/);
});

test("shows all navigation links and identifies the active page", async ({ page }) => {
  await page.goto("/lobby");
  await page.getByLabel("Player Name").fill("Nav Tester");
  await page.locator('label.avatar-option:has(input[value="wizard"])').click();
  await page.getByRole("button", { name: "Save Settings" }).click();

  const links = [
    { name: "Home", path: "/" },
    { name: "Player Settings", path: "/lobby" },
    { name: "Rock Paper Scissors", path: "/game/rps" },
    { name: "Tic-Tac-Toe", path: "/game/tic-tac-toe" },
  ];

  for (const { name, path } of links) {
    const link = page.getByRole("navigation").getByRole("link", { name, exact: true });
    await expect(link).toBeVisible();
    await link.click();
    await expect(page).toHaveURL(new RegExp(`${path.replaceAll("/", "\\/")}$`));
    await expect(link).toHaveAttribute("aria-current", "page");
  }
});

test("offers a route home from an unknown page", async ({ page }) => {
  await page.goto("/missing-page");

  await expect(page.getByRole("heading", { name: "Page not found" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Return home" })).toHaveAttribute("href", "/");
});

test("logout clears settings and protects game routes again", async ({ page }) => {
  await page.goto("/lobby");
  await page.getByLabel("Player Name").fill("Logout Tester");
  await page.locator('label.avatar-option:has(input[value="wizard"])').click();
  await page.getByRole("button", { name: "Save Settings" }).click();
  await expect.poll(() => page.evaluate(() => localStorage.getItem("game.settings"))).not.toBeNull();

  await page.getByRole("button", { name: "Logout" }).click();

  await expect(page).toHaveURL(/\/$/);
  await expect.poll(() => page.evaluate(() => localStorage.getItem("game.settings"))).toBeNull();
  await page.goto("/game/tic-tac-toe");
  await expect(page).toHaveURL(/\/lobby$/);
});
