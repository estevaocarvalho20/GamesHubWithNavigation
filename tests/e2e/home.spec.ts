import { expect, test } from "@playwright/test";

test.describe("Home Page and Search", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => localStorage.clear());
  });

  test("filters games and persists the search in the URL", async ({ page }) => {
    await page.goto("/");
    const catalog = page.getByRole("list");
    await expect(catalog.getByRole("link", { name: "Rock Paper Scissors" })).toBeVisible();
    await expect(catalog.getByRole("link", { name: "Tic-Tac-Toe" })).toBeVisible();

    await page.getByLabel("Search games").fill("rock");
    await expect(page).toHaveURL(/\?search=rock$/);
    await expect(catalog.getByRole("link", { name: "Rock Paper Scissors" })).toBeVisible();
    await expect(catalog.getByRole("link", { name: "Tic-Tac-Toe" })).toHaveCount(0);

    await page.reload();
    await expect(page.getByLabel("Search games")).toHaveValue("rock");
    await page.getByLabel("Search games").fill("");
    await expect(page).toHaveURL(/\/$/);
  });

  test("direct search visits show only matching games", async ({ page }) => {
    await page.goto("/?search=tic");

    await expect(page.getByLabel("Search games")).toHaveValue("tic");
    const catalog = page.getByRole("list");
    await expect(catalog.getByRole("link", { name: "Tic-Tac-Toe" })).toBeVisible();
    await expect(catalog.getByRole("link", { name: "Rock Paper Scissors" })).toHaveCount(0);
  });

  test("an unmatched search explains that no games are available", async ({ page }) => {
    await page.goto("/");
    await page.getByLabel("Search games").fill("chess");

    await expect(page.getByText("No games match your search.")).toBeVisible();
  });
});
