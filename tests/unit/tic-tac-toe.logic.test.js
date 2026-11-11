import { describe, expect, it } from "vitest";
import { calculateWinner, isDraw, playMove } from "@app/logic/ticTacToe.js";

describe("Tic-Tac-Toe rules", () => {
  it.each([
    [["X", "X", "X", null, null, null, null, null, null], "X"],
    [[null, null, null, "X", "X", "X", null, null, null], "X"],
    [[null, null, null, null, null, null, "X", "X", "X"], "X"],
    [["O", null, null, "O", null, null, "O", null, null], "O"],
    [[null, "O", null, null, "O", null, null, "O", null], "O"],
    [[null, null, "O", null, null, "O", null, null, "O"], "O"],
    [["X", null, null, null, "X", null, null, null, "X"], "X"],
    [[null, null, "O", null, "O", null, "O", null, null], "O"],
  ])("detects a winning line", (board, winner) => {
    expect(calculateWinner(board)).toBe(winner);
  });

  it("detects a full-board draw without a winner", () => {
    expect(isDraw(["X", "O", "X", "X", "O", "O", "O", "X", "X"])).toBe(true);
  });

  it("does not call a winning full board a draw", () => {
    expect(isDraw(["X", "X", "X", "O", "O", "X", "O", "X", "O"])).toBe(false);
  });

  it("returns a new board for an open square and preserves an occupied board", () => {
    const board = ["X", null, null, null, null, null, null, null, null];
    expect(playMove(board, 1, "O")).toEqual(["X", "O", null, null, null, null, null, null, null]);
    expect(playMove(board, 0, "O")).toBe(board);
    expect(board).toEqual(["X", null, null, null, null, null, null, null, null]);
  });
});
