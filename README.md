# Games Hub with Navigation

## What You Are Building

Build a routed Games Hub that keeps the supplied Rock Paper Scissors game, adds a complete Tic-Tac-Toe game, and uses shared player settings to protect both game routes. The home page must provide URL-based game search, and every required route must render inside a shared layout.

This assignment is worth 20 points and is due November 15, 2026 at 11:59 PM Eastern. Canvas is the authoritative source if any wording there differs from this README.

## Before You Start

You need Node.js 20.19 or newer and Git. Confirm your Node version, install the locked dependencies, and install the Chromium browser used by the local tests:

```bash
node --version
npm ci
npx playwright install chromium
```

Read the existing source and tests before changing behavior. The starter intentionally leaves the new routing, search, and Tic-Tac-Toe work incomplete. Preserve the supplied settings and Rock Paper Scissors behavior while you add the assignment features.

## Required Routes

Your router must provide these routes:

| Path                | Required page           | Access                  |
| ------------------- | ----------------------- | ----------------------- |
| `/`                 | Searchable game catalog | Public                  |
| `/lobby`            | Player settings         | Public                  |
| `/game/rps`         | Rock Paper Scissors     | Requires saved settings |
| `/game/tic-tac-toe` | Tic-Tac-Toe             | Requires saved settings |
| `*` (catch-all)     | Not-found page          | Public                  |

Use the shared layout for every route. The not-found page must explain that the page was not found and offer a route home.

## Phase 1: Router and Shared Layout

- Configure React Router in `src/main.jsx` and render the route tree through a router provider.
- Complete `AppLayout`, `Navigation`, and `NotFoundPage`. The layout must contain the Games Hub heading, navigation, the current routed page, and the signed-in player/logout area when settings exist.
- Provide navigation links named `Home`, `Player Settings`, `Rock Paper Scissors`, and `Tic-Tac-Toe`.
- Make only the current navigation link active. The home link must not remain active on child paths.
- Render unknown paths as the not-found page rather than a blank screen.

## Phase 2: Settings Context and Protected Routes

- Use `SettingsProvider` as the single shared source for current player settings. Keep saving, loading, clearing, and the `theme-dark` document class synchronized with `game.settings` in local storage.
- Complete `LobbyPage` by reusing the supplied settings form. A valid save requires a player name of at least two characters and an avatar. Preserve the name, avatar, difficulty, and dark-theme values after navigation and reload.
- Complete `ProtectedRoute` so both game routes require saved settings. An unauthenticated visit must go to `/lobby` while preserving the attempted pathname and search string.
- After a successful settings save, return to that preserved destination. A save reached directly from `/lobby` returns home.
- Logout must clear the settings context and local storage, remove the saved theme, and return home. A later visit to either game route must be protected again.

## Phase 3: URL-Based Game Search

- Complete `HomePage` with the Rock Paper Scissors and Tic-Tac-Toe catalog entries and links to their required routes.
- Treat the `search` URL parameter as the only search state. Typing updates that parameter, clearing the field removes it, and a direct visit or reload restores the field and filtered results from the URL.
- Match the trimmed search text case-insensitively against the game catalog.
- When nothing matches, show the exact message `No games match your search.`

## Phase 4: Preserve Rock Paper Scissors

- Complete `RpsPage` as a routed adapter for the supplied Rock Paper Scissors game.
- Read the saved player name, avatar, and difficulty from `SettingsContext` and pass them to the existing game without duplicating settings state.
- Preserve the supplied move controls, score calculation, round history, and reset behavior.
- Resetting Rock Paper Scissors must clear only its current scores and history. It must not clear player settings or log the player out.

## Phase 5: Build Complete Tic-Tac-Toe

- Implement the pure rules in `src/logic/ticTacToe.js` and connect them to `TicTacToePage`.
- Render nine accessible squares and alternate X and O after valid moves, starting with X.
- Ignore an occupied-square move without changing the mark or advancing the turn.
- Detect wins across all three rows, all three columns, and both diagonals. Detect a draw only when the board is full and has no winner.
- Lock the board after a win or draw so later clicks cannot change it.
- Reset to nine empty squares and `Next player: X` from any game state.
- Move history and time travel are outside this assignment.

## Required Selectors and Messages

The local browser tests use this public interface. Match capitalization, spaces, punctuation, IDs, attributes, accessible names, and status text exactly.

| Behavior            | Required contract                                                                                                       |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Navigation          | links named `Home`, `Player Settings`, `Rock Paper Scissors`, and `Tic-Tac-Toe`; current link has `aria-current="page"` |
| Not found           | heading `Page not found`, link named `Return home`                                                                      |
| Settings            | labels `Player Name`, `Difficulty`, and `Dark Theme`; buttons named `Save Settings` and `Logout`                        |
| Search              | label `Search games`, input `#game-search`, query key `search`                                                          |
| Empty search result | `No games match your search.`                                                                                           |
| RPS moves           | `[data-move="rock"]`, `[data-move="paper"]`, `[data-move="scissors"]`                                                   |
| RPS scores          | `#score-player`, `#score-cpu`, `#score-ties`                                                                            |
| RPS history/reset   | `#history`, `#reset-game`                                                                                               |
| Tic-Tac-Toe squares | buttons named `Square 1` through `Square 9`                                                                             |
| Tic-Tac-Toe status  | `.status`: `Next player: X/O`, `Winner: X/O`, or `Draw`                                                                 |
| Tic-Tac-Toe reset   | button named `Reset Game`                                                                                               |

## Local Testing Workflow

Use this workflow from the repository root. These commands avoid platform-specific shell syntax:

```bash
npm ci
npx playwright install chromium
npm test
npm run lint
npm run build
```

`npm test` runs the unit tests, creates a production build, and runs the browser tests. Tests clear local storage before their scenarios and do not require an external service. During development, you can run a focused check such as:

```bash
npx vitest run tests/unit/tic-tac-toe.logic.test.js
npx playwright test tests/e2e/tic-tac-toe.spec.ts
```

Before submission, run the complete workflow and resolve every unexpected failure.

## Git Milestones

Create at least five meaningful commits as you work. Each commit should represent a coherent, reviewable milestone. A suitable sequence is:

1. Router, shared layout, navigation, and not-found behavior.
2. Settings context, validation, protected-route return flow, and logout.
3. URL-based catalog search and its browser behavior.
4. Routed Rock Paper Scissors integration with regression coverage.
5. Complete Tic-Tac-Toe rules, interface, and tests.

Commit your completed Reflection answers in the repository before submission.

## Submission

Submit only your private GitHub repository URL in Canvas.

## Reflection

Add brief answers below each question and commit them with your project:

1. How does your protected-route return flow preserve the original destination?

The protected-route return flow preserve by redirecting to the lobby and storing the original location that the user wanted like the pathname and search string. Making the app return to the exat destination instead of always sending the player to the home page.

2. Why is the search URL the source of truth instead of separate component state?

   The search URL is the source of truth because it can be bookmarked, direct visits, reloads. Because of browser navigation restoration process that rely on temporary component that love inside the current page the user is acessing.

3. Which Tic-Tac-Toe edge case was most useful to test, and why?

   Tic-Tac-Top is the most useful for testing because it verifies two things at once, the game not replacing the mark already moved to the squared and not advencing an invalid move. Without it a player could overwrite a move or skip the other player turn.

## Getting Help

Use the Canvas Course Q&A discussion board for assignment questions and clarification.
