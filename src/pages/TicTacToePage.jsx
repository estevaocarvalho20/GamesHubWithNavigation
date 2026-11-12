
import { useState } from "react";
import { calculateWinner, isDraw, playMove } from "../logic/ticTacToe.js";

export function TicTacToePage() {
  const [board, setBoard] = useState(() => Array(9).fill(null));
  const [nextPlayer, setNextPlayer] = useState("X");
  const winner = calculateWinner(board);
  const draw = isDraw(board);

  const handleSquareClick = (index) => {
    if (board[index] !== null || winner || draw) {
      return;
    }

    setBoard(playMove(board, index, nextPlayer));
    setNextPlayer(nextPlayer === "X" ? "O" : "X");
  };

  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setNextPlayer("X");
  };

  const status = winner ? `Winner: ${winner}` : draw ? "Draw" : `Next player: ${nextPlayer}`;

  return (
    <section aria-labelledby="tic-tac-toe-heading" className="tic-tac-toe-page">
      <h2 id="tic-tac-toe-heading">Tic-Tac-Toe</h2>
      <p className="status" aria-live="polite">{status}</p>
      <div className="tic-tac-toe-board">
        {board.map((square, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Square ${index + 1}`}
            onClick={() => handleSquareClick(index)}
            disabled={Boolean(winner) || draw}
          >
            {square}
          </button>
        ))}
      </div>
      <button type="button" onClick={handleReset}>Reset Game</button>
    </section>
  );
}
