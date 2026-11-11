import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LobbyView } from "../components/Lobby.jsx";
import { useSettings } from "../context/SettingsContext.jsx";

export function LobbyPage() {
  const { settings, saveSettings } = useSettings();
  const location = useLocation();
  const navigate = useNavigate();
  const [name, setName] = useState(settings?.name ?? "");
  const [avatar, setAvatar] = useState(settings?.avatar);
  const [difficulty, setDifficulty] = useState(settings?.difficulty ?? "normal");
  const [darkMode, setDarkMode] = useState(settings?.darkMode ?? false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSettingsSave = () => {
    if (name.trim().length < 2) {
      setErrorMessage("Player name must be at least two characters.");
      return;
    }

    if (!avatar) {
      setErrorMessage("Choose an avatar before saving your settings.");
      return;
    }

    saveSettings({ name: name.trim(), avatar, difficulty, darkMode });
    setErrorMessage("");

    const destination = location.state?.from;
    navigate(destination ? `${destination.pathname}${destination.search ?? ""}` : "/", { replace: true });
  };

  return (
    <LobbyView
      name={name}
      setName={setName}
      avatar={avatar}
      setAvatar={setAvatar}
      difficulty={difficulty}
      setDifficulty={setDifficulty}
      darkMode={darkMode}
      setDarkMode={setDarkMode}
      errorMessage={errorMessage}
      onSettingsSave={handleSettingsSave}
      onGameStart={handleSettingsSave}
    />
  );
}
