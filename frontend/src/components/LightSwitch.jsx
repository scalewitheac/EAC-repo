import React from "react";
import { useTheme } from "../context/ThemeContext";

const SHORT = {
  "theme-cyber-magenta": "MGNT",
  "theme-cyber-cyan": "CYAN",
  "theme-cyber-lime": "LIME",
  "theme-cyber-violet": "VLET",
};

const LightSwitch = () => {
  const { theme, cycleTheme } = useTheme();
  return (
    <button
      onClick={cycleTheme}
      className="light-switch"
      data-testid="theme-light-switch"
      aria-label="cycle color scheme"
      title={`scheme: ${theme.replace("theme-cyber-", "")}`}
    >
      {SHORT[theme] || "⏻"}
    </button>
  );
};

export default LightSwitch;
