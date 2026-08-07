import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { analyzer } from "vite-bundle-analyzer";

// https://vite.dev/config/
export default defineConfig({
  build: {
    minify: true,

    rollupOptions: {
      output: {
        manualChunks(id) {
          // 1. Saari external libraries ko ek alag file mein daalo
          if (id.includes("node_modules")) {
            return "vendor";
          }
          // 2. Apne saare components aur pages ko ek single chunk mein merge kar do
          if (id.includes("src/components/") || id.includes("src/pages/")) {
            return "components-bundle";
          }
        },
      },
    },
  },
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
