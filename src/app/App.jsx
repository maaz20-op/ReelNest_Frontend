import { useEffect, useState } from "react";
import { AppRouting } from "../routes/AppRoutes";
import { MainLayout } from "../layouts/mainLayout";

function App() {
  return (
    <div className="app ">
      {/* All the Routes of App */}

      <MainLayout>
        <AppRouting />
      </MainLayout>
    </div>
  );
}

export default App;
