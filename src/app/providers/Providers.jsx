import { ThemeProvider } from "../../contexts/theme";
import { BrowserRouter } from "react-router-dom";
import App from "../App";
import { AppRouting } from "../../routes/AppRoutes";

//All App providers
export const AppProviders = ({ children }) => {
  return (
    <ThemeProvider>
      <BrowserRouter>{children}</BrowserRouter>
    </ThemeProvider>
  );
};
