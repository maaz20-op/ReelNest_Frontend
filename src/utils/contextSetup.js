import { ThemeContext } from "../contexts/theme";
import { useContext } from "react";

export const contextThemeSetup = () => {
  const theme = useContext(ThemeContext);
  const { toggle, isDark } = theme;

  const iconsColor = isDark ? "white" : "#606060";

  return {
    toggle,
    isDark,
    iconsColor,
  };
};
