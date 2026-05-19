import React, { createContext, useContext, useEffect, useState } from "react";

const THEMES = ["theme-cyber-magenta", "theme-cyber-cyan", "theme-cyber-lime", "theme-cyber-violet"];
const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("journal-theme");
    if (saved && THEMES.includes(saved)) return saved;
    return "theme-cyber-magenta";
  });

  useEffect(() => {
    const root = document.documentElement;
    // remove any previous theme classes (including legacy names)
    Array.from(root.classList)
      .filter((c) => c.startsWith("theme-"))
      .forEach((c) => root.classList.remove(c));
    root.classList.add(theme);
    localStorage.setItem("journal-theme", theme);
  }, [theme]);

  const cycleTheme = () => {
    const i = THEMES.indexOf(theme);
    setTheme(THEMES[(i + 1) % THEMES.length]);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, cycleTheme, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
