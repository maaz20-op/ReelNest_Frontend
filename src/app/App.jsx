import { useEffect, useState } from "react";
import { AppRouting } from "../routes/AppRoutes";
import { MainLayout } from "../layouts/mainLayout";
import { ErrorFallback } from "../utils/ErrorBoundary";
import { ErrorBoundary } from "react-error-boundary";

function App() {
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
