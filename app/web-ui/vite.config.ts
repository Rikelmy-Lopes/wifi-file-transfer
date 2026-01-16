import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig(() => ({
  plugins: [react()],
  server: {
    port: 1024,
    strictPort: true,
    host: "127.0.0.1",
  },
  build: {
    outDir: "../src-tauri/resources/webapp",
    emptyOutDir: true,
  },
}));
