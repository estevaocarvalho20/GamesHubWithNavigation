import { Outlet, useNavigate } from "react-router-dom";
import "../App.css";
import { useSettings } from "../context/SettingsContext.jsx";
import { Navigation } from "./Navigation.jsx";

export function AppLayout() {
  const { settings, clearSettings } = useSettings();
  const navigate = useNavigate();

  return (
    <div className="app">
      <header>
        <h1>Games Hub</h1>
        {settings && (
          <div className="player-session">
            <span>Signed in as {settings.name}</span>
            <button
              type="button"
              onClick={() => {
                clearSettings();
                navigate("/");
              }}
            >
              Logout
            </button>
          </div>
        )}
      </header>
      <Navigation />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
