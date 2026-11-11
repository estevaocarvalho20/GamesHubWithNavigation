import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppLayout } from "./components/AppLayout.jsx";
import { ProtectedRoute } from "./components/ProtectedRoute.jsx";
import { SettingsProvider } from "./context/SettingsContext.jsx";
import { HomePage } from "./pages/HomePage.jsx";
import { LobbyPage } from "./pages/LobbyPage.jsx";
import { NotFoundPage } from "./pages/NotFoundPage.jsx";
import { RpsPage } from "./pages/RpsPage.jsx";
import { TicTacToePage } from "./pages/TicTacToePage.jsx";

const router = createBrowserRouter([
  {
    element: (
      <SettingsProvider>
        <AppLayout />
      </SettingsProvider>
    ),
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/lobby", element: <LobbyPage /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: "/game/rps", element: <RpsPage /> },
          { path: "/game/tic-tac-toe", element: <TicTacToePage /> },
        ],
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
