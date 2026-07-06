import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../styles/index.css";
import { AppProviders } from "./providers/Providers";
import App from "../app/App";

createRoot(document.getElementById("root")).render(
  <AppProviders>
    <App />
  </AppProviders>,
);
