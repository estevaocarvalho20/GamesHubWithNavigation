import { Link, useSearchParams } from "react-router-dom";

export function HomePage() {
  const games = [
    { name: "Rock Paper Scissors", path: "/game/rps" },
    { name: "Tic-Tac-Toe", path: "/game/tic-tac-toe" },
  ];
  const [searchParams, setSearchParams] = useSearchParams();
  const searchText = searchParams.get("search") ?? "";

  const normalizedSearchText = searchText.trim().toLowerCase();
  const filteredGames = games.filter((game) => game.name.toLowerCase().includes(normalizedSearchText));

  function handleSearchChange(event) {
    const nextParams = new URLSearchParams(searchParams);
    const nextText = event.target.value;

    if (nextText) {
      nextParams.set("search", nextText);
    } else {
      nextParams.delete("search");
    }

    setSearchParams(nextParams);
  }

  return (
    <section aria-labelledby="home-heading">
      <h2 id="home-heading">Game catalog</h2>
      <label htmlFor="game-search">Search games</label>
      <input id="game-search" type="search" value={searchText} onChange={handleSearchChange} />

      {filteredGames.length > 0 ? (
        <ul>
          {filteredGames.map((game) => (
            <li key={game.path}>
              <Link to={game.path}>{game.name}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No games match your search.</p>
      )}
    </section>
  );
}
