import { expect, test } from "@playwright/test";

test.describe("Tic-Tac-Toe Game", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => {
      localStorage.clear();
      localStorage.setItem("game.settings", JSON.stringify({
        name: "TicTacPlayer",
        avatar: "knight",
        difficulty: "normal",
        darkMode: false,
      }));
    });
    await page.goto("/game/tic-tac-toe");
  });

  test("alternates turns without replacing an occupied square", async ({ page }) => {
    const square = (number: number) => page.getByRole("button", { name: `Square ${number}` });

    await square(1).click();
    await square(2).click();
    await square(1).click();

    await expect(square(1)).toHaveText("X");
    await expect(square(2)).toHaveText("O");
    await expect(page.locator(".status")).toHaveText("Next player: X");
  });

  test("announces a winner and locks out later moves", async ({ page }) => {
    const square = (number: number) => page.getByRole("button", { name: `Square ${number}` });

    for (const number of [1, 4, 2, 5, 3]) {
      await square(number).click();
    }

    await expect(page.locator(".status")).toHaveText("Winner: X");
    await expect(square(6)).toBeDisabled();
    await square(6).click({ force: true });
    await expect(square(6)).toHaveText("");
  });

  test("announces a draw after the board fills without a winner", async ({ page }) => {
    const square = (number: number) => page.getByRole("button", { name: `Square ${number}` });

    for (const number of [1, 2, 3, 5, 4, 6, 8, 7, 9]) {
      await square(number).click();
    }

    await expect(page.locator(".status")).toHaveText("Draw");
  });

  test("reset clears every square and restores X as the next player", async ({ page }) => {
    const square = (number: number) => page.getByRole("button", { name: `Square ${number}` });

    for (const number of [1, 2, 3]) {
      await square(number).click();
    }
    await page.getByRole("button", { name: "Reset Game" }).click();

    for (let number = 1; number <= 9; number += 1) {
      await expect(square(number)).toHaveText("");
    }
    await expect(page.locator(".status")).toHaveText("Next player: X");
  });
});
