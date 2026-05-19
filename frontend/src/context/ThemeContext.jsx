import React, { createContext, useContext, useEffect, useState } from "react";

const THEMES = ["theme-cream", "theme-pink", "theme-mint", "theme-lavender"];
const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("journal-theme") || "theme-cream";
  });

  useEffect(() => {
    const root = document.documentElement;
    THEMES.forEach((t) => root.classList.remove(t));
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
