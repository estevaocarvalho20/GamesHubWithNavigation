import { NavLink } from "react-router-dom";

export function Navigation() {
  return (
    <nav aria-label="Main navigation">
      <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : undefined)}>
        Home
      </NavLink>
      <NavLink to="/lobby" className={({ isActive }) => (isActive ? "active" : undefined)}>
        Player Settings
      </NavLink>
      <NavLink to="/game/rps" className={({ isActive }) => (isActive ? "active" : undefined)}>
        Rock Paper Scissors
      </NavLink>
      <NavLink to="/game/tic-tac-toe" className={({ isActive }) => (isActive ? "active" : undefined)}>
        Tic-Tac-Toe
      </NavLink>
    </nav>
  );
}
