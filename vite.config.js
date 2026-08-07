import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { analyzer } from "vite-bundle-analyzer";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    analyzer({
      analyzerMode: "server", // Opens a local dev server with the report
      openAnalyzer: true, // Automatically opens the report in your browser
    }),
  ],
  optimizeDeps: {
    include: ["react-window"],
  },
});
