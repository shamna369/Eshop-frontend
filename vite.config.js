import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

if (process.env.NODE_ENV !== "production") {
  try {
    const eslint = require("vite-plugin-eslint").default;
    plugins.push(eslint());
  } catch (e) {
    console.warn("vite-plugin-eslint not installed, skipping...");
  }
}

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1500, // increase to 1.5MB
  },
});
