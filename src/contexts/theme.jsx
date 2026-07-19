import { createContext, useState, useEffect, useContext } from "react";

export const ThemeContext = createContext(null);
const themeKey = "Maaz_Malaika";
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    try {
      const t = localStorage.getItem(themeKey);
      if (t) return t;
      return "Dark";
    } catch {
      return "Dark";
    }
  });

  const isDark = theme === "Dark";

  useEffect(() => {
    document.documentElement.setAttribute("data-mode", theme);
    localStorage.setItem(themeKey, theme);
  }, [theme]);

  const toggle = () => {
    setTheme((prev) => (prev == "Dark" ? "Light" : "Dark"));
  };

  const value = {
    toggle,
    isDark,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
