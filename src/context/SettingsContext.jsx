import React, { createContext, useContext, useEffect, useState } from "react";
import { loadSettings, saveSettings as saveToStorage } from "../logic/settings";

const SettingsContext = createContext(null);

export function SettingsProvider({ children }) {
  // Initialize settings state directly from localStorage.
  const [settings, setSettings] = useState(() => loadSettings());

  const saveSettings = (newSettings) => {
    setSettings(newSettings);
    saveToStorage(newSettings);
  };

  const clearSettings = () => {
    setSettings(null);
    localStorage.removeItem("game.settings");
  };

  useEffect(() => {
    document.documentElement.classList.toggle("theme-dark", Boolean(settings?.darkMode));
    return () => document.documentElement.classList.remove("theme-dark");
  }, [settings]);

  return (
    <SettingsContext.Provider value={{ settings, saveSettings, clearSettings }}>{children}</SettingsContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within SettingsProvider");
  }
  return context;
}
