import { describe, expect, it } from "vitest";
import { decideWinner, nextScore } from "@app/logic/game.js";

describe("RPS rules", () => {
  it.each([
    ["rock", "rock", "tie"], ["paper", "paper", "tie"], ["scissors", "scissors", "tie"],
    ["rock", "scissors", "player"], ["paper", "rock", "player"], ["scissors", "paper", "player"],
    ["rock", "paper", "cpu"], ["paper", "scissors", "cpu"], ["scissors", "rock", "cpu"],
  ])("scores %s against %s", (player, cpu, outcome) => {
    expect(decideWinner(player, cpu)).toBe(outcome);
  });

  it("returns a new score object", () => {
    const previous = { player: 1, cpu: 2, ties: 3 };
    expect(nextScore(previous, "player")).toEqual({ player: 2, cpu: 2, ties: 3 });
    expect(previous).toEqual({ player: 1, cpu: 2, ties: 3 });
  });
});
