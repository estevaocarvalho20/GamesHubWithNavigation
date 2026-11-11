import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { SettingsProvider, useSettings } from "@app/context/SettingsContext.jsx";

function SettingsConsumer() {
  const { settings, saveSettings, clearSettings } = useSettings();
  const settingsToSave = { name: "Alex", avatar: "wizard", difficulty: "hard", darkMode: true };

  return (
    <>
      <output data-testid="settings">{settings ? JSON.stringify(settings) : "null"}</output>
      <button onClick={() => saveSettings(settingsToSave)}>Save</button>
      <button onClick={clearSettings}>Clear</button>
    </>
  );
}

function ConsumerOutsideProvider() {
  useSettings();
  return null;
}

describe("SettingsContext", () => {
  it("loads persisted settings and applies the dark theme", () => {
    const settings = { name: "Alex", avatar: "wizard", difficulty: "hard", darkMode: true };
    localStorage.setItem("game.settings", JSON.stringify(settings));

    render(
      <SettingsProvider>
        <SettingsConsumer />
      </SettingsProvider>,
    );

    expect(screen.getByTestId("settings")).toHaveTextContent(JSON.stringify(settings));
    expect(document.documentElement).toHaveClass("theme-dark");
  });

  it("saves settings to localStorage", () => {
    const settings = { name: "Alex", avatar: "wizard", difficulty: "hard", darkMode: true };

    render(
      <SettingsProvider>
        <SettingsConsumer />
      </SettingsProvider>,
    );
    fireEvent.click(screen.getByRole("button", { name: "Save" }));

    expect(screen.getByTestId("settings")).toHaveTextContent(JSON.stringify(settings));
    expect(localStorage.getItem("game.settings")).toBe(JSON.stringify(settings));
  });

  it("clears persisted settings", () => {
    const settings = { name: "Alex", avatar: "wizard", difficulty: "hard", darkMode: true };
    localStorage.setItem("game.settings", JSON.stringify(settings));

    render(
      <SettingsProvider>
        <SettingsConsumer />
      </SettingsProvider>,
    );
    fireEvent.click(screen.getByRole("button", { name: "Clear" }));

    expect(screen.getByTestId("settings")).toHaveTextContent("null");
    expect(localStorage.getItem("game.settings")).toBeNull();
  });

  it("throws outside SettingsProvider", () => {
    expect(() => render(<ConsumerOutsideProvider />)).toThrow(
      "useSettings must be used within SettingsProvider",
    );
  });
});
