import { ThemeProvider } from "../../contexts/theme";
import { BrowserRouter } from "react-router-dom";
import App from "../App";
import { AppRouting } from "../../routes/AppRoutes";
import { Provider } from "react-redux";
import { store } from "../config/store";
import { CommentsProvider } from "../../features/comments/hooks/useIsCommentsOpen";
import { ConnectionProvider } from "../../contexts/useConnections";
import { SearchContextProvider } from "../../contexts/seachContext";
import { ToastProvider } from "../../contexts/toast";

//All App providers
export const AppProviders = ({ children }) => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <ToastProvider>
          <SearchContextProvider>
            <ConnectionProvider>
              <CommentsProvider>
                <BrowserRouter>{children}</BrowserRouter>
              </CommentsProvider>
            </ConnectionProvider>
          </SearchContextProvider>
        </ToastProvider>
      </ThemeProvider>
    </Provider>
  );
};
