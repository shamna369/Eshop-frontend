import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // only use eslint plugin in development
    process.env.NODE_ENV !== "production" && eslint(),
  ].filter(Boolean),
});
