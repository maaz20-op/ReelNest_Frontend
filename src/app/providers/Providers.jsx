import { ThemeProvider } from "../../contexts/theme";
import { BrowserRouter } from "react-router-dom";
import App from "../App";
import { AppRouting } from "../../routes/AppRoutes";
import { Provider } from "react-redux";
import { store } from "../config/store";

//All App providers
export const AppProviders = ({ children }) => {
  return (
    <ThemeProvider>
      <Provider store={store}>
        <BrowserRouter>{children}</BrowserRouter>
      </Provider>
    </ThemeProvider>
  );
};
