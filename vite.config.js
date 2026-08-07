import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { analyzer } from "vite-bundle-analyzer";

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: "automatic", // Forces automatic JSX transformation across all chunks
    }),
    tailwindcss(),
    analyzer({ analyzerMode: "static", openAnalyzer: false }),
  ],
  optimizeDeps: {
    include: ["react", "react-dom", "react-window"],
  },
});
