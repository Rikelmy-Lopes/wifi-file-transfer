import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  server: {
    port: 1024,
    strictPort: true,
    host: "127.0.0.1",
  },
  build: {
    // Adjust output path in development to avoid restarts caused by changes in 'resources'
    outDir: mode === "development" ? "../webapp" : "../src-tauri/resources/webapp",
    emptyOutDir: true,
  },
}));
