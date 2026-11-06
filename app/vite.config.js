import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
export default defineConfig({
  root: fileURLToPath(new URL(".", import.meta.url)),
  plugins: [react()],
  base: "./",
  build: {
    target: "es2022",
    outDir: fileURLToPath(new URL("../public_html", import.meta.url)),
    emptyOutDir: true,
  },
});
