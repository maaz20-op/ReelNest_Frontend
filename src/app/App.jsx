import { useEffect } from "react";
import { AppRouting } from "../routes/AppRoutes";
import { MainLayout } from "../layouts/mainLayout";
import { ErrorFallback } from "../utils/ErrorBoundary";
import { ErrorBoundary } from "react-error-boundary";
import { useAuth } from "../features/auth/hooks/useAuth";

function App() {
  const { setUser } = useAuth();
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);

    const user = queryParams.get("user");
    console.log(user);
    if (user && user?._id) {
      setUser(user);
    }

    window.history.replaceState({}, document.title, "/");
  }, []);

  return (
    <div className="app ">
      {/* All the Routes of App */}
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <MainLayout>
          <AppRouting />
        </MainLayout>
      </ErrorBoundary>
    </div>
  );
}

export default App;
