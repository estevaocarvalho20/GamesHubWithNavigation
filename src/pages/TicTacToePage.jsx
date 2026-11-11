export function TicTacToePage() {
  return (
    <section aria-labelledby="tic-tac-toe-heading">
      <h2 id="tic-tac-toe-heading">Tic-Tac-Toe</h2>
      <p className="status" aria-live="polite">Next player: X</p>
      <div className="tic-tac-toe-board" />
      <p>
        Follow Phase 5: Build Complete Tic-Tac-Toe in README.md. Build a
        complete game with nine playable squares,
        alternating turns, win and draw detection, post-game lockout, and a
        Reset Game button.
      </p>
    </section>
  );
}
