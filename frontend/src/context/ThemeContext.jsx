import React, { createContext, useContext, useMemo, useState } from "react";

const THEMES = ["theme-cyber-magenta", "theme-cyber-cyan", "theme-cyber-lime", "theme-cyber-violet"];
const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("journal-theme");
    if (saved && THEMES.includes(saved)) return saved;
    return "theme-cyber-magenta";
  });

  const cycleTheme = () => {
    const i = THEMES.indexOf(theme);
    const next = THEMES[(i + 1) % THEMES.length];
    setTheme(next);
    localStorage.setItem("journal-theme", next);
  };

  return (
    <ThemeContext.Provider value={useMemo(() => ({ theme, setTheme, cycleTheme, themes: THEMES }), [theme])}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
