import { expect, test } from "@playwright/test";

async function openRpsGame(page) {
  await page.goto("/");
  await page.evaluate(() => localStorage.clear());
  await page.evaluate(() => localStorage.setItem("game.settings", JSON.stringify({
    name: "Kai", avatar: "wizard", difficulty: "normal", darkMode: false,
  })));
  await page.reload();
  await page.goto("/game/rps");
}

test.describe("Rock Paper Scissors Game", () => {
  test("playing a round records the move and scores five total rounds", async ({ page }) => {
    await openRpsGame(page);

    await expect(page.locator("#player-name")).toHaveText("Kai");
    await expect(page.locator("#current-difficulty")).toHaveText("normal");
    await expect(page.locator("#current-avatar")).toHaveAttribute(
      "src",
      /\/assets\/wizard-[^/]+\.png$/,
    );

    await page.locator('[data-move="rock"]').click();
    await expect(page.locator("#history li").first()).toContainText(
      /Player\(rock\) vs CPU\((rock|paper|scissors)\)/,
    );

    for (let index = 0; index < 4; index += 1) {
      await page.locator('[data-move="paper"]').click();
    }

    const playerScore = Number(await page.locator("#score-player").innerText());
    const cpuScore = Number(await page.locator("#score-cpu").innerText());
    const ties = Number(await page.locator("#score-ties").innerText());
    expect(playerScore + cpuScore + ties).toBe(5);
  });

  test("reset clears only the RPS scores and history", async ({ page }) => {
    await openRpsGame(page);

    await page.locator('[data-move="scissors"]').click();
    await page.locator("#reset-game").click();

    await expect(page.locator("#score-player")).toHaveText("0");
    await expect(page.locator("#score-cpu")).toHaveText("0");
    await expect(page.locator("#score-ties")).toHaveText("0");
    await expect(page.locator("#history li")).toHaveCount(0);
    await expect.poll(() => page.evaluate(() => JSON.parse(
      localStorage.getItem("game.settings"),
    ).name)).toBe("Kai");
  });
});
