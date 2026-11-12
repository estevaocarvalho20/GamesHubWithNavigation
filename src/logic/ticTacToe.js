export const WINNING_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export function calculateWinner(board) {
  for (const [first, second, third] of WINNING_LINES) {
    const mark = board[first];
    if (mark && mark === board[second] && mark === board[third]) {
      return mark;
    }
  }

  return null;
}

export function isDraw(board) {
  return board.every((square) => square !== null) && calculateWinner(board) === null;
}

export function playMove(board, index, mark) {
  if (!Number.isInteger(index) || index < 0 || index >= board.length || board[index] !== null) {
    return board;
  }

  const nextBoard = [...board];
  nextBoard[index] = mark;
  return nextBoard;
}
