import { ThemeProvider } from "../../contexts/theme";
import { BrowserRouter } from "react-router-dom";
import App from "../App";
import { AppRouting } from "../../routes/AppRoutes";
import { Provider } from "react-redux";
import { store } from "../config/store";
import { CommentsProvider } from "../../features/comments/hooks/useIsCommentsOpen";

//All App providers
export const AppProviders = ({ children }) => {
  return (
    <ThemeProvider>
      <CommentsProvider>
        <Provider store={store}>
          <BrowserRouter>{children}</BrowserRouter>
        </Provider>
      </CommentsProvider>
    </ThemeProvider>
  );
};
